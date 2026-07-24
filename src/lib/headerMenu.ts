export type HeaderMenuValue =
  | "home"
  | "pricing"
  | "support"
  | "study-paths"
  | "checkout"
  | "login"
  | "account"
  | "__signout"
  | `app/${string}`;

export type HeaderMenuOption = {
  value: HeaderMenuValue;
  label: string;
  detail: string;
  badge: string;
  lane: string;
  preview: string;
  keywords: string[];
};

export const LOGGED_OUT_HEADER_MENU_LABELS = ["Lobby Home", "Plan & Pricing", "Credential Paths", "Support & Teams", "Enroll Now", "Log In"] as const;
export const LOGGED_IN_HEADER_MENU_LABELS = ["Lobby Home", "Plan & Pricing", "Credential Paths", "Support & Teams", "Launch Pad", "Account Dashboard", "Log Out"] as const;

type HeaderMenuInput = {
  isSignedIn: boolean;
  launchRoute: Extract<HeaderMenuValue, `app/${string}`>;
};

export function buildHeaderMenuOptions({ isSignedIn, launchRoute }: HeaderMenuInput): HeaderMenuOption[] {
  const sharedLobbyOptions: HeaderMenuOption[] = [
    {
      value: "home",
      label: "Lobby Home",
      detail: "Public front door",
      badge: "Public",
      lane: "Lobby",
      preview: "Start here for the mission brief, workspace preview, and beginner-friendly route choices.",
      keywords: ["home", "lobby", "start"]
    },
    {
      value: "pricing",
      label: "Membership & Pricing",
      detail: "$10/month membership",
      badge: "$10/mo",
      lane: "Enrollment",
      preview: "Review the single Sip Studies membership before continuing to secure checkout.",
      keywords: ["pricing", "membership", "cost"]
    },
    {
      value: "study-paths",
      label: "Credential Paths",
      detail: "Independent exam prep",
      badge: "Study",
      lane: "Credential Prep",
      preview: "Compare WSET-style, CMS-style, Cicerone-style, BarSmarts-style, and regional scholar study loops with source links, syllabus bridges, and non-affiliation notes.",
      keywords: ["credential", "certification", "exam", "wset", "cms", "cicerone", "barsmarts", "bar", "scholar", "study path"]
    },
    {
      value: "support",
      label: "Support & Teams",
      detail: "FAQ, billing, study help",
      badge: "Help",
      lane: "Support",
      preview: "Route enrollment questions, access issues, weak-topic study help, and team-training intake from one public desk.",
      keywords: ["support", "help", "faq", "billing", "team", "enterprise", "cohort"]
    }
  ];

  if (isSignedIn) {
    return [
      ...sharedLobbyOptions,
      {
        value: launchRoute,
        label: "Launch Pad",
        detail: "Open the study workspace",
        badge: "Workspace",
        lane: "Workspace",
        preview: "Jump directly into the study operating system and resume the best room for your access level.",
        keywords: ["launch", "workspace", "study"]
      },
      {
        value: "account",
        label: "Account Dashboard",
        detail: "Progress, profile, billing",
        badge: "Account",
        lane: "Account",
        preview: "Review account state, learning progress, billing links, and profile controls.",
        keywords: ["account", "dashboard", "billing", "progress"]
      },
      {
        value: "__signout",
        label: "Log Out",
        detail: "End this session",
        badge: "Exit",
        lane: "Account",
        preview: "Close the private workspace on this device and return to public lobby access.",
        keywords: ["logout", "sign out", "exit"]
      }
    ];
  }

  return [
    ...sharedLobbyOptions,
    {
      value: "checkout",
      label: "Enroll Now",
      detail: "Start access setup",
      badge: "Enroll",
      lane: "Enrollment",
      preview: "Move into membership checkout with your next destination preserved.",
      keywords: ["enroll", "checkout", "join"]
    },
    {
      value: "login",
      label: "Log In",
      detail: "Return to your account",
      badge: "Account",
      lane: "Account",
      preview: "Restore your private workspace, account dashboard, and saved learning context.",
      keywords: ["login", "signin", "account"]
    }
  ];
}
