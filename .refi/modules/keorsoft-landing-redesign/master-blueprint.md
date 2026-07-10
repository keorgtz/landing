# master-blueprint.md — Keorsoft Landing Redesign + REASP Docs Update

> **Packet:** `keorsoft-landing-redesign`
> **Versión:** 1.0 (Pass 1 · pre Gate A)
> **Fecha:** 2026-07-09

---

## 1. Problema

El usuario ha realizado cambios importantes en el framework **REASP** durante los últimos días (sesiones 3, 4 y 5: soporte de proveedores, multi-agente, REFI v2 Epic + PART, hardened install, share/unshare bridges) y simultáneamente ha desarrollado un **nuevo estilo visual** para su landing principal en `KeorsoftLandingNEW/`.

El estado actual del sitio `KeorsoftLanding/landing/` está desincronizado en dos dimensiones:

1. **REASP docs desactualizadas** — siguen mostrando el flujo de instalación antiguo (`git clone + node index.js`), no mencionan soporte multi-proveedor, no documentan REFI v2, no listan los 5 agentes soportados, no reflejan la versión real del CLI (`1.0.1`), y faltan los bridges `/share`/`/unshare`, troubleshooting de PATH, compatibilidad Linux/Unix, y el instalador global de MeridianUI.

2. **Landing principal de Keorsoft con estilo desfasado** — sigue usando Tailwind CSS + Material Symbols Rounded + pill nav + dual theme (light/dark), mientras el usuario ya cuenta con un nuevo lenguaje visual maduro en `KeorsoftLandingNEW/` (glass panels, sticky nav, terminal visualizer, Outfit+Inter+Fira Code, dark-only, 3 pilares).

El usuario quiere planificar ambos cambios **antes de implementar**, preservando la información del landing y el estilo de la página REASP/RACSP.

---

## 2. Goal

### Objetivo funcional

- **R-A:** Documentar en `landing/REASP/index.html` y `landing/REASP/docs.html` los cambios reales de REASP desde la sesión 2 (Linux/MeridianUI), sesión 3 (Provider Support) y sesiones 4-5 (hardened install, REFI v2), **manteniendo intacto** el lenguaje visual actual (Phosphor Icons, dark `#050505`, sidebar de docs).

- **R-B:** Rediseñar `landing/index.html` y `landing/css/Styles.css` adoptando el lenguaje visual de `KeorsoftLandingNEW/` (glass panels, sticky nav, terminal hero, Outfit+Inter+Fira Code), **preservando verbatim** toda la información actual: copy, secciones (Inicio, Servicios, Productos, Open Source, Nosotros, Contacto), productos (MeridianUI, Controls & Libraries, SHEndevour, REASP, RACSP), formulario de contacto, footer con 4 columnas y datos de contacto (WhatsApp, email, ubicación Guadalajara).

- **R-C:** Mantener RACSP intacto. Mantener `landing/REASP/css/styles.css` y `landing/REASP/js/*` intactos.

### Goal NO-funcional

- Cero regresión responsive (mobile 320px → desktop 1440px).
- Cero regresión SEO (preservar `<title>`, meta description, OG tags del landing).
- Build portable: HTML estático + CSS + JS vanilla (sin Tailwind, sin frameworks). Sigue siendo desplegable en cualquier servidor estático / GitHub Pages / Netlify.
- Lighthouse Performance ≥ 90 (mobile) tras el rediseño.

### Out of scope (explícito)

- ❌ Modificar `KeorsoftLandingNEW/` (es la fuente del estilo, no se toca).
- ❌ Implementar backend real para el formulario de contacto (sigue siendo simulado como hasta ahora).
- ❌ Migrar el cotizador (`#estimator`) ni el simulador REASP del landing nuevo — quedan fuera de esta primera iteración por decisión del planner (ver asunciones en `request.md`).
- ❌ Reescribir el copy del landing. Solo se **mapea** a los nuevos componentes visuales.
- ❌ Cambiar el package `npm` ni el repo de REASP. Solo se documenta lo que ya está.

---

## 3. Principios

1. **Preservar > Innovar.** El usuario dijo "quiero mantener la info". El copy, los datos de contacto, los productos y los enlaces NO se tocan. Solo cambia el envoltorio visual.

2. **Respetar el contexto de cada sub-sitio.** REASP y RACSP son productos documentados con su propio lenguaje visual coherente (Phosphor Icons + dark). Mezclar el estilo del landing principal ahí rompería la consistencia interna de cada producto.

3. **Mapear, no reinventar.** Cada sección del landing actual debe mapear a un componente del estilo nuevo de forma explícita. Si no hay equivalente, se decide en Gate A.

4. **Anclar todo contra archivos/líneas reales** (anti-hallucination §3 de cada PART). Si un componente del nuevo estilo no existe en `KeorsoftLandingNEW/styles.css`, se documenta y se propone como derivación justificada.

5. **Planning 100% antes de código.** Regla no negociable. Ningún archivo del landing se modifica hasta que el usuario apruebe el plan en Gate A y los PARTs detallados en Gate B.

6. **Dependencias bloqueantes primero.** El estilo CSS es prerrequisito de todo lo demás. La sección Hero usa tokens que aún no existen hasta que se cambie `Styles.css`. EPIC 01 bloquea EPIC 02-11.

---

## 4. Arquitectura objetivo

### 4.1 Estructura de archivos esperada tras la implementación

```
landing/
├── index.html                       # REDISEÑADO con estilo KeorsoftLandingNEW
├── css/
│   ├── Styles.css                   # REEMPLAZADO con design tokens de NEW
│   └── responsive.css               # NUEVO (extrael del NEW styles.css los @media)
├── js/
│   └── main.js                      # NUEVO (unifica app.js de NEW + scripts actuales)
├── REASP/
│   ├── index.html                   # EDITADO: contenido actualizado, estilo intacto
│   ├── docs.html                    # EDITADO: contenido actualizado, estilo intacto
│   ├── css/styles.css               # INTACTO
│   └── js/
│       ├── main.js                  # INTACTO
│       └── docs.js                  # INTACTO
├── RACSP/                           # INTACTO (no scope)
└── .refi/
    └── modules/keorsoft-landing-redesign/   # ESTE PACKET (ya existe)
```

### 4.2 Mapeo de estilos CSS (Tokens principales)

| Token actual (Styles.css) | Token nuevo (KeorsoftLandingNEW/styles.css) | Observaciones |
|--------------------------|---------------------------------------------|---------------|
| `--kr-blue: #0E98F8` | `--accent-indigo: #6366f1` | Cambio de azul corporativo a indigo (alinea con paleta Tailwind del landing actual) |
| `--em: #10B981` | `--accent-emerald: #10b981` | Idéntico |
| `--vi: #8B5CF6` | `--accent-purple: #a855f7` | Tono ligeramente más vivo |
| `--in: #6366F1` | `--accent-indigo` | Se fusiona con `--accent-indigo` |
| `--or: #F97316` | (sin equivalente) | Se mantiene como `--accent-orange` custom para RACSP y badges de producto |
| `--am: #F59E0B` | (sin equivalente) | Se mantiene como `--accent-amber` |
| `--font: 'Inter'` | `--font-sans: 'Inter'` | Idéntico |
| `--font-display: 'Plus Jakarta Sans'` | `--font-display: 'Outfit'` | Cambio de display font |
| (sin equivalente) | `--font-mono: 'Fira Code'` | Nuevo — para bloques `<code>` y terminal |
| (sin equivalente) | `--accent-cyan: #06b6d4` | Nuevo — para acentos REASP y badges |
| `--bg-1 / --bg-2 / --bg-3` (light + dark) | `--bg-primary: #05070a` (dark only) | Dark-only por defecto |
| `data-theme="dark"` toggle | (sin toggle) | **Decisión Gate A** |

### 4.3 Mapeo de secciones del landing (información → componente visual)

| Sección actual | Componente actual | Componente nuevo (de NEW/) | Notas |
|----------------|-------------------|----------------------------|-------|
| Nav (pill flotante) | `.nav-pill` flotante con theme toggle | `header` sticky con glass nav + hamburger | Cambia ubicación de fijo-flotante a sticky-top |
| Hero | Texto + imagen animada + 2 CTAs | Texto + terminal visualizer animado + 2 CTAs + 3 hero-badges | Terminal auto-typing con script |
| Stats Strip | 4 columnas separadas con divider | Integrado en hero como `.hero-badges` | 360°, 100%, 24/7, Calidad → stats de NEW |
| Nosotros | 4 cards (Quiénes Somos, Enfoque, Misión, Valores) | 4 cards adaptadas con `.pillar-card` glass-panel | Mantener estructura, adaptar colores a accent-indigo |
| Servicios | 7 service-cards (Software, Redes, Ciberseguridad, UX/UI, AI Consulting, Custom .NET, Enterprise Arch) | 3 `.pillar-card` glass-panel (Aplicaciones Enterprise, Infraestructura, Dev & AI Tools) | **Consolidación**: 7 → 3 pilares |
| Productos | 5 product-cards (MeridianUI, Controls & Libraries, SaaS SHEndevour, REASP, RACSP) | Mantener 5 product-cards adaptadas a glass-panel style | Mismas cards, nuevo lenguaje visual |
| Open Source | 2 oss-cards (REASP, RACSP) | 2 oss-cards adaptadas | Mantener badges (Open Source, version, MIT, Production) |
| Contacto | 4 contact-info items + form completo en página | 4 contact-info items + form completo en glass-panel | Mantener form, mejorar estilo |
| Footer | 4 columnas + bottom | 4 columnas + bottom con glass nav style | Mantener estructura |

---

## 5. Decisiones técnicas (anticipadas, a confirmar en Gate A)

### D1. Tokens CSS
- Adoptar **todos** los design tokens de `KeorsoftLandingNEW/styles.css` (líneas 3-29) como base.
- **Conservar** tokens legacy (`--kr-blue`, `--em`, `--vi`, etc.) en bloque `[data-legacy-tokens]` por compatibilidad con clases que aún los usen (badge-oss, badge-internal, etc.).
- Añadir `--accent-orange` y `--accent-amber` (no presentes en NEW) para iconografía de RACSP/productos.

### D2. Tema (light/dark)
- **Recomendación del planner:** pasar a **dark-only** (igual que NEW). Razones:
  - El estilo nuevo fue diseñado para dark.
  - El toggle de tema añade ~80 líneas de JS y CSS que se vuelven obsoletas.
  - El landing nuevo ya demuestra que dark-only funciona.
- **Pregunta Gate A:** confirmar con usuario.

### D3. Tailwind CSS
- **Eliminar** la dependencia de `https://cdn.tailwindcss.com`. Razones:
  - El estilo nuevo es vanilla CSS.
  - Tailwind añade ~3 MB de CSS no usado (purga no es trivial en HTML estático).
  - Inconsistencia con `KeorsoftLandingNEW/` que es 100% vanilla.
- Mantener Font Awesome (solo para iconos de marcas: `fa-whatsapp`, `fa-github`, etc.).

### D4. Iconografía
- **Reemplazar** Material Symbols Rounded por **Phosphor Icons** (consistente con REASP docs) o por **SVG inline** (consistente con NEW).
- **Recomendación:** SVG inline copiados de NEW. Razones:
  - Sin dependencia externa.
  - Ya están testeados en NEW.
  - Consistente con `icon-box` de `pillar-card`.
- **Material Symbols Rounded**: solo se mantiene si el usuario lo requiere explícitamente.

### D5. Script del landing
- **Reemplazar** el bloque `<script>` inline de `index.html` (líneas 849-942) por un archivo `js/main.js` separado.
- Reutilizar el patrón de `KeorsoftLandingNEW/app.js` (DOMContentLoaded, modular por sección).
- Mantener funcionalidades del landing actual: scroll reveal (IntersectionObserver), active nav highlight.
- Eliminar: theme toggle (si D2 = dark-only).

### D6. Cotizador y simulador
- **NO** se incluyen en esta primera iteración (decidido en `request.md` asunciones).
- Si el usuario los quiere, se planifican como EPIC adicional en una iteración posterior.

### D7. Compatibilidad hacia atrás
- **NO** se preserva ningún contrato hacia atrás del landing (no hay consumidores automatizados, es HTML estático público).
- **SÍ** se preserva la URL `REASP/index.html` y `RACSP/index.html` (productos ya enlazados).

---

## 6. Roadmap de implementación (orden de ejecución)

1. **EPIC 01** — Style Foundation (tokens, head assets, reset) → **bloquea todo**
2. **EPIC 02** — Hero & Stats Strip
3. **EPIC 03** — About / Nosotros
4. **EPIC 04** — Services (3 Pilares)
5. **EPIC 05** — Products (5 cards)
6. **EPIC 06** — Open Source (2 cards)
7. **EPIC 07** — Contacto (info + form)
8. **EPIC 08** — Footer & Nav
9. **EPIC 09** — Scripts & Interactivity
10. **EPIC 10** — REASP Docs Update (3 PARTs, contenido independiente del estilo)
11. **EPIC 11** — QA, accessibility, responsive, verification

EPIC 01 es bloqueante. EPIC 02-09 se pueden ejecutar en paralelo lógico (mismo archivo `index.html` dividido en secciones, no hay conflictos entre EPICs). EPIC 10 es independiente (otros archivos). EPIC 11 cierra el ciclo.

---

## 7. Métricas de éxito

| Métrica | Baseline actual | Target tras implementación |
|---------|----------------|---------------------------|
| Lighthouse Performance (mobile) | ~85 | ≥ 90 |
| Lighthouse Accessibility | ~95 | ≥ 95 (sin regresión) |
| Lighthouse Best Practices | ~90 | ≥ 90 |
| Lighthouse SEO | ~95 | ≥ 95 |
| Tamaño total CSS+JS | ~5 KB (Styles.css) + Tailwind CDN | ~10 KB (vanilla) + 0 KB Tailwind |
| Líneas de `index.html` | 945 | ~700-800 (más limpio sin Tailwind utility soup) |
| Líneas de `REASP/docs.html` | ~2000 | ~2400-2800 (más secciones) |
| Líneas de `REASP/index.html` | 598 | ~620-650 (cambios quirúrgicos en intro, instalación, agentes, footer) |

---

## 8. Exclusiones explícitas

- No se modifica `KeorsoftLandingNEW/` (es la fuente de verdad del estilo).
- No se modifica `landing/RACSP/**`.
- No se modifica `landing/REASP/css/**`, `landing/REASP/js/**`.
- No se modifica `package.json` ni `installer/**` del repo REASP.
- No se hace deploy. La entrega es el código listo para hacer commit local + push manual.
- No se documenta en `AI/Summarys/` (eso se hace tras la implementación, no en planning).

---

## 9. Dependencias externas

| Dependencia | Uso | Acción |
|-------------|-----|--------|
| Google Fonts (Inter, Outfit, Fira Code) | Tipografía nueva | Mantener, ajustar weights |
| Font Awesome 6.5.1 | Iconos de marca (whatsapp, github, linkedin) | Mantener |
| Phosphor Icons (`@phosphor-icons/web`) | Iconos REASP docs | Mantener (no se toca) |
| Tailwind CSS CDN | Landing actual | **Eliminar** |
| Material Symbols Rounded | Iconos landing actual | **Eliminar** o migrar (decisión D4) |
| Unsplash / Imágenes externas | (ninguna usada en landing actual) | N/A |

---

## 10. EPIC Breakdown (resumen)

La matriz completa está en `epics/matrix.md`. Resumen ejecutivo:

| # | EPIC | PARTs | Prioridad | Depende de |
|---|------|-------|-----------|-----------|
| 01 | Style Foundation & Migration Audit | 2 | **P0** (bloqueante) | — |
| 02 | Hero & Stats Strip | 2 | P1 | 01 |
| 03 | About / Nosotros | 1 | P1 | 01 |
| 04 | Services (3 Pilares) | 2 | P1 | 01 |
| 05 | Products (5 cards) | 2 | P1 | 01 |
| 06 | Open Source (2 cards) | 1 | P1 | 01 |
| 07 | Contacto & Form | 2 | P1 | 01 |
| 08 | Footer & Nav | 2 | P1 | 01 |
| 09 | Scripts & Interactivity | 2 | P1 | 01, 02-08 |
| 10 | REASP Docs Update | 3 | P0 (paralelo) | — |
| 11 | QA, accessibility, responsive, verification | 2 | P2 (cierre) | 01-10 |

**Total:** 11 EPICs · 21 PARTs.

**Complejidad:**
- 4 EPICs B (Baja) — migraciones mecánicas
- 5 EPICs M (Media) — refactors con decisiones de diseño
- 2 EPICs A (Alta) — REASP docs (10) y QA (11)

**Duración estimada** (si cada PART = 1 sesión de 30-90 min): **21 sesiones cortas**, agrupables en ~6-8 sprints.

---

## 11. Cierre del Pass 1

Este packet está en estado **planning-pass-1-complete**. Los EPICs tienen backlogs (`epics/<epic>/README.md`) con PARTs listados como **planned**, NO detallados.

**Próximo paso (a decisión del usuario en Gate A):**

1. `Detalla los PARTs de TODOS los EPICs` → Pass 2 completo (21 PARTs × 15 secciones + 8 gates).
2. `Detalla los PARTs de EPIC 01` (y siguientes uno a uno) → Pass 2 incremental.
3. `Detalla sólo el PART01 del EPIC X` → granularidad por PART.
4. `Ajusta el plan antes` → iterar sobre `master-blueprint.md` o la matriz.

**No iniciaré implementación hasta confirmación explícita.**