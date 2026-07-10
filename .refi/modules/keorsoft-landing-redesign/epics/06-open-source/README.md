# EPIC 06 — Open Source (2 cards)

> **Slug:** `06-open-source`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** B
> **Estado:** `Planned` (PART detallado en Pass 2)
> **PARTs planned:** 1 · **PARTs detailed:** 1

---

## 1. Identidad

- **Propósito:** Rediseñar la sección "Open Source" del landing (REASP + RACSP) con glass-panel style, preservando el contenido (badges, botones).

## 2. Goal

### Entrega
- `<section id="opensource">` reescrito con 2 `.oss-card` (glass-panel) reemplazando las actuales.
- Badges preservados: "Open Source", version (v1.0.0 / v2.0.0), "MIT License", "Production" (solo RACSP).
- Botones "Explorar" / "GitHub" preservados.
- Banner "Comunidad driven" preservado.

### NO entrega
- No cambia el copy.

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 586-668 (sección open source actual).
- `landing/css/Styles.css` — bloque `.oss-card` con glassmorphism + preservación de `--c-bg`.

### NO toca
- Otras secciones.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX).

## 5. Acceptance Criteria (alto nivel)

- AC1: 2 cards: REASP + RACSP.
- AC2: Cada card tiene icono `.pillar-icon-box`, badges, descripción, y 2 CTAs (Explorar + GitHub).
- AC3: RACSP incluye badge `Production` adicional (color verde).
- AC4: Banner "Comunidad driven" preservado al final de la sección.
- AC5: Links a GitHub preservados (`https://github.com/keorgtz/REASP` y `https://github.com/keorgtz/RACSP`).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `opensource-cards` | Reescribir markup + CSS de las 2 OSS cards con glass-panel | EPIC 01 |

## 7. Definition of Done

- 2 cards con hover effect consistente.
- Banner "Comunidad driven" con icono `groups` visible.
- Sin regresión responsive.

## 8. Open Questions / Risks

- **OQ1:** ¿Se mantiene el nombre `keorgtz` en los enlaces a GitHub? Verificado: sí, ambos enlaces son `https://github.com/keorgtz/{REASP,RACSP}` en el landing actual.

## 9. Notes / References

- **Copy a preservar verbatim:**
  - REASP: "Framework de desarrollo IA adaptativo para OpenCode. Sistema operativo de desarrollo que evita loops infinitos y optimiza el uso de tokens."
  - RACSP: "Protocolo multi-agente para colaboración entre agentes de IA. Cerebro compartido, perfiles adaptativos y prevención de conflictos. Production-Grade v2.0.0."
- **Badge "Production":** Solo en RACSP, color verde `var(--em)`.