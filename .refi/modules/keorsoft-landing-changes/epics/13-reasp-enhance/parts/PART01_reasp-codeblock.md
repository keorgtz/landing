# PART 01 — REASP Codeblock (REASP Card Enhanced)

> **EPIC:** 13-reasp-enhance
> **Slug:** `reasp-codeblock`
> **Prioridad:** P1
> **Depende de:** EPIC 14 (preferentemente, para tener el SaaS card limpio)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Añadir un **code-block decorativo** al card de REASP en la sección `#productos` del landing, replicando el patrón visual del card de RACSP pero con accent púrpura (en vez de naranja). El code-block incluye: mac-buttons (rojo/amarillo/verde), título "reasp / stack", y código TypeScript/JSON con syntax highlighting usando las 11 clases `.cb-*` que ya existen en `Styles.css` (creadas en EPIC 05/PART 02).

**Regla dura:** NO modificar `landing/css/Styles.css` (todas las clases necesarias ya existen). NO tocar otros productos (MeridianUI, Controls, SaaS, RACSP). NO tocar `landing/REASP/**` ni `landing/RACSP/**`.

---

## 2. Current State

### 2.1 REASP card actual (líneas 833-878 de `landing/index.html`)

**Estructura actual (single column, simple):**
```html
<div class="product-card scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
  <div class="product-card-header">
    <div class="sc-icon">...</div>
    <div>
      <div class="product-card-title-row">
        <h3 class="product-card-title">REASP</h3>
        <span class="badge badge-oss">Open Source</span>
      </div>
      <p class="product-card-subtitle">Ryou Enterprise Adaptive SDD Protocol</p>
    </div>
  </div>
  <p class="product-card-desc">El primer Sistema Operativo de Desarrollo IA Adaptativo...</p>
  <div class="product-features">
    <!-- 3 features en columna -->
  </div>
  <a href="REASP/index.html" class="btn-cta-purple">Explorar REASP</a>
</div>
```

**Limitaciones:**
- Single column (no `product-card-wide`).
- Sin code-block / terminal preview.
- Solo 3 features (RACSP tiene 4 en grid 2×2).
- 1 solo CTA (RACSP tiene 1 también, pero el visual es más rico).

### 2.2 RACSP card (líneas 879-927) — REFERENCIA

**Estructura completa (full-width, decorado):**
```html
<div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; animation-delay:.4s">
  <div class="product-card-wide-inner">
    <div class="product-card-wide-content">
      <!-- header, desc, features-grid 2x2, btn-cta-orange -->
    </div>
    <div class="racsp-codeblock">
      <div class="racsp-codeblock-overlay"></div>
      <div class="card-header">
        <div class="mac-buttons">
          <span class="mac-btn close"></span>
          <span class="mac-btn min"></span>
          <span class="mac-btn max"></span>
        </div>
        <span class="racsp-codeblock-title">racsp / protocol</span>
        <div style="width: 40px;"></div>
      </div>
      <pre class="racsp-codeblock-code">
        <code>
          <span class="cb-comment"># RACSP v2.0.0 — Multi-Agent Protocol</span>
          <span class="cb-key">agents:</span>
          - <span class="cb-agent-claude">claude</span> <span class="cb-comment">(architect)</span>
          ...
        </code>
      </pre>
    </div>
  </div>
</div>
```

### 2.3 Clases CSS existentes (de EPIC 05) que se reutilizarán

Todas estas clases ya están en `landing/css/Styles.css` y se usan sin cambios:

**Layout:**
- `.product-card-wide` — full-width layout.
- `.product-card-wide-inner` — flex container (2 cols).
- `.product-card-wide-content` — flex item 66.666%.
- `.product-card-header` — flex row con icono + título.
- `.product-card-title-row` — flex row con título + badge.
- `.product-card-title` — h3 styling.
- `.product-card-subtitle` — p styling.
- `.product-card-desc` — p styling.
- `.product-features-grid` — grid 2×2.
- `.btn-cta-purple` — botón gradient púrpura.
- `.sc-icon` — caja 56×56.

**Code-block:**
- `.racsp-codeblock` — container con `flex: 0 0 33.333%` (33% width).
- `.racsp-codeblock-overlay` — div absoluto con gradient blur.
- `.card-header` — flex row con mac-buttons + title.
- `.mac-buttons` — flex row con 3 spans.
- `.mac-btn`, `.mac-btn.close`, `.mac-btn.min`, `.mac-btn.max` — colores rojo/amarillo/verde.
- `.racsp-codeblock-title` — span mono.
- `.racsp-codeblock-code` — pre con `white-space: pre-wrap`.

**Syntax highlighting (11 clases):**
- `.cb-comment` — color `#64748b` (gris).
- `.cb-key` — color `#fb923c` (naranja).
- `.cb-bool` — color `#fcd34d` (amarillo).
- `.cb-status` — color `#34d399` (verde).
- `.cb-agent-claude` — color `#60a5fa` (azul).
- `.cb-agent-opencode` — color `#4ade80` (verde claro).
- `.cb-agent-gemini` — color `#c084fc` (púrpura).

**Nota:** las clases `.cb-*` tienen colores fijos (no usan variables). Esto es aceptable porque los colores son específicos del protocolo RACSP (azul=claude, verde=opencode, púrpura=gemini). Para REASP podríamos querer reutilizar los mismos colores o añadir otros. **Decisión del planner:** reutilizar los mismos colores (consistencia con RACSP).

### 2.4 Features actuales del REASP card

```html
<svg width="16" height="16" viewBox="0 0 24 24" ...><polyline points="20 6 9 17 4 12"/></svg>
<span>Plugin Visual: Dashboard nativo in-session</span>

<svg width="16" height="16" viewBox="0 0 24 24" ...><polyline points="20 6 9 17 4 12"/></svg>
<span>Instalación Global: un script instala CLI y Extensión</span>

<svg width="16" height="16" viewBox="0 0 24 24" ...><polyline points="20 6 9 17 4 12"/></svg>
<span>Arquitectura determinista y adaptativa</span>
```

**3 features en columna** (`display: flex; flex-direction: column;` con `.product-features`).

### 2.5 Comparación REASP vs RACSP card

| Aspecto | REASP (actual) | RACSP (referencia) | Objetivo REASP |
|---------|----------------|--------------------|-----------------|
| Layout | Single column | Full-width (`product-card-wide`) | Full-width |
| Features count | 3 | 4 | **4** |
| Features layout | Columna (`.product-features`) | Grid 2×2 (`.product-features-grid`) | **Grid 2×2** |
| Code-block | No | Sí (`.racsp-codeblock`) | **Sí (`.racsp-codeblock`)** |
| Code title | N/A | "racsp / protocol" | **"reasp / stack"** |
| Accent color | Purple (var) | Orange (var) | **Purple (mantiene REASP)** |
| CTA button | 1 (`.btn-cta-purple`) | 1 (`.btn-cta-orange`) | **1 (`.btn-cta-purple`)** |

---

## 3. Comparison against baseline

### 3.1 Cambios específicos en el HTML

**Cambio 1 — `product-card` → `product-card product-card-wide`:**
```diff
- <div class="product-card scroll-reveal" style="...">
+ <div class="product-card product-card-wide scroll-reveal" style="...">
```

**Cambio 2 — Añadir `.product-card-wide-inner` con 2-cols flex:**

El contenido del card va en `.product-card-wide-content` (66%) y el code-block en `.racsp-codeblock` (33%).

**Cambio 3 — `.product-features` → `.product-features-grid`:**
```diff
- <div class="product-features">
+ <div class="product-features-grid">
```

(Esto hace que las features se muestren en grid 2×2 en lugar de columna.)

**Cambio 4 — Añadir 4ª feature:**

Actualmente hay 3 features. Hay que añadir una 4ª para igualar a RACSP.

**Opciones para la 4ª feature:**
- A. "8 Agentes Especializados" (en el contexto de REASP).
- B. "REFI v2 Compatible" (metodología de planificación).
- C. "Compatible con OpenCode 1.17.17+".
- D. "Multi-Provider (opencode-go, anthropic, openai, google)".

**Decisión del planner:** **Opción A** ("8 Agentes Especializados") — coherente con la realidad de REASP (8 agentes: EFI Planner, Orchestrator, Planner, Builder, Architect, Reviewer, Debugger, Documentation).

**Cambio 5 — Añadir code-block al final del card:**

El code-block se coloca después de `.product-card-wide-content` (dentro de `.product-card-wide-inner`).

**Cambio 6 — Descripción con `<strong>Production-Grade.</strong>` al final:**

```diff
- <p class="product-card-desc">El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode. Redefine la forma en la que programas con agentes, evitando el desperdicio de tokens y enfocándose en una arquitectura determinista.</p>
+ <p class="product-card-desc">El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode. Redefine la forma en la que programas con agentes, evitando el desperdicio de tokens y enfocándose en una arquitectura determinista. <strong>Production-Grade.</strong></p>
```

### 3.2 Cambios NO realizados

- NO se modifica `landing/css/Styles.css` (clases ya existen).
- NO se modifica el accent color del REASP card (sigue púrpura).
- NO se modifica el texto de los features existentes (solo se añade 1).
- NO se modifica el badge "Open Source".
- NO se cambia el CTA "Explorar REASP" (sigue con `.btn-cta-purple`).

### 3.3 Estructura final del REASP card (después del cambio)

```html
<div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
  <div class="product-card-wide-inner">
    <div class="product-card-wide-content">
      <div class="product-card-header">
        <div class="sc-icon">... SVG icono REASP ...</div>
        <div>
          <div class="product-card-title-row">
            <h3 class="product-card-title">REASP</h3>
            <span class="badge badge-oss">Open Source</span>
          </div>
          <p class="product-card-subtitle">Ryou Enterprise Adaptive SDD Protocol</p>
        </div>
      </div>
      <p class="product-card-desc">... <strong>Production-Grade.</strong></p>
      <div class="product-features-grid">
        <!-- 4 features (3 existentes + 1 nueva) -->
      </div>
      <a href="REASP/index.html" class="btn-cta-purple">Explorar REASP</a>
    </div>
    <div class="racsp-codeblock">
      <div class="racsp-codeblock-overlay"></div>
      <div class="card-header">
        <div class="mac-buttons">...</div>
        <span class="racsp-codeblock-title">reasp / stack</span>
        <div style="width: 40px;"></div>
      </div>
      <pre class="racsp-codeblock-code">
        <code>... TypeScript/JSON con syntax highlighting ...</code>
      </pre>
    </div>
  </div>
</div>
```

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Cambiar `product-card` a `product-card product-card-wide` en REASP card.
- Envolver el contenido del card en `.product-card-wide-inner` y `.product-card-wide-content`.
- Cambiar `.product-features` a `.product-features-grid` (4 features en grid 2×2).
- Añadir 4ª feature: "8 Agentes Especializados".
- Añadir `<strong>Production-Grade.</strong>` al final de la descripción.
- Añadir `.racsp-codeblock` con mac-buttons, título "reasp / stack", y código TypeScript/JSON con syntax highlighting (reutilizando 11 clases `.cb-*`).

### 4.2 Lo que NO está en el scope

- NO modificar `landing/css/Styles.css` (clases ya existen).
- NO modificar otros productos (MeridianUI, Controls, SaaS, RACSP).
- NO modificar la grid de productos (`<div class="products-grid">` con 2 columnas). Eso es EPIC 13/PART 02.
- NO cambiar el badge "Open Source" del REASP card.
- NO cambiar el icono del REASP card (sigue siendo el mismo SVG de `memory`/CPU).

---

## 5. UX Problems

### UX-P1 — Code-block puede añadir altura significativa al card
El `.racsp-codeblock` tiene `flex: 0 0 33.333%` (33% del ancho del card) pero su altura depende del contenido. **Mitigación:** el código es corto (~10 líneas), así que la altura debería ser similar a RACSP.

### UX-P2 — Cambiar `.product-features` a `.product-features-grid` puede romper el layout
El CSS actual tiene `.product-features` (column) y `.product-features-grid` (grid 2×2). Son clases distintas. **Decisión:** usar `.product-features-grid` (grid 2×2, igual que RACSP).

### UX-P3 — La 4ª feature puede no caber en mobile
El grid 2×2 en mobile se convierte en 1 columna (por el `grid-template-columns: 1fr` en mobile). **Decisión:** aceptable, las 4 features se muestran apiladas en mobile.

### UX-P4 — El código del REASP debe ser coherente con la realidad del framework
El código debe mostrar información real de REASP (no inventar). **Decisión:** usar contenido de un `reasp.config.json` o un fragmento de un ModeProfile, no código ficticio.

---

## 6. Backend / Logic Problems

N/A — este PART es puramente HTML. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P1 — `.product-features-grid` tiene `grid-template-columns: 1fr` por defecto y `repeat(2, 1fr)` en `@media (min-width: 640px)`
El CSS actual de `.product-features-grid` (en `Styles.css` líneas ~1490):

```css
.product-features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 640px) {
  .product-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

**Comportamiento esperado:** en mobile (≤640px) las features se apilan verticalmente; en tablet/desktop (≥640px) se muestran en grid 2×2.

### Front-P2 — El code-block en mobile se apilará debajo del content
El CSS de `.product-card-wide-inner` es `display: flex; flex-direction: column;` por defecto, y `flex-direction: row;` en `@media (min-width: 768px)`. En mobile, el code-block quedará debajo del content (debajo de las features y el CTA).

### Front-P3 — Los 11 colores `.cb-*` son fijos, no usan variables
Los colores del syntax highlighting son fijos (e.g., `.cb-comment { color: #64748b; }`). **Decisión:** aceptar (consistencia con RACSP).

### Front-P4 — Los 11 colores `.cb-*` no se adaptan al theme de REASP
REASP usa accent púrpura. Si los features del code-block tuvieran que ser púrpura, los colores actuales `.cb-key` (naranja) no coinciden. **Decisión:** mantener colores fijos (consistencia con RACSP, que también usa colores fijos).

---

## 8. Technical Debt

N/A — este PART no introduce deuda técnica. Reutiliza código existente.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-1:** Cambiar el `<div class="product-card">` del REASP por `<div class="product-card product-card-wide">` — verificable con `grep -c 'product-card product-card-wide' landing/index.html` que retorna `≥ 1` (después del cambio, también el RACSP debe tenerlo, total 2).
- **RI-2:** Añadir `<div class="product-card-wide-inner">` envolviendo el contenido y el code-block — verificable con `grep -c 'product-card-wide-inner' landing/index.html` que retorna `≥ 2`.
- **RI-3:** Cambiar `<div class="product-features">` a `<div class="product-features-grid">` en el REASP card — verificable con `grep -c 'product-features-grid' landing/index.html` que retorna `≥ 2` (REASP + RACSP).
- **RI-4:** Añadir 4ª feature: "8 Agentes Especializados" — verificable con `grep -c "8 Agentes Especializados" landing/index.html` que retorna `≥ 1`.
- **RI-5:** Añadir `<strong>Production-Grade.</strong>` al final de la descripción del REASP — verificable con `grep -c "Production-Grade\.</strong>" landing/index.html` que retorna `≥ 1` en REASP.
- **RI-6:** Añadir `<div class="racsp-codeblock">` con título "reasp / stack" — verificable con `grep -c 'reasp / stack' landing/index.html` que retorna `≥ 1`.
- **RI-7:** El code-block usa las clases `.cb-comment`, `.cb-key`, etc. para syntax highlighting — verificable con `grep -c "cb-comment\|cb-key\|cb-bool\|cb-status" landing/index.html` que retorna `≥ 4`.
- **RI-8:** El CTA "Explorar REASP" sigue presente con `.btn-cta-purple` — verificable con `grep -c 'class="btn-cta-purple"' landing/index.html` que retorna `≥ 1` (en el REASP card, ya que solo hay 1).
- **RI-9:** NO se modifica `landing/css/Styles.css` — verificable con `git diff landing/css/Styles.css` que retorna 0 cambios.
- **RI-10:** NO se modifica `landing/REASP/**` — verificable con `git diff landing/REASP/` que retorna 0 cambios.
- **RI-11:** NO se modifica `landing/RACSP/**` — verificable con `git diff landing/RACSP/` que retorna 0 cambios.
- **RI-12:** DevTools > Console en Chrome 120+ NO muestra errores — verificable manualmente.
- **RI-13:** El REASP card se ve correctamente en mobile (DevTools > Toggle device toolbar > iPhone 12 Pro) — verificable manualmente.

---

## 10. Implementation Plan

### 10.1 Cambios específicos al `landing/index.html`

**Bloque actual (líneas 833-878, simplificado):**
```html
<!-- REASP -->
<div class="product-card scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
  <div class="product-card-header">...</div>
  <p class="product-card-desc">El primer Sistema Operativo...</p>
  <div class="product-features">
    <div class="feature-row">...3 features...</div>
  </div>
  <a href="REASP/index.html" class="btn-cta-purple">Explorar REASP</a>
</div>
```

**Bloque nuevo (estructura completa):**
```html
<!-- REASP -->
<div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
  <div class="product-card-wide-inner">
    <div class="product-card-wide-content">
      <div class="product-card-header">
        <div class="sc-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
            <line x1="7" y1="15" x2="7" y2="15"/>
          </svg>
        </div>
        <div>
          <div class="product-card-title-row">
            <h3 class="product-card-title">REASP</h3>
            <span class="badge badge-oss">Open Source</span>
          </div>
          <p class="product-card-subtitle">Ryou Enterprise Adaptive SDD Protocol</p>
        </div>
      </div>
      <p class="product-card-desc">El primer Sistema Operativo de Desarrollo IA Adaptativo diseñado para OpenCode. Redefine la forma en la que programas con agentes, evitando el desperdicio de tokens y enfocándose en una arquitectura determinista. <strong>Production-Grade.</strong></p>
      <div class="product-features-grid">
        <div class="feature-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Plugin Visual: Dashboard nativo in-session</span>
        </div>
        <div class="feature-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Instalación Global: un script instala CLI y Extensión</span>
        </div>
        <div class="feature-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Arquitectura determinista y adaptativa</span>
        </div>
        <div class="feature-row">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span>8 Agentes Especializados</span>
        </div>
      </div>
      <a href="REASP/index.html" class="btn-cta-purple">
        Explorar REASP
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
    </div>
    <div class="racsp-codeblock">
      <div class="racsp-codeblock-overlay"></div>
      <div class="card-header">
        <div class="mac-buttons">
          <span class="mac-btn close"></span>
          <span class="mac-btn min"></span>
          <span class="mac-btn max"></span>
        </div>
        <span class="racsp-codeblock-title">reasp / stack</span>
        <div style="width: 40px;"></div>
      </div>
      <pre class="racsp-codeblock-code"><code><span class="cb-comment"># REASP v1.0.1 — Adaptive SDD Stack</span>
<span class="cb-key">framework:</span> <span class="cb-bool">reasp</span>
<span class="cb-key">phases:</span>
  - <span class="cb-agent-claude">orchestrator</span>  <span class="cb-comment">(GLM-5.1)</span>
  - <span class="cb-agent-opencode">apply</span>       <span class="cb-comment">(Kimi K2.7)</span>
  - <span class="cb-agent-gemini">verify</span>       <span class="cb-comment">(DeepSeek V4)</span>

<span class="cb-key">providers:</span>
  - opencode-go    <span class="cb-bool">active</span>
  - anthropic      <span class="cb-bool">active</span>
  - openai         <span class="cb-bool">active</span>
  - google         <span class="cb-bool">active</span>

<span class="cb-key">status:</span> <span class="cb-status">production-grade</span></code></pre>
    </div>
  </div>
</div>
```

### 10.2 Decisiones del PART

- **D1:** Usar `.racsp-codeblock` (clase existente) en lugar de crear `.reasp-codeblock` (consistencia con RACSP, menos CSS nuevo).
- **D2:** Título del code-block: "reasp / stack" (consistente con "racsp / protocol").
- **D3:** Accent púrpura (igual que antes) — no se cambia el accent del card.
- **D4:** Contenido del code: configuración REASP real (phases, providers) en formato YAML-like con syntax highlighting.
- **D5:** 4ª feature: "8 Agentes Especializados" (relevante para REASP).
- **D6:** Layout: full-width con `.product-card-wide` (igual que RACSP).
- **D7:** Features en grid 2×2 con `.product-features-grid` (igual que RACSP).
- **D8:** `<strong>Production-Grade.</strong>` al final de la descripción (énfasis, como RACSP).

### 10.3 Archivos a NO TOCAR

- `landing/css/Styles.css` — intacto.
- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/assets/**` — intacto.
- Otros productos en `landing/index.html` (MeridianUI, Controls, SaaS, RACSP) — intactos.

### 10.4 Orden de operaciones

1. Localizar el bloque del REASP card en `landing/index.html` (líneas 833-878).
2. Reemplazar el bloque completo con la nueva estructura.
3. Validar con `grep` (AT-1 a AT-13).
4. Validar con DevTools en navegador.
5. Validar no-regresión en REASP/RACSP (AT-9, AT-10, AT-11).

---

## 11. Automated Test Plan

### AT-1 — Verificación de `product-card-wide` en REASP
- **Comando:** `grep -c 'product-card product-card-wide' landing/index.html`.
- **Pass criteria:** `≥ 2` (REASP + RACSP).
- **Fallo:** `< 2` o solo RACSP.

### AT-2 — Verificación de `product-card-wide-inner` añadido
- **Comando:** `grep -c 'product-card-wide-inner' landing/index.html`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-3 — Verificación de `product-features-grid` en REASP
- **Comando:** `grep -c 'product-features-grid' landing/index.html`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-4 — Verificación de la 4ª feature
- **Comando:** `grep -c "8 Agentes Especializados" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-5 — Verificación de `<strong>Production-Grade.</strong>` en REASP
- **Comando:** `grep -c "Production-Grade\.</strong>" landing/index.html`.
- **Pass criteria:** `≥ 1` (en REASP). **Nota:** RACSP también tiene "production-grade" pero sin `<strong>`, por lo que este grep es específico.
- **Fallo:** `0`.

### AT-6 — Verificación del code-block "reasp / stack"
- **Comando:** `grep -c "reasp / stack" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-7 — Verificación de syntax highlighting (`.cb-*`)
- **Comando:** `grep -c "cb-comment\|cb-key\|cb-bool\|cb-status" landing/index.html`.
- **Pass criteria:** `≥ 4` (todas las clases usadas).
- **Fallo:** `< 4`.

### AT-8 — Verificación de `btn-cta-purple` (CTA REASP)
- **Comando:** `grep -c 'class="btn-cta-purple"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-9 — Verificación de no-regresión CSS
- **Comando:** `git diff --stat landing/css/Styles.css`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-10 — Verificación de no-regresión REASP
- **Comando:** `git diff --stat landing/REASP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-11 — Verificación de no-regresión RACSP
- **Comando:** `git diff --stat landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

### AT-12 — Verificación de 0 errores en consola
- **Comando:** Manual con DevTools > Console.
- **Pass criteria:** 0 errores.
- **Fallo:** ≥ 1 error.

### AT-13 — Verificación responsive mobile
- **Comando:** Manual con DevTools > Toggle device toolbar > iPhone 12 Pro.
- **Pass criteria:** El card REASP se ve correctamente (code-block apilado debajo del content).
- **Fallo:** Overflow horizontal, texto cortado, o layout roto.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-1:** Abrir `landing/index.html` en Chrome 120+ — el REASP card tiene `product-card-wide` (full-width).
- [ ] **MV-2:** El REASP card tiene el code-block con mac-buttons (3 círculos rojo/amarillo/verde) y título "reasp / stack".
- [ ] **MV-3:** El code-block muestra código con syntax highlighting (colores en agents, keys, booleans, etc.).
- [ ] **MV-4:** El code-block tiene el gradient overlay (radial gradient con blur).
- [ ] **MV-5:** Las 4 features se muestran en grid 2×2 en desktop, en columna en mobile.
- [ ] **MV-6:** La 4ª feature "8 Agentes Especializados" se ve correctamente.
- [ ] **MV-7:** La descripción termina con `<strong>Production-Grade.</strong>` visible.
- [ ] **MV-8:** El CTA "Explorar REASP" sigue presente con el icono SVG de flecha.
- [ ] **MV-9:** DevTools > Console: 0 errores.
- [ ] **MV-10:** DevTools > Toggle device toolbar > iPhone 12 Pro: el card se ve correctamente (code-block apilado debajo del content).
- [ ] **MV-11:** El card RACSP sigue intacto (sin cambios visuales).
- [ ] **MV-12:** Los otros productos (MeridianUI, Controls, SaaS) siguen intactos.
- [ ] **MV-13:** DevTools > Lighthouse > Accessibility: sigue ≥ 95.

---

## 13. Technical Documentation to produce

### TD-Output-1 — Comentarios en `landing/index.html` (REASP card)

```html
<!-- ══ EPIC 13 PART 01 · REASP Codeblock · 2026-07-09 ══ -->
<!-- REASP card enhanced: full-width layout, 4 features en grid 2x2, -->
<!-- code-block con mac-buttons + syntax highlighting (reutiliza .racsp-codeblock) -->
<!-- Accent púrpura mantenido, contenido actualizado a "Production-Grade." -->
```

### TD-Output-2 — Documentación de la decisión D1

> **Decisión D1 (EPIC 13 PART 01):** El REASP card reutiliza la clase CSS `.racsp-codeblock` (creada originalmente para RACSP) en lugar de crear una nueva `.reasp-codeblock`. Esto evita duplicación de CSS y mantiene consistencia visual con RACSP.
>
> **Razón:** Los estilos son idénticos (mac-buttons, overlay, syntax highlighting). Solo cambia el contenido y el título del code-block.

---

## 14. User Documentation to produce

### UD-Output-1 — Mensaje de commit sugerido

```
feat(landing): REASP card enhanced with code-block

- REASP card: product-card → product-card-wide (full-width).
- Added 4th feature: '8 Agentes Especializados'.
- Features: .product-features → .product-features-grid (2x2).
- Description: added 'Production-Grade.' emphasis at end.
- Added .racsp-codeblock with mac-buttons + 'reasp / stack' title.
- Code shows REASP config: phases, providers, status (YAML-like).
- Syntax highlighting via .cb-* classes (reused from RACSP).
- CSS untouched (reuses existing classes).
- No regression in REASP/RACSP/CSS.

Refs: .refi/modules/keorsoft-landing-changes/epics/13-reasp-enhance/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-1:** El REASP card tiene `product-card product-card-wide` (full-width).
- **AC-2:** El REASP card tiene `<div class="product-card-wide-inner">` envolviendo content + code-block.
- **AC-3:** El REASP card tiene 4 features (3 originales + "8 Agentes Especializados").
- **AC-4:** Las 4 features usan `.product-features-grid` (grid 2×2).
- **AC-5:** La descripción del REASP termina con `<strong>Production-Grade.</strong>`.
- **AC-6:** El REASP card tiene `<div class="racsp-codeblock">` con título "reasp / stack".
- **AC-7:** El code-block usa las clases `.cb-*` para syntax highlighting (al menos 4 clases).
- **AC-8:** El CTA "Explorar REASP" sigue presente con `.btn-cta-purple` y link a `REASP/index.html`.
- **AC-9:** El REASP card se ve correctamente en mobile (code-block apilado debajo del content).
- **AC-10:** El REASP card se ve correctamente en desktop (content + code-block lado a lado).
- **AC-11:** `landing/css/Styles.css` NO modificado.
- **AC-12:** `landing/REASP/**` NO modificado.
- **AC-13:** `landing/RACSP/**` NO modificado.
- **AC-14:** DevTools > Console: 0 errores.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Decisión D1 (reutilizar `.racsp-codeblock`) coherente con principios DRY. Sin CSS nuevo. Sin inventar archivos/clases.
- [ ] **Gate 2 — Scope & Completeness Audit:** 1 archivo HTML modificado. Sin CSS nuevo. Sin cambios fuera de scope.
- [ ] **Gate 3 — UX/Design Review:** UX-P1 a UX-P4 resueltos según §5. Code-block añade riqueza visual sin saturar el card. 4 features coherentes. Accent púrpura mantenido.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma AT-1 a AT-13. DevTools Console 0 errores. Mobile y desktop funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART. Si las 4 features se ven mal en mobile, reabrir con `.product-features` (no grid).
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13.1) presentes. Decisión D1 documentada (§13.2).
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. 0 regresiones. Code-block visible correctamente. Firma del footer.

**Firma:** ______________  **Fecha:** ______________