import { C, F } from '../../lib/tokens.js';

export default function CompactInput({ value, onChange, type = 'text', placeholder, step, error }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      step={step}
      inputMode={type === 'number' ? 'decimal' : undefined}
      style={{
        background: C.surface,
        border: `1px solid ${error ? C.danger : C.border}`,
        color: C.text,
        fontFamily: F.mono,
        fontSize: 16,
        fontWeight: 500,
        padding: '12px 14px',
        outline: 'none',
        width: '100%',
        textAlign: 'center',
        minWidth: 0,
        minHeight: 48,
      }}
      onFocus={e => e.target.style.borderColor = error ? C.danger : C.pink}
      onBlur={e => e.target.style.borderColor = error ? C.danger : C.border}
    />
  );
}
