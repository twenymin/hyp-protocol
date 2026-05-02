import { C, F, smallAngleClip } from '../../lib/tokens.js';
import { X, Plus } from '../icons.jsx';
import SectionLabel from './SectionLabel.jsx';
import CompactInput from './CompactInput.jsx';

export default function WorkoutInput({ mission, data, setData }) {
  const updateSet = (exIdx, setIdx, field, value) => {
    const newExercises = [...data.exercises];
    newExercises[exIdx].sets[setIdx][field] = value;
    setData({ ...data, exercises: newExercises });
  };
  const addSet = (exIdx) => {
    const newExercises = [...data.exercises];
    newExercises[exIdx].sets.push({ weight: '', reps: '' });
    setData({ ...data, exercises: newExercises });
  };
  const removeSet = (exIdx, setIdx) => {
    const newExercises = [...data.exercises];
    if (newExercises[exIdx].sets.length > 1) {
      newExercises[exIdx].sets.splice(setIdx, 1);
      setData({ ...data, exercises: newExercises });
    }
  };

  return (
    <div>
      <SectionLabel>▸ ЖУРНАЛ ТРЕНИРОВКИ</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.exercises.map((ex, exIdx) => (
          <div key={exIdx} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            clipPath: smallAngleClip, padding: '14px 16px',
          }}>
            <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 600, color: C.yellow, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              {String(exIdx + 1).padStart(2, '0')} · {ex.name}
            </div>
            {/* Set headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 8, marginBottom: 6, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <span>подх</span>
              <span>кг</span>
              <span>повт</span>
              <span></span>
            </div>
            {ex.sets.map((set, setIdx) => (
              <div key={setIdx} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textDim, fontWeight: 700 }}>{setIdx + 1}</span>
                <CompactInput value={set.weight} onChange={v => updateSet(exIdx, setIdx, 'weight', v)} type="number" placeholder="—" />
                <CompactInput value={set.reps} onChange={v => updateSet(exIdx, setIdx, 'reps', v)} type="number" placeholder="—" />
                <button onClick={() => removeSet(exIdx, setIdx)} style={{
                  background: 'transparent', border: 'none', color: C.textFaint,
                  cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <X size={12} strokeWidth={1.8} />
                </button>
              </div>
            ))}
            <button onClick={() => addSet(exIdx)} style={{
              marginTop: 6, width: '100%',
              background: 'transparent', border: `1px dashed ${C.border}`,
              color: C.textDim, padding: '6px',
              fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', clipPath: smallAngleClip,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              <Plus size={10} strokeWidth={1.8} /> добавить подход
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
