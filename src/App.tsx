import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import mainLogo from "./assets/brand/sip-studies-main-logo-opt.webp";
import wordmark from "./assets/brand/wordmark-ruthligos-opt.webp";
import aiRnDLogo from "./assets/brand/logo-ai-rnd-opt.webp";
import sommSupportLogo from "./assets/brand/logo-somm-support-opt.webp";
import sipStudiosLogo from "./assets/brand/logo-sip-studios-opt.webp";
import { trackEvent } from "./lib/analytics";

const loadSipAcademyWineLessons = () => import("./components/SipAcademyWineLessons");
const loadFlavorWheel = () => import("./components/FlavorWheel");
const loadBeverageQuiz = () => import("./components/BeverageQuiz");
const loadBeverageNews = () => import("./components/BeverageNews");
const loadTerminology = () => import("./components/Terminology");
const loadTerminologyAdmin = () => import("./components/TerminologyAdmin");
const loadTastingJournal = () => import("./components/TastingJournal");
const loadFlavors = () => import("./components/Flavors");
const loadTastingGroups = () => import("./components/TastingGroups");
const loadRegions = () => import("./components/Regions");
const loadSommEvents = () => import("./components/SommEvents");
const loadAiNews = () => import("./components/AiNews");

const SipAcademyWineLessons = lazy(() =>
  loadSipAcademyWineLessons().then((module) => ({ default: module.SipAcademyWineLessons }))
);
const FlavorWheel = lazy(() => loadFlavorWheel().then((module) => ({ default: module.FlavorWheel })));
const BeverageQuiz = lazy(() => loadBeverageQuiz().then((module) => ({ default: module.BeverageQuiz })));
const BeverageNews = lazy(() => loadBeverageNews().then((module) => ({ default: module.BeverageNews })));
const Terminology = lazy(() => loadTerminology().then((module) => ({ default: module.Terminology })));
const TerminologyAdmin = lazy(() => loadTerminologyAdmin().then((module) => ({ default: module.TerminologyAdmin })));
const TastingJournal = lazy(() => loadTastingJournal().then((module) => ({ default: module.TastingJournal })));
const Flavors = lazy(() => loadFlavors().then((module) => ({ default: module.Flavors })));
const TastingGroups = lazy(() => loadTastingGroups().then((module) => ({ default: module.TastingGroups })));
const Regions = lazy(() => loadRegions().then((module) => ({ default: module.Regions })));
const SommEvents = lazy(() => loadSommEvents().then((module) => ({ default: module.SommEvents })));
const AiNews = lazy(() => loadAiNews().then((module) => ({ default: module.AiNews })));

type RegionsPage = "regions" | `regions/${string}`;
type SipStudiosTab =
  | "sip-academy"
  | "sipopedia"
  | "flavor-wheel"
  | "tasting-journal"
  | "flavors"
  | "tasting-groups"
  | "beverage-quiz"
  | "beverage-news"
  | RegionsPage;
type AppPage = SipStudiosTab | "ai-news" | "somm-events" | "terminology-admin";
type BrandTier = "sip-studios" | "ai-rnd" | "somm-support";
type SipStudiosSection = "learn" | "taste" | "connect";
type SipStudiosSectionItem = { id: SipStudiosSection; label: string; defaultPage: SipStudiosTab };
type SipStudiosNavItem = { id: SipStudiosTab; label: string; section: SipStudiosSection };
type MenuSource = "brand-house" | "section-nav" | "sub-nav" | "content-nav";

const sipStudiosSections: SipStudiosSectionItem[] = [
  { id: "learn", label: "Learn", defaultPage: "sip-academy" },
  { id: "taste", label: "Taste", defaultPage: "tasting-journal" },
  { id: "connect", label: "Connect", defaultPage: "tasting-groups" }
];

const sipStudiosNavItems: SipStudiosNavItem[] = [
  { id: "sip-academy", label: "Sip Academy", section: "learn" },
  { id: "sipopedia", label: "Sipopedia", section: "learn" },
  { id: "beverage-quiz", label: "Beverage Quiz", section: "learn" },
  { id: "regions", label: "Regions", section: "learn" },
  { id: "tasting-journal", label: "Flavor Journal", section: "taste" },
  { id: "flavors", label: "Flavors", section: "taste" },
  { id: "flavor-wheel", label: "Flavor Wheel", section: "taste" },
  { id: "tasting-groups", label: "Tasting Groups", section: "connect" },
  { id: "beverage-news", label: "Beverage News", section: "connect" }
];

function isRegionsPage(page: AppPage): page is RegionsPage {
  return page === "regions" || page.startsWith("regions/");
}

function regionSlugFromPage(page: AppPage): string | null {
  if (!isRegionsPage(page) || page === "regions") return null;
  const slug = page.slice("regions/".length).trim();
  return slug ? slug : null;
}

function sipStudiosSectionFromPage(page: AppPage): SipStudiosSection {
  if (page === "tasting-journal" || page === "flavors" || page === "flavor-wheel") return "taste";
  if (page === "tasting-groups" || page === "beverage-news") return "connect";
  return "learn";
}

function isKnownHash(hash: string): boolean {
  if (
    hash === "" ||
    hash === "home" ||
    hash === "sip-academy" ||
    hash === "sipopedia" ||
    hash === "terminology" ||
    hash === "flavor-wheel" ||
    hash === "tasting-journal" ||
    hash === "flavors" ||
    hash === "flavor-journal" ||
    hash === "tasting-groups" ||
    hash === "beverage-quiz" ||
    hash === "beverage-news" ||
    hash === "regions" ||
    hash === "ai-news" ||
    hash === "somm-events" ||
    hash === "somm-news" ||
    hash === "terminology-admin"
  ) {
    return true;
  }
  return hash.startsWith("regions/");
}

function pageFromHash(hashValue?: string): AppPage {
  if (typeof window === "undefined" && !hashValue) {
    return "sip-academy";
  }
  const hash = (hashValue ?? window.location.hash.replace(/^#/, "")).trim();
  if (hash === "sip-academy" || hash === "home") return "sip-academy";
  if (hash === "sipopedia" || hash === "terminology") return "sipopedia";
  if (hash === "flavor-wheel") return "flavor-wheel";
  if (hash === "tasting-journal" || hash === "flavor-journal") return "tasting-journal";
  if (hash === "flavors") return "flavors";
  if (hash === "tasting-groups") return "tasting-groups";
  if (hash === "beverage-quiz") return "beverage-quiz";
  if (hash === "beverage-news") return "beverage-news";
  if (hash === "regions") return "regions";
  if (hash.startsWith("regions/")) return hash as RegionsPage;
  if (hash === "ai-news") return "ai-news";
  if (hash === "somm-events" || hash === "somm-news") return "somm-events";
  return hash === "terminology-admin" ? "terminology-admin" : "sip-academy";
}

function brandTierFromPage(page: AppPage): BrandTier {
  if (page === "ai-news") return "ai-rnd";
  if (page === "somm-events") return "somm-support";
  return "sip-studios";
}

function hashForPage(page: AppPage): string {
  if (page === "sip-academy") return "sip-academy";
  if (page === "sipopedia") return "sipopedia";
  if (page === "flavor-wheel") return "flavor-wheel";
  if (page === "tasting-journal") return "flavor-journal";
  if (page === "flavors") return "flavors";
  if (page === "tasting-groups") return "tasting-groups";
  if (page === "beverage-quiz") return "beverage-quiz";
  if (page === "beverage-news") return "beverage-news";
  if (isRegionsPage(page)) return page;
  if (page === "ai-news") return "ai-news";
  if (page === "somm-events") return "somm-events";
  return "terminology-admin";
}

function isHomeHash(hash: string): boolean {
  return hash === "" || hash === "home";
}

function preloadPage(target: AppPage): void {
  if (target === "sip-academy") {
    void loadSipAcademyWineLessons();
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
  if (target === "ai-news") {
    void loadAiNews();
    return;
  }
  if (target === "somm-events") {
    void loadSommEvents();
    return;
  }
  if (target === "terminology-admin") {
    void loadTerminologyAdmin();
    return;
  }
  void loadRegions();
}

function AppShellLoading() {
  return (
    <section className="app-shell-state app-shell-loading" role="status" aria-live="polite">
      <h3>Loading module...</h3>
      <p>Preparing your next Sip Studies workspace.</p>
    </section>
  );
}

function AppShellUnavailable({ onHome }: { onHome: () => void }) {
  return (
    <section className="app-shell-state app-shell-empty">
      <h3>Page unavailable</h3>
      <p>This route could not be resolved. Return to Sip Academy to continue.</p>
      <button type="button" className="btn btn-primary" onClick={onHome}>
        Go to Sip Academy
      </button>
    </section>
  );
}

function App() {
  const initialHash = typeof window === "undefined" ? "" : window.location.hash.replace(/^#/, "");
  const [page, setPage] = useState<AppPage>(pageFromHash(initialHash));
  const [sipStudiosSection, setSipStudiosSection] = useState<SipStudiosSection>(() =>
    sipStudiosSectionFromPage(pageFromHash(initialHash))
  );
  const [isHomeHeroExpanded, setIsHomeHeroExpanded] = useState<boolean>(() =>
    initialHash === "" || initialHash === "home" || initialHash === "sip-academy"
  );
  const brandTier = brandTierFromPage(page);

  useEffect(() => {
    const canonicalHash = hashForPage(page);
    trackEvent("page_view", { page, brandTier, hash: canonicalHash });
    preloadPage(page);
  }, [brandTier, page]);

  useEffect(() => {
    const redirectInvalidHash = (hash: string) => {
      trackEvent("invalid_hash_redirected", { hash, fallback: "sip-academy" });
      window.location.hash = "sip-academy";
    };

    const initialCurrentHash = window.location.hash.replace(/^#/, "");
    if (initialCurrentHash && !isKnownHash(initialCurrentHash)) {
      redirectInvalidHash(initialCurrentHash);
      return;
    }

    const onHashChange = () => {
      const nextHash = window.location.hash.replace(/^#/, "");
      if (nextHash && !isKnownHash(nextHash)) {
        redirectInvalidHash(nextHash);
        return;
      }
      setPage(pageFromHash(nextHash));
      if (isHomeHash(nextHash)) {
        setIsHomeHeroExpanded(true);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (brandTier !== "sip-studios") return;
    setSipStudiosSection(sipStudiosSectionFromPage(page));
  }, [brandTier, page]);

  const switchPage = (target: AppPage) => {
    const nextHash = hashForPage(target);
    if (window.location.hash.replace(/^#/, "") === nextHash) {
      setPage(target);
      return;
    }
    window.location.hash = nextHash;
  };

  const collapseHeroAndScrollToTop = () => {
    setIsHomeHeroExpanded(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const navigateFromMenu = (target: AppPage, source: MenuSource) => {
    trackEvent("menu_navigate", {
      source,
      fromPage: page,
      targetPage: target,
      brandTier,
      section: brandTier === "sip-studios" ? sipStudiosSection : "n/a"
    });
    collapseHeroAndScrollToTop();
    preloadPage(target);
    switchPage(target);
  };

  const switchBrandTier = (target: BrandTier) => {
    if (target === "sip-studios") {
      navigateFromMenu("sip-academy", "brand-house");
      return;
    }
    if (target === "ai-rnd") {
      navigateFromMenu("ai-news", "brand-house");
      return;
    }
    navigateFromMenu("somm-events", "brand-house");
  };

  const switchSipStudiosSection = (sectionId: SipStudiosSection) => {
    setSipStudiosSection(sectionId);
    const section = sipStudiosSections.find((item) => item.id === sectionId);
    if (section) {
      navigateFromMenu(section.defaultPage, "section-nav");
    }
  };

  const switchToHomeHero = () => {
    trackEvent("home_hero_expanded", { fromPage: page, brandTier });
    setIsHomeHeroExpanded(true);
    const currentHash = window.location.hash.replace(/^#/, "");
    if (currentHash !== "home") {
      window.location.hash = "home";
    } else {
      setPage("sip-academy");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  };

  const switchFromContent = (target: AppPage) => {
    trackEvent("content_navigate", { fromPage: page, targetPage: target });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    preloadPage(target);
    switchPage(target);
  };

  const sipStudiosSectionTabs = useMemo(
    () => sipStudiosNavItems.filter((item) => item.section === sipStudiosSection),
    [sipStudiosSection]
  );

  const renderedPage =
    page === "sip-academy" ? (
      <SipAcademyWineLessons />
    ) : page === "flavor-wheel" ? (
      <FlavorWheel />
    ) : page === "beverage-quiz" ? (
      <BeverageQuiz />
    ) : page === "beverage-news" ? (
      <BeverageNews />
    ) : isRegionsPage(page) ? (
      <Regions regionSlug={regionSlugFromPage(page)} onNavigate={switchFromContent} />
    ) : page === "sipopedia" ? (
      <Terminology />
    ) : page === "tasting-journal" ? (
      <TastingJournal />
    ) : page === "flavors" ? (
      <Flavors />
    ) : page === "tasting-groups" ? (
      <TastingGroups />
    ) : page === "ai-news" ? (
      <AiNews />
    ) : page === "somm-events" ? (
      <SommEvents />
    ) : page === "terminology-admin" ? (
      <TerminologyAdmin />
    ) : (
      <AppShellUnavailable onHome={() => switchFromContent("sip-academy")} />
    );

  return (
    <div className="page">
      <header className={`hero hero-brand ${isHomeHeroExpanded ? "expanded" : "compact"}`}>
        <div className="hero-brand-full" aria-hidden={!isHomeHeroExpanded}>
          <div className="hero-brand-head">
            <img
              className="hero-brand-seal"
              src={mainLogo}
              alt="Sip Studies logo"
              decoding="async"
              fetchPriority="high"
            />
            <div className="hero-brand-copy">
              <img className="hero-wordmark" src={wordmark} alt="Sip Studies wordmark in Ruthligos style" decoding="async" />
              <p className="hero-subtitle">Learn. Engage. Teach.</p>
              <p>
                Expand beverage knowledge, connect culture with AI, and support communities through education that
                strengthens clean water accessibility.
              </p>
            </div>
          </div>

          <div className="hero-brand-house-row" aria-label="Sip Studies brand house">
            <article className="hero-logos-card">
              <h2>Brand House</h2>
              <div className="hero-logo-row">
                <button
                  type="button"
                  className={`brand-house-btn ${brandTier === "sip-studios" ? "active" : ""}`}
                  onClick={() => switchBrandTier("sip-studios")}
                  onMouseEnter={() => preloadPage("sip-academy")}
                  onFocus={() => preloadPage("sip-academy")}
                  aria-label="Open Sip Studios"
                  aria-pressed={brandTier === "sip-studios"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={sipStudiosLogo} alt="" decoding="async" />
                </button>
                <button
                  type="button"
                  className={`brand-house-btn ${brandTier === "ai-rnd" ? "active" : ""}`}
                  onClick={() => switchBrandTier("ai-rnd")}
                  onMouseEnter={() => preloadPage("ai-news")}
                  onFocus={() => preloadPage("ai-news")}
                  aria-label="Open Ai RnD"
                  aria-pressed={brandTier === "ai-rnd"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={aiRnDLogo} alt="" decoding="async" />
                </button>
                <button
                  type="button"
                  className={`brand-house-btn ${brandTier === "somm-support" ? "active" : ""}`}
                  onClick={() => switchBrandTier("somm-support")}
                  onMouseEnter={() => preloadPage("somm-events")}
                  onFocus={() => preloadPage("somm-events")}
                  aria-label="Open Somm Support"
                  aria-pressed={brandTier === "somm-support"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={sommSupportLogo} alt="" decoding="async" />
                </button>
              </div>
            </article>
          </div>
        </div>

        <div className="hero-brand-compact" aria-hidden={isHomeHeroExpanded}>
          <button
            type="button"
            className="hero-brand-home-trigger"
            onClick={switchToHomeHero}
            disabled={isHomeHeroExpanded}
            aria-label="Open full home header"
          >
            <img className="hero-brand-seal hero-brand-seal-compact" src={mainLogo} alt="Sip Studies logo" decoding="async" />
            <img className="hero-wordmark hero-wordmark-compact" src={wordmark} alt="Sip Studies" decoding="async" />
          </button>
          <div className="hero-brand-compact-house">
            <p className="hero-brand-compact-label">Brand House</p>
            <div className="hero-brand-compact-tabs">
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "sip-studios" ? "active" : ""}`}
                onClick={() => switchBrandTier("sip-studios")}
                onMouseEnter={() => preloadPage("sip-academy")}
                onFocus={() => preloadPage("sip-academy")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Sip Studios"
              >
                <img src={sipStudiosLogo} alt="" decoding="async" />
              </button>
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "ai-rnd" ? "active" : ""}`}
                onClick={() => switchBrandTier("ai-rnd")}
                onMouseEnter={() => preloadPage("ai-news")}
                onFocus={() => preloadPage("ai-news")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Ai RnD"
              >
                <img src={aiRnDLogo} alt="" decoding="async" />
              </button>
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "somm-support" ? "active" : ""}`}
                onClick={() => switchBrandTier("somm-support")}
                onMouseEnter={() => preloadPage("somm-events")}
                onFocus={() => preloadPage("somm-events")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Somm Support"
              >
                <img src={sommSupportLogo} alt="" decoding="async" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {brandTier === "sip-studios" ? (
        <>
          <nav className="page-nav page-nav-tier" aria-label="Sip Studios sections">
            {sipStudiosSections.map((section) => (
              <button
                key={section.id}
                className={`btn ${sipStudiosSection === section.id ? "btn-primary" : "btn-light"}`}
                onClick={() => switchSipStudiosSection(section.id)}
                onMouseEnter={() => preloadPage(section.defaultPage)}
                onFocus={() => preloadPage(section.defaultPage)}
              >
                {section.label}
              </button>
            ))}
          </nav>
          <nav className="page-nav page-nav-sub" aria-label={`${sipStudiosSection} tabs`}>
            {sipStudiosSectionTabs.map((item) => {
              const active = item.id === "regions" ? isRegionsPage(page) : page === item.id;
              return (
                <button
                  key={item.id}
                  className={`btn ${active ? "btn-primary" : "btn-light"}`}
                  onClick={() => navigateFromMenu(item.id, "sub-nav")}
                  onMouseEnter={() => preloadPage(item.id)}
                  onFocus={() => preloadPage(item.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </>
      ) : brandTier === "ai-rnd" ? (
        <nav className="page-nav page-nav-sub" aria-label="Ai RnD tabs">
          <button
            className={`btn ${page === "ai-news" ? "btn-primary" : "btn-light"}`}
            onClick={() => navigateFromMenu("ai-news", "sub-nav")}
            onMouseEnter={() => preloadPage("ai-news")}
            onFocus={() => preloadPage("ai-news")}
          >
            News
          </button>
        </nav>
      ) : (
        <nav className="page-nav page-nav-sub" aria-label="Somm Support tabs">
          <button
            className={`btn ${page === "somm-events" ? "btn-primary" : "btn-light"}`}
            onClick={() => navigateFromMenu("somm-events", "sub-nav")}
            onMouseEnter={() => preloadPage("somm-events")}
            onFocus={() => preloadPage("somm-events")}
          >
            Events
          </button>
        </nav>
      )}

      <Suspense fallback={<AppShellLoading />}>{renderedPage}</Suspense>
    </div>
  );
}

export default App;
