// The editor surface: Explorer tree, tab strip, breadcrumbs, code/markdown
// rendering and the fake minimap. Owns which file is currently open.

import { $, base } from "./utils.js";
import { ME } from "./profile.js";
import { FILES, TREE } from "./files.js";

let openTabs = ["about.md"];
let activeFile = "about.md";

const elTabs = $("#tabs"), elView = $("#view"), elCrumb = $("#crumb"),
      elSide = $("#sideScroll"), elMap = $("#minimap");


/* ── sidebar ── */
/* Brand/UI glyphs for the Links section. Stroke icons inherit currentColor; brand marks are filled. */
const LINK_ICON = {
  mail: '<svg class="lico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3 7l9 6 9-6"/></svg>',
  linkedin: '<svg class="lico" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.96 1.83-1.97 3.77-1.97 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21H9z"/></svg>',
  github: '<svg class="lico" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.8a10.2 10.2 0 00-3.22 19.88c.51.1.7-.22.7-.49l-.01-1.9c-2.84.6-3.44-1.24-3.44-1.24-.47-1.16-1.14-1.47-1.14-1.47-.93-.62.07-.6.07-.6 1.03.07 1.57 1.03 1.57 1.03.91 1.53 2.4 1.09 2.98.83.09-.65.36-1.09.65-1.34-2.27-.25-4.66-1.11-4.66-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.26 2.75 1.03a9.6 9.6 0 015 0c1.91-1.29 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.39 4.69-4.67 4.94.37.31.7.94.7 1.9l-.01 2.81c0 .27.18.6.7.49A10.2 10.2 0 0012 1.8z"/></svg>',
  globe: '<svg class="lico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/></svg>'
};

export function renderSide(){
  var h = "";
  TREE.forEach(function(node, i){
    if (node.type === "folder") {
      h += '<div class="folder' + (node.open ? "" : " closed") + '" data-folder="' + i + '">'
        +   '<div class="frow"><svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">'
        +     '<path d="M6 4l4 4-4 4"/></svg><span class="fname">' + node.name + '</span></div>'
        +   '<div class="fchildren">';
      node.children.forEach(function(f){ h += fileRow(f); });
      h += '</div></div>';
    } else {
      h += fileRow(node.name);
    }
  });
  h += ''
    + '<div class="side-sect"><div class="hd">▾ Outline</div><div class="bd">'
    +   '<a data-open="about.md">About</a><a data-open="projects/wp-travel-engine.md">Projects</a>'
    +   '<a data-open="experience.md">Experience</a><a data-open="skills.md">Skills</a>'
    +   '<a data-open="contact.md">Contact</a>'
    + '</div></div>'
    + '<div class="side-sect"><div class="hd">▾ Links</div><div class="bd">'
    +   '<a href="mailto:' + ME.email + '">' + LINK_ICON.mail + '<span>' + ME.email + '</span>' + '</a>'
    +   '<a href="' + ME.linkedin + '" target="_blank" rel="noopener">' + LINK_ICON.linkedin + '<span>LinkedIn</span></a>'
    +   '<a href="' + ME.github + '" target="_blank" rel="noopener">' + LINK_ICON.github + '<span>GitHub</span></a>'
    +   '<a href="https://wptravelengine.com/" target="_blank" rel="noopener">' + LINK_ICON.globe + '<span>WP Travel Engine</span></a>'
    + '</div></div>';
  elSide.innerHTML = h;
}
function fileRow(path){
  var f = FILES[path];
  return '<div class="fitem' + (path === activeFile ? " active" : "") + '" data-open="' + path + '">'
    + f.icon + '<span class="fl">' + base(path) + '</span>'
    + (path === "about.md" ? '<span class="mod">M</span>' : '') + '</div>';
}

/* ── tabs ── */
export function renderTabs(){
  elTabs.innerHTML = openTabs.map(function(p){
    return '<div class="tab' + (p === activeFile ? " active" : "") + '" data-open="' + p + '">'
      + FILES[p].icon + '<span>' + base(p) + '</span>'
      + '<span class="x" data-close-tab="' + p + '">×</span></div>';
  }).join("");
}

/* ── editor body ── */
export function renderView(){
  var f = FILES[activeFile];
  if (f.mode === "md") {
    elView.innerHTML = f.render();
  } else {
    var lines = f.code;
    var g = "", b = "";
    for (var i = 0; i < lines.length; i++) {
      g += "<span" + (i === 0 ? ' class="cur"' : "") + ">" + (i + 1) + "</span>";
      b += '<span class="ln">' + (lines[i] || "​") + "</span>";
    }
    elView.innerHTML = '<div class="code"><div class="gutter">' + g + '</div>'
      + '<div class="codebody">' + b + "</div></div>";
  }
  elView.scrollTop = 0;
  elCrumb.innerHTML = f.path.split(" › ").map(function(p){ return "<span>" + p + "</span>"; })
    .join('<span class="sep">›</span>') + '<span class="sep">›</span>'
    + '<span style="color:var(--tx2)">' + base(activeFile) + "</span>";
  $("#stLang").textContent = f.lang;
  $(".wintitle").textContent = base(activeFile) + " — aayush-kalikote — Visual Studio Code";
  document.title = ME.name;
  renderMap();
}
function renderMap(){
  var n = FILES[activeFile].mode === "md" ? 46 : FILES[activeFile].code.length;
  var h = "";
  for (var i = 0; i < n; i++) {
    var w = 22 + ((i * 37) % 66);
    h += '<div style="width:' + w + '%;opacity:' + (0.35 + ((i * 13) % 50) / 100) + '"></div>';
  }
  elMap.innerHTML = h;
}

/* ── open / close ── */
export function openFile(path, quiet){
  if (!FILES[path]) return;
  if (openTabs.indexOf(path) === -1) openTabs.push(path);
  activeFile = path;
  renderTabs(); renderView(); renderSide();
  if (!quiet && innerWidth < 720) document.body.classList.add("no-side");
}
export function closeTab(path){
  var i = openTabs.indexOf(path);
  if (i === -1) return;
  openTabs.splice(i, 1);
  if (!openTabs.length) openTabs = ["about.md"];
  if (activeFile === path) activeFile = openTabs[Math.min(i, openTabs.length - 1)];
  renderTabs(); renderView(); renderSide();
}

document.addEventListener("click", function(e){
  var x = e.target.closest("[data-close-tab]");
  if (x) { e.stopPropagation(); closeTab(x.getAttribute("data-close-tab")); return; }
  var o = e.target.closest("[data-open]");
  if (o) { e.preventDefault(); openFile(o.getAttribute("data-open")); return; }
  var fr = e.target.closest(".frow");
  if (fr) { fr.parentElement.classList.toggle("closed"); return; }
  var sh = e.target.closest(".side-sect .hd");
  if (sh) { var bd = sh.nextElementSibling; bd.style.display = bd.style.display === "none" ? "" : "none"; }
});

/** Ctrl+W target — exported so the shortcut layer needs no access to state. */
export function closeActiveTab() { closeTab(activeFile); }

/** Keep the status bar's Ln/Col readout roughly honest while scrolling. */
elView.addEventListener("scroll", function () {
  const f = FILES[activeFile];
  const total = f.mode === "md" ? 120 : f.code.length;
  const pct = elView.scrollTop / Math.max(1, elView.scrollHeight - elView.clientHeight);
  $("#stPos").textContent = "Ln " + Math.max(1, Math.round(pct * total)) + ", Col 1";
}, { passive: true });
