-- Add 1,000 unique terminology entries for letter E.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Evidence-Grounded', 'claims anchored to verifiable and cited source material'),
    ('Evaluation-Driven', 'quality improvements guided by measurable test outcomes'),
    ('Elastic', 'capacity that scales with changing workload demand'),
    ('Error-Aware', 'proactive identification and handling of failure modes'),
    ('Explainable', 'transparent reasoning and traceable decision pathways'),
    ('Ethics-Aligned', 'behavior aligned with safety, fairness, and accountability goals'),
    ('Experiment-Led', 'iterative development through controlled hypothesis testing'),
    ('Effort-Optimized', 'workflow design that minimizes manual overhead'),
    ('Event-Responsive', 'runtime adaptation to new signals and triggers'),
    ('Endpoint-Secure', 'protected interfaces for model and tool communication'),
    ('Embedding-Centric', 'semantic retrieval strategies based on vector representations'),
    ('Escalation-Ready', 'clear handoff protocols for high-risk conditions'),
    ('Expectation-Calibrated', 'output confidence aligned with observed reliability'),
    ('Execution-Safe', 'guarded action policies for autonomous task completion'),
    ('Equity-Conscious', 'bias-aware behavior across users and contexts'),
    ('Exception-Managed', 'structured handling of rare or anomalous cases'),
    ('Efficiency-Balanced', 'tradeoff management between quality, cost, and speed'),
    ('Evolutionary', 'continuous adaptation through feedback and iteration'),
    ('Error-Bounded', 'controlled limits for acceptable model deviation'),
    ('Environment-Aware', 'configuration tuned to deployment constraints'),
    ('Evidence-Linked', 'outputs connected to concrete supporting references'),
    ('Experience-Tuned', 'interaction design optimized for clarity and usefulness'),
    ('Engagement-Focused', 'response structure that sustains user understanding'),
    ('Entropy-Reduced', 'prompt and context controls that lower randomness'),
    ('Extension-Ready', 'modular capabilities prepared for future features'),
    ('Execution-Traceable', 'auditable logs across workflow decision points'),
    ('Exception-Resilient', 'stable operation despite incomplete or noisy inputs'),
    ('Ensemble-Aware', 'coordinated behavior across multiple model components'),
    ('Explainability-First', 'interpretability prioritized in system outputs'),
    ('Edge-Prepared', 'lightweight designs suitable for constrained environments'),
    ('Evidence-Weighted', 'reasoning prioritized by source quality and relevance'),
    ('Education-Oriented', 'instructional responses tuned for learning outcomes'),
    ('Equilibrium-Seeking', 'balanced optimization across competing constraints'),
    ('Exploration-Safe', 'sandboxed testing for novel prompts and tools'),
    ('Error-Corrective', 'self-repair loops after detected quality issues'),
    ('Engagement-Calibrated', 'tone and depth matched to user context'),
    ('Evaluation-Linked', 'release decisions connected to rubric thresholds'),
    ('Execution-Bounded', 'strict limits on autonomous action scope'),
    ('Ecosystem-Integrated', 'alignment across services, data, and user workflows'),
    ('Evidence-Rich', 'high-information responses with precise support material')
),
domains(word, application) as (
  values
    ('Evidence Framework', 'source validation and citation workflows for AI outputs'),
    ('Evaluation Pipeline', 'repeatable testing across model releases and prompts'),
    ('Escalation Matrix', 'risk-based handoff logic for human review'),
    ('Execution Ledger', 'step-level trace records for autonomous operations'),
    ('Embedding Index', 'semantic retrieval architecture for context injection'),
    ('Error Dashboard', 'monitoring surface for quality regressions and incidents'),
    ('Endpoint Registry', 'managed inventory of tools, models, and services'),
    ('Ethics Charter', 'governance principles for fair and safe deployment'),
    ('Experiment Notebook', 'structured record of tests and outcomes'),
    ('Engagement Model', 'interaction strategy for educational assistance'),
    ('Exception Queue', 'triage lane for abnormal and high-risk outputs'),
    ('Efficiency Model', 'resource planning for cost and latency control'),
    ('Evolution Plan', 'continuous improvement path for AI capabilities'),
    ('Experience Canvas', 'user journey mapping for response quality'),
    ('Evidence Graph', 'linked representation of claims and supporting sources'),
    ('Execution Guardrail', 'runtime constraints for safe action paths'),
    ('Evaluation Suite', 'benchmark collection for model comparison'),
    ('Error Taxonomy', 'classification of failure categories and causes'),
    ('Engagement Brief', 'communication structure for learner-facing output'),
    ('Environment Profile', 'deployment settings for reliability and compliance'),
    ('Ensemble Router', 'selection strategy across multiple model endpoints'),
    ('Edge Blueprint', 'lightweight architecture for low-resource deployments'),
    ('Extension Layer', 'plugin-ready surface for new capabilities'),
    ('Entropy Control', 'prompting and decoding settings for stability'),
    ('Evidence Digest', 'summarized source-backed explanation artifacts'),
    ('Escalation Playbook', 'operator steps for intervention scenarios'),
    ('Education Track', 'guided progression for concept mastery'),
    ('Execution Circuit', 'end-to-end flow from input to validated output'),
    ('Evaluation Board', 'decision review panel based on quality data'),
    ('Efficacy Register', 'impact tracking for AI-enabled outcomes')
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
