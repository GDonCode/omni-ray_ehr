'use client';

import Image from 'next/image';
import MultiDatePicker, { SelectedDateSlots } from './MultiDatePicker';

interface Props {
  selectedSlots: SelectedDateSlots[];
  onSelectSlots: (slots: SelectedDateSlots[]) => void;
  onPrevious: () => void;
  onNext: () => void;
  fontClasses: { inter: string };
}

const clinicHours = {
  weekdays: { start: '10:00', end: '18:00' },
  saturday: { start: '09:00', end: '18:00' },
  sunday: 'closed',
} as const;

export default function Step2DateTimeSelection({
  selectedSlots,
  onSelectSlots,
  onPrevious,
  onNext,
  fontClasses,
}: Props) {
  return (
    <div className="relative">
      <MultiDatePicker
        selectedSlots={selectedSlots}
        onChange={onSelectSlots}
        clinicHours={clinicHours}
      />
      <button
        onClick={onPrevious}
        className={`${fontClasses.inter} fixed bottom-10 right-52 z-100 rounded-xl px-8 py-4 cursor-pointer text-xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
            color: '#181818',
          }}
      >
        <Image src="/arrow-left.svg" alt="arrow left" width={30} height={30} />
        Previous
      </button>
      {selectedSlots.length > 0 && selectedSlots.every(s => s.times.length > 0) && (
        <button
          onClick={onNext}
          className={`${fontClasses.inter} fixed bottom-10 right-4 z-100 rounded-xl px-8 py-4 cursor-pointer text-2xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
            color: '#181818',
          }}
        >
          Next
          <Image src="/arrow-right.svg" alt="arrow right" width={30} height={30} />
        </button>
      )}
    </div>
  );
}