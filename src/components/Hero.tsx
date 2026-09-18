import heroImage from "@/assets/hero-salon.jpg";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        width={1920}
        height={1280}
        alt="Haarstylist die het zachte golvende haar van een klant verzorgt in een lichte salon"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/70" aria-hidden="true" />

      <div className="mx-auto flex max-w-6xl flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:min-h-[38rem] lg:py-40">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">Premium Hair Studio — België</p>
          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.05] text-foreground sm:text-6xl lg:text-7xl">
            Jouw haar. Jouw stijl.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Van een frisse knipbeurt tot een complete kleurtransformatie. Persoonlijk advies, premium
            producten en alle tijd voor jou.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection("#afspraak")}>
              Boek een afspraak
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("#diensten")}>
              Ontdek onze diensten
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
