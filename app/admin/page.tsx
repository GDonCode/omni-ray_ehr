import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase-admin'
import localFont from "next/font/local";

import HeaderWrapper from '../components/HeaderWrapper';
import AdminFooter from '../components/Admin/AdminFooter';
import PageTitle from '../components/PageTitle';
import AdminAppointmentsTable from '../components/Admin/AdminAppointmentsTable';

const levenim = localFont({ src: "../fonts/Levenim_MT/levenim-mt.ttf" })
const inter = localFont({ src: "../fonts/Inter/Inter-Regular.otf" })
const inter_heading = localFont({ src: "../fonts/Inter/Inter-Medium.otf" })
const tt_wellingtons_demi = localFont({ src: "../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" })
const tt_wellingtons = localFont({ src: "../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf" })

export default async function AdminAppointmentsPage() {
  const session = await getServerSession(authOptions)
  const navItems = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'help', label: 'Help', href: '/help' },
    { id: 'contact', label: 'Contact', href: '/contact' }
  ];

  if (!session) {
    redirect('/admin/login')
  }

  // Fetch all appointment requests, ordered by most recent first
  const { data: appointments, error } = await supabaseAdmin
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching appointments:', error)
    // Optionally show an error message
  }

  return (
    <div className='bg-[#F7FBFC] flex flex-col min-h-screen'>
      <header role="banner">
        <HeaderWrapper
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          levenim={levenim}
        />
      </header>
      <main role='main' className='lg:mt-36 mt-34 flex-grow'>
        <div className="container mx-auto lg:p-4 lg:pb-6">
          <AdminAppointmentsTable appointments={appointments || []} />
        </div>
      </main>
      <AdminFooter 
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </div>
  )
}