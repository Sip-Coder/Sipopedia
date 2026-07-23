import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { buildOnboardingRoute } from "../lib/onboardingIntent";
import {
  createCloudSupportRequest,
  isSupportRequestRateLimitError,
  listCloudSupportRequests,
  readLocalSupportRequests,
  saveLocalSupportRequest,
  writeLocalSupportRequests,
  SUPPORT_REQUEST_EVENT,
  type SupportRequestLane,
  type SupportRequestRecord,
  type SupportRequestUrgency
} from "../lib/supportRequests";
import {
  supportRequestSla,
  supportResponseTargets,
  supportSlaSummary
} from "../lib/supportSla";
import {
  buildLiveSupportRequestDraft,
  downloadLiveSupportHandoff,
  liveSupportChannelOptions,
  liveSupportReadiness,
  type LiveSupportChannel,
  type LiveSupportHandoffInput
} from "../lib/liveSupportDesk";
import {
  buildOfficeHoursSupportDraft,
  downloadOfficeHoursAgenda,
  downloadOfficeHoursCalendarHold,
  OFFICE_HOURS_BOOKING_EVENT,
  OFFICE_HOURS_BOOKING_STORAGE_KEY,
  officeHoursArtifactOptions,
  officeHoursFocusOptions,
  readOfficeHoursBookings,
  saveOfficeHoursBooking,
  type OfficeHoursBooking,
  type OfficeHoursFocus
} from "../lib/officeHours";
import {
  CATEGORY_TRAINING_ARCS_STORAGE_KEY,
  COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY,
  SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY,
  readPracticalReviewSnapshot,
  type PracticalReviewSnapshot
} from "../lib/practicalReview";
import {
  buildTeamTrainingPlan,
  createCloudTeamTrainingPlan,
  listCloudTeamTrainingPlans,
  parseTeamMemberEmails,
  readTeamTrainingPlan,
  saveTeamTrainingPlan,
  teamSprintTemplates,
  TEAM_PLANNER_EVENT,
  updateCloudTeamAssignmentCompletion,
  type TeamTrainingPlan
} from "../lib/teamPlanner";

type SupportCenterProps = {
  onNavigate: (route: string) => void;
};

type SupportLane = {
  id: SupportRequestLane;
  label: string;
  title: string;
  promise: string;
  nextStep: string;
  route: string;
  evidence: string[];
};

type TeamSprint = {
  title: string;
  audience: string;
  cadence: string;
  modules: string[];
  outcome: string;
};

const supportLanes: SupportLane[] = [
  {
    id: "enrollment",
    label: "Enrollment",
    title: "Choose a plan or recover checkout.",
    promise: "Plan selection, saved destination, account-first checkout, and canceled checkout recovery stay in one path.",
    nextStep: "Compare Plans",
    route: buildOnboardingRoute("pricing", { planId: "pro", source: "support-enrollment" }),
    evidence: ["Plan you intended to buy", "The room you were trying to open", "Whether you already created an account"]
  },
  {
    id: "billing",
    label: "Billing",
    title: "Resolve account and access questions.",
    promise: "Members can check subscription state, refresh access, and find billing controls from the dashboard.",
    nextStep: "Open Dashboard",
    route: "account",
    evidence: ["Account email", "Plan name", "Checkout session or billing status if visible"]
  },
  {
    id: "study",
    label: "Study Help",
    title: "Turn weak topics into the next study action.",
    promise: "Use Beverage Quiz remediation, Sipopedia search, Academy lessons, maps, and resources to rebuild the exact topic that failed.",
    nextStep: "Open Study Paths",
    route: "study-paths",
    evidence: ["Quiz mode", "Weak topic", "Missed question or term"]
  },
  {
    id: "team",
    label: "Teams",
    title: "Plan a staff-training sprint.",
    promise: "Managers can start from the Founding Cohort path, then map modules to service goals, pre-shift reps, and weekly accountability.",
    nextStep: "Start Team Intake",
    route: buildOnboardingRoute("checkout", { planId: "founding", source: "support-team-training" }),
    evidence: ["Team size", "Training window", "Business goal", "Wine, beer, spirits, or bar focus"]
  }
];

const urgencyOptions: Array<{ value: SupportRequestUrgency; label: string }> = [
  { value: "normal", label: "Normal" },
  { value: "soon", label: "This week" },
  { value: "urgent", label: "Urgent access" }
];

const teamSprints: TeamSprint[] = [
  {
    title: "Service Floor Readiness",
    audience: "Restaurants, tasting rooms, and floor teams",
    cadence: "4 weekly modules",
    modules: ["Guest language", "Pairing logic", "Classic styles", "Table-side confidence"],
    outcome: "A tighter service script and shared vocabulary for common guest questions."
  },
  {
    title: "Beer + Draught Fundamentals",
    audience: "Taproom, bar, and beverage teams",
    cadence: "3 weekly drills",
    modules: ["Style families", "Draught handling", "Off-flavors", "Service standards"],
    outcome: "Cleaner beer conversations, faster issue spotting, and more consistent pours."
  },
  {
    title: "Spirits + Cocktail Shift Prep",
    audience: "Bartenders and menu teams",
    cadence: "4 pre-shift cycles",
    modules: ["Base spirits", "Classic specs", "Modifier logic", "Menu language"],
    outcome: "Better build recall and stronger explanations for guests choosing cocktails."
  },
  {
    title: "Certification Study Hall",
    audience: "WSET, CMS, Cicerone, and self-study cohorts",
    cadence: "6 week loop",
    modules: ["Terms", "Maps", "Timed quiz reps", "Weak-topic review"],
    outcome: "A repeatable study cadence that separates recall, application, and remediation."
  }
];

const faqGroups = [
  {
    title: "Access",
    items: [
      {
        question: "Why did a room ask me to upgrade?",
        answer:
          "The Launch Pad is public. Deeper Learn, Taste, and Connect modules require a paid account unless the page is intentionally published as a public preview."
      },
      {
        question: "Will checkout return me to the room I wanted?",
        answer:
          "Pricing, checkout, and paywall links preserve the destination route so enrollment can return you to the room that triggered the upgrade prompt."
      }
    ]
  },
  {
    title: "Learning",
    items: [
      {
        question: "Where should a new learner start?",
        answer:
          "Start in the Launch Pad, then use the pathfinder on the lobby page to choose new learner, certification prep, beer, spirits, bartender, working pro, or team lead."
      },
      {
        question: "How do I fix weak quiz topics?",
        answer:
          "Save a Beverage Quiz attempt after revealing answers. The quiz and dashboard will surface weak topics, retake buttons, missed-question review, and linked study routes."
      }
    ]
  },
  {
    title: "Teams",
    items: [
      {
        question: "Can this support staff training?",
        answer:
          "Yes. The team path is built around short sprints, shared module assignments, service outcomes, and manager-friendly review signals."
      },
      {
        question: "Is this officially affiliated with credential bodies?",
        answer:
          "No. Sip Studies can support independent study for beverage credentials, but it should not be presented as an official WSET, CMS, Cicerone, or other credential-provider program unless a formal relationship exists."
      }
    ]
  },
  {
    title: "Privacy",
    items: [
      {
        question: "Where are account and policy controls?",
        answer:
          "Use the Account Dashboard for profile and billing state. Terms, Privacy, and Refund pages are linked from the public policy routes."
      },
      {
        question: "What should I include when asking for help?",
        answer:
          "Include the account email, the route you were trying to open, your plan, the quiz mode or weak topic if it is a learning issue, and any checkout session shown on the success page."
      }
    ]
  }
];

export function SupportCenter({ onNavigate }: SupportCenterProps) {
  const { user, loading: authLoading, isConfigured: isAuthConfigured } = useAuth();
  const [activeLaneId, setActiveLaneId] = useState(supportLanes[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState(teamSprintTemplates[0].id);
  const [teamName, setTeamName] = useState("Service team");
  const [managerName, setManagerName] = useState("Training lead");
  const [startDate, setStartDate] = useState("");
  const [teamMemberEmails, setTeamMemberEmails] = useState("");
  const [teamPlan, setTeamPlan] = useState<TeamTrainingPlan | null>(() => readTeamTrainingPlan());
  const [cloudTeamPlans, setCloudTeamPlans] = useState<TeamTrainingPlan[]>([]);
  const [teamCloudStatus, setTeamCloudStatus] = useState("");
  const [teamPlanSaving, setTeamPlanSaving] = useState(false);
  const [supportRequests, setSupportRequests] = useState<SupportRequestRecord[]>(() => readLocalSupportRequests());
  const [requestNotice, setRequestNotice] = useState("");
  const [requestSaving, setRequestSaving] = useState(false);
  const [requestCloudStatus, setRequestCloudStatus] = useState("");
  const [requestContactName, setRequestContactName] = useState("");
  const [requestContactEmail, setRequestContactEmail] = useState(user?.email ?? "");
  const [requestTeamName, setRequestTeamName] = useState("");
  const [requestTeamSize, setRequestTeamSize] = useState("");
  const [requestPlanInterest, setRequestPlanInterest] = useState("Pro");
  const [requestUrgency, setRequestUrgency] = useState<SupportRequestUrgency>("normal");
  const [requestSubject, setRequestSubject] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestWebsite, setRequestWebsite] = useState("");
  const [liveSupportChannel, setLiveSupportChannel] = useState<LiveSupportChannel>("chat");
  const [liveSupportPhone, setLiveSupportPhone] = useState("");
  const [liveSupportAvailability, setLiveSupportAvailability] = useState("");
  const [liveSupportUrgency, setLiveSupportUrgency] = useState<SupportRequestUrgency>("soon");
  const [liveSupportIssue, setLiveSupportIssue] = useState("");
  const [liveSupportTranscript, setLiveSupportTranscript] = useState("");
  const [liveSupportNotice, setLiveSupportNotice] = useState("");
  const [liveSupportSaving, setLiveSupportSaving] = useState(false);
  const [officeHoursFocus, setOfficeHoursFocus] = useState<OfficeHoursFocus>("practical-review");
  const [officeHoursDate, setOfficeHoursDate] = useState("");
  const [officeHoursTime, setOfficeHoursTime] = useState("10:00");
  const [officeHoursTimezone, setOfficeHoursTimezone] = useState(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Local time";
    } catch {
      return "Local time";
    }
  });
  const [officeHoursUrgency, setOfficeHoursUrgency] = useState<SupportRequestUrgency>("soon");
  const [officeHoursGoals, setOfficeHoursGoals] = useState("");
  const [officeHoursArtifacts, setOfficeHoursArtifacts] = useState<string[]>(["Practical review packet"]);
  const [officeHoursBookings, setOfficeHoursBookings] = useState<OfficeHoursBooking[]>(() => readOfficeHoursBookings());
  const [officeHoursNotice, setOfficeHoursNotice] = useState("");
  const [officeHoursSaving, setOfficeHoursSaving] = useState(false);
  const [practicalReviewSnapshot, setPracticalReviewSnapshot] = useState<PracticalReviewSnapshot>(() => readPracticalReviewSnapshot());
  const activeLane = useMemo(() => supportLanes.find((lane) => lane.id === activeLaneId) ?? supportLanes[0], [activeLaneId]);
  const requestSlaSummary = useMemo(() => supportSlaSummary(supportRequests), [supportRequests]);
  const activeResponseTarget = supportResponseTargets[requestUrgency];
  const liveSupportResponseTarget = supportResponseTargets[liveSupportUrgency];
  const selectedTemplate = useMemo(() => teamSprintTemplates.find((template) => template.id === selectedTemplateId) ?? teamSprintTemplates[0], [selectedTemplateId]);
  const selectedOfficeFocus = useMemo(
    () => officeHoursFocusOptions.find((focus) => focus.id === officeHoursFocus) ?? officeHoursFocusOptions[0],
    [officeHoursFocus]
  );
  const officeHoursSignals = useMemo(
    () =>
      [
        "Current Sip Studies support signals",
        `- Practical artifacts ready: ${practicalReviewSnapshot.readyCount}`,
        `- Practical average: ${practicalReviewSnapshot.averagePercent}%`,
        `- Needs coaching: ${practicalReviewSnapshot.needsCoachingCount}`,
        `- Latest artifact: ${practicalReviewSnapshot.latestItem?.title ?? "none yet"}`
      ].join("\n"),
    [practicalReviewSnapshot]
  );
  const liveSupportHandoff = useMemo<LiveSupportHandoffInput>(() => {
    const teamSize = requestTeamSize.trim() ? Number.parseInt(requestTeamSize, 10) : null;
    return {
      channel: liveSupportChannel,
      laneId: activeLane.id,
      laneLabel: activeLane.label,
      contactName: requestContactName.trim(),
      contactEmail: requestContactEmail.trim(),
      phone: liveSupportPhone.trim(),
      availability: liveSupportAvailability.trim(),
      urgency: liveSupportUrgency,
      issueSummary: liveSupportIssue.trim(),
      transcript: liveSupportTranscript.trim(),
      teamName: requestTeamName.trim(),
      teamSize: Number.isFinite(teamSize) && teamSize !== null ? teamSize : null,
      planInterest: requestPlanInterest.trim(),
      sourceRoute: typeof window === "undefined" ? "support#live-handoff" : window.location.hash || "support#live-handoff",
      responseTarget: liveSupportResponseTarget
    };
  }, [
    activeLane.id,
    activeLane.label,
    liveSupportAvailability,
    liveSupportChannel,
    liveSupportIssue,
    liveSupportPhone,
    liveSupportResponseTarget,
    liveSupportTranscript,
    liveSupportUrgency,
    requestContactEmail,
    requestContactName,
    requestPlanInterest,
    requestTeamName,
    requestTeamSize
  ]);
  const liveSupportReady = useMemo(() => liveSupportReadiness(liveSupportHandoff), [liveSupportHandoff]);

  useEffect(() => {
    const refreshPlan = () => setTeamPlan(readTeamTrainingPlan());
    window.addEventListener(TEAM_PLANNER_EVENT, refreshPlan);
    window.addEventListener("storage", refreshPlan);
    return () => {
      window.removeEventListener(TEAM_PLANNER_EVENT, refreshPlan);
      window.removeEventListener("storage", refreshPlan);
    };
  }, []);

  useEffect(() => {
    if (user?.email && !requestContactEmail) setRequestContactEmail(user.email);
  }, [requestContactEmail, user?.email]);

  useEffect(() => {
    if (authLoading) {
      setTeamCloudStatus("Checking team plan sync...");
      return;
    }
    if (!isAuthConfigured) {
      setTeamCloudStatus("Local team-plan mode. Configure Supabase for manager/member assignment sync.");
      return;
    }
    if (!user) {
      setTeamCloudStatus("Sign in to save team plans across manager and member accounts.");
      return;
    }

    let cancelled = false;
    setTeamCloudStatus("Loading cloud team plans...");
    listCloudTeamTrainingPlans()
      .then((plans) => {
        if (cancelled) return;
        setCloudTeamPlans(plans);
        if (plans[0]) {
          setTeamPlan(saveTeamTrainingPlan(plans[0]));
          setTeamName(plans[0].teamName);
          setManagerName(plans[0].managerName);
          setStartDate(plans[0].startDate);
          setTeamMemberEmails((plans[0].memberEmails ?? []).filter((email) => email !== user.email).join(", "));
        }
        setTeamCloudStatus(plans.length ? `${plans.length} cloud team plan${plans.length === 1 ? "" : "s"} loaded.` : "Cloud team planner is ready.");
      })
      .catch((error: unknown) => {
        if (!cancelled) setTeamCloudStatus(`Team plan sync paused: ${error instanceof Error ? error.message : "Unknown error"}`);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, user?.email, user?.id]);

  useEffect(() => {
    const refreshRequests = () => setSupportRequests(readLocalSupportRequests());
    window.addEventListener(SUPPORT_REQUEST_EVENT, refreshRequests);
    window.addEventListener("storage", refreshRequests);
    return () => {
      window.removeEventListener(SUPPORT_REQUEST_EVENT, refreshRequests);
      window.removeEventListener("storage", refreshRequests);
    };
  }, []);

  useEffect(() => {
    const refreshOfficeHours = () => {
      setOfficeHoursBookings(readOfficeHoursBookings());
      setPracticalReviewSnapshot(readPracticalReviewSnapshot());
    };
    const onStorage = (event: StorageEvent) => {
      const trackedKeys = [
        OFFICE_HOURS_BOOKING_STORAGE_KEY,
        SERVICE_ROLEPLAY_ATTEMPTS_STORAGE_KEY,
        COCKTAIL_TECHNIQUE_ATTEMPTS_STORAGE_KEY,
        CATEGORY_TRAINING_ARCS_STORAGE_KEY
      ];
      if (event.key && !trackedKeys.includes(event.key)) return;
      refreshOfficeHours();
    };
    window.addEventListener(OFFICE_HOURS_BOOKING_EVENT, refreshOfficeHours);
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refreshOfficeHours);
    return () => {
      window.removeEventListener(OFFICE_HOURS_BOOKING_EVENT, refreshOfficeHours);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refreshOfficeHours);
    };
  }, []);

  useEffect(() => {
    if (authLoading) {
      setRequestCloudStatus("Checking support request sync...");
      return;
    }
    if (!isAuthConfigured) {
      setRequestCloudStatus("Local request mode. Supabase configuration is required for persisted support tickets.");
      return;
    }
    if (!user) {
      setRequestCloudStatus("Public intake enabled. Sign in to track request history on this account.");
      return;
    }

    let cancelled = false;
    setRequestCloudStatus("Syncing account support requests...");
    listCloudSupportRequests()
      .then((cloudRequests) => {
        if (cancelled) return;
        const localOnly = readLocalSupportRequests().filter((request) => !request.cloudBacked);
        const nextRequests = writeLocalSupportRequests([...cloudRequests, ...localOnly].slice(0, 20));
        setSupportRequests(nextRequests);
        setRequestCloudStatus(
          cloudRequests.length
            ? `${cloudRequests.length} account support request${cloudRequests.length === 1 ? "" : "s"} synced.`
            : "Cloud support request history is ready."
        );
      })
      .catch((error: unknown) => {
        if (!cancelled) setRequestCloudStatus(`Support request sync paused: ${error instanceof Error ? error.message : "Unknown error"}`);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, isAuthConfigured, user?.id]);

  const savePlanner = async () => {
    if (teamPlanSaving) return;
    const plan = buildTeamTrainingPlan({
      templateId: selectedTemplateId,
      teamName,
      managerName,
      startDate
    });
    const localPlan = saveTeamTrainingPlan({
      ...plan,
      memberEmails: parseTeamMemberEmails(teamMemberEmails)
    });
    setTeamPlan(localPlan);

    if (!isAuthConfigured || !user) {
      setTeamCloudStatus("Team plan saved locally. Sign in with Supabase configured for cross-account assignments.");
      return;
    }

    setTeamPlanSaving(true);
    setTeamCloudStatus("Saving team plan to cloud...");
    try {
      const cloudPlan = await createCloudTeamTrainingPlan({
        plan: localPlan,
        ownerUserId: user.id,
        ownerEmail: user.email ?? "",
        memberEmails: parseTeamMemberEmails(teamMemberEmails)
      });
      setTeamPlan(saveTeamTrainingPlan(cloudPlan));
      setCloudTeamPlans((plans) => [cloudPlan, ...plans.filter((item) => item.id !== cloudPlan.id)].slice(0, 10));
      setTeamCloudStatus(`Cloud team plan saved for ${cloudPlan.teamName}.`);
    } catch (error: unknown) {
      setTeamCloudStatus(`Cloud save failed; local plan kept: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setTeamPlanSaving(false);
    }
  };

  const toggleAssignment = (week: number) => {
    if (!teamPlan) return;
    const currentAssignment = teamPlan.assignments.find((assignment) => assignment.week === week);
    const nextCompleted = !currentAssignment?.completed;
    const updated = {
      ...teamPlan,
      savedAt: new Date().toISOString(),
      assignments: teamPlan.assignments.map((assignment) =>
        assignment.week === week ? { ...assignment, completed: nextCompleted } : assignment
      )
    };
    setTeamPlan(saveTeamTrainingPlan(updated));

    if (teamPlan.cloudBacked && isAuthConfigured && user) {
      setTeamCloudStatus("Updating cloud assignment...");
      void updateCloudTeamAssignmentCompletion(teamPlan.id, week, nextCompleted)
        .then((cloudAssignment) => {
          const cloudUpdated = {
            ...updated,
            assignments: updated.assignments.map((assignment) => (assignment.week === week ? cloudAssignment : assignment))
          };
          setTeamPlan(saveTeamTrainingPlan(cloudUpdated));
          setTeamCloudStatus(`Week ${week} updated in cloud.`);
        })
        .catch((error: unknown) => {
          setTeamCloudStatus(`Cloud assignment update failed; local toggle kept: ${error instanceof Error ? error.message : "Unknown error"}`);
        });
    }
  };

  const submitSupportRequest = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (requestSaving) return;
    if (requestWebsite.trim()) {
      setRequestNotice("Support request validation failed.");
      return;
    }

    const contactEmail = requestContactEmail.trim();
    const subject = requestSubject.trim();
    const message = requestMessage.trim();
    const teamSize = requestTeamSize.trim() ? Number.parseInt(requestTeamSize, 10) : null;

    if (!contactEmail || !subject || !message) {
      setRequestNotice("Add contact email, subject, and the issue details before submitting.");
      return;
    }
    if (!contactEmail.includes("@")) {
      setRequestNotice("Use a valid contact email so support can respond.");
      return;
    }
    if (requestTeamSize.trim() && (!Number.isFinite(teamSize) || teamSize === null || teamSize < 1)) {
      setRequestNotice("Team size must be a whole number greater than zero.");
      return;
    }

    const draft = {
      laneId: activeLane.id,
      contactName: requestContactName.trim(),
      contactEmail,
      teamName: requestTeamName.trim(),
      teamSize: Number.isFinite(teamSize) && teamSize !== null ? teamSize : null,
      planInterest: requestPlanInterest.trim(),
      urgency: requestUrgency,
      subject,
      message,
      sourceRoute: typeof window === "undefined" ? "support" : window.location.hash || "support"
    };

    const clearForm = () => {
      setRequestSubject("");
      setRequestMessage("");
      if (activeLane.id !== "team") {
        setRequestTeamName("");
        setRequestTeamSize("");
      }
    };

    if (isAuthConfigured) {
      setRequestSaving(true);
      setRequestNotice("Saving support request...");
      void createCloudSupportRequest(draft, user?.id ?? null)
        .then((record) => {
          const nextRequests = writeLocalSupportRequests([record, ...readLocalSupportRequests().filter((request) => request.id !== record.id)].slice(0, 20));
          setSupportRequests(nextRequests);
          setRequestNotice(`Request ${record.id.slice(0, 8)} saved. Use this code if you follow up.`);
          setRequestCloudStatus(user ? "Cloud support request saved to this account." : "Public support request saved.");
          clearForm();
        })
        .catch((error: unknown) => {
          if (isSupportRequestRateLimitError(error)) {
            setRequestNotice(error instanceof Error ? error.message : "Too many support requests. Try again later.");
            setRequestCloudStatus("Support request rate limit is active.");
            return;
          }
          const localRecord = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
          setSupportRequests(readLocalSupportRequests());
          setRequestNotice(`Cloud save failed, so request ${localRecord.id.slice(0, 8)} is saved locally.`);
          setRequestCloudStatus("Support request sync paused.");
          clearForm();
        })
        .finally(() => setRequestSaving(false));
      return;
    }

    const record = saveLocalSupportRequest(draft);
    setSupportRequests(readLocalSupportRequests());
    setRequestNotice(`Request ${record.id.slice(0, 8)} saved locally. Configure Supabase to persist support tickets.`);
    clearForm();
  };

  const handleDownloadLiveSupportHandoff = () => {
    if (liveSupportReady.score < 60) {
      setLiveSupportNotice(liveSupportReady.summary);
      return;
    }
    downloadLiveSupportHandoff(liveSupportHandoff);
    setLiveSupportNotice("Live support handoff downloaded.");
  };

  const submitLiveSupportRequest = async () => {
    if (liveSupportSaving) return;
    const readiness = liveSupportReadiness(liveSupportHandoff);
    if (readiness.missing.length) {
      setLiveSupportNotice(readiness.summary);
      return;
    }

    const draft = buildLiveSupportRequestDraft(liveSupportHandoff);
    if (isAuthConfigured) {
      setLiveSupportSaving(true);
      setLiveSupportNotice("Saving live support handoff...");
      try {
        const record = await createCloudSupportRequest(draft, user?.id ?? null);
        const nextRequests = writeLocalSupportRequests([record, ...readLocalSupportRequests().filter((request) => request.id !== record.id)].slice(0, 20));
        setSupportRequests(nextRequests);
        setRequestCloudStatus(user ? "Cloud live support handoff saved to this account." : "Public live support handoff saved.");
        setLiveSupportNotice(`Live handoff ${record.id.slice(0, 8)} saved.`);
      } catch (error: unknown) {
        if (isSupportRequestRateLimitError(error)) {
          setLiveSupportNotice(error instanceof Error ? error.message : "Too many support requests. Try again later.");
          setRequestCloudStatus("Support request rate limit is active.");
        } else {
          const localRecord = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
          setSupportRequests(readLocalSupportRequests());
          setLiveSupportNotice(`Cloud save failed, so live handoff ${localRecord.id.slice(0, 8)} is saved locally.`);
          setRequestCloudStatus("Support request sync paused.");
        }
      } finally {
        setLiveSupportSaving(false);
      }
      return;
    }

    const record = saveLocalSupportRequest(draft);
    setSupportRequests(readLocalSupportRequests());
    setLiveSupportNotice(`Live handoff ${record.id.slice(0, 8)} saved locally.`);
  };

  const toggleOfficeHoursArtifact = (artifact: string) => {
    setOfficeHoursArtifacts((current) =>
      current.includes(artifact) ? current.filter((item) => item !== artifact) : [...current, artifact]
    );
  };

  const saveOfficeHoursPlan = (): OfficeHoursBooking | null => {
    const contactEmail = requestContactEmail.trim();
    const goals = officeHoursGoals.trim();

    if (!contactEmail || !contactEmail.includes("@")) {
      setOfficeHoursNotice("Add a valid contact email before saving office hours.");
      return null;
    }
    if (!officeHoursDate || !officeHoursTime) {
      setOfficeHoursNotice("Choose a preferred date and time for the office-hours hold.");
      return null;
    }
    if (!goals) {
      setOfficeHoursNotice("Add the review goal or decision you want covered.");
      return null;
    }

    const booking = saveOfficeHoursBooking({
      focus: officeHoursFocus,
      contactName: requestContactName.trim(),
      contactEmail,
      preferredDate: officeHoursDate,
      preferredTime: officeHoursTime,
      timezone: officeHoursTimezone.trim() || "Local time",
      urgency: officeHoursUrgency,
      goals,
      artifacts: officeHoursArtifacts
    });
    setOfficeHoursBookings(readOfficeHoursBookings());
    setOfficeHoursNotice(`Office-hours agenda ${booking.id.slice(0, 8)} saved.`);
    return booking;
  };

  const handleDownloadOfficeHoursAgenda = () => {
    const booking = saveOfficeHoursPlan();
    if (!booking) return;
    downloadOfficeHoursAgenda(booking, officeHoursSignals);
    setOfficeHoursNotice(`Agenda downloaded for ${selectedOfficeFocus.label}.`);
  };

  const handleDownloadOfficeHoursCalendar = () => {
    const booking = saveOfficeHoursPlan();
    if (!booking) return;
    downloadOfficeHoursCalendarHold(booking);
    setOfficeHoursNotice(`Calendar hold downloaded for ${selectedOfficeFocus.label}.`);
  };

  const submitOfficeHoursRequest = async () => {
    if (officeHoursSaving) return;
    const booking = saveOfficeHoursPlan();
    if (!booking) return;
    const draft = buildOfficeHoursSupportDraft(booking, officeHoursSignals);

    if (isAuthConfigured) {
      setOfficeHoursSaving(true);
      setOfficeHoursNotice("Saving office-hours support request...");
      try {
        const record = await createCloudSupportRequest(draft, user?.id ?? null);
        const nextRequests = writeLocalSupportRequests([record, ...readLocalSupportRequests().filter((request) => request.id !== record.id)].slice(0, 20));
        setSupportRequests(nextRequests);
        setRequestCloudStatus(user ? "Cloud office-hours request saved to this account." : "Public office-hours request saved.");
        setOfficeHoursNotice(`Office-hours request ${record.id.slice(0, 8)} saved.`);
      } catch (error: unknown) {
        if (isSupportRequestRateLimitError(error)) {
          setOfficeHoursNotice(error instanceof Error ? error.message : "Too many support requests. Try again later.");
          setRequestCloudStatus("Support request rate limit is active.");
        } else {
          const localRecord = saveLocalSupportRequest(draft, `Cloud save failed: ${error instanceof Error ? error.message : "Unknown error"}`);
          setSupportRequests(readLocalSupportRequests());
          setOfficeHoursNotice(`Cloud save failed, so office-hours request ${localRecord.id.slice(0, 8)} is saved locally.`);
          setRequestCloudStatus("Support request sync paused.");
        }
      } finally {
        setOfficeHoursSaving(false);
      }
      return;
    }

    const record = saveLocalSupportRequest(draft);
    setSupportRequests(readLocalSupportRequests());
    setOfficeHoursNotice(`Office-hours request ${record.id.slice(0, 8)} saved locally.`);
  };

  return (
    <section className="support-center-page">
      <header className="section-header support-hero">
        <p className="checkout-eyebrow">Support + Team Training</p>
        <h1>Find the fastest path for access, study help, billing, and staff training.</h1>
        <p>
          A public operating desk for learners and managers: route the issue, gather the right details, and move into the workspace without guessing where support lives.
        </p>
      </header>

      <div className="support-console-grid">
        <article className="support-route-card">
          <div className="support-route-tabs" role="tablist" aria-label="Support routing">
            {supportLanes.map((lane) => (
              <button
                key={lane.id}
                type="button"
                role="tab"
                aria-selected={activeLane.id === lane.id}
                className={activeLane.id === lane.id ? "active" : ""}
                onClick={() => setActiveLaneId(lane.id)}
              >
                {lane.label}
              </button>
            ))}
          </div>
          <div className="support-route-detail">
            <p className="nav-overline">{activeLane.label}</p>
            <h3>{activeLane.title}</h3>
            <p>{activeLane.promise}</p>
            <div className="support-evidence-list" aria-label="Useful information to prepare">
              {activeLane.evidence.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={() => onNavigate(activeLane.route)}>
              {activeLane.nextStep}
            </button>
          </div>
        </article>

        <article className="support-status-card">
          <p className="nav-overline">Support Map</p>
          <h3>What exists now</h3>
          <ul>
            <li>Account dashboard for profile, progress, membership, and billing state.</li>
            <li>Checkout recovery routes for success, cancellation, and assisted enrollment.</li>
            <li>Independent credential study paths with official source links and non-affiliation notes.</li>
            <li>Beverage Quiz remediation with saved attempts and weak-topic study links.</li>
            <li>Founding Cohort path for guided team or serious-learner onboarding.</li>
          </ul>
        </article>

        <article className="support-sla-card">
          <p className="nav-overline">Response Targets</p>
          <h3>Make help feel staffed before the first reply.</h3>
          <div className="support-sla-targets" aria-label="Support response targets">
            {urgencyOptions.map((option) => (
              <span key={option.value}>
                <strong>{option.label}</strong>
                {supportResponseTargets[option.value]}
              </span>
            ))}
          </div>
          <div className="support-sla-summary" aria-label="Current support SLA summary">
            <span>
              <strong>{requestSlaSummary.openCount}</strong>
              Open
            </span>
            <span>
              <strong>{requestSlaSummary.dueSoonCount}</strong>
              Due soon
            </span>
            <span>
              <strong>{requestSlaSummary.overdueCount}</strong>
              Overdue
            </span>
          </div>
          <p className="support-sla-next">Next due: {requestSlaSummary.nextDueLabel}</p>
        </article>
      </div>

      <section className="support-live-handoff-section" id="live-handoff" aria-labelledby="support-live-handoff-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Live Handoff Desk</p>
          <h3 id="support-live-handoff-title">Package chat or callback context before the staffed reply.</h3>
          <p>
            Build a transcript, capture callback details, and save the handoff into the same support queue so urgent access, study, billing, and team issues do not start from a blank form.
          </p>
        </div>

        <div className="support-live-handoff-grid">
          <article className="support-live-builder">
            <div className="support-live-channel-row" role="tablist" aria-label="Live support channel">
              {liveSupportChannelOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={liveSupportChannel === option.value}
                  className={liveSupportChannel === option.value ? "active" : ""}
                  onClick={() => setLiveSupportChannel(option.value)}
                >
                  <span>{option.label}</span>
                  <strong>{option.detail}</strong>
                </button>
              ))}
            </div>

            <div className="support-live-fields">
              <label>
                Urgency
                <select value={liveSupportUrgency} onChange={(event) => setLiveSupportUrgency(event.target.value as SupportRequestUrgency)}>
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Callback phone
                <input value={liveSupportPhone} onChange={(event) => setLiveSupportPhone(event.target.value)} placeholder="Optional unless callback is selected" />
              </label>
              <label className="support-live-field-wide">
                Availability
                <input value={liveSupportAvailability} onChange={(event) => setLiveSupportAvailability(event.target.value)} placeholder="e.g., today 2-5 PM Pacific" />
              </label>
              <label className="support-live-field-wide">
                Issue summary
                <textarea
                  value={liveSupportIssue}
                  onChange={(event) => setLiveSupportIssue(event.target.value)}
                  rows={3}
                  placeholder="What should the first support reply solve?"
                />
              </label>
              <label className="support-live-field-wide">
                Chat notes or transcript
                <textarea
                  value={liveSupportTranscript}
                  onChange={(event) => setLiveSupportTranscript(event.target.value)}
                  rows={5}
                  placeholder="Paste the conversation, access error, learner goal, billing context, or manager request here."
                />
              </label>
            </div>

            <div className="support-live-actions">
              <button type="button" className="btn btn-primary" onClick={() => void submitLiveSupportRequest()} disabled={liveSupportSaving}>
                {liveSupportSaving ? "Saving Handoff" : "Save Live Handoff"}
              </button>
              <button type="button" className="btn btn-light" onClick={handleDownloadLiveSupportHandoff}>
                Download Handoff
              </button>
              {liveSupportNotice ? <span>{liveSupportNotice}</span> : null}
            </div>
          </article>

          <aside className="support-live-panel" aria-label="Live support readiness">
            <div className="support-live-score">
              <p className="nav-overline">Readiness</p>
              <strong>{liveSupportReady.score}%</strong>
              <span>{liveSupportReady.summary}</span>
            </div>
            <div className="support-live-handoff-preview">
              <h4>{activeLane.label} / {liveSupportChannel}</h4>
              <p>{liveSupportIssue || "Add the issue summary to create a first-reply brief."}</p>
              <small>Target: {liveSupportResponseTarget}</small>
            </div>
            <ul>
              <li>Creates a support request, not a promise of staffed instant chat.</li>
              <li>Callback details travel with the transcript and support lane.</li>
              <li>Downloadable handoff can be pasted into email, chat, CRM, or phone notes.</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="support-request-section" aria-labelledby="support-request-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Support Intake</p>
          <h3 id="support-request-title">Capture the request and keep the follow-up code.</h3>
          <p>Requests use the selected lane above, save to Supabase when configured, and keep a local copy for anonymous or interrupted sessions.</p>
        </div>

        <div className="support-request-grid">
          <form className="support-request-form" onSubmit={submitSupportRequest}>
            <div className="support-request-lane-summary">
              <span>{activeLane.label}</span>
              <strong>{activeLane.title}</strong>
              <p>{activeLane.evidence.join(" · ")}</p>
              <small>Response target: {activeResponseTarget}</small>
            </div>

            <label>
              Contact name
              <input value={requestContactName} onChange={(event) => setRequestContactName(event.target.value)} autoComplete="name" />
            </label>
            <label>
              Contact email
              <input
                type="email"
                value={requestContactEmail}
                onChange={(event) => setRequestContactEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </label>
            <label>
              Team or organization
              <input value={requestTeamName} onChange={(event) => setRequestTeamName(event.target.value)} autoComplete="organization" />
            </label>
            <label>
              Team size
              <input
                type="number"
                min="1"
                inputMode="numeric"
                value={requestTeamSize}
                onChange={(event) => setRequestTeamSize(event.target.value)}
              />
            </label>
            <label>
              Plan interest
              <select value={requestPlanInterest} onChange={(event) => setRequestPlanInterest(event.target.value)}>
                <option>Free</option>
                <option>Pro</option>
                <option>Founding Cohort</option>
                <option>Team training</option>
                <option>Not sure</option>
              </select>
            </label>
            <label>
              Urgency
              <select value={requestUrgency} onChange={(event) => setRequestUrgency(event.target.value as SupportRequestUrgency)}>
                {urgencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="support-request-field-wide">
              Subject
              <input value={requestSubject} onChange={(event) => setRequestSubject(event.target.value)} required minLength={4} maxLength={160} />
            </label>
            <label className="support-request-field-wide">
              Details
              <textarea
                value={requestMessage}
                onChange={(event) => setRequestMessage(event.target.value)}
                required
                minLength={12}
                maxLength={2000}
                rows={5}
              />
            </label>
            <label className="support-request-honeypot" aria-hidden="true">
              Website
              <input tabIndex={-1} autoComplete="off" value={requestWebsite} onChange={(event) => setRequestWebsite(event.target.value)} />
            </label>

            <div className="support-request-actions">
              <button type="submit" className="btn btn-primary" disabled={requestSaving}>
                {requestSaving ? "Saving Request" : "Submit Request"}
              </button>
              {requestNotice ? <span>{requestNotice}</span> : null}
            </div>
          </form>

          <aside className="support-request-history" aria-label="Recent support requests">
            <p className="nav-overline">Request History</p>
            <h4>Recent follow-up codes</h4>
            <p className="support-request-status">{requestCloudStatus}</p>
            {supportRequests.length ? (
              <div className="support-request-list">
                {supportRequests.slice(0, 4).map((request) => {
                  const sla = supportRequestSla(request);
                  return (
                    <article key={request.id} className={`sla-${sla.tone}`}>
                      <div>
                        <span>{request.id.slice(0, 8)}</span>
                        <strong>{request.cloudBacked ? "Cloud" : "Local"}</strong>
                      </div>
                      <h5>{request.subject}</h5>
                      <p>
                        {(supportLanes.find((lane) => lane.id === request.laneId)?.label ?? "General")} · {request.status.replace("_", " ")} ·{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      <small>{sla.dueLabel} · {sla.targetLabel}</small>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="support-request-empty">
                <strong>No requests yet.</strong>
                <p>Submitted requests will appear here with a short follow-up code.</p>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="support-office-hours-section" id="office-hours" aria-labelledby="support-office-hours-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Office Hours Desk</p>
          <h3 id="support-office-hours-title">Package the review before asking for help</h3>
          <p>
            Build a review agenda, hold a calendar time, and submit a support-ready request from the same evidence used by the dashboard review queue.
          </p>
        </div>

        <div className="support-office-hours-grid">
          <article className="support-office-hours-builder">
            <div className="support-office-hours-focus" role="tablist" aria-label="Office hours focus">
              {officeHoursFocusOptions.map((focus) => (
                <button
                  key={focus.id}
                  type="button"
                  role="tab"
                  aria-selected={officeHoursFocus === focus.id}
                  className={officeHoursFocus === focus.id ? "active" : ""}
                  onClick={() => setOfficeHoursFocus(focus.id)}
                >
                  <span>{focus.label}</span>
                  <strong>{focus.outcome}</strong>
                </button>
              ))}
            </div>

            <div className="support-office-hours-fields">
              <label>
                Preferred date
                <input type="date" value={officeHoursDate} onChange={(event) => setOfficeHoursDate(event.target.value)} />
              </label>
              <label>
                Preferred time
                <input type="time" value={officeHoursTime} onChange={(event) => setOfficeHoursTime(event.target.value)} />
              </label>
              <label>
                Timezone
                <input value={officeHoursTimezone} onChange={(event) => setOfficeHoursTimezone(event.target.value)} />
              </label>
              <label>
                Response target
                <select value={officeHoursUrgency} onChange={(event) => setOfficeHoursUrgency(event.target.value as SupportRequestUrgency)}>
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {supportResponseTargets[option.value]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="support-office-hours-artifacts">
              <legend>Evidence to include</legend>
              <div>
                {officeHoursArtifactOptions.map((artifact) => (
                  <label key={artifact}>
                    <input
                      type="checkbox"
                      checked={officeHoursArtifacts.includes(artifact)}
                      onChange={() => toggleOfficeHoursArtifact(artifact)}
                    />
                    <span>{artifact}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="support-office-hours-goals">
              Review goal
              <textarea
                value={officeHoursGoals}
                onChange={(event) => setOfficeHoursGoals(event.target.value)}
                rows={4}
                maxLength={1400}
                placeholder="Example: review my latest service roleplay, identify the one habit blocking floor readiness, and assign the next drill."
              />
            </label>

            <div className="support-office-hours-actions">
              <button type="button" className="btn btn-primary" onClick={() => void submitOfficeHoursRequest()} disabled={officeHoursSaving}>
                {officeHoursSaving ? "Saving Review Request" : "Submit Review Request"}
              </button>
              <button type="button" className="btn btn-light" onClick={handleDownloadOfficeHoursAgenda}>
                Download Agenda
              </button>
              <button type="button" className="btn btn-light" onClick={handleDownloadOfficeHoursCalendar}>
                Calendar Hold
              </button>
              <button type="button" className="btn btn-light" onClick={() => onNavigate(selectedOfficeFocus.route)}>
                Open Practice Route
              </button>
            </div>
            {officeHoursNotice ? <p className="support-office-hours-notice" role="status" aria-live="polite">{officeHoursNotice}</p> : null}
          </article>

          <aside className="support-office-hours-panel" aria-label="Office hours readiness">
            <div className="support-office-hours-readiness">
              <p className="nav-overline">Review Signals</p>
              <h4>{selectedOfficeFocus.label}</h4>
              <p>{selectedOfficeFocus.outcome}</p>
              <div>
                <span>
                  <strong>{practicalReviewSnapshot.readyCount}</strong>
                  Ready artifacts
                </span>
                <span>
                  <strong>{practicalReviewSnapshot.needsCoachingCount}</strong>
                  Need coaching
                </span>
                <span>
                  <strong>{supportResponseTargets[officeHoursUrgency]}</strong>
                  Target
                </span>
              </div>
            </div>

            <div className="support-office-hours-bookings">
              <p className="nav-overline">Saved Holds</p>
              {officeHoursBookings.length ? (
                officeHoursBookings.slice(0, 4).map((booking) => {
                  const focus = officeHoursFocusOptions.find((option) => option.id === booking.focus) ?? officeHoursFocusOptions[0];
                  return (
                    <article key={booking.id}>
                      <span>{booking.id.slice(0, 8)}</span>
                      <strong>{focus.label}</strong>
                      <p>
                        {booking.preferredDate} {booking.preferredTime} · {supportResponseTargets[booking.urgency]}
                      </p>
                    </article>
                  );
                })
              ) : (
                <div className="support-request-empty">
                  <strong>No office-hours holds yet.</strong>
                  <p>Saved agendas and calendar holds will appear here for follow-up.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="support-team-section" aria-labelledby="team-training-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Team Training Paths</p>
          <h3 id="team-training-title">Manager-ready training sprints</h3>
          <p>Each sprint gives a manager a concrete weekly shape instead of asking them to translate a content library into staff behavior alone.</p>
        </div>
        <div className="support-team-grid">
          {teamSprints.map((sprint) => (
            <article key={sprint.title} className="support-team-card">
              <span>{sprint.cadence}</span>
              <h4>{sprint.title}</h4>
              <p>{sprint.audience}</p>
              <ul>
                {sprint.modules.map((module) => (
                  <li key={module}>{module}</li>
                ))}
              </ul>
              <strong>{sprint.outcome}</strong>
            </article>
          ))}
        </div>
        <div className="support-team-actions">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate(buildOnboardingRoute("checkout", { planId: "founding", source: "support-team-sprints" }))}>
            Start Team Intake
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate(buildOnboardingRoute("pricing", { planId: "founding", source: "support-team-sprints" }))}>
            Compare Cohort Plan
          </button>
        </div>
      </section>

      <section className="support-planner-section" aria-labelledby="team-planner-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Assignment Planner</p>
          <h3 id="team-planner-title">Turn a team path into weekly ownership</h3>
          <p>Save a manager plan locally or to Supabase so invited team members can share the same weekly route, owner, and outcome list.</p>
        </div>

        <div className="support-planner-grid">
          <article className="support-planner-builder">
            <label>
              Sprint
              <select value={selectedTemplateId} onChange={(event) => setSelectedTemplateId(event.target.value)}>
                {teamSprintTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Team name
              <input value={teamName} onChange={(event) => setTeamName(event.target.value)} />
            </label>
            <label>
              Manager or owner
              <input value={managerName} onChange={(event) => setManagerName(event.target.value)} />
            </label>
            <label>
              Start date
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            </label>
            <label>
              Member emails
              <textarea
                value={teamMemberEmails}
                onChange={(event) => setTeamMemberEmails(event.target.value)}
                rows={3}
                placeholder="server@example.com, bartender@example.com"
              />
            </label>
            <div className="support-planner-preview">
              <strong>{selectedTemplate.title}</strong>
              <span>{selectedTemplate.focus}</span>
            </div>
            <button type="button" className="btn btn-primary" onClick={savePlanner} disabled={teamPlanSaving}>
              {teamPlanSaving ? "Saving Team Plan" : "Save Team Plan"}
            </button>
            <p className="support-planner-sync" role="status" aria-live="polite">{teamCloudStatus}</p>
          </article>

          <article className="support-planner-plan">
            {teamPlan ? (
              <>
                <div>
                  <p className="nav-overline">{teamPlan.cloudBacked ? "Cloud Plan" : "Saved Plan"}</p>
                  <h4>{teamPlan.teamName}</h4>
                  <p>{teamPlan.sprintTitle} · {teamPlan.managerName}</p>
                  {teamPlan.memberEmails?.length ? <p>{teamPlan.memberEmails.length} manager/member account{teamPlan.memberEmails.length === 1 ? "" : "s"} linked.</p> : null}
                </div>
                <div className="support-assignment-list">
                  {teamPlan.assignments.map((assignment) => (
                    <article key={`${assignment.week}-${assignment.title}`} className={assignment.completed ? "complete" : ""}>
                      <button type="button" onClick={() => toggleAssignment(assignment.week)} aria-pressed={assignment.completed}>
                        <span>Week {assignment.week}</span>
                        <strong>{assignment.title}</strong>
                        <small>{assignment.completed ? "Complete" : "Mark complete"}</small>
                      </button>
                      <p>{assignment.outcome}</p>
                      <div>
                        <button type="button" className="btn btn-light" onClick={() => onNavigate(assignment.route)}>
                          Open Route
                        </button>
                        <span>{assignment.owner}</span>
                      </div>
                    </article>
                  ))}
                </div>
                {cloudTeamPlans.length > 1 ? (
                  <div className="support-cloud-plan-list" aria-label="Cloud team plans">
                    {cloudTeamPlans.slice(0, 3).map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        className={teamPlan.id === plan.id ? "active" : ""}
                        onClick={() => setTeamPlan(saveTeamTrainingPlan(plan))}
                      >
                        <span>{plan.sprintTitle}</span>
                        <strong>{plan.teamName}</strong>
                        <small>{plan.memberEmails?.length ?? 0} accounts · {plan.assignments.filter((assignment) => assignment.completed).length}/{plan.assignments.length} done</small>
                      </button>
                    ))}
                  </div>
                ) : null}
              </>
            ) : (
              <div className="support-planner-empty">
                <p className="nav-overline">No saved plan</p>
                <h4>Create the first weekly assignment loop.</h4>
                <p>Choose a sprint, name the team owner, then save. The dashboard will pick up the plan automatically.</p>
              </div>
            )}
          </article>
        </div>
      </section>

      <section className="support-faq-section" aria-labelledby="support-faq-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">FAQ</p>
          <h3 id="support-faq-title">Common learner and manager questions</h3>
        </div>
        <div className="support-faq-grid">
          {faqGroups.map((group) => (
            <article key={group.title} className="support-faq-card">
              <h4>{group.title}</h4>
              {group.items.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
