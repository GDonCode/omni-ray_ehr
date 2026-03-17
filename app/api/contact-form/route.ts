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
  contactMethod: 'email';
  email: string;   
  message: string;
}

export async function POST(request: Request) {
  try {
    const contactData: ContactData = await request.json();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      background-color: #f4f6f8;
      margin: 0;
      padding: 20px;
    }

    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
    }

    .header {
      background-color: #058080;
      padding: 20px;
      color: #ffffff;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .brand img {
      display: block;
      width: 60px;
      height: 60px;  
      object-fit: contain;
    }

    .header-title {
      font-size: 18px;
      font-weight: bold;
      margin: 0;
      line-height: 1.2;
    }

    .content {
      padding: 30px;
    }

    .section {
      margin-bottom: 20px;
    }

    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #181818;
      border-bottom: 2px solid #058080;
      padding-bottom: 6px;
      margin-bottom: 15px;
    }

    .info-row-container {
      display: flex;
      gap: 40px;
      align-items: flex-start;
      flex-wrap: wrap;
    }

    .info-item {
      min-width: 200px;
    }

    .label {
      font-size: 14px;
      font-weight: 400;
      color: #666;
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .value {
      font-size: 16px;
      font-weight: 600;
      color: #181818;
    }

    .message-box {
      background-color: #f1f5f4;
      border-left: 6px solid #058080;
      padding: 18px;
      border-radius: 6px;
      color: #181818;
      font-size: 15px;
      line-height: 1.6;
      margin-top: 10px;
    }

    .footer {
      background-color: #fafafa;
      padding: 20px;
      font-size: 12px;
      color: #777;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }

    a {
      color: #058080;
      text-decoration: none;
      font-weight: 600;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>

<body>
  <div class="wrapper">

    <div class="header">
  <table cellpadding="0" cellspacing="0" border="0" width="100%">
    <tr>
      <td width="70" valign="middle">
        <img 
          src="https://omni-rayehr.vercel.app/aurelia-dental_logo.png" 
          alt="Aurelia Dental Logo"
          width="60"
          style="display:block;"
        />
      </td>
      <td valign="middle" style="font-size:18px; font-weight:bold; color:#ffffff; padding-left:10px;">
        New Contact Form Submission
      </td>
    </tr>
  </table>
</div>

    <div class="content">

      <div class="section">
        <div class="section-title">Contact Details</div>
        
        <div class="info-row-container">
          <div class="info-item">
            <div class="label">Name</div>
            <div class="value">Jessica Brown</div>
          </div>
    
          <div class="info-item">
            <div class="label">Email</div>
            <div class="value">
              <a href="mailto:jessica.brown@gmail.com">
                jessica.brown@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Patient Message</div>

        <div class="message-box">
          Hello,<br><br>
          I would like to schedule a consultation regarding teeth whitening
          and possibly veneers. I am available next week in the afternoons.<br><br>
          Please let me know what appointment slots are open.<br><br>
          Thank you!
        </div>
      </div>

    </div>

    <div class="footer">
      <p>This is an automated message from your website contact form.</p>
      <p>
        Received on Sunday, February 25, 2026 at 7:42 PM
      </p>
    </div>

  </div>
</body>
</html>
`;

    const emailText = `
NEW CONTACT FORM SUBMISSION - ${config.practiceName}

CONTACT DETAILS
---------------
Name: ${contactData.name}
Email: ${contactData.email}

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