// Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface NavItem {
  id: string;
  href: string;
  label: string;
}

interface HeaderProps {
  navItems: NavItem[];
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  levenim: { className: string };
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  navItems,
  inter_heading,
  tt_wellingtons_demi,
  levenim,
  isMobileMenuOpen,
  onMobileMenuToggle
}) => {
  const pathname = usePathname();

  const activeItem =
    pathname === '/'
      ? 'home'
      : pathname?.split('/')[1] || 'home';

  return (
    <>
      <div className="backdrop-blur-md shadow-lg z-20 fixed top-0 w-full flex flex-col">
        {/* Location Bar */}
        <Link 
          href="https://www.google.com/maps/place/Aurelia+Dental/@18.4740022,-77.9208353,17z/data=!3m1!4b1!4m6!3m5!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!8m2!3d18.4739971!4d-77.9182604!16s%2Fg%2F11vyvdsfr9?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D"
          className={`${inter_heading.className} w-full bg-[#82bfbf] text-[#181818] text-[0.8rem] lg:text-[1rem] flex items-center gap-1 py-2 px-2`}
          target="_blank"
          rel="noopener noreferrer"
        > 
          <MapPin className="size-4 text-[#181818] group-hover:scale-105 transition-all" strokeWidth={2} />
          <p className={tt_wellingtons_demi.className}>Shop 40, 41 Overton Plaza</p>
          <p className={`${tt_wellingtons_demi.className} text-right ml-auto`}>click for directions</p>
        </Link>

        {/* Main Header */}
        <div className="w-full bg-[#036d6d] px-4 lg:px-14 flex items-center justify-between py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 lg:gap-5">
            <Image 
              src="/aurelia-dental_logo.png" 
              alt="Logo" 
              width={75} 
              height={75} 
              className="cursor-pointer lg:w-[90px] lg:h-[90px]"
            />
            <p className={`${levenim.className} text-[#f6d212] font-medium lg:text-5xl text-[2rem] items-center flex flex-col tracking-widest`}>
              aurelia 
              <span className="block -mt-3 lg:-mt-2 ml-3 lg:ml-10 text-white text-[1.5rem] lg:text-[2rem] font-medium uppercase">
                Dental
              </span>
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`${tt_wellingtons_demi.className} hidden lg:block`} role="navigation">
            <ul className="flex items-center gap-12 font-medium text-xl">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    href={item.href}
                    className={`
                      cursor-pointer transition-all duration-200
                      ${activeItem === item.id
                        ? 'text-[#f6d212] font-bold border-b-2 border-[#f6d212]' 
                        : 'text-white hover:text-[#f6d212] hover:border-b-2 hover:border-[#f6d212]'
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={onMobileMenuToggle} 
            className="lg:hidden px-5 py-3 bg-[linear-gradient(180deg,#ffe14d_0%,#ffd808_50%,#e6b800_100%)] shadow-[0px_0.5px_0.5px_rgba(180,130,0,0.3),0px_1px_0.5px_rgba(180,130,0,0.15)] rounded-[6px] border-0 outline-none transition-all duration-300 ease-[cubic-bezier(0.15,0.83,0.66,1)] cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${tt_wellingtons_demi.className} text-[#181818] font-extrabold tracking-widest`}>
              MENU
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;