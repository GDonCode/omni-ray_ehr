import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const start = searchParams.get('start');
  const end = searchParams.get('end');

  if (!start || !end) {
    return NextResponse.json({ error: 'start and end query params are required' }, { status: 400 });
  }

  const { data: bookedRows, error: bookedError } = await supabaseAdmin
    .from('appointment_requests')
    .select('confirmed_date, confirmed_time')
    .eq('status', 'confirmed')
    .gte('confirmed_date', start)
    .lte('confirmed_date', end);

  if (bookedError) {
    return NextResponse.json({ error: bookedError.message }, { status: 500 });
  }

  const { data: closureRows, error: closureError } = await supabaseAdmin
    .from('clinic_closures')
    .select('id, date, start_time, end_time, reason')
    .gte('date', start)
    .lte('date', end);

  if (closureError) {
    return NextResponse.json({ error: closureError.message }, { status: 500 });
  }

  const bookedSlots = (bookedRows || [])
    .filter(r => r.confirmed_date && r.confirmed_time)
    .map(r => ({ date: r.confirmed_date, time: r.confirmed_time }));

  return NextResponse.json({ bookedSlots, closures: closureRows || [] });
}