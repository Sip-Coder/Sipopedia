import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const WIDTH = 2100;
const HEIGHT = 1400;
const MAP_BOX = { x: 110, y: 260, width: 1160, height: 620 };
const REGION_LIMIT = 12;

const continentLabels = {
  europe: "Europe",
  "north-america": "North America",
  "south-america": "South America",
  oceania: "Oceania",
  africa: "Africa",
  asia: "Asia"
};

const countryAlias = {
  brasil: "brazil",
  england: "united-kingdom",
  crimea: "ukraine",
  "united-states": "united-states-of-america",
  "czech-republic": "czechia",
  "democratic-republic-of-the-congo": "dem-rep-congo",
  "republic-of-the-congo": "congo",
  "east-timor": "timor-leste",
  "cape-verde": "cape-verde",
  tahiti: "french-polynesia"
};

function slugify(input) {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function canonicalSlug(input) {
  const slug = slugify(input);
  return countryAlias[slug] ?? slug;
}

function escapeXml(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clipText(input, maxLength) {
  const clean = String(input ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, Math.max(0, maxLength - 3)).trim()}...`;
}

function findBalanced(source, marker, openChar, closeChar) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find marker: ${marker}`);
  const start = source.indexOf(openChar, markerIndex);
  if (start < 0) throw new Error(`Could not find ${openChar} after marker: ${marker}`);

  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = start; index < source.length; index++) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === openChar) depth += 1;
    if (char === closeChar) depth -= 1;
    if (depth === 0) return source.slice(start, index + 1);
  }

  throw new Error(`Could not balance ${openChar}${closeChar} after marker: ${marker}`);
}

function evaluateLiteral(literal, label) {
  try {
    return Function(`"use strict"; return (${literal});`)();
  } catch (error) {
    throw new Error(`Could not evaluate ${label}: ${error.message}`);
  }
}

function decodeArc(arc, transform) {
  let x = 0;
  let y = 0;
  const out = [];
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push(transform ? [x * transform.scale[0] + transform.translate[0], y * transform.scale[1] + transform.translate[1]] : [x, y]);
  }
  return out;
}

function stitchArcRefs(refs, arcs) {
  const out = [];
  for (const ref of refs) {
    const source = arcs[ref < 0 ? ~ref : ref] ?? [];
    const piece = ref < 0 ? [...source].reverse() : source;
    for (let index = 0; index < piece.length; index++) {
      if (out.length === 0 || index > 0) out.push(piece[index]);
    }
  }
  return out;
}

function toPath(points, width = 800, height = 400) {
  if (!points.length) return "";
  const projected = points.map(([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height]);
  let pathValue = `M${projected[0][0].toFixed(2)},${projected[0][1].toFixed(2)}`;
  for (let index = 1; index < projected.length; index++) {
    const breakPath = Math.abs(points[index][0] - points[index - 1][0]) > 100;
    pathValue += breakPath
      ? `M${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`
      : `L${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`;
  }
  return `${pathValue}Z`;
}

function geometryToSegments(geometry, decoded, width, height) {
  if (geometry.type === "Polygon" && Array.isArray(geometry.arcs)) {
    const polygonPath = geometry.arcs.map((refs) => toPath(stitchArcRefs(refs, decoded), width, height)).join("");
    return polygonPath ? [polygonPath] : [];
  }

  if (geometry.type === "MultiPolygon" && Array.isArray(geometry.arcs)) {
    return geometry.arcs
      .map((polygon) => polygon.map((refs) => toPath(stitchArcRefs(refs, decoded), width, height)).join(""))
      .filter(Boolean);
  }

  return [];
}

function pathBounds(pathValue) {
  const matches = [...pathValue.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)];
  if (!matches.length) return null;
  const points = matches.map((match) => ({ x: Number.parseFloat(match[1]), y: Number.parseFloat(match[2]) }));
  return points.reduce(
    (bounds, point) => ({
      minX: Math.min(bounds.minX, point.x),
      minY: Math.min(bounds.minY, point.y),
      maxX: Math.max(bounds.maxX, point.x),
      maxY: Math.max(bounds.maxY, point.y)
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
}

function boundsArea(bounds) {
  if (!bounds) return 0;
  return Math.max(0, bounds.maxX - bounds.minX) * Math.max(0, bounds.maxY - bounds.minY);
}

function boundsCenter(bounds) {
  return {
    x: (bounds.minX + bounds.maxX) / 2,
    y: (bounds.minY + bounds.maxY) / 2
  };
}

function selectPrimaryAtlasGroup(segments) {
  const withBounds = segments
    .map((segment) => ({ segment, bounds: pathBounds(segment) }))
    .filter((item) => item.bounds);
  if (!withBounds.length) return { path: "", segmentCount: 0 };

  const primary = withBounds.reduce((best, item) => (boundsArea(item.bounds) > boundsArea(best.bounds) ? item : best), withBounds[0]);
  const primaryCenter = boundsCenter(primary.bounds);
  const primaryWidth = Math.max(1, primary.bounds.maxX - primary.bounds.minX);
  const primaryHeight = Math.max(1, primary.bounds.maxY - primary.bounds.minY);
  const threshold = Math.max(primaryWidth, primaryHeight) * 1.35 + 22;

  const selected = withBounds.filter((item) => {
    const center = boundsCenter(item.bounds);
    const distance = Math.hypot(center.x - primaryCenter.x, center.y - primaryCenter.y);
    const itemAreaRatio = boundsArea(item.bounds) / Math.max(1, boundsArea(primary.bounds));
    return distance <= threshold || itemAreaRatio >= 0.18;
  });

  return {
    path: selected.map((item) => item.segment).join(""),
    segmentCount: selected.length
  };
}

function topoToPaths(data, width = 800, height = 400) {
  const object = data.objects?.countries;
  if (!object?.geometries || !Array.isArray(data.arcs)) return [];
  const decoded = data.arcs.map((arc) => decodeArc(arc, data.transform));
  const out = [];

  for (const geometry of object.geometries) {
    const name = geometry.properties?.name ?? "Unknown";
    const segments = geometryToSegments(geometry, decoded, width, height);
    const pathValue = segments.join("");
    const primaryGroup = selectPrimaryAtlasGroup(segments);
    if (pathValue) {
      out.push({
        name,
        slug: canonicalSlug(name),
        path: pathValue,
        primaryPath: primaryGroup.path || pathValue,
        sourceSegments: segments.length,
        primarySegments: primaryGroup.segmentCount || segments.length
      });
    }
  }

  return out;
}

function fitPath(pathValue) {
  const bounds = pathBounds(pathValue);
  if (!bounds) return "";
  const sourceWidth = Math.max(1, bounds.maxX - bounds.minX);
  const sourceHeight = Math.max(1, bounds.maxY - bounds.minY);
  const scale = Math.min(MAP_BOX.width / sourceWidth, MAP_BOX.height / sourceHeight) * 0.9;
  const offsetX = MAP_BOX.x + (MAP_BOX.width - sourceWidth * scale) / 2 - bounds.minX * scale;
  const offsetY = MAP_BOX.y + (MAP_BOX.height - sourceHeight * scale) / 2 - bounds.minY * scale;

  return pathValue.replace(/([ML])(-?[\d.]+),(-?[\d.]+)/g, (_match, command, x, y) => {
    const nextX = Number.parseFloat(x) * scale + offsetX;
    const nextY = Number.parseFloat(y) * scale + offsetY;
    return `${command}${nextX.toFixed(2)},${nextY.toFixed(2)}`;
  });
}

function abstractPath(seed) {
  const points = [
    [360 + (seed % 80), 300],
    [870, 250 + (seed % 60)],
    [1010, 560],
    [840, 850],
    [430, 900],
    [230, 640]
  ];
  return `M${points.map(([x, y]) => `${x},${y}`).join("L")}Z`;
}

function contourLines(seed) {
  return Array.from({ length: 8 }, (_, index) => {
    const y = MAP_BOX.y + 56 + index * 74;
    const wobble = ((seed + index * 31) % 64) - 32;
    return `<path class="contour" d="M${MAP_BOX.x + 24} ${y + wobble} C ${MAP_BOX.x + 280} ${y - 72 + wobble}, ${MAP_BOX.x + 560} ${y + 78 - wobble}, ${MAP_BOX.x + 812} ${y + 4} S ${MAP_BOX.x + 1060} ${y - 48}, ${MAP_BOX.x + MAP_BOX.width - 20} ${y + 18}"/>`;
  }).join("");
}

function buildFallbackRegions(country) {
  return [
    { region: `${country} Northern Corridor`, iconicVineyard: `${country} northern hillside estates` },
    { region: `${country} Central Highlands`, iconicVineyard: `${country} highland vineyard terraces` },
    { region: `${country} River Valley Belt`, iconicVineyard: `${country} river-adjacent old vines` },
    { region: `${country} Coastal Influence Zone`, iconicVineyard: `${country} maritime vineyard blocks` },
    { region: `${country} Heritage District`, iconicVineyard: `${country} historic landmark vineyards` }
  ];
}

function regionLabel(region) {
  if (typeof region === "string") return region;
  return region.region ?? region.name ?? region.label ?? "Study region";
}

function regionTextRows(regions) {
  return regions.slice(0, REGION_LIMIT).map((region, index) => {
    const column = index % 2;
    const row = Math.floor(index / 2);
    const x = 135 + column * 910;
    const y = 1038 + row * 48;
    const regionName = escapeXml(clipText(regionLabel(region), 37));
    return `
      <g class="region-row" transform="translate(${x} ${y})">
        <rect width="850" height="40" rx="13"/>
        <circle cx="26" cy="20" r="15"/>
        <text x="26" y="27" text-anchor="middle" class="region-number">${index + 1}</text>
        <text x="54" y="28" class="region-name">${regionName}</text>
      </g>`;
  }).join("");
}

function buildSvg(country, topoEntry, regions) {
  const seed = country.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const sourcePath = topoEntry?.primaryPath || topoEntry?.path;
  const fittedPath = sourcePath ? fitPath(sourcePath) : abstractPath(seed);
  const title = escapeXml(`${country.name} Wine Map`);
  const continent = escapeXml(country.continentLabel);
  const countryName = escapeXml(country.name);
  const generatedNote = sourcePath ? "Primary atlas outline fitted for country-scale study." : "Reference plate uses abstract island/territory geometry pending exact outline.";
  const regionCount = regions.length;
  const visibleRegionCount = Math.min(regionCount, REGION_LIMIT);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#04131f"/>
      <stop offset="0.48" stop-color="#082d33"/>
      <stop offset="1" stop-color="#171f25"/>
    </linearGradient>
    <radialGradient id="glowGold" cx="20%" cy="16%" r="70%">
      <stop offset="0" stop-color="#edd4a8" stop-opacity="0.36"/>
      <stop offset="1" stop-color="#edd4a8" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowCyan" cx="60%" cy="45%" r="70%">
      <stop offset="0" stop-color="#48e5dc" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#48e5dc" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff0ce"/>
      <stop offset="0.44" stop-color="#c99a22"/>
      <stop offset="1" stop-color="#3dd7ca"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="28" stdDeviation="26" flood-color="#000816" flood-opacity="0.52"/>
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#48e5dc" flood-opacity="0.22"/>
    </filter>
    <style>
      .frame { fill: none; stroke: rgba(159, 218, 245, 0.32); stroke-width: 2; }
      .grid { stroke: rgba(159, 218, 245, 0.14); stroke-width: 1; }
      .micro { fill: rgba(217, 247, 255, 0.64); font: 800 19px 'Trebuchet MS', Arial, sans-serif; letter-spacing: 8px; text-transform: uppercase; }
      .title { fill: #fff0ce; font: 900 66px 'Trebuchet MS', Arial, sans-serif; letter-spacing: -2px; }
      .subtitle { fill: rgba(217, 247, 255, 0.78); font: 800 25px 'Trebuchet MS', Arial, sans-serif; }
      .land-core { fill: url(#land); stroke: #fff0ce; stroke-width: 3; stroke-linejoin: round; filter: url(#softShadow); }
      .land-line { fill: none; stroke: rgba(4, 13, 24, 0.72); stroke-width: 10; opacity: 0.55; stroke-linejoin: round; }
      .contour { fill: none; stroke: rgba(237, 212, 168, 0.16); stroke-width: 3; stroke-linecap: round; }
      .region-panel { fill: rgba(5, 18, 28, 0.72); stroke: rgba(159, 218, 245, 0.28); stroke-width: 2; }
      .region-heading { fill: #fff0ce; font: 900 34px 'Trebuchet MS', Arial, sans-serif; letter-spacing: 5px; text-transform: uppercase; }
      .region-subheading { fill: rgba(217, 247, 255, 0.68); font: 700 22px 'Trebuchet MS', Arial, sans-serif; }
      .region-row rect { fill: rgba(4, 19, 31, 0.82); stroke: rgba(159, 218, 245, 0.38); stroke-width: 1.6; }
      .region-row circle { fill: rgba(237, 212, 168, 0.95); }
      .region-number { fill: #04131f; font: 900 18px 'Trebuchet MS', Arial, sans-serif; }
      .region-name { fill: #fff0ce; font: 900 31px 'Trebuchet MS', Arial, sans-serif; }
      .badge { fill: rgba(7, 35, 48, 0.88); stroke: rgba(237, 212, 168, 0.48); stroke-width: 1.5; }
      .badge-text { fill: #edd4a8; font: 900 18px 'Trebuchet MS', Arial, sans-serif; letter-spacing: 3px; text-transform: uppercase; }
      .footer { fill: rgba(217, 247, 255, 0.58); font: 700 18px 'Trebuchet MS', Arial, sans-serif; }
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowGold)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glowCyan)"/>
  ${Array.from({ length: 15 }, (_, i) => `<line class="grid" x1="${120 + i * 120}" y1="0" x2="${120 + i * 120}" y2="${HEIGHT}"/>`).join("")}
  ${Array.from({ length: 8 }, (_, i) => `<line class="grid" x1="0" y1="${180 + i * 120}" x2="${WIDTH}" y2="${180 + i * 120}"/>`).join("")}
  <rect x="34" y="34" width="2032" height="1332" rx="42" class="frame"/>
  <text x="80" y="108" class="micro">Sip Studios Maps / Country Study Plate</text>
  <text x="80" y="185" class="title">${title}</text>
  <text x="84" y="232" class="subtitle">${continent} / ${regionCount} study regions / Wine geography</text>
  <g opacity="0.9">
    ${contourLines(seed)}
    <path class="land-line" d="${fittedPath}"/>
    <path class="land-core" d="${fittedPath}" fill-rule="evenodd"/>
  </g>
  <rect x="1370" y="305" width="610" height="132" rx="24" class="badge"/>
  <text x="1410" y="358" class="badge-text">${countryName} / atlas outline</text>
  <text x="1410" y="398" class="footer">${escapeXml(generatedNote)}</text>
  <rect x="88" y="940" width="1924" height="382" rx="30" class="region-panel"/>
  <text x="132" y="998" class="region-heading">Study Region Index</text>
  <text x="132" y="1335" class="footer">Showing ${visibleRegionCount} of ${regionCount} study regions. Internal wine-region borders require an authoritative GIS layer before drawing.</text>
  ${regionTextRows(regions)}
</svg>
`;
}

function main() {
  const regionsSource = fs.readFileSync(path.join(repoRoot, "src", "data", "regions.ts"), "utf8");
  const countryNamesByContinent = evaluateLiteral(findBalanced(regionsSource, "const countryNamesByContinent", "{", "}"), "countryNamesByContinent");
  const enabledWineRegionSlugs = new Set(evaluateLiteral(findBalanced(regionsSource, "export const enabledWineRegionSlugs", "[", "]"), "enabledWineRegionSlugs"));
  const featuredProfiles = evaluateLiteral(findBalanced(regionsSource, "const featuredProfiles", "{", "}"), "featuredProfiles");
  const exactProfiles = JSON.parse(fs.readFileSync(path.join(repoRoot, "src", "data", "regionsExact.json"), "utf8"));
  const topology = JSON.parse(fs.readFileSync(path.join(repoRoot, "public", "world-topo.json"), "utf8"));
  const topoPaths = topoToPaths(topology);
  const topoPathBySlug = new Map(topoPaths.map((item) => [item.slug, item]));
  const manifest = [];
  const missingOutlines = [];

  for (const [continent, names] of Object.entries(countryNamesByContinent)) {
    for (const name of names) {
      const slug = slugify(name);
      if (!enabledWineRegionSlugs.has(slug)) continue;

      const exactRegions = exactProfiles[slug]?.majorRegions;
      const featuredRegions = featuredProfiles[slug]?.keyRegions;
      const regions = exactRegions?.length ? exactRegions : featuredRegions?.length ? featuredRegions : buildFallbackRegions(name);
      const canonical = canonicalSlug(slug);
      const topoEntry = topoPathBySlug.get(canonical);
      if (!topoEntry) missingOutlines.push(slug);

      const country = {
        name,
        slug,
        continent,
        continentLabel: continentLabels[continent] ?? continent
      };
      const svg = buildSvg(country, topoEntry, regions);
      const outDir = path.join(repoRoot, "public", "maps", "Country", continent);
      fs.mkdirSync(outDir, { recursive: true });
      const outFile = path.join(outDir, `${slug}-wine-map.svg`);
      fs.writeFileSync(outFile, svg, "utf8");
      manifest.push({
        name,
        slug,
        continent,
        path: `/maps/Country/${continent}/${slug}-wine-map.svg`,
        regions: regions.map(regionLabel),
        outline: topoEntry ? "world-topo-primary-group" : "abstract-fallback",
        sourceSegments: topoEntry?.sourceSegments ?? 0,
        primarySegments: topoEntry?.primarySegments ?? 0
      });
    }
  }

  const manifestPath = path.join(repoRoot, "public", "maps", "Country", "country-map-manifest.json");
  fs.writeFileSync(
    manifestPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), count: manifest.length, missingOutlines, assets: manifest }, null, 2)}\n`,
    "utf8"
  );
  console.log(`Generated ${manifest.length} country map SVG assets.`);
  if (missingOutlines.length) {
    console.log(`Abstract fallback outlines: ${missingOutlines.join(", ")}`);
  }
}

main();
