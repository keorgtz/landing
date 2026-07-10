# PART 02 — Footer Redesign (Footer & Nav)

> **EPIC:** 08-footer-nav
> **Slug:** `footer-redesign`
> **Prioridad:** P1
> **Depende de:** EPIC 08 PART 01 (Nav Redesign) + EPIC 07 (clase `.social-icon` ya refactorizada)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reemplazar el `<footer>` actual del landing (líneas 769-846, 78 líneas) con un footer glass-panel de 4 columnas, basado en `KeorsoftLandingNEW/index.html` líneas 405-450. Se preserva verbatim:
- 4 columnas: Company Info (logo + descripción + social icons), Secciones, Productos, Contacto.
- 4 social icons (LinkedIn, Facebook, Instagram, GitHub).
- Bottom: copyright "© 2026 Keorsoft. Todos los derechos reservados." + "Diseñado con ❤ por Keorsoft UX/UI".

---

## 2. Current State

### 2.1 Footer actual (líneas 769-846 de `landing/index.html`)

```
<footer class="footer py-16">  <!-- línea 770 -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  <!-- línea 771 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">  <!-- línea 772 -->

      <!-- Column 1: Company Info -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-2 mb-4">  <!-- línea 775 -->
          <div class="w-8 h-8 rounded-full ..." style="background:linear-gradient(135deg, var(--kr-blue), var(--vi))">K</div>  <!-- línea 776 -->
          <span class="text-sm font-extrabold tracking-tighter uppercase text-[color:var(--txt-1)]">KEOR<span class="text-blue-500">SOFT</span></span>  <!-- línea 777 -->
        </div>
        <p class="text-sm text-[color:var(--txt-3)] leading-relaxed mb-4">  <!-- línea 781 -->
          Empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI y productos SaaS.  <!-- línea 782 -->
        </p>
        <div class="flex items-center gap-3">
          <!-- 4 social icons (líneas 785-788) -->
        </div>
      </div>

      <!-- Column 2: Secciones -->
      <div>
        <h4 class="font-bold text-[color:var(--txt-1)] text-sm mb-4 uppercase tracking-wider">Secciones</h4>  <!-- línea 794 -->
        <ul class="space-y-2">
          <li><a href="#inicio" class="footer-link">Inicio</a></li>  <!-- línea 796 -->
          <li><a href="#servicios" class="footer-link">Servicios</a></li>
          <li><a href="#productos" class="footer-link">Productos</a></li>
          <li><a href="#opensource" class="footer-link">Open Source</a></li>
          <li><a href="#nosotros" class="footer-link">Nosotros</a></li>
          <li><a href="#contacto" class="footer-link">Contacto</a></li>  <!-- línea 801 -->
        </ul>
      </div>

      <!-- Column 3: Productos -->
      <div>
        <h4>Productos</h4>
        <ul class="space-y-2">
          <li><a href="#productos" class="footer-link">MeridianUI</a></li>  <!-- línea 809 -->
          <li><a href="#productos" class="footer-link">Controls & Libraries</a></li>
          <li><a href="#productos" class="footer-link">SHEndevour</a></li>
          <li><a href="REASP/index.html" class="footer-link">REASP</a></li>
          <li><a href="RACSP/index.html" class="footer-link">RACSP</a></li>  <!-- línea 813 -->
        </ul>
      </div>

      <!-- Column 4: Contacto -->
      <div>
        <h4>Contacto</h4>  <!-- línea 819 -->
        <ul class="space-y-3">
          <li class="flex items-center gap-2 ...">
            <span class="material-symbols-rounded" style="font-size:16px">location_on</span>  <!-- línea 822 -->
            Guadalajara, México
          </li>
          <li>... mail + Kevin00ortizgtz@gmail.com ...</li>
          <li>... call + +52 33 2763 3233 ...</li>
          <li>... whatsapp + WhatsApp ...</li>
        </ul>
      </div>
    </div>

    <!-- Bottom -->
    <div class="pt-8 border-t border-[color:var(--card-border)] flex flex-col md:flex-row justify-between items-center gap-4">  <!-- línea 841 -->
      <p class="text-xs text-[color:var(--txt-3)] font-medium">&copy; 2026 Keorsoft. Todos los derechos reservados.</p>  <!-- línea 842 -->
      <p class="text-xs text-[color:var(--txt-3)] flex items-center gap-1">Diseñado con <span class="material-symbols-rounded fill text-red-500" style="font-size:14px">favorite</span> por Keorsoft UX/UI</p>  <!-- línea 843 -->
    </div>
  </div>
</footer>
```

### 2.2 Contenido preservado verbatim

**Column 1 — Company Info:**
- Logo: caja 32×32 con "K" + texto "KEOR**SOFT**".
- Descripción: "Empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI y productos SaaS."
- 4 social icons (LinkedIn, Facebook, Instagram, GitHub).

**Column 2 — Secciones** (6 links): Inicio, Servicios, Productos, Open Source, Nosotros, Contacto.

**Column 3 — Productos** (5 links): MeridianUI, Controls & Libraries, SHEndevour, REASP, RACSP.

**Column 4 — Contacto** (4 items):
- Ubicación: "Guadalajara, México" (con icono `location_on`).
- Email: "Kevin00ortizgtz@gmail.com" con `mailto:`.
- Teléfono: "+52 33 2763 3233" con `tel:`.
- WhatsApp: "WhatsApp" con `https://wa.me/523327633233` (target="_blank").

**Bottom:**
- Copyright: "© 2026 Keorsoft. Todos los derechos reservados."
- Mensaje: "Diseñado con ❤ por Keorsoft UX/UI" (icono `favorite` Material Symbols).

### 2.3 CSS actual relevante

- `.footer` (líneas 413-416): border-top 1px solid `var(--card-border)`, background `var(--bg-1)`.
- `.footer-link` (líneas 418-427): display block, font-size 14px, color `var(--txt-3)`. Hover: color `var(--kr-blue)`.

### 2.4 Iconografía

- 4 social icons con Font Awesome (mismo que contacto).
- 3 iconos Material Symbols en columna Contacto: `location_on` (línea 822), `mail` (línea 826), `call` (línea 830).
- 1 icono Material Symbols en bottom: `favorite` (línea 843).

---

## 3. Comparison against baseline

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 769-846) | Nuevo (NEW 405-450) | Migración |
|---------|--------------------------|---------------------|-----------|
| Container | `<footer class="footer py-16">` | `<footer>` con `border-top` + `background-color: var(--bg-secondary)` (NEW línea 1251-1255) | Adoptar estilos del NEW |
| Inner | `<div class="max-w-7xl mx-auto">` | `<div class="footer-container">` con `max-width: 1300px` (NEW línea 1256-1263) | Adoptar `.footer-container` |
| Grid | `<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-10">` | `<div class="footer-container">` con `grid-template-columns: 1.5fr 1fr 1fr 1fr` | Adoptar layout 4 cols del NEW |
| Column 1 | `.lg:col-span-1` (Tailwind) | `.footer-brand` con logo + descripción + social (NEW 1265-1274) | Adoptar `.footer-brand` |
| Column 2-4 | `<h4> + <ul class="space-y-2">` | `.footer-links-col` con título + `.footer-links` + `.footer-link` (NEW 1276-1304) | Adoptar `.footer-links-col` |
| Footer link | `.footer-link` con hover color `--kr-blue` | `.footer-link` con hover color `--text-primary` + `translateX(4px)` (NEW 1301-1304) | Adoptar hover del NEW |
| Bottom | `<div class="pt-8 border-t ...">` con copyright + mensaje | `<div class="footer-bottom">` con `justify-content: space-between` (NEW 1306-1316) | Adoptar `.footer-bottom` |

### 3.2 Decisión sobre los iconos del footer

**Decisión del planner:** reemplazar los 4 iconos Material Symbols (`location_on`, `mail`, `call`, `favorite`) por SVG inline (consistencia con EPIC 07). Font Awesome icons (social icons) se mantienen.

### 3.3 Decisión sobre el copyright

Mantener verbatim: "© 2026 Keorsoft. Todos los derechos reservados."

### 3.4 Decisión sobre el mensaje del bottom

Mantener verbatim: "Diseñado con ❤ por Keorsoft UX/UI" con icono `favorite` (ahora SVG inline).

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 769-846 con la nueva estructura de footer glass-panel.
- Preservación verbatim de las 4 columnas (Company, Secciones, Productos, Contacto).
- Preservación de los 6 links en "Secciones", 5 en "Productos", 4 items en "Contacto".
- Preservación de los 4 social icons.
- Preservación del bottom (copyright + mensaje).
- Reemplazo de los 4 iconos Material Symbols por SVG inline.
- Adición al `Styles.css` del bloque 8.AD con ~100 líneas:
  - `footer` base + `border-top` + `background`.
  - `.footer-container` con grid 4 cols.
  - `.footer-brand` + `.footer-desc`.
  - `.footer-links-col` + `.footer-col-title` + `.footer-links` + `.footer-link` + `.footer-link:hover`.
  - `.footer-bottom` + responsive.

### 4.2 Lo que NO está en el scope

- **NO** se añaden nuevas columnas.
- **NO** se añade newsletter signup.
- **NO** se consolidan scripts.
- **NO** se cambian los paths (todo se mantiene: `#inicio`, `#servicios`, etc., `REASP/index.html`, `RACSP/index.html`).

---

## 5. UX Problems

### UX-P60 — Hover de footer-link cambia a `--kr-blue` actual vs `--text-primary` + `translateX(4px)` nuevo
El hover actual cambia a azul corporativo. El nuevo cambia a blanco + slide. **Decisión:** adoptar nuevo (consistencia con NEW).

### UX-P61 — 4 columnas en mobile colapsan a 1 (sin 2x2 grid)
El grid responsive actual es `md:grid-cols-2 lg:grid-cols-4`, lo que da 2x2 en tablet y 4 cols en desktop, 1 col en mobile. **Decisión:** mantener (es comportamiento estándar).

### UX-P62 — `<h4>` con `tracking-wider` para títulos de columna
Mantener para legibilidad (uppercase + tracking).

### UX-P63 — Bottom sin separación visual fuerte
El `border-t` actual es sutil. **Decisión:** mantener (coherencia con NEW).

---

## 6. Backend / Logic Problems

N/A — markup + CSS.

---

## 7. Frontend / Presentation Problems

### Front-P70 — `text-[color:var(--txt-3)]` en descripción y links
移植 a CSS con `color: var(--text-muted)` y `color: var(--text-secondary)`.

### Front-P71 — `text-blue-500` en "SOFT" del logo
Línea 778: `class="text-blue-500"`. Tailwind utility. Migración al gradient del nuevo logo (consistencia con EPIC 08/PART 01).

### Front-P72 — `hover:text-[color:var(--kr-blue)]` en links
Líneas 827, 831, 835: hover a azul corporativo. Migración a `color: var(--text-primary)` + `translateX(4px)`.

### Front-P73 — `<span class="material-symbols-rounded fill text-red-500" style="font-size:14px">favorite</span>` en bottom
Línea 843: icono `favorite` con color rojo. Migración a SVG inline `<svg fill="red">` o emoji HTML `❤`.

**Decisión del planner:** usar emoji HTML `❤` (HTML entity `&#10084;` o `❤️`) para evitar mantener dependencias de Font Awesome o iconos. Mantiene el efecto visual sin requerir CSS adicional.

---

## 8. Technical Debt

### TD-43 — `.footer`残留 con estilos heredados
Tras este PART, la regla `.footer` puede tener estilos residuales (background `var(--bg-1)`) que ya no aplican. **Acción:** refactor o reemplazar con estilos del NEW.

### TD-44 — `.footer-link` refactor (cambio de hover color)
Documentar cambio de `--kr-blue` a `--text-primary` + `translateX(4px)`.

### TD-45 — Icon `favorite` con Tailwind utility (`text-red-500`)
移植 a emoji HTML. Sin dependencia de Material Symbols o Tailwind.

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-133:** Reemplazar las **78 líneas** (769-846) del footer actual con la nueva estructura (~70 líneas) — verificable con `(Get-Content landing/index.html)[768..845].Count` antes y después.
- **RI-134:** Preservar **verbatim el copyright** "© 2026 Keorsoft. Todos los derechos reservados." — verificable con `grep -c "Todos los derechos reservados" landing/index.html` que retorna `1`.
- **RI-135:** Preservar **verbatim el mensaje** "Diseñado con" + ❤ + "por Keorsoft UX/UI" — verificable con `grep -c "Diseñado con" landing/index.html` que retorna `1` y `grep -c "por Keorsoft UX/UI" landing/index.html` que retorna `1`.
- **RI-136:** Preservar las **4 columnas** con sus contenidos verbatim:
  - Col 1: logo "KEORSOFT" + descripción + 4 social icons.
  - Col 2: 6 links Secciones.
  - Col 3: 5 links Productos.
  - Col 4: 4 items Contacto.
- **RI-137:** Preservar **4 social icons** con sus `aria-label` y Font Awesome classes — verificable con `grep -E "social-icon.*aria-label" landing/index.html | wc -l` que retorna `≥ 4`.
- **RI-138:** Preservar **5 links Productos** apuntando a `#productos`, `#productos`, `#productos`, `REASP/index.html`, `RACSP/index.html` — verificable con `grep -E "(href=\"#productos\"|href=\"REASP/index.html\"|href=\"RACSP/index.html\")" landing/index.html | wc -l` que retorna `≥ 5` (incluye los del footer y los de open source/products).
- **RI-139:** Reemplazar los **4 iconos Material Symbols** (`location_on`, `mail`, `call`, `favorite`) por SVG inline o emoji HTML — verificable con `grep -E "(location_on|mail|call|favorite)" landing/index.html | wc -l` que retorna `0` en el footer (estos iconos también aparecen en otras secciones, ajustar regex).
- **RI-140:** Añadir `rel="noopener noreferrer"` al enlace GitHub del footer (target="_blank") — verificable con `grep -c 'rel="noopener noreferrer"' landing/index.html` que retorna `≥ 2` (1 en EPIC 07 GitHub contacto, 1 en EPIC 08 GitHub footer).
- **RI-141:** Añadir clases `.footer-container`, `.footer-brand`, `.footer-desc`, `.footer-links-col`, `.footer-col-title`, `.footer-links`, `.footer-link`, `.footer-bottom` al `Styles.css` — verificable con `grep -c "^\.footer-" landing/css/Styles.css` que retorna `≥ 7`.
- **RI-142:** **Hover de `.footer-link` cambia a `--text-primary` + `translateX(4px)`** (no `--kr-blue`) — verificable con `grep -A 3 "footer-link:hover" landing/css/Styles.css`.
- **RI-143:** Responsive: `grid-template-columns: 1fr` en mobile (< 768px), `repeat(2, 1fr)` en tablet (768-1024), `1.5fr 1fr 1fr 1fr` en desktop — verificable con `@media` queries en CSS.
- **RI-144:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` — verificable con `git diff --stat landing/REASP/ landing/RACSP/` vacío.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 769-846** (reemplazo total, 78 líneas → ~70 líneas):

```html
<!-- ══ FOOTER · EPIC 08 PART 02 ══════════════════════════════════════════ -->
<footer class="site-footer">
  <div class="footer-container">

    <!-- Column 1: Brand -->
    <div class="footer-brand">
      <a href="#inicio" class="logo">
        <div class="logo-icon">K</div>
        Keorsoft
      </a>
      <p class="footer-desc">
        Empresa de tecnología enfocada en crear soluciones de software de escritorio y web, herramientas de IA, frameworks UI y productos SaaS.
      </p>
      <div class="footer-social">
        <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        <a href="#" class="social-icon" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" class="social-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="https://github.com/keorgtz" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
      </div>
    </div>

    <!-- Column 2: Secciones -->
    <div class="footer-links-col">
      <h4 class="footer-col-title">Secciones</h4>
      <ul class="footer-links">
        <li><a href="#inicio" class="footer-link">Inicio</a></li>
        <li><a href="#servicios" class="footer-link">Servicios</a></li>
        <li><a href="#productos" class="footer-link">Productos</a></li>
        <li><a href="#opensource" class="footer-link">Open Source</a></li>
        <li><a href="#nosotros" class="footer-link">Nosotros</a></li>
        <li><a href="#contacto" class="footer-link">Contacto</a></li>
      </ul>
    </div>

    <!-- Column 3: Productos -->
    <div class="footer-links-col">
      <h4 class="footer-col-title">Productos</h4>
      <ul class="footer-links">
        <li><a href="#productos" class="footer-link">MeridianUI</a></li>
        <li><a href="#productos" class="footer-link">Controls &amp; Libraries</a></li>
        <li><a href="#productos" class="footer-link">SHEndevour</a></li>
        <li><a href="REASP/index.html" class="footer-link">REASP</a></li>
        <li><a href="RACSP/index.html" class="footer-link">RACSP</a></li>
      </ul>
    </div>

    <!-- Column 4: Contacto -->
    <div class="footer-links-col">
      <h4 class="footer-col-title">Contacto</h4>
      <ul class="footer-links">
        <li class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Guadalajara, México
        </li>
        <li class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <a href="mailto:Kevin00ortizgtz@gmail.com" class="footer-link">Kevin00ortizgtz@gmail.com</a>
        </li>
        <li class="footer-contact-item">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.05a16 16 0 0 0 6 6l1.16-1.16a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"/>
          </svg>
          <a href="tel:+523327633233" class="footer-link">+52 33 2763 3233</a>
        </li>
        <li class="footer-contact-item">
          <i class="fa-brands fa-whatsapp" style="font-size:14px"></i>
          <a href="https://wa.me/523327633233" target="_blank" rel="noopener noreferrer" class="footer-link">WhatsApp</a>
        </li>
      </ul>
    </div>

  </div>

  <!-- Bottom -->
  <div class="footer-bottom">
    <span>&copy; 2026 Keorsoft. Todos los derechos reservados.</span>
    <span>Diseñado con <span style="color:#ef4444;">&hearts;</span> por Keorsoft UX/UI</span>
  </div>
</footer>
```

### 10.2 Bloque CSS a añadir al `Styles.css`

Bloque 8.AD (después del bloque 8.AC de EPIC 08/PART 01):

```css
/* ============================================
   8.AD Footer · EPIC 08 PART 02
   4-column glass-panel footer.
   Hover effect: --text-primary + translateX(4px).
   Icons: SVG inline (location, mail, call) + Font Awesome (WhatsApp).
   Favorite heart: HTML entity (no Material Symbols).
   ============================================ */

.site-footer {
  border-top: 1px solid var(--border-light);
  background-color: var(--bg-secondary);
  padding: 5rem 2rem 2.5rem;
}

.footer-container {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-desc {
  font-size: 0.9rem;
  max-width: 320px;
  color: var(--text-muted);
  line-height: 1.5;
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.footer-links-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-col-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.footer-link {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.footer-link:hover {
  color: var(--text-primary);
  transform: translateX(4px);
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.footer-contact-item svg {
  color: var(--text-muted);
  flex-shrink: 0;
}

.footer-contact-item a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-smooth);
}

.footer-contact-item a:hover {
  color: var(--text-primary);
}

.footer-bottom {
  max-width: 1300px;
  margin: 0 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Responsive footer */
@media (max-width: 1024px) {
  .footer-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
```

### 10.3 Decisión sobre el "❤" del bottom

**Decisión del planner:** usar HTML entity `&hearts;` (`&#9829;` o el emoji directo `❤️`) con `style="color:#ef4444;"` inline. Mantiene el efecto visual sin requerir Material Symbols ni Font Awesome.

### 10.4 Decisión sobre los iconos del footer

**Decisión:** reemplazar los 3 iconos Material Symbols (`location_on`, `mail`, `call`) por SVG inline. El icono de WhatsApp se mantiene como Font Awesome `fa-whatsapp`.

### 10.5 Eliminación de `.footer` y `.footer-link` anteriores

Tras este PART, las definiciones `.footer` y `.footer-link` anteriores (líneas 413-427 del Styles.css) se reemplazan por las nuevas (`.site-footer`, `.footer-link` con hover actualizado). Eliminar las definiciones anteriores.

---

## 11. Automated Test Plan

### AT-132 — Verificación de copyright preservado
- **Comando:** `grep -c "Todos los derechos reservados" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-133 — Verificación de mensaje "Diseñado con"
- **Comando:** `grep -c "Diseñado con" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "por Keorsoft UX/UI" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-134 — Verificación de 4 columnas con sus contenidos
- **Comando:** `grep -c "Secciones" landing/index.html` (en footer).
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c "Productos" landing/index.html` (en footer).
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 3:** `grep -c "Contacto" landing/index.html` (en footer).
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-135 — Verificación de 4 social icons con aria-label
- **Comando:** `grep -E 'social-icon.*aria-label' landing/index.html | wc -l`.
- **Pass criteria:** `≥ 4`.
- **Fallo:** `< 4`.

### AT-136 — Verificación de hrefs en footer (links a REASP, RACSP)
- **Comando:** `grep -c 'href="REASP/index.html"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

- **Comando 2:** `grep -c 'href="RACSP/index.html"' landing/index.html`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-137 — Verificación de iconos Material Symbols eliminados del footer
- **Comando:** `grep -E "(location_on|call|favorite).*Guadalajara|call.*5233276|location_on.*Guadalajara|favorite.*por" landing/index.html | wc -l`.
- **Pass criteria:** `0` (estos contextos deben estar en SVG/emoji).
- **Fallo:** `> 0`.

### AT-138 — Verificación de `rel="noopener noreferrer"` en GitHub footer
- **Comando:** `grep -c 'rel="noopener noreferrer"' landing/index.html`.
- **Pass criteria:** `≥ 2` (EPIC 06 GitHub OSS + EPIC 08 GitHub footer; posiblemente más).
- **Fallo:** `< 2`.

### AT-139 — Verificación de nuevas clases CSS
- **Comando:** `grep -c "^\.footer-\|^\.site-footer" landing/css/Styles.css`.
- **Pass criteria:** `≥ 8`.
- **Fallo:** `< 8`.

### AT-140 — Verificación de hover de `.footer-link` con `translateX(4px)`
- **Comando:** `grep -A 3 "footer-link:hover" landing/css/Styles.css`.
- **Pass criteria:** Contiene `translateX(4px)` y `color: var(--text-primary)`.
- **Fallo:** Sin `translateX(4px)`.

### AT-141 — Verificación de responsive
- **Comando:** `grep -c "max-width: 1024px.*footer\|max-width: 768px.*footer" landing/css/Styles.css`.
- **Pass criteria:** `≥ 2`.
- **Fallo:** `< 2`.

### AT-142 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-194:** Abrir `landing/index.html` en Chrome 120+: el footer tiene 4 columnas visibles en desktop.
- [ ] **MV-195:** **Columna 1 (Brand)** tiene logo "Keorsoft" + descripción + 4 social icons.
- [ ] **MV-196:** **Columna 2 (Secciones)** tiene 6 links: Inicio, Servicios, Productos, Open Source, Nosotros, Contacto.
- [ ] **MV-197:** **Columna 3 (Productos)** tiene 5 links: MeridianUI, Controls & Libraries, SHEndevour, REASP, RACSP.
- [ ] **MV-198:** **Columna 4 (Contacto)** tiene 4 items: Guadalajara/México (location), email (mail), phone (call), WhatsApp.
- [ ] **MV-199:** Los iconos SVG en columna Contacto tienen color `var(--text-muted)` y se ven correctamente.
- [ ] **MV-200:** Hover en footer-link: color blanco + translateX(4px).
- [ ] **MV-201:** Click en cualquier link de "Secciones" hace scroll suave a la sección.
- [ ] **MV-202:** Click en "REASP" abre `REASP/index.html` en misma pestaña.
- [ ] **MV-203:** Click en "RACSP" abre `RACSP/index.html` en misma pestaña.
- [ ] **MV-204:** Click en WhatsApp abre `https://wa.me/523327633233` en nueva pestaña.
- [ ] **MV-205:** El bottom muestra "© 2026 Keorsoft. Todos los derechos reservados." + "Diseñado con ❤ por Keorsoft UX/UI".
- [ ] **MV-206:** El ❤ en el bottom es rojo (color `#ef4444`).
- [ ] **MV-207:** Renderizar en DevTools > iPad (1024×768): 4 cols colapsan a 2 cols (2x2 grid).
- [ ] **MV-208:** Renderizar en DevTools > iPhone 12 Pro: 4 cols colapsan a 1 col; bottom cambia a vertical.
- [ ] **MV-209:** DevTools > Console: 0 errores.
- [ ] **MV-210:** DevTools > Lighthouse: sin regresión vs EPIC 07.
- [ ] **MV-211:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-27 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ FOOTER · EPIC 08 PART 02 ═════════════════════════════════════════ -->
<!-- 4-column footer (Brand, Secciones, Productos, Contacto) -->
<!-- Hover .footer-link: --text-primary + translateX(4px) -->
<!-- Social icons: Font Awesome (LinkedIn, Facebook, Instagram, GitHub) -->
<!-- Contacto icons: SVG inline (location, mail, call) + Font Awesome (WhatsApp) -->
<!-- Bottom: copyright + mensaje con ❤ (HTML entity rojo) -->
```

### TD-Output-28 — Comentarios en `Styles.css`

Cabecera del bloque 8.AD:
```css
/* ============================================
   8.AD Footer · EPIC 08 PART 02
   4-column footer (Brand, Secciones, Productos, Contacto).
   Hover: --text-primary + translateX(4px).
   Contacto icons: SVG inline + Font Awesome (WhatsApp).
   Responsive: 4 cols → 2 cols (1024px) → 1 col (768px).
   ============================================ */
```

---

## 14. User Documentation to produce

### UD-Output-23 — Mensaje de commit sugerido

```
feat(landing): rediseñar footer con glass-panel 4-cols

- 4 columnas preservadas (Brand, Secciones, Productos, Contacto).
- Hover .footer-link: --text-primary + translateX(4px) (refactor).
- 4 social icons con rel="noopener noreferrer" (GitHub).
- 4 iconos Material Symbols reemplazados por SVG inline
  (location, mail, call, favorite).
- ❤ del bottom como HTML entity rojo (no Material Symbols).
- Bottom: copyright + mensaje verbatim.
- Responsive: 4 cols → 2 cols (1024px) → 1 col (768px).

Refs: .refi/modules/keorsoft-landing-redesign/epics/08-footer-nav/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-161:** El `<footer class="site-footer">` reemplaza al `<footer class="footer">`.
- **AC-162:** Las 4 columnas están presentes con sus contenidos verbatim.
- **AC-163:** El copyright "© 2026 Keorsoft. Todos los derechos reservados." se preserva verbatim.
- **AC-164:** El mensaje "Diseñado con ❤ por Keorsoft UX/UI" se preserva con ❤ en color rojo.
- **AC-165:** Los 4 social icons tienen `aria-label` y Font Awesome classes.
- **AC-166:** Los 5 links Productos apuntan a `#productos` (3), `REASP/index.html`, `RACSP/index.html`.
- **AC-167:** Los 4 items Contacto tienen SVG inline (location, mail, call) + Font Awesome (whatsapp).
- **AC-168:** El enlace GitHub tiene `rel="noopener noreferrer"`.
- **AC-169:** Los 4 iconos Material Symbols del footer están reemplazados por SVG inline o emoji.
- **AC-170:** Hover de `.footer-link` cambia a `--text-primary` + `translateX(4px)`.
- **AC-171:** El `Styles.css` contiene `.site-footer`, `.footer-container`, `.footer-brand`, `.footer-desc`, `.footer-social`, `.footer-links-col`, `.footer-col-title`, `.footer-links`, `.footer-link`, `.footer-contact-item`, `.footer-bottom`.
- **AC-172:** Existe `@media (max-width: 1024px)` con `grid-template-columns: repeat(2, 1fr)` y `@media (max-width: 768px)` con `grid-template-columns: 1fr`.
- **AC-173:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-174:** DevTools > Lighthouse: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- **AC-175:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Footer coherente con NEW (4 cols + glass-panel). Hover effect coherente con EPIC 04-07. Tokens accent correctos. Refactor de `.footer-link` documentado.
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy preservado verbatim (4 columnas, copyright, mensaje ❤). 4 iconos SVG inline. 4 social icons con aria-label. Links a REASP/RACSP intactos.
- [ ] **Gate 3 — UX/Design Review:** UX-P60 a UX-P63 resueltos según §5. Hover slide coherente. Responsive 4→2→1 cols.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Links funcionales. Responsive funcional.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 15 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________