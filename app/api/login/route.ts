// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signSession } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: 'Email & password required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // ساخت توکن سشن
    const token = await signSession({ sub: user.id, email: user.email, name: user.name });

    const res = NextResponse.json({ ok: true });
    res.cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 روز
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 });
  }
}
