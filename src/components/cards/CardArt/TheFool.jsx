// I. The Fool: a stepping figure on a starlit cliff.
export default function TheFool() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="fool-bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#1a1830" />
          <stop offset="60%" stopColor="#0a0a1f" />
          <stop offset="100%" stopColor="#050510" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#fool-bg)" />

      {/* scattered stars */}
      {[
        [30, 50, 1],
        [60, 30, 0.6],
        [90, 70, 0.8],
        [140, 40, 1.2],
        [170, 90, 0.7],
        [50, 110, 0.5],
        [120, 130, 0.9],
        [160, 150, 0.6],
        [40, 170, 0.5],
        [180, 200, 0.7],
        [80, 220, 0.6],
        [110, 250, 0.5]
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#c9c9d4" opacity={0.5 + Math.random() * 0.5} />
      ))}

      {/* horizon and cliff edge */}
      <path
        d="M0 240 L60 240 Q70 238 80 244 L200 244 L200 300 L0 300 Z"
        fill="#08080f"
        opacity="0.95"
      />
      <path d="M0 240 L60 240 Q70 238 80 244 L200 244" stroke="rgba(201,201,212,0.3)" strokeWidth="0.6" fill="none" />

      {/* figure silhouette stepping */}
      <g transform="translate(78 198)">
        <path
          d="M0 42 L0 22 Q-3 20 -3 14 L-1 6 Q-4 4 -4 0 A 4 4 0 1 1 4 0 Q4 4 1 6 L3 14 Q3 20 0 22 L0 42 Z"
          fill="#0d0d20"
          stroke="rgba(201,201,212,0.6)"
          strokeWidth="0.5"
        />
        {/* outstretched arm forward */}
        <path d="M0 16 L10 22" stroke="rgba(201,201,212,0.55)" strokeWidth="1" strokeLinecap="round" />
        {/* small bundle on a stick */}
        <path d="M-2 16 L-12 8" stroke="rgba(201,201,212,0.55)" strokeWidth="0.7" strokeLinecap="round" />
      </g>

      {/* a moth ahead of the figure */}
      <g transform="translate(110 200)" opacity="0.85">
        <path
          d="M0 0 Q-4 -3 -3 -6 Q-1 -8 0 -5 Q1 -8 3 -6 Q4 -3 0 0 Q-3 4 -2 7 Q0 9 0 6 Q0 9 2 7 Q3 4 0 0 Z"
          fill="#f4d35e"
          opacity="0.65"
        />
      </g>

      {/* faint campervan made of starlight, below */}
      <g transform="translate(40 268)" opacity="0.4">
        <rect x="0" y="0" width="40" height="14" rx="2" fill="none" stroke="#c9c9d4" strokeWidth="0.5" />
        <circle cx="6" cy="14" r="2" fill="none" stroke="#c9c9d4" strokeWidth="0.5" />
        <circle cx="34" cy="14" r="2" fill="none" stroke="#c9c9d4" strokeWidth="0.5" />
        {[8, 16, 24, 32].map((x) => (
          <circle key={x} cx={x} cy="6" r="0.6" fill="#f4d35e" opacity="0.7" />
        ))}
      </g>
    </svg>
  )
}
