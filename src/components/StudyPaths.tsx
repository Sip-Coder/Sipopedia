import { useMemo, useState } from "react";
import { credentialSyllabiForPath, type CredentialSyllabusBlock } from "../lib/credentialSyllabi";
import { buildOnboardingRoute } from "../lib/onboardingIntent";

type StudyPathsProps = {
  onNavigate: (route: string) => void;
};

type CredentialPath = {
  id: string;
  label: string;
  title: string;
  caveat: string;
  officialSignal: string;
  bestFor: string;
  sourceName: string;
  sourceUrl: string;
  levels: string[];
  sipPlan: string[];
  routes: { label: string; route: string }[];
  weeklyLoop: string[];
};

type CredentialPrepPlan = {
  providerName: string;
  providerUrl: string;
  examWindow: string;
  listedCost: string;
  materialsCost: string;
  verifiedDate: string;
  budget: string;
  weeklyHours: string;
  officialHandoff: boolean;
  notes: string;
  updatedAt: string;
};

type CredentialPrepPlans = Record<string, CredentialPrepPlan>;

const CREDENTIAL_PREP_PLANS_KEY = "sipstudies:credential-prep-plans:v1";

const emptyPrepPlan: CredentialPrepPlan = {
  providerName: "",
  providerUrl: "",
  examWindow: "",
  listedCost: "",
  materialsCost: "",
  verifiedDate: "",
  budget: "",
  weeklyHours: "",
  officialHandoff: false,
  notes: "",
  updatedAt: ""
};

const credentialPaths: CredentialPath[] = [
  {
    id: "wset",
    label: "WSET-style",
    title: "Wine, spirits, beer, and sake knowledge ladder",
    caveat: "Independent study support only. Sip Studies is not an Approved Programme Provider and does not issue WSET qualifications.",
    officialSignal:
      "WSET publishes progressive qualifications across wines, spirits, sake, and beer, with wine running through Level 4 Diploma and beer currently offered at Levels 1 and 2.",
    bestFor: "Learners who need structured product knowledge, tasting language, global categories, and exam-style recall.",
    sourceName: "WSET qualifications",
    sourceUrl: "https://www.wsetglobal.com/qualifications/",
    levels: ["Level 1 foundation", "Level 2 category breadth", "Level 3 analysis", "Level 4 wine diploma support"],
    sipPlan: ["Map terms to Sipopedia", "Build region and grape recall", "Use quiz filters for timed theory", "Use tasting notes to practice structured language"],
    routes: [
      { label: "Open Sipopedia", route: "app/sipopedia" },
      { label: "Run Quiz", route: "app/beverage-quiz" },
      { label: "Print Sheets", route: "app/study-sheets" },
      { label: "Study Maps", route: "app/maps" }
    ],
    weeklyLoop: ["Day 1: specification scan and terms", "Day 2: map and grape recall", "Day 3: tasting language", "Day 4: timed quiz", "Day 5: weak-topic remediation"]
  },
  {
    id: "cms",
    label: "CMS-style",
    title: "Sommelier service, theory, and tasting discipline",
    caveat: "Independent study support only. Sip Studies is not affiliated with the Court of Master Sommeliers, Americas and cannot confer CMS credentials.",
    officialSignal:
      "CMS Americas describes a four-level education and examination program beginning with the Introductory Sommelier Course and Examination.",
    bestFor: "Hospitality learners who need theory, deductive tasting, service standards, sales language, and floor confidence.",
    sourceName: "CMS Americas certification",
    sourceUrl: "https://www.mastersommeliers.org/certification",
    levels: ["Introductory Sommelier", "Certified Sommelier", "Advanced Sommelier", "Master Sommelier"],
    sipPlan: ["Rehearse service vocabulary", "Practice deductive tasting structure", "Review classic regions and grapes", "Convert missed quiz topics into study routes"],
    routes: [
      { label: "Flavor Wheel", route: "app/flavor-wheel" },
      { label: "Regions", route: "app/regions" },
      { label: "Print Sheets", route: "app/study-sheets" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Service Tools", route: "app/cocktails" }
    ],
    weeklyLoop: ["Day 1: service scenario", "Day 2: region theory", "Day 3: blind-tasting note", "Day 4: beverage service drill", "Day 5: retake weak topics"]
  },
  {
    id: "cicerone",
    label: "Cicerone-style",
    title: "Beer service, styles, draught, flavor, and evaluation",
    caveat: "Independent study support only. Sip Studies is not affiliated with the Cicerone Certification Program and does not award Cicerone titles.",
    officialSignal:
      "Cicerone publishes four certification levels: Certified Beer Server, Certified Cicerone, Advanced Cicerone, and Master Cicerone.",
    bestFor: "Beer professionals who need style recall, quality control, draught handling, off-flavor logic, and guest service.",
    sourceName: "Cicerone certification levels",
    sourceUrl: "https://www.cicerone.org/us-en/certifications",
    levels: ["Certified Beer Server", "Certified Cicerone", "Advanced Cicerone", "Master Cicerone"],
    sipPlan: ["Filter quiz practice to beer", "Study brewing and draught terms", "Use Sip Game equipment scenes", "Track flavor faults and storage issues"],
    routes: [
      { label: "Beer Quiz", route: "app/beverage-quiz" },
      { label: "Print Sheets", route: "app/study-sheets" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Sip Game", route: "app/sip-game" },
      { label: "Resources", route: "app/resources" }
    ],
    weeklyLoop: ["Day 1: styles and service", "Day 2: ingredients and brewing", "Day 3: draught systems", "Day 4: off-flavor review", "Day 5: timed beer retake"]
  },
  {
    id: "bar",
    label: "BarSmarts-style",
    title: "Cocktail technique, spirits service, and hospitality reps",
    caveat: "Independent study support only. Sip Studies is not affiliated with BarSmarts and does not certify bartenders.",
    officialSignal:
      "BarSmarts emphasizes ingredients, techniques, hospitality, essential cocktails, and practical service skill.",
    bestFor: "Bartenders, servers, and managers who need practical cocktail confidence, guest language, and pre-shift drills.",
    sourceName: "BarSmarts",
    sourceUrl: "https://www.barsmarts.com/",
    levels: ["Basics", "Professional", "Practical readiness", "Shift training support"],
    sipPlan: ["Drill guest language", "Practice classic builds", "Map spirit categories to service choices", "Assign team pre-shift reps"],
    routes: [
      { label: "Service Quiz", route: "app/beverage-quiz?preset=bar-service" },
      { label: "Print Specs", route: "app/study-sheets" },
      { label: "Roleplay Lab", route: "app/service-roleplay" },
      { label: "Cocktails", route: "app/cocktails" },
      { label: "Support & Teams", route: "support" }
    ],
    weeklyLoop: ["Day 1: guest cue", "Day 2: ingredient role", "Day 3: technique drill", "Day 4: classic build", "Day 5: pre-shift roleplay"]
  },
  {
    id: "regional-scholar",
    label: "Regional scholar",
    title: "France, Italy, Spain, and region-specific mastery",
    caveat: "Independent regional study support only. Sip Studies does not issue Wine Scholar Guild credentials.",
    officialSignal:
      "Wine Scholar Guild programs emphasize in-depth regional study, online modules, quizzes, flashcards, maps, community, and certification exams.",
    bestFor: "Advanced learners who need country maps, appellation hierarchy, grape-region matching, and region-by-region review.",
    sourceName: "Wine Scholar Guild Spanish Wine Scholar",
    sourceUrl: "https://www.winescholarguild.com/certifications/scholar-programs/spanish-wine-scholar",
    levels: ["Country fundamentals", "Regional maps", "Grape and appellation logic", "Exam-ready regional recall"],
    sipPlan: ["Use country maps as the memory scaffold", "Pair region pages with grape profiles", "Search terms before each region", "Print study sheets for weak areas"],
    routes: [
      { label: "Regions", route: "app/regions" },
      { label: "Print Sheets", route: "app/study-sheets" },
      { label: "Grapes", route: "app/grapes" },
      { label: "Maps", route: "app/maps" }
    ],
    weeklyLoop: ["Day 1: country map", "Day 2: region profiles", "Day 3: grape matching", "Day 4: law and labeling terms", "Day 5: map recall quiz"]
  }
];

const comparisonRows = [
  { need: "Official proof", competitor: "Credential bodies award certificates, pins, directories, or post-nominals.", sip: "Sip Studies provides independent prep and progress signals, not official certification." },
  { need: "Study structure", competitor: "Programs publish levels, syllabi, exams, study modes, and provider routes.", sip: "This page turns Sip Studies rooms into visible weekly study loops." },
  { need: "Practice feedback", competitor: "Quizzes, exams, tastings, and instructor feedback validate readiness.", sip: "Beverage Quiz now stores attempts, weak topics, review questions, and study links." },
  { need: "Category depth", competitor: "Specialists own one lane: wine service, beer, spirits, or regional mastery.", sip: "Sip Studies connects wine, beer, spirits, cocktails, maps, terms, games, and journals in one workspace." }
];

function readCredentialPrepPlans(): CredentialPrepPlans {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(CREDENTIAL_PREP_PLANS_KEY);
    return raw ? JSON.parse(raw) as CredentialPrepPlans : {};
  } catch {
    return {};
  }
}

function writeCredentialPrepPlans(plans: CredentialPrepPlans) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CREDENTIAL_PREP_PLANS_KEY, JSON.stringify(plans));
  } catch {
    // Ignore storage pressure; the visible plan state still updates for this session.
  }
}

function hasPrepPlan(plan: CredentialPrepPlan | undefined): boolean {
  if (!plan) return false;
  return Boolean(
    plan.providerName ||
      plan.providerUrl ||
      plan.examWindow ||
      plan.listedCost ||
      plan.materialsCost ||
      plan.verifiedDate ||
      plan.budget ||
      plan.weeklyHours ||
      plan.notes ||
      plan.officialHandoff
  );
}

function verificationStatus(plan: CredentialPrepPlan | undefined): { label: string; tone: "ready" | "stale" | "missing"; detail: string } {
  if (!plan || (!plan.providerName && !plan.providerUrl && !plan.officialHandoff)) {
    return { label: "Needs official check", tone: "missing", detail: "Choose an official provider/source and verify current fees before committing." };
  }
  if (!plan.verifiedDate) {
    return { label: "Provider noted", tone: "stale", detail: "Add the date you checked fees, policies, course dates, and enrollment rules." };
  }
  const checked = new Date(`${plan.verifiedDate}T00:00:00`);
  if (Number.isNaN(checked.getTime())) {
    return { label: "Check date invalid", tone: "stale", detail: "Re-enter the verification date from the official provider source." };
  }
  const ageDays = Math.floor((Date.now() - checked.getTime()) / 86_400_000);
  if (ageDays > 45) {
    return { label: "Refresh needed", tone: "stale", detail: `Official source was checked ${ageDays} days ago; refresh costs and dates before enrollment.` };
  }
  if (!plan.officialHandoff) {
    return { label: "Needs policy confirmation", tone: "stale", detail: "Mark the policy/fee confirmation only after checking the official source." };
  }
  return { label: "Fresh official check", tone: "ready", detail: `Official source checked ${ageDays} day${ageDays === 1 ? "" : "s"} ago.` };
}

function buildCredentialPrepPlanText(path: CredentialPath, syllabi: CredentialSyllabusBlock[], plans: CredentialPrepPlans): string {
  return [
    `Sip Studies Credential Prep Plan: ${path.label}`,
    path.title,
    "",
    path.caveat,
    "",
    ...syllabi.flatMap((block) => {
      const plan = plans[block.id] ?? emptyPrepPlan;
      return [
        `## ${block.title}`,
        `Provider: ${plan.providerName || "Not selected yet"}`,
        `Provider URL: ${plan.providerUrl || block.officialUrl}`,
        `Exam/course window: ${plan.examWindow || "Not scheduled yet"}`,
        `Listed course/exam cost: ${plan.listedCost || "Not captured yet"}`,
        `Materials/travel/tasting kit cost: ${plan.materialsCost || "Not captured yet"}`,
        `Cost/budget: ${plan.budget || "Not captured yet"}`,
        `Weekly study hours: ${plan.weeklyHours || "Not set yet"}`,
        `Official source checked date: ${plan.verifiedDate || "Not checked yet"}`,
        `Official provider checked: ${plan.officialHandoff ? "Yes" : "No"}`,
        `Verification status: ${verificationStatus(plan).label} - ${verificationStatus(plan).detail}`,
        `Official handoff: ${block.officialUrl}`,
        `Study time signal: ${block.studyTime}`,
        `Exam signal: ${block.examSignal}`,
        "",
        "Sip actions:",
        ...block.sipActions.map((action) => `- ${action.label}: ${action.detail}`),
        "",
        "Readiness checks:",
        ...block.readinessChecks.map((check) => `- ${check}`),
        "",
        `Notes: ${plan.notes || "None yet"}`,
        ""
      ];
    })
  ].join("\n");
}

function buildCredentialVerificationPacket(path: CredentialPath, syllabi: CredentialSyllabusBlock[], plans: CredentialPrepPlans): string {
  return [
    `Sip Studies Official Enrollment Verification Packet: ${path.label}`,
    "",
    path.caveat,
    "",
    "Use this packet before paying. Sip Studies is independent prep; the official provider controls eligibility, course dates, fees, exam rules, certificates, trademarks, refunds, and credential proof.",
    "",
    ...syllabi.flatMap((block) => {
      const plan = plans[block.id] ?? emptyPrepPlan;
      const status = verificationStatus(plan);
      return [
        `## ${block.title}`,
        `Official source: ${block.officialUrl}`,
        `Selected provider/source: ${plan.providerName || "Not selected"}`,
        `Selected provider URL: ${plan.providerUrl || "Not captured"}`,
        `Verification status: ${status.label}`,
        `Verification note: ${status.detail}`,
        `Checked date: ${plan.verifiedDate || "Not captured"}`,
        `Course/exam window: ${plan.examWindow || "Not captured"}`,
        `Listed cost: ${plan.listedCost || "Not captured"}`,
        `Materials/travel/tasting kit estimate: ${plan.materialsCost || "Not captured"}`,
        `Total planning budget: ${plan.budget || "Not captured"}`,
        `Weekly study hours: ${plan.weeklyHours || "Not captured"}`,
        "",
        "Verify before enrollment:",
        "- Current course/exam dates and registration deadline",
        "- Current tuition, exam fees, retake fees, and taxes",
        "- Included materials, tasting samples, shipping, travel, or kit requirements",
        "- Cancellation/refund/transfer policy",
        "- Official credential wording, certificate, pin, directory, or post-nominal rules",
        "- Whether the provider is authorized for the exact credential and geography",
        "",
        `Notes: ${plan.notes || "None yet"}`,
        ""
      ];
    })
  ].join("\n");
}

function downloadTextFile(filename: string, body: string) {
  if (typeof document === "undefined") return;
  const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function StudyPaths({ onNavigate }: StudyPathsProps) {
  const [activePathId, setActivePathId] = useState(credentialPaths[0].id);
  const [focusedSyllabusId, setFocusedSyllabusId] = useState(credentialSyllabiForPath(credentialPaths[0].id)[0]?.id ?? "");
  const [prepPlans, setPrepPlans] = useState<CredentialPrepPlans>(() => readCredentialPrepPlans());
  const [plannerNotice, setPlannerNotice] = useState("");
  const activePath = useMemo(() => credentialPaths.find((path) => path.id === activePathId) ?? credentialPaths[0], [activePathId]);
  const activeSyllabi = useMemo(() => credentialSyllabiForPath(activePath.id), [activePath.id]);
  const focusedSyllabus = useMemo(
    () => activeSyllabi.find((block) => block.id === focusedSyllabusId) ?? activeSyllabi[0] ?? null,
    [activeSyllabi, focusedSyllabusId]
  );
  const focusedPlan = focusedSyllabus ? prepPlans[focusedSyllabus.id] ?? emptyPrepPlan : emptyPrepPlan;
  const activePathPlanCount = activeSyllabi.filter((block) => hasPrepPlan(prepPlans[block.id])).length;

  const handlePathSelect = (pathId: string) => {
    setActivePathId(pathId);
    setFocusedSyllabusId(credentialSyllabiForPath(pathId)[0]?.id ?? "");
    setPlannerNotice("");
  };

  const updatePrepPlan = <Field extends keyof CredentialPrepPlan>(blockId: string, field: Field, value: CredentialPrepPlan[Field]) => {
    setPrepPlans((current) => {
      const nextPlan = {
        ...(current[blockId] ?? emptyPrepPlan),
        [field]: value,
        updatedAt: new Date().toISOString()
      };
      const next = { ...current, [blockId]: nextPlan };
      writeCredentialPrepPlans(next);
      return next;
    });
    setPlannerNotice("Prep plan saved locally.");
  };

  const clearPrepPlan = (blockId: string) => {
    setPrepPlans((current) => {
      const next = { ...current };
      delete next[blockId];
      writeCredentialPrepPlans(next);
      return next;
    });
    setPlannerNotice("Prep plan cleared.");
  };

  const handleDownloadPrepPlan = () => {
    downloadTextFile(`sip-studies-${activePath.id}-credential-prep-plan.md`, buildCredentialPrepPlanText(activePath, activeSyllabi, prepPlans));
    setPlannerNotice("Credential prep plan downloaded.");
  };

  const handleDownloadVerificationPacket = () => {
    downloadTextFile(
      `sip-studies-${activePath.id}-official-enrollment-verification.md`,
      buildCredentialVerificationPacket(activePath, activeSyllabi, prepPlans)
    );
    setPlannerNotice("Official enrollment verification packet downloaded.");
  };

  return (
    <section className="study-paths-page">
      <header className="section-header study-paths-hero">
        <p className="checkout-eyebrow">Credential Prep Desk</p>
        <h2>Independent study paths for beverage credentials and regional mastery.</h2>
        <p>
          Use official credential bodies for the credential. Use Sip Studies to organize recall, tasting language, maps, service drills, and weak-topic review before and between official courses.
        </p>
        <div className="study-paths-hero-actions">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate("app/beverage-quiz")}>
            Start Practice Quiz
          </button>
          <button type="button" className="btn btn-light" onClick={() => window.print()}>
            Print Study Checklist
          </button>
          <button type="button" className="btn btn-light" onClick={handleDownloadPrepPlan}>
            Download Prep Plan
          </button>
          <button type="button" className="btn btn-light" onClick={handleDownloadVerificationPacket}>
            Download Verification Packet
          </button>
          <button type="button" className="btn btn-light" onClick={() => onNavigate(buildOnboardingRoute("support", { planId: "founding", source: "study-paths" }))}>
            Team Study Help
          </button>
        </div>
        {plannerNotice ? <p className="study-paths-planner-notice">{plannerNotice}</p> : null}
      </header>

      <div className="study-paths-layout">
        <aside className="study-paths-tabs" aria-label="Credential study path options">
          {credentialPaths.map((path) => (
            <button
              key={path.id}
              type="button"
              className={path.id === activePath.id ? "active" : ""}
              aria-pressed={path.id === activePath.id}
              onClick={() => handlePathSelect(path.id)}
            >
              <span>{path.label}</span>
              <strong>{path.title}</strong>
            </button>
          ))}
        </aside>

        <article className="study-paths-detail">
          <p className="nav-overline">{activePath.label}</p>
          <h3>{activePath.title}</h3>
          <p>{activePath.bestFor}</p>
          <div className="study-paths-caveat">
            <strong>Non-affiliation note</strong>
            <span>{activePath.caveat}</span>
          </div>
          <div className="study-paths-source">
            <span>{activePath.officialSignal}</span>
            <a href={activePath.sourceUrl} target="_blank" rel="noreferrer">
              Official source: {activePath.sourceName}
            </a>
          </div>
          <div className="study-paths-detail-grid">
            <section>
              <h4>Official ladder to understand</h4>
              <ol>
                {activePath.levels.map((level) => (
                  <li key={level}>{level}</li>
                ))}
              </ol>
            </section>
            <section>
              <h4>Sip study plan</h4>
              <ul>
                {activePath.sipPlan.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <div className="study-paths-week-loop">
            <h4>Five-session weekly loop</h4>
            <div>
              {activePath.weeklyLoop.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="study-paths-route-actions">
            {activePath.routes.map((route) => (
              <button key={route.label} type="button" className="btn btn-light" onClick={() => onNavigate(route.route)}>
                {route.label}
              </button>
            ))}
          </div>
          {activeSyllabi.length > 0 ? (
            <section className="study-paths-syllabus-section" aria-labelledby="study-paths-syllabus-title">
              <div>
                <p className="nav-overline">Syllabus Bridge</p>
                <h4 id="study-paths-syllabus-title">Level-specific prep blocks</h4>
                <p>Use these blocks to convert official public requirements into Sip Studies drills before handing off to the official provider. {activePathPlanCount} of {activeSyllabi.length} level plans have local enrollment notes.</p>
              </div>
              <div className="study-paths-level-tabs" aria-label="Level prep planner">
                {activeSyllabi.map((block) => (
                  <button
                    key={`level-tab-${block.id}`}
                    type="button"
                    className={focusedSyllabus?.id === block.id ? "active" : ""}
                    onClick={() => setFocusedSyllabusId(block.id)}
                  >
                    <span>{block.provider}</span>
                    <strong>{block.title}</strong>
                    <small>{hasPrepPlan(prepPlans[block.id]) ? "Plan saved" : "Needs plan"}</small>
                  </button>
                ))}
              </div>
              {focusedSyllabus ? (
                <article className="study-paths-level-planner">
                  <div className="study-paths-level-planner-head">
                    <div>
                      <p className="nav-overline">Focused Level Plan</p>
                      <h5>{focusedSyllabus.title}</h5>
                      <p>{focusedSyllabus.focus}</p>
                    </div>
                    <a href={focusedSyllabus.officialUrl} target="_blank" rel="noreferrer">
                      Official enrollment source
                    </a>
                  </div>
                  <div className="study-paths-level-planner-signals">
                    <span>{focusedSyllabus.studyTime}</span>
                    <span>{focusedSyllabus.examSignal}</span>
                  </div>
                  <div className={`study-paths-verification-status status-${verificationStatus(focusedPlan).tone}`}>
                    <strong>{verificationStatus(focusedPlan).label}</strong>
                    <span>{verificationStatus(focusedPlan).detail}</span>
                  </div>
                  <div className="study-paths-level-planner-grid">
                    <label>
                      <span>Provider or school</span>
                      <input
                        type="text"
                        value={focusedPlan.providerName}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "providerName", event.target.value)}
                        placeholder="Approved provider, official school, or self-paced source"
                      />
                    </label>
                    <label>
                      <span>Provider URL</span>
                      <input
                        type="text"
                        value={focusedPlan.providerUrl ?? ""}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "providerUrl", event.target.value)}
                        placeholder="Paste official provider or registration link"
                      />
                    </label>
                    <label>
                      <span>Exam/course window</span>
                      <input
                        type="text"
                        value={focusedPlan.examWindow}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "examWindow", event.target.value)}
                        placeholder="Month, deadline, or target date"
                      />
                    </label>
                    <label>
                      <span>Source checked date</span>
                      <input
                        type="date"
                        value={focusedPlan.verifiedDate ?? ""}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "verifiedDate", event.target.value)}
                      />
                    </label>
                    <label>
                      <span>Listed course/exam cost</span>
                      <input
                        type="text"
                        value={focusedPlan.listedCost ?? ""}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "listedCost", event.target.value)}
                        placeholder="Official tuition, exam, retake fees"
                      />
                    </label>
                    <label>
                      <span>Materials / kit / travel</span>
                      <input
                        type="text"
                        value={focusedPlan.materialsCost ?? ""}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "materialsCost", event.target.value)}
                        placeholder="Books, samples, tasting kit, travel"
                      />
                    </label>
                    <label>
                      <span>Cost or budget</span>
                      <input
                        type="text"
                        value={focusedPlan.budget}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "budget", event.target.value)}
                        placeholder="Course, exam, books, travel"
                      />
                    </label>
                    <label>
                      <span>Weekly study hours</span>
                      <input
                        type="text"
                        value={focusedPlan.weeklyHours}
                        onChange={(event) => updatePrepPlan(focusedSyllabus.id, "weeklyHours", event.target.value)}
                        placeholder="Example: 4 hours/week"
                      />
                    </label>
                  </div>
                  <label className="study-paths-level-check">
                    <input
                      type="checkbox"
                      checked={focusedPlan.officialHandoff}
                      onChange={(event) => updatePrepPlan(focusedSyllabus.id, "officialHandoff", event.target.checked)}
                    />
                    <span>Official provider requirements, policies, and current fees checked</span>
                  </label>
                  <label className="study-paths-level-notes">
                    <span>Enrollment and prep notes</span>
                    <textarea
                      value={focusedPlan.notes}
                      onChange={(event) => updatePrepPlan(focusedSyllabus.id, "notes", event.target.value)}
                      placeholder="Capture provider deadlines, required materials, weak topics, tasting kits, travel, or instructor notes."
                    />
                  </label>
                  <div className="study-paths-level-planner-footer">
                    <span>{focusedPlan.updatedAt ? `Saved ${new Date(focusedPlan.updatedAt).toLocaleString()}` : "No local plan saved yet."}</span>
                    <button type="button" className="btn btn-light" onClick={handleDownloadVerificationPacket}>
                      Download Verification Packet
                    </button>
                    <button type="button" className="btn btn-light" onClick={() => clearPrepPlan(focusedSyllabus.id)}>
                      Clear Level Plan
                    </button>
                  </div>
                </article>
              ) : null}
              <div className="study-paths-syllabus-grid">
                {activeSyllabi.map((block) => (
                  <article key={block.id} className="study-paths-syllabus-card">
                    <div className="study-paths-syllabus-head">
                      <span>{block.provider}</span>
                      <a href={block.officialUrl} target="_blank" rel="noreferrer">Official handoff</a>
                    </div>
                    <h5>{block.title}</h5>
                    <p>{block.focus}</p>
                    <div className="study-paths-syllabus-meta">
                      <span>{block.studyTime}</span>
                      <span>{block.examSignal}</span>
                    </div>
                    <div className="study-paths-syllabus-columns">
                      <section>
                        <h6>Study targets</h6>
                        <ul>
                          {block.studyTargets.map((target) => (
                            <li key={`${block.id}-${target}`}>{target}</li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h6>Readiness checks</h6>
                        <ul>
                          {block.readinessChecks.map((check) => (
                            <li key={`${block.id}-${check}`}>{check}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                    <div className="study-paths-syllabus-actions">
                      {block.sipActions.map((action) => (
                        <button key={`${block.id}-${action.label}`} type="button" onClick={() => onNavigate(action.route)}>
                          <span>{action.label}</span>
                          <small>{action.detail}</small>
                        </button>
                      ))}
                    </div>
                    <p className="study-paths-handoff">{block.handoff}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}
        </article>
      </div>

      <section className="study-paths-comparison" aria-labelledby="credential-gap-title">
        <div className="support-section-heading">
          <p className="checkout-eyebrow">Market Gap Response</p>
          <h3 id="credential-gap-title">What credential competitors make clear</h3>
        </div>
        <div className="study-paths-comparison-grid">
          {comparisonRows.map((row) => (
            <article key={row.need}>
              <span>{row.need}</span>
              <p>
                <strong>Competitors:</strong> {row.competitor}
              </p>
              <p>
                <strong>Sip response:</strong> {row.sip}
              </p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
