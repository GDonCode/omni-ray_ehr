// Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

export interface NavItem {
  id: string;
  href: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  levenim: { className: string };
}

const Header: React.FC<HeaderProps> = ({ 
  navItems,
  inter_heading,
  tt_wellingtons_demi,
  levenim
}) => {
  const pathname = usePathname();

  const activeItem =
    pathname === '/'
      ? 'home'
      : pathname?.split('/')[1] || 'home';

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsHeaderVisible(false); // scrolling down
      } else {
        setIsHeaderVisible(true); // scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`backdrop-blur-md shadow-lg z-20 fixed top-0 w-full flex flex-col transition-transform duration-300 ease-in-out ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        } lg:translate-y-0`}
      >

        {/* Main Header - Mobile (unchanged rendering, isolated from desktop restructure) */}
        <div className="lg:hidden w-full bg-[#058080] px-4 flex items-center justify-between py-1.5">
          <Link href="/" className="flex items-center gap-2 justify-center mx-auto">
            <Image 
              src="/aurelia-dental_logo.png" 
              alt="Logo" 
              width={75} 
              height={75} 
              className="cursor-pointer w-[54px] h-[54px]"
            />
            <p className={`${levenim.className} text-[#fff] font-medium text-[1.5rem] items-center flex flex-col tracking-widest`}>
              aurelia 
              <span className="block -mt-2 ml-2 text-[#fff] text-[1.15rem] font-bold uppercase">
                Dental
              </span>
            </p>
          </Link>

          </div>

        {/* Main Header - Desktop (slim maps bar + single row) */}
        <div className="hidden lg:flex lg:flex-col w-full">
          {/* Slim Maps Bar - split into two hoverable locations */}
          <div className="w-full flex items-stretch bg-white/75 shadow-[0_2px_12px_rgba(3,109,109,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]">

            {/* Location 1 */}
            <Link 
              href="https://www.google.com/maps/place/Aurelia+Dental/@18.4740022,-77.9208353,17z/data=!3m1!4b1!4m6!3m5!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!8m2!3d18.4739971!4d-77.9182604!16s%2Fg%2F11vyvdsfr9?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 overflow-hidden border-r border-white/60"
            >
              <span className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-[#036d6d] transition-[height] duration-300 ease-out" />
              <span className={`${inter_heading.className} justify-center relative z-10 flex items-center gap-1 py-2 px-6 lg:px-14 text-[#036d6d] text-[.85rem] opacity-100 group-hover:opacity-0 transition-opacity duration-200`}>
                <MapPin className="size-4 text-[#036d6d]" strokeWidth={2} />
                <span className={tt_wellingtons_demi.className}>Shop 40, 41 Overton Plaza</span>
              </span>
              <span className={`${tt_wellingtons_demi.className} absolute inset-0 z-10 flex items-center justify-center text-white text-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                click for directions
              </span>
            </Link>

            {/* Location 2 */}
            <Link 
              href="https://www.google.com/maps/dir//Unit+25A,+Aurelia+Dental+-+Fairview,+Fairview+Shopping+Centre,+Annex+Plaza,+Montego+Bay/@18.4529515,-77.923784,17z/data=!4m16!1m7!3m6!1s0x8eda2bcf6474ce53:0xabe04e4b605ea373!2sAurelia+Dental+-+Fairview!8m2!3d18.4529515!4d-77.923784!16s%2Fg%2F11nhj4sg21!4m7!1m0!1m5!1m1!1s0x8eda2bcf6474ce53:0xabe04e4b605ea373!2m2!1d-77.923784!2d18.4529515?entry=ttu&g_ep=EgoyMDI2MDcwNi4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-1 overflow-hidden"
            >
              <span className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-[#036d6d] transition-[height] duration-300 ease-out" />
              <span className={`${inter_heading.className} justify-center relative z-10 flex items-center gap-1 py-2 px-6 lg:px-14 text-[#036d6d] text-[.85rem] opacity-100 group-hover:opacity-0 transition-opacity duration-200`}>
                <MapPin className="size-4 text-[#036d6d]" strokeWidth={2} />
                <span className={tt_wellingtons_demi.className}>Unit 25A, Annex Plaza, Fairview</span>
              </span>
              <span className={`${tt_wellingtons_demi.className} absolute inset-0 z-10 flex items-center justify-center text-white text-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                click for directions
              </span>
            </Link>

          </div>

          {/* Main Bar: Logo + Navigation + Book Appointment */}
          <div className="w-full bg-[#058080] px-14 flex items-center justify-between py-2">
            <Link href="/" className="flex items-center gap-1">
              <Image 
                src="/aurelia-dental_logo.png" 
                alt="Logo" 
                width={75} 
                height={75} 
                className="cursor-pointer w-[65px] h-[65px]"
              />
              <p className={`${levenim.className} text-[#fff] font-medium text-[2.25rem] items-center flex flex-col tracking-widest`}>
                aurelia 
                <span className="block -mt-5 ml-10 text-[#fff] text-[1.5rem] font-bold uppercase">
                  Dental
                </span>
              </p>
            </Link>

            <div className="flex items-center gap-5">
              <nav className={`${tt_wellingtons_demi.className}`} role="navigation">
                <ul className="flex items-center gap-2 bg-white/75 border border-white/90 px-3 py-2 shadow-[0_2px_12px_rgba(3,109,109,0.18),inset_0_1px_0_rgba(255,255,255,0.9)] font-medium text-lg rounded-[.25rem]">
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <Link 
                        href={item.href}
                        className={`
                          inline-block px-5 py-2 rounded-md cursor-pointer transition-all duration-200
                          ${activeItem === item.id
                            ? 'bg-[#058080] text-white font-bold'
                            : 'text-[#181818] hover:scale-110'
                          }
                        `}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <Link
                href="/appointment"
                className="px-6 py-3 bg-[linear-gradient(180deg,#ffe14d_0%,#ffd808_50%,#e6b800_100%)] shadow-[0px_0.5px_0.5px_rgba(180,130,0,0.3),0px_1px_0.5px_rgba(180,130,0,0.15)] rounded-sm transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] cursor-pointer"
              >
                <span className={`${tt_wellingtons_demi.className} text-[#181818] font-bold tracking-wider whitespace-nowrap`}>
                  Book Appointment
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;