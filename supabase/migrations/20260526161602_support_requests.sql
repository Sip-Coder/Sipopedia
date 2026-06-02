create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  lane_id text not null default 'general',
  contact_name text not null default '',
  contact_email text not null default '',
  team_name text not null default '',
  team_size integer,
  plan_interest text not null default '',
  urgency text not null default 'normal',
  subject text not null,
  message text not null,
  source_route text not null default 'support',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (lane_id in ('enrollment', 'billing', 'study', 'team', 'general')),
  check (urgency in ('normal', 'soon', 'urgent')),
  check (status in ('new', 'triaged', 'in_progress', 'closed')),
  check (team_size is null or team_size between 1 and 10000),
  check (length(btrim(contact_name)) <= 120),
  check (length(btrim(contact_email)) between 5 and 254),
  check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  check (length(btrim(team_name)) <= 160),
  check (length(btrim(plan_interest)) <= 80),
  check (length(btrim(subject)) between 4 and 160),
  check (length(btrim(message)) between 12 and 2000),
  check (length(btrim(source_route)) <= 160)
);

create index if not exists support_requests_user_created_idx
  on public.support_requests (user_id, created_at desc);

create index if not exists support_requests_status_created_idx
  on public.support_requests (status, created_at desc);

drop trigger if exists set_support_requests_updated_at on public.support_requests;
create trigger set_support_requests_updated_at
  before update on public.support_requests
  for each row execute function public.set_tasting_groups_updated_at();

alter table public.support_requests enable row level security;

drop policy if exists "public creates support requests" on public.support_requests;
create policy "public creates support requests"
  on public.support_requests
  for insert
  to anon, authenticated
  with check (user_id is null or user_id = (select auth.uid()));

drop policy if exists "authenticated users read own support requests" on public.support_requests;
create policy "authenticated users read own support requests"
  on public.support_requests
  for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "authenticated users update own open support requests" on public.support_requests;

drop policy if exists "admins manage support requests" on public.support_requests;
create policy "admins manage support requests"
  on public.support_requests
  for all
  to authenticated
  using ((select private.current_user_is_admin()))
  with check ((select private.current_user_is_admin()));
