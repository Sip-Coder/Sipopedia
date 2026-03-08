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

## Scheduled terminology harvesting (daily cron)

This repo now includes:

- `supabase/functions/terminology-harvester/index.ts`
- `supabase/migrations/202603080001_terminology_harvester_cron.sql`

What it does:
- Runs daily by `pg_cron`
- Calls `terminology-harvester`
- Uses OpenAI web search to research current professional beverage terminology
- Dedupes against existing `public.terminology_entries`
- Inserts up to `500` new schema-compliant terms each run
- Logs each run to `public.terminology_harvest_runs`

Deploy/update steps:

```bash
supabase functions deploy terminology-harvester --no-verify-jwt
supabase db push
```

Required secrets:

```bash
supabase secrets set OPENAI_API_KEY=YOUR_KEY
supabase secrets set OPENAI_MODEL=gpt-4.1-mini
```

Optional hardening secret (recommended):

```bash
supabase secrets set TERMINOLOGY_CRON_SECRET=YOUR_RANDOM_SECRET
```

Cron expression in migration:
- `0 16 * * *` (16:00 UTC daily = 08:00 PST fixed UTC-8)

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
