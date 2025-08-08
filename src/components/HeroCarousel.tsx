import React, { useEffect, useMemo, useRef, useState } from "react";

export type HeroCarouselProps = {
  images: { src: string; alt: string }[];
  autoplayMs?: number;
  className?: string;
  heightClassName?: string; // e.g., "h-80 md:h-[420px]"
  pauseOnHover?: boolean; // default false
  respectReducedMotion?: boolean; // default true
};

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  autoplayMs = 4500,
  className,
  heightClassName = "h-64 md:h-[420px]",
  pauseOnHover = false,
  respectReducedMotion = true,
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const lastTickRef = useRef<number | null>(null);
  const reduceMotion = useMemo(
    () =>
      respectReducedMotion && typeof window !== "undefined" &&
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [respectReducedMotion]
  );

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    let elapsed = 0;
    lastTickRef.current = performance.now();

    const interval = setInterval(() => {
      if (paused) return;
      const now = performance.now();
      const dt = now - (lastTickRef.current || now);
      lastTickRef.current = now;
      elapsed += dt;
      const p = Math.min(1, elapsed / autoplayMs);
      setProgress(p);
      if (elapsed >= autoplayMs) {
        elapsed = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % images.length);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [autoplayMs, images.length, paused, reduceMotion]);

  useEffect(() => {
    setProgress(0);
  }, [index]);

  const goTo = (i: number) => {
    setIndex((i + images.length) % images.length);
    setProgress(0);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const progressPercent = reduceMotion ? 0 : Math.round(progress * 100);

  return (
    <div
      className={"relative w-full select-none " + (className || "")}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      aria-roledescription="carousel"
    >
      {/* frame container */}
      <div className={`relative overflow-hidden rounded-3xl ring-1 ring-black/5 shadow-lg ${heightClassName}`} style={{ aspectRatio: '3 / 2' }}>
        {/* progress bar inside frame */}
        <div className="absolute inset-x-0 top-0 h-1 bg-black/5">
          <div className="h-full bg-[linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end)))] transition-[width] duration-100 ease-out" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* slides */}
        {images.map((img, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            {(() => {
              const attrs: any = { fetchpriority: i === 0 ? 'high' : 'auto' };
              return (
                <img
                  src={img.src}
                  alt={img.alt}
                  className={`w-full h-full object-cover md:object-cover sm:object-contain ${i === index && !reduceMotion ? 'kenburns-active' : ''}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...attrs}
                />
              );
            })()}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
          </div>
        ))}

        {/* controls anchored to frame */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-sm hover:bg-white shadow"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur px-2 py-1 text-sm hover:bg-white shadow"
        >
          ›
        </button>

        {/* dots inside frame */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2.5 w-2.5 rounded-full border border-[hsl(38_60%_70%)] ${i === index ? 'bg-[hsl(40_90%_60%)]' : 'bg-white/70 hover:bg-white'} transition-colors`}
            />)
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel; 