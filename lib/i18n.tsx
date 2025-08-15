'use client';
import {createContext, useContext} from 'react';

type Dict = Record<string, any>;
type Ctx = {locale: 'en'|'fa'; t: (path: string) => string; messages: Dict};

const I18nCtx = createContext<Ctx>({locale:'en', t:(k)=>k, messages:{}});

export function I18nProvider({locale, messages, children}:{locale:'en'|'fa'; messages:Dict; children:React.ReactNode}){
  function t(path: string){
    return path.split('.').reduce((o, k) => (o ? o[k] : undefined), messages) ?? path;
  }
  return <I18nCtx.Provider value={{locale, t, messages}}>{children}</I18nCtx.Provider>;
}

export function useI18n(){ return useContext(I18nCtx); }
