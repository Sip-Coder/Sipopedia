create table if not exists public.tasting_group_member_profiles (
  group_id uuid not null references public.tasting_groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null,
  city text not null default '',
  beverage_focus text not null default 'Wine',
  credentials text[] not null default '{}'::text[],
  tasting_goal text not null default '',
  availability text not null default '',
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  primary key (group_id, user_id),
  check (length(btrim(display_name)) between 2 and 80),
  check (length(btrim(city)) <= 120),
  check (beverage_focus in ('Wine', 'Spirits', 'Beer', 'Sake', 'Zero Proof', 'Coffee & Tea')),
  check (cardinality(credentials) <= 8),
  check (length(btrim(tasting_goal)) <= 280),
  check (length(btrim(availability)) <= 160)
);

create table if not exists public.tasting_group_event_reminders (
  event_id uuid not null references public.tasting_group_events (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  lead_time text not null default '24h',
  channel text not null default 'dashboard',
  status text not null default 'scheduled',
  scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id),
  check (lead_time in ('24h', '3d', '7d')),
  check (channel in ('dashboard', 'email')),
  check (status in ('scheduled', 'cancelled', 'sent'))
);

create index if not exists tasting_group_member_profiles_focus_idx
  on public.tasting_group_member_profiles (group_id, beverage_focus);

create index if not exists tasting_group_member_profiles_user_idx
  on public.tasting_group_member_profiles (user_id, updated_at desc);

create index if not exists tasting_group_event_reminders_user_status_idx
  on public.tasting_group_event_reminders (user_id, status, updated_at desc);

create index if not exists tasting_group_event_reminders_event_status_idx
  on public.tasting_group_event_reminders (event_id, status);

drop trigger if exists set_tasting_group_member_profiles_updated_at on public.tasting_group_member_profiles;
create trigger set_tasting_group_member_profiles_updated_at
  before update on public.tasting_group_member_profiles
  for each row execute function public.set_tasting_groups_updated_at();

drop trigger if exists set_tasting_group_event_reminders_updated_at on public.tasting_group_event_reminders;
create trigger set_tasting_group_event_reminders_updated_at
  before update on public.tasting_group_event_reminders
  for each row execute function public.set_tasting_groups_updated_at();

grant usage on schema private to authenticated, service_role;

create or replace function private.current_user_can_submit_tasting_group_profile(tasting_group_id uuid, profile_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select profile_user_id = (select auth.uid())
  and (
    (select private.current_user_hosts_tasting_group(tasting_group_id))
    or exists (
      select 1
      from public.tasting_group_memberships memberships
      where memberships.group_id = tasting_group_id
        and memberships.user_id = (select auth.uid())
        and memberships.status in ('requested', 'active')
    )
  );
$$;

create or replace function private.current_user_can_read_tasting_group_profiles(tasting_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select (select private.current_user_hosts_tasting_group(tasting_group_id))
  or exists (
    select 1
    from public.tasting_group_memberships memberships
    where memberships.group_id = tasting_group_id
      and memberships.user_id = (select auth.uid())
      and memberships.status = 'active'
  );
$$;

create or replace function private.current_user_can_schedule_tasting_group_reminder(tasting_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tasting_group_events events
    where events.id = tasting_event_id
      and (
        (select private.current_user_hosts_tasting_group(events.group_id))
        or exists (
          select 1
          from public.tasting_group_memberships memberships
          where memberships.group_id = events.group_id
            and memberships.user_id = (select auth.uid())
            and memberships.status = 'active'
        )
        or exists (
          select 1
          from public.tasting_group_event_rsvps rsvps
          where rsvps.event_id = events.id
            and rsvps.user_id = (select auth.uid())
            and rsvps.status in ('going', 'waitlist')
        )
      )
  );
$$;

create or replace function private.current_user_hosts_tasting_group_event(tasting_event_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.tasting_group_events events
    where events.id = tasting_event_id
      and (select private.current_user_hosts_tasting_group(events.group_id))
  );
$$;

revoke all on function private.current_user_can_submit_tasting_group_profile(uuid, uuid) from public;
revoke all on function private.current_user_can_read_tasting_group_profiles(uuid) from public;
revoke all on function private.current_user_can_schedule_tasting_group_reminder(uuid) from public;
revoke all on function private.current_user_hosts_tasting_group_event(uuid) from public;
grant execute on function private.current_user_can_submit_tasting_group_profile(uuid, uuid) to authenticated, service_role;
grant execute on function private.current_user_can_read_tasting_group_profiles(uuid) to authenticated, service_role;
grant execute on function private.current_user_can_schedule_tasting_group_reminder(uuid) to authenticated, service_role;
grant execute on function private.current_user_hosts_tasting_group_event(uuid) to authenticated, service_role;

alter table public.tasting_group_member_profiles enable row level security;
alter table public.tasting_group_event_reminders enable row level security;

grant select, insert, update on table public.tasting_group_member_profiles to authenticated;
grant select, insert, update, delete on table public.tasting_group_event_reminders to authenticated;

drop policy if exists "group members read tasting group profiles" on public.tasting_group_member_profiles;
create policy "group members read tasting group profiles"
  on public.tasting_group_member_profiles
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or (select private.current_user_can_read_tasting_group_profiles(group_id))
  );

drop policy if exists "users submit own tasting group profiles" on public.tasting_group_member_profiles;
create policy "users submit own tasting group profiles"
  on public.tasting_group_member_profiles
  for insert
  to authenticated
  with check ((select private.current_user_can_submit_tasting_group_profile(group_id, user_id)));

drop policy if exists "users update own tasting group profiles" on public.tasting_group_member_profiles;
create policy "users update own tasting group profiles"
  on public.tasting_group_member_profiles
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check ((select private.current_user_can_submit_tasting_group_profile(group_id, user_id)));

drop policy if exists "users and hosts read event reminders" on public.tasting_group_event_reminders;
create policy "users and hosts read event reminders"
  on public.tasting_group_event_reminders
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or (select private.current_user_hosts_tasting_group_event(event_id))
  );

drop policy if exists "users schedule own event reminders" on public.tasting_group_event_reminders;
create policy "users schedule own event reminders"
  on public.tasting_group_event_reminders
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and status = 'scheduled'
    and (select private.current_user_can_schedule_tasting_group_reminder(event_id))
  );

drop policy if exists "users update own event reminders" on public.tasting_group_event_reminders;
create policy "users update own event reminders"
  on public.tasting_group_event_reminders
  for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

drop policy if exists "users delete own event reminders" on public.tasting_group_event_reminders;
create policy "users delete own event reminders"
  on public.tasting_group_event_reminders
  for delete
  to authenticated
  using (user_id = (select auth.uid()));
