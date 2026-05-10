import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { play } from '../../utils/audio.js'

// Vega blooms outward, white flash, smoke, into the first card.
// Total time: about 3 seconds.
export default function Supernova({ onComplete, position = { x: 52, y: 32 } }) {
  useEffect(() => {
    play('supernova')
    const t = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <div
        className="absolute"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          width: 0,
          height: 0
        }}
      >
        {/* the star itself, tiny pulse first */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 12,
            height: 12,
            background: '#f4d35e',
            boxShadow: '0 0 30px 4px rgba(244,211,94,0.7)'
          }}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.3, 1, 60] }}
          transition={{
            duration: 2.5,
            times: [0, 0.2, 0.4, 1],
            ease: ['easeInOut', 'easeInOut', 'easeOut']
          }}
        />

        {/* outer halo blooming */}
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 12,
            height: 12,
            background:
              'radial-gradient(circle, rgba(244,211,94,0.7) 0%, rgba(244,211,94,0.2) 40%, rgba(244,211,94,0) 70%)'
          }}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: [1, 6, 80], opacity: [1, 0.6, 0] }}
          transition={{
            duration: 2.6,
            times: [0, 0.4, 1],
            ease: 'easeOut'
          }}
        />
      </div>

      {/* white flash */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.85, 0] }}
        transition={{ duration: 3, times: [0, 0.7, 0.78, 1] }}
      />

      {/* smoke veil at the end */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(245,241,232,0.18) 0%, rgba(10,10,31,0.0) 60%)'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.7, 0.4] }}
        transition={{ duration: 3, times: [0, 0.8, 0.9, 1] }}
      />
    </div>
  )
}
