import type { ReadabilityBatchResult, ReadabilityEvaluation, TerminologyEntry } from "./types.ts";

function countSyllables(word: string): number {
  const cleaned = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!cleaned) return 1;
  const matches = cleaned.match(/[aeiouy]+/g);
  return Math.max(matches?.length ?? 1, 1);
}

function calcReadingGrade(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((segment) => segment.trim().length > 0);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  const sentenceCount = Math.max(sentences.length, 1);
  const wordCount = Math.max(words.length, 1);
  const grade = 0.39 * (wordCount / sentenceCount) + 11.8 * (syllables / wordCount) - 15.59;
  return Number(Math.max(1, grade).toFixed(2));
}

function examSuitability(gradeLevel: number, definition: string): number {
  const lengthPenalty = definition.length > 260 ? 0.1 : 0;
  const targetGradeDistance = Math.min(Math.abs(gradeLevel - 10), 10) / 10;
  return Number(Math.max(0, 1 - targetGradeDistance - lengthPenalty).toFixed(4));
}

function clarityScore(definition: string): number {
  const hasActionable = /(use|identify|compare|apply)/i.test(definition);
  const sentenceCount = definition.split(/[.!?]+/).filter(Boolean).length;
  const penalty = sentenceCount > 3 ? 0.2 : 0;
  return Number((hasActionable ? 0.9 : 0.72) - penalty);
}

export class ReadabilityAgent {
  evaluate(entries: TerminologyEntry[]): ReadabilityBatchResult {
    const evaluations: ReadabilityEvaluation[] = entries.map((entry) => {
      const readingGradeLevel = calcReadingGrade(entry.definition);
      const examSuitabilityScore = examSuitability(readingGradeLevel, entry.definition);
      const clarity = Math.max(0, Math.min(1, clarityScore(entry.definition)));
      const driftDetected = readingGradeLevel < 7 || readingGradeLevel > 13;

      return {
        term: entry.term,
        readingGradeLevel,
        examSuitabilityScore,
        clarityScore: Number(clarity.toFixed(4)),
        driftDetected
      };
    });

    const averageGradeLevel =
      evaluations.reduce((sum, entry) => sum + entry.readingGradeLevel, 0) / Math.max(evaluations.length, 1);
    const readabilitySuccessRate =
      evaluations.filter((entry) => !entry.driftDetected && entry.clarityScore >= 0.75).length /
      Math.max(evaluations.length, 1);
    const readingLevelDriftPatterns = evaluations
      .filter((entry) => entry.driftDetected)
      .map((entry) => `${entry.term}:grade_${entry.readingGradeLevel}`);

    return {
      evaluations,
      averageGradeLevel: Number(averageGradeLevel.toFixed(4)),
      readabilitySuccessRate: Number(readabilitySuccessRate.toFixed(4)),
      readingLevelDriftPatterns
    };
  }
}

