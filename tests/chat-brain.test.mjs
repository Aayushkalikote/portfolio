// Run: node tests/chat-brain.test.mjs
import assert from "node:assert/strict";
import { classify, reply } from "../js/chat-brain.js";

const cases = {
  "Who is Aayush?": "about",
  "What is he working on now?": "now",
  "Show me his projects": "projects",
  "Why should we hire him?": "hire",
  "tell me about altus ai": "altus",
  "what did he do on wp travel engine": "wpte",
  "how can I contact him": "contact",
  "what's his tech stack": "stack",
  "where did he study": "education",
  "career history": "experience",
  "hi": "hello",
  "what can you do": "help",
  "qwerty": "fallback",
  "/projects": "projects",
  "Tell me about DropBridge": "dropbridge",
  "any open source projects?": "dropbridge",
  "what's his github": "contact",
  "/nope": "help"
};
for (const [q, want] of Object.entries(cases)) assert.equal(classify(q), want, q);
for (const q of Object.keys(cases)) {
  const r = reply(q);
  assert.ok(r.text && Array.isArray(r.steps) && Array.isArray(r.followUps), q);
}
console.log("ok", Object.keys(cases).length, "cases");
