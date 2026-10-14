/* Shared renderer. Most edits belong in content.js. Text is inserted safely. */
const data = window.PORTFOLIO;
const page = document.body.dataset.page;
function el(tag, cls, text) { const node=document.createElement(tag); if(cls)node.className=cls; if(text!==undefined)node.textContent=text; return node; }
function safeURL(value) { if(!value || typeof value!=="string")return ""; try { const u=new URL(value,location.href); return ["http:","https:","file:","mailto:"].includes(u.protocol)?value:""; } catch{return "";} }
function link(label,href,cls="text-link") { const a=el("a",cls,label); a.href=safeURL(href)||"#"; return a; }
function paragraphs(parent, texts = []) {
  texts.forEach(text => {
    const p = el("p");
    const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
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
const header=document.getElementById("header");
const brand=link(data.name,"index.html","brand"); brand.append(el("span",""," /")); header.append(brand);
const nav=el("nav"); nav.setAttribute("aria-label","Main navigation");
data.navigation.forEach(item=>{const a=link(item.label,item.href,"");if(item.page===page)a.setAttribute("aria-current","page");nav.append(a);}); header.append(nav);
const main=document.getElementById("main");
function sections(items=[]) {
  items.filter(item=>item.visible!==false).forEach(item=>{
    const section=el("section","section");const row=el("div","section-heading");row.append(el("h2","",item.title));const body=el("div");paragraphs(body,item.text);row.append(body);section.append(row);
    const media=el("div","media-grid");
    (item.media||[]).forEach(asset=>{if(!safeURL(asset.src))return;const figure=el("figure");
      if(asset.type==="video"){const video=el("video");video.src=asset.src;video.controls=true;video.preload="metadata";if(safeURL(asset.poster))video.poster=asset.poster;video.append(document.createTextNode("Your browser does not support this video."));figure.append(video);}
      else {const img=el("img");img.src=asset.src;img.alt=asset.alt||asset.caption||"";img.loading="lazy";figure.append(img);}
      if(asset.caption)figure.append(el("figcaption","",asset.caption));media.append(figure);
    });if(media.childElementCount)section.append(media);
    const links=el("div","links");(item.links||[]).forEach(item=>{if(safeURL(item.href))links.append(link(item.label+" ↗",item.href));});section.append(links);main.append(section);
  });
}
if(page==="home"){
  const hero=el("section","hero"), intro=el("div");intro.append(el("div","eyebrow",data.home.eyebrow),el("h1","",data.name),el("div","subtitle",data.subtitle),el("div","institution",data.institution));paragraphs(intro,data.home.intro);hero.append(intro);
  const portrait=el("div","portrait");if(safeURL(data.portrait)){const img=el("img");img.src=data.portrait;img.alt=data.portraitAlt;portrait.append(img);}else{const placeholder=el("div","portrait-placeholder");placeholder.append(el("strong","","SS"),el("span","","Portrait coming soon"));portrait.append(placeholder);}hero.append(portrait);main.append(hero);sections(data.home.sections);
  const paths=el("section");paths.setAttribute("aria-label","Explore this site");data.home.pathways.forEach(item=>{const row=el("div","pathway"),text=el("div");text.append(el("h3","",item.title),el("p","",item.text));row.append(el("span","number",item.number),text,link(item.label+" →",item.href));paths.append(row);});main.append(paths);
}else{
  const config=data[page],intro=el("section","page-intro");intro.append(el("div","eyebrow",config.eyebrow),el("h1","",config.title),el("p","",config.intro));main.append(intro);
  if(page==="contact"){
    const grid=el("div","contact-grid"),details=el("div");details.append(el("h2","","Say hello."));
    if(data.email)details.append(link(data.email,"mailto:"+data.email));
    if(safeURL(data.linkedin)){const p=el("p");p.append(link("LinkedIn ↗",data.linkedin));details.append(p);}
    if(!data.email&&!data.linkedin)details.append(el("p","","Contact details coming soon."));
    const form=el("form");form.method="POST";
    const endpoint=safeURL(data.formEndpoint);const configured=endpoint && endpoint.startsWith("https://");
    if(configured)form.action=endpoint;
    [["Name","name","text"],["Email","email","email"],["Message","message","textarea"]].forEach(([label,name,type])=>{const wrapper=el("label","",label),field=el(type==="textarea"?"textarea":"input");field.name=name;field.required=true;if(type!=="textarea"){field.type=type;field.autocomplete=name;}else field.rows=6;wrapper.append(field);form.append(wrapper);});
    const trap=el("input","trap");trap.type="text";trap.name="_gotcha";trap.tabIndex=-1;trap.setAttribute("aria-hidden","true");form.append(trap);
    const button=el("button","","Send message");button.type="submit";button.disabled=!configured;form.append(button);
    if(!configured){form.addEventListener("submit",e=>e.preventDefault());const note=el("p","note","This form is not connected yet. Messages cannot be sent until it is configured.");note.id="form-note";form.setAttribute("aria-describedby","form-note");form.append(note);}
    grid.append(details,form);main.append(grid);
  }else{
    if(page==="projects"&&safeURL(data.resume)){const links=el("div","links");links.append(link("View resume ↗",data.resume));main.append(links);}
    if(!(config.sections||[]).some(item=>item.visible!==false)){const empty=el("section","empty");empty.append(el("h2","",page==="projects"?"Project stories coming soon.":"More about me, coming soon."),el("p","",page==="projects"?"I'll be adding the work, photos, and details behind my engineering projects here.":"I'll be sharing music, soccer, and other interests here."));main.append(empty);}else sections(config.sections);
  }
}
const footer=document.getElementById("footer");footer.append(
  el("span", "", "© " + new Date().getFullYear() + " " + data.name)
);
