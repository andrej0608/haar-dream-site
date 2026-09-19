import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { useLanguage, type Language } from "@/lib/i18n";

function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center border border-border" aria-label="Language / Taal">
      {(["nl", "en"] as Language[]).map((item) => (
        <button key={item} type="button" onClick={() => setLanguage(item)} aria-pressed={language === item} className={cn("h-9 text-xs font-medium uppercase transition-colors", compact ? "px-2" : "px-3", language === item ? "bg-foreground text-background" : "bg-background text-muted-foreground hover:text-foreground")}>{item}</button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { content: c } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (hash: string) => {
    setOpen(false);
    scrollToSection(hash);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-background",
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button
          type="button"
          onClick={() => go("#top")}
          className="font-display text-[1.375rem] font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {site.name}
        </button>

        <nav aria-label={c.nav.aria} className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link, index) => (
            <button
              key={link.href}
              type="button"
              onClick={() => go(link.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {c.nav.links[index]}
            </button>
          ))}
          <LanguageSwitch />
          <Button onClick={() => go("#afspraak")}>{c.nav.book}</Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch compact />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobiel-menu"
            aria-label={open ? c.nav.close : c.nav.open}
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobiel-menu" className="border-t border-border bg-background lg:hidden">
          <nav aria-label={c.nav.mobileAria} className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => go(link.href)}
                    className="w-full border-b border-border py-4 text-left font-display text-xl text-foreground"
                  >
                    {c.nav.links[index]}
                  </button>
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" size="lg" onClick={() => go("#afspraak")}>{c.nav.book}</Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
