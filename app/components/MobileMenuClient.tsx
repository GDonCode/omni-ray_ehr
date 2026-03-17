'use client';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import type { NavItem } from './MobileMenu';

interface MobileMenuClientProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenuClient({ navItems, isOpen, onClose }: MobileMenuClientProps) {
  const pathname = usePathname();

  // Determine active link based on current pathname (same logic as Header)
  const activeMobileLink = pathname === '/'
    ? 'home'
    : pathname?.split('/')[1] || 'home';

  const handleMobileLinkClick = () => {
    onClose(); // Close menu when a link is clicked
  };

  return (
    <MobileMenu
      isOpen={isOpen}
      navItems={navItems}
      activeMobileLink={activeMobileLink}
      onClose={onClose}
      onLinkClick={handleMobileLinkClick}
    />
  );
}