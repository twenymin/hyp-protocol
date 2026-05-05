import { useState, useEffect, Fragment } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from 'recharts';
import { C, F, smallAngleClip, angleClip } from '../lib/tokens.js';
import { STAT_CODES, STAT_LABELS, calcOVR, calcTier } from '../lib/calibration.js';
import { getChapterByDay } from '../lib/missions.js';
import { Lock, Trophy, Flame, Eye, Mail, Activity, Target, Shield, Zap, RotateCcw } from '../components/icons.jsx';
import SectionHeader from '../components/SectionHeader.jsx';

export default function AgentScreen({ state, currentDay, onReset }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 50); }, []);

  const ovr = calcOVR(state.stats);
  const tier = calcTier(ovr);
  const hasStats = state.stats !== null && state.stats !== undefined;
  const goals = state.goals || (hasStats ? Object.fromEntries(STAT_CODES.map(c => [c, state.stats[c] + 20])) : Object.fromEntries(STAT_CODES.map(c => [c, 60])));
  const radarData = STAT_CODES.map(code => ({ stat: code, current: hasStats ? state.stats[code] : 0, goal: goals[code] }));

  const completedDays = Object.values(state.daysData).filter(d => d.completed).length;
  const completionPct = Math.round((currentDay / 84) * 100 * 10) / 10;

  const achievements = [
    { code: 'FIRST_STEPS', Icon: Target, unlocked: state.totalXP > 0 },
    { code: 'WEEK_ONE', Icon: Flame, unlocked: currentDay >= 7 },
    { code: 'IRON_WILL', Icon: Shield, unlocked: completedDays >= 14 },
    { code: 'LETTER_READ', Icon: Mail, unlocked: state.daysData['1']?.missions?.find(m => m.code === 'LETTER_FROM_FUTURE')?.done },
    { code: 'BOSS_SLAYER', Icon: Trophy, unlocked: currentDay > 21 },
    { code: 'CHAPTER_DONE', Icon: Activity, unlocked: currentDay > 21 },
    { code: 'STREAK_30', Icon: Zap, unlocked: completedDays >= 30 },
    { code: 'INSIGHT', Icon: Eye, unlocked: state.totalXP > 5000 },
  ];
  const unlockedCount = achievements.filter(a => a.unlocked).length;

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
        }}>
          <div style={{ background: C.bgCard, clipPath: angleClip, padding: '20px 22px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 14, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.25em', color: tier.color, textTransform: 'uppercase' }}>▸ ГЕРОЙ · АКТИВЕН</div>
            <div style={{ position: 'absolute', top: 8, right: 14, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.25em', color: C.textFaint, textTransform: 'uppercase' }}>ID 0001 ◂</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16, marginBottom: 8 }}>
              <div style={{
                width: 96, height: 96,
                background: `radial-gradient(circle at 30% 30%, ${tier.color}33, transparent 70%), ${C.surface}`,
                border: `1px solid ${tier.color}55`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 50, fontWeight: 400,
                color: tier.color, textShadow: `0 0 18px ${tier.glow}`,
                flexShrink: 0,
              }}>{(state.profile?.name || "Г").charAt(0).toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: F.display, fontSize: 64, fontWeight: 400, color: tier.color, lineHeight: 0.85, letterSpacing: '-0.02em', textShadow: `0 0 18px ${tier.glow}` }}>{ovr === null ? '?' : ovr}</div>
                  <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 400, color: tier.color, letterSpacing: '0.3em' }}>OVR</div>
                </div>
                <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.text, letterSpacing: '0.1em', marginTop: 6 }}>{(state.profile?.name || 'ГЕРОЙ').toUpperCase()}</div>
                <div style={{ display: 'inline-block', marginTop: 8, fontFamily: F.mono, fontSize: 10, color: tier.color, letterSpacing: '0.18em', textTransform: 'uppercase', border: `1px solid ${tier.color}55`, padding: '4px 10px' }}>{tier.display}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionHeader sub="всё время">▸ ИСТОРИЯ ГЕРОЯ</SectionHeader>
      <div style={{ padding: '0 18px', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 0.25s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'ВСЕГО XP', value: state.totalXP.toString().padStart(6, '0'), color: C.pink },
            { label: 'ДЕНЬ ИЗ 84', value: String(currentDay).padStart(3, '0'), color: C.teal },
            { label: 'ВЫПОЛНЕНО', value: String(completedDays).padStart(3, '0'), color: C.success },
            { label: 'ДОСТИЖЕНИЯ', value: `${unlockedCount}/8`, color: C.text },
          ].map(s => (
            <div key={s.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '14px 16px' }}>
              <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontFamily: F.display, fontSize: 26, fontWeight: 400, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub="6 характеристик · текущее → цель">▸ ХАРАКТЕРИСТИКИ</SectionHeader>
      </div>
      <div style={{ margin: '0 18px', background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '4px 4px 16px', opacity: revealed ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 35, bottom: 10, left: 35 }}>
              <PolarGrid stroke={C.border} strokeWidth={0.5} gridType="polygon" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: C.pink, fontFamily: F.display, fontSize: 13, fontWeight: 400, letterSpacing: 2 }} />
              <Radar name="цель" dataKey="goal" stroke={C.teal} fill={C.teal} fillOpacity={0.04} strokeWidth={1} strokeDasharray="3 3" />
              <Radar name="сейчас" dataKey="current" stroke={C.pink} fill={C.pink} fillOpacity={0.22} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 2, background: C.yellow, boxShadow: `0 0 4px ${C.yellowGlow}` }} />
            <span style={{ color: C.pink }}>сейчас</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 2, background: 'transparent', borderTop: `1.5px dashed ${C.cyan}` }} />
            <span style={{ color: C.cyan }}>goal</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '16px 18px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {STAT_CODES.map((code, i) => {
          const value = state.stats[code];
          const goal = goals[code];
          return (
            <div key={code} style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateX(0)' : 'translateX(-8px)',
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.55 + i * 0.05}s`,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: F.display, fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: '0.18em', minWidth: 32 }}>{code}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase', flex: 1 }}>{STAT_LABELS[code]}</span>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.text }}>
                  <span style={{ color: C.yellow, fontWeight: 700 }}>{Math.round(value)}</span>
                  <span style={{ color: C.textFaint }}> → </span>
                  <span style={{ color: C.cyan }}>{goal}</span>
                </span>
              </div>
              <div style={{ height: 5, background: C.surface, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: `${goal}%`, top: 0, bottom: 0, width: 1, background: C.cyan, boxShadow: `0 0 4px ${C.cyan}` }} />
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value}%`, background: C.yellow, boxShadow: `0 0 6px ${C.yellowGlow}`, transition: 'width 0.6s' }} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub="1 active">▸ active_campaign</SectionHeader>
      </div>
      <div style={{ margin: '0 18px', background: C.bgCard, border: `1px solid ${C.yellowBorder}`, clipPath: smallAngleClip, padding: '16px 18px', position: 'relative', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 0.7s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: '0.06em' }}>HYPERTROPHY_v1</div>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', marginTop: 4, textTransform: 'uppercase' }}>chapter {getChapterByDay(currentDay, state?.mode).romanNum.toLowerCase()} :: {getChapterByDay(currentDay, state?.mode).name}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: F.mono, fontSize: 9, color: C.success, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success }} />
            в процессе
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          {['I', 'II', 'III', 'IV'].map((ch, i) => {
            const isCurrent = getChapterByDay(currentDay, state?.mode).idx === i;
            const isPast = getChapterByDay(currentDay, state?.mode).idx > i;
            return (
              <Fragment key={ch}>
                <div style={{
                  fontFamily: F.display, fontSize: 10, fontWeight: 700,
                  color: isCurrent ? C.yellow : (isPast ? C.success : C.textFaint),
                  width: 22, height: 22,
                  border: `1px solid ${isCurrent ? C.yellow : (isPast ? C.success : C.border)}`,
                  background: isCurrent ? C.yellowSoft : (isPast ? 'rgba(0, 229, 160, 0.1)' : 'transparent'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  clipPath: 'polygon(0 4px, 4px 0, calc(100% - 4px) 0, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 0 calc(100% - 4px))',
                  boxShadow: isCurrent ? `0 0 8px ${C.yellowGlow}` : 'none',
                  flexShrink: 0,
                }}>{ch}</div>
                {i < 3 && <div style={{ flex: 1, height: 1, background: C.border }} />}
              </Fragment>
            );
          })}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
          <span style={{ color: C.yellow }}>day {String(currentDay).padStart(3, '0')} / 084</span>
          <span style={{ color: C.textFaint }}>{completionPct}% complete</span>
        </div>

        <div style={{ height: 4, background: C.surface, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${completionPct}%`, background: C.yellow, boxShadow: `0 0 6px ${C.yellowGlow}`, transition: 'width 0.7s' }} />
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub={`${unlockedCount} / 8 unlocked`}>▸ achievements</SectionHeader>
      </div>
      <div style={{ padding: '0 18px', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {achievements.map((a) => (
            <div key={a.code} style={{
              aspectRatio: '1',
              background: a.unlocked ? C.yellowSoft : C.bgCard,
              border: `1px solid ${a.unlocked ? C.yellowBorder : C.border}`,
              clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 4,
              boxShadow: a.unlocked ? `0 0 8px rgba(255, 214, 10, 0.2)` : 'none',
            }}>
              {a.unlocked ? <a.Icon size={20} color={C.yellow} strokeWidth={1.8} /> : <Lock size={16} color={C.textFaint} strokeWidth={1.5} />}
              <div style={{ fontFamily: F.mono, fontSize: 7, color: a.unlocked ? C.yellow : C.textFaint, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 5, textAlign: 'center', lineHeight: 1.1 }}>
                {a.code.length > 10 ? a.code.slice(0, 10) : a.code}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '32px 18px 0' }}>
        <button onClick={onReset} style={{
          width: '100%', background: 'transparent',
          border: `1px dashed ${C.border}`, color: C.textFaint,
          padding: '12px',
          fontFamily: F.mono, fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          cursor: 'pointer', clipPath: smallAngleClip,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <RotateCcw size={12} strokeWidth={1.5} />
          dev · reset campaign
        </button>
      </div>
    </>
  );
}
