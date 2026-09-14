// The integrated terminal: prompt, history, tab-completion and every command.
// Adding a command means adding one key to CMDS below.

import { $, esc, base } from "./utils.js";
import { ME } from "./profile.js";
import { FILES } from "./files.js";
import { openFile } from "./editor.js";
import { cycleAccent } from "./theme.js";

const elTerm = $("#term");

let cmdHistory = [], hIdx = -1, inputEl = null;

export function setPanel(on){
  document.body.classList.toggle("no-panel", !on);
  if (on) { focusInput(); elTerm.scrollTop = elTerm.scrollHeight; }
}
$("#panelClose").addEventListener("click", function(){ setPanel(false); });
$("#stTerm").addEventListener("click", function(){ setPanel(document.body.classList.contains("no-panel")); });
$("#termClear").addEventListener("click", function(){ clearTerm(); });
elTerm.addEventListener("mousedown", function(e){
  if (e.target.closest("a")) return;
  if (!window.getSelection().toString()) setTimeout(focusInput, 0);
});
function focusInput(){ if (inputEl) inputEl.focus({ preventScroll: true }); }

function out(html, cls){
  var d = document.createElement("div");
  d.className = "l" + (cls ? " " + cls : "");
  d.innerHTML = html;
  elTerm.insertBefore(d, promptLine);
  elTerm.scrollTop = elTerm.scrollHeight;
}
function blank(){ out("&nbsp;"); }

export const PROMPT = '<span class="p1">aayush@portfolio</span><span class="mu">:</span>'
           + '<span class="p2">~/aayush-kalikote</span> <span class="p3">$</span> ';

var promptLine = document.createElement("div");
promptLine.className = "l inline";
promptLine.innerHTML = PROMPT + '<input class="tin" id="tin" autocomplete="off" spellcheck="false" '
  + 'autocapitalize="off" aria-label="terminal input"><span class="caret" id="caret"></span>';
elTerm.appendChild(promptLine);
inputEl = $("#tin");

function clearTerm(){
  Array.prototype.slice.call(elTerm.querySelectorAll(".l")).forEach(function(n){
    if (n !== promptLine) n.remove();
  });
}

inputEl.addEventListener("keydown", function(e){
  if (e.key === "Enter") {
    var v = inputEl.value;
    inputEl.value = "";
    out(PROMPT + '<span class="cmd">' + esc(v) + "</span>");
    if (v.trim()) { cmdHistory.push(v); hIdx = cmdHistory.length; }
    run(v.trim());
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (hIdx > 0) { hIdx--; inputEl.value = cmdHistory[hIdx]; }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (hIdx < cmdHistory.length - 1) { hIdx++; inputEl.value = cmdHistory[hIdx]; }
    else { hIdx = cmdHistory.length; inputEl.value = ""; }
  } else if (e.key === "Tab") {
    e.preventDefault();
    var pre = inputEl.value.trim();
    if (!pre) return;
    var m = Object.keys(CMDS).filter(function(k){ return k.indexOf(pre) === 0; });
    if (m.length === 1) inputEl.value = m[0] + " ";
    else if (m.length > 1) { out('<span class="mu">' + m.join("  ") + "</span>"); }
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault(); clearTerm();
  } else if (e.key === "c" && e.ctrlKey) {
    inputEl.value = ""; out('<span class="mu">^C</span>');
  }
});

function link(url, label){
  if (url.indexOf("_HERE") > -1) return '<span class="er">' + label + ' (not set — paste your URL)</span>';
  return '<a href="' + url + '" target="_blank" rel="noopener">' + label + "</a>";
}

export const CMDS = {
  help: function(){
    blank();
    out('<span class="hl">AVAILABLE COMMANDS</span>');
    blank();
    var rows = [
      ["whoami", "who I am, in four lines"],
      ["about", "the longer version"],
      ["projects", "what I have built and still maintain"],
      ["skills", "the stack (try: skills --all)"],
      ["experience", "roles and timeline"],
      ["education", "where I studied"],
      ["contact", "how to reach me"],
      ["socials", "links"],
      ["stats", "numbers that mean something"],
      ["ls", "list workspace files"],
      ["cat &lt;file&gt;", "open a file in the editor"],
      ["open &lt;project&gt;", "open a project URL"],
      ["neofetch", "system info, obviously"],
      ["theme", "toggle the accent colour"],
      ["date", "current date and time"],
      ["history", "commands you have run"],
      ["clear", "clear the terminal"],
      ["exit", "close the panel"]
    ];
    rows.forEach(function(r){
      out('  <span class="p2">' + r[0] + '</span>'
        + "&nbsp;".repeat(Math.max(1, 18 - r[0].replace(/&lt;|&gt;/g, "<").length))
        + '<span class="mu">' + r[1] + "</span>");
    });
    blank();
    out('<span class="mu">Tab completes. ↑ / ↓ walks history. Ctrl+L clears.</span>');
    blank();
  },

  whoami: function(){
    blank();
    out('<span class="hl">' + ME.name + '</span>');
    out(ME.role + ' <span class="mu">&mdash;</span> ' + ME.sub);
    out('<span class="mu">' + ME.location + '</span>');
    blank();
    out('PHP developer at <span class="ok">Codewing Solutions</span> since March 2024. I work on backend');
    out('systems and the APIs around them &mdash; Laravel when I get to pick, WordPress when the');
    out('product already lives there &mdash; and built <span class="p3">Altus AI</span>, the LLM layer above it, alone.');
    blank();
    out('<span class="mu">BSc.CSIT, Texas International College (2021 - 2025).</span>');
    blank();
  },

  about: function(){
    blank();
    out('Software engineer. Most of the work is backend &mdash; data models, business logic,');
    out('and the APIs other systems lean on &mdash; written in <span class="hl">PHP</span>, usually with');
    out('<span class="hl">Laravel</span>. I build the front end too when the job needs it.');
    blank();
    out('<span class="hl">What that looks like day to day</span>');
    out('  <span class="p2">&bull;</span> Laravel application work &mdash; models, services, queues, migrations');
    out('  <span class="p2">&bull;</span> REST APIs with validation and auth that actually hold');
    out('  <span class="p2">&bull;</span> Payment gateways, and checkout that is never allowed to fail quietly');
    out('  <span class="p2">&bull;</span> WordPress plugin architecture on a product with a lot of installs');
    out('  <span class="p2">&bull;</span> LLM features with retrieval, fallbacks, and hard spending limits');
    out('  <span class="p2">&bull;</span> Performance work on data that outgrew the schema someone drew in year one');
    blank();
    out('<span class="mu">The framework matters less than people think. Cleverness is last on my</span>');
    out('<span class="mu">list, on purpose &mdash; whoever opens this at 3am is probably me.</span>');
    blank();
    out('<span class="mu">Full version: </span><a href="#" data-open="about.md">open about.md &rarr;</a>');
    blank();
  },

  projects: function(){
    blank();
    out('<span class="hl">PROJECTS</span> <span class="mu">(2 in production)</span>');
    blank();
    out('<span class="p2">1.</span> <span class="cmd">WP Travel Engine</span> <span class="mu">— Core Engineer</span>');
    out('   A full booking platform on WordPress. Trips, itineraries, availability,');
    out('   pricing rules, checkout, payments. I work on the core plugin and the addons');
    out('   around it: booking logic, the REST layer, the React admin, gateways, and');
    out('   keeping dozens of addons from breaking each other.');
    out('   <span class="mu">PHP · WordPress · React · REST API · Payments</span>');
    out('   ' + link("https://wptravelengine.com/", "wptravelengine.com ↗"));
    blank();
    out('<span class="p2">2.</span> <span class="cmd">Altus AI</span> <span class="p3">— Solo: design &amp; build</span>');
    out('   An AI layer for travel sites, built alone. It writes itineraries and trip');
    out('   content and answers traveller questions, but it reads the real trip data');
    out('   first rather than inventing a hotel. Architecture, prompts, retrieval,');
    out('   streaming UI, cost guardrails and admin screens were all mine.');
    out('   <span class="mu">LLM · Prompt Design · RAG · PHP · JavaScript · Streaming</span>');
    out('   ' + link("https://wptravelengine.com/altus-ai/", "wptravelengine.com/altus-ai ↗"));
    blank();
    out('<span class="mu">Detail: </span><a href="#" data-open="projects/wp-travel-engine.md">open projects/ →</a>');
    blank();
  },

  skills: function(args){
    var all = args.indexOf("--all") > -1 || args.indexOf("-a") > -1;
    blank();
    var groups = [
      ["Languages", ["PHP", "JavaScript", "Python", "SQL"]],
      ["Backend", ["Laravel", "Eloquent ORM", "REST API design", "MySQL", "Django", "WordPress"]],
      ["Frontend", ["Vue.js", "React", "Blade", "Tailwind", "CSS3"]],
      ["AI", ["LLM Integration", "Prompt Design", "RAG", "Streaming", "Cost Control"]],
      ["Tooling", ["Git", "Composer", "PHPUnit", "PHPStan", "Docker", "Linux"]]
    ];
    if (!all) groups = groups.slice(0, 3);
    groups.forEach(function(g){
      out('<span class="hl">' + g[0] + '</span>');
      out('  <span class="mu">' + g[1].join("  &middot;  ") + "</span>");
      blank();
    });
    if (!all) out('<span class="mu">Run </span><span class="p2">skills --all</span><span class="mu"> for everything.</span>');
    blank();
  },

  experience: function(){
    blank();
    out('<span class="hl">EXPERIENCE</span>');
    blank();
    out('<span class="ok">&#9679;</span> <span class="cmd">PHP Developer</span> <span class="mu">&mdash; Codewing Solutions</span>  <span class="p3">Mar 2024 - Present</span>');
    out('  Backend engineering on a production travel-booking platform: Laravel and');
    out('  WordPress work, REST API design, payment gateway integrations, and');
    out('  performance. Solo ownership of <span class="p3">Altus AI</span>, the LLM product layer.');
    blank();
    out('<span class="mu">&#9675;</span> <span class="cmd">Intern</span> <span class="mu">&mdash; TekGro</span>  <span class="p3">Jul 2023 - Jul 2024</span>');
    out('  Full-stack web development across client projects. First real taste of');
    out('  shipping code that strangers actually use.');
    blank();
    out('<span class="hl">EDUCATION</span>');
    blank();
    out('<span class="mu">&#9675;</span> <span class="cmd">BSc.CSIT</span> <span class="mu">&mdash; Texas International College</span>  <span class="p3">2021 - 2025</span>');
    blank();
    out('<span class="mu">Raw: </span><a href="#" data-open="experience.json">open experience.json &rarr;</a>');
    blank();
  },

  experience: function(){
    blank();
    out('<span class="hl">EXPERIENCE</span>');
    blank();
    out('<span class="ok">●</span> <span class="cmd">Software Engineer</span> <span class="mu">— Codewing Solutions</span>  <span class="p3">Present</span>');
    out('  Working on <span class="hl">WP Travel Engine</span>, the company&rsquo;s booking platform for');
    out('  WordPress. Core and addon engineering, booking flow, payments, the REST');
    out('  layer and performance work — plus <span class="p3">Altus AI</span>, which I built on my own.');
    blank();
    out('<span class="hl">EDUCATION</span>');
    blank();
    out('<span class="mu">○</span> <span class="cmd">BSc.CSIT</span> <span class="mu">— Bachelor in Computer Science &amp; Information Technology</span>  <span class="p3">2020 - 2024</span>');
    blank();
    out('<span class="mu">Raw: </span><a href="#" data-open="experience.json">open experience.json →</a>');
    blank();
  },

  education: function(){
    blank();
    out('<span class="hl">BSc.CSIT</span> <span class="mu">&mdash; Computer Science &amp; Information Technology</span>');
    out('<span class="mu">Texas International College</span>  <span class="p3">2021 - 2025</span>');
    blank();
    out('<span class="mu">Four years of theory, then a lot of unlearning once it hit production.</span>');
    blank();
  },

  contact: function(){
    blank();
    out('<span class="hl">GET IN TOUCH</span>');
    blank();
    out('  <span class="p2">email</span>      <a href="mailto:' + ME.email + '">' + ME.email + "</a>");
    out('  <span class="p2">linkedin</span>   ' + link(ME.linkedin, 'in/aayush-kalikote'));
    out('  <span class="p2">github</span>     ' + link(ME.github, 'github.com/Aayushkalikote'));
    out('  <span class="p2">location</span>   <span class="mu">' + ME.location + "</span>");
    out('  <span class="p2">reply</span>      <span class="ok">&lt; 24h, usually same day</span>');
    blank();
    out('<span class="mu">Open to backend and full-stack roles, PHP and Laravel application</span>');
    out('<span class="mu">work, AI integration, and a genuinely interesting problem generally.</span>');
    blank();
  },

  socials: function(){ CMDS.contact([]); },

  stats: function(){
    blank();
    out('<span class="hl">BY THE NUMBERS</span>');
    blank();
    out('  <span class="num">3+</span>      <span class="mu">years shipping software strangers actually use</span>');
    out('  <span class="num">2</span>       <span class="mu">products open on my screen most days</span>');
    out('  <span class="num">1</span>       <span class="mu">AI product I built from nothing, alone</span>');
    out('  <span class="num">PHP</span>     <span class="mu">the language I think in; Laravel the framework</span>');
    out('  <span class="num">0</span>       <span class="mu">frameworks involved in building this page</span>');
    blank();
  },

  ls: function(){
    blank();
    out('<span class="p2">src/</span>  <span class="p2">projects/</span>');
    Object.keys(FILES).forEach(function(f){
      out("  " + f.replace(/</g, "&lt;"));
    });
    blank();
    out('<span class="mu">Use </span><span class="p2">cat &lt;file&gt;</span><span class="mu"> to open one in the editor.</span>');
    blank();
  },

  cat: function(args){
    var q = (args[0] || "").toLowerCase();
    if (!q) { out('<span class="er">cat: missing file operand</span>'); out('<span class="mu">try: cat about.md</span>'); return; }
    var hit = Object.keys(FILES).filter(function(f){
      return f.toLowerCase() === q || base(f).toLowerCase() === q || base(f).toLowerCase().indexOf(q) === 0;
    })[0];
    if (!hit) { out('<span class="er">cat: ' + esc(q) + ": No such file or directory</span>"); return; }
    openFile(hit, true);
    out('<span class="ok">✓</span> opened <span class="p2">' + hit + '</span> in the editor');
  },

  open: function(args){
    var q = (args.join(" ") || "").toLowerCase();
    if (q.indexOf("altus") > -1) { window.open("https://wptravelengine.com/altus-ai/", "_blank"); out('<span class="ok">→ opening Altus AI…</span>'); }
    else if (q.indexOf("wp") > -1 || q.indexOf("travel") > -1) { window.open("https://wptravelengine.com/", "_blank"); out('<span class="ok">→ opening WP Travel Engine…</span>'); }
    else if (q.indexOf("linkedin") > -1) { CMDS.socials([]); }
    else { out('<span class="er">open: unknown target.</span> <span class="mu">try: open altus | open wpte</span>'); }
  },

  grep: function(args){
    var q = (args.join(" ") || "").toLowerCase();
    if (!q) { out('<span class="er">usage: grep &lt;term&gt;</span>'); return; }
    var index = {
      php: "skills.js - primary language, 3+ years in production",
      laravel: "skills.js - primary application framework; services, queues, Eloquent",
      wordpress: "projects/ - plugin architecture for WP Travel Engine",
      vue: "skills.js - Vue.js on the front end",
      react: "skills.js - React admin interfaces",
      django: "skills.js - Python/Django experience",
      api: "skills.js - REST design, schema validation, auth",
      rest: "skills.js - REST design, schema validation, auth",
      ai: "projects/ - Altus AI, solo build; skills.js - LLM integration",
      altus: "projects/ - Altus AI, solo design and build",
      mysql: "skills.js - schema design and query performance",
      payment: "projects/ - gateway integrations, checkout reliability",
      codewing: "experience.json - PHP Developer, March 2024 to present",
      tekgro: "experience.json - Intern, July 2023 to July 2024",
      education: "experience.json - BSc.CSIT, Texas International College, 2021-2025",
      skills: "skills.js - full stack listing",
      contact: "contact.php - " + ME.email
    };
    var hits = Object.keys(index).filter(function(k){ return k.indexOf(q) > -1 || q.indexOf(k) > -1; });
    if (!hits.length) { out('<span class="mu">no matches for </span><span class="hl">' + esc(q) + "</span>"); return; }
    blank();
    hits.forEach(function(k){ out('<span class="p2">' + k + '</span><span class="mu">: ' + index[k] + "</span>"); });
    blank();
  },

  neofetch: function(){
    var art = [
      '      <span class="p2">.--------.</span>',
      '     <span class="p2">/</span> <span class="hl">.-----.</span> <span class="p2">\\</span>',
      '     <span class="p2">|</span> <span class="hl">|</span> <span class="ok">AK</span> <span class="hl">|</span> <span class="p2">|</span>',
      '     <span class="p2">|</span> <span class="hl">\'-----\'</span> <span class="p2">|</span>',
      '     <span class="p2">\\</span>__________<span class="p2">/</span>',
      '      <span class="mu">||      ||</span>',
      '     <span class="mu">/__\\    /__\\</span>'
    ];
    var info = [
      '<span class="p2">aayush</span><span class="mu">@</span><span class="p2">portfolio</span>',
      '<span class="mu">------------------------</span>',
      '<span class="hl">Name</span>:      ' + ME.name,
      '<span class="hl">Role</span>:      ' + ME.role + ' (PHP / Laravel)',
      '<span class="hl">Location</span>:  ' + ME.location,
      '<span class="hl">Uptime</span>:    3+ years shipping',
      '<span class="hl">Shell</span>:     bash (allegedly)',
      '<span class="hl">Editor</span>:    VS Code, obviously',
      '<span class="hl">Languages</span>: PHP, JavaScript, Python, SQL',
      '<span class="hl">Framework</span>: Laravel (+ WordPress, Django)',
      '<span class="hl">Focus</span>:     Backend, APIs, AI integration',
      '<span class="hl">Currently</span>: Codewing Solutions',
      '<span class="hl">Coffee</span>:    <span class="ok">████████░░</span> 80%'
    ];
    blank();
    var n = Math.max(art.length, info.length);
    for (var i = 0; i < n; i++) {
      var a = art[i] || "                 ";
      out(a + "&nbsp;&nbsp;&nbsp;&nbsp;" + (info[i] || ""));
    }
    blank();
  },

  theme: function(){
    out('<span class="ok">✓</span> accent → <span class="hl">' + cycleAccent() + "</span>");
  },

  date: function(){ out('<span class="mu">' + new Date().toString() + "</span>"); },

  history: function(){
    blank();
    cmdHistory.forEach(function(h, i){ out('  <span class="mu">' + (i + 1) + "</span>  " + esc(h)); });
    blank();
  },

  clear: function(){ clearTerm(); },

  exit: function(){ out('<span class="mu">closing panel…</span>'); setTimeout(function(){ setPanel(false); }, 260); },

  sudo: function(args){
    var j = args.join(" ").toLowerCase();
    if (j.indexOf("hire") > -1) {
      blank();
      out('<span class="mu">[sudo] password for aayush: ********</span>');
      setTimeout(function(){
        out('<span class="ok">✓ Authentication successful.</span>');
        out('<span class="ok">✓ Excellent decision. Initiating handshake…</span>');
        blank();
        out('  <span class="p2">email</span>    <a href="mailto:' + ME.email + '?subject=Let%27s%20talk">' + ME.email + "</a>");
        out('  <span class="p2">linkedin</span> ' + link(ME.linkedin, "message me on LinkedIn"));
        blank();
      }, 620);
      return;
    }
    out('<span class="er">aayush is not in the sudoers file. This incident has been reported.</span>');
  },

  echo: function(args){ out(esc(args.join(" "))); },
  vim: function(){ out('<span class="mu">Nice try. You would never get out.</span>'); },
  rm: function(){ out('<span class="er">rm: permission denied.</span> <span class="mu">Nice try though.</span>'); },
  pwd: function(){ out('<span class="mu">/home/aayush/aayush-kalikote</span>'); },
  coffee: function(){ out('<span class="hl">☕ brewing…</span>'); setTimeout(function(){ out('<span class="ok">done. back to work.</span>'); }, 800); }
};

const ALIAS = { "cv": "experience", "resume": "experience", "work": "projects", "me": "whoami", "info": "about",
              "cls": "clear", "stack": "skills", "email": "contact", "hire": "sudo" };

export function run(raw){
  if (!raw) return;
  var parts = raw.split(/\s+/);
  var cmd = parts[0].toLowerCase();
  var args = parts.slice(1);
  if (ALIAS[cmd]) { if (ALIAS[cmd] === "sudo") { CMDS.sudo(["hire-me"]); return; } cmd = ALIAS[cmd]; }
  if (CMDS[cmd]) { CMDS[cmd](args); return; }
  out('<span class="er">command not found: ' + esc(cmd) + "</span>");
  var near = Object.keys(CMDS).filter(function(k){ return k[0] === cmd[0]; }).slice(0, 4);
  if (near.length) out('<span class="mu">did you mean: ' + near.join(", ") + "?</span>");
  else out('<span class="mu">type </span><span class="p2">help</span><span class="mu"> for available commands.</span>');
}

/* welcome banner */
export function welcome(){
  out('<span class="mu">Last login: ' + new Date().toDateString() + " on ttys001</span>");
  blank();
  out('<span class="p2">  ___                      __       </span>');
  out('<span class="p2"> / _ | ___ ___ __ _____ __/ /  </span>  <span class="hl">' + ME.name + "</span>");
  out('<span class="p2">/ __ |/ _ `/ // / // (_-&lt; _  /   </span>  <span class="mu">' + ME.role + " &mdash; " + ME.sub + "</span>");
  out('<span class="p2">\\_/ |_\\_,_/\\_, /\\_,_/___/_//_/    </span>  <span class="mu">' + ME.location + "</span>");
  out('<span class="p2">          /___/                   </span>');
  blank();
  out('<span class="mu">Type </span><span class="p2">help</span><span class="mu"> to see what this shell knows. Try </span>'
    + '<span class="p2">whoami</span><span class="mu">, </span><span class="p2">projects</span>'
    + '<span class="mu">, or </span><span class="p2">neofetch</span><span class="mu">.</span>');
  blank();
}

/** Echo a command into the terminal and run it (used by the command palette). */
export function pushCmd(cmd) {
  out(PROMPT + '<span class="cmd">' + cmd + "</span>");
  run(cmd);
}
