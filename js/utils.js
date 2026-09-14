// Small shared helpers used across modules.

export const $ = function (sel) { return document.querySelector(sel); };

/** Last path segment: "projects/a.md" -> "a.md" */
export function base(path) { return path.split("/").pop(); }

/** Escape user/terminal input before inserting it as HTML. */
export function esc(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Coloured file-type glyph used in the tree and tabs. */
export function icon(color, text) {
  return '<span class="fi" style="color:' + color + '">' + text + '</span>';
}
