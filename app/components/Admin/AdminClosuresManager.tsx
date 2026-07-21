'use client'
import { useState, useEffect } from 'react'
import localFont from "next/font/local";

const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" })
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" })
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" })

interface Closure {
  id: string;
  date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
}

export default function AdminClosuresManager() {
  const [closures, setClosures] = useState<Closure[]>([])
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [reason, setReason] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadClosures = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/closures')
    if (res.ok) {
      setClosures(await res.json())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadClosures()
  }, [])

  const formatDate = (d: string) => {
    const dt = new Date(d + 'T12:00:00')
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date) return
    setIsSubmitting(true)
    const res = await fetch('/api/admin/closures', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date,
        start_time: startTime || null,
        end_time: endTime || null,
        reason: reason || null,
      }),
    })
    setIsSubmitting(false)
    if (res.ok) {
      setDate('')
      setStartTime('')
      setEndTime('')
      setReason('')
      loadClosures()
    } else {
      alert('Failed to add closure')
    }
  }

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/closures?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      loadClosures()
    } else {
      alert('Failed to remove closure')
    }
  }

  return (
    <div className="bg-white border border-teal-900/10 rounded-md p-5 space-y-5">
      <h2 className={`${tt_wellingtons_demi.className} text-xl text-[#036d6d]`}>Clinic Closures</h2>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label className={`${inter_heading.className} block text-xs uppercase tracking-wider text-[#036d6d] mb-1`}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="block w-full p-2.5 border border-gray-300 bg-white rounded"
          />
        </div>
        <div>
          <label className={`${inter_heading.className} block text-xs uppercase tracking-wider text-[#036d6d] mb-1`}>Start (optional)</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full p-2.5 border border-gray-300 bg-white rounded"
          />
        </div>
        <div>
          <label className={`${inter_heading.className} block text-xs uppercase tracking-wider text-[#036d6d] mb-1`}>End (optional)</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="block w-full p-2.5 border border-gray-300 bg-white rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${inter_heading.className} py-2.5 px-4 bg-[#036d6d] text-white rounded cursor-pointer disabled:opacity-50`}
        >
          {isSubmitting ? 'Adding...' : 'Add Closure'}
        </button>
        <div className="md:col-span-4">
          <label className={`${inter_heading.className} block text-xs uppercase tracking-wider text-[#036d6d] mb-1`}>Reason (optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Public holiday, staff training"
            className="block w-full p-2.5 border border-gray-300 bg-white rounded"
          />
        </div>
      </form>

      <div className={`${inter.className} space-y-2`}>
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : closures.length === 0 ? (
          <p className="text-sm text-gray-500">No closures scheduled.</p>
        ) : (
          closures.map((c) => (
            <div key={c.id} className="flex items-center justify-between border border-gray-200 rounded p-3">
              <div>
                <span className="font-medium">{formatDate(c.date)}</span>
                <span className="ml-2 text-sm text-gray-600">
                  {c.start_time && c.end_time ? `${c.start_time} – ${c.end_time}` : 'Full day'}
                </span>
                {c.reason && <span className="ml-2 text-sm text-gray-400">({c.reason})</span>}
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}