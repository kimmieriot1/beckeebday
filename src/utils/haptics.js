// Mobile haptic feedback. Gracefully no-ops on devices that don't support
// the Vibration API (most desktops, iOS Safari without user gesture, etc).

function supported() {
  return typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function'
}

function safeVibrate(pattern) {
  if (!supported()) return
  try {
    navigator.vibrate(pattern)
  } catch (_e) {}
}

// A soft tick. Card flips, button taps.
export function tap() {
  safeVibrate(12)
}

// A firmer thud. Supernova bloom, important moments.
export function thud() {
  safeVibrate(28)
}

// A celebratory pattern. Sun card easter egg reveal.
export function flourish() {
  safeVibrate([20, 50, 20, 50, 60])
}
