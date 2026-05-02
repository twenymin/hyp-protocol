// Smoke test for Stage 3.2 — adds icons + primitives on top of the
// 3.1 lib smoke. Will be replaced by the real App in Stage 3.7.
import { useState } from 'react'
import { C, F } from './lib/tokens.js'
import { calcOVR, calcTier, calibrateFromDay1, calibrateGoals } from './lib/calibration.js'
import { generateMissionsForDay, getChapterByDay } from './lib/missions.js'
import { getInitialState } from './lib/persistence.js'
import * as Icons from './components/icons.jsx'
import SectionHeader from './components/SectionHeader.jsx'
import CompactInput from './components/inputs/CompactInput.jsx'
import FormField from './components/inputs/FormField.jsx'
import SectionLabel from './components/inputs/SectionLabel.jsx'

const sampleStats = { 'СИЛ': 50, 'ВЫН': 45, 'МАС': 60, 'ПИТ': 25, 'ВОС': 50, 'ФОР': 55 }
const sampleProfile = { age: 30, gender: 'male', height: 180, weight: 80 }
const sampleDay1 = { weight: 80, bodyFat: 18, maxPushups: 25, plankSec: 90 }

const libProbes = {
  'calcOVR': calcOVR(sampleStats),
  'calcTier(70).display': calcTier(70).display,
  'calibrateFromDay1.СИЛ': calibrateFromDay1(sampleProfile, sampleDay1)['СИЛ'],
  'calibrateGoals(mass).СИЛ': calibrateGoals(sampleStats, 'mass')['СИЛ'],
  'generateMissionsForDay(7)': generateMissionsForDay(7).length,
  'getChapterByDay(50)': getChapterByDay(50).display,
  'getInitialState()': String(getInitialState()),
}

console.log('smoke 3.2', { libProbes, iconsCount: Object.keys(Icons).length })

export default function App() {
  const [val, setVal] = useState('')
  return (
    <div style={{ padding: 24, fontFamily: F.body, color: C.text, fontSize: 13, lineHeight: 1.6, maxWidth: 720, margin: '0 auto' }}>
      <h1 style={{ fontFamily: F.display, color: C.pink, letterSpacing: '0.2em', marginBottom: 24 }}>
        ГИПЕР_ПРОТОКОЛ · smoke 3.2
      </h1>

      <SectionHeader sub="3.1 carry-over">lib values</SectionHeader>
      <pre style={{ background: C.bgCard, padding: 12, color: C.textDim, fontFamily: F.mono, fontSize: 11, margin: '0 22px 24px' }}>
        {Object.entries(libProbes).map(([k, v]) => `${k}: ${v}`).join('\n')}
      </pre>

      <SectionHeader sub={`${Object.keys(Icons).length} total`}>icons</SectionHeader>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, padding: '0 22px', marginBottom: 24, color: C.teal }}>
        {Object.entries(Icons).map(([name, IconComp]) => (
          <div key={name} title={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, fontFamily: F.mono, fontSize: 9, color: C.textFaint }}>
            <IconComp size={22} />
            {name}
          </div>
        ))}
      </div>

      <SectionHeader sub="interactive">primitives</SectionHeader>
      <div style={{ padding: '0 22px', display: 'grid', gap: 16 }}>
        <SectionLabel>▸ section label</SectionLabel>
        <FormField label="вес" unit="кг">
          <CompactInput type="number" value={val} onChange={setVal} placeholder="0" />
        </FormField>
        <FormField label="рост" unit="см" optional>
          <CompactInput type="number" value="" onChange={() => {}} placeholder="180" error />
        </FormField>
      </div>
    </div>
  )
}
