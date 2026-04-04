import type { SupabaseClient } from "@supabase/supabase-js";
import type { BeverageType, TaxonomyNode } from "./types";

const ROOT_NODE_KEY = "beverage";

const ROOT_BEVERAGE_NODES: Array<{ term: string; nodeKey: string; beverageType: BeverageType }> = [
  { term: "Wine", nodeKey: "wine", beverageType: "wine" },
  { term: "Beer", nodeKey: "beer", beverageType: "beer" },
  { term: "Spirits", nodeKey: "spirits", beverageType: "spirits" },
  { term: "Coffee", nodeKey: "coffee", beverageType: "coffee" },
  { term: "Tea", nodeKey: "tea", beverageType: "tea" },
  { term: "Water", nodeKey: "water", beverageType: "water" },
  { term: "Fermented beverages", nodeKey: "fermented-beverages", beverageType: "fermented_beverages" }
];

function normalizeNodeKey(term: string): string {
  return term.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export class TaxonomyGraphAgent {
  constructor(private readonly supabase: SupabaseClient | null) {}

  buildBaseGraph(): TaxonomyNode[] {
    const root: TaxonomyNode = {
      nodeKey: ROOT_NODE_KEY,
      term: "Beverage",
      parentNodeKey: null,
      beverageType: "fermented_beverages",
      level: 0,
      aliases: [],
      metadata: { system: true }
    };

    const children = ROOT_BEVERAGE_NODES.map<TaxonomyNode>((node) => ({
      nodeKey: node.nodeKey,
      term: node.term,
      parentNodeKey: ROOT_NODE_KEY,
      beverageType: node.beverageType,
      level: 1,
      aliases: [],
      metadata: { system: true }
    }));

    return [root, ...children];
  }

  getRootNodeForBeverageType(beverageType?: BeverageType): string {
    if (!beverageType) return ROOT_NODE_KEY;
    const match = ROOT_BEVERAGE_NODES.find((item) => item.beverageType === beverageType);
    return match?.nodeKey ?? ROOT_NODE_KEY;
  }

  async fetchGraph(): Promise<TaxonomyNode[]> {
    if (!this.supabase) {
      return this.buildBaseGraph();
    }

    const { data, error } = await this.supabase
      .from("beverage_taxonomy_graph")
      .select("node_key, term, parent_node_key, beverage_type, level, aliases, metadata")
      .order("level", { ascending: true });

    if (error || !data || data.length === 0) {
      return [];
    }

    return data.map((row) => ({
      nodeKey: row.node_key,
      term: row.term,
      parentNodeKey: row.parent_node_key,
      beverageType: row.beverage_type,
      level: row.level,
      aliases: Array.isArray(row.aliases) ? row.aliases : [],
      metadata: (row.metadata as Record<string, unknown>) ?? {}
    }));
  }

  async ensureBaseGraphPersisted(): Promise<TaxonomyNode[]> {
    const graph = await this.fetchGraph();
    if (!this.supabase) {
      return this.buildBaseGraph();
    }
    if (graph.length > 0) {
      return graph;
    }
    await this.persistNodes(this.buildBaseGraph());
    return this.buildBaseGraph();
  }

  async persistNodes(nodes: TaxonomyNode[]): Promise<void> {
    if (!this.supabase || nodes.length === 0) return;

    const payload = nodes.map((node) => ({
      node_key: normalizeNodeKey(node.nodeKey || node.term),
      term: node.term,
      parent_node_key: node.parentNodeKey,
      beverage_type: node.beverageType,
      level: node.level,
      aliases: node.aliases,
      metadata: node.metadata ?? {}
    }));

    await this.supabase.from("beverage_taxonomy_graph").upsert(payload, { onConflict: "node_key" });
  }

  async upsertTermNode(params: {
    term: string;
    beverageType: BeverageType;
    parentNodeKey: string | null;
    aliases?: string[];
    metadata?: Record<string, unknown>;
  }): Promise<TaxonomyNode> {
    const nodeKey = normalizeNodeKey(params.term);
    const existingNodes = await this.fetchGraph();
    const parentLevel =
      params.parentNodeKey === null
        ? 0
        : (existingNodes.find((node) => node.nodeKey === params.parentNodeKey)?.level ?? 0);
    const node: TaxonomyNode = {
      nodeKey,
      term: params.term,
      parentNodeKey: params.parentNodeKey,
      beverageType: params.beverageType,
      level: parentLevel + 1,
      aliases: params.aliases ?? [],
      metadata: params.metadata ?? {}
    };
    await this.persistNodes([node]);
    return node;
  }

  async exportTree(): Promise<Record<string, unknown>> {
    const nodes = await this.ensureBaseGraphPersisted();
    const byParent = new Map<string | null, TaxonomyNode[]>();

    for (const node of nodes) {
      const key = node.parentNodeKey;
      const list = byParent.get(key) ?? [];
      list.push(node);
      byParent.set(key, list);
    }

    const buildNode = (node: TaxonomyNode): Record<string, unknown> => ({
      nodeKey: node.nodeKey,
      term: node.term,
      beverageType: node.beverageType,
      aliases: node.aliases,
      children: (byParent.get(node.nodeKey) ?? []).map(buildNode)
    });

    const roots = byParent.get(null) ?? [];
    return { tree: roots.map(buildNode) };
  }
}
