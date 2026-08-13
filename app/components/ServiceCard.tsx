import localFont from "next/font/local";
import { DollarSign, Clock } from 'lucide-react';


const inter = localFont ({
  src: "../fonts/Inter/Inter-Regular.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})

interface ServiceCardProps {
  service: {
    name: string;
    duration: string;
    price: string;
    description: string;
    details: string;
    when: string[];
  };
  isSelected: boolean;
  onSelect: () => void;
  'data-service-name'?: string; // Add this
}

export default function ServiceCard({ 
  service, 
  isSelected, 
  onSelect,
  'data-service-name': dataServiceName 
}: ServiceCardProps) {
  return (
    <div
      onClick={onSelect}
      data-service-name={dataServiceName}
      className={`
        relative p-5 flex flex-col cursor-pointer
        backdrop-blur-lg
        bg-white border border-[#036d6d]/20 shadow-lg rounded-sm
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-white/30
        ${isSelected
          ? `
            bg-[#177A7A]
            border-[#FFD700]
            ring-4 ring-[#FFD700]
            shadow-[0_12px_30px_rgba(255,215,0,0.3)]
            scale-[1.04]
          `
          : ''
        }
      `}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-900">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Service Name */}
      <h3 className={`${tt_wellingtons_demi.className} text-2xl tracking-tight font-bold mb-2 pr-6 leading-tight text-[#036d6d]`}>
        {service.name}
      </h3>

      {/* Brief Description - Shortened */}
      <p className={`${tt_wellingtons.className} text-lg font-semibold mb-4 leading-relaxed text-[#181818]`}>
        {service.description}
      </p>

      {/* Duration and Price - Compact */}
      <div className="mt-auto space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-5 h-5 mr-1 text-[#036d6d]" />
            <span className={`${inter.className} text-md font-bold text-[#024c4c]`}>
              {service.duration}
            </span>
          </div>
          
          <div className={`${inter.className} flex items-center text-md font-bold text-[#024c4c]`}>
            <DollarSign className="w-5 h-5 mr-1 text-[#036d6d]" />
            {service.price}
          </div>
        </div>
      </div>
    </div>
  );
}