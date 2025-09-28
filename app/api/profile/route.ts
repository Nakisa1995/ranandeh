// app/api/profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/auth'; // ← مثل فایل [...nextauth] از default export استفاده می‌کنیم

// ⬇️ جلوگیری از collect در مرحله‌ی build + اجرای Node.js
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function PUT(req: Request) {
  try {
    // در App Router می‌تونیم فقط options بدیم
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => ({} as any));
    const { name, city, postcode, address, phone, bio, avatarUrl } = body ?? {};

    // کاربر را با id (اگر توی session هست) یا با ایمیل پیدا کن
    const where =
      (session.user as any)?.id
        ? { id: (session.user as any).id as string }
        : { email: String(session.user.email || '').toLowerCase() };

    const user = await prisma.user.findUnique({ where, select: { id: true } });
    if (!user) {
      return NextResponse.json({ ok: false, error: 'User not found' }, { status: 404 });
    }

    // به‌روزرسانی user + upsert پروفایل مربی
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { name: typeof name === 'string' ? name.trim() || null : undefined },
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
          // اگر فیلد avatarUrl در اسکیمای تو هست آن‌کامنت کن:
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
    console.error('[profile] error:', e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
