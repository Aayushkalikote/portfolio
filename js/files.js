// Workspace contents: one entry per "file" shown in the editor,
// plus the tree that renders in the Explorer sidebar.

import { ME } from "./profile.js";
import { icon } from "./utils.js";

export const FILES = {
  "about.md": {
    icon: icon("#519aba", "M\u2193"), lang: "Markdown", path: "aayush-kalikote", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<div class="hero">'
      +     '<img class="avatar" src="' + ME.photo + '" alt="' + ME.name + '" '
      +       'onerror="this.onerror=null;this.src=\'' + ME.photoFallback + '\'">'
      +     '<div class="ht">'
      +       '<h1>' + ME.name + '</h1>'
      +       '<div class="role">' + ME.role + ' &middot; ' + ME.sub + '</div>'
      +       '<p>I write <strong>PHP</strong> and <strong>Laravel</strong> for a living, mostly the parts other '
      +          'systems end up depending on. At Codewing Solutions I work on travel-booking software that real '
      +          'people pay through, and on the AI layer sitting on top of it.</p>'
      +       '<div class="meta">'
      +         '<span class="chip live">Open to opportunities</span>'
      +         '<span class="chip">\ud83d\udccd ' + ME.location + '</span>'
      +         '<span class="chip">PHP &middot; Laravel &middot; JS</span>'
      +       '</div>'
      +     '</div>'
      +   '</div>'
      +   '<blockquote>Tip: hit <span class="kbd">Ctrl</span> + <span class="kbd">`</span> to open the terminal, '
      +     'then type <code>help</code>. Most of this CV is queryable from there.</blockquote>'
      +   '<h2><span class="hash">##</span> What I do</h2>'
      +   '<p>Most of my time goes to the PHP side of things. Laravel when I get to pick, WordPress when the '
      +     'product already lives there, JavaScript on whatever screen sits in front of it. The framework '
      +     'changes more often than the job does: get the data model right, keep the API honest about what it '
      +     'actually does, and write it so the next person is not stuck guessing.</p>'
      +   '<ul>'
      +     '<li><strong>Backend</strong> &mdash; PHP and Laravel, Eloquent, queues, and MySQL schemas that hold up once the table gets big.</li>'
      +     '<li><strong>APIs</strong> &mdash; REST endpoints other teams build on, with real validation, auth, and a versioning story.</li>'
      +     '<li><strong>Full stack</strong> &mdash; Vue and React when the screen is mine to build too, not just the thing behind it.</li>'
      +     '<li><strong>Things that touch money</strong> &mdash; booking flows, payment gateways, pricing rules. Bugs here come with receipts.</li>'
      +     '<li><strong>AI features</strong> &mdash; LLM work that reads from actual app data, degrades quietly, and cannot run up the bill.</li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> How I work</h2>'
      +   '<p>I keep a list of what I optimise for and cleverness sits at the bottom of it, on purpose. I ship in '
      +     'small pieces, check what the code actually does at runtime instead of assuming, and try to leave a '
      +     'file easier to change than I found it. Six months from now the person opening it at a bad hour is '
      +     'probably me.</p>'
      +   '<h2><span class="hash">##</span> Where I am</h2>'
      +   '<table class="tbl"><tbody>'
      +     '<tr><td>PHP Developer</td><td><strong>Codewing Solutions</strong> &mdash; WP Travel Engine &amp; Altus AI'
      +       '<div style="color:var(--tx3);font-size:12.5px">March 2024 &ndash; Present &middot; Kathmandu</div></td></tr>'
      +     '<tr><td>Intern</td><td><strong>TekGro</strong> &mdash; full-stack web development'
      +       '<div style="color:var(--tx3);font-size:12.5px">July 2023 &ndash; July 2024 &middot; Kathmandu</div></td></tr>'
      +     '<tr><td>BSc.CSIT</td><td><strong>Texas International College</strong> &mdash; Computer Science &amp; Information Technology'
      +       '<div style="color:var(--tx3);font-size:12.5px">2021 &ndash; 2025</div></td></tr>'
      +   '</tbody></table>'
      +   '<hr>'
      +   '<p style="color:var(--tx3);font-size:12.5px">'
      +     'Open <code>projects/</code> in the sidebar, or run <code>projects</code> in the terminal.</p>'
      + '</div>';
    }
  },

  "projects/wp-travel-engine.md": {
    icon: icon("#519aba", "M↓"), lang: "Markdown", path: "aayush-kalikote › projects", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<h1>Projects</h1>'
      +   '<p>Two products I work on at Codewing Solutions, both live right now. The domain happens to be travel booking. Underneath it is the usual backend job: data models, APIs, payments, and keeping queries from falling over.</p>'
      +   '<div class="pcard">'
      +     '<div class="ph"><span class="fi">◆</span><b>WP Travel Engine</b><span class="badge">Core Engineer</span></div>'
      +     '<div class="pb">'
      +       '<p>A full booking platform built on WordPress: trips, itineraries, availability, pricing rules, '
      +         'checkout, payments. I work on the core plugin and the addons around it. The addons are the '
      +         'interesting constraint — dozens of them, shipping on their own schedules into sites nobody on '
      +         'my team can see, and core still has to move without breaking any of them.</p>'
      +       '<ul>'
      +         '<li>Pricing rules and the booking flow that reads them</li>'
      +         '<li>Payment gateways, and keeping checkout sane when one of them times out</li>'
      +         '<li>The REST layer, plus the React admin sitting on it</li>'
      +         '<li>Migrations that land on thousands of live sites without anyone noticing</li>'
      +       '</ul>'
      +       '<div class="tags"><span>PHP</span><span>WordPress</span><span>React</span><span>REST API</span>'
      +         '<span>Payments</span><span>MySQL</span></div>'
      +       '<p style="margin-top:14px"><a href="https://wptravelengine.com/" target="_blank" rel="noopener">wptravelengine.com ↗</a></p>'
      +     '</div>'
      +   '</div>'
      +   '<div class="pcard">'
      +     '<div class="ph"><span class="fi" style="color:#c586c0">✦</span><b>Altus AI</b>'
      +       '<span class="badge solo">Solo — Design &amp; Build</span></div>'
      +     '<div class="pb">'
      +       '<p>An AI layer for travel sites. I designed and built this one alone, every part of it. It writes '
      +         'itineraries and trip content and answers traveller questions, but it reads from the real trip '
      +         'data first — the obvious version of this invents a hotel that does not exist, and that is worse '
      +         'than shipping nothing. Architecture, prompts, retrieval, the streaming UI, the cost guardrails '
      +         'and the admin screens were all mine.</p>'
      +       '<ul>'
      +         '<li>Retrieval over existing trip data, so answers stay tied to something real</li>'
      +         '<li>Streaming responses that degrade quietly when the model is down</li>'
      +         '<li>Token budgets enforced on the server, not suggested in a prompt</li>'
      +         '<li>Admin UI for limits, configuration, and reviewing what it wrote</li>'
      +       '</ul>'
      +       '<div class="tags"><span>LLM Integration</span><span>Prompt Design</span><span>RAG</span>'
      +         '<span>PHP</span><span>JavaScript</span><span>Streaming</span></div>'
      +       '<p style="margin-top:14px"><a href="https://wptravelengine.com/altus-ai/" target="_blank" rel="noopener">wptravelengine.com/altus-ai ↗</a></p>'
      +     '</div>'
      +   '</div>'
      +   '<h2><span class="hash">##</span> Also</h2>'
      +   '<p>Plus smaller addons, internal tooling, and a fair amount of compatibility work across the rest of '
      +     'the addon line. Run <code>projects</code> in the terminal if you want the short version.</p>'
      + '</div>';
    }
  },

  "experience.md": {
    icon: icon("#519aba", "M\u2193"), lang: "Markdown", path: "aayush-kalikote", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<h1>Experience</h1>'
      +   '<p>Software Engineer — PHP / Laravel / full-stack web.</p>'
      +   '<h2><span class="hash">##</span> PHP Developer — Codewing Solutions</h2>'
      +   '<p style="color:var(--tx3)">March 2024 – Present · Kathmandu, Nepal</p>'
      +   '<ul>'
      +     '<li>Backend architecture on a booking platform people pay through</li>'
      +     '<li>REST APIs other teams and addons build against</li>'
      +     '<li>Payment gateways, and checkout that survives a bad one</li>'
      +     '<li>Altus AI, an LLM product layer, built solo</li>'
      +     '<li>Query and runtime performance once the data got big</li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> Intern — TekGro</h2>'
      +   '<p style="color:var(--tx3)">July 2023 – July 2024 · Kathmandu, Nepal</p>'
      +   '<ul>'
      +     '<li>Full-stack work across a rotating set of client projects</li>'
      +     '<li>Where I first shipped code strangers actually used</li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> Education</h2>'
      +   '<p><strong>BSc.CSIT — Computer Science &amp; Information Technology</strong><br>'
      +     'Texas International College · 2021 – 2025</p>'
      +   '<h2><span class="hash">##</span> Principles</h2>'
      +   '<ul>'
      +     '<li>Code the next person can debug at 3am without me</li>'
      +     '<li>Ship small, check it at runtime, never guess</li>'
      +     '<li>The framework matters less than people think</li>'
      +   '</ul>'
      + '</div>';
    }
  },

  "skills.md": {
    icon: icon("#519aba", "M\u2193"), lang: "Markdown", path: "aayush-kalikote", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<h1>Skills</h1>'
      +   '<p>What I reach for without thinking about it, roughly ordered by how much of my week it eats.</p>'
      +   '<h2><span class="hash">##</span> Languages</h2><p>PHP · JavaScript · Python · SQL</p>'
      +   '<h2><span class="hash">##</span> Backend</h2>'
      +   '<ul>'
      +     '<li>Laravel — primary application framework</li>'
      +     '<li>Eloquent ORM</li><li>REST API design</li><li>MySQL</li><li>Django</li>'
      +     '<li>WordPress / plugin architecture</li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> Frontend</h2><p>Vue.js · React · Blade · Tailwind · CSS3</p>'
      +   '<h2><span class="hash">##</span> AI</h2><p>LLM Integration · Prompt Design · RAG · Streaming · Cost Control</p>'
      +   '<h2><span class="hash">##</span> Tooling</h2><p>Git · Composer · PHPUnit · PHPStan · Docker · Linux</p>'
      +   '<h2><span class="hash">##</span> What I optimise for, in order</h2>'
      +   '<ul><li>Correctness</li><li>Readability</li><li>Maintainability</li><li>Performance</li>'
      +     '<li>Cleverness — dead last, and I mean it</li></ul>'
      + '</div>';
    }
  },

  "contact.md": {
    icon: icon("#519aba", "M\u2193"), lang: "Markdown", path: "aayush-kalikote", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<h1>Contact</h1>'
      +   '<p>Software Engineer — PHP / Laravel. Based in ' + ME.location + '. I reply in under 24 hours.</p>'
      +   '<h2><span class="hash">##</span> Reach me</h2>'
      +   '<ul>'
      +     '<li><a href="mailto:' + ME.email + '">' + ME.email + '</a></li>'
      +     '<li><a href="' + ME.linkedin + '" target="_blank" rel="noopener">LinkedIn</a></li>'
      +     '<li><a href="' + ME.github + '" target="_blank" rel="noopener">GitHub</a></li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> Open to</h2>'
      +   '<ul>'
      +     '<li>Backend and full-stack engineering roles</li>'
      +     '<li>PHP and Laravel application work</li>'
      +     '<li>LLM and AI integration work</li>'
      +     '<li>A genuinely interesting problem, generally</li>'
      +   '</ul>'
      + '</div>';
    }
  },

  "README.md": {
    icon: icon("#519aba", "M↓"), lang: "Markdown", path: "aayush-kalikote", mode: "md",
    render: function(){ return ''
      + '<div class="md">'
      +   '<h1>README.md</h1>'
      +   '<p>This is a portfolio wearing an editor as a costume. The content is all real. The chrome is a joke I '
      +     'took further than I meant to.</p>'
      +   '<h2><span class="hash">##</span> Getting around</h2>'
      +   '<table class="tbl"><thead><tr><th>Action</th><th>How</th></tr></thead><tbody>'
      +     '<tr><td>Open a file</td><td>Click it in the Explorer sidebar</td></tr>'
      +     '<tr><td>Toggle terminal</td><td><span class="kbd">Ctrl</span> + <span class="kbd">`</span></td></tr>'
      +     '<tr><td>Command palette</td><td><span class="kbd">Ctrl</span> + <span class="kbd">Shift</span> + <span class="kbd">P</span></td></tr>'
      +     '<tr><td>Toggle sidebar</td><td><span class="kbd">Ctrl</span> + <span class="kbd">B</span></td></tr>'
      +     '<tr><td>Close tab</td><td><span class="kbd">Ctrl</span> + <span class="kbd">W</span></td></tr>'
      +   '</tbody></table>'
      +   '<h2><span class="hash">##</span> Terminal commands</h2>'
      +   '<p>Open the terminal and type <code>help</code>. Highlights:</p>'
      +   '<ul>'
      +     '<li><code>whoami</code> — the short version</li>'
      +     '<li><code>projects</code> — what I have shipped</li>'
      +     '<li><code>skills --all</code> — the stack</li>'
      +     '<li><code>experience</code> — where the hours went</li>'
      +     '<li><code>contact</code> — how to reach me</li>'
      +     '<li><code>neofetch</code> — because of course</li>'
      +     '<li><code>sudo hire-me</code> — worth a try</li>'
      +   '</ul>'
      +   '<h2><span class="hash">##</span> Stack of this page</h2>'
      +   '<p>One HTML file, plain CSS, plain JavaScript. No build step, no dependencies, nothing to install. '
      +     'It loads in one request and asks very little of the browser.</p>'
      +   '<hr>'
      +   '<p style="color:var(--tx3);font-size:12.5px">Start at <code>about.md</code>.</p>'
      + '</div>';
    }
  }
};

export const TREE = [
  { type: "folder", name: "src", open: true, children: ["about.md", "skills.md", "contact.md"] },
  { type: "folder", name: "projects", open: true, children: ["projects/wp-travel-engine.md"] },
  { type: "file", name: "experience.md" },
  { type: "file", name: "README.md" }
];
