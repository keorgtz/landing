# orchestration-map.md — Keorsoft Landing Changes (v2)

> **Packet:** `keorsoft-landing-changes`
> **Status:** planning-complete (100 % Ready for execution)
> **Total EPICs:** 3
> **Total PARTs:** 4
> **Critical Path:** EPIC 14 → EPIC 12 → EPIC 13

---

## 1. Critical Path Diagram

```
EPIC 14 (Quitar SHEndevour)   ← simple, atómico (1 archivo HTML, 2 cambios)
   ↓
EPIC 12 (Logo update)         ← simple, atómico (1 archivo HTML + CSS cleanup)
   ↓
EPIC 13 (REASP enhanced)      ← complejo (1 archivo HTML, 2 PARTs)
   ↓
Hand-off a Ryou Orchestrator
```

EPIC 14 y 12 son independientes y pueden ejecutarse en paralelo. EPIC 13 es el más complejo y debe ejecutarse último (después de que el SaaS card esté limpio y el logo nuevo esté en su lugar).

---

## 2. Per-EPIC Execution Order

### Fase 1 — Limpieza (EPIC 14)

#### EPIC 14 — Quitar SHEndevour del Landing
- **Depende de:** —
- **Complejidad:** B
- **PARTs:** 1
- **PART01:** `remove-shendevour` — Eliminar sub-card SHEndevour (líneas 474-501) + link footer (línea 923).
- **Output:** `landing/index.html` sin referencias a SHEndevour.

### Fase 2 — Logo (EPIC 12)

#### EPIC 12 — Logo Update (KeorsoftK-Icon)
- **Depende de:** —
- **Complejidad:** B
- **PARTs:** 1
- **PART01:** `logo-replace` — Reemplazar logo-icon CSS con KeorsoftK-Icon SVG en header y footer + cleanup CSS.
- **Output:** `landing/index.html` con logo real + `landing/css/Styles.css` sin `.logo-icon`.

### Fase 3 — REASP Enhanced (EPIC 13)

#### EPIC 13 — REASP Card Enhanced (decorar como RACSP)
- **Depende de:** EPIC 14 (preferentemente, para tener el SaaS card limpio antes de reorganizar)
- **Complejidad:** M
- **PARTs:** 2
- **PART01:** `reasp-codeblock` — Añadir code-block al REASP card con mac-buttons + syntax highlighting.
- **PART02:** `products-grid-reorg` — Reorganizar el grid de productos (REASP y RACSP en la misma fila).
- **Output:** `landing/index.html` con REASP card visualmente igual a RACSP.

---

## 3. Per-PART Execution with 8 Quality Gates

Para cada PART, las 8 puertas se ejecutan en **orden estricto**:

| # | Gate | Descripción |
|---|------|-------------|
| 1 | **Architecture Review** | Coherencia con tokens y arquitectura. |
| 2 | **Scope & Completeness Audit** | Tabla declared vs actual. |
| 3 | **UX/Design Review** | UX coherente con el resto del landing. |
| 4 | **Manual / Runtime Validation** | Checklist §12 ejecutado con tickboxes. |
| 5 | **Defect Closure** | Defectos de gates 1-4 cerrados en el mismo PART. |
| 6 | **Technical Documentation** | Comentarios de cabecera en el código. |
| 7 | **User Documentation** | Mensaje de commit redactado. |
| 8 | **Final Review & Sign-off** | Build 0 errores + suite verde + ACs re-leídos + firma. |

**No se avanza a la siguiente PART sin cerrar las 8 puertas de la actual.**

---

## 4. Per-PART Execution Order

```
Fase 1 (Limpieza)
  └── EPIC 14 / PART01 (remove-shendevour)        ← 1 archivo, 2 cambios
Fase 2 (Logo)
  └── EPIC 12 / PART01 (logo-replace)            ← 1 archivo HTML + CSS cleanup
Fase 3 (REASP Enhanced)
  ├── EPIC 13 / PART01 (reasp-codeblock)         ← 1 archivo HTML, contenido
  └── EPIC 13 / PART02 (products-grid-reorg)     ← 1 archivo HTML, layout
```

---

## 5. Estimated Effort

| Métrica | Estimación |
|---------|-----------|
| PARTs totales | 4 |
| Tiempo medio por PART | 20-45 min |
| Tiempo total estimado | **1.5-3 horas** de trabajo focused |
| Archivos a modificar | 1 (landing/index.html) + 1 (landing/css/Styles.css, solo EPIC 12 cleanup) |

---

## 6. Hand-off to Ryou Orchestrator

Para cada PART, Ryou Orchestrator:

1. **Lee** el archivo `epics/<NN-slug>/parts/PARTnn_<slug>.md` completo.
2. **Implementa** los cambios descritos en §10 (Implementation Plan).
3. **Ejecuta** los comandos de §11 (Automated Test Plan).
4. **Completa** el checklist de §12 (Manual Validation Checklist).
5. **Firma** el footer (8 quality gates) del PART.
6. **Reporta** al planner para continuar con el siguiente PART.
7. **Si encuentra errores** que no puede resolver, **escalation** al planner antes de cerrar Gate 5.

### Constraints inquebrantables

- **NO** modificar `landing/REASP/**` (REASP docs intactos).
- **NO** modificar `landing/RACSP/**` (RACSP intacto).
- **NO** modificar `landing/assets/**` (KeorsoftK-Icon.svg se usa tal cual).
- **NO** modificar `landing/REASP/css/styles.css`, `landing/REASP/js/main.js`, `landing/REASP/js/docs.js`.
- **NO** añadir un producto sustituto de SHEndevour.
- **NO** reintroducir Tailwind CSS, theme toggle, ni Material Symbols.
- **NO** inventar archivos, endpoints, columnas, clases CSS, o contenido.
- **NO** cambiar copy del usuario (solo añadir/quitar/reorganizar).

### Rollback strategy

Si un EPIC falla durante implementación:

1. **Documentar el fallo** en `verification.md` con detalles.
2. **Hacer rollback** al último commit verde (`git reset --hard HEAD~1` o equivalente).
3. **Reabrir** el EPIC fallido con un nuevo PART correctivo.
4. **Actualizar** `progress.md` con el estado del rollback.
5. **Re-emitir** Gate B si la corrección cambia el plan significativamente.

---

## 7. Resumen de archivos a modificar

| Archivo | EPIC | Cambios |
|---------|------|---------|
| `landing/index.html` | 14, 12, 13 | Eliminar SHEndevour (4 ocurrencias), cambiar logo (2 ocurrencias), añadir code-block REASP, reorganizar grid |
| `landing/css/Styles.css` | 12 | Eliminar `.site-header .logo-icon` y `.site-header .logo-icon::before` |
| `landing/assets/KeorsoftK-Icon.svg` | 12 | Usado tal cual (NO modificado) |
| `landing/REASP/**` | — | NO modificado |
| `landing/RACSP/**` | — | NO modificado |

**Total:** 2 archivos modificados (1 HTML + 1 CSS).

---

## 8. Próximo paso

1. Ryou Orchestrator implementa EPIC 14 / PART01 (Quitar SHEndevour).
2. Ryou Orchestrator implementa EPIC 12 / PART01 (Logo update).
3. Ryou Orchestrator implementa EPIC 13 / PART01 (REASP codeblock).
4. Ryou Orchestrator implementa EPIC 13 / PART02 (Products grid reorg).
5. Ryou Orchestrator reporta al planner al completar cada PART.
6. Al finalizar, Ryou Orchestrator actualiza `progress.md` y `verification.md` con las 8/8 gates firmadas.
