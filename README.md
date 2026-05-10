# Rebecca's Birthday Reveal

A magical, mobile-first interactive tarot experience that reveals a birthday weekend itinerary.
Built as a single-page React app, deployed to Vercel.

For: Rebecca May Magdeline Gartland (Beckee)
Trip: 26 to 28 June 2026, Glastonbury, Somerset.

## Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Howler.js (audio, optional)
- html2pdf.js (itinerary export)
- Custom SVG star map and card art

## Run it

```bash
npm install
npm run dev
```

Then open the local URL on your phone via your local network for the real test.
The mobile experience is the only one that matters.

## Build

```bash
npm run build
npm run preview
```

## Deploy

Drop the project into a Vercel project. Build command `npm run build`, output `dist`.

## File structure

```
/src
  /components
    /opening      LandingScreen, StarMap, Supernova
    /cards        TarotCard (CardBack + CardFront), CardSequence, CardArt/*
    /reveal       FinalSpread, ItineraryModal, EndScreen
    /shared       MoonPhase, AudioToggle, Countdown, GrainOverlay,
                  Vignette, Filigree, HiddenSunCard
  /data           cards.js, itinerary.js, starMap1993.js
  /utils          moon.js (replaces lunar-phase-js), audio.js
  /styles         globals.css
  App.jsx         The phase state machine.
  main.jsx
```

Note: I folded the planned per-location ItineraryModules/ into a single configurable
ItineraryModal that branches on data shape (stops, history, practical, bookingStatus).
Less code, same outcome. If a single stop ever needs a fully bespoke layout, add a
component in /reveal/ItineraryModules and wire it in by key.

## Assets to drop in later

The app runs without these. They make it real.

- `/public/audio/ambient-drone.mp3` — slow, dreamy drone, loops. Hauschka or Jóhannsson energy.
- `/public/audio/card-flip.mp3` — soft whoosh + paper.
- `/public/audio/supernova.mp3` — rising chime + soft boom.
- `/public/audio/wind-chime.mp3` — very subtle, intermittent.
- `/public/audio/empress-tone.mp3` — single sustained note for the Empress card.
- `/public/images/kim-and-beckee.jpg` — for the End screen.
- `/src/assets/images/cards/{1..10}.webp` — the real tarot art.
  Filenames map by id (1 = Fool, 6 = Empress, 10 = Sun).
  Until these arrive, the SVG placeholders in `CardArt/` carry the look.

## Tarot art prompts

For Midjourney / Flux / DALL-E. Use a consistent system prompt:

> Tarot card illustration in dark academia meets pre-Raphaelite style. Ornate gold filigree
> border with roman numeral at the top centre. Deep midnight blue and black background with
> subtle nebula texture. Gold leaf accents catching candlelight. Painterly, dreamlike,
> ethereal, witchy, sacred. Heavy chiaroscuro. Portrait orientation 2:3 ratio. NOT bright.
> NOT cheerful. NOT pastel. Dark, candlelit, mystical.

Per-card prompts live in the brief.

When the .webp files arrive, swap each SVG component in `/src/components/cards/CardArt/`
with an `<img>` referencing the asset. Or, simpler: change `CardArt/index.jsx` to render
`<img src={`/cards/${id}.webp`} className="absolute inset-0 h-full w-full object-cover" />`.

## Itinerary photos

Add 2 to 3 images per stop in `/public/images/itinerary/{key}/{1..3}.webp`, then extend
`ItineraryModal.jsx` to render a small gallery row from those paths. Use venue social
photos (with permission) or Unsplash; do not pull from Google Image search results.

## Easter egg

Tap the moon icon (top-right) five times within five seconds. The Sun card will rise,
and from then on it lives quietly to the right of the final spread.

## Hard rules

1. No em dashes anywhere in user-facing copy. Commas, full stops, semicolons.
2. Mobile-first. Test every animation on a real phone.
3. The Empress card is the emotional centre. It is slower, warmer, larger. Do not normalise it.
4. Dark, witchy, magical. No bright colours, no SaaS gradients.
5. Reverence over cleverness.

## Booking placeholders to update before sending

In `/src/data/itinerary.js`:

- `queenOfCups.bookingStatus` is `TO CONFIRM`. Change to the confirmed time once booked.
- `tarotReading.time` and `bookingStatus` are `TO BOOK`. Add the reader's name and time.
