// Generate an .ics calendar invite for the Glastonbury weekend.
// Multi-day all-day event from 26 to 28 June 2026.

function pad(n) {
  return String(n).padStart(2, '0')
}

function nowUTCStamp() {
  const d = new Date()
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  )
}

// Fold long lines per RFC 5545 (75 octets max). Simple version.
function foldLine(line) {
  if (line.length <= 73) return line
  const out = []
  let i = 0
  while (i < line.length) {
    out.push((i === 0 ? '' : ' ') + line.slice(i, i + 73))
    i += 73
  }
  return out.join('\r\n')
}

function escape(text) {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export function buildICS() {
  const description = escape(
    "Two nights beneath the Somerset sky. A campervan. A road that knows the way. From Kim, with love."
  )

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Beckee Birthday//Glastonbury 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:beckee-magdeline-glastonbury-2026@kim',
    'DTSTAMP:' + nowUTCStamp(),
    // All-day, end date is exclusive in ICS, so 29 = inclusive 28
    'DTSTART;VALUE=DATE:20260626',
    'DTEND;VALUE=DATE:20260629',
    'SUMMARY:Your Witchy Weekend',
    'LOCATION:Glastonbury, Somerset',
    'DESCRIPTION:' + description,
    'TRANSP:OPAQUE',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].map(foldLine)

  return lines.join('\r\n')
}

export function downloadICS() {
  const ics = buildICS()
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'beckee-glastonbury-2026.ics'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
