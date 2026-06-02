import type { RegionCountry } from "../data/regions";

export function countryMapAssetPath(country: Pick<RegionCountry, "continent" | "slug">): string {
  return `/maps/Country/${country.continent}/${country.slug}-wine-map.svg`;
}

export function countryMapDownloadName(country: Pick<RegionCountry, "name" | "slug">): string {
  return `${country.slug}-sip-studies-country-wine-map.svg`;
}
