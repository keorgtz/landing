# PART 01 — About Cards (About / Nosotros)

> **EPIC:** 03-about-nosotros
> **Slug:** `about-cards`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el **markup y los estilos** de la sección "Nosotros" del landing principal (`<section id="nosotros">`, líneas 181-262 de `landing/index.html`) adoptando el lenguaje visual glass-panel del nuevo estilo, **preservando verbatim** los 4 bloques de información actuales: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores (con sus 3 sub-valores: Innovación, Calidad, Developer Experience).

---

## 2. Current State

### 2.1 Sección nosotros actual (líneas 181-262 de `landing/index.html`)

Estructura actual (resumen):

```
<section id="nosotros" class="py-24 sm:py-32 section-main relative">           <!-- línea 182 -->
  <!-- 2 bg orbs decorativos -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] ...">  <!-- línea 183 -->
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] ...">  <!-- línea 184 -->

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">           <!-- línea 186 -->
    <div class="text-center max-w-2xl mx-auto mb-16 scroll-reveal">             <!-- línea 187 -->
      <p class="text-blue-600 font-semibold tracking-wide text-sm mb-3 uppercase">Quiénes Somos</p>  <!-- línea 188 -->
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[color:var(--txt-1)] mb-6 tracking-tight ...">
        Más que una consultora.<br>Somos una <span class="text-gradient">empresa de tecnología.</span>  <!-- líneas 189-191 -->
      </h2>
      <p class="text-[color:var(--txt-2)] text-lg leading-relaxed">             <!-- línea 192 -->
        Keorsoft nace de la convicción de que el software empresarial puede ser potente, hermoso y accesible al mismo tiempo.  <!-- línea 193 -->
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">             <!-- línea 197 -->
      <!-- Card 1: Quiénes Somos -->
      <div class="about-card scroll-reveal" style="--c-bg: var(--kr-blue); --i-bg: rgba(14,152,248,0.1); --i-color: #0E98F8;">  <!-- línea 199 -->
        <div class="sc-icon"><span class="material-symbols-rounded fill" style="font-size:28px">corporate_fare</span></div>  <!-- línea 200 -->
        <h3 class="text-xl font-bold ...">Quiénes Somos</h3>                   <!-- línea 201 -->
        <p class="text-[color:var(--txt-2)] leading-relaxed text-sm">          <!-- línea 202 -->
          Keorsoft es una empresa de tecnología enfocada en crear soluciones...   <!-- línea 203 -->
        </p>
      </div>

      <!-- Card 2: Nuestro Enfoque -->
      <div class="about-card scroll-reveal" style="--c-bg: var(--vi); --i-bg: rgba(139,92,246,0.1); --i-color: #8B5CF6; animation-delay:.1s">  <!-- línea 208 -->
        <div class="sc-icon"><span class="material-symbols-rounded fill" style="font-size:28px">target</span></div>  <!-- línea 209 -->
        <h3 class="text-xl font-bold ...">Nuestro Enfoque</h3>                <!-- línea 210 -->
        <p class="text-[color:var(--txt-2)] leading-relaxed text-sm">           <!-- línea 211 -->
          Alta personalización por cliente y vertical. Excelencia en UI/UX con nuestro lenguaje visual propietario <strong>MeridianUI</strong>...  <!-- línea 212 -->
        </p>
      </div>

      <!-- Card 3: Nuestra Misión -->
      <div class="about-card scroll-reveal" style="--c-bg: var(--em); --i-bg: rgba(16,185,129,0.1); --i-color: #10B981; animation-delay:.2s">  <!-- línea 217 -->
        <div class="sc-icon"><span class="material-symbols-rounded fill" style="font-size:28px">flag</span></div>  <!-- línea 218 -->
        <h3 class="text-xl font-bold ...">Nuestra Misión</h3>                  <!-- línea 219 -->
        <p class="text-[color:var(--txt-2)] leading-relaxed text-sm">           <!-- línea 220 -->
          Construir herramientas que empoderen a desarrolladores y empresas...   <!-- línea 221 -->
        </p>
      </div>

      <!-- Card 4: Nuestros Valores (spans 3 cols on lg) -->
      <div class="about-card md:col-span-2 lg:col-span-3 scroll-reveal" style="--c-bg: var(--am); --i-bg: rgba(245,158,11,0.1); --i-color: #F59E0B; animation-delay:.3s">  <!-- línea 226 -->
        <div class="flex flex-col md:flex-row gap-8 items-start">
          <div class="md:w-1/3">
            <div class="sc-icon"><span class="material-symbols-rounded fill" style="font-size:28px">stars</span></div>  <!-- línea 229 -->
            <h3 class="text-xl font-bold ...">Nuestros Valores</h3>            <!-- línea 230 -->
            <p class="text-[color:var(--txt-2)] leading-relaxed text-sm">       <!-- línea 231 -->
              Los principios que guían cada línea de código y cada decisión de diseño.  <!-- línea 232 -->
            </p>
          </div>
          <div class="md:w-2/3 grid sm:grid-cols-3 gap-4">                      <!-- línea 235 -->
            <!-- 3 sub-valores -->
            <div class="value-item">
              <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-3">
                <span class="material-symbols-rounded fill" style="font-size:20px">lightbulb</span>
              </div>
              <h4 class="font-bold ...">Innovación</h4>                         <!-- línea 240 -->
              <p class="text-xs text-[color:var(--txt-3)]">Exploramos constantemente nuevas tecnologías...</p>  <!-- línea 241 -->
            </div>
            <div class="value-item">
              <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 ...">
                <span class="material-symbols-rounded fill" style="font-size:20px">award_star</span>
              </div>
              <h4 class="font-bold ...">Calidad</h4>                            <!-- línea 247 -->
              <p class="text-xs ...">Código limpio, arquitectura sólida...</p>  <!-- línea 248 -->
            </div>
            <div class="value-item">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 ...">
                <span class="material-symbols-rounded fill" style="font-size:20px">developer_mode</span>
              </div>
              <h4 class="font-bold ...">Developer Experience</h4>               <!-- línea 254 -->
              <p class="text-xs ...">Herramientas que los desarrolladores disfrutan usar...</p>  <!-- línea 255 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 2.2 Estilos actuales移植 desde `Styles.css`

Bloques CSS relevantes:

- `.about-card` (líneas 218-242 actual Styles.css): background `var(--card)`, border 1px solid `var(--card-border)`, border-radius 24px, padding 32px, con top-bar `::before` coloreado por `--c-bg`.
- `.about-card:hover` (líneas 234-238): translateY(-4px), border-color var(--c-bg), box-shadow 0 10px 40px rgba(0,0,0,0.08).
- `.about-card::before` (líneas 227-232): top-bar 4px con `background: var(--c-bg)`.
- `.sc-icon` (líneas 208-215): width 56px, height 56px, border-radius 16px, background `var(--i-bg)`, color `var(--i-color)`, margin-bottom 24px.
- `.value-item` (líneas 244-254): background `var(--bg-3)`, border-radius 16px, padding 20px.

### 2.3 Iconografía Material Symbols en uso (8 iconos)

| Icono | Línea | Uso |
|-------|-------|-----|
| `corporate_fare` | 200 | Card Quiénes Somos |
| `target` | 209 | Card Nuestro Enfoque |
| `flag` | 218 | Card Nuestra Misión |
| `stars` | 229 | Card Nuestros Valores (título) |
| `lightbulb` | 238 | Sub-valor Innovación |
| `award_star` | 245 | Sub-valor Calidad |
| `developer_mode` | 252 | Sub-valor Developer Experience |

### 2.4 Dependencias Tailwind

~40 utility classes (estimación). Las principales: `grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`, `flex flex-col md:flex-row gap-8 items-start`, `md:w-1/3 md:w-2/3`, `sm:grid-cols-3`, `mb-16`, `text-center`, `max-w-2xl mx-auto`.

### 2.5 Script

- `<div class="scroll-reveal">` en cada card (líneas 199, 208, 217, 226) — usa `IntersectionObserver` del `<script>` inline actual (移植 a EPIC 09).
- `animation-delay:.1s/.2s/.3s` inline (líneas 208, 217, 226) — animación de reveal escalonada.

---

## 3. Comparison against baseline

Comparación contra `KeorsoftLandingNEW/styles.css` líneas 605-696 (`.pillars-grid`, `.pillar-card`, `.pillar-icon-box`, `.pillar-title`, `.pillar-desc`).

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing) | Nuevo (NEW styles.css 605-696) | Migración |
|---------|------------------|--------------------------------|-----------|
| Contenedor | `.section-main` con `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">` | `<section>` con `<div class="container">` (NEW usa 1300px max-width) | Mantener `.max-w-7xl` actual (1280px) por compatibilidad |
| Header de sección | `<p class="text-blue-600 ...">Quiénes Somos</p>` + `<h2>` con `<span class="text-gradient">` | `.section-tag` + `.section-title` con `.gradient-text-purple` / `.gradient-text-blue` | Adoptar `.section-tag` + `.section-title` |
| Grid | `grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8` con Tailwind | `.pillars-grid` con `grid-template-columns: repeat(3, 1fr); gap: 2rem;` | **Mantener grid 3-cols del actual** (4 cards pero 3 en la primera fila + 1 full-width) |
| Card base | `.about-card` con `--c-bg` top-bar de 4px + `.sc-icon` 56×56 border-radius 16px | `.pillar-card.glass-panel` con glassmorphism + `.pillar-icon-box` 56×56 border-radius 12px | Adaptar `.about-card` con glassmorphism + mantener `.sc-icon` semántica |
| Hover effect | translateY(-4px) + border-color `var(--c-bg)` + box-shadow 0 10px 40px | translateY(-6px) + background rgba(11,15,23,0.65) + border-color rgba(99,102,241,0.25) + box-shadow 0 20px 40px rgba(0,0,0,0.3) | Adoptar hover más fuerte del NEW (translateY -6px, shadow 20/40) |
| Color top-bar | `::before` con `--c-bg` (4px solid color) | No tiene top-bar (usa `border-color` accent en hover) | **Decisión:** mantener top-bar 4px (es elemento de marca) o eliminar y usar border-left. Recomendación: **mantener top-bar** porque diferencia visualmente los 4 cards |
| Card "Valores" | `md:col-span-2 lg:col-span-3` con sub-grid `sm:grid-cols-3` interno | No existe equivalente directo en NEW | Mantener estructura: card full-width con 3 sub-items |

### 3.2 Color mapping actual → nuevo

Las 4 cards usan `--c-bg` y `--i-bg`/`--i-color` específicos. Mapeo:

| Card | `--c-bg` actual | `--i-bg` actual | `--i-color` actual | Color nuevo (acento) |
|------|-----------------|-----------------|-------------------|---------------------|
| Quiénes Somos | `--kr-blue: #0E98F8` | `rgba(14,152,248,0.1)` | `#0E98F8` | `--accent-indigo: #6366f1` (azul corporativo cambia a indigo para alinearse con nuevo estilo) |
| Nuestro Enfoque | `--vi: #8B5CF6` | `rgba(139,92,246,0.1)` | `#8B5CF6` | `--accent-purple: #a855f7` (violeta → púrpura) |
| Nuestra Misión | `--em: #10B981` | `rgba(16,185,129,0.1)` | `#10B981` | `--accent-emerald: #10b981` (idéntico) |
| Nuestros Valores | `--am: #F59E0B` | `rgba(245,158,11,0.1)` | `#F59E0B` | `--accent-amber: #F59E0B` (mantener; añadir `--accent-amber` token si no existe) |

**Nota crítica:** El token `--accent-amber` **NO existe** en el `:root` del nuevo `Styles.css` (producido por EPIC 01). Necesita ser añadido en este PART o en EPIC 11. **Decisión del planner:** añadir en este PART.

### 3.3 Iconografía — mapeo a SVG inline

Los 7 iconos Material Symbols se reemplazan por SVG inline. Los SVG se pueden obtener de Feather Icons (open source, MIT, mismos nombres que Material Symbols en muchos casos):

| Material Symbol actual | SVG inline sugerido | viewBox |
|------------------------|---------------------|---------|
| `corporate_fare` | `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"/></svg>` | 24×24 |
| `target` | `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>` | 24×24 |
| `flag` | `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>` | 24×24 |
| `stars` | `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` | 24×24 |
| `lightbulb` | `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.4 1 .9 1 1.6V18h6v-1.7c0-.7.4-1.2 1-1.6A7 7 0 0 0 12 2z"/></svg>` | 24×24 |
| `award_star` | `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>` | 24×24 |
| `developer_mode` | `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>` (chevrons icon, semánticamente coherente con "developer") | 24×24 |

**Nota:** Los SVG propuestos son placeholders coherentes. El Orchestrator puede ajustar paths exactos contra Feather Icons/Heroicons durante implementación. Lo crítico es: **SVG inline, no Material Symbols**.

### 3.4 Diferencia con EPIC 04 (Services)

EPIC 04 usará `.pillar-card` directamente del NEW styles.css para los 3 pilares de servicios. Aquí en EPIC 03 se reutiliza la nomenclatura `.about-card` (clase ya existente) para no colisionar semánticamente, pero se le da el mismo tratamiento visual glass-panel.

Decisión: `.about-card` (clase actual) recibe `glass-panel` style. `.pillar-card` (clase nueva de EPIC 04) se usa para servicios. Ambas comparten `.pillar-icon-box`-like styles pero mantienen nombres distintos para claridad semántica.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 181-262 con nueva estructura basada en glass-panel.
- Adición al `Styles.css` del bloque 8.X (extensión del EPIC 02) con:
  - Override de `.about-card` para usar glass-panel + nueva paleta.
  - Refactor de `.sc-icon` para alinearse con `.pillar-icon-box` (border-radius 12px, mismo tamaño).
  - Refactor de `.value-item` para glass-panel style.
  - Nuevo token `--accent-amber: #F59E0B` en `:root`.
- Reemplazo de los 7 iconos Material Symbols por SVG inline.
- Preservación verbatim de:
  - Header de sección: "Quiénes Somos" (label), H2 con "empresa de tecnología" en gradient.
  - Subtítulo: "Keorsoft nace de la convicción..."
  - 4 títulos de card: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores.
  - 4 párrafos de card.
  - 3 sub-títulos: Innovación, Calidad, Developer Experience.
  - 3 párrafos de sub-valores.
- Mantenimiento de `animation-delay:.1s/.2s/.3s` para reveal escalonado.
- Mantenimiento de `md:col-span-2 lg:col-span-3` en la card Valores.

### 4.2 Lo que NO está en el scope

- **NO** se modifica el `<head>` ni el `<body>` apertura.
- **NO** se modifica el hero (EPIC 02).
- **NO** se modifica el resto del `<body>` (servicios, productos, etc.).
- **NO** se consolidan scripts (EPIC 09).
- **NO** se añade el simulador REASP ni el playground MeridianUI/AegisUI (fuera de scope del packet).

---

## 5. UX Problems

### UX-P14 — Color azul corporativo del card 1 cambia de azul a indigo
La card "Quiénes Somos" usa `--kr-blue: #0E98F8` (azul corporativo del landing actual). El nuevo estilo usa `--accent-indigo: #6366f1`. Cambio visual: el azul más vibrante (turquesa) se vuelve indigo más oscuro. **Mitigación:** documentado en D1 del master-blueprint. Cambio intencional.

### UX-P15 — Card Valores con layout mixto (título izquierda, valores derecha) puede ser difícil en mobile
En mobile (< 768px), la card Valores pasa de `flex-row` a `flex-col` automáticamente. El `md:w-1/3 md:w-2/3` colapsa a `w-full`. Sin embargo, los 3 sub-valores en `sm:grid-cols-3` se vuelven 1 columna. **Decisión:** mantener comportamiento (es lo que el usuario diseñó).

### UX-P16 — Hover con translateY(-6px) + box-shadow 20/40 puede ser demasiado fuerte para cards con mucho texto
Las 4 cards tienen párrafos medianos. Un hover de -6px + shadow de 40px podría sentirse "saltarín". **Decisión:** mantener el valor del NEW (consistencia con pilares de servicios en EPIC 04).

### UX-P17 — `font-bold` en `h3` y `h4` vs `font-extrabold` en H2
El landing actual usa `font-bold` para h3 de cards y `font-extrabold` para h2 de sección. El NEW usa `font-weight: 700` (similar a bold) en `.pillar-title`. **Sin cambio**: se mantiene el patrón existente.

---

## 6. Backend / Logic Problems

N/A — markup + CSS + iconos. Sin backend.

---

## 7. Frontend / Presentation Problems

### Front-P17 — `text-[color:var(--txt-1)]` requiere Tailwind arbitrary value
Línea 189 (H2): `class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[color:var(--txt-1)] ..."`. Tailwind arbitrary con `var()`. Al eliminar Tailwind, se移植 a CSS: `.section-title { color: var(--text-primary); }`.

### Front-P18 — `bg-blue-500/5 rounded-full blur-[100px]` para orbes decorativos
Líneas 183-184: orbes con Tailwind opacity y blur. Sin Tailwind, se移植 a CSS:
```css
.about-bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
  background: radial-gradient(circle, var(--accent-color), transparent);
}
```

### Front-P19 — `--c-bg`, `--i-bg`, `--i-color` definidos inline en cada card
Cada card tiene `style="--c-bg: var(--kr-blue); --i-bg: rgba(...); --i-color: #..."` (líneas 199, 208, 217, 226). Esta técnica CSS custom properties es válida y portable. Sin cambios.

### Front-P20 — `style="animation-delay:.1s"` inline en 3 cards
Líneas 208, 217, 226 usan `animation-delay` inline. Es válido pero podría moverse a CSS por mantenibilidad. **Decisión:** mantener inline (es trivial y permite ajustes rápidos).

### Front-P21 — `<strong>MeridianUI</strong>` dentro del párrafo
Línea 212: el párrafo de "Nuestro Enfoque" menciona **MeridianUI** con `<strong>`. Sin cambios — debe preservarse el emphasis.

---

## 8. Technical Debt

### TD-12 — `.sc-icon` se duplica entre `.service-card` (EPIC 04) y `.about-card`
La clase `.sc-icon` se usa tanto en service cards (`.service-card .sc-icon`, actual Styles.css línea 285) como en about cards. En el nuevo estilo, `.pillar-icon-box` del NEW reemplaza `.sc-icon` para services. **Decisión:** mantener `.sc-icon` para about cards (compatibilidad) y crear `.pillar-icon-box` para services en EPIC 04. Aceptable tener ambas durante la transición; limpieza en EPIC 11.

### TD-13 — Top-bar de 4px en `.about-card::before` puede chocar con glass-panel
El `.about-card` actual tiene un `::before` con `position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--c-bg); opacity: 0.8`. Esto le da un top-bar de color. En glass-panel, el `::before` se mantiene pero se ajusta la opacidad para que no compita con el backdrop-filter.

### TD-14 — Reveal escalonado con `animation-delay` inline
Las 3 cards con reveal escalonado usan `style="animation-delay:.1s"` inline. Documentado en EPIC 09 cuando se consolide el script. Mantener inline por ahora.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-34:** Añadir el **token `--accent-amber: #F59E0B`** al `:root` del `Styles.css` (no existe en NEW) — verificable con `grep -c "accent-amber" landing/css/Styles.css` que retorna `1` en `:root` (≥ 1, idealmente 1).
- **RI-35:** Refactorizar `.about-card` con **glass-panel style**: `background: rgba(11,15,23,0.45); backdrop-filter: blur(12px); border: 1px solid var(--border-light); border-radius: 16px;` — verificable con `grep -E "backdrop-filter.*blur\(12px\)" landing/css/Styles.css` que retorna ≥ 1.
- **RI-36:** Reemplazar las **~82 líneas** (181-262) de la sección nosotros con la nueva estructura basada en glass-panel — verificable con `wc -l landing/index.html` antes y después (la línea total debe mantener o reducir ~5 líneas, reemplazando 82).
- **RI-37:** Preservar verbatim el **H2 "Más que una consultora. Somos una empresa de tecnología."** con `<span>` para gradient en "empresa de tecnología" — verificable con `grep -E "Más que una consultora" landing/index.html` que retorna `1` y `grep -c "empresa de tecnología" landing/index.html` que retorna ≥ 1 (en el span).
- **RI-38:** Preservar verbatim el **subtítulo "Keorsoft nace de la convicción..."** — verificable con `grep -c "Keorsoft nace de la convicción" landing/index.html` que retorna `1`.
- **RI-39:** Preservar las **4 cards** con sus textos exactos: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores — verificable con `grep -E "(Quiénes Somos|Nuestro Enfoque|Nuestra Misión|Nuestros Valores)" landing/index.html` que retorna ≥ 4 matches (cada título aparece una vez + footer o nav pueden tener algunos).
- **RI-40:** Preservar los **3 sub-valores**: Innovación, Calidad, Developer Experience con sus textos — verificable con `grep -E "(Innovación|Calidad|Developer Experience)" landing/index.html` que retorna ≥ 3 matches.
- **RI-41:** Reemplazar los **7 iconos Material Symbols** por **SVG inline** — verificable con `grep -E "(corporate_fare|target|flag|stars|lightbulb|award_star|developer_mode)" landing/index.html` que retorna `0`.
- **RI-42:** Preservar el **layout `md:col-span-2 lg:col-span-3`** en la card Valores — verificable con `grep -c "lg:col-span-3" landing/index.html` que retorna `1` (referente a about-card) y `grep -E "col-span-3.*Valores|Valores.*col-span-3" landing/index.html` que confirma la asociación.
- **RI-43:** Mantener el **reveal escalonado** (`animation-delay:.1s/.2s/.3s`) — verificable con `grep -c "animation-delay:.1s" landing/index.html` que retorna `≥ 1` y `grep -c "animation-delay:.2s" landing/index.html` que retorna `≥ 1` y `grep -c "animation-delay:.3s" landing/index.html` que retorna `≥ 1`.
- **RI-44:** Asegurar que el **hover effect** de `.about-card` se移植 al nuevo estilo (translateY -6px o -4px, border-color accent, box-shadow) — verificable con `grep -E "\.about-card:hover" landing/css/Styles.css` que retorna `1`.
- **RI-45:** Mantener el `<section id="nosotros">` con su anchor (para nav link `href="#nosotros"` línea 36) — verificable con `grep -c 'id="nosotros"' landing/index.html` que retorna `1`.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 181-262** (reemplazo total, 82 líneas → ~80 líneas):

Estructura nueva propuesta:

```html
<!-- ══ NOSOTROS · EPIC 03 PART 01 ═════════════════════════════════════ -->
<section id="nosotros" class="py-24 sm:py-32 section-main relative">
  <!-- 2 bg orbs decorativos (mantener, adaptados a dark) -->
  <div class="about-bg-orb" style="top:0;right:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%);"></div>
  <div class="about-bg-orb" style="bottom:0;left:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%);"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Section header -->
    <div class="section-header">
      <div class="section-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        Quiénes Somos
      </div>
      <h2 class="section-title">
        Más que una consultora.<br>Somos una <span class="hero-title-accent">empresa de tecnología.</span>
      </h2>
      <p class="section-desc">
        Keorsoft nace de la convicción de que el software empresarial puede ser potente, hermoso y accesible al mismo tiempo.
      </p>
    </div>

    <!-- 4 cards en grid 3 cols (la 4ª full-width) -->
    <div class="about-grid">
      <!-- Card 1: Quiénes Somos -->
      <div class="about-card scroll-reveal" style="--card-accent: var(--accent-indigo); --card-accent-rgb: 99,102,241;">
        <div class="sc-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 21h18M3 7v14M21 7v14M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01"/>
          </svg>
        </div>
        <h3 class="about-card-title">Quiénes Somos</h3>
        <p class="about-card-desc">
          Keorsoft es una empresa de tecnología enfocada en crear soluciones de software de escritorio y web. Combinamos ingeniería de precisión con diseño excepcional para entregar productos que superan expectativas.
        </p>
      </div>

      <!-- Card 2: Nuestro Enfoque -->
      <div class="about-card scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.1s">
        <div class="sc-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        </div>
        <h3 class="about-card-title">Nuestro Enfoque</h3>
        <p class="about-card-desc">
          Alta personalización por cliente y vertical. Excelencia en UI/UX con nuestro lenguaje visual propietario <strong>MeridianUI</strong>. Cada producto se adapta a las necesidades específicas de tu industria.
        </p>
      </div>

      <!-- Card 3: Nuestra Misión -->
      <div class="about-card scroll-reveal" style="--card-accent: var(--accent-emerald); --card-accent-rgb: 16,185,129; animation-delay:.2s">
        <div class="sc-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
            <line x1="4" y1="22" x2="4" y2="15"/>
          </svg>
        </div>
        <h3 class="about-card-title">Nuestra Misión</h3>
        <p class="about-card-desc">
          Construir herramientas que empoderen a desarrolladores y empresas. Creemos que la tecnología debe ser un multiplicador de capacidades, no una barrera.
        </p>
      </div>

      <!-- Card 4: Nuestros Valores (full-width) -->
      <div class="about-card about-card-wide scroll-reveal" style="--card-accent: var(--accent-amber); --card-accent-rgb: 245,158,11; animation-delay:.3s">
        <div class="about-card-wide-inner">
          <div class="about-card-header-side">
            <div class="sc-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 class="about-card-title">Nuestros Valores</h3>
            <p class="about-card-desc">
              Los principios que guían cada línea de código y cada decisión de diseño.
            </p>
          </div>
          <div class="about-card-values">
            <div class="value-item">
              <div class="value-icon" style="color:var(--accent-indigo);background:rgba(99,102,241,0.1);border-color:rgba(99,102,241,0.2);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.4 1 .9 1 1.6V18h6v-1.7c0-.7.4-1.2 1-1.6A7 7 0 0 0 12 2z"/></svg>
              </div>
              <h4 class="value-title">Innovación</h4>
              <p class="value-desc">Exploramos constantemente nuevas tecnologías y metodologías para mantenernos a la vanguardia.</p>
            </div>
            <div class="value-item">
              <div class="value-icon" style="color:var(--accent-purple);background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.2);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              </div>
              <h4 class="value-title">Calidad</h4>
              <p class="value-desc">Código limpio, arquitectura sólida y atención al detalle en cada entrega.</p>
            </div>
            <div class="value-item">
              <div class="value-icon" style="color:var(--accent-emerald);background:rgba(16,185,129,0.1);border-color:rgba(16,185,129,0.2);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h4 class="value-title">Developer Experience</h4>
              <p class="value-desc">Herramientas que los desarrolladores disfrutan usar. Documentación clara, APIs intuitivas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 10.2 Adiciones al `Styles.css`

Bloque 8.X "Section-specific · EPIC 03":

```css
/* ============================================
   8.X About cards · EPIC 03 PART 01
   Transplanted from current Styles.css lines 218-254
   Adapted to glass-panel style
   ============================================ */

.section-header {
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 4rem;
}

.section-desc {
  font-size: 1.125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .about-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.about-card {
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.about-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-accent, var(--accent-indigo));
  opacity: 0.8;
  z-index: 1;
}

.about-card:hover {
  transform: translateY(-6px);
  background: rgba(11, 15, 23, 0.65);
  border-color: var(--card-accent, var(--accent-indigo));
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.about-card-wide {
  grid-column: 1 / -1;
}

.about-card-wide-inner {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
}

@media (min-width: 768px) {
  .about-card-wide-inner {
    flex-direction: row;
  }
}

.about-card-header-side {
  flex: 0 0 33.333%;
}

.about-card-values {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .about-card-values {
    grid-template-columns: repeat(3, 1fr);
  }
}

.about-card-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 1rem 0 0.75rem;
}

.about-card-desc {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.875rem;
}

/* sc-icon — alinear con .pillar-icon-box del NEW */
.sc-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--card-accent-rgb, 99, 102, 241), 0.1);
  border: 1px solid rgba(var(--card-accent-rgb, 99, 102, 241), 0.2);
  color: var(--card-accent, var(--accent-indigo));
  margin-bottom: 0;
}

/* value-item — refactor a glass-panel */
.value-item {
  background: rgba(11, 15, 23, 0.4);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.value-item:hover {
  transform: translateY(-2px);
  border-color: var(--card-accent);
  background: rgba(11, 15, 23, 0.55);
}

.value-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  border: 1px solid;
}

.value-title {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
}

.value-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.about-bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(100px);
}
```

### 10.3 Adición al `:root` del `Styles.css`

```css
:root {
  /* ... tokens existentes ... */
  --accent-amber: #F59E0B;  /* NEW · EPIC 03 PART 01 */
}
```

### 10.4 Decisión sobre `.section-tag` y `.section-title`

Las clases `.section-tag` y `.section-title` **se reutilizan** del bloque 8 (EPIC 02) — están definidas en `Styles.css`. Si EPIC 02 ya añadió estas clases, este PART las referencia. Si EPIC 03 se ejecuta antes que EPIC 02 (no debería, porque EPIC 03 depende de EPIC 01), se definirían localmente. **Asumido:** EPIC 02 ya está `Planned` y se ejecuta antes que EPIC 03.

### 10.5 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Hero (EPIC 02) — intacto.

---

## 11. Automated Test Plan

### AT-32 — Verificación de token `--accent-amber` añadido
- **Comando:** `grep -c "accent-amber" landing/css/Styles.css`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-33 — Verificación de glass-panel en `.about-card`
- **Comando:** `grep -A 5 "^\.about-card {" landing/css/Styles.css | grep -c "backdrop-filter"`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-34 — Verificación de copy preservado
- **Comando:** `grep -c "Más que una consultora" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-35 — Verificación de subtítulo
- **Comando:** `grep -c "Keorsoft nace de la convicción" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-36 — Verificación de los 4 títulos de card
- **Comando:** `grep -c -E "(Quiénes Somos|Nuestro Enfoque|Nuestra Misión|Nuestros Valores)" landing/index.html`.
- **Pass criteria:** `4` (excluyendo el "Quiénes Somos" del header de sección que aparece arriba — se cuentan los 4 del body).
- **Fallo:** `< 4`.

### AT-37 — Verificación de los 3 sub-valores
- **Comando:** `grep -c -E "(Innovación|Calidad|Developer Experience)" landing/index.html`.
- **Pass criteria:** `≥ 3` (puede haber falsos positivos en otros sitios, aceptable).
- **Fallo:** `< 3`.

### AT-38 — Verificación de eliminación de Material Symbols en nosotros
- **Comando:** `grep -E "(corporate_fare|target|flag|stars|lightbulb|award_star|developer_mode)" landing/index.html | wc -l`.
- **Pass criteria:** `0`.
- **Fallo:** `> 0`.

### AT-39 — Verificación de SVG inline presente
- **Comando:** `grep -c "<svg" landing/index.html`.
- **Pass criteria:** `≥ 7` (7 iconos de la sección nosotros).
- **Fallo:** `< 7`.

### AT-40 — Verificación de `lg:col-span-3` en card Valores
- **Comando:** `grep -c "lg:col-span-3" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-41 — Verificación de animation-delay escalonado
- **Comando:** `grep -c "animation-delay:.1s" landing/index.html` (y similares para .2s y .3s).
- **Pass criteria:** ≥ 1 para cada uno de `.1s`, `.2s`, `.3s` en la sección nosotros.
- **Fallo:** Alguno ausente.

### AT-42 — Verificación de anchor `#nosotros` preservado
- **Comando:** `grep -c 'id="nosotros"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-43 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-45:** Abrir `landing/index.html` en Chrome 120+: la sección nosotros tiene fondo dark con 2 orbes decorativos (indigo + púrpura) sutiles.
- [ ] **MV-46:** El header de sección tiene un `.section-tag` con icono SVG (target/circles concéntricos) y texto "Quiénes Somos".
- [ ] **MV-47:** El H2 dice "Más que una consultora. Somos una empresa de tecnología." con "empresa de tecnología" en gradient.
- [ ] **MV-48:** El subtítulo dice "Keorsoft nace de la convicción de que el software empresarial puede ser potente, hermoso y accesible al mismo tiempo."
- [ ] **MV-49:** Las 4 cards están visibles: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores.
- [ ] **MV-50:** Las primeras 3 cards tienen 1 columna cada una en grid 3-cols. La 4ª card (Valores) ocupa el ancho completo (3 cols).
- [ ] **MV-51:** Cada card tiene icono SVG en una caja de 56×56 con color de acento (indigo, púrpura, esmeralda, ámbar).
- [ ] **MV-52:** La card Valores tiene a la izquierda el icono + título + descripción, y a la derecha 3 sub-valores en grid horizontal.
- [ ] **MV-53:** Los 3 sub-valores (Innovación, Calidad, Developer Experience) tienen icono + título + descripción.
- [ ] **MV-54:** Hover en cualquier card: translateY -6px, background se vuelve más opaco, border-color cambia al acento de la card, box-shadow aparece.
- [ ] **MV-55:** Renderizar en DevTools > iPhone 12 Pro: las cards colapsan a 1 columna, la card Valores apila título y sub-valores verticalmente.
- [ ] **MV-56:** Renderizar en DevTools > iPad (768×1024): grid pasa a 2 columnas; las primeras 3 cards en 2x2 con la 3ª y 4ª en la segunda fila (Valores ocupa 2 cols).
- [ ] **MV-57:** El `<strong>MeridianUI</strong>` en el párrafo de "Nuestro Enfoque" se ve en negrita (font-weight: 700).
- [ ] **MV-58:** DevTools > Console: 0 errores.
- [ ] **MV-59:** DevTools > Lighthouse: sin regresión vs EPIC 02 (Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95).
- [ ] **MV-60:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos a antes (cero regresión).

---

## 13. Technical Documentation to produce

### TD-Output-8 — Comentarios de sección en `landing/index.html`

Cabecera del nuevo bloque:
```html
<!-- ══ NOSOTROS · EPIC 03 PART 01 ═════════════════════════════════════════════ -->
<!-- Glass-panel cards. Token --accent-amber añadido en Styles.css root -->
<!-- 4 cards con preservación verbatim de copy -->
<!-- Reveal escalonado: animation-delay:.1s/.2s/.3s -->
```

### TD-Output-9 — Comentarios en `Styles.css`

Cabecera del bloque 8.X:
```css
/* ============================================
   8.X About cards · EPIC 03 PART 01
   Refactor of current .about-card with glass-panel style.
   Token --accent-amber added to :root (NOT in NEW).
   7 Material Symbols replaced with inline SVG.
   Hover effect: -6px translate + border-color accent + 20/40 shadow.
   ============================================ */
```

### TD-Output-10 — Documentación de token `--accent-amber`

Comentario en `:root`:
```css
--accent-amber: #F59E0B;  /* EPIC 03 — color para card Nuestros Valores */
```

---

## 14. User Documentation to produce

### UD-Output-9 — Mensaje de commit sugerido

```
feat(landing): rediseñar sección Nosotros con glass-panel cards

- 4 cards con preservación verbatim de copy (Quiénes Somos, Enfoque,
  Misión, Valores).
- Refactor de .about-card a glass-panel style (backdrop-filter blur).
- Token --accent-amber añadido a :root para card Valores.
- 7 iconos Material Symbols reemplazados por SVG inline.
- Hover effect mejorado (-6px + 20/40 shadow + border-color accent).
- Card Valores mantiene layout full-width con 3 sub-valores.

Refs: .refi/modules/keorsoft-landing-redesign/epics/03-about-nosotros/
```

### UD-Output-10 — Nota sobre el token nuevo

Pequeña nota en el cuerpo del commit:
> Se añade `--accent-amber: #F59E0B` al `:root` del `Styles.css` para soportar el color de la card Nuestros Valores. Este token no existe en `KeorsoftLandingNEW/styles.css` (que no usa amber) pero es coherente con la paleta extendida de Keorsoft.

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-49:** El token `--accent-amber: #F59E0B` está definido en `:root` del `Styles.css`.
- **AC-50:** La clase `.about-card` tiene `background: rgba(11, 15, 23, 0.45); backdrop-filter: blur(12px);` (glass-panel).
- **AC-51:** El `<section id="nosotros">` mantiene su `id` (anchor funcional desde nav).
- **AC-52:** El H2 dice verbatim "Más que una consultora. Somos una empresa de tecnología." con `<span>` para gradient en "empresa de tecnología".
- **AC-53:** El subtítulo dice verbatim "Keorsoft nace de la convicción...".
- **AC-54:** Las 4 cards están presentes con sus títulos verbatim: Quiénes Somos, Nuestro Enfoque, Nuestra Misión, Nuestros Valores.
- **AC-55:** Los 3 sub-valores están presentes con sus títulos verbatim: Innovación, Calidad, Developer Experience.
- **AC-56:** Los 7 iconos Material Symbols (`corporate_fare`, `target`, `flag`, `stars`, `lightbulb`, `award_star`, `developer_mode`) están reemplazados por SVG inline (≤ 7 elementos `<svg>` en la sección nosotros).
- **AC-57:** La card Valores tiene `md:col-span-2 lg:col-span-3` (full-width en desktop).
- **AC-58:** Las 3 primeras cards tienen `animation-delay:.1s/.2s/.3s` para reveal escalonado.
- **AC-59:** `<strong>MeridianUI</strong>` en el párrafo de "Nuestro Enfoque" se preserva con emphasis.
- **AC-60:** DevTools > Console en Chrome 120+ NO muestra errores JavaScript.
- **AC-61:** DevTools > Lighthouse: Accessibility ≥ 95 (sin regresión vs baseline).
- **AC-62:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-63:** Hover en `.about-card` aplica `transform: translateY(-6px)`, `border-color` al acento de la card, y `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3)`.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Token `--accent-amber` añadido coherentemente. Clases移植 (`.about-card`, `.sc-icon`, `.value-item`) son compatibles con EPIC 02 y EPIC 04. SVG inline coherentes con Feather Icons (open source, MIT).
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy de las 4 cards y 3 sub-valores preservado verbatim. 7 iconos reemplazados. Token `--accent-amber` presente. Glass-panel aplicado. Hover effect aplicado.
- [ ] **Gate 3 — UX/Design Review:** UX-P14 (cambio azul→indigo) documentado. UX-P15 a UX-P17 resueltos según §5. Layout full-width de card Valores preservado.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Sin regresión Lighthouse.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado. Nota sobre token nuevo (§14.2) comunicada.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 15 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________