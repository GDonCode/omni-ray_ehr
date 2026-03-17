import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendReminderToPatient } from '@/lib/notifications';

export async function GET(request: Request) {
  // Security: require a secret token in the URL
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Calculate tomorrow's date (YYYY-MM-DD)
    const now = new Date();
    const jamaicaOffset = -5 * 60 * 60 * 1000; // UTC-5 in milliseconds
    const jamaicaTime = new Date(now.getTime() + jamaicaOffset);
    const tomorrow = new Date(jamaicaTime);
    tomorrow.setDate(jamaicaTime.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    console.log('Tomorrow string:', tomorrowStr);

  // Query appointments that are confirmed, for tomorrow, and not yet reminded
  const { data: appointments, error } = await supabaseAdmin
    .from('appointment_requests')
    .select('*')
    .eq('status', 'confirmed')
    .eq('confirmed_date', tomorrowStr)
    .eq('reminder_sent', false);

  if (error) {
    console.error('Cron: Failed to fetch appointments', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  // Send reminders and update reminder_sent
  const results = [];
  for (const apt of appointments) {
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

    // Mark as reminded
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
  }

  return NextResponse.json({
    success: true,
    processed: appointments.length,
    details: results,
  });
}