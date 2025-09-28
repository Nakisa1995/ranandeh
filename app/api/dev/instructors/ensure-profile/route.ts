// app/api/dev/instructors/ensure-profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUniqueSlug } from "@/lib/slug";

// ⬇️ برای جلوگیری از cache و خطای build روی Vercel
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = String(body?.userId || "");
    const displayName = body?.displayName as string | undefined;

    if (!userId) {
      return NextResponse.json({ ok: false, error: "userId is required" }, { status: 400 });
    }

    // اگر پروفایل نبود، بساز
    let profile = await prisma.instructorProfile.findUnique({ where: { userId } });

    if (!profile) {
      profile = await prisma.instructorProfile.create({
        data: {
          user: { connect: { id: userId } }, // اتصال به کاربر
          city: "", // چون city تو اسکیمات اجباریه
          ...(displayName ? ({ displayName } as any) : {}),
        },
      });
    }

    // اگر slug نداشت، بساز
    if (!profile.slug || profile.slug === "") {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const base = displayName || user?.name || `instructor-${profile.id.slice(-6)}`;

      const slug = await ensureUniqueSlug(base, async (s) => {
        const hit = await prisma.instructorProfile.findUnique({ where: { slug: s } });
        return !!hit;
      });

      await prisma.instructorProfile.update({
        where: { id: profile.id },
        data: { slug },
      });

      profile = { ...profile, slug };
    }

    return NextResponse.json({ ok: true, profile });
  } catch (e) {
    console.error("[ensure-profile] error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
