import { C, F, smallAngleClip } from '../../lib/tokens.js';
import SectionLabel from './SectionLabel.jsx';

export default function MetricInput({ mission, data, setData }) {
  const n = Number(data.value);
  const isNumber = data.value !== '' && Number.isFinite(n);
  const range = mission.range;
  let error = null;
  if (data.value && !isNumber) error = 'нужно число';
  else if (isNumber && range) {
    if (range.min !== undefined && n < range.min) error = `минимум ${range.min}`;
    else if (range.max !== undefined && n > range.max) error = `максимум ${range.max}`;
  }
  const ok = isNumber && !error;

  return (
    <div>
      <SectionLabel>▸ ВВОД ПОКАЗАТЕЛЯ</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${error ? C.danger : C.border}`, clipPath: smallAngleClip, padding: '24px 18px', transition: 'border-color 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{mission.metric}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
          <input
            type="number"
            inputMode="decimal"
            value={data.value}
            onChange={e => setData({ value: e.target.value })}
            placeholder="0"
            style={{
              fontFamily: F.display,
              fontSize: 64,
              fontWeight: 400,
              color: error ? C.danger : (ok ? C.pink : C.text),
              background: 'transparent',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              width: 180,
              padding: 0,
              textShadow: ok ? `0 0 18px ${C.pinkGlow}` : 'none',
            }}
          />
          <span style={{ fontFamily: F.display, fontSize: 22, color: C.textDim, letterSpacing: '0.16em' }}>{mission.unit}</span>
        </div>
        {range && (
          <div style={{ marginTop: 14, textAlign: 'center', fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            диапазон: {range.min} — {range.max} {mission.unit}
          </div>
        )}
        {error && (
          <div style={{ marginTop: 8, textAlign: 'center', fontFamily: F.mono, fontSize: 11, color: C.danger, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ! {error}
          </div>
        )}
      </div>
    </div>
  );
}
