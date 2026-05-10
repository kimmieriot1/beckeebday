// IX. The World: vintage campervan winding through a limestone gorge at golden hour.
export default function TheWorld() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="world-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#28162e" />
          <stop offset="40%" stopColor="#5a2a3a" />
          <stop offset="80%" stopColor="#1a0e1c" />
          <stop offset="100%" stopColor="#080510" />
        </linearGradient>
      </defs>
      <rect width="200" height="300" fill="url(#world-sky)" />

      {/* faint constellations dissolving into the gorge */}
      {[
        [40, 30, 0.8],
        [70, 50, 0.5],
        [110, 40, 1],
        [150, 60, 0.6],
        [180, 30, 0.7]
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#f5f1e8" opacity="0.85" />
      ))}

      {/* limestone cliffs left and right */}
      <path
        d="M0 0 L0 300 L70 300 Q60 240 80 200 Q70 160 60 130 Q50 100 30 80 Q20 60 0 50 Z"
        fill="#1c1620"
        stroke="rgba(212,175,55,0.18)"
        strokeWidth="0.4"
      />
      <path
        d="M200 0 L200 300 L130 300 Q140 240 120 200 Q130 160 140 130 Q150 100 170 80 Q180 60 200 50 Z"
        fill="#1c1620"
        stroke="rgba(212,175,55,0.18)"
        strokeWidth="0.4"
      />

      {/* highlight on cliff edges */}
      <path d="M0 50 Q20 60 30 80 Q50 100 60 130" stroke="rgba(244,211,94,0.35)" strokeWidth="0.6" fill="none" />
      <path d="M200 50 Q180 60 170 80 Q150 100 140 130" stroke="rgba(244,211,94,0.35)" strokeWidth="0.6" fill="none" />

      {/* winding road */}
      <path
        d="M100 300 Q92 250 100 220 Q108 190 96 160 Q90 140 100 120 Q112 100 100 80"
        fill="none"
        stroke="rgba(244,211,94,0.35)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M100 300 Q92 250 100 220 Q108 190 96 160 Q90 140 100 120 Q112 100 100 80"
        fill="none"
        stroke="rgba(245,241,232,0.5)"
        strokeWidth="0.8"
        strokeDasharray="3 3"
      />

      {/* campervan */}
      <g transform="translate(96 230)">
        <rect x="-14" y="-10" width="28" height="14" rx="2" fill="#2a1828" stroke="rgba(212,175,55,0.65)" strokeWidth="0.4" />
        <rect x="-12" y="-8" width="10" height="6" fill="rgba(244,211,94,0.5)" />
        <rect x="0" y="-8" width="12" height="6" fill="rgba(244,211,94,0.5)" />
        <circle cx="-9" cy="6" r="2.2" fill="#0a0a1f" stroke="rgba(212,175,55,0.6)" strokeWidth="0.3" />
        <circle cx="9" cy="6" r="2.2" fill="#0a0a1f" stroke="rgba(212,175,55,0.6)" strokeWidth="0.3" />
        {/* roof rack */}
        <line x1="-12" y1="-12" x2="12" y2="-12" stroke="rgba(212,175,55,0.5)" strokeWidth="0.4" />
      </g>

      {/* wild goats on cliffs */}
      <g fill="rgba(245,241,232,0.55)">
        <ellipse cx="40" cy="120" rx="3" ry="1.6" />
        <circle cx="42" cy="118" r="0.9" />
        <ellipse cx="160" cy="100" rx="3" ry="1.6" />
        <circle cx="158" cy="98" r="0.9" />
      </g>
    </svg>
  )
}
