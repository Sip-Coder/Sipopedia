export type RegionAssetKind = "country" | "subregion";

export type RegionAssetStatus = "generated" | "partial";

export type RegionAssetManifestEntry = {
  kind: RegionAssetKind;
  imageUrl?: string;
  panoramaUrl?: string;
  status: RegionAssetStatus;
  prompt: string;
  panoramaPrompt: string;
};

export const regionAssetManifest: Record<string, RegionAssetManifestEntry> = {
  "beer/united-states/yakima-valley-hop-belt": {
    kind: "subregion",
    imageUrl: "/region-assets/beer/united-states/yakima-valley-hop-belt-image.png",
    panoramaUrl: "/region-assets/beer/united-states/yakima-valley-hop-belt-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary hop-field panorama for Yakima Valley Hop Belt, United States: high-trellis hop rows with irrigation lines, dry eastern Washington hills, cone texture, and harvest-ready aroma-hop study cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary hop-field panorama for Yakima Valley Hop Belt, United States: high-trellis hop rows with irrigation lines, dry eastern Washington hills, cone texture, and harvest-ready aroma-hop study cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Yakima Valley Hop Belt, United States. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "coffee/ethiopia/yirgacheffe-gedeo": {
    kind: "subregion",
    imageUrl: "/region-assets/coffee/ethiopia/yirgacheffe-gedeo-image.png",
    panoramaUrl: "/region-assets/coffee/ethiopia/yirgacheffe-gedeo-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary coffee-origin panorama for Yirgacheffe / Gedeo, Ethiopia: highland coffee trees under shade with raised drying beds, red coffee cherries, misty slopes, and washed-coffee station cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary coffee-origin panorama for Yirgacheffe / Gedeo, Ethiopia: highland coffee trees under shade with raised drying beds, red coffee cherries, misty slopes, and washed-coffee station cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Yirgacheffe / Gedeo, Ethiopia. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/argentina": {
    kind: "country",
    imageUrl: "/panoramas/south-america-mendoza-360.png",
    panoramaUrl: "/panoramas/south-america-mendoza-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary wine country study panorama for Argentina. Show the leading wine source geography for Argentina. Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing.",
    panoramaPrompt: "Hyper-realistic 2:1 equirectangular 360 wine country study panorama for Argentina. Show the major wine source geography for Argentina. Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer. No text, no logos, no fantasy elements, no people posing."
  },
  "wine/argentina/uco-valley": {
    kind: "subregion",
    imageUrl: "/panoramas/south-america-mendoza-360.png",
    panoramaUrl: "/panoramas/south-america-mendoza-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Uco Valley, Argentina: high-altitude Malbec vineyards on alluvial fans below the Andes with irrigation channels, stony soils, and strong diurnal-range cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Uco Valley, Argentina: high-altitude Malbec vineyards on alluvial fans below the Andes with irrigation channels, stony soils, and strong diurnal-range cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Uco Valley, Argentina. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/australia/barossa-valley": {
    kind: "subregion",
    imageUrl: "/region-assets/wine/australia/barossa-valley-image.png",
    panoramaUrl: "/region-assets/wine/australia/barossa-valley-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Barossa Valley, Australia: old-vine Shiraz blocks in warm Barossa Valley with gnarled vines, red-brown soils, dry hills, and historic South Australian cellar cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Barossa Valley, Australia: old-vine Shiraz blocks in warm Barossa Valley with gnarled vines, red-brown soils, dry hills, and historic South Australian cellar cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Barossa Valley, Australia. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/australia/margaret-river": {
    kind: "subregion",
    imageUrl: "/region-assets/wine/australia/margaret-river-image.png",
    panoramaUrl: "/region-assets/wine/australia/margaret-river-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Margaret River, Australia: coastal Margaret River Cabernet and Chardonnay vineyards with maritime cloud, gravelly loam, eucalyptus edge, and Indian Ocean cooling cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Margaret River, Australia: coastal Margaret River Cabernet and Chardonnay vineyards with maritime cloud, gravelly loam, eucalyptus edge, and Indian Ocean cooling cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Margaret River, Australia. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/australia/tasmania": {
    kind: "subregion",
    imageUrl: "/region-assets/wine/australia/tasmania-image.png",
    panoramaUrl: "/region-assets/wine/australia/tasmania-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Tasmania, Australia: cool Tasmanian vineyard for sparkling base wine with island maritime light, Pinot Noir and Chardonnay rows, and crisp southern-climate cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Tasmania, Australia: cool Tasmanian vineyard for sparkling base wine with island maritime light, Pinot Noir and Chardonnay rows, and crisp southern-climate cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Tasmania, Australia. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/japan": {
    kind: "country",
    imageUrl: "/panoramas/asia-yamanashi-360.png",
    panoramaUrl: "/panoramas/asia-yamanashi-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary wine country study panorama for Japan. Show the leading wine source geography for Japan. Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing.",
    panoramaPrompt: "Hyper-realistic 2:1 equirectangular 360 wine country study panorama for Japan. Show the major wine source geography for Japan. Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer. No text, no logos, no fantasy elements, no people posing."
  },
  "wine/japan/yamanashi-koshu-valley": {
    kind: "subregion",
    imageUrl: "/panoramas/asia-yamanashi-360.png",
    panoramaUrl: "/panoramas/asia-yamanashi-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Yamanashi / Koshu Valley, Japan: Yamanashi Koshu vineyards in the Kofu basin with pergola-trained vines, paper grape caps, alluvial fan slopes, Mount Fuji distance cue, and humid-season canopy management. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Yamanashi / Koshu Valley, Japan: Yamanashi Koshu vineyards in the Kofu basin with pergola-trained vines, paper grape caps, alluvial fan slopes, Mount Fuji distance cue, and humid-season canopy management. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Yamanashi / Koshu Valley, Japan. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/new-zealand": {
    kind: "country",
    imageUrl: "/panoramas/oceania-marlborough-360.png",
    panoramaUrl: "/panoramas/oceania-marlborough-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary wine country study panorama for New Zealand. Show the leading wine source geography for New Zealand. Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing.",
    panoramaPrompt: "Hyper-realistic 2:1 equirectangular 360 wine country study panorama for New Zealand. Show the major wine source geography for New Zealand. Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer. No text, no logos, no fantasy elements, no people posing."
  },
  "wine/new-zealand/marlborough": {
    kind: "subregion",
    imageUrl: "/panoramas/oceania-marlborough-360.png",
    panoramaUrl: "/panoramas/oceania-marlborough-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Marlborough, New Zealand: Marlborough Sauvignon Blanc vineyards in Wairau Valley with bright alluvial stones, river plain, mountain rim, and cool sunny maritime cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Marlborough, New Zealand: Marlborough Sauvignon Blanc vineyards in Wairau Valley with bright alluvial stones, river plain, mountain rim, and cool sunny maritime cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Marlborough, New Zealand. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/south-africa": {
    kind: "country",
    imageUrl: "/panoramas/africa-stellenbosch-360.png",
    panoramaUrl: "/panoramas/africa-stellenbosch-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary wine country study panorama for South Africa. Show the leading wine source geography for South Africa. Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing.",
    panoramaPrompt: "Hyper-realistic 2:1 equirectangular 360 wine country study panorama for South Africa. Show the major wine source geography for South Africa. Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer. No text, no logos, no fantasy elements, no people posing."
  },
  "wine/south-africa/stellenbosch": {
    kind: "subregion",
    imageUrl: "/panoramas/africa-stellenbosch-360.png",
    panoramaUrl: "/panoramas/africa-stellenbosch-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Stellenbosch, South Africa: Stellenbosch Cabernet and Chenin vineyards on mountain foothills with decomposed granite, ocean-influenced light, and Cape fold mountain cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Stellenbosch, South Africa: Stellenbosch Cabernet and Chenin vineyards on mountain foothills with decomposed granite, ocean-influenced light, and Cape fold mountain cues. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Stellenbosch, South Africa. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  },
  "wine/united-states": {
    kind: "country",
    imageUrl: "/panoramas/north-america-napa-valley-360.png",
    panoramaUrl: "/panoramas/north-america-napa-valley-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary wine country study panorama for United States. Show the leading wine source geography for United States. Wide 16:9 editorial image, accurate source geography, visible regional landform, production/source cues, natural light, no text, no logos, no people posing.",
    panoramaPrompt: "Hyper-realistic 2:1 equirectangular 360 wine country study panorama for United States. Show the major wine source geography for United States. Camera placed at a representative source landscape with seamless left-right horizon for an inside-sphere WebGL viewer. No text, no logos, no fantasy elements, no people posing."
  },
  "wine/united-states/napa-valley": {
    kind: "subregion",
    imageUrl: "/panoramas/north-america-napa-valley-360.png",
    panoramaUrl: "/panoramas/north-america-napa-valley-360.png",
    status: "generated",
    prompt: "Hyper-realistic documentary vineyard panorama for Napa Valley, United States: Cabernet Sauvignon rows on volcanic benchland with valley fog lifting between the Mayacamas and Vaca ranges. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 16:9 editorial study image.",
    panoramaPrompt: "Hyper-realistic documentary vineyard panorama for Napa Valley, United States: Cabernet Sauvignon rows on volcanic benchland with valley fog lifting between the Mayacamas and Vaca ranges. Early morning natural light, accurate source geography, visible regional landform and material texture, no fantasy elements, no text, no logos, no people posing, 2:1 equirectangular 360 panorama. Camera placed inside the source region for Napa Valley, United States. Seamless left-right horizon, broad sky and ground continuity, usable in an inside-sphere WebGL viewer. Hyper-realistic documentary accuracy, no text, no logos, no people posing, no fantasy elements."
  }
};

export function regionAssetKey(category: string, countrySlug: string, subregionSlug?: string | null): string {
  return subregionSlug ? `${category}/${countrySlug}/${subregionSlug}` : `${category}/${countrySlug}`;
}

export function getRegionAssetEntry(
  category: string,
  countrySlug: string,
  subregionSlug?: string | null
): RegionAssetManifestEntry | null {
  return regionAssetManifest[regionAssetKey(category, countrySlug, subregionSlug)] ?? null;
}
