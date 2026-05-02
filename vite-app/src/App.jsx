// Smoke test for Stage 3.5 — runs OnboardingFlow standalone. After
// completion we read the saved state back from localStorage to confirm
// saveState fired correctly. Will be replaced by the real App in 3.7.
import { useState } from 'react'
import { C, F, smallAngleClip } from './lib/tokens.js'
import { STORAGE_KEY } from './lib/persistence.js'
import OnboardingFlow from './screens/OnboardingFlow.jsx'

export default function App() {
  const [completed, setCompleted] = useState(null)
  const [reset, setReset] = useState(0)

  if (completed) {
    let stored = null
    try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') } catch (e) {}
    return (
      <div style={{ padding: 24, maxWidth: 720, margin: '0 auto', color: C.text, fontFamily: F.body }}>
        <h1 style={{ fontFamily: F.display, color: C.teal, letterSpacing: '0.2em', marginBottom: 16 }}>
          ✓ onboarding done
        </h1>
        <pre style={{
          background: C.bgCard, color: C.textDim, padding: 14, fontFamily: F.mono, fontSize: 11,
          clipPath: smallAngleClip, overflow: 'auto', maxHeight: 360,
        }}>{JSON.stringify({ onComplete: completed, fromStorage: stored }, null, 2)}</pre>
        <button onClick={() => {
          try { localStorage.removeItem(STORAGE_KEY) } catch (e) {}
          setCompleted(null); setReset(n => n + 1)
        }} style={{
          marginTop: 16, background: C.pink, color: C.bg, border: 'none',
          padding: '12px 24px', cursor: 'pointer',
          fontFamily: F.display, fontSize: 14, letterSpacing: '0.18em', textTransform: 'uppercase',
          clipPath: smallAngleClip,
        }}>↻ Пройти ещё раз</button>
      </div>
    )
  }

  return <OnboardingFlow key={reset} onComplete={setCompleted} />
}
