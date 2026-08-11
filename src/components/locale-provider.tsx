"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  LOCALE_STORAGE_KEY,
  defaultLocale,
  detectBrowserLocale,
  isLocale,
  messages,
  toggleLocale,
  type Locale,
} from "@/lib/i18n";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: (typeof messages)[Locale];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyLocale(locale: Locale) {
  document.documentElement.setAttribute("lang", locale);
  document.documentElement.setAttribute("data-locale", locale);
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event("locale-change"));
}

/**
 * Resolve active locale:
 * 1. User choice in localStorage (KO/EN toggle)
 * 2. data-locale set by init script (browser language / Seoul TZ)
 * 3. Live browser detection
 * 4. English default
 */
function readLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;

  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* ignore */
  }

  const attr = document.documentElement.getAttribute("data-locale");
  if (isLocale(attr)) return attr;

  return detectBrowserLocale();
}

function subscribe(onChange: () => void) {
  window.addEventListener("locale-change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("locale-change", onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readLocale,
    (): Locale => defaultLocale,
  );

  const setLocale = useCallback((next: Locale) => {
    applyLocale(next);
  }, []);

  const toggle = useCallback(() => {
    applyLocale(toggleLocale(readLocale()));
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      toggle,
      t: messages[locale],
    }),
    [locale, setLocale, toggle],
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
