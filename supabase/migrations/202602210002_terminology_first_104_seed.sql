-- First 104-term batch for Open Studies terminology.
-- Composition:
-- - 52 letter terms: exactly 2 terms for each letter A-Z.
-- - 52 number-prefixed terms for the # bucket (00-25, two terms each).
--
-- All definitions below are original rewrites designed for Open Studies.

with letter_terms(term, focus) as (
  values
    ('Alignment Scorecard', 'measuring whether AI output matches user intent and policy goals'),
    ('Agent Handoff Protocol', 'safe transfer of unresolved AI tasks to human operators'),
    ('Bias Mitigation Matrix', 'systematic reduction of unfair outcomes in model outputs'),
    ('Batch Prompting', 'processing grouped prompts efficiently while preserving quality'),
    ('Context Compression', 'retaining critical context while reducing token usage'),
    ('Confidence Calibration', 'aligning stated model confidence with actual accuracy'),
    ('Data Drift Watchlist', 'tracking data distribution changes that impact model behavior'),
    ('Decision Trace', 'recording why an AI system produced a specific output'),
    ('Embedding Retrieval', 'matching semantic similarity for context lookup'),
    ('Evaluation Harness', 'repeatable testing setup for model quality and regressions'),
    ('Few-Shot Blueprint', 'example-guided prompting patterns for stable outputs'),
    ('Failure Taxonomy', 'structured categories of model errors and failure modes'),
    ('Grounding Pipeline', 'workflow that links output claims to source evidence'),
    ('Guardrail Policy', 'rules that constrain harmful or out-of-scope responses'),
    ('Hallucination Recovery', 'correcting unsupported output with verified evidence'),
    ('Human Review Loop', 'human-in-the-loop checkpoints for high-risk decisions'),
    ('Inference Budget', 'planned token and latency limits per request'),
    ('Intent Router', 'classification logic that routes requests to the best workflow'),
    ('Judgment Threshold', 'minimum confidence required before autonomous action'),
    ('Journey Metrics', 'end-to-end user metrics across AI-assisted tasks'),
    ('Knowledge Chunking', 'splitting large sources into retrieval-ready units'),
    ('Key Prompt Variables', 'controlled prompt fields that drive output behavior'),
    ('Latency Budget', 'target response-time envelope for each stage of processing'),
    ('Logit Steering', 'influencing generation tendencies through token-level controls'),
    ('Model Routing Tree', 'tiered decision logic for selecting model providers'),
    ('Memory Boundary', 'rules for what context can persist across sessions'),
    ('Noise Filtering', 'removing irrelevant context before model inference'),
    ('Narrative Consistency Check', 'verifying stable tone, facts, and structure across outputs'),
    ('Observability Dashboard', 'operational view of quality, cost, and reliability signals'),
    ('Output Schema', 'required structure for machine-parseable responses'),
    ('Prompt Contract', 'explicit prompt agreement on scope, format, and constraints'),
    ('Policy Escalation', 'automatic handoff when requests exceed safe autonomy limits'),
    ('Quality Rubric', 'scoring criteria for evaluating answer usefulness and correctness'),
    ('Query Expansion', 'rewriting user queries to improve retrieval relevance'),
    ('Retrieval Validator', 'checks that retrieved context is relevant and trustworthy'),
    ('Risk Register', 'catalog of product and model risks with mitigations'),
    ('Safety Sandbox', 'isolated environment for testing sensitive prompt behavior'),
    ('System Prompt Governance', 'change management for high-impact global instructions'),
    ('Token Ledger', 'tracking token usage for cost and performance analysis'),
    ('Tool Invocation Contract', 'validated argument rules for model-triggered tools'),
    ('Uncertainty Disclosure', 'transparent communication of model limitations'),
    ('User Correction Loop', 'workflow for feedback-based output refinement'),
    ('Vector Index Tuning', 'optimization of vector retrieval performance and relevance'),
    ('Verification Chain', 'multi-step validation before accepting model output'),
    ('Workflow Orchestration', 'coordinating multi-step AI and tool operations'),
    ('Weighted Scoring Model', 'decision scoring framework with prioritized criteria'),
    ('X-Factor Prompt Test', 'stress test for prompt resilience under unusual inputs'),
    ('XML Response Schema', 'structured XML format for deterministic downstream parsing'),
    ('Yield Optimization', 'improving quality outcome per token and per second'),
    ('Your-Data Boundary', 'privacy limits for personal and proprietary data use'),
    ('Zero-Shot Classifier', 'classification without task-specific training examples'),
    ('Zoom-Out Review', 'high-level audit of model strategy and system fit')
),
number_terms(term, focus) as (
  select
    lpad(n::text, 2, '0') || ' Signal Mapping',
    'extracting reliable signal patterns from noisy AI interactions'
  from generate_series(0, 25) as n
  union all
  select
    lpad(n::text, 2, '0') || ' Prompt Audit',
    'performing structured prompt quality checks before deployment'
  from generate_series(0, 25) as n
),
seed_terms as (
  select term, focus from letter_terms
  union all
  select term, focus from number_terms
),
reference_sets as (
  select
    array[
      'https://platform.openai.com/docs/guides/prompting',
      'https://docs.anthropic.com/en/docs/prompt-engineering'
    ]::text[] as prompt_links,
    array[
      'OpenAI. "Prompting." OpenAI API Documentation, https://platform.openai.com/docs/guides/prompting. Accessed 21 Feb. 2026.',
      'Anthropic. "Prompt Engineering Overview." Anthropic Docs, https://docs.anthropic.com/en/docs/prompt-engineering. Accessed 21 Feb. 2026.'
    ]::text[] as prompt_citations,
    array[
      'https://platform.openai.com/docs/guides/function-calling/how-do-i-ensure-the-model-calls-the-correct-function',
      'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use'
    ]::text[] as tool_links,
    array[
      'OpenAI. "Function Calling." OpenAI API Documentation, https://platform.openai.com/docs/guides/function-calling/how-do-i-ensure-the-model-calls-the-correct-function. Accessed 21 Feb. 2026.',
      'Anthropic. "How to Implement Tool Use." Anthropic Docs, https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/implement-tool-use. Accessed 21 Feb. 2026.'
    ]::text[] as tool_citations,
    array[
      'https://platform.openai.com/docs/guides/embeddings/english-only',
      'https://platform.openai.com/docs/guides/prompting'
    ]::text[] as retrieval_links,
    array[
      'OpenAI. "Vector Embeddings." OpenAI API Documentation, https://platform.openai.com/docs/guides/embeddings/english-only. Accessed 21 Feb. 2026.',
      'OpenAI. "Prompting." OpenAI API Documentation, https://platform.openai.com/docs/guides/prompting. Accessed 21 Feb. 2026.'
    ]::text[] as retrieval_citations,
    array[
      'https://platform.openai.com/docs/guides/evals',
      'https://platform.openai.com/docs/guides/trace-grading'
    ]::text[] as eval_links,
    array[
      'OpenAI. "Working with Evals." OpenAI API Documentation, https://platform.openai.com/docs/guides/evals. Accessed 21 Feb. 2026.',
      'OpenAI. "Trace Grading." OpenAI API Documentation, https://platform.openai.com/docs/guides/trace-grading. Accessed 21 Feb. 2026.'
    ]::text[] as eval_citations,
    array[
      'https://www.nist.gov/itl/ai-risk-management-framework',
      'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10'
    ]::text[] as risk_links,
    array[
      'National Institute of Standards and Technology. "AI Risk Management Framework." NIST, https://www.nist.gov/itl/ai-risk-management-framework. Accessed 21 Feb. 2026.',
      'Tabassi, Elham. "Artificial Intelligence Risk Management Framework (AI RMF 1.0)." National Institute of Standards and Technology, 26 Jan. 2023, https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10. Accessed 21 Feb. 2026.'
    ]::text[] as risk_citations
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
  s.term,
  '"' || s.term || '" refers to a practical method for ' || s.focus || '. It is used to make AI systems more reliable, explainable, and usable in real product workflows.',
  'Apply "' || s.term || '" by defining measurable criteria, integrating it into your request pipeline, and reviewing results weekly against a quality rubric.',
  array[
    'Team workflow example: Use "' || s.term || '" during sprint planning to reduce avoidable model failures.',
    'Product example: Add "' || s.term || '" checks before publishing AI-generated output to end users.'
  ],
  array[
    'Pair "' || s.term || '" with regression testing to detect quality drift early.',
    'Document implementation steps so onboarding teams can reproduce results consistently.'
  ],
  case
    when lower(s.term) ~ '(risk|policy|guardrail|safety|bias|human review|uncertainty)' then rs.risk_links
    when lower(s.term) ~ '(tool|agent|workflow orchestration|handoff|invocation)' then rs.tool_links
    when lower(s.term) ~ '(retrieval|embedding|vector|context|knowledge)' then rs.retrieval_links
    when lower(s.term) ~ '(evaluation|quality|score|verification|trace|signal mapping|audit)' then rs.eval_links
    when lower(s.term) ~ '(prompt|query|few-shot|zero-shot|logit)' then rs.prompt_links
    else rs.prompt_links
  end,
  case
    when lower(s.term) ~ '(risk|policy|guardrail|safety|bias|human review|uncertainty)' then rs.risk_citations
    when lower(s.term) ~ '(tool|agent|workflow orchestration|handoff|invocation)' then rs.tool_citations
    when lower(s.term) ~ '(retrieval|embedding|vector|context|knowledge)' then rs.retrieval_citations
    when lower(s.term) ~ '(evaluation|quality|score|verification|trace|signal mapping|audit)' then rs.eval_citations
    when lower(s.term) ~ '(prompt|query|few-shot|zero-shot|logit)' then rs.prompt_citations
    else rs.prompt_citations
  end,
  'Original Open Studies editorial rewrite with topical references from official documentation and standards pages.',
  true
from seed_terms s
cross join reference_sets rs
on conflict (term) do update
set
  meaning = excluded.meaning,
  how_to_apply = excluded.how_to_apply,
  examples = excluded.examples,
  other_ideas = excluded.other_ideas,
  reference_links = excluded.reference_links,
  mla_citations = excluded.mla_citations,
  source_note = excluded.source_note,
  is_published = excluded.is_published;
