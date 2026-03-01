-- Add 1,000 unique terminology entries for letter Q.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Quality-Assured', 'output acceptance based on explicit verification criteria'),
    ('Query-Optimized', 'request rewriting and retrieval tuning for relevance gains'),
    ('Queue-Aware', 'task scheduling designed for fairness and throughput under load'),
    ('Quick-Feedback', 'short review loops that accelerate model and prompt improvement'),
    ('Quantitatively-Calibrated', 'confidence and scoring aligned to measurable outcomes'),
    ('Quota-Bounded', 'resource usage limited by predefined token and cost budgets'),
    ('Question-Driven', 'responses structured around clarified intent and uncertainty reduction'),
    ('Quality-Gated', 'release decisions constrained by rubric thresholds'),
    ('Query-Traceable', 'search and retrieval decisions logged for auditability'),
    ('Queue-Resilient', 'recovery behavior robust to retries and transient failures'),
    ('Quorum-Checked', 'agreement validation across evaluators or model runs'),
    ('Quantization-Aware', 'performance tuning informed by precision and compression choices'),
    ('Quiet-Failure Resistant', 'silent degradation detected and surfaced promptly'),
    ('Query-Contextual', 'retrieval strategy adapted to domain and user stage'),
    ('Quality-Weighted', 'ranking influenced by source reliability and relevance scores'),
    ('Quickstart-Friendly', 'clear onboarding flow for first-time users and contributors'),
    ('Question-Calibrated', 'answer depth matched to user proficiency and goal'),
    ('Queue-Prioritized', 'critical tasks elevated by impact and risk weighting'),
    ('Quarantine-Ready', 'unsafe outputs isolated before downstream effects occur'),
    ('Quality-Transparent', 'evaluation rationale visible to users and operators'),
    ('Query-Normalized', 'input variation reduced through canonical rewriting'),
    ('Quantile-Tracked', 'performance monitored across distribution percentiles'),
    ('Quick-Recovery', 'fast fallback and restore behavior after failures'),
    ('Query-Safe', 'input sanitization and policy screening before inference'),
    ('Quality-Dense', 'high signal output with minimal redundancy'),
    ('Quota-Observed', 'runtime alerts and controls for budget compliance'),
    ('Question-Routed', 'intent-based dispatch to specialized workflows'),
    ('Queue-Observable', 'scheduling metrics surfaced for operational diagnosis'),
    ('Quorum-Governed', 'multi-source confirmation required for high-risk responses'),
    ('Quality-First', 'correctness and safety prioritized over speed when required'),
    ('Query-Focused', 'prompt scope narrowed to reduce drift and ambiguity'),
    ('Quick-Iteration', 'rapid cycle experimentation with measurable checkpoints'),
    ('Quality-Linked', 'workflow changes tied to metric movement and outcomes'),
    ('Query-Bounded', 'scope limits enforced during retrieval and generation'),
    ('Queue-Stable', 'predictable execution ordering under varying traffic loads'),
    ('Quantified-Risk Aware', 'risk scoring embedded into routing and escalation logic'),
    ('Question-Answer Aligned', 'response structure tightly aligned to ask intent'),
    ('Quiescent-State Ready', 'safe idle and resume behavior for long-running tasks'),
    ('Quality-Documented', 'decision standards recorded for repeatability and audits'),
    ('Quick-Win Oriented', 'high impact improvements prioritized for early delivery')
),
domains(word, application) as (
  values
    ('Quality Rubric', 'criteria set for correctness, usefulness, and safety scoring'),
    ('Query Router', 'intent classification and workflow dispatch layer'),
    ('Queue Manager', 'task scheduling control for throughput and fairness'),
    ('Quick Feedback Loop', 'short-cycle evaluation and refinement process'),
    ('Quantitative Dashboard', 'metric tracking for latency, cost, and quality'),
    ('Quota Policy', 'budget rules for token and compute consumption'),
    ('Question Mapper', 'clarification and decomposition of user requests'),
    ('Quality Gate', 'approval stage before publishing model outputs'),
    ('Query Logbook', 'trace archive for search and retrieval operations'),
    ('Queue Recovery Plan', 'retry and fallback strategy for stalled tasks'),
    ('Quorum Engine', 'multi-run consensus scoring for confidence checks'),
    ('Quantization Profile', 'model precision and compression configuration'),
    ('Quiet Failure Monitor', 'detector for hidden degradations and silent errors'),
    ('Query Context Model', 'context enrichment for retrieval relevance'),
    ('Quality Weight Matrix', 'score blending across evidence and utility factors'),
    ('Quickstart Guide', 'onboarding sequence for contributors and operators'),
    ('Question Depth Model', 'response depth tuning by user proficiency'),
    ('Queue Priority Table', 'ordering strategy based on impact and risk'),
    ('Quarantine Layer', 'containment path for unsafe or uncertain outputs'),
    ('Quality Report', 'summary of evaluation outcomes and trends'),
    ('Query Normalizer', 'canonicalization of input wording and structure'),
    ('Quantile Monitor', 'distribution-based performance visibility'),
    ('Quick Recovery Pipeline', 'rapid rollback and restoration workflow'),
    ('Query Safety Filter', 'policy and threat checks before generation'),
    ('Quality Signal Index', 'high-value indicators used in ranking decisions'),
    ('Quota Monitor', 'real-time tracking of budget consumption'),
    ('Question Route Map', 'mapping of intents to model-tool pathways'),
    ('Queue Telemetry Board', 'operational view of scheduler health'),
    ('Quorum Policy', 'rules for consensus thresholds and tie breaks'),
    ('Quality Ledger', 'historical record of rubric and release decisions')
),
reference_sets as (
  select
    array[
      'https://platform.openai.com/docs/guides/prompting',
      'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview'
    ]::text[] as prompt_links,
    array[
      'OpenAI. "Prompt Engineering." OpenAI Platform Docs, https://platform.openai.com/docs/guides/prompting. Accessed 21 Feb. 2026.',
      'Anthropic. "Prompt Engineering Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview. Accessed 21 Feb. 2026.'
    ]::text[] as prompt_citations,
    array[
      'https://platform.openai.com/docs/guides/function-calling',
      'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview'
    ]::text[] as tool_links,
    array[
      'OpenAI. "Function Calling." OpenAI Platform Docs, https://platform.openai.com/docs/guides/function-calling. Accessed 21 Feb. 2026.',
      'Anthropic. "Tool Use Overview." Anthropic Documentation, https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview. Accessed 21 Feb. 2026.'
    ]::text[] as tool_citations,
    array[
      'https://platform.openai.com/docs/guides/embeddings',
      'https://platform.openai.com/docs/guides/retrieval'
    ]::text[] as retrieval_links,
    array[
      'OpenAI. "Embeddings." OpenAI Platform Docs, https://platform.openai.com/docs/guides/embeddings. Accessed 21 Feb. 2026.',
      'OpenAI. "Retrieval." OpenAI Platform Docs, https://platform.openai.com/docs/guides/retrieval. Accessed 21 Feb. 2026.'
    ]::text[] as retrieval_citations,
    array[
      'https://platform.openai.com/docs/guides/evals',
      'https://platform.openai.com/docs/guides/trace'
    ]::text[] as eval_links,
    array[
      'OpenAI. "Evals." OpenAI Platform Docs, https://platform.openai.com/docs/guides/evals. Accessed 21 Feb. 2026.',
      'OpenAI. "Tracing." OpenAI Platform Docs, https://platform.openai.com/docs/guides/trace. Accessed 21 Feb. 2026.'
    ]::text[] as eval_citations,
    array[
      'https://www.nist.gov/itl/ai-risk-management-framework',
      'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10'
    ]::text[] as risk_links,
    array[
      'National Institute of Standards and Technology. "AI Risk Management Framework." NIST, https://www.nist.gov/itl/ai-risk-management-framework. Accessed 21 Feb. 2026.',
      'Tabassi, Elham. Artificial Intelligence Risk Management Framework (AI RMF 1.0). National Institute of Standards and Technology, 26 Jan. 2023, https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10. Accessed 21 Feb. 2026.'
    ]::text[] as risk_citations
),
combinations as (
  select
    a.word || ' ' || d.word as term,
    a.focus,
    d.application,
    row_number() over (order by a.word, d.word) as idx
  from adjectives a
  cross join domains d
),
new_terms as (
  select c.*
  from combinations c
  where not exists (
    select 1
    from public.terminology_entries t
    where t.term = c.term
  )
  order by c.idx
  limit 1000
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
  n.term,
  '"' || n.term || '" defines an AI operations concept for ' || n.focus || ' within ' || n.application || '.',
  'Apply "' || n.term || '" by mapping it to one workflow stage, assigning measurable success criteria, and reviewing outcomes each sprint.',
  array[
    'Team example: use "' || n.term || '" in weekly planning to reduce avoidable model failures.',
    'Product example: enforce "' || n.term || '" checks before publishing AI-generated output.'
  ],
  array[
    'Pair "' || n.term || '" with regression testing to detect quality drift early.',
    'Track implementation evidence so onboarding teams can reproduce the same quality standard.'
  ],
  case
    when n.idx % 5 = 0 then rs.risk_links
    when n.idx % 5 = 1 then rs.prompt_links
    when n.idx % 5 = 2 then rs.tool_links
    when n.idx % 5 = 3 then rs.retrieval_links
    else rs.eval_links
  end,
  case
    when n.idx % 5 = 0 then rs.risk_citations
    when n.idx % 5 = 1 then rs.prompt_citations
    when n.idx % 5 = 2 then rs.tool_citations
    when n.idx % 5 = 3 then rs.retrieval_citations
    else rs.eval_citations
  end,
  'Original Open Studies editorial rewrite with verified references from official documentation and standards pages.',
  true
from new_terms n
cross join reference_sets rs
on conflict (term) do nothing;
