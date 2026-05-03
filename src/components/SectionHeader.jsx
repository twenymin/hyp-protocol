import { C, F } from '../lib/tokens.js';

export default function SectionHeader({ children, sub }) {
  return (
    <div style={{ padding: '0 22px', marginBottom: 12, marginTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: F.display, fontSize: 11, fontWeight: 600, color: C.text, letterSpacing: '0.28em', textTransform: 'uppercase' }}>{children}</div>
        <div style={{ flex: 1, height: 1, background: C.border }} />
        {sub && <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{sub}</div>}
      </div>
    </div>
  );
}
