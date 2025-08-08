import React from "react";
import { cn } from "@/lib/utils";

type PaperNoteProps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  tilt?: "left" | "right" | "none";
};

const PaperNote: React.FC<PaperNoteProps> = ({ title, className, children, tilt = "none" }) => {
  const rotate = tilt === 'left' ? '-rotate-1' : tilt === 'right' ? 'rotate-1' : '';
  return (
    <div
      className={cn(
        "relative rounded-[12px] p-5 bg-[hsl(38_100%_94%)] text-[hsl(222.2_84%_4.9%)] shadow-sm",
        "before:absolute before:inset-0 before:rounded-[12px] before:bg-[radial-gradient(200px_80px_at_30%_0%,_#fff,_transparent_60%),radial-gradient(200px_80px_at_70%_120%,_#fff,_transparent_60%)] before:opacity-40",
        "border border-[hsl(38_50%_80%)]",
        rotate,
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.85)), url("data:image/svg+xml,%3Csvg width=\'160\' height=\'160\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'16\' height=\'16\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M0 16L16 0M-4 12L4 4M12 20L20 12\' stroke=\'%23d9c9a5\' stroke-width=\'0.5\' opacity=\'0.2\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'url(%23p)\' width=\'100%25\' height=\'100%25\'/%3E%3C/svg%3E")',
        backgroundBlendMode: 'multiply',
      }}
    >
      {title && <h3 className="mb-2 font-semibold font-caveat text-xl md:text-2xl">{title}</h3>}
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
};

export default PaperNote; 