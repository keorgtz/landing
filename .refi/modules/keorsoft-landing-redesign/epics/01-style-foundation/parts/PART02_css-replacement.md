# PART 02 — CSS Replacement (Style Foundation)

> **EPIC:** 01-style-foundation
> **Slug:** `css-replacement`
> **Prioridad:** P0 (bloqueante)
> **Depende de:** PART 01 (`migration-audit`)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Ejecutar la **sustitución controlada** de la base de estilos del landing principal:
1. Reemplazar `landing/css/Styles.css` (464 líneas) con un nuevo archivo basado en los tokens de `KeorsoftLandingNEW/styles.css` + las clases semánticas移植 del actual.
2. Modificar el `<head>` y la apertura de `<body>` de `landing/index.html` para eliminar Tailwind CDN, ajustar fuentes y limpiar clases utility de `<body>`.

Este PART es **prerrequisito de EPIC 02-09** (todas las secciones del landing dependen de los tokens que aquí se definen).

---

## 2. Current State

### 2.1 `landing/css/Styles.css`

Estado actual descrito en PART 01 §2.1. Resumen:
- 464 líneas, CSS plano + tokens semánticos con dual theme.
- 22 variables en `:root` (líneas 5-38) + 11 overrides en `[data-theme="dark"]` (líneas 40-58).
- 14+ clases semánticas (cards, badges, forms, nav, footer).
- 1 breakpoint responsive (768px).

### 2.2 `<head>` de `landing/index.html`

Estado actual descrito en PART 01 §2.2. Resumen de líneas a modificar:
- Línea 2: `<html lang="es" class="scroll-smooth" data-theme="dark">` → eliminar `class` y `data-theme`.
- Línea 8: `<script src="https://cdn.tailwindcss.com"></script>` → ELIMINAR.
- Línea 10: Google Fonts Inter + Plus Jakarta Sans → REEMPLAZAR por Inter + Outfit + Fira Code.
- Línea 11: Material Symbols Rounded → ELIMINAR (decisión Gate A: D4 = SVG inline).
- Línea 15: `<body class="antialiased selection:bg-blue-500 selection:text-white">` → LIMPIAR a `<body>`.

### 2.3 `<script>` inline (líneas 849-942)

Bloque de theme toggle (líneas 850-867) → **eliminado en este PART**. El resto del script (mobile menu, scroll reveal, active nav, form) se移植 a `js/main.js` en EPIC 09/PART 02.

---

## 3. Comparison against baseline

Comparación contra el inventario producido por PART 01 (`audit-inventory.md`) y contra `KeorsoftLandingNEW/styles.css` (1487 líneas).

### 3.1 Mapping directo de archivos fuente

| Recurso a producir | Fuente primaria | Fuente complementaria |
|--------------------|-----------------|----------------------|
| `:root { ... }` tokens | `NEW/styles.css` líneas 3-29 | `audit-inventory.md` §3.2 (decisiones de mapping) |
| Reset CSS | `NEW/styles.css` líneas 32-51 | — |
| Tipografía base | `NEW/styles.css` líneas 131-148 | — |
| Background glow + grid | `NEW/styles.css` líneas 54-128 | — |
| Header / nav | `NEW/styles.css` líneas 151-268 | — |
| Buttons | `NEW/styles.css` líneas 271-337 | — |
| Glass panel base | `NEW/styles.css` líneas 387-395 | — |
| Hero (estructura) | `NEW/styles.css` líneas 397-585 | (EPIC 02) |
| Pillars / cards | `NEW/styles.css` líneas 605-696 | (EPIC 04, 03, 05) |
| Forms | `NEW/styles.css` líneas 1396-1414 | (EPIC 07) |
| Footer | `NEW/styles.css` líneas 1249-1316 | (EPIC 08) |
| Responsive | `NEW/styles.css` líneas 1416-1487 | (EPIC 11) |
| Clases legacy移植 | `current/Styles.css` (`.text-gradient`, `.scroll-reveal`, `.badge-*`, `.animate-float`) | — |

### 3.2 Lo que este PART introduce pero no se usa todavía

Este PART define los tokens y el reset. **No** implementa todavía:
- Clases específicas de sección (`.hero`, `.pillar-card`, `.product-card`, etc.) — EPIC 02-08.
- Animaciones complejas — EPIC 02 (terminal) y EPIC 09 (scroll reveal).
- Responsive por sección — EPIC 11.

El nuevo `Styles.css` en este PART tiene **~200-250 líneas** (vs 464 actuales). El resto se completa en EPICs siguientes.

### 3.3 Diferencia clave con la fuente

`NEW/styles.css` está escrito como página completa (incluye hero, pillar-card, builder, etc. — todos los componentes). El nuevo `Styles.css` se construye **incrementalmente**: este PART pone los cimientos (tokens + reset + tipografía + glass-panel + bg-glow), y cada EPIC subsiguiente añade su bloque.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope de este PART

- **Reemplazo total** de `landing/css/Styles.css` con el nuevo archivo basado en tokens del NEW.
- **Modificación** de `<head>` y `<body>` apertura de `landing/index.html` (líneas 1-15).
- **Eliminación** del bloque `<script>` de theme toggle (líneas 850-867).
- **Verificación** de que el render del landing (sin las modificaciones de EPIC 02-08) sigue siendo coherente: tipografía nueva visible, fondo dark, sin errores de consola, sin iconos Material Symbols rotos.

### 4.2 Lo que NO está en el scope

- **NO** se modifica el `<body>` content del landing (EPIC 02-08).
- **NO** se migra el `<script>` inline completo a `js/main.js` (eso es EPIC 09).
- **NO** se modifica `landing/REASP/**` ni `landing/RACSP/**`.
- **NO** se añade el terminal visualizer ni el hero rediseñado (EPIC 02).
- **NO** se añaden clases específicas de sección (`.pillar-card`, `.product-card`, etc. — EPIC 03-08).

---

## 5. UX Problems

### UX-P5 — Eliminación de Tailwind deja utility classes huérfanas
Tras eliminar `cdn.tailwindcss.com`, todas las clases utility de Tailwind en el body (`flex`, `grid`, `p-X`, `bg-blue-500`, etc.) **no se renderizan**. Esto rompe temporalmente el layout hasta que EPIC 02-08移植 las clases. **Aceptable**: el contrato de EPIC 01/PART 02 es "establecer los cimientos"; la sustitución completa es por EPIC.

### UX-P6 — Eliminación de Material Symbols deja iconos como texto literal
Tras eliminar la fuente Material Symbols, los `<span class="material-symbols-rounded">rocket_launch</span>` muestran el texto literal `rocket_launch` en lugar del icono. Aceptable también — EPIC 02-08 reemplaza por SVG inline.

### Mitigación de UX-P5 y UX-P6

El entregable de este PART es un landing que:
- Tiene fondo dark (`#05070a`) y tipografía Inter/Outfit.
- NO tiene Tailwind cargado.
- NO tiene theme toggle.
- Muestra **momentáneamente** iconos como texto y utility classes Tailwind sin efecto.

Esto es esperado y se documenta como "estado intermedio". El usuario decide si quiere hacer un commit intermedio o esperar a EPIC 09.

---

## 6. Backend / Logic Problems

N/A — este PART es puramente front-end estático.

---

## 7. Frontend / Presentation Problems

### Front-P5 — `scroll-behavior: smooth` puede no funcionar sin Tailwind
La clase `scroll-smooth` de Tailwind (línea 2 del `<html>`) añade `scroll-behavior: smooth` al elemento. Sin Tailwind, se debe移植 al reset CSS (línea 38 del NEW styles.css lo tiene — confirmar que se移植).

### Front-P6 — `selection:bg-blue-500` requiere Tailwind o CSS custom
La clase `selection:bg-blue-500 selection:text-white` en `<body>` (línea 15) usa Tailwind. Sin Tailwind, se移植 a CSS explícito:
```css
::selection { background: var(--accent-indigo); color: white; }
```
Esta regla ya existe en `NEW/styles.css` (verificar移植).

### Front-P7 — `class="antialiased"` requiere Tailwind o font-smoothing CSS
La clase `antialiased` de Tailwind aplica `-webkit-font-smoothing: antialiased`. Sin Tailwind, se移植 al reset CSS (línea 45 del NEW styles.css lo tiene).

---

## 8. Technical Debt

### TD-5 — Theme toggle JS huérfano tras eliminación
Tras eliminar el bloque `<script>` de theme toggle (líneas 850-867), el `<button id="theme-toggle">` del HTML (líneas 59-61) queda **sin handler**. EPIC 08 lo elimina del HTML.

### TD-6 — `data-theme="dark"` en `<html>` queda obsoleto
Tras eliminar el atributo `data-theme="dark"` de `<html>` (línea 2), el bloque CSS `[data-theme="dark"]` (líneas 40-58) ya no se activa nunca. **Se elimina junto con el resto de `Styles.css`**.

### TD-7 — Comentario "Light/Dark Theme" en cabecera de Styles.css queda obsoleto
Línea 1-3: `/* Keorsoft Landing — Light/Dark Theme */`. Tras el reemplazo, el comentario se actualiza a `/* Keorsoft Landing — Dark Theme (MeridianUI-aligned) */` o similar.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-7:** Reemplazar `landing/css/Styles.css` con un archivo de **~200-250 líneas** que contenga `:root` con 15 tokens, reset CSS completo, tipografía base, `.glass-panel`, background glow + grid, y los comentários de sección — verificable con `(Get-Item landing/css/Styles.css).Length` y `Select-String` para `^\s+--` que devuelve ≥ 15 matches.
- **RI-8:** Eliminar `<script src="https://cdn.tailwindcss.com"></script>` (línea 8) de `landing/index.html` — verificable con `grep -c "cdn.tailwindcss.com" landing/index.html` que devuelve `0`.
- **RI-9:** Reemplazar Google Fonts en línea 10 por una query string que cargue **Inter + Outfit + Fira Code** — verificable con `grep -E "(Inter|Outfit|Fira Code)" landing/index.html` que devuelve al menos 3 matches (uno por fuente).
- **RI-10:** Eliminar la línea 11 (Material Symbols Rounded) — verificable con `grep -c "Material+Symbols" landing/index.html` que devuelve `0`.
- **RI-11:** Limpiar la apertura de `<body>` (línea 15) a `<body>` sin clases — verificable con `grep -E "^<body" landing/index.html` que devuelve `<body>` exacto (sin clases).
- **RI-12:** Eliminar el bloque `<script>` de theme toggle (líneas 850-867 de la versión anterior) — verificable con `grep -c "theme-toggle" landing/index.html` que devuelve `0` (asumiendo que EPIC 08 ya eliminó el botón).
- **RI-13:** Verificar que el `:root` del nuevo `Styles.css` contiene **≥ 15 variables CSS** y que `--accent-indigo`, `--accent-cyan`, `--accent-emerald`, `--accent-purple`, `--accent-rose` están todos definidos — verificable con `Select-String -Path landing/css/Styles.css -Pattern "^\s+--(bg|text|accent|border|font|transition|glow)-"` que devuelve ≥ 15 matches.
- **RI-14:** Documentar en cabecera del nuevo `Styles.css` que el archivo es **dark-only** y que las secciones se completarán en EPICs 02-09 — verificable con lectura de las primeras 10 líneas del archivo.

---

## 10. Implementation Plan

### 10.1 Archivos a CREAR

- **REEMPLAZO COMPLETO:** `landing/css/Styles.css` — escrito desde cero basándose en:
  - `KeorsoftLandingNEW/styles.css` líneas 1-148 (tokens, reset, tipografía, glow mesh).
  - `KeorsoftLandingNEW/styles.css` líneas 387-395 (`.glass-panel`).
  - Clases legacy移植: `.text-gradient`, `.scroll-reveal`, `.badge-internal`, `.badge-live`, `.badge-oss`, `.animate-float`, `.footer-link`, `.social-icon` (de la versión actual).

### 10.2 Archivos a MODIFICAR

- **`landing/index.html` línea 2:**
  ```diff
  - <html lang="es" class="scroll-smooth" data-theme="dark">
  + <html lang="es">
  ```

- **`landing/index.html` línea 8:**
  ```diff
  - <script src="https://cdn.tailwindcss.com"></script>
  + <!-- Tailwind eliminado: ver epics/01-style-foundation/PART02_css-replacement.md -->
  ```

- **`landing/index.html` línea 10:**
  ```diff
  - <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
  + <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
  ```

- **`landing/index.html` línea 11:** **ELIMINAR** la línea completa (Material Symbols).

- **`landing/index.html` línea 15:**
  ```diff
  - <body class="antialiased selection:bg-blue-500 selection:text-white">
  + <body>
  ```

### 10.3 Archivos a ELIMINAR (contenido)

- **NO** se elimina ningún archivo. Solo se modifica `<head>` y `<body>` apertura.

### 10.4 Archivos a NO TOCAR

- `landing/index.html` líneas 17+ (`<nav>`, `<section>`s, `<footer>`, `<script>` no-theme-toggle) — intactos en este PART.
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `KeorsoftLandingNEW/**` — fuente del estilo, no se modifica.

### 10.5 Estructura del nuevo `Styles.css` (orden de bloques)

```css
/* Cabecera con metadatos del archivo (líneas 1-10) */
/* ============================================
   Keorsoft Landing — Stylesheet v2 (Dark Theme)
   Migrated to MeridianUI-aligned design tokens
   Source of truth: KeorsoftLandingNEW/styles.css
   See: .refi/modules/keorsoft-landing-redesign/
   ============================================ */

/* 1. Design tokens (:root, líneas ~15-50) */
/* 2. Reset & base (líneas ~55-90) */
/* 3. Tipografía (líneas ~95-115) */
/* 4. Background glow + grid (líneas ~120-170) */
/* 5. Layout helpers (.container, .section, líneas ~175-200) */
/* 6. Glass panel base (líneas ~205-220) */
/* 7. Legacy classes移植 (.text-gradient, .scroll-reveal, .badge-*, .animate-float, .social-icon, .footer-link) */
/* 8. Section-specific classes (placeholders para EPIC 02-08) */
/* 9. Responsive (placeholder para EPIC 11) */
```

---

## 11. Automated Test Plan

### AT-5 — Validación de tokens
- **Comando:**
  ```bash
  Select-String -Path landing/css/Styles.css -Pattern '^\s+--' | Measure-Object
  ```
- **Pass criteria:** ≥ 15 variables CSS definidas en `:root`.
- **Fallo:** < 15 tokens.

### AT-6 — Validación de tokens específicos requeridos
- **Comando:**
  ```bash
  grep -E "^(\s+--(bg-primary|bg-secondary|bg-tertiary|text-primary|text-secondary|text-muted|accent-indigo|accent-cyan|accent-emerald|accent-purple|accent-rose|border-light|font-sans|font-display|font-mono|transition-smooth)\s*:)" landing/css/Styles.css | wc -l
  ```
- **Pass criteria:** ≥ 15 matches.
- **Fallo:** Faltan tokens específicos (lista de los 15 obligatorios arriba).

### AT-7 — Eliminación de Tailwind
- **Comando:** `grep -c "cdn.tailwindcss.com" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0` (Tailwind aún referenciado).

### AT-8 — Eliminación de Material Symbols
- **Comando:** `grep -c "Material+Symbols" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-9 — Fuentes nuevas presentes
- **Comando:** `grep -E "(Inter|Outfit|Fira Code)" landing/index.html | wc -l`.
- **Pass criteria:** ≥ 3 matches (uno por nombre de fuente).
- **Fallo:** < 3.

### AT-10 — `<body>` limpio
- **Comando:** `Select-String -Path landing/index.html -Pattern "^<body" | ForEach-Object Line`.
- **Pass criteria:** La línea es exactamente `<body>`.
- **Fallo:** `<body class="...">` con cualquier clase.

### AT-11 — Validación CSS sintáctica
- **Comando:** `node -e "require('fs').readFileSync('landing/css/Styles.css', 'utf8')"` (verifica que el archivo es legible).
- **Pass criteria:** No lanza excepción.
- **Fallo:** Archivo corrupto o con encoding incorrecto.

### AT-12 — Sin regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Output vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist a ejecutar manualmente por Ryou Reviewer (Gate 4):

- [ ] **MV-9:** Abrir `landing/index.html` en Chrome 120+ y verificar que NO hay errores en consola.
- [ ] **MV-10:** Verificar que la fuente `Outfit` se aplica a los headings (botón derecho > Inspeccionar > Computed > font-family).
- [ ] **MV-11:** Verificar que la fuente `Fira Code` se aplica a cualquier bloque `<code>` o `<pre>` (si existe).
- [ ] **MV-12:** Verificar que el fondo del body es `#05070a` (color de `--bg-primary`).
- [ ] **MV-13:** Verificar que NO aparece el botón "theme toggle" en la nav (será eliminado en EPIC 08, pero el handler JS ya no existe).
- [ ] **MV-14:** Verificar que el botón "Contactar" en la nav sigue apuntando a `https://wa.me/523327633233`.
- [ ] **MV-15:** Renderizar en mobile (DevTools > Toggle device toolbar > iPhone 12 Pro) y verificar que la nav no rompe (puede verse momentáneamente sin estilo hasta EPIC 08).
- [ ] **MV-16:** Confirmar que `landing/REASP/index.html` y `landing/RACSP/index.html` renderizan idéntico a antes (cero regresión visual).
- [ ] **MV-17:** Verificar en DevTools > Network que NO se carga `cdn.tailwindcss.com` (pestaña Network filtrada por `tailwind`).

---

## 13. Technical Documentation to produce

### TD-Output-2 — Cabecera del nuevo `Styles.css`

Las primeras 10 líneas del archivo documentan:
- Nombre del archivo y versión.
- Fuente del estilo (`KeorsoftLandingNEW/styles.css`).
- Decisión de tema (dark-only).
- Referencia al packet REFI (`../.refi/modules/keorsoft-landing-redesign/`).
- Roadmap de EPICs que completan este archivo (02-09).

### TD-Output-3 — Comentarios de sección

Cada bloque del nuevo `Styles.css` tiene un comentario de cabecera indicando:
- Qué EPIC lo introduce (ej. `/* Block 5 — Glass panel · EPIC 01 PART 02 */`).
- Si es移植 del NEW styles.css o del actual.
- Referencias a líneas exactas de fuente.

---

## 14. User Documentation to produce

### UD-Output-3 — Mensaje de commit sugerido

Texto sugerido para el commit de este PART:
```
style(landing): reemplazar Styles.css con tokens MeridianUI-aligned

- Elimina Tailwind CDN (-3 MB).
- Elimina Material Symbols Rounded (iconos se移植 a SVG en EPICs siguientes).
- Añade Outfit (display) + Fira Code (mono).
- Tema dark-only (toggle eliminado, refactor pendiente en EPIC 08).
- Mantiene compatibilidad con REASP/RACSP (intactos).
- Estado: parcial — los iconos se ven como texto literal hasta EPIC 02-08.

Refs: .refi/modules/keorsoft-landing-redesign/epics/01-style-foundation/
```

### UD-Output-4 — Nota sobre estado intermedio

Pequeña nota en el cuerpo del commit (o en `landing/Audit-2026-07-09.html` si se crea) explicando que el landing puede verse momentáneamente incompleto hasta que EPIC 02-08移植 los componentes.

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-11:** `landing/css/Styles.css` existe, tiene ≥ 200 líneas, y comienza con cabecera que referencia `KeorsoftLandingNEW/styles.css` y el packet REFI.
- **AC-12:** El nuevo `Styles.css` define **≥ 15 variables CSS** en `:root`, incluyendo las 15 obligatorias: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--text-primary`, `--text-secondary`, `--text-muted`, `--accent-indigo`, `--accent-cyan`, `--accent-emerald`, `--accent-purple`, `--accent-rose`, `--border-light`, `--font-sans`, `--font-display`, `--font-mono`.
- **AC-13:** El comando `grep -c "cdn.tailwindcss.com" landing/index.html` devuelve **`0`**.
- **AC-14:** El comando `grep -c "Material+Symbols" landing/index.html` devuelve **`0`**.
- **AC-15:** El comando `grep -E "(Inter|Outfit|Fira Code)" landing/index.html` devuelve **≥ 3 matches**.
- **AC-16:** La línea exacta de `<body>` en `landing/index.html` es `<body>` (sin clases).
- **AC-17:** El comando `grep -c "theme-toggle" landing/index.html` devuelve **`0`** (botón y handler eliminados).
- **AC-18:** El comando `git diff --stat landing/REASP/ landing/RACSP/` devuelve **vacío**.
- **AC-19:** Abrir `landing/index.html` en Chrome 120+ **NO produce errores en consola** del navegador.
- **AC-20:** El comando `grep -c "data-theme" landing/index.html` devuelve **`0`** (atributo eliminado de `<html>`).
- **AC-21:** El comando `grep -c "data-theme" landing/css/Styles.css` devuelve **`0`** (bloque `[data-theme="dark"]` eliminado).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Tokens移植 de `NEW/styles.css` líneas 3-29 sin modificación. No se introducen variables CSS que contradigan `rules/global-rules.md` ni el sistema MeridianUI.
- [ ] **Gate 2 — Scope & Completeness Audit:** Las 5 dependencias externas gestionadas (Tailwind eliminado, Material Symbols eliminado, Google Fonts reemplazado, Font Awesome mantenido, Styles.css reemplazado). Las 11 entradas de `[data-theme="dark"]` (líneas 40-58 actual) eliminadas. El bloque `<script>` de theme toggle (líneas 850-867 actual) eliminado.
- [ ] **Gate 3 — UX/Design Review:** Dark-only confirmado por usuario (Gate A). Clases legacy移植 preservan comportamiento (`.text-gradient`, `.scroll-reveal`, `.badge-*`, `.animate-float`). UX-P5 y UX-P6 documentados con mitigación en §5.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. Chrome DevTools confirma tokens aplicados (Network, Computed styles). `git diff` confirma cero cambios en REASP/RACSP. `grep` confirma todos los comandos de §11 con resultados esperados.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este mismo PART. Específicamente: si AC-19 falla (errores en consola), investigar y corregir antes de cerrar Gate 5.
- [ ] **Gate 6 — Technical Documentation:** Cabecera del nuevo `Styles.css` (§13.1) presente. Comentarios de sección (§13.2) presentes en cada bloque.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre estado intermedio (§14.2) comunicada al usuario antes de commit.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 11 Acceptance Criteria §15 verificadas. Build 0 errores. Diff de `Styles.css` revisado por Ryou Reviewer. Sin regresión en `landing/REASP/` ni `landing/RACSP/`. Firma del footer.

**Firma:** ______________  **Fecha:** ______________