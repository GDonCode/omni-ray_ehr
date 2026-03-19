import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendConfirmationToPatient, sendRescheduleNotification } from '@/lib/notifications';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();
    const { status, confirmed_date, confirmed_time, message } = body;

    // 1. Fetch current appointment to check old status and details
    const { data: current, error: fetchError } = await supabaseAdmin
      .from('appointment_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // 2. Prepare update data
    const updateData: any = {
      status,
      message,
      updated_at: new Date().toISOString(),
    };

    if (status === 'confirmed') {
      // Only set confirmed fields if status is confirmed
      if (confirmed_date !== undefined) updateData.confirmed_date = confirmed_date;
      if (confirmed_time !== undefined) updateData.confirmed_time = confirmed_time;
    }

    const { data, error } = await supabaseAdmin
      .from('appointment_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 3. Determine which notification to send
    const wasConfirmed = current.status === 'confirmed';
    const isNowConfirmed = status === 'confirmed';
    const patientInfo = {
      firstName: current.first_name,
      lastName: current.last_name,
      email: current.email,
      phone: current.phone,
      contactMethod: current.contact_method,
    };

    if (wasConfirmed && isNowConfirmed) {
      // Appointment was already confirmed – check if date/time changed
      const dateChanged = confirmed_date !== current.confirmed_date;
      const timeChanged = confirmed_time !== current.confirmed_time;
      if (dateChanged || timeChanged) {
        // Reschedule notification
        sendRescheduleNotification(
          patientInfo,
          confirmed_date,
          confirmed_time,
          current.service_name,
          message  // <-- pass the message from the request body
        ).catch(err => console.error('Background reschedule error:', err));
      }
    } else if (!wasConfirmed && isNowConfirmed) {
      // New confirmation
      sendConfirmationToPatient(
        patientInfo,
        confirmed_date,
        confirmed_time,
        current.service_name,
        message
      ).catch(err => console.error('Background confirmation error:', err));
    }

    // Note: No notification for status changes from confirmed to cancelled/completed/pending

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}