'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import localFont from "next/font/local";
const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" })
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" })
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" })
const tt_wellingtons = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf" })

interface SelectedSlot {
  date: string;      // YYYY-MM-DD
  times: string[];   // e.g., ["10:00 AM", "2:00 PM"]
}

interface Appointment {
  id: string
  service_name: string
  selected_slots: SelectedSlot[] | null
  requested_date: string
  requested_time: string
  confirmed_date: string | null
  confirmed_time: string | null
  first_name: string
  last_name: string
  email: string
  phone: string
  contact_method: string | null
  notes: string | null
  message: string | null
  status: string
}

interface AppointmentFormProps {
  appointment: Appointment;
  onSuccess?: () => void; // called after successful update instead of redirect
}

export default function AppointmentForm({ appointment, onSuccess }: AppointmentFormProps) {
  const router = useRouter()
  const isCompleted = appointment.status === 'completed'
  
  const [status, setStatus] = useState(appointment.status)
  const [confirmedDate, setConfirmedDate] = useState(appointment.confirmed_date || '')
  const [confirmedTime, setConfirmedTime] = useState(appointment.confirmed_time || '')
  const [notes, setNotes] = useState(appointment.notes || '')
  const [message, setMessage] = useState(appointment.message || '')
  const [isLoading, setIsLoading] = useState(false)

  // Format phone number: (876) 888-4433
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    // Remove all non-digit characters just in case
    const cleaned = phone.replace(/\D/g, '');
    // Check if it's a 10-digit number
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    // If not 10 digits, return original (or could format differently)
    return phone;
  };

  // Safe formatter for times
  const formatTime = (t: string) => {
    if (t.includes('AM') || t.includes('PM')) return t;
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  // Format date as "Mar. 3, 2026" (for confirmed dates)
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const month = d.toLocaleDateString('en-US', { month: 'short' }); // "Mar"
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month}. ${day}, ${year}`;
  };

  // Format a full date (YYYY-MM-DD) to "Mar 3, 2026"
  const formatDisplayDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch(`/api/admin/appointments/${appointment.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status,
        confirmed_date: confirmedDate,
        confirmed_time: confirmedTime,
        message,
      }),
    })

    setIsLoading(false)
    if (res.ok) {
      if (onSuccess) {
        onSuccess(); // call the callback (e.g., close row and refresh)
      } else {
        router.push('/admin'); // fallback to original behavior
      }
    } else {
      alert('Failed to update appointment')
    }
  }

  // Helper to render requested slots (new + fallback)
  const renderRequestedSlots = () => {
    if (appointment.selected_slots && appointment.selected_slots.length > 0) {
      return (
        <div className="flex gap-4">
          {appointment.selected_slots.map((slot, idx) => (
            <div key={idx} className="border-l-2 border-[#058080] bg-gray-50 py-2 px-3">
              <p className="font-medium">{formatDisplayDate(slot.date)}</p>
              <p className="">{slot.times.map(t => formatTime(t)).join(', ')}</p>
            </div>
          ))}
        </div>
      );
    }
    // Fallback to legacy fields
    return (
      <p className="mt-1 p-2 rounded">
        {formatDate(appointment.requested_date)} at {formatTime(appointment.requested_time)}
      </p>
    );
  };

  // If completed, show a read‑only view (still without Patient/Service)
  if (isCompleted) {
    return (
      <div className="w-full space-y-4">
        <div className="bg-teal-50 border border-teal-200 rounded-md p-3">
          <p className="text-teal-800 text-sm font-medium">This appointment is marked as completed and cannot be edited.</p>
        </div>
        <div className="space-y-4 opacity-70 pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${inter_heading.className}`}>
              <label className="block text-sm font-medium text-[#036d6d]">Email</label>
              <p className="mt-1 p-2 bg-gray-100 rounded text-sm">{appointment.email}</p>
            </div>
            <div className={`${inter_heading.className}`}>
              <label className="block text-sm font-medium text-[#036d6d]">Phone</label>
              <p className="mt-1 p-2 bg-gray-100 rounded text-sm">{appointment.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${inter_heading.className}`}>
              <label className="block text-sm font-medium text-[#036d6d]">Requested Slots</label>
              {renderRequestedSlots()}
            </div>
            <div className={`${inter_heading.className}`}>
              <label className="block text-sm font-medium text-[#036d6d]">Status</label>
              <p className="mt-1 p-2 bg-gray-100 rounded text-sm">{appointment.status}</p>
            </div>
          </div>

          {appointment.confirmed_date && appointment.confirmed_time && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`${inter_heading.className}`}>
                <label className="block text-sm font-medium text-[#036d6d]">Confirmed Date</label>
                <p className="mt-1 p-2 bg-gray-100 rounded text-sm">{formatDate(appointment.confirmed_date)}</p>
              </div>
              <div className={`${inter_heading.className}`}>
                <label className="block text-sm font-medium text-[#036d6d]">Confirmed Time</label>
                <p className="mt-1 p-2 bg-gray-100 rounded text-sm">{appointment.confirmed_time}</p>
              </div>
            </div>
          )}

          <div className={`${inter_heading.className}`}>
            <label className="block text-sm font-medium text-[#036d6d]">Internal Notes</label>
            <p className="mt-1 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">{appointment.notes || '(none)'}</p>
          </div>

          <button
            type="button"
            disabled
            className={`${tt_wellingtons_demi.className} w-full py-2 px-4 bg-gray-300 text-gray-600 font-extrabold rounded-md cursor-not-allowed text-sm`}
          >
            COMPLETED – NO EDITS
          </button>
        </div>
      </div>
    )
  }

  // Editable form – no Patient/Service fields
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
  {/* Read-only info row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className={`${inter_heading.className}`}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Email</label>
      <p className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[#181818]"
      style={{ boxShadow: '0px 6px 12px -16px #000' }}>{appointment.email}</p>
    </div>
    <div className={`${inter_heading.className}`}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Phone</label>
      <p className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[#181818]"
      style={{ boxShadow: '0px 6px 12px -16px #000' }}>{formatPhone(appointment.phone)}</p>
    </div>
  </div>
  <div className={`${inter_heading.className}`}>
    <label className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Patient Notes</label>
    <p className="p-2.5 bg-gray-50 border border-gray-200 rounded text-[#181818]"
    style={{ boxShadow: '0px 6px 12px -16px #000' }}>{appointment.notes}</p>
  </div>



  {/* Divider */}
  <div className="border-t border-gray-100" />

  {/* Editable row */}
    <div className={`${inter_heading.className} mb-4`}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Requested Slots</label>
      <div className="p-2.5  text-[#181818]">
        {renderRequestedSlots()}
      </div>
    </div>
    <div className={`${inter_heading.className}`}>
      <label htmlFor="status" className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Change Status</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={`${inter.className} cursor-pointer block w-full p-3 border border-gray-300 bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#058080]`}
        style={{ boxShadow: '0px 6px 12px -16px #000' }}
      >
        <option className="cursor-pointer" value="new">New</option>
        <option className="cursor-pointer" value="confirmed">Confirmed</option>
        <option className="cursor-pointer" value="cancelled">Cancelled</option>
      </select>
    </div>


  {/* Confirmed date/time — animated in */}
  {status === 'confirmed' && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-teal-50/60 border border-teal-100 rounded-md">
      <div className={`${inter_heading.className}`}>
        <label htmlFor="confirmedDate" className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Confirmed Date</label>
        <input
          type="date"
          id="confirmedDate"
          value={confirmedDate}
          onChange={(e) => setConfirmedDate(e.target.value)}
          className="block w-full p-2.5 border border-gray-300 bg-white rounded focus:outline-none focus:ring-1 focus:ring-[#058080]"
          style={{ boxShadow: '0px 6px 12px -16px #000' }}
        />
      </div>
      <div className={`${inter_heading.className}`}>
        <label htmlFor="confirmedTime" className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Confirmed Time</label>
        <input
          type="time"
          id="confirmedTime"
          value={confirmedTime}
          onChange={(e) => setConfirmedTime(e.target.value)}
          className="block w-full p-2.5 border border-gray-300 bg-white rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#058080]"
          style={{ boxShadow: '0px 6px 12px -16px #000' }}
        />
      </div>
    </div>
  )}

  {/* Message */}
  <div className={`${inter_heading.className}`}>
    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#036d6d] mb-1">Send the Patient a Message</label>
    <textarea
      id="message"
      rows={3}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Add a message for the patient here..."
      className="block w-full p-2.5 border border-gray-300 bg-white rounded transition-all duration-200 outline-none focus:border-2 focus:border-b-[#058080] focus:border-x-[#D0E6E6] focus:border-t-[#D0E6E6] focus:rounded-b-[2px] hover:ring-1 hover:ring-gray-300"
      style={{ boxShadow: '0px 6px 12px -16px #000' }}
    />
  </div>

  <button
    type="submit"
    disabled={isLoading}
    className={`${tt_wellingtons_demi.className} w-full py-4 px-4 bg-[#ffd808] text-[#181818] font-extrabold rounded hover:brightness-105 cursor-pointer transition-all duration-200 disabled:opacity-50 tracking-wider`}
    style={{
              background: 'linear-gradient(180deg, #ffe14d 0%, #ffd808 50%, #e6b800 100%)',
              boxShadow: '0px 0.5px 0.5px rgba(180,130,0,0.3), 0px 1px 0.5px rgba(180,130,0,0.15)',
              color: '#181818',
            }}
  >
    {isLoading ? 'Updating...' : 'UPDATE APPOINTMENT'}
  </button>
</form>
  )
}