# PART 02 — Script Integration Test (Scripts & Interactivity)

> **EPIC:** 09-scripts-interactivity
> **Slug:** `script-integration-test`
> **Prioridad:** P1
> **Depende de:** EPIC 09 PART 01 (Main JS Extract)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Validar manualmente en navegador real (Chrome, Edge, Firefox) que los 6 módulos de `landing/js/main.js` funcionan correctamente tras la consolidación:
1. Mobile menu toggle (hamburger + dropdown).
2. Hero terminal auto-typing (7 líneas).
3. Scroll reveal (IntersectionObserver).
4. Active nav highlight (al hacer scroll).
5. Contact form handler (submit simulado + success banner).
6. Nav scroll effect (opcional, `.scrolled` class).

---

## 2. Current State

### 2.1 Estado tras EPIC 09/PART 01

- `landing/js/main.js` creado con 6 módulos (≥ 100 líneas).
- Bloque `<script>` inline eliminado del `landing/index.html`.
- `landing/js/hero-terminal.js` eliminado.
- `<script src="js/main.js" defer></script>` añadido antes de `</body>`.
- `node --check landing/js/main.js` retorna exit code 0.

### 2.2 Estado actual del landing (tras EPIC 01-09)

- Hero (EPIC 02): terminal visualizer presente con `<div id="termContent">`.
- Nosotros (EPIC 03): cards con `.scroll-reveal` + reveal escalonado.
- Servicios (EPIC 04): 3 pillars con `.scroll-reveal`.
- Productos (EPIC 05): 5 product-cards con `.scroll-reveal`.
- Open Source (EPIC 06): 2 OSS cards con `.scroll-reveal`.
- Contacto (EPIC 07): form con `#contact-form` y `#form-success`.
- Footer (EPIC 08): sticky header con `<header class="site-header">` y `<ul class="nav-menu">` con 6 nav links `.nav-link`.

### 2.3 Decisión sobre smoke test

**Decisión del planner:** smoke test manual en 3 navegadores (Chrome, Edge, Firefox). Sin tests automatizados (no hay pipeline en este repo de HTML estático).

### 2.4 Comandos de verificación pre-test

Antes del smoke test, verificar:
- `node --check landing/js/main.js` retorna exit code 0.
- `grep -c "</script>" landing/index.html` retorna 0 (sin script inline).
- `grep -c "js/main.js" landing/index.html` retorna 1.
- `Test-Path landing/js/hero-terminal.js` retorna False.
- `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.

---

## 3. Comparison against baseline

### 3.1 Diferencias entre PART 01 (extract) y PART 02 (test)

| Aspecto | PART 01 (extract) | PART 02 (test) |
|---------|-------------------|----------------|
| Alcance | Crear `main.js` + eliminar scripts inline | Validar que `main.js` funciona end-to-end |
| Output | Archivos modificados | Reporte de validación con resultados por navegador |
| Validación | `node --check` + grep | Browser smoke test manual |

### 3.2 Criterios de éxito del smoke test

Cada módulo debe pasar las siguientes validaciones en **Chrome 120+, Edge 120+, Firefox 120+**:

| Módulo | Validación |
|--------|------------|
| Mobile menu toggle | Hamburger toggle, dropdown close on outside click, link click closes menu |
| Hero terminal | Typewriting animation 7 lines, ~15s duration |
| Scroll reveal | Cards animate on scroll into view |
| Active nav | Active `.nav-link` changes based on visible section |
| Contact form | Submit → 1s freeze → reset → success banner 5s |
| Nav scroll effect | `.scrolled` class added/removed based on scrollY > 50 |

### 3.3 Diferencia entre DevTools y consola de errores

- **DevTools Console** debe estar limpio (0 errors, 0 warnings).
- **Network tab** debe mostrar solo `main.js` cargando (sin inline scripts en el HTML).
- **Sources tab** debe permitir inspeccionar `main.js`.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Smoke test manual en 3 navegadores (Chrome, Edge, Firefox).
- Capturar resultados del test en un reporte visual.
- Validar que no hay regresión en `landing/REASP/**` ni `landing/RACSP/**` (estos tienen sus propios scripts intactos).
- Validar accesibilidad básica (focus visible, navegación por teclado en mobile menu, form labels asociados).
- Validar responsive en 3 breakpoints (mobile 375px, tablet 768px, desktop 1440px).

### 4.2 Lo que NO está en el scope

- **NO** se añaden tests automatizados (no hay Jest/Vitest en el repo).
- **NO** se mide performance con Lighthouse extendido (eso es EPIC 11).
- **NO** se modifica código de `main.js` (solo se valida).

---

## 5. UX Problems

### UX-P67 — Diferencias entre navegadores
Algunos navegadores (Safari, Firefox viejos) pueden tener comportamiento diferente con:
- `backdrop-filter` (puede no funcionar en Safari sin prefijo).
- `IntersectionObserver` (no soportado en IE 11).
- `setTimeout` con delays largos (puede ser bloqueado si la pestaña está inactiva).

**Decisión:** validar en Chrome, Edge, Firefox. Safari se omite (no prioritario para el mercado de Keorsoft).

### UX-P68 — Foco del teclado en mobile menu
El dropdown mobile debe ser navegable por teclado. **Decisión:** validar que el botón hamburger es focusable y que los links dentro del dropdown también lo son.

### UX-P69 — Performance del terminal typing en navegadores lentos
La animación de typing (40ms/char) puede ser irregular en navegadores lentos. **Decisión:** validar fluidez; si es problema, reducir frecuencia.

---

## 6. Backend / Logic Problems

N/A — smoke test client-side.

---

## 7. Frontend / Presentation Problems

### Front-P77 — Console warnings en DevTools
Algunos warnings son aceptables (e.g., React DevTools suggestion, A11y hints). Lo crítico es **0 errors**.

### Front-P78 — Network waterfall
Verificar que `main.js` carga en orden (después del HTML parse por defer).

### Front-P79 — Memory leaks en event listeners
Validar que no hay listeners duplicados al hacer scroll repetidamente.

### Front-P80 — Cross-browser compatibility
Validar específicamente en Firefox (a veces tiene diferencias con `IntersectionObserver` root margins).

---

## 8. Technical Debt

### TD-50 — No hay tests automatizados
Documentar como deuda técnica. **Decisión:** no añadir tests automatizados (no hay pipeline en este repo HTML estático).

### TD-51 — Smoke test manual es repetible pero no automatizable
Documentar el procedimiento del smoke test para que sea ejecutable en cada release.

### TD-52 — No hay monitoring de errores en producción
No hay Sentry/LogRocket/etc. Los errores solo se detectan manualmente. **Decisión:** aceptar (proyecto personal).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-156:** Ejecutar smoke test en **Chrome 120+**: 6 módulos funcionan, 0 errores en consola — verificable con captura de pantalla o log de testing.
- **RI-157:** Ejecutar smoke test en **Edge 120+**: 6 módulos funcionan, 0 errores en consola — verificable con captura de pantalla o log de testing.
- **RI-158:** Ejecutar smoke test en **Firefox 120+**: 6 módulos funcionan, 0 errores en consola — verificable con captura de pantalla o log de testing.
- **RI-159:** Validar **responsive en mobile (375px)**: hamburger visible, dropdown funcional — verificable con captura.
- **RI-160:** Validar **responsive en tablet (768px)**: layout intermedio correcto — verificable con captura.
- **RI-161:** Validar **responsive en desktop (1440px)**: layout completo, todos los handlers funcionan — verificable con captura.
- **RI-162:** Validar **accesibilidad básica**: foco visible, navegación por teclado en mobile menu, labels asociados en form — verificable manualmente.
- **RI-163:** Verificar que **NO hay inline scripts** en `landing/index.html` — verificable con `grep -c "<script>" landing/index.html` que retorna `1` (solo el `<script src="js/main.js">`).
- **RI-164:** Verificar que **DevTools Network muestra solo `main.js`** cargando (no `hero-terminal.js` ni inline) — verificable con captura del Network tab.
- **RI-165:** Validar **performance**: First Contentful Paint < 1.5s, Time to Interactive < 3s en 4G simulated — verificable con DevTools Lighthouse.
- **RI-166:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` — verificable con `git diff --stat` vacío.

---

## 10. Implementation Plan

### 10.1 Procedimiento del smoke test

#### Paso 1 — Verificación pre-test (comandos)

```bash
# Sintaxis JS
node --check landing/js/main.js

# Sin script inline
grep -c "</script>" landing/index.html
# Expected: 0

# main.js referenciado
grep -c "js/main.js" landing/index.html
# Expected: 1

# hero-terminal.js eliminado
Test-Path landing/js/hero-terminal.js
# Expected: False

# Sin regresión REASP/RACSP
git diff --stat landing/REASP/ landing/RACSP/
# Expected: vacío
```

#### Paso 2 — Chrome 120+ smoke test

Abrir `landing/index.html` en Chrome 120+ (sin servidor, file://).

**Módulo 1 — Mobile menu:**
1. DevTools > Toggle device toolbar > iPhone 12 Pro (390×844).
2. Click en hamburger (3 spans).
3. Verificar que aparece dropdown con 6 links.
4. Click en "Servicios" → scroll suave a sección servicios, dropdown se cierra.
5. Click en hamburger de nuevo → dropdown aparece.
6. Click fuera del dropdown → dropdown se cierra.

**Módulo 2 — Hero terminal:**
1. DevTools > Console: 0 errores.
2. Esperar 1.5s.
3. Verificar que el terminal empieza a tipear.
4. Tras ~15s, verificar las 7 líneas completas.

**Módulo 3 — Scroll reveal:**
1. Scroll a sección Nosotros.
2. Verificar que las 4 cards aparecen con animación fade-in.
3. Scroll a sección Servicios.
4. Verificar que los 3 pilares aparecen con animación.

**Módulo 4 — Active nav:**
1. Scroll a sección Inicio.
2. Verificar que "Inicio" en nav tiene clase `.active`.
3. Scroll a sección Productos.
4. Verificar que "Productos" en nav tiene clase `.active`.

**Módulo 5 — Contact form:**
1. Scroll a sección Contacto.
2. Llenar los 3 campos (Nombre, Email, Mensaje).
3. Click en "Enviar Mensaje".
4. Verificar que form se "congela" 1s.
5. Verificar que aparece success banner verde.
6. Esperar 5s. Verificar que banner desaparece.

**Módulo 6 — Nav scroll effect:**
1. Scroll > 50px.
2. Verificar que el header `<header>` tiene clase `.scrolled`.

#### Paso 3 — Edge 120+ smoke test

Repetir Paso 2 con Edge.

#### Paso 4 — Firefox 120+ smoke test

Repetir Paso 2 con Firefox.

### 10.2 Reporte de resultados

Crear archivo `epics/09-scripts-interactivity/smoke-test-report.md` con:

```markdown
# Smoke Test Report — EPIC 09 PART 02

**Fecha:** 2026-07-09
**Tested by:** [nombre]
**Navegadores:** Chrome 120+, Edge 120+, Firefox 120+

## Resultados por módulo

| Módulo | Chrome | Edge | Firefox | Notas |
|--------|--------|------|---------|-------|
| 1. Mobile menu | ✅ PASS | ✅ PASS | ✅ PASS | OK |
| 2. Hero terminal | ✅ PASS | ✅ PASS | ✅ PASS | 15s duration |
| 3. Scroll reveal | ✅ PASS | ✅ PASS | ✅ PASS | OK |
| 4. Active nav | ✅ PASS | ✅ PASS | ✅ PASS | OK |
| 5. Contact form | ✅ PASS | ✅ PASS | ✅ PASS | OK |
| 6. Nav scroll effect | ✅ PASS | ✅ PASS | ✅ PASS | OK |

## Responsive

| Breakpoint | Chrome | Edge | Firefox |
|------------|--------|------|---------|
| 375px (mobile) | ✅ | ✅ | ✅ |
| 768px (tablet) | ✅ | ✅ | ✅ |
| 1440px (desktop) | ✅ | ✅ | ✅ |

## Errores encontrados

[Lista de errores encontrados, o "Ninguno"]

## Decisión

✅ SMOKE TEST PASS — `main.js` listo para producción.
```

### 10.3 Decisión sobre el reporte

**Decisión del planner:** crear `smoke-test-report.md` con resultados. Si hay errores, EPIC 09 reabre para corregir en un nuevo PART.

---

## 11. Automated Test Plan

Este PART es **principalmente manual** (smoke test). Los comandos automatizados verifican pre-condiciones, no el comportamiento en navegador.

### AT-155 — Verificación de sintaxis
- **Comando:** `node --check landing/js/main.js`.
- **Pass criteria:** Exit code 0.
- **Fallo:** Cualquier error.

### AT-156 — Verificación de no script inline
- **Comando:** `grep -c "<script>" landing/index.html`.
- **Pass criteria:** `1` (solo el `<script src="js/main.js">`).
- **Fallo:** `> 1` (script inline残留).

### AT-157 — Verificación de referenciación de main.js
- **Comando:** `grep -c "js/main.js" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-158 — Verificación de no regresión
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-159 — Verificación de performance básica
- **Comando:** Manual en Chrome DevTools > Lighthouse > Performance.
- **Pass criteria:** Performance ≥ 85 (sin regresión vs baseline).
- **Fallo:** `< 85`.

---

## 12. Manual Validation Checklist (Smoke Test)

Checklist exhaustivo para Ryou Reviewer en cada navegador:

### Mobile menu (Módulo 1)
- [ ] **ST-1:** Abrir `landing/index.html` en navegador, devtools → iPhone 12 Pro (390×844).
- [ ] **ST-2:** Hamburger visible en lugar de nav links.
- [ ] **ST-3:** Click en hamburger → dropdown aparece con 6 links.
- [ ] **ST-4:** Click en cualquier link → scroll suave a la sección Y dropdown se cierra.
- [ ] **ST-5:** Click en hamburger de nuevo → dropdown aparece.
- [ ] **ST-6:** Click fuera del dropdown → dropdown se cierra.

### Hero terminal (Módulo 2)
- [ ] **ST-7:** Esperar 1.5s tras page load.
- [ ] **ST-8:** Terminal empieza a tipear.
- [ ] **ST-9:** Tras ~15s, 7 líneas visibles en terminal.
- [ ] **ST-10:** Las líneas de tipo `cmd` se tipean char-by-char.
- [ ] **ST-11:** Las líneas de tipo `resp` aparecen completas.
- [ ] **ST-12:** La última línea ("✔ Generated 24 microservices...") está en verde (clase `success`).

### Scroll reveal (Módulo 3)
- [ ] **ST-13:** Scroll a sección Nosotros.
- [ ] **ST-14:** Las 4 cards aparecen con animación fade-in (clase `.revealed`).
- [ ] **ST-15:** Scroll a sección Servicios.
- [ ] **ST-16:** Los 3 pilares aparecen con animación.
- [ ] **ST-17:** Scroll a sección Productos.
- [ ] **ST-18:** Las 5 product-cards aparecen con animación.

### Active nav (Módulo 4)
- [ ] **ST-19:** En sección Inicio → nav link "Inicio" tiene `.active`.
- [ ] **ST-20:** Scroll a sección Servicios → nav link "Servicios" tiene `.active`.
- [ ] **ST-21:** Scroll a sección Productos → nav link "Productos" tiene `.active`.
- [ ] **ST-22:** Scroll a sección Open Source → nav link "Open Source" tiene `.active`.
- [ ] **ST-23:** Scroll a sección Nosotros → nav link "Nosotros" tiene `.active`.
- [ ] **ST-24:** Scroll a sección Contacto → nav link "Contacto" tiene `.active`.

### Contact form (Módulo 5)
- [ ] **ST-25:** Scroll a sección Contacto.
- [ ] **ST-26:** Llenar campos Nombre, Email, Mensaje.
- [ ] **ST-27:** Click "Enviar Mensaje".
- [ ] **ST-28:** Form se "congela" (opacity 0.5, pointer-events none) por 1s.
- [ ] **ST-29:** Form se resetea.
- [ ] **ST-30:** Success banner verde aparece con texto "¡Mensaje enviado!".
- [ ] **ST-31:** Banner desaparece tras 5s.

### Nav scroll effect (Módulo 6)
- [ ] **ST-32:** Scroll > 50px → header tiene clase `.scrolled`.
- [ ] **ST-33:** Scroll a top → header NO tiene clase `.scrolled`.

### Responsive
- [ ] **ST-34:** Renderizar en 375px (mobile) sin overflow horizontal.
- [ ] **ST-35:** Renderizar en 768px (tablet) con grid 2-cols donde aplique.
- [ ] **ST-36:** Renderizar en 1440px (desktop) con layout completo.

### Accesibilidad básica
- [ ] **ST-37:** Foco visible en nav links (outline o background).
- [ ] **ST-38:** Foco visible en form inputs.
- [ ] **ST-39:** Foco visible en botones (Submit, GitHub).
- [ ] **ST-40:** Navegación por teclado (Tab, Enter) en mobile menu.

### Errores
- [ ] **ST-41:** DevTools Console: 0 errores.
- [ ] **ST-42:** DevTools Network: solo `main.js` cargando.
- [ ] **ST-43:** DevTools Sources: `main.js` inspeccionable.

### Regresión
- [ ] **ST-44:** `landing/REASP/index.html` renderiza idéntico a antes.
- [ ] **ST-45:** `landing/RACSP/index.html` renderiza idéntico a antes.
- [ ] **ST-46:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` siguen intactos.

---

## 13. Technical Documentation to produce

### TD-Output-31 — Reporte de smoke test

Crear `epics/09-scripts-interactivity/smoke-test-report.md` con la tabla de resultados (ver §10.2).

### TD-Output-32 — Procedimiento de smoke test documentado

```markdown
# Procedimiento de Smoke Test — EPIC 09

## Pre-test
1. `node --check landing/js/main.js` → exit 0
2. `grep -c "</script>" landing/index.html` → 0
3. `grep -c "js/main.js" landing/index.html` → 1
4. `Test-Path landing/js/hero-terminal.js` → False
5. `git diff --stat landing/REASP/ landing/RACSP/` → vacío

## Navegadores a probar
- Chrome 120+
- Edge 120+
- Firefox 120+

## Módulos a validar
1. Mobile menu toggle
2. Hero terminal auto-typing
3. Scroll reveal (IntersectionObserver)
4. Active nav highlight
5. Contact form handler
6. Nav scroll effect (.scrolled class)

## Criterio de éxito
- 0 errores en consola.
- 6 módulos funcionan en 3 navegadores.
- Sin regresión en REASP/RACSP.
```

---

## 14. User Documentation to produce

### UD-Output-25 — Mensaje de commit sugerido (post-smoke test)

```
test(landing): smoke test main.js en Chrome/Edge/Firefox

- 6 módulos validados en 3 navegadores.
- 0 errores en consola.
- Sin regresión en REASP/RACSP.
- Performance ≥ 85 (sin regresión vs baseline).

Smoke test report: epics/09-scripts-interactivity/smoke-test-report.md

Refs: .refi/modules/keorsoft-landing-redesign/epics/09-scripts-interactivity/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-190:** El archivo `landing/js/main.js` pasa `node --check` con exit code 0.
- **AC-191:** El bloque `<script>...</script>` inline está eliminado (0 ocurrencias en HTML).
- **AC-192:** El archivo `landing/js/hero-terminal.js` está eliminado.
- **AC-193:** El `<script src="js/main.js" defer></script>` está presente antes de `</body>`.
- **AC-194:** Smoke test en Chrome 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-195:** Smoke test en Edge 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-196:** Smoke test en Firefox 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-197:** Validación responsive: 375px, 768px, 1440px sin overflow ni layout roto.
- **AC-198:** Validación accesibilidad: foco visible, navegación por teclado, labels asociados.
- **AC-199:** `landing/REASP/index.html` y `landing/RACSP/index.html` renderizan idénticos.
- **AC-200:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` siguen intactos.
- **AC-201:** DevTools > Network: solo `main.js` cargando.
- **AC-202:** DevTools > Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** `main.js` sintácticamente válido. Sin scripts inline残留. Carga con `defer`. DOMContentLoaded listener como defensa.
- [ ] **Gate 2 — Scope & Completeness Audit:** 6 módulos移植. Theme toggle eliminado. IDs preservados. Sin regresión.
- [ ] **Gate 3 — UX/Design Review:** UX-P67 a UX-P69 resueltos según §5. Smoke test cubre los 3 navegadores prioritarios. Accesibilidad básica validada.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado (46 sub-items). `grep` y `node --check` confirman pre-condiciones. DevTools Console 0 errores en 3 navegadores.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado. Si hay errores en el smoke test, reabrir EPIC 09 con un nuevo PART correctivo.
- [ ] **Gate 6 — Technical Documentation:** Reporte de smoke test (§13.1) creado. Procedimiento documentado (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado (post-smoke test exitoso).
- [ ] **Gate 8 — Final Review & Sign-off:** Las 13 Acceptance Criteria §15 verificadas. `main.js` validado end-to-end. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________