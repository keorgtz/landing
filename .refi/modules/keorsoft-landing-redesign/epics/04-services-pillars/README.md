# EPIC 04 — Services (3 Pilares)

> **Slug:** `04-services-pillars`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** M
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Consolidar las 7 service-cards actuales del landing en los **3 pilares** del estilo nuevo (`Aplicaciones Enterprise`, `Infraestructura y Redes`, `Developer & AI Tools`), preservando el contenido semántico.

## 2. Goal

### Entrega
- `<section id="servicios">` reescrito con 3 `.pillar-card` (glass-panel) reemplazando las 7 cards actuales.
- Cada pilar agrupa los servicios actuales:
  - **Pilar 1 — Aplicaciones Enterprise:** Software Empresarial (CRM/ERP/POS) + Custom .NET Development (ASP.NET Core, Blazor, MAUI).
  - **Pilar 2 — Infraestructura y Redes:** Infraestructura de Redes y Hardware + Ciberseguridad Básica.
  - **Pilar 3 — Developer & AI Tools:** Diseño UX/UI + AI Consulting & Integration + Enterprise Architecture (Clean Arch, CQRS, DDD).
- Lista de bullets por pilar con checks SVG (mismo patrón que NEW).
- Card "Enterprise Architecture" como `.pillar-card md:col-span-2 lg:col-span-3` con grid interno (Clean Arch, CQRS, DDD).

### NO entrega
- No añade cotizador (es decisión de scope, fuera de EPIC).
- No elimina la card "Enterprise Architecture" — solo la reubica dentro del pilar 3.

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 264-405 (sección servicios actual, 141 líneas).
- `landing/css/Styles.css` — bloque `.pillar-card` + `.pillar-icon-box` + `.pillar-item` (移植 de NEW líneas 605-696).

### NO toca
- Otras secciones.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX).

## 5. Acceptance Criteria (alto nivel)

- AC1: 3 pilares visibles, cada uno con icono de caja de 56×56 (`.pillar-icon-box`).
- AC2: Cada pilar tiene 3-4 bullets con checks SVG inline.
- AC3: El copy del pilar 1 menciona "CRM personalizados", "Sistemas POS rápidos y sin fricción", "PMS (Property Management Systems)", "Integraciones API de alta disponibilidad".
- AC4: El copy del pilar 2 menciona "Instalación física de servidores y racks", "Diseño e instalación de infraestructura de red", "Protocolos de enrutamiento y seguridad", "Auditorías de ciberseguridad básica".
- AC5: El copy del pilar 3 menciona "ReportsEngines", "Protocolo IA Reasp (Anti-alucinaciones)", "Paquetes de componentes UI (C#, JS)", "Sistemas de diseño MeridianUI y AegisUI".
- AC6: Card "Enterprise Architecture" preservada como `.pillar-card md:col-span-2 lg:col-span-3` con sub-grid de 3 valores.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `pillars-markup` | Reescribir markup de los 3 pilares + Enterprise Architecture | EPIC 01 |
| 02 | `pillars-styles` |移植 `.pillar-card` + `.pillar-icon-box` + `.pillar-item` CSS | 01 |

## 7. Definition of Done

- 3 pilares visibles en desktop (grid 3 cols), 1 col en mobile.
- Hover effect idéntico a NEW (translateY + border accent + glow).
- Sin regresión responsive.

## 8. Open Questions / Risks

- **OQ1:** Confirmar que la consolidación 7→3 es la decisión correcta. Si el usuario quiere mantener las 7 cards individuales con el nuevo estilo, este EPIC se replanifica.
- **RK2:** Si OQ1 = NO, EPIC 04 se convierte en un refactor mecánico (7 cards × glass-panel style), mucho más simple.

## 9. Notes / References

- **Decisión de diseño:** Adoptar el patrón "3 pilares" del NEW porque el usuario lo diseñó así explícitamente. Si el usuario quiere mantener el detalle de las 7 cards, se ajusta.
- **Bullet source (NEW):** `index.html` líneas 117-196 — los bullets exactos a移植.
- **Card source (actual):** `landing/index.html` líneas 281-401 — copy detallado por si se decide mantener las 7.