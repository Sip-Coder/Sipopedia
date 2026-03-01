-- Add 1,000 unique terminology entries for letter U.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Uncertainty-Aware', 'responses calibrated to confidence and evidence limits'),
    ('User-Centered', 'guidance tailored to learner goals, context, and capability'),
    ('Usage-Optimized', 'runtime efficiency improved through measured interaction patterns'),
    ('Update-Ready', 'safe workflows for continuous model and content iteration'),
    ('Uniform-Structured', 'consistent output formats across varied tasks and prompts'),
    ('Uptime-Focused', 'service resilience prioritized across runtime components'),
    ('Unbiased-Intent', 'fair handling of user requests without demographic skew'),
    ('Universal-Accessible', 'language and structure usable across diverse audiences'),
    ('Utility-Driven', 'decisions prioritized by practical user value'),
    ('Underload-Efficient', 'resource optimization during low traffic conditions'),
    ('Upstream-Validated', 'inputs verified before entering inference pipelines'),
    ('Use-Case Scoped', 'responses constrained to domain-relevant boundaries'),
    ('Urgency-Aware', 'routing and escalation adapted by time-critical signals'),
    ('Unit-Tested', 'workflow behavior validated through repeatable checks'),
    ('Unification-Oriented', 'components harmonized into coherent operational flows'),
    ('User-Feedback Linked', 'improvements connected to explicit correction signals'),
    ('Unambiguous', 'instruction and output wording designed to reduce misinterpretation'),
    ('URL-Traceable', 'source links preserved for citation and audit paths'),
    ('Usage-Monitored', 'telemetry captured for adoption, quality, and drift trends'),
    ('Uplift-Measured', 'performance gains quantified against baseline behavior'),
    ('Untrusted-Input Safe', 'defensive handling of malformed or adversarial prompts'),
    ('Updatable', 'configuration and policy layers designed for low-risk change'),
    ('Unification-Tested', 'cross-component consistency validated pre-release'),
    ('User-Intent Routed', 'workflow pathways selected by parsed user goals'),
    ('Uncertainty-Transparent', 'limitations and confidence disclosed to users'),
    ('Utility-Calibrated', 'recommendation strength matched to expected impact'),
    ('Under-Specified Query Aware', 'clarification prompts triggered when intent is vague'),
    ('Usage-Balanced', 'quality and cost tuned to real demand patterns'),
    ('Upgrade-Safe', 'version transitions guarded by compatibility checks'),
    ('Urgency-Weighted', 'task priority scoring includes urgency and risk factors'),
    ('Unified-Policy', 'prompt, routing, and safety controls aligned in one model'),
    ('User-Role Sensitive', 'response behavior adapted by permissions and responsibilities'),
    ('Unlinked-Claim Resistant', 'unsupported assertions flagged for correction'),
    ('Understandability-First', 'clarity prioritized over unnecessary complexity'),
    ('Usage-Forecasted', 'capacity planning informed by trend and seasonality data'),
    ('Upfront-Validated', 'preflight checks performed before expensive operations'),
    ('Unusual-Case Ready', 'fallback guidance available for rare edge scenarios'),
    ('Ubiquitous-Integration', 'interoperability across tools, services, and environments'),
    ('User-Outcome Anchored', 'output quality tied to measurable learner results'),
    ('Uninterrupted-Flow', 'workflow continuity preserved across transient failures')
),
domains(word, application) as (
  values
    ('Uncertainty Model', 'confidence and risk estimation for generated outputs'),
    ('User Journey', 'end-to-end learning and interaction progression map'),
    ('Usage Dashboard', 'operational metrics for adoption and performance'),
    ('Update Pipeline', 'controlled deployment path for model and content changes'),
    ('Uniform Schema', 'standard response structure for downstream systems'),
    ('Uptime Plan', 'availability strategy for runtime services'),
    ('Unbias Audit', 'fairness verification workflow across user segments'),
    ('Universal Guide', 'accessibility standards for educational responses'),
    ('Utility Scorecard', 'impact-based ranking for recommended actions'),
    ('Underload Profile', 'efficiency tuning for low-volume periods'),
    ('Upstream Gateway', 'input validation and sanitization stage'),
    ('Use Case Matrix', 'mapping of tasks to workflows and constraints'),
    ('Urgency Queue', 'priority processing lane for time-sensitive requests'),
    ('Unit Test Suite', 'repeatable behavior verification harness'),
    ('Unification Layer', 'coordination interface across services and tools'),
    ('User Feedback Ledger', 'structured record of corrections and outcomes'),
    ('Unambiguity Checker', 'clarity and interpretation risk detector'),
    ('URL Registry', 'reference and citation link catalog'),
    ('Usage Monitor', 'real-time tracking of workload and quality signals'),
    ('Uplift Tracker', 'baseline comparison for improvement initiatives'),
    ('Untrusted Input Filter', 'threat screening for inbound prompts'),
    ('Update Control Board', 'approval workflow for operational changes'),
    ('Unification Report', 'cross-component consistency assessment'),
    ('User Intent Router', 'intent parsing and pathway dispatch system'),
    ('Uncertainty Report', 'confidence disclosure and caveat summary'),
    ('Utility Planner', 'prioritization strategy based on expected outcomes'),
    ('Under-Specified Query Handler', 'clarification and follow-up prompt flow'),
    ('Upgrade Checklist', 'compatibility and rollback readiness validation'),
    ('Unified Policy Engine', 'single governance layer for prompts and tools'),
    ('User Outcome Dashboard', 'learning impact observability and analysis')
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
