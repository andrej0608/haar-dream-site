import { Facebook, Instagram } from "lucide-react";

import { navLinks, site } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl text-foreground">{site.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Warme, persoonlijke haarzorg in het hart van {site.address.city.split(" ")[1]}.
              Demo-website met voorbeeldgegevens.
            </p>
          </div>

          <nav aria-label="Navigatie in de voettekst">
            <p className="eyebrow text-muted-foreground">Navigatie</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-muted-foreground">Volg ons</p>
            <div className="mt-4 flex gap-3">
              <a
                href={site.socials.instagram}
                aria-label="Instagram (voorbeeldlink)"
                className="flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-background"
              >
                <Instagram className="size-5" aria-hidden="true" />
              </a>
              <a
                href={site.socials.facebook}
                aria-label="Facebook (voorbeeldlink)"
                className="flex size-11 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-background"
              >
                <Facebook className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-6 text-xs text-muted-foreground">
          © 2026 {site.name}. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}
