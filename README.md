# psios.com — 2026 redesign

Static site, no build step. Deployable folder is this directory.

- Brand: ink black `#111213`, silver, and the logo's cyan `#00c8e8` / blue `#1769ff`. The chrome/yellow sculpture images are not used.
- Copy and positioning: `~/Documents/Projects/psios-studio/docs/` (Workflow Pilot $1,500, consulting + game development).
- Logo: `assets/psios-mark.svg` — the animated value-cycle mark (Derek portrait, rotating arrows, flowing trails). It is the only logo; the 3D chrome logo concepts are retired and must not be used. Shown small in the header/footer and at full size in the founder section.

Run locally:

    python3 -m http.server 4180 --directory .

Contact form opens a mailto draft; nothing is stored. No analytics. Custom domain psios.com via `CNAME`; GitHub Pages deploys on push to `main`.
The existing Astro site at `~/Projects/psios-com` (and its `/game` route) is untouched.

## Game course (`/game-course/`)

"Ship a Roblox Game in 30 Days with Claude Code" — $297 self-paced, $497 with live Q&A.

- `game-course/course.js` is the single source of truth for all 30 lessons.
- Lesson pages are generated: edit `course.js`, then `node tools/build-course.mjs`, then commit
  the regenerated `game-course/day/<n>/index.html` files.
- Day 1 is public and its body lives in `game-course/day-1-body.html`. Days 2–30 ship only the
  public syllabus line plus an enrol CTA — **paid lesson bodies must never be committed here**,
  because everything in this repo is readable from page source.
- TODOs before launch: `COURSE_LINKS` (Stripe) and `SUBSCRIBE_URL` in `game-course/course-page.js`,
  the weekly Q&A day/time in `game-course/index.html`, and where enrolled lessons are delivered.
