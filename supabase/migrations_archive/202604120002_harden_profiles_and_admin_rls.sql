-- Auth hardening:
-- 1) Prevent profile self-escalation via role changes.
-- 2) Avoid self-referential RLS recursion by using a helper admin check.
-- 3) Add guardrails for immutable profile fields.
-- 4) Set explicit search_path on SECURITY DEFINER trigger function.

create or replace function public.is_admin()
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  return exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  );
end;
$$;

drop policy if exists "profiles are self-updatable" on public.profiles;
create policy "profiles are self-updatable"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "admins read all profiles" on public.profiles;
create policy "admins read all profiles"
  on public.profiles
  for select
  using (public.is_admin());

drop policy if exists "admins update all profiles" on public.profiles;
create policy "admins update all profiles"
  on public.profiles
  for update
  using (public.is_admin())
  with check (public.is_admin());

create or replace function public.enforce_profile_update_guardrails()
returns trigger
language plpgsql
as $$
begin
  if new.id is distinct from old.id then
    raise exception 'Profile id is immutable';
  end if;

  if new.created_at is distinct from old.created_at then
    raise exception 'Profile created_at is immutable';
  end if;

  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only admins can change profile roles';
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_profile_update_guardrails on public.profiles;
create trigger enforce_profile_update_guardrails
  before update on public.profiles
  for each row execute procedure public.enforce_profile_update_guardrails();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop policy if exists "admins manage terminology" on public.terminology_entries;
create policy "admins manage terminology"
  on public.terminology_entries
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "admins read all subscriptions" on public.customer_subscriptions;
create policy "admins read all subscriptions"
  on public.customer_subscriptions
  for select
  using (public.is_admin());
