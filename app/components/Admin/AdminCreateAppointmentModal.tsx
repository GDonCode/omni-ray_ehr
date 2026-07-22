'use client';

import { useState } from 'react';
import localFont from "next/font/local";
import { servicesByCategory, serviceCategoryLabels } from '@/lib/services';

const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" });
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" });

type CreateAppointmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (appointment: any) => void;
};

export default function AdminCreateAppointmentModal({ isOpen, onClose, onSuccess }: CreateAppointmentModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [confirmedDate, setConfirmedDate] = useState('');
  const [confirmedTime, setConfirmedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setServiceName('');
    setConfirmedDate('');
    setConfirmedTime('');
    setNotes('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !phone || !serviceName || !confirmedDate || !confirmedTime) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          service_name: serviceName,
          confirmed_date: confirmedDate,
          confirmed_time: confirmedTime,
          notes,
          status: 'confirmed',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to create appointment');
      }

      const created = await res.json();
      onSuccess(created);
      resetForm();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 z-40"
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-md shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#EAF3F7]">
            <p className={`${tt_wellingtons_demi.className} text-lg text-teal-900`}>Create Appointment</p>
            <button
              onClick={handleClose}
              className="text-teal-800 hover:bg-teal-100 rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>First Name *</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Last Name *</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Service *</label>
              <select
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded bg-white"
                required
              >
                <option value="">Select a service</option>
                <optgroup label="Preventive Care">
                  <option value="New Patient Examination">New Patient Examination</option>
                  <option value="Routine Dental Cleaning">Routine Dental Cleaning</option>
                  <option value="Deep Cleaning (Scaling & Root Planing)">Deep Cleaning (Scaling & Root Planing)</option>
                  <option value="Fluoride Treatment">Fluoride Treatment</option>
                </optgroup>
                <optgroup label="Restorative Care">
                  <option value="Tooth Filling">Tooth Filling</option>
                  <option value="Root Canal Treatment">Root Canal Treatment</option>
                  <option value="Simple Tooth Extraction">Simple Tooth Extraction</option>
                  <option value="Surgical Extraction">Surgical Extraction</option>
                  <option value="Wisdom Tooth Removal">Wisdom Tooth Removal</option>
                  <option value="Dental Crown">Dental Crown</option>
                  <option value="Dental Bridge">Dental Bridge</option>
                  <option value="Dentures Consultation">Dentures Consultation</option>
                </optgroup>
                <optgroup label="Cosmetic Care">
                  <option value="Teeth Whitening">Teeth Whitening</option>
                  <option value="Porcelain Veneers">Porcelain Veneers</option>
                  <option value="Smile Design Consultation">Smile Design Consultation</option>
                </optgroup>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-teal-50/60 border border-teal-100 rounded-md">
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Confirmed Date *</label>
                <input
                  type="date"
                  value={confirmedDate}
                  onChange={(e) => setConfirmedDate(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Confirmed Time *</label>
                <input
                  type="time"
                  value={confirmedTime}
                  onChange={(e) => setConfirmedTime(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${tt_wellingtons_demi.className} w-full py-2.5 px-4 font-extrabold rounded-md text-sm text-white transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#058080] hover:bg-[#036d6d] cursor-pointer'}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Appointment'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}