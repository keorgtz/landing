# PART 02 — Products Grid Reorg (REASP Card Enhanced)

> **EPIC:** 13-reasp-enhance
> **Slug:** `products-grid-reorg`
> **Prioridad:** P1
> **Depende de:** PART 01 (reasp-codeblock)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reorganizar el layout de la sección `#productos` para que **REASP y RACSP queden en la misma fila** (grid 2 columnas) en lugar de REASP estar antes que RACSP en una sola columna. Esto aprovecha mejor el espacio horizontal y crea una simetría visual entre los dos proyectos open-source más importantes de Keorsoft.

**Regla dura:** NO modificar `landing/css/Styles.css` (las clases `.products-grid` y media queries ya existen). NO tocar `landing/REASP/**` ni `landing/RACSP/**`.

---

## 2. Current State

### 2.1 Layout actual de productos (líneas 739-927 de `landing/index.html`)

**Estructura actual (después de EPIC 13/PART 01):**
```html
<div class="products-grid">
  <!-- Fila 1: 2 cards -->
  <div class="product-card">...MeridianUI...</div>
  <div class="product-card">...Controls...</div>
  
  <!-- Fila 2: 1 card full-width (SaaS) -->
  <div class="product-card">...SaaS Products...</div>
  
  <!-- Fila 3: 1 card full-width (REASP) -->
  <div class="product-card product-card-wide">...REASP con code-block...</div>
  
  <!-- Fila 4: 1 card full-width (RACSP) -->
  <div class="product-card product-card-wide">...RACSP con code-block...</div>
</div>
```

**Comportamiento actual:** REASP y RACSP quedan en filas separadas, ambos full-width. Esto hace que la sección productos sea muy alta (4 filas).

### 2.2 CSS actual relevante (`landing/css/Styles.css`)

```css
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}
```

**Comportamiento:** 1 columna en mobile, 2 columnas en desktop (≥1024px).

### 2.3 Limitaciones del layout actual

- **Altura excesiva:** 4 filas hacen la sección muy larga (~1600px).
- **Desaprovechamiento horizontal:** REASP y RACSP en filas separadas, ambos full-width (usan 1280px completos).
- **Asimetría visual:** REASP (sin code-block visualmente impactante como RACSP) antes de RACSP.

### 2.4 Diseño objetivo (después de PART 02)

```html
<div class="products-grid">
  <!-- Fila 1: 2 cards (MeridianUI | Controls) -->
  <div class="product-card">...MeridianUI...</div>
  <div class="product-card">...Controls...</div>
  
  <!-- Fila 2: 1 card full-width (SaaS) -->
  <div class="product-card">...SaaS Products...</div>
  
  <!-- Fila 3: 2 cards full-width (REASP | RACSP) ← CAMBIO -->
  <div class="product-card product-card-wide">...REASP con code-block...</div>
  <div class="product-card product-card-wide">...RACSP con code-block...</div>
</div>
```

**Comportamiento objetivo:** REASP y RACSP quedan en la misma fila (grid 2 cols en desktop), ambos con code-block. En mobile quedan apilados verticalmente.

### 2.5 Cambio crítico: `product-card-wide` en grid 2 cols

**Problema:** El CSS actual de `.product-card-wide` define `grid-column: 1 / -1;` que hace que el card ocupe TODAS las columnas del grid padre. Esto es incompatible con el layout de 2 cards en la misma fila.

**Solución:** Eliminar el `grid-column: 1 / -1;` de `.product-card-wide` cuando ambos cards (REASP y RACSP) son `product-card-wide` en la misma fila.

**Opciones:**

- **A.** Crear una nueva clase `.product-card-half` que no tenga `grid-column: 1 / -1;`. Aplicar esta clase a REASP y RACSP en lugar de `product-card-wide`. **Requiere cambio en CSS** (fuera de scope de este EPIC).

- **B.** Modificar el CSS `.product-card-wide` para que NO tenga `grid-column: 1 / -1;` cuando está dentro de un grid de 2 cols. **Requiere cambio en CSS** (fuera de scope de este EPIC).

- **C.** Usar `style="grid-column: auto;"` inline en los cards REASP y RACSP para sobrescribir el `grid-column: 1 / -1;` del CSS. **No requiere cambio en CSS**.

**Decisión del planner:** **Opción C** — `style="grid-column: auto;"` inline. Más simple, sin cambios en CSS.

**Cambio en el HTML:**
```diff
- <div class="product-card product-card-wide" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
+ <div class="product-card product-card-wide" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; grid-column: auto; animation-delay:.3s">
```

Y similar para RACSP:
```diff
- <div class="product-card product-card-wide" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; animation-delay:.4s">
+ <div class="product-card product-card-wide" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; grid-column: auto; animation-delay:.4s">
```

### 2.6 Cambio en el orden de los cards

**Decisión del planner:** REASP debe ir **antes** de RACSP en el HTML (orden de lectura lógico: REASP es el framework base, RACSP es el protocolo multi-agente construido sobre REASP).

**Orden final en desktop (≥1024px):**
```
+-----------------+-----------------+
|   MeridianUI    |   Controls      |  (fila 1)
+-----------------+-----------------+
|               SaaS               |  (fila 2, full-width)
+---------------------------------+
+-----------------+-----------------+
|     REASP       |     RACSP      |  (fila 3, 2 cols)
|  [code-block]   |  [code-block]   |
+-----------------+-----------------+
```

---

## 3. Comparison against baseline

### 3.1 Cambios específicos

**Cambio 1 — Añadir `grid-column: auto;` a REASP card:**
```diff
- style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s"
+ style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; grid-column: auto; animation-delay:.3s"
```

**Cambio 2 — Añadir `grid-column: auto;` a RACSP card:**
```diff
- style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; animation-delay:.4s"
+ style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; grid-column: auto; animation-delay:.4s"
```

**Sin otros cambios.** El orden REASP → RACSP en el HTML ya es correcto (REASP está antes que RACSP en el archivo).

### 3.2 No cambia

- NO se modifica `landing/css/Styles.css` (clases y media queries ya existen).
- NO se modifica el contenido de los cards (eso es PART 01).
- NO se cambia el orden de MeridianUI, Controls, SaaS (filas 1 y 2).
- NO se añade un nuevo `product-card-wide` (RACSP ya lo es).

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Añadir `style="grid-column: auto;"` al REASP card.
- Añadir `style="grid-column: auto;"` al RACSP card.
- Verificar que en desktop (≥1024px) ambos cards quedan en la misma fila (2 cols).
- Verificar que en mobile ambos cards quedan apilados verticalmente.

### 4.2 Lo que NO está en el scope

- NO modificar `landing/css/Styles.css`.
- NO cambiar el contenido de los cards (eso fue PART 01).
- NO cambiar el orden de los cards (REASP ya está antes de RACSP).
- NO añadir nuevas clases CSS.

---

## 5. UX Problems

### UX-P1 — REASP y RACSP en la misma fila pueden verse apretados en desktop
Cada card tiene code-block (33% width) + content (66% width). En un grid de 2 cols, cada card tiene 50% del ancho total. El content (66% de 50%) = 33% del viewport, code-block (33% de 50%) = 16.5%. Esto puede ser estrecho.

**Mitigación:** en desktop con viewport ≥1024px, el card tiene ~620px de ancho (1280 - gap). El content tiene 410px, el code-block tiene 200px. Aceptable.

### UX-P2 — El aspect ratio del code-block puede ser muy alto
El code-block tiene `flex: 0 0 33.333%` (33% width) pero su altura depende del contenido. Si el contenido es muy alto, el code-block será muy alto y desbalanceará el card.

**Mitigación:** el código del REASP es corto (~12 líneas), así que la altura del code-block será similar a RACSP.

### UX-P3 — El `grid-column: auto;` puede no sobrescribir el `grid-column: 1 / -1;` del CSS
En CSS, el `style` inline tiene mayor especificidad que las clases CSS. **Decisión:** confirmado — el `style="grid-column: auto;"` sobrescribe el CSS `.product-card-wide { grid-column: 1 / -1; }`.

### UX-P4 — En mobile, ambos cards con `grid-column: auto;` se apilan correctamente
En mobile (≤1024px), `.products-grid` tiene `grid-template-columns: 1fr;` (1 columna), así que `grid-column: auto;` se traduce a "1 sola columna", igual que sin el `auto`. **Decisión:** aceptable.

---

## 6. Backend / Logic Problems

N/A — este PART es puramente HTML. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P1 — `grid-column: auto;` en mobile
En mobile, el `products-grid` es 1 columna. `grid-column: auto;` significa "ocupar 1 columna" (que es la única columna). Sin cambio visual.

### Front-P2 — `grid-column: auto;` en tablet (768-1023px)
En tablet, el `products-grid` es 1 columna (porque el media query es `min-width: 1024px`). Igual que mobile.

### Front-P3 — `grid-column: auto;` en desktop (≥1024px)
En desktop, el `products-grid` es 2 columnas. `grid-column: auto;` significa "ocupar 1 columna". Los cards REASP y RACSP quedan lado a lado.

### Front-P4 — El `animation-delay` de los cards se mantiene
REASP tiene `animation-delay:.3s` y RACSP tiene `animation-delay:.4s`. Estos delays se mantienen (efecto de reveal escalonado).

---

## 8. Technical Debt

N/A — este PART no introduce deuda técnica. Es un cambio mínimo (2 atributos HTML).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-1:** Añadir `style="grid-column: auto;"` al REASP card — verificable con `grep "product-card product-card-wide" landing/index.html | Select-String "grid-column: auto"` que retorna `≥ 1`.
- **RI-2:** Añadir `style="grid-column: auto;"` al RACSP card — verificable con `grep "product-card product-card-wide" landing/index.html | Select-String "grid-column: auto"` que retorna `≥ 2` (REASP + RACSP).
- **RI-3:** El REASP card aparece **antes** que el RACSP card en el HTML — verificable con `Select-String -Path landing/index.html -Pattern 'id="productos"' -Context 0,200` que muestra el orden.
- **RI-4:** En desktop (≥1024px), REASP y RACSP quedan en la misma fila — verificable manualmente con DevTools > Toggle device toolbar > Responsive.
- **RI-5:** En mobile (≤1023px), REASP y RACSP quedan apilados verticalmente — verificable manualmente.
- **RI-6:** El `animation-delay` de REASP y RACSP se preserva (`.3s` y `.4s`) — verificable con `grep "animation-delay:\.3s\|animation-delay:\.4s" landing/index.html` que retorna `≥ 2`.
- **RI-7:** NO se modifica `landing/css/Styles.css` — verificable con `git diff landing/css/Styles.css` que retorna 0 cambios.
- **RI-8:** NO se modifica `landing/REASP/**` — verificable con `git diff landing/REASP/` que retorna 0 cambios.
- **RI-9:** NO se modifica `landing/RACSP/**` — verificable con `git diff landing/RACSP/` que retorna 0 cambios.
- **RI-10:** DevTools > Console: 0 errores — verificable manualmente.
- **RI-11:** El layout de productos mantiene su altura razonable (no excesivamente alto) — verificable con `getBoundingClientRect()` en DevTools.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/index.html`

**Cambio A — REASP card (línea ~833):**
```diff
- <div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
+ <div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; grid-column: auto; animation-delay:.3s">
```

**Cambio B — RACSP card (línea ~879):**
```diff
- <div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; animation-delay:.4s">
+ <div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; grid-column: auto; animation-delay:.4s">
```

### 10.2 Decisiones del PART

- **D1:** Usar `style="grid-column: auto;"` inline para sobrescribir el `grid-column: 1 / -1;` del CSS `.product-card-wide`. **Razón:** no requiere cambio en CSS.
- **D2:** Mantener el orden REASP → RACSP en el HTML (REASP es framework base, RACSP es protocolo construido sobre él).
- **D3:** Mantener el `animation-delay` de los cards (`.3s` y `.4s`) para el efecto de reveal escalonado.

### 10.3 Archivos a NO TOCAR

- `landing/css/Styles.css` — intacto.
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/**` — intacto.
- Otros productos en `landing/index.html` (MeridianUI, Controls, SaaS) — intactos.

### 10.4 Orden de operaciones

1. Localizar el REASP card en `landing/index.html` (línea ~833).
2. Añadir `grid-column: auto;` al atributo `style`.
3. Localizar el RACSP card (línea ~879).
4. Añadir `grid-column: auto;` al atributo `style`.
5. Validar con `grep` (AT-1 a AT-11).
6. Validar con DevTools en navegador (desktop + mobile).

---

## 11. Automated Test Plan

### AT-1 — Verificación de `grid-column: auto;` en REASP
- **Comando:** `Select-String -Path landing/index.html -Pattern 'product-card product-card-wide' | Select-String -Pattern 'grid-column: auto'`.
- **Pass criteria:** `≥ 1` (REASP).
- **Fallo:** `0`.

### AT-2 — Verificación de `grid-column: auto;` en RACSP
- **Comando:** `Select-String -Path landing/index.html -Pattern 'product-card product-card-wide' | Select-String -Pattern 'grid-column: auto'`.
- **Pass criteria:** `≥ 2` (REASP + RACSP).
- **Fallo:** `< 2`.

### AT-3 — Verificación de orden REASP antes de RACSP
- **Comando:** `Select-String -Path landing/index.html -Pattern 'id="productos"' -Context 0,1000` y verificar que REASP aparece antes que RACSP en el output.
- **Pass criteria:** REASP card aparece antes que RACSP card.
- **Fallo:** RACSP aparece antes que REASP.

### AT-4 — Verificación de no-regresión CSS
- **Comando:** `git diff --stat landing/css/Styles.css`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-5 — Verificación de no-regresión REASP
- **Comando:** `git diff --stat landing/REASP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-6 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-7 — Verificación de `animation-delay` preservado
- **Comando:** `grep "animation-delay:\.3s\|animation-delay:\.4s" landing/index.html | wc -l`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-8 — Verificación de 0 errores en consola
- **Comando:** Manual con DevTools > Console.
- **Pass criteria:** 0 errores.
- **Fallo:** ≥ 1 error.

### AT-9 — Verificación responsive desktop
- **Comando:** Manual con DevTools > Toggle device toolbar > 1280×800.
- **Pass criteria:** REASP y RACSP quedan lado a lado (2 cols).
- **Fallo:** Apilados verticalmente o layout roto.

### AT-10 — Verificación responsive mobile
- **Comando:** Manual con DevTools > Toggle device toolbar > iPhone 12 Pro.
- **Pass criteria:** REASP y RACSP quedan apilados verticalmente (1 col).
- **Fallo:** Layout roto o contenido cortado.

### AT-11 — Verificación de altura de la sección
- **Comando:** Manual con DevTools > Elements > inspeccionar `#productos` y medir altura.
- **Pass criteria:** Altura razonable (~1200-1400px en desktop, no más de 2000px).
- **Fallo:** Altura excesiva (>2000px) que indica que algo está mal.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-1:** Abrir `landing/index.html` en Chrome 120+ con viewport 1280×800 — REASP y RACSP quedan lado a lado en la misma fila.
- [ ] **MV-2:** REASP aparece antes que RACSP en el DOM (orden de lectura).
- [ ] **MV-3:** El aspect ratio del code-block en REASP y RACSP es similar (no desbalanceado).
- [ ] **MV-4:** El reveal animation funciona (animation-delay: 0.3s para REASP, 0.4s para RACSP).
- [ ] **MV-5:** DevTools > Toggle device toolbar > iPhone 12 Pro — REASP y RACSP apilados verticalmente.
- [ ] **MV-6:** La altura de la sección `#productos` es razonable (no excesiva).
- [ ] **MV-7:** Los otros productos (MeridianUI, Controls, SaaS) están en sus filas correctas (filas 1-2).
- [ ] **MV-8:** DevTools > Console: 0 errores.
- [ ] **MV-9:** DevTools > Lighthouse > Accessibility: sigue ≥ 95.
- [ ] **MV-10:** `landing/css/Styles.css` NO modificado (verificar con `git diff`).

---

## 13. Technical Documentation to produce

### TD-Output-1 — Comentarios en `landing/index.html` (REASP + RACSP)

```html
<!-- ══ EPIC 13 PART 02 · Products Grid Reorg · 2026-07-09 ══ -->
<!-- REASP y RACSP quedan en la misma fila (grid-column: auto) -->
<!-- Override del .product-card-wide { grid-column: 1 / -1; } del CSS -->
```

### TD-Output-2 — Documentación de la decisión D1

> **Decisión D1 (EPIC 13 PART 02):** Para colocar REASP y RACSP en la misma fila del grid (sin cambiar el CSS), se usa `style="grid-column: auto;"` inline en ambos cards. Esto sobrescribe el `grid-column: 1 / -1;` del CSS `.product-card-wide` (que hacía que el card ocupara toda la fila).
>
> **Razón:** no requiere cambio en CSS, mantiene el orden de los archivos CSS estable.

---

## 14. User Documentation to produce

### UD-Output-1 — Mensaje de commit sugerido

```
feat(landing): REASP and RACSP side-by-side in products grid

- REASP card and RACSP card now share the same row in the
  products grid (grid-column: auto, overriding .product-card-wide).
- Reduces section height from ~4 rows to ~3 rows.
- No CSS changes (inline style override).
- Animation delays preserved (.3s and .4s).
- Mobile layout unchanged (cards stack vertically).

Refs: .refi/modules/keorsoft-landing-changes/epics/13-reasp-enhance/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-1:** El REASP card tiene `style="...grid-column: auto;...`".
- **AC-2:** El RACSP card tiene `style="...grid-column: auto;...`".
- **AC-3:** REASP aparece antes que RACSP en el HTML.
- **AC-4:** En desktop (≥1024px), REASP y RACSP quedan lado a lado (misma fila del grid).
- **AC-5:** En mobile (≤1023px), REASP y RACSP quedan apilados verticalmente.
- **AC-6:** El `animation-delay` se preserva (`.3s` para REASP, `.4s` para RACSP).
- **AC-7:** `landing/css/Styles.css` NO modificado.
- **AC-8:** `landing/REASP/**` NO modificado.
- **AC-9:** `landing/RACSP/**` NO modificado.
- **AC-10:** DevTools > Console: 0 errores.
- **AC-11:** Altura de la sección `#productos` razonable (~1200-1400px en desktop, ≤2000px).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Decisión D1 (inline `grid-column: auto`) coherente con principios. Sin cambios en CSS. Sin afectar otras secciones.
- [ ] **Gate 2 — Scope & Completeness Audit:** 2 cambios puntuales en HTML. Sin CSS nuevo. Sin cambios fuera de scope.
- [ ] **Gate 3 — UX/Design Review:** UX-P1 a UX-P4 resueltos según §5. Layout reorganizado mejora la simetría visual. Aspect ratio aceptable. Mobile funcional.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma AT-1 a AT-7. DevTools Console 0 errores. Mobile y desktop funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado. Si el layout desktop se ve mal, reabrir con opción A (nueva clase CSS).
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Decisión D1 documentada (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 11 Acceptance Criteria §15 verificadas. 0 regresiones. Layout reorganizado correctamente. Firma del footer.

**Firma:** ______________  **Fecha:** ______________