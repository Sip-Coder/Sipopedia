import type { CitationInput } from "./types";

function mlaSafe(value?: string): string {
  return (value ?? "").trim();
}

export class CitationFormattingAgent {
  toMLA(citation: CitationInput): string {
    const author = mlaSafe(citation.author) || "Unknown author";
    const title = mlaSafe(citation.title) || "Untitled";
    const publisher = mlaSafe(citation.publisher) || "Unknown publisher";
    const year = citation.year ? String(citation.year) : "n.d.";
    const url = mlaSafe(citation.url);

    if (url) {
      return `${author}. "${title}." ${publisher}, ${year}, ${url}.`;
    }
    return `${author}. "${title}." ${publisher}, ${year}.`;
  }

  formatAll(citations: CitationInput[] = []): string[] {
    return citations.map((citation) => this.toMLA(citation));
  }
}
