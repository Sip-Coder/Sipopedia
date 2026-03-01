import { useMemo, useState } from "react";
import {
  extractedGuildQuestions,
  guildReferenceCatalog,
  type ExtractedGuildQuestion
} from "../data/guildExtractedQuestions";
import tartanPattern from "../assets/brand/tartan-pattern.png";

type BeverageType = "wine" | "beer" | "spirits" | "coffee" | "tea" | "fruit";
type GuildStandard = "Foundations" | "Production" | "Sensory" | "Service" | "Pairing" | "Quality";
type TopicCategoryGroup = "core" | "reference" | "standard";

type RankedQuestion = {
  row: ExtractedGuildQuestion;
  score: number;
  randomness: number;
};

type TopicCategory = {
  id: string;
  label: string;
  query: string;
  group: TopicCategoryGroup;
};

type QuizReportRow = {
  question: ExtractedGuildQuestion;
  selectedIndex: number | null;
  correctIndex: number | null;
  isCorrect: boolean;
};

const standardOrder: GuildStandard[] = ["Foundations", "Production", "Sensory", "Service", "Pairing", "Quality"];

function sanitizeTopic(topic: string) {
  return topic.trim().replace(/\s+/g, " ");
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 3);
}

function similarity(left: string, right: string) {
  const a = new Set(tokenize(left));
  const b = new Set(tokenize(right));
  if (!a.size || !b.size) return 0;
  let hit = 0;
  a.forEach((token) => {
    if (b.has(token)) hit += 1;
  });
  return hit / (a.size + b.size - hit);
}

function topicScore(row: ExtractedGuildQuestion, topicTokens: string[]) {
  if (topicTokens.length === 0) return 1;
  const hay = `${row.question} ${row.options.join(" ")}`.toLowerCase();
  let score = 0;
  topicTokens.forEach((token) => {
    if (hay.includes(token)) score += 2;
  });
  return score;
}

function rankRows(rows: ExtractedGuildQuestion[], topicTokens: string[]) {
  const ranked: RankedQuestion[] = rows.map((row) => ({
    row,
    score: topicScore(row, topicTokens),
    randomness: Math.random()
  }));
  ranked.sort((left, right) => right.score - left.score || left.randomness - right.randomness);
  return ranked;
}

function selectExamQuestions(beverage: BeverageType, topicQuery: string, preferredSourceCategory?: string) {
  const topicTokens = tokenize(sanitizeTopic(topicQuery));
  const beverageMatches = extractedGuildQuestions.filter((row) => row.beverages.includes(beverage));
  const beveragePool = beverageMatches.length > 0 ? beverageMatches : extractedGuildQuestions;
  const categoryPool =
    preferredSourceCategory && preferredSourceCategory.length > 0
      ? beveragePool.filter((row) => row.sourceCategory.toLowerCase() === preferredSourceCategory.toLowerCase())
      : beveragePool;
  const primaryPool = categoryPool.length > 0 ? categoryPool : beveragePool;
  const rankedPrimary = rankRows(primaryPool, topicTokens);
  const rankedSecondary = rankRows(extractedGuildQuestions, topicTokens);

  const focusedPrimary =
    topicTokens.length > 0 && rankedPrimary.some((item) => item.score > 0)
      ? rankedPrimary.filter((item) => item.score > 0)
      : rankedPrimary;

  const selected: ExtractedGuildQuestion[] = [];
  const usedIds = new Set<string>();
  const usedQuestionText: string[] = [];

  const canAdd = (row: ExtractedGuildQuestion) => {
    if (usedIds.has(row.id)) return false;
    if (usedQuestionText.some((text) => similarity(text, row.question) > 0.72)) return false;
    return true;
  };

  const addIfAllowed = (row: ExtractedGuildQuestion) => {
    if (!canAdd(row)) return false;
    selected.push(row);
    usedIds.add(row.id);
    usedQuestionText.push(row.question);
    return true;
  };

  standardOrder.forEach((standard) => {
    const standardMatch = focusedPrimary.find((item) => item.row.standard === standard && canAdd(item.row));
    if (standardMatch) addIfAllowed(standardMatch.row);
  });

  focusedPrimary.forEach((item) => {
    if (selected.length >= 20) return;
    addIfAllowed(item.row);
  });

  rankedPrimary.forEach((item) => {
    if (selected.length >= 20) return;
    addIfAllowed(item.row);
  });

  rankedSecondary.forEach((item) => {
    if (selected.length >= 20) return;
    addIfAllowed(item.row);
  });

  return selected.slice(0, 20);
}

function questionLabel(index: number) {
  return `Q${String(index + 1).padStart(2, "0")}`;
}

function optionLabel(index: number) {
  return String.fromCharCode(65 + index);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildTopicCategories() {
  const categories: TopicCategory[] = [{ id: "all", label: "All Categories", query: "", group: "core" }];

  Array.from(new Set(guildReferenceCatalog.map((item) => item.sourceCategory)))
    .sort((left, right) => left.localeCompare(right))
    .forEach((sourceCategory) => {
      categories.push({
        id: `reference-${slugify(sourceCategory)}`,
        label: `Category: ${sourceCategory}`,
        query: sourceCategory,
        group: "reference"
      });
    });

  standardOrder.forEach((standard) => {
    categories.push({
      id: `standard-${slugify(standard)}`,
      label: `Standard: ${standard}`,
      query: standard,
      group: "standard"
    });
  });

  return categories;
}

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function BeverageQuiz() {
  const [beverage, setBeverage] = useState<BeverageType>("wine");
  const [topicCategoryId, setTopicCategoryId] = useState("all");
  const [questions, setQuestions] = useState<ExtractedGuildQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [notice, setNotice] = useState("");

  const topicCategories = useMemo(() => buildTopicCategories(), []);
  const topicCategoryMap = useMemo(() => new Map(topicCategories.map((category) => [category.id, category])), [topicCategories]);
  const selectedTopicCategory = topicCategoryMap.get(topicCategoryId) ?? topicCategories[0];

  const standardBreakdown = useMemo(() => {
    const counts = new Map<GuildStandard, number>();
    standardOrder.forEach((standard) => counts.set(standard, 0));
    questions.forEach((row) => {
      counts.set(row.standard, (counts.get(row.standard) ?? 0) + 1);
    });
    return standardOrder
      .map((standard) => ({ standard, count: counts.get(standard) ?? 0 }))
      .filter((entry) => entry.count > 0);
  }, [questions]);

  const reportRows = useMemo<QuizReportRow[]>(
    () =>
      questions.map((question) => {
        const selectedIndex = Object.prototype.hasOwnProperty.call(answers, question.id) ? answers[question.id] : null;
        const correctIndex = question.correctOptionIndex;
        return {
          question,
          selectedIndex,
          correctIndex,
          isCorrect: selectedIndex !== null && correctIndex !== null && selectedIndex === correctIndex
        };
      }),
    [questions, answers]
  );

  const scoreSummary = useMemo(() => {
    const answered = reportRows.filter((row) => row.selectedIndex !== null).length;
    const correct = reportRows.filter((row) => row.isCorrect).length;
    return { answered, correct };
  }, [reportRows]);

  const groupedTopicCategories = useMemo(
    () => ({
      references: topicCategories.filter((category) => category.group === "reference"),
      standards: topicCategories.filter((category) => category.group === "standard")
    }),
    [topicCategories]
  );

  const generateExam = () => {
    const preferredSourceCategory = selectedTopicCategory.group === "reference" ? selectedTopicCategory.query : undefined;
    const topicQuery = selectedTopicCategory.group === "standard" ? selectedTopicCategory.query : "";
    const selected = selectExamQuestions(beverage, topicQuery, preferredSourceCategory);
    setQuestions(selected);
    setAnswers({});
    setShowCorrectAnswers(false);

    const topicLine =
      selectedTopicCategory && selectedTopicCategory.id !== "all"
        ? `topic category "${selectedTopicCategory.label}" prioritized, with non-redundant filtering applied`
        : "full guild coverage mode with non-redundant filtering applied";

    const directCategoryMatches =
      preferredSourceCategory !== undefined
        ? extractedGuildQuestions.filter(
            (row) => row.beverages.includes(beverage) && row.sourceCategory.toLowerCase() === preferredSourceCategory.toLowerCase()
          ).length
        : -1;

    const fallbackLine =
      preferredSourceCategory !== undefined && directCategoryMatches === 0
        ? `no direct matches for "${preferredSourceCategory}" were found for ${beverage}; backfilled from broader guild exam items`
        : extractedGuildQuestions.filter((row) => row.beverages.includes(beverage)).length < 20
          ? "limited direct matches for this beverage were backfilled from broader guild exam items"
          : "all questions sourced from beverage-matched exam items";

    setNotice(
      `Generated ${selected.length} questions from exact extracted language in local guild PDFs (${topicLine}; ${fallbackLine}; source files indexed: ${guildReferenceCatalog.length}).`
    );
  };

  const buildExamReportText = () => {
    const generatedAt = new Date().toLocaleString();
    const lines: string[] = [
      "Sip Studies - Beverage Quiz",
      `Generated: ${generatedAt}`,
      `Beverage: ${beverage}`,
      `Topic Category: ${selectedTopicCategory?.label ?? "All Categories"}`,
      `Score: ${scoreSummary.correct}/${questions.length} correct`,
      `Answered: ${scoreSummary.answered}/${questions.length}`,
      ""
    ];

    reportRows.forEach((row, index) => {
      const question = row.question;
      lines.push(`${questionLabel(index)}. ${question.question}`);
      question.options.forEach((option, optionIndex) => {
        const markers: string[] = [];
        if (row.selectedIndex === optionIndex) markers.push("YOUR");
        if (row.correctIndex === optionIndex) markers.push("CORRECT");
        const markerLine = markers.length > 0 ? ` [${markers.join(" | ")}]` : "";
        lines.push(`  ${optionLabel(optionIndex)}. ${option}${markerLine}`);
      });
      lines.push(`  Guild Standard: ${question.standard}`);
      lines.push(`  Source Category: ${question.sourceCategory}`);
      lines.push(`  Source Q#: ${question.sourceNumber}`);
      lines.push(`  Your Answer: ${row.selectedIndex !== null ? optionLabel(row.selectedIndex) : "No answer selected"}`);
      lines.push(`  Correct Answer: ${row.correctIndex !== null ? optionLabel(row.correctIndex) : "Unavailable"}`);
      lines.push(`  Result: ${row.selectedIndex === null ? "Unanswered" : row.isCorrect ? "Correct" : "Incorrect"}`);
      lines.push("");
    });

    return lines.join("\n");
  };

  const openEmailDraft = () => {
    if (questions.length === 0) return;
    const recipient = shareEmail.trim();
    const subject = `Sip Studies Quiz - ${beverage} (${questions.length} Questions)`;
    const body = buildExamReportText();
    const emailPath = recipient ? recipient : "";
    window.location.href = `mailto:${emailPath}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const exportExamAsPdf = () => {
    if (questions.length === 0) return;
    const generatedAt = new Date().toLocaleString();
    const origin = window.location.origin;
    const ruthligosWoff2 = `${origin}/fonts/ruthligos.woff2`;
    const ruthligosWoff = `${origin}/fonts/ruthligos.woff`;
    const ruthligosOtf = `${origin}/fonts/ruthligos.otf`;
    const tartanHeader =
      tartanPattern.startsWith("http://") || tartanPattern.startsWith("https://")
        ? tartanPattern
        : `${origin}${tartanPattern}`;
    const printableRows = reportRows
      .map((row, index) => {
        const optionRows = row.question.options
          .map((option, optionIndex) => {
            const classes = [
              row.correctIndex === optionIndex ? "correct" : "",
              row.selectedIndex === optionIndex ? "selected" : "",
              row.selectedIndex === optionIndex && row.correctIndex !== optionIndex ? "wrong" : ""
            ]
              .filter(Boolean)
              .join(" ");
            return `<li class="${classes}"><span class="key">${optionLabel(optionIndex)}</span><span>${escapeHtml(option)}</span></li>`;
          })
          .join("");

        const yourAnswer =
          row.selectedIndex !== null
            ? `${optionLabel(row.selectedIndex)}. ${escapeHtml(row.question.options[row.selectedIndex])}`
            : "No answer selected";
        const correctAnswer =
          row.correctIndex !== null
            ? `${optionLabel(row.correctIndex)}. ${escapeHtml(row.question.options[row.correctIndex])}`
            : "Unavailable";
        const resultLabel = row.selectedIndex === null ? "Unanswered" : row.isCorrect ? "Correct" : "Incorrect";

        return `
          <article class="question-card">
            <h3>${questionLabel(index)}. ${escapeHtml(row.question.question)}</h3>
            <ul>${optionRows}</ul>
            <p><strong>Your Answer:</strong> ${yourAnswer}</p>
            <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
            <p><strong>Result:</strong> ${resultLabel}</p>
            <p><strong>Guild Standard:</strong> ${escapeHtml(row.question.standard)} | <strong>Source Category:</strong> ${escapeHtml(row.question.sourceCategory)} | <strong>Source Q#:</strong> ${row.question.sourceNumber}</p>
          </article>
        `;
      })
      .join("");

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Sip Studies Quiz</title>
        <style>
          :root {
            --cream-main: #f4e8ce;
            --cream-card: #f8f1df;
            --line: #bda87f;
            --ink: #231d1a;
            --header-ink: #fdf2e1;
            --teal: #1f5f63;
          }
          @font-face {
            font-family: "Ruthligos";
            src:
              local("Ruthligos"),
              url("${ruthligosWoff2}") format("woff2"),
              url("${ruthligosWoff}") format("woff"),
              url("${ruthligosOtf}") format("opentype");
            font-display: swap;
          }
          html, body {
            margin: 0;
            padding: 0;
            font-family: "Outfit", Arial, sans-serif;
            color: var(--ink);
            background: var(--cream-main);
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sheet {
            margin: 0;
            min-height: 100vh;
            padding: 18mm 14mm;
            background: linear-gradient(180deg, #f4e8ce 0%, #f1e3c8 100%);
          }
          .report-header {
            margin-bottom: 14px;
            padding: 16px 18px;
            border-radius: 12px;
            border: 1px solid rgba(253, 242, 225, 0.55);
            color: var(--header-ink);
            background: #1f5f63;
            position: relative;
            overflow: hidden;
            box-shadow: 0 6px 16px rgba(40, 28, 16, 0.18);
          }
          .report-header-pattern {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.5;
            filter: saturate(0.9) contrast(1.05) brightness(0.7);
          }
          .report-header-content {
            position: relative;
            z-index: 1;
          }
          h1 {
            margin: 0 0 6px;
            font-family: "Ruthligos", "Outfit", Arial, sans-serif;
            font-size: 34px;
            font-weight: 400;
            letter-spacing: 0.01em;
          }
          .meta { margin-bottom: 18px; }
          .meta p { margin: 2px 0; }
          .report-header .meta { margin-bottom: 0; }
          .report-header .meta p { color: rgba(253, 242, 225, 0.95); }
          .question-card {
            border: 1px solid var(--line);
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 12px;
            background: var(--cream-card);
          }
          .question-card h3 { margin: 0 0 8px; font-size: 16px; }
          .question-card ul { margin: 0 0 8px; padding: 0; list-style: none; }
          .question-card li { display: grid; grid-template-columns: 24px 1fr; gap: 8px; padding: 4px 6px; border-radius: 6px; }
          .question-card li.correct { background: #e9f8f0; border: 1px solid #73be98; }
          .question-card li.selected { box-shadow: inset 0 0 0 1px #87bfc9; }
          .question-card li.wrong { background: #fbeeee; border: 1px solid #d28686; }
          .key { font-weight: 700; }
          @media print {
            .sheet { padding: 12mm; }
            .question-card { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <main class="sheet">
          <header class="report-header">
            <img class="report-header-pattern" src="${tartanHeader}" alt="" />
            <div class="report-header-content">
              <h1>Sip Studies Quiz</h1>
              <section class="meta">
                <p><strong>Generated:</strong> ${escapeHtml(generatedAt)}</p>
                <p><strong>Beverage:</strong> ${escapeHtml(beverage)}</p>
                <p><strong>Topic Category:</strong> ${escapeHtml(selectedTopicCategory?.label ?? "All Categories")}</p>
                <p><strong>Score:</strong> ${scoreSummary.correct}/${questions.length} correct</p>
                <p><strong>Answered:</strong> ${scoreSummary.answered}/${questions.length}</p>
              </section>
            </div>
          </header>
          ${printableRows}
        </main>
        <script>window.onload = function () { window.print(); };</script>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "noopener,noreferrer");
    if (!printWindow) {
      setNotice("Popup blocked by browser. Enable popups to export the quiz as PDF.");
      return;
    }
    try {
      printWindow.document.open();
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
    } catch {
      setNotice("Could not render printable PDF window. Please try again.");
      try {
        printWindow.close();
      } catch {
        // no-op
      }
    }
  };

  return (
    <section className="beverage-quiz">
      <div className="section-header">
        <h2>Beverage Quiz</h2>
        <p>Each new exam is generated from exact extracted language in local guild PDFs, with topic-category filtering.</p>
      </div>

      <div className="quiz-controls">
        <div className="quiz-control-row">
          <label htmlFor="quiz-beverage">Beverage</label>
          <select id="quiz-beverage" value={beverage} onChange={(event) => setBeverage(event.target.value as BeverageType)}>
            <option value="wine">Wine</option>
            <option value="beer">Beer</option>
            <option value="spirits">Spirits</option>
            <option value="coffee">Coffee</option>
            <option value="tea">Tea</option>
            <option value="fruit">Fruit</option>
          </select>
        </div>

        <div className="quiz-control-row quiz-topic-row">
          <label htmlFor="quiz-topic">Specific Topic Category (optional)</label>
          <select id="quiz-topic" value={topicCategoryId} onChange={(event) => setTopicCategoryId(event.target.value)}>
            <option value="all">All Categories</option>
            {groupedTopicCategories.references.length > 0 ? (
              <optgroup label="Reference Categories">
                {groupedTopicCategories.references.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </optgroup>
            ) : null}
            {groupedTopicCategories.standards.length > 0 ? (
              <optgroup label="Guild Standards">
                {groupedTopicCategories.standards.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </optgroup>
            ) : null}
          </select>
        </div>

        <div className="quiz-actions">
          <button className="btn btn-primary" onClick={generateExam}>
            Generate New Exam
          </button>
          {questions.length > 0 ? (
            <button className="btn btn-light" onClick={() => setShowCorrectAnswers((current) => !current)}>
              {showCorrectAnswers ? "Hide Answers" : "Reveal Answers"}
            </button>
          ) : null}
        </div>
      </div>

      {notice ? <p className="hint">{notice}</p> : null}

      {questions.length > 0 ? (
        <>
          <div className="quiz-meta">
            <p>Exam size: {questions.length} questions</p>
            <p>
              Standards:{" "}
              {standardBreakdown.map((entry) => `${entry.standard} (${entry.count})`).join(" | ")}
            </p>
            <p>
              Progress: {scoreSummary.correct}/{questions.length} correct | {scoreSummary.answered}/{questions.length} answered
            </p>
          </div>

          <ol className="quiz-question-list">
            {questions.map((question, questionIndex) => {
              const selected = answers[question.id];
              const correctOptionIndex = question.correctOptionIndex ?? -1;
              const hasCorrectAnswer = correctOptionIndex >= 0;
              return (
                <li key={`${question.id}-${questionIndex}`} className="quiz-question-card">
                  <p className="quiz-question-title">
                    <span>{questionLabel(questionIndex)}</span>
                    {question.question}
                  </p>
                  <p className="quiz-standard">
                    Guild Standard: {question.standard} | Source Category: {question.sourceCategory} | Source Q{question.sourceNumber}
                  </p>

                  <div className="quiz-options">
                    {question.options.map((option, optionIndex) => {
                      const isSelected = selected === optionIndex;
                      const isCorrect = showCorrectAnswers && hasCorrectAnswer && correctOptionIndex === optionIndex;
                      const isWrong = showCorrectAnswers && hasCorrectAnswer && isSelected && correctOptionIndex !== optionIndex;
                      const cls = ["quiz-option", isSelected ? "selected" : "", isCorrect ? "correct" : "", isWrong ? "wrong" : ""]
                        .filter(Boolean)
                        .join(" ");
                      return (
                        <label key={`${question.id}-${optionIndex}`} className={cls}>
                          <input
                            type="radio"
                            name={`${question.id}-${questionIndex}`}
                            checked={isSelected}
                            onChange={() => setAnswers((current) => ({ ...current, [question.id]: optionIndex }))}
                          />
                          <span className="quiz-option-key">{optionLabel(optionIndex)}</span>
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>

                  {showCorrectAnswers && hasCorrectAnswer ? (
                    <p className="quiz-answer-line">
                      Correct answer: {optionLabel(correctOptionIndex)}. {question.options[correctOptionIndex]}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ol>

          <section className="quiz-share-actions">
            <p>Share the full exam report with your selected answers and all correct answers.</p>
            <div className="quiz-share-row">
              <input
                type="email"
                value={shareEmail}
                onChange={(event) => setShareEmail(event.target.value)}
                placeholder="Recipient email (optional)"
              />
              <button className="btn btn-light" onClick={openEmailDraft}>
                Send To Email
              </button>
              <button className="btn btn-light" onClick={exportExamAsPdf}>
                Export As PDF
              </button>
            </div>
          </section>
        </>
      ) : null}
    </section>
  );
}
