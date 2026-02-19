'use client';

import { DollarSign, Clock, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from '../../services/services.module.css'; // adjust path if needed


// Types
interface Service {
  name: string;
  price: string;
  duration: string;
  description: string;
  details: string;
  when: string[];
}

interface FontClasses {
  tt_wellingtons_demi: string;
  tt_wellingtons: string;
  inter: string;
}

interface ServiceCardProps {
  service: Service;
  serviceId: string;
  isExpanded: boolean;
  onToggle: () => void;
  fontClasses: FontClasses;
}

export default function ServiceCard({
  service,
  serviceId,
  isExpanded,
  onToggle,
  fontClasses,
}: ServiceCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <div className="py-6 px-4 flex flex-col h-full">
        {/* Header: name + price/duration */}
        <div className="flex flex-col mb-4">
          <h3 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#036d6d]`}>
            {service.name}
          </h3>
          <div className="text-left mt-3">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-[#036d6d]" />
              <div className={`${fontClasses.inter} font-bold text-[#036d6d] text-lg`}>
                {service.price} ~
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#036d6d]" />
              <div className={`${fontClasses.inter} font-bold text-[#036d6d] text-lg`}>
                {service.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Short description */}
        <p className={`${fontClasses.tt_wellingtons} text-gray-700 font-semibold mb-4`}>
          {service.description}
        </p>

        {/* Expanded details */}
        {isExpanded && (
          <div className="space-y-4 mb-6 pt-4 border-t" id={`service-details-${serviceId}`}>
            <div>
              <h4 className={`${fontClasses.tt_wellingtons_demi} font-bold text-xl text-[#036d6d] mb-2`}>
                What to Expect
              </h4>
              <p className={`${fontClasses.tt_wellingtons} text-gray-700 font-semibold text-md`}>
                {service.details}
              </p>
            </div>
            <div>
              <h4 className={`${fontClasses.tt_wellingtons_demi} font-bold text-xl text-[#036d6d] mb-2`}>
                When You Need This
              </h4>
              <ul className={`${fontClasses.tt_wellingtons} text-gray-700 font-semibold text-md space-y-1`}>
                {service.when.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Book button */}
        <button
          onClick={() => {
            router.push(`/appointment?service=${encodeURIComponent(service.name)}#step-2`);
          }}
          className={`${fontClasses.tt_wellingtons_demi} w-full bg-[#f6d212] text-[1.28rem] text-[#181818] py-3 rounded-md font-bold mb-3 mt-auto hover:scale-103 transition-all duration-300 cursor-pointer ${
            isExpanded ? 'animate-pulse-scale' : ''
          }`}
        >
          Book {service.name}
        </button>

        {/* Learn More / Show Less toggle */}
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`service-details-${serviceId}`}
          className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] text-lg font-bold flex w-fit items-center border-2 border-[#036d6d] hover:scale-103 transition-all duration-300 cursor-pointer rounded-md px-4 py-2`}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <ChevronRight
            className={`
              w-8 h-8 ml-1
              ${isExpanded ? styles.chevronNudgeExpanded : styles.chevronNudge}
            `}
          />
        </button>
      </div>
    </div>
  );
}