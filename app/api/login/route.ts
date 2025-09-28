// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signSession } from '@/lib/jwt';

// ⬇️ برای جلوگیری از collect در بیلد + اجرای Node.js
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, message: 'Email & password required' },
        { status: 400 }
      );
    }

    // ایمیل را نرمالایز کن تا جست‌وجو دقیق باشد
    const emailNorm = String(email).trim().toLowerCase();

    const user = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { ok: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const ok = await bcrypt.compare(String(password), user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // ساخت توکن سشن
    const token = await signSession({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production', // روی ورسل true می‌شود
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });

    return res;
  } catch (e) {
    console.error('[login] error:', e);
    return NextResponse.json(
      { ok: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
