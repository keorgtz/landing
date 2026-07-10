# EPIC 02 — Hero & Stats Strip

> **Slug:** `02-hero-stats`
> **Prioridad:** P1
> **Depende de:** EPIC 01
> **Complejidad:** B
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Rediseñar el hero del landing principal con el estilo de `KeorsoftLandingNEW/` (terminal visualizer animado + hero-badges) preservando el copy actual.

## 2. Goal

### Entrega
- `<section id="inicio">` reescrito con la estructura de hero de `KeorsoftLandingNEW/index.html` (líneas 58-107) adaptado al contenido del landing actual.
- Terminal visualizer animado (auto-typing) con 5-7 líneas de script sobre comandos típicos de Keorsoft (ej. `reasp init --project keor-core`, `npx opencode plugin sync`, etc.).
- Hero-badges reemplazando la stats-strip separada: 4 stats (360°, 100%, 24/7, Calidad) en formato de badges del nuevo estilo.
- 2 CTAs preservados: WhatsApp primary + "Ver Productos" secondary.

### NO entrega
- No modifica la sección `<nosotros>`, servicios, productos, etc. (esos son EPICs independientes).
- No añade cotizador ni simulador REASP (fuera de scope, ver `request.md`).

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 70-152 (sección hero actual).
- `landing/index.html` líneas 154-179 (stats strip actual → integrado como hero-badges).
- `landing/css/Styles.css` — bloque `.hero` + `.hero-content` + `.hero-visual` + `.hero-visual-card` + `.terminal-content` + `.mac-buttons` + `.pulse-dot` (移植 de NEW líneas 397-585).
- `landing/js/main.js` (creado en EPIC 09) — función `typeTerminalLine` 移植 de `KeorsoftLandingNEW/app.js` líneas 22-69.

### NO toca
- Secciones posteriores a la 154 (la primera mitad del hero).
- `landing/REASP/**` ni `landing/RACSP/**`.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 3 — UX/Design Review), Ryou Architect (Gate 1 — coherencia con tokens).

## 5. Acceptance Criteria (alto nivel)

- AC1: La sección `#inicio` ocupa `min-height: 85vh` (igual que NEW) y centra verticalmente.
- AC2: El hero-title usa `linear-gradient(135deg, #ffffff 40%, #a5b4fc 70%, var(--accent-cyan) 100%)` (移植 de NEW línea 418).
- AC3: El terminal visualizer arranca a los 1.5s de carga y completa 5-7 líneas de output.
- AC4: Las 4 stats (360°, 100%, 24/7, Calidad) están presentes como `.hero-badges` en la parte inferior del hero.
- AC5: El CTA "Hablemos de tu Proyecto" sigue apuntando a `https://wa.me/523327633233`.
- AC6: El CTA "Ver Productos" sigue apuntando a `#productos`.

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `hero-markup` | Reescribir `<section id="inicio">` con la nueva estructura | EPIC 01 |
| 02 | `hero-styles-and-terminal` | CSS de hero + script de terminal auto-typing | 01 |

## 7. Definition of Done

- Hero responsive en 4 breakpoints (320, 768, 1024, 1440).
- Animación de terminal probada en Chrome, Edge, Firefox (soporte de `font-feature-settings` no requerido).
- Sin regresión de accesibilidad: el terminal tiene `aria-label` o texto alternativo para screen readers.

## 8. Open Questions / Risks

- **OQ1:** ¿Las 5-7 líneas del terminal son sobre REASP, sobre Keorsoft genérico, o mezcla? (Recomendación: REASP-centric, ya que el público target es devs que usan REASP.)
- **RK2 (heredado):** Responsive del hero al pasar de grid `1.2fr 1fr` a `1fr` en mobile.

## 9. Notes / References

- **Copy a preservar verbatim:**
  - Badge superior: "Tecnología de Clase Mundial" (con icono `rocket_launch`).
  - H1: "No solo servicios. Construimos tecnología." (con `.text-gradient` solo en "tecnología").
  - Subtítulo: párrafo actual sobre Keorsoft.
  - Chips: "Software Development", "AI Tools", "UI Frameworks", "SaaS Products".
- **Copy a移植 del NEW:** título "Construimos la Arquitectura Tecnológica de tu Empresa." NO se移植. Se usa el actual del usuario.
- **Estructura移植 del NEW:** `index.html` líneas 58-107, `styles.css` líneas 397-585, `app.js` líneas 22-69.