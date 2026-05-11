import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import LandingScreen from './components/opening/LandingScreen.jsx'
import OpeningLetter from './components/opening/OpeningLetter.jsx'
import StarMap from './components/opening/StarMap.jsx'
import Supernova from './components/opening/Supernova.jsx'
import CardSequence from './components/cards/CardSequence.jsx'
import FinalSpread from './components/reveal/FinalSpread.jsx'
import WeekendMap from './components/reveal/WeekendMap.jsx'
import ItineraryModal from './components/reveal/ItineraryModal.jsx'
import EndScreen from './components/reveal/EndScreen.jsx'
import HiddenSunCard from './components/shared/HiddenSunCard.jsx'
import MoonPhase from './components/shared/MoonPhase.jsx'
import AudioToggle from './components/shared/AudioToggle.jsx'
import GrainOverlay from './components/shared/GrainOverlay.jsx'
import Vignette from './components/shared/Vignette.jsx'
import { sunCard } from './data/cards.js'
import { setMuted, startAmbient, primeAudio } from './utils/audio.js'

export default function App() {
  const [phase, setPhase] = useState('landing')
  const [itineraryKey, setItineraryKey] = useState(null)
  const [sunCardRevealed, setSunCardRevealed] = useState(false)
  const [sunOverlayOpen, setSunOverlayOpen] = useState(false)
  const [audioMuted, setAudioMutedState] = useState(true)

  useEffect(() => {
    setMuted(audioMuted)
  }, [audioMuted])

  function toggleAudio() {
    setAudioMutedState((m) => {
      const next = !m
      if (!next) startAmbient()
      return next
    })
  }

  function handleSunSummoned() {
    setSunCardRevealed(true)
    setSunOverlayOpen(true)
  }

  function handleItinerarySelect(key) {
    if (key === 'sun') {
      setSunOverlayOpen(true)
      return
    }
    if (key === 'opening') return // first card has no detail page
    setItineraryKey(key)
  }

  return (
    <div className="relative min-h-[100dvh] w-full text-text-cream">
      {/* phases */}
      <AnimatePresence mode="wait">
        {phase === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LandingScreen
              onBegin={() => {
                primeAudio()
                if (audioMuted) {
                  setAudioMutedState(false)
                  startAmbient()
                }
                setPhase('letter')
              }}
            />
          </motion.div>
        )}

        {phase === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <OpeningLetter onContinue={() => setPhase('starMap')} />
          </motion.div>
        )}

        {phase === 'starMap' && (
          <motion.div
            key="starMap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <StarMap onIgnite={() => setPhase('supernova')} />
          </motion.div>
        )}

        {phase === 'supernova' && (
          <motion.div
            key="supernova"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Supernova onComplete={() => setPhase('cards')} />
          </motion.div>
        )}

        {phase === 'cards' && (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CardSequence onComplete={() => setPhase('spread')} />
          </motion.div>
        )}

        {phase === 'spread' && (
          <motion.div
            key="spread"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FinalSpread
              sunCardRevealed={sunCardRevealed}
              sunCard={sunCard}
              onSelect={handleItinerarySelect}
              onEnd={() => setPhase('map')}
            />
          </motion.div>
        )}

        {phase === 'map' && (
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <WeekendMap onContinue={() => setPhase('end')} />
          </motion.div>
        )}

        {phase === 'end' && (
          <motion.div
            key="end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <EndScreen onBack={() => setPhase('spread')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* overlays */}
      <ItineraryModal
        open={!!itineraryKey}
        itineraryKey={itineraryKey}
        onClose={() => setItineraryKey(null)}
      />
      <HiddenSunCard
        open={sunOverlayOpen}
        onDismiss={() => setSunOverlayOpen(false)}
      />

      {/* persistent UI */}
      {phase !== 'supernova' && <MoonPhase onFiveTaps={handleSunSummoned} />}
      {phase !== 'supernova' && phase !== 'landing' && (
        <AudioToggle muted={audioMuted} onToggle={toggleAudio} />
      )}

      <Vignette />
      <GrainOverlay />
    </div>
  )
}
