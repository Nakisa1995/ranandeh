'use client';

import React, { createContext, useContext } from 'react';

type Dict = Record<string, any>;
type Ctx = {
  locale: 'en' | 'fa';
  t: (path: string) => string;
  messages: Dict;
};

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: 'en' | 'fa';
  messages: Dict;
  children: React.ReactNode;
}) {
  const t = (path: string) => {
    const parts = path.split('.');
    let cur: any = messages;
    for (const p of parts) {
      cur = cur?.[p];
    }
    return typeof cur === 'string' ? cur : path;
  };

  return (
    <I18nCtx.Provider value={{ locale, t, messages }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
