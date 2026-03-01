import fs from "node:fs";
import path from "node:path";

const inputDir = path.join(process.cwd(), "tmp_regions_pages");
const outputPath = path.join(process.cwd(), "src", "data", "regionsExact.json");

const slugToName = {
  austria: "Austria",
  bulgaria: "Bulgaria",
  croatia: "Croatia",
  england: "England",
  france: "France",
  germany: "Germany",
  greece: "Greece",
  hungary: "Hungary",
  italy: "Italy",
  moldova: "Moldova",
  portugal: "Portugal",
  romania: "Romania",
  serbia: "Serbia"
};

const namedEntities = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " "
};

function decodeEntities(input) {
  return input
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => (namedEntities[name] ?? m));
}

function cleanWhitespace(input) {
  return input
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/\r/g, "")
    .replace(/[\t\f\v]+/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ ]{2,}/g, " ")
    .trim();
}

function fixMojibake(input) {
  if (!/[ÃÂâ]/.test(input)) return input;
  try {
    return Buffer.from(input, "latin1").toString("utf8");
  } catch {
    return input;
  }
}

function htmlToText(html) {
  const withStructure = html
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/li>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<\/ol>/gi, "\n");

  const stripped = withStructure
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "");

  return cleanWhitespace(fixMojibake(decodeEntities(stripped)));
}

function extractListItems(html) {
  const items = [];
  const liRegex = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRegex.exec(html))) {
    const text = htmlToText(m[1]).replace(/^[-\s]+/, "").trim();
    if (text) items.push(text);
  }
  return items;
}

function extractLinks(html) {
  const links = [];
  const linkRegex = /<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = linkRegex.exec(html))) {
    const url = decodeEntities(m[1]).trim();
    const label = fixMojibake(htmlToText(m[2]));
    if (url && label) {
      links.push({ label, url });
    }
  }

  const seen = new Set();
  return links.filter((link) => {
    const key = `${link.label}::${link.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractGrapeNames(listItems) {
  return listItems
    .map((item) => {
      const strong = item.match(/^([^:]+):/);
      if (strong) return strong[1].trim();
      return item.split("-")[0].trim();
    })
    .map((item) => item.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .slice(0, 10);
}

function normalizeTitle(rawTitle) {
  return fixMojibake(rawTitle.replace(/\s+/g, " ").trim());
}

function findSection(sections, contains) {
  const lowered = contains.toLowerCase();
  return sections.find((section) => section.title.toLowerCase().includes(lowered)) ?? null;
}

function extractAccordionSections(raw) {
  const sections = [];
  const pattern = /<li class="accordion-item">[\s\S]*?<span\s+class="accordion-item__title"[\s\S]*?>\s*([^<]+?)\s*<\/span>[\s\S]*?<div\s+class="[\s\S]*?accordion-item__description[\s\S]*?">\s*([\s\S]*?)\s*<\/div>\s*<\/div>/gi;
  let m;
  while ((m = pattern.exec(raw))) {
    sections.push({ title: normalizeTitle(decodeEntities(m[1])), html: m[2] });
  }
  return sections;
}

function extractMajorRegions(raw, countryName) {
  const regions = [];
  const slideRegex = /<li class="[\s\S]*?user-items-list-carousel__slide[\s\S]*?<\/li>/gi;
  let m;
  while ((m = slideRegex.exec(raw))) {
    const block = m[0];
    const imageMatch = block.match(/data-src="([^"]+)"/i);
    const titleMatch = block.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    if (!imageMatch || !titleMatch) continue;

    const imageUrl = decodeEntities(imageMatch[1]).trim();
    const region = cleanWhitespace(htmlToText(titleMatch[1]));
    if (!imageUrl || !region) continue;

    regions.push({
      region,
      iconicVineyard: `${region} signature vineyard sites`,
      imageUrl
    });
  }

  const deduped = [];
  const seen = new Set();
  for (const item of regions) {
    const key = `${item.region}::${item.imageUrl}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped.slice(0, 12);
}

function buildProfile(raw, slug) {
  const sections = extractAccordionSections(raw);

  const overview = findSection(sections, "wines overview");
  const location = findSection(sections, "location");
  const terroir = findSection(sections, "terroir");
  const white = findSection(sections, "white grape");
  const red = findSection(sections, "red grape");
  const production = findSection(sections, "style of production");
  const serving = findSection(sections, "style of serving");
  const regulations = findSection(sections, "regulations");
  const terminology = findSection(sections, "terminology");
  const resources = findSection(sections, "resources for further exploration");
  const towns = findSection(sections, "biggest towns nearby");

  const whiteItems = white ? extractListItems(white.html) : [];
  const redItems = red ? extractListItems(red.html) : [];
  const terminologyItems = terminology ? extractListItems(terminology.html) : [];
  const townItems = towns ? extractListItems(towns.html) : [];
  const townFallback = towns ? htmlToText(towns.html) : "";
  const resourceLinks = resources ? extractLinks(resources.html) : [];

  const name = slugToName[slug] ?? slug;

  return {
    winesOverview: overview ? htmlToText(overview.html) : "",
    location: location ? htmlToText(location.html) : "",
    terroir: terroir ? htmlToText(terroir.html) : "",
    whiteGrapes: extractGrapeNames(whiteItems),
    redGrapes: extractGrapeNames(redItems),
    productionStyle: production ? htmlToText(production.html) : "",
    servingStyle: serving ? htmlToText(serving.html) : "",
    regulations: regulations ? htmlToText(regulations.html) : "",
    terminology: terminologyItems.length > 0 ? terminologyItems : (terminology ? [htmlToText(terminology.html)] : []),
    resources: resourceLinks,
    nearbyTowns: townItems.length > 0 ? townItems : (townFallback ? [townFallback] : []),
    majorRegions: extractMajorRegions(raw, name)
  };
}

const slugs = Object.keys(slugToName);
const out = {};

for (const slug of slugs) {
  const filePath = path.join(inputDir, `${slug}.html`);
  if (!fs.existsSync(filePath)) continue;
  const raw = fs.readFileSync(filePath, "utf8");
  const profile = buildProfile(raw, slug);
  out[slug] = profile;
}

fs.writeFileSync(outputPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");

console.log(`Wrote ${Object.keys(out).length} exact profiles to ${outputPath}`);
for (const [slug, profile] of Object.entries(out)) {
  console.log(`${slug}\twhite=${profile.whiteGrapes.length}\tred=${profile.redGrapes.length}\tterms=${profile.terminology.length}\tresources=${profile.resources.length}\tregions=${profile.majorRegions.length}`);
}
