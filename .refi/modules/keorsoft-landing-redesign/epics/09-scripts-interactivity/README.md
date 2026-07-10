# EPIC 09 — Scripts & Interactivity

> **Slug:** `09-scripts-interactivity`
> **Prioridad:** P1
> **Depende de:** EPIC 01, EPIC 02-08
> **Complejidad:** M
> **Estado:** `Planned` (PARTs detallados en Pass 2)
> **PARTs planned:** 2 · **PARTs detailed:** 2

---

## 1. Identidad

- **Propósito:** Consolidar todos los scripts del landing en un único `js/main.js` modular, eliminando el bloque `<script>` inline de `index.html` (líneas 849-942), y移植/adaptar la lógica del nuevo `KeorsoftLandingNEW/app.js`.

## 2. Goal

### Entrega
- `landing/js/main.js` (nuevo archivo, ~200 líneas) con módulos:
  1. **Mobile menu toggle** (hamburger ↔ X,移植 de NEW app.js líneas 6-20).
  2. **Hero terminal auto-typing** (移植 de NEW app.js líneas 22-69, con comandos Keorsoft/REASP).
  3. **Navbar scroll effect** (opcional — añadir `.scrolled` class al header cuando `scrollY > 50`, similar a REASP docs).
  4. **Scroll reveal** (IntersectionObserver,移植 del landing actual `index.html` líneas 889-899).
  5. **Active nav highlight** (移植 del landing actual líneas 902-923, adaptado a la nueva nav sin theme toggle).
  6. **Contact form handler** (移植 del landing actual líneas 925-941 a un módulo).
- `<script src="js/main.js" defer></script>` antes de `</body>`.
- Bloque `<script>` inline (líneas 849-942) **eliminado**.

### NO entrega
- No añade el simulador REASP ni el cotizador (fuera de scope).
- No añade theme toggle (eliminado en EPIC 08).

## 3. Scope

### Archivos que toca
- `landing/index.html` líneas 849-942 (bloque `<script>` inline) → **ELIMINADO**.
- `landing/index.html` antes de `</body>` → añade `<script src="js/main.js" defer></script>`.
- `landing/js/main.js` — **NUEVO ARCHIVO**.

### NO toca
- `landing/REASP/js/**` ni `landing/RACSP/js/**`.

## 4. Stakeholders

- **Owner:** Ryou EFI Planner → Ryou Orchestrator.
- **Reviewers:** Ryou Reviewer (Gate 4 — Runtime validation).

## 5. Acceptance Criteria (alto nivel)

- AC1: `landing/index.html` NO contiene un bloque `<script>` con `getElementById('theme-toggle')` ni `addEventListener('click', () => { html.setAttribute('data-theme'...)`.
- AC2: `landing/js/main.js` existe, es sintácticamente válido (`node --check`).
- AC3: Al cargar la página, el terminal del hero arranca typing a los 1.5s.
- AC4: Al click en hamburger, `.nav-menu` alterna clase `.active` y los spans se animan a X.
- AC5: El form de contacto sigue previniendo submit default + simulando envío + mostrando banner.
- AC6: Scroll reveal funciona en cards con clase `.scroll-reveal` (preservada del landing actual).

## 6. PARTs planned

| # | Slug | Title | Depende de |
|---|------|-------|-----------|
| 01 | `main-js-extract` | Extraer scripts inline a `js/main.js` con 6 módulos | EPIC 02-08 |
| 02 | `script-integration-test` | Validar todos los handlers en navegador real (Chrome, Edge, Firefox) | 01 |

## 7. Definition of Done

- `node --check landing/js/main.js` pasa sin errores.
- Test manual en navegador: terminal typing, hamburger, form submit, scroll reveal, active nav.
- Sin warnings en consola del navegador.

## 8. Open Questions / Risks

- **OQ1:** ¿Las 5-7 líneas del terminal son sobre REASP, sobre Keorsoft, o mezcla? Confirmar en Gate A. Asumido: REASP-centric con 1-2 comandos de Keorsoft genérico.
- **RK2:** Compatibilidad con navegadores viejos (IntersectionObserver no disponible → fallback). El landing actual ya tiene fallback (líneas 80-84 de REASP main.js移植).

## 9. Notes / References

- **Source scripts a consolidar:**
  - Landing actual: `index.html` líneas 849-942 (theme toggle, mobile menu, scroll reveal, active nav, form handler).
  - NEW landing: `app.js` líneas 1-340 (hamburger, terminal, REASP simulator, DS toggle, estimator, modal, form).
- **Comandos del terminal sugeridos (a confirmar):**
  ```
  $ npx reasp init --project keor-core
  → Initializing Ryou Enterprise Adaptive SDD Protocol (Reasp)...
  → ✔ Connected to OpenCode 1.17.17
  → ✔ Shielding modules deployed (0% Hallucination threshold active)
  $ reasp run build-architecture
  → Analyzing requirements: Enterprise CRM + MeridianUI tokens + Secure Infrastructure...
  → ✔ Generated 24 microservices with zero hallucinated components
  ```
- **Orden de módulos en `main.js`:** Mobile menu → Terminal → Navbar scroll → Scroll reveal → Active nav → Form handler.