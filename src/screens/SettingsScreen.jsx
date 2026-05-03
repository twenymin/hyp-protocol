import { C, F } from '../lib/tokens.js';

// Mirrors the inline 'cfg' block from the original game.js App — kept
// minimal placeholder text; will become a real screen in a follow-up.
export default function SettingsScreen() {
  return (
    <div style={{ padding: '60px 22px', textAlign: 'center' }}>
      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>module_offline</div>
      <div style={{ fontFamily: F.display, fontSize: 22, color: C.text, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Configuration</div>
      <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginTop: 12, lineHeight: 1.6 }}>В очереди.</div>
    </div>
  );
}
