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

function sections(items = []) {
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

    if (item.layout === "glider") {
      section.classList.add("glider-project");

      const gallery = el("div", "glider-gallery");
      const initial = el("div", "glider-initial");
      const final = el("div", "glider-final");
      const extras = el("div", "media-grid");

      (item.media || []).forEach(asset => {
        const figure = mediaFigure(asset);
        if (!figure) return;

        switch (asset.group) {
          case "hero":
            heading.append(figure);
            break;
          case "initial":
            initial.append(figure);
            break;
          case "final":
            final.append(figure);
            break;
          default:
            extras.append(figure);
        }
      });

      [initial, final].forEach(column => {
        if (column.childElementCount) gallery.append(column);
      });

      if (gallery.childElementCount) section.append(gallery);
      if (extras.childElementCount) section.append(extras);

    } else if (item.layout === "rocket") {
      section.classList.add("rocket-project");

      const gallery = el("div", "rocket-gallery");
      const nose = el("div", "rocket-nose");
      const parts = el("div", "rocket-parts");
      const analysis = el("div", "rocket-analysis");
      const extras = el("div", "media-grid");

      (item.media || []).forEach(asset => {
        const figure = mediaFigure(asset);
        if (!figure) return;

        switch (asset.group) {
          case "hero":
            heading.append(figure);
            break;
          case "nose":
            nose.append(figure);
            break;
          case "parts":
            parts.append(figure);
            break;
          case "analysis":
            analysis.append(figure);
            break;
          default:
            extras.append(figure);
        }
      });

      [nose, parts, analysis].forEach(column => {
        if (column.childElementCount) gallery.append(column);
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
