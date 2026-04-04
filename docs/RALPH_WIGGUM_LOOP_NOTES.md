# Ralph Wiggum Loop Notes

## Sources Reviewed
- https://ghuntley.com/ralph/
- https://ralphwiggum.org/
- https://github.com/ghuntley/ralphcoin

## Practical Takeaways For Sipopedia
- Use deterministic iterative loops.
- Keep scope narrow per loop (single letter + beverage group when possible).
- Persist state each iteration (markdown run report).
- Tune instructions based on observed failure patterns.
- Prefer scheduler behavior in the top-level loop with explicit staged workers.

## Sipopedia Mapping
- Trigger: `start terms`
- Loop:
1. audit existing terms
2. run dry generation
3. inspect report + policy violations
4. run live generation as unpublished
5. editorial review + publish gate

## Important Constraints
- Do not use encyclopedia or dictionary domains for sources.
- Keep all term text original and non-verbatim.
- Require references and MLA citations for every generated candidate.
