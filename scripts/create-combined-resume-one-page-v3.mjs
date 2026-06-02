import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("docs", "resume");
const BASE = "JON_YU_SIP_STUDIES_COMBINED_RESUME_V3_ONE_PAGE_PRINT_2026-05-25";
const out = {
  md: path.join(OUT_DIR, `${BASE}.md`),
  pdf: path.join(OUT_DIR, `${BASE}.pdf`),
  letterPdf: path.join(OUT_DIR, `${BASE}_LETTER_8.5x11.pdf`),
  docx: path.join(OUT_DIR, `${BASE}.docx`),
  svg: path.join(OUT_DIR, `${BASE}_AFFINITY_SOURCE.svg`)
};

const assets = {
  logo: path.resolve("docs/resume/resume-assets/sip-studies-logo-03-light.jpg"),
  sippy: path.resolve("docs/resume/resume-assets/sippy-guide.jpg"),
  roma: path.resolve("docs/resume/resume-assets/roma-guide.jpg"),
  hummin: path.resolve("docs/resume/resume-assets/hummin-coffee-02.jpg"),
  scene: path.resolve("docs/resume/resume-assets/academy-realm.jpg")
};

for (const file of Object.values(assets)) {
  if (!fs.existsSync(file)) throw new Error(`Missing asset: ${file}`);
}

const data = {
  name: "Jon Yu",
  headline: "Founder / Beverage Educator / Sales Consultant / AI Product Builder",
  contact: "Las Vegas, NV | JonYu3@gmail.com | 617.637.0668 | SipStudies.com | Sipopedia.com",
  profile:
    "Beverage educator and founder-builder combining 10+ years in wine and spirits sales, formal credentials, architecture/design training, live-event production, and AI-enabled education technology. Built Sip Studies as a full-stack beverage learning platform for sales enablement, tasting practice, terminology, maps, AI/news workflows, accessibility, and distributor-style education.",
  certs: [
    "MIT - AI: Implications for Business Strategy",
    "Society of Wine Educators - CWE",
    "Society of Wine Educators - CSS",
    "Court of Master Sommeliers - Certified Sommelier L2",
    "WSET - Level 3 Wine",
    "WSET - Level 2 Spirits",
    "Wine Scholar Guild / Lustau - CSWS",
    "Cicerone - Certified Beer Server L1"
  ],
  skills: [
    "Beverage education + curriculum",
    "Wine, spirits, beer + hospitality sales",
    "AI beverage/content systems",
    "React, TypeScript, Vite",
    "Supabase, Stripe, Edge Functions",
    "Distributor + supplier enablement",
    "Live stream + VIP event operations",
    "Architecture, AutoCAD + 3D modeling",
    "Visual design + brand systems",
    "Data preservation + terminology"
  ],
  focusAreas: [
    "AI beverage solutions",
    "Design solutions scaled with AI",
    "Educational training",
    "Beverage accessibility",
    "Preserving beverage data"
  ],
  sidebarMetrics: [
    "3,800+ brands monitored",
    "95,000 distribution points analyzed",
    "23 stores reviewed",
    "$2.291M wine revenue lift"
  ],
  jobs: [
    {
      company: "Sip Studies",
      role: "Founder, Product Lead, Beverage Education Platform Builder",
      dates: "2024 - Present",
      bullets: [
        "Built a React/TypeScript, Vite, Supabase, Stripe, and Edge Function workspace across Learn, Taste, and Connect: Sip Academy, Sipopedia, Beverage Quiz, Maps, Flavor Wheel, Tasting Journal, Beverage News, AI Winecast, and Somm Events.",
        "Created a 20,000-row Sipopedia terminology pipeline with citation/review metadata plus a media-rich learning asset base featuring Sippy, Roma, Hummin, maps, game scenes, academy realms, equipment visuals, and infographics.",
        "Developed AI/news routing, Daily Sip editorial automation, terminology workflows, paid-access architecture, validation scripts, and buyer-facing valuation/IP materials around a $4.5M strategic acquisition thesis."
      ]
    },
    {
      company: "On Location Experience",
      role: "VIP Experience Consultant",
      dates: "Sep 2021 - Present",
      bullets: [
        "Served UFC VIP Experience as the primary event portfolio while also supporting Slap, NFL, NHL, and NASCAR premium guest experiences in high-energy live environments."
      ]
    },
    {
      company: "Breakthru Beverage Group",
      role: "Sales Consultant - Off & On Premise Wine",
      dates: "Sep 2015 - Present",
      bullets: [
        "Grew fine-wine placements, revived unsold SKUs, maintained supplier relationships, and applied an independent-account sales mindset across grocery and on-premise opportunities.",
        "Earned 2018 Sales Consultant Excellence Award; expanded 3,500+ placements and increased wine revenue by $2,291,000 within Lee's Liquor.",
        "Built brand knowledge and portfolio adoption with BBG colleagues and customers through education, merchandising, portfolio management, and chain/independent account support."
      ]
    },
    {
      company: "AARP Colorado",
      role: "Wine Educator",
      dates: "Aug 2020 - 2024",
      bullets: [
        "Led Wine Walk Wednesdays regional wine education for 50+ active adults across live and recorded streams, predominantly viewed in Colorado and spanning all 50 states.",
        "Taught region, terroir, grapes, styles, architecture, history, culture, and geography in an accessible virtual-learning format."
      ]
    },
    {
      company: "Video Tech Services",
      role: "Lighting, Audio & Video Technician",
      dates: "Aug 2013 - Jan 2018",
      bullets: [
        "Worked lighting, audio, video, stage, casino, convention, and breakout-room production for events including LinkedIn, CES, Adobe, and Sage."
      ]
    },
    {
      company: "Total Wine & More",
      role: "Wine Associate",
      dates: "Sep 2013 - Sep 2015",
      bullets: [
        "Managed high-end customer wine sales, portfolios, cellar design support, department resets, customer events, and premium cellar presentation.",
        "Wrote wine-class curriculum, instructed customers, tracked P&L, and trained staff on product knowledge, service, and sales execution."
      ]
    },
    {
      company: "Architecture, Design & Drafting Foundation",
      role: "Architectural Intern / Draftsman / AutoCAD Consultant",
      dates: "2008 - 2013",
      bullets: [
        "Produced field investigations, as-builts, construction documents, reflected ceiling plans, signage drawings, 3D models, websites, marketing, interiors, and renovation documentation.",
        "Project exposure included casino interiors, restaurant renovations, ADA/SNRHA work, John E. Carson Motel, EAT patio redesign, Nacho Daddy, and 50 Church St. Cambridge renovation coordination."
      ]
    }
  ],
  education: "Wentworth Institute of Technology - Bachelor of Science, Architecture",
  outcomes: [
    "69 Supabase migrations + 5 Edge Functions",
    "20,000 Sipopedia candidate rows",
    "Auth, Stripe, AI/news + terminology pipelines",
    "Monitored 3,800+ brands",
    "Analyzed 95,000 points of distribution in 23 stores",
    "3,500+ placements",
    "$2.291M wine revenue lift",
    "$4.5M strategic acquisition thesis"
  ]
};

function writeMarkdown() {
  const lines = [
    `# ${data.name}`,
    "",
    `**${data.headline}**`,
    data.contact,
    "",
    "## Profile",
    data.profile,
    "",
    "## Certifications",
    ...data.certs.map((x) => `- ${x}`),
    "",
    "## Skills",
    ...data.skills.map((x) => `- ${x}`),
    "",
    "## Focus Areas",
    ...data.focusAreas.map((x) => `- ${x}`),
    "",
    "## Market Scale",
    ...data.sidebarMetrics.map((x) => `- ${x}`),
    "",
    "## Experience"
  ];
  for (const job of data.jobs) {
    lines.push("", `### ${job.company} - ${job.role}`, `*${job.dates}*`, ...job.bullets.map((x) => `- ${x}`));
  }
  lines.push("", "## Education", `- ${data.education}`, "", "## Selected Outcomes", ...data.outcomes.map((x) => `- ${x}`), "");
  fs.writeFileSync(out.md, lines.join("\n"));
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255];
}

const colors = {
  paper: rgb("F8F4EA"),
  ink: rgb("14252B"),
  muted: rgb("53696F"),
  teal: rgb("05313B"),
  teal2: rgb("0B4451"),
  gold: rgb("C4913C"),
  pale: rgb("E8D9B8"),
  line: rgb("B6C9C8")
};

function pdfEsc(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function color(c, op = "rg") {
  return `${c.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function jpegSize(buffer) {
  let i = 2;
  while (i < buffer.length) {
    if (buffer[i] !== 0xff) break;
    const marker = buffer[i + 1];
    if (marker === 0xd9 || marker === 0xda) break;
    const len = buffer.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { height: buffer.readUInt16BE(i + 5), width: buffer.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error("Could not read JPEG dimensions");
}

const pdfImages = new Map();

function pdfImage(file) {
  const resolved = path.resolve(file);
  if (pdfImages.has(resolved)) return pdfImages.get(resolved);
  const dataBuffer = fs.readFileSync(resolved);
  const size = jpegSize(dataBuffer);
  const image = { key: `Im${pdfImages.size + 1}`, data: dataBuffer, ...size };
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
  const size = opts.size || 8;
  const y = page.height - yTop - size;
  const font = opts.bold ? "F2" : "F1";
  cmds.push("BT", color(opts.color || colors.ink, "rg"), `/${font} ${size.toFixed(1)} Tf`, `${x.toFixed(2)} ${y.toFixed(2)} Td`, `(${pdfEsc(value)}) Tj`, "ET");
}

function wrap(value, width, size) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const max = Math.max(12, Math.floor(width / (size * 0.46)));
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
      cursor += opts.lineGap || size * 1.18;
    }
    cursor += opts.gap ?? 1.4;
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

function heading(cmds, x, y, label, width = 400) {
  text(cmds, x, y, label.toUpperCase(), { size: 8.4, bold: true, color: colors.teal2 });
  rect(cmds, x, y + 11.1, width, 0.75, colors.line);
}

function bullets(cmds, x, y, width, rows, size = 7.05) {
  let cursor = y;
  for (const row of rows) {
    text(cmds, x, cursor, "-", { size, bold: true, color: colors.gold });
    cursor = wrapped(cmds, x + 9, cursor, width - 9, [row], { size, color: colors.ink, lineGap: size * 1.17, gap: 1.05 });
  }
  return cursor;
}

function job(cmds, x, y, width, item, size = 7.05) {
  text(cmds, x, y, item.company, { size: 8.45, bold: true, color: colors.ink });
  text(cmds, x, y + 9.8, `${item.role} | ${item.dates}`, { size: 6.75, color: colors.muted });
  return bullets(cmds, x, y + 21.2, width, item.bullets, size) + 2.6;
}

function renderPdfPage() {
  const state = { xobjects: new Set() };
  const cmds = [];
  rect(cmds, 0, 0, page.width, page.height, colors.paper);
  rect(cmds, 0, 0, 164, page.height, colors.teal);
  image(cmds, state, assets.logo, 22, 18, 120, 62, "contain");
  image(cmds, state, assets.sippy, 18, 92, 40, 56, "cover");
  image(cmds, state, assets.roma, 62, 92, 40, 56, "cover");
  image(cmds, state, assets.hummin, 106, 92, 40, 56, "cover");
  image(cmds, state, assets.scene, 16, 162, 132, 78, "cover");
  text(cmds, 20, 258, "CERTIFICATIONS", { size: 8.0, bold: true, color: colors.pale });
  wrapped(cmds, 20, 276, 124, data.certs, { size: 6.05, color: colors.pale, lineGap: 7.6, gap: 2.2 });
  text(cmds, 20, 422, "SKILLS", { size: 8.0, bold: true, color: colors.pale });
  wrapped(cmds, 20, 440, 124, data.skills, { size: 6.0, color: colors.pale, lineGap: 7.55, gap: 1.8 });
  text(cmds, 20, 598, "MARKET SCALE", { size: 8.0, bold: true, color: colors.pale });
  wrapped(cmds, 20, 616, 124, data.sidebarMetrics, { size: 6.15, color: colors.pale, lineGap: 7.75, gap: 1.9 });
  text(cmds, 20, 704, "FOCUS + EDUCATION", { size: 8.0, bold: true, color: colors.pale });
  wrapped(cmds, 20, 722, 124, [...data.focusAreas, data.education.replace("Wentworth Institute of Technology - ", "Wentworth - ")], { size: 5.85, color: colors.pale, lineGap: 7.25, gap: 1.55 });

  text(cmds, 186, 32, data.name, { size: 29, bold: true, color: colors.teal });
  text(cmds, 188, 66, data.headline, { size: 10.0, bold: true, color: colors.gold });
  text(cmds, 188, 84, data.contact, { size: 7.25, color: colors.muted });
  heading(cmds, 188, 109, "Profile", 376);
  wrapped(cmds, 188, 128, 376, [data.profile], { size: 7.35, color: colors.ink, lineGap: 9.05, gap: 0 });
  heading(cmds, 188, 186, "Experience", 376);
  let y = 204;
  for (const item of data.jobs) y = job(cmds, 188, y + 1, 376, item);
  heading(cmds, 188, 662, "Selected Outcomes", 376);
  const splitAt = Math.ceil(data.outcomes.length / 2);
  const split = [data.outcomes.slice(0, splitAt), data.outcomes.slice(splitAt)];
  bullets(cmds, 188, 681, 180, split[0], 6.85);
  bullets(cmds, 386, 681, 180, split[1], 6.85);
  return { stream: `${cmds.join("\n")}\n`, xobjects: state.xobjects };
}

function pdfObj(id, body) {
  const bodyBuffer = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
  return Buffer.concat([Buffer.from(`${id} 0 obj\n`, "utf8"), bodyBuffer, Buffer.from("\nendobj\n", "utf8")]);
}

function pdfStream(id, dict, dataValue) {
  const dataBuffer = Buffer.isBuffer(dataValue) ? dataValue : Buffer.from(dataValue, "utf8");
  return pdfObj(id, Buffer.concat([Buffer.from(`<< ${dict} /Length ${dataBuffer.length} >>\nstream\n`, "utf8"), dataBuffer, Buffer.from("\nendstream", "utf8")]));
}

function writePdf(targetPath = out.pdf) {
  const pdfPage = renderPdfPage();
  const imageRecords = [...pdfImages.values()];
  const imageIds = new Map();
  let next = 5;
  imageRecords.forEach((img) => imageIds.set(img.key, next++));
  const contentId = next++;
  const pageId = next++;
  const objects = [];
  objects[1] = pdfObj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects[2] = pdfObj(2, `<< /Type /Pages /Count 1 /Kids [${pageId} 0 R] >>`);
  objects[3] = pdfObj(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects[4] = pdfObj(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  imageRecords.forEach((img) => {
    objects[imageIds.get(img.key)] = pdfStream(imageIds.get(img.key), `/Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`, img.data);
  });
  objects[contentId] = pdfStream(contentId, "", pdfPage.stream);
  const xobjects = [...pdfPage.xobjects].map((key) => `/${key} ${imageIds.get(key)} 0 R`).join(" ");
  objects[pageId] = pdfObj(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << ${xobjects} >> >> /Contents ${contentId} 0 R >>`);
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
  fs.writeFileSync(targetPath, Buffer.concat(chunks));
}

function xmlEsc(v) {
  return String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}

function docPara(value, opts = {}) {
  const style = opts.style ? `<w:pStyle w:val="${opts.style}"/>` : "";
  const bullet = opts.bullet ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : "";
  const bold = opts.bold ? "<w:b/>" : "";
  const colorXml = opts.color ? `<w:color w:val="${opts.color}"/>` : "";
  const size = opts.size ? `<w:sz w:val="${opts.size}"/><w:szCs w:val="${opts.size}"/>` : "";
  return `<w:p><w:pPr>${style}${bullet}</w:pPr><w:r><w:rPr>${bold}${colorXml}${size}</w:rPr><w:t xml:space="preserve">${xmlEsc(value)}</w:t></w:r></w:p>`;
}

function docImage(relId, cx, cy) {
  return `<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="${cx}" cy="${cy}"/><wp:docPr id="${relId.replace("rId", "")}" name="Resume Image"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="image.jpg"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relId}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function contentTypes() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="jpg" ContentType="image/jpeg"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
}

function rootRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
}

function styles() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:sz w:val="18"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:color w:val="05313B"/><w:sz w:val="36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:rPr><w:b/><w:color w:val="0B4451"/><w:sz w:val="21"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="Heading 2"/><w:rPr><w:b/><w:color w:val="14252B"/><w:sz w:val="19"/></w:rPr></w:style></w:styles>`;
}

function numbering() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="-"/><w:pPr><w:ind w:left="300" w:hanging="150"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
}

function core() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Jon Yu Combined Resume V3 One Page Print</dc:title><dc:creator>OpenAI Codex</dc:creator><cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:modified></cp:coreProperties>`;
}

function app() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>OpenAI Codex</Application><Company>Sip Studies</Company></Properties>`;
}

function docxParts() {
  const rels = [
    ["rId4", "media/logo.jpg", assets.logo],
    ["rId5", "media/sippy.jpg", assets.sippy],
    ["rId6", "media/roma.jpg", assets.roma],
    ["rId7", "media/hummin.jpg", assets.hummin]
  ];
  const body = [
    docImage("rId4", 1200000, 600000),
    docPara(data.name, { style: "Title" }),
    docPara(data.headline, { bold: true, color: "C4913C", size: 20 }),
    docPara(data.contact, { color: "53696F", size: 15 }),
    docImage("rId5", 460000, 620000),
    docImage("rId6", 460000, 620000),
    docImage("rId7", 460000, 620000),
    docPara("Profile", { style: "Heading1" }),
    docPara(data.profile),
    docPara("Certifications", { style: "Heading1" }),
    ...data.certs.map((x) => docPara(x, { bullet: true })),
    docPara("Skills", { style: "Heading1" }),
    ...data.skills.map((x) => docPara(x, { bullet: true })),
    docPara("Focus Areas", { style: "Heading1" }),
    ...data.focusAreas.map((x) => docPara(x, { bullet: true })),
    docPara("Market Scale", { style: "Heading1" }),
    ...data.sidebarMetrics.map((x) => docPara(x, { bullet: true })),
    docPara("Experience", { style: "Heading1" })
  ];
  for (const jobItem of data.jobs) {
    body.push(docPara(`${jobItem.company} - ${jobItem.role}`, { style: "Heading2" }));
    body.push(docPara(jobItem.dates, { color: "53696F", size: 15 }));
    body.push(...jobItem.bullets.map((x) => docPara(x, { bullet: true })));
  }
  body.push(docPara("Education + Outcomes", { style: "Heading1" }));
  body.push(docPara(data.education, { bullet: true }));
  body.push(...data.outcomes.map((x) => docPara(x, { bullet: true })));
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${body.join("")}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="540" w:right="540" w:bottom="540" w:left="540" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const relXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>${rels.map(([id, target]) => `<Relationship Id="${id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${target}"/>`).join("")}</Relationships>`;
  return { document, relXml, rels };
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
    const dataBuffer = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(dataBuffer);
    const localHeader = Buffer.concat([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(dataBuffer.length), u32(dataBuffer.length), u16(nameBuffer.length), u16(0), nameBuffer]);
    local.push(localHeader, dataBuffer);
    central.push(Buffer.concat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(dataBuffer.length), u32(dataBuffer.length), u16(nameBuffer.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBuffer]));
    offset += localHeader.length + dataBuffer.length;
  }
  const cd = Buffer.concat(central);
  return Buffer.concat([...local, cd, Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cd.length), u32(offset), u16(0)])]);
}

function writeDocx() {
  const parts = docxParts();
  const files = [
    ["[Content_Types].xml", contentTypes()],
    ["_rels/.rels", rootRels()],
    ["docProps/core.xml", core()],
    ["docProps/app.xml", app()],
    ["word/document.xml", parts.document],
    ["word/_rels/document.xml.rels", parts.relXml],
    ["word/styles.xml", styles()],
    ["word/numbering.xml", numbering()]
  ];
  for (const [, target, source] of parts.rels) files.push([`word/${target}`, fs.readFileSync(source)]);
  fs.writeFileSync(out.docx, zipStore(files));
}

function svgImage(file, x, y, w, h) {
  const encoded = fs.readFileSync(file).toString("base64");
  return `<image x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" href="data:image/jpeg;base64,${encoded}"/>`;
}

function svgText(x, y, value, opts = {}) {
  return `<text x="${x}" y="${y}" font-family="Aptos, Arial, sans-serif" font-size="${opts.size || 10}" font-weight="${opts.bold ? 700 : 400}" fill="${opts.fill || "#14252B"}">${xmlEsc(value)}</text>`;
}

function svgWrapped(x, y, width, rows, opts = {}) {
  let cursor = y;
  const outLines = [];
  const size = opts.size || 8;
  for (const row of rows) {
    for (const line of wrap(row, width, size)) {
      outLines.push(svgText(x, cursor, line, opts));
      cursor += opts.lineGap || size * 1.2;
    }
    cursor += opts.gap || 2;
  }
  return { markup: outLines.join("\n"), y: cursor };
}

function writeSvg() {
  const svg = [];
  svg.push('<svg xmlns="http://www.w3.org/2000/svg" width="612" height="792" viewBox="0 0 612 792">');
  svg.push('<rect width="612" height="792" fill="#F8F4EA"/>');
  svg.push('<rect width="164" height="792" fill="#05313B"/>');
  svg.push(svgImage(assets.logo, 22, 18, 120, 62));
  svg.push(svgImage(assets.sippy, 18, 92, 40, 56));
  svg.push(svgImage(assets.roma, 62, 92, 40, 56));
  svg.push(svgImage(assets.hummin, 106, 92, 40, 56));
  svg.push(svgImage(assets.scene, 16, 162, 132, 78));
  svg.push(svgText(20, 266, "CERTIFICATIONS", { size: 8.0, bold: true, fill: "#E8D9B8" }));
  svg.push(svgWrapped(20, 284, 124, data.certs, { size: 6.05, fill: "#E8D9B8", lineGap: 7.6, gap: 2.2 }).markup);
  svg.push(svgText(20, 430, "SKILLS", { size: 8.0, bold: true, fill: "#E8D9B8" }));
  svg.push(svgWrapped(20, 448, 124, data.skills, { size: 6.0, fill: "#E8D9B8", lineGap: 7.55, gap: 1.8 }).markup);
  svg.push(svgText(20, 606, "MARKET SCALE", { size: 8.0, bold: true, fill: "#E8D9B8" }));
  svg.push(svgWrapped(20, 624, 124, data.sidebarMetrics, { size: 6.15, fill: "#E8D9B8", lineGap: 7.75, gap: 1.9 }).markup);
  svg.push(svgText(20, 712, "FOCUS + EDUCATION", { size: 8.0, bold: true, fill: "#E8D9B8" }));
  svg.push(svgWrapped(20, 730, 124, [...data.focusAreas, data.education.replace("Wentworth Institute of Technology - ", "Wentworth - ")], { size: 5.85, fill: "#E8D9B8", lineGap: 7.25, gap: 1.55 }).markup);
  svg.push(svgText(186, 61, data.name, { size: 29, bold: true, fill: "#05313B" }));
  svg.push(svgText(188, 76, data.headline, { size: 10.0, bold: true, fill: "#C4913C" }));
  svg.push(svgText(188, 91.25, data.contact, { size: 7.25, fill: "#53696F" }));
  svg.push(svgText(188, 117.4, "PROFILE", { size: 8.4, bold: true, fill: "#0B4451" }));
  svg.push(svgWrapped(188, 136, 376, [data.profile], { size: 7.35, fill: "#14252B", lineGap: 9.05, gap: 0 }).markup);
  svg.push(svgText(188, 194.4, "EXPERIENCE", { size: 8.4, bold: true, fill: "#0B4451" }));
  let y = 213;
  for (const item of data.jobs) {
    svg.push(svgText(188, y, item.company, { size: 8.45, bold: true }));
    y += 9.8;
    svg.push(svgText(188, y, `${item.role} | ${item.dates}`, { size: 6.75, fill: "#53696F" }));
    y += 11.4;
    for (const bullet of item.bullets) {
      svg.push(svgText(188, y, "-", { size: 7.05, bold: true, fill: "#C4913C" }));
      const wrappedBullet = svgWrapped(197, y, 367, [bullet], { size: 7.05, fill: "#14252B", lineGap: 8.25, gap: 1.05 });
      svg.push(wrappedBullet.markup);
      y = wrappedBullet.y;
    }
    y += 2.6;
  }
  svg.push(svgText(188, 670.4, "SELECTED OUTCOMES", { size: 8.4, bold: true, fill: "#0B4451" }));
  const splitAt = Math.ceil(data.outcomes.length / 2);
  svg.push(svgWrapped(188, 689, 180, data.outcomes.slice(0, splitAt).map((x) => `- ${x}`), { size: 6.85, fill: "#14252B", lineGap: 8.0, gap: 1.15 }).markup);
  svg.push(svgWrapped(386, 689, 180, data.outcomes.slice(splitAt).map((x) => `- ${x}`), { size: 6.85, fill: "#14252B", lineGap: 8.0, gap: 1.15 }).markup);
  svg.push("</svg>");
  fs.writeFileSync(out.svg, svg.join("\n"));
}

writeMarkdown();
writePdf();
writePdf(out.letterPdf);
writeDocx();
writeSvg();

console.log(`Wrote ${out.md}`);
console.log(`Wrote ${out.pdf}`);
console.log(`Wrote ${out.letterPdf}`);
console.log(`Wrote ${out.docx}`);
console.log(`Wrote ${out.svg}`);
