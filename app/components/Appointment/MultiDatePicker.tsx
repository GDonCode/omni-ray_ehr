'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import localFont from "next/font/local";
import WaitlistJoinModal from './WaitlistJoinModal';

const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" });
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" });
const tt_wellingtons = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf" });
const tt_wellingtons_medium = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Medium.otf" })
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" });

export interface SelectedDateSlots {
  date: Date;
  times: string[]; // max 2, managed by FIFO rotation
}

interface MultiDatePickerProps {
  selectedSlots: SelectedDateSlots[];
  onChange: (slots: SelectedDateSlots[]) => void;
  clinicHours: {
    weekdays: { start: string; end: string };
    saturday: { start: string; end: string };
    sunday: 'closed';
  };
  serviceName?: string;
}

// TIME SLOT GENERATION --- TIME SLOT GENERATION --- TIME SLOT GENERATION --- TIME SLOT GENERATION
const generateTimeSlots = (start: string, end: string): string[] => {
  const slots: string[] = [];
  const [startHour] = start.split(':').map(Number);
  const [endHour] = end.split(':').map(Number);
  for (let hour = startHour; hour < endHour; hour++) {
    const hour12 = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    slots.push(`${hour12}:00 ${ampm}`);
  }
  return slots;
};
// TIME SLOT GENERATION --- TIME SLOT GENERATION --- TIME SLOT GENERATION --- TIME SLOT GENERATION

// DATE FORMATTING --- DATE FORMATTING --- DATE FORMATTING --- DATE FORMATTING
const formatDateDisplay = (date: Date) => {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
// DATE FORMATTING --- DATE FORMATTING --- DATE FORMATTING --- DATE FORMATTING

export default function MultiDatePicker({ selectedSlots, onChange, clinicHours, serviceName = '' }: MultiDatePickerProps) {
// CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [addingSecond, setAddingSecond] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 = Sunday
  // CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE

  // AVAILABILITY STATE --- AVAILABILITY STATE --- AVAILABILITY STATE
  const [bookedSlots, setBookedSlots] = useState<{ date: string; time: string }[]>([]);
  const [closures, setClosures] = useState<{ date: string; start_time: string | null; end_time: string | null }[]>([]);

  const toISODate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // Convert "10:00 AM" display format to "10:00" 24h format for comparison against stored confirmed_time
  const to24Hour = (time12: string): string => {
    const [time, ampm] = time12.split(' ');
    let [hour] = time.split(':').map(Number);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  useEffect(() => {
    const start = toISODate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1));
    const end = toISODate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0));

    fetch(`/api/availability?start=${start}&end=${end}`)
      .then(res => res.ok ? res.json() : { bookedSlots: [], closures: [] })
      .then(data => {
        setBookedSlots(data.bookedSlots || []);
        setClosures(data.closures || []);
      })
      .catch(() => {
        setBookedSlots([]);
        setClosures([]);
      });
  }, [currentMonth]);

  const isDateClosed = (date: Date): boolean => {
    const iso = toISODate(date);
    return closures.some(c => c.date === iso && !c.start_time && !c.end_time);
  };
  // AVAILABILITY STATE --- AVAILABILITY STATE --- AVAILABILITY STATE

  // MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

    // Helper to get a Date object for the first day of a month (for comparison)
  const getMonthStart = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);

  const todayMonthStart = getMonthStart(new Date());
  const currentMonthStart = getMonthStart(currentMonth);

  // Calculate max allowed month (today + 6 months)
  const maxMonthStart = new Date(todayMonthStart);
  maxMonthStart.setMonth(todayMonthStart.getMonth() + 6);

  const canGoPrev = currentMonthStart > todayMonthStart;
  const canGoNext = currentMonthStart < maxMonthStart;
  // MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION

  // TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE
  const getTimeSlotsForDate = (date: Date): string[] => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0) return []; // Sunday closed

    const allSlots = day === 6
      ? generateTimeSlots(clinicHours.saturday.start, clinicHours.saturday.end)
      : generateTimeSlots(clinicHours.weekdays.start, clinicHours.weekdays.end);

    const iso = toISODate(date);
    const bookedTimes24 = bookedSlots.filter(b => b.date === iso).map(b => b.time);
    const partialClosure = closures.find(c => c.date === iso && c.start_time && c.end_time);

    return allSlots.filter(slot => {
      const slot24 = to24Hour(slot);
      if (bookedTimes24.includes(slot24)) return false;
      if (partialClosure && slot24 >= (partialClosure.start_time as string) && slot24 < (partialClosure.end_time as string)) return false;
      return true;
    });
  };
  // TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE

  // DATE SELECTION LOGIC --- DATE SELECTION LOGIC --- DATE SELECTION LOGIC
  const isDateSelected = (date: Date) => selectedSlots.some(slot => slot.date.toDateString() === date.toDateString());

  const toggleDate = (date: Date) => {
    if (isDateSelected(date)) {
      // If already selected, remove it entirely
      onChange(selectedSlots.filter(slot => slot.date.toDateString() !== date.toDateString()));
    } else {
      // Single-slot booking: picking a new date replaces any prior selection
      onChange([{ date, times: [] }]);
    }
  };
  // DATE SELECTION LOGIC --- DATE SELECTION LOGIC --- DATE SELECTION LOGIC

// TIME SELECTION LOGIC (LIFO WITHIN A DATE) --- TIME SELECTION LOGIC
const toggleTime = (date: Date, time: string) => {
  const slotIndex = selectedSlots.findIndex(s => s.date.toDateString() === date.toDateString());
  if (slotIndex === -1) return;

  const slot = selectedSlots[slotIndex];
  let newTimes: string[];
  if (slot.times.includes(time)) {
    // Remove the time
    newTimes = [];
  } else {
    // Single-slot booking: picking a new time replaces any prior selection
    newTimes = [time];
  }

  const newSlots = [...selectedSlots];
  newSlots[slotIndex] = { ...slot, times: newTimes };
  onChange(newSlots);
};
// TIME SELECTION LOGIC (LIFO WITHIN A DATE) --- TIME SELECTION LOGIC

  // REMOVE DATE --- REMOVE DATE --- REMOVE DATE --- REMOVE DATE
  const removeDate = (date: Date) => {
    onChange(selectedSlots.filter(slot => slot.date.toDateString() !== date.toDateString()));
  };
  // REMOVE DATE --- REMOVE DATE --- REMOVE DATE --- REMOVE DATE

  // CALENDAR GRID GENERATION --- CALENDAR GRID GENERATION
  const cells = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const startDate = new Date(year, month, 1);
    const cellsArray = [];
    for (let i = 0; i < 42; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(1 + i - firstDayOfMonth);
      cellsArray.push(cellDate);
    }
    return cellsArray;
  }, [currentMonth, firstDayOfMonth]);
  // CALENDAR GRID GENERATION --- CALENDAR GRID GENERATION

  return (
    <div className="space-y-6 mb-8 lg:w-7xl lg:mx-auto">
      {/* MONTH NAVIGATION HEADER --- MONTH NAVIGATION HEADER */}
      <div className="flex items-center justify-center space-x-8">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          className={`p-2 rounded-full bg-[#036d6d] text-white ${!canGoPrev ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#036d6d] cursor-pointer'}`}
        >
          <ChevronLeft size={30} />
        </button>
        <p className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036D6D] flex flex-col justify-center items-center`}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          <span className={`${tt_wellingtons_medium.className} text-lg`}>Select 1 day</span>
        </p>
        <button
          onClick={nextMonth}
          disabled={!canGoNext}
          className={`p-2 rounded-full bg-[#036d6d] text-white ${!canGoNext ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#036d6d] cursor-pointer'}`}
        >
          <ChevronRight size={30} />
        </button>
      </div>
      {/* MONTH NAVIGATION HEADER --- MONTH NAVIGATION HEADER */}

      {/* DAY HEADERS --- DAY HEADERS */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className={`${inter.className} text-md text-[#024c4c] font-medium`}>{d}</div>
        ))}
      </div>
      {/* DAY HEADERS --- DAY HEADERS */}

      {/* CALENDAR GRID --- CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2 text-center -mt-5">
        {cells.map((cellDate, index) => {
          const isCurrentMonth = cellDate.getMonth() === currentMonth.getMonth();
          const isFuture = cellDate >= today;
          const isSunday = cellDate.getDay() === 0;
          const isSelectable = isCurrentMonth && isFuture && !isSunday && !isDateClosed(cellDate);

          if (!isCurrentMonth) {
            return <div key={index} className="p-2" />; // empty cell for other months
          }

          // Current month cell – always show the day number
          const isSelected = isSelectable && isDateSelected(cellDate);

          return (
            <button
              key={index}
              onClick={isSelectable ? () => toggleDate(cellDate) : undefined}
              disabled={!isSelectable}
              className={`
                ${inter_heading.className} p-2 rounded-md text-lg font-bold transition-all
                ${isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'}
                ${
                  isSelected
                    ? 'bg-[#ffd808] border-2 border-[#e6c200] scale-110 lg:scale-102'
                    : isSelectable
                    ? 'bg-white hover:bg-[#EAF3F7] text-[#181818] border border-[#D0E6E6]'
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                }
              `}
            >
              {cellDate.getDate()}
            </button>
          );
        })}
      </div>
      {/* CALENDAR GRID --- CALENDAR GRID */}

      {/* WAITLIST CTA --- WAITLIST CTA */}
      <div className="text-center border-t border-[#D0E6E6] pt-4">
        <p className={`${inter.className} text-md text-[#024c4c] mb-2`}>
          Don't see a day that works for you?
        </p>
        <button
          onClick={() => setShowWaitlistModal(true)}
          className={`${inter_heading.className} px-4 py-2 rounded-md text-md font-bold text-[#181818] bg-[#ffd808] hover:brightness-95 transition-all cursor-pointer`}
        >
          Join the Waitlist
        </button>
      </div>
      <WaitlistJoinModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        defaultServiceName={serviceName}
      />
      {/* WAITLIST CTA --- WAITLIST CTA */}

      {/* SELECTED DATES & TIME SLOTS --- SELECTED DATES & TIME SLOTS */}
      {selectedSlots.map((slot) => (
        <div key={slot.date.toISOString()} className="border border-[#D0E6E6] rounded-lg p-4 bg-white">
          <div className="flex justify-between items-center mb-3">
            <span className={`${inter_heading.className} text-lg font-bold text-[#024c4c]`}>
              {formatDateDisplay(slot.date)}
            </span>
            <button onClick={() => removeDate(slot.date)} className="text-red-500 lg:text-gray-500 hover:text-red-500 cursor-pointer">
              <X size={18} />
            </button>
          </div>
          <p className={`${inter.className} text-md text-[#024c4c] mb-2`}>Pick your preferred time.</p>
          <div className="flex flex-wrap gap-2">
            {getTimeSlotsForDate(slot.date).map(time => {
              const isSelected = slot.times.includes(time);
              return (
                <button
                  key={time}
                  onClick={() => toggleTime(slot.date, time)}
                  className={`${inter_heading.className} px-4 py-2 rounded-md text-md font-bold transition-all text-[#181818] cursor-pointer ${
                    isSelected
                      ? 'bg-[#ffd808] border border-[#e6c200]'
                      : 'bg-white border border-[#D0E6E6] hover:bg-[#EAF3F7]'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {/* SELECTED DATES & TIME SLOTS --- SELECTED DATES & TIME SLOTS */}
    </div>
  );
}