const body = document.body;
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
const savedTheme = localStorage.getItem('bea-portfolio-theme') || preferredTheme;

body.dataset.theme = savedTheme;

const toggle = document.getElementById('themeToggle');
const icon = document.getElementById('themeIcon');

function applyTheme(theme) {
  body.dataset.theme = theme;
  localStorage.setItem('bea-portfolio-theme', theme);

  if (toggle && icon) {
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

applyTheme(savedTheme);
