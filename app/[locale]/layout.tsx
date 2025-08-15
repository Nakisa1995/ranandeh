// app/[locale]/layout.tsx
import {I18nProvider} from '@/lib/i18n';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children, params:{locale}
}:{children:React.ReactNode; params:{locale:'en'|'fa'}}){
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const dir = locale === 'fa' ? 'rtl' : 'ltr';

  return (
    <I18nProvider locale={locale} messages={messages}>
      <div dir={dir}>
        <Header />
        <main className="container py-8">{children}</main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
