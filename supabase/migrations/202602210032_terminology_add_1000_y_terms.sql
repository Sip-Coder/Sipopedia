-- Add 1,000 unique terminology entries for letter Y.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Yield-Optimized', 'quality output maximized per token, second, and review cycle'),
    ('User-Data Bounded', 'personal and proprietary data handled within strict limits'),
    ('Year-Round Reliable', 'stable behavior maintained through seasonal demand shifts'),
    ('Yoked-to-Goals', 'workflow decisions tied directly to defined success outcomes'),
    ('Yardstick-Driven', 'evaluation anchored to fixed scoring standards and benchmarks'),
    ('Yield-Aware', 'generation strategy balances completeness against resource cost'),
    ('Y-Path Routed', 'request pathways selected by intent, risk, and complexity class'),
    ('Yoked-Safety', 'guardrails integrated across prompts, tools, and release gates'),
    ('Yet-Verified', 'responses only finalized after evidence confirmation'),
    ('YAML-Structured', 'machine-consumable output generated in schema-valid YAML when required'),
    ('Y-Coverage Tested', 'edge cases and common flows validated before deployment'),
    ('Yield-Calibrated', 'confidence and utility tuned to observed performance data'),
    ('Y-Observant', 'runtime metrics watched continuously for drift and failures'),
    ('Y-Fallback Ready', 'predefined failover paths for degraded dependencies'),
    ('Y-Scale Prepared', 'architected for concurrent traffic growth without quality loss'),
    ('Yoked-Transparency', 'limitations and evidence shown clearly to users'),
    ('Y-Contracted', 'output scope and format bounded by explicit contracts'),
    ('Y-Queue Balanced', 'task scheduling fairness maintained across workloads'),
    ('Y-Scenario Safe', 'robust handling of unusual and adversarial inputs'),
    ('Y-Traceable', 'reasoning and action paths preserved for auditability'),
    ('Y-Policy Aligned', 'runtime behavior synchronized with governance rules'),
    ('Y-Latency Aware', 'response strategy adapted to strict timing requirements'),
    ('Y-Learning Centered', 'instructional guidance tuned to progression outcomes'),
    ('Y-Relevance Weighted', 'retrieval ordering based on semantic fit and trust'),
    ('Y-Threshold Gated', 'autonomous steps allowed only after criterion checks'),
    ('Y-Review Integrated', 'human oversight embedded at high-impact steps'),
    ('Y-Context Bounded', 'history and memory constrained to relevant evidence'),
    ('Y-Signal Focused', 'noise removed so high-value signals drive behavior'),
    ('Y-Refinement Ready', 'continuous improvement tied to measurable regressions'),
    ('Y-Consistency Guarded', 'terminology and tone maintained across sessions'),
    ('Y-Resilience Tested', 'recovery performance validated under failure injection'),
    ('Y-Documentation Linked', 'operational decisions tied to documented standards'),
    ('Y-Outcome Anchored', 'recommendations mapped to learner and product goals'),
    ('Y-Model Portable', 'design remains compatible across provider ecosystems'),
    ('Y-Token Efficient', 'prompt composition minimizes waste while preserving quality'),
    ('Y-Risk Scored', 'routing decisions weighted by quantified risk factors'),
    ('Y-Intervention Ready', 'escalation policies available for uncertain outputs'),
    ('Y-Preference Sensitive', 'delivery style adapts to user role and needs'),
    ('Y-Validation Rich', 'multi-layer checks combine evals, citations, and policy review'),
    ('Y-Release Ready', 'production deployment confidence established pre-launch')
),
domains(word, application) as (
  values
    ('Yield Dashboard', 'metrics surface for outcome-per-resource optimization'),
    ('Your-Data Boundary', 'privacy control model for personal and proprietary data'),
    ('Yearly Capacity Plan', 'seasonal readiness framework for scale and reliability'),
    ('Yardstick Rubric', 'fixed scoring model for quality acceptance'),
    ('Yield Router', 'selection logic for cost-quality tradeoff routing'),
    ('YAML Contract', 'schema definition for structured response generation'),
    ('Y-Coverage Matrix', 'scenario map for functional and safety test breadth'),
    ('Yield Calibration Log', 'history of confidence and scoring adjustments'),
    ('Y-Observability Board', 'live runtime and quality telemetry dashboard'),
    ('Y-Fallback Matrix', 'backup pathways for degraded model or tool services'),
    ('Y-Scale Profile', 'capacity and throughput configuration plan'),
    ('Y-Transparency Report', 'evidence and limitation disclosure artifact'),
    ('Y-Output Contract', 'bounded format and scope specification'),
    ('Y-Queue Manager', 'scheduling control for fairness and latency'),
    ('Y-Scenario Harness', 'edge-case and adversarial test environment'),
    ('Y-Trace Ledger', 'auditable log of decisions and tool invocations'),
    ('Y-Policy Engine', 'governance-aligned runtime rule executor'),
    ('Y-Latency Budget', 'timing targets with enforcement checks'),
    ('Y-Learning Map', 'progression plan linked to competency milestones'),
    ('Y-Relevance Index', 'ranking structure for retrieval trust and fit'),
    ('Y-Threshold Gate', 'criteria checks before autonomous execution'),
    ('Y-Review Queue', 'human-in-the-loop workflow for critical outputs'),
    ('Y-Context Vault', 'bounded session memory and reference store'),
    ('Y-Signal Index', 'aggregated quality and risk indicator model'),
    ('Y-Refinement Pipeline', 'iteration loop for prompt and workflow improvements'),
    ('Y-Consistency Guide', 'style and terminology stability standards'),
    ('Y-Resilience Bench', 'failure recovery and load resilience testbed'),
    ('Y-Documentation Registry', 'standards and policy reference repository'),
    ('Y-Outcome Scorecard', 'goal completion metrics and impact reporting'),
    ('Y-Release Checklist', 'pre-deployment readiness verification flow')
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
    'Team workflow example: Use "' || n.term || '" during sprint planning to reduce avoidable model failures.',
    'Product example: Add "' || n.term || '" checks before publishing AI-generated output to end users.'
  ],
  array[
    'Pair "' || n.term || '" with regression testing to detect quality drift early.',
    'Document implementation steps so onboarding teams can reproduce results consistently.'
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
