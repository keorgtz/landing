# PART 02 — Hero Styles & Terminal (Hero & Stats Strip)

> **EPIC:** 02-hero-stats
> **Slug:** `hero-styles-and-terminal`
> **Prioridad:** P1
> **Depende de:** EPIC 02 PART 01 (Hero Markup)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Añadir al landing principal:
1. **El bloque CSS del hero**移植 de `KeorsoftLandingNEW/styles.css` líneas 397-603 (incluyendo `.hero`, `.hero-content`, `.hero-visual`, `.hero-visual-card`, `.terminal-content`, `.mac-buttons`, `.pulse-dot`, `@keyframes pulse`).
2. **El script del terminal auto-typing** adaptado con comandos reales de Keorsoft/REASP (basado en `KeorsoftLandingNEW/app.js` líneas 22-69).

Este PART completa el hero dejándolo visualmente funcional, listo para EPIC 03-08.

---

## 2. Current State

### 2.1 `landing/css/Styles.css` tras EPIC 01/PART 02

Estado actual del archivo (producido por EPIC 01/PART 02):
- ~200-250 líneas (estimación).
- Contiene: `:root` con 15 tokens, reset CSS, tipografía base, `.glass-panel`, background glow + grid, comentarios de sección.
- **NO contiene todavía:** bloques específicos de sección como `.hero`, `.hero-content`, `.hero-visual`, `.section-tag`, `.btn-primary`, `.hero-badges`, `.badge`, `.terminal-content`, `.mac-buttons`, `.pulse-dot`, `@keyframes pulse`.
- Las clases `.btn-primary` y `.btn-secondary` del landing actual (líneas 149-167 de Styles.css) **ya fueron移植** al nuevo archivo en EPIC 01/PART 02 (basado en NEW/styles.css líneas 286-325).
- Las clases legacy移植: `.text-gradient`, `.scroll-reveal`, `.badge-internal`, `.badge-live`, `.badge-oss`, `.animate-float`, `.footer-link`, `.social-icon`.

### 2.2 `landing/index.html` tras EPIC 02/PART 01

- `<section id="inicio">` reescrito con la nueva estructura (ver EPIC 02/PART 01 §10.1).
- `<div id="termContent">` presente pero **vacío** (sin animación).
- 4 mac-buttons, pulse-dot, card-title presentes en el markup pero sin estilos.
- 4 `.hero-badges` con stats presentes en el markup pero sin estilos.

### 2.3 No existencia de `js/hero-terminal.js`

- Archivo no creado todavía. Se crea en este PART como interim hasta EPIC 09.

### 2.4 `KeorsoftLandingNEW/styles.css` líneas 397-603 — fuente de移植

Bloques a移植 (referenciados por línea exacta de NEW/styles.css):

| Líneas | Bloque |
|--------|--------|
| 397-406 | `.hero` (display: grid, grid-template-columns: 1.2fr 1fr, min-height: 85vh) |
| 408-411 | `.hero-content` (display: flex, flex-direction: column) |
| 413-421 | `.hero-title` (clamp font-size, font-weight 800, gradient con `background-clip: text`) |
| 423-429 | `.hero-subtitle` (font-size clamp, color secondary) |
| 431-436 | `.hero-buttons` (display: flex, gap: 1.25rem, flex-wrap) |
| 438-443 | `.hero-badges` (display: flex, gap: 2rem, border-top) |
| 445-449 | `.badge` (display: flex, flex-direction: column) |
| 451-458 | `.badge-val` (gradient text con `background-clip`) |
| 460-465 | `.badge-lbl` (font-size 0.8rem, uppercase) |
| 467-475 | `.hero-visual` (position: relative, width: 100%, height: 520px, flex centering) |
| 477-484 | `.hero-visual-card` (width: 90%, height: 420px, padding: 1.5rem, box-shadow) |
| 486-497 | `.hero-visual-card::after` (gradient border con `-webkit-mask-composite`) |
| 499-506 | `.card-header` (display: flex, justify-content: space-between, border-bottom) |
| 508-512 | `.mac-buttons` (display: flex, gap: 6px) |
| 513-521 | `.mac-btn` + `.close`/`.min`/`.max` (width/height: 12px, border-radius: 50%, colores RGB) |
| 523-530 | `.card-title` (font-family mono, font-size 0.8rem, display: flex con pulse-dot) |
| 532-539 | `.pulse-dot` (width: 8px, height: 8px, background emerald, animation: pulse 2s infinite) |
| 541-545 | `@keyframes pulse` (0% scale 0.95 opacity 0.7 box-shadow, 70% scale 1 box-shadow 8px 0, 100% scale 0.95) |
| 547-556 | `.terminal-content` (font-family mono, font-size 0.85rem, color slate-300, display flex column, overflow-y auto) |
| 558-561 | `.terminal-line` (display flex, gap 0.5rem) |
| 563-566 | `.term-prompt` (color cyan, user-select none) |
| 568-571 | `.term-cmd` (color white, font-weight 500) |
| 573-576 | `.term-resp` (color text-secondary, line-height 1.4) |
| 578-580 | `.term-resp.success` (color emerald) |
| 582-584 | `.term-resp.highlight` (color indigo) |
| 587-598 | `.hero-glow-sphere` (radial-gradient background, animation breatheSphere 8s infinite alternate) |
| 600-603 | `@keyframes breatheSphere` (0% scale 0.9 opacity 0.7, 100% scale 1.1 opacity 1) |

### 2.5 `KeorsoftLandingNEW/app.js` líneas 22-69 — fuente del script del terminal

Función `typeTerminalLine()` con:
- Array `lines` con 7 entradas de tipo `cmd` o `resp` (líneas 25-33 de NEW/app.js).
- Iteración recursiva con `setTimeout`.
- Diferenciación entre `cmd` (typing char-by-char a 40ms/char) y `resp` (mostrar completo).
- Delay inicial de 1500ms antes de empezar.

Comandos del NEW (referencia para adaptación):
```js
const lines = [
  { type: 'cmd', text: 'npx reasp init --project keor-core' },
  { type: 'resp', text: 'Initializing Ryou Enterprise Adaptive SDD Protocol (Reasp)...', class: 'highlight' },
  { type: 'resp', text: '✔ Connected to Antigravity 2.0 / OpenCode engines' },
  { type: 'resp', text: '✔ Shielding modules deployed (0% Hallucination threshold active)' },
  { type: 'cmd', text: 'reasp run build-architecture' },
  { type: 'resp', text: 'Analyzing requirements: Enterprise CRM + AegisUI tokens + Secure Infrastructure design...' },
  { type: 'resp', text: '✔ Generated 24 microservices with zero hallucinated components', class: 'success' }
];
```

---

## 3. Comparison against baseline

### 3.1移植 directa vs adaptación

| Elemento |移植 directa de NEW | Adaptación requerida |
|----------|-------------------|---------------------|
| Tokens de color | Idénticos (ya en `:root`) | N/A |
| Tipografía (`--font-display`, `--font-mono`) | Idénticos | N/A |
| Background glow mesh | Idéntico (ya移植 en EPIC 01) | N/A |
| `.hero` grid 1.2fr 1fr | Idéntico | N/A |
| `.hero-title` con gradient | Adaptar: el gradient debe afectar SOLO a "tecnología", no a todo el H1 | Usar `.hero-title-accent` class con `background-clip: text` aplicado solo al `<span>` |
| `.hero-subtitle` | Idéntico | N/A |
| `.hero-buttons` flex | Idéntico | N/A |
| `.btn-primary` / `.btn-secondary` | Ya移植 en EPIC 01 | N/A |
| `.hero-badges` | Idéntico (4 stats en lugar de 3) | Adaptación menor: añadir 4ª badge (Calidad con texto en lugar de porcentaje) |
| `.hero-visual-card` glass-panel | Idéntico | N/A |
| `mac-buttons` colores | Idénticos (rojo, amarillo, verde) | N/A |
| `pulse-dot` + `@keyframes pulse` | Idéntico | N/A |
| `.terminal-content` con `font-family: var(--font-mono)` | Idéntico | N/A |
| `.term-prompt` cyan | Idéntico | N/A |
| Comandos del terminal | Adaptación: usar comandos coherentes con el landing (no "Antigravity 2.0") | Ver §3.2 |

### 3.2 Comandos del terminal — propuesta adaptada a Keorsoft

Basado en el contexto de REASP (instalado globalmente vía npm) y los productos Keorsoft (MeridianUI, RACSP, ReportsEngines), se propone:

```js
const lines = [
  { type: 'cmd', text: 'npm install -g reasp-cli' },
  { type: 'resp', text: 'Initializing Ryou Enterprise Adaptive SDD Protocol...', class: 'highlight' },
  { type: 'resp', text: '✔ Connected to OpenCode 1.17.17' },
  { type: 'resp', text: '✔ Shielding modules deployed (0% Hallucination threshold active)' },
  { type: 'cmd', text: 'reasp run build-architecture' },
  { type: 'resp', text: 'Analyzing requirements: Enterprise CRM + MeridianUI tokens + Secure Infrastructure design...' },
  { type: 'resp', text: '✔ Generated 24 microservices with zero hallucinated components', class: 'success' }
];
```

**Justificación de cambios:**
- `npx reasp init` → `npm install -g reasp-cli` (más alineado con la realidad actual: REASP se instala globalmente, no con `npx`).
- `Antigravity 2.0 / OpenCode engines` → `OpenCode 1.17.17` (versión real según el repo `package.json` y los summaries).
- Resto se mantiene (es coherente con la realidad).

### 3.3 Diferencia con EPIC 09

| Aspecto | PART 02 (este) | EPIC 09 PART 01 |
|---------|----------------|-----------------|
| Alcance | Hero CSS + terminal JS | Consolidación de todos los scripts inline en `js/main.js` |
| Archivo | `landing/css/Styles.css` (extensión) + `landing/js/hero-terminal.js` (nuevo, interim) | `landing/js/main.js` (nuevo) + eliminación de `<script>` inline de `landing/index.html` |
| Consolidación | NO | SÍ — el hero-terminal.js se fusiona con mobile menu, scroll reveal, active nav, form handler |

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- **Añadir ~200 líneas** al bloque 8 ("Section-specific classes") del nuevo `Styles.css` con:
  - `.hero`, `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-buttons`.
  - `.hero-badges`, `.badge`, `.badge-val`, `.badge-lbl`.
  - `.hero-visual`, `.hero-visual-card`, `.hero-visual-card::after`.
  - `.card-header`, `.mac-buttons`, `.mac-btn`, `.card-title`.
  - `.pulse-dot`, `@keyframes pulse`.
  - `.terminal-content`, `.terminal-line`, `.term-prompt`, `.term-cmd`, `.term-resp`, `.term-resp.success`, `.term-resp.highlight`.
  - `.hero-glow-sphere`, `@keyframes breatheSphere`.
  - **NUEVO** `.hero-title-accent` (gradient solo en el span).
  - **NUEVO** reglas responsive @media para hero en breakpoints 1024 y 768 (extraídas de NEW/styles.css 1416-1444).
- **Crear** `landing/js/hero-terminal.js` con:
  - IIFE con `'use strict'`.
  - Listener `DOMContentLoaded`.
  - Array `lines` con los 7 comandos adaptados a Keorsoft/REASP.
  - Función `typeTerminalLine()` con setTimeout recursivo.
  - Comentario de cabecera referenciando EPIC 09.
- **Añadir** `<script src="js/hero-terminal.js" defer></script>` en `landing/index.html` antes de `</body>`.

### 4.2 Lo que NO está en el scope

- **NO** se modifica el markup del hero (EPIC 02/PART 01).
- **NO** se consolidan todos los scripts en `js/main.js` (EPIC 09).
- **NO** se añade el simulador REASP interactivo (`#reasp` simulator del NEW) — fuera de scope del packet.
- **NO** se añade el toggle del DesignSystem playground (MeridianUI vs AegisUI) — fuera de scope.
- **NO** se modifica el resto del `<body>`.

---

## 5. UX Problems

### UX-P10 — Terminal `font-family: var(--font-mono)` requiere Fira Code cargada
El terminal usa `font-family: var(--font-mono)` que es `'Fira Code'`. Si Fira Code no se carga correctamente (por ejemplo, red lenta o bloqueador), el terminal cae a `monospace` genérico. Mitigación: la regla CSS ya tiene fallback `monospace` (NEW/styles.css línea 547).

### UX-P11 — Terminal auto-typing puede ser distracting para usuarios con motion sensitivity
La animación auto-typing es repetitiva. **No** se aplica `prefers-reduced-motion` actualmente en NEW. **Decisión:** añadir `@media (prefers-reduced-motion: reduce) { .terminal-content { animation: none; } .pulse-dot { animation: none; } }` para accesibilidad.

### UX-P12 — Terminal vacío durante 1.5s antes del primer typing
Delay inicial de 1500ms (NEW/app.js línea 68). Si el usuario hace scroll rápido al hero, ve un área vacía. **Aceptable** — el terminal "cargando" es visualmente coherente con el pulse-dot.

### UX-P13 — El gradient en `.hero-title` cubre todo el H1 en NEW
En NEW/styles.css línea 418, `.hero-title` aplica gradient a todo el texto. En el landing actual del usuario, solo "tecnología" tiene gradient. **Decisión:** crear `.hero-title-accent` class con gradient aplicado solo al span.

---

## 6. Backend / Logic Problems

N/A — este PART es puramente CSS + JS cliente.

---

## 7. Frontend / Presentation Problems

### Front-P13 — `backdrop-filter: blur(12px)` en `.glass-panel` puede tener problemas en Safari
Glass-panel usa `backdrop-filter` (NEW/styles.css línea 390). Safari requiere prefijo `-webkit-backdrop-filter` (ya presente en NEW línea 391). Sin action adicional.

### Front-P14 — `-webkit-mask-composite: xor` para border gradient
`.hero-visual-card::after` (NEW/styles.css líneas 486-497) usa `-webkit-mask-composite: xor` que no es estándar pero está bien soportado en navegadores modernos. Verificar en Firefox.

### Front-P15 — `@keyframes pulse` con `box-shadow: 0 0 0 8px rgba(16, 185, 129, 0)` no funciona en todos los browsers
La animación `pulse` usa box-shadow que se expande de 0 a 8px. Algunos navegadores móviles pueden tener problemas de performance con esto. Mitigación: usar `transform: scale()` en su lugar. **Decisión:** mantener移植 original (ya validado en NEW).

### Front-P16 — `<div style="width: 40px;"></div>` spacer en `card-header`
Línea 100 de NEW/index.html usa `<div style="width: 40px;"></div>` como spacer para alinear el título al centro (los mac-buttons ocupan ~48px y el spacer otros 40px). Es inline style pero trivial. Aceptable.

---

## 8. Technical Debt

### TD-10 — `hero-terminal.js` es interim, debe consolidarse en EPIC 09
Tras este PART, hay 2 archivos JS en el landing: el `<script>` inline (que aún contiene mobile menu + scroll reveal + active nav + form handler de EPICs 03-08) + `hero-terminal.js`. EPIC 09/PART 01 consolida todo en `js/main.js` y elimina el `<script>` inline.

**Documentación requerida:** comentario en `hero-terminal.js`:
```js
// TODO EPIC 09: consolidar en js/main.js.
// Razón: este archivo es interim para permitir probar el hero de forma aislada.
```

### TD-11 — `@keyframes float` del landing actual (líneas 437-440) ya no se usa en hero
Tras EPIC 02/PART 01, `.animate-float` ya no se aplica en el hero. La keyframe puede eliminarse o mantenerse por si se reutiliza. **Decisión:** mantener (no es regresión).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-26:** Añadir el **bloque 8 (Section-specific classes)** al `Styles.css` con **~200 líneas** que cubran `.hero`, `.hero-content`, `.hero-title`, `.hero-subtitle`, `.hero-buttons`, `.hero-badges`, `.badge`, `.badge-val`, `.badge-lbl`, `.hero-visual`, `.hero-visual-card`, `.card-header`, `.mac-buttons`, `.mac-btn`, `.card-title`, `.pulse-dot`, `@keyframes pulse`, `.terminal-content`, `.terminal-line`, `.term-prompt`, `.term-cmd`, `.term-resp`, `.term-resp.success`, `.term-resp.highlight`, `.hero-glow-sphere`, `@keyframes breatheSphere`, `.hero-title-accent` — verificable con `Select-String -Path landing/css/Styles.css -Pattern "^\.(hero|badge|terminal|term-|card-header|mac-|pulse-dot)" | Measure-Object` que devuelve ≥ 20 matches.
- **RI-27:** Añadir **reglas `@media (prefers-reduced-motion: reduce)`** para accesibilidad (UX-P11) — verificable con `grep -c "prefers-reduced-motion" landing/css/Styles.css` que devuelve `≥ 1`.
- **RI-28:** Crear `landing/js/hero-terminal.js` (~70 líneas) con IIFE, listener DOMContentLoaded, array `lines` de 7 entradas, función `typeTerminalLine()` recursiva, y comentario de cabecera con `// TODO EPIC 09: consolidar en js/main.js` — verificable con `Test-Path landing/js/hero-terminal.js` retorna `True` y `(Get-Content landing/js/hero-terminal.js).Count >= 60`.
- **RI-29:** Añadir `<script src="js/hero-terminal.js" defer></script>` en `landing/index.html` antes de `</body>` — verificable con `grep -c "hero-terminal.js" landing/index.html` que devuelve `1`.
- **RI-30:** Usar los **7 comandos adaptados a Keorsoft/REASP** según §3.2 — verificable con `grep -E "(reasp-cli|OpenCode 1\.17\.17|MeridianUI|0% Hallucination)" landing/js/hero-terminal.js` que devuelve ≥ 4 matches.
- **RI-31:** Mantener el comportamiento de typing char-by-char a 40ms/char y delay inicial de 1500ms — verificable con `grep -c "setTimeout(typeChar, 40)" landing/js/hero-terminal.js` que devuelve `1` y `grep -c "setTimeout(typeTerminalLine, 1500)" landing/js/hero-terminal.js` que devuelve `1` (o el equivalente tras refactor).
- **RI-32:** Verificar que el `<div id="termContent">` se rellena con 7 líneas tras ~10-15 segundos — verificable manualmente con DevTools > Elements > inspeccionar contenido.
- **RI-33:** No introducir regresión: el `<script>` inline de mobile menu, scroll reveal, active nav y form handler sigue presente (no se elimina en este PART) — verificable con `grep -c "mobile-menu\|IntersectionObserver\|contact-form" landing/index.html` que devuelve ≥ 3.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/css/Styles.css`** — añadir bloque 8 ("Section-specific classes · EPIC 02 PART 02") con las ~200 líneas descritas en §2.4. Estructura:

```css
/* ============================================
   8. Section-specific classes · EPIC 02 PART 02
   Transplanted from KeorsoftLandingNEW/styles.css lines 397-603
   ============================================ */

/* 8.1 Hero base */
.hero {
  padding-top: 8rem;
  padding-bottom: 5rem;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  align-items: center;
  gap: 4rem;
  min-height: 85vh;
}

.hero-content {
  display: flex;
  flex-direction: column;
}

.hero-title {
  font-size: clamp(2.5rem, 5.5vw, 4.2rem);
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 1.5rem;
  /* Color base — todo el texto blanco */
  color: var(--text-primary);
}

.hero-title-accent {
  background: linear-gradient(135deg, #ffffff 40%, #a5b4fc 70%, var(--accent-cyan) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 600px;
}

.hero-buttons {
  display: flex;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

/* 8.2 Hero badges */
.hero-badges {
  display: flex;
  gap: 2rem;
  border-top: 1px solid var(--border-light);
  padding-top: 2rem;
}

.badge {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.badge-val {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge-lbl {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* 8.3 Hero visual + terminal */
.hero-visual {
  position: relative;
  width: 100%;
  height: 520px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-glow-sphere {
  position: absolute;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  animation: breatheSphere 8s infinite alternate ease-in-out;
}

@keyframes breatheSphere {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

.hero-visual-card {
  width: 90%;
  height: 420px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.hero-visual-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent, rgba(6, 182, 212, 0.2));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-light);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
}

.mac-buttons {
  display: flex;
  gap: 6px;
}

.mac-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.mac-btn.close { background-color: #ef4444; }
.mac-btn.min { background-color: #f59e0b; }
.mac-btn.max { background-color: #10b981; }

.card-title {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: var(--accent-emerald);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-emerald);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

/* 8.4 Terminal content */
.terminal-content {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: #c9d1d9;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  height: calc(100% - 60px);
}

.terminal-line {
  display: flex;
  gap: 0.5rem;
}

.term-prompt {
  color: var(--accent-cyan);
  user-select: none;
}

.term-cmd {
  color: #fff;
  font-weight: 500;
}

.term-resp {
  color: var(--text-secondary);
  line-height: 1.4;
}

.term-resp.success {
  color: var(--accent-emerald);
}

.term-resp.highlight {
  color: var(--accent-indigo);
}

/* 8.5 Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .pulse-dot,
  .hero-glow-sphere {
    animation: none;
  }
}

/* 8.6 Hero responsive (1024 / 768) */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-top: 6rem;
  }
  .hero-visual {
    height: 400px;
  }
  .hero-visual-card {
    height: 350px;
  }
}
```

### 10.2 Archivos a CREAR

**`landing/js/hero-terminal.js`** (~70 líneas, contenido basado en NEW/app.js líneas 22-69 con comandos adaptados):

```js
/**
 * Hero Terminal Auto-typing Animation
 * EPIC 02 PART 02 — interim, consolidado en js/main.js en EPIC 09.
 * Source of truth: KeorsoftLandingNEW/app.js lines 22-69
 * Comandos adaptados a Keorsoft/REASP.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
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
  });
})();
```

### 10.3 Modificación a `landing/index.html`

Añadir antes de `</body>`:
```html
<script src="js/hero-terminal.js" defer></script>
```

### 10.4 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- El `<script>` inline del landing (líneas 849-942) — EPIC 09 lo consolida.

---

## 11. Automated Test Plan

### AT-24 — Verificación de bloque CSS移植
- **Comando:** `Select-String -Path landing/css/Styles.css -Pattern "^\.(hero|badge|terminal|term-|card-header|mac-|pulse-dot)" | Measure-Object`.
- **Pass criteria:** ≥ 20 matches.
- **Fallo:** < 20 (移植 incompleto).

### AT-25 — Verificación de `@keyframes`移植
- **Comando:** `grep -c "@keyframes" landing/css/Styles.css`.
- **Pass criteria:** ≥ 2 (`pulse` + `breatheSphere`).
- **Fallo:** < 2.

### AT-26 — Verificación de `prefers-reduced-motion`
- **Comando:** `grep -c "prefers-reduced-motion" landing/css/Styles.css`.
- **Pass criteria:** ≥ 1.
- **Fallo:** `0` (UX-P11 no mitigado).

### AT-27 — Verificación de existencia de `hero-terminal.js`
- **Comando:** `Test-Path landing/js/hero-terminal.js`.
- **Pass criteria:** `True`.
- **Fallo:** `False`.

### AT-28 — Verificación de sintaxis JS
- **Comando:** `node --check landing/js/hero-terminal.js`.
- **Pass criteria:** Exit code `0`.
- **Fallo:** Cualquier error de sintaxis.

### AT-29 — Verificación de comandos Keorsoft/REASP
- **Comando:** `grep -E "(reasp-cli|OpenCode 1\.17\.17|0% Hallucination|MeridianUI tokens)" landing/js/hero-terminal.js | wc -l`.
- **Pass criteria:** ≥ 3.
- **Fallo:** < 3 (comandos no adaptados).

### AT-30 — Verificación de script incluido en HTML
- **Comando:** `grep -c "hero-terminal.js" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0` o `>1`.

### AT-31 — Verificación de no-regresión en REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-29:** Abrir `landing/index.html` en Chrome 120+: el hero tiene fondo dark con glow mesh animado de fondo (orbes moviéndose lentamente).
- [ ] **MV-30:** El badge "Tecnología de Clase Mundial" tiene icono SVG (no texto literal "rocket_launch").
- [ ] **MV-31:** El H1 "No solo servicios. Construimos tecnología." tiene "tecnología" con gradient blanco→indigo→cyan. El resto del H1 es blanco sólido.
- [ ] **MV-32:** El subtítulo se ve en color `--text-secondary` (gris claro) con max-width ~600px.
- [ ] **MV-33:** Los 2 CTAs (WhatsApp primary + Ver Productos secondary) tienen hover effects: WhatsApp translateY(-2px) + glow indigo, secondary border-color cambia.
- [ ] **MV-34:** Las 4 stats (360°, 100%, 24/7, Calidad) están visibles con `border-top: 1px solid var(--border-light)` separándolas del bloque de CTAs. Cada stat tiene `.badge-val` con gradient y `.badge-lbl` en uppercase.
- [ ] **MV-35:** El terminal visualizer tiene 3 mac-buttons (rojo, amarillo, verde), título "keorsoft-agent-terminal" con pulse-dot verde parpadeando, y área de contenido.
- [ ] **MV-36:** Tras 1.5s de carga, el terminal empieza a tipear comandos. Tras ~15s, las 7 líneas están escritas y visibles.
- [ ] **MV-37:** Las líneas de tipo `cmd` se tipean char-by-char (40ms/char), las `resp` aparecen completas. La línea final muestra `class="success"` en verde.
- [ ] **MV-38:** DevTools > Console: 0 errores. Warnings aceptables: ninguno.
- [ ] **MV-39:** DevTools > Elements > `<div id="termContent">`: contiene 7 `<div class="terminal-line">`.
- [ ] **MV-40:** DevTools > Lighthouse > Generate report: Performance ≥ baseline (85), Accessibility ≥ 95.
- [ ] **MV-41:** Activar `prefers-reduced-motion` en DevTools > Rendering > Emulate CSS media feature: el pulse-dot y el glow-sphere dejan de animarse.
- [ ] **MV-42:** Renderizar en DevTools > iPhone 12 Pro (390×844): el hero colapsa a 1 columna, terminal se mantiene visible debajo del texto.
- [ ] **MV-43:** Renderizar en DevTools > iPad (768×1024): el hero colapsa a 1 columna (breakpoint 1024 también aplica a 768).
- [ ] **MV-44:** Verificar que `<script src="js/hero-terminal.js" defer></script>` está antes de `</body>`.

---

## 13. Technical Documentation to produce

### TD-Output-6 — Comentarios de sección en `Styles.css`

Cabecera del bloque 8:
```css
/* ============================================
   8. Section-specific classes · EPIC 02 PART 02
   Transplanted from KeorsoftLandingNEW/styles.css lines 397-603
   Adaptations: .hero-title-accent class for partial H1 gradient
   Reduced-motion support: §8.5
   Responsive: §8.6
   ============================================ */
```

### TD-Output-7 — Cabecera de `hero-terminal.js`

```js
/**
 * Hero Terminal Auto-typing Animation
 * EPIC 02 PART 02 — interim script
 * TODO EPIC 09: consolidar en js/main.js (EPIC 09 PART 01).
 * Source of truth: KeorsoftLandingNEW/app.js lines 22-69
 * Comandos adaptados: §3.2 del PART02_css-replacement.md
 */
```

---

## 14. User Documentation to produce

### UD-Output-7 — Mensaje de commit sugerido

```
feat(landing): añadir estilos del hero y terminal auto-typing

- Bloque 8 de Styles.css (~200 líneas) con .hero, .hero-title,
  .hero-badges, .terminal-content, .mac-buttons, .pulse-dot, etc.
- Nuevo archivo js/hero-terminal.js (interim) con animación
  auto-typing de comandos Keorsoft/REASP.
- Soporte para prefers-reduced-motion (accesibilidad).
- Responsive en breakpoints 1024 y 768.

Refs: .refi/modules/keorsoft-landing-redesign/epics/02-hero-stats/
```

### UD-Output-8 — Nota sobre consolidación futura

Pequeña nota en el cuerpo del commit o en `landing/Audit-2026-07-09.html`:
> El archivo `js/hero-terminal.js` es interim. En EPIC 09 se consolida con el resto de scripts (mobile menu, scroll reveal, form handler) en un único `js/main.js`.

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-36:** `landing/css/Styles.css` contiene el bloque 8 con `.hero`, `.hero-content`, `.hero-title`, `.hero-title-accent`, `.hero-subtitle`, `.hero-buttons`, `.hero-badges`, `.badge`, `.badge-val`, `.badge-lbl`, `.hero-visual`, `.hero-visual-card`, `.card-header`, `.mac-buttons`, `.mac-btn`, `.card-title`, `.pulse-dot`, `@keyframes pulse`, `.terminal-content`, `.terminal-line`, `.term-prompt`, `.term-cmd`, `.term-resp`, `.term-resp.success`, `.term-resp.highlight`, `.hero-glow-sphere`, `@keyframes breatheSphere`, `@media (prefers-reduced-motion: reduce)`, `@media (max-width: 1024px)`.
- **AC-37:** El archivo `landing/js/hero-terminal.js` existe, es sintácticamente válido (`node --check` retorna 0), y mide ≥ 60 líneas.
- **AC-38:** `<script src="js/hero-terminal.js" defer></script>` está presente en `landing/index.html` antes de `</body>`.
- **AC-39:** Tras 1.5s de carga, el terminal empieza a tipear. Tras ~15s, las 7 líneas están escritas.
- **AC-40:** El comando `grep -c "prefers-reduced-motion" landing/css/Styles.css` retorna ≥ 1.
- **AC-41:** El comando `grep -c "@keyframes" landing/css/Styles.css` retorna ≥ 2 (`pulse` + `breatheSphere`).
- **AC-42:** El H1 "tecnología" tiene gradient (verificable con DevTools > Computed > `background-image` contiene `linear-gradient`).
- **AC-43:** Las 4 stats (360°, 100%, 24/7, Calidad) están visibles con `.badge-val` (gradient) y `.badge-lbl` (uppercase).
- **AC-44:** DevTools > Console en Chrome 120+ NO muestra errores JavaScript.
- **AC-45:** DevTools > Lighthouse: Performance ≥ baseline (85), Accessibility ≥ 95, SEO ≥ 95.
- **AC-46:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-47:** El `<script>` inline del landing (mobile menu, scroll reveal, active nav, form handler) **sigue presente** — este PART no lo elimina. EPIC 09 lo consolidará.
- **AC-48:** Activando `prefers-reduced-motion: reduce` en DevTools, el `pulse-dot` y el `hero-glow-sphere` dejan de animarse.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** El bloque CSS移植 de `NEW/styles.css` 397-603 sin desviaciones (excepto `.hero-title-accent` documentado en §3.1). Tokens de `:root` reutilizados consistentemente. Compatibilidad con `glass-panel` (`.hero-visual-card glass-panel`) verificada.
- [ ] **Gate 2 — Scope & Completeness Audit:** Las 25+ clases移植 están todas presentes. Las 2 `@keyframes`移植 (`pulse` + `breatheSphere`) están presentes. `@media` queries de reduced-motion y 1024px están presentes. Script de terminal creado con 7 comandos.
- [ ] **Gate 3 — UX/Design Review:** UX-P10 a UX-P13 resueltos según §5. `.hero-title-accent` permite gradient parcial. Comandos del terminal adaptados a Keorsoft/REASP según §3.2.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado con tickboxes. `node --check landing/js/hero-terminal.js` retorna 0. DevTools Console 0 errores. Terminal anima 7 líneas tras 15s.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este mismo PART. Si AC-44 falla, investigar consola y corregir.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera en `Styles.css` (§13.1) y `hero-terminal.js` (§13.2) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre consolidación futura (§14.2) comunicada.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 13 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________