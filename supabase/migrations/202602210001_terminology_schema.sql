create extension if not exists "pgcrypto";
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  role text not null default 'student' check (role in ('student', 'mentor', 'admin')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "profiles are self-readable" on public.profiles;
create policy "profiles are self-readable"
  on public.profiles
  for select
  using (auth.uid() = id);
drop policy if exists "profiles are self-updatable" on public.profiles;
create policy "profiles are self-updatable"
  on public.profiles
  for update
  using (auth.uid() = id);
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
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
  meaning text not null,
  how_to_apply text not null default '',
  examples text[] not null default '{}',
  other_ideas text[] not null default '{}',
  reference_links text[] not null default '{}',
  mla_citations text[] not null default '{}',
  infographic_url text,
  infographic_caption text,
  source_note text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (sort_group = '#' or sort_group ~ '^[A-Z]$')
);
create index if not exists terminology_entries_sort_idx
  on public.terminology_entries (sort_group, normalized_term);
create index if not exists terminology_entries_term_idx
  on public.terminology_entries (term);
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
