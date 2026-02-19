'use client';

import Link from 'next/link';

interface Props {
  onHome: () => void;
  onServices: () => void;
  fontClasses: {
    tt_wellingtons_demi: string;
    tt_wellingtons: string;
    inter: string;
  };
}

export default function Step5Success({ onHome, onServices, fontClasses }: Props) {
  return (
    <div className="flex flex-col gap-6 pb-6 px-2 -mt-2 lg:pt-44 pt-38">
      <div>
        <h1 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#036d6d] mb-4`}>
          We've Received Your Appointment Request
        </h1>
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] leading-8 text-[1.2rem]`}>
          Thank you for choosing Aurelia Dental! We have received your appointment request and will review it shortly.
        </p>
      </div>
      <div>
        <h2 className={`${fontClasses.tt_wellingtons_demi} text-xl font-bold text-[#036d6d] mb-4`}>
          What Happens Next?
        </h2>
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] leading-8 text-[1.2rem]`}>
          Our scheduling team will contact you within one business day using your preferred contact method to confirm your appointment date and time.
          <br /> We'll work with you to find a time that fits your schedule.
        </p>
      </div>
      <div>
        <h2 className={`${fontClasses.tt_wellingtons_demi} text-xl font-bold text-[#036d6d] mb-4`}>
          In the meantime...
        </h2>
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] leading-8 text-[1.2rem]`}>
          If you have any questions or need to make changes to your request, reach out to us at{' '}
          <Link href="tel:+18766919136" className={`${fontClasses.inter} font-bold underline text-[#036d6d]`}>
            +1 (876) 691 9136
          </Link>{' '}
          or{' '}
          <Link href="mailto:aureliadental@gmail.com" className={`${fontClasses.inter} font-bold underline text-[#036d6d]`}>
            aureliadental@gmail.com
          </Link>
          . <br /> We look forward to seeing you soon and providing you with excellent dental care!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center mt-2">
        <button
          onClick={onHome}
          className={`${fontClasses.tt_wellingtons_demi} mt-4 px-8 py-4 w-[85%] bg-[#036d6d] text-white text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}
        >
          Back to Home
        </button>
        <button
          onClick={onServices}
          className={`${fontClasses.tt_wellingtons_demi} mt-4 px-8 py-4 w-[85%] bg-[#f6d212] text-[#181818] text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}
        >
          View Our Services
        </button>
      </div>
    </div>
  );
}