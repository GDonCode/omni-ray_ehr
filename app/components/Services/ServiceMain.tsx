'use client';

import ServiceCard from './ServiceCard';
import Image from 'next/image';

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

interface ServiceMainProps {
  titlePrefix: string;
  titleSuffix: string;
  subtitle: string;
  services: Service[];
  category: string;
  expandedService: string | null;
  setExpandedService: (id: string | null) => void;
  fontClasses: FontClasses;
  icon: string;
}

export default function ServiceMain({
  icon,
  titlePrefix,
  titleSuffix,
  subtitle,
  services,
  category,
  expandedService,
  setExpandedService,
  fontClasses,
}: ServiceMainProps) {
  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#036d6d] mb-2 underline decoration-1 underline-offset-3 flex items-center gap-2`}>
          <Image src={icon} alt="" width={20} height={20} />
          <span className="uppercase text-3xl">{titlePrefix}</span> {titleSuffix}
        </h2>
        <p className={`${fontClasses.tt_wellingtons} text-gray-700 font-semibold`}>{subtitle}</p>
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
        {services.map((service, index) => {
          const serviceId = `${category}-${index}`;
          const isExpanded = expandedService === serviceId;
          return (
            <ServiceCard
              key={serviceId}
              service={service}
              serviceId={serviceId}
              isExpanded={isExpanded}
              onToggle={() => setExpandedService(isExpanded ? null : serviceId)}
              fontClasses={fontClasses}
            />
          );
        })}
      </div>
    </div>
  );
}