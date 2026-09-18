/**
 * Eén centrale plek voor alle bedrijfsgegevens.
 * DEMO-site: alle contactgegevens zijn placeholders.
 */
export const site = {
  name: "Premium Hair Studio",
  tagline: "Jouw haar. Jouw stijl.",
  phone: "+32 400 00 00 00",
  email: "info@example.com",
  address: {
    street: "Voorbeeldstraat 12",
    city: "1000 Voorbeeldstad",
    country: "België",
  },
  socials: {
    instagram: "#",
    facebook: "#",
  },
} as const;

export type OpeningHour = {
  /** Volledige dagnaam */
  day: string;
  /** Korte label zoals in de navigatie */
  short: string;
  hours: string;
  closed: boolean;
  /** 0 = zondag ... 6 = zaterdag */
  weekday: number;
};

export const openingHours: OpeningHour[] = [
  { day: "Maandag", short: "ma", hours: "Gesloten", closed: true, weekday: 1 },
  { day: "Dinsdag", short: "di", hours: "09:00 – 18:00", closed: false, weekday: 2 },
  { day: "Woensdag", short: "wo", hours: "09:00 – 18:00", closed: false, weekday: 3 },
  { day: "Donderdag", short: "do", hours: "09:00 – 18:00", closed: false, weekday: 4 },
  { day: "Vrijdag", short: "vr", hours: "09:00 – 18:00", closed: false, weekday: 5 },
  { day: "Zaterdag", short: "za", hours: "08:30 – 16:00", closed: false, weekday: 6 },
  { day: "Zondag", short: "zo", hours: "Gesloten", closed: true, weekday: 0 },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Vanaf-prijs in euro */
  price: number;
  /** Duur in minuten */
  duration: number;
};

export const services: Service[] = [
  {
    id: "knippen",
    name: "Knippen & stylen",
    description: "Een frisse coupe op maat van je haarstructuur, met styling erbij.",
    price: 45,
    duration: 45,
  },
  {
    id: "kleuren",
    name: "Kleuren",
    description: "Warme of koele tinten, uitgroei bijwerken of een volledig nieuwe kleur.",
    price: 65,
    duration: 90,
  },
  {
    id: "balayage",
    name: "Balayage & highlights",
    description: "Zachte overgangen en natuurlijke lichtjes, met de hand geplaatst.",
    price: 120,
    duration: 180,
  },
  {
    id: "keratine",
    name: "Keratinebehandeling",
    description: "Minder pluis, meer glans en makkelijker stylen, weken aan een stuk.",
    price: 150,
    duration: 150,
  },
  {
    id: "bruid",
    name: "Bruidskapsels & opsteekkapsels",
    description: "Een kapsel dat de hele dag blijft zitten, proefsessie inbegrepen.",
    price: 80,
    duration: 90,
  },
  {
    id: "heren",
    name: "Herenknipbeurt",
    description: "Scherpe lijnen, nette overgangen en advies over dagelijkse styling.",
    price: 30,
    duration: 30,
  },
];

export const stylists = ["Geen voorkeur", "Sophie", "Lotte", "Jonas"] as const;

export const navLinks = [
  { label: "Diensten", href: "#diensten" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Galerij", href: "#galerij" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const reviews = [
  {
    name: "Elke V.",
    service: "Balayage & highlights",
    text: "Eindelijk een salon waar echt naar je geluisterd wordt. Mijn balayage ziet er na twee maanden nog steeds prachtig uit.",
  },
  {
    name: "Nathalie D.",
    service: "Knippen & stylen",
    text: "Rustige sfeer, alle tijd voor uitleg en een coupe die ik thuis zelf makkelijk goed krijg. Ik kom zeker terug.",
  },
  {
    name: "Thomas B.",
    service: "Herenknipbeurt",
    text: "Kort, correct en altijd op tijd. Jonas weet precies wat ik bedoel, ook als ik het zelf niet goed kan uitleggen.",
  },
] as const;

export const formattedPrice = (price: number) => `vanaf €${price}`;
