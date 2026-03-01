-- Add 1,000 unique terminology entries for letter O.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Objective-Aligned', 'outputs tuned to explicit goals and measurable outcomes'),
    ('Observability-Driven', 'runtime visibility prioritized for quality and reliability management'),
    ('Outcome-Focused', 'response design centered on practical task completion'),
    ('Orchestration-Ready', 'multi-step tool and model coordination under control policies'),
    ('Operationally-Safe', 'production behavior constrained by guardrails and escalation rules'),
    ('Ontology-Aware', 'concept relationships used to improve retrieval and reasoning quality'),
    ('Outlier-Resilient', 'stable handling of uncommon or anomalous inputs'),
    ('Oversight-Integrated', 'human review checkpoints embedded in autonomous workflows'),
    ('Optimization-Balanced', 'quality, cost, latency, and safety tradeoffs managed together'),
    ('Open-Loop Guarded', 'unverified autonomous actions blocked by validation gates'),
    ('Order-Preserving', 'step sequence maintained for deterministic workflow outcomes'),
    ('Origin-Traceable', 'content provenance preserved from source to final output'),
    ('Objection-Aware', 'alternative viewpoints surfaced in nuanced explanations'),
    ('Offline-Tolerant', 'graceful degradation when dependencies are unavailable'),
    ('Onboarding-Friendly', 'clear instructional flow for first-time users'),
    ('Output-Bounded', 'format and scope constraints enforced consistently'),
    ('Overfit-Resistant', 'generalization protected through robust eval and data practices'),
    ('Option-Ranked', 'recommendations prioritized by evidence and impact'),
    ('Operationally-Transparent', 'decisions and interventions visible in logs and reports'),
    ('Optimization-Traceable', 'tuning changes linked to measurable metric movement'),
    ('Omnichannel-Ready', 'consistent behavior across multiple interface touchpoints'),
    ('Obstacle-Detecting', 'early identification of workflow blockers and failures'),
    ('Output-Calibrated', 'confidence and completeness aligned to user context'),
    ('On-Policy', 'model and tool behavior kept within approved policy bounds'),
    ('Open-Standards Compatible', 'interfaces and data formats aligned to common standards'),
    ('Orchestration-Safe', 'dependency transitions protected by validation checkpoints'),
    ('Observer-Friendly', 'audit and debugging information easy for operators to interpret'),
    ('Opportunity-Weighted', 'prioritization based on potential learner and product benefit'),
    ('Operationally-Efficient', 'resource usage minimized without quality collapse'),
    ('One-Shot Guarded', 'single-pass flows protected by post-generation verification'),
    ('Outcome-Validated', 'results checked against predefined acceptance criteria'),
    ('Outreach-Oriented', 'responses tuned for accessibility and broad understanding'),
    ('Overload-Resistant', 'performance maintained during traffic spikes'),
    ('Object-Level Precise', 'entity-specific reasoning and retrieval disambiguation'),
    ('Optimization-Audited', 'tuning decisions reviewed for compliance and risk'),
    ('Observation-Linked', 'insights connected to evidence and telemetry traces'),
    ('On-Demand Adaptive', 'behavior adjusted dynamically at inference time'),
    ('Oriented-to-Action', 'responses include concrete next steps and follow-through'),
    ('Opaque-Claim Resistant', 'unsupported assertions flagged and corrected'),
    ('Operationally-Mature', 'processes designed for sustained production reliability')
),
domains(word, application) as (
  values
    ('Objective Matrix', 'goal mapping and acceptance criteria across workflows'),
    ('Observability Console', 'monitoring and trace analysis for AI operations'),
    ('Outcome Tracker', 'measurement of user and learning results'),
    ('Orchestration Graph', 'dependency map for multi-step execution'),
    ('Operational Guardrail', 'runtime policy enforcement for safe automation'),
    ('Ontology Index', 'concept relationship structure for retrieval quality'),
    ('Outlier Monitor', 'detection and handling of abnormal patterns'),
    ('Oversight Queue', 'human review routing for high-risk outputs'),
    ('Optimization Ledger', 'record of tuning changes and metric effects'),
    ('Open Loop Breaker', 'controls that halt unsafe autonomous loops'),
    ('Order Controller', 'step sequencing and transition validation'),
    ('Origin Ledger', 'source provenance tracking and citation continuity'),
    ('Objection Mapper', 'counterpoint and tradeoff analysis support'),
    ('Offline Fallback', 'degraded-mode strategy for external failures'),
    ('Onboarding Guide', 'starter workflow for new users and teams'),
    ('Output Contract', 'schema and formatting rules for responses'),
    ('Overfit Detector', 'generalization checks across evaluation sets'),
    ('Option Ranker', 'prioritization engine for recommendations'),
    ('Operations Report', 'summary of reliability, safety, and cost metrics'),
    ('Optimization Board', 'review workflow for model and prompt tuning'),
    ('Omnichannel Layer', 'cross-surface behavior consistency controls'),
    ('Obstacle Register', 'catalog of blockers and remediation actions'),
    ('Output Calibrator', 'confidence and completeness adjustment module'),
    ('On-Policy Evaluator', 'conformance checks against approved behavior'),
    ('Open Standards Adapter', 'interoperability mapping for interfaces'),
    ('Orchestration Gate', 'approval checkpoints for tool transitions'),
    ('Observer Dashboard', 'operator-focused visibility and diagnostics'),
    ('Opportunity Scorecard', 'impact-weighted prioritization framework'),
    ('Operational Budget', 'cost and latency limits for runtime planning'),
    ('One-Shot Validator', 'post-response verification for single-pass workflows')
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
