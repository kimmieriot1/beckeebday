import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiligreeDivider } from '../shared/Filigree.jsx'
import { exportItineraryPDF } from '../../utils/pdf.js'

const SPOTIFY_PLAYLIST = '2CtC1fphIpZFwObsxzjnJb'

export default function EndScreen({ onBack }) {
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    if (saving) return
    setSaving(true)
    try {
      await exportItineraryPDF()
    } catch (e) {
      console.error('PDF export failed', e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col items-center px-6 pb-20 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4 }}
        className="flex w-full max-w-md flex-col items-center text-center"
      >
        <p className="font-roman text-[10px] uppercase tracking-sacred text-gold-bright">
          A weekend ends, the rest begins
        </p>
        <FiligreeDivider tone="gold" className="mt-5 opacity-80" />
        <h2 className="mt-6 font-display text-3xl italic leading-tight text-text-cream sm:text-4xl">
          Your weekend, Rebecca May Magdeline.
        </h2>
        <p className="mt-3 font-period italic text-text-cream/85">
          Drawn by the stars. Built by hand.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.4 }}
        className="mt-12 w-full max-w-md"
      >
        <p className="mb-3 text-center font-roman text-[10px] uppercase tracking-sacred text-text-muted">
          A small playlist for the road
        </p>
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <iframe
            title="Glastonbury weekend playlist"
            src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST}?utm_source=generator&theme=0`}
            width="100%"
            height="232"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block', background: '#0a0a1f' }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1.4 }}
        className="mt-12 flex w-full max-w-md flex-col items-center"
      >
        <PortraitFrame />
        <p className="mt-4 font-period italic text-text-cream/85">With love, always.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.4 }}
        className="mt-12 flex flex-col items-center gap-4"
      >
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full px-6 py-3 font-roman text-[11px] uppercase tracking-sacred text-gold-bright transition-colors disabled:opacity-50"
          style={{
            border: '1px solid rgba(212,175,55,0.55)',
            background: 'rgba(20,16,30,0.6)'
          }}
        >
          {saving ? 'Preparing your scroll...' : 'Save your itinerary'}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="font-roman text-[10px] uppercase tracking-sacred text-text-muted hover:text-text-cream"
        >
          Return to the cards
        </button>
      </motion.div>
    </div>
  )
}

function PortraitFrame() {
  return (
    <div
      className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-md"
      style={{
        border: '1px solid rgba(212,175,55,0.5)',
        boxShadow: '0 0 40px rgba(212,175,55,0.08)'
      }}
    >
      <img
        src="/images/kim-and-beckee.jpg"
        alt="Kim and Beckee"
        className="h-full w-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement.classList.add('placeholder-portrait')
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center text-center"
        style={{
          background:
            'radial-gradient(circle at center, #1a1424 0%, #0a0814 100%)'
        }}
      >
        <span className="font-roman text-[10px] uppercase tracking-sacred text-text-muted">
          A photo to come
        </span>
        <span className="mt-2 font-display italic text-text-cream/70">Kim and Beckee</span>
      </div>
      <style>{`
        .placeholder-portrait > div { display: flex !important; }
      `}</style>
    </div>
  )
}
