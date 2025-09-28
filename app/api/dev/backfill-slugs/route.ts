// app/api/dev/backfill-slugs/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUniqueSlug } from '@/lib/slug';

// ⬇️ برای جلوگیری از cache و error توی Vercel
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET() {
  try {
    const list = await prisma.instructorProfile.findMany({
      where: { OR: [{ slug: null }, { slug: '' }] },
      include: { user: true },
    });

    let count = 0;
    for (const p of list) {
      const base =
        (p as any).displayName ||
        p.user?.name ||
        `instructor-${p.id.slice(-6)}`;

      const slug = await ensureUniqueSlug(base, async (s) => {
        const hit = await prisma.instructorProfile.findUnique({ where: { slug: s } });
        return !!hit;
      });

      await prisma.instructorProfile.update({
        where: { id: p.id },
        data: { slug },
      });
      count++;
    }

    return NextResponse.json({ ok: true, updated: count });
  } catch (e) {
    console.error('[backfill-slugs] error:', e);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
