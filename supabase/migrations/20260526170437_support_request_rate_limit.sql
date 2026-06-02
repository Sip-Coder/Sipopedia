create extension if not exists "pgcrypto";

create table if not exists private.support_request_rate_limits (
  contact_key text primary key,
  window_start timestamptz not null default now(),
  request_count integer not null default 0,
  last_request_at timestamptz not null default now(),
  check (request_count between 0 and 100)
);

revoke all on table private.support_request_rate_limits from public;
grant usage on schema private to anon, authenticated, service_role;

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
set search_path = public, private
as $$
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
$$;

revoke all on function private.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) from public;
grant execute on function private.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) to anon, authenticated, service_role;

create or replace function public.create_support_request(
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
language sql
set search_path = public, private
as $$
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
$$;

revoke all on function public.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) from public;
grant execute on function public.create_support_request(uuid, text, text, text, text, integer, text, text, text, text, text) to anon, authenticated, service_role;

drop policy if exists "public creates support requests" on public.support_requests;
