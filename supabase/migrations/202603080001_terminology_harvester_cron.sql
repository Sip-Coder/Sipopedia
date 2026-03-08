create extension if not exists pg_cron;
create extension if not exists pg_net;

create table if not exists public.terminology_harvest_runs (
  id uuid primary key default gen_random_uuid(),
  target_count integer not null check (target_count > 0),
  generated_count integer not null default 0 check (generated_count >= 0),
  inserted_count integer not null default 0 check (inserted_count >= 0),
  attempts integer not null default 0 check (attempts >= 0),
  status text not null check (status in ('success', 'partial', 'failed')),
  details text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists terminology_harvest_runs_created_idx
  on public.terminology_harvest_runs (created_at desc);

alter table public.terminology_harvest_runs enable row level security;

drop policy if exists "admins read terminology harvest runs" on public.terminology_harvest_runs;
create policy "admins read terminology harvest runs"
  on public.terminology_harvest_runs
  for select
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "service role inserts terminology harvest runs" on public.terminology_harvest_runs;
create policy "service role inserts terminology harvest runs"
  on public.terminology_harvest_runs
  for insert
  with check (auth.role() = 'service_role');

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
      'target', 500,
      'trigger', 'pg_cron'
    )
  );
  $$
);
