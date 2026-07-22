'use client'

import styles from "./services.module.css";
import localFont from "next/font/local";
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search, X } from 'lucide-react'; 

import HeaderWrapper from '../components/HeaderWrapper';
import Footer from '../components/Footer';

import ServicesHero from '../components/Services/ServicesHero';
import ServiceMainWrapper from '../components/Services/ServiceMainWrapper';

import { servicesByCategory, type Service } from '@/lib/services';


const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons_medium = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Medium.otf"
})
const tt_wellingtons = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})
 const fontClasses = {
    tt_wellingtons_demi: tt_wellingtons_demi.className,
    tt_wellingtons: tt_wellingtons.className,
    inter: inter_heading.className,
  };
export default function Services(){ 

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];


  // Combine all services with a category tag
  const allServices = useMemo(() => {
    const combined: (Service & { category: string })[] = [];
    (Object.keys(servicesByCategory) as Array<keyof typeof servicesByCategory>).forEach(category => {
      servicesByCategory[category].forEach(service => {
        combined.push({ ...service, category });
      });
    });
    return combined;
  }, [servicesByCategory]);
  
  const fuse = useMemo(() => new Fuse(allServices, {
    keys: ['name', 'description', 'details', 'when'], // fields to search
    threshold: 0.3, // lower = more exact, higher = fuzzier (0.4 is a good balance)
    includeScore: false,
    ignoreLocation: true,
    findAllMatches: true,
  }), [allServices]);

  const [searchQuery, setSearchQuery] = useState('');

  // Perform search with fallback
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return allServices;

    // Stage 1: Fuzzy search with Fuse
    const fuseResults = fuse.search(searchQuery).map(result => result.item);
    if (fuseResults.length > 0) return fuseResults;

    // Stage 2: Fallback word‑based OR search
    const words = searchQuery.toLowerCase().split(/\s+/).filter(word => word.length > 2); // ignore short words like "i", "a"
    if (words.length === 0) return [];

    return allServices.filter(service => {
      const searchableText = (
        service.name + ' ' +
        service.description + ' ' +
        service.details + ' ' +
        service.when.join(' ')
      ).toLowerCase();
      return words.some(word => searchableText.includes(word));
    });
  }, [searchQuery, fuse, allServices]);

  const groupedResults = useMemo(() => {
    const groups: { [key: string]: Service[] } = {
      preventive: [],
      restorative: [],
      cosmetic: [],
    };
    searchResults.forEach(item => {
      groups[item.category].push(item);
    });
    return groups;
  }, [searchResults]);

  const hasAnyResults = searchResults.length > 0;
  return(
    <>
      <div className={`${styles.background}`}/>

      <header role="banner">
        <HeaderWrapper
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          levenim={levenim}
        />
      </header>
      <main>
        <ServicesHero
          titleFont={tt_wellingtons_demi.className}
          bodyFont={`${tt_wellingtons.className}`}
        />

        <div className={`${styles.container} mx-auto p-6 lg:p-8 relative backdrop-blur-md shadow-lg z-10 lg:-mb-12`}>
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

          {hasAnyResults ? (
            <ServiceMainWrapper
              preventiveServices={groupedResults.preventive}
              restorativeServices={groupedResults.restorative}
              cosmeticServices={groupedResults.cosmetic}
              fontClasses={fontClasses}
            />
          ) : (
            <div className="text-center py-12">
              <p className={`${fontClasses.tt_wellingtons_demi} text-2xl text-teal-700 mb-2`}>No services match your search</p>
              <p className={`${fontClasses.inter} text-lg text-gray-600`}>Try different keywords or browse all services above</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </>
  )
}