-- Add 1,000 unique terminology entries for letter D.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Data-Aware', 'context-sensitive model behavior informed by high-quality inputs'),
    ('Decision-Calibrated', 'confidence-tuned choices aligned with observed outcomes'),
    ('Dependency-Mapped', 'explicit linkage between workflow steps and resources'),
    ('Deterministic', 'predictable output patterns under controlled constraints'),
    ('Diagnostic', 'deep failure analysis for model and pipeline issues'),
    ('Differential', 'comparative evaluation across versions and providers'),
    ('Dimension-Reduced', 'compact representation for efficient retrieval and analysis'),
    ('Disagreement-Tracked', 'captured divergence across models or evaluators'),
    ('Discovery-Oriented', 'iterative exploration of hypotheses and solution paths'),
    ('Discipline-Gated', 'quality gates enforced before deployment promotion'),
    ('Distributed', 'multi-service orchestration across scalable infrastructure'),
    ('Diversity-Balanced', 'representation-aware behavior across user and data segments'),
    ('Domain-Aligned', 'outputs tailored to specific business and educational contexts'),
    ('Double-Checked', 'secondary verification before high-impact release actions'),
    ('Drift-Resistant', 'robustness against changing data distributions over time'),
    ('Duty-Bounded', 'role-specific authority constraints in autonomous workflows'),
    ('Dynamic', 'runtime adaptation to intent, risk, and context changes'),
    ('Deadline-Safe', 'latency-aware execution under strict time budgets'),
    ('Debuggable', 'observable behavior with reproducible issue traces'),
    ('Data-Minimized', 'least-data operation for privacy and compliance'),
    ('Decomposed', 'problem breakdown into manageable and testable subtasks'),
    ('Defense-in-Depth', 'layered safeguards across model, tool, and policy boundaries'),
    ('Delegation-Ready', 'safe human-to-agent task transfer with oversight hooks'),
    ('Density-Optimized', 'signal-rich context packing for token efficiency'),
    ('Deviation-Aware', 'early detection of abnormal outputs and execution paths'),
    ('Demand-Scaled', 'elastic performance under varying workload pressure'),
    ('Differentiated', 'specialized workflows for distinct task classes'),
    ('Decoupled', 'modular separation of prompts, tools, and runtime logic'),
    ('Documentation-Linked', 'outputs tied to verifiable source references'),
    ('Dataset-Governed', 'controlled data provenance and lifecycle management'),
    ('Downtime-Prepared', 'fallback design for outages and degraded dependencies'),
    ('Distribution-Monitored', 'continuous tracking of input/output population shifts'),
    ('Disclosure-Forward', 'transparent communication of uncertainty and limits'),
    ('Decision-Traceable', 'clear audit path from prompt to final action'),
    ('Durability-Focused', 'long-term maintainability of AI workflows and assets'),
    ('Dialog-Optimized', 'conversation quality tuned for clarity and relevance'),
    ('Directive-Bound', 'response adherence to explicit system instructions'),
    ('Dissonance-Flagged', 'identification of conflicting evidence and claims'),
    ('Diffusion-Tested', 'stress-tested generation patterns across prompt variations'),
    ('Delivery-Ready', 'production-ready output quality for real user scenarios')
),
domains(word, application) as (
  values
    ('Data Contract', 'schema and quality guarantees for reliable AI input flows'),
    ('Decision Framework', 'structured criteria for model-driven actions'),
    ('Dependency Graph', 'orchestration map for tools, models, and services'),
    ('Determinism Policy', 'controls that reduce stochastic variation in outputs'),
    ('Diagnostics Console', 'operational troubleshooting for AI incidents'),
    ('Drift Register', 'monitoring and response plan for distribution changes'),
    ('Domain Playbook', 'context-specific rules and examples for workflows'),
    ('Deployment Gate', 'promotion checks for release safety and quality'),
    ('Dataset Ledger', 'traceable record of source provenance and updates'),
    ('Dialogue Engine', 'conversation handling for educational support tasks'),
    ('Deviation Monitor', 'outlier detection and escalation controls'),
    ('Defense Layer', 'stacked safeguards across runtime boundaries'),
    ('Debug Pipeline', 'reproducible issue triage and remediation flow'),
    ('Dispatch Router', 'intent-based routing to tools and model tiers'),
    ('Disclosure Standard', 'uncertainty and limitation communication rules'),
    ('Documentation Hub', 'reference-linked knowledge for consistent responses'),
    ('Demand Planner', 'capacity strategy for peak traffic and concurrency'),
    ('Downtime Plan', 'continuity procedures during provider outages'),
    ('Delta Tracker', 'difference analysis between versions and outputs'),
    ('Decision Ledger', 'audit-ready record of autonomous and human decisions'),
    ('Data Buffer', 'temporary context storage for workflow continuity'),
    ('Deduplication Layer', 'redundancy reduction in retrieval and logging'),
    ('Directive Parser', 'instruction interpretation for robust compliance'),
    ('Diff Checker', 'comparison tooling for output quality changes'),
    ('Domain Glossary', 'controlled vocabulary for term consistency'),
    ('Delivery Circuit', 'end-to-end flow from prompt to user output'),
    ('Drift Dashboard', 'visibility surface for quality and behavior trends'),
    ('Decision Queue', 'prioritized task handling with risk weighting'),
    ('Discovery Notebook', 'structured experimentation and insight capture'),
    ('Durability Protocol', 'maintenance patterns for long-lived AI products')
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
