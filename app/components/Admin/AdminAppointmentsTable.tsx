'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import React from 'react';
import { useRouter } from 'next/navigation';
import localFont from "next/font/local";
import { Search, X } from 'lucide-react';
import Fuse from 'fuse.js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import AdminAppointmentForm from '../../admin/[id]/AdminAppointmentForm';

const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" })
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" })
const tt_wellingtons = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf" })
const tt_wellingtons_bold = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Bold.otf" })

type Appointment = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  service_name: string;
  selected_slots: { date: string; times: string[] }[] | null;
  requested_date: string;
  requested_time: string;
  confirmed_date: string | null;
  confirmed_time: string | null;
  status: string;
  email: string;
  phone: string;
  contact_method: string | null;
  notes: string | null;
  message: string | null;
};

type SortConfig = {
  key: keyof Appointment;
  direction: 'asc' | 'desc';
};

type FilterType = 'all' | 'today' | 'upcoming' | 'past';

const STATUS_STYLES: Record<string, { pill: string; dot: string; label: string }> = {
  new:       { pill: 'bg-green-50 text-green-800 border border-green-800',  dot: 'bg-green-400',  label: 'New' },
  confirmed: { pill: 'bg-sky-50 text-sky-800 border border-sky-800',        dot: 'bg-sky-400',    label: 'Confirmed' },
  cancelled: { pill: 'bg-red-50 text-red-800 border border-red-800',        dot: 'bg-red-400',    label: 'Cancelled' },
  completed: { pill: 'bg-teal-50 text-teal-800 border border-teal-800',     dot: 'bg-teal-500',   label: 'Completed' },
};

function SortChevrons({ col, sortConfig }: { col: keyof Appointment; sortConfig: SortConfig }) {
  const active = sortConfig.key === col;
  return (
    <span className="inline-flex flex-col gap-px ml-1.5 align-middle">
      <svg width="10" height="7" viewBox="0 0 7 4" fill="none">
        <path d="M3.5 0L6.53 3.75H0.47L3.5 0Z" fill={active && sortConfig.direction === 'asc' ? '#C9A84C' : '#4A7C74'} opacity={active && sortConfig.direction === 'asc' ? 1 : 0.35} />
        <path d="M3.5 4L0.47 0.25H6.53L3.5 4Z" fill={active && sortConfig.direction === 'desc' ? '#C9A84C' : '#4A7C74'} opacity={active && sortConfig.direction === 'desc' ? 1 : 0.35} />
      </svg>
    </span>
  );
}

// --- Slide-over Drawer ---
function AppointmentDrawer({
  appointment,
  onClose,
  onSuccess,
}: {
  appointment: Appointment | null;
  onClose: () => void;
  onSuccess: (updatedAppointment: Appointment) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (appointment) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [appointment]);

  const isOpen = !!appointment;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#EAF3F7]">
          <div>
            <p className={`${tt_wellingtons_bold.className} text-lg text-teal-900`}>
              {appointment ? `${appointment.first_name} ${appointment.last_name}` : ''}
            </p>
            <p className={`${inter_heading.className}  text-teal-700`}>
              {appointment?.service_name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-teal-100 transition-colors text-teal-800"
            aria-label="Close drawer"
          >
            <X className="w-8 h-8 cursor-pointer" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {appointment && (
            <AdminAppointmentForm
              appointment={appointment}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminAppointmentsTable({ initialAppointments }: { initialAppointments: Appointment[] }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // React Query for appointments – explicitly typed
  const { data: appointments } = useQuery<Appointment[]>({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await fetch('/api/admin/appointments');
      if (!res.ok) throw new Error('Failed to fetch appointments');
      return res.json();
    },
    initialData: initialAppointments,
    refetchOnWindowFocus: false,
  });

  // AUTO-COMPLETE APPOINTMENTS
  const hasAutoCompleted = useRef(false);
  useEffect(() => {
    if (hasAutoCompleted.current) return;
    if (!appointments) return; // guard to ensure appointments is defined
    const run = async () => {
      const now = new Date();
      const toUpdate = appointments.filter((apt: Appointment) =>
        apt.status === 'confirmed' && apt.confirmed_date && apt.confirmed_time
      ).filter((apt: Appointment) => {
        const [y, m, d] = apt.confirmed_date!.split('-').map(Number);
        const [h, min] = apt.confirmed_time!.split(':').map(Number);
        return new Date(y, m - 1, d, h, min) < now;
      });
      if (toUpdate.length > 0) {
        await Promise.all(toUpdate.map(apt =>
          fetch(`/api/admin/appointments/${apt.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'completed' }),
          })
        ));
        queryClient.invalidateQueries({ queryKey: ['appointments'] });
      }
      hasAutoCompleted.current = true;
    };
    run();
  }, [appointments, queryClient]);

  // FUSE SEARCH – use empty array if appointments is undefined (shouldn't happen after guard)
  const [searchQuery, setSearchQuery] = useState('');
  const fuse = useMemo(() => new Fuse(appointments ?? [], {
    keys: ['first_name', 'last_name'],
    threshold: 0.3,
    ignoreLocation: true,
    findAllMatches: true,
  }), [appointments]);

  // FILTER
  const [activeFilter, setActiveFilter] = useState<FilterType>('today');
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const filteredByFilter = useMemo(() => {
    const safeAppointments = appointments ?? [];
    switch (activeFilter) {
      case 'all': return safeAppointments;
      case 'today': return safeAppointments.filter((apt: Appointment) =>
        apt.status === 'new' || (apt.status === 'confirmed' && apt.confirmed_date === todayStr)
      );
      case 'upcoming': return safeAppointments.filter((apt: Appointment) =>
        apt.status === 'confirmed' && apt.confirmed_date !== todayStr
      );
      case 'past': return safeAppointments.filter((apt: Appointment) =>
        apt.status === 'completed' || apt.status === 'cancelled'
      );
      default: return safeAppointments;
    }
  }, [appointments, activeFilter, todayStr]);

  const filteredAppointments = useMemo(() => {
    if (!searchQuery.trim()) return filteredByFilter;
    const fuseIds = new Set(fuse.search(searchQuery).map(r => r.item.id));
    return filteredByFilter.filter((apt: Appointment) => fuseIds.has(apt.id));
  }, [searchQuery, filteredByFilter, fuse]);

  // SORT
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'created_at', direction: 'desc' });
  const sortedAppointments = useMemo(() => {
    const sorted = [...filteredAppointments];
    sorted.sort((a, b) => {
      const val = (item: Appointment, key: keyof Appointment): string | number => {
        if (key === 'created_at') return new Date(item.created_at).getTime();
        if (key === 'requested_date') {
          if (item.selected_slots?.length) {
            const first = item.selected_slots[0];
            return new Date(`${first.date} ${first.times[0] || '00:00'}`).getTime();
          }
          if (item.requested_date && item.requested_time)
            return new Date(`${item.requested_date} ${item.requested_time}`).getTime();
          return 0;
        }
        if (key === 'confirmed_date') {
          if (item.confirmed_date && item.confirmed_time) {
            return new Date(`${item.confirmed_date} ${item.confirmed_time}`).getTime();
          }
          return 0;
        }
        return (item[key] as string).toLowerCase();
      };
      const aVal = val(a, sortConfig.key);
      const bVal = val(b, sortConfig.key);
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredAppointments, sortConfig]);

  const requestSort = (key: keyof Appointment) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // FORMAT HELPERS
  const formatDate = (d: string) => {
    if (d.includes('T') || d.includes(' ')) {
      const date = new Date(d);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } else {
      const date = new Date(d + 'T12:00:00');
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  const formatTime = (t: string) => {
    if (t.includes('AM') || t.includes('PM')) return t;
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  const renderAllRequestedSlots = (slots: Appointment['selected_slots'], oldDate?: string, oldTime?: string) => {
    if (slots?.length) {
      return slots.map((slot, idx) => (
        <div key={idx} className={`${inter_heading.className} text-md`}>
          <span className="font-medium">{formatDate(slot.date)}</span>
          <span className="ml-2">({slot.times.map(t => formatTime(t)).join(', ')})</span>
        </div>
      ));
    }
    if (oldDate && oldTime) {
      return (
        <div className={`${inter_heading.className} text-md`}>
          <span className="font-medium">{formatDate(oldDate)}</span>
          <span className="ml-2">({formatTime(oldTime)})</span>
        </div>
      );
    }
    return <div className="text-sm text-gray-500">No slots</div>;
  };

  // Helper for status cell background (desktop)
  const getStatusCellClass = (status: string) => {
    const base = 'px-5 py-4 text-center font-medium border-l';
    switch (status?.toLowerCase()) {
      case 'new':
        return `${base} bg-green-50 text-green-800 border-green-800`;
      case 'confirmed':
        return `${base} bg-sky-50 text-sky-800 border-sky-800`;
      case 'cancelled':
        return `${base} bg-red-50 text-red-800 border-red-800`;
      case 'completed':
        return `${base} bg-teal-50 text-teal-800 border-teal-800`;
      default:
        return `${base} bg-green-50 text-green-800 border-green-800`;
    }
  };

  // DRAWER STATE
  const [drawerAppointment, setDrawerAppointment] = useState<Appointment | null>(null);

  const handleUpdateSuccess = (updatedAppointment: Appointment) => {
    setDrawerAppointment(null);

    // Optimistically update the cache
    queryClient.setQueryData(['appointments'], (old: Appointment[] | undefined) => {
      if (!old) return old;
      return old.map(apt => apt.id === updatedAppointment.id ? updatedAppointment : apt);
    });

    // Optionally refetch in background to ensure consistency
    queryClient.invalidateQueries({ queryKey: ['appointments'] });
  };

  const welcomeDate = today.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="bg-[#F7FBFC]">
      <AppointmentDrawer
        appointment={drawerAppointment}
        onClose={() => setDrawerAppointment(null)}
        onSuccess={handleUpdateSuccess}
      />

      <div className="px-5 pb-2">
        <h2 className={`${tt_wellingtons_bold.className} text-2xl text-teal-900`}>
          Good {today.getHours() < 12 ? 'Morning' : today.getHours() < 18 ? 'Afternoon' : 'Evening'}
        </h2>
        <p className={`${inter_heading.className} text-lg text-teal-700`}>{welcomeDate}</p>
      </div>

      <div className="px-5 pt-2 pb-6 flex flex-col lg:flex-row lg:gap-6 gap-2">
        <div className="flex flex-wrap gap-2">
          {(['all', 'today', 'upcoming', 'past'] as FilterType[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-sm cursor-pointer font-medium capitalize transition-all duration-200
                ${
                  activeFilter === filter
                    ? 'text-[#181818]'
                    : 'bg-white border border-[#ffd808]/50 text-[#181818] hover:bg-[#ffd808]/10'
                }
              `}
              style={
                activeFilter === filter
                  ? {
                      background:
                        'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
                      boxShadow:
                        '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
                    }
                  : {}
              }
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-[60%] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${inter.className} w-full pl-10 pr-10 py-2 rounded-sm border border-[#D0E6E6] bg-white text-[#181818] text-lg placeholder:text-[#9DBDBD] outline-none focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300 transition-all duration-200`}
            style={{ boxShadow: '0px 6px 12px -16px #000' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-800">
              <X className="w-5 h-5 text-[#181818]" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-teal-900/10">
          <thead>
            <tr className="bg-[#058080]">
              <th onClick={() => requestSort('created_at')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer pl-8">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Submitted <SortChevrons col="created_at" sortConfig={sortConfig} /></div>
              </th>
              <th onClick={() => requestSort('last_name')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Patient <SortChevrons col="last_name" sortConfig={sortConfig} /></div>
              </th>
              <th onClick={() => requestSort('service_name')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Service <SortChevrons col="service_name" sortConfig={sortConfig} /></div>
              </th>
              <th onClick={() => requestSort('requested_date')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Preferred Date/Time <SortChevrons col="requested_date" sortConfig={sortConfig} /></div>
              </th>
              <th onClick={() => requestSort('confirmed_date')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Confirmed Date/Time <SortChevrons col="confirmed_date" sortConfig={sortConfig} /></div>
              </th>
              <th onClick={() => requestSort('status')} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest text-white border-b border-teal-900/10 cursor-pointer">
                <div className={`${tt_wellingtons_bold.className} flex font-extrabold items-center`}>Status <SortChevrons col="status" sortConfig={sortConfig} /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.length > 0 ? (
              sortedAppointments.map(apt => (
                <tr
                  key={apt.id}
                  onClick={() => setDrawerAppointment(apt)}
                  className="hover:bg-[#EAF3F7]/50 border-b border-teal-900/[0.06] cursor-pointer"
                >
                  <td className={`${inter.className} pl-8 pr-5 py-4 text-md text-[#181818] whitespace-nowrap`}>{formatDate(apt.created_at)}</td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className={`${inter_heading.className} text-md font-medium text-[#181818]`}>{apt.first_name} {apt.last_name}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`${inter.className} text-md text-[#181818]`}>{apt.service_name}</span>
                  </td>
                  <td className={`pl-8 pr-5 py-4 ${inter_heading.className} text-md text-[#181818] whitespace-nowrap`}>
                    <div className="flex flex-col space-y-1">
                      {renderAllRequestedSlots(apt.selected_slots, apt.requested_date, apt.requested_time)}
                    </div>
                  </td>
                  <td className={`pl-8 pr-5 py-4 ${inter_heading.className} text-md text-[#181818] whitespace-nowrap`}>
                    {(apt.status === 'confirmed' || apt.status === 'completed') && apt.confirmed_date && apt.confirmed_time ? (
                      <span>
                        {formatDate(apt.confirmed_date)} <span>({formatTime(apt.confirmed_time)})</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className={getStatusCellClass(apt.status)}>
                    {STATUS_STYLES[apt.status?.toLowerCase()]?.label ?? 'New'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-gray-500">No appointments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden w-[95%] mx-auto mb-6 space-y-3">
        {sortedAppointments.length > 0 ? (
          sortedAppointments.map(apt => (
            <div
              key={apt.id}
              onClick={() => setDrawerAppointment(apt)}
              className="bg-white rounded-md border border-teal-900/20 p-4 shadow-sm cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`${inter_heading.className} text-xl font-bold text-[#181818]`}>
                    {apt.first_name} {apt.last_name}
                  </h3>
                  <p className={`${inter.className} text-lg text-[#181818]`}>{apt.service_name}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-lg font-medium ${STATUS_STYLES[apt.status?.toLowerCase()]?.pill ?? STATUS_STYLES.new.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_STYLES[apt.status?.toLowerCase()]?.dot ?? STATUS_STYLES.new.dot}`} />
                  {STATUS_STYLES[apt.status?.toLowerCase()]?.label ?? 'New'}
                </span>
              </div>
              <div className="text-[#181818] text-base space-y-2">
                {(apt.status === 'confirmed' || apt.status === 'completed') && apt.confirmed_date && apt.confirmed_time ? (
                  <div>
                    <span className="text-teal-700 font-medium">Confirmed:</span>
                    <div className="mt-1">
                      <span className={`${inter_heading.className} font-medium`}>{formatDate(apt.confirmed_date)}</span>
                      <span className={`${inter_heading.className} ml-2 text-[#181818] text-md font-medium`}>({formatTime(apt.confirmed_time)})</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="text-teal-700 font-medium">Requested slots:</span>
                    <div className="mt-1 space-y-1">
                      {renderAllRequestedSlots(apt.selected_slots, apt.requested_date, apt.requested_time)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No appointments found.</div>
        )}
      </div>
    </div>
  );

  
}
export type { Appointment }
