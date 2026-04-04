# AI Edu - First Pass

This app now has a safe AI path:

- Frontend (public): no secret keys
- Supabase Edge Function (private): keeps provider keys hidden
- Supports OpenAI, Anthropic, and Google through one function: `ai-router`

## Step 1: Install and run frontend

```bash
npm.cmd install
npm.cmd run dev
```

## Step 2: Connect frontend to Supabase

Create `.env` from `.env.example`:

```bash
VITE_SUPABASE_URL=YOUR_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Important:
- `VITE_SUPABASE_ANON_KEY` is public-safe.
- Do not put OpenAI/Anthropic/Google keys in `.env` for frontend.

## Step 3: Run database SQL

In Supabase SQL Editor, run:

- `supabase/schema.sql`

## Step 4: Add secure AI function

This repo already includes:

- `supabase/functions/ai-router/index.ts`

Deploy it with Supabase CLI:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase functions deploy ai-router --no-verify-jwt
```

## Step 5: Save provider keys as Supabase secrets

Set secrets (these stay server-side):

```bash
supabase secrets set OPENAI_API_KEY=YOUR_KEY
supabase secrets set ANTHROPIC_API_KEY=YOUR_KEY
supabase secrets set GOOGLE_AI_API_KEY=YOUR_KEY
```

Optional model overrides:

```bash
supabase secrets set OPENAI_MODEL=gpt-4.1-mini
supabase secrets set ANTHROPIC_MODEL=claude-3-5-sonnet-latest
supabase secrets set GOOGLE_MODEL=gemini-2.0-flash
```

Redeploy after changing secrets:

```bash
supabase functions deploy ai-router --no-verify-jwt
```

## Start Terms terminology automation

This repo now includes:

- `scripts/start-terms.js`
- `scripts/audit-terms.js`
- `scripts/ralph-loop-start.ps1`
- `docs/TERMS_AUTOMATION_PLAYBOOK.md`

What it does:
- Runs a 7-stage agent loop for terminology intake:
  - planner
  - source scanner
  - term extractor
  - dedupe + policy filter
  - writer
  - citation compliance
  - quality gate + persist
- Blocks encyclopedia and dictionary domains by policy.
- Dedupes against existing `public.terminology_entries`.
- Writes run reports under `review/terminology/`.

Run steps:

```bash
npm run terms:audit -- --limit 535
npm run terms:start -- --dry-run
npm run terms:start
```

Ralph-style loop mode:

```bash
npm run terms:loop -- -Iterations 3 -Letters ABC -BatchPerLetter 2 -Target 12 -DryRun
```

Required secrets:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Legacy note:
- `supabase/functions/terminology-harvester/index.ts` is now a deprecation stub (HTTP 410).
- Legacy cron-based Wikipedia pipeline is no longer used in the active workflow.

## Step 6: Test in app

Open the website and use the **Safe AI test box**.

- Pick provider
- Type prompt
- Click `Send safely`

Your browser never sees secret provider keys.

## Step 7: Terminology page (30,000+ terms)

This repo now includes a second page: **Terminology**.

- Sorted buckets: `#` first, then `A-Z`
- Terms are loaded from Supabase table: `public.terminology_entries`
- Click any term to open a detail modal (meaning, apply, references, examples, other ideas)
- MLA citations are supported per term with `mla_citations` array
- Admin editor is available on **Terminology Admin** page (requires `profiles.role = 'admin'`)

For bulk import and upsert workflow, use:

- `supabase/terminology_import_template.sql`
- `supabase/terminology_seed_30000_scaffold.sql` (optional load-test scaffold, unpublished by default)
- `supabase/terminology_first_104_seed.sql` (first curated batch seed)

Dev note:
- Current migrations include a development convenience that defaults new profile roles to `admin` for Terminology Admin access.
- Before production, revert profile default role to `student` and manage admin roles explicitly.

Keep entries original and rewritten in your own words to avoid plagiarism.
Do not use placeholder citations. Store only verified source URLs and matching MLA citations per term.

## MCP note

MCP is helpful for your coding workflow, but it is not your runtime secret vault.
The real secret vault for production is Supabase Edge Function secrets.
