import fs from "node:fs";
import path from "node:path";

const sourcePath = path.resolve("docs", "resume", "SIP_STUDIES_FOUNDER_RESUME_DRAFT_2026-05-25.md");
const outPath = path.resolve("docs", "resume", "SIP_STUDIES_FOUNDER_RESUME_DRAFT_2026-05-25.pdf");

const page = {
  width: 612,
  height: 792,
  marginX: 42,
  marginTop: 36,
  marginBottom: 34,
  textWidth: 528
};

const colors = {
  ink: [0.09, 0.13, 0.15],
  muted: [0.33, 0.42, 0.46],
  accent: [0.04, 0.35, 0.42],
  rule: [0.72, 0.80, 0.82]
};

function escapePdf(value) {
  return String(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function color(value, op = "rg") {
  return `${value.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function wrapText(text, width, size) {
  const words = String(text).replace(/\*\*/g, "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  const avgChar = size * 0.49;
  const maxChars = Math.max(18, Math.floor(width / avgChar));

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

class PdfDoc {
  constructor() {
    this.pages = [];
    this.newPage();
  }

  newPage() {
    this.current = [];
    this.pages.push(this.current);
    this.y = page.marginTop;
  }

  ensure(height) {
    if (this.y + height > page.height - page.marginBottom) {
      this.newPage();
    }
  }

  line(x1, yTop, x2, yTop2, stroke = colors.rule) {
    const y1 = page.height - yTop;
    const y2 = page.height - yTop2;
    this.current.push("q", color(stroke, "RG"), `0.7 w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`, "Q");
  }

  text(x, yTop, value, opts = {}) {
    const size = opts.size || 9;
    const font = opts.bold ? "F2" : "F1";
    const fill = opts.color || colors.ink;
    const y = page.height - yTop - size;
    this.current.push(
      "BT",
      color(fill, "rg"),
      `/${font} ${size.toFixed(1)} Tf`,
      `${x.toFixed(2)} ${y.toFixed(2)} Td`,
      `(${escapePdf(value)}) Tj`,
      "ET"
    );
  }

  paragraph(text, opts = {}) {
    const size = opts.size || 8.8;
    const indent = opts.indent || 0;
    const width = page.textWidth - indent;
    const lines = wrapText(text, width, size);
    const lineHeight = opts.lineHeight || size * 1.28;
    this.ensure(lines.length * lineHeight + (opts.after || 5));

    for (const line of lines) {
      this.text(page.marginX + indent, this.y, line, {
        size,
        bold: opts.bold,
        color: opts.color || colors.ink
      });
      this.y += lineHeight;
    }

    this.y += opts.after ?? 5;
  }

  bullet(text) {
    const size = 8.35;
    const lines = wrapText(text, page.textWidth - 18, size);
    const lineHeight = 10.3;
    this.ensure(lines.length * lineHeight + 3);
    this.text(page.marginX, this.y, "-", { size, color: colors.accent, bold: true });
    lines.forEach((line, index) => {
      this.text(page.marginX + 14, this.y + index * lineHeight, line, { size, color: colors.ink });
    });
    this.y += lines.length * lineHeight + 3;
  }

  section(title) {
    this.ensure(24);
    this.y += this.y === page.marginTop ? 0 : 5;
    this.text(page.marginX, this.y, title.toUpperCase(), { size: 9.2, bold: true, color: colors.accent });
    this.y += 12;
    this.line(page.marginX, this.y, page.marginX + page.textWidth, this.y);
    this.y += 7;
  }
}

function renderMarkdown(markdown) {
  const doc = new PdfDoc();
  const lines = markdown.split(/\r?\n/);

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      doc.y += 3;
      continue;
    }

    if (line.startsWith("# ")) {
      doc.text(page.marginX, doc.y, line.slice(2).replace(/\[|\]/g, ""), {
        size: 18,
        bold: true,
        color: colors.accent
      });
      doc.y += 22;
      continue;
    }

    if (line.startsWith("## ")) {
      doc.section(line.slice(3));
      continue;
    }

    if (line.startsWith("- ")) {
      doc.bullet(line.slice(2));
      continue;
    }

    if (line.startsWith("**") && line.includes("** | ")) {
      doc.paragraph(line.replace(/\*\*/g, ""), { size: 8.8, bold: true, color: colors.ink, after: 3 });
      continue;
    }

    if (line.startsWith("**")) {
      doc.paragraph(line.replace(/\*\*/g, ""), { size: 9.2, bold: true, color: colors.ink, after: 2 });
      continue;
    }

    doc.paragraph(line, { size: 8.55, color: line.startsWith("[") ? colors.muted : colors.ink, after: 4 });
  }

  return doc.pages;
}

function pdfObject(id, body) {
  return `${id} 0 obj\n${body}\nendobj\n`;
}

function writePdf(pageStreams) {
  const objects = [];
  objects[1] = pdfObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects[3] = pdfObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects[4] = pdfObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds = [];
  let id = 5;
  for (const commands of pageStreams) {
    const content = `${commands.join("\n")}\n`;
    const contentId = id++;
    const pageId = id++;
    pageIds.push(pageId);
    objects[contentId] = pdfObject(contentId, `<< /Length ${Buffer.byteLength(content, "utf8")} >>\nstream\n${content}endstream`);
    objects[pageId] = pdfObject(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
  }

  objects[2] = pdfObject(2, `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((pageId) => `${pageId} 0 R`).join(" ")}] >>`);

  const header = "%PDF-1.4\n";
  const chunks = [header];
  const offsets = [0];
  let offset = Buffer.byteLength(header, "utf8");

  for (let objectId = 1; objectId < objects.length; objectId += 1) {
    offsets[objectId] = offset;
    chunks.push(objects[objectId]);
    offset += Buffer.byteLength(objects[objectId], "utf8");
  }

  const xrefOffset = offset;
  const xref = ["xref", `0 ${objects.length}`, "0000000000 65535 f "];
  for (let objectId = 1; objectId < objects.length; objectId += 1) {
    xref.push(`${String(offsets[objectId]).padStart(10, "0")} 00000 n `);
  }

  chunks.push(`${xref.join("\n")}\ntrailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);
  fs.writeFileSync(outPath, chunks.join(""));
}

const markdown = fs.readFileSync(sourcePath, "utf8");
const pages = renderMarkdown(markdown);
writePdf(pages);

console.log(`Wrote ${outPath}`);
console.log(`Pages: ${pages.length}`);
