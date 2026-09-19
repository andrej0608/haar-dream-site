# NL/EN language switcher

## What will change
- Add a visible NL / EN switcher in the top navigation, available on desktop and mobile.
- Keep Dutch as the initial language and switch all visible content instantly without reloading.
- Translate every section, navigation label, image description, form label, validation message, toast, booking step, calendar, summary, and footer into English.
- Update the document language and page metadata when the visitor changes language.

## Technical details
- Add a small shared language context and typed translation helpers; keep language state in memory only.
- Extend the central salon configuration with Dutch and English content while preserving prices, hours, durations, and placeholder contact details.
- Make the calendar and date formatting follow the selected locale.
- Preserve the existing single-page layout, styling, mock-only booking behavior, and local images.
- Verify switching and the booking/contact interfaces at mobile and desktop widths.
