import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  namedStars,
  constellationLines,
  generateBackgroundStars,
  magToRadius
} from '../../data/starMap1993.js'

// The night sky over Somerset on 23 June 1993.
// Stars fade in (4s), constellation lines trace in (2s), text appears (2s).
// Vega, the natal star, begins to pulse at the end. Tap anywhere to ignite the supernova.
export default function StarMap({ onIgnite }) {
  const bg = useMemo(() => generateBackgroundStars(220), [])
  const [textVisible, setTextVisible] = useState(false)
  const [primed, setPrimed] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 4500)
    const t2 = setTimeout(() => setPrimed(true), 7200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  const starById = useMemo(() => {
    const map = {}
    for (const s of namedStars) map[s.id] = s
    return map
  }, [])

  return (
    <button
      type="button"
      aria-label="The night you were born. Tap to continue."
      onClick={() => primed && onIgnite()}
      className="relative block min-h-[100dvh] w-full cursor-default"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* faint milky band */}
        <defs>
          <linearGradient id="milky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(245,241,232,0)" />
            <stop offset="50%" stopColor="rgba(201,201,212,0.04)" />
            <stop offset="100%" stopColor="rgba(245,241,232,0)" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#milky)" />

        {/* background stars */}
        {bg.map((s, i) => (
          <motion.circle
            key={s.id}
            cx={s.x * 100}
            cy={s.y * 100}
            r={magToRadius(s.mag) * 0.35}
            fill="#f5f1e8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{
              delay: (i / bg.length) * 4,
              duration: 0.9,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* constellation lines, traced */}
        {constellationLines.map(([a, b], i) => {
          const sa = starById[a]
          const sb = starById[b]
          if (!sa || !sb) return null
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={sa.x * 100}
              y1={sa.y * 100}
              x2={sb.x * 100}
              y2={sb.y * 100}
              stroke="#c9c9d4"
              strokeOpacity="0.35"
              strokeWidth="0.12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: 4 + (i / constellationLines.length) * 2,
                duration: 1.2,
                ease: 'easeOut'
              }}
            />
          )
        })}

        {/* named stars */}
        {namedStars.map((s, i) => (
          <motion.g
            key={s.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 2 + (i / namedStars.length) * 2,
              duration: 0.9,
              ease: 'easeOut'
            }}
          >
            {s.natal && primed && (
              <motion.circle
                cx={s.x * 100}
                cy={s.y * 100}
                r={magToRadius(s.mag) * 1.2}
                fill="#f4d35e"
                opacity="0.18"
                animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: `${s.x * 100}% ${s.y * 100}%` }}
              />
            )}
            <circle
              cx={s.x * 100}
              cy={s.y * 100}
              r={magToRadius(s.mag) * 0.45}
              fill={s.natal ? '#f4d35e' : '#f5f1e8'}
            />
            {/* a faint cross-glow on the brightest stars */}
            {s.mag < 1.5 && (
              <g
                stroke={s.natal ? '#f4d35e' : '#f5f1e8'}
                strokeOpacity="0.45"
                strokeWidth="0.06"
              >
                <line x1={s.x * 100 - 1.4} y1={s.y * 100} x2={s.x * 100 + 1.4} y2={s.y * 100} />
                <line x1={s.x * 100} y1={s.y * 100 - 1.4} x2={s.x * 100} y2={s.y * 100 + 1.4} />
              </g>
            )}
          </motion.g>
        ))}
      </svg>

      {/* text overlay */}
      <div className="pointer-events-none relative z-10 flex min-h-[100dvh] flex-col items-center justify-end pb-24 sm:pb-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: textVisible ? 1 : 0 }}
          transition={{ duration: 1.4 }}
          className="px-6 text-center font-display text-xl italic text-text-cream sm:text-2xl"
        >
          On the 23rd of June, 1993,
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: textVisible ? 1 : 0 }}
          transition={{ delay: 1.0, duration: 1.4 }}
          className="mt-3 px-6 text-center font-display text-xl italic text-text-cream sm:text-2xl"
        >
          the stars arranged themselves like this.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: primed ? 0.8 : 0 }}
          transition={{ duration: 1.6 }}
          className="mt-12 font-roman text-[10px] uppercase tracking-sacred text-gold-bright"
        >
          Tap the brightest star
        </motion.p>
      </div>
    </button>
  )
}
