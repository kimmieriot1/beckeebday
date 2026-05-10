// A soft radial vignette, darker at the edges, lighter at centre.
// Fixed, non-interactive, sits beneath the grain overlay.
export default function Vignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.7) 100%)'
      }}
    />
  )
}
