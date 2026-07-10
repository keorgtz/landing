# PART 01 — Products Markup (Products · 5 cards)

> **EPIC:** 05-products
> **Slug:** `products-markup`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation) + EPIC 02/03 (clases compartidas: `.section-tag`, `.section-title`, `.sc-icon`)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el markup de la sección **Productos** (`<section id="productos">`, líneas 407-584 de `landing/index.html`, 177 líneas) preservando las **5 product-cards con todo su contenido verbatim** (descripciones, features, badges, botones CTA, code block de RACSP) y aplicando el lenguaje visual glass-panel del nuevo estilo.

A diferencia de EPIC 04 (donde se consolidaron 7 services en 3 pilares), aquí se **preservan las 5 cards separadas** porque cada producto es una oferta distinta con identidad propia.

---

## 2. Current State

### 2.1 Las 5 product-cards actuales (líneas 421-580)

Inventario línea-a-línea:

| # | Producto | Líneas | Color (--c-bg) | Icono Material | Badges | Layout |
|---|----------|--------|----------------|----------------|--------|--------|
| 1 | MeridianUI | 423-447 | `--kr-blue` (`#0E98F8`) | `auto_awesome_mosaic` | "Internal" | Normal |
| 2 | Controls & Libraries for .NET | 449-473 | `--in` (`#6366F1`) | `widgets` | "Internal" | Normal |
| 3 | SaaS Products | 475-506 | `--em` (`#10B981`) | `cloud` | "Live" | Normal + sub-card SHEndevour |
| 4 | REASP | 508-531 | `--vi` (`#8B5CF6`) | `memory` | "Open Source" | Normal + botón CTA |
| 5 | RACSP | 533-580 | `--or` (`#F97316`) | `hub` | "Open Source" + "v2.0.0" | Full-width (`lg:col-span-2`) + botón CTA + code block |

### 2.2 Contenido preservado por card (verbatim)

**Card 1 — MeridianUI:**
- Subtítulo: "Design System & UI Framework Component KIT"
- Descripción: "Un lenguaje visual propietario que fusiona Fluent Design, Material Expressive y el toque distintivo de Keorsoft. Tono enterprise-soft con un sistema semántico de 5 niveles de color, densidad controlada y animaciones silenciosas (≤200ms)."
- Features: "Sistema semántico de 5 niveles de color", "Densidad controlada por contexto", "Animaciones silenciosas ≤200ms, sin gradientes ruidosos"
- Footer: "Usado en: **SHEndevour** y todos los productos Keorsoft" (icono `deployed_code`)

**Card 2 — Controls & Libraries for .NET:**
- Subtítulo: "Componentes avanzados para WPF, MAUI y Blazor"
- Descripción: "Librerías de controles de alto rendimiento para el ecosistema .NET. DataGrids con filtrado avanzado, schedulers para planificación de recursos, formularios con validación integrada y componentes de gráficos."
- Features: "DataGrids con filtrado, ordenamiento y agrupación", "Schedulers/Calendars para planificación de recursos", "Form controllers con validación y charting components"
- Footer: "Plataformas: **WPF, .NET MAUI, Blazor**" (icono `code`)

**Card 3 — SaaS Products:**
- Subtítulo: "Soluciones SaaS verticales para industrias específicas"
- Descripción: "Pequeñas soluciones SaaS diseñadas para verticales específicos. Cada producto está construido con alta personalización para su industria, utilizando MeridianUI y arquitectura moderna."
- Sub-card SHEndevour: "Sistema de Gestión Hotelera" + descripción "Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes." (icono `hotel`)
- Footer: "Próximamente: más soluciones verticales" (icono `schedule`)

**Card 4 — REASP:**
- Subtítulo: "Ryou Enterprise Adaptive SDD Protocol"
- Descripción: "El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode. Redefine la forma en la que programas con agentes, evitando el desperdicio de tokens y enfocándose en una arquitectura determinista."
- Features: "Plugin Visual: Dashboard nativo in-session", "Instalación Global: un script instala CLI y Extensión", "Arquitectura determinista y adaptativa"
- Botón CTA: "Explorar REASP" → `REASP/index.html` (gradiente `#6366F1 → #8B5CF6`)

**Card 5 — RACSP** (full-width con código):
- Subtítulo: "Ryou AI Cross SDD Protocol"
- Descripción: "Protocolo de colaboración multi-agente para agentes de IA (Claude, OpenCode, Gemini, etc.). Un protocolo nativo de proyecto con cerebro compartido, perfiles SDD adaptativos y prevención automática de conflictos. **Production-Grade.**"
- Features (4 en grid 2×2): "Cerebro compartido entre agentes", "Perfiles SDD adaptativos", "Prevención automática de conflictos", "Compatible con múltiples agentes IA"
- Botón CTA: "Explorar RACSP" → `RACSP/index.html` (gradiente `#F97316 → #FB923C`)
- Code block con sintaxis YAML:
  ```yaml
  # RACSP v2.0.0 — Multi-Agent Protocol
  agents:
    - claude (architect)
    - opencode (builder)
    - gemini (reviewer)
  shared_brain: enabled
  conflict_prevention: auto
  status: production-grade
  ```
  Con colores: `text-slate-500` (comentarios), `text-orange-400` (keys), `text-blue-400`/`text-green-400`/`text-purple-400` (values), `text-amber-300` (booleanos), `text-emerald-400` (status).

### 2.3 Header de sección actual (líneas 411-419)

- Label: "Productos & Frameworks" (texto plano).
- H2: "Tecnología propia de **próxima generación.**" (gradient en "próxima generación.").
- Subtítulo: "Descubre nuestros productos in-house: un design system propietario, librerías de controles .NET, soluciones SaaS verticales y frameworks de código abierto."

### 2.4 Iconografía Material Symbols en uso (28 ocurrencias)

| Icono | Línea | Uso |
|-------|-------|-----|
| `auto_awesome_mosaic` | 426 | MeridianUI |
| `widgets` | 452 | Controls & Libraries |
| `cloud` | 478 | SaaS Products |
| `memory` | 511 | REASP |
| `hub` | 538 | RACSP |
| `hotel` | 493 | Sub-card SHEndevour |
| `deployed_code` | 444 | Footer MeridianUI |
| `code` | 470 | Footer Controls |
| `schedule` | 503 | Footer SaaS |
| `arrow_forward` | 529, 558 | Botones CTA REASP/RACSP |
| `check_circle` | 439, 440, 441, 465, 466, 467, 524, 525, 526, 552, 553, 554, 555 | 13 check icons |

### 2.5 CSS actual relevante

- `.product-card` (líneas 257-281 de Styles.css anterior): background `var(--card)`, border 1px solid `var(--card-border)`, border-radius 24px, padding 32px, con top-bar `::before` coloreado por `--c-bg`.
- `.product-card:hover` (líneas 273-277): translateY(-4px) + border-color `var(--c-bg)` + box-shadow.
- `.badge` (líneas 284-295): display inline-flex, padding 3px 10px, border-radius 999px, font-size 10px.
- `.badge-internal` (líneas 296-300): bg gris, color `--txt-3`.
- `.badge-live` (líneas 301-305): bg esmeralda 10%, color `--em`.
- `.badge-oss` (líneas 306-310): bg violeta 10%, color `--vi`.
- `.feature-row` (líneas 312-316): display flex, align-items center, gap 8px.

### 2.6 Dependencias Tailwind

~120 utility classes (estimación). Las principales: `grid lg:grid-cols-2 gap-6 lg:gap-8`, `flex items-start gap-4 mb-4`, `flex flex-col md:flex-row gap-8 items-start`, `md:w-2/3 md:w-1/3`, `sm:grid-cols-2`, `lg:col-span-2`, `bg-[color:var(--card-border)]`, etc.

---

## 3. Comparison against baseline

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 407-584) | Nuevo (NEW style) | Migración |
|---------|--------------------------|-------------------|-----------|
| Header label | `<p class="text-purple-500 ...">Productos & Frameworks</p>` (línea 412) | `.section-tag` con icono | Adoptar `.section-tag` |
| H2 | `<h2 class="text-3xl ... text-[color:var(--txt-1)]"><span class="text-gradient">próxima generación.</span></h2>` | `.section-title` con `<span class="hero-title-accent">` | Adoptar `.section-title` |
| Grid | `<div class="grid lg:grid-cols-2 gap-6 lg:gap-8">` (línea 421) | `.products-grid` con `grid-template-columns: repeat(2, 1fr); gap: 2rem` | Adoptar `.products-grid` (clase nueva) |
| Card base | `.product-card` con `--c-bg` top-bar de 4px + `.sc-icon` 56×56 border-radius 16px | `.product-card.glass-panel` con `--card-accent` top-bar | Mantener `.product-card` con glass-panel + top-bar |
| Hover | translateY(-4px) + border-color `--c-bg` + box-shadow | Más fuerte: -6px + shadow 20/40 | Adoptar hover del NEW |
| Card 5 RACSP | `lg:col-span-2` con sub-grid md:flex-row 2/3 + 1/3 + code block (líneas 533-580) | No existe equivalente directo en NEW (los pilares son todos del mismo tamaño) | Mantener estructura: full-width con code block |

### 3.2 Decisión: mantener las 5 cards separadas

A diferencia de EPIC 04 (donde 7 services se consolidaron en 3 pilares), aquí se **preservan las 5 cards**:

**Justificación:**
- Cada producto es una oferta distinta con identidad propia (no se pueden consolidar lógicamente).
- Los badges (Internal, Live, Open Source) son información valiosa que se perdería en una consolidación.
- El code block de RACSP requiere su propio espacio (full-width).
- La sub-card SHEndevour dentro de SaaS Products requiere espacio dedicado.
- Los botones CTA "Explorar REASP/RACSP" son CTAs primarios que necesitan visibilidad.

### 3.3 Decisión sobre color por card (mapping actual → nuevo)

| Card | Color actual | Color nuevo (token) | Notas |
|------|--------------|---------------------|-------|
| 1. MeridianUI | `--kr-blue: #0E98F8` | `#0E98F8` (literal) | Mantener azul corporativo |
| 2. Controls & Libraries | `--in: #6366F1` | `var(--accent-indigo)` | Cambio de literal a token |
| 3. SaaS Products | `--em: #10B981` | `var(--accent-emerald)` | Cambio de literal a token |
| 4. REASP | `--vi: #8B5CF6` | `var(--accent-purple)` | Cambio a púrpura más vivo |
| 5. RACSP | `--or: #F97316` | `var(--accent-orange)` | Mantener naranja (token añadido en EPIC 04 no aplica; este es el naranja del RACSP) |

**Token `--accent-orange`:** no existe en `:root` actual (NEW usa `--accent-rose` pero no orange). **Decisión del planner:** añadir `--accent-orange: #F97316` al `:root` en este PART (consistente con `--accent-amber` añadido en EPIC 03).

### 3.4 Decisión sobre el code block de RACSP

El code block actual usa:
- Background `#050b18` (literal, más oscuro que el body).
- Border `var(--card-border)` (semi-transparente).
- 3 mac-buttons decorativos (rojo, amarillo, verde).
- Title "racsp / protocol" en `text-slate-500 font-mono`.
- `<pre><code>` con syntax highlighting inline.
- `whitespace-pre-wrap` y `overflow-x-auto`.
- `box-shadow: 0 30px 60px rgba(0,0,0,0.4)`.

**Decisión:** preservar **TODO** el code block verbatim, sin cambios estructurales. Solo adaptar la paleta de syntax highlighting a las variables accent del nuevo estilo. La macroestructura y microcontenido se mantienen idénticos.

### 3.5 Decisión sobre botones CTA

Los botones "Explorar REASP" y "Explorar RACSP" usan gradientes inline:
- REASP: `linear-gradient(135deg, #6366F1, #8B5CF6)` con shadow rgba(139, 92, 246, 0.3).
- RACSP: `linear-gradient(135deg, #F97316, #FB923C)` con shadow rgba(249, 115, 22, 0.3).

**Decisión:** extraer a clases CSS (`.btn-cta-purple` y `.btn-cta-orange`) para mantenibilidad. Mantener los gradientes y shadows exactos.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 407-584 con la nueva estructura.
- Preservación verbatim del header (label, H2 con gradient, subtítulo).
- Preservación verbatim de las 5 cards (títulos, subtítulos, descripciones, features).
- Preservación verbatim de la sub-card SHEndevour dentro de SaaS Products.
- Preservación verbatim del code block de RACSP (texto, colores, layout).
- Preservación de los 2 botones CTA (Explorar REASP, Explorar RACSP).
- Reemplazo de los 28 iconos Material Symbols por SVG inline.
- Adición del token `--accent-orange: #F97316` al `:root` del `Styles.css`.

### 4.2 Lo que NO está en el scope

- **NO** se añade AegisUI como producto separado (se menciona en EPIC 04 Pilar 3 y en REASP docs, no en landing).
- **NO** se añaden nuevos productos.
- **NO** se consolidan las 5 cards (a diferencia de EPIC 04).
- **NO** se modifica el resto del `<body>`.

---

## 5. UX Problems

### UX-P30 — Sub-card SHEndevour dentro de SaaS Products puede ser confusa
La sub-card con icono `hotel` + título "SHEndevour" + descripción "Sistema de Gestión Hotelera" está dentro del card SaaS Products. En el nuevo estilo, podría parecer un card anidado. **Decisión:** mantener estructura anidada (es lo que el usuario diseñó); la sub-card se distingue por `background` ligeramente diferente y border interno.

### UX-P31 — Code block de RACSP tiene colores literales (no tokens)
Los colores `#0E98F8`, `#6366F1`, etc. en los `<span>` del code block son literales hardcoded. Migración a tokens requeriría cambios en muchas reglas CSS. **Decisión:** preservar literales (el code block es contenido textual, no estilo del landing).

### UX-P32 — Botones CTA con gradientes inline pierden consistencia con `.btn-primary`
Los botones "Explorar REASP" y "Explorar RACSP" usan gradientes con colores únicos (purple, orange), distintos al `.btn-primary` que usa indigo. **Decisión:** crear `.btn-cta-purple` y `.btn-cta-orange` para mantener la identidad visual de cada producto.

### UX-P33 — `whitespace-pre-wrap` en `<pre>` puede romper código largo en mobile
El code block de RACSP tiene `whitespace-pre-wrap` para evitar scroll horizontal. Pero en mobile (< 480px) podría ser difícil de leer. **Decisión:** mantener el comportamiento actual; el usuario puede decidir si quiere `overflow-x-auto` en mobile (preferido para preservar formato).

### UX-P34 — RACSP badge "v2.0.0" usa `badge-live` con color verde
La card RACSP tiene 2 badges: "Open Source" (`badge-oss` púrpura) y "v2.0.0" (`badge-live` verde). El badge "v2.0.0" en verde semánticamente debería ser naranja (el color de RACSP). **Decisión:** crear `.badge-version` con color naranja para mantener consistencia con el branding de RACSP.

---

## 6. Backend / Logic Problems

N/A — markup + CSS.

---

## 7. Frontend / Presentation Problems

### Front-P31 — `bg-[color:var(--bg-3)]` en sub-card SHEndevour
Línea 490: `<div class="bg-[color:var(--bg-3)] rounded-xl p-4 mb-4 border border-[color:var(--card-border)]">`. Tailwind arbitrary con `var()`. Sin Tailwind, se移植 a CSS con clase `.product-subcard` o equivalente.

### Front-P32 — `bg-emerald-500/10 text-emerald-500` inline en icono SHEndevour
Línea 492: `<div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">`. Tailwind opacity utility. Sin Tailwind, se usa CSS con `rgba(16, 185, 129, 0.1)` y `color: var(--accent-emerald)`.

### Front-P33 — `style="background: linear-gradient(135deg, #6366F1, #8B5CF6);"` inline en botones CTA
Líneas 528, 557: gradientes inline. Migración a `.btn-cta-purple` y `.btn-cta-orange`.

### Front-P34 — `bg-[#050b18]` en code block
Línea 561: `<div class="md:w-1/3 w-full rounded-2xl overflow-hidden border border-[color:var(--card-border)] bg-[#050b18] p-4 md:p-5 shadow-2xl relative">`. Tailwind arbitrary con valor hexadecimal. Sin Tailwind, se usa `.racsp-codeblock` con `background: #050b18` literal.

### Front-P35 — `bg-gradient-to-tr from-orange-500/5 to-amber-500/10 blur-2xl` overlay en code block
Línea 562: gradiente overlay con Tailwind. Sin Tailwind, se移植 a CSS con `background: linear-gradient(to top right, rgba(249,115,22,0.05), rgba(245,158,11,0.1)); filter: blur(2rem);`.

### Front-P36 — `border-white/10` en header del code block
Línea 563: `border-b border-white/10`. Tailwind opacity utility. Sin Tailwind, se usa `border-bottom: 1px solid rgba(255,255,255,0.1)`.

### Front-P37 — `text-[10px]` en label del code block
Línea 567: `<span class="text-[10px] text-slate-500 font-mono ml-2">racsp / protocol</span>`. Tailwind arbitrary. Sin Tailwind, se usa `font-size: 0.625rem` en CSS.

### Front-P38 — `whitespace-pre-wrap` en `<pre>`
Línea 569: `class="text-[10px] md:text-xs text-slate-300 font-mono leading-relaxed relative z-10 overflow-x-auto whitespace-pre-wrap"`. Sin Tailwind, se移植 a CSS.

---

## 8. Technical Debt

### TD-21 — Token `--accent-orange` no existe en `:root` actual
Tras EPIC 04, el `:root` tiene `--accent-amber` (para about card Valores) pero NO `--accent-orange`. RACSP necesita naranja. **Acción:** añadir `--accent-orange: #F97316` en este PART.

### TD-22 — Botones CTA inline (líneas 528, 557) deberían ser clases
Extraer a `.btn-cta-purple` y `.btn-cta-orange` permite reutilización y consistencia.

### TD-23 — Code block con colores literales no sigue design system
Los `text-orange-400`, `text-amber-300`, `text-emerald-400` son literales hardcoded. **Decisión:** mantener literales (es código, no estilo de UI). Si el usuario quiere tematizar el syntax highlighting, lo hace en una iteración futura.

### TD-24 — Badge "v2.0.0" con color verde semánticamente incorrecto
El badge debería ser naranja (color de RACSP). **Acción:** crear `.badge-version` con `color: var(--accent-orange)`.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-66:** Reemplazar las **177 líneas** (407-584) de la sección productos con la nueva estructura (~155 líneas) — verificable con `wc -l landing/index.html` antes y después.
- **RI-67:** Añadir el **token `--accent-orange: #F97316`** al `:root` del `Styles.css` — verificable con `grep -c "accent-orange" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-68:** Preservar las **5 cards** con sus títulos verbatim: MeridianUI, Controls & Libraries for .NET, SaaS Products, REASP, RACSP — verificable con `grep -E "(MeridianUI|Controls & Libraries|SaaS Products|REASP|RACSP)" landing/index.html` que retorna `5` matches en la sección productos.
- **RI-69:** Preservar verbatim la **sub-card SHEndevour** con título "SHEndevour" + "Sistema de Gestión Hotelera" + descripción sobre reservas/habitaciones/facturación — verificable con `grep -c "SHEndevour" landing/index.html` que retorna `≥ 1` y `grep -c "Sistema de Gestión Hotelera" landing/index.html` que retorna `≥ 1`.
- **RI-70:** Preservar verbatim el **code block de RACSP** con título "racsp / protocol", las 6 líneas de código YAML, y los 3 mac-buttons (rojo, amarillo, verde) — verificable con `grep -c "racsp / protocol" landing/index.html` que retorna `1` y `grep -c "production-grade" landing/index.html` que retorna `1`.
- **RI-71:** Preservar los **2 botones CTA** apuntando a `REASP/index.html` y `RACSP/index.html` — verificable con `grep -c 'href="REASP/index.html"' landing/index.html` que retorna `≥ 1` y `grep -c 'href="RACSP/index.html"' landing/index.html` que retorna `≥ 1`.
- **RI-72:** Reemplazar los **28 iconos Material Symbols** por SVG inline — verificable con `grep -E "(auto_awesome_mosaic|widgets|cloud|memory|hub|hotel|deployed_code|schedule|arrow_forward|check_circle)" landing/index.html | wc -l` que retorna `0` (puede haber otros usos legítimos de estos nombres en otros contextos, ajustar el regex si es necesario).
- **RI-73:** Crear **clases `.btn-cta-purple` y `.btn-cta-orange`** para los botones CTA — verificable con `grep -c "btn-cta-purple\|btn-cta-orange" landing/css/Styles.css` que retorna `≥ 2`.
- **RI-74:** Crear **clase `.badge-version`** con color naranja — verificable con `grep -c "badge-version" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-75:** Mantener el `<section id="productos">` con su anchor — verificable con `grep -c 'id="productos"' landing/index.html` que retorna `1`.
- **RI-76:** Mantener `lg:col-span-2` en la card RACSP — verificable con `grep -c "lg:col-span-2.*RACSP\|RACSP.*lg:col-span-2" landing/index.html` (verificación por inspección).

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 407-584** (reemplazo total, 177 líneas → ~155 líneas):

```html
<!-- ══ PRODUCTOS · EPIC 05 PART 01 ═══════════════════════════════════════ -->
<section id="productos" class="py-24 sm:py-32 section-main relative overflow-hidden">
  <!-- Bg orb decorativo -->
  <div class="about-bg-orb" style="top:50%;left:50%;transform:translate(-50%,-50%);width:50rem;height:50rem;background:radial-gradient(circle, rgba(168,85,247,0.05), transparent 70%);"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Section header -->
    <div class="section-header">
      <div class="section-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
        Productos &amp; Frameworks
      </div>
      <h2 class="section-title">
        Tecnología propia de <span class="hero-title-accent">próxima generación.</span>
      </h2>
      <p class="section-desc">
        Descubre nuestros productos in-house: un design system propietario, librerías de controles .NET, soluciones SaaS verticales y frameworks de código abierto.
      </p>
    </div>

    <!-- 5 product-cards en grid 2 cols, RACSP full-width -->
    <div class="products-grid">

      <!-- 1. MeridianUI -->
      <div class="product-card scroll-reveal" style="--card-accent: #0E98F8;">
        <div class="product-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" fill-opacity="0.3"/>
            </svg>
          </div>
          <div>
            <div class="product-card-title-row">
              <h3 class="product-card-title">MeridianUI</h3>
              <span class="badge badge-internal">Internal</span>
            </div>
            <p class="product-card-subtitle">Design System &amp; UI Framework Component KIT</p>
          </div>
        </div>
        <p class="product-card-desc">
          Un lenguaje visual propietario que fusiona Fluent Design, Material Expressive y el toque distintivo de Keorsoft. Tono enterprise-soft con un sistema semántico de 5 niveles de color, densidad controlada y animaciones silenciosas (≤200ms).
        </p>
        <div class="product-features">
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Sistema semántico de 5 niveles de color</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Densidad controlada por contexto</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Animaciones silenciosas ≤200ms, sin gradientes ruidosos</span>
          </div>
        </div>
        <div class="product-card-footer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          Usado en: <strong>SHEndevour</strong> y todos los productos Keorsoft
        </div>
      </div>

      <!-- 2. Controls & Libraries for .NET -->
      <div class="product-card scroll-reveal" style="--card-accent: var(--accent-indigo); animation-delay:.1s">
        <div class="product-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
          </div>
          <div>
            <div class="product-card-title-row">
              <h3 class="product-card-title">Controls &amp; Libraries for .NET</h3>
              <span class="badge badge-internal">Internal</span>
            </div>
            <p class="product-card-subtitle">Componentes avanzados para WPF, MAUI y Blazor</p>
          </div>
        </div>
        <p class="product-card-desc">
          Librerías de controles de alto rendimiento para el ecosistema .NET. DataGrids con filtrado avanzado, schedulers para planificación de recursos, formularios con validación integrada y componentes de gráficos.
        </p>
        <div class="product-features">
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>DataGrids con filtrado, ordenamiento y agrupación</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Schedulers/Calendars para planificación de recursos</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Form controllers con validación y charting components</span>
          </div>
        </div>
        <div class="product-card-footer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Plataformas: <strong>WPF, .NET MAUI, Blazor</strong>
        </div>
      </div>

      <!-- 3. SaaS Products (con sub-card SHEndevour) -->
      <div class="product-card scroll-reveal" style="--card-accent: var(--accent-emerald); animation-delay:.2s">
        <div class="product-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </div>
          <div>
            <div class="product-card-title-row">
              <h3 class="product-card-title">SaaS Products</h3>
              <span class="badge badge-live">Live</span>
            </div>
            <p class="product-card-subtitle">Soluciones SaaS verticales para industrias específicas</p>
          </div>
        </div>
        <p class="product-card-desc">
          Pequeñas soluciones SaaS diseñadas para verticales específicos. Cada producto está construido con alta personalización para su industria, utilizando MeridianUI y arquitectura moderna.
        </p>
        <div class="product-subcard">
          <div class="product-subcard-header">
            <div class="product-subcard-icon" style="color:var(--accent-emerald);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7v14M21 7v14M9 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v17"/></svg>
            </div>
            <div>
              <h4 class="product-subcard-title">SHEndevour</h4>
              <p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>
            </div>
          </div>
          <p class="product-subcard-desc">
            Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.
          </p>
        </div>
        <div class="product-card-footer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Próximamente: más soluciones verticales
        </div>
      </div>

      <!-- 4. REASP -->
      <div class="product-card scroll-reveal" style="--card-accent: var(--accent-purple); animation-delay:.3s">
        <div class="product-card-header">
          <div class="sc-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <line x1="2" y1="10" x2="22" y2="10"/>
              <line x1="7" y1="15" x2="7" y2="15"/>
            </svg>
          </div>
          <div>
            <div class="product-card-title-row">
              <h3 class="product-card-title">REASP</h3>
              <span class="badge badge-oss">Open Source</span>
            </div>
            <p class="product-card-subtitle">Ryou Enterprise Adaptive SDD Protocol</p>
          </div>
        </div>
        <p class="product-card-desc">
          El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode. Redefine la forma en la que programas con agentes, evitando el desperdicio de tokens y enfocándose en una arquitectura determinista.
        </p>
        <div class="product-features">
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Plugin Visual: Dashboard nativo in-session</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Instalación Global: un script instala CLI y Extensión</span>
          </div>
          <div class="feature-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Arquitectura determinista y adaptativa</span>
          </div>
        </div>
        <a href="REASP/index.html" class="btn-cta-purple">
          Explorar REASP
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>

      <!-- 5. RACSP (full-width con code block) -->
      <div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-orange); animation-delay:.4s">
        <div class="product-card-wide-inner">
          <div class="product-card-wide-content">
            <div class="product-card-header">
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
                <div class="product-card-title-row product-card-title-row-wrap">
                  <h3 class="product-card-title">RACSP</h3>
                  <span class="badge badge-oss">Open Source</span>
                  <span class="badge badge-version">v2.0.0</span>
                </div>
                <p class="product-card-subtitle">Ryou AI Cross SDD Protocol</p>
              </div>
            </div>
            <p class="product-card-desc">
              Protocolo de colaboración multi-agente para agentes de IA (Claude, OpenCode, Gemini, etc.). Un protocolo nativo de proyecto con cerebro compartido, perfiles SDD adaptativos y prevención automática de conflictos. <strong>Production-Grade.</strong>
            </p>
            <div class="product-features-grid">
              <div class="feature-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Cerebro compartido entre agentes</span>
              </div>
              <div class="feature-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Perfiles SDD adaptativos</span>
              </div>
              <div class="feature-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Prevención automática de conflictos</span>
              </div>
              <div class="feature-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Compatible con múltiples agentes IA</span>
              </div>
            </div>
            <a href="RACSP/index.html" class="btn-cta-orange">
              Explorar RACSP
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
          <div class="racsp-codeblock">
            <div class="racsp-codeblock-overlay"></div>
            <div class="racsp-codeblock-header">
              <div class="mac-buttons">
                <span class="mac-btn close"></span>
                <span class="mac-btn min"></span>
                <span class="mac-btn max"></span>
              </div>
              <span class="racsp-codeblock-title">racsp / protocol</span>
              <div style="width: 40px;"></div>
            </div>
            <pre class="racsp-codeblock-code"><code><span class="cb-comment"># RACSP v2.0.0 — Multi-Agent Protocol</span>
<span class="cb-key">agents:</span>
  - <span class="cb-agent-claude">claude</span> <span class="cb-comment">(architect)</span>
  - <span class="cb-agent-opencode">opencode</span> <span class="cb-comment">(builder)</span>
  - <span class="cb-agent-gemini">gemini</span> <span class="cb-comment">(reviewer)</span>

<span class="cb-key">shared_brain:</span> <span class="cb-bool">enabled</span>
<span class="cb-key">conflict_prevention:</span> <span class="cb-bool">auto</span>
<span class="cb-key">status:</span> <span class="cb-status">production-grade</span></code></pre>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
```

### 10.2 Decisión sobre el code block de RACSP

**Decisión del planner:** preservar la estructura verbatim del code block (líneas 561-578 del actual), solo cambiando las clases de colores hardcoded (`text-slate-500`, `text-orange-400`, etc.) a clases CSS semánticas (`cb-comment`, `cb-key`, `cb-bool`, `cb-status`, etc.) que se移植 en `Styles.css` bloque 8.Z.

Esto permite tematizar el syntax highlighting sin tocar el HTML.

### 10.3 Adiciones al `:root` del `Styles.css`

```css
:root {
  /* ... tokens existentes ... */
  --accent-orange: #F97316;  /* NEW · EPIC 05 PART 01 — color para RACSP */
}
```

### 10.4 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Resto del `<body>`.

---

## 11. Automated Test Plan

### AT-65 — Verificación de token `--accent-orange` añadido
- **Comando:** `grep -c "accent-orange" landing/css/Styles.css`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-66 — Verificación de los 5 títulos de producto
- **Comando:** `grep -E "(MeridianUI|Controls & Libraries|SaaS Products|REASP|RACSP)" landing/index.html | wc -l`.
- **Pass criteria:** `≥ 5`.
- **Fallo:** `< 5`.

### AT-67 — Verificación de sub-card SHEndevour
- **Comando:** `grep -c "SHEndevour" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-68 — Verificación de code block RACSP preservado
- **Comando:** `grep -c "racsp / protocol" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-69 — Verificación del texto `production-grade` en code block
- **Comando:** `grep -c "production-grade" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-70 — Verificación de los 2 botones CTA
- **Comando:** `grep -c 'href="REASP/index.html"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c 'href="RACSP/index.html"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-71 — Verificación de `lg:col-span-2` en RACSP
- **Comando:** `grep -c "product-card-wide" landing/index.html`.
- **Pass criteria:** `1` (clase que reemplaza lg:col-span-2 + md:flex-row).
- **Fallo:** `0`.

### AT-72 — Verificación de anchor `#productos` preservado
- **Comando:** `grep -c 'id="productos"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-73 — Verificación de eliminación de Material Symbols en productos
- **Comando:** `grep -E "(auto_awesome_mosaic|widgets|memory|hub|deployed_code|arrow_forward)" landing/index.html | wc -l`.
- **Pass criteria:** `0` (estos iconos son específicos de productos; otros iconos como `cloud`, `check`, `hotel`, `schedule` pueden tener otros usos válidos fuera de la sección productos).
- **Fallo:** `> 0`.

### AT-74 — Verificación de SVG inline presente
- **Comando:** `grep -c "<svg" landing/index.html`.
- **Pass criteria:** `≥ 25` (mínimo 25 SVG en la sección productos: 5 iconos principales + 13 checks + 4 footer icons + 2 arrow_forward + 1 hotel).
- **Fallo:** `< 25`.

### AT-75 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-91:** Abrir `landing/index.html` en Chrome 120+: la sección productos tiene fondo con orbe púrpura sutil centrado.
- [ ] **MV-92:** El header tiene `.section-tag` "Productos & Frameworks" con icono SVG (mosaic icon).
- [ ] **MV-93:** El H2 "Tecnología propia de próxima generación." tiene "próxima generación." con gradient.
- [ ] **MV-94:** Las 5 cards están visibles en grid 2-cols (con RACSP ocupando el ancho completo en la última fila).
- [ ] **MV-95:** **MeridianUI** tiene icono SVG (mosaic), badge "Internal", descripción completa, 3 features con checks SVG, footer con icono `deployed_code` y "Usado en: SHEndevour".
- [ ] **MV-96:** **Controls & Libraries** tiene icono SVG (widgets), badge "Internal", descripción, 3 features, footer "Plataformas: WPF, .NET MAUI, Blazor".
- [ ] **MV-97:** **SaaS Products** tiene icono cloud SVG, badge "Live", descripción, sub-card SHEndevour con icono hotel y "Sistema de Gestión Hotelera", footer "Próximamente: más soluciones verticales".
- [ ] **MV-98:** **REASP** tiene icono SVG (memory/CPU), badge "Open Source" púrpura, descripción, 3 features, botón CTA "Explorar REASP" con gradiente púrpura.
- [ ] **MV-99:** **RACSP** ocupa el ancho completo (`lg:col-span-2`), tiene icon hub, 2 badges ("Open Source" + "v2.0.0"), descripción con "Production-Grade" en negrita, 4 features en grid 2×2, botón "Explorar RACSP" con gradiente naranja, code block con título "racsp / protocol" y 6 líneas de código YAML con syntax highlighting.
- [ ] **MV-100:** El code block de RACSP tiene 3 mac-buttons (rojo, amarillo, verde) y fondo `#050b18`.
- [ ] **MV-101:** El código YAML muestra correctamente los 3 agentes (claude, opencode, gemini) con colores diferentes, shared_brain: enabled, conflict_prevention: auto, status: production-grade.
- [ ] **MV-102:** Click en "Explorar REASP" navega a `REASP/index.html` en misma pestaña.
- [ ] **MV-103:** Click en "Explorar RACSP" navega a `RACSP/index.html` en misma pestaña.
- [ ] **MV-104:** Hover en cualquier card: translateY(-6px), background más opaco, border-color accent.
- [ ] **MV-105:** Renderizar en DevTools > iPhone 12 Pro: cards colapsan a 1 columna; RACSP full-width igual; code block con scroll horizontal si es necesario.
- [ ] **MV-106:** DevTools > Console: 0 errores.
- [ ] **MV-107:** DevTools > Lighthouse: sin regresión vs EPIC 04.
- [ ] **MV-108:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-15 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ PRODUCTOS · EPIC 05 PART 01 ═══════════════════════════════════════ -->
<!-- 5 product-cards en grid 2-cols (RACSP full-width) -->
<!-- Token --accent-orange añadido en Styles.css :root para RACSP -->
<!-- Code block RACSP preservado verbatim con syntax highlighting -->
<!-- Botones CTA: .btn-cta-purple (REASP) y .btn-cta-orange (RACSP) -->
```

### TD-Output-16 — Comentarios en `Styles.css`

Cabecera del bloque 8.Z:
```css
/* ============================================
   8.Z Products · EPIC 05 PART 02
   Transplanted/refactored product cards with glass-panel style.
   Token --accent-orange added to :root (NOT in NEW).
   Code block RACSP: 11 semantic classes (cb-comment, cb-key, etc.).
   CTA buttons: .btn-cta-purple (REASP) + .btn-cta-orange (RACSP).
   ============================================ */
```

---

## 14. User Documentation to produce

### UD-Output-15 — Mensaje de commit sugerido

```
feat(landing): rediseñar sección Productos con glass-panel

- 5 product-cards con preservación verbatim de contenido.
- Token --accent-orange añadido a :root para RACSP.
- 28 iconos Material Symbols reemplazados por SVG inline.
- Code block RACSP preservado con syntax highlighting
  via clases semánticas (cb-comment, cb-key, cb-bool, etc.).
- Botones CTA extraídos a .btn-cta-purple y .btn-cta-orange.
- Sub-card SHEndevour preservada dentro de SaaS Products.

Refs: .refi/modules/keorsoft-landing-redesign/epics/05-products/
```

### UD-Output-16 — Nota sobre el token nuevo

> Se añade `--accent-orange: #F97316` al `:root` del `Styles.css` para soportar el color de RACSP. Este token no existe en `KeorsoftLandingNEW/styles.css` pero es coherente con la paleta extendida de Keorsoft (junto con `--accent-amber` añadido en EPIC 03).

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-77:** El token `--accent-orange: #F97316` está definido en `:root` del `Styles.css`.
- **AC-78:** Las 5 cards están presentes con sus títulos verbatim: MeridianUI, Controls & Libraries for .NET, SaaS Products, REASP, RACSP.
- **AC-79:** La sub-card SHEndevour tiene título "SHEndevour", subtítulo "Sistema de Gestión Hotelera", y descripción "Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes."
- **AC-80:** El code block de RACSP tiene título "racsp / protocol", 3 mac-buttons (rojo, amarillo, verde), y el código YAML completo con 6 líneas.
- **AC-81:** El `<section id="productos">` mantiene su `id` (anchor funcional desde nav).
- **AC-82:** RACSP tiene `product-card-wide` class (full-width en desktop).
- **AC-83:** Los botones CTA apuntan a `REASP/index.html` y `RACSP/index.html` respectivamente.
- **AC-84:** Los 28 iconos Material Symbols (auto_awesome_mosaic, widgets, cloud, memory, hub, hotel, deployed_code, code, schedule, arrow_forward, check_circle) están reemplazados por SVG inline.
- **AC-85:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-86:** DevTools > Lighthouse: Accessibility ≥ 95, Performance ≥ 85, SEO ≥ 95.
- **AC-87:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-88:** El comando `grep -c "btn-cta" landing/css/Styles.css` retorna ≥ 2 (purple + orange).
- **AC-89:** El comando `grep -c "badge-version" landing/css/Styles.css` retorna ≥ 1.
- **AC-90:** El comando `grep -c "racsp-codeblock" landing/css/Styles.css` retorna ≥ 4 (la clase + sus 11 sub-clases de syntax).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Token `--accent-orange` añadido coherentemente. Clases移植 (`.product-card`, `.sc-icon`, `.feature-row`) compatibles con EPIC 03/04. Code block RACSP con syntax highlighting via clases semánticas.
- [ ] **Gate 2 — Scope & Completeness Audit:** 5 cards con contenido verbatim. Sub-card SHEndevour preservada. Code block RACSP intacto (3 mac-buttons, 6 líneas YAML). 2 botones CTA con gradientes. 28 iconos SVG.
- [ ] **Gate 3 — UX/Design Review:** UX-P30 a UX-P34 resueltos según §5. Sub-card SHEndevour distinguida visualmente. Code block con scroll horizontal en mobile. CTA buttons con identidad visual propia.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Code block RACSP visible con syntax highlighting. Links CTA funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes. Token nuevo documentado.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre token nuevo (§14.2) comunicada.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________