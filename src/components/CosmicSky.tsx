type CosmicSkyProps = {
  className?: string;
  stars?: number;
  meteors?: number;
};

export function CosmicSky({ className = "", stars = 28, meteors = 7 }: CosmicSkyProps) {
  return (
    <div className={`cosmic-sky ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: stars }).map((_, index) => (
        <span
          key={`star-${index}`}
          className="cosmic-star"
          style={{
            left: `${(index * 37) % 100}%`,
            top: `${(index * 19) % 100}%`,
            animationDelay: `${(index % 8) * 0.42}s`
          }}
        />
      ))}
      {Array.from({ length: meteors }).map((_, index) => (
        <span
          key={`meteor-${index}`}
          className="cosmic-meteor"
          style={{
            top: `${6 + (index * 11) % 48}%`,
            left: `${-18 + (index * 7) % 35}%`,
            animationDelay: `${index * 1.4}s`,
            animationDuration: `${4.8 + (index % 3) * 1.3}s`
          }}
        />
      ))}
    </div>
  );
}

