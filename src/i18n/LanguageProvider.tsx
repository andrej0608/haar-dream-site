import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { en } from "./en";
import { nl, type Dict } from "./nl";

export type Language = "nl" | "en";
const dicts: Record<Language, Dict> = { nl, en };
const Ctx = createContext<{ language: Language; setLanguage: (l: Language) => void; t: Dict }>({ language: "nl", setLanguage: () => {}, t: nl });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") setLanguage("en");
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = dicts[language].meta.title;
  }, [language]);
  return <Ctx.Provider value={{ language, setLanguage, t: dicts[language] }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
