// VII. The Chalice: Chalice Well lid with vesica piscis, water spilling outward,
// red roses and yew trees, two streams meeting in a moonlit pool.
export default function TheChalice() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="cha-bg" cx="50%" cy="35%" r="80%">
          <stop offset="0%" stopColor="#1a1830" />
          <stop offset="60%" stopColor="#0a0a18" />
          <stop offset="100%" stopColor="#040410" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#cha-bg)" />

      {/* yew trees flanking */}
      <g opacity="0.7">
        <path d="M16 240 Q14 200 22 160 Q26 130 22 100 L18 100 L20 240 Z" fill="#0a1014" stroke="rgba(201,201,212,0.3)" strokeWidth="0.3" />
        <path d="M184 240 Q186 200 178 160 Q174 130 178 100 L182 100 L180 240 Z" fill="#0a1014" stroke="rgba(201,201,212,0.3)" strokeWidth="0.3" />
        {/* foliage */}
        <ellipse cx="20" cy="120" rx="14" ry="22" fill="#0a1014" stroke="rgba(201,201,212,0.25)" strokeWidth="0.3" />
        <ellipse cx="180" cy="120" rx="14" ry="22" fill="#0a1014" stroke="rgba(201,201,212,0.25)" strokeWidth="0.3" />
      </g>

      {/* the well lid: vesica piscis */}
      <g transform="translate(100 110)">
        <circle r="38" fill="#0a0a1f" stroke="rgba(201,201,212,0.55)" strokeWidth="0.7" />
        <circle r="44" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.5" />
        {/* two interlocking circles */}
        <circle cx="-10" cy="0" r="20" fill="none" stroke="rgba(244,211,94,0.7)" strokeWidth="0.7" />
        <circle cx="10" cy="0" r="20" fill="none" stroke="rgba(244,211,94,0.7)" strokeWidth="0.7" />
        {/* central spear */}
        <line x1="0" y1="-30" x2="0" y2="30" stroke="rgba(244,211,94,0.7)" strokeWidth="0.6" />
        <path d="M0 -30 L-3 -25 L0 -22 L3 -25 Z" fill="rgba(244,211,94,0.7)" />
      </g>

      {/* two streams falling from the lid */}
      <g stroke="rgba(201,201,212,0.55)" strokeWidth="0.7" fill="none" strokeLinecap="round">
        <path d="M86 148 Q82 180 90 220" />
        <path d="M114 148 Q118 180 110 220" />
      </g>

      {/* moonlit pool below */}
      <ellipse cx="100" cy="240" rx="50" ry="14" fill="#0a0a1f" stroke="rgba(201,201,212,0.4)" strokeWidth="0.5" />
      <ellipse cx="100" cy="238" rx="38" ry="3" fill="rgba(201,201,212,0.18)" />
      <ellipse cx="100" cy="240" rx="20" ry="2" fill="rgba(244,211,94,0.18)" />
      {/* iron-red tint at the centre of the pool */}
      <ellipse cx="100" cy="240" rx="10" ry="1.5" fill="rgba(139,30,63,0.5)" />

      {/* red roses scattered */}
      {[
        [50, 200],
        [70, 230],
        [130, 230],
        [150, 200],
        [38, 250],
        [162, 250]
      ].map(([cx, cy], i) => (
        <g key={i} transform={`translate(${cx} ${cy})`}>
          <circle r="3" fill="#8b1e3f" opacity="0.85" />
          <circle r="1.4" fill="#3a0a18" opacity="0.8" />
        </g>
      ))}
    </svg>
  )
}
