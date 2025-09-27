// lib/instructors.ts
import type { InstructorProfile, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ensureUniqueSlug } from "./slug";

/**
 * اگر پروفایل اسلاگ نداشت برایش می‌سازد و همان را برمی‌گرداند.
 */
export async function ensureProfileSlug(profileId: string): Promise<string | null> {
  const profile = await prisma.instructorProfile.findUnique({
    where: { id: profileId },
    include: { user: true },
  });
  if (!profile) return null;
  if (profile.slug) return profile.slug;

  const base =
    (profile as any).displayName ||
    profile.user?.name ||
    `instructor-${profileId.slice(-6)}`;

  const slug = await ensureUniqueSlug(base, async (s) => {
    const hit = await prisma.instructorProfile.findUnique({ where: { slug: s } });
    return !!hit;
    // true یعنی اسلاگ گرفته شده، پس باید تکرار کنیم
  });

  await prisma.instructorProfile.update({ where: { id: profileId }, data: { slug } });
  return slug;
}

/** نوع کم‌دردسر برای ابجکت مربی که ممکن است فلت یا تو‌در‌تو باشد */
export type InstructorLike = Partial<User> & {
  instructorProfile?: Partial<InstructorProfile> | null;
  id?: string;
  slug?: string | null;
};

/** از آبجکت مربی، اول slug و اگر نبود id را برمی‌گرداند. */
export function getInstructorSlugOrId(ins: InstructorLike): string | undefined {
  return (ins.slug ?? ins.instructorProfile?.slug ?? ins.id ?? undefined) || undefined;
}

/** لینک پروفایل مربی بر اساس locale */
export function profileHrefFor(ins: InstructorLike, locale: "en" | "fa"): string {
  const slugOrId = getInstructorSlugOrId(ins);
  return slugOrId
    ? `/${locale}/instructors/${encodeURIComponent(String(slugOrId))}`
    : `/${locale}/instructors`;
}
