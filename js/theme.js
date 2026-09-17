// Accent colour cycling, shared by the `theme` command and the palette.

const ACCENTS = ["#007acc", "#c586c0", "#4ec9b0", "#e2c08d", "#f14c4c"];

export function cycleAccent() {
  const cur = document.documentElement.style.getPropertyValue("--acc").trim() || ACCENTS[0];
  const next = ACCENTS[(ACCENTS.indexOf(cur) + 1) % ACCENTS.length];
  document.documentElement.style.setProperty("--acc", next);
  return next;
}

/* ponytail: theme is one data attribute + a CSS override block; no per-component theming. */
export function setTheme(mode){
  document.documentElement.setAttribute("data-theme", mode);
  try { localStorage.setItem("theme", mode); } catch (e) {}
  return mode;
}
export function currentTheme(){
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}
export function toggleTheme(){
  return setTheme(currentTheme() === "light" ? "dark" : "light");
}
(function(){
  var saved;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  if (saved) setTheme(saved);
})();
