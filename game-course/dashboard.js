// Dashboard: all 30 lessons grouped by week, with per-viewer progress.
import { COURSE, LESSONS } from './course.js';
import { readProgress, writeProgress, toggleDay } from './course-page.js';

const $ = (s, r = document) => r.querySelector(s);
const weeksEl = $('#weeks');

function render() {
  const done = readProgress();

  weeksEl.innerHTML = COURSE.weeks
    .map((w) => {
      const lessons = LESSONS.filter((l) => l.week === w.n);
      const complete = lessons.filter((l) => done.has(l.day)).length;

      const rows = lessons
        .map((l) => {
          const free = COURSE.freeDays.includes(l.day);
          const isDone = done.has(l.day);
          const title = free
            ? `<a href="day/${l.day}/">${l.title}</a>`
            : `<a href="day/${l.day}/">${l.title}</a>`;
          const tag = free
            ? `<span class="tag tag--free">Free</span>`
            : `<span class="tag">Enrolled</span>`;
          return `<div class="lesson-row">
            <span class="day-num">Day ${l.day}</span>
            ${tag}
            <h3>${title}</h3>
            <button class="check" type="button" data-day="${l.day}" aria-pressed="${isDone}" aria-label="Mark day ${l.day} complete"></button>
          </div>`;
        })
        .join('');

      return `<section class="week-block">
        <header>
          <span class="num">Week ${w.n}</span>
          <h2>${w.title}</h2>
          <p>${w.blurb}</p>
          <p class="progress-label" style="margin:0 0 0 auto">${complete} / ${lessons.length}</p>
        </header>
        ${rows}
      </section>`;
    })
    .join('');

  const total = LESSONS.length;
  const count = LESSONS.filter((l) => done.has(l.day)).length;
  $('#progress-fill').style.width = `${(count / total) * 100}%`;
  $('#progress-label').textContent = `${count} of ${total} complete`;
}

weeksEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.check[data-day]');
  if (!btn) return;
  toggleDay(btn.dataset.day);
  render();
});

$('#reset-progress').addEventListener('click', () => {
  writeProgress(new Set());
  render();
});

render();
