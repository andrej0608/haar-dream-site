import heroImage from "@/assets/brasserie-hero.jpg";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/scroll";

export function Hero() {
  const t = useT().hero;
  return (
    <section id="top" className="relative isolate min-h-[40rem] overflow-hidden">
      <img src={heroImage} width={1600} height={1072} alt={t.alt} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-background/72" aria-hidden="true" />
      <div className="mx-auto flex min-h-[40rem] max-w-6xl items-center px-5 py-20 sm:px-8 lg:min-h-[44rem]">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">{t.badge}</p>
          <h1 className="mt-6 max-w-2xl font-display text-5xl leading-none text-foreground sm:text-7xl lg:text-8xl">{t.title1}<br />{t.title2}</h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">{t.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => scrollToSection("#reserveren")}>{t.book}</Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("#menu")}>{t.menu}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}