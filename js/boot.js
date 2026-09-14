// Fake VS Code startup sequence. Purely decorative; skipped for reduced motion.

import { $ } from "./utils.js";

export function boot() {
  var steps = [
    "Loading workspace aayush-kalikote…",
    "Activating extension php-intelephense…",
    "Indexing 6 files…",
    "Starting integrated terminal…",
    "Ready."
  ];
  var log = $("#bootlog"), fill = $("#bootfill"), i = 0;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function step(){
    if (i < steps.length) {
      log.innerHTML += (i ? "\n" : "") + '<span class="ok">✓</span> ' + steps[i];
      fill.style.width = ((i + 1) / steps.length * 100) + "%";
      i++;
      setTimeout(step, reduce ? 10 : 200 + Math.random() * 130);
    } else {
      setTimeout(function(){
        $("#boot").classList.add("gone");
        setTimeout(function(){ $("#boot").remove(); }, 520);
      }, reduce ? 10 : 320);
    }
  }
  step();
}
