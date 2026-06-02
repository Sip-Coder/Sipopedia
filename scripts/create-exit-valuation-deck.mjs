import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("docs", "presentations");
const BASE_NAME = "sip-studies-exit-valuation-2026-05-25";
const PPTX_PATH = path.join(OUT_DIR, `${BASE_NAME}.pptx`);
const PDF_PATH = path.join(OUT_DIR, `${BASE_NAME}.pdf`);

const deck = [
  {
    kind: "title",
    title: "Sip Studies Exit Valuation",
    subtitle: "Buyer conversation deck | Prepared May 25, 2026",
    tag: "Confidential strategic estimate",
    body: [
      "Purpose: support a credible acquisition conversation with Breakthru Beverage Group or another strategic beverage buyer.",
      "Positioning: beverage education, AI/content automation, internal enablement, and proprietary learning IP."
    ]
  },
  {
    kind: "priceCards",
    title: "Three Exit Prices",
    subtitle: "Use these as floor, target, and opening anchor.",
    cards: [
      {
        heading: "Asset/IP Floor",
        price: "$350,000",
        lines: [
          "Clean transfer of repo, brand, content, media assets, and limited handoff.",
          "Do not sell below this without retained rights or an earnout."
        ]
      },
      {
        heading: "Fair Strategic Sale",
        price: "$1,500,000",
        lines: [
          "Realistic Breakthru-style acquisition for internal training, customer education, supplier enablement, and faster time-to-market.",
          "Best target if there is no verified ARR yet."
        ]
      },
      {
        heading: "Premium Strategic Ask",
        price: "$4,500,000",
        lines: [
          "Opening anchor if the buyer approaches first.",
          "Structure as cash plus transition support, or $2M-$3M upfront plus earnout to $4.5M-$6M."
        ]
      }
    ],
    side: {
      heading: "Key caveat",
      lines: [
        "No verified ARR, customer count, retention, or usage analytics were found in the local review.",
        "With proof of paid traction, valuation can move from replacement-cost logic to revenue-multiple logic."
      ]
    }
  },
  {
    kind: "twoColumn",
    title: "What A Buyer Is Buying",
    subtitle: "A software, content, and beverage-domain IP bundle.",
    left: {
      heading: "Platform assets",
      lines: [
        "React + TypeScript + Vite single-page app.",
        "Supabase auth, profiles, subscriptions, terminology, and data-backed features.",
        "Stripe Checkout and billing webhook architecture.",
        "Hash-routed workspace spanning learning, tasting, and content modules."
      ]
    },
    right: {
      heading: "Validated locally",
      lines: [
        "npm run build passed.",
        "Website validator passed with typecheck and build PASS.",
        "Lint/test were skipped because package scripts are not configured.",
        "Local route check returned HTTP 200."
      ]
    }
  },
  {
    kind: "threeCards",
    title: "Product Surface",
    subtitle: "A broad beverage-learning workspace, not a single landing page.",
    cards: [
      {
        heading: "Learn",
        lines: [
          "Sip Academy",
          "Sip Game",
          "Sipopedia",
          "Beverage Quiz",
          "Maps, Regions, Grapes & Grains",
          "Recipes and resources"
        ]
      },
      {
        heading: "Taste",
        lines: [
          "Flavor Wheel",
          "Tasting Journal",
          "Journal Archive",
          "Local-first study interactions",
          "Cloud sync where Supabase is enabled"
        ]
      },
      {
        heading: "Connect",
        lines: [
          "Beverage News",
          "Flavor Blog",
          "AI Winecast",
          "Tasting Groups",
          "AI News",
          "Somm Events"
        ]
      }
    ]
  },
  {
    kind: "twoColumn",
    title: "Content And IP Depth",
    subtitle: "The strongest current asset is the accumulated beverage knowledge base and media library.",
    left: {
      heading: "Observed inventory",
      lines: [
        "5,828 repo files excluding node_modules and dist.",
        "3,634 PNG assets in reviewed source/public areas.",
        "20,000 Sipopedia JSONL candidate rows.",
        "69 Supabase migrations.",
        "5 Supabase Edge Functions."
      ]
    },
    right: {
      heading: "Why it matters",
      lines: [
        "A buyer can compress a 12-24 month internal build into a transfer and integration process.",
        "The beverage-specific taxonomy, maps, games, news, and learning paths are harder to recreate than the shell.",
        "Citation and provenance work increases value once packaged cleanly."
      ]
    }
  },
  {
    kind: "twoColumn",
    title: "Breakthru Buyer Fit",
    subtitle: "Breakthru already signals demand for digital commerce, education, data, and AI literacy.",
    left: {
      heading: "Strategic fit",
      lines: [
        "Sales rep education and onboarding.",
        "Supplier and portfolio training at scale.",
        "Retailer and on-premise customer education.",
        "AI literacy and category knowledge workflows.",
        "Content-driven differentiation beyond ordering tools."
      ]
    },
    right: {
      heading: "Evidence from market research",
      lines: [
        "Breakthru reports more than 10,000 associates and more than $8.5B in annual sales.",
        "Breakthru Now promotes 24/7 account access, catalog content, data-driven product suggestions, and online resources.",
        "Alchemy offers staff education, category knowledge, and beverage program training."
      ]
    }
  },
  {
    kind: "threeCards",
    title: "Market Context",
    subtitle: "The category is attractive, but buyers are selective.",
    cards: [
      {
        heading: "LMS market",
        lines: [
          "Grand View/Horizon estimated the U.S. LMS market at $7.95B in 2025.",
          "Projected U.S. LMS CAGR: 17% from 2026 to 2033."
        ]
      },
      {
        heading: "Corporate e-learning",
        lines: [
          "Mordor estimated corporate e-learning at $102.55B in 2025.",
          "Projected to reach $211.79B in 2031."
        ]
      },
      {
        heading: "SaaS multiples",
        lines: [
          "SaaS Capital: 2025 market is selective; SaaS alone no longer earns premium multiples.",
          "SEG: 1Q26 public SaaS median EV/revenue reset to 3.6x."
        ]
      }
    ]
  },
  {
    kind: "table",
    title: "Valuation Logic",
    subtitle: "The price should be framed by buyer use case, not only code replacement cost.",
    headers: ["Scenario", "Price", "Basis", "Likely buyer behavior"],
    rows: [
      [
        "Asset/IP floor",
        "$350k",
        "Repo + content + brand + media + limited transition",
        "Buyer treats it as acquired assets and avoids a long internal build."
      ],
      [
        "Fair strategic sale",
        "$1.5M",
        "Internal enablement platform and beverage knowledge system",
        "Buyer sees enough strategic value to justify fast integration."
      ],
      [
        "Premium strategic ask",
        "$4.5M",
        "Category platform with AI/content workflows and proprietary IP",
        "Buyer approaches first and wants exclusivity, speed, and roadmap control."
      ]
    ]
  },
  {
    kind: "twoColumn",
    title: "Recommended Deal Structure",
    subtitle: "Protect the upside while making the first yes easy.",
    left: {
      heading: "Preferred offer",
      lines: [
        "Open at $4.5M if the buyer approaches first.",
        "Target clean sale zone: $1.5M-$2.25M.",
        "Require source-code, content, brand, and asset scope to be explicit.",
        "Include 90-180 days of founder transition support."
      ]
    },
    right: {
      heading: "Fallback path",
      lines: [
        "$150k-$300k paid pilot or annual enterprise license.",
        "Pre-negotiate an acquisition option at $2.5M-$5M.",
        "Tie earnout to internal users, customer deployment, supplier adoption, or revenue.",
        "Retain rights if the buyer only wants a pilot."
      ]
    }
  },
  {
    kind: "twoColumn",
    title: "Buyer Diligence Risks",
    subtitle: "These are the items most likely to discount the price.",
    left: {
      heading: "Current risks",
      lines: [
        "No verified ARR, active-user data, or enterprise pilots in the local review.",
        "Large components and thin automated test coverage.",
        "Candidate terminology corpus needs editorial QA before database import.",
        "Generated media and source provenance should be packaged cleanly."
      ]
    },
    right: {
      heading: "De-risk before outreach",
      lines: [
        "Create a one-page asset schedule and IP assignment list.",
        "Add usage analytics and export a metrics snapshot.",
        "Package a 5-minute demo path for buyer stakeholders.",
        "Run secret scan, build, website validator, and terminology validator before diligence."
      ]
    }
  },
  {
    kind: "twoColumn",
    title: "What To Say In The Room",
    subtitle: "Lead with business use, then show the product.",
    left: {
      heading: "Core pitch",
      lines: [
        "Sip Studies is a beverage-learning operating system for sales teams, hospitality partners, and beverage learners.",
        "It combines category education, tasting workflows, maps, news, AI-assisted content, and a structured terminology engine.",
        "A distributor can use it to improve rep readiness, supplier storytelling, and customer education."
      ]
    },
    right: {
      heading: "Do not lead with",
      lines: [
        "A repo tour.",
        "A generic website demo.",
        "Only the $10/month Pro plan.",
        "Unreviewed candidate counts without explaining QA status."
      ]
    }
  },
  {
    kind: "sources",
    title: "Sources And Caveats",
    subtitle: "Use this slide if a buyer asks where the numbers came from.",
    caveat: "This is a strategic estimate, not investment banking, legal, tax, or accounting advice. A formal valuation needs verified revenue, costs, customer contracts, analytics, IP chain-of-title, and diligence materials.",
    sources: [
      "Breakthru Beverage Group official site: https://www.breakthrubev.com/?lang=en",
      "Breakthru About page: https://www.breakthrubev.com/About?sc_lang=en",
      "Breakthru Now: https://now.breakthrubev.com/",
      "Breakthru Alchemy: https://alchemy.breakthrubev.com/",
      "SaaS Capital valuation context: https://www.saas-capital.com/blog-posts/saas-valuation-multiples-understanding-the-new-normal/",
      "Grand View/Horizon U.S. LMS outlook: https://www.grandviewresearch.com/horizon/outlook/learning-management-system-market/united-states",
      "Mordor corporate e-learning market: https://www.mordorintelligence.com/industry-reports/corporate-e-learning-market",
      "Software Equity Group 1Q26 SaaS report: https://softwareequity.com/research/quarterly-saas-report/"
    ]
  }
];

const ppt = {
  width: 13.333,
  height: 7.5,
  emuPerInch: 914400,
  bg: "041D26",
  panel: "082B35",
  panel2: "0B3642",
  stroke: "24586B",
  text: "F7F0DF",
  muted: "A9C7CC",
  gold: "F3D18A",
  blue: "65D2E8",
  green: "8FCB9B",
  warning: "E7A95F"
};

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

function emu(inches) {
  return Math.round(inches * ppt.emuPerInch);
}

function hexToRgb01(hex) {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255
  ];
}

class SlideXml {
  constructor(index, spec) {
    this.index = index;
    this.spec = spec;
    this.id = 2;
    this.items = [];
    this.rect(0, 0, ppt.width, ppt.height, ppt.bg, null);
    this.rect(0, 0, 0.14, ppt.height, ppt.blue, null);
    this.rect(0.14, 0, 0.03, ppt.height, ppt.gold, null);
    this.rect(0.48, 0.32, 12.3, 0.02, "174553", null);
    this.text(0.52, 0.38, 8.5, 0.5, [spec.title], { size: 24, bold: true, color: ppt.text });
    if (spec.subtitle) {
      this.text(0.54, 0.86, 10.9, 0.34, [spec.subtitle], { size: 9.5, color: ppt.muted });
    }
    this.footer();
  }

  nextId() {
    this.id += 1;
    return this.id;
  }

  rect(x, y, w, h, fill, line = ppt.stroke, radius = false) {
    const id = this.nextId();
    const geom = radius ? "roundRect" : "rect";
    const fillXml = fill
      ? `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>`
      : "<a:noFill/>";
    const lineXml = line
      ? `<a:ln w="12700"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln>`
      : "<a:ln><a:noFill/></a:ln>";
    this.items.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${id}" name="Shape ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm>
          <a:prstGeom prst="${geom}"><a:avLst/></a:prstGeom>
          ${fillXml}
          ${lineXml}
        </p:spPr>
      </p:sp>`);
  }

  text(x, y, w, h, lines, opts = {}) {
    const id = this.nextId();
    const size = Math.round((opts.size || 14) * 100);
    const color = opts.color || ppt.text;
    const bold = opts.bold ? " b=\"1\"" : "";
    const font = opts.font || "Aptos";
    const align = opts.align || "l";
    const paragraphs = lines.map((line) => `
      <a:p>
        <a:pPr algn="${align}"><a:lnSpc><a:spcPct val="108000"/></a:lnSpc></a:pPr>
        <a:r>
          <a:rPr lang="en-US" sz="${size}"${bold}>
            <a:solidFill><a:srgbClr val="${color}"/></a:solidFill>
            <a:latin typeface="${xmlEscape(font)}"/>
          </a:rPr>
          <a:t>${xmlEscape(line)}</a:t>
        </a:r>
        <a:endParaRPr lang="en-US" sz="${size}">
          <a:solidFill><a:srgbClr val="${color}"/></a:solidFill>
        </a:endParaRPr>
      </a:p>`).join("");
    this.items.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${id}" name="Text ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>
          <a:noFill/><a:ln><a:noFill/></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" anchor="${opts.anchor || "t"}" lIns="45720" tIns="22860" rIns="45720" bIns="22860"/>
          <a:lstStyle/>
          ${paragraphs}
        </p:txBody>
      </p:sp>`);
  }

  pill(x, y, text, color = ppt.gold) {
    this.rect(x, y, 2.2, 0.34, "122F38", color, true);
    this.text(x + 0.08, y + 0.06, 2.04, 0.22, [text], { size: 7.8, bold: true, color });
  }

  card(x, y, w, h, heading, lines, opts = {}) {
    this.rect(x, y, w, h, opts.fill || ppt.panel, opts.line || ppt.stroke, true);
    this.text(x + 0.18, y + 0.18, w - 0.36, 0.38, [heading], {
      size: opts.headingSize || 14,
      bold: true,
      color: opts.headingColor || ppt.gold
    });
    this.text(x + 0.22, y + 0.7, w - 0.44, h - 0.88, lines.map((line) => `- ${line}`), {
      size: opts.bodySize || 10.2,
      color: opts.bodyColor || ppt.muted
    });
  }

  priceCard(x, y, w, h, card, color) {
    this.rect(x, y, w, h, ppt.panel, color, true);
    this.text(x + 0.18, y + 0.18, w - 0.36, 0.34, [card.heading], { size: 12, bold: true, color });
    this.text(x + 0.18, y + 0.64, w - 0.36, 0.68, [card.price], { size: 28, bold: true, color: ppt.text });
    this.text(x + 0.22, y + 1.42, w - 0.44, h - 1.56, card.lines.map((line) => `- ${line}`), {
      size: 9.2,
      color: ppt.muted
    });
  }

  footer() {
    this.text(0.52, 7.07, 6.4, 0.22, ["Sip Studies exit valuation | Strategic estimate"], {
      size: 7.4,
      color: "6E9CA7"
    });
    this.text(12.25, 7.07, 0.55, 0.22, [String(this.index)], {
      size: 7.4,
      color: "6E9CA7",
      align: "r"
    });
  }

  xml() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      ${this.items.join("\n")}
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sld>`;
  }
}

function renderPptSlide(spec, index) {
  const s = new SlideXml(index, spec);

  if (spec.kind === "title") {
    s.text(0.62, 1.42, 8.8, 1.12, ["Exit price range for a strategic beverage buyer"], {
      size: 32,
      bold: true,
      color: ppt.gold
    });
    s.text(0.68, 2.78, 9.1, 0.92, spec.body, { size: 14, color: ppt.muted });
    s.pill(0.72, 4.1, spec.tag, ppt.blue);
    s.card(8.05, 4.0, 4.15, 1.55, "Headline answer", [
      "$350k floor",
      "$1.5M fair strategic sale",
      "$4.5M premium opening ask"
    ], { headingColor: ppt.gold, bodySize: 12 });
    s.rect(10.3, 1.32, 1.75, 1.75, "123B47", ppt.blue, true);
    s.text(10.42, 1.72, 1.5, 0.7, ["IP", "+", "AI"], { size: 18, bold: true, color: ppt.text, align: "c" });
    return s.xml();
  }

  if (spec.kind === "priceCards") {
    const colors = [ppt.green, ppt.gold, ppt.blue];
    spec.cards.forEach((card, i) => s.priceCard(0.62 + i * 3.72, 1.42, 3.44, 4.56, card, colors[i]));
    s.card(11.8, 1.42, 1.0, 4.56, "Caveat", spec.side.lines, {
      headingSize: 9,
      bodySize: 6.9,
      headingColor: ppt.warning,
      fill: "092630",
      line: ppt.warning
    });
    return s.xml();
  }

  if (spec.kind === "twoColumn") {
    s.card(0.72, 1.42, 5.9, 4.98, spec.left.heading, spec.left.lines, {
      headingColor: ppt.gold,
      bodySize: 11
    });
    s.card(6.88, 1.42, 5.72, 4.98, spec.right.heading, spec.right.lines, {
      headingColor: ppt.blue,
      bodySize: 11
    });
    return s.xml();
  }

  if (spec.kind === "threeCards") {
    spec.cards.forEach((card, i) => s.card(0.72 + i * 4.05, 1.42, 3.74, 4.98, card.heading, card.lines, {
      headingColor: [ppt.gold, ppt.blue, ppt.green][i],
      bodySize: 10.4
    }));
    return s.xml();
  }

  if (spec.kind === "table") {
    const x = 0.66;
    const y = 1.46;
    const widths = [2.0, 1.35, 4.15, 4.65];
    const rowH = 1.12;
    s.rect(x, y, 12.15, 0.58, "123B47", ppt.blue, true);
    let xPos = x;
    spec.headers.forEach((header, i) => {
      s.text(xPos + 0.08, y + 0.13, widths[i] - 0.12, 0.3, [header], {
        size: 9.2,
        bold: true,
        color: ppt.text
      });
      xPos += widths[i];
    });
    spec.rows.forEach((row, r) => {
      const rowY = y + 0.72 + r * rowH;
      s.rect(x, rowY, 12.15, rowH - 0.1, r % 2 === 0 ? ppt.panel : ppt.panel2, ppt.stroke, false);
      xPos = x;
      row.forEach((cell, i) => {
        s.text(xPos + 0.08, rowY + 0.1, widths[i] - 0.14, rowH - 0.18, [cell], {
          size: i === 1 ? 12 : 8.8,
          bold: i <= 1,
          color: i === 1 ? ppt.gold : ppt.muted
        });
        xPos += widths[i];
      });
    });
    return s.xml();
  }

  if (spec.kind === "sources") {
    s.card(0.72, 1.36, 12.0, 1.25, "Caveat", [spec.caveat], {
      headingColor: ppt.warning,
      bodySize: 9.5,
      fill: "102A31",
      line: ppt.warning
    });
    s.rect(0.72, 2.82, 12.0, 3.72, ppt.panel, ppt.stroke, true);
    s.text(0.94, 3.02, 11.45, 3.3, spec.sources.map((source) => `- ${source}`), {
      size: 7.4,
      color: ppt.muted
    });
    return s.xml();
  }

  return s.xml();
}

function contentTypes(slideCount) {
  const slideOverrides = Array.from({ length: slideCount }, (_, i) => `
  <Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${slideOverrides}
</Types>`;
}

function rootRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function presentationXml(slideCount) {
  const slideIds = Array.from({ length: slideCount }, (_, i) => `
    <p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst>
    <p:sldMasterId id="2147483648" r:id="rId1"/>
  </p:sldMasterIdLst>
  <p:sldIdLst>${slideIds}
  </p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="wide"/>
  <p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle>
    <a:defPPr><a:defRPr lang="en-US"/></a:defPPr>
  </p:defaultTextStyle>
</p:presentation>`;
}

function presentationRels(slideCount) {
  const slideRels = Array.from({ length: slideCount }, (_, i) => `
  <Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
  ${slideRels}
</Relationships>`;
}

function slideRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`;
}

function slideMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
  <p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles>
</p:sldMaster>`;
}

function slideMasterRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>`;
}

function slideLayoutXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1">
  <p:cSld name="Blank">
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
    </p:spTree>
  </p:cSld>
  <p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr>
</p:sldLayout>`;
}

function slideLayoutRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`;
}

function themeXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Sip Studies">
  <a:themeElements>
    <a:clrScheme name="Sip Studies">
      <a:dk1><a:srgbClr val="041D26"/></a:dk1>
      <a:lt1><a:srgbClr val="F7F0DF"/></a:lt1>
      <a:dk2><a:srgbClr val="082B35"/></a:dk2>
      <a:lt2><a:srgbClr val="A9C7CC"/></a:lt2>
      <a:accent1><a:srgbClr val="F3D18A"/></a:accent1>
      <a:accent2><a:srgbClr val="65D2E8"/></a:accent2>
      <a:accent3><a:srgbClr val="8FCB9B"/></a:accent3>
      <a:accent4><a:srgbClr val="E7A95F"/></a:accent4>
      <a:accent5><a:srgbClr val="24586B"/></a:accent5>
      <a:accent6><a:srgbClr val="FFFFFF"/></a:accent6>
      <a:hlink><a:srgbClr val="65D2E8"/></a:hlink>
      <a:folHlink><a:srgbClr val="F3D18A"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="Aptos">
      <a:majorFont><a:latin typeface="Aptos Display"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>
      <a:minorFont><a:latin typeface="Aptos"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="Default">
      <a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst>
      <a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst>
      <a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst>
      <a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst>
    </a:fmtScheme>
  </a:themeElements>
  <a:objectDefaults/>
  <a:extraClrSchemeLst/>
</a:theme>`;
}

function coreXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Sip Studies Exit Valuation</dc:title>
  <dc:subject>Strategic acquisition valuation deck</dc:subject>
  <dc:creator>OpenAI Codex</dc:creator>
  <cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:modified>
</cp:coreProperties>`;
}

function appXml(slideCount) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>OpenAI Codex</Application>
  <PresentationFormat>Widescreen</PresentationFormat>
  <Slides>${slideCount}</Slides>
  <Company>Sip Studies</Company>
</Properties>`;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c >>> 0;
  }
  return table;
})();

function u16(value) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(value);
  return b;
}

function u32(value) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(value >>> 0);
  return b;
}

function zipStore(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const [name, content] of files) {
    const nameBuf = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(data);
    const localHeader = Buffer.concat([
      u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc),
      u32(data.length), u32(data.length), u16(nameBuf.length), u16(0), nameBuf
    ]);
    localParts.push(localHeader, data);

    const centralHeader = Buffer.concat([
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc),
      u32(data.length), u32(data.length), u16(nameBuf.length), u16(0), u16(0),
      u16(0), u16(0), u32(0), u32(offset), nameBuf
    ]);
    centralParts.push(centralHeader);
    offset += localHeader.length + data.length;
  }

  const centralDir = Buffer.concat(centralParts);
  const end = Buffer.concat([
    u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length),
    u32(centralDir.length), u32(offset), u16(0)
  ]);

  return Buffer.concat([...localParts, centralDir, end]);
}

function writePptx() {
  const files = [];
  const add = (name, content) => files.push([name, content]);
  add("[Content_Types].xml", contentTypes(deck.length));
  add("_rels/.rels", rootRels());
  add("docProps/core.xml", coreXml());
  add("docProps/app.xml", appXml(deck.length));
  add("ppt/presentation.xml", presentationXml(deck.length));
  add("ppt/_rels/presentation.xml.rels", presentationRels(deck.length));
  add("ppt/slideMasters/slideMaster1.xml", slideMasterXml());
  add("ppt/slideMasters/_rels/slideMaster1.xml.rels", slideMasterRels());
  add("ppt/slideLayouts/slideLayout1.xml", slideLayoutXml());
  add("ppt/slideLayouts/_rels/slideLayout1.xml.rels", slideLayoutRels());
  add("ppt/theme/theme1.xml", themeXml());
  deck.forEach((spec, i) => {
    add(`ppt/slides/slide${i + 1}.xml`, renderPptSlide(spec, i + 1));
    add(`ppt/slides/_rels/slide${i + 1}.xml.rels`, slideRels());
  });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PPTX_PATH, zipStore(files));
}

const pdf = {
  width: 960,
  height: 540,
  marginX: 46,
  bg: hexToRgb01(ppt.bg),
  panel: hexToRgb01(ppt.panel),
  panel2: hexToRgb01(ppt.panel2),
  stroke: hexToRgb01(ppt.stroke),
  text: hexToRgb01(ppt.text),
  muted: hexToRgb01(ppt.muted),
  gold: hexToRgb01(ppt.gold),
  blue: hexToRgb01(ppt.blue),
  green: hexToRgb01(ppt.green),
  warning: hexToRgb01(ppt.warning)
};

function pdfEscape(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function rgbCmd(color, op = "rg") {
  return `${color.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function drawRect(cmds, x, yTop, w, h, fill, stroke = null) {
  const y = pdf.height - yTop - h;
  cmds.push("q");
  if (fill) cmds.push(rgbCmd(fill, "rg"));
  if (stroke) cmds.push(rgbCmd(stroke, "RG"));
  cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill && stroke ? "B" : fill ? "f" : "S"}`);
  cmds.push("Q");
}

function drawText(cmds, x, yTop, text, opts = {}) {
  const font = opts.bold ? "F2" : "F1";
  const size = opts.size || 12;
  const color = opts.color || pdf.text;
  const y = pdf.height - yTop - size;
  cmds.push("BT");
  cmds.push(rgbCmd(color, "rg"));
  cmds.push(`/${font} ${size.toFixed(1)} Tf`);
  cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} Td`);
  cmds.push(`(${pdfEscape(text)}) Tj`);
  cmds.push("ET");
}

function wrapText(text, maxWidth, size) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  const avg = size * 0.52;
  const maxChars = Math.max(12, Math.floor(maxWidth / avg));
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

function drawWrapped(cmds, x, yTop, w, lines, opts = {}) {
  let y = yTop;
  const size = opts.size || 12;
  const lineGap = opts.lineGap || size * 1.32;
  for (const raw of lines) {
    const wrapped = wrapText(raw, w, size);
    for (const line of wrapped) {
      drawText(cmds, x, y, line, opts);
      y += lineGap;
    }
    y += opts.paragraphGap || 4;
  }
}

function drawPdfChrome(cmds, spec, index) {
  drawRect(cmds, 0, 0, pdf.width, pdf.height, pdf.bg);
  drawRect(cmds, 0, 0, 11, pdf.height, pdf.blue);
  drawRect(cmds, 11, 0, 3, pdf.height, pdf.gold);
  drawRect(cmds, 40, 24, 880, 1.5, hexToRgb01("174553"));
  drawText(cmds, 48, 34, spec.title, { size: 22, bold: true, color: pdf.text });
  if (spec.subtitle) drawText(cmds, 50, 70, spec.subtitle, { size: 9.5, color: pdf.muted });
  drawText(cmds, 48, 512, "Sip Studies exit valuation | Strategic estimate", { size: 7, color: hexToRgb01("6E9CA7") });
  drawText(cmds, 905, 512, String(index), { size: 7, color: hexToRgb01("6E9CA7") });
}

function drawPdfCard(cmds, x, y, w, h, heading, lines, color = pdf.gold) {
  drawRect(cmds, x, y, w, h, pdf.panel, pdf.stroke);
  drawText(cmds, x + 14, y + 16, heading, { size: 13, bold: true, color });
  drawWrapped(cmds, x + 18, y + 52, w - 34, lines.map((line) => `- ${line}`), {
    size: 10,
    color: pdf.muted,
    lineGap: 14,
    paragraphGap: 2
  });
}

function renderPdfPage(spec, index) {
  const cmds = [];
  drawPdfChrome(cmds, spec, index);

  if (spec.kind === "title") {
    drawText(cmds, 58, 106, "Exit price range for a strategic beverage buyer", { size: 31, bold: true, color: pdf.gold });
    drawWrapped(cmds, 64, 192, 640, spec.body, { size: 14, color: pdf.muted, lineGap: 20, paragraphGap: 8 });
    drawRect(cmds, 62, 304, 250, 32, hexToRgb01("122F38"), pdf.blue);
    drawText(cmds, 78, 313, spec.tag, { size: 9, bold: true, color: pdf.blue });
    drawPdfCard(cmds, 585, 290, 300, 118, "Headline answer", [
      "$350k floor",
      "$1.5M fair strategic sale",
      "$4.5M premium opening ask"
    ], pdf.gold);
  } else if (spec.kind === "priceCards") {
    const colors = [pdf.green, pdf.gold, pdf.blue];
    spec.cards.forEach((card, i) => {
      const x = 54 + i * 268;
      drawRect(cmds, x, 110, 248, 330, pdf.panel, colors[i]);
      drawText(cmds, x + 14, 128, card.heading, { size: 12, bold: true, color: colors[i] });
      drawText(cmds, x + 14, 170, card.price, { size: 32, bold: true, color: pdf.text });
      drawWrapped(cmds, x + 16, 236, 216, card.lines.map((line) => `- ${line}`), { size: 9.3, color: pdf.muted, lineGap: 14 });
    });
    drawPdfCard(cmds, 858, 110, 70, 330, "Caveat", spec.side.lines, pdf.warning);
  } else if (spec.kind === "twoColumn") {
    drawPdfCard(cmds, 56, 108, 412, 356, spec.left.heading, spec.left.lines, pdf.gold);
    drawPdfCard(cmds, 492, 108, 404, 356, spec.right.heading, spec.right.lines, pdf.blue);
  } else if (spec.kind === "threeCards") {
    spec.cards.forEach((card, i) => drawPdfCard(cmds, 54 + i * 296, 108, 270, 356, card.heading, card.lines, [pdf.gold, pdf.blue, pdf.green][i]));
  } else if (spec.kind === "table") {
    const x = 52;
    const y = 112;
    const widths = [140, 90, 310, 330];
    drawRect(cmds, x, y, 870, 38, hexToRgb01("123B47"), pdf.blue);
    let xPos = x;
    spec.headers.forEach((header, i) => {
      drawText(cmds, xPos + 8, y + 12, header, { size: 9, bold: true, color: pdf.text });
      xPos += widths[i];
    });
    spec.rows.forEach((row, r) => {
      const rowY = y + 56 + r * 86;
      drawRect(cmds, x, rowY, 870, 76, r % 2 === 0 ? pdf.panel : pdf.panel2, pdf.stroke);
      xPos = x;
      row.forEach((cell, i) => {
        drawWrapped(cmds, xPos + 8, rowY + 12, widths[i] - 16, [cell], {
          size: i === 1 ? 12 : 8.4,
          bold: i <= 1,
          color: i === 1 ? pdf.gold : pdf.muted,
          lineGap: i === 1 ? 16 : 12
        });
        xPos += widths[i];
      });
    });
  } else if (spec.kind === "sources") {
    drawPdfCard(cmds, 56, 104, 844, 92, "Caveat", [spec.caveat], pdf.warning);
    drawRect(cmds, 56, 218, 844, 270, pdf.panel, pdf.stroke);
    drawWrapped(cmds, 74, 238, 800, spec.sources.map((source) => `- ${source}`), {
      size: 7.4,
      color: pdf.muted,
      lineGap: 10.8,
      paragraphGap: 2
    });
  }

  return `${cmds.join("\n")}\n`;
}

function writePdf() {
  const pageStreams = deck.map((spec, i) => renderPdfPage(spec, i + 1));
  const objects = [];
  const addObject = (id, body) => {
    objects[id] = `${id} 0 obj\n${body}\nendobj\n`;
  };

  addObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  addObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  const pageIds = [];
  pageStreams.forEach((stream, i) => {
    const pageId = 5 + i * 2;
    const contentId = pageId + 1;
    pageIds.push(pageId);
    addObject(contentId, `<< /Length ${Buffer.byteLength(stream, "utf8")} >>\nstream\n${stream}endstream`);
    addObject(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdf.width} ${pdf.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
  });

  addObject(2, `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);
  addObject(1, "<< /Type /Catalog /Pages 2 0 R >>");

  const header = "%PDF-1.4\n";
  const parts = [header];
  const offsets = [0];
  let offset = Buffer.byteLength(header, "utf8");
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = offset;
    parts.push(objects[id]);
    offset += Buffer.byteLength(objects[id], "utf8");
  }

  const xrefOffset = offset;
  const xref = [
    "xref",
    `0 ${objects.length}`,
    "0000000000 65535 f "
  ];
  for (let id = 1; id < objects.length; id += 1) {
    xref.push(`${String(offsets[id]).padStart(10, "0")} 00000 n `);
  }
  const trailer = [
    ...xref,
    "trailer",
    `<< /Size ${objects.length} /Root 1 0 R >>`,
    "startxref",
    String(xrefOffset),
    "%%EOF",
    ""
  ].join("\n");
  parts.push(trailer);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PDF_PATH, parts.join(""));
}

writePptx();
writePdf();

console.log(`Wrote ${PPTX_PATH}`);
console.log(`Wrote ${PDF_PATH}`);
