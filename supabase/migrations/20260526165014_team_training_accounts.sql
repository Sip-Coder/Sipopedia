create table if not exists public.team_training_accounts (
  id uuid primary key default gen_random_uuid(),
  owner_user_id uuid not null references auth.users (id) on delete cascade,
  team_name text not null,
  manager_name text not null default '',
  focus text not null default '',
  sprint_title text not null default '',
  start_date date,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(btrim(team_name)) between 2 and 160),
  check (length(btrim(manager_name)) <= 120),
  check (length(btrim(focus)) <= 240),
  check (length(btrim(sprint_title)) <= 160),
  check (status in ('active', 'archived'))
);

create table if not exists public.team_training_memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.team_training_accounts (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  member_email text not null,
  display_name text not null default '',
  role text not null default 'member',
  invite_status text not null default 'invited',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (team_id, member_email),
  check (length(btrim(member_email)) between 5 and 254),
  check (member_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  check (length(btrim(display_name)) <= 120),
  check (role in ('manager', 'member')),
  check (invite_status in ('invited', 'active', 'removed'))
);

create table if not exists public.team_training_assignments (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.team_training_accounts (id) on delete cascade,
  week integer not null,
  title text not null,
  route text not null default 'app/launch',
  owner_name text not null default '',
  due_date date,
  outcome text not null default '',
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (team_id, week),
  check (week between 1 and 52),
  check (length(btrim(title)) between 2 and 160),
  check (length(btrim(route)) between 2 and 160),
  check (length(btrim(owner_name)) <= 120),
  check (length(btrim(outcome)) <= 400)
);

create index if not exists team_training_accounts_owner_updated_idx
  on public.team_training_accounts (owner_user_id, updated_at desc);

create index if not exists team_training_memberships_user_idx
  on public.team_training_memberships (user_id, invite_status);

create index if not exists team_training_memberships_email_idx
  on public.team_training_memberships (member_email, invite_status);

create index if not exists team_training_assignments_team_week_idx
  on public.team_training_assignments (team_id, week);

drop trigger if exists set_team_training_accounts_updated_at on public.team_training_accounts;
create trigger set_team_training_accounts_updated_at
  before update on public.team_training_accounts
  for each row execute function public.set_tasting_groups_updated_at();

drop trigger if exists set_team_training_memberships_updated_at on public.team_training_memberships;
create trigger set_team_training_memberships_updated_at
  before update on public.team_training_memberships
  for each row execute function public.set_tasting_groups_updated_at();

drop trigger if exists set_team_training_assignments_updated_at on public.team_training_assignments;
create trigger set_team_training_assignments_updated_at
  before update on public.team_training_assignments
  for each row execute function public.set_tasting_groups_updated_at();

grant select, insert, update, delete on table public.team_training_accounts to authenticated;
grant select, insert, update, delete on table public.team_training_memberships to authenticated;
grant select, insert, update, delete on table public.team_training_assignments to authenticated;

create or replace function private.current_user_owns_team_training_account(team_account_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_training_accounts teams
    where teams.id = team_account_id
      and teams.owner_user_id = (select auth.uid())
  );
$$;

create or replace function private.current_user_can_read_team_training_account(team_account_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.team_training_accounts teams
    where teams.id = team_account_id
      and teams.owner_user_id = (select auth.uid())
  )
  or exists (
    select 1
    from public.team_training_memberships memberships
    where memberships.team_id = team_account_id
      and memberships.invite_status <> 'removed'
      and (
        memberships.user_id = (select auth.uid())
        or lower(memberships.member_email) = lower(coalesce((select auth.jwt() ->> 'email'), ''))
      )
  );
$$;

revoke all on function private.current_user_owns_team_training_account(uuid) from public;
revoke all on function private.current_user_can_read_team_training_account(uuid) from public;
grant execute on function private.current_user_owns_team_training_account(uuid) to authenticated, service_role;
grant execute on function private.current_user_can_read_team_training_account(uuid) to authenticated, service_role;

alter table public.team_training_accounts enable row level security;
alter table public.team_training_memberships enable row level security;
alter table public.team_training_assignments enable row level security;

drop policy if exists "team owners create team training accounts" on public.team_training_accounts;
create policy "team owners create team training accounts"
  on public.team_training_accounts
  for insert
  to authenticated
  with check ((select auth.uid()) = owner_user_id);

drop policy if exists "team owners and members read team training accounts" on public.team_training_accounts;
create policy "team owners and members read team training accounts"
  on public.team_training_accounts
  for select
  to authenticated
  using ((select private.current_user_can_read_team_training_account(id)));

drop policy if exists "team owners update team training accounts" on public.team_training_accounts;
create policy "team owners update team training accounts"
  on public.team_training_accounts
  for update
  to authenticated
  using (owner_user_id = (select auth.uid()))
  with check (owner_user_id = (select auth.uid()));

drop policy if exists "team owners delete team training accounts" on public.team_training_accounts;
create policy "team owners delete team training accounts"
  on public.team_training_accounts
  for delete
  to authenticated
  using (owner_user_id = (select auth.uid()));

drop policy if exists "team owners manage team memberships" on public.team_training_memberships;
create policy "team owners manage team memberships"
  on public.team_training_memberships
  for all
  to authenticated
  using ((select private.current_user_owns_team_training_account(team_id)))
  with check ((select private.current_user_owns_team_training_account(team_id)));

drop policy if exists "members read own team memberships" on public.team_training_memberships;
create policy "members read own team memberships"
  on public.team_training_memberships
  for select
  to authenticated
  using ((select private.current_user_can_read_team_training_account(team_id)));

drop policy if exists "team owners manage team assignments" on public.team_training_assignments;
create policy "team owners manage team assignments"
  on public.team_training_assignments
  for all
  to authenticated
  using ((select private.current_user_owns_team_training_account(team_id)))
  with check ((select private.current_user_owns_team_training_account(team_id)));

drop policy if exists "team members read team assignments" on public.team_training_assignments;
create policy "team members read team assignments"
  on public.team_training_assignments
  for select
  to authenticated
  using ((select private.current_user_can_read_team_training_account(team_id)));
