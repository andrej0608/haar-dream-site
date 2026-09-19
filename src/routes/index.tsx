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

const title = "Premium Brasserie — Moderne Belgische keuken in Hasselt";
const description =
  "Ontdek Premium Brasserie: moderne Belgische gerechten met lokale, seizoensgebonden producten. Een sfeervolle demo-website.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
