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
      className="p-2 rounded-full bg-[#eef3f9] my-4 hover:bg-[#d9e4f0] transition-colors"
      aria-label="Scroll to top"
    >
      <ChevronUp className="size-6 text-[#35565f]" strokeWidth={1.5} />
    </button>
  );
}