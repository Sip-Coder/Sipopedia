-- Suggested non-destructive migration for repo->Supabase terminology sync metadata
-- on existing public.terminology_entries.
-- Review manually before applying.
-- NOTE: For conflict-safe sync, prefer:
--   202603130002_create_terminology_library_entries.sql

alter table if exists public.terminology_entries
  add column if not exists source_file text;

alter table if exists public.terminology_entries
  add column if not exists reviewed boolean not null default false;

alter table if exists public.terminology_entries
  add column if not exists aliases text[] not null default '{}';

alter table if exists public.terminology_entries
  add column if not exists common_confusions text[] not null default '{}';

alter table if exists public.terminology_entries
  add column if not exists quality_score numeric;

alter table if exists public.terminology_entries
  add column if not exists status text not null default 'published';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'terminology_entries_status_check'
  ) then
    alter table public.terminology_entries
      add constraint terminology_entries_status_check
      check (status in ('draft', 'review', 'review_required', 'published', 'rejected', 'merged'));
  end if;
end $$;

create index if not exists terminology_entries_source_file_idx
  on public.terminology_entries (source_file);

create index if not exists terminology_entries_status_idx
  on public.terminology_entries (status);
