# request.md — Solicitud original del usuario

> **Slug:** `keorsoft-landing-redesign`
> **Ruta del packet:** `.refi/modules/keorsoft-landing-redesign/`
> **Workspace:** `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLanding\landing`

---

## Verbatim del usuario

> "En estos ultimos dias he hecho cambios en mi REASP, y me gustaria actualizar mi pagina donde documento mi Framework el cual esta en esta ruta: `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLanding\landing` pero ademas la pagina principal de mi Keorsoft la cual esta en esa misma ruta, quiero mantener la info pero cambiando el estilo al estilo que tengo en esta otra pagina: `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLandingNEW` solo para la pagina principal de Keorsoft, y actualizar las novedades y documentacion de REASP claramente aunque manteniendo el estilo que ya tiene, generame toda la planificacion para llevar a cabo eso en mi pagina"

---

## Descomposición semántica de la solicitud

| # | Requisito explícito | Carpeta / archivo afectado | Mantener | Cambiar |
|---|---------------------|----------------------------|----------|---------|
| R1 | Documentar los cambios recientes de REASP | `landing/REASP/index.html` y `landing/REASP/docs.html` | Estilo visual actual (Phosphor Icons, dark `#050505`, cards con borde sutil) | Contenido: nuevas features (proveedores, REFI v2, multi-agente, share/unshare, install hardened) |
| R2 | Rediseñar el landing principal de Keorsoft con el estilo de KeorsoftLandingNEW | `landing/index.html` y `landing/css/Styles.css` | Toda la información actual: secciones, copy, productos, contacto, footer | Lenguaje visual: glass panels, sticky nav, terminal visualizer, dark theme, Outfit+Inter+Fira Code |
| R3 | El cambio de estilo aplica **solo** al landing principal de Keorsoft | `landing/REASP/**` y `landing/RACSP/**` | Sin cambios | Sin cambios |
| R4 | Generar toda la planificación antes de implementar | `.refi/modules/keorsoft-landing-redesign/**` | N/A — es meta-trabajo | N/A — es meta-trabajo |

---

## Restricciones duras (no negociables)

1. **El estilo de la página REASP NO se toca.** Solo contenido.
2. **El estilo del landing RACSP NO se toca.** (Sigue su propio patrón dark similar a REASP.)
3. **NO se mezcla el estilo nuevo en REASP/RACSP.** Son productos documentados con su propio lenguaje visual.
4. **Toda la información actual del landing Keorsoft se preserva verbatim** (no se reescribe copy, solo se mapea a los nuevos componentes visuales).
5. **REASP docs mantiene su framework visual:** Phosphor Icons (`@phosphor-icons/web`), fuente Inter + JetBrains Mono, paleta `#050505 → #111111`, navbar con `.scrolled`, sidebar de docs, copy-to-clipboard.
6. **Idioma del packet y de la implementación: español** (consistente con landing y docs existentes).

---

## Cambios de REASP documentados pero NO presentes aún en la web

Detectados durante la auditoría contra `REASP/AI/CONTEXT.md`, `summary-2026-07-08.html`, `summary-2026-07-09.html` y `package.json` (versión `1.0.1`):

| # | Feature reciente | Sesión | Estado actual en `landing/REASP/` | Acción web |
|---|------------------|--------|-----------------------------------|------------|
| N1 | **SDD Profile Provider Support** — selección explícita de proveedor + custom models + `sdd_mode_profile provider=` | 2026-07-08 | **Ausente** del todo | Añadir sección dedicada |
| N2 | **Multi-agente (5 agentes)** — OpenCode, Claude Code, Gemini CLI, Codex, Antigravity | 2026-06-16 | Solo menciona OpenCode | Añadir tabla comparativa |
| N3 | **CLI global `reasp` (npm install -g)** + subcomandos `install / uninstall / detect / status / local / snapshot` | 2026-06-16 | Install via `git clone + node index.js` (obsoleto) | Reescribir sección de instalación |
| N4 | **REFI v2 Epic + PART methodology** (7 EPICs × 27 PARTs, 8 gates mecánicos, 2 STOP gates) | 2026-07-09 | **Ausente** | Añadir sección + diagrama ASCII |
| N5 | **Install hardened / PATH fix / postinstall** — fix de instalación duplicada en `C:\Program Files\REASP\` y validación de PATH | 2026-07-09 | **Ausente** | Añadir troubleshooting |
| N6 | **`/share` y `/unshare` command bridges** para TUI de OpenCode 1.17.17+ | 2026-07-09 | **Ausente** | Añadir al listado de slash commands |
| N7 | **ReportsEngines** y **AegisUI** mencionados en el landing nuevo | n/a (producto) | Solo en landing nuevo | Documentar como productos relacionados |
| N8 | **REASP CLI v1.0.1** (vs framework v3.0.0 conceptual) | 2026-07-09 | Muestra v3.0.0 | Aclarar dual versioning: framework v3.0.0, CLI v1.0.1 |
| N9 | **Compatibilidad Linux/macOS** (sesión 2, 2026-06-26) | 2026-06-26 | Solo dice `.NET 9 / PowerShell / OpenCode Go` | Añadir bloque Linux/Unix + Volta |
| N10 | **MeridianUI global installer** (`~/.MeridianUI/`) | 2026-06-26 | Solo menciona MeridianUI como "design system" | Documentar el flujo de despliegue |

---

## Asunción explícita (marca si te equivoco)

- **Asumido:** Quieres conservar el **toggle de tema light/dark** del landing actual. La página nueva de referencia (`KeorsoftLandingNEW`) es dark-only.
  - **Pregunta Gate A:** ¿Mantenemos toggle light/dark o pasamos a dark-only como el nuevo estilo?
- **Asumido:** El **terminal visualizer animado** del hero nuevo es deseable.
  - Si no, el hero se queda solo con el copy y badges (más simple).
- **Asumido:** El **cotizador interactivo** (estimator con precios en USD) del landing nuevo NO se incluye en esta primera iteración.
  - Los precios hardcoded (`$12,000`, `$6,500`, etc.) son del sitio de marketing de Keorsoft Inc. y pueden no aplicar al contexto mexicano actual.
- **Asumido:** El **simulador REASP** (`/sdd` simulator) del landing nuevo NO se incluye en esta primera iteración.
  - Ya hay REASP en el landing actual y enlaza a `REASP/index.html` con su documentación completa.
- **Asumido:** El **playground MeridianUI vs AegisUI** NO se incluye. Se mantiene el product-card textual.
- **Asumido:** Se mantiene el **contact form funcional** actual (no modal). El modal del landing nuevo se omite por no haber backend de envío real.

> **Estas asunciones se confirman o ajustan en Gate A. NO iniciaré implementación hasta entonces.**

---

## Riesgos identificados (resumen)

| ID | Riesgo | Mitigación propuesta |
|----|--------|----------------------|
| RK1 | Romper enlaces relativos a `REASP/` y `RACSP/` durante el rediseño del landing | Auditoría completa de `<a href>` antes de cualquier cambio (Gate 2) |
| RK2 | Regresión responsive al cambiar de Tailwind a vanilla CSS | Snapshot manual de 4 breakpoints (320, 768, 1024, 1440) en Gate 4 |
| RK3 | Pérdida de iconografía Material Symbols Rounded del landing actual | Inventario de iconos usados (65+) en Gate 1 + decisión sobre reemplazo |
| RK4 | Inconsistencia entre docs de REASP y landing de REASP (doble versionado) | Banner explícito "Framework v3.0.0 · CLI v1.0.1" en ambos lugares |
| RK5 | Pérdida de SEO (meta description, og:image) durante el rediseño | Auditoría de `<head>` antes/después con diff en Gate 2 |
| RK6 | El cotizador y el simulador del nuevo landing tienen precios/scripts que NO aplican | Decididos arriba como fuera-de-alcance de esta primera iteración |
| RK7 | Cambio en `package.json`/`installer/scripts/postinstall.js` aún no commiteado | Confirmar con usuario si la versión 1.0.1 es la final antes de publicar |
| RK8 | El estilo actual de REASP docs (Phosphor + dark `#050505`) se mantiene, pero su CSS es de 29 KB — verificar que se preserve 1:1 | Diff binario de `styles.css` en Gate 8 |