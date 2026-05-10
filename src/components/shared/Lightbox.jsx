import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Fullscreen image viewer. Tap anywhere or Escape to close.
export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose])

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[80] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={onClose}
          style={{ background: 'rgba(5,5,16,0.92)', backdropFilter: 'blur(8px)' }}
        >
          <motion.img
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            src={src}
            alt={alt}
            className="max-h-[92dvh] max-w-[94vw] object-contain"
            style={{
              boxShadow: '0 0 60px rgba(212,175,55,0.18)',
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: '4px'
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-text-cream"
            style={{
              background: 'rgba(10,10,31,0.55)',
              border: '1px solid rgba(212,175,55,0.4)',
              backdropFilter: 'blur(6px)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>

          <p
            className="absolute bottom-6 left-1/2 -translate-x-1/2 font-roman text-[10px] uppercase tracking-sacred text-text-muted"
          >
            Tap to close
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
