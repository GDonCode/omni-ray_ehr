'use client';

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { CircleAlert, Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ServiceCard from '../ServiceCard';

interface Service {
  name: string;
  duration: string;
  price: string;
  description: string;
  details: string;
  when: string[];
}

interface Props {
  servicesByCategory: {
    preventive: Service[];
    restorative: Service[];
    cosmetic: Service[];
  };
  selectedService: string | null;
  onServiceSelect: (serviceName: string) => void;
  onNext: () => void;
  fontClasses: {
    tt_wellingtons_demi: string;
    inter: string;
  };
}

type Category = 'preventive' | 'restorative' | 'cosmetic';

export default function Step1ServiceSelection({
  servicesByCategory,
  selectedService,
  onServiceSelect,
  onNext,
  fontClasses,
}: Props) {
  const [activeTab, setActiveTab] = useState<Category>('preventive');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'preventive' as const, label: 'Maintain your smile.', icon: '/number-1.png' },
    { id: 'restorative' as const, label: 'Repair your smile.', icon: '/number-2.png' },
    { id: 'cosmetic' as const, label: 'Transform your smile.', icon: '/number-3.png' },
  ];

  // Flatten services with a category tag, for search + category lookup
  const allServices = useMemo(() => {
    const combined: (Service & { category: Category })[] = [];
    (Object.keys(servicesByCategory) as Category[]).forEach((category) => {
      servicesByCategory[category].forEach((service) => {
        combined.push({ ...service, category });
      });
    });
    return combined;
  }, [servicesByCategory]);

  const categoryOf = (serviceName: string): Category | undefined =>
    allServices.find((s) => s.name === serviceName)?.category;

  const handleServiceSelect = (serviceName: string) => {
    const category = categoryOf(serviceName);
    if (category) setActiveTab(category);
    onServiceSelect(serviceName);
  };

  const fuse = useMemo(
    () =>
      new Fuse(allServices, {
        keys: ['name', 'description', 'details', 'when'],
        threshold: 0.3,
        includeScore: false,
        ignoreLocation: true,
        findAllMatches: true,
      }),
    [allServices]
  );

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return allServices;
    const fuseResults = fuse.search(searchQuery).map((r) => r.item);
    if (fuseResults.length > 0) return fuseResults;
    const words = searchQuery.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    if (words.length === 0) return [];
    return allServices.filter((service) => {
      const searchableText = (
        service.name + ' ' + service.description + ' ' + service.details + ' ' + service.when.join(' ')
      ).toLowerCase();
      return words.some((word) => searchableText.includes(word));
    });
  }, [searchQuery, fuse, allServices, isSearching]);

  const groupedResults = useMemo(() => {
    const groups: Record<Category, Service[]> = { preventive: [], restorative: [], cosmetic: [] };
    searchResults.forEach((item) => groups[item.category].push(item));
    return groups;
  }, [searchResults]);

  const sections: { id: Category; titlePrefix: string; icon: string; services: Service[] }[] = [
    { id: 'preventive', titlePrefix: 'MAINTAIN', icon: '/number-1.png', services: groupedResults.preventive },
    { id: 'restorative', titlePrefix: 'REPAIR', icon: '/number-2.png', services: groupedResults.restorative },
    { id: 'cosmetic', titlePrefix: 'TRANSFORM', icon: '/number-3.png', services: groupedResults.cosmetic },
  ];

  const hasAnyResults = searchResults.length > 0;

  return (
    <div className="px-4 py-0 relative max-w-8xl mx-auto">
      <div className="flex items-center mb-5">
        <CircleAlert className="size-5 text-[#036d6d] mr-3" />
        <Link href="/services" className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] font-bold`}>
          For more details, visit the <span className="underline">services</span> page
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search services by name, description, or details..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`${fontClasses.inter} w-full px-12 py-3 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300`}
          style={{ boxShadow: '0px 6px 12px -16px #000' }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-800"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-[#181818]" />
          </button>
        )}
      </div>

      {/* Tab Bar */}
      {!isSearching && (
        <div className="flex w-full mb-8 border border-[#036d6d]" role="tablist">
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
                  isActive ? 'bg-[#036d6d] text-white' : 'bg-transparent text-gray-500 hover:bg-[#036d6d]/10'
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
                    <Image src={tab.icon} alt="" width={18} height={18} />
                  </span>
                  <span className="text-center">{tab.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {hasAnyResults ? (
        sections.map((section) =>
          (isSearching || activeTab === section.id) && section.services.length > 0 ? (
            <div className="mb-14" key={section.id}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.services.map((service, index) => (
                  <ServiceCard
                    key={`${section.id}-${index}`}
                    service={service}
                    isSelected={selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                    data-service-name={service.name}
                  />
                ))}
              </div>
            </div>
          ) : null
        )
      ) : (
        <div className="text-center py-12">
          <p className={`${fontClasses.tt_wellingtons_demi} text-2xl text-teal-700 mb-2`}>No services match your search</p>
          <p className={`${fontClasses.inter} text-lg text-gray-600`}>Try different keywords or browse all services above</p>
        </div>
      )}

      {selectedService && (
        <button
          onClick={onNext}
          className={`${fontClasses.inter} fixed bottom-26 lg:bottom-10 right-4 z-100 rounded-xl px-8 py-4 cursor-pointer text-2xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
            color: '#181818',
          }}
        >
          Next
          <Image src="/arrow-right.svg" alt="arrow right" width={30} height={30} />
        </button>
      )}
    </div>
  );
}