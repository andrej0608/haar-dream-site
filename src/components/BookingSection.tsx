import { zodResolver } from "@hookform/resolvers/zod";
import { enGB, nlBE } from "date-fns/locale";
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
import { formattedPrice, services, stylists, type Service } from "@/config/site";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Visuele demo: er wordt niets opgeslagen of verstuurd.               */
/* ------------------------------------------------------------------ */

type DetailsValues = { voornaam: string; achternaam: string; email: string; telefoon: string; opmerking?: string; privacy: true };

const errorText = "text-xs text-destructive";

/** Openingsuren per weekdag (0 = zondag). Gesloten op maandag en zondag. */
const openingWindows: Record<number, { start: string; end: string } | null> = {
  0: null,
  1: null,
  2: { start: "09:00", end: "18:00" },
  3: { start: "09:00", end: "18:00" },
  4: { start: "09:00", end: "18:00" },
  5: { start: "09:00", end: "18:00" },
  6: { start: "08:30", end: "16:00" },
};

const toMinutes = (time: string) => {
  const [h = 0, m = 0] = time.split(":").map(Number);
  return h * 60 + m;
};

const toLabel = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** Deterministische mock-beschikbaarheid, afgeleid van de dag van de maand. */
function buildSlots(date: Date) {
  const window = openingWindows[date.getDay()];
  if (!window) return [];

  const start = toMinutes(window.start);
  const end = toMinutes(window.end);
  const dayNumber = date.getDate();
  const slots: { time: string; available: boolean }[] = [];

  for (let minutes = start, index = 0; minutes + 30 <= end; minutes += 30, index += 1) {
    slots.push({
      time: toLabel(minutes),
      available: (dayNumber + index * 3) % 5 !== 0 && (dayNumber + index) % 7 !== 0,
    });
  }

  return slots;
}

const startOfToday = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const isClosedDay = (date: Date) => openingWindows[date.getDay()] === null;

const formatDate = (date: Date, language: "nl" | "en") =>
  date.toLocaleDateString(language === "nl" ? "nl-BE" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function BookingSection() {
  const { content: c, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<Service | null>(null);
  const [stylist, setStylist] = useState<string>(stylists[0]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<DetailsValues | null>(null);

  const slots = useMemo(() => (date ? buildSlots(date) : []), [date]);

  const detailsSchema = z.object({
    voornaam: z.string().min(2, c.booking.errors.firstName),
    achternaam: z.string().min(2, c.booking.errors.lastName),
    email: z.string().min(1, c.booking.errors.emailRequired).email(c.booking.errors.emailInvalid),
    telefoon: z.string().min(6, c.booking.errors.phone),
    opmerking: z.string().optional(),
    privacy: z.literal(true, { errorMap: () => ({ message: c.booking.errors.privacy }) }),
  });
  const form = useForm<DetailsValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: { voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" },
  });

  const privacy = form.watch("privacy");
  const { errors } = form.formState;

  const canContinue = step === 0 ? service !== null : step === 1 ? date !== undefined && time !== null : true;

  const reset = () => {
    setStep(0);
    setService(null);
    setStylist(stylists[0]);
    setDate(undefined);
    setTime(null);
    setDetails(null);
    form.reset({ voornaam: "", achternaam: "", email: "", telefoon: "", opmerking: "" });
  };

  const handleNext = () => {
    if (step === 2) {
      void form.handleSubmit((values) => {
        setDetails(values);
        setStep(3);
      })();
      return;
    }
    if (canContinue) setStep((s) => Math.min(s + 1, 3));
  };

  const summary = (
    <dl className="space-y-4 text-sm">
       <SummaryRow label={c.booking.labels[0]} value={service ? c.services.items[service.id][0] : undefined} />
       <SummaryRow label={c.booking.labels[1]} value={service ? `${service.duration} min` : undefined} />
       <SummaryRow label={c.booking.labels[2]} value={stylist === stylists[0] ? c.booking.noPreference : stylist} />
       <SummaryRow label={c.booking.labels[3]} value={date ? formatDate(date, language) : undefined} />
       <SummaryRow label={c.booking.labels[4]} value={time ?? undefined} />
       <SummaryRow label={c.booking.labels[5]} value={service ? `${c.services.from} €${service.price}` : undefined} />
    </dl>
  );

  return (
    <section id="afspraak" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={c.booking.eyebrow}
          title={c.booking.title}
          subtitle={c.booking.subtitle}
        />

        <Reveal className="mt-14">
          <div className="rounded-md border border-border bg-card p-6 sm:p-8">
            <Stepper current={step} labels={c.booking.steps} />

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
              <div>
                {step === 0 ? (
                  <ServiceStep
                    service={service}
                    onSelect={setService}
                    stylist={stylist}
                    onStylistChange={setStylist}
                    labels={c}
                  />
                ) : null}

                {step === 1 ? (
                  <DateStep
                    date={date}
                    slots={slots}
                    time={time}
                    onDateChange={(next) => {
                      setDate(next);
                      setTime(null);
                    }}
                    onTimeChange={setTime}
                    labels={c}
                    language={language}
                  />
                ) : null}

                {step === 2 ? (
                  <form
                    noValidate
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleNext();
                    }}
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <div className="space-y-2">
                       <Label htmlFor="b-voornaam">{c.booking.firstName}</Label>
                      <Input id="b-voornaam" autoComplete="given-name" {...form.register("voornaam")} />
                      {errors.voornaam ? <p className={errorText}>{errors.voornaam.message}</p> : null}
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="b-achternaam">{c.booking.lastName}</Label>
                      <Input id="b-achternaam" autoComplete="family-name" {...form.register("achternaam")} />
                      {errors.achternaam ? (
                        <p className={errorText}>{errors.achternaam.message}</p>
                      ) : null}
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="b-email">{c.booking.email}</Label>
                      <Input id="b-email" type="email" autoComplete="email" {...form.register("email")} />
                      {errors.email ? <p className={errorText}>{errors.email.message}</p> : null}
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="b-telefoon">{c.booking.phone}</Label>
                      <Input id="b-telefoon" type="tel" autoComplete="tel" {...form.register("telefoon")} />
                      {errors.telefoon ? <p className={errorText}>{errors.telefoon.message}</p> : null}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                       <Label htmlFor="b-opmerking">{c.booking.note}</Label>
                      <Textarea id="b-opmerking" rows={4} {...form.register("opmerking")} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="b-privacy"
                          checked={privacy === true}
                          onCheckedChange={(checked) =>
                            form.setValue("privacy", (checked === true) as true, {
                              shouldValidate: true,
                            })
                          }
                        />
                        <Label
                          htmlFor="b-privacy"
                          className="text-sm font-normal leading-relaxed text-muted-foreground"
                        >
                           {c.booking.privacy}
                        </Label>
                      </div>
                      {errors.privacy ? <p className={errorText}>{errors.privacy.message}</p> : null}
                    </div>
                  </form>
                ) : null}

                {step === 3 ? (
                  <div className="rounded-md border border-border bg-background p-6 sm:p-8">
                    <div className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl text-foreground">
                       {c.booking.confirmedTitle}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                       {c.booking.thanks}{details ? `, ${details.voornaam}` : ""}! {c.booking.confirmedText}
                    </p>
                    <div className="mt-8 border-t border-border pt-6">{summary}</div>
                  </div>
                ) : null}
              </div>

              {/* Samenvatting: sticky op desktop */}
              {step < 3 ? (
                <aside
                   aria-label={c.booking.summaryAria}
                  className="hidden lg:sticky lg:top-28 lg:block lg:self-start"
                >
                  <div className="rounded-md border border-border bg-background p-6">
                     <p className="eyebrow text-primary">{c.booking.choice}</p>
                    <div className="mt-5">{summary}</div>
                  </div>
                </aside>
              ) : null}
            </div>

            {step < 3 ? (
              <div className="mt-10 border-t border-border pt-6">
                {/* Compacte samenvatting op mobiel */}
                <p className="mb-4 text-xs text-muted-foreground lg:hidden">
                   {service ? c.services.items[service.id][0] : c.booking.noTreatment}
                   {date ? ` · ${formatDate(date, language)}` : ""}
                  {time ? ` · ${time}` : ""}
                </p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep((s) => Math.max(s - 1, 0))}
                    disabled={step === 0}
                  >
                    <ChevronLeft aria-hidden="true" />
                     {c.booking.previous}
                  </Button>
                  <Button type="button" onClick={handleNext} disabled={!canContinue}>
                     {c.booking.next}
                    <ChevronRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-10 border-t border-border pt-6">
                <Button type="button" onClick={reset}>
                   {c.booking.newBooking}
                </Button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string | undefined }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("text-right", value ? "text-foreground" : "text-muted-foreground/60")}>
        {value ?? "—"}
      </dd>
    </div>
  );
}

function Stepper({ current, labels }: { current: number; labels: readonly string[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
       {labels.map((label, index) => {
        const state = index === current ? "current" : index < current ? "done" : "todo";
        return (
          <li
            key={label}
            aria-current={state === "current" ? "step" : undefined}
            className={cn(
              "flex items-center gap-3 px-4 py-4 text-sm",
              state === "current" ? "bg-primary text-primary-foreground" : "bg-background",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                state === "current"
                  ? "border-primary-foreground/50"
                  : state === "done"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
              )}
            >
              {state === "done" ? <Check className="size-3" aria-hidden="true" /> : index + 1}
            </span>
            <span className={cn(state === "todo" && "text-muted-foreground")}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function ServiceStep({
  service,
  onSelect,
  stylist,
  onStylistChange,
  labels,
}: {
  service: Service | null;
  onSelect: (service: Service) => void;
  stylist: string;
  onStylistChange: (value: string) => void;
  labels: ReturnType<typeof useLanguage>["content"];
}) {
  return (
    <div>
       <h3 className="font-display text-2xl text-foreground">{labels.booking.chooseTreatment}</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((item) => {
          const selected = service?.id === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-pressed={selected}
                className={cn(
                  "flex h-full w-full flex-col items-start gap-1 rounded-md border p-5 text-left transition-colors",
                  selected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                 <span className="font-display text-xl text-foreground">{labels.services.items[item.id][0]}</span>
                <span className="text-xs text-muted-foreground">{item.duration} min</span>
                <span className="mt-2 text-sm font-medium text-primary">
                   {labels.services.from} €{item.price}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 max-w-sm space-y-2">
         <Label htmlFor="kapper">{labels.booking.stylist}</Label>
        <select
          id="kapper"
          value={stylist}
          onChange={(event) => onStylistChange(event.target.value)}
           aria-label={labels.booking.chooseStylist}
          className="h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground"
        >
          {stylists.map((name) => (
            <option key={name} value={name}>
               {name === stylists[0] ? labels.booking.noPreference : name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function DateStep({
  date,
  slots,
  time,
  onDateChange,
  onTimeChange,
  labels,
  language,
}: {
  date: Date | undefined;
  slots: { time: string; available: boolean }[];
  time: string | null;
  onDateChange: (date: Date | undefined) => void;
  onTimeChange: (time: string) => void;
  labels: ReturnType<typeof useLanguage>["content"];
  language: "nl" | "en";
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
         <h3 className="font-display text-2xl text-foreground">{labels.booking.chooseDay}</h3>
        <div className="mt-6 inline-block rounded-md border border-border bg-background">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            disabled={(day) => day < startOfToday() || isClosedDay(day)}
             locale={language === "nl" ? nlBE : enGB}
            weekStartsOn={1}
            className="bg-transparent"
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
           {labels.booking.closed}
        </p>
      </div>

      <div>
         <h3 className="font-display text-2xl text-foreground">{labels.booking.chooseTime}</h3>
        {date ? (
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
            {slots.map((slot) => {
              const selected = time === slot.time;
              return (
                <li key={slot.time}>
                  <button
                    type="button"
                    disabled={!slot.available}
                    onClick={() => onTimeChange(slot.time)}
                     aria-label={`${slot.time}${slot.available ? "" : ` — ${labels.booking.unavailable}`}`}
                    aria-pressed={selected}
                    className={cn(
                      "h-10 w-full rounded-md border text-sm transition-colors",
                      !slot.available && "cursor-not-allowed border-border bg-surface text-muted-foreground/70 line-through",
                      slot.available && !selected && "border-border bg-background text-foreground hover:border-primary/60",
                      selected && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {slot.time}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">
             {labels.booking.chooseDayFirst}
          </p>
        )}
      </div>
    </div>
  );
}
