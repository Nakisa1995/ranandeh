// app/[locale]/auth/register/page.tsx
import Link from 'next/link';
import AuthHeader from '@/components/AuthHeader';
import HoverCard from '@/components/HoverCard';
import RegisterForm from '@/components/auth/RegisterForm';

type Locale = 'en' | 'fa';

export default function RegisterPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  const t = {
    have: { en: 'Have an account?', fa: 'حساب دارید؟' },
    login: { en: 'Log in', fa: 'ورود' },
  };

  return (
    <>
      {/* هدر بالای فرم (هم‌استایل با بقیه صفحات) */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <AuthHeader locale={locale} />
      </div>

      {/* فرم داخل HoverCard شیشه‌ای؛ وسطِ گرید قرار می‌گیره */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <HoverCard className="w-full p-4 sm:p-6 lg:p-8">
          <div dir={dir} className="mx-auto w-full max-w-2xl">
            {/* 🔹 فقط این خط؛ فرم قدیمی حذف شد */}
            <RegisterForm locale={locale} />

            {/* متن پایین فرم مثل قبلِ خودت */}
            <p className="mt-4 text-sm opacity-80 text-center">
              {t.have[locale]}{' '}
              <Link
                href={`/${locale}/auth/login`}
                className="underline decoration-dotted hover:opacity-100"
              >
                {t.login[locale]}
              </Link>
            </p>
          </div>
        </HoverCard>
      </section>
    </>
  );
}
