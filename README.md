# psios.com — 2026 redesign

Static site, no build step. Deployable folder is this directory.

- Brand: ink black `#111213`, silver, and the logo's cyan `#00c8e8` / blue `#1769ff`. The chrome/yellow sculpture images are not used.
- Copy and positioning: `~/Documents/Projects/psios-studio/docs/` (Workflow Pilot $1,500, consulting + game development).
- Logo: `assets/psios-mark.svg` — the animated value-cycle mark (Derek portrait, rotating arrows, flowing trails). It is the only logo; the 3D chrome logo concepts are retired and must not be used. Shown small in the header/footer and at full size in the founder section.

Run locally:

    python3 -m http.server 4180 --directory .

Contact form opens a mailto draft; nothing is stored. No analytics. Custom domain psios.com via `CNAME`; GitHub Pages deploys on push to `main`.
The existing Astro site at `~/Projects/psios-com` (and its `/game` route) is untouched.
