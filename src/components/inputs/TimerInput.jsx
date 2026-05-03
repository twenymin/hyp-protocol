import { useState, useEffect, useRef } from 'react';
import { C, F, smallAngleClip } from '../../lib/tokens.js';
import SectionLabel from './SectionLabel.jsx';

export default function TimerInput({ mission, data, setData }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(data.value ? Number(data.value) : 0);
  const startRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const sec = Math.floor((Date.now() - startRef.current) / 1000);
      setElapsed(sec);
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    startRef.current = Date.now() - elapsed * 1000;
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
    setData({ value: String(elapsed) });
  };

  const reset = () => {
    setRunning(false);
    setElapsed(0);
    setData({ value: '' });
  };

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  return (
    <div>
      <SectionLabel>▸ СЕКУНДОМЕР</SectionLabel>
      <div style={{
        background: C.bgCard, border: `1px solid ${running ? C.pink : C.border}`,
        clipPath: smallAngleClip, padding: '32px 18px',
        textAlign: 'center',
        boxShadow: running ? `0 0 20px ${C.pinkSoft}` : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
          {mission.metric || 'таймер'}
        </div>
        <div style={{
          fontFamily: F.mono, fontSize: 64, fontWeight: 700,
          color: running ? C.pink : C.text,
          textShadow: running ? `0 0 20px ${C.pinkGlow}` : 'none',
          letterSpacing: '0.04em', lineHeight: 1,
          marginBottom: 6,
        }}>
          {mm}:{ss}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 12, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24 }}>
          {elapsed} сек
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {!running && elapsed === 0 && (
            <button onClick={start} style={{
              background: C.pink, color: C.bg, border: 'none',
              padding: '14px 32px', cursor: 'pointer',
              fontFamily: F.display, fontSize: 16, fontWeight: 400,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              clipPath: smallAngleClip, minHeight: 48,
              boxShadow: `0 0 16px ${C.pinkGlow}`,
            }}>▸ Старт</button>
          )}
          {running && (
            <button onClick={stop} style={{
              background: C.danger, color: '#fff', border: 'none',
              padding: '14px 32px', cursor: 'pointer',
              fontFamily: F.display, fontSize: 16, fontWeight: 400,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              clipPath: smallAngleClip, minHeight: 48,
              boxShadow: `0 0 16px rgba(255, 71, 87, 0.55)`,
            }}>■ Стоп</button>
          )}
          {!running && elapsed > 0 && (
            <>
              <button onClick={start} style={{
                background: C.teal, color: C.bg, border: 'none',
                padding: '14px 24px', cursor: 'pointer',
                fontFamily: F.display, fontSize: 14, fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                clipPath: smallAngleClip, minHeight: 48,
              }}>▸ Продолжить</button>
              <button onClick={reset} style={{
                background: 'transparent', color: C.textDim,
                border: `1px solid ${C.border}`,
                padding: '14px 24px', cursor: 'pointer',
                fontFamily: F.display, fontSize: 14, fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                clipPath: smallAngleClip, minHeight: 48,
              }}>↻ Сброс</button>
            </>
          )}
        </div>
      </div>

      <div style={{
        marginTop: 12,
        fontFamily: F.mono, fontSize: 11, color: C.textFaint,
        letterSpacing: '0.12em', textAlign: 'center',
      }}>
        Останови таймер когда форма ломается
      </div>
    </div>
  );
}
