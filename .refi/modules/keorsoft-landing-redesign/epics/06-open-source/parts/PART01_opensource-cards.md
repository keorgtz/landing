# PART 01 — Open Source Cards (Open Source · REASP & RACSP)

> **EPIC:** 06-open-source
> **Slug:** `opensource-cards`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation) + EPIC 05 (clases compartidas: `.btn-cta-purple`, `.btn-cta-orange`, `.badge-version`, `.sc-icon`)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el markup Y los estilos de la sección **Open Source** (`<section id="opensource">`, líneas 586-668 de `landing/index.html`, 83 líneas) preservando las 2 cards de REASP y RACSP con todo su contenido verbatim: descripciones, badges (Open Source, version, MIT License, Production), botones CTA (Explorar + GitHub), y el banner "Comunidad driven" al final.

---

## 2. Current State

### 2.1 Sección open source actual (líneas 586-668)

Estructura:

```
<section id="opensource" class="py-24 sm:py-32 section-alt relative overflow-hidden">  <!-- línea 587 -->
  <!-- 2 bg orbs decorativos (esmeralda + azul) -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] ..."></div>  <!-- línea 588 -->
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] ..."></div>  <!-- línea 589 -->

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">  <!-- línea 591 -->
    <div class="text-center max-w-2xl mx-auto mb-16 scroll-reveal">  <!-- línea 592 -->
      <p class="text-emerald-500 ...">Comunidad & Código Abierto</p>  <!-- línea 593 -->
      <h2>Contribuimos al <span class="text-gradient">ecosistema open source.</span></h2>  <!-- líneas 594-596 -->
      <p>Creemos en el poder de la colaboración...</p>  <!-- líneas 597-599 -->
    </div>

    <div class="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">  <!-- línea 602 -->
      <!-- Card 1: REASP Open Source -->
      <div class="oss-card scroll-reveal" style="--c-bg: var(--vi); --i-bg: rgba(139,92,246,0.1); --i-color: #8B5CF6;">  <!-- línea 604 -->
        <!-- ...icon, title, subtitle, description, 3 badges, 2 CTAs -->
      </div>

      <!-- Card 2: RACSP Open Source -->
      <div class="oss-card scroll-reveal" style="--c-bg: var(--or); --i-bg: rgba(249,115,22,0.1); --i-color: #F97316; animation-delay:.1s">  <!-- línea 631 -->
        <!-- ...icon, title, subtitle, description, 4 badges (incl. Production), 2 CTAs -->
      </div>
    </div>

    <div class="mt-16 text-center scroll-reveal">  <!-- línea 659 -->
      <div class="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border ...">  <!-- línea 660 -->
        <span class="material-symbols-rounded text-emerald-500" style="font-size:20px">groups</span>  <!-- línea 661 -->
        <p><strong>Comunidad driven.</strong> Contribuciones, issues y pull requests son bienvenidos.</p>  <!-- líneas 662-664 -->
      </div>
    </div>
  </div>
</section>
```

### 2.2 Contenido de las 2 cards (verbatim)

**Card 1 — REASP Open Source:**
- Icono: `memory` (Material Symbols)
- Título: "REASP"
- Subtítulo: "Ryou Enterprise Adaptive SDD Protocol"
- Descripción: "Framework de desarrollo IA adaptativo para OpenCode. Sistema operativo de desarrollo que evita loops infinitos y optimiza el uso de tokens."
- 3 badges: "Open Source" (icon `star`), "v1.0.0" (icon `tag`), "MIT License" (icon `gavel`)
- Botón CTA 1: "Explorar" (gradient púrpura `#6366F1 → #8B5CF6`) → `REASP/index.html`
- Botón CTA 2: "GitHub" (border, Font Awesome `fa-github`) → `https://github.com/keorgtz/REASP` (target=_blank)
- Color: `--c-bg: var(--vi)` (púrpura)

**Card 2 — RACSP Open Source:**
- Icono: `hub` (Material Symbols)
- Título: "RACSP"
- Subtítulo: "Ryou AI Cross SDD Protocol"
- Descripción: "Protocolo multi-agente para colaboración entre agentes de IA. Cerebro compartido, perfiles adaptativos y prevención de conflictos. Production-Grade v2.0.0."
- 4 badges: "Open Source", "v2.0.0", "MIT License", "Production" (icon `verified`, color esmeralda especial)
- Botón CTA 1: "Explorar RACSP" (gradient naranja `#F97316 → #FB923C`) → `RACSP/index.html`
- Botón CTA 2: "GitHub" (border, Font Awesome `fa-github`) → `https://github.com/keorgtz/RACSP` (target=_blank)
- Color: `--c-bg: var(--or)` (naranja)

### 2.3 Banner "Comunidad driven" (líneas 659-666)

- Icono: `groups` (Material Symbols, verde esmeralda)
- Texto: "**Comunidad driven.** Contribuciones, issues y pull requests son bienvenidos."
- Contenedor: `inline-flex items-center gap-3 px-6 py-3 rounded-2xl border` con background `var(--card)` y border `var(--card-border)`.

### 2.4 Iconografía Material Symbols en uso (7 iconos + 1 fa-brand)

| Icono | Línea | Uso |
|-------|-------|-----|
| `memory` | 606 | Card REASP |
| `hub` | 633 | Card RACSP |
| `star` | 616, 643 | Badge "Open Source" |
| `tag` | 617, 644 | Badge "v1.0.0" / "v2.0.0" |
| `gavel` | 618, 645 | Badge "MIT License" |
| `verified` | 646 | Badge "Production" (RACSP) |
| `arrow_forward` | 622, 650 | Botones CTA |
| `groups` | 661 | Banner "Comunidad driven" |
| `fa-brands fa-github` | 625, 653 | Botones GitHub (Font Awesome) |

### 2.5 CSS actual relevante

- `.oss-card` (líneas 319-343 de Styles.css anterior): background `var(--card)`, border 1px solid `var(--card-border)`, border-radius 24px, padding 32px, con top-bar `::before` coloreado por `--c-bg`.
- `.oss-card:hover` (líneas 335-339): translateY(-4px) + border-color `--c-bg`.
- `.oss-badge` (líneas 345-356): display inline-flex, padding 4px 10px, border-radius 8px, font-size 11px, background `rgba(99,102,241,.1)`, color `var(--in)`.
- El badge "Production" (línea 646) usa estilos inline: `style="background:rgba(16,185,129,.1);color:var(--em);border-color:rgba(16,185,129,.2)"`.

### 2.6 Dependencias Tailwind

~30 utility classes (estimación). Las principales: `grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto`, `flex items-center gap-4 mb-6`, `flex flex-wrap gap-2 mb-6`, `flex items-center gap-3`, `inline-flex items-center gap-2 px-5 py-2.5 rounded-xl`, `hover:-translate-y-1`, `hover:bg-[color:var(--card-hover)]`.

### 2.7 Nota sobre versión REASP

El badge "v1.0.0" en la card REASP coincide con el landing actual pero **no** con la realidad actual del CLI (`v1.0.1` según `package.json` del repo REASP, sesión 4 de 2026-07-09).

**Decisión del planner:** preservar el badge verbatim "v1.0.0" tal cual aparece en el landing actual. La actualización de versión se realiza en EPIC 10 (REASP Docs Update) si el usuario lo requiere explícitamente para docs.html y index.html de REASP. El landing refleja el estado en el momento del rediseño visual; cualquier corrección de versión es responsabilidad de EPIC 10 o de un follow-up.

---

## 3. Comparison against baseline

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 586-668) | Nuevo | Migración |
|---------|--------------------------|-------|-----------|
| Header label | `<p class="text-emerald-500 ...">Comunidad & Código Abierto</p>` (línea 593) | `.section-tag` con icono | Adoptar `.section-tag` |
| H2 | `<h2 class="text-3xl ... text-[color:var(--txt-1)]"><span class="text-gradient">ecosistema open source.</span></h2>` | `.section-title` con `<span class="hero-title-accent">` | Adoptar `.section-title` |
| Contenedor | `<div class="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">` (línea 602) | `.oss-grid` con `max-width: 64rem; mx: auto` | Adoptar `.oss-grid` |
| Card base | `.oss-card` con `--c-bg` top-bar 4px + `.sc-icon` 56×56 | `.oss-card` glass-panel + top-bar | Mantener nombre `.oss-card`, refactor con glass-panel |
| Hover effect | translateY(-4px) + border-color `--c-bg` (actual Styles.css 335-339) | translateY(-6px) + shadow 20/40 (consistente con EPIC 04/05) | Adoptar hover del NEW |
| Botón CTA "Explorar" | Inline con gradient + shadow | `.btn-cta-purple` (EPIC 05) o `.btn-cta-orange` | Reutilizar clases de EPIC 05 |
| Botón CTA "GitHub" | Inline con border | `.btn-secondary` o nueva `.btn-outline` | Crear `.btn-outline` específica para CTAs secundarios |
| Badges | `.oss-badge` con variantes inline para "Production" (línea 646) | `.oss-badge` con variante `.production` | Refactorizar |
| Banner "Comunidad driven" | Inline con border + background | `.oss-banner` glass-panel | Crear `.oss-banner` |

### 3.2 Decisión: mantener 2 cards separadas

A diferencia de una consolidación, las 2 cards REASP y RACSP son proyectos distintos con identidad propia. Se preservan como 2 cards separadas.

### 3.3 Decisión sobre colores

| Card | Color actual | Color nuevo | Notas |
|------|--------------|-------------|-------|
| 1. REASP | `--vi: #8B5CF6` (literal) | `var(--accent-purple)` | Token nuevo del EPIC 01 |
| 2. RACSP | `--or: #F97316` (literal) | `var(--accent-orange)` | Token añadido en EPIC 05 |

### 3.4 Reutilización de clases de EPIC 05

- `.btn-cta-purple` (REASP "Explorar") — reutilizar de EPIC 05.
- `.btn-cta-orange` (RACSP "Explorar RACSP") — reutilizar de EPIC 05.
- `.badge-version` (RACSP "v2.0.0") — reutilizar de EPIC 05 (con color naranja).
- `.sc-icon` — reutilizar de EPIC 03/05.

**Decisión:** este PART **NO** redefine estas clases; las reutiliza del estado actual de `Styles.css`.

### 3.5 Nuevas clases específicas de EPIC 06

- `.oss-card` — refactor con glass-panel + top-bar accent.
- `.oss-grid` — grid 2 cols → 1 col en 1024px.
- `.oss-badge` — refactor + variante `.oss-badge-production` (verde esmeralda).
- `.oss-banner` — glass-panel para el banner "Comunidad driven".
- `.btn-outline` — botón con border + Font Awesome icon + hover sutil.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 586-668 con la nueva estructura.
- Preservación verbatim del header (label, H2 con gradient, subtítulo).
- Preservación verbatim de las 2 cards (REASP y RACSP).
- Preservación del banner "Comunidad driven" al final.
- Reemplazo de los 8 iconos Material Symbols (7 en cards + 1 banner) por SVG inline.
- Mantenimiento de Font Awesome para iconos `fa-github` (decisión de EPIC 01).
- Adición al `Styles.css` de las clases específicas de EPIC 06:
  - `.oss-card` (refactor con glass-panel).
  - `.oss-grid` (layout).
  - `.oss-badge` (refactor + variante `.oss-badge-production`).
  - `.oss-banner` (banner glass-panel).
  - `.btn-outline` (botón GitHub).

### 4.2 Lo que NO está en el scope

- **NO** se modifican los badges "v1.0.0" / "v2.0.0" (preservados verbatim; EPIC 10 puede ajustar si el usuario lo requiere).
- **NO** se consolida con EPIC 05 (las cards de productos siguen separadas; las de open source son links directos a los proyectos).
- **NO** se añade el link a NPM de REASP/RACSP (no usado actualmente).
- **NO** se modifican los paths a `REASP/index.html` y `RACSP/index.html`.

---

## 5. UX Problems

### UX-P40 — Banner "Comunidad driven" puede parecer separado del contexto
El banner está al final, separado por `mt-16`. **Decisión:** mantener separación (es un call-to-action independiente para contribuir).

### UX-P41 — Badge "Production" tiene estilos inline en línea 646
El badge Production usa `style="background:rgba(16,185,129,.1);color:var(--em);border-color:rgba(16,185,129,.2)"`. **Decisión:** extraer a `.oss-badge-production` para mantenibilidad.

### UX-P42 — Botón "GitHub" con hover sutil puede no ser notorio
El botón GitHub usa `hover:bg-[color:var(--card-hover)]` (cambio sutil de fondo). **Decisión:** mantener sutil (es botón secundario, no debe competir con el primario "Explorar").

### UX-P43 — 2 orbes decorativos (esmeralda + azul) en bg pueden ser demasiado
Las cards son verdes (esmeralda) y azul (acentos GitHub). Los orbes también son esos colores. **Decisión:** mantener (consistencia visual).

### UX-P44 — `rounded-2xl` en banner (línea 660)移植
Tailwind `rounded-2xl` se移植 a `border-radius: 1rem` en CSS. Sin cambios.

---

## 6. Backend / Logic Problems

N/A — markup + CSS.

---

## 7. Frontend / Presentation Problems

### Front-P45 — `bg-[color:var(--card)]` en banner移植
Línea 660: `style="background:var(--card);border-color:var(--card-border)"`. Sin Tailwind, se移植 a `.oss-banner` con `background: rgba(11, 15, 23, 0.45); border: 1px solid var(--border-light)`.

### Front-P46 — `hover:bg-[color:var(--card-hover)]` en botón GitHub移植
Línea 624: `hover:bg-[color:var(--card-hover)]`. Sin Tailwind, se usa `.btn-outline:hover { background: rgba(255, 255, 255, 0.05); }`.

### Front-P47 — `<i class="fa-brands fa-github">` se mantiene
Líneas 625, 653: Font Awesome se mantiene (decisión EPIC 01). Sin action.

### Front-P48 — `target="_blank"` en enlaces GitHub
Línea 624, 652: target="_blank" sin `rel="noopener"`. **Decisión:** añadir `rel="noopener noreferrer"` por seguridad (recomendación W3C).

### Front-P49 — `style="background:rgba(16,185,129,.1)..."` en badge Production
Línea 646: estilos inline específicos para el badge Production. Extraer a `.oss-badge-production`.

---

## 8. Technical Debt

### TD-28 — `.oss-card` con misma estructura que `.product-card` (duplicación)
Ambas tienen top-bar, glass-panel, hover effect. **Decisión:** mantener separadas; unificación en EPIC 11.

### TD-29 — `.oss-badge` vs `.badge-*` naming inconsistente
`.oss-badge` para open source, `.badge-internal`/`.badge-live`/`.badge-oss`/`.badge-version` para productos. **Decisión:** aceptar naming divergente (semánticamente diferentes contextos).

### TD-30 — Badge "Production" con estilos inline难 de mantener
Extraer a `.oss-badge-production` para mejorar mantenibilidad.

### TD-31 — Botón GitHub inline (línea 624)难 de reutilizar
Extraer a `.btn-outline` (clase genérica para CTAs secundarios con border).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-87:** Reemplazar las **83 líneas** (586-668) de la sección open source con la nueva estructura (~75 líneas) — verificable con `wc -l landing/index.html` antes y después.
- **RI-88:** Preservar verbatim el **H2 "Contribuimos al ecosistema open source."** con `<span class="hero-title-accent">` para gradient — verificable con `grep -c "Contribuimos al" landing/index.html` que retorna `1` y `grep -c "ecosistema open source" landing/index.html` que retorna `1`.
- **RI-89:** Preservar verbatim el **subtítulo "Creemos en el poder de la colaboración..."** — verificable con `grep -c "Creemos en el poder de la colaboración" landing/index.html` que retorna `1`.
- **RI-90:** Preservar las **2 cards** con sus descripciones verbatim — verificable con `grep -c "Framework de desarrollo IA adaptativo" landing/index.html` que retorna `1` y `grep -c "Protocolo multi-agente para colaboración" landing/index.html` que retorna `1`.
- **RI-91:** Preservar **3 badges en REASP** (Open Source, v1.0.0, MIT License) y **4 badges en RACSP** (Open Source, v2.0.0, MIT License, Production) — verificable con `grep -c "oss-badge" landing/index.html` que retorna `7`.
- **RI-92:** Preservar los **4 botones CTA**: 2 "Explorar" (purple + orange) + 2 "GitHub" — verificable con `grep -c "Explorar" landing/index.html` que retorna `≥ 2` y `grep -c "fa-github" landing/index.html` que retorna `2`.
- **RI-93:** Preservar el **banner "Comunidad driven"** con texto "Comunidad driven. Contribuciones, issues y pull requests son bienvenidos." — verificable con `grep -c "Comunidad driven" landing/index.html` que retorna `1`.
- **RI-94:** Reemplazar los **8 iconos Material Symbols** (`memory`, `hub`, `star`, `tag`, `gavel`, `verified`, `arrow_forward`, `groups`) por SVG inline — verificable con `grep -E "(memory|hub|verified|groups|gavel)" landing/index.html | wc -l` que retorna `0` (estos iconos son específicos del open source; otros iconos pueden tener usos válidos en otros contextos).
- **RI-95:** Crear **clase `.btn-outline`** para los botones GitHub — verificable con `grep -c "btn-outline" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-96:** Crear **clase `.oss-badge-production`** con color esmeralda — verificable con `grep -c "oss-badge-production" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-97:** Crear **clase `.oss-banner`** glass-panel — verificable con `grep -c "oss-banner" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-98:** Añadir `rel="noopener noreferrer"` a los 2 enlaces GitHub (target="_blank") — verificable con `grep -c 'rel="noopener noreferrer"' landing/index.html` que retorna `2` (uno por cada botón GitHub).
- **RI-99:** Mantener el `<section id="opensource">` con su anchor — verificable con `grep -c 'id="opensource"' landing/index.html` que retorna `1`.
- **RI-100:** **NO modificar** los paths a GitHub (`keorgtz/REASP`, `keorgtz/RACSP`) — verificable con `grep -c "github.com/keorgtz" landing/index.html` que retorna `2`.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 586-668** (reemplazo total, 83 líneas → ~75 líneas):

```html
<!-- ══ OPEN SOURCE · EPIC 06 PART 01 ═══════════════════════════════════════ -->
<section id="opensource" class="py-24 sm:py-32 section-alt relative overflow-hidden">
  <!-- 2 bg orbs decorativos (esmeralda + azul) -->
  <div class="about-bg-orb" style="top:0;right:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%);"></div>
  <div class="about-bg-orb" style="bottom:0;left:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(14,152,248,0.06), transparent 70%);"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Section header -->
    <div class="section-header">
      <div class="section-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
        Comunidad &amp; Código Abierto
      </div>
      <h2 class="section-title">
        Contribuimos al <span class="hero-title-accent">ecosistema open source.</span>
      </h2>
      <p class="section-desc">
        Creemos en el poder de la colaboración. Nuestros frameworks de IA son de código abierto para impulsar la comunidad de desarrolladores.
      </p>
    </div>

    <!-- 2 OSS cards -->
    <div class="oss-grid">
      <!-- REASP Open Source -->
      <div class="oss-card scroll-reveal" style="--card-accent: var(--accent-purple);">
        <div class="oss-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
              <line x1="7" y1="15" x2="7" y2="15"/>
            </svg>
          </div>
          <div>
            <h3 class="oss-card-title">REASP</h3>
            <p class="oss-card-subtitle">Ryou Enterprise Adaptive SDD Protocol</p>
          </div>
        </div>
        <p class="oss-card-desc">
          Framework de desarrollo IA adaptativo para OpenCode. Sistema operativo de desarrollo que evita loops infinitos y optimiza el uso de tokens.
        </p>
        <div class="oss-badges">
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Open Source</span>
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> v1.0.0</span>
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6l-8-4z"/></svg> MIT License</span>
        </div>
        <div class="oss-card-ctas">
          <a href="REASP/index.html" class="btn-cta-purple">
            Explorar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="https://github.com/keorgtz/REASP" target="_blank" rel="noopener noreferrer" class="btn-outline">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      </div>

      <!-- RACSP Open Source -->
      <div class="oss-card scroll-reveal" style="--card-accent: var(--accent-orange); animation-delay:.1s">
        <div class="oss-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"/>
              <circle cx="4" cy="4" r="2"/>
              <circle cx="20" cy="4" r="2"/>
              <circle cx="4" cy="20" r="2"/>
              <circle cx="20" cy="20" r="2"/>
              <line x1="9.5" y1="6.5" x2="6" y2="4"/>
              <line x1="14.5" y1="6.5" x2="18" y2="4"/>
              <line x1="9.5" y1="17.5" x2="6" y2="20"/>
              <line x1="14.5" y1="17.5" x2="18" y2="20"/>
            </svg>
          </div>
          <div>
            <h3 class="oss-card-title">RACSP</h3>
            <p class="oss-card-subtitle">Ryou AI Cross SDD Protocol</p>
          </div>
        </div>
        <p class="oss-card-desc">
          Protocolo multi-agente para colaboración entre agentes de IA. Cerebro compartido, perfiles adaptativos y prevención de conflictos. Production-Grade v2.0.0.
        </p>
        <div class="oss-badges">
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Open Source</span>
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> v2.0.0</span>
          <span class="oss-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 6v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V6l-8-4z"/></svg> MIT License</span>
          <span class="oss-badge oss-badge-production"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Production</span>
        </div>
        <div class="oss-card-ctas">
          <a href="RACSP/index.html" class="btn-cta-orange">
            Explorar RACSP
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
          <a href="https://github.com/keorgtz/RACSP" target="_blank" rel="noopener noreferrer" class="btn-outline">
            <i class="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Banner "Comunidad driven" -->
    <div class="oss-banner-wrap scroll-reveal">
      <div class="oss-banner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-emerald);">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
        <p class="oss-banner-text">
          <strong>Comunidad driven.</strong> Contribuciones, issues y pull requests son bienvenidos.
        </p>
      </div>
    </div>
  </div>
</section>
```

### 10.2 Bloque CSS a añadir al `Styles.css`

Bloque 8.AA (después del bloque 8.Z de EPIC 05):

```css
/* ============================================
   8.AA Open Source · EPIC 06 PART 01
   2 OSS cards (REASP, RACSP) + banner.
   Refactor of .oss-card with glass-panel + top-bar.
   New: .oss-badge-production, .btn-outline, .oss-banner.
   Reuses: .btn-cta-purple, .btn-cta-orange, .sc-icon (from EPIC 03/05).
   ============================================ */

.oss-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 64rem;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .oss-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

.oss-card {
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.oss-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-accent, var(--accent-purple));
  opacity: 0.8;
  z-index: 1;
}

.oss-card:hover {
  transform: translateY(-6px);
  background: rgba(11, 15, 23, 0.65);
  border-color: var(--card-accent, var(--accent-purple));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.oss-card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.oss-card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.oss-card-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.oss-card-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.oss-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.oss-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.625rem;
  border-radius: 8px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent-indigo);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.oss-badge svg {
  flex-shrink: 0;
}

.oss-badge-production {
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-emerald);
  border-color: rgba(16, 185, 129, 0.2);
}

.oss-card-ctas {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Botón outline para CTAs secundarios (GitHub) */
.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  border: 1px solid var(--border-light);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-secondary);
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--text-primary);
  transform: translateY(-2px);
}

/* Banner "Comunidad driven" */
.oss-banner-wrap {
  margin-top: 4rem;
  text-align: center;
}

.oss-banner {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  border-radius: 16px;
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-light);
}

.oss-banner-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.oss-banner-text strong {
  color: var(--text-primary);
}
```

### 10.3 Decisión sobre versión REASP

**Preservar verbatim** el badge "v1.0.0" en la card REASP. Si el usuario quiere actualizarlo a "v1.0.1" (la versión real del CLI según `package.json`), se hace en una iteración separada o en EPIC 10 (REASP docs) si el usuario lo solicita.

### 10.4 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Resto del `<body>`.

---

## 11. Automated Test Plan

### AT-86 — Verificación de H2 preservado
- **Comando:** `grep -c "Contribuimos al" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-87 — Verificación de subtítulo preservado
- **Comando:** `grep -c "Creemos en el poder de la colaboración" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-88 — Verificación de las 2 cards (descripciones)
- **Comando:** `grep -c "Framework de desarrollo IA adaptativo" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "Protocolo multi-agente para colaboración" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-89 — Verificación de badges (7 totales)
- **Comando:** `grep -c "oss-badge" landing/index.html`.
- **Pass criteria:** `≥ 7`.
- **Fallo:** `< 7`.

### AT-90 — Verificación de "Production" badge (RACSP)
- **Comando:** `grep -c "Production" landing/index.html`.
- **Pass criteria:** `1` (en la card RACSP).
- **Fallo:** `0`.

### AT-91 — Verificación de "Comunidad driven" banner
- **Comando:** `grep -c "Comunidad driven" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-92 — Verificación de 4 botones CTA
- **Comando:** `grep -c "Explorar" landing/index.html`.
- **Pass criteria:** `≥ 2` (uno por cada card).
- **Fallo:** `< 2`.

- **Comando 2:** `grep -c "fa-github" landing/index.html`.
- **Pass criteria:** `2` (uno por cada card).
- **Fallo:** `< 2`.

### AT-93 — Verificación de enlaces GitHub
- **Comando:** `grep -c "github.com/keorgtz" landing/index.html`.
- **Pass criteria:** `2`.
- **Fallo:** `< 2`.

### AT-94 — Verificación de `rel="noopener noreferrer"` en GitHub
- **Comando:** `grep -c 'rel="noopener noreferrer"' landing/index.html`.
- **Pass criteria:** `2`.
- **Fallo:** `< 2`.

### AT-95 — Verificación de eliminación de Material Symbols en open source
- **Comando:** `grep -E "(memory|hub|verified|groups|gavel)" landing/index.html | wc -l`.
- **Pass criteria:** `0` (estos iconos son específicos de open source; pueden tener otros usos válidos, ajustar regex si necesario).
- **Fallo:** `> 0`.

### AT-96 — Verificación de anchor `#opensource` preservado
- **Comando:** `grep -c 'id="opensource"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-97 — Verificación de nuevas clases en CSS
- **Comando:** `grep -c "btn-outline\|oss-badge-production\|oss-banner" landing/css/Styles.css`.
- **Pass criteria:** `≥ 3`.
- **Fallo:** `< 3`.

### AT-98 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-124:** Abrir `landing/index.html` en Chrome 120+: la sección open source tiene fondo con 2 orbes sutiles (esmeralda + azul).
- [ ] **MV-125:** El header tiene `.section-tag` "Comunidad & Código Abierto" con icono SVG (GitHub icon).
- [ ] **MV-126:** El H2 "Contribuimos al ecosistema open source." tiene "ecosistema open source." con gradient.
- [ ] **MV-127:** El subtítulo completo sobre colaboración está visible.
- [ ] **MV-128:** Las 2 cards están visibles en grid horizontal (2 columnas en desktop).
- [ ] **MV-129:** **Card REASP** tiene icono SVG (memory/CPU), título "REASP", subtítulo "Ryou Enterprise Adaptive SDD Protocol", descripción completa, 3 badges (Open Source, v1.0.0, MIT License), botón "Explorar" con gradiente púrpura, botón "GitHub" con border.
- [ ] **MV-130:** **Card RACSP** tiene icono SVG (hub/network), título "RACSP", subtítulo "Ryou AI Cross SDD Protocol", descripción completa, 4 badges (Open Source, v2.0.0, MIT License, Production en verde esmeralda), botón "Explorar RACSP" con gradiente naranja, botón "GitHub" con border.
- [ ] **MV-131:** El badge "Production" tiene color verde esmeralda (no púrpura como el resto).
- [ ] **MV-132:** Hover en cualquier card: translateY(-6px), background más opaco, border-color accent.
- [ ] **MV-133:** Hover en "Explorar REASP" o "Explorar RACSP": translateY(-2px), shadow más fuerte.
- [ ] **MV-134:** Hover en "GitHub": background más claro, color más brillante, translateY(-2px).
- [ ] **MV-135:** Click en "GitHub" (REASP) abre `https://github.com/keorgtz/REASP` en nueva pestaña con `rel="noopener noreferrer"`.
- [ ] **MV-136:** Click en "GitHub" (RACSP) abre `https://github.com/keorgtz/RACSP` en nueva pestaña.
- [ ] **MV-137:** El banner "Comunidad driven" está visible al final con icono de grupos (esmeralda) y texto "Contribuciones, issues y pull requests son bienvenidos."
- [ ] **MV-138:** Renderizar en DevTools > iPhone 12 Pro: las 2 cards colapsan a 1 columna; el banner sigue visible.
- [ ] **MV-139:** DevTools > Console: 0 errores.
- [ ] **MV-140:** DevTools > Lighthouse: sin regresión vs EPIC 05.
- [ ] **MV-141:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-19 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ OPEN SOURCE · EPIC 06 PART 01 ═══════════════════════════════════════ -->
<!-- 2 OSS cards (REASP, RACSP) + banner "Comunidad driven" -->
<!-- Reutiliza: .btn-cta-purple, .btn-cta-orange (EPIC 05), .sc-icon (EPIC 03/05) -->
<!-- Nuevas clases: .btn-outline, .oss-badge-production, .oss-banner -->
<!-- rel="noopener noreferrer" añadido a enlaces GitHub (W3C recomendación) -->
```

### TD-Output-20 — Comentarios en `Styles.css`

Cabecera del bloque 8.AA:
```css
/* ============================================
   8.AA Open Source · EPIC 06 PART 01
   2 OSS cards (REASP, RACSP) + banner.
   Refactor of .oss-card with glass-panel + top-bar.
   New classes: .btn-outline, .oss-badge-production, .oss-banner.
   Reuses: .btn-cta-purple, .btn-cta-orange, .sc-icon (from EPIC 03/05).
   ============================================ */
```

---

## 14. User Documentation to produce

### UD-Output-18 — Mensaje de commit sugerido

```
feat(landing): rediseñar sección Open Source con glass-panel

- 2 OSS cards (REASP, RACSP) con preservación verbatim de contenido.
- Banner "Comunidad driven" preservado al final con icono groups.
- Badge "Production" con color esmeralda (extraído a .oss-badge-production).
- 8 iconos Material Symbols reemplazados por SVG inline.
- Nuevas clases CSS: .btn-outline, .oss-badge-production, .oss-banner.
- rel="noopener noreferrer" añadido a enlaces GitHub (W3C).

Refs: .refi/modules/keorsoft-landing-redesign/epics/06-open-source/
```

### UD-Output-19 — Nota sobre versión REASP

> El badge "v1.0.0" en la card REASP se preserva verbatim. La versión real del CLI es `v1.0.1` (ver `REASP/package.json`). Si el usuario quiere actualizar el badge, se hace en una iteración separada o en EPIC 10 (REASP Docs Update).

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-103:** El `<section id="opensource">` mantiene su `id`.
- **AC-104:** El H2 "Contribuimos al ecosistema open source." se preserva con gradient en "ecosistema open source.".
- **AC-105:** El subtítulo "Creemos en el poder de la colaboración..." se preserva verbatim.
- **AC-106:** Las 2 cards están presentes con sus descripciones verbatim.
- **AC-107:** Los 7 badges (3 REASP + 4 RACSP) están presentes.
- **AC-108:** El badge "Production" tiene `.oss-badge-production` class con color esmeralda.
- **AC-109:** Los 4 botones CTA (2 "Explorar" con `.btn-cta-purple/orange`, 2 "GitHub" con `.btn-outline`) están presentes.
- **AC-110:** Los enlaces GitHub tienen `target="_blank"` y `rel="noopener noreferrer"`.
- **AC-111:** El banner "Comunidad driven" está presente al final con icono SVG de grupos.
- **AC-112:** Los 8 iconos Material Symbols (memory, hub, star, tag, gavel, verified, arrow_forward, groups) están reemplazados por SVG inline.
- **AC-113:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-114:** DevTools > Lighthouse: Accessibility ≥ 95, Performance ≥ 85, SEO ≥ 95.
- **AC-115:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-116:** El comando `grep -c "btn-outline\|oss-badge-production\|oss-banner" landing/css/Styles.css` retorna ≥ 3.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Reutilización coherente de clases de EPIC 03/05 (`.sc-icon`, `.btn-cta-purple/orange`, `.badge-version`). Nuevas clases (`.btn-outline`, `.oss-badge-production`, `.oss-banner`) coherentes con el design system. Tokens accent correctamente usados.
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy preservado verbatim (header, 2 cards, 7 badges, banner). 8 iconos Material Symbols reemplazados. Banner "Comunidad driven" intacto. `rel="noopener noreferrer"` añadido.
- [ ] **Gate 3 — UX/Design Review:** UX-P40 a UX-P44 resueltos según §5. Badge Production con color esmeralda. Botón GitHub como secundario (sutil). 2 orbes esmeralda + azul coherentes con paleta open source.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Links GitHub funcionales con `target="_blank"`.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre versión REASP (§14.2) comunicada.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________