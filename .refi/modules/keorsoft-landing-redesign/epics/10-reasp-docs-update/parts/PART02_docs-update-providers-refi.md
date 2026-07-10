# PART 02 — Docs Update Providers + REFI v2 (REASP Docs Update)

> **EPIC:** 10-reasp-docs-update
> **Slug:** `docs-update-providers-refi`
> **Prioridad:** P0 (paralelo a EPIC 01-09)
> **Depende de:** EPIC 10 PART 01 (Index Update)
> **Complejidad:** A
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer (Documentation agent)

---

## 1. Purpose

Actualizar `landing/REASP/docs.html` (~2000 líneas) para añadir las secciones de **Soporte Multi-Proveedor** (N1) y **REFI v2 · Epic + PART** (N4). Esto incluye actualizar la sidebar de navegación con las nuevas anclas y añadir contenido detallado a las secciones correspondientes.

**Regla dura:** NO se modifica `landing/REASP/css/styles.css` ni `landing/REASP/js/*`.

---

## 2. Current State

### 2.1 `landing/REASP/docs.html` actual (~2000 líneas)

Secciones principales (referenciadas por número de línea):

| Líneas | Sección | Contenido actual |
|--------|---------|------------------|
| 56 | Sidebar header | "Documentacion REASP" + "v3.0.0 - Referencia completa" |
| 58-145 | Sidebar nav | 5 secciones: Getting Started, Instalacion, Conceptos Clave, Referencia de Comandos, Agentes Ryou |
| 161-175 | Hero | "Guia completa de REASP" |
| 172-195 | Qué es REASP? + Version Actual | Definición + "Version Actual: v3.0.0" |
| 197-225 | Filosofía | 3 principios |
| 227-345 | Arquitectura General | Diagrama + componentes |
| 346-369 | Requisitos | Node.js, etc. |
| 371-433 | Instalación Global | **OBSOLETO:** `git clone` + TUI installer |
| 415-433 | Instalación Local | Variante local |
| 434-455 | Desinstalación | Pasos |
| 456-515 | ModeProfiles | Tabla |
| 516-549 | Fases SDD | Flujo por ModeProfile |
| 550-598 | Modelos de IA | Model routing |
| 599-621 | Niveles de Esfuerzo | |
| 622-671 | Estrategias de Modelo | Single vs Per-Phase |
| 672-734 | Slash Commands | Lista de comandos |
| 735-818 | AI Tools | Tools programáticos |
| 819-852 | PowerShell Commands | |
| 853-1217 | Agentes Ryou | 8 agentes detallados |
| 1218-1307 | Crear ModeProfile Custom | |
| 1308-1345 | Editar Agentes | |
| 1346-1505 | Casos de Uso + Reglas Globales | |
| 1506-1551 | FAQ | |
| 1552-2000+ | Troubleshooting | |

### 2.2 Sidebar nav actual (líneas 58-145)

**Getting Started:**
- Que es REASP?
- Filosofía
- Ryou EFI Planner
- Arquitectura General

**Instalación:**
- Requisitos
- Instalación Global
- Instalación Local
- Desinstalación

**Conceptos Clave:**
- ModeProfiles
- Fases SDD
- Modelos de IA
- Niveles de Esfuerzo
- Estrategias de Modelo

**Referencia de Comandos:**
- Slash Commands
- AI Tools
- PowerShell Commands

**Agentes Ryou:**
- (8 agentes)
- Crear ModeProfile Custom
- Editar Agentes
- Reglas Globales

**Casos de Uso:**
- CRUD Simple
- Arquitectura Compleja
- UI Development
- Debugging

**FAQ:**
- (FAQs)

**Troubleshooting:**
- (Casos)

### 2.3 Cambios necesarios (N1 + N4)

**Para N1 (Soporte Multi-Proveedor):**
- Nueva sección `#proveedores` después de "Modelos de IA" (línea 598).
- Sidebar: añadir "Proveedores" en "Conceptos Clave".
- Contenido: tabla de 4 providers, ejemplo de `sdd_mode_profile` con argumento `provider`, ejemplo de custom model, nota de compatibilidad.

**Para N4 (REFI v2 · Epic + PART):**
- Nueva sección `#refi-v2` después de "AI Tools" (línea 735).
- Sidebar: añadir "REFI v2" en "Referencia de Comandos" o nueva sección "Metodología".
- Contenido: introducción, diagrama ASCII del workflow de 3 pasadas, tabla de las 8 puertas mecánicas, ejemplo de un PART.

---

## 3. Comparison against baseline

### 3.1 Nuevas secciones vs existentes

| Nueva sección | Ubicación | Longitud estimada | Clases CSS reutilizadas |
|---------------|-----------|-------------------|--------------------------|
| `#proveedores` | Después de "Modelos de IA" | ~80 líneas | `.section` (existente), `.card`, `.code-block` |
| `#refi-v2` | Después de "AI Tools" | ~120 líneas | `.section`, `.card`, `.code-block`, `.flow` |

### 3.2 Decisión sobre ubicación en sidebar

- **#proveedores:** en "Conceptos Clave" (después de "Estrategias de Modelo") porque es un concepto del sistema.
- **#refi-v2:** nueva sub-sección "Metodología" en el sidebar (separada de Comandos) porque es una categoría distinta.

### 3.3 Decisión sobre formato del contenido

- **#proveedores:** tabla de 4 providers + 2 code blocks (ejemplo válido + custom model).
- **#refi-v2:** diagrama ASCII del workflow + tabla de 8 puertas + ejemplo de un PART (estructura del archivo).

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Añadir `<li><a href="#proveedores">` en el sidebar "Conceptos Clave".
- Añadir nueva sección "Metodología" en sidebar con `<li><a href="#refi-v2">`.
- Crear `<section id="proveedores">` con tabla de 4 providers + code blocks.
- Crear `<section id="refi-v2">` con diagrama ASCII + tabla + code block.
- **NO modificar** secciones existentes.

### 4.2 Lo que NO está en el scope

- **NO** se modifica `landing/REASP/css/styles.css`.
- **NO** se modifica `landing/REASP/js/main.js` ni `docs.js`.
- **NO** se modifica ninguna sección existente del docs.html.

---

## 5. UX Problems

### UX-P74 — Sidebar crece con 2 secciones nuevas
El sidebar ya tiene 7 categorías. Añadir 1 más ("Metodología") lo hace más denso. **Decisión:** aceptar (es contenido importante).

### UX-P75 — Tabla de providers vs tabla de ModeProfiles
Ambas tablas son similares. **Decisión:** usar mismo estilo `.mode-table` para consistencia.

### UX-P76 — Diagrama ASCII de REFI v2 vs diagrama de Arquitectura
Ambos usan `<pre>` con código. **Decisión:** mismo estilo `.arch-diagram` para consistencia.

---

## 6. Backend / Logic Problems

N/A — documentation HTML.

---

## 7. Frontend / Presentation Problems

### Front-P85 — Reutilización de `.mode-table` para tabla de providers
Clase existente `.mode-table` (líneas 471 del actual). Mantener para consistencia visual.

### Front-P86 — Reutilización de `.arch-diagram` para diagrama ASCII
Clase existente `.arch-diagram` (líneas 310 del actual). Mantener.

### Front-P87 — Code blocks con `data-copy` y copy-to-clipboard
Patrón existente (líneas 487-498). Mantener para los nuevos code blocks.

---

## 8. Technical Debt

### TD-57 — Sidebar sin sección "Metodología"
El REFI v2 es una metodología nueva que merece su propia categoría. **Acción:** añadir nueva categoría en sidebar.

### TD-58 — Sección "Modelos de IA" sin mención de multi-provider
La sección actual (líneas 550-598) menciona routing pero no selección explícita de provider. **Acción:** nueva sección `#proveedores` dedicada.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-177:** Añadir `<li><a href="#proveedores">` en el sidebar "Conceptos Clave" — verificable con `grep -c 'href="#proveedores"' landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-178:** Añadir nueva sub-sección "Metodología" en sidebar con `<li><a href="#refi-v2">` — verificable con `grep -c 'href="#refi-v2"' landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-179:** Crear `<section id="proveedores">` con tabla de 4 providers (opencode-go, anthropic, openai, google) + 2 code blocks (uso válido + custom model) — verificable con `grep -c 'id="proveedores"' landing/REASP/docs.html` que retorna `1` y `grep -c "opencode-go\|anthropic\|openai\|google" landing/REASP/docs.html` que retorna `≥ 4`.
- **RI-180:** Crear `<section id="refi-v2">` con diagrama ASCII del workflow de 3 pasadas + tabla de las 8 puertas + ejemplo de un PART — verificable con `grep -c 'id="refi-v2"' landing/REASP/docs.html` que retorna `1` y `grep -c "Gate 1\|Gate 2\|Gate 8\|Epic + PART" landing/REASP/docs.html` que retorna `≥ 4`.
- **RI-181:** Mencionar explícitamente "Custom model" en la sección proveedores — verificable con `grep -c "Custom model\|custom model" landing/REASP/docs.html` que retorna `≥ 1`.
- **RI-182:** Mencionar el `// TODO` o comentario de compatibilidad REFI v2 con paquetes legacy — verificable con `grep -c "backward-compat\|legacy" landing/REASP/docs.html` que retorna `≥ 2`.
- **RI-183:** **NO modificar** `landing/REASP/css/styles.css` — verificable con `git diff --stat landing/REASP/css/styles.css` que retorna vacío.
- **RI-184:** **NO modificar** `landing/REASP/js/main.js` ni `docs.js` — verificable con `git diff --stat landing/REASP/js/` que retorna vacío.
- **RI-185:** Sin regresión en `landing/REASP/index.html` (modificado por EPIC 10/PART 01 pero no por este PART) ni en `landing/RACSP/` — verificable con `git diff` selectivo.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/REASP/docs.html`

#### Cambio 1 — Sidebar: añadir "Proveedores" en "Conceptos Clave" (después de "Estrategias de Modelo")

**Actual (líneas ~95-100):**
```html
<li class="docs-nav-section">
  <div class="docs-nav-title"><i class="ph ph-lightbulb"></i> Conceptos Clave</div>
  <ul class="docs-nav-items">
    <li><a href="#modeprofiles">ModeProfiles</a></li>
    <li><a href="#fases-sdd">Fases SDD</a></li>
    <li><a href="#modelos-ia">Modelos de IA</a></li>
    <li><a href="#niveles-esfuerzo">Niveles de Esfuerzo</a></li>
    <li><a href="#estrategias-modelo">Estrategias de Modelo</a></li>
  </ul>
</li>
```

**Nuevo:**
```html
<li class="docs-nav-section">
  <div class="docs-nav-title"><i class="ph ph-lightbulb"></i> Conceptos Clave</div>
  <ul class="docs-nav-items">
    <li><a href="#modeprofiles">ModeProfiles</a></li>
    <li><a href="#fases-sdd">Fases SDD</a></li>
    <li><a href="#modelos-ia">Modelos de IA</a></li>
    <li><a href="#niveles-esfuerzo">Niveles de Esfuerzo</a></li>
    <li><a href="#estrategias-modelo">Estrategias de Modelo</a></li>
    <li><a href="#proveedores">Proveedores</a></li>
  </ul>
</li>
```

#### Cambio 2 — Sidebar: añadir nueva sección "Metodología" antes de "Casos de Uso"

**Actual:**
```html
<!-- (después de Agentes Ryou y antes de Casos de Uso) -->
```

**Nuevo:**
```html
<li class="docs-nav-section">
  <div class="docs-nav-title"><i class="ph ph-tree-structure"></i> Metodología</div>
  <ul class="docs-nav-items">
    <li><a href="#refi-v2">REFI v2 · Epic + PART</a></li>
  </ul>
</li>
```

#### Cambio 3 — Nueva sección `#proveedores` después de "Modelos de IA" (después de línea 598)

```html
<!-- Nueva sección: Soporte Multi-Proveedor -->
<section class="section section-alt" id="proveedores">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-label">
        <i class="ph ph-stack"></i>
        Multi-Proveedor
      </div>
      <h2 class="section-title">Selección explícita de <span class="gradient-text">proveedor</span></h2>
      <p class="section-desc">
        El tool <code>sdd_mode_profile</code> acepta el argumento opcional <code>provider</code> para validar que el modelo pertenezca a un proveedor específico. 4 providers preconfigurados + opción de custom models.
      </p>
    </div>

    <div class="reveal">
      <table class="mode-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Modelos Preconfigurados</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span class="mode-name">opencode-go</span></td>
            <td class="phases">GLM-5.1, Kimi K2.7 Code, DeepSeek V4 Pro, ...</td>
            <td>✓ (preseleccionado)</td>
          </tr>
          <tr>
            <td><span class="mode-name">anthropic</span></td>
            <td class="phases">claude-sonnet-4-5, claude-opus-4, claude-haiku-4-5</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="mode-name">openai</span></td>
            <td class="phases">gpt-5, gpt-5-mini, o3-pro</td>
            <td></td>
          </tr>
          <tr>
            <td><span class="mode-name">google</span></td>
            <td class="phases">gemini-2.5-pro, gemini-2.5-flash</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section-header reveal" style="margin-top: 4rem;">
      <h3 class="section-title" style="font-size: 1.75rem;">Uso del argumento <code>provider</code></h3>
    </div>

    <div class="install-steps reveal">
      <div class="install-step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Forzar provider específico</h3>
          <p>Valida que el primary model pertenezca al provider. Error si no coincide.</p>
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang">bash</span>
              <button class="code-copy" data-copy="sdd_mode_profile(action=&quot;create&quot;, name=&quot;fast-test&quot;, primary=&quot;opencode-go/glm-5.1&quot;, provider=&quot;opencode-go&quot;)"><i class="ph ph-copy"></i> Copiar</button>
            </div>
            <pre><code>sdd_mode_profile(action="create", name="fast-test",
  primary="opencode-go/glm-5.1",
  provider="opencode-go")
# OK, no warning</code></pre>
          </div>
        </div>
      </div>

      <div class="install-step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Custom model</h3>
          <p>Para providers beta o modelos nuevos no listados. Aceptado con warning, no error.</p>
          <div class="code-block">
            <div class="code-header">
              <span class="code-lang">bash</span>
              <button class="code-copy" data-copy="sdd_mode_profile(action=&quot;create&quot;, name=&quot;experimental&quot;, primary=&quot;opencode-go/experimental-v1&quot;, provider=&quot;opencode-go&quot;)"><i class="ph ph-copy"></i> Copiar</button>
            </div>
            <pre><code>sdd_mode_profile(action="create", name="experimental",
  primary="opencode-go/experimental-v1",
  provider="opencode-go")
# OK, warning: "Model 'experimental-v1' not in catalog"</code></pre>
          </div>
        </div>
      </div>

      <div class="install-step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Compatibilidad</h3>
          <p>El argumento <code>provider</code> es opcional. ModeProfiles existentes sin provider siguen funcionando idéntico (backward-compatible).</p>
        </div>
      </div>
    </div>

    <div class="grid-3 reveal" style="margin-top: 4rem;">
      <div class="card usecase-card">
        <h3>86 Tests Pasan</h3>
        <p>65 tests unitarios + 21 tests E2E validan provider selection, validación, custom models y cross-provider mix.</p>
      </div>
    </div>
  </div>
</section>
```

#### Cambio 4 — Nueva sección `#refi-v2` después de "AI Tools" (después de línea 818)

```html
<!-- Nueva sección: REFI v2 · Epic + PART -->
<section class="section" id="refi-v2">
  <div class="container">
    <div class="section-header reveal">
      <div class="section-label">
        <i class="ph ph-tree-structure"></i>
        Metodología
      </div>
      <h2 class="section-title">REFI v2 · <span class="gradient-text-purple">Epic + PART</span></h2>
      <p class="section-desc">
        Metodología de planificación empresarial con Epic (subsistema) y PART (15 secciones + 8 quality gates mecánicos). Workflow de 3 pasadas con 2 STOP gates que esperan confirmación del usuario antes de código.
      </p>
    </div>

    <div class="reveal">
      <div class="arch-diagram">
        <pre><code><span class="comment"># REFI v2 — Workflow de 3 Pasadas</span>

<span class="dir">Pass 1: Epic Breakdown</span>
  ├─ request.md
  ├─ master-blueprint.md
  ├─ epics/matrix.md
  └─ epics/<span class="highlight">&lt;epic&gt;</span>/README.md
       ⤷ STOP · WAIT FOR USER ⤷  ← <span class="dir">Gate A</span>

<span class="dir">Pass 2: PART Detail (per EPIC)</span>
  └─ epics/<span class="highlight">&lt;epic&gt;</span>/parts/PARTnn.md (15 sec + 8 gates)
       ⤷ STOP · entre EPICs ⤷   ← <span class="dir">Gate B</span>

<span class="dir">Pass 3: Orchestration & Hand-off</span>
  ├─ orchestration-map.md
  ├─ progress.md
  └─ verification.md
       ⤷ HANDOFF TO ORCHESTRATOR ⤷</code></pre>
      </div>
    </div>

    <div class="section-header reveal" style="margin-top: 4rem;">
      <h3 class="section-title" style="font-size: 1.75rem;">Las 8 Quality Gates mecánicas</h3>
    </div>

    <div class="reveal">
      <table class="mode-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Quality Gate</th>
            <th>Función</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>1</td><td><span class="mode-name">Architecture Review</span></td><td>Diseño vs invariantes / ADRs del proyecto.</td></tr>
          <tr><td>2</td><td><span class="mode-name">Scope &amp; Completeness Audit</span></td><td>Tabla declared vs actual, gaps clasificados.</td></tr>
          <tr><td>3</td><td><span class="mode-name">UX/Design Review</span></td><td>MeridianUI si UI; contratos si no UI.</td></tr>
          <tr><td>4</td><td><span class="mode-name">Manual / Runtime Validation</span></td><td>Checklist ejecutado con tickboxes.</td></tr>
          <tr><td>5</td><td><span class="mode-name">Defect Closure</span></td><td>Defectos de gates 1-4 cerrados en el mismo PART.</td></tr>
          <tr><td>6</td><td><span class="mode-name">Technical Documentation</span></td><td>Docs técnicos producidos.</td></tr>
          <tr><td>7</td><td><span class="mode-name">User Documentation</span></td><td>Docs de usuario producidos.</td></tr>
          <tr><td>8</td><td><span class="mode-name">Final Review &amp; Sign-off</span></td><td>Build 0/0 + suite verde + Acceptance Criteria re-leído + firma.</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section-header reveal" style="margin-top: 4rem;">
      <h3 class="section-title" style="font-size: 1.75rem;">Estructura de un PART</h3>
    </div>

    <div class="reveal">
      <div class="install-steps">
        <div class="install-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>15 secciones obligatorias</h3>
            <p>Cada PART tiene 15 secciones numeradas (Purpose, Current State, Comparison against baseline, Missing/Required Scope, UX Problems, Backend/Logic Problems, Frontend/Presentation Problems, Technical Debt, Required Improvements, Implementation Plan, Automated Test Plan, Manual Validation Checklist, Technical Documentation, User Documentation, Acceptance Criteria).</p>
          </div>
        </div>

        <div class="install-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>Footer con 8 quality gates</h3>
            <p>Cada PART termina con un footer de 8 casillas verificables (una por quality gate) que se firman en orden estricto antes de cerrar el PART.</p>
          </div>
        </div>

        <div class="install-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Anti-hallucination block</h3>
            <p>Las secciones §3 (Comparison), §9 (Required Improvements), §10 (Implementation Plan), y §15 (Acceptance Criteria) tienen reglas anti-alucinación que prohíben inventar archivos, endpoints, columnas, o criterios subjetivos.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid-3 reveal" style="margin-top: 4rem;">
      <div class="card usecase-card">
        <div class="usecase-icon" style="color: var(--accent-emerald);"><i class="ph ph-check-circle"></i></div>
        <h3>Backward-Compatible</h3>
        <p>Los 4 paquetes legacy (<code>reasp-backup-manager</code>, <code>linux-compat</code>, <code>multi-agent-compatibility</code>, <code>sdd-profile-provider-support</code>) siguen funcionando con REFI v2. Helper de migración opcional.</p>
      </div>
    </div>
  </div>
</section>
```

### 10.2 Archivos a NO TOCAR

- `landing/REASP/css/styles.css` (29 KB) — INTACTO.
- `landing/REASP/js/main.js` (6.2 KB) — INTACTO.
- `landing/REASP/js/docs.js` (8.6 KB) — INTACTO.
- `landing/REASP/index.html` (modificado por EPIC 10/PART 01, NO por este PART).
- `landing/RACSP/**` — INTACTO.
- `landing/index.html` (estilo landing) — INTACTO.

---

## 11. Automated Test Plan

### AT-169 — Verificación de sección `#proveedores`
- **Comando:** `grep -c 'id="proveedores"' landing/REASP/docs.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-170 — Verificación de providers en tabla
- **Comando:** `grep -E "(opencode-go|anthropic|openai|google).*<span" landing/REASP/docs.html | wc -l`.
- **Pass criteria:** `≥ 4`.
- **Fallo:** `< 4`.

### AT-171 — Verificación de sección `#refi-v2`
- **Comando:** `grep -c 'id="refi-v2"' landing/REASP/docs.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-172 — Verificación de 8 quality gates
- **Comando:** `grep -E "Architecture Review|Scope &amp; Completeness|UX/Design Review|Manual / Runtime|Defect Closure|Technical Documentation|User Documentation|Final Review" landing/REASP/docs.html | wc -l`.
- **Pass criteria:** `≥ 8`.
- **Fallo:** `< 8`.

### AT-173 — Verificación de sidebar links
- **Comando:** `grep -c 'href="#proveedores"\|href="#refi-v2"' landing/REASP/docs.html`.
- **Pass criteria:** `≥ 2` (uno por cada nueva sección).
- **Fallo:** `< 2`.

### AT-174 — Verificación de no-regresión estilos/scripts
- **Comando:** `git diff --stat landing/REASP/css/styles.css landing/REASP/js/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-175 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Documentation agent (Gate 7):

- [ ] **MV-245:** Abrir `landing/REASP/docs.html` en navegador: la sidebar tiene nueva sección "Conceptos Clave" con "Proveedores" añadido.
- [ ] **MV-246:** La sidebar tiene nueva sección "Metodología" con "REFI v2 · Epic + PART".
- [ ] **MV-247:** Click en "Proveedores" en sidebar hace scroll a la sección `#proveedores`.
- [ ] **MV-248:** Click en "REFI v2" en sidebar hace scroll a la sección `#refi-v2`.
- [ ] **MV-249:** La sección `#proveedores` tiene tabla con 4 providers: opencode-go, anthropic, openai, google.
- [ ] **MV-250:** La sección `#proveedores` tiene 3 ejemplos (forzar provider, custom model, compatibilidad).
- [ ] **MV-251:** La sección `#refi-v2` tiene diagrama ASCII del workflow de 3 pasadas con Gate A y Gate B marcados.
- [ ] **MV-252:** La sección `#refi-v2` tiene tabla con las 8 quality gates.
- [ ] **MV-253:** La sección `#refi-v2` tiene 3 ejemplos (15 secciones, footer con 8 gates, anti-hallucination).
- [ ] **MV-254:** La sección `#refi-v2` menciona backward-compat con paquetes legacy.
- [ ] **MV-255:** El estilo visual (Phosphor Icons, dark `#050505`, sidebar con `.docs-sidebar`) se mantiene idéntico.
- [ ] **MV-256:** `landing/REASP/css/styles.css` no fue modificado (diff binario idéntico).
- [ ] **MV-257:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` no fueron modificados.
- [ ] **MV-258:** `landing/RACSP/**` no fue modificado.
- [ ] **MV-259:** `landing/REASP/index.html` (modificado por EPIC 10/PART 01) sigue funcionando.

---

## 13. Technical Documentation to produce

### TD-Output-35 — Comentarios en `landing/REASP/docs.html`

```html
<!-- ══ EPIC 10 PART 02 · Docs Update Providers + REFI v2 ═══════════════════ -->
<!-- Nueva sección #proveedores (N1): tabla 4 providers + 3 ejemplos -->
<!-- Nueva sección #refi-v2 (N4): diagrama ASCII + tabla 8 gates + 3 ejemplos -->
<!-- Sidebar: añadir "Proveedores" en Conceptos Clave, "REFI v2" en nueva sección Metodología -->
<!-- Estilos (.css, .js) NO modificados -->
```

### TD-Output-36 — Documentación de las nuevas secciones

> **#proveedores:** documentación del soporte multi-proveedor (sesión 3 de 2026-07-08). Tabla de 4 providers + flujo TUI de 2 pasos + argumento `provider` del tool con validación.
>
> **#refi-v2:** documentación del upgrade de la metodología REFI a Epic + PART (sesión 5 de 2026-07-09). Workflow de 3 pasadas con 2 STOP gates + 8 quality gates mecánicos + 15 secciones obligatorias por PART.

---

## 14. User Documentation to produce

### UD-Output-27 — Mensaje de commit sugerido

```
docs(REASP): añadir secciones Proveedores y REFI v2 en docs.html

- Nueva sección #proveedores: tabla de 4 providers, 3 ejemplos
  (forzar provider, custom model, compatibilidad).
- Nueva sección #refi-v2: diagrama ASCII del workflow de 3
  pasadas, tabla de 8 quality gates, 3 ejemplos.
- Sidebar actualizada: "Proveedores" en Conceptos Clave,
  nueva sección "Metodología" con "REFI v2".
- Estilos (.css, .js) intactos.

Refs: REASP/AI/Summarys/summary-2026-07-08.html, summary-2026-07-09.html
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-190:** La sección `<section id="proveedores">` existe con tabla de 4 providers.
- **AC-191:** La sección `<section id="refi-v2">` existe con diagrama ASCII + tabla de 8 gates.
- **AC-192:** La sidebar tiene `<li><a href="#proveedores">` en "Conceptos Clave".
- **AC-193:** La sidebar tiene nueva sección "Metodología" con `<li><a href="#refi-v2">`.
- **AC-194:** La sección `#proveedores` menciona explícitamente "Custom model".
- **AC-195:** La sección `#refi-v2` menciona backward-compat con paquetes legacy.
- **AC-196:** `landing/REASP/css/styles.css` NO fue modificado.
- **AC-197:** `landing/REASP/js/main.js` y `landing/REASP/js/docs.js` NO fueron modificados.
- **AC-198:** `landing/RACSP/**` NO fue modificado.
- **AC-199:** El estilo visual (Phosphor Icons, dark `#050505`) se mantiene idéntico.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** 2 nuevas secciones coherentes con REASP features (Multi-Provider) y metodología (REFI v2). Sidebar actualizada con anclas correctas.
- [ ] **Gate 2 — Scope & Completeness Audit:** Sección `#proveedores` con tabla + 3 ejemplos. Sección `#refi-v2` con diagrama + tabla + 3 ejemplos. Sidebar con 2 nuevas entradas.
- [ ] **Gate 3 — UX/Design Review:** UX-P74 a UX-P76 resueltos según §5. Reutilización de clases existentes (`.mode-table`, `.arch-diagram`).
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. Render visual coherente.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Documentación de nuevas secciones (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 10 Acceptance Criteria §15 verificadas. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________