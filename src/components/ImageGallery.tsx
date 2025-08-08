import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export type ImageGalleryProps = {
  images: { src: string; alt: string }[];
  className?: string;
  autoplayMs?: number;
  pauseOnHover?: boolean;
};

// Simple media query hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  className, 
  autoplayMs = 3500,
  pauseOnHover = true 
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;
    
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Set up autoplay
    if (!reduceMotion && images.length > 1) {
      console.log('Setting up autoplay with interval:', autoplayMs);
      intervalRef.current = setInterval(() => {
        if (!paused && api) {
          console.log('Autoplay: calling api.scrollNext()');
          api.scrollNext();
        }
      }, autoplayMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [api, autoplayMs, images.length, paused, reduceMotion]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setPaused(false);
  };

  return (
    <div className={className}>
      <div 
        className="relative rounded-xl p-4 bg-white/60 border border-dashed border-[hsl(38_60%_70%)] shadow-sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(closest-side,white,transparent)]">
          {/* marquee dots */}
          <div className="absolute inset-x-6 top-2 flex gap-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-[hsl(40_90%_60%)] animate-pulse" style={{ animationDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
        <Carousel 
          className=""
          setApi={setApi}
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent>
            {images.map((img, idx) => (
              <CarouselItem key={idx}>
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-[280px] md:h-[360px] object-cover rounded-lg" 
                  loading={idx === 0 ? 'eager' : 'lazy'} 
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white/80 backdrop-blur" />
          <CarouselNext className="bg-white/80 backdrop-blur" />
        </Carousel>
      </div>
    </div>
  );
};

export default ImageGallery; 