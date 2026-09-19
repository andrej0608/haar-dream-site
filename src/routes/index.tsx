import { createFileRoute } from "@tanstack/react-router";

import { AboutSection } from "@/components/AboutSection";
import { BookingSection } from "@/components/BookingSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServicesSection } from "@/components/ServicesSection";

const title = "Premium Hair Studio — Haarsalon in België";
const description =
  "Premium Hair Studio: knippen, kleuren, balayage en bruidskapsels met persoonlijk advies. Boek eenvoudig je afspraak online. Demo-website.";
const image =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/lovp_5ww67jxnb99qnva2eazap9r6xr/8697ebf620bec65b54a3b967d43b3b4a_1789819650508.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: image },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <ReviewsSection />
        <BookingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
