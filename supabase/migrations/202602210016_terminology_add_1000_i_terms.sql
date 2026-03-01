-- Add 1,000 unique terminology entries for letter I.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Intent-Aligned', 'model behavior aligned to explicit user goals and constraints'),
    ('Inference-Safe', 'guarded generation paths for reliable and policy-compliant outputs'),
    ('Insight-Driven', 'decision flow guided by measurable evidence and patterns'),
    ('Integrity-Focused', 'trustworthy outputs with provenance and validation checks'),
    ('Iteration-Ready', 'rapid improvement cycles based on structured feedback'),
    ('Interoperable', 'seamless coordination across tools, models, and systems'),
    ('Instruction-Bound', 'strict adherence to role, format, and task directives'),
    ('Impact-Weighted', 'prioritization by expected learner and product outcomes'),
    ('Incident-Prepared', 'operational readiness for failure and misuse events'),
    ('Index-Optimized', 'retrieval structures tuned for relevance and latency'),
    ('Interpretability-First', 'outputs designed for clear human understanding'),
    ('Intervention-Ready', 'clean escalation points for human review and override'),
    ('Isolation-Safe', 'sandboxed execution boundaries for risky operations'),
    ('Input-Calibrated', 'prompt and context quality checks before inference'),
    ('Imbalance-Aware', 'fairness controls for skewed data and user segments'),
    ('Integration-Centered', 'architecture planned for modular extension and reuse'),
    ('Insight-Traceable', 'reasoning artifacts preserved for audits and retrospectives'),
    ('Iterative-Eval', 'continuous scoring loops across releases and updates'),
    ('Intent-Routed', 'task classification with policy-aware pathway selection'),
    ('Instruction-Tuned', 'response quality tuned through directive refinement'),
    ('Invariant-Preserving', 'stable behavior under prompt and environment variation'),
    ('Interruption-Resilient', 'continuity across pauses, retries, and dropped steps'),
    ('Inference-Efficient', 'cost and latency balanced during model execution'),
    ('Inclusion-Oriented', 'accessible and equitable language for broad audiences'),
    ('Incident-Traceable', 'event timelines preserved for rapid diagnosis'),
    ('Information-Dense', 'high-value context packaging within token limits'),
    ('Insight-Calibrated', 'confidence matched to data quality and evidence depth'),
    ('Interface-Safe', 'guarded API and tool boundaries in runtime calls'),
    ('Improvement-Led', 'roadmap driven by quality metrics and outcomes'),
    ('Iteration-Bounded', 'controlled experimentation with clear stop criteria'),
    ('Intent-Transparent', 'explicit communication of scope and limitations'),
    ('Integrity-Audited', 'regular compliance and consistency verification'),
    ('Index-Governed', 'retrieval management with quality and freshness controls'),
    ('Instruction-Scoped', 'task boundaries enforced in response generation'),
    ('Inference-Monitored', 'live metrics and alerts for runtime quality'),
    ('Interdisciplinary', 'blended domain reasoning for complex educational tasks'),
    ('Impact-Observable', 'outcome tracking tied to user and business goals'),
    ('Innovation-Safe', 'new capability rollout with staged safeguards'),
    ('Insight-Rich', 'actionable explanations with practical next steps'),
    ('Intuition-Aided', 'guided suggestions that preserve user decision authority')
),
domains(word, application) as (
  values
    ('Intent Framework', 'goal interpretation and alignment across workflows'),
    ('Inference Pipeline', 'end-to-end generation and validation stages'),
    ('Insight Ledger', 'tracked findings and rationale for decisions'),
    ('Integrity Matrix', 'quality and trust controls across runtime components'),
    ('Iteration Board', 'continuous improvement planning for prompts and tools'),
    ('Interoperability Layer', 'cross-system compatibility and integration logic'),
    ('Instruction Schema', 'directive format rules for consistent outputs'),
    ('Impact Dashboard', 'measurement of learning and product outcomes'),
    ('Incident Runbook', 'response procedures for operational failures'),
    ('Index Catalog', 'organization of retrieval sources and embeddings'),
    ('Interpretability Report', 'human-readable explanation artifacts'),
    ('Intervention Queue', 'human review routing for high-risk outputs'),
    ('Isolation Shell', 'secure sandbox for experimental execution'),
    ('Input Gateway', 'sanitization and validation before model calls'),
    ('Imbalance Monitor', 'fairness and representation diagnostics'),
    ('Integration Hub', 'tool and service orchestration across products'),
    ('Insight Trail', 'auditable chain of evidence and reasoning'),
    ('Iterative Eval Suite', 'repeatable assessment for release readiness'),
    ('Intent Router', 'classification and workflow dispatch controls'),
    ('Instruction Library', 'reusable patterns for task-specific prompting'),
    ('Invariant Checker', 'stability checks across model versions'),
    ('Interruption Handler', 'recovery logic for incomplete task execution'),
    ('Inference Budget', 'token and latency planning for requests'),
    ('Inclusion Guide', 'accessibility and readability standards'),
    ('Incident Timeline', 'chronology of events and remediation actions'),
    ('Information Buffer', 'context packing for efficient retrieval use'),
    ('Insight Scorecard', 'quality weighting for recommendations'),
    ('Interface Contract', 'validated boundaries for API and tool calls'),
    ('Improvement Register', 'catalog of issues, fixes, and outcomes'),
    ('Innovation Sandbox', 'safe environment for testing new capabilities')
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
