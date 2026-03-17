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
    <div className="bg-white rounded-lg overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)' }}>
      <div className="py-6 px-5 flex flex-col h-full">

        {/* Header */}
        <div className="flex flex-col mb-4">
          <h3 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#036d6d]`}>
            {service.name}
          </h3>
          <div className="text-left space-y-1">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-[#036d6d]/80" />
              <span className={`${fontClasses.inter} text-[#036d6d]/80 text-lg`}>
                {service.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className={`${fontClasses.tt_wellingtons} text-[#181818] mb-6 leading-relaxed`}>
          {service.description}
        </p>

        {/* Expanded details */}
        {isExpanded && (
          <div className="space-y-4 mb-6 pt-4 border-t border-gray-100" id={`service-details-${serviceId}`}>
            <div>
              <h4 className={`${fontClasses.tt_wellingtons_demi} font-bold text-xl text-[#036d6d] mb-2`}>
                What to Expect
              </h4>
              <p className={`${fontClasses.tt_wellingtons} text-[#181818]/90 text-md leading-relaxed`}>
                {service.details}
              </p>
            </div>
            <div>
              <h4 className={`${fontClasses.tt_wellingtons_demi} font-bold text-xl text-[#036d6d] mb-2`}>
                When You Need This
              </h4>
              <ul className={`${fontClasses.tt_wellingtons} text-[#181818]/90 text-md space-y-1`}>
                {service.when.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Book button */}
        <button
          onClick={() => router.push(`/appointment?service=${encodeURIComponent(service.name)}#step-2`)}
          className={`${fontClasses.tt_wellingtons_demi} w-full mt-auto mb-3 py-4 px-8 rounded-lg border-0 outline-none cursor-pointer font-bold text-xl text-[#181818] tracking-wide flex items-center justify-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
          }}
        >
          Book {service.name}
        </button>

        {/* Secondary toggle button — gradient version */}
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`service-details-${serviceId}`}
          className={`${fontClasses.tt_wellingtons_demi} w-full py-3 px-5 rounded-lg cursor-pointer font-bold text-lg flex items-center justify-center gap-1 transition-all duration-200 hover:scale-[1.02] bg-transparent`}
          style={{
            border: '2px solid #058080',
            boxShadow: '0px 0.5px 0.5px rgba(3,80,80,0.2), 0px 1px 0.5px rgba(3,80,80,0.1)',
            color: '#058080',
          }}
        >
          {isExpanded ? 'Show Less' : 'View Symptoms and Details'}
          <ChevronRight
            className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? '-rotate-90' : ''}`}
          />
        </button>

      </div>
    </div>
  );
}