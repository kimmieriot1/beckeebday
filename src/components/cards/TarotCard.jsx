import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CardBack from './CardBack.jsx'
import CardFront from './CardFront.jsx'

// A tarot card. Tap once to flip, tap continue to advance.
// Empress (isHero) gets a slower, warmer treatment.
export default function TarotCard({
  card,
  onFlip,
  onAdvance,
  size = 'sm', // 'sm' | 'md'
  sparkles = false
}) {
  const [flipped, setFlipped] = useState(false)
  const isHero = !!card.isHero
  const flipDuration = isHero ? 0.9 : 0.6

  function handleCardTap() {
    if (!flipped) {
      setFlipped(true)
      if (onFlip) onFlip(card)
    }
  }

  const widthClass = size === 'md' ? 'w-[280px] sm:w-[320px]' : 'w-[240px] sm:w-[280px]'
  const aspect = { aspectRatio: '2 / 3' }

  return (
    <div className="flex flex-col items-center gap-6">
      {/* card */}
      <motion.div
        className={`card-perspective ${widthClass}`}
        style={aspect}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{
          scale: isHero ? 1.05 : 1,
          opacity: 1
        }}
        transition={{ duration: isHero ? 1.5 : 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="card-3d relative h-full w-full"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: flipDuration, ease: 'easeInOut' }}
          onClick={handleCardTap}
          role="button"
          tabIndex={0}
          aria-label={
            flipped ? `${card.title}. ${card.subtitle}.` : 'Tap to draw the card.'
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleCardTap()
            }
          }}
        >
          <CardBack tone={card.glow} />
          <CardFront card={card} />
        </motion.div>

        {/* hero gold pulse halo */}
        {isHero && flipped && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(244,211,94,0.18) 0%, rgba(244,211,94,0) 60%)'
            }}
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* sparkles for the hidden Sun card */}
        {sparkles && flipped && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => {
              const x = (Math.sin(i * 1.7) + 1) * 50
              const y = (Math.cos(i * 1.3) + 1) * 50
              return (
                <motion.span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-gold-bright"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{ opacity: [0, 1, 0], scale: [0.6, 1.4, 0.6] }}
                  transition={{
                    duration: 2.4,
                    delay: i * 0.18,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                />
              )
            })}
          </div>
        )}

        {/* hint to flip */}
        <AnimatePresence>
          {!flipped && (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 1.2 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-roman text-[10px] uppercase tracking-sacred text-text-muted"
            >
              Tap to draw
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* body text appears after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            key="body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: flipDuration + 0.2, duration: 0.6 }}
            className="max-w-md px-6 text-center"
          >
            <CardBody body={card.body} hero={isHero} />

            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{
                delay: flipDuration + 0.4 + paragraphCount(card.body) * (isHero ? 0.8 : 0.25),
                duration: 1.2
              }}
              onClick={onAdvance}
              className="mt-8 font-roman text-[11px] uppercase tracking-sacred text-gold-bright hover:text-gold-warm"
            >
              Continue
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function paragraphCount(body) {
  return body.split(/\n\s*\n/).filter(Boolean).length
}

function CardBody({ body, hero }) {
  const paragraphs = body.split(/\n\s*\n/).filter(Boolean)
  const stagger = hero ? 0.8 : 0.25

  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * stagger, duration: hero ? 1.4 : 0.7, ease: 'easeOut' }}
          className={
            hero
              ? 'font-period text-[17px] leading-relaxed text-text-cream'
              : 'font-period text-[15px] leading-relaxed text-text-cream'
          }
        >
          {p}
        </motion.p>
      ))}
    </div>
  )
}
