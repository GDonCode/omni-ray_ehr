import React from 'react';
import Link from 'next/link';
import HeroSlider from './HeroSlider';
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
    <section className="relative mt-31 lg:mt-32 lg:mb-12 mb-8 bg-[#058080]">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center lg:gap-40 px-6 pt-6 pb-10 lg:pb-8 lg:pt-16 lg:px-0">
          {/* Content Section */}
          <div className="lg:w-[60%] z-10 lg:-mt-4">
            {/* Heading */}
            <h1 className="flex flex-col items-center">
              <p className={`${tt_wellingtons_demi.className} text-2xl text-[#FAF9F6] font-semibold tracking-wider`}>
                the <span className="text-[#f6d212]">golden</span> touch for
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

          {/* Image Section */}
          <div className="w-[92%] sm:w-[80%] lg:w-[35%] mx-auto mt-14 lg:mt-0">
            <div className="relative">
              <div className="aspect-[4/4] relative bg-gray-100">
                <HeroSlider images={images} />
              </div>
              {/* Image Label */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#f6d212] px-6 py-2">
                <p className={`${inter_heading.className} text-sm uppercase tracking-wider text-[#181818] text-center font-bold`}>
                  Before & After
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;