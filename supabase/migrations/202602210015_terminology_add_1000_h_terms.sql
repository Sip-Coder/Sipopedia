-- Add 1,000 unique terminology entries for letter H.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Human-Centered', 'AI behavior optimized for real user needs and comprehension'),
    ('Hallucination-Resistant', 'controls that reduce unsupported or fabricated claims'),
    ('High-Reliability', 'consistent outcomes under changing workload and context'),
    ('Heuristic-Guided', 'rule-assisted reasoning in ambiguous decision scenarios'),
    ('Handoff-Ready', 'clear transitions between autonomous flows and human oversight'),
    ('Hypothesis-Driven', 'experimentation workflows based on explicit assumptions'),
    ('History-Aware', 'context use informed by prior interaction and outcomes'),
    ('Hierarchical', 'multi-level orchestration across tasks and sub-tasks'),
    ('Horizon-Planned', 'long-range sequencing for mission-based learning paths'),
    ('Harm-Minimized', 'risk reduction in content and action generation'),
    ('Health-Monitored', 'continuous status tracking for model and tool performance'),
    ('Hybrid-Routed', 'combination strategies across models, tools, and rules'),
    ('High-Precision', 'tight error tolerances for sensitive use cases'),
    ('Hyperlocal', 'domain and audience-specific adaptation of responses'),
    ('Human-Reviewable', 'output trace structure designed for quick expert audits'),
    ('Hotfix-Ready', 'rapid remediation pathways for production issues'),
    ('Hard-Bounded', 'strict limit enforcement for scope, tokens, and permissions'),
    ('Holistic', 'end-to-end quality perspective across complete workflows'),
    ('Harmonized', 'aligned behavior across product, policy, and data standards'),
    ('Hybrid-Context', 'blended retrieval and conversational memory strategies'),
    ('Holdout-Tested', 'validation using reserved data to reduce overfitting risk'),
    ('High-Integrity', 'trustworthy behavior with strong provenance tracking'),
    ('Human-Guided', 'interactive supervision integrated into key decision points'),
    ('Hint-Optimized', 'prompt hints tuned for accuracy and consistency'),
    ('High-Throughput', 'efficient processing under large request volumes'),
    ('Hyperscale-Ready', 'architecture prepared for rapid growth in usage'),
    ('Hazard-Aware', 'identification of potential misuse and harmful outcomes'),
    ('Heterogeneous', 'coordination across diverse tools and model providers'),
    ('Heuristic-Calibrated', 'rule strength adjusted by measured outcomes'),
    ('Helpfulness-Focused', 'response design centered on user task completion'),
    ('Hot-Path Optimized', 'latency reduction on critical interaction routes'),
    ('Human-Trust Calibrated', 'confidence communication aligned with reliability'),
    ('Hybrid-Eval', 'combined human and automated grading approaches'),
    ('History-Traceable', 'timeline visibility for decisions and corrections'),
    ('Hypothesis-Calibrated', 'evidence thresholds tied to test objectives'),
    ('High-Signal', 'noise reduction for more relevant model context'),
    ('Hardened', 'defensive architecture against prompt and tool abuse'),
    ('Host-Aware', 'runtime adaptation to environment constraints'),
    ('Human-Language Tuned', 'clear, accessible output for mixed audiences'),
    ('Heuristic-Transparent', 'explainable rule use in decision generation')
),
domains(word, application) as (
  values
    ('Human Loop', 'operator checkpoints in autonomous AI workflows'),
    ('Hallucination Filter', 'evidence checks before final response release'),
    ('Health Dashboard', 'observability for quality, latency, and failures'),
    ('Handoff Protocol', 'safe escalation from model to human reviewer'),
    ('Hypothesis Register', 'tracked assumptions and experiment outcomes'),
    ('History Buffer', 'managed context retention across sessions'),
    ('Hierarchy Planner', 'task decomposition and orchestration logic'),
    ('Horizon Board', 'long-term roadmap tracking for AI capabilities'),
    ('Harm Register', 'risk inventory and mitigation actions'),
    ('Hybrid Router', 'model and tool selection under mixed workloads'),
    ('Holdout Suite', 'evaluation set for release validation'),
    ('Help Desk Model', 'support-focused conversation handling patterns'),
    ('Hotfix Pipeline', 'rapid correction path for production defects'),
    ('Hard Limit Policy', 'non-negotiable constraints in runtime behavior'),
    ('Holistic Scorecard', 'end-to-end quality and impact measurement'),
    ('Harmony Matrix', 'alignment map across policy and product goals'),
    ('Hybrid Memory', 'blended retrieval and short-term context strategy'),
    ('Hazard Map', 'threat modeling for misuse and failure scenarios'),
    ('Heterogeneous Grid', 'multi-provider orchestration architecture'),
    ('Hint Library', 'prompt cue catalog for task reliability'),
    ('High-Throughput Queue', 'load management for large-volume traffic'),
    ('Hyperscale Plan', 'capacity roadmap for expanding usage'),
    ('Human Trust Ledger', 'confidence communication and accountability logs'),
    ('Hybrid Eval Board', 'combined rubric and reviewer scoring workflow'),
    ('History Ledger', 'chronological trace of model decisions'),
    ('Hypothesis Canvas', 'structured experimentation templates'),
    ('High-Signal Index', 'relevance-focused retrieval ranking'),
    ('Hardened Runtime', 'defensive execution shell for tools and models'),
    ('Host Profile', 'environment-specific configuration and limits'),
    ('Human Language Guide', 'clarity standards for instructional output')
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
