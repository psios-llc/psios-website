// psios.com — no framework, no build step.

const $ = (s, r = document) => r.querySelector(s);
// Mobile nav
const toggle = $('.nav-toggle');
const nav = $('#site-nav');
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

// Scroll reveal
const revealables = document.querySelectorAll('.section');
revealables.forEach((el) => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealables.forEach((el) => io.observe(el));
} else {
  revealables.forEach((el) => el.classList.add('revealed'));
}

const params = new URLSearchParams(location.search);

// Inquiry form: builds a mailto draft; nothing is stored or sent by the site.
$('#inquiry-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const source = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    .map((k) => (params.get(k) ? `${k}: ${params.get(k).slice(0, 120)}` : ''))
    .filter(Boolean)
    .join('\n');
  const body = `Hi Derek,\n\nI'm ${data.get('name')} from ${data.get('business')}.\nReply to: ${data.get('email')}\n\nWhat I'd like help with:\n${data.get('workflow')}\n\nI'd like to find out whether Psios is a fit.\n${source ? `\nHow I found Psios:\n${source}` : ''}`;
  $('#draft-text').value = body;
  $('#draft-result').hidden = false;
  const subject = `Psios inquiry: ${data.get('subject')}`;
  location.href = `mailto:derek@psios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

$('#copy-draft').addEventListener('click', async () => {
  const status = $('#copy-status');
  try {
    await navigator.clipboard.writeText($('#draft-text').value);
    status.textContent = 'Copied.';
  } catch {
    $('#draft-text').select();
    status.textContent = 'Select the text and copy it.';
  }
  setTimeout(() => (status.textContent = ''), 3000);
});
