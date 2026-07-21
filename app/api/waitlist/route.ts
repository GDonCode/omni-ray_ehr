import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
  const body = await request.json();
  const {
    firstName,
    lastName,
    email,
    phone,
    contactMethod,
    serviceName,
    requestedDate,
    notes,
    source, // 'online' | 'phone' | 'whatsapp'
  } = body;

  if (!firstName || !lastName || !email || !phone || !serviceName || !requestedDate) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('waitlist_entries')
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      contact_method: contactMethod || null,
      service_name: serviceName,
      requested_date: requestedDate,
      notes: notes || null,
      source: source || 'online',
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    console.error('Waitlist insert error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}