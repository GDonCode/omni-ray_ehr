import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendReminderToPatient } from '@/lib/notifications';
import { formatInTimeZone } from 'date-fns-tz';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get tomorrow's date in Jamaica (America/Jamaica, UTC-5, no DST)
  const now = new Date();
  const tomorrowJamaica = formatInTimeZone(
    now.getTime() + 24 * 60 * 60 * 1000,
    'America/Jamaica',
    'yyyy-MM-dd'
  );
  console.log('Tomorrow (Jamaica):', tomorrowJamaica);

  const { data: appointments, error } = await supabaseAdmin
    .from('appointment_requests')
    .select('*')
    .eq('status', 'confirmed')
    .eq('confirmed_date', tomorrowJamaica)
    .eq('reminder_sent', false);

  if (error) {
    console.error('Cron: Failed to fetch appointments', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const results = [];
  for (const apt of appointments) {
    try {
      await sendReminderToPatient(
        {
          firstName: apt.first_name,
          lastName: apt.last_name,
          email: apt.email,
          phone: apt.phone,
          contactMethod: apt.contact_method,
        },
        apt.confirmed_date,
        apt.confirmed_time,
        apt.service_name
      );

      const { error: updateError } = await supabaseAdmin
        .from('appointment_requests')
        .update({ reminder_sent: true })
        .eq('id', apt.id);

      if (updateError) {
        console.error(`Failed to mark reminder_sent for ${apt.id}`, updateError);
        results.push({ id: apt.id, status: 'error', message: updateError.message });
      } else {
        results.push({ id: apt.id, status: 'sent' });
      }
    } catch (err) {
      console.error(`Error sending reminder for appointment ${apt.id}:`, err);
      results.push({
        id: apt.id,
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  }

  return NextResponse.json({
    success: true,
    processed: appointments.length,
    details: results,
  });
}