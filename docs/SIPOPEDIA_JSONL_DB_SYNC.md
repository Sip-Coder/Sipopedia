# Sipopedia JSONL to Supabase Sync

This note documents how `terminology/sipopedia-new-terms.jsonl` was researched, matched to the current Sipopedia database model, uploaded to Supabase, and connected to the website UI.

## Source File

Canonical editable file:

```text
terminology/sipopedia-new-terms.jsonl
```

Do not create or use the extensionless `terminology/sipopedia-new-terms` duplicate. The repo guideline names `terminology/sipopedia-new-terms.jsonl` as the canonical new-term review file.

Each JSONL row is treated as one candidate terminology record. During review, the file contained:

- `20,000` JSONL lines
- `0` JSON parse errors
- `19,997` unique normalized terms
- `3` duplicate normalized terms collapsed: `Dosage`, `Brut Nature`, `Diacetyl`
- `480` rows where `examples` was a string instead of an array
- `19,520` rows with blank `infographic_url`

## Research Performed

The terminology folder was inspected first to identify the true source file and related local artifacts.

Relevant paths reviewed:

- `terminology/sipopedia-new-terms.jsonl`
- `terminology/index.json`
- `src/lib/terminology.ts`
- `src/components/Terminology.tsx`
- `src/components/TerminologyAdmin.tsx`
- `src/styles.css`
- `supabase/schema.sql`
- `supabase/terminology_import_template.sql`
- `scripts/start-terms.js`
- `scripts/audit-terms.js`
- `scripts/generate-term-infographics.js`
- `scripts/terms-policy.js`
- `public/infographics/regeneration/`

Live Supabase was also queried after CLI token access was provided.

Pre-import live database summary:

```sql
select
  count(*)::int as total,
  count(*) filter (where is_published)::int as published,
  count(*) filter (where infographic_url is not null and btrim(infographic_url) <> '')::int as with_infographic,
  count(*) filter (where infographic_url like '/infographics/%')::int as local_infographic,
  count(*) filter (where infographic_url like 'http%')::int as external_infographic
from public.terminology_entries;
```

Pre-import result:

- `1,291` total rows
- `744` published rows
- `535` rows with infographic URLs
- `533` local infographic URLs
- `2` external infographic URLs

## Current Website Routing

Sipopedia is rendered at:

```text
http://127.0.0.1:5173/#app/sipopedia
https://sipopedia.com/#app/sipopedia
```

Route wiring:

- `src/App.tsx` normalizes `#app/sipopedia` to the Sipopedia workspace page.
- `src/lib/siteMap.ts` declares `app/sipopedia` as a `Game` room route.
- `src/components/Terminology.tsx` renders the public Sipopedia UI.
- `src/lib/terminology.ts` queries `public.terminology_entries`.

Primary frontend data calls:

- `listTerminologyPage()` selects summary rows: `id`, `term`, `sort_group`, `meaning`, `infographic_url`.
- `getTerminologyById()` selects the full modal payload.
- The UI subscribes to Supabase realtime changes for `public.terminology_entries`.

## Supabase Table Match

The target table is:

```sql
public.terminology_entries
```

Live required columns matched by the importer:

- `term`
- `meaning`
- `how_to_apply`
- `examples`
- `other_ideas`
- `reference_links`
- `mla_citations`
- `infographic_url`
- `infographic_caption`
- `source_note`
- `is_published`
- `source_title`
- `source_authors`
- `purchase_links`
- `is_verbatim_from_source`
- `source_rights_basis`

Generated/database-managed columns:

- `id`
- `normalized_term`
- `sort_group`
- `importance_score`
- `created_at`
- `updated_at`

The database trigger computes sort and importance fields. The importer does not manually set them.

## JSONL Mapping Rules

Implemented in:

```text
scripts/import-sipopedia-jsonl.js
```

Mapping behavior:

- `term` maps directly after trimming.
- `meaning` maps directly after trimming.
- `how_to_apply` maps directly after trimming.
- `examples` is normalized to `text[]`; string examples become a one-item array.
- `other_ideas` is normalized to `text[]`; missing values become an empty array.
- `reference_links` accepts URL arrays and filters to valid `http` or `https` URLs.
- `mla_citations` is normalized to `text[]`.
- `source_authors` is normalized to `text[]`.
- `purchase_links` uses JSONL `purchase_links` if present; otherwise it falls back to `reference_links`.
- `source_title` uses an explicit JSONL `source_title` if present; otherwise it is derived from the first MLA citation or first reference domain.
- `is_verbatim_from_source` is always `false`.
- `source_rights_basis` is set to `Original editorial rewrite`.
- `is_published` is controlled by import mode. The production import used `--publish`.

Review metadata preserved in `source_note`:

- `canonical_source=terminology/sipopedia-new-terms.jsonl`
- `candidate_number`
- `review_status`
- `batch_id`
- `source_format`
- `jsonl_updated_at`

## Infographic Matching

Infographic files were found in:

```text
public/infographics/regeneration/
```

The current Sipopedia UI expects image paths in `infographic_url`. The existing component also includes compatibility fallback logic for older paths.

Importer behavior:

- Checks for a local file at `public/infographics/regeneration/{slugified-term}.png`.
- If found, writes `/infographics/regeneration/{slugified-term}.png`.
- Keeps existing local `/infographics/...` paths.
- Accepts external URLs only when they are direct image URLs ending in `.png`, `.jpg`, `.jpeg`, `.webp`, or `.gif`.
- Does not store normal web pages as `infographic_url`.
- Preserves rejected/non-image source references inside `source_note` as `original_infographic_reference=...`.

The dry run found `45` JSONL rows with existing local generated infographics.

## Upload Process

Dry run:

```bash
npm run terms:import-jsonl -- --dry-run
```

Generate one large SQL file:

```bash
npm run terms:import-jsonl -- --publish --sql-out review\terminology\sipopedia-jsonl-import.sql
```

The one-file upload hit Supabase Management API request size limits:

```text
unexpected status 413: request entity too large
```

Chunked SQL generation was added and used instead:

```bash
npm run terms:import-jsonl -- --publish --sql-dir review\terminology\sipopedia-jsonl-import-chunks
```

This generated `40` chunk files.

Chunk upload was executed with:

```powershell
$env:SUPABASE_ACCESS_TOKEN='<token>'
$files = Get-ChildItem review\terminology\sipopedia-jsonl-import-chunks\*.sql | Sort-Object Name
$i = 0
foreach ($file in $files) {
  $i += 1
  npx.cmd supabase db query --linked -f $file.FullName -o json
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
```

The first run completed chunks `1` through `26`, then the remote host closed the connection on chunk `27`. Because each chunk is an idempotent upsert transaction, the upload was resumed from chunk `27`.

Resume command shape:

```powershell
$env:SUPABASE_ACCESS_TOKEN='<token>'
$files = Get-ChildItem review\terminology\sipopedia-jsonl-import-chunks\*.sql | Sort-Object Name | Select-Object -Skip 26
$i = 26
foreach ($file in $files) {
  $i += 1
  $attempt = 0
  do {
    $attempt += 1
    npx.cmd supabase db query --linked -f $file.FullName -o json
    $code = $LASTEXITCODE
    if ($code -eq 0) { break }
    Start-Sleep -Seconds 8
  } while ($attempt -lt 3)
  if ($code -ne 0) { exit $code }
}
```

All `40` chunks completed.

## Post-Import Verification

Post-import live summary query:

```sql
select
  count(*)::int as total,
  count(*) filter (where is_published)::int as published,
  count(*) filter (where source_note like '%canonical_source=terminology/sipopedia-new-terms.jsonl%')::int as jsonl_imported,
  count(*) filter (where infographic_url like '/infographics/%')::int as local_infographic,
  count(*) filter (where infographic_url like 'http%')::int as external_infographic
from public.terminology_entries;
```

Post-import result:

- `21,239` total rows
- `20,692` published rows
- `19,997` rows imported from `terminology/sipopedia-new-terms.jsonl`
- `535` local infographic URLs
- `2` external infographic URLs

Spot-check query:

```sql
select
  term,
  is_published,
  infographic_url,
  source_title,
  cardinality(reference_links)::int as refs,
  cardinality(mla_citations)::int as citations,
  cardinality(examples)::int as examples
from public.terminology_entries
where term in ('Dosage','Brut Nature','Diacetyl','Pinot Noir Solera Fraction')
order by term;
```

Confirmed:

- required arrays were populated
- imported terms were published
- local infographic paths resolved where matching generated assets existed
- non-image source pages were not stored as infographic URLs

## UI and UX Updates

Sipopedia UI updates were made in:

```text
src/components/Terminology.tsx
src/styles.css
```

Changes:

- Renamed the visible workspace header to `Terminology Studio`.
- Added a clearer `Sipopedia` overline.
- Tightened the filter rail into a workbench-style layout.
- Added a result summary bar showing the active mode and indexed count.
- Added a `Graphic` badge on rows that have an `infographic_url`.
- Updated modal labels from generic `Infographic` to `Learning Graphic`.
- Kept the existing modal evidence structure: meaning, application, examples, source, authors, purchase links, references, MLA citations, and editorial policy.

The UI remains compatible with the current website precedent because the data contract still uses `public.terminology_entries` and the existing `TerminologyDetail` modal payload.

## Validation Commands

Run before future uploads:

```bash
npm run terms:import-jsonl -- --dry-run
npm run build
```

Run to regenerate chunk SQL:

```bash
npm run terms:import-jsonl -- --publish --sql-dir review\terminology\sipopedia-jsonl-import-chunks
```

Run to import only approved/published rows from the JSONL:

```bash
npm run terms:import-jsonl -- --only-approved --sql-dir review\terminology\sipopedia-jsonl-import-chunks
```

Use `--publish` only when every valid JSONL row should become visible on Sipopedia.

## Token Handling

The Supabase access token was used only as a process environment variable for CLI calls. Because it was shared in chat, it should be rotated and treated as compromised.
