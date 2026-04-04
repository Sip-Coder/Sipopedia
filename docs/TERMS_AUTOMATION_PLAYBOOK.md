# Start Terms Playbook

## Conversation Trigger
- Trigger phrase: `start terms`
- Expected assistant action:
1. Run `npm run terms:audit`
2. Run `npm run terms:start -- --dry-run`
3. Review report under `review/terminology/`
4. If approved, run `npm run terms:start`
- Default target per run: `100` terms (best-effort with scored quality filters).

## Source Policy (Hard Rules)
- Do not use encyclopedia or dictionary domains.
- Explicit denylist includes:
  - `wikipedia.org`
  - `wiktionary.org`
  - `britannica.com`
  - `dictionary.com`
  - `merriam-webster.com`
  - `collinsdictionary.com`
  - `investopedia.com`
- Prefer:
  - standards bodies
  - regulators
  - professional associations
  - technical education providers

## Preserved Sipopedia Entry Shape
- `Term`
- `Updated Date`
- `Meaning`
- `How to Apply It`
- `Real World Examples`
- `Authors`
- `Infographic`
- `References`
- `MLA Citations`
- `Editorial Policy`

## 7-Agent Start Terms Loop
1. Planner: choose letters, beverage categories, batch goals.
2. Source Scanner: fetch approved domains only.
3. Term Extractor: derive candidate terms from source text.
4. Dedupe + Policy Filter: remove existing terms and banned-source items.
5. Writer: draft original definitions and application text.
6. Citation Compliance: require source links + MLA citations.
7. Quality Gate + Persist: score candidates, queue near-misses, insert as unpublished for editorial QA.

## Scoring + Tuning
- Candidate acceptance is score-based (not all-or-nothing except legal blocks).
- Hard block remains:
  - banned source domains
- Defaults (set in `.env.example`):
  - `TERMS_TARGET=300`
  - `TERMS_SCORE_THRESHOLD=70`
  - `TERMS_NEAR_MISS_THRESHOLD=50`
  - `TERMS_DISCOVERY_MULTIPLIER=8`
  - `TERMS_AUTO_PUBLISH_APPROVED=true`
  - `TERMS_ROTATE_MODE=true`
  - `TERMS_LETTER_WINDOW=8`
  - `TERMS_SOURCES_PER_TYPE=2`
  - `TERMS_DISCOVERY_PASSES=3`
  - `TERMS_MIN_PROGRESS_PER_RUN=1`
  - `TERMS_RECOVER_UNPUBLISHED_PER_RUN=50`
- Weight controls:
  - `TERMS_WEIGHT_LEXICAL_BASE`
  - `TERMS_WEIGHT_STUDY_SIGNAL`
  - `TERMS_WEIGHT_DEFINITION_CUE`
  - `TERMS_WEIGHT_TECHNICAL_ROOT`
  - `TERMS_WEIGHT_SOURCE_AUTHORITY`
  - `TERMS_WEIGHT_SPECIFICITY`
  - `TERMS_WEIGHT_CONTEXT_QUALITY`
- Near-miss queue is written to the run report for later rescue passes.
- Approved terms are auto-published by default.
- Rotation state is persisted to `review/terminology/start-terms-state.json` so each run rotates active letters and source mix.
- Adaptive discovery passes widen source depth and relax threshold per pass; if progress is zero, top near-miss candidates can be promoted to maintain forward movement.
- Recovery stage republishes vetted unpublished legacy entries each run to increase published coverage without allowing nav-noise rows back in.

## Duplicate Handling Rule
- Never insert repeated terms.
- If a discovered term already exists:
  - enrich the existing term only with additive, non-redundant information
  - merge examples/authors/references/citations uniquely
  - skip update when no net-new information is found

## Ralph Wiggum Loop Adaptation
- Use short deterministic loops with one scoped objective per iteration.
- Keep context tight and persist state in reports.
- Command:
  - `npm run terms:loop -- -Iterations 3 -BatchPerLetter 2 -Target 100`
  - optional override: `-Letters ABC` (disables automatic letter rotation)
  - optional override: `-BeverageTypes wine,beer` (limits source mix)
- Each iteration writes a report in `review/terminology/`.

## Existing Library Review
- Baseline target: first `535` terms.
- Audit command:
  - `npm run terms:audit -- --limit 535`
- Optional enforcement:
  - `npm run terms:audit -- --limit 535 --apply`
  - This marks non-compliant terms as unpublished for editorial repair.

## Continuity Notes
- Keep this file updated at the end of each session.
- Add next-session instructions in a short section:
  - what was completed
  - what is blocked
  - exact next command to run
- Canonical count/project sync note:
  - `docs/TERMINOLOGY_SINGLE_SOURCE_OF_TRUTH.md`
