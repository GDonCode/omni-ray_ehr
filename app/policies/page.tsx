import Image from "next/image";
import styles from "./policies.module.css"; // Import the CSS module
import "../globals.css";
import localFont from "next/font/local";

import HeaderWrapper from '../components/HeaderWrapper';
import MobileMenuClient from '../components/MobileMenuClient';
import Footer from '../components/Footer';


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

export default function Policies() {

  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  return (
  <div className="bg-[#F7FBFC]">
    <div className={`${styles.background}`}>
    </div>

    {/* Floating Whatsapp Icon */}
    <a href="https://wa.link/2cyzq4" className="fixed bottom-5 right-4 z-40 rounded-full p-2 bg-[#3FC050]" aria-label="Chat with us on WhatsApp">
      <Image src={"/icons8-whatsapp.svg"} alt="Whatsapp Logo" width={34} height={34} className=""></Image>
    </a>
    <header role="banner">
      <HeaderWrapper
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
          </header>
    <main role="main" id="main-content" className="w-[90%] mx-auto py-16 space-y-20 bg-[#F7FBFC]">
        {/* TERMS & CONDITIONS */}
        <section id="terms" className="space-y-6 relative mt-36">
            <h1 className={`${inter_heading.className} text-4xl text-[#181818]`}>
            Terms & Conditions
            </h1>

            <div className={`${tt_wellingtons.className} text-lg text-[#333] space-y-6 leading-relaxed`}>
            
            <p>
                By submitting an appointment request through this website, you agree to the following terms and conditions.
            </p>

            <div>
                <h2 className="text-2xl font-semibold mb-2">1. Appointment Requests</h2>
                <p>
                Submitting this form does not guarantee an appointment. A member of our team will contact you to confirm availability and finalize scheduling.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">2. Cancellations & No-Shows</h2>
                <p>
                We kindly request at least 24 hours’ notice for cancellations. Missed appointments or late cancellations may be subject to a fee at the discretion of the practice.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">3. Emergency Disclaimer</h2>
                <p>
                This online form is not monitored for dental emergencies. If you are experiencing severe pain, swelling, bleeding, or trauma, please contact our office immediately by phone.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">4. Accuracy of Information</h2>
                <p>
                You agree to provide accurate and complete information when submitting any form on this website.
                </p>
            </div>

            </div>
        </section>

        {/* PRIVACY POLICY */}
        <section id="privacy" className="space-y-6 border-t pt-16 relative ">
            <h1 className={`${inter_heading.className} text-4xl text-[#181818]`}>
            Privacy Policy
            </h1>

            <div className={`${tt_wellingtons.className} text-lg text-[#333] space-y-6 leading-relaxed`}>

            <p>
                We are committed to protecting your privacy and safeguarding your personal information.
            </p>

            <div>
                <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
                <p>
                When you submit an appointment request, we may collect your name, email address, phone number, preferred appointment time, and any additional information you provide.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
                <p>
                Your information is used solely to contact you, schedule appointments, and provide dental services. We do not sell or share your personal information for marketing purposes.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
                <p>
                We implement reasonable administrative and technical safeguards to protect your information from unauthorized access, disclosure, or misuse.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">4. Third-Party Services</h2>
                <p>
                We may use trusted third-party providers for website hosting or communication services. These providers are obligated to protect your information.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
                <p>
                You may request access to, correction of, or deletion of your personal information by contacting our office directly.
                </p>
            </div>

            </div>
        </section>
    </main>



    <Footer
      tt_wellingtons={tt_wellingtons}
      inter_heading={inter_heading}
    />
  </div>
  );
}
