create table if not exists public.cellar_scan_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source_type text not null default 'label',
  raw_text text not null default '',
  beverage_type text not null default 'wine',
  producer text not null default '',
  name text not null default '',
  vintage text not null default '',
  region text not null default '',
  country text not null default '',
  grape_or_style text not null default '',
  abv text not null default '',
  cellar_slot text not null default '',
  quantity integer not null default 1,
  rating integer not null default 0,
  pairing_need text not null default '',
  notes text not null default '',
  captured_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (source_type in ('label', 'menu', 'manual')),
  check (beverage_type in ('wine', 'beer', 'spirits', 'other')),
  check (quantity between 0 and 999),
  check (rating between 0 and 100),
  check (length(raw_text) <= 8000),
  check (length(producer) <= 180),
  check (length(name) <= 220),
  check (length(vintage) <= 24),
  check (length(region) <= 120),
  check (length(country) <= 120),
  check (length(grape_or_style) <= 160),
  check (length(abv) <= 32),
  check (length(cellar_slot) <= 120),
  check (length(pairing_need) <= 240),
  check (length(notes) <= 1200)
);

create index if not exists cellar_scan_records_user_updated_idx
  on public.cellar_scan_records (user_id, updated_at desc);

create index if not exists cellar_scan_records_user_beverage_idx
  on public.cellar_scan_records (user_id, beverage_type, region);

drop trigger if exists set_cellar_scan_records_updated_at on public.cellar_scan_records;
create trigger set_cellar_scan_records_updated_at
  before update on public.cellar_scan_records
  for each row execute function public.set_tasting_groups_updated_at();

alter table public.cellar_scan_records enable row level security;

drop policy if exists "users read own cellar scan records" on public.cellar_scan_records;
create policy "users read own cellar scan records"
  on public.cellar_scan_records
  for select
  to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "users create own cellar scan records" on public.cellar_scan_records;
create policy "users create own cellar scan records"
  on public.cellar_scan_records
  for insert
  to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "users update own cellar scan records" on public.cellar_scan_records;
create policy "users update own cellar scan records"
  on public.cellar_scan_records
  for update
  to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

drop policy if exists "users delete own cellar scan records" on public.cellar_scan_records;
create policy "users delete own cellar scan records"
  on public.cellar_scan_records
  for delete
  to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);
