import { useState, useEffect, useMemo } from 'react';
import { C, F, smallAngleClip } from '../lib/tokens.js';
import { WORKOUT_TEMPLATES } from '../lib/missions.js';
import { ArrowLeft } from './icons.jsx';
import WorkoutInput from './inputs/WorkoutInput.jsx';
import CardioInput from './inputs/CardioInput.jsx';
import MetricInput from './inputs/MetricInput.jsx';
import MetricsInput from './inputs/MetricsInput.jsx';
import PhotoInput from './inputs/PhotoInput.jsx';
import CheckboxInput from './inputs/CheckboxInput.jsx';
import TextInput from './inputs/TextInput.jsx';
import BodyFatInput from './inputs/BodyFatInput.jsx';
import TimerInput from './inputs/TimerInput.jsx';

// `profile` was previously read via closure from the parent App (state?.profile).
// Now passed explicitly so the component is a real ES module — see TODO.md.
export default function MissionDetail({ mission, profile, onComplete, onAbort }) {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(mission.data || getDefaultData(mission));

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, []);

  const canComplete = useMemo(() => validateData(mission, data), [mission, data]);

  const handleComplete = () => {
    if (!canComplete) return;
    onComplete(data);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.bg,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      overflowY: 'auto',
      opacity: revealed ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      <div style={{
        width: '100%', maxWidth: 440,
        background: C.bgPanel,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        minHeight: '100dvh',
      }}>
        {/* Header */}
        <div style={{
          padding: 'calc(14px + env(safe-area-inset-top)) 18px 14px 18px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button onClick={onAbort} style={{
            background: 'transparent', border: `1px solid ${C.border}`,
            color: C.textDim, padding: '12px',
            cursor: 'pointer', clipPath: smallAngleClip,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 48, minHeight: 48,
          }}>
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase' }}>МИССИЯ [{mission.num}]</div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.text, letterSpacing: '0.04em', marginTop: 2, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mission.title || mission.code}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.pink }}>+{mission.xp}</span>
            <span style={{ fontFamily: F.display, fontSize: 11, color: C.textFaint, letterSpacing: '0.18em' }}>→{mission.stat}</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '20px 22px 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>▸ ОПИСАНИЕ</div>
          <div style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, letterSpacing: '0.01em', lineHeight: 1.6 }}>{mission.desc}</div>
        </div>

        {/* Input area */}
        <div style={{ flex: 1, padding: '24px 18px' }}>
          {mission.inputType === 'workout' && <WorkoutInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'cardio' && <CardioInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'metric' && <MetricInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'metrics' && <MetricsInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'photo' && <PhotoInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'checkbox' && <CheckboxInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'text' && <TextInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'bodyfat' && <BodyFatInput mission={mission} data={data} setData={setData} profile={profile} />}
          {mission.inputType === 'timer' && <TimerInput mission={mission} data={data} setData={setData} />}
        </div>

        {/* Bottom action */}
        <div style={{ padding: '16px 18px calc(16px + env(safe-area-inset-bottom))', borderTop: `1px solid ${C.border}`, background: C.bg }}>
          <button onClick={handleComplete} disabled={!canComplete} style={{
            width: '100%',
            background: canComplete ? C.pink : C.surface,
            color: canComplete ? C.bg : C.textFaint,
            border: 'none',
            padding: '18px',
            fontFamily: F.display,
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            clipPath: smallAngleClip,
            boxShadow: canComplete ? `0 0 20px ${C.pinkGlow}` : 'none',
            transition: 'all 0.3s',
            minHeight: 52,
          }}>
            {canComplete ? '▸ Миссия Завершена' : '◌ Заполни Все Поля'}
          </button>
        </div>
      </div>
    </div>
  );
}

const getDefaultData = (mission) => {
  switch (mission.inputType) {
    case 'workout':
      const exercises = WORKOUT_TEMPLATES[mission.code]?.exercises || ['Упражнение 1', 'Упражнение 2', 'Упражнение 3'];
      return {
        exercises: exercises.map(name => ({
          name,
          sets: [{ weight: '', reps: '' }, { weight: '', reps: '' }, { weight: '', reps: '' }],
        })),
      };
    case 'cardio':
      return { duration: '', distance: '', notes: '' };
    case 'metric':
    case 'timer':
      return { value: '' };
    case 'metrics':
      return { values: Object.fromEntries(mission.metrics.map(m => [m.key, ''])) };
    case 'photo':
      return { photos: Array(mission.photoCount).fill(null) };
    case 'checkbox':
      return { checked: false };
    case 'text':
      return { text: '' };
    case 'bodyfat':
      return { level: null, value: null };
    default:
      return {};
  }
};

const inRange = (val, range) => {
  if (!range) return true;
  const n = Number(val);
  if (!Number.isFinite(n)) return false;
  if (range.min !== undefined && n < range.min) return false;
  if (range.max !== undefined && n > range.max) return false;
  return true;
};

const validateData = (mission, data) => {
  switch (mission.inputType) {
    case 'workout':
      return data.exercises?.some(ex => ex.sets.some(s => s.weight && s.reps && Number(s.weight) > 0 && Number(s.reps) > 0));
    case 'cardio':
      return !!data.duration && Number(data.duration) > 0;
    case 'metric': {
      if (!data.value) return false;
      const n = Number(data.value);
      if (!Number.isFinite(n) || n < 0) return false;
      return inRange(n, mission.range);
    }
    case 'timer': {
      if (!data.value) return false;
      const n = Number(data.value);
      if (!Number.isFinite(n) || n < 0) return false;
      return inRange(n, mission.range);
    }
    case 'metrics':
      return mission.metrics.every(m => {
        const v = data.values[m.key];
        if (!v || Number(v) <= 0) return false;
        return inRange(v, m.range);
      });
    case 'photo':
      return data.photos.every(p => p !== null);
    case 'checkbox':
      return data.checked;
    case 'text':
      return data.text && data.text.trim().length >= 5;
    case 'bodyfat':
      return !!data.level && !!data.value;
    default:
      return false;
  }
};
