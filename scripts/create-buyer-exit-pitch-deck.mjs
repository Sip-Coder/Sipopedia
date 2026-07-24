import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.resolve("docs", "presentations");
const BASE_NAME = "sip-studies-4-5m-buyer-exit-pitch-2026-05-25";
const PPTX_PATH = path.join(OUT_DIR, `${BASE_NAME}.pptx`);
const PDF_PATH = path.join(OUT_DIR, `${BASE_NAME}.pdf`);

const assets = {
  hero: "docs/presentations/assets/sip-pitch-hero.jpg",
  academy: "docs/presentations/assets/sip-pitch-academy.jpg",
  terroir: "docs/presentations/assets/sip-pitch-terroir.jpg",
  cellar: "docs/presentations/assets/sip-pitch-cellar.jpg",
  varietal: "docs/presentations/assets/sip-pitch-varietal.jpg",
  globe: "public/earth-topo-bathy-5400.jpg",
  sippy: "docs/presentations/assets/sip-pitch-sippy.jpg",
  roma: "docs/presentations/assets/sip-pitch-roma.jpg",
  hummin: "docs/presentations/assets/sip-pitch-hummin.jpg"
};

const slides = [
  {
    type: "hero",
    image: assets.hero,
    title: "$4.5M Strategic Acquisition Proposal",
    subtitle: "Sip Studies | Beverage learning, AI content workflows, and category IP",
    eyebrow: "Confidential buyer presentation | May 25, 2026",
    points: [
      "One transaction: acquire the platform, code, brand system, content engine, media library, and beverage-domain IP.",
      "Purpose-built for distributor enablement, supplier education, hospitality training, and category storytelling."
    ]
  },
  {
    type: "transaction",
    title: "Transaction Snapshot",
    subtitle: "A single premium strategic ask built around speed, exclusivity, and category fit.",
    ask: "$4.5M",
    cards: [
      ["Acquisition Target", "Sip Studies platform, IP, source code, brand assets, learning content, generated media, and operating workflows."],
      ["Buyer Use Case", "Internal sales training, customer education, supplier activation, AI/content operations, and portfolio knowledge enablement."],
      ["Strategic Logic", "Compress a 12-24 month build into a transfer, integration, and rollout process controlled by the buyer."]
    ]
  },
  {
    type: "fit",
    image: assets.globe,
    title: "Why A Distributor Buys This",
    subtitle: "Sip Studies turns beverage knowledge into a scalable operating asset.",
    pillars: [
      ["Train", "Accelerate associate onboarding and rep readiness across wine, spirits, beer, coffee, tea, maps, terms, and tasting."],
      ["Enable", "Give supplier, category, and sales teams a shared educational layer that improves account conversations."],
      ["Differentiate", "Move beyond order-taking tools with owned learning IP, AI-assisted content, and interactive experiences."]
    ],
    proof: "Breakthru publicly signals digital commerce, AI literacy, staff education, and beverage program training as strategic priorities."
  },
  {
    type: "ecosystem",
    title: "The Product: Beverage Learning OS",
    subtitle: "A buyer receives a live workspace, not a concept deck.",
    cards: [
      {
        image: assets.academy,
        heading: "Learn",
        lines: ["Sip Academy", "Sip Game", "Sipopedia", "Beverage Quiz", "Maps and Regions", "Grapes & Grains"]
      },
      {
        image: assets.terroir,
        heading: "Taste",
        lines: ["Flavor Wheel", "Tasting Journal", "Journal Archive", "Descriptor practice", "Local-first study tools"]
      },
      {
        image: assets.cellar,
        heading: "Connect",
        lines: ["Beverage News", "Flavor Blog", "AI Winecast", "Tasting Groups", "AI News", "Somm Events"]
      }
    ]
  },
  {
    type: "ip",
    title: "What The $4.5M Buys",
    subtitle: "The value is the assembled IP stack plus the time saved by owning it immediately.",
    metrics: [
      ["20,000", "Sipopedia JSONL candidate rows"],
      ["3,600+", "PNG/media assets reviewed in repo inventory"],
      ["69", "Supabase migrations"],
      ["5", "Supabase Edge Functions"],
      ["18", "Workspace modules"]
    ],
    stack: [
      ["Software platform", 28],
      ["Beverage content/IP", 30],
      ["Media and game assets", 16],
      ["AI/news workflows", 14],
      ["Brand + transition", 12]
    ]
  },
  {
    type: "tech",
    title: "Technology Platform",
    subtitle: "The buyer gets a working application stack that already supports auth, subscriptions, AI routing, and content operations.",
    blocks: [
      ["Frontend", "React 18, TypeScript, Vite, hash-routed workspace, local-first study surfaces."],
      ["Data/Auth", "Supabase auth, profiles, subscription state, terminology, and data-backed features."],
      ["Payments", "Stripe Checkout, server-side Price IDs, billing webhook, paid-access writeback."],
      ["AI + News", "Edge Functions for AI routing, news routing, terminology harvesting, and provider-key isolation."]
    ]
  },
  {
    type: "engine",
    image: assets.varietal,
    title: "Content And AI Engine",
    subtitle: "Sip Studies is built to keep producing category education, not just host static lessons.",
    flow: [
      "Source feeds",
      "AI/news router",
      "Editorial standard",
      "Review queue",
      "Published learning surface"
    ],
    notes: [
      "Daily Sip and Beverage News create repeat engagement loops.",
      "Terminology automation creates a durable category vocabulary asset.",
      "Citation and provenance standards reduce diligence friction when packaged before close."
    ]
  },
  {
    type: "monetization",
    title: "Monetization Already Exists",
    subtitle: "The direct-to-learner model is useful; the buyer unlocks larger enterprise value.",
    cards: [
      ["Public Preview", "No checkout", "Launch Pad discovery and account creation remain outside the pricing tiers."],
      ["Membership", "$10/mo", "Full study access, quiz and terminology workflows, tasting tools, and priority support."],
      ["Future Launches", "Separate", "Cohorts and community-funded projects return through dedicated campaign experiences."]
    ],
    enterprise: [
      "Distributor license",
      "Supplier-sponsored education",
      "Retail/on-premise customer enablement",
      "Internal certification and onboarding"
    ]
  },
  {
    type: "roi",
    title: "Buyer ROI Thesis",
    subtitle: "For a 10,000-associate distributor, $4.5M is a strategic capability purchase, not a content expense.",
    stats: [
      ["$4.5M", "single acquisition ask"],
      ["~$450", "one-time cost per 10,000 associates"],
      ["24/7", "reusable education surface for teams and customers"]
    ],
    levers: [
      ["Rep readiness", "More confident category conversations and faster onboarding."],
      ["Supplier activation", "Better training paths for new brands, seasonal launches, and portfolio stories."],
      ["Customer education", "Reusable learning experiences for retail and on-premise partners."],
      ["AI literacy", "A beverage-specific sandbox for practical AI/content workflows."]
    ]
  },
  {
    type: "timeline",
    title: "90-Day Integration Plan",
    subtitle: "The acquisition can be staged so value appears before a full enterprise rollout.",
    phases: [
      ["Days 0-30", "Diligence, IP assignment, repo transfer, secrets audit, product demo path, brand/use-rights package."],
      ["Days 31-60", "Pilot workspace, buyer SSO/auth planning, content QA sprint, internal training map, supplier demo package."],
      ["Days 61-90", "Launch internal cohort, define customer education pilot, measure engagement, prioritize enterprise roadmap."]
    ]
  },
  {
    type: "terms",
    title: "Proposed $4.5M Deal Terms",
    subtitle: "Keep the offer clean: acquire the asset, preserve momentum, and attach founder knowledge transfer.",
    left: [
      "Purchase price: $4,500,000.",
      "Includes source code, docs, content, data schemas, generated media, brand materials, and operating playbooks.",
      "Includes 90-180 days of founder transition and buyer enablement."
    ],
    right: [
      "Buyer receives exclusive control over the acquired business/IP package.",
      "Closing checklist should include IP chain-of-title, asset schedule, open-source inventory, secrets scan, and validation evidence.",
      "Any retained founder rights should be written explicitly before LOI."
    ]
  },
  {
    type: "diligence",
    title: "Diligence Readiness",
    subtitle: "The highest-value next step is packaging proof, not lowering the ask.",
    ready: [
      "Build and website validation passed locally.",
      "Architecture documents describe Supabase, Stripe, and Edge Function contracts.",
      "Pricing model and paid-access flow exist in code.",
      "Terminology, map, academy, game, and news assets are present."
    ],
    package: [
      "Create buyer demo credentials and 5-minute scripted demo.",
      "Produce source and rights inventory for generated images and citations.",
      "Export usage, traffic, email list, customer, or pilot metrics if available.",
      "Run secret scan and terminology validator before a diligence data room."
    ]
  },
  {
    type: "close",
    image: assets.academy,
    title: "The Ask",
    subtitle: "Acquire Sip Studies for $4.5M and convert beverage education into a proprietary distributor advantage.",
    points: [
      "Approve diligence under NDA.",
      "Confirm the buyer use case: internal enablement, customer education, supplier activation, or all three.",
      "Move to LOI with a $4.5M purchase price and defined transition scope."
    ]
  },
  {
    type: "sources",
    title: "Sources And Caveats",
    subtitle: "This presentation is a strategic estimate for acquisition discussion, not legal, tax, accounting, or investment-banking advice.",
    sources: [
      "Breakthru Beverage Group official site: https://www.breakthrubev.com/?lang=en",
      "Breakthru About: https://www.breakthrubev.com/About?sc_lang=en",
      "Breakthru Now: https://now.breakthrubev.com/",
      "Breakthru Alchemy: https://alchemy.breakthrubev.com/",
      "NBWA AI and innovation profile: https://nbwa.org/glenn-remoreras-leads-ai-and-innovation-at-breakthru-beverage/",
      "Grand View U.S. LMS outlook: https://www.grandviewresearch.com/horizon/outlook/learning-management-system-market/united-states",
      "SaaS Capital new-normal valuation context: https://www.saas-capital.com/blog-posts/saas-valuation-multiples-understanding-the-new-normal/",
      "Software Equity Group SaaS report: https://softwareequity.com/research/quarterly-saas-report/"
    ]
  }
];

const theme = {
  w: 13.333,
  h: 7.5,
  emu: 914400,
  bg: "041D26",
  panel: "082B35",
  panel2: "0B3642",
  stroke: "24586B",
  text: "F7F0DF",
  muted: "A9C7CC",
  gold: "F3D18A",
  blue: "65D2E8",
  green: "8FCB9B",
  amber: "E7A95F",
  red: "DB6A5A"
};

const media = new Map();
const mediaFiles = [];

function ensureAsset(file) {
  const resolved = path.resolve(file);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Missing asset: ${file}`);
  }
  return resolved;
}

function getMedia(file) {
  const resolved = ensureAsset(file);
  if (media.has(resolved)) return media.get(resolved);
  const ext = path.extname(resolved).slice(1).toLowerCase().replace("jpeg", "jpg");
  const name = `image${media.size + 1}.${ext}`;
  const record = { source: resolved, name, ext };
  media.set(resolved, record);
  mediaFiles.push(record);
  return record;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&apos;");
}

function emu(inches) {
  return Math.round(inches * theme.emu);
}

function rgb(hex) {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255
  ];
}

class Slide {
  constructor(index, spec) {
    this.index = index;
    this.spec = spec;
    this.id = 1;
    this.items = [];
    this.rels = [];
    this.relBySource = new Map();
    this.rect(0, 0, theme.w, theme.h, theme.bg, null);
    this.rect(0, 0, 0.13, theme.h, theme.blue, null);
    this.rect(0.13, 0, 0.03, theme.h, theme.gold, null);
  }

  nextId() {
    this.id += 1;
    return this.id;
  }

  relFor(file) {
    const record = getMedia(file);
    if (this.relBySource.has(record.source)) return this.relBySource.get(record.source);
    const relId = `rId${this.rels.length + 2}`;
    this.rels.push({ id: relId, target: `../media/${record.name}` });
    this.relBySource.set(record.source, relId);
    return relId;
  }

  rect(x, y, w, h, fill, line = theme.stroke, round = false) {
    const id = this.nextId();
    const fillXml = fill ? `<a:solidFill><a:srgbClr val="${fill}"/></a:solidFill>` : "<a:noFill/>";
    const lineXml = line ? `<a:ln w="12700"><a:solidFill><a:srgbClr val="${line}"/></a:solidFill></a:ln>` : "<a:ln><a:noFill/></a:ln>";
    this.items.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${id}" name="Shape ${id}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm>
          <a:prstGeom prst="${round ? "roundRect" : "rect"}"><a:avLst/></a:prstGeom>
          ${fillXml}${lineXml}
        </p:spPr>
      </p:sp>`);
  }

  image(file, x, y, w, h) {
    const id = this.nextId();
    const relId = this.relFor(file);
    this.items.push(`
      <p:pic>
        <p:nvPicPr><p:cNvPr id="${id}" name="Image ${id}"/><p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr><p:nvPr/></p:nvPicPr>
        <p:blipFill><a:blip r:embed="${relId}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>
        <p:spPr>
          <a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:ln><a:noFill/></a:ln>
        </p:spPr>
      </p:pic>`);
  }

  text(x, y, w, h, lines, opts = {}) {
    const id = this.nextId();
    const size = Math.round((opts.size || 12) * 100);
    const color = opts.color || theme.text;
    const bold = opts.bold ? " b=\"1\"" : "";
    const align = opts.align || "l";
    const paras = lines.map((line) => `
      <a:p>
        <a:pPr algn="${align}"><a:lnSpc><a:spcPct val="108000"/></a:lnSpc></a:pPr>
        <a:r>
          <a:rPr lang="en-US" sz="${size}"${bold}>
            <a:solidFill><a:srgbClr val="${color}"/></a:solidFill>
            <a:latin typeface="${esc(opts.font || "Aptos")}"/>
          </a:rPr>
          <a:t>${esc(line)}</a:t>
        </a:r>
        <a:endParaRPr lang="en-US" sz="${size}"><a:solidFill><a:srgbClr val="${color}"/></a:solidFill></a:endParaRPr>
      </a:p>`).join("");
    this.items.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${id}" name="Text ${id}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr>
          <a:xfrm><a:off x="${emu(x)}" y="${emu(y)}"/><a:ext cx="${emu(w)}" cy="${emu(h)}"/></a:xfrm>
          <a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln><a:noFill/></a:ln>
        </p:spPr>
        <p:txBody>
          <a:bodyPr wrap="square" anchor="${opts.anchor || "t"}" lIns="45720" tIns="22860" rIns="45720" bIns="22860"/>
          <a:lstStyle/>${paras}
        </p:txBody>
      </p:sp>`);
  }

  title() {
    this.text(0.53, 0.32, 9.5, 0.5, [this.spec.title], { size: 23, bold: true });
    if (this.spec.subtitle) this.text(0.55, 0.82, 10.8, 0.36, [this.spec.subtitle], { size: 9.5, color: theme.muted });
  }

  footer() {
    this.text(0.52, 7.08, 6.2, 0.22, ["Sip Studies | $4.5M buyer exit pitch"], { size: 7.2, color: "6E9CA7" });
    this.text(12.15, 7.08, 0.7, 0.22, [String(this.index)], { size: 7.2, color: "6E9CA7", align: "r" });
  }

  card(x, y, w, h, heading, lines, color = theme.gold, size = 10.1) {
    this.rect(x, y, w, h, theme.panel, theme.stroke, true);
    this.text(x + 0.16, y + 0.16, w - 0.32, 0.34, [heading], { size: 13, bold: true, color });
    this.text(x + 0.19, y + 0.64, w - 0.38, h - 0.78, lines.map((line) => `- ${line}`), { size, color: theme.muted });
  }

  metric(x, y, w, label, value, color = theme.gold) {
    this.rect(x, y, w, 0.94, "092A34", color, true);
    this.text(x + 0.08, y + 0.13, w - 0.16, 0.38, [value], { size: 20, bold: true, color: theme.text, align: "c" });
    this.text(x + 0.08, y + 0.56, w - 0.16, 0.24, [label], { size: 7.2, color: theme.muted, align: "c" });
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

function renderSlide(spec, index) {
  const s = new Slide(index, spec);
  if (spec.type === "hero") {
    s.image(spec.image, 0.16, 0, 13.18, 7.5);
    s.rect(0.16, 0, 6.5, 7.5, "041D26", null);
    s.rect(0.58, 0.5, 2.9, 0.33, "123B47", theme.gold, true);
    s.text(0.66, 0.56, 2.75, 0.2, [spec.eyebrow], { size: 7.4, color: theme.gold, bold: true });
    s.text(0.62, 1.3, 5.55, 1.25, [spec.title], { size: 31, bold: true, color: theme.gold });
    s.text(0.68, 2.7, 4.9, 0.42, [spec.subtitle], { size: 13, color: theme.text });
    s.text(0.72, 3.52, 5.25, 1.2, spec.points.map((p) => `- ${p}`), { size: 11, color: theme.muted });
    s.rect(7.72, 5.08, 4.6, 1.35, "092A34", theme.gold, true);
    s.text(7.94, 5.31, 4.15, 0.38, ["Buyer ask"], { size: 12, color: theme.muted, bold: true, align: "c" });
    s.text(7.94, 5.67, 4.15, 0.54, ["$4,500,000"], { size: 28, color: theme.gold, bold: true, align: "c" });
    s.footer();
    return s;
  }

  s.title();
  if (spec.type === "transaction") {
    s.rect(0.68, 1.44, 4.05, 4.8, "092A34", theme.gold, true);
    s.text(0.84, 1.88, 3.7, 0.42, ["Proposed purchase price"], { size: 13, color: theme.muted, bold: true, align: "c" });
    s.text(0.76, 2.52, 3.9, 0.92, [spec.ask], { size: 46, bold: true, color: theme.gold, align: "c" });
    s.text(0.88, 3.65, 3.65, 1.1, ["Strategic acquisition of a built beverage-learning operating system."], { size: 15, color: theme.text, align: "c" });
    spec.cards.forEach((card, i) => s.card(5.05, 1.36 + i * 1.62, 7.48, 1.28, card[0], [card[1]], [theme.blue, theme.green, theme.amber][i], 9.3));
  } else if (spec.type === "fit") {
    s.image(spec.image, 0.16, 1.28, 12.9, 5.35);
    s.rect(0.16, 1.28, 12.9, 5.35, "041D26", null);
    spec.pillars.forEach((p, i) => s.card(0.72 + i * 4.05, 1.65, 3.7, 3.0, p[0], [p[1]], [theme.gold, theme.blue, theme.green][i], 10));
    s.rect(1.15, 5.08, 11.0, 0.72, "092A34", theme.gold, true);
    s.text(1.36, 5.26, 10.6, 0.34, [spec.proof], { size: 12, color: theme.text, align: "c" });
  } else if (spec.type === "ecosystem") {
    spec.cards.forEach((card, i) => {
      const x = 0.7 + i * 4.05;
      s.image(card.image, x, 1.36, 3.75, 1.65);
      s.rect(x, 3.05, 3.75, 3.08, theme.panel, theme.stroke, true);
      s.text(x + 0.16, 3.24, 3.4, 0.32, [card.heading], { size: 15, color: [theme.gold, theme.blue, theme.green][i], bold: true });
      s.text(x + 0.2, 3.78, 3.28, 2.15, card.lines.map((line) => `- ${line}`), { size: 9.9, color: theme.muted });
    });
  } else if (spec.type === "ip") {
    spec.metrics.forEach((m, i) => s.metric(0.7 + i * 2.45, 1.34, 2.16, m[1], m[0], [theme.gold, theme.blue, theme.green, theme.amber, theme.gold][i]));
    s.card(0.82, 2.72, 4.6, 3.1, "Asset basis", [
      "The buyer is acquiring assembled execution: product, content, generated media, data model, and source-backed workflows.",
      "The $4.5M ask prices control, acceleration, and exclusivity."
    ], theme.gold, 10.6);
    let y = 2.88;
    spec.stack.forEach((row, i) => {
      const barW = row[1] * 0.14;
      s.text(5.78, y - 0.03, 2.2, 0.22, [row[0]], { size: 8.4, color: theme.muted });
      s.rect(8.12, y, barW, 0.26, [theme.gold, theme.blue, theme.green, theme.amber, theme.red][i], null);
      s.text(8.18 + barW, y - 0.02, 0.6, 0.22, [`${row[1]}%`], { size: 8.2, color: theme.text });
      y += 0.48;
    });
    s.text(5.78, 2.36, 5.2, 0.3, ["Illustrative value composition"], { size: 14, bold: true, color: theme.blue });
  } else if (spec.type === "tech") {
    spec.blocks.forEach((b, i) => {
      const x = i % 2 === 0 ? 0.82 : 6.82;
      const y = i < 2 ? 1.42 : 3.78;
      s.card(x, y, 5.35, 1.72, b[0], [b[1]], [theme.gold, theme.blue, theme.green, theme.amber][i], 10);
    });
    s.rect(2.1, 6.0, 9.1, 0.35, "123B47", null, true);
    s.text(2.25, 6.08, 8.8, 0.2, ["React/Vite app -> Supabase -> Edge Functions -> Stripe/Auth/AI/News -> buyer rollout"], { size: 8.6, color: theme.text, align: "c" });
  } else if (spec.type === "engine") {
    s.image(spec.image, 0.16, 1.26, 12.95, 5.4);
    s.rect(0.16, 1.26, 12.95, 5.4, "041D26", null);
    spec.flow.forEach((step, i) => {
      const x = 0.78 + i * 2.45;
      s.rect(x, 1.72, 1.85, 0.78, "092A34", [theme.gold, theme.blue, theme.green, theme.amber, theme.gold][i], true);
      s.text(x + 0.08, 1.98, 1.68, 0.22, [step], { size: 8.5, bold: true, color: theme.text, align: "c" });
      if (i < spec.flow.length - 1) s.text(x + 1.88, 1.98, 0.38, 0.22, ["->"], { size: 13, color: theme.gold, align: "c" });
    });
    s.card(1.15, 3.25, 10.92, 2.0, "Recurring content advantage", spec.notes, theme.gold, 11);
  } else if (spec.type === "monetization") {
    spec.cards.forEach((c, i) => {
      const x = 0.72 + i * 4.05;
      s.rect(x, 1.35, 3.7, 2.1, theme.panel, [theme.gold, theme.blue, theme.green][i], true);
      s.text(x + 0.18, 1.58, 3.34, 0.26, [c[0]], { size: 13, bold: true, color: [theme.gold, theme.blue, theme.green][i] });
      s.text(x + 0.18, 1.96, 3.34, 0.5, [c[1]], { size: 25, bold: true, color: theme.text });
      s.text(x + 0.2, 2.62, 3.24, 0.58, [c[2]], { size: 8.8, color: theme.muted });
    });
    s.card(1.28, 4.1, 10.78, 1.55, "Enterprise expansion path", spec.enterprise, theme.gold, 11);
  } else if (spec.type === "roi") {
    spec.stats.forEach((stat, i) => s.metric(0.88 + i * 4.0, 1.38, 3.3, stat[1], stat[0], [theme.gold, theme.blue, theme.green][i]));
    spec.levers.forEach((lever, i) => {
      const x = i % 2 === 0 ? 0.9 : 6.8;
      const y = i < 2 ? 3.0 : 4.58;
      s.card(x, y, 5.25, 1.12, lever[0], [lever[1]], [theme.gold, theme.blue, theme.green, theme.amber][i], 8.7);
    });
  } else if (spec.type === "timeline") {
    spec.phases.forEach((phase, i) => {
      const x = 0.82 + i * 4.05;
      s.rect(x, 1.45, 3.65, 4.62, theme.panel, [theme.gold, theme.blue, theme.green][i], true);
      s.text(x + 0.18, 1.72, 3.28, 0.34, [phase[0]], { size: 17, bold: true, color: [theme.gold, theme.blue, theme.green][i], align: "c" });
      s.text(x + 0.26, 2.38, 3.12, 3.0, [phase[1]], { size: 10.2, color: theme.muted });
    });
  } else if (spec.type === "terms") {
    s.card(0.78, 1.42, 5.72, 4.72, "$4.5M purchase", spec.left, theme.gold, 11);
    s.card(6.84, 1.42, 5.62, 4.72, "Control and close", spec.right, theme.blue, 11);
  } else if (spec.type === "diligence") {
    s.card(0.78, 1.42, 5.72, 4.72, "Ready now", spec.ready, theme.green, 10.5);
    s.card(6.84, 1.42, 5.62, 4.72, "Package before LOI", spec.package, theme.gold, 10.5);
  } else if (spec.type === "close") {
    s.image(spec.image, 0.16, 1.24, 12.95, 5.5);
    s.rect(0.16, 1.24, 12.95, 5.5, "041D26", null);
    s.text(0.78, 1.76, 5.8, 0.88, [spec.subtitle], { size: 21, bold: true, color: theme.gold });
    s.card(7.2, 2.02, 4.8, 2.95, "Next step", spec.points, theme.blue, 12);
    s.text(0.86, 5.12, 5.1, 0.55, ["$4,500,000"], { size: 35, bold: true, color: theme.gold });
  } else if (spec.type === "sources") {
    s.card(0.7, 1.34, 12.0, 4.95, "Source notes", spec.sources, theme.gold, 7.7);
  }
  s.footer();
  return s;
}

function contentTypes(count) {
  const slideTypes = Array.from({ length: count }, (_, i) => `<Override PartName="/ppt/slides/slide${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Default Extension="jpg" ContentType="image/jpeg"/>
  <Default Extension="jpeg" ContentType="image/jpeg"/>
  <Default Extension="png" ContentType="image/png"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${slideTypes}
</Types>`;
}

function rootRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
}

function presentationXml(count) {
  const ids = Array.from({ length: count }, (_, i) => `<p:sldId id="${256 + i}" r:id="rId${i + 2}"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>${ids}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000" type="wide"/><p:notesSz cx="6858000" cy="9144000"/>
  <p:defaultTextStyle><a:defPPr><a:defRPr lang="en-US"/></a:defPPr></p:defaultTextStyle>
</p:presentation>`;
}

function presentationRels(count) {
  const rels = Array.from({ length: count }, (_, i) => `<Relationship Id="rId${i + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i + 1}.xml"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>${rels}</Relationships>`;
}

function slideRels(slide) {
  const imageRels = slide.rels.map((rel) => `<Relationship Id="${rel.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${rel.target}"/>`).join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>${imageRels}</Relationships>`;
}

function slideMasterXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst><p:txStyles><p:titleStyle/><p:bodyStyle/><p:otherStyle/></p:txStyles></p:sldMaster>`;
}

function slideMasterRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/></Relationships>`;
}

function slideLayoutXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank" preserve="1"><p:cSld name="Blank"><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
}

function slideLayoutRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/></Relationships>`;
}

function themeXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Sip Studies"><a:themeElements><a:clrScheme name="Sip Studies"><a:dk1><a:srgbClr val="041D26"/></a:dk1><a:lt1><a:srgbClr val="F7F0DF"/></a:lt1><a:dk2><a:srgbClr val="082B35"/></a:dk2><a:lt2><a:srgbClr val="A9C7CC"/></a:lt2><a:accent1><a:srgbClr val="F3D18A"/></a:accent1><a:accent2><a:srgbClr val="65D2E8"/></a:accent2><a:accent3><a:srgbClr val="8FCB9B"/></a:accent3><a:accent4><a:srgbClr val="E7A95F"/></a:accent4><a:accent5><a:srgbClr val="24586B"/></a:accent5><a:accent6><a:srgbClr val="FFFFFF"/></a:accent6><a:hlink><a:srgbClr val="65D2E8"/></a:hlink><a:folHlink><a:srgbClr val="F3D18A"/></a:folHlink></a:clrScheme><a:fontScheme name="Aptos"><a:majorFont><a:latin typeface="Aptos Display"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont><a:minorFont><a:latin typeface="Aptos"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont></a:fontScheme><a:fmtScheme name="Default"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/></a:theme>`;
}

function coreXml() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Sip Studies 4.5M Buyer Exit Pitch</dc:title><dc:creator>OpenAI Codex</dc:creator><cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">2026-05-25T00:00:00Z</dcterms:modified></cp:coreProperties>`;
}

function appXml(count) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>OpenAI Codex</Application><PresentationFormat>Widescreen</PresentationFormat><Slides>${count}</Slides><Company>Sip Studies</Company></Properties>`;
}

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
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
    const nameBuf = Buffer.from(name, "utf8");
    const data = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(data);
    const lh = Buffer.concat([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBuf.length), u16(0), nameBuf]);
    local.push(lh, data);
    central.push(Buffer.concat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(data.length), u32(data.length), u16(nameBuf.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBuf]));
    offset += lh.length + data.length;
  }
  const cd = Buffer.concat(central);
  return Buffer.concat([...local, cd, Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cd.length), u32(offset), u16(0)])]);
}

function writePptx() {
  const rendered = slides.map((spec, i) => renderSlide(spec, i + 1));
  const files = [
    ["[Content_Types].xml", contentTypes(slides.length)],
    ["_rels/.rels", rootRels()],
    ["docProps/core.xml", coreXml()],
    ["docProps/app.xml", appXml(slides.length)],
    ["ppt/presentation.xml", presentationXml(slides.length)],
    ["ppt/_rels/presentation.xml.rels", presentationRels(slides.length)],
    ["ppt/slideMasters/slideMaster1.xml", slideMasterXml()],
    ["ppt/slideMasters/_rels/slideMaster1.xml.rels", slideMasterRels()],
    ["ppt/slideLayouts/slideLayout1.xml", slideLayoutXml()],
    ["ppt/slideLayouts/_rels/slideLayout1.xml.rels", slideLayoutRels()],
    ["ppt/theme/theme1.xml", themeXml()]
  ];
  rendered.forEach((slide, i) => {
    files.push([`ppt/slides/slide${i + 1}.xml`, slide.xml()]);
    files.push([`ppt/slides/_rels/slide${i + 1}.xml.rels`, slideRels(slide)]);
  });
  for (const item of mediaFiles) files.push([`ppt/media/${item.name}`, fs.readFileSync(item.source)]);
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PPTX_PATH, zipStore(files));
}

const pdf = {
  w: 960,
  h: 540,
  bg: rgb(theme.bg),
  panel: rgb(theme.panel),
  panel2: rgb(theme.panel2),
  stroke: rgb(theme.stroke),
  text: rgb(theme.text),
  muted: rgb(theme.muted),
  gold: rgb(theme.gold),
  blue: rgb(theme.blue),
  green: rgb(theme.green),
  amber: rgb(theme.amber),
  red: rgb(theme.red)
};

const pdfImages = new Map();

function jpegSize(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  throw new Error("Unable to read JPEG dimensions");
}

function pdfImage(file) {
  const resolved = ensureAsset(file);
  if (pdfImages.has(resolved)) return pdfImages.get(resolved);
  if (!resolved.toLowerCase().match(/\.jpe?g$/)) throw new Error(`PDF only embeds JPEG assets: ${file}`);
  const data = fs.readFileSync(resolved);
  const size = jpegSize(data);
  const key = `Im${pdfImages.size + 1}`;
  const record = { key, file: resolved, data, ...size };
  pdfImages.set(resolved, record);
  return record;
}

function pdfEsc(v) {
  return String(v).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function color(c, op = "rg") {
  return `${c.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function rect(cmds, x, yTop, w, h, fill, stroke = null) {
  const y = pdf.h - yTop - h;
  cmds.push("q");
  if (fill) cmds.push(color(fill, "rg"));
  if (stroke) cmds.push(color(stroke, "RG"));
  cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill && stroke ? "B" : fill ? "f" : "S"}`);
  cmds.push("Q");
}

function text(cmds, x, yTop, value, opts = {}) {
  const size = opts.size || 11;
  const font = opts.bold ? "F2" : "F1";
  const y = pdf.h - yTop - size;
  cmds.push("BT", color(opts.color || pdf.text, "rg"), `/${font} ${size.toFixed(1)} Tf`, `${x.toFixed(2)} ${y.toFixed(2)} Td`, `(${pdfEsc(value)}) Tj`, "ET");
}

function wrap(value, width, size) {
  const words = String(value).split(/\s+/);
  const max = Math.max(12, Math.floor(width / (size * 0.52)));
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function wrapped(cmds, x, yTop, w, rows, opts = {}) {
  let y = yTop;
  const size = opts.size || 10;
  for (const row of rows) {
    for (const line of wrap(row, w, size)) {
      text(cmds, x, y, line, opts);
      y += opts.lineGap || size * 1.35;
    }
    y += opts.gap || 4;
  }
}

function drawImage(cmds, page, file, x, yTop, w, h, mode = "cover") {
  const img = pdfImage(file);
  page.xobjects.add(img.key);
  const rectY = pdf.h - yTop - h;
  const scale = mode === "contain" ? Math.min(w / img.width, h / img.height) : Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = x + (w - dw) / 2;
  const dy = rectY + (h - dh) / 2;
  cmds.push(`q ${x.toFixed(2)} ${rectY.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re W n ${dw.toFixed(2)} 0 0 ${dh.toFixed(2)} ${dx.toFixed(2)} ${dy.toFixed(2)} cm /${img.key} Do Q`);
}

function chrome(cmds, spec, idx) {
  rect(cmds, 0, 0, pdf.w, pdf.h, pdf.bg);
  rect(cmds, 0, 0, 10, pdf.h, pdf.blue);
  rect(cmds, 10, 0, 3, pdf.h, pdf.gold);
  if (spec.type !== "hero") {
    text(cmds, 42, 28, spec.title, { size: 21, bold: true });
    if (spec.subtitle) text(cmds, 44, 64, spec.subtitle, { size: 9.4, color: pdf.muted });
  }
  text(cmds, 42, 512, "Sip Studies | $4.5M buyer exit pitch", { size: 7, color: rgb("6E9CA7") });
  text(cmds, 905, 512, String(idx), { size: 7, color: rgb("6E9CA7") });
}

function cardPdf(cmds, x, y, w, h, heading, lines, c = pdf.gold, size = 9.5) {
  rect(cmds, x, y, w, h, pdf.panel, pdf.stroke);
  text(cmds, x + 12, y + 14, heading, { size: 12.5, bold: true, color: c });
  wrapped(cmds, x + 16, y + 46, w - 28, lines.map((line) => `- ${line}`), { size, color: pdf.muted, lineGap: size * 1.35, gap: 3 });
}

function metricPdf(cmds, x, y, w, value, label, c = pdf.gold) {
  rect(cmds, x, y, w, 70, rgb("092A34"), c);
  text(cmds, x + 10, y + 14, value, { size: 21, bold: true, color: pdf.text });
  wrapped(cmds, x + 10, y + 42, w - 20, [label], { size: 7, color: pdf.muted, lineGap: 9, gap: 0 });
}

function renderPdfPage(spec, idx) {
  const page = { xobjects: new Set() };
  const cmds = [];
  chrome(cmds, spec, idx);
  if (spec.type === "hero") {
    drawImage(cmds, page, spec.image, 13, 0, 947, 540);
    rect(cmds, 13, 0, 474, 540, pdf.bg);
    rect(cmds, 46, 40, 235, 25, rgb("123B47"), pdf.gold);
    text(cmds, 60, 48, spec.eyebrow, { size: 7.5, bold: true, color: pdf.gold });
    text(cmds, 52, 102, "$4.5M Strategic", { size: 35, bold: true, color: pdf.gold });
    text(cmds, 52, 145, "Acquisition Proposal", { size: 35, bold: true, color: pdf.gold });
    text(cmds, 58, 210, spec.subtitle, { size: 13, color: pdf.text });
    wrapped(cmds, 62, 270, 380, spec.points.map((p) => `- ${p}`), { size: 11, color: pdf.muted, lineGap: 15 });
    rect(cmds, 590, 365, 310, 94, rgb("092A34"), pdf.gold);
    text(cmds, 694, 385, "Buyer ask", { size: 12, bold: true, color: pdf.muted });
    text(cmds, 652, 418, "$4,500,000", { size: 31, bold: true, color: pdf.gold });
  } else if (spec.type === "transaction") {
    rect(cmds, 52, 108, 302, 338, rgb("092A34"), pdf.gold);
    text(cmds, 114, 142, "Proposed purchase price", { size: 13, bold: true, color: pdf.muted });
    text(cmds, 91, 208, spec.ask, { size: 48, bold: true, color: pdf.gold });
    wrapped(cmds, 85, 310, 240, ["Strategic acquisition of a built beverage-learning operating system."], { size: 15, color: pdf.text, lineGap: 20 });
    spec.cards.forEach((c, i) => cardPdf(cmds, 385, 104 + i * 116, 520, 88, c[0], [c[1]], [pdf.blue, pdf.green, pdf.amber][i], 8.9));
  } else if (spec.type === "fit") {
    drawImage(cmds, page, spec.image, 13, 88, 947, 380);
    rect(cmds, 13, 88, 947, 380, pdf.bg);
    spec.pillars.forEach((p, i) => cardPdf(cmds, 54 + i * 296, 124, 270, 220, p[0], [p[1]], [pdf.gold, pdf.blue, pdf.green][i], 10));
    rect(cmds, 95, 374, 770, 56, rgb("092A34"), pdf.gold);
    wrapped(cmds, 126, 393, 710, [spec.proof], { size: 11, bold: true, color: pdf.text, lineGap: 14 });
  } else if (spec.type === "ecosystem") {
    spec.cards.forEach((c, i) => {
      const x = 54 + i * 296;
      drawImage(cmds, page, c.image, x, 108, 270, 120);
      cardPdf(cmds, x, 232, 270, 230, c.heading, c.lines, [pdf.gold, pdf.blue, pdf.green][i], 9.6);
    });
  } else if (spec.type === "ip") {
    spec.metrics.forEach((m, i) => metricPdf(cmds, 52 + i * 178, 106, 158, m[0], m[1], [pdf.gold, pdf.blue, pdf.green, pdf.amber, pdf.gold][i]));
    cardPdf(cmds, 64, 234, 345, 210, "Asset basis", ["The buyer is acquiring assembled execution: product, content, generated media, data model, and source-backed workflows.", "The $4.5M ask prices control, acceleration, and exclusivity."], pdf.gold, 10);
    text(cmds, 454, 226, "Illustrative value composition", { size: 14, bold: true, color: pdf.blue });
    spec.stack.forEach((row, i) => {
      const y = 264 + i * 34;
      text(cmds, 454, y + 4, row[0], { size: 8.5, color: pdf.muted });
      rect(cmds, 620, y, row[1] * 5.2, 18, [pdf.gold, pdf.blue, pdf.green, pdf.amber, pdf.red][i]);
      text(cmds, 625 + row[1] * 5.2, y + 3, `${row[1]}%`, { size: 8, color: pdf.text });
    });
  } else if (spec.type === "tech") {
    spec.blocks.forEach((b, i) => cardPdf(cmds, i % 2 === 0 ? 60 : 500, i < 2 ? 112 : 282, 390, 126, b[0], [b[1]], [pdf.gold, pdf.blue, pdf.green, pdf.amber][i], 9.5));
    rect(cmds, 150, 460, 660, 28, rgb("123B47"));
    text(cmds, 183, 470, "React/Vite -> Supabase -> Edge Functions -> Stripe/Auth/AI/News -> buyer rollout", { size: 8.6, color: pdf.text });
  } else if (spec.type === "engine") {
    drawImage(cmds, page, spec.image, 13, 88, 947, 390);
    rect(cmds, 13, 88, 947, 390, pdf.bg);
    spec.flow.forEach((step, i) => {
      const x = 58 + i * 176;
      rect(cmds, x, 128, 130, 55, rgb("092A34"), [pdf.gold, pdf.blue, pdf.green, pdf.amber, pdf.gold][i]);
      text(cmds, x + 15, 149, step, { size: 8.4, bold: true, color: pdf.text });
      if (i < spec.flow.length - 1) text(cmds, x + 140, 148, "->", { size: 14, bold: true, color: pdf.gold });
    });
    cardPdf(cmds, 96, 252, 768, 146, "Recurring content advantage", spec.notes, pdf.gold, 11);
  } else if (spec.type === "monetization") {
    spec.cards.forEach((c, i) => {
      const x = 54 + i * 296;
      rect(cmds, x, 110, 270, 150, pdf.panel, [pdf.gold, pdf.blue, pdf.green][i]);
      text(cmds, x + 14, 130, c[0], { size: 13, bold: true, color: [pdf.gold, pdf.blue, pdf.green][i] });
      text(cmds, x + 14, 166, c[1], { size: 25, bold: true, color: pdf.text });
      wrapped(cmds, x + 16, 215, 238, [c[2]], { size: 8.5, color: pdf.muted, lineGap: 12 });
    });
    cardPdf(cmds, 96, 330, 768, 112, "Enterprise expansion path", spec.enterprise, pdf.gold, 11);
  } else if (spec.type === "roi") {
    spec.stats.forEach((s, i) => metricPdf(cmds, 70 + i * 290, 110, 245, s[0], s[1], [pdf.gold, pdf.blue, pdf.green][i]));
    spec.levers.forEach((l, i) => cardPdf(cmds, i % 2 === 0 ? 70 : 500, i < 2 ? 262 : 380, 385, 82, l[0], [l[1]], [pdf.gold, pdf.blue, pdf.green, pdf.amber][i], 8.8));
  } else if (spec.type === "timeline") {
    spec.phases.forEach((p, i) => cardPdf(cmds, 54 + i * 296, 112, 270, 332, p[0], [p[1]], [pdf.gold, pdf.blue, pdf.green][i], 10.2));
  } else if (spec.type === "terms") {
    cardPdf(cmds, 58, 112, 410, 340, "$4.5M purchase", spec.left, pdf.gold, 11);
    cardPdf(cmds, 500, 112, 400, 340, "Control and close", spec.right, pdf.blue, 11);
  } else if (spec.type === "diligence") {
    cardPdf(cmds, 58, 112, 410, 340, "Ready now", spec.ready, pdf.green, 10.5);
    cardPdf(cmds, 500, 112, 400, 340, "Package before LOI", spec.package, pdf.gold, 10.5);
  } else if (spec.type === "close") {
    drawImage(cmds, page, spec.image, 13, 88, 947, 390);
    rect(cmds, 13, 88, 947, 390, pdf.bg);
    wrapped(cmds, 62, 132, 420, [spec.subtitle], { size: 21, bold: true, color: pdf.gold, lineGap: 27 });
    cardPdf(cmds, 530, 160, 330, 220, "Next step", spec.points, pdf.blue, 12);
    text(cmds, 72, 390, "$4,500,000", { size: 35, bold: true, color: pdf.gold });
  } else if (spec.type === "sources") {
    cardPdf(cmds, 54, 108, 850, 360, "Source notes", spec.sources, pdf.gold, 7.4);
  }
  return { stream: `${cmds.join("\n")}\n`, xobjects: page.xobjects };
}

function pdfObject(id, body) {
  const bodyBuf = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
  return Buffer.concat([Buffer.from(`${id} 0 obj\n`, "utf8"), bodyBuf, Buffer.from("\nendobj\n", "utf8")]);
}

function pdfStreamObject(id, dict, data) {
  const dataBuf = Buffer.isBuffer(data) ? data : Buffer.from(data, "utf8");
  return pdfObject(id, Buffer.concat([Buffer.from(`<< ${dict} /Length ${dataBuf.length} >>\nstream\n`, "utf8"), dataBuf, Buffer.from("\nendstream", "utf8")]));
}

function writePdf() {
  const pages = slides.map((spec, i) => renderPdfPage(spec, i + 1));
  const images = [...pdfImages.values()];
  const imageObjectIds = new Map();
  let nextId = 5;
  images.forEach((img) => imageObjectIds.set(img.key, nextId++));

  const pageRecords = pages.map((page) => ({ ...page, contentId: nextId++, pageId: nextId++ }));
  const objects = [];
  objects[1] = pdfObject(1, "<< /Type /Catalog /Pages 2 0 R >>");
  objects[3] = pdfObject(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects[4] = pdfObject(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  images.forEach((img) => {
    const id = imageObjectIds.get(img.key);
    objects[id] = pdfStreamObject(id, `/Type /XObject /Subtype /Image /Width ${img.width} /Height ${img.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`, img.data);
  });

  pageRecords.forEach((page) => {
    objects[page.contentId] = pdfStreamObject(page.contentId, "", page.stream);
    const xobjectEntries = [...page.xobjects].map((key) => `/${key} ${imageObjectIds.get(key)} 0 R`).join(" ");
    const xobjects = xobjectEntries ? `/XObject << ${xobjectEntries} >>` : "";
    objects[page.pageId] = pdfObject(page.pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdf.w} ${pdf.h}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> ${xobjects} >> /Contents ${page.contentId} 0 R >>`);
  });
  objects[2] = pdfObject(2, `<< /Type /Pages /Count ${pageRecords.length} /Kids [${pageRecords.map((p) => `${p.pageId} 0 R`).join(" ")}] >>`);

  const header = Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary");
  const parts = [header];
  const offsets = [0];
  let offset = header.length;
  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = offset;
    parts.push(objects[id]);
    offset += objects[id].length;
  }
  const xrefOffset = offset;
  const xref = ["xref", `0 ${objects.length}`, "0000000000 65535 f "];
  for (let id = 1; id < objects.length; id += 1) xref.push(`${String(offsets[id]).padStart(10, "0")} 00000 n `);
  parts.push(Buffer.from(`${xref.join("\n")}\ntrailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`, "utf8"));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PDF_PATH, Buffer.concat(parts));
}

writePptx();
writePdf();

console.log(`Wrote ${PPTX_PATH}`);
console.log(`Wrote ${PDF_PATH}`);
