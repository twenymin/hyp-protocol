import { C, F, smallAngleClip } from '../../lib/tokens.js';
import SectionLabel from './SectionLabel.jsx';

export default function TextInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ РАЗМЫШЛЕНИЕ</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        {mission.prompt && (
          <div style={{
            fontFamily: F.body, fontSize: 13, color: C.cyan,
            fontStyle: 'italic',
            paddingBottom: 14, marginBottom: 14,
            borderBottom: `1px solid ${C.border}`,
            lineHeight: 1.6,
          }}>
            "{mission.prompt}"
          </div>
        )}
        <textarea
          value={data.text}
          onChange={e => setData({ text: e.target.value })}
          placeholder="напиши свой ответ..."
          rows={6}
          style={{
            width: '100%',
            background: 'transparent',
            border: `1px solid ${C.border}`,
            color: C.text,
            fontFamily: F.body,
            fontSize: 14,
            lineHeight: 1.6,
            padding: '12px',
            outline: 'none',
            resize: 'vertical',
            clipPath: smallAngleClip,
          }}
        />
        <div style={{ marginTop: 8, fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right' }}>
          {data.text.length} символов · мин. 5
        </div>
      </div>
    </div>
  );
}
