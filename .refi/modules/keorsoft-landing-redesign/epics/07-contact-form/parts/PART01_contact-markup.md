# PART 01 — Contact Markup (Contacto & Form)

> **EPIC:** 07-contact-form
> **Slug:** `contact-markup`
> **Prioridad:** P1
> **Depende de:** EPIC 01 (Style Foundation) + EPIC 02 (clases compartidas: `.section-tag`, `.section-title`, `.bg-glow-container`)
> **Complejidad:** M
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Reescribir el markup Y parcialmente los estilos de la sección **Contacto** (`<section id="contacto">`, líneas 670-767 de `landing/index.html`, 97 líneas) preservando los 4 contact-info-items (WhatsApp, Teléfono, Email, Ubicación), los 4 social icons (LinkedIn, Facebook, Instagram, GitHub), y el formulario completo (3 inputs + submit + success banner).

---

## 2. Current State

### 2.1 Sección contacto actual (líneas 670-767)

Estructura general:

```
<section id="contacto" class="py-24 sm:py-32 section-main relative">  <!-- línea 671 -->
  <div class="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] ..."></div>  <!-- línea 672 -->

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">  <!-- línea 673 -->
    <!-- Section header -->
    <div class="text-center max-w-2xl mx-auto mb-16 scroll-reveal">  <!-- línea 674 -->
      <p class="text-blue-600 ...">Contacto</p>  <!-- línea 675 -->
      <h2>Hablemos de tu <span class="text-gradient">próximo proyecto.</span></h2>  <!-- líneas 676-678 -->
      <p>Estamos listos para ayudarte...</p>  <!-- líneas 679-681 -->
    </div>

    <!-- 2-column grid -->
    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">  <!-- línea 684 -->
      <!-- LEFT: Contact Info -->
      <div class="scroll-reveal">  <!-- línea 686 -->
        <!-- 4 contact-info-items (líneas 688-726) -->
        <!-- Social icons (líneas 729-737) -->
      </div>

      <!-- RIGHT: Contact Form -->
      <div class="contact-form-wrapper scroll-reveal" style="animation-delay:.1s">  <!-- línea 741 -->
        <form id="contact-form" class="space-y-4">  <!-- línea 742 -->
          <!-- 3 inputs (name, email, message) -->
          <!-- Submit button -->
        </form>
        <div id="form-success" class="hidden ...">  <!-- línea 760 -->
          <!-- Success message with check_circle icon -->
        </div>
      </div>
    </div>
  </div>
</section>
```

### 2.2 Contenido de los 4 contact-info-items (verbatim)

| # | Item | Icono contenedor | Icono | Enlace | Texto |
|---|------|------------------|-------|--------|-------|
| 1 | WhatsApp | `w-12 h-12 rounded-2xl bg-green-500/10 text-green-500` | `fa-brands fa-whatsapp text-xl` | `https://wa.me/523327633233` (target="_blank") | "+52 33 2763 3233" |
| 2 | Teléfono | `w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500` | `material-symbols-rounded fill: call` (22px) | `tel:+523327633233` | "+52 33 2763 3233" |
| 3 | Email | `w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500` | `material-symbols-rounded fill: mail` (22px) | `mailto:Kevin00ortizgtz@gmail.com` | "Kevin00ortizgtz@gmail.com" |
| 4 | Ubicación | `w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500` | `material-symbols-rounded fill: location_on` (22px) | (sin link, solo `<p>`) | "Guadalajara, México" |

### 2.3 Social icons (líneas 729-737)

- Header: "Síguenos" (`<h4 class="font-bold text-[color:var(--txt-1)] text-sm mb-4">`).
- Separador: `<div class="mt-8 pt-8 border-t border-[color:var(--card-border)]">`.
- 4 icons:
  - LinkedIn: `<a href="#" class="social-icon" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>`
  - Facebook: `<a href="#" class="social-icon" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>`
  - Instagram: `<a href="#" class="social-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>`
  - GitHub: `<a href="https://github.com/keorgtz" target="_blank" class="social-icon" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>`

### 2.4 Form (líneas 741-764)

3 inputs con `<label>` asociado:

| Input | `id` | `name` | `type` | `required` | Placeholder | Label |
|-------|------|--------|--------|------------|-------------|-------|
| 1 | `name` | `name` | `text` | sí | "Tu nombre completo" | "Nombre" |
| 2 | `email` | `email` | `email` | sí | "tu@email.com" | "Email" |
| 3 | `message` | `message` | `textarea` (rows=4) | sí | "Cuéntanos sobre tu proyecto..." | "Mensaje" |

Submit button: `<button type="submit" class="w-full btn-primary flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm">` con icono `send` (Material Symbols) y texto "Enviar Mensaje".

Success banner (oculto por defecto): `<div id="form-success" class="hidden mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm text-center">` con icono `check_circle` y texto "¡Mensaje enviado! Te contactaremos pronto."

### 2.5 CSS actual relevante

- `.contact-info-item` (líneas 359-363 Styles.css anterior): display flex, align-items center, gap 16px.
- `.contact-form-wrapper` (líneas 365-370): background `var(--card)`, border 1px solid `var(--card-border)`, border-radius 24px, padding 32px.
- `.form-input` (líneas 372-390): width 100%, padding 12px 16px, border-radius 12px, border 1px solid `var(--card-border)`, background `var(--bg-3)`, color `var(--txt-1)`, font-size 14px. Focus: border-color `var(--kr-blue)` + box-shadow `0 0 0 3px rgba(14,152,248,.15)`.
- `.social-icon` (líneas 392-410): width 40px, height 40px, border-radius 12px, display flex, align-items center, justify-content center, background `var(--bg-3)`, border 1px solid `var(--card-border)`, color `var(--txt-2)`. Hover: background `var(--kr-blue)`, border-color `var(--kr-blue)`, color white, translateY(-2px).

### 2.6 Iconografía Material Symbols en uso (5 iconos)

| Icono | Línea | Uso |
|-------|-------|-----|
| `call` | 700 | Contact item Teléfono |
| `mail` | 710 | Contact item Email |
| `location_on` | 720 | Contact item Ubicación |
| `send` | 756 | Submit button |
| `check_circle` | 761 | Success banner |

Font Awesome (5 iconos, se mantienen): `fa-whatsapp`, `fa-linkedin-in`, `fa-facebook-f`, `fa-instagram`, `fa-github`.

### 2.7 Dependencias Tailwind

~50 utility classes (estimación). Las principales: `grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto`, `flex items-center gap-3`, `w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center shrink-0`, `space-y-6`, `space-y-4`, `text-[color:var(--txt-1)]`, `hover:text-[color:var(--kr-blue)]`, `border-t border-[color:var(--card-border)]`, `text-xs font-semibold ... uppercase tracking-wider`, `block w-full btn-primary ... px-8 py-4`.

### 2.8 Script actual del form

El `<script>` inline del landing (líneas 925-941) tiene el handler del form:

```js
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  contactForm.style.opacity = '0.5';
  contactForm.style.pointerEvents = 'none';
  setTimeout(() => {
    contactForm.reset();
    contactForm.style.opacity = '1';
    contactForm.style.pointerEvents = 'auto';
    formSuccess.classList.remove('hidden');
    setTimeout(() => formSuccess.classList.add('hidden'), 5000);
  }, 1000);
});
```

**Decisión del planner:** el handler se extrae a `js/main.js` (o se mantiene interim en `landing/index.html` script) en EPIC 09. Este PART solo modifica el markup; el script puede seguir funcionando con los IDs existentes (`#contact-form`, `#form-success`).

---

## 3. Comparison against baseline

### 3.1 Diferencias arquitectónicas

| Aspecto | Actual (landing 670-767) | Nuevo | Migración |
|---------|--------------------------|-------|-----------|
| Header label | `<p class="text-blue-600 ...">Contacto</p>` (línea 675) | `.section-tag` con icono | Adoptar `.section-tag` |
| H2 | `<h2 class="text-3xl ... text-[color:var(--txt-1)]"><span class="text-gradient">próximo proyecto.</span></h2>` | `.section-title` con `<span class="hero-title-accent">` | Adoptar `.section-title` |
| Layout | `<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">` (línea 684) | `.contact-grid` con `max-width: 64rem; mx: auto` | Adoptar `.contact-grid` |
| Item base | `.contact-info-item` con `<div class="w-12 h-12 rounded-2xl bg-X-500/10 text-X-500 ...">` + `<span class="material-symbols-rounded fill">` | `.contact-info-item` con `.contact-info-icon` glass-panel | Refactor con nueva clase `.contact-info-icon` |
| Form wrapper | `.contact-form-wrapper` con background `var(--card)` | `.contact-form-wrapper` con glass-panel + border sutil | Adoptar glass-panel |
| Form input | `.form-input` con background `var(--bg-3)` | `.form-input` con `background: var(--bg-tertiary)` + border sutil | Mantener `.form-input` (existe en Styles.css), ajustar colores |
| Submit button | `btn-primary` con inline styles | `btn-primary` (existe en Styles.css) | Sin cambios |
| Social icon | `.social-icon` con background `var(--bg-3)` | `.social-icon` glass-panel + hover indigo | Refactor |

### 3.2 Decisión: mantener 2 columnas + form completo en glass-panel

El usuario diseñó esta sección con 2 columnas explícitas. Se preservan. El form se移植 a glass-panel.

### 3.3 Decisión sobre colores de los iconos de contacto

| Item | Color actual | Color nuevo (token) | Notas |
|------|--------------|---------------------|-------|
| WhatsApp | `bg-green-500/10 text-green-500` | `rgba(16, 185, 129, 0.1)` + `var(--accent-emerald)` | Sin cambios semánticos |
| Teléfono | `bg-blue-500/10 text-blue-500` | `rgba(14, 152, 248, 0.1)` + `#0E98F8` (literal, igual que MeridianUI) | Mantener azul corporativo |
| Email | `bg-purple-500/10 text-purple-500` | `rgba(168, 85, 247, 0.1)` + `var(--accent-purple)` | Cambio a púrpura |
| Ubicación | `bg-amber-500/10 text-amber-500` | `rgba(245, 158, 11, 0.1)` + `var(--accent-amber)` | Token añadido en EPIC 03 |

### 3.4 Decisión sobre éxito banner

El `#form-success` banner usa clases inline (`bg-emerald-500/10 border border-emerald-500/20 text-emerald-600`). Se移植 a `.form-success` con clases semánticas.

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Reemplazo de `landing/index.html` líneas 670-767 con la nueva estructura.
- Preservación verbatim del header (label, H2 con gradient, subtítulo).
- Preservación verbatim de los 4 contact-info-items (WhatsApp, Teléfono, Email, Ubicación).
- Preservación de los 4 social icons (LinkedIn, Facebook, Instagram, GitHub).
- Preservación del form completo (3 inputs, submit, success banner).
- Reemplazo de los 5 iconos Material Symbols por SVG inline.
- Mantenimiento de Font Awesome para iconos de marca (decisión EPIC 01).
- Adición al `Styles.css` de:
  - `.contact-grid` (layout).
  - `.contact-info-icon` (iconos 48×48 con color accent).
  - `.contact-form-wrapper` (refactor glass-panel).
  - `.form-success` (success banner).
  - Ajustes a `.social-icon` (glass-panel).

### 4.2 Lo que NO está en el scope

- **NO** se añade backend real para el envío del form (sigue siendo simulación client-side).
- **NO** se reemplaza por un modal (decisión de scope del EPIC 07).
- **NO** se modifican los IDs (`#contact-form`, `#form-success`) para no romper el `<script>` inline actual.
- **NO** se consolidan scripts (EPIC 09).

---

## 5. UX Problems

### UX-P45 — Iconos de contacto con colores muy saturados pueden chocar con glass-panel
Los iconos usan colores fuertes (verde WhatsApp, azul Phone, púrpura Email, ámbar Ubicación). En glass-panel, podrían verse "ruidosos". **Decisión:** mantener colores (es parte del branding de cada canal).

### UX-P46 — Form input con `bg-3` puede ser demasiado oscuro
El input actual usa `var(--bg-3)` (color gris claro en light mode, oscuro en dark). En dark mode, podría ser muy oscuro y perder contraste. **Decisión:** mantener (es funcional y accessible).

### UX-P47 — Submit button `w-full` puede ser muy ancho
El botón submit ocupa todo el ancho del form. En desktop, esto puede verse "estirado". **Decisión:** mantener (es estándar en formularios de contacto).

### UX-P48 — `text-emerald-600` en success banner no coincide con dark mode
El texto verde puede ser difícil de leer sobre fondo oscuro. **Decisión:** ajustar a `var(--accent-emerald)` o similar con mejor contraste.

### UX-P49 — `<p>` en Ubicación sin `<a>` no permite selección de texto
El item Ubicación usa `<p class="text-[color:var(--txt-2)] text-sm">Guadalajara, México</p>` en lugar de `<a>`. Los usuarios no pueden hacer click para abrir un mapa. **Decisión:** mantener (no se requiere integración con Google Maps en este EPIC).

---

## 6. Backend / Logic Problems

N/A — markup + CSS + client-side form.

---

## 7. Frontend / Presentation Problems

### Front-P49 — `bg-green-500/10` en WhatsApp icon requiere Tailwind opacity utility
Sin Tailwind, se移植 a CSS con `background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: var(--accent-emerald);`.

### Front-P50 — `hover:text-[color:var(--kr-blue)]` en links requiere Tailwind arbitrary
Línea 694, 704, 714: `hover:text-[color:var(--kr-blue)]`. Sin Tailwind, se usa `.contact-info-link:hover { color: var(--accent-indigo); }` (o mantener el azul corporativo `#0E98F8`).

### Front-P51 — `style="animation-delay:.1s"` inline en form wrapper
Línea 741: `style="animation-delay:.1s"` para reveal escalonado. Mantener inline (es trivial).

### Front-P52 — `text-emerald-600` en success banner移植
Línea 760: `text-emerald-600` con fondo `bg-emerald-500/10`. Sin Tailwind, se移植 a `.form-success { color: var(--accent-emerald); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); }`.

### Front-P53 — `w-full` en submit button requiere Tailwind utility
Línea 755: `w-full`. Sin Tailwind, se usa CSS `width: 100%`.

### Front-P54 — `flex items-center justify-center gap-2.5` inline en submit button
移植 a CSS `.btn-submit { display: flex; align-items: center; justify-content: center; gap: 0.625rem; }` o se usa `.btn-primary` con override.

### Front-P55 — `space-y-4` en form y `space-y-6` en contact info
Tailwind utility para spacing. Sin Tailwind, se移植 a CSS con `gap: 1rem` o `1.5rem`.

### Front-P56 — `resize-none` en textarea
Línea 753: `class="form-input resize-none"`. Sin Tailwind, se usa CSS `resize: none`.

---

## 8. Technical Debt

### TD-32 — `.social-icon` con background `var(--bg-3)` se移植 a glass-panel
Actual usa `background: var(--bg-3)`. Migración a glass-panel con `background: rgba(11, 15, 23, 0.45)`. **Decisión:** refactor en este PART.

### TD-33 — `<script>` inline del form sigue activo
Tras este PART, el `<script>` inline del landing (líneas 925-941) sigue funcionando porque los IDs (`#contact-form`, `#form-success`) se mantienen. **Decisión:** consolidar a `js/main.js` en EPIC 09.

### TD-34 — Success banner usa clases inline con colores específicos
`bg-emerald-500/10 border border-emerald-500/20 text-emerald-600`移植 a `.form-success`.

### TD-35 — `<a href="#">` en LinkedIn, Facebook, Instagram
3 de los 4 social icons apuntan a `#` (sin link real). **Decisión:** mantener (no se inventan URLs en este EPIC).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-101:** Reemplazar las **97 líneas** (670-767) de la sección contacto con la nueva estructura (~85 líneas) — verificable con `wc -l landing/index.html` antes y después.
- **RI-102:** Preservar verbatim el **H2 "Hablemos de tu próximo proyecto."** con `<span class="hero-title-accent">` — verificable con `grep -c "Hablemos de tu" landing/index.html` que retorna `1` y `grep -c "próximo proyecto" landing/index.html` que retorna `1`.
- **RI-103:** Preservar verbatim el **subtítulo** "Estamos listos para ayudarte a transformar tu negocio con tecnología de clase mundial." — verificable con `grep -c "Estamos listos para ayudarte" landing/index.html` que retorna `1`.
- **RI-104:** Preservar los **4 contact-info-items** con sus datos exactos: WhatsApp +52 33 2763 3233, Teléfono +52 33 2763 3233, Email Kevin00ortizgtz@gmail.com, Ubicación Guadalajara, México — verificable con `grep -E "(wa.me/523327633233|tel:\+523327633233|Kevin00ortizgtz@gmail.com|Guadalajara, México)" landing/index.html | wc -l` que retorna `≥ 4`.
- **RI-105:** Preservar los **4 social icons** con sus Font Awesome classes: `fa-linkedin-in`, `fa-facebook-f`, `fa-instagram`, `fa-github` — verificable con `grep -E "(fa-linkedin-in|fa-facebook-f|fa-instagram|fa-github)" landing/index.html | wc -l` que retorna `≥ 4` (puede haber otros usos en footer; verificar que al menos los 4 del contacto estén).
- **RI-106:** Preservar el **form completo** con 3 inputs (`name`, `email`, `message`) + submit button + success banner — verificable con `grep -c 'id="contact-form"' landing/index.html` que retorna `1` y `grep -c 'id="form-success"' landing/index.html` que retorna `1` y `grep -c 'id="name"' landing/index.html` que retorna `1` y `grep -c 'id="email"' landing/index.html` que retorna `1` y `grep -c 'id="message"' landing/index.html` que retorna `1`.
- **RI-107:** Reemplazar los **5 iconos Material Symbols** (`call`, `mail`, `location_on`, `send`, `check_circle`) por SVG inline — verificable con `grep -E "(call|mail|location_on|send|check_circle)" landing/index.html | wc -l` que retorna `0` (estos iconos son específicos del contacto; otros usos como `call` o `mail` pueden aparecer en otros contextos, ajustar regex).
- **RI-108:** Añadir `rel="noopener noreferrer"` al enlace WhatsApp (target="_blank") — verificable con `grep -c 'rel="noopener noreferrer"' landing/index.html` que retorna `2` (1 WhatsApp + 1 GitHub ya añadido en EPIC 06, pero GitHub ahora tiene otro href, ajustar).
- **RI-109:** Crear **clase `.contact-info-icon`** con 4 variants (whatsapp, phone, email, location) — verificable con `grep -c "contact-info-icon" landing/css/Styles.css` que retorna `≥ 5` (base + 4 variants).
- **RI-110:** Crear **clase `.form-success`** glass-panel — verificable con `grep -c "form-success" landing/css/Styles.css` que retorna `≥ 1`.
- **RI-111:** Refactor de **`.social-icon`** con glass-panel + hover indigo — verificable con `grep -A 3 "^\.social-icon {" landing/css/Styles.css` que retorna `background: rgba(11, 15, 23, 0.45)`.
- **RI-112:** Mantener el `<section id="contacto">` con su anchor — verificable con `grep -c 'id="contacto"' landing/index.html` que retorna `1`.

---

## 10. Implementation Plan

### 10.1 Archivos a MODIFICAR

**`landing/index.html` líneas 670-767** (reemplazo total, 97 líneas → ~85 líneas):

```html
<!-- ══ CONTACTO · EPIC 07 PART 01 ═════════════════════════════════════════ -->
<section id="contacto" class="py-24 sm:py-32 section-main relative">
  <!-- Bg orb decorativo -->
  <div class="about-bg-orb" style="top:0;right:0;width:24rem;height:24rem;background:radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%);"></div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <!-- Section header -->
    <div class="section-header">
      <div class="section-tag">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        Contacto
      </div>
      <h2 class="section-title">
        Hablemos de tu <span class="hero-title-accent">próximo proyecto.</span>
      </h2>
      <p class="section-desc">
        Estamos listos para ayudarte a transformar tu negocio con tecnología de clase mundial.
      </p>
    </div>

    <!-- 2-column layout -->
    <div class="contact-grid">

      <!-- LEFT: Contact Info -->
      <div class="scroll-reveal">
        <div class="contact-info-list">
          <!-- WhatsApp -->
          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon-whatsapp">
              <i class="fa-brands fa-whatsapp"></i>
            </div>
            <div>
              <h4 class="contact-info-title">WhatsApp</h4>
              <a href="https://wa.me/523327633233" target="_blank" rel="noopener noreferrer" class="contact-info-link">+52 33 2763 3233</a>
            </div>
          </div>

          <!-- Teléfono -->
          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon-phone">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11L8.09 10.05a16 16 0 0 0 6 6l1.16-1.16a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <h4 class="contact-info-title">Teléfono</h4>
              <a href="tel:+523327633233" class="contact-info-link">+52 33 2763 3233</a>
            </div>
          </div>

          <!-- Email -->
          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon-email">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <h4 class="contact-info-title">Email</h4>
              <a href="mailto:Kevin00ortizgtz@gmail.com" class="contact-info-link">Kevin00ortizgtz@gmail.com</a>
            </div>
          </div>

          <!-- Ubicación -->
          <div class="contact-info-item">
            <div class="contact-info-icon contact-info-icon-location">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <h4 class="contact-info-title">Ubicación</h4>
              <p class="contact-info-text">Guadalajara, México</p>
            </div>
          </div>
        </div>

        <!-- Social icons -->
        <div class="contact-social">
          <h4 class="contact-social-title">Síguenos</h4>
          <div class="contact-social-icons">
            <a href="#" class="social-icon" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="#" class="social-icon" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://github.com/keorgtz" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>
          </div>
        </div>
      </div>

      <!-- RIGHT: Contact Form -->
      <div class="contact-form-wrapper scroll-reveal" style="animation-delay:.1s">
        <form id="contact-form" class="contact-form">
          <div class="form-group">
            <label for="name" class="form-label">Nombre</label>
            <input type="text" id="name" name="name" required class="form-input" placeholder="Tu nombre completo">
          </div>
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" name="email" required class="form-input" placeholder="tu@email.com">
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Mensaje</label>
            <textarea id="message" name="message" rows="4" required class="form-input form-textarea" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
          </div>
          <button type="submit" class="btn-primary btn-submit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Enviar Mensaje
          </button>
        </form>
        <div id="form-success" class="form-success hidden">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <p>¡Mensaje enviado! Te contactaremos pronto.</p>
        </div>
      </div>

    </div>
  </div>
</section>
```

### 10.2 Decisión sobre IDs y script del form

Los IDs `#contact-form` y `#form-success` **se mantienen idénticos** para que el `<script>` inline del landing (líneas 925-941) siga funcionando sin cambios. EPIC 09 consolidará el script a `js/main.js`.

### 10.3 Decisión sobre validación HTML5

Los atributos `required` se mantienen. La validación HTML5 nativa del navegador funciona sin JS adicional. Esto cumple con WCAG 2.1 AA (validación accesible).

### 10.4 Adiciones al `Styles.css`

Ver EPIC 07/PART 02 para los estilos completos.

### 10.5 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- Resto del `<body>`.

---

## 11. Automated Test Plan

### AT-99 — Verificación de H2 preservado
- **Comando:** `grep -c "Hablemos de tu" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-100 — Verificación de subtítulo preservado
- **Comando:** `grep -c "Estamos listos para ayudarte" landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-101 — Verificación de los 4 datos de contacto
- **Comando:** `grep -E "(wa.me/523327633233|tel:\+523327633233|Kevin00ortizgtz@gmail.com|Guadalajara, México)" landing/index.html | wc -l`.
- **Pass criteria:** `≥ 4`.
- **Fallo:** `< 4`.

### AT-102 — Verificación de 4 social icons
- **Comando:** `grep -E "(fa-linkedin-in|fa-facebook-f|fa-instagram|fa-github)" landing/index.html | wc -l`.
- **Pass criteria:** `≥ 5` (1 por cada social icon + 1 para `fa-github` en footer o elsewhere).
- **Fallo:** `< 5`.

### AT-103 — Verificación de form con 3 inputs + IDs preservados
- **Comando:** `grep -E 'id="(contact-form|form-success|name|email|message)"' landing/index.html | wc -l`.
- **Pass criteria:** `5` (contact-form, form-success, name, email, message).
- **Fallo:** `< 5`.

### AT-104 — Verificación de labels asociados
- **Comando:** `grep -E 'for="(name|email|message)"' landing/index.html | wc -l`.
- **Pass criteria:** `3`.
- **Fallo:** `< 3`.

### AT-105 — Verificación de `rel="noopener noreferrer"` en WhatsApp
- **Comando:** `grep -E 'href="https://wa.me' landing/index.html | grep -c "noopener"`.
- **Pass criteria:** `≥ 1`.
- **Fallo:** `0`.

### AT-106 — Verificación de eliminación de Material Symbols en contacto
- **Comando:** `grep -E "^<.*(call|mail|location_on|send|check_circle).*" landing/index.html | wc -l` (solo dentro de la sección contacto, excluir hero u otros).
- **Pass criteria:** `0` en la sección contacto.
- **Fallo:** `> 0`.

### AT-107 — Verificación de `<a href="#">` en social icons (LinkedIn, Facebook, Instagram)
- **Comando:** `grep -E 'href="#" class="social-icon"' landing/index.html | wc -l`.
- **Pass criteria:** `≥ 3` (3 social icons sin link real).
- **Fallo:** `< 3`.

### AT-108 — Verificación de anchor `#contacto` preservado
- **Comando:** `grep -c 'id="contacto"' landing/index.html`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-109 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-142:** Abrir `landing/index.html` en Chrome 120+: la sección contacto tiene fondo con orbe sutil indigo.
- [ ] **MV-143:** El header tiene `.section-tag` "Contacto" con icono SVG (chat bubble).
- [ ] **MV-144:** El H2 "Hablemos de tu próximo proyecto." tiene "próximo proyecto." con gradient.
- [ ] **MV-145:** El subtítulo completo sobre clase mundial está visible.
- [ ] **MV-146:** Las 2 columnas se ven en grid horizontal (desktop).
- [ ] **MV-147:** **Columna izquierda** tiene 4 contact-info-items con iconos Font Awesome (WhatsApp) y SVG (Teléfono, Email, Ubicación).
- [ ] **MV-148:** Cada item tiene título (WhatsApp, Teléfono, Email, Ubicación) y dato asociado con link (excepto Ubicación que es texto).
- [ ] **MV-149:** Los iconos de cada item tienen color accent (verde, azul, púrpura, ámbar).
- [ ] **MV-150:** La sección "Síguenos" tiene 4 social icons (LinkedIn, Facebook, Instagram, GitHub).
- [ ] **MV-151:** Hover en social icons: background cambia a color accent, color blanco.
- [ ] **MV-152:** **Columna derecha** tiene form completo con 3 inputs (Nombre, Email, Mensaje) y botón submit "Enviar Mensaje".
- [ ] **MV-153:** Los inputs tienen labels asociados (`<label for="...">`) y placeholders.
- [ ] **MV-154:** Click en input activa focus con border-color accent (indigo) y glow sutil.
- [ ] **MV-155:** Submit button es full-width con icono SVG de "send" (papel avión).
- [ ] **MV-156:** Click en submit: form se "congela" 1s, se resetea, aparece success banner verde con check icon. Tras 5s el banner se oculta.
- [ ] **MV-157:** Click en WhatsApp link abre `https://wa.me/523327633233` en nueva pestaña.
- [ ] **MV-158:** Click en Phone link abre marcador del teléfono.
- [ ] **MV-159:** Click en Email link abre cliente de correo.
- [ ] **MV-160:** Renderizar en DevTools > iPhone 12 Pro: las 2 columnas colapsan a 1 (form debajo de info).
- [ ] **MV-161:** DevTools > Console: 0 errores.
- [ ] **MV-162:** DevTools > Lighthouse: sin regresión vs EPIC 06.
- [ ] **MV-163:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-21 — Comentarios de sección en `landing/index.html`

```html
<!-- ══ CONTACTO · EPIC 07 PART 01 ═════════════════════════════════════════ -->
<!-- 2-column layout: info (4 items + 4 social) + form (3 inputs + submit) -->
<!-- IDs #contact-form y #form-success preservados para el script inline -->
<!-- Glass-panel refactor de .contact-info-item y .contact-form-wrapper -->
<!-- rel="noopener noreferrer" añadido a WhatsApp y GitHub (W3C) -->
```

### TD-Output-22 — Documentación de IDs preservados

> Los IDs `#contact-form` y `#form-success` se mantienen idénticos para que el `<script>` inline del landing (líneas 925-941) siga funcionando sin cambios. EPIC 09 consolidará el handler del form a `js/main.js`.

---

## 14. User Documentation to produce

### UD-Output-20 — Mensaje de commit sugerido

```
feat(landing): rediseñar sección Contacto con glass-panel

- 2-column layout preservado (info + form).
- 4 contact-info-items con iconos Font Awesome (WhatsApp)
  y SVG inline (Teléfono, Email, Ubicación).
- 4 social icons con glass-panel + hover indigo.
- Form completo preservado: 3 inputs + submit + success banner.
- 5 iconos Material Symbols reemplazados por SVG inline.
- rel="noopener noreferrer" añadido a WhatsApp (W3C).
- IDs #contact-form y #form-success intactos (compatibilidad script).

Refs: .refi/modules/keorsoft-landing-redesign/epics/07-contact-form/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-117:** El `<section id="contacto">` mantiene su `id`.
- **AC-118:** El H2 "Hablemos de tu próximo proyecto." se preserva con gradient en "próximo proyecto.".
- **AC-119:** El subtítulo "Estamos listos para ayudarte..." se preserva verbatim.
- **AC-120:** Los 4 contact-info-items están presentes con sus datos verbatim (WhatsApp, Teléfono, Email, Ubicación).
- **AC-121:** Los 4 social icons están presentes con sus Font Awesome classes.
- **AC-122:** El form tiene 3 inputs (`#name`, `#email`, `#message`) con labels asociados.
- **AC-123:** Los IDs `#contact-form` y `#form-success` están preservados.
- **AC-124:** El submit button tiene icono SVG de "send" (papel avión) y texto "Enviar Mensaje".
- **AC-125:** El success banner tiene icono SVG de check y texto "¡Mensaje enviado! Te contactaremos pronto.".
- **AC-126:** Los 5 iconos Material Symbols están reemplazados por SVG inline.
- **AC-127:** El enlace WhatsApp tiene `target="_blank"` y `rel="noopener noreferrer"`.
- **AC-128:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-129:** DevTools > Lighthouse: Accessibility ≥ 95 (form es accesible con labels asociados y validación HTML5).
- **AC-130:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.
- **AC-131:** El `<script>` inline del landing (líneas 925-941) sigue funcionando con los IDs preservados.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Layout 2 columnas preservado. Form completo intacto. IDs preservados para compatibilidad con script inline. Refactor coherente con EPIC 03/04/05/06.
- [ ] **Gate 2 — Scope & Completeness Audit:** Copy preservado verbatim (header, 4 items, 4 social, form). 5 iconos SVG. Success banner preservado. `rel="noopener noreferrer"` añadido donde corresponde.
- [ ] **Gate 3 — UX/Design Review:** UX-P45 a UX-P49 resueltos según §5. Colores de iconos preservados (branding). Form accesible con labels asociados. Submit con animación de éxito.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Form submit funciona (preserva comportamiento del script inline). Links WhatsApp/Phone/Email funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 15 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________