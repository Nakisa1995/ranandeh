// app/api/dev/instructors/ensure-profile/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureUniqueSlug } from "@/lib/slug";

export async function POST(req: Request) {
  const body = await req.json();
  const userId = String(body?.userId || "");
  const displayName = body?.displayName as string | undefined;

  if (!userId) {
    return NextResponse.json({ ok: false, error: "userId is required" }, { status: 400 });
  }

  // اگر پروفایل نبود، بساز (Prisma: relation باید با connect ست شود)
  let profile = await prisma.instructorProfile.findUnique({ where: { userId } });

  if (!profile) {
    profile = await prisma.instructorProfile.create({
      data: {
        // فیلد رابطه
        user: { connect: { id: userId } },
        // فیلدهای اجباری اسکیمای تو (طبق ارور city اجباری است)
        city: "",
        // اگر در اسکیمات displayName داری، این خط اعمال می‌شود
        ...(displayName ? ({ displayName } as any) : {}),
      },
    });
  }

  // اگر اسلاگ نداشت، بساز
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
}
