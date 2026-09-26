import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enUS, nlBE } from "date-fns/locale";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage, type Language } from "@/i18n/LanguageProvider";
import type { Dict } from "@/i18n/nl";
import { cn } from "@/lib/utils";

type DetailsValues = { voornaam: string; achternaam: string; email: string; telefoon: string; opmerking: string; privacy: true };
type Slot = { time: string; available: boolean };
type SlotGroup = { group: "lunch" | "dinner"; slots: Slot[] };
const places = ["inside", "terrace", "none"] as const;
type Place = (typeof places)[number];
type B = Dict["booking"];
const errorText = "text-xs text-destructive";

const makeSchema = (e: B["errors"]) => z.object({
  voornaam: z.string().min(2, e.firstName),
  achternaam: z.string().min(2, e.lastName),
  email: z.string().min(1, e.emailRequired).email(e.emailInvalid),
  telefoon: z.string().min(6, e.phone),
  opmerking: z.string(),
  privacy: z.literal(true, { errorMap: () => ({ message: e.privacy }) }),
});

function makeTimes(start: number, end: number) {
  const times: string[] = [];
  for (let minutes = start; minutes <= end; minutes += 30) times.push(`${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`);
  return times;
}

function buildSlots(date: Date, guests: number): SlotGroup[] {
  const weekday = date.getDay();
  const day = date.getDate();
  const groups: { group: SlotGroup["group"]; times: string[] }[] = weekday === 0
    ? [{ group: "lunch", times: makeTimes(720, 840) }]
    : [{ group: "lunch", times: makeTimes(720, 810) }, { group: "dinner", times: makeTimes(1080, weekday === 5 || weekday === 6 ? 1260 : 1230) }];
  return groups.map((group, groupIndex) => ({
    group: group.group,
    slots: group.times.map((time, index) => ({
      time,
      available: (day + index * 3 + groupIndex + guests) % (guests >= 6 ? 3 : 5) !== 0,
    })),
  }));
}

function today() { const date = new Date(); date.setHours(0, 0, 0, 0); return date; }
const closed = (date: Date) => date.getDay() === 1 || date.getDay() === 2;
const formatDate = (date: Date, language: Language) => language === "en" ? format(date, "EEEE, MMMM d", { locale: enUS }) : format(date, "EEEE d MMMM", { locale: nlBE });

export function BookingSection() {
  const { t: dict, language } = useLanguage();
  const t = dict.booking;
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState<number | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [occasion, setOccasion] = useState(0);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const slots = useMemo(() => date && guests ? buildSlots(date, guests) : [], [date, guests]);
  const form = useForm<DetailsValues>({ resolver: zodResolver(useMemo(() => makeSchema(t.errors), [t])), defaultValues: { voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" } });
  const { errors } = form.formState;
  useEffect(() => { const fields = Object.keys(form.formState.errors) as (keyof DetailsValues)[]; if (fields.length) void form.trigger(fields); }, [language]); // eslint-disable-line react-hooks/exhaustive-deps
  const canContinue = step === 0 ? guests !== null && place !== null : step === 1 ? Boolean(date && time) : true;
  const reset = () => { setStep(0); setGuests(null); setPlace(null); setOccasion(0); setDate(undefined); setTime(null); setFirstName(""); form.reset({ voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" }); };
  const next = () => {
    if (step === 2) { void form.handleSubmit((values) => { setFirstName(values.voornaam); setStep(3); })(); return; }
    if (canContinue) setStep((value) => Math.min(value + 1, 3));
  };
  const summary = <dl className="space-y-4 text-sm"><Summary label={t.sGuests} value={guests ? t.guestsText(guests === 8 ? "8+" : String(guests), guests === 1) : undefined} /><Summary label={t.sPlace} value={place ? t.places[place] : undefined} /><Summary label={t.sDate} value={date ? formatDate(date, language) : undefined} /><Summary label={t.sTime} value={time ?? undefined} /><Summary label={t.sOccasion} value={t.occasions[occasion]} /></dl>;

  return (
    <section id="reserveren" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <Reveal className="mt-14"><div className="rounded-md border border-border bg-card p-5 sm:p-8"><Stepper current={step} labels={t.steps} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12"><div>
          {step === 0 ? <PartyStep guests={guests} setGuests={setGuests} place={place} setPlace={setPlace} occasion={occasion} setOccasion={setOccasion} t={t} /> : null}
          {step === 1 ? <DateStep date={date} time={time} groups={slots} setDate={(value) => { setDate(value); setTime(null); }} setTime={setTime} t={t} language={language} /> : null}
          {step === 2 ? <form noValidate onSubmit={(event) => { event.preventDefault(); next(); }} className="grid gap-5 sm:grid-cols-2">
            <Field label={t.firstName} id="r-voornaam" error={errors.voornaam?.message}><Input id="r-voornaam" autoComplete="given-name" {...form.register("voornaam")} /></Field>
            <Field label={t.lastName} id="r-achternaam" error={errors.achternaam?.message}><Input id="r-achternaam" autoComplete="family-name" {...form.register("achternaam")} /></Field>
            <Field label={t.email} id="r-email" error={errors.email?.message}><Input id="r-email" type="email" autoComplete="email" {...form.register("email")} /></Field>
            <Field label={t.phone} id="r-telefoon" error={errors.telefoon?.message}><Input id="r-telefoon" type="tel" autoComplete="tel" {...form.register("telefoon")} /></Field>
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="r-opmerking">{t.note}</Label><Textarea id="r-opmerking" rows={4} placeholder={t.notePlaceholder} {...form.register("opmerking")} /></div>
            <div className="space-y-2 sm:col-span-2"><div className="flex items-start gap-3"><Checkbox id="r-privacy" checked={form.watch("privacy") === true} onCheckedChange={(checked) => form.setValue("privacy", (checked === true) as true, { shouldValidate: true })} /><Label htmlFor="r-privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">{t.privacy}</Label></div>{errors.privacy ? <p className={errorText}>{errors.privacy.message}</p> : null}</div>
          </form> : null}
          {step === 3 ? <div className="rounded-md border border-primary/40 bg-background p-6 sm:p-8"><div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-5" /></div><h3 className="mt-6 font-display text-3xl text-foreground">{t.doneTitle}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.doneText(firstName)}</p><div className="mt-8 border-t border-border pt-6">{summary}</div></div> : null}
        </div>{step < 3 ? <aside aria-label={t.summaryLabel} className="hidden lg:sticky lg:top-28 lg:block lg:self-start"><div className="rounded-md border border-border bg-background p-6"><p className="eyebrow text-primary">{t.summaryTitle}</p><div className="mt-5">{summary}</div></div></aside> : null}</div>
        {step < 3 ? <div className="mt-10 border-t border-border pt-6"><p className="mb-4 text-xs text-muted-foreground lg:hidden">{guests ? t.guestsShort(guests === 8 ? "8+" : String(guests)) : t.noParty}{date ? ` · ${formatDate(date, language)}` : ""}{time ? ` · ${time}` : ""}</p><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0}><ChevronLeft />{t.prev}</Button><Button type="button" onClick={next} disabled={!canContinue}>{t.next}<ChevronRight /></Button></div></div> : <div className="mt-10 border-t border-border pt-6"><Button type="button" onClick={reset}>{t.reset}</Button></div>}
      </div></Reveal>
    </div></section>
  );
}

function PartyStep({ guests, setGuests, place, setPlace, occasion, setOccasion, t }: { guests: number | null; setGuests: (value: number) => void; place: Place | null; setPlace: (value: Place) => void; occasion: number; setOccasion: (value: number) => void; t: B }) {
  return <div><h3 className="font-display text-2xl text-foreground">{t.partyTitle}</h3><div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8">{[1,2,3,4,5,6,7,8].map((value) => <Button key={value} type="button" variant={guests === value ? "default" : "outline"} onClick={() => setGuests(value)} aria-pressed={guests === value} className="h-12 px-0">{value === 8 ? "8+" : value}</Button>)}</div><p className="mt-3 text-xs text-muted-foreground">{t.groupHint}</p><h3 className="mt-10 font-display text-2xl text-foreground">{t.placeTitle}</h3><div className="mt-5 grid gap-2 sm:grid-cols-3">{places.map((value) => <Button key={value} type="button" variant={place === value ? "default" : "outline"} onClick={() => setPlace(value)} aria-pressed={place === value} className="h-auto min-h-11 whitespace-normal">{t.places[value]}</Button>)}</div><div className="mt-8 max-w-sm space-y-2"><Label htmlFor="gelegenheid">{t.occasionLabel}</Label><select id="gelegenheid" value={occasion} onChange={(event) => setOccasion(Number(event.target.value))} className="h-11 w-full rounded-md border border-border bg-background px-3 text-base text-foreground">{t.occasions.map((value, index) => <option key={index} value={index}>{value}</option>)}</select></div></div>;
}

function DateStep({ date, time, groups, setDate, setTime, t, language }: { date: Date | undefined; time: string | null; groups: SlotGroup[]; setDate: (date: Date | undefined) => void; setTime: (time: string) => void; t: B; language: Language }) {
  return <div className="grid gap-8 md:grid-cols-2"><div><h3 className="font-display text-2xl text-foreground">{t.dayTitle}</h3><div className="mt-6 inline-block max-w-full rounded-md border border-border bg-background"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(day) => day < today() || closed(day)} locale={language === "en" ? enUS : nlBE} weekStartsOn={1} className="bg-transparent" /></div><p className="mt-3 text-xs text-muted-foreground">{t.closedNote}</p></div><div><h3 className="font-display text-2xl text-foreground">{t.timeTitle}</h3>{date ? <div className="mt-6 space-y-7">{groups.map((group) => <div key={group.group}><p className="eyebrow text-primary">{group.group === "lunch" ? t.lunch : t.dinner}</p><ul className="mt-3 grid grid-cols-3 gap-2">{group.slots.map((slot) => <li key={slot.time}><button type="button" disabled={!slot.available} aria-pressed={time === slot.time} aria-label={`${slot.time}${slot.available ? "" : ` — ${t.unavailable}`}`} onClick={() => setTime(slot.time)} className={cn("h-10 w-full rounded-md border text-sm transition-colors", !slot.available && "cursor-not-allowed border-border bg-surface text-muted-foreground/60 line-through", slot.available && time !== slot.time && "border-border bg-background text-foreground hover:border-primary", time === slot.time && "border-primary bg-primary text-primary-foreground")}>{slot.time}</button></li>)}</ul></div>)}</div> : <p className="mt-6 text-sm text-muted-foreground">{t.pickDayFirst}</p>}</div></div>;
}

function Stepper({ current, labels }: { current: number; labels: string[] }) { return <ol className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">{labels.map((label, index) => <li key={label} aria-current={index === current ? "step" : undefined} className={cn("flex items-center gap-3 bg-background px-4 py-4 text-sm", index === current && "bg-primary text-primary-foreground")}><span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border text-xs", index < current ? "border-primary bg-primary text-primary-foreground" : index === current ? "border-primary-foreground/50" : "border-border text-muted-foreground")}>{index < current ? <Check className="size-3" /> : index + 1}</span><span className={cn(index > current && "text-muted-foreground")}>{label}</span></li>)}</ol>; }
function Summary({ label, value }: { label: string; value: string | undefined }) { return <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"><dt className="text-muted-foreground">{label}</dt><dd className={cn("text-right", value ? "text-foreground" : "text-muted-foreground/60")}>{value ?? "—"}</dd></div>; }
function Field({ label, id, error, children }: { label: string; id: string; error: string | undefined; children: ReactNode }) { return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}{error ? <p className={errorText}>{error}</p> : null}</div>; }