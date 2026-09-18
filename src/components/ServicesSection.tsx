import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { formattedPrice, services } from "@/config/site";

export function ServicesSection() {
  return (
    <section id="diensten" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Diensten"
          title="Waarvoor je bij ons terechtkomt"
          subtitle="Elke behandeling start met een korte intake, zodat we samen de juiste keuze maken voor jouw haar."
        />

        <ul className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.id} delay={index * 60} className="bg-card">
              <article className="flex h-full flex-col gap-3 p-8">
                <h3 className="font-display text-2xl text-foreground">{service.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <p className="mt-auto pt-4 text-sm font-medium text-primary">
                  {formattedPrice(service.price)}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        <p className="mt-8 text-sm text-muted-foreground">
          Prijzen zijn indicatief. Persoonlijk advies tijdens de intake.
        </p>
      </div>
    </section>
  );
}
