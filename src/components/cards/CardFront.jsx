import CardArt from './CardArt/index.jsx'

// Front face of a tarot card: roman numeral above the art, title and subtitle below,
// gold filigree corners, ornate inner frame.
export default function CardFront({ card }) {
  const isHero = !!card.isHero
  const isGold = card.glow === 'gold' || isHero
  const accent = isGold ? '#f4d35e' : '#c9c9d4'
  const accentSoft = isGold ? 'rgba(244,211,94,0.55)' : 'rgba(201,201,212,0.45)'

  return (
    <div
      className="card-face absolute inset-0 overflow-hidden rounded-[10px]"
      style={{
        transform: 'rotateY(180deg)',
        background: '#080714',
        boxShadow: isGold
          ? 'inset 0 0 48px rgba(212,175,55,0.18), 0 12px 36px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.12)'
          : 'inset 0 0 48px rgba(0,0,0,0.6), 0 12px 36px rgba(0,0,0,0.55)'
      }}
    >
      {/* art layer */}
      <CardArt id={card.id} />

      {/* dark gradient at top and bottom for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(5,5,16,0.7) 0%, rgba(5,5,16,0) 22%, rgba(5,5,16,0) 70%, rgba(5,5,16,0.85) 100%)'
        }}
      />

      {/* roman numeral, top centre */}
      <div className="absolute inset-x-0 top-3 flex justify-center">
        <span
          className="font-roman text-base tracking-sacred"
          style={{ color: accent, textShadow: `0 0 12px ${accentSoft}` }}
        >
          {card.roman}
        </span>
      </div>

      {/* title and subtitle, lower */}
      <div className="absolute inset-x-0 bottom-5 flex flex-col items-center px-4 text-center">
        <h2
          className="font-display text-2xl italic tracking-wide"
          style={{ color: '#f5f1e8', textShadow: `0 0 18px ${accentSoft}` }}
        >
          {card.title}
        </h2>
        <p
          className="mt-1 font-roman text-[10px] uppercase tracking-sacred"
          style={{ color: accent, opacity: 0.85 }}
        >
          {card.subtitle}
        </p>
      </div>

      {/* inner ornate frame */}
      <svg
        viewBox="0 0 200 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="6"
          width="188"
          height="288"
          fill="none"
          stroke={accent}
          strokeOpacity={isGold ? 0.7 : 0.45}
          strokeWidth="0.7"
        />
        <rect
          x="11"
          y="11"
          width="178"
          height="278"
          fill="none"
          stroke={accent}
          strokeOpacity={isGold ? 0.4 : 0.22}
          strokeWidth="0.4"
        />
      </svg>

      {/* corner filigree */}
      {[
        ['left-1 top-1', 0],
        ['right-1 top-1', 90],
        ['right-1 bottom-1', 180],
        ['left-1 bottom-1', 270]
      ].map(([pos, rot]) => (
        <svg
          key={pos}
          viewBox="0 0 60 60"
          width="36"
          height="36"
          className={`pointer-events-none absolute ${pos}`}
          style={{ transform: `rotate(${rot}deg)`, color: accent }}
          aria-hidden="true"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeOpacity={isGold ? 0.95 : 0.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 6 Q22 8 28 22 Q30 28 22 30 Q12 30 8 22" />
            <path d="M6 6 Q8 22 22 28 Q28 30 30 22 Q30 12 22 8" />
            <circle cx="22" cy="22" r="1.6" fill="currentColor" />
          </g>
        </svg>
      ))}
    </div>
  )
}
