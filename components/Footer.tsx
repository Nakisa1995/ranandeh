'use client';

import {useI18n} from '@/lib/i18n';

export default function Footer(){
  const {t} = useI18n();
  return (
    <footer className="mt-16 border-t">
      <div className="container py-8 text-center text-sm opacity-80">
        {t('Footer.copy')} Hello Ranandeh
      </div>
    </footer>
  );
}
