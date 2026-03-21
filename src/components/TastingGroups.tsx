import { FormEvent, useEffect, useMemo, useState } from "react";
import { GlobeMap, type GlobePinInput } from "./GlobeMap";

type GroupFocus = "Wine" | "Spirits" | "Beer" | "Sake" | "Zero Proof" | "Coffee & Tea";
type MeetupFormat = "In Person" | "Hybrid";

type TastingGroup = {
  id: string;
  name: string;
  city: string;
  focus: GroupFocus;
  cadence: string;
  members: number;
  meetupFormat: MeetupFormat;
  nextMeetup: string;
  summary: string;
  tags: string[];
};

type GroupEvent = {
  id: string;
  groupId: string;
  title: string;
  date: string;
  venue: string;
  seatsLeft: number;
};

type GroupFeedPost = {
  id: string;
  groupId: string;
  author: string;
  message: string;
  timeLabel: string;
};

type GroupDraft = {
  name: string;
  city: string;
  focus: GroupFocus;
  cadence: string;
  meetupFormat: MeetupFormat;
  sizeLimit: string;
  summary: string;
};

type MapCountryPath = { id: string; name: string; path: string };
type GeoPoint = { lat: number; lon: number };
type CityPin = {
  cityKey: string;
  cityLabel: string;
  lat: number;
  lon: number;
  groups: TastingGroup[];
};
type MapView = { x: number; y: number; width: number; height: number };
type GeoFeatureCollection = {
  type?: string;
  features?: Array<{ geometry?: { type?: string; coordinates?: unknown } }>;
};

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;
const MAP_ASPECT = MAP_WIDTH / MAP_HEIGHT;
const MAP_ZOOM_STEPS = [1, 1.35, 1.8, 2.4, 3.2, 4.5, 6];
const DETAIL_LAYER_URLS = {
  adminBoundaries:
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_1_states_provinces.geojson",
  lakes: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_lakes.geojson",
  rivers:
    "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_rivers_lake_centerlines.geojson"
};

const focusFilters: Array<"All" | GroupFocus> = ["All", "Wine", "Spirits", "Beer", "Sake", "Zero Proof", "Coffee & Tea"];

const initialGroups: TastingGroup[] = [
  {
    id: "downtown-wine-circle",
    name: "Downtown Wine Circle",
    city: "Austin, TX",
    focus: "Wine",
    cadence: "Bi-weekly",
    members: 24,
    meetupFormat: "In Person",
    nextMeetup: "2026-03-14",
    summary: "Blind flights and theme nights for classic + emerging wine regions.",
    tags: ["Blind tasting", "Region themes", "Bring-a-bottle"]
  },
  {
    id: "north-bay-spirits-lab",
    name: "North Bay Spirits Lab",
    city: "San Francisco, CA",
    focus: "Spirits",
    cadence: "Monthly",
    members: 18,
    meetupFormat: "Hybrid",
    nextMeetup: "2026-03-20",
    summary: "Compare production methods and styles across whiskey, rum, and agave spirits.",
    tags: ["Technique first", "Guided flights", "Guest presenters"]
  },
  {
    id: "brooklyn-beer-society",
    name: "Brooklyn Beer Society",
    city: "Brooklyn, NY",
    focus: "Beer",
    cadence: "Weekly",
    members: 31,
    meetupFormat: "In Person",
    nextMeetup: "2026-03-09",
    summary: "Local taproom meetups with sensory drills and style deep-dives.",
    tags: ["Taproom walks", "BJCP styles", "Pairing nights"]
  },
  {
    id: "sunset-zero-proof-club",
    name: "Sunset Zero-Proof Club",
    city: "Los Angeles, CA",
    focus: "Zero Proof",
    cadence: "Twice a month",
    members: 15,
    meetupFormat: "In Person",
    nextMeetup: "2026-03-18",
    summary: "No-alcohol tasting sessions focused on balance, texture, and food pairing.",
    tags: ["Zero ABV", "Mocktail labs", "Mindful tasting"]
  }
];

const upcomingEvents: GroupEvent[] = [
  {
    id: "evt-1",
    groupId: "downtown-wine-circle",
    title: "Old World vs New World Syrah Flight",
    date: "2026-03-14",
    venue: "Riverview Tasting Room",
    seatsLeft: 8
  },
  {
    id: "evt-2",
    groupId: "north-bay-spirits-lab",
    title: "Pot Still vs Column Still Deep Dive",
    date: "2026-03-20",
    venue: "Bay Barrel House",
    seatsLeft: 6
  },
  {
    id: "evt-3",
    groupId: "brooklyn-beer-society",
    title: "Spring Saison Showcase",
    date: "2026-03-09",
    venue: "Flatiron Hop Hall",
    seatsLeft: 10
  },
  {
    id: "evt-4",
    groupId: "sunset-zero-proof-club",
    title: "Citrus + Botanical Pairing Lab",
    date: "2026-03-18",
    venue: "Juniper Kitchen Studio",
    seatsLeft: 12
  }
];

const groupFeed: GroupFeedPost[] = [
  {
    id: "feed-1",
    groupId: "downtown-wine-circle",
    author: "Maya (Host)",
    message: "Bring one spicy food pairing idea for next Saturday's Syrah tasting.",
    timeLabel: "2 hours ago"
  },
  {
    id: "feed-2",
    groupId: "north-bay-spirits-lab",
    author: "Jordan",
    message: "Shared producer notes for the rum lineup in the event thread.",
    timeLabel: "Yesterday"
  },
  {
    id: "feed-3",
    groupId: "brooklyn-beer-society",
    author: "Elena",
    message: "Volunteer list is open for glass setup and note sheets.",
    timeLabel: "Yesterday"
  },
  {
    id: "feed-4",
    groupId: "sunset-zero-proof-club",
    author: "Chris",
    message: "Vote is up for the next theme: smoke, herbal, or stone fruit.",
    timeLabel: "3 days ago"
  }
];

const defaultGroupDraft: GroupDraft = {
  name: "",
  city: "",
  focus: "Wine",
  cadence: "Monthly",
  meetupFormat: "In Person",
  sizeLimit: "20",
  summary: ""
};

const US_STATE_BY_ABBR: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  DC: "District of Columbia"
};

const US_ABBR_BY_STATE = Object.fromEntries(
  Object.entries(US_STATE_BY_ABBR).map(([abbr, name]) => [name.toLowerCase(), abbr.toLowerCase()])
) as Record<string, string>;

const CITY_COORDINATES_BY_KEY: Record<string, GeoPoint> = {
  "austin|texas": { lat: 30.2672, lon: -97.7431 },
  "san francisco|california": { lat: 37.7749, lon: -122.4194 },
  "brooklyn|new york": { lat: 40.6782, lon: -73.9442 },
  "los angeles|california": { lat: 34.0522, lon: -118.2437 },
  "chicago|illinois": { lat: 41.8781, lon: -87.6298 },
  "seattle|washington": { lat: 47.6062, lon: -122.3321 },
  "miami|florida": { lat: 25.7617, lon: -80.1918 },
  "new york|new york": { lat: 40.7128, lon: -74.0060 },
  "boston|massachusetts": { lat: 42.3601, lon: -71.0589 },
  "denver|colorado": { lat: 39.7392, lon: -104.9903 }
};

function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeStateName(value: string): string {
  const noDots = value.replace(/\./g, "").trim();
  const upper = noDots.toUpperCase();
  if (upper.length === 2 && US_STATE_BY_ABBR[upper]) return US_STATE_BY_ABBR[upper].toLowerCase();
  const normalized = normalizeSearchText(noDots);
  const abbr = US_ABBR_BY_STATE[normalized];
  if (abbr) return US_STATE_BY_ABBR[abbr.toUpperCase()].toLowerCase();
  return normalized;
}

function cityLocationKey(location: string): string {
  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  const cityRaw = parts[0] ?? location;
  const city = normalizeSearchText(cityRaw);
  if (!city) return "";
  const stateRaw = parts.length > 1 ? parts[parts.length - 1] : "";
  const state = stateRaw ? normalizeStateName(stateRaw) : "";
  return state ? `${city}|${state}` : city;
}

function buildLocationAliases(location: string): string {
  const aliases = new Set<string>();
  const normalizedLocation = normalizeSearchText(location);
  if (normalizedLocation) aliases.add(normalizedLocation);

  const parts = location
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const statePart = parts.length ? parts[parts.length - 1] : undefined;
  if (!statePart) return Array.from(aliases).join(" ");

  const stateUpper = statePart.replace(/\./g, "").trim().toUpperCase();
  if (stateUpper.length === 2 && US_STATE_BY_ABBR[stateUpper]) {
    aliases.add(stateUpper.toLowerCase());
    aliases.add(US_STATE_BY_ABBR[stateUpper].toLowerCase());
    return Array.from(aliases).join(" ");
  }

  const normalizedStateName = normalizeSearchText(statePart);
  if (normalizedStateName) aliases.add(normalizedStateName);
  const stateAbbreviation = US_ABBR_BY_STATE[normalizedStateName];
  if (stateAbbreviation) aliases.add(stateAbbreviation);

  return Array.from(aliases).join(" ");
}

function getPointForLocation(location: string): GeoPoint | null {
  const key = cityLocationKey(location);
  if (!key) return null;
  if (CITY_COORDINATES_BY_KEY[key]) return CITY_COORDINATES_BY_KEY[key];
  const cityOnly = key.split("|")[0];
  if (cityOnly && CITY_COORDINATES_BY_KEY[cityOnly]) return CITY_COORDINATES_BY_KEY[cityOnly];
  return null;
}

function decodeArc(arc: number[][], transform?: { scale: [number, number]; translate: [number, number] }): number[][] {
  let x = 0;
  let y = 0;
  const out: number[][] = [];
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push(transform ? [x * transform.scale[0] + transform.translate[0], y * transform.scale[1] + transform.translate[1]] : [x, y]);
  }
  return out;
}

function stitchArcRefs(refs: number[], arcs: number[][][]): number[][] {
  const out: number[][] = [];
  for (const ref of refs) {
    const source = arcs[ref < 0 ? ~ref : ref] ?? [];
    const piece = ref < 0 ? [...source].reverse() : source;
    for (let index = 0; index < piece.length; index++) {
      if (out.length === 0 || index > 0) out.push(piece[index]);
    }
  }
  return out;
}

function toPath(points: number[][], width: number, height: number): string {
  if (!points.length) return "";
  const projected = points.map(([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height]);
  let path = `M${projected[0][0].toFixed(2)},${projected[0][1].toFixed(2)}`;
  for (let index = 1; index < projected.length; index++) {
    const breakPath = Math.abs(points[index][0] - points[index - 1][0]) > 100;
    path += breakPath
      ? `M${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`
      : `L${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`;
  }
  return `${path}Z`;
}

function toLinePath(points: number[][], width: number, height: number): string {
  if (!points.length) return "";
  const projected = points.map(([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height]);
  let path = `M${projected[0][0].toFixed(2)},${projected[0][1].toFixed(2)}`;
  for (let index = 1; index < projected.length; index++) {
    const breakPath = Math.abs(points[index][0] - points[index - 1][0]) > 100;
    path += breakPath
      ? `M${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`
      : `L${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`;
  }
  return path;
}

function isLngLatPoint(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    Number.isFinite(value[0]) &&
    typeof value[1] === "number" &&
    Number.isFinite(value[1])
  );
}

function isLngLatLine(value: unknown): value is [number, number][] {
  return Array.isArray(value) && value.every((point) => isLngLatPoint(point));
}

function geoJsonToPolygonPaths(data: GeoFeatureCollection, width = MAP_WIDTH, height = MAP_HEIGHT): string[] {
  if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) return [];
  const out: string[] = [];
  for (const feature of data.features) {
    const geometry = feature.geometry;
    if (!geometry || !geometry.coordinates) continue;

    if (geometry.type === "Polygon" && Array.isArray(geometry.coordinates)) {
      let path = "";
      for (const ring of geometry.coordinates) {
        if (!isLngLatLine(ring)) continue;
        path += toPath(ring, width, height);
      }
      if (path) out.push(path);
      continue;
    }

    if (geometry.type === "MultiPolygon" && Array.isArray(geometry.coordinates)) {
      let path = "";
      for (const polygon of geometry.coordinates) {
        if (!Array.isArray(polygon)) continue;
        for (const ring of polygon) {
          if (!isLngLatLine(ring)) continue;
          path += toPath(ring, width, height);
        }
      }
      if (path) out.push(path);
    }
  }
  return out;
}

function geoJsonToLinePaths(data: GeoFeatureCollection, width = MAP_WIDTH, height = MAP_HEIGHT): string[] {
  if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) return [];
  const out: string[] = [];
  for (const feature of data.features) {
    const geometry = feature.geometry;
    if (!geometry || !geometry.coordinates) continue;

    if (geometry.type === "LineString" && isLngLatLine(geometry.coordinates)) {
      const path = toLinePath(geometry.coordinates, width, height);
      if (path) out.push(path);
      continue;
    }

    if (geometry.type === "MultiLineString" && Array.isArray(geometry.coordinates)) {
      for (const line of geometry.coordinates) {
        if (!isLngLatLine(line)) continue;
        const path = toLinePath(line, width, height);
        if (path) out.push(path);
      }
    }
  }
  return out;
}

async function loadGeoJsonLayer(url: string): Promise<GeoFeatureCollection | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = (await response.json()) as unknown;
    if (!isObject(data)) return null;
    return data as GeoFeatureCollection;
  } catch {
    return null;
  }
}

function topoToPaths(data: Record<string, unknown>, width = MAP_WIDTH, height = MAP_HEIGHT): MapCountryPath[] {
  if (!Array.isArray(data.arcs) || !isObject(data.objects)) return [];
  const objects = data.objects as Record<string, unknown>;
  const objectNames = Object.keys(objects);
  if (!objectNames.length) return [];

  const score = (name: string) =>
    (name.toLowerCase().includes("countries") ? 3 : 0) +
    (name.toLowerCase().includes("admin_0") || name.toLowerCase().includes("admin0") ? 2 : 0) +
    (name.toLowerCase().includes("admin") ? 2 : 0) +
    (name.toLowerCase().includes("ne_") ? 1 : 0);

  const bestName = objectNames.reduce((best, next) => (score(next) > score(best) ? next : best));
  const selected = objects[bestName];
  if (!isObject(selected) || !Array.isArray(selected.geometries)) return [];

  const decoded = (data.arcs as number[][][]).map((arc) =>
    decodeArc(
      arc,
      isObject(data.transform)
        ? (data.transform as { scale: [number, number]; translate: [number, number] })
        : undefined
    )
  );

  const out: MapCountryPath[] = [];
  for (const geometry of selected.geometries as Array<Record<string, unknown>>) {
    const name = isObject(geometry.properties) ? asText(geometry.properties.name) || "Unknown" : "Unknown";
    const id = asText(geometry.id) || name;
    let path = "";
    if (geometry.type === "Polygon" && Array.isArray(geometry.arcs)) {
      for (const refs of geometry.arcs as number[][]) {
        path += toPath(stitchArcRefs(refs, decoded), width, height);
      }
    }
    if (geometry.type === "MultiPolygon" && Array.isArray(geometry.arcs)) {
      for (const polygon of geometry.arcs as number[][][]) {
        for (const refs of polygon) {
          path += toPath(stitchArcRefs(refs, decoded), width, height);
        }
      }
    }
    if (path) out.push({ id, name, path });
  }

  return out;
}

function projectLonLat(lon: number, lat: number, width = MAP_WIDTH, height = MAP_HEIGHT): { x: number; y: number } {
  return { x: ((lon + 180) / 360) * width, y: ((90 - lat) / 180) * height };
}

function fitPinsToView(pins: CityPin[]): MapView {
  if (!pins.length) return { x: 0, y: 0, width: MAP_WIDTH, height: MAP_HEIGHT };

  const projected = pins.map((pin) => projectLonLat(pin.lon, pin.lat));
  let minX = Math.min(...projected.map((point) => point.x));
  let maxX = Math.max(...projected.map((point) => point.x));
  let minY = Math.min(...projected.map((point) => point.y));
  let maxY = Math.max(...projected.map((point) => point.y));

  const baseSpanX = Math.max(maxX - minX, 70);
  const baseSpanY = Math.max(maxY - minY, 42);
  const padX = Math.max(baseSpanX * 0.18, 28);
  const padY = Math.max(baseSpanY * 0.24, 20);

  minX -= padX;
  maxX += padX;
  minY -= padY;
  maxY += padY;

  let width = clamp(maxX - minX, 140, MAP_WIDTH);
  let height = clamp(maxY - minY, 100, MAP_HEIGHT);

  if (width / height > MAP_ASPECT) {
    height = width / MAP_ASPECT;
  } else {
    width = height * MAP_ASPECT;
  }

  width = Math.min(width, MAP_WIDTH);
  height = Math.min(height, MAP_HEIGHT);

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const x = clamp(centerX - width / 2, 0, MAP_WIDTH - width);
  const y = clamp(centerY - height / 2, 0, MAP_HEIGHT - height);
  return { x, y, width, height };
}

function formatDateLabel(dateIso: string): string {
  const parsed = new Date(`${dateIso}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateIso;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function TastingGroups() {
  const [groups, setGroups] = useState<TastingGroup[]>(initialGroups);
  const [search, setSearch] = useState("");
  const [focusFilter, setFocusFilter] = useState<"All" | GroupFocus>("All");
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroups[0]?.id ?? "");
  const [groupDraft, setGroupDraft] = useState<GroupDraft>(defaultGroupDraft);
  const [createNotice, setCreateNotice] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mapPaths, setMapPaths] = useState<MapCountryPath[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedMapCity, setSelectedMapCity] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setMapLoading(true);
    fetch("/world-topo.json")
      .then((response) => response.json())
      .then((json: unknown) => {
        if (cancelled || !isObject(json)) return;
        setMapPaths(topoToPaths(json));
        setMapLoading(false);
      })
      .catch(() => {
        if (!cancelled) setMapLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const cityPins = useMemo<CityPin[]>(() => {
    const byCity = new Map<string, CityPin>();
    for (const group of groups) {
      const cityKey = cityLocationKey(group.city);
      const point = getPointForLocation(group.city);
      if (!cityKey || !point) continue;
      const existing = byCity.get(cityKey);
      if (existing) {
        existing.groups.push(group);
        continue;
      }
      byCity.set(cityKey, {
        cityKey,
        cityLabel: group.city,
        lat: point.lat,
        lon: point.lon,
        groups: [group]
      });
    }
    return Array.from(byCity.values());
  }, [groups]);

  const selectedMapPin = useMemo(
    () => (selectedMapCity ? cityPins.find((pin) => pin.cityKey === selectedMapCity) ?? null : null),
    [cityPins, selectedMapCity]
  );

  const mappedGroupCount = useMemo(
    () => cityPins.reduce((sum, pin) => sum + pin.groups.length, 0),
    [cityPins]
  );
  const unmappedGroupCount = groups.length - mappedGroupCount;

  const filteredGroups = useMemo(() => {
    const searchTerm = normalizeSearchText(search);
    return groups.filter((group) => {
      if (focusFilter !== "All" && group.focus !== focusFilter) return false;
      if (selectedMapCity && cityLocationKey(group.city) !== selectedMapCity) return false;
      if (!searchTerm) return true;

      const locationAliases = buildLocationAliases(group.city);
      const haystack = normalizeSearchText(
        `${group.name} ${group.city} ${locationAliases} ${group.summary} ${group.tags.join(" ")}`
      );
      return haystack.includes(searchTerm);
    });
  }, [groups, search, focusFilter, selectedMapCity]);

  useEffect(() => {
    if (!selectedMapCity) return;
    if (!cityPins.some((pin) => pin.cityKey === selectedMapCity)) {
      setSelectedMapCity(null);
    }
  }, [selectedMapCity, cityPins]);

  useEffect(() => {
    if (!filteredGroups.length) {
      setSelectedGroupId("");
      return;
    }
    if (!filteredGroups.some((group) => group.id === selectedGroupId)) {
      setSelectedGroupId(filteredGroups[0].id);
    }
  }, [filteredGroups, selectedGroupId]);

  const selectedGroup = useMemo(() => {
    if (!selectedGroupId) return null;
    return groups.find((group) => group.id === selectedGroupId) ?? null;
  }, [groups, selectedGroupId]);

  const selectedEvents = useMemo(
    () => upcomingEvents.filter((event) => event.groupId === selectedGroupId),
    [selectedGroupId]
  );

  const selectedFeed = useMemo(() => groupFeed.filter((post) => post.groupId === selectedGroupId), [selectedGroupId]);

  const totalMembers = useMemo(() => groups.reduce((sum, group) => sum + group.members, 0), [groups]);

  const handleCreateGroup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = groupDraft.name.trim();
    const city = groupDraft.city.trim();
    const summary = groupDraft.summary.trim();
    const sizeLimit = Number.parseInt(groupDraft.sizeLimit, 10);

    if (!name || !city || !summary) {
      setCreateNotice("Please fill out group name, city, and summary.");
      return;
    }

    const memberCount = Number.isNaN(sizeLimit) ? 20 : Math.max(4, Math.min(sizeLimit, 60));
    const groupId = `group-${Date.now().toString(36)}`;
    const nextMeetup = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10);

    const createdGroup: TastingGroup = {
      id: groupId,
      name,
      city,
      focus: groupDraft.focus,
      cadence: groupDraft.cadence,
      members: memberCount,
      meetupFormat: groupDraft.meetupFormat,
      nextMeetup,
      summary,
      tags: ["New group", groupDraft.meetupFormat, `${groupDraft.focus} focus`]
    };

    setGroups((previous) => [createdGroup, ...previous]);
    setSelectedGroupId(groupId);
    setGroupDraft(defaultGroupDraft);
    setCreateNotice(`"${createdGroup.name}" is staged in the UI. Auth and member gating can be wired next.`);
  };

  const handleMapPinSelect = (pin: GlobePinInput) => {
    setSelectedMapCity(pin.cityKey);
    setSearch("");
    const next = groups.find((group) => cityLocationKey(group.city) === pin.cityKey);
    if (next) setSelectedGroupId(next.id);
    document.getElementById("group-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="tasting-groups">
      <div className="section-header">
        <h2>Tasting Groups</h2>
        <p>
          Organize local, in-person tasting communities. This first release is a UI-only prototype for group discovery,
          feed previews, and group creation workflows.
        </p>
      </div>

      <div className="tasting-groups-hero">
        <div className="tasting-groups-hero-copy">
          <p className="news-card-tag">Sip Studios Community</p>
          <h3>Build Facebook-style tasting communities around real meetups.</h3>
          <p>
            Hosts can stand up a group, publish meetup plans, and coordinate members around tasting themes before we
            connect user-specific permissions.
          </p>
          <div className="tasting-groups-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShowCreateForm(true);
                document.getElementById("create-tasting-group")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Start a Group
            </button>
            <button type="button" className="btn btn-light" onClick={() => setFocusFilter("All")}>
              Explore All Groups
            </button>
          </div>
        </div>

        <div className="tasting-groups-metrics" aria-label="Tasting group summary">
          <article>
            <strong>{groups.length}</strong>
            <span>Active Groups</span>
          </article>
          <article>
            <strong>{totalMembers}</strong>
            <span>Community Seats</span>
          </article>
          <article>
            <strong>{upcomingEvents.length}</strong>
            <span>Meetups Planned</span>
          </article>
          <article>
            <strong>{focusFilters.length - 1}</strong>
            <span>Focus Types</span>
          </article>
        </div>
      </div>

      <div className="tasting-groups-quick-path" aria-label="Tasting groups quick path">
        <button type="button" className="tasting-groups-quick-step" onClick={() => document.getElementById("group-search")?.focus()}>
          <span>1</span>
          <div>
            <strong>Find a city</strong>
            <p>Search by city, state, nickname, or theme tags.</p>
          </div>
        </button>
        <button type="button" className="tasting-groups-quick-step" onClick={() => document.getElementById("group-search")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
          <span>2</span>
          <div>
            <strong>Pick one group</strong>
            <p>Compare cadence, format, and upcoming meetup cards.</p>
          </div>
        </button>
        <button
          type="button"
          className="tasting-groups-quick-step"
          onClick={() => {
            setShowCreateForm(true);
            document.getElementById("create-tasting-group")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          <span>3</span>
          <div>
            <strong>Create when ready</strong>
            <p>Open the builder only when you need to start a new group.</p>
          </div>
        </button>
      </div>

      <article className="tasting-groups-map-card">
        <div className="tasting-groups-map-head">
          <div>
            <h3>Tasting City Globe</h3>
            <p className="hint">Spin the globe to explore tasting group cities. Click a glowing pin to filter.</p>
          </div>
          {selectedMapPin ? (
            <div className="tasting-groups-map-tools">
              <p className="hint">
                City filter: <strong>{selectedMapPin.cityLabel}</strong>{" "}
                <button
                  type="button"
                  className="btn btn-light tasting-groups-map-clear"
                  onClick={() => setSelectedMapCity(null)}
                >
                  Clear
                </button>
              </p>
            </div>
          ) : null}
        </div>

        {mapLoading ? (
          <div className="globe-loading">
            <div className="globe-loading-orb" />
            <p>Preparing globe&hellip;</p>
          </div>
        ) : (
          <GlobeMap
            cityPins={cityPins}
            mapPaths={mapPaths}
            selectedCityKey={selectedMapCity}
            onPinSelect={handleMapPinSelect}
          />
        )}

      </article>

      <div className="tasting-groups-layout">
        <aside className="tasting-groups-sidebar" aria-label="Group discovery filters">
          <div className="tasting-groups-filters">
            <label htmlFor="group-search">Search groups</label>
            <input
              id="group-search"
              type="text"
              value={search}
              placeholder="Name, city, tag, or theme"
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="tasting-groups-filters">
            <label htmlFor="group-focus">Focus</label>
            <select id="group-focus" value={focusFilter} onChange={(event) => setFocusFilter(event.target.value as "All" | GroupFocus)}>
              {focusFilters.map((focus) => (
                <option key={focus} value={focus}>
                  {focus}
                </option>
              ))}
            </select>
          </div>

          <p className="hint">Showing {filteredGroups.length} group(s).</p>
          {selectedMapPin ? <p className="tasting-groups-map-filter">Map filter active: {selectedMapPin.cityLabel}</p> : null}

          <div className="tasting-groups-list" role="list">
            {filteredGroups.length ? (
              filteredGroups.map((group) => (
                <button
                  type="button"
                  key={group.id}
                  role="listitem"
                  className={`tasting-group-row ${group.id === selectedGroupId ? "active" : ""}`}
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  <div className="tasting-group-row-head">
                    <h3>{group.name}</h3>
                    <span>{group.members} members</span>
                  </div>
                  <p>
                    {group.city} - {group.cadence}
                  </p>
                  <p className="tasting-group-row-summary">{group.summary}</p>
                  <div className="tasting-group-tags">
                    {group.tags.map((tag) => (
                      <span key={`${group.id}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </button>
              ))
            ) : (
              <p className="tasting-groups-empty">No groups match this filter yet. Try changing focus or search terms.</p>
            )}
          </div>
        </aside>

        <div className="tasting-groups-main">
          {selectedGroup ? (
            <article className="tasting-groups-feature">
              <div className="tasting-groups-feature-head">
                <div>
                  <p className="news-card-tag">{selectedGroup.focus}</p>
                  <h3>{selectedGroup.name}</h3>
                  <p>{selectedGroup.summary}</p>
                </div>
                <button type="button" className="btn btn-light">
                  Request to Join
                </button>
              </div>

              <div className="tasting-groups-meta">
                <div>
                  <strong>Location</strong>
                  <span>{selectedGroup.city}</span>
                </div>
                <div>
                  <strong>Format</strong>
                  <span>{selectedGroup.meetupFormat}</span>
                </div>
                <div>
                  <strong>Cadence</strong>
                  <span>{selectedGroup.cadence}</span>
                </div>
              </div>

              <div className="tasting-groups-events">
                <h4>Upcoming Meetups</h4>
                <ul>
                  {selectedEvents.length ? (
                    selectedEvents.map((eventItem) => (
                      <li key={eventItem.id}>
                        <div>
                          <strong>{eventItem.title}</strong>
                          <span>{eventItem.venue}</span>
                        </div>
                        <p>
                          {formatDateLabel(eventItem.date)} - {eventItem.seatsLeft} seats left
                        </p>
                      </li>
                    ))
                  ) : (
                    <li className="tasting-groups-empty">No meetup cards for this group yet.</li>
                  )}
                </ul>
              </div>
            </article>
          ) : (
            <article className="tasting-groups-feature">
              <h3>Select a group</h3>
              <p className="hint">Pick a group from the left panel to preview its meetup details and feed.</p>
            </article>
          )}

          <article className="tasting-groups-activity">
            <h3>Group Feed Preview</h3>
            <p className="hint">UI scaffold for post threads, announcements, and RSVP reminders.</p>
            <ul>
              {selectedFeed.length ? (
                selectedFeed.map((post) => (
                  <li key={post.id}>
                    <strong>{post.author}</strong>
                    <p>{post.message}</p>
                    <span>{post.timeLabel}</span>
                  </li>
                ))
              ) : (
                <li className="tasting-groups-empty">Feed items will appear once hosts post updates.</li>
              )}
            </ul>
          </article>

          <article id="create-tasting-group" className="tasting-groups-create">
            <div className="tasting-groups-create-head">
              <h3>Create a Tasting Group (UI Only)</h3>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowCreateForm((value) => !value)}
                aria-expanded={showCreateForm}
              >
                {showCreateForm ? "Hide Builder" : "Open Builder"}
              </button>
            </div>
            <p className="hint">This form currently updates local page state only. Auth rules and approvals can connect next.</p>

            {showCreateForm ? (
              <form className="tasting-groups-form" onSubmit={handleCreateGroup}>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-name">Group name</label>
                  <input
                    id="new-group-name"
                    value={groupDraft.name}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, name: event.target.value }))}
                    maxLength={80}
                    placeholder="Example: River City Pinot Club"
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-city">City</label>
                  <input
                    id="new-group-city"
                    value={groupDraft.city}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, city: event.target.value }))}
                    maxLength={80}
                    placeholder="Example: Chicago, IL"
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-focus">Focus</label>
                  <select
                    id="new-group-focus"
                    value={groupDraft.focus}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, focus: event.target.value as GroupFocus }))}
                  >
                    {focusFilters
                      .filter((focus): focus is GroupFocus => focus !== "All")
                      .map((focus) => (
                        <option key={focus} value={focus}>
                          {focus}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-cadence">Cadence</label>
                  <select
                    id="new-group-cadence"
                    value={groupDraft.cadence}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, cadence: event.target.value }))}
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Twice a month">Twice a month</option>
                  </select>
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-format">Meetup format</label>
                  <select
                    id="new-group-format"
                    value={groupDraft.meetupFormat}
                    onChange={(event) =>
                      setGroupDraft((prev) => ({ ...prev, meetupFormat: event.target.value as MeetupFormat }))
                    }
                  >
                    <option value="In Person">In Person</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-group-size">Target member cap</label>
                  <input
                    id="new-group-size"
                    type="number"
                    min={4}
                    max={60}
                    value={groupDraft.sizeLimit}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, sizeLimit: event.target.value }))}
                  />
                </div>
                <div className="tasting-groups-form-row tasting-groups-form-row-wide">
                  <label htmlFor="new-group-summary">Group summary</label>
                  <textarea
                    id="new-group-summary"
                    rows={3}
                    maxLength={240}
                    value={groupDraft.summary}
                    onChange={(event) => setGroupDraft((prev) => ({ ...prev, summary: event.target.value }))}
                    placeholder="Describe your tasting goals, membership style, and what members can expect."
                  />
                </div>
                <div className="tasting-groups-form-actions">
                  <button type="submit" className="btn btn-primary">
                    Create Group Mock
                  </button>
                </div>
              </form>
            ) : (
              <p className="hint">Builder hidden for focus. Open it when you're ready to create a new group.</p>
            )}

            {createNotice ? <p className="tasting-groups-notice">{createNotice}</p> : null}
          </article>
        </div>
      </div>
    </section>
  );
}
