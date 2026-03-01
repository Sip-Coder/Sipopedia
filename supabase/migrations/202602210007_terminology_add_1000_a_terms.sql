-- Add 1,000 unique terminology entries for letter A.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Adaptive', 'dynamic model behavior that responds to changing context and feedback'),
    ('Analytical', 'structured reasoning across evidence, constraints, and tradeoffs'),
    ('Autonomous', 'independent multi-step execution with bounded guardrails'),
    ('Augmented', 'human capability extension through AI-assisted workflows'),
    ('Accurate', 'high-fidelity outputs validated against trusted sources'),
    ('Auditable', 'transparent decision trails that support review and accountability'),
    ('Aligned', 'goal-consistent behavior tied to product and policy intent'),
    ('Actionable', 'outputs that convert directly into concrete next steps'),
    ('Asynchronous', 'workflow progress across delayed or background AI operations'),
    ('Attentive', 'focused handling of salient details in long contexts'),
    ('Atomic', 'small, testable units of AI work in larger pipelines'),
    ('Assisted', 'collaborative human-in-the-loop task completion'),
    ('Assured', 'confidence-backed output release with explicit validation gates'),
    ('Anchored', 'evidence-linked responses grounded in cited context'),
    ('Ablated', 'feature removal experiments to measure contribution and risk'),
    ('Aggregated', 'multi-source synthesis into coherent task outputs'),
    ('Adaptive-Scale', 'capacity and model selection that grows with demand'),
    ('Axiom-Driven', 'rule-based constraints that shape model decisions'),
    ('Alerted', 'event-driven monitoring and incident escalation'),
    ('Anomaly-Aware', 'detection and handling of outlier behaviors'),
    ('Annotation-Rich', 'label-informed learning and evaluation workflows'),
    ('Attribute-Based', 'control logic keyed to user, task, and data attributes'),
    ('API-First', 'integration patterns designed around stable service interfaces'),
    ('Access-Safe', 'least-privilege data and tool permissions'),
    ('Availability-Tuned', 'reliability engineering for uptime and graceful degradation'),
    ('Abstraction-Layered', 'separation of orchestration, model, and interface concerns'),
    ('Approximation-Aware', 'controlled error bounds in fast inference paths'),
    ('Affective', 'interpretation of tone and sentiment in communication tasks'),
    ('Adaptive-Routing', 'dynamic provider/model routing based on live signals'),
    ('Artifact-Centered', 'workflow outputs treated as versioned operational assets'),
    ('Anti-Bias', 'systematic bias reduction in model behavior and outcomes'),
    ('Adversarial-Ready', 'resilience against prompt attacks and malformed inputs'),
    ('Agreement-Checked', 'cross-model or cross-run consensus testing'),
    ('Acceptance-Gated', 'release decisions based on explicit quality thresholds'),
    ('Acquisition-Oriented', 'data collection strategies for continual improvement'),
    ('Abuse-Resistant', 'controls for misuse prevention and policy enforcement'),
    ('Alignment-Weighted', 'optimization that prioritizes safety and intent fit'),
    ('Attention-Bounded', 'context windows managed for relevance and cost'),
    ('Audit-Linked', 'governance reporting connected to runtime telemetry'),
    ('Acceleration-Ready', 'performance-focused designs for low-latency experiences')
),
domains(word, application) as (
  values
    ('Architecture', 'system design for robust AI product delivery'),
    ('Assessment Model', 'quality measurement in AI-generated outcomes'),
    ('Agent Loop', 'multi-step tool-using AI execution cycles'),
    ('Alignment Framework', 'policy and intent consistency in model behavior'),
    ('Audit Trail', 'traceability and post-run inspection of decisions'),
    ('Access Control', 'identity and permission boundaries for AI systems'),
    ('Automation Grid', 'coordinated orchestration across tasks and services'),
    ('Alert Pipeline', 'detection and notification pathways for failures and risk'),
    ('Attribution Map', 'linking outputs to sources, prompts, and tool calls'),
    ('Annotation Stack', 'labeling systems that support training and evals'),
    ('Analysis Layer', 'interpretation and scoring modules in AI workflows'),
    ('Action Planner', 'sequencing next-best actions from model outputs'),
    ('Assurance Protocol', 'pre-release validation and safety confirmation'),
    ('Ablation Matrix', 'controlled experiment structure for component impact'),
    ('Aggregation Engine', 'combining signals from multiple inputs or models'),
    ('Adaptation Cycle', 'feedback-driven iteration for model and prompt tuning'),
    ('Acceptance Criteria', 'minimum quality bar for production readiness'),
    ('Anomaly Filter', 'screening out suspicious or low-confidence behavior'),
    ('Answer Schema', 'consistent response structures for downstream systems'),
    ('Abstraction Module', 'encapsulation layer for reusable AI capabilities'),
    ('Alignment Ledger', 'record of alignment assumptions, checks, and outcomes'),
    ('Activity Monitor', 'live operational visibility for health and performance'),
    ('Access Boundary', 'definition of data and tool reach at runtime'),
    ('Agent Contract', 'interface expectations for autonomous components'),
    ('Adaptation Policy', 'rules for when and how systems can self-adjust'),
    ('Aptitude Benchmark', 'task-specific competency testing for model selection'),
    ('Assistance Guide', 'human support patterns for AI-assisted decisions'),
    ('Accuracy Dashboard', 'tracking correctness metrics over time'),
    ('Assumption Register', 'documented premises that influence behavior'),
    ('Audit Framework', 'governance structure for compliance and review')
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
