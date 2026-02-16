'use client';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import type { NavItem } from './MobileMenu';

interface MobileMenuClientProps {
  navItems: NavItem[];
}

export default function MobileMenuClient({ navItems }: MobileMenuClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileLink, setActiveMobileLink] = useState(navItems[0]?.id || '');

  const handleMobileLinkClick = (id: string) => {
    setActiveMobileLink(id);
    setIsOpen(false); // close menu on link click
  };

  return (
    <MobileMenu
      isOpen={isOpen}
      navItems={navItems}
      activeMobileLink={activeMobileLink}
      onClose={() => setIsOpen(false)}
      onLinkClick={handleMobileLinkClick}
    />
  );
}
