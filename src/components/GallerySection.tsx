import steak from "@/assets/gallery-steak.jpg";
import interior from "@/assets/gallery-interior.jpg";
import wine from "@/assets/gallery-wine.jpg";
import dessert from "@/assets/gallery-dessert.jpg";
import chef from "@/assets/gallery-chef.jpg";
import terrace from "@/assets/gallery-terrace.jpg";
import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const images = [steak, interior, wine, dessert, chef, terrace];

export function GallerySection() {
  const t = useT().gallery;
  return <section id="galerij" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /><ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map((src, index) => <Reveal as="li" key={src} delay={index * 60}><div className="overflow-hidden rounded-md border border-border"><img src={src} width={1200} height={1504} loading="lazy" alt={t.alts[index]} className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-105" /></div></Reveal>)}</ul></div></section>;
}