'use client';

import Image from 'next/image';
import { Mail, Phone, Calendar, Clock } from 'lucide-react';

interface BookingData {
  selectedService: string | null;
  selectedDate: Date | null;
  selectedTime: string | null;
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
}: Props) {
  const formattedDate = bookingData.selectedDate
    ? new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No Date Selected';

  return (
    <div className="pt-0 lg:pt-4 p-4 lg:mt-5 relative">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white backdrop-blur-sm border-2 border-white/20 rounded-md p-6 py-4 mb-6 shadow-lg relative lg:flex lg:items-start lg:justify-around gap-8">
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
                <div className={`${fontClasses.inter} text-xl font-medium text-[#024c4c] mb-4 tracking-wide flex items-center`}>
                  <Mail className="w-5 h-5 mr-3 text-[#024c4c]" />
                  {bookingData.personalInfo.email}
                </div>
                <div className={`${fontClasses.inter} text-xl font-medium text-[#024c4c] tracking-wider mb-10 flex items-center`}>
                  <Phone className="w-5 h-5 mr-3 text-[#024c4c]" />
                  {bookingData.personalInfo.phone}
                </div>
                <button
                  onClick={onEditPersonalInfo}
                  className="bg-[#f6d212] border-2 border-[#f6d212] text-[#181818] px-5 py-2.5 rounded-md font-semibold text-md hover:scale-103 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center gap-2 self-end md:self-start"
                >
                  <Image src="/edit.svg" alt="Edit" width={23} height={23} />
                  Edit Details
                </button>
              </div>
            </div>
          </div>

          {/* Service & Time Section */}
          <div>
            <div className={`${fontClasses.tt_wellingtons_demi} text-sm text-[#024c4c] uppercase mb-4 border-b mt-8 lg:mt-0`}>
              Selected Service
            </div>
            <div className="flex justify-between items-start flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className={`${fontClasses.tt_wellingtons_demi} text-3xl font-semibold text-[#036d6d] mb-4`}>
                  {bookingData.selectedService || 'No Service Selected'}
                </div>
                <div className={`${fontClasses.inter} text-xl font-medium text-[#024c4c] tracking-wider mb-4 flex items-center`}>
                  <Calendar className="w-5 h-5 mr-3 text-[#024c4c]" />
                  {formattedDate}
                </div>
                <div className={`${fontClasses.inter} font-medium text-xl text-[#024c4c] tracking-wide mb-10 flex items-center`}>
                  <Clock className="w-5 h-5 mr-3 text-[#024c4c]" />
                  {bookingData.selectedTime || 'No Time Selected'}
                </div>
                <button
                  onClick={() => {
                    onEditService();
                  }}
                  className="bg-[#f6d212] border-2 border-[#f6d212] text-[#181818] px-5 py-2.5 rounded-md font-semibold text-md transition-all duration-300 hover:scale-103 cursor-pointer flex items-center gap-2 self-end md:self-start"
                >
                  <Image src="/edit.svg" alt="Edit" width={23} height={23} />
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>

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
            className={`${fontClasses.tt_wellingtons_demi} flex-1 px-8 py-3 bg-[#eccb1b] text-[#181818] text-xl rounded-md hover:scale-103 cursor-pointer transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed`}
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