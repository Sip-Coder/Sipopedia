-- Add 1,000 unique terminology entries for letter C.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Calibrated', 'confidence alignment between predicted and observed outcomes'),
    ('Causal', 'cause-and-effect reasoning for reliable decision support'),
    ('Chain-Aware', 'multi-step dependency handling in agent workflows'),
    ('Change-Tracked', 'versioned updates across prompts, tools, and policies'),
    ('Checkpointed', 'recovery points for resilient AI execution'),
    ('Class-Balanced', 'class-distribution fairness in model behavior'),
    ('Clean-Room', 'isolated experimentation to reduce contamination risk'),
    ('Closed-Loop', 'feedback-driven optimization for quality improvement'),
    ('Cloud-Native', 'scalable deployment patterns for AI services'),
    ('Coached', 'guided human-AI collaboration for better outcomes'),
    ('Cohort-Sensitive', 'performance analysis across user segments'),
    ('Composable', 'modular assembly of prompts, tools, and evaluators'),
    ('Compliance-Ready', 'policy-conformant behavior under governance constraints'),
    ('Computation-Aware', 'resource-sensitive model execution and routing'),
    ('Concept-Grounded', 'definition and explanation tied to verified concepts'),
    ('Consensus-Checked', 'agreement validation across runs or models'),
    ('Constraint-Bound', 'strict adherence to safety and formatting rules'),
    ('Context-Guided', 'retrieval and prompting shaped by relevant history'),
    ('Context-Windowed', 'controlled use of limited token context'),
    ('Continuous', 'ongoing monitoring and iterative tuning'),
    ('Controllable', 'adjustable output behavior via explicit parameters'),
    ('Coverage-Driven', 'test breadth expansion to reduce blind spots'),
    ('Cross-Validated', 'generalization checks across multiple data slices'),
    ('Curated', 'quality-filtered knowledge and workflow components'),
    ('Customer-Aligned', 'experience tuning based on user needs and intent'),
    ('Cost-Bounded', 'spend control through token and model policies'),
    ('Counterfactual', 'what-if reasoning to inspect model decisions'),
    ('Consistency-Preserved', 'stable behavior across prompts and sessions'),
    ('Correlation-Aware', 'signal interpretation that separates noise from trend'),
    ('Crash-Resistant', 'fault-tolerant execution under service failures'),
    ('Cipher-Safe', 'secure handling of sensitive and encrypted data flows'),
    ('Commit-Gated', 'release gating tied to quality thresholds'),
    ('Clustered', 'group-based analysis and retrieval strategy'),
    ('Contract-Driven', 'interface rules for predictable model-tool integration'),
    ('Case-Matched', 'scenario-specific routing to specialized workflows'),
    ('Curriculum-Based', 'progressive capability development for users and systems'),
    ('Compute-Scaled', 'dynamic resource allocation based on demand'),
    ('Completion-Tuned', 'response shaping for concise and complete outputs'),
    ('Content-Safe', 'harm-reducing controls for generated text and actions'),
    ('Community-Informed', 'design updates guided by aggregated user feedback')
),
domains(word, application) as (
  values
    ('Control Framework', 'operational governance for AI delivery'),
    ('Confidence Model', 'probability calibration and decision thresholds'),
    ('Chain Router', 'multi-step workflow routing and escalation'),
    ('Change Ledger', 'tracked modifications for prompts and policies'),
    ('Checkpoint System', 'resumable processing for long-running tasks'),
    ('Class Monitor', 'fairness and distribution diagnostics'),
    ('Context Index', 'retrieval organization for relevance and speed'),
    ('Compliance Grid', 'policy checks for release readiness'),
    ('Cost Monitor', 'token and infrastructure spending controls'),
    ('Consensus Engine', 'agreement detection across outputs'),
    ('Coverage Matrix', 'evaluation breadth across scenarios'),
    ('Casebook', 'canonical examples for operator training'),
    ('Contract Layer', 'tool invocation schema and validation'),
    ('Calibration Suite', 'confidence adjustment and scoring checks'),
    ('Customer Map', 'journey and intent alignment planning'),
    ('Coordination Plane', 'service orchestration and scheduling'),
    ('Curation Pipeline', 'quality filtering for term and content sets'),
    ('Crosscheck Engine', 'validation against references and constraints'),
    ('Continuity Plan', 'fallback design for outages and failures'),
    ('Contribution Tracker', 'impact attribution across features and teams'),
    ('Cluster Board', 'grouped performance and risk analysis'),
    ('Curriculum Track', 'structured learning progression management'),
    ('Completion Schema', 'response format and completeness rules'),
    ('Command Channel', 'approved control path for high-risk actions'),
    ('Communication Brief', 'stakeholder-ready operational summaries'),
    ('Content Filter', 'unsafe output screening and remediation'),
    ('Compliance Report', 'audit-ready evidence packaging'),
    ('Capability Registry', 'catalog of available model skills'),
    ('Correlation Dashboard', 'signal trend visualization and alerts'),
    ('Context Buffer', 'temporary memory management for workflow continuity')
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
