import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TarotCard from './TarotCard.jsx'
import { cards } from '../../data/cards.js'
import { play, stop, fadeAmbientTo } from '../../utils/audio.js'

// Walks through all nine cards, one at a time. The Empress dims the ambient
// drone so her words can be heard clearly, and a single sustained tone rises
// gently in its place.
export default function CardSequence({ onComplete }) {
  const [index, setIndex] = useState(0)
  const card = cards[index]

  useEffect(() => {
    if (card.isHero) {
      fadeAmbientTo(0.06, 2000)
      play('empressTone', { volume: 0.5 })
    } else {
      fadeAmbientTo(0.32, 2000)
      stop('empressTone')
    }
  }, [card])

  function handleAdvance() {
    if (index < cards.length - 1) {
      setIndex(index + 1)
    } else {
      fadeAmbientTo(0.32, 2000)
      stop('empressTone')
      onComplete?.()
    }
  }

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-start px-4 pb-12 pt-16 sm:pt-24">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: card.isHero ? 1.5 : 0.7 }}
          className="flex w-full flex-col items-center"
        >
          <TarotCard
            card={card}
            size={card.isHero ? 'md' : 'sm'}
            onFlip={() => play('flip')}
            onAdvance={handleAdvance}
          />
        </motion.div>
      </AnimatePresence>

      {/* progress dots */}
      <div className="mt-10 flex items-center gap-2">
        {cards.map((c, i) => (
          <span
            key={c.id}
            className={`h-1 w-1 rounded-full transition-all duration-700 ${
              i === index
                ? 'w-4 bg-gold-bright'
                : i < index
                ? 'bg-gold-deep/70'
                : 'bg-text-muted/30'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}
