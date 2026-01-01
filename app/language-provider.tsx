"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "ar" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: "rtl" | "ltr";
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");
  const direction = language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = language === "ar" ? "ar" : "en";
    document.documentElement.dir = direction;
  }, [direction, language]);

  const value = useMemo(
    () => ({ language, setLanguage, direction }),
    [direction, language],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
