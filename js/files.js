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

  "experience.json": {
    icon: icon("#cbcb41", "{}"), lang: "JSON", path: "aayush-kalikote", mode: "code",
    code: [
      '<span class="op">{</span>',
      '  <span class="prop">"title"</span><span class="op">:</span> <span class="str">"Software Engineer"</span><span class="op">,</span>',
      '  <span class="prop">"focus"</span><span class="op">:</span> <span class="str">"PHP / Laravel / full-stack web"</span><span class="op">,</span>',
      '',
      '  <span class="prop">"experience"</span><span class="op">:</span> <span class="op">[</span>',
      '    <span class="op">{</span>',
      '      <span class="prop">"role"</span><span class="op">:</span>    <span class="str">"PHP Developer"</span><span class="op">,</span>',
      '      <span class="prop">"company"</span><span class="op">:</span> <span class="str">"Codewing Solutions"</span><span class="op">,</span>',
      '      <span class="prop">"period"</span><span class="op">:</span>  <span class="str">"March 2024 - Present"</span><span class="op">,</span>',
      '      <span class="prop">"place"</span><span class="op">:</span>   <span class="str">"Kathmandu, Nepal"</span><span class="op">,</span>',
      '      <span class="prop">"work"</span><span class="op">:</span> <span class="op">[</span>',
      '        <span class="str">"Backend architecture on a booking platform people pay through"</span><span class="op">,</span>',
      '        <span class="str">"REST APIs other teams and addons build against"</span><span class="op">,</span>',
      '        <span class="str">"Payment gateways, and checkout that survives a bad one"</span><span class="op">,</span>',
      '        <span class="str">"Altus AI, an LLM product layer, built solo"</span><span class="op">,</span>',
      '        <span class="str">"Query and runtime performance once the data got big"</span>',
      '      <span class="op">]</span>',
      '    <span class="op">},</span>',
      '    <span class="op">{</span>',
      '      <span class="prop">"role"</span><span class="op">:</span>    <span class="str">"Intern"</span><span class="op">,</span>',
      '      <span class="prop">"company"</span><span class="op">:</span> <span class="str">"TekGro"</span><span class="op">,</span>',
      '      <span class="prop">"period"</span><span class="op">:</span>  <span class="str">"July 2023 - July 2024"</span><span class="op">,</span>',
      '      <span class="prop">"place"</span><span class="op">:</span>   <span class="str">"Kathmandu, Nepal"</span><span class="op">,</span>',
      '      <span class="prop">"work"</span><span class="op">:</span> <span class="op">[</span>',
      '        <span class="str">"Full-stack work across a rotating set of client projects"</span><span class="op">,</span>',
      '        <span class="str">"Where I first shipped code strangers actually used"</span>',
      '      <span class="op">]</span>',
      '    <span class="op">}</span>',
      '  <span class="op">],</span>',
      '',
      '  <span class="prop">"education"</span><span class="op">:</span> <span class="op">{</span>',
      '    <span class="prop">"degree"</span><span class="op">:</span>      <span class="str">"BSc.CSIT - Computer Science &amp; Information Technology"</span><span class="op">,</span>',
      '    <span class="prop">"institution"</span><span class="op">:</span> <span class="str">"Texas International College"</span><span class="op">,</span>',
      '    <span class="prop">"period"</span><span class="op">:</span>      <span class="str">"2021 - 2025"</span>',
      '  <span class="op">},</span>',
      '',
      '  <span class="prop">"principles"</span><span class="op">:</span> <span class="op">[</span>',
      '    <span class="str">"Code the next person can debug at 3am without me"</span><span class="op">,</span>',
      '    <span class="str">"Ship small, check it at runtime, never guess"</span><span class="op">,</span>',
      '    <span class="str">"The framework matters less than people think"</span>',
      '  <span class="op">]</span>',
      '<span class="op">}</span>'
    ]
  },

  "skills.js": {
    icon: icon("#cbcb41", "JS"), lang: "JavaScript", path: "aayush-kalikote", mode: "code",
    code: [
      '<span class="com">/**</span>',
      '<span class="com"> * What I reach for without thinking about it.</span>',
      '<span class="com"> * Roughly ordered by how much of my week it eats.</span>',
      '<span class="com"> */</span>',
      '<span class="kw">export const</span> <span class="var">stack</span> <span class="op">=</span> <span class="op">{</span>',
      '  <span class="prop">languages</span><span class="op">:</span> <span class="op">[</span><span class="str">\'PHP\'</span><span class="op">,</span> <span class="str">\'JavaScript\'</span><span class="op">,</span> <span class="str">\'Python\'</span><span class="op">,</span> <span class="str">\'SQL\'</span><span class="op">],</span>',
      '',
      '  <span class="prop">backend</span><span class="op">:</span> <span class="op">[</span>',
      '    <span class="str">\'Laravel\'</span><span class="op">,</span>          <span class="com">// primary application framework</span>',
      '    <span class="str">\'Eloquent ORM\'</span><span class="op">,</span>',
      '    <span class="str">\'REST API design\'</span><span class="op">,</span>',
      '    <span class="str">\'MySQL\'</span><span class="op">,</span>',
      '    <span class="str">\'Django\'</span><span class="op">,</span>',
      '    <span class="str">\'WordPress / plugin architecture\'</span>',
      '  <span class="op">],</span>',
      '',
      '  <span class="prop">frontend</span><span class="op">:</span> <span class="op">[</span><span class="str">\'Vue.js\'</span><span class="op">,</span> <span class="str">\'React\'</span><span class="op">,</span> <span class="str">\'Blade\'</span><span class="op">,</span> <span class="str">\'Tailwind\'</span><span class="op">,</span> <span class="str">\'CSS3\'</span><span class="op">],</span>',
      '',
      '  <span class="prop">ai</span><span class="op">:</span> <span class="op">[</span><span class="str">\'LLM Integration\'</span><span class="op">,</span> <span class="str">\'Prompt Design\'</span><span class="op">,</span> <span class="str">\'RAG\'</span><span class="op">,</span> <span class="str">\'Streaming\'</span><span class="op">,</span> <span class="str">\'Cost Control\'</span><span class="op">],</span>',
      '',
      '  <span class="prop">tooling</span><span class="op">:</span> <span class="op">[</span><span class="str">\'Git\'</span><span class="op">,</span> <span class="str">\'Composer\'</span><span class="op">,</span> <span class="str">\'PHPUnit\'</span><span class="op">,</span> <span class="str">\'PHPStan\'</span><span class="op">,</span> <span class="str">\'Docker\'</span><span class="op">,</span> <span class="str">\'Linux\'</span><span class="op">]</span>',
      '<span class="op">};</span>',
      '',
      '<span class="com">// What I optimise for, in that order.</span>',
      '<span class="kw">export const</span> <span class="var">priorities</span> <span class="op">=</span> <span class="op">[</span>',
      '  <span class="str">\'Correctness\'</span><span class="op">,</span>',
      '  <span class="str">\'Readability\'</span><span class="op">,</span>',
      '  <span class="str">\'Maintainability\'</span><span class="op">,</span>',
      '  <span class="str">\'Performance\'</span><span class="op">,</span>',
      '  <span class="str">\'Cleverness\'</span>  <span class="com">// &lt;- dead last, and I mean it</span>',
      '<span class="op">];</span>',
      '',
      '<span class="kw">export function</span> <span class="fn">canHelpWith</span><span class="op">(</span><span class="var">problem</span><span class="op">) {</span>',
      '  <span class="kw">if</span> <span class="op">(</span><span class="var">problem</span><span class="op">.</span><span class="prop">isBackend</span> <span class="op">||</span> <span class="var">problem</span><span class="op">.</span><span class="prop">isAPI</span><span class="op">)</span> <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>',
      '  <span class="kw">if</span> <span class="op">(</span><span class="var">problem</span><span class="op">.</span><span class="prop">isAI</span> <span class="op">||</span> <span class="var">problem</span><span class="op">.</span><span class="prop">isInteresting</span><span class="op">)</span> <span class="kw">return</span> <span class="num">true</span><span class="op">;</span>',
      '  <span class="kw">return</span> <span class="str">\'probably, ask me\'</span><span class="op">;</span>',
      '<span class="op">}</span>'
    ]
  },

  "contact.php": {
    icon: icon("#a074c4", "&lt;?"), lang: "PHP", path: "aayush-kalikote", mode: "code",
    code: [
      '<span class="op">&lt;?</span><span class="kw">php</span>',
      '<span class="com">/**</span>',
      '<span class="com"> * The one endpoint worth hitting.</span>',
      '<span class="com"> */</span>',
      '<span class="kw">namespace</span> <span class="typ">Aayush</span><span class="op">;</span>',
      '',
      '<span class="kw">final class</span> <span class="typ">Contact</span> <span class="op">{</span>',
      '',
      '    <span class="kw">public const</span> <span class="var">EMAIL</span>    <span class="op">=</span> <span class="str">\'' + ME.email + '\'</span><span class="op">;</span>',
      '    <span class="kw">public const</span> <span class="var">LINKEDIN</span> <span class="op">=</span> <span class="str">\'' + ME.linkedin + '\'</span><span class="op">;</span>',
      '    <span class="kw">public const</span> <span class="var">GITHUB</span>   <span class="op">=</span> <span class="str">\'' + ME.github + '\'</span><span class="op">;</span>',
      '    <span class="kw">public const</span> <span class="var">LOCATION</span> <span class="op">=</span> <span class="str">\'' + ME.location + '\'</span><span class="op">;</span>',
      '    <span class="kw">public const</span> <span class="var">ROLE</span>     <span class="op">=</span> <span class="str">\'Software Engineer - PHP / Laravel\'</span><span class="op">;</span>',
      '',
      '    <span class="com">// I answer the same day, two at the worst.</span>',
      '    <span class="kw">public function</span> <span class="fn">reply_time</span><span class="op">():</span> <span class="typ">string</span> <span class="op">{</span>',
      '        <span class="kw">return</span> <span class="str">\'&lt; 24h\'</span><span class="op">;</span>',
      '    <span class="op">}</span>',
      '',
      '    <span class="kw">public function</span> <span class="fn">open_to</span><span class="op">():</span> <span class="typ">array</span> <span class="op">{</span>',
      '        <span class="kw">return</span> <span class="op">[</span>',
      '            <span class="str">\'Backend and full-stack engineering roles\'</span><span class="op">,</span>',
      '            <span class="str">\'PHP and Laravel application work\'</span><span class="op">,</span>',
      '            <span class="str">\'LLM and AI integration work\'</span><span class="op">,</span>',
      '            <span class="str">\'A genuinely interesting problem, generally\'</span><span class="op">,</span>',
      '        <span class="op">];</span>',
      '    <span class="op">}</span>',
      '<span class="op">}</span>',
      '',
      '<span class="com">// Say hello:</span>',
      '<span class="var">$me</span> <span class="op">=</span> <span class="kw">new</span> <span class="typ">Contact</span><span class="op">();</span>',
      '<span class="fn">mail</span><span class="op">(</span><span class="typ">Contact</span><span class="op">::</span><span class="var">EMAIL</span><span class="op">,</span> <span class="str">\'Hello\'</span><span class="op">,</span> <span class="str">\'I have something worth building.\'</span><span class="op">);</span>'
    ]
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
  { type: "folder", name: "src", open: true, children: ["about.md", "skills.js", "contact.php"] },
  { type: "folder", name: "projects", open: true, children: ["projects/wp-travel-engine.md"] },
  { type: "file", name: "experience.json" },
  { type: "file", name: "README.md" }
];
