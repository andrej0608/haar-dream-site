import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
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

type FormValues = { naam: string; email: string; bericht: string; privacy: true };
const schema = z.object({ naam: z.string().min(2, "Vul je naam in."), email: z.string().min(1, "Vul je e-mailadres in.").email("Vul een geldig e-mailadres in."), bericht: z.string().min(10, "Je vraag mag iets uitgebreider zijn (minstens 10 tekens)."), privacy: z.literal(true, { errorMap: () => ({ message: "Je moet akkoord gaan met de verwerking van je gegevens." }) }) });

export function ContactSection() {
  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.country}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { naam: "", email: "", bericht: "" } });
  const { errors } = form.formState;
  const submit = () => { toast.success("Bedankt! We nemen zo snel mogelijk contact met je op."); form.reset({ naam: "", email: "", bericht: "" }); };
  return <section id="contact" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading eyebrow="Contact" title="Openingsuren & contact" subtitle="Kom langs voor een lange lunch, een gezellig diner of stuur ons je vraag." /><div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
    <Reveal><h3 className="font-display text-2xl">Openingsuren</h3><ul className="mt-5 border-t border-border">{openingHours.map((entry) => <li key={entry.day} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-border py-3 text-sm sm:flex sm:justify-between"><span>{entry.day}</span><span className={entry.closed ? "text-muted-foreground" : "text-foreground"}>{entry.hours}</span></li>)}</ul><h3 className="mt-12 font-display text-2xl">Waar je ons vindt</h3><ul className="mt-5 space-y-4 text-sm text-muted-foreground"><li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{site.address.street}<br />{site.address.postalCode} {site.address.city}, {site.address.country}</a></li><li className="flex gap-3"><Phone className="size-4 text-primary" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{site.phone}</a></li><li className="flex gap-3"><Mail className="size-4 text-primary" /><a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a></li></ul><p className="mt-6 text-xs text-muted-foreground">Dit is een demo-website. De locatie en alle contactgegevens zijn voorbeelden.</p><div className="mt-10"><div className="flex flex-wrap items-end justify-between gap-4"><h3 className="font-display text-2xl">Bekijk onze locatie</h3><Button asChild variant="outline" size="sm"><a href={directionsUrl} target="_blank" rel="noopener noreferrer">Plan je route<ExternalLink /></a></Button></div><div className="mt-5 h-[280px] overflow-hidden rounded-md border border-border bg-surface sm:h-[360px]"><iframe title="Kaart met de voorbeeldlocatie van Premium Brasserie in Hasselt" src={mapUrl} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></Reveal>
    <Reveal delay={80}><form onSubmit={form.handleSubmit(submit)} noValidate className="rounded-md border border-border bg-card p-6 sm:p-8"><h3 className="font-display text-3xl">Stel je vraag</h3><div className="mt-7 space-y-5">{([["naam","Naam","text"],["email","E-mail","email"]] as const).map(([name,label,type]) => <div key={name} className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} type={type} {...form.register(name)} />{errors[name] ? <p className="text-xs text-destructive">{errors[name]?.message}</p> : null}</div>)}<div className="space-y-2"><Label htmlFor="bericht">Bericht</Label><Textarea id="bericht" rows={6} {...form.register("bericht")} />{errors.bericht ? <p className="text-xs text-destructive">{errors.bericht.message}</p> : null}</div><div className="space-y-2"><div className="flex items-start gap-3"><Checkbox id="privacy" checked={form.watch("privacy") === true} onCheckedChange={(checked) => form.setValue("privacy", (checked === true) as true, { shouldValidate: true })} /><Label htmlFor="privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">Ik ga akkoord met de verwerking van mijn gegevens.</Label></div>{errors.privacy ? <p className="text-xs text-destructive">{errors.privacy.message}</p> : null}</div><Button type="submit" size="lg" className="w-full">Verstuur vraag</Button></div></form></Reveal>
  </div></div></section>;
}