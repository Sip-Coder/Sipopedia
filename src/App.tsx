import { useEffect, useMemo, useState } from "react";
import { SipAcademyWineLessons } from "./components/SipAcademyWineLessons";
import { FlavorWheel } from "./components/FlavorWheel";
import { BeverageQuiz } from "./components/BeverageQuiz";
import { BeverageNews } from "./components/BeverageNews";
import { Terminology } from "./components/Terminology";
import { TerminologyAdmin } from "./components/TerminologyAdmin";
import { TastingJournal } from "./components/TastingJournal";
import { TastingGroups } from "./components/TastingGroups";
import { Regions } from "./components/Regions";
import { SommEvents } from "./components/SommEvents";
import { AiNews } from "./components/AiNews";
import mainLogo from "./assets/brand/sip-studies-main-logo.png";
import wordmark from "./assets/brand/wordmark-ruthligos.png";
import aiRnDLogo from "./assets/brand/logo-ai-rnd.png";
import sommSupportLogo from "./assets/brand/logo-somm-support.png";
import sipStudiosLogo from "./assets/brand/logo-sip-studios.png";

type RegionsPage = "regions" | `regions/${string}`;
type SipStudiosTab =
  | "sip-academy"
  | "sipopedia"
  | "flavor-wheel"
  | "tasting-journal"
  | "tasting-groups"
  | "beverage-quiz"
  | "beverage-news"
  | RegionsPage;
type AppPage = SipStudiosTab | "ai-news" | "somm-events" | "terminology-admin";
type BrandTier = "sip-studios" | "ai-rnd" | "somm-support";
type SipStudiosSection = "learn" | "taste" | "connect";
type SipStudiosSectionItem = { id: SipStudiosSection; label: string; defaultPage: SipStudiosTab };
type SipStudiosNavItem = { id: SipStudiosTab; label: string; section: SipStudiosSection };

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
  if (page === "tasting-journal" || page === "flavor-wheel") return "taste";
  if (page === "tasting-groups" || page === "beverage-news") return "connect";
  return "learn";
}

function pageFromHash(): AppPage {
  if (typeof window === "undefined") {
    return "sip-academy";
  }
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "sip-academy" || hash === "home") return "sip-academy";
  if (hash === "sipopedia" || hash === "terminology") return "sipopedia";
  if (hash === "flavor-wheel") return "flavor-wheel";
  if (hash === "tasting-journal" || hash === "flavor-journal") return "tasting-journal";
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

function App() {
  const initialPage = pageFromHash();
  const initialHash = typeof window === "undefined" ? "" : window.location.hash.replace(/^#/, "");
  const [page, setPage] = useState<AppPage>(initialPage);
  const [sipStudiosSection, setSipStudiosSection] = useState<SipStudiosSection>(() =>
    sipStudiosSectionFromPage(initialPage)
  );
  const [isHomeHeroExpanded, setIsHomeHeroExpanded] = useState<boolean>(() =>
    initialHash === "" || initialHash === "home" || initialHash === "sip-academy"
  );
  const brandTier = brandTierFromPage(page);

  useEffect(() => {
    const onHashChange = () => {
      const nextHash = window.location.hash.replace(/^#/, "");
      setPage(pageFromHash());
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

  const switchBrandTier = (target: BrandTier) => {
    setIsHomeHeroExpanded(false);
    if (target === "sip-studios") {
      switchPage("sip-academy");
      return;
    }
    if (target === "ai-rnd") {
      switchPage("ai-news");
      return;
    }
    switchPage("somm-events");
  };

  const switchSipStudiosSection = (sectionId: SipStudiosSection) => {
    setIsHomeHeroExpanded(false);
    setSipStudiosSection(sectionId);
    const section = sipStudiosSections.find((item) => item.id === sectionId);
    if (section) switchPage(section.defaultPage);
  };

  const switchToHomeHero = () => {
    setIsHomeHeroExpanded(true);
    if (typeof window !== "undefined") {
      const currentHash = window.location.hash.replace(/^#/, "");
      if (currentHash !== "home") {
        window.location.hash = "home";
      } else {
        setPage("sip-academy");
      }
    }
  };

  const sipStudiosSectionTabs = useMemo(
    () => sipStudiosNavItems.filter((item) => item.section === sipStudiosSection),
    [sipStudiosSection]
  );

  return (
    <div className="page">
      <header className={`hero hero-brand ${isHomeHeroExpanded ? "expanded" : "compact"}`}>
        <div className="hero-brand-full" aria-hidden={!isHomeHeroExpanded}>
          <div className="hero-brand-head">
            <img className="hero-brand-seal" src={mainLogo} alt="Sip Studies logo" />
            <div className="hero-brand-copy">
              <img className="hero-wordmark" src={wordmark} alt="Sip Studies wordmark in Ruthligos style" />
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
                  aria-label="Open Sip Studios"
                  aria-pressed={brandTier === "sip-studios"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={sipStudiosLogo} alt="" />
                </button>
                <button
                  type="button"
                  className={`brand-house-btn ${brandTier === "ai-rnd" ? "active" : ""}`}
                  onClick={() => switchBrandTier("ai-rnd")}
                  aria-label="Open Ai RnD"
                  aria-pressed={brandTier === "ai-rnd"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={aiRnDLogo} alt="" />
                </button>
                <button
                  type="button"
                  className={`brand-house-btn ${brandTier === "somm-support" ? "active" : ""}`}
                  onClick={() => switchBrandTier("somm-support")}
                  aria-label="Open Somm Support"
                  aria-pressed={brandTier === "somm-support"}
                  disabled={!isHomeHeroExpanded}
                >
                  <img src={sommSupportLogo} alt="" />
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
            <img className="hero-brand-seal hero-brand-seal-compact" src={mainLogo} alt="Sip Studies logo" />
            <img className="hero-wordmark hero-wordmark-compact" src={wordmark} alt="Sip Studies" />
          </button>
          <div className="hero-brand-compact-house">
            <p className="hero-brand-compact-label">Brand House</p>
            <div className="hero-brand-compact-tabs">
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "sip-studios" ? "active" : ""}`}
                onClick={() => switchBrandTier("sip-studios")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Sip Studios"
              >
                <img src={sipStudiosLogo} alt="" />
              </button>
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "ai-rnd" ? "active" : ""}`}
                onClick={() => switchBrandTier("ai-rnd")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Ai RnD"
              >
                <img src={aiRnDLogo} alt="" />
              </button>
              <button
                type="button"
                className={`brand-house-tab ${brandTier === "somm-support" ? "active" : ""}`}
                onClick={() => switchBrandTier("somm-support")}
                disabled={isHomeHeroExpanded}
                aria-label="Open Somm Support"
              >
                <img src={sommSupportLogo} alt="" />
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
                  onClick={() => {
                    setIsHomeHeroExpanded(false);
                    switchPage(item.id);
                  }}
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
            onClick={() => {
              setIsHomeHeroExpanded(false);
              switchPage("ai-news");
            }}
          >
            News
          </button>
        </nav>
      ) : (
        <nav className="page-nav page-nav-sub" aria-label="Somm Support tabs">
          <button
            className={`btn ${page === "somm-events" ? "btn-primary" : "btn-light"}`}
            onClick={() => {
              setIsHomeHeroExpanded(false);
              switchPage("somm-events");
            }}
          >
            Events
          </button>
        </nav>
      )}

      {page === "sip-academy" ? (
        <SipAcademyWineLessons />
      ) : page === "flavor-wheel" ? (
        <FlavorWheel />
      ) : page === "beverage-quiz" ? (
        <BeverageQuiz />
      ) : page === "beverage-news" ? (
        <BeverageNews />
      ) : isRegionsPage(page) ? (
        <Regions regionSlug={regionSlugFromPage(page)} onNavigate={switchPage} />
      ) : page === "sipopedia" ? (
        <Terminology />
      ) : page === "tasting-journal" ? (
        <TastingJournal />
      ) : page === "tasting-groups" ? (
        <TastingGroups />
      ) : page === "ai-news" ? (
        <AiNews />
      ) : page === "somm-events" ? (
        <SommEvents />
      ) : (
        <TerminologyAdmin />
      )}
    </div>
  );
}

export default App;
