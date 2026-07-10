# PART 01 — Logo Replace (Logo Update)

> **EPIC:** 12-logo-update
> **Slug:** `logo-replace`
> **Prioridad:** P0
> **Depende de:** —
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Sustituir el logo actual de Keorsoft (caja 32×32 con letra "K" generada por CSS `::before`) por el icono SVG real `KeorsoftK-Icon.svg` que existe en `landing/assets/`. Este cambio se aplica en **2 puntos del landing**: header (nav) y footer.

**Regla dura:** NO modificar `landing/REASP/`, `landing/RACSP/`, ni el favicon. Solo tocar `landing/index.html` y limpieza de CSS en `landing/css/Styles.css`.

---

## 2. Current State

### 2.1 Logo actual en `landing/index.html` (header, línea 22-25)

```html
<a href="#inicio" class="logo">
  <div class="logo-icon"></div>
  Keorsoft
</a>
```

**Visual actual:** una caja cuadrada de 32×32 con gradiente `linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo))`, border-radius 8px, box-shadow azul, que contiene una letra "K" generada con `::before`.

### 2.2 Logo actual en `landing/index.html` (footer, línea 880-883)

```html
<a href="#inicio" class="logo" style="font-size:1.25rem;">
  <div class="logo-icon"></div>
  Keorsoft
</a>
```

**Visual actual:** igual que header pero dentro del footer (con `font-size:1.25rem;` en el `<a>` para que el texto "Keorsoft" sea más pequeño en footer que en header).

### 2.3 CSS actual relevante (`landing/css/Styles.css`)

**Bloque `.logo-icon`:**
```css
.site-header .logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.site-header .logo-icon::before {
  content: 'K';
  font-family: var(--font-display);
  color: var(--bg-primary);
  font-weight: 800;
  font-size: 1.1rem;
}
```

**Nota:** las reglas están bajo `.site-header .logo-icon` y `.site-header .logo-icon::before` (específicas del header). El footer hereda `.logo-icon` del bloque base de EPIC 08 (`.site-header .logo-icon` solo aplica al header; el footer usa `.logo-icon` de `.site-header` no).

### 2.4 Asset `KeorsoftK-Icon.svg`

- **Path:** `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLanding\landing\assets\KeorsoftK-Icon.svg`
- **Tamaño:** 139,261 bytes
- **viewBox:** `0 0 2250 2250.000011`
- **Contenido:** 3 paths formando una "K" estilizada en negro sólido
- **Tipo:** SVG vectorial — escala sin pérdida
- **Coexistencia con `Keorsoft-Icon.svg`:** existe también (137,777 bytes, mismo concepto pero versión previa). El usuario quiere usar `KeorsoftK-Icon.svg` (la versión "K").

### 2.5 Estado del asset (verificado)

```
$ ls landing/assets/
Keorsoft-Icon.ico    370070 bytes
Keorsoft-Icon.png    172116 bytes
Keorsoft-Icon.svg    137777 bytes  ← Antigua, NO usar
KeorsoftK-Icon.ico   370070 bytes  ← Para favicon (fuera de scope)
KeorsoftK-Icon.png   183105 bytes  ← PNG fallback (fuera de scope)
KeorsoftK-Icon.svg   139261 bytes  ← USAR en <img>
```

**Decisión:** usar `KeorsoftK-Icon.svg` como `<img src>` (D8).

### 2.6 Texto "Keorsoft" adyacente al logo

El texto "Keorsoft" sigue al `<div class="logo-icon">` con gradiente `linear-gradient(135deg, #fff 30%, var(--accent-indigo) 100%)` aplicado al texto completo. **Se preserva** este comportamiento (es identidad de marca).

---

## 3. Comparison against baseline

Comparación de la versión actual vs. versión objetivo:

| Aspecto | Actual (baseline) | Objetivo (post-PART) |
|---------|-------------------|----------------------|
| Header logo imagen | `<div class="logo-icon">` con K CSS `::before` | `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">` |
| Footer logo imagen | `<div class="logo-icon">` con K CSS `::before` | `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="28" height="28">` |
| CSS `.logo-icon` | Definido con gradiente y `::before` K | **Eliminado** (no se usa) |
| CSS `.logo-icon::before` | Definido | **Eliminado** (no se usa) |
| Texto "Keorsoft" | Con gradiente | Sin cambios (preservado) |
| Accesibilidad | Sin `alt` (decorativo) | Con `alt="Keorsoft"` (lectores de pantalla leen "Keorsoft") |
| SEO | Logo no es texto rastreable | `alt` mejora indexación de imagen |

### 3.1 Cambios específicos

**Cambio 1 — Header (línea 22-25):**
```diff
- <div class="logo-icon"></div>
+ <img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">
```

**Cambio 2 — Footer (línea 880-883):**
```diff
- <div class="logo-icon"></div>
+ <img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="28" height="28">
```

**Cambio 3 — CSS (`Styles.css`):**
```diff
- .site-header .logo-icon {
-   width: 32px;
-   height: 32px;
-   background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
-   border-radius: 8px;
-   position: relative;
-   display: flex;
-   align-items: center;
-   justify-content: center;
-   box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
- }
-
- .site-header .logo-icon::before {
-   content: 'K';
-   font-family: var(--font-display);
-   color: var(--bg-primary);
-   font-weight: 800;
-   font-size: 1.1rem;
- }
```

### 3.2 No cambia

- Texto "Keorsoft" (sigue con su gradiente).
- `font-size` del `<a class="logo">` en footer (`1.25rem`).
- Estructura del `<a class="logo">` (sigue siendo `<a>` que envuelve icono + texto).
- Otros elementos del nav (links, CTA "Contactar", hamburger).
- Otros elementos del footer (4 columnas, bottom).
- Cualquier archivo fuera de `landing/index.html` y `landing/css/Styles.css`.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Modificar el `<div class="logo-icon">` por `<img>` en header (línea 22-25).
- Modificar el `<div class="logo-icon">` por `<img>` en footer (línea 880-883).
- Eliminar las reglas `.site-header .logo-icon` y `.site-header .logo-icon::before` de `Styles.css`.
- Verificar que el path relativo del `<img src="assets/KeorsoftK-Icon.svg">` es correcto (debe apuntar a `landing/assets/KeorsoftK-Icon.svg` desde `landing/index.html`).

### 4.2 Lo que NO está en el scope

- NO modifica `landing/REASP/index.html` (REASP docs mantienen su identidad con hexágono de Phosphor).
- NO modifica el favicon (`.ico` o `<link rel="icon">` en `<head>`).
- NO modifica `landing/RACSP/**`.
- NO modifica `landing/assets/KeorsoftK-Icon.svg` (se usa tal cual).
- NO añade nuevos productos.
- NO cambia el texto "Keorsoft" ni su gradiente.
- NO modifica otros elementos del header/footer.

---

## 5. UX Problems

### UX-P1 — Logo pequeño a 32×32 puede pixelarse
El SVG es vectorial (escalable sin pérdida), pero si se renderiza muy pequeño, el detalle de la "K" puede perderse. **Mitigación:** el SVG tiene un viewBox de 2250×2250, lo que da alta resolución. A 32×32 debería verse nítido.

### UX-P2 — El `<img>` no tiene `box-shadow` como el logo actual
El logo CSS actual tiene `box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3)` (sombra azul). El `<img>` no tiene esta sombra por defecto. **Decisión:** NO añadir shadow para mantener el logo limpio. Si se quiere, se puede añadir vía CSS (`.logo img { box-shadow: ... }`).

### UX-P3 — El `alt="Keorsoft"` se duplica con el texto adyacente
El `<a class="logo">` tiene icono + texto "Keorsoft". El `alt` se lee por lectores de pantalla, pero el texto adyacente también. **Decisión:** mantener `alt="Keorsoft"` (es redundante pero correcto para la imagen sola).

### UX-P4 — El logo no tiene `width` y `height` explícitos en CSS
**Decisión:** usar atributos HTML `width` y `height` directamente en el `<img>` (mejor performance que CSS).

---

## 6. Backend / Logic Problems

N/A — este PART es puramente HTML/CSS. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P1 — `class="logo"` tiene `display: flex` (de EPIC 08)
El `<a class="logo">` tiene `display: flex; align-items: center; gap: 0.75rem;` (de CSS de EPIC 08). El `<img>` se renderizará correctamente como flex item.

### Front-P2 — El `<img>` no se alinea automáticamente con el texto
El `<a class="logo">` usa flexbox con `align-items: center;`. El `<img>` (32×32) se alineará con el texto "Keorsoft" automáticamente.

### Front-P3 — El `box-sizing` del `<img>`
El `<img>` tiene `box-sizing: border-box` por el reset global. No afecta el tamaño (32×32 + border 0 = 32×32).

### Front-P4 — Soporte para retina (2x, 3x)
El SVG es vectorial y se renderiza a cualquier densidad de píxeles. **Beneficio:** mejor calidad en pantallas retina que el logo CSS anterior.

---

## 8. Technical Debt

### TD-1 — Logo de REASP en `landing/REASP/index.html` sigue siendo CSS
El icono "hexágono" de Phosphor (REASP) sigue siendo una clase CSS (`<i class="ph ph-hexagon">`). **Decisión:** NO cambiar (es parte de la identidad visual de REASP).

### TD-2 — Logo de RACSP en `landing/RACSP/index.html`
Igual que REASP. **Decisión:** NO cambiar.

### TD-3 — Posible mejora futura: favicon
El favicon en `<head>` puede ser actualizado a `KeorsoftK-Icon.ico` (ya existe en assets). **Decisión:** fuera de scope de este EPIC. Documentar para iteración futura.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-1:** Reemplazar el `<div class="logo-icon">` en el header de `landing/index.html` (línea 22-25) por `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">` — verificable con `grep -c "KeorsoftK-Icon.svg" landing/index.html` que retorna `≥ 1` y `grep -c "logo-icon" landing/index.html` que retorna `0` (después del reemplazo).
- **RI-2:** Reemplazar el `<div class="logo-icon">` en el footer de `landing/index.html` (línea 880-883) por `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="28" height="28">` — verificable con `grep -c "assets/KeorsoftK-Icon.svg" landing/index.html` que retorna `≥ 2` (header + footer).
- **RI-3:** El `<img>` del header tiene atributos `width="32" height="32"` exactos — verificable con `grep "width=\"32\" height=\"32\"" landing/index.html` que retorna `≥ 1`.
- **RI-4:** El `<img>` del footer tiene atributos `width="28" height="28"` exactos — verificable con `grep "width=\"28\" height=\"28\"" landing/index.html` que retorna `≥ 1`.
- **RI-5:** El `<img>` tiene atributo `alt="Keorsoft"` para accesibilidad — verificable con `grep "alt=\"Keorsoft\"" landing/index.html` que retorna `≥ 2` (header + footer).
- **RI-6:** Eliminar las reglas CSS `.site-header .logo-icon` y `.site-header .logo-icon::before` de `landing/css/Styles.css` — verificable con `grep -A 1 "\.site-header \.logo-icon {" landing/css/Styles.css` que retorna 0 ocurrencias.
- **RI-7:** El archivo `assets/KeorsoftK-Icon.svg` existe y es accesible — verificable con `Test-Path "landing/assets/KeorsoftK-Icon.svg"` que retorna `True`.
- **RI-8:** DevTools > Console en Chrome 120+ NO muestra errores tras la implementación — verificable manualmente.
- **RI-9:** El logo se ve correctamente en mobile (32×32 en header) y desktop (mismo) — verificable con DevTools > Toggle device toolbar.
- **RI-10:** El logo se ve correctamente en retina (vectorial, sin pixelarse) — verificable con DevTools > Sensors > DPR=2.
- **RI-11:** NO se modifica `landing/REASP/index.html` — verificable con `git diff landing/REASP/index.html` que retorna 0 cambios.
- **RI-12:** NO se modifica `landing/RACSP/**` — verificable con `git diff landing/RACSP/` que retorna 0 cambios.
- **RI-13:** NO se modifica `landing/assets/**` — verificable con `git diff landing/assets/` que retorna 0 cambios.
- **RI-14:** El texto "Keorsoft" sigue presente en header y footer con su gradiente — verificable con `grep -c ">Keorsoft<" landing/index.html` que retorna `≥ 2`.
- **RI-15:** El `<a class="logo">` en header y footer sigue apuntando a `#inicio` — verificable con `grep 'href="#inicio" class="logo"' landing/index.html` que retorna `≥ 2`.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` (2 cambios):**

**Cambio A — Header (líneas 22-25):**

```html
<!-- ANTES -->
<a href="#inicio" class="logo">
  <div class="logo-icon"></div>
  Keorsoft
</a>

<!-- DESPUÉS -->
<a href="#inicio" class="logo">
  <img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">
  Keorsoft
</a>
```

**Cambio B — Footer (líneas 880-883):**

```html
<!-- ANTES -->
<a href="#inicio" class="logo" style="font-size:1.25rem;">
  <div class="logo-icon"></div>
  Keorsoft
</a>

<!-- DESPUÉS -->
<a href="#inicio" class="logo" style="font-size:1.25rem;">
  <img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="28" height="28">
  Keorsoft
</a>
```

**`landing/css/Styles.css` (1 cambio — limpieza):**

Eliminar las reglas `.site-header .logo-icon { ... }` y `.site-header .logo-icon::before { ... }` (líneas específicas a localizar con grep).

### 10.2 Decisiones sobre la implementación

- **D1:** Usar `<img>` inline (no background-image) — mejor accesibilidad, mejor SEO, más simple.
- **D2:** Path relativo `assets/KeorsoftK-Icon.svg` — funciona correctamente desde `landing/index.html` (mismo directorio raíz).
- **D3:** Tamaño del header: 32×32 (mismo que el logo CSS anterior).
- **D4:** Tamaño del footer: 28×28 (más pequeño que header, para jerarquía visual).
- **D5:** `alt="Keorsoft"` — texto descriptivo del logo.
- **D6:** Eliminar `.logo-icon` y `.logo-icon::before` de CSS (no se usan).
- **D7:** Mantener `.site-header .logo` y `.footer-brand .logo` (definen flexbox, gap, etc.) — siguen siendo útiles.

### 10.3 Archivos a NO TOCAR

- `landing/REASP/index.html` — intacto.
- `landing/REASP/docs.html` — intacto.
- `landing/REASP/css/styles.css` — intacto.
- `landing/REASP/js/main.js` — intacto.
- `landing/REASP/js/docs.js` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/KeorsoftK-Icon.svg` — se usa tal cual.
- `landing/assets/Keorsoft-Icon.svg` — no se usa (es la versión antigua).

### 10.4 Orden de operaciones

1. **Primero:** modificar `landing/index.html` (header + footer) — cambios A y B.
2. **Segundo:** limpiar `landing/css/Styles.css` — eliminar `.logo-icon` y `.logo-icon::before`.
3. **Tercero:** validar con grep + DevTools.
4. **Cuarto:** validar mobile + desktop.
5. **Quinto:** validar no-regresión en REASP/RACSP.

---

## 11. Automated Test Plan

### AT-1 — Verificación del `<img>` en header
- **Comando:** `grep -c 'assets/KeorsoftK-Icon.svg' landing/index.html`.
- **Pass criteria:** `≥ 2` (header + footer).
- **Fallo:** `< 2`.

### AT-2 — Verificación de `width="32"` y `width="28"`
- **Comando:** `Select-String -Path landing/index.html -Pattern 'width="32" height="32"'` debe retornar `≥ 1`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-3 — Verificación de `alt="Keorsoft"`
- **Comando:** `Select-String -Path landing/index.html -Pattern 'alt="Keorsoft"'` debe retornar `≥ 2`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-4 — Verificación de eliminación de `logo-icon`
- **Comando:** `grep -c "logo-icon" landing/index.html` debe retornar `0` (después del reemplazo).
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-5 — Verificación de eliminación de CSS `.logo-icon`
- **Comando:** `grep -c "site-header .logo-icon" landing/css/Styles.css` debe retornar `0`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-6 — Verificación del asset
- **Comando:** `Test-Path "landing/assets/KeorsoftK-Icon.svg"`.
- **Pass criteria:** `True`.
- **Fallo:** `False`.

### AT-7 — Verificación de no-regresión REASP
- **Comando:** `git diff --stat landing/REASP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-8 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-9 — Verificación de no-regresión assets
- **Comando:** `git diff --stat landing/assets/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-10 — Verificación de texto "Keorsoft" preservado
- **Comando:** `grep -c ">Keorsoft<" landing/index.html` debe retornar `≥ 2` (header + footer).
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-11 — Verificación de `href="#inicio"` en logos
- **Comando:** `grep -c 'href="#inicio" class="logo"' landing/index.html` debe retornar `≥ 2`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-12 — Verificación de sintaxis HTML
- **Comando:** Manual con DevTools > Elements > Inspector.
- **Pass criteria:** El `<img>` aparece correctamente en header y footer, con todos los atributos.
- **Fallo:** Atributos faltantes o `<img>` mal formado.

### AT-13 — Verificación de 0 errores en consola
- **Comando:** Manual con DevTools > Console.
- **Pass criteria:** 0 errores.
- **Fallo:** ≥ 1 error (típico: 404 si la ruta del asset es incorrecta).

### AT-14 — Verificación de carga del asset en Network
- **Comando:** Manual con DevTools > Network > filter "KeorsoftK-Icon".
- **Pass criteria:** Status 200, tamaño 139 KB.
- **Fallo:** Status 404 o tamaño 0.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4 — Manual / Runtime Validation):

- [ ] **MV-1:** Abrir `landing/index.html` en Chrome 120+ — el header muestra el icono KeorsoftK-Icon real (no la "K" CSS).
- [ ] **MV-2:** El icono del header es visible a 32×32, nítido, sin pixelarse.
- [ ] **MV-3:** El footer muestra el mismo icono a 28×28 (un poco más pequeño).
- [ ] **MV-4:** El texto "Keorsoft" sigue presente en ambos (header y footer) con su gradiente.
- [ ] **MV-5:** Click en el logo del header hace scroll al inicio de la página (`#inicio`).
- [ ] **MV-6:** Click en el logo del footer también hace scroll al inicio.
- [ ] **MV-7:** DevTools > Console: 0 errores.
- [ ] **MV-8:** DevTools > Network: el asset `KeorsoftK-Icon.svg` se carga con status 200.
- [ ] **MV-9:** DevTools > Elements > `<img>` tiene `alt="Keorsoft"` (lector de pantalla lo leería).
- [ ] **MV-10:** DevTools > Lighthouse > Accessibility: sigue ≥ 95.
- [ ] **MV-11:** DevTools > Toggle device toolbar > iPhone 12 Pro: el logo se ve correctamente (no se descuadra).
- [ ] **MV-12:** DevTools > Sensors > DPR=2: el logo se ve nítido (vectorial, sin pixelarse).
- [ ] **MV-13:** El CSS `.logo-icon` y `.logo-icon::before` se eliminaron correctamente (verificar con `grep` o DevTools > Elements > Styles).
- [ ] **MV-14:** `landing/REASP/index.html` y `landing/RACSP/**` intactos (verificar con `git diff`).

---

## 13. Technical Documentation to produce

### TD-Output-1 — Comentarios en `landing/index.html` (header)

```html
<!-- ══ EPIC 12 PART 01 · Logo Replace · 2026-07-09 ══ -->
<!-- Logo Keorsoft: KeorsoftK-Icon.svg (asset) en lugar de CSS "K" -->
<!-- 32x32 px en header, 28x28 px en footer -->
```

### TD-Output-2 — Comentario en `landing/css/Styles.css` (cleanup)

```css
/* ══ EPIC 12 PART 01 · Logo Replace · 2026-07-09 ══ */
/* Eliminadas: .site-header .logo-icon, .site-header .logo-icon::before */
/* Logo ahora es <img src="assets/KeorsoftK-Icon.svg"> en HTML */
```

### TD-Output-3 — Documentación de la decisión

> **Decisión D8 (EPIC 12):** El logo de Keorsoft usa `<img src="assets/KeorsoftK-Icon.svg">` con `alt="Keorsoft"` para mejor accesibilidad y SEO. El CSS anterior (`.logo-icon` con K generada por `::before`) se eliminó por completo.
>
> **Tamaños:** 32×32 px en header (coincide con CSS anterior), 28×28 px en footer (un poco menor para jerarquía visual).
>
> **Decisión del planner:** tamaño del footer 28×28 (no 32×32) para crear jerarquía visual entre header y footer. Confirmar en Gate A.

---

## 14. User Documentation to produce

### UD-Output-1 — Mensaje de commit sugerido

```
feat(landing): replace Keorsoft logo with KeorsoftK-Icon SVG

- Header: <div class="logo-icon"> → <img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">.
- Footer: mismo reemplazo con width="28" height="28".
- CSS cleanup: removed .site-header .logo-icon and .logo-icon::before.
- Better accessibility (alt text) and SEO (searchable logo).
- Better quality on retina displays (vectorial SVG).

Refs: .refi/modules/keorsoft-landing-changes/epics/12-logo-update/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-1:** El header de `landing/index.html` muestra el icono KeorsoftK-Icon real (no la "K" CSS).
- **AC-2:** El footer de `landing/index.html` muestra el mismo icono a 28×28.
- **AC-3:** Ambos `<img>` tienen `alt="Keorsoft"` (accesibilidad).
- **AC-4:** Ambos `<img>` tienen `width` y `height` exactos (32 y 28 respectivamente).
- **AC-5:** Ambos `<img>` apuntan a `assets/KeorsoftK-Icon.svg` (path relativo correcto).
- **AC-6:** Las reglas CSS `.site-header .logo-icon` y `.site-header .logo-icon::before` están eliminadas de `Styles.css`.
- **AC-7:** El texto "Keorsoft" sigue presente en header y footer con su gradiente.
- **AC-8:** El `<a class="logo">` sigue apuntando a `#inicio` en ambos casos.
- **AC-9:** DevTools > Console: 0 errores.
- **AC-10:** DevTools > Network: el asset `KeorsoftK-Icon.svg` carga con status 200.
- **AC-11:** DevTools > Lighthouse > Accessibility: sigue ≥ 95.
- **AC-12:** Layout responsive correcto en mobile (DevTools > Toggle device toolbar).
- **AC-13:** Logo nítido en retina (DevTools > Sensors > DPR=2).
- **AC-14:** `landing/REASP/index.html`, `landing/REASP/docs.html`, `landing/RACSP/**`, `landing/assets/KeorsoftK-Icon.svg` intactos.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Decisión D8 (uso de `<img src>`) coherente con principios de accesibilidad web. SVG del asset escalable. Sin impacto en arquitectura CSS existente.
- [ ] **Gate 2 — Scope & Completeness Audit:** 2 cambios en `landing/index.html` (header + footer) + 1 cambio en `Styles.css` (cleanup). Sin cambios fuera de scope.
- [ ] **Gate 3 — UX/Design Review:** UX-P1 a UX-P4 resueltos según §5. Logo nítido a 32×32 y 28×28. Texto adyacente preservado. Accesibilidad mejorada con `alt`.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma AT-1 a AT-14. DevTools Console 0 errores. Network 200 para el asset.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART. Si el logo no se ve bien a 32×32, reabrir con tamaño mayor (ej. 40×40).
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1, §13.2) presentes. Decisión D8 documentada (§13.3).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. 0 regresiones en REASP/RACSP/assets. Logo cargado correctamente. Firma del footer.

**Firma:** ______________  **Fecha:** ______________