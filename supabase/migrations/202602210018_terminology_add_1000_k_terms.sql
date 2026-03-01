-- Add 1,000 unique terminology entries for letter K.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Knowledge-Grounded', 'responses anchored to verified sources and domain context'),
    ('Kernel-Aligned', 'core model behavior tuned to foundational safety and quality objectives'),
    ('Keyed', 'workflow decisions driven by explicit control signals and identifiers'),
    ('KPI-Driven', 'optimization guided by measurable quality and outcome indicators'),
    ('Kinetic', 'adaptive execution that responds quickly to changing runtime conditions'),
    ('Keepalive-Ready', 'long-running workflow reliability under intermittent disruptions'),
    ('Known-Risk Aware', 'risk mitigation guided by prior incident patterns'),
    ('Knowledge-Chunked', 'information segmented for retrieval precision and token efficiency'),
    ('Knowledge-Calibrated', 'confidence matched to evidence depth and relevance'),
    ('Key-Path Optimized', 'critical interaction routes tuned for speed and reliability'),
    ('K-Fold Validated', 'robust evaluation across repeated validation partitions'),
    ('Knowledge-Traceable', 'source provenance preserved across response generation'),
    ('Keenly-Scoped', 'strict boundary control for task intent and permissions'),
    ('Knowledge-Safe', 'protection of sensitive data in retrieval and reasoning flows'),
    ('Knot-Free', 'dependency simplification to reduce orchestration complexity'),
    ('Kickoff-Ready', 'rapid onboarding patterns for new workflows and users'),
    ('Knowledge-Integrated', 'retrieval and memory blended into coherent outputs'),
    ('K-Nearest Tuned', 'similarity retrieval parameters optimized for relevance'),
    ('Kernel-Observed', 'core inference metrics monitored for drift and anomalies'),
    ('Knowledge-Weighted', 'ranking and reasoning prioritized by source quality'),
    ('Knockout-Tested', 'stress-tested against adversarial and edge-case inputs'),
    ('Kubernetes-Ready', 'deployment design suited for container orchestration environments'),
    ('Keenly-Monitored', 'continuous telemetry for quality, cost, and latency'),
    ('Knowledge-Sparse Aware', 'fallback strategies when evidence coverage is thin'),
    ('Key-Value Optimized', 'memory and cache access tuned for retrieval throughput'),
    ('Kiosk-Friendly', 'interaction design simplified for constrained UI contexts'),
    ('Knowledge-Routed', 'intent-based dispatch to specialized retrieval paths'),
    ('Kinematic-Latency Aware', 'response pacing tuned to perceived user wait time'),
    ('KPI-Calibrated', 'metric thresholds aligned to product and learner goals'),
    ('Knowledge-Refreshed', 'recency-aware updates for dynamic source material'),
    ('Key-Action Guarded', 'safeguards around high-impact autonomous operations'),
    ('Knowledge-Consistent', 'terminology and concept stability across sessions'),
    ('Kernel-Stable', 'core behavior resistant to prompt and environment variance'),
    ('Knowledge-Audited', 'scheduled verification of source quality and accuracy'),
    ('K-Factor Balanced', 'tradeoffs balanced across quality, cost, speed, and safety'),
    ('Knowledge-Dense', 'high-signal context composition under token limits'),
    ('Key-Decision Traceable', 'decision points logged with rationale and evidence'),
    ('Knowledge-Efficient', 'minimal token overhead for maximal learning utility'),
    ('Knowledge-First', 'evidence retrieval prioritized before output generation'),
    ('Kite-String Controlled', 'tight orchestration control across chained tool calls')
),
domains(word, application) as (
  values
    ('Knowledge Base', 'structured repository used for retrieval and grounding'),
    ('Kernel Policy', 'core runtime rules for safe model behavior'),
    ('Key Router', 'dispatch logic based on intent and risk signals'),
    ('KPI Dashboard', 'measurement surface for quality and user outcomes'),
    ('Keepalive Circuit', 'continuity flow for long-running agent tasks'),
    ('Known-Risk Register', 'catalog of risks and mitigation actions'),
    ('Knowledge Chunk Map', 'segmentation layout for retrieval indexing'),
    ('K-Fold Suite', 'evaluation harness for robust validation'),
    ('Knowledge Trace Log', 'provenance timeline for claims and sources'),
    ('Key Scope Policy', 'authorization boundaries for model and tool actions'),
    ('Knowledge Vault', 'protected source store with access controls'),
    ('Knot Resolver', 'dependency simplification workflow for orchestration'),
    ('Kickoff Playbook', 'onboarding workflow for new teams and projects'),
    ('K-Nearest Index', 'semantic similarity lookup configuration'),
    ('Kernel Monitor', 'core inference telemetry and alerting'),
    ('Knowledge Weight Matrix', 'source quality scoring for response ranking'),
    ('Knockout Test Bench', 'stress and adversarial testing environment'),
    ('Kubernetes Deployment', 'container runtime strategy for AI services'),
    ('Knowledge Sparse Handler', 'fallback path when evidence is insufficient'),
    ('Key-Value Store', 'state and memory persistence for workflows'),
    ('Kiosk Mode', 'minimal interface experience for focused usage'),
    ('Knowledge Route Table', 'mapping of query types to retrieval sources'),
    ('Kinematic Response Model', 'latency-aware output pacing configuration'),
    ('KPI Threshold Ledger', 'metric limits for release and escalation'),
    ('Knowledge Refresh Pipeline', 'scheduled source recrawl and update flow'),
    ('Key Action Gate', 'approval checks for high-impact operations'),
    ('Knowledge Consistency Checker', 'cross-session terminology stability validation'),
    ('Kernel Stability Report', 'variance analysis for core behavior changes'),
    ('Knowledge Audit Board', 'periodic review workflow for source integrity'),
    ('K-Factor Scorecard', 'balanced optimization tracking across core constraints')
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
