import { Facebook, Instagram } from "lucide-react";

import { navLinks, site } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { useLanguage } from "@/lib/i18n";

export function Footer() {
  const { content: c } = useLanguage();
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-foreground">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {c.footer.tagline}
            </p>
          </div>

          <nav aria-label={c.footer.navigation}>
             <p className="eyebrow text-muted-foreground">{c.footer.navigation}</p>
            <ul className="mt-4 space-y-2">
               {navLinks.map((link, index) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                     {c.nav.links[index]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
             <p className="eyebrow text-muted-foreground">{c.footer.follow}</p>
            <div className="mt-4 flex gap-3">
              <a
                href={site.socials.instagram}
                 aria-label={c.footer.instagram}
                className="flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-background"
              >
                <Instagram className="size-5" aria-hidden="true" />
              </a>
              <a
                href={site.socials.facebook}
                 aria-label={c.footer.facebook}
                className="flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-background"
              >
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
           © 2026 {site.name}. {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
