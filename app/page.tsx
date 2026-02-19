import Image from "next/image";
import styles from "./home.module.css"; // Import the CSS module
import "./globals.css";
import localFont from "next/font/local";

import Header from './components/Header';
import MobileMenuClient from './components/MobileMenuClient';
import HomeHero from './components/Home/HomeHero';
import Footer from './components/Footer';
import WhyChooseUs from './components/Home/WhyChooseUs';
import CallToAction from './components/Home/CallToAction';
import PatientReviews from './components/Home/PatientReviews';

const levenim = localFont ({
  src: "./fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "./fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const inter_heading = localFont ({
  src: "./fonts/Inter/Inter-Medium.otf"
})
const tt_wellingtons_demi = localFont ({
  src: "./fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf"
})
const tt_wellingtons = localFont ({
  src: "./fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf"
})

export default function Home() {

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  const images = [
    "/header.png",
    "/header-2.png",
    "/header-3.png",
  ];

  
  const reviewData = [
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

  return (
  <>
    <div className={`${styles.background}`}>
    </div>

    {/* Floating Whatsapp Icon */}
    <a href="https://wa.link/2cyzq4" className="fixed bottom-5 right-4 z-40 rounded-full p-2 bg-[#3FC050]" aria-label="Chat with us on WhatsApp">
      <Image src={"/icons8-whatsapp.svg"} alt="Whatsapp Logo" width={34} height={34} className=""></Image>
    </a>
    <header role="banner">
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileMenuClient navItems={navItems} />
    </header>
    <main role="main" id="main-content">
      <HomeHero
        tt_wellingtons_demi={tt_wellingtons_demi}
        tt_wellingtons={tt_wellingtons}
        cinzel={cinzel}
        inter_heading={inter_heading}
        styles={styles}
        images={images}
      />
      
      <section className="bg-[#EAF3F7] lg:-mb-12 lg:pb-8 -mt-8 lg:-mt-0">
        <div className="relative lg:w-full lg:mx-auto lg:my-13 shadow-b-xl">
          <WhyChooseUs
            inter_heading={inter_heading}
            tt_wellingtons_demi={tt_wellingtons_demi}
            tt_wellingtons={tt_wellingtons}
          />
          <CallToAction
            inter_heading={inter_heading}
            tt_wellingtons_demi={tt_wellingtons_demi}
            tt_wellingtons={tt_wellingtons}
            styles={styles} // Optional
          />
          <PatientReviews
            inter_heading={inter_heading}
            tt_wellingtons_demi={tt_wellingtons_demi}
            tt_wellingtons={tt_wellingtons}
            cinzel={cinzel}
            levenim={levenim}
            reviews={reviewData}
          />
        </div>
      </section>
    </main>

    <Footer
      tt_wellingtons={tt_wellingtons}
      inter_heading={inter_heading}
    />
  </>
  );
}
