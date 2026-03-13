# Program: Terminology Research And Library Growth

## Mission
Grow a high-quality beverage terminology library for Sip Studies using structured, reviewable entries with strong educational value and source quality.

## Scope Categories
- wine
- beer
- spirits
- coffee
- tea
- water
- sake
- kombucha
- juice
- milk
- energy-drinks
- other

## Source Policy
- Use trusted source classes only (standards bodies, accredited education providers, regulatory references, respected technical references).
- Prefer primary or high-authority secondary references over unsourced glossary mirrors.
- Do not scrape the web or use automatic internet access in this workflow.
- Every entry must include citations.

## Editorial Quality Bar
- Definition is concise, accurate, and plain-language.
- Expanded explanation adds practical context.
- `why_it_matters` is learner-centered and actionable.
- Related terms are meaningful, not keyword stuffing.
- Terminology must be beverage-relevant and instructionally useful.

## Required Fields Per Entry
- `term`
- `category`
- `subcategory`
- `concise_definition`
- `expanded_explanation`
- `why_it_matters`
- `related_terms`
- `citations`
- `quality_score`
- `status`

## Duplicate And Alias Policy
- No duplicate normalized terms across the library.
- Alias collisions must be resolved before publish.
- If synonyms exist, keep one canonical term and list the others as aliases.

## Candidate Scoring Rules
- Score range: `0-100`.
- Consider educational value, usage frequency, exam relevance, and source reliability.
- Reject low-signal or trivia-only terms.

## Publication Threshold
- `status: published` requires:
  - `quality_score >= 80`
  - at least 2 citations
  - no schema/duplicate/alias conflicts

## Review Queue Rules
- Borderline entries (`quality_score` in `65-79`) go to `review/terminology`.
- Invalid structure, weak citations, duplicate conflicts, and uncertain entries go to `review/terminology`.
- Only validated entries can remain `published`.

## Bounded Batch Size
- Default max candidate batch per iteration: `25`.
- Prefer quality over volume.

## Discovery Workflow
1. Harvest candidate terms from trusted source classes.
2. Score candidates for educational value and source quality.
3. Reject weak or duplicate candidates.
4. Draft structured entries.
5. Validate schema, duplicates, and citations.
6. Publish only entries above threshold.
7. Send uncertain entries to review queue.

## Stop Conditions
- `manual_stop: false` (set to `true` to stop).
- Structural validator failures persist after revert.
- Review queue grows faster than it is being resolved.
- Policy violation detected.
