'use client'

import Image from "next/image";
import Link from "next/link";
import styles from "./home.module.css"; // Import the CSS module
import "./globals.css";
import "@radix-ui/themes/styles.css";
import localFont from "next/font/local";
import { useState } from "react";
import dynamic from "next/dynamic";
import { CSSProperties } from 'react';

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { ComponentProps } from "react";

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  currentSlide?: number;
  slideCount?: number;
}

const noticia_regular = localFont({
  src: "./fonts/Noticia_Text/NoticiaText-Regular.ttf"
});
const schibsted_grotesk = localFont({
  src: "./fonts/Schibsted_Grotesk/SchibstedGrotesk-VariableFont_wght.ttf"
})
const encode_sans = localFont ({
  src: "./fonts/Encode_Sans/EncodeSans-VariableFont_wdth,wght.ttf"
})
export default function Home() {
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
      <span style={{ color: "#000000", fontSize: "25px" }}>➤</span>
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
      <span style={{ color: "#000000", fontSize: "25px", transform: "rotate(180deg)"  }}>➤</span>
    </div>
    );
  }

  const settings = {
    dots: true,
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

  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const navItems = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '#' },
    { id: 'help', label: 'Help', href: '#' },
    { id: 'contact', label: 'Contact', href: '#' }
  ];
  return (
    <div className={`${styles.primary_container} relative bg-[#043570]`}>

      {/* Floating Whatsapp Icon */}
      <a href="#" className="absolute fixed bottom-10 right-4 z-100 rounded-full p-2 bg-[#3FC050]">
        <Image src={"/icons8-whatsapp.svg"} alt="Whatsapp Logo" width={36} height={36} className=""></Image>
      </a>

      {/* Header */}
      <div className={` w-[100%] flex items-center justify-between pl-8 pr-12 lg:justify-center lg:gap-100 z-20`} >
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

      {/* Mobile Nav */}
      <nav className={`fixed left-0 top-22 w-full bg-white px-6 py-4 overflow-hidden z-40 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <ul className="space-y-8 text-lg font-medium">
            <li><a href="#" className="block text-[#1b75bc] font-bold">Home</a></li>
            <li><Link href="/services" className="block">Services</Link></li>
            <li><a href="#" className="block">About</a></li>
            <li><a href="#" className="block">Help</a></li>
            <li><a href="#" className="block">Contact</a></li>
            <button className={`${encode_sans.className} flex gap-4 items-center bg-[#032d68] text-white border-2 border-[#032d68] text-lg font-semibold px-12 py-3 rounded-lg w-full`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              Schedule Appointment
            </button>
          </ul>
      </nav>

      
      {/* Primary Container */}
      <div className={`${styles.primary_container} lg:w-[95%] lg:mx-auto`}>
        <div className="w-[90%] mx-auto pt-32 lg:pt-38 py-8 pb-16 flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="lg:w-[50%]">
            <span className="text-[#D1E2F0] text-sm">Premium Dental Care</span>
            <h1 className={`${noticia_regular.className} text-4xl text-white font-bold`}>Your smile,<br/>Our priority.</h1>
            <h2 className={`${schibsted_grotesk.className} text-lg text-white mt-6`}>
              Whether you&apos;re here for a routine checkup or a complete smile makeover, our experienced team is dedicated to giving you the care you deserve — in a space that feels like home.
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-4 mt-10">
              <Link href="/appointment" className="w-full">
                <button className={`${encode_sans.className} bg-white text-[#032d68] border-2 border-[white] py-4 rounded-lg text-xl font-semibold w-full hover:scale-105 cursor-pointer`}>
                  Book an Appointment
                </button>
              </Link>
               <Link href="/services" className="w-full">
                <button className={`${encode_sans.className} bg-transparent text-white border-2 border-[white] text-xl px-6 py-4 rounded-lg w-full hover:scale-105 cursor-pointer`}>
                  Explore Services
                </button>
              </Link>
            </div>
          </div>
          <div className={`${styles.corner_accent} mt-16 lg:mt-0 p-2`}>
            <Image src={"/pexels-shvetsa-3845624.jpg"} alt="Dental Work" width={400} height={140} className="mx-auto rounded-lg lg:w-[500]"></Image>
          </div>
        </div>
      </div>
      <div className="bg-white lg:w-[95%] lg:mx-auto lg:my-13 mt-13 mb-0">
        <div className={`bg-white pb-14 lg:w-[95%] lg:mx-auto`}>
          <div className="text-center w-[90%] lg:w-[75%] mx-auto py-10">
            <p className={`${encode_sans.className} inline-block text-[#8A6B00] bg-[#FFF6CC] px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide`}>Why Choose Us</p>
            <h3 className={`${noticia_regular.className} text-2xl font-semibold`}>The Dental Tooth Difference</h3>
            <p className={`${schibsted_grotesk.className} text-lg mt-6`}>We deliver exceptional care through our commitment to excellence, advanced technology, and patient-centered approach.</p>
          </div>
          <div className="flex flex-col lg:flex-row lg:px-12 lg:py-4 gap-10 bg-white">
            <div className="bg-[#eef3f9] rounded-lg text-center w-[90%] mx-auto p-8 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#e6eef8]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mb-4 text-[#043570]">
                <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
              </svg>
              <h4 className={`${noticia_regular.className} text-xl font-semibold mb-3`}>Expert Dentists</h4>
              <p className={`${schibsted_grotesk.className}`}>Our skilled professionals bring years of experience and advanced training to every appointment, ensuring you receive the highest standard of care.</p>
            </div>

            <div className="bg-[#eef3f9] rounded-lg text-center w-[90%] mx-auto p-6 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#e6eef8]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mb-4 text-[#043570]">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
              </svg>
              <h4 className={`${noticia_regular.className} text-xl font-semibold mb-3`}>Personalised Experience</h4>
              <p className={`${schibsted_grotesk.className}`}>We take the time to understand your needs and concerns, creating a custom treatment plan that fits your lifestyle and goals.</p>
            </div>

            <div className="bg-[#eef3f9] rounded-lg text-center w-[90%] mx-auto p-6 flex flex-col items-center shadow-md hover:shadow-lg border-2 border-[#e6eef8]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mb-4 text-[#043570]">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
              </svg>
              <h4 className={`${noticia_regular.className} text-xl font-semibold mb-3`}>Cutting-Edge Technology</h4>
              <p className={`${schibsted_grotesk.className}`}>From digital X-rays to pain-free laser treatments, we invest in the latest dental technology to make your visits faster, safer, and more comfortable.</p>
            </div>
          </div>
        </div>
        <div className={`bg-[#eef3f9] lg:w-[95%] lg:mx-auto my-4 border-y border-[#e6eef8]`}>
          <div className="w-[90%] mx-auto px-6 py-12 flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div className="lg:w-[50%]">
              <span className={`${encode_sans.className} inline-block text-[#8A6B00] bg-[#FFF6CC] px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide`}>Book Now</span>
              <p className={`${noticia_regular.className} text-4xl font-bold mb-6`}>Ready to Transform Your Smile?</p>
              <p className={`${schibsted_grotesk.className} mb-10 text-lg`}>Schedule your consultation today and take the first step towards a healthier, more beautiful smile.</p>
            </div>
            <button className={`${encode_sans.className} bg-[#032d68] text-white px-14 py-5 lg:py-4 rounded-lg text-2xl font-medium w-full lg:w-[35%] lg:h-fit hover:scale-105 cursor-pointer`}>Book Your Appointment</button>
          </div>
        </div>
        <div className={`bg-white lg:w-[95%] lg:mx-auto`}>
          <div className="flex flex-col items-center py-8">
            <Image src={"/icons8-google.svg"} alt="Google Icon" width={24} height={24}></Image>
            <p className={`${encode_sans.className} inline-block text-[#8A6B00] bg-[#FFF6CC] px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide my-1`}>User Reviews</p>
            <h3 className={`${noticia_regular.className} text-2xl font-semibold`}>What our Patients Say</h3>
          </div>
          <div className="w-[75%] mx-auto pb-16">
            <div>
              <Slider {...settings}>
                {review_data.map((r, i) => {
                  return (
                    <div key={i} className="lg:px-4">
                      <div className="rounded-lg bg-[#eef3f9] p-4 h-[20rem]">
                        <div className="flex gap-2 mb-4">
                          <Image src={r.img} alt="" width={48} height={48} className="rounded-full"></Image>
                          <div className="flex flex-col">
                            <p className={`${schibsted_grotesk.className} font-semibold`}>{r.name}</p>
                            <p>{r.date}</p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <p className={`${schibsted_grotesk.className}`}>{r.review}</p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p className={`${encode_sans.className} text-sm text-gray-500`}>Verified Patient</p>
                          <Image src={'/google-logo-removebg-preview.png'} alt="Google Logo" width={80} height={80}></Image>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* FOOTER */}
      <div className="bg-[#011B3E] p-8 lg:p-12">
        <p className={`${schibsted_grotesk.className} text-[#D1D5DB]`}>Experience premium dental care in a comfortable, state-of-the-art environment. Your perfect smile begins here.</p>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="mt-12">
            <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-6`}>Contact Us</h5>
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
            <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Opening Hours</h5>
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
            <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Quick Links</h5>
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
            <h5 className={`${noticia_regular.className} text-white text-xl font-semibold border-b border-[#FFD700] w-fit pb-1 mb-4`}>Our Services</h5>
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
          <button className="p-2 rounded-full bg-[#eef3f9] my-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#011B3E" className="size-6 text-[#011B3E]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
            </svg>
          </button>
          <p className="text-sm text-[#D1D5DB] -mb-4">Powered by <span className="underline">Omni-Ray Software Solutions</span></p>
        </div>
      </div>
      {/* FOOTER */}
    </div>
  );
}

const review_data = [
  {
    name: 'Sarah L.',
    img: 'https://ui-avatars.com/api/?name=Sarah+Lee&background=1b75bc&color=fff',
    review: 'The staff made me feel so comfortable from the moment I walked in. Dr. Lewis explained everything clearly, and the procedure was completely pain-free. I’ve never felt so at ease at a dentist office before!',
    date: '2 months ago'
  }, 
  {
    name: 'David R.',
    img: 'https://ui-avatars.com/api/?name=David+Reed&background=1b75bc&color=fff',
    review: 'Hands down the best dental experience I’ve ever had. The office is clean, modern, and the technology they use is impressive. You can tell they truly care about their patients.',
    date: 'a year ago'
  }, 
  {
    name: 'Michelle K.',
    img: 'https://ui-avatars.com/api/?name=Michelle+Keegan&background=1b75bc&color=fff',
    review: 'I came in nervous about getting a root canal, but the team was incredible. They walked me through the process, answered all my questions, and made sure I was comfortable the entire time. Thank you!',
    date: 'a week ago'
  }, 
  {
    name: 'Jason M.',
    img: 'https://ui-avatars.com/api/?name=Jason+Mamoa&background=1b75bc&color=fff',
    review: 'Professional, friendly, and efficient. I barely had to wait, and the hygienist did a great job with my cleaning. Highly recommend for anyone looking for a new dentist!',
    date: '3 months ago'
  }, 
  {
    name: 'Alisha B.',
    img: 'https://ui-avatars.com/api/?name=Alisha+Barnes&background=1b75bc&color=fff',
    review: 'This place goes above and beyond. From the personalized treatment plan to the relaxing environment, I felt truly cared for. I even got a follow-up call the next day to check on me—amazing service!',
    date: '1 month ago'
  }
]