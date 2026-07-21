'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  onHome: () => void;
  onServices: () => void;
  onClearData: () => void;
  fontClasses: {
    tt_wellingtons_demi: string;
    tt_wellingtons: string;
    inter: string;
  };
}

export default function Step5Success({ onHome, onServices, onClearData, fontClasses }: Props) {
  const router = useRouter();

    const handleHome = () => {
      onClearData();   // clear stored booking data
      onHome();        // then navigate home
    };

    const handleServices = () => {
      onClearData();   // clear stored booking data
      onServices();    // then navigate to services
    };

  return (
    <div className="flex flex-col gap-6 pb-6 px-2 -mt-2 lg:pt-44 pt-38">
      <div>
        <h1 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#036d6d] mb-4`}>
          Your Appointment Is Confirmed
        </h1>
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] leading-8 text-[1.2rem]`}>
          Thank you for choosing Aurelia Dental! Your appointment is booked, and a confirmation email is on its way to you now.
        </p>
      </div>
      <div>
        <h2 className={`${fontClasses.tt_wellingtons_demi} text-xl font-bold text-[#036d6d] mb-4`}>
          What Happens Next?
        </h2>
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] leading-8 text-[1.2rem]`}>
          Check your inbox for your confirmation email with your appointment date and time.
          <br /> We'll also send you a reminder as your visit approaches.
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
          onClick={handleHome}
          className={`${fontClasses.tt_wellingtons_demi} mt-4 px-8 py-4 w-[85%] bg-[#036d6d] text-white text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}
          style={{
            background: 'linear-gradient(180deg, #1a9e9e 0%, #058080 50%, #036d6d 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(3,80,80,0.3), 0px 1px 0.5px rgba(3,80,80,0.15)',
            color: '#ffffff',
          }}
        >
          Back to Home
        </button>
        <button
          onClick={handleServices}
          className={`${fontClasses.tt_wellingtons_demi} mt-4 px-8 py-4 w-[85%] text-[#181818] text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}
          style={{
              background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
              boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
              color: '#181818',
            }}
        >
          View Our Services
        </button>
      </div>
    </div>
  );
}