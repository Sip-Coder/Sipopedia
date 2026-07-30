import { useEffect, useMemo, useState, type RefObject } from "react";
import type { BeyondTheGlassScene } from "../../data/beyondTheGlassChapters";

export function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function progressBetween(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0;
  return clamp((progress - start) / (end - start));
}

export function sceneIndexForProgress(progress: number, scenes: BeyondTheGlassScene[]): number {
  const match = scenes.findIndex((scene) => progress >= scene.range[0] && progress < scene.range[1]);
  return match >= 0 ? match : Math.max(0, scenes.length - 1);
}

export function usePrefersReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reducedMotion;
}

export function useScrollStoryProgress(
  sectionRef: RefObject<HTMLElement>,
  scenes: BeyondTheGlassScene[]
) {
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof window === "undefined" || reducedMotion) {
      setProgress(0);
      return;
    }

    let frame = 0;
    let latestProgress = -1;
    let resizeFrame = 0;

    const measure = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const nextProgress = clamp(-rect.top / travel);
      if (Math.abs(nextProgress - latestProgress) < 0.0005) return;
      latestProgress = nextProgress;
      setProgress(nextProgress);
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    const preserveProgressOnResize = () => {
      if (resizeFrame !== 0) window.cancelAnimationFrame(resizeFrame);
      const preservedProgress = latestProgress < 0 ? 0 : latestProgress;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = window.requestAnimationFrame(() => {
          resizeFrame = 0;
          const nextRect = section.getBoundingClientRect();
          const nextSectionTop = window.scrollY + nextRect.top;
          const nextTravel = Math.max(1, nextRect.height - window.innerHeight);
          window.scrollTo({
            behavior: "auto",
            top: Math.max(0, nextSectionTop + nextTravel * preservedProgress)
          });
          measure();
        });
      });
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", preserveProgressOnResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", preserveProgressOnResize);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      if (resizeFrame !== 0) window.cancelAnimationFrame(resizeFrame);
    };
  }, [reducedMotion, sectionRef]);

  const sceneIndex = useMemo(() => sceneIndexForProgress(progress, scenes), [progress, scenes]);
  const activeScene = scenes[sceneIndex] ?? scenes[0];
  const sceneProgress = activeScene
    ? progressBetween(progress, activeScene.range[0], activeScene.range[1])
    : 0;

  return {
    activeScene,
    progress,
    reducedMotion,
    sceneIndex,
    sceneProgress
  };
}
