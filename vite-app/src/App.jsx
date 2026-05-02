// Smoke test for Stage 3.6 — switcher between Today / Agent / Story /
// Settings with a mock state. Lets us verify each screen renders with
// realistic data before assembling the real App in 3.7.
import { useState } from 'react'
import { C, F, smallAngleClip } from './lib/tokens.js'
import { generateMissionsForDay } from './lib/missions.js'
import TodayScreen from './screens/TodayScreen.jsx'
import AgentScreen from './screens/AgentScreen.jsx'
import StoryScreen from './screens/StoryScreen.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'

const mockProfile = { name: 'МАКС', age: 30, gender: 'male', height: 180, weight: 80, classCode: 'HYP' }
const mockStats = { 'СИЛ': 55, 'ВЫН': 48, 'МАС': 62, 'ПИТ': 30, 'ВОС': 50, 'ФОР': 58 }
const mockGoals = { 'СИЛ': 73, 'ВЫН': 58, 'МАС': 84, 'ПИТ': 55, 'ВОС': 68, 'ФОР': 70 }

const stateWithStats = {
  startDate: '2026-04-15T00:00:00.000Z',
  stats: mockStats,
  goals: mockGoals,
  mode: 'mass',
  profile: mockProfile,
  daysData: {
    '1': { missions: generateMissionsForDay(1).map((m, i) => ({ ...m, done: i < 4 })), xpEarned: 500, completed: false },
    '2': { missions: [], xpEarned: 200, completed: true },
    '3': { missions: [], xpEarned: 150, completed: true },
  },
  totalXP: 1850,
}

const stateNullStats = { ...stateWithStats, stats: null, goals: null, mode: null, totalXP: 0, daysData: {} }

const SCREENS = ['today', 'agent', 'story', 'cfg']
const DAYS = [1, 7, 21, 50]
const VARIANTS = { 'with stats': stateWithStats, 'null stats (day 1)': stateNullStats }

export default function App() {
  const [screen, setScreen] = useState('today')
  const [day, setDay] = useState(7)
  const [variantName, setVariantName] = useState('with stats')
  const state = VARIANTS[variantName]
  const missions = generateMissionsForDay(day, state.mode || 'mass').map((m, i) => ({ ...m, done: i % 3 === 0 }))

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.text, fontFamily: F.body, paddingBottom: 80 }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: C.bgPanel, borderBottom: `1px solid ${C.border}`,
        padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: 6,
        fontFamily: F.mono, fontSize: 10,
      }}>
        <span style={{ color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>screen:</span>
        {SCREENS.map(s => (
          <button key={s} onClick={() => setScreen(s)} style={chipStyle(screen === s, C.pink)}>{s}</button>
        ))}
        <span style={{ color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase', marginLeft: 12 }}>day:</span>
        {DAYS.map(d => (
          <button key={d} onClick={() => setDay(d)} style={chipStyle(day === d, C.teal)}>{d}</button>
        ))}
        <span style={{ color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase', marginLeft: 12 }}>variant:</span>
        {Object.keys(VARIANTS).map(v => (
          <button key={v} onClick={() => setVariantName(v)} style={chipStyle(variantName === v, C.gold)}>{v}</button>
        ))}
      </div>

      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        {screen === 'today' && <TodayScreen state={state} currentDay={day} missions={missions} onMissionClick={(id) => console.log('clicked', id)} />}
        {screen === 'agent' && <AgentScreen state={state} currentDay={day} onReset={() => console.log('reset')} />}
        {screen === 'story' && <StoryScreen state={state} currentDay={day} />}
        {screen === 'cfg' && <SettingsScreen />}
      </div>
    </div>
  )
}

function chipStyle(active, accent) {
  return {
    background: active ? accent : 'transparent',
    color: active ? C.bg : C.textDim,
    border: `1px solid ${active ? accent : C.border}`,
    padding: '4px 10px', cursor: 'pointer',
    fontFamily: F.mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase',
    clipPath: smallAngleClip,
  }
}
