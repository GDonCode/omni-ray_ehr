'use client'

import styles from "./about.module.css";
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
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
  const [activeItem, setActiveItem] = useState<string>('about');
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
  const [activeMobileLink, setActiveMobileLink] = useState('about');
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
      <div className="bg-[#1a75c4] flex justify-end items-center gap-7 px-10 py-1.5">
  <a href="#" className="flex items-center gap-1.5 text-white text-[13px] no-underline hover:opacity-75 transition-opacity">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
    My Account
  </a>

  <a href="#" className="flex items-center gap-1.5 text-white text-[13px] no-underline hover:opacity-75 transition-opacity">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 4v5"/>
    </svg>
    Register
  </a>

  <a href="#" className="flex items-center gap-1.5 text-white text-[13px] no-underline hover:opacity-75 transition-opacity">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
    Wish List
  </a>
      </div>

      <nav className="bg-white flex items-center px-10 shadow-md h-[80px]">
        <a href="#" className="flex flex-col items-center no-underline shrink-0 mr-[40px]">
          <div className="relative w-[80px] h-[52px]">
            <svg className="absolute top-[2px] left-0 w-[80px] h-[46px]" viewBox="0 0 80 46" fill="none">
              <path d="M6 38 Q40 -8 74 12" stroke="#1a75c4" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <div className="absolute top-[6px] left-[8px] flex align-end font-bold leading-none">
              <span className="text-[32px] text-[#c0392b]">F</span>
              <span className="text-[32px] text-[#1a75c4]">L</span>
            </div>
            <svg className="absolute top-0 right-0" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex flex-col items-center -mt-[4px]">
            <span className="text-[11px] font-bold tracking-wider text-[#1a75c4] uppercase">
              Logistic<sup className="text-[7px] text-[#888]">EXCL</sup> <sup className="text-[7px] text-[#888]">INTL</sup> LLC
            </span>
            <span className="text-[7px] text-[#aaa] tracking-wide uppercase mt-[1px]">Think of it we ship it</span>
          </div>
        </a>

        <ul className="flex items-stretch flex-1 justify-center list-none m-0 p-0 h-[80px]">
          <li className="relative flex items-center">
            <a href="#" className="flex items-center font-mont font-bold text-gray-800 no-underline hover:text-[#1a75c4] transition-colors py-0 px-[18px] h-full text-[13.5px] tracking-tighter relative">
              HOME
              {/* Converted style attribute: absolute, bottom-0, left-[18px], right-[18px], h-[3px], bg-[#1a75c4], rounded-t-[2px] */}
              <span className="absolute bottom-0 left-[18px] right-[18px] h-[3px] bg-[#1a75c4] rounded-t-[2px]"></span>
            </a>
          </li>

          <li className="relative flex items-center">
            {/* Converted style="padding:0 18px;height:100%;font-size:13.5px;letter-spacing:.4px;" -> px-[18px] h-full text-[13.5px] tracking-[.4px] */}
            <a href="#" className="flex items-center font-mont font-bold text-gray-800 no-underline hover:text-[#1a75c4] transition-colors px-[18px] h-full text-[13.5px] tracking-[.4px]">
              ABOUT
            </a>
          </li>

          <li className="relative flex items-center group">
            {/* Converted style="padding:0 18px;height:80px;font-size:13.5px;letter-spacing:.4px;" -> px-[18px] h-[80px] text-[13.5px] tracking-[.4px] */}
            <button className="flex items-center gap-1 font-mont font-bold text-gray-800 bg-transparent border-none cursor-pointer hover:text-[#1a75c4] transition-colors px-[18px] h-[80px] text-[13.5px] tracking-[.4px]">
              SERVICES
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:rotate-180">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {/* Converted style: top:100%;left:0;border-top:3px solid #1a75c4; -> top-full left-0 border-t-[3px] border-[#1a75c4] border-solid */}
            <div className="hidden group-hover:block absolute bg-white z-50 min-w-[200px] shadow-lg top-full left-0 border-t-[3px] border-[#1a75c4] border-solid">
              <a href="#" className="block font-mont font-semibold text-gray-800 no-underline border-b border-gray-100 hover:bg-blue-50 transition-colors px-[20px] py-[11px] text-[13px]">Air Freight</a>
              <a href="#" className="block font-mont font-semibold text-gray-800 no-underline border-b border-gray-100 hover:bg-blue-50 transition-colors px-[20px] py-[11px] text-[13px]">Ocean Freight</a>
              <a href="#" className="block font-mont font-semibold text-gray-800 no-underline border-b border-gray-100 hover:bg-blue-50 transition-colors px-[20px] py-[11px] text-[13px]">Ground Shipping</a>
              <a href="#" className="block font-mont font-semibold text-gray-800 no-underline border-b border-gray-100 hover:bg-blue-50 transition-colors px-[20px] py-[11px] text-[13px]">Warehousing</a>
              <a href="#" className="block font-mont font-semibold text-gray-800 no-underline hover:bg-blue-50 transition-colors px-[20px] py-[11px] text-[13px]">Customs Brokerage</a>
            </div>
          </li>

          <li className="relative flex items-center">
            <a href="#" className="flex items-center font-mont font-bold text-gray-800 no-underline hover:text-[#1a75c4] transition-colors px-[18px] h-full text-[13.5px] tracking-[.4px]">SHOP</a>
          </li>

          <li className="relative flex items-center">
            <a href="#" className="flex items-center font-mont font-bold text-gray-800 no-underline hover:text-[#1a75c4] transition-colors px-[18px] h-full text-[13.5px] tracking-[.4px]">CONTACT</a>
          </li>

          <li className="relative flex items-center">
            <a href="#" className="flex items-center font-mont font-bold text-gray-800 no-underline hover:text-[#1a75c4] transition-colors px-[18px] h-full text-[13.5px] tracking-[.4px]">FAQs</a>
          </li>
        </ul>

        {/* Converted style="width:50px;height:50px;margin-left:20px;" -> w-[50px] h-[50px] ml-5 (or ml-[20px]) */}
        <button className="bg-[#2ab0a8] hover:bg-[#21998f] flex items-center justify-center rounded-md shrink-0 border-none cursor-pointer transition-all hover:scale-105 w-[50px] h-[50px] ml-5"
                aria-label="Shopping cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>
      </nav>

      <div className="grid grid-cols-3 w-full relative gap-6 px-10 py-12">
  {/* Air Freight */}
  <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
    <h3 className="text-2xl font-bold text-brand mb-3">Air Freight</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6">
      Time‑critical shipments delivered globally. Our air freight solutions ensure your cargo reaches its destination fast and safely, with real‑time tracking and dedicated support.
    </p>
    <a href="#" className="bg-red-500 hover:bg-brand-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
      Get a Quote
    </a>
  </div>

  {/* Sea Freight */}
  <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
    <h3 className="text-2xl font-bold text-brand mb-3">Sea Freight</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6">
      Ideal for large volumes and heavy cargo. We offer FCL and LCL options, flexible schedules, and end‑to‑end logistics management to optimise your supply chain.
    </p>
    <a href="#" className="bg-red-500 hover:bg-brand-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
      Explore Rates
    </a>
  </div>

  {/* Ground Freight */}
  <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
    <h3 className="text-2xl font-bold text-brand mb-3">Ground Freight</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-6">
      Reliable trucking and rail solutions across the continent. Whether it's LTL, full truckload, or intermodal, we deliver your goods on time, every time.
    </p>
    <a href="#" className="bg-red-500 hover:bg-brand-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
      Request a Quote
    </a>
  </div>
</div>
    </>
  )
}