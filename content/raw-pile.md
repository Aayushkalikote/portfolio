# Raw material pile — portfolio copy extracted from js/files.js + js/profile.js

Read-only. Source of truth for the shaping session. Fragments, not an article.

## Identity
- Aayush Kalikote. Software Engineer. PHP · Laravel · Full-Stack Web.
- Kathmandu, Nepal.
- aayushkalikote37@gmail.com
- linkedin.com/in/aayush-kalikote-b75bab246/ · github.com/Aayushkalikote
- Chip on hero: "Open to opportunities".
- Reply time: usually same day, always within two. `< 24h`.
- Open to: backend / full-stack engineering roles; Laravel and PHP application work; AI integration work; interesting problems, generally.

## Positioning fragments
- "I build web applications end to end — backend architecture in PHP and Laravel, APIs that other systems depend on, and the interfaces on top of them."
- "Currently at Codewing Solutions, where I work on production travel-booking software and the AI layer built on top of it."
- "I am a software engineer working primarily in the PHP ecosystem — Laravel for application work, WordPress when the product calls for it — with JavaScript on the front end."
- "I care about the same things regardless of the framework: clear data models, honest APIs, and code that survives the person who writes it."
- Principle line: "The framework is an implementation detail."

## What I do (capability list)
- Backend engineering — PHP, Laravel, MVC architecture, Eloquent, queues, MySQL schema design.
- APIs — REST design, schema validation, authentication, versioning, third-party integrations.
- Full-stack delivery — JavaScript, Vue, React; building the screens as well as what powers them.
- Product engineering at scale — booking flows, payment gateways, and pricing logic where mistakes cost real money.
- AI integration — LLM features grounded in real application data, with fallbacks and cost ceilings.

## How I work
- "Boring, readable code beats clever code."
- "I ship small, verify at runtime rather than assuming, and try to leave a codebase easier to change than I found it."
- "The person debugging this at 3am is probably me, and I would like them to have a good time."
- Principles list: "Boring code the next engineer can debug at 3am"; "Ship small, verify at runtime, never guess"; "The framework is an implementation detail."
- Priorities, in order: Correctness, Readability, Maintainability, Performance, Cleverness (`// <- distant last, on purpose`).

## Experience
- PHP Developer, Codewing Solutions — WP Travel Engine & Altus AI. March 2024 – Present. Kathmandu, Nepal.
  - Backend architecture for a production booking platform
  - REST API design, schema validation, integrations
  - Payment gateway work and checkout reliability
  - Solo ownership of Altus AI, an LLM product layer
  - Query and runtime performance on large datasets
- Intern, TekGro — full-stack web development. July 2023 – July 2024. Kathmandu, Nepal.
  - Full-stack web development across client projects
  - "First exposure to shipping code real users touched"
- BSc.CSIT — Computer Science & Information Technology, Texas International College, 2021 – 2025.

## Projects
Framing line: "Both of these are products I work on at Codewing Solutions, live in production today. The domain is travel booking; the engineering underneath is ordinary backend work — data models, APIs, payments, and performance."

### WP Travel Engine — badge: Core Engineer
- "A complete travel-booking platform for WordPress: trips, itineraries, availability, pricing rules, checkout and payments."
- "I work across the core plugin and its addon ecosystem — booking logic, the REST surface, the React-based admin, payment gateway integrations, and the compatibility layer that keeps dozens of addons coexisting without stepping on each other."
- Bullets: Booking flow and pricing rule engine · Payment gateway integrations and checkout reliability · REST API design and React admin screens · Backward-compatible migrations across thousands of live installs
- Tags: PHP, WordPress, React, REST API, Payments, MySQL
- Link: https://wptravelengine.com/

### Altus AI — badge: Solo — Design & Build
- "An AI layer for travel sites, architected and built solo end to end."
- "Altus AI generates itineraries and trip content, answers traveller questions in context, and reads from real trip data rather than inventing it."
- "I owned every layer: architecture, prompt and retrieval design, streaming UX, token and cost guardrails, and the admin experience."
- Bullets: Retrieval over existing trip data so output stays grounded · Streaming responses with graceful degradation when the model is unavailable · Token budgets and cost ceilings enforced server-side · Admin UI for configuration, limits, and content review
- Tags: LLM Integration, Prompt Design, RAG, PHP, JavaScript, Streaming
- Link: https://wptravelengine.com/altus-ai/

### Also
- "Smaller addons, internal tooling, and compatibility work across the WP Travel Engine addon line."

## Stack (skills.js)
- Comment: "The stack I reach for without thinking. Ordered by how often it is open on my second monitor."
- languages: PHP, JavaScript, Python, SQL
- backend: Laravel (`// primary application framework`), Eloquent ORM, REST API design, MySQL, Django, WordPress / plugin architecture
- frontend: Vue.js, React, Blade, Tailwind, CSS3
- ai: LLM Integration, Prompt Design, RAG, Streaming, Cost Control
- tooling: Git, Composer, PHPUnit, PHPStan, Docker, Linux
- `canHelpWith(problem)` — true if backend or API; true if AI or interesting; otherwise `'probably, ask me'`.

## The site itself (README.md)
- "You are looking at a portfolio disguised as an editor. Everything here is real; the chrome is a joke I committed to a little too hard."
- Navigation: click files in Explorer; Ctrl+` terminal; Ctrl+Shift+P palette; Ctrl+B sidebar; Ctrl+W close tab.
- Terminal commands: `whoami`, `projects`, `skills --all`, `experience`, `contact`, `neofetch` ("because of course"), `sudo hire-me` ("worth a try"). `help` lists them.
- Tip line from about.md: "hit Ctrl+` to open the terminal, then type `help`. Most of this CV is queryable from there."
- Stack of the page: "One HTML file. Vanilla CSS, vanilla JS, no build step, no dependencies, no framework. It loads in a single request and works with JavaScript doing very little heavy lifting."
- contact.php comment: "The only endpoint that matters."
