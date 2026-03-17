'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface HeroActionsProps {
  tt_wellingtons_demi: { className: string }
  tt_wellingtons: { className: string }
  styles: Record<string, string>
}

export default function HeroActions({
  tt_wellingtons_demi,
  tt_wellingtons,
  styles
}: HeroActionsProps) {
  const router = useRouter()

  const handleAppointmentClick = () => {
    router.push('/appointment')
    sessionStorage.removeItem('bookingData')
    sessionStorage.removeItem('currentStep')
    sessionStorage.removeItem('maxReachedStep')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 mt-8 lg:justify-center">
      <button
        onClick={handleAppointmentClick}
        className={`${tt_wellingtons_demi.className} ${styles.animate_pulse_scale} px-5 py-3 bg-[linear-gradient(180deg,#ffe14d_0%,#ffd808_50%,#e6b800_100%)] shadow-[0px_0.5px_0.5px_rgba(180,130,0,0.3),0px_1px_0.5px_rgba(180,130,0,0.15)] rounded-[6px] border-0 outline-none transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] cursor-pointer text-[#181818] py-4 px-8 tracking-wide flex items-center justify-center text-2xl font-bold text-center hover:scale-103 transition-all`}
      >
        REQUEST APPOINTMENT
      </button>

      <Link
        href="/services"
        className={`${tt_wellingtons_demi.className} border-2 border-[#faf9f6] text-[#faf9f6] text-xl lg:text-[1.35rem] font-semibold px-8 py-5 rounded-[6px] text-center cursor-pointer hover:scale-103 transition-all`}
      >
        Explore Services
      </Link>
    </div>
  )
}
