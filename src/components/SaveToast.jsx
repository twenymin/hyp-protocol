import { useState, useEffect, useRef } from 'react';
import { C, F, smallAngleClip } from '../lib/tokens.js';
import { subscribeSaveEvents, formatSaveTime } from '../lib/persistence.js';

// Subscribes to global save events and shows a non-intrusive bottom toast.
export default function SaveToast() {
  const [event, setEvent] = useState(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    const unsub = subscribeSaveEvents((ev) => {
      setEvent(ev);
      setVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      // Errors persist longer so user can read; success fades quickly
      const duration = ev.ok ? 1800 : 6000;
      hideTimerRef.current = setTimeout(() => setVisible(false), duration);
    });
    return () => {
      unsub();
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!event) return null;

  const isError = !event.ok;
  const accent = isError ? C.danger : C.success;
  const message = isError
    ? (event.reason === 'quota'
        ? '⚠ ХРАНИЛИЩЕ ПЕРЕПОЛНЕНО'
        : '⚠ НЕ УДАЛОСЬ СОХРАНИТЬ')
    : `✓ СОХРАНЕНО · ${formatSaveTime(event.savedAt)}`;
  const detail = isError
    ? (event.reason === 'quota'
        ? 'удали часть фото или экспортируй данные'
        : 'попробуй ещё раз через настройки')
    : null;

  return (
    <div style={{
      position: 'fixed',
      left: '50%',
      bottom: 'calc(96px + env(safe-area-inset-bottom))',
      transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, 16px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 250,
      maxWidth: 'calc(100vw - 36px)',
    }}>
      <div style={{
        background: C.bgCard,
        border: `1px solid ${accent}`,
        boxShadow: `0 0 18px ${accent}66, 0 8px 24px rgba(0,0,0,0.5)`,
        clipPath: smallAngleClip,
        padding: detail ? '12px 18px' : '10px 18px',
        display: 'flex', flexDirection: 'column', gap: 4,
        minWidth: 220, textAlign: 'center',
      }}>
        <div style={{
          fontFamily: F.mono, fontSize: 11, color: accent,
          letterSpacing: '0.18em', fontWeight: 600,
          textTransform: 'uppercase',
        }}>{message}</div>
        {detail && (
          <div style={{
            fontFamily: F.body, fontSize: 11, color: C.textDim,
            letterSpacing: '0.02em',
          }}>{detail}</div>
        )}
      </div>
    </div>
  );
}
