// X. The Sun (hidden card). Radiant golden sun with a serene face, two figures dancing below.
// Joyful but still painterly and dark-academia, not bright cartoon.
export default function TheSun() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="sun-bg" cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#3a1f10" />
          <stop offset="50%" stopColor="#1a0e16" />
          <stop offset="100%" stopColor="#080510" />
        </radialGradient>
        <radialGradient id="sun-rays" cx="50%" cy="32%" r="30%">
          <stop offset="0%" stopColor="rgba(244,211,94,0.55)" />
          <stop offset="60%" stopColor="rgba(244,211,94,0.12)" />
          <stop offset="100%" stopColor="rgba(244,211,94,0)" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#sun-bg)" />
      <rect width="200" height="300" fill="url(#sun-rays)" />

      {/* sun rays */}
      <g transform="translate(100 96)">
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2
          const inner = 28
          const outer = i % 2 ? 60 : 50
          const x1 = Math.cos(angle) * inner
          const y1 = Math.sin(angle) * inner
          const x2 = Math.cos(angle) * outer
          const y2 = Math.sin(angle) * outer
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#f4d35e"
              strokeOpacity={i % 2 ? 0.85 : 0.55}
              strokeWidth={i % 2 ? 1.2 : 0.8}
              strokeLinecap="round"
            />
          )
        })}

        {/* sun disk */}
        <circle r="26" fill="#d4af37" stroke="#f4d35e" strokeWidth="0.7" />
        <circle r="26" fill="rgba(244,211,94,0.3)" />

        {/* face: closed eyes, soft mouth */}
        <g stroke="#3a1f10" strokeWidth="0.7" fill="none" strokeLinecap="round">
          <path d="M-10 -4 Q-7 -6 -4 -4" />
          <path d="M4 -4 Q7 -6 10 -4" />
          <path d="M-6 8 Q0 12 6 8" />
        </g>
        <circle cx="-6" cy="0" r="0.6" fill="#3a1f10" />
        <circle cx="6" cy="0" r="0.6" fill="#3a1f10" />
      </g>

      {/* sunflowers */}
      {[
        [40, 240],
        [70, 250],
        [130, 250],
        [160, 240]
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          {Array.from({ length: 10 }).map((_, j) => {
            const a = (j / 10) * Math.PI * 2
            return (
              <ellipse
                key={j}
                cx={Math.cos(a) * 5}
                cy={Math.sin(a) * 5}
                rx="3"
                ry="1.5"
                fill="#f4d35e"
                opacity="0.85"
                transform={`rotate(${(a * 180) / Math.PI} ${Math.cos(a) * 5} ${Math.sin(a) * 5})`}
              />
            )
          })}
          <circle r="3" fill="#3a1f10" />
        </g>
      ))}

      {/* two dancing figures below */}
      <g transform="translate(100 230)">
        <g transform="translate(-14 0)" fill="#0a0a1f" stroke="#f4d35e" strokeWidth="0.5">
          <circle cx="0" cy="-10" r="3" />
          <path d="M-3 -6 Q-6 0 -6 10 L-3 10 L-3 22 L0 22 L0 10 L0 -6 Z" />
          <line x1="-3" y1="-3" x2="-9" y2="-9" strokeLinecap="round" />
        </g>
        <g transform="translate(14 0)" fill="#0a0a1f" stroke="#f4d35e" strokeWidth="0.5">
          <circle cx="0" cy="-10" r="3" />
          <path d="M3 -6 Q6 0 6 10 L3 10 L3 22 L0 22 L0 10 L0 -6 Z" />
          <line x1="3" y1="-3" x2="9" y2="-9" strokeLinecap="round" />
        </g>
        {/* hand-link */}
        <line x1="-9" y1="-9" x2="9" y2="-9" stroke="#f4d35e" strokeWidth="0.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
