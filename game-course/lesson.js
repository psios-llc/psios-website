// Lesson page: the complete checkmark, plus buy-button wiring from course-page.js.
import { COURSE_LINKS, readProgress, toggleDay } from './course-page.js';

const done = readProgress();
document.querySelectorAll('.check[data-day]').forEach((btn) => {
  const day = Number(btn.dataset.day);
  btn.setAttribute('aria-pressed', String(done.has(day)));
  btn.addEventListener('click', () => {
    btn.setAttribute('aria-pressed', String(toggleDay(day)));
  });
});

export { COURSE_LINKS };
