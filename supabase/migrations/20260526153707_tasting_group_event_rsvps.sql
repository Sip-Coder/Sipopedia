create table if not exists public.tasting_group_events (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.tasting_groups (id) on delete cascade,
  title text not null,
  event_date date not null,
  venue text not null,
  capacity integer not null default 12,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (length(btrim(title)) between 4 and 120),
  check (length(btrim(venue)) between 2 and 160),
  check (capacity between 2 and 100),
  check (length(btrim(notes)) <= 400)
);

create table if not exists public.tasting_group_event_rsvps (
  event_id uuid not null references public.tasting_group_events (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'going',
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (event_id, user_id),
  check (status in ('going', 'waitlist', 'cancelled')),
  check (length(btrim(note)) <= 240)
);

create index if not exists tasting_group_events_group_date_idx
  on public.tasting_group_events (group_id, event_date);

create index if not exists tasting_group_event_rsvps_user_idx
  on public.tasting_group_event_rsvps (user_id, updated_at desc);

create index if not exists tasting_group_event_rsvps_event_status_idx
  on public.tasting_group_event_rsvps (event_id, status);

drop trigger if exists set_tasting_group_events_updated_at on public.tasting_group_events;
create trigger set_tasting_group_events_updated_at
  before update on public.tasting_group_events
  for each row execute function public.set_tasting_groups_updated_at();

drop trigger if exists set_tasting_group_event_rsvps_updated_at on public.tasting_group_event_rsvps;
create trigger set_tasting_group_event_rsvps_updated_at
  before update on public.tasting_group_event_rsvps
  for each row execute function public.set_tasting_groups_updated_at();

alter table public.tasting_group_events enable row level security;
alter table public.tasting_group_event_rsvps enable row level security;

drop policy if exists "authenticated users read tasting group events" on public.tasting_group_events;
create policy "authenticated users read tasting group events"
  on public.tasting_group_events
  for select
  to authenticated
  using (true);

drop policy if exists "group hosts create tasting group events" on public.tasting_group_events;
create policy "group hosts create tasting group events"
  on public.tasting_group_events
  for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  );

drop policy if exists "group hosts update tasting group events" on public.tasting_group_events;
create policy "group hosts update tasting group events"
  on public.tasting_group_events
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

drop policy if exists "group hosts delete tasting group events" on public.tasting_group_events;
create policy "group hosts delete tasting group events"
  on public.tasting_group_events
  for delete
  to authenticated
  using (
    exists (
      select 1
      from public.tasting_groups groups
      where groups.id = group_id
        and groups.host_user_id = (select auth.uid())
    )
  );

drop policy if exists "users and hosts read tasting group event rsvps" on public.tasting_group_event_rsvps;
create policy "users and hosts read tasting group event rsvps"
  on public.tasting_group_event_rsvps
  for select
  to authenticated
  using (
    (select auth.uid()) = user_id
    or exists (
      select 1
      from public.tasting_group_events events
      join public.tasting_groups groups on groups.id = events.group_id
      where events.id = event_id
        and groups.host_user_id = (select auth.uid())
    )
  );

drop policy if exists "users manage own tasting group event rsvps" on public.tasting_group_event_rsvps;
create policy "users manage own tasting group event rsvps"
  on public.tasting_group_event_rsvps
  for insert
  to authenticated
  with check (
    (select auth.uid()) = user_id
    and status in ('going', 'waitlist')
  );

drop policy if exists "users update own tasting group event rsvps" on public.tasting_group_event_rsvps;
create policy "users update own tasting group event rsvps"
  on public.tasting_group_event_rsvps
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "users delete own tasting group event rsvps" on public.tasting_group_event_rsvps;
create policy "users delete own tasting group event rsvps"
  on public.tasting_group_event_rsvps
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
