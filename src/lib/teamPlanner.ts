import { supabase } from "./supabase";

export const TEAM_PLANNER_STORAGE_KEY = "sipstudies:team-training-plan:v1";
export const TEAM_PLANNER_EVENT = "sipstudies:team-training-plan-updated";

export type TeamPlannerAssignment = {
  cloudId?: string;
  week: number;
  title: string;
  route: string;
  owner: string;
  due: string;
  outcome: string;
  completed: boolean;
};

export type TeamTrainingPlan = {
  id: string;
  teamName: string;
  managerName: string;
  focus: string;
  sprintTitle: string;
  startDate: string;
  savedAt: string;
  memberEmails?: string[];
  cloudBacked?: boolean;
  assignments: TeamPlannerAssignment[];
};

export type TeamTrainingSnapshot = {
  plan: TeamTrainingPlan | null;
  completedAssignments: number;
  totalAssignments: number;
  completionRate: number;
  nextAssignment: TeamPlannerAssignment | null;
};

export type TeamSprintTemplate = {
  id: string;
  title: string;
  focus: string;
  defaultOwner: string;
  assignments: Omit<TeamPlannerAssignment, "owner" | "due" | "completed">[];
};

type CloudTeamTrainingAccountRow = {
  id: string;
  team_name: string;
  manager_name: string;
  focus: string;
  sprint_title: string;
  start_date: string | null;
  status: "active" | "archived";
  updated_at: string;
};

type CloudTeamTrainingMembershipRow = {
  member_email: string;
  display_name: string;
  role: "manager" | "member";
  invite_status: "invited" | "active" | "removed";
};

type CloudTeamTrainingAssignmentRow = {
  id: string;
  week: number;
  title: string;
  route: string;
  owner_name: string;
  due_date: string | null;
  outcome: string;
  completed: boolean;
  updated_at: string;
};

const CLOUD_TEAM_ACCOUNT_COLUMNS = "id,team_name,manager_name,focus,sprint_title,start_date,status,updated_at";
const CLOUD_TEAM_MEMBERSHIP_COLUMNS = "member_email,display_name,role,invite_status";
const CLOUD_TEAM_ASSIGNMENT_COLUMNS = "id,week,title,route,owner_name,due_date,outcome,completed,updated_at";

export const teamSprintTemplates: TeamSprintTemplate[] = [
  {
    id: "service-floor",
    title: "Service Floor Readiness",
    focus: "Guest language, pairing logic, classic styles, and table-side confidence",
    defaultOwner: "Floor lead",
    assignments: [
      { week: 1, title: "Guest Language Baseline", route: "app/sipopedia", outcome: "Team can explain five core service terms in plain language." },
      { week: 2, title: "Pairing Logic Drill", route: "app/flavor-wheel", outcome: "Team can connect weight, intensity, acid, sweetness, and texture to a pairing." },
      { week: 3, title: "Classic Style Map", route: "app/regions", outcome: "Team can name key regions and grapes behind the current list." },
      { week: 4, title: "Table-Side Scenario", route: "app/cocktails", outcome: "Team can answer three common guest questions with confident, concise language." }
    ]
  },
  {
    id: "beer-draught",
    title: "Beer + Draught Fundamentals",
    focus: "Style families, draught handling, off-flavor review, and service standards",
    defaultOwner: "Beer captain",
    assignments: [
      { week: 1, title: "Style Family Recall", route: "app/beverage-quiz", outcome: "Team can group common styles by fermentation, malt, hops, and service cues." },
      { week: 2, title: "Brewing + Equipment Walkthrough", route: "app/sip-game", outcome: "Team can explain the major brewing stages and equipment touchpoints." },
      { week: 3, title: "Draught Quality Check", route: "app/resources", outcome: "Team can spot freshness, glassware, line, and temperature issues." },
      { week: 4, title: "Off-Flavor Retake", route: "app/beverage-quiz", outcome: "Team completes a focused weak-topic quiz pass." }
    ]
  },
  {
    id: "spirits-cocktail",
    title: "Spirits + Cocktail Shift Prep",
    focus: "Base spirits, classic specs, modifier logic, and menu language",
    defaultOwner: "Bar lead",
    assignments: [
      { week: 1, title: "Base Spirit Grid", route: "app/resources", outcome: "Team can list production and flavor differences across core spirits." },
      { week: 2, title: "Classic Build Drill", route: "app/cocktails", outcome: "Team can recall specs and explain structure for core classics." },
      { week: 3, title: "Flavor Calibration", route: "app/flavor-wheel", outcome: "Team can translate flavor descriptions into guest-facing language." },
      { week: 4, title: "Spirits Theory Retake", route: "app/beverage-quiz", outcome: "Team completes a spirits-focused quiz and records weak topics." }
    ]
  },
  {
    id: "certification-study",
    title: "Certification Study Hall",
    focus: "Terms, maps, timed quiz reps, and weak-topic remediation",
    defaultOwner: "Study lead",
    assignments: [
      { week: 1, title: "Credential Path Setup", route: "study-paths", outcome: "Team chooses independent WSET-style, CMS-style, Cicerone-style, BarSmarts-style, or regional focus." },
      { week: 2, title: "Terms + Source Review", route: "app/sipopedia", outcome: "Team searches and records the terms that repeat across official prep materials." },
      { week: 3, title: "Map + Region Recall", route: "app/maps", outcome: "Team links regions, grapes, and service clues from memory." },
      { week: 4, title: "Timed Quiz + Remediation", route: "app/beverage-quiz", outcome: "Team saves an attempt and assigns the top weak topic." }
    ]
  }
];

function safeJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function asAssignment(value: unknown, index: number): TeamPlannerAssignment | null {
  const record = asRecord(value);
  if (!record) return null;
  const title = typeof record.title === "string" && record.title.trim() ? record.title.trim() : `Week ${index + 1} assignment`;
  const route = typeof record.route === "string" && record.route.trim() ? record.route.trim() : "app/launch";
  const outcome = typeof record.outcome === "string" && record.outcome.trim() ? record.outcome.trim() : "Complete the assigned study action.";
  return {
    cloudId: typeof record.cloudId === "string" && record.cloudId ? record.cloudId : undefined,
    week: Math.max(1, Math.round(Number(record.week) || index + 1)),
    title,
    route,
    owner: typeof record.owner === "string" && record.owner.trim() ? record.owner.trim() : "Team lead",
    due: typeof record.due === "string" ? record.due : "",
    outcome,
    completed: record.completed === true
  };
}

function asPlan(value: unknown): TeamTrainingPlan | null {
  const record = asRecord(value);
  if (!record) return null;
  const assignments = Array.isArray(record.assignments)
    ? record.assignments.map((item, index) => asAssignment(item, index)).filter((item): item is TeamPlannerAssignment => Boolean(item))
    : [];
  if (assignments.length === 0) return null;
  return {
    id: typeof record.id === "string" && record.id ? record.id : "team-plan",
    teamName: typeof record.teamName === "string" && record.teamName.trim() ? record.teamName.trim() : "Team training group",
    managerName: typeof record.managerName === "string" && record.managerName.trim() ? record.managerName.trim() : "Team lead",
    focus: typeof record.focus === "string" && record.focus.trim() ? record.focus.trim() : "Team training sprint",
    sprintTitle: typeof record.sprintTitle === "string" && record.sprintTitle.trim() ? record.sprintTitle.trim() : "Training sprint",
    startDate: typeof record.startDate === "string" ? record.startDate : "",
    savedAt: typeof record.savedAt === "string" && record.savedAt ? record.savedAt : new Date().toISOString(),
    memberEmails: Array.isArray(record.memberEmails) ? record.memberEmails.filter((email): email is string => typeof email === "string") : [],
    cloudBacked: record.cloudBacked === true,
    assignments
  };
}

function cleanTeamDate(value: string): string | null {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;
}

export function parseTeamMemberEmails(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[\s,;]+/)
        .map((email) => email.trim().toLowerCase())
        .filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    )
  ).slice(0, 24);
}

function mapCloudTeamPlan(
  team: CloudTeamTrainingAccountRow,
  assignments: CloudTeamTrainingAssignmentRow[],
  memberships: CloudTeamTrainingMembershipRow[]
): TeamTrainingPlan {
  const memberEmails = memberships
    .filter((membership) => membership.invite_status !== "removed")
    .map((membership) => membership.member_email);
  return {
    id: team.id,
    teamName: team.team_name,
    managerName: team.manager_name,
    focus: team.focus,
    sprintTitle: team.sprint_title,
    startDate: team.start_date ?? "",
    savedAt: team.updated_at,
    memberEmails,
    cloudBacked: true,
    assignments: assignments
      .sort((a, b) => a.week - b.week)
      .map((assignment) => ({
        cloudId: assignment.id,
        week: assignment.week,
        title: assignment.title,
        route: assignment.route,
        owner: assignment.owner_name,
        due: assignment.due_date ?? "",
        outcome: assignment.outcome,
        completed: assignment.completed
      }))
  };
}

export function readTeamTrainingPlan(): TeamTrainingPlan | null {
  if (typeof window === "undefined") return null;
  return asPlan(safeJson(window.localStorage.getItem(TEAM_PLANNER_STORAGE_KEY)));
}

export function readTeamTrainingSnapshot(): TeamTrainingSnapshot {
  const plan = readTeamTrainingPlan();
  const totalAssignments = plan?.assignments.length ?? 0;
  const completedAssignments = plan?.assignments.filter((assignment) => assignment.completed).length ?? 0;
  const nextAssignment = plan?.assignments.find((assignment) => !assignment.completed) ?? plan?.assignments[0] ?? null;
  const completionRate = totalAssignments ? Math.round((completedAssignments / totalAssignments) * 100) : 0;
  return { plan, completedAssignments, totalAssignments, completionRate, nextAssignment };
}

export function saveTeamTrainingPlan(plan: TeamTrainingPlan): TeamTrainingPlan {
  if (typeof window === "undefined") return plan;
  window.localStorage.setItem(TEAM_PLANNER_STORAGE_KEY, JSON.stringify(plan));
  window.dispatchEvent(new CustomEvent(TEAM_PLANNER_EVENT, { detail: plan }));
  return plan;
}

export async function createCloudTeamTrainingPlan(input: {
  plan: TeamTrainingPlan;
  ownerUserId: string;
  ownerEmail: string;
  memberEmails: string[];
}): Promise<TeamTrainingPlan> {
  if (!supabase) throw new Error("Supabase is not configured.");
  const ownerEmail = input.ownerEmail.trim().toLowerCase();
  if (!ownerEmail) throw new Error("A signed-in manager email is required.");

  const { data: teamData, error: teamError } = await supabase
    .from("team_training_accounts")
    .insert({
      owner_user_id: input.ownerUserId,
      team_name: input.plan.teamName,
      manager_name: input.plan.managerName,
      focus: input.plan.focus,
      sprint_title: input.plan.sprintTitle,
      start_date: cleanTeamDate(input.plan.startDate),
      status: "active"
    })
    .select(CLOUD_TEAM_ACCOUNT_COLUMNS)
    .single();

  if (teamError) throw new Error(teamError.message);
  const team = teamData as CloudTeamTrainingAccountRow;
  const memberEmails = Array.from(new Set([ownerEmail, ...input.memberEmails.map((email) => email.trim().toLowerCase())].filter(Boolean)));

  if (memberEmails.length) {
    const { error: membershipError } = await supabase.from("team_training_memberships").insert(
      memberEmails.map((email) => ({
        team_id: team.id,
        user_id: email === ownerEmail ? input.ownerUserId : null,
        member_email: email,
        display_name: email === ownerEmail ? input.plan.managerName : "",
        role: email === ownerEmail ? "manager" : "member",
        invite_status: email === ownerEmail ? "active" : "invited"
      }))
    );
    if (membershipError) throw new Error(membershipError.message);
  }

  const { data: assignmentData, error: assignmentError } = await supabase
    .from("team_training_assignments")
    .insert(
      input.plan.assignments.map((assignment) => ({
        team_id: team.id,
        week: assignment.week,
        title: assignment.title,
        route: assignment.route,
        owner_name: assignment.owner,
        due_date: cleanTeamDate(assignment.due),
        outcome: assignment.outcome,
        completed: assignment.completed
      }))
    )
    .select(CLOUD_TEAM_ASSIGNMENT_COLUMNS);

  if (assignmentError) throw new Error(assignmentError.message);
  return mapCloudTeamPlan(team, (assignmentData ?? []) as CloudTeamTrainingAssignmentRow[], memberEmails.map((email) => ({
    member_email: email,
    display_name: email === ownerEmail ? input.plan.managerName : "",
    role: email === ownerEmail ? "manager" : "member",
    invite_status: email === ownerEmail ? "active" : "invited"
  })));
}

export async function listCloudTeamTrainingPlans(): Promise<TeamTrainingPlan[]> {
  if (!supabase) return [];
  const client = supabase;

  const { data: teamData, error: teamError } = await client
    .from("team_training_accounts")
    .select(CLOUD_TEAM_ACCOUNT_COLUMNS)
    .eq("status", "active")
    .order("updated_at", { ascending: false })
    .limit(10);

  if (teamError) throw new Error(teamError.message);
  const teams = (teamData ?? []) as CloudTeamTrainingAccountRow[];

  return Promise.all(
    teams.map(async (team) => {
      const [{ data: assignmentData, error: assignmentError }, { data: membershipData, error: membershipError }] = await Promise.all([
        client
          .from("team_training_assignments")
          .select(CLOUD_TEAM_ASSIGNMENT_COLUMNS)
          .eq("team_id", team.id)
          .order("week", { ascending: true }),
        client
          .from("team_training_memberships")
          .select(CLOUD_TEAM_MEMBERSHIP_COLUMNS)
          .eq("team_id", team.id)
          .neq("invite_status", "removed")
      ]);
      if (assignmentError) throw new Error(assignmentError.message);
      if (membershipError) throw new Error(membershipError.message);
      return mapCloudTeamPlan(
        team,
        (assignmentData ?? []) as CloudTeamTrainingAssignmentRow[],
        (membershipData ?? []) as CloudTeamTrainingMembershipRow[]
      );
    })
  );
}

export async function updateCloudTeamAssignmentCompletion(teamId: string, week: number, completed: boolean): Promise<TeamPlannerAssignment> {
  if (!supabase) throw new Error("Supabase is not configured.");

  const { data, error } = await supabase
    .from("team_training_assignments")
    .update({
      completed,
      completed_at: completed ? new Date().toISOString() : null
    })
    .eq("team_id", teamId)
    .eq("week", week)
    .select(CLOUD_TEAM_ASSIGNMENT_COLUMNS)
    .single();

  if (error) throw new Error(error.message);
  const assignment = data as CloudTeamTrainingAssignmentRow;
  return {
    cloudId: assignment.id,
    week: assignment.week,
    title: assignment.title,
    route: assignment.route,
    owner: assignment.owner_name,
    due: assignment.due_date ?? "",
    outcome: assignment.outcome,
    completed: assignment.completed
  };
}

export function buildTeamTrainingPlan(input: {
  templateId: string;
  teamName: string;
  managerName: string;
  startDate: string;
}): TeamTrainingPlan {
  const template = teamSprintTemplates.find((item) => item.id === input.templateId) ?? teamSprintTemplates[0];
  const teamName = input.teamName.trim() || "Team training group";
  const managerName = input.managerName.trim() || template.defaultOwner;
  return {
    id: `${template.id}-${Date.now()}`,
    teamName,
    managerName,
    focus: template.focus,
    sprintTitle: template.title,
    startDate: input.startDate,
    savedAt: new Date().toISOString(),
    assignments: template.assignments.map((assignment) => ({
      ...assignment,
      owner: managerName,
      due: input.startDate,
      completed: false
    }))
  };
}
