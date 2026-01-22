'use client'

import styles from "./services.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import localFont from "next/font/local";

const noticia_regular = localFont({
  src: "../fonts/Noticia_Text/NoticiaText-Regular.ttf",
  display: 'swap',
  preload: true
});
const schibsted_grotesk = localFont({
  src: "../fonts/Schibsted_Grotesk/SchibstedGrotesk-VariableFont_wght.ttf",
  display: 'swap',
  preload: true
})
const soage = localFont ({
  src: "../fonts/Soage PersonalUseOnly/Soage PersonalUseOnly.ttf",
  display: 'swap',
  preload: true
})
const cinzel = localFont ({
  src: "../fonts/Cinzel/Cinzel-Regular.otf",
  display: 'swap',
  preload: true
})

export default function Services(){
  const [activeItem, setActiveItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '#' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

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
    const serviceItems = [
    { titleIcon: '/dental-hygiene.png',
      title: 'Dental Cleaning', 
      price: '10, 000',
      image: '/cleaning-vid.gif',
      description: 'Our <span class="font-semibold">professional</span> cleanings <span class="font-semibold">gently remove</span> plaque and tartar that daily brushing can’t reach, leaving your <span class="font-semibold">teeth polished</span> and your <span class="font-semibold">gums healthy</span>.'},
    
    { titleIcon: '/tooth-filling.png',
      title: 'Tooth Filling', 
      price: '10, 000',
      image: '/filling-vid.gif',
      description: 'We repair cavities discreetly with <span class="font-semibold">durable, tooth-colored</span> composite material that <span class="font-semibold">blends naturally</span> with your smile.' },
    
    { titleIcon: '/tooth-extraction.png',
      title: 'Tooth Extraction', 
      price: '10, 000',
      image: '/extraction-img.jpg',
      description: 'When a tooth cannot be saved, we perform <span class="font-semibold">gentle and careful</span> removal in a <span class="font-semibold">comfortable, caring</span> environment.' },

    { titleIcon: '/root-canal.png',
      title: 'Root Canal', 
      price: '10, 000',
      image: '/root-canal-vid.gif', 
      description: 'This procedure <span class="font-semibold">relieves pain</span> and saves a severely infected tooth by <span class="font-semibold">removing damaged tissue</span> and <span class="font-semibold">sealing it</span> from further issues.' },
      
    { titleIcon: '/wisdom-tooth.png',
      title: 'Wisdom Teeth', 
      price: '10, 000',
      image: '/wisdom-img.jpg',
      description: 'We <span class="font-semibold">safely extract</span> impacted or problematic wisdom teeth to <span class="font-semibold">prevent</span> pain, crowding, and future oral health complications.' },

    { titleIcon: '/smile.png',
      title: 'Veneers',  
      price: '10, 000',
      image: '/veneers-vid.gif',
      description: '<span class="font-semibold">Custom-crafted</span> porcelain veneers can <span class="font-semibold">transform your smile</span> — correcting chips, gaps, stains, or alignment in <span class="font-semibold">just a few visits</span>.' },

    { titleIcon: '/dental-bridge.png',
      title: 'Crowns & Bridges', 
      price: '10, 000',
      image: '/crowns-bridges-img.jpg', 
      description: 'Crowns <span class="font-semibold">protect and restore</span> damaged teeth, while bridges <span class="font-semibold">replace</span> one or more <span class="font-semibold">missing teeth</span> — both <span class="font-semibold">restoring function</span> and <span class="font-semibold">natural appearance.</span>' },

    { titleIcon: '/dental-implant.png',
      title: 'Dentures', 
      price: '10, 000',
      image: '/dentures-img.png', 
      description: 'We craft <span class="font-semibold">comfortable, natural-looking</span> full or partial dentures to <span class="font-semibold">replace missing teeth</span> and <span class="font-semibold">restore your ability</span> to eat, speak, and <span class="font-semibold">smile with confidence</span>.' },
    
    { titleIcon: '/whitening.png',
      title: 'Teeth Whitening', 
      price: '10, 000',
      image: '/whitening-vid.gif',
      description: '<span class="font-semibold">Brighten</span> your smile with <span class="font-semibold">safe, effective</span> whitening treatments.' },

    { titleIcon: '/x-ray.png',
      title: 'X-Rays & Imaging', 
      price: '10, 000',
      image: '/xray-vid.gif',
      description: 'Using <span class="font-semibold">low-radiation</span> digital imaging, we see <span class="font-semibold">beneath the surface</span> to <span class="font-semibold">accurately diagnose issues</span> not visible during a regular exam.' },
  ];

    return(
      <div>
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
        {/* Header */}
        <div className={`flex items-center lg:justify-between justify-between lg:px-8 px-4 pt-4 z-10 fixed top-0 w-full transition-all duration-300
          ${mounted && isScrolled ? 'bg-[#177A7A] py-2' : 'bg-transparent py-4'}`}>
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={95} height={95} className="cursor-pointer"/>
            <h1 className={`${soage.className} text-white lg:text-4xl text-[1.6rem] font-bold items-center flex flex-col mt-2 tracking-widest transition-all duration-300
            ${isScrolled ? 'text-[1.4rem] lg:text-3xl' : ''}`}>
              Aurelia <span className="block -mt-1">Dental</span>
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
          <div className="flex items-center gap-2 block lg:hidden">
            <button onClick={() => setIsOpen(prev => !prev)} className={`block lg:hidden py-2 px-4 border-2 border-white bg-gray-700/10 transition-all duration-300`}>
              <span className={`text-white font-bold tracking-widest transition-all duration-300`}>MENU</span>
            </button>
          </div>
          {/* Backdrop */}
          <div 
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMenu}
          />
        </div>
        {/* Mobile Nav */}
        <nav className={`fixed right-0 top-0 w-70 h-fit bg-gradient-to-br from-white to-gray-50 z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Close Button */}
          <div className="flex items-center block lg:hidden px-8 py-4">
            <button onClick={toggleMenu} className="ml-auto block lg:hidden py-2 px-4 border-3 border-[#008080]">
              <span className="text-[#008080] font-extrabold text-xl tracking-widest">X</span>
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="px-8 py-4">
            <ul className="space-y-4">
              {navItems.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.href}
                    className={`block py-3 px-4 rounded-lg transition-all ${
                      activeMobileLink === link.id
                        ? 'text-[#008080] font-bold text-[1.4rem] bg-[#237d75]/10 border-l-4 border-[#008080]' 
                        : 'text-gray-700 font-medium text-[1.3rem] bg-gray-100 lg:hover:bg-gray-100 hover:text-[#3c5b64] border-l-4 border-gray-200'
                    }`}
                    onClick={() => handleMobileLinkClick(link.id)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links (Optional) */}
            <div className="mt-8 flex justify-center gap-4">
              <a href="https://www.facebook.com/p/Aurelia-Dental-61559217540517/" target="_blank" className="p-2 text-gray-400 hover:text-[#1b75bc] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/aurelia_dental/?hl=en" target="_blank" className="p-2 text-gray-400 hover:text-[#1b75bc] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                </svg>
              </a>
            </div>
          </div>
        </nav>

        <div className={`lg:mx-auto w-[95%] mx-auto bg-white/20 rounded-lg backdrop-blur-sm border border-white/20 p-3 mt-32`}>
          <h2 className={`${cinzel.className} text-white lg:text-5xl text-[2rem] text-center font-black tracking-widest border-b border-white w-fit mx-auto`}>Our Services</h2>
          <div className="flex flex-col gap-8 mt-6">
            {serviceItems.map((item, index) => (
              <div key={index} className="flex flex-col rounded-lg overflow-hidden w-[90%] mx-auto border border-white/5 shadow-md hover:shadow-lg">
                {item.image && item.image !== '/' && (
                  <Image src={item.image} loading="eager" alt={`${item.title} Image`} width={0} height={0} sizes="100vw" className="w-full h-auto"/>
                )}
                <div className="bg-gray-700/20 border border-white/5 p-4 rounded-b-lg text-white w-full">
                  <h3 className={`${noticia_regular.className} text-yellow-300 flex items-center text-2xl font-semibold tracking-wide mb-1`}>
                    <Image src={item.titleIcon} alt={`${item.title} Icon`} width={30} height={30} className="inline-block mr-3 mb-1"/>
                    <span>{item.title}</span>
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-300 text-xl mr-2">From</span>
                    <Image src={`/dollar-sign.svg`} alt="Dollar Sign" width={25} height={25} className="inline-block"/>
                    <span className="text-yellow-300 text-2xl font-semibold">{item.price}</span>
                  </div>
                  <p className={`${schibsted_grotesk.className} text-lg`} dangerouslySetInnerHTML={{ __html: item.description }}></p>
                  <button className={`bg-[#ffdf20] rounded-lg w-full px-4 py-2 mx-auto mt-4 text-2xl text-gray-800 font-semibold tracking-wide`}>Book Now</button>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    )
}