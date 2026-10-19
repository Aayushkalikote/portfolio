# Portfolio

My personal portfolio: a ChatGPT-style page where visitors ask about my work and get answers.
There is no AI behind it. Every answer is written ahead of time, and the question is matched to a topic by keywords, so it costs nothing to run.

Static site: plain HTML, CSS, and vanilla JS. No build step, no dependencies.

## Run

```
python3 -m http.server
```

Then open http://localhost:8000

Test the question matcher: `node tests/chat-brain.test.mjs`

## Layout

- `index.html` — the page: sidebar, chat area, message box
- `js/profile.js` — name, email, links
- `js/chat-brain.js` — every answer, the projects, and the keyword matching. Edit this to change what the chat says
- `js/chat.js` — plays the answers: steps, typing, commands, theme
- `js/chat-icons.js` — inline icons
- `css/chat.css` — styles, with dark and light themes
- `assets/` — images
- `tools/scenes.py` — draws the mountain banner and page background (day + night): `python3 tools/scenes.py assets`

The old VS Code–style portfolio lives on the `vscode-editor` branch.
