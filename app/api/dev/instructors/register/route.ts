import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";           // اگر مسیرت فرق دارد، همین‌جا اصلاحش کن
import { hashPassword } from "@/lib/hash";
import type { Prisma } from "@prisma/client";

// ⬇️ برای جلوگیری از collect/caching در مرحله‌ی build روی Vercel
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  city: z.string().min(2),
  postcode: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  hourlyRate: z.coerce.number().int().min(0).optional().nullable(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    // ایمیل را نرمالایز کن (برای جلوگیری از تکراری با حروف بزرگ/کوچک)
    const emailNorm = data.email.trim().toLowerCase();

    // چک تکراری بودن ایمیل
    const exists = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await hashPassword(data.password);

    // ساخت پروفایل مربی
    const profileCreate: Prisma.InstructorProfileCreateWithoutUserInput = {
      city: data.city,
      postcode: data.postcode ?? undefined,
      phone: data.phone ?? undefined,
      bio: data.bio ?? undefined,
      rating: 0,
      verified: false,
      // اگر در اسکیمات displayName داری:
      // displayName: data.name,
    };

    // اگر فیلد نرخ در اسکیمات داری، هر دو نام رایج را پوشش بده
    if (data.hourlyRate != null) {
      (profileCreate as any).ratePerHour = data.hourlyRate;
      (profileCreate as any).hourlyRate = data.hourlyRate;
    }

    const user = await prisma.user.create({
      data: {
        email: emailNorm,
        name: data.name,
        role: "INSTRUCTOR",
        passwordHash,
        instructorProfile: { create: profileCreate },
      },
    });

    return NextResponse.json({ ok: true, userId: user.id }, { status: 201 });
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json(
        { error: err.issues?.[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }
    console.error("[dev/instructors/register] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
