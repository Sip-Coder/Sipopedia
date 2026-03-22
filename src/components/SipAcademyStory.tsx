import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";
import { allRegionCountries, type RegionCountry } from "../data/regions";
import { GlobeMap, type GlobePinInput } from "./GlobeMap";

type MapCountryPath = { id: string; name: string; path: string };

const MAP_WIDTH = 800;
const MAP_HEIGHT = 400;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function decodeArc(arc: number[][], transform?: { scale: [number, number]; translate: [number, number] }): number[][] {
  let x = 0;
  let y = 0;
  const out: number[][] = [];
  for (const [dx, dy] of arc) {
    x += dx;
    y += dy;
    out.push(transform ? [x * transform.scale[0] + transform.translate[0], y * transform.scale[1] + transform.translate[1]] : [x, y]);
  }
  return out;
}

function stitchArcRefs(refs: number[], arcs: number[][][]): number[][] {
  const out: number[][] = [];
  for (const ref of refs) {
    const source = arcs[ref < 0 ? ~ref : ref] ?? [];
    const piece = ref < 0 ? [...source].reverse() : source;
    for (let index = 0; index < piece.length; index++) {
      if (out.length === 0 || index > 0) out.push(piece[index]);
    }
  }
  return out;
}

function toPath(points: number[][], width: number, height: number): string {
  if (!points.length) return "";
  const projected = points.map(([lon, lat]) => [((lon + 180) / 360) * width, ((90 - lat) / 180) * height]);
  let path = `M${projected[0][0].toFixed(2)},${projected[0][1].toFixed(2)}`;
  for (let index = 1; index < projected.length; index++) {
    const breakPath = Math.abs(points[index][0] - points[index - 1][0]) > 100;
    path += breakPath
      ? `M${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`
      : `L${projected[index][0].toFixed(2)},${projected[index][1].toFixed(2)}`;
  }
  return `${path}Z`;
}

function topoToPaths(data: Record<string, unknown>, width = MAP_WIDTH, height = MAP_HEIGHT): MapCountryPath[] {
  if (!Array.isArray(data.arcs) || !isObject(data.objects)) return [];
  const objects = data.objects as Record<string, unknown>;
  const objectNames = Object.keys(objects);
  if (!objectNames.length) return [];

  const score = (name: string) =>
    (name.toLowerCase().includes("countries") ? 3 : 0) +
    (name.toLowerCase().includes("admin_0") || name.toLowerCase().includes("admin0") ? 2 : 0) +
    (name.toLowerCase().includes("admin") ? 2 : 0) +
    (name.toLowerCase().includes("ne_") ? 1 : 0);

  const bestName = objectNames.reduce((best, next) => (score(next) > score(best) ? next : best));
  const selected = objects[bestName];
  if (!isObject(selected) || !Array.isArray(selected.geometries)) return [];

  const decoded = (data.arcs as number[][][]).map((arc) =>
    decodeArc(
      arc,
      isObject(data.transform)
        ? (data.transform as { scale: [number, number]; translate: [number, number] })
        : undefined
    )
  );

  const out: MapCountryPath[] = [];
  for (const geometry of selected.geometries as Array<Record<string, unknown>>) {
    const name = isObject(geometry.properties) ? asText(geometry.properties.name) || "Unknown" : "Unknown";
    const id = asText(geometry.id) || name;
    let path = "";
    if (geometry.type === "Polygon" && Array.isArray(geometry.arcs)) {
      for (const refs of geometry.arcs as number[][]) path += toPath(stitchArcRefs(refs, decoded), width, height);
    }
    if (geometry.type === "MultiPolygon" && Array.isArray(geometry.arcs)) {
      for (const polygon of geometry.arcs as number[][][]) {
        for (const refs of polygon) path += toPath(stitchArcRefs(refs, decoded), width, height);
      }
    }
    if (path) out.push({ id, name, path });
  }

  return out;
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function parsePathPoints(path: string): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const re = /[ML](-?[\d.]+),(-?[\d.]+)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(path)) !== null) {
    points.push({ x: Number.parseFloat(match[1]), y: Number.parseFloat(match[2]) });
  }
  return points;
}

function pathCentroid(path: string): { lat: number; lon: number } | null {
  const points = parsePathPoints(path);
  if (!points.length) return null;
  const sum = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  );
  const x = sum.x / points.length;
  const y = sum.y / points.length;
  return {
    lon: (x / MAP_WIDTH) * 360 - 180,
    lat: 90 - (y / MAP_HEIGHT) * 180
  };
}

const COUNTRY_ALIAS: Record<string, string> = {
  "united-states": "united-states-of-america",
  usa: "united-states-of-america",
  "united-kingdom": "united-kingdom",
  brasil: "brazil",
  "cote-d-ivoire": "ivory-coast",
  congo: "republic-of-the-congo",
  "democratic-republic-of-the-congo": "dem-rep-congo",
  "dominican-republic": "dominican-rep",
  "timor-leste": "east-timor",
  "w-sahara": "western-sahara"
};

function canonicalSlug(value: string): string {
  const slug = slugify(value);
  return COUNTRY_ALIAS[slug] ?? slug;
}

const VOICE_NAME_PRIORITY = [
  "Microsoft Ryan Online (Natural) - English (United Kingdom)",
  "Microsoft Ryan - English (United Kingdom)",
  "Google UK English Male",
  "Daniel"
];

const STORY_SPEED_OPTIONS = [1, 1.5, 1.8, 2, 2.5] as const;
type StorySpeed = (typeof STORY_SPEED_OPTIONS)[number];

function pickPreferredStoryVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const byName = new Map(voices.map((voice) => [voice.name.toLowerCase(), voice]));
  for (const target of VOICE_NAME_PRIORITY) {
    const found = byName.get(target.toLowerCase());
    if (found) return found;
  }

  const ukMaleLike = voices.find((voice) => {
    const name = voice.name.toLowerCase();
    return voice.lang.toLowerCase().startsWith("en-gb") && /male|ryan|daniel|arthur|george|oliver/.test(name);
  });
  if (ukMaleLike) return ukMaleLike;

  const ukVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("en-gb"));
  if (ukVoice) return ukVoice;

  const englishVoice = voices.find((voice) => voice.lang.toLowerCase().startsWith("en"));
  if (englishVoice) return englishVoice;

  return voices[0] ?? null;
}

function splitNarrationIntoChunks(text: string, maxChars = 220): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  const sentences = cleaned.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if (sentence.length > maxChars) {
      const words = sentence.split(" ");
      let longBuffer = "";
      for (const word of words) {
        const next = longBuffer ? `${longBuffer} ${word}` : word;
        if (next.length > maxChars) {
          if (longBuffer) chunks.push(longBuffer);
          longBuffer = word;
        } else {
          longBuffer = next;
        }
      }
      if (longBuffer) {
        if (current) {
          chunks.push(current);
          current = "";
        }
        chunks.push(longBuffer);
      }
      continue;
    }
    const merged = current ? `${current} ${sentence}` : sentence;
    if (merged.length > maxChars) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current = merged;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function storySeed(country: RegionCountry): number {
  return country.slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
}

function pickFromSeed<T>(values: T[], seed: number, shift = 0): T {
  return values[(seed + shift) % values.length];
}

function waitForVoicesReady(timeoutMs = 1800): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const synth = window.speechSynthesis;
    const immediate = synth.getVoices();
    if (immediate.length > 0) {
      resolve(immediate);
      return;
    }
    let done = false;
    const finish = (voices: SpeechSynthesisVoice[]) => {
      if (done) return;
      done = true;
      synth.removeEventListener("voiceschanged", onVoices);
      clearTimeout(timer);
      resolve(voices);
    };
    const onVoices = () => finish(synth.getVoices());
    const timer = window.setTimeout(() => finish(synth.getVoices()), timeoutMs);
    synth.addEventListener("voiceschanged", onVoices);
  });
}

function fallbackImageSvg(country: string, region: string): string {
  const title = `${country} - ${region}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='760'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop stop-color='#3f2f22'/><stop offset='1' stop-color='#b4874f'/></linearGradient></defs><rect fill='url(#g)' width='1200' height='760'/><text x='60' y='360' fill='#fef4e6' font-size='62' font-family='Georgia, serif'>${title}</text><text x='60' y='430' fill='#fef4e6' font-size='28' font-family='Georgia, serif'>Image fallback active</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function unsplashFallback(country: string, region: string): string {
  const query = encodeURIComponent(`${country} ${region} vineyard landscape`);
  return `https://source.unsplash.com/1200x760/?${query}`;
}

function buildLongTravelTale(country: RegionCountry, regionName: string): string[] {
  const profile = country.profile;
  const seed = storySeed(country);
  const region = profile.majorRegions.find((item) => item.region === regionName) ?? profile.majorRegions[0];
  const introLead = pickFromSeed(
    [
      `Sippy, Roma, the ${country.name} notebook opens with rain on stone and a train platform before sunrise.`,
      `Sippy, Roma, my ${country.name} chapter starts on a cold morning road leading straight into ${region?.region ?? country.name}.`,
      `Sippy, Roma, in ${country.name} the lesson began the moment we stepped into the market before first light.`,
      `Sippy, Roma, the best part of ${country.name} started with a wrong turn that led us to ${region?.region ?? "the old vineyard road"}.`,
      `Sippy, Roma, when I think about ${country.name}, I remember the wind first, then the cellars, then the glass.`,
      `Sippy, Roma, the ${country.name} story begins with a hillside climb and a producer who handed us grapes before hello.`,
      `Sippy, Roma, our ${country.name} run started at dawn with maps in one hand and warm bread in the other.`,
      `Sippy, Roma, ${country.name} greeted us with church bells, harvest trucks, and a cellar door left open for tastings.`
    ],
    seed,
    7
  );
  const white = profile.whiteGrapes.slice(0, 6).join(", ");
  const red = profile.redGrapes.slice(0, 6).join(", ");
  const terms = profile.terminology.slice(0, 8).join(", ");
  const towns = profile.nearbyTowns.slice(0, 4).join(", ");
  const opening = pickFromSeed(
    [
      "I gathered you both at first light, because some stories can only be told before the city wakes.",
      "You asked me where true region memory begins, so I opened my old field notebook and began this chapter.",
      "Tonight I am not lecturing from slides; I am bringing you into the road dust and cellar air of a real journey.",
      "Sippy, Roma, pull your chairs closer. This is one of the journeys that changed how I taste forever."
    ],
    seed
  );
  const adventureBeat = pickFromSeed(
    [
      "By noon, a mountain wind flipped our tasting assumptions and forced us to recalculate every service call.",
      "At one estate, a sudden rain line rewrote our vineyard plan and taught us more than any classroom could.",
      "In the middle of harvest traffic, we followed a back road to a cellar that became the heart of this lesson.",
      "A long climb through terraces gave us the clearest proof that site design controls the style in the glass."
    ],
    seed,
    2
  );
  const closingCharge = pickFromSeed(
    [
      "So when you teach this country, teach it as a living system, not a trivia list.",
      "Carry this lesson carefully: origin is a language, and service is how we translate it for guests.",
      "That is the standard now, both of you: observe deeply, explain clearly, and pour with purpose.",
      "Remember this chapter whenever a guest asks where character in wine truly comes from."
    ],
    seed,
    5
  );
  const stops = profile.majorRegions
    .map((item, index) => `Stop ${index + 1}: ${item.region}, where we studied ${item.iconicVineyard}.`)
    .join(" ");
  return [
    `${introLead} ${opening} We weren't there to check boxes, we were there to feel the place and understand why the wines taste the way they do. ${profile.winesOverview}`,
    `We started in ${region?.region ?? country.name}, and I told you both the same thing I always say: history is the route, not the footnote. ${profile.location} Through old lanes, cellar doors, and harvest conversations, you could see how the region keeps its identity through changing eras, regulations, and markets.`,
    `Then we got dirt on our hands. I put soil in Sippy's palm, asked Roma to pause and smell the air, and we worked the map from ground up. ${profile.terroir} Our rule stayed simple: read slope, heat, wind, and water before reading the label.`,
    `Later we looked at culture through architecture and service rhythm: stone homes, monastery paths, market squares, ports, and mountain terraces. In and around ${towns}, we watched how local food, local hospitality, and local wine still move together. ${adventureBeat}`,
    `At the table we treated pairing like a game plan. Structure first: acidity with fat, tannin with protein, sweetness with heat, bitterness with richness. In ${country.name}, our benchmark sets were whites ${white} and reds ${red}. Sippy focused guest flow, Roma tracked aroma bridges, and I tied each call back to production and terroir facts.`,
    `${stops} Every stop had a different mood, but one heartbeat stayed constant: origin matters. The thread we kept coming back to was ${region?.iconicVineyard ?? "historic vineyard continuity"}, because it showed how place can stay clear in the glass.`,
    `On the ride out, I had you both run through our field language one more time: ${terms}. And the takeaway was clear: ${country.name} matters not just for famous bottles, but for how well it teaches the full chain from land to cellar to table to memory. ${closingCharge}`
  ];
}

export function SipAcademyStory() {
  const [mapPaths, setMapPaths] = useState<MapCountryPath[]>([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [selectedCountrySlug, setSelectedCountrySlug] = useState<string>(allRegionCountries[0]?.slug ?? "");
  const [selectedRegionName, setSelectedRegionName] = useState<string>("");
  const [audioState, setAudioState] = useState<"idle" | "playing" | "paused">("idle");
  const [storySpeed, setStorySpeed] = useState<StorySpeed>(1);
  const [playbackPercent, setPlaybackPercent] = useState(0);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const queueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const speakingRef = useRef(false);
  const playbackOffsetRef = useRef(0);
  const activeNarrationRef = useRef("");

  useEffect(() => {
    let cancelled = false;
    setMapLoading(true);
    fetch("/world-topo.json")
      .then((response) => response.json())
      .then((json: unknown) => {
        if (cancelled || !isObject(json)) return;
        setMapPaths(topoToPaths(json));
        setMapLoading(false);
      })
      .catch(() => {
        if (!cancelled) setMapLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCountry = useMemo(
    () => allRegionCountries.find((country) => country.slug === selectedCountrySlug) ?? allRegionCountries[0],
    [selectedCountrySlug]
  );

  useEffect(() => {
    const firstRegion = selectedCountry?.profile.majorRegions[0]?.region ?? "";
    setSelectedRegionName(firstRegion);
  }, [selectedCountry?.slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = Number.parseFloat(window.localStorage.getItem("sip-studies:academy:story-speed:v1") ?? "");
    if (STORY_SPEED_OPTIONS.includes(stored as StorySpeed)) {
      setStorySpeed(stored as StorySpeed);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("sip-studies:academy:story-speed:v1", String(storySpeed));
  }, [storySpeed]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      queueRef.current = [];
      speakingRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    const resolveVoice = () => {
      preferredVoiceRef.current = pickPreferredStoryVoice(synth.getVoices());
    };
    resolveVoice();
    synth.onvoiceschanged = resolveVoice;
    return () => {
      if (synth.onvoiceschanged === resolveVoice) synth.onvoiceschanged = null;
    };
  }, []);

  const mapByCanonicalSlug = useMemo(() => {
    const out = new Map<string, MapCountryPath>();
    for (const item of mapPaths) {
      const key = canonicalSlug(item.name);
      if (!out.has(key)) out.set(key, item);
    }
    return out;
  }, [mapPaths]);

  const countryPins = useMemo<GlobePinInput[]>(() => {
    return allRegionCountries
      .map((country) => {
        const mapEntry = mapByCanonicalSlug.get(canonicalSlug(country.name));
        if (!mapEntry) return null;
        const centroid = pathCentroid(mapEntry.path);
        if (!centroid) return null;
        return {
          cityKey: country.slug,
          cityLabel: country.name,
          lat: centroid.lat,
          lon: centroid.lon,
          groups: [{ focus: "Wine" }]
        } satisfies GlobePinInput;
      })
      .filter((item): item is GlobePinInput => item !== null);
  }, [mapByCanonicalSlug]);

  const storyParagraphs = useMemo(
    () => (selectedCountry ? buildLongTravelTale(selectedCountry, selectedRegionName) : []),
    [selectedCountry, selectedRegionName]
  );

  const narrationText = useMemo(() => storyParagraphs.join(" "), [storyParagraphs]);

  const selectedRegion = useMemo(
    () => selectedCountry?.profile.majorRegions.find((region) => region.region === selectedRegionName) ?? selectedCountry?.profile.majorRegions[0],
    [selectedCountry, selectedRegionName]
  );

  useEffect(() => {
    activeNarrationRef.current = narrationText;
    playbackOffsetRef.current = 0;
    setPlaybackPercent(0);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    speakingRef.current = false;
    setAudioState("idle");
  }, [narrationText]);

  const speakQueue = (synth: SpeechSynthesis) => {
    if (!queueRef.current.length) {
      speakingRef.current = false;
      setAudioState("idle");
      return;
    }
    const next = queueRef.current.shift();
    if (!next) {
      speakingRef.current = false;
      setAudioState("idle");
      return;
    }
    speakingRef.current = true;
    setAudioState("playing");
    synth.speak(next);
  };

  const startAudio = async (offsetOverride?: number) => {
    if (!selectedCountry || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    synth.resume();
    queueRef.current = [];
    speakingRef.current = false;
    const fullText = activeNarrationRef.current || narrationText;
    const startOffset = Math.max(0, Math.min(offsetOverride ?? playbackOffsetRef.current, Math.max(0, fullText.length - 1)));
    const remainder = fullText.slice(startOffset).trimStart();
    const trimDelta = fullText.slice(startOffset).length - remainder.length;
    const queueStart = startOffset + trimDelta;
    const availableVoices = await waitForVoicesReady();
    const chosenVoice = preferredVoiceRef.current ?? pickPreferredStoryVoice(availableVoices);
    preferredVoiceRef.current = chosenVoice;
    const chunks = splitNarrationIntoChunks(remainder);
    if (!chunks.length) {
      setAudioState("idle");
      return;
    }
    let consumed = 0;
    queueRef.current = chunks.map((chunk) => {
      const chunkStart = queueStart + consumed;
      consumed += chunk.length + 1;
      const utterance = new SpeechSynthesisUtterance(chunk);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
        utterance.lang = chosenVoice.lang;
      } else {
        utterance.lang = "en-GB";
      }
      utterance.rate = storySpeed;
      utterance.pitch = 1.02;
      utterance.onboundary = (event) => {
        if (event.name === "word" || event.charIndex >= 0) {
          const nextOffset = Math.min(fullText.length, chunkStart + Math.max(0, event.charIndex));
          playbackOffsetRef.current = nextOffset;
          setPlaybackPercent(fullText.length ? Math.min(100, (nextOffset / fullText.length) * 100) : 0);
        }
      };
      utterance.onend = () => speakQueue(synth);
      utterance.onerror = () => {
        speakingRef.current = false;
        queueRef.current = [];
        setAudioState("idle");
      };
      utterance.onstart = () => {
        const nextOffset = Math.min(fullText.length, chunkStart);
        playbackOffsetRef.current = nextOffset;
        setPlaybackPercent(fullText.length ? Math.min(100, (nextOffset / fullText.length) * 100) : 0);
      };
      utterance.onpause = () => setAudioState("paused");
      utterance.onresume = () => setAudioState("playing");
      return utterance;
    });
    speakQueue(synth);
  };

  const pauseAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setAudioState("paused");
  };

  const resumeAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    if (speakingRef.current || synth.speaking || synth.pending) {
      synth.resume();
      setAudioState("playing");
      return;
    }
    void startAudio(playbackOffsetRef.current);
  };

  const stopAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    queueRef.current = [];
    speakingRef.current = false;
    playbackOffsetRef.current = 0;
    setPlaybackPercent(0);
    setAudioState("idle");
  };

  const onSpeedChange = (next: StorySpeed) => {
    setStorySpeed(next);
    if (audioState === "playing" || audioState === "paused") {
      void startAudio(playbackOffsetRef.current);
    }
  };

  const seekToPercent = (nextPercent: number) => {
    const safe = Math.max(0, Math.min(100, nextPercent));
    setPlaybackPercent(safe);
    const fullText = activeNarrationRef.current || narrationText;
    const targetOffset = Math.round((safe / 100) * fullText.length);
    playbackOffsetRef.current = targetOffset;
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    queueRef.current = [];
    speakingRef.current = false;
    if (audioState === "playing") {
      void startAudio(targetOffset);
      return;
    }
    setAudioState("paused");
  };

  const onSeekInput = (nextPercent: number) => {
    const safe = Math.max(0, Math.min(100, nextPercent));
    setPlaybackPercent(safe);
  };

  if (!selectedCountry) {
    return (
      <section className="academy-story">
        <article className="academy-story-card">
          <h3>Story mode unavailable</h3>
          <p>The country story dataset could not be loaded.</p>
        </article>
      </section>
    );
  }

  const onRegionImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const fallbackStep = img.dataset.fallbackStep ?? "0";
    if (!selectedCountry || !selectedRegion) return;
    if (fallbackStep === "0") {
      img.dataset.fallbackStep = "1";
      img.src = selectedCountry.profile.countryImageUrl;
      return;
    }
    if (fallbackStep === "1") {
      img.dataset.fallbackStep = "2";
      img.src = unsplashFallback(selectedCountry.name, selectedRegion.region);
      return;
    }
    if (fallbackStep === "2") {
      img.dataset.fallbackStep = "3";
      img.src = fallbackImageSvg(selectedCountry.name, selectedRegion.region);
    }
  };

  return (
    <section className="academy-story">
      <article className="academy-story-audio">
        <div>
          <p className="academy-kicker">Sip Academy Story</p>
          <h3>Hummin's Global Regions Chronicle</h3>
          <p>Choose a country on the globe, then select a region chapter. Play audio to listen along.</p>
        </div>
        <div className="academy-story-audio-actions">
          <button type="button" className="btn btn-primary" onClick={() => void startAudio()}>
            Play Audio
          </button>
          <button type="button" className="btn btn-light" onClick={audioState === "paused" ? resumeAudio : pauseAudio}>
            {audioState === "paused" ? "Resume" : "Pause"}
          </button>
          <button type="button" className="btn btn-light" onClick={stopAudio}>
            Stop
          </button>
          <label className="academy-story-speed">
            <span>Speed</span>
            <select value={storySpeed} onChange={(event) => onSpeedChange(Number.parseFloat(event.target.value) as StorySpeed)}>
              {STORY_SPEED_OPTIONS.map((speed) => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
          </label>
        </div>
      </article>

      <article className="academy-story-globe-card">
        <div className="academy-story-globe-head">
          <h4>Global Country Selector</h4>
          <p className="hint">Globe selection follows the same interaction style as Tasting Map and Tasting Groups.</p>
        </div>
        {mapLoading ? (
          <div className="globe-loading">
            <div className="globe-loading-orb" />
            <p>Preparing globe&hellip;</p>
          </div>
        ) : (
          <GlobeMap
            cityPins={countryPins}
            mapPaths={mapPaths}
            selectedCityKey={selectedCountry.slug}
            onPinSelect={(pin) => setSelectedCountrySlug(pin.cityKey)}
          />
        )}
      </article>

      <article className="academy-story-country">
        <div className="academy-story-country-head">
          <div>
            <p className="news-card-tag">{selectedCountry.continentLabel}</p>
            <h3>{selectedCountry.name}</h3>
          </div>
          <select
            value={selectedCountry.slug}
            onChange={(event) => setSelectedCountrySlug(event.target.value)}
            aria-label="Select country chapter"
          >
            {allRegionCountries.map((country) => (
              <option key={country.slug} value={country.slug}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="academy-story-region-tabs" role="tablist" aria-label="Country regions">
          {selectedCountry.profile.majorRegions.map((region) => (
            <button
              key={`${selectedCountry.slug}-${region.region}`}
              type="button"
              className={`academy-story-region-tab ${selectedRegionName === region.region ? "active" : ""}`}
              onClick={() => setSelectedRegionName(region.region)}
              role="tab"
              aria-selected={selectedRegionName === region.region}
            >
              {region.region}
            </button>
          ))}
        </div>

        {selectedRegion ? (
          <figure className="academy-story-region-hero">
            <img
              src={selectedRegion.imageUrl}
              alt={`${selectedCountry.name} ${selectedRegion.region}`}
              loading="lazy"
              decoding="async"
              onError={onRegionImageError}
            />
            <figcaption>
              <strong>{selectedRegion.region}</strong>
              <span>{selectedRegion.iconicVineyard}</span>
            </figcaption>
          </figure>
        ) : null}
      </article>

      <article className="academy-story-card academy-story-tale">
        <h4>Hummin's Tale of {selectedCountry.name}</h4>
        {storyParagraphs.map((paragraph, index) => (
          <p key={`${selectedCountry.slug}-tale-${index}`}>{paragraph}</p>
        ))}
      </article>

      <article className="academy-story-card academy-story-resources">
        <h4>Hummin's Source Shelf</h4>
        <p>Study references used for this country chapter.</p>
        <ul>
          {selectedCountry.profile.resources.map((resource) => (
            <li key={`${selectedCountry.slug}-${resource.url}`}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
            </li>
          ))}
        </ul>
      </article>

      <aside className="academy-story-floating-audio" aria-label="Floating story audio controls">
        <div className="academy-story-floating-controls">
          <button type="button" className="btn btn-primary" onClick={() => void startAudio()} aria-label="Play audio">
            ▶
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={audioState === "paused" ? resumeAudio : pauseAudio}
            aria-label={audioState === "paused" ? "Resume audio" : "Pause audio"}
          >
            {audioState === "paused" ? "⏵" : "⏸"}
          </button>
          <button type="button" className="btn btn-light" onClick={stopAudio} aria-label="Stop audio">
            ⏹
          </button>
          <select
            aria-label="Playback speed"
            value={storySpeed}
            onChange={(event) => onSpeedChange(Number.parseFloat(event.target.value) as StorySpeed)}
          >
            {STORY_SPEED_OPTIONS.map((speed) => (
              <option key={`floating-${speed}`} value={speed}>
                {speed}x
              </option>
            ))}
          </select>
        </div>
        <label className="academy-story-floating-progress">
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={Math.round(playbackPercent)}
            onChange={(event) => onSeekInput(Number.parseInt(event.target.value, 10))}
            onMouseUp={(event) => seekToPercent(Number.parseInt((event.target as HTMLInputElement).value, 10))}
            onTouchEnd={(event) => seekToPercent(Number.parseInt((event.target as HTMLInputElement).value, 10))}
            aria-label="Story playback position"
          />
        </label>
      </aside>
    </section>
  );
}
