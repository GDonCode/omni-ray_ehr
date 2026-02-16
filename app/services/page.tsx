'use client'

import styles from "./services.module.css";
import Image from "next/image";
import Link from "next/link";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";
import { Menu, Calendar, ChevronRight, DollarSign, MapPin, Clock, Star } from 'lucide-react';

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

type ContactMethod = 'email' | 'whatsapp' | null;
type PersonalInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  dob: string;
  notes: string;
  terms: boolean;
};

type BookingData = {
  selectedService: string | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  personalInfo: PersonalInfo;
};

export default function Services(){ const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData>({
        selectedService: null,
        selectedDate: null,
        selectedTime: null,
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',   
          contactMethod: null,    
          notes: '', 
          terms: false
        }
      });
  const [activeItem, setActiveItem] = useState<string>('services');
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '#' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentItem = navItems.find(item => {
      // For other pages
      return currentPath.startsWith(item.href) && item.href !== '/';
    });
    
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, []);


  const [isOpen, setIsOpen] = useState(false);
   const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  const [activeMobileLink, setActiveMobileLink] = useState('services');
  const handleMobileLinkClick = (linkName: string) => {
    setActiveMobileLink(linkName);
    closeMenu();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const servicesByCategory = {
      preventive: [
        { 
          name: 'General Consultation', 
          duration: '30 min', 
          price: '13,000',
          description: 'Complete oral health assessment to find and fix any issues.',
          details: 'Our experienced dentists examine your teeth, gums, and overall oral health. We identify any issues early and create a personalized treatment plan.',
          when: ['First visit or annual checkup', 'Dental concerns or pain', 'Second opinion needed']
        },
        { 
          name: 'Dental Cleaning', 
          icon: '/service_icons/tooth-cleaning_036d6d.png',
          duration: '60 min', 
          price: '15,000',
          description: 'A+ teeth cleaning to remove plaque and tartar buildup.',
          details: 'Our hygienists thoroughly clean your teeth, removing hardened plaque that regular brushing can\'t reach. We polish your teeth and provide personalized oral care advice.',
          when: ['Every 6 months for healthy teeth', 'Prevent cavities and gum disease', 'Freshen breath and brighten smile']
        },
        { 
          name: 'X-Rays & Imaging', 
          duration: '15 min', 
          price: '10,000',
          description: 'Clear digital imaging to detect issues inside a tooth.',
          details: 'Modern digital X-rays use minimal radiation to show detailed images of your teeth, roots, and jaw bone. Helps detect cavities, infections, and bone loss early.',
          when: ['Part of comprehensive exam', 'Diagnosing tooth pain', 'Planning treatment procedures']
        }
      ],
      restorative: [
        { 
          name: 'Tooth Filling', 
          duration: '20 min per filling', 
          price: '13,000 ~',
          description: 'Repair cavities with solid composite fillings.',
          details: 'We remove decay and fill the cavity with tooth-colored composite material that blends seamlessly with your natural teeth. Quick, comfortable procedure prevents further damage.',
          when: ['Cavity or tooth decay', 'Sensitivity to hot/cold', 'Visible holes or dark spots', 'Pain when chewing']
        },
        { 
          name: 'Root Canal Treatment', 
          duration: 'may require multiple visits', 
          price: '45,000 ~',
          description: 'Precise operation to safely repair an infected tooth.',
          details: 'When tooth pulp becomes infected, root canal treatment removes the infection, cleans the canal, and seals it. Modern techniques make the procedure comfortable and pain-free.',
          when: ['Severe toothache', 'Prolonged sensitivity', 'Swollen or tender gums', 'Darkening of tooth']
        },
        { 
          name: 'Tooth Extraction', 
          duration: '30-45 min', 
          price: '15,000',
          description: 'Cleanly remove any damaged or problematic teeth.',
          details: 'Sometimes extraction is necessary to prevent infection spread or make room for orthodontics. We use local anesthetic and gentle techniques for minimal discomfort.',
          when: ['Severely damaged tooth', 'Advanced decay', 'Crowding issues', 'Impacted tooth']
        },
        { 
          name: 'Wisdom Tooth Removal', 
          duration: '45-90 min', 
          price: '20,000',
          description: 'Get rid of the pain with a quick, safe extraction.',
          details: 'Wisdom teeth often cause crowding, pain, or infections. We safely remove them to prevent future complications, using sedation options for your comfort.',
          when: ['Pain in back of mouth', 'Swelling or infection', 'Crowding other teeth', 'Preventive removal']
        },
        { 
          name: 'Crowns & Bridges', 
          duration: '2-3 visits', 
          price: '80,000',
          description: 'Add custom prosthetics to restore damaged or missing teeth.',
          details: 'Crowns cap damaged teeth for strength and appearance. Bridges replace missing teeth by anchoring to neighboring teeth. Both are custom-made to match your natural smile.',
          when: ['Cracked or broken tooth', 'After root canal', 'Missing one or more teeth', 'Severely worn tooth']
        },
        { 
          name: 'Dentures', 
          duration: '3-5 visits', 
          price: '125,000',
          description: 'Regain confidence in your smile with comfortable, natural-looking dentures.',
          details: 'Full or partial dentures restore your ability to eat and speak comfortably. We create custom-fitted dentures that look natural and feel secure.',
          when: ['Missing multiple teeth', 'Full tooth loss', 'Existing dentures need replacement', 'Can\'t have implants']
        }
      ],
      cosmetic: [
        { 
          name: 'Veneers & Smile Design', 
          duration: '2-3 visits', 
          price: '300000/tooth',
          description: 'Transform your smile with custom porcelain veneers.',
          details: 'Thin porcelain shells bonded to front teeth correct color, shape, and alignment issues. We design your dream smile with digital planning and expert craftsmanship.',
          when: ['Discolored teeth', 'Chipped or worn teeth', 'Gaps between teeth', 'Misshapen teeth']
        },
        { 
          name: 'Teeth Whitening', 
          duration: '60 min', 
          price: '50,000',
          description: 'Professional whitening for a brighter, more confident smile.',
          details: 'Our professional-grade whitening system safely lightens teeth several shades in one visit. Much more effective than over-the-counter products with longer-lasting results.',
          when: ['Stained or yellowed teeth', 'Before special events', 'After braces removal', 'Boost confidence']
        }
      ]
    };
    const [expandedService, setExpandedService] = useState<string | null>(null);
  return(
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
      
      {/* Main */}
      <div className="mt-29 p-6 lg:p-0 bg-[#058080]">
        <div className="max-w-7xl mx-auto">
          <div className="lg:pt-16 lg:pb-10 w-full">
            <h1 className={`${tt_wellingtons_demi.className} text-3xl lg:text-4xl font-bold text-[#faf9f6] mb-3 lg:text-center`}>
              Premier Dental Services in Montego Bay
            </h1>
            <p className={`${tt_wellingtons.className} text-[#faf9f6] text-lg font-semibold mb-6 lg:hidden lg:text-center`}>
              Complete dental care from routine cleanings to smile transformations. Expert dentists, modern equipment, and flexible scheduling.
            </p>
            <p className={`${tt_wellingtons.className} text-[#faf9f6] text-lg font-semibold mb-8 lg:text-center hidden lg:block`}>
              Complete dental care from routine cleanings to smile transformations. <br/>Expert dentists, modern equipment, and flexible scheduling.
            </p>
            
            <div className="flex flex-wrap gap-6 text-[#faf9f6] lg:justify-center">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#eccb1b]" />
                <span className={`${inter.className} text-[#faf9f6]`}>Overton Plaza, Montego Bay, St. James</span>
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2 text-[#eccb1b] fill-[#eccb1b]" />
                <span className={`${inter.className} text-[#faf9f6]`}>4.9 (150+ reviews)</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-[#eccb1b]" />
                <span className={`${inter.className} text-[#faf9f6]`}>Mon-Fri 10AM-6PM • Sat 9AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#EAF3F7] mx-auto p-6 lg:p-8 relative backdrop-blur-md shadow-lg z-10">
        {/* Preventative Care Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d] mb-2`}><span className="uppercase text-3xl">Maintain</span> your smile.</h2>
            <p className={`${tt_wellingtons.className} text-gray-700 font-semibold`}>Keep your smile healthy with regular checkups to clean, screen and maintain it.</p>
          </div>

          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            {servicesByCategory.preventive.map((service, index) => {
              const serviceId = `preventive-${index}`;
              const isExpanded = expandedService === serviceId;
                
              return (
                <div key={serviceId} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="py-6 px-4 flex flex-col h-full">
                    <div className="flex flex-col mb-4">
                      <h3 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d]`}>{service.name}</h3>
                      <div className="text-left mt-3">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.price}</div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.duration}</div>
                        </div>
                      </div>
                    </div>
                      
                    <p className={`${tt_wellingtons.className} text-gray-700 font-semibold mb-4`}>{service.description}</p>
                      
                    {isExpanded && (
                      <div className="space-y-4 mb-6 pt-4 border-t">
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>What to Expect</h4>
                          <p className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md`}>{service.details}</p>
                        </div>
              
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>When You Need This</h4>
                          <ul className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md space-y-1`}>
                            {service.when.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                      
                      <button
                        onClick={() => {
                        router.push(`/appointment?service=${encodeURIComponent(service.name)}`);
                      }}  
                        className={`${tt_wellingtons_demi.className} w-full bg-[#f6d212] text-[1.28rem] text-[#181818] py-3 rounded-md font-bold mb-3 mt-auto hover:scale-103 transition-all duration-300 cursor-pointer ${isExpanded ? 'animate-pulse-scale' : ''}`}
                      >
                        Book {service.name}
                      </button>
                      
                    <button 
                      onClick={() => setExpandedService(isExpanded ? null : serviceId)} 
                      className={`${tt_wellingtons_demi.className} text-[#036d6d] text-lg font-bold flex w-fit items-center border-2 border-[#036d6d] hover:scale-103 transition-all duration-300 cursor-pointer rounded-md px-4 py-2`}
                    >
                      {isExpanded ? 'Show Less' : 'Learn More'}
                      <ChevronRight className={`w-8 h-8 ml-1 ${isExpanded ? 'animate-chevron-left' : 'animate-chevron-right'}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        {/* Restorative Care Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d] mb-2`}><span className="uppercase text-3xl">Repair</span> your smile.</h2>
            <p className={`${tt_wellingtons.className} text-gray-700 font-semibold`}>Treatments designed to repair damaged teeth, restore function, and protect your long-term oral health.</p>
          </div>
          
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            {servicesByCategory.restorative.map((service, index) => {
              const serviceId = `restorative-${index}`;
              const isExpanded = expandedService === serviceId;
                
              return (
                <div key={serviceId} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-col mb-4">
                      <h3 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d]`}>{service.name}</h3>
                      <div className="text-left mt-3">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.price}</div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.duration}</div>
                        </div>
                      </div>
                    </div>
                      
                    <p className={`${tt_wellingtons.className} text-gray-700 font-semibold mb-4`}>{service.description}</p>
                      
                    {isExpanded && (
                      <div className="space-y-4 mb-6 pt-4 border-t">
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>What to Expect</h4>
                          <p className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md`}>{service.details}</p>
                        </div>
              
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>When You Need This</h4>
                          <ul className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md space-y-1`}>
                            {service.when.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                      
                    <button
                        onClick={() => {
                        router.push(`/appointment?service=${encodeURIComponent(service.name)}`);
                      }}  
                        className={`${tt_wellingtons_demi.className} w-full bg-[#f6d212] text-[1.28rem] text-[#181818] py-3 mt-auto rounded-md font-bold mb-3 hover:scale-103 transition-all duration-300 cursor-pointer ${isExpanded ? 'animate-pulse-scale' : ''}`}
                      >
                      Book {service.name}
                    </button>
                      
                    <button 
                      onClick={() => setExpandedService(isExpanded ? null : serviceId)} 
                      className={`${tt_wellingtons_demi.className} w-fit text-[#036d6d] text-lg font-bold flex items-center border-2 border-[#036d6d] hover:scale-103 transition-all duration-300 cursor-pointer rounded-md px-4 py-2`}
                    >
                      {isExpanded ? 'Show Less' : 'Learn More'}
                      <ChevronRight className={`
                            w-8 h-8 ml-1 transition-transform
                            ${isExpanded ? 'rotate-270' : styles.chevronNudge}
                          `} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cosmetic Section */}
        <div className="mb-6">
            <div className="mb-6">
              <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d] mb-2`}><span className="uppercase text-3xl">Transform</span> your smile.</h2>
              <p className={`${tt_wellingtons.className} text-gray-700 font-semibold`}>Enhance the shape, color and/or alignment of your smile.</p>
            </div>
          
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
            {servicesByCategory.cosmetic.map((service, index) => {
              const serviceId = `cosmetic-${index}`;
              const isExpanded = expandedService === serviceId;
                
              return (
                <div key={serviceId} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-col mb-4">
                      <h3 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d]`}>{service.name}</h3>
                      <div className="text-left mt-3">
                        <div className="flex items-center">
                          <DollarSign className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.price}</div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2 text-[#036d6d]" />
                          <div className={`${inter.className} font-bold text-[#036d6d] text-lg`}>{service.duration}</div>
                        </div>
                      </div>
                    </div>
                      
                    <p className={`${tt_wellingtons.className} text-gray-700 font-semibold mb-4`}>{service.description}</p>
                      
                    {isExpanded && (
                      <div className="space-y-4 mb-6 pt-4 border-t">
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>What to Expect</h4>
                          <p className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md`}>{service.details}</p>
                        </div>
              
                        <div>
                          <h4 className={`${tt_wellingtons_demi.className} font-bold text-xl text-[#036d6d] mb-2`}>When You Need This</h4>
                          <ul className={`${tt_wellingtons.className} text-gray-700 font-semibold  text-md space-y-1`}>
                            {service.when.map((item, idx) => (
                              <li key={idx}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                      
                    <button
                        onClick={() => {
                        router.push(`/appointment?service=${encodeURIComponent(service.name)}`);
                      }}  
                        className={`${tt_wellingtons_demi.className} w-full cursor-pointer bg-[#f6d212] mt-auto text-[1.28rem] text-[#181818] py-3 rounded-md font-bold mb-3 hover:scale-103 transition-all duration-300 ${isExpanded ? 'animate-pulse-scale' : ''}`}
                      >
                      Book {service.name}
                    </button>
                      
                    <button 
                      onClick={() => setExpandedService(isExpanded ? null : serviceId)} 
                      className={`${tt_wellingtons_demi.className} text-[#036d6d] w-fit text-lg font-bold flex items-center border-2 border-[#036d6d] hover:scale-103 transition-all duration-300 rounded-md px-4 py-2`}
                    >
                      {isExpanded ? 'Show Less' : 'Learn More'}
                      <ChevronRight className={`
                        w-8 h-8 ml-1
                        ${isExpanded ? styles.chevronNudgeExpanded : styles.chevronNudge}
                      `} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <Footer
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </>
  )
}