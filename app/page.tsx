'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css"; // Import the CSS module
import "./globals.css";
import "@radix-ui/themes/styles.css";
import localFont from "next/font/local";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CSSProperties } from 'react';

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  currentSlide?: number;
  slideCount?: number;
}

const levenim = localFont ({
  src: "./fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "./fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const open_sans = localFont ({
  src: "./fonts/OpenSans/OpenSans-SemiBold.ttf"
})
const inter_heading = localFont ({
  src: "./fonts/Inter/Inter-Medium.otf"
})
const inter = localFont ({
  src: "./fonts/Inter/Inter-Regular.otf"
})

export default function Home() {
  
  // Slider Settings
  function NextArrow({ className, style, onClick }: ArrowProps) {
    return (
      <div
      className={className}
      style={{
        ...style,
        display: "flex",
        right: "-40px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
    >
      <span style={{ color: "#ffffff", fontSize: "25px" }}>➤</span>
    </div>
    );
  }
  function PrevArrow({ className, style, onClick }: ArrowProps) {
    return (
      <div
      className={className}
      style={{
        ...style,
        display: "flex",
        left: "-40px",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        borderRadius: "50%",
        width: "30px",
        height: "30px",
      }}
      onClick={onClick}
    >
      <span style={{ color: "#ffffff", fontSize: "25px", transform: "rotate(180deg)"  }}>➤</span>
    </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // screen width below 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const [activeItem, setActiveItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];


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

  const images = [
    "/header-photo-2.png",
    "/header-photo-3.jpg",
    "/header-photo-4.jpg"
  ];

const [currentIndex, setCurrentIndex] = useState(0);
const [fade, setFade] = useState(true);
const [isHydrated, setIsHydrated] = useState(false);

useEffect(() => {
  setIsHydrated(true); // Mark as hydrated
}, []);

useEffect(() => {
  if (!isHydrated) return; // Don't start interval until hydrated
  
  const interval = setInterval(() => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(true);
    }, 500);
  }, 4000);
  
  return () => clearInterval(interval);
}, [isHydrated, images.length]);


  return (
  <>
    <div className={`${styles.background}`}>
    </div>

    {/* Floating Whatsapp Icon */}
    <a href="https://wa.link/2cyzq4" className="fixed bottom-5 right-4 z-40 rounded-full p-2 bg-[#3FC050]">
      <Image src={"/icons8-whatsapp.svg"} alt="Whatsapp Logo" width={34} height={34} className=""></Image>
    </a>

    {/* Header */}
      <div className={`backdrop-blur-md shadow-lg z-20 py-2 fixed top-0 flex items-center justify-between px-4 w-full bg-[#036d6d]`}>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src={"/aurelia-dental_logo.png"} alt="Logo" width={75} height={75} className="cursor-pointer"/>
          <h1 className={`${levenim.className} text-white lg:text-4xl text-2xl font-bold items-center flex flex-col mt-2 tracking-widest`}>
            Aurelia <span className="block -mt-1 text-white">Dental</span>
          </h1>
        </Link>
        <nav className={`${inter.className} hidden lg:block`}>
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
          <button onClick={() => setIsOpen(prev => !prev)} className="block lg:hidden py-2 px-4 rounded-xs border-2 border-[#D9BE2E] bg-[#D9BE2E]">
            <span className={`${inter_heading.className} text-[#181818] font-extrabold tracking-widest`}>MENU</span>
          </button>
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
    
    {/* HERO SECTION */}
<section 
  className="relative mt-20 mb-12 py-4"
  style={{ background: 'linear-gradient(180deg, #036d6d 0%, #036d6d 50%, #EAF3F7 100%)' }}
>
  <div className="relative max-w-7xl mx-auto">
    <div className="relative flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12">
      <div className="lg:w-[60%] z-10">
        {/* YOUR SMILE Heading */}
        <h1 className="flex flex-col items-center mb-8">
          <span
            className={`${cinzel.className} text-[3.25rem] lg:text-6xl text-[#FAF9F6] font-bold`}
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.8)' }}
          >
            YOUR SMILE
          </span>
          <span className={`${inter_heading.className} text-2xl text-[#FAF9F6] font-semibold tracking-wider mt-1`}>
            is our priority.
          </span>
        </h1>

        <p className={`${inter.className} text-xl leading-relaxed text-[#faf9f6] mt-6`}>
          Whether you're here for a routine checkup or a complete smile makeover,
          our <span className="font-bold">experienced</span> team is
          dedicated to giving you the care you deserve — in a space that
          <span className="font-bold"> feels like home.</span>
        </p>
        <div className="flex flex-col lg:flex-row gap-4 mt-8">
          <Link 
            href="/appointment" 
            className={`${inter_heading.className} ${styles.animate_pulse_scale} bg-[#D9BE2E] text-[#181818] py-4 px-8 tracking-wide rounded-md text-2xl font-bold text-center hover:bg-[#E6C84F] transition-colors`}
          >
            BOOK APPOINTMENT
          </Link>
          <Link 
            href="/services" 
            className={`${inter.className} border-2 border-[#faf9f6] text-[#faf9f6] text-xl font-semibold px-8 py-4 rounded-md text-center hover:bg-[#036d6d]/10 transition-colors`}
          >
            Explore Services
          </Link>
        </div>
      </div>
      <div className="lg:w-[35%] mt-8 lg:mt-0">
        <div className="aspect-[4/3] relative bg-gray-100">
          <Image 
            src={images[currentIndex]} 
            loading="eager" 
            alt="Dental work documentation" 
            width={800}
            height={600}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}
          />
          {/* Swiss-style image label */}
          <div className="absolute bottom-0 left-0 bg-[#036d6d] px-4 py-2">
            <p className="text-xs uppercase tracking-wider text-white font-medium">
              Before / After
            </p>
          </div>
          {/* Gold accent line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-[#ffdf20]"></div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    <section>
      <div className="relative lg:w-[95%] lg:mx-auto lg:my-13 shadow-b-xl">
        <div className={`pb-14 mx-auto z-10 lg:w-[95%] mx-auto p-6`}>
          <div className="lg:w-[95%] w-full">
            <p className={`${open_sans.className} mx-auto w-fit text-[#8A6B00] bg-[#ffdf20] px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold tracking-wide`}>User Reviews</p>
            <h2 className={`${inter_heading.className} text-4xl font-bold text-center text-[#036d6d] tracking-wide`}>The Aurelia Dental Difference</h2>
            <p className={`${inter.className} text-xl text-[#181818] mt-6 leading-8 font-medium`}>We deliver exceptional care through our commitment to <span className="font-bold">excellence</span>, advanced <span className="font-bold">technology</span>, and <span className="font-bold">patient-centered</span> approach.</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:px-12 lg:py-4 gap-10 mt-10">
            <div className="bg-[#058080] rounded-md text-center mx-auto p-4 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#805D93]/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 mb-2 text-[#D9BE2E]">
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
              </svg>
              <h3 className={`${inter_heading.className} text-2xl font-medium text-[#FAF9F6] mb-5`}>Expert Dentists</h3>
              <p className={`${inter.className} text-[#FAF9F6] leading-8 text-[1.15rem]`}>Our <span className="font-semibold">skilled</span> professionals bring <span className="font-semibold">years of experience</span> and <span className="font-semibold">advanced training</span> to every appointment, ensuring you receive the <span className="font-semibold">highest standard</span> of care.</p>
            </div>

            <div className="bg-[#058080] rounded-md text-center mx-auto p-4 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#805D93]/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 mb-2 text-[#D9BE2E]">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
              <h3 className={`${inter_heading.className} text-2xl font-medium text-[#FAF9F6] mb-5`}>Personalised Experience</h3>
              <p className={`${inter.className} text-[#FAF9F6] leading-8 text-[1.15rem]`}>We take the time to <span className="font-semibold">understand your needs and concerns</span>, creating a custom treatment plan that fits your lifestyle and goals.</p>
            </div>

            <div className="bg-[#058080] rounded-md text-center mx-auto p-4 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#805D93]/40">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 mb-2 text-[#D9BE2E]">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
              </svg>
              <h3 className={`${inter_heading.className} text-2xl font-medium text-[#FAF9F6] mb-5`}>Cutting-Edge Technology</h3>
              <p className={`${inter.className} text-[#FAF9F6] leading-8 text-[1.15rem]`}>From digital X-rays to pain-free laser treatments, we invest in the <span className="font-semibold">latest dental technology</span> to make your visits <span className="font-semibold">faster, safer, and more comfortable</span>.</p>
            </div>
          </div>
        </div>
          <div className="w-[95%] mx-auto px-6 flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div className="lg:w-[50%]">
              <p className={`${inter_heading.className} text-4xl text-[#036d6d] font-bold mb-6`}>Ready to Transform Your Smile?</p>
              <p className={`${inter.className} leading-7.5 text-[1.2rem] text-[#181818] mb-8 text-left tracking-wide font-medium`}>Schedule your consultation <span className="font-bold">today</span> and take the <span className="font-bold">first step</span> towards a healthier, <span className="font-bold">more beautiful smile</span>.</p>
            </div>
            <Link
                  href="/appointment"
                  className={`${inter_heading.className} ${styles.animate_pulse_scale} bg-[#D9BE2E] text-[#181818] py-4 px-8 tracking-wide rounded-md text-2xl font-bold text-center`}
                >
                  BOOK APPOINTMENT
                </Link>
          </div>
        <div className={`w-full lg:w-[95%] mx-auto mt-16 p-4 bg-[#058080]`}>
          <div className="flex flex-col items-center pb-8 pt-6 ">
            <p className={`${open_sans.className} inline-block text-[#8A6B00] bg-[#ffdf20] px-2.5 py-0.5 mb-1 rounded-full text-xs font-semibold tracking-wide`}>User Reviews</p>
            <h3 className={`${inter_heading.className} tracking-wide text-3xl text-[#FAF9F6]`}>What our Patients Say</h3>
          </div>
          <div className="w-[85%] mx-auto pb-6">
            <div>
              {isClient && (
                <Slider {...settings}>
                {review_data.map((r, i) => {
                  return (
                    <div key={i} className="lg:px-4">
                      <div className="rounded-sm bg-[#eef3f9] p-4 lg:h-[20rem] h-[27rem] flex flex-col">
                        <div className="flex gap-2 mb-4">
                          <Image src={r.img} alt="Profile Photo" width={48} height={48} className="rounded-full"></Image>
                          <div className="flex flex-col">
                            <p className={`${inter_heading} font-bold`}>{r.name}</p>
                            <div className="text-[#FFD700] text-lg -mt-1">★★★★★</div>
                          </div>
                        </div>

                        <div>
                          <p className={`${inter.className}`}>{r.review}</p>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                          <a href={r.link} target="_blank" rel="noopener noreferrer">
                            <p className={`${levenim.className} text-sm text-gray-500`}>Verified Patient</p>
                          </a>
                          <a href={r.link} target="_blank" rel="noopener noreferrer">
                            <Image src={'/google-logo-removebg-preview.png'} alt="Google Logo" width={80} height={80}></Image>
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
              )}
              
            </div>
          </div>
          <div className="flex flex-col items-center mb-6">
            <span className={`${cinzel.className} text-[2.5rem] font-bold text-center text-gray-100`}><span className={`${cinzel.className} text-[2rem] font-bold text-center text-white`}>Over</span> 200,000</span>
            <span className={`${inter_heading.className} text-xl text-gray-100 -mt-2 font-semibold tracking-wider`}>patients served!</span>
          </div>
        </div>
      </div>
    </section>

    {/* FOOTER */}
                <div className="relative bg-[#004c4c] p-8 lg:p-12 border-t-4 border-[#004c4c] mt-12">
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <div className="">
                      <h5 className={`${inter.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-6`}>Contact Us</h5>
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
                      <h5 className={`${inter.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-6`}>Opening Hours</h5>
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
                      <h5 className={`${inter.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Quick Links</h5>
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
                      <h5 className={`${inter.className} text-gray-100 text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Our Services</h5>
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
  );
}

const review_data = [
  {
    name: 'Petrina Mayan Williams',
    img: '/PMW-review.png',
    review: '100% recommend Aurelia Dental! I had an absolutely amazing experience from start to finish. The front desk staff were friendly, and the dentists were professional and caring. I had two fillings done and it was completely painless. I’m so impressed with the level of care and attention to detail. No regrets at all - I’d go back in a heartbeat! Five stars isn’t enough, I’d give them ten stars if I could.',
    link: 'https://maps.app.goo.gl/Z8yksxTWdKxLQ5Wo8'
  },
  {
    name: 'Samantha Brown',
    img: '/SB-review.png',
    review: 'Very patient and professional dentist with affordable prices. Always on time for appointments and gives great care. The staff at the front desk are very friendly and greets you warmly everytime. Lots of parking on-site so no street parking. I highly recommend Aurelia Dental.',
    link: 'https://maps.app.goo.gl/rgFhPWfHKGG5vzio7'
  }, 
  {
    name: 'Kadain Popley',
    img: '/KP-review.png',
    review: 'The best dentists to ever do it. Did an operation and had treatment sessions at Aurelia Dental and they were remarkable. Very patient and handles any questions properly with confidence you may have. Thanks to the Aurelia Dental team!!! 100% recommended. Experts and outstanding services.',
    link: 'https://maps.app.goo.gl/MNvaywNtmFZijNAdA'
  }, 
  {
    name: 'Jodie Currie',
    img: '/JC-review.png',
    review: 'I recently brought my daughter here and was truly impressed. The staff were warm, friendly, and professional, instantly putting us at ease. The dentist took the time to explain everything clearly, making sure we understood each step. The office is spotless, beautifully maintained, and has such a welcoming atmosphere. As a parent, I couldn’t ask for a better experience for my child’s dental care.',
    link: 'https://maps.app.goo.gl/mW9cGu36gnTLFPYn7'
  }, 
  {
    name: 'Shericka James',
    img: '/SJ-review.png',
    review: 'I was really scared going to the dentist yesterday but I had a wonderful visit to Aurelia Dental and was really impressed with everyone and everything. The staff was warm and welcoming, and the environment was clean, modern, and calming. The doctor and assistant was gentle, professional, and took the time to explain everything she was doing, which really helped me feel at ease.',
    link: 'https://maps.app.goo.gl/bzi3ToHsxawAcchn9'
  }
]