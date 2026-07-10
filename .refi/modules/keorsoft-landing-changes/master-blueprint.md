# master-blueprint.md — Keorsoft Landing Changes (v2)

> **Packet:** `keorsoft-landing-changes`
> **Status:** Pass 1 (planning) en progreso · Pre Gate A
> **Fecha:** 2026-07-09

---

## 1. Problema

Tras la implementación completa del packet `keorsoft-landing-redesign` (11 EPICs, 100 % done), el usuario solicita **3 cambios adicionales** sobre la versión ya implementada:

1. **Logo:** Cambiar el logo actual de Keorsoft (caja 32×32 con "K" + texto gradient) por el icono real `KeorsoftK-Icon.svg` que existe en `landing/assets/`.
2. **REASP card decorado:** El card de REASP en la sección `#productos` del landing se ve más simple que el card de RACSP. El usuario quiere que REASP se vea tan decorado como RACSP (con code-block, layout full-width, etc.).
3. **Eliminar SHEndevour:** El proyecto SHEndevour no es de Keorsoft, es de otra empresa del usuario. Debe eliminarse completamente del landing.

---

## 2. Goal

### Objetivo funcional

- **G-A:** Sustituir el logo actual de Keorsoft (caja "K" con "Keorsoft" gradient) por el icono SVG `KeorsoftK-Icon.svg` en el header (32×32) y footer (28×28) del landing.
- **G-B:** Reorganizar la sección `#productos` para que REASP y RACSP queden en la misma fila (grid 2 cols), cada uno con su code-block decorativo (reutilizando `.racsp-codeblock` con accent púrpura para REASP).
- **G-C:** Eliminar todas las referencias a "SHEndevour" del landing (sub-card dentro de SaaS Products, link en footer).

### Out of scope (explícito)

- ❌ NO modificar el logo/icono de REASP en `landing/REASP/index.html` (mantiene hexágono de Phosphor).
- ❌ NO modificar `landing/REASP/css/styles.css` ni `landing/REASP/js/*` ni `landing/RACSP/**`.
- ❌ NO cambiar copy de otros productos (MeridianUI, Controls, SaaS, REASP, RACSP).
- ❌ NO eliminar la card "SaaS Products" completa (solo el sub-card de SHEndevour).
- ❌ NO cambiar el badge de "SHEndevour" en sub-card (se elimina completo, sin sustituto).
- ❌ NO cambiar el logo del favicon (eso es otro cambio, fuera de scope).

---

## 3. Principios

1. **Preservar arquitectura existente.** No rehacer CSS ni HTML que ya funciona correctamente. Solo modificar lo necesario.
2. **Reutilizar clases existentes.** `.racsp-codeblock` ya existe y funciona — REASP la usará tal cual (solo cambia el accent color).
3. **Cambios atómicos.** Cada EPIC es independiente y puede revertirse sin afectar a los demás.
4. **Logo con fallback.** Usar `<img src="assets/KeorsoftK-Icon.svg">` con `alt` semántico. El CSS existente `.logo-icon` (que era un cuadrado con gradiente) se reemplaza por un `<img>` con tamaño fijo.
5. **No crear sub-páginas.** El logo es un cambio de un solo archivo, no requiere CSS nuevo.

---

## 4. Auditoría detallada

### 4.1 Logo actual en `landing/index.html`

**Header (línea ~22-25):**
```html
<a href="#inicio" class="logo">
  <div class="logo-icon"></div>
  Keorsoft
</a>
```

CSS actual (en `Styles.css`):
```css
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
```

**Footer (línea ~880-883):**
```html
<a href="#inicio" class="logo" style="font-size:1.25rem;">
  <div class="logo-icon"></div>
  Keorsoft
</a>
```

### 4.2 KeorsoftK-Icon.svg analizado

- Tamaño archivo: 139,261 bytes.
- viewBox: `0 0 2250 2250.000011` (cuadrado 2250×2250).
- Paths complejos (3 clipPaths con paths para formar la "K" estilizada).
- Color: paths rellenos con negro sólido.
- Se ve bien a cualquier tamaño (vectorial).

### 4.3 REASP card actual (líneas ~833-878)

**Estructura actual:**
```html
<div class="product-card scroll-reveal" style="--card-accent: var(--accent-purple); --card-accent-rgb: 168,85,247; animation-delay:.3s">
  <div class="product-card-header">...</div>
  <p class="product-card-desc">...</p>
  <div class="product-features">...</div>
  <a href="REASP/index.html" class="btn-cta-purple">Explorar REASP</a>
</div>
```

**Limitaciones:**
- Single column, no full-width.
- Sin code-block / terminal preview.
- Solo 1 CTA (Explorar REASP).
- 3 features en columna (no grid 2×2 como RACSP).

### 4.4 RACSP card actual (líneas ~879-927) — REFERENCIA

**Estructura completa:**
```html
<div class="product-card product-card-wide scroll-reveal" style="--card-accent: var(--accent-orange); --card-accent-rgb: 249,115,22; animation-delay:.4s">
  <div class="product-card-wide-inner">
    <div class="product-card-wide-content">
      <div class="product-card-header">...</div>
      <p class="product-card-desc">...</p>
      <div class="product-features-grid">... 4 features en grid 2x2</div>
      <a href="RACSP/index.html" class="btn-cta-orange">Explorar RACSP</a>
    </div>
    <div class="racsp-codeblock">
      <div class="racsp-codeblock-overlay"></div>
      <div class="card-header">
        <div class="mac-buttons">...</div>
        <span class="racsp-codeblock-title">racsp / protocol</span>
      </div>
      <pre class="racsp-codeblock-code">
        <code>...YAML con syntax highlighting (.cb-comment, .cb-key, etc.)</code>
      </pre>
    </div>
  </div>
</div>
```

### 4.5 SHEndevour ocurrencias (4 en landing)

| Línea | Bloque | Acción |
|-------|--------|--------|
| 448 | Sub-card: `<h4 class="product-subcard-title">SHEndevour</h4>` | ELIMINAR h4 + sub-card completo |
| 494 | Sub-card: `<p class="product-subcard-subtitle">Sistema de Gestión Hotelera</p>` | ELIMINAR p |
| 519 | Sub-card: `<p class="product-subcard-desc">Versiones Desktop (WPF) y Web. Control total de reservas, habitaciones, facturación y reportes.</p>` | ELIMINAR p |
| 923 | Footer: `<li><a href="#productos" class="footer-link">SHEndevour</a></li>` | ELIMINAR `<li>` completo |

### 4.6 Sub-card CSS analysis

```bash
grep -A 1 "product-subcard" landing/css/Styles.css
```

Output esperado:
```css
.product-subcard { ... }
.product-subcard-header { ... }
.product-subcard-icon { ... }
.product-subcard-title { ... }
.product-subcard-subtitle { ... }
.product-subcard-desc { ... }
```

**Decisión:** después de eliminar SHEndevour, las clases `.product-subcard*` ya no se usan. **Mantenerlas en CSS** (no es regresión, no ocupan mucho espacio). Limpieza opcional en EPIC 11 futuro.

---

## 5. Decisiones técnicas (D8, D9, D10)

### D8 — Logo con `<img>` semántico

**Decisión:** usar `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">` inline en lugar de `<div class="logo-icon"></div>` con CSS.

**Justificación:**
- Mejor accesibilidad (lectores de pantalla leen "Keorsoft").
- Mejor SEO (Google indexa el alt).
- Más simple que recrear el SVG inline.
- Funciona con el KeorsoftK-Icon.svg tal cual.

**Cambio en CSS:**
```css
/* Eliminar .logo-icon CSS (ya no se usa) */
/* Eliminar .logo-icon::before CSS */
```

### D9 — REASP card usa `.racsp-codeblock` con accent púrpura

**Decisión:** reutilizar las clases existentes `.racsp-codeblock`, `.racsp-codeblock-overlay`, `.racsp-codeblock-title`, `.racsp-codeblock-code`, y las 11 clases `.cb-*` (que ya están definidas en CSS).

**Cambio en HTML:**
- REASP card pasa de `product-card` a `product-card product-card-wide` (full-width).
- Añadir el code-block con mac-buttons + título "reasp / stack" + código TypeScript/JSON con syntax highlighting.
- Cambiar 3 features en columna a 4 features en grid 2×2 (igual que RACSP).
- Cambiar accent de purple (igual) pero con contenido diferente.

**No requiere cambios en CSS** — todo se reutiliza.

### D10 — Eliminar SHEndevour sin sustituto

**Decisión:** eliminar las 4 ocurrencias de "SHEndevour" del landing. NO añadir un producto sustituto.

**Cambio en SaaS Products card:**
- El card SaaS queda con solo la descripción principal (sin sub-card).
- El texto del SaaS card se mantiene: "Pequeñas soluciones SaaS diseñadas para verticales específicos..."
- El footer del SaaS card (con icono `schedule` y "Próximamente: más soluciones verticales") se mantiene.

**Cambio en footer:**
- Eliminar `<li><a href="#productos" class="footer-link">SHEndevour</a></li>` del footer "Productos".
- El footer "Productos" queda con 4 items: MeridianUI, Controls & Libraries, REASP, RACSP.

---

## 6. Roadmap de implementación

1. **EPIC 12** — Logo update (1-2 PARTs, simple)
2. **EPIC 13** — REASP card enhanced (1-2 PARTs, medio)
3. **EPIC 14** — Quitar SHEndevour (1 PART, simple)

EPIC 12 y 14 son cambios atómicos (1 archivo cada uno). EPIC 13 es el más complejo (reorganizar productos + crear code-block para REASP).

---

## 7. Estimación de esfuerzo

| EPIC | Descripción | Tiempo estimado | Archivos |
|------|-------------|----------------|----------|
| 12 | Logo update | 15-30 min | 1 archivo (index.html) + limpieza CSS |
| 13 | REASP card enhanced | 1-2 horas | 1 archivo (index.html) |
| 14 | Quitar SHEndevour | 10-15 min | 1 archivo (index.html) |
| **Total** | | **~2-3 horas** | **1 archivo principal + limpieza CSS** |

---

## 8. Exclusiones explícitas

- No se modifica el favicon (`.ico` o `<link rel="icon">`).
- No se modifica el logo de REASP en `landing/REASP/`.
- No se modifican los assets en `landing/assets/` (KeorsoftK-Icon.svg se usa tal cual).
- No se crean nuevos archivos (todo se modifica in-place en `landing/index.html`).
- No se hace commit ni push (decisión del usuario).

---

## 9. Hand-off (Pass 3)

Una vez que el usuario apruebe (Gate B), se generará:
- `orchestration-map.md` con el orden de ejecución.
- `progress.md` con el estado de implementación.
- `verification.md` con las 8 gates firmadas.
- Hand-off literal a Ryou Orchestrator.

---

## 10. Próximo paso

Esperar Gate A del usuario. Si las asunciones son correctas, proceder con Pass 2 (detallar PARTs por EPIC) y luego Pass 3.
