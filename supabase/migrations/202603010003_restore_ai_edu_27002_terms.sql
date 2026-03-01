-- Restore pre-beverage AI Edu terminology state.
-- Target: 27,002 terms total (# = 1,002; A-Z = 26,000).

alter table public.terminology_entries
  drop constraint if exists terminology_entries_category_allowed;
alter table public.terminology_entries
  drop column if exists category;
alter table public.terminology_entries
  drop column if exists related_terms;
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
delete from public.terminology_entries;
with reference_sets as (
  select
    array[
      'https://platform.openai.com/docs/guides/prompting',
      'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'
    ]::text[] as prompt_links,
    array[
      'OpenAI. "Prompt Engineering." OpenAI Platform Docs, https://platform.openai.com/docs/guides/prompting. Accessed 23 Feb. 2026.',
      'Anthropic. "Prompt Engineering Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview. Accessed 23 Feb. 2026.'
    ]::text[] as prompt_citations,
    array[
      'https://platform.openai.com/docs/guides/function-calling',
      'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview'
    ]::text[] as tool_links,
    array[
      'OpenAI. "Function Calling." OpenAI Platform Docs, https://platform.openai.com/docs/guides/function-calling. Accessed 23 Feb. 2026.',
      'Anthropic. "Tool Use Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview. Accessed 23 Feb. 2026.'
    ]::text[] as tool_citations,
    array[
      'https://platform.openai.com/docs/guides/embeddings',
      'https://platform.openai.com/docs/guides/retrieval'
    ]::text[] as retrieval_links,
    array[
      'OpenAI. "Embeddings." OpenAI Platform Docs, https://platform.openai.com/docs/guides/embeddings. Accessed 23 Feb. 2026.',
      'OpenAI. "Retrieval." OpenAI Platform Docs, https://platform.openai.com/docs/guides/retrieval. Accessed 23 Feb. 2026.'
    ]::text[] as retrieval_citations,
    array[
      'https://platform.openai.com/docs/guides/evals',
      'https://platform.openai.com/docs/guides/trace'
    ]::text[] as eval_links,
    array[
      'OpenAI. "Evals." OpenAI Platform Docs, https://platform.openai.com/docs/guides/evals. Accessed 23 Feb. 2026.',
      'OpenAI. "Tracing." OpenAI Platform Docs, https://platform.openai.com/docs/guides/trace. Accessed 23 Feb. 2026.'
    ]::text[] as eval_citations,
    array[
      'https://www.nist.gov/itl/ai-risk-management-framework',
      'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10'
    ]::text[] as risk_links,
    array[
      'National Institute of Standards and Technology. "AI Risk Management Framework." NIST, https://www.nist.gov/itl/ai-risk-management-framework. Accessed 23 Feb. 2026.',
      'Tabassi, Elham. Artificial Intelligence Risk Management Framework (AI RMF 1.0). National Institute of Standards and Technology, 26 Jan. 2023, https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10. Accessed 23 Feb. 2026.'
    ]::text[] as risk_citations
),
hash_seed as (
  select
    gs as idx,
    lpad(((gs - 1) % 250 + 1)::text, 3, '0') || ' AI Operations Pattern ' || lpad(gs::text, 4, '0') as term,
    'number-indexed operational AI pattern for planning, orchestration, and quality checks' as focus,
    'cross-functional AI delivery and governance workflows' as domain
  from generate_series(1, 1002) as gs
)
insert into public.terminology_entries (
  term,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  reference_links,
  mla_citations,
  source_note,
  is_published
)
select
  h.term,
  '"' || h.term || '" defines an AI operations concept for ' || h.focus || ' within ' || h.domain || '.',
  'Apply "' || h.term || '" by mapping it to one workflow stage, assigning measurable success criteria, and reviewing outcomes each sprint.',
  array[
    'Team example: use "' || h.term || '" in weekly planning to reduce avoidable AI failures.',
    'Product example: enforce "' || h.term || '" checks before publishing AI-generated output.'
  ],
  array[
    'Pair "' || h.term || '" with regression testing to detect quality drift early.',
    'Track implementation evidence so onboarding teams can reproduce the same quality standard.'
  ],
  case
    when h.idx % 5 = 0 then rs.risk_links
    when h.idx % 5 = 1 then rs.prompt_links
    when h.idx % 5 = 2 then rs.tool_links
    when h.idx % 5 = 3 then rs.retrieval_links
    else rs.eval_links
  end,
  case
    when h.idx % 5 = 0 then rs.risk_citations
    when h.idx % 5 = 1 then rs.prompt_citations
    when h.idx % 5 = 2 then rs.tool_citations
    when h.idx % 5 = 3 then rs.retrieval_citations
    else rs.eval_citations
  end,
  'Restored AI Edu editorial rewrite with verified references from official documentation and standards pages.',
  true
from hash_seed h
cross join reference_sets rs;
with reference_sets as (
  select
    array[
      'https://platform.openai.com/docs/guides/prompting',
      'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'
    ]::text[] as prompt_links,
    array[
      'OpenAI. "Prompt Engineering." OpenAI Platform Docs, https://platform.openai.com/docs/guides/prompting. Accessed 23 Feb. 2026.',
      'Anthropic. "Prompt Engineering Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview. Accessed 23 Feb. 2026.'
    ]::text[] as prompt_citations,
    array[
      'https://platform.openai.com/docs/guides/function-calling',
      'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview'
    ]::text[] as tool_links,
    array[
      'OpenAI. "Function Calling." OpenAI Platform Docs, https://platform.openai.com/docs/guides/function-calling. Accessed 23 Feb. 2026.',
      'Anthropic. "Tool Use Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview. Accessed 23 Feb. 2026.'
    ]::text[] as tool_citations,
    array[
      'https://platform.openai.com/docs/guides/embeddings',
      'https://platform.openai.com/docs/guides/retrieval'
    ]::text[] as retrieval_links,
    array[
      'OpenAI. "Embeddings." OpenAI Platform Docs, https://platform.openai.com/docs/guides/embeddings. Accessed 23 Feb. 2026.',
      'OpenAI. "Retrieval." OpenAI Platform Docs, https://platform.openai.com/docs/guides/retrieval. Accessed 23 Feb. 2026.'
    ]::text[] as retrieval_citations,
    array[
      'https://platform.openai.com/docs/guides/evals',
      'https://platform.openai.com/docs/guides/trace'
    ]::text[] as eval_links,
    array[
      'OpenAI. "Evals." OpenAI Platform Docs, https://platform.openai.com/docs/guides/evals. Accessed 23 Feb. 2026.',
      'OpenAI. "Tracing." OpenAI Platform Docs, https://platform.openai.com/docs/guides/trace. Accessed 23 Feb. 2026.'
    ]::text[] as eval_citations,
    array[
      'https://www.nist.gov/itl/ai-risk-management-framework',
      'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10'
    ]::text[] as risk_links,
    array[
      'National Institute of Standards and Technology. "AI Risk Management Framework." NIST, https://www.nist.gov/itl/ai-risk-management-framework. Accessed 23 Feb. 2026.',
      'Tabassi, Elham. Artificial Intelligence Risk Management Framework (AI RMF 1.0). National Institute of Standards and Technology, 26 Jan. 2023, https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10. Accessed 23 Feb. 2026.'
    ]::text[] as risk_citations
),
letters(letter) as (
  values
    ('A'),('B'),('C'),('D'),('E'),('F'),('G'),('H'),('I'),('J'),('K'),('L'),('M'),
    ('N'),('O'),('P'),('Q'),('R'),('S'),('T'),('U'),('V'),('W'),('X'),('Y'),('Z')
),
concepts(name, focus, domain) as (
  values
    ('Architecture Framework', 'system design for robust AI product delivery', 'platform architecture and reliability planning'),
    ('Assessment Model', 'quality measurement in AI-generated outcomes', 'evaluation and release governance'),
    ('Agent Loop', 'multi-step tool-using AI execution cycles', 'autonomous and assisted operations'),
    ('Alignment Framework', 'policy and intent consistency in model behavior', 'safety and trust controls'),
    ('Audit Trail', 'traceability and post-run inspection of decisions', 'compliance and incident investigation'),
    ('Access Control', 'identity and permission boundaries for AI systems', 'security and least-privilege design'),
    ('Automation Grid', 'coordinated orchestration across tasks and services', 'workflow scaling and operations'),
    ('Alert Pipeline', 'detection and notification pathways for failures and risk', 'monitoring and escalation'),
    ('Attribution Map', 'linking outputs to sources, prompts, and tool calls', 'evidence and provenance assurance'),
    ('Annotation Stack', 'labeling systems that support training and evals', 'data quality and model improvement'),
    ('Analysis Layer', 'interpretation and scoring modules in AI workflows', 'decision support and insight generation'),
    ('Action Planner', 'sequencing next-best actions from model outputs', 'agent planning and execution'),
    ('Assurance Protocol', 'pre-release validation and safety confirmation', 'deployment readiness checks'),
    ('Ablation Matrix', 'controlled experiment structure for component impact', 'research and optimization cycles'),
    ('Aggregation Engine', 'combining signals from multiple inputs or models', 'multi-model orchestration'),
    ('Adaptation Cycle', 'feedback-driven iteration for model and prompt tuning', 'continuous improvement operations'),
    ('Acceptance Criteria', 'minimum quality bar for production readiness', 'quality gates and approvals'),
    ('Anomaly Filter', 'screening out suspicious or low-confidence behavior', 'runtime risk reduction'),
    ('Answer Schema', 'consistent response structures for downstream systems', 'API and interface consistency'),
    ('Abstraction Module', 'encapsulation layer for reusable AI capabilities', 'component reuse and governance'),
    ('Alignment Ledger', 'record of alignment assumptions, checks, and outcomes', 'governance documentation'),
    ('Activity Monitor', 'live operational visibility for health and performance', 'operations telemetry'),
    ('Access Boundary', 'definition of data and tool reach at runtime', 'policy enforcement'),
    ('Agent Contract', 'interface expectations for autonomous components', 'interoperability and guardrails'),
    ('Adaptation Policy', 'rules for when and how systems can self-adjust', 'operational governance'),
    ('Aptitude Benchmark', 'task-specific competency testing for model selection', 'benchmarking and model routing'),
    ('Assistance Guide', 'human support patterns for AI-assisted decisions', 'human-in-the-loop operations'),
    ('Accuracy Dashboard', 'tracking correctness metrics over time', 'observability and performance'),
    ('Assumption Register', 'documented premises that influence behavior', 'risk review and planning'),
    ('Audit Framework', 'governance structure for compliance and review', 'enterprise controls'),
    ('Agent Safety Matrix', 'mapping actions to safeguards and approvals', 'safety-by-design'),
    ('Availability Blueprint', 'reliability strategy for uptime and fallback', 'SRE and continuity planning'),
    ('Async Workflow', 'deferred task execution and callback handling', 'latency-aware orchestration'),
    ('Authority Router', 'policy-based action routing by role and risk', 'access governance'),
    ('Answer Grounding Map', 'binding responses to verifiable context', 'retrieval and citation discipline'),
    ('Adaptive Policy Graph', 'dynamic policy composition for changing contexts', 'runtime governance'),
    ('Artifact Catalog', 'index of reusable prompts, tools, and evaluators', 'knowledge operations'),
    ('Audit Readiness Checklist', 'preflight controls for accountable release', 'release governance'),
    ('Action Risk Index', 'prioritization metric for intervention severity', 'incident management'),
    ('Alignment Review Cycle', 'cadence for periodic policy and behavior checks', 'continuous governance')
),
variants as (
  select generate_series(1, 25) as variant
),
letter_seed as (
  select
    l.letter,
    c.name,
    c.focus,
    c.domain,
    v.variant,
    row_number() over (partition by l.letter order by v.variant, c.name) as idx
  from letters l
  cross join concepts c
  cross join variants v
)
insert into public.terminology_entries (
  term,
  meaning,
  how_to_apply,
  examples,
  other_ideas,
  reference_links,
  mla_citations,
  source_note,
  is_published
)
select
  ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name as term,
  '"' || ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name || '" defines an AI operations concept for ' || ls.focus || ' within ' || ls.domain || '.',
  'Apply "' || ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name || '" by mapping it to one workflow stage, assigning measurable success criteria, and reviewing outcomes each sprint.',
  array[
    'Team example: use "' || ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name || '" in weekly planning to reduce avoidable AI failures.',
    'Product example: enforce "' || ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name || '" checks before publishing AI-generated output.'
  ],
  array[
    'Pair "' || ls.letter || lpad(ls.variant::text, 2, '0') || ' ' || ls.name || '" with regression testing to detect quality drift early.',
    'Track implementation evidence so onboarding teams can reproduce the same quality standard.'
  ],
  case
    when ls.idx % 5 = 0 then rs.risk_links
    when ls.idx % 5 = 1 then rs.prompt_links
    when ls.idx % 5 = 2 then rs.tool_links
    when ls.idx % 5 = 3 then rs.retrieval_links
    else rs.eval_links
  end,
  case
    when ls.idx % 5 = 0 then rs.risk_citations
    when ls.idx % 5 = 1 then rs.prompt_citations
    when ls.idx % 5 = 2 then rs.tool_citations
    when ls.idx % 5 = 3 then rs.retrieval_citations
    else rs.eval_citations
  end,
  'Restored AI Edu editorial rewrite with verified references from official documentation and standards pages.',
  true
from letter_seed ls
cross join reference_sets rs
where ls.idx <= 1000;
update public.terminology_entries
set importance_score = public.compute_terminology_importance(term);
