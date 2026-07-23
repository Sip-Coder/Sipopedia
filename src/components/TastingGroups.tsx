import { FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  approveCloudTastingGroupMembership,
  createCloudTastingGroup,
  createCloudTastingGroupEvent,
  createCloudTastingGroupPost,
  cancelCloudTastingGroupEventReminder,
  isCloudTastingGroupId,
  listCloudTastingGroupEvents,
  listCloudTastingGroupEventReminders,
  listCloudTastingGroupMembershipRequests,
  listCloudTastingGroupMemberProfiles,
  listCloudTastingGroupPosts,
  listCloudTastingGroups,
  requestCloudTastingGroupJoin,
  updateCloudTastingGroupPostStatus,
  upsertCloudTastingGroupEventReminder,
  upsertCloudTastingGroupMemberProfile,
  upsertCloudTastingGroupEventRsvp,
  type GroupFocus,
  type GroupEventDraftPayload,
  type GroupEventReminderPayload,
  type GroupMemberProfileDraftPayload,
  type GroupPostDraftPayload,
  type MeetupFormat,
  type TastingGroup,
  type TastingGroupEvent,
  type TastingGroupEventReminder,
  type TastingGroupMembershipRequest,
  type TastingGroupMemberProfile,
  type TastingGroupPost,
  type TastingGroupPostStatus,
  type TastingGroupPostType,
  type TastingGroupReminderLeadTime,
  type TastingGroupRsvpStatus
} from "../lib/tastingGroups";
import {
  buildTastingGroupCohortDigest,
  buildTastingGroupNotificationDigest,
  buildTastingGroupPublicRosterHtml,
  type TastingGroupPresenceSignal
} from "../lib/tastingGroupHandoffs";
import { saveCohortActivitySnapshot } from "../lib/cohortActivity";
import { GlobeMap, type GlobePinInput } from "./GlobeMap";

type GroupFeedPost = {
  id: string;
  groupId: string;
  authorLabel: string;
  message: string;
  timeLabel: string;
  postType: TastingGroupPostType;
  moderationStatus: TastingGroupPostStatus;
  parentPostId?: string | null;
  authorUserId?: string;
  createdAt: string;
  cloudBacked?: boolean;
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

type GroupEventDraft = Omit<GroupEventDraftPayload, "groupId">;

type GroupPostDraft = Omit<GroupPostDraftPayload, "groupId" | "parentPostId">;
type GroupMemberProfileDraft = Omit<GroupMemberProfileDraftPayload, "groupId" | "credentials"> & {
  credentials: string;
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

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

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

const initialUpcomingEvents: TastingGroupEvent[] = [
  {
    id: "evt-1",
    groupId: "downtown-wine-circle",
    title: "Old World vs New World Syrah Flight",
    date: "2026-03-14",
    venue: "Riverview Tasting Room",
    capacity: 14,
    seatsLeft: 8,
    rsvpCount: 6,
    notes: "Bring a Syrah or Shiraz contrast bottle and one food-pairing note."
  },
  {
    id: "evt-2",
    groupId: "north-bay-spirits-lab",
    title: "Pot Still vs Column Still Deep Dive",
    date: "2026-03-20",
    venue: "Bay Barrel House",
    capacity: 12,
    seatsLeft: 6,
    rsvpCount: 6,
    notes: "Compare texture, congeners, and service language across distillation styles."
  },
  {
    id: "evt-3",
    groupId: "brooklyn-beer-society",
    title: "Spring Saison Showcase",
    date: "2026-03-09",
    venue: "Flatiron Hop Hall",
    capacity: 18,
    seatsLeft: 10,
    rsvpCount: 8,
    notes: "Focus on yeast character, carbonation, bitterness, and service temperature."
  },
  {
    id: "evt-4",
    groupId: "sunset-zero-proof-club",
    title: "Citrus + Botanical Pairing Lab",
    date: "2026-03-18",
    venue: "Juniper Kitchen Studio",
    capacity: 16,
    seatsLeft: 12,
    rsvpCount: 4,
    notes: "Test acid, bitter, sugar, and texture balance in zero-proof builds."
  }
];

const groupFeed: GroupFeedPost[] = [
  {
    id: "feed-1",
    groupId: "downtown-wine-circle",
    authorLabel: "Maya (Host)",
    message: "Bring one spicy food pairing idea for next Saturday's Syrah tasting.",
    timeLabel: "2 hours ago",
    postType: "announcement",
    moderationStatus: "published",
    createdAt: "2026-05-26T14:00:00.000Z",
    cloudBacked: false
  },
  {
    id: "feed-2",
    groupId: "north-bay-spirits-lab",
    authorLabel: "Jordan",
    message: "Shared producer notes for the rum lineup in the event thread.",
    timeLabel: "Yesterday",
    postType: "tasting_note",
    moderationStatus: "published",
    createdAt: "2026-05-25T18:00:00.000Z",
    cloudBacked: false
  },
  {
    id: "feed-3",
    groupId: "brooklyn-beer-society",
    authorLabel: "Elena",
    message: "Volunteer list is open for glass setup and note sheets.",
    timeLabel: "Yesterday",
    postType: "discussion",
    moderationStatus: "published",
    createdAt: "2026-05-25T17:00:00.000Z",
    cloudBacked: false
  },
  {
    id: "feed-4",
    groupId: "sunset-zero-proof-club",
    authorLabel: "Chris",
    message: "Vote is up for the next theme: smoke, herbal, or stone fruit.",
    timeLabel: "3 days ago",
    postType: "question",
    moderationStatus: "published",
    createdAt: "2026-05-23T18:00:00.000Z",
    cloudBacked: false
  }
];

const initialMemberProfiles: TastingGroupMemberProfile[] = [
  {
    groupId: "downtown-wine-circle",
    userId: "local-host-downtown",
    displayName: "Maya Torres",
    city: "Austin, TX",
    beverageFocus: "Wine",
    credentials: ["CMS Intro", "Blind tasting host"],
    tastingGoal: "Tighten classic region call accuracy and food-pairing language.",
    availability: "Saturday afternoons",
    createdAt: "2026-05-20T17:00:00.000Z",
    updatedAt: "2026-05-26T14:00:00.000Z",
    cloudBacked: false
  },
  {
    groupId: "north-bay-spirits-lab",
    userId: "local-host-north-bay",
    displayName: "Jordan Lee",
    city: "San Francisco, CA",
    beverageFocus: "Spirits",
    credentials: ["BarSmarts", "Agave study lead"],
    tastingGoal: "Compare production methods across rum, whiskey, and agave spirits.",
    availability: "Monthly weekday evenings",
    createdAt: "2026-05-19T17:00:00.000Z",
    updatedAt: "2026-05-25T14:00:00.000Z",
    cloudBacked: false
  },
  {
    groupId: "brooklyn-beer-society",
    userId: "local-host-brooklyn",
    displayName: "Elena Park",
    city: "Brooklyn, NY",
    beverageFocus: "Beer",
    credentials: ["BJCP study group", "Taproom lead"],
    tastingGoal: "Build sharper service language for style, fermentation, and freshness.",
    availability: "Weekly Sundays",
    createdAt: "2026-05-18T17:00:00.000Z",
    updatedAt: "2026-05-25T15:00:00.000Z",
    cloudBacked: false
  }
];

const initialEventReminders: TastingGroupEventReminder[] = [];
const PRESENCE_STORAGE_KEY = "sipstudies:tasting-groups-presence:v1";
const PRESENCE_STALE_MS = 15 * 60 * 1000;

type TastingGroupPresenceRecord = {
  groupId: string;
  userId: string;
  displayName: string;
  focus: GroupFocus;
  lastSeenAt: string;
  cloudBacked: boolean;
};

const defaultGroupDraft: GroupDraft = {
  name: "",
  city: "",
  focus: "Wine",
  cadence: "Monthly",
  meetupFormat: "In Person",
  sizeLimit: "20",
  summary: ""
};

function defaultEventDraft(): GroupEventDraft {
  return {
    title: "",
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10),
    venue: "",
    capacity: 12,
    notes: ""
  };
}

function defaultPostDraft(): GroupPostDraft {
  return {
    body: "",
    postType: "discussion"
  };
}

function defaultMemberProfileDraft(): GroupMemberProfileDraft {
  return {
    displayName: "",
    city: "",
    beverageFocus: "Wine",
    credentials: "",
    tastingGoal: "",
    availability: ""
  };
}

const postTypeLabels: Record<TastingGroupPostType, string> = {
  discussion: "Discussion",
  tasting_note: "Tasting Note",
  announcement: "Announcement",
  question: "Question"
};

const reminderLeadTimeLabels: Record<TastingGroupReminderLeadTime, string> = {
  "24h": "24 hours",
  "3d": "3 days",
  "7d": "7 days"
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


function formatDateLabel(dateIso: string): string {
  const parsed = new Date(`${dateIso}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return dateIso;
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatPostTimeLabel(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Recently";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function parseCredentialList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function formatCredentials(credentials: string[]): string {
  return credentials.join(", ");
}

function calculateReminderSchedule(eventDate: string, leadTime: TastingGroupReminderLeadTime): string | null {
  const parsed = new Date(`${eventDate}T09:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  const days = leadTime === "24h" ? 1 : leadTime === "3d" ? 3 : 7;
  parsed.setDate(parsed.getDate() - days);
  return parsed.toISOString();
}

function escapeCalendarText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function formatCalendarDate(value: string): string {
  return value.replace(/-/g, "");
}

function nextCalendarDate(value: string): string {
  const parsed = new Date(`${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return formatCalendarDate(value);
  parsed.setDate(parsed.getDate() + 1);
  return parsed.toISOString().slice(0, 10).replace(/-/g, "");
}

function formatCalendarTimestamp(value = new Date()): string {
  return value.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function safeFileSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "tasting-group-event";
}

function buildCalendarInvite(group: TastingGroup, eventItem: TastingGroupEvent): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sip Studies//Tasting Groups//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${escapeCalendarText(eventItem.id)}@sipstudies`,
    `DTSTAMP:${formatCalendarTimestamp()}`,
    `DTSTART;VALUE=DATE:${formatCalendarDate(eventItem.date)}`,
    `DTEND;VALUE=DATE:${nextCalendarDate(eventItem.date)}`,
    `SUMMARY:${escapeCalendarText(`${group.name}: ${eventItem.title}`)}`,
    `LOCATION:${escapeCalendarText(eventItem.venue)}`,
    `DESCRIPTION:${escapeCalendarText([
      eventItem.notes || "Tasting group meetup.",
      `${eventItem.seatsLeft} seats left; ${eventItem.rsvpCount} going.`,
      `Group focus: ${group.focus}.`
    ].join("\n"))}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeCalendarText(`Reminder: ${eventItem.title}`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
}

function buildEventEmailBody(group: TastingGroup, eventItem: TastingGroupEvent): string {
  return [
    `You're invited to ${eventItem.title}.`,
    "",
    `Group: ${group.name}`,
    `Focus: ${group.focus}`,
    `Date: ${formatDateLabel(eventItem.date)}`,
    `Venue: ${eventItem.venue}`,
    `Seats: ${eventItem.seatsLeft} left / ${eventItem.rsvpCount} going`,
    "",
    eventItem.notes || "Bring a tasting note, one question, and any agreed bottle or prep assignment.",
    "",
    "Reply with Going, Waitlist, or Cancel so the host can keep the meetup list current."
  ].join("\n");
}

function downloadTextFile(filename: string, body: string, type = "text/plain;charset=utf-8") {
  if (typeof document === "undefined") return;
  const blob = new Blob([body], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function readPresenceRecords(): TastingGroupPresenceRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PRESENCE_STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item): item is TastingGroupPresenceRecord => isObject(item)) : [];
  } catch {
    return [];
  }
}

function writePresenceRecords(records: TastingGroupPresenceRecord[]): TastingGroupPresenceRecord[] {
  if (typeof window === "undefined") return records;
  window.localStorage.setItem(PRESENCE_STORAGE_KEY, JSON.stringify(records.slice(0, 80)));
  return records;
}

function activePresenceRecords(records: TastingGroupPresenceRecord[], groupId: string): TastingGroupPresenceRecord[] {
  const cutoff = Date.now() - PRESENCE_STALE_MS;
  return records
    .filter((record) => record.groupId === groupId && new Date(record.lastSeenAt).getTime() >= cutoff)
    .sort((left, right) => new Date(right.lastSeenAt).getTime() - new Date(left.lastSeenAt).getTime());
}

function mapCloudPostToFeedPost(post: TastingGroupPost): GroupFeedPost {
  return {
    id: post.id,
    groupId: post.groupId,
    authorLabel: post.authorUserId ? `Member ${post.authorUserId.slice(0, 8)}` : "Member",
    authorUserId: post.authorUserId,
    message: post.body,
    timeLabel: formatPostTimeLabel(post.createdAt),
    postType: post.postType,
    moderationStatus: post.moderationStatus,
    parentPostId: post.parentPostId,
    createdAt: post.createdAt,
    cloudBacked: true
  };
}

function sortFeedPosts(posts: GroupFeedPost[]): GroupFeedPost[] {
  return [...posts].sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}

function mergeCloudAndPreviewGroups(cloudGroups: TastingGroup[]): TastingGroup[] {
  const cloudIds = new Set(cloudGroups.map((group) => group.id));
  return [...cloudGroups, ...initialGroups.filter((group) => !cloudIds.has(group.id))];
}

function mergeCloudAndPreviewEvents(cloudEvents: TastingGroupEvent[]): TastingGroupEvent[] {
  const cloudIds = new Set(cloudEvents.map((event) => event.id));
  return [...cloudEvents, ...initialUpcomingEvents.filter((event) => !cloudIds.has(event.id))];
}

function mergeCloudAndPreviewPosts(groupId: string, existingPosts: GroupFeedPost[], cloudPosts: TastingGroupPost[]): GroupFeedPost[] {
  const cloudFeedPosts = cloudPosts.map(mapCloudPostToFeedPost);
  return sortFeedPosts([
    ...existingPosts.filter((post) => post.groupId !== groupId || !post.cloudBacked),
    ...cloudFeedPosts
  ]);
}

function mergeCloudAndPreviewProfiles(
  groupId: string,
  existingProfiles: TastingGroupMemberProfile[],
  cloudProfiles: TastingGroupMemberProfile[]
): TastingGroupMemberProfile[] {
  return [
    ...cloudProfiles,
    ...existingProfiles.filter((profile) => profile.groupId !== groupId || !profile.cloudBacked)
  ];
}

function mergeCloudAndPreviewReminders(
  eventIds: string[],
  existingReminders: TastingGroupEventReminder[],
  cloudReminders: TastingGroupEventReminder[]
): TastingGroupEventReminder[] {
  const eventIdSet = new Set(eventIds);
  return [
    ...cloudReminders,
    ...existingReminders.filter((reminder) => !eventIdSet.has(reminder.eventId) || !reminder.cloudBacked)
  ];
}

function applyEventRsvp(events: TastingGroupEvent[], eventId: string, status: TastingGroupRsvpStatus): TastingGroupEvent[] {
  return events.map((event) => {
    if (event.id !== eventId) return event;
    const wasGoing = event.userStatus === "going";
    const isGoing = status === "going";
    const nextRsvpCount = Math.max(event.rsvpCount + (isGoing && !wasGoing ? 1 : 0) - (!isGoing && wasGoing ? 1 : 0), 0);
    return {
      ...event,
      rsvpCount: nextRsvpCount,
      seatsLeft: Math.max(event.capacity - nextRsvpCount, 0),
      userStatus: status
    };
  });
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

function getPostAccessErrorMessage(error: unknown): string {
  const message = getErrorMessage(error);
  return message.toLowerCase().includes("row-level security")
    ? "Only the host or approved members can post in this cloud group."
    : message;
}

export function TastingGroups() {
  const { user, loading: authLoading, isConfigured: isAuthConfigured } = useAuth();
  const [groups, setGroups] = useState<TastingGroup[]>(initialGroups);
  const [events, setEvents] = useState<TastingGroupEvent[]>(initialUpcomingEvents);
  const [search, setSearch] = useState("");
  const [focusFilter, setFocusFilter] = useState<"All" | GroupFocus>("All");
  const [selectedGroupId, setSelectedGroupId] = useState(initialGroups[0]?.id ?? "");
  const [groupDraft, setGroupDraft] = useState<GroupDraft>(defaultGroupDraft);
  const [eventDraft, setEventDraft] = useState<GroupEventDraft>(() => defaultEventDraft());
  const [postDraft, setPostDraft] = useState<GroupPostDraft>(() => defaultPostDraft());
  const [memberProfileDraft, setMemberProfileDraft] = useState<GroupMemberProfileDraft>(() => defaultMemberProfileDraft());
  const [feedPosts, setFeedPosts] = useState<GroupFeedPost[]>(() => sortFeedPosts(groupFeed));
  const [memberProfiles, setMemberProfiles] = useState<TastingGroupMemberProfile[]>(initialMemberProfiles);
  const [eventReminders, setEventReminders] = useState<TastingGroupEventReminder[]>(initialEventReminders);
  const [presenceRecords, setPresenceRecords] = useState<TastingGroupPresenceRecord[]>(() => readPresenceRecords());
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [createNotice, setCreateNotice] = useState("");
  const [eventNotice, setEventNotice] = useState("");
  const [postNotice, setPostNotice] = useState("");
  const [profileNotice, setProfileNotice] = useState("");
  const [reminderNotice, setReminderNotice] = useState("");
  const [actionNotice, setActionNotice] = useState("");
  const [membershipNotice, setMembershipNotice] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [mapPaths, setMapPaths] = useState<MapCountryPath[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [cloudLoading, setCloudLoading] = useState(false);
  const [cloudStatus, setCloudStatus] = useState("");
  const [savingGroup, setSavingGroup] = useState(false);
  const [savingEvent, setSavingEvent] = useState(false);
  const [savingPost, setSavingPost] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [pendingJoinGroupId, setPendingJoinGroupId] = useState<string | null>(null);
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);
  const [pendingReminderEventId, setPendingReminderEventId] = useState<string | null>(null);
  const [moderatingPostId, setModeratingPostId] = useState<string | null>(null);
  const [membershipRequests, setMembershipRequests] = useState<TastingGroupMembershipRequest[]>([]);
  const [approvingMemberId, setApprovingMemberId] = useState<string | null>(null);
  const [selectedMapCity, setSelectedMapCity] = useState<string | null>(null);
  const [cohortHandoffNotice, setCohortHandoffNotice] = useState("");

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

  useEffect(() => {
    if (authLoading) {
      setCloudStatus("Checking cohort sync...");
      return;
    }

    if (!isAuthConfigured) {
      setCloudLoading(false);
      setGroups(initialGroups);
      setEvents(initialUpcomingEvents);
      setCloudStatus("Local preview mode. Supabase configuration is required for persistent groups.");
      return;
    }

    if (!user) {
      setCloudLoading(false);
      setGroups(initialGroups);
      setEvents(initialUpcomingEvents);
      setCloudStatus("Sign in to sync tasting groups and save join requests.");
      return;
    }

    let cancelled = false;
    setCloudLoading(true);
    setCloudStatus("Syncing cohort database...");

    Promise.all([listCloudTastingGroups(), listCloudTastingGroupEvents(user.id)])
      .then(([cloudGroups, cloudEvents]) => {
        if (cancelled) return;
        setGroups(mergeCloudAndPreviewGroups(cloudGroups));
        setEvents(mergeCloudAndPreviewEvents(cloudEvents));
        setCloudStatus(
          cloudGroups.length
            ? `${cloudGroups.length} cloud group${cloudGroups.length === 1 ? "" : "s"} and ${cloudEvents.length} cloud event${cloudEvents.length === 1 ? "" : "s"} synced.`
            : "Cloud sync is ready. Start the first persistent tasting group."
        );
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setGroups(initialGroups);
        setEvents(initialUpcomingEvents);
        setCloudStatus(`Cloud sync paused: ${getErrorMessage(error)}`);
      })
      .finally(() => {
        if (!cancelled) setCloudLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, user?.id]);

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
  const isSelectedGroupHost = Boolean(selectedGroup?.cloudBacked && user && selectedGroup.hostUserId === user.id);

  const selectedEvents = useMemo(
    () => events.filter((event) => event.groupId === selectedGroupId),
    [events, selectedGroupId]
  );
  const selectedEventIds = useMemo(() => selectedEvents.map((event) => event.id), [selectedEvents]);
  const selectedMemberProfiles = useMemo(
    () => memberProfiles.filter((profile) => profile.groupId === selectedGroupId),
    [memberProfiles, selectedGroupId]
  );
  const selectedEventReminders = useMemo(() => {
    const eventIdSet = new Set(selectedEventIds);
    return eventReminders.filter((reminder) => eventIdSet.has(reminder.eventId) && reminder.status === "scheduled");
  }, [eventReminders, selectedEventIds]);
  const reminderByEventId = useMemo(() => {
    const byEvent = new Map<string, TastingGroupEventReminder>();
    for (const reminder of selectedEventReminders) {
      byEvent.set(reminder.eventId, reminder);
    }
    return byEvent;
  }, [selectedEventReminders]);
  const selectedPresenceRecords = useMemo(
    () => activePresenceRecords(presenceRecords, selectedGroupId),
    [presenceRecords, selectedGroupId]
  );
  const selectedPresenceSignals = useMemo<TastingGroupPresenceSignal[]>(
    () =>
      selectedPresenceRecords.map((record) => ({
        displayName: record.displayName,
        focus: record.focus,
        lastSeenAt: record.lastSeenAt,
        cloudBacked: record.cloudBacked
      })),
    [selectedPresenceRecords]
  );

  const selectedFeed = useMemo(
    () => sortFeedPosts(feedPosts.filter((post) => post.groupId === selectedGroupId)),
    [feedPosts, selectedGroupId]
  );
  const selectedRootFeed = useMemo(
    () => selectedFeed.filter((post) => !post.parentPostId),
    [selectedFeed]
  );
  const repliesByParent = useMemo(() => {
    const grouped = new Map<string, GroupFeedPost[]>();
    for (const post of selectedFeed) {
      if (!post.parentPostId) continue;
      grouped.set(post.parentPostId, [...(grouped.get(post.parentPostId) ?? []), post]);
    }
    for (const [parentId, replies] of grouped.entries()) {
      grouped.set(
        parentId,
        [...replies].sort((left, right) => new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime())
      );
    }
    return grouped;
  }, [selectedFeed]);
  const replyTarget = useMemo(
    () => (replyParentId ? selectedFeed.find((post) => post.id === replyParentId) ?? null : null),
    [replyParentId, selectedFeed]
  );

  const totalMembers = useMemo(() => groups.reduce((sum, group) => sum + group.members, 0), [groups]);

  useEffect(() => {
    setMembershipNotice("");
    if (!selectedGroup || !isSelectedGroupHost || !isCloudTastingGroupId(selectedGroup.id)) {
      setMembershipRequests([]);
      return;
    }

    let cancelled = false;
    listCloudTastingGroupMembershipRequests(selectedGroup.id)
      .then((requests) => {
        if (!cancelled) setMembershipRequests(requests);
      })
      .catch((error: unknown) => {
        if (!cancelled) setMembershipNotice(`Membership queue unavailable: ${getErrorMessage(error)}`);
      });

    return () => {
      cancelled = true;
    };
  }, [isSelectedGroupHost, selectedGroup?.id]);

  useEffect(() => {
    setReplyParentId(null);
    setPostNotice("");
    setProfileNotice("");
    setReminderNotice("");
    setCohortHandoffNotice("");
  }, [selectedGroupId]);

  useEffect(() => {
    if (!selectedGroup || !selectedGroup.cloudBacked || !isCloudTastingGroupId(selectedGroup.id)) {
      return;
    }

    if (authLoading || !isAuthConfigured || !user) {
      return;
    }

    let cancelled = false;
    listCloudTastingGroupPosts(selectedGroup.id)
      .then((cloudPosts) => {
        if (cancelled) return;
        setFeedPosts((previous) => mergeCloudAndPreviewPosts(selectedGroup.id, previous, cloudPosts));
      })
      .catch((error: unknown) => {
        if (!cancelled) setPostNotice(`Group thread unavailable: ${getErrorMessage(error)}`);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, selectedGroup?.cloudBacked, selectedGroup?.id, user?.id]);

  useEffect(() => {
    if (!selectedGroup || !selectedGroup.cloudBacked || !isCloudTastingGroupId(selectedGroup.id)) {
      return;
    }

    if (authLoading || !isAuthConfigured || !user) {
      return;
    }

    let cancelled = false;
    listCloudTastingGroupMemberProfiles(selectedGroup.id)
      .then((profiles) => {
        if (cancelled) return;
        setMemberProfiles((previous) => mergeCloudAndPreviewProfiles(selectedGroup.id, previous, profiles));
      })
      .catch((error: unknown) => {
        if (!cancelled) setProfileNotice(`Member cards unavailable: ${getErrorMessage(error)}`);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, selectedGroup?.cloudBacked, selectedGroup?.id, user?.id]);

  useEffect(() => {
    const ownProfile = user
      ? selectedMemberProfiles.find((profile) => profile.userId === user.id)
      : undefined;

    if (!ownProfile) {
      setMemberProfileDraft(defaultMemberProfileDraft());
      return;
    }

    setMemberProfileDraft({
      displayName: ownProfile.displayName,
      city: ownProfile.city,
      beverageFocus: ownProfile.beverageFocus,
      credentials: formatCredentials(ownProfile.credentials),
      tastingGoal: ownProfile.tastingGoal,
      availability: ownProfile.availability
    });
  }, [selectedGroupId, selectedMemberProfiles, user?.id]);

  useEffect(() => {
    if (!selectedEventIds.length || authLoading || !isAuthConfigured || !user) {
      return;
    }

    let cancelled = false;
    listCloudTastingGroupEventReminders(selectedEventIds)
      .then((reminders) => {
        if (cancelled) return;
        setEventReminders((previous) => mergeCloudAndPreviewReminders(selectedEventIds, previous, reminders));
      })
      .catch((error: unknown) => {
        if (!cancelled) setReminderNotice(`Reminder planner unavailable: ${getErrorMessage(error)}`);
      });

    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, selectedEventIds.join("|"), user?.id]);

  useEffect(() => {
    if (!selectedGroup) return;

    const presenceUserId = user?.id ?? "local-preview-user";
    const matchingProfile = selectedMemberProfiles.find((profile) => profile.userId === presenceUserId);
    const displayName =
      matchingProfile?.displayName ||
      user?.email?.split("@")[0] ||
      "Local preview member";
    const upsertPresence = () => {
      const nextRecord: TastingGroupPresenceRecord = {
        groupId: selectedGroup.id,
        userId: presenceUserId,
        displayName,
        focus: selectedGroup.focus,
        lastSeenAt: new Date().toISOString(),
        cloudBacked: Boolean(selectedGroup.cloudBacked)
      };
      setPresenceRecords((previous) => {
        const cutoff = Date.now() - PRESENCE_STALE_MS;
        const next = [
          nextRecord,
          ...previous.filter((record) => {
            if (record.groupId === nextRecord.groupId && record.userId === nextRecord.userId) return false;
            return new Date(record.lastSeenAt).getTime() >= cutoff;
          })
        ];
        return writePresenceRecords(next);
      });
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === PRESENCE_STORAGE_KEY) setPresenceRecords(readPresenceRecords());
    };

    upsertPresence();
    const timer = window.setInterval(upsertPresence, 60_000);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("storage", handleStorage);
    };
  }, [selectedGroup, selectedMemberProfiles, user?.email, user?.id]);

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
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
    const draftPayload = {
      name,
      city,
      focus: groupDraft.focus,
      cadence: groupDraft.cadence,
      meetupFormat: groupDraft.meetupFormat,
      sizeLimit: memberCount,
      summary
    };

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

    if (isAuthConfigured && user) {
      setSavingGroup(true);
      setCreateNotice("Saving group to the cohort database...");
      try {
        const cloudGroup = await createCloudTastingGroup(user.id, draftPayload);
        setGroups((previous) => [cloudGroup, ...previous.filter((group) => group.id !== cloudGroup.id)]);
        setSelectedGroupId(cloudGroup.id);
        setGroupDraft(defaultGroupDraft);
        setCreateNotice(`"${cloudGroup.name}" is saved with RLS-protected membership requests.`);
        setCloudStatus("Cloud cohort sync active.");
        setActionNotice("");
        return;
      } catch (error: unknown) {
        setCreateNotice(`Cloud save failed, so the group is staged locally: ${getErrorMessage(error)}`);
      } finally {
        setSavingGroup(false);
      }
    }

    setGroups((previous) => [createdGroup, ...previous]);
    setSelectedGroupId(groupId);
    setGroupDraft(defaultGroupDraft);
    setActionNotice("");
    setCreateNotice(
      isAuthConfigured
        ? `"${createdGroup.name}" is staged locally. Sign in to save it to the cohort database.`
        : `"${createdGroup.name}" is staged locally. Supabase configuration is required for persistence.`
    );
  };

  const handleRequestJoin = async () => {
    if (!selectedGroup) return;

    if (!isAuthConfigured) {
      setActionNotice("Join requests need Supabase configuration before they can be saved.");
      return;
    }

    if (!user) {
      setActionNotice("Sign in to save a membership request for this group.");
      return;
    }

    if (!selectedGroup.cloudBacked || !isCloudTastingGroupId(selectedGroup.id)) {
      setActionNotice("Sample groups are preview data. Request membership on a cloud-synced group.");
      return;
    }

    setPendingJoinGroupId(selectedGroup.id);
    setActionNotice("Saving membership request...");

    try {
      const result = await requestCloudTastingGroupJoin(user.id, selectedGroup.id);
      setActionNotice(
        result === "exists"
          ? "Your membership request is already on file."
          : `Request sent to ${selectedGroup.name}.`
      );
    } catch (error: unknown) {
      setActionNotice(`Could not save request: ${getErrorMessage(error)}`);
    } finally {
      setPendingJoinGroupId(null);
    }
  };

  const handleCreateEvent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroup) return;

    const title = eventDraft.title.trim();
    const venue = eventDraft.venue.trim();
    const notes = eventDraft.notes.trim();
    const capacity = Math.max(2, Math.min(Number.isFinite(eventDraft.capacity) ? eventDraft.capacity : 12, 100));

    if (!title || !venue || !eventDraft.date) {
      setEventNotice("Please add an event title, date, and venue.");
      return;
    }

    if (selectedGroup.cloudBacked && (!isSelectedGroupHost || !isCloudTastingGroupId(selectedGroup.id))) {
      setEventNotice("Only the cloud group host can publish event cards for this group.");
      return;
    }

    const payload: GroupEventDraftPayload = {
      groupId: selectedGroup.id,
      title,
      date: eventDraft.date,
      venue,
      capacity,
      notes
    };

    if (selectedGroup.cloudBacked && isSelectedGroupHost) {
      setSavingEvent(true);
      setEventNotice("Publishing event card to the cohort database...");
      try {
        const cloudEvent = await createCloudTastingGroupEvent(payload);
        setEvents((previous) => [cloudEvent, ...previous.filter((item) => item.id !== cloudEvent.id)]);
        setEventDraft(defaultEventDraft());
        setEventNotice(`"${cloudEvent.title}" is published for ${selectedGroup.name}.`);
        return;
      } catch (error: unknown) {
        setEventNotice(`Cloud event save failed: ${getErrorMessage(error)}`);
      } finally {
        setSavingEvent(false);
      }
      return;
    }

    const localEvent: TastingGroupEvent = {
      id: `evt-${Date.now().toString(36)}`,
      groupId: selectedGroup.id,
      title,
      date: eventDraft.date,
      venue,
      capacity,
      seatsLeft: capacity,
      rsvpCount: 0,
      notes,
      cloudBacked: false
    };
    setEvents((previous) => [localEvent, ...previous]);
    setEventDraft(defaultEventDraft());
    setEventNotice(`"${localEvent.title}" is staged locally for ${selectedGroup.name}.`);
  };

  const handleEventRsvp = async (eventItem: TastingGroupEvent, status: TastingGroupRsvpStatus) => {
    if (eventItem.cloudBacked) {
      if (!isAuthConfigured) {
        setEventNotice("Cloud RSVP needs Supabase configuration.");
        return;
      }
      if (!user) {
        setEventNotice("Sign in to save your RSVP.");
        return;
      }
      if (!isCloudTastingGroupId(eventItem.id)) {
        setEventNotice("This event card is not connected to the cloud RSVP table.");
        return;
      }
      setPendingEventId(eventItem.id);
      setEventNotice("Saving RSVP...");
      try {
        await upsertCloudTastingGroupEventRsvp(user.id, eventItem.id, status);
        setEvents((previous) => applyEventRsvp(previous, eventItem.id, status));
        setEventNotice(status === "cancelled" ? "RSVP cancelled." : `RSVP saved as ${status}.`);
      } catch (error: unknown) {
        setEventNotice(`Could not save RSVP: ${getErrorMessage(error)}`);
      } finally {
        setPendingEventId(null);
      }
      return;
    }

    setEvents((previous) => applyEventRsvp(previous, eventItem.id, status));
    setEventNotice(status === "cancelled" ? "Local RSVP cancelled." : `Local RSVP saved as ${status}.`);
  };

  const handleApproveMembership = async (request: TastingGroupMembershipRequest) => {
    setApprovingMemberId(request.userId);
    setMembershipNotice("Approving membership request...");
    try {
      await approveCloudTastingGroupMembership(request.groupId, request.userId);
      setMembershipRequests((previous) =>
        previous.map((item) =>
          item.groupId === request.groupId && item.userId === request.userId ? { ...item, status: "active" } : item
        )
      );
      setGroups((previous) =>
        previous.map((group) => (group.id === request.groupId ? { ...group, members: group.members + 1 } : group))
      );
      setMembershipNotice("Membership request approved.");
    } catch (error: unknown) {
      setMembershipNotice(`Could not approve request: ${getErrorMessage(error)}`);
    } finally {
      setApprovingMemberId(null);
    }
  };

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroup) return;

    const body = postDraft.body.trim();
    if (body.length < 4) {
      setPostNotice("Add a longer post before publishing.");
      return;
    }

    const payload: GroupPostDraftPayload = {
      groupId: selectedGroup.id,
      body,
      postType: postDraft.postType,
      parentPostId: replyParentId
    };

    if (selectedGroup.cloudBacked) {
      if (!isAuthConfigured) {
        setPostNotice("Cloud threads need Supabase configuration.");
        return;
      }
      if (!user) {
        setPostNotice("Sign in to post in this group thread.");
        return;
      }
      if (!isCloudTastingGroupId(selectedGroup.id)) {
        setPostNotice("This group is not connected to the cloud thread table.");
        return;
      }

      setSavingPost(true);
      setPostNotice(replyParentId ? "Saving reply..." : "Publishing post...");
      try {
        const cloudPost = await createCloudTastingGroupPost(user.id, payload);
        setFeedPosts((previous) => sortFeedPosts([mapCloudPostToFeedPost(cloudPost), ...previous]));
        setPostDraft(defaultPostDraft());
        setReplyParentId(null);
        setPostNotice(replyParentId ? "Reply published." : "Post published.");
      } catch (error: unknown) {
        setPostNotice(`Could not publish: ${getPostAccessErrorMessage(error)}`);
      } finally {
        setSavingPost(false);
      }
      return;
    }

    const now = new Date().toISOString();
    const localPost: GroupFeedPost = {
      id: `feed-${Date.now().toString(36)}`,
      groupId: selectedGroup.id,
      authorLabel: "You",
      message: body,
      timeLabel: "Just now",
      postType: postDraft.postType,
      moderationStatus: "published",
      parentPostId: replyParentId,
      createdAt: now,
      cloudBacked: false
    };

    setFeedPosts((previous) => sortFeedPosts([localPost, ...previous]));
    setPostDraft(defaultPostDraft());
    setReplyParentId(null);
    setPostNotice(replyParentId ? "Local reply staged." : "Local post staged.");
  };

  const handleModeratePost = async (post: GroupFeedPost, status: TastingGroupPostStatus) => {
    if (!selectedGroup) return;

    if (post.cloudBacked) {
      if (!isSelectedGroupHost || !isCloudTastingGroupId(selectedGroup.id)) {
        setPostNotice("Only the cloud group host can moderate this thread.");
        return;
      }

      setModeratingPostId(post.id);
      setPostNotice("Updating moderation status...");
      try {
        const updatedPost = await updateCloudTastingGroupPostStatus(post.id, status);
        const updatedFeedPost = mapCloudPostToFeedPost(updatedPost);
        setFeedPosts((previous) =>
          sortFeedPosts(previous.map((item) => (item.id === post.id ? updatedFeedPost : item)))
        );
        setPostNotice(`Post marked ${status}.`);
      } catch (error: unknown) {
        setPostNotice(`Could not moderate post: ${getErrorMessage(error)}`);
      } finally {
        setModeratingPostId(null);
      }
      return;
    }

    if (selectedGroup.cloudBacked) {
      setPostNotice("Only cloud-backed posts can be moderated from this group.");
      return;
    }

    setFeedPosts((previous) =>
      sortFeedPosts(previous.map((item) => (item.id === post.id ? { ...item, moderationStatus: status } : item)))
    );
    setPostNotice(`Local post marked ${status}.`);
  };

  const handleSaveMemberProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedGroup) return;

    const displayName = memberProfileDraft.displayName.trim();
    if (displayName.length < 2) {
      setProfileNotice("Add a display name before saving your member card.");
      return;
    }

    const now = new Date().toISOString();
    const payload: GroupMemberProfileDraftPayload = {
      groupId: selectedGroup.id,
      displayName,
      city: memberProfileDraft.city.trim(),
      beverageFocus: memberProfileDraft.beverageFocus,
      credentials: parseCredentialList(memberProfileDraft.credentials),
      tastingGoal: memberProfileDraft.tastingGoal.trim(),
      availability: memberProfileDraft.availability.trim()
    };

    if (selectedGroup.cloudBacked) {
      if (!isAuthConfigured) {
        setProfileNotice("Cloud member cards need Supabase configuration.");
        return;
      }
      if (!user) {
        setProfileNotice("Sign in to save a member card for this group.");
        return;
      }
      if (!isCloudTastingGroupId(selectedGroup.id)) {
        setProfileNotice("This group is not connected to the cloud member profile table.");
        return;
      }

      setSavingProfile(true);
      setProfileNotice("Saving member card...");
      try {
        const savedProfile = await upsertCloudTastingGroupMemberProfile(user.id, payload);
        setMemberProfiles((previous) => [
          savedProfile,
          ...previous.filter((profile) => !(profile.groupId === savedProfile.groupId && profile.userId === savedProfile.userId))
        ]);
        setProfileNotice("Member card saved.");
      } catch (error: unknown) {
        setProfileNotice(`Could not save member card: ${getPostAccessErrorMessage(error)}`);
      } finally {
        setSavingProfile(false);
      }
      return;
    }

    const localProfile: TastingGroupMemberProfile = {
      groupId: selectedGroup.id,
      userId: "local-preview-user",
      displayName,
      city: payload.city,
      beverageFocus: payload.beverageFocus,
      credentials: payload.credentials,
      tastingGoal: payload.tastingGoal,
      availability: payload.availability,
      createdAt: now,
      updatedAt: now,
      cloudBacked: false
    };
    setMemberProfiles((previous) => [
      localProfile,
      ...previous.filter((profile) => !(profile.groupId === localProfile.groupId && profile.userId === localProfile.userId))
    ]);
    setProfileNotice("Local member card staged.");
  };

  const handleScheduleReminder = async (eventItem: TastingGroupEvent, leadTime: TastingGroupReminderLeadTime) => {
    const scheduledFor = calculateReminderSchedule(eventItem.date, leadTime);
    const payload: GroupEventReminderPayload = {
      eventId: eventItem.id,
      leadTime,
      channel: "dashboard",
      scheduledFor
    };

    if (eventItem.cloudBacked) {
      if (!isAuthConfigured) {
        setReminderNotice("Cloud reminders need Supabase configuration.");
        return;
      }
      if (!user) {
        setReminderNotice("Sign in to save event reminders.");
        return;
      }
      if (!isCloudTastingGroupId(eventItem.id)) {
        setReminderNotice("This event card is not connected to the cloud reminder table.");
        return;
      }

      setPendingReminderEventId(eventItem.id);
      setReminderNotice("Saving reminder...");
      try {
        const savedReminder = await upsertCloudTastingGroupEventReminder(user.id, payload);
        setEventReminders((previous) => [
          savedReminder,
          ...previous.filter((reminder) => !(reminder.eventId === savedReminder.eventId && reminder.userId === savedReminder.userId))
        ]);
        setReminderNotice(`Reminder set for ${reminderLeadTimeLabels[leadTime]} before ${eventItem.title}.`);
      } catch (error: unknown) {
        setReminderNotice(`Could not save reminder: ${getPostAccessErrorMessage(error)}`);
      } finally {
        setPendingReminderEventId(null);
      }
      return;
    }

    const now = new Date().toISOString();
    const localReminder: TastingGroupEventReminder = {
      eventId: eventItem.id,
      userId: "local-preview-user",
      leadTime,
      channel: "dashboard",
      status: "scheduled",
      scheduledFor,
      createdAt: now,
      updatedAt: now,
      cloudBacked: false
    };
    setEventReminders((previous) => [
      localReminder,
      ...previous.filter((reminder) => !(reminder.eventId === localReminder.eventId && reminder.userId === localReminder.userId))
    ]);
    setReminderNotice(`Local reminder set for ${reminderLeadTimeLabels[leadTime]} before ${eventItem.title}.`);
  };

  const handleCancelReminder = async (eventItem: TastingGroupEvent) => {
    const existingReminder = reminderByEventId.get(eventItem.id);
    if (!existingReminder) return;

    if (existingReminder.cloudBacked) {
      if (!user) {
        setReminderNotice("Sign in to change cloud reminders.");
        return;
      }
      setPendingReminderEventId(eventItem.id);
      setReminderNotice("Cancelling reminder...");
      try {
        await cancelCloudTastingGroupEventReminder(eventItem.id, user.id);
        setEventReminders((previous) =>
          previous.map((reminder) =>
            reminder.eventId === eventItem.id && reminder.userId === user.id
              ? { ...reminder, status: "cancelled" }
              : reminder
          )
        );
        setReminderNotice("Reminder cancelled.");
      } catch (error: unknown) {
        setReminderNotice(`Could not cancel reminder: ${getErrorMessage(error)}`);
      } finally {
        setPendingReminderEventId(null);
      }
      return;
    }

    setEventReminders((previous) =>
      previous.map((reminder) =>
        reminder.eventId === eventItem.id && reminder.userId === existingReminder.userId
          ? { ...reminder, status: "cancelled" }
          : reminder
      )
    );
    setReminderNotice("Local reminder cancelled.");
  };

  const handleDownloadCalendar = (eventItem: TastingGroupEvent) => {
    if (!selectedGroup) return;
    downloadTextFile(
      `sip-studies-${safeFileSlug(selectedGroup.name)}-${safeFileSlug(eventItem.title)}.ics`,
      buildCalendarInvite(selectedGroup, eventItem),
      "text/calendar;charset=utf-8"
    );
    setReminderNotice(`Calendar file downloaded for ${eventItem.title}.`);
  };

  const handleOpenEmailDraft = (eventItem: TastingGroupEvent) => {
    if (!selectedGroup || typeof window === "undefined") return;
    const subject = `${selectedGroup.name}: ${eventItem.title}`;
    const body = buildEventEmailBody(selectedGroup, eventItem);
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setReminderNotice(`Email draft opened for ${eventItem.title}.`);
  };

  const buildCohortHandoffPayload = () => {
    if (!selectedGroup) return null;
    return {
      group: selectedGroup,
      events: selectedEvents,
      memberProfiles: selectedMemberProfiles,
      posts: selectedFeed,
      reminders: selectedEventReminders,
      presence: selectedPresenceSignals
    };
  };

  const handleDownloadCohortDigest = () => {
    const payload = buildCohortHandoffPayload();
    if (!payload) return;
    downloadTextFile(
      `sip-studies-${safeFileSlug(payload.group.name)}-cohort-digest.md`,
      buildTastingGroupCohortDigest(payload),
      "text/markdown;charset=utf-8"
    );
    setCohortHandoffNotice("Cohort digest downloaded.");
  };

  const handleDownloadRosterPage = () => {
    const payload = buildCohortHandoffPayload();
    if (!payload) return;
    downloadTextFile(
      `sip-studies-${safeFileSlug(payload.group.name)}-public-roster.html`,
      buildTastingGroupPublicRosterHtml(payload),
      "text/html;charset=utf-8"
    );
    setCohortHandoffNotice("Public roster page downloaded.");
  };

  const handleDownloadNotificationDigest = () => {
    const payload = buildCohortHandoffPayload();
    if (!payload) return;
    downloadTextFile(
      `sip-studies-${safeFileSlug(payload.group.name)}-notification-digest.txt`,
      buildTastingGroupNotificationDigest(payload),
      "text/plain;charset=utf-8"
    );
    setCohortHandoffNotice("Notification digest downloaded.");
  };

  const handleSendCohortActivityToDashboard = () => {
    const payload = buildCohortHandoffPayload();
    if (!payload) return;
    const snapshot = saveCohortActivitySnapshot(payload);
    setCohortHandoffNotice(`${snapshot.groupName} activity sent to Account Dashboard.`);
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
        <p>Find a group, understand its next meetup, request to join, and build a steady practice habit with other learners.</p>
      </div>

      <div className="tasting-groups-hero">
        <div className="tasting-groups-hero-copy">
          <p className="news-card-tag">Sip Studios Community</p>
          <h3>Move from studying alone to tasting with a consistent cohort.</h3>
          <p>Start as a member: find the right city and focus, review the meetup rhythm, then request a seat or RSVP.</p>
          <div className="tasting-groups-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => document.getElementById("group-search")?.focus()}
            >
              Find a Group
            </button>
            <button type="button" className="btn btn-light" onClick={() => document.getElementById("create-tasting-group")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
              Host Tools
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
            <strong>{events.length}</strong>
            <span>Meetups Planned</span>
          </article>
          <article>
            <strong>{cloudLoading ? "..." : groups.filter((group) => group.cloudBacked).length}</strong>
            <span>Cloud Groups</span>
          </article>
        </div>
      </div>

      <p className="tasting-groups-sync-status">{cloudStatus}</p>

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
          onClick={handleRequestJoin}
        >
          <span>3</span>
          <div>
            <strong>Request to join</strong>
            <p>Introduce your goal, then RSVP to the next useful meetup.</p>
          </div>
        </button>
      </div>

      <details>
        <summary>Optional: explore group cities on the globe</summary>
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
      </details>

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
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={handleRequestJoin}
                  disabled={pendingJoinGroupId === selectedGroup.id}
                >
                  {pendingJoinGroupId === selectedGroup.id ? "Requesting..." : "Request to Join"}
                </button>
              </div>

              {actionNotice ? <p className="tasting-groups-notice">{actionNotice}</p> : null}

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

              <div className="tasting-groups-presence-panel" aria-label="Group presence">
                <div>
                  <strong>{selectedPresenceRecords.length}</strong>
                  <span>active now</span>
                </div>
                <p>
                  {selectedPresenceRecords.length
                    ? selectedPresenceRecords.slice(0, 4).map((record) => record.displayName).join(", ")
                    : "Presence appears when members view this group in the current browser session."}
                </p>
              </div>

              <details>
                <summary>Host tools: cohort exports and dashboard handoff</summary>
              <div className="tasting-groups-cohort-handoff" aria-label="Cohort handoff exports">
                <div>
                  <p className="news-card-tag">Cohort Handoff</p>
                  <h4>Package the group for members, reminders, and public discovery.</h4>
                  <p>
                    Export the current roster, meetups, member goals, discussion prompts, reminder queue, and local presence into shareable files for hosts.
                  </p>
                </div>
                <div className="tasting-groups-handoff-summary">
                  <span>
                    <strong>{selectedMemberProfiles.length}</strong>
                    Cards
                  </span>
                  <span>
                    <strong>{selectedEvents.length}</strong>
                    Events
                  </span>
                  <span>
                    <strong>{selectedRootFeed.length}</strong>
                    Threads
                  </span>
                  <span>
                    <strong>{selectedEventReminders.length}</strong>
                    Holds
                  </span>
                </div>
                <div className="tasting-groups-handoff-actions">
                  <button type="button" onClick={handleDownloadCohortDigest}>
                    Cohort Digest
                  </button>
                  <button type="button" onClick={handleDownloadRosterPage}>
                    Public Roster HTML
                  </button>
                  <button type="button" onClick={handleDownloadNotificationDigest}>
                    Notification Copy
                  </button>
                  <button type="button" onClick={handleSendCohortActivityToDashboard}>
                    Send to Dashboard
                  </button>
                </div>
                {cohortHandoffNotice ? <p className="tasting-groups-notice">{cohortHandoffNotice}</p> : null}
              </div>
              </details>

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
                          {formatDateLabel(eventItem.date)} - {eventItem.seatsLeft} seats left - {eventItem.rsvpCount} going
                        </p>
                        {eventItem.notes ? <p>{eventItem.notes}</p> : null}
                        <div className="tasting-groups-reminder-strip">
                          <span>
                            {reminderByEventId.get(eventItem.id)
                              ? `Reminder: ${reminderLeadTimeLabels[reminderByEventId.get(eventItem.id)!.leadTime]} before`
                              : "No reminder set"}
                          </span>
                          <div>
                            {(Object.keys(reminderLeadTimeLabels) as TastingGroupReminderLeadTime[]).map((leadTime) => (
                              <button
                                type="button"
                                key={`${eventItem.id}-${leadTime}`}
                                onClick={() => handleScheduleReminder(eventItem, leadTime)}
                                disabled={pendingReminderEventId === eventItem.id}
                              >
                                {reminderLeadTimeLabels[leadTime]}
                              </button>
                            ))}
                            {reminderByEventId.get(eventItem.id) ? (
                              <button
                                type="button"
                                onClick={() => handleCancelReminder(eventItem)}
                                disabled={pendingReminderEventId === eventItem.id}
                              >
                                Clear
                              </button>
                            ) : null}
                          </div>
                        </div>
                        <div className="tasting-groups-event-handoffs">
                          <button type="button" onClick={() => handleDownloadCalendar(eventItem)}>
                            Calendar
                          </button>
                          <button type="button" onClick={() => handleOpenEmailDraft(eventItem)}>
                            Email Draft
                          </button>
                        </div>
                        <div className="tasting-groups-rsvp-actions">
                          <button
                            type="button"
                            onClick={() => handleEventRsvp(eventItem, "going")}
                            disabled={pendingEventId === eventItem.id}
                          >
                            {eventItem.userStatus === "going" ? "Going" : "RSVP Going"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEventRsvp(eventItem, "waitlist")}
                            disabled={pendingEventId === eventItem.id}
                          >
                            {eventItem.userStatus === "waitlist" ? "Waitlisted" : "Waitlist"}
                          </button>
                          {eventItem.userStatus ? (
                            <button
                              type="button"
                              onClick={() => handleEventRsvp(eventItem, "cancelled")}
                              disabled={pendingEventId === eventItem.id}
                            >
                              Cancel
                            </button>
                          ) : null}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="tasting-groups-empty">No meetup cards for this group yet.</li>
                  )}
                </ul>
              </div>
              {eventNotice ? <p className="tasting-groups-notice">{eventNotice}</p> : null}
              {reminderNotice ? <p className="tasting-groups-notice">{reminderNotice}</p> : null}
            </article>
          ) : (
            <article className="tasting-groups-feature">
              <h3>Select a group</h3>
              <p className="hint">Pick a group from the left panel to preview its meetup details and feed.</p>
            </article>
          )}

          {selectedGroup ? (
            <details>
              <summary>Host tools: event builder and member approvals</summary>
            <article className="tasting-groups-host-console">
              <div className="tasting-groups-host-head">
                <div>
                  <p className="news-card-tag">Host Console</p>
                  <h3>Event cards, RSVPs, and member approval</h3>
                  <p className="hint">
                    Cloud hosts can publish RSVP-ready meetup cards and approve member requests. Preview groups can stage event cards locally.
                  </p>
                </div>
                <span>{isSelectedGroupHost ? "Cloud host" : selectedGroup.cloudBacked ? "Member view" : "Preview host"}</span>
              </div>

              <form className="tasting-groups-event-form" onSubmit={handleCreateEvent}>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-event-title">Event title</label>
                  <input
                    id="new-event-title"
                    value={eventDraft.title}
                    onChange={(event) => setEventDraft((prev) => ({ ...prev, title: event.target.value }))}
                    maxLength={120}
                    placeholder="Example: Rioja aging law blind flight"
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-event-date">Date</label>
                  <input
                    id="new-event-date"
                    type="date"
                    value={eventDraft.date}
                    onChange={(event) => setEventDraft((prev) => ({ ...prev, date: event.target.value }))}
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-event-venue">Venue</label>
                  <input
                    id="new-event-venue"
                    value={eventDraft.venue}
                    onChange={(event) => setEventDraft((prev) => ({ ...prev, venue: event.target.value }))}
                    maxLength={160}
                    placeholder="Example: Cellar classroom or bottle shop"
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="new-event-capacity">Capacity</label>
                  <input
                    id="new-event-capacity"
                    type="number"
                    min={2}
                    max={100}
                    value={eventDraft.capacity}
                    onChange={(event) =>
                      setEventDraft((prev) => ({ ...prev, capacity: Number.parseInt(event.target.value, 10) || 12 }))
                    }
                  />
                </div>
                <div className="tasting-groups-form-row tasting-groups-form-row-wide">
                  <label htmlFor="new-event-notes">Host notes</label>
                  <textarea
                    id="new-event-notes"
                    rows={3}
                    maxLength={400}
                    value={eventDraft.notes}
                    onChange={(event) => setEventDraft((prev) => ({ ...prev, notes: event.target.value }))}
                    placeholder="Add lineup, prep assignment, glassware, or RSVP instructions."
                  />
                </div>
                <div className="tasting-groups-form-actions">
                  <button type="submit" className="btn btn-primary" disabled={savingEvent || (selectedGroup.cloudBacked && !isSelectedGroupHost)}>
                    {savingEvent ? "Publishing..." : selectedGroup.cloudBacked ? "Publish Event" : "Stage Event"}
                  </button>
                </div>
              </form>

              {isSelectedGroupHost ? (
                <div className="tasting-groups-member-queue">
                  <h4>Membership Requests</h4>
                  {membershipNotice ? <p className="tasting-groups-notice">{membershipNotice}</p> : null}
                  <ul>
                    {membershipRequests.length ? (
                      membershipRequests.map((request) => (
                        <li key={`${request.groupId}-${request.userId}`}>
                          <div>
                            <strong>{request.userId.slice(0, 8)}</strong>
                            <span>{request.status} - {formatDateLabel(request.createdAt.slice(0, 10))}</span>
                          </div>
                          {request.status === "requested" ? (
                            <button
                              type="button"
                              onClick={() => handleApproveMembership(request)}
                              disabled={approvingMemberId === request.userId}
                            >
                              {approvingMemberId === request.userId ? "Approving..." : "Approve"}
                            </button>
                          ) : (
                            <span>Active</span>
                          )}
                        </li>
                      ))
                    ) : (
                      <li className="tasting-groups-empty">No pending cloud membership requests for this group.</li>
                    )}
                  </ul>
                </div>
              ) : null}
            </article>
            </details>
          ) : null}

          {selectedGroup ? (
            <article className="tasting-groups-member-cards">
              <div className="tasting-groups-feed-head">
                <div>
                  <p className="news-card-tag">Member Cards</p>
                  <h3>Profiles, goals, and tasting availability</h3>
                  <p className="hint">
                    {selectedGroup.cloudBacked
                      ? "Cloud member cards are visible to hosts and active members."
                      : "Preview cards stay local until this group is saved to Supabase."}
                  </p>
                </div>
                <span>{selectedMemberProfiles.length} card{selectedMemberProfiles.length === 1 ? "" : "s"}</span>
              </div>

              <form className="tasting-groups-profile-form" onSubmit={handleSaveMemberProfile}>
                <div className="tasting-groups-form-row">
                  <label htmlFor="member-profile-name">Display name</label>
                  <input
                    id="member-profile-name"
                    value={memberProfileDraft.displayName}
                    onChange={(event) => setMemberProfileDraft((prev) => ({ ...prev, displayName: event.target.value }))}
                    maxLength={80}
                    placeholder="Example: Maya T."
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="member-profile-city">City</label>
                  <input
                    id="member-profile-city"
                    value={memberProfileDraft.city}
                    onChange={(event) => setMemberProfileDraft((prev) => ({ ...prev, city: event.target.value }))}
                    maxLength={120}
                    placeholder="Example: Austin, TX"
                  />
                </div>
                <div className="tasting-groups-form-row">
                  <label htmlFor="member-profile-focus">Focus</label>
                  <select
                    id="member-profile-focus"
                    value={memberProfileDraft.beverageFocus}
                    onChange={(event) =>
                      setMemberProfileDraft((prev) => ({ ...prev, beverageFocus: event.target.value as GroupFocus }))
                    }
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
                  <label htmlFor="member-profile-availability">Availability</label>
                  <input
                    id="member-profile-availability"
                    value={memberProfileDraft.availability}
                    onChange={(event) => setMemberProfileDraft((prev) => ({ ...prev, availability: event.target.value }))}
                    maxLength={160}
                    placeholder="Example: Sundays, early evenings"
                  />
                </div>
                <div className="tasting-groups-form-row tasting-groups-form-row-wide">
                  <label htmlFor="member-profile-credentials">Credentials or roles</label>
                  <input
                    id="member-profile-credentials"
                    value={memberProfileDraft.credentials}
                    onChange={(event) => setMemberProfileDraft((prev) => ({ ...prev, credentials: event.target.value }))}
                    maxLength={220}
                    placeholder="Comma-separated: CMS Intro, Cicerone study, Host"
                  />
                </div>
                <div className="tasting-groups-form-row tasting-groups-form-row-wide">
                  <label htmlFor="member-profile-goal">Tasting goal</label>
                  <textarea
                    id="member-profile-goal"
                    rows={3}
                    maxLength={280}
                    value={memberProfileDraft.tastingGoal}
                    onChange={(event) => setMemberProfileDraft((prev) => ({ ...prev, tastingGoal: event.target.value }))}
                    placeholder="What are you trying to improve with this group?"
                  />
                </div>
                <div className="tasting-groups-form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={savingProfile || (selectedGroup.cloudBacked && (!isAuthConfigured || !user))}
                  >
                    {savingProfile ? "Saving..." : selectedGroup.cloudBacked ? "Save Member Card" : "Stage Member Card"}
                  </button>
                </div>
              </form>

              {profileNotice ? <p className="tasting-groups-notice">{profileNotice}</p> : null}

              <div className="tasting-groups-profile-grid">
                {selectedMemberProfiles.length ? (
                  selectedMemberProfiles.map((profile) => (
                    <section key={`${profile.groupId}-${profile.userId}`} className="tasting-groups-profile-card">
                      <div>
                        <strong>{profile.displayName}</strong>
                        <span>{profile.beverageFocus}</span>
                      </div>
                      <p>{profile.city || "Location not shared"}</p>
                      {profile.tastingGoal ? <p>{profile.tastingGoal}</p> : null}
                      {profile.availability ? <p>Availability: {profile.availability}</p> : null}
                      {profile.credentials.length ? (
                        <div className="tasting-group-tags">
                          {profile.credentials.map((credential) => (
                            <span key={`${profile.userId}-${credential}`}>{credential}</span>
                          ))}
                        </div>
                      ) : null}
                    </section>
                  ))
                ) : (
                  <p className="tasting-groups-empty">No member cards are visible for this group yet.</p>
                )}
              </div>
            </article>
          ) : null}

          <article className="tasting-groups-activity">
            <div className="tasting-groups-feed-head">
              <div>
                <h3>Group Thread</h3>
                <p className="hint">
                  {selectedGroup?.cloudBacked
                    ? "Posts save to the cohort database for hosts and approved members."
                    : "Preview posts stay local until the group is saved to the cohort database."}
                </p>
              </div>
              <span>{selectedRootFeed.length} topic{selectedRootFeed.length === 1 ? "" : "s"}</span>
            </div>

            {selectedGroup ? (
              <form className="tasting-groups-post-form" onSubmit={handleCreatePost}>
                <div className="tasting-groups-form-row">
                  <label htmlFor="group-post-type">Post type</label>
                  <select
                    id="group-post-type"
                    value={postDraft.postType}
                    onChange={(event) =>
                      setPostDraft((previous) => ({ ...previous, postType: event.target.value as TastingGroupPostType }))
                    }
                  >
                    {Object.entries(postTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="tasting-groups-form-row tasting-groups-form-row-wide">
                  <label htmlFor="group-post-body">{replyTarget ? `Reply to ${replyTarget.authorLabel}` : "Thread post"}</label>
                  <textarea
                    id="group-post-body"
                    rows={4}
                    maxLength={1000}
                    value={postDraft.body}
                    onChange={(event) => setPostDraft((previous) => ({ ...previous, body: event.target.value }))}
                    placeholder="Add a tasting note, host update, question, or prep assignment."
                  />
                </div>
                {replyTarget ? (
                  <div className="tasting-groups-reply-target">
                    <span>{replyTarget.message}</span>
                    <button type="button" onClick={() => setReplyParentId(null)}>
                      Cancel reply
                    </button>
                  </div>
                ) : null}
                <div className="tasting-groups-form-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={savingPost || (selectedGroup.cloudBacked && (!isAuthConfigured || !user))}
                  >
                    {savingPost ? "Saving..." : replyTarget ? "Reply" : "Post"}
                  </button>
                </div>
              </form>
            ) : null}

            {postNotice ? <p className="tasting-groups-notice">{postNotice}</p> : null}

            <ul className="tasting-groups-thread-list">
              {selectedRootFeed.length ? (
                selectedRootFeed.map((post) => {
                  const replies = repliesByParent.get(post.id) ?? [];
                  return (
                    <li key={post.id} className={`tasting-groups-post tasting-groups-post-${post.moderationStatus}`}>
                      <div className="tasting-groups-post-topline">
                        <strong>{post.authorLabel}</strong>
                        <span>{postTypeLabels[post.postType]}</span>
                        <span>{post.timeLabel}</span>
                        {post.moderationStatus !== "published" ? <span>{post.moderationStatus}</span> : null}
                      </div>
                      <p>{post.message}</p>
                      <div className="tasting-groups-post-actions">
                        {post.moderationStatus === "published" ? (
                          <button type="button" onClick={() => setReplyParentId(post.id)}>
                            Reply
                          </button>
                        ) : null}
                        {isSelectedGroupHost || !selectedGroup?.cloudBacked ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleModeratePost(post, "flagged")}
                              disabled={moderatingPostId === post.id}
                            >
                              Flag
                            </button>
                            <button
                              type="button"
                              onClick={() => handleModeratePost(post, "hidden")}
                              disabled={moderatingPostId === post.id}
                            >
                              Hide
                            </button>
                            {post.moderationStatus !== "published" ? (
                              <button
                                type="button"
                                onClick={() => handleModeratePost(post, "published")}
                                disabled={moderatingPostId === post.id}
                              >
                                Publish
                              </button>
                            ) : null}
                          </>
                        ) : null}
                      </div>
                      {replies.length ? (
                        <ul className="tasting-groups-replies">
                          {replies.map((reply) => (
                            <li key={reply.id} className={`tasting-groups-post tasting-groups-post-${reply.moderationStatus}`}>
                              <div className="tasting-groups-post-topline">
                                <strong>{reply.authorLabel}</strong>
                                <span>{postTypeLabels[reply.postType]}</span>
                                <span>{reply.timeLabel}</span>
                                {reply.moderationStatus !== "published" ? <span>{reply.moderationStatus}</span> : null}
                              </div>
                              <p>{reply.message}</p>
                              <div className="tasting-groups-post-actions">
                                {isSelectedGroupHost || !selectedGroup?.cloudBacked ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleModeratePost(reply, "flagged")}
                                      disabled={moderatingPostId === reply.id}
                                    >
                                      Flag
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleModeratePost(reply, "hidden")}
                                      disabled={moderatingPostId === reply.id}
                                    >
                                      Hide
                                    </button>
                                    {reply.moderationStatus !== "published" ? (
                                      <button
                                        type="button"
                                        onClick={() => handleModeratePost(reply, "published")}
                                        disabled={moderatingPostId === reply.id}
                                      >
                                        Publish
                                      </button>
                                    ) : null}
                                  </>
                                ) : null}
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })
              ) : (
                <li className="tasting-groups-empty">No posts for this group yet.</li>
              )}
            </ul>
          </article>

          <details id="create-tasting-group">
            <summary>Host tools: create a new tasting group</summary>
          <article className="tasting-groups-create">
            <div className="tasting-groups-create-head">
              <h3>Create a Tasting Group</h3>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowCreateForm((value) => !value)}
                aria-expanded={showCreateForm}
              >
                {showCreateForm ? "Hide Builder" : "Open Builder"}
              </button>
            </div>
            <p className="hint">
              Signed-in hosts save groups to Supabase. Everyone else can stage a local preview before signing in.
            </p>

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
                  <button type="submit" className="btn btn-primary" disabled={savingGroup}>
                    {savingGroup ? "Saving..." : user && isAuthConfigured ? "Create Cloud Group" : "Create Local Preview"}
                  </button>
                </div>
              </form>
            ) : (
              <p className="hint">Builder hidden for focus. Open it when you're ready to create a new group.</p>
            )}

            {createNotice ? <p className="tasting-groups-notice">{createNotice}</p> : null}
          </article>
          </details>
        </div>
      </div>
    </section>
  );
}
