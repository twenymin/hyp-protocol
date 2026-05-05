import { C, F, smallAngleClip } from '../../lib/tokens.js';
import { Check } from '../icons.jsx';
import SectionLabel from './SectionLabel.jsx';

export default function CheckboxInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ ПОДТВЕРДИ ДЕЙСТВИЕ</SectionLabel>
      <button
        onClick={() => setData({ checked: !data.checked })}
        style={{
          width: '100%',
          background: data.checked ? C.yellowSoft : C.bgCard,
          border: `1px solid ${data.checked ? C.yellow : C.border}`,
          clipPath: smallAngleClip,
          padding: '32px 18px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s',
          boxShadow: data.checked ? `0 0 20px ${C.yellowGlow}` : 'none',
        }}
      >
        <div style={{
          width: 56, height: 56,
          margin: '0 auto 14px',
          border: `2px solid ${data.checked ? C.yellow : C.border}`,
          background: data.checked ? C.yellow : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          clipPath: smallAngleClip,
          transition: 'all 0.3s',
        }}>
          {data.checked && <Check size={32} strokeWidth={3} color={C.bg} />}
        </div>
        <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {data.checked ? 'подтверждено' : 'нажми чтобы подтвердить'}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', marginTop: 8, textTransform: 'uppercase' }}>
          система чести · сам себе судья
        </div>
      </button>
    </div>
  );
}
