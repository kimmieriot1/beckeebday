import { motion } from 'framer-motion'
import Countdown from '../shared/Countdown.jsx'
import { FiligreeDivider } from '../shared/Filigree.jsx'

export default function LandingScreen({ onBegin }) {
  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        <p className="font-roman text-[10px] uppercase tracking-sacred text-text-muted sm:text-xs">
          A weekend, drawn by the stars
        </p>

        <FiligreeDivider tone="gold" className="mt-6 opacity-80" />

        <h1 className="mt-6 font-display text-5xl italic leading-tight text-text-cream sm:text-6xl">
          Rebecca
        </h1>

        <p className="mt-4 max-w-md font-period text-[17px] leading-relaxed text-text-cream/90">
          The cards are waiting.
        </p>

        <div className="mt-12">
          <Countdown />
        </div>

        <FiligreeDivider tone="silver" className="mt-12 opacity-60" />
      </motion.div>

      <motion.button
        type="button"
        onClick={onBegin}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.4 }}
        className="mt-10 font-roman text-xs uppercase tracking-sacred text-gold-bright hover:text-gold-warm"
      >
        Tap to begin
      </motion.button>

      {/* a single soft pulse on the bottom of the screen, hinting */}
      <motion.div
        aria-hidden="true"
        className="mt-3 h-[1px] w-16 bg-gold-bright"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
