'use client'

import styles from "./contact.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CSSProperties } from 'react';

import Header from '../components/Header';
import MobileMenu from '../components/MobileMenu';
import Footer from '../components/Footer';

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
  const router = useRouter();
  // Desktop Nav
  const [activeItem, setActiveItem] = useState<string>('contact');
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

  // Mobile Menu
  const [activeMobileLink, setActiveMobileLink] = useState('contact');
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

  const [contactMethod, setContactMethod] = useState('email');
  return (
    <>
      <div className={`${styles.background}`}>
      </div>
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileMenu
        isOpen={isOpen}
        navItems={navItems}
        activeMobileLink={activeMobileLink}
        onClose={() => setIsOpen(false)}
        onLinkClick={handleMobileLinkClick}
      />

      <div className="bg-[#058080] py-4 w-full lg:mt-36 mt-29 relative">
        <h1 className={`${tt_wellingtons_demi.className} text-white text-3xl lg:text-4xl text-center`}>
          Contact Us
        </h1>
        <p className={`${tt_wellingtons.className} text-white/90 text-center mt-2 text-sm lg:text-base`}>
          We’re here to help — reach out and we’ll get back to you as soon as possible.
        </p>
      </div>
      <div className="relative">
        <form className="flex flex-col space-y-6 p-6 lg:w-[75%] lg:mx-auto">
          <div className="${} flex flex-col">
            <label htmlFor="name" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>Name:</label>
            <input type="text" name="name" className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`} placeholder="Your Name" required />
          </div>

          <div className="flex flex-col">
            <label className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-3`}>
              Preferred Contact Method:
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="email"
                  checked={contactMethod === 'email'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-5 h-5 text-[#036d6d] focus:ring-[#FFD700]"
                />
                <span className={`${tt_wellingtons_demi.className} text-xl text-[#036d6d]`}>
                  Email
                </span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="contactMethod"
                  value="phone"
                  checked={contactMethod === 'phone'}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-5 h-5 text-[#036d6d] focus:ring-[#FFD700]"
                />
                <span className={`${tt_wellingtons_demi.className} text-xl text-[#036d6d]`}>
                  Phone
                </span>
              </label>
            </div>
          </div>

          {/* Conditional Input Fields */}
          {contactMethod === 'email' && (
            <div className="flex flex-col -mt-2">
              <label 
                htmlFor="email" 
                className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}
              >
                Email:
              </label>
              <input 
                id="email"
                type="email" 
                name="email" 
                className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`} 
                placeholder="Your Email" 
                required 
              />
            </div>
          )}

          {contactMethod === 'phone' && (
            <div className="flex flex-col -mt-2">
              <label 
                htmlFor="phone" 
                className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}
              >
                Phone:
              </label>
              <input 
                id="phone"
                type="tel" 
                name="phone" 
                className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`} 
                placeholder="Your Phone Number" 
                required 
              />
            </div>
          )}
        
          <div className="flex flex-col">
            <label htmlFor="message" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>Message:</label>
            <textarea name="message" className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`} placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className={`${tt_wellingtons_demi.className} w-full py-3 bg-[#f6d212] text-xl text-[#181818] font-bold rounded-md hover:bg-[#ffdf20] transition-colors`}>Send Message</button>
        </form>
      </div>

      <Footer
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </>
  )
}