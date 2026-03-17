'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import localFont from "next/font/local";

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

export default function MultiDatePicker({ selectedSlots, onChange, clinicHours }: MultiDatePickerProps) {
  // CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [addingSecond, setAddingSecond] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay(); // 0 = Sunday
  // CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE --- CALENDAR STATE

  // MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  // MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION --- MONTH NAVIGATION

  // TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE
  const getTimeSlotsForDate = (date: Date): string[] => {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    if (day === 0) return []; // Sunday closed
    if (day === 6) return generateTimeSlots(clinicHours.saturday.start, clinicHours.saturday.end);
    return generateTimeSlots(clinicHours.weekdays.start, clinicHours.weekdays.end);
  };
  // TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE --- TIME SLOTS FOR DATE

  // DATE SELECTION LOGIC --- DATE SELECTION LOGIC --- DATE SELECTION LOGIC
  const isDateSelected = (date: Date) => selectedSlots.some(slot => slot.date.toDateString() === date.toDateString());

  const toggleDate = (date: Date) => {
    if (isDateSelected(date)) {
      // If already selected, remove it entirely
      onChange(selectedSlots.filter(slot => slot.date.toDateString() !== date.toDateString()));
    } else {
      // Adding a new date – keep exactly 2, discarding the most recent (LIFO)
      let newSlots = [...selectedSlots];
      if (newSlots.length >= 2) {
        newSlots.pop(); // remove the most recently selected date
      }
      newSlots.push({ date, times: [] });
      onChange(newSlots);
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
    newTimes = slot.times.filter(t => t !== time);
  } else {
    // Add new time – if already have 2, remove the most recent before adding
    if (slot.times.length === 2) {
      // Keep the oldest, discard the most recent
      newTimes = [slot.times[0], time];
    } else {
      newTimes = [...slot.times, time];
    }
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
        <button onClick={prevMonth} className="p-2 rounded-full bg-[#036d6d] text-white hover:bg-[#036d6d] cursor-pointer">
          <ChevronLeft size={30} />
        </button>
        <p className={`${tt_wellingtons_demi.className} text-2xl font-bold text-[#036D6D] flex flex-col justify-center items-center`}>
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          <span className={`${tt_wellingtons_medium.className} text-lg`}>Select 1 or 2 days</span>
        </p>
        <button onClick={nextMonth} className="p-2 rounded-full bg-[#036d6d] text-white hover:bg-[#036d6d] cursor-pointer">
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
          const isSelected = isCurrentMonth && isFuture && isDateSelected(cellDate);

          if (!isCurrentMonth || !isFuture) {
            return <div key={index} className="p-2" />; // empty cell
          }

          return (
            <button
              key={index}
              onClick={() => toggleDate(cellDate)}
              className={`${inter_heading.className} p-2 rounded-md text-lg font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#ffd808] border-2 border-[#e6c200] scale-110 lg:scale-102'
                  : 'bg-white hover:bg-[#EAF3F7] text-[#181818] border border-[#D0E6E6]'
              }`}
            >
              {cellDate.getDate()}
            </button>
          );
        })}
      </div>
      {/* CALENDAR GRID --- CALENDAR GRID */}

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
          <p className={`${inter.className} text-md text-[#024c4c] mb-2`}>Select <span className='font-bold'>2 times</span> that work for you:</p>
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