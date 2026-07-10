# EPIC 14 — Quitar SHEndevour del Landing

> **Slug:** `14-remove-shendevour`
> **Prioridad:** P0
> **Depende de:** —
> **Complejidad:** B
> **PARTs planned:** 1

---

## 1. Identidad

- **Propósito:** El proyecto SHEndevour NO es de Keorsoft — es de otra empresa del usuario. Debe eliminarse completamente del landing para evitar confusión de marca.
- **Líneas generales:** 4 cambios puntuales en 1 archivo (`landing/index.html`). Sin cambios en CSS.

## 2. Goal

### Entrega
- Eliminar el sub-card de SHEndevour dentro de la card "SaaS Products" (líneas ~476-501).
- Eliminar el link "SHEndevour" del footer "Productos" (línea ~923).
- Mantener la card "SaaS Products" sin el sub-card (más simple, solo descripción + footer "Próximamente").
- Mantener el resto de productos (MeridianUI, Controls, SaaS, REASP, RACSP) intactos.

### NO entrega
- No modifica `landing/REASP/index.html` (REASP docs, 0 ocurrencias de SHEndevour).
- No modifica `landing/REASP/docs.html` (REASP docs, 0 ocurrencias de SHEndevour).
- No añade un producto sustituto.
- No cambia el SaaS card principal (solo elimina el sub-card interno).
- No elimina las clases CSS `.product-subcard*` (se mantienen por si se usan en otro lugar o se limpia en EPIC 11 futuro).

## 3. Scope

### Archivos que toca
- `landing/index.html` (líneas ~476-501, 923) — eliminación de 4 ocurrencias de "SHEndevour".

### NO toca
- `landing/css/Styles.css` — intacto (clases `.product-subcard*` se mantienen).
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/**` — intacto.

## 4. Stakeholders

- **Owner:** Ryou Orchestrator.
- **Validador:** Usuario final (Kevin).
- **Reviewers:** Ryou Reviewer (Gate 1 — coherencia de marca).

## 5. Acceptance Criteria (alto nivel)

### AC1: Sub-card de SHEndevour eliminado
- No aparece "SHEndevour" en la card "SaaS Products".
- La card SaaS sigue mostrando su título "SaaS Products", subtítulo, descripción, y footer "Próximamente: más soluciones verticales".

### AC2: Link SHEndevour del footer eliminado
- El footer "Productos" tiene 4 items: MeridianUI, Controls & Libraries, REASP, RACSP.
- No aparece link "SHEndevour" en el footer.

### AC3: 0 ocurrencias de "SHEndevour" en el landing
- Comando: `grep -c "SHEndevour" landing/index.html` retorna `0`.

### AC4: SaaS card más simple
- Sin sub-card, sin icono `hotel` (que era específico de SHEndevour).
- Estructura limpia: header + descripción + footer.

### AC5: Sin cambios en otros productos
- MeridianUI, Controls, REASP, RACSP intactos.
- Footer "Contacto" y "Secciones" intactos.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `remove-shendevour` | Eliminar sub-card SHEndevour de SaaS Products + link del footer | — |

## 7. Definition of Done

- `grep -c "SHEndevour" landing/index.html` retorna `0`.
- SaaS card visible con descripción + footer "Próximamente".
- Footer "Productos" con 4 items.
- Sin regresiones en otros productos.
- Sin cambios en CSS.

## 8. Open Questions / Risks

- **OQ1:** ¿Eliminamos también las clases CSS `.product-subcard*` (no usadas tras este cambio)? Decisión del planner: **NO**, se mantienen para evitar regresiones. Limpieza opcional en EPIC 11.
- **RK4:** Las clases `.product-subcard*` quedan sin uso. **Aceptable** — ocupan poco espacio en CSS. Limpieza futura.

## 9. Notes / References

- 4 ocurrencias de "SHEndevour" en `landing/index.html`:
  - Línea ~448: `<h4 class="product-subcard-title">SHEndevour</h4>`
  - Línea ~494: `<p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>`
  - Línea ~519: `<p class="product-subcard-desc">Versiones Desktop (WPF) y Web...</p>`
  - Línea ~923: `<li><a href="#productos" class="footer-link">SHEndevour</a></li>`

- El sub-card tiene un icono `<i>` o `<svg>` con `fa-hotel` o `ph-hotel` que también debe eliminarse (línea ~492).
