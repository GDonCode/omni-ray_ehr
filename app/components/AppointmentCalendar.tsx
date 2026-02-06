'use client';
import { useState, useEffect, useRef} from 'react';
import Image from "next/image";
import styles from "./AppointmentCalendar.module.css";
import localFont from "next/font/local";

const levenim = localFont ({
  src: "../fonts/Levenim_MT/levenim-mt.ttf"
})
const cinzel = localFont ({
  src: "../fonts/Cinzel/CinzelDecorative-Regular.otf"
})
const open_sans = localFont ({
  src: "../fonts/OpenSans/OpenSans-SemiBold.ttf"
})
const inter_heading = localFont ({
  src: "../fonts/Inter/Inter-Medium.otf"
})
const inter = localFont ({
  src: "../fonts/Inter/Inter-Regular.otf"
})

interface AppointmentCalendarProps {
  onSelectSlot: (slot: { dayKey: string | null; slot: string | null }) => void;
  selectedDate?: Date | null;
  selectedTime?: string | null;
}

export default function AppointmentCalendar({ onSelectSlot, selectedDate, selectedTime }: AppointmentCalendarProps){

     const [date, setDate] = useState(selectedDate || new Date());
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const currentMonth = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    });

    const handlePrevious = () => {
        const today = new Date();
        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const prev = new Date(date.getFullYear(), date.getMonth() - 1, 1);

        if (prev >= currentMonth) {
            setDate(prev);
        }
    };

    const handleNext = () => {
        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
        setDate(nextMonth);
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const days = [];
        const totalDays = new Date(year, month + 1, 0).getDate(); // Last day of the month

        for (let day = 1; day <= totalDays; day++) {
            const d = new Date(year, month, day);
            days.push({
            weekday: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
            dayNumber: day,
            monthAbbr: d.toLocaleDateString('en-US', { month: 'short' }),
            year: year,
            monthIndex: month // Needed to reconstruct full date for filtering
            });
        }

        return days;
    };
    const days = getDaysInMonth(date);

    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const filteredDays = days.filter((day) => {
        const dayDate = new Date(day.year, day.monthIndex, day.dayNumber);
        return dayDate >= todayStart;
    });

    // Initialize selectedSlot from props if they exist
    const getInitialSlot = () => {
        if (selectedDate && selectedTime) {
            const monthAbbr = selectedDate.toLocaleDateString('en-US', { month: 'short' });
            const dayNumber = selectedDate.getDate();
            return {
                dayKey: `${monthAbbr}-${dayNumber}`,
                slot: selectedTime
            };
        }
        return { dayKey: null, slot: null };
    };

    const [selectedSlot, setSelectedSlot] = useState(getInitialSlot());

    // Update selectedSlot when props change (when user navigates back)
    useEffect(() => {
        if (selectedDate && selectedTime) {
            const monthAbbr = selectedDate.toLocaleDateString('en-US', { month: 'short' });
            const dayNumber = selectedDate.getDate();
            const newDayKey = `${monthAbbr}-${dayNumber}`;
            
            setSelectedSlot(prev => {
                if (prev.dayKey === newDayKey && prev.slot === selectedTime) {
                    return prev;
                }
                return {
                    dayKey: newDayKey,
                    slot: selectedTime
                };
            });
            
            setDate(selectedDate);
        }
    }, [selectedDate, selectedTime]);

    useEffect(() => {
        if (selectedSlot.dayKey && scrollContainerRef.current) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                const selectedElement = document.querySelector(`[data-day-key="${selectedSlot.dayKey}"]`);
                if (selectedElement && scrollContainerRef.current) {
                    selectedElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                        inline: 'center'
                    });
                }
            }, 100);
        }
    }, [selectedSlot.dayKey, date]);

    const handleSlotClick = (dayKey: string, slot: string) => {
        setSelectedSlot(prev => {
            const newSlot =
            prev.dayKey === dayKey && prev.slot === slot
                ? { dayKey: null, slot: null }
                : { dayKey, slot };
            return newSlot;
        });
    };

    useEffect(() => {
        // Always notify parent, whether selected or deselected
        onSelectSlot(selectedSlot);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSlot]); 
    
    const slots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];

    return(
        <>
            <div className='-mt-2 p-4 flex flex-col gap-6 items-center'>
                <div className='flex items-center gap-10'>
                    <button onClick={handlePrevious} className='bg-white border border-white/20 rounded-full p-2 cursor-pointer hover:scale-105 transition-all select-none'>
                        <Image src={"/chevron-left.svg"} alt="" width={30} height={30}></Image>
                    </button>
                    <div className='flex flex-col gap-1 items-center'>
                        <span className={`${inter_heading.className} text-2xl font-bold text-[#faf9f6]`}>{currentMonth}</span>
                        <span className={`${inter.className} text-white/70 lg:hidden`}>Swipe to browse days</span>
                    </div>
                    <button onClick={handleNext} className='bg-white border border-white/20 rounded-full p-2 cursor-pointer hover:scale-105 transition-all touch-manipulation'>
                        <Image src={"/chevron-right.svg"} alt="" width={30} height={30}></Image>
                    </button>
                </div>
                
                {/* Add ref and data-day-key attributes */}
                <div 
                    ref={scrollContainerRef}
                    className='flex gap-4 overflow-x-auto max-w-full lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-6 pb-2'
                >
                    {filteredDays.map((day, index) => {
                        const dayKey = `${day.monthAbbr}-${day.dayNumber}`;
                        const isDaySelected = selectedSlot.dayKey === dayKey;
                        return (
                            <div 
                                key={index} 
                                data-day-key={dayKey} 
                                className='flex flex-col min-w-[200px] lg:min-w-0 lg:flex-row lg:w-full rounded-md border-2 border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all flex-shrink-0'
                            >
                                <div className={`relative flex flex-col p-4 text-center justify-center items-center lg:min-w-[100px] transition-all duration-300 ${
                                    isDaySelected 
                                        ? 'border-4 border-[#FFD700] bg-white' 
                                        : 'bg-white'
                                }`}>
                                    {/* Selected Indicator */}
                                    {isDaySelected && (
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-900">
                                                <path d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                    <span className={`${inter_heading.className} text-[#036d6d] font-bold`}>{day.weekday}</span>
                                    <span className={`${inter.className} font-bold text-3xl text-[#036d6d]`}>{day.dayNumber}</span>
                                    <span className={`${inter_heading.className} text-[#036d6d] text-sm font-bold`}>{day.monthAbbr}</span>
                                </div>
                                <div className='text-center p-4 flex flex-col lg:flex-wrap lg:flex-row lg:justify-center gap-4'>
                                    {slots.map((slot, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => handleSlotClick(dayKey, slot)} 
                                            className={`border-2 border-white/20 py-4 px-6 rounded-md font-bold cursor-pointer select-none transition-all duration-300 hover:scale-105 text-[#036d6d] text-lg ${selectedSlot.dayKey === dayKey && selectedSlot.slot === slot ? 'border-none shadow-lg ring-4 ring-[#FFD700] bg-white' : 'bg-white'}`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}