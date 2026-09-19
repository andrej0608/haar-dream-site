import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "nl" | "en";

const translations = {
  nl: {
    meta: {
      title: "Premium Hair Studio — Haarsalon in België",
      description: "Premium Hair Studio: knippen, kleuren, balayage en bruidskapsels met persoonlijk advies. Boek eenvoudig je afspraak online. Demo-website.",
    },
    nav: { aria: "Hoofdnavigatie", mobileAria: "Mobiele navigatie", open: "Menu openen", close: "Menu sluiten", book: "Boek een afspraak", links: ["Diensten", "Over ons", "Galerij", "Reviews", "Contact"] },
    hero: { eyebrow: "Premium Hair Studio — België", title: "Jouw haar. Jouw stijl.", text: "Van een frisse knipbeurt tot een complete kleurtransformatie. Persoonlijk advies, premium producten en alle tijd voor jou.", services: "Ontdek onze diensten", alt: "Haarstylist die het zachte golvende haar van een klant verzorgt in een lichte salon" },
    services: {
      eyebrow: "Diensten", title: "Waarvoor je bij ons terechtkomt", subtitle: "Elke behandeling start met een korte intake, zodat we samen de juiste keuze maken voor jouw haar.", note: "Prijzen zijn indicatief. Persoonlijk advies tijdens de intake.", from: "vanaf",
      items: {
        knippen: ["Knippen & stylen", "Een frisse coupe op maat van je haarstructuur, met styling erbij."],
        kleuren: ["Kleuren", "Warme of koele tinten, uitgroei bijwerken of een volledig nieuwe kleur."],
        balayage: ["Balayage & highlights", "Zachte overgangen en natuurlijke lichtjes, met de hand geplaatst."],
        keratine: ["Keratinebehandeling", "Minder pluis, meer glans en makkelijker stylen, weken aan een stuk."],
        bruid: ["Bruidskapsels & opsteekkapsels", "Een kapsel dat de hele dag blijft zitten, proefsessie inbegrepen."],
        heren: ["Herenknipbeurt", "Scherpe lijnen, nette overgangen en advies over dagelijkse styling."],
      },
    },
    about: { eyebrow: "Over ons", title: "Een klein team, veel aandacht", paragraphs: ["Wij zijn een kleine ploeg gepassioneerde stylisten die liever iets langer met jou werkt dan snel door te gaan naar de volgende stoel. Je krijgt de tijd om te vertellen wat je wil, en wij zeggen eerlijk wat bij jouw haar past.", "We werken met premium producten die je haar gezond houden, ook na een kleuring of behandeling. En je gaat nooit naar buiten zonder advies om je coupe thuis zelf mooi te houden."], highlights: ["10+ jaar ervaring", "Premium producten", "Persoonlijk advies"], alt: "Warm ingericht saloninterieur met houten meubels, spiegels en plantjes" },
    gallery: { eyebrow: "Galerij", title: "Werk uit de studio", subtitle: "Een selectie van kleuringen, coupes en kapsels die we in de studio maakten.", alts: ["Lang blond haar met zachte balayage, van achteren gezien", "Donker glanzend haar met gladde textuur in close-up", "Vrouw met gedefinieerde natuurlijke krullen", "Elegant opsteekkapsel met parelspelden voor een bruid", "Stylist die een korte bob in model blaast bij een klant", "Schaar, kam en haarproducten op een houten toog in de salon"] },
    reviews: { eyebrow: "Reviews", title: "Wat klanten zeggen", subtitle: "Fictieve reviews voor deze demo-website, in de stijl van wat klanten doorgaans vertellen.", stars: "5 op 5 sterren", items: [{ name: "Elke V.", service: "Balayage & highlights", text: "Eindelijk een salon waar echt naar je geluisterd wordt. Mijn balayage ziet er na twee maanden nog steeds prachtig uit." }, { name: "Nathalie D.", service: "Knippen & stylen", text: "Rustige sfeer, alle tijd voor uitleg en een coupe die ik thuis zelf makkelijk goed krijg. Ik kom zeker terug." }, { name: "Thomas B.", service: "Herenknipbeurt", text: "Kort, correct en altijd op tijd. Jonas weet precies wat ik bedoel, ook als ik het zelf niet goed kan uitleggen." }] },
    booking: {
      eyebrow: "Afspraak maken", title: "Boek jouw afspraak", subtitle: "Kies je behandeling, dag en uur. Je ontvangt een bevestiging per e-mail.", steps: ["Behandeling", "Datum & uur", "Gegevens", "Bevestiging"], chooseTreatment: "Kies je behandeling", stylist: "Kapper", chooseStylist: "Kies een kapper", noPreference: "Geen voorkeur", chooseDay: "Kies een dag", closed: "Op maandag en zondag zijn we gesloten.", chooseTime: "Kies een uur", chooseDayFirst: "Kies eerst een dag om de vrije uren te zien.", unavailable: "niet beschikbaar", firstName: "Voornaam", lastName: "Achternaam", email: "E-mail", phone: "Telefoon", note: "Opmerking (optioneel)", privacy: "Ik ga akkoord met de verwerking van mijn gegevens.", confirmedTitle: "Je afspraak staat vast", thanks: "Bedankt", confirmedText: "Je afspraak is genomen. Je ontvangt een bevestiging per e-mail.", choice: "Jouw keuze", summaryAria: "Samenvatting van je keuzes", noTreatment: "Nog geen behandeling", previous: "Vorige", next: "Volgende", newBooking: "Nieuwe afspraak", labels: ["Behandeling", "Duur", "Kapper", "Datum", "Uur", "Prijs"], errors: { firstName: "Vul je voornaam in.", lastName: "Vul je achternaam in.", emailRequired: "Vul je e-mailadres in.", emailInvalid: "Vul een geldig e-mailadres in.", phone: "Vul een geldig telefoonnummer in.", privacy: "Je moet akkoord gaan met de verwerking van je gegevens." },
    },
    contact: { eyebrow: "Contact", title: "Openingsuren & contact", subtitle: "Een vraag over een behandeling of prijs? Stuur ons gerust een bericht.", hours: "Openingsuren", location: "Waar je ons vindt", demo: "Dit is een demo-website. Adres, telefoonnummer en e-mailadres zijn voorbeelden.", formTitle: "Stel je vraag", name: "Naam", email: "E-mail", message: "Bericht", privacy: "Ik ga akkoord met de verwerking van mijn gegevens.", submit: "Verstuur vraag", success: "Bedankt! We nemen zo snel mogelijk contact met je op.", errors: { name: "Vul je naam in.", emailRequired: "Vul je e-mailadres in.", emailInvalid: "Vul een geldig e-mailadres in.", message: "Je vraag mag iets uitgebreider zijn (minstens 10 tekens).", privacy: "Je moet akkoord gaan met de verwerking van je gegevens." }, days: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"], closed: "Gesloten" },
    footer: { tagline: "Warme, persoonlijke haarzorg in het hart van Voorbeeldstad. Demo-website met voorbeeldgegevens.", navigation: "Navigatie", follow: "Volg ons", instagram: "Instagram (voorbeeldlink)", facebook: "Facebook (voorbeeldlink)", rights: "Alle rechten voorbehouden." },
  },
  en: {
    meta: { title: "Premium Hair Studio — Hair Salon in Belgium", description: "Premium Hair Studio: cuts, colour, balayage and bridal styling with personal advice. Book your appointment online. Demo website." },
    nav: { aria: "Main navigation", mobileAria: "Mobile navigation", open: "Open menu", close: "Close menu", book: "Book an appointment", links: ["Services", "About us", "Gallery", "Reviews", "Contact"] },
    hero: { eyebrow: "Premium Hair Studio — Belgium", title: "Your hair. Your style.", text: "From a fresh cut to a complete colour transformation. Personal advice, premium products and all the time you deserve.", services: "Explore our services", alt: "Hair stylist caring for a client's soft, wavy hair in a bright salon" },
    services: { eyebrow: "Services", title: "What we can do for you", subtitle: "Every treatment starts with a short consultation, so together we can choose what works best for your hair.", note: "Prices are indicative. Personal advice is provided during your consultation.", from: "from", items: { knippen: ["Cut & style", "A fresh cut tailored to your hair texture, including styling."], kleuren: ["Colour", "Warm or cool tones, root touch-ups or a completely new colour."], balayage: ["Balayage & highlights", "Soft transitions and natural highlights, carefully placed by hand."], keratine: ["Keratin treatment", "Less frizz, more shine and easier styling for weeks."], bruid: ["Bridal & occasion hair", "A style that lasts all day, including a trial session."], heren: ["Men's haircut", "Sharp lines, clean blends and advice for everyday styling."] } },
    about: { eyebrow: "About us", title: "A small team, plenty of attention", paragraphs: ["We are a small team of passionate stylists who would rather spend a little longer with you than rush on to the next chair. You have time to tell us what you want, and we give honest advice about what suits your hair.", "We use premium products that keep your hair healthy, even after colouring or treatment. And you never leave without advice on how to keep your style looking great at home."], highlights: ["10+ years' experience", "Premium products", "Personal advice"], alt: "Warm salon interior with wooden furniture, mirrors and plants" },
    gallery: { eyebrow: "Gallery", title: "Work from the studio", subtitle: "A selection of colours, cuts and styles created in our studio.", alts: ["Long blonde hair with soft balayage, viewed from behind", "Dark glossy hair with a smooth texture in close-up", "Woman with defined natural curls", "Elegant bridal updo with pearl pins", "Stylist blow-drying a client's short bob", "Scissors, comb and hair products on a wooden salon counter"] },
    reviews: { eyebrow: "Reviews", title: "What clients say", subtitle: "Fictional reviews for this demo website, inspired by what clients typically tell us.", stars: "5 out of 5 stars", items: [{ name: "Elke V.", service: "Balayage & highlights", text: "Finally, a salon where they truly listen. My balayage still looks beautiful after two months." }, { name: "Nathalie D.", service: "Cut & style", text: "A calm atmosphere, plenty of explanation and a cut I can easily style at home. I'll definitely be back." }, { name: "Thomas B.", service: "Men's haircut", text: "Quick, precise and always on time. Jonas knows exactly what I mean, even when I struggle to explain it." }] },
    booking: { eyebrow: "Make an appointment", title: "Book your appointment", subtitle: "Choose your treatment, day and time. You will receive a confirmation by email.", steps: ["Treatment", "Date & time", "Details", "Confirmation"], chooseTreatment: "Choose your treatment", stylist: "Stylist", chooseStylist: "Choose a stylist", noPreference: "No preference", chooseDay: "Choose a day", closed: "We are closed on Mondays and Sundays.", chooseTime: "Choose a time", chooseDayFirst: "Choose a day first to see the available times.", unavailable: "unavailable", firstName: "First name", lastName: "Last name", email: "Email", phone: "Phone", note: "Note (optional)", privacy: "I agree to the processing of my personal data.", confirmedTitle: "Your appointment is confirmed", thanks: "Thank you", confirmedText: "Your appointment has been booked. You will receive a confirmation by email.", choice: "Your selection", summaryAria: "Summary of your selections", noTreatment: "No treatment selected", previous: "Previous", next: "Next", newBooking: "New appointment", labels: ["Treatment", "Duration", "Stylist", "Date", "Time", "Price"], errors: { firstName: "Enter your first name.", lastName: "Enter your last name.", emailRequired: "Enter your email address.", emailInvalid: "Enter a valid email address.", phone: "Enter a valid phone number.", privacy: "You must agree to the processing of your personal data." } },
    contact: { eyebrow: "Contact", title: "Opening hours & contact", subtitle: "Have a question about a treatment or price? Feel free to send us a message.", hours: "Opening hours", location: "Where to find us", demo: "This is a demo website. The address, phone number and email address are examples.", formTitle: "Ask a question", name: "Name", email: "Email", message: "Message", privacy: "I agree to the processing of my personal data.", submit: "Send question", success: "Thank you! We will get back to you as soon as possible.", errors: { name: "Enter your name.", emailRequired: "Enter your email address.", emailInvalid: "Enter a valid email address.", message: "Please provide a little more detail (at least 10 characters).", privacy: "You must agree to the processing of your personal data." }, days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], closed: "Closed" },
    footer: { tagline: "Warm, personal hair care in the heart of Example City. Demo website with sample details.", navigation: "Navigation", follow: "Follow us", instagram: "Instagram (example link)", facebook: "Facebook (example link)", rights: "All rights reserved." },
  },
} as const;

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; content: (typeof translations)[Language] };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("nl");
  const content = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.meta.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (description) description.content = content.meta.description;
    if (ogTitle) ogTitle.content = content.meta.title;
    if (ogDescription) ogDescription.content = content.meta.description;
  }, [content, language]);

  const value = useMemo(() => ({ language, setLanguage, content }), [content, language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}