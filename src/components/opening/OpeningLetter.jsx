import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiligreeDivider } from '../shared/Filigree.jsx'
import { tap } from '../../utils/haptics.js'

// A short letter from Kim, in her voice, before the star map begins.
// Each line fades in with a gentle stagger so it reads like a note unfolding.
const STAGGER = 1.0 // seconds between paragraphs

const BODY = [
  'What lies ahead is your birthday surprise reveal!',
  'Take your time and read everything :3',
  "I hope you like it, and we'll make your entry into the 34th cycle of the sun (omg you're so old lol) one to remember 🧙‍♀️"
]

// Last paragraph appears at 0.4 + (BODY.length + 1.5) * STAGGER = 4.9s.
// Give the reader a moment to absorb, then show Continue.
const CONTINUE_DELAY_MS = 6500

export default function OpeningLetter({ onContinue }) {
  const [showContinue, setShowContinue] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowContinue(true), CONTINUE_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex w-full max-w-md flex-col items-center"
      >
        <FiligreeDivider tone="gold" className="mb-8 opacity-70" />

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.0, ease: 'easeOut' }}
          className="font-display text-3xl italic text-text-cream sm:text-4xl"
        >
          Beckee,
        </motion.p>

        <div className="mt-8 w-full space-y-5 text-center">
          {BODY.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + (i + 1) * STAGGER,
                duration: 1.0,
                ease: 'easeOut'
              }}
              className="font-period text-[17px] italic leading-relaxed text-text-cream"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="mt-10 w-full text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4 + (BODY.length + 1) * STAGGER,
              duration: 1.0
            }}
            className="font-period text-[16px] italic text-text-cream/90"
          >
            ILY
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4 + (BODY.length + 1.5) * STAGGER,
              duration: 1.0
            }}
            className="mt-1 font-display text-xl italic text-gold-bright"
          >
            Kim
          </motion.p>
        </div>

        <FiligreeDivider tone="silver" className="mt-10 opacity-50" />
      </motion.div>

      <AnimatePresence>
        {showContinue && (
          <motion.button
            type="button"
            key="continue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4 }}
            onClick={() => {
              tap()
              onContinue()
            }}
            className="mt-12 font-roman text-xs uppercase tracking-sacred text-gold-bright hover:text-gold-warm"
          >
            Continue
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
