import steak from "@/assets/gallery-steak.jpg";
import interior from "@/assets/gallery-interior.jpg";
import wine from "@/assets/gallery-wine.jpg";
import dessert from "@/assets/gallery-dessert.jpg";
import chef from "@/assets/gallery-chef.jpg";
import terrace from "@/assets/gallery-terrace.jpg";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const images = [
  [steak, "Steak van Belgisch witblauw met frietjes en pepersaus"],
  [interior, "Warm interieur van de brasserie met gedekte tafels"],
  [wine, "Glas rode wijn op een sfeervol gedekte tafel"],
  [dessert, "Huisgemaakte crème brûlée met vers fruit"],
  [chef, "Chef aan het werk in de open keuken"],
  [terrace, "Verlicht terras van de brasserie bij avond"],
] as const;

export function GallerySection() {
  return <section id="galerij" className="border-t border-border py-24 sm:py-32"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionHeading eyebrow="Galerij" title="Aan tafel bij ons" subtitle="Van de eerste mise-en-place tot de laatste koffie van de avond." /><ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{images.map(([src, alt], index) => <Reveal as="li" key={src} delay={index * 60}><div className="overflow-hidden rounded-md border border-border"><img src={src} width={1200} height={1504} loading="lazy" alt={alt} className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-105" /></div></Reveal>)}</ul></div></section>;
}