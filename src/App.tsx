import {
  Suspense,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode
} from "react";
import mainLogo from "./assets/brand/sip-studies-main-logo-opt.webp";
import wordmark from "./assets/brand/wordmark-ruthligos-opt.webp";
import welcomeToSipStudies from "./assets/brand/welcome-to-sip-studies.png";
import { trackEvent } from "./lib/analytics";
import { useAccess } from "./context/AccessContext";
import { useAuth } from "./context/AuthContext";
import { MarketingHome } from "./components/MarketingHome";
import { PricingPage } from "./components/PricingPage";
import { CheckoutPage } from "./components/CheckoutPage";
import { PolicyPage } from "./components/PolicyPage";
import { PaywallPanel } from "./components/PaywallPanel";
import { AuthPanel } from "./components/AuthPanel";
import { AccountDashboard } from "./components/AccountDashboard";
import { AvatarCreator } from "./components/AvatarCreator";
import { SupportCenter } from "./components/SupportCenter";
import { StudyPaths } from "./components/StudyPaths";
import { AdminConsole } from "./components/AdminConsole";
import { PublicFooter } from "./components/PublicFooter";
import { StarterFeatureDemo } from "./components/StarterFeatureDemo";
import { TerminologyAutoLinker } from "./components/TerminologyAutoLinker";
import { PowerfulPoint } from "./components/PowerfulPoint";
import { buildHeaderMenuOptions, type HeaderMenuOption, type HeaderMenuValue } from "./lib/headerMenu";
import { buildOnboardingRoute, readOnboardingIntent } from "./lib/onboardingIntent";
import {
  WORKSPACE_NAV_ITEMS,
  WORKSPACE_SECTIONS,
  writeLastWorkspaceModule,
  workspaceLabelForRoute,
  type WorkspaceNavItem as WorkspaceRegistryNavItem,
  type WorkspaceSectionDefinition,
  type WorkspaceSectionId
} from "./lib/workspaceNavigation";
import { searchTerminologyCommandResults, type TerminologyCommandResult } from "./lib/terminology";
import {
  PAGE_STATUS_EVENT,
  type PageStatusMap,
  canViewRoute,
  configForRoute,
  fetchPageStatusMap,
  readPageStatusMap,
  shouldShowInPublicNav,
  subscribeToPageStatusMap
} from "./lib/siteMap";

const loadSipAcademyWineLessons = () => import("./components/SipAcademyWineLessons");
const loadSipStudiosGame = () => import("./components/SipStudiosGame");
const loadFlavorWheel = () => import("./components/FlavorWheel");
const loadCellarScanner = () => import("./components/CellarScanner");
const loadBeverageQuiz = () => import("./components/BeverageQuiz");
const loadStudySheets = () => import("./components/StudySheets");
const loadServiceRoleplayLab = () => import("./components/ServiceRoleplayLab");
const loadBeverageNews = () => import("./components/BeverageNews");
const loadTerminology = () => import("./components/Terminology");
const loadTerminologyAdmin = () => import("./components/TerminologyAdmin");
const loadTastingJournal = () => import("./components/TastingJournal");
const loadFlavors = () => import("./components/Flavors");
const loadTastingGroups = () => import("./components/TastingGroups");
const loadFlavorBlog = () => import("./components/FlavorBlog");
const loadArticleFavorites = () => import("./components/ArticleFavorites");
const loadRegions = () => import("./components/Regions");
const loadSipMaps = () => import("./components/SipMaps");
const loadGrapes = () => import("./components/Grapes");
const loadCocktails = () => import("./components/Cocktails");
const loadWineResources = () => import("./components/WineResources");
const loadSommEvents = () => import("./components/SommEvents");
const loadAiNews = () => import("./components/AiNews");
const loadAiWinecast = () => import("./components/AiWinecast");

function isChunkLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk|ChunkLoadError/i.test(message);
}

function safeSessionStorageGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionStorageSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore storage failures; the original import error will surface.
  }
}

function lazyRoute<TComponent extends ComponentType<any>>(
  routeId: string,
  importer: () => Promise<{ default: TComponent }>
) {
  return lazy(async (): Promise<{ default: TComponent }> => {
    try {
      return await importer();
    } catch (error) {
      const reloadKey = `sipstudies:lazy-reload:${routeId}`;
      if (isChunkLoadError(error) && safeSessionStorageGet(reloadKey) !== "1" && typeof window !== "undefined") {
        safeSessionStorageSet(reloadKey, "1");
        window.location.reload();
        return new Promise<{ default: TComponent }>(() => undefined);
      }
      throw error;
    }
  });
}

const SipAcademyWineLessons = lazyRoute("sip-academy", () =>
  loadSipAcademyWineLessons().then((module) => ({ default: module.SipAcademyWineLessons }))
);
const SipStudiosGame = lazyRoute("sip-game", () => loadSipStudiosGame().then((module) => ({ default: module.SipStudiosGame })));
const FlavorWheel = lazyRoute("flavor-wheel", () => loadFlavorWheel().then((module) => ({ default: module.FlavorWheel })));
const CellarScanner = lazyRoute("cellar-scanner", () => loadCellarScanner().then((module) => ({ default: module.CellarScanner })));
const BeverageQuiz = lazyRoute("beverage-quiz", () => loadBeverageQuiz().then((module) => ({ default: module.BeverageQuiz })));
const StudySheets = lazyRoute("study-sheets", () => loadStudySheets().then((module) => ({ default: module.StudySheets })));
const ServiceRoleplayLab = lazyRoute("service-roleplay", () => loadServiceRoleplayLab().then((module) => ({ default: module.ServiceRoleplayLab })));
const BeverageNews = lazyRoute("beverage-news", () => loadBeverageNews().then((module) => ({ default: module.BeverageNews })));
const Terminology = lazyRoute("sipopedia", () => loadTerminology().then((module) => ({ default: module.Terminology })));
const TerminologyAdmin = lazyRoute("admin-terminology", () => loadTerminologyAdmin().then((module) => ({ default: module.TerminologyAdmin })));
const TastingJournal = lazyRoute("tasting-journal", () => loadTastingJournal().then((module) => ({ default: module.TastingJournal })));
const Flavors = lazyRoute("flavors", () => loadFlavors().then((module) => ({ default: module.Flavors })));
const TastingGroups = lazyRoute("tasting-groups", () => loadTastingGroups().then((module) => ({ default: module.TastingGroups })));
const FlavorBlog = lazyRoute("flavor-blog", () => loadFlavorBlog().then((module) => ({ default: module.FlavorBlog })));
const ArticleFavorites = lazyRoute("favorites", () =>
  loadArticleFavorites().then((module) => ({ default: module.ArticleFavorites }))
);
const Regions = lazyRoute("regions", () => loadRegions().then((module) => ({ default: module.Regions })));
const SipMaps = lazyRoute("maps", () => loadSipMaps().then((module) => ({ default: module.SipMaps })));
const Grapes = lazyRoute("grapes", () => loadGrapes().then((module) => ({ default: module.Grapes })));
const Cocktails = lazyRoute("cocktails", () => loadCocktails().then((module) => ({ default: module.Cocktails })));
const WineResources = lazyRoute("resources", () => loadWineResources().then((module) => ({ default: module.WineResources })));
const SommEvents = lazyRoute("somm-events", () => loadSommEvents().then((module) => ({ default: module.SommEvents })));
const AiNews = lazyRoute("ai-news", () => loadAiNews().then((module) => ({ default: module.AiNews })));
const AiWinecast = lazyRoute("ai-winecast", () => loadAiWinecast().then((module) => ({ default: module.AiWinecast })));

type RegionsPage = "regions" | `regions/${string}`;
type GrapesPage = "grapes" | `grapes/${string}`;
type AiWinecastPage = "ai-winecast" | `ai-winecast/${string}`;
type WorkspacePage =
  | "starter"
  | "sip-academy"
  | "sip-game"
  | "sipopedia"
  | "flavor-wheel"
  | "cellar-scanner"
  | "tasting-journal"
  | "flavors"
  | "tasting-groups"
  | "beverage-quiz"
  | "study-sheets"
  | "service-roleplay"
  | "beverage-news"
  | "flavor-blog"
  | "favorites"
  | AiWinecastPage
  | RegionsPage
  | "maps"
  | GrapesPage
  | "cocktails"
  | "resources"
  | "ai-news"
  | "somm-events";

type PublicRoute =
  | "home"
  | "pricing"
  | "support"
  | "study-paths"
  | "checkout"
  | "powerful-point"
  | "login"
  | "logout"
  | "account"
  | "account/avatar"
  | "terms"
  | "privacy"
  | "refund"
  | "success"
  | "cancel"
  | "not-found";
type AdminRoute = "admin" | "admin/terminology";
type AppRoute = PublicRoute | AdminRoute | `app/${WorkspacePage}`;
type WorkspaceSection = WorkspaceSectionId;
type WorkspaceSectionItem = WorkspaceSectionDefinition;
type SiteRoom = "lobby" | "game" | "boss" | "account";
const PAGE_FEATURE_EVENT = "sipstudies:navigate-page-feature";
const SUBFEATURE_EVENT = "sipstudies:navigate-subfeature";

type WorkspaceNavItem = WorkspaceRegistryNavItem;

const workspaceSections: WorkspaceSectionItem[] = WORKSPACE_SECTIONS;
const workspaceNavItems: WorkspaceNavItem[] = WORKSPACE_NAV_ITEMS;
const AUTOLINK_ALLOWED_WORKSPACE_PAGES = new Set<WorkspacePage>([
  "beverage-news",
  "flavor-blog",
  "resources",
  "ai-news",
  "somm-events"
]);

function isRegionsPage(page: WorkspacePage): page is RegionsPage {
  return page === "regions" || page.startsWith("regions/");
}

function isGrapesPage(page: WorkspacePage): page is GrapesPage {
  return page === "grapes" || page.startsWith("grapes/");
}

function isAiWinecastPage(page: WorkspacePage): page is AiWinecastPage {
  return page === "ai-winecast" || page.startsWith("ai-winecast/");
}

function normalizeLegacyHash(hash: string): AppRoute {
  const normalizedHash = hash.replace(/^#/, "").trim().split("?")[0];
  if (normalizedHash === "" || normalizedHash === "home") return "home";
  if (normalizedHash === "pricing") return "pricing";
  if (normalizedHash === "support" || normalizedHash === "help" || normalizedHash === "faq" || normalizedHash === "team-training") return "support";
  if (normalizedHash === "study-paths" || normalizedHash === "credentials" || normalizedHash === "certifications" || normalizedHash === "credential-prep") return "study-paths";
  if (normalizedHash === "checkout") return "checkout";
  if (normalizedHash === "powerful-point") return "powerful-point";
  if (normalizedHash === "login") return "login";
  if (normalizedHash === "logout") return "logout";
  if (normalizedHash === "account") return "account";
  if (normalizedHash === "account/avatar" || normalizedHash === "avatar" || normalizedHash === "avatar-creator") return "account/avatar";
  if (normalizedHash === "terms") return "terms";
  if (normalizedHash === "privacy") return "privacy";
  if (normalizedHash === "refund") return "refund";
  if (normalizedHash === "success") return "success";
  if (normalizedHash === "cancel") return "cancel";
  if (normalizedHash === "admin") return "admin";
  if (normalizedHash === "admin/terminology" || normalizedHash === "terminology-admin") return "admin/terminology";

  if (normalizedHash.startsWith("app/")) {
    const page = normalizedHash.slice("app/".length);
    const workspacePage = normalizeWorkspacePage(page);
    if (workspacePage === "starter" && !["starter", "start", "launch", "home"].includes(page)) return "not-found";
    return `app/${workspacePage}`;
  }

  const workspacePage = normalizeWorkspacePage(normalizedHash);
  if (workspacePage === "starter" && !["starter", "start", "launch", "home"].includes(normalizedHash)) return "not-found";
  return `app/${workspacePage}`;
}

function normalizeWorkspacePage(value: string): WorkspacePage {
  if (value === "starter" || value === "start" || value === "launch") return "starter";
  if (value === "home") return "starter";
  if (value === "sip-academy") return "sip-academy";
  if (value === "sip-game") return "sip-game";
  if (value === "sipopedia" || value === "terminology") return "sipopedia";
  if (value === "flavor-wheel") return "flavor-wheel";
  if (value === "cellar-scanner" || value === "scanner" || value === "label-scanner" || value === "cellar") return "cellar-scanner";
  if (value === "flavors") return "flavors";
  if (value === "tasting-journal" || value === "flavor-journal") return "tasting-journal";
  if (value === "tasting-groups") return "tasting-groups";
  if (value === "beverage-quiz") return "beverage-quiz";
  if (value === "study-sheets" || value === "sheets" || value === "printables" || value === "printable-study-sheets") return "study-sheets";
  if (value === "service-roleplay" || value === "roleplay" || value === "roleplay-lab" || value === "service-lab") return "service-roleplay";
  if (value === "beverage-news") return "beverage-news";
  if (value === "flavor-blog" || value === "flavor-blog-posts") return "flavor-blog";
  if (value === "favorites" || value === "bookmarks" || value === "saved-articles") return "favorites";
  if (value === "ai-winecast" || value.startsWith("ai-winecast/")) return value as AiWinecastPage;
  if (value === "ai-news") return "ai-news";
  if (value === "somm-events" || value === "somm-news") return "somm-events";
  if (value === "regions" || value.startsWith("regions/")) return value as RegionsPage;
  if (value === "maps" || value === "wine-maps") return "maps";
  if (value === "grapes" || value === "wine-grapes") return "grapes";
  if (value.startsWith("grapes/")) return value as GrapesPage;
  if (value === "cocktails" || value === "cocktail-map") return "cocktails";
  if (value === "resources" || value === "wine-resources") return "resources";
  return "starter";
}

function parseRoute(hashValue?: string): AppRoute {
  if (typeof window === "undefined" && !hashValue) return "home";
  const pathname = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
  if (pathname === "/admin") return "admin";
  if (pathname === "/admin/terminology") return "admin/terminology";
  if (pathname !== "/") return "not-found";
  const hash = (hashValue ?? window.location.hash.replace(/^#/, "")).trim().split("?")[0];
  return normalizeLegacyHash(hash);
}

function toHash(route: AppRoute): string {
  if (route === "app/starter") return "app/launch";
  return route;
}

function routeToUrl(route: AppRoute): string {
  if (route === "admin") return "/admin";
  if (route === "admin/terminology") return "/admin/terminology";
  const hash = toHash(route);
  return hash === "home" ? "/#home" : `/#${hash}`;
}

function roomFromRoute(route: AppRoute): SiteRoom {
  if (route.startsWith("admin")) return "boss";
  if (route.startsWith("app/")) return "game";
  if (route === "login" || route === "logout" || route === "account" || route === "account/avatar") return "account";
  return "lobby";
}

function defaultGameRoomRoute(isPaid: boolean, isAdmin: boolean): AppRoute {
  void isPaid;
  void isAdmin;
  return "app/starter";
}

function formatRouteLabel(route: string | null | undefined): string {
  const fallback = "Launch Pad";
  if (!route) return fallback;
  const routePart = route.replace(/^#/, "").split("?")[0].replace(/^app\//, "");
  if (!routePart || routePart === "starter" || routePart === "launch") return fallback;
  const workspaceRouteLabel = workspaceLabelForRoute(route);
  if (workspaceRouteLabel) return workspaceRouteLabel;
  return routePart
    .split("/")
    .pop()!
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function paymentSuccessRoute(isPaid: boolean, isAdmin: boolean, requestedNext?: string | null): AppRoute {
  const fallback = defaultGameRoomRoute(isPaid, isAdmin);
  if (!requestedNext) return fallback;

  const normalized = normalizeLegacyHash(requestedNext.replace(/^#/, "").split("?")[0]);
  if (normalized.startsWith("admin")) return fallback;
  if (normalized === "success" || normalized === "cancel" || normalized === "logout") return fallback;
  return normalized.startsWith("app/") || normalized === "account" ? normalized : fallback;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "OPTION";
}

function sectionFromWorkspacePage(page: WorkspacePage): WorkspaceSection {
  if (page === "flavor-wheel" || page === "cellar-scanner" || page === "flavors" || page === "tasting-journal") return "taste";
  if (page === "beverage-news" || page === "flavor-blog" || page === "favorites" || isAiWinecastPage(page) || page === "tasting-groups" || page === "ai-news" || page === "somm-events") return "connect";
  return "learn";
}

function preloadWorkspacePage(target: WorkspacePage): void {
  if (target === "starter") {
    return;
  }
  if (target === "sip-academy") {
    void loadSipAcademyWineLessons();
    return;
  }
  if (target === "sip-game") {
    void loadSipStudiosGame();
    return;
  }
  if (target === "sipopedia") {
    void loadTerminology();
    return;
  }
  if (target === "flavor-wheel") {
    void loadFlavorWheel();
    return;
  }
  if (target === "cellar-scanner") {
    void loadCellarScanner();
    return;
  }
  if (target === "tasting-journal") {
    void loadTastingJournal();
    return;
  }
  if (target === "flavors") {
    void loadFlavors();
    return;
  }
  if (target === "tasting-groups") {
    void loadTastingGroups();
    return;
  }
  if (target === "beverage-quiz") {
    void loadBeverageQuiz();
    return;
  }
  if (target === "study-sheets") {
    void loadStudySheets();
    return;
  }
  if (target === "service-roleplay") {
    void loadServiceRoleplayLab();
    return;
  }
  if (target === "beverage-news") {
    void loadBeverageNews();
    return;
  }
  if (target === "flavor-blog") {
    void loadFlavorBlog();
    return;
  }
  if (target === "favorites") {
    void loadArticleFavorites();
    return;
  }
  if (isAiWinecastPage(target)) {
    void loadAiWinecast();
    return;
  }
  if (target === "ai-news") {
    void loadAiNews();
    return;
  }
  if (target === "somm-events") {
    void loadSommEvents();
    return;
  }
  if (target === "maps") {
    void loadSipMaps();
    return;
  }
  if (isGrapesPage(target)) {
    void loadGrapes();
    return;
  }
  if (target === "cocktails") {
    void loadCocktails();
    return;
  }
  if (target === "resources") {
    void loadWineResources();
    return;
  }
  void loadRegions();
}

function AppLoading() {
  return (
    <section className="app-shell-state app-shell-loading" role="status" aria-live="polite">
      <h3>Loading workspace...</h3>
      <p>Preparing your next module.</p>
    </section>
  );
}

type SiteMenuOption = {
  value: AppRoute;
  label: string;
};

type WorkspaceCommandOption = {
  id: string;
  label: string;
  detail: string;
  kind: string;
  shortcut?: string;
  route?: AppRoute;
  page?: WorkspacePage;
  termId?: string;
  action?: "logout";
  score?: number;
};

function buildRoomMenuOptions(pageStatuses: PageStatusMap, isAdmin: boolean, isPaid: boolean, isSignedIn: boolean): SiteMenuOption[] {
  const primaryTargets: SiteMenuOption[] = [
    { value: "home", label: "Lobby Home" },
    { value: "pricing", label: "Plan & Pricing" },
    { value: "study-paths", label: "Credential Paths" },
    { value: "support", label: "Support & Teams" },
    ...(isSignedIn ? [] : [{ value: "checkout" as const, label: "Enroll Now" }])
  ];

  return primaryTargets.filter((item) => {
    if (item.value.startsWith("admin")) return false;
    return shouldShowInPublicNav(item.value, pageStatuses, isAdmin, isPaid);
  });
}

function SiteRoomNav({
  route,
  onNavigate,
  variant,
  pageStatuses
}: {
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
  variant: "header" | "workspace";
  pageStatuses: PageStatusMap;
}) {
  const { user, signOut } = useAuth();
  const { isPaid, isAdmin } = useAccess();
  const activeRoom = roomFromRoute(route);
  const commandMenuRef = useRef<HTMLDivElement | null>(null);
  const commandTriggerRef = useRef<HTMLButtonElement | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState("");
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const popoverId = `site-room-command-${variant}`;
  const menuOptions = useMemo<HeaderMenuOption[]>(() => {
    return buildHeaderMenuOptions({
      isSignedIn: Boolean(user),
      launchRoute: defaultGameRoomRoute(isPaid, isAdmin) as Extract<HeaderMenuValue, `app/${string}`>
    }).filter((item) => item.value === "__signout" || shouldShowInPublicNav(item.value, pageStatuses, isAdmin, isPaid));
  }, [isAdmin, isPaid, pageStatuses, user]);
  const visibleMenuOptions = useMemo(() => {
    const query = menuQuery.trim().toLowerCase();
    if (!query) return menuOptions;
    return menuOptions.filter((item) => {
      const haystack = [item.label, item.detail, item.badge, ...item.keywords].join(" ").toLowerCase();
      return haystack.includes(query);
    });
  }, [menuOptions, menuQuery]);
  const activeMenuOptionIndex = visibleMenuOptions[activeMenuIndex] ? activeMenuIndex : 0;
  const activeMenuOption = visibleMenuOptions[activeMenuOptionIndex] ?? null;
  const activeMenuOptionId = activeMenuOption ? `${popoverId}-option-${activeMenuOptionIndex}` : undefined;
  const visibleMenuCountLabel = `${visibleMenuOptions.length} destination${visibleMenuOptions.length === 1 ? "" : "s"}`;

  const signOutAndLand = async () => {
    await signOut();
    onNavigate("logout");
  };

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || commandMenuRef.current?.contains(target)) return;
      setIsMenuOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      window.setTimeout(() => commandTriggerRef.current?.focus(), 0);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    setMenuQuery("");
    setActiveMenuIndex(0);
    const focusTimer = window.setTimeout(() => commandInputRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [isMenuOpen]);

  useEffect(() => {
    setActiveMenuIndex(0);
  }, [menuQuery]);

  useEffect(() => {
    if (variant !== "header") return;
    const openOnCommandKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
      if (isTypingTarget(event.target)) return;
      event.preventDefault();
      setIsMenuOpen(true);
    };

    window.addEventListener("keydown", openOnCommandKey);
    return () => window.removeEventListener("keydown", openOnCommandKey);
  }, [variant]);

  const handleMenuChange = async (value: string) => {
    if (!value) return;
    if (value === "__signout") {
      await signOutAndLand();
      setIsMenuOpen(false);
      return;
    }
    onNavigate(value as AppRoute);
    setIsMenuOpen(false);
  };

  const handleMenuSearchKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setIsMenuOpen(false);
      window.setTimeout(() => commandTriggerRef.current?.focus(), 0);
      return;
    }

    if (!visibleMenuOptions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveMenuIndex((current) => (current + 1) % visibleMenuOptions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveMenuIndex((current) => (current - 1 + visibleMenuOptions.length) % visibleMenuOptions.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveMenuIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveMenuIndex(visibleMenuOptions.length - 1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void handleMenuChange(activeMenuOption?.value ?? "");
    }
  };

  return (
    <nav className={`site-room-nav site-room-nav-${variant} ${variant === "header" ? "public-nav" : "page-nav workspace-room-nav"}`} aria-label="Site room navigation">
      <div ref={commandMenuRef} className={`site-room-group site-room-group-compact ${activeRoom === "account" ? "is-active" : ""}`} aria-label="Menu">
        <span className="site-room-label">Menu</span>
        <button
          ref={commandTriggerRef}
          type="button"
          className="site-command-trigger"
          onClick={() => setIsMenuOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key !== "ArrowDown") return;
            event.preventDefault();
            setIsMenuOpen(true);
          }}
          aria-expanded={isMenuOpen}
          aria-controls={popoverId}
          aria-haspopup="dialog"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <span>Choose destination</span>
          <kbd>Ctrl K</kbd>
          <span aria-hidden="true">+</span>
        </button>
        <div id={popoverId} className={`site-command-popover ${isMenuOpen ? "open" : ""}`} role="dialog" aria-label="Choose destination" hidden={!isMenuOpen}>
          <label className="site-command-search-shell">
            <span>Destination Lens</span>
            <input
              ref={commandInputRef}
              className="site-command-search"
              value={menuQuery}
              onChange={(event) => setMenuQuery(event.target.value)}
              onKeyDown={handleMenuSearchKeyDown}
              placeholder="Search routes..."
              aria-label="Search destinations"
              aria-controls={`${popoverId}-results`}
              aria-activedescendant={activeMenuOptionId}
              aria-describedby={`${popoverId}-preview`}
            />
          </label>
          <div className="site-command-meta" aria-hidden="true">
            <span>{user ? "Member routes" : "Public routes"}</span>
            <kbd>{visibleMenuCountLabel}</kbd>
          </div>
          <div id={`${popoverId}-results`} className="site-command-results" role="listbox" aria-label="Destinations">
            {visibleMenuOptions.map((item, index) => {
              const isRouteActive = item.value !== "__signout" && route === item.value;
              const isKeyboardActive = index === activeMenuOptionIndex;
              return (
                <button
                  key={item.value}
                  id={`${popoverId}-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isKeyboardActive}
                  aria-current={isRouteActive ? "page" : undefined}
                  className={`${isRouteActive ? "active" : ""} ${isKeyboardActive ? "keyboard-active" : ""}`.trim()}
                  onMouseEnter={() => setActiveMenuIndex(index)}
                  onClick={() => void handleMenuChange(item.value)}
                >
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.detail}</small>
                  </span>
                  <em>{item.badge}</em>
                </button>
              );
            })}
          </div>
          {activeMenuOption ? (
            <aside id={`${popoverId}-preview`} className="site-command-preview" aria-live="polite">
              <span>{activeMenuOption.lane}</span>
              <strong>{activeMenuOption.label}</strong>
              <p>{activeMenuOption.preview}</p>
              <small>Enter opens this route. Escape returns to the page.</small>
            </aside>
          ) : null}
          {!visibleMenuOptions.length ? <p className="site-command-empty">No destination found. Try pricing, enroll, account, or launch.</p> : null}
        </div>
      </div>
    </nav>
  );
}

function WorkspaceShell({
  page,
  onNavigate,
  onRouteNavigate,
  pageStatuses,
  accountContent
}: {
  page: WorkspacePage;
  onNavigate: (page: WorkspacePage) => void;
  onRouteNavigate: (route: AppRoute) => void;
  pageStatuses: PageStatusMap;
  accountContent?: ReactNode;
}) {
  const { user, signOut } = useAuth();
  const { isAdmin, isPaid, profile } = useAccess();
  const isAccountPage = Boolean(accountContent);
  const isStarterPage = page === "starter" && !isAccountPage;
  const [section, setSection] = useState<WorkspaceSection>(() => sectionFromWorkspacePage(page));
  const [isHeroExpanded, setIsHeroExpanded] = useState(() => !accountContent);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [activeCommandIndex, setActiveCommandIndex] = useState(0);
  const [termCommandResults, setTermCommandResults] = useState<TerminologyCommandResult[]>([]);
  const [termCommandLoading, setTermCommandLoading] = useState(false);
  const commandRef = useRef<HTMLDivElement | null>(null);
  const commandTriggerRef = useRef<HTMLButtonElement | null>(null);
  const commandInputRef = useRef<HTMLInputElement | null>(null);
  const shouldCompactSingleRow = !isHeroExpanded || isAccountPage;
  const regionSlug = isRegionsPage(page) && page !== "regions" ? page.slice("regions/".length) : null;
  const grapeSlug = isGrapesPage(page) && page !== "grapes" ? page.slice("grapes/".length) : null;
  const aiWinecastSlug = isAiWinecastPage(page) && page !== "ai-winecast" ? page.slice("ai-winecast/".length) : null;
  const sectionItems = useMemo(
    () => workspaceNavItems.filter((item) => item.section === section && shouldShowInPublicNav(`app/${item.id}`, pageStatuses, isAdmin, isPaid)),
    [isAdmin, isPaid, pageStatuses, section]
  );
  const lobbyMenuOptions = useMemo(() => buildRoomMenuOptions(pageStatuses, isAdmin, isPaid, Boolean(user)), [isAdmin, isPaid, pageStatuses, user]);
  const menuSections = useMemo(
    () =>
      workspaceSections.map((item) => ({
        ...item,
        items: workspaceNavItems.filter(
          (navItem) => navItem.section === item.id && shouldShowInPublicNav(`app/${navItem.id}`, pageStatuses, isAdmin, isPaid)
        )
      })),
    [isAdmin, isPaid, pageStatuses]
  );
  const commandOptions = useMemo<WorkspaceCommandOption[]>(() => {
    const routeOptions: WorkspaceCommandOption[] = lobbyMenuOptions.map((item) => ({
      id: `route:${item.value}`,
      label: item.label,
      detail: item.value === "checkout" ? "Start enrollment" : "Lobby navigation",
      kind: "Lobby",
      shortcut: item.value === "home" ? "G H" : item.value === "pricing" ? "G P" : "Enroll",
      route: item.value
    }));

    const actionOptions: WorkspaceCommandOption[] = [
      {
        id: "action:launch-pad",
        label: "Launch Pad",
        detail: "Return to the workspace front door",
        kind: "Action",
        shortcut: "Esc",
        route: defaultGameRoomRoute(isPaid, isAdmin)
      },
      ...(user
        ? [
            {
              id: "action:dashboard",
              label: "Account Dashboard",
              detail: "Membership, progress, and settings",
              kind: "Action",
              shortcut: "Account",
              route: "account" as const
            },
            {
              id: "action:avatar",
              label: "Avatar Creator",
              detail: "Build and save your 8-bit Sip Studies character",
              kind: "Action",
              shortcut: "Profile",
              route: "account/avatar" as const
            },
            { id: "action:logout", label: "Log Out", detail: "End this session", kind: "Action", shortcut: "Exit", action: "logout" as const }
          ]
        : [{ id: "action:login", label: "Log In", detail: "Open account access", kind: "Action", shortcut: "Account", route: "login" as const }])
    ];

    const moduleOptions = menuSections.flatMap((menuSection) =>
      menuSection.items.map((item) => ({
        id: `module:${item.id}`,
        label: item.label,
        detail: item.signal,
        kind: menuSection.label,
        shortcut: menuSection.id === section ? "Ctrl Arrows" : "Shift Arrows",
        page: item.id
      }))
    );

    return [...actionOptions, ...routeOptions, ...moduleOptions];
  }, [isAdmin, isPaid, lobbyMenuOptions, menuSections, user]);
  const termCommandOptions = useMemo<WorkspaceCommandOption[]>(
    () =>
      termCommandResults.map((term) => ({
        id: `term:${term.id}`,
        label: term.term,
        detail: term.meaning,
        kind: "Sipopedia",
        shortcut: term.infographic_url ? "Term + Graphic" : "Term",
        termId: term.id,
        score: term.rank_score
      })),
    [termCommandResults]
  );
  const visibleCommandOptions = useMemo(() => {
    const query = commandQuery.trim().toLowerCase();
    const siteOptions = query
      ? commandOptions
          .filter((item) => `${item.label} ${item.detail} ${item.kind} ${item.shortcut ?? ""}`.toLowerCase().includes(query))
          .map((item) => ({
            ...item,
            score:
              item.label.toLowerCase() === query
                ? 95
                : item.label.toLowerCase().startsWith(query)
                  ? 75
                  : `${item.detail} ${item.kind}`.toLowerCase().includes(query)
                    ? 45
                    : 35
          }))
      : commandOptions.map((item) => ({ ...item, score: item.score ?? 25 }));
    return [...termCommandOptions, ...siteOptions]
      .sort((left, right) => (right.score ?? 0) - (left.score ?? 0) || left.label.localeCompare(right.label))
      .slice(0, 10);
  }, [commandOptions, commandQuery, termCommandOptions]);
  const activeSectionInfo = workspaceSections.find((item) => item.id === section) ?? workspaceSections[0];
  const activeWorkspaceItem = isStarterPage
    ? null
    : workspaceNavItems.find((item) =>
        item.id === "regions"
          ? isRegionsPage(page)
          : item.id === "grapes"
            ? isGrapesPage(page)
            : item.id === "ai-winecast"
              ? isAiWinecastPage(page)
              : item.id === page
      );
  const activeWorkspaceNavId: WorkspacePage =
    isRegionsPage(page) ? "regions" : isGrapesPage(page) ? "grapes" : isAiWinecastPage(page) ? "ai-winecast" : page;
  const currentModuleIndex = sectionItems.findIndex((item) => item.id === activeWorkspaceNavId);
  const activeModulePosition =
    currentModuleIndex >= 0 ? `${String(currentModuleIndex + 1).padStart(2, "0")} / ${String(sectionItems.length).padStart(2, "0")}` : `${sectionItems.length} routes`;
  const rawStarterName =
    profile?.displayName?.trim() ||
    (typeof user?.user_metadata?.display_name === "string" ? user.user_metadata.display_name.trim() : "") ||
    user?.email?.split("@")[0] ||
    "Guest";
  const starterWelcomeName = rawStarterName.split(/[\s._-]+/).filter(Boolean)[0] ?? "Guest";

  useEffect(() => {
    if (!activeWorkspaceItem) return;
    writeLastWorkspaceModule(activeWorkspaceItem.id);
  }, [activeWorkspaceItem?.id]);

  useEffect(() => {
    setSection(sectionFromWorkspacePage(page));
  }, [page]);

  useEffect(() => {
    setActiveCommandIndex(0);
  }, [commandQuery, isCommandOpen]);

  useEffect(() => {
    const query = commandQuery.trim();
    if (!isCommandOpen || query.length < 2) {
      setTermCommandResults([]);
      setTermCommandLoading(false);
      return;
    }

    let active = true;
    setTermCommandLoading(true);
    const timer = window.setTimeout(() => {
      searchTerminologyCommandResults(query, 10)
        .then((results) => {
          if (!active) return;
          setTermCommandResults(results);
        })
        .catch(() => {
          if (!active) return;
          setTermCommandResults([]);
        })
        .finally(() => {
          if (active) setTermCommandLoading(false);
        });
    }, 140);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [commandQuery, isCommandOpen]);

  useEffect(() => {
    if (activeCommandIndex < visibleCommandOptions.length) return;
    setActiveCommandIndex(Math.max(0, visibleCommandOptions.length - 1));
  }, [activeCommandIndex, visibleCommandOptions.length]);

  useEffect(() => {
    const onCommandKey = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "k") return;
      event.preventDefault();
      setIsCommandOpen(true);
      window.setTimeout(() => commandInputRef.current?.focus(), 0);
    };

    window.addEventListener("keydown", onCommandKey);
    return () => window.removeEventListener("keydown", onCommandKey);
  }, []);

  useEffect(() => {
    if (!isCommandOpen) return;

    const closeCommandPalette = () => {
      setIsCommandOpen(false);
      window.setTimeout(() => commandTriggerRef.current?.focus(), 0);
    };

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || commandRef.current?.contains(target)) return;
      closeCommandPalette();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeCommandPalette();
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        commandRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("keydown", trapFocus);
    window.setTimeout(() => commandInputRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [isCommandOpen]);

  useEffect(() => {
    if (isStarterPage || isAccountPage) return;

    const onWorkspaceKeyboardNav = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      const key = event.key;
      const isArrow = key === "ArrowLeft" || key === "ArrowRight";
      if (!isArrow && key !== "Escape") return;

      if (key === "Escape") {
        navigateFromMenu("starter");
        return;
      }

      const direction = key === "ArrowRight" ? 1 : -1;

      if (event.shiftKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        const nextSectionIndex = (workspaceSections.findIndex((item) => item.id === section) + direction + workspaceSections.length) % workspaceSections.length;
        switchSection(workspaceSections[nextSectionIndex].id);
        return;
      }

      if (event.ctrlKey && event.shiftKey && !event.altKey) {
        window.dispatchEvent(new CustomEvent(SUBFEATURE_EVENT, { detail: { direction } }));
        return;
      }

      if (event.ctrlKey && !event.shiftKey && !event.altKey) {
        if (sectionItems.length === 0 || currentModuleIndex < 0) return;
        event.preventDefault();
        const nextModuleIndex = (currentModuleIndex + direction + sectionItems.length) % sectionItems.length;
        navigateFromMenu(sectionItems[nextModuleIndex].id);
        return;
      }

      if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
        window.dispatchEvent(new CustomEvent(PAGE_FEATURE_EVENT, { detail: { direction } }));
      }
    };

    window.addEventListener("keydown", onWorkspaceKeyboardNav);
    return () => window.removeEventListener("keydown", onWorkspaceKeyboardNav);
  }, [currentModuleIndex, isAccountPage, isStarterPage, section, sectionItems]);

  const navigateFromMenu = (target: WorkspacePage) => {
    setIsHeroExpanded(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    preloadWorkspacePage(target);
    onNavigate(target);
  };

  const navigateFromRoomMenu = (target: AppRoute) => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    if (target.startsWith("app/")) {
      const targetPage = normalizeWorkspacePage(target.slice("app/".length));
      setIsHeroExpanded(targetPage === "starter");
      preloadWorkspacePage(targetPage);
    } else {
      setIsHeroExpanded(false);
    }
    onRouteNavigate(target);
  };

  const navigateToTerminologyTerm = (termId: string, termLabel: string) => {
    setIsHeroExpanded(false);
    preloadWorkspacePage("sipopedia");
    const params = new URLSearchParams({ term: termId, search: termLabel });
    window.history.pushState(null, "", `/#app/sipopedia?${params.toString()}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const switchSection = (targetSection: WorkspaceSection) => {
    setSection(targetSection);
    const foundSection = workspaceSections.find((item) => item.id === targetSection);
    const defaultTarget = foundSection?.defaultPage ?? "sip-academy";
    const targetItems = menuSections.find((item) => item.id === targetSection)?.items ?? [];
    const target = targetItems.find((item) => item.id === defaultTarget) ?? targetItems[0];
    if (target) navigateFromMenu(target.id);
  };

  const signOutAndLand = async () => {
    await signOut();
    onRouteNavigate("logout");
  };

  const runCommand = async (item: WorkspaceCommandOption) => {
    setIsCommandOpen(false);
    setCommandQuery("");
    if (item.action === "logout") {
      await signOutAndLand();
      return;
    }
    if (item.termId) {
      navigateToTerminologyTerm(item.termId, item.label);
      return;
    }
    if (item.page) {
      navigateFromMenu(item.page);
      return;
    }
    if (item.route) {
      navigateFromRoomMenu(item.route);
    }
  };

  const handleCommandInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (visibleCommandOptions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveCommandIndex((current) => (current + 1) % visibleCommandOptions.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveCommandIndex((current) => (current - 1 + visibleCommandOptions.length) % visibleCommandOptions.length);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setActiveCommandIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setActiveCommandIndex(visibleCommandOptions.length - 1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      void runCommand(visibleCommandOptions[activeCommandIndex]);
    }
  };

  const renderedPage =
    page === "starter" ? null : page === "sip-academy" ? (
      <SipAcademyWineLessons />
    ) : page === "sip-game" ? (
      <SipStudiosGame />
    ) : page === "sipopedia" ? (
      <Terminology />
    ) : page === "flavor-wheel" ? (
      <FlavorWheel />
    ) : page === "cellar-scanner" ? (
      <CellarScanner onNavigate={(target) => onRouteNavigate(target as AppRoute)} />
    ) : page === "tasting-journal" ? (
      <TastingJournal />
    ) : page === "flavors" ? (
      <Flavors />
    ) : page === "tasting-groups" ? (
      <TastingGroups />
    ) : page === "beverage-quiz" ? (
      <BeverageQuiz />
    ) : page === "study-sheets" ? (
      <StudySheets onNavigate={(target) => onRouteNavigate(target as AppRoute)} />
    ) : page === "service-roleplay" ? (
      <ServiceRoleplayLab onNavigate={(target) => onRouteNavigate(target as AppRoute)} />
    ) : page === "beverage-news" ? (
      <BeverageNews />
    ) : page === "flavor-blog" ? (
      <FlavorBlog />
    ) : page === "favorites" ? (
      <ArticleFavorites />
    ) : isAiWinecastPage(page) ? (
      <AiWinecast episodeSlug={aiWinecastSlug} onNavigate={(target) => onNavigate(target as WorkspacePage)} />
    ) : isRegionsPage(page) ? (
      <Regions regionSlug={regionSlug} onNavigate={(target) => onNavigate(target as WorkspacePage)} />
    ) : page === "maps" ? (
      <SipMaps />
    ) : isGrapesPage(page) ? (
      <Grapes grapeSlug={grapeSlug} onNavigate={(target) => onNavigate(target as WorkspacePage)} />
    ) : page === "cocktails" ? (
      <Cocktails />
    ) : page === "resources" ? (
      <WineResources />
    ) : page === "ai-news" ? (
      <AiNews />
    ) : (
      <SommEvents />
    );

  return (
    <section className={`workspace-shell ${isHeroExpanded ? "expanded-shell" : "compact-shell"}`}>
      <header className={`hero hero-brand ${isHeroExpanded ? "expanded" : "compact"} ${shouldCompactSingleRow ? "single-row" : ""}`}>
        <div className="hero-brand-full" aria-hidden={!isHeroExpanded}>
          <div className="hero-brand-expanded-layout">
            <div className="hero-brand-head">
              <img className="hero-welcome-panel" src={welcomeToSipStudies} alt="Welcome to Sip Studies" decoding="async" fetchPriority="high" />
              {!isStarterPage ? (
                <div className="hero-brand-copy" data-no-terminology-links>
                  <p className="hero-subtitle">Learn. Engage. Teach.</p>
                  <p>
                    Expand beverage knowledge
                    <br />
                    Connect culture with AI
                    <br />
                    Support communities through education
                    <br />
                    Strengthen clean water accessibility
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <nav className="workspace-command-deck sip-mission-control" aria-label="Sip Studies Menu">
        <section className="sip-nav-status-card" aria-label="Current destination">
          <span className="nav-overline">Sip Studies Mission Control</span>
          <h2>{isAccountPage ? "Account Dashboard" : isStarterPage ? "Launch Pad" : activeWorkspaceItem?.label ?? activeSectionInfo.label}</h2>
          <p>
            {isAccountPage
              ? "Manage profile, membership, progress, and support without leaving the workspace menu."
              : isStarterPage
                ? `Welcome, ${starterWelcomeName}. Pick a lane below or press Ctrl K to jump anywhere.`
                : `${activeSectionInfo.label} / ${activeModulePosition} - ${activeSectionInfo.description}`}
          </p>
        </section>

        <div className="sip-nav-section-switcher" aria-label="Study sections">
          {menuSections.map((menuSection) => (
            <button
              key={menuSection.id}
              type="button"
              aria-pressed={section === menuSection.id}
              className={section === menuSection.id ? "active" : ""}
              onClick={() => switchSection(menuSection.id)}
            >
              <span>{menuSection.label}</span>
              <small>{menuSection.items.length > 0 ? `${menuSection.items.length} modules` : "Locked"}</small>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>

        <div className="sip-nav-actions" aria-label="Primary menu actions">
          <button
            ref={commandTriggerRef}
            type="button"
            className="sip-nav-command-button"
            onClick={() => {
              setIsCommandOpen(true);
              window.setTimeout(() => commandInputRef.current?.focus(), 0);
            }}
            aria-expanded={isCommandOpen}
            aria-haspopup="dialog"
          >
            <span>Search</span>
            <kbd>Ctrl K</kbd>
          </button>
          <button type="button" className="sip-nav-action primary" onClick={() => navigateFromRoomMenu(defaultGameRoomRoute(isPaid, isAdmin))}>
            Launch Pad
          </button>
          <button type="button" className="sip-nav-action" onClick={() => navigateFromRoomMenu(user ? "account" : "login")}>
            {user ? "Dashboard" : "Log In"}
          </button>
          {user ? (
            <button type="button" className="sip-nav-action quiet" onClick={() => void signOutAndLand()}>
              Log Out
            </button>
          ) : null}
        </div>

        <section className="sip-nav-lobby-band" aria-label="Lobby Navigation">
          <span>Lobby</span>
          <div>
            {lobbyMenuOptions.map((item) => (
              <button key={item.value} type="button" onClick={() => navigateFromRoomMenu(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {menuSections.map((menuSection) =>
          section === menuSection.id ? (
            <section key={menuSection.id} className="sip-nav-module-band" aria-label={`${menuSection.label} modules`}>
              <div className="sip-nav-band-head">
                <span>{menuSection.label} Routes</span>
                <em>{menuSection.id === "learn" ? "Shift + Arrows section / Ctrl + Arrows module" : "Shift + Arrows section"}</em>
              </div>
              {menuSection.items.length > 0 ? (
                <div className="sip-nav-module-track">
                  {menuSection.items.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      className={activeWorkspaceNavId === item.id ? "active" : ""}
                      aria-current={activeWorkspaceNavId === item.id ? "page" : undefined}
                      onClick={() => navigateFromMenu(item.id)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <strong>{item.label}</strong>
                      <small>{item.signal}</small>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="sip-nav-empty-state">
                  <strong>{menuSection.label} modules are locked</strong>
                  <span>Use the lobby links, log in, or enroll to unlock the full study workspace.</span>
                </div>
              )}
            </section>
          ) : null
        )}

        {isCommandOpen ? (
          <div className="sip-command-palette open">
            <div ref={commandRef} className="sip-command-palette-panel" role="dialog" aria-modal="true" aria-label="Sip Search">
              <div className="sip-command-input-shell">
                <span>Ask / Jump</span>
                <input
                  ref={commandInputRef}
                  value={commandQuery}
                  onChange={(event) => setCommandQuery(event.target.value)}
                  onKeyDown={handleCommandInputKeyDown}
                  placeholder="Search pages, actions, and Sipopedia terms..."
                  aria-label="Search Sip Studies destinations"
                  aria-autocomplete="list"
                  aria-controls="sip-command-results"
                  aria-expanded={isCommandOpen}
                  aria-activedescendant={visibleCommandOptions[activeCommandIndex] ? `sip-command-option-${visibleCommandOptions[activeCommandIndex].id}` : undefined}
                  role="combobox"
                />
                <kbd>Esc</kbd>
              </div>
              <div id="sip-command-results" className="sip-command-results" role="listbox" aria-label="Search results">
                {visibleCommandOptions.length > 0 ? (
                  visibleCommandOptions.map((item, index) => (
                    <button
                      id={`sip-command-option-${item.id}`}
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={activeCommandIndex === index}
                      onMouseEnter={() => setActiveCommandIndex(index)}
                      onClick={() => void runCommand(item)}
                    >
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </span>
                      <em>{item.shortcut ?? item.kind}</em>
                    </button>
                  ))
                ) : (
                  <p>{termCommandLoading ? "Searching Sipopedia..." : "No destination or term found."}</p>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </nav>

      {isStarterPage ? (
        <StarterFeatureDemo
          headingLevel={1}
          pageStatuses={pageStatuses}
          isAdmin={isAdmin}
          onFeatureNavigate={(route) => navigateFromRoomMenu(route as AppRoute)}
        />
      ) : null}

      {isAccountPage ? accountContent : null}
      {!isStarterPage && !isAccountPage ? <Suspense fallback={<AppLoading />}>{renderedPage}</Suspense> : null}
    </section>
  );
}

function PublicHeader({
  onNavigate,
  route,
  pageStatuses
}: {
  onNavigate: (route: AppRoute) => void;
  route: AppRoute;
  pageStatuses: PageStatusMap;
}) {
  return (
    <header className="public-header">
      <button type="button" className="public-brand" onClick={() => onNavigate("home")}>
        <span className="public-brand-orb">
          <img src={mainLogo} alt="Sip Studies logo" className="workspace-seal" />
        </span>
        <span className="public-brand-lockup">
          <img src={wordmark} alt="Sip Studies wordmark" className="workspace-wordmark" />
        </span>
      </button>
      <SiteRoomNav route={route} onNavigate={onNavigate} variant="header" pageStatuses={pageStatuses} />
    </header>
  );
}

function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute());
  const [pageStatuses, setPageStatuses] = useState<PageStatusMap>(() => readPageStatusMap());
  const [pageStatusesReady, setPageStatusesReady] = useState(false);
  const [successAccessStatus, setSuccessAccessStatus] = useState<"idle" | "checking" | "checked" | "failed">("idle");
  const { loading: accessLoading, isPaid, isAdmin, refreshProfile } = useAccess();

  useEffect(() => {
    const onRouteChange = () => {
      setRoute(parseRoute());
    };
    window.addEventListener("hashchange", onRouteChange);
    window.addEventListener("popstate", onRouteChange);
    return () => {
      window.removeEventListener("hashchange", onRouteChange);
      window.removeEventListener("popstate", onRouteChange);
    };
  }, []);

  useEffect(() => {
    trackEvent("page_view", { route });
  }, [route]);

  useEffect(() => {
    if (route !== "success") {
      setSuccessAccessStatus("idle");
      return;
    }

    let active = true;
    setSuccessAccessStatus("checking");
    refreshProfile()
      .then(() => {
        if (active) setSuccessAccessStatus("checked");
      })
      .catch(() => {
        if (active) setSuccessAccessStatus("failed");
      });

    return () => {
      active = false;
    };
  }, [route]);

  useEffect(() => {
    const refreshPageStatuses = () => setPageStatuses(readPageStatusMap());
    window.addEventListener("storage", refreshPageStatuses);
    window.addEventListener(PAGE_STATUS_EVENT, refreshPageStatuses);
    return () => {
      window.removeEventListener("storage", refreshPageStatuses);
      window.removeEventListener(PAGE_STATUS_EVENT, refreshPageStatuses);
    };
  }, []);

  useEffect(() => {
    let active = true;
    void fetchPageStatusMap()
      .then((statuses) => {
        if (active) {
          setPageStatuses(statuses);
          setPageStatusesReady(true);
        }
      })
      .catch(() => {
        if (active) {
          setPageStatuses(readPageStatusMap());
          setPageStatusesReady(true);
        }
      });
    const unsubscribe = subscribeToPageStatusMap((statuses) => {
      if (active) setPageStatuses(statuses);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onAdminDoor = (event: KeyboardEvent) => {
      if (!isAdmin) return;
      if (!(event.ctrlKey && event.shiftKey)) return;
      const key = event.key.toLowerCase();
      if (key !== "b" && key !== "h") return;
      event.preventDefault();
      if (key === "b") {
        navigate("admin");
        return;
      }
      navigate("app/sip-academy");
    };
    window.addEventListener("keydown", onAdminDoor);
    return () => window.removeEventListener("keydown", onAdminDoor);
  }, [isAdmin, route]);

  const navigate = (next: AppRoute) => {
    const nextUrl = routeToUrl(next);
    trackEvent("route_navigate", { from: route, to: nextUrl });
    const currentUrl = `${window.location.pathname}${window.location.hash}`;
    if (currentUrl === nextUrl) {
      setRoute(next);
      return;
    }
    window.history.pushState(null, "", nextUrl);
    setRoute(next);
  };

  const navigateFromString = (next: string) => {
    const trimmedNext = next.trim().replace(/^#/, "");
    const queryIndex = trimmedNext.indexOf("?");
    const routePart = queryIndex >= 0 ? trimmedNext.slice(0, queryIndex) : trimmedNext;
    const queryPart = queryIndex >= 0 ? trimmedNext.slice(queryIndex + 1) : "";
    const normalizedRoute = normalizeLegacyHash(routePart);

    if (!queryPart) {
      navigate(normalizedRoute);
      return;
    }

    const nextUrl = `${routeToUrl(normalizedRoute)}?${queryPart}`;
    trackEvent("route_navigate", { from: route, to: nextUrl });
    const currentUrl = `${window.location.pathname}${window.location.hash}`;
    if (currentUrl === nextUrl) {
      setRoute(normalizedRoute);
      return;
    }
    window.history.pushState(null, "", nextUrl);
    setRoute(normalizedRoute);
  };

  const workspacePage = route.startsWith("app/") ? normalizeWorkspacePage(route.slice("app/".length)) : null;
  const checkoutRecoveryIntent = route === "success" || route === "cancel" ? readOnboardingIntent("pro") : null;
  const successIntent = route === "success" ? checkoutRecoveryIntent : null;
  const checkoutSessionId = successIntent?.sessionId;
  const successTargetRoute = paymentSuccessRoute(isPaid, isAdmin, successIntent?.next);
  const successTargetLabel = formatRouteLabel(successTargetRoute);
  const checkoutRecoveryRoute = checkoutRecoveryIntent
    ? buildOnboardingRoute("checkout", { planId: checkoutRecoveryIntent.planId, source: `${route}-recovery`, next: checkoutRecoveryIntent.next })
    : "checkout";
  const pricingRecoveryRoute = checkoutRecoveryIntent
    ? buildOnboardingRoute("pricing", { planId: checkoutRecoveryIntent.planId, source: `${route}-recovery`, next: checkoutRecoveryIntent.next })
    : "pricing";
  const requiresResolvedAccess =
    route.startsWith("admin") ||
    route === "account" ||
    route === "account/avatar" ||
    (workspacePage !== null && workspacePage !== "starter");

  if (!pageStatusesReady) {
    return (
      <div className="page page-commercial">
        <AppLoading />
      </div>
    );
  }

  if (accessLoading && requiresResolvedAccess) {
    return (
      <div className="page page-commercial">
        <AppLoading />
      </div>
    );
  }

  if (route.startsWith("admin") && !isAdmin) {
    return (
      <div className="page page-commercial">
        <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
        <section className="paywall-panel">
          <article className="paywall-card">
            <h1>Boss Room Locked</h1>
            <p>Admin privileges are required for this route. Visitor, free, and paid learner accounts stay outside the boss room.</p>
            <div className="paywall-actions">
              <button className="btn btn-primary" onClick={() => navigate("home")}>
                Back to Lobby
              </button>
              <button className="btn btn-light" onClick={() => navigate(defaultGameRoomRoute(isPaid, isAdmin))}>
                Open Available Room
              </button>
            </div>
          </article>
        </section>
      </div>
    );
  }

  if (route === "admin/terminology") {
    return (
      <div className="page page-commercial">
        <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
        <Suspense fallback={<AppLoading />}>
          <TerminologyAdmin />
        </Suspense>
      </div>
    );
  }

  if (route === "admin") {
    return (
      <div className="page page-commercial">
        <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
        <AdminConsole onNavigate={navigateFromString} />
      </div>
    );
  }

  if (workspacePage) {
    const starterPageAllowed = workspacePage === "starter";
    const workspaceRoute = `app/${workspacePage}`;
    const routeVisible = canViewRoute(workspaceRoute, pageStatuses, isAdmin, isPaid);
      if (!routeVisible) {
        return (
          <div className="page page-commercial">
            <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
            <PaywallPanel
              onNavigate={navigateFromString}
              postLoginRoute={route}
              pageStatuses={pageStatuses}
              isAdmin={isAdmin}
            />
          </div>
        );
      }
      if (!isPaid && !isAdmin && !starterPageAllowed) {
        return (
          <div className="page page-commercial">
            <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
            <PaywallPanel
              onNavigate={navigateFromString}
              postLoginRoute={route}
              pageStatuses={pageStatuses}
              isAdmin={isAdmin}
            />
          </div>
        );
      }

    const workspaceConfig = configForRoute(workspaceRoute, pageStatuses);
    const shouldAutolinkWorkspace =
      workspaceConfig.room === "Game" &&
      workspaceConfig.status === "public" &&
      workspacePage !== "starter" &&
      AUTOLINK_ALLOWED_WORKSPACE_PAGES.has(workspacePage);

    return (
      <div className={`page ${workspacePage === "starter" ? "page-commercial page-starter" : "page-workspace"}`}>
        <WorkspaceShell
          page={workspacePage}
          onNavigate={(target) => navigate(`app/${target}`)}
          onRouteNavigate={navigate}
          pageStatuses={pageStatuses}
        />
        {workspacePage === "starter" ? <PublicFooter onNavigate={navigateFromString} /> : null}
        {shouldAutolinkWorkspace ? <TerminologyAutoLinker route={route} /> : null}
      </div>
    );
  }

  if (route === "account" || route === "account/avatar") {
    return (
      <div className="page page-workspace">
        <WorkspaceShell
          page="starter"
          onNavigate={(target) => navigate(`app/${target}`)}
          onRouteNavigate={navigate}
          pageStatuses={pageStatuses}
          accountContent={
            route === "account/avatar" ? <AvatarCreator onNavigate={navigateFromString} /> : <AccountDashboard onNavigate={navigateFromString} />
          }
        />
      </div>
    );
  }

  if (!canViewRoute(route, pageStatuses, isAdmin, isPaid)) {
    return (
      <div className="page page-commercial">
        <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
        <section className="paywall-panel">
          <article className="paywall-card">
            <h1>Page Not Public</h1>
            <p>This page is currently staged for editing or turned off.</p>
            <div className="paywall-actions">
              <button className="btn btn-primary" onClick={() => navigate("home")}>
                Back Home
              </button>
              {isAdmin ? (
                <button className="btn btn-light" onClick={() => navigate("admin")}>
                  Open Site Map
                </button>
              ) : null}
            </div>
          </article>
        </section>
      </div>
    );
  }

  return (
    <div className="page page-commercial">
      <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
      {route === "home" ? (
        <MarketingHome
          onNavigate={navigateFromString}
          pageStatuses={pageStatuses}
          isAdmin={isAdmin}
        />
      ) : null}
      {route === "pricing" ? <PricingPage onNavigate={navigateFromString} /> : null}
      {route === "support" ? <SupportCenter onNavigate={navigateFromString} /> : null}
      {route === "study-paths" ? <StudyPaths onNavigate={navigateFromString} /> : null}
      {route === "checkout" ? <CheckoutPage onNavigate={navigateFromString} /> : null}
      {route === "powerful-point" ? <PowerfulPoint onNavigate={navigateFromString} /> : null}
      {route === "login" ? <AuthPanel /> : null}
      {route === "logout" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h1>You are signed out</h1>
            <p>Your session ended and private rooms are closed on this device. Continue in the lobby or sign back in.</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate("home")}>
              Lobby Home
            </button>
            <button className="btn btn-light" onClick={() => navigate("login")}>
              Log In
            </button>
          </div>
        </section>
      ) : null}
      {route === "not-found" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h1>We couldn't find that page</h1>
            <p>The address may be outdated or incomplete. Return to the lobby or open the Launch Pad to keep exploring.</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate("home")}>
              Lobby Home
            </button>
            <button className="btn btn-light" onClick={() => navigate("app/starter")}>
              Open Launch Pad
            </button>
          </div>
        </section>
      ) : null}
      {route === "terms" ? <PolicyPage kind="terms" onNavigate={navigateFromString} /> : null}
      {route === "privacy" ? <PolicyPage kind="privacy" onNavigate={navigateFromString} /> : null}
      {route === "refund" ? <PolicyPage kind="refund" onNavigate={navigateFromString} /> : null}
      {route === "success" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h1>Membership Checkout Complete</h1>
            <p>
              {isPaid || isAdmin
                ? "Your membership access is active. The saved room is ready."
                : "Your signed-in account is being updated. If webhook delivery is still pending, refresh access or use membership help."}
            </p>
            <div className="checkout-direct-status" role="status" aria-live="polite">
              {successAccessStatus === "checking"
                ? "Checking paid access for this account..."
                : successAccessStatus === "failed"
                  ? "Access refresh did not complete. Try again or request membership help."
                  : isPaid || isAdmin
                    ? "Access confirmed."
                    : "Checkout return received; access may still be processing."}
              {checkoutSessionId ? ` Session: ${checkoutSessionId.slice(0, 18)}...` : ""}
            </div>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate(successTargetRoute)}>
              Open {successTargetLabel}
            </button>
            <button
              className="btn btn-light"
              onClick={() => {
                setSuccessAccessStatus("checking");
                refreshProfile()
                  .then(() => setSuccessAccessStatus("checked"))
                  .catch(() => setSuccessAccessStatus("failed"));
              }}
            >
              Refresh Access
            </button>
            <button className="btn btn-light" onClick={() => navigateFromString(checkoutRecoveryRoute)}>
              Membership Help
            </button>
          </div>
        </section>
      ) : null}
      {route === "cancel" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h1>Membership Checkout Canceled</h1>
            <p>No charge was applied. Your account step and saved destination are still preserved, so you can retry the $10/month membership checkout or ask for help without losing context.</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigateFromString(checkoutRecoveryRoute)}>
              Retry Membership Checkout
            </button>
            <button className="btn btn-light" onClick={() => navigateFromString(checkoutRecoveryRoute)}>
              Membership Support
            </button>
            <button className="btn btn-light" onClick={() => navigateFromString(pricingRecoveryRoute)}>
              View Membership Details
            </button>
          </div>
        </section>
      ) : null}
      <PublicFooter onNavigate={navigateFromString} />
    </div>
  );
}

export default App;

