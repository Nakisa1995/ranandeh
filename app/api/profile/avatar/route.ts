// app/api/profile/avatar/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/lib/auth'; // اگر authOptions را جای دیگری اکسپورت کرده‌ای، مسیر را مطابق پروژه‌ات تنظیم کن
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  if (!session?.user) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get('file') as File | null;
  if (!file) return NextResponse.json({ ok: false, error: 'No file' }, { status: 400 });

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: 'Max 5MB' }, { status: 413 });
  }

  const mime = file.type;
  const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!allowed.includes(mime)) {
    return NextResponse.json({ ok: false, error: 'Invalid type' }, { status: 415 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  let ext = '.png';
  if (mime === 'image/jpeg' || mime === 'image/jpg') ext = '.jpg';
  else if (mime === 'image/webp') ext = '.webp';

  const userId = (session.user as any).id || session.user.email!.replace(/[^a-z0-9]/gi, '');
  const folder = join(process.cwd(), 'public', 'avatars');
  await mkdir(folder, { recursive: true });

  const filepath = join(folder, `${userId}${ext}`);
  await writeFile(filepath, buf);

  const publicUrl = `/avatars/${userId}${ext}`;
  return NextResponse.json({ ok: true, url: publicUrl });
}
