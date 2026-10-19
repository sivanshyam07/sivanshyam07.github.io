/* Shared renderer. Most edits belong in content.js. */

const data = window.PORTFOLIO;
const page = document.body.dataset.page;

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function safeURL(value) {
  if (!value || typeof value !== "string") return "";

  try {
    const u = new URL(value, location.href);
    return ["http:", "https:", "file:", "mailto:", "tel:"].includes(u.protocol)
      ? value
      : "";
  } catch {
    return "";
  }
}

function link(label, href, cls = "text-link") {
  const a = el("a", cls, label);
  a.href = safeURL(href) || "#";
  return a;
}

function paragraphs(parent, texts = []) {
  texts.forEach(text => {
    const p = el("p");
    const pattern = /\[([^\]]+)\]\s*\(([^)]+)\)/g;
    let position = 0;

    for (const match of text.matchAll(pattern)) {
      p.append(document.createTextNode(
        text.slice(position, match.index)
      ));

      if (safeURL(match[2])) {
        p.append(link(match[1], match[2]));
      } else {
        p.append(document.createTextNode(match[1]));
      }

      position = match.index + match[0].length;
    }

    p.append(document.createTextNode(text.slice(position)));
    parent.append(p);
  });
}

/* Shared navigation */

const header = document.getElementById("header");
const brand = link(data.name, "index.html", "brand");

brand.append(el("span", "", " /"));
header.append(brand);

const nav = el("nav");
nav.setAttribute("aria-label", "Main navigation");

data.navigation.forEach(item => {
  const a = link(item.label, item.href, "");

  if (
    item.page === page ||
    (page === "project" && item.page === "projects")
  ) {
    a.setAttribute("aria-current", "page");
  }

  nav.append(a);
});

header.append(nav);

const main = document.getElementById("main");

/* Projects overview */

function projectIndex(items = []) {
  const list = el("div", "project-list");

  items.filter(item => item.visible !== false).forEach((item, index) => {
    const row = link(
      "",
      "project.html?id=" + encodeURIComponent(item.id),
      "project-preview"
    );

    row.setAttribute("aria-label", "Read about " + item.title);

    const number = el(
      "span",
      "project-number",
      String(index + 1).padStart(2, "0")
    );

    const copy = el("div", "project-preview-copy");
    copy.append(el("h2", "", item.title));

    if (item.category) {
      copy.append(el("p", "project-category", item.category));
    }

    copy.append(
      el("p", "project-summary", item.summary || item.text?.[0] || ""),
      el("span", "text-link", "View project →")
    );

    row.append(number, copy);

    const cover = item.cover ||
      (item.media || []).find(asset => asset.type === "image")?.src;

    if (safeURL(cover)) {
      const image = el("img", "project-preview-image");
      image.src = cover;
      image.alt = item.coverAlt || item.title;
      image.loading = "lazy";
      row.append(image);
    }

    list.append(row);
  });

  main.append(list);
}

/* Images and videos */

function mediaFigure(asset) {
  if (!safeURL(asset.src)) return null;

  const figure = el("figure");

  if (asset.type === "video") {
    const video = el("video");
    video.src = asset.src;
    video.controls = true;
    video.preload = "metadata";

    if (safeURL(asset.poster)) {
      video.poster = asset.poster;
    }

    figure.append(video);
  } else {
    const img = el("img");
    img.src = asset.src;
    img.alt = asset.alt || asset.caption || "";
    img.loading = "lazy";
    figure.append(img);
  }

  if (asset.caption) {
    figure.append(el("figcaption", "", asset.caption));
  }

  return figure;
}

/* Full project and general content sections */

/* Full project and general content sections */

function sections(items = []) {
  const layouts = {
  rocket: ["nose", "parts", "analysis"],
  glider: ["initial", "final"],
  injector: ["geometry", "mesh", "cfd"],
  voxel: ["process", "results", "design"]
};

  items.filter(item => item.visible !== false).forEach(item => {
    const section = el("section", "section");
    const row = el("div", "section-heading");
    const heading = el("div", "project-heading");
    const body = el("div");

    heading.append(
      el(page === "project" ? "h1" : "h2", "", item.title)
    );

    paragraphs(body, item.text);
    row.append(heading, body);
    section.append(row);

    const groups = layouts[item.layout];

    if (groups) {
      section.classList.add(item.layout + "-project");

      const gallery = el("div", item.layout + "-gallery");
      const columns = {};
      const extras = el("div", "media-grid");

      groups.forEach(group => {
        columns[group] = el("div", item.layout + "-" + group);
      });

      (item.media || []).forEach(asset => {
        const figure = mediaFigure(asset);
        if (!figure) return;

        if (asset.group === "hero") {
          heading.append(figure);
        } else if (groups.includes(asset.group)) {
          columns[asset.group].append(figure);
        } else {
          extras.append(figure);
        }
      });

      groups.forEach(group => {
        if (columns[group].childElementCount) {
          gallery.append(columns[group]);
        }
      });

      if (gallery.childElementCount) section.append(gallery);
      if (extras.childElementCount) section.append(extras);

    } else {
      const media = el("div", "media-grid");

      (item.media || []).forEach(asset => {
        const figure = mediaFigure(asset);
        if (figure) media.append(figure);
      });

      if (media.childElementCount) section.append(media);
    }

    const links = el("div", "links");

    (item.links || []).forEach(item => {
      if (safeURL(item.href)) {
        links.append(link(item.label + " ↗", item.href));
      }
    });

    if (links.childElementCount) section.append(links);
    main.append(section);
  });
}
/* Homepage */

if (page === "home") {
  const hero = el("section", "hero");
  const intro = el("div");

  intro.append(
    el("div", "eyebrow", data.home.eyebrow),
    el("h1", "", data.name),
    el("div", "subtitle", data.subtitle),
    el("div", "institution", data.institution)
  );

  paragraphs(intro, data.home.intro);
  hero.append(intro);

  const portrait = el("div", "portrait");

  if (safeURL(data.portrait)) {
    const img = el("img");
    img.src = data.portrait;
    img.alt = data.portraitAlt;
    portrait.append(img);
  } else {
    const placeholder = el("div", "portrait-placeholder");

    placeholder.append(
      el("strong", "", "SS"),
      el("span", "", "Portrait coming soon")
    );

    portrait.append(placeholder);
  }

  hero.append(portrait);
  main.append(hero);
  sections(data.home.sections);

  const paths = el("section");
  paths.setAttribute("aria-label", "Explore this site");

  data.home.pathways.forEach(item => {
    const row = el("div", "pathway");
    const text = el("div");

    text.append(
      el("h3", "", item.title),
      el("p", "", item.text)
    );

    row.append(
      el("span", "number", item.number),
      text,
      link(item.label + " →", item.href)
    );

    paths.append(row);
  });

  main.append(paths);

/* Individual project page */

} else if (page === "project") {
  const id = new URLSearchParams(location.search).get("id");

  const project = data.projects.sections.find(
    item => item.id === id && item.visible !== false
  );

  const back = el("div", "project-back");
  back.append(link("← All projects", "projects.html"));
  main.append(back);

  if (project) {
    document.title = project.title + " | " + data.name;
    sections([project]);
  } else {
    main.append(
      el("h1", "", "Project not found"),
      el("p", "", "Choose a project from the Projects page.")
    );
  }

/* Projects, Beyond the Classroom, and Contact pages */

} else if (page === "beyond") {
  renderBeyond();
} else {
  const config = data[page];
  const intro = el("section", "page-intro");

  intro.append(
    el("div", "eyebrow", config.eyebrow),
    el("h1", "", config.title),
    el("p", "", config.intro)
  );

  main.append(intro);

  if (page === "contact") {
    const grid = el("div", "contact-grid");
    const details = el("div");

    details.append(el("h2", "", "Come and say hi!"));

    if (data.phone) {
      const p = el("p");
      p.append(
        link(data.phone, "tel:" + data.phone.replace(/[^\d+]/g, ""))
      );
      details.append(p);
    }

    if (data.email) {
      const p = el("p");
      p.append(
        link(data.email, "mailto:" + data.email),
        document.createTextNode(" (preferred)")
      );
      details.append(p);
    }

    if (data.gtEmail) {
      const p = el("p");
      p.append(link(data.gtEmail, "mailto:" + data.gtEmail));
      details.append(p);
    }

    if (safeURL(data.linkedin)) {
      const p = el("p");
      p.append(link("LinkedIn ↗", data.linkedin));
      details.append(p);
    }

    const form = el("form");
    form.method = "POST";

    const endpoint = safeURL(data.formEndpoint);
    const configured = endpoint && endpoint.startsWith("https://");

    if (configured) form.action = endpoint;

    [
      ["Name", "name", "text"],
      ["Email", "email", "email"],
      ["Message", "message", "textarea"]
    ].forEach(([label, name, type]) => {
      const wrapper = el("label", "", label);
      const field = el(type === "textarea" ? "textarea" : "input");

      field.name = name;
      field.required = true;

      if (type !== "textarea") {
        field.type = type;
        field.autocomplete = name;
      } else {
        field.rows = 6;
      }

      wrapper.append(field);
      form.append(wrapper);
    });

    const trap = el("input", "trap");
    trap.type = "text";
    trap.name = "_gotcha";
    trap.tabIndex = -1;
    trap.setAttribute("aria-hidden", "true");
    form.append(trap);

    const button = el("button", "", "Send message");
    button.type = "submit";
    button.disabled = !configured;
    form.append(button);

    if (!configured) {
      form.addEventListener("submit", e => e.preventDefault());

      const note = el(
        "p",
        "note",
        "This form is not connected yet. Messages cannot be sent until it is configured."
      );

      note.id = "form-note";
      form.setAttribute("aria-describedby", "form-note");
      form.append(note);
    }

    grid.append(details, form);
    main.append(grid);

  } else {
    if (page === "projects" && safeURL(data.resume)) {
      const links = el("div", "links");
      links.append(link("View resume ↗", data.resume));
      main.append(links);
    }

    if (!(config.sections || []).some(item => item.visible !== false)) {
      const empty = el("section", "empty");

      empty.append(
        el(
          "h2",
          "",
          page === "projects"
            ? "Project stories coming soon."
            : "More about me, coming soon."
        ),
        el(
          "p",
          "",
          page === "projects"
            ? "I'll be adding the work, photos, and details behind my engineering projects here."
            : "I'll be sharing music, soccer, and other interests here."
        )
      );

      main.append(empty);

    } else if (page === "projects") {
      projectIndex(config.sections);

    } else {
      sections(config.sections);
    }
  }
}

document.getElementById("footer").replaceChildren();
function renderBeyond() {
  const config = data.beyond;
  const items = config.sections.filter(item => item.visible !== false);
  const requested = new URLSearchParams(location.search).get("id");
  const id = ["life-experiences", "about-me", "model-un"].includes(requested)
    ? "photos" : requested;

  function map() {
    const ns = "http://www.w3.org/2000/svg";
    function svg(tag, attrs = {}) {
      const node = document.createElementNS(ns, tag);
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      return node;
    }
    const root = svg("svg", {
      viewBox: "0 0 1000 500", role: "img", class: "btc-map",
      "aria-label": "Visited countries and US states"
    });
    root.append(svg("rect", { width:1000, height:500, fill:"#100c19" }));
    const loading = svg("text", { x:30, y:250, fill:"#b9b0c8", "font-size":22 });
    loading.textContent = "Loading travel map…";
    root.append(loading);
    fetch("assets/travel-regions.json")
      .then(response => {
        if (!response.ok) throw new Error("Map file not found");
        return response.json();
      })
      .then(atlas => {
        loading.remove();
        const visited = config.travel || {};
        atlas.regions.forEach(region => {
          const selected = (visited[region.group] || []).includes(region.code);
          const tentative = region.group === "states" &&
            (visited.tentativeStates || []).includes(region.code);
          const shape = svg("path", {
            d:region.d, fill:selected ? "#c3a0ef" : tentative ? "#756284" : "#302638",
            stroke:"#100c19", "stroke-width":region.group === "countries" ? .6 : 1,
            "fill-rule":"evenodd"
          });
          const title = svg("title");
          title.textContent = region.name + (selected ? " — visited" : tentative ? " — tentative" : "");
          shape.append(title);
          root.append(shape);
        });
        atlas.labels.forEach(label => {
          const text = svg("text", { x:label.x, y:label.y, fill:"#b9b0c8", "font-size":17, "font-family":"sans-serif" });
          text.textContent = label.text;
          root.append(text);
        });
        const legend = [[20,"#c3a0ef","Visited"]];
        if ((visited.tentativeStates || []).length) legend.push([175,"#756284","Tentative"]);
        legend.forEach(([x,color,label]) => {
          root.append(svg("rect", { x, y:440, width:14, height:14, rx:3, fill:color }));
          const text = svg("text", { x:x+23, y:453, fill:"#b9b0c8", "font-size":17, "font-family":"sans-serif" });
          text.textContent = label;
          root.append(text);
        });
      })
      .catch(() => { loading.textContent = "Upload travel-regions.json to show the map."; });
    return root;
  }


  function gallery(media = []) {
    const grid = el("div", "btc-gallery");
    media.forEach(asset => {
      if (!safeURL(asset.src)) return;
      const figure = el("figure", "btc-photo");
      if (asset.type === "video") {
        const video = el("video");
        video.src = asset.src;
        video.controls = true;
        video.playsInline = true;
        video.preload = "none";
        video.setAttribute("aria-label", asset.alt || asset.caption || "Travel video");
        if (safeURL(asset.poster)) video.poster = asset.poster;
        figure.append(video);
      } else {
        const a = link("", asset.src, "btc-full-image");
        a.target = "_blank";
        a.rel = "noopener";
        const img = el("img");
        img.src = asset.src;
        img.alt = asset.alt || asset.caption || "Photo";
        img.loading = "lazy";
        a.append(img);
        figure.append(a);
      }
      if (asset.caption) figure.append(el("figcaption", "", asset.caption));
      grid.append(figure);
    });
    return grid;
  }

  const intro = el("section", "page-intro");
  if (id !== null) {
    main.append(link("← Beyond the Classroom", "beyond.html", "text-link btc-back"));
    const item = items.find(item => item.id === id);
    intro.className += " btc-detail-intro";
    intro.append(el("h1", "", item ? item.title : "Section not found"));
    main.append(intro);
    if (!item) return;
    document.title = item.title + " | " + data.name;
    const detail = el("section", "btc-detail");
    if (item.id === "sports") renderSportsBoard(detail);
    if (!item.playlist) paragraphs(detail, item.text || []);

    if (item.playlist) {
      const block = el("section", "btc-playlist");
      const a = link("", item.playlist.href, "btc-snoopy");
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", "Open my mega playlist on Spotify (new tab)");
      const img = el("img");
      img.src = item.playlist.image;
      img.alt = "Snoopy — open my Spotify playlist";
      a.append(img, el("span", "", "Open my playlist ↗"));
      const copy = el("div");
      copy.append(el("h2", "", "The mega playlist"), el("p", "", item.playlist.note));
      paragraphs(copy, item.text || []);
      block.append(a, copy);
      detail.append(block);
    }
    function spotifyLink(label, href, cls) {
      const a = link(label, href, cls);
      a.target = "_blank";
      a.rel = "noopener";
      return a;
    }
    if (item.stats) {
      const stats = el("section", "music-stats");
      stats.append(el("h2", "", "Playlist by the numbers"), el("p", "", item.stats.intro));
      const columns = el("div", "music-stats-grid");
      const genres = el("section", "music-genres");
      genres.append(el("h3", "", "Genre breakdown"));
      const palette = ["#bb8ee9", "#68bfd4", "#e7ad76", "#e084a8", "#7f9be4", "#a7c97b", "#d5c87b", "#bd8c7b", "#727b94"];
      const entries = item.stats.genres.slice(0, 8).map(([name, value], i) => ({name, value, color:palette[i]}));
      const others = item.stats.genres.slice(8);
      if (others.length) entries.push({name:"Other", value:Math.round(others.reduce((sum, g) => sum + g[1], 0) * 10) / 10, color:palette[8]});
      const ns = "http://www.w3.org/2000/svg";
      function svgNode(tag, attrs) {
        const n = document.createElementNS(ns, tag);
        Object.entries(attrs).forEach(([key, value]) => n.setAttribute(key, value));
        return n;
      }
      const chart = svgNode("svg", {viewBox:"0 0 240 240", role:"img", "aria-labelledby":"music-chart-title music-chart-description", class:"music-donut"});
      const title = svgNode("title", {id:"music-chart-title"});
      title.textContent = "Playlist genre breakdown";
      const desc = svgNode("desc", {id:"music-chart-description"});
      desc.textContent = item.stats.genres.map(([n,v]) => n + ": " + v + "%").join("; ");
      chart.append(title, desc);
      const total = entries.reduce((sum, e) => sum + e.value, 0);
      let offset = 0;
      entries.forEach(entry => {
        const size = entry.value / total * 100;
        const circle = svgNode("circle", {cx:120, cy:120, r:88, fill:"none", stroke:entry.color, "stroke-width":38, pathLength:100, "stroke-dasharray":size + " " + (100-size), "stroke-dashoffset":-offset, transform:"rotate(-90 120 120)"});
                const tooltip = svgNode("title", {});
        tooltip.textContent =
          entry.name + ": " + entry.value.toFixed(1) + "%";
        circle.append(tooltip);

        chart.append(circle);
        offset += size;
      });
      genres.append(chart);
      const legend = el("ul", "music-legend");
      entries.forEach(entry => {
        const row = el("li");
        const dot = el("span", "music-legend-dot");
        dot.setAttribute("style", "background-color:" + entry.color);
        dot.setAttribute("aria-hidden", "true");
        row.append(dot, el("span", "", entry.name), el("strong", "", entry.value.toFixed(1) + "%"));
        legend.append(row);
      });
      genres.append(legend);
      if (others.length) {
        const details = el("details", "music-other");
        details.append(el("summary", "", "What’s in Other?"), el("p", "", others.map(([n,v]) => n + " " + v.toFixed(1) + "%").join(" · ")));
        genres.append(details);
      }
      genres.append(el("p", "music-stats-note", "Percentages rounded; total may differ slightly from 100%."));
      const artists = el("section", "music-artists");
      artists.append(el("h3", "", "Most represented artists"));
      const artistList = el("ol", "music-artist-list");
      item.stats.artists.forEach(artist => {
        const row = el("li");
        const photo = spotifyLink("", artist.href, "music-artist-photo");
        photo.setAttribute("aria-label", "Listen to " + artist.name + " on Spotify (new tab)");
        const img = el("img");
        img.src = artist.image; img.alt = ""; img.loading = "lazy";
        photo.append(img);
        row.append(photo, spotifyLink(artist.name, artist.href, "music-artist-name"), el("span", "music-track-count", artist.count + " songs"));
        artistList.append(row);
      });
      artists.append(artistList);
      columns.append(genres, artists);
      stats.append(columns);
      detail.append(stats);
    }
    if (item.albums) {
      const section = el("section", "music-albums");
      section.append(el("h2", "", "Albums on repeat"));
      const grid = el("div", "music-album-grid");
      item.albums.forEach(album => {
        const card = el("article", "music-album");
        const cover = spotifyLink("", album.href, "music-album-art");
        cover.setAttribute("aria-label", "Listen to " + album.title + " by " + album.artist + " on Spotify (new tab)");
        const img = el("img");
        img.src = album.image; img.alt = album.title + " album cover"; img.loading = "lazy";
        cover.append(img);
        const heading = el("h3");
        heading.append(spotifyLink(album.title, album.href, "music-album-title"));
        card.append(cover, heading, el("p", "music-album-artist", album.artist), el("p", "music-album-description", album.description));
        const highlights = el("div", "music-highlights");
        highlights.append(el("strong", "", "Highlights"));
        const list = el("ul");
        album.highlights.forEach(track => {
          const row = el("li");
          row.append(spotifyLink(track.title, track.href, "music-highlight-link"));
          list.append(row);
        });
        highlights.append(list);
        card.append(highlights);
        grid.append(card);
      });
      section.append(grid);
      detail.append(section);
    }

    if (item.favorites) {
      const favorites = el("div", "btc-favorites");
      item.favorites.forEach(group => {
        const section = el("section");
        section.append(el("h2", "", group.title));
        const list = el("ol", "btc-songs");
                group.songs.forEach(([song, artist, href, cover]) => {
          const row = el("li");

          const img = el("img", "btc-album-cover");
          img.src = cover;
          img.alt = "";
          img.loading = "lazy";

          const copy = el("div", "btc-song-copy");

          const title = link(song, href, "btc-song-title");
          title.target = "_blank";
          title.rel = "noopener";

          copy.append(
            title,
            el("span", "", artist)
          );

          row.append(img, copy);
          list.append(row);
        });
        section.append(list);
        favorites.append(section);
      });
      detail.append(favorites);
    }
    if (item.media) detail.append(gallery(item.media));
    main.append(detail);
    return;
  }

  intro.append(el("div", "eyebrow", config.eyebrow),
    el("h1", "", config.title), el("p", "", config.intro));
  main.append(intro);
  const cards = el("div", "btc-cards");
  items.forEach(item => {
    const card = link("", "beyond.html?id=" + encodeURIComponent(item.id),
      "btc-card" + (item.kind === "photos" ? " btc-card-wide" : ""));
    const visual = el("div", "btc-cover");
    if (item.kind === "photos") visual.append(map());
    else if (safeURL(item.image)) {
      const img = el("img");
      img.src = item.image;
      img.alt = item.imageAlt || item.title;
      visual.append(img);
    }
    const copy = el("div", "btc-copy");
    const arrow = el("span", "btc-arrow", "↗");
    arrow.setAttribute("aria-hidden", "true");
    copy.append(el("h2", "", item.title), arrow, el("p", "", item.description));
    card.append(visual, copy);
    cards.append(card);
  });
  main.append(cards);
}

/* Free, periodically refreshed sports snapshot; the last good data stays visible. */
function renderSportsBoard(parent) {
  const section = el("section", "sports-board");
  section.setAttribute("aria-labelledby", "sports-board-heading");
  const top = el("div", "sports-board-top");
  const heading = el("h2", "", "My teams");
  heading.id = "sports-board-heading";
  const timestamp = el("p", "sports-updated", "Loading latest saved results…");
  timestamp.setAttribute("role", "status");
  top.append(heading, timestamp);
  section.append(top);
  parent.append(section);

  // The raw repository URL reflects automated commits without rebuilding Pages.
  const sources = [
    "https://raw.githubusercontent.com/sivanshyam07/sivanshyam07.github.io/main/assets/sports-data.json",
    "assets/sports-data.json"
  ];
  const dateFormat = new Intl.DateTimeFormat(undefined, {month:"short", day:"numeric", year:"numeric", hour:"numeric", minute:"2-digit", timeZoneName:"short"});
  function when(match) {
    const d = new Date(match.date);
    if (!Number.isFinite(d.getTime())) return "Date to be confirmed";
    if (!match.timeConfirmed) return d.toLocaleDateString(undefined, {month:"short",day:"numeric"}) + " · Time TBD";
    return dateFormat.format(d);
  }
  function external(label, href, cls="sports-source-link") {
    const a = link(label, href, cls); a.target="_blank"; a.rel="noopener"; return a;
  }
  function valid(snapshot) {
    return snapshot && snapshot.version === 1 && Number.isFinite(Date.parse(snapshot.updatedAt)) && Array.isArray(snapshot.teams) && snapshot.teams.length === 6 && snapshot.teams.every(team => Array.isArray(team.standings) && Array.isArray(team.columns) && Array.isArray(team.recent));
  }
  Promise.all(sources.map(async url => {
    try {
      const response = await fetch(url, {cache:"no-store", signal:AbortSignal.timeout(12000)});
      if (!response.ok) return null;
      const snapshot = await response.json();
      return valid(snapshot) ? snapshot : null;
    } catch { return null; }
  })).then(results => {
    const available = results.filter(Boolean).sort((a,b) => Date.parse(b.updatedAt)-Date.parse(a.updatedAt));
    if (!available.length) {
      timestamp.textContent = "Scores are unavailable right now. Please try again later.";
      section.append(external("View scores on ESPN ↗", "https://www.espn.com"));
      return;
    }
    const snapshot = available[0];
    const updated = new Date(snapshot.updatedAt);
    function updateStamp() {
      timestamp.replaceChildren();
      const time = el("time", "", dateFormat.format(updated));
      time.dateTime = updated.toISOString();
      timestamp.append(document.createTextNode("Last updated: "), time);
      if (Date.now() - updated.getTime() > 12*60*60*1000) timestamp.append(el("span", "sports-delayed", "Updates delayed"));
    }
    updateStamp();
    const grid = el("div", "sports-team-grid");
    snapshot.teams.forEach(team => {
      const card = el("details", "sports-team-card");
      const summary = el("summary", "sports-team-summary");
      const identity = el("div", "sports-team-identity");
      const logo = el("img", "sports-team-logo");
      logo.src = safeURL(team.logo); logo.alt = ""; logo.loading = "lazy";
      const names = el("div");
      names.append(el("h3", "", team.name), el("span", "sports-league", team.league));
      identity.append(logo, names);
      const metrics = el("div", "sports-team-metrics");
      function metric(label, primary, secondary) {
        const cell = el("div");
        cell.append(el("span", "sports-metric-label", label), el("strong", "", primary));
        if (secondary) cell.append(el("span", "sports-metric-secondary", secondary));
        metrics.append(cell);
      }
      const latest = team.latest;
      metric("Latest result", latest ? latest.scoreFor + "–" + latest.scoreAgainst + " " + latest.result : "No result available", latest ? (latest.home ? "vs " : "at ") + latest.opponent : "");
      const next = team.next;
      metric("Next game", next ? (next.home ? "vs " : "at ") + next.opponent : "Not announced", next ? when(next) : "Check back for fixtures");
      metric(team.positionLabel, "#" + team.position, team.record + " (" + team.recordLabel + ")");
      const expand = el("span", "sports-expand");
      expand.append(el("span", "sports-expand-closed", "Results & standings +"), el("span", "sports-expand-open", "Close details −"));
      summary.append(identity, metrics, expand);
      card.append(summary);
      const body = el("div", "sports-team-expanded");
      if (team.current) body.append(el("p", "sports-snapshot-note", "In progress at last update: " + team.current.opponent + " · " + team.current.scoreFor + "–" + team.current.scoreAgainst + ". Scores are periodic snapshots."));
      const recent = el("section", "sports-recent");
      recent.append(el("h4", "", "Recent results"));
      const list = el("ul");
      team.recent.forEach(match => {
        const row = el("li");
        const result = el("span", "sports-result sports-result-" + match.result, match.result);
        const text = el("div");
        text.append(el("strong", "", (match.home ? "vs " : "at ") + match.opponent), el("span", "", when(match)));
        const score = match.scoreFor + "–" + match.scoreAgainst;
        row.append(result, text, match.href ? external(score,match.href,"sports-score-link") : el("strong","",score));
        list.append(row);
      });
      if (!team.recent.length) recent.append(el("p", "", "No recent results available."));
      recent.append(list);
      const standings = el("section", "sports-standings");
      standings.append(el("h4", "", team.standingsTitle));
      if (team.sport !== "soccer") standings.append(el("p", "sports-table-note", "# shows the source’s conference or league seed."));
      const scroller = el("div", "sports-table-scroll");
      scroller.tabIndex = 0;
      scroller.setAttribute("role", "region");
      scroller.setAttribute("aria-label", team.league + " standings; scroll horizontally if needed");
      const table = el("table");
      const caption = el("caption", "sports-sr-only", team.standingsTitle + " · " + team.name + " highlighted");
      const thead = el("thead"), head = el("tr");
      ["#", "Team", ...team.columns].forEach(label => {const th=el("th","",label);th.scope="col";head.append(th);});
      thead.append(head);
      const tbody = el("tbody");
      team.standings.forEach(entry => {
        const row = el("tr", entry.id === team.teamId ? "sports-selected-team" : "");
        row.append(el("td", "", entry.position));
        const name = el("th", "", entry.name);name.scope="row";row.append(name);
        entry.values.forEach(value => row.append(el("td", "", value)));
        tbody.append(row);
      });
      table.append(caption,thead,tbody);scroller.append(table);standings.append(scroller,external("Full standings on ESPN ↗",team.sourceURL));
      body.append(recent,standings);
      card.append(body);
      card.addEventListener("toggle", () => {
        if (card.open) grid.querySelectorAll("details[open]").forEach(other => {if(other!==card) other.open=false;});
      });
      grid.append(card);
    });
    section.append(grid, el("p", "sports-data-credit", "Data: ESPN · Refreshes approximately every 6 hours · Times shown in your local time zone."));
  });
}
