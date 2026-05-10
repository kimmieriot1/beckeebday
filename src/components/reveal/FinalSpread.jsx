import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { cards as ALL_CARDS } from '../../data/cards.js'
import { itineraryOrder } from '../../data/itinerary.js'
import CardBack from '../cards/CardBack.jsx'
import CardFront from '../cards/CardFront.jsx'

// Empress at the apex. Other cards fan out chronologically; we swap Moon (index 4)
// and Empress (index 5) for display only, so Empress takes the central position.
const SPREAD_ORDER = [0, 1, 2, 3, 5, 4, 6, 7, 8]

export default function FinalSpread({ onSelect, onEnd, sunCardRevealed, sunCard }) {
  const ordered = useMemo(() => SPREAD_ORDER.map((i) => ALL_CARDS[i]), [])

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-start px-4 pb-32 pt-20">
      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="mb-3 px-6 text-center font-display text-2xl italic text-text-cream sm:text-3xl"
      >
        Your weekend.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 0.6, duration: 1.6 }}
        className="mb-12 max-w-md px-6 text-center font-roman text-[10px] uppercase tracking-sacred text-text-muted"
      >
        Tap a card to remember
      </motion.p>

      <div
        className="relative mx-auto w-full"
        style={{ height: 'min(72vh, 540px)' }}
      >
        {ordered.map((card, i) => {
          const total = ordered.length
          const arcDeg = 150
          const angle = -arcDeg / 2 + (i / (total - 1)) * arcDeg
          const rad = (angle * Math.PI) / 180
          const radius = 36 // % of container width
          const cx = 50 + radius * Math.sin(rad)
          const cy = 50 - radius * Math.cos(rad) + 18 // a touch lower for balance
          const isApex = i === 4
          const isEmpress = !!card.isHero

          return (
            <SpreadCard
              key={card.id}
              card={card}
              x={cx}
              y={cy}
              rotate={angle * 0.7}
              delay={i * 0.18 + (isEmpress ? 1.2 : 0)}
              size={isEmpress ? 1.18 : 1}
              onSelect={() => {
                const key = itineraryOrder[ALL_CARDS.indexOf(card)]
                if (key) onSelect(key)
              }}
            />
          )
        })}

        {sunCardRevealed && sunCard && (
          <SpreadCard
            key={sunCard.id}
            card={sunCard}
            x={88}
            y={70}
            rotate={18}
            delay={0.4}
            size={1}
            sun
            onSelect={() => onSelect('sun')}
          />
        )}
      </div>

      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 3.2, duration: 1.4 }}
        onClick={onEnd}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-roman text-xs uppercase tracking-sacred text-gold-bright hover:text-gold-warm"
      >
        Close the reading
      </motion.button>
    </div>
  )
}

function SpreadCard({ card, x, y, rotate, delay, size, onSelect, sun = false }) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="card-perspective absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size * 80}px`,
        aspectRatio: '2 / 3',
        transform: 'translate(-50%, -50%)',
        zIndex: card.isHero ? 20 : 10
      }}
      initial={{ opacity: 0, y: 60, rotate: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        y: 0,
        rotate,
        scale: size
      }}
      transition={{
        delay,
        duration: card.isHero ? 1.4 : 0.9,
        ease: [0.22, 1, 0.36, 1]
      }}
      aria-label={`${card.title}. ${card.subtitle}.`}
    >
      <motion.div
        className="card-3d relative h-full w-full"
        style={{ transform: 'rotateY(180deg)' }}
        animate={
          sun
            ? { y: [0, -4, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{ duration: 4 + (card.id % 3) * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CardBack tone={card.glow} />
        <CardFront card={card} />
      </motion.div>

      {card.isHero && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-2xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(244,211,94,0.18) 0%, rgba(244,211,94,0) 70%)'
          }}
          animate={{ opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </motion.button>
  )
}
