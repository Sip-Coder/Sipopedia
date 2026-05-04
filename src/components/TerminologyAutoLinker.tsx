import { useEffect, useMemo, useRef, useState } from "react";
import { listTerminologyLinkTargets, type TerminologyLinkTarget } from "../lib/terminology";

type PreparedTerm = {
  id: string;
  term: string;
  normalized: string;
  source: string;
};

type LinkerState =
  | { status: "idle" | "loading"; terms: PreparedTerm[]; error: "" }
  | { status: "ready"; terms: PreparedTerm[]; error: "" }
  | { status: "error"; terms: PreparedTerm[]; error: string };

const SKIPPED_TAGS = new Set([
  "A",
  "BUTTON",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "OPTION",
  "SCRIPT",
  "STYLE",
  "CODE",
  "PRE",
  "KBD",
  "SAMP",
  "SVG",
  "CANVAS",
  "NOSCRIPT"
]);

const SKIPPED_SELECTOR = [
  "a",
  "button",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "input",
  "textarea",
  "select",
  "option",
  "script",
  "style",
  "code",
  "pre",
  "kbd",
  "samp",
  "svg",
  "canvas",
  "noscript",
  "nav",
  "[role='heading']",
  "[contenteditable='true']",
  "[data-no-terminology-links]",
  ".nav-overline",
  ".lesson-chip",
  ".term-row-tag",
  ".workspace-command-deck",
  ".workspace-module-grid",
  ".workspace-section-rail",
  ".workspace-house-rail",
  ".terminology-autolink"
].join(",");

const PROSE_SELECTOR = "p,li,dd,blockquote,figcaption,td";
const AUTOLINK_DENYLIST = new Set(["when"]);

let preparedTermsPromise: Promise<PreparedTerm[]> | null = null;

function normalizeTerm(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeLookup(value: string) {
  return normalizeTerm(value).toLocaleLowerCase();
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isUsefulLinkTerm(value: string) {
  const term = normalizeTerm(value);
  if (AUTOLINK_DENYLIST.has(term.toLocaleLowerCase())) return false;
  if (term.length === 0) return false;
  if (/^[a-z]$/i.test(term)) return false;
  if (term.length >= 3) return true;
  return /[0-9A-Z]/.test(term) || /[^a-z]/i.test(term);
}

function prepareTerms(targets: TerminologyLinkTarget[]) {
  const byTerm = new Map<string, PreparedTerm>();

  for (const target of targets) {
    const term = normalizeTerm(target.term);
    if (!target.id || !isUsefulLinkTerm(term)) continue;

    const normalized = normalizeLookup(term);
    if (byTerm.has(normalized)) continue;

    byTerm.set(normalized, {
      id: target.id,
      term,
      normalized,
      source: escapeRegExp(term).replace(/\s+/g, "\\s+")
    });
  }

  return [...byTerm.values()].sort((left, right) => {
    if (right.term.length !== left.term.length) {
      return right.term.length - left.term.length;
    }
    return left.term.localeCompare(right.term);
  });
}

function loadPreparedTerms() {
  preparedTermsPromise ??= listTerminologyLinkTargets().then(prepareTerms);
  return preparedTermsPromise;
}

function buildMatcher(terms: PreparedTerm[]) {
  if (terms.length === 0) return null;
  return new RegExp(`(^|[^\\p{L}\\p{N}_])(${terms.map((term) => term.source).join("|")})(?=$|[^\\p{L}\\p{N}_])`, "giu");
}

function buildTermHref(term: PreparedTerm) {
  const params = new URLSearchParams();
  params.set("term", term.id);
  params.set("q", term.term);
  return `/#app/sipopedia?${params.toString()}`;
}

function shouldSkipTextNode(node: Text) {
  const value = node.nodeValue ?? "";
  if (!value.trim()) return true;

  const parent = node.parentElement;
  if (!parent) return true;
  if (SKIPPED_TAGS.has(parent.tagName)) return true;
  if (parent.closest(SKIPPED_SELECTOR)) return true;
  return !parent.closest(PROSE_SELECTOR);
}

function unwrapTerminologyLink(anchor: HTMLAnchorElement) {
  anchor.replaceWith(document.createTextNode(anchor.textContent ?? ""));
}

function collectExistingLinkedTermIds(root: ParentNode) {
  const linkedTermIds = new Set<string>();
  const anchors = root instanceof Element
    ? Array.from(root.querySelectorAll<HTMLAnchorElement>("a.terminology-autolink[data-terminology-term-id]"))
    : [];

  for (const anchor of anchors) {
    if (anchor.closest("[data-no-terminology-links]")) {
      unwrapTerminologyLink(anchor);
      continue;
    }

    const termId = anchor.dataset.terminologyTermId;
    if (!termId) {
      unwrapTerminologyLink(anchor);
      continue;
    }

    if (linkedTermIds.has(termId)) {
      unwrapTerminologyLink(anchor);
      continue;
    }

    linkedTermIds.add(termId);
  }

  return linkedTermIds;
}

function linkifyTextNode(
  node: Text,
  matcher: RegExp,
  termsByNormalizedName: Map<string, PreparedTerm>,
  linkedTermIds: Set<string>
) {
  const value = node.nodeValue ?? "";
  matcher.lastIndex = 0;

  let match = matcher.exec(value);
  if (!match) return false;

  const fragment = document.createDocumentFragment();
  let lastIndex = 0;

  while (match) {
    const prefix = match[1] ?? "";
    const matchedTerm = match[2] ?? "";
    const matchStart = match.index + prefix.length;
    const matchEnd = matchStart + matchedTerm.length;
    const target = termsByNormalizedName.get(normalizeLookup(matchedTerm));

    if (target && !linkedTermIds.has(target.id)) {
      if (matchStart > lastIndex) {
        fragment.append(document.createTextNode(value.slice(lastIndex, matchStart)));
      }

      const anchor = document.createElement("a");
      anchor.href = buildTermHref(target);
      anchor.className = "terminology-autolink";
      anchor.dataset.terminologyTermId = target.id;
      anchor.title = `Open ${target.term} in Sipopedia`;
      anchor.textContent = value.slice(matchStart, matchEnd);
      anchor.addEventListener("click", (event) => event.stopPropagation());
      fragment.append(anchor);
      linkedTermIds.add(target.id);
      lastIndex = matchEnd;
    }

    match = matcher.exec(value);
  }

  if (lastIndex < value.length) {
    fragment.append(document.createTextNode(value.slice(lastIndex)));
  }

  node.parentNode?.replaceChild(fragment, node);
  return true;
}

function linkifyRoot(root: ParentNode, matcher: RegExp, termsByNormalizedName: Map<string, PreparedTerm>) {
  const linkedTermIds = collectExistingLinkedTermIds(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!(node instanceof Text)) return NodeFilter.FILTER_REJECT;
      return shouldSkipTextNode(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    if (current instanceof Text) {
      nodes.push(current);
    }
    current = walker.nextNode();
  }

  for (const node of nodes) {
    linkifyTextNode(node, matcher, termsByNormalizedName, linkedTermIds);
  }
}

export function TerminologyAutoLinker({ route }: { route: string }) {
  const [state, setState] = useState<LinkerState>({ status: "idle", terms: [], error: "" });
  const observerRef = useRef<MutationObserver | null>(null);
  const scheduledRef = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    setState({ status: "loading", terms: [], error: "" });

    loadPreparedTerms()
      .then((terms) => {
        if (!active) return;
        setState({ status: "ready", terms, error: "" });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setState({
          status: "error",
          terms: [],
          error: error instanceof Error ? error.message : "Could not load terminology auto-links."
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const matcher = useMemo(() => (state.status === "ready" ? buildMatcher(state.terms) : null), [state.status, state.terms]);
  const termsByNormalizedName = useMemo(
    () => new Map(state.terms.map((term) => [term.normalized, term])),
    [state.terms]
  );

  useEffect(() => {
    if (state.status !== "ready" || !matcher) return;

    const root = document.querySelector(".page");
    if (!root) return;

    const run = () => {
      scheduledRef.current = null;
      const activeModal = root.querySelector(".term-modal");
      linkifyRoot(activeModal ?? root, matcher, termsByNormalizedName);
    };

    const schedule = () => {
      if (scheduledRef.current !== null) return;
      scheduledRef.current = window.setTimeout(run, 80);
    };

    run();

    observerRef.current?.disconnect();
    observerRef.current = new MutationObserver((mutations) => {
      if (mutations.every((mutation) => mutation.addedNodes.length === 0 && mutation.type !== "characterData")) {
        return;
      }
      schedule();
    });
    observerRef.current.observe(root, { childList: true, characterData: true, subtree: true });

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      if (scheduledRef.current !== null) {
        window.clearTimeout(scheduledRef.current);
        scheduledRef.current = null;
      }
    };
  }, [matcher, route, state.status, termsByNormalizedName]);

  return null;
}
