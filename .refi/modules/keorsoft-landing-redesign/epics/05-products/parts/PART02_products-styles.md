# PART 02 — Products Styles (Products · 5 cards)

> **EPIC:** 05-products
> **Slug:** `products-styles`
> **Prioridad:** P1
> **Depende de:** EPIC 05 PART 01 (Products Markup)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Añadir al `landing/css/Styles.css` los estilos para las 5 product-cards (glass-panel + top-bar preservado), el layout de grid 2-cols, los sub-elementos (`product-subcard`, `feature-row`, `product-card-footer`), las clases de syntax highlighting del code block de RACSP (11 clases `cb-*`), las clases CTA (`.btn-cta-purple`, `.btn-cta-orange`), y el badge `.badge-version`.

---

## 2. Current State

### 2.1 `landing/css/Styles.css` tras EPIC 04

Estado actual del archivo (después de EPIC 04):
- ~600-700 líneas (estimación tras EPIC 01-04).
- Contiene: `:root` con 16 tokens (incluidos `--accent-amber` y `--accent-orange`), reset CSS, tipografía base, `.glass-panel`, background glow + grid, `.btn-primary`, `.btn-secondary`, `.hero*`, `.terminal*`, `.about-card*`, `.pillar-card*`, `.sc-icon`, `.value-item`, `.feature-row`, `.badge*`.
- **NO contiene todavía:** `.products-grid`, `.product-card*`, `.product-subcard*`, `.racsp-codeblock*`, `.btn-cta-*`, `.badge-version`, `.cb-*` (syntax highlighting classes).

### 2.2 `landing/index.html` tras EPIC 05/PART 01

- `<section id="productos">` reescrito con 5 product-cards.
- Clases nuevas usadas: `.products-grid`, `.product-card`, `.product-card-wide`, `.product-card-wide-inner`, `.product-card-wide-content`, `.product-card-header`, `.product-card-title-row`, `.product-card-title-row-wrap`, `.product-card-title`, `.product-card-subtitle`, `.product-card-desc`, `.product-features`, `.product-features-grid`, `.feature-row`, `.product-card-footer`, `.product-subcard`, `.product-subcard-header`, `.product-subcard-icon`, `.product-subcard-title`, `.product-subcard-subtitle`, `.product-subcard-desc`, `.racsp-codeblock`, `.racsp-codeblock-overlay`, `.racsp-codeblock-header`, `.racsp-codeblock-title`, `.racsp-codeblock-code`, `.btn-cta-purple`, `.btn-cta-orange`, `.badge-version`, `.cb-comment`, `.cb-key`, `.cb-bool`, `.cb-status`, `.cb-agent-claude`, `.cb-agent-opencode`, `.cb-agent-gemini`.

### 2.3 Decisiones de EPIC 05/PART 01 que requieren CSS

- Token `--accent-orange: #F97316` (añadido en `:root` por EPIC 05/PART 01).
- `.product-card` con `--card-accent` (en lugar de `--c-bg` legacy) y top-bar `::before` con el color accent (preservando comportamiento de EPIC 03).
- Hover effect: translateY(-6px) + shadow 20/40 (consistente con EPIC 04).
- Layout grid 2-cols con RACSP full-width.
- Sub-card SHEndevour anidada con `background` ligeramente diferente.
- Code block RACSP con 11 clases `cb-*` para syntax highlighting semántico.
- 2 botones CTA con gradientes específicos (purple, orange).

---

## 3. Comparison against baseline

### 3.1 Clases nuevas vs移植

| Clase | Origen | Notas |
|-------|--------|-------|
| `.products-grid` | NUEVA (no en NEW styles.css) | Grid 2 cols, similar a `.pillars-grid` |
| `.product-card` | REFACTOR de actual | Glass-panel + top-bar |
| `.product-card-wide` | NUEVA | Reemplaza `lg:col-span-2` |
| `.product-card-header` | NUEVA | Layout flex con icono + título |
| `.product-card-title-row` | NUEVA | Layout flex con badge |
| `.product-card-title-row-wrap` | NUEVA | Variant con flex-wrap |
| `.product-card-title` | REFACTOR | font-weight 700, font-display |
| `.product-card-subtitle` | NUEVA | text-xs text-muted |
| `.product-card-desc` | REFACTOR | text-secondary |
| `.product-features` | NUEVA | Layout column con gap |
| `.product-features-grid` | NUEVA | Grid 2 cols para RACSP features |
| `.feature-row` | PRESERVAR (ya existe) | display flex con check icon |
| `.product-card-footer` | REFACTOR | text-xs con border-top |
| `.product-subcard` | NUEVA | Background nested card |
| `.product-subcard-header` | NUEVA | Layout flex icono + título |
| `.product-subcard-icon` | NUEVA | Caja 32×32 |
| `.product-subcard-title` | NUEVA | font-bold text-sm |
| `.product-subcard-subtitle` | NUEVA | text-xs text-muted |
| `.product-subcard-desc` | NUEVA | text-xs text-muted |
| `.racsp-codeblock` | NUEVA | Container con bg #050b18 |
| `.racsp-codeblock-overlay` | NUEVA | Gradient overlay blur |
| `.racsp-codeblock-header` | NUEVA | Mac-buttons + title |
| `.racsp-codeblock-title` | NUEVA | font-mono text-xs |
| `.racsp-codeblock-code` | NUEVA | `<pre>` con whitespace-pre-wrap |
| `.btn-cta-purple` | NUEVA | Gradiente indigo→violeta + shadow |
| `.btn-cta-orange` | NUEVA | Gradiente orange→naranja-claro + shadow |
| `.badge-version` | NUEVA | Badge con color naranja |
| `.cb-comment` | NUEVA | Syntax: comentarios |
| `.cb-key` | NUEVA | Syntax: keys YAML |
| `.cb-bool` | NUEVA | Syntax: valores booleanos |
| `.cb-status` | NUEVA | Syntax: valores status |
| `.cb-agent-claude` | NUEVA | Syntax: agent claude (azul) |
| `.cb-agent-opencode` | NUEVA | Syntax: agent opencode (verde) |
| `.cb-agent-gemini` | NUEVA | Syntax: agent gemini (púrpura) |

### 3.2 Syntax highlighting del code block

Actual usa Tailwind utilities hardcoded: `text-slate-500`, `text-orange-400`, `text-blue-400`, `text-green-400`, `text-purple-400`, `text-amber-300`, `text-emerald-400`.

**Decisión:** reemplazar con clases semánticas CSS que se移植 en `Styles.css`. Esto permite tematizar el syntax highlighting sin tocar el HTML.

```css
.cb-comment { color: #64748b; }     /* slate-500 → text-muted */
.cb-key { color: #fb923c; }         /* orange-400 → accent naranja claro */
.cb-bool { color: #fcd34d; }       /* amber-300 → accent amber */
.cb-status { color: #34d399; }     /* emerald-400 → accent emerald */
.cb-agent-claude { color: #60a5fa; }   /* blue-400 → accent azul claro */
.cb-agent-opencode { color: #4ade80; } /* green-400 → accent verde claro */
.cb-agent-gemini { color: #c084fc; }  /* purple-400 → accent púrpura claro */
```

### 3.3 Diferencia con `.about-card` de EPIC 03

- `.about-card` tiene top-bar de 4px y `padding: 2rem`.
- `.product-card` tiene top-bar de 4px (preservado) y `padding: 2rem` (32px).
- Ambas usan `--card-accent` para el top-bar.
- **Diferencia principal:** `.product-card` tiene estructura más compleja (header con icono + título + badge, footer con border-top).

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Añadir al `Styles.css` el bloque 8.Z con ~200 líneas:
  - `.products-grid` (grid 2 cols → 1 col en 1024px).
  - `.product-card` base + hover + variants (5 colors via `--card-accent`).
  - `.product-card-wide` + `.product-card-wide-inner` + `.product-card-wide-content`.
  - `.product-card-header`, `.product-card-title-row`, `.product-card-title`, `.product-card-subtitle`, `.product-card-desc`.
  - `.product-features` + `.product-features-grid`.
  - `.product-card-footer`.
  - `.product-subcard` + `.product-subcard-*`.
  - `.racsp-codeblock` + `.racsp-codeblock-*`.
  - `.btn-cta-purple` + `.btn-cta-orange`.
  - `.badge-version`.
  - 11 clases `.cb-*` para syntax highlighting.
- Responsive: `@media (max-width: 1024px) { .products-grid { grid-template-columns: 1fr; gap: 1.5rem; } }`.
- Verificar que `.feature-row` (preservado de EPIC 03) tiene estilo compatible con SVG inline.

### 4.2 Lo que NO está en el scope

- **NO** se modifica el markup del EPIC 05/PART 01.
- **NO** se modifica el resto del `<body>`.
- **NO** se consolidan scripts (EPIC 09).
- **NO** se unifica `.about-card` con `.product-card` (decisión de EPIC 11).

---

## 5. UX Problems

### UX-P35 — Code block con `bg-[#050b18]` (literal) puede no alinearse con el dark theme
El code block usa `#050b18` (más oscuro que `--bg-primary: #05070a`). **Decisión:** mantener literal (es contraste intencional para simular "terminal"). El código se ve más "profundo".

### UX-P36 — Gradientes de CTA buttons muy similares
`#6366F1 → #8B5CF6` (REASP) y `#F97316 → #FB923C` (RACSP) tienen misma estructura (color base → color más claro). **Decisión:** mantener estructura paralela (consistencia visual entre los 2 CTAs).

### UX-P37 — Hover de `.product-card` aplica a toda la card
El hover `-6px + shadow + border-color` se aplica a la card completa, lo cual puede ser extraño si el usuario hace hover sobre el botón CTA dentro de la card. **Decisión:** aceptar (es comportamiento estándar de cards interactivas).

### UX-P38 — `.racsp-codeblock-overlay` con `blur-2xl` puede ser pesado en mobile
El overlay con `filter: blur(2rem)` es costoso de renderizar en mobile. **Decisión:** mantener (es decoration, no afecta usabilidad). Si rendimiento es problema, se puede reducir a `blur(1rem)` en mobile en EPIC 11.

### UX-P39 — `.product-card-wide` con `lg:col-span-2` no es responsive automático
En mobile (< 1024px), el grid pasa a 1 col, pero `.product-card-wide` sigue intentando ocupar 2 cols. **Decisión:** añadir `grid-column: auto` en `@media (max-width: 1024px)` para reset.

---

## 6. Backend / Logic Problems

N/A — CSS únicamente.

---

## 7. Frontend / Presentation Problems

### Front-P39 — `.feature-row svg` color heredado
El SVG del check en `.feature-row` debe heredar color del parent. **Decisión:** `.feature-row svg { color: var(--card-accent); }` (similar a `.pillar-item svg` de EPIC 04).

### Front-P40 — `.btn-cta-purple` y `.btn-cta-orange` son muy similares
Ambos son botones con gradiente, padding 6×16×3×16, border-radius 12px, font-weight 700, hover translateY(-1px). **Decisión:** extraer valores compartidos a `.btn-cta` base + variants `.btn-cta-purple` / `.btn-cta-orange` con override de background y shadow.

### Front-P41 — `text-[color:var(--txt-1)]` en product-card-desc移植
El nuevo usa `color: var(--text-secondary)` directamente en CSS. Sin Tailwind dependency.

### Front-P42 — `bg-[color:var(--bg-3)]` en sub-card SHEndevour移植
Línea 490: `<div class="bg-[color:var(--bg-3)] ...">`. Sin Tailwind, se移植 a `.product-subcard` con `background: rgba(11, 15, 23, 0.6)` o similar.

### Front-P43 — `whitespace-pre-wrap` en `<pre>`移植
Mantener `white-space: pre-wrap` + `overflow-x: auto` en `.racsp-codeblock-code`.

### Front-P44 — `flex-wrap` en `.product-card-title-row-wrap`
Necesario para que los badges de RACSP ("Open Source" + "v2.0.0") se apilen si no caben en la misma línea.

---

## 8. Technical Debt

### TD-25 — `.product-card`残 vs `.about-card` divergen en detalles
Ambas son cards con top-bar y glass-panel, pero `.product-card` tiene más elementos internos (header, footer, sub-card). **Decisión:** mantenerlas separadas; unificación en EPIC 11.

### TD-26 — 11 clases `.cb-*` específicas del code block RACSP
Si en el futuro RACSP cambia o se elimina, estas 11 clases quedan como código muerto. **Aceptable:** el code block es un elemento crítico del branding de RACSP.

### TD-27 — `.btn-cta-purple` y `.btn-cta-orange` son duplicación parcial
Comparten 80% del estilo (padding, border-radius, hover). **Decisión:** extraer a `.btn-cta` base + variants en EPIC 11 si se considera necesario.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-77:** Añadir el **bloque 8.Z "Products · EPIC 05 PART 02"** al `Styles.css` con ~200 líneas que cubran `.products-grid`, `.product-card*`, `.product-subcard*`, `.racsp-codeblock*`, `.btn-cta-*`, `.badge-version`, y 11 `.cb-*` — verificable con `Select-String -Path landing/css/Styles.css -Pattern "^\.(product|racsp|cb-|btn-cta|badge-version)" | Measure-Object` que retorna ≥ 30 matches.
- **RI-78:** Asegurar que `.product-card` tiene `top-bar de 4px` con `--card-accent` (preservar comportamiento de EPIC 03) — verificable con `grep -A 3 "product-card::before" landing/css/Styles.css` que retorna `position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--card-accent)`.
- **RI-79:** Crear **`.btn-cta-purple` con gradiente `#6366F1 → #8B5CF6`** — verificable con `grep -A 5 "btn-cta-purple" landing/css/Styles.css` que retorna `background: linear-gradient(135deg, #6366F1, #8B5CF6)`.
- **RI-80:** Crear **`.btn-cta-orange` con gradiente `#F97316 → #FB923C`** — verificable con `grep -A 5 "btn-cta-orange" landing/css/Styles.css` que retorna `background: linear-gradient(135deg, #F97316, #FB923C)`.
- **RI-81:** Crear **`.badge-version` con color naranja** — verificable con `grep -A 3 "badge-version" landing/css/Styles.css` que retorna `background: rgba(249, 115, 22, 0.1); color: var(--accent-orange)`.
- **RI-82:** Crear **11 clases `.cb-*`** para syntax highlighting — verificable con `Select-String -Path landing/css/Styles.css -Pattern "^\.cb-" | Measure-Object` que retorna `≥ 11` matches.
- **RI-83:** Añadir **responsive `@media (max-width: 1024px)`** que resetee `.product-card-wide { grid-column: auto; }` — verificable con `grep -A 1 "max-width: 1024px.*product-card-wide\|product-card-wide.*max-width: 1024px" landing/css/Styles.css` que retorna match.
- **RI-84:** `.feature-row svg` hereda color de `--card-accent` — verificable con `grep -A 1 "feature-row svg" landing/css/Styles.css` que retorna `color: var(--card-accent)`.
- **RI-85:** Verificar que `.glass-panel` y `.sc-icon` (de EPICs anteriores) **NO se modifican** — verificable con `git diff landing/css/Styles.css` que solo muestra cambios en el bloque 8.Z.
- **RI-86:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` — verificable con `git diff --stat landing/REASP/ landing/RACSP/` vacío.

---

## 10. Implementation Plan

### 10.1 Bloque CSS a añadir al `Styles.css`

Bloque 8.Z (después del bloque 8.Y de EPIC 04):

```css
/* ============================================
   8.Z Products · EPIC 05 PART 02
   5 product-cards with glass-panel style.
   Token --accent-orange added to :root.
   RACSP code block: 11 .cb-* syntax classes.
   CTA buttons: .btn-cta-purple + .btn-cta-orange.
   ============================================ */

.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

.product-card {
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

.product-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-accent, var(--accent-indigo));
  opacity: 0.8;
  z-index: 1;
}

.product-card:hover {
  transform: translateY(-6px);
  background: rgba(11, 15, 23, 0.65);
  border-color: var(--card-accent, var(--accent-indigo));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.product-card-wide {
  grid-column: 1 / -1;
}

@media (max-width: 1024px) {
  .product-card-wide {
    grid-column: auto;
  }
}

.product-card-wide-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .product-card-wide-inner {
    flex-direction: row;
  }
}

.product-card-wide-content {
  flex: 0 0 66.666%;
}

.product-card-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.product-card-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  flex-wrap: wrap;
}

.product-card-title-row-wrap {
  flex-wrap: wrap;
}

.product-card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.product-card-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
}

.product-card-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.product-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.product-features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .product-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.product-card-footer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
}

/* Sub-card SHEndevour */
.product-subcard {
  background: rgba(11, 15, 23, 0.6);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.product-subcard-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.product-subcard-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.product-subcard-title {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.875rem;
}

.product-subcard-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.product-subcard-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
}

/* RACSP code block */
.racsp-codeblock {
  flex: 0 0 33.333%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-light);
  background: #050b18;
  padding: 1rem;
  position: relative;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
}

.racsp-codeblock-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, rgba(249, 115, 22, 0.05), rgba(245, 158, 11, 0.1));
  filter: blur(2rem);
  pointer-events: none;
}

.racsp-codeblock-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.racsp-codeblock-title {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  color: var(--text-muted);
}

.racsp-codeblock-code {
  font-family: var(--font-mono);
  font-size: 0.625rem;
  line-height: 1.5;
  color: #c9d1d9;
  position: relative;
  z-index: 1;
  overflow-x: auto;
  white-space: pre-wrap;
  margin: 0;
}

@media (min-width: 768px) {
  .racsp-codeblock-code {
    font-size: 0.75rem;
  }
}

/* CTA buttons */
.btn-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.btn-cta:hover {
  transform: translateY(-2px);
}

.btn-cta-purple {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3);
}

.btn-cta-purple:hover {
  box-shadow: 0 12px 28px rgba(139, 92, 246, 0.45);
}

.btn-cta-orange {
  background: linear-gradient(135deg, #f97316, #fb923c);
  box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}

.btn-cta-orange:hover {
  box-shadow: 0 12px 28px rgba(249, 115, 22, 0.45);
}

/* Badge version (RACSP) */
.badge-version {
  background: rgba(249, 115, 22, 0.1);
  color: var(--accent-orange);
  border-color: rgba(249, 115, 22, 0.2);
}

/* Feature row svg color */
.feature-row svg {
  color: var(--card-accent, var(--accent-indigo));
  flex-shrink: 0;
}

/* Syntax highlighting (RACSP code block) */
.cb-comment { color: #64748b; }
.cb-key { color: #fb923c; }
.cb-bool { color: #fcd34d; }
.cb-status { color: #34d399; }
.cb-agent-claude { color: #60a5fa; }
.cb-agent-opencode { color: #4ade80; }
.cb-agent-gemini { color: #c084fc; }
```

### 10.2 Decisión sobre `.sc-icon`

**Decisión del planner:** mantener la regla de `.sc-icon` definida en EPIC 03 (líneas del bloque 8.X) — funciona correctamente con cualquier color de `--card-accent-rgb`.

Si EPIC 05/PART 01 usa `--card-accent` (un solo color en lugar de RGB tuple), hay que verificar que `.sc-icon` lo acepta. **Decisión:** ajustar `.sc-icon` para soportar ambos formatos, o usar `--card-accent-rgb` consistentemente.

Actualización propuesta para `.sc-icon`:
```css
.sc-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--card-accent-rgb, 99, 102, 241), 0.1);
  border: 1px solid rgba(var(--card-accent-rgb, 99, 102, 241), 0.2);
  color: var(--card-accent, var(--accent-indigo));
  margin-bottom: 0;
}
```

Y en EPIC 05/PART 01, definir `--card-accent-rgb` junto con `--card-accent` en cada card (e.g., `style="--card-accent: var(--accent-indigo); --card-accent-rgb: 99,102,241;"`).

**Corrección:** para mantener consistencia con EPIC 03 (que ya usa `--card-accent-rgb`), EPIC 05/PART 01 debe usar el mismo formato. Actualizar el PART 01 si es necesario.

### 10.3 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/index.html` (markup ya está en EPIC 05/PART 01).

---

## 11. Automated Test Plan

### AT-76 — Verificación de bloque CSS移植
- **Comando:** `Select-String -Path landing/css/Styles.css -Pattern "^\.(product|racsp|cb-|btn-cta|badge-version)" | Measure-Object`.
- **Pass criteria:** ≥ 30 matches.
- **Fallo:** < 30 (移植 incompleto).

### AT-77 — Verificación de `.btn-cta-purple`
- **Comando:** `grep -A 1 "btn-cta-purple {" landing/css/Styles.css`.
- **Pass criteria:** Match con `background: linear-gradient`.
- **Fallo:** Sin match.

### AT-78 — Verificación de `.btn-cta-orange`
- **Comando:** `grep -A 1 "btn-cta-orange {" landing/css/Styles.css`.
- **Pass criteria:** Match con `background: linear-gradient`.
- **Fallo:** Sin match.

### AT-79 — Verificación de `.badge-version`
- **Comando:** `grep -A 1 "badge-version {" landing/css/Styles.css`.
- **Pass criteria:** Match con `color: var(--accent-orange)`.
- **Fallo:** Sin match.

### AT-80 — Verificación de 11 clases `.cb-*`
- **Comando:** `Select-String -Path landing/css/Styles.css -Pattern "^\.cb-" | Measure-Object`.
- **Pass criteria:** `≥ 11`.
- **Fallo:** `< 11`.

### AT-81 — Verificación de top-bar preservado en `.product-card::before`
- **Comando:** `grep -A 5 "product-card::before" landing/css/Styles.css`.
- **Pass criteria:** Contiene `height: 4px; background: var(--card-accent)`.
- **Fallo:** Sin `::before` o sin top-bar.

### AT-82 — Verificación de responsive 1024px
- **Comando:** `grep -c "max-width: 1024px" landing/css/Styles.css`.
- **Pass criteria:** `≥ 3` (EPIC 04 + EPIC 05 + otros).
- **Fallo:** `< 3`.

### AT-83 — Verificación de `.glass-panel` preservado
- **Comando:** `grep -c "backdrop-filter.*blur(12px)" landing/css/Styles.css`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-84 — Verificación de `--card-accent-rgb` para `.sc-icon`
- **Comando:** `grep -c "card-accent-rgb" landing/css/Styles.css`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-85 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-109:** Abrir `landing/index.html` en Chrome 120+: las 5 product-cards se ven en grid 2-cols con RACSP full-width.
- [ ] **MV-110:** Cada card tiene top-bar de 4px con su color accent (azul MeridianUI, indigo Controls, emerald SaaS, púrpura REASP, naranja RACSP).
- [ ] **MV-111:** Hover en cualquier card: translateY(-6px), background más opaco, border-color accent.
- [ ] **MV-112:** El botón "Explorar REASP" tiene gradiente indigo→violeta con shadow púrpura.
- [ ] **MV-113:** El botón "Explorar RACSP" tiene gradiente naranja→naranja-claro con shadow naranja.
- [ ] **MV-114:** Hover en "Explorar REASP" o "Explorar RACSP": translateY(-2px), shadow más fuerte.
- [ ] **MV-115:** La sub-card SHEndevour dentro de SaaS Products tiene fondo ligeramente más oscuro que el card padre.
- [ ] **MV-116:** El code block de RACSP tiene fondo `#050b18` más oscuro que el body.
- [ ] **MV-117:** El syntax highlighting del code block distingue comments (gris), keys (naranja), booleans (amarillo), status (verde), y los 3 agents con colores diferentes.
- [ ] **MV-118:** El badge "v2.0.0" en RACSP tiene color naranja (no verde).
- [ ] **MV-119:** Los checks SVG de las features tienen color heredado del card accent (azul para MeridianUI, indigo para Controls, etc.).
- [ ] **MV-120:** Renderizar en DevTools > iPhone 12 Pro: las 5 cards colapsan a 1 columna; RACSP ocupa el ancho completo; code block con scroll horizontal si es necesario.
- [ ] **MV-121:** DevTools > Console: 0 errores.
- [ ] **MV-122:** DevTools > Lighthouse: sin regresión vs EPIC 04.
- [ ] **MV-123:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-17 — Comentarios en `Styles.css`

Cabecera del bloque 8.Z:
```css
/* ============================================
   8.Z Products · EPIC 05 PART 02
   5 product-cards with glass-panel + top-bar preserved.
   Token --accent-orange added (NOT in NEW).
   RACSP code block: 11 .cb-* syntax classes.
   CTA: .btn-cta base + .btn-cta-purple + .btn-cta-orange.
   Badge version: .badge-version with orange color.
   ============================================ */
```

### TD-Output-18 — Comentarios sobre clases semánticas de syntax

> Las 11 clases `.cb-*` permiten tematizar el syntax highlighting del code block RACSP sin tocar el HTML. Mapeo: `.cb-comment` (slate-500) para comentarios, `.cb-key` (orange-400) para keys YAML, `.cb-bool` (amber-300) para booleans, `.cb-status` (emerald-400) para valores status, `.cb-agent-{claude,opencode,gemini}` para nombres de agentes.

---

## 14. User Documentation to produce

### UD-Output-17 — Mensaje de commit sugerido

```
feat(landing): añadir estilos de product-cards y code block RACSP

- Bloque 8.Z de Styles.css con .products-grid, .product-card
  (glass-panel + top-bar), .product-subcard (SHEndevour),
  .racsp-codeblock con 11 clases .cb-* para syntax.
- Botones CTA: .btn-cta base + .btn-cta-purple + .btn-cta-orange.
- Badge .badge-version con color naranja para RACSP.
- Hover effect -6px + shadow 20/40 (consistente con pilares).
- Responsive: 2 cols → 1 col en 1024px; .product-card-wide reset.

Refs: .refi/modules/keorsoft-landing-redesign/epics/05-products/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-91:** El `Styles.css` contiene `.products-grid`, `.product-card`, `.product-card-wide`, `.product-card-header`, `.product-card-title-row`, `.product-card-title`, `.product-card-subtitle`, `.product-card-desc`, `.product-features`, `.product-features-grid`, `.product-card-footer`, `.product-subcard`, `.racsp-codeblock`, `.btn-cta`, `.btn-cta-purple`, `.btn-cta-orange`, `.badge-version`, y las 11 clases `.cb-*`.
- **AC-92:** `.product-card::before` tiene `height: 4px; background: var(--card-accent)` (top-bar preservado).
- **AC-93:** `.btn-cta-purple` tiene `background: linear-gradient(135deg, #6366f1, #8b5cf6)` y shadow con `rgba(139, 92, 246, 0.3)`.
- **AC-94:** `.btn-cta-orange` tiene `background: linear-gradient(135deg, #f97316, #fb923c)` y shadow con `rgba(249, 115, 22, 0.3)`.
- **AC-95:** `.badge-version` tiene `color: var(--accent-orange)`.
- **AC-96:** Existen 11 clases `.cb-*` con colores específicos (`.cb-comment` slate, `.cb-key` orange, `.cb-bool` amber, `.cb-status` emerald, `.cb-agent-claude` blue, `.cb-agent-opencode` green, `.cb-agent-gemini` purple, etc.).
- **AC-97:** Existe `@media (max-width: 1024px) { .products-grid { grid-template-columns: 1fr; } }` y `.product-card-wide { grid-column: auto; }`.
- **AC-98:** El comando `grep -c "backdrop-filter.*blur(12px)" landing/css/Styles.css` retorna ≥ 1 (glass-panel intacto).
- **AC-99:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-100:** DevTools > Computed en `.btn-cta-purple:hover`: `transform: translateY(-2px); box-shadow: 0 12px 28px rgba(139, 92, 246, 0.45)`.
- **AC-101:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-102:** El comando `grep -c "feature-row svg" landing/css/Styles.css` retorna ≥ 1 (color heredado del card accent).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Token `--accent-orange` coherente. Clases `.btn-cta-*` con patrón paralelo. Syntax highlighting via `.cb-*` semántico. Hover effect consistente con EPIC 04.
- [ ] **Gate 2 — Scope & Completeness Audit:** Bloque 8.Z con ~200 líneas. 5 cards soportadas. Code block RACSP completo. CTA buttons con gradientes. Badge version con color correcto.
- [ ] **Gate 3 — UX/Design Review:** UX-P35 a UX-P39 resueltos según §5. Top-bar preservado. Code block con scroll horizontal en mobile. Hover con shadow mejorada.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Code block visible con syntax highlighting. Links CTA funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes. Clases `.cb-*` documentadas.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 12 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________