import { zodResolver } from "@hookform/resolvers/zod";
import { nlBE } from "date-fns/locale";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
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
import { occasions } from "@/config/site";
import { cn } from "@/lib/utils";

type DetailsValues = { voornaam: string; achternaam: string; email: string; telefoon: string; opmerking: string; privacy: true };
type Slot = { time: string; available: boolean };
type SlotGroup = { label: string; slots: Slot[] };
const places = ["Binnen", "Terras", "Geen voorkeur"] as const;
const steps = ["Gezelschap", "Datum & uur", "Gegevens", "Bevestiging"];
const errorText = "text-xs text-destructive";

const schema = z.object({
  voornaam: z.string().min(2, "Vul je voornaam in."),
  achternaam: z.string().min(2, "Vul je achternaam in."),
  email: z.string().min(1, "Vul je e-mailadres in.").email("Vul een geldig e-mailadres in."),
  telefoon: z.string().min(6, "Vul een geldig telefoonnummer in."),
  opmerking: z.string(),
  privacy: z.literal(true, { errorMap: () => ({ message: "Je moet akkoord gaan met de verwerking van je gegevens." }) }),
});

function makeTimes(start: number, end: number) {
  const times: string[] = [];
  for (let minutes = start; minutes <= end; minutes += 30) times.push(`${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`);
  return times;
}

function buildSlots(date: Date, guests: number): SlotGroup[] {
  const weekday = date.getDay();
  const day = date.getDate();
  const groups: { label: string; times: string[] }[] = weekday === 0
    ? [{ label: "Lunch", times: makeTimes(720, 840) }]
    : [{ label: "Lunch", times: makeTimes(720, 810) }, { label: "Diner", times: makeTimes(1080, weekday === 5 || weekday === 6 ? 1260 : 1230) }];
  return groups.map((group, groupIndex) => ({
    label: group.label,
    slots: group.times.map((time, index) => ({
      time,
      available: (day + index * 3 + groupIndex + guests) % (guests >= 6 ? 3 : 5) !== 0,
    })),
  }));
}

function today() { const date = new Date(); date.setHours(0, 0, 0, 0); return date; }
const closed = (date: Date) => date.getDay() === 1 || date.getDay() === 2;
const formatDate = (date: Date) => date.toLocaleDateString("nl-BE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

export function BookingSection() {
  const [step, setStep] = useState(0);
  const [guests, setGuests] = useState<number | null>(null);
  const [place, setPlace] = useState<(typeof places)[number] | null>(null);
  const [occasion, setOccasion] = useState<string>(occasions[0]);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const slots = useMemo(() => date && guests ? buildSlots(date, guests) : [], [date, guests]);
  const form = useForm<DetailsValues>({ resolver: zodResolver(schema), defaultValues: { voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" } });
  const { errors } = form.formState;
  const canContinue = step === 0 ? guests !== null && place !== null : step === 1 ? Boolean(date && time) : true;
  const reset = () => { setStep(0); setGuests(null); setPlace(null); setOccasion(occasions[0]); setDate(undefined); setTime(null); setFirstName(""); form.reset({ voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" }); };
  const next = () => {
    if (step === 2) { void form.handleSubmit((values) => { setFirstName(values.voornaam); setStep(3); })(); return; }
    if (canContinue) setStep((value) => Math.min(value + 1, 3));
  };
  const summary = <dl className="space-y-4 text-sm"><Summary label="Personen" value={guests ? `${guests === 8 ? "8+" : guests} ${guests === 1 ? "persoon" : "personen"}` : undefined} /><Summary label="Plaats" value={place ?? undefined} /><Summary label="Datum" value={date ? formatDate(date) : undefined} /><Summary label="Uur" value={time ?? undefined} /><Summary label="Gelegenheid" value={occasion} /></dl>;

  return (
    <section id="reserveren" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8">
      <SectionHeading eyebrow="Reserveren" title="Reserveer jouw tafel" subtitle="Kies het aantal personen, dag en uur. Je ontvangt een bevestiging per e-mail." />
      <Reveal className="mt-14"><div className="rounded-md border border-border bg-card p-5 sm:p-8"><Stepper current={step} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12"><div>
          {step === 0 ? <PartyStep guests={guests} setGuests={setGuests} place={place} setPlace={setPlace} occasion={occasion} setOccasion={setOccasion} /> : null}
          {step === 1 ? <DateStep date={date} time={time} groups={slots} setDate={(value) => { setDate(value); setTime(null); }} setTime={setTime} /> : null}
          {step === 2 ? <form noValidate onSubmit={(event) => { event.preventDefault(); next(); }} className="grid gap-5 sm:grid-cols-2">
            <Field label="Voornaam" id="r-voornaam" error={errors.voornaam?.message}><Input id="r-voornaam" autoComplete="given-name" {...form.register("voornaam")} /></Field>
            <Field label="Achternaam" id="r-achternaam" error={errors.achternaam?.message}><Input id="r-achternaam" autoComplete="family-name" {...form.register("achternaam")} /></Field>
            <Field label="E-mail" id="r-email" error={errors.email?.message}><Input id="r-email" type="email" autoComplete="email" {...form.register("email")} /></Field>
            <Field label="Telefoon" id="r-telefoon" error={errors.telefoon?.message}><Input id="r-telefoon" type="tel" autoComplete="tel" {...form.register("telefoon")} /></Field>
            <div className="space-y-2 sm:col-span-2"><Label htmlFor="r-opmerking">Opmerking (optioneel)</Label><Textarea id="r-opmerking" rows={4} placeholder="Allergieën of speciale wensen" {...form.register("opmerking")} /></div>
            <div className="space-y-2 sm:col-span-2"><div className="flex items-start gap-3"><Checkbox id="r-privacy" checked={form.watch("privacy") === true} onCheckedChange={(checked) => form.setValue("privacy", (checked === true) as true, { shouldValidate: true })} /><Label htmlFor="r-privacy" className="text-sm font-normal leading-relaxed text-muted-foreground">Ik ga akkoord met de verwerking van mijn gegevens.</Label></div>{errors.privacy ? <p className={errorText}>{errors.privacy.message}</p> : null}</div>
          </form> : null}
          {step === 3 ? <div className="rounded-md border border-primary/40 bg-background p-6 sm:p-8"><div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground"><Check className="size-5" /></div><h3 className="mt-6 font-display text-3xl text-foreground">Je tafel staat klaar</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Bedankt{firstName ? `, ${firstName}` : ""}! Je tafel is gereserveerd. Je ontvangt een bevestiging per e-mail.</p><div className="mt-8 border-t border-border pt-6">{summary}</div></div> : null}
        </div>{step < 3 ? <aside aria-label="Samenvatting van je reservatie" className="hidden lg:sticky lg:top-28 lg:block lg:self-start"><div className="rounded-md border border-border bg-background p-6"><p className="eyebrow text-primary">Jouw reservatie</p><div className="mt-5">{summary}</div></div></aside> : null}</div>
        {step < 3 ? <div className="mt-10 border-t border-border pt-6"><p className="mb-4 text-xs text-muted-foreground lg:hidden">{guests ? `${guests === 8 ? "8+" : guests} personen` : "Nog geen gezelschap"}{date ? ` · ${formatDate(date)}` : ""}{time ? ` · ${time}` : ""}</p><div className="flex gap-3"><Button type="button" variant="outline" onClick={() => setStep((value) => Math.max(value - 1, 0))} disabled={step === 0}><ChevronLeft />Vorige</Button><Button type="button" onClick={next} disabled={!canContinue}>Volgende<ChevronRight /></Button></div></div> : <div className="mt-10 border-t border-border pt-6"><Button type="button" onClick={reset}>Nieuwe reservering</Button></div>}
      </div></Reveal>
    </div></section>
  );
}

function PartyStep({ guests, setGuests, place, setPlace, occasion, setOccasion }: { guests: number | null; setGuests: (value: number) => void; place: (typeof places)[number] | null; setPlace: (value: (typeof places)[number]) => void; occasion: string; setOccasion: (value: string) => void }) {
  return <div><h3 className="font-display text-2xl text-foreground">Hoe groot is je gezelschap?</h3><div className="mt-6 grid grid-cols-4 gap-2 sm:grid-cols-8">{[1,2,3,4,5,6,7,8].map((value) => <Button key={value} type="button" variant={guests === value ? "default" : "outline"} onClick={() => setGuests(value)} aria-pressed={guests === value} className="h-12 px-0">{value === 8 ? "8+" : value}</Button>)}</div><p className="mt-3 text-xs text-muted-foreground">Voor groepen groter dan 8 personen nemen we graag persoonlijk contact op.</p><h3 className="mt-10 font-display text-2xl text-foreground">Plaats</h3><div className="mt-5 grid gap-2 sm:grid-cols-3">{places.map((value) => <Button key={value} type="button" variant={place === value ? "default" : "outline"} onClick={() => setPlace(value)} aria-pressed={place === value}>{value}</Button>)}</div><div className="mt-8 max-w-sm space-y-2"><Label htmlFor="gelegenheid">Gelegenheid (optioneel)</Label><select id="gelegenheid" value={occasion} onChange={(event) => setOccasion(event.target.value)} className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground">{occasions.map((value) => <option key={value}>{value}</option>)}</select></div></div>;
}

function DateStep({ date, time, groups, setDate, setTime }: { date: Date | undefined; time: string | null; groups: SlotGroup[]; setDate: (date: Date | undefined) => void; setTime: (time: string) => void }) {
  return <div className="grid gap-8 md:grid-cols-2"><div><h3 className="font-display text-2xl text-foreground">Kies een dag</h3><div className="mt-6 inline-block max-w-full rounded-md border border-border bg-background"><Calendar mode="single" selected={date} onSelect={setDate} disabled={(day) => day < today() || closed(day)} locale={nlBE} weekStartsOn={1} className="bg-transparent" /></div><p className="mt-3 text-xs text-muted-foreground">Op maandag en dinsdag zijn we gesloten.</p></div><div><h3 className="font-display text-2xl text-foreground">Kies een uur</h3>{date ? <div className="mt-6 space-y-7">{groups.map((group) => <div key={group.label}><p className="eyebrow text-primary">{group.label}</p><ul className="mt-3 grid grid-cols-3 gap-2">{group.slots.map((slot) => <li key={slot.time}><button type="button" disabled={!slot.available} aria-pressed={time === slot.time} aria-label={`${slot.time}${slot.available ? "" : " — niet beschikbaar"}`} onClick={() => setTime(slot.time)} className={cn("h-10 w-full rounded-md border text-sm transition-colors", !slot.available && "cursor-not-allowed border-border bg-surface text-muted-foreground/60 line-through", slot.available && time !== slot.time && "border-border bg-background text-foreground hover:border-primary", time === slot.time && "border-primary bg-primary text-primary-foreground")}>{slot.time}</button></li>)}</ul></div>)}</div> : <p className="mt-6 text-sm text-muted-foreground">Kies eerst een dag om de vrije uren te zien.</p>}</div></div>;
}

function Stepper({ current }: { current: number }) { return <ol className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">{steps.map((label, index) => <li key={label} aria-current={index === current ? "step" : undefined} className={cn("flex items-center gap-3 bg-background px-4 py-4 text-sm", index === current && "bg-primary text-primary-foreground")}><span className={cn("flex size-6 shrink-0 items-center justify-center rounded-full border text-xs", index < current ? "border-primary bg-primary text-primary-foreground" : index === current ? "border-primary-foreground/50" : "border-border text-muted-foreground")}>{index < current ? <Check className="size-3" /> : index + 1}</span><span className={cn(index > current && "text-muted-foreground")}>{label}</span></li>)}</ol>; }
function Summary({ label, value }: { label: string; value?: string }) { return <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"><dt className="text-muted-foreground">{label}</dt><dd className={cn("text-right", value ? "text-foreground" : "text-muted-foreground/60")}>{value ?? "—"}</dd></div>; }
function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) { return <div className="space-y-2"><Label htmlFor={id}>{label}</Label>{children}{error ? <p className={errorText}>{error}</p> : null}</div>; }