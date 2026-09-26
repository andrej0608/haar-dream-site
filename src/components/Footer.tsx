import { Facebook, Instagram } from "lucide-react";
import { navLinks, site } from "@/config/site";
import { useT } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/scroll";

export function Footer() {
  const t = useT();
  const f = t.footer;
  return <footer className="border-t border-border bg-surface"><div className="mx-auto max-w-6xl px-5 py-16 sm:px-8"><div className="grid gap-10 md:grid-cols-3"><div><p className="font-display text-2xl">{site.name}</p><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">{f.tagline} {f.demo}</p></div><nav aria-label={f.navLabel}><p className="eyebrow text-muted-foreground">{f.navTitle}</p><ul className="mt-4 space-y-2">{navLinks.map((link) => <li key={link.href}><button type="button" onClick={() => scrollToSection(link.href)} className="text-sm text-foreground transition-colors hover:text-primary">{t.nav.links[link.key]}</button></li>)}</ul></nav><div><p className="eyebrow text-muted-foreground">{f.follow}</p><div className="mt-4 flex gap-3"><a href={site.socials.instagram} aria-label={f.instagram} className="flex size-11 items-center justify-center rounded-md border border-border text-foreground hover:bg-background"><Instagram className="size-5" /></a><a href={site.socials.facebook} aria-label={f.facebook} className="flex size-11 items-center justify-center rounded-md border border-border text-foreground hover:bg-background"><Facebook className="size-5" /></a></div></div></div><p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">© 2026 {site.name}. {f.rights}</p></div></footer>;
}