// Chat page UI: renders messages and plays each prepared reply as
// "thinking" steps followed by typed-out text, like a real AI chat.

import { reply, COMMANDS, SUGGESTIONS } from "./chat-brain.js";
import { ME } from "./profile.js";
import { svg } from "./chat-icons.js";

const $ = s => document.querySelector(s);
const thread = $("#thread"), form = $("#composer"), q = $("#q"), slash = $("#slash"), title = $("#title");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
let finishCurrent = null; // set while a reply is animating; calling it skips to the end
let slashIndex = 0;

$("#suggest").innerHTML = SUGGESTIONS.map(s => '<button class="chip" data-ask="' + s + '">' + s + "</button>").join("");

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function scrollDown() { thread.scrollTop = thread.scrollHeight; }

function reset() {
  if (finishCurrent) finishCurrent();
  thread.innerHTML = "";
  title.textContent = "";
  document.body.classList.remove("chatting");
  q.focus();
}

function send(raw) {
  const text = raw.trim();
  if (!text) return;
  if (finishCurrent) finishCurrent();
  if (text.toLowerCase() === "/clear") return reset();

  document.body.classList.add("chatting");
  if (!title.textContent) title.textContent = text;

  const user = el("div", "msg user");
  user.appendChild(el("div", "bubble", text)); // textContent: visitor input is never parsed as HTML
  thread.appendChild(user);
  play(reply(text));
}

const STEP_ICON = { read: "file", run: "terminal", search: "search" };
const STEP_VERB = { read: "Read", run: "Run", search: "Searched" };

// One activity row: icon, verb, the file/command/query as a code pill, then output or result links.
function stepRow(s) {
  const row = el("div", "step running");
  row.innerHTML = '<div class="sline"><span class="sic">' + svg(STEP_ICON[s.kind]) + "</span><span class=\"verb\"></span><code class=\"pill\"></code></div>";
  row.querySelector(".verb").textContent = STEP_VERB[s.kind];
  row.querySelector(".pill").textContent = s.label;
  if (s.out) row.appendChild(el("div", "sout", s.out));
  if (s.kind === "search") {
    const box = el("div", "results");
    if (!s.results.length) box.appendChild(el("div", "sout", "No matching topic found."));
    for (const h of s.results) {
      const a = el("a", "hit");
      a.href = h.url; a.target = "_blank"; a.rel = "noopener";
      a.innerHTML = '<img src="' + h.icon + '" alt=""><span class="ht"></span><span class="hd"></span>' + svg("arrow");
      a.querySelector(".ht").textContent = h.title;
      a.querySelector(".hd").textContent = new URL(h.url).hostname + new URL(h.url).pathname.replace(/\/$/, "");
      box.appendChild(a);
    }
    row.appendChild(box);
  }
  return row;
}

function play(r) {
  const msg = el("div", "msg bot");
  msg.innerHTML = '<img class="avatar" src="' + ME.photo + '" alt="">'
    + '<div class="body"><div class="activity"></div><p class="text"></p><div class="blocks"></div>'
    + '<div class="msg-actions">'
    + '<button class="icon-btn" data-copy="" aria-label="Copy answer">' + svg("copy") + "</button>"
    + '<button class="icon-btn" data-vote aria-pressed="false" aria-label="Good answer">' + svg("up") + "</button>"
    + '<button class="icon-btn" data-vote aria-pressed="false" aria-label="Bad answer">' + svg("down") + "</button>"
    + '</div><div class="follow"></div></div>';
  msg.querySelector("[data-copy]").dataset.copy = r.text;
  thread.appendChild(msg);
  scrollDown();

  const act = msg.querySelector(".activity"), textEl = msg.querySelector(".text");
  let skip = reduceMotion;
  const wait = ms => skip ? Promise.resolve() : new Promise(res => setTimeout(res, ms));
  const mine = () => { skip = true; };
  finishCurrent = mine;
  thread.setAttribute("aria-busy", "true");

  (async () => {
    const started = performance.now();
    if (!r.steps.length) await wait(350);
    else {
      act.innerHTML = '<button class="act-head" type="button" aria-expanded="true"><span class="shimmer">Working</span>' + svg("chevron") + '</button><div class="act-body"></div>';
      act.classList.add("open");
      const body = act.querySelector(".act-body");
      for (const s of r.steps) {
        const row = stepRow(s);
        body.appendChild(row);
        scrollDown();
        await wait(s.kind === "search" ? 900 : 600);
        row.classList.replace("running", "done");
      }
      const secs = Math.max(1, Math.round((performance.now() - started) / 1000));
      act.querySelector(".act-head span").outerHTML = "<span>Completed " + r.steps.length + " step" + (r.steps.length > 1 ? "s" : "") + " · " + secs + "s</span>";
      act.classList.remove("open");
      act.querySelector(".act-head").setAttribute("aria-expanded", "false");
    }

    textEl.classList.add("typing");
    for (let i = 0; i < r.text.length && !skip; i += 3) {
      textEl.textContent = r.text.slice(0, i);
      scrollDown();
      await wait(14);
    }
    textEl.textContent = r.text;
    textEl.classList.remove("typing");

    msg.querySelector(".blocks").innerHTML = r.html;
    msg.querySelector(".follow").innerHTML = r.followUps.map(f =>
      '<button class="chip" data-ask="' + f + '">' + f + "</button>").join("");
    msg.classList.add("done");
    scrollDown();

    if (finishCurrent === mine) {
      finishCurrent = null;
      thread.setAttribute("aria-busy", "false");
    }
  })();
}

/* ---------- composer ---------- */

function autosize() {
  q.style.height = "auto";
  q.style.height = Math.min(q.scrollHeight, 160) + "px";
}

function slashMatches() {
  const v = q.value;
  return v.startsWith("/") && !/\s/.test(v) ? COMMANDS.filter(c => c.cmd.startsWith(v.toLowerCase())) : [];
}

function renderSlash() {
  const list = slashMatches();
  slash.hidden = !list.length;
  if (!list.length) return;
  slashIndex = Math.min(slashIndex, list.length - 1);
  slash.innerHTML = list.map((c, i) =>
    '<button type="button" role="option" aria-selected="' + (i === slashIndex) + '" data-ask="' + c.cmd + '">'
    + "<code>" + c.cmd + "</code><span>" + c.desc + "</span></button>").join("");
}

function submit() {
  const text = q.value;
  q.value = "";
  autosize();
  slash.hidden = true;
  send(text);
}

q.addEventListener("input", () => { slashIndex = 0; autosize(); renderSlash(); });

q.addEventListener("keydown", e => {
  const list = slash.hidden ? [] : slashMatches();
  if (list.length && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
    e.preventDefault();
    slashIndex = (slashIndex + (e.key === "ArrowDown" ? 1 : list.length - 1)) % list.length;
    renderSlash();
  } else if (list.length && (e.key === "Tab" || (e.key === "Enter" && !e.shiftKey))) {
    e.preventDefault();
    q.value = list[slashIndex].cmd;
    submit();
  } else if (e.key === "Escape") {
    slash.hidden = true;
  } else if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    submit();
  }
});

form.addEventListener("submit", e => { e.preventDefault(); submit(); });

/* ---------- clicks: chips, commands, sidebar ---------- */

document.addEventListener("click", e => {
  const b = e.target.closest("[data-ask]");
  if (b) {
    document.body.classList.remove("side-open");
    q.value = "";
    autosize();
    slash.hidden = true;
    send(b.dataset.ask);
    return;
  }
  const head = e.target.closest(".act-head");
  if (head) head.setAttribute("aria-expanded", head.parentElement.classList.toggle("open"));
  const copy = e.target.closest("[data-copy]");
  if (copy && navigator.clipboard) {
    navigator.clipboard.writeText(copy.dataset.copy).then(() => {
      const was = copy.innerHTML;
      copy.innerHTML = svg("check");
      setTimeout(() => { copy.innerHTML = was; }, 1400);
    }, () => {});
  }
  const vote = e.target.closest("[data-vote]");
  if (vote) {
    const on = vote.getAttribute("aria-pressed") !== "true";
    vote.parentElement.querySelectorAll("[data-vote]").forEach(v => v.setAttribute("aria-pressed", "false"));
    vote.setAttribute("aria-pressed", String(on));
  }
  if (e.target.closest("#newChat")) { document.body.classList.remove("side-open"); reset(); }
  if (e.target.closest("#menu")) document.body.classList.toggle("side-open");
  if (e.target.closest("#scrim")) document.body.classList.remove("side-open");
  const t = e.target.closest("[data-theme-toggle]");
  if (t) toggleTheme(t);
});

/* ---------- theme: set by time of day in index.html, flipped here ---------- */

// The settings menu names the theme you would switch to.
function themeLabel() {
  const dark = document.documentElement.getAttribute("data-theme") === "dark";
  document.querySelectorAll("[data-theme-label]").forEach(l => { l.textContent = dark ? "Light theme" : "Dark theme"; });
}
themeLabel();

function toggleTheme(btn) {
  const root = document.documentElement;
  const flip = () => { root.setAttribute("data-theme", root.getAttribute("data-theme") === "dark" ? "light" : "dark"); themeLabel(); };
  const r = btn.getBoundingClientRect();
  root.style.setProperty("--x", r.left + r.width / 2 + "px");
  root.style.setProperty("--y", r.top + r.height / 2 + "px");
  if (document.startViewTransition && !reduceMotion) document.startViewTransition(flip);
  else flip();
}

document.addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); }
});

q.focus();
