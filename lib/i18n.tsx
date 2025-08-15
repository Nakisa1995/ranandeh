'use client';
import {createContext, useContext} from 'react';

interface Dict {
  [key: string]: string | Dict;
}

type Ctx = {
  locale: 'en' | 'fa';
  t: (path: string) => string;
  messages: Dict;
};

const I18nCtx = createContext<Ctx>({
  locale: 'en',
  t: (k) => k,
  messages: {},
});

function getByPath(messages: Dict, path: string): string | undefined {
  const parts = path.split('.');
  let cur: any = messages;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function I18nProvider({
  locale, messages, children
}:{locale:'en'|'fa'; messages:Dict; children:React.ReactNode}) {
  const t = (path: string) => getByPath(messages, path) ?? path;
  return <I18nCtx.Provider value={{locale, t, messages}}>{children}</I18nCtx.Provider>;
}

export function useI18n(){ return useContext(I18nCtx); }
