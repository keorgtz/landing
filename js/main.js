/**
 * Keorsoft Landing — Main JavaScript
 * EPIC 09 PART 01 — Consolidated client-side scripts.
 *
 * Modules:
 *   1. initMobileMenu()       — Hamburger toggle + dropdown close on outside click.
 *   2. initHeroTerminal()     — Auto-typing animation (7 comandos Keorsoft/REASP).
 *   3. initScrollReveal()     — IntersectionObserver for .scroll-reveal cards.
 *   4. initActiveNavHighlight() — Active .nav-link based on scroll position.
 *   5. initContactForm()      — Simulated submit + success banner (5s auto-hide).
 *   6. initNavScrollEffect()  — Optional .scrolled class on header (scroll > 50px).
 *
 * Dependencies:
 *   - #mobile-menu, #mobile-menu-btn (EPIC 08)
 *   - #contact-form, #form-success (EPIC 07)
 *   - #termContent (EPIC 02)
 *   - .scroll-reveal, .nav-link, .site-header, .hidden, .revealed (CSS classes)
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeroTerminal();
    initScrollReveal();
    initActiveNavHighlight();
    initContactForm();
    initNavScrollEffect();
  });

  /* ============================
   * Module 1: Mobile Menu Toggle
   * ============================ */
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  /* ============================
   * Module 2: Hero Terminal Auto-typing
   * Transplanted from landing/js/hero-terminal.js
   * ============================ */
  function initHeroTerminal() {
    const termContent = document.getElementById('termContent');
    if (!termContent) return;

    const lines = [
      { type: 'cmd', text: 'npm install -g reasp-cli' },
      { type: 'resp', text: 'Initializing Ryou Enterprise Adaptive SDD Protocol (Reasp)...', class: 'highlight' },
      { type: 'resp', text: '✔ Connected to OpenCode 1.17.17' },
      { type: 'resp', text: '✔ Shielding modules deployed (0% Hallucination threshold active)' },
      { type: 'cmd', text: 'reasp run build-architecture' },
      { type: 'resp', text: 'Analyzing requirements: Enterprise CRM + MeridianUI tokens + Secure Infrastructure design...' },
      { type: 'resp', text: '✔ Generated 24 microservices with zero hallucinated components', class: 'success' }
    ];

    let lineIndex = 0;
    function typeTerminalLine() {
      if (lineIndex < lines.length) {
        const lineData = lines[lineIndex];
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';

        if (lineData.type === 'cmd') {
          lineDiv.innerHTML = '<span class="term-prompt">$</span><span class="term-cmd"></span>';
          termContent.appendChild(lineDiv);
          const cmdSpan = lineDiv.querySelector('.term-cmd');
          let charIndex = 0;

          function typeChar() {
            if (charIndex < lineData.text.length) {
              cmdSpan.textContent += lineData.text[charIndex];
              charIndex++;
              setTimeout(typeChar, 40);
            } else {
              lineIndex++;
              setTimeout(typeTerminalLine, 800);
            }
          }
          typeChar();
        } else {
          lineDiv.innerHTML = `<span class="term-resp ${lineData.class || ''}">${lineData.text}</span>`;
          termContent.appendChild(lineDiv);
          termContent.scrollTop = termContent.scrollHeight;
          lineIndex++;
          setTimeout(typeTerminalLine, 1000);
        }
      }
    }
    setTimeout(typeTerminalLine, 1500);
  }

  /* ============================
   * Module 3: Scroll Reveal
   * ============================ */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ============================
   * Module 4: Active Nav Highlight
   * ============================ */
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
      const scrollPos = window.scrollY + 150;
      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
  }

  /* ============================
   * Module 5: Contact Form Handler
   * ============================ */
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    if (!contactForm || !formSuccess) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.opacity = '0.5';
      contactForm.style.pointerEvents = 'none';
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.opacity = '1';
        contactForm.style.pointerEvents = 'auto';
        formSuccess.classList.remove('hidden');
        setTimeout(() => formSuccess.classList.add('hidden'), 5000);
      }, 1000);
    });
  }

  /* ============================
   * Module 6: Nav Scroll Effect (opcional)
   * ============================ */
  function initNavScrollEffect() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    function handleScroll() {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
})();
