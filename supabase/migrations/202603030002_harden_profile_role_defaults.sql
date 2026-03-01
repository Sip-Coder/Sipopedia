-- Security hardening:
-- Revert temporary dev-time admin elevation and require explicit admin grants.

alter table public.profiles
  alter column role set default 'student';

update public.profiles
set role = 'student'
where role = 'admin';
