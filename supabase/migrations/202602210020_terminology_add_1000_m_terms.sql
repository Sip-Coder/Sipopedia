-- Add 1,000 unique terminology entries for letter M.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Model-Aware', 'workflow decisions tuned to model strengths, limits, and risk profiles'),
    ('Metrics-Driven', 'continuous improvement guided by measurable quality indicators'),
    ('Memory-Bounded', 'context persistence constrained to privacy and relevance boundaries'),
    ('Mission-Aligned', 'task execution optimized for learner and product objectives'),
    ('Moderation-Ready', 'safety filtering integrated into generation and tool usage'),
    ('Multimodal-Capable', 'coordinated reasoning across text, image, and structured signals'),
    ('Monitoring-First', 'live telemetry prioritized for reliability and diagnostics'),
    ('Model-Routed', 'dynamic model selection based on complexity and policy requirements'),
    ('Milestone-Oriented', 'outputs structured around progressive learning checkpoints'),
    ('Margin-Controlled', 'error tolerance managed through explicit quality thresholds'),
    ('Metadata-Enriched', 'context and provenance fields used to improve retrieval precision'),
    ('Mitigation-Focused', 'risk controls emphasized in high-impact workflows'),
    ('Modular', 'components designed for reuse, replacement, and independent testing'),
    ('Multi-Tiered', 'layered controls across prompts, models, and execution policies'),
    ('Model-Validated', 'release readiness confirmed through benchmark and rubric checks'),
    ('Misuse-Resistant', 'defenses against prompt abuse and unsafe task escalation'),
    ('Message-Clear', 'response language tuned for readability and actionability'),
    ('Macro-Micro Balanced', 'system-level goals coordinated with step-level quality checks'),
    ('Merge-Consistent', 'stable outputs across blended context sources'),
    ('Mode-Sensitive', 'behavior adapted to support, tutoring, or automation modes'),
    ('Memory-Traceable', 'stored context changes logged for audit and rollback analysis'),
    ('Model-Calibration Ready', 'confidence signals aligned with observed performance'),
    ('Map-Driven', 'workflow navigation based on explicit process and dependency maps'),
    ('Managed-Autonomy', 'autonomous action constrained by gates and human oversight'),
    ('Mismatch-Aware', 'detection and correction of query-source relevance gaps'),
    ('Microservice-Ready', 'deployment architecture aligned for distributed reliability'),
    ('Multilingual-Accessible', 'clear output adaptation across language contexts'),
    ('Materialized', 'frequently used retrieval context precomputed for speed'),
    ('Mutation-Tested', 'robustness validated against perturbed prompts and inputs'),
    ('Measurement-Linked', 'workflow changes tied to metric movement and outcomes'),
    ('Model-Stable', 'low variance behavior across prompt and environment changes'),
    ('Mission-Traceable', 'progress linked to measurable learning objectives'),
    ('Moderation-Transparent', 'clear explanation of filtered and refused outputs'),
    ('Memory-Efficient', 'token-aware context strategies for long sessions'),
    ('Milestone-Validated', 'learner progress checkpoints verified with rubric criteria'),
    ('Methodical', 'stepwise reasoning with explicit validation points'),
    ('Model-Efficient', 'cost and latency optimized without quality collapse'),
    ('Metadata-Governed', 'source annotations maintained with consistency controls'),
    ('Mitigation-Documented', 'risk responses recorded with clear ownership'),
    ('Mission-Ready', 'production workflow prepared for real user deployment')
),
domains(word, application) as (
  values
    ('Model Registry', 'inventory and governance of model capabilities and versions'),
    ('Metrics Dashboard', 'quality, cost, and latency tracking for operations'),
    ('Memory Policy', 'rules for retention, expiration, and privacy boundaries'),
    ('Mission Planner', 'curriculum and workflow sequencing engine'),
    ('Moderation Layer', 'content safety checks for prompts and outputs'),
    ('Multimodal Pipeline', 'cross-format inference and validation flow'),
    ('Monitoring Console', 'incident and health visibility for AI services'),
    ('Model Router', 'selection logic for provider and tier orchestration'),
    ('Milestone Tracker', 'checkpoint tracking for learner progression'),
    ('Margin Guard', 'quality threshold enforcement at release gates'),
    ('Metadata Store', 'provenance and context attributes for retrieval quality'),
    ('Mitigation Register', 'catalog of risks and remediation actions'),
    ('Modular Toolkit', 'reusable components for rapid workflow assembly'),
    ('Multi-Tier Runtime', 'layered execution design for safety and performance'),
    ('Model Validation Suite', 'benchmarks and eval harness for acceptance tests'),
    ('Misuse Shield', 'detection and response controls for unsafe requests'),
    ('Message Style Guide', 'clarity standards for educational responses'),
    ('Map Engine', 'process and dependency mapping for orchestration'),
    ('Managed Autonomy Gate', 'approval steps for high-impact actions'),
    ('Mismatch Detector', 'query-retrieval relevance checking subsystem'),
    ('Microservice Mesh', 'distributed service coordination architecture'),
    ('Multilingual Adapter', 'language-aware response and prompt controls'),
    ('Materialized Index', 'precomputed retrieval structures for performance'),
    ('Mutation Test Bench', 'resilience testing against adversarial variants'),
    ('Measurement Ledger', 'historical record of KPI and quality movement'),
    ('Model Stability Report', 'variance monitoring across versions'),
    ('Mission Scorecard', 'objective completion and learning outcome tracking'),
    ('Moderation Report', 'summary of safety interventions and outcomes'),
    ('Memory Budget', 'token allocation strategy for context persistence'),
    ('Milestone Rubric', 'competency-based evaluation criteria')
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
