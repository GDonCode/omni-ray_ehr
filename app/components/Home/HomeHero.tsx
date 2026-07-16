import React from 'react';
import Link from 'next/link';
import HeroActions from './HeroActions';

interface HomeHeroProps {
  tt_wellingtons_demi: { className: string };
  tt_wellingtons: { className: string };
  cinzel: { className: string };
  inter_heading: { className: string };
  styles: Record<string, string>; 
  images: string[];
}

const HomeHero: React.FC<HomeHeroProps> = ({
  tt_wellingtons_demi,
  tt_wellingtons,
  cinzel,
  inter_heading,
  styles,
  images
}) => {

  return (
    <section className="relative mt-16.5 lg:mt-30 min-h-[calc(100vh-7.75rem)] lg:min-h-[calc(100vh-7.5rem)] lg:pb-12 pb-8 bg-[#058080] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay for content contrast */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-7xl mx-auto min-h-[calc(100vh-7.75rem)] lg:min-h-[calc(100vh-7.5rem)]">
        <div className="relative flex flex-col items-center justify-center h-full min-h-[calc(100vh-7.75rem)] lg:min-h-[calc(100vh-7.5rem)] px-6 lg:px-0">
          {/* Content Section */}
          <div className="z-10 w-full lg:w-[70%] mx-auto text-center">
            {/* Heading */}
            <h1 className="flex flex-col items-center">
              <p className={`${tt_wellingtons_demi.className} mt-4 md:mt-0 text-2xl text-[#FAF9F6] font-semibold tracking-wider`}>
                the <span className="text-[#f6d212]">golden</span> touch to
              </p>
              <span
                className={`${cinzel.className} text-[3.25rem] lg:text-7xl text-[#FAF9F6] font-bold -mt-2 lg:-mt-0`}
                style={{ textShadow: '0 0 30px rgba(255,255,255,0.8)' }}
              >
                YOUR <span className="ml-2">SMILE</span>
              </span>
            </h1>

            {/* Description */}
            <p className={`${tt_wellingtons.className} text-xl leading-relaxed text-[#faf9f6] mt-4 lg:mt-8`}>
              Whether you're here for a routine checkup or a complete smile makeover,
              our <span className={`${tt_wellingtons_demi.className} font-extrabold`}>experienced</span> team is
              dedicated to giving you the care you deserve — in a space that
              <span className={`${tt_wellingtons_demi.className} font-extrabold`}> feels like home.</span>
            </p>

            {/* CTA Buttons */}
            <HeroActions
              tt_wellingtons_demi={tt_wellingtons_demi}
              tt_wellingtons={tt_wellingtons}
              styles={styles}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;