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

# Extended data: competition-specific soccer figures, player leaders, and rosters.
# No external Python dependencies or API keys.
NOW = dt.datetime.now(dt.timezone.utc)
STAMP = NOW.isoformat(timespec="seconds")
# Verified club staff. Update names/source/verifiedAt here after coaching changes.
# ESPN roster coach fields may be outdated or absent; these are maintained entries.
COACHES = {
    "dortmund": {
        "title": "Head coach",
        "name": "Niko Kovač",
        "source": "https://www.bvb.de/de/en/teams/football/coaches/niko-kovac.html",
        "verifiedAt": "2026-10-19"
    },
    "brighton": {
        "title": "Head coach",
        "name": "Fabian Hürzeler",
        "source": "https://www.brightonandhovealbion.com/mens-first-team-coaches",
        "verifiedAt": "2026-10-19"
    },
    "roma": {
        "title": "Head coach",
        "name": "Gian Piero Gasperini",
        "source": "https://www.asroma.com/en/teams/staff-men/gian-piero-gasperini",
        "verifiedAt": "2026-10-19"
    },
    "atlanta-united": {
        "title": "Head coach",
        "name": "Gerardo “Tata” Martino",
        "source": "https://www.atlutd.com/club/coaching-staff/tata-martino",
        "verifiedAt": "2026-10-19"
    },
    "falcons": {
        "title": "Head coach",
        "name": "Kevin Stefanski",
        "source": "https://www.atlantafalcons.com/team/coaches-roster/kevin-stefanski",
        "verifiedAt": "2026-10-19"
    },
    "braves": {
        "title": "Manager",
        "name": "Walt Weiss",
        "source": "https://www.mlb.com/braves/roster/coaches",
        "verifiedAt": "2026-10-19"
    }
}
try:
    PREVIOUS = json.loads(OUTPUT.read_text(encoding="utf-8"))
except (OSError, ValueError):
    PREVIOUS = {}
CACHE = PREVIOUS.get("matchCache", {})
NEW_CACHE = {}
MATCH_POOL = concurrent.futures.ThreadPoolExecutor(max_workers=5)
PLAYER_POOL = concurrent.futures.ThreadPoolExecutor(max_workers=5)
COMPETITIONS = {
    "uefa.champions": "Champions League", "uefa.europa": "Europa League",
    "uefa.europa.conf": "Conference League", "concacaf.champions": "CONCACAF Champions Cup",
    "eng.fa": "FA Cup", "eng.league_cup": "Carabao Cup",
    "ger.dfb_pokal": "DFB-Pokal", "ita.coppa_italia": "Coppa Italia",
}

def optional(url):
    try:
        return fetch(url)
    except Exception as error:
        print(f"Optional data unavailable: {url}: {error}")
        return None

def roster_rows(payload):
    rows = []
    for entry in (payload or {}).get("athletes", []):
        players = entry.get("items", [entry])
        for player in players:
            rows.append({"id": str(player["id"]), "name": player.get("displayName", player.get("fullName", "Unknown")),
                         "number": player.get("jersey", "—"), "position": player.get("position", {}).get("abbreviation", "—")})
    return rows

def summary_stats(matches, sport):
    completed = [m for m in matches if m["completed"]]
    played = len(completed)
    scored = sum(number(m["scoreFor"]) for m in completed)
    conceded = sum(number(m["scoreAgainst"]) for m in completed)
    values = [["Played", str(played)], ["Goals scored" if sport == "soccer" else "Points scored", str(int(scored))],
              ["Goals conceded" if sport == "soccer" else "Points conceded", str(int(conceded))]]
    unbeaten = 0
    for m in reversed(completed):
        if m["result"] == "L":
            break
        unbeaten += 1
    if sport == "soccer":
        values += [["Clean sheets", str(sum(number(m["scoreAgainst"]) == 0 for m in completed))], ["Unbeaten run", f"{unbeaten} games"]]
    else:
        values += [["Points / game", f"{scored/played:.1f}" if played else "—"], ["Unbeaten run", f"{unbeaten} games"]]
    return values

def pack_matches(events, team_id):
    unique = {str(e["id"]): e for e in events}
    return sorted([match(e, team_id) for e in unique.values()], key=lambda m: date(m["date"]))

def match_fields(matches):
    past = [m for m in matches if m["completed"]]
    future = [m for m in matches if not m["completed"] and m["state"] == "pre" and date(m["date"]) >= NOW]
    return {"latest": past[-1] if past else None, "recent": list(reversed(past[-5:])),
            "next": future[0] if future else None, "form": [m["result"] for m in past[-5:]],
            "current": next((m for m in matches if m["state"] == "in"), None)}

def soccer_report(args):
    league, event, team_id = args
    key = league + ":" + event["id"] + ":" + team_id
    old = CACHE.get(key)
    # Recheck recent matches and every incomplete report; cache complete older reports.
    if old and old.get("goalsComplete") and old.get("assistsComplete") and NOW-date(event["date"]) > dt.timedelta(days=3):
        NEW_CACHE[key] = old
        return old
    payload = optional(f"https://site.api.espn.com/apis/site/v2/sports/soccer/{league}/summary?event={event['id']}")
    if not payload:
        if old:
            NEW_CACHE[key] = old
            return old
        return {"players": [], "goalsComplete": False, "assistsComplete": False}
    teams = payload.get("rosters", [])
    own = next((r for r in teams if str(r.get("team", {}).get("id")) == team_id), {})
    opposing = next((r for r in teams if str(r.get("team", {}).get("id")) != team_id), {})
    players = []
    complete = bool(own.get("roster"))
    for player in own.get("roster", []):
        stats = {s["name"]: s.get("value") for s in player.get("stats", [])}
        if not stats and not player.get("active"):
            continue
        if stats.get("totalGoals") is None or stats.get("goalAssists") is None:
            complete = False
        athlete = player.get("athlete", {})
        players.append({"id": str(athlete.get("id", "")), "name": athlete.get("displayName", "Unknown"),
                        "goals": stats.get("totalGoals"), "assists": stats.get("goalAssists")})
    own_goals = sum(number(s.get("value")) for player in opposing.get("roster", []) for s in player.get("stats", []) if s.get("name") == "ownGoals")
    counted = sum(number(p["goals"]) for p in players)
    reconciled = complete and abs(counted + own_goals-number(event["scoreFor"])) < .01
    record = {"players": players, "goalsComplete": reconciled, "assistsComplete": complete and reconciled, "checkedAt": STAMP}
    if not reconciled and old and old.get("goalsComplete"):
        record = old
    NEW_CACHE[key] = record
    return record

def soccer_leaders(league, matches, team_id):
    played = [m for m in matches if m["completed"]]
    futures = [MATCH_POOL.submit(soccer_report, (league, m, team_id)) for m in played]
    reports = [f.result() for f in futures]
    groups_out = []
    for title, field, coverage in [("Top scorers", "goals", "goalsComplete"), ("Top assists", "assists", "assistsComplete")]:
        complete_reports = [r for r in reports if r.get(coverage)]
        totals = {}
        for report in complete_reports:
            for player in report["players"]:
                current = totals.setdefault(player["id"], {"name": player["name"], "value": 0})
                current["value"] += number(player.get(field))
        leaders = sorted([p for p in totals.values() if p["value"] > 0], key=lambda p: (-p["value"], p["name"]))[:3]
        groups_out.append({"title": title, "unit": "goals" if field == "goals" else "assists", "players": [{"name": p["name"], "value": str(int(p["value"]))} for p in leaders],
                           "status": "complete" if played and len(complete_reports) == len(played) else "partial" if complete_reports else "unavailable",
                           "note": f"{len(complete_reports)} of {len(played)} match reports verified" if played else "No completed matches yet"})
    return groups_out

def soccer_competitions(spec, base):
    slug, name, sport, default_league, team_id, league_name = spec
    url = f"https://site.api.espn.com/apis/site/v2/sports/soccer/all/teams/{team_id}/schedule"
    results = fetch(url)
    fixtures = fetch(url + "?fixture=true")
    by_league = {}
    for e in results.get("events", []) + fixtures.get("events", []):
        league = e.get("league", {}).get("slug", default_league)
        if league == default_league or league in COMPETITIONS:
            by_league.setdefault(league, []).append(e)
    # Always include the domestic league as the first tab.
    by_league.setdefault(default_league, [])
    competitions = []
    for league in [default_league] + sorted(k for k in by_league if k != default_league):
        matches = pack_matches(by_league[league], team_id)
        item = {k: v for k, v in base.items() if k not in ["logoSource"]}
        item.update({"id": league, "label": "League" if league == default_league else COMPETITIONS[league],
                     "updatedAt": STAMP, "season": results.get("season", {}).get("displayName", "Current season"),
                     "teamStats": summary_stats(matches, sport), "statsNote": "Selected competition · Current season", **match_fields(matches)})
        if league != default_league:
            item.update({"standings": [], "standingsTitle": COMPETITIONS[league], "columns": [], "isCup": True,
                         "fixtures": list(reversed([m for m in matches if m["completed"]]))[:8] + [m for m in matches if not m["completed"] and date(m["date"]) >= NOW][:8],
                         "sourceURL": f"https://www.espn.com/soccer/fixtures/_/league/{league}"})
            if league.startswith("uefa."):
                table = optional(f"https://site.api.espn.com/apis/v2/sports/soccer/{league}/standings")
                selected = [(label, entries) for label, entries in groups(table or {}) if any(str(e["team"]["id"]) == team_id for e in entries)]
                if selected:
                    label, entries = selected[-1]
                    item.update({"standingsTitle": label, "columns": ["P", "W", "D", "L", "GD", "Pts"], "isCup": False, "sourceURL": f"https://www.espn.com/soccer/standings/_/league/{league}",
                        "standings": [{"id": str(e["team"]["id"]), "name": e["team"].get("shortDisplayName", e["team"]["displayName"]), "position": stat(e,"rank",str(i)), "values": [stat(e,k) for k in ["gamesPlayed","wins","ties","losses","pointDifferential","points"]]} for i,e in enumerate(sorted(entries,key=lambda e:number(stat(e,"rank"),999)),1)]})
        item["leaders"] = soccer_leaders(league, matches, team_id)
        competitions.append(item)
    return competitions

def nfl_athlete(player, year):
    payload = optional(f"https://site.web.api.espn.com/apis/common/v3/sports/football/nfl/athletes/{player['id']}/stats?seasontype=2")
    if not payload:
        return None
    stats = {}
    for category in payload.get("categories", []):
        for row in category.get("statistics", []):
            if str(row.get("teamId")) == "1" and row.get("season", {}).get("year") == year:
                stats.update(zip(category.get("names", []), row.get("stats", [])))
    return {"name": player["name"], "stats": stats}

def nfl_leaders(roster, year):
    candidates = [p for p in roster if p["position"] in ["QB", "RB", "FB", "WR", "TE"]]
    reports = [f.result() for f in [PLAYER_POOL.submit(nfl_athlete, p, year) for p in candidates]]
    valid = [r for r in reports if r is not None]
    output = []
    for title, field, td in [("Passing", "passingYards", "passingTouchdowns"), ("Rushing", "rushingYards", "rushingTouchdowns"), ("Receiving", "receivingYards", "receivingTouchdowns")]:
        players = [p for p in valid if field in p["stats"] and number(p["stats"][field].replace(",", "")) > 0]
        players.sort(key=lambda p: -number(p["stats"][field].replace(",", "")))
        output.append({"title": title, "unit": "yards", "status": "complete" if candidates and len(valid) == len(candidates) else "partial" if valid else "unavailable",
                       "note": f"{year} regular season · Current roster", "players": [{"name": p["name"], "value": p["stats"][field], "extra": p["stats"].get(td, "—") + " TD" + (" · " + p["stats"].get("interceptions", "—") + " INT" if field == "passingYards" else "")} for p in players[:3]]})
    return output

def mlb_details(year):
    root = "https://statsapi.mlb.com/api/v1"
    hitting = optional(f"{root}/stats?stats=season&group=hitting&teamId=144&season={year}&sportIds=1&limit=200")
    pitching = optional(f"{root}/stats?stats=season&group=pitching&teamId=144&season={year}&sportIds=1&limit=200&playerPool=ALL")
    overall = optional(f"{root}/teams/144/stats?stats=season&group=hitting,pitching&season={year}")
    groups_out = []
    for title, key, data in [("Home runs", "homeRuns", hitting), ("RBIs", "rbi", hitting), ("Strikeouts", "strikeOuts", pitching)]:
        splits = [s for g in (data or {}).get("stats", []) for s in g.get("splits", []) if str(s.get("team", {}).get("id")) == "144" and str(s.get("season")) == str(year)]
        splits.sort(key=lambda s: -number(s.get("stat", {}).get(key)))
        groups_out.append({"title": title, "unit": "HR" if key == "homeRuns" else "RBI" if key == "rbi" else "K", "status": "complete" if data and splits else "unavailable",
                           "note": f"{year} regular season", "players": [{"name": s["player"]["fullName"], "value": str(s["stat"].get(key, "—")), "extra": str(s["stat"].get("era", "—")) + " ERA" if key == "strikeOuts" else ""} for s in splits[:3]]})
    stats = []
    for group in (overall or {}).get("stats", []):
        rows = group.get("splits", [])
        if not rows:
            continue
        values = rows[0].get("stat", {})
        keys = [("Runs scored","runs"),("Home runs","homeRuns"),("Batting average","avg"),("OPS","ops")] if group.get("group",{}).get("displayName") == "hitting" else [("Team ERA","era"),("Runs allowed","runs"),("Strikeouts","strikeOuts")]
        stats += [[title,str(values[key])] for title,key in keys if key in values]
    return groups_out, stats

def enrich(spec):
    base = collect(spec)
    slug, name, sport, league, team_id, label = spec
    roster_payload = optional(f"https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams/{team_id}/roster")
    roster = roster_rows(roster_payload)
    base["coach"] = COACHES.get(slug)
    base["roster"] = roster
    base["rosterUpdatedAt"] = STAMP if roster_payload else None
    if sport == "soccer":
        base["competitions"] = soccer_competitions(spec, base)
    else:
        year = (roster_payload or {}).get("season", {}).get("year", NOW.year)
        comp = {k:v for k,v in base.items() if k not in ["roster", "logoSource"]}
        comp.update({"id": league, "label": "League", "updatedAt": STAMP, "statsNote": f"{year} regular season", "form": [m["result"] for m in reversed(base["recent"])]})
        if sport == "football":
            comp["leaders"] = nfl_leaders(roster, year)
            payload = fetch(f"https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/1/schedule?season={year}&seasontype=2")
            comp["teamStats"] = summary_stats(pack_matches(payload.get("events", []), team_id), sport)
        else:
            comp["leaders"], comp["teamStats"] = mlb_details(year)
        base["competitions"] = [comp]
    return base

def main():
    try:
        with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
            teams = list(executor.map(enrich, TEAMS))
    finally:
        MATCH_POOL.shutdown(wait=True)
        PLAYER_POOL.shutdown(wait=True)
    snapshot = {"version": 2, "updatedAt": STAMP, "source": "ESPN / MLB", "teams": teams, "matchCache": NEW_CACHE}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    temp = OUTPUT.with_suffix(".tmp")
    temp.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temp.replace(OUTPUT)
    print(f"Updated {len(teams)} teams at {STAMP}; {len(NEW_CACHE)} soccer reports cached")

if __name__ == "__main__":
    main()
