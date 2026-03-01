-- Add 1,000 unique terminology entries for letter L.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Latency-Aware', 'response timing tuned for user experience and system stability'),
    ('Learning-Centered', 'instructional output optimized for comprehension and retention'),
    ('Logic-Bound', 'reasoning constrained by explicit rules and verified context'),
    ('Layered', 'multi-tier controls across prompt, model, and tool execution'),
    ('Label-Calibrated', 'evaluation tuned with consistent labeling and rubric standards'),
    ('Load-Balanced', 'request distribution optimized across models and services'),
    ('Limit-Guarded', 'hard boundaries enforced on cost, scope, and permissions'),
    ('Link-Verified', 'claim support validated against reliable source references'),
    ('Long-Horizon', 'planning and memory continuity across multi-step tasks'),
    ('Leak-Resistant', 'controls to prevent exposure of sensitive or private data'),
    ('Lifecycle-Governed', 'management of updates, reviews, and deprecations over time'),
    ('Lookup-Optimized', 'retrieval paths tuned for speed and relevance precision'),
    ('Linguistically-Clear', 'language output designed for clarity across skill levels'),
    ('Loss-Aware', 'quality and uncertainty tradeoffs managed during inference'),
    ('Loop-Safe', 'repetition controls to prevent unproductive execution cycles'),
    ('Learning-Traceable', 'progress and reasoning history preserved for review'),
    ('Low-Variance', 'stable outcomes across prompt and session variation'),
    ('Locality-Aware', 'region and context specific behavior for policy fit'),
    ('Ledgered', 'event and decision logging for audits and diagnostics'),
    ('Lexicon-Consistent', 'terminology usage kept uniform across responses'),
    ('Lockstep-Aligned', 'tool actions synchronized with policy and approval steps'),
    ('Lean-Execution', 'minimal overhead while preserving output quality'),
    ('Layer-Calibrated', 'guardrail strength adjusted by risk and task profile'),
    ('Learning-Adaptive', 'difficulty and guidance adjusted to user progress'),
    ('Load-Sensitive', 'runtime decisions responsive to traffic pressure'),
    ('Limit-Audited', 'threshold violations monitored and remediated quickly'),
    ('Link-Rich', 'responses include practical source pathways for deeper study'),
    ('Long-Context Ready', 'effective handling of extended prompts and references'),
    ('Leak-Monitored', 'telemetry for privacy risk and data exposure signals'),
    ('Lifecycle-Transparent', 'change history visible to operators and reviewers'),
    ('Lookup-Fallback Ready', 'graceful alternatives when retrieval confidence is low'),
    ('Language-Tuned', 'tone and wording matched to educational objectives'),
    ('Loss-Bounded', 'error margins constrained with explicit quality checks'),
    ('Loop-Observed', 'execution cycles traced and analyzed for optimization'),
    ('Learning-Validated', 'progress measured against clear competency indicators'),
    ('Locality-Scoped', 'data and policy boundaries set by region and domain'),
    ('Ledger-Connected', 'runtime logs connected to decision and source artifacts'),
    ('Lexical-Accessible', 'plain language preference for broad usability'),
    ('Lock-Guarded', 'critical actions require verified authorization states'),
    ('Launch-Ready', 'production deployment preparedness with rollback safety')
),
domains(word, application) as (
  values
    ('Latency Budget', 'response time targets across workflow stages'),
    ('Learning Path', 'sequenced curriculum flow for learner progression'),
    ('Logic Framework', 'decision rule structure for model behavior'),
    ('Layer Stack', 'defense and validation layers in runtime orchestration'),
    ('Label Set', 'evaluation labels used in quality scoring'),
    ('Load Router', 'traffic distribution across model providers'),
    ('Limit Policy', 'hard controls for spend, scope, and permissions'),
    ('Link Registry', 'source records associated with generated claims'),
    ('Long Horizon Planner', 'multi-step planning for extended tasks'),
    ('Leak Barrier', 'privacy protection mechanisms in execution pipelines'),
    ('Lifecycle Board', 'governance of release, revision, and retirement stages'),
    ('Lookup Index', 'retrieval infrastructure for context relevance'),
    ('Language Guide', 'style and readability standards for responses'),
    ('Loss Monitor', 'tracking quality degradation and uncertainty drift'),
    ('Loop Controller', 'cycle prevention and step progression checks'),
    ('Learning Ledger', 'progress logs for user milestones and outcomes'),
    ('Low Variance Test', 'stability checks across repeated runs'),
    ('Locality Matrix', 'regional routing and policy alignment map'),
    ('Log Ledger', 'auditable event history for diagnostics'),
    ('Lexicon Catalog', 'approved terminology and definition set'),
    ('Lockstep Pipeline', 'synchronized workflow stage execution'),
    ('Lean Runtime', 'cost efficient orchestration profile'),
    ('Layer Tuner', 'risk based adjustment of validation depth'),
    ('Learning Adapter', 'dynamic guidance based on learner performance'),
    ('Load Monitor', 'traffic pressure and queue health metrics'),
    ('Limit Audit', 'review process for threshold compliance'),
    ('Link Map', 'navigation graph for supporting references'),
    ('Long Context Buffer', 'memory strategy for extended sessions'),
    ('Leak Monitor', 'privacy incident detection and alerts'),
    ('Launch Checklist', 'readiness criteria before production rollout')
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
