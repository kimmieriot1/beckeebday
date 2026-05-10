// II. The High Priestess: two pillars on a wet cobbled street, crescent at her feet.
export default function TheHighPriestess() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="hp-bg" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#16142a" />
          <stop offset="80%" stopColor="#070716" />
          <stop offset="100%" stopColor="#040410" />
        </radialGradient>
        <radialGradient id="hp-glow" cx="50%" cy="48%" r="35%">
          <stop offset="0%" stopColor="rgba(244,211,94,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#hp-bg)" />
      <rect width="200" height="300" fill="url(#hp-glow)" />

      {/* cobbled street */}
      <g opacity="0.4">
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => (
            <ellipse
              key={`${row}-${col}`}
              cx={col * 22 + (row % 2) * 11}
              cy={250 + row * 8}
              rx="6"
              ry="2"
              fill="none"
              stroke="rgba(201,201,212,0.15)"
              strokeWidth="0.4"
            />
          ))
        )}
      </g>

      {/* two pillars */}
      <g>
        <rect x="34" y="80" width="18" height="170" fill="#0d0d20" stroke="rgba(201,201,212,0.5)" strokeWidth="0.5" />
        <rect x="32" y="76" width="22" height="6" fill="#0d0d20" stroke="rgba(201,201,212,0.5)" strokeWidth="0.5" />
        <text x="43" y="170" textAnchor="middle" fontFamily="serif" fontSize="14" fill="rgba(201,201,212,0.6)">B</text>

        <rect x="148" y="80" width="18" height="170" fill="#0d0d20" stroke="rgba(201,201,212,0.5)" strokeWidth="0.5" />
        <rect x="146" y="76" width="22" height="6" fill="#0d0d20" stroke="rgba(201,201,212,0.5)" strokeWidth="0.5" />
        <text x="157" y="170" textAnchor="middle" fontFamily="serif" fontSize="14" fill="rgba(201,201,212,0.6)">J</text>
      </g>

      {/* veiled figure between */}
      <g transform="translate(100 110)">
        <path
          d="M-22 130 Q-22 60 -10 30 Q-4 20 0 18 Q4 20 10 30 Q22 60 22 130 Z"
          fill="#08081a"
          stroke="rgba(201,201,212,0.55)"
          strokeWidth="0.6"
        />
        {/* head and veil */}
        <ellipse cx="0" cy="20" rx="12" ry="14" fill="#0a0a1f" stroke="rgba(201,201,212,0.5)" strokeWidth="0.5" />
        <path
          d="M-14 22 Q-18 36 -16 50 M14 22 Q18 36 16 50"
          fill="none"
          stroke="rgba(201,201,212,0.45)"
          strokeWidth="0.5"
        />
        {/* moon at her chest */}
        <circle cx="0" cy="60" r="7" fill="#f4d35e" opacity="0.18" />
        <path d="M-3 54 A 6 6 0 1 0 -3 66 A 4 4 0 1 1 -3 54 Z" fill="#f4d35e" opacity="0.7" />
      </g>

      {/* crescent moon on the ground */}
      <g transform="translate(100 248)">
        <circle r="9" fill="#c9c9d4" opacity="0.25" />
        <path d="M-3 -6 A 6 6 0 1 0 -3 6 A 4 4 0 1 1 -3 -6 Z" fill="#c9c9d4" opacity="0.7" />
      </g>

      {/* faint shop window glow on each side */}
      <rect x="0" y="190" width="32" height="40" fill="rgba(244,211,94,0.06)" />
      <rect x="168" y="190" width="32" height="40" fill="rgba(244,211,94,0.06)" />
    </svg>
  )
}
