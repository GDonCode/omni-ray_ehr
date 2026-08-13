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
    <div id={category} className="mb-12">
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