type Props = {
  flip?: boolean;
  className?: string;
};

const WaveSeparator = ({ flip = false, className }: Props) => {
  return (
    <div aria-hidden="true" className={className}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-12 ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,32 C120,64 360,64 720,32 C1080,0 1320,0 1440,32 L1440,80 L0,80 Z"
        />
      </svg>
    </div>
  );
};

export default WaveSeparator;
