'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import localFont from 'next/font/local';
import styles from './new_appointment.module.css';

// Shared components
import Header from '../components/Header';
import MobileMenuClient from '../components/MobileMenuClient';
import Footer from '../components/Footer';
import StepIndicator from '../components/StepIndicator';

// Step components
import Step1 from '../components/Appointment/Step1';
import Step2 from '../components/Appointment/Step2';
import Step3 from '../components/Appointment/Step3';
import Step4 from '../components/Appointment/Step4';
import Step5 from '../components/Appointment/Step5';

// Fonts (same as before)
const levenim = localFont({ src: '../fonts/Levenim_MT/levenim-mt.ttf' });
const inter_heading = localFont({ src: '../fonts/Inter/Inter-Medium.otf' });
const inter = localFont({ src: '../fonts/Inter/Inter-Regular.otf' });
const tt_wellingtons_demi = localFont({ src: '../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf' });
const tt_wellingtons = localFont({ src: '../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf' });

const fontClasses = {
  tt_wellingtons_demi: tt_wellingtons_demi.className,
  tt_wellingtons: tt_wellingtons.className,
  inter: inter.className,
  inter_heading: inter_heading.className,
  levenim: levenim.className,
};

// Types
type ContactMethod = 'email' | 'whatsapp' | null;
type AppointmentFor = 'self' | 'child';
interface PersonalInfo {
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
}
interface BookingData {
  selectedService: string | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  personalInfo: PersonalInfo;
}

// Helper functions
const calculateAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

async function sendAppointmentEmail(bookingData: BookingData) {
  try {
    const response = await fetch('/api/send-appointment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to send');
    return { success: true, data };
  } catch (error) {
    console.error('Error sending appointment:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

const servicesByCategory = {
  preventive: [
    { 
      name: 'New Patient Consultation', 
      duration: '30 min', 
      price: '13,000',
      description: 'Complete oral health assessment to evaluate your teeth and gums.',
      details: 'Our experienced dentists examine your teeth, gums, and overall oral health. We identify any issues early and create a personalized treatment plan.',
      when: ['First visit', 'Annual check-up', 'Dental concerns or pain', 'Second opinion needed']
    },
    { 
      name: 'Dental Cleaning', 
      icon: '/service_icons/tooth-cleaning_036d6d.png',
      duration: '60 min', 
      price: '15,000',
      description: 'Professional cleaning to remove plaque and tartar buildup.',
      details: 'Our hygienists thoroughly clean your teeth, removing hardened plaque that regular brushing cannot reach. We polish your teeth and provide personalized oral care advice.',
      when: ['Every 6 months', 'Prevent cavities and gum disease', 'Freshen breath and brighten smile']
    },
    { 
      name: 'Emergency Visit', 
      duration: '30 min', 
      price: '13,000',
      description: 'Immediate evaluation for urgent dental pain or injury.',
      details: 'If you are experiencing pain, swelling, or trauma, we assess the issue quickly and recommend the appropriate treatment to relieve discomfort.',
      when: ['Severe toothache', 'Swelling or infection', 'Broken tooth', 'Dental trauma']
    }
  ],

  restorative: [
    { 
      name: 'Tooth Filling', 
      duration: '20 min per filling', 
      price: '13,000',
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
      name: 'Tooth Extraction', 
      duration: '30–45 min', 
      price: '15,000',
      description: 'Safe removal of damaged or problematic teeth.',
      details: 'Extraction may be necessary to prevent infection spread or relieve pain. We use local anesthetic and gentle techniques for minimal discomfort.',
      when: ['Severely damaged tooth', 'Advanced decay', 'Impacted tooth']
    },
    { 
      name: 'Crowns & Bridges Consultation', 
      duration: '30 min', 
      price: '13,000',
      description: 'Assessment for restoring damaged or missing teeth.',
      details: 'Crowns strengthen damaged teeth, and bridges replace missing teeth. We evaluate your case and recommend the best restorative solution.',
      when: ['Cracked or broken tooth', 'After root canal', 'Missing one or more teeth']
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
      price: '50,000',
      description: 'Professional whitening for a brighter smile.',
      details: 'Our professional-grade whitening system safely lightens teeth several shades in one visit with longer-lasting results than over-the-counter products.',
      when: ['Stained or yellowed teeth', 'Before special events', 'Boost confidence']
    },
    { 
      name: 'Veneers Consultation', 
      duration: '30 min', 
      price: '13,000',
      description: 'Assessment for porcelain veneers and smile transformation.',
      details: 'Thin porcelain shells bonded to front teeth correct color, shape, and alignment issues. We design your ideal smile with expert planning.',
      when: ['Discolored teeth', 'Chipped or worn teeth', 'Gaps between teeth', 'Misshapen teeth']
    }
  ]
};

export default function NewAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasLoadedFromUrl = useRef(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const defaultPersonalInfo: PersonalInfo = {
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
  };
  
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedService: null,
    selectedDate: null,
    selectedTime: null,
    personalInfo: defaultPersonalInfo,
  });


  const [currentStep, setCurrentStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ];

  // Session storage handling (same as original, but could be simplified)
  useEffect(() => {
    setMounted(true);
    const urlService = searchParams.get('service');
    const savedStep = sessionStorage.getItem('currentStep');
    const savedBookingData = sessionStorage.getItem('bookingData');

    const shouldReset = () => {
      if (!savedBookingData) return false;
      const parsed = JSON.parse(savedBookingData);
      if (savedStep === '5' && !parsed?.selectedService) return true;
      if (parsed?.timestamp && Date.now() - parsed.timestamp > 30 * 60 * 1000) return true;
      return false;
    };

    if (shouldReset()) {
      clearBookingData();
      setBookingData({
        selectedService: urlService || null,
        selectedDate: null,
        selectedTime: null,
        personalInfo: defaultPersonalInfo, 
      });
      setCurrentStep(1);
      setMaxReachedStep(1);
      return;
    }

    if (savedBookingData) {
      const parsed = JSON.parse(savedBookingData);
      if (parsed.selectedDate) parsed.selectedDate = new Date(parsed.selectedDate);
      if (urlService) parsed.selectedService = urlService;
      setBookingData(parsed);
    } else if (urlService) {
      setBookingData(prev => ({ ...prev, selectedService: urlService }));
    }
    const savedMaxStep = sessionStorage.getItem('maxReachedStep');
    if (savedStep) setCurrentStep(parseInt(savedStep));
    if (savedMaxStep) setMaxReachedStep(parseInt(savedMaxStep));
  }, [searchParams]);

  useEffect(() => {
    if (mounted) sessionStorage.setItem('bookingData', JSON.stringify(bookingData));
  }, [bookingData, mounted]);

  useEffect(() => {
    if (mounted) sessionStorage.setItem('currentStep', currentStep.toString());
  }, [currentStep, mounted]);

  useEffect(() => {
    if (mounted) sessionStorage.setItem('maxReachedStep', maxReachedStep.toString());
  }, [maxReachedStep, mounted]);

  const clearBookingData = () => {
    sessionStorage.removeItem('bookingData');
    sessionStorage.removeItem('currentStep');
    sessionStorage.removeItem('maxReachedStep');
  };

  useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash;
    const stepMatch = hash.match(/#step-(\d+)/);
    if (stepMatch) {
      const step = parseInt(stepMatch[1]);
      if (step >= 1 && step <= 5) {
        setCurrentStep(step);
        setMaxReachedStep(prev => Math.max(prev, step));
      }
    }
  };

  // Check hash on mount
  handleHashChange();

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []); // Empty dependency array = runs once on mount

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    setMaxReachedStep(Math.max(maxReachedStep, newStep));
    window.history.pushState(null, '', `#step-${newStep}`);
  };
  useEffect(() => {
    // Small delay to ensure DOM is updated
    setTimeout(() => {
      stepHeadingRef.current?.focus();
    }, 100);
  }, [currentStep]);

  const handleStepClick = (step: number) => {
    if (step <= maxReachedStep) updateStep(step);
  };

  // Service selection
  const handleServiceSelect = (serviceTitle: string) => {
    setBookingData(prev => ({
      ...prev,
      selectedService: prev.selectedService === serviceTitle ? null : serviceTitle,
    }));
  };

  // Date/time selection
  const handleSlotSelection = useCallback((slot: { dayKey: string | null; slot: string | null }) => {
    if (slot.dayKey && slot.slot) {
      const [monthAbbr, day] = slot.dayKey.split('-');
      const monthMap: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
      const currentYear = new Date().getFullYear();
      const selectedDate = new Date(currentYear, monthMap[monthAbbr], parseInt(day));
      setBookingData(prev => ({ ...prev, selectedDate, selectedTime: slot.slot }));
    } else {
      setBookingData(prev => ({ ...prev, selectedDate: null, selectedTime: null }));
    }
  }, []);

  // Form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    setBookingData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  // Validation (same as original)
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

  const age = bookingData.personalInfo.dob ? calculateAge(bookingData.personalInfo.dob) : null;
  const isPersonalInfoComplete = () => {
    const { firstName, lastName, email, phone, contactMethod, dob, terms } = bookingData.personalInfo;
    return !!(
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim() &&
      dob.trim() &&
      contactMethod !== null &&
      terms
    );
  };

  const handleContinue = () => {
    const validationErrors = validatePersonalInfo();
    setErrors(validationErrors);
    if (validationErrors.length === 0) {
      updateStep(4);
    }
  };
  
  const handleConfirm = async () => {
    setIsLoading(true);
    const result = await sendAppointmentEmail(bookingData);
    setIsLoading(false);
    if (result.success) {
      clearBookingData();
      updateStep(5);
    } else {
      alert('Failed to send appointment request. Please try again.');
    }
  };

  // Scroll to selected service (as original)
  useEffect(() => {
    if (currentStep === 1 && bookingData.selectedService && mounted) {
      setTimeout(() => {
        const selectedCard = document.querySelector(`[data-service-name="${bookingData.selectedService}"]`);
        if (selectedCard) {
          selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [currentStep, bookingData.selectedService, mounted]);

  return (
    <div className='bg-[#EAF3F7]'>
      <div className={`${styles.background}`} />
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileMenuClient navItems={navItems} />

      {currentStep <= 4 && (
        <div className="flex flex-col md:flex-row gap-2 md:items-end mb-6 lg:mt-36 mt-31 w-full bg-[#058080] relative">
          <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} maxReachedStep={maxReachedStep} />
        </div>
      )}

      <div className="relative w-[95%] mx-auto bg-[#EAF3F7]">
        {currentStep === 1 && (
          <div>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="sr-only">Step 1: Select Service</h2>
            <Step1
              servicesByCategory={servicesByCategory}
              selectedService={bookingData.selectedService}
              onServiceSelect={handleServiceSelect}
              onNext={() => updateStep(2)}
              fontClasses={fontClasses}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="sr-only">Step 2: Select Date & Time</h2>
            <Step2
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
              onSelectSlot={handleSlotSelection}
              onPrevious={() => updateStep(1)}
              onNext={() => updateStep(3)}
              fontClasses={fontClasses}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="sr-only">Step 3: Personal Information</h2>
            <Step3
              personalInfo={bookingData.personalInfo}
              errors={errors}
              onInputChange={handleInputChange}
              onContinue={handleContinue}
              onPrevious={() => updateStep(2)}
              fontClasses={fontClasses}
              isComplete={isPersonalInfoComplete()}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="sr-only">Step 4: Review and Confirm</h2>
            <Step4
              bookingData={bookingData}
              onEditService={() => updateStep(1)}
              onEditDateTime={() => updateStep(2)}
              onEditPersonalInfo={() => updateStep(3)}
              onConfirm={handleConfirm}
              onBack={() => updateStep(3)}
              isLoading={isLoading}
              fontClasses={fontClasses}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div>
            <h2 ref={stepHeadingRef} tabIndex={-1} className="sr-only">Step 5: Appointment Request Sent</h2>
            <Step5
              onHome={() => router.push('/')}
              onServices={() => router.push('/services')}
              fontClasses={fontClasses}
            />
          </div>
        )}
      </div>

      <Footer tt_wellingtons={tt_wellingtons} inter_heading={inter_heading} />
    </div>
  );
}