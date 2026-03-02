'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lang, TKey, getT } from './i18n';

interface LangContextValue {
  lang: Lang;
  t: (key: TKey) => string;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: 'en',
  t: (key) => key,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // Persist preference
  useEffect(() => {
    const stored = localStorage.getItem('dojo_lang') as Lang | null;
    if (stored === 'en' || stored === 'ja') setLang(stored);
  }, []);

  function toggle() {
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'ja' : 'en';
      localStorage.setItem('dojo_lang', next);
      return next;
    });
  }

  return (
    <LangContext.Provider value={{ lang, t: getT(lang), toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
