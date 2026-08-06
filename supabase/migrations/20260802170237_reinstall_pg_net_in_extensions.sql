-- pg_net cannot be relocated after installation. Supabase's supported
-- remediation is a clean drop/recreate after confirming the request queue is
-- empty. Keep this migration fail-closed: it will not remove the extension if
-- any queued work or known database consumer appears.
do $$
begin
  if not exists (
    select 1
    from pg_extension
    where extname = 'pg_net'
  ) then
    raise exception 'Refusing pg_net reinstall because the extension is not installed.';
  end if;

  if exists (select 1 from net.http_request_queue)
    or exists (select 1 from net._http_response) then
    raise exception 'Refusing pg_net reinstall while requests or responses are queued.';
  end if;

  if exists (
    select 1
    from cron.job
    where command ilike '%net.%'
  ) then
    raise exception 'Refusing pg_net reinstall while a cron job references net.*.';
  end if;

  if exists (
    select 1
    from pg_proc as procedure
    join pg_namespace as namespace
      on namespace.oid = procedure.pronamespace
    where procedure.prokind = 'f'
      and namespace.nspname <> 'net'
      and pg_get_functiondef(procedure.oid) ilike '%net.%'
      and not (
        namespace.nspname = 'extensions'
        and procedure.proname = 'grant_pg_net_access'
      )
  ) then
    raise exception 'Refusing pg_net reinstall while a routine references net.*.';
  end if;

  if exists (
    select 1
    from pg_views
    where schemaname <> 'net'
      and definition ilike '%net.%'
  ) then
    raise exception 'Refusing pg_net reinstall while a view references net.*.';
  end if;

  if exists (
    select 1
    from pg_stat_activity
    where pid <> pg_backend_pid()
      and state <> 'idle'
      and query ilike '%net.%'
  ) then
    raise exception 'Refusing pg_net reinstall while another session is using net.*.';
  end if;
end;
$$;

-- Deliberately omit CASCADE so PostgreSQL stops instead of deleting an
-- unexpected dependent object. Omit VERSION so Supabase installs its current
-- secure default.
drop extension pg_net;
create extension pg_net with schema extensions;

notify pgrst, 'reload schema';
