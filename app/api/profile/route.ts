// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth'; // مسیرش را مطابق پروژه‌ات تنظیم کن

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions as NextAuthOptions);
    if (!session?.user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, city, postcode, address, phone, bio, avatarUrl } = body ?? {};

    // کاربر را با id (یا ایمیل) پیدا کن
    const user = await prisma.user.findUnique({
      where: (session.user as any).id
        ? { id: (session.user as any).id }
        : { email: session.user.email! },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json({ ok: false, error: 'User not found' }, { status: 404 });
    }

    // به‌روزرسانی user + upsert پروفایل مربی
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { name: name ?? undefined },
      }),
      prisma.instructorProfile.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          city: city ?? null,
          postcode: postcode ?? null,
          address: address ?? null,
          phone: phone ?? null,
          bio: bio ?? null,
          // اگر فیلد avatarUrl داری اینجا ست کن:
          // avatarUrl: avatarUrl ?? null,
        },
        update: {
          city: city ?? null,
          postcode: postcode ?? null,
          address: address ?? null,
          phone: phone ?? null,
          bio: bio ?? null,
          // avatarUrl: avatarUrl ?? null,
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
