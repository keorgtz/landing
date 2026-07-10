# EPIC 07 — Contacto & Form

> **Slug:** `07-contact-form`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** M
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Rediseñar la sección de contacto del landing con el estilo glass-panel, **manteniendo los 4 items de info (WhatsApp, Teléfono, Email, Ubicación), las 4 redes sociales (LinkedIn, Facebook, Instagram, GitHub), y el formulario completo**.

## 2. Goal

### Entrega
- `<section id="contacto">` reescrita con layout de 2 columnas (info | form) usando glass-panel.
- 4 contact-info-items con sus iconos y datos exactos:
  - WhatsApp: `+52 33 2763 3233` → `https://wa.me/523327633233`
  - Teléfono: `+52 33 2763 3233` → `tel:+523327633233`
  - Email: `Kevin00ortizgtz@gmail.com` → `mailto:Kevin00ortizgtz@gmail.com`
  - Ubicación: "Guadalajara, México" (texto, sin link)
- 4 social icons preservados (LinkedIn, Facebook, Instagram, GitHub).
- Form con 3 campos: `name`, `email`, `message` + botón "Enviar Mensaje".
- Comportamiento del form: simulación client-side (sin backend, como hasta ahora). Éxito muestra banner verde por 5s.

### NO entrega
- No añade backend real para el envío (es simulación client-side como en el landing actual).
- No reemplaza por un modal (decisión de scope: el usuario quiere preservar la sección en página).

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 670-767 (sección contacto actual).
- `landing/css/Styles.css` — bloque `.contact-info-item` + `.contact-form-wrapper` con glassmorphism + `.form-input`移植 de NEW `.form-input` (líneas 1396-1414).

### NO toca
- Otras secciones.
- El `<script>` del form (eso se mueve a `js/main.js` en EPIC 09).

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX), Ryou Reviewer (Gate 5 — Defectos, validación form).

## 5. Acceptance Criteria (alto nivel)

- AC1: 4 contact-info-items visibles con icono + texto + (opcional) link.
- AC2: Form con 3 inputs (`name`, `email`, `message`) + botón submit.
- AC3: Validación HTML5 (`required`, `type=email`) preservada.
- AC4: Submit handler: previene default, simula envío 1s, muestra banner éxito 5s.
- AC5: 4 social icons con hover effect (cambia a `var(--kr-blue)` o `--accent-indigo`).
- AC6: Form accesible: labels asociados con `for`, focus visible, navegación por teclado.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `contact-markup` | Reescribir markup de la sección con 2 columnas glass-panel | EPIC 01 |
| 02 | `contact-styles` | CSS de contact-info + contact-form-wrapper + form-input | 01 |

## 7. Definition of Done

- Sección responsive (1 col en mobile, 2 col en desktop).
- Form accesible WCAG 2.1 AA (labels, focus, contraste).
- Submit handler extraído a `js/main.js` (EPIC 09).

## 8. Open Questions / Risks

- **OQ1:** Confirmar que LinkedIn, Facebook, Instagram actualmente apuntan a `#` (sin link real). Verificado: sí, líneas 732-734.
- **RK5:** Mantener meta description y OG tags intactos al modificar `<head>`.

## 9. Notes / References

- **Copy a preservar verbatim:**
  - Título: "Hablemos de tu próximo proyecto."
  - Subtítulo: "Estamos listos para ayudarte a transformar tu negocio con tecnología de clase mundial."
  - Labels form: "Nombre", "Email", "Mensaje".
  - Placeholders: "Tu nombre completo", "tu@email.com", "Cuéntanos sobre tu proyecto...".
- **Form submit logic actual:** `index.html` líneas 925-941 (prevenir default, opacity 0.5, setTimeout 1s, reset, mostrar banner, setTimeout 5s para ocultar). Se移植 tal cual a `js/main.js` en EPIC 09.