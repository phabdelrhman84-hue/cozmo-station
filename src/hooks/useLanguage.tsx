"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { Locale } from "@/types";
import arDict from "@/dictionaries/ar.json";
import enDict from "@/dictionaries/en.json";

type DictType = typeof arDict;

interface LanguageContextType {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dict: DictType;
}

const dictionaries: Record<Locale, DictType> = { ar: arDict, en: enDict };

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("cozmo-locale") as Locale | null;
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    localStorage.setItem("cozmo-locale", locale);
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const dict = dictionaries[locale];

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let result: unknown = dict;
      for (const k of keys) {
        if (result && typeof result === "object" && k in result) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof result === "string" ? result : key;
    },
    [dict]
  );

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dir: locale === "ar" ? "rtl" : "ltr",
        setLocale,
        t,
        dict,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
