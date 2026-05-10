// VI. The Empress (Magdeline). Hero card. Warmer tones: deep red, gold leaf, candlelight.
// Mary Magdalene before the Abbey ruins, alabaster jar, white roses, soft halo.
export default function TheEmpress() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="emp-bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#3a1d2c" />
          <stop offset="50%" stopColor="#1a0e1c" />
          <stop offset="100%" stopColor="#080510" />
        </radialGradient>
        <radialGradient id="emp-halo" cx="50%" cy="30%" r="35%">
          <stop offset="0%" stopColor="rgba(244,211,94,0.5)" />
          <stop offset="60%" stopColor="rgba(244,211,94,0.12)" />
          <stop offset="100%" stopColor="rgba(244,211,94,0)" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#emp-bg)" />
      <rect width="200" height="300" fill="url(#emp-halo)" />

      {/* gothic arches behind */}
      <g opacity="0.55" stroke="rgba(212,175,55,0.55)" strokeWidth="0.6" fill="none" strokeLinecap="round">
        <path d="M20 220 L20 130 Q20 100 40 100 Q60 100 60 130 L60 220" />
        <path d="M70 220 L70 110 Q70 78 100 78 Q130 78 130 110 L130 220" />
        <path d="M140 220 L140 130 Q140 100 160 100 Q180 100 180 130 L180 220" />
        <path d="M70 110 Q100 86 130 110" />
        <path d="M20 130 Q40 110 60 130" />
        <path d="M140 130 Q160 110 180 130" />
        {/* ruined edges, broken at the top */}
        <path d="M30 100 L34 96 L40 100" />
        <path d="M88 78 L94 72 L100 78 L106 72 L112 78" />
      </g>

      {/* halo */}
      <circle cx="100" cy="98" r="22" fill="rgba(244,211,94,0.18)" />
      <circle cx="100" cy="98" r="18" fill="none" stroke="#f4d35e" strokeOpacity="0.6" strokeWidth="0.6" />

      {/* figure */}
      <g transform="translate(100 95)">
        {/* head */}
        <ellipse cx="0" cy="0" rx="11" ry="13" fill="#1a0e1c" stroke="#f4d35e" strokeOpacity="0.6" strokeWidth="0.5" />
        {/* hair, long flowing */}
        <path
          d="M-11 -2 Q-22 30 -16 80 M11 -2 Q22 30 16 80"
          fill="none"
          stroke="#8b1e3f"
          strokeOpacity="0.7"
          strokeWidth="0.7"
          strokeLinecap="round"
        />
        {/* robes */}
        <path
          d="M-12 14 Q-30 60 -28 140 L28 140 Q30 60 12 14 Z"
          fill="#8b1e3f"
          stroke="#f4d35e"
          strokeOpacity="0.55"
          strokeWidth="0.6"
        />
        {/* gold trim */}
        <path
          d="M-10 14 Q-12 30 -8 50 M10 14 Q12 30 8 50"
          fill="none"
          stroke="#f4d35e"
          strokeOpacity="0.85"
          strokeWidth="0.6"
        />
        <path
          d="M-28 140 Q-12 134 0 138 Q12 134 28 140"
          fill="none"
          stroke="#f4d35e"
          strokeOpacity="0.6"
          strokeWidth="0.6"
        />

        {/* alabaster jar held in arms */}
        <g transform="translate(0 70)">
          <path
            d="M-9 0 Q-10 14 0 18 Q10 14 9 0 Q9 -4 6 -6 L-6 -6 Q-9 -4 -9 0 Z"
            fill="#f5f1e8"
            opacity="0.85"
            stroke="#f4d35e"
            strokeOpacity="0.6"
            strokeWidth="0.4"
          />
          <ellipse cx="0" cy="-6" rx="6" ry="1.5" fill="#f5f1e8" opacity="0.85" />
          <line x1="-7" y1="6" x2="7" y2="6" stroke="#f4d35e" strokeOpacity="0.7" strokeWidth="0.4" />
        </g>
      </g>

      {/* white roses at her feet */}
      {[60, 100, 140].map((x, i) => (
        <g key={i} transform={`translate(${x} 246)`}>
          <circle r="4" fill="#f5f1e8" opacity="0.85" />
          <circle r="2" fill="#8b1e3f" opacity="0.6" />
          <path d={`M-3 4 Q0 8 3 4`} stroke="#5a3320" strokeOpacity="0.6" strokeWidth="0.5" fill="none" />
        </g>
      ))}

      {/* candle flames flanking */}
      {[26, 174].map((x, i) => (
        <g key={i} transform={`translate(${x} 240)`}>
          <path d="M0 -8 Q-2 -4 0 0 Q2 -4 0 -8 Z" fill="#f4d35e" opacity="0.9" />
          <circle r="6" fill="#f4d35e" opacity="0.18" />
        </g>
      ))}
    </svg>
  )
}
