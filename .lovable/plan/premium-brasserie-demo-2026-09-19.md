# Premium Brasserie demo

## Doel
De bestaande salonsite volledig vervangen door één Nederlandstalige, donkere brasseriesite voor “Premium Brasserie”, zonder opslag, verzending of externe gegevensdiensten.

## Uitvoering
- Centrale bedrijfsconfig aanpassen naar de voorbeeldgegevens in Hasselt, inclusief openingsuren, menu, reviews en navigatie.
- De taalwisselaar en alle meertalige logica verwijderen; de pagina en metadata blijven uitsluitend Nederlands.
- Het ontwerp omzetten naar midnight navy, crème en messing, met Fraunces en Manrope, consistente knoppen, dunne randen en subtiele animaties.
- Nieuwe lokale beelden genereren voor de sfeervolle brasserie, keuken en galerij; elk beeld optimaliseren tot minder dan 400 KB.
- Alle paginaonderdelen herschrijven: navigatie, beeldvullende intro, menukaart met drie tabs, over ons, galerij, fictieve reviews, contact met routekaart, vraagformulier en footer.
- De bestaande afspraakmodule vervangen door een vierstaps tafelreservatie: gezelschap en plaats, datum en mock-beschikbaarheid, persoonsgegevens en bevestiging. Alles blijft tijdelijk in het schermgeheugen en wordt nergens opgeslagen of verstuurd.
- Google Maps-links en de kaart uitsluitend opbouwen vanuit het centrale adres.

## Technische details
- Bestaande React/TanStack Start-structuur behouden; er blijft maar één inhoudspagina op `/`.
- Bestaande formulier-, kalender- en toastonderdelen hergebruiken, zonder nieuwe pakketten.
- Kalender sluit verleden, maandag en dinsdag uit; tijdsloten volgen de opgegeven lunch- en dineruren en zijn deterministisch afhankelijk van datum en groepsgrootte.
- Controleren op 375, 768 en 1440 px, inclusief navigatie, tabs, reservatie, kaart, formulieren, focusweergave en horizontale overflow.
