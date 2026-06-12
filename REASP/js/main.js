/**
  * REASP Website — Main JavaScript
  * Ryou Enterprise Adaptive SDD Protocol v3.0.0
 * Keorsoft 2026
 */

(function() {
  'use strict';

  // ─── Mobile Menu ───
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('ph-list');
        icon.classList.toggle('ph-x');
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('ph-list');
          icon.classList.remove('ph-x');
        }
      });
    });
  }

  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ─── Scroll Reveal (IntersectionObserver) ───
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optionally unobserve after reveal
          // revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all immediately if IntersectionObserver not supported
    revealElements.forEach(function(el) {
      el.classList.add('visible');
    });
  }

  // ─── Active Section Highlighting (index.html) ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0 && 'IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // ─── Code Copy Buttons ───
  function initCodeCopy() {
    document.querySelectorAll('.code-copy').forEach(function(button) {
      button.addEventListener('click', function() {
        const textToCopy = button.getAttribute('data-copy');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(function() {
          const originalHTML = button.innerHTML;
          button.classList.add('copied');
          button.innerHTML = '<i class="ph ph-check"></i> Copiado';

          setTimeout(function() {
            button.classList.remove('copied');
            button.innerHTML = originalHTML;
          }, 2000);
        }).catch(function(err) {
          console.error('Error al copiar:', err);
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = textToCopy;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            const originalHTML = button.innerHTML;
            button.classList.add('copied');
            button.innerHTML = '<i class="ph ph-check"></i> Copiado';
            setTimeout(function() {
              button.classList.remove('copied');
              button.innerHTML = originalHTML;
            }, 2000);
          } catch (e) {
            console.error('Fallback copy failed:', e);
          }
          document.body.removeChild(textarea);
        });
      });
    });
  }

  // Initialize code copy on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopy);
  } else {
    initCodeCopy();
  }

  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ─── Keyboard Accessibility ───
  document.addEventListener('keydown', function(e) {
    // Escape closes mobile menu
    if (e.key === 'Escape') {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;
        if (icon) {
          icon.classList.add('ph-list');
          icon.classList.remove('ph-x');
        }
      }
    }
  });

})();
