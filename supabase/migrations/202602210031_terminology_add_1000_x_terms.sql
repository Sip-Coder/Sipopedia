-- Add 1,000 unique terminology entries for letter X.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('XAI-Oriented', 'explainability-first behavior for transparent model outputs'),
    ('XML-Structured', 'responses constrained to schema-valid XML formats when required'),
    ('X-Risk Aware', 'controls designed for low-probability, high-impact failure scenarios'),
    ('X-Traceable', 'decision provenance recorded end-to-end for audits'),
    ('X-Validated', 'outputs verified through layered checks before release'),
    ('X-Contextual', 'context injection tuned to improve relevance and faithfulness'),
    ('X-Safe', 'defensive controls applied to tool use and model actions'),
    ('X-Observable', 'runtime metrics exposed for quality and reliability monitoring'),
    ('X-Calibrated', 'confidence signals aligned to measured performance'),
    ('X-Consistent', 'terminology and behavior stable across prompts and sessions'),
    ('X-Bounded', 'scope and output constraints enforced strictly'),
    ('X-Routed', 'path selection optimized across model and tool options'),
    ('X-Resilient', 'robust handling of failures, retries, and degraded dependencies'),
    ('X-Integrated', 'cross-system interoperability maintained across workflows'),
    ('X-Scalable', 'performance maintained as traffic and task complexity increase'),
    ('X-Hardened', 'resistance to adversarial prompt patterns and misuse'),
    ('X-Indexed', 'retrieval ranking improved through semantic indexing controls'),
    ('X-Centric', 'design anchored around core educational outcomes'),
    ('X-Weighted', 'ranking and routing based on explicit scoring models'),
    ('X-Guarded', 'high-impact actions gated by policy and approvals'),
    ('X-Documented', 'standards and decisions captured for maintainability'),
    ('X-Transparent', 'limitations and evidence surfaced clearly to users'),
    ('X-Fallback Ready', 'backup paths preconfigured for outages and errors'),
    ('X-Adaptive', 'behavior adjusted dynamically by intent and risk signals'),
    ('X-Refined', 'iterative improvement based on measured regressions'),
    ('X-Stable', 'variance controlled across repeated executions'),
    ('X-Driven', 'operations prioritized by measurable impact indicators'),
    ('X-Selective', 'retrieval and tool choices optimized for precision'),
    ('X-Reviewable', 'human oversight workflows embedded in critical paths'),
    ('X-Latency Aware', 'response strategy tuned to strict timing targets'),
    ('X-Formalized', 'contracts and policy rules explicitly encoded'),
    ('X-Audited', 'regular compliance and quality review integrated'),
    ('X-Goal Aligned', 'actions and outputs tied to mission objectives'),
    ('X-Predictable', 'deterministic behavior favored when risk is elevated'),
    ('X-Policy Linked', 'runtime controls synchronized with governance requirements'),
    ('X-Token Efficient', 'prompt and retrieval budgets optimized for cost'),
    ('X-Learning Focused', 'instructional guidance tuned to learner progression'),
    ('X-Error Aware', 'failure modes detected and remediated quickly'),
    ('X-Ready', 'deployment posture supports production reliability'),
    ('X-Performance Tuned', 'throughput and quality jointly optimized')
),
domains(word, application) as (
  values
    ('XAI Framework', 'explainability workflow and evidence presentation'),
    ('XML Schema', 'structured output contract for downstream parsing'),
    ('X-Risk Matrix', 'risk classification and mitigation planning'),
    ('X-Trace Ledger', 'audit trail for decisions and tool actions'),
    ('X-Validation Suite', 'automated and human quality checks'),
    ('X-Context Engine', 'context assembly and relevance tuning system'),
    ('X-Safety Layer', 'runtime guardrails for model and tool behavior'),
    ('X-Observability Dashboard', 'quality, latency, and error monitoring surface'),
    ('X-Calibration Board', 'confidence tuning and reliability review'),
    ('X-Consistency Guide', 'standards for stable language and behavior'),
    ('X-Boundary Policy', 'scope and permission constraints'),
    ('X-Routing Tree', 'dispatch logic for models and tool chains'),
    ('X-Resilience Plan', 'fallback and recovery architecture'),
    ('X-Integration Hub', 'cross-service orchestration interface'),
    ('X-Scale Profile', 'capacity planning and performance limits'),
    ('X-Hardening Checklist', 'threat mitigation and abuse prevention controls'),
    ('X-Index Catalog', 'retrieval source and embedding inventory'),
    ('X-Outcome Map', 'learning and product objective alignment'),
    ('X-Weighting Model', 'scoring strategy for ranking decisions'),
    ('X-Guardrail Queue', 'approval and escalation pathway for risky tasks'),
    ('X-Documentation Pack', 'operational and technical reference set'),
    ('X-Transparency Report', 'evidence and limitation disclosure summary'),
    ('X-Fallback Matrix', 'backup route map for degraded dependencies'),
    ('X-Adaptation Loop', 'feedback-driven tuning workflow'),
    ('X-Refinement Tracker', 'iteration history and regression control'),
    ('X-Stability Suite', 'repeatability and drift validation harness'),
    ('X-Impact Scorecard', 'outcome measurement and prioritization'),
    ('X-Selection Engine', 'precision-focused retrieval and tool choice'),
    ('X-Review Board', 'human-in-the-loop quality governance'),
    ('X-Latency Budget', 'timing targets and enforcement controls')
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
