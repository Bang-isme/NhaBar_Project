"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_OPTIONS,
  LOCALE_STORAGE_KEY,
  getUi,
  isLocale,
  type Locale,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  ui: ReturnType<typeof getUi>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  const meta = LOCALE_OPTIONS.find((item) => item.code === locale);
  root.lang = meta?.htmlLang ?? locale;
  root.dataset.locale = locale;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const next = isLocale(stored) ? stored : DEFAULT_LOCALE;
    setLocaleState(next);
    applyDocumentLocale(next);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    applyDocumentLocale(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      ui: getUi(locale),
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
