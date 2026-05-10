// CRITICAL: do not use em dashes anywhere in any copy. Use commas, full stops, or semicolons.

export const cards = [
  {
    id: 1,
    roman: 'I',
    title: 'The Fool',
    subtitle: 'The Calling',
    body: `Rebecca May.

On the 26th of June, you will be carried west.

Two nights beneath the Somerset sky. A campervan. A road that knows the way.

Glastonbury is calling you home, though you have never lived there.

Some places remember us before we arrive.`,
    glow: 'silver',
    linksTo: 'opening'
  },
  {
    id: 2,
    roman: 'II',
    title: 'The High Priestess',
    subtitle: 'The Sacred High Street',
    body: `Friday afternoon, the High Street will open itself to you.

Sons of Asgard, where the herbs are weighed by hand. The Wytches Cave, where the cards keep their secrets. Wildwood. Enlightenment, full of singing bowls that hum if you listen.

You will find something here that you didn't know you were looking for.

That is how this town works.`,
    glow: 'silver',
    linksTo: 'highStreet'
  },
  {
    id: 3,
    roman: 'III',
    title: 'The Star',
    subtitle: 'Your First Feast',
    body: `Your birthday feast has already been written.

Queen of Cups, on Northload Street. A table waits for you at seven.

You will be fed slowly, deliberately, by people who consider food a kind of spell.

Trust the menu. Trust the night.`,
    glow: 'silver',
    linksTo: 'queenOfCups'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'The Hermit',
    subtitle: 'The Climb',
    body: `Saturday begins early, before the world remembers itself.

We will climb the Tor while the mist still holds.

St Michael's Tower has stood at the summit for seven hundred years, watching pilgrims arrive at sunrise. Now it will watch you.

Four counties laid out beneath your feet. Wind in your hair. The whole valley breathing.

This is the moment the weekend turns sacred.`,
    glow: 'silver',
    linksTo: 'tor'
  },
  {
    id: 5,
    roman: 'V',
    title: 'The Moon',
    subtitle: 'Into the Underworld',
    body: `Down into Wookey Hole, where the river runs through stone older than any prayer.

A witch lives here, or once did, before a monk turned her into stone with words and water.

She is still here. You will feel her.

Bring a layer. The deep places remember the cold.`,
    glow: 'silver',
    linksTo: 'wookey'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'The Empress',
    subtitle: 'Magdeline',
    body: `Rebecca May Magdeline.

You chose this name yourself. A child standing at a font, reaching for something.

You may not have known then that the name would lead you to a road called Magdalene Street, in a town built around her ruins.

For nearly a thousand years, pilgrims have walked these stones to honour her. They came with tired hearts and asked her for healing. They left lighter.

On Saturday afternoon, you will walk the same path. Through the Abbey gates. Past the Lady Chapel, where the first church in all of Christendom is said to have stood. Past the tomb of Arthur and Guinevere. And then, quietly, into the hidden almshouse chapel that most visitors never find. Her icon waits inside.

She has been holding this place for you.

Welcome home, namesake.`,
    glow: 'gold',
    isHero: true,
    linksTo: 'abbey'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'The Chalice',
    subtitle: 'The Sacred Waters',
    body: `Chalice Well.

The waters run red here, and have done since long before anyone was counting. Iron, the books will tell you. Blood of the earth, the witches will tell you.

Drink. Fill a bottle. Sit in the gardens until you forget what time it is.

If something rises up in you here, let it.

This is a place that has been holding space for women like you for a very long time.`,
    glow: 'silver',
    linksTo: 'chaliceWell'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'The Lovers',
    subtitle: 'The Reading',
    body: `There is one more thing.

A reading has been booked in your name.

A real reader. Real cards. Real things she will say to you about your real life.

She will not tell you your future. She will tell you what you already know but have not yet said out loud.

Bring an open heart. Leave with a softer one.`,
    glow: 'silver',
    linksTo: 'tarotReading'
  },
  {
    id: 9,
    roman: 'IX',
    title: 'The World',
    subtitle: 'The Road Home',
    body: `Sunday.

Coffee in the morning light. One last wander down a street that already feels like yours.

Then the long road home, through Cheddar Gorge. Limestone cliffs rising on either side. Wild goats keeping watch from the rocks.

The weekend will end, as all weekends do.

But you will not be the same person who arrived.

That, witch, is the whole point.`,
    glow: 'silver',
    linksTo: 'cheddar'
  }
]

export const sunCard = {
  id: 10,
  roman: 'X',
  title: 'The Sun',
  subtitle: 'For You',
  body: `Happy birthday Beckee.

From Kim.`,
  glow: 'gold',
  isHidden: true
}
