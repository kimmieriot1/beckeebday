import { jsPDF } from 'jspdf'
import { itinerary, itineraryOrder } from '../data/itinerary.js'

// A reliable, text-based PDF export. No html2canvas, no off-screen rendering,
// no font-loading races. Just clean typography on paper.

export async function exportItineraryPDF() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const marginX = 18
  const marginTop = 22
  const marginBottom = 18
  const contentW = pageW - marginX * 2

  let y = marginTop

  function ensureSpace(needed) {
    if (y + needed > pageH - marginBottom) {
      doc.addPage()
      y = marginTop
    }
  }

  function rule({ short = false } = {}) {
    ensureSpace(6)
    doc.setDrawColor(180, 150, 60)
    doc.setLineWidth(0.3)
    const w = short ? 30 : contentW
    const x1 = short ? pageW / 2 - w / 2 : marginX
    doc.line(x1, y, x1 + w, y)
    y += 5
  }

  function smallCaps(text, { color = [120, 110, 90] } = {}) {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setCharSpace(1.4)
    doc.setTextColor(...color)
    const upper = text.toUpperCase()
    ensureSpace(5)
    doc.text(upper, marginX, y)
    y += 5
    doc.setCharSpace(0)
  }

  function heading(text, size = 18) {
    doc.setFont('times', 'italic')
    doc.setFontSize(size)
    doc.setTextColor(20, 16, 32)
    const lines = doc.splitTextToSize(text, contentW)
    ensureSpace(lines.length * size * 0.45 + 2)
    doc.text(lines, marginX, y)
    y += lines.length * size * 0.45 + 1
  }

  function body(text, { italic = false, color = [40, 36, 50] } = {}) {
    if (!text) return
    doc.setFont('times', italic ? 'italic' : 'normal')
    doc.setFontSize(11)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, contentW)
    for (const line of lines) {
      ensureSpace(5.5)
      doc.text(line, marginX, y)
      y += 5
    }
    y += 2
  }

  function field(label, value) {
    if (!value) return
    smallCaps(label, { color: [140, 120, 50] })
    body(value)
  }

  function spacer(h = 6) {
    y += h
  }

  // ==== Cover ====
  doc.setFillColor(245, 241, 232)
  doc.rect(0, 0, pageW, pageH, 'F')

  y = 36
  doc.setFont('times', 'italic')
  doc.setFontSize(28)
  doc.setTextColor(20, 16, 32)
  const title = 'Rebecca May Magdeline'
  const titleW = doc.getTextWidth(title)
  doc.text(title, (pageW - titleW) / 2, y)
  y += 10

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setCharSpace(2)
  doc.setTextColor(168, 128, 31)
  const sub = 'GLASTONBURY  ·  26 TO 28 JUNE 2026'
  const subW = doc.getTextWidth(sub)
  doc.text(sub, (pageW - subW) / 2, y)
  doc.setCharSpace(0)
  y += 6

  rule({ short: true })
  spacer(4)

  doc.setFont('times', 'italic')
  doc.setFontSize(11)
  doc.setTextColor(60, 52, 70)
  const intro = [
    'A weekend, drawn by the stars and built by hand.',
    'Two nights beneath the Somerset sky.',
    'A campervan. A road that knows the way.'
  ]
  for (const line of intro) {
    const w = doc.getTextWidth(line)
    doc.text(line, (pageW - w) / 2, y)
    y += 5.5
  }

  spacer(8)
  rule()

  // ==== Itinerary ====
  for (const key of itineraryOrder) {
    if (key === 'opening') continue
    const data = itinerary[key]
    if (!data) continue

    spacer(2)
    smallCaps(`${data.day}${data.time ? '  ·  ' + data.time : ''}`, { color: [168, 128, 31] })
    heading(data.title, 18)

    if (data.intro) body(data.intro, { italic: true, color: [60, 52, 70] })
    if (data.description && !data.intro) body(data.description)
    else if (data.description && data.intro) body(data.description, { color: [60, 52, 70] })

    if (data.history) {
      spacer(2)
      smallCaps('A small piece of history', { color: [168, 128, 31] })
      body(data.history, { italic: true, color: [60, 52, 70] })
    }

    field('Where', data.address)
    field('Online', data.url ? prettyUrl(data.url) : null)
    field('Practical', data.practical)
    field('Booking', data.bookingStatus)

    if (Array.isArray(data.stops) && data.stops.length) {
      spacer(2)
      smallCaps('The stops')
      for (const stop of data.stops) {
        ensureSpace(8)
        doc.setFont('times', 'bold')
        doc.setFontSize(11)
        doc.setTextColor(20, 16, 32)
        doc.text(stop.name, marginX, y)
        y += 4.5

        if (stop.address) body(stop.address, { color: [110, 100, 120] })
        if (stop.hours) body(stop.hours, { italic: true, color: [110, 100, 120] })
        if (stop.description) body(stop.description)
        if (stop.url) body(prettyUrl(stop.url), { color: [168, 128, 31] })
        spacer(1)
      }
    }

    spacer(4)
    rule()
  }

  spacer(4)
  doc.setFont('times', 'italic')
  doc.setFontSize(12)
  doc.setTextColor(60, 52, 70)
  ensureSpace(10)
  const closing = 'With love, always. Kim.'
  const cw = doc.getTextWidth(closing)
  doc.text(closing, (pageW - cw) / 2, y)

  doc.save('rebecca-magdeline-glastonbury.pdf')
}

function prettyUrl(u) {
  try {
    const url = new URL(u)
    return url.hostname.replace(/^www\./, '') + url.pathname.replace(/\/$/, '')
  } catch {
    return u
  }
}
