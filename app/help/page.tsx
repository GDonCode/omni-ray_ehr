
import styles from "./help.module.css";
import Link from "next/link";
import "../globals.css";
import localFont from "next/font/local";

import Header from '../components/Header';
import MobileMenuClient from '../components/MobileMenuClient';
import Footer from '../components/Footer';
import PageTitle from "../components/PageTitle";
import FAQ, { type FAQItem } from "../components/Help/FAQ";

const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
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


export default function Help() {
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'About', href: '/about' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'payment', label: 'Payment' },
    { id: 'services', label: 'Services' }
  ];

  const faqData: Record<string, FAQItem[]> = {
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
  const tabsWithQuestions = tabs.map(tab => ({
    ...tab,
    questions: faqData[tab.id] || []
  }));


  return (
  <>
    <div className={`${styles.background}`}>
    </div>
    <header role="banner">
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileMenuClient navItems={navItems} />
    </header>

    <main role="main">
      <PageTitle
        title="Help & Support"
        subtitle="Find answers to your questions"
        titleFont={tt_wellingtons_demi.className}
        bodyFont={tt_wellingtons.className}
      />

      {/* FAQ Section */}
      <div className="w-full lg:w-[95%] mx-auto mt-8 mb-8 px-4 relative lg:flex lg:gap-12 lg:justify-around">
        <FAQ
          tabs={tabsWithQuestions}
          titleFont={tt_wellingtons_demi.className}
          bodyFont={tt_wellingtons.className}
        />

        <div className="mt-8 lg:mt-0">
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
        </div>
      </div>
    </main>

    <Footer
      tt_wellingtons={tt_wellingtons}
      inter_heading={inter_heading}
    />
  </>
  )
}