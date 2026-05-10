import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getMoonPhase, getMoonName, getIllumination } from '../../utils/moon.js'

// Top-right indicator. Tap five times within five seconds to summon the Sun.
export default function MoonPhase({ onFiveTaps }) {
  const [phase] = useState(() => getMoonPhase())
  const tapCount = useRef(0)
  const tapTimer = useRef(null)
  const [pulse, setPulse] = useState(false)

  useEffect(() => () => clearTimeout(tapTimer.current), [])

  function handleTap() {
    tapCount.current += 1
    setPulse(true)
    setTimeout(() => setPulse(false), 240)

    clearTimeout(tapTimer.current)
    tapTimer.current = setTimeout(() => {
      tapCount.current = 0
    }, 5000)

    if (tapCount.current >= 5) {
      tapCount.current = 0
      clearTimeout(tapTimer.current)
      if (onFiveTaps) onFiveTaps()
    }
  }

  const illum = getIllumination(phase)
  const name = getMoonName(phase)
  const waxing = phase < 0.5

  // Right half-disk for waxing, left half-disk for waning.
  const halfDiskPath = waxing
    ? 'M 0 -0.94 A 0.94 0.94 0 0 1 0 0.94 Z'
    : 'M 0 -0.94 A 0.94 0.94 0 0 0 0 0.94 Z'

  // Terminator ellipse: full ellipse centred at origin.
  // Below half: dark, sculpting away the lit half-disk into a crescent.
  // Above half: light, extending the lit half-disk into a gibbous shape.
  const ellipseRx = Math.abs(1 - 2 * illum) * 0.94
  const ellipseIsLit = illum > 0.5
  const litColour = '#f4d35e'
  const darkColour = '#0a0a1f'

  return (
    <button
      type="button"
      aria-label={`Moon phase: ${name}. Tap to listen.`}
      onClick={handleTap}
      className="fixed right-4 top-4 z-50 flex items-center justify-center"
      style={{ width: 44, height: 44 }}
    >
      <motion.div
        animate={{ scale: pulse ? 1.18 : 1 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="relative"
      >
        <svg width="28" height="28" viewBox="-1.1 -1.1 2.2 2.2" aria-hidden="true">
          <defs>
            <radialGradient id="moonGlow" cx="0" cy="0" r="1.4">
              <stop offset="0%" stopColor="rgba(244,211,94,0.4)" />
              <stop offset="60%" stopColor="rgba(212,175,55,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>
          <circle r="1.05" fill="url(#moonGlow)" />
          <circle r="0.94" fill={darkColour} stroke="rgba(212,175,55,0.5)" strokeWidth="0.03" />
          <path d={halfDiskPath} fill={litColour} />
          <ellipse
            cx={0}
            cy={0}
            rx={ellipseRx}
            ry={0.94}
            fill={ellipseIsLit ? litColour : darkColour}
          />
        </svg>
      </motion.div>
    </button>
  )
}
