// Smoke test for Stage 3.4 — list of Day 1 missions; clicking opens
// MissionDetail with the real mission shape from generateMissionsForDay.
// Will be replaced by the real App in Stage 3.7.
import { useState } from 'react'
import { C, F, smallAngleClip } from './lib/tokens.js'
import { generateMissionsForDay } from './lib/missions.js'
import SectionHeader from './components/SectionHeader.jsx'
import MissionDetail from './components/MissionDetail.jsx'

const day1 = generateMissionsForDay(1)
const day7 = generateMissionsForDay(7)
const allMissions = [...day1, ...day7]
const mockProfile = { gender: 'male', age: 30, height: 180, weight: 80 }

export default function App() {
  const [openId, setOpenId] = useState(null)
  const [completed, setCompleted] = useState(null)

  const openMission = allMissions.find(m => m.id === openId)

  return (
    <div style={{ padding: '24px 0', fontFamily: F.body, color: C.text, fontSize: 13, lineHeight: 1.6, maxWidth: 720, margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: F.display, color: C.pink, letterSpacing: '0.2em', padding: '0 22px', marginBottom: 16 }}>
        smoke 3.4 · MissionDetail
      </h1>
      <div style={{ padding: '0 22px', marginBottom: 24, fontFamily: F.mono, fontSize: 11, color: C.textDim }}>
        тапни любую миссию, заполни поле, нажми «Миссия Завершена» — увидишь data в console
      </div>

      {completed && (
        <div style={{
          margin: '0 22px 24px', padding: 12,
          background: C.tealSoft, border: `1px solid ${C.tealBorder}`,
          fontFamily: F.mono, fontSize: 11, color: C.teal, clipPath: smallAngleClip,
        }}>
          last completed → {completed.code}: {JSON.stringify(completed.data).slice(0, 120)}
        </div>
      )}

      <SectionHeader sub={`day 1 · ${day1.length}`}>missions</SectionHeader>
      <MissionList missions={day1} onOpen={setOpenId} />

      <div style={{ height: 16 }} />

      <SectionHeader sub={`day 7 · ${day7.length}`}>missions</SectionHeader>
      <MissionList missions={day7} onOpen={setOpenId} />

      {openMission && (
        <MissionDetail
          mission={openMission}
          profile={mockProfile}
          onComplete={(data) => {
            setCompleted({ code: openMission.code, data })
            setOpenId(null)
          }}
          onAbort={() => setOpenId(null)}
        />
      )}
    </div>
  )
}

function MissionList({ missions, onOpen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 22px' }}>
      {missions.map(m => (
        <button key={m.id} onClick={() => onOpen(m.id)} style={{
          background: C.bgCard, border: `1px solid ${C.border}`,
          color: C.text, padding: '10px 14px', cursor: 'pointer',
          textAlign: 'left', clipPath: smallAngleClip,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textFaint, letterSpacing: '0.18em', minWidth: 32 }}>
            [{m.num}]
          </span>
          <span style={{ flex: 1, fontFamily: F.body, fontSize: 12 }}>
            {m.title || m.code} <span style={{ color: C.textFaint }}>· {m.inputType}</span>
          </span>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.pink }}>+{m.xp}</span>
        </button>
      ))}
    </div>
  )
}
