'use client'

import styles from "./services.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  src: "../fonts/Soage PersonalUseOnly/Soage PersonalUseOnly.ttf"
})


export default function Services(){

    const [isOpen, setIsOpen] = useState(false);
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

   const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '#' },
    { id: 'help', label: 'Help', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' }
  ];
    const [services, setServices] = useState([
      { 
        title: "Dental Checkup", 
        icon: "/services/tooth.png", 
        defaultIcon: "/services/tooth.png", 
        activeIcon: "/services/alt-tooth.png", 
        desc: "A routine exam to check for cavities, gum issues, and overall oral health.",
        category: "general"
      },
      { 
        title: "Teeth Whitening", 
        icon: "/services/tooth-whitening.png", 
        defaultIcon: "/services/tooth-whitening.png", 
        activeIcon: "/services/alt-tooth-whitening.png", 
        desc: "A cosmetic procedure to brighten and whiten your teeth safely.",
        category: "cosmetic"
      },
      { 
        title: "Cavity Filling", 
        icon: "/services/dental-filling.png", 
        defaultIcon: "/services/dental-filling.png", 
        activeIcon: "/services/alt-dental-filling.png", 
        desc: "Treatment that restores a decayed tooth by filling the cavity with safe material.",
        category: "general"
      },
      { 
        title: "Emergency Dental Care", 
        icon: "/services/emergency.png", 
        defaultIcon: "/services/emergency.png", 
        activeIcon: "/services/alt-emergency.png", 
        desc: "Immediate care for dental pain, injury, or urgent tooth problems.",
        category: "general"
      },
      { 
        title: "Root Canal Therapy", 
        icon: "/services/root-canal.png", 
        defaultIcon: "/services/root-canal.png", 
        activeIcon: "/services/alt-root-canal.png", 
        desc: "A procedure to save a damaged tooth by removing infected pulp.",
        category: "surgical"
      },
      { 
        title: "Dental Crowns", 
        icon: "/services/dental-crown.png", 
        defaultIcon: "/services/dental-crown.png", 
        activeIcon: "/services/alt-dental-crown.png", 
        desc: "A protective cap placed over a tooth to restore its shape and strength.",
        category: "general"
      },
      { 
        title: "Wisdom Tooth Removal", 
        icon: "/services/dental.png", 
        defaultIcon: "/services/dental.png", 
        activeIcon: "/services/alt-dental.png", 
        desc: "Surgical removal of wisdom teeth that are impacted or causing pain.",
        category: "surgical"
      },
      { 
        title: "Tooth Extraction", 
        icon: "/services/tooth-extraction.png", 
        defaultIcon: "/services/tooth-extraction.png", 
        activeIcon: "/services/alt-tooth-extraction.png", 
        desc: "Complete removal of a tooth that is too damaged to be saved.",
        category: "surgical"
      },
      { 
        title: "Dental Implants", 
        icon: "/services/implant.png", 
        defaultIcon: "/services/implant.png", 
        activeIcon: "/services/alt-implant.png", 
        desc: "A permanent solution to replace missing teeth using a metal post and crown.",
        category: "surgical"
      },
      { 
        title: "Braces & Orthodontics", 
        icon: "/services/braces.png", 
        defaultIcon: "/services/braces.png", 
        activeIcon: "/services/alt-braces.png", 
        desc: "Treatments to straighten teeth and fix bite issues using braces or aligners.",
        category: "orthodontic"
      }, 
      { 
        title: "Dentures", 
        icon: "/services/dentures.png", 
        defaultIcon: "/services/dentures.png", 
        activeIcon: "/services/alt-dentures.png", 
        desc: "Removable replacements for missing teeth that restore your smile and chewing ability.",
        category: "general"
      }
    ]);

    return(
      <>
        <div className={`${styles.background}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="z-10 w-[100%] flex items-center justify-between pl-8 pr-12 lg:justify-center lg:gap-100 z-20">
          <Link href={"/"} className="flex items-center gap-2 mt-3">
            <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={100} height={100} className="cursor-pointer"/>
            <h1 className={`${soage.className} text-white lg:text-4xl text-2xl font-bold items-center flex flex-col mt-2 tracking-widest`}>
              Aurelia <span className="block -mt-1">Dental</span>
            </h1>
          </Link>
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-12 font-medium text-lg">
              <li><Link href="/" className="border-b border-white hover:text-[#E6C84F] hover:border-[#E6C84F] cursor-pointer">Home</Link></li>
              <li><Link href="/services" className="border-b border-white text-[#E6C84F] font-bold hover:border-[#E6C84F] cursor-pointer">Services</Link></li>
              <li><Link href="#" className="border-b border-white hover:text-[#E6C84F] hover:border-[#E6C84F] cursor-pointer">About</Link></li>
              <li><Link href="#" className="border-b border-white hover:text-[#E6C84F] hover:border-[#E6C84F] cursor-pointer">Help</Link></li>
              <li><Link href="#" className="border-b border-white hover:text-[#E6C84F] hover:border-[#E6C84F] cursor-pointer">Contact</Link></li>
              <button className="flex gap-1 items-center bg-[#032d68] text-white px-3 py-2 rounded-lg hover:scale-105 cursor-pointer">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-white transition-all duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
      <nav className={`fixed right-0 top-0 w-80 h-full bg-gradient-to-br from-white to-gray-50 z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Close Button */}
        <div className="flex justify-end p-6">
          <button 
            onClick={toggleMenu}
            className="p-2 text-[#D4A017] hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Menu Items */}
        <div className="px-8 py-4">
          <ul className="space-y-2">
            <ul className="space-y-2">
            {navItems.map((link) => (
              <li key={link.id}>
                <a 
                  href={link.href}
                  className={`block text-xl py-3 px-4 rounded-lg transition-all ${
                    activeMobileLink === link.id
                      ? 'text-[#3c5b64] font-bold bg-[#237d75]/10 border-l-4 border-[#3c5b64]' 
                      : 'text-gray-700 font-medium hover:bg-gray-100 hover:text-[#3c5b64] border-l-4 border-transparent'
                  }`}
                  onClick={() => handleMobileLinkClick(link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          </ul>
          
          {/* CTA Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <button 
              className="flex gap-3 items-center justify-center bg-gradient-to-r from-[#237d75] to-[#1a5d58] text-white text-lg font-semibold px-2 py-4 rounded-xl w-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              onClick={closeMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
              Schedule Appointment
            </button>
          </div>

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

        <div className={`lg:w-[95%] lg:mx-auto lg:pt-46 mt-12 pb-24 relative`}>
            <h1 className={`${noticia_regular.className} text-4xl text-white font-bold px-6 tracking-widest`}>What We Offer</h1>
            <p className={`${schibsted_grotesk.className} text-lg text-white mt-6 lg:w-[52ch] mx-auto px-4`}>Dental Tooth offers a wide range of treatments, all under one roof.</p>
        </div>
        <div id="general" className={`bg-[#eef3f9] lg:w-[95%] lg:mx-auto flex flex-col`}>
            <div className="flex flex-col lg:flex-row justify-around items-center py-6">
                <div className="flex flex-col gap-4 p-6">
                    <h2 className={`${noticia_regular.className} text-4xl font-bold pb-2 border-b-2 border-[#35565f]`}>General Services</h2>
                    <p className={`${schibsted_grotesk.className} text-lg  lg:w-[52ch]`}>Our general dental services provide comprehensive care for your everyday dental needs.</p>
                </div>
                <div className={`${styles.corner_accent} my-8 lg:mt-0 p-2`}>
                    <Image src={"/pexels-pixabay-52527.jpg"} alt="Dental Work" width={300} height={140} className="rounded-lg lg:w-[500]"></Image>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                {services
                  .filter(service => service.category === "general")
                  .map((service, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 flex flex-col">
                      <h3 className={`${schibsted_grotesk.className} font-bold text-lg mb-2`}>
                        {service.title}
                      </h3>
                      <p className={`${schibsted_grotesk.className} mb-4 text-gray-700`}>
                        {service.desc}
                      </p>
                      <Link href="#" className="flex gap-2 items-center text-[#032d68] font-medium">
                        Book this Service
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                ))}
            </div>

            <div id="cosmetic" className="flex flex-col lg:flex-row justify-around items-center py-6">
                <div className="flex flex-col gap-4 p-6">
                    <h2 className={`${noticia_regular.className} text-4xl font-bold pb-2 border-b-2 border-[#1b75bc]`}>Cosmetic Services</h2>
                    <p className={`${schibsted_grotesk.className} text-lg lg:w-[52ch]`}>Our general dental services provide comprehensive care for your everyday dental needs.</p>
                </div>
                <div className={`${styles.corner_accent} my-8 lg:mt-0 p-2`}>
                    <Image src={"/pexels-shvetsa-3845653.jpg"} alt="Dental Work" width={300} height={140} className="rounded-lg lg:w-[500]"></Image>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                {services
                  .filter(service => service.category === "cosmetic")
                  .map((service, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 flex flex-col">
                      <h3 className={`${schibsted_grotesk.className} font-bold text-lg mb-2`}>
                        {service.title}
                      </h3>
                      <p className={`${schibsted_grotesk.className} mb-4 text-gray-700`}>
                        {service.desc}
                      </p>
                      <Link href="#" className="flex gap-2 items-center text-[#032d68] font-medium">
                        Book this Service
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                ))}
            </div>

            <div id="surgical" className="flex flex-col lg:flex-row justify-around items-center py-6">
                <div className="flex flex-col gap-4 p-6">
                    <h2 className={`${noticia_regular.className} text-4xl font-bold pb-2 border-b-2 border-[#1b75bc]`}>Surgical Services</h2>
                    <p className={`${schibsted_grotesk.className} text-lg lg:w-[52ch]`}>Expert surgical care for more complex dental needs and procedures.</p>
                </div>
                <div className={`${styles.corner_accent} my-8 lg:mt-0 p-2`}>
                    <Image src={"/pexels-polina-zimmerman-4687360.jpg"} alt="Dental Work" width={300} height={140} className="rounded-lg lg:w-[500]"></Image>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                {services
                  .filter(service => service.category === "surgical")
                  .map((service, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 flex flex-col">
                      <h3 className={`${schibsted_grotesk.className} font-bold text-lg mb-2`}>
                        {service.title}
                      </h3>
                      <p className={`${schibsted_grotesk.className} mb-4 text-gray-700`}>
                        {service.desc}
                      </p>
                      <Link href="#" className="flex gap-2 items-center text-[#032d68] font-medium">
                        Book this Service
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                ))}
            </div>         

            <div id="surgical" className="flex flex-col lg:flex-row justify-around items-center py-6">
                <div className="flex flex-col gap-4 p-6 rounded-lg">
                    <h2 className={`${noticia_regular.className} text-4xl font-bold pb-2 border-b-2 border-[#1b75bc]`}>Orthodontic Services</h2>
                    <p className={`${schibsted_grotesk.className} text-lg lg:w-[52ch]`}>Expert surgical care for more complex dental needs and procedures.</p>
                </div>
                <div className={`${styles.corner_accent} my-8 lg:mt-0 p-2`}>
                    <Image src={"/pexels-diego-romero-471613950-19147369.jpg"} alt="Dental Work" width={300} height={140} className="rounded-lg lg:w-[500]"></Image>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 pb-12">
                {services
                  .filter(service => service.category === "orthodontic")
                  .map((service, index) => (
                    <div key={index} className="bg-white rounded-lg p-6 flex flex-col">
                      <h3 className={`${schibsted_grotesk.className} font-bold text-lg mb-2`}>
                        {service.title}
                      </h3>
                      <p className={`${schibsted_grotesk.className} mb-4 text-gray-700`}>
                        {service.desc}
                      </p>
                      <Link href="#" className="flex gap-2 items-center text-[#032d68] font-medium">
                        Book this Service
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </Link>
                    </div>
                ))}
            </div>
        </div>
        <div className={`${styles.secondary_container} lg:w-[95%] lg:mx-auto text-center p-8`}>
            <h1 className={`${noticia_regular.className} text-4xl text-white font-bold text-center`}>Ready to Schedule your Treatment?</h1>
            <p className={`${schibsted_grotesk.className} text-lg text-white my-6 text-center lg:w-[52ch] mx-auto`}>Book your appointment today or contact us for a free quote on your dental treatment.</p>
            <button className={`${encode_sans.className} rounded-lg px-8 py-3 bg-white text-[#032d68] text-2xl font-semibold hover:scale-105 cursor-pointer`}>Book Now</button>
        </div>
        <div className="bg-[#011B3E] p-8 lg:p-12">
            <p className={`${schibsted_grotesk.className} text-[#D1D5DB]`}>Experience premium dental care in a comfortable, state-of-the-art environment. Your perfect smile begins here.</p>
            <div className="flex flex-col lg:flex-row lg:justify-between">
                <div className="mt-12">
                    <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b-2 border-[#FFD700] w-fit pb-1 mb-6`}>Contact Us</h5>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p className="text-[#D1D5DB] -mt-1">Suite 5, 2nd Floor  <br></br>
                          Kingston Business Centre <br></br>
                          14 Hope Road, Kingston 10, Jamaica
                        </p>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:text-[#A7C4DF]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <a href="#" className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">+1 876 999 9999</a>
                    </div>
                    <div className="flex gap-6 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-[#D1D5DB] group-hover:text-[#A7C4DF]">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                        <a href="#" className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">dentaltooth@gmail.com</a>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b-2 border-[#FFD700] w-fit pb-1 mb-4`}>Opening Hours</h5>
                <div className="flex flex-col gap-6">
                    <div className="flex border-b border-b-gray-100 pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <div className="text-[#D1D5DB] flex gap-12">
                          <p>Monday - Friday</p>
                          <p>9:00am - 5:00pm</p>
                        </div>
                    </div>
                    <div className="flex border-b border-b-gray-100 pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <div className="text-[#D1D5DB] flex gap-42">
                          <p>Saturday</p>
                          <p>Closed</p>
                        </div>
                    </div>
                    <div className="flex border-b border-b-gray-100 pb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <div className="text-[#D1D5DB] flex gap-45">
                          <p>Sunday</p>
                          <p>Closed</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b-2 border-[#FFD700] w-fit pb-1 mb-4`}>Quick Links</h5>
                    <div className="flex flex-col gap-3">
                      <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Home</p>
                      </div>
                      <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">About Us</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Services</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Contact Us</p>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b-2 border-[#FFD700] w-fit pb-1 mb-4`}>Our Services</h5>
                <div className="flex flex-col gap-3 text-[#D1D5DB]">
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">General Dentistry</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Surgical Services</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Orthodontics</p>
                    </div>
                    <div className="flex gap-1 items-center group cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3 text-[#D1D5DB] transition-transform duration-200 ease-in-out group-hover:translate-x-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        <p className="text-[#D1D5DB] group-hover:text-[#A7C4DF]">Cosmetic Dentistry</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-center border-t border-[#D1D5DB] mt-12">
            <Image src={"/alt-demo-logo.png"} alt={"Alternative Logo"} width={110} height={110}></Image>
            <p className="text-[#D1D5DB] -mt-4">&copy; 2025 Dental Tooth Clinic. All rights reserved.</p>
            <button className="p-2 rounded-full bg-[#032d68] mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
                </svg>
            </button>
            <p className="text-sm text-[#D1D5DB]">Powered by <span className="underline">Omni-Ray Software Solutions</span></p>
        </div>
    </div>
    </>
    )
}