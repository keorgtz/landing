/**
  * REASP Website — Docs-specific JavaScript
  * Ryou Enterprise Adaptive SDD Protocol v3.0.0
 * Keorsoft 2026
 */

(function() {
  'use strict';

  // ─── Elements ───
  const docsSidebar = document.getElementById('docsSidebar');
  const docsMain = document.getElementById('docsMain');
  const docsSearch = document.getElementById('docsSearch');
  const docsNav = document.getElementById('docsNav');
  const docsMobileToggle = document.getElementById('docsMobileToggle');

  if (!docsSidebar || !docsMain) return; // Not on docs page

  // ─── Mobile Sidebar Toggle ───
  if (docsMobileToggle) {
    docsMobileToggle.addEventListener('click', function() {
      docsSidebar.classList.toggle('open');
      const icon = docsMobileToggle.querySelector('i');
      if (icon) {
        if (docsSidebar.classList.contains('open')) {
          icon.classList.remove('ph-list');
          icon.classList.add('ph-x');
        } else {
          icon.classList.remove('ph-x');
          icon.classList.add('ph-list');
        }
      }
    });

    // Close sidebar when clicking a link on mobile
    docsSidebar.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          docsSidebar.classList.remove('open');
          const icon = docsMobileToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
          }
        }
      });
    });
  }

  // ─── Sidebar Search ───
  if (docsSearch && docsNav) {
    const allNavItems = docsNav.querySelectorAll('.docs-nav-items a');
    const allNavSections = docsNav.querySelectorAll('.docs-nav-section');

    docsSearch.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();

      if (!query) {
        // Show everything
        allNavSections.forEach(function(section) {
          section.style.display = '';
        });
        allNavItems.forEach(function(item) {
          item.style.display = '';
        });
        return;
      }

      allNavSections.forEach(function(section) {
        const items = section.querySelectorAll('.docs-nav-items a');
        let hasVisible = false;

        items.forEach(function(item) {
          const text = item.textContent.toLowerCase();
          if (text.includes(query)) {
            item.style.display = '';
            hasVisible = true;
          } else {
            item.style.display = 'none';
          }
        });

        section.style.display = hasVisible ? '' : 'none';
      });
    });

    // Clear search on Escape
    docsSearch.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        this.value = '';
        this.dispatchEvent(new Event('input'));
        this.blur();
      }
    });
  }

  // ─── Active Section Highlighting on Scroll ───
  const docSections = docsMain.querySelectorAll('.docs-section[id]');
  const sidebarLinks = docsSidebar.querySelectorAll('.docs-nav-items a[href^="#"]');

  function updateActiveSection() {
    if (!docSections.length || !sidebarLinks.length) return;

    const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 72;
    const scrollPos = window.pageYOffset + navHeight + 100;

    let currentSection = null;

    docSections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      if (scrollPos >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    sidebarLinks.forEach(function(link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');

        // Scroll sidebar to keep active item visible
        const linkRect = link.getBoundingClientRect();
        const sidebarRect = docsSidebar.getBoundingClientRect();

        if (linkRect.top < sidebarRect.top + 100 || linkRect.bottom > sidebarRect.bottom - 100) {
          link.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // Throttled scroll handler
  let scrollTimeout = null;
  window.addEventListener('scroll', function() {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(function() {
      updateActiveSection();
      scrollTimeout = null;
    }, 100);
  }, { passive: true });

  // Initial call
  updateActiveSection();

  // ─── Smooth Scroll for Sidebar Links ───
  sidebarLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar') ? document.getElementById('navbar').offsetHeight : 72;
        const targetPosition = target.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Update active immediately for better UX
        sidebarLinks.forEach(function(l) { l.classList.remove('active'); });
        this.classList.add('active');
      }
    });
  });

  // ─── Code Copy Buttons (Docs-specific enhancement) ───
  function initDocsCodeCopy() {
    docsMain.querySelectorAll('.code-block').forEach(function(block) {
      // Skip if already has a copy button with data-copy
      const existingBtn = block.querySelector('.code-copy[data-copy]');
      if (existingBtn) return;

      const pre = block.querySelector('pre');
      const header = block.querySelector('.code-header');
      if (!pre || !header) return;

      // Create copy button for blocks without explicit data-copy
      const codeText = pre.textContent;
      const btn = document.createElement('button');
      btn.className = 'code-copy';
      btn.innerHTML = '<i class="ph ph-copy"></i> Copiar';
      btn.setAttribute('data-copy', codeText);

      btn.addEventListener('click', function() {
        const textToCopy = btn.getAttribute('data-copy');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(function() {
          const originalHTML = btn.innerHTML;
          btn.classList.add('copied');
          btn.innerHTML = '<i class="ph ph-check"></i> Copiado';

          setTimeout(function() {
            btn.classList.remove('copied');
            btn.innerHTML = originalHTML;
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
            const originalHTML = btn.innerHTML;
            btn.classList.add('copied');
            btn.innerHTML = '<i class="ph ph-check"></i> Copiado';
            setTimeout(function() {
              btn.classList.remove('copied');
              btn.innerHTML = originalHTML;
            }, 2000);
          } catch (e) {
            console.error('Fallback copy failed:', e);
          }
          document.body.removeChild(textarea);
        });
      });

      header.appendChild(btn);
    });
  }

  // Initialize docs code copy on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocsCodeCopy);
  } else {
    initDocsCodeCopy();
  }

  // ─── Keyboard Shortcuts ───
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (docsSearch) {
        docsSearch.focus();
        docsSearch.select();
      }
    }

    // Escape closes mobile sidebar
    if (e.key === 'Escape') {
      if (docsSidebar && docsSidebar.classList.contains('open')) {
        docsSidebar.classList.remove('open');
        const icon = docsMobileToggle ? docsMobileToggle.querySelector('i') : null;
        if (icon) {
          icon.classList.remove('ph-x');
          icon.classList.add('ph-list');
        }
      }
    }
  });

  // ─── Print-friendly: expand all sections ───
  window.addEventListener('beforeprint', function() {
    docSections.forEach(function(section) {
      section.style.display = 'block';
    });
  });

})();
