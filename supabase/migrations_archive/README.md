# Archived Supabase migrations

These files are retained for historical review but are not part of the active
migration chain. Production never recorded them as applied, and their profile
hardening is superseded by the canonical July reconciliation migrations plus
the forward `harden_profile_role_updates` migration.

Do not move an archived migration back into `supabase/migrations` or mark it as
applied with `supabase migration repair` without first reconciling the linked
database schema and migration history.
