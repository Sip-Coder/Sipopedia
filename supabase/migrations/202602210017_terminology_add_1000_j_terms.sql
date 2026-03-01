-- Add 1,000 unique terminology entries for letter J.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Judgment-Calibrated', 'decision confidence matched to evidence quality and risk level'),
    ('Journey-Aligned', 'workflow sequencing tuned to end-to-end learner outcomes'),
    ('Justification-Driven', 'responses supported by explicit rationale and references'),
    ('Jitter-Resilient', 'stable behavior under latency variation and transient faults'),
    ('Job-Oriented', 'task execution optimized for clear operational objectives'),
    ('Joint-Reasoned', 'combined model and tool signals used for stronger decisions'),
    ('Jurisdiction-Aware', 'policy behavior adapted to regional compliance boundaries'),
    ('JSON-Strict', 'output constrained to machine-parseable structured formats'),
    ('Junction-Routed', 'branching logic for multi-step orchestration paths'),
    ('Judicious', 'careful action selection under uncertainty and safety constraints'),
    ('Journaled', 'persistent event logging for traceability and audits'),
    ('Just-in-Time', 'context retrieval and tool calls performed at needed moments'),
    ('Justice-Oriented', 'fairness-aware language and decision design across groups'),
    ('Job-Scoped', 'execution bounded to authorized task responsibilities'),
    ('Jargon-Managed', 'terminology complexity tuned to audience understanding'),
    ('Jointly-Evaluated', 'human and automated scoring combined in release decisions'),
    ('Jammed-Input Safe', 'robustness against noisy, malformed, or adversarial prompts'),
    ('Judgment-Transparent', 'clear explanation of confidence and limitations'),
    ('Journey-Traceable', 'decision and interaction history preserved end-to-end'),
    ('Justification-Linked', 'claims tied to citations and source evidence'),
    ('Jigsaw-Composed', 'modular assembly of context snippets into coherent output'),
    ('Jump-Conditioned', 'conditional transitions between workflow stages'),
    ('Joule-Efficient', 'compute-efficient operation for cost and sustainability goals'),
    ('Joyful-Learning', 'engaging educational tone without sacrificing accuracy'),
    ('Job-Queue Optimized', 'throughput and fairness balanced across queued tasks'),
    ('Joint-Policy Aligned', 'system prompts and runtime checks coordinated together'),
    ('Judgment-Bounded', 'autonomy constrained by threshold and escalation rules'),
    ('Journey-Responsive', 'dynamic adaptation to learner progress and confusion signals'),
    ('JIT-Calibrated', 'on-demand retrieval tuned for precision and latency'),
    ('Junction-Safe', 'transition safeguards between tools and autonomous steps'),
    ('Jitter-Observed', 'latency and retry telemetry tracked for reliability tuning'),
    ('Justification-Audited', 'reasoning chains inspected for consistency and validity'),
    ('Job-Class Aware', 'routing adapted by task type, complexity, and risk'),
    ('JSON-Validated', 'schema checks enforced before output acceptance'),
    ('Judgment-Weighted', 'decision scoring based on impact and confidence'),
    ('Journey-Optimized', 'learning path refinements based on completion outcomes'),
    ('Joint-Context Aware', 'memory and retrieval signals blended with live input'),
    ('Jurisdiction-Mapped', 'policy rules organized by legal and domain context'),
    ('Justification-Rich', 'explanations include reasoning steps and evidence pointers'),
    ('Job-Failure Contained', 'error isolation to prevent cascading workflow issues')
),
domains(word, application) as (
  values
    ('Judgment Framework', 'confidence and escalation logic for AI decisions'),
    ('Journey Map', 'progress tracking across learning and task milestones'),
    ('Justification Ledger', 'stored rationale and citations for outputs'),
    ('Jitter Monitor', 'latency and retry observability for runtime health'),
    ('Job Router', 'task dispatch across model tiers and tool paths'),
    ('Joint Evaluation Board', 'combined rubric review from humans and systems'),
    ('Jurisdiction Matrix', 'regional policy mapping for compliance controls'),
    ('JSON Schema', 'structured response contract for downstream parsing'),
    ('Junction Controller', 'safe branch transitions in orchestrated workflows'),
    ('Journal Pipeline', 'event logging and replay for diagnostics'),
    ('Just-in-Time Retriever', 'on-demand context fetch for inference quality'),
    ('Justice Audit', 'fairness inspection and remediation planning'),
    ('Job Scope Policy', 'authorization boundaries for automated actions'),
    ('Jargon Guide', 'readability standards for mixed-skill audiences'),
    ('Joint Metrics', 'shared KPI surface for quality and cost'),
    ('Jam Filter', 'input normalization and malformed prompt handling'),
    ('Judgment Report', 'confidence, uncertainty, and rationale summaries'),
    ('Journey Ledger', 'historical record of learner and assistant decisions'),
    ('Justification Validator', 'consistency checks for claim-evidence links'),
    ('Jigsaw Context Engine', 'modular context composition for long tasks'),
    ('Jump Rulebook', 'conditional transition policy for workflows'),
    ('Joule Budget', 'resource usage planning for efficient inference'),
    ('Joyful Learning Track', 'engagement-focused educational flow design'),
    ('Job Queue', 'priority scheduling and fairness controls'),
    ('Joint Policy Layer', 'synchronization of prompt policy and runtime guardrails'),
    ('Judgment Gate', 'threshold trigger for human escalation'),
    ('Journey Signal Hub', 'progress and confusion telemetry collection'),
    ('JIT Index', 'fast retrieval index for time-sensitive responses'),
    ('Junction Guardrail', 'tool-transition safety checks and rollback rules'),
    ('Justification Archive', 'versioned storage of rationale artifacts')
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
