// app/api/send-appointment/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Configuration for easy client switching
const EMAIL_CONFIG = {
  testing: {
    from: 'Dental Practice <onboarding@resend.dev>',
    to: 'gavinrayne1@gmail.com', // Replace with your email for testing
    practiceName: 'Dental Practice (Test Mode)'
  },
  production: {
    from: 'Dental Practice <appointments@clientdomain.com>', // Client's domain
    to: 'clientreception@example.com', // Client's reception email
    practiceName: 'Client Dental Practice Name'
  }
};

// Toggle this to switch between test and production
const ENVIRONMENT: 'testing' | 'production' = 'testing';
const config = EMAIL_CONFIG[ENVIRONMENT];

interface BookingData {
  selectedService: string | null;
  selectedDate: string | null;
  selectedTime: string | null;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    contactMethod: string | null;
    notes: string;
    terms: boolean;
  };
}

export async function POST(request: Request) {
  try {
    const bookingData: BookingData = await request.json();

    // Format the date for better readability in email
    const formattedDate = bookingData.selectedDate
      ? new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Not specified';

     const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Helvetica, sans-serif;
              line-height: 1.6;
              color: #EAF3F7;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #058080;
              color: #faf9f6;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #ffffff;
              padding: 30px;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #181818;
              margin-bottom: 10px;
              border-bottom: 2px solid #058080;
              padding-bottom: 5px;
            }
            .info-row {
              display: flex;
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              width: 150px;
              color: #555;
            }
            .value {
              flex: 1;
              color: #333;
            }
            .notes-box {
              background-color: #82bfbf;
              color: #181818;
              padding: 15px;
              border-left: 4px solid #058080;
              margin-top: 10px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #ddd;
              font-size: 12px;
              color: #777;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0;">New Appointment Request</h1>
            <p style="margin: 10px 0 0 0;">${config.practiceName}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Appointment Details</div>
              <div class="info-row">
                <span class="label">Service:</span>
                <span class="value">${bookingData.selectedService || 'Not specified'}</span>
              </div>
              <div class="info-row">
                <span class="label">Preferred Date:</span>
                <span class="value">${formattedDate}</span>
              </div>
              <div class="info-row">
                <span class="label">Preferred Time:</span>
                <span class="value">${bookingData.selectedTime || 'Not specified'}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Patient Information</div>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${bookingData.personalInfo.email}">${bookingData.personalInfo.email}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${bookingData.personalInfo.phone}">${bookingData.personalInfo.phone}</a></span>
              </div>
              <div class="info-row">
                <span class="label">Date of Birth:</span>
                <span class="value">${bookingData.personalInfo.dob || 'Not provided'}</span>
              </div>
              <div class="info-row">
                <span class="label">Preferred Contact:</span>
                <span class="value">${bookingData.personalInfo.contactMethod || 'Not specified'}</span>
              </div>
            </div>

            ${bookingData.personalInfo.notes ? `
            <div class="section">
              <div class="section-title">Additional Notes</div>
              <div class="notes-box">
                ${bookingData.personalInfo.notes}
              </div>
            </div>
            ` : ''}

            <div class="section">
              <div class="info-row">
                <span class="label">Terms Accepted:</span>
                <span class="value">${bookingData.personalInfo.terms ? '✓ Yes' : '✗ No'}</span>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated appointment request notification.</p>
            <p>Received on ${new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}</p>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const emailText = `
NEW APPOINTMENT REQUEST - ${config.practiceName}

APPOINTMENT DETAILS
-------------------
Service: ${bookingData.selectedService || 'Not specified'}
Date: ${formattedDate}
Time: ${bookingData.selectedTime || 'Not specified'}

PATIENT INFORMATION
-------------------
Name: ${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}
Email: ${bookingData.personalInfo.email}
Phone: ${bookingData.personalInfo.phone}
Date of Birth: ${bookingData.personalInfo.dob || 'Not provided'}
Preferred Contact: ${bookingData.personalInfo.contactMethod || 'Not specified'}

${bookingData.personalInfo.notes ? `ADDITIONAL NOTES
-------------------
${bookingData.personalInfo.notes}
` : ''}

Terms Accepted: ${bookingData.personalInfo.terms ? 'Yes' : 'No'}

-------------------
Received: ${new Date().toLocaleString()}
    `.trim();

    // 1. Send email to practice
    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: `New Appointment Request - ${bookingData.personalInfo.firstName} ${bookingData.personalInfo.lastName}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Save to Supabase (appointment_requests table)
    const { error: dbError } = await supabase
      .from('appointment_requests')
      .insert({
        service_name: bookingData.selectedService,
        requested_date: bookingData.selectedDate, // ISO string
        requested_time: bookingData.selectedTime,
        patient_first_name: bookingData.personalInfo.firstName,
        patient_last_name: bookingData.personalInfo.lastName,
        patient_email: bookingData.personalInfo.email,
        patient_phone: bookingData.personalInfo.phone,
        contact_method: bookingData.personalInfo.contactMethod,
        dob: bookingData.personalInfo.dob,
        notes: bookingData.personalInfo.notes,
        terms_accepted: bookingData.personalInfo.terms,
        status: 'pending',
        // created_at will default to now(), updated_at via trigger
      });

    if (dbError) {
      // Log the error but still return success because the email was sent
      console.error('Supabase insert error:', dbError);
      // Optionally, you could notify yourself (e.g., send an email) about the DB failure
    }

    return NextResponse.json({
      success: true,
      messageId: data?.id,
      message: 'Appointment request sent successfully',
      dbStatus: dbError ? 'failed' : 'saved'
    });

  } catch (error) {
    console.error('Error in appointment request:', error);
    return NextResponse.json(
      { error: 'Failed to send appointment request' },
      { status: 500 }
    );
  }
}