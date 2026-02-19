'use client';

import Image from 'next/image';
import AppointmentCalendar from '../AppointmentCalendar';

interface Props {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectSlot: (slot: { dayKey: string | null; slot: string | null }) => void;
  onPrevious: () => void;
  onNext: () => void;
  fontClasses: { inter: string };
}

export default function Step2DateTimeSelection({
  selectedDate,
  selectedTime,
  onSelectSlot,
  onPrevious,
  onNext,
  fontClasses,
}: Props) {
  return (
    <div className="relative">
      <AppointmentCalendar
        onSelectSlot={onSelectSlot}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
      <button
        onClick={onPrevious}
        className={`${fontClasses.inter} bg-[#f6d212] text-gray-900 fixed bottom-10 right-48 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-xl lg:text-2xl font-semibold shadow-md flex gap-2 items-center`}
      >
        <Image src="/arrow-left.svg" alt="arrow left" width={30} height={30} />
        Previous
      </button>
      {selectedDate && selectedTime && (
        <button
          onClick={onNext}
          className={`${fontClasses.inter} bg-[#f6d212] text-gray-900 fixed bottom-10 right-4 z-100 rounded-lg px-8 py-4 hover:scale-105 cursor-pointer text-2xl font-semibold shadow-md flex gap-2 items-center`}
        >
          Next
          <Image src="/arrow-right.svg" alt="arrow right" width={30} height={30} />
        </button>
      )}
    </div>
  );
}