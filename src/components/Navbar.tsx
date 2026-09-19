import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { navLinks, site } from "@/config/site";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
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
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 sm:px-8">
        <button type="button" onClick={() => go("#top")} className="font-display text-xl font-medium text-foreground sm:text-2xl">{site.name}</button>
        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => <button key={link.href} type="button" onClick={() => go(link.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{link.label}</button>)}
          <Button onClick={() => go("#reserveren")}>Reserveer een tafel</Button>
        </nav>
        <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobiel-menu" aria-label={open ? "Menu sluiten" : "Menu openen"} className="flex size-11 items-center justify-center rounded-md border border-border text-foreground lg:hidden">{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open ? <div id="mobiel-menu" className="border-t border-border bg-background lg:hidden"><nav aria-label="Mobiele navigatie" className="mx-auto max-w-6xl px-5 py-6 sm:px-8"><ul>{navLinks.map((link) => <li key={link.href}><button type="button" onClick={() => go(link.href)} className="w-full border-b border-border py-4 text-left font-display text-xl text-foreground">{link.label}</button></li>)}</ul><Button className="mt-6 w-full" size="lg" onClick={() => go("#reserveren")}>Reserveer een tafel</Button></nav></div> : null}
    </header>
  );
}