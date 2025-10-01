import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendMail } from '@/lib/mail';

export const runtime = 'nodejs'; // روی Vercel/Node و VPS اوکی

const schema = z.object({
  name: z.string().min(2, { message: 'name too short' }).max(80),
  email: z.string().email(),
  message: z.string().min(10, { message: 'message too short' }).max(4000),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const data = schema.parse(json);

    // simple rate-limit بی‌دردسر: هر IP هر 15 ثانیه
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const key = `contact:${ip}`;
    // اگر Redis نداری، موقتاً بدون محدودیت هم میشه؛ این بخش اختیاریه

    const subject = `New contact from ${data.name} <${data.email}>`;
    const html = `
      <div style="font-family:system-ui,sans-serif">
        <h2>New contact</h2>
        <p><b>Name:</b> ${escapeHtml(data.name)}</p>
        <p><b>Email:</b> ${escapeHtml(data.email)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap">${escapeHtml(data.message)}</pre>
      </div>
    `;
    const text = `New contact\n\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

    await sendMail({ subject, html, text });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.name === 'ZodError') {
      return NextResponse.json({ ok: false, error: err.issues?.[0]?.message || 'Invalid' }, { status: 400 });
    }
    console.error('[contact] error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
