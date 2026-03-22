# Program: Website Improvement

## Mission
Improve the Sip Studies web app in small, reversible iterations that increase reliability, usability, and maintainability without changing core business behavior.

## Success Metrics
- Lint passes when configured.
- Typecheck passes when configured.
- Tests pass when configured.
- Build passes.
- Accessibility issues are reduced in touched areas.
- Responsive behavior improves on common viewport sizes.
- Obvious runtime errors and broken imports are reduced.
- Maintainability improves with no behavior regression.

## Allowed Changes
- UI polish.
- Accessibility fixes.
- Responsive improvements.
- Copy cleanup.
- Dead code cleanup.
- Safe performance improvements.
- Fixing broken imports.
- Lint/typecheck/test/build fixes.
- Refactors that do not change business behavior.

## Forbidden Changes (Unless Explicitly Requested)
- Auth behavior changes.
- Payment/billing changes.
- Database/schema/migration behavior changes.
- Secret or `.env` value changes.
- Destructive file deletion.
- Major redesigns.
- Dependency churn without strong reason.
- Destructive git actions, history rewrite, force push, deleting `.git`.

## Iteration Rules
- One narrow hypothesis per iteration.
- Keep edits localized (prefer <= 5 files).
- Run `validators/validate-website.ps1` every iteration.
- Keep commit only on passing validation and policy compliance.
- Revert only the latest iteration on failure.

## Stop Conditions
- `manual_stop: false` (set to `true` to stop).
- Severe repository instability.
- Repeated validator failures after revert.
- Policy violations.
- Objective complete.

## Logging Rules
- Write one markdown log per iteration to `logs/`.
- Include timestamp, active program, hypothesis, changed files, commands, result, keep/revert, and next idea.

## Git Safety Rules
- Never rewrite history.
- Never force push.
- Never delete `.git`.
- Never commit secrets.
- One commit per successful kept iteration.
