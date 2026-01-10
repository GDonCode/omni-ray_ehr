'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./AppointmentCalendar.module.css";
import localFont from "next/font/local";
const noticia_regular = localFont({
  src: "../fonts/Noticia_Text/NoticiaText-Regular.ttf"
});
const schibsted_grotesk = localFont({
  src: "../fonts/Schibsted_Grotesk/SchibstedGrotesk-VariableFont_wght.ttf"
})
const encode_sans = localFont ({
  src: "../fonts/Encode_Sans/EncodeSans-VariableFont_wdth,wght.ttf"
})

export default function AppointmentCalendar({ onSelectSlot }){

    const [date, setDate] = useState(new Date());

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

    const getDaysInMonth = (date) => {
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


    const [selectedSlot, setSelectedSlot] = useState({ dayKey: null, slot: null });
    const handleSlotClick = (dayKey, slot) => {
        setSelectedSlot(prev => {
            const newSlot =
            prev.dayKey === dayKey && prev.slot === slot
                ? { dayKey: null, slot: null }
                : { dayKey, slot };
            return newSlot;
        });
    };
    useEffect(() => {
        onSelectSlot(selectedSlot);
    }, [selectedSlot, onSelectSlot]);
    const slots = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'];
    return(
        <>
            <div className='p-4 flex flex-col gap-6 items-center'>
    <div className='flex items-center gap-10'>
        <button onClick={handlePrevious} className='bg-white/10 border border-white/20 rounded-full p-2 cursor-pointer hover:bg-white/20 transition-all select-none'>
            <Image src={"/chevron-left.svg"} alt="" width={30} height={30}></Image>
        </button>
        <div className='flex flex-col gap-1 items-center'>
            <span className={`${schibsted_grotesk.className} text-xl font-semibold text-white`}>{currentMonth}</span>
            <span className={`${encode_sans.className} text-sm text-white/70 lg:hidden`}>Swipe to browse days</span>
        </div>
        <button onClick={handleNext} className='bg-white/10 border border-white/20 rounded-full p-2 cursor-pointer hover:bg-white/20 transition-all touch-manipulation'>
            <Image src={"/chevron-right.svg"} alt="" width={30} height={30}></Image>
        </button>
    </div>
    <div className='flex gap-4 overflow-x-auto max-w-full lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-6 pb-2'>
        {filteredDays.map((day, index) => {
            const dayKey = `${day.monthAbbr}-${day.dayNumber}`;
            const isDaySelected = selectedSlot.dayKey === dayKey;
            return (
                <div key={index} className='flex flex-col min-w-[200px] lg:min-w-0 lg:flex-row lg:w-full border-2 border-white/20 rounded-lg bg-white/5 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-all flex-shrink-0'>
                    <div className={`bg-white/10 flex flex-col p-4 text-center justify-center items-center lg:min-w-[100px] transition-all duration-300 ${
                        isDaySelected 
                            ? 'bg-gradient-to-br from-[#5bbce4]/40 to-[#5bbce4]/30' 
                            : 'bg-white/10'
                    }`}>
                        <span className={`${encode_sans.className} text-white/80 text-sm`}>{day.weekday}</span>
                        <span className={`${encode_sans.className} font-bold text-2xl text-white`}>{day.dayNumber}</span>
                        <span className={`${encode_sans.className} text-white/80 text-sm`}>{day.monthAbbr}</span>
                    </div>
                    <div className='text-center p-4 flex flex-col lg:flex-wrap lg:flex-row lg:justify-center gap-4'>
                        {slots.map((slot, idx) => (
                            <button key={idx} onClick={() => handleSlotClick(dayKey, slot)} className={`bg-white/10 border-2 border-white/20 rounded-lg py-4 px-6 font-bold cursor-pointer select-none transition-all duration-300 hover:bg-white/20 hover:scale-105 text-white/90 ${selectedSlot.dayKey === dayKey && selectedSlot.slot === slot ? 'bg-gradient-to-br from-[#5bbce4]/40 to-[#5bbce4]/30 border-none text-white shadow-lg ring-4 ring-[#FFD700]' : ''}`}>
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
