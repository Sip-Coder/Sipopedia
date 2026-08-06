import type { SipAcademyCampusId, SipAcademyGuildId } from "./sipAcademyGuilds";

export type SipAcademyNodeArt = {
  src: string;
  position?: string;
};

export type SipAcademyStudyLayerId = "terroir" | "architecture" | "facilities";

export type SipAcademyStudyArt = Record<SipAcademyStudyLayerId, SipAcademyNodeArt>;

/**
 * Reuse the strongest approved opening art from each Academy adventure as a
 * compact landmark lens. The image is decorative inside an already named
 * button, so the surrounding control remains the accessible source of truth.
 */
export const SIP_ACADEMY_NODE_ART: Record<SipAcademyCampusId, SipAcademyNodeArt> = {
  wine: { src: "/beyond-the-glass/wine-guides-sunrise-960.webp", position: "50% 38%" },
  beer: { src: "/beyond-the-glass/brewery/brewery-opening-portrait-640.webp", position: "50% 44%" },
  spirits: { src: "/beyond-the-glass/distillery/distillery-gate-portrait-640.webp", position: "50% 43%" },
  coffee: { src: "/beyond-the-glass/coffee/coffee-academy-gate-portrait-640.webp", position: "50% 42%" },
  tea: { src: "/beyond-the-glass/tea/tea-academy-gate-portrait-640.webp", position: "50% 43%" },
  kombucha: { src: "/beyond-the-glass/kombucha/academy-gate-portrait-640.webp", position: "50% 44%" },
  water: { src: "/beyond-the-glass/water/water-academy-portrait-640.webp", position: "50% 42%" },
  juice: { src: "/beyond-the-glass/juice/academy-gate-portrait-640.webp", position: "50% 43%" },
  milk: { src: "/beyond-the-glass/milk/academy-dawn-portrait-640.webp", position: "50% 44%" },
  "health-drinks": { src: "/beyond-the-glass/health-drinks/academy-gate-portrait-640.webp", position: "50% 42%" },
  protein: { src: "/beyond-the-glass/health-drinks/protein-dispersal-portrait-640.webp", position: "50% 45%" },
  "energy-drinks": { src: "/beyond-the-glass/energy-drinks/academy-gate-portrait-640.webp", position: "50% 42%" },
  sodas: { src: "/beyond-the-glass/sodas/sodas-opening-portrait-640.webp", position: "50% 43%" },
  fermented: { src: "/beyond-the-glass/kombucha/first-fermentation-portrait-640.webp", position: "50% 44%" },
  "regional-drinks": { src: "/beyond-the-glass/sip-academy-960.webp", position: "50% 50%" }
};

export const SIP_ACADEMY_GUILD_ART: Record<SipAcademyGuildId, SipAcademyNodeArt> = {
  cask: SIP_ACADEMY_NODE_ART.wine,
  steep: SIP_ACADEMY_NODE_ART.tea,
  source: SIP_ACADEMY_NODE_ART.water,
  energy: SIP_ACADEMY_NODE_ART["energy-drinks"],
  culture: SIP_ACADEMY_NODE_ART["regional-drinks"]
};

/**
 * Each Academy field note gets three distinct, already-approved scene crops.
 * These become the visual lenses for land, architecture, and facilities so
 * the paper panel behaves like the field-atlas studies used in BTG.
 */
export const SIP_ACADEMY_STUDY_ART: Record<SipAcademyCampusId, SipAcademyStudyArt> = {
  wine: {
    terroir: { src: "/beyond-the-glass/wine-vineyard-growth-960.webp", position: "48% 56%" },
    architecture: { src: "/beyond-the-glass/sip-academy-960.webp", position: "51% 42%" },
    facilities: { src: "/beyond-the-glass/wine-fermentation-hall-960.webp", position: "50% 52%" }
  },
  beer: {
    terroir: { src: "/beyond-the-glass/brewery/ingredient-origins-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/brewery/brewery-opening-960.webp", position: "50% 42%" },
    facilities: { src: "/beyond-the-glass/brewery/brewhouse-cutaway-960.webp", position: "52% 50%" }
  },
  spirits: {
    terroir: { src: "/beyond-the-glass/distillery/distillery-gate-960.webp", position: "50% 44%" },
    architecture: { src: "/beyond-the-glass/distillery/stillhouse-crossroads-960.webp", position: "50% 48%" },
    facilities: { src: "/beyond-the-glass/distillery/distillery-assembly-960.webp", position: "51% 50%" }
  },
  coffee: {
    terroir: { src: "/beyond-the-glass/coffee/coffee-farm-lifecycle-960.webp", position: "50% 54%" },
    architecture: { src: "/beyond-the-glass/coffee/coffee-academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/coffee/coffee-roast-chemistry-960.webp", position: "52% 50%" }
  },
  tea: {
    terroir: { src: "/beyond-the-glass/tea/tea-garden-cultivar-960.webp", position: "50% 54%" },
    architecture: { src: "/beyond-the-glass/tea/tea-academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/tea/tea-drying-sorting-960.webp", position: "52% 50%" }
  },
  kombucha: {
    terroir: { src: "/beyond-the-glass/kombucha/culture-ecology-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/kombucha/academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/kombucha/first-fermentation-960.webp", position: "52% 50%" }
  },
  water: {
    terroir: { src: "/beyond-the-glass/water/source-resilience-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/water/clarification-gallery-960.webp", position: "50% 45%" },
    facilities: { src: "/beyond-the-glass/water/advanced-treatment-960.webp", position: "52% 50%" }
  },
  juice: {
    terroir: { src: "/beyond-the-glass/juice/orchard-anatomy-960.webp", position: "48% 54%" },
    architecture: { src: "/beyond-the-glass/juice/academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/juice/press-house-960.webp", position: "52% 50%" }
  },
  milk: {
    terroir: { src: "/beyond-the-glass/milk/farm-ecology-960.webp", position: "48% 54%" },
    architecture: { src: "/beyond-the-glass/milk/academy-dawn-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/milk/pasteurization-homogenization-960.webp", position: "52% 50%" }
  },
  "health-drinks": {
    terroir: { src: "/beyond-the-glass/health-drinks/botanical-evidence-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/health-drinks/academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/health-drinks/evidence-hall-960.webp", position: "52% 50%" }
  },
  protein: {
    terroir: { src: "/beyond-the-glass/health-drinks/protein-dispersal-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/health-drinks/academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/health-drinks/physical-stability-960.webp", position: "52% 50%" }
  },
  "energy-drinks": {
    terroir: { src: "/beyond-the-glass/energy-drinks/caffeine-origins-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/energy-drinks/academy-gate-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/energy-drinks/formulation-lab-960.webp", position: "52% 50%" }
  },
  sodas: {
    terroir: { src: "/beyond-the-glass/sodas/ingredient-gallery-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/sodas/sodas-opening-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/sodas/carbonation-physics-960.webp", position: "52% 50%" }
  },
  fermented: {
    terroir: { src: "/beyond-the-glass/kombucha/culture-ecology-960.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/kombucha/first-fermentation-960.webp", position: "50% 46%" },
    facilities: { src: "/beyond-the-glass/kombucha/quality-stabilization-960.webp", position: "52% 50%" }
  },
  "regional-drinks": {
    terroir: { src: "/beyond-the-glass/landscape-living-archive.webp", position: "48% 52%" },
    architecture: { src: "/beyond-the-glass/sip-academy-960.webp", position: "50% 43%" },
    facilities: { src: "/beyond-the-glass/living-archive-lobby.webp", position: "52% 50%" }
  }
};
