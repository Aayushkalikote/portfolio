// Activity bar icons and the panels they swap into the sidebar.

import { ME } from "./profile.js";
import { renderSide } from "./editor.js";
import { setPanel } from "./terminal.js";
import { togglePal } from "./palette.js";

const elSide = document.querySelector("#sideScroll");
const $ = function (s) { return document.querySelector(s); };

const SIDE_VIEWS = {
  explorer: null,
  search: '<div style="padding:12px 14px"><input placeholder="Search" style="width:100%;background:#3c3c3c;'
    + 'border:1px solid #3e3e42;color:#ddd;padding:5px 8px;font:inherit;outline:0;border-radius:2px">'
    + '<p style="color:var(--tx3);font-size:12px;margin-top:14px;line-height:1.7">Search is decorative. '
    + 'Use the terminal — try <code style="color:var(--str)">grep skills</code> or <code style="color:var(--str)">help</code>.</p></div>',
  scm: '<div style="padding:10px 14px;font-family:var(--mono);font-size:12px;line-height:2;color:var(--tx2)">'
    + '<div style="color:var(--org)">M&nbsp;&nbsp;about.md</div>'
    + '<div style="color:var(--grn)">A&nbsp;&nbsp;projects/altus-ai.md</div>'
    + '<div style="color:var(--grn)">A&nbsp;&nbsp;skills.js</div>'
    + '<p style="margin-top:14px;font-family:var(--ui);font-size:12px;color:var(--tx3);line-height:1.7">'
    + '3 changes on <b style="color:var(--tx2)">main</b>. Last commit: '
    + '<i style="color:var(--str);font-style:normal">"ship altus ai streaming"</i></p></div>',
  run: '<div style="padding:12px 14px;font-size:12.5px;color:var(--tx2);line-height:1.8">'
    + '<p style="margin-bottom:10px">Run and Debug</p>'
    + '<button data-run-term style="background:#0e639c;color:#fff;padding:6px 12px;border-radius:3px;font-size:12px">'
    + '▶ Launch Terminal</button>'
    + '<p style="margin-top:14px;color:var(--tx3);font-size:12px;line-height:1.7">'
    + 'Starts an interactive shell with my CV loaded. Type <code style="color:var(--str)">help</code>.</p></div>',
  ext: '<div style="padding:10px 14px;font-size:12.5px;line-height:1.7">'
    + '<div style="margin-bottom:14px"><b style="color:#fff">php-intelephense</b><br><span style="color:var(--tx3)">Daily driver.</span></div>'
    + '<div style="margin-bottom:14px"><b style="color:#fff">PHPStan</b><br><span style="color:var(--tx3)">Level 6 and climbing.</span></div>'
    + '<div style="margin-bottom:14px"><b style="color:#fff">WordPress Coding Standards</b><br><span style="color:var(--tx3)">Non-negotiable.</span></div>'
    + '<div><b style="color:#fff">Claude Code</b><br><span style="color:var(--tx3)">Pair programmer.</span></div></div>',
  account: '<div style="padding:12px 14px;font-size:12.5px;color:var(--tx2);line-height:1.9">'
    + '<b style="color:#fff">' + ME.name + '</b><br>' + ME.role + '<br>PHP Developer @ Codewing Solutions<br>'
    + '<a href="mailto:' + ME.email + '">' + ME.email + '</a></div>',
  settings: '<div style="padding:12px 14px;font-size:12.5px;color:var(--tx2);line-height:1.8">'
    + 'Press <b style="color:#fff">Ctrl+Shift+P</b> for the command palette.</div>'
};
document.querySelectorAll(".activity .ic").forEach(function(b){
  b.addEventListener("click", function(){
    var act = b.getAttribute("data-act");
    if (act === "settings") { togglePal(true); return; }
    document.querySelectorAll(".activity .ic").forEach(function(x){ x.classList.remove("on"); });
    b.classList.add("on");
    document.body.classList.remove("no-side");
    $("#sideTitle").textContent = act === "scm" ? "Source Control"
      : act === "ext" ? "Extensions" : act === "run" ? "Run and Debug"
      : act.charAt(0).toUpperCase() + act.slice(1);
    if (act === "explorer") renderSide();
    else elSide.innerHTML = SIDE_VIEWS[act];
  });
});
document.addEventListener("click", function(e){
  if (e.target.closest("[data-run-term]")) { setPanel(true); }
});
