# Grade 2 Term 1 — full lesson plan (AXEL)

Plan for a **complete Term 1** numeracy experience (~10 teaching weeks), extending the five-lesson pilot. Grounded in CAPS Foundation Phase Mathematics and AXEL design principles: **offline-first**, **CPA**, **low reading load**, and **explicit teaching of visualisation** (not only doing maths for learners).

**Alignment index:** [`curriculum_alignment.md`](curriculum_alignment.md)  
**Pilot implementation:** [`prototype/src/data/lessons/`](../../prototype/src/data/lessons/)

---

## 1. Pedagogy: help them see it *and* learn to see it

Many Grade 2 learners struggle to **picture** a story sum or **understand** dense text. AXEL should both **scaffold** and **teach the strategy**.

### 1.1 Non-negotiables (every lesson)

| Principle | In the app |
|-----------|------------|
| **CPA order** | Always Concrete → Pictorial → Abstract; never skip to symbols first. |
| **Dual coding** | Every sentence paired with a scene (emoji/SVG), manipulatives, or diagram. |
| **Short language** | Max ~12 words per instruction line; one idea per screen. |
| **Listen everywhere** | `ListenButton` on story sum, stage subtitle, and key feedback. |
| **Re-listen without penalty** | Listening again is modelled as a good strategy, not failure. |
| **Axel as coach** | Tips move from *guide* → *happy*; occasional “Picture it with me” lines. |

### 1.2 Explicit “visualise” beat (implemented in pilot)

Insert between **Pictorial** and **Abstract** when the lesson defines a `visualise` block (`VisualiseStage.jsx`, dynamic stepper in `LessonFlow`):

| Step | Name | What happens |
|------|------|----------------|
| C | Concrete | Manipulate / tap real objects |
| P | Pictorial | Choose the correct picture / ten-frame / number line |
| **V** | **Visualise** | One screen: static scene + Axel prompt *“Close your eyes. See 7 apples in one basket and 5 in another. Open when ready.”* + **Listen** + single **Ready** button (no marking) |
| A | Abstract | Numbers / equation |

**Teaching goal:** V is not assessment; it practises **mental imagery** before symbols. Over time, prompts shorten (“Picture the groups”) so learners internalise the habit.

### 1.3 Reading comprehension supports

| Support | Purpose |
|---------|---------|
| **Story sum card** | Label + one sentence + picture icon; avoid paragraphs. |
| **Word → picture glossary** | Optional tap on one hard word (e.g. “altogether”) → icon + spoken definition. |
| **Colour linking** | Same colour for same quantity across C/P/V/A (e.g. first addend always blue). |
| **Gradual release** | Lesson 1–2: Axel models V; Lesson 3+: learner taps “I pictured it” before Abstract. |

### 1.4 New CPA stage types to build (engineering)

| Type | Strand | Use |
|------|--------|-----|
| `tapNumberLine` | Numbers | Jump forward/back on a line |
| `pickTenFrame` | Numbers | Bonds, make-ten |
| `buildPlaceValue` | Numbers | Drag tens and ones |
| `extendPattern` | Patterns | Copy AB / AAB with tiles |
| `sortShapes` | Space | Group 2D shapes |
| `matchCoins` | Measurement | SA coin values |
| `readPictograph` | Data | Tap tallest column |

Pilot types (`tapCount`, `pickBondPartner`, `pickGroup`, `pickNumber`, etc.) remain the core.

---

## 2. Term 1 pacing overview

Typical **~40 lessons** in a school term; AXEL ships **20 map levels** (one CPA lesson ≈ 15–20 minutes). Supplement with teacher talk and paper where needed.

| Block | Weeks (guide) | Map zone | Lessons |
|-------|---------------|----------|---------|
| **A — Number sense** | 1–3 | Spaza (1–5) | 5 |
| **B — Operations** | 4–6 | Park / soccer (6–10) | 5 |
| **C — Patterns & space** | 7–8 | Big Market → Taxi rank (11–14) | 4 |
| **D — Measure, data & close** | 9–10 | Cafe → Test/recap (15–20) | 6 |

**Pilot status:** All **20 map levels** are **implemented** in the prototype (`prototype/src/data/lessons/`). See [`curriculum_alignment.md`](curriculum_alignment.md) for the full table with map names.

---

## 3. Lesson catalogue — Block A: Number sense

| # | Lesson ID (proposed) | Title | CAPS | Status | Prerequisites |
|---|----------------------|-------|------|--------|---------------|
| A1 | `counting-groups` | Counting in groups | 1.1, 1.2, 1.12 | **Built** | — |
| A2 | `count-forwards-back` | Count on and back | 1.2, 1.16 | **Built** | A1 |
| A3 | `skip-count-2-5-10` | Skip count in 2s | 1.2 | **Built** | A2 |
| A4 | `place-value-tens-ones` | Tens and ones | 1.5, 1.12 | **Built** | A3 |
| A5 | `compare-order-to-99` | Compare and order | 1.16 | **Built** | A4 |
| A6 | `number-bonds` | Number bonds to 10 | 1.13, 1.16 | **Built** | A1 |

### A2 `count-forwards-back` (sketch)

- **Story:** Axel restocks shelves; count on from 24 to 30.
- **C:** Number line taps forward/back (3 steps).
- **P:** Which line shows the right jump?
- **V:** “See the jumps on the line in your head.”
- **A:** Pick end number.

### A3 `skip-count-2-5-10` (sketch)

- **Story:** Park benches, 2 legs each; count legs in 2s.
- **C:** Tap every 2nd object in a row.
- **P:** Choose the skip-count sequence picture.
- **A:** “How many legs on 6 benches?” (2×6 as repeated add preview).

### A4 `place-value-tens-ones` (sketch)

- **Story:** Spaza packs chappies in tens and loose ones.
- **C:** `buildPlaceValue` — drag rods and units to match 47.
- **P:** Which card shows 3 tens 5 ones?
- **A:** Pick numeral.

### A5 `compare-order-to-99` (sketch)

- **Story:** Two spaza prices — which costs more?
- **C:** Drag three price tags into order.
- **P:** Symbol cards < > =
- **A:** Choose comparison sentence (minimal text).

---

## 4. Lesson catalogue — Block B: Operations (Term 1 core)

| # | Lesson ID | Title | CAPS | Status | Prerequisites |
|---|-----------|-------|------|--------|---------------|
| B1 | `number-bonds` | *(see A6)* | | **Built** | |
| B2 | `bonds-to-20` | Bonds to 20 | 1.13, 1.16 | **Built** | A6 |
| B3 | `addition-within-20` | Add to 20 | 1.7, 1.13 | **Built** | B1 |
| B4 | `addition-within-50` | Add to 50 (no regroup) | 1.7, 1.13 | **Built** | B3, A4 |
| B5 | `subtraction-within-20` | Take away to 20 | 1.7, 1.13 | **Built** | B3 |

\*Pilot uses `subtraction-objects` (to 12); rename or add Term-1 variant with V-stage and bonds link.

### B2 `bonds-to-20` (sketch)

- Extend `pickBondPartner` to sums 15 and 20; two concrete beats.
- **V:** “See 13 as 10 and 3. What partners make 20?”

### B4 `addition-within-50` (sketch)

- Combine problems in market context; no regrouping first (e.g. 23 + 14).
- Pictorial: ten-frame combination before abstract sentence.

---

## 5. Lesson catalogue — Block C: Patterns & space (Term 1)

| # | Lesson ID | Title | CAPS strand | Status | Prerequisites |
|---|-----------|-------|-------------|--------|---------------|
| C1 | `pattern-copy-ab` | Copy a pattern | Patterns | **Built** | B3 |
| C2 | `pattern-extend` | What comes next? | Patterns | **Built** | C1 |
| C3 | `shapes-2d-sort` | Sort flat shapes | Space & shape | **Built** | C1 |
| C4 | `shapes-2d-sides` | Sides and corners | Space & shape | **Built** | C3 |

**Visualisation note:** Patterns are inherently pictorial — Concrete uses draggable tiles; **V** asks learners to “say the pattern in your head” (red-blue-red-blue).

---

## 6. Lesson catalogue — Block D: Measurement & data (Term 1)

| # | Lesson ID | Title | CAPS strand | Status | Prerequisites |
|---|-----------|-------|-------------|--------|---------------|
| D1 | `money-coins-sa` | SA coins | Measurement | **Built** | C4 |
| D2 | `time-days-order` | Days and order | Measurement | **Built** | D1 |
| D3 | `data-favourite-snack` | Favourite snack graph | Data handling | **Built** | D2 |

**Reading load:** Money and time use **icons + Listen**; avoid clock word problems until pictorial dial is shown.

---

## 7. School page close (levels 18–20)

Term 1 ends on the school map page:

| Lvl | Lesson ID | Map name | Title | Status |
|-----|-----------|----------|-------|--------|
| 18 | `subtraction-objects` | Class room | Subtraction with objects | **Built** |
| 19 | `multiplication-grouping` | School hall | Equal groups | **Built** |
| 20 | `term1-recap` | Test/recap | Term 1 recap | **Built** |

Level 19 teaches **repeated addition / equal groups** (CAPS 1.14, Term 1). Level 20 samples bonds, compare, and data reading from the term.

---

## 8. Map and product implications

| Topic | Decision |
|-------|----------|
| **Map size** | Extend `MAP_VIEWBOX` height and `MAP_POSITIONS` per ~3–4 nodes per block; or **chapter maps** (Term 1A / 1B). |
| **Node density** | Max 18–22 stops on one scroll map; beyond that, use chapter select. |
| **Settings** | Reuse neighbourhood: spaza, park, market, school, taxi, clinic, hall, sports field. |
| **Replay** | Keep `lessonVariants.js` pattern for every playable lesson. |
| **Checkpoints** | Save from first Concrete beat once V-stage exists (fix pilot gap: resume mid–Concrete). |

---

## 9. Authoring checklist (per new lesson)

- [ ] `LESSON_CAPS_MAP` entry (grade, term, topics, outcomes, `contextProblem`)
- [ ] `intro` block on anchor lessons (optional; levels 4, 6, 9, 15, 17)
- [ ] `narration` strings for C, P, V (if used), A
- [ ] `visualise` block (prompt + optional `sceneKey` for art)
- [ ] Concrete / pictorial / abstract configs
- [ ] `villageReward` / map `setting`
- [ ] `prerequisiteLessonIds` tested on map
- [ ] One `lessonVariants` replay variant
- [ ] Row in `curriculum_alignment.md`

---

## 10. Suggested build order (engineering)

1. ~~**V-stage** component + LessonFlow hook~~ **Done** (`VisualiseStage`, `lessonStages.js`, pilot lessons 2–5).
2. ~~**Block A** lessons A2–A5~~ **Done**
3. ~~**B2, B4, B5**~~ **Done**
4. ~~**Map extension**~~ **Done** (paginated map, 20 levels)
5. ~~**Block C & D**~~ **Done**
6. ~~**Intro card** on anchor lessons~~ **Done** (`LessonIntroCard.jsx`)
7. Checkpoint at `stageIndex === 0` after first meaningful concrete interaction (deferred).

---

## 11. Success criteria (Term 1 complete)

- Learner can complete **20 CPA lessons** offline with progress persisted.
- Every story sum has **Listen** + **visual scene**; lessons from level 2 onward include **Visualise** beat.
- Anchor lessons (4, 6, 9, 15, 17) show **Axel explains** before Concrete.
- Level 20 recap samples **operations, compare, and data** from Term 1.
- Teacher doc lists CAPS topic codes per lesson (`curriculum_alignment.md`).
- Field test: learners can explain *“I pictured it first”* on at least one addition lesson (observation rubric, not in-app exam).

---

*Document version: 2026-05 — living plan; update as lessons ship.*
