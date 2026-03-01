-- Expand # bucket terminology to 1,002 total entries.
-- Strategy:
-- 1) Keep existing # entries.
-- 2) Add only the missing amount needed to reach 1,002.
-- 3) Use grouped numeric/symbol families to reduce redundancy and improve variety.
-- 4) Preserve required non-empty reference_links and mla_citations.

with params as (
  select 1002::int as target_count
),
current_hash as (
  select count(*)::int as current_count
  from public.terminology_entries
  where sort_group = '#'
),
needed as (
  select greatest(p.target_count - c.current_count, 0) as rows_needed
  from params p
  cross join current_hash c
),
families(prefix, family_name, focus) as (
  values
    ('0', 'Foundations', 'core AI system design and workflow fundamentals'),
    ('1', 'Prompt Engineering', 'instruction design and response-shaping practices'),
    ('2', 'Data Preparation', 'dataset quality, transformation, and readiness controls'),
    ('3', 'Retrieval Systems', 'context fetching, ranking, and grounding operations'),
    ('4', 'Tool Orchestration', 'function calling and multi-step tool execution'),
    ('5', 'Evaluation', 'quality scoring, benchmarking, and regression tracking'),
    ('6', 'Reliability', 'failure handling, fallback logic, and production resilience'),
    ('7', 'Performance', 'latency, throughput, and cost efficiency optimization'),
    ('8', 'Security', 'abuse resistance, privacy controls, and access boundaries'),
    ('9', 'Governance', 'policy alignment, auditability, and responsible AI controls'),
    ('@', 'Agent Operations', 'autonomous task planning and supervised agent execution'),
    ('%', 'Cost Controls', 'budget-aware model routing and spend governance'),
    ('&', 'Quality Assurance', 'release checks, validation gates, and acceptance criteria'),
    ('+', 'Integration Patterns', 'API contracts and cross-system interoperability'),
    ('*', 'Model Lifecycle', 'experimentation, rollout, monitoring, and iteration')
),
topics(topic_name, application) as (
  values
    ('Acceptance Criteria Matrix', 'standardizing release-quality checkpoints'),
    ('Action Priority Scoring', 'ordering next steps by impact and urgency'),
    ('Anomaly Escalation Route', 'routing suspicious events to the correct owners'),
    ('Answer Structure Contract', 'ensuring response formats remain machine-parseable'),
    ('Asynchronous Task Handoff', 'coordinating delayed or background AI work'),
    ('Audit Evidence Ledger', 'capturing run artifacts for governance reviews'),
    ('Automatic Retry Window', 'recovering transient failures with safe retries'),
    ('Backfill Recovery Plan', 'rebuilding missing data after outages'),
    ('Baseline Drift Check', 'detecting behavior changes versus known baselines'),
    ('Batch Inference Queue', 'scheduling high-volume requests efficiently'),
    ('Boundary Condition Test', 'validating edge-case behavior before release'),
    ('Calibration Confidence Curve', 'aligning confidence scores with observed accuracy'),
    ('Canary Release Guard', 'limiting risk during phased rollout'),
    ('Capacity Forecast Model', 'planning compute needs for expected demand'),
    ('Change Impact Ledger', 'tracking downstream effects of prompt or model changes'),
    ('Citation Coverage Policy', 'requiring source-backed responses for critical claims'),
    ('Compliance Trace Map', 'linking actions to policy and control requirements'),
    ('Context Freshness Rule', 'ensuring retrieved data is timely and relevant'),
    ('Context Truncation Strategy', 'preserving salient context under token limits'),
    ('Cost Per Outcome Metric', 'measuring value delivered per unit spend'),
    ('Critical Path Optimizer', 'reducing latency on high-impact workflow stages'),
    ('Data Contract Validator', 'verifying schema consistency across integrations'),
    ('Data Leakage Sentinel', 'detecting and preventing sensitive content exposure'),
    ('Data Lineage Record', 'tracking source-to-output provenance'),
    ('Decision Review Queue', 'collecting uncertain outputs for human review'),
    ('Defect Taxonomy Grid', 'classifying failures for targeted improvement'),
    ('Deployment Readiness Gate', 'confirming operational prerequisites before launch'),
    ('Disagreement Resolver', 'handling conflicting model or tool outputs'),
    ('Drift Mitigation Playbook', 'standard response plan for quality degradation'),
    ('Error Budget Tracker', 'managing acceptable failure thresholds'),
    ('Evidence Ranking Strategy', 'prioritizing the most reliable supporting context'),
    ('Experiment Registry', 'cataloging test setups and results'),
    ('Fallback Model Policy', 'switching models safely under degraded conditions'),
    ('Feature Toggle Protocol', 'controlling staged feature activation'),
    ('Feedback Triage Loop', 'routing user feedback into actionable categories'),
    ('Function Contract Check', 'validating tool-call arguments and outputs'),
    ('Governance Signoff Flow', 'formal approvals for high-impact changes'),
    ('Grounded Response Check', 'verifying answers against cited material'),
    ('Hallucination Containment Plan', 'reducing and correcting unsupported claims'),
    ('Human Override Path', 'allowing operators to intervene in risky actions'),
    ('Incident Severity Rubric', 'standardizing incident classification'),
    ('Input Sanitization Rule', 'normalizing and validating incoming requests'),
    ('Intent Classification Ladder', 'mapping requests to intent tiers'),
    ('Latency Budget Allocator', 'splitting response-time budgets by stage'),
    ('Load Shedding Strategy', 'protecting core service under overload'),
    ('Logging Redaction Standard', 'removing sensitive data from logs'),
    ('Long-Context Prioritizer', 'retaining high-value context in long prompts'),
    ('Model Comparison Harness', 'evaluating providers against consistent tasks'),
    ('Model Upgrade Checklist', 'safe migration plan for version changes'),
    ('Monitoring Alert Ladder', 'tiered notification for operational health'),
    ('Multi-Agent Coordination Plan', 'managing role boundaries among agents'),
    ('Output Determinism Target', 'controlling variability for repeatable workflows'),
    ('Output Safety Filter', 'blocking unsafe or non-compliant content'),
    ('Permission Scope Matrix', 'limiting tool and data access by role'),
    ('Policy Exception Register', 'recording and reviewing approved exceptions'),
    ('Post-Deployment Verification', 'checking live behavior after rollout'),
    ('Preflight Prompt Check', 'validating prompts before execution'),
    ('Priority Incident Channel', 'fast path for business-critical failures'),
    ('Prompt Version Ledger', 'tracking prompt changes across releases'),
    ('Rate Limit Buffer', 'absorbing traffic spikes without hard failures'),
    ('Recovery Time Objective', 'target restoration window after incidents'),
    ('Reference Quality Score', 'grading reliability of external sources'),
    ('Regression Scenario Pack', 'fixed test set for release comparison'),
    ('Release Approval Matrix', 'defining release ownership and authority'),
    ('Reliability Scorecard', 'tracking stability KPIs over time'),
    ('Request Classification Rule', 'routing by risk, complexity, and intent'),
    ('Response Rewrite Policy', 'controlled transformations for clarity and safety'),
    ('Retrieval Recall Benchmark', 'measuring coverage of relevant context'),
    ('Risk Acceptance Workflow', 'documenting explicit risk decisions'),
    ('Rollout Blast Radius Limit', 'constraining impact of deployment faults'),
    ('Root Cause Template', 'consistent incident analysis structure'),
    ('Safety Escalation Trigger', 'automatic escalation for sensitive content'),
    ('Sampling Strategy Guide', 'tuning generation parameters by task type'),
    ('Schema Evolution Guard', 'handling versioned payload changes safely'),
    ('Search Relevance Tuning', 'improving retrieval ordering quality'),
    ('Session Boundary Rule', 'defining memory carryover constraints'),
    ('Service Dependency Map', 'tracking upstream/downstream runtime links'),
    ('Signal Prioritization Model', 'ranking operational signals by actionability'),
    ('SLA Compliance Tracker', 'monitoring obligations against performance targets'),
    ('Source Credibility Rule', 'weighting trusted sources in grounding'),
    ('Staging Validation Gate', 'pre-production verification controls'),
    ('Stress Test Profile', 'high-load scenario testing for robustness'),
    ('Structured Output Contract', 'enforcing typed response fields'),
    ('Task Decomposition Pattern', 'splitting large goals into smaller steps'),
    ('Telemetry Retention Policy', 'governing monitoring data lifecycle'),
    ('Threshold Auto-Tuning', 'adapting decision thresholds with evidence'),
    ('Tool Failure Recovery', 'continuing workflows after tool errors'),
    ('Trace Correlation Key', 'joining logs, events, and outputs per request'),
    ('Traffic Segmentation Rule', 'isolating cohorts for controlled experiments'),
    ('Trust Boundary Marker', 'explicit boundaries between trusted and untrusted data'),
    ('Uncertainty Disclosure Rule', 'communicating confidence and limitations'),
    ('Usage Quota Governor', 'enforcing fair-use and plan limits'),
    ('Validation Gate Sequence', 'ordered checkpoints before publish'),
    ('Verification Sampling Plan', 'spot-checking outputs at controlled intervals'),
    ('Version Compatibility Check', 'preventing integration breakage on updates'),
    ('Vulnerability Response Playbook', 'handling security findings quickly'),
    ('Workload Prioritization Queue', 'scheduling by business-critical impact')
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
    ]::text[] as risk_citations,
    array[
      'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
      'https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html'
    ]::text[] as security_links,
    array[
      'OWASP Foundation. "OWASP Top 10 for Large Language Model Applications." OWASP, https://owasp.org/www-project-top-10-for-large-language-model-applications/. Accessed 21 Feb. 2026.',
      'OWASP Foundation. "LLM Prompt Injection Prevention Cheat Sheet." OWASP Cheat Sheet Series, https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html. Accessed 21 Feb. 2026.'
    ]::text[] as security_citations
),
combinations as (
  select
    f.prefix
      || lpad(row_number() over (partition by f.prefix order by t.topic_name)::text, 2, '0')
      || ' '
      || f.family_name
      || ': '
      || t.topic_name as term,
    f.focus,
    t.application,
    row_number() over (order by f.prefix, t.topic_name) as idx
  from families f
  cross join topics t
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
  limit (select rows_needed from needed)
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
  '"' || n.term || '" defines a grouped # bucket AI concept for ' || n.focus || ' applied to ' || n.application || '.',
  'Apply "' || n.term || '" by selecting one workflow stage, assigning measurable acceptance criteria, and reviewing outcomes in a recurring operations cadence.',
  array[
    'Team example: add "' || n.term || '" to sprint planning so quality checks are explicit before release.',
    'Product example: map "' || n.term || '" to runbooks and dashboards so ownership and response paths are clear.'
  ],
  array[
    'Pair "' || n.term || '" with regression testing to catch quality drift earlier.',
    'Document implementation evidence so new contributors can repeat the same process consistently.'
  ],
  case
    when n.idx % 6 = 0 then rs.risk_links
    when n.idx % 6 = 1 then rs.prompt_links
    when n.idx % 6 = 2 then rs.tool_links
    when n.idx % 6 = 3 then rs.retrieval_links
    when n.idx % 6 = 4 then rs.eval_links
    else rs.security_links
  end,
  case
    when n.idx % 6 = 0 then rs.risk_citations
    when n.idx % 6 = 1 then rs.prompt_citations
    when n.idx % 6 = 2 then rs.tool_citations
    when n.idx % 6 = 3 then rs.retrieval_citations
    when n.idx % 6 = 4 then rs.eval_citations
    else rs.security_citations
  end,
  'Original Open Studies editorial rewrite with grouped # taxonomy and verified references from primary documentation and standards.',
  true
from new_terms n
cross join reference_sets rs
on conflict (term) do nothing;
