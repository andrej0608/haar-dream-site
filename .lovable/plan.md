# Mobilný prepínač jazyka v hlavičke

## Zmeny
- Na mobilných šírkach zobrazím v jednom riadku logo, kompaktný prepínač `NL | EN` a hamburger.
- Zachovám minimálne 44 × 44 px dotykové plochy, zvýraznenie aktívneho jazyka mosadznou farbou, `aria-label="Taal / Language"` a `aria-pressed`.
- Prepínač odstránim z otvoreného mobilného menu, aby sa zbytočne neopakoval; rezervačné tlačidlo zostane v menu.
- Desktopovú hlavičku a jej rozloženie nemením.
- Logo bude na úzkych obrazovkách jednoriadkové a podľa potreby mierne menšie, bez pretečenia alebo zväčšenia výšky hlavičky.

## Overenie
- Skontrolujem šírky 320, 360, 390 a 414 px v NL aj EN.
- Overím jeden riadok bez prekrytia, stabilnú výšku sticky hlavičky, otvorenie menu a zachovanie pozície stránky pri prepnutí jazyka.
