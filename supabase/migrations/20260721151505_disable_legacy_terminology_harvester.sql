do $$
declare
  job_id bigint;
begin
  select j.jobid
    into job_id
    from cron.job j
   where j.jobname = 'terminology-harvester-daily-8am-pst'
   limit 1;

  if job_id is not null then
    perform cron.unschedule(job_id);
  end if;
end $$;
