import aboutImage from "@/assets/brasserie-chef.jpg";
import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  const t = useT().about;
  return (
    <section id="over-ons" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal><img src={aboutImage} width={1200} height={1504} loading="lazy" alt={t.alt} className="aspect-4/5 w-full rounded-md border border-border object-cover" /></Reveal>
        <Reveal delay={80}>
          <p className="eyebrow text-primary">{t.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">{t.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground"><p>{t.p1}</p><p>{t.p2}</p></div>
          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">{t.highlights.map((item) => <li key={item} className="bg-background px-4 py-6 text-center text-sm font-medium text-foreground">{item}</li>)}</ul>
        </Reveal>
      </div>
    </section>
  );
}