export const site = {
  name: "Premium Brasserie",
  tagline: "Belgische klassiekers, met het seizoen mee.",
  phone: "+32 400 00 00 00",
  email: "info@example.com",
  address: {
    street: "Grote Markt 1",
    postalCode: "3500",
    city: "Hasselt",
    country: "België",
  },
  socials: { instagram: "#", facebook: "#" },
} as const;

export const openingHours = [
  { day: "Maandag", hours: "Gesloten", closed: true },
  { day: "Dinsdag", hours: "Gesloten", closed: true },
  { day: "Woensdag", hours: "12:00–14:00 · 18:00–21:30", closed: false },
  { day: "Donderdag", hours: "12:00–14:00 · 18:00–21:30", closed: false },
  { day: "Vrijdag", hours: "12:00–14:00 · 18:00–22:00", closed: false },
  { day: "Zaterdag", hours: "12:00–14:00 · 18:00–22:00", closed: false },
  { day: "Zondag", hours: "12:00–15:00", closed: false },
] as const;

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Over ons", href: "#over-ons" },
  { label: "Galerij", href: "#galerij" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const menu = {
  Voorgerechten: [
    { name: "Garnaalkroketten", description: "Noordzeegarnaal, gebakken peterselie en citroen", price: 18 },
    { name: "Carpaccio van rund", description: "Parmezaan, rucola en pijnpitten", price: 17 },
    { name: "Seizoenssoep", description: "Dagverse soep met huisgebakken brood", price: 9 },
    { name: "Burrata", description: "Met tomaat, basilicum en olijfolie", price: 15 },
  ],
  Hoofdgerechten: [
    { name: "Steak van Belgisch witblauw", description: "Met frietjes, sla en pepersaus", price: 32 },
    { name: "Zeetong meunière", description: "Botersaus, gekookte aardappelen en seizoensgroenten", price: 38 },
    { name: "Mosselen in witte wijn", description: "Met frietjes", price: 26 },
    { name: "Risotto met paddenstoelen", description: "Parmezaan en tuinkruiden", price: 22 },
  ],
  Desserts: [
    { name: "Dame blanche", description: "Vanille-ijs, warme chocoladesaus en slagroom", price: 10 },
    { name: "Crème brûlée", description: "Vanille en gekarameliseerde suiker", price: 9 },
    { name: "Luikse wafel", description: "Met vers fruit", price: 10 },
    { name: "Belgisch kaasplankje", description: "Selectie van drie kazen", price: 14 },
  ],
} as const;

export type MenuCategory = keyof typeof menu;

export const reviews = [
  { name: "Sofie V.", context: "Diner voor twee", text: "Heerlijke klassiekers met een fijne, moderne toets. De bediening gaf ons alle tijd." },
  { name: "Bram D.", context: "Avond met vrienden", text: "Warme sfeer, perfecte steak en een wijnadvies dat echt bij onze gerechten paste." },
  { name: "Anke M.", context: "Zondagslunch", text: "Gezellig zonder stijf te zijn. De seizoensgerechten waren vers en mooi in balans." },
] as const;

export const occasions = [
  "Geen bijzondere gelegenheid",
  "Verjaardag",
  "Zakelijk diner",
  "Romantisch diner",
] as const;