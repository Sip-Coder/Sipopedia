import { useEffect, useMemo, useRef, useState, type TouchEvent } from "react";
import {
  allRegionCountries,
  continentLabels,
  continentOrder,
  regionCategoryStudyLabels,
  regionBeverageCategoryLabels,
  regionBeverageCategoryOrder,
  regionCountriesByBeverage,
  resolveRegionBeverageCategory,
  type ContinentId,
  type RegionCountry,
  type RegionBeverageCategoryId
} from "../data/regions";
import { getCountryMapSource } from "../data/mapSources";
import { getRegionAssetEntry } from "../data/regionAssetManifest";
import { getCountrySubregionGuide, type CountrySubregionGuide, type SubregionStudyPage } from "../data/regionSubpages";
import { countryMapAssetPath, countryMapDownloadName } from "../lib/countryMaps";
import { VineyardPanoramaViewer, type VineyardPanoramaScene } from "./VineyardPanoramaViewer";

type RegionsProps = {
  regionSlug: string | null;
  onNavigate: (page: "regions" | `regions/${string}`) => void;
};

type ParsedLocationLine = {
  label: string | null;
  text: string;
  isBullet: boolean;
};

function parseLocationLines(location: string): ParsedLocationLine[] {
  return location
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const isBullet = line.startsWith("- ");
      const content = isBullet ? line.slice(2).trim() : line;
      const colonIndex = content.indexOf(":");

      if (colonIndex > 0) {
        const label = content.slice(0, colonIndex).trim();
        const text = content.slice(colonIndex + 1).trim();
        return { label, text, isBullet };
      }

      return { label: null, text: content, isBullet };
    });
}

function toContinentAnchor(continent: ContinentId): string {
  return `continent-${continent}`;
}

function slugifyRegionRoute(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function buildMajorRegionStudyPage(
  country: RegionCountry,
  category: RegionBeverageCategoryId,
  region: RegionCountry["profile"]["majorRegions"][number]
): SubregionStudyPage {
  const commodity = regionBeverageCategoryLabels[category].toLowerCase();
  const isWine = category === "wine";
  const regionSlug = slugifyRegionRoute(region.region);
  const generatedAsset = getRegionAssetEntry(category, country.slug, regionSlug);
  const generatedPanorama = generatedAsset?.panoramaUrl;

  return {
    slug: regionSlug,
    name: region.region,
    parentRegion: country.name,
    classification: `${region.region} is a main ${regionBeverageCategoryLabels[category]} study region in ${country.name}.`,
    examWeight: isWine ? "high" : "medium",
    imageUrl: generatedAsset?.imageUrl ?? generatedPanorama ?? region.imageUrl,
    imageAlt: `${region.region} ${commodity} source landscape`,
    imageStatus: generatedPanorama ? "generated" : "queued",
    imagePrompt:
      `Hyper-realistic documentary ${commodity} source panorama for ${region.region}, ${country.name}: ${region.iconicVineyard}. ` +
      "Accurate regional landform, production/source cues, natural light, no text, no logos, no fantasy elements, 16:9 editorial study image.",
    overview:
      `${region.region} expands the ${country.name} country page into a focused regional study page. Use it to connect the local image, source geography, ` +
      `production pattern, service language, and exam cues for ${regionBeverageCategoryLabels[category].toLowerCase()}.`,
    location: country.profile.location,
    climate: country.profile.terroir,
    soils: country.profile.terroir,
    grapes: {
      white: country.profile.whiteGrapes,
      red: country.profile.redGrapes
    },
    styles: country.profile.redGrapes.slice(0, 6),
    serviceCue: country.profile.servingStyle,
    examFocus: [
      `Recognize ${region.region} as one of the main ${country.name} ${regionBeverageCategoryLabels[category].toLowerCase()} regions shown on the country page.`,
      `Tie the region image to the country-level location and source-condition notes instead of memorizing it as decoration.`,
      `Use ${country.profile.productionStyle}`,
      `For service, connect the region to ${country.profile.servingStyle}`
    ],
    sourceLinks: country.profile.resources,
    panoramaScene: generatedPanorama
      ? {
          id: `${category}-${country.slug}-${regionSlug}-generated-360`,
          country: country.name,
          region: region.region,
          title: `${region.region} 360 Study View`,
          imageSrc: generatedPanorama,
          imageAlt: `${region.region} ${commodity} 360 source panorama`,
          copy:
            `Use the generated 360 view to study ${region.region} in ${country.name}: source geography, production cues, ` +
            `${regionBeverageCategoryLabels[category].toLowerCase()} service language, and exam patterns.`,
          details: [country.name, region.region, region.iconicVineyard, `${regionBeverageCategoryLabels[category]} source region`]
        }
      : undefined
  };
}

function applyGeneratedAssetOverride(
  category: RegionBeverageCategoryId,
  country: RegionCountry,
  subregion: SubregionStudyPage
): SubregionStudyPage {
  const generatedAsset = getRegionAssetEntry(category, country.slug, subregion.slug);
  if (!generatedAsset) return subregion;

  const imageUrl = generatedAsset.imageUrl ?? generatedAsset.panoramaUrl ?? subregion.imageUrl;
  const panoramaUrl = generatedAsset.panoramaUrl;

  return {
    ...subregion,
    imageUrl,
    imageStatus: panoramaUrl ? "generated" : subregion.imageStatus,
    panoramaScene: panoramaUrl
      ? {
          id: `${category}-${country.slug}-${subregion.slug}-generated-360`,
          country: country.name,
          region: subregion.name,
          title: `${subregion.name} 360 Study View`,
          imageSrc: panoramaUrl,
          imageAlt: `${subregion.name} generated 360 source panorama`,
          copy:
            `Use the generated 360 view to study ${subregion.name}: source geography, production cues, service language, ` +
            "and exam patterns from the page.",
          details: [subregion.parentRegion, subregion.classification, ...subregion.examFocus.slice(0, 2)]
        }
      : subregion.panoramaScene
  };
}

function buildMajorRegionGuide(country: RegionCountry, category: RegionBeverageCategoryId): CountrySubregionGuide {
  return {
    category,
    countrySlug: country.slug,
    countryName: country.name,
    overview: `${country.name} main-region pages mirror the country guide structure for every carousel region.`,
    sourceNote:
      "Generated from the country page's major-region carousel so every visible region image has a routeable study page. Deeper exam pages can override these generated pages with richer source-backed entries.",
    subregions: country.profile.majorRegions.map((region) => buildMajorRegionStudyPage(country, category, region))
  };
}

function buildStudyPanoramaScene(
  country: RegionCountry,
  category: RegionBeverageCategoryId,
  subregion: SubregionStudyPage
): VineyardPanoramaScene {
  if (subregion.panoramaScene) return subregion.panoramaScene;

  const commodityLabel = regionBeverageCategoryLabels[category].toLowerCase();
  const detailSet = new Set<string>([
    subregion.parentRegion,
    subregion.classification,
    ...subregion.examFocus.slice(0, 3)
  ]);

  return {
    id: `${category}-${country.slug}-${subregion.slug}-study-view`,
    country: country.name,
    region: subregion.name,
    title: `${subregion.name} 360 Study View`,
    imageSrc: subregion.imageUrl,
    imageAlt: subregion.imageAlt,
    copy:
      `Use this 360 study view to connect ${subregion.name} to ${country.name} ${commodityLabel}: source geography, ` +
      "production cues, service language, and exam prompts. A dedicated equirectangular panorama asset is still queued for this page.",
    details: Array.from(detailSet).filter(Boolean).slice(0, 5)
  };
}

type ParsedRegionRoute = {
  category: RegionBeverageCategoryId;
  countrySlug: string | null;
  subregionSlug: string | null;
  invalidCategory: string | null;
};

function parseRegionRoute(regionSlug: string | null): ParsedRegionRoute {
  if (!regionSlug || regionSlug.trim() === "") {
    return { category: "wine", countrySlug: null, subregionSlug: null, invalidCategory: null };
  }

  const segments = regionSlug
    .split("/")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (segments.length === 0) {
    return { category: "wine", countrySlug: null, subregionSlug: null, invalidCategory: null };
  }

  const category = resolveRegionBeverageCategory(segments[0]);
  if (category) {
    return { category, countrySlug: segments[1] ?? null, subregionSlug: segments[2] ?? null, invalidCategory: null };
  }

  // Backward compatibility: existing `regions/<country-slug>` routes are treated as wine.
  if (segments.length <= 2) {
    return { category: "wine", countrySlug: segments[0], subregionSlug: segments[1] ?? null, invalidCategory: null };
  }

  return { category: "wine", countrySlug: null, subregionSlug: null, invalidCategory: segments[0] };
}

export function Regions({ regionSlug, onNavigate }: RegionsProps) {
  const route = useMemo(() => parseRegionRoute(regionSlug), [regionSlug]);
  const selectedCategory = route.category;
  const [selectedContinent, setSelectedContinent] = useState<ContinentId | null>(null);
  const selectedCategoryCountries = useMemo(() => regionCountriesByBeverage[selectedCategory], [selectedCategory]);
  const country = useMemo(() => {
    if (!route.countrySlug) return null;
    return selectedCategoryCountries.find((item) => item.slug === route.countrySlug) ?? null;
  }, [route.countrySlug, selectedCategoryCountries]);
  const studyLabels = regionCategoryStudyLabels[selectedCategory];
  const explicitCountrySubregionGuide = useMemo(
    () => (country ? getCountrySubregionGuide(selectedCategory, country.slug) : null),
    [country, selectedCategory]
  );
  const majorRegionGuide = useMemo(() => (country ? buildMajorRegionGuide(country, selectedCategory) : null), [country, selectedCategory]);
  const countrySubregionGuide = useMemo(() => {
    if (!majorRegionGuide) return explicitCountrySubregionGuide;
    if (!country) return explicitCountrySubregionGuide ?? majorRegionGuide;

    if (!explicitCountrySubregionGuide) {
      return {
        ...majorRegionGuide,
        subregions: majorRegionGuide.subregions.map((subregion) => applyGeneratedAssetOverride(selectedCategory, country, subregion))
      } satisfies CountrySubregionGuide;
    }

    const explicitSlugs = new Set(explicitCountrySubregionGuide.subregions.map((subregion) => subregion.slug));
    const generatedSubregions = majorRegionGuide.subregions.filter((subregion) => !explicitSlugs.has(subregion.slug));

    return {
      ...explicitCountrySubregionGuide,
      sourceNote: `${explicitCountrySubregionGuide.sourceNote} Main-region carousel pages are also available for every visible region button.`,
      subregions: [...explicitCountrySubregionGuide.subregions, ...generatedSubregions].map((subregion) =>
        applyGeneratedAssetOverride(selectedCategory, country, subregion)
      )
    } satisfies CountrySubregionGuide;
  }, [country, explicitCountrySubregionGuide, majorRegionGuide, selectedCategory]);
  const selectedSubregion = useMemo(
    () => countrySubregionGuide?.subregions.find((subregion) => subregion.slug === route.subregionSlug) ?? null,
    [countrySubregionGuide, route.subregionSlug]
  );
  const selectedSubregionPanoramaScene = useMemo(() => {
    if (!country || !selectedSubregion) return null;
    return buildStudyPanoramaScene(country, selectedCategory, selectedSubregion);
  }, [country, selectedCategory, selectedSubregion]);
  const selectedSubregionIndex = useMemo(() => {
    if (!countrySubregionGuide || !selectedSubregion) return -1;
    return countrySubregionGuide.subregions.findIndex((subregion) => subregion.slug === selectedSubregion.slug);
  }, [countrySubregionGuide, selectedSubregion]);
  const previousSubregion = useMemo(() => {
    if (!countrySubregionGuide || selectedSubregionIndex < 0 || countrySubregionGuide.subregions.length <= 1) return null;
    const previousIndex = (selectedSubregionIndex - 1 + countrySubregionGuide.subregions.length) % countrySubregionGuide.subregions.length;
    return countrySubregionGuide.subregions[previousIndex];
  }, [countrySubregionGuide, selectedSubregionIndex]);
  const nextSubregion = useMemo(() => {
    if (!countrySubregionGuide || selectedSubregionIndex < 0 || countrySubregionGuide.subregions.length <= 1) return null;
    const nextIndex = (selectedSubregionIndex + 1) % countrySubregionGuide.subregions.length;
    return countrySubregionGuide.subregions[nextIndex];
  }, [countrySubregionGuide, selectedSubregionIndex]);
  const countryPanoramaScenes = useMemo(() => {
    if (!country || !countrySubregionGuide) return [];
    return countrySubregionGuide.subregions
      .slice(0, 8)
      .map((subregion) => buildStudyPanoramaScene(country, selectedCategory, subregion));
  }, [country, countrySubregionGuide, selectedCategory]);
  const selectedCountryIndex = useMemo(() => {
    if (!country) return -1;
    return selectedCategoryCountries.findIndex((item) => item.slug === country.slug);
  }, [country, selectedCategoryCountries]);
  const [activeSlide, setActiveSlide] = useState(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const countriesByContinent = useMemo(
    () =>
      continentOrder.reduce((acc, continent) => {
        acc[continent] = selectedCategoryCountries.filter((countryItem) => countryItem.continent === continent);
        return acc;
      }, {} as Record<ContinentId, typeof selectedCategoryCountries>),
    [selectedCategoryCountries]
  );
  const visibleContinents = useMemo(
    () => continentOrder.filter((continent) => countriesByContinent[continent].length > 0),
    [countriesByContinent]
  );
  const filteredContinents = useMemo(() => {
    if (!selectedContinent) return visibleContinents;
    return visibleContinents.includes(selectedContinent) ? [selectedContinent] : visibleContinents;
  }, [selectedContinent, visibleContinents]);

  useEffect(() => {
    setActiveSlide(0);
  }, [country?.slug]);

  useEffect(() => {
    setSelectedContinent(null);
  }, [selectedCategory]);

  const jumpToContinent = (continent: ContinentId) => {
    const target = document.getElementById(toContinentAnchor(continent));
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navigateCountryByDirection = (direction: 1 | -1) => {
    if (!country || selectedCategoryCountries.length <= 1 || selectedCountryIndex < 0) return;
    const nextIndex = (selectedCountryIndex + direction + selectedCategoryCountries.length) % selectedCategoryCountries.length;
    const nextCountry = selectedCategoryCountries[nextIndex];
    onNavigate(`regions/${selectedCategory}/${nextCountry.slug}`);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!country) return;
      const target = event.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName.toLowerCase();
        if (target.isContentEditable || tagName === "input" || tagName === "textarea" || tagName === "select") {
          return;
        }
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onNavigate(`regions/${selectedCategory}`);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        navigateCountryByDirection(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        navigateCountryByDirection(1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [country, selectedCategoryCountries, selectedCountryIndex, selectedCategory, onNavigate]);

  const handleCountryTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (!country || event.touches.length !== 1) {
      swipeStartRef.current = null;
      return;
    }
    const touch = event.touches[0];
    swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleCountryTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (!country) return;
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start || event.changedTouches.length === 0) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const horizontalThreshold = 52;
    const horizontalDominance = Math.abs(dy) * 1.2;

    if (Math.abs(dx) < horizontalThreshold) return;
    if (Math.abs(dx) < horizontalDominance) return;

    if (dx < 0) {
      navigateCountryByDirection(1);
    } else {
      navigateCountryByDirection(-1);
    }
  };

  if (!route.countrySlug) {
    return (
      <section className="regions-shell">
        <div className="section-header">
          <h2>Regions</h2>
          <p>
            Explore regions by beverage category. Wine currently includes {allRegionCountries.length} country pages, and the other categories now use
            the same layered country, source-region, imagery, and study-guide structure as their catalogs are published.
          </p>
        </div>

        <div className="regions-continent-jump" aria-label="Beverage categories">
          {regionBeverageCategoryOrder.map((category) => {
            const count = regionCountriesByBeverage[category].length;
            const active = category === selectedCategory;
            return (
              <button
                key={category}
                type="button"
                className="regions-continent-chip"
                aria-pressed={active}
                onClick={() => onNavigate(`regions/${category}`)}
              >
                {regionBeverageCategoryLabels[category]} <span>{count}</span>
              </button>
            );
          })}
        </div>

        {route.invalidCategory ? (
          <p className="hint">
            Unknown category in URL: <strong>{route.invalidCategory}</strong>. Showing Wine instead.
          </p>
        ) : null}

        <div className="section-header">
          <h3>{regionBeverageCategoryLabels[selectedCategory]}</h3>
          <p>
            {selectedCategoryCountries.length > 0
              ? `Browse ${selectedCategoryCountries.length} countries grouped by continent.`
              : "Region guides for this category are coming soon."}
          </p>
        </div>

        {selectedCategoryCountries.length === 0 ? (
          <article className="regions-info-card">
            <h3>Coming Soon</h3>
            <p>
              We have not published country-level region pages for {regionBeverageCategoryLabels[selectedCategory]} yet.
            </p>
          </article>
        ) : (
          <>
        <div className="regions-continent-jump" aria-label="Jump to continent">
          <button
            type="button"
            className={`regions-continent-chip ${selectedContinent ? "" : "is-active"}`}
            aria-pressed={selectedContinent === null}
            onClick={() => setSelectedContinent(null)}
          >
            All <span>{selectedCategoryCountries.length}</span>
          </button>
          {visibleContinents.map((continent) => (
            <button
              key={continent}
              type="button"
              className={`regions-continent-chip ${selectedContinent === continent ? "is-active" : ""}`}
              aria-pressed={selectedContinent === continent}
              onClick={() => {
                setSelectedContinent(continent);
                jumpToContinent(continent);
              }}
            >
              {continentLabels[continent]} <span>{countriesByContinent[continent].length}</span>
            </button>
          ))}
        </div>

        <div className="regions-continent-stack">
          {filteredContinents.map((continent) => (
            <section className="regions-continent" id={toContinentAnchor(continent)} key={continent}>
              <div className="regions-continent-head">
                <h3>{continentLabels[continent]}</h3>
                <p>{countriesByContinent[continent].length} countries</p>
              </div>

              <div className="regions-country-grid">
                {countriesByContinent[continent].map((item) => (
                  <article className="regions-country-card" key={item.slug}>
                    <button
                      type="button"
                      className="regions-country-image-button"
                      aria-label={`Open ${item.name}`}
                      onClick={() => onNavigate(`regions/${selectedCategory}/${item.slug}`)}
                    >
                      <img
                        className="regions-country-card-image"
                        src={item.profile.countryImageUrl}
                        alt={`${item.name} ${studyLabels.cardImageAlt}`}
                        loading="lazy"
                      />
                    </button>
                    <h4>{item.name}</h4>
                    <p>{item.profile.winesOverview}</p>
                    <button className="btn btn-light" onClick={() => onNavigate(`regions/${selectedCategory}/${item.slug}`)}>
                      Open {item.name}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
          </>
        )}
      </section>
    );
  }

  if (!country) {
    return (
      <section className="regions-shell">
        <div className="section-header">
          <h2>Country not found</h2>
          <p>
            The region URL does not match a country in the {regionBeverageCategoryLabels[selectedCategory]} catalog.
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate(`regions/${selectedCategory}`)}>Back to Category</button>
      </section>
    );
  }

  if (route.subregionSlug && !selectedSubregion) {
    return (
      <section className="regions-shell">
        <div className="regions-country-topbar">
          <button className="btn btn-light" onClick={() => onNavigate(`regions/${selectedCategory}/${country.slug}`)}>
            Back to {country.name}
          </button>
          <button className="btn btn-light" onClick={() => onNavigate(`regions/${selectedCategory}`)}>Back to Category</button>
        </div>
        <div className="section-header">
          <h2>Sub-region not found</h2>
          <p>
            The requested study page is not published for {country.name} yet. This country currently has{" "}
            {countrySubregionGuide?.subregions.length ?? 0} detailed sub-region pages queued or available.
          </p>
        </div>
      </section>
    );
  }

  if (selectedSubregion) {
    const countryRoute = `regions/${selectedCategory}/${country.slug}` as const;

    return (
      <section className="regions-shell">
        <div className="regions-country-topbar regions-subregion-nav">
          <button
            className="btn btn-light"
            disabled={!previousSubregion}
            onClick={() => {
              if (!previousSubregion) return;
              onNavigate(`regions/${selectedCategory}/${country.slug}/${previousSubregion.slug}`);
            }}
          >
            Previous
          </button>
          <button className="btn btn-primary" onClick={() => onNavigate(countryRoute)}>
            {country.name}
          </button>
          <button
            className="btn btn-light"
            disabled={!nextSubregion}
            onClick={() => {
              if (!nextSubregion) return;
              onNavigate(`regions/${selectedCategory}/${country.slug}/${nextSubregion.slug}`);
            }}
          >
            Next
          </button>
        </div>

        <header className="regions-subregion-hero">
          <div>
            <p className="news-card-tag">
              {country.name} - {selectedSubregion.parentRegion} - {selectedSubregion.examWeight} exam focus
            </p>
            <h2>{selectedSubregion.name}</h2>
            <p>{selectedSubregion.overview}</p>
          </div>
          <img src={selectedSubregion.imageUrl} alt={selectedSubregion.imageAlt} loading="lazy" decoding="async" />
        </header>

        <div className="regions-subregion-meta">
          <article>
            <span>Classification</span>
            <p>{selectedSubregion.classification}</p>
          </article>
          <article>
            <span>Image and 360 Status</span>
            <p>
              {selectedSubregion.imageStatus === "generated"
                ? "Generated 360 asset available"
                : "360 study viewer available; dedicated hyper-realistic equirectangular asset queued"}
            </p>
          </article>
        </div>

        <div className="regions-country-layout">
          <article className="regions-info-card">
            <h3>Location</h3>
            <p>{selectedSubregion.location}</p>
          </article>
          <article className="regions-info-card">
            <h3>Climate</h3>
            <p>{selectedSubregion.climate}</p>
          </article>
          <article className="regions-info-card">
            <h3>Soils</h3>
            <p>{selectedSubregion.soils}</p>
          </article>
        </div>

        <div className="regions-list-layout">
          <article className="regions-info-card">
            <h3>{studyLabels.subregionPrimaryTitle}</h3>
            <ol>
              {selectedSubregion.grapes.white.map((grape) => (
                <li key={grape}>{grape}</li>
              ))}
            </ol>
          </article>
          <article className="regions-info-card">
            <h3>{studyLabels.subregionSecondaryTitle}</h3>
            <ol>
              {selectedSubregion.grapes.red.map((grape) => (
                <li key={grape}>{grape}</li>
              ))}
            </ol>
          </article>
        </div>

        <article className="regions-info-card regions-single-row">
          <h3>Testable Styles</h3>
          <ul>
            {selectedSubregion.styles.map((style) => (
              <li key={style}>{style}</li>
            ))}
          </ul>
        </article>

        <article className="regions-info-card regions-single-row">
          <h3>Exam Focus</h3>
          <ul>
            {selectedSubregion.examFocus.map((focus) => (
              <li key={focus}>{focus}</li>
            ))}
          </ul>
        </article>

        <article className="regions-info-card regions-single-row">
          <h3>Service Cue</h3>
          <p>{selectedSubregion.serviceCue}</p>
        </article>

        {selectedSubregionPanoramaScene ? (
          <VineyardPanoramaViewer
            scenes={[selectedSubregionPanoramaScene]}
            kicker={`${regionBeverageCategoryLabels[selectedCategory]} 360 Study View`}
            subjectLabel="source region"
          />
        ) : null}

        <article className="regions-info-card regions-single-row">
          <h3>Source Links</h3>
          <ul className="regions-resource-list">
            {selectedSubregion.sourceLinks.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>
    );
  }

  const profile = country.profile;
  const activeRegion = profile.majorRegions[activeSlide] ?? null;
  const locationLines = parseLocationLines(profile.location);
  const countryMapSrc = countryMapAssetPath(country);
  const countryMapSource = getCountryMapSource(country.slug);
  const countryGeneratedAsset = getRegionAssetEntry(selectedCategory, country.slug);
  const countryHeroImageUrl = countryGeneratedAsset?.imageUrl ?? countryGeneratedAsset?.panoramaUrl ?? profile.countryImageUrl;
  const countryOverviewPanoramaScene = countryGeneratedAsset?.panoramaUrl
    ? {
        id: `${selectedCategory}-${country.slug}-country-generated-360`,
        country: country.name,
        region: country.continentLabel,
        title: `${country.name} 360 Country Study View`,
        imageSrc: countryGeneratedAsset.panoramaUrl,
        imageAlt: `${country.name} generated 360 country source panorama`,
        copy:
          `Use the generated 360 country view to study ${country.name} ${regionBeverageCategoryLabels[selectedCategory].toLowerCase()}: ` +
          "major source geography, production logic, and service context before drilling into individual regions.",
        details: [country.continentLabel, regionBeverageCategoryLabels[selectedCategory], studyLabels.sourceConditionsTitle, studyLabels.productionTitle]
      }
    : null;
  const countryViewerScenes = countryOverviewPanoramaScene
    ? [countryOverviewPanoramaScene, ...countryPanoramaScenes].slice(0, 8)
    : countryPanoramaScenes;

  return (
    <section className="regions-shell" onTouchStart={handleCountryTouchStart} onTouchEnd={handleCountryTouchEnd}>
      <div className="regions-country-topbar">
        <button className="btn btn-light" onClick={() => onNavigate(`regions/${selectedCategory}`)}>Back to Category</button>
        <button className="btn btn-light" onClick={() => onNavigate("regions")}>All Categories</button>
      </div>

      <header className="regions-country-hero">
        <p className="news-card-tag">
          {regionBeverageCategoryLabels[selectedCategory]} - {country.continentLabel}
        </p>
        <h2>{country.name}</h2>
        <img
          className="regions-country-hero-image"
          src={countryHeroImageUrl}
          alt={`${country.name} ${studyLabels.countryImageAlt}`}
          loading="lazy"
        />
        <p>{profile.winesOverview}</p>
      </header>

      <div className="regions-list-layout">
        <article className="regions-info-card">
          <h3>{studyLabels.overviewTitle}</h3>
          <p>{profile.winesOverview}</p>
        </article>
        <article className="regions-info-card">
          <h3>{studyLabels.sourceConditionsTitle}</h3>
          <p>{profile.terroir}</p>
        </article>
      </div>

      <article className="regions-info-card regions-location-card">
        <h3>Location</h3>
        <div className="regions-location-content">
          {locationLines.map((line, index) => (
            <p key={`${line.label ?? line.text}-${index}`} className={`regions-location-line ${line.isBullet ? "is-bullet" : ""}`}>
              {line.label ? (
                <>
                  <strong>{line.label}:</strong>
                  {line.text ? ` ${line.text}` : ""}
                </>
              ) : (
                line.text
              )}
            </p>
          ))}
        </div>
      </article>

      <div className="regions-country-layout">
        <article className="regions-info-card">
          <h3>{studyLabels.productionTitle}</h3>
          <p>{profile.productionStyle}</p>
        </article>
        <article className="regions-info-card">
          <h3>{studyLabels.servingTitle}</h3>
          <p>{profile.servingStyle}</p>
        </article>
        <article className="regions-info-card">
          <h3>{studyLabels.regulationTitle}</h3>
          <p>{profile.regulations}</p>
        </article>
      </div>

      <div className="regions-list-layout">
        <article className="regions-info-card">
          <h3>{studyLabels.primaryListTitle}</h3>
          <ol>
            {profile.whiteGrapes.slice(0, 10).map((grape) => (
              <li key={grape}>{grape}</li>
            ))}
          </ol>
        </article>

        <article className="regions-info-card">
          <h3>{studyLabels.secondaryListTitle}</h3>
          <ol>
            {profile.redGrapes.slice(0, 10).map((grape) => (
              <li key={grape}>{grape}</li>
            ))}
          </ol>
        </article>
      </div>

      <article className="regions-info-card regions-single-row">
        <h3>{studyLabels.terminologyTitle}</h3>
        <ul>
          {profile.terminology.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </article>

      <article className="regions-info-card regions-single-row">
        <h3>{studyLabels.townsTitle}</h3>
        <ul>
          {profile.nearbyTowns.map((town) => (
            <li key={town}>{town}</li>
          ))}
        </ul>
      </article>

      <article className="regions-info-card regions-single-row">
        <h3>{studyLabels.resourcesTitle}</h3>
        <ul className="regions-resource-list">
          {profile.resources.map((resource) => (
            <li key={resource.url}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <article className="regions-carousel-card">
        <div className="regions-carousel-head">
          <h3>{studyLabels.carouselTitle}</h3>
          <div className="regions-carousel-actions">
            <button
              className="btn btn-light"
              onClick={() => setActiveSlide((prev) => (prev - 1 + profile.majorRegions.length) % profile.majorRegions.length)}
            >
              Previous
            </button>
            <button className="btn btn-light" onClick={() => setActiveSlide((prev) => (prev + 1) % profile.majorRegions.length)}>
              Next
            </button>
          </div>
        </div>

        {activeRegion ? (
          <figure className="regions-carousel-figure">
            <img src={activeRegion.imageUrl} alt={`${activeRegion.region} - ${activeRegion.iconicVineyard}`} loading="lazy" />
            <figcaption>
              <strong>{activeRegion.region}</strong>
              <span>{activeRegion.iconicVineyard}</span>
            </figcaption>
          </figure>
        ) : null}

        <div className="regions-carousel-track" role="tablist" aria-label="Region slides">
          {profile.majorRegions.map((item, index) => (
            <button
              key={`${item.region}-${item.iconicVineyard}`}
              className={`regions-carousel-dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => setActiveSlide(index)}
              role="tab"
              aria-selected={index === activeSlide}
              aria-label={`Show ${item.region}`}
            >
              <span>{item.region}</span>
            </button>
          ))}
        </div>

        {majorRegionGuide ? (
          <div className="regions-major-region-links" aria-label={`${country.name} region study pages`}>
            <p>Open a structured region page:</p>
            <div>
              {majorRegionGuide.subregions.map((subregion) => (
                <button
                  key={subregion.slug}
                  type="button"
                  className="btn btn-light"
                  onClick={() => onNavigate(`regions/${selectedCategory}/${country.slug}/${subregion.slug}`)}
                >
                  {subregion.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </article>

      {countrySubregionGuide ? (
        <article className="regions-subregion-index">
          <div className="regions-carousel-head">
            <div>
              <p className="sip-maps-kicker">{studyLabels.subregionIndexKicker}</p>
              <h3>{country.name} {studyLabels.subregionIndexTitle}</h3>
              <p>{countrySubregionGuide.sourceNote}</p>
            </div>
          </div>
          <div className="regions-subregion-grid">
            {countrySubregionGuide.subregions.map((subregion) => (
              <button
                key={subregion.slug}
                type="button"
                className="regions-subregion-card"
                onClick={() => onNavigate(`regions/${selectedCategory}/${country.slug}/${subregion.slug}`)}
              >
                <img src={subregion.imageUrl} alt={subregion.imageAlt} loading="lazy" decoding="async" />
                <span>{subregion.parentRegion}</span>
                <strong>{subregion.name}</strong>
                <small>
                  {subregion.examWeight} exam focus - {subregion.imageStatus === "generated" ? "360 asset ready" : "360 view ready; asset queued"}
                </small>
              </button>
            ))}
          </div>
        </article>
      ) : null}

      {countryViewerScenes.length > 0 ? (
        <VineyardPanoramaViewer
          scenes={countryViewerScenes}
          kicker={`${country.name} ${regionBeverageCategoryLabels[selectedCategory]} 360 Country View`}
          subjectLabel="source region"
        />
      ) : null}

      {selectedCategory === "wine" ? (
        <article className="regions-country-map-card">
          <header className="regions-country-map-head">
            <div>
              <p className="sip-maps-kicker">{studyLabels.mapKicker}</p>
              <h3>{country.name} {studyLabels.mapTitle}</h3>
              <p>{studyLabels.mapDescription}</p>
              <div className={`sip-map-source-panel sip-map-source-panel--${countryMapSource.tone}`}>
                <div className="sip-map-source-summary">
                  <span>{countryMapSource.tierLabel}</span>
                  <strong>{countryMapSource.statusLabel}</strong>
                </div>
                <p>
                  Source:{" "}
                  {countryMapSource.sourceUrl ? (
                    <a href={countryMapSource.sourceUrl} target="_blank" rel="noreferrer">
                      {countryMapSource.sourceName}
                    </a>
                  ) : (
                    countryMapSource.sourceName
                  )}
                </p>
                <p>{countryMapSource.caveat}</p>
              </div>
            </div>
            <div className="regions-country-map-actions">
              <a className="sip-regional-download" href={countryMapSrc} download={countryMapDownloadName(country)}>
                Download SVG
              </a>
              <a className="sip-regional-download" href="#app/maps">
                Open Atlas
              </a>
            </div>
          </header>
          <figure className="regions-country-map-frame">
            <img src={countryMapSrc} alt={`${country.name} ${studyLabels.mapAlt}`} loading="lazy" decoding="async" />
          </figure>
        </article>
      ) : (
        <article className="regions-country-map-card">
          <header className="regions-country-map-head">
            <div>
              <p className="sip-maps-kicker">{studyLabels.mapKicker}</p>
              <h3>{country.name} {studyLabels.mapTitle}</h3>
              <p>{studyLabels.mapDescription}</p>
              <div className="sip-map-source-panel sip-map-source-panel--queued">
                <div className="sip-map-source-summary">
                  <span>Commodity atlas queue</span>
                  <strong>Source map not generated yet</strong>
                </div>
                <p>
                  This page is using the new commodity-region template and source links now. Dedicated SVG map plates and 360 scene assets are queued
                  by commodity so they do not reuse wine-only map art; the live 360 study viewer above uses the current region imagery until those
                  equirectangular assets are generated.
                </p>
              </div>
            </div>
          </header>
        </article>
      )}
    </section>
  );
}

