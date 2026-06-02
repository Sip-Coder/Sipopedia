import type {
  GroupFocus,
  TastingGroup,
  TastingGroupEvent,
  TastingGroupEventReminder,
  TastingGroupMemberProfile,
  TastingGroupPostStatus,
  TastingGroupPostType
} from "./tastingGroups";

export type TastingGroupDigestPost = {
  authorLabel: string;
  message: string;
  postType: TastingGroupPostType;
  moderationStatus: TastingGroupPostStatus;
  createdAt: string;
  parentPostId?: string | null;
};

export type TastingGroupPresenceSignal = {
  displayName: string;
  focus: GroupFocus;
  lastSeenAt: string;
  cloudBacked: boolean;
};

type TastingGroupHandoffInput = {
  group: TastingGroup;
  events: TastingGroupEvent[];
  memberProfiles: TastingGroupMemberProfile[];
  posts: TastingGroupDigestPost[];
  reminders: TastingGroupEventReminder[];
  presence: TastingGroupPresenceSignal[];
};

const reminderLeadTimeLabels: Record<TastingGroupEventReminder["leadTime"], string> = {
  "24h": "24 hours",
  "3d": "3 days",
  "7d": "7 days"
};

function formatDate(value: string): string {
  const parsed = new Date(value.includes("T") ? value : `${value}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return value || "Not scheduled";
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function formatDateTime(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Recently";
  return parsed.toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function topLevelPosts(posts: TastingGroupDigestPost[]): TastingGroupDigestPost[] {
  return posts
    .filter((post) => !post.parentPostId && post.moderationStatus !== "hidden")
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime());
}

function upcomingEvents(events: TastingGroupEvent[]): TastingGroupEvent[] {
  return [...events].sort((left, right) => new Date(left.date).getTime() - new Date(right.date).getTime());
}

function reminderLine(reminder: TastingGroupEventReminder, events: TastingGroupEvent[]): string {
  const event = events.find((item) => item.id === reminder.eventId);
  return `${event?.title ?? reminder.eventId}: ${reminderLeadTimeLabels[reminder.leadTime]} before via ${reminder.channel}`;
}

export function buildTastingGroupCohortDigest({
  group,
  events,
  memberProfiles,
  posts,
  reminders,
  presence
}: TastingGroupHandoffInput): string {
  const eventRows = upcomingEvents(events);
  const postRows = topLevelPosts(posts).slice(0, 8);
  const activeNames = presence.map((item) => item.displayName).slice(0, 8);

  return [
    `# ${group.name} Cohort Digest`,
    "",
    `Generated: ${new Date().toLocaleString()}`,
    `City: ${group.city}`,
    `Focus: ${group.focus}`,
    `Cadence: ${group.cadence}`,
    `Format: ${group.meetupFormat}`,
    `Members: ${group.members}`,
    `Cloud status: ${group.cloudBacked ? "Cloud-backed" : "Preview/local"}`,
    "",
    "## Public Summary",
    group.summary,
    "",
    "## Next Meetup Cards",
    ...(eventRows.length
      ? eventRows.map((event) => `- ${formatDate(event.date)}: ${event.title} at ${event.venue} (${event.rsvpCount} going, ${event.seatsLeft} seats left)`)
      : ["- No meetup cards yet."]),
    "",
    "## Reminder Queue",
    ...(reminders.length ? reminders.map((reminder) => `- ${reminderLine(reminder, events)}`) : ["- No scheduled reminder records yet."]),
    "",
    "## Member Cards",
    ...(memberProfiles.length
      ? memberProfiles.map((profile) => `- ${profile.displayName} (${profile.beverageFocus}, ${profile.city || "location private"}): ${profile.tastingGoal || "No goal shared yet."}`)
      : ["- No visible member cards yet."]),
    "",
    "## Active Presence",
    activeNames.length ? activeNames.map((name) => `- ${name}`) : "- No active presence signals in this browser session.",
    "",
    "## Latest Threads",
    ...(postRows.length
      ? postRows.map((post) => `- ${post.authorLabel} / ${post.postType}: ${cleanText(post.message)}`)
      : ["- No published thread activity yet."]),
    "",
    "## Host Operating Checklist",
    "- Confirm the next meetup card has date, venue, capacity, and prep notes.",
    "- Send the reminder digest before the first lead-time window expires.",
    "- Ask members without cards to add focus, availability, and tasting goal.",
    "- Convert the top thread question into the next tasting prompt.",
    "- Refresh this digest after major RSVP, roster, or discussion changes."
  ].join("\n");
}

export function buildTastingGroupNotificationDigest({ group, events, reminders, posts }: TastingGroupHandoffInput): string {
  const eventRows = upcomingEvents(events).slice(0, 3);
  const postRows = topLevelPosts(posts).slice(0, 4);
  return [
    `${group.name} Update`,
    "",
    `Focus: ${group.focus} / ${group.city}`,
    "",
    "Next meetups:",
    ...(eventRows.length
      ? eventRows.map((event) => `- ${formatDate(event.date)}: ${event.title} at ${event.venue}. ${event.notes || "Bring a tasting note and one question."}`)
      : ["- No meetup cards are currently scheduled."]),
    "",
    "Reminder status:",
    ...(reminders.length ? reminders.map((reminder) => `- ${reminderLine(reminder, events)}`) : ["- No reminder records are scheduled yet."]),
    "",
    "Thread prompts:",
    ...(postRows.length ? postRows.map((post) => `- ${post.authorLabel}: ${cleanText(post.message)}`) : ["- Start a thread with one bottle, one question, or one prep assignment."]),
    "",
    "Reply with your RSVP, tasting note, or availability update so the host can keep the cohort current."
  ].join("\n");
}

export function buildTastingGroupPublicRosterHtml({
  group,
  events,
  memberProfiles,
  posts,
  presence
}: TastingGroupHandoffInput): string {
  const eventRows = upcomingEvents(events).slice(0, 6);
  const postRows = topLevelPosts(posts).slice(0, 6);
  const activeNames = presence.map((item) => item.displayName).slice(0, 8);
  const memberCards = memberProfiles.length
    ? memberProfiles
        .map(
          (profile) => `
      <article class="member-card">
        <div><strong>${escapeHtml(profile.displayName)}</strong><span>${escapeHtml(profile.beverageFocus)}</span></div>
        <p>${escapeHtml(profile.city || "Location not shared")}</p>
        <p>${escapeHtml(profile.tastingGoal || "No tasting goal shared yet.")}</p>
        <small>${escapeHtml(profile.availability || "Availability not shared")}</small>
        <p>${escapeHtml(profile.credentials.join(" / ") || "No credentials or roles shared")}</p>
      </article>`
        )
        .join("")
    : `<p class="empty">No visible member cards yet.</p>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(group.name)} - Sip Studies Cohort Roster</title>
  <style>
    body { margin: 0; font-family: Inter, Arial, sans-serif; background: #f5f8f9; color: #1f3640; }
    main { max-width: 1040px; margin: 0 auto; padding: 32px 20px; }
    header, section { border: 1px solid #d3dde3; border-radius: 16px; background: #fffdfa; padding: 18px; margin-bottom: 14px; }
    h1, h2, p { margin: 0; }
    h1 { font-size: clamp(2rem, 5vw, 4rem); line-height: 0.95; }
    h2 { color: #274b57; }
    .meta, .grid, .member-grid, .event-grid { display: grid; gap: 10px; }
    .meta { grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); margin-top: 16px; }
    .meta span, .pill, .member-card, .event-card, .thread-card { border: 1px solid #d7e2e6; border-radius: 12px; background: #f9fcfc; padding: 10px; }
    .meta strong, .member-card strong, .event-card strong, .thread-card strong { display: block; color: #223d48; }
    .member-grid, .event-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top: 12px; }
    .member-card div { display: flex; justify-content: space-between; gap: 8px; }
    .member-card span, .pill { color: #41636e; font-size: 0.78rem; font-weight: 800; text-transform: uppercase; }
    .thread-card { margin-top: 10px; }
    .empty { color: #63747b; }
    @media print { body { background: white; } main { padding: 0; } }
  </style>
</head>
<body>
  <main>
    <header>
      <p class="pill">Sip Studies Cohort Roster</p>
      <h1>${escapeHtml(group.name)}</h1>
      <p>${escapeHtml(group.summary)}</p>
      <div class="meta">
        <span><strong>${escapeHtml(group.city)}</strong> City</span>
        <span><strong>${escapeHtml(group.focus)}</strong> Focus</span>
        <span><strong>${escapeHtml(group.cadence)}</strong> Cadence</span>
        <span><strong>${group.members}</strong> Members</span>
        <span><strong>${escapeHtml(group.cloudBacked ? "Cloud" : "Preview")}</strong> Sync</span>
      </div>
    </header>
    <section>
      <h2>Upcoming Meetups</h2>
      <div class="event-grid">
        ${eventRows.length ? eventRows.map((event) => `<article class="event-card"><strong>${escapeHtml(event.title)}</strong><p>${escapeHtml(formatDate(event.date))} / ${escapeHtml(event.venue)}</p><p>${event.rsvpCount} going / ${event.seatsLeft} seats left</p><p>${escapeHtml(event.notes || "Bring a tasting note and one question.")}</p></article>`).join("") : `<p class="empty">No meetup cards yet.</p>`}
      </div>
    </section>
    <section>
      <h2>Member Cards</h2>
      <div class="member-grid">${memberCards}</div>
    </section>
    <section>
      <h2>Activity Signals</h2>
      <p>Active now: ${escapeHtml(activeNames.join(", ") || "No active local presence signals.")}</p>
      ${postRows.length ? postRows.map((post) => `<article class="thread-card"><strong>${escapeHtml(post.authorLabel)} / ${escapeHtml(post.postType)}</strong><p>${escapeHtml(cleanText(post.message))}</p><small>${escapeHtml(formatDateTime(post.createdAt))}</small></article>`).join("") : `<p class="empty">No published thread activity yet.</p>`}
    </section>
  </main>
</body>
</html>`;
}
