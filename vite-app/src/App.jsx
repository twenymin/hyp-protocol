// Smoke test for Stage 3.3 — switcher between all 9 input components
// with mock missions and per-component local state. Will be replaced
// by the real App in Stage 3.7.
import { useState } from 'react'
import { C, F } from './lib/tokens.js'
import SectionHeader from './components/SectionHeader.jsx'
import WorkoutInput from './components/inputs/WorkoutInput.jsx'
import CardioInput from './components/inputs/CardioInput.jsx'
import MetricInput from './components/inputs/MetricInput.jsx'
import MetricsInput from './components/inputs/MetricsInput.jsx'
import PhotoInput from './components/inputs/PhotoInput.jsx'
import CheckboxInput from './components/inputs/CheckboxInput.jsx'
import TextInput from './components/inputs/TextInput.jsx'
import BodyFatInput from './components/inputs/BodyFatInput.jsx'
import TimerInput from './components/inputs/TimerInput.jsx'

const MOCKS = {
  workout: {
    component: WorkoutInput,
    mission: {},
    initialData: { exercises: [
      { name: 'Жим лёжа', sets: [{ weight: '60', reps: '10' }, { weight: '', reps: '' }] },
      { name: 'Подтягивания', sets: [{ weight: '', reps: '8' }] },
    ] },
  },
  cardio: {
    component: CardioInput,
    mission: { target: { duration: 30, unit: 'мин' } },
    initialData: { duration: '', distance: '', notes: '' },
  },
  metric: {
    component: MetricInput,
    mission: { metric: 'вес', unit: 'кг', range: { min: 30, max: 250 } },
    initialData: { value: '' },
  },
  metrics: {
    component: MetricsInput,
    mission: { metrics: [
      { key: 'chest', label: 'грудь', unit: 'см', hint: 'на уровне сосков, на выдохе', range: { min: 60, max: 180 } },
      { key: 'waist', label: 'талия', unit: 'см', hint: 'на уровне пупка, не втягивая живот', range: { min: 50, max: 180 } },
    ] },
    initialData: { values: {} },
  },
  photo: {
    component: PhotoInput,
    mission: { angles: ['фронт', 'бок', 'спина'] },
    initialData: { photos: [null, null, null] },
  },
  checkbox: {
    component: CheckboxInput,
    mission: {},
    initialData: { checked: false },
  },
  text: {
    component: TextInput,
    mission: { prompt: 'Что ты узнал о себе за эти 21 день?' },
    initialData: { text: '' },
  },
  bodyfat: {
    component: BodyFatInput,
    mission: {},
    initialData: { level: null, value: null },
    extraProps: { profile: { gender: 'male' } },
  },
  timer: {
    component: TimerInput,
    mission: { metric: 'планка' },
    initialData: { value: '' },
  },
}

const TYPES = Object.keys(MOCKS)

function InputHarness({ type }) {
  const cfg = MOCKS[type]
  const Comp = cfg.component
  const [data, setData] = useState(cfg.initialData)
  const merged = (patch) => setData(prev => ({ ...prev, ...patch }))

  return (
    <Comp
      mission={cfg.mission}
      data={data}
      setData={typeof cfg.initialData === 'object' && !Array.isArray(cfg.initialData) ? merged : setData}
      {...(cfg.extraProps || {})}
    />
  )
}

export default function App() {
  const [active, setActive] = useState('workout')
  return (
    <div style={{ padding: '24px 0', fontFamily: F.body, color: C.text, fontSize: 13, lineHeight: 1.6, maxWidth: 720, margin: '0 auto', minHeight: '100vh' }}>
      <h1 style={{ fontFamily: F.display, color: C.pink, letterSpacing: '0.2em', padding: '0 22px', marginBottom: 24 }}>
        smoke 3.3 · input components
      </h1>

      <SectionHeader sub={`${TYPES.length} types`}>switch</SectionHeader>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 22px', marginBottom: 24 }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setActive(t)} style={{
            background: active === t ? C.pink : 'transparent',
            color: active === t ? C.bg : C.textDim,
            border: `1px solid ${active === t ? C.pink : C.border}`,
            padding: '6px 12px',
            fontFamily: F.mono, fontSize: 10,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            cursor: 'pointer',
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '0 22px' }}>
        <InputHarness key={active} type={active} />
      </div>
    </div>
  )
}
