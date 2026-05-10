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

// Wake the AudioContext on the first user gesture so subsequent plays
// don't hit iOS Safari's autoplay restrictions.
export function primeAudio() {
  try {
    if (!synthCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      if (!Ctx) return
      synthCtx = new Ctx()
    }
    if (synthCtx.state === 'suspended') synthCtx.resume()
  } catch (_e) {}
}

// Synthesised card-flip whoosh: a paper-shuffle followed by a soft thump.
// Two layers, ~400ms total. Loud enough to hear on phone speakers.
export function playCardFlip() {
  if (globalMuted) return
  try {
    primeAudio()
    if (!synthCtx) return

    const ctx = synthCtx
    const now = ctx.currentTime
    const duration = 0.42

    // Layer 1: Band-passed white noise (paper rustle)
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1
      data[i] = white * (1 - i / data.length)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.Q.value = 2.5
    filter.frequency.setValueAtTime(2800, now)
    filter.frequency.exponentialRampToValueAtTime(600, now + duration)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0, now)
    noiseGain.gain.linearRampToValueAtTime(0.45, now + 0.02)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + duration + 0.05)

    // Layer 2: A soft low thump at the end (the card landing)
    const thumpDelay = 0.12
    const thumpDur = 0.18
    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, now + thumpDelay)
    osc.frequency.exponentialRampToValueAtTime(60, now + thumpDelay + thumpDur)

    const thumpGain = ctx.createGain()
    thumpGain.gain.setValueAtTime(0, now + thumpDelay)
    thumpGain.gain.linearRampToValueAtTime(0.22, now + thumpDelay + 0.01)
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + thumpDelay + thumpDur)

    osc.connect(thumpGain)
    thumpGain.connect(ctx.destination)
    osc.start(now + thumpDelay)
    osc.stop(now + thumpDelay + thumpDur + 0.02)
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
