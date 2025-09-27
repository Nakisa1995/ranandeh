import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";           // ← اگر پراژکتت lib/db دارد همان را بگذار
import { hashPassword } from "@/lib/hash";
import type { Prisma } from "@prisma/client";

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

    // ایمیل تکراری
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const passwordHash = await hashPassword(data.password);

    // پروفایل را طبق تایپ Prisma بسازیم
    const profileCreate: Prisma.InstructorProfileCreateWithoutUserInput = {
      city: data.city,
      postcode: data.postcode ?? undefined,
      phone: data.phone ?? undefined,
      bio: data.bio ?? undefined,
      rating: 0,
      verified: false,
      // اگر در اسکیمات displayName داری می‌تونی اینجا ست کنی:
      // displayName: data.name,
    };

    // اگر فیلدی برای نرخ داری (مثلاً ratePerHour یا hourlyRate) اینجا به‌صورت امن ست می‌کنیم
    if (data.hourlyRate != null) {
      (profileCreate as any).ratePerHour = data.hourlyRate;
      (profileCreate as any).hourlyRate = data.hourlyRate;
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        role: "INSTRUCTOR",
        passwordHash,
        instructorProfile: {
          create: profileCreate,
        },
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
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
