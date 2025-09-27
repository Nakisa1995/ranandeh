import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: 'Email & password required.' }, { status: 400 });
    }

    const emailNorm = String(email).trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (exists) {
      return NextResponse.json({ ok: false, error: 'User already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    await prisma.user.create({
      data: { email: emailNorm, name: name?.trim() || null, passwordHash },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
