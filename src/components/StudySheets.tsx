import { useMemo, useState } from "react";
import { studySheetCategoryLabels, studySheets, type StudySheet, type StudySheetCategory } from "../lib/studySheets";

type StudySheetsProps = {
  onNavigate: (route: string) => void;
};

const categoryOrder: Array<"all" | StudySheetCategory> = ["all", "maps", "styles", "service", "classic-specs"];
const STUDY_SHEET_COMPLETION_KEY = "sip-studies-study-sheet-completions-v1";

function readCompletedSheetIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STUDY_SHEET_COMPLETION_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function categoryLabel(category: "all" | StudySheetCategory): string {
  return category === "all" ? "All Sheets" : studySheetCategoryLabels[category];
}

function buildSheetText(sheet: StudySheet, instructor = false): string {
  return [
    instructor ? "Sip Studies Instructor Sheet" : "Sip Studies Study Sheet",
    sheet.title,
    sheet.subtitle,
    "",
    `Exam use: ${sheet.examUse}`,
    `Source signals: ${sheet.sourceSignals.join(", ")}`,
    "",
    ...sheet.blocks.flatMap((block) => [
      block.heading,
      ...block.bullets.map((bullet) => `- ${bullet}`),
      ""
    ]),
    "Drills",
    ...sheet.drills.map((drill) => `- ${drill}`),
    "",
    `Route handoffs: ${sheet.routeHandoffs.map((handoff) => handoff.label).join(", ")}`,
    instructor ? "Facilitator cue: run the drills aloud, mark one weak handoff, then send the learner into the live workspace." : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function buildPacketText(sheets: StudySheet[], instructor = false): string {
  return [
    instructor ? "Sip Studies Instructor Study Sheet Packet" : "Sip Studies Study Sheet Packet",
    `Sheet count: ${sheets.length}`,
    "Format: offline markdown packet",
    "",
    ...sheets.flatMap((sheet, index) => [
      index === 0 ? "" : "\n---\n",
      buildSheetText(sheet, instructor)
    ])
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildPacketHtml(sheets: StudySheet[]): string {
  const sheetMarkup = sheets
    .map((sheet) => {
      const blocks = sheet.blocks
        .map(
          (block) => `
            <section>
              <h3>${escapeHtml(block.heading)}</h3>
              <ul>${block.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul>
            </section>`
        )
        .join("");
      const drills = sheet.drills.map((drill) => `<li>${escapeHtml(drill)}</li>`).join("");
      const handoffs = sheet.routeHandoffs.map((handoff) => escapeHtml(handoff.label)).join(", ");

      return `
        <article class="sheet">
          <p class="eyebrow">Sip Studies Instructor Sheet / ${escapeHtml(studySheetCategoryLabels[sheet.category])}</p>
          <h2>${escapeHtml(sheet.title)}</h2>
          <p class="subtitle">${escapeHtml(sheet.subtitle)}</p>
          <p><strong>Exam and floor use:</strong> ${escapeHtml(sheet.examUse)}</p>
          <p><strong>Source signals:</strong> ${escapeHtml(sheet.sourceSignals.join(", "))}</p>
          <div class="grid">${blocks}</div>
          <section>
            <h3>Drill Ladder</h3>
            <ol>${drills}</ol>
          </section>
          <p><strong>Route handoffs:</strong> ${handoffs}</p>
          <p><strong>Facilitator cue:</strong> run the drills aloud, mark one weak handoff, then send the learner into the live workspace.</p>
        </article>`;
    })
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Sip Studies Instructor Study Sheet Packet</title>
  <style>
    body { color: #111; font-family: Arial, sans-serif; line-height: 1.42; margin: 0; padding: 0.35in; }
    .sheet { break-after: page; page-break-after: always; }
    .sheet:last-child { break-after: auto; page-break-after: auto; }
    .eyebrow { color: #465b61; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
    h1, h2, h3, p { margin: 0 0 0.16in; }
    h1 { font-size: 1.5rem; }
    h2 { font-size: 1.35rem; }
    h3 { font-size: 0.95rem; }
    .subtitle { color: #333; font-weight: 700; }
    .grid { display: grid; gap: 0.12in; grid-template-columns: repeat(3, minmax(0, 1fr)); }
    section { border: 1px solid #b7b7b7; padding: 0.1in; break-inside: avoid; }
    ul, ol { margin: 0.08in 0 0; padding-left: 0.18in; }
    li { margin-bottom: 0.05in; }
    @media print { body { padding: 0.2in; } }
  </style>
</head>
<body>
  <h1>Sip Studies Instructor Study Sheet Packet</h1>
  ${sheetMarkup}
</body>
</html>`;
}

function downloadTextFile(filename: string, body: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function StudySheets({ onNavigate }: StudySheetsProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | StudySheetCategory>("all");
  const [activeSheetId, setActiveSheetId] = useState(studySheets[0].id);
  const [copyNotice, setCopyNotice] = useState("");
  const [completedSheetIds, setCompletedSheetIds] = useState<string[]>(() => readCompletedSheetIds());

  const visibleSheets = useMemo(
    () => studySheets.filter((sheet) => activeCategory === "all" || sheet.category === activeCategory),
    [activeCategory]
  );
  const activeSheet = useMemo(
    () => visibleSheets.find((sheet) => sheet.id === activeSheetId) ?? visibleSheets[0] ?? studySheets[0],
    [activeSheetId, visibleSheets]
  );
  const sheetCounts = useMemo(
    () =>
      categoryOrder.reduce<Record<string, number>>((acc, category) => {
        acc[category] = category === "all" ? studySheets.length : studySheets.filter((sheet) => sheet.category === category).length;
        return acc;
      }, {}),
    []
  );

  const handleCategoryChange = (category: "all" | StudySheetCategory) => {
    setActiveCategory(category);
    const nextSheet = studySheets.find((sheet) => category === "all" || sheet.category === category) ?? studySheets[0];
    setActiveSheetId(nextSheet.id);
    setCopyNotice("");
  };

  const handleCopySheet = async () => {
    const text = buildSheetText(activeSheet);
    try {
      await navigator.clipboard.writeText(text);
      setCopyNotice("Sheet copied as plain text.");
    } catch {
      setCopyNotice("Copy failed in this browser. Use print instead.");
    }
  };

  const handleDownloadActiveSheet = () => {
    downloadTextFile(`sip-studies-${activeSheet.id}.md`, buildSheetText(activeSheet));
    setCopyNotice("Active sheet downloaded.");
  };

  const handleDownloadInstructorPacket = () => {
    downloadTextFile("sip-studies-instructor-study-sheet-packet.md", buildPacketText(studySheets, true));
    setCopyNotice("Instructor packet downloaded.");
  };

  const handleExportPacketPdf = () => {
    if (typeof window === "undefined") return;
    const packetWindow = window.open("", "_blank");

    if (!packetWindow) {
      setCopyNotice("Enable popups to export the packet PDF.");
      return;
    }

    packetWindow.document.write(buildPacketHtml(studySheets));
    packetWindow.document.close();
    packetWindow.focus();
    packetWindow.print();
    setCopyNotice("Packet opened in print dialog for PDF download.");
  };

  const toggleActiveSheetCompletion = () => {
    const next = completedSheetIds.includes(activeSheet.id)
      ? completedSheetIds.filter((id) => id !== activeSheet.id)
      : [...completedSheetIds, activeSheet.id];
    setCompletedSheetIds(next);
    window.localStorage.setItem(STUDY_SHEET_COMPLETION_KEY, JSON.stringify(next));
    setCopyNotice(next.includes(activeSheet.id) ? "Sheet marked complete." : "Sheet returned to practice.");
  };

  return (
    <section className="study-sheets-page">
      <header className="section-header study-sheets-hero">
        <p className="checkout-eyebrow">Printable Study Sheets</p>
        <h2>One-page drills for maps, styles, service, and classic specs.</h2>
        <p>
          Convert the workspace into printer-ready recall sheets for exam prep, pre-shift coaching, blind tasting, and
          beverage category review.
        </p>
        <p className="hint">
          Goal: choose one sheet, complete its drill ladder from memory, check your notes, then open the recommended live
          workspace.
        </p>
        <div className="study-sheets-hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => window.print()}>
            Print Active Sheet
          </button>
          <button type="button" className="btn btn-light" onClick={toggleActiveSheetCompletion}>
            {completedSheetIds.includes(activeSheet.id) ? "Completed - Practice Again" : "Mark Drill Complete"}
          </button>
        </div>
        <details>
          <summary>Export, instructor, and credential tools</summary>
          <div className="study-sheets-hero-actions">
            <button type="button" className="btn btn-light" onClick={handleExportPacketPdf}>
              Export PDF Packet
            </button>
            <button type="button" className="btn btn-light" onClick={handleDownloadInstructorPacket}>
              Download Instructor Packet
            </button>
            <button type="button" className="btn btn-light" onClick={handleDownloadActiveSheet}>
              Download Active Sheet
            </button>
            <button type="button" className="btn btn-light" onClick={handleCopySheet}>
              Copy Active Sheet
            </button>
            <button type="button" className="btn btn-light" onClick={() => onNavigate("study-paths")}>
              Credential Paths
            </button>
          </div>
        </details>
        {copyNotice ? <p className="study-sheets-notice">{copyNotice}</p> : null}
      </header>

      <div className="study-sheets-layout">
        <aside className="study-sheets-sidebar" aria-label="Study sheet filters">
          <div className="study-sheets-category-grid">
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? "active" : ""}
                onClick={() => handleCategoryChange(category)}
              >
                <span>{categoryLabel(category)}</span>
                <strong>{sheetCounts[category]} sheet{sheetCounts[category] === 1 ? "" : "s"}</strong>
              </button>
            ))}
          </div>
          <div className="study-sheets-index" role="list">
            {visibleSheets.map((sheet) => (
              <button
                key={sheet.id}
                type="button"
                role="listitem"
                className={sheet.id === activeSheet.id ? "active" : ""}
                onClick={() => {
                  setActiveSheetId(sheet.id);
                  setCopyNotice("");
                }}
              >
                <span>{studySheetCategoryLabels[sheet.category]}</span>
                <strong>{sheet.title}</strong>
                <small>{sheet.subtitle}</small>
              </button>
            ))}
          </div>
        </aside>

        <article className="study-sheet-print-card">
          <div className="study-sheet-print-head">
            <div>
              <p className="nav-overline">{studySheetCategoryLabels[activeSheet.category]}</p>
              <h3>{activeSheet.title}</h3>
              <p>{activeSheet.subtitle}</p>
              <small>{completedSheetIds.includes(activeSheet.id) ? "Completed" : "Ready to practice"}</small>
            </div>
            <span>{activeSheet.sourceSignals.join(" / ")}</span>
          </div>

          <section className="study-sheet-exam-use">
            <strong>Exam and floor use</strong>
            <p>{activeSheet.examUse}</p>
          </section>

          <div className="study-sheet-block-grid">
            {activeSheet.blocks.map((block) => (
              <section key={block.heading}>
                <h4>{block.heading}</h4>
                <ul>
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <section className="study-sheet-drills">
            <h4>Drill Ladder</h4>
            <div>
              {activeSheet.drills.map((drill, index) => (
                <span key={drill}>
                  {index + 1}. {drill}
                </span>
              ))}
            </div>
          </section>

          <section className="study-sheet-handoffs">
            <h4>Open the live workspace</h4>
            <div>
              {activeSheet.routeHandoffs.map((handoff) => (
                <button key={handoff.label} type="button" className="btn btn-light" onClick={() => onNavigate(handoff.route)}>
                  {handoff.label}
                </button>
              ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}
