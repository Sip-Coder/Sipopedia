# Change Policy

## Purpose
Define hard safety boundaries for the improvement loop.

## Always Allowed
- Small UI polish and readability updates.
- Accessibility improvements (labels, semantics, contrast-safe refinements, keyboard usability).
- Responsive fixes that preserve intent.
- Broken import/path fixes.
- Build/lint/type/test fixes that do not alter business behavior.
- Dead code cleanup.
- Maintainability refactors with equivalent behavior.

## Allowed With Explicit Rationale In Iteration Log
- Dependency updates in `package.json` or lockfiles.
- Changes touching shared utility modules used across many pages.
- Non-trivial performance changes that may affect rendering behavior.

## Disallowed By Default
- Auth behavior or role/permission changes.
- Payment/billing behavior changes.
- Database/schema changes (`supabase/schema.sql`, `supabase/migrations/**`).
- Secret and environment edits (`.env*`, secret configuration values).
- Destructive deletion of project files.
- Major redesign or IA overhaul.
- Git history rewrite, force push, or any `.git` manipulation.

## Diff Hygiene
- Keep each iteration focused on one hypothesis.
- Prefer minimal file set and small patch size.
- Avoid formatting-only churn in unrelated files.
- Do not mix feature work with cleanup in one iteration.

## Revert Policy
- On failed validation or policy violation, revert only the latest iteration's uncommitted changes.
- If revert cannot be completed cleanly, stop immediately and require human intervention.

## Commit Policy
- One commit per successful kept iteration.
- Commit message format: `agent-loop: iter <N> - <short hypothesis>`.
- Never include secrets in staged content.
