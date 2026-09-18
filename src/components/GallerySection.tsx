import balayage from "@/assets/gallery-balayage.jpg";
import bob from "@/assets/gallery-bob.jpg";
import curls from "@/assets/gallery-curls.jpg";
import details from "@/assets/gallery-details.jpg";
import glossy from "@/assets/gallery-glossy.jpg";
import updo from "@/assets/gallery-updo.jpg";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const images = [
  { src: balayage, alt: "Lang blond haar met zachte balayage, van achteren gezien" },
  { src: glossy, alt: "Donker glanzend haar met gladde textuur in close-up" },
  { src: curls, alt: "Vrouw met gedefinieerde natuurlijke krullen" },
  { src: updo, alt: "Elegant opsteekkapsel met parelspelden voor een bruid" },
  { src: bob, alt: "Stylist die een korte bob in model blaast bij een klant" },
  { src: details, alt: "Schaar, kam en haarproducten op een houten toog in de salon" },
];

export function GallerySection() {
  return (
    <section id="galerij" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Galerij"
          title="Werk uit de studio"
          subtitle="Een selectie van kleuringen, coupes en kapsels die we in de studio maakten."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <Reveal as="li" key={image.alt} delay={index * 60}>
              <div className="overflow-hidden rounded-md border border-border">
                <img
                  src={image.src}
                  width={1024}
                  height={1280}
                  loading="lazy"
                  alt={image.alt}
                  className="aspect-4/5 w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
