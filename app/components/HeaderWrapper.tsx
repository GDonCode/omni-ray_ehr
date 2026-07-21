'use client';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';
import type { NavItem } from './Header';

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
  return (
    <>
      <Header
        navItems={navItems}
        inter_heading={inter_heading}
        tt_wellingtons_demi={tt_wellingtons_demi}
        levenim={levenim}
      />
      <MobileBottomNav
        navItems={navItems}
        tt_wellingtons_demi={tt_wellingtons_demi}
      />
    </>
  );
}