// 5-step onboarding: hero → class → bio → briefing → letter.
// All sub-steps live in this file because they only ever appear inside
// OnboardingFlow and share its visual language. Splitting them out
// would inflate the import surface without making the structure any
// easier to follow.
import { useState, useEffect, useMemo } from 'react';
import { C, F, smallAngleClip, angleClip } from '../lib/tokens.js';
import { saveState } from '../lib/persistence.js';
import { Lock, Check } from '../components/icons.jsx';

// VALIDATION HELPERS
const VALID = {
  name: (v) => {
    const t = (v || '').trim();
    if (t.length < 2 || t.length > 16) return 'имя 2-16 символов';
    if (!/^[a-zA-Zа-яА-ЯёЁ0-9\s\-]+$/.test(t)) return 'только буквы, цифры, пробел, дефис';
    return null;
  },
  age: (v) => {
    const n = Number(v);
    if (!Number.isFinite(n) || !Number.isInteger(n)) return 'целое число';
    if (n < 13) return 'минимум 13 лет';
    if (n > 90) return 'максимум 90 лет';
    return null;
  },
  height: (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return 'число';
    if (n < 120) return 'минимум 120 см';
    if (n > 220) return 'максимум 220 см';
    return null;
  },
  weight: (v) => {
    const n = Number(v);
    if (!Number.isFinite(n)) return 'число';
    if (n < 30) return 'минимум 30 кг';
    if (n > 250) return 'максимум 250 кг';
    return null;
  },
};

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '', classCode: 'HYP',
    age: '', gender: '', height: '', weight: '',
  });

  const updateProfile = (patch) => setProfile(p => ({ ...p, ...patch }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const handleComplete = () => {
    const fullState = {
      startDate: new Date().toISOString(),
      stats: null,  // null until Day 1 calibration completes
      goals: null,
      mode: null,   // 'mass' or 'recomp', set after Day 1
      profile: {
        name: profile.name.trim(),
        classCode: profile.classCode,
        age: Number(profile.age),
        gender: profile.gender,
        height: Number(profile.height),
        weight: Number(profile.weight),
      },
      daysData: {}, totalXP: 0,
    };
    saveState(fullState);
    onComplete(fullState);
  };

  return (
    <div style={{
      minHeight: '100vh', minHeight: '100dvh', background: C.bg,
      backgroundImage: `linear-gradient(rgba(255,46,99,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.025) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      color: C.text, fontFamily: F.body,
      display: 'flex', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      <div key={step} style={{
        position: 'absolute', left: 0, right: 0,
        height: 2, background: `linear-gradient(to bottom, transparent, ${C.pink}, transparent)`,
        animation: 'scan 1.4s ease-out 1', opacity: 0.6,
        pointerEvents: 'none', zIndex: 100,
      }} />
      <div style={{
        width: '100%', maxWidth: 440, minHeight: '100vh', minHeight: '100dvh',
        background: C.bgPanel, display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        <div style={{
          padding: '16px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success, animation: 'blink 2s infinite' }} />
            <span style={{ color: C.success }}>на связи</span>
          </div>
          <div style={{ color: C.textFaint }}>создание героя</div>
          <div style={{ color: C.pink }}>{String(step + 1).padStart(2, '0')} / 05</div>
        </div>

        <div style={{ padding: '0 18px', display: 'flex', gap: 4, marginBottom: 8 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              flex: 1, height: 2,
              background: i <= step ? C.pink : C.surface,
              boxShadow: i === step ? `0 0 6px ${C.pinkGlow}` : 'none',
              transition: 'all 0.4s',
            }} />
          ))}
        </div>

        <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {step === 0 && <StepHero onNext={next} />}
          {step === 1 && <StepClass profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} />}
          {step === 2 && <StepBio profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} />}
          {step === 3 && <StepBriefing profile={profile} onNext={next} onBack={back} />}
          {step === 4 && <StepLetter profile={profile} onComplete={handleComplete} onBack={back} />}
        </div>
      </div>
    </div>
  );
}

function OnbHeader({ subtitle, title, accent }) {
  const c = accent || C.pink;
  return (
    <div style={{ padding: '32px 22px 0' }}>
      <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>─── {subtitle}</div>
      <h1 style={{
        fontFamily: F.display, fontSize: 44, fontWeight: 400, letterSpacing: '0.02em',
        marginTop: 10, lineHeight: 0.95, color: c, textTransform: 'uppercase',
        textShadow: `0 0 20px ${c}aa`,
      }}>{title}</h1>
    </div>
  );
}

function OnbFooter({ onNext, onBack, nextLabel = '▸ продолжить', nextDisabled = false }) {
  return (
    <div style={{
      padding: '20px 18px',
      paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
      borderTop: `1px solid ${C.border}`, background: C.bg, display: 'flex', gap: 8,
    }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'transparent', border: `1px solid ${C.border}`,
          color: C.textDim, padding: '14px 18px',
          fontFamily: F.display, fontSize: 14, fontWeight: 400,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          cursor: 'pointer', clipPath: smallAngleClip,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 48, minWidth: 48,
        }}>← НАЗАД</button>
      )}
      <button onClick={onNext} disabled={nextDisabled} style={{
        flex: 1,
        background: nextDisabled ? C.surface : C.pink,
        color: nextDisabled ? C.textFaint : C.bg,
        border: 'none', padding: '14px',
        fontFamily: F.display, fontSize: 16, fontWeight: 400,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        cursor: nextDisabled ? 'not-allowed' : 'pointer',
        clipPath: smallAngleClip,
        boxShadow: nextDisabled ? 'none' : `0 0 18px ${C.pinkGlow}`,
        transition: 'all 0.3s', minHeight: 48,
      }}>{nextLabel}</button>
    </div>
  );
}

function StepHero({ onNext }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 100); }, []);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 22px', textAlign: 'center' }}>
      <div style={{ flex: 1 }} />
      <div style={{
        fontFamily: F.mono, fontSize: 11, color: C.textFaint,
        letterSpacing: '0.4em', textTransform: 'uppercase',
        opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease', marginBottom: 24,
      }}>добро пожаловать</div>
      <h1 style={{
        fontFamily: F.display, fontSize: 60, fontWeight: 400,
        color: C.pink, letterSpacing: '0.02em',
        textShadow: `0 0 32px ${C.pinkGlow}`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        margin: 0, lineHeight: 0.9,
      }}>ГИПЕР<br/>ПРОТОКОЛ</h1>
      <div style={{
        fontFamily: F.mono, fontSize: 11, color: C.teal,
        letterSpacing: '0.4em', textTransform: 'uppercase',
        marginTop: 18,
        opacity: revealed ? 1 : 0, transition: 'opacity 0.8s ease 0.5s',
      }}>v1 · издание гипертрофии</div>
      <div style={{
        marginTop: 56,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
        maxWidth: 320,
      }}>
        <div style={{ fontFamily: F.display, fontSize: 28, color: C.text, letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: 18 }}>
          Твоя жизнь.<br/>
          <span style={{ color: C.pink, textShadow: `0 0 14px ${C.pinkGlow}` }}>Сыграна.</span>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>
          84 дня. Один путь. От бронзы до золота.<br/>
          Это не трекер. Это игра.
        </p>
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onNext} style={{
        background: C.pink, color: C.bg, border: 'none',
        padding: '18px 48px', cursor: 'pointer',
        fontFamily: F.display, fontSize: 18, fontWeight: 400,
        letterSpacing: '0.24em', textTransform: 'uppercase',
        clipPath: smallAngleClip,
        boxShadow: `0 0 32px ${C.pinkGlow}`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s',
        minHeight: 52,
      }}>▸ Начать</button>
      <div style={{ height: 32 }} />
    </div>
  );
}

function StepClass({ profile, updateProfile, onNext, onBack }) {
  const classes = [
    { code: 'HYP', name: 'Гипертрофия', desc: 'мышцы · сила · форма', locked: false, color: C.pink },
    { code: 'CDE', name: 'Код', desc: 'разработка · 84 дня до релиза', locked: true, color: C.teal },
    { code: 'MUS', name: 'Музыка', desc: 'игра на инструменте', locked: true, color: C.gold },
    { code: 'LNG', name: 'Язык', desc: 'свободно за 84 дня', locked: true, color: C.success },
  ];

  return (
    <>
      <OnbHeader subtitle="шаг 01 · класс" title="Выбери Путь" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        Каждый класс — отдельная 84-дневная игра. Сейчас доступна только Гипертрофия. Остальные откроются позже.
      </p>
      <div style={{ padding: '28px 18px 0', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {classes.map(c => {
          const selected = profile.classCode === c.code;
          return (
            <button key={c.code} onClick={() => !c.locked && updateProfile({ classCode: c.code })} disabled={c.locked} style={{
              background: selected ? `${c.color}15` : C.bgCard,
              border: `1px solid ${selected ? c.color : C.border}`,
              clipPath: smallAngleClip, padding: '18px',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: c.locked ? 'not-allowed' : 'pointer',
              opacity: c.locked ? 0.45 : 1,
              transition: 'all 0.3s', textAlign: 'left',
              boxShadow: selected ? `0 0 14px ${c.color}55` : 'none',
              color: 'inherit', minHeight: 72,
            }}>
              <div style={{
                width: 56, height: 56,
                background: selected ? `${c.color}22` : C.surface,
                border: `1px solid ${selected ? c.color : C.border}`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 22, fontWeight: 400,
                color: c.locked ? C.textFaint : c.color, flexShrink: 0,
              }}>{c.locked ? <Lock size={20} strokeWidth={1.6} /> : c.code}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: F.display, fontSize: 20, fontWeight: 400, color: C.text, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{c.name}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.textFaint, marginTop: 4 }}>{c.desc}</div>
              </div>
              {selected && (
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={14} strokeWidth={3} color={C.bg} />
                </div>
              )}
            </button>
          );
        })}
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextDisabled={!profile.classCode} />
    </>
  );
}

function ValidatedField({ label, hint, unit, value, onChange, validator, type = 'text', placeholder, maxLength }) {
  const [touched, setTouched] = useState(false);
  const error = touched && value ? validator(value) : null;
  const ok = value && !validator(value);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span style={{ color: C.textDim }}>{label}{hint && <span style={{ color: C.textFaint }}> · {hint}</span>}</span>
        {unit && <span style={{ color: C.textFaint }}>{unit}</span>}
      </div>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeholder} maxLength={maxLength}
        inputMode={type === 'number' ? 'numeric' : undefined}
        style={{
          background: C.surface, border: `1px solid ${error ? C.danger : ok ? C.teal : C.border}`,
          color: C.text, fontFamily: F.mono, fontSize: 16, fontWeight: 500,
          padding: '12px 14px', outline: 'none', width: '100%', textAlign: 'center',
          minHeight: 48,
        }}
        onFocus={e => { e.target.style.borderColor = error ? C.danger : C.pink; }}
      />
      {error && (
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.danger, marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ! {error}
        </div>
      )}
    </div>
  );
}

function StepBio({ profile, updateProfile, onNext, onBack }) {
  const errors = {
    name: VALID.name(profile.name),
    age: VALID.age(profile.age),
    height: VALID.height(profile.height),
    weight: VALID.weight(profile.weight),
  };
  const valid = !errors.name && !errors.age && !errors.height && !errors.weight && profile.gender;

  return (
    <>
      <OnbHeader subtitle="шаг 02 · анкета" title="Данные Героя" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        Хранятся только на твоём телефоне. Не отправляются никуда. Используются для расчёта стартовых параметров.
      </p>
      <div style={{ padding: '28px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ValidatedField
          label="имя" hint="как тебя называть"
          value={profile.name}
          onChange={v => updateProfile({ name: v })}
          validator={VALID.name}
          type="text" placeholder="напр. МАКС" maxLength={16}
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ValidatedField
            label="возраст" unit="лет"
            value={profile.age}
            onChange={v => updateProfile({ age: v })}
            validator={VALID.age}
            type="number" placeholder="—"
          />
          <div>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textDim, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>пол</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[
                { id: 'male', label: 'М' },
                { id: 'female', label: 'Ж' },
                { id: 'nb', label: 'NB' },
              ].map(g => (
                <button key={g.id} onClick={() => updateProfile({ gender: g.id })} style={{
                  flex: 1,
                  background: profile.gender === g.id ? C.pink : C.surface,
                  border: `1px solid ${profile.gender === g.id ? C.pink : C.border}`,
                  color: profile.gender === g.id ? C.bg : C.text,
                  fontFamily: F.display, fontSize: 16, fontWeight: 400,
                  letterSpacing: '0.18em', padding: '12px 0',
                  cursor: 'pointer', clipPath: smallAngleClip, transition: 'all 0.3s',
                  minHeight: 48,
                }}>{g.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <ValidatedField
            label="рост" unit="см"
            value={profile.height}
            onChange={v => updateProfile({ height: v })}
            validator={VALID.height}
            type="number" placeholder="—"
          />
          <ValidatedField
            label="вес" unit="кг"
            value={profile.weight}
            onChange={v => updateProfile({ weight: v })}
            validator={VALID.weight}
            type="number" placeholder="—"
          />
        </div>
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </>
  );
}

function StepBriefing({ profile, onNext, onBack }) {
  return (
    <>
      <OnbHeader subtitle="шаг 03 · брифинг" title="Что Дальше" accent={C.teal} />
      <div style={{ padding: '24px 22px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.text, lineHeight: 1.7 }}>
          {profile.name}, добро пожаловать в первую главу.
        </p>
        <div style={{ background: C.bgCard, border: `1px solid ${C.tealBorder}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.teal, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>▸ День 1 · Калибровочное Испытание</div>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, margin: 0 }}>
            Прежде чем игра начнётся всерьёз, нужно понять, кто ты сейчас. День 1 — единственный в своём роде. 8 миссий: купить ленту-сантиметр, замерить тело, оценить процент жира, сделать фото, сдать тесты на отжимания и планку.
          </p>
          <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, margin: '12px 0 0' }}>
            После этого игра рассчитает твой стартовый OVR и решит — нужен тебе план набора массы или рекомпозиции (одновременно жечь жир и растить мышцы).
          </p>
        </div>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textDim, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 10 }}>▸ Что тебе понадобится</div>
          <ul style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.7, margin: 0, paddingLeft: 20 }}>
            <li>Сантиметровая лента (швейная, 150 см)</li>
            <li>Весы напольные</li>
            <li>5-10 минут утром</li>
            <li>Место где можно отжаться и сделать планку</li>
          </ul>
        </div>
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextLabel="▸ принимаю вызов" />
    </>
  );
}

function StepLetter({ profile, onComplete, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const [typedLines, setTypedLines] = useState(0);

  const lines = useMemo(() => [
    `Прошло 84 дня. Я смотрю на тебя из будущего.`,
    ``,
    `Я не знаю пока, какие у меня будут цифры —`,
    `это решат твои тесты в Дне 1.`,
    ``,
    `Но я знаю одно.`,
    `Я не сорвался, потому что ты не сорвался.`,
    `Я не сдался, потому что ты не сдался.`,
    ``,
    `${profile.name}, начни.`,
  ], [profile.name]);

  useEffect(() => { setTimeout(() => setRevealed(true), 200); }, []);
  useEffect(() => {
    if (!revealed) return;
    if (typedLines >= lines.length) return;
    const t = setTimeout(() => setTypedLines(n => n + 1), 600);
    return () => clearTimeout(t);
  }, [revealed, typedLines, lines.length]);

  const allTyped = typedLines >= lines.length;

  return (
    <>
      <OnbHeader subtitle="шаг 05 · письмо" title="От Тебя · Тебе" accent={C.teal} />
      <div style={{ padding: '32px 22px 0', flex: 1 }}>
        <div style={{
          background: '#000', border: `1px solid ${C.tealBorder}`,
          clipPath: angleClip, padding: '28px 24px', minHeight: 320,
          boxShadow: `0 0 28px rgba(0, 217, 192, 0.15)`,
        }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.teal, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 18, opacity: revealed ? 1 : 0, transition: 'opacity 0.5s' }}>
            ▸ входящее · от тебя из будущего · 84д
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: F.body, fontSize: 15, color: C.text, lineHeight: 1.7,
              opacity: i < typedLines ? 1 : 0,
              transform: i < typedLines ? 'translateY(0)' : 'translateY(4px)',
              transition: 'all 0.5s ease',
              minHeight: line === '' ? 8 : 'auto',
              fontStyle: line === '' ? 'normal' : 'italic',
              letterSpacing: '0.01em',
            }}>{line || ' '}</div>
          ))}
          {!allTyped && (
            <div style={{
              display: 'inline-block', width: 8, height: 18,
              background: C.teal, marginTop: 4,
              animation: 'blink 0.8s infinite',
            }} />
          )}
        </div>
      </div>
      <div style={{
        padding: '20px 18px',
        paddingBottom: 'calc(20px + env(safe-area-inset-bottom))',
        borderTop: `1px solid ${C.border}`, background: C.bg, display: 'flex', gap: 8,
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: `1px solid ${C.border}`,
          color: C.textDim, padding: '14px 18px',
          fontFamily: F.display, fontSize: 14, fontWeight: 400,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          cursor: 'pointer', clipPath: smallAngleClip,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          minHeight: 48,
        }}>← НАЗАД</button>
        <button onClick={onComplete} disabled={!allTyped} style={{
          flex: 1,
          background: allTyped ? C.pink : C.surface,
          color: allTyped ? C.bg : C.textFaint,
          border: 'none', padding: '14px',
          fontFamily: F.display, fontSize: 16, fontWeight: 400,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          cursor: allTyped ? 'pointer' : 'not-allowed',
          clipPath: smallAngleClip,
          boxShadow: allTyped ? `0 0 18px ${C.pinkGlow}` : 'none',
          transition: 'all 0.3s', minHeight: 48,
        }}>{allTyped ? '▸ Начать игру' : '◌ Читаем...'}</button>
      </div>
    </>
  );
}
