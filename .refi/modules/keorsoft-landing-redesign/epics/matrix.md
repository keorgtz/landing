# epics/matrix.md — Matriz consolidada de EPICs

> **Packet:** `keorsoft-landing-redesign`
> **Estado:** Pass 1 · Pre Gate A · todos los EPICs en `Backlog`

---

## Leyenda de columnas

| Columna | Significado |
|---------|-------------|
| **#** | Identificador del EPIC (`NN-slug`) |
| **EPIC** | Nombre corto del subsistema / capacidad |
| **Prioridad** | `P0` = bloqueante · `P1` = importante · `P2` = nice-to-have |
| **Depende de** | EPICs que deben estar `Done` antes de iniciar |
| **Complejidad** | `B` = Baja (< 2h) · `M` = Media (2-6h) · `A` = Alta (6-16h) · `MA` = Muy Alta (> 16h) |
| **PARTs** | Número de PARTs planeados (planned, no detallados aún) |
| **%** | Progreso (siempre `0` en Pass 1) |
| **Estado** | `Backlog` · `Planned` · `In-Progress` · `Done` · `Blocked` |

---

## Matriz

| # | EPIC | Prioridad | Depende de | Complejidad | PARTs | % | Estado |
|---|------|-----------|------------|-------------|-------|---|--------|
| 01 | Style Foundation & Migration Audit | **P0** | — | M | 2 | 0 | **Planned** |
| 02 | Hero & Stats Strip | P1 | 01 | B | 2 | 0 | **Planned** |
| 03 | About / Nosotros | P1 | 01 | B | 1 | 0 | **Planned** |
| 04 | Services (3 Pilares) | P1 | 01 | M | 2 | 0 | **Planned** |
| 05 | Products (5 cards) | P1 | 01 | M | 2 | 0 | **Planned** |
| 06 | Open Source (2 cards) | P1 | 01 | B | 1 | 0 | **Planned** |
| 07 | Contacto & Form | P1 | 01 | M | 2 | 0 | **Planned** |
| 08 | Footer & Nav | P1 | 01 | B | 2 | 0 | **Planned** |
| 09 | Scripts & Interactivity | P1 | 01, 02-08 | M | 2 | 0 | **Planned** |
| 10 | REASP Docs Update | **P0** | — | A | 3 | 0 | **Planned** |
| 11 | QA, accessibility, responsive, verification | P2 | 01-10 | A | 2 | 0 | **Planned** |

**Totales:** 11 EPICs · 21 PARTs · 0 % global · 11 en Backlog.

---

## Camino crítico (critical path)

```
EPIC 01 (Style Foundation, M)
   ↓
EPIC 02 → EPIC 03 → EPIC 04 → EPIC 05 → EPIC 06 → EPIC 07 → EPIC 08
   ↓                                                         ↓
EPIC 09 (Scripts, depende de 02-08) ─────────────────────────┘
   ↓
EPIC 11 (QA, depende de 01-10)

EPIC 10 (REASP Docs, paralelo, independiente) ←── puede correr en paralelo
```

- **EPIC 01** y **EPIC 10** son los dos P0.
- **EPIC 11** cierra el ciclo y firma las 8 puertas a nivel packet.

---

## Reglas de promoción de estado

| Transición | Condición |
|------------|-----------|
| `Backlog` → `Planned` | Todos sus PARTs están detallados (Pass 2 completo). |
| `Planned` → `In-Progress` | Orchestrator inicia el PART01. |
| `In-Progress` → `Done` | Las 8 puertas están firmadas en todos sus PARTs. |
| cualquier estado → `Blocked` | Riesgo materializado (RK1-RK8 del `request.md`). |

---

## Riesgos por EPIC (resumen)

| EPIC | Riesgos principales |
|------|---------------------|
| 01 | RK1 (enlaces), RK5 (SEO head), RK3 (iconografía) |
| 02 | RK2 (responsive hero) |
| 04 | Decisión de consolidación 7 → 3 pilares requiere confirmación |
| 05 | REASP/RACSP product-cards deben mantener coherencia visual con REASP/RACSP docs |
| 07 | Form funcional sin backend — aceptar simulación como hasta ahora |
| 09 | Compatibilidad con scripts actuales (IntersectionObserver ya existe) |
| 10 | RK4 (doble versionado), RK7 (versión CLI 1.0.1 final) |
| 11 | Lighthouse Performance post-rediseño (objetivo ≥ 90) |

---

## Próximo paso

Cada EPIC tiene su `README.md` con el backlog detallado (9 secciones) y los PARTs listados como **planned**. NO están detallados todavía.

Esperando Gate A del usuario para iniciar Pass 2 (detallar PARTs).