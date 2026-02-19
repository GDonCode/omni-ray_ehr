'use client';

import { useState } from 'react';
import ServiceSection from './ServiceMain'; // your existing component

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

interface ServicesMainWrapperProps {
  preventiveServices: Service[];
  restorativeServices: Service[];
  cosmeticServices: Service[];
  fontClasses: FontClasses;
}

export default function ServicesMainWrapper({
  preventiveServices,
  restorativeServices,
  cosmeticServices,
  fontClasses,
}: ServicesMainWrapperProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <>
      <ServiceSection
        titlePrefix="Maintain"
        titleSuffix="your smile."
        subtitle="Keep your smile healthy with regular checkups to clean, screen and maintain it."
        services={preventiveServices}
        category="preventive"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />

      <ServiceSection
        titlePrefix="Repair"
        titleSuffix="your smile."
        subtitle="Treatments designed to repair damaged teeth, restore function, and protect your long-term oral health."
        services={restorativeServices}
        category="restorative"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />

      <ServiceSection
        titlePrefix="Transform"
        titleSuffix="your smile."
        subtitle="Enhance the shape, color and/or alignment of your smile."
        services={cosmeticServices}
        category="cosmetic"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />
    </>
  );
}