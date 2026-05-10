// III. The Star: a chalice tipped, pouring liquid stars across a candlelit table.
export default function TheStar() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="star-bg" cx="50%" cy="30%" r="90%">
          <stop offset="0%" stopColor="#1d1638" />
          <stop offset="55%" stopColor="#090918" />
          <stop offset="100%" stopColor="#040410" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#star-bg)" />

      {/* upper sky stars */}
      {[
        [25, 30, 0.6],
        [50, 50, 0.9],
        [80, 25, 1.2],
        [110, 60, 0.6],
        [140, 35, 0.8],
        [170, 70, 1],
        [60, 90, 0.5],
        [130, 100, 0.5]
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#c9c9d4" opacity="0.8" />
      ))}

      {/* the bright star, top-left */}
      <g transform="translate(60 60)">
        <circle r="3" fill="#f4d35e" />
        <circle r="9" fill="#f4d35e" opacity="0.18" />
        <line x1="-12" y1="0" x2="12" y2="0" stroke="#f4d35e" strokeOpacity="0.45" strokeWidth="0.5" />
        <line x1="0" y1="-12" x2="0" y2="12" stroke="#f4d35e" strokeOpacity="0.45" strokeWidth="0.5" />
      </g>

      {/* tipped chalice */}
      <g transform="translate(58 130) rotate(-22)">
        <path
          d="M-18 0 Q-14 22 0 26 Q14 22 18 0 Z"
          fill="#0a0a1f"
          stroke="#c9c9d4"
          strokeOpacity="0.7"
          strokeWidth="0.7"
        />
        <ellipse cx="0" cy="0" rx="18" ry="3" fill="#0a0a1f" stroke="#c9c9d4" strokeOpacity="0.7" strokeWidth="0.6" />
        <rect x="-2" y="26" width="4" height="14" fill="#0a0a1f" stroke="#c9c9d4" strokeOpacity="0.6" strokeWidth="0.5" />
        <ellipse cx="0" cy="42" rx="10" ry="3" fill="#0a0a1f" stroke="#c9c9d4" strokeOpacity="0.7" strokeWidth="0.6" />
      </g>

      {/* pour of stars from chalice across the table */}
      <g>
        {Array.from({ length: 14 }).map((_, i) => {
          const t = i / 13
          const x = 70 + t * 100 + (Math.sin(t * 6) * 4)
          const y = 138 + t * 40 + (Math.cos(t * 5) * 4)
          const r = 0.6 + Math.random() * 1.2
          return <circle key={i} cx={x} cy={y} r={r} fill="#f4d35e" opacity={0.3 + Math.random() * 0.6} />
        })}
      </g>

      {/* table edge */}
      <rect x="0" y="200" width="200" height="100" fill="#0d0a18" stroke="rgba(212,175,55,0.18)" strokeWidth="0.4" />

      {/* candle on table */}
      <g transform="translate(150 198)">
        <rect x="-2" y="0" width="4" height="14" fill="#1a1428" stroke="rgba(212,175,55,0.5)" strokeWidth="0.4" />
        <path d="M0 -8 Q-2 -4 0 0 Q2 -4 0 -8 Z" fill="#f4d35e" opacity="0.85" />
        <circle r="6" fill="#f4d35e" opacity="0.18" />
      </g>

      {/* white roses across table */}
      {[40, 80, 120].map((x, i) => (
        <g key={i} transform={`translate(${x} 220)`}>
          <circle r="3" fill="#f5f1e8" opacity="0.7" />
          <circle r="1.5" fill="#0a0a1f" opacity="0.6" />
        </g>
      ))}
    </svg>
  )
}
