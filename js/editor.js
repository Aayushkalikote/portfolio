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
    +   '<a data-open="experience.json">Experience</a><a data-open="skills.js">Skills</a>'
    +   '<a data-open="contact.php">Contact</a>'
    + '</div></div>'
    + '<div class="side-sect"><div class="hd">▾ Links</div><div class="bd">'
    +   '<a href="mailto:' + ME.email + '">✉ ' + ME.email + '</a>'
    +   '<a href="' + ME.linkedin + '" target="_blank" rel="noopener">in LinkedIn</a>'
    +   '<a href="' + ME.github + '" target="_blank" rel="noopener">◈ GitHub</a>'
    +   '<a href="https://wptravelengine.com/" target="_blank" rel="noopener">◆ WP Travel Engine</a>'
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
  document.title = base(activeFile) + " — " + ME.name;
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
