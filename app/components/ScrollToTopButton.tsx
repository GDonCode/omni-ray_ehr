// components/ScrollToTopButton.tsx
'use client'

import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      onClick={scrollToTop}
      className="p-2 rounded-full bg-[#35565f] my-4 hover:scale-105 transition-all duration-200 cursor-pointer"
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-6 text-[#eef3f9]" strokeWidth={1.5} />
    </button>
  );
}