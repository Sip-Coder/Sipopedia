# Beverage Quiz Rebuild (2026-05-13)

## Why this rebuild was needed

The old `Beverage Quiz` implementation was tied to legacy guild-extracted question data and did not support exam-track-first practice at the depth needed for modern students.

## Review of what previously existed

File reviewed:

`src/components/BeverageQuiz.tsx` (pre-rebuild)

### Pros

1. Functional quiz flow with answer selection, scoring, and reveal mode.
2. Basic topic filtering.
3. Existing report/export actions were already integrated.

### Cons

1. Not organized around certification tracks (CMS/WSET/SWE/Cicerone).
2. Question volume and curation model were limited and legacy-source-bound.
3. Exam length options were fixed at `20/30/40` and not aligned to requested increments.
4. Topic model focused on generic categories, not weakness-first exam domains.
5. Country-focused training was not structured as dedicated subcategories.

### Quirks

1. Selection logic depended on extracted guild document metadata and fallback mixing.
2. Distribution balancing was tied to guild standards, not exam standards.
3. Difficulty progression and exam blueprinting were implicit rather than explicit.

## What was implemented

Primary file replaced:

`src/components/BeverageQuiz.tsx`

### New architecture

1. Exam-first engine with tracks:
   - `CMS`
   - `WSET`
   - `SWE`
   - `Cicerone`
2. Exam-division support by track:
   - `CMS`: All, Wine, Spirits, Service & Hospitality
   - `WSET`: All, Wine, Spirits, Sake
   - `SWE`: All, Wine, Spirits, Hospitality
   - `Cicerone`: All, Beer, Service & Hospitality
3. Exam-level support by track:
   - `CMS`: All, Introductory Sommelier, Certified Sommelier, Advanced Sommelier, Master Sommelier
   - `WSET`: All, Level 1, Level 2, Level 3, Diploma
   - `SWE`: All, HBSC, CSW, CSS, CWE
   - `Cicerone`: All, Certified Beer Server, Certified Cicerone, Advanced Cicerone, Master Cicerone
4. Core bank target:
   - `5000` questions per exam track (`CORE_QUESTION_TARGET_PER_EXAM`)
5. Practice exam lengths:
   - `10`
   - `20`
   - `50`
   - `100`
6. Weakness-focused topic filters:
   - Service
   - Storage & Cellar
   - Viticulture
   - Vinification / Winemaking
   - Tasting & Sensory
   - Sparkling
   - Fortified
   - Spirits Core
   - Beer Brewing
   - Beer Styles
   - Draught Systems
   - Beer Off-Flavors
7. Country subcategories:
   - Added broad country-focus topic groups across Europe, Americas, Africa, and Asia-Pacific (including Italy, Argentina, France, Spain, Portugal, Germany, Austria, Greece, Hungary, Romania, Bulgaria, Croatia, Slovenia, Serbia, North Macedonia, Switzerland, Georgia, Armenia, Lebanon, Israel, Turkey, Morocco, Algeria, Tunisia, Egypt, United States, Canada, Mexico, Argentina, Chile, Uruguay, Brazil, Peru, Bolivia, Paraguay, England, Wales, Scotland, Ireland, Belgium, Netherlands, Czech Republic, Slovakia, Moldova, Ukraine, Russia, South Africa, Australia, New Zealand, China, Japan, South Korea, India, Thailand, Vietnam).
   - Country-focus categories are available across all exam tracks and are retained when division filtering is active.

### How the 5000/core set works

1. Questions are generated deterministically from exam/topic fact blueprints.
2. Each exam track/division/level context receives its own materialized core bank of `5000`.
3. Exam generation samples from the chosen exam + division + level + topic scope.

## Rollback instructions

If you need to revert quickly:

1. Restore the previous quiz component:
   - Replace `src/components/BeverageQuiz.tsx` with the previous version from git history.
2. Keep route wiring unchanged:
   - No route ID changes were made (`app/beverage-quiz` remains the same).
3. If only partial rollback is needed:
   - Change `CORE_QUESTION_TARGET_PER_EXAM` to a lower value.
   - Adjust `QUIZ_LENGTH_OPTIONS` back to old values.
   - Remove specific topics from `BASE_TOPICS` and/or `COUNTRY_TOPICS`.
   - Remove or simplify `EXAM_DIVISIONS` and/or `EXAM_LEVELS`.

## Known caveats

1. Current 5k banks are generated from curated blueprint facts and templates; they are structurally exam-ready but still benefit from ongoing editorial expansion for deeper breadth.
2. Country list is broad but not exhaustive for every possible country-level exam reference.
3. Legacy export/email features from the old quiz were intentionally removed in this rebuild to keep focus on exam-quality training flow.

## Next recommended expansion pass

1. Expand country modules with legal frameworks and appellation-specific item sets.
2. Add psychometric metadata (difficulty index, discrimination) and spaced repetition tagging.
3. Add official blueprint weights per exam/level once the editorial team approves a weighting map.
