-- Fix recursive profile RLS used by admin checks.
--
-- Older policies checked admin status with an EXISTS subquery against
-- public.profiles from inside policies on public.profiles. That can recurse
-- when another exposed table, such as terminology_entries, also has an admin
-- policy. Keep the role lookup in a private SECURITY DEFINER helper and call
-- it as a statement-level initPlan from RLS policies.

create schema if not exists private;

create or replace function private.current_user_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;

revoke all on function private.current_user_is_admin() from public;
grant usage on schema private to authenticated, service_role;
grant execute on function private.current_user_is_admin() to authenticated, service_role;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = private, public
as $$
  select private.current_user_is_admin();
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, service_role;

drop policy if exists "profiles are self-readable" on public.profiles;
create policy "profiles are self-readable"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "profiles are self-updatable" on public.profiles;
create policy "profiles are self-updatable"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "admins read all profiles" on public.profiles;
create policy "admins read all profiles"
  on public.profiles
  for select
  to authenticated
  using ((select private.current_user_is_admin()));

drop policy if exists "admins update all profiles" on public.profiles;
create policy "admins update all profiles"
  on public.profiles
  for update
  to authenticated
  using ((select private.current_user_is_admin()))
  with check ((select private.current_user_is_admin()));

create or replace function public.enforce_profile_update_guardrails()
returns trigger
language plpgsql
set search_path = public, private
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'Profile id is immutable';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception 'Profile created_at is immutable';
  end if;

  if new.role is distinct from old.role and not private.current_user_is_admin() then
    raise exception 'Only admins can change profile roles';
  end if;

  return new;
end;
$$;

drop policy if exists "public can read published terminology" on public.terminology_entries;
create policy "public can read published terminology"
  on public.terminology_entries
  for select
  to anon, authenticated
  using (is_published = true);

drop policy if exists "admins manage terminology" on public.terminology_entries;
create policy "admins manage terminology"
  on public.terminology_entries
  for all
  to authenticated
  using ((select private.current_user_is_admin()))
  with check ((select private.current_user_is_admin()));

drop policy if exists "admins read all subscriptions" on public.customer_subscriptions;
create policy "admins read all subscriptions"
  on public.customer_subscriptions
  for select
  to authenticated
  using ((select private.current_user_is_admin()));
