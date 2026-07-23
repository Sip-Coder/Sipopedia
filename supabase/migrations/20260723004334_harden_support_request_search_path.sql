create or replace function private.create_support_request(
  p_user_id uuid,
  p_lane_id text,
  p_contact_name text,
  p_contact_email text,
  p_team_name text,
  p_team_size integer,
  p_plan_interest text,
  p_urgency text,
  p_subject text,
  p_message text,
  p_source_route text
)
returns public.support_requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_contact_email text := pg_catalog.lower(pg_catalog.btrim(coalesce(p_contact_email, '')));
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

  if pg_catalog.length(pg_catalog.btrim(coalesce(p_subject, ''))) < 4
    or pg_catalog.length(pg_catalog.btrim(coalesce(p_message, ''))) < 12 then
    raise exception 'Support request subject and message are required.' using errcode = '22023';
  end if;

  v_contact_key := pg_catalog.encode(extensions.digest(v_contact_email, 'sha256'), 'hex');

  select rate_limit.*
    into v_limit
    from private.support_request_rate_limits as rate_limit
    where rate_limit.contact_key = v_contact_key
    for update;

  if not found then
    insert into private.support_request_rate_limits (contact_key, window_start, request_count, last_request_at)
    values (v_contact_key, pg_catalog.now(), 1, pg_catalog.now());
  elsif v_limit.window_start < pg_catalog.now() - interval '1 hour' then
    update private.support_request_rate_limits as rate_limit
      set window_start = pg_catalog.now(),
          request_count = 1,
          last_request_at = pg_catalog.now()
      where rate_limit.contact_key = v_contact_key;
  elsif v_limit.request_count >= 3 then
    raise exception 'Too many support requests were submitted for this contact email. Try again later.' using errcode = 'P0001';
  else
    update private.support_request_rate_limits as rate_limit
      set request_count = rate_limit.request_count + 1,
          last_request_at = pg_catalog.now()
      where rate_limit.contact_key = v_contact_key;
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
    pg_catalog.left(pg_catalog.regexp_replace(pg_catalog.btrim(coalesce(p_contact_name, '')), '\s+', ' ', 'g'), 120),
    v_contact_email,
    pg_catalog.left(pg_catalog.regexp_replace(pg_catalog.btrim(coalesce(p_team_name, '')), '\s+', ' ', 'g'), 160),
    p_team_size,
    pg_catalog.left(pg_catalog.regexp_replace(pg_catalog.btrim(coalesce(p_plan_interest, '')), '\s+', ' ', 'g'), 80),
    case when p_urgency in ('normal', 'soon', 'urgent') then p_urgency else 'normal' end,
    pg_catalog.left(pg_catalog.regexp_replace(pg_catalog.btrim(coalesce(p_subject, '')), '\s+', ' ', 'g'), 160),
    pg_catalog.left(pg_catalog.btrim(coalesce(p_message, '')), 2000),
    pg_catalog.left(pg_catalog.regexp_replace(pg_catalog.btrim(coalesce(p_source_route, 'support')), '\s+', ' ', 'g'), 160)
  )
  returning * into v_row;

  return v_row;
end;
$$;

revoke all on function private.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) from public;
grant execute on function private.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) to anon, authenticated, service_role;
