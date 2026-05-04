import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

function escapePdfText(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildPdf(lines, title) {
  const body = [];
  body.push("BT");
  body.push("/F1 11 Tf");
  body.push("50 794 Td");
  body.push(`(${escapePdfText(title)}) Tj`);
  body.push("0 -16 Td");
  body.push("/F1 10 Tf");
  for (const line of lines) {
    body.push(`(${escapePdfText(line)}) Tj`);
    body.push("0 -13 Td");
  }
  body.push("ET");

  const contentStream = body.join("\n");
  const objects = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push("3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n");
  objects.push("4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");
  objects.push(`5 0 obj\n<< /Length ${Buffer.byteLength(contentStream, "utf8")} >>\nstream\n${contentStream}\nendstream\nendobj\n`);

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  for (const object of objects) {
    offsets.push(Buffer.byteLength(pdf, "utf8"));
    pdf += object;
  }

  const xrefOffset = Buffer.byteLength(pdf, "utf8");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return Buffer.from(pdf, "utf8");
}

const spiritCategories = [
  "Brandy",
  "Whiskey",
  "Rum",
  "Tequila",
  "Mezcal",
  "Vodka",
  "Gin",
  "Liqueurs and Amari"
];

const answerKey = {
  Brandy: ["Cognac", "Armagnac", "Pisco", "Calvados", "Grappa"],
  Whiskey: ["Scotch Whisky", "Bourbon", "Rye Whiskey", "Irish Whiskey", "Japanese Whisky"],
  Rum: ["White Rum", "Gold Rum", "Dark Rum", "Overproof Rum", "Rhum Agricole"],
  Tequila: ["Blanco", "Reposado", "Anejo", "Extra Anejo", "Cristalino"],
  Mezcal: ["Espadin", "Tobala", "Tepeztate", "Madrecuixe", "Ensamble"],
  Vodka: ["Wheat Vodka", "Rye Vodka", "Potato Vodka", "Corn Vodka", "Grape Vodka"],
  Gin: ["London Dry", "Plymouth", "Old Tom", "Navy Strength", "Contemporary Gin"],
  "Liqueurs and Amari": ["Triple Sec", "Chartreuse", "Amaro Nonino", "Campari", "Fernet-Branca"]
};

const worksheetLines = [
  "Name: ________________________________      Date: _____________________",
  "Instructions: List five spirits for each category.",
  ""
];
for (const category of spiritCategories) {
  worksheetLines.push(`${category}:`);
  for (let index = 1; index <= 5; index += 1) {
    worksheetLines.push(`${index}. _________________________________________________`);
  }
  worksheetLines.push("");
}

const answerLines = [
  "Name: ________________________________      Date: _____________________",
  "Answer Key: Five examples for each spirit category.",
  ""
];
for (const category of spiritCategories) {
  answerLines.push(`${category}:`);
  const entries = answerKey[category];
  entries.forEach((entry, index) => {
    answerLines.push(`${index + 1}. ${entry}`);
  });
  answerLines.push("");
}

const worksheetPdf = buildPdf(worksheetLines, "Sip Studies - Spirits Category Worksheet");
const answerPdf = buildPdf(answerLines, "Sip Studies - Spirits Category Worksheet Answer Key");

const worksheetPath = resolve("public/resources/spirits-category-worksheet.pdf");
const answerPath = resolve("public/resources/spirits-category-answer-key.pdf");

mkdirSync(dirname(worksheetPath), { recursive: true });
writeFileSync(worksheetPath, worksheetPdf);
writeFileSync(answerPath, answerPdf);

console.log(`Wrote ${worksheetPath}`);
console.log(`Wrote ${answerPath}`);
