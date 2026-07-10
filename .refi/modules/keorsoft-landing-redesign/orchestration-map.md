# orchestration-map.md — Keorsoft Landing Redesign

> **Packet:** `keorsoft-landing-redesign`
> **Status:** planning-complete (100 % Ready for execution)
> **Total EPICs:** 11
> **Total PARTs:** 21
> **Critical Path:** EPIC 01 → EPIC 02 → ... → EPIC 11

---

## 1. Critical Path Diagram

```
EPIC 01 (Style Foundation, M) ──────────┐
   │                                    │
   ▼                                    │
EPIC 02 (Hero & Stats Strip, B)         │
   │                                    │
   ▼                                    │
EPIC 03 (About / Nosotros, B)           │
   │                                    │
   ▼                                    │
EPIC 04 (Services 3 Pilares, M)         │
   │                                    │
   ▼                                    │
EPIC 05 (Products 5 cards, M)           │
   │                                    │
   ▼                                    │
EPIC 06 (Open Source, B)                │
   │                                    │
   ▼                                    │
EPIC 07 (Contacto & Form, M)            │
   │                                    │
   ▼                                    │
EPIC 08 (Footer & Nav, B)               │
   │                                    │
   ▼                                    │
EPIC 09 (Scripts & Interactivity, M) ◄──┘  (depende de 02-08)
   │
   ▼
EPIC 11 (QA & Verification, A)  ◄── depende de 01-10

EPIC 10 (REASP Docs Update, A) ── paralelo, independiente (puede correr en cualquier momento tras Pass 2)
```

---

## 2. Per-EPIC Execution Order

### Fase 1 — Foundation (bloqueante, P0)

#### EPIC 01 — Style Foundation & Migration Audit
- **Depende de:** —
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `migration-audit` — Inventario de `Styles.css` + `<head>` + `<script>` actual.
- **PART02:** `css-replacement` — Reemplazo de `Styles.css` + ajuste de `<head>` + eliminación de theme toggle.
- **Output:** `epics/01-style-foundation/audit-inventory.md` + `landing/css/Styles.css` reemplazado + `landing/index.html` `<head>` modificado.

### Fase 2 — Landing Sections (secuencial, todas dependientes de EPIC 01)

#### EPIC 02 — Hero & Stats Strip
- **Depende de:** EPIC 01
- **Complejidad:** B
- **PARTs:** 2
- **PART01:** `hero-markup` — Reescribir `<section id="inicio">` con nueva estructura + terminal visualizer + 4 hero-badges.
- **PART02:** `hero-styles-and-terminal` — Bloque 8 hero + `js/hero-terminal.js` interim.
- **Output:** `landing/index.html` (líneas 70-179) + `Styles.css` (bloque 8) + `js/hero-terminal.js`.

#### EPIC 03 — About / Nosotros
- **Depende de:** EPIC 01
- **Complejidad:** B
- **PARTs:** 1
- **PART01:** `about-cards` — Markup + CSS de las 4 cards con glass-panel + top-bar preserved + `--accent-amber` token.
- **Output:** `landing/index.html` (líneas 181-262) + `Styles.css` (bloque 8.X) + token `--accent-amber` en `:root`.

#### EPIC 04 — Services (3 Pilares)
- **Depende de:** EPIC 01
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `pillars-markup` — Reescribir 7 services → 3 `.pillar-card` glass-panel (indigo/cyan/purple).
- **PART02:** `pillars-styles` — Bloque 8.Y con `.pillars-grid` + variants.
- **Output:** `landing/index.html` (líneas 264-405) + `Styles.css` (bloque 8.Y).

#### EPIC 05 — Products (5 cards)
- **Depende de:** EPIC 01
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `products-markup` — 5 product-cards con RACSP code-block + `--accent-orange` token + sub-card SHEndevour.
- **PART02:** `products-styles` — Bloque 8.Z con `.product-card*` + 11 clases `.cb-*` para syntax highlighting + CTA buttons.
- **Output:** `landing/index.html` (líneas 407-584) + `Styles.css` (bloque 8.Z) + token `--accent-orange` en `:root`.

#### EPIC 06 — Open Source
- **Depende de:** EPIC 01
- **Complejidad:** B
- **PARTs:** 1
- **PART01:** `opensource-cards` — 2 OSS cards (REASP + RACSP) + `.btn-outline` + `.oss-badge-production` + banner.
- **Output:** `landing/index.html` (líneas 586-668) + `Styles.css` (bloque 8.AA).

#### EPIC 07 — Contacto & Form
- **Depende de:** EPIC 01
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `contact-markup` — 4 contact-info-items + 4 social icons + form completo (3 inputs + submit + success banner). IDs `#contact-form` y `#form-success` preservados.
- **PART02:** `contact-styles` — Bloque 8.AB con `.contact-info-icon` (4 variants) + refactor `.social-icon` + `.form-success`.
- **Output:** `landing/index.html` (líneas 670-767) + `Styles.css` (bloque 8.AB).

#### EPIC 08 — Footer & Nav
- **Depende de:** EPIC 01
- **Complejidad:** B
- **PARTs:** 2
- **PART01:** `nav-redesign` — Sticky `<header>` con hamburger + 6 nav links + theme toggle ELIMINADO.
- **PART02:** `footer-redesign` — 4-col footer glass-panel con ❤ emoji.
- **Output:** `landing/index.html` (líneas 17-67 + 769-846) + `Styles.css` (bloque 8.AC + 8.AD).

### Fase 3 — Consolidation

#### EPIC 09 — Scripts & Interactivity
- **Depende de:** EPIC 02-08 (necesita los IDs finales de nav, mobile menu, form, etc.)
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `main-js-extract` — Consolidar scripts inline + `hero-terminal.js` en `js/main.js` con 6 módulos.
- **PART02:** `script-integration-test` — Smoke test cross-browser en Chrome/Edge/Firefox.
- **Output:** `landing/js/main.js` (eliminado inline + eliminado `hero-terminal.js`) + `epics/09-scripts-interactivity/smoke-test-report.md`.

### Fase 4 — REASP Docs (paralelo, P0)

#### EPIC 10 — REASP Docs Update
- **Depende de:** — (paralelo, independiente del critical path)
- **Complejidad:** A
- **PARTs:** 3
- **PART01:** `index-update` — Hero badge dual versioning + 2 features nuevas (Multi-Proveedor + REFI v2) + instalación CLI + compat Linux/MeridianUI.
- **PART02:** `docs-update-providers-refi` — Sección `#proveedores` + sección `#refi-v2` en `docs.html`.
- **PART03:** `docs-update-troubleshooting-compat` — 3 troubleshooting nuevos (instalación duplicada, providers, ModeProfile) + 2 compat items.
- **Output:** `landing/REASP/index.html` + `landing/REASP/docs.html` actualizados. Estilos intactos.

### Fase 5 — QA & Verification (cierre)

#### EPIC 11 — QA & Verification
- **Depende de:** EPIC 01-10 (todos)
- **Complejidad:** A
- **PARTs:** 2
- **PART01:** `lighthouse-and-crossbrowser` — Lighthouse audit + cross-browser smoke test + screenshot diff.
- **PART02:** `verification-and-progress` — Generar `orchestration-map.md` + `progress.md` + `verification.md` (Pass 3, este artefacto).
- **Output:** `epics/11-qa-verification/lighthouse-report.html` + `screenshots/` + cierre del packet.

---

## 3. Per-PART Execution with 8 Quality Gates

Para cada PART, las 8 puertas se ejecutan en **orden estricto** según `rules/quality-gates.md` v2:

| # | Gate | Descripción |
|---|------|-------------|
| 1 | **Architecture Review** | Coherencia con design tokens y arquitectura. |
| 2 | **Scope & Completeness Audit** | Tabla declared vs actual. |
| 3 | **UX/Design Review** | MeridianUI compliance si UI; contratos si no. |
| 4 | **Manual / Runtime Validation** | Checklist §12 ejecutado con tickboxes. |
| 5 | **Defect Closure** | Defectos de gates 1-4 cerrados en el mismo PART. |
| 6 | **Technical Documentation** | Docs técnicos producidos. |
| 7 | **User Documentation** | Docs de usuario producidos. |
| 8 | **Final Review & Sign-off** | Build 0/0 + suite verde + Acceptance Criteria re-leído + firma. |

**No se avanza a la siguiente PART sin cerrar las 8 puertas de la actual.**

---

## 4. Per-PART Execution Order

### Critical Path (Fases 1-3-5)
```
EPIC 01/PART01 → EPIC 01/PART02
   ↓
EPIC 02/PART01 → EPIC 02/PART02
   ↓
EPIC 03/PART01
   ↓
EPIC 04/PART01 → EPIC 04/PART02
   ↓
EPIC 05/PART01 → EPIC 05/PART02
   ↓
EPIC 06/PART01
   ↓
EPIC 07/PART01 → EPIC 07/PART02
   ↓
EPIC 08/PART01 → EPIC 08/PART02
   ↓
EPIC 09/PART01 → EPIC 09/PART02
   ↓
EPIC 11/PART01 → EPIC 11/PART02 (Pass 3)
```

### Paralelo (Fase 4)
```
EPIC 10/PART01 → EPIC 10/PART02 → EPIC 10/PART03
```

---

## 5. Estimated Effort

| Métrica | Estimación |
|---------|-----------|
| PARTs totales | 21 |
| Tiempo medio por PART | 30-90 min |
| Tiempo total estimado | ~21 horas focused |
| Agrupable en sprints | 6-8 sprints (~2-4 horas cada uno) |
| EPICs P0 | 01, 10 (priorizar) |
| EPICs P1 | 02-09 (secuenciales) |
| EPICs P2 | 11 (cierre) |

---

## 6. Hand-off to Ryou Orchestrator

Para cada PART, Ryou Orchestrator:

1. **Lee** el archivo `epics/<NN-slug>/parts/PARTnn_<slug>.md` completo.
2. **Implementa** los cambios descritos en §10 (Implementation Plan).
3. **Ejecuta** los comandos de §11 (Automated Test Plan).
4. **Completa** el checklist de §12 (Manual Validation Checklist).
5. **Firma** el footer (8 quality gates) del PART.
6. **Reporta** al planner para continuar con el siguiente PART.
7. **Si encuentra errores** que no puede resolver, **escalation** al planner antes de cerrar Gate 5.

### Constraints inquebrantables

- **NO** modificar `landing/REASP/css/styles.css`, `landing/REASP/js/main.js`, `landing/REASP/js/docs.js` (excepto EPIC 09 que crea `landing/js/main.js` separado).
- **NO** modificar `landing/RACSP/**` en ningún EPIC.
- **NO** saltar ninguna de las 8 quality gates.
- **NO** proceder con un PART si el anterior no está firmado (Gate 8).
- **NO** inventar archivos, endpoints, clases CSS, o contenido que no esté en los PARTs.

### Rollback strategy

Si un EPIC falla y no se puede resolver:
1. Documentar el fallo en `verification.md` con detalles.
2. Hacer rollback al último estado verde (commit anterior con EPICs 01-09 implementados parcialmente).
3. Reabrir el EPIC fallido con un nuevo PART correctivo.

---

## 7. Resumen de archivos del packet

```
.refi/modules/keorsoft-landing-redesign/
├── request.md                       (~8 KB)
├── master-blueprint.md              (~16 KB)
├── epics/
│   ├── matrix.md                    (~4 KB)
│   ├── 01-style-foundation/         (README + 2 PARTs)
│   ├── 02-hero-stats/               (README + 2 PARTs)
│   ├── 03-about-nosotros/           (README + 1 PART)
│   ├── 04-services-pillars/         (README + 2 PARTs)
│   ├── 05-products/                 (README + 2 PARTs)
│   ├── 06-open-source/              (README + 1 PART)
│   ├── 07-contact-form/             (README + 2 PARTs)
│   ├── 08-footer-nav/               (README + 2 PARTs)
│   ├── 09-scripts-interactivity/    (README + 2 PARTs + smoke-test-report.md)
│   ├── 10-reasp-docs-update/        (README + 3 PARTs)
│   └── 11-qa-verification/          (README + 2 PARTs + lighthouse-report.html + screenshots/)
├── orchestration-map.md             (este archivo)
├── progress.md
└── verification.md
```

**Total:** 14 archivos de planificación + 21 PART files = 35 archivos en el packet.