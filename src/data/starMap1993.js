// Approximation of the sky over Somerset on the night of 23 June 1993.
// Coordinates are normalised (0 to 1) within the viewport.
// We pick the constellations of the Summer Triangle, which would have been
// climbing towards zenith that evening: Vega in Lyra, Deneb in Cygnus, Altair in Aquila.
// Also Bootes with Arcturus, low west, and Corona Borealis, between them.

// "natal" is the star we pulse and bloom for the supernova transition.
// Vega is the brightest star of the Summer Triangle and a fitting choice.

export const namedStars = [
  // The Summer Triangle
  { id: 'vega', name: 'Vega', x: 0.52, y: 0.32, mag: 0.03, natal: true },
  { id: 'deneb', name: 'Deneb', x: 0.66, y: 0.22, mag: 1.25 },
  { id: 'altair', name: 'Altair', x: 0.7, y: 0.55, mag: 0.77 },

  // Lyra
  { id: 'lyra-2', name: 'Sheliak', x: 0.49, y: 0.4, mag: 3.5 },
  { id: 'lyra-3', name: 'Sulafat', x: 0.55, y: 0.42, mag: 3.25 },
  { id: 'lyra-4', name: 'Zeta Lyrae', x: 0.5, y: 0.36, mag: 4.3 },

  // Cygnus, the swan
  { id: 'cyg-sadr', name: 'Sadr', x: 0.62, y: 0.31, mag: 2.2 },
  { id: 'cyg-gienah', name: 'Gienah', x: 0.55, y: 0.28, mag: 2.46 },
  { id: 'cyg-delta', name: 'Delta Cygni', x: 0.69, y: 0.32, mag: 2.87 },
  { id: 'cyg-albireo', name: 'Albireo', x: 0.6, y: 0.43, mag: 3.18 },
  { id: 'cyg-eta', name: 'Eta Cygni', x: 0.61, y: 0.36, mag: 3.89 },

  // Aquila
  { id: 'aql-tarazed', name: 'Tarazed', x: 0.69, y: 0.52, mag: 2.72 },
  { id: 'aql-alshain', name: 'Alshain', x: 0.71, y: 0.58, mag: 3.71 },

  // Bootes
  { id: 'arcturus', name: 'Arcturus', x: 0.28, y: 0.5, mag: -0.05 },
  { id: 'boo-izar', name: 'Izar', x: 0.32, y: 0.42, mag: 2.35 },
  { id: 'boo-seginus', name: 'Seginus', x: 0.3, y: 0.34, mag: 3.03 },
  { id: 'boo-nekkar', name: 'Nekkar', x: 0.36, y: 0.32, mag: 3.49 },
  { id: 'boo-rho', name: 'Rho Bootis', x: 0.36, y: 0.4, mag: 3.58 },

  // Corona Borealis
  { id: 'crb-alphecca', name: 'Alphecca', x: 0.42, y: 0.38, mag: 2.23 },
  { id: 'crb-beta', name: 'Beta CrB', x: 0.4, y: 0.36, mag: 3.66 },
  { id: 'crb-gamma', name: 'Gamma CrB', x: 0.44, y: 0.36, mag: 3.84 }
]

// Lines connecting stars to suggest the constellations, faintly.
export const constellationLines = [
  // Lyra parallelogram, with Vega at one corner
  ['vega', 'lyra-4'],
  ['lyra-4', 'lyra-2'],
  ['lyra-2', 'lyra-3'],
  ['lyra-3', 'vega'],

  // Cygnus, the northern cross
  ['deneb', 'cyg-sadr'],
  ['cyg-sadr', 'cyg-albireo'],
  ['cyg-gienah', 'cyg-sadr'],
  ['cyg-sadr', 'cyg-delta'],
  ['cyg-eta', 'cyg-sadr'],

  // Aquila spine
  ['altair', 'aql-tarazed'],
  ['altair', 'aql-alshain'],

  // The Triangle itself, drawn very faintly
  ['vega', 'deneb'],
  ['deneb', 'altair'],
  ['altair', 'vega'],

  // Bootes kite
  ['arcturus', 'boo-izar'],
  ['boo-izar', 'boo-seginus'],
  ['boo-seginus', 'boo-nekkar'],
  ['boo-nekkar', 'boo-rho'],
  ['boo-rho', 'arcturus'],

  // Corona Borealis arc
  ['crb-beta', 'crb-alphecca'],
  ['crb-alphecca', 'crb-gamma']
]

// Procedurally seeded background stars. Same seed yields same pattern,
// so the sky never changes between reloads.
function mulberry32(seed) {
  let t = seed >>> 0
  return function () {
    t = (t + 0x6d2b79f5) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

export function generateBackgroundStars(count = 220, seed = 19930623) {
  const rand = mulberry32(seed)
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      id: `bg-${i}`,
      x: rand(),
      y: rand() * 0.92, // bias slightly upward, leaving a horizon
      mag: 2 + rand() * 4,
      twinkleDelay: rand() * 4
    })
  }
  return stars
}

// Magnitude (lower is brighter) to a render radius in pixels.
export function magToRadius(mag) {
  if (mag < 0.5) return 2.4
  if (mag < 1.5) return 2.0
  if (mag < 2.5) return 1.6
  if (mag < 3.5) return 1.2
  if (mag < 4.5) return 0.9
  return 0.6
}
