-- Restore the production profile-update guardrail and narrow direct client writes.
-- The earlier hardening migration was not present in the live migration history,
-- while the July reconciliation recreated the function without attaching its trigger.

create schema if not exists private;
revoke create on schema private from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;

create or replace function private.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles as profile
    where profile.id = (select auth.uid())
      and profile.role = 'admin'
  );
$$;

revoke all on function private.current_user_is_admin() from public, anon;
grant execute on function private.current_user_is_admin() to authenticated, service_role;

create or replace function public.enforce_profile_update_guardrails()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'Profile id is immutable' using errcode = '42501';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception 'Profile created_at is immutable' using errcode = '42501';
  end if;

  if new.role is distinct from old.role
     and current_user not in ('postgres', 'service_role', 'supabase_admin')
     and not (select private.current_user_is_admin()) then
    raise exception 'Only admins can change profile roles' using errcode = '42501';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_profile_update_guardrails() from public, anon, authenticated;
grant execute on function public.enforce_profile_update_guardrails() to service_role;

drop trigger if exists enforce_profile_update_guardrails on public.profiles;
create trigger enforce_profile_update_guardrails
  before update on public.profiles
  for each row
  execute function public.enforce_profile_update_guardrails();

revoke update on table public.profiles from authenticated;
grant update (display_name, role) on table public.profiles to authenticated;
