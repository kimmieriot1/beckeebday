// A faint film-grain overlay, layered above everything except modals.
// Uses an inline SVG fractal-noise filter, scaled to viewport.
export default function GrainOverlay({ opacity = 0.05 }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 mix-blend-overlay"
      style={{ opacity }}
    >
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.96
                    0 0 0 0 0.94
                    0 0 0 0 0.9
                    0 0 0 0.6 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  )
}
