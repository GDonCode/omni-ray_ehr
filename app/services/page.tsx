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


const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})
 const fontClasses = {
    tt_wellingtons_demi: tt_wellingtons_demi.className,
    tt_wellingtons: tt_wellingtons.className,
    inter: inter_heading.className,
  };
  interface Service {
    name: string;
    price: string;
    duration: string;
    description: string;
    details: string;
    when: string[];
  }
export default function Services(){ 

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];


  const servicesByCategory = {
    preventive: [
      { 
        name: 'New Patient Examination', 
        duration: '30 min', 
        price: '2,500',
        description: 'Complete oral health assessment to evaluate your teeth and gums.',
        details: 'Our experienced dentists examine your teeth, gums, and overall oral health. We identify any issues early and create a personalized treatment plan.',
        when: ['First visit', 'Annual check-up', 'Dental concerns or pain', 'Second opinion needed']
      },
      { 
        name: 'Routine Dental Cleaning', 
        icon: '/service_icons/tooth-cleaning_036d6d.png',
        duration: '60 min', 
        price: '15,000',
        description: 'Professional cleaning to remove plaque and tartar buildup.',
        details: 'Our hygienists thoroughly clean your teeth, removing hardened plaque that regular brushing cannot reach. We polish your teeth and provide personalized oral care advice.',
        when: ['Every 6 months', 'Prevent cavities and gum disease', 'Freshen breath and brighten smile']
      },
      {
        name: 'Deep Cleaning (Scaling & Root Planing)',
        duration: '60–90 min',
        price: '25,000',
        description: 'Treatment for gum disease below the gumline.',
        details: 'Thorough cleaning beneath the gumline to remove bacteria and tartar buildup around tooth roots.',
        when: ['Gum disease diagnosis', 'Deep gum pockets', 'Persistent bleeding gums']
      },
      {
        name: 'Fluoride Treatment',
        duration: '5 min',
        price: '3,000',
        description: 'Strengthen enamel and prevent cavities.',
        details: 'Professional fluoride application to reinforce tooth enamel and reduce risk of decay.',
        when: ['High cavity risk', 'Sensitive teeth', 'Children and teens']
      }
    ],
    restorative: [
      { 
        name: 'Tooth Filling', 
        duration: '20 min per filling', 
        price: '10,000',
        description: 'Repair cavities with durable composite fillings.',
        details: 'We remove decay and fill the cavity with tooth-colored composite material that blends seamlessly with your natural teeth.',
        when: ['Cavity or tooth decay', 'Sensitivity to hot/cold', 'Pain when chewing']
      },
      { 
        name: 'Root Canal Treatment', 
        duration: 'May require multiple visits', 
        price: '45,000',
        description: 'Treatment to remove infection and save your tooth.',
        details: 'When tooth pulp becomes infected, root canal treatment removes the infection, cleans the canal, and seals it using modern, comfortable techniques.',
        when: ['Severe toothache', 'Prolonged sensitivity', 'Swollen or tender gums', 'Darkening of tooth']
      },
      {
        name: 'Simple Tooth Extraction',
        duration: '20–40 min',
        price: '15,000',
        description: 'Removal of damaged or non-restorable teeth.',
        details: 'Gentle extraction of a tooth that cannot be repaired due to decay or damage.',
        when: ['Severe decay', 'Broken tooth', 'Overcrowding']
      },
      {
        name: 'Surgical Extraction',
        duration: '45–60 min',
        price: '35,000',
        description: 'Complex removal of impacted or broken teeth.',
        details: 'Minor surgical procedure to remove teeth that are impacted or not fully erupted.',
        when: ['Impacted tooth', 'Broken at gum line', 'Failed simple extraction']
      },
      {
        name: 'Wisdom Tooth Removal',
        duration: '45–90 min',
        price: '40,000',
        description: 'Removal of impacted or problematic wisdom teeth.',
        details: 'Extraction of third molars to prevent infection, crowding, or pain.',
        when: ['Jaw pain', 'Swelling', 'Crowding', 'Impaction seen on X-ray']
      },
      {
        name: 'Dental Crown',
        duration: '2 visits',
        price: '60,000',
        description: 'Restore strength and function to damaged teeth.',
        details: 'Custom-made cap placed over a weakened tooth to restore shape, strength, and appearance.',
        when: ['Large filling failure', 'After root canal', 'Cracked tooth']
      },
      {
        name: 'Dental Bridge',
        duration: '2 visits',
        price: '120,000',
        description: 'Replace one or more missing teeth.',
        details: 'Fixed prosthetic anchored to adjacent teeth to restore chewing function and aesthetics.',
        when: ['Missing teeth', 'Difficulty chewing', 'Shifting teeth']
      },
      { 
        name: 'Dentures Consultation', 
        duration: '30 min', 
        price: '13,000',
        description: 'Evaluation for full or partial dentures.',
        details: 'We assess your oral health and discuss custom denture options to restore comfort, chewing ability, and confidence.',
        when: ['Missing multiple teeth', 'Full tooth loss', 'Existing dentures need replacement']
      }
    ],
    cosmetic: [
      {
        name: 'Teeth Whitening',
        duration: '60 min',
        price: '35,000',
        description: 'Professional whitening for a brighter smile.',
        details: 'High-concentration whitening gel activated in-office for immediate visible results.',
        when: ['Stained teeth', 'Yellowing', 'Special events']
      },
      {
        name: 'Porcelain Veneers',
        duration: '2–3 visits',
        price: '85,000 per tooth',
        description: 'Enhance shape, color, and alignment.',
        details: 'Thin porcelain shells bonded to the front of teeth for a flawless smile transformation.',
        when: ['Chipped teeth', 'Gaps', 'Severe discoloration']
      },
      {
        name: 'Smile Design Consultation',
        duration: '45–60 min',
        price: '15,000',
        description: 'Personalized aesthetic smile planning.',
        details: 'Digital planning session analyzing facial proportions, tooth shape, and color to design your ideal smile.',
        when: ['Full smile makeover', 'Before veneers', 'Cosmetic improvement goals']
      }
    ]
  };

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

        <div className="bg-[#F7FBFC] mx-auto p-6 lg:p-8 relative backdrop-blur-md shadow-lg z-10 lg:-mb-12">
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