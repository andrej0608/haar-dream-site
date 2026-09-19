import heroImage from "@/assets/brasserie-hero.jpg";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[40rem] overflow-hidden">
      <img src={heroImage} width={1600} height={1072} alt="Sfeervol gedekte tafel in een warme, donkere brasserie" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-background/72" aria-hidden="true" />
      <div className="mx-auto flex min-h-[40rem] max-w-6xl items-center px-5 py-20 sm:px-8 lg:min-h-[44rem]">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Premium Brasserie — België</p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl leading-none text-foreground sm:text-7xl lg:text-8xl">Goed eten.<br />Goed gezelschap.</h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">Seizoensgebonden gerechten, lokale producten en een warme ontvangst. Kom langs voor een lunch, een diner of een avond met vrienden.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection("#reserveren")}>Reserveer een tafel</Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("#menu")}>Bekijk de kaart</Button>
          </div>
        </div>
      </div>
    </section>
  );
}