import { C, F, smallAngleClip } from '../../lib/tokens.js';
import { BODY_FAT_LEVELS } from '../../lib/calibration.js';
import BodyFatSilhouette from '../BodyFatSilhouette.jsx';
import SectionLabel from './SectionLabel.jsx';

// Renders 6 silhouettes with body fat estimates. User picks closest match.
export default function BodyFatInput({ mission, data, setData, profile }) {
  const gender = profile?.gender || 'male';
  const levels = BODY_FAT_LEVELS[gender] || BODY_FAT_LEVELS.male;

  return (
    <div>
      <SectionLabel>▸ ОЦЕНКА ПРОЦЕНТА ЖИРА</SectionLabel>
      <div style={{
        background: C.bgCard, border: `1px solid ${C.border}`,
        clipPath: smallAngleClip, padding: '14px',
        marginBottom: 12,
        fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.5,
      }}>
        Посмотри в зеркало без одежды или в обтягивающей одежде. Выбери силуэт, который больше всего похож на твою текущую форму.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {levels.map(lvl => {
          const selected = data.level === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setData({ level: lvl.id, value: lvl.value })}
              style={{
                background: selected ? `${C.pink}15` : C.bgCard,
                border: `1px solid ${selected ? C.pink : C.border}`,
                clipPath: smallAngleClip, padding: '12px 10px 14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selected ? `0 0 14px ${C.pinkSoft}` : 'none',
                color: 'inherit', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                minHeight: 180,
              }}
            >
              <BodyFatSilhouette level={lvl.id} gender={gender} selected={selected} />
              <div>
                <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: selected ? C.pink : C.text, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {lvl.label}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: selected ? C.pink : C.textFaint, marginTop: 4, letterSpacing: '0.1em' }}>
                  {lvl.range}
                </div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.textFaint, marginTop: 6, lineHeight: 1.4 }}>
                  {lvl.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
