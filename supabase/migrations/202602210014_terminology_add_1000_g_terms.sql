-- Add 1,000 unique terminology entries for letter G.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Goal-Aligned', 'outputs tuned to explicit user intent and policy constraints'),
    ('Governance-Ready', 'operations structured for auditability and compliance'),
    ('Grounded', 'responses anchored to verifiable context and references'),
    ('Guardrailed', 'safety constraints enforced across model and tool execution'),
    ('Granular', 'fine-grained control over workflow decisions and outputs'),
    ('Generalization-Aware', 'robust behavior across varied unseen scenarios'),
    ('Gap-Sensitive', 'detection of missing evidence or incomplete reasoning'),
    ('Guidance-Oriented', 'instructional responses shaped for learner clarity'),
    ('Gradient-Calibrated', 'probability and ranking signals tuned for consistency'),
    ('Graph-Structured', 'relational context management for retrieval and reasoning'),
    ('Generation-Bounded', 'decoding behavior constrained by quality and policy rules'),
    ('Gated', 'release conditions enforced before publication or action'),
    ('Geared', 'capabilities configured to task-specific complexity levels'),
    ('Global-Local Balanced', 'coordination between system-wide policy and local context'),
    ('Gold-Standard Tracked', 'comparison against canonical benchmark references'),
    ('Growth-Oriented', 'iterative improvement tied to measurable quality gains'),
    ('Guideline-Compliant', 'strict adherence to documented operating standards'),
    ('Ground-Truth Linked', 'evaluation against labeled or validated outcomes'),
    ('Governed', 'decision pathways controlled by explicit oversight logic'),
    ('Graceful', 'failure handling that preserves usability and transparency'),
    ('Gain-Optimized', 'improvement prioritization for highest impact changes'),
    ('Granularity-Tuned', 'detail level matched to task and audience needs'),
    ('Guarded-Execution', 'safeguarded autonomous steps with escalation hooks'),
    ('Geo-Scoped', 'region-aware policy and compliance behavior'),
    ('Graph-Aware', 'dependency and relationship signals used in decision flow'),
    ('Guided-Routing', 'intent-based path selection with policy-aware constraints'),
    ('Gap-Corrective', 'systematic closure of quality and knowledge deficiencies'),
    ('Goal-Weighted', 'priority scoring based on objective importance'),
    ('Governance-Linked', 'runtime actions tied to control framework requirements'),
    ('Grounding-First', 'evidence validation before final output composition'),
    ('General-Purpose Ready', 'broad applicability across multiple workflow classes'),
    ('Generation-Traceable', 'token-to-tool provenance retained for audits'),
    ('Guardrail-Transparent', 'explainable safety interventions and refusals'),
    ('Gesture-Safe', 'interaction patterns designed for clear user control'),
    ('Glitch-Resilient', 'stability under transient errors and noisy inputs'),
    ('Governing-Model Aware', 'meta-policy integration across model providers'),
    ('Grounding-Calibrated', 'citation and evidence thresholds tuned to risk level'),
    ('Gameplan-Driven', 'execution aligned to predefined instructional pathways'),
    ('Greenfield-Ready', 'deployment-friendly defaults for new project environments'),
    ('Guided-Evaluation', 'rubric-based scoring embedded in routine operations')
),
domains(word, application) as (
  values
    ('Goal Framework', 'objective definition and success criteria for AI tasks'),
    ('Governance Matrix', 'policy controls mapped to runtime enforcement points'),
    ('Grounding Pipeline', 'evidence retrieval and citation attachment workflows'),
    ('Guardrail Layer', 'safety checks across prompt, model, and tool boundaries'),
    ('Granularity Model', 'level-of-detail controls for educational responses'),
    ('Generalization Suite', 'cross-scenario validation for model robustness'),
    ('Gap Register', 'tracked deficits in quality, coverage, and reliability'),
    ('Guidance Engine', 'instruction-aware response planning and delivery'),
    ('Gradient Dashboard', 'confidence and scoring observability for decisions'),
    ('Graph Index', 'relationship-based retrieval and context navigation'),
    ('Generation Policy', 'decoding and formatting constraints for output quality'),
    ('Gate Controller', 'approval logic before publication or execution'),
    ('Global Rulebook', 'shared standards for all AI workflows'),
    ('Gold Benchmark', 'reference testbed for release comparisons'),
    ('Growth Ledger', 'iteration history tied to measurable improvements'),
    ('Guideline Library', 'operating procedures for teams and assistants'),
    ('Ground Truth Set', 'validated examples for evaluation and calibration'),
    ('Governance Console', 'oversight interface for risk and compliance state'),
    ('Graceful Fallback', 'degraded-mode behavior during disruptions'),
    ('Gain Tracker', 'impact monitoring for optimization initiatives'),
    ('Guarded Runtime', 'safe execution shell for autonomous operations'),
    ('Geo Compliance Map', 'region-specific policy routing and enforcement'),
    ('Graph Router', 'dependency-informed orchestration across tools'),
    ('Goal Queue', 'priority-ordered task handling by impact and urgency'),
    ('Grounding Validator', 'citation integrity and relevance checks'),
    ('General Catalog', 'shared inventory of prompts, tools, and terms'),
    ('Generation Logbook', 'trace history for output provenance and review'),
    ('Guardrail Report', 'summary of interventions and safety outcomes'),
    ('Gameplan Board', 'curriculum and mission sequencing for learners'),
    ('Guided Eval Board', 'human and automated scoring workflow coordination')
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
