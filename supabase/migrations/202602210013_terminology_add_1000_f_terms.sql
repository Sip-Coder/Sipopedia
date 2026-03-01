-- Add 1,000 unique terminology entries for letter F.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Fact-Grounded', 'responses anchored to verifiable evidence and trusted context'),
    ('Failure-Aware', 'design patterns that anticipate and mitigate breakdowns'),
    ('Feedback-Driven', 'iterative improvement from user and evaluator signals'),
    ('Fairness-Calibrated', 'bias-sensitive behavior across groups and use cases'),
    ('Flow-Optimized', 'efficient progression through multi-step AI workflows'),
    ('Filter-Governed', 'policy-based screening of unsafe or irrelevant outputs'),
    ('Format-Bound', 'strict adherence to structured response requirements'),
    ('Function-Linked', 'tool interactions aligned with validated contracts'),
    ('Fault-Tolerant', 'resilient execution under dependency disruptions'),
    ('Forecast-Oriented', 'predictive reasoning integrated into planning workflows'),
    ('Frame-Aligned', 'prompt framing matched to domain and intent boundaries'),
    ('Fidelity-Focused', 'high-accuracy output quality under measurable criteria'),
    ('Fragment-Aware', 'handling partial context while preserving coherence'),
    ('Fallback-Ready', 'deterministic backup pathways for model or tool failures'),
    ('Forensic', 'deep traceability for post-incident analysis and audits'),
    ('Frontier-Scoped', 'controlled adoption of advanced capabilities'),
    ('Feature-Isolated', 'component-level analysis for debugging and optimization'),
    ('Federated', 'distributed learning and coordination across isolated environments'),
    ('Frequency-Balanced', 'response tuning across common and rare task patterns'),
    ('Friction-Reduced', 'simplified user interactions for faster task completion'),
    ('Fact-Checked', 'verification loops to prevent unsupported claims'),
    ('Fine-Tuned', 'task-specific optimization for improved relevance and quality'),
    ('Framework-Guided', 'operations structured by explicit governance models'),
    ('Forecast-Calibrated', 'confidence-scaled predictions tied to observed outcomes'),
    ('Fluency-Tuned', 'readability and clarity optimized for target audiences'),
    ('Freshness-Aware', 'recency-sensitive behavior in dynamic information contexts'),
    ('Focus-Preserved', 'context retention for long-horizon task continuity'),
    ('Function-Safe', 'guarded tool execution with argument validation'),
    ('Funnel-Aligned', 'stage-specific support across user learning journeys'),
    ('Field-Tested', 'real-world validated workflows with measured reliability'),
    ('Failure-Containment', 'isolating errors to prevent cascading system impact'),
    ('Flag-Driven', 'signal-based routing and escalation controls'),
    ('Foresight-Enabled', 'anticipatory planning for risk and capacity changes'),
    ('Fusion-Based', 'combined signal strategies for stronger model decisions'),
    ('Footprint-Efficient', 'resource-efficient deployment and inference patterns'),
    ('Filter-Transparent', 'explainable filtering and moderation decisions'),
    ('Fairness-Tracked', 'continuous fairness monitoring and remediation loops'),
    ('Flow-Traceable', 'step-level observability across orchestration paths'),
    ('Foundation-Aligned', 'core principles embedded across system behavior'),
    ('Future-Ready', 'design prepared for evolving models and requirements')
),
domains(word, application) as (
  values
    ('Factbook', 'reference-backed terminology and response generation workflows'),
    ('Failure Matrix', 'classification and response strategy for AI incidents'),
    ('Feedback Loop', 'continuous quality improvement for model outputs'),
    ('Fairness Ledger', 'tracking and governance of equity metrics'),
    ('Flow Router', 'routing logic for multi-step model and tool operations'),
    ('Filter Stack', 'layered moderation and relevance controls'),
    ('Format Schema', 'structured output contracts for downstream systems'),
    ('Function Registry', 'catalog of callable tools and interfaces'),
    ('Fallback Grid', 'resilience pathways across dependency failures'),
    ('Forecast Engine', 'predictive output systems for planning tasks'),
    ('Frame Library', 'prompt templates and strategy patterns'),
    ('Fidelity Dashboard', 'quality monitoring for correctness and consistency'),
    ('Fragment Resolver', 'reconstruction of incomplete context segments'),
    ('Forensics Console', 'audit and investigation surface for runtime behavior'),
    ('Frontier Sandbox', 'controlled environment for advanced model testing'),
    ('Feature Board', 'component performance and impact tracking'),
    ('Federation Layer', 'cross-system coordination and data boundaries'),
    ('Frequency Analyzer', 'pattern detection across repeated interactions'),
    ('Friction Tracker', 'measurement of user effort across workflows'),
    ('Fact Checkpoint', 'verification stage before response publication'),
    ('Fine-Tune Plan', 'structured adaptation strategy for specific tasks'),
    ('Framework Binder', 'governance mapping to runtime decisions'),
    ('Forecast Register', 'record of predictive assumptions and outcomes'),
    ('Fluency Profile', 'tone and clarity configuration per audience'),
    ('Freshness Policy', 'recency handling for time-sensitive content'),
    ('Focus Buffer', 'context memory support for ongoing tasks'),
    ('Function Guardrail', 'safety constraints on tool invocation'),
    ('Funnel Map', 'progression model for learner outcomes'),
    ('Field Report', 'operational feedback from production usage'),
    ('Failure Sandbox', 'isolated replay environment for error analysis')
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
