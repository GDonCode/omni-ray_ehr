import { Resend } from 'resend';
import twilio from 'twilio';

const resend = new Resend(process.env.RESEND_API_KEY);
// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const EMAIL_CONFIG = {
  testing: {
    from: 'Dental Practice <onboarding@resend.dev>',
    practiceName: 'Dental Practice (Test Mode)',
  },
  production: {
    from: 'Aurelia Dental <appointments@aureliadental.com>',
    practiceName: 'Aurelia Dental',
  }
};

const ENV = (process.env.NODE_ENV === 'production' ? 'production' : 'testing') as 'testing' | 'production';
const config = EMAIL_CONFIG[ENV];

export async function sendConfirmationToPatient(
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: string | null;
  },
  confirmedDate: string,
  confirmedTime: string,
  service: string,
  message: string
) {
  const formattedDate = new Date(confirmedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Helvetica, sans-serif;
            line-height: 1.6;
            color: #F7FBFC;
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
          <h1 style="margin: 0;">Appointment Confirmed</h1>
          <p style="margin: 10px 0 0 0;">${config.practiceName}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Your appointment is confirmed</div>
            <p>Dear ${patient.firstName} ${patient.lastName},</p>
            <p>We're pleased to confirm your upcoming appointment at ${config.practiceName}.</p>
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="info-row">
              <span class="label">Service:</span>
              <span class="value">${service}</span>
            </div>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">${formattedDate}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${confirmedTime}</span>
            </div>
          </div>

          <div>
            <p>${message}</p>
          </div>

          <div class="section">
            <p>We look forward to seeing you. If you need to reschedule or have any questions, please call us at <strong>+1 (876) 691 9136</strong>.</p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated confirmation email.</p>
          <p>${config.practiceName} © ${new Date().getFullYear()}</p>
        </div>
      </body>
    </html>
  `;

  const plainText = `
    Dear ${patient.firstName} ${patient.lastName},

    Your appointment at ${config.practiceName} has been confirmed!

    Service: ${service}
    Date: ${formattedDate}
    Time: ${confirmedTime}

    We look forward to seeing you. If you need to reschedule, please call us at +1 (876) 691 9136.

    Thank you for choosing ${config.practiceName}.
  `;

  if (patient.contactMethod === 'email') {
    try {
      await resend.emails.send({
        from: config.from,
        to: patient.email,
        subject: `Your appointment is confirmed – ${config.practiceName}`,
        html: emailHtml,
        text: plainText,
      });
      console.log('Confirmation email sent to', patient.email);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  } else if (patient.contactMethod === 'whatsapp') {
    console.log('Twilio SID exists:', !!process.env.TWILIO_ACCOUNT_SID);
    console.log('Twilio token exists:', !!process.env.TWILIO_AUTH_TOKEN);
    console.log('WhatsApp from:', process.env.TWILIO_WHATSAPP_NUMBER);
    try {
      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:+18767922584`,
        body: plainText,
      });
    } catch (error) {
      console.error('Failed to send WhatsApp confirmation:', error);
    }
  }
}

export async function sendReminderToPatient(
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: string | null;
  },
  confirmedDate: string,
  confirmedTime: string,
  service: string
) {
  const formattedDate = new Date(confirmedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Helvetica, sans-serif;
            line-height: 1.6;
            color: #F7FBFC;
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
          <h1 style="margin: 0;">Appointment Reminder</h1>
          <p style="margin: 10px 0 0 0;">${config.practiceName}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <p>Dear ${patient.firstName} ${patient.lastName},</p>
            <p>This is a friendly reminder that you have an appointment tomorrow at ${config.practiceName}.</p>
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="info-row">
              <span class="label">Service:</span>
              <span class="value">${service}</span>
            </div>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">${formattedDate}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${confirmedTime}</span>
            </div>
          </div>

          <div class="section">
            <p>We look forward to seeing you. If you need to cancel or reschedule, please call us at <strong>+1 (876) 691 9136</strong>.</p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated reminder email.</p>
          <p>${config.practiceName} © ${new Date().getFullYear()}</p>
        </div>
      </body>
    </html>
  `;

  const plainText = `Reminder: Your appointment at ${config.practiceName} is tomorrow, ${formattedDate} at ${confirmedTime}. Service: ${service}. Please call +1 (876) 691 9136 if you have questions.`;

  if (patient.contactMethod === 'email') {
    try {
      await resend.emails.send({
        from: config.from,
        to: patient.email,
        subject: `Reminder: Your appointment tomorrow at ${config.practiceName}`,
        html: emailHtml,
        text: plainText,
      });
      console.log(`Reminder email sent to ${patient.email}`);
    } catch (error) {
      console.error('Failed to send reminder email:', error);
    }
  } else if (patient.contactMethod === 'whatsapp') {
     try {
      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:${patient.phone}`,
        body: plainText,
      });
      console.log(`WhatsApp reminder sent to ${patient.phone}`);
    } catch (error) {
      console.error('Failed to send WhatsApp reminder:', error);
    }
  }
}

export async function sendRescheduleNotification(
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: string | null;
  },
  newDate: string,
  newTime: string,
  service: string
) {
  const formattedDate = new Date(newDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Helvetica, sans-serif;
            line-height: 1.6;
            color: #F7FBFC;
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
          <h1 style="margin: 0;">Appointment Rescheduled</h1>
          <p style="margin: 10px 0 0 0;">${config.practiceName}</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">Your appointment is confirmed</div>
            <p>Dear ${patient.firstName} ${patient.lastName},</p>
            <p>We're pleased to confirm your upcoming appointment at ${config.practiceName}.</p>
          </div>

          <div class="section">
            <div class="section-title">Appointment Details</div>
            <div class="info-row">
              <span class="label">Service:</span>
              <span class="value">${service}</span>
            </div>
            <div class="info-row">
              <span class="label">Date:</span>
              <span class="value">${formattedDate}</span>
            </div>
            <div class="info-row">
              <span class="label">Time:</span>
              <span class="value">${newTime}</span>
            </div>
          </div>

          <div class="section">
            <p>We look forward to seeing you. If you need to reschedule or have any questions, please call us at <strong>+1 (876) 691 9136</strong>.</p>
          </div>
        </div>

        <div class="footer">
          <p>This is an automated confirmation email.</p>
          <p>${config.practiceName} © ${new Date().getFullYear()}</p>
        </div>
      </body>
    </html>
  `;
  const plainText = `Your appointment at ${config.practiceName} has been rescheduled to ${formattedDate} at ${newTime}. Service: ${service}. Please call us if this doesn't work.`;

  if (patient.contactMethod === 'email') {
    await resend.emails.send({
      from: config.from,
      to: patient.email,
      subject: `Your appointment has been rescheduled – ${config.practiceName}`,
      html: emailHtml,
      text: plainText,
    });
  } else if (patient.contactMethod === 'whatsapp') {
    // WhatsApp integration (if implemented)
  }
}