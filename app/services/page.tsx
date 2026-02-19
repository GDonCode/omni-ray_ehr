import styles from "./services.module.css";
import localFont from "next/font/local";

import Header from '../components/Header';
import MobileMenuClient from '../components/MobileMenuClient';
import Footer from '../components/Footer';

import ServicesHero from '../components/Services/ServicesHero';
import ServiceMainWrapper from '../components/Services/ServiceMainWrapper';


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
 const fontClasses = {
    tt_wellingtons_demi: tt_wellingtons_demi.className,
    tt_wellingtons: tt_wellingtons.className,
    inter: inter_heading.className,
  };

export default function Services(){ 

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '#' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];


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

  return(
    <>
      <div className={`${styles.background}`}>
      </div>
      <header>
        <Header
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          levenim={levenim}
        />
      
        <MobileMenuClient navItems={navItems} />
      </header>
      <main>
        <ServicesHero
          titleFont={tt_wellingtons_demi.className}
          bodyFont={`${tt_wellingtons.className}`}
        />

        <div className="bg-[#EAF3F7] mx-auto p-6 lg:p-8 relative backdrop-blur-md shadow-lg z-10 lg:-mb-12">
          <ServiceMainWrapper
            preventiveServices={servicesByCategory.preventive}
            restorativeServices={servicesByCategory.restorative}
            cosmeticServices={servicesByCategory.cosmetic}
            fontClasses={fontClasses}
          />
        </div>
      </main>
      
      <Footer
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </>
  )
}