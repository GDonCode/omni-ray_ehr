'use client'

import styles from "./help.module.css";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CSSProperties } from 'react';

const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "../fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const open_sans = localFont ({
  src: "../fonts/OpenSans/OpenSans-SemiBold.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const inter = localFont ({
  src: "../fonts/Inter/Inter-Regular.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})



export default function About() {
  // Desktop Nav
  const [activeItem, setActiveItem] = useState<string>('help');
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = navItems.find(item => {
      // Special case for home page
      if (item.href === '/' && currentPath === '/') return true;
    });
    
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, []);

  // Mobile Nav
  const [activeMobileLink, setActiveMobileLink] = useState('help');
  const handleMobileLinkClick = (linkName: string) => {
    setActiveMobileLink(linkName);
    closeMenu();
  };
  const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={`${styles.background}`}>
      </div>
      {/* Header */}
      <div className={`backdrop-blur-md shadow-lg z-20 fixed top-0 w-full flex flex-col`}>
        <Link href={"https://www.google.com/maps?client=firefox-b-d&um=1&ie=UTF-8&fb=1&gl=jm&sa=X&geocode=Kess0v_mK9qOMblqgL_gLwtH&daddr=40-41,+Overton+Plaza,+49+Union+Street,+Montego+Bay"} className={`${inter_heading.className} w-full bg-[#82bfbf] text-[#181818] text-[0.8rem] flex items-center gap-1 py-1 px-2`}> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 text-[#181818] group-hover:scale-105 transition-all">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <p className={`${tt_wellingtons_demi.className}`}>Shop 40, 41 Overton Plaza</p>
          <p className={`${tt_wellingtons_demi.className} text-right ml-auto`}>click for map</p>
        </Link>
          <div className="w-full bg-[#036d6d] px-4 lg:px-14 flex items-center justify-between py-2">
            <Link href={"/"} className="flex items-center gap-2">
              <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={75} height={75} className="cursor-pointer lg:w-[90px] lg:h-[90px]"/>
              <h1 className={`${levenim.className} text-white lg:text-3xl text-2xl font-bold items-center flex flex-col mt-2 tracking-widest`}>
                Aurelia <span className="block -mt-1 text-white">Dental</span>
              </h1>
            </Link>
            <nav className={`${tt_wellingtons_demi.className} hidden lg:block`}>
              <ul className="flex items-center gap-12 font-medium text-lg">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className={`
                        cursor-pointer transition-all duration-200
                        ${activeItem === item.id 
                          ? 'text-[#D9BE2E] font-bold border-b-2 border-[#D9BE2E]' 
                          : 'text-white hover:text-[#D9BE2E] hover:border-b-2 hover:border-[#D9BE2E]'
                        }
                      `}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-2 lg:hidden ml-auto mr-1">
              <button onClick={() => setIsOpen(prev => !prev)} className="block lg:hidden py-2 px-4 rounded-xs border-2 border-[#D9BE2E] bg-[#D9BE2E]">
                <span className={`${tt_wellingtons_demi.className} text-[#181818] font-extrabold tracking-widest`}>MENU</span>
              </button>
            </div>
          </div>

      </div>

      {/* Mobile Nav */}
      <nav className={`fixed right-0 top-0 w-70 h-fit bg-gradient-to-br from-white to-gray-50 z-50 shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Close Button */}
        <div className="flex items-center block lg:hidden px-8 py-4">
          <button onClick={toggleMenu} className="ml-auto block lg:hidden py-2 px-4 border-3 border-[#069494]">
            <span className="text-[#069494] font-extrabold text-xl tracking-widest">X</span>
          </button>
        </div>
          
        {/* Menu Items */}
        <div className="px-8 py-4">
          <ul className="space-y-4">
            {navItems.map((link) => (
              <li key={link.id}>
                <a href={link.href} 
                  className={`block py-3 px-4 rounded-lg transition-all ${activeMobileLink === link.id ? 'text-[#faf9f6] font-bold text-[1.4rem] bg-[#069494] border-l-8 border-[#036d6d]' : 'text-gray-700 font-medium text-[1.3rem] bg-gray-200 hover:text-[#3c5b64] border-l-4 border-gray-300'}`}
                  onClick={() => handleMobileLinkClick(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links (Optional) */}
          <div className="mt-8 flex justify-center gap-4">
            <a href="#" className="p-2 text-gray-400 hover:text-[#1b75bc] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="p-2 text-gray-400 hover:text-[#1b75bc] transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
      </div>

      <div className="bg-[#058080] py-4 w-full mt-29 relative">
        <h1 className={`${tt_wellingtons_demi.className} text-white text-3xl text-center`}>Help (F.A.Q.)</h1>
      </div>
    </>
  )
}