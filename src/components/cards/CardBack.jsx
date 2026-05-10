// Decorative tarot card back. Shown before the user taps to flip.
// Centred sun-and-moon medallion, deep midnight, gold filigree.
export default function CardBack({ tone = 'silver' }) {
  const accent = tone === 'gold' ? '#f4d35e' : '#c9c9d4'
  return (
    <div
      className="card-face absolute inset-0 overflow-hidden rounded-[10px]"
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #1a142a 0%, #0a0a1f 60%, #050510 100%)',
        boxShadow:
          'inset 0 0 60px rgba(0,0,0,0.6), 0 12px 36px rgba(0,0,0,0.5)'
      }}
    >
      <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="cb-glow" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="60%" stopColor={accent} stopOpacity="0.04" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="200" height="300" fill="url(#cb-glow)" />

        {/* Outer frame */}
        <rect
          x="8"
          y="8"
          width="184"
          height="284"
          fill="none"
          stroke={accent}
          strokeOpacity="0.45"
          strokeWidth="0.7"
        />
        <rect
          x="14"
          y="14"
          width="172"
          height="272"
          fill="none"
          stroke={accent}
          strokeOpacity="0.25"
          strokeWidth="0.5"
        />

        {/* Corners */}
        {[
          [14, 14, 0],
          [186, 14, 90],
          [186, 286, 180],
          [14, 286, 270]
        ].map(([cx, cy, rot]) => (
          <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
            <path
              d="M0 0 Q14 4 18 14 Q20 18 14 18 Q8 18 4 14"
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <path
              d="M0 0 Q4 14 14 18 Q18 20 18 14 Q18 8 14 4"
              fill="none"
              stroke={accent}
              strokeOpacity="0.55"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <circle cx="14" cy="14" r="1" fill={accent} fillOpacity="0.6" />
          </g>
        ))}

        {/* Centre medallion: sun above, crescent moon below */}
        <g transform="translate(100 150)">
          {/* Sun rays */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2
            const x1 = Math.cos(angle) * 24
            const y1 = Math.sin(angle) * 24
            const x2 = Math.cos(angle) * 36
            const y2 = Math.sin(angle) * 36
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={accent}
                strokeOpacity={i % 2 ? 0.7 : 0.4}
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            )
          })}
          <circle r="22" fill="none" stroke={accent} strokeOpacity="0.7" strokeWidth="0.7" />
          <circle r="14" fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="0.6" />
          {/* Crescent moon at the centre */}
          <g>
            <circle r="9" fill={accent} fillOpacity="0.18" />
            <path
              d="M -4 -7 A 7 7 0 1 0 -4 7 A 5 5 0 1 1 -4 -7 Z"
              fill={accent}
              fillOpacity="0.85"
            />
          </g>
        </g>

        {/* Vertical scrollwork on top and bottom */}
        <g stroke={accent} strokeOpacity="0.5" strokeWidth="0.5" fill="none" strokeLinecap="round">
          <path d="M100 30 Q92 40 100 50 Q108 60 100 70" />
          <path d="M100 30 Q108 40 100 50 Q92 60 100 70" />
          <circle cx="100" cy="30" r="1.5" fill={accent} fillOpacity="0.6" />
          <circle cx="100" cy="70" r="1.5" fill={accent} fillOpacity="0.6" />

          <path d="M100 230 Q92 240 100 250 Q108 260 100 270" />
          <path d="M100 230 Q108 240 100 250 Q92 260 100 270" />
          <circle cx="100" cy="230" r="1.5" fill={accent} fillOpacity="0.6" />
          <circle cx="100" cy="270" r="1.5" fill={accent} fillOpacity="0.6" />
        </g>
      </svg>
    </div>
  )
}
