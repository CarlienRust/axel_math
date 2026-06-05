# AXEL prototype

Offline-first PWA for South African Grade 2–3 numeracy (CPA lessons, portrait mobile).

## Run locally

```bash
cd prototype
npm install
npm run dev
```

Production build (includes service worker precache):

```bash
npm run build
npm run preview
```

## Map hub

- Single home screen: `WorldMapScreen` (layered SVG scene + dynamic path + React lesson nodes).
- Tall portrait map (360×720) scrolls vertically.
- See `src/data/worldMap.js` and `src/components/WorldMapScene.jsx`.

## Lessons

**19 lessons** under `src/data/lessons/` covering Grade 2 Term 1 (+ Term 2 bridge). Level 1 runs Concrete → Pictorial → Abstract; levels 2–19 add **Visualise** between Pictorial and Abstract. Map scroll height grows with lesson count (`worldMap.js`).

Replay of completed levels uses `src/data/lessonVariants.js` for new numbers; replay does not change saved progress.

## Persistence (offline progress)

All learner data stays **on the device**. No server is required after install.

| Storage | Name | Contents |
|---------|------|----------|
| IndexedDB (primary) | `axel-pilot` | Profile, per-lesson progress, analytics events |
| localStorage (fallback) | `axel-pilot-fallback` | Same shape if IndexedDB is unavailable |

### Object stores

- **profile** — one record (`id: 'main'`): nickname, `avatarKey`, timestamps.
- **progress** — keyed by `lessonId`: `{ completed, stars, lastPlayedAt, checkpoint? }`.
- **events** — append-only analytics (`session_start`, `lesson_start`, `stage_complete`, `lesson_complete`, `lesson_replay`, `answer`, …).

### When data is saved

- **Onboarding** — `saveProfile` after nickname.
- **Lesson complete (first time)** — `saveProgress({ completed: true, stars: 3 })` clears any checkpoint.
- **Mid-lesson** — debounced `checkpoint` on each CPA stage advance (not marked complete).
- **Replay** — no progress write; optional `lesson_replay` event only.

### Switch learner

Menu → **Switch learner** calls `clearProfile()` and wipes profile, progress, and events. This is a full reset for the device (one learner slot in the pilot).

### Prototype feedback

Testers can tap **Give feedback** (hamburger menu or link under progress on the map). Notes are saved locally as `prototype_feedback` events in IndexedDB — works offline.

Optional: add a Google Form link by copying `.env.example` to `.env` and setting `VITE_FEEDBACK_URL`. The dialog then also offers “open our feedback survey”.

### Export (debug)

In the browser console: `await window.__axelExportEvents()` returns `{ profile, progress, events }` (includes `prototype_feedback` entries).

### Future: multiple learners

Progress is not yet scoped by `profileId`. A later version can turn Switch learner into a profile picker without wiping siblings’ data. See plan note in repo docs.

## Curriculum docs

- [`../docs/caps/curriculum_alignment.md`](../docs/caps/curriculum_alignment.md) — pilot lessons vs CAPS
- [`../docs/caps/grade2_term1_lesson_plan.md`](../docs/caps/grade2_term1_lesson_plan.md) — full Term 1 scope and visualisation pedagogy

## UI reference images

Mockups in [`../docs/UI-examples/`](../docs/UI-examples/) are design inspiration only — not embedded in the app.
