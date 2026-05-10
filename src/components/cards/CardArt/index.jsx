// Placeholder card art. Each design is a small SVG vignette in the card's tone.
// Drop a real image file at /src/assets/images/cards/{id}.webp later and the
// CardFace will use it instead of the SVG placeholder.

import TheFool from './TheFool.jsx'
import TheHighPriestess from './TheHighPriestess.jsx'
import TheStar from './TheStar.jsx'
import TheHermit from './TheHermit.jsx'
import TheMoon from './TheMoon.jsx'
import TheEmpress from './TheEmpress.jsx'
import TheChalice from './TheChalice.jsx'
import TheLovers from './TheLovers.jsx'
import TheWorld from './TheWorld.jsx'
import TheSun from './TheSun.jsx'

const map = {
  1: TheFool,
  2: TheHighPriestess,
  3: TheStar,
  4: TheHermit,
  5: TheMoon,
  6: TheEmpress,
  7: TheChalice,
  8: TheLovers,
  9: TheWorld,
  10: TheSun
}

export default function CardArt({ id }) {
  const Component = map[id]
  if (!Component) return null
  return <Component />
}
