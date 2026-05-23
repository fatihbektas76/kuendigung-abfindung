'use client';

import { createContext, useContext, useState, useMemo } from 'react';
import type { AllgemeinTranslations, Locale } from './translations';
import { allgemeinTranslations } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: AllgemeinTranslations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('de');

  const value = useMemo(
    () => ({ locale, setLocale, t: allgemeinTranslations[locale] }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
