import aboutImage from "@/assets/about-interior.jpg";
import { Reveal } from "@/components/Reveal";

const highlights = ["10+ jaar ervaring", "Premium producten", "Persoonlijk advies"];

export function AboutSection() {
  return (
    <section id="over-ons" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={aboutImage}
            width={1280}
            height={1280}
            loading="lazy"
            alt="Warm ingericht salooninterieur met houten meubels, spiegels en plantjes"
            className="aspect-4/5 w-full rounded-md border border-border object-cover"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow text-primary">Over ons</p>
          <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
            Een klein team, veel aandacht
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Wij zijn een kleine ploeg gepassioneerde stylisten die liever iets langer met jou
              werkt dan snel door te gaan naar de volgende stoel. Je krijgt de tijd om te vertellen
              wat je wil, en wij zeggen eerlijk wat bij jouw haar past.
            </p>
            <p>
              We werken met premium producten die je haar gezond houden, ook na een kleuring of
              behandeling. En je gaat nooit naar buiten zonder advies om je coupe thuis zelf mooi te
              houden.
            </p>
          </div>

          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {highlights.map((item) => (
              <li key={item} className="bg-background px-5 py-6 text-center">
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
