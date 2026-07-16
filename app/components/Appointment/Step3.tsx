'use client';

import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

type AppointmentFor = 'self' | 'child';
type ContactMethod = 'email' | null;

interface PersonalInfo {
  appointmentFor: AppointmentFor;
  firstName: string;
  lastName: string;
  guardianFirstName: string;
  guardianLastName: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  isReturningPatient: string | null;
  notes: string;
  message: string;
  terms: boolean;
}

interface Props {
  personalInfo: PersonalInfo;
  errors: string[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onContinue: () => void;
  onPrevious: () => void;
  fontClasses: {
    tt_wellingtons_demi: string;
    inter: string;
    inter_heading: string;
  };
  isComplete: boolean;
}

const errorId = "form-errors";
export default function Step3PersonalInfo({
  personalInfo,
  errors,
  onInputChange,
  onContinue,
  onPrevious,
  fontClasses,
  isComplete,
}: Props) {
  const isChild = personalInfo.appointmentFor === 'child';

  return (
    <div className="-mt-4 p-4 relative">
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          onContinue();
        }}
      >
        <div>
          <label className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
            Who is this appointment for?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
              <input
                type="radio"
                name="appointmentFor"
                value="self"
                checked={personalInfo.appointmentFor === 'self'}
                onChange={onInputChange}
                required
                className="accent-[#FFD700] w-5 h-5"
              />
              <span className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] text-xl`}>Myself</span>
            </label>
            <label className="flex items-center gap-3 px-4 py-3 bg-white border border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
              <input
                type="radio"
                name="appointmentFor"
                value="child"
                checked={personalInfo.appointmentFor === 'child'}
                onChange={onInputChange}
                required
                className="accent-[#FFD700] w-5 h-5"
              />
              <span className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] text-xl`}>My Child</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
              {isChild ? "Child's First Name *" : "First Name *"}
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
              placeholder={isChild ? "Enter child's first name" : "Enter your first name"}
              value={personalInfo.firstName}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
              {isChild ? "Child's Last Name *" : "Last Name *"}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
              placeholder={isChild ? "Enter child's last name" : "Enter your last name"}
              value={personalInfo.lastName}
              onChange={onInputChange}
            />
          </div>
        </div>

        {isChild && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="guardianFirstName" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
                Guardian's First Name *
              </label>
              <input
                type="text"
                id="guardianFirstName"
                name="guardianFirstName"
                required
                className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
                placeholder="Enter guardian's first name"
                value={personalInfo.guardianFirstName}
                onChange={onInputChange}
              />
            </div>
            <div>
              <label htmlFor="guardianLastName" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
                Guardian's Last Name *
              </label>
              <input
                type="text"
                id="guardianLastName"
                name="guardianLastName"
                required
                className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
                placeholder="Enter guardian's last name"
                value={personalInfo.guardianLastName}
                onChange={onInputChange}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
              placeholder="your.email@example.com"
              value={personalInfo.email}
              onChange={onInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
              placeholder="(876) 123-4567"
              value={personalInfo.phone}
              onChange={onInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={`${fontClasses.inter_heading} block text-xl font-medium text-[#036d6d] mb-2`}>
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className={`${fontClasses.inter_heading} w-full px-4 py-3 rounded-sm border-2 border-[#D0E6E6] bg-white text-[#181818] font-medium text-xl placeholder:text-[#9DBDBD] transition-all duration-200 focus:outline-none focus:border-[#0D6E6E] focus:ring-2 focus:ring-[#0D6E6E]/10 tracking-wide`}
            placeholder="Any special requests or information we should know?"
            value={personalInfo.notes}
            onChange={onInputChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${fontClasses.tt_wellingtons_demi} block text-xl font-medium text-[#036d6d] mb-2`}>
              Have you been to Aurelia Dental before? *
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                <input
                  type="radio"
                  name="isReturningPatient"
                  value="yes"
                  checked={personalInfo.isReturningPatient === 'yes'}
                  onChange={onInputChange}
                  required
                  className="accent-[#FFD700] w-5 h-5"
                />
                <span className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] text-xl`}>Yes</span>
              </label>
              <label className="flex items-center gap-3 px-4 py-3 bg-white border-2 border-[#036d6d] rounded-md cursor-pointer transition-all hover:bg-white/15">
                <input
                  type="radio"
                  name="isReturningPatient"
                  value="no"
                  checked={personalInfo.isReturningPatient === 'no'}
                  onChange={onInputChange}
                  required
                  className="accent-[#FFD700] w-5 h-5"
                />
                <span className={`${fontClasses.tt_wellingtons_demi} text-[#036d6d] text-xl`}>No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            checked={personalInfo.terms}
            onChange={onInputChange}
            className="mt-1 w-6 h-6 rounded border-[#036d6d] bg-white text-[#f6d212] focus:ring-2 focus:ring-[#f6d212] focus:ring-offset-0"
          />
          <label htmlFor="terms" className={`${fontClasses.inter} text-xl text-[#181818]`}>
            I agree to the <a href="/policies#terms" className="text-[#036d6d] underline">terms and conditions</a> and <a href="/policies#privacy" className="text-[#036d6d] underline">privacy policy</a> *
          </label>
        </div>

        {errors.length > 0 && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
          >
            <ul className={`${fontClasses.inter_heading} list-disc list-inside text-[#181818] font-semibold tracking-wide space-y-1`}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={onPrevious}
            className={`${fontClasses.inter} fixed bottom-26 lg:bottom-10 right-52 z-100 rounded-xl px-8 py-4 cursor-pointer text-xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
          style={{
            background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
            boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
            color: '#181818',
          }}
          >
            <Image src="/arrow-left.svg" alt="arrow left" width={30} height={30} />
            Previous
          </button>
          {isComplete && (
            <button
              type="submit"
              className={`${fontClasses.inter} fixed bottom-26 lg:bottom-10 right-4 z-100 rounded-xl px-8 py-4 cursor-pointer text-2xl font-semibold flex gap-2 items-center transition-all duration-200 hover:scale-[1.02] hover:brightness-105`}
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
      </form>
    </div>
  );
}