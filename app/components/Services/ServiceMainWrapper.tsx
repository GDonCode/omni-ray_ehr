'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ServiceSection from './ServiceMain';

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
  isSearching?: boolean;
}

export default function ServicesMainWrapper({
  preventiveServices,
  restorativeServices,
  cosmeticServices,
  fontClasses,
  isSearching = false,
}: ServicesMainWrapperProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preventive' | 'restorative' | 'cosmetic'>('preventive');

  // Sync activeTab with URL hash on mount (e.g. /services#restorative from Footer links)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'preventive' || hash === 'restorative' || hash === 'cosmetic') {
      setActiveTab(hash);
    }
  }, []);

  const tabs = [
    { id: 'preventive' as const, label: 'Maintain your smile.', icon: '/number-1.png' },
    { id: 'restorative' as const, label: 'Repair your smile.', icon: '/number-2.png' },
    { id: 'cosmetic' as const, label: 'Transform your smile.', icon: '/number-3.png' },
  ];

  return (
  <div className='-mt-2'>
    {!isSearching && (
      <div
        className="flex w-full mb-8 border border-[#036d6d]"
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`${fontClasses.tt_wellingtons_demi} group flex-1 flex items-center justify-center gap-2 px-4 py-4 font-bold text-base sm:text-lg transition-all duration-200 cursor-pointer ${
                index > 0 ? 'border-l border-[#036d6d]' : ''
              } ${
                isActive
                  ? 'bg-[#036d6d] text-white'
                  : 'bg-transparent text-gray-500 hover:bg-[#036d6d]/10'
              }`}
            >
              <span
                className={`flex items-center gap-3 transition-transform duration-200 ${
                  !isActive ? 'group-hover:scale-110' : ''
                }`}
              >
                <span
                  className={`flex items-center justify-center rounded-full w-[18px] h-[18px] transition-all duration-300 ease-out ${
                    isActive
                      ? 'scale-110 shadow-[0_0_0_6px_rgba(245,183,0,0.15)]'
                      : ''
                  }`}
                >
                  <Image
                    src={tab.icon}
                    alt=""
                    width={18}
                    height={18}
                  />
                </span>
                <span className="text-center">{tab.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    )}
    {(isSearching || activeTab === 'preventive') && preventiveServices.length > 0 && (
      <ServiceSection
        icon="/number_1.png"
        titlePrefix="Maintain"
        titleSuffix="your smile."
        subtitle="Keep your smile healthy with regular checkups to clean, screen and maintain it."
        services={preventiveServices}
        category="preventive"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />
    )}

    {(isSearching || activeTab === 'restorative') && restorativeServices.length > 0 && (
      <ServiceSection
        icon="/number_2.png"
        titlePrefix="Repair"
        titleSuffix="your smile."
        subtitle="Treatments designed to repair damaged teeth, restore function, and protect your long-term oral health."
        services={restorativeServices}
        category="restorative"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />
    )}

    {(isSearching || activeTab === 'cosmetic') && cosmeticServices.length > 0 && (
      <ServiceSection
        icon="/number_3.png"
        titlePrefix="Transform"
        titleSuffix="your smile."
        subtitle="Enhance the shape, color and/or alignment of your smile."
        services={cosmeticServices}
        category="cosmetic"
        expandedService={expandedService}
        setExpandedService={setExpandedService}
        fontClasses={fontClasses}
      />
    )}
  </div>
  );
}