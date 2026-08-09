-- Keep profile roles aligned with the first-dollar access model:
-- Student and Admin live on profiles; Trial lives on customer_subscriptions.status.

update public.profiles
set role = 'student'
where role = 'mentor';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('student', 'admin'));
