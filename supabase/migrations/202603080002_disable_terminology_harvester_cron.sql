do $$
declare
  job_id bigint;
begin
  for job_id in
    select j.jobid
    from cron.job j
    where j.jobname = 'terminology-harvester-daily-8am-pst'
  loop
    perform cron.unschedule(job_id);
  end loop;
end
$$;
