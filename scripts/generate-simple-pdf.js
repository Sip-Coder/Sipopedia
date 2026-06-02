#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

function usage() {
  console.error("Usage: node scripts/generate-simple-pdf.js <input.txt|md> <output.pdf>");
  process.exit(1);
}

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) usage();

const absInput = path.resolve(inputPath);
const absOutput = path.resolve(outputPath);

if (!fs.existsSync(absInput)) {
  console.error(`Input file not found: ${absInput}`);
  process.exit(1);
}

function decodeHtmlEntities(value) {
  const namedEntities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: "\""
  };

  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }

    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }

    return namedEntities[entity.toLowerCase()] ?? match;
  });
}

function htmlToText(value) {
  return decodeHtmlEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<li[^>]*>/gi, "- ")
      .replace(/<\/(h[1-6]|p|div|tr|li|ul|ol|table|thead|tbody|section|main)>/gi, "\n")
      .replace(/<\/t[dh]>/gi, " | ")
      .replace(/<[^>]+>/g, "")
  )
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line, index, lines) => line.length > 0 || lines[index - 1]?.length > 0)
    .join("\n");
}

const raw = fs.readFileSync(absInput, "utf8").replace(/\r/g, "");
const source = path.extname(absInput).toLowerCase() === ".html" ? htmlToText(raw) : raw;
const sourceLines = source.split("\n");

const pageWidth = 612;
const pageHeight = 792;
const marginLeft = 54;
const marginTop = 54;
const marginBottom = 54;
const fontSize = 11;
const lineHeight = 14;
const charsPerLine = 96;
const startY = pageHeight - marginTop;
const minY = marginBottom;

function wrapLine(line, width) {
  if (line.length <= width) return [line];
  const out = [];
  let rest = line;
  while (rest.length > width) {
    let cut = rest.lastIndexOf(" ", width);
    if (cut < 0) cut = width;
    out.push(rest.slice(0, cut).trimEnd());
    rest = rest.slice(cut).trimStart();
  }
  out.push(rest);
  return out;
}

function escapePdfText(text) {
  return text.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

const wrappedLines = [];
for (const line of sourceLines) {
  if (line.length === 0) {
    wrappedLines.push("");
    continue;
  }
  const chunks = wrapLine(line, charsPerLine);
  wrappedLines.push(...chunks);
}

const pages = [];
let current = [];
let y = startY;
for (const line of wrappedLines) {
  if (y < minY) {
    pages.push(current);
    current = [];
    y = startY;
  }
  current.push(line);
  y -= lineHeight;
}
if (current.length > 0) pages.push(current);
if (pages.length === 0) pages.push([""]);

const objects = [];
const pageObjectIds = [];

// 1: catalog, 2: pages tree are reserved.
let nextId = 3;
const fontId = nextId++;

for (const pageLines of pages) {
  const pageId = nextId++;
  const contentId = nextId++;
  pageObjectIds.push(pageId);

  const contentStreamLines = [
    "BT",
    `/F1 ${fontSize} Tf`,
    `${lineHeight} TL`,
    `1 0 0 1 ${marginLeft} ${startY} Tm`
  ];

  for (const line of pageLines) {
    contentStreamLines.push(`(${escapePdfText(line)}) Tj`);
    contentStreamLines.push("T*");
  }
  contentStreamLines.push("ET");
  const contentStream = contentStreamLines.join("\n");

  objects.push({
    id: pageId,
    body: `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`
  });
  objects.push({
    id: contentId,
    body: `<< /Length ${Buffer.byteLength(contentStream, "utf8")} >>\nstream\n${contentStream}\nendstream`
  });
}

objects.unshift({
  id: 2,
  body: `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`
});
objects.unshift({
  id: 1,
  body: `<< /Type /Catalog /Pages 2 0 R >>`
});
objects.push({
  id: fontId,
  body: "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"
});

objects.sort((a, b) => a.id - b.id);

let pdf = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
const offsets = [];

for (const obj of objects) {
  offsets[obj.id] = Buffer.byteLength(pdf, "utf8");
  pdf += `${obj.id} 0 obj\n${obj.body}\nendobj\n`;
}

const xrefStart = Buffer.byteLength(pdf, "utf8");
const maxId = objects[objects.length - 1].id;
pdf += `xref\n0 ${maxId + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i <= maxId; i++) {
  const off = offsets[i] ?? 0;
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${maxId + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

fs.mkdirSync(path.dirname(absOutput), { recursive: true });
fs.writeFileSync(absOutput, Buffer.from(pdf, "utf8"));
console.log(`Wrote PDF: ${absOutput}`);
