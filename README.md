# Premium Hair Demo

Build a modern, premium single-page website for a hair salon in Belgium. It is a generic DEMO site (not for a real business), so all copy is in Dutch (Flemish tone, informal "je/jij") and all contact details are clearly placeholders.

## Business
- Name: "Premium Hair Studio". Define it once in src/config/site.ts (name, phone, email, address, opening hours) and import it everywhere, so it can be changed in one place.
- Placeholder details: Voorbeeldstraat 12, 1000 Voorbeeldstad, België / +32 400 00 00 00 / info@example.com

## Technical constraints (important)
- React + Vite + TypeScript + Tailwind. ONE page with smooth-scroll anchor navigation. No router, no extra pages.
- NO backend: no Supabase, no auth, no database, no booking system, no external APIs.
- All images must be generated/saved as LOCAL files in src/assets and imported in components. Do not hotlink Unsplash or any external image URL.
- Do not add any Lovable badge, watermark or "Edit with Lovable" element.
- Fully responsive, mobile-first, tested at 375px, 768px and 1440px. Semantic HTML, alt texts in Dutch, visible focus states, good contrast.
- Set <html lang="nl"> and write a proper Dutch <title> and meta description.

## Design direction
Warm, elegant, editorial salon feel. Light theme, clearly different from a dark/techy look.
- Colors: background ivory #F7F1EA, surface #EFE5DA, text espresso #2A1F1A, muted text #7A6A5F, accent terracotta #B5654A (hover #94503A), borders #E2D5C7. Use the accent sparingly (buttons, small labels, highlights).
- Fonts (Google Fonts): "Cormorant Garamond" for headings (large, light/medium weight, tight leading), "DM Sans" for body and UI.
- Generous whitespace, large rounded-none or subtly rounded (4px) corners, thin 1px borders, subtle fade-up on scroll, image hover zoom in the gallery. No heavy gradients, no glassmorphism, no emojis.

## Sections (in this order)
1. Navbar: sticky, logo text "Premium Hair Studio", links (Diensten, Over ons, Galerij, Reviews, Contact), a button "Vraag een afspraak aan" that scrolls to the contact form. Mobile: hamburger menu.
2. Hero: full-width background photo (generated: modern bright salon, stylist working on soft wavy hair, warm natural light, no text or logos in the image) with a light overlay for readability. Small badge "PREMIUM HAIR STUDIO — BELGIË", H1 "Jouw haar. Jouw stijl.", subtext "Van een frisse knipbeurt tot een complete kleurtransformatie. Persoonlijk advies, premium producten en alle tijd voor jou.", two buttons: "Vraag een afspraak aan" (primary, scrolls to form) and "Ontdek onze diensten" (secondary).
3. Diensten: grid of 6 cards with name, one short line and a "vanaf" price: Knippen & stylen (vanaf €45), Kleuren (vanaf €65), Balayage & highlights (vanaf €120), Keratinebehandeling (vanaf €150), Bruidskapsels & opsteekkapsels (vanaf €80), Herenknipbeurt (vanaf €30). Note under the grid: "Prijzen zijn indicatief. Persoonlijk advies tijdens de intake."
4. Over ons: two columns, generated photo (salon interior) + short warm text about a small team of passionate stylists, premium products, taking time for each client. Three small highlights below: "10+ jaar ervaring", "Premium producten", "Persoonlijk advies".
5. Galerij: masonry or 6-image grid of generated hair/salon photos (varied: blonde balayage, dark glossy hair, curls, updo, salon details). Consistent warm color grading, no text in images.
6. Reviews: 3 testimonial cards with first name + last initial and 5 stars. Realistic, short, Dutch.
7. Openingsuren + Contact: two columns. Left: opening hours (ma gesloten, di-vr 09:00-18:00, za 08:30-16:00, zo gesloten), address, phone, email. Right: the contact form.
8. Footer: name, short tagline, nav links, placeholder social icons (Instagram, Facebook), "© 2026 Premium Hair Studio. Alle rechten voorbehouden."

## Contact form (frontend only)
Fields: Voornaam, Achternaam, E-mail, Telefoon (optional), Gewenste dienst (select with the 6 services + "Weet ik nog niet"), Gewenste dag/periode (optional free text, e.g. "donderdagnamiddag"), Bericht (textarea), and a required privacy checkbox "Ik ga akkoord met de verwerking van mijn gegevens.".
- Validate with react-hook-form + zod, with Dutch error messages.
- On submit: no network request. Show a success state/toast: "Bedankt! We nemen zo snel mogelijk contact met je op." and reset the form.
- Submit button text: "Verstuur aanvraag". This is a request form, NOT a booking system: no calendar, no time slots.

## Quality bar
- Keep the code clean and componentized (one component per section) so it is easy to edit afterwards.
- Keep images reasonably light (target under 400 KB each).
- Make sure the site looks finished and consistent: same spacing rhythm, same button styles, same heading sizes across all sections.
add a VISUAL-ONLY online booking flow. It must look and feel like a real booking system, but nothing is stored or sent anywhere. ## Constraints - Frontend only. No backend, no Supabase, no API calls, no localStorage, no new dependencies (use the existing shadcn Calendar / react-day-picker if it is already in the project). - All state lives in one component with useState. All availability is hardcoded mock data, fully deterministic (no Math.random), so it looks the same on every load. - Put it in src/components/BookingSection.tsx (step subcomponents may live in the same file or a folder next to it). - Reuse the existing design system: same colors, fonts, button styles, spacing. ## Placement - New section "Afspraak maken" with id="afspraak", placed after Reviews and before Openingsuren + Contact. Title: "Boek jouw afspraak". Subtitle: "Kies je behandeling, dag en uur. Je ontvangt een bevestiging per e-mail." - All "Vraag een afspraak aan" buttons (navbar, hero) are renamed "Boek een afspraak" and scroll to #afspraak. - The contact form in the contact section becomes a simple question form: Naam, E-mail, Bericht, privacy checkbox. Remove the service and preferred-day fields from it. Keep its Dutch validation and success toast. ## Booking flow (4 steps, with a stepper on top: Behandeling / Datum & uur / Gegevens / Bevestiging) 1. Behandeling: the 6 services as selectable cards (name, duration, "vanaf" price). Durations: Knippen & stylen 45 min, Kleuren 90 min, Balayage & highlights 180 min, Keratinebehandeling 150 min, Bruidskapsels 90 min, Herenknipbeurt 30 min. Below the cards a select "Kapper": Geen voorkeur, Sophie, Lotte, Jonas. 2. Datum & uur: calendar on the left, time slots on the right. Disable past dates, Mondays and Sundays. Slots every 30 minutes within opening hours (di-vr 09:00-18:00, za 08:30-16:00). Mark some slots as unavailable (greyed out, strikethrough), chosen deterministically from the date number. Selected slot uses the accent color. 3. Gegevens: Voornaam, Achternaam, E-mail, Telefoon, Opmerking (optional), required privacy checkbox. Validate with react-hook-form + zod (if already in the project), Dutch error messages. 4. Bevestiging: a success card with a summary (behandeling, kapper, datum, uur, "vanaf" price) and the text "Bedankt! Je afspraak is genomen. Je ontvangt een bevestiging per e-mail." Button "Nieuwe afspraak" resets the whole flow. ## UX details - Buttons "Vorige" and "Volgende"; "Volgende" is disabled until the current step is valid. - Desktop: sticky summary panel on the right showing the current selections. Mobile: compact summary bar above the buttons. - Fully responsive (375px, 768px, 1440px), visible focus states, Dutch labels and aria-labels.

dont offer me supabase, email notification, or connect backend, it is supopsed to be mock

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/9ba24907-6c06-4266-8cf5-0e58f4bf1789).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
