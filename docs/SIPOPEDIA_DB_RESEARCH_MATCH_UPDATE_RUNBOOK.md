# Sipopedia Terminology DB Research, Match, and Update Runbook

This runbook documents how Sipopedia terminology content was researched, matched to Supabase, uploaded, and kept aligned with the website. It is intended to make `terminology/sipopedia-new-terms.jsonl` the repeatable user-edited source file for future terminology updates.

## Canonical Source

Use this file as the editable source of truth for new or updated Sipopedia terminology:

```text
terminology/sipopedia-new-terms.jsonl
```

Do not use or recreate these older variants unless the workflow is intentionally changed:

```text
terminology/sipopedia-new-terms.md
terminology/sipopedia-new-terms
```

Each line in the JSONL file is one candidate terminology row shaped for `public.terminology_entries`.

## What Was Researched

The integration work checked five layers:

1. `terminology/` source files and existing JSONL structure.
2. Supabase schema for `public.terminology_entries`.
3. Current Sipopedia frontend routing and modal presentation.
4. Existing infographic asset locations and URL conventions.
5. Import, audit, and generation scripts that already existed in the repo.

Primary repo areas reviewed:

```text
terminology/sipopedia-new-terms.jsonl
terminology/index.json
src/lib/terminology.ts
src/components/Terminology.tsx
src/components/TerminologyAdmin.tsx
src/App.tsx
src/lib/siteMap.ts
src/styles.css
supabase/schema.sql
supabase/terminology_import_template.sql
scripts/audit-terms.js
scripts/start-terms.js
scripts/import-sipopedia-jsonl.js
scripts/generate-term-infographics.js
public/infographics/regeneration/
```

## Website Routing Researched

Sipopedia is routed through the hash workspace app:

```text
http://127.0.0.1:5173/#app/sipopedia
https://sipopedia.com/#app/sipopedia
```

Routing flow:

1. `src/App.tsx` reads and normalizes the hash route.
2. `src/lib/siteMap.ts` includes the Sipopedia workspace destination.
3. `src/components/Terminology.tsx` renders the Sipopedia page.
4. `src/lib/terminology.ts` fetches terminology rows from Supabase.
5. Term modals use full row detail from `getTerminologyById()`.

The live site behavior was used as precedent for how terms should be presented: searchable list, alphabet filtering, paginated results, infographic previews, and modal-first details.

## Supabase Table Matched

The target table is:

```sql
public.terminology_entries
```

The importer maps JSONL rows into the columns the frontend already reads:

```text
term
meaning
how_to_apply
examples
other_ideas
reference_links
mla_citations
infographic_url
infographic_caption
source_note
source_title
source_authors
purchase_links
is_published
is_verbatim_from_source
source_rights_basis
```

Database-managed or generated fields are left to Supabase:

```text
id
normalized_term
sort_group
importance_score
created_at
updated_at
```

## JSONL Matching Rules

Implemented in:

```text
scripts/import-sipopedia-jsonl.js
```

Matching and normalization behavior:

1. `term`, `meaning`, and `how_to_apply` are trimmed and imported directly.
2. `examples`, `other_ideas`, `mla_citations`, and `source_authors` are normalized to arrays.
3. String `examples` values are converted into one-item arrays.
4. `reference_links` only keeps valid `http` and `https` URLs.
5. `purchase_links` uses explicit JSONL purchase links when present, otherwise falls back to valid reference links.
6. `source_title` uses an explicit source title when present, otherwise derives a usable title from MLA citation or reference domain.
7. `is_verbatim_from_source` is set to `false`.
8. `source_rights_basis` is set to `Original editorial rewrite`.
9. `is_published` is controlled by import mode; production import used `--publish`.

Review metadata is preserved in `source_note`, including:

```text
canonical_source=terminology/sipopedia-new-terms.jsonl
candidate_number
review_status
batch_id
source_format
jsonl_updated_at
original_infographic_reference
```

## Duplicate Handling

Terms are matched by normalized term value, not by candidate number.

Rules:

1. Never insert repeated terms.
2. If a normalized term already exists, update/enrich the existing row.
3. Existing useful content should not be replaced with lower-quality blanks.
4. Duplicate JSONL rows are collapsed before import.
5. Known duplicate examples from the first import were `Dosage`, `Brut Nature`, and `Diacetyl`.

## Infographic Research and Matching

Existing local terminology infographics are stored under:

```text
public/infographics/regeneration/
```

The website expects public URLs like:

```text
/infographics/regeneration/example-term.png
```

Importer infographic behavior:

1. Slugify the term.
2. Check whether `public/infographics/regeneration/{slug}.png` exists.
3. If found, write `/infographics/regeneration/{slug}.png` into `infographic_url`.
4. Preserve existing valid `/infographics/...` local URLs.
5. Accept external image URLs only when they end in a direct image extension such as `.png`, `.jpg`, `.jpeg`, `.webp`, or `.gif`.
6. Do not store normal web pages as `infographic_url`.
7. Store rejected original infographic references in `source_note` for later review.

## Image Generation Policy

Do not use the repo-side OpenAI API-key script for new infographic generation unless explicitly approved.

The repo has:

```text
scripts/generate-term-infographics.js
```

That script requires environment credentials such as `OPENAI_API_KEY`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY`. For the current workflow, missing infographics should instead be generated through the Codex image generation path the other terminals are using, referred to by the user as image-gen2 via GPT-5.5.

Practical rule:

1. Use Supabase only to identify terms missing `infographic_url`.
2. Generate new art through the Codex image-gen/GPT-5.5 path, not the local API-key script.
3. Save approved PNGs into `public/infographics/regeneration/`.
4. Update `infographic_url` to the matching public path.
5. Re-run the JSONL import or direct DB update only after assets exist.

## DB Upload Method

The repeatable command is:

```bash
npm run terms:import-jsonl -- --dry-run
```

For production import:

```bash
npm run terms:import-jsonl -- --publish
```

When SQL output is needed:

```bash
npm run terms:import-jsonl -- --publish --sql-out review\terminology\sipopedia-jsonl-import.sql
```

Large SQL uploads can exceed Supabase Management API request limits. In that case, use chunked import output from the importer instead of one large SQL file.

## Live DB Verification Queries

Use Supabase CLI against the linked project after authentication.

Overall table count:

```sql
select
  count(*)::int as total,
  count(*) filter (where is_published)::int as published,
  count(*) filter (where source_note like '%canonical_source=terminology/sipopedia-new-terms.jsonl%')::int as jsonl_source,
  count(*) filter (where infographic_url is not null and btrim(infographic_url) <> '')::int as with_infographic,
  count(*) filter (where infographic_url like '/infographics/%')::int as local_infographic,
  count(*) filter (where infographic_url like 'http%')::int as external_infographic
from public.terminology_entries;
```

Find duplicate normalized terms:

```sql
select normalized_term, count(*)::int
from public.terminology_entries
group by normalized_term
having count(*) > 1
order by count(*) desc, normalized_term;
```

Find published terms missing infographics:

```sql
select id, term, importance_score
from public.terminology_entries
where is_published
  and (infographic_url is null or btrim(infographic_url) = '')
order by importance_score desc nulls last, normalized_term
limit 100;
```

Validate a specific term:

```sql
select id, term, meaning, infographic_url, source_note, updated_at
from public.terminology_entries
where normalized_term = lower(regexp_replace('Ale', '[^a-zA-Z0-9]+', '-', 'g'));
```

## UI/UX Updates Matched to the DB

The frontend now treats Supabase as the source of truth for Sipopedia rows.

Current UI behavior:

1. The Sipopedia page reads paginated published rows from Supabase.
2. Search, A-Z filtering, and page size are handled by `listTerminologyPage()`.
3. Full details open through the existing terminology modal.
4. Infographic cards open the same full terminology modal.
5. The gallery filter requests only rows with an `infographic_url`.
6. Ctrl+K search can include Sipopedia term results and route directly to the term modal.

Files involved:

```text
src/lib/terminology.ts
src/components/Terminology.tsx
src/App.tsx
src/styles.css
```

## Repeatable Update Workflow

Use this sequence for future updates:

1. Edit `terminology/sipopedia-new-terms.jsonl`.
2. Run terminology validation:

```bash
powershell -File .\validators\validate-terminology.ps1
```

3. Dry-run import:

```bash
npm run terms:import-jsonl -- --dry-run
```

4. Review duplicate, parse, and infographic warnings.
5. Generate or add missing infographic PNGs through Codex image-gen/GPT-5.5 when needed.
6. Save approved images under `public/infographics/regeneration/`.
7. Run production import:

```bash
npm run terms:import-jsonl -- --publish
```

8. Query Supabase to verify counts and duplicate safety.
9. Run website validation before PR or deployment:

```bash
npm run build
powershell -File .\validators\validate-website.ps1
```

## Operational Notes

Rotate any temporary Supabase access token after use.

Do not commit provider secrets or service role keys. Keep provider credentials in Supabase secrets or local environment only.

For content quality, continue following the Sipopedia terminology policy:

1. Original wording only.
2. Clear, instructional, learner-centered language.
3. Citation-backed entries.
4. No encyclopedia or dictionary domains as sources.
5. Additive enrichment instead of destructive replacement.
