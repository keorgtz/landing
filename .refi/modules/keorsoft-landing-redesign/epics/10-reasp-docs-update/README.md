# EPIC 10 — REASP Docs Update

> **Slug:** `10-reasp-docs-update`
> **Prioridad:** P0 (paralelo)
> **Depende de:** —
> **Complejidad:** A
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 3 · **PARTs detailed:** 3

---

## 1. Identidad

- **Propósito:** Actualizar el contenido de `landing/REASP/index.html` y `landing/REASP/docs.html` para reflejar los cambios reales de REASP de las últimas 4 sesiones (multi-agente, provider support, hardened install, REFI v2). **El estilo visual NO se toca** — sigue con Phosphor Icons, dark `#050505`, sidebar de docs.

## 2. Goal

### Entrega
- **Sección "¿Qué es REASP?"** actualizada con mención explícita a multi-agente (5 agentes), CLI global, REFI v2, MeridianUI global installer.
- **Sección "Instalación"** reescrita con el flujo actual: `npm install -g reasp-cli` + `reasp install`, NO `git clone + node index.js`.
- **Nueva sección "Soporte Multi-Proveedor"** (N1 del request): selección de provider, custom models, validación.
- **Nueva sección "REFI v2 · Epic + PART Methodology"** (N4): diagrama ASCII, tabla comparativa v1 vs v2, lista de las 8 puertas.
- **Nueva sección "Multi-Agente"** (N2): tabla comparativa de los 5 agentes (OpenCode, Claude Code, Gemini CLI, Codex, Antigravity).
- **Sección "Agentes Ryou"** ampliada con el `Ryou EFI Planner` (que ya existe en el index actual) + mención de que ahora hay 9 agentes (EFI Planner, Orchestrator, Planner, Builder, Architect, Reviewer, Debugger, Documentation — y agregar "Documentation" como agente de docs vs el actual "Documentation" del landing).
  - **NOTA:** El landing actual muestra 8 agentes (Ryou EFI Planner, Orchestrator, Planner, Builder, Architect, Reviewer, Debugger, Documentation). El CONTEXT.md confirma 5 agentes para el CLI pero los 8 del index son los prompts de agentes Ryou. Se mantienen los 8.
- **Sección "Slash Commands"** ampliada con `/share` y `/unshare` (N6).
- **Sección "Troubleshooting"** ampliada con 3 casos nuevos (N5): instalación duplicada en PATH, proveedores no aparecen en TUI, ModeProfile not found.
- **Sección "Compatibilidad"** ampliada con Linux/Unix (N9) y MeridianUI global installer (N10).
- **Banner de versionado dual** añadido al inicio: "Framework REASP v3.0.0 · CLI reasp-cli v1.0.1" (N8).
- **Sección "Productos relacionados"** nueva (N7): mención de ReportsEngines y AegisUI como productos Keorsoft que usan REASP.

### NO entrega
- **NO toca `landing/REASP/css/styles.css`** (29 KB, intacto).
- **NO toca `landing/REASP/js/main.js` ni `landing/REASP/js/docs.js`** (intactos).
- **NO migra a REFI v2** (sigue siendo docs tradicional con shards).
- **NO modifica `landing/RACSP/**`** (fuera de scope).

## 3. Scope

### Archivos que toca
- `landing/REASP/index.html` — solo contenido (textos, listas, secciones). NO markup estructural ni estilos inline.
- `landing/REASP/docs.html` — solo contenido. NO se toca la sidebar ni el layout.

### NO toca
- `landing/REASP/css/styles.css`
- `landing/REASP/js/main.js`
- `landing/REASP/js/docs.js`
- `landing/REASP/assets/**` (no existen en la inspección, pero se preservan si los hay).

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Documentation agent (Gate 6 — Technical Documentation), Ryou Reviewer (Gate 7 — User Documentation), Ryou Architect (Gate 1 — coherencia con la versión real del repo).

## 5. Acceptance Criteria (alto nivel)

- AC1: `landing/REASP/index.html` contiene el badge "Framework v3.0.0 · CLI v1.0.1" en el hero.
- AC2: La sección de instalación muestra `npm install -g reasp-cli` como comando principal, NO `git clone`.
- AC3: Existe una sección `#proveedores` con tabla de los 4 providers (opencode-go, anthropic, openai, google) + ejemplo de custom model + ejemplo de validación.
- AC4: Existe una sección `#refi-v2` con diagrama ASCII de las 3 pasadas + tabla de las 8 puertas.
- AC5: Existe una sección `#multi-agente` con tabla de los 5 agentes soportados (OpenCode, Claude Code, Gemini CLI, Codex, Antigravity).
- AC6: La sección "Slash Commands" lista `/sdd`, `/sdd-mode`, `/sdd-profile`, `/rass-setup`, `/reasp-setup`, `/share`, `/unshare` (7 total).
- AC7: La sección "Compatibilidad" lista `.NET 9`, `PowerShell`, `OpenCode Go`, `Multi-Provider AI`, `MeridianUI`, `Git Integration`, **+ Linux/Unix**, **+ MeridianUI Global Installer**.
- AC8: `landing/REASP/docs.html` (sidebar nav) refleja las nuevas secciones: agregar `proveedores`, `multi-agente`, `refi-v2`, `linux-unix` a las listas correspondientes.
- AC9: `landing/REASP/css/styles.css` no fue modificado (diff binario idéntico).
- AC10: `landing/REASP/js/*.js` no fueron modificados (diff binario idéntico).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `index-update` | Actualizar `landing/REASP/index.html` con nuevas secciones + versionado dual + instalación CLI | — |
| 02 | `docs-update-providers-refi` | Actualizar `landing/REASP/docs.html` con secciones de proveedores, REFI v2, multi-agente | 01 |
| 03 | `docs-update-troubleshooting-compat` | Actualizar `landing/REASP/docs.html` con troubleshooting (3 casos nuevos) + compatibilidad Linux/MeridianUI | 02 |

## 7. Definition of Done

- 8 puertas mecánicas firmadas en cada PART.
- Diff de `landing/REASP/css/styles.css` y `landing/REASP/js/*.js` = 0 bytes.
- Render manual en navegador: todas las nuevas secciones visibles y bien formateadas.
- Sidebar de `docs.html` funciona con las nuevas anclas.
- Sin regresión responsive.

## 8. Open Questions / Risks

- **OQ1:** Confirmar versión final del CLI: `1.0.1` (asumido desde `package.json`). Si se publica `1.0.2` antes de implementar, ajustar.
- **OQ2:** ¿Los 9 agentes del landing actual (REASP docs) se mantienen en 8 (sin EFI Planner que es meta) o en 9 (incluyendo EFI Planner como agente Ryou)? Asumido: **9 agentes**, ya que el EFI Planner sí es un agente Ryou con prompt en `.opencode/agents/ryou-efi-planner.md`.
- **OQ3:** ¿Se menciona que REASP ya tiene `Ryou EFI Planner` interno y REFI v2? Asumido: **SÍ**, es el feature más reciente.
- **RK4 (heredado):** Doble versionado. Resuelto con banner explícito.
- **RK7 (heredado):** Versión CLI puede cambiar antes de implementación.

## 9. Notes / References

- **Baseline actual:** `landing/REASP/index.html` (598 líneas) + `landing/REASP/docs.html` (~2000 líneas).
- **Source of truth (REASP repo):** `REASP/AI/CONTEXT.md`, `REASP/AI/Summarys/summary-2026-07-08.html`, `REASP/AI/Summarys/summary-2026-07-09.html`, `REASP/package.json` (versión `1.0.1`).
- **Cambios pendientes en landing/REASP/index.html (líneas aproximadas):**
  - Línea 6 (`<title>`): añadir "v3.0.0 · CLI 1.0.1".
  - Líneas 76-78 (hero version): "v3.0.0 — Framework · v1.0.1 — CLI".
  - Líneas 113-156 (Features): añadir 2 cards (Provider Support, REFI v2).
  - Líneas 477-545 (Instalación): reemplazar pasos 1-4 con flujo CLI.
  - Footer (líneas 587-594): actualizar año si aplica.
- **Cambios pendientes en landing/REASP/docs.html:**
  - Sidebar: añadir `Proveedores`, `REFI v2`, `Multi-Agente`, `Linux/Unix`, `MeridianUI Installer`.
  - Sección "Instalación Global" (línea 371): reemplazar con flujo CLI.
  - Nueva sección "Proveedores" después de "Modelos de IA" (línea 599).
  - Nueva sección "REFI v2" después de "AI Tools" (línea 735).
  - Nueva sección "Multi-Agente" después de "PowerShell Commands" (línea 819).
  - Sección "Troubleshooting" (línea 1552): añadir 3 casos.
  - Sección "Compatibilidad" (en docs.html — buscar): añadir Linux/Unix + MeridianUI.