import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ensureUniqueSlug } from '@/lib/slug';

export async function GET() {
  const list = await prisma.instructorProfile.findMany({
    where: { OR: [{ slug: null }, { slug: '' }] },
    include: { user: true },
  });

  let count = 0;
  for (const p of list) {
    const base = (p as any).displayName || p.user?.name || `instructor-${p.id.slice(-6)}`;
    const slug = await ensureUniqueSlug(base, async (s) => {
      const hit = await prisma.instructorProfile.findUnique({ where: { slug: s } });
      return !!hit;
    });
    await prisma.instructorProfile.update({ where: { id: p.id }, data: { slug } });
    count++;
  }

  return NextResponse.json({ ok: true, updated: count });
}
