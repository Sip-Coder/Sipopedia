-- Ensure authenticated users can execute CRUD through RLS policies.
-- This is idempotent and safe to run in environments where grants already exist.
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.tasting_notes to authenticated;
