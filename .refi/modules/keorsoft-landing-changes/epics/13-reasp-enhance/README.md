# EPIC 13 — REASP Card Enhanced (decorar como RACSP)

> **Slug:** `13-reasp-enhance`
> **Prioridad:** P1
> **Depende de:** EPIC 14 (preferentemente, para que el SaaS card esté limpio antes de reorganizar)
> **Complejidad:** M
> **PARTs planned:** 2

---

## 1. Identidad

- **Propósito:** El card de REASP en la sección `#productos` del landing se ve más simple que el card de RACSP. Hacer que REASP tenga el mismo nivel de decoración visual: full-width layout con code-block decorativo, mac-buttons, syntax highlighting, 4 features en grid 2×2.

## 2. Goal

### Entrega
- REASP card pasa de `product-card` a `product-card product-card-wide` (full-width como RACSP).
- REASP card ahora tiene:
  - Header con icono + título + badge "Open Source" + subtítulo (igual que RACSP).
  - Descripción con `<strong>Production-Grade.</strong>` (énfasis al final).
  - 4 features en grid 2×2 (en lugar de 3 en columna).
  - CTA "Explorar REASP" con `.btn-cta-purple` (mantiene el accent púrpura).
  - **Code-block nuevo** con mac-buttons, título "reasp / stack" y código TypeScript/JSON con syntax highlighting (reutilizando las 11 clases `.cb-*`).
- El grid de productos se reorganiza: REASP y RACSP en la misma fila (2 columnas), después de MeridianUI/Controls y SaaS.

### NO entrega
- No modifica `landing/REASP/index.html` (la documentación REASP).
- No cambia el color del accent de REASP (sigue púrpura).
- No añade nuevos productos.
- No cambia otros productos (MeridianUI, Controls, SaaS).

## 3. Scope

### Archivos que toca
- `landing/index.html` (líneas 833-878) — REASP card reescrito completo con code-block.
- `landing/css/Styles.css` — **NO se modifica** (clases `.racsp-codeblock`, `.racsp-codeblock-overlay`, `.racsp-codeblock-title`, `.racsp-codeblock-code`, y 11 `.cb-*` ya existen).

### NO toca
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/**` — intacto.
- CSS nuevo (todo se reutiliza).

## 4. Stakeholders

- **Owner:** Ryou Orchestrator.
- **Validador:** Usuario final (Kevin).
- **Reviewers:** Ryou Reviewer (Gate 3 — UX/Design, verificar consistencia con RACSP).

## 5. Acceptance Criteria (alto nivel)

### AC1: REASP card full-width
- El card REASP tiene clase `product-card product-card-wide` (como RACSP).

### AC2: REASP card 4 features en grid
- 4 features en lugar de 3.
- Usan `.product-features-grid` (en lugar de `.product-features`).
- En grid 2×2 (CSS existente).

### AC3: REASP code-block presente
- Contiene `<div class="racsp-codeblock">` con mac-buttons.
- Título "reasp / stack" (no "racsp / protocol").
- Código con syntax highlighting usando clases `.cb-*` (mismas que RACSP).
- Background `#050b18` (igual que RACSP).
- Accent púrpura en el código (en lugar de naranja de RACSP).

### AC4: CTA "Explorar REASP" preservado
- Botón con `.btn-cta-purple` y link a `REASP/index.html`.

### AC5: Layout reorganizado
- En desktop (≥1024px): MeridianUI | Controls (fila 1), SaaS (fila 2 full-width), REASP | RACSP (fila 3, 2 cols).
- En mobile: todos los cards stack vertical (single column).

### AC6: Header REASP actualizado
- Subtítulo: "Ryou Enterprise Adaptive SDD Protocol" (preservado).
- Badge: "Open Source" (preservado).

### AC7: Descripción actualizada
- Misma copy del card original REASP pero con `<strong>Production-Grade.</strong>` al final (énfasis, como RACSP).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `reasp-codeblock` | Añadir code-block al REASP card con mac-buttons + syntax highlighting (reutilizando `.racsp-codeblock`) | — |
| 02 | `products-grid-reorg` | Reorganizar el grid de productos para que REASP y RACSP estén en la misma fila (2 cols) | 01 |

## 7. Definition of Done

- REASP card visualmente al mismo nivel de decoración que RACSP.
- 0 errores en consola.
- CSS no modificado (reutilización completa).
- 0 regresiones en otros productos.
- Responsive mobile funcional (cards stack vertical).

## 8. Open Questions / Risks

- **OQ1:** ¿El code-block de REASP debe tener 2 columnas (header + content) o 1 columna (full-width)? Decisión del planner: **igual que RACSP** (2 columnas con `.racsp-codeblock`). Confirmar en Gate A.
- **RK2:** El cambio de layout puede afectar la altura de la sección productos. Mitigación: aceptar que la sección sea más alta (es lo esperado para una vista más rica).
- **RK3:** El code-block añade altura al card. Mitigación: el card ahora es full-width, así que tiene más espacio horizontal. La altura se compensa.

## 9. Notes / References

- CSS classes reutilizadas: `.racsp-codeblock`, `.racsp-codeblock-overlay`, `.racsp-codeblock-title`, `.racsp-codeblock-code`, `.card-header`, `.mac-buttons`, `.mac-btn`, `.pulse-dot` (no usado aquí), `.product-card-wide`, `.product-card-wide-inner`, `.product-card-wide-content`, `.product-features-grid`, `.btn-cta-purple`, 11× `.cb-*`.
- Decisión D9: REASP usa accent púrpura (igual que antes), RACSP usa naranja.
- Layout esperado en desktop (≥1024px):
  ```
  +-----------------+-----------------+
  |   MeridianUI    |   Controls      |  (fila 1)
  +-----------------+-----------------+
  |               SaaS               |  (fila 2)
  +---------------------------------+
  +-----------------+-----------------+
  |     REASP       |     RACSP      |  (fila 3)
  |  [code-block]   |  [code-block]   |
  +-----------------+-----------------+
  ```
