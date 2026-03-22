# Terminology Pass

## Timestamp
2026-03-13T02:42:14.3446478-07:00

## Active Program
programs/program.terminology.md

## Candidate Batch
- Malolactic Fermentation (wine) -> published, quality_score 88
- First Crack (coffee) -> published, quality_score 84
- Krausening (beer) -> review, quality_score 74

## Commands Run
- powershell -NoProfile -ExecutionPolicy Bypass -File .\validators\validate-terminology.ps1

## Validator Result
- files=3
- entries=3
- published=2
- structural_failures=0
- borderline=1
- review_queue=review/terminology/terminology-review-20260313-024153.md

## Outcome
- Published only high-quality entries (score >= 80 with citations).
- Sent borderline entry to review queue.
