import type { CorrectionIssue, TaxonomyNode, TermInput } from "./types";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export class OntologyCorrectionAgent {
  detectIssues(termInput: TermInput, graphNodes: TaxonomyNode[]): CorrectionIssue[] {
    const issues: CorrectionIssue[] = [];
    const normalizedTerm = normalize(termInput.term);
    const nodeByTerm = new Map<string, TaxonomyNode[]>();

    for (const node of graphNodes) {
      const key = normalize(node.term);
      const list = nodeByTerm.get(key) ?? [];
      list.push(node);
      nodeByTerm.set(key, list);
    }

    const duplicates = nodeByTerm.get(normalizedTerm);
    if (duplicates && duplicates.length > 1) {
      issues.push({
        type: "duplicate_node",
        severity: "high",
        message: `Duplicate taxonomy nodes found for term "${termInput.term}".`
      });
    }

    if (termInput.parentTerm) {
      const parentExists = graphNodes.some((node) => normalize(node.term) === normalize(termInput.parentTerm!));
      if (!parentExists) {
        issues.push({
          type: "taxonomy_conflict",
          severity: "medium",
          message: `Parent term "${termInput.parentTerm}" does not exist in taxonomy graph.`
        });
      }
    }

    if (termInput.beverageType) {
      const existingNode = graphNodes.find((node) => normalize(node.term) === normalizedTerm);
      if (existingNode && existingNode.beverageType !== termInput.beverageType) {
        issues.push({
          type: "misplaced_term",
          severity: "high",
          message: `Existing node is under "${existingNode.beverageType}" but input is "${termInput.beverageType}".`
        });
      }
    }

    return issues;
  }

  resolveParentNodeKey(termInput: TermInput, graphNodes: TaxonomyNode[], fallbackParentNodeKey: string): string {
    if (!termInput.parentTerm) return fallbackParentNodeKey;
    const match = graphNodes.find((node) => normalize(node.term) === normalize(termInput.parentTerm!));
    return match?.nodeKey ?? fallbackParentNodeKey;
  }
}
