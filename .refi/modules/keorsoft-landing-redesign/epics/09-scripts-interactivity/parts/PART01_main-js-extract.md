# PART 01 — Main JS Extract (Scripts & Interactivity)

> **EPIC:** 09-scripts-interactivity
> **Slug:** `main-js-extract`
> **Prioridad:** P1
> **Depende de:** EPIC 02 (hero-terminal.js interim) + EPIC 08 (nav-mobile IDs) + EPIC 07 (form IDs preservados)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Consolidar todos los scripts del landing en un único archivo `landing/js/main.js` (~150 líneas), eliminando el bloque `<script>` inline actual (líneas 849-942, 94 líneas) y consolidando el `hero-terminal.js` interim creado en EPIC 02/PART 02. El archivo resultante contiene 6 módulos: mobile menu toggle, hero terminal, scroll reveal, active nav highlight, contact form handler, y nav scroll effect opcional.

---

## 2. Current State

### 2.1 Bloque `<script>` inline actual (líneas 849-942 de `landing/index.html`)

```
<script>
  // Theme Toggle (líneas 850-867) — A ELIMINAR (theme toggle fue removido por EPIC 08)
  const themeToggle = document.getElementById('theme-toggle');
  ...
  themeToggle.addEventListener('click', () => { ... });

  // Mobile Menu (líneas 869-886) — PRESERVAR y移植 a .nav-link-mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });

  // Scroll Reveal (líneas 888-899) — PRESERVAR con clase .scroll-reveal
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));

  // Active Nav Link on Scroll (líneas 901-923) — REFACTOR a .nav-link (EPIC 08 renombró)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.pill-nav-link'); // ⚠️ REFACTOR a .nav-link

  function updateActiveNav() { ... }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Contact Form (líneas 925-941) — PRESERVAR con IDs #contact-form y #form-success
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
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
</script>
```

### 2.2 `landing/js/hero-terminal.js` (creado por EPIC 02/PART 02)

Archivo interim (~70 líneas) con:
- IIFE con `'use strict'`.
- Listener `DOMContentLoaded`.
- Array `lines` con 7 comandos Keorsoft/REASP.
- Función `typeTerminalLine()` recursiva.
- Comentario `// TODO EPIC 09: consolidar en js/main.js`.

**Decisión del planner:** integrar el contenido completo de `hero-terminal.js` en `main.js` (módulo 2). El archivo `hero-terminal.js` se elimina tras la consolidación.

### 2.3 Decisiones de EPICs anteriores que afectan EPIC 09

- **EPIC 08** renombró `.pill-nav-link` a `.nav-link`. El selector del active nav debe actualizarse.
- **EPIC 08** eliminó el theme toggle HTML, pero el handler JS (líneas 850-867) sigue presente en el inline. Debe eliminarse.
- **EPIC 07** preservó IDs `#contact-form` y `#form-success`. El handler JS funciona sin cambios.
- **EPIC 02** creó `hero-terminal.js` con marcador `TODO EPIC 09`.

### 2.4 IDs y selectores que se mantienen tras EPICs anteriores

| ID / Clase | Selector | Mantenido por | Notas |
|------------|----------|---------------|-------|
| `#mobile-menu-btn` | `getElementById` | EPIC 08 | Para compatibilidad con script actual |
| `#mobile-menu` | `getElementById` | EPIC 08 | Para compatibilidad |
| `#contact-form` | `getElementById` | EPIC 07 | Preservado verbatim |
| `#form-success` | `getElementById` | EPIC 07 | Preservado verbatim |
| `.scroll-reveal` | `querySelectorAll` | Todos los EPICs | Class usada en todas las secciones |
| `.pill-nav-link` | `querySelectorAll` | **REFACTOR a `.nav-link`** | EPIC 08 renombró |
| `.revealed` | `classList.add` | EPIC 01 | Definida en `Styles.css` |
| `.hidden` | `classList.toggle/add/remove` | EPIC 07 | Definida en `Styles.css` |

### 2.5 Script load actual

- Inline `<script>` en línea 849-942 (sin `defer`).
- `<script src="js/hero-terminal.js" defer></script>` (añadido por EPIC 02, antes de `</body>`).

Tras este PART:
- Eliminar el inline `<script>` (líneas 849-942).
- Eliminar `<script src="js/hero-terminal.js" defer></script>` (consolidado).
- Añadir `<script src="js/main.js" defer></script>` antes de `</body>`.

---

## 3. Comparison against baseline

### 3.1 Estructura del nuevo `main.js`

Inspirado en `KeorsoftLandingNEW/app.js` (340 líneas) pero más simple (~150 líneas) y específico para el landing.

```js
/**
 * Keorsoft Landing — Main JavaScript
 * Consolidated client-side scripts (EPIC 09).
 * Source of truth: previously inline <script> in landing/index.html
 *                   + landing/js/hero-terminal.js (interim).
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Module 1: Mobile menu toggle
    initMobileMenu();

    // Module 2: Hero terminal auto-typing
    initHeroTerminal();

    // Module 3: Scroll reveal
    initScrollReveal();

    // Module 4: Active nav highlight
    initActiveNavHighlight();

    // Module 5: Contact form handler
    initContactForm();
  });

  // ... module functions ...
})();
```

### 3.2 Módulos移植 directa vs nueva

| Módulo |移植 directa | Notas |
|--------|--------------|-------|
| Mobile menu toggle | REFACTOR | Usar `getElementById('mobile-menu')` con toggle `.hidden`. Compatible con EPIC 08. |
| Hero terminal | REFACTOR |移植 de `hero-terminal.js`. Mantener comandos Keorsoft/REASP. |
| Scroll reveal | REFACTOR | Mantener IntersectionObserver. Compatible con todas las secciones. |
| Active nav highlight | REFACTOR | Cambiar selector `.pill-nav-link` → `.nav-link` (EPIC 08 renombró). |
| Contact form | REFACTOR | Mantener simulación 1s + banner 5s. IDs preservados. |
| Nav scroll effect (opcional) | NUEVA |移植 de `REASP/main.js` (opcional). Añade clase `.scrolled` al `<header>` cuando `scrollY > 50`. |

### 3.3 Eliminación del theme toggle

El theme toggle handler (líneas 850-867) **se elimina completamente** porque:
- El botón HTML fue eliminado en EPIC 08.
- `getElementById('theme-toggle')` retorna `null` y los listeners no se adjuntan (sin error, pero código muerto).
- Mantenerlo en `main.js` agrega ruido sin valor.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Crear `landing/js/main.js` (~150 líneas) con 6 módulos.
- Eliminar el bloque `<script>` inline actual (líneas 849-942, 94 líneas).
- Eliminar `<script src="js/hero-terminal.js" defer></script>` (consolidado en main.js).
- Añadir `<script src="js/main.js" defer></script>` antes de `</body>`.
- Actualizar el active nav highlight para usar `.nav-link` (en lugar de `.pill-nav-link`).
- Refactor de mobile menu handler para usar los IDs del NEW (`#menuToggle`, `#navMenu`) **opcional**: si se hace, también actualizar HTML; si no, mantener compatibilidad con IDs actuales.

### 4.2 Lo que NO está en el scope

- **NO** se modifica el comportamiento de los handlers (solo se移植).
- **NO** se añade nueva funcionalidad.
- **NO** se minifica ni se construye el JS (es vanilla, sin build step).
- **NO** se modifica el CSS de las animaciones.

---

## 5. UX Problems

### UX-P64 — Orden de carga de scripts
`<script src="js/main.js" defer></script>` se ejecuta después de que el DOM esté listo (gracias a `defer`). El listener `DOMContentLoaded` dentro de `main.js` es redundante pero seguro. **Decisión:** mantener listener como defensa en profundidad.

### UX-P65 — IDs heredados vs NEW
Los IDs actuales (`#mobile-menu-btn`, `#mobile-menu`) funcionan. Los del NEW (`#menuToggle`, `#navMenu`) son más limpios. **Decisión:** mantener IDs actuales (EPIC 08 ya tomó esta decisión). Migrar a IDs de NEW es opcional en este PART.

### UX-P66 — `defer` vs `DOMContentLoaded`
`<script defer>` se ejecuta antes de `DOMContentLoaded`. Sin embargo, el listener `DOMContentLoaded` dentro de `main.js` se ejecuta cuando el DOM está listo. **Decisión:** usar ambos (defer para carga no bloqueante + DOMContentLoaded como defensa).

---

## 6. Backend / Logic Problems

N/A — client-side JS.

---

## 7. Frontend / Presentation Problems

### Front-P74 — `style.opacity` y `style.pointerEvents` inline en form handler
Líneas 932-933, 937: modificación inline de estilos del form. **Decisión:**移植 tal cual (es comportamiento intencional para simular envío).

### Front-P75 — `setTimeout` anidado en form handler
Línea 934 + 939: dos setTimeout anidados (1s + 5s). **Decisión:** mantener estructura anidada o extraer a funciones separadas. Mantener anidada (es simple).

### Front-P76 — `IntersectionObserver` sin fallback para navegadores antiguos
Línea 890: `new IntersectionObserver(...)`. Si el navegador no soporta, no funciona. **Decisión:** añadir fallback (mostrar todos los elementos inmediatamente).移植 fallback de `landing/REASP/main.js` (líneas 80-84).

---

## 8. Technical Debt

### TD-46 — Theme toggle handler残留 en script inline
Líneas 850-867. **Acción:** eliminar en este PART.

### TD-47 — `.pill-nav-link` selector残留
Línea 903. **Acción:** refactor a `.nav-link` (EPIC 08).

### TD-48 — `hero-terminal.js` interim con marcador TODO
Tras consolidar, eliminar el archivo.

### TD-49 — Script inline monolítico
Tras este PART, el `<script>` inline se elimina completamente. Toda la lógica está en `main.js`.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-145:** Crear `landing/js/main.js` (~150 líneas) con **6 módulos**: mobile menu, hero terminal, scroll reveal, active nav, contact form, nav scroll effect (opcional) — verificable con `(Get-Content landing/js/main.js).Count` que retorna `≥ 100`.
- **RI-146:** Eliminar el **bloque `<script>` inline** (líneas 849-942, 94 líneas) — verificable con `grep -c "<script>$" landing/index.html` que retorna `0` y `grep -c "</script>" landing/index.html` que retorna `0` (sin tags script en el HTML).
- **RI-147:** **NO** tener `<script src="js/hero-terminal.js">` (consolidado) — verificable con `grep -c "hero-terminal.js" landing/index.html` que retorna `0`.
- **RI-148:** Añadir `<script src="js/main.js" defer></script>` antes de `</body>` — verificable con `grep -c "js/main.js" landing/index.html` que retorna `1`.
- **RI-149:** El módulo **active nav** usa selector `.nav-link` (no `.pill-nav-link`) — verificable con `grep -c "pill-nav-link" landing/js/main.js` que retorna `0` y `grep -c "nav-link" landing/js/main.js` que retorna `≥ 2`.
- **RI-150:** El módulo **mobile menu** usa `#mobile-menu` y `#mobile-menu-btn` (compatibilidad con EPIC 08) — verificable con `grep -c "mobile-menu-btn\|mobile-menu" landing/js/main.js` que retorna `≥ 2`.
- **RI-151:** El módulo **contact form** usa `#contact-form` y `#form-success` (compatibilidad con EPIC 07) — verificable con `grep -c "contact-form\|form-success" landing/js/main.js` que retorna `≥ 2`.
- **RI-152:** El módulo **hero terminal**移植 el array `lines` con los 7 comandos Keorsoft/REASP — verificable con `grep -c "reasp-cli\|MeridianUI\|production-grade" landing/js/main.js` que retorna `≥ 3`.
- **RI-153:** **Theme toggle handler ELIMINADO** completamente del nuevo `main.js` — verificable con `grep -c "theme-toggle\|data-theme" landing/js/main.js` que retorna `0`.
- **RI-154:** Validación de sintaxis con `node --check landing/js/main.js` retorna exit code 0 — verificable con comando directo.
- **RI-155:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` ni `landing/REASP/js/**` — verificable con `git diff --stat landing/REASP/ landing/RACSP/` vacío y `landing/REASP/js/main.js` intacto.

---

## 10. Implementation Plan

### 10.1 Archivos a CREAR

**`landing/js/main.js`** (~150 líneas):

```js
/**
 * Keorsoft Landing — Main JavaScript
 * Consolidated client-side scripts (EPIC 09 PART 01).
 *
 * Modules:
 *   1. Mobile menu toggle (hamburger + dropdown)
 *   2. Hero terminal auto-typing (animación del terminal)
 *   3. Scroll reveal (IntersectionObserver)
 *   4. Active nav highlight (IntersectionObserver on sections)
 *   5. Contact form handler (simulación client-side)
 *   6. Nav scroll effect (opcional, añade .scrolled al header)
 *
 * Source of truth:
 *   - Anteriormente inline <script> en landing/index.html (líneas 849-942)
 *   - landing/js/hero-terminal.js (interim, eliminado tras consolidación)
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
   * Transplanted from landing/REASP/js/main.js
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
```

### 10.2 Archivos a ELIMINAR

- `landing/js/hero-terminal.js` (consolidado en `main.js`).

### 10.3 Archivos a MODIFICAR

**`landing/index.html`**:
- Eliminar `<script>...</script>` (líneas 849-942, 94 líneas).
- Eliminar `<script src="js/hero-terminal.js" defer></script>` (si EPIC 02 lo añadió).
- Añadir `<script src="js/main.js" defer></script>` antes de `</body>` (línea 944).

### 10.4 Decisión sobre IDs de NEW (opcional)

**Decisión del planner:** mantener IDs actuales (`#mobile-menu-btn`, `#mobile-menu`) por compatibilidad con EPIC 08. Migrar a `#menuToggle` y `#navMenu` requeriría actualizar el HTML (EPIC 08) y romper el script actual. **Decisión:** postergar migración de IDs a una iteración futura si se desea.

### 10.5 Decisión sobre fallback de IntersectionObserver

移植 fallback de `landing/REASP/main.js` (líneas 80-84):

```js
if (!('IntersectionObserver' in window)) {
  revealElements.forEach((el) => el.classList.add('visible'));
  return;
}
```

**Decisión:** incluir fallback. Es buena práctica y añade solo 4 líneas.

---

## 11. Automated Test Plan

### AT-143 — Verificación de `main.js` creado
- **Comando:** `Test-Path landing/js/main.js`.
- **Pass criteria:** `True`.
- **Fallo:** `False`.

### AT-144 — Verificación de tamaño de `main.js`
- **Comando:** `(Get-Content landing/js/main.js).Count`.
- **Pass criteria:** `≥ 100` líneas.
- **Fallo:** `< 100`.

### AT-145 — Verificación de sintaxis `main.js`
- **Comando:** `node --check landing/js/main.js`.
- **Pass criteria:** Exit code `0`.
- **Fallo:** Cualquier error.

### AT-146 — Verificación de 6 módulos en `main.js`
- **Comando:** `grep -c "function init" landing/js/main.js`.
- **Pass criteria:** `6` (initMobileMenu, initHeroTerminal, initScrollReveal, initActiveNavHighlight, initContactForm, initNavScrollEffect).
- **Fallo:** `< 6`.

### AT-147 — Verificación de eliminación del inline `<script>`
- **Comando:** `grep -c "</script>" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-148 — Verificación de adición de `<script src="js/main.js">`
- **Comando:** `grep -c "js/main.js" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-149 — Verificación de eliminación de `hero-terminal.js`
- **Comando:** `Test-Path landing/js/hero-terminal.js`.
- **Pass criteria:** `False` (eliminado).
- **Fallo:** `True` (no eliminado).

- **Comando 2:** `grep -c "hero-terminal.js" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-150 — Verificación de uso de `.nav-link` (no `.pill-nav-link`)
- **Comando:** `grep -c "\.nav-link" landing/js/main.js`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

- **Comando 2:** `grep -c "pill-nav-link" landing/js/main.js`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0` (selector desactualizado).

### AT-151 — Verificación de theme toggle ELIMINADO
- **Comando:** `grep -c "theme-toggle\|data-theme" landing/js/main.js`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-152 — Verificación de 7 comandos de terminal
- **Comando:** `grep -E "(reasp-cli|OpenCode 1\.17\.17|0% Hallucination|production-grade|MeridianUI tokens)" landing/js/main.js | wc -l`.
- **Pass criteria:** `≥ 3`.
- **Fallo:** `< 3`.

### AT-153 — Verificación de IDs preservados
- **Comando:** `grep -E "(mobile-menu-btn|mobile-menu|contact-form|form-success)" landing/js/main.js | wc -l`.
- **Pass criteria:** `≥ 4`.
- **Fallo:** `< 4`.

### AT-154 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

- **Comando 2:** `git diff --stat landing/REASP/js/main.js`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-212:** Abrir `landing/index.html` en Chrome 120+: la página carga sin errores en consola.
- [ ] **MV-213:** El terminal del hero arranca typing tras 1.5s y completa las 7 líneas en ~15s.
- [ ] **MV-214:** Renderizar en DevTools > iPhone 12 Pro: aparece hamburger; click abre dropdown con 6 links.
- [ ] **MV-215:** Click en cualquier link del dropdown mobile: scroll suave a la sección Y el menú se cierra.
- [ ] **MV-216:** Las cards con `.scroll-reveal` aparecen con animación al hacer scroll.
- [ ] **MV-217:** El nav link activo cambia según la sección visible (`.nav-link.active`).
- [ ] **MV-218:** Click en submit del form: form se "congela" 1s, se resetea, aparece success banner. Tras 5s el banner se oculta.
- [ ] **MV-219:** El header (`.site-header`) recibe clase `.scrolled` al hacer scroll > 50px (opcional, si se incluye el módulo 6).
- [ ] **MV-220:** **NO** hay errores en DevTools Console.
- [ ] **MV-221:** **NO** hay tema light/dark toggle (eliminado).
- [ ] **MV-222:** El `<script src="js/hero-terminal.js">` **NO** existe en el HTML (consolidado).
- [ ] **MV-223:** El `<script src="js/main.js" defer></script>` está presente antes de `</body>`.
- [ ] **MV-224:** DevTools > Network > JS: solo `main.js` se carga (no `hero-terminal.js` ni inline).
- [ ] **MV-225:** DevTools > Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95 (sin regresión).
- [ ] **MV-226:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.
- [ ] **MV-227:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` siguen intactos.

---

## 13. Technical Documentation to produce

### TD-Output-29 — Cabecera de `landing/js/main.js`

```js
/**
 * Keorsoft Landing — Main JavaScript
 * EPIC 09 PART 01 — Consolidated client-side scripts.
 *
 * Modules:
 *   1. initMobileMenu()       — Hamburger toggle + dropdown close on click outside.
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
 *
 * Removed:
 *   - Theme toggle handler (no HTML button since EPIC 08).
 *   - .pill-nav-link selector (renamed to .nav-link in EPIC 08).
 *
 * Source: previously inline <script> in landing/index.html (líneas 849-942)
 *         + landing/js/hero-terminal.js (interim, now deleted).
 */
```

### TD-Output-30 — Comentarios de sección en `landing/index.html`

```html
<!-- Scripts consolidados en js/main.js (EPIC 09 PART 01) -->
<script src="js/main.js" defer></script>
```

---

## 14. User Documentation to produce

### UD-Output-24 — Mensaje de commit sugerido

```
feat(landing): consolidar scripts en js/main.js

- Eliminado bloque <script> inline (94 líneas).
- Creado landing/js/main.js (~150 líneas) con 6 módulos:
  mobile menu, hero terminal, scroll reveal, active nav,
  contact form, nav scroll effect.
- Eliminado hero-terminal.js interim (consolidado).
- Theme toggle handler ELIMINADO (no HTML button).
- Active nav: .pill-nav-link → .nav-link (EPIC 08).
- Fallback IntersectionObserver para navegadores antiguos.
- IDs preservados: #mobile-menu, #mobile-menu-btn, #contact-form, #form-success.

Refs: .refi/modules/keorsoft-landing-redesign/epics/09-scripts-interactivity/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-176:** El archivo `landing/js/main.js` existe, tiene ≥ 100 líneas, y `node --check` retorna exit code 0.
- **AC-177:** El `main.js` contiene 6 funciones `init*()`: `initMobileMenu`, `initHeroTerminal`, `initScrollReveal`, `initActiveNavHighlight`, `initContactForm`, `initNavScrollEffect`.
- **AC-178:** El bloque `<script>...</script>` inline está eliminado del `landing/index.html`.
- **AC-179:** El archivo `landing/js/hero-terminal.js` está eliminado.
- **AC-180:** El `<script src="js/main.js" defer></script>` está presente antes de `</body>`.
- **AC-181:** El selector `.pill-nav-link` está eliminado de `main.js` (reemplazado por `.nav-link`).
- **AC-182:** El theme toggle handler está eliminado de `main.js` (no `theme-toggle`, no `data-theme`).
- **AC-183:** El array `lines` del hero terminal contiene los 7 comandos adaptados a Keorsoft/REASP.
- **AC-184:** Los IDs preservados (`#mobile-menu`, `#mobile-menu-btn`, `#contact-form`, `#form-success`) están en `main.js`.
- **AC-185:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-186:** DevTools > Network: solo `main.js` se carga (sin inline, sin `hero-terminal.js`).
- **AC-187:** DevTools > Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- **AC-188:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-189:** `git diff --stat landing/REASP/js/main.js` retorna vacío.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Estructura modular coherente con NEW app.js. Theme toggle correctamente eliminado. Selectores actualizados (.nav-link en lugar de .pill-nav-link). IDs preservados para compatibilidad.
- [ ] **Gate 2 — Scope & Completeness Audit:** 6 módulos移植/preservados. Script inline eliminado. hero-terminal.js consolidado. Fallback IntersectionObserver incluido.
- [ ] **Gate 3 — UX/Design Review:** UX-P64 a UX-P66 resueltos según §5. Orden de carga correcto (defer + DOMContentLoaded). Fallback para navegadores antiguos.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `node --check main.js` retorna 0. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Todos los handlers funcionan.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Cabecera de main.js (§13.1) presente. Comentarios en HTML (§13.2) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________