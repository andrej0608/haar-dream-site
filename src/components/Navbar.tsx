import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/config/site";
import { useLanguage, type Language } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div role="group" aria-label={t.lang.label} className="flex items-center rounded-md border border-border">
      {(["nl", "en"] as Language[]).map((value, index) => (
        <span key={value} className="flex items-center">
          {index === 1 ? <span aria-hidden="true" className="text-muted-foreground">|</span> : null}
          <button type="button" aria-pressed={language === value} onClick={() => setLanguage(value)} className={cn("flex h-11 min-w-11 items-center justify-center px-2 text-sm font-semibold uppercase transition-colors", language === value ? "text-primary" : "text-muted-foreground hover:text-foreground")}>{value}</button>
        </span>
      ))}
    </div>
  );
}

export function Navbar() {
  const t = useLanguage().t;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (hash: string) => { setOpen(false); scrollToSection(hash); };
  return (
    <header className={cn("sticky top-0 z-50 border-b transition-colors", scrolled ? "border-border bg-background/95 backdrop-blur-sm" : "border-transparent bg-background")}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
        <button type="button" onClick={() => go("#top")} className="font-display text-xl font-medium text-foreground sm:text-2xl">{site.name}</button>
        <nav aria-label={t.nav.main} className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => <button key={link.href} type="button" onClick={() => go(link.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t.nav.links[link.key]}</button>)}
          <Button onClick={() => go("#reserveren")}>{t.nav.book}</Button>
          <LanguageToggle />
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobiel-menu" aria-label={open ? t.nav.close : t.nav.open} className="flex size-11 shrink-0 items-center justify-center rounded-md border border-border text-foreground lg:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open ? <div id="mobiel-menu" className="border-t border-border bg-background lg:hidden"><nav aria-label={t.nav.mobile} className="mx-auto max-w-6xl px-5 py-6 sm:px-8"><ul>{navLinks.map((link) => <li key={link.href}><button type="button" onClick={() => go(link.href)} className="w-full border-b border-border py-4 text-left font-display text-xl text-foreground">{t.nav.links[link.key]}</button></li>)}</ul><div className="mt-6 flex items-center gap-3"><Button className="flex-1" size="lg" onClick={() => go("#reserveren")}>{t.nav.book}</Button><LanguageToggle /></div></nav></div> : null}
    </header>
  );
}
