import { C, F } from '../../lib/tokens.js';

export default function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>
      {children}
    </div>
  );
}
