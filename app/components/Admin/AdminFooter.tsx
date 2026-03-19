// components/Footer.tsx
import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import ScrollToTopButton from '../ScrollToTopButton';

interface FooterProps {
  tt_wellingtons: { className: string };
  inter_heading: { className: string };
}

interface ContactItem {
  icon: React.ReactNode;
  content: React.ReactNode;
  href?: string;
}


const Footer: React.FC<FooterProps> = ({ tt_wellingtons, inter_heading }) => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer role="contentinfo" className="bg-[#004c4c] px-8 pb-8 pt-2 lg:px-10 lg:pt-3">
      {/* Bottom Section */}
      <div className="flex flex-col items-center">
        <Image 
          src="/aurelia-dental_logo.png" 
          alt="Aurelia Dental Logo" 
          width={60} 
          height={60} 
          loading="lazy"
        />
        <p className={`${inter_heading.className} text-white`}>
          &copy; 2026 Aurelia Dental. All rights reserved.
        </p>
        <p className={`${inter_heading.className} text-sm text-white -mb-4`}>
          Powered by <span className="underline">Omni-Ray Software Solutions</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;