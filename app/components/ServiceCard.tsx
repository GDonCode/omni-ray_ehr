import localFont from "next/font/local";


const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "../fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const open_sans = localFont ({
  src: "../fonts/OpenSans/OpenSans-SemiBold.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
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
        bg-white border border-white/20 shadow-lg rounded-sm
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={`w-3.5 h-3.5 text-[#024c4c]`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className={`${inter.className} text-md font-bold text-[#024c4c]`}>
              {service.duration}
            </span>
          </div>
          
          <div className={`text-lg font-bold text-[#024c4c]`}>
            {service.price}
          </div>
        </div>
      </div>
    </div>
  );
}