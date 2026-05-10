import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TarotCard from '../cards/TarotCard.jsx'
import { sunCard } from '../../data/cards.js'
import { playCardFlip } from '../../utils/audio.js'
import Petals from './Petals.jsx'

// Overlay revealed when the moon is tapped five times.
// On flip, golden petals fall over the whole screen.
export default function HiddenSunCard({ open, onDismiss }) {
  const [petalsActive, setPetalsActive] = useState(false)

  function handleFlip() {
    playCardFlip()
    setPetalsActive(true)
  }

  function handleDismiss() {
    setPetalsActive(false)
    onDismiss()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center px-4 pt-12"
          role="dialog"
          aria-modal="true"
          aria-label="The Sun"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleDismiss()
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(244,211,94,0.18) 0%, rgba(5,5,16,0.96) 60%)'
            }}
          />

          <Petals active={petalsActive} />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <TarotCard
              card={sunCard}
              size="md"
              sparkles
              onFlip={handleFlip}
              onAdvance={handleDismiss}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
