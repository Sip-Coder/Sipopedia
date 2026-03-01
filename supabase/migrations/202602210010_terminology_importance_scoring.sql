-- Add terminology importance scoring to support Top 100 mode.

alter table public.terminology_entries
  add column if not exists importance_score integer not null default 0;
create index if not exists terminology_entries_importance_idx
  on public.terminology_entries (sort_group, importance_score desc, normalized_term);
create or replace function public.compute_terminology_importance(input_term text)
returns integer
language plpgsql
immutable
as $$
declare
  t text := lower(coalesce(input_term, ''));
  score integer := 10;
begin
  if t ~ '(prompt|model|embedding|retrieval|vector|token|inference|agent|tool|function|workflow)' then
    score := score + 40;
  end if;

  if t ~ '(eval|evaluation|guardrail|safety|bias|hallucination|alignment|policy|risk)' then
    score := score + 35;
  end if;

  if t ~ '(context|latency|uncertainty|memory|routing|classifier|schema|verification|drift)' then
    score := score + 25;
  end if;

  if t ~ '^(0[0-9]|1[0-9]|2[0-5])' then
    score := score + 10;
  end if;

  return greatest(score, 0);
end;
$$;
create or replace function public.set_terminology_sort_fields()
returns trigger
language plpgsql
as $$
declare
  first_char text;
begin
  new.term := btrim(new.term);
  new.normalized_term := lower(new.term);
  first_char := upper(left(new.term, 1));

  if first_char ~ '^[0-9]$' then
    new.sort_group := '#';
  elsif first_char ~ '^[A-Z]$' then
    new.sort_group := first_char;
  else
    new.sort_group := '#';
  end if;

  new.importance_score := public.compute_terminology_importance(new.term);
  new.updated_at := now();
  return new;
end;
$$;
update public.terminology_entries
set importance_score = public.compute_terminology_importance(term)
where importance_score = 0;
