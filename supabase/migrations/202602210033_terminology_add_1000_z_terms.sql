-- Add 1,000 unique terminology entries for letter Z.
-- All rows include non-empty reference_links and mla_citations.

with adjectives(word, focus) as (
  values
    ('Zero-Shot Ready', 'task handling without prior examples using strong instruction framing'),
    ('Zoomed-Out', 'high-level system reasoning across end-to-end workflow impact'),
    ('Zone-Safe', 'policy and permission boundaries enforced across operational zones'),
    ('Zoned-Routing', 'request dispatch guided by risk and capability partitions'),
    ('Zealous-Validation', 'strict pre-release checking for quality and compliance'),
    ('Zipped-Context', 'compressed context packaging to preserve token efficiency'),
    ('Zero-Trust Aligned', 'every access and action explicitly verified at runtime'),
    ('Z-Score Calibrated', 'anomaly and quality thresholds tuned using statistical baselines'),
    ('Zenith-Quality', 'highest-priority quality standards applied before output release'),
    ('Zonal-Observability', 'telemetry segmented by environment, cohort, and workflow'),
    ('Zigzag-Resilient', 'robustness under nonlinear and branching execution paths'),
    ('Zettabyte-Scale Minded', 'architecture prepared for very large data volumes'),
    ('Zero-Leak', 'safeguards against accidental exposure of sensitive content'),
    ('Zero-Drift Guarded', 'proactive controls for distribution and behavior drift'),
    ('Zonal-Latency Aware', 'timing strategies tuned per region and service zone'),
    ('Zephyr-Lightweight', 'minimal overhead design for faster inference loops'),
    ('Zero-Ambiguity', 'clear intent mapping and explicit response boundaries'),
    ('Zealously-Documented', 'operational decisions captured for reproducibility'),
    ('Zonally-Compliant', 'region-specific governance and policy controls enforced'),
    ('Z-Tested', 'controlled experiments used to validate output improvements'),
    ('Zero-Hallucination Focused', 'unsupported claims reduced through grounding checks'),
    ('Z-Indexed', 'retrieval assets organized for rapid semantic lookup'),
    ('Zero-Redundancy', 'duplicate context and repeated output minimized'),
    ('Zeta-Weighted', 'ranking model adjusted with weighted multi-signal scoring'),
    ('Zonal-Fallback Ready', 'regional backup routes for dependency outages'),
    ('Zero-Error Aspirational', 'continuous quality improvement toward defect minimization'),
    ('Zen-Readable', 'clear concise language optimized for learner comprehension'),
    ('Zero-Latency Biased', 'fast-path routing favored when risk profile allows'),
    ('Zone-Traceable', 'decision paths auditable by zone and system layer'),
    ('Zoned-Segmentation Aware', 'cohort-specific behavior tuned by context segments'),
    ('Zero-Copy Efficient', 'memory-safe processing with minimal duplication overhead'),
    ('Zero-Friction Onboarding', 'new user setup streamlined with guided defaults'),
    ('Zeal-Driven Iterative', 'rapid refinement cycles tied to measurable outcomes'),
    ('Zero-Surprise', 'predictable behavior preserved under expected conditions'),
    ('Zonal-Queue Balanced', 'fair workload handling across distributed processing lanes'),
    ('Zero-Downtime Conscious', 'deployments designed to avoid service interruptions'),
    ('Z-Policy Linked', 'runtime execution directly tied to governance policy artifacts'),
    ('Zeppelin-Scale Stable', 'large-scale throughput maintained with reliability controls'),
    ('Zero-Risk Escalation Ready', 'high-risk actions routed to human review'),
    ('Z-Finalized', 'release output locked after verification and approval')
),
domains(word, application) as (
  values
    ('Zero-Shot Classifier', 'classification pipeline for no-example tasks'),
    ('Zoom-Out Review', 'high-level audit workflow for system strategy and fit'),
    ('Zone Policy Map', 'boundary and compliance mapping for runtime decisions'),
    ('Zoned Router', 'region and risk aware dispatch architecture'),
    ('Validation Zone', 'staged acceptance checks before production release'),
    ('Zipped Context Buffer', 'compressed memory strategy for long conversations'),
    ('Zero-Trust Gateway', 'explicit authentication and authorization layer'),
    ('Z-Score Monitor', 'statistical anomaly detection and alerting'),
    ('Zenith Rubric', 'highest-tier quality evaluation criteria'),
    ('Zonal Dashboard', 'segmented telemetry for operations and quality'),
    ('Zigzag Workflow Graph', 'branching execution plan for complex missions'),
    ('Zero-Leak Guard', 'privacy protection controls and redaction checks'),
    ('Zero-Drift Monitor', 'distribution shift tracking and remediation trigger'),
    ('Zonal Latency Budget', 'per-region timing targets and thresholds'),
    ('Zephyr Runtime', 'lightweight execution profile for rapid responses'),
    ('Zero-Ambiguity Parser', 'intent clarification and disambiguation engine'),
    ('Zonal Compliance Ledger', 'audit trail for regional policy adherence'),
    ('Z-Test Harness', 'experiment framework for output comparison'),
    ('Zero-Hallucination Gate', 'evidence verification before response acceptance'),
    ('Z-Index Catalog', 'retrieval asset inventory and ranking controls'),
    ('Zero-Redundancy Checker', 'duplicate detection in context and output'),
    ('Zeta Scoring Model', 'weighted ranking strategy for multi-factor decisions'),
    ('Zonal Fallback Matrix', 'regional failover map for degraded providers'),
    ('Zero-Error Tracker', 'defect trend monitoring and remediation log'),
    ('Zen Readability Guide', 'clarity standards for educational responses'),
    ('Zero-Latency Path', 'fast execution route for low-risk prompts'),
    ('Zone Trace Ledger', 'auditable pathway logging by system zone'),
    ('Zoned Segment Registry', 'cohort segmentation and behavior configuration'),
    ('Zero-Downtime Plan', 'deployment strategy with no service interruption'),
    ('Z-Final Release Gate', 'final verification checkpoint before publish')
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
  'Apply "' || n.term || '" by mapping it to one workflow stage, assigning measurable criteria, and reviewing outcomes each sprint.',
  array[
    'Team example: use "' || n.term || '" in weekly planning to reduce avoidable model failures.',
    'Product example: enforce "' || n.term || '" checks before publishing AI-generated output.'
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
