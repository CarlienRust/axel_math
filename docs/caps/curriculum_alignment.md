# CAPS curriculum alignment — AXEL prototype

Field reference for how the **Grade 2 Term 1** app maps to DBE **CAPS Mathematics** Foundation Phase. Learners navigate by the **neighbourhood world map**; CAPS codes are for teachers and authors.

**Code source:** [`prototype/src/data/caps/foundation-phase-gr2-3.js`](../../prototype/src/data/caps/foundation-phase-gr2-3.js)  
**Term 1 plan:** [`grade2_term1_lesson_plan.md`](grade2_term1_lesson_plan.md)

---

## Grade 2 Term 1 map path (20 levels)

| Lvl | Map name | Lesson ID | Lesson title | Block | CAPS topics | Term |
|-----|----------|-----------|--------------|-------|-------------|------|
| 1 | Axel's Spaza shop | `counting-groups` | Counting in groups | A | 1.1, 1.2, 1.12 | 1 |
| 2 | Spaza shelf | `count-forwards-back` | Count on and back | A | 1.2, 1.16 | 1 |
| 3 | Stock room | `skip-count-2-5-10` | Skip count in 2s | A | 1.2 | 1 |
| 4 | Spaza till | `place-value-tens-ones` | Tens and ones | A | 1.5, 1.12 | 1 |
| 5 | Spaza porch | `compare-order-to-99` | Compare and order | A | 1.16 | 1 |
| 6 | Park | `number-bonds` | Number bonds to 10 | A/B | 1.13, 1.16 | 1 |
| 7 | Park games | `bonds-to-20` | Bonds to 20 | B | 1.13, 1.16 | 1 |
| 8 | Park benches | `addition-within-20` | Addition to 20 | B | 1.7, 1.13 | 1 |
| 9 | Soccer field | `addition-within-50` | Addition to 50 | B | 1.7, 1.13 | 1 |
| 10 | Soccer match | `subtraction-within-20` | Subtract to 20 | B | 1.7, 1.13 | 1 |
| 11 | Big Market | `pattern-copy-ab` | Copy a pattern | C | 2.1 | 1 |
| 12 | Clinic | `pattern-extend` | Extend the pattern | C | 2.1 | 1 |
| 13 | Community Hall | `shapes-2d-sort` | Sort flat shapes | C | 3.1 | 1 |
| 14 | Taxi rank | `shapes-2d-sides` | Sides and corners | C | 3.1 | 1 |
| 15 | Cafe | `money-coins-sa` | SA coins | D | 4.1 | 1 |
| 16 | School | `time-days-order` | Days of the week | D | 4.2 | 1 |
| 17 | School yard | `data-favourite-snack` | Favourite snack graph | D | 5.1 | 1 |
| 18 | Class room | `subtraction-objects` | Subtraction with objects | D | 1.7, 1.13 | 1 |
| 19 | School hall | `multiplication-grouping` | Equal groups | D | 1.14, 1.12 | 1 |
| 20 | Test/recap | `term1-recap` | Term 1 recap | D | 1.7, 1.13, 1.16, 5.1 | 1 |

Unlock order is **strictly linear** along the map: level *N* requires level *N − 1* complete (enforced in app code and CAPS metadata).

**Note:** Level 3 teaches skip counting in **2s** only; 5s and 10s are a later Term 1 extension. Level 19 introduces **equal groups / repeated addition** (CAPS 1.14) in the school hall context.

---

## CPA + Visualise

| Stage | When |
|-------|------|
| Concrete → Pictorial → Visualise → Abstract | All 20 levels |
| **Axel explains** intro card | All 20 levels (before Concrete) |

---

## Maintenance

When adding a lesson: update `LESSON_CAPS_MAP`, lesson file, `PILOT_LESSONS` in `lessons/index.js`, and this table. Map positions auto-generate from lesson count in `worldMap.js`.
