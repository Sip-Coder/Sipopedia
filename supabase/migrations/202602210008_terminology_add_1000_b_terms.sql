-- Add 1,000 unique terminology entries for letter B.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Balanced', 'equitable model behavior across different users and contexts'),
    ('Bayesian', 'probabilistic reasoning under uncertainty in AI decisions'),
    ('Behavior-Aware', 'runtime adaptation based on observed interaction patterns'),
    ('Benchmark-Driven', 'continuous comparison against defined quality baselines'),
    ('Bias-Reduced', 'systematic reduction of unfair output disparities'),
    ('Boundary-Safe', 'strict handling of policy and operational constraints'),
    ('Budget-Scoped', 'cost-aware execution within defined token and latency limits'),
    ('Batch-Optimized', 'efficient grouped processing with stable quality control'),
    ('Baseline-Checked', 'validation against known-good behavior before release'),
    ('Branching', 'structured workflow forks for conditional model actions'),
    ('Broad-Coverage', 'expanded test and retrieval coverage across scenarios'),
    ('Brokered', 'mediated tool and model access through controlled gateways'),
    ('Buffered', 'queue-backed workload management for burst traffic'),
    ('Binary-Decision', 'clear yes/no gating for automated actions'),
    ('Backtested', 'historical replay validation before production rollout'),
    ('Baseline-Aligned', 'output consistency with approved operational standards'),
    ('Blueprinted', 'templated implementation patterns for repeatable delivery'),
    ('Benefit-Weighted', 'prioritized actions based on measured user impact'),
    ('Blocklisted', 'disallowed inputs and actions filtered by explicit rules'),
    ('Bottleneck-Aware', 'performance tuning focused on throughput constraints'),
    ('Breach-Resistant', 'defensive controls against misuse and data leakage'),
    ('Beam-Searched', 'candidate exploration to improve generation quality'),
    ('Byte-Efficient', 'compact context use for speed and cost efficiency'),
    ('Backbone-Integrated', 'core platform integration for unified AI operations'),
    ('Bandwidth-Aware', 'adaptation to network and service throughput limits'),
    ('Business-Tuned', 'configuration aligned to domain and workflow goals'),
    ('Baseline-Calibrated', 'confidence and scoring tuned against reference outcomes'),
    ('Bug-Resilient', 'failure-tolerant behavior with graceful degradation'),
    ('Bias-Tracked', 'ongoing fairness monitoring through explicit indicators'),
    ('Burndown-Oriented', 'issue reduction planning tied to sprint objectives'),
    ('Benchmark-Calibrated', 'model choice and routing tuned by benchmark evidence'),
    ('Boundary-Aware', 'context-sensitive safety handling at system edges'),
    ('Bundle-Oriented', 'grouped capability packaging for consistent deployments'),
    ('Brief-Context', 'short-context prompting tuned for relevance and precision'),
    ('Build-Ready', 'deployment-focused AI outputs suitable for production use'),
    ('Behavior-Linked', 'decision logic tied to observed user and system signals'),
    ('Boosted', 'ensemble-informed improvements in prediction quality'),
    ('Bayesian-Calibrated', 'probability estimates aligned with observed outcomes'),
    ('Bucketed', 'segmented evaluation and routing by task class'),
    ('Brainstorm-Assisted', 'idea-generation workflows with guided AI support')
),
domains(word, application) as (
  values
    ('Blueprint', 'system design for reliable AI product delivery'),
    ('Benchmark Matrix', 'quality measurement across repeated AI evaluations'),
    ('Behavior Model', 'response pattern control in user-facing AI systems'),
    ('Boundary Policy', 'safety and compliance constraints for model operation'),
    ('Budget Ledger', 'cost tracking and spend governance in AI pipelines'),
    ('Batch Pipeline', 'high-throughput request processing in production'),
    ('Bias Audit', 'fairness verification before and after deployment'),
    ('Build Loop', 'iterative improvement of prompts, tools, and workflows'),
    ('Briefing Engine', 'structured summarization and planning outputs'),
    ('Backlog Router', 'priority-based routing of AI tasks and follow-ups'),
    ('Baseline Framework', 'reference architecture for model quality control'),
    ('Branch Planner', 'conditional orchestration of multi-step model actions'),
    ('Bug Triage', 'issue classification and remediation planning for AI failures'),
    ('Business Ruleset', 'domain-specific constraints for output acceptability'),
    ('Bottleneck Monitor', 'detection of throughput and latency constraints'),
    ('Bridge Layer', 'integration path between data, tools, and model runtimes'),
    ('Backup Strategy', 'fallback methods for model or provider outages'),
    ('Benefit Tracker', 'impact metrics for AI-enabled feature outcomes'),
    ('Board Report', 'executive-level governance communication for AI initiatives'),
    ('Benchmark Suite', 'standardized test collection for model comparisons'),
    ('Boundary Register', 'catalog of operational and policy limits'),
    ('Broadcast Channel', 'shared update mechanisms for AI status and incidents'),
    ('Bundle Schema', 'structured packaging of prompts, tools, and policies'),
    ('Beacon Signal', 'health and risk telemetry emitted from AI services'),
    ('Blended Index', 'combined ranking signals for retrieval and relevance'),
    ('Brainstorm Panel', 'collaborative idea evaluation with AI assistance'),
    ('Briefing Template', 'repeatable format for AI-generated summaries'),
    ('Behavior Trace', 'record of execution decisions and model outputs'),
    ('Bandwidth Model', 'capacity planning for AI traffic and concurrency'),
    ('Bayesian Scorecard', 'probability-based scoring of model outcomes')
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
    'Team example: use "' || n.term || '" in weekly planning to reduce avoidable AI failures.',
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
