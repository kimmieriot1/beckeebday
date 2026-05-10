// VIII. The Lovers: two figures across a candle, tarot cards spread between them.
export default function TheLovers() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="lov-bg" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#241629" />
          <stop offset="60%" stopColor="#0a0814" />
          <stop offset="100%" stopColor="#040410" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#lov-bg)" />

      {/* candle glow at centre */}
      <circle cx="100" cy="150" r="80" fill="rgba(244,211,94,0.06)" />
      <circle cx="100" cy="150" r="40" fill="rgba(244,211,94,0.12)" />

      {/* two seated figures, in profile silhouette */}
      <g fill="#050510" stroke="rgba(212,175,55,0.5)" strokeWidth="0.5">
        {/* left figure */}
        <path d="M0 300 L0 200 Q4 184 16 174 Q22 168 26 160 Q24 152 28 146 Q34 138 42 144 Q48 150 46 158 Q44 168 50 176 Q60 188 60 210 L60 300 Z" />
        {/* right figure mirrored */}
        <path d="M200 300 L200 200 Q196 184 184 174 Q178 168 174 160 Q176 152 172 146 Q166 138 158 144 Q152 150 154 158 Q156 168 150 176 Q140 188 140 210 L140 300 Z" />
      </g>

      {/* table */}
      <rect x="40" y="200" width="120" height="6" fill="#1a1428" stroke="rgba(212,175,55,0.4)" strokeWidth="0.4" />
      <rect x="44" y="206" width="112" height="50" fill="#0d0a18" stroke="rgba(212,175,55,0.25)" strokeWidth="0.4" />

      {/* spread of tarot cards on table */}
      <g>
        {[
          [70, 178, -12],
          [90, 174, -3],
          [110, 174, 5],
          [130, 178, 14]
        ].map(([cx, cy, rot], i) => (
          <g key={i} transform={`translate(${cx} ${cy}) rotate(${rot})`}>
            <rect x="-7" y="-12" width="14" height="22" rx="1.5" fill="#0d0a18" stroke="rgba(212,175,55,0.65)" strokeWidth="0.4" />
            <line x1="-5" y1="-8" x2="5" y2="-8" stroke="rgba(244,211,94,0.4)" strokeWidth="0.3" />
            <circle cx="0" cy="0" r="1.6" fill="rgba(244,211,94,0.7)" />
          </g>
        ))}
      </g>

      {/* candle in centre */}
      <g transform="translate(100 178)">
        <rect x="-2" y="-10" width="4" height="14" fill="#1a1428" stroke="rgba(212,175,55,0.5)" strokeWidth="0.4" />
        <path d="M0 -18 Q-2 -14 0 -10 Q2 -14 0 -18 Z" fill="#f4d35e" opacity="0.95" />
        <circle cx="0" cy="-14" r="6" fill="#f4d35e" opacity="0.18" />
        <path d="M0 -18 Q-1 -22 0 -26 Q1 -22 0 -18" stroke="rgba(245,241,232,0.3)" strokeWidth="0.4" fill="none" />
      </g>

      {/* hands almost touching above the cards */}
      <g stroke="rgba(212,175,55,0.7)" strokeWidth="0.6" fill="none" strokeLinecap="round">
        <path d="M70 162 Q82 150 92 154" />
        <path d="M130 162 Q118 150 108 154" />
      </g>
    </svg>
  )
}
