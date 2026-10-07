// Shared behaviour for the course pages. ES module, no build step.
import { COURSE, LESSONS } from './course.js';

// Stripe Payment Links for the course (Stripe Dashboard → Payment Links).
// Empty = the buy buttons keep pointing at the free Day 1 signup.
// TODO(derek): paste the two links once the course is ready to sell.
export const COURSE_LINKS = {
  selfPaced: '', // $297
  live: '',      // $497 with weekly live Q&A
};

// Same Cloudflare Worker the Build Log uses on the main site.
// TODO(derek): set this to the Worker URL; empty keeps the "read Day 1 now" fallback.
export const SUBSCRIBE_URL = '';

const $ = (s, r = document) => r.querySelector(s);
const isStripe = (u) => /^https:\/\/buy\.stripe\.com\/[A-Za-z0-9_]+$/.test(u);

/* ── progress, stored per viewer in this browser only ──────────── */
const KEY = 'psios.gamecourse.progress';

export function readProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(list) ? list.map(Number) : []);
  } catch {
    return new Set();
  }
}

export function writeProgress(set) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...set].sort((a, b) => a - b)));
  } catch {
    /* private window or blocked storage — progress just won't persist */
  }
}

export function toggleDay(day) {
  const done = readProgress();
  const n = Number(day);
  done.has(n) ? done.delete(n) : done.add(n);
  writeProgress(done);
  return done.has(n);
}

/* ── buy buttons ──────────────────────────────────────────────── */
function wireBuy(selector, url, label) {
  if (!url || !isStripe(url)) return;
  document.querySelectorAll(selector).forEach((a) => {
    a.href = url;
    const span = a.querySelector('span');
    if (span && label) span.textContent = label;
  });
}
wireBuy('.js-buy-selfpaced', COURSE_LINKS.selfPaced, 'Enrol — $297');
wireBuy('.js-buy-live', COURSE_LINKS.live, 'Enrol — $497');

/* ── Day 1 signup ─────────────────────────────────────────────── */
const day1 = $('#day1-form');
if (SUBSCRIBE_URL && day1) {
  day1.hidden = false;
  document.querySelectorAll('.js-day1-soon').forEach((el) => (el.hidden = true));
  day1.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = $('#day1-status');
    const email = $('#day1-email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = 'Please enter a valid email address.';
      return;
    }
    status.textContent = 'Sending…';
    try {
      const res = await fetch(SUBSCRIBE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'psios', intent: 'game-course-day1' }),
      });
      status.textContent = res.ok
        ? 'Day 1 is on its way. Check your inbox.'
        : 'Something went wrong. Please try again.';
    } catch {
      status.textContent = 'Network problem. Please try again.';
    }
  });
}

/* ── week cards on the landing page ───────────────────────────── */
const weekCards = $('#week-cards');
if (weekCards) {
  weekCards.innerHTML = COURSE.weeks
    .map((w) => {
      const lessons = LESSONS.filter((l) => l.week === w.n);
      const items = lessons
        .map((l) => {
          const free = COURSE.freeDays.includes(l.day);
          const label = free
            ? `<a href="day/${l.day}/">${l.title}</a>`
            : `<span>${l.title}</span>`;
          return `<li><em>Day ${l.day}</em>${label}</li>`;
        })
        .join('');
      return `<article class="week-card">
        <span class="num">Week ${w.n}</span>
        <h3>${w.title}</h3>
        <p>${w.blurb}</p>
        <ol>${items}</ol>
      </article>`;
    })
    .join('');
}

/* ── mobile nav (same behaviour as the main site) ─────────────── */
const toggle = $('.nav-toggle');
const nav = $('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
