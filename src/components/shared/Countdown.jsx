import { useEffect, useState } from 'react'

// Trip starts 3pm BST on 26 June 2026.
// 3pm BST = 14:00 UTC.
const TRIP_START = Date.UTC(2026, 5, 26, 14, 0, 0)

function diff(now) {
  const ms = TRIP_START - now
  if (ms <= 0) return null
  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

export default function Countdown() {
  const [d, setD] = useState(() => diff(Date.now()))

  useEffect(() => {
    const id = setInterval(() => setD(diff(Date.now())), 1000)
    return () => clearInterval(id)
  }, [])

  if (!d) {
    return (
      <p className="font-roman text-sm uppercase tracking-sacred text-text-muted">
        The hour has come.
      </p>
    )
  }

  return (
    <div className="flex items-baseline justify-center gap-3 font-roman uppercase tracking-widest text-text-muted">
      <Cell value={d.days} label="days" big />
      <Cell value={String(d.hours).padStart(2, '0')} label="hrs" />
      <Cell value={String(d.minutes).padStart(2, '0')} label="min" />
      <Cell value={String(d.seconds).padStart(2, '0')} label="sec" />
    </div>
  )
}

function Cell({ value, label, big = false }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={
          big
            ? 'font-display text-5xl text-text-cream sm:text-6xl'
            : 'font-display text-2xl text-text-cream sm:text-3xl'
        }
        style={{ fontVariantNumeric: 'lining-nums tabular-nums' }}
      >
        {value}
      </span>
      <span className="mt-1 text-[10px] tracking-sacred sm:text-xs">{label}</span>
    </div>
  )
}
