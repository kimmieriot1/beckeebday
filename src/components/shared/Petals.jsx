import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Falling gold sunflower petals + sparkles for the Sun card reveal.
// 38 particles, mixed sizes, varied fall speeds, gentle rotation.
export default function Petals({ active, count = 38 }) {
  const particles = useMemo(() => {
    const out = []
    for (let i = 0; i < count; i++) {
      const isPetal = i % 3 !== 0
      out.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.4,
        duration: 5 + Math.random() * 5,
        size: isPetal ? 8 + Math.random() * 10 : 3 + Math.random() * 3,
        rotateStart: Math.random() * 360,
        rotateEnd: Math.random() * 720 - 360,
        sway: 30 + Math.random() * 60,
        type: isPetal ? 'petal' : 'spark',
        opacity: 0.55 + Math.random() * 0.4
      })
    }
    return out
  }, [count])

  if (!active) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[75] overflow-hidden"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            top: '-10%',
            left: `${p.left}%`,
            rotate: p.rotateStart,
            opacity: 0
          }}
          animate={{
            top: '110%',
            left: [
              `${p.left}%`,
              `${p.left + p.sway / 2}%`,
              `${p.left - p.sway / 2}%`,
              `${p.left}%`
            ],
            rotate: p.rotateStart + p.rotateEnd,
            opacity: [0, p.opacity, p.opacity, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.42, 0, 0.58, 1],
            times: [0, 0.15, 0.85, 1],
            left: { duration: p.duration, ease: 'easeInOut' }
          }}
          style={{ position: 'absolute', willChange: 'transform' }}
        >
          {p.type === 'petal' ? (
            <Petal size={p.size} />
          ) : (
            <Spark size={p.size} />
          )}
        </motion.div>
      ))}
    </div>
  )
}

function Petal({ size }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 10 16"
      style={{ filter: 'drop-shadow(0 0 6px rgba(244,211,94,0.4))' }}
    >
      <defs>
        <linearGradient id={`petal-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d35e" />
          <stop offset="60%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a8801f" />
        </linearGradient>
      </defs>
      <path
        d="M5 0 Q9 4 9 9 Q9 14 5 16 Q1 14 1 9 Q1 4 5 0 Z"
        fill={`url(#petal-${size})`}
        stroke="rgba(168,128,31,0.6)"
        strokeWidth="0.3"
      />
      <path
        d="M5 2 Q5 8 5 14"
        stroke="rgba(168,128,31,0.5)"
        strokeWidth="0.3"
        fill="none"
      />
    </svg>
  )
}

function Spark({ size }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f4d35e 0%, rgba(244,211,94,0) 70%)'
      }}
    />
  )
}
