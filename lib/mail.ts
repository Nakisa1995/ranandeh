import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST!;
const port = Number(process.env.SMTP_PORT || 465);
const secure = String(process.env.SMTP_SECURE || 'true') === 'true';

const user = process.env.SMTP_USER!;
const pass = process.env.SMTP_PASS!;
const from = process.env.MAIL_FROM || user;

if (!host || !user || !pass) {
  // روی سرور اگر خالی باشه، لاگ واضح بده
  console.warn('[mail] Missing SMTP envs. Check .env.production');
}

export const mailer = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

export async function sendMail(opts: { to?: string; subject: string; html: string; text?: string }) {
  const to = opts.to || process.env.MAIL_TO || from;
  return mailer.sendMail({
    from,
    to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
}
