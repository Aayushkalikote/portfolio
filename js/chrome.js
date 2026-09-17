// Window chrome: menu bar, status bar, and global keyboard shortcuts.

import { $ } from "./utils.js";
import { ME } from "./profile.js";
import { setPanel } from "./terminal.js";
import { togglePal, toggleCommandPalette, isPaletteOpen } from "./palette.js";
import { closeActiveTab } from "./editor.js";
import { toast } from "./toast.js";

addEventListener("keydown", function(e){
  var mod = e.ctrlKey || e.metaKey;
  if (mod && e.key.toLowerCase() === "p") { e.preventDefault(); toggleCommandPalette(); return; }
  if (mod && (e.key === "`" || e.code === "Backquote")) { e.preventDefault(); setPanel(document.body.classList.contains("no-panel")); return; }
  if (mod && e.key.toLowerCase() === "b") { e.preventDefault(); document.body.classList.toggle("no-side"); return; }
  if (mod && e.key.toLowerCase() === "w") { e.preventDefault(); closeActiveTab(); return; }
  if (e.key === "Escape" && isPaletteOpen()) togglePal(false);
  if (mod && e.key.toLowerCase() === "j") { e.preventDefault(); setPanel(document.body.classList.contains("no-panel")); }
});

/* menus + status bar easter eggs */
const MENU_MSG = {
  file: ["File", "Nothing to save — this whole thing is one HTML file."],
  edit: ["Edit", "Read-only. But you can edit my mind: " + ME.email],
  view: ["View", "Ctrl+B sidebar · Ctrl+` terminal · Ctrl+Shift+P palette"],
  go: ["Go", "Try the command palette — Ctrl+Shift+P"],
  run: ["Run", "Already running. You're looking at it."],
  help: ["Help", "Open the terminal and type help."]
};
document.querySelectorAll("[data-menu]").forEach(function(b){
  b.addEventListener("click", function(){
    var m = MENU_MSG[b.getAttribute("data-menu")];
    toast(m[0], m[1]);
  });
});
$("#stBranch").addEventListener("click", function(){ toast("main", "3 uncommitted changes. Story of my life."); });
$("#stBell").addEventListener("click", function(){ toast("Hello 👋", "Terminal is the fun part — Ctrl+` then type help."); });
$("#pProblems").addEventListener("click", function(){ toast("Problems: 0", "Suspicious, isn't it."); });
$("#pOutput").addEventListener("click", function(){ toast("Output", "Everything interesting is in Terminal."); });
