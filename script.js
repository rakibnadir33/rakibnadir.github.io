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

  // ===== Certifications Data & Render =====
  const certifications = [
    {
      title: "CRTP – Certified Red Team Professional",
      issuer: "Altered Security",
      date: "Jan 2026",
      image: "image/CRTP.jpg",
      verifyUrl: "https://www.credential.net/0d6a3790-31ad-479f-8d39-bb2b137c362f#acc.IwxeF4Um",
      proof: "Proficiency in attacking patched Windows AD environments, utilizing PowerShell (PowerView) for stealthy enumeration, and executing domain dominance attacks."
    },
    {
      title: "eJPT – Junior Penetration Tester",
      issuer: "INE",
      date: "Aug 2025",
      image: "image/eJPT.jpg",
      verifyUrl: "https://certs.ine.com/fe373fe2-8c13-4e7a-a823-a235ae2f9700#acc.gOsExWMA",
      proof: "Validated foundational skills in networking, scripting, and web application methodology."
    },
    {
      title: "CRTA – Certified Red Team Analyst",
      issuer: "CyberWarFare Labs",
      date: "Sept 2025",
      image: "image/CRTA.jpg",
      verifyUrl: "https://labs.cyberwarfare.live/credential/achievement/68c8dd1a40a4bd67bdcba0c7",
      proof: "Advanced tradecraft in red teaming, focusing on evasion, lateral movement, and abusing enterprise ecosystem features."
    },
    {
      title: "CNSP – Certified Network Security Practitioner",
      issuer: "Pentesting Exams",
      date: "Dec 2025",
      image: "image/CNSP.jpg",
      verifyUrl: "https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXWylSHxVEdPoseGvIue1kLosShxNyKFht9j+6povCfxxB/NerA5o6lpUfw3Via/ofwUtfItkU5c+P5IX8h8vM6E=",
      proof: "Competence in network mapping, service exploitation, and firewall evasion."
    }
  ];

  // ===== Achievements Data & Render =====
  const achievements = [
    {
      title: "Hack Secure CTF WAR HOMELAB – 1st Place",
      issuer: "Hack Secure",
      date: "Apr 2025",
      image: "image/cert.png",
      verifyUrl: "https://certificate.givemycertificate.com/c/9ed756ff-9ce6-4cf3-b3bf-f2e38574b8c3",
      proof: "Ranked #1 in a 48-hour endurance CTF, demonstrating speed, accuracy, and advanced problem-solving under pressure."
    },
    {
      title: "Ranked Top 2% on TryHackMe",
      issuer: "TryHackMe",
      date: "2025",
      image: "image/THM.png",
      verifyUrl: "https://tryhackme.com/p/rakibnadir",
      proof: "Consistent practice in web and network exploitation rooms, maintaining a high rank globally."
    },
    {
      title: "Script Kiddie Rank",
      issuer: "Hack The Box",
      date: "2025",
      image: "image/HTB.png",
      verifyUrl: "https://app.hackthebox.com/users/2253987",
      proof: "Active participant in realistic user and system exploitation challenges."
    }
  ];

  // Helper render function
  function renderGrid(data, elementId) {
    const grid = document.getElementById(elementId);
    if (!grid) return;

    grid.innerHTML = data.map((item) => `
      <a href="${item.verifyUrl}" target="_blank" rel="noopener noreferrer" class="cert-card" aria-label="Verify ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" class="cert-img">
        <div class="cert-overlay">
          <div class="cert-title">${item.title}</div>
          <div class="cert-meta">${item.issuer} • ${item.date}</div>
          ${item.proof ? `<div class="cert-proof" style="font-size: 0.85rem; margin-top: 0.5rem; opacity: 0.9;">${item.proof}</div>` : ''}
          <div class="cert-verify" style="margin-top: auto;">Verify →</div>
        </div>
      </a>
    `).join('');
  }

  renderGrid(certifications, 'certifications-grid');
  renderGrid(achievements, 'achievements-grid');
});
