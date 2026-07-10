# PART 01 — Index Update (REASP Docs Update)

> **EPIC:** 10-reasp-docs-update
> **Slug:** `index-update`
> **Prioridad:** P0 (paralelo a EPIC 01-09)
> **Depende de:** —
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer (Documentation agent)

---

## 1. Purpose

Actualizar `landing/REASP/index.html` (598 líneas) para reflejar los cambios reales de REASP desde la sesión 2 (2026-06-26) hasta la sesión 5 (2026-07-09). Cambios clave:

1. **Versionado dual:** "Framework REASP v3.0.0 · CLI reasp-cli v1.0.1" en el hero.
2. **Instalación CLI global** (reemplaza el flujo obsoleto `git clone + node index.js`).
3. **2 cards nuevos en Features:** Provider Support + REFI v2.
4. **Sección Instalación reescrita** con `npm install -g reasp-cli` + `reasp install`.

**Regla dura:** NO se modifica `landing/REASP/css/styles.css` ni `landing/REASP/js/main.js` ni `landing/REASP/js/docs.js`. Solo contenido (textos, listas, secciones).

---

## 2. Current State

### 2.1 `landing/REASP/index.html` actual (598 líneas)

Secciones actuales (referenciadas por número de línea aproximado):

| Líneas | Sección | Contenido actual |
|--------|---------|------------------|
| 19-38 | Nav | Logo + 5 links (Presentacion, Caracteristicas, Arquitectura, Agentes, Instalacion) + Documentacion |
| 51-80 | Hero (`#presentacion`) | "v3.0.0 — Disponible Ahora" + "Sub-Agent Driven Development reimaginado." + CTAs |
| 76-78 | Hero version line | "Version 3.0.0 | .NET 9 | C# | PowerShell | OpenCode Go" |
| 82-111 | Filosofía (`#filosofia`) | "Conceptos > Codigo" + 3 cards (Contra la Inmediatez, Eficiencia de Contexto, Delegacion Consciente) |
| 113-156 | Features (`#caracteristicas`) | 6 cards (Adaptive Pipeline, Intelligent Model Routing, 8 Specialized Agents, TUI Installer, Slash Commands, AI Tools Programaticos) |
| 158-224 | ModeProfiles (`#modeprofiles`) | Tabla con 8 perfiles (ryouset, fast, architecture, ui, debug, enterprise, legacy, minimal) |
| 226-296 | Agentes (`#agentes`) | 8 agentes (EFI Planner, Orchestrator, Planner, Builder, Architect, Reviewer, Debugger, Documentation) |
| 298-365 | Arquitectura (`#arquitectura`) | Diagrama ASCII de `.opencode/` (agents/, rules/, sdd-profiles/, phases/, refi/, runtime/) |
| 367-403 | Pros & Cons | 8 ventajas + 4 limitaciones |
| 405-434 | Casos de Uso | 3 cards (Refactorizacion Legacy, UI con MeridianUI, Trabajo Offline) |
| 436-474 | Compatibilidad | 6 items (.NET 9, PowerShell, OpenCode Go, Multi-Provider AI, MeridianUI, Git Integration) |
| 476-546 | Instalación (`#instalacion`) | **OBSOLETO:** `git clone https://github.com/keorgtz/REASP.git` + `cd REASP/installer` + `npm install` + `node index.js` |
| 548-594 | Footer | Logo + 3 columnas (Producto, Recursos, Contacto) + bottom |

### 2.2 Cambios detectados en `REASP/AI/CONTEXT.md` y summaries

**Sesión 2 (2026-06-26) — Linux compat + MeridianUI global installer:**
- REASP ahora funciona en Linux/macOS (no solo Windows).
- `installer/lib/meridianui.js` copia `.MeridianUI/` → `~/.MeridianUI/`.
- Nuevos paths Linux/Unix (`unixPaths[]`).
- Script bash `scripts/reasp` con mode 100755.

**Sesión 3 (2026-07-08) — SDD Profile Provider Support:**
- `sdd_mode_profile` tool acepta argumento `provider`.
- TUI de selección de ModeProfile: 2 pasos (Proveedor → Modelo).
- 4 providers: opencode-go, anthropic, openai, google.
- Opción "Custom model" para strings manuales.
- 86 tests pasan (65 unitarios + 21 E2E).

**Sesión 4 (2026-07-09) — Install fix:**
- `package.json` → v1.0.1.
- `installer/scripts/postinstall.js` detecta instalación vieja y avisa.
- Adapter reemplaza directorios REASP-managed antes de copiar.
- 3 lugares donde REASP puede estar instalado: `C:\Program Files\REASP\`, `~/.config/opencode/`, `~/KeorSoft/Development/AITools/REASP`.
- `/share` y `/unshare` bridges añadidos en `.opencode/tui.js`.

**Sesión 5 (2026-07-09) — REFI v2 Epic + PART:**
- Metodología REFI v2 con Epic + PART.
- 7 EPICs × 27 PARTs documentados.
- 8 quality gates mecánicos.
- 2 STOP gates en el workflow (Gate A y Gate B).
- 4 legacy packets preservados con backward-compat.

### 2.3 Contenido preservado verbatim

**Hero title:** "Sub-Agent Driven Development reimaginado."
**Hero badge:** "v3.0.0 — Disponible Ahora"
**Hero subtitle:** "REASP (Ryou Enterprise Adaptive SDD Protocol) v3.0.0 — El primer Sistema Operativo de Desarrollo IA Adaptativo para OpenCode..."
**Filosofía:** "Conceptos > Codigo" + 3 cards verbatim.
**Features:** 6 cards existentes (Adaptive Pipeline, Intelligent Model Routing, 8 Specialized Agents, Modern TUI Installer, Slash Commands, AI Tools Programaticos).
**ModeProfiles:** Tabla completa con 8 perfiles.
**Agentes:** 8 agentes con prompts, modelos, steps.
**Arquitectura:** Diagrama ASCII preservado.
**Pros & Cons:** 8 ventajas + 4 limitaciones.
**Casos de Uso:** 3 cards preservados.
**Compatibilidad:** Stack base preservado.
**Footer:** Estructura preservada.

---

## 3. Comparison against baseline

### 3.1 Cambios por sección

| Sección | Cambio | Justificación |
|---------|--------|---------------|
| Hero badge | "v3.0.0 — Disponible Ahora" → "Framework v3.0.0 · CLI v1.0.1" | Dual versionado (N8) |
| Hero version line | "Version 3.0.0 | .NET 9 | C# | PowerShell | OpenCode Go" → "Framework v3.0.0 · CLI v1.0.1 | .NET 9 | C# | PowerShell | OpenCode Go" | Dual versionado (N8) |
| Features | Añadir 2 cards: "Soporte Multi-Proveedor" + "REFI v2 · Epic + PART" | N1, N4 |
| Compatibilidad | Mantener 6 items + añadir 2 items: "Linux/Unix + Volta", "MeridianUI Global Installer" | N9, N10 |
| Instalación | Reescribir completamente con `npm install -g reasp-cli` | N3 |

### 3.2 Secciones NO modificadas

- Nav (líneas 19-38): sin cambios (links siguen siendo los mismos).
- Filosofía (líneas 82-111): sin cambios (filosofía no ha evolucionado).
- ModeProfiles (líneas 158-224): sin cambios (8 perfiles siguen iguales).
- Agentes (líneas 226-296): sin cambios (8 agentes siguen iguales).
- Arquitectura (líneas 298-365): sin cambios (estructura de directorios preservada).
- Pros & Cons (líneas 367-403): actualizar ligeramente (añadir nota sobre backward-compat REFI v2 en ventajas).
- Casos de Uso (líneas 405-434): sin cambios (escenarios siguen vigentes).
- Footer (líneas 548-594): actualizar año si es necesario, pero mantener estructura.

### 3.3 Decisión sobre el orden de features

Mantener las 6 cards existentes en su orden + añadir 2 nuevas al final (N1 y N4).

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Modificar líneas específicas del hero (badge, version line).
- Añadir 2 cards nuevos en Features (después de las 6 existentes).
- Añadir 2 items nuevos en Compatibilidad (Linux/Unix, MeridianUI Installer).
- Reescribir sección Instalación con el flujo CLI global.
- Actualizar ligeramente Pros & Cons (mención de backward-compat).
- Añadir banner de "versionado dual" en algún lugar visible.

### 4.2 Lo que NO está en el scope

- **NO** se modifica `landing/REASP/css/styles.css` (29 KB intacto).
- **NO** se modifica `landing/REASP/js/main.js` (6.2 KB intacto).
- **NO** se modifica `landing/REASP/js/docs.js` (8.6 KB intacto).
- **NO** se migra el layout completo (sigue con Phosphor Icons + dark `#050505`).
- **NO** se cambian las clases CSS (los nuevos cards usan clases existentes como `.feature-card`).

---

## 5. UX Problems

### UX-P70 — Cambio de versión en hero puede confundir a usuarios existentes
El badge "v3.0.0 — Disponible Ahora" se reemplaza por "Framework v3.0.0 · CLI v1.0.1". Esto es más informativo pero requiere que el usuario entienda el dual versioning. **Decisión:** añadir tooltip o nota explicativa.

### UX-P71 — Nuevas features cards pueden saturar la sección
Las 6 cards existentes ya ocupan bastante espacio visual. Añadir 2 más puede hacer la sección densa. **Decisión:** mantener todas en una grid 3×3 (sería 9 cards en 3 filas). O mover algunas a sub-grid.

### UX-P72 — Instalación reescrita requiere que el usuario desinstale versión vieja
El nuevo flujo `npm install -g reasp-cli` puede tener conflictos con la versión vieja de `C:\Program Files\REASP\`. **Decisión:** añadir nota en la sección Instalación.

### UX-P73 — Compatibilidad con 8 items (vs 6 actuales)
Las 8 items de Compatibilidad pueden ser densas. **Decisión:** mantener grid 3 cols.

---

## 6. Backend / Logic Problems

N/A — documentation HTML.

---

## 7. Frontend / Presentation Problems

### Front-P81 — Clases CSS existentes para cards
`landing/REASP/index.html` usa `.feature-card` (líneas ~125 del archivo). Mantener esta clase para las 2 cards nuevas (consistencia visual).

### Front-P82 — `<span>` con gradiente en H1
Línea 60-61: `<h1 class="hero-title">Sub-Agent Driven Development<br><span class="gradient-text">reimaginado.</span></h1>`. Mantener.

### Front-P83 — Lista de items en Compatibilidad con iconos Phosphor
Líneas ~448-474: `<div class="compat-item"><i class="ph ph-dotnet-logo"></i><span>.NET 9</span></div>`. Mantener formato para los 2 items nuevos.

### Front-P84 — Code blocks con botones copy-to-clipboard
Líneas ~488-545: `<div class="code-block">` con `<button class="code-copy" data-copy="...">`. Mantener para los nuevos comandos del flujo CLI.

---

## 8. Technical Debt

### TD-53 — Instalación obsoleta en docs
La sección Instalación muestra `git clone + node index.js` que ya no es el flujo primario. **Acción:** reescribir.

### TD-54 — Falta documentación de multi-agente
Los docs no mencionan los 5 agentes soportados (Claude Code, Gemini CLI, Codex, Antigravity). **Acción:** añadir tabla en Compatibilidad o nueva sección.

### TD-55 — Falta documentación de REFI v2
Los docs no mencionan el upgrade REFI v2 con Epic + PART. **Acción:** añadir card en Features y mención en Pros.

### TD-56 — Falta documentación de /share, /unshare
Los slash commands listados en Features (línea 148) incluyen `/sdd`, `/sdd-mode`, etc., pero no `/share`, `/unshare`. **Acción:** actualizar lista.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-167:** Modificar el **hero badge** de "v3.0.0 — Disponible Ahora" a "Framework v3.0.0 · CLI v1.0.1" — verificable con `grep -c "Framework v3.0.0 · CLI v1.0.1" landing/REASP/index.html` que retorna `≥ 1` y `grep -c "v3.0.0 — Disponible Ahora" landing/REASP/index.html` que retorna `0`.
- **RI-168:** Modificar el **hero version line** para incluir el dual versioning — verificable con `grep -c "CLI v1.0.1" landing/REASP/index.html` que retorna `≥ 1`.
- **RI-169:** Añadir **2 cards nuevos en Features**: "Soporte Multi-Proveedor" + "REFI v2 · Epic + PART" — verificable con `grep -c "Multi-Proveedor\|Proveedor" landing/REASP/index.html` que retorna `≥ 1` y `grep -c "REFI v2\|Epic + PART" landing/REASP/index.html` que retorna `≥ 1`.
- **RI-170:** Añadir **2 items nuevos en Compatibilidad**: "Linux/Unix" + "MeridianUI Global Installer" — verificable con `grep -c "Linux/Unix\|Linux/macOS" landing/REASP/index.html` que retorna `≥ 1` y `grep -c "MeridianUI Global Installer\|MeridianUI Installer" landing/REASP/index.html` que retorna `≥ 1`.
- **RI-171:** Reescribir la **sección Instalación** con `npm install -g reasp-cli` — verificable con `grep -c "npm install -g reasp-cli" landing/REASP/index.html` que retorna `≥ 1` y `grep -c "git clone https://github.com/keorgtz/REASP.git" landing/REASP/index.html` que retorna `0`.
- **RI-172:** Actualizar **Slash Commands** en Features para incluir `/share` y `/unshare` — verificable con `grep -c "/share\|/unshare" landing/REASP/index.html` que retorna `≥ 2`.
- **RI-173:** Añadir **mención de REFI v2** en Pros (ventaja: backward-compat) — verificable con `grep -c "backward-compat\|backward compat\|backward compatibility" landing/REASP/index.html` que retorna `≥ 1`.
- **RI-174:** **NO modificar** `landing/REASP/css/styles.css` (29 KB) — verificable con `git diff --stat landing/REASP/css/styles.css` que retorna vacío.
- **RI-175:** **NO modificar** `landing/REASP/js/main.js` ni `landing/REASP/js/docs.js` — verificable con `git diff --stat landing/REASP/js/` que retorna vacío.
- **RI-176:** Sin regresión en `landing/RACSP/**` ni `landing/index.html` (estilo landing) — verificable con `git diff --stat landing/RACSP/ landing/index.html` que retorna vacío.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/REASP/index.html`

#### Cambio 1 — Hero badge (línea ~56)

**Actual:**
```html
<div class="hero-badge reveal">
  <i class="ph ph-sparkle"></i>
  <span>v3.0.0 — Disponible Ahora</span>
</div>
```

**Nuevo:**
```html
<div class="hero-badge reveal">
  <i class="ph ph-sparkle"></i>
  <span>Framework v3.0.0 · CLI v1.0.1</span>
</div>
```

#### Cambio 2 — Hero version line (línea ~77)

**Actual:**
```html
<div class="hero-version reveal reveal-delay-4">
  <i class="ph ph-git-commit"></i> Version 3.0.0 | .NET 9 | C# | PowerShell | OpenCode Go
</div>
```

**Nuevo:**
```html
<div class="hero-version reveal reveal-delay-4">
  <i class="ph ph-git-commit"></i> Framework v3.0.0 · CLI v1.0.1 | .NET 9 | C# | PowerShell | OpenCode Go
</div>
```

#### Cambio 3 — Features: añadir 2 cards (después de línea 154)

**Actual (líneas 145-154 muestran el final de los 6 features cards existentes):**
```html
<!-- 6 features cards: Adaptive Pipeline, Intelligent Model Routing, 8 Specialized Agents,
     Modern TUI Installer, Slash Commands, AI Tools Programaticos -->
```

**Nuevo (añadir 2 cards después):**
```html
<!-- (existing 6 cards above) -->

<!-- Card 7: Soporte Multi-Proveedor (N1) -->
<div class="card feature-card reveal reveal-delay-2">
  <div class="icon" style="background: rgba(6,182,212,0.1); color: var(--accent-cyan);">
    <i class="ph ph-stack"></i>
  </div>
  <h3>Soporte Multi-Proveedor</h3>
  <p>Selección explícita de proveedor en <code>sdd_mode_profile</code> con validación. 4 providers preconfigurados (opencode-go, anthropic, openai, google) + opción de custom models. 86 tests pasan.</p>
</div>

<!-- Card 8: REFI v2 · Epic + PART (N4) -->
<div class="card feature-card reveal reveal-delay-2">
  <div class="icon" style="background: rgba(139,92,246,0.1); color: var(--accent-purple);">
    <i class="ph ph-tree-structure"></i>
  </div>
  <h3>REFI v2 · Epic + PART</h3>
  <p>Metodología de planificación empresarial con Epic (subsistema) y PART (15 secciones + 8 quality gates). Workflow de 3 pasadas con 2 STOP gates que esperan confirmación del usuario antes de código.</p>
</div>
```

**Decisión sobre layout:** actualmente 6 cards en grid 3×2. Con 8 cards, se vuelve grid 3×3 (o 4×2). **Decisión:** mantener grid 3 cols, total 3 filas (3+3+2).

#### Cambio 4 — Compatibilidad: añadir 2 items (después de línea ~472)

**Actual (6 items):** .NET 9, PowerShell, OpenCode Go, Multi-Provider AI, MeridianUI, Git Integration.

**Nuevo (8 items):** añadir 2 después:
```html
<!-- (existing 6 compat-items above) -->

<div class="compat-item">
  <i class="ph ph-linux-logo"></i>
  <span>Linux/Unix + Volta</span>
</div>

<div class="compat-item">
  <i class="ph ph-package"></i>
  <span>MeridianUI Global Installer</span>
</div>
```

#### Cambio 5 — Slash Commands (línea ~148)

**Actual:**
```html
<p>Comandos rapidos integrados en OpenCode: <code>/sdd</code>, <code>/sdd-mode</code>, <code>/sdd-profile</code>, <code>/rass-setup</code>, <code>/reasp-setup</code>. Gestiona perfiles y workflows sin salir del editor.</p>
```

**Nuevo:**
```html
<p>Comandos rapidos integrados en OpenCode: <code>/sdd</code>, <code>/sdd-mode</code>, <code>/sdd-profile</code>, <code>/rass-setup</code>, <code>/reasp-setup</code>, <code>/share</code>, <code>/unshare</code>. Gestiona perfiles, workflows y sesiones compartidas sin salir del editor.</p>
```

#### Cambio 6 — Instalación: reescribir completamente (líneas 477-545)

**Actual (obsoleto):**
```html
<div class="install-step">
  <div class="step-number">1</div>
  <div class="step-content">
    <h3>Clonar el repositorio</h3>
    <p>Obtiene la ultima version de REASP desde GitHub.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="git clone https://github.com/keorgtz/REASP.git"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>git clone https://github.com/keorgtz/REASP.git</code></pre>
    </div>
  </div>
</div>

<div class="install-step">
  <div class="step-number">2</div>
  <div class="step-content">
    <h3>Entrar al directorio del instalador</h3>
    <p>Navega al directorio que contiene el TUI installer.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="cd REASP/installer"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>cd REASP/installer</code></pre>
    </div>
  </div>
</div>

<div class="install-step">
  <div class="step-number">3</div>
  <div class="step-content">
    <h3>Instalar dependencias</h3>
    <p>El instalador necesita Node.js para ejecutar la interfaz TUI.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="npm install"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>npm install</code></pre>
    </div>
  </div>
</div>

<div class="install-step">
  <div class="step-number">4</div>
  <div class="step-content">
    <h3>Ejecutar el instalador</h3>
    <p>Lanza el TUI interactivo para configurar REASP con tus preferencias.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="node index.js"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>node index.js</code></pre>
    </div>
  </div>
</div>
```

**Nuevo:**
```html
<div class="install-step">
  <div class="step-number">1</div>
  <div class="step-content">
    <h3>Instalar REASP globalmente</h3>
    <p>Instala el CLI <code>reasp-cli</code> (v1.0.1) globalmente via npm. Esto hace que el comando <code>reasp</code> esté disponible en todo tu sistema.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="npm install -g reasp-cli"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>npm install -g reasp-cli</code></pre>
    </div>
  </div>
</div>

<div class="install-step">
  <div class="step-number">2</div>
  <div class="step-content">
    <h3>Ejecutar el instalador TUI</h3>
    <p>Lanza el TUI interactivo para configurar REASP en tus agentes detectados (OpenCode, Claude Code, Gemini CLI, Codex, Antigravity CLI).</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="reasp install"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>reasp install</code></pre>
    </div>
  </div>
</div>

<div class="install-step">
  <div class="step-number">3</div>
  <div class="step-content">
    <h3>Seleccionar agente y ModeProfile</h3>
    <p>El TUI detecta agentes instalados y te permite seleccionar el ModeProfile deseado. También puedes elegir el proveedor y modelo en un flujo de 2 pasos (4 providers: opencode-go, anthropic, openai, google).</p>
  </div>
</div>

<div class="install-step">
  <div class="step-number">4</div>
  <div class="step-content">
    <h3>Verificar instalación</h3>
    <p>Comprueba que REASP está correctamente instalado y conectado a tu agente.</p>
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang">bash</span>
        <button class="code-copy" data-copy="reasp status"><i class="ph ph-copy"></i> Copiar</button>
      </div>
      <pre><code>reasp status</code></pre>
    </div>
  </div>
</div>
```

#### Cambio 7 — Pros: añadir bullet sobre REFI v2 backward-compat

**Actual (ventaja 8):**
```html
<li><i class="ph ph-check"></i> <strong>Open Source</strong> — MIT License, codigo abierto y transparente</li>
```

**Nuevo (añadir bullet 9 después):**
```html
<li><i class="ph ph-check"></i> <strong>Open Source</strong> — MIT License, codigo abierto y transparente</li>
<li><i class="ph ph-check"></i> <strong>REFI v2 Compatible</strong> — Workflow de planificación con Epic + PART, 8 quality gates mecánicos, 2 STOP gates. Backward-compatible con 4 paquetes legacy preservados.</li>
```

### 10.2 Archivos a NO TOCAR

- `landing/REASP/css/styles.css` (29 KB) — INTACTO.
- `landing/REASP/js/main.js` (6.2 KB) — INTACTO.
- `landing/REASP/js/docs.js` (8.6 KB) — INTACTO.
- `landing/REASP/assets/**` (si existe) — INTACTO.
- `landing/RACSP/**` — INTACTO.
- `landing/index.html` (estilo landing) — INTACTO (es EPIC 01-09).
- `landing/css/Styles.css` (estilo landing) — INTACTO.

---

## 11. Automated Test Plan

### AT-160 — Verificación de dual versioning
- **Comando:** `grep -c "Framework v3.0.0 · CLI v1.0.1" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "v3.0.0 — Disponible Ahora" landing/REASP/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0` (texto antiguo残留).

### AT-161 — Verificación de Multi-Proveedor
- **Comando:** `grep -c "Multi-Proveedor\|Proveedor" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-162 — Verificación de REFI v2
- **Comando:** `grep -c "REFI v2\|Epic + PART" landing/REASP/index.html`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-163 — Verificación de /share y /unshare
- **Comando:** `grep -c "/share\|/unshare" landing/REASP/index.html`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-164 — Verificación de instalación nueva
- **Comando:** `grep -c "npm install -g reasp-cli" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "git clone https://github.com/keorgtz/REASP.git" landing/REASP/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0` (instalación antigua残留).

- **Comando 3:** `grep -c "reasp install" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-165 — Verificación de Linux/Unix
- **Comando:** `grep -c "Linux/Unix\|Linux/macOS" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-166 — Verificación de MeridianUI Installer
- **Comando:** `grep -c "MeridianUI Global Installer\|MeridianUI Installer" landing/REASP/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-167 — Verificación de no-regresión en estilos/scripts
- **Comando:** `git diff --stat landing/REASP/css/styles.css landing/REASP/js/main.js landing/REASP/js/docs.js`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-168 — Verificación de no-regresión en RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Documentation agent (Gate 7):

- [ ] **MV-228:** Abrir `landing/REASP/index.html` en navegador: el hero muestra "Framework v3.0.0 · CLI v1.0.1" en el badge.
- [ ] **MV-229:** El hero version line incluye "CLI v1.0.1" además de .NET 9, C#, PowerShell, OpenCode Go.
- [ ] **MV-230:** La sección Features tiene 8 cards (6 originales + 2 nuevos): "Soporte Multi-Proveedor" y "REFI v2 · Epic + PART".
- [ ] **MV-231:** La card "Soporte Multi-Proveedor" menciona validación, 4 providers, custom models, 86 tests.
- [ ] **MV-232:** La card "REFI v2 · Epic + PART" menciona Epic + PART, 3 pasadas, 2 STOP gates, 8 quality gates.
- [ ] **MV-233:** La sección Compatibilidad tiene 8 items (6 originales + 2 nuevos): "Linux/Unix + Volta" y "MeridianUI Global Installer".
- [ ] **MV-234:** La sección Instalación muestra `npm install -g reasp-cli` como paso 1 (no `git clone`).
- [ ] **MV-235:** El paso 2 de Instalación muestra `reasp install` (no `node index.js`).
- [ ] **MV-236:** El paso 3 describe selección de agente y ModeProfile (incluyendo los 4 providers).
- [ ] **MV-237:** El paso 4 muestra `reasp status` para verificar.
- [ ] **MV-238:** El bullet 9 de Pros menciona "REFI v2 Compatible" con backward-compat.
- [ ] **MV-239:** La sección Slash Commands en Features incluye `/share` y `/unshare`.
- [ ] **MV-240:** El estilo visual (Phosphor Icons, dark `#050505`) se mantiene idéntico.
- [ ] **MV-241:** `landing/REASP/css/styles.css` no fue modificado (diff binario idéntico).
- [ ] **MV-242:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` no fueron modificados.
- [ ] **MV-243:** `landing/RACSP/**` no fue modificado.
- [ ] **MV-244:** El landing principal (`landing/index.html`) no fue modificado (este EPIC solo toca REASP docs).

---

## 13. Technical Documentation to produce

### TD-Output-33 — Comentarios en `landing/REASP/index.html`

```html
<!-- ══ EPIC 10 PART 01 · Index Update ═══════════════════════════════════ -->
<!-- Dual versioning: Framework v3.0.0 · CLI v1.0.1 (N8) -->
<!-- 2 features cards nuevos: Multi-Proveedor (N1) + REFI v2 (N4) -->
<!-- 2 compat items nuevos: Linux/Unix (N9) + MeridianUI Installer (N10) -->
<!-- Instalación: reescrita con flujo npm install -g (N3) -->
<!-- /share /unshare añadidos a slash commands (N6) -->
<!-- Estilos (.css, .js) NO modificados -->
```

### TD-Output-34 — Documentación de versión dual

> REASP tiene 2 versiones:
> - **Framework v3.0.0**: el sistema de planificación adaptativo (REFI, ModeProfiles, agentes). Documentado en el repo `REASP/`.
> - **CLI v1.0.1**: la herramienta npm `reasp-cli` que instala REASP en agentes. Se actualiza independientemente del framework.
>
> El landing muestra ambas versiones: "Framework v3.0.0 · CLI v1.0.1".

---

## 14. User Documentation to produce

### UD-Output-26 — Mensaje de commit sugerido

```
docs(REASP): actualizar landing/REASP/index.html con cambios recientes

- Hero: dual versioning "Framework v3.0.0 · CLI v1.0.1" (N8).
- Features: 2 cards nuevos (Multi-Proveedor, REFI v2) (N1, N4).
- Compatibilidad: 2 items nuevos (Linux/Unix, MeridianUI Installer) (N9, N10).
- Instalación: reescrita con `npm install -g reasp-cli` (N3).
- Slash commands: añadidos /share, /unshare (N6).
- Pros: bullet sobre REFI v2 backward-compat.
- Estilos (.css, .js) intactos (Phosphor + dark theme).

Refs: REASP/AI/CONTEXT.md, summary-2026-07-08.html, summary-2026-07-09.html
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-177:** El hero badge muestra "Framework v3.0.0 · CLI v1.0.1".
- **AC-178:** El hero version line incluye "CLI v1.0.1".
- **AC-179:** La sección Features tiene 8 cards (6 originales + 2 nuevos: "Soporte Multi-Proveedor" + "REFI v2 · Epic + PART").
- **AC-180:** La sección Compatibilidad tiene 8 items (6 originales + 2 nuevos: "Linux/Unix + Volta" + "MeridianUI Global Installer").
- **AC-181:** La sección Instalación muestra `npm install -g reasp-cli` como paso 1.
- **AC-182:** El paso 2 de Instalación muestra `reasp install`.
- **AC-183:** La sección Instalación NO contiene `git clone https://github.com/keorgtz/REASP.git` ni `node index.js`.
- **AC-184:** El bullet 9 de Pros menciona "REFI v2 Compatible".
- **AC-185:** Los Slash Commands en Features incluyen `/share` y `/unshare`.
- **AC-186:** `landing/REASP/css/styles.css` NO fue modificado (diff binario idéntico).
- **AC-187:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` NO fueron modificados.
- **AC-188:** `landing/RACSP/**` NO fue modificado.
- **AC-189:** El estilo visual (Phosphor Icons, dark `#050505`) se mantiene idéntico.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Dual versioning coherente. 2 features nuevas coherentes con el sistema (Multi-Proveedor usa tokens del repo, REFI v2 usa metodología del repo). Compatibilidad actualizada refleja el alcance real.
- [ ] **Gate 2 — Scope & Completeness Audit:** 7 cambios específicos realizados (hero badge, version line, 2 features, 2 compat, instalación, slash commands, pros). Estilos intactos.
- [ ] **Gate 3 — UX/Design Review:** UX-P70 a UX-P73 resueltos según §5. Hero badge informativo. Cards adicionales con grid consistente. Instalación clara con 4 pasos.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. Render visual coherente con el estilo existente.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Dual versioning documentado (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 13 Acceptance Criteria §15 verificadas. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________