# EPIC 08 — Footer & Nav

> **Slug:** `08-footer-nav`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** B
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Rediseñar la nav (pill flotante → sticky con glass) y el footer (4 columnas + bottom) del landing con el estilo nuevo, **preservando todos los enlaces, el copyright, y el mensaje "Diseñado con ❤ por Keorsoft UX/UI"**.

## 2. Goal

### Entrega

#### Nav
- `<nav>` actual (líneas 17-67, pill flotante con theme toggle) reemplazado por sticky nav con glass-panel.
- Hamburger menu con 3 spans animado a X (mismo patrón que NEW,移植 de `app.js` líneas 49-53).
- 6 enlaces: Inicio, Servicios, Productos, Open Source, Nosotros, Contacto.
- Botón "Contactar" → `https://wa.me/523327633233`.
- **Theme toggle ELIMINADO** (decisión dark-only confirmada en Gate A).

#### Footer
- `<footer>` rediseñado con 4 columnas (Company + Secciones + Productos + Contacto)移植 del patrón NEW `footer-container` (líneas 1256-1316).
- Mantiene:
  - "KEORSOFT" logo + descripción de la empresa.
  - 4 social icons (LinkedIn, Facebook, Instagram, GitHub).
  - Sección "Secciones" con 6 links.
  - Sección "Productos" con 5 links (MeridianUI, Controls & Libraries, SHEndevour, REASP, RACSP).
  - Sección "Contacto" con 4 items (Ubicación, Email, Teléfono, WhatsApp).
  - Bottom: copyright "© 2026 Keorsoft. Todos los derechos reservados." + mensaje "Diseñado con ❤ por Keorsoft UX/UI".

### NO entrega
- No añade newsletter signup.
- No añade links a redes que no estén actualmente (LinkedIn, Facebook, Instagram son `#`).

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 17-67 (nav actual).
- `landing/index.html` líneas 769-846 (footer actual).
- `landing/css/Styles.css` — bloque `header` + `.nav-container` + `.logo` + `.nav-menu` + `.nav-link` + `.menu-toggle` + `.nav-cta-btn` (移植 de NEW líneas 151-268) + bloque `footer` + `.footer-container` + `.footer-brand` + `.footer-links-col` + `.footer-link` (移植 de NEW líneas 1249-1316).

### NO toca
- Otras secciones.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX).

## 5. Acceptance Criteria (alto nivel)

### Nav
- AC1: `<header>` sticky top con `backdrop-filter: blur(16px)` y border-bottom.
- AC2: 6 nav-links + CTA "Contactar" + hamburger (visible solo en mobile).
- AC3: Click en hamburger alterna clase `.active` en `.nav-menu` (animación spans a X).
- AC4: Theme toggle eliminado (no hay botón con `id="theme-toggle"` en el HTML).
- AC5: Logo "Keorsoft" con gradiente blanco→indigo en el texto (`background-clip: text`).

### Footer
- AC6: 4 columnas visibles en desktop, 1 columna en mobile.
- AC7: Bottom con copyright + mensaje "Diseñado con ❤ por Keorsoft UX/UI".
- AC8: Hover en `.footer-link` cambia color a `--text-primary` y aplica `translateX(4px)`.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `nav-redesign` | Reescribir `<nav>` con sticky header + hamburger | EPIC 01 |
| 02 | `footer-redesign` | Reescribir `<footer>` con 4 columnas glass-panel | 01 |

## 7. Definition of Done

- Sticky nav con backdrop-filter funcional.
- Hamburger funcional en mobile (≤ 1024px).
- Footer responsive 4 cols → 1 col.
- Sin regresión de los enlaces existentes.

## 8. Open Questions / Risks

- **OQ1:** ¿Se elimina el theme toggle? (Asumido: SÍ, dark-only.)
- **OQ2:** ¿El "❤" del footer bottom se mantiene como Material Symbol `favorite` o se cambia por emoji HTML? (Asumido: emoji HTML para evitar dependencia de Material Symbols.)

## 9. Notes / References

- **Nav source (NEW):** `index.html` líneas 33-55, `styles.css` líneas 151-268, `app.js` líneas 6-20.
- **Footer source (NEW):** `index.html` líneas 405-450, `styles.css` líneas 1249-1316.
- **Logo actual:** `<a href="#inicio">` con `<div>K</div>` + `<span>KEOR<span class="text-blue-500">SOFT</span></span>`. Se transplanta con ajuste de color a `--accent-indigo`.
- **Hamburger animation:** NEW `app.js` líneas 10-19.