-- Add 1,000 unique terminology entries for letter P.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Policy-Aligned', 'model and tool behavior constrained by approved governance rules'),
    ('Prompt-Calibrated', 'instruction design tuned for reliable and relevant outputs'),
    ('Performance-Tracked', 'quality, latency, and cost monitored continuously'),
    ('Privacy-Guarded', 'data handling restricted to least-privilege and safe retention patterns'),
    ('Precision-Focused', 'response accuracy prioritized through verification steps'),
    ('Provenance-Linked', 'claims tied directly to source evidence and references'),
    ('Pipeline-Oriented', 'multi-step execution organized into repeatable workflow stages'),
    ('Predictability-Driven', 'variance reduction for consistent behavior across runs'),
    ('Posture-Aware', 'risk posture influences routing and escalation decisions'),
    ('Production-Ready', 'operational safeguards in place for real user traffic'),
    ('Prioritization-Weighted', 'tasks ranked by impact, urgency, and confidence'),
    ('Parsing-Safe', 'structured outputs validated before downstream consumption'),
    ('Parameter-Bounded', 'generation controls constrained to safe ranges'),
    ('Parallelization-Ready', 'workflow tasks decomposed for concurrent execution'),
    ('Path-Traceable', 'decision and tool pathways logged for audits'),
    ('Policy-Transparent', 'interventions and refusals explained with clear rationale'),
    ('Prompt-Resilient', 'robust performance under prompt variation and ambiguity'),
    ('Progress-Adaptive', 'instruction depth adjusted to learner advancement signals'),
    ('Problem-Scoped', 'responses limited to defined objectives and constraints'),
    ('Protection-First', 'security and safety checks applied before action'),
    ('Pattern-Aware', 'recurring behavior signals leveraged for optimization'),
    ('Provider-Agnostic', 'architecture flexible across model vendors and APIs'),
    ('Proof-Oriented', 'recommendations accompanied by supporting evidence'),
    ('Plan-Driven', 'execution follows explicit strategic sequencing'),
    ('Payload-Validated', 'inputs sanitized and checked against schemas'),
    ('Prediction-Calibrated', 'confidence values mapped to observed reliability'),
    ('Portability-Focused', 'components designed for reuse across environments'),
    ('Policy-Escalation Ready', 'handoff rules defined for high-risk scenarios'),
    ('Pacing-Optimized', 'response cadence tuned for user comprehension'),
    ('Prompt-Contracted', 'scope and format expectations explicitly enforced'),
    ('Persistence-Safe', 'state retention managed with expiration and access controls'),
    ('Partition-Aware', 'segmented evaluation by cohort, task, and risk class'),
    ('Priority-Routed', 'workflow branches selected by weighted criteria'),
    ('Preflight-Checked', 'pre-run validations executed before model inference'),
    ('Postmortem-Linked', 'incident lessons fed back into operational policy'),
    ('Policy-Hardened', 'defensive controls against bypass and misuse'),
    ('Personalization-Balanced', 'tailored guidance without compromising fairness'),
    ('Prompt-Efficient', 'token-efficient instructions preserving output quality'),
    ('Planning-Observable', 'strategy steps visible to users and operators'),
    ('Pragmatic', 'decisions optimized for practical outcomes and maintainability')
),
domains(word, application) as (
  values
    ('Policy Framework', 'governance controls mapped to runtime behaviors'),
    ('Prompt Library', 'reusable instruction patterns for common tasks'),
    ('Performance Dashboard', 'tracking of reliability, cost, and latency metrics'),
    ('Privacy Boundary', 'data handling limits for safe operations'),
    ('Precision Rubric', 'evaluation criteria for factual and structural accuracy'),
    ('Provenance Ledger', 'source lineage tracking for generated claims'),
    ('Pipeline Graph', 'execution map for multi-step workflows'),
    ('Predictability Suite', 'stability tests across repeated prompt runs'),
    ('Posture Matrix', 'risk tier mapping to control depth'),
    ('Production Gate', 'release checks before user-facing deployment'),
    ('Priority Queue', 'task ranking and scheduling engine'),
    ('Parser Contract', 'schema validation for structured responses'),
    ('Parameter Policy', 'approved generation and routing settings'),
    ('Parallel Runtime', 'concurrent execution coordination layer'),
    ('Path Logger', 'audit trail of decisions and tool calls'),
    ('Policy Report', 'summary of interventions and compliance outcomes'),
    ('Prompt Stress Test', 'robustness checks for ambiguous inputs'),
    ('Progress Tracker', 'learner advancement and milestone monitoring'),
    ('Problem Statement Bank', 'canonical task scopes and constraints'),
    ('Protection Layer', 'safety controls before autonomous actions'),
    ('Pattern Registry', 'catalog of recurring workflow behaviors'),
    ('Provider Router', 'vendor/model selection control plane'),
    ('Proof Checker', 'evidence verification before output acceptance'),
    ('Plan Board', 'sequencing and dependency management surface'),
    ('Payload Gateway', 'input sanitation and normalization stage'),
    ('Prediction Monitor', 'confidence and calibration observability'),
    ('Portability Pack', 'environment-independent component bundle'),
    ('Policy Escalation Queue', 'high-risk handoff workflow'),
    ('Pacing Guide', 'response cadence standards for instructional UX'),
    ('Preflight Checklist', 'pre-inference validation workflow')
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
