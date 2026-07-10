# progress.md — Keorsoft Landing Changes (v2)

> **Packet:** `keorsoft-landing-changes`
> **Status:** 100 % · Done (planning-complete · Pass 3)
> **Fecha de planning complete:** 2026-07-09

---

## 1. Resumen ejecutivo

- **3 EPICs** all in `Planned` state.
- **4 PARTs** all detailed with **15 secciones + footer de 8 quality gates** cada uno.
- **2 archivos a modificar:** `landing/index.html` + `landing/css/Styles.css`.
- **0 regresiones** planeadas en `landing/REASP/**`, `landing/RACSP/**`, `landing/assets/**`.
- **Tiempo estimado de implementación:** 1.5-3 horas.

---

## 2. Per-EPIC Status

| # | EPIC | Status | Implementation | % Done | PARTs |
|---|------|--------|----------------|--------|-------|
| 12 | Logo Update (KeorsoftK-Icon) | **Planned** | ⏳ Pending | 0 % | 1/1 detailed |
| 13 | REASP Card Enhanced (decorar como RACSP) | **Planned** | ⏳ Pending | 0 % | 2/2 detailed |
| 14 | Quitar SHEndevour del Landing | **Planned** | ⏳ Pending | 0 % | 1/1 detailed |

**Total:** 3/3 EPICs Planned · 4/4 PARTs Detailed · 0 % Implementation (Pass 1+2+3 completos, implementación pendiente).

---

## 3. Per-PART Detailed Count

| EPIC | PARTs Detailed | Gates Footer | Tamaño total PARTs |
|------|----------------|--------------|---------------------|
| 12 | 1 | ✅ | ~23 KB |
| 13 | 2 | ✅ | ~50 KB |
| 14 | 1 | ✅ | ~23 KB |
| **Total** | **4** | **4** | **~96 KB** |

---

## 4. Decisiones técnicas (D1-D4)

| # | Decisión | Estado |
|---|----------|--------|
| D1 (EPIC 12) | Logo usa `<img src="assets/KeorsoftK-Icon.svg">` con `alt="Keorsoft"` | ✅ Plan |
| D2 (EPIC 12) | Tamaño header 32×32, footer 28×28 | ✅ Plan |
| D3 (EPIC 12) | Eliminar `.logo-icon` y `.logo-icon::before` de CSS | ✅ Plan |
| D4 (EPIC 13) | Reutilizar `.racsp-codeblock` (no crear `.reasp-codeblock`) | ✅ Plan |
| D5 (EPIC 13) | `grid-column: auto;` inline en REASP y RACSP | ✅ Plan |
| D6 (EPIC 14) | Eliminación completa de SHEndevour (no parcial) | ✅ Plan |

---

## 5. Asunciones del usuario (todas confirmadas por defecto)

1. ✅ Logo KeorsoftK-Icon en `landing/index.html` solamente (NO en REASP docs).
2. ✅ Eliminar SHEndevour completamente (sub-card + link footer).
3. ✅ Sin producto sustituto de SHEndevour.
4. ✅ REASP y RACSP quedan en la misma fila (2 cols) en desktop.
5. ✅ Icono del footer 28×28 (más pequeño que header 32×32).

---

## 6. Archivos creados en Pass 1-3

```
.refi/modules/keorsoft-landing-changes/
├── request.md                       (~6 KB · Pass 1)
├── master-blueprint.md              (~8 KB · Pass 1)
├── epics/
│   ├── matrix.md                    (~3 KB · Pass 1)
│   ├── 12-logo-update/
│   │   ├── README.md                (~3 KB · Pass 1)
│   │   └── parts/PART01_logo-replace.md  (~23 KB · Pass 2)
│   ├── 13-reasp-enhance/
│   │   ├── README.md                (~4 KB · Pass 1)
│   │   └── parts/
│   │       ├── PART01_reasp-codeblock.md  (~30 KB · Pass 2)
│   │       └── PART02_products-grid-reorg.md  (~20 KB · Pass 2)
│   └── 14-remove-shendevour/
│       ├── README.md                (~3 KB · Pass 1)
│       └── parts/PART01_remove-shendevour.md  (~23 KB · Pass 2)
├── orchestration-map.md              (~6 KB · Pass 3 · ESTE ARCHIVO)
├── progress.md                       (~4 KB · Pass 3 · este archivo)
└── verification.md                   (~5 KB · Pass 3)
```

**Total artifacts:** 14 archivos, ~108 KB.

---

## 7. Archivos a modificar (durante implementación)

```
landing/
├── index.html              ⚠️ PENDIENTE — 2 archivos a modificar:
│                              - EPIC 14: eliminar SHEndevour (4 ocurrencias)
│                              - EPIC 12: cambiar logo (2 ocurrencias)
│                              - EPIC 13: añadir code-block + reorganizar
├── css/Styles.css          ⚠️ PENDIENTE — 1 archivo a limpiar:
│                              - EPIC 12: eliminar .logo-icon y .logo-icon::before
│
├── REASP/                  ✅ NO TOCADO (intacto)
├── RACSP/                  ✅ NO TOCADO (intacto)
└── assets/KeorsoftK-Icon.svg  ✅ USADO TAL CUAL
```

---

## 8. Historial de cambios

| Fecha | Sesión | Cambio |
|-------|--------|--------|
| 2026-07-09 | Pass 1 | `request.md`, `master-blueprint.md`, `epics/matrix.md`, 3 EPIC READMEs |
| 2026-07-09 | Pass 2 | 4 PART files detallados con 15 secciones + 8 quality gates |
| 2026-07-09 | Pass 3 | `orchestration-map.md`, `progress.md` (FINAL), `verification.md` |
| 2026-07-09 | — | **Hand-off emitido · implementación pendiente** |

---

## 9. Status final

**Packet `keorsoft-landing-changes` — 100 % planificado · listo para implementación.**

- 3/3 EPICs planificados.
- 4/4 PARTs detallados.
- 16/16 gates planificadas (4 PARTs × 4 gates planning-level cada uno).
- 0 regresiones planeadas en REASP/RACSP/assets.
- Tiempo estimado: 1.5-3 horas.

**Acción del usuario:** Proceder con implementación.
