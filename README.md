# AXEL

Offline-first numeracy learning for South African Foundation Phase (Grade 2–3), built around CPA (Concrete → Pictorial → Abstract) and Axel’s neighbourhood world map.

## Repository layout

| Path | Purpose |
|------|---------|
| [`prototype/`](prototype/) | React + Vite PWA (lessons, map hub, IndexedDB progress) |
| [`docs/caps/`](docs/caps/) | CAPS alignment and Term 1 lesson planning |
| [`docs/UI-examples/`](docs/UI-examples/) | Design reference images (not shipped in the app) |
| [`docs/*.html`](docs/) | Product concept and flow notes |

## Quick start

```bash
cd prototype
npm install
npm run dev
```

See [`prototype/README.md`](prototype/README.md) for persistence, map hub, and build details.

## Curriculum

- **Pilot (built):** five playable lessons — see [`docs/caps/curriculum_alignment.md`](docs/caps/curriculum_alignment.md).
- **Planned:** full Grade 2 Term 1 scope — see [`docs/caps/grade2_term1_lesson_plan.md`](docs/caps/grade2_term1_lesson_plan.md).

CAPS topic metadata in code: [`prototype/src/data/caps/foundation-phase-gr2-3.js`](prototype/src/data/caps/foundation-phase-gr2-3.js).
