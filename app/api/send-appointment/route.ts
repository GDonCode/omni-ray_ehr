// app/api/send-appointment/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

function getClients() {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    throw new Error('Missing required environment variable(s): RESEND_API_KEY');
  }

  return {
    resend: new Resend(resendKey),
    supabase: supabaseAdmin,
  };
}

const EMAIL_CONFIG = {
  testing: {
    from: 'Dental Practice <onboarding@resend.dev>',
    to: 'gavinrayne1@gmail.com',
    practiceName: 'Dental Practice (Test Mode)',
    baseUrl: 'https://live-dental-demo.vercel.app', // Demo URL – replace with env variable later
  },
  production: {
    from: 'Dental Practice <appointments@clientdomain.com>',
    to: 'clientreception@example.com',
    practiceName: 'Client Dental Practice Name',
    baseUrl: 'https://clientdomain.com', // Production URL
  }
};

const ENVIRONMENT: 'testing' | 'production' = 'testing';
const config = EMAIL_CONFIG[ENVIRONMENT];

interface PersonalInfo {
  appointmentFor: 'self' | 'child';
  firstName: string;
  lastName: string;
  guardianFirstName: string;
  guardianLastName: string;
  email: string;
  phone: string;
  contactMethod: string | null;
  isReturningPatient: string | null;
  notes: string;
  message: string;
  terms: boolean;
}

interface SelectedSlot {
  date: string;
  times: string[];
}

interface BookingData {
  selectedService: string | null;
  selectedSlots: SelectedSlot[];
  personalInfo: PersonalInfo;
}

// Helper to format date as "Monday, January 1, 2026"
const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

// Base email wrapper (tables + inline styles)
const baseEmailWrapper = (content: string) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${config.practiceName}</title>
    </head>
    <body style="margin:0; padding:0; background-color:#F7FBFC; font-family: Helvetica, Arial, sans-serif; font-size:18px; line-height:1.6; color:#181818;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F7FBFC; width:100%;">
        <tr>
          <td align="center" style="padding:20px;">
            <table width="800" cellpadding="0" cellspacing="0" border="0" style="max-width:800px; width:100%; background-color:#ffffff; border-collapse:collapse; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
              ${content}
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;

export async function POST(request: Request) {
  try {
    const { resend, supabase } = getClients();
    const bookingData: BookingData = await request.json();

    const parseDate = (dateStr: string): Date => new Date(dateStr);

    // Prepare slots for database
    const slotsForDb = bookingData.selectedSlots.map(slot => ({
      date: parseDate(slot.date).toISOString().split('T')[0],
      times: slot.times
    }));

    // 1. Insert into Supabase first so we get the appointment ID
    const { data: inserted, error: dbError } = await supabase
      .from('appointment_requests')
      .insert({
        service_name: bookingData.selectedService,
        selected_slots: slotsForDb,
        requested_date: null,
        requested_time: null,
        appointment_for: bookingData.personalInfo.appointmentFor,
        first_name: bookingData.personalInfo.firstName,
        last_name: bookingData.personalInfo.lastName,
        guardian_first_name: bookingData.personalInfo.appointmentFor === 'child' ? bookingData.personalInfo.guardianFirstName : null,
        guardian_last_name: bookingData.personalInfo.appointmentFor === 'child' ? bookingData.personalInfo.guardianLastName : null,
        email: bookingData.personalInfo.email,
        phone: bookingData.personalInfo.phone,
        contact_method: bookingData.personalInfo.contactMethod,
        is_returning_patient: bookingData.personalInfo.isReturningPatient === 'yes' ? true : bookingData.personalInfo.isReturningPatient === 'no' ? false : null,
        notes: bookingData.personalInfo.notes,
        message: bookingData.personalInfo.message,
        status: 'new',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const appointmentId = inserted.id;

    // 2. Build email HTML with a link to the specific appointment
    const adminLink = `${config.baseUrl}/admin/${appointmentId}`;

    // Build slots HTML (as a nested table)
    const slotsRows = bookingData.selectedSlots.map((slot) => {
      const dateStr = formatDateLong(slot.date);
      const timesHtml = slot.times
        .map(
          (t) =>
            `<span style="display:inline-block; background-color:#058080; color:white; padding:2px 8px; border-radius:4px; margin-right:5px; font-size:0.9em;">${t}</span>`
        )
        .join(' ');
      return `
        <tr>
          <td style="padding:8px; background-color:#f0f8fa; border-radius:4px; margin-bottom:5px;">
            <strong>${dateStr}</strong>: ${timesHtml}
          </td>
        </tr>
      `;
    }).join('');

    const content = `
      <!-- Header -->
      <tr>
        <td style="background-color:#058080; padding:30px 20px; text-align:center; border-radius:8px 8px 0 0;">
          <h1 style="margin:0; color:#faf9f6; font-size:28px; font-weight:bold;">New Appointment Request</h1>
          <p style="margin:10px 0 0 0; color:#faf9f6; font-size:20px;">${config.practiceName}</p>
        </td>
      </tr>

      <!-- Content -->
      <tr>
        <td style="padding:30px; background-color:#ffffff; border-left:1px solid #ddd; border-right:1px solid #ddd; border-bottom:1px solid #ddd; border-radius:0 0 8px 8px;">
          
          <!-- Appointment Details -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Appointment Details</td>
            </tr>
            <tr>
              <td style="padding-top:10px;">
                <table width="100%" cellpadding="5" cellspacing="0" border="0">
                  <tr>
                    <td width="120" style="font-weight:bold; color:#555;">Service:</td>
                    <td style="color:#333;">${bookingData.selectedService || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="font-weight:bold; color:#555; vertical-align:top;">Preferred Slots:</td>
                    <td style="color:#333;">
                      <table cellpadding="0" cellspacing="0" border="0">
                        ${slotsRows || '<tr><td>None selected</td></tr>'}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <!-- Patient Information -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Patient Information</td>
            </tr>
            <tr>
              <td style="padding-top:10px;">
                <table width="100%" cellpadding="4" cellspacing="0" border="0">
                  <tr><td width="120" style="font-weight:bold; color:#555;">Name:</td><td style="color:#333;">${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}</td></tr>
                  <tr><td style="font-weight:bold; color:#555;">Email:</td><td style="color:#333;"><a href="mailto:${bookingData.personalInfo.email}" style="color:#058080;">${bookingData.personalInfo.email}</a></td></tr>
                  <tr><td style="font-weight:bold; color:#555;">Phone:</td><td style="color:#333;"><a href="tel:${bookingData.personalInfo.phone}" style="color:#058080;">${bookingData.personalInfo.phone}</a></td></tr>
                </table>
              </td>
            </tr>
          </table>

          ${bookingData.personalInfo.notes ? `
          <!-- Additional Notes -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Additional Notes</td>
            </tr>
            <tr>
              <td style="background-color:#f0f8fa; padding:15px; border-left:4px solid #058080; border-radius:4px; margin-top:10px; color:#181818;">
                ${bookingData.personalInfo.notes}
              </td>
            </tr>
          </table>
          ` : ''}

          ${bookingData.personalInfo.message ? `
          <!-- Patient Message -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Patient Message</td>
            </tr>
            <tr>
              <td style="background-color:#f0f8fa; padding:15px; border-left:4px solid #058080; border-radius:4px; margin-top:10px; color:#181818;">
                ${bookingData.personalInfo.message}
              </td>
            </tr>
          </table>
          ` : ''}

          <!-- Terms -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td width="120" style="font-weight:bold; color:#555;">Terms Accepted:</td>
              <td style="color:#333;">${bookingData.personalInfo.terms ? '✓ Yes' : '✗ No'}</td>
            </tr>
          </table>

          <!-- Admin Link -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
            <tr>
              <td style="text-align:center; padding:20px 0;">
                <a href="${adminLink}" style="background-color:#058080; color:white; padding:12px 24px; text-decoration:none; border-radius:5px; display:inline-block; font-size:18px;">View in Admin Dashboard</a>
              </td>
            </tr>
          </table>

          <!-- Footer -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-top:20px; border-top:2px solid #ddd; font-size:16px; color:#777; text-align:center;">
                <p>This is an automated appointment request notification.</p>
                <p>Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </td>
            </tr>
          </table>

        </td>
      </tr>
    `;

    const emailHtml = baseEmailWrapper(content);

    const plainText = `
NEW APPOINTMENT REQUEST - ${config.practiceName}

APPOINTMENT DETAILS
-------------------
Service: ${bookingData.selectedService || 'Not specified'}
Preferred Slots:
${bookingData.selectedSlots.map(s => {
      const dateStr = formatDateLong(s.date);
      return `${dateStr}: ${s.times.join(', ')}`;
    }).join('\n') || 'None selected'}

PATIENT INFORMATION
-------------------
Name: ${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}
Email: ${bookingData.personalInfo.email}
Phone: ${bookingData.personalInfo.phone}
Preferred Contact: ${bookingData.personalInfo.contactMethod || 'Not specified'}

${bookingData.personalInfo.notes ? `ADDITIONAL NOTES
-------------------
${bookingData.personalInfo.notes}
` : ''}

${bookingData.personalInfo.message ? `PATIENT MESSAGE
-------------------
${bookingData.personalInfo.message}
` : ''}

Terms Accepted: ${bookingData.personalInfo.terms ? 'Yes' : 'No'}

View this request in the admin dashboard: ${adminLink}

-------------------
Received: ${new Date().toLocaleString()}
    `.trim();

    // 2. Send email to practice
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: `New Appointment Request - ${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}`,
      html: emailHtml,
      text: plainText,
    });

    if (error) {
      console.error('Resend error:', error);
      // Even if email fails, the appointment is saved; we can still return success but indicate email failure
      return NextResponse.json({
        success: true,
        appointmentId,
        messageId: null,
        message: 'Appointment request saved but email notification failed',
        dbStatus: 'saved',
        emailError: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      appointmentId,
      messageId: data?.id,
      message: 'Appointment request sent successfully',
      dbStatus: 'saved'
    });

  } catch (error) {
    console.error('Error in appointment request:', error);
    return NextResponse.json(
      { error: 'Failed to send appointment request' },
      { status: 500 }
    );
  }
}