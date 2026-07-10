# PART 01 — Remove SHEndevour (Quitar SHEndevour del Landing)

> **EPIC:** 14-remove-shendevour
> **Slug:** `remove-shendevour`
> **Prioridad:** P0
> **Depende de:** —
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Eliminar **completamente** todas las referencias al proyecto "SHEndevour" del landing `landing/index.html`. SHEndevour NO es un proyecto de Keorsoft — es de otra empresa del usuario. Eliminarlo evita confusión de marca y mantiene la coherencia del portfolio de Keorsoft.

**Cambios específicos:**
1. Eliminar el sub-card completo de SHEndevour dentro de la card "SaaS Products" (líneas 448-525 aprox.).
2. Eliminar el link `<li>` de SHEndevour del footer "Productos" (línea 923 aprox.).

**Regla dura:** NO modificar `landing/css/Styles.css` (las clases `.product-subcard*` se mantienen aunque no se usen). NO añadir un producto sustituto. NO tocar `landing/REASP/**` ni `landing/RACSP/**`.

---

## 2. Current State

### 2.1 SaaS Products card (líneas 459-525 de `landing/index.html`)

**Estructura actual del card SaaS:**
```html
<div class="product-card scroll-reveal" style="--card-accent: var(--accent-emerald); --card-accent-rgb: 16,185,129; animation-delay:.2s">
  <div class="product-card-header">
    <div class="sc-icon">
      <svg>...cloud icon...</svg>
    </div>
    <div>
      <div class="product-card-title-row">
        <h3 class="product-card-title">SaaS Products</h3>
        <span class="badge badge-live">Live</span>
      </div>
      <p class="product-card-subtitle">Soluciones SaaS verticales para industrias específicas</p>
    </div>
  </div>
  <p class="product-card-desc">Pequeñas soluciones SaaS diseñadas para verticales específicos. Cada producto está construido con alta personalización para su industria, utilizando MeridianUI y arquitectura moderna.</p>
  
  <!-- SUB-CARD DE SHENDEVOUR (A ELIMINAR) -->
  <div class="product-subcard">
    <div class="product-subcard-header">
      <div class="product-subcard-icon">
        <svg>...hotel icon...</svg>
      </div>
      <div>
        <h4 class="product-subcard-title">SHEndevour</h4>
        <p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>
      </div>
    </div>
    <p class="product-subcard-desc">Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.</p>
  </div>
  
  <div class="product-card-footer">
    <svg>...clock icon...</svg>
    Próximamente: más soluciones verticales
  </div>
</div>
```

**Líneas exactas a eliminar** (verificación posterior):
- ~línea 474-501: bloque `<div class="product-subcard">...</div>` completo (28 líneas aprox.).

### 2.2 Footer "Productos" link (línea 923 aprox.)

**Estructura actual del footer "Productos":**
```html
<div class="footer-links-col">
  <h4 class="footer-col-title">Productos</h4>
  <ul class="footer-links">
    <li><a href="#productos" class="footer-link">MeridianUI</a></li>
    <li><a href="#productos" class="footer-link">Controls &amp; Libraries</a></li>
    <li><a href="#productos" class="footer-link">SHEndevour</a></li>  <!-- A ELIMINAR -->
    <li><a href="REASP/index.html" class="footer-link">REASP</a></li>
    <li><a href="RACSP/index.html" class="footer-link">RACSP</a></li>
  </ul>
</div>
```

**Línea exacta a eliminar:** la línea `<li>...SHEndevour...</li>` (1 línea).

### 2.3 Verificación de no-regresión

- `landing/REASP/index.html`: **NO contiene** "SHEndevour" (verificado en Pass 1).
- `landing/REASP/docs.html`: **NO contiene** "SHEndevour" (verificado en Pass 1).
- `landing/RACSP/**`: NO contiene "SHEndevour".
- `landing/assets/**`: NO contiene "SHEndevour".
- `landing/css/Styles.css`: contiene las clases `.product-subcard*` pero NO referencias a SHEndevour.

**Conclusión:** solo `landing/index.html` requiere cambios.

### 2.4 Auditoría completa de "SHEndevour" en `landing/index.html`

**Comando:**
```bash
grep -c "SHEndevour" landing/index.html
```

**Resultado esperado (después de implementación):** `0`.

**Resultado actual (antes de implementación):** `4` ocurrencias.

**Líneas exactas (a verificar con `grep -n`):**
- ~línea 474: `<h4 class="product-subcard-title">SHEndevour</h4>`
- ~línea 492: SVG del icono hotel
- ~línea 494: `<p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>`
- ~línea 519: `<p class="product-subcard-desc">Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.</p>`
- ~línea 923: `<li><a href="#productos" class="footer-link">SHEndevour</a></li>`

**Nota:** la auditoría cuenta 4 ocurrencias de "SHEndevour" (no 5), porque el SVG del icono hotel no contiene la palabra "SHEndevour".

---

## 3. Comparison against baseline

### 3.1 Cambios específicos

**Cambio 1 — Eliminar el sub-card de SHEndevour (líneas 474-501 aprox.):**
```diff
- <!-- SUB-CARD DE SHENDEVOUR (A ELIMINAR) -->
- <div class="product-subcard">
-   <div class="product-subcard-header">
-     <div class="product-subcard-icon">
-       <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 7v14M21 7v14M9 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v17"/></svg>
-     </div>
-     <div>
-       <h4 class="product-subcard-title">SHEndevour</h4>
-       <p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>
-     </div>
-   </div>
-   <p class="product-subcard-desc">Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.</p>
- </div>
- 
```

**Cambio 2 — Eliminar el link SHEndevour del footer (línea 923):**
```diff
- <li><a href="#productos" class="footer-link">SHEndevour</a></li>
```

### 3.2 Cambios NO realizados

- NO se modifica `landing/css/Styles.css` (clases `.product-subcard*` se mantienen).
- NO se añade un producto sustituto.
- NO se cambia el copy del SaaS card principal (descripción + footer "Próximamente").
- NO se modifica el badge "Live" del SaaS card.
- NO se elimina la card "SaaS Products" completa.

### 3.3 Estructura final del SaaS card (después del cambio)

```html
<div class="product-card scroll-reveal" style="--card-accent: var(--accent-emerald); --card-accent-rgb: 16,185,129; animation-delay:.2s">
  <div class="product-card-header">
    <!-- header con icono cloud + título SaaS Products + badge Live + subtítulo -->
  </div>
  <p class="product-card-desc">Pequeñas soluciones SaaS diseñadas para verticales específicos. Cada producto está construido con alta personalización para su industria, utilizando MeridianUI y arquitectura moderna.</p>
  
  <!-- (sub-card eliminado) -->
  
  <div class="product-card-footer">
    <svg>...clock icon...</svg>
    Próximamente: más soluciones verticales
  </div>
</div>
```

### 3.4 Estructura final del footer "Productos" (después del cambio)

```html
<ul class="footer-links">
  <li><a href="#productos" class="footer-link">MeridianUI</a></li>
  <li><a href="#productos" class="footer-link">Controls &amp; Libraries</a></li>
  <!-- (link SHEndevour eliminado) -->
  <li><a href="REASP/index.html" class="footer-link">REASP</a></li>
  <li><a href="RACSP/index.html" class="footer-link">RACSP</a></li>
</ul>
```

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Eliminar el bloque `<div class="product-subcard">...</div>` completo del SaaS card (líneas 474-501 aprox.).
- Eliminar el `<li>` con el texto "SHEndevour" del footer "Productos" (línea 923).
- Verificar que `grep -c "SHEndevour" landing/index.html` retorne `0` después del cambio.

### 4.2 Lo que NO está en el scope

- NO modificar `landing/css/Styles.css` (clases `.product-subcard*` se mantienen, aunque no se usen tras el cambio).
- NO añadir un producto sustituto.
- NO modificar el SaaS card principal (descripción, badge, footer "Próximamente" se mantienen).
- NO modificar otros productos (MeridianUI, Controls, REASP, RACSP).
- NO modificar el footer completo (solo el `<li>` de SHEndevour).

---

## 5. UX Problems

### UX-P1 — El SaaS card queda con contenido "ligero"
Tras eliminar el sub-card, el SaaS card tiene solo la descripción + el footer "Próximamente". Esto es aceptable (es coherente con un producto futuro/en desarrollo), pero puede parecer "vacío" en comparación con los otros cards.

**Mitigación:** el footer "Próximamente: más soluciones verticales" indica que el card está en construcción. Aceptable.

### UX-P2 — El footer "Productos" queda con 4 items
Antes: 5 items (MeridianUI, Controls, SHEndevour, REASP, RACSP). Después: 4 items. La columna queda más corta que las otras (Servicios, Compañía, Contacto).

**Mitigación:** aceptable. La columna "Productos" sigue siendo funcional.

### UX-P3 — El SaaS card pierde el icono hotel
El icono `hotel` (SVG path de edificio) es específico de SHEndevour. Al eliminar el sub-card, el icono hotel también se elimina. **Decisión:** correcto (el icono no debe quedarse en el SaaS card porque era de SHEndevour).

### UX-P4 — El SaaS card mantiene su icono cloud
El icono `cloud` del header del SaaS card se mantiene (es del SaaS, no de SHEndevour). **Decisión:** correcto.

---

## 6. Backend / Logic Problems

N/A — este PART es puramente HTML. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P1 — El SaaS card queda visualmente "ligero" pero funcional
El card sigue mostrando información clara (título, descripción, badge, footer "Próximamente"). Aceptable.

### Front-P2 — El footer "Productos" queda con 4 items
La columna "Productos" del footer es ahora más corta que las otras. Aceptable.

### Front-P3 — Las clases `.product-subcard*` quedan sin uso en HTML
Tras el cambio, ningún elemento HTML usa `.product-subcard`, `.product-subcard-header`, `.product-subcard-icon`, `.product-subcard-title`, `.product-subcard-subtitle`, `.product-subcard-desc`. **Decisión:** mantener en CSS (no son muchas líneas y podrían usarse en otro lugar en el futuro).

### Front-P4 — El sub-card eliminado no afecta otros elementos
El SaaS card sigue mostrando el header (icono + título + badge + subtítulo), la descripción, y el footer "Próximamente". El sub-card era un elemento intermedio, no afecta la estructura del card.

---

## 8. Technical Debt

### TD-1 — Clases CSS `.product-subcard*` sin uso tras el cambio
Las clases `.product-subcard`, `.product-subcard-header`, `.product-subcard-icon`, `.product-subcard-title`, `.product-subcard-subtitle`, `.product-subcard-desc` quedan sin uso. **Decisión:** mantener en CSS (limpieza opcional futura, no causa regresión).

### TD-2 — Posible confusión: SaaS card sin producto concreto
El SaaS card menciona "Próximamente: más soluciones verticales" pero no tiene un producto concreto. **Decisión:** aceptable (es el estado actual del SaaS de Keorsoft).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-1:** Eliminar el bloque `<div class="product-subcard">...</div>` completo del SaaS card — verificable con `grep -c "product-subcard" landing/index.html` que retorna `0`.
- **RI-2:** Eliminar el `<li>` con el texto "SHEndevour" del footer "Productos" — verificable con `grep -c "SHEndevour" landing/index.html` que retorna `0`.
- **RI-3:** El SaaS card sigue mostrando el header (icono cloud + título + badge + subtítulo) — verificable con `grep "SaaS Products" landing/index.html` que retorna `≥ 1`.
- **RI-4:** El SaaS card sigue mostrando la descripción "Pequeñas soluciones SaaS..." — verificable con `grep "Pequeñas soluciones SaaS" landing/index.html` que retorna `≥ 1`.
- **RI-5:** El SaaS card sigue mostrando el footer "Próximamente: más soluciones verticales" — verificable con `grep "Próximamente" landing/index.html` que retorna `≥ 1`.
- **RI-6:** El footer "Productos" tiene 4 items (MeridianUI, Controls, REASP, RACSP) — verificable con `grep "footer-link.*MeridianUI\|footer-link.*Controls\|footer-link.*REASP\|footer-link.*RACSP" landing/index.html | wc -l` que retorna `4`.
- **RI-7:** El icono hotel (`<path d="M3 21h18M3 7v14..."`) se elimina del HTML — verificable con `grep "M3 21h18" landing/index.html` que retorna `0` (o solo el icono de SaaS cloud, no el hotel).
- **RI-8:** El icono cloud (SaaS) se mantiene — verificable con `grep "M18 10h-1.26" landing/index.html` que retorna `≥ 1` (el path del cloud).
- **RI-9:** NO se modifica `landing/css/Styles.css` — verificable con `git diff landing/css/Styles.css` que retorna 0 cambios.
- **RI-10:** NO se modifica `landing/REASP/**` — verificable con `git diff landing/REASP/` que retorna 0 cambios.
- **RI-11:** NO se modifica `landing/RACSP/**` — verificable con `git diff landing/RACSP/` que retorna 0 cambios.
- **RI-12:** NO se modifica `landing/assets/**` — verificable con `git diff landing/assets/` que retorna 0 cambios.
- **RI-13:** DevTools > Console: 0 errores — verificable manualmente.
- **RI-14:** El layout de la sección `#productos` se mantiene coherente — verificable manualmente con DevTools.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/index.html`

**Cambio A — Eliminar el sub-card de SHEndevour (líneas 474-501 aprox.):**

Localizar el bloque exacto con:
```bash
grep -n "SHEndevour" landing/index.html
```

Eliminar las líneas que correspondan al sub-card completo:
```html
<div class="product-subcard">
  <div class="product-subcard-header">
    <div class="product-subcard-icon">
      <svg>...</svg>
    </div>
    <div>
      <h4 class="product-subcard-title">SHEndevour</h4>
      <p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>
    </div>
  </div>
  <p class="product-subcard-desc">Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.</p>
</div>
```

**Cambio B — Eliminar el link SHEndevour del footer (línea 923):**

Localizar y eliminar la línea:
```html
<li><a href="#productos" class="footer-link">SHEndevour</a></li>
```

### 10.2 Decisiones del PART

- **D1:** Eliminar el sub-card COMPLETO (no solo el contenido, sino todo el `<div>` wrapper). Esto elimina también el icono hotel (que era específico de SHEndevour).
- **D2:** Eliminar el `<li>` completo del footer (no solo el texto, para mantener la estructura `<ul>` limpia).
- **D3:** NO modificar el copy del SaaS card (descripción + "Próximamente" se mantienen).
- **D4:** NO modificar el badge "Live" del SaaS card.
- **D5:** NO añadir un producto sustituto (decisión del usuario).
- **D6:** NO limpiar las clases CSS `.product-subcard*` (se mantienen en CSS por posible uso futuro).

### 10.3 Archivos a NO TOCAR

- `landing/css/Styles.css` — intacto.
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/**` — intacto.
- Otros productos en `landing/index.html` (MeridianUI, Controls, REASP, RACSP) — intactos.
- El SaaS card (header, descripción, badge, footer) — intacto (solo se elimina el sub-card interno).

### 10.4 Orden de operaciones

1. Localizar las 4 ocurrencias de "SHEndevour" en `landing/index.html` con `grep -n`.
2. Identificar el bloque del sub-card (líneas 474-501 aprox.).
3. Eliminar el bloque completo del sub-card.
4. Localizar el `<li>` del footer (línea 923).
5. Eliminar la línea del `<li>`.
6. Validar con `grep -c "SHEndevour" landing/index.html` que retorne `0`.
7. Validar con DevTools que el SaaS card se ve correctamente.
8. Validar con DevTools que el footer tiene 4 items en "Productos".
9. Validar no-regresión en REASP/RACSP/assets.

---

## 11. Automated Test Plan

### AT-1 — Verificación de 0 ocurrencias de "SHEndevour" en landing
- **Comando:** `grep -c "SHEndevour" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-2 — Verificación de 0 ocurrencias de "product-subcard" en landing
- **Comando:** `grep -c "product-subcard" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-3 — Verificación de que el SaaS card sigue presente
- **Comando:** `grep -c "SaaS Products" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-4 — Verificación de la descripción del SaaS card
- **Comando:** `grep -c "Pequeñas soluciones SaaS" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-5 — Verificación del footer "Próximamente"
- **Comando:** `grep -c "Próximamente" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-6 — Verificación de 4 items en el footer "Productos"
- **Comando:** `grep -A 0 "footer-link.*MeridianUI\|footer-link.*Controls\|footer-link.*REASP\|footer-link.*RACSP" landing/index.html | wc -l`.
- **Pass criteria:** `4` (MeridianUI, Controls, REASP, RACSP).
- **Fallo:** `< 4` o `> 4`.

### AT-7 — Verificación de no-regresión CSS
- **Comando:** `git diff --stat landing/css/Styles.css`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-8 — Verificación de no-regresión REASP
- **Comando:** `git diff --stat landing/REASP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-9 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-10 — Verificación de no-regresión assets
- **Comando:** `git diff --stat landing/assets/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-11 — Verificación de 0 errores en consola
- **Comando:** Manual con DevTools > Console.
- **Pass criteria:** 0 errores.
- **Fallo:** ≥ 1 error.

### AT-12 — Verificación responsive SaaS card
- **Comando:** Manual con DevTools > Toggle device toolbar > iPhone 12 Pro.
- **Pass criteria:** El SaaS card se ve correctamente (header + descripción + footer "Próximamente", sin sub-card).
- **Fallo:** Layout roto o espacio vacío extraño.

### AT-13 — Verificación responsive footer
- **Comando:** Manual con DevTools > Toggle device toolbar > iPhone 12 Pro.
- **Pass criteria:** El footer muestra 4 items en la columna "Productos" (apilados verticalmente en mobile).
- **Fallo:** Items desbordados o layout roto.

### AT-14 — Verificación de que el icono hotel se eliminó
- **Comando:** `grep "M3 21h18" landing/index.html` (path del hotel: `M3 21h18M3 7v14M21 7v14M9 21V4...`).
- **Pass criteria:** `0`.
- **Fallo:** `≥ 1`.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-1:** Abrir `landing/index.html` en Chrome 120+ — el SaaS card ya no tiene el sub-card de SHEndevour.
- [ ] **MV-2:** El SaaS card muestra: header (icono cloud + título + badge Live + subtítulo) + descripción + footer "Próximamente".
- [ ] **MV-3:** El SaaS card ya no tiene el icono hotel.
- [ ] **MV-4:** El footer "Productos" tiene 4 items: MeridianUI, Controls & Libraries, REASP, RACSP.
- [ ] **MV-5:** El footer ya no tiene el link "SHEndevour".
- [ ] **MV-6:** `grep -c "SHEndevour" landing/index.html` retorna `0`.
- [ ] **MV-7:** DevTools > Console: 0 errores.
- [ ] **MV-8:** DevTools > Toggle device toolbar > iPhone 12 Pro: el SaaS card se ve correctamente.
- [ ] **MV-9:** DevTools > Toggle device toolbar > iPhone 12 Pro: el footer muestra 4 items en "Productos" (apilados verticalmente).
- [ ] **MV-10:** Los otros productos (MeridianUI, Controls, REASP, RACSP) están intactos.
- [ ] **MV-11:** `landing/REASP/**`, `landing/RACSP/**`, `landing/assets/**`, `landing/css/Styles.css` NO modificados (verificar con `git diff`).
- [ ] **MV-12:** DevTools > Lighthouse > Accessibility: sigue ≥ 95.
- [ ] **MV-13:** El SaaS card ya no menciona "SHEndevour" en ningún lugar.

---

## 13. Technical Documentation to produce

### TD-Output-1 — Comentarios en `landing/index.html` (SaaS card)

```html
<!-- ══ EPIC 14 PART 01 · Remove SHEndevour · 2026-07-09 ══ -->
<!-- SHEndevour sub-card eliminado (no es proyecto Keorsoft) -->
<!-- SaaS card queda con header + descripción + footer "Próximamente" -->
```

### TD-Output-2 — Documentación de la decisión D1

> **Decisión D1 (EPIC 14 PART 01):** Se elimina el sub-card COMPLETO de SHEndevour (incluido el `<div>` wrapper, el icono hotel, el título, el subtítulo, y la descripción). Esto garantiza que ningún rastro de SHEndevour quede en el landing.
>
> **Razón:** SHEndevour es un proyecto de otra empresa del usuario. Eliminación completa (no parcial) evita confusión de marca.

---

## 14. User Documentation to produce

### UD-Output-1 — Mensaje de commit sugerido

```
feat(landing): remove SHEndevour (not a Keorsoft project)

- SaaS Products card: removed SHEndevour sub-card (hotel icon,
  title, subtitle, description).
- Footer 'Productos': removed SHEndevour link.
- Footer 'Productos' now has 4 items: MeridianUI, Controls, REASP, RACSP.
- SaaS card remains with header + description + 'Próximamente' footer.
- No CSS changes (classes .product-subcard* preserved in styles).
- No regression in REASP/RACSP/assets.

Refs: .refi/modules/keorsoft-landing-changes/epics/14-remove-shendevour/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-1:** `grep -c "SHEndevour" landing/index.html` retorna `0`.
- **AC-2:** `grep -c "product-subcard" landing/index.html` retorna `0`.
- **AC-3:** El SaaS card sigue presente con su título, subtítulo, descripción, y footer "Próximamente".
- **AC-4:** El footer "Productos" tiene 4 items: MeridianUI, Controls & Libraries, REASP, RACSP.
- **AC-5:** El icono hotel (path `M3 21h18...`) se elimina del HTML.
- **AC-6:** El icono cloud (SaaS) se mantiene en el SaaS card.
- **AC-7:** `landing/css/Styles.css` NO modificado.
- **AC-8:** `landing/REASP/**` NO modificado.
- **AC-9:** `landing/RACSP/**` NO modificado.
- **AC-10:** `landing/assets/**` NO modificado.
- **AC-11:** Los otros productos (MeridianUI, Controls, REASP, RACSP) intactos.
- **AC-12:** DevTools > Console: 0 errores.
- **AC-13:** El SaaS card se ve correctamente en mobile (DevTools > Toggle device toolbar > iPhone 12 Pro).
- **AC-14:** El footer "Productos" se ve correctamente en mobile (4 items apilados).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Decisión D1 (eliminación completa) coherente con principios. Sin cambios en CSS. Sin afectar otros productos.
- [ ] **Gate 2 — Scope & Completeness Audit:** 2 cambios puntuales en HTML. Sin CSS nuevo. Sin cambios fuera de scope.
- [ ] **Gate 3 — UX/Design Review:** UX-P1 a UX-P4 resueltos según §5. SaaS card queda ligero pero funcional. Footer "Productos" con 4 items. Icono hotel eliminado.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma AT-1 a AT-10. DevTools Console 0 errores. Mobile y desktop funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado. Si el SaaS card queda demasiado "vacío", reabrir con contenido adicional.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Decisión D1 documentada (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. 0 regresiones. SHEndevour completamente eliminado. Firma del footer.

**Firma:** ______________  **Fecha:** ______________