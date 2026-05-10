import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Inkwash / smoke veil that drifts across the screen between phases.
// Listens for phase changes and fires a 1.4s smoke pulse: ramps up,
// covers the screen at the swap moment, then clears as the new phase
// settles in beneath it.
export default function SmokeTransition({ phase }) {
  const [active, setActive] = useState(false)
  const [seed, setSeed] = useState(7)
  const lastPhase = useRef(phase)

  useEffect(() => {
    if (lastPhase.current !== phase) {
      lastPhase.current = phase
      setSeed(Math.floor(Math.random() * 200))
      setActive(true)
      const t = setTimeout(() => setActive(false), 1500)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="smoke"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[55]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0.95, 0] }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            times: [0, 0.35, 0.55, 1],
            ease: 'easeInOut'
          }}
        >
          {/* Deep dark veil */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(20,16,30,0.95) 0%, rgba(5,5,16,0.99) 70%, rgba(5,5,16,1) 100%)'
            }}
          />

          {/* Smoke noise texture, slowly drifting and scaling */}
          <motion.svg
            className="absolute inset-0 h-full w-full"
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: [1, 1.3], rotate: [0, 6] }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ opacity: 0.65 }}
          >
            <defs>
              <filter id="smoke-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.011"
                  numOctaves="3"
                  seed={seed}
                />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.06
                          0 0 0 0 0.05
                          0 0 0 0 0.12
                          0 0 0 0.8 0"
                />
              </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#smoke-noise)" />
          </motion.svg>

          {/* A second drifting layer for depth, opposite direction */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.15, x: 0 }}
            animate={{ scale: [1.15, 0.95], x: [0, -20] }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(ellipse at 35% 65%, rgba(60,45,80,0.45) 0%, transparent 60%)'
            }}
          />
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.95, x: 0 }}
            animate={{ scale: [0.95, 1.2], x: [0, 24] }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              background:
                'radial-gradient(ellipse at 70% 30%, rgba(40,30,60,0.4) 0%, transparent 65%)'
            }}
          />

          {/* A whisper of gold at the centre, like a candle flicker behind smoke */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 1.5, ease: 'easeInOut', times: [0, 0.5, 1] }}
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(244,211,94,0.22) 0%, transparent 35%)'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
