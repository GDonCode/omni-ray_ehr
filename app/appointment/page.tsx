// app/appointment/page.tsx
import { Suspense } from 'react';
import AppointmentClient from './AppointmentClient';

// Loading component for Suspense fallback
function AppointmentLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#036d6d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#036d6d] text-xl font-semibold">Loading appointment scheduler...</p>
      </div>
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <Suspense fallback={<AppointmentLoading />}>
      <AppointmentClient />
    </Suspense>
  );
}