'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import MobileMenuClient from './MobileMenuClient';
import type { NavItem } from './MobileMenu';

interface HeaderWrapperProps {
  navItems: NavItem[];
  inter_heading: { className: string };
  tt_wellingtons_demi: { className: string };
  levenim: { className: string };
}

export default function HeaderWrapper({
  navItems,
  inter_heading,
  tt_wellingtons_demi,
  levenim
}: HeaderWrapperProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <MobileMenuClient
        navItems={navItems}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}