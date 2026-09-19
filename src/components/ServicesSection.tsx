import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { menu, type MenuCategory } from "@/config/site";
import { cn } from "@/lib/utils";

const categories = Object.keys(menu) as MenuCategory[];

export function ServicesSection() {
  const [active, setActive] = useState<MenuCategory>("Voorgerechten");
  return (
    <section id="menu" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Menu" title="Onze kaart" subtitle="Een greep uit onze kaart. De gerechten wisselen met de seizoenen." />
        <Reveal className="mt-12">
          <div role="tablist" aria-label="Menucategorieën" className="flex overflow-x-auto border-b border-border">
            {categories.map((category) => <button key={category} type="button" role="tab" aria-selected={active === category} onClick={() => setActive(category)} className={cn("shrink-0 border-b-2 px-5 py-4 text-sm font-semibold transition-colors", active === category ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{category}</button>)}
          </div>
          <ul className="divide-y divide-border border-b border-border">
            {menu[active].map((dish) => <li key={dish.name} className="grid grid-cols-[1fr_auto] gap-5 py-6"><div><h3 className="font-display text-xl text-foreground sm:text-2xl">{dish.name}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p></div><p className="pt-1 text-sm font-semibold text-primary">€{dish.price}</p></li>)}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">Gerechten en prijzen zijn voorbeelden.</p>
        </Reveal>
      </div>
    </section>
  );
}