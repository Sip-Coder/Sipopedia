-- Finish least-privilege grants and lock public helper entry points to their intended callers.

CREATE OR REPLACE FUNCTION public.consume_rate_limit(p_function_name text, p_user_id uuid, p_window_seconds integer, p_max_requests integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_window_start timestamptz;
  v_request_count integer;
begin
  if p_function_name is null or btrim(p_function_name) = '' then
    return false;
  end if;

  if p_user_id is null then
    return false;
  end if;

  if p_window_seconds is null or p_window_seconds < 1 then
    return false;
  end if;

  if p_max_requests is null or p_max_requests < 1 then
    return false;
  end if;

  v_window_start := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  insert into public.api_rate_limits (function_name, user_id, window_start, request_count)
  values (p_function_name, p_user_id, v_window_start, 1)
  on conflict (function_name, user_id, window_start)
  do update
    set request_count = public.api_rate_limits.request_count + 1,
        updated_at = now()
  returning request_count into v_request_count;

  return v_request_count <= p_max_requests;
end;
$function$

CREATE OR REPLACE FUNCTION public.create_support_request(p_user_id uuid, p_lane_id text, p_contact_name text, p_contact_email text, p_team_name text, p_team_size integer, p_plan_interest text, p_urgency text, p_subject text, p_message text, p_source_route text)
 RETURNS support_requests
 LANGUAGE sql
 SET search_path TO 'public', 'private'
AS $function$
  select *
  from private.create_support_request(
    p_user_id,
    p_lane_id,
    p_contact_name,
    p_contact_email,
    p_team_name,
    p_team_size,
    p_plan_interest,
    p_urgency,
    p_subject,
    p_message,
    p_source_route
  );
$function$

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'private', 'public'
AS $function$
  select private.current_user_is_admin();
$function$

CREATE OR REPLACE FUNCTION public.set_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO ''
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$

revoke all on table public."api_rate_limits" from anon, authenticated;
grant all on table public."api_rate_limits" to service_role;
revoke all on table public."beverage_taxonomy_graph" from anon, authenticated;
grant all on table public."beverage_taxonomy_graph" to service_role;
revoke all on table public."billing_webhook_events" from anon, authenticated;
grant all on table public."billing_webhook_events" to service_role;
revoke all on table public."cellar_scan_records" from anon, authenticated;
grant delete, insert, select, update on table public."cellar_scan_records" to authenticated;
grant all on table public."cellar_scan_records" to service_role;
revoke all on table public."coach_learning_memory" from anon, authenticated;
grant insert, select, update on table public."coach_learning_memory" to authenticated;
grant all on table public."coach_learning_memory" to service_role;
revoke all on table public."customer_subscriptions" from anon, authenticated;
grant select on table public."customer_subscriptions" to authenticated;
grant all on table public."customer_subscriptions" to service_role;
revoke all on table public."operations_learning_memory" from anon, authenticated;
grant all on table public."operations_learning_memory" to service_role;
revoke all on table public."profiles" from anon, authenticated;
grant select, update on table public."profiles" to authenticated;
grant all on table public."profiles" to service_role;
revoke all on table public."support_requests" from anon, authenticated;
grant select, update on table public."support_requests" to authenticated;
grant all on table public."support_requests" to service_role;
revoke all on table public."tasting_group_event_reminders" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_group_event_reminders" to authenticated;
grant all on table public."tasting_group_event_reminders" to service_role;
revoke all on table public."tasting_group_event_rsvps" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_group_event_rsvps" to authenticated;
grant all on table public."tasting_group_event_rsvps" to service_role;
revoke all on table public."tasting_group_events" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_group_events" to authenticated;
grant all on table public."tasting_group_events" to service_role;
revoke all on table public."tasting_group_member_profiles" from anon, authenticated;
grant insert, select, update on table public."tasting_group_member_profiles" to authenticated;
grant all on table public."tasting_group_member_profiles" to service_role;
revoke all on table public."tasting_group_memberships" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_group_memberships" to authenticated;
grant all on table public."tasting_group_memberships" to service_role;
revoke all on table public."tasting_group_posts" from anon, authenticated;
grant insert, select on table public."tasting_group_posts" to authenticated;
grant all on table public."tasting_group_posts" to service_role;
revoke all on table public."tasting_groups" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_groups" to authenticated;
grant all on table public."tasting_groups" to service_role;
revoke all on table public."tasting_notes" from anon, authenticated;
grant delete, insert, select, update on table public."tasting_notes" to authenticated;
grant all on table public."tasting_notes" to service_role;
revoke all on table public."taxonomy_learning_memory" from anon, authenticated;
grant all on table public."taxonomy_learning_memory" to service_role;
revoke all on table public."team_training_accounts" from anon, authenticated;
grant delete, insert, select, update on table public."team_training_accounts" to authenticated;
grant all on table public."team_training_accounts" to service_role;
revoke all on table public."team_training_assignments" from anon, authenticated;
grant delete, insert, select, update on table public."team_training_assignments" to authenticated;
grant all on table public."team_training_assignments" to service_role;
revoke all on table public."team_training_memberships" from anon, authenticated;
grant delete, insert, select, update on table public."team_training_memberships" to authenticated;
grant all on table public."team_training_memberships" to service_role;
revoke all on table public."terminology_entries" from anon, authenticated;
grant select on table public."terminology_entries" to anon;
grant select on table public."terminology_entries" to authenticated;
grant all on table public."terminology_entries" to service_role;
revoke all on table public."terminology_harvest_runs" from anon, authenticated;
grant select on table public."terminology_harvest_runs" to authenticated;
grant all on table public."terminology_harvest_runs" to service_role;
revoke all on table public."terminology_learning_memory" from anon, authenticated;
grant all on table public."terminology_learning_memory" to service_role;
revoke all on table public."terminology_library_entries" from anon, authenticated;
grant select on table public."terminology_library_entries" to anon;
grant select on table public."terminology_library_entries" to authenticated;
grant all on table public."terminology_library_entries" to service_role;

revoke all on function public.consume_rate_limit(text, uuid, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_rate_limit(text, uuid, integer, integer) to service_role;

revoke all on function public.is_admin() from public, anon, authenticated;
grant execute on function public.is_admin() to service_role;

revoke all on function public.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) from public;
grant execute on function public.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) to anon, authenticated, service_role;

revoke all on function public.set_timestamp_updated_at() from public, anon, authenticated;
grant execute on function public.set_timestamp_updated_at() to service_role;
