// Accent colour cycling, shared by the `theme` command and the palette.

const ACCENTS = ["#007acc", "#c586c0", "#4ec9b0", "#e2c08d", "#f14c4c"];

export function cycleAccent() {
  const cur = document.documentElement.style.getPropertyValue("--acc").trim() || ACCENTS[0];
  const next = ACCENTS[(ACCENTS.indexOf(cur) + 1) % ACCENTS.length];
  document.documentElement.style.setProperty("--acc", next);
  return next;
}
