# Change Policy

## Allowed
- UI polish.
- Copy cleanup.
- Accessibility fixes.
- Responsive improvements.
- Dead code cleanup.
- Performance improvements without business logic change.
- Fixing imports.
- Fixing tests.
- Terminology additions and terminology improvements that pass policy.

## Forbidden Unless Explicitly Requested
- Deleting large sections.
- Changing secrets or `.env` values.
- Changing payments/auth/database behavior.
- Schema migrations without instruction.
- Destructive git actions.
- Dependency churn without reason.
- Replacing human-reviewed terminology with lower-confidence entries.

## Operational Rules
- Keep changes narrow and reversible.
- One mission at a time based on `control/active-program.txt`.
- One commit per successful kept iteration.
- Revert only the latest iteration on failure.
