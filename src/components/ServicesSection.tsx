import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { menu } from "@/config/site";
import { useT } from "@/i18n/LanguageProvider";

import { cn } from "@/lib/utils";

const prices = Object.values(menu).map((dishes) => dishes.map((dish) => dish.price));

export function ServicesSection() {
  const t = useT().menu;
  const [active, setActive] = useState(0);
  return (
    <section id="menu" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <Reveal className="mt-12">
          <div role="tablist" aria-label={t.tabsLabel} className="flex overflow-x-auto border-b border-border">
            {t.categories.map((category, index) => <button key={index} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={cn("shrink-0 border-b-2 px-5 py-4 text-sm font-semibold transition-colors", active === index ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}>{category.label}</button>)}
          </div>
          <ul className="divide-y divide-border border-b border-border">
            {t.categories[active].dishes.map((dish, index) => <li key={index} className="grid grid-cols-[1fr_auto] gap-5 py-6"><div><h3 className="font-display text-xl text-foreground sm:text-2xl">{dish.name}</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{dish.description}</p></div><p className="pt-1 text-sm font-semibold text-primary">€{prices[active][index]}</p></li>)}
          </ul>
          <p className="mt-6 text-xs text-muted-foreground">{t.note}</p>
        </Reveal>
      </div>
    </section>
  );
}