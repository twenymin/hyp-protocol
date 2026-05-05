import { useRef } from 'react';
import { C, F, smallAngleClip } from '../../lib/tokens.js';
import { Camera, Trash2 } from '../icons.jsx';
import SectionLabel from './SectionLabel.jsx';

export default function PhotoInput({ mission, data, setData }) {
  const fileRefs = useRef([]);

  const handleFile = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhotos = [...data.photos];
      newPhotos[idx] = e.target.result;
      setData({ photos: newPhotos });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (idx) => {
    const newPhotos = [...data.photos];
    newPhotos[idx] = null;
    setData({ photos: newPhotos });
  };

  return (
    <div>
      <SectionLabel>▸ ФОТО</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.photos.map((photo, idx) => (
          <div key={idx} style={{
            background: C.bgCard,
            border: `1px solid ${photo ? C.success : C.border}`,
            clipPath: smallAngleClip,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            minHeight: 90,
          }}>
            <div style={{
              width: 64, height: 64,
              background: C.surface,
              border: `1px solid ${C.border}`,
              clipPath: smallAngleClip,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              backgroundImage: photo ? `url(${photo})` : 'none',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}>
              {!photo && <Camera size={20} color={C.textFaint} strokeWidth={1.5} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.display, fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {mission.angles?.[idx] || `фото ${idx + 1}`}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: photo ? C.success : C.textFaint, letterSpacing: '0.18em', marginTop: 4, textTransform: 'uppercase' }}>
                {photo ? '✓ снято' : 'ожидает съёмки'}
              </div>
            </div>
            <input
              ref={el => fileRefs.current[idx] = el}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={e => handleFile(idx, e.target.files?.[0])}
              style={{ display: 'none' }}
            />
            {photo ? (
              <button onClick={() => removePhoto(idx)} style={{
                background: 'transparent', border: `1px solid ${C.border}`,
                color: C.danger, padding: '8px', cursor: 'pointer',
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Trash2 size={14} strokeWidth={1.8} />
              </button>
            ) : (
              <button onClick={() => fileRefs.current[idx]?.click()} style={{
                background: C.yellow, border: 'none',
                color: C.bg, padding: '8px 14px', cursor: 'pointer',
                fontFamily: F.display, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                clipPath: smallAngleClip,
              }}>
                capture
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>
        фото хранятся только на твоём телефоне
      </div>
    </div>
  );
}
