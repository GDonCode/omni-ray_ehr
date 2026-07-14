'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

interface SlidePair {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}

interface BeforeAfterCarouselProps {
  slides?: SlidePair[];
  className?: string;
}

const defaultSlides: SlidePair[] = [
  { beforeSrc: '/before.png', afterSrc: '/after.png' },
  { beforeSrc: '/before-2.png', afterSrc: '/after-2.png' }
];

const BeforeAfterCarousel: React.FC<BeforeAfterCarouselProps> = ({
  slides = defaultSlides,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const activeSlide = slides[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* key resets drag position when slide changes */}
      <BeforeAfterSlider
        key={currentIndex}
        beforeSrc={activeSlide.beforeSrc}
        afterSrc={activeSlide.afterSrc}
        beforeLabel={activeSlide.beforeLabel}
        afterLabel={activeSlide.afterLabel}
      />

      {slides.length > 1 && (
        <>
          {/* Prev / Next arrows */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous before and after example"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#181818]/70 text-[#FAF9F6] hover:bg-[#036d6d] transition-colors duration-200"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next before and after example"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-[#181818]/70 text-[#FAF9F6] hover:bg-[#036d6d] transition-colors duration-200"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to before and after example ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-[#036d6d]' : 'bg-[#181818]/20'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BeforeAfterCarousel;