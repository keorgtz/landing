# PART 01 — Lighthouse & Cross-Browser (QA & Verification)

> **EPIC:** 11-qa-verification
> **Slug:** `lighthouse-and-crossbrowser`
> **Prioridad:** P2 (cierre, depende de EPIC 01-10)
> **Depende de:** EPIC 01-10 (todos los demás)
> **Complejidad:** A
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer (Gate 8 final)

---

## 1. Purpose

Validar el packet completo `keorsoft-landing-redesign` ejecutando:
1. **Lighthouse audit** (Performance, Accessibility, Best Practices, SEO) para `landing/index.html`, `landing/REASP/index.html`, `landing/REASP/docs.html`.
2. **Cross-browser smoke test** en Chrome 120+, Edge 120+, Firefox 120+.
3. **Screenshot diff** en 4 breakpoints (320px, 768px, 1024px, 1440px) de las secciones críticas.
4. **Sin regresión** en `landing/RACSP/**`, `landing/REASP/css/**`, `landing/REASP/js/**`.

---

## 2. Current State

### 2.1 Estado del landing tras EPIC 01-09

- Hero (EPIC 02): terminal visualizer animado con comandos REASP.
- Nosotros (EPIC 03): 4 cards glass-panel con token `--accent-amber` añadido.
- Servicios (EPIC 04): 3 pilares (consolidación 7→3).
- Productos (EPIC 05): 5 product-cards con RACSP code block preservado y `--accent-orange` añadido.
- Open Source (EPIC 06): 2 OSS cards con `.btn-outline` añadido.
- Contacto (EPIC 07): form completo en glass-panel con form-success.
- Footer (EPIC 08): 4-cols footer glass-panel con sticky header.
- Scripts (EPIC 09): consolidados en `js/main.js` con 6 módulos.

### 2.2 Estado de REASP docs tras EPIC 10

- `landing/REASP/index.html`: dual versioning + 2 features nuevas + instalación CLI + compat Linux/MeridianUI.
- `landing/REASP/docs.html`: secciones `#proveedores` y `#refi-v2` + 3 troubleshooting nuevos + 2 compat items.
- Estilos preservados (Phosphor Icons + dark `#050505`).

### 2.3 Baseline de Lighthouse

| Página | Performance | Accessibility | Best Practices | SEO |
|--------|-------------|---------------|----------------|-----|
| `landing/index.html` (baseline) | ~85 | ~95 | ~90 | ~95 |
| `landing/REASP/index.html` (baseline) | ~88 | ~95 | ~90 | ~95 |
| `landing/REASP/docs.html` (baseline) | ~85 | ~95 | ~90 | ~95 |

**Targets:** Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95.

### 2.4 Navegadores a probar

- Chrome 120+ (motor Blink).
- Edge 120+ (motor Blink, basado en Chromium).
- Firefox 120+ (motor Gecko).

Safari se omite (no prioritario para el mercado de Keorsoft).

### 2.5 Breakpoints responsive

- **320px** (mobile pequeño, e.g., iPhone SE 1ª gen).
- **768px** (tablet, e.g., iPad).
- **1024px** (desktop pequeño).
- **1440px** (desktop estándar).

---

## 3. Comparison against baseline

### 3.1 Métricas esperadas tras implementación

| Métrica | Baseline | Target | Cambios esperados |
|---------|----------|--------|--------------------|
| Performance | 85 | ≥ 90 | -3 MB Tailwind CDN eliminado, +1 fuente (Fira Code ~80 KB) = mejora neta ~2.9 MB |
| Accessibility | 95 | ≥ 95 | Sin cambios significativos (mantenemos labels, contraste, foco) |
| Best Practices | 90 | ≥ 90 | + HTTPS, sin console errors, sin deprecated APIs |
| SEO | 95 | ≥ 95 | Meta description preservada, OG tags preservados |

### 3.2 Secciones críticas para screenshot diff

Las siguientes secciones deben renderizar visualmente en los 4 breakpoints:

1. **Hero** (con terminal visualizer).
2. **Nosotros** (4 cards con top-bar accent).
3. **Servicios** (3 pilares con bullets).
4. **Productos** (5 cards con RACSP code block).
5. **Open Source** (2 cards con badges).
6. **Contacto** (form con 3 inputs).
7. **Footer** (4 columnas con social icons).
8. **Nav** (sticky header).

### 3.3 Diferencias entre navegadores

- **Chrome / Edge** (Blink): comportamiento idéntico en la mayoría de los casos.
- **Firefox** (Gecko): puede tener diferencias en `backdrop-filter`, `IntersectionObserver` root margins, y font rendering.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Lighthouse audit en 3 páginas (landing, REASP/index, REASP/docs) en modo mobile + desktop.
- Smoke test cross-browser en 3 navegadores para los 6 módulos de `main.js`.
- Screenshot diff en 4 breakpoints (320, 768, 1024, 1440) de las 8 secciones críticas.
- Validación de no-regresión en `landing/RACSP/`, `landing/REASP/css/`, `landing/REASP/js/`.
- Reporte visual de QA en `epics/11-qa-verification/lighthouse-report.html` (estilo REASP summary).

### 4.2 Lo que NO está en el scope

- **NO** se mide bundle size (no aplica, es HTML estático sin build step).
- **NO** se añaden tests automatizados (no hay pipeline).
- **NO** se mide TTFB / server-side metrics (GitHub Pages / hosting externo no está en scope).
- **NO** se valida Safari (fuera de mercado objetivo).

---

## 5. UX Problems

### UX-P81 — Posibles diferencias de font rendering entre navegadores
La fuente Outfit + Inter + Fira Code puede renderizar ligeramente diferente en Firefox vs Chrome. **Decisión:** validar visualmente; documentar diferencias en el reporte.

### UX-P82 — `backdrop-filter` puede no funcionar en Firefox viejos
Firefox 120+ soporta `backdrop-filter` con prefijo `-webkit-backdrop-filter` (ya añadido en EPICs 01-09). Sin action adicional.

### UX-P83 — Lighthouse puede variar entre runs
Lighthouse Performance tiene variabilidad de ±5 puntos entre ejecuciones. **Decisión:** ejecutar 3 veces y reportar mediana.

---

## 6. Backend / Logic Problems

N/A — QA es client-side.

---

## 7. Frontend / Presentation Problems

### Front-P91 — Variabilidad de Lighthouse en modo mobile
Lighthouse mobile simula 4G throttled. La variabilidad puede ser alta. **Decisión:** ejecutar 3 veces y tomar mediana.

### Front-P92 — Screenshot diff requiere imágenes baseline
Para hacer diff visual, se necesitan capturas del estado anterior como referencia. **Decisión:** crear capturas del estado pre-implementación (puede requerir checkout git al estado anterior) y comparar con capturas del estado post-implementación.

### Front-P93 — Console errors específicos del navegador
Algunos warnings pueden aparecer solo en Firefox (e.g., `-webkit-backdrop-filter` deprecation). **Decisión:** aceptar warnings si son 0 errors.

---

## 8. Technical Debt

### TD-61 — No hay CI/CD pipeline
No hay automatización de Lighthouse en CI. **Decisión:** documentar como deuda técnica; ejecución manual.

### TD-62 — No hay visual regression testing
Screenshot diff requiere configuración de herramientas externas (Percy, Chromatic). **Decisión:** usar capturas manuales + inspección visual.

### TD-63 — Performance score puede degradarse con el tiempo
Sin monitoreo continuo, el score puede bajar con futuras modificaciones. **Decisión:** documentar baseline para comparación futura.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-196:** Ejecutar **Lighthouse mobile + desktop** en `landing/index.html` — verificable con captura del reporte Lighthouse. Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95.
- **RI-197:** Ejecutar **Lighthouse** en `landing/REASP/index.html` — verificable con captura. Performance ≥ 85, Accessibility ≥ 95.
- **RI-198:** Ejecutar **Lighthouse** en `landing/REASP/docs.html` — verificable con captura. Performance ≥ 80, Accessibility ≥ 95.
- **RI-199:** **Smoke test cross-browser** en Chrome 120+, Edge 120+, Firefox 120+ para los 6 módulos de `main.js` (mobile menu, hero terminal, scroll reveal, active nav, contact form, nav scroll) — verificable con reporte de smoke test.
- **RI-200:** **Screenshot diff** en 4 breakpoints (320, 768, 1024, 1440) para las 8 secciones críticas — verificable con capturas guardadas en `epics/11-qa-verification/screenshots/`.
- **RI-201:** Validar **sin regresión** en `landing/RACSP/` — verificable con `git diff --stat landing/RACSP/` vacío.
- **RI-202:** Validar **sin regresión** en `landing/REASP/css/styles.css` y `landing/REASP/js/` — verificable con `git diff --stat landing/REASP/css/ landing/REASP/js/` vacío.
- **RI-203:** Validar **0 errores en consola** del navegador en los 3 navegadores — verificable con DevTools Console.
- **RI-204:** Validar **contraste WCAG AA** en todas las secciones — verificable con Lighthouse Accessibility audit.
- **RI-205:** Validar **foco visible** en todos los elementos interactivos (nav links, buttons, form inputs, social icons) — verificable con DevTools y navegación por teclado.

---

## 10. Implementation Plan

### 10.1 Procedimiento de QA

#### Paso 1 — Lighthouse Audit

Abrir Chrome DevTools en cada página:
- `landing/index.html`
- `landing/REASP/index.html`
- `landing/REASP/docs.html`

En cada una:
1. DevTools > Lighthouse.
2. Configurar: Mobile + Desktop, todas las categorías.
3. "Analyze page load".
4. Ejecutar 3 veces y tomar mediana.
5. Capturar reporte (Save as HTML).

**Targets:**
| Página | Performance | Accessibility | Best Practices | SEO |
|--------|-------------|---------------|----------------|-----|
| landing/index.html | ≥ 90 | ≥ 95 | ≥ 90 | ≥ 95 |
| REASP/index.html | ≥ 85 | ≥ 95 | ≥ 85 | ≥ 95 |
| REASP/docs.html | ≥ 80 | ≥ 95 | ≥ 85 | ≥ 95 |

#### Paso 2 — Cross-browser smoke test

Para cada navegador (Chrome, Edge, Firefox):

1. Abrir `landing/index.html` (file:// o servidor local).
2. DevTools Console: 0 errores.
3. Probar los 6 módulos:
   - **Mobile menu:** Render en 390×844 (iPhone 12 Pro). Click en hamburger. Dropdown aparece.
   - **Hero terminal:** Esperar 1.5s. Terminal anima 7 líneas.
   - **Scroll reveal:** Scroll a Nosotros. Cards aparecen con animación.
   - **Active nav:** Scroll entre secciones. Nav link activo cambia.
   - **Contact form:** Scroll a Contacto. Llenar 3 campos. Submit. Banner aparece 5s.
   - **Nav scroll effect:** Scroll > 50px. Header tiene clase `.scrolled`.
4. Capturar resultado por navegador.

#### Paso 3 — Screenshot diff

Para cada uno de los 4 breakpoints (320, 768, 1024, 1440):

1. DevTools > Toggle device toolbar > seleccionar breakpoint.
2. Capturar screenshot de las 8 secciones críticas (hero, nosotros, servicios, productos, open source, contacto, footer, nav).
3. Guardar en `epics/11-qa-verification/screenshots/{breakpoint}/{seccion}.png`.
4. Comparar visualmente con el estilo esperado (basado en `KeorsoftLandingNEW/`).

#### Paso 4 — Validación de no-regresión

```bash
git diff --stat landing/RACSP/
# Expected: vacío

git diff --stat landing/REASP/css/styles.css
# Expected: vacío

git diff --stat landing/REASP/js/main.js landing/REASP/js/docs.js
# Expected: vacío
```

### 10.2 Reporte Lighthouse

Crear archivo `epics/11-qa-verification/lighthouse-report.html` con:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>QA Report — 2026-07-09 · Keorsoft Landing Redesign</title>
  <style>...</style>
</head>
<body>
  <h1>QA Report · Keorsoft Landing Redesign</h1>
  <p>Sesión QA · 2026-07-09</p>

  <h2>Lighthouse Audit</h2>
  <table>
    <thead>
      <tr><th>Página</th><th>Modo</th><th>Performance</th><th>Accessibility</th><th>Best Practices</th><th>SEO</th></tr>
    </thead>
    <tbody>
      <tr><td>landing/index.html</td><td>Mobile</td><td>92</td><td>96</td><td>92</td><td>96</td></tr>
      <tr><td>landing/index.html</td><td>Desktop</td><td>95</td><td>96</td><td>92</td><td>96</td></tr>
      <!-- REASP/index.html, REASP/docs.html -->
    </tbody>
  </table>

  <h2>Cross-browser Smoke Test</h2>
  <table>
    <thead>
      <tr><th>Módulo</th><th>Chrome 120+</th><th>Edge 120+</th><th>Firefox 120+</th></tr>
    </thead>
    <tbody>
      <tr><td>Mobile menu</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <!-- 5 más -->
    </tbody>
  </table>

  <h2>Screenshots</h2>
  <p>Ver <code>epics/11-qa-verification/screenshots/</code></p>

  <h2>Conclusión</h2>
  <p>✅ QA PASS · Packet listo para producción</p>
</body>
</html>
```

### 10.3 Archivos a CREAR

- `epics/11-qa-verification/lighthouse-report.html` (reporte visual estilo REASP summary).
- `epics/11-qa-verification/screenshots/{320,768,1024,1440}/{seccion}.png` (8 secciones × 4 breakpoints = 32 screenshots).

### 10.4 Archivos a NO TOCAR

- Ningún archivo de `landing/` se modifica en este PART (es solo QA).

---

## 11. Automated Test Plan

### AT-185 — Verificación de existencia de reporte Lighthouse
- **Comando:** `Test-Path .refi/modules/keorsoft-landing-redesign/epics/11-qa-verification/lighthouse-report.html`.
- **Pass criteria:** `True`.
- **Fallo:** `False`.

### AT-186 — Verificación de existencia de screenshots
- **Comando:** `Get-ChildItem -Path .refi/modules/keorsoft-landing-redesign/epics/11-qa-verification/screenshots/ -Recurse -File -Filter *.png | Measure-Object`.
- **Pass criteria:** `Count` ≥ 8 (al menos 8 secciones × 1 breakpoint mínimo).
- **Fallo:** `< 8`.

### AT-187 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-188 — Verificación de no-regresión REASP estilos
- **Comando:** `git diff --stat landing/REASP/css/styles.css landing/REASP/js/main.js landing/REASP/js/docs.js`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4 + Gate 8):

### Lighthouse Audit
- [ ] **QA-1:** `landing/index.html` mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95.
- [ ] **QA-2:** `landing/index.html` desktop: Performance ≥ 90, Accessibility ≥ 95.
- [ ] **QA-3:** `landing/REASP/index.html`: Performance ≥ 85, Accessibility ≥ 95.
- [ ] **QA-4:** `landing/REASP/docs.html`: Performance ≥ 80, Accessibility ≥ 95.

### Cross-browser Smoke Test
- [ ] **QA-5:** Chrome 120+: 6 módulos funcionan, 0 errores en consola.
- [ ] **QA-6:** Edge 120+: 6 módulos funcionan, 0 errores en consola.
- [ ] **QA-7:** Firefox 120+: 6 módulos funcionan, 0 errores en consola.

### Responsive Screenshot
- [ ] **QA-8:** Breakpoint 320px: layout mobile sin overflow horizontal.
- [ ] **QA-9:** Breakpoint 768px: grid 2-cols donde aplique.
- [ ] **QA-10:** Breakpoint 1024px: layout desktop pequeño.
- [ ] **QA-11:** Breakpoint 1440px: layout completo.

### Accesibilidad
- [ ] **QA-12:** Foco visible en todos los elementos interactivos.
- [ ] **QA-13:** Navegación por teclado (Tab, Enter, Escape) en mobile menu.
- [ ] **QA-14:** Labels asociados en form (Nombre, Email, Mensaje).
- [ ] **QA-15:** Contraste WCAG AA en texto sobre fondo dark.

### No-regresión
- [ ] **QA-16:** `landing/RACSP/index.html` renderiza idéntico a antes.
- [ ] **QA-17:** `landing/RACSP/index.html` y sus assets intactos.
- [ ] **QA-18:** `landing/REASP/css/styles.css` (29 KB) intacto (diff binario).
- [ ] **QA-19:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` intactos.

---

## 13. Technical Documentation to produce

### TD-Output-39 — Reporte Lighthouse

> **Lighthouse Audit Results** (3 páginas, mobile + desktop):
>
> | Página | Performance | Accessibility | Best Practices | SEO |
> |--------|-------------|---------------|----------------|-----|
> | landing/index.html (mobile) | XX | XX | XX | XX |
> | landing/index.html (desktop) | XX | XX | XX | XX |
> | REASP/index.html | XX | XX | XX | XX |
> | REASP/docs.html | XX | XX | XX | XX |
>
> **Cross-browser Smoke Test:** 6 módulos × 3 navegadores = 18/18 PASS.

### TD-Output-40 — Documentación de baseline

> **Baseline Lighthouse (pre-implementación):** Performance 85, Accessibility 95, SEO 95.
> **Target post-implementación:** Performance ≥ 90 (mejora esperada por eliminación de Tailwind CDN -3 MB).
>
> **Delta esperado:** +5 puntos en Performance por eliminación de Tailwind CDN (~3 MB) y mantenimiento de assets.

---

## 14. User Documentation to produce

### UD-Output-29 — Mensaje de commit sugerido

```
test(landing): QA audit · Lighthouse + cross-browser + screenshots

- Lighthouse mobile+desktop en landing/REASP/* (3 páginas).
- Smoke test cross-browser en Chrome/Edge/Firefox 120+.
- Screenshot diff en 4 breakpoints (320, 768, 1024, 1440).
- Sin regresión en RACSP o REASP estilos/scripts.

QA Report: .refi/modules/keorsoft-landing-redesign/epics/11-qa-verification/lighthouse-report.html

Refs: .refi/modules/keorsoft-landing-redesign/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-211:** El reporte Lighthouse existe en `epics/11-qa-verification/lighthouse-report.html`.
- **AC-212:** `landing/index.html` mobile Performance ≥ 90, Accessibility ≥ 95.
- **AC-213:** `landing/index.html` desktop Performance ≥ 90, Accessibility ≥ 95.
- **AC-214:** `landing/REASP/index.html` Performance ≥ 85, Accessibility ≥ 95.
- **AC-215:** `landing/REASP/docs.html` Performance ≥ 80, Accessibility ≥ 95.
- **AC-216:** Chrome 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-217:** Edge 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-218:** Firefox 120+: 6 módulos funcionan, 0 errores en consola.
- **AC-219:** Screenshots existen en `epics/11-qa-verification/screenshots/` (≥ 8 archivos).
- **AC-220:** `landing/RACSP/**` no fue modificado.
- **AC-221:** `landing/REASP/css/styles.css` y `landing/REASP/js/**` no fueron modificados.
- **AC-222:** Layout responsive sin overflow en 4 breakpoints.
- **AC-223:** Foco visible + navegación por teclado + labels asociados (WCAG 2.1 AA).

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Métricas baseline conocidas. Targets claros. 3 navegadores prioritarios definidos. 4 breakpoints cubren mobile a desktop.
- [ ] **Gate 2 — Scope & Completeness Audit:** 4 pasos ejecutados (Lighthouse, smoke test, screenshots, no-regresión). Reporte HTML creado con tablas y resultados.
- [ ] **Gate 3 — UX/Design Review:** UX-P81 a UX-P83 resueltos según §5. Lighthouse mobile + desktop. Screenshot diff 4 breakpoints.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. Lighthouse ejecutadas y capturadas. 3 navegadores probados. Screenshots guardados. No-regresión validado.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART. Si Lighthouse < target, reabrir con PART correctivo.
- [ ] **Gate 6 — Technical Documentation:** Reporte Lighthouse (§13.1) creado con tablas y resultados. Baseline documentado (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 13 Acceptance Criteria §15 verificadas. Packet validado end-to-end. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________