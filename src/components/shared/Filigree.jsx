// Ornate gold filigree corners and frame for tarot cards and sacred panels.
// Pure SVG, scales with the container. Use as an absolutely positioned overlay.

export function FiligreeCorner({ rotate = 0, className = '' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 2 L58 2" opacity="0.85" />
        <path d="M2 2 L2 58" opacity="0.85" />
        <path d="M2 2 Q22 6 28 22 Q30 28 22 30 Q12 30 8 22" />
        <path d="M2 2 Q6 22 22 28 Q28 30 30 22 Q30 12 22 8" />
        <circle cx="22" cy="22" r="2.4" />
        <path d="M14 14 Q18 16 22 14" />
        <path d="M14 14 Q16 18 14 22" />
        <path d="M30 8 Q36 10 40 8" opacity="0.7" />
        <path d="M8 30 Q10 36 8 40" opacity="0.7" />
      </g>
    </svg>
  )
}

export function FiligreeFrame({ tone = 'silver', children }) {
  const colour = tone === 'gold' ? 'text-gold-bright' : 'text-silver-glow'
  const inner = tone === 'gold' ? 'rgba(244,211,94,0.4)' : 'rgba(201,201,212,0.3)'
  return (
    <div className="relative h-full w-full">
      {children}
      <div
        className={`pointer-events-none absolute inset-0 ${colour}`}
        aria-hidden="true"
      >
        <div
          className="absolute inset-2"
          style={{
            border: `1px solid ${inner}`,
            borderRadius: '4px'
          }}
        />
        <FiligreeCorner className="absolute left-0 top-0 h-12 w-12" />
        <FiligreeCorner className="absolute right-0 top-0 h-12 w-12" rotate={90} />
        <FiligreeCorner className="absolute bottom-0 right-0 h-12 w-12" rotate={180} />
        <FiligreeCorner className="absolute bottom-0 left-0 h-12 w-12" rotate={270} />
      </div>
    </div>
  )
}

export function FiligreeDivider({ tone = 'silver', className = '' }) {
  const stroke = tone === 'gold' ? '#f4d35e' : '#c9c9d4'
  return (
    <svg
      viewBox="0 0 240 12"
      className={className}
      width="240"
      height="12"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke={stroke}
        strokeWidth="0.7"
        strokeLinecap="round"
        opacity="0.7"
      >
        <line x1="20" y1="6" x2="100" y2="6" />
        <line x1="140" y1="6" x2="220" y2="6" />
        <path d="M100 6 Q108 2 116 6 Q120 8 124 6 Q132 2 140 6" />
        <circle cx="120" cy="6" r="1.4" fill={stroke} />
        <circle cx="20" cy="6" r="0.8" fill={stroke} />
        <circle cx="220" cy="6" r="0.8" fill={stroke} />
      </g>
    </svg>
  )
}
