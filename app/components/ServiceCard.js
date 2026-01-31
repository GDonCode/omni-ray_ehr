export default function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        relative p-5 flex flex-col cursor-pointer
        backdrop-blur-lg
        bg-[#088395] border border-white/20 shadow-lg
        transition-all duration-200 ease-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:border-white/30
        ${isSelected
          ? `
            bg-[#177A7A]
            border-[#FFD700]
            ring-2 ring-[#FFD700]
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
      <h3 className={`text-xl font-bold mb-4 pr-6 leading-tight ${isSelected ? 'text-[#FAF9F6]' : 'text-[#FAF9F6]'}`}>
        {service.name}
      </h3>

      {/* Brief Description - Shortened */}
      <p className={`text-lg leading-relaxed line-clamp-2 text-[#FAF9F6]`}>
        {service.description}
      </p>

      {/* Duration and Price - Compact */}
      <div className="mt-6 space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FFD700]' : 'text-white/50'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className={`text-md font-medium ${isSelected ? 'text-[#FFD700]' : 'text-[#FAF9F6]'}`}>
              {service.duration}
            </span>
          </div>
          
          <div className={`text-lg font-bold ${isSelected ? 'text-[#FFD700]' : 'text-[#FAF9F6]'}`}>
            {service.price}
          </div>
        </div>
      </div>
    </div>
  );
}