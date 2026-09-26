import { zodResolver } from "@hookform/resolvers/zod";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo } from "react";
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
import { useLanguage } from "@/i18n/LanguageProvider";

type FormValues = { naam: string; email: string; bericht: string; privacy: true };

export function ContactSection() {
  const { t: dict, language } = useLanguage();
  const t = dict.contact;
  const schema = useMemo(() => z.object({ naam: z.string().min(2, t.errors.name), email: z.string().min(1, t.errors.emailRequired).email(t.errors.emailInvalid), bericht: z.string().min(10, t.errors.message), privacy: z.literal(true, { errorMap: () => ({ message: t.errors.privacy }) }) }), [t]);
  const address = `${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${site.address.country}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { naam: "", email: "", bericht: "" } });
  const { errors } = form.formState;
  useEffect(() => { const fields = Object.keys(form.formState.errors) as (keyof FormValues)[]; if (fields.length) void form.trigger(fields); }, [language]); // eslint-disable-line react-hooks/exhaustive-deps
  const submit = () => { toast.success(t.toast); form.reset({ naam: "", email: "", bericht: "" }); };
  const fields = [["naam", t.name, "text"], ["email", t.email, "email"]] as const;
  return <section id="contact" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /><div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-16">
    <Reveal><h3 className="font-display text-2xl">{t.hoursTitle}</h3><ul className="mt-5 border-t border-border">{openingHours.map((entry, index) => <li key={entry.day} className="grid grid-cols-[7rem_1fr] gap-3 border-b border-border py-3 text-sm sm:flex sm:justify-between"><span>{t.days[index]}</span><span className={entry.closed ? "text-muted-foreground" : "text-foreground"}>{entry.closed ? t.closed : entry.hours}</span></li>)}</ul><h3 className="mt-12 font-display text-2xl">{t.findTitle}</h3><ul className="mt-5 space-y-4 text-sm text-muted-foreground"><li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /><a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">{site.address.street}<br />{site.address.postalCode} {site.address.city}, {site.address.country}</a></li><li className="flex gap-3"><Phone className="size-4 text-primary" /><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{site.phone}</a></li><li className="flex gap-3"><Mail className="size-4 text-primary" /><a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a></li></ul><p className="mt-6 text-xs text-muted-foreground">{t.demoNote}</p><div className="mt-10"><div className="flex flex-wrap items-end justify-between gap-4"><h3 className="font-display text-2xl">{t.mapTitle}</h3><Button asChild variant="outline" size="sm"><a href={directionsUrl} target="_blank" rel="noopener noreferrer">{t.directions}<ExternalLink /></a></Button></div><div className="mt-5 h-[280px] overflow-hidden rounded-md border border-border bg-surface sm:h-[360px]"><iframe title={t.iframeTitle(site.address.city)} src={mapUrl} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></Reveal>
    <Reveal delay={80}><form onSubmit={form.handleSubmit(submit)} noValidate className="rounded-md border border-border bg-card p-6 sm:p-8"><h3 className="font-display text-3xl">{t.formTitle}</h3><div className="mt-7 space-y-5">{fields.map(([name, label, type]) => <div key={name} className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} type={type} {...form.register(name)} />{errors[name] ? <p className="text-xs text-destructive">{errors[name]?.message}</p> : null}</div>)}<div className="space-y-2"><Label htmlFor="bericht">{t.message}</Label><Textarea id="bericht" rows={6} {...form.register("bericht")} />{errors.bericht ? <p className="text-xs text-destructive">{errors.bericht.message}</p> : null}</div><div className="space-y-2"><div className="flex items-start gap-3"><Checkbox id="privacy" checked={form.watch("privacy") === true} onCheckedChange={(checked) => form.setValue("privacy", (checked === true) as true, { shouldValidate: true })} /><Label htmlFor="privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">{t.privacy}</Label></div>{errors.privacy ? <p className="text-xs text-destructive">{errors.privacy.message}</p> : null}</div><Button type="submit" size="lg" className="w-full">{t.submit}</Button></div></form></Reveal>
  </div></div></section>;
}
