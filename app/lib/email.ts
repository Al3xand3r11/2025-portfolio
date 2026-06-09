import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("SMTP environment variables are not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendConfirmationEmail(submission: ContactSubmission) {
  const transporter = getTransporter();
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER!;

  await transporter.sendMail({
    from: `"Brandon Nance" <${fromAddress}>`,
    to: submission.email,
    subject: `Got it — I'll be in touch`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Hey ${submission.name},
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #333;">
          Thanks for reaching out. I received your message about <strong>${submission.subject}</strong> and will get back to you soon.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
        <p style="font-size: 13px; color: #999;">
          — Brandon Nance · alexandernance.com
        </p>
      </div>
    `,
  });
}

export async function sendNotificationEmail(submission: ContactSubmission) {
  const transporter = getTransporter();
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER!;
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL environment variable is not set");
  }

  await transporter.sendMail({
    from: `"Contact Form" <${fromAddress}>`,
    to: ownerEmail,
    subject: `New contact: ${submission.subject} — ${submission.name}`,
    html: `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 24px;">
        <h2 style="font-size: 18px; font-weight: 600; margin-bottom: 24px;">New Contact Submission</h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666; width: 100px;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${submission.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">
              <a href="mailto:${submission.email}">${submission.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666;">Subject</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${submission.subject}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f9f9f9; border-radius: 6px;">
          <p style="font-size: 13px; color: #666; margin: 0 0 8px;">Message:</p>
          <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${submission.message}</p>
        </div>
      </div>
    `,
  });
}
