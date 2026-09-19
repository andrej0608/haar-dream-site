import aboutImage from "@/assets/brasserie-chef.jpg";
import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section id="over-ons" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal><img src={aboutImage} width={1200} height={1504} loading="lazy" alt="Chef die een gerecht afwerkt in de open keuken" className="aspect-4/5 w-full rounded-md border border-border object-cover" /></Reveal>
        <Reveal delay={80}>
          <p className="eyebrow text-primary">Over ons</p>
          <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">Eenvoudig, eerlijk en met aandacht</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground"><p>We zijn een klein team met een voorliefde voor de Belgische keuken. Vertrouwde smaken krijgen bij ons een frisse toets, zonder hun karakter te verliezen.</p><p>We koken zoveel mogelijk met lokale producten en laten het seizoen onze kaart bepalen. Aan tafel nemen we graag de tijd voor iedere gast — of je nu snel komt lunchen of lang wil tafelen.</p></div>
          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">{["Lokale producten", "Seizoensgebonden kaart", "Huisgemaakt"].map((item) => <li key={item} className="bg-background px-4 py-6 text-center text-sm font-medium text-foreground">{item}</li>)}</ul>
        </Reveal>
      </div>
    </section>
  );
}