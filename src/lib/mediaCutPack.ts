import type { DailySipReport } from "../data/dailySip";

export type MediaCutExport = {
  id: string;
  label: string;
  channel: string;
  description: string;
  filename: string;
  mimeType: string;
  body: string;
};

export type MediaProductionShot = {
  timestamp: string;
  frame: string;
  visual: string;
  onScreenText: string;
  audioCue: string;
  purpose: string;
};

export type MediaProductionBoard = {
  readinessScore: number;
  readinessSignals: string[];
  thumbnailFrame: string;
  visualStyle: string;
  teleprompter: string[];
  shotList: MediaProductionShot[];
};

export type MediaCutPack = {
  label: string;
  title: string;
  hook: string;
  runtime: string;
  beats: string[];
  caption: string;
  transcriptSeed: string[];
  productionBoard: MediaProductionBoard;
  exports: MediaCutExport[];
};

type WinecastCutInput = {
  title: string;
  episodeLabel: string;
  theme: string;
  summary: string;
  learningPoints: string[];
  keywords: string[];
};

function compactText(value: string, maxLength: number): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3).trim()}...`;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "media-cut";
}

function toTag(value: string): string {
  const cleaned = value.replace(/[^a-z0-9]/gi, "").slice(0, 24);
  return cleaned ? `#${cleaned}` : "#SipStudies";
}

function formatSrtTimestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")},000`;
}

function buildSrt(lines: string[]): string {
  return lines
    .slice(0, 8)
    .map((line, index) => {
      const start = index * 6;
      const end = start + 6;

      return `${index + 1}\n${formatSrtTimestamp(start)} --> ${formatSrtTimestamp(end)}\n${line}`;
    })
    .join("\n\n");
}

function buildTranscriptBody(pack: Omit<MediaCutPack, "exports">): string {
  return [
    `# ${pack.title}`,
    "",
    `Label: ${pack.label}`,
    `Runtime: ${pack.runtime}`,
    "",
    "## Hook",
    pack.hook,
    "",
    "## Lesson Beats",
    ...pack.beats.map((beat, index) => `${index + 1}. ${beat}`),
    "",
    "## Transcript Draft",
    ...pack.transcriptSeed.map((line, index) => `${index + 1}. ${line}`),
    "",
    "## Caption",
    pack.caption,
    "",
    "## Teleprompter",
    ...pack.productionBoard.teleprompter.map((line, index) => `${index + 1}. ${line}`),
    ""
  ].join("\n");
}

function buildChannelBody(pack: Omit<MediaCutPack, "exports">, channel: string, hashtags: string[]): string {
  return [
    `# ${pack.title} - ${channel}`,
    "",
    `Runtime target: ${pack.runtime}`,
    `Channel: ${channel}`,
    "",
    "## Opening Hook",
    pack.hook,
    "",
    "## Cut Notes",
    ...pack.beats.map((beat, index) => `${index + 1}. ${beat}`),
    "",
    "## Caption",
    pack.caption,
    "",
    "## Hashtags",
    hashtags.join(" "),
    "",
    "## Thumbnail Frame",
    pack.productionBoard.thumbnailFrame,
    "",
    "## First Recording Pass",
    ...pack.productionBoard.shotList.map((shot) => `- ${shot.timestamp}: ${shot.frame} / ${shot.visual}`),
    "",
    "## Offline Handoff",
    "Export this file with the transcript draft and SRT captions before recording or scheduling the cut."
  ].join("\n");
}

function buildProductionBoard(pack: Omit<MediaCutPack, "exports" | "productionBoard">, hashtags: string[]): MediaProductionBoard {
  const readinessChecks = [
    { label: "Hook locked", ready: pack.hook.trim().length > 0 },
    { label: "Three lesson beats", ready: pack.beats.length >= 3 },
    { label: "Caption ready", ready: pack.caption.trim().length > 0 },
    { label: "Transcript pass drafted", ready: pack.transcriptSeed.length >= 3 },
    { label: "Channel tags ready", ready: hashtags.length > 0 }
  ];
  const readinessScore = Math.round((readinessChecks.filter((check) => check.ready).length / readinessChecks.length) * 100);
  const transcript = pack.transcriptSeed.length ? pack.transcriptSeed : [pack.hook, ...pack.beats, pack.caption];
  const primaryBeat = pack.beats[0] ?? pack.hook;
  const secondBeat = pack.beats[1] ?? pack.caption;
  const thirdBeat = pack.beats[2] ?? "Show the study route, saved note, or next action.";

  return {
    readinessScore,
    readinessSignals: readinessChecks.map((check) => `${check.ready ? "Ready" : "Needs work"}: ${check.label}`),
    thumbnailFrame: compactText(`Frame the lesson around "${pack.title}" with the subject visible, one clear cue phrase, and enough clean space for platform UI.`, 180),
    visualStyle: "Editorial beverage education: real glassware, label-safe closeups, study cards, source handoff moments, and high-contrast captions that stay outside platform UI controls.",
    teleprompter: [
      compactText(pack.hook, 140),
      ...transcript.map((line) => compactText(line, 140)),
      compactText(`Save this ${pack.label.toLowerCase()} and turn the next weak topic into a Sip Studies drill.`, 140)
    ],
    shotList: [
      {
        timestamp: "00:00-00:03",
        frame: "Cold open",
        visual: "Tight detail shot or hero card before the learner sees the full context.",
        onScreenText: compactText(pack.hook, 52),
        audioCue: "Ask the central question immediately.",
        purpose: "Stop the scroll and state the learning promise."
      },
      {
        timestamp: "00:03-00:12",
        frame: "Proof point",
        visual: "Cut to bottle, map, tasting grid, source card, or market signal.",
        onScreenText: compactText(primaryBeat, 48),
        audioCue: compactText(transcript[0] ?? primaryBeat, 90),
        purpose: "Give the first concrete reason the lesson matters."
      },
      {
        timestamp: "00:12-00:28",
        frame: "Lesson build",
        visual: "Alternate two quick visual anchors: glassware/detail and study UI.",
        onScreenText: compactText(secondBeat, 48),
        audioCue: compactText(transcript[1] ?? secondBeat, 90),
        purpose: "Move from fact to practical student memory."
      },
      {
        timestamp: "00:28-00:45",
        frame: "Application",
        visual: "Show the route, worksheet, scanner, quiz, or tasting note that continues the lesson.",
        onScreenText: compactText(thirdBeat, 48),
        audioCue: compactText(transcript[2] ?? thirdBeat, 90),
        purpose: "Turn viewing into a next action."
      },
      {
        timestamp: "00:45-end",
        frame: "Close",
        visual: "Return to hero card with clean space for captions and platform buttons.",
        onScreenText: "Save the drill",
        audioCue: compactText(pack.caption, 90),
        purpose: "Prompt save, share, or study continuation."
      }
    ]
  };
}

function buildProductionBriefBody(pack: Omit<MediaCutPack, "exports">): string {
  return [
    `# ${pack.title} - Production Board`,
    "",
    `Label: ${pack.label}`,
    `Runtime target: ${pack.runtime}`,
    `Readiness score: ${pack.productionBoard.readinessScore}%`,
    "",
    "## Readiness Signals",
    ...pack.productionBoard.readinessSignals.map((signal) => `- ${signal}`),
    "",
    "## Thumbnail Frame",
    pack.productionBoard.thumbnailFrame,
    "",
    "## Visual Style",
    pack.productionBoard.visualStyle,
    "",
    "## Shot List",
    ...pack.productionBoard.shotList.flatMap((shot) => [
      `### ${shot.timestamp} - ${shot.frame}`,
      `Visual: ${shot.visual}`,
      `On-screen text: ${shot.onScreenText}`,
      `Audio cue: ${shot.audioCue}`,
      `Purpose: ${shot.purpose}`,
      ""
    ]),
    "## Teleprompter",
    ...pack.productionBoard.teleprompter.map((line, index) => `${index + 1}. ${line}`),
    "",
    "## Asset Checklist",
    "- Hero image or recording frame selected",
    "- Captions reviewed for readability",
    "- Platform UI-safe margins checked",
    "- Source or study route shown before close",
    "- Human transcript pass completed before publishing"
  ].join("\n");
}

function buildTeleprompterBody(pack: Omit<MediaCutPack, "exports">): string {
  return [
    `${pack.title} - Teleprompter`,
    `Runtime target: ${pack.runtime}`,
    "",
    ...pack.productionBoard.teleprompter.map((line) => line.toUpperCase())
  ].join("\n\n");
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function buildShotListCsv(pack: Omit<MediaCutPack, "exports">): string {
  const rows = [
    ["timestamp", "frame", "visual", "on_screen_text", "audio_cue", "purpose"],
    ...pack.productionBoard.shotList.map((shot) => [shot.timestamp, shot.frame, shot.visual, shot.onScreenText, shot.audioCue, shot.purpose])
  ];
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function withExports(pack: Omit<MediaCutPack, "exports">, slugSource: string, hashtags: string[]): MediaCutPack {
  const slug = slugify(slugSource);
  const filenameBase = `sip-studies-${slug}`;
  const captionLines = [pack.hook, ...pack.transcriptSeed, pack.caption].map((line) => compactText(line, 120));

  return {
    ...pack,
    exports: [
      {
        id: "transcript",
        label: "Transcript MD",
        channel: "Offline script",
        description: "Editable script draft for human review, LMS handoff, or offline planning.",
        filename: `${filenameBase}-transcript.md`,
        mimeType: "text/markdown;charset=utf-8",
        body: buildTranscriptBody(pack)
      },
      {
        id: "captions-srt",
        label: "Captions SRT",
        channel: "Short video",
        description: "Starter subtitle cues for a short lesson cut.",
        filename: `${filenameBase}-captions.srt`,
        mimeType: "application/x-subrip;charset=utf-8",
        body: `${buildSrt(captionLines)}\n`
      },
      {
        id: "youtube-shorts",
        label: "YouTube Shorts",
        channel: "Shorts",
        description: "Channel-specific title, hook, caption, beats, and tags.",
        filename: `${filenameBase}-youtube-shorts.md`,
        mimeType: "text/markdown;charset=utf-8",
        body: buildChannelBody(pack, "YouTube Shorts", hashtags)
      },
      {
        id: "instagram-reels",
        label: "Instagram Reels",
        channel: "Reels",
        description: "Channel-specific copy and beat order for social publishing.",
        filename: `${filenameBase}-instagram-reels.md`,
        mimeType: "text/markdown;charset=utf-8",
        body: buildChannelBody(pack, "Instagram Reels", hashtags)
      },
      {
        id: "tiktok-lesson",
        label: "TikTok Lesson",
        channel: "TikTok",
        description: "Fast-hook social lesson file for creator workflows.",
        filename: `${filenameBase}-tiktok.md`,
        mimeType: "text/markdown;charset=utf-8",
        body: buildChannelBody(pack, "TikTok", hashtags)
      },
      {
        id: "production-board",
        label: "Production Board",
        channel: "Studio",
        description: "Shot cards, thumbnail plan, readiness signals, and recording checklist.",
        filename: `${filenameBase}-production-board.md`,
        mimeType: "text/markdown;charset=utf-8",
        body: buildProductionBriefBody(pack)
      },
      {
        id: "teleprompter",
        label: "Teleprompter",
        channel: "Studio",
        description: "Large-copy narration pass for recording the cut.",
        filename: `${filenameBase}-teleprompter.txt`,
        mimeType: "text/plain;charset=utf-8",
        body: buildTeleprompterBody(pack)
      },
      {
        id: "shot-list",
        label: "Shot List CSV",
        channel: "Studio",
        description: "Spreadsheet-ready shot list for editor or production handoff.",
        filename: `${filenameBase}-shot-list.csv`,
        mimeType: "text/csv;charset=utf-8",
        body: buildShotListCsv(pack)
      }
    ]
  };
}

export function buildWinecastCutPack(episode: WinecastCutInput): MediaCutPack {
  const beats = episode.learningPoints.slice(0, 3);
  const hashtags = episode.keywords.slice(0, 4).map(toTag);
  const keywordTags = hashtags.slice(0, 3).join(" ");
  const closingKeyword = episode.keywords[0] ?? episode.theme;

  const basePack = {
    label: "Winecast Cut Pack",
    title: `${episode.episodeLabel}: ${episode.theme}`,
    hook: compactText(`${episode.theme}: ${episode.summary}`, 170),
    runtime: "30-60 sec",
    beats,
    caption: compactText(`${episode.title} turns ${episode.theme} into a study-ready tasting and theory drill. ${keywordTags}`, 190),
    transcriptSeed: [
      `Open with ${episode.theme} as the central question.`,
      ...beats.map((beat) => compactText(beat, 120)),
      `Close by sending learners to review ${closingKeyword}.`
    ]
  };

  return withExports({
    ...basePack,
    productionBoard: buildProductionBoard(basePack, hashtags)
  }, `${episode.episodeLabel}-${episode.theme}`, hashtags);
}

export function buildDailySipCutPack(report: DailySipReport): MediaCutPack {
  const leadArticle = report.articles[0];
  const topCategories = report.coverage.slice(0, 4).join(", ") || "beverage market";
  const hashtags = ["Daily Sip", ...report.coverage.slice(0, 3)].map(toTag);
  const beats = [
    leadArticle ? `Lead signal: ${leadArticle.title}` : "Lead signal: no ranked article is available yet.",
    report.marketThemes[0]?.body ?? report.executiveSummary[0] ?? report.subtitle,
    report.watchlist[0] ?? "Check primary sources before changing menu, shelf, pricing, or compliance language."
  ].map((beat) => compactText(beat, 150));

  const basePack = {
    label: "Daily Sip Cut Pack",
    title: `${report.title.replace(/^Daily Sip:\s*/i, "")}`,
    hook: compactText(`${topCategories}: ${report.executiveSummary[0] ?? report.subtitle}`, 170),
    runtime: "45-75 sec",
    beats,
    caption: compactText(`Daily Sip scanned ${report.sourceCount} sources and ranked ${report.articleCount} beverage signals for staff training, menu language, and market awareness.`, 190),
    transcriptSeed: [
      `Open with the day\'s strongest categories: ${topCategories}.`,
      ...beats,
      "Close with one source-check action before the team changes language or buying decisions."
    ]
  };

  return withExports({
    ...basePack,
    productionBoard: buildProductionBoard(basePack, hashtags)
  }, report.title, hashtags);
}
