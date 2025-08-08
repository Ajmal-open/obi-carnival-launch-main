import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  repeat?: boolean; // when true, animation re-triggers on each re-entry
};

const Reveal: React.FC<RevealProps> = ({ children, className = "", delayMs = 0, repeat = true }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let enterTimer: number | undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // entering viewport -> reveal after optional delay
            if (enterTimer) window.clearTimeout(enterTimer);
            if (delayMs > 0) {
              enterTimer = window.setTimeout(() => setShow(true), delayMs);
            } else {
              setShow(true);
            }
          } else if (repeat) {
            // leaving viewport -> reset so it can animate again next time
            if (enterTimer) window.clearTimeout(enterTimer);
            setShow(false);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    io.observe(el);

    return () => {
      if (enterTimer) window.clearTimeout(enterTimer);
      io.disconnect();
    };
  }, [delayMs, repeat]);

  return (
    <div ref={ref} data-show={show} className={className}>
      <div data-show={show}>{children}</div>
    </div>
  );
};

export default Reveal; 