import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { en } from "./en";
import { nl, type Dict } from "./nl";

export type Language = "nl" | "en";
const dicts: Record<Language, Dict> = { nl, en };
const Ctx = createContext<{ language: Language; setLanguage: (l: Language) => void; t: Dict }>({ language: "nl", setLanguage: () => {}, t: nl });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl");
  const pendingScrollPosition = useRef<number | null>(null);
  const changeLanguage = useCallback((nextLanguage: Language) => {
    pendingScrollPosition.current = window.scrollY;
    setLanguage(nextLanguage);
  }, []);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") setLanguage("en");
  }, []);
  useLayoutEffect(() => {
    if (pendingScrollPosition.current === null) return;
    const scrollPosition = pendingScrollPosition.current;
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollPosition);
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, scrollPosition);
      root.style.scrollBehavior = previousScrollBehavior;
    });
    pendingScrollPosition.current = null;
    return () => window.cancelAnimationFrame(frame);
  }, [language]);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = dicts[language].meta.title;
  }, [language]);
  return <Ctx.Provider value={{ language, setLanguage: changeLanguage, t: dicts[language] }}>{children}</Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
export const useT = () => useContext(Ctx).t;
