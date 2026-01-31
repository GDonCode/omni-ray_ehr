'use client'

import {useEffect, useState} from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import ServiceCard from '../components/ServiceCard';
import StepIndicator from '../components/StepIndicator';
import Image from "next/image";
import Link from "next/link";
import styles from "./new_appointment.module.css";
import localFont from "next/font/local";
const noticia_regular = localFont({
  src: "../fonts/Noticia_Text/NoticiaText-Regular.ttf"
});
const schibsted_grotesk = localFont({
  src: "../fonts/Schibsted_Grotesk/SchibstedGrotesk-VariableFont_wght.ttf"
})
const encode_sans = localFont ({
  src: "../fonts/Encode_Sans/EncodeSans-VariableFont_wdth,wght.ttf"
})
const soage = localFont ({
  src: "../fonts/Soage PersonalUseOnly/Soage PersonalUseOnly.ttf",
  display: 'swap',
  preload: true
})

export default function NewAppointment (){
    const [contactMethod, setContactMethod] = useState('email');
    const [contactValue, setContactValue] = useState('');

    // SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC ---------
      const servicesByCategory = {
        preventive: [
          { 
            name: 'General Consultation', 
            duration: '30 min', 
            price: 'From $85',
            description: 'Comprehensive oral health assessment and treatment planning.',
            details: 'Our experienced dentists examine your teeth, gums, and overall oral health. We identify any issues early and create a personalized treatment plan.',
            when: ['First visit or annual checkup', 'Dental concerns or pain', 'Second opinion needed']
          },
          { 
            name: 'Dental Cleaning', 
            duration: '45 min', 
            price: 'From $120',
            description: 'Professional teeth cleaning to remove plaque and tartar buildup.',
            details: 'Our hygienists thoroughly clean your teeth, removing hardened plaque that regular brushing can\'t reach. We polish your teeth and provide personalized oral care advice.',
            when: ['Every 6 months for healthy teeth', 'Prevent cavities and gum disease', 'Freshen breath and brighten smile']
          },
          { 
            name: 'X-Rays & Imaging', 
            duration: '15 min', 
            price: 'From $60',
            description: 'Digital X-rays to detect issues not visible during examination.',
            details: 'Modern digital X-rays use minimal radiation to show detailed images of your teeth, roots, and jaw bone. Helps detect cavities, infections, and bone loss early.',
            when: ['Part of comprehensive exam', 'Diagnosing tooth pain', 'Planning treatment procedures']
          }
        ],
        restorative: [
          { 
            name: 'Tooth Filling', 
            duration: '30-60 min', 
            price: 'From $80',
            description: 'Repair cavities with natural-looking composite fillings.',
            details: 'We remove decay and fill the cavity with tooth-colored composite material that blends seamlessly with your natural teeth. Quick, comfortable procedure prevents further damage.',
            when: ['Cavity or tooth decay', 'Sensitivity to hot/cold', 'Visible holes or dark spots', 'Pain when chewing']
          },
          { 
            name: 'Root Canal Treatment', 
            duration: '60-90 min', 
            price: 'From $300',
            description: 'Save infected teeth and eliminate pain with gentle root canal therapy.',
            details: 'When tooth pulp becomes infected, root canal treatment removes the infection, cleans the canal, and seals it. Modern techniques make the procedure comfortable and pain-free.',
            when: ['Severe toothache', 'Prolonged sensitivity', 'Swollen or tender gums', 'Darkening of tooth']
          },
          { 
            name: 'Tooth Extraction', 
            duration: '30-45 min', 
            price: 'From $100',
            description: 'Safe removal of damaged or problematic teeth.',
            details: 'Sometimes extraction is necessary to prevent infection spread or make room for orthodontics. We use local anesthetic and gentle techniques for minimal discomfort.',
            when: ['Severely damaged tooth', 'Advanced decay', 'Crowding issues', 'Impacted tooth']
          },
          { 
            name: 'Wisdom Tooth Removal', 
            duration: '45-90 min', 
            price: 'From $200',
            description: 'Expert removal of impacted or problematic wisdom teeth.',
            details: 'Wisdom teeth often cause crowding, pain, or infections. We safely remove them to prevent future complications, using sedation options for your comfort.',
            when: ['Pain in back of mouth', 'Swelling or infection', 'Crowding other teeth', 'Preventive removal']
          },
          { 
            name: 'Crowns & Bridges', 
            duration: '2 visits', 
            price: 'From $500',
            description: 'Restore damaged teeth or replace missing teeth with custom prosthetics.',
            details: 'Crowns cap damaged teeth for strength and appearance. Bridges replace missing teeth by anchoring to neighboring teeth. Both are custom-made to match your natural smile.',
            when: ['Cracked or broken tooth', 'After root canal', 'Missing one or more teeth', 'Severely worn tooth']
          },
          { 
            name: 'Dentures', 
            duration: 'Multiple visits', 
            price: 'From $800',
            description: 'Replace multiple missing teeth with comfortable, natural-looking dentures.',
            details: 'Full or partial dentures restore your ability to eat and speak comfortably. We create custom-fitted dentures that look natural and feel secure.',
            when: ['Missing multiple teeth', 'Full tooth loss', 'Existing dentures need replacement', 'Can\'t have implants']
          }
        ],
        cosmetic: [
          { 
            name: 'Veneers & Smile Design', 
            duration: '2-3 visits', 
            price: 'From $600/tooth',
            description: 'Transform your smile with custom porcelain veneers.',
            details: 'Thin porcelain shells bonded to front teeth correct color, shape, and alignment issues. We design your dream smile with digital planning and expert craftsmanship.',
            when: ['Discolored teeth', 'Chipped or worn teeth', 'Gaps between teeth', 'Misshapen teeth']
          },
          { 
            name: 'Teeth Whitening', 
            duration: '60 min', 
            price: 'From $350',
            description: 'Professional whitening for a brighter, more confident smile.',
            details: 'Our professional-grade whitening system safely lightens teeth several shades in one visit. Much more effective than over-the-counter products with longer-lasting results.',
            when: ['Stained or yellowed teeth', 'Before special events', 'After braces removal', 'Boost confidence']
          }
        ]
      };

      const [bookingData, setBookingData] = useState({
        // From Step 1
        selectedService: null as string | null,  // Add type annotation here
        
        // From Step 2
        selectedDate: null as Date | null,
        selectedTime: null as string | null,
              
        // From Step 3
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dob: '',
          street: '',
          city: '',
          parish: '',
          notes: ''
        }
      });

    // SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC ---------
    const handleServiceSelect = (serviceTitle: string) => {
      setBookingData(prevData => ({
        ...prevData,
        selectedService: prevData.selectedService === serviceTitle ? null : serviceTitle
      }));

      console.log(bookingData.selectedService);
    };
  
    const [currentStep, setCurrentStep] = useState(1);
    
    type Slot = {
      dayKey: string | null;
      slot: string | null;
    }; 
    const [confirmedSlot, setConfirmedSlot] = useState<Slot | null>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('home');
    const navItems = [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'about', label: 'About', href: '#' },
      { id: 'help', label: 'Help', href: '#' },
      { id: 'contact', label: 'Contact', href: '#' }
    ];
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const closeMenu = () => {
      setIsOpen(false);
    };

    const [activeMobileLink, setActiveMobileLink] = useState('home');
  const handleMobileLinkClick = (linkName: string) => {
    setActiveMobileLink(linkName);
    closeMenu();
  };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setBookingData({
        ...bookingData,
        personalInfo: {
          ...bookingData.personalInfo,
          [name]: value
        }
      });
    };

    const [errors, setErrors] = useState<string[]>([]);
    const validatePersonalInfo = () => {
      const errors: string[] = [];
      const { firstName, lastName, email, phone, dob } = bookingData.personalInfo;

      // Required field validations
      if (!firstName || firstName.trim() === '') {
        errors.push('First name is required');
      }

      if (!lastName || lastName.trim() === '') {
        errors.push('Last name is required');
      }

      if (!email || email.trim() === '') {
        errors.push('Email address is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address');
      }

      if (!phone || phone.trim() === '') {
        errors.push('Phone number is required');
      } else if (!/^[\d\s\-\(\)]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) {
        errors.push('Please enter a valid phone number (at least 10 digits)');
      }

      if (!dob || dob.trim() === '') {
        errors.push('Date of birth is required');
      } else {
        const birthDate = new Date(dob);
        const today = new Date();
                  
        // Check future date first
        if (birthDate > today) {
          errors.push('Date of birth cannot be in the future');
        } else {
          // Only check age if date is valid (not in future)
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
                    
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }

          if (age < 18) {
            errors.push('You must be at least 18 years old to book');
          }
        }
      }


      return errors;
    };

    const handleContinue = () => {
      const validationErrors = validatePersonalInfo();
      setErrors(validationErrors);
                
      if (validationErrors.length === 0) {
        setCurrentStep(4);
      }
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

      
    return (
    <>
      <div className={`${styles.background}`}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* Header */}
      <div className={`backdrop-blur-md border border-white/30 shadow-lg z-20 py-2 fixed top-2 left-1/2 -translate-x-1/2 flex items-center justify-between px-4  border-gray-200/20 w-[95%] bg-[#088395]`}>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={85} height={85} className="cursor-pointer"/>
          <h1 className={`${soage.className} text-white lg:text-4xl text-[1.55rem] font-bold items-center flex flex-col mt-2 tracking-widest`}>
            Aurelia <span className="block -mt-1 text-white">Dental</span>
          </h1>
        </Link>
        <nav className={`${schibsted_grotesk.className} hidden lg:block`}>
          <ul className="flex items-center gap-12 font-medium text-lg">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveItem(item.id);
                  }}
                  className={`
                    cursor-pointer transition-all duration-200
                    ${activeItem === item.id 
                      ? 'text-[#E6C84F] font-bold' 
                      : 'text-white hover:text-[#E6C84F] hover:border-b-2 hover:border-[#E6C84F]'
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
          <button onClick={() => setIsOpen(prev => !prev)} className="block lg:hidden py-2 px-4 border-2 border-[#ffdf20] bg-gray-700/10">
            <span className="text-[#ffdf20] font-bold tracking-widest">MENU</span>
          </button>
        </div>
      </div>
      
      {/* Backdrop */}
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeMenu}
        />
      {/* Mobile Nav */}
      <nav className={`fixed right-0 top-0 w-70 h-fit bg-gradient-to-br from-white to-gray-50 z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Close Button */}
        <div className="flex items-center block lg:hidden px-8 py-4">
          <button onClick={toggleMenu} className="ml-auto block lg:hidden py-2 px-4 border-3 border-[#09637E]">
            <span className="text-[#09637E] font-extrabold text-xl tracking-widest">X</span>
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="px-8 py-4">
          <ul className="space-y-4">
            {navItems.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href}
                  className={`block py-3 px-4 rounded-lg transition-all ${
                    activeMobileLink === link.id
                      ? 'text-[#09637E] font-bold text-[1.4rem] bg-[#237d75]/10 border-l-4 border-[#09637E]' 
                      : 'text-gray-700 font-medium text-[1.3rem] bg-gray-100 hover:text-[#3c5b64] border-l-4 border-gray-200'
                  }`}
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
        
      <div className="relative w-[95%] mx-auto pt-28">
        {/* Step Indicator always mounted */}
        <div className="flex flex-col md:flex-row md:w-[80%] gap-2 md:items-end mb-6 pt-4 w-full">
          <StepIndicator currentStep={currentStep} />
        </div>

        {currentStep === 1 && (
          <div className="px-4 py-0 relative max-w-7xl mx-auto">
            
            {/* Helper text with link to services page */}
            <div className="mb-2">
              <p className="text-white/60 text-sm">
                Not sure which service you need?{' '}
                <a 
                  href="/services" 
                  className="text-[#ffdf20] hover:text-[#FFD700]/80 underline decoration-[#FFD700]/30 hover:decoration-[#FFD700]/60 transition-colors"
                >
                  Browse all services
                </a>
              </p>
            </div>
            {/* Preventative Services */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <h2 className={`text-2xl font-bold text-[#FAF9F6]`}>
                  Preventative Care
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {servicesByCategory.preventive.map((service, index) => (
                  <ServiceCard 
                    key={`preventive-${index}`}
                    service={service}
                    isSelected={bookingData.selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                  />
                ))}
              </div>
            </div>

            {/* Helper text with link to services page */}
            <div className="mb-2">
              <p className="text-white/60 text-sm">
                Not sure which service you need?{' '}
                <a 
                  href="/services" 
                  className="text-[#ffdf20] hover:text-[#FFD700]/80 underline decoration-[#FFD700]/30 hover:decoration-[#FFD700]/60 transition-colors"
                >
                  Browse all services
                </a>
              </p>
            </div>
            {/* Restorative Services */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <h2 className={`text-2xl font-bold text-white`}>
                  Restorative Care
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {servicesByCategory.restorative.map((service, index) => (
                  <ServiceCard 
                    key={`restorative-${index}`}
                    service={service}
                    isSelected={bookingData.selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                  />
                ))}
              </div>
            </div>

            {/* Helper text with link to services page */}
            <div className="mb-2">
              <p className="text-white/60 text-sm">
                Not sure which service you need?{' '}
                <a 
                  href="/services" 
                  className="text-[#ffdf20] hover:text-[#FFD700]/80 underline decoration-[#FFD700]/30 hover:decoration-[#FFD700]/60 transition-colors"
                >
                  Browse all services
                </a>
              </p>
            </div>
            {/* Cosmetic Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <h2 className={`text-2xl font-bold text-white`}>
                  Cosmetic Dentistry
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {servicesByCategory.cosmetic.map((service, index) => (
                  <ServiceCard 
                    key={`cosmetic-${index}`}
                    service={service}
                    isSelected={bookingData.selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                  />
                ))}
              </div>
            </div>

            {/* Floating Next Button - Enhanced */}
            {bookingData.selectedService && (
              <button onClick={() => setCurrentStep(2)} className={`${encode_sans.className} ${!bookingData.selectedService ? 'hidden' : ''} bg-[#FFD700] absolute fixed bottom-10 right-4 z-100 text-gray-900 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
                      Next
                      <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
                    </button>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className={`relative`}>
            <AppointmentCalendar onSelectSlot={setConfirmedSlot}/>
            <button onClick={() => setCurrentStep(1)} className={`${encode_sans.className} bg-[#FFD700] text-gray-900 absolute fixed bottom-10 right-48 lg:right-50 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-xl lg:text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
              <Image src={"/arrow-left.svg"} alt="arrow left" width={30} height={30}></Image>
              Previous
            </button>
            {confirmedSlot?.dayKey && confirmedSlot?.slot && (
              <button onClick={() => setCurrentStep(3)} className={`${encode_sans.className} bg-[#FFD700] text-gray-900 absolute fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
                Next
                <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
              </button>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className={`-mt-4 p-4 relative`}>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-xl font-medium text-white mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                    placeholder="Enter your first name"
                    value={bookingData.personalInfo.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-xl font-medium text-white mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                    placeholder="Enter your last name"
                    value={bookingData.personalInfo.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xl font-medium text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                      value={bookingData.personalInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xl font-medium text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      placeholder="(876) 123-4567"
                      value={bookingData.personalInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dob" className="block text-xl font-medium text-white mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                    value={bookingData.personalInfo.dob}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-xl font-medium text-white mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                    placeholder="Street address"
                    value={bookingData.personalInfo.street}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-xl font-medium text-white mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      placeholder="City"
                      value={bookingData.personalInfo.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="parish" className="block text-xl font-medium text-white mb-2">
                      Parish
                    </label>
                    <select
                      id="parish"
                      name="parish"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      value={bookingData.personalInfo.parish}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Parish</option>
                      <option value="kingston">Kingston</option>
                      <option value="st-andrew">St. Andrew</option>
                      <option value="st-thomas">St. Thomas</option>
                      <option value="portland">Portland</option>
                      <option value="st-mary">St. Mary</option>
                      <option value="st-ann">St. Ann</option>
                      <option value="trelawny">Trelawny</option>
                      <option value="st-james">St. James</option>
                      <option value="hanover">Hanover</option>
                      <option value="westmoreland">Westmoreland</option>
                      <option value="st-elizabeth">St. Elizabeth</option>
                      <option value="manchester">Manchester</option>
                      <option value="clarendon">Clarendon</option>
                      <option value="st-catherine">St. Catherine</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-xl font-medium text-white mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all resize-none"
                    placeholder="Any special requests or information we should know?"
                    value={bookingData.personalInfo.notes}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    required
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/10 text-[#FFD700] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-0"
                  />
                  <label htmlFor="terms" className="text-xl text-white/90">
                    I agree to the <a href="#" className="text-[#FFD700] hover:underline">terms and conditions</a> and <a href="#" className="text-[#FFD700] hover:underline">privacy policy</a> *
                  </label>
                </div>

                {errors.length > 0 && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <ul className="list-disc list-inside text-red-200 space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all font-medium"
                    onClick={() => setCurrentStep(2)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-3 bg-[#FFD700] text-gray-900 rounded-lg hover:bg-[#FFC700] transition-all font-semibold"
                    onClick={handleContinue}
                  >
                    Continue to Review
                  </button>
                </div>
              </form>
            </div>
        )}

        {currentStep === 4 && (
            <div className={` mt-28 p-4 relative`}>
              <div className="flex flex-col md:flex-row md:w-[80%] gap-2 md:items-end mb-6 mt-4 w-[100%]">
                <div className="flex gap-2 items-center mb-4">
                  <Image src={"/number-4.png"} alt="First" width={25} height={25}></Image>
                  <h2 className={`${noticia_regular.className} text-2xl font-semibold border-b-2 border-yellow-400 w-fit text-white`}>Appointment Summary</h2>
                </div>
              </div>

              <div className="max-w-3xl mx-auto">
                {/* Personal Information Card */}
                <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl p-8 mb-6 shadow-lg relative">
                  <div className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-4 border-b-2">
                    Personal Information
                  </div>
                  <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-white mb-3 leading-tight">
                        John Doe
                      </div>
                      <div className="text-lg text-white/90 mb-2 flex">
                        <Image src={"/mail.svg"} alt="Email" width={23} height={23} className="mr-3"></Image>
                        johndoe@email.com
                      </div>
                      <div className="text-lg text-white/80 mb-6 flex">
                        <Image src={"/phone.svg"} alt="Email" width={23} height={23} className="mr-3"></Image>
                        +1 (876) 555-0123
                      </div>
                      <button 
                        className="bg-yellow-400 border-2 border-yellow-400/40 text-gray-900 px-5 py-2.5 rounded-lg font-semibold text-md hover:bg-yellow-400 hover:text-blue-900 hover:border-yellow-400 transition-all duration-300 hover:scale-105 flex items-center gap-2 self-end md:self-start"
                        onClick={() => setCurrentStep(3)}
                      >
                        <Image src={"/edit.svg"} alt="Email" width={23} height={23}></Image>
                        Edit Details
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-white/50 uppercase tracking-wider font-semibold mb-4 mt-12 border-b-2">
                    Selected Service
                  </div>
                  <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="text-3xl font-bold text-white mb-3 leading-tight">
                        Dental Checkup
                      </div>
                      <div className="text-lg text-white/90 mb-2 flex">
                        <Image src={"/calendar.svg"} alt="Email" width={23} height={23} className="mr-3"></Image>
                        01/08/2026
                      </div>
                      <div className="text-lg text-white/80 flex mb-6">
                        <Image src={"/clock.svg"} alt="Email" width={23} height={23} className="mr-3"></Image>
                        11: 00 AM
                      </div>
                      <button 
                        className="bg-yellow-400 border-2 border-yellow-400/40 text-gray-900 px-5 py-2.5 rounded-lg font-semibold text-md hover:bg-yellow-400 hover:text-blue-900 hover:border-yellow-400 transition-all duration-300 hover:scale-105 flex items-center gap-2 self-end md:self-start"
                        onClick={() => setCurrentStep(1)}
                      >
                        <Image src={"/edit.svg"} alt="Email" width={23} height={23}></Image>
                        Edit Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>

      {/* FOOTER */}
            <div className="relative bg-[#004c4c] p-8 lg:p-12 border-t-4 border-[#004c4c] mt-12">
              <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="">
                  <h5 className={`${noticia_regular.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-6`}>Contact Us</h5>
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <p className="text-[#D1D5DB] -mt-1 text-lg tracking-wide">Shop 40, 41<br></br>
                        Overton Plaza<br></br>
                        49 Union Street, Montego Bay, Jamaica
                      </p>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:text-[#A7C4DF]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                      </svg>
                      <a href="#" className="text-[#D1D5DB] group-hover:text-[#A7C4DF]  text-lg tracking-wide">+1 (876) 691 9136</a>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:text-[#A7C4DF]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      <a href="#" className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">aureliadental@gmail.com</a>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h5 className={`${noticia_regular.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-6`}>Opening Hours</h5>
                  <div className="flex flex-col gap-6">
                    <div className="flex border-b border-b-gray-100 pb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      <div className="text-[#D1D5DB] w-full flex justify-between gap-12 text-lg tracking-wide">
                        <p>MON - FRI</p>
                        <p>10:00am - 6:00pm</p>
                      </div>
                    </div>
                    <div className="flex border-b border-b-gray-100 pb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      <div className="text-[#D1D5DB] w-full flex justify-between gap-12 text-lg tracking-wide">
                        <p>SATURDAY</p>
                        <p>9:00am - 6:00pm</p>
                      </div>
                    </div>
                    <div className="flex border-b border-b-gray-100 pb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                      </svg>
                      <div className="text-[#D1D5DB] w-full flex justify-between text-lg tracking-wide">
                        <p>SUNDAY</p>
                        <p>Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h5 className={`${noticia_regular.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Quick Links</h5>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Home</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">About Us</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Services</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Contact Us</p>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h5 className={`${noticia_regular.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Our Services</h5>
                  <div className="flex flex-col gap-3 text-[#D1D5DB]">
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">General Dentistry</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Surgical Services</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Orthodontics</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                      <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide">Cosmetic Dentistry</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center border-t border-[#D1D5DB] mt-12 pt-6">
                <Image src={"/aurelia-dental_logo.png"} alt={"Alternative Logo"} width={60} height={60}></Image>
                <p className="text-[#D1D5DB]">&copy; 2026 Aurelia Dental. All rights reserved.</p>
                <button className="p-2 rounded-full bg-[#eef3f9] my-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#35565f" className="size-6 text-[#35565f]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <p className="text-sm text-[#D1D5DB] -mb-4">Powered by <span className="underline">Omni-Ray Software Solutions</span></p>
              </div>
            </div>
            {/* FOOTER */}
    </>
    )
}