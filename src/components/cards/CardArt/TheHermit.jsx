// IV. The Hermit: a hooded figure with a lantern, a stone tower at the summit.
export default function TheHermit() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="herm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f1228" />
          <stop offset="50%" stopColor="#3a1a30" />
          <stop offset="100%" stopColor="#0a0a1f" />
        </linearGradient>
        <linearGradient id="herm-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(245,241,232,0)" />
          <stop offset="100%" stopColor="rgba(245,241,232,0.08)" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#herm-sky)" />

      {/* low clouds and mist */}
      <ellipse cx="60" cy="180" rx="80" ry="14" fill="url(#herm-mist)" opacity="0.7" />
      <ellipse cx="160" cy="200" rx="80" ry="12" fill="url(#herm-mist)" opacity="0.6" />

      {/* hill silhouette */}
      <path
        d="M0 220 Q30 180 70 170 Q100 160 130 175 Q160 190 200 200 L200 300 L0 300 Z"
        fill="#070710"
      />

      {/* tower at summit */}
      <g transform="translate(100 130)">
        <rect x="-7" y="0" width="14" height="40" fill="#0a0a1f" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
        <rect x="-9" y="0" width="18" height="6" fill="#0a0a1f" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
        <rect x="-2" y="14" width="4" height="6" fill="#050510" />
      </g>

      {/* hooded figure with lantern */}
      <g transform="translate(70 230)">
        <path
          d="M-14 40 Q-14 16 -8 6 Q-2 -2 0 -2 Q2 -2 8 6 Q14 16 14 40 Z"
          fill="#050510"
          stroke="rgba(212,175,55,0.45)"
          strokeWidth="0.5"
        />
        <ellipse cx="0" cy="0" rx="9" ry="11" fill="#050510" stroke="rgba(212,175,55,0.4)" strokeWidth="0.4" />

        {/* outstretched arm with lantern */}
        <line x1="10" y1="14" x2="22" y2="20" stroke="rgba(212,175,55,0.45)" strokeWidth="0.6" strokeLinecap="round" />

        <g transform="translate(22 20)">
          <circle r="14" fill="#f4d35e" opacity="0.18" />
          <circle r="7" fill="#f4d35e" opacity="0.4" />
          <rect x="-3" y="-4" width="6" height="8" fill="#1a1428" stroke="#f4d35e" strokeWidth="0.4" />
          <line x1="0" y1="-4" x2="0" y2="-9" stroke="rgba(212,175,55,0.6)" strokeWidth="0.4" />
        </g>
      </g>

      {/* sheep */}
      {[40, 110, 160].map((x, i) => (
        <g key={i} transform={`translate(${x} 270)`}>
          <ellipse rx="4" ry="2.5" fill="rgba(201,201,212,0.35)" />
          <circle cx="-3" cy="-1" r="1.4" fill="rgba(201,201,212,0.45)" />
        </g>
      ))}
    </svg>
  )
}
