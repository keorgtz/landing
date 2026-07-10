# EPIC 11 — QA, Accessibility, Responsive & Verification

> **Slug:** `11-qa-verification`
> **Prioridad:** P2
> **Depende de:** EPIC 01-10
> **Complejidad:** A
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Validación end-to-end del packet: las 8 puertas mecánicas a nivel packet, métricas Lighthouse, validación visual en 4 breakpoints, smoke test en 3 navegadores, y `verification.md` agregado.

## 2. Goal

### Entrega
- **Reporte Lighthouse** (mobile, 4G simulated) para `landing/index.html`: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 95.
- **Reporte Lighthouse** para `landing/REASP/index.html` y `landing/REASP/docs.html`: sin regresión vs baseline.
- **Screenshot diff** en 4 breakpoints (320, 768, 1024, 1440) de las secciones críticas (hero, servicios, productos, contacto, footer).
- **Smoke test** en Chrome, Edge, Firefox:
  - Hamburger menu toggle.
  - Terminal hero typing animation.
  - Form submit simulation.
  - Scroll reveal animations.
  - Active nav highlight.
- **Validación WCAG 2.1 AA**: contraste, focus visible, labels asociados, navegación por teclado.
- **`verification.md`** (raíz del packet) con tabla agregada de las 8 puertas a nivel packet + link a los 21 footers de PART firmados.

### NO entrega
- No añade tests automatizados (no hay pipeline en este repo de HTML estático).
- No mide bundle size (no aplica, es HTML estático sin build step).

## 3. Scope

### Archivos que toca
- `.refi/modules/keorsoft-landing-redesign/verification.md` — **NUEVO** (plantilla).
- `.refi/modules/keorsoft-landing-redesign/progress.md` — actualizado con estado final.
- (Opcional) `landing/Audit-2026-07-09.html` — reporte visual de QA estilo REASP summary.

### NO toca
- Código de producción.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 8 — Final Review & Sign-off).

## 5. Acceptance Criteria (alto nivel)

### Landing principal (`landing/index.html`)
- AC1: Lighthouse Performance ≥ 90 (mobile).
- AC2: Lighthouse Accessibility ≥ 95.
- AC3: Lighthouse Best Practices ≥ 90.
- AC4: Lighthouse SEO ≥ 95.
- AC5: Renderiza correctamente en Chrome 120+, Edge 120+, Firefox 120+.
- AC6: 0 errores en consola del navegador.
- AC7: 0 warnings críticos en consola del navegador.

### REASP docs
- AC8: Sin regresión Lighthouse vs baseline (capturado antes de implementar).
- AC9: Sidebar de docs funciona con las nuevas anclas.
- AC10: Copy-to-clipboard funciona en bloques `<code>`.

### Packet-level
- AC11: 21 PARTs firmados con las 8 puertas.
- AC12: `verification.md` agregado con tabla de gates por EPIC.
- AC13: `progress.md` muestra 100% global.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `lighthouse-and-crossbrowser` | Lighthouse + smoke test cross-browser + screenshot diff | EPIC 01-10 |
| 02 | `verification-and-progress` | `verification.md` + `progress.md` finales + reporte visual opcional | 01 |

## 7. Definition of Done

- Las 13 ACs verificadas.
- `verification.md` firmado con todas las 8 puertas a nivel packet.
- `progress.md` muestra `100% · Done`.

## 8. Open Questions / Risks

- **OQ1:** ¿Se crea un `landing/Audit-2026-07-09.html` estilo REASP summary? (Asumido: opcional, según preferencia del usuario.)
- **OQ2:** ¿Se ejecuta Lighthouse CLI o se mide manualmente en Chrome DevTools? (Asumido: Chrome DevTools + Lighthouse extensión.)

## 9. Notes / References

- **Baseline a capturar ANTES de implementar** (necesario para AC8):
  - Lighthouse Performance actual de `landing/index.html`: ~85.
  - Lighthouse Performance actual de `landing/REASP/index.html`: ~88.
  - Captura con DevTools > Lighthouse > Generate report > Save as HTML.
- **Reglas de validación visual:** comparar contra screenshots del estilo nuevo (`KeorsoftLandingNEW/`) para los componentes移植 (hero, pillar-card, footer).
- **Template `verification.md`:** se basa en la estructura de los 4 packets legacy en `REASP/.refi/modules/`.
- **Smoke test:** ejecución manual en navegador real. Si no hay acceso a 3 navegadores, documentar la limitación.