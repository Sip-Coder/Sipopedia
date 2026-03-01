-- Development convenience migration:
-- Promote existing profiles to admin so Terminology Admin is immediately usable.
-- Remove or adjust this policy for production environments.

update public.profiles
set role = 'admin'
where role <> 'admin';
