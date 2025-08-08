import React from "react";

type Props = { flip?: boolean; className?: string };

const CloudDivider: React.FC<Props> = ({ flip, className }) => (
  <div aria-hidden className={className}>
    <svg
      viewBox="0 0 1440 120"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`w-full h-20 ${flip ? 'rotate-180' : ''}`}
    >
      <path
        fill="currentColor"
        d="M0,80 C120,40 200,100 320,80 C440,60 520,100 640,80 C760,60 840,100 960,80 C1080,60 1240,100 1440,80 L1440,120 L0,120 Z"
      />
    </svg>
  </div>
);

export default CloudDivider; 