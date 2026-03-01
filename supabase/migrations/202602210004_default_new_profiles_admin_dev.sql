-- Development-only convenience:
-- Make new profiles admin by default while building Terminology Admin.
-- For production, change default back to 'student' and manage roles explicitly.

alter table public.profiles
  alter column role set default 'admin';
