-- Reconcile product authorization helpers and row-level policies with the audited production shape.
-- Earlier feature migrations create the tables; this migration makes their authorization behavior deterministic.

create schema if not exists private;
revoke create on schema private from public, anon, authenticated;
grant usage on schema private to anon, authenticated, service_role;

create table if not exists private.support_request_rate_limits (
  contact_key text primary key,
  window_start timestamptz not null default now(),
  request_count integer not null default 0 check (request_count >= 0 and request_count <= 100),
  last_request_at timestamptz not null default now()
);

revoke all on table private.support_request_rate_limits from public, anon, authenticated;
grant all on table private.support_request_rate_limits to service_role;

CREATE OR REPLACE FUNCTION private.current_user_is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_owns_team_training_account(team_account_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.team_training_accounts teams
    where teams.id = team_account_id
      and teams.owner_user_id = (select auth.uid())
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_can_read_team_training_account(team_account_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$

CREATE OR REPLACE FUNCTION private.current_user_hosts_tasting_group(tasting_group_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.tasting_groups groups
    where groups.id = tasting_group_id
      and groups.host_user_id = (select auth.uid())
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_can_post_to_tasting_group(tasting_group_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select (select private.current_user_hosts_tasting_group(tasting_group_id))
  or exists (
    select 1
    from public.tasting_group_memberships memberships
    where memberships.group_id = tasting_group_id
      and memberships.user_id = (select auth.uid())
      and memberships.status = 'active'
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_can_read_tasting_group_profiles(tasting_group_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select (select private.current_user_hosts_tasting_group(tasting_group_id))
  or exists (
    select 1
    from public.tasting_group_memberships memberships
    where memberships.group_id = tasting_group_id
      and memberships.user_id = (select auth.uid())
      and memberships.status = 'active'
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_can_submit_tasting_group_profile(tasting_group_id uuid, profile_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$

CREATE OR REPLACE FUNCTION private.current_user_hosts_tasting_group_event(tasting_event_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  select exists (
    select 1
    from public.tasting_group_events events
    where events.id = tasting_event_id
      and (select private.current_user_hosts_tasting_group(events.group_id))
  );
$function$

CREATE OR REPLACE FUNCTION private.current_user_can_schedule_tasting_group_reminder(tasting_event_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
$function$

CREATE OR REPLACE FUNCTION private.create_support_request(p_user_id uuid, p_lane_id text, p_contact_name text, p_contact_email text, p_team_name text, p_team_size integer, p_plan_interest text, p_urgency text, p_subject text, p_message text, p_source_route text)
 RETURNS support_requests
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'private'
AS $function$
declare
  v_contact_email text := lower(btrim(coalesce(p_contact_email, '')));
  v_contact_key text;
  v_limit record;
  v_row public.support_requests%rowtype;
begin
  if p_user_id is not null and p_user_id is distinct from (select auth.uid()) then
    raise exception 'Support request owner does not match the current session.' using errcode = '42501';
  end if;

  if v_contact_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'A valid contact email is required.' using errcode = '22023';
  end if;

  if length(btrim(coalesce(p_subject, ''))) < 4 or length(btrim(coalesce(p_message, ''))) < 12 then
    raise exception 'Support request subject and message are required.' using errcode = '22023';
  end if;

  v_contact_key := encode(digest(v_contact_email, 'sha256'), 'hex');

  select *
    into v_limit
    from private.support_request_rate_limits
    where contact_key = v_contact_key
    for update;

  if not found then
    insert into private.support_request_rate_limits (contact_key, window_start, request_count, last_request_at)
    values (v_contact_key, now(), 1, now());
  elsif v_limit.window_start < now() - interval '1 hour' then
    update private.support_request_rate_limits
      set window_start = now(),
          request_count = 1,
          last_request_at = now()
      where contact_key = v_contact_key;
  elsif v_limit.request_count >= 3 then
    raise exception 'Too many support requests were submitted for this contact email. Try again later.' using errcode = 'P0001';
  else
    update private.support_request_rate_limits
      set request_count = request_count + 1,
          last_request_at = now()
      where contact_key = v_contact_key;
  end if;

  insert into public.support_requests (
    user_id,
    lane_id,
    contact_name,
    contact_email,
    team_name,
    team_size,
    plan_interest,
    urgency,
    subject,
    message,
    source_route
  )
  values (
    p_user_id,
    case when p_lane_id in ('enrollment', 'billing', 'study', 'team', 'general') then p_lane_id else 'general' end,
    left(regexp_replace(btrim(coalesce(p_contact_name, '')), '\s+', ' ', 'g'), 120),
    v_contact_email,
    left(regexp_replace(btrim(coalesce(p_team_name, '')), '\s+', ' ', 'g'), 160),
    p_team_size,
    left(regexp_replace(btrim(coalesce(p_plan_interest, '')), '\s+', ' ', 'g'), 80),
    case when p_urgency in ('normal', 'soon', 'urgent') then p_urgency else 'normal' end,
    left(regexp_replace(btrim(coalesce(p_subject, '')), '\s+', ' ', 'g'), 160),
    left(btrim(coalesce(p_message, '')), 2000),
    left(regexp_replace(btrim(coalesce(p_source_route, 'support')), '\s+', ' ', 'g'), 160)
  )
  returning * into v_row;

  return v_row;
end;
$function$

alter table public."api_rate_limits" enable row level security;
alter table public."beverage_taxonomy_graph" enable row level security;
alter table public."billing_webhook_events" enable row level security;
alter table public."cellar_scan_records" enable row level security;
alter table public."coach_learning_memory" enable row level security;
alter table public."customer_subscriptions" enable row level security;
alter table public."operations_learning_memory" enable row level security;
alter table public."profiles" enable row level security;
alter table public."support_requests" enable row level security;
alter table public."tasting_group_event_reminders" enable row level security;
alter table public."tasting_group_event_rsvps" enable row level security;
alter table public."tasting_group_events" enable row level security;
alter table public."tasting_group_member_profiles" enable row level security;
alter table public."tasting_group_memberships" enable row level security;
alter table public."tasting_group_posts" enable row level security;
alter table public."tasting_groups" enable row level security;
alter table public."tasting_notes" enable row level security;
alter table public."taxonomy_learning_memory" enable row level security;
alter table public."team_training_accounts" enable row level security;
alter table public."team_training_assignments" enable row level security;
alter table public."team_training_memberships" enable row level security;
alter table public."terminology_entries" enable row level security;
alter table public."terminology_harvest_runs" enable row level security;
alter table public."terminology_learning_memory" enable row level security;
alter table public."terminology_library_entries" enable row level security;

drop policy if exists "service role manages api rate limits" on public."api_rate_limits";
create policy "service role manages api rate limits"
  on public."api_rate_limits"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "service role manages beverage taxonomy graph" on public."beverage_taxonomy_graph";
create policy "service role manages beverage taxonomy graph"
  on public."beverage_taxonomy_graph"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "service role manages billing webhook events" on public."billing_webhook_events";
create policy "service role manages billing webhook events"
  on public."billing_webhook_events"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "users create own cellar scan records" on public."cellar_scan_records";
create policy "users create own cellar scan records"
  on public."cellar_scan_records"
  as permissive
  for insert
  to "authenticated"
  with check (((( SELECT auth.uid() AS uid) IS NOT NULL) AND (( SELECT auth.uid() AS uid) = user_id)));

drop policy if exists "users delete own cellar scan records" on public."cellar_scan_records";
create policy "users delete own cellar scan records"
  on public."cellar_scan_records"
  as permissive
  for delete
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) IS NOT NULL) AND (( SELECT auth.uid() AS uid) = user_id)));

drop policy if exists "users read own cellar scan records" on public."cellar_scan_records";
create policy "users read own cellar scan records"
  on public."cellar_scan_records"
  as permissive
  for select
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) IS NOT NULL) AND (( SELECT auth.uid() AS uid) = user_id)));

drop policy if exists "users update own cellar scan records" on public."cellar_scan_records";
create policy "users update own cellar scan records"
  on public."cellar_scan_records"
  as permissive
  for update
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) IS NOT NULL) AND (( SELECT auth.uid() AS uid) = user_id)))
  with check (((( SELECT auth.uid() AS uid) IS NOT NULL) AND (( SELECT auth.uid() AS uid) = user_id)));

drop policy if exists "users insert own coach learning memory" on public."coach_learning_memory";
create policy "users insert own coach learning memory"
  on public."coach_learning_memory"
  as permissive
  for insert
  to "authenticated"
  with check ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users read own coach learning memory" on public."coach_learning_memory";
create policy "users read own coach learning memory"
  on public."coach_learning_memory"
  as permissive
  for select
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users update own coach learning memory" on public."coach_learning_memory";
create policy "users update own coach learning memory"
  on public."coach_learning_memory"
  as permissive
  for update
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id))
  with check ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "authenticated users read permitted subscriptions" on public."customer_subscriptions";
create policy "authenticated users read permitted subscriptions"
  on public."customer_subscriptions"
  as permissive
  for select
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = user_id) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)));

drop policy if exists "service role manages subscriptions" on public."customer_subscriptions";
create policy "service role manages subscriptions"
  on public."customer_subscriptions"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "service role manages operations learning memory" on public."operations_learning_memory";
create policy "service role manages operations learning memory"
  on public."operations_learning_memory"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "authenticated users read permitted profiles" on public."profiles";
create policy "authenticated users read permitted profiles"
  on public."profiles"
  as permissive
  for select
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)));

drop policy if exists "authenticated users update permitted profiles" on public."profiles";
create policy "authenticated users update permitted profiles"
  on public."profiles"
  as permissive
  for update
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)))
  with check (((( SELECT auth.uid() AS uid) = id) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)));

drop policy if exists "admins update support requests" on public."support_requests";
create policy "admins update support requests"
  on public."support_requests"
  as permissive
  for update
  to "authenticated"
  using (( SELECT private.current_user_is_admin() AS current_user_is_admin))
  with check (( SELECT private.current_user_is_admin() AS current_user_is_admin));

drop policy if exists "authenticated users read permitted support requests" on public."support_requests";
create policy "authenticated users read permitted support requests"
  on public."support_requests"
  as permissive
  for select
  to "authenticated"
  using (((user_id = ( SELECT auth.uid() AS uid)) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)));

drop policy if exists "users and hosts read event reminders" on public."tasting_group_event_reminders";
create policy "users and hosts read event reminders"
  on public."tasting_group_event_reminders"
  as permissive
  for select
  to "authenticated"
  using (((user_id = ( SELECT auth.uid() AS uid)) OR ( SELECT private.current_user_hosts_tasting_group_event(tasting_group_event_reminders.event_id) AS current_user_hosts_tasting_group_event)));

drop policy if exists "users delete own event reminders" on public."tasting_group_event_reminders";
create policy "users delete own event reminders"
  on public."tasting_group_event_reminders"
  as permissive
  for delete
  to "authenticated"
  using ((user_id = ( SELECT auth.uid() AS uid)));

drop policy if exists "users schedule own event reminders" on public."tasting_group_event_reminders";
create policy "users schedule own event reminders"
  on public."tasting_group_event_reminders"
  as permissive
  for insert
  to "authenticated"
  with check (((user_id = ( SELECT auth.uid() AS uid)) AND (status = 'scheduled'::text) AND ( SELECT private.current_user_can_schedule_tasting_group_reminder(tasting_group_event_reminders.event_id) AS current_user_can_schedule_tasting_group_reminder)));

drop policy if exists "users update own event reminders" on public."tasting_group_event_reminders";
create policy "users update own event reminders"
  on public."tasting_group_event_reminders"
  as permissive
  for update
  to "authenticated"
  using ((user_id = ( SELECT auth.uid() AS uid)))
  with check ((user_id = ( SELECT auth.uid() AS uid)));

drop policy if exists "users and hosts read tasting group event rsvps" on public."tasting_group_event_rsvps";
create policy "users and hosts read tasting group event rsvps"
  on public."tasting_group_event_rsvps"
  as permissive
  for select
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = user_id) OR (EXISTS ( SELECT 1
   FROM (tasting_group_events events
     JOIN tasting_groups groups ON ((groups.id = events.group_id)))
  WHERE ((events.id = tasting_group_event_rsvps.event_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid)))))));

drop policy if exists "users delete own tasting group event rsvps" on public."tasting_group_event_rsvps";
create policy "users delete own tasting group event rsvps"
  on public."tasting_group_event_rsvps"
  as permissive
  for delete
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users manage own tasting group event rsvps" on public."tasting_group_event_rsvps";
create policy "users manage own tasting group event rsvps"
  on public."tasting_group_event_rsvps"
  as permissive
  for insert
  to "authenticated"
  with check (((( SELECT auth.uid() AS uid) = user_id) AND (status = ANY (ARRAY['going'::text, 'waitlist'::text]))));

drop policy if exists "users update own tasting group event rsvps" on public."tasting_group_event_rsvps";
create policy "users update own tasting group event rsvps"
  on public."tasting_group_event_rsvps"
  as permissive
  for update
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id))
  with check ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "authenticated users read tasting group events" on public."tasting_group_events";
create policy "authenticated users read tasting group events"
  on public."tasting_group_events"
  as permissive
  for select
  to "authenticated"
  using (true);

drop policy if exists "group hosts create tasting group events" on public."tasting_group_events";
create policy "group hosts create tasting group events"
  on public."tasting_group_events"
  as permissive
  for insert
  to "authenticated"
  with check ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_events.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))));

drop policy if exists "group hosts delete tasting group events" on public."tasting_group_events";
create policy "group hosts delete tasting group events"
  on public."tasting_group_events"
  as permissive
  for delete
  to "authenticated"
  using ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_events.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))));

drop policy if exists "group hosts update tasting group events" on public."tasting_group_events";
create policy "group hosts update tasting group events"
  on public."tasting_group_events"
  as permissive
  for update
  to "authenticated"
  using ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_events.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))))
  with check ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_events.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))));

drop policy if exists "group members read tasting group profiles" on public."tasting_group_member_profiles";
create policy "group members read tasting group profiles"
  on public."tasting_group_member_profiles"
  as permissive
  for select
  to "authenticated"
  using (((user_id = ( SELECT auth.uid() AS uid)) OR ( SELECT private.current_user_can_read_tasting_group_profiles(tasting_group_member_profiles.group_id) AS current_user_can_read_tasting_group_profiles)));

drop policy if exists "users submit own tasting group profiles" on public."tasting_group_member_profiles";
create policy "users submit own tasting group profiles"
  on public."tasting_group_member_profiles"
  as permissive
  for insert
  to "authenticated"
  with check (( SELECT private.current_user_can_submit_tasting_group_profile(tasting_group_member_profiles.group_id, tasting_group_member_profiles.user_id) AS current_user_can_submit_tasting_group_profile));

drop policy if exists "users update own tasting group profiles" on public."tasting_group_member_profiles";
create policy "users update own tasting group profiles"
  on public."tasting_group_member_profiles"
  as permissive
  for update
  to "authenticated"
  using ((user_id = ( SELECT auth.uid() AS uid)))
  with check (( SELECT private.current_user_can_submit_tasting_group_profile(tasting_group_member_profiles.group_id, tasting_group_member_profiles.user_id) AS current_user_can_submit_tasting_group_profile));

drop policy if exists "hosts manage group memberships" on public."tasting_group_memberships";
create policy "hosts manage group memberships"
  on public."tasting_group_memberships"
  as permissive
  for update
  to "authenticated"
  using ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_memberships.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))))
  with check ((EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_memberships.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid))))));

drop policy if exists "users and hosts delete group memberships" on public."tasting_group_memberships";
create policy "users and hosts delete group memberships"
  on public."tasting_group_memberships"
  as permissive
  for delete
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = user_id) OR (EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_memberships.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid)))))));

drop policy if exists "users and hosts read group memberships" on public."tasting_group_memberships";
create policy "users and hosts read group memberships"
  on public."tasting_group_memberships"
  as permissive
  for select
  to "authenticated"
  using (((( SELECT auth.uid() AS uid) = user_id) OR (EXISTS ( SELECT 1
   FROM tasting_groups groups
  WHERE ((groups.id = tasting_group_memberships.group_id) AND (groups.host_user_id = ( SELECT auth.uid() AS uid)))))));

drop policy if exists "users request tasting group membership" on public."tasting_group_memberships";
create policy "users request tasting group membership"
  on public."tasting_group_memberships"
  as permissive
  for insert
  to "authenticated"
  with check (((( SELECT auth.uid() AS uid) = user_id) AND (role = 'member'::text) AND (status = 'requested'::text)));

drop policy if exists "active members create tasting group posts" on public."tasting_group_posts";
create policy "active members create tasting group posts"
  on public."tasting_group_posts"
  as permissive
  for insert
  to "authenticated"
  with check (((author_user_id = ( SELECT auth.uid() AS uid)) AND (moderation_status = 'published'::text) AND ( SELECT private.current_user_can_post_to_tasting_group(tasting_group_posts.group_id) AS current_user_can_post_to_tasting_group)));

drop policy if exists "group hosts moderate tasting group posts" on public."tasting_group_posts";
create policy "group hosts moderate tasting group posts"
  on public."tasting_group_posts"
  as permissive
  for update
  to "authenticated"
  using (( SELECT private.current_user_hosts_tasting_group(tasting_group_posts.group_id) AS current_user_hosts_tasting_group))
  with check (( SELECT private.current_user_hosts_tasting_group(tasting_group_posts.group_id) AS current_user_hosts_tasting_group));

drop policy if exists "members read visible tasting group posts" on public."tasting_group_posts";
create policy "members read visible tasting group posts"
  on public."tasting_group_posts"
  as permissive
  for select
  to "authenticated"
  using (((moderation_status = 'published'::text) OR (author_user_id = ( SELECT auth.uid() AS uid)) OR ( SELECT private.current_user_hosts_tasting_group(tasting_group_posts.group_id) AS current_user_hosts_tasting_group)));

drop policy if exists "authenticated users read tasting groups" on public."tasting_groups";
create policy "authenticated users read tasting groups"
  on public."tasting_groups"
  as permissive
  for select
  to "authenticated"
  using (true);

drop policy if exists "hosts delete tasting groups" on public."tasting_groups";
create policy "hosts delete tasting groups"
  on public."tasting_groups"
  as permissive
  for delete
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = host_user_id));

drop policy if exists "hosts update tasting groups" on public."tasting_groups";
create policy "hosts update tasting groups"
  on public."tasting_groups"
  as permissive
  for update
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = host_user_id))
  with check ((( SELECT auth.uid() AS uid) = host_user_id));

drop policy if exists "users create hosted tasting groups" on public."tasting_groups";
create policy "users create hosted tasting groups"
  on public."tasting_groups"
  as permissive
  for insert
  to "authenticated"
  with check ((( SELECT auth.uid() AS uid) = host_user_id));

drop policy if exists "users delete own tasting notes" on public."tasting_notes";
create policy "users delete own tasting notes"
  on public."tasting_notes"
  as permissive
  for delete
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users insert own tasting notes" on public."tasting_notes";
create policy "users insert own tasting notes"
  on public."tasting_notes"
  as permissive
  for insert
  to "authenticated"
  with check ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users read own tasting notes" on public."tasting_notes";
create policy "users read own tasting notes"
  on public."tasting_notes"
  as permissive
  for select
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "users update own tasting notes" on public."tasting_notes";
create policy "users update own tasting notes"
  on public."tasting_notes"
  as permissive
  for update
  to "authenticated"
  using ((( SELECT auth.uid() AS uid) = user_id))
  with check ((( SELECT auth.uid() AS uid) = user_id));

drop policy if exists "service role manages taxonomy learning memory" on public."taxonomy_learning_memory";
create policy "service role manages taxonomy learning memory"
  on public."taxonomy_learning_memory"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "team owners and members read team training accounts" on public."team_training_accounts";
create policy "team owners and members read team training accounts"
  on public."team_training_accounts"
  as permissive
  for select
  to "authenticated"
  using (( SELECT private.current_user_can_read_team_training_account(team_training_accounts.id) AS current_user_can_read_team_training_account));

drop policy if exists "team owners create team training accounts" on public."team_training_accounts";
create policy "team owners create team training accounts"
  on public."team_training_accounts"
  as permissive
  for insert
  to "authenticated"
  with check ((( SELECT auth.uid() AS uid) = owner_user_id));

drop policy if exists "team owners delete team training accounts" on public."team_training_accounts";
create policy "team owners delete team training accounts"
  on public."team_training_accounts"
  as permissive
  for delete
  to "authenticated"
  using ((owner_user_id = ( SELECT auth.uid() AS uid)));

drop policy if exists "team owners update team training accounts" on public."team_training_accounts";
create policy "team owners update team training accounts"
  on public."team_training_accounts"
  as permissive
  for update
  to "authenticated"
  using ((owner_user_id = ( SELECT auth.uid() AS uid)))
  with check ((owner_user_id = ( SELECT auth.uid() AS uid)));

drop policy if exists "team members read team assignments" on public."team_training_assignments";
create policy "team members read team assignments"
  on public."team_training_assignments"
  as permissive
  for select
  to "authenticated"
  using (( SELECT private.current_user_can_read_team_training_account(team_training_assignments.team_id) AS current_user_can_read_team_training_account));

drop policy if exists "team owners delete team assignments" on public."team_training_assignments";
create policy "team owners delete team assignments"
  on public."team_training_assignments"
  as permissive
  for delete
  to "authenticated"
  using (( SELECT private.current_user_owns_team_training_account(team_training_assignments.team_id) AS current_user_owns_team_training_account));

drop policy if exists "team owners insert team assignments" on public."team_training_assignments";
create policy "team owners insert team assignments"
  on public."team_training_assignments"
  as permissive
  for insert
  to "authenticated"
  with check (( SELECT private.current_user_owns_team_training_account(team_training_assignments.team_id) AS current_user_owns_team_training_account));

drop policy if exists "team owners update team assignments" on public."team_training_assignments";
create policy "team owners update team assignments"
  on public."team_training_assignments"
  as permissive
  for update
  to "authenticated"
  using (( SELECT private.current_user_owns_team_training_account(team_training_assignments.team_id) AS current_user_owns_team_training_account))
  with check (( SELECT private.current_user_owns_team_training_account(team_training_assignments.team_id) AS current_user_owns_team_training_account));

drop policy if exists "members read own team memberships" on public."team_training_memberships";
create policy "members read own team memberships"
  on public."team_training_memberships"
  as permissive
  for select
  to "authenticated"
  using (( SELECT private.current_user_can_read_team_training_account(team_training_memberships.team_id) AS current_user_can_read_team_training_account));

drop policy if exists "team owners delete team memberships" on public."team_training_memberships";
create policy "team owners delete team memberships"
  on public."team_training_memberships"
  as permissive
  for delete
  to "authenticated"
  using (( SELECT private.current_user_owns_team_training_account(team_training_memberships.team_id) AS current_user_owns_team_training_account));

drop policy if exists "team owners insert team memberships" on public."team_training_memberships";
create policy "team owners insert team memberships"
  on public."team_training_memberships"
  as permissive
  for insert
  to "authenticated"
  with check (( SELECT private.current_user_owns_team_training_account(team_training_memberships.team_id) AS current_user_owns_team_training_account));

drop policy if exists "team owners update team memberships" on public."team_training_memberships";
create policy "team owners update team memberships"
  on public."team_training_memberships"
  as permissive
  for update
  to "authenticated"
  using (( SELECT private.current_user_owns_team_training_account(team_training_memberships.team_id) AS current_user_owns_team_training_account))
  with check (( SELECT private.current_user_owns_team_training_account(team_training_memberships.team_id) AS current_user_owns_team_training_account));

drop policy if exists "admins delete terminology" on public."terminology_entries";
create policy "admins delete terminology"
  on public."terminology_entries"
  as permissive
  for delete
  to "authenticated"
  using (( SELECT private.current_user_is_admin() AS current_user_is_admin));

drop policy if exists "admins insert terminology" on public."terminology_entries";
create policy "admins insert terminology"
  on public."terminology_entries"
  as permissive
  for insert
  to "authenticated"
  with check (( SELECT private.current_user_is_admin() AS current_user_is_admin));

drop policy if exists "admins update terminology" on public."terminology_entries";
create policy "admins update terminology"
  on public."terminology_entries"
  as permissive
  for update
  to "authenticated"
  using (( SELECT private.current_user_is_admin() AS current_user_is_admin))
  with check (( SELECT private.current_user_is_admin() AS current_user_is_admin));

drop policy if exists "anonymous users read published terminology" on public."terminology_entries";
create policy "anonymous users read published terminology"
  on public."terminology_entries"
  as permissive
  for select
  to "anon"
  using ((is_published = true));

drop policy if exists "authenticated users read permitted terminology" on public."terminology_entries";
create policy "authenticated users read permitted terminology"
  on public."terminology_entries"
  as permissive
  for select
  to "authenticated"
  using (((is_published = true) OR ( SELECT private.current_user_is_admin() AS current_user_is_admin)));

drop policy if exists "admins read terminology harvest runs" on public."terminology_harvest_runs";
create policy "admins read terminology harvest runs"
  on public."terminology_harvest_runs"
  as permissive
  for select
  to "authenticated"
  using (( SELECT private.current_user_is_admin() AS current_user_is_admin));

drop policy if exists "service role inserts terminology harvest runs" on public."terminology_harvest_runs";
create policy "service role inserts terminology harvest runs"
  on public."terminology_harvest_runs"
  as permissive
  for insert
  to "service_role"
  with check (true);

drop policy if exists "service role manages terminology learning memory" on public."terminology_learning_memory";
create policy "service role manages terminology learning memory"
  on public."terminology_learning_memory"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

drop policy if exists "public read published terminology library" on public."terminology_library_entries";
create policy "public read published terminology library"
  on public."terminology_library_entries"
  as permissive
  for select
  to "anon", "authenticated"
  using ((status = 'published'::text));

drop policy if exists "service role manages terminology library" on public."terminology_library_entries";
create policy "service role manages terminology library"
  on public."terminology_library_entries"
  as permissive
  for all
  to "service_role"
  using (true)
  with check (true);

-- Helper functions are callable only by the roles that need them in RLS or the support intake flow.
revoke all on function private."create_support_request"(uuid, text, text, text, text, integer, text, text, text, text, text) from public, anon, authenticated;
revoke all on function private."current_user_can_post_to_tasting_group"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_can_read_tasting_group_profiles"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_can_read_team_training_account"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_can_schedule_tasting_group_reminder"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_can_submit_tasting_group_profile"(uuid, uuid) from public, anon, authenticated;
revoke all on function private."current_user_hosts_tasting_group"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_hosts_tasting_group_event"(uuid) from public, anon, authenticated;
revoke all on function private."current_user_is_admin"() from public, anon, authenticated;
revoke all on function private."current_user_owns_team_training_account"(uuid) from public, anon, authenticated;
grant execute on function private.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) to anon, authenticated, service_role;
grant execute on function private."current_user_can_post_to_tasting_group"(uuid) to authenticated, service_role;
grant execute on function private."current_user_can_read_tasting_group_profiles"(uuid) to authenticated, service_role;
grant execute on function private."current_user_can_read_team_training_account"(uuid) to authenticated, service_role;
grant execute on function private."current_user_can_schedule_tasting_group_reminder"(uuid) to authenticated, service_role;
grant execute on function private."current_user_can_submit_tasting_group_profile"(uuid, uuid) to authenticated, service_role;
grant execute on function private."current_user_hosts_tasting_group"(uuid) to authenticated, service_role;
grant execute on function private."current_user_hosts_tasting_group_event"(uuid) to authenticated, service_role;
grant execute on function private."current_user_is_admin"() to authenticated, service_role;
grant execute on function private."current_user_owns_team_training_account"(uuid) to authenticated, service_role;
