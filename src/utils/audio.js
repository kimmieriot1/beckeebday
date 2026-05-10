import { Howl, Howler } from 'howler'

// Audio sources live in /public/audio. They're optional: missing files fail
// silently so the experience still works without them.
const sources = {
  ambient: ['/audio/ambient-drone.mp3'],
  flip: ['/audio/card-flip.mp3'],
  supernova: ['/audio/supernova.mp3'],
  chime: ['/audio/wind-chime.mp3'],
  empressTone: ['/audio/empress-tone.mp3']
}

const cache = {}

function load(key) {
  if (cache[key]) return cache[key]
  try {
    cache[key] = new Howl({
      src: sources[key],
      loop: key === 'ambient',
      volume: key === 'ambient' ? 0.35 : 0.55,
      html5: key === 'ambient',
      preload: true,
      onloaderror: () => {
        // missing or unsupported, that's fine
      },
      onplayerror: () => {}
    })
  } catch (_e) {
    cache[key] = null
  }
  return cache[key]
}

export function play(key, opts = {}) {
  const sound = load(key)
  if (!sound) return null
  try {
    if (opts.volume != null) sound.volume(opts.volume)
    return sound.play()
  } catch (_e) {
    return null
  }
}

export function stop(key) {
  const sound = cache[key]
  if (sound) {
    try {
      sound.stop()
    } catch (_e) {}
  }
}

export function fade(key, from, to, ms = 1500) {
  const sound = load(key)
  if (!sound) return
  try {
    sound.fade(from, to, ms)
  } catch (_e) {}
}

export function setMuted(muted) {
  try {
    Howler.mute(muted)
  } catch (_e) {}
  globalMuted = muted
}

let globalMuted = true
let synthCtx = null

// Synthesised card-flip whoosh. Soft band-passed white noise with a quick
// envelope. Works without any asset file. About 250ms long.
export function playCardFlip() {
  if (globalMuted) return
  try {
    if (!synthCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return
      synthCtx = new Ctx()
    }
    if (synthCtx.state === 'suspended') synthCtx.resume()

    const ctx = synthCtx
    const now = ctx.currentTime
    const duration = 0.32

    // White noise buffer
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      // mild colouring: add a touch of brown noise for paper-like texture
      const white = Math.random() * 2 - 1
      data[i] = white * (1 - i / data.length) // taper amplitude
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    // Band-pass filter sweeping down for a paper-shuffle quality
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 3
    filter.frequency.setValueAtTime(2400, now)
    filter.frequency.exponentialRampToValueAtTime(700, now + duration)

    // Soft envelope
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.18, now + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noise.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + duration + 0.05)
  } catch (_e) {}
}

export function startAmbient() {
  const sound = load('ambient')
  if (!sound) return
  try {
    if (!sound.playing()) {
      sound.volume(0)
      sound.play()
      sound.fade(0, 0.35, 4000)
    }
  } catch (_e) {}
}

export function fadeAmbientTo(target, ms = 1500) {
  const sound = cache.ambient
  if (!sound) return
  try {
    sound.fade(sound.volume(), target, ms)
  } catch (_e) {}
}
