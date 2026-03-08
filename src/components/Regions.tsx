import { useEffect, useMemo, useState } from "react";
import {
  allRegionCountries,
  continentLabels,
  continentOrder,
  regionBeverageCategoryLabels,
  regionBeverageCategoryOrder,
  regionCountriesByBeverage,
  resolveRegionBeverageCategory,
  type ContinentId,
  type RegionBeverageCategoryId
} from "../data/regions";

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

type ParsedRegionRoute = {
  category: RegionBeverageCategoryId;
  countrySlug: string | null;
  invalidCategory: string | null;
};

function parseRegionRoute(regionSlug: string | null): ParsedRegionRoute {
  if (!regionSlug || regionSlug.trim() === "") {
    return { category: "wine", countrySlug: null, invalidCategory: null };
  }

  const segments = regionSlug
    .split("/")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  if (segments.length === 0) {
    return { category: "wine", countrySlug: null, invalidCategory: null };
  }

  const category = resolveRegionBeverageCategory(segments[0]);
  if (category) {
    return { category, countrySlug: segments[1] ?? null, invalidCategory: null };
  }

  // Backward compatibility: existing `regions/<country-slug>` routes are treated as wine.
  if (segments.length === 1) {
    return { category: "wine", countrySlug: segments[0], invalidCategory: null };
  }

  return { category: "wine", countrySlug: null, invalidCategory: segments[0] };
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
  const [activeSlide, setActiveSlide] = useState(0);
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

  if (!route.countrySlug) {
    return (
      <section className="regions-shell">
        <div className="section-header">
          <h2>Regions</h2>
          <p>
            Explore regions by beverage category. Wine currently includes {allRegionCountries.length} country pages.
            Select one of the 9 categories below to browse available region guides.
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
                    <img
                      className="regions-country-card-image"
                      src={item.profile.countryImageUrl}
                      alt={`${item.name} vineyards`}
                      loading="lazy"
                    />
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

  const profile = country.profile;
  const activeRegion = profile.majorRegions[activeSlide] ?? null;
  const locationLines = parseLocationLines(profile.location);

  return (
    <section className="regions-shell">
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
          src={profile.countryImageUrl}
          alt={`${country.name} country landscape`}
          loading="lazy"
        />
        <p>{profile.winesOverview}</p>
      </header>

      <div className="regions-list-layout">
        <article className="regions-info-card">
          <h3>Country's Wines Overview</h3>
          <p>{profile.winesOverview}</p>
        </article>
        <article className="regions-info-card">
          <h3>Terroir</h3>
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
          <h3>Style of Production</h3>
          <p>{profile.productionStyle}</p>
        </article>
        <article className="regions-info-card">
          <h3>Style of Serving (their wines)</h3>
          <p>{profile.servingStyle}</p>
        </article>
        <article className="regions-info-card">
          <h3>Regulations</h3>
          <p>{profile.regulations}</p>
        </article>
      </div>

      <div className="regions-list-layout">
        <article className="regions-info-card">
          <h3>Top 10 White Grape Varieties</h3>
          <ol>
            {profile.whiteGrapes.slice(0, 10).map((grape) => (
              <li key={grape}>{grape}</li>
            ))}
          </ol>
        </article>

        <article className="regions-info-card">
          <h3>Top 10 Red Grape Varieties</h3>
          <ol>
            {profile.redGrapes.slice(0, 10).map((grape) => (
              <li key={grape}>{grape}</li>
            ))}
          </ol>
        </article>
      </div>

      <article className="regions-info-card regions-single-row">
        <h3>Terminology</h3>
        <ul>
          {profile.terminology.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </article>

      <article className="regions-info-card regions-single-row">
        <h3>Biggest Towns Nearby (for tourism)</h3>
        <ul>
          {profile.nearbyTowns.map((town) => (
            <li key={town}>{town}</li>
          ))}
        </ul>
      </article>

      <article className="regions-info-card regions-single-row">
        <h3>Resources for Further Exploration</h3>
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
          <h3>Major Regions and Iconic Vineyards</h3>
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
      </article>
    </section>
  );
}

