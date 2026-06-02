import { supabase } from "./supabase";

export type GroupFocus = "Wine" | "Spirits" | "Beer" | "Sake" | "Zero Proof" | "Coffee & Tea";
export type MeetupFormat = "In Person" | "Hybrid";

export type TastingGroup = {
  id: string;
  hostUserId?: string;
  name: string;
  city: string;
  focus: GroupFocus;
  cadence: string;
  members: number;
  meetupFormat: MeetupFormat;
  nextMeetup: string;
  summary: string;
  tags: string[];
  cloudBacked?: boolean;
};

export type TastingGroupEvent = {
  id: string;
  groupId: string;
  title: string;
  date: string;
  venue: string;
  capacity: number;
  seatsLeft: number;
  rsvpCount: number;
  notes: string;
  userStatus?: TastingGroupRsvpStatus;
  cloudBacked?: boolean;
};

export type TastingGroupRsvpStatus = "going" | "waitlist" | "cancelled";
export type TastingGroupPostType = "discussion" | "tasting_note" | "announcement" | "question";
export type TastingGroupPostStatus = "published" | "flagged" | "hidden";
export type TastingGroupReminderLeadTime = "24h" | "3d" | "7d";
export type TastingGroupReminderStatus = "scheduled" | "cancelled" | "sent";

export type TastingGroupMembershipRequest = {
  groupId: string;
  userId: string;
  role: "host" | "member";
  status: "requested" | "active";
  createdAt: string;
};

export type TastingGroupPost = {
  id: string;
  groupId: string;
  authorUserId: string;
  parentPostId?: string | null;
  body: string;
  postType: TastingGroupPostType;
  moderationStatus: TastingGroupPostStatus;
  createdAt: string;
  updatedAt: string;
  cloudBacked?: boolean;
};

export type TastingGroupMemberProfile = {
  groupId: string;
  userId: string;
  displayName: string;
  city: string;
  beverageFocus: GroupFocus;
  credentials: string[];
  tastingGoal: string;
  availability: string;
  createdAt: string;
  updatedAt: string;
  cloudBacked?: boolean;
};

export type TastingGroupEventReminder = {
  eventId: string;
  userId: string;
  leadTime: TastingGroupReminderLeadTime;
  channel: "dashboard" | "email";
  status: TastingGroupReminderStatus;
  scheduledFor?: string | null;
  createdAt: string;
  updatedAt: string;
  cloudBacked?: boolean;
};

export type GroupDraftPayload = {
  name: string;
  city: string;
  focus: GroupFocus;
  cadence: string;
  meetupFormat: MeetupFormat;
  sizeLimit: number;
  summary: string;
};

export type GroupEventDraftPayload = {
  groupId: string;
  title: string;
  date: string;
  venue: string;
  capacity: number;
  notes: string;
};

export type GroupPostDraftPayload = {
  groupId: string;
  body: string;
  postType: TastingGroupPostType;
  parentPostId?: string | null;
};

export type GroupMemberProfileDraftPayload = {
  groupId: string;
  displayName: string;
  city: string;
  beverageFocus: GroupFocus;
  credentials: string[];
  tastingGoal: string;
  availability: string;
};

export type GroupEventReminderPayload = {
  eventId: string;
  leadTime: TastingGroupReminderLeadTime;
  channel: "dashboard" | "email";
  scheduledFor?: string | null;
};

type CloudTastingGroupRow = {
  id: string;
  host_user_id: string;
  name: string;
  city: string;
  focus: GroupFocus;
  cadence: string;
  meetup_format: MeetupFormat;
  member_count: number;
  size_limit: number;
  next_meetup: string;
  summary: string;
  tags: string[] | null;
  created_at: string;
};

type CloudTastingGroupEventRow = {
  id: string;
  group_id: string;
  title: string;
  event_date: string;
  venue: string;
  capacity: number;
  notes: string;
  created_at: string;
};

type CloudTastingGroupRsvpRow = {
  event_id: string;
  user_id: string;
  status: TastingGroupRsvpStatus;
};

type CloudTastingGroupMembershipRow = {
  group_id: string;
  user_id: string;
  role: "host" | "member";
  status: "requested" | "active";
  created_at: string;
};

type CloudTastingGroupPostRow = {
  id: string;
  group_id: string;
  author_user_id: string;
  parent_post_id: string | null;
  body: string;
  post_type: TastingGroupPostType;
  moderation_status: TastingGroupPostStatus;
  created_at: string;
  updated_at: string;
};

type CloudTastingGroupMemberProfileRow = {
  group_id: string;
  user_id: string;
  display_name: string;
  city: string;
  beverage_focus: GroupFocus;
  credentials: string[] | null;
  tasting_goal: string;
  availability: string;
  created_at: string;
  updated_at: string;
};

type CloudTastingGroupEventReminderRow = {
  event_id: string;
  user_id: string;
  lead_time: TastingGroupReminderLeadTime;
  channel: "dashboard" | "email";
  status: TastingGroupReminderStatus;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
};

const CLOUD_GROUP_COLUMNS =
  "id,host_user_id,name,city,focus,cadence,meetup_format,member_count,size_limit,next_meetup,summary,tags,created_at";
const CLOUD_EVENT_COLUMNS =
  "id,group_id,title,event_date,venue,capacity,notes,created_at";
const CLOUD_RSVP_COLUMNS = "event_id,user_id,status";
const CLOUD_MEMBERSHIP_COLUMNS = "group_id,user_id,role,status,created_at";
const CLOUD_POST_COLUMNS =
  "id,group_id,author_user_id,parent_post_id,body,post_type,moderation_status,created_at,updated_at";
const CLOUD_MEMBER_PROFILE_COLUMNS =
  "group_id,user_id,display_name,city,beverage_focus,credentials,tasting_goal,availability,created_at,updated_at";
const CLOUD_EVENT_REMINDER_COLUMNS =
  "event_id,user_id,lead_time,channel,status,scheduled_for,created_at,updated_at";

const CLOUD_GROUP_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function mapCloudGroup(row: CloudTastingGroupRow): TastingGroup {
  return {
    id: row.id,
    hostUserId: row.host_user_id,
    name: row.name,
    city: row.city,
    focus: row.focus,
    cadence: row.cadence,
    members: row.member_count,
    meetupFormat: row.meetup_format,
    nextMeetup: row.next_meetup,
    summary: row.summary,
    tags: row.tags?.length ? row.tags : ["Cloud cohort"],
    cloudBacked: true
  };
}

function mapCloudEvent(row: CloudTastingGroupEventRow, rsvps: CloudTastingGroupRsvpRow[], userId?: string): TastingGroupEvent {
  const goingCount = rsvps.filter((rsvp) => rsvp.event_id === row.id && rsvp.status === "going").length;
  const userRsvp = userId ? rsvps.find((rsvp) => rsvp.event_id === row.id && rsvp.user_id === userId) : undefined;
  return {
    id: row.id,
    groupId: row.group_id,
    title: row.title,
    date: row.event_date,
    venue: row.venue,
    capacity: row.capacity,
    seatsLeft: Math.max(row.capacity - goingCount, 0),
    rsvpCount: goingCount,
    notes: row.notes,
    userStatus: userRsvp?.status,
    cloudBacked: true
  };
}

function mapCloudPost(row: CloudTastingGroupPostRow): TastingGroupPost {
  return {
    id: row.id,
    groupId: row.group_id,
    authorUserId: row.author_user_id,
    parentPostId: row.parent_post_id,
    body: row.body,
    postType: row.post_type,
    moderationStatus: row.moderation_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cloudBacked: true
  };
}

function mapCloudMemberProfile(row: CloudTastingGroupMemberProfileRow): TastingGroupMemberProfile {
  return {
    groupId: row.group_id,
    userId: row.user_id,
    displayName: row.display_name,
    city: row.city,
    beverageFocus: row.beverage_focus,
    credentials: row.credentials ?? [],
    tastingGoal: row.tasting_goal,
    availability: row.availability,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cloudBacked: true
  };
}

function mapCloudEventReminder(row: CloudTastingGroupEventReminderRow): TastingGroupEventReminder {
  return {
    eventId: row.event_id,
    userId: row.user_id,
    leadTime: row.lead_time,
    channel: row.channel,
    status: row.status,
    scheduledFor: row.scheduled_for,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    cloudBacked: true
  };
}

function buildCloudGroupTags(payload: GroupDraftPayload): string[] {
  return ["Cloud cohort", payload.meetupFormat, `${payload.focus} focus`];
}

export function isCloudTastingGroupId(id: string): boolean {
  return CLOUD_GROUP_ID_PATTERN.test(id);
}

export async function listCloudTastingGroups(): Promise<TastingGroup[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tasting_groups")
    .select(CLOUD_GROUP_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudTastingGroupRow[]).map(mapCloudGroup);
}

export async function createCloudTastingGroup(userId: string, payload: GroupDraftPayload): Promise<TastingGroup> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_groups")
    .insert({
      host_user_id: userId,
      name: payload.name,
      city: payload.city,
      focus: payload.focus,
      cadence: payload.cadence,
      meetup_format: payload.meetupFormat,
      member_count: 1,
      size_limit: payload.sizeLimit,
      summary: payload.summary,
      tags: buildCloudGroupTags(payload)
    })
    .select(CLOUD_GROUP_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudGroup(data as CloudTastingGroupRow);
}

export async function listCloudTastingGroupEvents(userId?: string): Promise<TastingGroupEvent[]> {
  if (!supabase) return [];

  const { data: events, error: eventsError } = await supabase
    .from("tasting_group_events")
    .select(CLOUD_EVENT_COLUMNS)
    .order("event_date", { ascending: true })
    .limit(100);

  if (eventsError) throw new Error(eventsError.message);

  const eventRows = (events ?? []) as CloudTastingGroupEventRow[];
  if (!eventRows.length) return [];

  const eventIds = eventRows.map((event) => event.id);
  const { data: rsvps, error: rsvpsError } = await supabase
    .from("tasting_group_event_rsvps")
    .select(CLOUD_RSVP_COLUMNS)
    .in("event_id", eventIds);

  if (rsvpsError) throw new Error(rsvpsError.message);
  const rsvpRows = (rsvps ?? []) as CloudTastingGroupRsvpRow[];

  return eventRows.map((event) => mapCloudEvent(event, rsvpRows, userId));
}

export async function createCloudTastingGroupEvent(payload: GroupEventDraftPayload): Promise<TastingGroupEvent> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_group_events")
    .insert({
      group_id: payload.groupId,
      title: payload.title,
      event_date: payload.date,
      venue: payload.venue,
      capacity: payload.capacity,
      notes: payload.notes
    })
    .select(CLOUD_EVENT_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudEvent(data as CloudTastingGroupEventRow, []);
}

export async function upsertCloudTastingGroupEventRsvp(
  userId: string,
  eventId: string,
  status: TastingGroupRsvpStatus,
  note = ""
): Promise<TastingGroupRsvpStatus> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.from("tasting_group_event_rsvps").upsert(
    {
      event_id: eventId,
      user_id: userId,
      status,
      note
    },
    { onConflict: "event_id,user_id" }
  );

  if (error) throw new Error(error.message);
  return status;
}

export async function requestCloudTastingGroupJoin(userId: string, groupId: string): Promise<"created" | "exists"> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase.from("tasting_group_memberships").insert({
    group_id: groupId,
    user_id: userId,
    role: "member",
    status: "requested"
  });

  if (!error) return "created";
  if (error.code === "23505") return "exists";
  throw new Error(error.message);
}

export async function listCloudTastingGroupMembershipRequests(groupId: string): Promise<TastingGroupMembershipRequest[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tasting_group_memberships")
    .select(CLOUD_MEMBERSHIP_COLUMNS)
    .eq("group_id", groupId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudTastingGroupMembershipRow[]).map((row) => ({
    groupId: row.group_id,
    userId: row.user_id,
    role: row.role,
    status: row.status,
    createdAt: row.created_at
  }));
}

export async function approveCloudTastingGroupMembership(groupId: string, userId: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("tasting_group_memberships")
    .update({ status: "active" })
    .eq("group_id", groupId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}

export async function listCloudTastingGroupPosts(groupId: string): Promise<TastingGroupPost[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tasting_group_posts")
    .select(CLOUD_POST_COLUMNS)
    .eq("group_id", groupId)
    .order("created_at", { ascending: true })
    .limit(150);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudTastingGroupPostRow[]).map(mapCloudPost);
}

export async function createCloudTastingGroupPost(
  userId: string,
  payload: GroupPostDraftPayload
): Promise<TastingGroupPost> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_group_posts")
    .insert({
      group_id: payload.groupId,
      author_user_id: userId,
      parent_post_id: payload.parentPostId ?? null,
      body: payload.body,
      post_type: payload.postType,
      moderation_status: "published"
    })
    .select(CLOUD_POST_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudPost(data as CloudTastingGroupPostRow);
}

export async function updateCloudTastingGroupPostStatus(
  postId: string,
  status: TastingGroupPostStatus
): Promise<TastingGroupPost> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_group_posts")
    .update({ moderation_status: status })
    .eq("id", postId)
    .select(CLOUD_POST_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudPost(data as CloudTastingGroupPostRow);
}

export async function listCloudTastingGroupMemberProfiles(groupId: string): Promise<TastingGroupMemberProfile[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("tasting_group_member_profiles")
    .select(CLOUD_MEMBER_PROFILE_COLUMNS)
    .eq("group_id", groupId)
    .order("updated_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudTastingGroupMemberProfileRow[]).map(mapCloudMemberProfile);
}

export async function upsertCloudTastingGroupMemberProfile(
  userId: string,
  payload: GroupMemberProfileDraftPayload
): Promise<TastingGroupMemberProfile> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_group_member_profiles")
    .upsert(
      {
        group_id: payload.groupId,
        user_id: userId,
        display_name: payload.displayName,
        city: payload.city,
        beverage_focus: payload.beverageFocus,
        credentials: payload.credentials,
        tasting_goal: payload.tastingGoal,
        availability: payload.availability
      },
      { onConflict: "group_id,user_id" }
    )
    .select(CLOUD_MEMBER_PROFILE_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudMemberProfile(data as CloudTastingGroupMemberProfileRow);
}

export async function listCloudTastingGroupEventReminders(eventIds: string[]): Promise<TastingGroupEventReminder[]> {
  if (!supabase || !eventIds.length) return [];

  const { data, error } = await supabase
    .from("tasting_group_event_reminders")
    .select(CLOUD_EVENT_REMINDER_COLUMNS)
    .in("event_id", eventIds)
    .order("updated_at", { ascending: false });

  if (error) throw new Error(error.message);
  return ((data ?? []) as CloudTastingGroupEventReminderRow[]).map(mapCloudEventReminder);
}

export async function upsertCloudTastingGroupEventReminder(
  userId: string,
  payload: GroupEventReminderPayload
): Promise<TastingGroupEventReminder> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("tasting_group_event_reminders")
    .upsert(
      {
        event_id: payload.eventId,
        user_id: userId,
        lead_time: payload.leadTime,
        channel: payload.channel,
        status: "scheduled",
        scheduled_for: payload.scheduledFor ?? null
      },
      { onConflict: "event_id,user_id" }
    )
    .select(CLOUD_EVENT_REMINDER_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  return mapCloudEventReminder(data as CloudTastingGroupEventReminderRow);
}

export async function cancelCloudTastingGroupEventReminder(eventId: string, userId: string): Promise<void> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { error } = await supabase
    .from("tasting_group_event_reminders")
    .update({ status: "cancelled" })
    .eq("event_id", eventId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}
