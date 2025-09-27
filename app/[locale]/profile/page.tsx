// app/[locale]/profile/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";            // ← از lib/auth می‌آد (default import)
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/profile/ProfileForm";

type Locale = "en" | "fa";

export default async function ProfilePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/${locale}/auth/login?callbackUrl=/${locale}/profile`);
  }

  // NextAuth تایپ id را به‌صورت پیش‌فرض ندارد، پس امن بخوان:
  const userId = (session.user as any)?.id as string | undefined;
  const email = session.user?.email as string | undefined;

  const user = await prisma.user.findUnique({
    where: userId ? { id: userId } : { email: email! },
    select: {
      id: true,
      email: true,
      name: true,
      instructorProfile: {
        select: {
          city: true,
          postcode: true,
          address: true,
          phone: true,
          bio: true,
          rating: true,
          verified: true,
          // اگر ستون آواتار داری، این خط را هم باز کن:
          // avatarUrl: true,
        },
      },
    },
  });

  const p = user?.instructorProfile;

  const initial = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    city: p?.city ?? "",
    postcode: p?.postcode ?? "",
    address: p?.address ?? "",
    phone: p?.phone ?? "",
    bio: p?.bio ?? "",
    rating: (p?.rating ?? null) as number | null,
    verified: p?.verified ?? false,
    // اگر ستون آواتار داری، این را از DB ست کن:
    avatarUrl: "", // p?.avatarUrl ?? ""
  };

  return <ProfileForm locale={locale} initial={initial} />;
}
