// app/[locale]/auth/login/page.tsx
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import HoverCard from '@/components/HoverCard';
import LoginForm from '@/components/auth/LoginForm';

type Locale = 'en' | 'fa';

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const t = {
    noAcc: { en: "Don't have an account?", fa: 'حساب ندارید؟' },
    register: { en: 'Create one', fa: 'ساخت حساب' },
  };

  return (
    <>
      {/* هدر بالا (هم‌استایل با بقیه صفحات) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <AuthHeader locale={locale} />
      </div>

      {/* فرم داخل HoverCard شیشه‌ای؛ وسط بند */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <HoverCard className="w-full p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-2xl" dir={dir}>
            {/* فرم لاگین متصل به NextAuth */}
            <LoginForm locale={locale} />

            {/* لینک ثبت‌نام زیر فرم */}
            <p className="mt-4 text-sm opacity-80 text-center">
              {t.noAcc[locale]}{' '}
              <Link
                href={`/${locale}/auth/register`}
                className="underline decoration-dotted hover:opacity-100"
              >
                {t.register[locale]}
              </Link>
            </p>
          </div>
        </HoverCard>
      </section>
    </>
  );
}
