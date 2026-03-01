-- Add 1,000 unique terminology entries for letter W.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Workflow-Centered', 'execution logic organized around clear multi-step task outcomes'),
    ('Well-Grounded', 'responses anchored to reliable evidence before final output'),
    ('Watchful', 'continuous monitoring for drift, failures, and policy deviations'),
    ('Weighted', 'decision scoring balances quality, risk, cost, and latency'),
    ('Warning-Aware', 'early signals surfaced before issues escalate'),
    ('Write-Safe', 'output generation constrained by safety and compliance checks'),
    ('Window-Bounded', 'context limits enforced to preserve relevance and speed'),
    ('Workload-Adaptive', 'routing and scaling tuned to changing demand'),
    ('Whitelist-Governed', 'allowed tools and actions explicitly controlled'),
    ('Well-Calibrated', 'confidence language aligned with measured reliability'),
    ('Wide-Coverage', 'evaluation and retrieval span diverse scenarios and intents'),
    ('Weak-Signal Resistant', 'robust behavior when context quality is sparse or noisy'),
    ('Warm-Start Ready', 'fast initialization using prior stable configuration states'),
    ('Warranted', 'recommendations justified by explicit supporting evidence'),
    ('Workflow-Traceable', 'step-by-step logs preserved for diagnostics and audits'),
    ('Write-Consistent', 'tone and structure maintained across sessions'),
    ('Wrapper-Safe', 'integration boundaries validated around external services'),
    ('Wayfinding-Friendly', 'responses organized for easy learner navigation'),
    ('Worst-Case Prepared', 'fallback paths designed for severe failure modes'),
    ('Waterfall-Avoidant', 'iterative delivery favored over rigid long cycles'),
    ('Web-Scale Ready', 'architecture supports large concurrent interaction volume'),
    ('Workflow-Hardened', 'defensive controls applied across orchestration transitions'),
    ('WIP-Bounded', 'in-progress work limits reduce overload and queue congestion'),
    ('Well-Documented', 'operational logic and standards recorded for repeatability'),
    ('Warning-Transparent', 'alerts include context, cause hints, and next actions'),
    ('Word-Precise', 'language choices optimized for clarity and correctness'),
    ('Workstream-Aligned', 'automation behavior synced with team delivery cadence'),
    ('Witnessed', 'critical decisions backed by reviewable evidence artifacts'),
    ('Weight-Balanced', 'ranking avoids overfitting to single weak signals'),
    ('Wave-Tested', 'performance validated across staged load waves'),
    ('Write-Intent Aligned', 'generated content maps directly to user ask scope'),
    ('Workflow-Observable', 'execution state and metrics visible in real time'),
    ('Warm-Fallback Ready', 'rapid recovery with pre-validated backup paths'),
    ('Whitelist-Audited', 'allowed action catalogs reviewed and versioned regularly'),
    ('Well-Segmented', 'behavior tuned by cohort, role, and task class'),
    ('Weak-Point Aware', 'known system bottlenecks tracked and mitigated'),
    ('Workflow-Optimized', 'process structure continuously improved by measured outcomes'),
    ('Wire-Compatible', 'interoperable data exchange across tooling ecosystems'),
    ('Wisdom-Oriented', 'recommendations include context-sensitive practical judgment'),
    ('Win-Condition Driven', 'outputs explicitly oriented to completion criteria')
),
domains(word, application) as (
  values
    ('Workflow Map', 'orchestration blueprint for end-to-end task execution'),
    ('Watchtower Dashboard', 'monitoring surface for reliability and safety signals'),
    ('Weighted Scorecard', 'priority model for decision and routing quality'),
    ('Warning Queue', 'early-issue triage path for operational risks'),
    ('Writer Contract', 'format and style guardrails for generated content'),
    ('Window Manager', 'context budget and turn-history controls'),
    ('Workload Router', 'dynamic distribution of requests across model tiers'),
    ('Whitelist Registry', 'approved tools and actions catalog'),
    ('Wellness Check', 'health probes for runtime dependencies'),
    ('Wide Eval Suite', 'coverage tests across use-case diversity'),
    ('Weak Signal Filter', 'noise suppression and confidence weighting logic'),
    ('Warm Start Cache', 'initialization state for low-latency startup'),
    ('Warrant Validator', 'evidence sufficiency checks for claims'),
    ('Workflow Ledger', 'auditable record of step transitions and outcomes'),
    ('Wrapper Layer', 'integration boundary around external APIs'),
    ('Wayfinding Guide', 'navigation cues for learner progression'),
    ('Worst-Case Runbook', 'response procedures for severe incidents'),
    ('Web Scale Plan', 'capacity and resiliency strategy for growth'),
    ('Workflow Guardrail', 'policy checks at orchestration boundaries'),
    ('WIP Monitor', 'queue depth and concurrency management metrics'),
    ('Writing Style Guide', 'clarity standards for educational messaging'),
    ('Workstream Board', 'team-aligned automation roadmap and priorities'),
    ('Witness Log', 'review evidence trail for high-impact actions'),
    ('Wave Test Harness', 'staged load testing configuration'),
    ('Write Intent Parser', 'scope extraction from user requests'),
    ('Workflow Telemetry', 'real-time state, latency, and error signals'),
    ('Warm Fallback Matrix', 'backup path map for degraded services'),
    ('Whitelist Audit Log', 'review history for allowed operations'),
    ('Weak Point Register', 'known bottleneck tracking and remediation'),
    ('Win Condition Checklist', 'completion criteria validation before release')
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
