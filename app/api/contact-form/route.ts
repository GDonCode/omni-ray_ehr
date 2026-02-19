// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration for easy client switching
const EMAIL_CONFIG = {
  testing: {
    from: 'Dental Practice <onboarding@resend.dev>',
    to: 'gavinrayne1@gmail.com', // Replace with your email for testing
    practiceName: 'Dental Practice (Test Mode)'
  },
  production: {
    from: 'Dental Practice <contact@clientdomain.com>', // Client's domain
    to: 'clientreception@example.com', // Client's reception email
    practiceName: 'Client Dental Practice Name'
  }
};

// Toggle this to switch between test and production
const ENVIRONMENT: 'testing' | 'production' = 'testing';
const config = EMAIL_CONFIG[ENVIRONMENT];

interface ContactData {
  name: string;
  contactMethod: 'email' | 'phone';
  email?: string;   // present if method is email
  phone?: string;   // present if method is phone
  message: string;
}

export async function POST(request: Request) {
  try {
    const contactData: ContactData = await request.json();

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
            .message-box {
              background-color: #82bfbf;
              color: #181818;
              padding: 15px;
              border-left: 4px solid #058080;
              margin-top: 10px;
              white-space: pre-wrap;
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
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0;">${config.practiceName}</p>
          </div>
          
          <div class="content">
            <div class="section">
              <div class="section-title">Contact Details</div>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${contactData.name}</span>
              </div>
              <div class="info-row">
                <span class="label">Preferred Contact:</span>
                <span class="value">${contactData.contactMethod === 'email' ? 'Email' : 'Phone'}</span>
              </div>
              ${contactData.contactMethod === 'email' ? `
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value"><a href="mailto:${contactData.email}">${contactData.email}</a></span>
              </div>
              ` : `
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value"><a href="tel:${contactData.phone}">${contactData.phone}</a></span>
              </div>
              `}
            </div>

            <div class="section">
              <div class="section-title">Message</div>
              <div class="message-box">
                ${contactData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated message from your contact form.</p>
            <p>Received on ${new Date().toLocaleString('en-US', { 
              dateStyle: 'full', 
              timeStyle: 'short' 
            })}</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
NEW CONTACT FORM SUBMISSION - ${config.practiceName}

CONTACT DETAILS
---------------
Name: ${contactData.name}
Preferred Contact: ${contactData.contactMethod === 'email' ? 'Email' : 'Phone'}
${contactData.contactMethod === 'email' ? `Email: ${contactData.email}` : `Phone: ${contactData.phone}`}

MESSAGE
-------
${contactData.message}

-------------------
Received: ${new Date().toLocaleString()}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      subject: `New Contact Form Message from ${contactData.name}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      messageId: data?.id,
      message: 'Message sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}