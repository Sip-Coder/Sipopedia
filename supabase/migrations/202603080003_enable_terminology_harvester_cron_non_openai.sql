create extension if not exists pg_cron;
create extension if not exists pg_net;

do $$
declare
  existing_job_id bigint;
begin
  for existing_job_id in
    select jobid
    from cron.job
    where jobname = 'terminology-harvester-daily-8am-pst'
  loop
    perform cron.unschedule(existing_job_id);
  end loop;
end
$$;

select cron.schedule(
  'terminology-harvester-daily-8am-pst',
  '0 16 * * *',
  $$
  select net.http_post(
    url := rtrim(coalesce(current_setting('app.settings.supabase_url', true), ''), '/') || '/functions/v1/terminology-harvester',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || coalesce(current_setting('app.settings.service_role_key', true), ''),
      'x-cron-secret', coalesce(current_setting('app.settings.terminology_cron_secret', true), '')
    ),
    body := jsonb_build_object(
      'target', 250,
      'trigger', 'pg_cron_non_openai'
    )
  );
  $$
);
