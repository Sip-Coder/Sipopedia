# Agent Task (Mission-Agnostic)

1. Read `control/active-program.txt`.
2. Read the referenced active program file.
3. Inspect current repo state and identify one narrow, high-confidence improvement aligned to the active mission.
4. Make only the minimal edits needed for that single improvement.
5. Run the mission validator:
   - Website mission: `validators/validate-website.ps1`
   - Terminology mission: `validators/validate-terminology.ps1`
6. Reviewer decision:
   - If validation passes and policy is respected: keep and commit.
   - If validation fails or policy is violated: revert only the latest iteration changes.
7. Log the iteration in `logs/` using `docs/ITERATION_TEMPLATE.md`.

Rules:
- One iteration at a time.
- Keep diffs small and reversible.
- Prefer safety over ambition.
- Never mix objectives from multiple program files in one iteration.
