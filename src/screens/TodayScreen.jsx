import { useState, useEffect, useMemo } from 'react';
import { C, F, smallAngleClip, angleClip } from '../lib/tokens.js';
import { STAT_CODES, calcOVR, calcTier } from '../lib/calibration.js';
import { BOSS_DAYS, getChapterByDay } from '../lib/missions.js';
import { Check } from '../components/icons.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function TodayScreen({ state, currentDay, missions, onMissionClick }) {
  const [revealed, setRevealed] = useState(false);
  const [animXP, setAnimXP] = useState(0);

  const totalXP = missions.filter(m => m.done).reduce((s, m) => s + m.xp, 0);
  const totalPossible = missions.reduce((s, m) => s + m.xp, 0);
  const xpToNext = 200;
  const pct = Math.min(100, (totalXP / xpToNext) * 100);
  const completedCount = missions.filter(m => m.done).length;
  const chapter = getChapterByDay(currentDay, state?.mode);
  const isBossDay = BOSS_DAYS.includes(currentDay);

  const ovr = calcOVR(state.stats);
  const tier = calcTier(ovr);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (totalXP === animXP) return;
    const id = setTimeout(() => {
      const diff = totalXP - animXP;
      const step = Math.sign(diff) * Math.max(2, Math.abs(diff) / 8);
      const next = animXP + step;
      setAnimXP(Math.abs(totalXP - next) < Math.abs(step) ? totalXP : next);
    }, 16);
    return () => clearTimeout(id);
  }, [totalXP, animXP]);

  const briefingText = useMemo(() => {
    if (currentDay === 1) return 'День 1 — калибровочное испытание. 8 миссий: купить ленту, замеры тела, оценка процента жира, фото, тесты на отжимания и планку. После этого игра решит твой стартовый OVR и план — масса или рекомпозиция.';
    if (isBossDay) return `Конец главы ${chapter.romanNum}. Испытание-босс — переснимаем фото, перемеряем вес, тестируем рекорды.`;
    const dow = (currentDay - 1) % 7;
    if (dow === 0) return 'Понедельник. Старт недельного цикла. Сегодня основная тренировка — выложись по максимуму.';
    if (dow === 6) return 'Воскресенье. Лёгкое кардио и восстановление.';
    return `День ${currentDay}. Глава ${chapter.romanNum} — ${chapter.display}.`;
  }, [currentDay, chapter, isBossDay]);

  const heroTitle = useMemo(() => {
    if (currentDay === 1) return 'Калибровка';
    if (isBossDay) return `Босс · Гл. ${chapter.romanNum}`;
    const dow = (currentDay - 1) % 7;
    return ['Отдых', 'Жим', 'Тяга', 'Кардио', 'Ноги', 'Объём', 'Восстановление'][dow];
  }, [currentDay, chapter, isBossDay]);

  return (
    <>
      <div style={{
        padding: '18px',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(-12px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
      }}>
        <div style={{
          background: `linear-gradient(135deg, ${tier.color} 0%, ${tier.color}cc 50%, ${tier.color} 100%)`,
          padding: 1.5, clipPath: angleClip,
          boxShadow: `0 0 28px ${tier.glow}`,
          transition: 'all 0.5s',
        }}>
          <div style={{ background: C.bgCard, clipPath: angleClip, padding: '20px 22px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 14, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.25em', color: tier.color, textTransform: 'uppercase' }}>▸ КАРТА ГЕРОЯ</div>
            <div style={{ position: 'absolute', top: 8, right: 14, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.25em', color: C.textFaint, textTransform: 'uppercase' }}>{tier.display} ◂</div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 14, marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: F.display, fontSize: 72, fontWeight: 400, color: tier.color, lineHeight: 0.85, letterSpacing: '-0.02em', textShadow: `0 0 22px ${tier.glow}`, transition: 'all 0.4s' }}>{ovr === null ? '?' : ovr}</div>
                <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 400, color: tier.color, letterSpacing: '0.3em', marginTop: 2 }}>OVR</div>
                <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.text, letterSpacing: '0.18em', marginTop: 14 }}>{(state.profile?.name || 'герой').toUpperCase()}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textDim, letterSpacing: '0.15em', marginTop: 2, textTransform: 'uppercase' }}>гипертрофия</div>
              </div>
              <div style={{
                width: 82, height: 82,
                background: `radial-gradient(circle at 30% 30%, ${tier.color}33, transparent 70%), ${C.surface}`,
                border: `1px solid ${tier.color}55`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 42, fontWeight: 400,
                color: tier.color, textShadow: `0 0 14px ${tier.glow}`,
              }}>{(state.profile?.name || "Г").charAt(0).toUpperCase()}</div>
            </div>

            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${tier.color}55, transparent)`, marginBottom: 16 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 22px' }}>
              {STAT_CODES.map(code => {
                const value = state.stats?.[code];
                const isNull = value === undefined || value === null;
                return (
                  <div key={code} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: F.display, fontSize: 14, fontWeight: 400, color: C.textDim, letterSpacing: '0.18em', minWidth: 32 }}>{code}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: isNull ? C.textFaint : C.text }}>{isNull ? '—' : Math.round(value)}</span>
                    <div style={{ flex: 1, height: 2, background: C.surface, position: 'relative', overflow: 'hidden' }}>
                      {!isNull && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value}%`, background: value >= 60 ? C.gold : (value >= 40 ? C.teal : C.bronze), transition: 'width 0.6s' }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        padding: '0 22px',
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: isBossDay ? C.magenta : C.cyan, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ▸ chapter_{chapter.romanNum.toLowerCase()} :: {chapter.name}{isBossDay && ' :: BOSS'}
          </div>
          <div style={{ fontFamily: F.display, fontSize: 11, fontWeight: 600, color: C.yellow, letterSpacing: '0.18em' }}>
            DAY {String(currentDay).padStart(3, '0')} / 084
          </div>
        </div>
        <div style={{ height: 8, background: C.surface, border: `1px solid ${C.border}`, padding: 1, marginBottom: 8, clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: C.yellow, boxShadow: `0 0 8px ${C.yellowGlow}`, transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <span style={{ color: C.yellow }}>{Math.round(animXP)} / {totalPossible} xp today</span>
          <span style={{ color: C.textFaint }}>total: {state.totalXP.toLocaleString()}</span>
        </div>

        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>─── briefing</div>
          <h1 style={{ fontFamily: F.display, fontSize: 38, fontWeight: 700, letterSpacing: '0.04em', marginTop: 8, lineHeight: 1, color: isBossDay ? C.magenta : C.text, textTransform: 'uppercase', textShadow: isBossDay ? `0 0 18px ${C.magentaSoft}` : 'none' }}>{heroTitle}</h1>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginTop: 12, maxWidth: 340 }}>{briefingText}</p>
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub={`${missions.length} active · tap to log`}>▸ active missions</SectionHeader>
      </div>

      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {missions.map((m, i) => (
          <button key={m.id} onClick={() => onMissionClick(m.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
            background: m.done ? C.surface : (m.special ? C.yellowSoft : C.bgCard),
            border: `1px solid ${m.special && !m.done ? C.yellowBorder : C.border}`,
            cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateX(0)' : 'translateX(-8px)',
            transitionDelay: revealed ? `${0.45 + i * 0.06}s` : '0s',
            fontFamily: F.body, textAlign: 'left', color: 'inherit', outline: 'none',
            clipPath: smallAngleClip,
            boxShadow: m.special && !m.done ? `0 0 12px rgba(255, 214, 10, 0.18)` : 'none',
          }}>
            <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: m.done ? C.success : (m.special ? C.pink : C.textDim), letterSpacing: '0.06em', width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.done ? <Check size={18} strokeWidth={3} /> : `[${m.num}]`}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: m.done ? C.textFaint : C.text, letterSpacing: '0.02em', textDecoration: m.done ? 'line-through' : 'none', textTransform: 'uppercase' }}>{m.title || m.code}</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.textFaint, letterSpacing: '0.02em', marginTop: 3, lineHeight: 1.4 }}>{m.desc?.length > 60 ? m.desc.slice(0, 60) + '...' : m.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
              <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: m.done ? C.success : C.pink }}>+{m.xp}</span>
              <span style={{ fontFamily: F.display, fontSize: 10, color: C.textFaint, letterSpacing: '0.18em', fontWeight: 400 }}>→{m.stat}</span>
            </div>
          </button>
        ))}
      </div>

      <div style={{
        margin: '20px 18px 0', padding: 1.5,
        background: `linear-gradient(135deg, ${C.cyan} 0%, transparent 50%, ${C.cyan} 100%)`,
        clipPath: smallAngleClip,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.85s',
      }}>
        <div style={{ background: C.bgCard, clipPath: smallAngleClip, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.cyan, letterSpacing: '0.22em', textTransform: 'uppercase' }}>▸ daily_xp</div>
            <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 700, color: C.text, marginTop: 4 }}>
              {Math.round(animXP).toString().padStart(3, '0')} <span style={{ color: C.textFaint, fontSize: 14 }}>/ {totalPossible}</span>
            </div>
          </div>
          <div style={{ width: 1, height: 38, background: C.border }} />
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.cyan, letterSpacing: '0.22em', textTransform: 'uppercase' }}>▸ missions</div>
            <div style={{ fontFamily: F.display, fontSize: 24, fontWeight: 700, color: C.text, marginTop: 4 }}>
              {completedCount} <span style={{ color: C.textFaint, fontSize: 14 }}>/ {missions.length}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
