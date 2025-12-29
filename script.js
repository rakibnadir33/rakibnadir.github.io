// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const el = document.querySelector(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
    });
  });
}

// Scroll reveal using IntersectionObserver
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback for very old browsers
  revealElements.forEach((el) => el.classList.add("visible"));
}

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

window.addEventListener("scroll", () => {
  let currentId = null;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const offset = 140; // distance from top
    if (rect.top <= offset && rect.bottom >= offset) {
      currentId = section.id;
    }
  });

  navAnchors.forEach((a) => {
    const hrefId = a.getAttribute("href").slice(1);
    if (hrefId === currentId) {
      a.classList.add("active");
    } else {
      a.classList.remove("active");
    }
  });
});

// Simple counter animation for stats
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 80));

    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      counter.textContent = current;
    }, 20);
  });
}

// Observe hero area for counters
const heroSection = document.getElementById("hero");
if (heroSection && "IntersectionObserver" in window) {
  const heroObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );
  heroObserver.observe(heroSection);
} else {
  startCounters();
}

// Fake submit handler for contact form
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Thanks for reaching out! This demo form doesn't send email yet, but you can contact me directly at rakibnadir@gmail.com."
    );
    form.reset();
  });
}
