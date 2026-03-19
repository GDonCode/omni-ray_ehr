// components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Calendar, ChevronRight } from 'lucide-react';
import ScrollToTopButton from './ScrollToTopButton';

interface FooterProps {
  tt_wellingtons: { className: string };
  inter_heading: { className: string };
}

interface ContactItem {
  icon: React.ReactNode;
  content: React.ReactNode;
  href?: string;
}

interface OpeningHour {
  day: string;
  hours: string;
}

interface QuickLink {
  label: string;
  href: string;
}

interface Service {
  label: string;
  href: string;
}

const Footer: React.FC<FooterProps> = ({ tt_wellingtons, inter_heading }) => {
  const contactInfo: ContactItem[] = [
    {
      icon: <MapPin className="size-5 text-[#181818] group-hover:scale-104 transition-all" strokeWidth={1.5} />,
      content: (
        <a
          href="https://www.google.com/maps/dir//40-41,+Aurelia+Dental,+Overton+Plaza,+49+Union+Street,+Montego+Bay/@18.4739971,-77.9208353,17z/data=!4m16!1m7!3m6!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2sAurelia+Dental!8m2!3d18.4739971!4d-77.9182604!16s%2Fg%2F11vyvdsfr9!4m7!1m0!1m5!1m1!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2m2!1d-77.9182604!2d18.4739971?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D"
          className={`${inter_heading.className} text-[#181818] -mt-1 text-lg tracking-wide group-hover:text-[#058080] transition-all duration-300`}
        >
          Shop 40, 41<br />
          Overton Plaza<br />
          49 Union Street, Montego Bay, Jamaica
        </a>
      ),
    },
    {
      icon: <Phone className="size-5 text-[#181818] group-hover:scale-104 transition-all duration-300" strokeWidth={1.5} />,
      content: (
        <a
          href="tel:+18766919136"
          className={`${inter_heading.className} text-[#181818] text-lg tracking-wide group-hover:text-[#058080] transition-all duration-300`}
        >
          +1 (876) 691 9136
        </a>
      ),
    },
    {
      icon: <Mail className="size-5 text-[#181818] group-hover:scale-104 transition-all duration-300" strokeWidth={1.5} />,
      content: (
        <a
          href="mailto:aureliadental@gmail.com"
          className={`${inter_heading.className} text-[#181818] text-lg tracking-wide group-hover:text-[#058080] transition-all duration-300`}
        >
          aureliadental@gmail.com
        </a>
      ),
    },
  ];

  const openingHours: OpeningHour[] = [
    { day: 'MON - FRI', hours: '10:00am - 6:00pm' },
    { day: 'SATURDAY', hours: '9:00am - 6:00pm' },
    { day: 'SUNDAY', hours: 'Closed' },
  ];

  const quickLinks: QuickLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
  ];

  const services: Service[] = [
    { label: 'General Dentistry', href: '/services#general' },
    { label: 'Surgical Services', href: '/services#surgical' },
    { label: 'Orthodontics', href: '/services#orthodontics' },
    { label: 'Cosmetic Dentistry', href: '/services#cosmetic' },
  ];

  return (
    <footer
      role="contentinfo"
      className="relative bg-[#FFFFFF] p-8 lg:p-12 lg:mt-12  shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]"
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
        {/* Contact Us Section */}
        <div>
          <p
            className={`${tt_wellingtons.className} text-[#181818] text-xl font-semibold border-b border-gray-300 w-fit pb-1 mb-6`}
          >
            Contact Us
          </p>
          <div className="flex flex-col gap-5">
            {contactInfo.map((item, index) => (
              <div key={index} className="flex gap-6 group cursor-pointer">
                {item.icon}
                {item.content}
              </div>
            ))}
          </div>
        </div>

        {/* Opening Hours Section */}
        <div>
          <p
            className={`${tt_wellingtons.className} text-[#181818] text-xl font-semibold border-b border-gray-300 w-fit pb-1 mb-6`}
          >
            Opening Hours
          </p>
          <div className="flex flex-col gap-6">
            {openingHours.map((schedule, index) => (
              <div key={index} className="flex border-b border-b-gray-300 pb-1">
                <Calendar className="size-5 text-[#181818] mr-2" strokeWidth={1.5} />
                <div
                  className={`${inter_heading.className} text-[#181818] w-full flex justify-between gap-12 text-lg tracking-wide`}
                >
                  <p>{schedule.day}</p>
                  <p>{schedule.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div>
          <p
            className={`${tt_wellingtons.className} text-[#181818] text-xl font-semibold border-b border-gray-300 w-fit pb-1 mb-4`}
          >
            Quick Links
          </p>
          <div className="flex flex-col gap-3">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="flex gap-1 items-center group cursor-pointer"
              >
                <ChevronRight
                  className="size-4 text-[#181818] transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
                <p
                  className={`${inter_heading.className} text-[#181818] group-hover:text-[#058080] text-lg tracking-wide`}
                >
                  {link.label}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <p
            className={`${tt_wellingtons.className} text-[#181818] text-xl font-semibold border-b border-gray-300 w-fit pb-1 mb-4`}
          >
            Our Services
          </p>
          <div className="flex flex-col gap-3 text-[#181818]">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex gap-1 items-center group cursor-pointer"
              >
                <ChevronRight
                  className="size-4 text-[#181818] transition-transform duration-200 ease-in-out group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
                <p
                  className={`${inter_heading.className} text-[#181818] group-hover:text-[#058080] text-lg tracking-wide`}
                >
                  {service.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-center border-t border-gray-300 mt-12 pt-2">
                <ScrollToTopButton />
        <p className={`${inter_heading.className} text-[#181818]`}>
          &copy; 2026 Aurelia Dental. All rights reserved.
        </p>

        <p className={`${inter_heading.className} text-sm text-[#181818] -mb-2`}>
          Powered by <span className="underline">Omni-Ray Software Solutions</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;