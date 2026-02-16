'use client'


import {useEffect, useState, useCallback, useRef} from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import AppointmentCalendar from "../components/AppointmentCalendar";
import ServiceCard from '../components/ServiceCard';
import StepIndicator from '../components/StepIndicator';
import Image from "next/image";
import Link from "next/link";
import styles from "./new_appointment.module.css";
import { Mail, Phone, Calendar, Clock, CircleAlert } from "lucide-react";
import localFont from "next/font/local";


const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
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
type AppointmentFor = "self" | "child";
type PersonalInfo = {
  appointmentFor: AppointmentFor;
  firstName: string;
  lastName: string;
  guardianFirstName: string;
  guardianLastName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  isReturningPatient: string | null;
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

async function sendAppointmentEmail(bookingData: BookingData) {
  try {
    const response = await fetch('/api/send-appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to send appointment request');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending appointment:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};
export default function NewAppointment (){
  
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasLoadedFromUrl = useRef(false);

  const [bookingData, setBookingData] = useState<BookingData>({
      selectedService: null,
      selectedDate: null,
      selectedTime: null,
      personalInfo: {
        appointmentFor: 'self',
        firstName: '',
        lastName: '',
        guardianFirstName: '',
        guardianLastName: '',
        email: '',
        phone: '',
        dob: '',   
        contactMethod: null,    
        isReturningPatient: null,
        notes: '', 
        terms: false
      }
    });

    useEffect(() => {
    if (hasLoadedFromUrl.current) return;
    
    const service = searchParams.get('service');
    console.log('Retrieved service from URL:', service);
    
    if (service) {
      hasLoadedFromUrl.current = true;
      setBookingData(prev => ({
        ...prev,
        selectedService: service
      }));
    }
  }, [searchParams]);

    
    const [currentStep, setCurrentStep] = useState(1);
    const [maxReachedStep, setMaxReachedStep] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
    setMounted(true);
    
    // Get URL service first
    const urlService = searchParams.get('service');
    const savedStep = sessionStorage.getItem('currentStep');
    const savedBookingData = sessionStorage.getItem('bookingData');
    const shouldReset = () => {
    // Parse booking data once
    const parsed = savedBookingData ? JSON.parse(savedBookingData) : null;
    
    // If no booking data exists at all, no need to reset
    if (!parsed) {
      return false;
    }
    
    // Only check step 5 if we actually have booking data
    if (savedStep === '5' && !parsed?.selectedService) {
      return true;
    }
    
    // Check expiration regardless of step
    if (parsed?.timestamp) {
      const age = Date.now() - parsed.timestamp;
      if (age > 30 * 60 * 1000) {
        return true;
      }
    }
    
    return false;
  };

    if (shouldReset()) {
      // Clear everything and start fresh
      clearBookingData();
      setBookingData({
        selectedService: urlService || null,
        selectedDate: null,
        selectedTime: null,
        personalInfo: {
          appointmentFor: 'self',
          firstName: '',
          lastName: '',
          guardianFirstName: '',
          guardianLastName: '',
          email: '',
          phone: '',
          dob: '',
          contactMethod: null,
          isReturningPatient: null,
          notes: '',
          terms: false
        }
      });
      setCurrentStep(1);
      setMaxReachedStep(1);
      return;
    }

    
   
    if (savedBookingData) {
      const parsed = JSON.parse(savedBookingData);
      if (parsed.selectedDate) {
        parsed.selectedDate = new Date(parsed.selectedDate);
      }
      
      // Merge: URL service takes priority over sessionStorage
      if (urlService) {
        parsed.selectedService = urlService;
      }
      
      setBookingData(parsed);
    } else if (urlService) {
      // No sessionStorage but we have URL service
      setBookingData(prev => ({
        ...prev,
        selectedService: urlService
      }));
    }

    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    const savedMaxStep = sessionStorage.getItem('maxReachedStep');
    if (savedMaxStep) {
      setMaxReachedStep(parseInt(savedMaxStep));
    }
  }, [searchParams]);

    // Save bookingData to sessionStorage whenever it changes
    useEffect(() => {
      if (mounted) {
        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
      }
    }, [bookingData, mounted]);

    // Save currentStep to sessionStorage whenever it changes
    useEffect(() => {
      if (mounted) {
        sessionStorage.setItem('currentStep', currentStep.toString());
      }
    }, [currentStep, mounted]);

    // Save maxReachedStep to sessionStorage whenever it changes
    useEffect(() => {
      if (mounted) {
        sessionStorage.setItem('maxReachedStep', maxReachedStep.toString());
      }
    }, [maxReachedStep, mounted]);

    // Sync with URL hash
    useEffect(() => {
      const handleHashChange = () => {
        const hash = window.location.hash;
        const stepMatch = hash.match(/#step-(\d+)/);
        if (stepMatch) {
          const step = parseInt(stepMatch[1]);
          if (step >= 1 && step <= 5 && step <= maxReachedStep) {
            setCurrentStep(step);
          }
        }
      };

      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }, [maxReachedStep]);

    // Update URL hash and step TOGETHER
    const updateStep = (newStep: number) => {
      setCurrentStep(newStep);
      setMaxReachedStep(Math.max(maxReachedStep, newStep));
      window.history.pushState(null, '', `#step-${newStep}`);
    };

    // Handle step indicator clicks
    const handleStepClick = (step: number) => {
      if (step <= maxReachedStep) {
        updateStep(step);
      }
    };

    const age = bookingData.personalInfo.dob
  ? calculateAge(bookingData.personalInfo.dob)
  : null;

    // Optional: Clear data after successful booking (call this after step 5)
    const clearBookingData = () => {
      sessionStorage.removeItem('bookingData');
      sessionStorage.removeItem('currentStep');
      sessionStorage.removeItem('maxReachedStep');
    };

    
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

    // SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC ---------
    const handleServiceSelect = (serviceTitle: string) => {
      setBookingData(prevData => ({
        ...prevData,
        selectedService: prevData.selectedService === serviceTitle ? null : serviceTitle
      }));

    };
  
    
    type Slot = {
      dayKey: string | null;
      slot: string | null;
    }; 

    const handleSlotSelection = useCallback((slot: Slot) => {
      if (slot.dayKey && slot.slot) {
        const [monthAbbr, day] = slot.dayKey.split('-');
        const monthMap: { [key: string]: number } = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        
        const currentYear = new Date().getFullYear();
        const selectedDate = new Date(currentYear, monthMap[monthAbbr], parseInt(day));
        
        setBookingData(prev => ({
          ...prev,
          selectedDate: selectedDate,
          selectedTime: slot.slot
        }));
      } else {
        setBookingData(prev => ({
          ...prev,
          selectedDate: null,
          selectedTime: null
        }));
      }
    }, []);


    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const navItems = [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'help', label: 'Help', href: '/help' },
      { id: 'contact', label: 'Contact', href: '/contact' }
    ];
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const closeMenu = () => {
      setIsOpen(false);
    };

    const [activeMobileLink, setActiveMobileLink] = useState<string | null>(null);
    const handleMobileLinkClick = (linkName: string) => {
      setActiveMobileLink(linkName);
      closeMenu();
    };
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement;
      const { name, value, type } = target;
      const checked = target.checked;
      
      setBookingData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [name]: type === 'checkbox' ? checked : value
        }
      }));
    };

    const [errors, setErrors] = useState<string[]>([]);
    const validatePersonalInfo = () => {
      const errors: string[] = [];
      const { firstName, lastName, appointmentFor, guardianFirstName, guardianLastName, email, phone, dob, terms } = bookingData.personalInfo;

      const nameRegex = /^[A-Za-z\s'-]{2,}$/;
      // Required field validations
      if (!firstName || firstName.trim() === '') {
        errors.push('First name is required');
      } else if (firstName.trim().length < 2) {
        errors.push('First name must be at least 2 characters long');
      } else if (firstName.trim().length > 50) {
        errors.push('First name cannot exceed 50 characters');
      } else if (!nameRegex.test(firstName)) {
        errors.push('First name can only contain letters');
      }


      if (!lastName || lastName.trim() === '') {
        errors.push('Last name is required');
      } else if (lastName.trim().length < 2) {
        errors.push('Last name must be at least 2 characters long');
      } else if (lastName.trim().length > 50) {
        errors.push('Last name cannot exceed 50 characters');
      } else if (!nameRegex.test(lastName)) {
        errors.push('Last name can only contain letters');
      }


      if (appointmentFor === "child") {
        if (!guardianFirstName || guardianFirstName.trim() === '') {
          errors.push('Guardian first name is required');
        } else if (guardianFirstName.trim().length < 2) {
          errors.push('Guardian first name must be at least 2 characters long');
        } else if (guardianFirstName.trim().length > 50) {
          errors.push('Guardian first name cannot exceed 50 characters');
        } else if (!nameRegex.test(guardianFirstName)) {
          errors.push('Guardian first name can only contain letters');
        }
      }

      if (appointmentFor === "child") {
        if (!guardianLastName || guardianLastName.trim() === '') {
          errors.push('Guardian last name is required');
        } else if (guardianLastName.trim().length < 2) {
          errors.push('Guardian last name must be at least 2 characters long');
        } else if (guardianLastName.trim().length > 50) {
          errors.push('Guardian last name cannot exceed 50 characters');
        } else if (!nameRegex.test(guardianLastName)) {
          errors.push('Guardian last name can only contain letters');
        }
      }
      
      if (!email || email.trim() === '') {
        errors.push('Email address is required');
      } else if (email.length > 100) {
        errors.push('Email address cannot exceed 100 characters');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Please enter a valid email address');
      }


      if (!phone || phone.trim() === '') {
        errors.push('Phone number is required');
      } else if (phone.length > 20) {
        errors.push('Phone number cannot exceed 20 characters');
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
        }
      }

      if (
        bookingData.personalInfo.appointmentFor === "self" &&
        age !== null &&
        age < 18
      ) {
        errors.push("Patients under 18 must be booked by a parent or guardian.");
      }

      if (!terms) {
        errors.push('You must agree to the terms and conditions');
      }


      return errors;
    };

    const handleContinue = () => {
      const validationErrors = validatePersonalInfo();
      setErrors(validationErrors);
                
      if (validationErrors.length === 0) {
        updateStep(4);
        console.log(bookingData);
      }
    };

    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
      setMounted(true);
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
      if (currentStep === 1 && bookingData.selectedService && mounted) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const selectedCard = document.querySelector(`[data-service-name="${bookingData.selectedService}"]`);
          if (selectedCard) {
            selectedCard.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'nearest'
            });
          }
        }, 300);
      }
    }, [currentStep, bookingData.selectedService, mounted]);

    const isPersonalInfoComplete = () => {
      const { firstName, lastName, email, phone, contactMethod, dob, terms } = bookingData.personalInfo;
      return (
        firstName.trim() !== '' && 
        lastName.trim() !== '' && 
        email.trim() !== '' && 
        phone.trim() !== '' && 
        dob.trim() !== '' && 
        contactMethod !== null &&
        terms === true
      );
    };

    const [isLoading, setIsLoading] = useState(false);
    const [emailStatus, setEmailStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const handleConfirm = async () => {
      console.log(bookingData);
      setIsLoading(true);
      setEmailStatus('idle');

      // Send the email
      const result = await sendAppointmentEmail(bookingData);

      setIsLoading(false);

      if (result.success) {
        setEmailStatus('success');
        // Move to next step after successful email send
        updateStep(5);
      } else {
        setEmailStatus('error');
        // Optionally show error to user
        alert('Failed to send appointment request. Please try again.');
      }
    };


    return (
    <>
      <div className={`${styles.background}`}>
      </div>
      {/* Header */}
      <div className={`backdrop-blur-md shadow-lg z-20 fixed top-0 w-full flex flex-col`}>
        <Link href={"https://www.google.com/maps?client=firefox-b-d&um=1&ie=UTF-8&fb=1&gl=jm&sa=X&geocode=Kess0v_mK9qOMblqgL_gLwtH&daddr=40-41,+Overton+Plaza,+49+Union+Street,+Montego+Bay"} className={`${inter_heading.className} w-full bg-[#82bfbf] text-[#181818] text-[0.8rem] lg:text-[1rem] flex items-center gap-1 py-2 px-2`}> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-4 text-[#181818] group-hover:scale-105 transition-all">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            <p className={`${tt_wellingtons_demi.className}`}>Shop 40, 41 Overton Plaza</p>
            <p className={`${tt_wellingtons_demi.className} text-right ml-auto`}>click for directions</p>
          </Link>
          <div className="w-full bg-[#036d6d] px-4 lg:px-14 flex items-center justify-between py-2">
            <Link href={"/"} className="flex items-center gap-3 lg:gap-5">
              <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={75} height={75} className="cursor-pointer lg:w-[90px] lg:h-[90px]"/>
              <h1 className={`${levenim.className} text-[#f6d212] font-medium lg:text-5xl text-[2rem] items-center flex flex-col tracking-widest`}>
                aurelia <span className="block -mt-3 lg:-mt-2 ml-3 lg:ml-10 text-white text-[1.5rem] lg:text-[2rem] font-medium uppercase">Dental</span>
              </h1>
            </Link>
            <nav className={`${tt_wellingtons_demi.className} hidden lg:block`}>
              <ul className="flex items-center gap-12 font-medium text-xl">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a
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
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-2 lg:hidden ml-auto mr-1">
              <button onClick={() => setIsOpen(prev => !prev)} className="block lg:hidden py-2 px-4 rounded-xs border-2 border-[#ffd808] bg-[#ffd808]">
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
      
      {/* Step Indicator always mounted */}
      {currentStep <= 4 && (
      <div className="flex flex-col md:flex-row gap-2 md:items-end mb-6 lg:mt-36 mt-31 w-full bg-[#058080] relative">
        <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} maxReachedStep={maxReachedStep}/>
      </div>
      )}

      <div className="relative w-[95%] mx-auto">
        {currentStep === 1 && (
          <div className="px-4 py-0 relative max-w-7xl mx-auto">
            <div className="flex items-center">
              <CircleAlert className="size-5 text-[#036d6d] mr-3"/>
              <Link href="/services" className={`${tt_wellingtons_demi.className} text-[#036d6d] font-bold`}>For more details, visit the <span className="underline">services</span> page</Link>
            </div>
            {/* Preventative Services */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Image src={"/number_1.png"} alt="Number 1" width={20} height={20}></Image>
                <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#024c4c]`}>
                  Preventative Care
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {servicesByCategory.preventive.map((service, index) => {
                  const isSelected = bookingData.selectedService === service.name;
                  
                  // Debug log
                  console.log('Service:', service.name, '| Selected Service:', bookingData.selectedService, '| isSelected:', isSelected);
                  
                  return (
                    <ServiceCard 
                      key={`preventive-${index}`}
                      service={service}
                      isSelected={isSelected}
                      onSelect={() => handleServiceSelect(service.name)}
                      data-service-name={service.name}
                    />
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center">
              <CircleAlert className="size-5 text-[#036d6d] mr-3"/>
              <Link href="/services" className={`${tt_wellingtons_demi.className} text-[#036d6d] font-bold`}>For more details, visit the <span className="underline">services</span> page</Link>
            </div>
            {/* Restorative Services */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Image src={"/number_2.png"} alt="Number 2" width={20} height={20}></Image>
                <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#024c4c]`}>
                  Restorative Care
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {servicesByCategory.restorative.map((service, index) => (
                  <ServiceCard 
                    key={`restorative-${index}`}
                    service={service}
                    isSelected={bookingData.selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                    data-service-name={service.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <CircleAlert className="size-5 text-[#036d6d] mr-3"/>
              <Link href="/services" className={`${tt_wellingtons_demi.className} text-[#036d6d] font-bold`}>For more details, visit the <span className="underline">services</span> page</Link>
            </div>
            {/* Cosmetic Services */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-5">
                <Image src={"/number_3.png"} alt="Number 3" width={20} height={20}></Image>
                <h2 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#024c4c]`}>
                  Cosmetic Dentistry
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {servicesByCategory.cosmetic.map((service, index) => (
                  <ServiceCard 
                    key={`cosmetic-${index}`}
                    service={service}
                    isSelected={bookingData.selectedService === service.name}
                    onSelect={() => handleServiceSelect(service.name)}
                    data-service-name={service.name}
                  />
                ))}
              </div>
            </div>

            {/* Floating Next Button */}
            {bookingData.selectedService && (
              <button 
                onClick={() => updateStep(2)} 
                className={`${inter.className} bg-[#f6d212] text-gray-900 absolute fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}
              >
                Next
                <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
              </button>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="relative">
            <AppointmentCalendar 
              onSelectSlot={handleSlotSelection}
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
            />
            <button onClick={() => updateStep(1)} className={`${inter.className} bg-[#f6d212] text-gray-900 absolute fixed bottom-10 right-48 lg:right-50 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-xl lg:text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
              <Image src={"/arrow-left.svg"} alt="arrow left" width={30} height={30}></Image>
              Previous
            </button>
            {(() => {
              console.log(bookingData);
              return bookingData.selectedDate && bookingData.selectedTime && (
                <button onClick={() => updateStep(3)} className={`${inter.className} bg-[#f6d212] text-gray-900 absolute fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
                  Next
                  <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
                </button>
              );
            })()}
          </div>
        )}

        {currentStep === 3 && (
          <div className={`-mt-4 p-4 relative`}>
            <form className="space-y-8" onSubmit={(e) => {
              e.preventDefault();
            }}>
              <div>
                <label className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                  Who is this appointment for?
                </label>

                <div className="flex gap-6">
                  <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                    <input
                      type="radio"
                      name="appointmentFor"
                      value="self"
                      checked={bookingData.personalInfo.appointmentFor === "self"}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            appointmentFor: e.target.value as AppointmentFor,
                            guardianName: "", // reset guardian if switching back
                          },
                        }))
                      }
                      required
                      className="accent-[#FFD700] w-5 h-5"
                    />
                    <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>Myself</span>
                  </label>

                  <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                    <input
                      type="radio"
                      name="appointmentFor"
                      value="child"
                      checked={bookingData.personalInfo.appointmentFor === "child"}
                      onChange={(e) =>
                        setBookingData((prev) => ({
                          ...prev,
                          personalInfo: {
                            ...prev.personalInfo,
                            appointmentFor: e.target.value as AppointmentFor,
                          },
                        }))
                      }
                      required
                      className="accent-[#FFD700] w-5 h-5"
                    />
                    <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>My Child</span>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-[#036d6d]">
                  <label htmlFor="firstName" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
                    placeholder="Enter your first name"
                    value={bookingData.personalInfo.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="text-[#036d6d]">
                  <label htmlFor="lastName" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
                    placeholder="Enter your last name"
                    value={bookingData.personalInfo.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {bookingData.personalInfo.appointmentFor === "child" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="guardianFirstName" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                      Guardian's First Name *
                    </label>
                    <input
                      type="text"
                      id="guardianFirstName"
                      name="guardianFirstName"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      value={bookingData.personalInfo.guardianFirstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="guardianLastName" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                      Guardian's Last Name *
                    </label>
                    <input
                      type="text"
                      id="guardianLastName"
                      name="guardianLastName"
                      required
                      className="w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                      value={bookingData.personalInfo.guardianLastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
                      placeholder="your.email@example.com"
                      value={bookingData.personalInfo.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className={`${inter.className} w-full px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-bold text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all`}
                      placeholder="(876) 123-4567"
                      value={bookingData.personalInfo.phone}
                      onChange={handleInputChange}
                    />
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                      Preferred Contact Method *
                  </label>
                  <div className="flex flex-wrap gap-4">
                      {/* Email */}
                      <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={bookingData.personalInfo.contactMethod === 'email'}
                          onChange={handleInputChange}
                          required
                          className="accent-[#FFD700] w-5 h-5"
                        />
                        <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>Email</span>
                      </label>

                      {/* Email */}
                      <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={bookingData.personalInfo.contactMethod === 'whatsapp'}
                          onChange={handleInputChange}
                          required
                          className="accent-[#FFD700] w-5 h-5"
                        />
                        <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>Whatsapp</span>
                      </label>

                  </div>
                </div>
                <div>
                  <label className={`${tt_wellingtons_demi.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                    Have you been to Aurelia Dental before? *
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {/* Yes */}
                    <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                      <input type="radio" name="isReturningPatient" value="yes" checked={bookingData.personalInfo.isReturningPatient === 'yes'} onChange={handleInputChange} required className="accent-[#FFD700] w-5 h-5" />
                      <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>Yes</span>
                    </label>
                    {/* No */}
                    <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                      <input type="radio" name="isReturningPatient" value="no" checked={bookingData.personalInfo.isReturningPatient === 'no'} onChange={handleInputChange} required className="accent-[#FFD700] w-5 h-5" />
                      <span className={`${tt_wellingtons_demi.className} text-[#036d6d] text-xl`}>No</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="dob" className={`${inter_heading.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                  Date of Birth *
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  className="w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all"
                  value={bookingData.personalInfo.dob}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="notes" className={`${inter_heading.className} block text-xl font-medium text-[#036d6d] mb-2`}>
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  className={`${tt_wellingtons_demi.className} w-full px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md text-[#036d6d] placeholder:text-[#036d6d]/50 font-medium text-xl text-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-all resize-none`}
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
                  checked={bookingData.personalInfo.terms}
                  onChange={handleInputChange}
                  className="mt-1 w-6 h-6 rounded border-[#036d6d] bg-white text-[#f6d212] focus:ring-2 focus:ring-[#f6d212] focus:ring-offset-0"
                />
                <label htmlFor="terms" className={`${inter.className} text-xl text-[#181818]`}>
                  I agree to the <a href="#" className="text-[#036d6d] underline">terms and conditions</a> and <a href="#" className="text-[#036d6d] underline">privacy policy</a> *
                </label>
              </div>

              {errors.length > 0 && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <ul className={`${tt_wellingtons_demi.className} list-disc list-inside text-[#181818] font-semibold space-y-1`}>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="relative">
                <button onClick={() => updateStep(2)} className={`${inter.className} bg-[#f6d212] text-gray-900 absolute fixed bottom-10 right-48 lg:right-50 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-xl lg:text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
                  <Image src={"/arrow-left.svg"} alt="arrow left" width={30} height={30}></Image>
                   Previous
                </button>
                {isPersonalInfoComplete() && (
                  <button 
                    onClick={handleContinue} 
                    className={`${inter.className} bg-[#f6d212] text-gray-900 absolute fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}
                  >
                     Next
                    <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {currentStep === 4 && (
            <div className="pt-0 lg:pt-4 p-4 lg:mt-5 relative">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white backdrop-blur-sm border-2 border-white/20 rounded-md p-6 py-4 mb-6 shadow-lg relative lg:flex lg:items-start lg:justify-around gap-8">
                  <div>
                    <div className={`${tt_wellingtons_demi.className} text-sm text-[#024c4c] uppercase mb-4 border-b`}>
                      Personal Information
                    </div>
                    <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className={`${tt_wellingtons_demi.className} text-3xl font-semibold text-[#036d6d] mb-4`}>
                          {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
                        </div>
                        <div className={`${inter.className} text-xl font-medium text-[#024c4c] mb-4 tracking-wide flex items-center`}>
                          <Mail className="w-5 h-5 mr-3 text-[#024c4c]" />
                          {bookingData.personalInfo.email}
                        </div>
                        <div className={`${inter.className} text-xl font-medium text-[#024c4c] tracking-wider mb-10 flex items-center`}>
                          <Phone className="w-5 h-5 mr-3 text-[#024c4c]" />
                          {bookingData.personalInfo.phone}
                        </div>
                        <button 
                          className="bg-[#f6d212] border-2 border-[#f6d212] text-[#181818] px-5 py-2.5 rounded-md font-semibold text-md hover:scale-103 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2 self-end md:self-start"
                          onClick={() => updateStep(3)}
                        >
                          <Image src={"/edit.svg"} alt="Edit" width={23} height={23}></Image>
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`${tt_wellingtons_demi.className} text-sm text-[#024c4c] uppercase mb-4 border-b mt-8 lg:mt-0`}>
                      Selected Service
                    </div>
                    <div className="flex justify-between items-start flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className={`${tt_wellingtons_demi.className} text-3xl font-semibold text-[#036d6d] mb-4`}>
                          {bookingData.selectedService || 'No Service Selected'}
                        </div>
                        <div className={`${inter.className} text-xl font-medium text-[#024c4c] tracking-wider mb-4 flex items-center`}>
                          <Calendar className="w-5 h-5 mr-3 text-[#024c4c]" />
                          {bookingData.selectedDate 
                            ? new Date(bookingData.selectedDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })
                            : 'No Date Selected'}
                        </div>
                        <div className={`${inter.className} font-medium text-xl text-[#024c4c] tracking-wide mb-10 flex items-center`}>
                          <Clock className="w-5 h-5 mr-3 text-[#024c4c]" />
                          {bookingData.selectedTime || 'No Time Selected'}
                        </div>
                        <button 
                          className="bg-[#f6d212] border-2 border-[#f6d212] text-[#181818] px-5 py-2.5 rounded-md font-semibold text-md transition-all duration-300 hover:scale-103 cursor-pointer flex items-center gap-2 self-end md:self-start"
                          onClick={() => updateStep(1)}
                        >
                          <Image src={"/edit.svg"} alt="Edit" width={23} height={23}></Image>
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    className={`${tt_wellingtons_demi.className} px-8 py-3 bg-white/10 border-3 border-[#036d6d] text-[#036d6d] text-lg rounded-md hover:scale-103 cursor-pointer transition-all font-medium`}
                    onClick={() => updateStep(3)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={`${tt_wellingtons_demi.className} flex-1 px-8 py-3 bg-[#eccb1b] text-[#181818] text-xl rounded-md hover:scale-103 cursor-pointer transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={() => {
                      clearBookingData();
                      handleConfirm();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg 
                          className="animate-spin h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        SENDING...
                      </span>
                    ) : (
                      'CONFIRM APPOINTMENT'
                    )}
                  </button>
                </div>
              </div>
            </div>
        )}

        {currentStep === 5 && (
          <div className="flex flex-col gap-6 pb-6 px-2 -mt-2 lg:pt-44 pt-38">
            <div>
              <h1 className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036d6d] mb-4`}>We've Received Your Appointment Request</h1>
              <p className={`${tt_wellingtons.className} text-[#181818] leading-8 text-[1.2rem]`}>Thank you for choosing Aurelia Dental! We have received your appointment request and will review it shortly.</p>
            </div>
            <div>
              <h2 className={`${tt_wellingtons_demi.className} text-xl font-bold text-[#036d6d] mb-4`}>What Happens Next?</h2>
              <p className={`${tt_wellingtons.className} text-[#181818] leading-8 text-[1.2rem]`}>Our scheduling team will contact you within one business day using your preferred contact method to confirm your appointment date and time.<br/> We'll work with you to find a time that fits your schedule.</p>
            </div>
            <div>
              <h2 className={`${tt_wellingtons_demi.className} text-xl font-bold text-[#036d6d] mb-4`}>In the meantime...</h2>
              <p className={`${tt_wellingtons.className} text-[#181818] leading-8 text-[1.2rem]`}>If you have any questions or need to make changes to your request, reach out to us at <Link href="tel:+18766919136" className={`${inter.className} font-bold underline text-[#036d6d]`}>+1 (876) 691 9136</Link> or <Link href="mailto:aureliadental@gmail.com" className={`${inter.className} font-bold underline text-[#036d6d]`}>aureliadental@gmail.com</Link>. <br/> We look forward to seeing you soon and providing you with excellent dental care!</p>
            </div>
            <div className="flex flex-col items-center justify-center mt-2">
              <button onClick={() => {
                  clearBookingData();
                  router.push('/');
                }} 
                className={`${tt_wellingtons_demi.className} mt-4 px-8 py-4 w-[85%] bg-[#036d6d] text-white text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}
              >
                Back to Home
              </button>
              <button onClick={() => router.push('/services')} className={`${tt_wellingtons_demi.className} mt-4 px-8 py-4 w-[85%] bg-[#f6d212] text-[#181818] text-xl rounded-md cursor-pointer hover:scale-104 transition-all font-medium`}>
                View Our Services
              </button>
            </div>
          </div>
        )}
      </div>

    {/* FOOTER */}
        <div className="relative bg-[#004c4c] p-8 lg:p-12 border-t-4 border-[#004c4c] lg:mt-12">
                      <div className="flex flex-col lg:flex-row lg:justify-between">
                        <div className="">
                          <h5 className={`${tt_wellingtons.className} text-gray-100 text-xl font-semibold border-b border-[#f6d212] w-fit pb-1 mb-6`}>Contact Us</h5>
                          <div className="flex flex-col gap-5">
                            <div className="flex gap-6 group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:scale-104 transition-all">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              <a href="https://www.google.com/maps/dir//40-41,+Aurelia+Dental,+Overton+Plaza,+49+Union+Street,+Montego+Bay/@18.4739971,-77.9208353,17z/data=!4m16!1m7!3m6!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2sAurelia+Dental!8m2!3d18.4739971!4d-77.9182604!16s%2Fg%2F11vyvdsfr9!4m7!1m0!1m5!1m1!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2m2!1d-77.9182604!2d18.4739971?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" className={`${inter.className} text-[#D1D5DB] -mt-1 text-lg tracking-wide group-hover:scale-104 transition-all duration-300`}>Shop 40, 41<br></br>
                                Overton Plaza<br></br>
                                49 Union Street, Montego Bay, Jamaica
                              </a>
                            </div>
                            <div className="flex gap-6 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:scale-104 transition-all duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                              </svg>
                              <a href="#" className={`${inter.className} text-[#D1D5DB] text-lg tracking-wide group-hover:scale-104 transition-all duration-300`}>+1 (876) 691 9136</a>
                            </div>
                            <div className="flex gap-6 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:scale-104 transition-all duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                              </svg>
                              <a href="#" className={`${inter.className} text-[#D1D5DB] text-lg tracking-wide group-hover:scale-104 transition-all duration-300`}>aureliadental@gmail.com</a>
                            </div>
                          </div>
                        </div>
                        <div className="mt-12 lg:mt-0">
                          <h5 className={`${tt_wellingtons.className} text-gray-100 text-xl font-semibold border-b border-[#f6d212] w-fit pb-1 mb-6`}>Opening Hours</h5>
                          <div className="flex flex-col gap-6">
                            <div className="flex border-b border-b-gray-100 pb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                              </svg>
                              <div className={`${inter.className} text-[#D1D5DB] w-full flex justify-between gap-12 text-lg tracking-wide`}>
                                <p>MON - FRI</p>
                                <p>10:00am - 6:00pm</p>
                              </div>
                            </div>
                            <div className="flex border-b border-b-gray-100 pb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                              </svg>
                              <div className={`${inter.className} text-[#D1D5DB] w-full flex justify-between gap-12 text-lg tracking-wide`}>
                                <p>SATURDAY</p>
                                <p>9:00am - 6:00pm</p>
                              </div>
                            </div>
                            <div className="flex border-b border-b-gray-100 pb-1">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                              </svg>
                              <div className={`${inter.className} text-[#D1D5DB] w-full flex justify-between text-lg tracking-wide`}>
                                <p>SUNDAY</p>
                                <p>Closed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-12 lg:mt-0">
                          <h5 className={`${tt_wellingtons.className} text-gray-100 text-xl font-semibold border-b border-[#f6d212] w-fit pb-1 mb-4`}>Quick Links</h5>
                          <div className="flex flex-col gap-3">
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Home</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>About Us</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Services</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Contact Us</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-12 lg:mt-0">
                          <h5 className={`${tt_wellingtons.className} text-gray-100 text-xl font-semibold border-b border-[#f6d212] w-fit pb-1 mb-4`}>Our Services</h5>
                          <div className="flex flex-col gap-3 text-[#D1D5DB]">
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>General Dentistry</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Surgical Services</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Orthodontics</p>
                            </div>
                            <div className="flex gap-1 items-center group cursor-pointer">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                              </svg>
                              <p className={`${inter.className} text-[#D1D5DB] group-hover:text-[#A7C4DF] text-lg tracking-wide`}>Cosmetic Dentistry</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center border-t border-[#D1D5DB] mt-12 pt-6">
                        <Image src={"/aurelia-dental_logo.png"} alt={"Alternative Logo"} width={60} height={60}></Image>
                        <p className={`${inter.className} text-[#D1D5DB]`}>&copy; 2026 Aurelia Dental. All rights reserved.</p>
                        <button className="p-2 rounded-full bg-[#eef3f9] my-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#35565f" className="size-6 text-[#35565f]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                          </svg>
                        </button>
                        <p className={`${inter.className} text-sm text-[#D1D5DB] -mb-4`}>Powered by <span className="underline">Omni-Ray Software Solutions</span></p>
                      </div>
        </div>
        {/* FOOTER */}
  </>
  )
}