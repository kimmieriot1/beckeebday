import { motion } from 'framer-motion'

export default function AudioToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      aria-label={muted ? 'Unmute ambient sound' : 'Mute ambient sound'}
      aria-pressed={!muted}
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-full"
      style={{
        background: 'rgba(10, 10, 31, 0.55)',
        border: '1px solid rgba(212, 175, 55, 0.35)',
        backdropFilter: 'blur(6px)'
      }}
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold-bright"
        initial={false}
        animate={{ opacity: muted ? 0.6 : 1 }}
      >
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {muted ? (
          <>
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </>
        ) : (
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
          </>
        )}
      </motion.svg>
    </button>
  )
}
