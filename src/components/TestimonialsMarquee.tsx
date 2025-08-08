import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PaperNote from "@/components/PaperNote";

export type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  img?: string;
};

type Props = {
  items: Testimonial[];
  className?: string;
  speedMs?: number; // duration for full loop
};

const TestimonialCard: React.FC<{ t: Testimonial; tilt?: "left" | "right" | "none" }> = ({ t, tilt = "none" }) => (
  <div className="min-w-[280px] md:min-w-[360px] max-w-[360px] shrink-0 mx-3">
    <PaperNote className="h-full" tilt={tilt}>
      <figcaption className="flex items-center gap-3 text-foreground">
        <Avatar className="h-10 w-10 ring-2 ring-white shadow">
          {t.img && <AvatarImage src={t.img} alt={t.name} />}
          <AvatarFallback>{t.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-caveat text-xl leading-tight text-foreground">{t.name}</div>
          {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
        </div>
      </figcaption>
      <blockquote className="mt-3 text-sm md:text-base">“{t.quote}”</blockquote>
    </PaperNote>
  </div>
);

const TestimonialsMarquee: React.FC<Props> = ({ items, className, speedMs = 30000 }) => {
  // Duplicate items to create the seamless loop
  const loop = [...items, ...items];

  // Randomize a stable tilt per unique item, reused for its duplicate
  const tilts = React.useMemo<("left" | "right" | "none")[]>(() => {
    const choices: Array<"left" | "right" | "none"> = ["left", "right", "none"];
    return items.map(() => choices[Math.floor(Math.random() * choices.length)]);
  }, [items]);

  return (
    <div
      className={"relative overflow-x-hidden overflow-y-visible py-4 group " + (className || "")}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="marquee" style={{ ['--marquee-duration' as any]: `${speedMs}ms` }}>
        <div className="marquee-track flex items-stretch">
          {loop.map((t, i) => (
            <TestimonialCard key={i + t.name} t={t} tilt={tilts[i % items.length]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsMarquee; 