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
