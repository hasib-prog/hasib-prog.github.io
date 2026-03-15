/**
 * ================================================================
 *  CYBERSECURITY PORTFOLIO — script.js
 *  Author:   Your Name
 *  Version:  1.0
 *
 *  TABLE OF CONTENTS:
 *  01. Loader
 *  02. Navbar (scroll + active link + mobile menu)
 *  03. Hero Canvas (animated grid / particle network)
 *  04. Typed Text Animation
 *  05. Scroll Reveal (Intersection Observer)
 *  06. Skill Bar Animations
 *  07. Cert Bar Animations
 *  08. Counter / Stat Animations
 *  09. Project Filtering
 *  10. Back-to-top Button
 *  11. Smooth Scroll (anchor links)
 *  12. Init
 * ================================================================
 */

'use strict';

/* ----------------------------------------------------------------
   01. LOADER
   Fades out after page is ready; cycling loader messages add flair
---------------------------------------------------------------- */
const loaderMessages = [
  'Initializing secure environment...',
  'Loading threat detection modules...',
  'Mounting encrypted file systems...',
  'Establishing secure connection...',
  'Bypassing intrusion detection... just kidding.',
  'Portfolio loaded. Stay curious.',
];

function initLoader() {
  const loader     = document.getElementById('loader');
  const loaderText = document.getElementById('loader-text');
  if (!loader) return;

  let msgIndex = 0;

  // Cycle through messages every 400ms
  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % loaderMessages.length;
    if (loaderText) loaderText.textContent = loaderMessages[msgIndex];
  }, 400);

  // Hide after animation completes (≈ 2.2s)
  window.addEventListener('load', () => {
    setTimeout(() => {
      clearInterval(msgInterval);
      loader.classList.add('hidden');
      document.body.style.overflow = '';  // re-enable scrolling
    }, 2200);
  });

  // Prevent scroll while loading
  document.body.style.overflow = 'hidden';
}


/* ----------------------------------------------------------------
   02. NAVBAR
   - Adds `.scrolled` class (frosted glass) on scroll
   - Highlights active nav link based on scroll position
   - Mobile hamburger toggle
---------------------------------------------------------------- */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navbar) return;

  // ── Scroll: add/remove .scrolled ──────────────────────────────
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on init

  // ── Active link highlight ─────────────────────────────────────
  // Gets all sections and marks the nav link whose section is in view
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';

    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  // ── Mobile hamburger ──────────────────────────────────────────
  function toggleMobileMenu() {
    const isOpen = hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
  }

  hamburger.addEventListener('click', toggleMobileMenu);

  // Close mobile menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  });
}


/* ----------------------------------------------------------------
   03. HERO CANVAS — Animated Particle / Grid Network
   Draws a perspective grid with floating node particles and
   connection lines, giving a "network map" / threat-intel vibe.
---------------------------------------------------------------- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes, animFrame;

  // ── Resize handler ────────────────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // ── Node class ────────────────────────────────────────────────
  class Node {
    constructor() { this.reset(true); }

    reset(randomY = false) {
      this.x  = Math.random() * W;
      this.y  = randomY ? Math.random() * H : H + 20;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.r  = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
      // Each node is either blue or green accent
      this.color = Math.random() > 0.6 ? '#00ff9d' : '#00c8ff';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      // Bounce X
      if (this.x < 0 || this.x > W) this.vx *= -1;
      // Recycle when off top
      if (this.y < -20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 8;
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Init nodes ────────────────────────────────────────────────
  function initNodes() {
    const count = Math.min(Math.floor((W * H) / 14000), 80);
    nodes = Array.from({ length: count }, () => new Node());
  }

  // ── Draw connection lines between nearby nodes ─────────────────
  const MAX_DIST = 140;

  function drawLines() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = '#00c8ff';
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  // ── Draw subtle grid ──────────────────────────────────────────
  function drawGrid() {
    const STEP = 60;
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.strokeStyle = '#00c8ff';
    ctx.lineWidth   = 1;

    for (let x = 0; x < W; x += STEP) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += STEP) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── Animation loop ────────────────────────────────────────────
  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    drawLines();
    nodes.forEach(n => { n.update(); n.draw(); });
    animFrame = requestAnimationFrame(animate);
  }

  // ── Setup ─────────────────────────────────────────────────────
  resize();
  initNodes();
  animate();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animFrame);
      resize();
      initNodes();
      animate();
    }, 200);
  });
}


/* ----------------------------------------------------------------
   04. TYPED TEXT ANIMATION
   Cycles through an array of title strings with a typewriter effect
---------------------------------------------------------------- */
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Cybersecurity Enthusiast',
    'SOC Analyst (Aspiring)',
    'Threat Hunter',
    'Blue Team Defender',
    'Malware Analyst',
    'CSE Student',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPE_SPEED   = 70;   // ms per character (typing)
  const DELETE_SPEED = 35;   // ms per character (deleting)
  const PAUSE_AFTER  = 2000; // ms to wait after fully typed
  const PAUSE_BEFORE = 400;  // ms to wait before typing next

  function tick() {
    const current = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      setTimeout(tick, isDeleting ? PAUSE_BEFORE : PAUSE_AFTER);
      return;
    }

    if (!isDeleting) {
      // Typing
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        // Finished typing — pause before deleting
        isDeleting = true;
        isPaused   = true;
      }
    } else {
      // Deleting
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting  = false;
        isPaused    = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  setTimeout(tick, 800); // initial delay
}


/* ----------------------------------------------------------------
   05. SCROLL REVEAL
   Uses IntersectionObserver to add `.in-view` when elements
   with `.reveal` class enter the viewport
---------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Trigger skill/cert bar fill when visible
          triggerBarsInElement(entry.target);
          observer.unobserve(entry.target); // only animate once
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));

  // Also observe non-.reveal containers that hold bars
  // (in case they're inside a non-reveal wrapper)
  const barContainers = document.querySelectorAll('.skill-category, .cert-card');
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerBarsInElement(entry.target);
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  barContainers.forEach(el => barObserver.observe(el));
}


/* ----------------------------------------------------------------
   06. SKILL BAR ANIMATIONS
   Reads data-width attribute and sets the CSS width
---------------------------------------------------------------- */
function triggerBarsInElement(container) {
  // Skill bars
  container.querySelectorAll('.skill-fill[data-width]').forEach(bar => {
    const target = bar.getAttribute('data-width');
    bar.style.width = target + '%';
  });
  // Cert bars
  container.querySelectorAll('.cert-fill[data-width]').forEach(bar => {
    const target = bar.getAttribute('data-width');
    bar.style.width = target + '%';
  });
}

// Also trigger when parent sections come into view
function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  const certsSection  = document.getElementById('certifications');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerBarsInElement(entry.target);
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  if (skillsSection) sectionObserver.observe(skillsSection);
  if (certsSection)  sectionObserver.observe(certsSection);
}


/* ----------------------------------------------------------------
   07. COUNTER / STAT ANIMATIONS
   Counts up from 0 to target value when hero stats are visible
---------------------------------------------------------------- */
function initCounters() {
  const stats = document.querySelectorAll('.stat-num[data-target]');
  if (!stats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1500; // ms
  const steps    = 40;
  const increment = target / steps;
  let current    = 0;
  let step       = 0;

  const interval = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = current;
    if (current >= target) clearInterval(interval);
  }, duration / steps);
}


/* ----------------------------------------------------------------
   08. PROJECT FILTERING
   Filters the project grid by category tag using data-category
---------------------------------------------------------------- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show / hide cards with smooth transition
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;

        if (shouldShow) {
          // Remove hidden — use requestAnimationFrame to allow CSS transition
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity   = '';
              card.style.transform = '';
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });
          });
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


/* ----------------------------------------------------------------
   09. BACK-TO-TOP BUTTON
---------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ----------------------------------------------------------------
   10. SMOOTH SCROLL
   Handles all anchor links smoothly with offset for fixed navbar
---------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navH   = parseInt(getComputedStyle(document.documentElement)
                              .getPropertyValue('--nav-h'), 10) || 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ----------------------------------------------------------------
   11. TERMINAL CURSOR TYPING in About section (optional flair)
   Adds a blinking underscore after the last line of the terminal
---------------------------------------------------------------- */
function initTerminalFlair() {
  // Nothing extra needed — CSS handles the cursor blink in hero.
  // Add additional terminal effects here if desired.
}


/* ----------------------------------------------------------------
   12. INIT — Run everything on DOMContentLoaded
---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initHeroCanvas();
  initTypedText();
  initScrollReveal();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initBackToTop();
  initSmoothScroll();
  initTerminalFlair();

  // Trigger reveal for any elements already in view on load
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('in-view');
        triggerBarsInElement(el);
      }
    });
  }, 300);
});
