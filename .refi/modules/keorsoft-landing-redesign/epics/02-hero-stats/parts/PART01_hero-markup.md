# PART 01 — Hero Markup (Hero & Stats Strip)

> **EPIC:** 02-hero-stats
> **Slug:** `hero-markup`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el **markup HTML** del hero del landing principal (`<section id="inicio">` y la stats strip adyacente) adoptando la estructura de `KeorsoftLandingNEW/index.html` líneas 58-107, **preservando verbatim** todo el copy actual del usuario. Este PART modifica **solo markup**; el CSS y JS asociados llegan en PART 02.

---

## 2. Current State

### 2.1 Bloque hero actual (líneas 70-152 de `landing/index.html`)

Estructura actual (resumen):

```
<section id="inicio" class="hero-section pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden flex items-center min-h-[90vh]">
  <div class="hero-bg-orb orb-1"></div>                                    <!-- línea 71 -->
  <div class="hero-bg-orb orb-2"></div>                                    <!-- línea 72 -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"> <!-- línea 74 -->
    <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">        <!-- línea 75 -->
      <!-- Columna izquierda: copy -->
      <div class="text-center lg:text-left">                                <!-- línea 77 -->
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase hero-badge">  <!-- línea 78 -->
          <span class="material-symbols-rounded fill" style="font-size:14px">rocket_launch</span>  <!-- línea 79 -->
          Tecnología de Clase Mundial                                       <!-- línea 80 -->
        </span>
        <h1 class="text-4xl sm:text-5xl md:text-6xl xl:text-[4rem] font-extrabold leading-[1.1] mb-6 tracking-tight ...">  <!-- línea 82 -->
          No solo servicios.<br>Construimos <span class="text-gradient">tecnología.</span>  <!-- línea 83 -->
        </h1>
        <p class="text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 ...">  <!-- línea 85 -->
          Keorsoft es una empresa de tecnología enfocada en crear soluciones...     <!-- línea 86 -->
        </p>
        <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">  <!-- línea 88 -->
          <!-- 4 chips: Software Development, AI Tools, UI Frameworks, SaaS Products (líneas 89-101) -->
        </div>
        <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">  <!-- línea 102 -->
          <a href="https://wa.me/523327633233" class="btn-primary ...">     <!-- línea 103 -->
            <i class="fa-brands fa-whatsapp text-lg"></i>                    <!-- línea 104 -->
            Hablemos de tu Proyecto                                         <!-- línea 105 -->
          </a>
          <a href="#productos" class="btn-secondary ...">                   <!-- línea 107 -->
            <span class="material-symbols-rounded" style="font-size:18px">inventory_2</span>  <!-- línea 108 -->
            Ver Productos                                                   <!-- línea 109 -->
          </a>
        </div>
      </div>
      <!-- Columna derecha: visual (líneas 114-148) -->
      <div class="flex justify-center mt-8 lg:mt-0 relative">
        <!-- 3 anillos decorativos + center piece + 4 floating service nodes (Software, Redes, Seguridad, UX/UI) -->
      </div>
    </div>
  </div>
</section>
```

### 2.2 Bloque stats strip (líneas 154-179)

```
<section class="py-10 stats-strip border-y border-[color:var(--card-border)]">  <!-- línea 155 -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">                       <!-- línea 156 -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-x divide-[color:var(--card-border)]">  <!-- línea 157 -->
      <div><p class="text-3xl font-extrabold mb-1 ...">360°</p>...</div>     <!-- líneas 158-161 -->
      <div><p class="text-3xl font-extrabold mb-1 ...">100%</p>...</div>     <!-- líneas 162-165 -->
      <div><p class="text-3xl font-extrabold mb-1 ...">24/7</p>...</div>     <!-- líneas 166-169 -->
      <div><p>Calidad</p>...</div>                                          <!-- líneas 170-176 -->
    </div>
  </div>
</section>
```

### 2.3 Dependencias del bloque actual

- Clases Tailwind utility: ~80 ocurrencias (verificable con `grep -E '"[^"]*(flex|grid|p-|m-|gap-|text-|bg-|w-|h-|max-w-|min-h-)' landing/index.html | head -100 | wc -l`).
- Iconos Material Symbols: `rocket_launch` (línea 79), `inventory_2` (línea 108).
- Iconos Font Awesome: `fa-brands fa-whatsapp` (línea 104).
- Clases custom: `.hero-section`, `.hero-bg-orb`, `.orb-1`, `.orb-2`, `.hero-badge`, `.btn-primary`, `.btn-secondary`, `.text-gradient`, `.stats-strip`, `.animate-float`.

### 2.4 Visual de la columna derecha

- 3 anillos concéntricos rotando (`border-slate-300/30`, `border-blue-400/30`, `border-purple-400/30`).
- Center piece: 48×48 con icono `domain` y sombra de glow.
- 4 floating nodes con `animation: float 4s ease-in-out infinite` + delays escalonados:
  - Top-left: Software (Pymes) — icono `code` verde.
  - Bottom-right: Redes (Infraestructura) — icono `router` azul.
  - Top-right: Seguridad (Protección) — icono `security` púrpura.
  - Bottom-left: UX/UI (Diseño) — icono `design_services` ámbar.

---

## 3. Comparison against baseline

Comparación línea-a-línea contra `KeorsoftLandingNEW/index.html` líneas 58-107.

### 3.1 Diferencias arquitectónicas del hero

| Aspecto | Actual (`landing/index.html` 70-152) | Nuevo (`NEW/index.html` 58-107) | Migración |
|---------|--------------------------------------|--------------------------------|-----------|
| Layout | `grid lg:grid-cols-2` con Tailwind | `display: grid; grid-template-columns: 1.2fr 1fr` en CSS | Adoptar CSS explícito |
| Columna izquierda | `<div class="text-center lg:text-left">` (line 77) | `<div class="hero-content">` (NEW line 59) | Renombrar |
| Badge superior | `<span class="hero-badge ...">` con Material Symbols (line 78-81) | `<div class="section-tag">` con SVG inline 12×12 (NEW lines 60-63) | Reemplazar con `.section-tag` + SVG `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>` |
| H1 | `<h1 class="text-4xl ...">No solo servicios.<br>Construimos <span class="text-gradient">tecnología.</span></h1>` (line 82-84) | `<h1 class="hero-title">Construimos la Arquitectura Tecnológica de tu Empresa.</h1>` con `background-clip: text` global (NEW lines 64, 413-421) | **Copy del usuario preservado**. Aplicar gradient via `.hero-title` class. |
| Subtítulo | `<p class="text-base sm:text-lg mb-8 ...">Keorsoft es una empresa...` (line 85-87) | `<p class="hero-subtitle">Desarrollo de aplicaciones...` (NEW lines 65-67) | **Copy del usuario preservado**. Usar `.hero-subtitle` class. |
| CTAs | `<div class="flex flex-col sm:flex-row ...">` con `<a class="btn-primary">` y `<a class="btn-secondary">` (lines 102-111) | `<div class="hero-buttons">` con `<a class="btn btn-primary">` y `<a class="btn btn-secondary">` (NEW lines 68-71) | **CTAs del usuario preservados**: WhatsApp + Ver Productos. Adaptar a `.btn .btn-primary` / `.btn .btn-secondary`. |
| Chips decorativos | 4 chips `<span>` con `bg-{color}/10` (lines 89-101) | (eliminado en NEW — reemplazado por `.hero-badges`) | **Chips ELIMINADOS**, reemplazados por las 4 stats del strip (360°, 100%, 24/7, Calidad) en formato `.hero-badges`. |
| Visual | 3 anillos + center piece + 4 floating nodes | Terminal visualizer con mac-buttons + `terminal-content` animado | **Reemplazo total**: terminal auto-typing. |
| Background | `.hero-section` con `linear-gradient(140deg, ...)` (líneas 131-134 actuales) + 2 orbes `.hero-bg-orb` | `.hero` + `<div class="bg-glow-container">` con 3 glows animados + `<div class="bg-grid">` con grid overlay (NEW lines 25-30, 54-128) | Adoptar glow mesh. Mantener efecto similar al actual pero con paleta dark. |

### 3.2 Estructura del hero nuevo (NEW)

```html
<section class="hero" id="heroSection">                                <!-- línea 58 -->
  <div class="hero-content">                                            <!-- línea 59 -->
    <div class="section-tag">                                            <!-- línea 60 -->
      <svg width="12" height="12" viewBox="0 0 24 24" ...><path d="M12 2L2 7l10 5 10-5-10-5z..."/></svg>
      Próxima Generación de Software Enterprise                         <!-- línea 62 -->
    </div>
    <h1 class="hero-title">Construimos la Arquitectura Tecnológica de tu Empresa.</h1>  <!-- línea 64 -->
    <p class="hero-subtitle">Desarrollo de aplicaciones de misión crítica...</p>       <!-- línea 65-67 -->
    <div class="hero-buttons">                                           <!-- línea 68 -->
      <a href="#estimator" class="btn btn-primary">Diseñar Arquitectura</a>             <!-- línea 69 -->
      <a href="#reasp" class="btn btn-secondary">Conocer Reasp Protocol</a>            <!-- línea 70 -->
    </div>
    <div class="hero-badges">                                            <!-- línea 72 -->
      <div class="badge">
        <span class="badge-val">99.9%</span>
        <span class="badge-lbl">Uptime de Red</span>
      </div>
      <div class="badge">
        <span class="badge-val">0%</span>
        <span class="badge-lbl">Alucinación IA</span>
      </div>
      <div class="badge">
        <span class="badge-val">10x</span>
        <span class="badge-lbl">Velocidad Dev</span>
      </div>
    </div>
  </div>
  <div class="hero-visual">                                              <!-- línea 87 -->
    <div class="hero-glow-sphere"></div>                                  <!-- línea 88 -->
    <div class="hero-visual-card glass-panel">                            <!-- línea 89 -->
      <div class="card-header">                                           <!-- línea 90 -->
        <div class="mac-buttons">                                         <!-- línea 91 -->
          <span class="mac-btn close"></span>                             <!-- línea 92 -->
          <span class="mac-btn min"></span>                               <!-- línea 93 -->
          <span class="mac-btn max"></span>                               <!-- línea 94 -->
        </div>
        <div class="card-title">                                          <!-- línea 96 -->
          <span class="pulse-dot"></span>                                 <!-- línea 97 -->
          keorsoft-agent-terminal                                         <!-- línea 98 -->
        </div>
        <div style="width: 40px;"></div>                                  <!-- línea 100 -->
      </div>
      <div class="terminal-content" id="termContent">                     <!-- línea 102 -->
        <!-- Populated dynamically via app.js -->                          <!-- línea 103 -->
      </div>
    </div>
  </div>
</section>
```

### 3.3 Mapeo copy: actual → nuevo (preservando contenido del usuario)

| Elemento | Copy actual (preservar) | Equivalente nuevo (clase) |
|----------|------------------------|---------------------------|
| Badge superior | "Tecnología de Clase Mundial" | `.section-tag` (sin emoji rocket_launch; SVG icon en lugar) |
| H1 | "No solo servicios. Construimos **tecnología.**" (con `text-gradient` en "tecnología") | `.hero-title` con gradient global |
| Subtítulo | "Keorsoft es una empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI propietarios y productos SaaS que transforman industrias." | `.hero-subtitle` |
| CTA primary | "Hablemos de tu Proyecto" (WhatsApp) | `.btn .btn-primary` |
| CTA secondary | "Ver Productos" (→ #productos) | `.btn .btn-secondary` |
| 4 chips decorativos | "Software Development", "AI Tools", "UI Frameworks", "SaaS Products" | **Reemplazados** por los 4 stats del strip |
| 4 stats | "360° Soluciones Integrales", "100% Adaptado a Pymes", "24/7 Infraestructura Segura", "Calidad Diseño & Rendimiento" | `.hero-badges` con `.badge-val` + `.badge-lbl` |

### 3.4 Visual: terminal vs anillos + floating nodes

- **Actual:** 3 anillos concéntricos rotando + 4 floating service nodes (Software, Redes, Seguridad, UX/UI).
- **Nuevo:** Terminal visualizer con animación auto-typing, `mac-buttons`, `pulse-dot`, y comandos sobre Keorsoft/REASP.

**Decisión:** Reemplazar 100 % por el terminal. La info de los 4 floating nodes (Software, Redes, Seguridad, UX/UI) **se preserva** pero se traslada a la sección Servicios (EPIC 04, dentro de los 3 pilares).

### 3.5 Diferencia con PART 02

| Aspecto | PART 01 (este) | PART 02 (siguiente) |
|---------|----------------|---------------------|
| Alcance | Markup HTML de `<section id="inicio">` | CSS `.hero`, `.hero-content`, `.hero-visual`, `.hero-visual-card`, `.terminal-content`, `.mac-buttons`, `.pulse-dot`, `@keyframes pulse` + JS `typeTerminalLine()` |
| Archivos tocados | `landing/index.html` líneas 70-179 | `landing/css/Styles.css` + `<script>` interim o `js/hero-terminal.js` |
| Validación visual | El HTML debe ser semánticamente correcto | El CSS debe renderizar con glass-panel + glow; el JS debe animar el terminal |

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 70-179 (hero + stats strip) con nueva estructura basada en `NEW/index.html` 58-107.
- Preservación verbatim de:
  - Badge: "Tecnología de Clase Mundial".
  - H1: "No solo servicios. Construimos **tecnología.**" (la palabra "tecnología" sigue con `text-gradient` o equivalente).
  - Subtítulo completo (párrafo actual).
  - CTA primary: "Hablemos de tu Proyecto" → `https://wa.me/523327633233`.
  - CTA secondary: "Ver Productos" → `#productos`.
  - 4 stats del strip: 360° / 100% / 24/7 / Calidad (con sus labels exactos).
- Reemplazo del icono Material Symbols `rocket_launch` por un SVG inline coherente con el estilo del `.section-tag` del nuevo estilo.
- Mantenimiento de Font Awesome para el icono `fa-whatsapp` (no se reemplaza).

### 4.2 Lo que NO está en el scope

- **NO** se modifica el `<head>` ni la apertura `<body>` (eso fue EPIC 01/PART 02).
- **NO** se añade CSS al `Styles.css` (eso es PART 02).
- **NO** se añade el script de animación del terminal (eso es PART 02).
- **NO** se modifica el resto del body (`<nosotros>`, servicios, etc.).
- **NO** se移植 el cotizador ni el simulador del landing nuevo (fuera de scope del packet).

---

## 5. UX Problems

### UX-P7 — Chips decorativos redundantes con hero-badges
Los 4 chips actuales (líneas 89-101) son decorativos: "Software Development", "AI Tools", "UI Frameworks", "SaaS Products". Las 4 stats del strip (360°, 100%, 24/7, Calidad) tienen función informativa real. Mantener ambos sería redundante. **Decisión del planner:** reemplazar los 4 chips por las 4 stats en formato `.hero-badges`.

### UX-P8 — Visual con anillos + floating nodes pierde contexto de marca
Los 4 floating nodes (Software, Redes, Seguridad, UX/UI) son abstractos y no comunican nada concreto. El terminal visualizer con comandos reales de Keorsoft/REASP es **más informativo y memorable**.

### UX-P9 — `<br>` dentro del H1 puede romper line-height en algunos navegadores
Línea 83: `No solo servicios.<br>Construimos <span class="text-gradient">tecnología.</span>`. El `<br>` forzado puede dar layouts inconsistentes en mobile. **Decisión del planner:** mantener el `<br>` (es lo que el usuario diseñó originalmente) y usar `line-height: 1.1` (ya en `.hero-title`).

---

## 6. Backend / Logic Problems

N/A — este PART es puramente markup.

---

## 7. Frontend / Presentation Problems

### Front-P8 — `min-h-[90vh]` con Tailwind arbitrary value
Línea 70: `class="hero-section pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden flex items-center min-h-[90vh]"`. El `min-h-[90vh]` requiere Tailwind JIT. Al移植 a CSS explícito, usar `.hero { min-height: 90vh; }`.

### Front-P9 — `aspect-square` con Tailwind para center piece
Línea 115: `<div class="w-full max-w-[500px] aspect-square relative ...">`. `aspect-square` requiere Tailwind. En CSS: `.hero-visual-figure { aspect-ratio: 1 / 1; }`.

### Front-P10 — `text-[color:var(--txt-1)]` syntax es válido pero verboso
Línea 82: `class="text-4xl ... text-[color:var(--txt-1)]"`. Esta sintaxis (Tailwind v3 arbitrary value con `var()`) funciona pero genera CSS muy verbose. En el nuevo estilo, el color del H1 viene de `.hero-title` directamente con `background-clip: text`.

### Front-P11 — `style="background:linear-gradient(...)"` inline para anillos decorativos
Líneas 117-119: anillos con `border-slate-300/30`, `border-blue-400/30`, `border-purple-400/30` rotando. Estos se移植 al CSS del hero-visual-figure o se eliminan (ya no aplica porque el visual se reemplaza por terminal).

### Front-P12 — `style="animation-delay:1s"` etc. inline
Líneas 133, 138, 143: `style="animation-delay:1s"` para floating nodes. Al eliminar los floating nodes, esto desaparece.

---

## 8. Technical Debt

### TD-8 — IDs implícitos por position en hero visual
El bloque visual del hero (líneas 114-148) tiene 4 floating nodes en posiciones hardcoded (`top-[10%] left-[10%]`, `bottom-[15%] right-[5%]`, etc.). Si el usuario decide en el futuro cambiar el visual, estos magic numbers son difíciles de ajustar. **Resuelto por este PART**: el visual se reemplaza por terminal, no hay más magic numbers.

### TD-9 — `animate-float` keyframe (líneas 437-440 de Styles.css) usado solo en hero
Tras eliminar los floating nodes, `@keyframes float` ya no se usa en el hero. EPIC 02-08 puede mantenerlo por si se reutiliza en otros lugares (cards de productos, etc.) o eliminarlo en una pasada de limpieza posterior. **Decisión:** mantener en `Styles.css` (no es regression).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-15:** Reemplazar las **83 líneas** (70-152) del hero actual con la nueva estructura basada en `NEW/index.html` 58-107 — verificable con `(Get-Content landing/index.html)[69..151].Count` antes y `wc -l landing/index.html` después (la línea total debe ser ~85-100, reemplazando ~83 líneas).
- **RI-16:** Reemplazar las **26 líneas** (154-179) del stats strip con el formato `.hero-badges` integrado en el hero — verificable con `grep -c "stats-strip" landing/index.html` que devuelve `0`.
- **RI-17:** Preservar verbatim el **badge superior "Tecnología de Clase Mundial"** dentro de un `<div class="section-tag">` — verificable con `grep -c "Tecnología de Clase Mundial" landing/index.html` que devuelve `1`.
- **RI-18:** Preservar verbatim el **H1 "No solo servicios. Construimos tecnología."** con `.text-gradient` o equivalente aplicado a "tecnología" — verificable con `grep -E "No solo servicios" landing/index.html` que devuelve `1` y `grep -E "tecnología" landing/index.html` que devuelve ≥ 2 (una en el `<span>` con gradient).
- **RI-19:** Preservar verbatim el **subtítulo completo** sobre Keorsoft — verificable con `grep -c "Keorsoft es una empresa de tecnología enfocada en crear soluciones de software de escritorio y web" landing/index.html` que devuelve `1`.
- **RI-20:** Preservar el **CTA WhatsApp** apuntando a `https://wa.me/523327633233` con texto "Hablemos de tu Proyecto" — verificable con `grep -c "wa.me/523327633233" landing/index.html` que devuelve ≥ 1 y `grep -c "Hablemos de tu Proyecto" landing/index.html` que devuelve `1`.
- **RI-21:** Preservar el **CTA "Ver Productos"** apuntando a `#productos` — verificable con `grep -c 'href="#productos"' landing/index.html` que devuelve ≥ 1 y `grep -c "Ver Productos" landing/index.html` que devuelve `1`.
- **RI-22:** Reemplazar el icono Material Symbols `rocket_launch` (línea 79) por un **SVG inline** dentro del `.section-tag` — verificable con `grep -c "rocket_launch" landing/index.html` que devuelve `0` y `grep -c '<svg' landing/index.html` que devuelve ≥ 1.
- **RI-23:** Integrar las **4 stats del strip** (360°, 100%, 24/7, Calidad) como `.hero-badges` con `.badge-val` + `.badge-lbl` — verificable con `grep -E "(360°|100%|24/7)" landing/index.html` que devuelve ≥ 3 matches y `grep -c "Calidad" landing/index.html` que devuelve ≥ 1 (también aparece en footer, por eso ≥ 1).
- **RI-24:** Reemplazar el **bloque visual de anillos + floating nodes** (líneas 114-148) por el **terminal visualizer** con `mac-buttons`, `pulse-dot`, y `terminal-content` — verificable con `grep -c "animate-float" landing/index.html` que devuelve `0` y `grep -c 'id="termContent"' landing/index.html` que devuelve `1`.
- **RI-25:** Mantener el `id="inicio"` en el `<section>` para preservar el anchor del nav (`href="#inicio"` en línea 21) — verificable con `grep -c 'id="inicio"' landing/index.html` que devuelve `1`.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 70-179** (reemplazo total, 110 líneas → ~95 líneas):

Estructura nueva propuesta:

```html
<!-- ══ HERO ══════════════════════════════════════════════════════ -->
<section id="inicio" class="hero" style="padding-top:8rem; padding-bottom:5rem;">
  <!-- Background glow mesh -->
  <div class="bg-glow-container">
    <div class="bg-glow-1"></div>
    <div class="bg-glow-2"></div>
    <div class="bg-glow-3"></div>
  </div>
  <div class="bg-grid"></div>

  <div class="hero-content">
    <div class="section-tag">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
      Tecnología de Clase Mundial
    </div>
    <h1 class="hero-title">
      No solo servicios.<br>Construimos <span class="hero-title-accent">tecnología.</span>
    </h1>
    <p class="hero-subtitle">
      Keorsoft es una empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI propietarios y productos SaaS que transforman industrias.
    </p>
    <div class="hero-buttons">
      <a href="https://wa.me/523327633233" target="_blank" class="btn btn-primary">
        <i class="fa-brands fa-whatsapp"></i>
        Hablemos de tu Proyecto
      </a>
      <a href="#productos" class="btn btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        Ver Productos
      </a>
    </div>
    <div class="hero-badges">
      <div class="badge">
        <span class="badge-val">360°</span>
        <span class="badge-lbl">Soluciones Integrales</span>
      </div>
      <div class="badge">
        <span class="badge-val">100%</span>
        <span class="badge-lbl">Adaptado a Pymes</span>
      </div>
      <div class="badge">
        <span class="badge-val">24/7</span>
        <span class="badge-lbl">Infraestructura Segura</span>
      </div>
      <div class="badge">
        <span class="badge-val">Calidad</span>
        <span class="badge-lbl">Diseño &amp; Rendimiento</span>
      </div>
    </div>
  </div>
  <div class="hero-visual">
    <div class="hero-glow-sphere"></div>
    <div class="hero-visual-card glass-panel">
      <div class="card-header">
        <div class="mac-buttons">
          <span class="mac-btn close"></span>
          <span class="mac-btn min"></span>
          <span class="mac-btn max"></span>
        </div>
        <div class="card-title">
          <span class="pulse-dot"></span>
          keorsoft-agent-terminal
        </div>
        <div style="width: 40px;"></div>
      </div>
      <div class="terminal-content" id="termContent">
        <!-- Populated by hero-terminal.js (interim) or js/main.js (EPIC 09) -->
      </div>
    </div>
  </div>
</section>
```

### 10.2 Decisión de ubicación del script

**Decisión del planner:** crear archivo interim `landing/js/hero-terminal.js` que EPIC 09 consolida en `js/main.js`. Justificación:
- Permite probar el hero de forma aislada.
- Reduce el riesgo de regresión en otros handlers (mobile menu, form).
- El interim se documenta como `// TODO EPIC 09: consolidar en js/main.js`.

### 10.3 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Resto de `landing/index.html` (líneas 1-69 y 180+).

---

## 11. Automated Test Plan

### AT-13 — Verificación de copy preservado
- **Comando:** `grep -c "Tecnología de Clase Mundial" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0` (badge eliminado) o `>1` (duplicado).

### AT-14 — Verificación de H1 preservado
- **Comando:** `grep -E "No solo servicios" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0` o H1 con texto diferente.

### AT-15 — Verificación de gradient en "tecnología"
- **Comando:** `grep -E "tecnología" landing/index.html | wc -l`.
- **Pass criteria:** ≥ 2 (un match en `<span class="hero-title-accent">tecnología.</span>`, otro en subtítulo).
- **Fallo:** < 2.

### AT-16 — Verificación de CTA WhatsApp
- **Comando:** `grep -c "wa.me/523327633233" landing/index.html`.
- **Pass criteria:** ≥ 1.
- **Fallo:** `0` (CTA roto).

### AT-17 — Verificación de CTA Ver Productos
- **Comando:** `grep -c 'href="#productos"' landing/index.html`.
- **Pass criteria:** ≥ 1.
- **Fallo:** `0` (CTA roto).

### AT-18 — Verificación de iconos Material Symbols eliminados del hero
- **Comando:** `grep -E "rocket_launch|inventory_2" landing/index.html | wc -l`.
- **Pass criteria:** `0` (específicamente para los iconos del hero).
- **Fallo:** `> 0` (iconos no reemplazados).

### AT-19 — Verificación de terminal visualizer presente
- **Comando:** `grep -c 'id="termContent"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-20 — Verificación de stats integradas como hero-badges
- **Comando:** `grep -E "(360°|100%|24/7|Calidad)" landing/index.html | wc -l`.
- **Pass criteria:** ≥ 4 matches (4 stats) + 1 footer ("Calidad" puede aparecer en otro lado).
- **Fallo:** < 4.

### AT-21 — Verificación de anchor `#inicio` preservado
- **Comando:** `grep -c 'id="inicio"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0` (nav link roto).

### AT-22 — Verificación de no-regresión en REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-23 — Validación HTML5 sintáctica
- **Comando:** inspección manual de las primeras 5 líneas del `<section id="inicio">` y las últimas 5 — todos los tags se cierran correctamente.
- **Pass criteria:** No hay tags不平衡.
- **Fallo:** HTML inválido (afecta Lighthouse SEO).

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-18:** Abrir `landing/index.html` en Chrome 120+ y verificar que el hero se ve con fondo dark, badge "Tecnología de Clase Mundial" arriba, H1 con gradient en "tecnología", subtítulo, 2 botones, 4 badges con stats, y terminal visualizer a la derecha.
- [ ] **MV-19:** Verificar que el H1 dice literalmente "No solo servicios. Construimos tecnología." (sin typos).
- [ ] **MV-20:** Click en "Hablemos de tu Proyecto" abre `https://wa.me/523327633233` en nueva pestaña.
- [ ] **MV-21:** Click en "Ver Productos" hace scroll suave a la sección `#productos` (anchor link funcional).
- [ ] **MV-22:** Las 4 stats (360°, 100%, 24/7, Calidad) están visibles como `.hero-badges` con sus labels debajo.
- [ ] **MV-23:** El terminal visualizer tiene 3 mac-buttons (rojo, amarillo, verde), un título "keorsoft-agent-terminal" con pulse-dot verde, y un área de contenido (vacía por ahora hasta que PART 02 cargue el script).
- [ ] **MV-24:** El badge superior tiene un icono SVG (no texto literal "rocket_launch").
- [ ] **MV-25:** Renderizar en DevTools > iPhone 12 Pro (390×844): el hero sigue siendo legible, el terminal puede colapsar o mantenerse (validar visualmente).
- [ ] **MV-26:** Renderizar en DevTools > iPad (768×1024): el layout pasa de 2 columnas a 1 columna.
- [ ] **MV-27:** DevTools > Lighthouse > Generate report: Performance ≥ baseline (85), Accessibility ≥ 95, SEO ≥ 95.
- [ ] **MV-28:** DevTools > Console: 0 errores. Warnings aceptables: ninguno relacionado con hero.

---

## 13. Technical Documentation to produce

### TD-Output-4 — Comentarios de sección en `landing/index.html`

Cada bloque nuevo tiene cabecera:
```html
<!-- ══ HERO · EPIC 02 PART 01 ══════════════════════════════════════════════ -->
<!-- Reemplaza hero anterior (Tailwind utility soup + 4 floating nodes) -->
<!-- Terminal visualizer animado se carga via hero-terminal.js (PART 02) -->
```

### TD-Output-5 — Comentario en `hero-terminal.js` (cuando se cree)

Cabecera del archivo:
```js
/**
 * Hero Terminal Auto-typing Animation
 * Interim script for EPIC 02 PART 02 — consolidado en js/main.js en EPIC 09
 * Source of truth: KeorsoftLandingNEW/app.js líneas 22-69
 * Comandos personalizados para Keorsoft/REASP
 */
```

---

## 14. User Documentation to produce

### UD-Output-5 — Mensaje de commit sugerido

```
feat(landing): rediseñar hero con terminal visualizer y hero-badges

- Reemplaza hero anterior (Tailwind + 4 floating nodes) con estructura
  basada en el estilo nuevo de KeorsoftLandingNEW.
- Mantiene copy verbatim del usuario (badge, H1, subtítulo, CTAs).
- Integra las 4 stats del strip como hero-badges (360°, 100%, 24/7, Calidad).
- Reemplaza icono Material Symbols rocket_launch por SVG inline.
- Prepara el terreno para el terminal auto-typing animado (EPIC 02 PART 02).

Refs: .refi/modules/keorsoft-landing-redesign/epics/02-hero-stats/
```

### UD-Output-6 — Nota sobre el terminal "vacío"

Tras este PART, el `<div id="termContent">` aparece vacío hasta que PART 02 añada el script. Se documenta como estado intermedio esperado.

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-22:** `landing/index.html` contiene el H1 "No solo servicios. Construimos **tecnología.**" verbatim.
- **AC-23:** El badge superior dice "Tecnología de Clase Mundial" verbatim.
- **AC-24:** El subtítulo contiene el párrafo completo "Keorsoft es una empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI propietarios y productos SaaS que transforman industrias.".
- **AC-25:** El CTA "Hablemos de tu Proyecto" apunta a `https://wa.me/523327633233` con `target="_blank"`.
- **AC-26:** El CTA "Ver Productos" apunta a `#productos`.
- **AC-27:** El `<section id="inicio">` está presente y mantiene el anchor (para que el nav link funcione).
- **AC-28:** Los 4 chips decorativos (Software Development, AI Tools, UI Frameworks, SaaS Products) **ya no aparecen** en el hero.
- **AC-29:** Las 4 stats (360°, 100%, 24/7, Calidad) están presentes como `.hero-badges` con sus `.badge-val` y `.badge-lbl`.
- **AC-30:** El icono `rocket_launch` (Material Symbols) está reemplazado por un `<svg>` inline dentro del `.section-tag`.
- **AC-31:** El bloque visual de anillos + floating nodes está reemplazado por `<div class="hero-visual">` con `<div class="hero-visual-card glass-panel">` conteniendo `<div id="termContent">`.
- **AC-32:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío (cero regresión).
- **AC-33:** DevTools > Console en Chrome 120+ NO muestra errores JavaScript ni warnings de HTML inválido.
- **AC-34:** El comando `grep -c "cdn.tailwindcss.com" landing/index.html` retorna `0` (Tailwind sigue eliminado del EPIC 01 anterior).
- **AC-35:** El comando `grep -c "animate-float" landing/index.html` retorna `0` (floating nodes eliminados).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** El markup移植 de `NEW/index.html` 58-107 sin desviaciones estructurales. Las clases usadas (`.hero`, `.hero-content`, `.hero-visual`, `.section-tag`, `.btn-primary`, `.hero-badges`, `.badge`) están todas definidas en el nuevo `Styles.css` (EPIC 01 PART 02) o se移植 en PART 02.
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy preservado verbatim (badge, H1, subtítulo, 2 CTAs, 4 stats). 4 chips decorativos eliminados. Stats strip `<section>` separado eliminado. Bloque visual de anillos + floating nodes reemplazado por terminal.
- [ ] **Gate 3 — UX/Design Review:** UX-P7 (chips redundantes), UX-P8 (visual abstracto), UX-P9 (`<br>` en H1) resueltos según §5. Decisión sobre gradient en "tecnología" confirmada (.hero-title-accent class o equivalente).
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado con tickboxes. `grep` confirma todos los comandos de §11 con resultados esperados. DevTools Console 0 errores.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este mismo PART. Si AC-33 falla (errores en consola), investigar tags不平衡 y corregir.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera en `landing/index.html` (§13.1) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre terminal vacío (§14.2) comunicada al usuario antes de commit.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión en `landing/REASP/` ni `landing/RACSP/`. Firma del footer.

**Firma:** ______________  **Fecha:** ______________