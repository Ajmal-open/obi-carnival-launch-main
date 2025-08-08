import React, { useEffect, useRef } from "react";

type ParallaxLayerProps = {
  speed?: number; // positive moves with scroll, smaller = slower
  className?: string;
  children?: React.ReactNode;
};

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ speed = 0.1, className, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY * speed;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ParallaxLayer; 