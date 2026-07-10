# PART 01 — Migration Audit (Style Foundation)

> **EPIC:** 01-style-foundation
> **Slug:** `migration-audit`
> **Prioridad:** P0 (bloqueante)
> **Depende de:** —
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Producir un **inventario ejecutable y verificable** de todo lo que debe migrarse desde el estilo actual (`landing/css/Styles.css` + `<head>` de `landing/index.html`) hacia el estilo nuevo basado en `KeorsoftLandingNEW/styles.css`, **antes** de tocar ningún archivo. Este inventario se materializa en `epics/01-style-foundation/audit-inventory.md` y es prerrequisito de EPIC 01/PART 02.

---

## 2. Current State

### 2.1 `landing/css/Styles.css` (464 líneas, leídas en Pass 1)

Bloques identificados (líneas exactas):

| Líneas | Bloque | Función |
|--------|--------|---------|
| 1-3 | Cabecera del archivo | Comentario "Keorsoft Landing — Light/Dark Theme" |
| 5-38 | `:root { ... }` | Tokens semánticos light theme (`--bg-1`, `--txt-1`, `--kr-blue`, etc.) |
| 40-58 | `[data-theme="dark"] { ... }` | Override de tokens para dark theme |
| 61-69 | `html / body` base | `scroll-behavior`, `font-family: var(--font)`, transición de tema |
| 72-73 | `.section-main / .section-alt` | Background alterno |
| 76-79 | `::-webkit-scrollbar` | Scrollbar custom 6px |
| 82-95 | `.material-symbols-rounded` | Clase para iconos Material Symbols (font-variation-settings) |
| 98-103 | `.text-gradient` | Degradado azul→violeta en texto |
| 106-128 | `.nav-pill / .pill-nav-link` | Nav flotante con pill, theme toggle (NO移植 al estilo nuevo) |
| 131-180 | `.hero-section / .hero-bg-orb / .hero-badge / .btn-primary / .btn-secondary / .scroll-reveal` | Hero + CTAs + reveal animation |
| 182-242 | `.service-card / .sc-icon / .about-card / .value-item` | 7 service-cards + 4 about-cards |
| 257-310 | `.product-card / .badge*` | 5 product-cards + 3 badges (`badge-internal`, `badge-live`, `badge-oss`) |
| 312-356 | `.feature-row / .oss-card / .oss-badge` | Filas de features + OSS cards |
| 359-410 | `.contact-info-item / .contact-form-wrapper / .form-input / .social-icon` | Contacto |
| 413-427 | `.footer / .footer-link` | Footer |
| 430-443 | `.stats-strip / @keyframes float / .animate-float` | Stats strip + animación float |
| 446-463 | `#mobile-menu / @media (max-width: 768px)` | Mobile menu + responsive |

### 2.2 `<head>` de `landing/index.html` (líneas 1-15, leídas en Pass 1)

```html
<!DOCTYPE html>
<html lang="es" class="scroll-smooth" data-theme="dark">       <!-- línea 2 -->
<head>
  <meta charset="UTF-8">                                         <!-- línea 3 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- línea 4 -->
  <title>Keorsoft — Tecnología que Impulsa tu Negocio</title>   <!-- línea 5 -->
  <meta name="description" content="Keorsoft es una empresa..."> <!-- línea 6 -->
  <script src="https://cdn.tailwindcss.com"></script>            <!-- línea 8 · ELIMINAR -->
  <link rel="preconnect" href="https://fonts.googleapis.com">    <!-- línea 9 -->
  <link href="...Inter...wght@400;500;600;700;800&family=Plus+Jakarta+Sans...">  <!-- línea 10 · REEMPLAZAR -->
  <link href="...Material+Symbols+Rounded...">                   <!-- línea 11 · ELIMINAR -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/.../font-awesome/6.5.1/...">  <!-- línea 12 · MANTENER -->
  <link rel="stylesheet" href="css/Styles.css">                  <!-- línea 13 · MANTENER -->
</head>
<body class="antialiased selection:bg-blue-500 selection:text-white">  <!-- línea 15 · LIMPIAR -->
```

### 2.3 Dependencias externas activas

| URL | Peso aprox. | Acción |
|-----|-------------|--------|
| `cdn.tailwindcss.com` (línea 8) | ~3 MB (JS + JIT runtime, no purgado) | **ELIMINAR** |
| `fonts.googleapis.com` Inter + Plus Jakarta Sans (línea 10) | ~50 KB | **REEMPLAZAR** por Inter + Outfit + Fira Code |
| `Material Symbols Rounded` (línea 11) | ~150-300 KB (variable font con 5 ejes) | **ELIMINAR** (decisión D4) |
| `cdnjs.cloudflare.com/.../font-awesome/6.5.1/...` (línea 12) | ~75 KB | **MANTENER** (solo `fa-whatsapp`, `fa-linkedin-in`, `fa-facebook-f`, `fa-instagram`, `fa-github`) |

### 2.4 Iconografía Material Symbols en uso (65+ ocurrencias detectadas por inspección)

Las categorías principales (verificación exacta pendiente en Gate 4):
- **Hero:** `rocket_launch`, `code`, `smart_toy`, `palette`, `cloud`, `verified`
- **About:** `corporate_fare`, `target`, `flag`, `stars`, `lightbulb`, `award_star`, `developer_mode`
- **Services:** `code_blocks`, `router`, `shield_lock`, `smart_toy`, `terminal`, `account_tree`, `layers`, `sync_alt`, `domain`
- **Products:** `auto_awesome_mosaic`, `widgets`, `cloud`, `hotel`, `memory`, `hub`
- **Open Source:** `memory`, `hub`, `groups`
- **Contacto:** `call`, `mail`, `location_on`, `send`, `check_circle`
- **Footer:** `location_on`, `mail`, `call`
- **Misc:** `menu`, `favorite`, `check`, `check_circle`

**Conteo exacto** se obtiene con `grep -oE 'material-symbols-rounded[^>]*>[a-z_]+' landing/index.html | wc -l` — se ejecuta durante este PART.

### 2.5 `<script>` inline (líneas 849-942, 94 líneas)

Bloques identificados:
- Theme toggle (líneas 850-867): `getElementById('theme-toggle')`, `setAttribute('data-theme', ...)`.
- Mobile menu (líneas 870-886): toggle de `#mobile-menu`.
- Scroll reveal (líneas 889-899): `IntersectionObserver` sobre `.scroll-reveal`.
- Active nav highlight (líneas 902-923): observación de `section[id]` y toggle `.active` en `.pill-nav-link`.
- Contact form (líneas 925-941): `submit` handler con simulación 1s + banner success 5s.

### 2.6 Bloque `<script src="https://cdn.tailwindcss.com">`

Tailwind v3 JIT runtime carga ~3 MB de JS no purgado. Cualquier utility class usada en el body (`flex`, `grid`, `gap-X`, `text-Y`, `bg-Z`, etc.) requiere Tailwind presente. Al eliminar Tailwind, **todos** los utility classes del body deben convertirse a CSS explícito en `Styles.css`.

---

## 3. Comparison against baseline

Comparación línea-a-línea contra `KeorsoftLandingNEW/styles.css` (1487 líneas, leído en Pass 1).

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (`Styles.css`) | Nuevo (`NEW/styles.css`) | Migración |
|---------|----------------------|--------------------------|-----------|
| Tema | Dual light/dark con toggle JS | Dark-only | Asumido dark-only (confirmar Gate A) |
| Reset | Mínimo (`*, *::before, *::after { box-sizing }`) | Completo (líneas 32-51) | Adoptar completo |
| Tipografía | 2 fuentes (Inter + Plus Jakarta Sans) | 3 fuentes (Inter + Outfit + Fira Code) | Adoptar Inter + Outfit + Fira Code |
| Display font | Plus Jakarta Sans | Outfit | Reemplazar |
| Tokens semánticos | 14 tokens con prefijo `--kr-*`, `--em`, `--in`, etc. | 5 accents (indigo/cyan/emerald/purple/rose) + bg/text/border | **Migración parcial**: importar 5 accents, eliminar prefijo `--kr-*` |
| Componentes | 1 utility soup Tailwind + clases semánticas | 1 sistema `.glass-panel` + componentes específicos (`btn-primary`, `pillar-card`, etc.) | Eliminar Tailwind,移植 classes específicas |
| Background | Gradientes simples (`.hero-section`) | Glow orb mesh + grid overlay (`bg-glow-container`, `bg-grid`) | Adoptar glow mesh |
| Iconografía | Material Symbols Rounded (variable font) | SVG inline en HTML | Reemplazar iconos por SVG inline |
| Animaciones | 1 keyframe `float` | 5 keyframes (`floatGlow1/2/3`, `pulse`, `breatheSphere`, `dotFlash`) | Adoptar las que apliquen a componentes移植 |
| Responsive | 1 breakpoint (768px) | 3 breakpoints (1024, 768, mobile-first) | Adoptar 3 breakpoints |

### 3.2 Mapeo de tokens `:root` (línea-a-línea)

**Actual (líneas 5-38):**
```css
:root {
  --kr-blue: #0E98F8; --kr-blue-mid: #51B1FB; --kr-blue-pale: #C3D9F0;
  --em: #10B981; --am: #F59E0B; --in: #6366F1; --vi: #8B5CF6; --or: #F97316;
  --bg-1: #f8fafc; --bg-2: #ffffff; --bg-3: #f1f5f9;
  --card: #ffffff; --card-border: rgba(0,0,0,.08); --card-hover: rgba(0,0,0,.04);
  --txt-1: #0f172a; --txt-2: #475569; --txt-3: #64748b;
  --nav-bg: rgba(255,255,255,.85); --nav-border: rgba(0,0,0,.08);
  --hero-from: #f0f4ff; --hero-mid: #e0e7ff; --hero-to: #dbeafe;
  --font: 'Inter'; --font-display: 'Plus Jakarta Sans';
}
```

**Nuevo (líneas 3-29 de NEW/styles.css):**
```css
:root {
  --bg-primary: #05070a; --bg-secondary: #0b0f17; --bg-tertiary: #121824;
  --text-primary: #f8fafc; --text-secondary: #94a3b8; --text-muted: #64748b;
  --accent-indigo: #6366f1; --accent-cyan: #06b6d4; --accent-emerald: #10b981;
  --accent-purple: #a855f7; --accent-rose: #f43f5e;
  --border-light: rgba(255,255,255,0.06); --border-focus: rgba(99,102,241,0.4);
  --font-sans: 'Inter'; --font-display: 'Outfit'; --font-mono: 'Fira Code';
  --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --glow-shadow-cyan: 0 0 30px rgba(6, 182, 212, 0.15);
  --glow-shadow-indigo: 0 0 30px rgba(99, 102, 241, 0.15);
}
```

**Decisión de mapping:**

| Token actual | Token nuevo | Notas |
|--------------|-------------|-------|
| `--kr-blue: #0E98F8` | `--accent-indigo: #6366f1` | Cambio de azul corporativo a indigo (alinea con paleta Tailwind del landing actual y con identidad Keorsoft de MeridianUI) |
| `--em: #10B981` | `--accent-emerald: #10b981` | Idéntico |
| `--in: #6366F1` | `--accent-indigo: #6366f1` | Se fusiona con `--accent-indigo` |
| `--vi: #8B5CF6` | `--accent-purple: #a855f7` | Tono más vivo (de #8B5CF6 a #a855f7) |
| `--or: #F97316` | **NUEVO:** `--accent-orange: #F97316` | RACSP y badges naranja — no existe en NEW, se añade explícitamente |
| `--am: #F59E0B` | **NUEVO:** `--accent-amber: #F59E0B` | Cards amarillas (UX/UI design) — no existe en NEW |
| `--bg-1/2/3` | `--bg-primary/secondary/tertiary` | Renombrado |
| `--txt-1/2/3` | `--text-primary/secondary/muted` | Renombrado (3 niveles, igual semántica) |
| `--card / --card-border / --card-hover` | `--bg-tertiary + --border-light + rgba(255,255,255,0.04)` | Composiciones, no 1-a-1 |
| `--nav-bg / --nav-border` | `rgba(5, 7, 10, 0.7)` + `--border-light` | Compuesto en `.header` |
| `--font / --font-display` | `--font-sans / --font-display / + --font-mono` | Plus Jakarta Sans → Outfit, + Fira Code |

### 3.3 Clases移植 vs clases a eliminar

| Clase actual | Acción | Justificación |
|--------------|--------|---------------|
| `.text-gradient` | **移植** con ajuste de color (`#a5b4fc` + `--accent-cyan`) | Misma función semántica |
| `.btn-primary / .btn-secondary` | **移植** del NEW styles.css (líneas 286-325) | Reemplazo directo |
| `.scroll-reveal` | **移植** del actual styles.css (líneas 171-179) | Mismo comportamiento, sin cambios |
| `.material-symbols-rounded` | **ELIMINAR** | Iconografía reemplazada por SVG inline |
| `.pill-nav-link / .nav-pill` | **ELIMINAR** | Reemplazado por `.nav-link` + `.nav-menu` del NEW (líneas 211-235) |
| `[data-theme="dark"]` | **ELIMINAR** (dark-only) | Toggle removido (asumido) |
| `.service-card / .about-card / .product-card / .oss-card` | **REFACTORIZAR** con `.glass-panel` | Misma estructura visual, nuevo lenguaje |
| `.badge-internal / .badge-live / .badge-oss` | **MANTENER** estructura, ajustar colores a nuevos accents | Compatibilidad con badges de producto |
| `.contact-info-item / .contact-form-wrapper / .form-input` | **REFACTORIZAR** con glass-panel +移植 `.form-input` del NEW (líneas 1396-1414) | Misma función |
| `.social-icon / .footer-link / .stats-strip` | **REFACTORIZAR** | Adaptar a glass-panel style |
| `.hero-section / .hero-bg-orb / .orb-1 / .orb-2 / .hero-badge` | **REEMPLAZAR** por `.hero` + `.bg-glow-container` + `.section-tag` del NEW | Nuevo lenguaje de hero |
| `.animate-float` | **MANTENER** | Sin cambios |

### 3.4 Inventario de Tailwind utility classes en `landing/index.html`

Conteo aproximado por categoría (verificación exacta con grep en este PART):

| Categoría | Ejemplos | Estimación |
|-----------|----------|------------|
| Flexbox | `flex`, `flex-col`, `items-center`, `justify-center`, `justify-between` | ~120 |
| Grid | `grid`, `grid-cols-2`, `lg:grid-cols-3`, `gap-6`, `gap-8` | ~40 |
| Spacing | `p-X`, `m-X`, `mt-X`, `mb-X`, `px-X`, `py-X` | ~180 |
| Sizing | `w-X`, `h-X`, `max-w-X`, `min-h-X` | ~80 |
| Typography | `text-X`, `font-bold`, `font-extrabold`, `tracking-tight` | ~90 |
| Color | `bg-X`, `text-X` (color) | ~150 |
| Border | `border`, `border-X`, `rounded-X` | ~70 |
| Position | `fixed`, `absolute`, `relative`, `top-X`, `left-X` | ~30 |
| Responsive | `sm:`, `md:`, `lg:`, `xl:` | ~120 |
| Misc | `transition`, `hover:`, `overflow-hidden`, `aspect-square` | ~50 |

**Total estimado: ~930 utility classes.** Cada una se convierte en CSS explícito en el nuevo `Styles.css` o se elimina si era decoración duplicada.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope de este PART

- Auditar `landing/index.html` (945 líneas) + `landing/css/Styles.css` (464 líneas).
- Auditar `KeorsoftLandingNEW/styles.css` (1487 líneas) + `KeorsoftLandingNEW/index.html` (485 líneas) + `KeorsoftLandingNEW/app.js` (340 líneas).
- Producir `audit-inventory.md` con:
  - Inventario de iconos (con conteo exacto).
  - Inventario de fuentes y dependencias externas.
  - Inventario de Tailwind utility classes con conteo.
  - Inventario de bloques `<script>`.
  - Tabla de mapping de tokens (actual → nuevo).
  - Tabla de移植 de clases.
  - Lista de archivos a crear / modificar / eliminar.
  - Riesgos identificados durante la auditoría.

### 4.2 Lo que NO está en el scope

- No se modifica ningún archivo de producción en este PART.
- No se modifica `landing/REASP/**` ni `landing/RACSP/**`.
- No se toman decisiones de diseño (esas son en PART 02 y EPICs 02-09).

---

## 5. UX Problems

### UX-P1 — Toggle de tema en conflicto con el estilo nuevo
El landing actual tiene `<button id="theme-toggle">` (líneas 59-61) y atributos `data-theme="dark"` en `<html>` (línea 2). El estilo nuevo es dark-only. Mantener el toggle añade ~25 líneas de JS + ~30 líneas de CSS de override que se vuelven código muerto.

### UX-P2 — Navegación pill flotante compite con sticky nav
`.nav-pill` (líneas 106-114) flota centrada con `position: fixed; top: 0` y ancho intrínseco. El estilo nuevo usa `<header>` sticky full-width. Ambos patrones son válidos; el pill es más "premium" en desktop pero pierde espacio útil en mobile.

### UX-P3 — Material Symbols Rounded añade variable font innecesaria
La fuente Material Symbols Rounded (línea 11) es un variable font con 5 ejes (opsz, wght, FILL, GRAD) — overkill para ~65 iconos. Si se reemplaza por SVG inline, se eliminan ~300 KB y se gana en consistencia visual (los SVG se pueden tematizar con `currentColor`).

### UX-P4 — Hero badge usa estilo custom cuando hay section-tag semántico
El landing actual usa `.hero-badge` (líneas 142-147) con `background: rgba(14,152,248,.1)` y color `var(--kr-blue)`. El estilo nuevo usa `.section-tag` (NEW styles.css líneas 347-373) con soporte para 3 variantes (default indigo, `.cyan`, `.emerald`). Migrar reduce duplicación.

---

## 6. Backend / Logic Problems

N/A — este EPIC es puramente front-end estático. No hay backend. No hay lógica de negocio.

---

## 7. Frontend / Presentation Problems

### Front-P1 — Tailwind CDN no purgado añade ~3 MB al HTML
`cdn.tailwindcss.com` carga el JIT runtime completo de Tailwind v3, ~3 MB de JS, sin purga. Lighthouse Performance del landing actual es ~85 (mobile), afectado por este peso. Eliminación total esperada: +5-10 puntos en Lighthouse Performance.

### Front-P2 — Doble carga de Font Awesome via CSS y CSS-in-JS
Font Awesome 6.5.1 (línea 12) se carga como CSS completo (~75 KB). El landing solo usa 5 iconos: `fa-whatsapp`, `fa-linkedin-in`, `fa-facebook-f`, `fa-instagram`, `fa-github`. Alternativa: usar SVG inline (ya disponible en NEW).

### Front-P3 — `[data-theme="dark"]` aplica override completo que duplica tokens
`Styles.css` líneas 40-58 redefinen 11 tokens para dark mode. Si dark-only es la decisión, este bloque se elimina completamente.

### Front-P4 — `<body>` carga `class="antialiased selection:bg-blue-500 selection:text-white"`
Las clases de `<body>` (línea 15) requieren Tailwind. Al eliminar Tailwind, se deben移植 a CSS (o eliminarse si el reset global ya las cubre).

---

## 8. Technical Debt

### TD-1 — `Styles.css` es realmente un wrapper sobre Tailwind
Las 464 líneas de `Styles.css` definen solo componentes semánticos (cards, badges, forms). El layout real del body depende 100% de Tailwind utility classes. Migración correcta: el nuevo `Styles.css` debe incluir tanto los componentes移植 como los utility classes necesarios para reemplazar Tailwind.

### TD-2 — `scroll-behavior: smooth` está en `<html>` y también en CSS
Línea 2 (`<html class="scroll-smooth">`) y línea 62 (`html { scroll-behavior: smooth; }`). Redundancia menor pero detectable por linter.

### TD-3 — `transition: background 0.3s ease, color 0.3s ease` en body
Línea 68 añade transición global al body. Con dark-only, esta transición solo se usa una vez (en page load). Se puede eliminar.

### TD-4 — Inline styles en el `<head>` para Google Fonts
Las URLs de Google Fonts (líneas 10-11) están hardcoded como atributos `href` largos. Más mantenible: extraer a constante en CSS o a `preconnect` separado (ya están en líneas 9 y 11 hace preconnect, pero no para `fonts.gstatic.com`).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-1:** Inventariar las **65+ ocurrencias de `material-symbols-rounded`** en `landing/index.html` con su icono exacto (`grep -oE '>[a-z_]+</span>'`), agrupadas por sección, y proponer reemplazo SVG inline para cada una — verificable con diff en `landing/index.html` que muestre `<svg>` en lugar de `<span class="material-symbols-rounded">`.
- **RI-2:** Contar las **~930 utility classes de Tailwind** en `landing/index.html` con `grep -oE 'class="[^"]*"' landing/index.html | wc -l` (baseline) y tras PART 02 confirmar reducción ≥ 80 % — verificable con el mismo comando antes y después.
- **RI-3:** Documentar las **5 dependencias externas** (Tailwind CDN, Google Fonts, Material Symbols, Font Awesome, Styles.css) con peso en KB, URL, y acción (mantener / reemplazar / eliminar) — verificable con la tabla §2.3 de `audit-inventory.md`.
- **RI-4:** Producir **tabla de mapping de tokens `:root`** con las 22 entradas actuales y las 15 nuevas, marcando cada una como `direct / derivado / nuevo / eliminado` — verificable por inspección visual de la tabla.
- **RI-5:** Producir **tabla de移植 de clases** con 14+ entradas (clases actuales) y su contraparte en NEW styles.css, o marcarlas como `eliminar` con justificación — verificable por inspección visual.
- **RI-6:** Identificar y listar **todos los archivos a tocar** en PART 02 (`Styles.css`, `index.html` líneas específicas, posible `js/main.js`) con el rango exacto de líneas a modificar — verificable con `wc -l` antes y después.

---

## 10. Implementation Plan

### 10.1 Archivos a CREAR (este PART)

- **NEW FILE:** `epics/01-style-foundation/audit-inventory.md` — Inventario ejecutivo de ~300-500 líneas con todas las tablas y conteos de §3, §4 y §9.

### 10.2 Archivos a MODIFICAR (este PART)

- Ninguno. Este PART es solo de lectura + análisis + escritura del inventario.

### 10.3 Archivos a MODIFICAR (PART 02, dependiente)

- **MODIFICAR:** `landing/css/Styles.css` (464 líneas) → reemplazo completo con tokens移植 del NEW + componentes semánticos + utility classes para reemplazar Tailwind.
- **MODIFICAR:** `landing/index.html` líneas 1-15 (`<head>` y `<html>` tag) — eliminar Tailwind, ajustar fuentes, eliminar Material Symbols, limpiar `<body>` class.

### 10.4 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `KeorsoftLandingNEW/**` — fuente del estilo, no se modifica.

### 10.5 Comandos de auditoría (a ejecutar durante este PART)

```bash
# Conteo exacto de iconos Material Symbols
grep -oE 'material-symbols-rounded[^>]*>[a-z_]+' landing/index.html | wc -l

# Conteo de utility classes Tailwind (aproximado, incluye texto entrecomillado)
grep -oE 'class="[^"]+"' landing/index.html | wc -l

# Listado de archivos HTML en scope
Get-ChildItem -Path landing -Recurse -Filter *.html -Exclude REASP/*, RACSP/*

# Tamaño actual de Styles.css
(Get-Item landing/css/Styles.css).Length

# Conteo de variables CSS en el :root actual
Select-String -Path landing/css/Styles.css -Pattern '^\s+--' | Measure-Object
```

---

## 11. Automated Test Plan

### AT-1 — Validación sintáctica del inventario
- **Comando:** `grep -c "^|" audit-inventory.md | head -1` (debe ser > 30, indicando tablas presentes).
- **Pass criteria:** El inventario contiene al menos 5 tablas con la estructura de §2.1, §3.1, §3.2, §3.3, §3.4.
- **Fallo:** Faltan tablas críticas (tokens, classes, dependencias).

### AT-2 — Conteo exacto de iconos Material Symbols
- **Comando:** `grep -oE 'material-symbols-rounded[^>]*>[a-z_]+' landing/index.html | wc -l`.
- **Pass criteria:** Devuelve un número entre 60 y 80.
- **Fallo:** < 50 o > 100 (subconteo o sobrerregistro).

### AT-3 — Conteo de utility classes Tailwind (baseline)
- **Comando:** `grep -oE 'class="[^"]+"' landing/index.html | wc -l`.
- **Pass criteria:** Devuelve un número entre 800 y 1100.
- **Fallo:** < 500 (puede indicar que se subcontaron las clases multilínea).

### AT-4 — Verificación de archivos no tocados
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Output vacío.
- **Fallo:** Cualquier cambio en REASP/RACSP.

---

## 12. Manual Validation Checklist

Checklist a ejecutar manualmente por el revisor (Ryou Reviewer) durante Gate 4:

- [ ] **MV-1:** El archivo `epics/01-style-foundation/audit-inventory.md` existe y se puede abrir.
- [ ] **MV-2:** La tabla de tokens de §3.2 incluye las 22 entradas del `:root` actual.
- [ ] **MV-3:** La tabla de移植 de clases de §3.3 incluye al menos 14 entradas.
- [ ] **MV-4:** La tabla de dependencias de §2.3 incluye las 5 dependencias externas con URL exacta.
- [ ] **MV-5:** Cada icono listado en el inventario tiene un reemplazo SVG propuesto (o marcado como `mantener Material Symbols` con justificación).
- [ ] **MV-6:** Los riesgos RK1-RK8 del `request.md` están todos cubiertos o marcados como N/A con justificación.
- [ ] **MV-7:** El inventario NO propone ningún cambio en `landing/REASP/**` ni `landing/RACSP/**`.
- [ ] **MV-8:** El conteo de Material Symbols coincide entre `grep` (§AT-2) y el conteo manual en la tabla.

---

## 13. Technical Documentation to produce

### TD-Output-1 — `epics/01-style-foundation/audit-inventory.md`

Documento de ~300-500 líneas con:
1. Resumen ejecutivo (10 líneas).
2. Tabla de inventario de bloques CSS actuales (§2.1).
3. Tabla de dependencias externas (§2.3).
4. Listado categorizado de iconos Material Symbols en uso.
5. Tabla de mapping de tokens actual → nuevo (§3.2).
6. Tabla de移植 de clases (§3.3).
7. Estimación de utility classes Tailwind a reemplazar (§3.4).
8. Tabla de archivos a modificar en PART 02 (§10.3).
9. Lista de riesgos identificados durante auditoría.
10. Decisiones pendientes para confirmar en Gate A (consolidación 7→3 pilares, dark-only, etc.).

---

## 14. User Documentation to produce

### UD-Output-1 — Resumen del inventario en `audit-inventory.md`

Sección inicial de `audit-inventory.md` (primeras 10-15 líneas) escrita en lenguaje accesible para Kevin, no técnico:
- "Tu landing actual usa X fuentes, Y dependencias externas, Z iconos."
- "Migrar al estilo nuevo te costará ~A horas distribuidas en EPIC 01-09."
- "Eliminamos Tailwind (3 MB) y Material Symbols (300 KB), añadimos Outfit + Fira Code (~80 KB)."
- "Resultado neto: -3.2 MB de assets, +1 fuente (Fira Code para bloques de código)."

### UD-Output-2 — Preguntas de Gate A (referencia)

Copia de las preguntas del `request.md` §"Asunción explícita":
- ¿Dark-only o mantener toggle light/dark?
- ¿7 services → 3 pilares o mantener 7?
- ¿Iconos Material Symbols → SVG inline?

---

## 15. Acceptance Criteria

Cada criterio es **testable** (script, comando, inspección visual, o archivo específico).

- **AC-1:** El archivo `epics/01-style-foundation/audit-inventory.md` existe, tiene ≥ 300 líneas, y se abre sin error en VS Code / navegador.
- **AC-2:** El inventario lista exactamente las **5 dependencias externas** de §2.3 con su URL completa.
- **AC-3:** El inventario lista **≥ 60 iconos Material Symbols** con su nombre exacto y reemplazo SVG propuesto.
- **AC-4:** El inventario contiene la **tabla de mapping de tokens** de §3.2 con las 22 entradas del `:root` actual mapeadas 1-a-1 (o marcadas como `eliminar` con justificación).
- **AC-5:** El inventario contiene la **tabla de移植 de clases** de §3.3 con **≥ 14 entradas** y acción por clase.
- **AC-6:** El inventario documenta **≥ 800 utility classes de Tailwind** en `landing/index.html` (baseline antes de migración).
- **AC-7:** El inventario confirma explícitamente que `landing/REASP/**` y `landing/RACSP/**` quedan **intactos** (cero modificaciones).
- **AC-8:** El comando `git diff --stat landing/REASP/ landing/RACSP/` retorna **vacío** después de ejecutar este PART.
- **AC-9:** Las **3 preguntas de Gate A** (dark-only, 7→3 pilares, iconos) están copiadas verbatim del `request.md` en la sección §14 del inventario.
- **AC-10:** El inventario NO contiene ninguna propuesta de cambio en archivos `landing/REASP/**`, `landing/RACSP/**`, ni `KeorsoftLandingNEW/**` (verificable con `grep -E "(REASP/|RACSP/|KeorsoftLandingNEW/)" audit-inventory.md` que solo matchea en secciones de "no tocar" o referencias de fuente).

---

## Footer — 8 Quality Gates

> Las 8 puertas se firman al ejecutar el PART, en orden estricto. No se avanza a la siguiente sin cerrar la anterior.

- [ ] **Gate 1 — Architecture Review:** Tokens propuestos son coherentes con `KeorsoftLandingNEW/styles.css` líneas 3-29. No se introducen tokens que contradigan `rules/global-rules.md` §1-5.
- [ ] **Gate 2 — Scope & Completeness Audit:** Tabla `declared vs actual` revisada: las 22 entradas de `:root` actual están todas en el mapping; las 14+ clases移植 tienen destino claro.
- [ ] **Gate 3 — UX/Design Review:** UX-P1 a UX-P4 tienen propuesta de mitigación documentada. Las 3 preguntas de Gate A están explícitas.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado con tickboxes. `git diff` confirma cero cambios en producción. `grep` confirma conteos de §11.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este mismo PART antes de cerrar.
- [ ] **Gate 6 — Technical Documentation:** `audit-inventory.md` producido y completo según §13.
- [ ] **Gate 7 — User Documentation:** Resumen accesible para Kevin en §14.1 + preguntas de Gate A copiadas.
- [ ] **Gate 8 — Final Review & Sign-off:** Build 0 errores. Acceptance Criteria §15 releídos. Firma del footer.

**Firma:** ______________  **Fecha:** ______________