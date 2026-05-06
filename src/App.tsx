import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
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
import { AdminConsole } from "./components/AdminConsole";
import { PublicFooter } from "./components/PublicFooter";
import { StarterFeatureDemo } from "./components/StarterFeatureDemo";
import { TerminologyAutoLinker } from "./components/TerminologyAutoLinker";
import { PowerfulPoint } from "./components/PowerfulPoint";
import {
  PAGE_STATUS_EVENT,
  type PageStatusMap,
  canViewRoute,
  configForRoute,
  readPageStatusMap,
  shouldShowInPublicNav
} from "./lib/siteMap";

const loadSipAcademyWineLessons = () => import("./components/SipAcademyWineLessons");
const loadSipStudiosGame = () => import("./components/SipStudiosGame");
const loadFlavorWheel = () => import("./components/FlavorWheel");
const loadBeverageQuiz = () => import("./components/BeverageQuiz");
const loadBeverageNews = () => import("./components/BeverageNews");
const loadTerminology = () => import("./components/Terminology");
const loadTerminologyAdmin = () => import("./components/TerminologyAdmin");
const loadTastingJournal = () => import("./components/TastingJournal");
const loadFlavors = () => import("./components/Flavors");
const loadTastingGroups = () => import("./components/TastingGroups");
const loadFlavorBlog = () => import("./components/FlavorBlog");
const loadRegions = () => import("./components/Regions");
const loadSipMaps = () => import("./components/SipMaps");
const loadGrapes = () => import("./components/Grapes");
const loadCocktails = () => import("./components/Cocktails");
const loadWineResources = () => import("./components/WineResources");
const loadSommEvents = () => import("./components/SommEvents");
const loadAiNews = () => import("./components/AiNews");
const loadAiWinecast = () => import("./components/AiWinecast");

const SipAcademyWineLessons = lazy(() =>
  loadSipAcademyWineLessons().then((module) => ({ default: module.SipAcademyWineLessons }))
);
const SipStudiosGame = lazy(() => loadSipStudiosGame().then((module) => ({ default: module.SipStudiosGame })));
const FlavorWheel = lazy(() => loadFlavorWheel().then((module) => ({ default: module.FlavorWheel })));
const BeverageQuiz = lazy(() => loadBeverageQuiz().then((module) => ({ default: module.BeverageQuiz })));
const BeverageNews = lazy(() => loadBeverageNews().then((module) => ({ default: module.BeverageNews })));
const Terminology = lazy(() => loadTerminology().then((module) => ({ default: module.Terminology })));
const TerminologyAdmin = lazy(() => loadTerminologyAdmin().then((module) => ({ default: module.TerminologyAdmin })));
const TastingJournal = lazy(() => loadTastingJournal().then((module) => ({ default: module.TastingJournal })));
const Flavors = lazy(() => loadFlavors().then((module) => ({ default: module.Flavors })));
const TastingGroups = lazy(() => loadTastingGroups().then((module) => ({ default: module.TastingGroups })));
const FlavorBlog = lazy(() => loadFlavorBlog().then((module) => ({ default: module.FlavorBlog })));
const Regions = lazy(() => loadRegions().then((module) => ({ default: module.Regions })));
const SipMaps = lazy(() => loadSipMaps().then((module) => ({ default: module.SipMaps })));
const Grapes = lazy(() => loadGrapes().then((module) => ({ default: module.Grapes })));
const Cocktails = lazy(() => loadCocktails().then((module) => ({ default: module.Cocktails })));
const WineResources = lazy(() => loadWineResources().then((module) => ({ default: module.WineResources })));
const SommEvents = lazy(() => loadSommEvents().then((module) => ({ default: module.SommEvents })));
const AiNews = lazy(() => loadAiNews().then((module) => ({ default: module.AiNews })));
const AiWinecast = lazy(() => loadAiWinecast().then((module) => ({ default: module.AiWinecast })));

type RegionsPage = "regions" | `regions/${string}`;
type GrapesPage = "grapes" | `grapes/${string}`;
type AiWinecastPage = "ai-winecast" | `ai-winecast/${string}`;
type WorkspacePage =
  | "starter"
  | "sip-academy"
  | "sip-game"
  | "sipopedia"
  | "flavor-wheel"
  | "tasting-journal"
  | "flavors"
  | "tasting-groups"
  | "beverage-quiz"
  | "beverage-news"
  | "flavor-blog"
  | AiWinecastPage
  | RegionsPage
  | "maps"
  | GrapesPage
  | "cocktails"
  | "resources"
  | "ai-news"
  | "somm-events";

type PublicRoute = "home" | "pricing" | "checkout" | "powerful-point" | "login" | "logout" | "account" | "terms" | "privacy" | "refund" | "success" | "cancel";
type AdminRoute = "admin" | "admin/terminology";
type AppRoute = PublicRoute | AdminRoute | `app/${WorkspacePage}`;
type BrandTier = "sip-studios" | "ai-rnd" | "somm-support";
type WorkspaceSection = "learn" | "taste" | "connect";
type WorkspaceSectionItem = { id: WorkspaceSection; label: string; description: string; defaultPage: WorkspacePage };
type SiteRoom = "lobby" | "game" | "boss" | "account";
const PAGE_FEATURE_EVENT = "sipstudies:navigate-page-feature";
const SUBFEATURE_EVENT = "sipstudies:navigate-subfeature";
const STARTER_NAV_TUTORIAL_DISMISS_KEY = "sipstudies:starter-nav-tutorial-dismissed:v1";

type WorkspaceNavItem = {
  id: WorkspacePage;
  label: string;
  section: WorkspaceSection;
  signal: string;
};

const workspaceSections: WorkspaceSectionItem[] = [
  { id: "learn", label: "Learn", description: "Academy routes, game drills, maps, and terminology.", defaultPage: "sip-academy" },
  { id: "taste", label: "Taste", description: "Sensory calibration, tasting notes, and review loops.", defaultPage: "flavor-wheel" },
  { id: "connect", label: "Connect", description: "Industry feeds, cohorts, AI research, and event pages.", defaultPage: "beverage-news" }
];

const workspaceNavItems: WorkspaceNavItem[] = [
  { id: "sip-academy", label: "Sip Academy", section: "learn", signal: "Guided wine lessons" },
  { id: "sip-game", label: "Sip Game", section: "learn", signal: "Practice room" },
  { id: "sipopedia", label: "Sipopedia", section: "learn", signal: "Terms and citations" },
  { id: "beverage-quiz", label: "Beverage Quiz", section: "learn", signal: "Fast recall checks" },
  { id: "regions", label: "Regions", section: "learn", signal: "Global map atlas" },
  { id: "maps", label: "Maps", section: "learn", signal: "AI wine cartography" },
  { id: "grapes", label: "Grapes & Grains", section: "learn", signal: "Base ingredients" },
  { id: "cocktails", label: "Bev Recipes", section: "learn", signal: "Cocktail and beer maps" },
  { id: "resources", label: "Resources", section: "learn", signal: "Reference lists" },
  { id: "flavor-wheel", label: "Flavor Wheel", section: "taste", signal: "Aroma calibration" },
  { id: "tasting-journal", label: "Journal Archive", section: "taste", signal: "Saved tasting data" },
  { id: "flavors", label: "Tasting Journal", section: "taste", signal: "Structured notes" },
  { id: "beverage-news", label: "Beverage News", section: "connect", signal: "Live industry radar" },
  { id: "flavor-blog", label: "Flavor Blog", section: "connect", signal: "Sip Studies essays" },
  { id: "ai-winecast", label: "Ai Winecast", section: "connect", signal: "AI wine podcast" },
  { id: "tasting-groups", label: "Tasting Groups", section: "connect", signal: "Cohort discovery" },
  { id: "ai-news", label: "AI News", section: "connect", signal: "Research and ops" },
  { id: "somm-events", label: "Somm Events", section: "connect", signal: "Event link studio" }
];

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
  if (hash === "" || hash === "home") return "home";
  if (hash === "pricing") return "pricing";
  if (hash === "checkout") return "checkout";
  if (hash === "powerful-point") return "powerful-point";
  if (hash === "login") return "login";
  if (hash === "logout") return "logout";
  if (hash === "account") return "account";
  if (hash === "terms") return "terms";
  if (hash === "privacy") return "privacy";
  if (hash === "refund") return "refund";
  if (hash === "success") return "success";
  if (hash === "cancel") return "cancel";
  if (hash === "admin") return "admin";
  if (hash === "admin/terminology" || hash === "terminology-admin") return "admin/terminology";

  if (hash.startsWith("app/")) {
    const page = hash.slice("app/".length);
    return `app/${normalizeWorkspacePage(page)}`;
  }

  return `app/${normalizeWorkspacePage(hash)}`;
}

function normalizeWorkspacePage(value: string): WorkspacePage {
  if (value === "starter" || value === "start" || value === "launch") return "starter";
  if (value === "home") return "starter";
  if (value === "sip-academy") return "sip-academy";
  if (value === "sip-game") return "sip-game";
  if (value === "sipopedia" || value === "terminology") return "sipopedia";
  if (value === "flavor-wheel") return "flavor-wheel";
  if (value === "flavors") return "flavors";
  if (value === "tasting-journal" || value === "flavor-journal") return "tasting-journal";
  if (value === "tasting-groups") return "tasting-groups";
  if (value === "beverage-quiz") return "beverage-quiz";
  if (value === "beverage-news") return "beverage-news";
  if (value === "flavor-blog" || value === "flavor-blog-posts") return "flavor-blog";
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
  if (route === "login" || route === "logout" || route === "account") return "account";
  return "lobby";
}

function defaultGameRoomRoute(isPaid: boolean, isAdmin: boolean): AppRoute {
  void isPaid;
  void isAdmin;
  return "app/starter";
}

function paymentSuccessRoute(isPaid: boolean, isAdmin: boolean): AppRoute {
  void isPaid;
  void isAdmin;
  return "app/starter";
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "OPTION";
}

function brandTierFromWorkspacePage(page: WorkspacePage): BrandTier {
  if (page === "ai-news") return "ai-rnd";
  if (page === "somm-events") return "somm-support";
  return "sip-studios";
}

function sectionFromWorkspacePage(page: WorkspacePage): WorkspaceSection {
  if (page === "flavor-wheel" || page === "flavors" || page === "tasting-journal") return "taste";
  if (page === "beverage-news" || page === "flavor-blog" || isAiWinecastPage(page) || page === "tasting-groups" || page === "ai-news" || page === "somm-events") return "connect";
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
  if (target === "beverage-news") {
    void loadBeverageNews();
    return;
  }
  if (target === "flavor-blog") {
    void loadFlavorBlog();
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

type SiteRoomNavGroup = {
  id: SiteRoom;
  label: string;
  items: {
    label: string;
    route: AppRoute;
  }[];
};

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
  const gameRoute = defaultGameRoomRoute(isPaid, isAdmin);
  const activeRoom = roomFromRoute(route);
  const roomGroups: SiteRoomNavGroup[] = [
    {
      id: "game",
      label: "Navigation",
      items: [
        { label: "Home", route: "home" },
        { label: "Pricing", route: "pricing" },
        { label: "Enroll", route: "checkout" },
        { label: "Powerful Point", route: "powerful-point" },
        { label: "Launch Deck", route: gameRoute }
      ]
    }
  ];

  const visibleRoomGroups = roomGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => shouldShowInPublicNav(item.route, pageStatuses, isAdmin, isPaid))
    }))
    .filter((group) => group.items.length > 0);

  const signOutAndLand = async () => {
    await signOut();
    onNavigate("logout");
  };

  const [menuValue, setMenuValue] = useState("");

  const menuOptions = visibleRoomGroups.flatMap((group) =>
    group.items.map((item) => ({
      value: item.route,
      label: `${item.label}`
    }))
  );

  const accountOptions = user
    ? [
        { value: "account", label: "Account Dashboard" },
        { value: "__signout", label: "Sign out" }
      ]
    : [{ value: "login", label: "Sign in" }];

  const handleMenuChange = async (value: string) => {
    if (!value) return;
    if (value === "__signout") {
      await signOutAndLand();
      setMenuValue("");
      return;
    }
    onNavigate(value as AppRoute);
    setMenuValue("");
  };

  return (
    <nav className={`site-room-nav site-room-nav-${variant} ${variant === "header" ? "public-nav" : "page-nav workspace-room-nav"}`} aria-label="Site room navigation">
      <div className={`site-room-group site-room-group-compact ${activeRoom === "account" ? "is-active" : ""}`} aria-label="Menu">
        <span className="site-room-label">Menu</span>
        <select
          className="site-room-select"
          value={menuValue}
          onChange={(event) => void handleMenuChange(event.target.value)}
          aria-label="Open navigation menu"
        >
          <option value="">Choose destination</option>
          {menuOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
          {accountOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
}

function WorkspaceShell({
  page,
  onNavigate,
  onRouteNavigate,
  pageStatuses
}: {
  page: WorkspacePage;
  onNavigate: (page: WorkspacePage) => void;
  onRouteNavigate: (route: AppRoute) => void;
  pageStatuses: PageStatusMap;
}) {
  const { user, signOut } = useAuth();
  const { isAdmin, isPaid, profile } = useAccess();
  const brandTier = useMemo(() => brandTierFromWorkspacePage(page), [page]);
  const isStarterPage = page === "starter";
  const [section, setSection] = useState<WorkspaceSection>(() => sectionFromWorkspacePage(page));
  const [isHeroExpanded, setIsHeroExpanded] = useState(true);
  const [isBrandDrawerOpen, setIsBrandDrawerOpen] = useState(false);
  const [showNavTutorial, setShowNavTutorial] = useState(false);
  const [hideNavTutorialForever, setHideNavTutorialForever] = useState(false);
  const brandMenuRef = useRef<HTMLDivElement | null>(null);
  const shouldCompactSingleRow = !isHeroExpanded;
  const regionSlug = isRegionsPage(page) && page !== "regions" ? page.slice("regions/".length) : null;
  const grapeSlug = isGrapesPage(page) && page !== "grapes" ? page.slice("grapes/".length) : null;
  const aiWinecastSlug = isAiWinecastPage(page) && page !== "ai-winecast" ? page.slice("ai-winecast/".length) : null;
  const sectionItems = useMemo(
    () => workspaceNavItems.filter((item) => item.section === section && shouldShowInPublicNav(`app/${item.id}`, pageStatuses, isAdmin, isPaid)),
    [isAdmin, isPaid, pageStatuses, section]
  );
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
  const rawStarterName =
    profile?.displayName?.trim() ||
    (typeof user?.user_metadata?.display_name === "string" ? user.user_metadata.display_name.trim() : "") ||
    user?.email?.split("@")[0] ||
    "Guest";
  const starterWelcomeName = rawStarterName.split(/[\s._-]+/).filter(Boolean)[0] ?? "Guest";

  useEffect(() => {
    setSection(sectionFromWorkspacePage(page));
  }, [page]);

  useEffect(() => {
    if (!isBrandDrawerOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || brandMenuRef.current?.contains(target)) return;
      setIsBrandDrawerOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isBrandDrawerOpen]);

  useEffect(() => {
    if (!isStarterPage) {
      setShowNavTutorial(false);
      return;
    }
    const dismissed = window.localStorage.getItem(STARTER_NAV_TUTORIAL_DISMISS_KEY) === "1";
    if (!dismissed) {
      setShowNavTutorial(true);
    }
  }, [isStarterPage]);

  useEffect(() => {
    if (isStarterPage) return;

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

      if (event.altKey && !event.ctrlKey && !event.shiftKey) {
        event.preventDefault();
        const brandOrder: BrandTier[] = ["sip-studios", "ai-rnd", "somm-support"];
        const nextBrandIndex = (brandOrder.indexOf(brandTier) + direction + brandOrder.length) % brandOrder.length;
        switchBrandTier(brandOrder[nextBrandIndex]);
        return;
      }

      if (event.ctrlKey && event.shiftKey && !event.altKey) {
        event.preventDefault();
        const nextSectionIndex = (workspaceSections.findIndex((item) => item.id === section) + direction + workspaceSections.length) % workspaceSections.length;
        switchSection(workspaceSections[nextSectionIndex].id);
        return;
      }

      if (event.shiftKey && !event.ctrlKey && !event.altKey) {
        if (sectionItems.length === 0 || currentModuleIndex < 0) return;
        event.preventDefault();
        const nextModuleIndex = (currentModuleIndex + direction + sectionItems.length) % sectionItems.length;
        navigateFromMenu(sectionItems[nextModuleIndex].id);
        return;
      }

      if (event.ctrlKey && !event.shiftKey && !event.altKey) {
        window.dispatchEvent(new CustomEvent(SUBFEATURE_EVENT, { detail: { direction } }));
        return;
      }

      if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
        window.dispatchEvent(new CustomEvent(PAGE_FEATURE_EVENT, { detail: { direction } }));
      }
    };

    window.addEventListener("keydown", onWorkspaceKeyboardNav);
    return () => window.removeEventListener("keydown", onWorkspaceKeyboardNav);
  }, [brandTier, currentModuleIndex, isStarterPage, section, sectionItems]);

  const navigateFromMenu = (target: WorkspacePage) => {
    setIsHeroExpanded(false);
    setIsBrandDrawerOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    preloadWorkspacePage(target);
    onNavigate(target);
  };

  const switchBrandTier = (target: BrandTier) => {
    if (target === "sip-studios") {
      navigateFromMenu("sip-academy");
      return;
    }
    if (target === "ai-rnd") {
      navigateFromMenu("ai-news");
      return;
    }
    navigateFromMenu("somm-events");
  };

  const switchToHomeHero = () => {
    setIsHeroExpanded(true);
    setIsBrandDrawerOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    preloadWorkspacePage("starter");
    onNavigate("starter");
  };

  const navigateFromRoomMenu = (target: AppRoute) => {
    setIsBrandDrawerOpen(false);
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

  const switchSection = (targetSection: WorkspaceSection) => {
    setSection(targetSection);
    const foundSection = workspaceSections.find((item) => item.id === targetSection);
    navigateFromMenu(foundSection?.defaultPage ?? "sip-academy");
  };

  const signOutAndLand = async () => {
    await signOut();
    onRouteNavigate("logout");
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
    ) : page === "tasting-journal" ? (
      <TastingJournal />
    ) : page === "flavors" ? (
      <Flavors />
    ) : page === "tasting-groups" ? (
      <TastingGroups />
    ) : page === "beverage-quiz" ? (
      <BeverageQuiz />
    ) : page === "beverage-news" ? (
      <BeverageNews />
    ) : page === "flavor-blog" ? (
      <FlavorBlog />
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

      <div ref={brandMenuRef} className={`floating-brand-menu ${isBrandDrawerOpen ? "open" : "closed"}`} aria-label="Sip Studies house brands">
        <article className="brand-switcher-card">
          <button
            type="button"
            className="brand-drawer-toggle"
            onClick={() => {
              if (isBrandDrawerOpen) {
                setIsBrandDrawerOpen(false);
                return;
              }
              setIsBrandDrawerOpen(true);
            }}
            aria-expanded={isBrandDrawerOpen}
            aria-controls="floating-house-brands-list"
            aria-label={isBrandDrawerOpen ? "Close house brand switcher" : "Open house brand switcher"}
          >
            <img className="brand-drawer-home-logo" src={wordmark} alt="Sip Studies text logo" decoding="async" />
          </button>
          <div id="floating-house-brands-list" className={`house-brands-list ${isBrandDrawerOpen ? "open" : "closed"}`}>
            <div className="nav-command-stack">
              <label className="nav-command-field">
                <span>Global</span>
                <select
                  defaultValue=""
                  onChange={(event) => {
                    const target = event.target.value;
                    if (!target) return;
                    if (target === "logout") {
                      void signOutAndLand();
                      event.currentTarget.value = "";
                      return;
                    }
                    navigateFromRoomMenu(target as AppRoute);
                    event.currentTarget.value = "";
                  }}
                  aria-label="Global navigation"
                >
                  <option value="">Quick jump...</option>
                  <option value="home">Lobby Home</option>
                  <option value="pricing">Plan & Pricing</option>
                  <option value="checkout">Enroll Now</option>
                  <option value="powerful-point">Powerful Point</option>
                  <option value={defaultGameRoomRoute(isPaid, isAdmin)}>Launch Deck</option>
                </select>
              </label>

              <label className="nav-command-field">
                <span>Brand <em>Alt + {"\u2190 \u2192"}</em></span>
                <select
                  defaultValue={isStarterPage ? "sip-studies" : brandTier}
                  onChange={(event) => {
                    const target = event.target.value;
                    if (target === "sip-studies") {
                      switchToHomeHero();
                      return;
                    }
                    switchBrandTier(target as BrandTier);
                  }}
                  aria-label="Brand navigation"
                >
                  <option value="sip-studies">Launch Deck</option>
                  <option value="sip-studios">Sip Studios</option>
                  <option value="ai-rnd">Ai RnD</option>
                  <option value="somm-support">Somm Support</option>
                </select>
              </label>

              {!isStarterPage ? (
                <>
                  <label className="nav-command-field">
                    <span>Section <em>Ctrl+Shift + {"\u2190 \u2192"}</em></span>
                    <select value={section} onChange={(event) => switchSection(event.target.value as WorkspaceSection)} aria-label="Section navigation">
                      {workspaceSections.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="nav-command-field">
                    <span>Module <em>Shift + {"\u2190 \u2192"}</em></span>
                    <select value={activeWorkspaceNavId} onChange={(event) => navigateFromMenu(event.target.value as WorkspacePage)} aria-label="Module navigation">
                      {sectionItems.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </>
              ) : null}

              <div className="nav-command-field nav-command-account-actions" aria-label="Account actions">
                <span>Account</span>
                <div className="nav-command-account-buttons">
                  {user ? (
                    <>
                      <button type="button" className="btn btn-light" onClick={() => navigateFromRoomMenu("account")}>
                        Dashboard
                      </button>
                      <button type="button" className="btn btn-light" onClick={() => void signOutAndLand()}>
                        Logout
                      </button>
                    </>
                  ) : (
                    <button type="button" className="btn btn-light" onClick={() => navigateFromRoomMenu("login")}>
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      {isStarterPage ? (
        <div className="workspace-command-split" aria-label="Welcome deck command row">
          <div className="workspace-command-status workspace-command-card">
            <span className="nav-overline">Navigation Guide</span>
            <h2>
              Welcome <span className="launch-welcome-name">{starterWelcomeName}</span>!
            </h2>
            <p>Explore the launch deck below, then tap into the full Sip Academy experience when you are ready.</p>
          </div>
          <article className="workspace-command-account-preview workspace-command-card" aria-label="Account dashboard preview">
            <span className="nav-overline">Account Dashboard</span>
            <h3>Track your growth in one place</h3>
            <p>Review achievements, manage membership settings, and control your data tools as new features launch.</p>
            <div className="workspace-command-account-preview-actions">
              <button type="button" className="btn btn-light" onClick={() => navigateFromRoomMenu("account")}>
                Open Dashboard
              </button>
            </div>
          </article>
        </div>
      ) : (
        <div className="workspace-command-deck" aria-label="Sip Studies navigation command deck">
          <div className="workspace-command-topline">
            <div className="workspace-command-status">
              <span className="nav-overline">Navigation Command</span>
              <h2>{activeWorkspaceItem?.label ?? activeSectionInfo.label}</h2>
              <p>{`${activeSectionInfo.label}: ${activeSectionInfo.description}`}</p>
            </div>
          </div>
        </div>
      )}

      {isStarterPage ? <StarterFeatureDemo onFeatureNavigate={(route) => navigateFromRoomMenu(route as AppRoute)} /> : null}

      {isStarterPage && showNavTutorial ? (
        <div className="starter-nav-modal-backdrop" role="presentation">
          <section className="starter-nav-modal" role="dialog" aria-modal="true" aria-label="Keyboard navigation tutorial">
            <h3>Keyboard Navigation Tips</h3>
            <p>Use these shortcuts to move quickly around Sip Studies.</p>
            <ul>
              <li>`Alt + ←/→` Brand</li>
              <li>`Ctrl + Shift + ←/→` Section</li>
              <li>`Shift + ←/→` Module</li>
              <li>`←/→` Page Feature</li>
              <li>`Ctrl + ←/→` Subpage Feature</li>
              <li>`Esc` Return to Starter Preview</li>
            </ul>
            <label className="starter-nav-modal-checkbox">
              <input type="checkbox" checked={hideNavTutorialForever} onChange={(event) => setHideNavTutorialForever(event.target.checked)} />
              Don&apos;t show this again
            </label>
            <div className="starter-nav-modal-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (hideNavTutorialForever) {
                    window.localStorage.setItem(STARTER_NAV_TUTORIAL_DISMISS_KEY, "1");
                  }
                  setShowNavTutorial(false);
                }}
              >
                Got it
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {!isStarterPage ? <Suspense fallback={<AppLoading />}>{renderedPage}</Suspense> : null}
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
  const { loading: accessLoading, isPaid, isAdmin } = useAccess();

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
    const refreshPageStatuses = () => setPageStatuses(readPageStatusMap());
    window.addEventListener("storage", refreshPageStatuses);
    window.addEventListener(PAGE_STATUS_EVENT, refreshPageStatuses);
    return () => {
      window.removeEventListener("storage", refreshPageStatuses);
      window.removeEventListener(PAGE_STATUS_EVENT, refreshPageStatuses);
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
    navigate(normalizeLegacyHash(next));
  };

  const workspacePage = route.startsWith("app/") ? normalizeWorkspacePage(route.slice("app/".length)) : null;

  if (accessLoading) {
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
            <h2>Boss Room Locked</h2>
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
          <PaywallPanel onNavigate={navigateFromString} />
        </div>
      );
    }
    if (!isPaid && !isAdmin && !starterPageAllowed) {
      return (
        <div className="page page-commercial">
          <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
          <PaywallPanel onNavigate={navigateFromString} />
        </div>
      );
    }

    const workspaceConfig = configForRoute(workspaceRoute, pageStatuses);
    const shouldAutolinkWorkspace = workspaceConfig.room === "Game" && workspaceConfig.status === "public" && workspacePage !== "starter";

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

  if (!canViewRoute(route, pageStatuses, isAdmin, isPaid)) {
    return (
      <div className="page page-commercial">
        <PublicHeader onNavigate={navigate} route={route} pageStatuses={pageStatuses} />
        <section className="paywall-panel">
          <article className="paywall-card">
            <h2>Page Not Public</h2>
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
      {route === "home" ? <MarketingHome onNavigate={navigateFromString} /> : null}
      {route === "pricing" ? <PricingPage onNavigate={navigateFromString} /> : null}
      {route === "checkout" ? <CheckoutPage onNavigate={navigateFromString} /> : null}
      {route === "powerful-point" ? <PowerfulPoint onNavigate={navigateFromString} /> : null}
      {route === "login" ? <AuthPanel /> : null}
      {route === "account" ? <AccountDashboard onNavigate={navigateFromString} /> : null}
      {route === "logout" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h2>You are signed out</h2>
            <p>Your session ended and private rooms are closed on this device. Continue in the lobby or sign back in.</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate("home")}>
              Lobby Home
            </button>
            <button className="btn btn-light" onClick={() => navigate("login")}>
              Sign In
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
            <h2>Payment Received</h2>
            <p>{isPaid || isAdmin ? "Your access is active. The game room is ready." : "Your payment handoff is processing. If webhook delivery is still pending, start in the lobby preview and refresh after confirmation."}</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate(paymentSuccessRoute(isPaid, isAdmin))}>
              Open Launch Deck
            </button>
            <button className="btn btn-light" onClick={() => navigate("checkout")}>
              Enrollment Help
            </button>
          </div>
        </section>
      ) : null}
      {route === "cancel" ? (
        <section className="checkout-page">
          <header className="section-header">
            <h2>Checkout Canceled</h2>
            <p>No charge was applied. You can restart enrollment when ready.</p>
          </header>
          <div className="checkout-links">
            <button className="btn btn-primary" onClick={() => navigate("checkout")}>
              Retry Checkout
            </button>
            <button className="btn btn-light" onClick={() => navigate("pricing")}>
              Compare Plans
            </button>
          </div>
        </section>
      ) : null}
      <PublicFooter onNavigate={navigateFromString} />
    </div>
  );
}

export default App;

