import { Star } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { reviews } from "@/config/site";

export function ReviewsSection() {
  const t = useT().reviews;
  return <section id="reviews" className="border-t border-border bg-surface py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /><ul className="mt-14 grid gap-4 lg:grid-cols-3">{reviews.map((review, index) => <Reveal as="li" key={review.name} delay={index * 80}><figure className="flex h-full flex-col gap-5 rounded-md border border-border bg-card p-8"><div className="flex gap-1" aria-label={t.stars}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-primary text-primary" aria-hidden="true" />)}</div><blockquote className="text-base leading-relaxed text-foreground">“{t.items[index].text}”</blockquote><figcaption className="mt-auto text-sm text-muted-foreground"><span className="font-semibold text-foreground">{review.name}</span> — {t.items[index].context}</figcaption></figure></Reveal>)}</ul></div></section>;
}