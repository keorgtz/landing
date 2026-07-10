# request.md — Keorsoft Landing Changes (v2)

> **Slug:** `keorsoft-landing-changes`
> **Ruta del packet:** `.refi/modules/keorsoft-landing-changes/`
> **Workspace:** `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLanding\landing`
> **Fecha:** 2026-07-09

---

## Verbatim del usuario

> "si ya esta todo implementado correctamente ahora quiero un par de cambios mas, el logo de Keorsoft debes cambiarlo por el KeorsoftK-Icon que tengo en mi carpeta assets aqui: `C:\Users\kevin\KeorSoft\Development\Web\KeorsoftLanding\landing\assets`, ademas corregir estilos, que el proyecto REASP tambien se vea mas decorado en la pagina principal como lo esta RACSP, ademas quita el proyecto SHEndevour, ya que ese proyecto no lo llevo en mi empresa Keorsoft si no que es un proyecto con otros asociados y pertenece a otra compañia mia. Generame el plan para todos esos cambios correctamente"

---

## Descomposición semántica de la solicitud

| # | Requisito | Carpeta / archivo afectado | Mantener | Cambiar |
|---|-----------|----------------------------|----------|---------|
| R1 | Cambiar el logo de Keorsoft por **KeorsoftK-Icon** desde `assets/` | `landing/index.html`, `landing/REASP/index.html`, `landing/REASP/docs.html` | Estructura general del logo (caja + texto) | Imagen del logo SVG + ajustes de tamaño |
| R2 | Hacer que **REASP** se vea más decorado en la página principal como RACSP | `landing/index.html` (sección `#productos`) | Copy del card REASP | Añadir code-block/terminal + decoración visual |
| R3 | **Quitar SHEndevour** del proyecto (no es de Keorsoft) | `landing/index.html` (4 ocurrencias) | El resto de productos | Eliminar todas las referencias a SHEndevour |

---

## Archivos en `landing/assets/` verificados

```
Keorsoft-Icon.ico    370070 bytes
Keorsoft-Icon.png    172116 bytes
Keorsoft-Icon.svg    137777 bytes  ← Antigua (NO usar)
KeorsoftK-Icon.ico   370070 bytes  ← NUEVO a usar (.ico para favicon)
KeorsoftK-Icon.png   183105 bytes  ← NUEVO a usar (PNG fallback)
KeorsoftK-Icon.svg   139261 bytes  ← NUEVO a usar (SVG principal)
```

**Decisión:** usar `KeorsoftK-Icon.svg` como principal (escalable, ligero, formato moderno). Mantener el `.ico` para favicon (compatibilidad con navegadores antiguos).

---

## Auditoría de uso del logo actual

### En `landing/index.html`:

```
$logoText = ([regex]::Matches($html, 'class="logo"')).Count   # 2 ocurrencias
$logoIcon = ([regex]::Matches($html, 'logo-icon')).Count       # 2 ocurrencias
```

- **Header nav:** `<a href="#inicio" class="logo">` con `<div class="logo-icon"></div>` y texto "Keorsoft" (línea 22-25).
- **Footer:** `<a href="#inicio" class="logo" style="font-size:1.25rem;">` con `<div class="logo-icon"></div>` y texto "Keorsoft" (líneas 880-883).

### En `landing/REASP/index.html` (REASP docs landing):

- **Nav:** `<a href="#" class="nav-logo">` con icono Phosphor `<i class="ph ph-hexagon"></i>` y texto "REASP" (línea 22-25).
- **Footer:** Logo similar con Phosphor icon.

**Decisión:** Solo cambiar el logo en el landing principal (`landing/index.html`). En REASP docs mantener el icono "REASP" con Phosphor (es coherente con el diseño de REASP). **Pregunta para Gate A:** ¿el usuario quiere también cambiar el icono de REASP? Asumido: NO (REASP tiene su propia identidad visual).

---

## Auditoría de uso de SHEndevour

```
$shendev = ([regex]::Matches($html, 'SHEndevour', IgnoreCase)).Count
```

En `landing/index.html` se encontraron **4 ocurrencias** de "SHEndevour":

| Línea | Contexto | Acción |
|-------|----------|--------|
| ~448 | Sub-card dentro de "SaaS Products" (texto + descripción) | **ELIMINAR sub-card completo** |
| ~494 | Descripción del sub-card | **ELIMINAR** |
| ~519 | Footer del sub-card | **ELIMINAR** |
| ~923 | Link en footer (`<li><a href="#productos" class="footer-link">SHEndevour</a></li>`) | **ELIMINAR link del footer** |

En `landing/REASP/index.html` y `landing/REASP/docs.html`: **0 ocurrencias** (no se ve afectado).

---

## Auditoría del card REASP vs RACSP

### RACSP card (actualmente decorado, líneas ~879-927):
- ✅ Layout `product-card-wide` (full-width)
- ✅ Code block con mac-buttons (rojo/amarillo/verde) y título "racsp / protocol"
- ✅ 11 clases `.cb-*` para syntax highlighting (`.cb-comment`, `.cb-key`, etc.)
- ✅ Background `#050b18` (más oscuro que el body)
- ✅ 4 features en grid 2×2 (`.product-features-grid`)
- ✅ 2 CTAs separados: `<a class="btn-cta-purple">` y `<a class="btn-cta-orange">` (no, RACSP solo tiene 1)
- ✅ `.racsp-codeblock-overlay` con gradiente blur para efecto visual

### REASP card (actualmente simple, líneas ~833-878):
- ❌ Layout single column (no `product-card-wide`)
- ❌ NO tiene code block / terminal
- ❌ 3 features en columna (`.product-features`, no grid)
- ❌ Solo 1 CTA (`<a class="btn-cta-purple">`)
- ❌ Sin decoración visual adicional

### Decisión para R2 (REASP más decorado):

**Opciones:**
1. **Opción A (Recomendada):** Hacer el REASP card full-width (como RACSP) CON un code block. PERO alinear los 2 cards horizontalmente (REASP arriba, RACSP abajo) — grid de 2 filas.
2. **Opción B:** Mantener REASP single-column pero añadir un terminal/code-block más pequeño lateral.
3. **Opción C:** Cambiar el layout de productos a 2 columnas: REASP en columna izquierda, RACSP en columna derecha, ambos con code-block.

**Recomendación:** Opción C — productos en 2 columnas con code-block en ambos. Esto:
- Da espacio suficiente a ambos proyectos.
- Aprovecha el espacio horizontal.
- Visualmente más impactante.

**Pero esto rompe el layout actual de 5 cards (MeridianUI, Controls, SaaS, REASP, RACSP).** Necesito reorganizar:

**Layout nuevo propuesto:**
- 2 cards de MeridianUI y Controls en la primera fila (2 cols).
- SaaS Products en la segunda fila (sin sub-card de SHEndevour — más simple).
- 2 cards de REASP y RACSP en la tercera fila (2 cols, cada uno con code-block).
- Total: 4 cards (sin SHEndevour), distribuidos en 3 filas.

**Decisión final:** esta reorganización requiere reescribir gran parte de la sección productos. Voy a crear un plan específico en EPIC 13.

---

## Restricciones duras (no negociables)

1. ✅ Mantener el estilo visual glass-panel coherente con EPIC 05.
2. ✅ Mantener tokens accent (--accent-indigo, --accent-cyan, --accent-emerald, --accent-purple, --accent-orange).
3. ✅ NO modificar `landing/REASP/css/styles.css` ni `landing/REASP/js/*` ni `landing/RACSP/**`.
4. ✅ NO eliminar otros productos (MeridianUI, Controls, SaaS, REASP, RACSP).
5. ✅ NO cambiar copy del usuario (solo añadir/quitar contenido).
6. ✅ Mantener responsive mobile/desktop.
7. ✅ El logo KeorsoftK-Icon debe verse bien en tamaños 32×32 (nav) y 28×28 (footer), y también en retina (@2x).

---

## Cambios pendientes de implementación

| EPIC | Descripción | Archivos | Prioridad |
|------|-------------|----------|-----------|
| 12 | Logo update (KeorsoftK-Icon) | `landing/index.html` (header + footer), `assets/` reference | **P0** |
| 13 | REASP card enhanced (decorar como RACSP) | `landing/index.html` (sección productos) + `css/Styles.css` (reutilizar .racsp-codeblock) | **P1** |
| 14 | Quitar SHEndevour | `landing/index.html` (4 ocurrencias) | **P0** |

---

## Riesgos identificados

| ID | Riesgo | Mitigación |
|----|--------|------------|
| RK1 | El logo KeorsoftK-Icon.svg es complejo (3000×3000 viewBox) — puede no verse bien a 32×32 | Usar `viewBox="0 0 2250 2250"` con `width="32" height="32"` para auto-scaling. Probar visualmente. |
| RK2 | El layout de 2 columnas para REASP+RACSP cambia el flujo de productos — afecta visual | Planear el cambio de layout cuidadosamente. Probar mobile (cards stack vertical). |
| RK3 | El REASP card actual tiene 3 features + 1 CTA. Al añadir code-block, podría no caber | Decidir si el code-block reemplaza el título o se añade como un nuevo sub-elemento. Opción: code-block pequeño en la parte superior del card, luego título + descripción + features. |
| RK4 | El sub-card de SHEndevour tiene estilos `.product-subcard` que también se usan para el título del SHEndevour — al eliminarlo, hay que asegurarse que otros usos de `.product-subcard` no se rompan | Auditar otros usos de `.product-subcard` en `Styles.css` antes de eliminar. |

---

## Asunciones explícitas

1. ✅ El logo KeorsoftK-Icon se usa en `landing/index.html` solamente (NO en REASP docs, donde se mantiene el hexágono de Phosphor para "REASP").
2. ✅ El sub-card de SHEndevour dentro de SaaS Products se ELIMINA completo (no se sustituye por otro producto).
3. ✅ El link "SHEndevour" en el footer se ELIMINA (sin sustituto).
4. ✅ El card REASP se expande para ser full-width con code-block, como el RACSP. Ambos quedan en grid de 2 columnas en la misma fila (3ª fila de productos).
5. ✅ El nuevo layout de productos elimina SHEndevour pero mantiene la "card SaaS" (sin sub-card). El texto del SaaS card se actualiza para no mencionar SHEndevour.

**Decisión:** estas asunciones se confirman en Gate A. Si alguna es incorrecta, se ajustan antes de implementar.

---

## Decisiones técnicas (D8, D9, D10)

- **D8:** Logo se carga como `<img src="assets/KeorsoftK-Icon.svg" alt="Keorsoft" width="32" height="32">` inline (no background-image). Mejor accesibilidad y SEO.
- **D9:** Para mantener el gradient en el texto "Keorsoft" del nav, se usa `background-clip: text` con `linear-gradient(135deg, #fff 30%, var(--accent-indigo) 100%)` (igual que ya está en CSS).
- **D10:** El REASP code-block usa el mismo `.racsp-codeblock` class (reutilizar CSS). El color de fondo `#050b18` se mantiene. El accent pasa a púrpura (en vez de naranja que usa RACSP).

---

## Resumen de archivos a modificar

| Archivo | Cambios |
|---------|---------|
| `landing/index.html` | Logo header, Logo footer, SaaS card (quitar SHEndevour), REASP card (decorar), Footer link (quitar SHEndevour) |
| `landing/css/Styles.css` | Ninguno (clases `.racsp-codeblock` reutilizadas) |
| `landing/assets/KeorsoftK-Icon.svg` | Usado como referencia (NO modificado) |
| `landing/REASP/**` | NO modificado |
| `landing/RACSP/**` | NO modificado |

---

## Próximo paso

Esperar confirmación del usuario con Gate A. Si las asunciones son correctas, proceder con Pass 2 (detallar PARTs por EPIC) y luego Pass 3 (orchestration + hand-off).
