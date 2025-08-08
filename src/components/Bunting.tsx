import React from "react";

type BuntingProps = {
  className?: string;
  flip?: boolean;
};

const COLORS = [
  "#D62828", // red
  "#F7B538", // gold
  "#219EBC", // teal
  "#9C27B0", // purple
  "#FF6B6B", // coral
];

const Bunting: React.FC<BuntingProps> = ({ className, flip }) => {
  return (
    <div aria-hidden className={className}>
      <svg
        viewBox="0 0 1200 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-12 ${flip ? "rotate-180" : ""}`}
      >
        {/* string */}
        <path d="M0,10 C300,40 900,-20 1200,10" stroke="#6B4F4F" strokeWidth="4" fill="none" />
        {/* triangles */}
        {Array.from({ length: 24 }).map((_, i) => {
          const x = i * 50 + 15;
          const color = COLORS[i % COLORS.length];
          return (
            <path key={i} d={`M${x},12 L${x + 20},60 L${x + 40},12 Z`} fill={color} stroke="#6B4F4F" strokeWidth="2" />
          );
        })}
      </svg>
    </div>
  );
};

export default Bunting; 