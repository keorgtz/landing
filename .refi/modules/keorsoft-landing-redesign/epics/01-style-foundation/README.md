# EPIC 01 — Style Foundation & Migration Audit

> **Slug:** `01-style-foundation`
> **Prioridad:** P0 (bloqueante)
> **Depende de:** —
> **Complejidad:** M
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Reemplazar la base de estilos del landing principal con los design tokens y la arquitectura CSS de `KeorsoftLandingNEW/`. Es el prerrequisito técnico de todos los EPICs visuales (02-09).
- **Líneas generales:** auditoría de inventario (iconos, secciones, fuentes), sustitución de `Styles.css`, sustitución de `<head>` (Tailwind → vanilla), reset y tipografía.

## 2. Goal

### Entrega
- `landing/css/Styles.css` reemplazado con los tokens de `KeorsoftLandingNEW/styles.css` (líneas 1-29) + reset (líneas 32-51) + tipografía (líneas 131-148).
- `landing/index.html` `<head>` actualizado: sin Tailwind CDN, con Google Fonts de Inter+Outfit+Fira Code, manteniendo Font Awesome para iconos de marca.
- Inventario publicado en este README (iconos usados, fuentes, assets).

### NO entrega
- No modifica ninguna sección del `<body>` del landing. Eso lo hace EPIC 02-08.
- No toca `landing/REASP/**` ni `landing/RACSP/**`.
- No toca `landing/css/Styles.css` más allá de la sustitución completa (no se hace merge, se reemplaza).

## 3. Scope

### Archivos que toca
- `landing/css/Styles.css` — **REEMPLAZO COMPLETO** (464 líneas → ~200 líneas iniciales + extensiones por EPIC).
- `landing/index.html` líneas 8-13 — **EDICIÓN** del `<head>`.
- `landing/index.html` línea 1 — **EDICIÓN** del `<html>` (eliminar `class="scroll-smooth" data-theme="dark"`).

### NO toca
- `landing/REASP/**`
- `landing/RACSP/**`
- `landing/index.html` `<body>`

## 4. Stakeholders

- **Owner del EPIC:** Ryou EFI Planner (Pass 2) → Ryou Orchestrator (ejecución).
- **Validador:** Usuario final (Kevin).
- **Reviewers:** Ryou Reviewer (Gate 1 — Arquitectura / coherencia de tokens).

## 5. Acceptance Criteria (alto nivel)

- AC1: `landing/index.html` NO contiene la cadena `cdn.tailwindcss.com`.
- AC2: `landing/index.html` SÍ contiene `Outfit` en Google Fonts.
- AC3: `Styles.css` define `:root { --bg-primary: #05070a; --accent-indigo: #6366f1; --accent-cyan: #06b6d4; --accent-emerald: #10b981; --accent-purple: #a855f7; --accent-rose: #f43f5e; }`.
- AC4: `Styles.css` define `--font-display: 'Outfit'`, `--font-sans: 'Inter'`, `--font-mono: 'Fira Code'`.
- AC5: `Styles.css` no contiene `data-theme="dark"` (decisión dark-only confirmada en Gate A).
- AC6: Lighthouse Performance ≥ 90 (medido en Gate 8).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `migration-audit` | Auditoría de inventario + decisión de iconografía | — |
| 02 | `css-replacement` | Reemplazo de `Styles.css` con tokens de NEW + reset + tipografía | 01 |

## 7. Definition of Done

- PARTs 01 y 02 firmados con las 8 puertas mecánicas (`quality-gates.md`).
- Lighthouse Performance ≥ 90 mobile.
- Diff de `Styles.css` revisado y aprobado.
- `<head>` auditado: no contiene CDN de Tailwind, sí contiene Outfit+Inter+Fira Code.

## 8. Open Questions / Risks

- **OQ1:** ¿Se mantiene el theme toggle light/dark? (Asumido: NO → dark-only). Confirmar en Gate A.
- **OQ2:** ¿Material Symbols Rounded se reemplaza por SVG inline o por Phosphor Icons? (Asumido: SVG inline copiados de NEW). Confirmar en Gate A.
- **RK1 (heredado):** Romper enlaces relativos al cambiar CSS.
- **RK3 (heredado):** Pérdida de iconografía si se decide reemplazar.

## 9. Notes / References

- **Baseline actual:** `landing/css/Styles.css` (464 líneas, Tailwind utility soup en `<body>`, dual theme).
- **Baseline nuevo:** `KeorsoftLandingNEW/styles.css` (1487 líneas, vanilla, dark-only).
- **Tokens a移植 (移植 = transplantar):** líneas 3-29 de `KeorsoftLandingNEW/styles.css`.
- **Reset a移植:** líneas 32-51.
- **Tipografía a移植:** líneas 131-148.
- **Reglas de diseño que aplican:** MeridianUI no se invoca aquí (es solo el landing), pero `rules/global-rules.md` §5 (UI/UX) aplica para tokens semánticos.