# EPIC 05 — Products (5 cards)

> **Slug:** `05-products`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** M
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Rediseñar las 5 product-cards (MeridianUI, Controls & Libraries, SaaS SHEndevour, REASP, RACSP) con el lenguaje visual glass-panel del nuevo estilo, **manteniendo todo el contenido** (descripción, badges, features, código de RACSP).

## 2. Goal

### Entrega
- `<section id="productos">` reescrito con 5 product-cards adaptadas al estilo glass-panel.
- Card RACSP sigue siendo `lg:col-span-2` con su terminal-code-block visual (líneas 561-578 del landing actual).
- Botones "Explorar REASP" y "Explorar RACSP" preservados con sus gradientes.

### NO entrega
- No cambia el copy ni los badges.
- No añade nuevos productos.

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 407-584 (sección productos actual).
- `landing/css/Styles.css` — bloque `.product-card` con glassmorphism + preservación de `--c-bg` para el top-bar de color por card.

### NO toca
- Otras secciones.
- `landing/REASP/index.html` ni `landing/RACSP/index.html`.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX).

## 5. Acceptance Criteria (alto nivel)

- AC1: 5 cards presentes: MeridianUI (Internal), Controls & Libraries (Internal), SaaS Products (Live), REASP (Open Source), RACSP (Open Source + v2.0.0).
- AC2: Card RACSP ocupa `lg:col-span-2` y conserva el terminal-code-block con sintaxis highlighting.
- AC3: Cada card tiene icono `.pillar-icon-box` 56×56 con color accent propio (azul, indigo, verde, violeta, naranja).
- AC4: Badges `badge-internal`, `badge-live`, `badge-oss` preservados con sus colores.
- AC5: Links "Explorar REASP" → `REASP/index.html` y "Explorar RACSP" → `RACSP/index.html` siguen funcionales.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `products-markup` | Reescribir markup de las 5 product-cards | EPIC 01 |
| 02 | `products-styles` | CSS de product-card con glassmorphism + RACSP code block | 01 |

## 7. Definition of Done

- 5 cards visibles con hover effect consistente (translateY + border accent + glow).
- Terminal-code-block de RACSP con syntax highlighting preservado (colores actuales).
- Sin regresión responsive.

## 8. Open Questions / Risks

- **OQ1:** ¿Se mantiene el código YAML mostrado en RACSP card? (Asumido: SÍ, verbatim.)
- **RK1:** Enlaces relativos a `REASP/index.html` y `RACSP/index.html` deben seguir funcionando.

## 9. Notes / References

- **Copy a preservar verbatim:**
  - MeridianUI: "Un lenguaje visual propietario que fusiona Fluent Design, Material Expressive y el toque distintivo de Keorsoft..."
  - Controls & Libraries: "Librerías de controles de alto rendimiento para el ecosistema .NET..."
  - SaaS Products: "Pequeñas soluciones SaaS diseñadas para verticales específicos..." + sub-card SHEndevour.
  - REASP: "El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode..."
  - RACSP: "Protocolo de colaboración multi-agente para agentes de IA..." + código YAML.
- **Badges a preservar:** `badge-internal` (gris), `badge-live` (verde), `badge-oss` (violeta).
- **Code block RACSP:** Verbatim desde `landing/index.html` líneas 561-578.