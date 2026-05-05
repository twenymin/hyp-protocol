import { useState, useEffect } from 'react';
import { C, F, smallAngleClip } from '../lib/tokens.js';
import { BOSS_DAYS, getChapterByDay } from '../lib/missions.js';
import SectionHeader from '../components/SectionHeader.jsx';

export default function StoryScreen({ state, currentDay }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 50); }, []);

  const days = Array.from({ length: 84 }, (_, i) => i + 1);

  return (
    <>
      <div style={{ padding: '20px 22px 0', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>─── overview</div>
        <h1 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 700, letterSpacing: '0.04em', marginTop: 8, lineHeight: 1, color: C.text, textTransform: 'uppercase' }}>The Path</h1>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginTop: 12 }}>84 дня кампании, 4 главы по 21 дню, 4 boss-fight на стыках.</p>
      </div>

      <div style={{ marginTop: 28 }}>
        <SectionHeader sub="84 days">▸ campaign_grid</SectionHeader>
      </div>

      <div style={{ padding: '0 18px', opacity: revealed ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {days.map(d => {
            const ch = getChapterByDay(d, state?.mode);
            const isBoss = BOSS_DAYS.includes(d);
            const isCurrent = d === currentDay;
            const isPast = d < currentDay;
            const dayData = state.daysData[String(d)];
            const completed = dayData?.completed;
            const partialDone = dayData?.missions?.some(m => m.done) && !completed;

            const chapterColors = [C.yellow, C.cyan, '#FF8C42', C.magenta];
            const chColor = chapterColors[ch.idx];

            let bg = C.surface, borderC = C.border, textC = C.textFaint;
            if (isCurrent) { bg = `${chColor}22`; borderC = chColor; textC = chColor; }
            else if (completed) { bg = `${C.success}22`; borderC = C.success; textC = C.success; }
            else if (partialDone) { bg = C.surfaceLight; borderC = C.borderBright; textC = C.textDim; }
            else if (isPast) { bg = C.bgCard; borderC = C.border; textC = C.textFaint; }
            if (isBoss && !isCurrent) { borderC = C.magenta; }

            return (
              <div key={d} style={{
                aspectRatio: '1', background: bg, border: `1px solid ${borderC}`,
                fontFamily: F.mono, fontSize: 10,
                fontWeight: isCurrent || isBoss ? 700 : 400, color: textC,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                clipPath: 'polygon(0 3px, 3px 0, calc(100% - 3px) 0, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 0 calc(100% - 3px))',
                boxShadow: isCurrent ? `0 0 8px ${chColor}66` : 'none',
              }}>
                {d}
                {isBoss && <div style={{ position: 'absolute', top: 1, right: 2, fontSize: 6, color: C.magenta, fontWeight: 700 }}>★</div>}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          {[
            { color: C.success, label: 'выполнено' },
            { color: C.pink, label: 'сегодня' },
            { color: C.borderBright, label: 'частично' },
            { color: C.pink, label: '★ испытание' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.textDim }}>
              <div style={{ width: 10, height: 10, background: `${l.color}33`, border: `1px solid ${l.color}` }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub="4 chapters">▸ chapter_breakdown</SectionHeader>
      </div>
      <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { num: 'I', name: 'Foundation', range: '1-21', desc: 'Building habits. Learning form. Soft volume.' },
          { num: 'II', name: 'Volume', range: '22-42', desc: 'Increasing sets. Calorie surplus. Recovery focus.' },
          { num: 'III', name: 'Intensity', range: '43-63', desc: 'Heavy weights. 5x5. Plateau-breakers.' },
          { num: 'IV', name: 'Consolidation', range: '64-84', desc: 'Peak performance. Final transformation.' },
        ].map((ch, i) => {
          const isCurrent = getChapterByDay(currentDay, state?.mode).idx === i;
          const isPast = getChapterByDay(currentDay, state?.mode).idx > i;
          return (
            <div key={ch.num} style={{
              background: isCurrent ? C.yellowSoft : C.bgCard,
              border: `1px solid ${isCurrent ? C.yellowBorder : C.border}`,
              clipPath: smallAngleClip,
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              opacity: isPast ? 0.5 : 1,
            }}>
              <div style={{
                fontFamily: F.display, fontSize: 22, fontWeight: 700,
                color: isCurrent ? C.yellow : (isPast ? C.success : C.textDim),
                width: 32, textAlign: 'center', flexShrink: 0,
              }}>{ch.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{ch.name}</div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.textDim, marginTop: 2 }}>{ch.desc}</div>
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.12em' }}>D{ch.range}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
