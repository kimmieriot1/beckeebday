import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  namedStars,
  constellationLines,
  generateBackgroundStars,
  magToRadius
} from '../../data/starMap1993.js'
import { tap, thud } from '../../utils/haptics.js'

// The night sky over Somerset on 23 June 1993.
// Stars fade in (4s), constellation lines trace in (2s), text appears (2s).
// Vega, the natal star, begins to pulse at the end. Tap anywhere to ignite the supernova.
export default function StarMap({ onIgnite }) {
  const bg = useMemo(() => generateBackgroundStars(220), [])
  const [textVisible, setTextVisible] = useState(false)
  const [primed, setPrimed] = useState(false)
  const [revealedId, setRevealedId] = useState(null)
  const revealTimer = useRef(null)

  useEffect(() => {
    const t1 = setTimeout(() => setTextVisible(true), 4500)
    const t2 = setTimeout(() => setPrimed(true), 7200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(revealTimer.current)
    }
  }, [])

  function handleStarTap(star) {
    setRevealedId(star.id)
    clearTimeout(revealTimer.current)
    revealTimer.current = setTimeout(() => setRevealedId(null), 2600)

    if (star.natal && primed) {
      thud()
      // Brief delay so the name flashes alongside the supernova start
      setTimeout(() => onIgnite(), 250)
    } else {
      tap()
    }
  }

  const starById = useMemo(() => {
    const map = {}
    for (const s of namedStars) map[s.id] = s
    return map
  }, [])

  return (
    <div
      aria-label="The night you were born."
      className="relative block min-h-[100dvh] w-full"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
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

        {/* named stars: tappable, reveal their name */}
        {namedStars.map((s, i) => {
          const cx = s.x * 100
          const cy = s.y * 100
          const isRevealed = revealedId === s.id
          // Label position: to the right if star is on left half, left if on right
          const labelOnLeft = s.x > 0.6
          return (
            <motion.g
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 2 + (i / namedStars.length) * 2,
                duration: 0.9,
                ease: 'easeOut'
              }}
              className="star-tap-target"
              onClick={(e) => {
                handleStarTap(s)
                // dismiss focus immediately so the browser's outline doesn't
                // cover the name label
                if (e && e.currentTarget && e.currentTarget.blur) {
                  e.currentTarget.blur()
                }
              }}
              style={{
                cursor: 'pointer',
                outline: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
              role="button"
              aria-label={
                s.natal
                  ? `${s.name}, the natal star. Tap to ignite the supernova.`
                  : `${s.name}`
              }
              tabIndex={s.natal ? 0 : -1}
              onKeyDown={(e) => {
                if (s.natal && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  handleStarTap(s)
                }
              }}
            >
              {/* Generous invisible tap target around the star */}
              <circle
                cx={cx}
                cy={cy}
                r={s.natal ? 5 : 3}
                fill="transparent"
              />

              {s.natal && primed && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={magToRadius(s.mag) * 1.2}
                  fill="#f4d35e"
                  opacity="0.18"
                  animate={{ scale: [1, 1.7, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: `${cx}% ${cy}%` }}
                />
              )}
              <circle
                cx={cx}
                cy={cy}
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
                  <line x1={cx - 1.4} y1={cy} x2={cx + 1.4} y2={cy} />
                  <line x1={cx} y1={cy - 1.4} x2={cx} y2={cy + 1.4} />
                </g>
              )}

              {/* Name label, appears briefly on tap */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.text
                    key="label"
                    x={labelOnLeft ? cx - 1.5 : cx + 1.5}
                    y={cy + 0.3}
                    textAnchor={labelOnLeft ? 'end' : 'start'}
                    fill="rgba(245,241,232,0.92)"
                    fontFamily="serif"
                    fontStyle="italic"
                    fontSize="1.6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {s.name}
                  </motion.text>
                )}
              </AnimatePresence>
            </motion.g>
          )
        })}

        {/* shooting stars: a few brief streaks during the opening */}
        {SHOOTING_STARS.map((s) => (
          <ShootingStar key={s.id} {...s} />
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
    </div>
  )
}

// Three streaks at staggered delays during the 8-second opening.
// Coords in viewBox space (0-100). Each travels from `from` to `to`.
const SHOOTING_STARS = [
  { id: 'sh1', from: [12, 8], to: [38, 28], delay: 3.0, duration: 0.9 },
  { id: 'sh2', from: [78, 12], to: [56, 32], delay: 5.6, duration: 1.0 },
  { id: 'sh3', from: [30, 4], to: [62, 22], delay: 7.8, duration: 0.85 }
]

function ShootingStar({ from, to, delay, duration }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ delay, duration, times: [0, 0.12, 0.7, 1], ease: 'linear' }}
    >
      {/* the trail: a line that draws from start to head's position */}
      <motion.line
        x1={from[0]}
        y1={from[1]}
        stroke="#f5f1e8"
        strokeOpacity="0.7"
        strokeWidth="0.18"
        strokeLinecap="round"
        initial={{ x2: from[0], y2: from[1] }}
        animate={{ x2: to[0], y2: to[1] }}
        transition={{ delay, duration, ease: 'easeOut' }}
      />
      {/* the head: a bright gold point */}
      <motion.circle
        r="0.45"
        fill="#f4d35e"
        initial={{ cx: from[0], cy: from[1] }}
        animate={{ cx: to[0], cy: to[1] }}
        transition={{ delay, duration, ease: 'easeOut' }}
      />
      {/* head glow */}
      <motion.circle
        r="1.0"
        fill="#f4d35e"
        opacity="0.3"
        initial={{ cx: from[0], cy: from[1] }}
        animate={{ cx: to[0], cy: to[1] }}
        transition={{ delay, duration, ease: 'easeOut' }}
      />
    </motion.g>
  )
}
