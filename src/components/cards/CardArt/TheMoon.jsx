// V. The Moon: cave mouth, stalagmite shaped like a hooded figure, river of moonlight.
export default function TheMoon() {
  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <radialGradient id="moonart-bg" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#15182a" />
          <stop offset="60%" stopColor="#080816" />
          <stop offset="100%" stopColor="#04040c" />
        </radialGradient>
      </defs>
      <rect width="200" height="300" fill="url(#moonart-bg)" />

      {/* stars seen through cave mouth */}
      {[
        [60, 70, 0.7],
        [100, 50, 1],
        [140, 80, 0.6],
        [80, 100, 0.5]
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#c9c9d4" opacity="0.85" />
      ))}

      {/* cave silhouette: cuts away the lit centre, leaving a dark frame */}
      <path
        d="M0 0 L0 300 L200 300 L200 0 Z M30 30 Q60 -10 100 30 Q140 70 170 30 L170 220 Q160 240 100 250 Q40 240 30 220 Z"
        fill="#050510"
        fillRule="evenodd"
      />
      <path
        d="M30 30 Q60 -10 100 30 Q140 70 170 30 L170 220 Q160 240 100 250 Q40 240 30 220 Z"
        fill="none"
        stroke="rgba(201,201,212,0.4)"
        strokeWidth="0.6"
      />

      {/* underground river */}
      <path
        d="M30 220 Q60 230 100 234 Q140 230 170 220"
        fill="none"
        stroke="#c9c9d4"
        strokeOpacity="0.5"
        strokeWidth="0.7"
      />
      <path
        d="M30 220 Q60 235 100 242 Q140 235 170 220"
        fill="none"
        stroke="#c9c9d4"
        strokeOpacity="0.25"
        strokeWidth="0.5"
      />

      {/* stalagmite as hooded figure */}
      <g transform="translate(100 240)">
        <path
          d="M-16 0 Q-14 -40 -10 -70 Q-6 -90 0 -100 Q6 -90 10 -70 Q14 -40 16 0 Z"
          fill="#08081a"
          stroke="rgba(201,201,212,0.55)"
          strokeWidth="0.6"
        />
        {/* hood crown shadow */}
        <ellipse cx="0" cy="-94" rx="6" ry="3" fill="#050510" />
        {/* faint face hint */}
        <ellipse cx="0" cy="-80" rx="3" ry="4" fill="rgba(201,201,212,0.15)" />
      </g>

      {/* dripping water highlights */}
      {[60, 80, 130, 150].map((x, i) => (
        <line
          key={i}
          x1={x}
          y1={20 + (i % 2) * 6}
          x2={x}
          y2={50 + (i % 2) * 6}
          stroke="rgba(201,201,212,0.35)"
          strokeWidth="0.4"
        />
      ))}
    </svg>
  )
}
