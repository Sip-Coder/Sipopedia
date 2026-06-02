create table if not exists public.tasting_groups (
  id uuid primary key default gen_random_uuid(),
  host_user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  city text not null,
  focus text not null,
  cadence text not null,
  meetup_format text not null,
  member_count integer not null default 1,
  size_limit integer not null default 20,
  next_meetup date not null default ((now() at time zone 'utc')::date + 14),
  summary text not null,
  tags text[] not null default '{}'::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(btrim(name)) between 3 and 80),
  check (length(btrim(city)) between 2 and 120),
  check (focus in ('Wine', 'Spirits', 'Beer', 'Sake', 'Zero Proof', 'Coffee & Tea')),
  check (cadence in ('Weekly', 'Bi-weekly', 'Monthly', 'Twice a month')),
  check (meetup_format in ('In Person', 'Hybrid')),
  check (size_limit between 4 and 60),
  check (member_count >= 1 and member_count <= size_limit),
  check (length(btrim(summary)) between 12 and 280),
  check (cardinality(tags) <= 8)
);

create table if not exists public.tasting_group_memberships (
  group_id uuid not null references public.tasting_groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  status text not null default 'requested',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (group_id, user_id),
  check (role in ('host', 'member')),
  check (status in ('requested', 'active'))
);

create index if not exists tasting_groups_focus_city_idx
  on public.tasting_groups (focus, city);

create index if not exists tasting_groups_host_idx
  on public.tasting_groups (host_user_id, created_at desc);

create index if not exists tasting_group_memberships_user_idx
  on public.tasting_group_memberships (user_id, created_at desc);

create index if not exists tasting_group_memberships_group_status_idx
  on public.tasting_group_memberships (group_id, status);

create or replace function public.set_tasting_groups_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_tasting_groups_updated_at on public.tasting_groups;
create trigger set_tasting_groups_updated_at
  before update on public.tasting_groups
  for each row execute function public.set_tasting_groups_updated_at();

drop trigger if exists set_tasting_group_memberships_updated_at on public.tasting_group_memberships;
create trigger set_tasting_group_memberships_updated_at
  before update on public.tasting_group_memberships
  for each row execute function public.set_tasting_groups_updated_at();

alter table public.tasting_groups enable row level security;
alter table public.tasting_group_memberships enable row level security;

drop policy if exists "authenticated users read tasting groups" on public.tasting_groups;
create policy "authenticated users read tasting groups"
  on public.tasting_groups
  for select
  to authenticated
  using (true);

drop policy if exists "users create hosted tasting groups" on public.tasting_groups;
create policy "users create hosted tasting groups"
  on public.tasting_groups
  for insert
  to authenticated
  with check ((select auth.uid()) = host_user_id);

drop policy if exists "hosts update tasting groups" on public.tasting_groups;
create policy "hosts update tasting groups"
  on public.tasting_groups
  for update
  to authenticated
  using ((select auth.uid()) = host_user_id)
  with check ((select auth.uid()) = host_user_id);

drop policy if exists "hosts delete tasting groups" on public.tasting_groups;
create policy "hosts delete tasting groups"
  on public.tasting_groups
  for delete
  to authenticated
  using ((select auth.uid()) = host_user_id);

drop policy if exists "users and hosts read group memberships" on public.tasting_group_memberships;
create policy "users and hosts read group memberships"
  on public.tasting_group_memberships
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  );

drop policy if exists "users request tasting group membership" on public.tasting_group_memberships;
create policy "users request tasting group membership"
  on public.tasting_group_memberships
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and role = 'member'
    and status = 'requested'
  );

drop policy if exists "hosts manage group memberships" on public.tasting_group_memberships;
create policy "hosts manage group memberships"
  on public.tasting_group_memberships
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  );

drop policy if exists "users and hosts delete group memberships" on public.tasting_group_memberships;
create policy "users and hosts delete group memberships"
  on public.tasting_group_memberships
  for delete
  to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  );
