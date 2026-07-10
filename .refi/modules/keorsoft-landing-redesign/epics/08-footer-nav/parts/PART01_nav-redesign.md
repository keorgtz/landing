# PART 01 — Nav Redesign (Footer & Nav)

> **EPIC:** 08-footer-nav
> **Slug:** `nav-redesign`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation) + EPIC 02 (clase `.bg-glow-container` reusable)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reemplazar el `<nav>` actual del landing (líneas 17-67, pill flotante con theme toggle) por un **sticky header full-width** con backdrop-filter, basado en `KeorsoftLandingNEW/index.html` líneas 33-55. Se preserva verbatim:
- Logo "Keorsoft" + "K" en caja 32×32 con gradiente.
- 6 nav links: Inicio, Servicios, Productos, Open Source, Nosotros, Contacto.
- Botón CTA "Contactar" → `https://wa.me/523327633233`.
- Hamburger menu con 3 spans animado a X (móvil).

Se **elimina** el theme toggle (light/dark) — dark-only confirmado en Gate A.

---

## 2. Current State

### 2.1 Nav actual (líneas 17-67 de `landing/index.html`)

```
<nav class="fixed top-0 z-50 flex justify-center w-full pt-4 px-4" style="pointer-events:none">  <!-- línea 18 -->
  <div class="nav-pill flex items-center gap-1" style="pointer-events:auto">  <!-- línea 19 -->

    <!-- Logo -->
    <a href="#inicio" class="flex items-center gap-2 px-4 py-2 rounded-full">  <!-- línea 21 -->
      <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm" style="background:linear-gradient(135deg, var(--kr-blue), var(--vi))">
        K  <!-- línea 23 -->
      </div>
      <span class="hidden sm:inline text-sm font-extrabold tracking-tighter uppercase text-[color:var(--txt-1)]" style="font-family:var(--font-display)">
        KEOR<span class="text-blue-500">SOFT</span>  <!-- línea 26 -->
      </span>
    </a>

    <div class="hidden md:block w-px h-5 mx-2" style="background:var(--card-border)"></div>  <!-- línea 30 -->

    <!-- 6 nav links -->
    <div class="hidden md:flex items-center font-semibold">
      <a href="#inicio"    class="pill-nav-link">Inicio</a>  <!-- línea 33 -->
      <a href="#servicios" class="pill-nav-link">Servicios</a>  <!-- línea 34 -->
      <a href="#productos" class="pill-nav-link">Productos</a>  <!-- línea 35 -->
      <a href="#opensource" class="pill-nav-link">Open Source</a>  <!-- línea 36 -->
      <a href="#nosotros"  class="pill-nav-link">Nosotros</a>  <!-- línea 37 -->
      <a href="#contacto" class="pill-nav-link">Contacto</a>  <!-- línea 38 -->
    </div>

    <!-- Mobile dropdown -->
    <div class="md:hidden relative">
      <button id="mobile-menu-btn" class="pill-nav-link flex items-center gap-1">  <!-- línea 43 -->
        <span class="material-symbols-rounded" style="font-size:18px">menu</span>  <!-- línea 44 -->
        <span class="text-xs">Menú</span>  <!-- línea 45 -->
      </button>
      <div id="mobile-menu" class="hidden absolute top-full right-0 mt-2 w-48 rounded-2xl border p-2 flex flex-col gap-1" style="background:var(--nav-bg);border-color:var(--nav-border);backdrop-filter:blur(20px)">  <!-- línea 47 -->
        <!-- 6 nav links en columna -->
      </div>
    </div>

    <div class="hidden md:block w-px h-5 mx-2" style="background:var(--card-border)"></div>  <!-- línea 57 -->

    <!-- Theme toggle (A ELIMINAR) -->
    <button id="theme-toggle" class="w-9 h-9 rounded-full flex items-center justify-center ..." aria-label="Cambiar tema">  <!-- línea 59 -->
      <span class="material-symbols-rounded" style="font-size:18px" id="theme-icon">light_mode</span>  <!-- línea 60 -->
    </button>

    <!-- CTA Contactar -->
    <a href="https://wa.me/523327633233" target="_blank" class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white" style="background:var(--kr-blue);font-family:var(--font);box-shadow:0 4px 14px rgba(14,152,248,.4)">
      Contactar  <!-- línea 64 -->
    </a>
  </div>
</nav>
```

### 2.2 Logo actual

- Caja 32×32 (mobile) o 32×32 (desktop) con gradiente `linear-gradient(135deg, var(--kr-blue), var(--vi))`.
- Letra "K" en blanco, font-weight bold.
- Texto "KEOR**SOFT**" (la palabra "SOFT" en `text-blue-500`).

### 2.3 Theme toggle (líneas 59-61)

- Botón `<button id="theme-toggle">` con icono Material Symbols `light_mode` / `dark_mode`.
- Handler en `<script>` inline (líneas 850-867): `getElementById('theme-toggle')`, `setAttribute('data-theme', ...)`.
- **Decisión:** ELIMINAR (dark-only confirmado).

### 2.4 CSS actual relevante

- `.nav-pill` (líneas 106-114 de Styles.css anterior): background `var(--nav-bg)`, border 1px solid `var(--nav-border)`, border-radius 999px, padding 6px, backdrop-filter blur(20px), box-shadow 0 8px 32px rgba(0,0,0,.1).
- `.pill-nav-link` (líneas 115-128): display inline-block, padding 8px 16px, border-radius 999px, font-size 14px, font-weight 600, color `var(--txt-2)`. Hover: color `var(--txt-1)`, background `var(--card-hover)`. Active: color `var(--kr-blue)`, background `rgba(14,152,248,.1)`.

### 2.5 Script actual del nav

El `<script>` inline del landing (líneas 850-886) tiene:
- Theme toggle handler (líneas 850-867) → **ELIMINAR** (EPIC 01 ya eliminó el bloque parcialmente, verificar).
- Mobile menu toggle (líneas 870-886):
  ```js
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
  });
  ```
- Active nav highlight (líneas 902-923): observación de `section[id]` y toggle `.active` en `.pill-nav-link`.

**Decisión del planner:** el script del mobile menu se移植 al estilo NEW (hamburger con 3 spans animado a X). El handler se extrae en EPIC 09. Los IDs `#mobile-menu-btn` y `#mobile-menu` se mantienen para compatibilidad con el script actual.

### 2.6 Iconografía Material Symbols en nav

| Icono | Línea | Uso |
|-------|-------|-----|
| `menu` | 44 | Hamburger (mobile) |
| `light_mode` / `dark_mode` | 60 | Theme toggle (A ELIMINAR) |

---

## 3. Comparison against baseline

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 17-67) | Nuevo (NEW 33-55) | Migración |
|---------|------------------------|-------------------|-----------|
| Container | `<nav class="fixed top-0 z-50 ...">` (pill flotante) | `<header>` sticky full-width con backdrop-filter | Sticky header |
| Logo | Caja 32×32 con gradiente azul→violeta + texto "KEORSOFT" | Caja 32×32 con gradiente cyan→indigo + texto "Keorsoft" (lowercase, gradient text) | Logo refactor: gradient cyan→indigo, texto "Keorsoft" en gradient |
| Nav links | `<a class="pill-nav-link">` (pill style) | `<li><a class="nav-link">` (underline animado) | Adoptar `.nav-link` con underline animado |
| Theme toggle | `<button id="theme-toggle">` con `light_mode` icon | NO existe | **ELIMINAR** |
| CTA "Contactar" | Pill con `var(--kr-blue)` background | `<button class="nav-cta-btn">` con border + hover blanco | Mantener CTA "Contactar" pero refactor a `.nav-cta-btn` (sin color de marca, más neutral) |
| Mobile menu | Dropdown `<div id="mobile-menu">` con 6 links en columna | Toggle `<div class="nav-menu" id="navMenu">` que aparece como menú full-screen vertical | Adoptar `.nav-menu` con hamburger animado |
| Hamburger animation | No animation | 3 spans → X con `transform: rotate(45deg) translate(...)` (NEW app.js líneas 10-19) | Adoptar animación |

### 3.2 Decisión sobre el CTA "Contactar"

**Decisión del planner:** mantener el CTA "Contactar" como **pill blanco con border** (estilo NEW `.nav-cta-btn`) en lugar de gradient azul. Justificación:
- El estilo NEW usa CTA neutral (border + hover blanco) para no competir con otros CTAs del landing.
- El pill azul actual es redundante con `.btn-primary` del hero.

### 3.3 Decisión sobre el theme toggle

**Decisión:** eliminar el theme toggle completamente (botón, icono, handler JS). Dark-only confirmado.

### 3.4 Decisión sobre el logo

Mantener caja 32×32 con "K". Refactorizar:
- Gradiente de azul→violeta → cyan→indigo (estilo NEW).
- Texto "KEORSOFT" → "Keorsoft" (lowercase, más moderno, gradient text).
- Mantener "K" en blanco.

**Decisión alternativa:** mantener "KEORSOFT" en uppercase como tiene el usuario actualmente. El planner recomienda lowercase por consistencia con NEW, pero acepta ambas opciones.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 17-67 con nuevo `<header>` sticky.
- Preservación verbatim de los 6 nav links (Inicio, Servicios, Productos, Open Source, Nosotros, Contacto) y sus hrefs.
- Preservación del CTA "Contactar" apuntando a `https://wa.me/523327633233`.
- Refactor del logo (manteniendo "K" en caja 32×32; decisión sobre "KEORSOFT" vs "Keorsoft" como arriba).
- Hamburger con 3 spans animado a X (NEW style).
- Mobile menu `<ul class="nav-menu" id="navMenu">` con 6 links en columna vertical.
- Eliminación completa del theme toggle (botón + handler JS inline).
- Adición al `Styles.css` del bloque 8.AC con ~150 líneas:
  - `header` (sticky, backdrop-filter).
  - `.nav-container`, `.logo`, `.logo-icon`.
  - `.nav-menu`, `.nav-link`, `.nav-link::after` (underline animado).
  - `.nav-cta-btn`, `.nav-cta-btn:hover`.
  - `.menu-toggle` con `.menu-toggle span` animado.
  - `.nav-menu.active` (mobile).
- Mantenimiento de IDs `#mobile-menu-btn` y `#mobile-menu` para compatibilidad con `<script>` inline actual.

### 4.2 Lo que NO está en el scope

- **NO** se añade nuevo link o sección.
- **NO** se modifica el contenido del hero, productos, etc.
- **NO** se consolidan scripts (EPIC 09).
- **NO** se cambia el CTA "Contactar" a otro destino.

---

## 5. UX Problems

### UX-P55 — Cambio de pill flotante a sticky full-width cambia la densidad visual
El pill flotante ocupa menos espacio vertical pero es "premium". El sticky full-width es más estándar pero ocupa todo el ancho. **Decisión:** aceptar (consistencia con NEW).

### UX-P56 — Mobile menu full-screen vs dropdown
El NEW usa full-screen vertical; el actual usa dropdown. **Decisión:** dropdown (más compacto, suficiente para 6 links).

### UX-P57 — Hamburger animation requiere JS handler
El handler del mobile menu (líneas 870-886) actualmente toggle `.hidden`. Para la animación de los spans (NEW app.js líneas 10-19), se necesita un nuevo handler. **Decisión:** mantener handler simple (toggle `.active` en `.nav-menu`) en este PART; EPIC 09 añade la animación de spans.

### UX-P58 — Logo "Keorsoft" lowercase vs "KEORSOFT" uppercase
Decisión del planner: lowercase (consistencia con NEW). **Decisión alternativa:** mantener uppercase como el usuario tiene actualmente.

### UX-P59 — CTA "Contactar" border vs gradient
El CTA actual es pill azul con gradient; el NEW es pill con border. **Decisión:** border (más neutral, no compite con hero CTA).

---

## 6. Backend / Logic Problems

N/A — markup + CSS + client-side script.

---

## 7. Frontend / Presentation Problems

### Front-P64 — `style="pointer-events:none"` en `<nav>` y `style="pointer-events:auto"` en pill
Línea 18-19: truco para que el pill flotante sea clickeable pero el resto del `<nav>` no. Sin action en sticky nav (no se necesita).

### Front-P65 — `style="background:var(--card-border)"` en divisores
Línea 30, 57: divisores verticales con border-color. Sin action en sticky nav (no se necesitan divisores).

### Front-P66 — `text-blue-500` en "SOFT"
Línea 26: `class="text-blue-500"` (Tailwind utility). Sin Tailwind, se usa `.logo span { background: linear-gradient(...); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }` o se移植 el gradient a todo el logo.

### Front-P67 — `<a href="https://wa.me/523327633233" target="_blank">` con inline styles
Línea 63: gradient + shadow inline. CSS `.nav-cta-btn` con estilos coherentes.

### Front-P68 — `rounded-full` en múltiples elementos
Tailwind utility. CSS con `border-radius: 9999px` o `border-radius: 50%` (para círculos).

### Front-P69 — `hidden sm:inline-flex` y `hidden md:flex` en distintos elementos
Tailwind responsive utilities. CSS con `@media` queries.

---

## 8. Technical Debt

### TD-40 — Theme toggle残留 en `<script>` inline
Tras EPIC 01/PART 02, el bloque de theme toggle (líneas 850-867) ya fue eliminado. **Verificar:** `grep -c "theme-toggle" landing/index.html` debe retornar 0.

### TD-41 — `.nav-pill` y `.pill-nav-link`残留 en `Styles.css`
Tras este PART, las definiciones de `.nav-pill` y `.pill-nav-link` ya no se usan. **Acción:** eliminar del `Styles.css`.

### TD-42 — IDs `#mobile-menu-btn` y `#mobile-menu` se mantienen
Para compatibilidad con `<script>` inline actual (líneas 870-886). EPIC 09 los consolidará.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-124:** Reemplazar las **51 líneas** (17-67) del nav actual con la nueva estructura de sticky header (~45 líneas) — verificable con `(Get-Content landing/index.html)[16..66].Count` antes y después.
- **RI-125:** Preservar los **6 nav links** verbatim: Inicio, Servicios, Productos, Open Source, Nosotros, Contacto — verificable con `grep -E "(Inicio|Servicios|Productos|Open Source|Nosotros|Contacto)<" landing/index.html | wc -l` que retorna `≥ 6` (los mismos 6 aparecen en mobile menu también).
- **RI-126:** Preservar los **hrefs** de los 6 nav links: `#inicio`, `#servicios`, `#productos`, `#opensource`, `#nosotros`, `#contacto` — verificable con `grep -E 'href="#(inicio|servicios|productos|opensource|nosotros|contacto)"' landing/index.html | wc -l` que retorna `≥ 6`.
- **RI-127:** Preservar el **CTA "Contactar"** apuntando a `https://wa.me/523327633233` con `target="_blank"` — verificable con `grep -c 'href="https://wa.me/523327633233"' landing/index.html` que retorna `≥ 1` (también aparece en EPIC 07).
- **RI-128:** **ELIMINAR el theme toggle** completamente: botón `<button id="theme-toggle">` + icono `light_mode`/`dark_mode` + handler JS — verificable con `grep -c "theme-toggle" landing/index.html` que retorna `0` y `grep -c "data-theme" landing/index.html` que retorna `0`.
- **RI-129:** Implementar **hamburger con 3 spans animado a X** — verificable con `grep -c '<span></span>' landing/index.html` que retorna `≥ 3` (los 3 spans del hamburger).
- **RI-130:** Preservar **mobile menu** con los 6 links en columna — verificable con `grep -c 'id="mobile-menu"' landing/index.html` que retorna `1`.
- **RI-131:** Añadir `.nav-container`, `.logo`, `.nav-menu`, `.nav-link`, `.nav-cta-btn`, `.menu-toggle` al `Styles.css` — verificable con `grep -c "^\.(nav-|nav |logo)" landing/css/Styles.css` que retorna `≥ 5`.
- **RI-132:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` — verificable con `git diff --stat landing/REASP/ landing/RACSP/` vacío.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 17-67** (reemplazo total, 51 líneas → ~45 líneas):

```html
<!-- ══ NAVEGACIÓN · EPIC 08 PART 01 ═══════════════════════════════════════ -->
<header class="site-header">
  <div class="nav-container">
    <!-- Logo -->
    <a href="#inicio" class="logo">
      <div class="logo-icon">K</div>
      Keorsoft
    </a>

    <!-- Desktop nav -->
    <nav>
      <ul class="nav-menu" id="navMenu">
        <li><a href="#inicio" class="nav-link">Inicio</a></li>
        <li><a href="#servicios" class="nav-link">Servicios</a></li>
        <li><a href="#productos" class="nav-link">Productos</a></li>
        <li><a href="#opensource" class="nav-link">Open Source</a></li>
        <li><a href="#nosotros" class="nav-link">Nosotros</a></li>
        <li><a href="#contacto" class="nav-link">Contacto</a></li>
      </ul>
    </nav>

    <!-- CTA "Contactar" -->
    <a href="https://wa.me/523327633233" target="_blank" rel="noopener noreferrer" class="nav-cta-btn">Contactar</a>

    <!-- Hamburger (mobile) -->
    <div class="menu-toggle" id="menuToggle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</header>

<!-- (NOTA: el mobile menu dropdown actual con id="mobile-menu" se移植 a id="navMenu" 
     que aparece arriba en desktop y como dropdown en mobile via CSS. 
     Sin embargo, para compatibilidad con el script inline actual, 
     preservamos #mobile-menu-btn y #mobile-menu como elementos separados.) -->
```

**Decisión del planner:** mantener 2 elementos para mobile menu:
- `<ul class="nav-menu" id="navMenu">` — visible en desktop (horizontal).
- `<div id="mobile-menu" class="hidden ...">` con los 6 links en columna (dropdown mobile).

Esto preserva la compatibilidad con el `<script>` inline actual (líneas 870-886 que toggle `#mobile-menu.hidden`).

```html
<!-- Mobile menu dropdown (separado, para compatibilidad con script inline) -->
<div id="mobile-menu" class="hidden">
  <a href="#inicio" class="nav-link-mobile">Inicio</a>
  <a href="#servicios" class="nav-link-mobile">Servicios</a>
  <a href="#productos" class="nav-link-mobile">Productos</a>
  <a href="#opensource" class="nav-link-mobile">Open Source</a>
  <a href="#nosotros" class="nav-link-mobile">Nosotros</a>
  <a href="#contacto" class="nav-link-mobile">Contacto</a>
</div>
```

**Decisión simplificada:** dado que `<ul id="navMenu">` ya contiene los 6 links, podemos usarlos también para mobile con CSS. El `<div id="mobile-menu">` se移植 como elemento separado SOLO si el script inline lo requiere. **Verificación:** el script inline (líneas 870-886) usa `getElementById('mobile-menu')`. Si queremos mantener este script, necesitamos ese ID.

**Decisión final:** mantener AMBOS (`<ul id="navMenu">` para desktop + `<div id="mobile-menu">` para mobile) con duplicación de los 6 links. Es redundante pero garantiza compatibilidad con el script inline actual.

### 10.2 Bloque CSS a añadir al `Styles.css`

Bloque 8.AC (después del bloque 8.AB de EPIC 07):

```css
/* ============================================
   8.AC Header & Nav · EPIC 08 PART 01
   Sticky full-width header with backdrop-filter.
   Logo with gradient cyan→indigo.
   Nav links with animated underline.
   Mobile menu with hamburger animation.
   Theme toggle ELIMINATED (dark-only).
   ============================================ */

.site-header {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 100;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-light);
  background-color: rgba(5, 7, 10, 0.7);
  transition: var(--transition-smooth);
}

.nav-container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 30%, var(--accent-indigo) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-indigo));
  border-radius: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.logo-icon::before {
  content: 'K';
  font-family: var(--font-display);
  color: var(--bg-primary);
  font-weight: 800;
  font-size: 1.1rem;
}

.nav-menu {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-secondary);
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--accent-indigo));
  transition: var(--transition-smooth);
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  padding: 0.6rem 1.25rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-smooth);
  color: var(--text-primary);
  text-decoration: none;
}

.nav-cta-btn:hover {
  background: var(--text-primary);
  color: var(--bg-primary);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Hamburger (mobile) */
.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-toggle span {
  width: 24px;
  height: 2px;
  background-color: var(--text-primary);
  transition: var(--transition-smooth);
}

/* Mobile menu dropdown */
#mobile-menu {
  position: absolute;
  top: 100%;
  right: 2rem;
  margin-top: 0.5rem;
  width: 12rem;
  border-radius: 16px;
  border: 1px solid var(--border-light);
  background: rgba(11, 15, 23, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.nav-link-mobile {
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-link-mobile:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .nav-menu {
    display: none;
  }
  .menu-toggle {
    display: flex;
  }
  .nav-cta-btn {
    display: none;
  }
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem 1.5rem;
  }
}
```

### 10.3 Decisión sobre IDs

- Mantener `<button id="mobile-menu-btn">` (o equivalente) para compatibilidad con `<script>` inline.
- Mantener `<div id="mobile-menu">` para el dropdown mobile.
- El `<script>` inline (líneas 870-886) sigue funcionando sin cambios.

**Decisión alternativa:** reemplazar IDs con los del NEW (`#menuToggle`, `#navMenu`). Esto requeriría actualizar también el script inline. **Trade-off:** romper el script vs alinear con NEW. **Decisión del planner:** mantener IDs actuales para no romper nada. EPIC 09 consolida.

### 10.4 Eliminación de `.nav-pill` y `.pill-nav-link`

Tras este PART, eliminar del `Styles.css`:
- `.nav-pill` (líneas 106-114).
- `.pill-nav-link` (líneas 115-128).
- `.pill-nav-link:hover` (línea 124).
- `.pill-nav-link.active` (líneas 125-128).

### 10.5 Decisión sobre mayúsculas del logo

**Decisión del planner:** usar "Keorsoft" (lowercase) por consistencia con NEW. **Decisión alternativa:** el usuario puede solicitar "KEORSOFT" uppercase (estado actual).

---

## 11. Automated Test Plan

### AT-120 — Verificación de 6 nav links
- **Comando:** `grep -E ">(Inicio|Servicios|Productos|Open Source|Nosotros|Contacto)<" landing/index.html | wc -l`.
- **Pass criteria:** `≥ 6`.
- **Fallo:** `< 6`.

### AT-121 — Verificación de hrefs en nav links
- **Comando:** `grep -E 'href="#(inicio|servicios|productos|opensource|nosotros|contacto)"' landing/index.html | wc -l`.
- **Pass criteria:** `≥ 6` (desktop + mobile menu).
- **Fallo:** `< 6`.

### AT-122 — Verificación de CTA "Contactar"
- **Comando:** `grep -c 'href="https://wa.me/523327633233"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-123 — Verificación de eliminación de theme toggle
- **Comando:** `grep -c "theme-toggle" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

- **Comando 2:** `grep -c "data-theme" landing/index.html`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-124 — Verificación de hamburger con 3 spans
- **Comando:** `grep -c '<span></span>' landing/index.html`.
- **Pass criteria:** `≥ 3`.
- **Fallo:** `< 3`.

### AT-125 — Verificación de mobile menu preservado
- **Comando:** `grep -c 'id="mobile-menu"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-126 — Verificación de mobile-menu-btn preservado
- **Comando:** `grep -c 'id="mobile-menu-btn"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-127 — Verificación de `<header>` con sticky
- **Comando:** `grep -c '<header class="site-header"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-128 — Verificación de nuevas clases CSS
- **Comando:** `grep -c "^\.(nav-|site-header|menu-toggle|logo)" landing/css/Styles.css`.
- **Pass criteria:** `≥ 7` (site-header, nav-container, logo, logo-icon, nav-menu, nav-link, nav-cta-btn, menu-toggle).
- **Fallo:** `< 7`.

### AT-129 — Verificación de eliminación de `.nav-pill`
- **Comando:** `grep -c "nav-pill" landing/css/Styles.css`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0` (código muerto残留).

### AT-130 — Verificación de `.pill-nav-link`
- **Comando:** `grep -c "pill-nav-link" landing/css/Styles.css`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-131 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-179:** Abrir `landing/index.html` en Chrome 120+: el header es sticky en la parte superior, ocupa todo el ancho.
- [ ] **MV-180:** El header tiene backdrop-filter blur visible al hacer scroll.
- [ ] **MV-181:** El logo "Keorsoft" tiene gradiente (blanco→indigo) y la caja "K" tiene gradiente cyan→indigo.
- [ ] **MV-182:** Los 6 nav links están visibles en desktop horizontal.
- [ ] **MV-183:** Hover en nav link: color cambia a blanco + aparece underline gradiente (cyan→indigo).
- [ ] **MV-184:** El CTA "Contactar" es pill con border; hover cambia a fondo blanco con texto dark.
- [ ] **MV-185:** Click en CTA "Contactar" abre `https://wa.me/523327633233` en nueva pestaña.
- [ ] **MV-186:** **No hay theme toggle** en la nav.
- [ ] **MV-187:** Renderizar en DevTools > iPhone 12 Pro (390×844): los nav links desaparecen, aparece hamburger (3 spans horizontales).
- [ ] **MV-188:** Click en hamburger: el menú mobile aparece como dropdown con los 6 links.
- [ ] **MV-189:** Click en cualquier link del menú mobile: scroll suave a la sección Y el menú se cierra.
- [ ] **MV-190:** El script inline del mobile menu (líneas 870-886) sigue funcionando (IDs preservados).
- [ ] **MV-191:** DevTools > Console: 0 errores.
- [ ] **MV-192:** DevTools > Lighthouse: sin regresión vs EPIC 07.
- [ ] **MV-193:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-25 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ NAVEGACIÓN · EPIC 08 PART 01 ═══════════════════════════════════════ -->
<!-- Sticky header con backdrop-filter blur(16px) -->
<!-- Logo: caja 32×32 con gradiente cyan→indigo + texto "Keorsoft" gradient -->
<!-- 6 nav links con underline animado -->
<!-- Theme toggle ELIMINADO (dark-only) -->
<!-- Mobile menu: dropdown preservado (#mobile-menu) con IDs legacy -->
```

### TD-Output-26 — Documentación de IDs preservados

> Los IDs `#mobile-menu-btn` y `#mobile-menu` se mantienen idénticos para que el `<script>` inline del landing (líneas 870-886) siga funcionando sin cambios. EPIC 09 consolidará el handler del mobile menu en `js/main.js` con los nuevos IDs de NEW (`#menuToggle`, `#navMenu`).

---

## 14. User Documentation to produce

### UD-Output-22 — Mensaje de commit sugerido

```
feat(landing): rediseñar nav con sticky header glass-panel

- Pill nav flotante reemplazado por sticky <header> full-width.
- Logo: caja 32×32 con gradiente cyan→indigo + texto "Keorsoft".
- 6 nav links preservados (Inicio, Servicios, Productos,
  Open Source, Nosotros, Contacto).
- Nav links con underline animado (gradient cyan→indigo).
- CTA "Contactar" refactor a pill con border + hover blanco.
- Hamburger con 3 spans animado a X (mobile).
- Theme toggle ELIMINADO completamente (dark-only).
- Mobile menu #mobile-menu preservado para compatibilidad script.
- IDs #mobile-menu-btn y #mobile-menu intactos.

Refs: .refi/modules/keorsoft-landing-redesign/epics/08-footer-nav/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-146:** El `<header class="site-header">` reemplaza al `<nav>` pill flotante.
- **AC-147:** Los 6 nav links están presentes con sus hrefs verbatim.
- **AC-148:** El CTA "Contactar" apunta a `https://wa.me/523327633233` con `target="_blank"`.
- **AC-149:** Theme toggle ELIMINADO completamente (botón, icono, handler JS).
- **AC-150:** Hamburger con 3 spans visible en mobile (< 1024px).
- **AC-151:** Mobile menu `#mobile-menu` con 6 links en columna visible al click en hamburger.
- **AC-152:** El script inline del mobile menu (líneas 870-886) sigue funcionando.
- **AC-153:** Logo tiene gradiente cyan→indigo en la caja "K".
- **AC-154:** Hover en nav link aparece underline gradiente.
- **AC-155:** Hover en CTA "Contactar" cambia a fondo blanco + translateY -2px.
- **AC-156:** El `Styles.css` contiene las clases `.site-header`, `.nav-container`, `.logo`, `.logo-icon`, `.nav-menu`, `.nav-link`, `.nav-cta-btn`, `.menu-toggle`.
- **AC-157:** `.nav-pill` y `.pill-nav-link` eliminados del `Styles.css` (código muerto).
- **AC-158:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-159:** DevTools > Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- **AC-160:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Sticky header coherente con NEW. Logo con gradiente cyan→indigo. Theme toggle correctamente eliminado. IDs preservados para compatibilidad.
- [ ] **Gate 2 — Scope & Completeness Audit:** 6 nav links verbatim. CTA "Contactar" preservado. Hamburger con 3 spans. Mobile menu preservado. Clases CSS移植.
- [ ] **Gate 3 — UX/Design Review:** UX-P55 a UX-P59 resueltos según §5. Underline animado coherente. Logo refactor sin perder identidad.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Mobile menu funciona.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes. IDs preservados documentados.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 15 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________