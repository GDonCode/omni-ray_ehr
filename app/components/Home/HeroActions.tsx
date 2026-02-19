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
        className={`${tt_wellingtons_demi.className} ${styles.animate_pulse_scale} bg-[#f6d212] text-[#181818] py-4 px-8 tracking-wide flex items-center justify-center rounded-md text-2xl font-bold text-center cursor-pointer hover:scale-103 transition-all`}
      >
        REQUEST APPOINTMENT
      </button>

      <Link
        href="/services"
        className={`${tt_wellingtons_demi.className} border-2 border-[#faf9f6] text-[#faf9f6] text-xl lg:text-[1.35rem] font-semibold px-8 py-5 rounded-md text-center cursor-pointer hover:scale-103 transition-all`}
      >
        Explore Services
      </Link>
    </div>
  )
}
