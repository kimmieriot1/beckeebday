import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { itinerary, itineraryOrder } from '../../data/itinerary.js'
import { FiligreeDivider } from '../shared/Filigree.jsx'

const SPOTIFY_PLAYLIST = '2CtC1fphIpZFwObsxzjnJb'

export default function EndScreen({ onBack }) {
  const [saving, setSaving] = useState(false)
  const printRef = useRef(null)

  async function handleSave() {
    if (saving) return
    setSaving(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      await html2pdf()
        .set({
          margin: [12, 12, 12, 12],
          filename: 'rebecca-magdeline-glastonbury.pdf',
          html2canvas: { scale: 2, backgroundColor: '#050510' },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .from(printRef.current)
        .save()
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

      {/* Hidden printable view for the PDF export */}
      <div
        aria-hidden="true"
        ref={printRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          width: '180mm',
          padding: '8mm',
          background: '#050510',
          color: '#f5f1e8',
          fontFamily: 'EB Garamond, Garamond, serif'
        }}
      >
        <PrintableItinerary />
      </div>
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

function PrintableItinerary() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 28 }}>
        Rebecca May Magdeline
      </h1>
      <p style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#d4af37' }}>
        Glastonbury, 26 to 28 June 2026
      </p>
      <hr style={{ borderColor: 'rgba(212,175,55,0.4)', margin: '12px 0' }} />
      {itineraryOrder.filter((k) => k !== 'opening' && itinerary[k]).map((k) => {
        const data = itinerary[k]
        return (
          <div key={k} style={{ marginTop: 18 }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#f4d35e' }}>
              {data.day} {data.time ? `· ${data.time}` : ''}
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 18, margin: '4px 0 6px' }}>
              {data.title}
            </h2>
            {data.description && <p style={{ fontSize: 12, lineHeight: 1.55 }}>{data.description}</p>}
            {data.address && (
              <p style={{ fontSize: 11, color: '#a89e8a', marginTop: 4 }}>{data.address}</p>
            )}
            {data.practical && (
              <p style={{ fontSize: 11, fontStyle: 'italic', marginTop: 4 }}>{data.practical}</p>
            )}
            {Array.isArray(data.stops) && (
              <ul style={{ paddingLeft: 16, marginTop: 6 }}>
                {data.stops.map((s) => (
                  <li key={s.name} style={{ fontSize: 11, marginBottom: 4 }}>
                    <strong>{s.name}</strong>
                    {s.address ? `, ${s.address}` : ''}
                    {s.description ? ` ~ ${s.description}` : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 13, marginTop: 24, color: '#a89e8a' }}>
        With love, always. Kim.
      </p>
    </div>
  )
}
