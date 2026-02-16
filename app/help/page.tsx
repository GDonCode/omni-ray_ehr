'use client'

import styles from "./help.module.css";
import Image from "next/image";
import Link from "next/link";
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

type Item = {
  question: string;
  answer: string;
};

type Section = {
  title: string;
  items: Item[];
};

export default function Help() {
  // Desktop Nav
  const [activeItem, setActiveItem] = useState<string>('help');
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
  const [activeMobileLink, setActiveMobileLink] = useState('help');
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


  // FAQ Tabs and Accordion
  const [activeTab, setActiveTab] = useState<string>('general');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'payment', label: 'Payment' },
    { id: 'services', label: 'Services' }
  ];

  const faqData: Record<string, Item[]> = {
    general: [
      {
        question: "How do I book an appointment?",
        answer: "You can book an appointment through our online booking form on the website, by calling our clinic directly at the phone number listed, or by visiting us in person. Our staff will help you find a convenient time slot.",
      },
      {
        question: "What are your clinic hours?",
        answer: "We are open Monday to Friday from 10:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 6:00 PM. We are closed on Sundays and public holidays.",
      },
      {
        question: "Where is Aurelia Dental located?",
        answer: "We are located at Shop 40, 41 Overton Plaza, 49 Union Street, Montego Bay. You can click the map link at the top of our website for directions.",
      },
      {
        question: "Do I need a referral to visit?",
        answer: "No, you do not need a referral. You can book an appointment directly with us for any dental concern or routine checkup.",
      },
    ],
    payment: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, credit cards (Visa, Mastercard), debit cards, and bank transfers. Payment is expected at the time of service unless prior arrangements have been made.",
      },
      {
        question: "Do you accept dental insurance?",
        answer: "Yes, we accept most major dental insurance providers. Please bring your insurance card to your appointment, and we will help verify your coverage and file claims on your behalf.",
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we offer flexible payment plans for larger treatments. Please speak with our administrative staff to discuss options that work for your budget.",
      },
      {
        question: "Can I get a cost estimate before treatment?",
        answer: "Absolutely. We provide detailed cost estimates for all procedures before treatment begins, so you know exactly what to expect.",
      },
    ],
    services: [
      {
        question: "What dental services do you offer?",
        answer: "We offer comprehensive dental care including routine cleanings, fillings, root canals, crowns, bridges, teeth whitening, extractions, and cosmetic dentistry. Visit our Services page for a complete list.",
      },
      {
        question: "Do you handle dental emergencies?",
        answer: "Yes, we handle dental emergencies such as severe tooth pain, knocked-out teeth, broken teeth, and uncontrolled bleeding. Please call us immediately if you have a dental emergency.",
      },
      {
        question: "Is teeth whitening safe?",
        answer: "Yes, professional teeth whitening performed by our dental team is safe and effective. We use clinically approved methods that minimize sensitivity while delivering excellent results.",
      },
      {
        question: "How often should I have a dental checkup?",
        answer: "We recommend a dental checkup and cleaning every six months to maintain optimal oral health and catch potential issues early.",
      },
      {
        question: "Do you provide care for children?",
        answer: "Yes, we provide comprehensive dental care for patients of all ages, including children. Our team is experienced in making young patients feel comfortable during their visits.",
      },
    ],
  };

  const filteredQuestions = searchQuery
    ? faqData[activeTab].filter((item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqData[activeTab];


  return (
  <>
    <div className={`${styles.background}`}>
    </div>
    <Header
      activeItem={activeItem}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      navItems={navItems}
      inter_heading={inter_heading}
      tt_wellingtons_demi={tt_wellingtons_demi} // Replace with your actual font
      levenim={levenim} // Replace with your actual font
    />
    <MobileMenu
      isOpen={isOpen}
      navItems={navItems}
      activeMobileLink={activeMobileLink}
      onClose={() => setIsOpen(false)}
      onLinkClick={handleMobileLinkClick}
    />
      
    {/* Page Header */}
    <div className="bg-[#058080] py-4 w-full lg:mt-36 mt-29 relative">
      <h1 className={`${tt_wellingtons_demi.className} text-white text-3xl lg:text-4xl text-center`}>Help & Support</h1>
      <p className={`${tt_wellingtons.className} text-white/90 text-center mt-2 text-sm lg:text-base`}>
        Find answers to your questions
      </p>
    </div>

    {/* FAQ Section */}
    <div className="w-full lg:w-[95%] mx-auto mt-8 mb-12 px-4 relative lg:flex lg:gap-12 lg:justify-around">
      <div className="min-w-[65%]">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOpenQuestionIndex(null);
                setSearchQuery('');
              }}
              className={`${tt_wellingtons_demi.className} px-6 py-3 rounded-t-lg text-base lg:text-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#036d6d] text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`${tt_wellingtons.className} w-full px-4 py-3 pl-12 pr-12 border-2 border-[#036d6d] rounded-lg focus:outline-none focus:border-[#036d6d] transition-all`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-16 h-16 mx-auto text-gray-300 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                />
              </svg>
              <p className={`${tt_wellingtons.className} text-gray-500 text-lg`}>
                No results found for "{searchQuery}"
              </p>
              <p className={`${tt_wellingtons.className} text-gray-400 text-sm mt-2`}>
                Try searching with different keywords
              </p>
            </div>
          ) : (
            filteredQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setOpenQuestionIndex(openQuestionIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className={`${tt_wellingtons_demi.className} text-lg text-gray-800 pr-4`}>
                    {item.question}
                  </h3>

                  <svg
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      openQuestionIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="#036d6d"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Answer */}
                {openQuestionIndex === index && (
                  <div className="px-6 pb-5 pt-2 bg-gray-50/50 border-t border-gray-100 lg:max-w-4xl">
                    <p className={`${tt_wellingtons.className} text-gray-700 leading-relaxed`}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        {/* Contact Support Card */}
        <div className="bg-gradient-to-r from-[#036d6d] to-[#058080] rounded-lg p-6 mb-8 text-center shadow-lg">
          <h3 className={`${tt_wellingtons_demi.className} text-white text-xl mb-2`}>
            Still need help?
          </h3>
          <p className={`${tt_wellingtons.className} text-white/90 mb-4`}>
            Our team is here to assist you with any questions or concerns
          </p>
          <Link
            href="/contact"
            className={`${tt_wellingtons_demi.className} inline-block bg-white text-[#036d6d] px-8 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg`}
          >
            Contact Us
          </Link>
        </div>
        <div className="flex gap-6 group cursor-pointer mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#181818] group-hover:scale-104 transition-all duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <a href="https://www.google.com/maps/dir//40-41,+Aurelia+Dental,+Overton+Plaza,+49+Union+Street,+Montego+Bay/@18.4739971,-77.9208353,17z/data=!4m16!1m7!3m6!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2sAurelia+Dental!8m2!3d18.4739971!4d-77.9182604!16s%2Fg%2F11vyvdsfr9!4m7!1m0!1m5!1m1!1s0x8eda2be6ffd22ceb:0x470b2fe0bf806ab9!2m2!1d-77.9182604!2d18.4739971?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" className={`${inter.className} text-[#181818] -mt-1 text-lg tracking-wide group-hover:scale-104 transition-all duration-300`}>Shop 40, 41<br></br>
            Overton Plaza<br></br>
            49 Union Street, Montego Bay, Jamaica
          </a>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex border-b border-b-[#181818] pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#181818] mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <div className={`${inter.className} text-[#181818] w-full flex justify-between gap-12 text-lg tracking-wide`}>
              <p>MON - FRI</p>
              <p>10:00am - 6:00pm</p>
            </div>
          </div>
          <div className="flex border-b border-b-[#181818] pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#181818] mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <div className={`${inter.className} text-[#181818] w-full flex justify-between gap-12 text-lg tracking-wide`}>
             <p>SATURDAY</p>
              <p>9:00am - 6:00pm</p>
            </div>
          </div>
          <div className="flex border-b border-b-[#181818] pb-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#181818] mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
            </svg>
            <div className={`${inter.className} text-[#181818] w-full flex justify-between text-lg tracking-wide`}>
              <p>SUNDAY</p>
              <p>Closed</p>
            </div>
          </div>
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