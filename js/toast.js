// Bottom-right notification used by the menu bar and status bar.

let timer;

export function toast(title, body) {
  const el = document.querySelector("#toast");
  el.innerHTML = "<b>" + title + "</b>" + body;
  el.classList.add("on");
  clearTimeout(timer);
  timer = setTimeout(function () { el.classList.remove("on"); }, 3400);
}
