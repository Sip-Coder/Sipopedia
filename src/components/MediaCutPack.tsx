import { useState } from "react";
import type { MediaCutPack } from "../lib/mediaCutPack";

type MediaCutPackPanelProps = {
  pack: MediaCutPack;
  className?: string;
};

export function MediaCutPackPanel({ pack, className = "" }: MediaCutPackPanelProps) {
  const [notice, setNotice] = useState("");

  const handleDownload = (exportFile: MediaCutPack["exports"][number]) => {
    if (typeof document === "undefined") return;

    const blob = new Blob([exportFile.body], { type: exportFile.mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = exportFile.filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setNotice(`${exportFile.filename} downloaded.`);
  };

  const handleCopyCaption = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      setNotice("Caption copy is unavailable in this browser. Use the social export instead.");
      return;
    }

    try {
      await navigator.clipboard.writeText(pack.caption);
      setNotice("Caption copied.");
    } catch {
      setNotice("Caption copy failed. Use the social export instead.");
    }
  };

  return (
    <section className={`media-cut-pack ${className}`.trim()} aria-label={pack.label}>
      <div className="media-cut-pack-head">
        <div>
          <p className="media-cut-label">{pack.label}</p>
          <h3>{pack.title}</h3>
        </div>
        <span>{pack.runtime}</span>
      </div>

      <div className="media-cut-grid">
        <article className="media-cut-card media-cut-card-wide">
          <strong>Hook</strong>
          <p>{pack.hook}</p>
        </article>
        <article className="media-cut-card">
          <strong>Lesson Beats</strong>
          <ol>
            {pack.beats.map((beat) => (
              <li key={beat}>{beat}</li>
            ))}
          </ol>
        </article>
        <article className="media-cut-card">
          <strong>Caption</strong>
          <p>{pack.caption}</p>
          <button type="button" className="media-cut-copy-button" onClick={handleCopyCaption}>
            Copy Caption
          </button>
        </article>
      </div>

      <article className="media-cut-card">
        <strong>Transcript Seed</strong>
        <ol>
          {pack.transcriptSeed.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </article>

      <article className="media-cut-card media-cut-production-card">
        <div className="media-cut-production-head">
          <div>
            <strong>Production Board</strong>
            <p>{pack.productionBoard.thumbnailFrame}</p>
          </div>
          <span>{pack.productionBoard.readinessScore}% ready</span>
        </div>
        <div className="media-cut-readiness-list" aria-label="Production readiness signals">
          {pack.productionBoard.readinessSignals.map((signal) => (
            <span key={signal}>{signal}</span>
          ))}
        </div>
        <div className="media-cut-shot-grid">
          {pack.productionBoard.shotList.map((shot) => (
            <article key={`${shot.timestamp}-${shot.frame}`}>
              <span>{shot.timestamp}</span>
              <strong>{shot.frame}</strong>
              <p>{shot.visual}</p>
              <small>{shot.onScreenText}</small>
            </article>
          ))}
        </div>
      </article>

      <article className="media-cut-card media-cut-card-wide">
        <strong>Teleprompter Pass</strong>
        <ol>
          {pack.productionBoard.teleprompter.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ol>
      </article>

      <article className="media-cut-card media-cut-export-card">
        <div className="media-cut-export-head">
          <strong>Export Files</strong>
          <span>{pack.exports.length} downloads</span>
        </div>
        <div className="media-cut-export-grid">
          {pack.exports.map((exportFile) => (
            <button
              type="button"
              className="media-cut-export-button"
              key={exportFile.id}
              title={exportFile.description}
              onClick={() => handleDownload(exportFile)}
            >
              <span>{exportFile.label}</span>
              <small>{exportFile.channel}</small>
            </button>
          ))}
        </div>
        {notice ? (
          <p className="media-cut-notice" role="status">
            {notice}
          </p>
        ) : null}
      </article>
    </section>
  );
}
