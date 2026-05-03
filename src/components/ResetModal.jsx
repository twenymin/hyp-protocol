import { C, F, smallAngleClip, angleClip } from '../lib/tokens.js';

// Lifted out of App in 3.7. The original game.js inlined this modal at
// the bottom of the App tree gated by `showResetConfirm`. Same markup;
// callers now pass onCancel/onConfirm explicitly.
export default function ResetModal({ onCancel, onConfirm }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: 380,
        background: C.bgCard,
        border: `1px solid ${C.danger}`,
        clipPath: angleClip,
        padding: '24px',
        boxShadow: `0 0 32px rgba(255, 77, 77, 0.4)`,
      }}>
        <div style={{ fontFamily: F.mono, fontSize: 9, color: C.danger, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
          ⚠ ▸ ВНИМАНИЕ
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
          Сбросить кампанию?
        </h2>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 24 }}>
          Все данные, фото, метрики, прогресс — будут стёрты. Это действие необратимо.
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onCancel} style={{
            flex: 1, background: C.surface,
            border: `1px solid ${C.border}`, color: C.text,
            padding: '16px', fontFamily: F.display, fontSize: 15, fontWeight: 400,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            cursor: 'pointer', clipPath: smallAngleClip,
            minHeight: 52,
          }}>отмена</button>
          <button onClick={onConfirm} style={{
            flex: 1, background: C.danger, border: 'none', color: '#fff',
            padding: '16px', fontFamily: F.display, fontSize: 15, fontWeight: 400,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            cursor: 'pointer', clipPath: smallAngleClip,
            boxShadow: `0 0 16px rgba(255, 71, 87, 0.5)`,
            minHeight: 52,
          }}>▸ сбросить</button>
        </div>
      </div>
    </div>
  );
}
