# EPIC 03 — About / Nosotros

> **Slug:** `03-about-nosotros`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** B
> **Estado:** `Planned` (PART detallado en Pass 2)
> **PARTs planned:** 1 · **PARTs detailed:** 1

---

## 1. Identidad

- **Propósito:** Rediseñar la sección "Nosotros" del landing con el estilo glass-panel del nuevo, preservando los 4 bloques de información actuales (Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores).

## 2. Goal

### Entrega
- `<section id="nosotros">` reescrito con 4 cards adaptadas al lenguaje visual nuevo (`.pillar-card` glass-panel o equivalente `.about-card` con glassmorphism).
- 3 valores (Innovación, Calidad, Developer Experience) preservados verbatim.

### NO entrega
- No elimina los orbes de fondo decorativos (los移植 como background-glow).
- No cambia el copy.

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 181-262 (sección nosotros actual).
- `landing/css/Styles.css` — bloque `.about-card` reescrito con glassmorphism (移植 parcial de `.pillar-card` de NEW líneas 612-696).

### NO toca
- Otras secciones.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX).

## 5. Acceptance Criteria (alto nivel)

- AC1: 4 cards presentes: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores.
- AC2: Card "Nuestros Valores" sigue siendo `md:col-span-2 lg:col-span-3` con grid interno de 3 valores.
- AC3: Cada card usa `backdrop-filter: blur(12px)` (glassmorphism).
- AC4: 3 valores verbatim: Innovación, Calidad, Developer Experience.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `about-cards` | Reescribir markup + CSS de las 4 cards con glass-panel | EPIC 01 |

## 7. Definition of Done

- Cards visibles en dark theme con borde sutil (`rgba(255,255,255,0.06)`).
- Hover effect: `translateY(-6px)` + `border-color` accent.
- Sin regresión responsive.

## 8. Open Questions / Risks

- **OQ1:** ¿Se mantienen los iconos Material Symbols (`corporate_fare`, `target`, `flag`, `stars`, `lightbulb`, `award_star`, `developer_mode`)? Decisión de EPIC 01 (OQ2) aplica.

## 9. Notes / References

- **Copy a preservar verbatim:**
  - Título: "Más que una consultora. Somos una empresa de tecnología."
  - Subtítulo: "Keorsoft nace de la convicción de que el software empresarial puede ser potente, hermoso y accesible al mismo tiempo."
  - Las 4 cards con sus textos exactos.
- **Estilo de card:** baseline de `.pillar-card` (NEW styles.css líneas 612-696) adaptado con el color por card del landing actual (azul, violeta, verde, ámbar).