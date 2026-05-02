import { C, F } from '../../lib/tokens.js';

export default function FormField({ label, unit, optional, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span style={{ color: C.textDim }}>
          {label}{optional && <span style={{ color: C.textFaint }}> · опционально</span>}
        </span>
        {unit && <span style={{ color: C.textFaint }}>{unit}</span>}
      </div>
      {children}
    </div>
  );
}
