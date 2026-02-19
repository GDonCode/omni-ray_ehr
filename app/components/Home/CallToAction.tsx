// components/CallToAction.tsx
import React from 'react';
import Link from 'next/link';

interface CallToActionProps {
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  tt_wellingtons: { className: string };
  styles?: { animate_pulse_scale?: string };
}

const CallToAction: React.FC<CallToActionProps> = ({
  inter_heading,
  tt_wellingtons_demi,
  tt_wellingtons,
  styles
}) => {
  return (
    <section className="w-[95%] lg:w-[75%] mx-auto px-6 flex flex-col lg:flex-row lg:justify-around lg:items-center bg-[#EAF3F7]">
      {/* Content */}
      <div className="lg:w-[50%]">
        <p className={`${inter_heading.className} inline-block text-[#181818] bg-[#ffdf20] px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold tracking-wide`}>
          Book in 4 steps
        </p>
        <h2 className={`${tt_wellingtons_demi.className} text-4xl text-[#036d6d] font-bold mb-6`}>
          Ready to Transform Your Smile?
        </h2>
        <p className={`${tt_wellingtons.className} leading-7.5 text-[1.2rem] text-[#181818] mb-8 text-left tracking-wide font-medium`}>
          Schedule your consultation{' '}
          <span className={`${tt_wellingtons_demi.className} font-extrabold`}>today</span>
          {' '}and take the first step towards a healthier,{' '}
          <span className={`${tt_wellingtons_demi.className} font-extrabold`}>more beautiful smile</span>.
        </p>
      </div>

      {/* CTA Button */}
      <Link
        href="/appointment"
        className={`${tt_wellingtons_demi.className} ${styles?.animate_pulse_scale || 'animate-pulse'} bg-[#f6d212] text-[#181818] py-4 px-8 tracking-wide flex items-center justify-center rounded-md text-2xl font-bold text-center cursor-pointer hover:scale-103 transition-all duration-300`}
      >
        REQUEST APPOINTMENT
      </Link>
    </section>
  );
};

export default CallToAction;