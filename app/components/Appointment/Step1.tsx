'use client';

import { CircleAlert, DollarSign } from 'lucide-react';
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

export default function Step1ServiceSelection({
  servicesByCategory,
  selectedService,
  onServiceSelect,
  onNext,
  fontClasses,
}: Props) {
  return (
    <div className="px-4 py-0 relative max-w-8xl mx-auto">
      <div className="flex items-center">
        <CircleAlert className="size-5 text-[#036d6d] mr-3" />
        <Link href="/services" className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] font-bold`}>
          For more details, visit the <span className="underline">services</span> page
        </Link>
      </div>

      {/* Preventative Services */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <Image src="/number_1.png" alt="Number 1" width={20} height={20} />
          <h2 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#024c4c]`}>
            Preventative Care
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesByCategory.preventive.map((service, index) => (
            <ServiceCard
              key={`preventive-${index}`}
              service={service}
              isSelected={selectedService === service.name}
              onSelect={() => onServiceSelect(service.name)}
              data-service-name={service.name}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <CircleAlert className="size-5 text-[#036d6d] mr-3" />
        <Link href="/services" className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] font-bold`}>
          For more details, visit the <span className="underline">services</span> page
        </Link>
      </div>

      {/* Restorative Services */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-5">
          <Image src="/number_2.png" alt="Number 2" width={20} height={20} />
          <h2 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#024c4c]`}>
            Restorative Care
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesByCategory.restorative.map((service, index) => (
            <ServiceCard
              key={`restorative-${index}`}
              service={service}
              isSelected={selectedService === service.name}
              onSelect={() => onServiceSelect(service.name)}
              data-service-name={service.name}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <CircleAlert className="size-5 text-[#036d6d] mr-3" />
        <Link href="/services" className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] font-bold`}>
          For more details, visit the <span className="underline">services</span> page
        </Link>
      </div>

      {/* Cosmetic Services */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-5">
          <Image src="/number_3.png" alt="Number 3" width={20} height={20} />
          <h2 className={`${fontClasses.tt_wellingtons_demi} text-2xl font-bold text-[#024c4c]`}>
            Cosmetic Dentistry
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesByCategory.cosmetic.map((service, index) => (
            <ServiceCard
              key={`cosmetic-${index}`}
              service={service}
              isSelected={selectedService === service.name}
              onSelect={() => onServiceSelect(service.name)}
              data-service-name={service.name}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <button
          onClick={onNext}
          className={`${fontClasses.inter} bg-[#f6d212] text-gray-900 fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl font-semibold shadow-md flex gap-2 items-center`}
        >
          Next
          <Image src="/arrow-right.svg" alt="arrow right" width={30} height={30} />
        </button>
      )}
    </div>
  );
}