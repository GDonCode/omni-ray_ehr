import styles from "./contact.module.css";
import "../globals.css";
import localFont from "next/font/local";

import Header from '../components/Header';
import MobileMenuClient from '../components/MobileMenuClient';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import ContactForm from '../components/Contact/ContactForm';

const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons = localFont ({
  src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})

export default function About() { 

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <div className={`${styles.background}`}>
      </div>
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileMenuClient navItems={navItems} />

      <PageTitle
        title="Contact Us"
        subtitle="We’re here to help — reach out and we’ll get back to you as soon as possible."
        titleFont={tt_wellingtons_demi.className}
        bodyFont={tt_wellingtons.className}
      />
      
      <ContactForm titleFont={tt_wellingtons_demi.className} />

      <Footer
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </>
  )
}