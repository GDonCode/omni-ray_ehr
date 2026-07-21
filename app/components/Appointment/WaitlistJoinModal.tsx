'use client';

import { useState } from 'react';
import localFont from "next/font/local";

const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" });
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" });
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" });

type WaitlistJoinModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceName?: string;
};

export default function WaitlistJoinModal({ isOpen, onClose, defaultServiceName = '' }: WaitlistJoinModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState('email');
  const [serviceName, setServiceName] = useState(defaultServiceName);
  const [requestedDate, setRequestedDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setSubmitted(false);
    setError('');
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
          source: 'online',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to join waitlist');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={handleClose} className="fixed inset-0 bg-black/40 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-md shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#EAF3F7]">
            <p className={`${tt_wellingtons_demi.className} text-lg text-teal-900`}>Join the Waitlist</p>
            <button onClick={handleClose} className="text-teal-800 hover:bg-teal-100 rounded-full p-2 transition-colors" aria-label="Close">
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="px-6 py-8 text-center space-y-3">
              <p className={`${inter_heading.className} text-lg text-[#036d6d]`}>You're on the list!</p>
              <p className={`${inter.className} text-[#181818]`}>
                We'll reach out the moment a slot opens up on your requested date.
              </p>
              <button
                onClick={handleClose}
                className={`${tt_wellingtons_demi.className} mt-4 px-4 py-2 rounded-md text-white bg-[#058080] hover:bg-[#036d6d] cursor-pointer`}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>
              )}

              <p className={`${inter.className} text-sm text-[#181818]`}>
                Tell us the date you need, and we'll notify you the moment it opens up.
              </p>

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
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Service *</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. Routine Cleaning"
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-md">
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Date You Want *</label>
                <input
                  type="date"
                  value={requestedDate}
                  onChange={(e) => setRequestedDate(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  required
                />
              </div>

              <div>
                <label className={`${inter_heading.className} block text-xs uppercase text-[#036d6d] mb-1`}>Anything else we should know?</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 border border-gray-300 rounded"
                  rows={2}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`${tt_wellingtons_demi.className} w-full py-2.5 px-4 font-extrabold rounded-md text-sm text-[#181818] transition-colors ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#ffd808] hover:brightness-95 cursor-pointer'}`}
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}