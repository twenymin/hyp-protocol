import { C, F, smallAngleClip } from '../lib/tokens.js';
import SectionHeader from '../components/SectionHeader.jsx';

// Stub — the original game.js shows the settings tab as a placeholder
// inside App. Real settings UI will arrive in a follow-up; for now we
// preserve the visual language so the bottom nav has a destination.
export default function SettingsScreen() {
  return (
    <>
      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>─── system</div>
        <h1 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 700, letterSpacing: '0.04em', marginTop: 8, lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>Настройки</h1>
      </div>

      <div style={{ marginTop: 28 }}>
        <SectionHeader sub="coming soon">▸ stub</SectionHeader>
      </div>

      <div style={{ padding: '0 18px' }}>
        <div style={{
          background: C.bgCard, border: `1px dashed ${C.border}`,
          clipPath: smallAngleClip, padding: '24px 18px',
          fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6,
          textAlign: 'center',
        }}>
          Раздел в разработке. После завершения миграции сюда переедут уведомления, экспорт прогресса, темы и язык.
        </div>
      </div>
    </>
  );
}
