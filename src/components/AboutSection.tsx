import aboutImage from "@/assets/about-interior.jpg";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/lib/i18n";

export function AboutSection() {
  const { content: c } = useLanguage();
  return (
    <section id="over-ons" className="border-t border-border bg-surface py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src={aboutImage}
            width={1280}
            height={1280}
            loading="lazy"
            alt={c.about.alt}
            className="aspect-4/5 w-full rounded-md border border-border object-cover"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow text-primary">{c.about.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl text-foreground sm:text-5xl">
            {c.about.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
            {c.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {c.about.highlights.map((item) => (
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
