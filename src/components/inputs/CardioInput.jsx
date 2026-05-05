import { C, F, smallAngleClip } from '../../lib/tokens.js';
import SectionLabel from './SectionLabel.jsx';
import FormField from './FormField.jsx';
import CompactInput from './CompactInput.jsx';

export default function CardioInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ ЖУРНАЛ КАРДИО</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        {mission.target && (
          <div style={{
            background: C.cyanSoft, border: `1px solid ${C.cyanBorder}`,
            padding: '8px 12px', marginBottom: 16,
            clipPath: smallAngleClip,
            fontFamily: F.mono, fontSize: 10, color: C.cyan, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            target · {mission.target.duration} {mission.target.unit}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FormField label="длительность" unit="мин">
            <CompactInput value={data.duration} onChange={v => setData({ ...data, duration: v })} type="number" placeholder="0" />
          </FormField>
          <FormField label="дистанция" unit="км" optional>
            <CompactInput value={data.distance} onChange={v => setData({ ...data, distance: v })} type="number" placeholder="—" step="0.1" />
          </FormField>
          <FormField label="заметки" optional>
            <CompactInput value={data.notes} onChange={v => setData({ ...data, notes: v })} type="text" placeholder="—" />
          </FormField>
        </div>
      </div>
    </div>
  );
}
