-- Canonical repo-driven terminology table for safe sync.
-- This avoids conflicts with existing public.terminology_entries semantics.

create table if not exists public.terminology_library_entries (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  normalized_term text not null,
  category text not null,
  subcategory text not null,
  concise_definition text not null,
  expanded_explanation text not null,
  why_it_matters text not null,
  related_terms text[] not null default '{}',
  aliases text[] not null default '{}',
  common_confusions text[] not null default '{}',
  citations jsonb not null default '[]'::jsonb,
  quality_score numeric not null default 0 check (quality_score >= 0 and quality_score <= 100),
  status text not null default 'draft' check (status in ('draft', 'review', 'review_required', 'published', 'rejected', 'merged')),
  source_file text not null,
  reviewed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists terminology_library_entries_normalized_term_key
  on public.terminology_library_entries (normalized_term);

create unique index if not exists terminology_library_entries_source_file_key
  on public.terminology_library_entries (source_file);

create index if not exists terminology_library_entries_status_idx
  on public.terminology_library_entries (status);

create index if not exists terminology_library_entries_category_idx
  on public.terminology_library_entries (category, subcategory);

alter table public.terminology_library_entries enable row level security;

drop policy if exists "public read published terminology library" on public.terminology_library_entries;
create policy "public read published terminology library"
  on public.terminology_library_entries
  for select
  using (status = 'published');

drop policy if exists "service role manages terminology library" on public.terminology_library_entries;
create policy "service role manages terminology library"
  on public.terminology_library_entries
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
