import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { openingHours, site } from "@/config/site";
import { useLanguage } from "@/lib/i18n";

type FormValues = { naam: string; email: string; bericht: string; privacy: true };

const errorText = "text-xs text-destructive";

export function ContactSection() {
  const { content: c } = useLanguage();
  const schema = z.object({
    naam: z.string().min(2, c.contact.errors.name),
    email: z.string().min(1, c.contact.errors.emailRequired).email(c.contact.errors.emailInvalid),
    bericht: z.string().min(10, c.contact.errors.message),
    privacy: z.literal(true, { errorMap: () => ({ message: c.contact.errors.privacy }) }),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { naam: "", email: "", bericht: "" },
  });

  const privacy = watch("privacy");

  const onSubmit = (_values: FormValues) => {
    // Demo-website: er wordt niets verstuurd of opgeslagen.
    toast.success(c.contact.success);
    reset({ naam: "", email: "", bericht: "" });
  };

  return (
    <section id="contact" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={c.contact.eyebrow}
          title={c.contact.title}
          subtitle={c.contact.subtitle}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="font-display text-2xl text-foreground">{c.contact.hours}</h3>
            <ul className="mt-5 border-t border-border">
              {openingHours.map((entry, index) => (
                <li
                  key={entry.day}
                  className="flex items-center justify-between border-b border-border py-3 text-sm"
                >
                  <span className="text-foreground">{c.contact.days[index]}</span>
                  <span className={entry.closed ? "text-muted-foreground" : "text-foreground"}>
                    {entry.closed ? c.contact.closed : entry.hours}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-2xl text-foreground">{c.contact.location}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="not-italic text-muted-foreground">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="text-muted-foreground hover:text-foreground">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="text-muted-foreground hover:text-foreground">
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              {c.contact.demo}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="rounded-md border border-border bg-card p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl text-foreground">{c.contact.formTitle}</h3>

              <div className="mt-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="naam">{c.contact.name}</Label>
                  <Input id="naam" autoComplete="name" {...register("naam")} />
                  {errors.naam ? <p className={errorText}>{errors.naam.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{c.contact.email}</Label>
                  <Input id="email" type="email" autoComplete="email" {...register("email")} />
                  {errors.email ? <p className={errorText}>{errors.email.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bericht">{c.contact.message}</Label>
                  <Textarea id="bericht" rows={5} {...register("bericht")} />
                  {errors.bericht ? <p className={errorText}>{errors.bericht.message}</p> : null}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={privacy === true}
                      onCheckedChange={(checked) =>
                        setValue("privacy", (checked === true) as true, { shouldValidate: true })
                      }
                    />
                    <Label htmlFor="privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">
                      {c.contact.privacy}
                    </Label>
                  </div>
                  {errors.privacy ? <p className={errorText}>{errors.privacy.message}</p> : null}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {c.contact.submit}
                </Button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
