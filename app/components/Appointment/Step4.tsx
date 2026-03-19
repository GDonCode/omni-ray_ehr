'use client';

import Image from 'next/image';
import { Mail, Phone, Calendar, Clock, SquarePen } from 'lucide-react';

interface SelectedSlot {
  date: Date;
  times: string[];
}

interface BookingData {
  selectedService: string | null;
  selectedSlots: SelectedSlot[];
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface Props {
  bookingData: BookingData;
  onEditService: () => void;
  onEditDateTime: () => void;
  onEditPersonalInfo: () => void;
  onConfirm: () => void;
  onBack: () => void;
  isLoading: boolean;
  fontClasses: {
    tt_wellingtons_demi: string;
    inter: string;
  };
  errors?: string[];
}

export default function Step4Confirmation({
  bookingData,
  onEditService,
  onEditDateTime,
  onEditPersonalInfo,
  onConfirm,
  onBack,
  isLoading,
  fontClasses,
  errors = [],
}: Props) {
  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Safe time formatter – works whether input is 24h (14:00) or already formatted (2:00 PM)
  const formatTime = (time: string) => {
    // If it already contains AM/PM, return as is (prevents double formatting)
    if (time.includes('AM') || time.includes('PM')) return time;
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="pt-0 lg:pt-4 p-4 lg:mt-5 relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white backdrop-blur-sm border-2 border-white/20 rounded-md p-6 py-4 mb-6 shadow-lg relative lg:flex lg:items-start lg:justify-around gap-8 lg:gap-12">
          {/* Personal Info Section */}
          <div>
            <div className={`${fontClasses.tt_wellingtons_demi} text-sm text-[#024c4c] uppercase mb-4 border-b`}>
              Personal Information
            </div>
            <div className="flex justify-between items-start flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className={`${fontClasses.tt_wellingtons_demi} text-3xl font-semibold text-[#036d6d] mb-4`}>
                  {bookingData.personalInfo.firstName} {bookingData.personalInfo.lastName}
                </div>
                <div className={`${fontClasses.inter} text-xl font-medium text-[#181818] mb-4 tracking-wide flex items-center`}>
                  <Mail className="w-5 h-5 mr-3 text-[#181818]" />
                  {bookingData.personalInfo.email}
                </div>
                <div className={`${fontClasses.inter} text-xl font-medium text-[#181818] tracking-wider mb-10 flex items-center`}>
                  <Phone className="w-5 h-5 mr-3 text-[#181818]" />
                  {bookingData.personalInfo.phone}
                </div>
                <button
                  onClick={onEditPersonalInfo}
                  className="text-white px-5 py-2.5 rounded-md font-semibold text-md hover:scale-103 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2 self-end md:self-start"
                  style={{
                    background: 'linear-gradient(180deg, #1a9e9e 0%, #058080 50%, #036d6d 100%)',
                    boxShadow: '0px 0.5px 0.5px rgba(3,80,80,0.3), 0px 1px 0.5px rgba(3,80,80,0.15)',
                    color: '#ffffff',
                  }}
                >
                  <SquarePen />
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          {/* Service & Time Section */}
          <div>
            <div className={`${fontClasses.tt_wellingtons_demi} text-sm text-[#036D6D] uppercase mb-4 border-b mt-8 lg:mt-0`}>
              Selected Service
            </div>
            <div className="flex justify-between items-start flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className={`${fontClasses.tt_wellingtons_demi} text-3xl font-semibold text-[#036d6d] mb-4`}>
                  {bookingData.selectedService || 'No Service Selected'}
                </div>

                {/* Selected slots */}
                <div className="space-y-4 mb-4 lg:flex lg:gap-6">
                  {bookingData.selectedSlots.map((slot, idx) => (
                    <div key={idx} className="border-l-2 border-[#058080] pl-3 lg:mb-8">
                      <div className={`${fontClasses.inter} text-xl font-medium text-[#181818] flex items-center gap-1`}>
                        <Calendar className="w-4 h-4" />
                        {formatDate(slot.date)}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {slot.times.map((time, tIdx) => (
                          <span
                            key={tIdx}
                            className={`${fontClasses.inter} text-md bg-[#EAF3F7] px-2 py-1 rounded`}
                          >
                            <Clock className="w-3 h-3 inline mr-1" />
                            {formatTime(time)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onEditDateTime}
                  className="text-white px-5 py-2.5 rounded-md font-semibold text-md transition-all duration-300 hover:scale-103 cursor-pointer flex items-center gap-2 self-end md:self-start"
                  style={{
                    background: 'linear-gradient(180deg, #1a9e9e 0%, #058080 50%, #036d6d 100%)',
                    boxShadow: '0px 0.5px 0.5px rgba(3,80,80,0.3), 0px 1px 0.5px rgba(3,80,80,0.15)',
                    color: '#ffffff',
                  }}
                >
                  <SquarePen />
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errors.map((err, i) => (
              <p key={i}>{err}</p>
            ))}
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className={`${fontClasses.tt_wellingtons_demi} px-8 py-3 bg-white/10 border-3 border-[#036d6d] text-[#036d6d] text-lg rounded-md hover:scale-103 cursor-pointer transition-all font-medium`}
          >
            Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`${fontClasses.tt_wellingtons_demi} px-8 py-3 text-[#181818] rounded-md cursor-pointer text-xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            style={{
              background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
              boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
              color: '#181818',
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                SENDING...
              </span>
            ) : (
              'CONFIRM APPOINTMENT'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}