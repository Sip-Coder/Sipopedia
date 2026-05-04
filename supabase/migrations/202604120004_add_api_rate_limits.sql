create table if not exists public.api_rate_limits (
  function_name text not null,
  user_id uuid not null references auth.users (id) on delete cascade,
  window_start timestamptz not null,
  request_count integer not null default 0 check (request_count >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (function_name, user_id, window_start)
);

create index if not exists api_rate_limits_window_idx
  on public.api_rate_limits (function_name, window_start desc);

create or replace function public.set_api_rate_limits_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_api_rate_limits_updated_at on public.api_rate_limits;
create trigger set_api_rate_limits_updated_at
  before update on public.api_rate_limits
  for each row execute procedure public.set_api_rate_limits_updated_at();

alter table public.api_rate_limits enable row level security;

drop policy if exists "service role manages api rate limits" on public.api_rate_limits;
create policy "service role manages api rate limits"
  on public.api_rate_limits
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create or replace function public.consume_rate_limit(
  p_function_name text,
  p_user_id uuid,
  p_window_seconds integer,
  p_max_requests integer
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
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
$$;

revoke all on function public.consume_rate_limit(text, uuid, integer, integer) from public;
grant execute on function public.consume_rate_limit(text, uuid, integer, integer) to service_role;
