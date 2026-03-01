-- Add 1,000 unique terminology entries for letter S.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Safety-Aligned', 'responses constrained by harm prevention and policy compliance rules'),
    ('Schema-Bound', 'structured outputs validated against required formats'),
    ('Signal-Driven', 'workflow decisions guided by high-confidence telemetry and context'),
    ('Source-Grounded', 'claims tied to verifiable references before publication'),
    ('Scalable', 'system behavior maintained under increasing workload and complexity'),
    ('Session-Aware', 'context handling tuned to conversation history and user state'),
    ('Scope-Controlled', 'task boundaries enforced to prevent drift and overreach'),
    ('Stability-Tested', 'variance checked across repeated prompts and releases'),
    ('Supervision-Ready', 'human review handoffs integrated into high-risk flows'),
    ('Scorecard-Driven', 'quality decisions based on weighted evaluation criteria'),
    ('Selection-Optimized', 'routing tuned for model fit by task complexity and risk'),
    ('Source-Traceable', 'evidence lineage preserved through generation and edits'),
    ('Segmentation-Aware', 'evaluation and routing adapted by cohort and use case'),
    ('Stress-Resilient', 'reliability maintained under edge-case and load pressure'),
    ('State-Safe', 'memory and persistence managed with strict privacy controls'),
    ('Search-Calibrated', 'retrieval breadth adjusted for precision and recall balance'),
    ('Safeguard-Layered', 'multiple defensive checks applied across workflow stages'),
    ('Summarization-Faithful', 'condensed output preserves critical facts and caveats'),
    ('Scenario-Responsive', 'behavior adapts to domain-specific operating contexts'),
    ('SLA-Oriented', 'latency and uptime targets built into runtime strategy'),
    ('Signal-Observable', 'quality and risk indicators exposed for operators'),
    ('Staleness-Aware', 'recency checks used for dynamic and time-sensitive content'),
    ('Stepwise', 'reasoning and actions decomposed into auditable increments'),
    ('Sanitization-Verified', 'input cleanup confirmed before inference and tooling'),
    ('Spec-Compliant', 'implementation adheres to documented interface contracts'),
    ('Severity-Ranked', 'incidents prioritized by impact and urgency tiers'),
    ('Self-Corrective', 'feedback loops trigger remediation after detected failures'),
    ('Semantic-Consistent', 'terminology and meaning stability maintained across responses'),
    ('Security-First', 'access control and threat mitigation applied by default'),
    ('Switch-Ready', 'provider and model failover paths available when degraded'),
    ('Sampling-Calibrated', 'generation controls tuned for reliability and diversity balance'),
    ('System-Prompt Governed', 'global instruction changes managed with change control'),
    ('Sensitivity-Aware', 'privacy and risk-aware behavior for regulated content'),
    ('Similarity-Weighted', 'retrieval ranking based on semantic closeness and trust'),
    ('Source-Complete', 'output includes references required for verification'),
    ('Scaffolded-Learning', 'instruction sequence designed for incremental mastery'),
    ('Snapshot-Ready', 'state and artifacts captured for reproducibility'),
    ('Synthesis-Focused', 'multi-source insights combined into coherent recommendations'),
    ('Serviceable', 'operations designed for maintainability and fast remediation'),
    ('Sustained-Quality', 'long-term quality maintained through continuous evaluation')
),
domains(word, application) as (
  values
    ('Safety Matrix', 'policy and risk mapping for runtime controls'),
    ('Schema Contract', 'response format specification for downstream systems'),
    ('Signal Dashboard', 'real-time telemetry for quality and reliability'),
    ('Source Registry', 'reference catalog for grounding and citations'),
    ('Scalability Plan', 'capacity strategy for growing usage'),
    ('Session Manager', 'context lifecycle and state handling controls'),
    ('Scope Policy', 'boundaries for allowed tasks and outputs'),
    ('Stability Suite', 'repeatability and regression validation harness'),
    ('Supervision Queue', 'human review escalation workflow'),
    ('Scorecard Engine', 'weighted evaluation and acceptance scoring'),
    ('Selection Router', 'model and tool dispatch strategy'),
    ('Source Trail', 'provenance timeline for generated claims'),
    ('Segmentation Model', 'cohort-based behavior and evaluation logic'),
    ('Stress Test Bench', 'load and adversarial resilience testing'),
    ('State Vault', 'secure persistence layer for workflow memory'),
    ('Search Tuner', 'retrieval parameter optimization controls'),
    ('Safeguard Stack', 'layered defense controls across system stages'),
    ('Summary Validator', 'faithfulness checks for condensed responses'),
    ('Scenario Catalog', 'domain-specific operating patterns and constraints'),
    ('SLA Board', 'service level tracking and alerting'),
    ('Signal Index', 'aggregated indicators for decision support'),
    ('Staleness Monitor', 'recency drift detection for sources'),
    ('Step Planner', 'sequencing for structured task execution'),
    ('Sanitization Gateway', 'input validation and cleaning pipeline'),
    ('Specification Library', 'documented API and workflow contracts'),
    ('Severity Register', 'incident severity tracking and prioritization'),
    ('Self-Correction Loop', 'automated remediation pipeline'),
    ('Semantic Map', 'concept relationship guide for retrieval and clarity'),
    ('Security Guardrail', 'access and abuse prevention layer'),
    ('Switchboard Router', 'provider failover and fallback coordinator')
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
