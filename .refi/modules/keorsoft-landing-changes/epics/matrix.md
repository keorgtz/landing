# epics/matrix.md — Keorsoft Landing Changes (v2)

> **Packet:** `keorsoft-landing-changes`
> **Status:** Pass 1 (planning) — Pre Gate A
> **Fecha:** 2026-07-09

---

## Leyenda de columnas

| Columna | Significado |
|---------|-------------|
| **#** | Identificador del EPIC (`NN-slug`) |
| **EPIC** | Nombre corto del cambio |
| **Prioridad** | `P0` = bloqueante · `P1` = importante · `P2` = nice-to-have |
| **Depende de** | EPICs que deben estar `Done` antes de iniciar |
| **Complejidad** | `B` = Baja (< 30 min) · `M` = Media (30-90 min) · `A` = Alta (> 90 min) |
| **PARTs** | Número de PARTs planeados (planned, no detallados aún) |
| **%** | Progreso (siempre `0` en Pass 1) |
| **Estado** | `Backlog` · `Planned` · `In-Progress` · `Done` |

---

## Matriz

| # | EPIC | Prioridad | Depende de | Complejidad | PARTs | % | Estado |
|---|------|-----------|------------|-------------|-------|---|--------|
| 12 | Logo update (KeorsoftK-Icon) | **P0** | — | B | 1 | 0 | Backlog |
| 13 | REASP card enhanced (decorar como RACSP) | **P1** | — | M | 2 | 0 | Backlog |
| 14 | Quitar SHEndevour del landing | **P0** | — | B | 1 | 0 | Backlog |

**Totales:** 3 EPICs · 4 PARTs · 0 % implementación (planning).

---

## Critical Path

```
EPIC 14 (Quitar SHEndevour)   ← simple, atómico (1 archivo)
   ↓
EPIC 12 (Logo update)         ← simple, atómico (1 archivo + CSS)
   ↓
EPIC 13 (REASP enhanced)      ← complejo (1 archivo, reorganizar)
```

EPIC 14 y 12 son independientes y pueden ejecutarse en paralelo. EPIC 13 es el más complejo y debe ejecutarse último (después de que el landing tenga la estructura limpia).

---

## Reglas de promoción de estado

| Transición | Condición |
|------------|-----------|
| `Backlog` → `Planned` | Todos sus PARTs están detallados (Pass 2 completo) |
| `Planned` → `In-Progress` | Orchestrator inicia el PART01 |
| `In-Progress` → `Done` | Las 8 puertas están firmadas en todos sus PARTs |
| cualquier estado → `Blocked` | Riesgo materializado (RK1-RK4) |

---

## Riesgos por EPIC

| EPIC | Riesgos principales |
|------|---------------------|
| 12 | RK1 (logo SVG no se ve bien a 32×32), RK4 (sub-card classes残留) |
| 13 | RK2 (cambio de layout afecta visual), RK3 (code-block no cabe en card) |
| 14 | RK4 (clases .product-subcard* sin uso tras eliminar) |

---

## Próximo paso

Cada EPIC tiene su `README.md` con el backlog detallado (9 secciones). Los PARTs NO están detallados aún (Pass 2 pendiente). Esperando Gate A del usuario.
