#!/usr/bin/env python3
"""Refresh the public sports snapshot. Python standard library only; no API key.

Run from the repository root: python3 scripts/update_sports.py
Any fetch/validation failure exits before replacing the last good snapshot.
ESPN's public endpoints are unofficial and may change.
"""
import concurrent.futures
import datetime as dt
import json
from pathlib import Path
import time
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "assets/sports-data.json"
# Add or remove a team here. IDs and league slugs are ESPN identifiers.
TEAMS = [
    ("dortmund", "Borussia Dortmund", "soccer", "ger.1", "124", "Bundesliga"),
    ("brighton", "Brighton", "soccer", "eng.1", "331", "Premier League"),
    ("roma", "Roma", "soccer", "ita.1", "104", "Serie A"),
    ("atlanta-united", "Atlanta United", "soccer", "usa.1", "18418", "MLS"),
    ("falcons", "Atlanta Falcons", "football", "nfl", "1", "NFL"),
    ("braves", "Atlanta Braves", "baseball", "mlb", "15", "MLB"),
]

def fetch(url):
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": "PersonalPortfolioSports/1.0", "Accept": "application/json"})
            with urllib.request.urlopen(request, timeout=25) as response:
                return json.load(response)
        except Exception:
            if attempt == 2:
                raise
            time.sleep(attempt + 1)

def date(value):
    return dt.datetime.fromisoformat(value.replace("Z", "+00:00"))

def stat(entry, name, fallback="—"):
    for s in entry.get("stats", []):
        if s.get("name") == name:
            return str(s.get("displayValue", s.get("value", fallback)))
    return fallback

def groups(node):
    if node.get("standings", {}).get("entries"):
        yield node.get("name", "Standings"), node["standings"]["entries"]
    for child in node.get("children", []):
        yield from groups(child)

def number(value, fallback=0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return fallback

def score(competitor):
    value = competitor.get("score")
    if isinstance(value, dict):
        value = value.get("displayValue", value.get("value"))
    return str(value) if value is not None else None

def match(event, team_id):
    competition = event["competitions"][0]
    competitors = competition.get("competitors", [])
    mine = next((c for c in competitors if str(c.get("id")) == team_id), None)
    opponent = next((c for c in competitors if str(c.get("id")) != team_id), None)
    if mine is None or opponent is None:
        raise ValueError("Schedule has an unexpected competitor")
    status = competition.get("status", event.get("status", {})).get("type", {})
    completed = bool(status.get("completed"))
    my_score, their_score = score(mine), score(opponent)
    result = None
    if completed:
        if my_score is None or their_score is None:
            raise ValueError("Completed match lacks a score")
        result = "W" if mine.get("winner") else "L" if opponent.get("winner") else "D"
    return {
        "id": str(event["id"]), "date": event["date"],
        "timeConfirmed": competition.get("timeValid", event.get("timeValid", True)),
        "opponent": opponent["team"].get("shortDisplayName", opponent["team"]["displayName"]),
        "home": mine.get("homeAway") == "home", "scoreFor": my_score,
        "scoreAgainst": their_score, "completed": completed,
        "state": status.get("state", "pre"),
        "status": status.get("shortDetail", status.get("description", "Scheduled")),
        "result": result,
        "href": next((l["href"] for l in event.get("links", []) if l.get("href", "").startswith("https://www.espn.com")), ""),
    }

def collect(spec):
    slug, name, sport, league, team_id, league_name = spec
    base = f"https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams/{team_id}"
    results = fetch(base + "/schedule")
    fixtures = fetch(base + "/schedule?fixture=true") if sport == "soccer" else results
    table = fetch(f"https://site.api.espn.com/apis/v2/sports/{sport}/{league}/standings")
    if str(results.get("team", {}).get("id")) != team_id:
        raise ValueError(f"Wrong team returned for {name}")
    selected = [(label, entries) for label, entries in groups(table) if any(str(e["team"]["id"]) == team_id for e in entries)]
    if not selected:
        raise ValueError(f"No standings found for {name}")
    label, entries = selected[-1]
    if sport == "soccer":
        entries = sorted(entries, key=lambda e: number(stat(e, "rank"), 999))
        columns = ["P", "W", "D", "L", "GD", "Pts"]
        keys = ["gamesPlayed", "wins", "ties", "losses", "pointDifferential", "points"]
    else:
        entries = sorted(entries, key=lambda e: number(stat(e, "playoffSeed"), 999))
        columns = ["W", "L", "T", "PCT"] if sport == "football" else ["W", "L", "PCT", "GB"]
        keys = ["wins", "losses", "ties", "winPercent"] if sport == "football" else ["wins", "losses", "winPercent", "gamesBehind"]
    rows = []
    for i, entry in enumerate(entries, 1):
        rows.append({"id": str(entry["team"]["id"]), "position": stat(entry, "rank", str(i)) if sport == "soccer" else stat(entry, "playoffSeed", "—"), "name": entry["team"].get("shortDisplayName", entry["team"]["displayName"]), "values": [stat(entry, key) for key in keys]})
    my_entry = next(e for e in entries if str(e["team"]["id"]) == team_id)
    my_row = next(e for e in rows if e["id"] == team_id)
    events = {str(e["id"]): e for d in [results, fixtures] for e in d.get("events", [])}
    matches = sorted([match(e, team_id) for e in events.values()], key=lambda m: date(m["date"]))
    now = dt.datetime.now(dt.timezone.utc)
    past = [m for m in matches if m["completed"]]
    future = [m for m in matches if not m["completed"] and m["state"] == "pre" and date(m["date"]) >= now]
    current = next((m for m in matches if m["state"] == "in"), None)
    logos = results["team"].get("logos", [])
    record = "–".join(stat(my_entry, k) for k in (["wins", "ties", "losses"] if sport == "soccer" else ["wins", "losses", "ties"] if sport == "football" else ["wins", "losses"]))
    return {"id": slug, "teamId": team_id, "name": name, "sport": sport, "league": league_name,
            "logo": f"assets/sports/{slug}.png", "logoSource": results["team"].get("logo", logos[0]["href"] if logos else ""),
            "position": my_row["position"], "positionLabel": "Position" if sport == "soccer" else "Conference seed" if sport == "football" else "League seed", "record": record,
            "recordLabel": "W–D–L" if sport == "soccer" else "W–L–T" if sport == "football" else "W–L",
            "standingsTitle": label, "columns": columns, "standings": rows,
            "latest": past[-1] if past else None, "next": future[0] if future else None,
            "current": current, "recent": list(reversed(past[-5:])),
            "sourceURL": f"https://www.espn.com/{'soccer' if sport == 'soccer' else league}/standings" + (f"/_/league/{league}" if sport == "soccer" else "")}

def main():
    # Collect all six before changing the file: partial failures preserve last good data.
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        teams = list(executor.map(collect, TEAMS))
    snapshot = {"version": 1, "updatedAt": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"), "source": "ESPN", "teams": teams}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temporary = OUTPUT.with_suffix(".tmp")
    temporary.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(OUTPUT)
    print(f"Updated {len(teams)} teams at {snapshot['updatedAt']}")

if __name__ == "__main__":
    main()
