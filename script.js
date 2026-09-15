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
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }
}

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

applyTheme(savedTheme);

function initializeSkillsCarousel() {
  const skillsCarousel = document.querySelector('.skills-carousel');

  if (!skillsCarousel) {
    return;
  }

  const track = skillsCarousel.querySelector('.skills-track');
  const slides = [...skillsCarousel.querySelectorAll('.skill-card')];
  const dots = [...skillsCarousel.querySelectorAll('.carousel-dot')];
  const previousButton = skillsCarousel.querySelector('[data-carousel-prev]');
  const nextButton = skillsCarousel.querySelector('[data-carousel-next]');
  let currentSlide = 0;
  let autoplay;

  function getVisibleSlides() {
    return window.matchMedia('(max-width: 700px)').matches ? 1 : 3;
  }

  function showSlide(index) {
    const visibleSlides = getVisibleSlides();
    const lastSlide = Math.max(0, slides.length - visibleSlides);
    currentSlide = index > lastSlide ? 0 : Math.max(0, index);
    track.style.transform = `translateX(-${currentSlide * (100 / visibleSlides)}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.hidden = dotIndex > lastSlide;
      const isActive = dotIndex === currentSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
  }

  function restartAutoplay() {
    window.clearInterval(autoplay);
    autoplay = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  previousButton.addEventListener('click', () => {
    showSlide(currentSlide - 1);
    restartAutoplay();
  });

  nextButton.addEventListener('click', () => {
    showSlide(currentSlide + 1);
    restartAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoplay();
    });
  });

  skillsCarousel.addEventListener('mouseenter', () => window.clearInterval(autoplay));
  skillsCarousel.addEventListener('mouseleave', restartAutoplay);
  window.addEventListener('resize', () => showSlide(currentSlide));
  showSlide(0);
  restartAutoplay();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSkillsCarousel);
} else {
  initializeSkillsCarousel();
}
