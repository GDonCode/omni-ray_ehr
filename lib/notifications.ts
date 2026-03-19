import { Resend } from 'resend';
import twilio from 'twilio';

const resend = new Resend(process.env.RESEND_API_KEY);
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

const EMAIL_CONFIG = {
  testing: {
    from: 'Dental Practice <onboarding@resend.dev>',
    practiceName: 'Dental Practice (Test Mode)',
  },
  production: {
    from: 'Aurelia Dental <appointments@aureliadental.com>',
    practiceName: 'Aurelia Dental',
  },
};

const ENV = 'testing' as const; //const ENV = (process.env.NODE_ENV === 'production' ? 'production' : 'testing') as 'testing' | 'production';
const config = EMAIL_CONFIG[ENV];

// Format date as "Monday, January 1, 2026"
const formatDateLong = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time to 12‑hour (e.g., "2:00 PM")
const formatTimeTo12Hour = (time: string): string => {
  if (time.includes('AM') || time.includes('PM')) return time;
  const [hourStr, minute] = time.split(':');
  const hour = parseInt(hourStr, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${suffix}`;
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
  const formattedDate = formatDateLong(confirmedDate);
  const formattedTime = formatTimeTo12Hour(confirmedTime);

  const content = `
    <tr>
      <td style="background-color:#058080; padding:30px 20px; text-align:center; border-radius:8px 8px 0 0;">
        <h1 style="margin:0; color:#faf9f6; font-size:28px; font-weight:bold;">Appointment Confirmed</h1>
        <p style="margin:10px 0 0 0; color:#faf9f6; font-size:20px;">${config.practiceName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px; background-color:#ffffff; border-left:1px solid #ddd; border-right:1px solid #ddd; border-bottom:1px solid #ddd; border-radius:0 0 8px 8px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Your appointment is confirmed</td>
          </tr>
          <tr>
            <td style="padding-top:10px;">Dear ${patient.firstName} ${patient.lastName},</td>
          </tr>
          <tr>
            <td style="padding-top:10px;">We're pleased to confirm your upcoming appointment at ${config.practiceName}.</td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Appointment Details</td>
          </tr>
          <tr>
            <td style="padding-top:10px;">
              <table width="100%" cellpadding="5" cellspacing="0" border="0">
                <tr>
                  <td width="120" style="font-weight:bold; color:#555;">Service:</td>
                  <td style="color:#333;">${service}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold; color:#555;">Date:</td>
                  <td style="color:#333;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="font-weight:bold; color:#555;">Time:</td>
                  <td style="color:#333;">${formattedTime}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        ${message ? `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Message from the practice</td>
          </tr>
          <tr>
            <td style="background-color:#f0f8fa; padding:15px; border-left:4px solid #058080; border-radius:4px; margin-top:10px; color:#181818;">
              ${message}
            </td>
          </tr>
        </table>
        ` : ''}

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-top:20px; border-top:2px solid #ddd; font-size:16px; color:#777; text-align:center;">
              <p>We look forward to seeing you. If you need to reschedule or have any questions, please call us at <strong>+1 (876) 691 9136</strong>.</p>
              <p style="margin-top:15px;">This is an automated confirmation email.</p>
              <p>${config.practiceName} © ${new Date().getFullYear()}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  `;

  const emailHtml = baseEmailWrapper(content);
  const plainText = `
Dear ${patient.firstName} ${patient.lastName},

Your appointment at ${config.practiceName} has been confirmed!

Service: ${service}
Date: ${formattedDate}
Time: ${formattedTime}

${message ? `Message from the practice: ${message}\n` : ''}
We look forward to seeing you. If you need to reschedule, please call us at +1 (876) 691 9136.

Thank you for choosing ${config.practiceName}.
  `.trim();

  // Always send email for confirmation
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
    throw error; // Re-throw so caller knows it failed
  }

  // Optionally send WhatsApp if contact method is WhatsApp
  if (patient.contactMethod === 'whatsapp') {
    try {
      await twilioClient.messages.create({
        from: process.env.TWILIO_WHATSAPP_NUMBER,
        to: `whatsapp:+18767922584`,
        body: plainText,
      });
    } catch (error) {
      console.error('Failed to send WhatsApp confirmation:', error);
      // Don't throw – email already sent, WhatsApp is bonus
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
  const formattedDate = formatDateLong(confirmedDate);
  const formattedTime = formatTimeTo12Hour(confirmedTime);

  const content = `
    <tr>
      <td style="background-color:#058080; padding:30px 20px; text-align:center; border-radius:8px 8px 0 0;">
        <h1 style="margin:0; color:#faf9f6; font-size:28px;">Appointment Reminder</h1>
        <p style="margin:10px 0 0 0; color:#faf9f6; font-size:20px;">${config.practiceName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px; background-color:#ffffff; border-left:1px solid #ddd; border-right:1px solid #ddd; border-bottom:1px solid #ddd; border-radius:0 0 8px 8px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr><td style="padding-bottom:10px;">Dear ${patient.firstName} ${patient.lastName},</td></tr>
          <tr><td style="padding-bottom:10px;">This is a friendly reminder that you have an appointment tomorrow at ${config.practiceName}.</td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Appointment Details</td>
          </tr>
          <tr>
            <td style="padding-top:10px;">
              <table width="100%" cellpadding="5" cellspacing="0" border="0">
                <tr><td width="120" style="font-weight:bold; color:#555;">Service:</td><td style="color:#333;">${service}</td></tr>
                <tr><td style="font-weight:bold; color:#555;">Date:</td><td style="color:#333;">${formattedDate}</td></tr>
                <tr><td style="font-weight:bold; color:#555;">Time:</td><td style="color:#333;">${formattedTime}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-top:20px; border-top:2px solid #ddd; font-size:16px; color:#777; text-align:center;">
              <p>We look forward to seeing you. If you need to cancel or reschedule, please call us at <strong>+1 (876) 691 9136</strong>.</p>
              <p style="margin-top:15px;">This is an automated reminder email.</p>
              <p>${config.practiceName} © ${new Date().getFullYear()}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  `;

  const emailHtml = baseEmailWrapper(content);
  const plainText = `Reminder: Your appointment at ${config.practiceName} is tomorrow, ${formattedDate} at ${formattedTime}. Service: ${service}. Please call +1 (876) 691 9136 if you have questions.`;

  // Always send email for reminder
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
    throw error; // Re-throw so caller knows it failed
  }

  // Optionally send WhatsApp
  if (patient.contactMethod === 'whatsapp') {
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

// sendRescheduleNotification remains unchanged (optional WhatsApp)

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
  service: string,
  message?: string
) {
  const formattedDate = formatDateLong(newDate);
  const formattedTime = formatTimeTo12Hour(newTime);

  const content = `
    <tr>
      <td style="background-color:#058080; padding:30px 20px; text-align:center; border-radius:8px 8px 0 0;">
        <h1 style="margin:0; color:#faf9f6; font-size:28px;">Appointment Rescheduled</h1>
        <p style="margin:10px 0 0 0; color:#faf9f6; font-size:20px;">${config.practiceName}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:30px; background-color:#ffffff; border-left:1px solid #ddd; border-right:1px solid #ddd; border-bottom:1px solid #ddd; border-radius:0 0 8px 8px;">
        
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr><td style="padding-bottom:10px;">Dear ${patient.firstName} ${patient.lastName},</td></tr>
          <tr><td style="padding-bottom:10px;">Your appointment at ${config.practiceName} has been rescheduled.</td></tr>
        </table>

        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">New Appointment Details</td>
          </tr>
          <tr>
            <td style="padding-top:10px;">
              <table width="100%" cellpadding="5" cellspacing="0" border="0">
                <tr><td width="120" style="font-weight:bold; color:#555;">Service:</td><td style="color:#333;">${service}</td></tr>
                <tr><td style="font-weight:bold; color:#555;">Date:</td><td style="color:#333;">${formattedDate}</td></tr>
                <tr><td style="font-weight:bold; color:#555;">Time:</td><td style="color:#333;">${formattedTime}</td></tr>
              </table>
            </td>
          </tr>
        </table>

        ${
          message
            ? `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:25px;">
          <tr>
            <td style="font-size:20px; font-weight:bold; color:#058080; border-bottom:2px solid #058080; padding-bottom:5px; margin-bottom:10px;">Message from the practice</td>
          </tr>
          <tr>
            <td style="background-color:#f0f8fa; padding:15px; border-left:4px solid #058080; border-radius:4px; margin-top:10px; color:#181818;">
              ${message}
            </td>
          </tr>
        </table>
        `
            : ''
        }

        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-top:20px; border-top:2px solid #ddd; font-size:16px; color:#777; text-align:center;">
              <p>We look forward to seeing you. If this new time doesn't work, please call us at <strong>+1 (876) 691 9136</strong>.</p>
              <p style="margin-top:15px;">This is an automated reschedule notification.</p>
              <p>${config.practiceName} © ${new Date().getFullYear()}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  `;

  const emailHtml = baseEmailWrapper(content);
  const plainText = `Your appointment at ${config.practiceName} has been rescheduled to ${formattedDate} at ${formattedTime}. Service: ${service}.${
    message ? `\nMessage from the practice: ${message}` : ''
  }\nPlease call us if this doesn't work.`;

  if (patient.contactMethod === 'email') {
    try {
      await resend.emails.send({
        from: config.from,
        to: patient.email,
        subject: `Your appointment has been rescheduled – ${config.practiceName}`,
        html: emailHtml,
        text: plainText,
      });
    } catch (error) {
      console.error('Failed to send reschedule email:', error);
    }
  } else if (patient.contactMethod === 'whatsapp') {
    // WhatsApp integration
  }
}