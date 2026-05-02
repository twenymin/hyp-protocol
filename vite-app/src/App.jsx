// Smoke test for Stage 3.1 — imports every new lib module to catch
// syntax errors, missing exports, or circular deps. Will be replaced
// by the real App in Stage 3.7.
import { C, F, angleClip } from './lib/tokens.js'
import { STAT_CODES, calcOVR, calcTier, calibrateFromDay1, determineCampaignMode, calibrateGoals, BODY_FAT_LEVELS } from './lib/calibration.js'
import { DAY_1_MISSIONS, BOSS_DAYS, generateMissionsForDay, getChapterByDay } from './lib/missions.js'
import { getInitialState, computeCurrentDay, formatSaveTime } from './lib/persistence.js'

const sampleStats = { 'СИЛ': 50, 'ВЫН': 45, 'МАС': 60, 'ПИТ': 25, 'ВОС': 50, 'ФОР': 55 }
const sampleProfile = { age: 30, gender: 'male', height: 180, weight: 80 }
const sampleDay1 = { weight: 80, bodyFat: 18, maxPushups: 25, plankSec: 90 }

const probes = {
  'tokens.js': { 'C.bg': C.bg, 'F.display': F.display.slice(0, 16), 'angleClip': angleClip.slice(0, 24) + '…' },
  'calibration.js': {
    STAT_CODES: STAT_CODES.join(','),
    'calcOVR(sample)': calcOVR(sampleStats),
    'calcTier(70)': calcTier(70).display,
    'calibrateFromDay1': JSON.stringify(calibrateFromDay1(sampleProfile, sampleDay1)),
    'determineCampaignMode': determineCampaignMode('male', 18),
    'calibrateGoals(mass)': JSON.stringify(calibrateGoals(sampleStats, 'mass')),
    'BODY_FAT_LEVELS.male.length': BODY_FAT_LEVELS.male.length,
  },
  'missions.js': {
    'DAY_1_MISSIONS.length': DAY_1_MISSIONS.length,
    'BOSS_DAYS': BOSS_DAYS.join(','),
    'generateMissionsForDay(1)': generateMissionsForDay(1).length,
    'generateMissionsForDay(7)': generateMissionsForDay(7).length,
    'generateMissionsForDay(21)': generateMissionsForDay(21).length,
    'getChapterByDay(50)': getChapterByDay(50).display,
  },
  'persistence.js': {
    'getInitialState()': String(getInitialState()),
    'computeCurrentDay(now)': computeCurrentDay(new Date().toISOString()),
    'formatSaveTime(now)': formatSaveTime(Date.now()),
  },
}

console.log('lib smoke', probes)

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: F.mono, color: C.text, fontSize: 12, lineHeight: 1.6 }}>
      <h1 style={{ fontFamily: F.display, color: C.pink, letterSpacing: '0.2em' }}>ГИПЕР_ПРОТОКОЛ · lib smoke</h1>
      {Object.entries(probes).map(([mod, vals]) => (
        <section key={mod} style={{ margin: '16px 0' }}>
          <h2 style={{ color: C.teal, fontSize: 14, letterSpacing: '0.15em' }}>{mod}</h2>
          <pre style={{ background: C.bgCard, padding: 12, overflow: 'auto', color: C.textDim }}>
            {Object.entries(vals).map(([k, v]) => `${k}: ${v}`).join('\n')}
          </pre>
        </section>
      ))}
    </div>
  )
}
