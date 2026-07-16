'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Stethoscope, CircleHelp, Phone, CalendarCheck } from 'lucide-react';
import type { NavItem } from './MobileMenu';

interface MobileBottomNavProps {
  navItems: NavItem[];
  tt_wellingtons_demi: { className: string };
}

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  services: Stethoscope,
  help: CircleHelp,
  contact: Phone,
  appointment: CalendarCheck,
};

export default function MobileBottomNav({ navItems, tt_wellingtons_demi }: MobileBottomNavProps) {
  const pathname = usePathname();
  const activeItem = pathname === '/' ? 'home' : pathname?.split('/')[1] || 'home';

  const homeItem = navItems.find((item) => item.id === 'home');
  const otherItems = navItems.filter((item) => item.id !== 'home');
  const midpoint = Math.ceil(otherItems.length / 2);

  const items: NavItem[] = [
    ...otherItems.slice(0, midpoint),
    ...(homeItem ? [homeItem] : []),
    ...otherItems.slice(midpoint),
    { id: 'appointment', href: '/appointment', label: 'Book' },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 w-full z-30 bg-white shadow-[0_-2px_12px_rgba(3,109,109,0.15)] flex items-center justify-around px-2 pt-2 pb-3"
      role="navigation"
    >
      {items.map((item) => {
        const Icon = iconMap[item.id] ?? Home;
        const isActive = activeItem === item.id;

        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center flex-1 gap-1"
          >
            <span
              className={`flex items-center justify-center rounded-2xl transition-all duration-300 ease-out ${
                isActive
                  ? 'w-14 h-14 -translate-y-4 bg-[#036d6d] shadow-[0_6px_14px_rgba(3,109,109,0.45)]'
                  : 'w-10 h-10 bg-transparent'
              }`}
            >
              <Icon
                className={isActive ? 'size-7 text-white' : 'size-7 text-[#036d6d]/75'}
                strokeWidth={2}
              />
            </span>
            <span
              className={`${tt_wellingtons_demi.className} text-[0.80rem] tracking-wide ${
                isActive ? 'text-[#036d6d] font-bold -mt-3' : 'text-gray-500 font-medium'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}