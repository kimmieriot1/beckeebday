import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiligreeDivider } from '../shared/Filigree.jsx'
import { tap } from '../../utils/haptics.js'

// A stylised map of the weekend. Pins placed in approximate geographic
// relationship to Glastonbury (not literal cartography). A faint dotted
// path connects them in chronological order. The Abbey glows.

const PINS = [
  { id: 'origin', label: 'Driving west', roman: 'I', x: 6, y: 92, isOrigin: true },
  { id: 'highStreet', label: 'High Street', roman: 'II', x: 50, y: 52 },
  { id: 'queenOfCups', label: 'Queen of Cups', roman: 'III', x: 38, y: 42 },
  { id: 'tor', label: 'Glastonbury Tor', roman: 'IV', x: 82, y: 64 },
  { id: 'wookey', label: 'Wookey Hole', roman: 'V', x: 56, y: 14 },
  { id: 'abbey', label: 'The Abbey', roman: 'VI', x: 46, y: 60, isHero: true },
  { id: 'chalice', label: 'Chalice Well', roman: 'VII', x: 64, y: 70 },
  { id: 'reading', label: 'The Reading', roman: 'VIII', x: 54, y: 48 },
  { id: 'cheddar', label: 'Cheddar Gorge', roman: 'IX', x: 18, y: 8 }
]

export default function WeekendMap({ onContinue }) {
  const [showContinue, setShowContinue] = useState(false)
  // Total map animation: 0.6s opening + (9 pins * 0.35s) + 1.5s breath
  const continueDelay = 0.6 + PINS.length * 0.35 + 1500 / 1000

  useEffect(() => {
    const t = setTimeout(() => setShowContinue(true), continueDelay * 1000)
    return () => clearTimeout(t)
  }, [continueDelay])

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center px-4 pb-20 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        <p className="font-roman text-[10px] uppercase tracking-sacred text-gold-bright">
          Your route
        </p>
        <FiligreeDivider tone="gold" className="mt-4 opacity-80" />
        <h2 className="mt-4 font-display text-3xl italic text-text-cream sm:text-4xl">
          The weekend, mapped.
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1.4 }}
        className="mt-8 w-full max-w-md"
      >
        <MapSVG />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showContinue ? 0.85 : 0 }}
        transition={{ duration: 1.2 }}
        className="mt-10 flex flex-col items-center"
      >
        <button
          type="button"
          onClick={() => {
            tap()
            onContinue()
          }}
          disabled={!showContinue}
          className="font-roman text-xs uppercase tracking-sacred text-gold-bright hover:text-gold-warm"
        >
          Continue
        </button>
      </motion.div>
    </div>
  )
}

function MapSVG() {
  // Path goes through pins in chronological order (I to IX)
  const polyPoints = PINS.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div
      className="relative w-full overflow-hidden rounded-md"
      style={{
        aspectRatio: '4 / 5',
        background:
          'radial-gradient(ellipse at 50% 40%, #14102a 0%, #0a0814 65%, #050510 100%)',
        border: '1px solid rgba(212,175,55,0.35)',
        boxShadow: '0 0 40px rgba(212,175,55,0.08), inset 0 0 60px rgba(0,0,0,0.5)'
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {/* Faint background stars */}
        {STAR_DUST.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill="#f5f1e8"
            opacity={s.o}
          />
        ))}

        {/* Subtle suggestion of a town footprint */}
        <ellipse
          cx="48"
          cy="54"
          rx="22"
          ry="14"
          fill="none"
          stroke="rgba(212,175,55,0.18)"
          strokeWidth="0.18"
          strokeDasharray="1 1.5"
        />

        {/* Compass rose, top right */}
        <g transform="translate(90 10)" opacity="0.5">
          <circle r="3.5" fill="none" stroke="rgba(212,175,55,0.55)" strokeWidth="0.18" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(212,175,55,0.55)" strokeWidth="0.18" />
          <line x1="-3" y1="0" x2="3" y2="0" stroke="rgba(212,175,55,0.4)" strokeWidth="0.15" />
          <path d="M 0 -3 L -0.5 -0.5 L 0.5 -0.5 Z" fill="rgba(212,175,55,0.6)" />
          <text x="0" y="-4.2" textAnchor="middle" fontSize="1.6" fontFamily="serif" fontStyle="italic" fill="rgba(245,241,232,0.7)">N</text>
        </g>

        {/* The journey path, dashed gold, animates in */}
        <motion.polyline
          points={polyPoints}
          fill="none"
          stroke="rgba(244,211,94,0.55)"
          strokeWidth="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0.8 1.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 3.5, ease: 'easeInOut' }}
        />

        {/* Pins */}
        {PINS.map((pin, i) => {
          const delay = 1.2 + i * 0.35
          const labelOnLeft = pin.x > 55
          const labelX = labelOnLeft ? pin.x - 2.2 : pin.x + 2.2
          const labelAnchor = labelOnLeft ? 'end' : 'start'
          return (
            <motion.g
              key={pin.id}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{ transformOrigin: `${pin.x}% ${pin.y}%` }}
            >
              {pin.isHero && (
                <motion.circle
                  cx={pin.x}
                  cy={pin.y}
                  r="3"
                  fill="none"
                  stroke="#f4d35e"
                  strokeWidth="0.25"
                  animate={{ scale: [1, 1.7, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                  style={{ transformOrigin: `${pin.x}% ${pin.y}%` }}
                />
              )}
              <circle
                cx={pin.x}
                cy={pin.y}
                r={pin.isHero ? 4 : 3}
                fill={pin.isHero ? 'rgba(244,211,94,0.18)' : 'rgba(244,211,94,0.1)'}
              />
              <circle
                cx={pin.x}
                cy={pin.y}
                r={pin.isHero ? 1.6 : 1.2}
                fill={pin.isHero ? '#f4d35e' : '#d4af37'}
                stroke="#080714"
                strokeWidth="0.15"
              />
              <text
                x={labelX}
                y={pin.y + 0.6}
                textAnchor={labelAnchor}
                fontFamily="serif"
                fontStyle="italic"
                fontSize="2.0"
                fill={pin.isHero ? 'rgba(244,211,94,0.95)' : 'rgba(245,241,232,0.88)'}
                style={{
                  paintOrder: 'stroke',
                  stroke: '#080714',
                  strokeWidth: '0.5'
                }}
              >
                {pin.label}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

// Procedurally-placed background stars for the map. Stable seed for consistent look.
const STAR_DUST = (function () {
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
  const rand = mulberry32(20260626)
  const out = []
  for (let i = 0; i < 80; i++) {
    out.push({
      x: rand() * 100,
      y: rand() * 100,
      r: 0.1 + rand() * 0.18,
      o: 0.3 + rand() * 0.5
    })
  }
  return out
})()
