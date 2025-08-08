import React, { useEffect, useRef, useState } from "react";
import Bunting from "@/components/Bunting";

type Props = { className?: string };

const StickyBunting: React.FC<Props> = ({ className }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // When sentinel leaves the top of the viewport, set stuck = true
        setStuck(!entry.isIntersecting);
      },
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <div className={className}>
      {/* Sentinel at the bunting's original spot */}
      <div ref={sentinelRef} aria-hidden className="h-0" />
      {/* Reserve space when bunting becomes fixed to avoid layout shift (approx bunting height = 48px) */}
      {stuck && <div aria-hidden className="h-12" />}
      <div className={stuck ? "fixed top-0 left-0 right-0 z-30 pointer-events-none" : "relative z-10"}>
        <Bunting />
      </div>
    </div>
  );
};

export default StickyBunting; 