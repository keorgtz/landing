# PART 02 — Contact Styles (Contacto & Form)

> **EPIC:** 07-contact-form
> **Slug:** `contact-styles`
> **Prioridad:** P1
> **Depende de:** EPIC 07 PART 01 (Contact Markup)
> **Complejidad:** B
> **Owner:** Ryou EFI Planner → Ryou Orchestrator → Ryou Reviewer

---

## 1. Purpose

Añadir al `landing/css/Styles.css` los estilos para la sección Contacto: `.contact-grid` (layout 2 columnas), `.contact-info-list` y `.contact-info-item` (refactor glass-panel), `.contact-info-icon` con 4 variants (whatsapp/phone/email/location), `.contact-info-title/link/text`, `.contact-social` y `.contact-social-icons`, `.contact-form-wrapper` (refactor glass-panel), `.contact-form` y `.form-group`, `.form-label`, `.form-input` (refactor), `.form-textarea`, `.btn-submit`, `.form-success`, y refactor de `.social-icon` (glass-panel + hover indigo).

---

## 2. Current State

### 2.1 `landing/css/Styles.css` tras EPIC 06

Estado actual del archivo (después de EPIC 06):
- ~800-900 líneas (estimación tras EPIC 01-06).
- Contiene: `:root` con 17 tokens, reset, tipografía, `.glass-panel`, `.bg-glow-container`, `.btn-primary`, `.btn-secondary`, `.hero*`, `.terminal*`, `.about-card*`, `.pillar-card*`, `.product-card*`, `.oss-card*`, `.sc-icon`, `.feature-row`, `.oss-banner`, `.btn-outline`, `.btn-cta-purple`, `.btn-cta-orange`, `.badge*`, `.racsp-codeblock*`, `.cb-*`, etc.
- **NO contiene todavía:** `.contact-grid`, `.contact-info-list`, `.contact-info-icon*`, `.contact-info-title/link/text`, `.contact-social`, `.contact-form-wrapper` (refactor), `.contact-form`, `.form-group`, `.form-label`, `.form-textarea`, `.btn-submit`, `.form-success`.
- `.form-input` **existe** (definido en EPIC 01 base) pero puede necesitar ajustes para mejor dark-mode contrast.
- `.social-icon` **existe** (líneas 392-410 original) pero usa `var(--bg-3)`; se移植 a glass-panel.

### 2.2 `landing/index.html` tras EPIC 07/PART 01

- `<section id="contacto">` reescrito con 2 columnas.
- Clases nuevas usadas: `.contact-grid`, `.contact-info-list`, `.contact-info-item`, `.contact-info-icon` (con 4 variants), `.contact-info-title`, `.contact-info-link`, `.contact-info-text`, `.contact-social`, `.contact-social-title`, `.contact-social-icons`, `.contact-form-wrapper`, `.contact-form`, `.form-group`, `.form-label`, `.form-input`, `.form-textarea`, `.btn-submit`, `.form-success`, `.social-icon` (refactor).

### 2.3 Decisiones de EPIC 07/PART 01 que requieren CSS

- `.contact-info-icon` con 4 variants (whatsapp verde, phone azul, email púrpura, location ámbar).
- Refactor de `.social-icon` a glass-panel + hover indigo.
- `.contact-form-wrapper` glass-panel.
- `.form-input` con `background: var(--bg-tertiary)` (más oscuro que `--bg-3` para dark mode).
- `.form-success` con `.hidden` class (Tailwind utility que移植 a CSS).
- `.btn-submit` full-width.

---

## 3. Comparison against baseline

### 3.1移植 directa vs nueva

| Clase | Origen | Notas |
|-------|--------|-------|
| `.contact-grid` | NUEVA | Grid 2 cols → 1 col en 1024px |
| `.contact-info-list` | NUEVA | Layout column con gap |
| `.contact-info-item` | REFACTOR | Mantiene display flex, items center, gap 16px |
| `.contact-info-icon` | NUEVA | Caja 48×48 con color accent |
| `.contact-info-icon-whatsapp/phone/email/location` | NUEVAS | 4 variants con colores accent |
| `.contact-info-title` | NUEVA | font-bold text-sm |
| `.contact-info-link` | NUEVA | color text-secondary, hover indigo |
| `.contact-info-text` | NUEVA | Sin link (para Ubicación) |
| `.contact-social` | NUEVA | Margin-top + border-top |
| `.contact-social-title` | NUEVA | font-bold text-sm |
| `.contact-social-icons` | NUEVA | flex con gap |
| `.social-icon` | REFACTOR | Glass-panel + hover indigo |
| `.contact-form-wrapper` | REFACTOR | Glass-panel |
| `.contact-form` | NUEVA | Layout flex column |
| `.form-group` | NUEVA | display flex column |
| `.form-label` | REFACTOR | text-xs uppercase tracking-wider |
| `.form-input` | REFACTOR | Mantener estructura, ajustar colores |
| `.form-textarea` | NUEVA | min-height 120px, resize vertical |
| `.btn-submit` | NUEVA | width 100%, flex center |
| `.form-success` | NUEVA | Glass-panel verde |

### 3.2 Refactor de `.social-icon`

Actual (líneas 392-410 original):
```css
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-3);
  border: 1px solid var(--card-border);
  color: var(--txt-2);
  font-size: 16px;
  transition: all 0.2s ease;
}
.social-icon:hover {
  background: var(--kr-blue);
  border-color: var(--kr-blue);
  color: #ffffff;
  transform: translateY(-2px);
}
```

Refactor:
```css
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 16px;
  transition: all 0.2s ease;
}
.social-icon:hover {
  background: var(--accent-indigo);
  border-color: var(--accent-indigo);
  color: #ffffff;
  transform: translateY(-2px);
}
```

### 3.3 Refactor de `.form-input`

Actual (líneas 372-390 original):
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--card-border);
  background: var(--bg-3);
  color: var(--txt-1);
  font-size: 14px;
  font-family: var(--font);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.form-input::placeholder {
  color: var(--txt-3);
}
.form-input:focus {
  border-color: var(--kr-blue);
  box-shadow: 0 0 0 3px rgba(14,152,248,.15);
}
```

Refactor:
```css
.form-input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-sans);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.form-input::placeholder {
  color: var(--text-muted);
}
.form-input:focus {
  border-color: var(--accent-indigo);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}
```

---

## 4. Missing / Required Scope

### 4.1 Lo que ESTÁ en el scope

- Añadir al `Styles.css` el bloque 8.AB con ~150 líneas:
  - `.contact-grid` (layout 2 cols → 1 col en 1024px).
  - `.contact-info-list` + `.contact-info-item` (refactor).
  - `.contact-info-icon` base + 4 variants.
  - `.contact-info-title` + `.contact-info-link` + `.contact-info-text`.
  - `.contact-social` + `.contact-social-title` + `.contact-social-icons`.
  - `.social-icon` (refactor glass-panel).
  - `.contact-form-wrapper` (refactor glass-panel).
  - `.contact-form` + `.form-group` + `.form-label`.
  - `.form-input` (refactor colores).
  - `.form-textarea`.
  - `.btn-submit` (full-width).
  - `.form-success` (glass-panel verde).
  - `.hidden` utility (reemplazo de Tailwind `hidden`).
- Responsive: `@media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }`.
- Refactor de `.social-icon` y `.form-input` (existen en Styles.css).

### 4.2 Lo que NO está en el scope

- **NO** se modifica el markup del EPIC 07/PART 01.
- **NO** se modifica el `<script>` inline del form (sigue funcionando con IDs preservados).
- **NO** se consolidan scripts (EPIC 09).
- **NO** se añade backend real.

---

## 5. UX Problems

### UX-P50 — Hover de `.social-icon` cambia a indigo unificado
El hover actual cambia a `--kr-blue` (azul corporativo). El refactor cambia a `--accent-indigo` (más oscuro). **Decisión:** refactor a indigo (consistente con EPIC 04/05/06).

### UX-P51 — Form input focus con `--accent-indigo` y glow sutil
Mantener comportamiento (es estándar).

### UX-P52 — Success banner aparece con animación o inmediato
Actual aparece inmediato tras 1s de "submit". Sin animación de entrada. **Decisión:** mantener comportamiento (sin cambios).

### UX-P53 — `.btn-submit` con `flex items-center justify-center`移植
Botón submit necesita centrar texto e icono. **Decisión:** usar `.btn-primary` con override `width: 100%`.

### UX-P54 — `.hidden` utility移植
Tailwind `hidden` (display: none)移植 a `.hidden { display: none; }`.

---

## 6. Backend / Logic Problems

N/A — CSS únicamente.

---

## 7. Frontend / Presentation Problems

### Front-P57 — `bg-X-500/10 text-X-500` en iconos移植
4 iconos con colores específicos. CSS por variant.

### Front-P58 — `hover:text-[color:var(--kr-blue)]` en contact-info-link移植
Hover cambia a `--accent-indigo`.

### Front-P59 — `space-y-6` y `space-y-4`移植 a CSS con `gap`
Línea 687 (`space-y-6`), 742 (`space-y-4`). CSS con `display: flex; flex-direction: column; gap: 1.5rem` o `1rem`.

### Front-P60 — `w-full` en submit button移植 a CSS
Línea 755: `w-full`. CSS con `width: 100%`.

### Front-P61 — `resize-none` en textarea移植
Línea 753: `resize-none`. CSS con `resize: none`.

### Front-P62 — `flex items-center justify-center gap-2.5` en submit button移植
移植 a `.btn-submit` con `display: flex; align-items: center; justify-content: center; gap: 0.625rem`.

### Front-P63 — `px-8 py-4 rounded-2xl` en submit button移植
移植 a `.btn-submit` con `padding: 1rem 2rem; border-radius: 16px`.

---

## 8. Technical Debt

### TD-36 — Refactor de `.social-icon` cambia color de hover (azul → indigo)
Documentar en commit message. Cambio intencional (consistencia con EPIC 04/05/06).

### TD-37 — `.form-input` refactor usa `--bg-tertiary` en lugar de `--bg-3`
`--bg-tertiary` es más oscuro que `--bg-3`. En dark mode, mejor contraste. En light mode (si se mantiene), puede ser muy oscuro. **Decisión:** aceptar (dark-only confirmado).

### TD-38 — `.btn-submit` es wrapper de `.btn-primary` con override
Aceptable duplicación parcial; alternativa es `.btn-primary` directamente con width: 100%.

### TD-39 — `.hidden` utility usada en form-success y mobile menu
Mantener `.hidden { display: none; }` para compatibilidad con Tailwind utility (prevenir regresión).

---

## 9. Required Improvements

Cada bullet sigue el patrón `verbo + objeto + medida verificable`.

- **RI-113:** Añadir el **bloque 8.AB "Contact · EPIC 07 PART 02"** al `Styles.css` con ~150 líneas que cubran `.contact-grid`, `.contact-info-*`, `.contact-form-*`, `.form-success`, `.btn-submit` — verificable con `Select-String -Path landing/css/Styles.css -Pattern "^\.(contact|form-|btn-submit)" | Measure-Object` que retorna ≥ 12 matches.
- **RI-114:** Refactor de `.social-icon` con **glass-panel** (background `rgba(11, 15, 23, 0.45)`, `backdrop-filter: blur(8px)`) — verificable con `grep -A 3 "^\.social-icon {" landing/css/Styles.css` que retorna el background glass-panel.
- **RI-115:** Hover de `.social-icon` cambia a `--accent-indigo` (no `--kr-blue`) — verificable con `grep -A 4 "^\.social-icon:hover" landing/css/Styles.css` que retorna `background: var(--accent-indigo)`.
- **RI-116:** 4 variants de `.contact-info-icon` con colores específicos (whatsapp verde, phone azul, email púrpura, location ámbar) — verificable con `grep -c "contact-info-icon-" landing/css/Styles.css` que retorna `≥ 5` (base + 4 variants).
- **RI-117:** `.form-input` refactor usa `--bg-tertiary` y `--text-primary` (no `--bg-3` y `--txt-1`) — verificable con `grep "var(--bg-tertiary)" landing/css/Styles.css` que retorna `≥ 1` en `.form-input`.
- **RI-118:** `.form-input:focus` usa `--accent-indigo` (no `--kr-blue`) — verificable con `grep "form-input:focus" landing/css/Styles.css` que retorna `border-color: var(--accent-indigo)`.
- **RI-119:** `.btn-submit` con `width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.625rem;` — verificable con `grep -A 4 "^\.btn-submit {" landing/css/Styles.css` que retorna el bloque correcto.
- **RI-120:** `.form-success` con color verde (background `rgba(16, 185, 129, 0.1)`, color `--accent-emerald`) — verificable con `grep -A 3 "^\.form-success {" landing/css/Styles.css`.
- **RI-121:** Mantener `.hidden { display: none; }` utility — verificable con `grep "^\.hidden {" landing/css/Styles.css` que retorna `1`.
- **RI-122:** Responsive `@media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }` — verificable con `grep "max-width: 1024px.*contact-grid\|contact-grid.*max-width: 1024px" landing/css/Styles.css` que retorna match.
- **RI-123:** Sin regresión en `landing/REASP/**` ni `landing/RACSP/**` — verificable con `git diff --stat landing/REASP/ landing/RACSP/` vacío.

---

## 10. Implementation Plan

### 10.1 Bloque CSS a añadir al `Styles.css`

Bloque 8.AB (después del bloque 8.AA de EPIC 06):

```css
/* ============================================
   8.AB Contact · EPIC 07 PART 02
   2-column layout: info + form.
   Glass-panel refactor of .social-icon + .form-input.
   New: .contact-info-icon (4 variants), .form-success.
   ============================================ */

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 64rem;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
}

.contact-info-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-info-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: var(--accent-emerald);
  font-size: 20px;
}

.contact-info-icon-whatsapp {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: var(--accent-emerald);
}

.contact-info-icon-phone {
  background: rgba(14, 152, 248, 0.1);
  border: 1px solid rgba(14, 152, 248, 0.2);
  color: #0E98F8;
}

.contact-info-icon-email {
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
  color: var(--accent-purple);
}

.contact-info-icon-location {
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.2);
  color: var(--accent-amber);
}

.contact-info-title {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.contact-info-link {
  color: var(--text-secondary);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-info-link:hover {
  color: var(--accent-indigo);
}

.contact-info-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.contact-social {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-light);
}

.contact-social-title {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.contact-social-icons {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Social icon (refactor glass-panel) */
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border-light);
  color: var(--text-secondary);
  font-size: 16px;
  transition: all 0.2s ease;
  text-decoration: none;
}

.social-icon:hover {
  background: var(--accent-indigo);
  border-color: var(--accent-indigo);
  color: #ffffff;
  transform: translateY(-2px);
}

/* Form wrapper (refactor glass-panel) */
.contact-form-wrapper {
  background: rgba(11, 15, 23, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border-light);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 0.875rem;
  font-family: var(--font-sans);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.form-input::placeholder {
  color: var(--text-muted);
}

.form-input:focus {
  border-color: var(--accent-indigo);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-textarea {
  min-height: 120px;
  resize: vertical;
  font-family: var(--font-sans);
}

.btn-submit {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  padding: 1rem 2rem;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.875rem;
}

.form-success {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: var(--accent-emerald);
  font-size: 0.875rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Hidden utility (reemplazo de Tailwind hidden) */
.hidden {
  display: none !important;
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
```

### 10.2 Refactor de `.social-icon` y `.form-input`

**Importante:** estos refactors reemplazan las definiciones existentes. El usuario debe verificar que las definiciones previas (en `Styles.css`) no se duplican.

Si las definiciones previas persisten:
- Buscar la regla `.social-icon { ... }` anterior y ELIMINARLA (mantener solo la nueva).
- Buscar la regla `.form-input { ... }` anterior y ELIMINARLA (mantener solo la nueva).

### 10.3 Decisión sobre `--bg-tertiary` para `.form-input`

`--bg-tertiary: #121824` (del NEW styles.css línea 7) es más oscuro que `--bg-3: #f1f5f9` (light) o `#0a1628` (dark actual). En dark mode, queda más oscuro y mejora contraste con el texto blanco del input.

### 10.4 Archivos a NO TOCAR

- `landing/REASP/**` — intacto.
- `landing/RACSP/**` — intacto.
- `landing/index.html` (markup ya está en EPIC 07/PART 01).

---

## 11. Automated Test Plan

### AT-110 — Verificación de bloque CSS移植
- **Comando:** `Select-String -Path landing/css/Styles.css -Pattern "^\.(contact|form-|btn-submit)" | Measure-Object`.
- **Pass criteria:** ≥ 12 matches.
- **Fallo:** < 12.

### AT-111 — Verificación de glass-panel en `.social-icon`
- **Comando:** `grep -A 5 "^\.social-icon {" landing/css/Styles.css | grep -c "backdrop-filter"`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-112 — Verificación de hover indigo en `.social-icon`
- **Comando:** `grep -A 3 "^\.social-icon:hover" landing/css/Styles.css | grep -c "accent-indigo"`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-113 — Verificación de 4 variants de `.contact-info-icon`
- **Comando:** `grep -c "contact-info-icon-" landing/css/Styles.css`.
- **Pass criteria:** `≥ 5` (base + 4 variants).
- **Fallo:** `< 5`.

### AT-114 — Verificación de `.form-input` refactor
- **Comando:** `grep "var(--bg-tertiary)" landing/css/Styles.css`.
- **Pass criteria:** `≥ 1` en `.form-input`.
- **Fallo:** `0`.

### AT-115 — Verificación de `.form-input:focus` indigo
- **Comando:** `grep -A 2 "form-input:focus" landing/css/Styles.css | grep -c "accent-indigo"`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-116 — Verificación de `.form-success`
- **Comando:** `grep -A 5 "^\.form-success {" landing/css/Styles.css`.
- **Pass criteria:** Contiene `color: var(--accent-emerald)`.
- **Fallo:** Sin color emerald.

### AT-117 — Verificación de `.hidden` utility
- **Comando:** `grep "^\.hidden {" landing/css/Styles.css`.
- **Pass criteria:** `1`.
- **Fallo:** `0`.

### AT-118 — Verificación de responsive 1024px
- **Comando:** `grep "max-width: 1024px.*contact-grid\|contact-grid.*max-width: 1024px" landing/css/Styles.css`.
- **Pass criteria:** `1` match.
- **Fallo:** `0`.

### AT-119 — Verificación de no-regresión REASP/RACSP
- **Comando:** `git diff --stat landing/REASP/ landing/RACSP/`.
- **Pass criteria:** Vacío.
- **Fallo:** Cualquier cambio.

---

## 12. Manual Validation Checklist

Checklist para Ryou Reviewer (Gate 4):

- [ ] **MV-164:** Abrir `landing/index.html` en Chrome 120+: la sección contacto tiene 2 columnas con la info a la izquierda y el form a la derecha.
- [ ] **MV-165:** Los 4 contact-info-items tienen iconos con colores accent (verde WhatsApp, azul Phone, púrpura Email, ámbar Location).
- [ ] **MV-166:** Los iconos Font Awesome (whatsapp) y SVG (phone, mail, location) se ven correctamente.
- [ ] **MV-167:** Hover en WhatsApp link: color cambia a indigo.
- [ ] **MV-168:** Hover en social icons: background se vuelve indigo, color blanco, translateY -2px.
- [ ] **MV-169:** El form tiene 3 inputs con labels asociados (click en label enfoca input).
- [ ] **MV-170:** Focus en input: border-color indigo + glow sutil.
- [ ] **MV-171:** Submit button full-width con icono "send" y texto "Enviar Mensaje".
- [ ] **MV-172:** Click en submit: form se "congela" (opacity 0.5) 1s, luego se resetea y aparece success banner verde.
- [ ] **MV-173:** Success banner desaparece tras 5s.
- [ ] **MV-174:** Click en WhatsApp link abre `https://wa.me/523327633233` en nueva pestaña con `rel="noopener noreferrer"`.
- [ ] **MV-175:** Renderizar en DevTools > iPhone 12 Pro: las 2 columnas colapsan a 1 (info arriba, form abajo).
- [ ] **MV-176:** DevTools > Console: 0 errores.
- [ ] **MV-177:** DevTools > Lighthouse: sin regresión vs EPIC 06.
- [ ] **MV-178:** `landing/REASP/index.html` y `landing/RACSP/index.html` siguen idénticos.

---

## 13. Technical Documentation to produce

### TD-Output-23 — Comentarios en `Styles.css`

Cabecera del bloque 8.AB:
```css
/* ============================================
   8.AB Contact · EPIC 07 PART 02
   2-column layout: info + form.
   Glass-panel refactor of .social-icon + .form-input.
   New: .contact-info-icon (4 variants), .form-success.
   Hidden utility preserved (replaces Tailwind hidden).
   ============================================ */
```

### TD-Output-24 — Documentación de refactor

> **Refactor de `.social-icon`:** cambia de `background: var(--bg-3)` a `background: rgba(11, 15, 23, 0.45); backdrop-filter: blur(8px);` (glass-panel). Hover cambia de `--kr-blue` a `--accent-indigo`.
>
> **Refactor de `.form-input`:** cambia de `background: var(--bg-3)` a `var(--bg-tertiary)` (más oscuro en dark mode). Focus usa `--accent-indigo` en lugar de `--kr-blue`.

---

## 14. User Documentation to produce

### UD-Output-21 — Mensaje de commit sugerido

```
feat(landing): añadir estilos de Contacto con glass-panel

- Bloque 8.AB de Styles.css con .contact-grid (2 cols),
  .contact-info-list, .contact-info-item, .contact-info-icon
  (4 variants: whatsapp, phone, email, location).
- Form: .contact-form-wrapper glass-panel + .form-input refactor
  (--bg-tertiary, --accent-indigo focus).
- Social icons: glass-panel + hover indigo (refactor de --kr-blue).
- Success banner: .form-success glass-panel verde.
- Submit button: .btn-submit full-width.
- Responsive: 2 cols → 1 col en 1024px.

Refs: .refi/modules/keorsoft-landing-redesign/epics/07-contact-form/
```

---

## 15. Acceptance Criteria

Cada criterio es **testable**.

- **AC-132:** El `Styles.css` contiene `.contact-grid`, `.contact-info-list`, `.contact-info-item`, `.contact-info-icon`, `.contact-info-icon-whatsapp/phone/email/location`, `.contact-info-title`, `.contact-info-link`, `.contact-info-text`, `.contact-social`, `.contact-social-title`, `.contact-social-icons`, `.contact-form-wrapper`, `.contact-form`, `.form-group`, `.form-label`, `.form-textarea`, `.btn-submit`, `.form-success`.
- **AC-133:** `.social-icon` refactor usa `background: rgba(11, 15, 23, 0.45); backdrop-filter: blur(8px);` (glass-panel).
- **AC-134:** `.social-icon:hover` usa `background: var(--accent-indigo)` (no `--kr-blue`).
- **AC-135:** `.form-input` usa `background: var(--bg-tertiary)` (no `--bg-3`).
- **AC-136:** `.form-input:focus` usa `border-color: var(--accent-indigo)` (no `--kr-blue`).
- **AC-137:** Los 4 contact-info-icon variants tienen colores accent correctos.
- **AC-138:** `.form-success` tiene `color: var(--accent-emerald)` y fondo `rgba(16, 185, 129, 0.1)`.
- **AC-139:** `.btn-submit` tiene `width: 100%; display: flex; align-items: center; justify-content: center;`.
- **AC-140:** Existe `@media (max-width: 1024px) { .contact-grid { grid-template-columns: 1fr; gap: 3rem; } }`.
- **AC-141:** `.hidden { display: none !important; }` utility preservado.
- **AC-142:** DevTools > Console en Chrome 120+ NO muestra errores.
- **AC-143:** El `<script>` inline del form sigue funcionando (form submit, success banner).
- **AC-144:** DevTools > Lighthouse: Accessibility ≥ 95 (form es accesible).
- **AC-145:** `git diff --stat landing/REASP/ landing/RACSP/` retorna vacío.

---

## Footer — 8 Quality Gates

- [ ] **Gate 1 — Architecture Review:** Layout 2 columnas preservado. Refactors coherentes con EPIC 03-06. Tokens accent usados correctamente. IDs preservados para compatibilidad con script.
- [ ] **Gate 2 — Scope & Completeness Audit:** Bloque 8.AB con ~150 líneas. 4 variants de icon. Refactor de social-icon y form-input. Success banner con color emerald.
- [ ] **Gate 3 — UX/Design Review:** UX-P50 a UX-P54 resueltos según §5. Hover indigo coherente. Focus indigo coherente. Form accesible.
- [ ] **Gate 4 — Manual / Runtime Validation:** Checklist §12 ejecutado. `grep` confirma todos los comandos de §11. DevTools Console 0 errores. Form submit funciona. Links WhatsApp/Phone/Email/GitHub funcionales.
- [ ] **Gate 5 — Defect Closure:** Cualquier defecto de Gates 1-4 cerrado en este PART.
- [ ] **Gate 6 — Technical Documentation:** Comentarios de cabecera (§13) presentes. Refactors documentados.
- [ ] **Gate 7 — User Documentation:** Mensaje de commit (§14.1) redactado.
- [ ] **Gate 8 — Final Review & Sign-off:** Las 14 Acceptance Criteria §15 verificadas. Build 0 errores. Sin regresión. Firma del footer.

**Firma:** ______________  **Fecha:** ______________