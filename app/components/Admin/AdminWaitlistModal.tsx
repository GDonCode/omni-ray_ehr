'use client';

import { useState } from 'react';
import localFont from "next/font/local";

const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" });
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" });

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (entry: any) => void;
};

export default function AdminWaitlistModal({ isOpen, onClose, onSuccess }: WaitlistModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [serviceName, setServiceName] = useState('');
  const [requestedDate, setRequestedDate] = useState('');
  const [source, setSource] = useState('phone');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setContactMethod('email');
    setServiceName('');
    setRequestedDate('');
    setSource('phone');
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

    if (!firstName || !lastName || !email || !phone || !serviceName || !requestedDate) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          contactMethod,
          serviceName,
          requestedDate,
          notes,
          source,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to add to waitlist');
      }

      const created = await res.json();
      onSuccess(created.data);
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
            <p className={`${tt_wellingtons_demi.className} text-lg text-teal-900`}>Add to Waitlist</p>
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Preferred Contact</label>
                <select
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-white"
                >
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>How They Reached Us</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded bg-white"
                >
                  <option value="phone">Phone Call</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Service *</label>
              <input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. Teeth Cleaning"
                className="w-full p-2.5 border border-gray-300 rounded"
                required
              />
            </div>

            <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-md">
              <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Date They Want *</label>
              <input
                type="date"
                value={requestedDate}
                onChange={(e) => setRequestedDate(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Notes</label>
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
              {isSubmitting ? 'Adding...' : 'Add to Waitlist'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}