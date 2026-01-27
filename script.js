// Cleaned site script: particle background, UI behaviors, and helpers
document.addEventListener('DOMContentLoaded', () => {
  // Particle background removed


  // ----- UI Helpers -----
  // Set current year
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const el = document.querySelector(targetId);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); o.unobserve(entry.target); } });
    }, { threshold: 0.15 });
    revealElements.forEach(el => obs.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  window.addEventListener('scroll', () => {
    let current = null;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const offset = 140;
      if (rect.top <= offset && rect.bottom >= offset) current = section.id;
    });
    navAnchors.forEach(a => {
      const id = a.getAttribute('href').slice(1);
      a.classList.toggle('active', id === current);
    });
  });

  // Counters
  const counters = document.querySelectorAll('.counter');
  let countersStarted = false;
  function startCounters() {
    if (countersStarted) return; countersStarted = true;
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target || '0', 10);
      let current = 0; const step = Math.max(1, Math.floor(target / 80));
      const iv = setInterval(() => {
        current += step; if (current >= target) { current = target; clearInterval(iv); }
        counter.textContent = current;
      }, 20);
    });
  }
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const hObs = new IntersectionObserver((entries, o) => { entries.forEach(en => { if (en.isIntersecting) { startCounters(); o.disconnect(); } }); }, { threshold: 0.4 });
    hObs.observe(heroSection);
  } else startCounters();

  // Contact form (demo)
  const form = document.querySelector('.contact-form');
  if (form) form.addEventListener('submit', (e) => { e.preventDefault(); alert("Thanks — demo form. Contact: rakibnadir@gmail.com"); form.reset(); });
});
