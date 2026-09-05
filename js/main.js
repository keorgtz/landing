/** Homepage interactions. No framework or runtime dependencies. */
(function () {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let motionPaused = reducedMotion.matches;

  initTheme();
  initMobileMenu();
  initMotion();
  initHeroTerminal();
  initScrollReveal();
  initExperienceTabs();
  initNavigation();
  initContactForm();

  function initTheme() {
    const button = document.getElementById('themeToggle');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)');
    let explicitPreference = false;
    try {
      explicitPreference = ['light', 'dark'].includes(localStorage.getItem('keorsoft-theme'));
    } catch { /* The toggle also works without storage. */ }

    function apply(theme) {
      root.dataset.theme = theme;
      const label = theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro';
      button.setAttribute('aria-label', label);
      button.title = label;
      document.getElementById('theme-color').content = theme === 'dark' ? '#05070a' : '#f7f8fc';
    }

    apply(root.dataset.theme || (systemTheme.matches ? 'light' : 'dark'));
    button.hidden = false;
    button.addEventListener('click', () => {
      const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      explicitPreference = true;
      apply(theme);
      try { localStorage.setItem('keorsoft-theme', theme); } catch { /* Optional persistence. */ }
    });
    systemTheme.addEventListener('change', (event) => {
      if (!explicitPreference) apply(event.matches ? 'light' : 'dark');
    });
    window.addEventListener('storage', (event) => {
      if (event.key !== 'keorsoft-theme' && event.key !== null) return;
      explicitPreference = ['light', 'dark'].includes(event.newValue);
      apply(explicitPreference ? event.newValue : (systemTheme.matches ? 'light' : 'dark'));
    });
  }

  function initMobileMenu() {
    const button = document.getElementById('menuToggle');
    const menu = document.getElementById('mobile-menu');
    const desktop = window.matchMedia('(min-width: 1025px)');
    function setOpen(open, restoreFocus = false) {
      menu.classList.toggle('hidden', !open);
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      if (restoreFocus) button.focus();
    }
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('click', (event) => {
      if (!menu.contains(event.target) && !button.contains(event.target)) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') setOpen(false, true);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    desktop.addEventListener('change', (event) => { if (event.matches) setOpen(false); });
  }

  function initMotion() {
    const button = document.getElementById('motionToggle');
    const visual = document.querySelector('.hero-visual');
    function sync() {
      root.classList.toggle('motion-paused', motionPaused || document.hidden);
      button.setAttribute('aria-pressed', String(motionPaused));
      button.textContent = motionPaused ? 'Reanudar animación' : 'Pausar animación';
      // System reduced motion always takes precedence over decorative animation.
      button.hidden = reducedMotion.matches;
    }
    button.addEventListener('click', () => { motionPaused = !motionPaused; sync(); });
    reducedMotion.addEventListener('change', () => { motionPaused = reducedMotion.matches; sync(); });
    document.addEventListener('visibilitychange', sync);
    sync();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        visual.classList.toggle('scene-paused', !entry.isIntersecting);
      }).observe(visual);
    }
  }

  function initHeroTerminal() {
    const terminal = document.getElementById('termContent');
    const visual = document.querySelector('.hero-visual');
    // Illustrative workflow, not a live build or product telemetry.
    const lines = [
      ['cmd', 'idea → arquitectura → experiencia'],
      ['highlight', 'MeridianUI · interfaces con una identidad común'],
      ['', '.NET · software de escritorio, web y multiplataforma'],
      ['highlight', 'REASP · desarrollo adaptativo con IA'],
      ['', 'RACSP · colaboración entre agentes'],
      ['success', '✓ Cada pieza, conectada con un propósito.']
    ];
    let index = 0;
    let timer;
    function appendLine() {
      const [type, text] = lines[index++];
      const line = document.createElement('div');
      line.className = 'terminal-line';
      const prompt = document.createElement('span');
      prompt.className = 'term-prompt';
      prompt.textContent = type === 'cmd' ? '›' : '·';
      const content = document.createElement('span');
      content.className = type === 'cmd' ? 'term-cmd' : `term-resp ${type}`;
      content.textContent = text;
      line.append(prompt, content);
      terminal.append(line);
      while (terminal.children.length > 3) terminal.firstElementChild.remove();
    }
    function finish() {
      clearInterval(timer);
      terminal.replaceChildren();
      index = lines.length - 3;
      while (index < lines.length) appendLine();
    }
    if (reducedMotion.matches) { finish(); return; }
    terminal.replaceChildren();
    appendLine();
    timer = setInterval(() => {
      if (motionPaused || document.hidden || visual.classList.contains('scene-paused')) return;
      appendLine();
      if (index === lines.length) clearInterval(timer);
    }, 1500);
    reducedMotion.addEventListener('change', (event) => { if (event.matches) finish(); });
  }

  function initScrollReveal() {
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.scroll-reveal').forEach((element) => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
  }

  function initExperienceTabs() {
    const tabs = [...document.querySelectorAll('.experience-tab')];
    const tablist = document.querySelector('.experience-selectors');
    const horizontal = window.matchMedia('(max-width: 900px)');
    function orientation() { tablist.setAttribute('aria-orientation', horizontal.matches ? 'horizontal' : 'vertical'); }
    orientation();
    horizontal.addEventListener('change', orientation);
    function activate(tab) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', (event) => {
        let next;
        const forward = horizontal.matches ? 'ArrowRight' : 'ArrowDown';
        const backward = horizontal.matches ? 'ArrowLeft' : 'ArrowUp';
        if (event.key === forward) next = (index + 1) % tabs.length;
        if (event.key === backward) next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        activate(tabs[next]);
        tabs[next].focus();
      });
    });
  }

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const links = [...document.querySelectorAll('.nav-link, .nav-link-mobile')];
    const sections = [...document.querySelectorAll('section[id]')];
    let scheduled = false;
    function update() {
      scheduled = false;
      header.classList.toggle('scrolled', window.scrollY > 50);
      const current = sections.filter((section) => section.getBoundingClientRect().top <= header.offsetHeight + 100).pop();
      links.forEach((link) => {
        const active = current && link.hash === `#${current.id}`;
        link.classList.toggle('active', Boolean(active));
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-success');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const values = new FormData(form);
      const name = values.get('name').trim();
      const email = values.get('email').trim();
      const message = values.get('message').trim();
      for (const field of ['name', 'message']) {
        const input = form.elements.namedItem(field);
        input.setCustomValidity(values.get(field).trim() ? '' : 'Completa este campo para preparar tu mensaje.');
      }
      if (!form.reportValidity()) return;
      const text = `Hola, Keorsoft. Soy ${name}.\nCorreo: ${email}\n\n${message}`;
      const url = `https://wa.me/523327633233?text=${encodeURIComponent(text)}`;
      document.getElementById('whatsapp-fallback').href = url;
      status.classList.remove('hidden');
      // A visible link remains available if the browser blocks the new tab.
      window.open(url, '_blank', 'noopener,noreferrer');
    });
    form.addEventListener('input', (event) => {
      event.target.setCustomValidity('');
      status.classList.add('hidden');
    });
  }
})();
