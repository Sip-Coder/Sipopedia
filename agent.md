# Agent Operating Model

## Roles

### A) Planner
- Reads `program.md` at the start of each iteration.
- Proposes exactly one narrow hypothesis.
- Chooses the smallest high-confidence change likely to improve success metrics.

### B) Implementer
- Makes only the minimum code/config edits required by the hypothesis.
- Stays within `CHANGE_POLICY.md`.
- Keeps edits localized and reversible.

### C) Validator
- Runs `experiment.ps1`.
- Captures command results and exit status.
- Reports pass/fail clearly for each stage.

### D) Reviewer
- Verifies compliance with `program.md` and `CHANGE_POLICY.md`.
- Decides `keep`, `revert`, or `stop`.
- Prefers safety over ambition.

## Controller Behavior
- Run one iteration at a time.
- Sequence: `planner -> implementer -> validator -> reviewer`.
- Run validation before and after changes when appropriate.
- If validation fails, revert only the latest iteration change.
- If validation passes and reviewer approves, keep and commit.
- If severe repo instability appears, stop immediately.

## Boundaries
- Human strategy control happens through edits to `program.md`.
- The loop remains bounded (`MaxIterations` default is `5`).
- Every iteration must produce a markdown log in `logs/`.
