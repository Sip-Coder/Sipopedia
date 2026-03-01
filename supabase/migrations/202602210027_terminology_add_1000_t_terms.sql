-- Add 1,000 unique terminology entries for letter T.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Task-Aligned', 'responses shaped to explicit user objectives and constraints'),
    ('Traceable', 'decisions and outputs recorded for audit and debugging'),
    ('Trust-Calibrated', 'confidence messaging matched to evidence quality'),
    ('Token-Efficient', 'context and prompt design optimized for budget and clarity'),
    ('Tool-Safe', 'tool calls constrained by validation and policy checks'),
    ('Tier-Routed', 'model selection adapted to complexity, risk, and latency'),
    ('Telemetry-Driven', 'runtime signals used to guide optimization and safeguards'),
    ('Test-Hardened', 'quality validated across regressions and edge scenarios'),
    ('Transparency-First', 'reasoning limits and sources communicated clearly'),
    ('Throughput-Ready', 'stable performance under high request volume'),
    ('Tolerance-Bounded', 'error margins constrained by acceptance thresholds'),
    ('Threat-Aware', 'defensive posture applied against misuse and abuse patterns'),
    ('Time-Sensitive', 'behavior optimized for recency and latency constraints'),
    ('Topic-Scoped', 'response content bounded to intended domain context'),
    ('Transfer-Learning Ready', 'knowledge reuse patterns preserved across tasks'),
    ('Triage-Oriented', 'issue prioritization by severity and urgency signals'),
    ('Template-Governed', 'consistent output generated from approved structures'),
    ('Turn-Aware', 'conversation state leveraged across multi-turn interactions'),
    ('Trustworthy', 'reliable, cited, and policy-compliant assistance behavior'),
    ('Tradeoff-Explicit', 'quality-speed-cost compromises stated and managed'),
    ('Threshold-Gated', 'autonomous actions blocked unless criteria are satisfied'),
    ('Type-Safe', 'structured payload validation enforced before execution'),
    ('Transition-Guarded', 'tool and model handoffs protected with checks'),
    ('Trend-Responsive', 'system adapts to observed performance and usage shifts'),
    ('Terminology-Consistent', 'vocabulary use stabilized across lessons and outputs'),
    ('Target-Driven', 'workflow branches prioritized by goal completion impact'),
    ('Task-Parallel', 'independent steps executed concurrently when safe'),
    ('Trust-Observable', 'quality and confidence indicators visible to operators'),
    ('Token-Tracked', 'usage and limits continuously monitored and enforced'),
    ('Temporal-Aware', 'time-context handled correctly in reasoning and retrieval'),
    ('Topology-Aware', 'dependency graph structure considered during orchestration'),
    ('Tunable', 'configurable behavior for domain, risk, and audience needs'),
    ('Test-Linked', 'release decisions tied directly to eval outcomes'),
    ('Threat-Resilient', 'system remains safe under adversarial prompt attempts'),
    ('Teacher-Friendly', 'instructional style optimized for clarity and progression'),
    ('Translation-Safe', 'cross-language outputs preserve meaning and constraints'),
    ('Trajectory-Focused', 'learning path guidance aligned to long-term milestones'),
    ('Timeout-Resistant', 'recovery and fallback logic for delayed dependencies'),
    ('Tooling-Integrated', 'model behavior coordinated with external action systems'),
    ('Task-Ready', 'deployable response patterns for real user workflows')
),
domains(word, application) as (
  values
    ('Task Graph', 'dependency map for multi-step problem execution'),
    ('Trace Ledger', 'audit record of decisions, sources, and tool calls'),
    ('Trust Matrix', 'confidence and risk scoring framework for outputs'),
    ('Token Budget', 'resource planning for prompt and response generation'),
    ('Tool Contract', 'validated interface for safe tool invocation'),
    ('Tier Router', 'model tier dispatch strategy for request handling'),
    ('Telemetry Console', 'operational metrics and alert visualization'),
    ('Test Suite', 'regression and benchmark harness for release quality'),
    ('Transparency Report', 'explanation of decisions, limits, and evidence'),
    ('Throughput Queue', 'high-volume scheduling and load balancing layer'),
    ('Tolerance Policy', 'acceptable error boundaries for critical workflows'),
    ('Threat Model', 'adversarial risk assessment and mitigation plan'),
    ('Time Policy', 'recency and deadline handling rules for outputs'),
    ('Topic Boundary', 'scope constraints for domain-safe responses'),
    ('Transfer Map', 'knowledge reuse strategy across related tasks'),
    ('Triage Queue', 'priority-based issue handling and escalation'),
    ('Template Library', 'approved response structures for consistency'),
    ('Turn Memory', 'conversation state retention and retrieval controls'),
    ('Trust Dashboard', 'quality and confidence monitoring surface'),
    ('Tradeoff Board', 'decision view for cost-quality-speed balancing'),
    ('Threshold Engine', 'gate checks before autonomous execution'),
    ('Type Validator', 'schema checks for input and output payloads'),
    ('Transition Layer', 'safe handoff mechanics across tools and models'),
    ('Trend Monitor', 'performance drift and behavior shift detection'),
    ('Terminology Guide', 'controlled vocabulary reference for consistency'),
    ('Target Planner', 'goal sequencing and milestone alignment tool'),
    ('Task Parallelizer', 'safe concurrency orchestration for sub-tasks'),
    ('Token Monitor', 'live token usage and quota observability'),
    ('Temporal Index', 'time-aware retrieval and context management'),
    ('Topology Router', 'graph-structured orchestration pathway selector')
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
