import { useEffect, useMemo, useState } from "react";
import type { BeyondTheGlassSpeaker } from "../../data/beyondTheGlassChapters";

type GuideMotion = "idle" | "jumping" | "review" | "running" | "waiting" | "waving";

type GuideSpriteProps = {
  active?: boolean;
  className?: string;
  cue?: string | number;
  reducedMotion?: boolean;
  speaker: BeyondTheGlassSpeaker;
};

const GUIDE_SLUGS: Record<BeyondTheGlassSpeaker, string> = {
  Sippy: "sippy",
  Roma: "roma",
  Hummin: "hummin"
};

const GUIDE_REACTIONS: Record<BeyondTheGlassSpeaker, GuideMotion[]> = {
  Sippy: ["waving", "review", "jumping"],
  Roma: ["jumping", "waving", "review"],
  Hummin: ["running", "review", "waiting"]
};

const GUIDE_TIMING: Record<BeyondTheGlassSpeaker, { pause: number; reaction: number }> = {
  Sippy: { pause: 5_600, reaction: 1_450 },
  Roma: { pause: 6_400, reaction: 1_550 },
  Hummin: { pause: 7_100, reaction: 1_650 }
};

function cueIndex(cue: GuideSpriteProps["cue"], length: number): number {
  const value = String(cue ?? "");
  const total = Array.from(value).reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return total % length;
}

export function GuideSprite({
  active = true,
  className,
  cue,
  reducedMotion = false,
  speaker
}: GuideSpriteProps) {
  const reactions = GUIDE_REACTIONS[speaker];
  const timing = GUIDE_TIMING[speaker];
  const startingReaction = cueIndex(cue, reactions.length);
  const [motion, setMotion] = useState<GuideMotion>("idle");

  const sources = useMemo(() => {
    const slug = GUIDE_SLUGS[speaker];
    return {
      motion: `/beyond-the-glass/guides/animated/${slug}-${motion}.gif`,
      still: `/beyond-the-glass/guides/animated/${slug}-still.png`
    };
  }, [motion, speaker]);

  useEffect(() => {
    if (reducedMotion || !active) {
      setMotion("idle");
      return;
    }

    let reactionIndex = startingReaction;
    let pauseTimer = 0;
    let reactionTimer = 0;
    let cancelled = false;

    const scheduleReaction = (delay: number) => {
      pauseTimer = window.setTimeout(() => {
        if (cancelled) return;
        setMotion(reactions[reactionIndex % reactions.length]);
        reactionIndex += 1;
        reactionTimer = window.setTimeout(() => {
          if (cancelled) return;
          setMotion("idle");
          scheduleReaction(timing.pause);
        }, timing.reaction);
      }, delay);
    };

    setMotion(reactions[reactionIndex % reactions.length]);
    reactionIndex += 1;
    reactionTimer = window.setTimeout(() => {
      if (cancelled) return;
      setMotion("idle");
      scheduleReaction(timing.pause);
    }, timing.reaction);

    return () => {
      cancelled = true;
      window.clearTimeout(pauseTimer);
      window.clearTimeout(reactionTimer);
    };
  }, [active, cue, reactions, reducedMotion, speaker, startingReaction, timing.pause, timing.reaction]);

  return (
    <span
      aria-hidden="true"
      className={["btg-guide-sprite", className].filter(Boolean).join(" ")}
      data-motion={reducedMotion ? "still" : motion}
      data-speaker={speaker}
    >
      <img
        alt=""
        decoding="async"
        draggable={false}
        src={reducedMotion ? sources.still : sources.motion}
      />
    </span>
  );
}
