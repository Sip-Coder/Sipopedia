import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("docs", "resume");
const BASE = "JON_YU_SIP_STUDIES_COMBINED_RESUME_2026-05-25";
const paths = {
  md: path.join(OUT_DIR, `${BASE}.md`),
  pdf: path.join(OUT_DIR, `${BASE}.pdf`),
  docx: path.join(OUT_DIR, `${BASE}.docx`),
  svg: path.join(OUT_DIR, `${BASE}_AFFINITY_SOURCE.svg`)
};

const images = {
  logo: path.resolve("docs/resume/resume-assets/sip-studies-logo-03-light.jpg"),
  sippy: path.resolve("docs/resume/resume-assets/sippy-guide.jpg"),
  roma: path.resolve("docs/resume/resume-assets/roma-guide.jpg"),
  hummin: path.resolve("docs/resume/resume-assets/hummin-coffee-02.jpg"),
  academy: path.resolve("docs/resume/resume-assets/academy-realm.jpg"),
  terroir: path.resolve("docs/resume/resume-assets/terroir-realm.jpg"),
  sippyScene: path.resolve("docs/resume/resume-assets/sippy-wine-press.jpg"),
  romaScene: path.resolve("docs/resume/resume-assets/roma-mash-tun.jpg"),
  humminScene: path.resolve("docs/resume/resume-assets/hummin-pot-still.jpg")
};

for (const [name, file] of Object.entries(images)) {
  if (!fs.existsSync(file)) {
    throw new Error(`Missing resume image ${name}: ${file}`);
  }
}

const resume = {
  name: "Jon Yu",
  headline: "Founder / Beverage Educator / Sales Consultant / AI Product Builder",
  contact: "Las Vegas, NV | sipstudies.com/resume | sipstudies.com | [email] | [phone]",
  summary:
    "Beverage educator and product builder combining 10+ years of wine and spirits sales, formal beverage credentials, architecture/design training, live-event production, and AI-enabled education technology. Founder of Sip Studies, a beverage learning platform built for wine, spirits, beer, maps, terminology, tasting practice, industry news, and distributor-style enablement.",
  strengths: [
    "Beverage education and curriculum design",
    "Wine, spirits, beer, and hospitality sales",
    "AI-assisted content and learning systems",
    "React/TypeScript product development",
    "Distributor, supplier, and customer enablement",
    "Architecture, visual design, and live-event production"
  ],
  certifications: [
    "MIT - Artificial Intelligence: Implications for Business Strategy",
    "Society of Wine Educators - Certified Wine Educator (CWE)",
    "Society of Wine Educators - Certified Specialist of Spirits (CSS)",
    "Court of Master Sommeliers - Level 2 Certified Sommelier",
    "WSET - Level 3 Wine",
    "WSET - Level 2 Spirits",
    "Wine Scholar Guild / Lustau - Certified Sherry Wine Specialist",
    "Cicerone - Certified Beer Server, Level 1"
  ],
  experience: [
    {
      company: "Sip Studies",
      role: "Founder, Product Lead, Beverage Education Platform Builder",
      dates: "2024 - Present",
      bullets: [
        "Designed and built a full-stack beverage education workspace across Learn, Taste, and Connect product areas, including Sip Academy, Sipopedia, Beverage Quiz, Maps, Flavor Wheel, Tasting Journal, Beverage News, AI Winecast, and Somm Events.",
        "Built a React, TypeScript, Vite, Supabase, Stripe, and Edge Function platform supporting auth, profiles, subscriptions, AI/news routing, terminology operations, and paid-access flows.",
        "Created a structured Sipopedia terminology pipeline with 20,000 JSONL candidate rows and a media-rich learning asset base featuring Sippy, Roma, Hummin, academy realms, game scenes, maps, and infographics."
      ]
    },
    {
      company: "On Location Experience",
      role: "VIP Experience Consultant",
      dates: "Sep 2021 - Present",
      bullets: [
        "Served UFC VIP Experience as the primary event portfolio while also supporting Slap, NFL, NHL, and NASCAR premium guest experiences."
      ]
    },
    {
      company: "Breakthru Beverage Group",
      role: "Sales Consultant - Off & On Premise Wine",
      dates: "Sep 2015 - Present",
      bullets: [
        "Grew fine wine placements, revived unsold SKUs, maintained supplier relationships, and brought an independent-account sales mindset into grocery and on-premise opportunities.",
        "Earned the 2018 Sales Consultant Excellence Award; expanded 3,500+ placements and increased wine revenue by $2,291,000 within Lee's Liquor.",
        "Built brand knowledge with colleagues and customers through regular education; earlier role included maintaining, managing, merchandising, and transferring BBG portfolio across chain and independent accounts."
      ]
    },
    {
      company: "AARP Colorado",
      role: "Wine Educator",
      dates: "Aug 2020 - 2024",
      bullets: [
        "Educator for Wine Walk Wednesdays online wine events, leading regional wine tours for 50+ active adults across live and recorded streams.",
        "Taught wine through location, terroir, grapes, styles, architecture, history, and cultural context."
      ]
    },
    {
      company: "Video Tech Services",
      role: "Lighting, Audio & Video Technician",
      dates: "Aug 2013 - Jan 2018",
      bullets: [
        "Lighting technician for stage productions, conventions, and casino events; audio/video technician for breakout meeting rooms and presentations.",
        "Event experience included Venetian-LinkedIn, Wynn-CES, Bellagio-Adobe, and Mandalay-Sage."
      ]
    },
    {
      company: "Total Wine & More",
      role: "Wine Associate",
      dates: "Sep 2013 - Sep 2015",
      bullets: [
        "Managed high-end customer wine sales, portfolios, cellar design support, and customer events.",
        "Wrote curriculum, instructed customer wine classes, tracked P&L, maintained high-end cellar presentation, and trained staff."
      ]
    },
    {
      company: "Architecture, Design & Drafting Foundation",
      role: "Architectural Intern / Draftsman / AutoCAD Consultant / Interior Design & Marketing",
      dates: "2008 - 2013",
      bullets: [
        "Produced field investigations, as-built drawings, construction documents, reflected ceiling plans, signage assembly drawings, and 3D models for design analysis and presentations.",
        "Worked across Craig Sean Palacios Architect, ATA Architecture, E-GADS!, Trinity Property Management, and Pasta China, including restaurant, casino, ADA renovation, signage, website, marketing, and interior-design projects."
      ]
    }
  ],
  education: [
    "Wentworth Institute of Technology - Bachelor of Science, Architecture"
  ],
  outcomes: [
    "Built and packaged a strategic acquisition narrative for Sip Studies around a $4.5M buyer-facing platform/IP thesis.",
    "Maintained a product repo with 69 Supabase migrations, 5 Supabase Edge Functions, and thousands of beverage learning/media assets.",
    "Converted research into durable playbooks, validation scripts, source-backed standards, generated assets, and buyer-ready presentation materials."
  ]
};

function writeMarkdown() {
  const lines = [
    `# ${resume.name}`,
    "",
    `**${resume.headline}**`,
    resume.contact,
    "",
    "## Profile",
    "",
    resume.summary,
    "",
    "## Core Strengths",
    "",
    ...resume.strengths.map((item) => `- ${item}`),
    "",
    "## Certifications",
    "",
    ...resume.certifications.map((item) => `- ${item}`),
    "",
    "## Experience",
    ""
  ];

  for (const job of resume.experience) {
    lines.push(`### ${job.company} - ${job.role}`);
    lines.push(`*${job.dates}*`);
    lines.push(...job.bullets.map((item) => `- ${item}`));
    lines.push("");
  }

  lines.push("## Education");
  lines.push("");
  lines.push(...resume.education.map((item) => `- ${item}`));
  lines.push("");
  lines.push("## Selected Sip Studies Outcomes");
  lines.push("");
  lines.push(...resume.outcomes.map((item) => `- ${item}`));
  lines.push("");

  fs.writeFileSync(paths.md, lines.join("\n"));
}

function pdfEscape(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function rgb(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255
  ];
}

const palette = {
  paper: rgb("F8F4EA"),
  ink: rgb("14252B"),
  muted: rgb("53696F"),
  teal: rgb("05313B"),
  teal2: rgb("0B4451"),
  gold: rgb("C4913C"),
  pale: rgb("E8D9B8"),
  line: rgb("B6C9C8"),
  blue: rgb("187D93")
};

function color(value, op = "rg") {
  return `${value.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function jpegSize(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xff) break;
    const marker = buffer[i + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const len = buffer.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("Could not read JPEG size");
}

const pdfImages = new Map();

function pdfImage(file) {
  const resolved = path.resolve(file);
  if (pdfImages.has(resolved)) return pdfImages.get(resolved);
  const data = fs.readFileSync(resolved);
  const size = jpegSize(data);
  const image = { key: `Im${pdfImages.size + 1}`, data, ...size };
  pdfImages.set(resolved, image);
  return image;
}

const page = { width: 612, height: 792 };

function rect(cmds, x, yTop, w, h, fill, stroke = null) {
  const y = page.height - yTop - h;
  cmds.push("q");
  if (fill) cmds.push(color(fill, "rg"));
  if (stroke) cmds.push(color(stroke, "RG"));
  cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill && stroke ? "B" : fill ? "f" : "S"}`);
  cmds.push("Q");
}

function text(cmds, x, yTop, value, opts = {}) {
  const size = opts.size || 9;
  const y = page.height - yTop - size;
  const font = opts.bold ? "F2" : "F1";
  cmds.push("BT", color(opts.color || palette.ink, "rg"), `/${font} ${size.toFixed(1)} Tf`, `${x.toFixed(2)} ${y.toFixed(2)} Td`, `(${pdfEscape(value)}) Tj`, "ET");
}

function wrap(value, width, size) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const max = Math.max(14, Math.floor(width / (size * 0.47)));
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function wrapped(cmds, x, y, width, rows, opts = {}) {
  let cursor = y;
  const size = opts.size || 8;
  for (const row of rows) {
    for (const line of wrap(row, width, size)) {
      text(cmds, x, cursor, line, opts);
      cursor += opts.lineGap || size * 1.28;
    }
    cursor += opts.gap ?? 2;
  }
  return cursor;
}

function image(cmds, pageState, file, x, yTop, w, h, mode = "cover") {
  const img = pdfImage(file);
  pageState.xobjects.add(img.key);
  const rectY = page.height - yTop - h;
  const scale = mode === "contain" ? Math.min(w / img.width, h / img.height) : Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = x + (w - dw) / 2;
  const dy = rectY + (h - dh) / 2;
  cmds.push(`q ${x.toFixed(2)} ${rectY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re W n ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /${img.key} Do Q`);
}

function heading(cmds, x, y, title) {
  text(cmds, x, y, title.toUpperCase(), { size: 8.6, bold: true, color: palette.teal2 });
  rect(cmds, x, y + 12, 396, 0.8, palette.line);
}

function bulletBlock(cmds, x, y, width, bullets, size = 7.3) {
  let cursor = y;
  for (const item of bullets) {
    text(cmds, x, cursor, "-", { size, bold: true, color: palette.gold });
    cursor = wrapped(cmds, x + 9, cursor, width - 9, [item], { size, color: palette.ink, lineGap: size * 1.22, gap: 1 });
  }
  return cursor;
}

function job(cmds, x, y, width, item, maxBullets = item.bullets.length) {
  text(cmds, x, y, item.company, { size: 9.3, bold: true, color: palette.ink });
  text(cmds, x, y + 11, `${item.role} | ${item.dates}`, { size: 7.5, color: palette.muted });
  return bulletBlock(cmds, x, y + 24, width, item.bullets.slice(0, maxBullets), 7.15) + 2;
}

function sidebarCerts(cmds, x, y) {
  text(cmds, x, y, "CERTIFICATIONS", { size: 8.5, bold: true, color: palette.pale });
  let cursor = y + 16;
  for (const cert of resume.certifications) {
    cursor = wrapped(cmds, x, cursor, 124, [cert], { size: 6.55, color: palette.pale, lineGap: 8.2, gap: 3 });
  }
}

function renderPdfPageOne() {
  const state = { xobjects: new Set() };
  const cmds = [];
  rect(cmds, 0, 0, page.width, page.height, palette.paper);
  rect(cmds, 0, 0, 176, page.height, palette.teal);
  image(cmds, state, images.logo, 28, 28, 118, 64, "contain");
  image(cmds, state, images.sippy, 28, 108, 52, 74, "cover");
  image(cmds, state, images.roma, 82, 108, 52, 74, "cover");
  image(cmds, state, images.hummin, 55, 188, 64, 78, "cover");
  text(cmds, 26, 286, "BEVERAGE + PRODUCT", { size: 8, bold: true, color: palette.gold });
  wrapped(cmds, 26, 303, 124, resume.strengths.slice(0, 5), { size: 6.8, color: palette.pale, lineGap: 8.8, gap: 4 });
  sidebarCerts(cmds, 26, 454);

  text(cmds, 202, 38, resume.name, { size: 28, bold: true, color: palette.teal });
  wrapped(cmds, 204, 72, 380, [resume.headline], { size: 10, bold: true, color: palette.gold, lineGap: 12, gap: 0 });
  wrapped(cmds, 204, 91, 380, [resume.contact], { size: 7.4, color: palette.muted, lineGap: 9 });
  heading(cmds, 204, 124, "Profile");
  wrapped(cmds, 204, 142, 370, [resume.summary], { size: 7.45, color: palette.ink, lineGap: 9.5, gap: 0 });
  heading(cmds, 204, 216, "Experience");
  let y = 234;
  y = job(cmds, 204, y, 372, resume.experience[0], 3);
  y = job(cmds, 204, y + 4, 372, resume.experience[1], 3);
  y = job(cmds, 204, y + 4, 372, resume.experience[2], 2);
  return { stream: `${cmds.join("\n")}\n`, xobjects: state.xobjects };
}

function renderPdfPageTwo() {
  const state = { xobjects: new Set() };
  const cmds = [];
  rect(cmds, 0, 0, page.width, page.height, palette.paper);
  rect(cmds, 0, 0, 176, page.height, palette.teal);
  image(cmds, state, images.academy, 20, 28, 136, 92, "cover");
  image(cmds, state, images.sippyScene, 20, 136, 136, 82, "cover");
  image(cmds, state, images.romaScene, 20, 232, 136, 82, "cover");
  image(cmds, state, images.humminScene, 20, 328, 136, 82, "cover");
  text(cmds, 26, 444, "EDUCATION", { size: 8.5, bold: true, color: palette.pale });
  wrapped(cmds, 26, 462, 124, resume.education, { size: 7, color: palette.pale, lineGap: 9, gap: 4 });
  text(cmds, 26, 526, "TOOLS / DOMAINS", { size: 8.5, bold: true, color: palette.pale });
  wrapped(cmds, 26, 544, 124, ["React + TypeScript", "Supabase + Stripe", "AI content systems", "Wine, spirits, beer", "Architecture + AutoCAD", "Live event production"], { size: 6.8, color: palette.pale, lineGap: 8.8, gap: 3 });

  text(cmds, 204, 36, `${resume.name} - Combined Resume`, { size: 14, bold: true, color: palette.teal });
  text(cmds, 204, 54, "Experience continued, education, and selected Sip Studies outcomes", { size: 7.5, color: palette.muted });
  heading(cmds, 204, 82, "Experience Continued");
  let y = 100;
  y = job(cmds, 204, y, 372, resume.experience[3], 2);
  y = job(cmds, 204, y + 3, 372, resume.experience[4], 1);
  y = job(cmds, 204, y + 3, 372, resume.experience[5], 2);
  y = job(cmds, 204, y + 3, 372, resume.experience[6], 2);
  heading(cmds, 204, y + 6, "Selected Sip Studies Outcomes");
  bulletBlock(cmds, 204, y + 24, 372, resume.outcomes, 7.25);
  return { stream: `${cmds.join("\n")}\n`, xobjects: state.xobjects };
}

function pdfObj(id, body) {
  const bodyBuffer = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
  return Buffer.concat([Buffer.from(`${id} 0 obj\n`, "utf8"), bodyBuffer, Buffer.from("\nendobj\n", "utf8")]);
}

function pdfStream(id, dict, data) {
  const dataBuffer = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
  return pdfObj(id, Buffer.concat([Buffer.from(`<< ${dict} /Length ${dataBuffer.length} >>\nstream\n`, "utf8"), dataBuffer, Buffer.from("\nendstream", "utf8")]));
}

function writePdf() {
  const pages = [renderPdfPageOne(), renderPdfPageTwo()];
  const imageRecords = [...pdfImages.values()];
  const imageIds = new Map();
  let next = 5;
  imageRecords.forEach((img) => imageIds.set(img.key, next++));
  const pageRecords = pages.map((pdfPage) => ({ ...pdfPage, contentId: next++, pageId: next++ }));
  const objects = [];
  objects[1] = pdfObj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects[3] = pdfObj(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects[4] = pdfObj(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  imageRecords.forEach((img) => {
    objects[imageIds.get(img.key)] = pdfStream(imageIds.get(img.key), `/Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`, img.data);
  });
  pageRecords.forEach((pdfPage) => {
    objects[pdfPage.contentId] = pdfStream(pdfPage.contentId, "", pdfPage.stream);
    const xobj = [...pdfPage.xobjects].map((key) => `/${key} ${imageIds.get(key)} 0 R`).join(" ");
    objects[pdfPage.pageId] = pdfObj(pdfPage.pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << ${xobj} >> >> /Contents ${pdfPage.contentId} 0 R >>`);
  });
  objects[2] = pdfObj(2, `<< /Type /Pages /Count 2 /Kids [${pageRecords.map((p) => `${p.pageId} 0 R`).join(" ")}] >>`);
  const header = Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary");
  const chunks = [header];
  const offsets = [0];
  let offset = header.length;
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = offset;
    chunks.push(objects[i]);
    offset += objects[i].length;
  }
  const xrefOffset = offset;
  const xref = ["xref", `0 ${objects.length}`, "0000000000 65535 f "];
  for (let i = 1; i < objects.length; i += 1) xref.push(`${String(offsets[i]).padStart(10, "0")} 00000 n `);
  chunks.push(Buffer.from(`${xref.join("\n")}\ntrailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`, "utf8"));
  fs.writeFileSync(paths.pdf, Buffer.concat(chunks));
}

function xmlEscape(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}

function docPara(textValue, opts = {}) {
  const style = opts.style ? `<w:pStyle w:val="${opts.style}"/>` : "";
  const bullet = opts.bullet ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : "";
  const breakXml = opts.pageBreak ? '<w:r><w:br w:type="page"/></w:r>' : "";
  const bold = opts.bold ? "<w:b/>" : "";
  const colorXml = opts.color ? `<w:color w:val="${opts.color}"/>` : "";
  const size = opts.size ? `<w:sz w:val="${opts.size}"/><w:szCs w:val="${opts.size}"/>` : "";
  return `<w:p><w:pPr>${style}${bullet}</w:pPr>${breakXml}<w:r><w:rPr>${bold}${colorXml}${size}</w:rPr><w:t xml:space="preserve">${xmlEscape(textValue)}</w:t></w:r></w:p>`;
}

function docImage(relId, cx, cy) {
  return `<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="${cx}" cy="${cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${relId.replace("rId", "")}" name="Resume Image"/><wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="image.jpg"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relId}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function contentTypesDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
}

function rootRelsDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
}

function stylesDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="18"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:color w:val="05313B"/><w:sz w:val="34"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:rPr><w:b/><w:color w:val="0B4451"/><w:sz w:val="21"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="Heading 2"/><w:rPr><w:b/><w:color w:val="14252B"/><w:sz w:val="19"/></w:rPr></w:style></w:styles>`;
}

function numberingDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="-"/><w:pPr><w:ind w:left="360" w:hanging="180"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
}

function coreDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Jon Yu Combined Resume</dc:title><dc:creator>OpenAI Codex</dc:creator><cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:modified></cp:coreProperties>`;
}

function appDocx() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>OpenAI Codex</Application><Company>Sip Studies</Company></Properties>`;
}

function docxDocument() {
  const rels = [
    ["rId4", "media/sip-studies-logo.jpg", images.logo],
    ["rId5", "media/sippy-guide.jpg", images.sippy],
    ["rId6", "media/roma-guide.jpg", images.roma],
    ["rId7", "media/hummin-guide.jpg", images.hummin],
    ["rId8", "media/academy-realm.jpg", images.academy]
  ];
  const body = [
    docImage("rId4", 1600000, 720000),
    docPara(resume.name, { style: "Title" }),
    docPara(resume.headline, { bold: true, color: "C4913C", size: 22 }),
    docPara(resume.contact, { color: "53696F", size: 17 }),
    docPara("Profile", { style: "Heading1" }),
    docPara(resume.summary),
    docPara("Core Strengths", { style: "Heading1" }),
    ...resume.strengths.map((item) => docPara(item, { bullet: true })),
    docPara("Certifications", { style: "Heading1" }),
    ...resume.certifications.map((item) => docPara(item, { bullet: true })),
    docImage("rId5", 720000, 860000),
    docImage("rId6", 720000, 860000),
    docImage("rId7", 720000, 860000),
    docPara("", { pageBreak: true }),
    docImage("rId8", 2200000, 900000),
    docPara("Experience", { style: "Heading1" })
  ];
  for (const jobItem of resume.experience) {
    body.push(docPara(`${jobItem.company} - ${jobItem.role}`, { style: "Heading2" }));
    body.push(docPara(jobItem.dates, { color: "53696F", size: 17 }));
    body.push(...jobItem.bullets.map((item) => docPara(item, { bullet: true })));
  }
  body.push(docPara("Education", { style: "Heading1" }));
  body.push(...resume.education.map((item) => docPara(item, { bullet: true })));
  body.push(docPara("Selected Sip Studies Outcomes", { style: "Heading1" }));
  body.push(...resume.outcomes.map((item) => docPara(item, { bullet: true })));

  const xml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body.join("")}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const relXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>${rels.map(([id, target]) => `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${target}"/>`).join("")}</Relationships>`;
  return { xml, relXml, rels };
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(v) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(v);
  return b;
}

function u32(v) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(v >>> 0);
  return b;
}

function zipStore(files) {
  const local = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of files) {
    const nameBuffer = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(data);
    const localHeader = Buffer.concat([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBuffer.length), u16(0), nameBuffer]);
    local.push(localHeader, data);
    central.push(Buffer.concat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBuffer.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBuffer]));
    offset += localHeader.length + data.length;
  }
  const centralDir = Buffer.concat(central);
  return Buffer.concat([...local, centralDir, Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(centralDir.length), u32(offset), u16(0)])]);
}

function writeDocx() {
  const doc = docxDocument();
  const files = [
    ["[Content_Types].xml", contentTypesDocx()],
    ["_rels/.rels", rootRelsDocx()],
    ["docProps/core.xml", coreDocx()],
    ["docProps/app.xml", appDocx()],
    ["word/document.xml", doc.xml],
    ["word/_rels/document.xml.rels", doc.relXml],
    ["word/styles.xml", stylesDocx()],
    ["word/numbering.xml", numberingDocx()]
  ];
  for (const [, target, source] of doc.rels) {
    files.push([`word/${target}`, fs.readFileSync(source)]);
  }
  fs.writeFileSync(paths.docx, zipStore(files));
}

function svgImage(file, x, y, w, h) {
  const encoded = fs.readFileSync(file).toString("base64");
  return `<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${encoded}"/>`;
}

function svgText(x, y, value, opts = {}) {
  const size = opts.size || 12;
  const weight = opts.bold ? "700" : "400";
  const fill = opts.fill || "#14252B";
  return `<text x="${x}" y="${y}" font-family="Aptos, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}">${xmlEscape(value)}</text>`;
}

function svgWrapped(x, y, width, rows, opts = {}) {
  const size = opts.size || 12;
  const max = Math.floor(width / (size * 0.52));
  const out = [];
  let cursor = y;
  for (const row of rows) {
    const lines = wrap(row, width, size).flatMap((line) => {
      if (line.length <= max) return [line];
      return [line];
    });
    for (const line of lines) {
      out.push(svgText(x, cursor, line, opts));
      cursor += opts.lineGap || size * 1.25;
    }
    cursor += opts.gap || 4;
  }
  return { markup: out.join("\n"), y: cursor };
}

function writeSvg() {
  const w = 1224;
  const h = 1584;
  const parts = [`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`];
  for (let pageIndex = 0; pageIndex < 2; pageIndex += 1) {
    const oy = pageIndex * 792;
    parts.push(`<rect x="0" y="${oy}" width="612" height="792" fill="#F8F4EA"/>`);
    parts.push(`<rect x="0" y="${oy}" width="176" height="792" fill="#05313B"/>`);
  }
  parts.push(svgImage(images.logo, 28, 28, 118, 64));
  parts.push(svgImage(images.sippy, 28, 108, 52, 74));
  parts.push(svgImage(images.roma, 82, 108, 52, 74));
  parts.push(svgImage(images.hummin, 55, 188, 64, 78));
  parts.push(svgText(202, 66, resume.name, { size: 32, bold: true, fill: "#05313B" }));
  parts.push(svgText(204, 92, resume.headline, { size: 11, bold: true, fill: "#C4913C" }));
  parts.push(svgText(204, 112, resume.contact, { size: 8, fill: "#53696F" }));
  parts.push(svgText(204, 144, "PROFILE", { size: 9, bold: true, fill: "#0B4451" }));
  parts.push(svgWrapped(204, 164, 372, [resume.summary], { size: 8, fill: "#14252B", lineGap: 11 }).markup);
  parts.push(svgText(204, 244, "EXPERIENCE", { size: 9, bold: true, fill: "#0B4451" }));
  let y = 266;
  for (const item of resume.experience.slice(0, 3)) {
    parts.push(svgText(204, y, item.company, { size: 10, bold: true }));
    y += 13;
    parts.push(svgText(204, y, `${item.role} | ${item.dates}`, { size: 8, fill: "#53696F" }));
    y += 14;
    for (const bullet of item.bullets) {
      parts.push(svgText(204, y, "-", { size: 8, bold: true, fill: "#C4913C" }));
      const wrappedBullet = svgWrapped(214, y, 360, [bullet], { size: 7.4, fill: "#14252B", lineGap: 9.5, gap: 0 });
      parts.push(wrappedBullet.markup);
      y = wrappedBullet.y + 2;
    }
    y += 5;
  }
  parts.push(svgText(26, 300, "CERTIFICATIONS", { size: 9, bold: true, fill: "#E8D9B8" }));
  parts.push(svgWrapped(26, 322, 124, resume.certifications, { size: 7, fill: "#E8D9B8", lineGap: 9, gap: 4 }).markup);

  const oy = 792;
  parts.push(svgImage(images.academy, 20, oy + 28, 136, 92));
  parts.push(svgImage(images.sippyScene, 20, oy + 136, 136, 82));
  parts.push(svgImage(images.romaScene, 20, oy + 232, 136, 82));
  parts.push(svgImage(images.humminScene, 20, oy + 328, 136, 82));
  parts.push(svgText(204, oy + 56, `${resume.name} - Combined Resume`, { size: 15, bold: true, fill: "#05313B" }));
  parts.push(svgText(204, oy + 86, "EXPERIENCE CONTINUED", { size: 9, bold: true, fill: "#0B4451" }));
  y = oy + 108;
  for (const item of resume.experience.slice(3)) {
    parts.push(svgText(204, y, item.company, { size: 10, bold: true }));
    y += 13;
    parts.push(svgText(204, y, `${item.role} | ${item.dates}`, { size: 8, fill: "#53696F" }));
    y += 14;
    for (const bullet of item.bullets) {
      parts.push(svgText(204, y, "-", { size: 8, bold: true, fill: "#C4913C" }));
      const wrappedBullet = svgWrapped(214, y, 360, [bullet], { size: 7.4, fill: "#14252B", lineGap: 9.5, gap: 0 });
      parts.push(wrappedBullet.markup);
      y = wrappedBullet.y + 2;
    }
    y += 5;
  }
  parts.push(svgText(204, y + 10, "SELECTED SIP STUDIES OUTCOMES", { size: 9, bold: true, fill: "#0B4451" }));
  parts.push(svgWrapped(214, y + 32, 360, resume.outcomes.map((item) => `- ${item}`), { size: 7.6, fill: "#14252B", lineGap: 9.8, gap: 2 }).markup);
  parts.push(svgText(26, oy + 462, "EDUCATION", { size: 9, bold: true, fill: "#E8D9B8" }));
  parts.push(svgWrapped(26, oy + 484, 124, resume.education, { size: 7, fill: "#E8D9B8", lineGap: 9, gap: 4 }).markup);
  parts.push("</svg>");
  fs.writeFileSync(paths.svg, parts.join("\n"));
}

fs.mkdirSync(OUT_DIR, { recursive: true });
writeMarkdown();
writePdf();
writeDocx();
writeSvg();

console.log(`Wrote ${paths.md}`);
console.log(`Wrote ${paths.pdf}`);
console.log(`Wrote ${paths.docx}`);
console.log(`Wrote ${paths.svg}`);
