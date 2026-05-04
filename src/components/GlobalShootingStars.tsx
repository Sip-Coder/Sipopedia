import type { CSSProperties } from "react";

const STREAKS = [
  { x: "14%", y: "18%", angle: 33.4, travel: "19vw", speed: "2.0s", twinkle: "3.3s", delay: "-0.3s" },
  { x: "31%", y: "29%", angle: 35.1, travel: "16vw", speed: "2.4s", twinkle: "3.8s", delay: "-1.1s" },
  { x: "46%", y: "22%", angle: 32.7, travel: "18vw", speed: "2.2s", twinkle: "3.4s", delay: "-0.8s" },
  { x: "61%", y: "35%", angle: 34.8, travel: "17vw", speed: "2.6s", twinkle: "4.1s", delay: "-1.6s" },
  { x: "78%", y: "19%", angle: 33.2, travel: "20vw", speed: "2.1s", twinkle: "3.5s", delay: "-0.5s" },
  { x: "22%", y: "56%", angle: 35.4, travel: "18vw", speed: "2.5s", twinkle: "4.0s", delay: "-1.4s" },
  { x: "39%", y: "63%", angle: 32.9, travel: "15vw", speed: "2.3s", twinkle: "3.7s", delay: "-0.9s" },
  { x: "54%", y: "72%", angle: 34.2, travel: "19vw", speed: "2.7s", twinkle: "4.2s", delay: "-2.0s" },
  { x: "70%", y: "61%", angle: 35.8, travel: "17vw", speed: "2.0s", twinkle: "3.6s", delay: "-1.2s" }
] as const;

export function GlobalShootingStars() {
  return (
    <div className="global-shooting-stars" aria-hidden="true">
      {STREAKS.map((streak, index) => (
        <span
          key={`streak-${index}`}
          className="global-shooting-star"
          style={
            {
              "--star-x": streak.x,
              "--star-y": streak.y,
              "--star-angle": `${streak.angle}deg`,
              "--star-travel": streak.travel,
              "--star-speed": streak.speed,
              "--star-twinkle": streak.twinkle,
              "--star-delay": streak.delay
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
