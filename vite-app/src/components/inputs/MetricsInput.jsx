import { C, F, smallAngleClip } from '../../lib/tokens.js';
import SectionLabel from './SectionLabel.jsx';
import CompactInput from './CompactInput.jsx';

export default function MetricsInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ ОБХВАТЫ ТЕЛА</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mission.metrics.map(m => {
            const val = data.values[m.key];
            const n = Number(val);
            let fieldError = null;
            if (val && !Number.isFinite(n)) fieldError = 'число';
            else if (val && m.range) {
              if (m.range.min !== undefined && n < m.range.min) fieldError = `мин ${m.range.min}`;
              else if (m.range.max !== undefined && n > m.range.max) fieldError = `макс ${m.range.max}`;
            }
            return (
              <div key={m.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  <span style={{ color: C.textDim }}>{m.label}</span>
                  <span style={{ color: C.textFaint }}>{m.unit}</span>
                </div>
                {m.hint && (
                  <div style={{ fontFamily: F.body, fontSize: 11, color: C.textFaint, marginBottom: 6, lineHeight: 1.4 }}>
                    {m.hint}
                  </div>
                )}
                <CompactInput
                  value={val}
                  onChange={v => setData({ ...data, values: { ...data.values, [m.key]: v } })}
                  type="number"
                  placeholder="0"
                  step="0.5"
                  error={!!fieldError}
                />
                {fieldError && (
                  <div style={{ marginTop: 4, fontFamily: F.mono, fontSize: 10, color: C.danger, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    ! {fieldError}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
