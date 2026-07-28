import type { BeyondTheGlassSpeaker } from "../../data/beyondTheGlassChapters";

type SpeakerVoiceProfile = {
  localePriority: readonly string[];
  preferredNames: readonly RegExp[];
  voiceNames: readonly RegExp[];
  avoidNames: readonly RegExp[];
};

export type SpeakerVoiceMap = Record<
  BeyondTheGlassSpeaker,
  SpeechSynthesisVoice | null
>;

export const SPEAKER_SETTINGS: Record<
  BeyondTheGlassSpeaker,
  { fallbackLang: string; pitch: number; rate: number }
> = {
  Sippy: { fallbackLang: "en-GB", pitch: 1, rate: 0.98 },
  Roma: { fallbackLang: "en-GB", pitch: 1.01, rate: 0.96 },
  Hummin: { fallbackLang: "en-IE", pitch: 0.99, rate: 0.97 }
};

const MALE_VOICE_NAMES = [
  /male/i,
  /\b(?:alfie|arthur|brian|daniel|david|ethan|george|james|oliver|ryan|thomas)\b/i
] as const;

const FEMALE_VOICE_NAMES = [
  /female/i,
  /\b(?:emma|emily|hazel|kate|libby|martha|molly|serena|sonia|stephanie)\b/i
] as const;

const SPEAKER_VOICE_PROFILES: Record<
  BeyondTheGlassSpeaker,
  SpeakerVoiceProfile
> = {
  Sippy: {
    localePriority: ["en-GB", "en-IE", "en-US", "en-AU", "en"],
    preferredNames: [
      /\b(?:ryan|daniel|arthur|george|oliver|thomas|alfie|ethan)\b/i,
      /uk english male/i
    ],
    voiceNames: MALE_VOICE_NAMES,
    avoidNames: FEMALE_VOICE_NAMES
  },
  Roma: {
    localePriority: ["en-GB", "en-IE", "en-US", "en-AU", "en"],
    preferredNames: [
      /\b(?:fiona|heather|iona|isla|mairi|morag)\b/i,
      /scot(?:land|tish)/i
    ],
    voiceNames: FEMALE_VOICE_NAMES,
    avoidNames: MALE_VOICE_NAMES
  },
  Hummin: {
    localePriority: ["en-IE", "en-GB", "en-US", "en-AU", "en"],
    preferredNames: [
      /\b(?:ciaran|cillian|colm|con(?:n)?or|darragh|liam|oisin)\b/i,
      /(?:ireland|irish)/i
    ],
    voiceNames: MALE_VOICE_NAMES,
    avoidNames: FEMALE_VOICE_NAMES
  }
};

export function emptySpeakerVoiceMap(): SpeakerVoiceMap {
  return { Sippy: null, Roma: null, Hummin: null };
}

function normalizedLocale(locale: string): string {
  return locale.trim().replace(/_/g, "-").toLowerCase();
}

function matchesAny(value: string, patterns: readonly RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(value));
}

function voiceScore(
  voice: SpeechSynthesisVoice,
  profile: SpeakerVoiceProfile
): number {
  const locale = normalizedLocale(voice.lang);
  if (!locale.startsWith("en")) return Number.NEGATIVE_INFINITY;

  const name = voice.name.trim();
  const localeIndex = profile.localePriority.findIndex((candidate) => {
    const normalizedCandidate = normalizedLocale(candidate);
    return normalizedCandidate === "en"
      ? locale.startsWith("en")
      : locale === normalizedCandidate ||
          locale.startsWith(`${normalizedCandidate}-`);
  });

  const localeScore =
    localeIndex < 0 ? 0 : Math.max(20, 90 - localeIndex * 15);
  const preferredNameScore = matchesAny(name, profile.preferredNames) ? 120 : 0;
  const voiceNameScore = matchesAny(name, profile.voiceNames) ? 38 : 0;
  const avoidNamePenalty = matchesAny(name, profile.avoidNames) ? 65 : 0;
  const qualityScore = /natural|neural|premium|enhanced/i.test(name) ? 24 : 0;
  const defaultScore = voice.default ? 2 : 0;

  return (
    localeScore +
    preferredNameScore +
    voiceNameScore +
    qualityScore +
    defaultScore -
    avoidNamePenalty
  );
}

function pickSpeakerVoice(
  voices: SpeechSynthesisVoice[],
  profile: SpeakerVoiceProfile,
  excludedVoiceUris: ReadonlySet<string>
): SpeechSynthesisVoice | null {
  const candidates = voices
    .filter((voice) => !excludedVoiceUris.has(voice.voiceURI))
    .map((voice, index) => ({ index, score: voiceScore(voice, profile), voice }))
    .filter((candidate) => Number.isFinite(candidate.score))
    .sort((left, right) => right.score - left.score || left.index - right.index);

  return candidates[0]?.voice ?? null;
}

export function selectBeyondTheGlassVoices(
  voices: SpeechSynthesisVoice[]
): SpeakerVoiceMap {
  const selected = emptySpeakerVoiceMap();
  const usedVoiceUris = new Set<string>();

  // Browser voices are installed by the device or browser and cannot provide
  // identical accents everywhere. Pick constrained roles first, then use the
  // closest English fallback without exaggerating an accent through pitch.
  const selectionOrder: BeyondTheGlassSpeaker[] = ["Roma", "Hummin", "Sippy"];
  for (const speaker of selectionOrder) {
    const profile = SPEAKER_VOICE_PROFILES[speaker];
    const distinctVoice = pickSpeakerVoice(voices, profile, usedVoiceUris);
    const voice = distinctVoice ?? pickSpeakerVoice(voices, profile, new Set());
    selected[speaker] = voice;
    if (voice) usedVoiceUris.add(voice.voiceURI);
  }

  return selected;
}
