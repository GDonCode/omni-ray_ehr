import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { notFound } from 'next/navigation'
import localFont from "next/font/local";
import HeaderWrapper from '../../components/HeaderWrapper';
import AdminFooter from '../../components/Admin/AdminFooter';
import PageTitle from '../../components/PageTitle';
import AdminAppointmentForm from './AdminAppointmentForm'; // client component for form

const levenim = localFont({ src: "../../fonts/Levenim_MT/levenim-mt.ttf" })
const inter = localFont({ src: "../../fonts/Inter/Inter-Regular.otf" })
const inter_heading = localFont({ src: "../../fonts/Inter/Inter-Medium.otf" })
const tt_wellingtons_demi = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial DemiBold.otf" })
const tt_wellingtons = localFont({ src: "../../fonts/TT_Wellingtons/TT Wellingtons Trial Regular.otf" })

export default async function AppointmentDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
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

  const { data: appointment, error } = await supabaseAdmin
    .from('appointment_requests')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !appointment) {
    notFound()
  }

  return (
    <div>
      <header role="banner">
        <HeaderWrapper
          navItems={navItems}
          inter_heading={inter_heading}
          tt_wellingtons_demi={tt_wellingtons_demi}
          levenim={levenim}
        />
            </header>
      <PageTitle
        title="Appointment Details"
        subtitle={`Request from ${appointment.first_name} ${appointment.last_name}`}
        titleFont={tt_wellingtons_demi.className}
        bodyFont={inter.className}
      />
      <div className="container mx-auto p-4 bg-[#F7FBFC]">
        <AdminAppointmentForm appointment={appointment} />
      </div>
      <AdminFooter 
        tt_wellingtons={tt_wellingtons}
        inter_heading={inter_heading}
      />
    </div>
  )
}