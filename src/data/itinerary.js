// CRITICAL: no em dashes anywhere in any copy.

// Image attribution: Wikimedia Commons under CC-BY-SA / public domain.
// See public/images/itinerary/ATTRIBUTION.txt if we ever go public with this.

export const itinerary = {
  highStreet: {
    title: 'The Sacred High Street',
    day: 'Friday',
    time: '4pm onwards',
    intro: 'The witches close up around six, so we move with intention.',
    images: ['/images/itinerary/highStreet/1.jpg', '/images/itinerary/highStreet/2.jpg'],
    stops: [
      {
        name: 'Sons of Asgard Witchcraft Emporium',
        address: '13 High St, Glastonbury BA6 9DP',
        hours: '10am to 6pm',
        url: 'https://sonsofasgard.com',
        description: 'Magical apothecary. Custom bath salts. Herbs by hand.'
      },
      {
        name: 'The Wytches Cave',
        address: '51 High St, Glastonbury BA6 9DS',
        hours: 'Until 6pm',
        description: "Witchy treasures, and where Beckee's tarot reading is booked."
      },
      {
        name: 'Wildwood',
        address: 'High Street, Glastonbury',
        description: 'Curiosities and crystals.'
      },
      {
        name: 'Enlightenment',
        address: 'High Street, Glastonbury',
        description: 'Singing bowls and sound healing instruments that hum if you listen.'
      },
      {
        name: 'Goddess Temple Gifts and The Goddess Temple',
        address: '2 to 4 High St, Glastonbury BA6 9DU',
        description: 'Shop downstairs, sacred temple upstairs. Free entry, donations welcome. Closes 4pm.'
      }
    ]
  },
  queenOfCups: {
    title: 'Queen of Cups',
    day: 'Friday',
    time: '7pm',
    address: '2 Northload St, Glastonbury BA6 9JJ',
    url: 'https://queenofcupsglastonbury.com',
    description: 'Birthday feast. Tasting menu energy. Vegetarian friendly. Booked.',
    bookingStatus: 'TO CONFIRM',
    images: ['/images/itinerary/queenOfCups/1.webp']
  },
  tor: {
    title: 'Glastonbury Tor',
    day: 'Saturday',
    time: '8am',
    address: 'Glastonbury Tor, Glastonbury BA6 8BG',
    description: 'Park at Chalice Orchard. 20 minute walk to the summit. Wear sensible shoes.',
    practical: 'Sunrise on 27 June 2026 is around 5am. 8am is golden, before the crowds.',
    images: [
      '/images/itinerary/tor/1.jpg',
      '/images/itinerary/tor/2.jpg',
      '/images/itinerary/tor/3.jpg'
    ]
  },
  wookey: {
    title: 'Wookey Hole Caves',
    day: 'Saturday',
    time: '11:30am',
    address: 'Wookey Hole, Wells BA5 1BB',
    url: 'https://wookey.co.uk',
    description: 'Home of the Witch of Wookey Hole. Cave tours, waterfalls, walks. Allow 2 to 3 hours.',
    practical: 'Bring a layer. The caves are cold year round.',
    images: ['/images/itinerary/wookey/1.jpg', '/images/itinerary/wookey/2.jpg']
  },
  abbey: {
    title: "Glastonbury Abbey and St Margaret's Chapel",
    day: 'Saturday',
    time: '3pm',
    address: 'Magdalene St, Glastonbury BA6 9EL',
    url: 'https://glastonburyabbey.com',
    description: "The Lady Chapel. King Arthur and Guinevere's tomb. Then a five minute walk to St Margaret's Chapel and the Magdalene Almshouses, the hidden pilgrim's sanctuary.",
    history: 'For nearly a thousand years, pilgrims have walked Magdalene Street to honour Mary Magdalene, patron saint of healing. The Magdalene Almshouses date from around 1310 and were originally a hospital for pilgrims. The chapel inside holds an icon of Mary Magdalene.',
    images: [
      '/images/itinerary/abbey/1.jpg',
      '/images/itinerary/abbey/2.jpg',
      '/images/itinerary/abbey/3.jpg'
    ]
  },
  chaliceWell: {
    title: 'Chalice Well and Gardens',
    day: 'Saturday',
    time: '4:45pm',
    address: '85 to 88 Chilkwell St, Glastonbury BA6 8DD',
    url: 'https://chalicewell.org.uk',
    description: 'The red waters. The vesica piscis well lid. Sacred gardens.',
    practical: "Closes at 5:30pm. Bring a bottle to fill from the lion's head fountain.",
    images: [
      '/images/itinerary/chaliceWell/1.jpg',
      '/images/itinerary/chaliceWell/2.jpg',
      '/images/itinerary/chaliceWell/3.jpg'
    ]
  },
  tarotReading: {
    title: 'Tarot Reading at The Wytches Cave',
    day: 'Saturday',
    time: 'TO BOOK',
    address: '51 High St, Glastonbury BA6 9DS',
    description: "A real reading with a real reader. Booked in Beckee's name. Already paid for.",
    bookingStatus: 'TO BOOK',
    images: ['/images/itinerary/tarotReading/1.webp']
  },
  cheddar: {
    title: 'Cheddar Gorge',
    day: 'Sunday',
    time: '10am',
    address: 'Cheddar Gorge, Cheddar BS27 3QF',
    description: 'Drive through the gorge. Limestone cliffs. Wild goats. Stop at the viewpoints.',
    practical: 'The road is narrow and twisty in places. Take it slow in the campervan.',
    images: [
      '/images/itinerary/cheddar/1.jpg',
      '/images/itinerary/cheddar/2.jpg',
      '/images/itinerary/cheddar/3.jpg'
    ]
  }
}

// Order of itinerary keys, matched to card index (0 to 8 maps to cards I to IX).
export const itineraryOrder = [
  'opening',
  'highStreet',
  'queenOfCups',
  'tor',
  'wookey',
  'abbey',
  'chaliceWell',
  'tarotReading',
  'cheddar'
]
