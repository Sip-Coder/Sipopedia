import type { LearningSourcePack } from "../lib/learningSources";

type LearningSourcePanelProps = {
  pack: LearningSourcePack;
  title?: string;
  compact?: boolean;
  tone?: "light" | "dark";
};

export function LearningSourcePanel({ pack, title = "Source Lens", compact = false, tone = "light" }: LearningSourcePanelProps) {
  const sourceLimit = compact ? 2 : pack.sources.length;

  return (
    <aside className={`learning-source-panel learning-source-panel-${tone}${compact ? " compact" : ""}`} aria-label={`${title} references`}>
      <div className="learning-source-panel-head">
        <span>{title}</span>
        <strong>{pack.title}</strong>
      </div>
      <p>{pack.summary}</p>
      <div className="learning-source-cues" aria-label="Study cues">
        {pack.cues.map((cue) => (
          <span key={`${pack.title}-${cue}`}>{cue}</span>
        ))}
      </div>
      <div className="learning-source-links">
        {pack.sources.slice(0, sourceLimit).map((source) => (
          <a key={source.href} href={source.href} target="_blank" rel="noreferrer" title={source.note}>
            {source.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
