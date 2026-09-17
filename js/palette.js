// Ctrl+Shift+P command palette: fuzzy list of files, views and terminal commands.

import { $, base } from "./utils.js";
import { ME } from "./profile.js";
import { FILES } from "./files.js";
import { openFile } from "./editor.js";
import { setPanel, pushCmd } from "./terminal.js";
import { cycleAccent, toggleTheme } from "./theme.js";
import { toast } from "./toast.js";

const PAL_ITEMS = Object.keys(FILES).map(function(f){
  return { label: base(f), hint: f, kb: "", run: function(){ openFile(f); } };
}).concat([
  { label: "View: Toggle Terminal", kb: "Ctrl+`", run: function(){ setPanel(document.body.classList.contains("no-panel")); } },
  { label: "View: Toggle Sidebar", kb: "Ctrl+B", run: function(){ document.body.classList.toggle("no-side"); } },
  { label: "Terminal: Run 'whoami'", run: function(){ setPanel(true); pushCmd("whoami"); } },
  { label: "Terminal: Run 'projects'", run: function(){ setPanel(true); pushCmd("projects"); } },
  { label: "Terminal: Run 'neofetch'", run: function(){ setPanel(true); pushCmd("neofetch"); } },
  { label: "Terminal: Run 'contact'", run: function(){ setPanel(true); pushCmd("contact"); } },
  { label: "Preferences: Toggle Light/Dark Theme", run: function(){ toggleTheme(); document.dispatchEvent(new Event("themechange")); } },
  { label: "Preferences: Cycle Accent Color", run: function(){ cycleAccent(); } },
  { label: "Go to: Email " + ME.email, run: function(){ location.href = "mailto:" + ME.email; } },
  { label: "Go to: LinkedIn", run: function(){ if (ME.linkedin.indexOf("_HERE") < 0) window.open(ME.linkedin, "_blank"); else toast("LinkedIn not set", "Paste your profile URL and I'll wire it up."); } },
  { label: "Go to: WP Travel Engine", run: function(){ window.open("https://wptravelengine.com/", "_blank"); } },
  { label: "Go to: Altus AI", run: function(){ window.open("https://wptravelengine.com/altus-ai/", "_blank"); } }
]);


let palOn = false, palSel = 0, palShown = PAL_ITEMS;
export function togglePal(on){
  palOn = on;
  $("#pal").classList.toggle("on", on);
  if (on) { $("#palIn").value = ""; palFilter(""); $("#palIn").focus(); }
  else focusInput();
}
function palFilter(q){
  q = q.toLowerCase().replace(/^>/, "").trim();
  palShown = PAL_ITEMS.filter(function(it){ return it.label.toLowerCase().indexOf(q) > -1; });
  palSel = 0;
  $("#palList").innerHTML = palShown.length
    ? palShown.map(function(it, i){
        return '<div class="it' + (i === 0 ? " sel" : "") + '" data-pi="' + i + '">'
          + '<span class="ico">▸</span><span>' + it.label + "</span>"
          + (it.kb ? '<span class="kb">' + it.kb + "</span>" : "") + "</div>";
      }).join("")
    : '<div class="none">No matching commands</div>';
}
function palMove(d){
  if (!palShown.length) return;
  palSel = (palSel + d + palShown.length) % palShown.length;
  document.querySelectorAll("#palList .it").forEach(function(n, i){ n.classList.toggle("sel", i === palSel); });
  var s = document.querySelector("#palList .it.sel");
  if (s) s.scrollIntoView({ block: "nearest" });
}
$("#palIn").addEventListener("input", function(e){ palFilter(e.target.value); });
$("#palIn").addEventListener("keydown", function(e){
  if (e.key === "ArrowDown") { e.preventDefault(); palMove(1); }
  else if (e.key === "ArrowUp") { e.preventDefault(); palMove(-1); }
  else if (e.key === "Enter") { e.preventDefault(); if (palShown[palSel]) { togglePal(false); palShown[palSel].run(); } }
  else if (e.key === "Escape") { togglePal(false); }
});
$("#palList").addEventListener("click", function(e){
  var it = e.target.closest("[data-pi]");
  if (it) { var i = +it.getAttribute("data-pi"); togglePal(false); palShown[i].run(); }
});
$("#pal").addEventListener("click", function(e){ if (e.target.hasAttribute("data-close")) togglePal(false); });

/** Flip the palette — exported so the shortcut layer needs no access to state. */
export function toggleCommandPalette() { togglePal(!palOn); }

/** True while the palette is showing. */
export function isPaletteOpen() { return palOn; }
