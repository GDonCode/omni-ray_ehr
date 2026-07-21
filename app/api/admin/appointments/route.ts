// app/api/admin/appointments/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: appointments, error } = await supabaseAdmin
    .from('appointment_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const {
    first_name,
    last_name,
    email,
    phone,
    service_name,
    confirmed_date,
    confirmed_time,
    notes,
    status,
  } = body;

  if (!first_name || !last_name || !email || !phone || !service_name || !confirmed_date || !confirmed_time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const insertData = {
    first_name,
    last_name,
    email,
    phone,
    service_name,
    confirmed_date,
    confirmed_time,
    // Mirror confirmed slot into requested fields so existing UI (which reads
    // requested_date/requested_time as a fallback) renders correctly.
    requested_date: confirmed_date,
    requested_time: confirmed_time,
    notes: notes || null,
    status: status || 'confirmed',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabaseAdmin
    .from('appointment_requests')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}