import fs from "node:fs";
import https from "node:https";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const WIDTH = 2400;
const HEIGHT = 1600;
const MAP_BOX = { x: 110, y: 240, width: 1480, height: 1140 };
const LEGEND_BOX = { x: 1640, y: 235, width: 635, height: 1145 };
const SOURCE_URL = "https://www.data.gouv.fr/fr/datasets/r/6643df0a-9945-408a-8cad-199b951bf0d1";
const SOURCE_CACHE = process.env.FRANCE_AOP_GEOJSON || path.join(os.tmpdir(), "france-aop-regions.geojson");

const regionRows = [
  {
    key: "SUD-OUEST",
    name: "Bordeaux / Sud-Ouest",
    detail: "Medoc, Graves, Right Bank, Sauternes, Bergerac",
    color: "#9d2449",
    label: [-0.35, 44.8]
  },
  {
    key: "VAL DE LOIRE",
    name: "Val de Loire",
    detail: "Nantais, Anjou-Saumur, Touraine, Centre-Loire",
    color: "#61a96f",
    label: [0.6, 47.1]
  },
  {
    key: "CHAMPAGNE",
    name: "Champagne",
    detail: "Reims, Marne, Cote des Blancs, Cote des Bar",
    color: "#f2c94c",
    label: [4.05, 48.65]
  },
  {
    key: "BOURGOGNE BEAUJOLAIS SAVOIE JURA",
    name: "Bourgogne / Beaujolais / Jura / Savoie",
    detail: "Chablis, Cote d'Or, Maconnais, Beaujolais, Jura, Savoie",
    color: "#c45770",
    label: [4.85, 46.85]
  },
  {
    key: "ALSACE ET EST",
    name: "Alsace et Est",
    detail: "Alsace corridor, Vosges foothills, eastern study belt",
    color: "#49c5b6",
    label: [7.25, 48.35]
  },
  {
    key: "VALLEE DU RHÔNE",
    name: "Vallee du Rhone",
    detail: "Northern Rhone, Southern Rhone, Ventoux, Luberon edge",
    color: "#7c6ee6",
    label: [4.85, 44.45]
  },
  {
    key: "LANGUEDOC-ROUSSILLON",
    name: "Languedoc-Roussillon",
    detail: "Picpoul, Minervois, Corbieres, Limoux, Roussillon",
    color: "#f08a4b",
    label: [3.15, 43.2]
  },
  {
    key: "PROVENCE-CORSE",
    name: "Provence-Corse",
    detail: "Bandol, Cassis, Palette, Cotes de Provence, Corsica",
    color: "#e66b5b",
    label: [6.15, 43.25]
  },
  {
    key: "TOULOUSE-PYRENEES",
    name: "Toulouse-Pyrenees",
    detail: "Gaillac, Fronton, Jurancon, Madiran, Irouleguy",
    color: "#d08d2c",
    label: [1.2, 43.7]
  },
  {
    key: "COGNAC",
    name: "Cognac",
    detail: "Charente winegrowing base for distillation study",
    color: "#b58c67",
    label: [-0.55, 45.65]
  },
  {
    key: "ARMAGNAC",
    name: "Armagnac",
    detail: "Gascogne distillation base and southwest context",
    color: "#a56d3f",
    label: [0.18, 43.75]
  },
  {
    key: "VIN DOUX NATURELS",
    name: "Vins Doux Naturels",
    detail: "Banyuls, Maury, Rivesaltes, Muscat production sites",
    color: "#db5c9b",
    label: [3.0, 42.72]
  }
];

const labelByKey = new Map(regionRows.map((row, index) => [row.key, { ...row, index: index + 1 }]));

const rivers = [
  {
    name: "Loire",
    points: [
      [3.1, 47.3],
      [2.2, 47.1],
      [1.2, 47.4],
      [0.3, 47.4],
      [-0.6, 47.25],
      [-1.55, 47.22],
      [-2.08, 47.28]
    ]
  },
  {
    name: "Rhone",
    points: [
      [4.8, 45.75],
      [4.85, 45.1],
      [4.84, 44.6],
      [4.9, 44.1],
      [4.95, 43.65],
      [4.72, 43.3]
    ]
  },
  {
    name: "Garonne",
    points: [
      [1.45, 43.6],
      [0.9, 44.0],
      [0.35, 44.25],
      [-0.15, 44.55],
      [-0.58, 44.84]
    ]
  },
  {
    name: "Dordogne",
    points: [
      [2.2, 44.8],
      [1.35, 44.85],
      [0.65, 44.92],
      [0.15, 44.92],
      [-0.35, 44.98],
      [-0.72, 45.06]
    ]
  },
  {
    name: "Seine",
    points: [
      [4.1, 47.9],
      [3.3, 48.15],
      [2.35, 48.85],
      [1.15, 49.2],
      [0.35, 49.45]
    ]
  },
  {
    name: "Rhin",
    points: [
      [7.55, 47.6],
      [7.62, 48.1],
      [7.7, 48.65],
      [7.75, 49.05]
    ]
  }
];

const cities = [
  { name: "Bordeaux", coord: [-0.58, 44.84] },
  { name: "Nantes", coord: [-1.55, 47.22] },
  { name: "Tours", coord: [0.68, 47.39] },
  { name: "Reims", coord: [4.03, 49.26] },
  { name: "Dijon", coord: [5.04, 47.32] },
  { name: "Strasbourg", coord: [7.75, 48.58] },
  { name: "Lyon", coord: [4.84, 45.76] },
  { name: "Avignon", coord: [4.81, 43.95] },
  { name: "Montpellier", coord: [3.88, 43.61] },
  { name: "Marseille", coord: [5.37, 43.3] },
  { name: "Ajaccio", coord: [8.74, 41.92] }
];

const terrainBands = [
  {
    name: "Pyrenees",
    points: [
      [-1.5, 43.2],
      [-0.5, 42.95],
      [0.8, 42.85],
      [2.2, 42.65],
      [3.05, 42.45],
      [2.55, 42.95],
      [1.1, 43.25],
      [-0.35, 43.35],
      [-1.5, 43.2]
    ]
  },
  {
    name: "Massif Central",
    points: [
      [1.2, 44.1],
      [2.1, 44.85],
      [3.35, 45.25],
      [4.35, 45.05],
      [4.05, 44.25],
      [3.15, 43.75],
      [1.9, 43.75],
      [1.2, 44.1]
    ]
  },
  {
    name: "Alps",
    points: [
      [5.45, 45.1],
      [6.25, 45.45],
      [7.05, 45.05],
      [7.25, 44.15],
      [6.55, 43.75],
      [5.7, 44.15],
      [5.45, 45.1]
    ]
  },
  {
    name: "Vosges",
    points: [
      [6.65, 47.75],
      [7.25, 47.9],
      [7.45, 48.75],
      [7.05, 49.18],
      [6.55, 48.85],
      [6.45, 48.2],
      [6.65, 47.75]
    ]
  }
];

function escapeXml(input) {
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function downloadText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          downloadText(new URL(response.headers.location, url).toString()).then(resolve, reject);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed with HTTP ${response.statusCode}`));
          return;
        }
        response.setEncoding("utf8");
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on("end", () => resolve(data));
      })
      .on("error", reject);
  });
}

async function readAopData() {
  if (fs.existsSync(SOURCE_CACHE)) {
    return JSON.parse(fs.readFileSync(SOURCE_CACHE, "utf8"));
  }
  const text = await downloadText(SOURCE_URL);
  return JSON.parse(text);
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

function topologyRings(geometry, decoded) {
  if (geometry.type === "Polygon" && Array.isArray(geometry.arcs)) {
    return geometry.arcs.map((refs) => stitchArcRefs(refs, decoded));
  }
  if (geometry.type === "MultiPolygon" && Array.isArray(geometry.arcs)) {
    return geometry.arcs.flatMap((polygon) => polygon.map((refs) => stitchArcRefs(refs, decoded)));
  }
  return [];
}

function geoJsonRings(geometry) {
  if (geometry.type === "Polygon") return geometry.coordinates;
  if (geometry.type === "MultiPolygon") return geometry.coordinates.flat();
  return [];
}

function isEuropeanFranceRing(ring) {
  return ring.some(([lon, lat]) => lon >= -6.5 && lon <= 10.5 && lat >= 41 && lat <= 52);
}

function loadFranceOutlineRings() {
  const topology = JSON.parse(fs.readFileSync(path.join(repoRoot, "public", "world-topo.json"), "utf8"));
  const object = topology.objects?.countries;
  const decoded = topology.arcs.map((arc) => decodeArc(arc, topology.transform));
  const france = object.geometries.find((geometry) => geometry.properties?.name === "France");
  if (!france) throw new Error("Could not find France in public/world-topo.json");
  return topologyRings(france, decoded).filter(isEuropeanFranceRing);
}

function projectLambert([lon, lat]) {
  const deg = Math.PI / 180;
  const phi = lat * deg;
  const lambda = lon * deg;
  const phi1 = 44 * deg;
  const phi2 = 49 * deg;
  const phi0 = 46.5 * deg;
  const lambda0 = 2.454 * deg;
  const n = Math.log(Math.cos(phi1) / Math.cos(phi2)) / Math.log(Math.tan(Math.PI / 4 + phi2 / 2) / Math.tan(Math.PI / 4 + phi1 / 2));
  const f = (Math.cos(phi1) * Math.tan(Math.PI / 4 + phi1 / 2) ** n) / n;
  const rho = f / Math.tan(Math.PI / 4 + phi / 2) ** n;
  const rho0 = f / Math.tan(Math.PI / 4 + phi0 / 2) ** n;
  return [rho * Math.sin(n * (lambda - lambda0)), rho0 - rho * Math.cos(n * (lambda - lambda0))];
}

function createFitter(outlineRings) {
  const points = outlineRings.flat().map(projectLambert);
  const bounds = points.reduce(
    (acc, [x, y]) => ({
      minX: Math.min(acc.minX, x),
      minY: Math.min(acc.minY, y),
      maxX: Math.max(acc.maxX, x),
      maxY: Math.max(acc.maxY, y)
    }),
    { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity }
  );
  const width = Math.max(0.000001, bounds.maxX - bounds.minX);
  const height = Math.max(0.000001, bounds.maxY - bounds.minY);
  const scale = Math.min(MAP_BOX.width / width, MAP_BOX.height / height) * 0.95;
  const offsetX = MAP_BOX.x + (MAP_BOX.width - width * scale) / 2 - bounds.minX * scale;
  const offsetY = MAP_BOX.y + (MAP_BOX.height - height * scale) / 2 - bounds.minY * scale;
  return (coord) => {
    const [x, y] = projectLambert(coord);
    return [x * scale + offsetX, y * scale + offsetY];
  };
}

function sqDistance(a, b) {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  return dx * dx + dy * dy;
}

function sqSegmentDistance(point, start, end) {
  let x = start[0];
  let y = start[1];
  let dx = end[0] - x;
  let dy = end[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = Math.max(0, Math.min(1, ((point[0] - x) * dx + (point[1] - y) * dy) / (dx * dx + dy * dy)));
    x += dx * t;
    y += dy * t;
  }
  dx = point[0] - x;
  dy = point[1] - y;
  return dx * dx + dy * dy;
}

function simplifyRadial(points, tolerance) {
  if (points.length <= 2) return points;
  const sqTolerance = tolerance * tolerance;
  const out = [points[0]];
  let previous = points[0];
  for (let index = 1; index < points.length - 1; index++) {
    if (sqDistance(points[index], previous) > sqTolerance) {
      out.push(points[index]);
      previous = points[index];
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

function simplifyDps(points, tolerance) {
  if (points.length <= 2) return points;
  const sqTolerance = tolerance * tolerance;
  let maxDistance = 0;
  let split = 0;
  for (let index = 1; index < points.length - 1; index++) {
    const distance = sqSegmentDistance(points[index], points[0], points[points.length - 1]);
    if (distance > maxDistance) {
      maxDistance = distance;
      split = index;
    }
  }
  if (maxDistance > sqTolerance) {
    const left = simplifyDps(points.slice(0, split + 1), tolerance);
    const right = simplifyDps(points.slice(split), tolerance);
    return left.slice(0, -1).concat(right);
  }
  return [points[0], points[points.length - 1]];
}

function simplifyRing(points, tolerance) {
  if (points.length <= 4) return points;
  const closed = sqDistance(points[0], points[points.length - 1]) < 0.01;
  const work = closed ? points.slice(0, -1) : points;
  const reduced = simplifyDps(simplifyRadial(work, tolerance), tolerance);
  if (closed) reduced.push(reduced[0]);
  return reduced;
}

function pathFromRings(rings, fit, tolerance = 1.15) {
  return rings
    .map((ring) => simplifyRing(ring.map(fit), tolerance))
    .filter((ring) => ring.length >= 3)
    .map((ring) => {
      const [first, ...rest] = ring;
      return `M${first[0].toFixed(1)},${first[1].toFixed(1)}${rest.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join("")}Z`;
    })
    .join("");
}

function polylinePath(points, fit) {
  const projected = points.map(fit);
  const [first, ...rest] = projected;
  return `M${first[0].toFixed(1)},${first[1].toFixed(1)}${rest.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join("")}`;
}

function mapBadge(row, fit) {
  const [x, y] = fit(row.label);
  return `<g class="map-badge" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
    <rect x="-23" y="-18" width="46" height="36" rx="14"/>
    <text y="7" text-anchor="middle">${String(row.index).padStart(2, "0")}</text>
  </g>`;
}

function cityMarker(city, fit) {
  const [x, y] = fit(city.coord);
  return `<g class="city" transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">
    <circle r="4.5"/>
    <text x="9" y="-7">${escapeXml(city.name)}</text>
  </g>`;
}

function legendRow(row, index) {
  const y = LEGEND_BOX.y + 92 + index * 78;
  return `<g class="legend-row" transform="translate(${LEGEND_BOX.x + 30} ${y})">
    <rect width="${LEGEND_BOX.width - 60}" height="62" rx="17"/>
    <circle cx="31" cy="31" r="19" fill="${row.color}"/>
    <text class="legend-number" x="31" y="39" text-anchor="middle">${String(index + 1).padStart(2, "0")}</text>
    <text class="legend-name" x="62" y="25">${escapeXml(row.name)}</text>
    <text class="legend-detail" x="62" y="49">${escapeXml(row.detail)}</text>
  </g>`;
}

async function main() {
  const aopData = await readAopData();
  const outlineRings = loadFranceOutlineRings();
  const fit = createFitter(outlineRings);
  const outlinePath = pathFromRings(outlineRings, fit, 0.8);
  const regionPaths = aopData.features
    .map((feature) => {
      const key = feature.properties?.Bassin;
      const row = labelByKey.get(key);
      if (!row) return "";
      const pathValue = pathFromRings(geoJsonRings(feature.geometry), fit, 1.1);
      return `<path class="wine-basin" d="${pathValue}" fill="${row.color}" data-basin="${escapeXml(key)}"/>`;
    })
    .join("\n    ");
  const riverPaths = rivers.map((river) => `<path class="river" d="${polylinePath(river.points, fit)}"><title>${escapeXml(river.name)}</title></path>`).join("\n    ");
  const terrainPaths = terrainBands
    .map((band) => `<path class="terrain" d="${pathFromRings([band.points], fit, 0.5)}"><title>${escapeXml(band.name)}</title></path>`)
    .join("\n    ");
  const badges = regionRows.map((row) => mapBadge(labelByKey.get(row.key), fit)).join("\n    ");
  const cityMarkers = cities.map((city) => cityMarker(city, fit)).join("\n    ");
  const legend = regionRows.map(legendRow).join("\n    ");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="France Wine Region Map">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#061625"/>
      <stop offset="0.5" stop-color="#0a2f38"/>
      <stop offset="1" stop-color="#18242a"/>
    </linearGradient>
    <radialGradient id="paperGlow" cx="38%" cy="30%" r="74%">
      <stop offset="0" stop-color="#fff0ce" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#fff0ce" stop-opacity="0"/>
    </radialGradient>
    <filter id="panelShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#000816" flood-opacity="0.42"/>
    </filter>
    <clipPath id="franceClip">
      <path d="${outlinePath}" fill-rule="evenodd"/>
    </clipPath>
    <style>
      .frame { fill: none; stroke: rgba(159, 218, 245, 0.34); stroke-width: 2.4; }
      .grid { stroke: rgba(159, 218, 245, 0.12); stroke-width: 1.2; }
      .title { fill: #fff0ce; font: 900 76px 'Trebuchet MS', Arial, sans-serif; letter-spacing: 0; }
      .subtitle { fill: rgba(217, 247, 255, 0.8); font: 800 28px 'Trebuchet MS', Arial, sans-serif; }
      .micro { fill: rgba(217, 247, 255, 0.66); font: 900 19px 'Trebuchet MS', Arial, sans-serif; letter-spacing: 7px; text-transform: uppercase; }
      .map-shell { fill: rgba(4, 13, 24, 0.52); stroke: rgba(159, 218, 245, 0.24); stroke-width: 2; filter: url(#panelShadow); }
      .land-base { fill: #113345; stroke: #fff0ce; stroke-width: 4.8; stroke-linejoin: round; }
      .coastline { fill: none; stroke: rgba(255, 240, 206, 0.88); stroke-width: 3.2; stroke-linejoin: round; }
      .wine-basin { fill-opacity: 0.86; stroke: rgba(4, 13, 24, 0.72); stroke-width: 1.9; stroke-linejoin: round; }
      .terrain { fill: rgba(255, 240, 206, 0.12); stroke: rgba(255, 240, 206, 0.22); stroke-width: 1.3; stroke-dasharray: 9 8; }
      .river { fill: none; stroke: rgba(159, 218, 245, 0.72); stroke-width: 3.2; stroke-linecap: round; stroke-linejoin: round; }
      .map-badge rect { fill: rgba(4, 13, 24, 0.86); stroke: rgba(255, 240, 206, 0.88); stroke-width: 2; }
      .map-badge text { fill: #fff0ce; font: 900 20px 'Trebuchet MS', Arial, sans-serif; }
      .city circle { fill: #061625; stroke: #fff0ce; stroke-width: 2.2; }
      .city text { fill: rgba(255, 240, 206, 0.86); font: 900 18px 'Trebuchet MS', Arial, sans-serif; paint-order: stroke; stroke: rgba(4, 13, 24, 0.82); stroke-width: 5; stroke-linejoin: round; }
      .legend-panel { fill: rgba(5, 18, 28, 0.84); stroke: rgba(159, 218, 245, 0.28); stroke-width: 2; filter: url(#panelShadow); }
      .legend-title { fill: #fff0ce; font: 900 38px 'Trebuchet MS', Arial, sans-serif; }
      .legend-note { fill: rgba(217, 247, 255, 0.68); font: 800 18px 'Trebuchet MS', Arial, sans-serif; }
      .legend-row rect { fill: rgba(4, 19, 31, 0.78); stroke: rgba(159, 218, 245, 0.22); stroke-width: 1.4; }
      .legend-number { fill: #04131f; font: 900 18px 'Trebuchet MS', Arial, sans-serif; }
      .legend-name { fill: #fff0ce; font: 900 23px 'Trebuchet MS', Arial, sans-serif; }
      .legend-detail { fill: rgba(217, 247, 255, 0.72); font: 800 15px 'Trebuchet MS', Arial, sans-serif; }
      .source { fill: rgba(217, 247, 255, 0.58); font: 700 16px 'Trebuchet MS', Arial, sans-serif; }
    </style>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#paperGlow)"/>
  ${Array.from({ length: 18 }, (_, i) => `<line class="grid" x1="${120 + i * 120}" y1="0" x2="${120 + i * 120}" y2="${HEIGHT}"/>`).join("")}
  ${Array.from({ length: 10 }, (_, i) => `<line class="grid" x1="0" y1="${180 + i * 120}" x2="${WIDTH}" y2="${180 + i * 120}"/>`).join("")}
  <rect x="36" y="36" width="${WIDTH - 72}" height="${HEIGHT - 72}" rx="44" class="frame"/>
  <text x="92" y="104" class="micro">Sip Studios Maps / Source-Backed Country Plate</text>
  <text x="92" y="184" class="title">France Wine Region Map</text>
  <text x="96" y="230" class="subtitle">Mainland France and Corsica / official broad AOP production-basin geometry / editable SVG</text>
  <rect x="${MAP_BOX.x - 48}" y="${MAP_BOX.y - 36}" width="${MAP_BOX.width + 96}" height="${MAP_BOX.height + 76}" rx="34" class="map-shell"/>
  <g>
    <path class="land-base" d="${outlinePath}" fill-rule="evenodd"/>
    <g clip-path="url(#franceClip)">
      ${terrainPaths}
      ${regionPaths}
    </g>
    ${riverPaths}
    <path class="coastline" d="${outlinePath}" fill-rule="evenodd"/>
    ${badges}
    ${cityMarkers}
  </g>
  <rect x="${LEGEND_BOX.x}" y="${LEGEND_BOX.y}" width="${LEGEND_BOX.width}" height="${LEGEND_BOX.height}" rx="32" class="legend-panel"/>
  <text x="${LEGEND_BOX.x + 30}" y="${LEGEND_BOX.y + 50}" class="legend-title">Region Index</text>
  <text x="${LEGEND_BOX.x + 30}" y="${LEGEND_BOX.y + 78}" class="legend-note">Large, readable labels outside the map body.</text>
  ${legend}
  <text x="${LEGEND_BOX.x + 30}" y="${LEGEND_BOX.y + LEGEND_BOX.height - 45}" class="source">Source geometry: data.gouv.fr BassinsViticolesFranceAOP, CC BY.</text>
  <text x="${LEGEND_BOX.x + 30}" y="${LEGEND_BOX.y + LEGEND_BOX.height - 20}" class="source">Broad production basins; parcel-level AOC plans remain authoritative.</text>
</svg>
`;

  const outFile = path.join(repoRoot, "public", "maps", "Country", "europe", "france-wine-map.svg");
  fs.writeFileSync(outFile, svg, "utf8");
  console.log(`Wrote ${path.relative(repoRoot, outFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
