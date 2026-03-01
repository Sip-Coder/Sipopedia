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
