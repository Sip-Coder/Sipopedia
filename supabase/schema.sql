create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.learning_tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tier text not null check (tier in ('starter', 'builder', 'pro')),
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.learning_tracks (id) on delete cascade,
  title text not null,
  lesson_type text not null check (lesson_type in ('video', 'exercise', 'build')),
  minutes integer not null check (minutes > 0),
  position integer not null,
  created_at timestamptz not null default now(),
  unique (track_id, position)
);

create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  score integer check (score >= 0 and score <= 100),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;

create policy "profiles are self-readable"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "profiles are self-updatable"
  on public.profiles
  for update
  using (auth.uid() = id);

create policy "users read own progress"
  on public.lesson_progress
  for select
  using (auth.uid() = user_id);

create policy "users upsert own progress"
  on public.lesson_progress
  for insert
  with check (auth.uid() = user_id);

create policy "users update own progress"
  on public.lesson_progress
  for update
  using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table if not exists public.terminology_entries (
  id uuid primary key default gen_random_uuid(),
  term text not null unique,
  normalized_term text not null default '',
  sort_group text not null default '#',
  importance_score integer not null default 0,
  beverage_type text not null default 'wine',
  category text not null default 'production style',
  meaning text not null,
  how_to_apply text not null default '',
  examples text[] not null default '{}',
  other_ideas text[] not null default '{}',
  related_terms text[] not null default '{}',
  reference_links text[] not null default '{}',
  mla_citations text[] not null default '{}',
  source_title text not null default '',
  source_authors text[] not null default '{}',
  purchase_links text[] not null default '{}',
  is_verbatim_from_source boolean not null default false,
  source_rights_basis text not null default '',
  infographic_url text,
  infographic_caption text,
  source_note text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (
    beverage_type in (
      'wine',
      'beer',
      'spirits',
      'coffee',
      'tea',
      'kombucha',
      'juice',
      'milk',
      'water',
      'energy drinks',
      'health drinks',
      'powdered supplements'
    )
  ),
  check (
    category in (
      'location',
      'terroir',
      'variety of source ingredient',
      'production style'
    )
  ),
  check (sort_group = '#' or sort_group ~ '^[A-Z]$'),
  constraint terminology_entries_reference_links_required check (cardinality(reference_links) > 0),
  constraint terminology_entries_mla_citations_required check (cardinality(mla_citations) > 0),
  constraint terminology_entries_source_title_required check (btrim(source_title) <> ''),
  constraint terminology_entries_source_authors_required check (cardinality(source_authors) > 0),
  constraint terminology_entries_purchase_links_required check (cardinality(purchase_links) > 0),
  constraint terminology_entries_no_verbatim_only check (is_verbatim_from_source = false)
);

alter table public.terminology_entries
  add column if not exists mla_citations text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists beverage_type text not null default 'wine';
alter table public.terminology_entries
  add column if not exists category text not null default 'production style';
alter table public.terminology_entries
  add column if not exists related_terms text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists source_title text not null default '';
alter table public.terminology_entries
  add column if not exists source_authors text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists purchase_links text[] not null default '{}';
alter table public.terminology_entries
  add column if not exists is_verbatim_from_source boolean not null default false;
alter table public.terminology_entries
  add column if not exists source_rights_basis text not null default '';
alter table public.terminology_entries
  drop constraint if exists terminology_entries_reference_links_required;
alter table public.terminology_entries
  add constraint terminology_entries_reference_links_required
  check (cardinality(reference_links) > 0);
alter table public.terminology_entries
  drop constraint if exists terminology_entries_mla_citations_required;
alter table public.terminology_entries
  add constraint terminology_entries_mla_citations_required
  check (cardinality(mla_citations) > 0);
alter table public.terminology_entries
  drop constraint if exists terminology_entries_source_title_required;
alter table public.terminology_entries
  add constraint terminology_entries_source_title_required
  check (btrim(source_title) <> '');
alter table public.terminology_entries
  drop constraint if exists terminology_entries_source_authors_required;
alter table public.terminology_entries
  add constraint terminology_entries_source_authors_required
  check (cardinality(source_authors) > 0);
alter table public.terminology_entries
  drop constraint if exists terminology_entries_purchase_links_required;
alter table public.terminology_entries
  add constraint terminology_entries_purchase_links_required
  check (cardinality(purchase_links) > 0);
alter table public.terminology_entries
  drop constraint if exists terminology_entries_verbatim_rights_required;
alter table public.terminology_entries
  drop constraint if exists terminology_entries_no_verbatim_only;
alter table public.terminology_entries
  add constraint terminology_entries_no_verbatim_only
  check (is_verbatim_from_source = false);

create index if not exists terminology_entries_sort_idx
  on public.terminology_entries (sort_group, normalized_term);

create index if not exists terminology_entries_term_idx
  on public.terminology_entries (term);

create index if not exists terminology_entries_importance_idx
  on public.terminology_entries (sort_group, importance_score desc, normalized_term);

create or replace function public.compute_terminology_importance(input_term text)
returns integer
language plpgsql
immutable
as $$
declare
  t text := lower(coalesce(input_term, ''));
  score integer := 10;
begin
  if t ~ '(prompt|model|embedding|retrieval|vector|token|inference|agent|tool|function|workflow)' then
    score := score + 40;
  end if;

  if t ~ '(eval|evaluation|guardrail|safety|bias|hallucination|alignment|policy|risk)' then
    score := score + 35;
  end if;

  if t ~ '(context|latency|uncertainty|memory|routing|classifier|schema|verification|drift)' then
    score := score + 25;
  end if;

  if t ~ '^(0[0-9]|1[0-9]|2[0-5])' then
    score := score + 10;
  end if;

  return greatest(score, 0);
end;
$$;

create or replace function public.set_terminology_sort_fields()
returns trigger
language plpgsql
as $$
declare
  first_char text;
begin
  new.term := btrim(new.term);
  new.normalized_term := lower(new.term);
  first_char := upper(left(new.term, 1));

  if first_char ~ '^[0-9]$' then
    new.sort_group := '#';
  elsif first_char ~ '^[A-Z]$' then
    new.sort_group := first_char;
  else
    new.sort_group := '#';
  end if;

  new.importance_score := public.compute_terminology_importance(new.term);
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_terminology_sort_fields on public.terminology_entries;
create trigger set_terminology_sort_fields
  before insert or update of term on public.terminology_entries
  for each row execute procedure public.set_terminology_sort_fields();

alter table public.terminology_entries enable row level security;

drop policy if exists "public can read published terminology" on public.terminology_entries;
create policy "public can read published terminology"
  on public.terminology_entries
  for select
  using (is_published = true);

drop policy if exists "admins manage terminology" on public.terminology_entries;
create policy "admins manage terminology"
  on public.terminology_entries
  for all
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create table if not exists public.tasting_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  beverage_type text not null default 'wine',
  title text not null,
  producer text not null default '',
  country text not null default '',
  region text not null default '',
  vintage text not null default '',
  blind_mode boolean not null default false,
  guessed_country text not null default '',
  guessed_region text not null default '',
  guessed_variety text not null default '',
  confidence text not null default '',
  score integer,
  latitude double precision,
  longitude double precision,
  summary text not null default '',
  fields_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (beverage_type in ('wine', 'beer', 'spirits', 'coffee', 'tea', 'other')),
  check (score is null or (score >= 0 and score <= 100)),
  check (confidence in ('', 'Low', 'Medium', 'High')),
  check (latitude is null or (latitude >= -90 and latitude <= 90)),
  check (longitude is null or (longitude >= -180 and longitude <= 180))
);

create index if not exists tasting_notes_user_created_idx
  on public.tasting_notes (user_id, created_at desc);

create index if not exists tasting_notes_user_map_idx
  on public.tasting_notes (user_id, latitude, longitude);

create or replace function public.set_tasting_note_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_tasting_note_updated_at on public.tasting_notes;
create trigger set_tasting_note_updated_at
  before update on public.tasting_notes
  for each row execute procedure public.set_tasting_note_updated_at();

alter table public.tasting_notes enable row level security;

drop policy if exists "users read own tasting notes" on public.tasting_notes;
create policy "users read own tasting notes"
  on public.tasting_notes
  for select
  using (auth.uid() = user_id);

drop policy if exists "users insert own tasting notes" on public.tasting_notes;
create policy "users insert own tasting notes"
  on public.tasting_notes
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update own tasting notes" on public.tasting_notes;
create policy "users update own tasting notes"
  on public.tasting_notes
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "users delete own tasting notes" on public.tasting_notes;
create policy "users delete own tasting notes"
  on public.tasting_notes
  for delete
  using (auth.uid() = user_id);

create table if not exists public.coach_learning_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  session_id text not null,
  overall_accuracy numeric(6, 4) not null default 0,
  improvement_delta numeric(7, 4) not null default 0,
  accuracy jsonb not null default '{}'::jsonb,
  descriptor_analysis jsonb not null default '{}'::jsonb,
  progression jsonb not null default '{}'::jsonb,
  strategy text not null check (strategy in ('structure-first', 'region-first', 'variety-first', 'sensorial-first')),
  feedback_format text not null check (feedback_format in ('short feedback', 'long feedback', 'comparative feedback', 'anchor-based feedback')),
  feedback_performance jsonb not null default '{}'::jsonb,
  region_performance jsonb not null default '{}'::jsonb,
  raw_session jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, session_id)
);

create index if not exists coach_learning_memory_user_created_idx
  on public.coach_learning_memory (user_id, created_at desc);

alter table public.coach_learning_memory enable row level security;

drop policy if exists "users read own coach learning memory" on public.coach_learning_memory;
create policy "users read own coach learning memory"
  on public.coach_learning_memory
  for select
  using (auth.uid() = user_id);

drop policy if exists "users insert own coach learning memory" on public.coach_learning_memory;
create policy "users insert own coach learning memory"
  on public.coach_learning_memory
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update own coach learning memory" on public.coach_learning_memory;
create policy "users update own coach learning memory"
  on public.coach_learning_memory
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.operations_learning_memory (
  id uuid primary key default gen_random_uuid(),
  evaluation_payload jsonb not null default '{}'::jsonb,
  pricing_recommendations jsonb not null default '[]'::jsonb,
  content_roi_rankings jsonb not null default '[]'::jsonb,
  funnel_bottleneck_detection jsonb not null default '[]'::jsonb,
  dashboard_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists operations_learning_memory_created_at_idx
  on public.operations_learning_memory (created_at desc);
