import { CitationFormattingAgent } from "./citationFormattingAgent";
import { CitationTrustAgent } from "./citationTrustAgent";
import { CrosslinkAgent } from "./crosslinkAgent";
import { OntologyCorrectionAgent } from "./ontologyCorrectionAgent";
import { createServiceSupabaseClient } from "./supabaseClient";
import { TaxonomyGraphAgent } from "./taxonomyGraphAgent";
import { TaxonomyMemoryAgent } from "./taxonomyMemoryAgent";
import type { TermInput, ValidateTermOutput } from "./types";

export class StructureOrchestrator {
  private readonly citationTrustAgent = new CitationTrustAgent();
  private readonly citationFormattingAgent = new CitationFormattingAgent();
  private readonly crosslinkAgent = new CrosslinkAgent();
  private readonly ontologyCorrectionAgent = new OntologyCorrectionAgent();
  private readonly taxonomyGraphAgent: TaxonomyGraphAgent;
  private readonly taxonomyMemoryAgent: TaxonomyMemoryAgent;

  constructor() {
    const supabase = createServiceSupabaseClient();
    this.taxonomyGraphAgent = new TaxonomyGraphAgent(supabase);
    this.taxonomyMemoryAgent = new TaxonomyMemoryAgent(supabase);
  }

  async validateTerm(termInput: TermInput): Promise<ValidateTermOutput> {
    const graphNodes = await this.taxonomyGraphAgent.ensureBaseGraphPersisted();

    const fallbackParentNodeKey = this.taxonomyGraphAgent.getRootNodeForBeverageType(termInput.beverageType);

    const correctionIssues = this.ontologyCorrectionAgent.detectIssues(termInput, graphNodes);
    const parentNodeKey = this.ontologyCorrectionAgent.resolveParentNodeKey(
      termInput,
      graphNodes,
      fallbackParentNodeKey
    );

    const beverageType = termInput.beverageType ?? "fermented_beverages";
    const node = await this.taxonomyGraphAgent.upsertTermNode({
      term: termInput.term,
      beverageType,
      parentNodeKey,
      aliases: termInput.aliases ?? [],
      metadata: {
        regions: termInput.regions ?? [],
        processes: termInput.processes ?? [],
        grapes: termInput.grapes ?? [],
        ingredients: termInput.ingredients ?? []
      }
    });

    const citationTrustScore = this.citationTrustAgent.scoreCitations(termInput.citations ?? []);
    const mlaCitations = this.citationFormattingAgent.formatAll(termInput.citations ?? []);
    const crosslinkSuggestions = this.crosslinkAgent.createCrosslinks(termInput, [...graphNodes, node]);

    await this.taxonomyMemoryAgent.storeLearningEvent({
      termInput,
      correctionIssues,
      citationTrust: citationTrustScore.scoredCitations
    });

    return {
      correctedTaxonomyPlacement: {
        nodeKey: node.nodeKey,
        parentNodeKey: node.parentNodeKey,
        beverageType: node.beverageType
      },
      citationTrustScore,
      crosslinkSuggestions,
      mlaCitations,
      correctionIssues
    };
  }

  async exportGraph(): Promise<Record<string, unknown>> {
    return this.taxonomyGraphAgent.exportTree();
  }
}
