import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { itinerary } from '../../data/itinerary.js'
import { FiligreeDivider } from '../shared/Filigree.jsx'

// One modal handles every itinerary stop. Variants come from the data shape:
//   - data.stops: a sub-list of venues (the High Street walk)
//   - data.history: a longer historical paragraph (the Abbey)
//   - data.practical: practical notes
//   - data.bookingStatus: a small status flag
//   - data.url: a link out

export default function ItineraryModal({ open, itineraryKey, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const data = itineraryKey && itinerary[itineraryKey]

  return (
    <AnimatePresence>
      {open && data && (
        <motion.div
          key={itineraryKey}
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-label={data.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <div className="absolute inset-0 bg-bg-deep/80 backdrop-blur-sm" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-soft relative z-10 max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl sm:rounded-2xl"
            style={{
              background:
                'linear-gradient(180deg, #15101e 0%, #0c0a16 60%, #08070f 100%)',
              border: '1px solid rgba(212,175,55,0.35)',
              boxShadow:
                '0 -20px 60px rgba(0,0,0,0.6), 0 0 60px rgba(212,175,55,0.08)'
            }}
          >
            <div className="px-6 pt-8 sm:px-10 sm:pt-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-roman text-[10px] uppercase tracking-sacred text-gold-bright">
                    {data.day} {data.time ? `· ${data.time}` : ''}
                  </p>
                  <h2 className="mt-2 font-display text-3xl italic leading-tight text-text-cream sm:text-4xl">
                    {data.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-m-2 flex h-10 w-10 items-center justify-center text-text-muted hover:text-text-cream"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="6" y1="6" x2="18" y2="18" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                  </svg>
                </button>
              </div>

              <FiligreeDivider tone="gold" className="mt-6 opacity-70" />

              {Array.isArray(data.images) && data.images.length > 0 && (
                <Gallery images={data.images} alt={data.title} />
              )}

              {data.intro && (
                <p className="mt-6 font-period text-[16px] italic leading-relaxed text-text-cream/95">
                  {data.intro}
                </p>
              )}
              {!data.intro && data.description && (
                <p className="mt-6 font-period text-[16px] leading-relaxed text-text-cream/95">
                  {data.description}
                </p>
              )}

              {data.history && (
                <div className="mt-6 rounded-md border border-gold-deep/40 bg-bg-card/60 p-5">
                  <p className="font-roman text-[10px] uppercase tracking-sacred text-gold-bright">
                    A small piece of history
                  </p>
                  <p className="mt-3 font-period text-[15px] leading-relaxed text-text-cream/90">
                    {data.history}
                  </p>
                </div>
              )}

              {data.address && (
                <Field label="Where">{data.address}</Field>
              )}
              {data.url && (
                <Field label="Online">
                  <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-bright underline-offset-4 hover:underline"
                  >
                    {prettyUrl(data.url)}
                  </a>
                </Field>
              )}
              {data.practical && (
                <Field label="Practical">{data.practical}</Field>
              )}
              {data.bookingStatus && (
                <Field label="Booking">
                  <span className="font-roman text-[10px] uppercase tracking-sacred text-red-magdalene">
                    {data.bookingStatus}
                  </span>
                </Field>
              )}

              {data.intro && data.description && (
                <p className="mt-6 font-period text-[15px] leading-relaxed text-text-cream/85">
                  {data.description}
                </p>
              )}

              {Array.isArray(data.stops) && data.stops.length > 0 && (
                <div className="mt-8 space-y-6 pb-2">
                  <p className="font-roman text-[10px] uppercase tracking-sacred text-gold-bright">
                    The Stops
                  </p>
                  {data.stops.map((stop) => (
                    <div key={stop.name} className="border-l border-gold-deep/40 pl-4">
                      <h3 className="font-display text-lg italic text-text-cream">{stop.name}</h3>
                      {stop.address && (
                        <p className="mt-1 text-sm text-text-muted">{stop.address}</p>
                      )}
                      {stop.hours && (
                        <p className="text-xs text-text-muted/80">{stop.hours}</p>
                      )}
                      {stop.description && (
                        <p className="mt-2 font-period text-[14px] leading-relaxed text-text-cream/90">
                          {stop.description}
                        </p>
                      )}
                      {stop.url && (
                        <a
                          href={stop.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-xs text-gold-bright/90 underline-offset-4 hover:underline"
                        >
                          {prettyUrl(stop.url)}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 mb-10 flex justify-center">
                <FiligreeDivider tone="silver" className="opacity-40" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Gallery({ images, alt }) {
  return (
    <div className="mt-6 flex gap-2 overflow-hidden">
      {images.map((src, i) => (
        <div
          key={src}
          className="relative flex-1 overflow-hidden rounded-md"
          style={{
            aspectRatio: '4 / 3',
            border: '1px solid rgba(212,175,55,0.25)',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)'
          }}
        >
          <img
            src={src}
            alt={`${alt} (${i + 1})`}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{ filter: 'brightness(0.85) saturate(0.9)' }}
            onError={(e) => {
              e.currentTarget.parentElement.style.display = 'none'
            }}
          />
          {/* subtle vignette over each image so it sits in the dark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)'
            }}
          />
        </div>
      ))}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mt-5">
      <p className="font-roman text-[10px] uppercase tracking-sacred text-text-muted">
        {label}
      </p>
      <p className="mt-1 font-period text-[15px] leading-relaxed text-text-cream/95">
        {children}
      </p>
    </div>
  )
}

function prettyUrl(u) {
  try {
    const url = new URL(u)
    return url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, '')
  } catch {
    return u
  }
}
