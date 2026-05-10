// Card art. Uses the painted image at /public/images/cards/{id}.jpg by default,
// with the hand-drawn SVG placeholder shown while the image loads or if it fails.

import { useState } from 'react'
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

const placeholderMap = {
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
  const [state, setState] = useState('loading') // loading | loaded | failed
  const Placeholder = placeholderMap[id]

  return (
    <>
      {state !== 'loaded' && Placeholder && <Placeholder />}
      {state !== 'failed' && (
        <img
          src={`/images/cards/${id}.jpg`}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          style={{
            opacity: state === 'loaded' ? 1 : 0,
            transition: 'opacity 700ms ease'
          }}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
        />
      )}
    </>
  )
}
