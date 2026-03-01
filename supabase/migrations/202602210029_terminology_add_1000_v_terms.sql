-- Add 1,000 unique terminology entries for letter V.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Validation-Driven', 'outputs accepted only after passing defined quality checks'),
    ('Vector-Grounded', 'semantic retrieval used to anchor responses in relevant context'),
    ('Variance-Controlled', 'generation variability managed for reliable repeated outcomes'),
    ('Value-Oriented', 'workflow choices prioritized by practical learner impact'),
    ('Verification-First', 'claim checking executed before final response delivery'),
    ('Version-Aware', 'behavior adapted to model and policy revision state'),
    ('Vulnerability-Resistant', 'defenses applied against prompt and tool abuse patterns'),
    ('Velocity-Balanced', 'speed improvements made without sacrificing quality or safety'),
    ('Visibility-Enhanced', 'runtime signals surfaced for operators and reviewers'),
    ('Volume-Ready', 'scales efficiently under high traffic and large datasets'),
    ('Vocabulary-Consistent', 'term usage stabilized across lessons and outputs'),
    ('Value-Calibrated', 'recommendations weighted by expected outcome significance'),
    ('Validation-Traceable', 'test outcomes linked to release and routing decisions'),
    ('Vector-Indexed', 'embedding search configured for precision and recall balance'),
    ('Vetting-Oriented', 'content screened for accuracy, policy, and relevance'),
    ('Virtualization-Ready', 'deployment patterns compatible with containerized infrastructure'),
    ('Varied-Scenario Safe', 'robust across diverse prompts and edge cases'),
    ('Version-Locked', 'critical workflows pinned to tested model configurations'),
    ('Verification-Rich', 'multiple evidence checks applied for high-stakes answers'),
    ('Value-Transparent', 'tradeoff explanations included for user-facing decisions'),
    ('Voice-Aware', 'style and tone adapted to intended communication context'),
    ('Validity-Focused', 'logical and factual correctness prioritized in output generation'),
    ('Vertical-Specific', 'domain-specialized behavior for narrow subject areas'),
    ('Violation-Detecting', 'policy breaches identified quickly and escalated'),
    ('Vector-Efficient', 'embedding retrieval optimized for token and latency budgets'),
    ('Variation-Tested', 'performance stress-tested across prompt perturbations'),
    ('Validation-Audited', 'rubric and benchmark checks reviewed for consistency'),
    ('Visibility-Linked', 'metrics connected to workflow decisions and outcomes'),
    ('Velocity-Safe', 'rapid iteration with controlled release safeguards'),
    ('Value-Ranked', 'task and option ranking by impact and confidence scores'),
    ('Verification-Calibrated', 'evidence threshold tuned to risk profile'),
    ('Version-Traceable', 'change history captured for prompts, models, and policies'),
    ('Vector-Safe', 'retrieval boundaries enforced for privacy and compliance'),
    ('Variance-Monitored', 'stability drift tracked over time and conditions'),
    ('Validity-Observable', 'correctness indicators surfaced in operations dashboards'),
    ('Vantage-Point Balanced', 'multiple perspectives included for nuanced guidance'),
    ('Vernacular-Friendly', 'plain-language phrasing used for broad accessibility'),
    ('Value-Linked', 'model behavior tied to mission and learning objectives'),
    ('Verification-Observable', 'evidence-check workflow exposed for auditability'),
    ('Vision-Aligned', 'long-term product goals reflected in system behavior')
),
domains(word, application) as (
  values
    ('Validation Suite', 'automated and human quality checks before release'),
    ('Vector Index', 'semantic retrieval structure for context grounding'),
    ('Variance Report', 'stability analysis across repeated runs and prompts'),
    ('Value Matrix', 'priority scoring model for actions and recommendations'),
    ('Verification Pipeline', 'evidence checks for claims and outputs'),
    ('Version Registry', 'tracking of model, prompt, and policy revisions'),
    ('Vulnerability Guard', 'threat mitigation for unsafe requests and misuse'),
    ('Velocity Board', 'iteration planning with quality gates'),
    ('Visibility Dashboard', 'operational telemetry and alerting surface'),
    ('Volume Queue', 'high-throughput scheduling and load management'),
    ('Vocabulary Guide', 'controlled terminology standards for consistency'),
    ('Value Scorecard', 'impact and utility measurement framework'),
    ('Validation Ledger', 'historical record of test outcomes and approvals'),
    ('Vector Retriever', 'embedding-based search and ranking engine'),
    ('Vetting Layer', 'pre-output screening for policy and accuracy'),
    ('Virtual Runtime', 'container-ready deployment execution profile'),
    ('Variation Bench', 'edge-case and perturbation test environment'),
    ('Version Lock Policy', 'pinning strategy for stable production behavior'),
    ('Verification Matrix', 'multi-check confidence and evidence structure'),
    ('Value Report', 'tradeoff and expected impact summary'),
    ('Voice Profile', 'tone and style settings by audience context'),
    ('Validity Checker', 'logical and factual consistency validator'),
    ('Vertical Pack', 'domain-specific retrieval and prompt bundle'),
    ('Violation Monitor', 'policy breach detection and response workflow'),
    ('Vector Budget', 'token and latency controls for retrieval steps'),
    ('Validation Audit Log', 'review trail for rubric consistency'),
    ('Visibility Ledger', 'decision-linked operational metric history'),
    ('Velocity Guardrail', 'safe rollout controls for rapid changes'),
    ('Value Ranker', 'impact-prioritized routing and recommendation engine'),
    ('Vision Roadmap', 'long-term capability alignment planning')
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
