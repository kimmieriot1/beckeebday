// Lightweight moon-phase math, replacing the lunar-phase-js dependency.
// Approximation good to a few hours, which is plenty for a visual indicator.

const SYNODIC_MONTH = 29.530588853 // days between new moons
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14) // 6 January 2000, 18:14 UTC

export function getMoonPhase(date = new Date()) {
  const t = typeof date === 'number' ? date : date.getTime()
  const days = (t - KNOWN_NEW_MOON) / 86_400_000
  const phase = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH
  return phase / SYNODIC_MONTH // 0 = new, 0.25 = first quarter, 0.5 = full, 0.75 = last quarter
}

export function getMoonName(phase) {
  if (phase < 0.03 || phase > 0.97) return 'New Moon'
  if (phase < 0.22) return 'Waxing Crescent'
  if (phase < 0.28) return 'First Quarter'
  if (phase < 0.47) return 'Waxing Gibbous'
  if (phase < 0.53) return 'Full Moon'
  if (phase < 0.72) return 'Waning Gibbous'
  if (phase < 0.78) return 'Last Quarter'
  return 'Waning Crescent'
}

// Illuminated fraction, 0 to 1
export function getIllumination(phase) {
  return (1 - Math.cos(phase * Math.PI * 2)) / 2
}
