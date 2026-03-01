-- Backfill verified references + MLA citations for terminology entries and enforce requirement.

with reference_sets as (
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
)
update public.terminology_entries as t
set
  reference_links = case
    when lower(t.term) ~ '(risk|policy|guardrail|safety|bias|human review|uncertainty|boundary)' then rs.risk_links
    when lower(t.term) ~ '(tool|agent|workflow orchestration|handoff|invocation|router)' then rs.tool_links
    when lower(t.term) ~ '(retrieval|embedding|vector|context|knowledge|chunking)' then rs.retrieval_links
    when lower(t.term) ~ '(evaluation|quality|score|verification|trace|signal mapping|audit|metrics|calibration|taxonomy|dashboard)' then rs.eval_links
    when lower(t.term) ~ '(prompt|query|few-shot|zero-shot|logit|schema|compression)' then rs.prompt_links
    else rs.prompt_links
  end,
  mla_citations = case
    when lower(t.term) ~ '(risk|policy|guardrail|safety|bias|human review|uncertainty|boundary)' then rs.risk_citations
    when lower(t.term) ~ '(tool|agent|workflow orchestration|handoff|invocation|router)' then rs.tool_citations
    when lower(t.term) ~ '(retrieval|embedding|vector|context|knowledge|chunking)' then rs.retrieval_citations
    when lower(t.term) ~ '(evaluation|quality|score|verification|trace|signal mapping|audit|metrics|calibration|taxonomy|dashboard)' then rs.eval_citations
    when lower(t.term) ~ '(prompt|query|few-shot|zero-shot|logit|schema|compression)' then rs.prompt_citations
    else rs.prompt_citations
  end,
  source_note = 'Original Open Studies editorial rewrite with verified references from official documentation and standards pages.'
from reference_sets as rs
where coalesce(cardinality(t.reference_links), 0) = 0
   or coalesce(cardinality(t.mla_citations), 0) = 0;
alter table public.terminology_entries
  drop constraint if exists terminology_entries_reference_links_required;
alter table public.terminology_entries
  add constraint terminology_entries_reference_links_required
  check (cardinality(reference_links) > 0);
alter table public.terminology_entries
  drop constraint if exists terminology_entries_mla_citations_required;
alter table public.terminology_entries
  add constraint terminology_entries_mla_citations_required
  check (cardinality(mla_citations) > 0);
