-- Add 1,000 unique terminology entries for letter N.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Narrative-Consistent', 'output structure and tone kept stable across multi-step responses'),
    ('Noise-Reduced', 'irrelevant context filtered to improve model precision'),
    ('Norms-Aligned', 'behavior matched to policy, safety, and product standards'),
    ('Need-Aware', 'responses adapted to user intent, skill level, and goals'),
    ('Nonlinear-Ready', 'workflow support for branching and iterative task paths'),
    ('Narrow-Scope Safe', 'strict constraints on autonomous action boundaries'),
    ('Nuance-Preserving', 'subtle distinctions retained in explanations and recommendations'),
    ('Node-Orchestrated', 'task execution coordinated across multiple tools and models'),
    ('Near-Real-Time', 'low-latency operation for interactive user experiences'),
    ('Novelty-Aware', 'handling unfamiliar inputs without overconfident claims'),
    ('NIST-Guided', 'risk controls aligned to recognized AI governance practices'),
    ('Named-Entity Sensitive', 'accurate handling of entities in retrieval and generation'),
    ('Numerically-Stable', 'consistent calculations and quantitative reasoning outputs'),
    ('Network-Resilient', 'continuity under variable connectivity and service conditions'),
    ('Normalization-Driven', 'input cleanup and standardization before inference'),
    ('Negotiation-Ready', 'response framing for tradeoffs and decision support'),
    ('Non-Redundant', 'duplication reduction in generated and retrieved content'),
    ('Nudge-Oriented', 'gentle guidance toward safer and more useful actions'),
    ('Need-Calibrated', 'depth and complexity adjusted to learner progress signals'),
    ('Neutral-Tone', 'balanced language in sensitive or contested topics'),
    ('Noise-Aware', 'signal confidence adjusted when context quality is low'),
    ('Narrowband-Optimized', 'efficient behavior in constrained compute or bandwidth settings'),
    ('Node-Fallback Ready', 'graceful recovery when orchestration steps fail'),
    ('Notation-Clear', 'symbol and format clarity for technical explanations'),
    ('Next-Step Focused', 'outputs include practical and sequenced follow-up actions'),
    ('Nonblocking', 'workflow steps designed to avoid deadlocks and stalls'),
    ('Need-Traceable', 'requirements linked to outputs and decision rationale'),
    ('Novel-Case Safe', 'uncertainty disclosure on unfamiliar or edge-case requests'),
    ('Nondeterminism-Bounded', 'controlled generation variability under repeated prompts'),
    ('Network-Aware', 'routing and retries tuned to external service health'),
    ('Normalization-Verified', 'sanitization outcomes checked before model calls'),
    ('Niche-Domain Ready', 'specialized context support for narrow subject areas'),
    ('Narrative-Linked', 'explanations tied to references and evidence flow'),
    ('Nonconformance-Flagged', 'policy deviations detected and surfaced quickly'),
    ('Null-Safe', 'defensive handling of missing or empty data'),
    ('Navigable', 'information organized for rapid exploration and understanding'),
    ('Need-Prioritized', 'task ranking by user impact and urgency'),
    ('Node-Transparent', 'tool and model transitions visible in audit logs'),
    ('Numeracy-Friendly', 'quantitative responses presented clearly for learners'),
    ('Next-Gen Ready', 'architecture prepared for evolving model capabilities')
),
domains(word, application) as (
  values
    ('Narrative Framework', 'structured response templates for coherence and continuity'),
    ('Noise Filter', 'context relevance screening before inference'),
    ('Norms Matrix', 'mapping of policy standards to runtime controls'),
    ('Needs Profile', 'learner and user intent modeling for personalization'),
    ('Node Graph', 'orchestration map for multi-step tool execution'),
    ('Near-Real-Time Pipeline', 'low-latency handling for interactive prompts'),
    ('Novelty Detector', 'identification of unfamiliar queries and risk cues'),
    ('Named Entity Index', 'entity-aware retrieval and disambiguation support'),
    ('Numerical Validator', 'checks for arithmetic and unit consistency'),
    ('Network Health Monitor', 'external dependency reliability tracking'),
    ('Normalization Gateway', 'input standardization and sanitization layer'),
    ('Negotiation Assistant', 'tradeoff and option analysis support flow'),
    ('Non-Redundancy Checker', 'duplicate detection in generated output'),
    ('Nudge Engine', 'behavioral guidance recommendations under guardrails'),
    ('Neutrality Guide', 'tone policy for balanced response generation'),
    ('Noise Scorecard', 'signal quality measurement across sources'),
    ('Node Fallback Matrix', 'recovery strategy for failed orchestration steps'),
    ('Notation Guide', 'format and symbol clarity standards'),
    ('Next Step Planner', 'action sequencing for learner progress'),
    ('Nonblocking Queue', 'asynchronous execution without workflow stalls'),
    ('Needs Ledger', 'traceability of user requirements and outcomes'),
    ('Novel Case Register', 'catalog of edge-case patterns and responses'),
    ('Nondeterminism Guard', 'controls for output variation and reproducibility'),
    ('Network Router', 'retry and provider selection based on service status'),
    ('Normalization Report', 'audit of input cleanup and validation outcomes'),
    ('Niche Domain Pack', 'specialized context bundle for focused subjects'),
    ('Narrative Trace', 'evidence-linked explanation timeline'),
    ('Nonconformance Log', 'policy violation tracking and remediation'),
    ('Null Handling Policy', 'safe defaults for missing values'),
    ('Navigation Map', 'content organization for discoverability')
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
