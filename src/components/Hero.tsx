import heroImage from "@/assets/hero-salon.jpg";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { content: c } = useLanguage();
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        width={1920}
        height={1280}
        alt={c.hero.alt}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/70" aria-hidden="true" />

      <div className="mx-auto flex max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:min-h-[38rem] lg:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">{c.hero.eyebrow}</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            {c.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {c.hero.text}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection("#afspraak")}>
              {c.nav.book}
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("#diensten")}>
              {c.hero.services}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
