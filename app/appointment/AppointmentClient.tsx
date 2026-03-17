'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import localFont from 'next/font/local';
import styles from './new_appointment.module.css';

// Shared components
import HeaderWrapper from '../components/HeaderWrapper';
import Footer from '../components/Footer';
import StepIndicator from '../components/StepIndicator';

// Step components
import Step1 from '../components/Appointment/Step1';
import Step2 from '../components/Appointment/Step2';
import Step3 from '../components/Appointment/Step3';
import Step4 from '../components/Appointment/Step4';
import Step5 from '../components/Appointment/Step5';

// Fonts
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
type ContactMethod = 'email' | null;
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
  message: string;
  terms: boolean;
}

export interface SelectedSlot {
  date: Date;
  times: string[];
}

interface BookingData {
  selectedService: string | null;
  selectedSlots: SelectedSlot[];
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
    contactMethod: 'email',
    isReturningPatient: null,
    notes: '',
    message: '',
    terms: false
  };

  const [bookingData, setBookingData] = useState<BookingData>({
    selectedService: null,
    selectedSlots: [],
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

  // Session storage handling
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
        selectedSlots: [],
        personalInfo: defaultPersonalInfo,
      });
      setCurrentStep(1);
      setMaxReachedStep(1);
      return;
    }

    if (savedBookingData) {
      const parsed = JSON.parse(savedBookingData);
      // Convert saved date strings back to Date objects for each slot
      if (parsed.selectedSlots && Array.isArray(parsed.selectedSlots)) {
        parsed.selectedSlots = parsed.selectedSlots.map((slot: any) => ({
          ...slot,
          date: new Date(slot.date),
        }));
      } else {
        // If old data format (selectedDate/selectedTime), migrate to new structure
        if (parsed.selectedDate) {
          const date = new Date(parsed.selectedDate);
          const time = parsed.selectedTime || '';
          parsed.selectedSlots = time ? [{ date, times: [time] }] : [];
        }
        // Clean up old fields to avoid confusion
        delete parsed.selectedDate;
        delete parsed.selectedTime;
      }
      if (urlService) parsed.selectedService = urlService;
      if (parsed.personalInfo) {
        parsed.personalInfo.contactMethod = 'email';
      }
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

  const maxReachedStepRef = useRef(maxReachedStep);
  useEffect(() => {
    maxReachedStepRef.current = maxReachedStep;
  }, [maxReachedStep]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const stepMatch = hash.match(/#step-(\d+)/);
      if (stepMatch) {
        const step = parseInt(stepMatch[1]);
        if (step >= 1 && step <= 5 && step <= maxReachedStepRef.current) {
          setCurrentStep(step);
        }
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Safety: if currentStep ever exceeds maxReachedStep, reset it
  useEffect(() => {
    if (currentStep > maxReachedStep) {
      setCurrentStep(maxReachedStep);
      window.history.replaceState(null, '', `#step-${maxReachedStep}`);
    }
  }, [currentStep, maxReachedStep]);

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    setMaxReachedStep(Math.max(maxReachedStep, newStep));
    window.history.pushState(null, '', `#step-${newStep}`);
  };

  useEffect(() => {
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

  // NEW: Handle multi‑date/time selection
  const handleSlotSelection = useCallback((slots: SelectedSlot[]) => {
    setBookingData(prev => ({ ...prev, selectedSlots: slots }));
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

  // Validation
  const age = bookingData.personalInfo.dob ? calculateAge(bookingData.personalInfo.dob) : null;

  const validatePersonalInfo = () => {
    const errors: string[] = [];
    const { firstName, lastName, appointmentFor, guardianFirstName, guardianLastName, email, phone, dob, terms } = bookingData.personalInfo;

    const nameRegex = /^[A-Za-z\s'-]{2,}$/;

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
    } else if (!/^[\d\s\-\(\)]+$/.test(phone)) {
      errors.push('Please enter a valid phone number');
    } else if (phone.replace(/\D/g, '').length < 10) {
      errors.push('Phone number must be at least 10 digits.');
    }

    if (!dob || dob.trim() === '') {
      errors.push('Date of birth is required');
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      if (birthDate > today) {
        errors.push('Date of birth cannot be in the future');
      }
    }

    if (bookingData.personalInfo.appointmentFor === "self" && age !== null && age < 18) {
      errors.push("Patients under 18 must be booked by a parent or guardian.");
    }

    if (!terms) {
      errors.push('You must agree to the terms and conditions');
    }

    return errors;
  };

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

  const [confirmErrors, setConfirmErrors] = useState<string[]>([]);
  const handleConfirm = async () => {
    setIsLoading(true);
    setConfirmErrors([]);
    const result = await sendAppointmentEmail(bookingData);
    setIsLoading(false);
    if (result.success) {
      clearBookingData();
      updateStep(5);
    } else {
      setConfirmErrors(['Failed to send your appointment request. Please try again or call us at (876) 691-9136.']);
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
    <div className='bg-[#F7FBFC]'>
      <div className={`${styles.background}`} />
      <header role="banner">
        <HeaderWrapper
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          levenim={levenim}
        />
      </header>

      {currentStep <= 4 && (
        <div className="flex flex-col md:flex-row gap-2 md:items-end mb-6 lg:mt-36 mt-31 w-full bg-[#058080] relative">
          <StepIndicator currentStep={currentStep} onStepClick={handleStepClick} maxReachedStep={maxReachedStep} />
        </div>
      )}

      <div className="relative w-[95%] mx-auto bg-[#F7FBFC]">
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
              selectedSlots={bookingData.selectedSlots}
              onSelectSlots={handleSlotSelection}
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
              errors={confirmErrors}
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