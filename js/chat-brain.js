// The chat "agent". Every answer is written ahead of time; a question is
// matched to a topic by keywords. No AI, no network, nothing to pay for.

import { ME } from "./profile.js";
import { svg } from "./chat-icons.js";

const YEARS = Math.floor((Date.now() - new Date(2023, 6, 1)) / 31557600000);

export const COMMANDS = [
  { cmd: "/about",      desc: "Who Aayush is, in one paragraph" },
  { cmd: "/now",        desc: "What he works on today" },
  { cmd: "/projects",   desc: "Products he works on" },
  { cmd: "/experience", desc: "Career history as a git log" },
  { cmd: "/stack",      desc: "Languages, frameworks and tools" },
  { cmd: "/hire",       desc: "The short pitch" },
  { cmd: "/contact",    desc: "Where to reach him" },
  { cmd: "/clear",      desc: "Start a new chat" }
];

export const SUGGESTIONS = [
  "Who is Aayush?",
  "What is he working on now?",
  "Show me his projects",
  "Why should we hire him?"
];

// Specific topics are scored first; ties go to the earlier entry.
const SPECIFIC = [
  ["altus",      ["altus", "ai", "llm", "rag", "gpt", "chatbot", "prompt", "openai"]],
  ["wpte",       ["wp travel engine", "travel engine", "wpte", "wordpress", "booking", "plugin", "payment", "payments"]],
  ["dropbridge", ["dropbridge", "drop bridge", "airdrop", "quick share", "quickshare", "open source", "opensource", "oss", "rust", "side project", "side projects", "personal project", "personal projects", "android", "mac", "macos", "homebrew", "brew"]],
  ["contact",    ["contact", "email", "mail", "reach", "linkedin", "github", "touch", "connect", "message", "phone", "call"]],
  ["hire",       ["hire", "hiring", "why", "pitch", "fit", "recruit", "available", "availability", "open to", "opportunities", "role", "roles"]],
  ["education",  ["education", "study", "studied", "college", "degree", "university", "csit", "bsc", "student", "school"]],
  ["experience", ["experience", "career", "history", "worked", "companies", "company", "resume", "cv", "tekgro", "intern", "internship", "years"]],
  ["stack",      ["stack", "skills", "skill", "tech", "technologies", "languages", "language", "tools", "laravel", "php", "javascript", "react", "vue", "python", "framework", "frameworks"]],
  ["now",        ["now", "current", "currently", "today", "these days", "working on", "job", "codewing", "day to day", "week"]],
  ["projects",   ["project", "projects", "built", "build", "products", "product", "shipped", "portfolio", "work"]]
];
// Generic topics only win when nothing specific matched.
const GENERIC = [
  ["help",  ["help", "commands", "what can", "how does this work"]],
  ["hello", ["hi", "hello", "hey", "namaste", "yo", "sup", "hola"]],
  ["about", ["who", "about", "yourself", "introduce", "aayush", "bio", "summary", "background", "tell me"]]
];

const COMMAND_INTENT = { about: "about", now: "now", projects: "projects", experience: "experience", stack: "stack", hire: "hire", contact: "contact", help: "help" };

function best(list, hay) {
  let top = null, topScore = 0;
  for (const [intent, words] of list) {
    const score = words.filter(w => hay.includes(" " + w + " ")).length;
    if (score > topScore) { top = intent; topScore = score; }
  }
  return top;
}

export function classify(text) {
  const t = text.trim().toLowerCase();
  if (t.startsWith("/")) return COMMAND_INTENT[t.slice(1).split(/\s/)[0]] || "help";
  const hay = " " + t.replace(/[^a-z0-9]+/g, " ").trim() + " ";
  return best(SPECIFIC, hay) || best(GENERIC, hay) || "fallback";
}

/* ---------- content ---------- */

const WPORG = "https://wordpress.org/plugins/wp-travel-engine/";
const REPO = "https://github.com/Aayushkalikote/DropBridge";

const PROJECTS = [
  {
    id: "wpte", name: "WP Travel Engine", tagline: "Travel booking platform for WordPress", badge: "Core Engineer",
    icon: "assets/wpte-icon.png", cover: "assets/wpte-banner.png",
    kind: "work", url: "https://wptravelengine.com/",
    links: [["View on WordPress.org", WPORG], ["Website", "https://wptravelengine.com/", true]],
    // From the WordPress.org plugin API on 2026-10-19; update now and then.
    metrics: [["20,000+", "active installs"], ["4.9 ★", "594 ratings"], ["Thousands", "of live sites migrated"]],
    blurb: "A complete travel-booking platform for WordPress: trips, itineraries, availability, pricing rules, checkout and payments. He works across the core plugin and its addon ecosystem.",
    points: [
      "Booking flow and pricing rule engine",
      "Payment gateway integrations and checkout reliability",
      "REST API design and React admin screens",
      "Backward-compatible migrations across thousands of live installs"
    ],
    tags: ["PHP", "WordPress", "React", "REST API", "Payments", "MySQL"]
  },
  {
    id: "altus", name: "Altus AI", tagline: "AI layer for travel sites", badge: "Design & build",
    icon: "assets/altus-icon.svg", cover: "assets/altus-preview.png",
    kind: "work", url: "https://wptravelengine.com/altus-ai/",
    links: [["Visit Altus AI", "https://wptravelengine.com/altus-ai/"]],
    metrics: [["RAG", "grounded in trip data"], ["Streaming", "with graceful fallback"], ["Capped", "token & cost budgets"]],
    blurb: "Altus AI generates itineraries and trip content, and answers traveller questions from real trip data instead of inventing it. He works across every layer: architecture, prompt and retrieval design, streaming UX, cost guardrails and the admin.",
    points: [
      "Retrieval over existing trip data so output stays grounded",
      "Streaming responses that degrade gracefully when the model is down",
      "Token budgets and cost ceilings enforced server-side",
      "Admin UI for configuration, limits and content review"
    ],
    tags: ["LLM Integration", "Prompt Design", "RAG", "PHP", "JavaScript", "Streaming"]
  },
  {
    id: "dropbridge", name: "DropBridge", tagline: "AirDrop ↔ Quick Share for Mac and Android", badge: "Open source · GPL-3.0",
    icon: "assets/dropbridge-icon.svg", cover: "assets/dropbridge-cover.svg",
    kind: "oss", url: REPO,
    links: [["View on GitHub", REPO], ["Releases", REPO + "/releases", true]],
    install: "brew install aayushkalikote/tap/dropbridge",
    metrics: [["0", "apps to install on the phone"], ["Wi-Fi", "direct, no cloud, no size cap"], ["Rust", "with a Homebrew tap"]],
    blurb: "Send files between a Mac and an Android phone natively: the phone shows up in Finder's AirDrop, and the Mac shows up in Android's Quick Share. Nothing to pair and nothing uploads to a cloud. His own project, built in the open.",
    pointsLabel: "How it works",
    points: [
      "Advertises each Quick Share device as an AirDrop receiver on the Mac's AWDL interface",
      "Takes Finder's HTTPS upload and forwards it to the phone over Quick Share",
      "Replies to Finder only after the phone has accepted or declined",
      "<code>dropbridge doctor</code> checks Wi-Fi, AirDrop and the service, and lists the phones it sees"
    ],
    tags: ["Rust", "macOS", "Android", "AirDrop", "Quick Share", "Homebrew"]
  }
];
const WORK = PROJECTS.filter(p => p.kind === "work");

const STACK = [
  ["Languages", ["PHP", "JavaScript", "Python", "SQL", "Rust"]],
  ["Backend",   ["Laravel", "Eloquent ORM", "REST API design", "MySQL", "Django", "WordPress plugins"]],
  ["Frontend",  ["Vue.js", "React", "Blade", "Tailwind", "CSS3"]],
  ["AI",        ["LLM Integration", "Prompt Design", "RAG", "Streaming", "Cost Control"]],
  ["Tooling",   ["Git", "Composer", "PHPUnit", "PHPStan", "Docker", "Linux"]]
];

const CAREER = [
  { hash: "c0d3w1n", head: true, title: "PHP Developer", where: "Codewing Solutions", note: "WP Travel Engine & Altus AI", range: "Mar 2024 → now",
    points: ["Backend architecture for a production booking platform", "REST API design, schema validation, integrations", "Payment gateway work and checkout reliability", "Design and build of Altus AI, an LLM product layer"] },
  { hash: "7e4g20f", title: "Intern", where: "TekGro", note: "Full-stack web development", range: "Jul 2023 → Jul 2024",
    points: ["Full-stack work across client projects", "First code that real users touched"] },
  { hash: "b5c51t0", title: "BSc.CSIT", where: "Texas International College", note: "Computer Science & IT", range: "2021 → 2025", points: [] }
];

/* ---------- blocks (trusted, author-written HTML) ---------- */

const ext = 'target="_blank" rel="noopener"';
const tags = list => '<div class="tags">' + list.map(t => "<span>" + t + "</span>").join("") + "</div>";
const checks = list => '<ul class="checks">' + list.map(t => "<li>" + svg("check") + t + "</li>").join("") + "</ul>";
const ask = (label, q) => '<button class="cta" data-ask="' + q + '">' + label + " " + svg("arrow") + "</button>";
const link = (label, href, ghost) => '<a class="cta' + (ghost ? " ghost" : "") + '" href="' + href + '" ' + ext + ">" + label + " " + svg("arrow") + "</a>";
const actions = list => '<div class="actions">' + list.join("") + "</div>";
const metrics = list => '<div class="metrics">' + list.map(([v, l]) => "<div><b>" + v + "</b><span>" + l + "</span></div>").join("") + "</div>";

function profileBlock() {
  return '<div class="card profile">'
    + '<div class="cover"></div>'
    + '<div class="pinfo"><img class="avatar lg" src="' + ME.photo + '" alt="" onerror="this.onerror=null;this.src=\'' + ME.photoFallback + '\'">'
    + '<div class="who"><b>' + ME.name + "</b><span>" + ME.role + " · " + ME.sub + "</span></div>"
    + '<div class="socials">'
    + '<a href="' + ME.github + '" ' + ext + ' aria-label="GitHub">' + svg("github") + "</a>"
    + '<a href="' + ME.linkedin + '" ' + ext + ' aria-label="LinkedIn">' + svg("linkedin") + "</a>"
    + '<a href="mailto:' + ME.email + '" aria-label="Email">' + svg("mail") + "</a></div></div>"
    + '<div class="pmeta"><span class="status"><i class="dot"></i>Open to opportunities</span><span>' + svg("pin") + ME.location + "</span></div>"
    + metrics([[YEARS + "+", "years shipping"], [WORK.length, "products in production"], [PROJECTS.length - WORK.length, "open-source project"]])
    + "</div>";
}

function projectRows() {
  const row = p => '<button class="row" data-ask="Tell me about ' + p.name + '">'
    + '<img class="thumb" src="' + p.cover + '" alt="">'
    + '<span class="rt"><b>' + p.name + ' <i class="dot' + (p.kind === "oss" ? " oss" : "") + '"></i></b><span>' + p.tagline + "</span></span>"
    + '<span class="badge">' + p.badge + "</span>" + svg("arrow") + "</button>";
  const group = (label, list) => '<span class="rgroup">' + label + "</span>" + list.map(row).join("");
  return '<div class="card rows">' + group("At Codewing Solutions", WORK)
    + group("Open source", PROJECTS.filter(p => p.kind === "oss")) + "</div>";
}

function installBlock(cmd) {
  return '<div class="install"><span class="prompt">$</span><code>' + cmd + "</code>"
    + '<button class="icon-btn" data-copy="' + cmd + '" aria-label="Copy install command">' + svg("copy") + "</button></div>";
}

function projectDetail(p) {
  return '<div class="card project">'
    + '<a class="shot" href="' + p.url + '" ' + ext + '><img src="' + p.cover + '" alt="' + p.name + ' preview"></a>'
    + '<div class="pbody">'
    + '<div class="phead"><img class="logo" src="' + p.icon + '" alt=""><div><b>' + p.name + "</b><span>" + p.tagline + '</span></div><span class="badge">' + p.badge + "</span></div>"
    + metrics(p.metrics)
    + "<p>" + p.blurb + "</p>"
    + (p.install ? '<span class="sub">Install</span>' + installBlock(p.install) : "")
    + '<span class="sub">' + (p.pointsLabel || "What he works on") + "</span>" + checks(p.points)
    + tags(p.tags)
    + "</div></div>"
    + actions(p.links.map(([label, href, ghost]) => link(label, href, ghost)));
}

function nowBlock() {
  const m = Math.floor((Date.now() - new Date(2024, 2, 1)) / 2629800000); // months since Mar 2024
  const tenure = (m >= 12 ? Math.floor(m / 12) + "y " : "") + (m % 12) + "m";
  // Areas of work, written as conventional-commit lines; these are themes, not real commits.
  const log = [
    ["feat", "pricing", "Pricing rules and the booking flow that reads them"],
    ["fix", "checkout", "Keeping checkout honest when a payment gateway times out"],
    ["feat", "api", "The REST layer, plus the React admin sitting on it"],
    ["chore", "migrate", "Migrations that land on thousands of live sites unnoticed"],
    ["feat", "altus", "Altus AI, the LLM layer on top of it all"]
  ];
  return '<div class="card nowcard">'
    + '<div class="nowhead"><span class="live"><i class="pulse"></i>On the clock</span>'
    + '<span class="tenure">since Mar 2024 · ' + tenure + "</span></div>"
    + '<div class="nowrole"><b>PHP Developer</b> <span>@ Codewing Solutions</span></div>'
    + '<div class="prods">' + WORK.map(p =>
        '<button class="prod" data-ask="Tell me about ' + p.name + '"><img src="' + p.icon + '" alt="">' + p.name + svg("arrow") + "</button>").join("")
    + "</div></div>"
    + '<div class="card term"><div class="tbar"><i></i><i></i><i></i><span>~/codewing — git log --oneline --since=monday</span></div>'
    + '<div class="tbody">' + log.map(([type, scope, desc], i) =>
        '<div class="tline" style="--i:' + i + '"><span class="tt ' + type + '">' + type + "(" + scope + ')</span><span class="td">' + desc + "</span></div>").join("")
    + '<div class="tline" style="--i:' + log.length + '"><span class="tt prompt">$</span><span class="caret"></span></div>'
    + "</div></div>";
}

function timelineBlock() {
  return '<div class="card timeline">' + CAREER.map(c =>
    '<div class="tl' + (c.head ? " head" : "") + '"><i class="node"></i><div class="tlc">'
    + '<div class="tlt"><code class="hash">' + c.hash + "</code>" + (c.head ? '<span class="ref">HEAD → main</span>' : "")
    + '<span class="r">' + c.range + "</span></div>"
    + "<b>" + c.title + '</b> <span class="at">@ ' + c.where + "</span>"
    + '<div class="note">' + c.note + "</div>"
    + (c.points.length ? checks(c.points) : "") + "</div></div>").join("") + "</div>";
}

function stackBlock() {
  return '<div class="card stack">' + STACK.map(([group, list]) =>
    '<div class="srow"><span class="g">' + group + "<small>" + list.length + "</small></span>"
    + tags(list).replace("<span>Laravel</span>", '<span class="primary">Laravel · primary</span>') + "</div>").join("") + "</div>";
}

function hireBlock() {
  const reasons = [
    ["Works where bugs cost money", "Booking flows, payment gateways and pricing rules on a platform with 20,000+ active installs."],
    ["Builds AI that stays grounded", "Altus AI reads real trip data, streams answers, and keeps token costs capped."],
    ["Writes boring code on purpose", "Correctness first, readability second, cleverness distant last."]
  ];
  return '<div class="reasons">' + reasons.map(([t, d], i) =>
    '<div class="card reason"><span class="num">0' + (i + 1) + "</span><b>" + t + "</b><span>" + d + "</span></div>").join("") + "</div>"
    + '<div class="card opento"><span class="sub">Open to</span>' + tags(["Backend roles", "Full-stack roles", "Laravel & PHP", "AI integration"]) + "</div>"
    + actions([ask("Get in touch", "/contact")]);
}

function contactBlock() {
  const row = (icon, label, value, href, copy) =>
    '<div class="crow"><span class="ic">' + svg(icon) + '</span><a href="' + href + '"' + (href.startsWith("http") ? " " + ext : "")
    + "><span>" + label + "</span><b>" + value + "</b></a>"
    + (copy ? '<button class="icon-btn" data-copy="' + copy + '" aria-label="Copy ' + label + '">' + svg("copy") + "</button>"
            : '<span class="go">' + svg("arrow") + "</span>") + "</div>";
  return '<div class="card contact">'
    + row("mail", "Email", ME.email, "mailto:" + ME.email, ME.email)
    + row("linkedin", "LinkedIn", "aayush-kalikote", ME.linkedin)
    + row("github", "GitHub", "Aayushkalikote", ME.github)
    + "</div>"
    + '<div class="pmeta"><span class="status"><i class="dot"></i>Replies within 24h</span><span>' + svg("pin") + ME.location + "</span></div>";
}

function commandsBlock() {
  return '<div class="card cmds">' + COMMANDS.map(c =>
    '<button data-ask="' + c.cmd + '"><code>' + c.cmd + "</code><span>" + c.desc + "</span></button>").join("") + "</div>";
}

/* ---------- replies ---------- */
// Step kinds: read (file), run (command + output), search (query + result links).

const read = (file, out) => ({ kind: "read", label: file, out });
const run = (cmd, out) => ({ kind: "run", label: cmd, out });
const search = (query, results) => ({ kind: "search", label: query, results });
const site = (title, url, icon) => ({ title, url, icon });

const WPTE_HITS = [
  site("WP Travel Engine – Tour Booking Plugin", WPORG, "assets/wpte-icon.png"),
  site("WP Travel Engine", "https://wptravelengine.com/", "assets/wpte-icon.png")
];
const ALTUS_HITS = [site("Altus AI – AI for travel websites", "https://wptravelengine.com/altus-ai/", "assets/altus-icon.svg")];

const REPLIES = {
  about: () => ({
    steps: [read("profile.js", "name, role, location, links"), run("git log --oneline | wc -l", YEARS + "+ years of commits")],
    text: "Aayush Kalikote is a software Engineer in " + ME.location + ". He writes PHP and Laravel for a living, mostly the parts other systems end up depending on. At Codewing Solutions he works on WP Travel Engine, travel-booking software real people pay through, and on Altus AI, the LLM layer built on top of it.",
    html: profileBlock(),
    followUps: ["What is he working on now?", "Show me his projects", "How do I reach him?"]
  }),
  now: () => ({
    steps: [read("experience.md", "current: Codewing Solutions, since Mar 2024"), run('ls ~/projects --status=live', "2 products live in production")],
    text: "Since March 2024 he has been a PHP Developer at Codewing Solutions, working on WP Travel Engine and Altus AI. Most weeks look like this:",
    html: nowBlock(),
    followUps: ["Tell me about Altus AI", "What's his stack?", "Why should we hire him?"]
  }),
  projects: () => ({
    steps: [run("ls ~/projects --group-by=kind", "3 projects found: 2 at work, 1 open source.")],
    text: "Two products he works on at Codewing Solutions, both live in production, plus DropBridge, his own open-source tool. The work side is travel booking: data models, APIs, payments and performance. The side project is Rust, bridging AirDrop and Android's Quick Share.",
    html: projectRows() + actions([link("WP Travel Engine on WordPress.org", WPORG), link("DropBridge on GitHub", REPO, true)]),
    followUps: ["Tell me about WP Travel Engine", "Tell me about DropBridge", "What's his stack?"]
  }),
  wpte: () => ({
    steps: [search("wp travel engine site:wordpress.org", WPTE_HITS), read("projects/wp-travel-engine.md")],
    text: "WP Travel Engine is the booking platform he works on as a core engineer: the plugin, its addons, and the compatibility layer that keeps dozens of addons from stepping on each other.",
    html: projectDetail(PROJECTS[0]),
    followUps: ["Tell me about Altus AI", "How do I reach him?"]
  }),
  altus: () => ({
    steps: [search("altus ai wptravelengine", ALTUS_HITS), read("projects/altus-ai.md")],
    text: "Altus AI brings AI to travel sites without making things up: it writes trip content and answers traveller questions from the real trip data.",
    html: projectDetail(PROJECTS[1]),
    followUps: ["Tell me about WP Travel Engine", "Why should we hire him?"]
  }),
  dropbridge: () => ({
    steps: [search("dropbridge site:github.com", [site("Aayushkalikote/DropBridge", REPO, "assets/dropbridge-icon.svg")]),
            run("brew info aayushkalikote/tap/dropbridge", "dropbridge: AirDrop ↔ Quick Share bridge · GPL-3.0")],
    text: "DropBridge is his personal open-source project: it lets a Mac and an Android phone send files to each other with the screens people already know, AirDrop on the Mac and Quick Share on the phone.",
    html: projectDetail(PROJECTS[2]),
    followUps: ["Show me his projects", "What's his stack?", "How do I reach him?"]
  }),
  experience: () => ({
    steps: [run("git log --career --graph", CAREER.length + " commits on main")],
    text: "About " + YEARS + " years of shipping code people actually use: client projects at TekGro first, then production booking software at Codewing Solutions.",
    html: timelineBlock(),
    followUps: ["What is he working on now?", "Where did he study?"]
  }),
  education: () => ({
    steps: [read("experience.md", "1 degree found")],
    text: "He studied BSc.CSIT (Computer Science & Information Technology) at Texas International College, Kathmandu, from 2021 to 2025, and was already shipping production code during it.",
    html: timelineBlock(),
    followUps: ["What is he working on now?", "What's his stack?"]
  }),
  stack: () => ({
    steps: [read("skills.js", STACK.reduce((n, [, l]) => n + l.length, 0) + " tools across " + STACK.length + " groups")],
    text: "Laravel is his primary application framework, with WordPress when the product already lives there and JavaScript on the screens in front of it. The framework is an implementation detail, though.",
    html: stackBlock(),
    followUps: ["Show me his projects", "Why should we hire him?"]
  }),
  hire: () => ({
    steps: [read("experience.md"), run("ls ~/projects --status=live", "2 products live"), read("how-i-work.md")],
    text: "Three reasons, short version:",
    html: hireBlock(),
    followUps: ["How do I reach him?", "Show me his projects"]
  }),
  contact: () => ({
    steps: [read("profile.js", "3 channels found")],
    text: "Email is fastest. He usually replies the same day, always within two.",
    html: contactBlock(),
    followUps: ["Why should we hire him?", "Who is Aayush?"]
  }),
  help: () => ({
    steps: [],
    text: "Ask me anything about Aayush in plain English, or use one of these commands.",
    html: commandsBlock(),
    followUps: SUGGESTIONS.slice(0, 3)
  }),
  hello: () => ({
    steps: [],
    text: "Hey! I'm Aayush's portfolio agent. Ask me about his work, projects, stack, or how to reach him.",
    html: "",
    followUps: SUGGESTIONS.slice(0, 3)
  }),
  fallback: () => ({
    steps: [search("portfolio for a matching topic", [])],
    text: "I only know about Aayush: his work, projects, stack, experience and how to reach him. Try one of these.",
    html: "",
    followUps: SUGGESTIONS
  })
};

export function reply(text) {
  const intent = classify(text);
  return Object.assign({ intent }, REPLIES[intent]());
}
