#!/usr/bin/env node
// Writes game-course/day/<n>/index.html for every lesson in game-course/course.js.
// No build step for deploys — run this by hand when lesson data changes, then commit:
//   node tools/build-course.mjs
//
// Day 1 is public and ships its full lesson body (day-1-body.html).
// Days 2–30 ship only the public syllabus line plus an enrol call to action —
// paid lesson bodies are never committed here, because anything in this repo
// is readable by anyone who opens the page source.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { COURSE, LESSONS } from '../game-course/course.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const courseDir = join(root, 'game-course');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const weekTitle = (n) => COURSE.weeks.find((w) => w.n === n)?.title ?? '';

function videoBlock(lesson) {
  if (!lesson.video) {
    return `<div class="video-frame">Lesson video — recording in progress</div>`;
  }
  return `<div class="video-frame"><iframe src="${esc(lesson.video)}" title="${esc(lesson.title)}" allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>`;
}

function lockedBlock() {
  return `<section class="locked">
        <h2>This lesson is part of the course</h2>
        <p>Day 1 is free to read. Days 2 to 30, with the build tasks, agent briefs, and the Zapnauts walkthroughs, come with enrolment.</p>
        <a class="btn btn-acid js-buy-selfpaced" href="../../#pricing"><span>See pricing</span><i aria-hidden="true">→</i></a>
      </section>`;
}

function page(lesson, body) {
  const prev = LESSONS.find((l) => l.day === lesson.day - 1);
  const next = LESSONS.find((l) => l.day === lesson.day + 1);
  const free = COURSE.freeDays.includes(lesson.day);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Day ${lesson.day}: ${esc(lesson.title)} — Ship a Roblox Game in 30 Days</title>
  <meta name="description" content="${esc(lesson.summary)}">
  <meta name="theme-color" content="#111213">
  <meta property="og:title" content="Day ${lesson.day}: ${esc(lesson.title)}">
  <meta property="og:description" content="${esc(lesson.summary)}">
  <meta property="og:type" content="article">
  <link rel="canonical" href="https://psios.com/game-course/day/${lesson.day}/">
  <link rel="icon" type="image/svg+xml" href="../../../assets/psios-mark.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../../../style.css?v=5">
  <link rel="stylesheet" href="../../course.css?v=1">
  <script src="../../lesson.js?v=1" type="module" defer></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="top">
    <a class="brand" href="../../../" aria-label="Psios LLC home">
      <img class="brand-mark" src="../../../assets/psios-mark.svg" width="300" height="300" alt="">
      <span class="brand-word">Psios<small>LLC</small></span>
    </a>
    <nav class="nav" aria-label="Main navigation">
      <a href="../../">Course</a>
      <a href="../../dashboard.html">All lessons</a>
      <a class="btn btn-acid btn-sm" href="../../#pricing">Enrol</a>
    </nav>
  </header>

  <main id="main" class="lesson">
    <nav class="lesson-nav" aria-label="Lesson navigation">
      ${prev ? `<a href="../${prev.day}/">← Day ${prev.day}</a>` : `<a href="../../dashboard.html">← All lessons</a>`}
      <a href="../../dashboard.html">Week ${lesson.week} · ${esc(weekTitle(lesson.week))}</a>
      ${next ? `<a href="../${next.day}/">Day ${next.day} →</a>` : `<span>End of course</span>`}
    </nav>

    <p class="eyebrow"><span>Day ${lesson.day} of 30</span><span class="sep"></span><span>${free ? 'Free lesson' : 'Enrolled lesson'}</span></p>
    <h1>${esc(lesson.title)}</h1>
    <p class="summary">${esc(lesson.summary)}</p>

    ${videoBlock(lesson)}

    <section class="build-task">
      <p class="eyebrow">Today's build task</p>
      <p>${esc(lesson.buildTask)}</p>
    </section>

    ${body}

    <div class="lesson-done">
      <button class="check" type="button" data-day="${lesson.day}" aria-pressed="false" aria-label="Mark day ${lesson.day} complete"></button>
      <span>Mark Day ${lesson.day} complete</span>
    </div>

    <nav class="lesson-nav" style="margin:36px 0 0" aria-label="Lesson navigation">
      ${prev ? `<a href="../${prev.day}/">← Day ${prev.day}</a>` : `<span></span>`}
      <a href="../../dashboard.html">All lessons</a>
      ${next ? `<a href="../${next.day}/">Day ${next.day} →</a>` : `<span></span>`}
    </nav>
  </main>

  <footer class="foot">
    <a class="brand" href="../../../" aria-label="Psios LLC home">
      <img class="brand-mark" src="../../../assets/psios-mark.svg" width="300" height="300" alt="">
      <span class="brand-word">Psios<small>LLC</small></span>
    </a>
    <span class="foot-tag">Ship a Roblox Game in 30 Days · <a href="../../">Course home</a></span>
    <div class="foot-legal">© 2026 Psios LLC <a href="../../../privacy.html">Privacy</a></div>
  </footer>
  <p class="disclaimer">Roblox, Roblox Studio, and Luau are trademarks of Roblox Corporation. Claude and Claude Code are trademarks of Anthropic, PBC. This course is an independent educational product of Psios LLC and is not affiliated with, endorsed by, or sponsored by Roblox Corporation or Anthropic, PBC.</p>
</body>
</html>
`;
}

let written = 0;
for (const lesson of LESSONS) {
  const free = COURSE.freeDays.includes(lesson.day);
  let body = lockedBlock();

  if (free) {
    const bodyPath = join(courseDir, `day-${lesson.day}-body.html`);
    if (existsSync(bodyPath)) {
      body = `<div class="lesson-body">\n${await readFile(bodyPath, 'utf8')}\n</div>`;
    } else {
      console.warn(`! Day ${lesson.day} is free but ${bodyPath} is missing — shipping the locked block instead.`);
    }
  }

  const dir = join(courseDir, 'day', String(lesson.day));
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), page(lesson, body), 'utf8');
  written += 1;
}

console.log(`Wrote ${written} lesson pages to game-course/day/`);
