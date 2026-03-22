# Program: Karpathy-Style Web Improvement Loop

## Project Name
Sip Studies Website

## Mission
Improve software quality in small, safe, reversible iterations while preserving business behavior.

## Current Objective
Stabilize developer quality gates for this web repo (build reliability first, then lint/typecheck/test when configured), while improving accessibility and maintainability with low-risk edits.

## Success Metrics
- `experiment.ps1` passes all applicable checks.
- No new runtime regressions are introduced.
- Accessibility and responsive quality improve in touched UI areas.
- Maintainability improves (clearer code, dead code reduction, safer imports) without behavior changes.

## Allowed Changes
- UI polish.
- Accessibility fixes.
- Copy cleanup.
- Responsive improvements.
- Fixing broken imports.
- Lint/typecheck/test/build fixes.
- Dead code cleanup.
- Safe performance improvements.
- Maintainability refactors that do not change business behavior.

## Forbidden Changes
- Auth changes.
- Payment changes.
- Database/schema changes.
- Secrets or environment value edits (`.env*`, secret stores).
- Destructive file deletion.
- Major redesigns.
- Dependency churn without strong reason.
- Git history rewrite.
- Force push.
- Deleting `.git`.

## Experiment Budget
- Max iterations per run: `5`.
- Time budget per iteration: `30 minutes`.
- File touch budget per iteration: `<= 5 files` unless explicitly justified in log.

## Stop Conditions
- `manual_stop: false` (set to `true` to stop the loop).
- Any severe repository instability.
- Repeated validator failure after revert attempt.
- Policy violation detected by Reviewer.
- Objective marked complete by human.

## Git Safety Rules
- Never rewrite history.
- Never force push.
- Never delete `.git`.
- Never commit secrets.
- Never edit `.env` values.
- Keep commits small and descriptive.
- One commit per successful kept iteration.
- If an iteration fails, revert only that iteration's changes.

## Review Criteria
- Change is within allowed scope and outside forbidden scope.
- Validation outcomes improve or stay green.
- Diff is minimal and reversible.
- No unrelated files are modified.
- Commit message is specific and traceable to hypothesis.

## Priority Order For Improvements
1. Restore/keep build health.
2. Enable and pass lint/typecheck/test scripts when already present.
3. Fix obvious runtime errors and broken imports.
4. Accessibility and responsive improvements in touched UI.
5. Safe maintainability refactors and dead code cleanup.
