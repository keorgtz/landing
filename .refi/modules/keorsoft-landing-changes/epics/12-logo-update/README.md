# EPIC 12 — Logo Update (KeorsoftK-Icon)

> **Slug:** `12-logo-update`
> **Prioridad:** P0
> **Depende de:** —
> **Complejidad:** B
> **PARTs planned:** 1

---

## 1. Identidad

- **Propósito:** Sustituir el logo actual de Keorsoft (caja 32×32 con letra "K" generada por CSS `::before`) por el icono SVG real `KeorsoftK-Icon.svg` que existe en `landing/assets/`.
- **Líneas generales:** cambio atómico en 1 archivo (`landing/index.html`). Limpieza menor de CSS (eliminar `.logo-icon` y `.logo-icon::before`).

## 2. Goal

### Entrega
- Header nav (`<a class="logo">`): reemplazo del `<div class="logo-icon"></div>` por `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">`.
- Footer (`<a class="logo" style="font-size:1.25rem;">`): mismo reemplazo con `width="28" height="28"`.
- CSS cleanup: eliminar las reglas `.logo-icon` y `.logo-icon::before` (ya no se usan).

### NO entrega
- No modifica el favicon (`.ico` en `<head>`).
- No modifica el logo de REASP en `landing/REASP/`.
- No cambia el texto "Keorsoft" ni su gradiente.
- No toca otros archivos (solo `landing/index.html` + `landing/css/Styles.css`).

## 3. Scope

### Archivos que toca
- `landing/index.html` (líneas 22-25 y 880-883) — reemplazar `<div class="logo-icon"></div>` por `<img>`.
- `landing/css/Styles.css` — eliminar `.logo-icon` y `.logo-icon::before` (cleanup).

### NO toca
- `landing/assets/KeorsoftK-Icon.svg` — se usa tal cual.
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Favicon en `<head>` — fuera de scope.

## 4. Stakeholders

- **Owner:** Ryou Orchestrator.
- **Validador:** Usuario final (Kevin).
- **Reviewers:** Ryou Reviewer (Gate 3 — UX/Design).

## 5. Acceptance Criteria (alto nivel)

- AC1: Header nav muestra el icono KeorsoftK-Icon real (no la "K" CSS).
- AC2: Footer muestra el icono KeorsoftK-Icon real (no la "K" CSS).
- AC3: Tamaño del icono en header: 32×32 px (coincide con `.logo-icon` width/height originales).
- AC4: Tamaño del icono en footer: 28×28 px (un poco menor que header, decisión de diseño).
- AC5: El icono carga correctamente con `alt="Keorsoft"` para accesibilidad.
- AC6: CSS `.logo-icon` y `.logo-icon::before` eliminados (no son necesarios).
- AC7: Logo se ve correctamente en mobile (32×32 en header) y desktop (mismo).
- AC8: Logo se ve correctamente en retina (@2x → el SVG escala sin pixelarse).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `logo-replace` | Reemplazar logo-icon CSS con KeorsoftK-Icon SVG en header y footer + cleanup CSS | — |

## 7. Definition of Done

- Header y footer muestran el icono real.
- 0 errores en consola (verificar que `<img>` carga correctamente).
- CSS `.logo-icon` y `.logo-icon::before` eliminados.
- 0 regresiones en otros elementos del header/footer.
- Sin cambios en `landing/REASP/`, `landing/RACSP/`, `landing/assets/`.

## 8. Open Questions / Risks

- **OQ1:** ¿Tamaño del icono en footer debe ser 28×28 (más pequeño que header) o igual 32×32? Decisión del planner: **28×28** (jerarquía visual). Confirmar en Gate A.
- **RK1:** El SVG es complejo (3000×3000 viewBox) — verificar que se ve bien a 32×32 sin pixelarse. Mitigación: usar `viewBox` correcto, no `width`/`height` fijos en el `<svg>` original.

## 9. Notes / References

- Asset original: `landing/assets/KeorsoftK-Icon.svg` (139,261 bytes, viewBox 0 0 2250 2250).
- CSS actual: `.logo-icon` y `.logo-icon::before` en `Styles.css` (EPIC 08).
- Decisión D8: usar `<img src>` inline (mejor accesibilidad y SEO).
