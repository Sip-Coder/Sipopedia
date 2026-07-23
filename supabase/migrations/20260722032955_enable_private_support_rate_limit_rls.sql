-- The rate-limit table is private and accessed only through its owner-run SECURITY DEFINER function.
-- Enabling RLS adds defense in depth without changing that function's behavior.

alter table private.support_request_rate_limits enable row level security;
revoke all on table private.support_request_rate_limits from public, anon, authenticated;
grant all on table private.support_request_rate_limits to service_role;
