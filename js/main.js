// Entry point. Wires the modules together and renders the first frame.
//
// Module map:
//   profile.js       your details — edit this to update the whole page
//   files.js         the "files" the editor can open, and the sidebar tree
//   editor.js        tabs, tree, breadcrumbs, code + markdown rendering
//   terminal.js      the integrated terminal and every command it knows
//   palette.js       Ctrl+Shift+P command palette
//   activity-bar.js  left icon rail and the panels it swaps in
//   chrome.js        menu bar, status bar, keyboard shortcuts
//   boot.js          startup animation
//   theme.js         accent colour cycling
//   toast.js         corner notifications
//   utils.js         shared helpers

import { renderSide, renderTabs, renderView } from "./editor.js";
import { setPanel, welcome } from "./terminal.js";
import { boot } from "./boot.js";

import "./activity-bar.js";
import "./palette.js";
import "./chrome.js";

boot();

renderSide();
renderTabs();
renderView();

welcome();
setPanel(true);

// Small screens: start with the sidebar out of the way.
if (window.innerWidth < 720) {
  setTimeout(function () { document.body.classList.add("no-side"); }, 100);
}
