# PART 03 — Docs Update Troubleshooting + Compat (REASP Docs Update)

> **EPIC:** 10-reasp-docs-update
> **Slug:** `docs-update-troubleshooting-compat`
> **Prioridad:** P0 (paralelo a EPIC 01-09)
> **Depende de:** EPIC 10 PART 01 (Index Update) + EPIC 10 PART 02 (Providers + REFI v2)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer (Documentation agent)

---

## 1. Purpose

Completar la actualización de `landing/REASP/docs.html` con:
1. **3 casos nuevos de Troubleshooting** (N5: instalación duplicada en PATH, providers no aparecen en TUI, ModeProfile not found).
2. **Compatibilidad Linux/Unix + MeridianUI Global Installer** (N9, N10) añadidos a la sección Compatibilidad.

**Regla dura:** NO se modifica `landing/REASP/css/styles.css` ni `landing/REASP/js/*`.

---

## 2. Current State

### 2.1 `landing/REASP/docs.html` actual

Tras EPIC 10/PART 01 + PART 02, el docs.html tiene:
- Sidebar actualizada con "Proveedores" en Conceptos Clave y "REFI v2" en Metodología.
- Sección `#proveedores` (N1) añadida.
- Sección `#refi-v2` (N4) añadida.
- **Pendiente:** 3 casos de troubleshooting (N5) + Compatibilidad Linux/Unix (N9) + MeridianUI Installer (N10).

### 2.2 Sección Troubleshooting actual (líneas 1552-2000+)

La sección existe con varios casos preexistentes. Necesita 3 casos nuevos basados en `summary-2026-07-09.html`:

**Caso 1: Instalación duplicada en PATH** (N5)
- 3 instalaciones simultáneas posibles: `C:\Program Files\REASP\`, `%APPDATA%\npm\node_modules\reasp-cli`, `~/KeorSoft/Development/AITools/REASP`.
- Cuando escribes `reasp`, Windows puede resolver a la versión vieja.
- Solución: robocopy o eliminación de la instalación vieja.

**Caso 2: Proveedores no aparecen en TUI** (N5)
- El selector de proveedores muestra lista vacía.
- Causa: `api.state.provider` no se inicializa correctamente.
- Solución: verificar versión de OpenCode (1.17.17+).

**Caso 3: ModeProfile not found** (N5)
- Al ejecutar `reasp switch`, no encuentra el ModeProfile solicitado.
- Causa: hash mismatch entre repo y `~/.config/opencode/`.
- Solución: `node scripts/sync-reasp.js push` para sincronizar.

### 2.3 Sección Compatibilidad actual

Tras EPIC 10/PART 02, debería tener ya:
- 6 items originales (`.NET 9`, `PowerShell`, `OpenCode Go`, `Multi-Provider AI`, `MeridianUI`, `Git Integration`).

**Pendiente:** añadir 2 items:
- "Linux/Unix + Volta" (N9).
- "MeridianUI Global Installer" (N10).

---

## 3. Comparison against baseline

### 3.1 Nuevos casos vs existentes

| Caso | Tag | Tema |
|------|-----|------|
| Existente 1 | (varios) | Error de instalación |
| Existente 2 | ... | ... |
| **Nuevo 1** | 🔧 instalacion-duplicada | 3 instalaciones en PATH |
| **Nuevo 2** | 🤖 providers-no-aparecen | TUI selector vacío |
| **Nuevo 3** | 🔍 modeprofile-not-found | Hash mismatch |
| **Nuevo 4** | 🐧 linux-unix | Compatibilidad Fedora/Ubuntu |
| **Nuevo 5** | 📦 meridianui-installer | ~/.MeridianUI/ vacío |

### 3.2 Decisión sobre formato

- Cada caso: `<h3>` con icono Phosphor + descripción del problema + causa + 3-5 pasos de solución.
- Code blocks con `data-copy` para comandos robocopy/robocopy, sync-reasp.js, etc.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Añadir 3 casos nuevos a la sección Troubleshooting.
- Añadir 2 items nuevos a la sección Compatibilidad (Linux/Unix, MeridianUI Installer).
- Actualizar la sidebar con anclas para los nuevos troubleshooting items (opcional, scroll-to-section).

### 4.2 Lo que NO está en el scope

- **NO** se modifica `landing/REASP/css/styles.css`.
- **NO** se modifica `landing/REASP/js/main.js` ni `docs.js`.

---

## 5. UX Problems

### UX-P77 — Sección Troubleshooting crece
Ya hay casos preexistentes. Añadir 3 más puede hacer la sección muy larga. **Decisión:** añadir y aceptar.

### UX-P78 — Items de Compatibilidad pasan de 6 a 8
Aceptable (grid 4×2 o 3×3).

### UX-P79 — Code blocks con comandos complejos (robocopy)
Los comandos Windows (robocopy, Remove-Item) son específicos de PowerShell. **Decisión:** usar `bash` como code-lang (es PowerShell-compatible).

---

## 6. Backend / Logic Problems

N/A — documentation.

---

## 7. Frontend / Presentation Problems

### Front-P88 — Reutilización de clases para Troubleshooting
Las clases existentes (`.card`, `.code-block`, `.install-steps`, `.install-step`) son suficientes para los nuevos casos.

### Front-P89 — Iconos Phosphor para los nuevos troubleshooting items
- instalacion-duplicada: `ph-warning-circle` o `ph-folder-open`.
- providers-no-aparecen: `ph-robot`.
- modeprofile-not-found: `ph-magnifying-glass`.

### Front-P90 — Items de Compatibilidad con iconos
- Linux/Unix: `ph-linux-logo`.
- MeridianUI Installer: `ph-package`.

---

## 8. Technical Debt

### TD-59 — Sección Compatibilidad sin mención de Linux
El landing actual (REASP/index.html línea 467) menciona `OpenCode Go` y `Multi-Provider AI` pero no Linux. **Acción:** añadir items Linux/Unix y MeridianUI Installer.

### TD-60 — Troubleshooting sin casos de instalación moderna
Los casos preexistentes asumen `git clone`. **Acción:** añadir 3 casos con flujo CLI moderno.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-186:** Añadir **3 casos nuevos de Troubleshooting** (instalación duplicada, providers no aparecen, ModeProfile not found) — verificable con `grep -E "(instalacion-duplicada|providers-no-aparecen|modeprofile-not-found|instalación duplicada|proveedores no aparecen|ModeProfile not found)" landing/REASP/docs.html | wc -l` que retorna `≥ 3`.
- **RI-187:** Añadir **2 items de Compatibilidad** (Linux/Unix + MeridianUI Installer) — verificable con `grep -E "Linux/Unix|Linux/macOS|Linux \\+ Volta" landing/REASP/docs.html | wc -l` que retorna `≥ 1` y `grep -c "MeridianUI Global Installer\|MeridianUI Installer" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-188:** Mencionar explícitamente `C:\Program Files\REASP\` en caso de instalación duplicada — verificable con `grep -c "Program Files.REASP" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-189:** Mencionar `robocopy` o `Remove-Item` como solución — verificable con `grep -c "robocopy\|Remove-Item" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-190:** Mencionar `node scripts/sync-reasp.js push` como solución para hash mismatch — verificable con `grep -c "sync-reasp.js" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-191:** Mencionar `Volta` para Linux (N9) — verificable con `grep -c "Volta" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-192:** Mencionar `~/.MeridianUI/` para el global installer (N10) — verificable con `grep -c "~/.MeridianUI/" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-193:** **NO modificar** `landing/REASP/css/styles.css` — verificable con `git diff --stat landing/REASP/css/styles.css` vacío.
- **RI-194:** **NO modificar** `landing/REASP/js/main.js` ni `docs.js` — verificable con `git diff --stat landing/REASP/js/` vacío.
- **RI-195:** Sin regresión en `landing/RACSP/` ni en `landing/index.html` (estilo landing) — verificable con `git diff --stat` selectivo.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/REASP/docs.html`

#### Cambio 1 — Sección Compatibilidad: añadir 2 items (después de "Git Integration")

**Actual (líneas 447-474):**
```html
<div class="compat-grid reveal">
  <div class="compat-item">
    <i class="ph ph-dotnet-logo"></i>
    <span>.NET 9</span>
  </div>
  <div class="compat-item">
    <i class="ph ph-terminal"></i>
    <span>PowerShell</span>
  </div>
  <div class="compat-item">
    <i class="ph ph-code"></i>
    <span>OpenCode Go</span>
  </div>
  <div class="compat-item">
    <i class="ph ph-cpu"></i>
    <span>Multi-Provider AI</span>
  </div>
  <div class="compat-item">
    <i class="ph ph-paint-brush"></i>
    <span>MeridianUI</span>
  </div>
  <div class="compat-item">
    <i class="ph ph-git-branch"></i>
    <span>Git Integration</span>
  </div>
</div>
```

**Nuevo (8 items):**
```html
<div class="compat-grid reveal">
  <!-- (existing 6 items above) -->

  <div class="compat-item">
    <i class="ph ph-linux-logo"></i>
    <span>Linux/Unix + Volta</span>
  </div>

  <div class="compat-item">
    <i class="ph ph-package"></i>
    <span>MeridianUI Global Installer</span>
  </div>
</div>
```

#### Cambio 2 — Sección Troubleshooting: añadir 3 casos nuevos (al inicio, después de la intro)

**Actual (líneas ~1552-1560):**
```html
<section class="section section-alt" id="troubleshooting">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-label">
        <i class="ph ph-wrench"></i>
        Troubleshooting
      </div>
      <h2 class="section-title">Solución de <span class="gradient-text">problemas</span></h2>
      <p class="section-desc">...</p>
    </div>

    <!-- (casos existentes) -->
```

**Nuevo (insertar después de section-header):**
```html
<!-- (existing section-header above) -->

<!-- Caso 1: Instalación duplicada en PATH -->
<div class="card pros-cons-card cons reveal">
  <h3><i class="ph ph-warning-circle"></i> Instalación duplicada en PATH</h3>
  <p>3 instalaciones simultáneas de REASP pueden existir en Windows:</p>
  <ul>
    <li><code>C:\Program Files\REASP\</code> — instalación antigua, prioridad alta en PATH.</li>
    <li><code>%APPDATA%\npm\node_modules\reasp-cli</code> — instalación npm global correcta.</li>
    <li><code>~\KeorSoft\Development\AITools\REASP</code> — repo de desarrollo.</li>
  </ul>
  <p><strong>Síntoma:</strong> <code>reasp --version</code> retorna la versión antigua. Las funciones nuevas no aparecen.</p>
  <p><strong>Solución A — Sincronizar manualmente (admin):</strong></p>
  <div class="code-block">
    <div class="code-header">
      <span class="code-lang">powershell</span>
      <button class="code-copy" data-copy="robocopy ..."><i class="ph ph-copy"></i> Copiar</button>
    </div>
    <pre><code>robocopy "C:\Users\kevin\KeorSoft\Development\AITools\REASP" `
         "C:\Program Files\REASP" `
         /MIR /XD .git node_modules installer\node_modules</code></pre>
  </div>
  <p><strong>Solución B — Eliminar (admin):</strong></p>
  <div class="code-block">
    <div class="code-header">
      <span class="code-lang">powershell</span>
      <button class="code-copy" data-copy="Remove-Item ..."><i class="ph ph-copy"></i> Copiar</button>
    </div>
    <pre><code>Remove-Item -LiteralPath "C:\Program Files\REASP" -Recurse -Force</code></pre>
  </div>
</div>

<!-- Caso 2: Proveedores no aparecen en TUI -->
<div class="card pros-cons-card cons reveal reveal-delay-1">
  <h3><i class="ph ph-robot"></i> Proveedores no aparecen en el selector del TUI</h3>
  <p>Al configurar un ModeProfile, el selector de proveedores muestra una lista vacía o solo "opencode-go".</p>
  <p><strong>Causa:</strong> <code>api.state.provider</code> no se inicializa correctamente. Esto ocurre con versiones de OpenCode anteriores a 1.17.17.</p>
  <p><strong>Solución:</strong></p>
  <ol>
    <li>Verificar versión de OpenCode: <code>opencode --version</code> (debe ser 1.17.17 o superior).</li>
    <li>Si es inferior, actualizar: <code>npm install -g opencode@latest</code>.</li>
    <li>Reinstalar REASP: <code>npm install -g reasp-cli</code>.</li>
  </ol>
</div>

<!-- Caso 3: ModeProfile not found -->
<div class="card pros-cons-card cons reveal reveal-delay-2">
  <h3><i class="ph ph-magnifying-glass"></i> ModeProfile not found</h3>
  <p>Al ejecutar <code>reasp switch my-profile</code>, retorna "ModeProfile not found" aunque el perfil existe en el repo.</p>
  <p><strong>Causa:</strong> Hash mismatch entre el repo (<code>REASP/.opencode/</code>) y el plugin instalado (<code>~/.config/opencode/</code>).</p>
  <p><strong>Solución — Sincronizar manualmente:</strong></p>
  <div class="code-block">
    <div class="code-header">
      <span class="code-lang">bash</span>
      <button class="code-copy" data-copy="node scripts/sync-reasp.js push"><i class="ph ph-copy"></i> Copiar</button>
    </div>
    <pre><code>node scripts/sync-reasp.js push</code></pre>
  </div>
  <p>Esto copia <code>.opencode/</code> → <code>~/.config/opencode/</code> y refresca el runtime desde el ModeProfile activo.</p>
</div>

<!-- (existing troubleshooting cases below) -->
```

### 10.2 Decisión sobre el orden de los nuevos troubleshooting items

**Decisión del planner:** añadir los 3 casos nuevos **al inicio** de la sección Troubleshooting (después del section-header, antes de los casos preexistentes) porque son los más relevantes para usuarios nuevos que acaban de instalar.

### 10.3 Archivos a NO TOCAR

- `landing/REASP/css/styles.css` (29 KB) — INTACTO.
- `landing/REASP/js/main.js` (6.2 KB) — INTACTO.
- `landing/REASP/js/docs.js` (8.6 KB) — INTACTO.
- `landing/REASP/index.html` (modificado por EPIC 10/PART 01) — INTACTO en este PART.
- `landing/RACSP/**` — INTACTO.

---

## 11. Automated Test Plan

### AT-176 — Verificación de 3 casos de troubleshooting
- **Comando:** `grep -E "(instalacion-duplicada|instalación duplicada|providers-no-aparecen|proveedores no aparecen|modeprofile-not-found|ModeProfile not found)" landing/REASP/docs.html | wc -l`.
- **Pass criteria:** `≥ 3`.
- **Fallo:** `< 3`.

### AT-177 — Verificación de `C:\Program Files\REASP\`
- **Comando:** `grep -c "Program Files.REASP" landing/REASP/docs.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-178 — Verificación de `robocopy` o `Remove-Item`
- **Comando:** `grep -E "(robocopy|Remove-Item)" landing/REASP/docs.html | wc -l`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-179 — Verificación de `sync-reasp.js`
- **Comando:** `grep -c "sync-reasp.js" landing/REASP/docs.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-180 — Verificación de items Compatibilidad Linux/Unix + MeridianUI Installer
- **Comando:** `grep -E "Linux/Unix|Linux/macOS|Linux \\+ Volta" landing/REASP/docs.html | wc -l`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "MeridianUI Global Installer\|MeridianUI Installer" landing/REASP/docs.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-181 — Verificación de `Volta`
- **Comando:** `grep -c "Volta" landing/REASP/docs.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-182 — Verificación de `~/.MeridianUI/`
- **Comando:** `grep -c "~/.MeridianUI/" landing/REASP/docs.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-183 — Verificación de no-regresión estilos/scripts
- **Comando:** `git diff --stat landing/REASP/css/styles.css landing/REASP/js/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-184 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Documentation agent (Gate 7):

- [ ] **MV-260:** Abrir `landing/REASP/docs.html` en navegador: la sección Compatibilidad tiene 8 items (6 originales + Linux/Unix + MeridianUI Installer).
- [ ] **MV-261:** La sección Troubleshooting tiene 3 casos nuevos al inicio:
  - Instalación duplicada en PATH (con código `robocopy` y `Remove-Item`).
  - Proveedores no aparecen en TUI (con verificación de versión OpenCode).
  - ModeProfile not found (con comando `sync-reasp.js push`).
- [ ] **MV-262:** Cada caso de troubleshooting tiene icono Phosphor y descripción clara.
- [ ] **MV-263:** Los code blocks de los nuevos troubleshooting items tienen botones de copy-to-clipboard funcionales.
- [ ] **MV-264:** El item Compatibilidad "Linux/Unix + Volta" menciona el icono `ph-linux-logo`.
- [ ] **MV-265:** El item Compatibilidad "MeridianUI Global Installer" menciona `~/.MeridianUI/`.
- [ ] **MV-266:** El estilo visual (Phosphor Icons, dark `#050505`) se mantiene idéntico.
- [ ] **MV-267:** `landing/REASP/css/styles.css` no fue modificado.
- [ ] **MV-268:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` no fueron modificados.
- [ ] **MV-269:** `landing/RACSP/**` no fue modificado.
- [ ] **MV-270:** `landing/REASP/index.html` (modificado por EPIC 10/PART 01) sigue funcionando.

---

## 13. Technical Documentation to produce

### TD-Output-37 — Comentarios en `landing/REASP/docs.html`

```html
<!-- ══ EPIC 10 PART 03 · Docs Update Troubleshooting + Compat ═════════════ -->
<!-- 3 casos nuevos de Troubleshooting (N5): instalación duplicada, -->
<!-- providers no aparecen, ModeProfile not found -->
<!-- 2 items nuevos en Compatibilidad (N9, N10): Linux/Unix, MeridianUI -->
<!-- Estilos (.css, .js) NO modificados -->
```

### TD-Output-38 — Documentación de troubleshooting

> Los 3 troubleshooting items nuevos reflejan los issues reales identificados durante la sesión 4 de 2026-07-09 cuando se actualizó el tarball y se descubrió el problema de PATH en Windows. Son los más comunes para usuarios nuevos que instalan REASP por primera vez o actualizan desde versiones antiguas.

---

## 14. User Documentation to produce

### UD-Output-28 — Mensaje de commit sugerido

```
docs(REASP): añadir troubleshooting moderno y compat Linux

- 3 casos nuevos en Troubleshooting: instalación duplicada
  en PATH (con robocopy/Remove-Item), providers no aparecen
  en TUI (verificar OpenCode 1.17.17+), ModeProfile not found
  (solución: sync-reasp.js push).
- 2 items nuevos en Compatibilidad: Linux/Unix + Volta (N9),
  MeridianUI Global Installer (N10).
- Estilos (.css, .js) intactos.

Refs: REASP/AI/Summarys/summary-2026-07-09.html
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-200:** La sección Troubleshooting tiene 3 casos nuevos al inicio.
- **AC-201:** El caso "Instalación duplicada en PATH" menciona `C:\Program Files\REASP\`, `%APPDATA%\npm\node_modules\reasp-cli`, y soluciones `robocopy` o `Remove-Item`.
- **AC-202:** El caso "Proveedores no aparecen en TUI" menciona OpenCode 1.17.17+ como requisito.
- **AC-203:** El caso "ModeProfile not found" menciona `node scripts/sync-reasp.js push` como solución.
- **AC-204:** La sección Compatibilidad tiene 8 items (6 originales + 2 nuevos).
- **AC-205:** El item "Linux/Unix + Volta" menciona `Volta`.
- **AC-206:** El item "MeridianUI Global Installer" menciona `~/.MeridianUI/`.
- **AC-207:** `landing/REASP/css/styles.css` NO fue modificado.
- **AC-208:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` NO fueron modificados.
- **AC-209:** `landing/RACSP/**` NO fue modificado.
- **AC-210:** El estilo visual (Phosphor Icons, dark `#050505`) se mantiene idéntico.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** 3 troubleshooting items coherentes con issues reales reportados (N5). 2 compat items coherentes con el alcance real (N9, N10). Reutilización de clases existentes (`.card`, `.code-block`, `.compat-item`).
- [ ] **Gate 2 — Scope & Completeness Audit:** 3 troubleshooting items con código robocopy/Remove-Item/sync-reasp.js. 2 compat items (Linux/Unix, MeridianUI Installer).
- [ ] **Gate 3 — UX/Design Review:** UX-P77 a UX-P79 resueltos según §5. Nuevos troubleshooting items con iconos Phosphor y descripción clara.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. Render visual coherente.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Documentación de troubleshooting (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 11 Acceptance Criteria §15 verificadas. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________