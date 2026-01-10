'use client'

import {useState} from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import StepIndicator from '../components/StepIndicator';
import Image from "next/image";
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


export default function NewAppointment (){
    const [contactMethod, setContactMethod] = useState('email');
    const [contactValue, setContactValue] = useState('');

    // SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC --------- SERVICE TILE LOGIC ---------
      const [services, setServices] = useState([
        { 
          title: "Dental Checkup", 
          icon: "/appointment/tooth.png", 
          desc: "Routine exam to check for cavities, gum issues, and overall oral health.",
          duration: "60 min",
          price: "$3,000 - $5,000"
        },
        { 
          title: "Teeth Whitening", 
          icon: "/appointment/clean-teeth.png", 
          desc: "Cosmetic procedure to brighten and whiten your teeth safely.",
          duration: "90 min",
          price: "$15,000 - $35,000"
        },
        { 
          title: "Cavity Filling", 
          icon: "/appointment/tooth-filling.png", 
          desc: "Restores a decayed tooth by filling the cavity with safe material.",
          duration: "60 min",
          price: "$5,000 - $12,000"
        },
        { 
          title: "Emergency Care", 
          icon: "/appointment/emergency.png", 
          desc: "Immediate care for dental pain, injury, or urgent tooth problems.",
          duration: "30-60 min",
          price: "$8,000 - $20,000"
        },
        { 
          title: "Root Canal", 
          icon: "/appointment/root-canal.png", 
          desc: "Saves a damaged tooth by removing infected pulp.",
          duration: "60-90 min",
          price: "$25,000 - $60,000"
        },
        { 
          title: "Dental Crowns", 
          icon: "/appointment/dental-crown.png", 
          desc: "Protective cap placed over a tooth to restore shape and strength.",
          duration: "2 visits",
          price: "$35,000 - $80,000"
        },
        { 
          title: "Wisdom Tooth", 
          icon: "/appointment/dental.png", 
          desc: "Surgical removal of wisdom teeth that are impacted or causing pain.",
          duration: "45-90 min",
          price: "$15,000 - $45,000"
        },
        { 
          title: "Tooth Extraction", 
          icon: "/appointment/tooth-extraction.png", 
          desc: "Complete removal of a tooth that is too damaged to be saved.",
          duration: "20-45 min",
          price: "$5,000 - $15,000"
        },
      ]);

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
      { id: 'home', label: 'Home', href: '#' },
      { id: 'services', label: 'Services', href: '/services' },
      { id: 'about', label: 'About', href: '#' },
      { id: 'help', label: 'Help', href: '#' },
      { id: 'contact', label: 'Contact', href: '#' }
    ];


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
    return (
    <div className={`${styles.secondary_container}`}>
        {/* Header */}
        <div className={`w-[100%] flex items-center justify-between pl-8 pr-12 lg:justify-center lg:gap-100 z-20`} >
          <Image src={"/demo-logo.png"} alt="Logo" width={110} height={110} className="lg:w-[130] cursor-pointer"/>
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
                <button className="relative flex gap-1 items-center bg-[#032d68] text-white px-3 py-2 rounded-lg hover:scale-105 cursor-pointer transition-transform shadow-[0_0_30px_15px_rgba(255,255,255,0.3)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
                    <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                  </svg>
                  Sign Up
                </button>
              </ul>
            </nav>
                  <button onClick={() => setIsOpen(prev => !prev)} className="block lg:hidden">
                    {isOpen ? ( 
                      // Close Icon (X)
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#032d68] transition-all duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // Hamburger Icon
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#032d68] transition-all duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    )}
                  </button>
        </div>
        
        
        {currentStep === 1 && (
          <div className={`${styles.secondary_container} p-4 relative`}>
            <div className="flex flex-col md:flex-row md:w-[80%] gap-2 md:items-end mb-6 mt-4 w-[100%]">
              <div className="flex gap-2 items-center mb-4">
                <Image src={"/number-1.png"} alt="First" width={25} height={25}></Image>
                <h2 className={`${noticia_regular.className} text-2xl font-semibold border-b-2 border-[#FFD700] w-fit text-white`}>Choose a service</h2>
              </div>
              <StepIndicator currentStep={currentStep} totalSteps={5} /> 
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className={`bg-white/10 backdrop-blur-sm border-2 shadow-lg p-5 flex flex-col rounded-xl cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:bg-white/15
                  ${bookingData.selectedService === service.title ? 'bg-gradient-to-br from-[#5bbce4]/40 to-[#5bbce4]/30 border-none scale-102 shadow-2xl ring-4 ring-[#FFD700]' : 'border-white/20'}`}
                  onClick={() => handleServiceSelect(service.title)}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg`}>
                      <Image src={service.icon} alt={service.title} width={40} height={40}className="drop-shadow-md flex-shrink-0"/>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm mb-4 leading-relaxed text-white/80">
                    {service.desc}
                  </p>
    
                  {/* Time and Price */}
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    
                    <div className={`text-lg font-bold ${bookingData.selectedService === service.title ? 'text-[#FFD700]' : 'text-white'}`}>
                      JMD {service.price}
                    </div>
                  </div>
    
                  {/* Selected Indicator */}
                  {bookingData.selectedService === service.title && (
                    <div className="absolute top-3 right-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#FFD700]">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentStep(2)} className={`${encode_sans.className} ${!bookingData.selectedService ? 'hidden' : ''} bg-[#FFD700] absolute fixed bottom-10 right-4 z-100 text-gray-900 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl mt-10 lg:mt-20 font-semibold shadow-md flex gap-2 items-center`}>
              Next
              <Image src={"/arrow-right.svg"} alt="arrow right" width={30} height={30}></Image>
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className={`${styles.secondary_container} p-4 relative`}>
            <div className="flex flex-col md:flex-row gap-2 md:items-center md:items-end mb-6 mt-4 w-[100%]">
              <div className="flex gap-2 items-center mb-4">
                <Image src={"/number-2.png"} alt="First" width={25} height={25}></Image>
                <h2 className={`${noticia_regular.className} text-2xl font-semibold border-b-2 border-yellow-400 w-fit text-white`}>Choose a Date and Time</h2>
              </div>
              <StepIndicator currentStep={currentStep} totalSteps={5} /> 
            </div>
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
          <div className={`${styles.secondary_container} p-4 relative`}>
            <div className="flex flex-col md:flex-row md:w-[80%] gap-2 md:items-end mb-6 mt-4 w-[100%]">
              <div className="flex gap-2 items-center mb-4">
                <Image src={"/number-3.png"} alt="First" width={25} height={25}></Image>
                <h2 className={`${noticia_regular.className} text-2xl font-semibold border-b-2 border-yellow-400 w-fit text-white`}>Personal Information</h2>
              </div>
              <StepIndicator currentStep={currentStep} totalSteps={5} /> 
            </div>
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
          <div className={`${styles.secondary_container} p-4 relative`}>
            <div className="flex flex-col md:flex-row md:w-[80%] gap-2 md:items-end mb-6 mt-4 w-[100%]">
              <div className="flex gap-2 items-center mb-4">
                <Image src={"/number-4.png"} alt="First" width={25} height={25}></Image>
                <h2 className={`${noticia_regular.className} text-2xl font-semibold border-b-2 border-yellow-400 w-fit text-white`}>Appointment Summary</h2>
              </div>
              <StepIndicator currentStep={currentStep} totalSteps={5} /> 
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

        <footer className="bg-[#011B3E] py-4 flex flex-col items-center justify-center">
          <p className="text-[#D1D5DB]"> &copy; 2025 Dental Tooth Clinic. All rights reserved.</p>
          <p className="text-sm text-[#D1D5DB]">Powered by <span className="underline">Omni-Ray Software Solutions</span></p>
        </footer>
    </div>
    )
}