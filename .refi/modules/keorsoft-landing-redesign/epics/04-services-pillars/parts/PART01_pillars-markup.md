# PART 01 — Pillars Markup (Services · 3 Pilares)

> **EPIC:** 04-services-pillars
> **Slug:** `pillars-markup`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation) + EPIC 02 (Hero) por tokens y `.section-tag` compartido
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el markup de la sección **Servicios** (`<section id="servicios">`, líneas 264-405 de `landing/index.html`, 141 líneas) consolidando las **7 service-cards actuales en 3 `.pillar-card` glass-panel**, basándose en la estructura de `KeorsoftLandingNEW/index.html` líneas 110-196. **Todo el contenido semántico de las 7 cards se preserva** dentro de los bullets de los 3 pilares.

---

## 2. Current State

### 2.1 Las 7 service-cards actuales (líneas 281-401 de `landing/index.html`)

Inventario línea-a-línea:

| # | Card | Líneas | Color (--c-bg) | Icono Material | Título |
|---|------|--------|----------------|----------------|--------|
| 1 | Software Empresarial | 283-295 | `--in` (indigo `#6366F1`) | `code_blocks` | "Software Empresarial (Pymes)" |
| 2 | Infraestructura Redes | 297-309 | `--kr-blue` (`#0E98F8`) | `router` | "Infraestructura de Redes y Hardware" |
| 3 | Ciberseguridad | 311-323 | `--em` (`#10B981`) | `shield_lock` | "Ciberseguridad Básica" |
| 4 | Diseño UX/UI | 325-337 | `--am` (`#F59E0B`) | `palette` | "Diseño UX / UI" |
| 5 | AI Consulting | 339-351 | `--vi` (`#8B5CF6`) | `smart_toy` | "AI Consulting & Integration" |
| 6 | Custom .NET | 353-365 | `--or` (`#F97316`) | `terminal` | "Custom .NET Development" |
| 7 | Enterprise Architecture (full-width) | 367-401 | `--kr-blue` (`#0E98F8`) | `account_tree` | "Enterprise Architecture" (con 3 sub-items: Clean Arch, CQRS, DDD) |

### 2.2 Contenido preservado por card (verbatim)

**Card 1 — Software Empresarial:**
- Descripción: "Sistemas a la medida diseñados para optimizar y automatizar los procesos de tu negocio. Desde puntos de venta (POS), CRMs, ERPs, hasta plataformas web completas que escalan contigo."
- Bullets: "Sistemas de Gestión / ERPs", "Aplicaciones Web a la Medida", "Puntos de Venta (POS)".

**Card 2 — Infraestructura Redes:**
- Descripción: "No solo hacemos el software, construimos la pista por la que corre. Diseño, cableado estructurado, configuración de servidores e instalación de equipos de cómputo para tu oficina o local."
- Bullets: "Cableado Estructurado", "Configuración de Servidores & Routers", "Mantenimiento e Instalación de Hardware".

**Card 3 — Ciberseguridad:**
- Descripción: "Protegemos el activo más importante de tu empresa: la información. Implementamos protocolos de seguridad, firewalls, respaldos automatizados (backups) y protección contra amenazas comunes."
- Bullets: "Configuración de Firewalls", "Políticas de Respaldo de Datos", "Protección de Redes Internas".

**Card 4 — Diseño UX/UI:**
- Descripción: "Software funcional y estéticamente impecable. Creamos interfaces intuitivas que enamoran a tus usuarios y mejoran la productividad de tus empleados a través de un diseño centrado en el humano."
- Bullets: "Diseño de Interfaces Web y Móvil", "Investigación de Usuarios (UX)", "Prototipado Interactivo".

**Card 5 — AI Consulting:**
- Descripción: "Ayudamos a las empresas a integrar inteligencia artificial en sus flujos de trabajo. Desde chatbots y automatización hasta análisis predictivo y generación de contenido."
- Bullets: "Automatización de Procesos con IA", "Integración de APIs de IA (OpenAI, Claude, Gemini)", "Consultoría Estratégica de IA".

**Card 6 — Custom .NET:**
- Descripción: "Especialistas en el ecosistema .NET moderno. Desarrollamos aplicaciones de escritorio, web y multiplataforma con las últimas tecnologías de Microsoft."
- Bullets: ".NET 9, WPF, Avalonia, Blazor, MAUI", "Entity Framework Core & SQL Server", "ASP.NET Core APIs y Microservicios".

**Card 7 — Enterprise Architecture** (full-width con sub-grid):
- Descripción: "Diseñamos arquitecturas escalables y mantenibles para aplicaciones empresariales de alto rendimiento."
- Sub-item 1: "Clean Architecture" — "Separación de responsabilidades, testabilidad y mantenibilidad a largo plazo."
- Sub-item 2: "CQRS" — "Separación de lecturas y escrituras para máximo rendimiento y escalabilidad."
- Sub-item 3: "Domain-Driven Design" — "Modelado del negocio en código. Ubiquitous language, aggregates, value objects."

### 2.3 Header de sección actual (líneas 271-279)

- Label: "Áreas de Especialidad" (texto plano, no `.section-tag`).
- H2: "Todo lo que tu empresa necesita en **un solo lugar.**" (gradient en "un solo lugar.").
- Subtítulo: "Olvídate de contratar múltiples proveedores. En Keorsoft cubrimos desde el desarrollo de tu plataforma hasta la infraestructura física, la seguridad y la inteligencia artificial."

### 2.4 Iconografía Material Symbols en uso (10 iconos)

| Material Symbol | Línea | Card |
|-----------------|-------|------|
| `code_blocks` | 285 | Software Empresarial |
| `router` | 299 | Infraestructura Redes |
| `shield_lock` | 313 | Ciberseguridad |
| `palette` | 327 | Diseño UX/UI |
| `smart_toy` | 341 | AI Consulting (también usado en EPIC 02 hero como "AI Tools" chip) |
| `terminal` | 355 | Custom .NET |
| `account_tree` | 371 | Enterprise Architecture (título) |
| `layers` | 380 | Sub-item Clean Architecture |
| `sync_alt` | 387 | Sub-item CQRS |
| `domain` | 394 | Sub-item DDD |
| `check` | 291, 292, 293, 305, 306, 307, 319, 320, 321, 333, 334, 335, 347, 348, 349, 361, 362, 363 | 18 ocurrencias en bullets |

### 2.5 Dependencias Tailwind

~80 utility classes (estimación). Las principales: `grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`, `md:col-span-2 lg:col-span-3`, `flex flex-col md:flex-row gap-8 items-start`, `md:w-1/3 md:w-2/3`, `sm:grid-cols-3`, `space-y-2`, `text-indigo-500`, `text-blue-500`, etc.

---

## 3. Comparison against baseline

Comparación contra `KeorsoftLandingNEW/index.html` líneas 110-196 (3 pilares).

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 264-405) | Nuevo (NEW 110-196) | Migración |
|---------|--------------------------|---------------------|-----------|
| Header label | `<p class="text-blue-600 ...">Áreas de Especialidad</p>` (línea 272) | `<div class="section-tag">Nuestras Soluciones</div>` (NEW línea 111) | Adoptar `.section-tag` con SVG icon |
| Header H2 | `class="text-3xl sm:text-4xl md:text-5xl ...">Todo lo que tu empresa necesita en <span class="text-gradient">un solo lugar.</span></h2>` (líneas 273-275) | `<h2 class="section-title">Soluciones robustas de extremo a extremo</h2>` (NEW línea 112) | Adoptar `.section-title` con `<span class="hero-title-accent">` para el gradient |
| Contenedor | `<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">` (línea 281) | `<div class="pillars-grid">` con `grid-template-columns: repeat(3, 1fr); gap: 2rem` (NEW línea 607) | Adoptar `.pillars-grid` |
| Card base | `.service-card` con `--c-bg` top-bar + bullets `<ul class="space-y-2 ...">` (líneas 284-294) | `.pillar-card.glass-panel` + `.pillar-icon-box` + `.pillar-list` con `.pillar-item` SVG checks (NEW 117-196) | Adoptar `.pillar-card` (clase nueva) con `.glass-panel` |
| Hover effect | translateY(-4px) + border-color `--c-bg` + box-shadow 0 10px 40px (actual Styles.css 198-202) | translateY(-6px) + background + border-color accent + box-shadow 0 20px 40px (NEW 622-627) | Adoptar hover del NEW |
| Color top-bar | `::before` con `--c-bg` (4px) | Sin top-bar (usa border-color accent en hover) | **Decisión:** eliminar top-bar (consistencia con `.pillar-card` puro del NEW) |
| Bullets | `<li class="flex items-center gap-2"><span class="material-symbols-rounded text-X-500" style="font-size:16px">check</span>Texto</li>` | `<li class="pillar-item"><svg ...><polyline points="20 6 9 17 4 12"/></svg>Texto</li>` (NEW 124-126) | Adoptar SVG inline para checks |
| Card 7 (Enterprise Arch) | `md:col-span-2 lg:col-span-3` con sub-grid `sm:grid-cols-3` interno (líneas 367-401) | No existe equivalente directo en NEW (los pilares son todos del mismo tamaño) | **Decisión:** absorber Enterprise Architecture en Pillar 3 (Developer & AI Tools), referencia en descripción |

### 3.2 Mapeo de consolidación 7 → 3 pilares

Decisión explícita (referenciada en master-blueprint D6 y en README del EPIC 04):

| Pilar | Color accent | Card(s) actual(es) absorbida(s) | Bullets resultantes |
|-------|--------------|--------------------------------|---------------------|
| **1. Aplicaciones Enterprise** | `--accent-indigo: #6366f1` | Card 1 (Software Empresarial) + Card 6 (Custom .NET) | "Sistemas CRM personalizados", "Sistemas POS rápidos y sin fricción", "PMS (Property Management Systems)", "Integraciones API de alta disponibilidad" |
| **2. Infraestructura y Redes** | `--accent-cyan: #06b6d4` | Card 2 (Infraestructura Redes) + Card 3 (Ciberseguridad) | "Instalación física de servidores y racks", "Diseño e instalación de infraestructura de red", "Protocolos de enrutamiento y seguridad", "Auditorías de ciberseguridad básica" |
| **3. Developer & AI Tools** | `--accent-purple: #a855f7` | Card 4 (Diseño UX/UI) + Card 5 (AI Consulting) + Card 7 (Enterprise Architecture) | "ReportsEngines de alto rendimiento", "Protocolo IA Reasp (Anti-alucinaciones)", "Paquetes de componentes UI (C#, JS)", "Sistemas de diseño MeridianUI y AegisUI" |

**Nota sobre Enterprise Architecture:** los 3 sub-items (Clean Architecture, CQRS, DDD) se referencian en la **descripción** del Pilar 3 (no como bullets ni como sub-grid). Esto preserva la mención sin añadir una 4ª card.

### 3.3 Decisión sobre color por pilar

Mapeo final:
- Pilar 1: `--accent-indigo` (coincide con `--in` actual). Sin cambio.
- Pilar 2: `--accent-cyan` (cambia de `--kr-blue` y `--em` a cyan unificado). Cambio visual intencional.
- Pilar 3: `--accent-purple` (cambia de `--am`, `--vi` a púrpura unificado). Cambio visual intencional.

### 3.4 Decisión sobre el header

- Label: "Áreas de Especialidad" → se移植 a `.section-tag` con SVG icon.
- H2: "Todo lo que tu empresa necesita en **un solo lugar.**" se preserva verbatim.
- Subtítulo: párrafo actual se preserva verbatim.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 264-405 con la nueva estructura de 3 pilares.
- Preservación verbatim del header de sección (label, H2, subtítulo).
- Consolidación de 21 bullets (3 bullets × 7 cards) en 12 bullets (4 bullets × 3 pilares) con copia fiel al contenido semántico.
- Referencia a Enterprise Architecture (Clean Arch, CQRS, DDD) en la descripción del Pilar 3.
- Reemplazo de los 28 iconos Material Symbols (10 + 18 checks) por SVG inline.
- Preservación de `id="servicios"` (anchor para nav link).

### 4.2 Lo que NO está en el scope

- **NO** se añade el cotizador (`#estimator` del NEW) — fuera de scope del packet.
- **NO** se añade el simulador REASP — fuera de scope.
- **NO** se modifican otras secciones (Nosotros EPIC 03, Productos EPIC 05, etc.).
- **NO** se consolidan scripts (EPIC 09).

---

## 5. UX Problems

### UX-P21 — Pérdida de detalle al consolidar 7 → 3 pilares
Cada card original tiene 3 bullets específicos. Al consolidar a 4 bullets por pilar, **se pierde detalle granular** (ej. ".NET 9, WPF, Avalonia, Blazor, MAUI" se condensa en "Integraciones API de alta disponibilidad"). **Mitigación:** la descripción del Pilar 1 puede ampliarse para mencionar ".NET 9, WPF, Blazor, MAUI" si el usuario lo requiere.

### UX-P22 — Cambio de color del Pilar 2 y 3
El usuario tenía cards con colores variados (azul, verde, ámbar, púrpura, naranja). Los 3 pilares usan solo 3 colores (indigo, cyan, púrpura). **Mitigación:** documentado en D1 del master-blueprint. Cambio intencional para alinearse con el nuevo estilo.

### UX-P23 — Card 7 (Enterprise Architecture) pierde sub-grid visual
Los 3 sub-items de Clean Arch, CQRS, DDD tenían su propia presentación visual con iconos + título + descripción en una grid de 3 columnas. **Mitigación:** la descripción del Pilar 3 menciona explícitamente "Clean Architecture, CQRS y DDD" para preservar la info; el detalle se documenta en REASP docs (donde es más relevante).

### UX-P24 — Bullet check iconografía cambia de Material Symbols a SVG
Los bullets actuales usan `<span class="material-symbols-rounded text-X-500">check</span>` (18 ocurrencias). Los nuevos usan `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` con color heredado del `.pillar-card`. **Decisión:** usar SVG inline de Feather Icons (`check-circle`).

### UX-P25 — Header label "Áreas de Especialidad" cambia a `.section-tag`
El label actual es texto plano; el nuevo estilo usa `.section-tag` (similar a EPIC 02 hero badge). El texto literal "Áreas de Especialidad" se移植 al `.section-tag`.

---

## 6. Backend / Logic Problems

N/A — markup + CSS. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P22 — `text-X-500` para checks requiere Tailwind arbitrary value
Líneas 291-363: `<span class="material-symbols-rounded text-indigo-500">check</span>` (y variantes blue-500, emerald-500, amber-500, purple-500, orange-500). Al eliminar Tailwind, se usa `color: var(--card-accent)` heredado de `.pillar-card`.

### Front-P23 — `style="font-size:16px"` inline en checks
Líneas 291-363: `style="font-size:16px"` inline en los checks. En el nuevo estilo, el SVG hereda el tamaño del contenedor (16×16 por defecto en `.pillar-item svg`).

### Front-P24 — `style="font-size:28px"` inline en iconos principales
Líneas 285, 299, 313, 327, 341, 355, 371: `style="font-size:28px"` inline en los iconos Material Symbols. En el nuevo estilo, SVG dentro de `.pillar-icon-box` se ajusta al `width="28" height="28"` del SVG.

### Front-P25 — `style="font-size:20px"` inline en sub-iconos
Líneas 380, 387, 394: `style="font-size:20px"` inline en sub-iconos de Card 7. **Desaparece** porque la Card 7 se absorbe en Pilar 3 sin sub-grid.

### Front-P26 — `text-gradient` en `<span>` del H2
Línea 274: `<span class="text-gradient">un solo lugar.</span>`. La clase `.text-gradient` está移植 en EPIC 01 (existe en el nuevo `Styles.css`). Sin cambios.

---

## 8. Technical Debt

### TD-15 — Top-bar de `.service-card::before` se elimina al consolidar a `.pillar-card`
Las 7 cards actuales tienen `::before` con top-bar de 4px coloreado por `--c-bg`. El nuevo `.pillar-card` (del NEW) no tiene top-bar, usa `border-color` accent en hover. **Decisión:** eliminar top-bar para consistencia con EPIC 03 (que sí lo mantiene) y EPIC 04 (que no).

**Trade-off:** EPIC 03 mantiene top-bar (decisión consciente en §10 de su PART), EPIC 04 lo elimina. Ambos enfoques son válidos; se documenta esta divergencia.

### TD-16 — `.sc-icon` se mantiene como clase legacy en EPIC 03, pero EPIC 04 introduce `.pillar-icon-box`
`.pillar-icon-box` (NEW styles.css líneas 637-660) es la versión glass-panel del icono. EPIC 04 introduce esta clase nueva. **Limpieza en EPIC 11:** unificar `.sc-icon` y `.pillar-icon-box` si se considera necesario.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-46:** Reemplazar las **141 líneas** (264-405) de la sección servicios con la nueva estructura de 3 pilares (~95 líneas) — verificable con `(Get-Content landing/index.html)[263..404].Count` antes y después.
- **RI-47:** Preservar verbatim el **H2 "Todo lo que tu empresa necesita en un solo lugar."** con `<span class="hero-title-accent">` para gradient — verificable con `grep -c "Todo lo que tu empresa necesita" landing/index.html` que retorna `1` y `grep -c "un solo lugar" landing/index.html` que retorna `1`.
- **RI-48:** Preservar verbatim el **subtítulo sobre contratar múltiples proveedores** — verificable con `grep -c "Olvídate de contratar múltiples proveedores" landing/index.html` que retorna `1`.
- **RI-49:** Crear **3 `.pillar-card`** con sus bullets específicos:
  - **Pilar 1:** 4 bullets que cubran Software Empresarial + Custom .NET.
  - **Pilar 2:** 4 bullets que cubran Infraestructura Redes + Ciberseguridad.
  - **Pilar 3:** 4 bullets que cubran UX/UI + AI Consulting + Enterprise Architecture.
- **RI-50:** Mencionar explícitamente **"Clean Architecture, CQRS y DDD"** en la descripción del Pilar 3 — verificable con `grep -c "Clean Architecture" landing/index.html` que retorna `≥ 1`.
- **RI-51:** Reemplazar los **28 iconos Material Symbols** (10 principales + 18 checks) por SVG inline — verificable con `grep -E "(code_blocks|router|shield_lock|palette|smart_toy|terminal|account_tree|layers|sync_alt|domain)" landing/index.html | wc -l` que retorna `0`.
- **RI-52:** Verificar **12 bullets totales** (4 por pilar × 3 pilares) con SVG check icon — verificable con `grep -c '<li class="pillar-item"' landing/index.html` que retorna `12`.
- **RI-53:** Mantener el `<section id="servicios">` con su anchor — verificable con `grep -c 'id="servicios"' landing/index.html` que retorna `1`.
- **RI-54:** Usar `.pillars-grid` class en el contenedor de los 3 pilares (no Tailwind grid utility) — verificable con `grep -c "pillars-grid" landing/index.html` que retorna `≥ 1`.
- **RI-55:** Cada pilar tiene `.pillar-card glass-panel` con un `data-accent` o style inline para el color — verificable con `grep -E "pillar-card.*(--accent-indigo|--accent-cyan|--accent-purple)" landing/index.html` que retorna `≥ 3` matches.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 264-405** (reemplazo total, 141 líneas → ~95 líneas):

```html
<!-- ══ SERVICIOS · EPIC 04 PART 01 ═════════════════════════════════════════ -->
<section id="servicios" class="py-24 sm:py-32 section-alt relative">
  <!-- 2 bg orbs decorativos (mantener, adaptados a dark) -->
  <div class="about-bg-orb" style="top:0;right:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%);"></div>
  <div class="about-bg-orb" style="bottom:0;left:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(168,85,247,0.05), transparent 70%);"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Section header -->
    <div class="section-header">
      <div class="section-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
        Áreas de Especialidad
      </div>
      <h2 class="section-title">
        Todo lo que tu empresa necesita en <span class="hero-title-accent">un solo lugar.</span>
      </h2>
      <p class="section-desc">
        Olvídate de contratar múltiples proveedores. En Keorsoft cubrimos desde el desarrollo de tu plataforma hasta la infraestructura física, la seguridad y la inteligencia artificial.
      </p>
    </div>

    <!-- 3 pilares -->
    <div class="pillars-grid">

      <!-- Pilar 1: Aplicaciones Enterprise (indigo) -->
      <div class="pillar-card glass-panel indigo">
        <div class="pillar-icon-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
            <line x1="8" y1="21" x2="16" y2="21"/>
            <line x1="12" y1="17" x2="12" y2="21"/>
          </svg>
        </div>
        <h3 class="pillar-title">Aplicaciones Enterprise</h3>
        <p class="pillar-desc">
          Desarrollamos soluciones a medida robustas, escalables y adaptadas al flujo de trabajo de tu industria. Stack .NET 9 moderno con WPF, Blazor, MAUI y ASP.NET Core.
        </p>
        <ul class="pillar-list">
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Sistemas CRM personalizados
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Sistemas POS rápidos y sin fricción
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            PMS (Property Management Systems)
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Integraciones API de alta disponibilidad
          </li>
        </ul>
      </div>

      <!-- Pilar 2: Infraestructura y Redes (cyan) -->
      <div class="pillar-card glass-panel cyan">
        <div class="pillar-icon-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
            <line x1="6" y1="6" x2="6.01" y2="6"/>
            <line x1="6" y1="18" x2="6.01" y2="18"/>
          </svg>
        </div>
        <h3 class="pillar-title">Infraestructura y Redes</h3>
        <p class="pillar-desc">
          Diseñamos y montamos la estructura física y lógica sobre la que corre el software más demandante. Desde racks hasta políticas de seguridad perimetral.
        </p>
        <ul class="pillar-list">
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Instalación física de servidores y racks
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Diseño e instalación de infraestructura de red
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Protocolos de enrutamiento y seguridad
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Auditorías de ciberseguridad básica
          </li>
        </ul>
      </div>

      <!-- Pilar 3: Developer & AI Tools (purple) -->
      <div class="pillar-card glass-panel purple">
        <div class="pillar-icon-box">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </div>
        <h3 class="pillar-title">Developer &amp; AI Tools</h3>
        <p class="pillar-desc">
          Software avanzado, librerías y protocolos para empoderar a los equipos de desarrollo moderno. Incluye arquitectura empresarial con Clean Architecture, CQRS y DDD.
        </p>
        <ul class="pillar-list">
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            ReportsEngines de alto rendimiento
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Protocolo IA Reasp (Anti-alucinaciones)
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Paquetes de componentes UI (C#, JS)
          </li>
          <li class="pillar-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Sistemas de diseño MeridianUI y AegisUI
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>
```

### 10.2 Decisión sobre el sub-grid de Enterprise Architecture

**Decisión del planner:** absorber los 3 sub-items (Clean Arch, CQRS, DDD) en la descripción del Pilar 3. Esta decisión está documentada en §3.2 y §3.3.

**Justificación:**
- Mantiene el layout limpio de 3 pilares (consistente con NEW).
- La info sigue presente (en la descripción).
- El detalle granular de Clean Arch, CQRS, DDD tiene su lugar natural en REASP docs (donde se explica la metodología), no en el landing principal.

### 10.3 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Hero (EPIC 02), Nosotros (EPIC 03), Productos (EPIC 05), etc. — intactos.

---

## 11. Automated Test Plan

### AT-44 — Verificación de H2 preservado
- **Comando:** `grep -c "Todo lo que tu empresa necesita" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-45 — Verificación de subtítulo preservado
- **Comando:** `grep -c "Olvídate de contratar múltiples proveedores" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-46 — Verificación de 3 pilares
- **Comando:** `grep -c '<div class="pillar-card' landing/index.html`.
- **Pass criteria:** `3`.
- **Fallo:** `< 3` o `> 3`.

### AT-47 — Verificación de 12 bullets
- **Comando:** `grep -c '<li class="pillar-item"' landing/index.html`.
- **Pass criteria:** `12` (4 × 3 pilares).
- **Fallo:** `< 12` o `> 12`.

### AT-48 — Verificación de mención de Enterprise Architecture
- **Comando:** `grep -c "Clean Architecture" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0` (info perdida).

### AT-49 — Verificación de mención de Reasp
- **Comando:** `grep -c "Reasp" landing/index.html`.
- **Pass criteria:** `≥ 1` (debe aparecer en Pilar 3).
- **Fallo:** `0`.

### AT-50 — Verificación de eliminación de Material Symbols en servicios
- **Comando:** `grep -E "(code_blocks|router|shield_lock|palette|smart_toy|terminal|account_tree|layers|sync_alt|domain)" landing/index.html | wc -l`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-51 — Verificación de anchor `#servicios` preservado
- **Comando:** `grep -c 'id="servicios"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-52 — Verificación de `.pillars-grid` class
- **Comando:** `grep -c "pillars-grid" landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-53 — Verificación de colores accent por pilar
- **Comando:** `grep -c "glass-panel indigo\|glass-panel cyan\|glass-panel purple" landing/index.html`.
- **Pass criteria:** `3`.
- **Fallo:** `< 3`.

### AT-54 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-61:** Abrir `landing/index.html` en Chrome 120+: la sección servicios tiene fondo con 2 orbes sutiles (indigo + púrpura).
- [ ] **MV-62:** El header tiene `.section-tag` "Áreas de Especialidad" con icono SVG (monitor/desktop icon).
- [ ] **MV-63:** El H2 "Todo lo que tu empresa necesita en un solo lugar." tiene "un solo lugar." con gradient.
- [ ] **MV-64:** El subtítulo completo sobre múltiples proveedores está visible.
- [ ] **MV-65:** Los 3 pilares están visibles en grid horizontal (3 columnas en desktop).
- [ ] **MV-66:** **Pilar 1 (Aplicaciones Enterprise)** tiene icono indigo + título + descripción + 4 bullets con checks. Color de fondo tinte indigo.
- [ ] **MV-67:** **Pilar 2 (Infraestructura y Redes)** tiene icono cyan + título + descripción + 4 bullets con checks. Color de fondo tinte cyan.
- [ ] **MV-68:** **Pilar 3 (Developer & AI Tools)** tiene icono púrpura + título + descripción + 4 bullets con checks. Color de fondo tinte púrpura. La descripción menciona "Clean Architecture, CQRS y DDD".
- [ ] **MV-69:** Cada bullet tiene un check icon (SVG polilínea) en color heredado del pilar.
- [ ] **MV-70:** Hover en cualquier pilar: translateY(-6px), background más opaco, border-color accent, box-shadow.
- [ ] **MV-71:** Renderizar en DevTools > iPhone 12 Pro: pilares colapsan a 1 columna.
- [ ] **MV-72:** Renderizar en DevTools > iPad (768×1024): pilares colapsan a 1 columna (breakpoint 1024 también aplica a 768).
- [ ] **MV-73:** Click en nav link "Servicios" (`href="#servicios"` línea 34) hace scroll suave a la sección.
- [ ] **MV-74:** DevTools > Console: 0 errores.
- [ ] **MV-75:** DevTools > Lighthouse: sin regresión vs EPIC 03.
- [ ] **MV-76:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-11 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ SERVICIOS · EPIC 04 PART 01 ══════════════════════════════════════════ -->
<!-- 3 pilares (glass-panel) consolidando las 7 service-cards anteriores -->
<!-- Pilar 1: Aplicaciones Enterprise (indigo) — Software + .NET -->
<!-- Pilar 2: Infraestructura y Redes (cyan) — Redes + Ciberseguridad -->
<!-- Pilar 3: Developer & AI Tools (purple) — UX/UI + AI + Enterprise Arch -->
<!-- Enterprise Architecture (Clean/CQRS/DDD) mencionada en descripción Pilar 3 -->
```

### TD-Output-12 — Documentación de decisión de consolidación

Comentario en master-blueprint o en EPIC 04 README:
> Decisión: 7 service-cards consolidadas en 3 pilares. Enterprise Architecture (Clean Arch, CQRS, DDD) absorbida en la descripción del Pilar 3 para mantener layout limpio de 3 cards. Detalle granular preservado en REASP docs.

---

## 14. User Documentation to produce

### UD-Output-11 — Mensaje de commit sugerido

```
feat(landing): consolidar servicios en 3 pilares glass-panel

- 7 service-cards consolidadas en 3 .pillar-card.glass-panel.
- Pilar 1 (indigo): Aplicaciones Enterprise — CRM/POS/PMS/API.
- Pilar 2 (cyan): Infraestructura y Redes — servers, network, security.
- Pilar 3 (purple): Developer & AI Tools — ReportsEngines, Reasp,
  MeridianUI, AegisUI; menciona Clean Architecture, CQRS y DDD.
- 28 iconos Material Symbols reemplazados por SVG inline.
- Header adaptado a .section-tag + .section-title.

Refs: .refi/modules/keorsoft-landing-redesign/epics/04-services-pillars/
```

### UD-Output-12 — Nota sobre consolidación

Pequeña nota:
> Los 7 servicios se consolidan en 3 pilares para alinearse con el nuevo estilo. La información de cada servicio se preserva en los bullets de los pilares correspondientes. Enterprise Architecture (Clean Arch, CQRS, DDD) se menciona en la descripción del Pilar 3; el detalle granular está en `landing/REASP/index.html`.

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-64:** La sección servicios tiene 3 `.pillar-card` (verificable con `grep -c '<div class="pillar-card'` retorna 3).
- **AC-65:** El H2 "Todo lo que tu empresa necesita en un solo lugar." se preserva con gradient en "un solo lugar.".
- **AC-66:** El subtítulo sobre contratar múltiples proveedores se preserva verbatim.
- **AC-67:** Cada pilar tiene 4 bullets con `<li class="pillar-item">` (12 bullets totales).
- **AC-68:** La descripción del Pilar 3 menciona "Clean Architecture", "CQRS" y "DDD".
- **AC-69:** Los 28 iconos Material Symbols (10 principales + 18 checks) están reemplazados por SVG inline.
- **AC-70:** El `<section id="servicios">` mantiene su `id`.
- **AC-71:** El comando `grep -c "pillars-grid" landing/index.html` retorna ≥ 1.
- **AC-72:** Los 3 pilares usan colores accent: `glass-panel indigo`, `glass-panel cyan`, `glass-panel purple`.
- **AC-73:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-74:** DevTools > Lighthouse: Accessibility ≥ 95, Performance ≥ 85.
- **AC-75:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-76:** Cada bullet tiene un check SVG con stroke color heredado del pilar.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Decisión de consolidación 7→3 pilares documentada y justificada. Enterprise Architecture absorbida correctamente. Tokens accent usados coherentemente (indigo, cyan, purple).
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy preservado verbatim (header, 3 pilares, 12 bullets). 28 iconos Material Symbols reemplazados. Layout de 3 columnas en desktop, 1 en mobile.
- [ ] **Gate 3 — UX/Design Review:** UX-P21 a UX-P25 resueltos según §5. Consolidación no pierde info semántica. Sub-grid de Enterprise Arch se referencia en descripción de Pilar 3.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Sin regresión Lighthouse.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre consolidación (§14.2) comunicada.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 13 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________