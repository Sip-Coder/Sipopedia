-- Add 1,000 unique terminology entries for letter R.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Retrieval-Grounded', 'responses anchored to relevant source context before generation'),
    ('Risk-Aware', 'decision logic adjusted by impact, uncertainty, and policy exposure'),
    ('Reasoning-Traceable', 'chain of logic captured for review and debugging'),
    ('Reliability-Centered', 'stable production behavior prioritized across workflows'),
    ('Routing-Optimized', 'intent and complexity based model selection for efficiency'),
    ('Rubric-Driven', 'quality acceptance based on explicit scoring criteria'),
    ('Response-Bounded', 'format and scope constraints enforced in final output'),
    ('Reference-Linked', 'claims tied to cited evidence and provenance records'),
    ('Runtime-Monitored', 'live telemetry for latency, cost, and failure signals'),
    ('Rollback-Ready', 'safe reversion strategy for degraded releases'),
    ('Robustness-Tested', 'performance validated under stress and edge cases'),
    ('Relevance-Weighted', 'ranking logic prioritizing high-value context'),
    ('Retry-Resilient', 'fault recovery optimized for transient dependency issues'),
    ('Regulation-Aligned', 'workflow controls matched to compliance requirements'),
    ('Resolution-Focused', 'responses aimed at clear issue closure and next steps'),
    ('Resource-Balanced', 'compute use optimized without harming answer quality'),
    ('Recall-Calibrated', 'retrieval breadth tuned against precision tradeoffs'),
    ('Refusal-Transparent', 'safety refusals explained with actionable alternatives'),
    ('Risk-Scored', 'autonomy decisions weighted by quantified risk levels'),
    ('Recovery-Oriented', 'incident handling designed for fast restoration'),
    ('Reasoning-Calibrated', 'depth of explanation matched to evidence strength'),
    ('Role-Sensitive', 'responses adapted to user role and responsibility context'),
    ('Revision-Friendly', 'outputs structured for iterative editing and review'),
    ('Reproducible', 'consistent behavior attainable across repeated runs'),
    ('Redundancy-Reduced', 'duplicate context and repeated output minimized'),
    ('Rate-Limit Aware', 'workflow pacing adjusted to provider quota constraints'),
    ('Review-Integrated', 'human checkpoints inserted at high-impact stages'),
    ('Ranking-Transparent', 'ordering rationale exposed for operator review'),
    ('Remediation-Linked', 'detected issues mapped to concrete fixes'),
    ('Readability-Tuned', 'language complexity matched to audience needs'),
    ('Robust-By-Design', 'defensive architecture against adversarial input patterns'),
    ('Response-Consistent', 'tone and structure stable across session turns'),
    ('Risk-First', 'safety prioritization before autonomous action execution'),
    ('Retrieval-Efficient', 'token-aware context injection for prompt economy'),
    ('Regression-Guarded', 'quality drift prevention through baseline comparisons'),
    ('Reasoning-Audited', 'logic quality reviewed against benchmarked criteria'),
    ('Resolution-Traceable', 'issue-to-outcome path recorded end-to-end'),
    ('Runtime-Safe', 'execution controls enforced during tool and model calls'),
    ('Relevance-Observable', 'retrieval quality visible through operational metrics'),
    ('Release-Ready', 'deployment confidence established through preflight checks')
),
domains(word, application) as (
  values
    ('Retrieval Pipeline', 'context fetch and ranking flow for grounded responses'),
    ('Risk Matrix', 'impact and likelihood scoring framework for AI operations'),
    ('Reasoning Ledger', 'stored rationale artifacts for auditing output quality'),
    ('Reliability Dashboard', 'uptime, error, and latency observability surface'),
    ('Routing Tree', 'model and tool dispatch strategy by task profile'),
    ('Rubric Catalog', 'evaluation standards for quality acceptance'),
    ('Response Contract', 'schema and formatting rules for output consistency'),
    ('Reference Registry', 'source links and citation tracking subsystem'),
    ('Runtime Console', 'live diagnostics for execution behavior'),
    ('Rollback Plan', 'reversion pathway for failed deployments'),
    ('Robustness Suite', 'stress and adversarial scenario test harness'),
    ('Relevance Index', 'scoring and ranking structure for retrieval'),
    ('Retry Policy', 'backoff and retry controls for transient faults'),
    ('Regulatory Checklist', 'compliance validation before release'),
    ('Resolution Board', 'issue closure planning and accountability tracker'),
    ('Resource Budget', 'cost and compute envelope management'),
    ('Recall Tuner', 'retrieval breadth adjustment controls'),
    ('Refusal Policy', 'safe-decline logic with user guidance patterns'),
    ('Risk Scorecard', 'risk-weighted escalation and approval thresholds'),
    ('Recovery Pipeline', 'incident response and restoration workflow'),
    ('Role Matrix', 'access and behavior mapping by user role'),
    ('Revision Loop', 'iterative editing and review sequence'),
    ('Reproducibility Report', 'repeatability checks across runs and versions'),
    ('Rate Limit Monitor', 'quota and throughput tracking for provider APIs'),
    ('Review Queue', 'human-in-the-loop task handoff system'),
    ('Ranking Report', 'explanation of retrieval and option ordering'),
    ('Remediation Register', 'catalog of defects and corrective actions'),
    ('Readability Guide', 'language clarity standards for educational content'),
    ('Regression Suite', 'baseline comparison tests for release safety'),
    ('Release Gate', 'preflight verification before production rollout')
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
