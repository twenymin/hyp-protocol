// ============== GLOBAL DEPENDENCIES (loaded via CDN in index.html) ==============
const { useState, useEffect, useMemo, useRef } = React;
const { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } = Recharts;

// ============== INLINE SVG ICONS (replaces lucide-react) ==============
// Why inline: lucide via CDN doesn't expose React components, only vanilla SVG injection.
// We're a small app with ~25 icons total, so inlining is cleaner than wrestling with lucide CDN.

const Icon = ({ d, size = 18, color = 'currentColor', strokeWidth = 1.8, fill = 'none', style = {}, ...rest }) => (
  React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: fill,
    stroke: color, strokeWidth: strokeWidth,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { display: 'inline-block', verticalAlign: 'middle', ...style },
    ...rest,
  }, React.createElement('g', { dangerouslySetInnerHTML: { __html: d } }))
);

const Check = (p) => React.createElement(Icon, { ...p, d: '<polyline points="20 6 9 17 4 12"/>' });
const Home = (p) => React.createElement(Icon, { ...p, d: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' });
const MapIcon = (p) => React.createElement(Icon, { ...p, d: '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>' });
const User = (p) => React.createElement(Icon, { ...p, d: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' });
const Settings = (p) => React.createElement(Icon, { ...p, d: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>' });
const Lock = (p) => React.createElement(Icon, { ...p, d: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>' });
const Trophy = (p) => React.createElement(Icon, { ...p, d: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>' });
const Flame = (p) => React.createElement(Icon, { ...p, d: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>' });
const Eye = (p) => React.createElement(Icon, { ...p, d: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>' });
const Mail = (p) => React.createElement(Icon, { ...p, d: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>' });
const Activity = (p) => React.createElement(Icon, { ...p, d: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>' });
const Target = (p) => React.createElement(Icon, { ...p, d: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>' });
const Shield = (p) => React.createElement(Icon, { ...p, d: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>' });
const Zap = (p) => React.createElement(Icon, { ...p, d: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>' });
const RotateCcw = (p) => React.createElement(Icon, { ...p, d: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>' });
const ArrowLeft = (p) => React.createElement(Icon, { ...p, d: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>' });
const ArrowRight = (p) => React.createElement(Icon, { ...p, d: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>' });
const Plus = (p) => React.createElement(Icon, { ...p, d: '<path d="M5 12h14"/><path d="M12 5v14"/>' });
const X = (p) => React.createElement(Icon, { ...p, d: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>' });
const Camera = (p) => React.createElement(Icon, { ...p, d: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>' });
const Trash2 = (p) => React.createElement(Icon, { ...p, d: '<path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>' });

// ============== DESIGN TOKENS ==============
const C = {
  bg: '#050608', bgPanel: '#0A0B0E', bgCard: '#0F1115',
  surface: '#15181E', surfaceLight: '#1D2128',
  border: '#262B33', borderBright: '#363D47',
  yellow: '#FFD60A', yellowGlow: 'rgba(255, 214, 10, 0.55)',
  yellowSoft: 'rgba(255, 214, 10, 0.10)', yellowBorder: 'rgba(255, 214, 10, 0.35)',
  cyan: '#00E5FF', cyanSoft: 'rgba(0, 229, 255, 0.10)', cyanBorder: 'rgba(0, 229, 255, 0.35)',
  magenta: '#FF2D7F', magentaSoft: 'rgba(255, 45, 127, 0.10)',
  text: '#F0F2F5', textDim: '#9BA1AB', textFaint: '#5C6370',
  success: '#00E5A0',
  danger: '#FF4D4D',
};
const F = {
  display: '"Chakra Petch", sans-serif',
  body: '"Geist", -apple-system, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", monospace',
};
const angleClip = 'polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))';
const smallAngleClip = 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))';

// ============== GAME LOGIC ==============
const STAT_CODES = ['STR', 'END', 'MAS', 'NUT', 'REC', 'FRM'];
const STAT_LABELS = { STR: 'strength', END: 'endurance', MAS: 'mass', NUT: 'nutrition', REC: 'recovery', FRM: 'form' };

const calcOVR = (stats) => Math.round(STAT_CODES.reduce((s, c) => s + stats[c], 0) / 6);
const calcTier = (ovr) => {
  if (ovr >= 80) return { name: 'icon', color: C.magenta, glow: 'rgba(255, 45, 127, 0.55)' };
  if (ovr >= 65) return { name: 'gold', color: C.yellow, glow: C.yellowGlow };
  if (ovr >= 50) return { name: 'silver', color: '#C0C8D4', glow: 'rgba(192, 200, 212, 0.45)' };
  return { name: 'bronze', color: '#CD7F32', glow: 'rgba(205, 127, 50, 0.45)' };
};

const XP_TO_STAT_RATIO = 0.005;

// ============== ONBOARDING CALIBRATION ==============
const EXPERIENCE_LEVELS = [
  { code: 'NOVICE', label: 'first time', desc: 'never trained seriously', baseStr: 22, baseMas: 26 },
  { code: 'BEGINNER', label: '< 1 year', desc: 'occasional gym, knows basics', baseStr: 32, baseMas: 36 },
  { code: 'INTERMEDIATE', label: '1-3 years', desc: 'consistent training, good form', baseStr: 45, baseMas: 48 },
  { code: 'ADVANCED', label: '3-5 years', desc: 'plateau-aware, structured programs', baseStr: 58, baseMas: 60 },
  { code: 'ELITE', label: '5+ years', desc: 'competing, optimized everything', baseStr: 70, baseMas: 72 },
];

const calibrateStartingStats = (profile) => {
  const exp = EXPERIENCE_LEVELS[profile.experienceLevel ?? 1];
  const ageMod = profile.age <= 22 ? -3 : profile.age <= 35 ? 0 : profile.age <= 45 ? -3 : -8;
  const heightM = profile.height / 100;
  const bmi = profile.weight / (heightM * heightM);
  const bmiMod = bmi >= 19 && bmi <= 26 ? 5 : 0;
  return {
    STR: Math.max(15, Math.min(85, exp.baseStr + ageMod)),
    END: Math.max(15, Math.min(85, 35 + ageMod + bmiMod)),
    MAS: Math.max(15, Math.min(85, exp.baseMas + ageMod)),
    NUT: 25,
    REC: 40 + (profile.age <= 30 ? 5 : 0),
    FRM: Math.max(20, Math.min(75, exp.baseStr - 5 + ageMod)),
  };
};

const calibrateGoals = (startingStats, ovrTarget) => {
  const startOvr = calcOVR(startingStats);
  const delta = ovrTarget - startOvr;
  return Object.fromEntries(
    STAT_CODES.map(code => {
      const start = startingStats[code];
      const room = 90 - start;
      const weight = room / (90 - 30);
      const goal = Math.round(Math.min(90, start + delta * weight * 1.4));
      return [code, goal];
    })
  );
};

// ============== MISSION TEMPLATES ==============
// inputType determines which detail UI is shown
// exercises is for workout-type missions

const DAY_1_MISSIONS = [
  { code: 'LETTER_FROM_FUTURE', desc: 'cutscene · open before start', xp: 50, stat: 'FRM', special: true, inputType: 'text', prompt: 'Прочитай письмо, напиши свою цель одной фразой' },
  { code: 'BASELINE_WEIGHT', desc: 'measurement · manual input', xp: 50, stat: 'MAS', inputType: 'metric', metric: 'weight', unit: 'kg' },
  { code: 'PHOTO_SCAN_3X', desc: 'measurement · 3 angles', xp: 150, stat: 'FRM', inputType: 'photo', photoCount: 3, angles: ['front', 'side', 'back'] },
  { code: 'BODY_METRICS', desc: 'measurement · 5 body points', xp: 100, stat: 'MAS', inputType: 'metrics', metrics: [
    { key: 'chest', label: 'chest', unit: 'cm' },
    { key: 'arm', label: 'arm', unit: 'cm' },
    { key: 'waist', label: 'waist', unit: 'cm' },
    { key: 'thigh', label: 'thigh', unit: 'cm' },
    { key: 'shoulders', label: 'shoulders', unit: 'cm' },
  ]},
  { code: 'WALK_30:00', desc: 'activation · soft launch', xp: 100, stat: 'END', inputType: 'cardio', target: { duration: 30, unit: 'min' } },
];

// Workout exercises by chapter
const WORKOUT_TEMPLATES = {
  PUSH_DAY_A: { exercises: ['Bench Press', 'Shoulder Press', 'Incline DB Press', 'Lateral Raise', 'Tricep Pushdown'] },
  PULL_DAY_A: { exercises: ['Pull-ups', 'Barbell Row', 'Lat Pulldown', 'Face Pull', 'Bicep Curl'] },
  LEG_DAY_A: { exercises: ['Squat', 'Romanian Deadlift', 'Leg Press', 'Leg Curl', 'Calf Raise'] },
  PUSH_DAY_B: { exercises: ['Incline Bench', 'DB Shoulder Press', 'Cable Fly', 'Lateral Raise', 'Skullcrusher'] },
  PULL_DAY_B: { exercises: ['Deadlift', 'Cable Row', 'Pull-ups', 'Reverse Fly', 'Hammer Curl'] },
  LEG_DAY_B: { exercises: ['Front Squat', 'Hip Thrust', 'Walking Lunge', 'Leg Extension', 'Standing Calf'] },
  ARMS_FOCUS: { exercises: ['Barbell Curl', 'Close-Grip Bench', 'Hammer Curl', 'Tricep Pushdown', 'Concentration Curl'] },
  PUSH_HEAVY: { exercises: ['Bench Press 5x5', 'OHP 5x5', 'Weighted Dips', 'Heavy Lateral'] },
  PULL_HEAVY: { exercises: ['Deadlift 5x5', 'Weighted Pull-ups', 'Pendlay Row', 'Heavy Curl'] },
  LEG_HEAVY: { exercises: ['Back Squat 5x5', 'Heavy RDL', 'Bulgarian Split', 'Heavy Calf'] },
  PUSH_PEAK: { exercises: ['Bench Press 1RM Test', 'OHP', 'Incline DB', 'Dips'] },
  PULL_PEAK: { exercises: ['Deadlift 1RM Test', 'Pull-ups', 'Row', 'Curl'] },
  LEG_PEAK: { exercises: ['Squat 1RM Test', 'RDL', 'Leg Press', 'Calf'] },
};

const MISSION_POOL = {
  foundation: {
    workouts: [
      { code: 'PUSH_DAY_A', desc: 'workout · chest+shoulders+triceps', xp: 200, stat: 'STR', inputType: 'workout' },
      { code: 'PULL_DAY_A', desc: 'workout · back+biceps', xp: 200, stat: 'STR', inputType: 'workout' },
      { code: 'LEG_DAY_A', desc: 'workout · quads+glutes+calves', xp: 220, stat: 'MAS', inputType: 'workout' },
      { code: 'FORM_DRILL', desc: 'technique · video review', xp: 120, stat: 'FRM', inputType: 'checkbox' },
    ],
    nutrition: [
      { code: 'PROTEIN_TRACK', desc: 'log · 1.6g/kg target', xp: 100, stat: 'NUT', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PHOTO', desc: 'log · breakfast scan', xp: 60, stat: 'NUT', inputType: 'photo', photoCount: 1, angles: ['meal'] },
      { code: 'CAL_SURPLUS', desc: 'log · +300 kcal', xp: 80, stat: 'NUT', inputType: 'metric', metric: 'calories', unit: 'kcal' },
    ],
    recovery: [
      { code: 'SLEEP_7H+', desc: 'recovery · 7+ hours', xp: 100, stat: 'REC', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'STRETCH_15:00', desc: 'recovery · mobility', xp: 60, stat: 'REC', inputType: 'cardio', target: { duration: 15, unit: 'min' } },
    ],
    cardio: [
      { code: 'WALK_45:00', desc: 'cardio · zone 1-2', xp: 100, stat: 'END', inputType: 'cardio', target: { duration: 45, unit: 'min' } },
    ],
  },
  volume: {
    workouts: [
      { code: 'PUSH_DAY_B', desc: 'workout · volume push', xp: 240, stat: 'STR', inputType: 'workout' },
      { code: 'PULL_DAY_B', desc: 'workout · volume pull', xp: 240, stat: 'STR', inputType: 'workout' },
      { code: 'LEG_DAY_B', desc: 'workout · volume legs', xp: 260, stat: 'MAS', inputType: 'workout' },
      { code: 'ARMS_FOCUS', desc: 'workout · biceps+triceps', xp: 180, stat: 'MAS', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_TRACK', desc: 'log · 1.8g/kg target', xp: 110, stat: 'NUT', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PHOTO_3X', desc: 'log · all meals', xp: 120, stat: 'NUT', inputType: 'photo', photoCount: 3, angles: ['breakfast', 'lunch', 'dinner'] },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'recovery · 8+ hours', xp: 120, stat: 'REC', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'COLD_SHOWER', desc: 'recovery · cold exposure', xp: 80, stat: 'REC', inputType: 'cardio', target: { duration: 3, unit: 'min' } },
    ],
    cardio: [
      { code: 'INCLINE_WALK', desc: 'cardio · zone 2', xp: 120, stat: 'END', inputType: 'cardio', target: { duration: 30, unit: 'min' } },
    ],
  },
  intensity: {
    workouts: [
      { code: 'PUSH_HEAVY', desc: 'workout · heavy push 5x5', xp: 280, stat: 'STR', inputType: 'workout' },
      { code: 'PULL_HEAVY', desc: 'workout · heavy pull 5x5', xp: 280, stat: 'STR', inputType: 'workout' },
      { code: 'LEG_HEAVY', desc: 'workout · heavy squat+dl', xp: 300, stat: 'MAS', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_2G', desc: 'log · 2.0g/kg target', xp: 130, stat: 'NUT', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'CARB_TIMING', desc: 'log · pre/post workout', xp: 100, stat: 'NUT', inputType: 'checkbox' },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'recovery · 8+ hours', xp: 130, stat: 'REC', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'DELOAD_DAY', desc: 'recovery · active rest', xp: 100, stat: 'REC', inputType: 'cardio', target: { duration: 20, unit: 'min' } },
    ],
    cardio: [
      { code: 'HIIT_15:00', desc: 'cardio · zone 4', xp: 150, stat: 'END', inputType: 'cardio', target: { duration: 15, unit: 'min' } },
    ],
  },
  consolidation: {
    workouts: [
      { code: 'PUSH_PEAK', desc: 'workout · peak push', xp: 300, stat: 'STR', inputType: 'workout' },
      { code: 'PULL_PEAK', desc: 'workout · peak pull', xp: 300, stat: 'STR', inputType: 'workout' },
      { code: 'LEG_PEAK', desc: 'workout · peak legs', xp: 320, stat: 'MAS', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_2G', desc: 'log · 2.0g/kg target', xp: 130, stat: 'NUT', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PREP', desc: 'log · weekly prep', xp: 150, stat: 'NUT', inputType: 'checkbox' },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'recovery · 8+ hours', xp: 140, stat: 'REC', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'MOBILITY_30', desc: 'recovery · 30min mobility', xp: 110, stat: 'REC', inputType: 'cardio', target: { duration: 30, unit: 'min' } },
    ],
    cardio: [
      { code: 'STEADY_30', desc: 'cardio · zone 2', xp: 130, stat: 'END', inputType: 'cardio', target: { duration: 30, unit: 'min' } },
    ],
  },
};

const BOSS_DAYS = [21, 42, 63, 84];

const getChapterByDay = (day) => {
  if (day <= 21) return { idx: 0, name: 'foundation', romanNum: 'I', display: 'Foundation' };
  if (day <= 42) return { idx: 1, name: 'volume', romanNum: 'II', display: 'Volume' };
  if (day <= 63) return { idx: 2, name: 'intensity', romanNum: 'III', display: 'Intensity' };
  return { idx: 3, name: 'consolidation', romanNum: 'IV', display: 'Consolidation' };
};

const seededShuffle = (arr, seed) => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const generateMissionsForDay = (day) => {
  if (day === 1) {
    return DAY_1_MISSIONS.map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0'), id: `d1_${i}`, done: false, data: null }));
  }
  if (BOSS_DAYS.includes(day)) {
    const ch = getChapterByDay(day);
    return [
      { code: 'BOSS_PHOTO_SCAN', desc: 'boss · photo comparison', xp: 300, stat: 'FRM', num: '01', id: `d${day}_boss1`, done: false, special: true, inputType: 'photo', photoCount: 3, angles: ['front', 'side', 'back'], data: null },
      { code: 'BOSS_WEIGH_IN', desc: 'boss · weight check', xp: 200, stat: 'MAS', num: '02', id: `d${day}_boss2`, done: false, special: true, inputType: 'metric', metric: 'weight', unit: 'kg', data: null },
      { code: 'BOSS_STRENGTH_TEST', desc: 'boss · 1RM test', xp: 400, stat: 'STR', num: '03', id: `d${day}_boss3`, done: false, special: true, inputType: 'workout', data: null },
      { code: `CHAPTER_${ch.romanNum}_FINALE`, desc: 'boss · review + reflect', xp: 500, stat: 'FRM', num: '04', id: `d${day}_boss4`, done: false, special: true, inputType: 'text', prompt: 'Что ты узнал о себе за эти 21 день? Что станешь делать иначе?', data: null },
    ];
  }

  const ch = getChapterByDay(day);
  const pool = MISSION_POOL[ch.name];
  const dayOfWeek = (day - 1) % 7;
  const seed = day * 7919 + 13;

  const missions = [];

  if ([1, 2, 4, 5].includes(dayOfWeek)) {
    const workouts = seededShuffle(pool.workouts, seed);
    missions.push(workouts[0]);
  }

  const nutrition = seededShuffle(pool.nutrition, seed + 1);
  missions.push(nutrition[0]);
  if (dayOfWeek % 2 === 0 && pool.nutrition.length > 1) {
    missions.push(nutrition[1]);
  }

  const recovery = seededShuffle(pool.recovery, seed + 2);
  missions.push(recovery[0]);

  if ([3, 6].includes(dayOfWeek)) {
    const cardio = seededShuffle(pool.cardio, seed + 3);
    missions.push(cardio[0]);
  }

  return missions.map((m, i) => ({
    ...m,
    num: String(i + 1).padStart(2, '0'),
    id: `d${day}_${i}`,
    done: false,
    data: null,
  }));
};

// ============== STATE PERSISTENCE ==============
const STORAGE_KEY = 'hyp_protocol_v1_state';

const getInitialState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.startDate && parsed.stats && parsed.daysData) return parsed;
    }
  } catch (e) {}
  return null;  // null means: needs onboarding
};

const saveState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage might be full from base64 photos — show silent error
    console.warn('Failed to save state', e);
  }
};

const computeCurrentDay = (startDateISO) => {
  const start = new Date(startDateISO);
  const now = new Date();
  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const nowDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.floor((nowDay - startDay) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(84, diffDays + 1));
};

// ============== SHARED ==============
function SectionHeader({ children, sub }) {
  return (
    <div style={{ padding: '0 22px', marginBottom: 12, marginTop: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontFamily: F.display, fontSize: 11, fontWeight: 600, color: C.text, letterSpacing: '0.28em', textTransform: 'uppercase' }}>{children}</div>
        <div style={{ flex: 1, height: 1, background: C.border }} />
        {sub && <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ============== MISSION DETAIL SCREEN ==============
function MissionDetail({ mission, onComplete, onAbort }) {
  const [revealed, setRevealed] = useState(false);
  const [data, setData] = useState(mission.data || getDefaultData(mission));

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, []);

  const canComplete = useMemo(() => validateData(mission, data), [mission, data]);

  const handleComplete = () => {
    if (!canComplete) return;
    onComplete(data);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: C.bg,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'center',
      overflowY: 'auto',
      opacity: revealed ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      <div style={{
        width: '100%', maxWidth: 440,
        background: C.bgPanel,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        minHeight: '100vh',
      }}>
        {/* Header */}
        <div style={{
          padding: '14px 18px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button onClick={onAbort} style={{
            background: 'transparent', border: `1px solid ${C.border}`,
            color: C.textDim, padding: '8px',
            cursor: 'pointer', clipPath: smallAngleClip,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowLeft size={16} strokeWidth={1.8} />
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase' }}>mission [{mission.num}]</div>
            <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '0.06em', marginTop: 2 }}>{mission.code}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.yellow }}>+{mission.xp}</span>
            <span style={{ fontFamily: F.display, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em' }}>→{mission.stat}</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '20px 22px 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>▸ description</div>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, letterSpacing: '0.08em', lineHeight: 1.6 }}>{mission.desc}</div>
        </div>

        {/* Input area */}
        <div style={{ flex: 1, padding: '24px 18px' }}>
          {mission.inputType === 'workout' && <WorkoutInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'cardio' && <CardioInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'metric' && <MetricInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'metrics' && <MetricsInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'photo' && <PhotoInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'checkbox' && <CheckboxInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'text' && <TextInput mission={mission} data={data} setData={setData} />}
        </div>

        {/* Bottom action */}
        <div style={{ padding: '16px 18px 32px', borderTop: `1px solid ${C.border}`, background: C.bg }}>
          <button onClick={handleComplete} disabled={!canComplete} style={{
            width: '100%',
            background: canComplete ? C.yellow : C.surface,
            color: canComplete ? C.bg : C.textFaint,
            border: 'none',
            padding: '16px',
            fontFamily: F.display,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            clipPath: smallAngleClip,
            boxShadow: canComplete ? `0 0 20px ${C.yellowGlow}` : 'none',
            transition: 'all 0.3s',
          }}>
            {canComplete ? '▸ mission complete' : '◌ fill required fields'}
          </button>
        </div>
      </div>
    </div>
  );
}

const getDefaultData = (mission) => {
  switch (mission.inputType) {
    case 'workout':
      const exercises = WORKOUT_TEMPLATES[mission.code]?.exercises || ['Exercise 1', 'Exercise 2', 'Exercise 3'];
      return {
        exercises: exercises.map(name => ({
          name,
          sets: [{ weight: '', reps: '' }, { weight: '', reps: '' }, { weight: '', reps: '' }],
        })),
      };
    case 'cardio':
      return { duration: '', distance: '', notes: '' };
    case 'metric':
      return { value: '' };
    case 'metrics':
      return { values: Object.fromEntries(mission.metrics.map(m => [m.key, ''])) };
    case 'photo':
      return { photos: Array(mission.photoCount).fill(null) };
    case 'checkbox':
      return { checked: false };
    case 'text':
      return { text: '' };
    default:
      return {};
  }
};

const validateData = (mission, data) => {
  switch (mission.inputType) {
    case 'workout':
      return data.exercises?.some(ex => ex.sets.some(s => s.weight && s.reps));
    case 'cardio':
      return !!data.duration && Number(data.duration) > 0;
    case 'metric':
      return !!data.value && Number(data.value) > 0;
    case 'metrics':
      return Object.values(data.values).every(v => v && Number(v) > 0);
    case 'photo':
      return data.photos.every(p => p !== null);
    case 'checkbox':
      return data.checked;
    case 'text':
      return data.text && data.text.trim().length >= 5;
    default:
      return false;
  }
};

// ============== INPUT TYPE COMPONENTS ==============

function WorkoutInput({ mission, data, setData }) {
  const updateSet = (exIdx, setIdx, field, value) => {
    const newExercises = [...data.exercises];
    newExercises[exIdx].sets[setIdx][field] = value;
    setData({ ...data, exercises: newExercises });
  };
  const addSet = (exIdx) => {
    const newExercises = [...data.exercises];
    newExercises[exIdx].sets.push({ weight: '', reps: '' });
    setData({ ...data, exercises: newExercises });
  };
  const removeSet = (exIdx, setIdx) => {
    const newExercises = [...data.exercises];
    if (newExercises[exIdx].sets.length > 1) {
      newExercises[exIdx].sets.splice(setIdx, 1);
      setData({ ...data, exercises: newExercises });
    }
  };

  return (
    <div>
      <SectionLabel>▸ workout_log</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {data.exercises.map((ex, exIdx) => (
          <div key={exIdx} style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            clipPath: smallAngleClip, padding: '14px 16px',
          }}>
            <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 600, color: C.yellow, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
              {String(exIdx + 1).padStart(2, '0')} · {ex.name}
            </div>
            {/* Set headers */}
            <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 8, marginBottom: 6, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              <span>set</span>
              <span>kg</span>
              <span>reps</span>
              <span></span>
            </div>
            {ex.sets.map((set, setIdx) => (
              <div key={setIdx} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 28px', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textDim, fontWeight: 700 }}>{setIdx + 1}</span>
                <CompactInput value={set.weight} onChange={v => updateSet(exIdx, setIdx, 'weight', v)} type="number" placeholder="—" />
                <CompactInput value={set.reps} onChange={v => updateSet(exIdx, setIdx, 'reps', v)} type="number" placeholder="—" />
                <button onClick={() => removeSet(exIdx, setIdx)} style={{
                  background: 'transparent', border: 'none', color: C.textFaint,
                  cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <X size={12} strokeWidth={1.8} />
                </button>
              </div>
            ))}
            <button onClick={() => addSet(exIdx)} style={{
              marginTop: 6, width: '100%',
              background: 'transparent', border: `1px dashed ${C.border}`,
              color: C.textDim, padding: '6px',
              fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', clipPath: smallAngleClip,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
            }}>
              <Plus size={10} strokeWidth={1.8} /> add set
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardioInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ cardio_log</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        {mission.target && (
          <div style={{
            background: C.cyanSoft, border: `1px solid ${C.cyanBorder}`,
            padding: '8px 12px', marginBottom: 16,
            clipPath: smallAngleClip,
            fontFamily: F.mono, fontSize: 10, color: C.cyan, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            target · {mission.target.duration} {mission.target.unit}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <FormField label="duration" unit="min">
            <CompactInput value={data.duration} onChange={v => setData({ ...data, duration: v })} type="number" placeholder="0" />
          </FormField>
          <FormField label="distance" unit="km" optional>
            <CompactInput value={data.distance} onChange={v => setData({ ...data, distance: v })} type="number" placeholder="—" step="0.1" />
          </FormField>
          <FormField label="notes" optional>
            <CompactInput value={data.notes} onChange={v => setData({ ...data, notes: v })} type="text" placeholder="—" />
          </FormField>
        </div>
      </div>
    </div>
  );
}

function MetricInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ metric_input</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '24px 18px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{mission.metric}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
          <input
            type="number"
            value={data.value}
            onChange={e => setData({ value: e.target.value })}
            placeholder="0"
            style={{
              fontFamily: F.display,
              fontSize: 56,
              fontWeight: 700,
              color: C.yellow,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              width: 160,
              padding: 0,
              textShadow: `0 0 18px ${C.yellowGlow}`,
            }}
          />
          <span style={{ fontFamily: F.display, fontSize: 18, color: C.textDim, letterSpacing: '0.18em' }}>{mission.unit}</span>
        </div>
      </div>
    </div>
  );
}

function MetricsInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ body_metrics</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mission.metrics.map(m => (
            <FormField key={m.key} label={m.label} unit={m.unit}>
              <CompactInput
                value={data.values[m.key]}
                onChange={v => setData({ ...data, values: { ...data.values, [m.key]: v } })}
                type="number"
                placeholder="0"
                step="0.5"
              />
            </FormField>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoInput({ mission, data, setData }) {
  const fileRefs = useRef([]);

  const handleFile = (idx, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newPhotos = [...data.photos];
      newPhotos[idx] = e.target.result;
      setData({ photos: newPhotos });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (idx) => {
    const newPhotos = [...data.photos];
    newPhotos[idx] = null;
    setData({ photos: newPhotos });
  };

  return (
    <div>
      <SectionLabel>▸ photo_capture</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.photos.map((photo, idx) => (
          <div key={idx} style={{
            background: C.bgCard,
            border: `1px solid ${photo ? C.success : C.border}`,
            clipPath: smallAngleClip,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            minHeight: 90,
          }}>
            <div style={{
              width: 64, height: 64,
              background: C.surface,
              border: `1px solid ${C.border}`,
              clipPath: smallAngleClip,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              backgroundImage: photo ? `url(${photo})` : 'none',
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}>
              {!photo && <Camera size={20} color={C.textFaint} strokeWidth={1.5} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.display, fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {mission.angles?.[idx] || `photo ${idx + 1}`}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: photo ? C.success : C.textFaint, letterSpacing: '0.18em', marginTop: 4, textTransform: 'uppercase' }}>
                {photo ? '✓ captured' : 'awaiting capture'}
              </div>
            </div>
            <input
              ref={el => fileRefs.current[idx] = el}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={e => handleFile(idx, e.target.files?.[0])}
              style={{ display: 'none' }}
            />
            {photo ? (
              <button onClick={() => removePhoto(idx)} style={{
                background: 'transparent', border: `1px solid ${C.border}`,
                color: C.danger, padding: '8px', cursor: 'pointer',
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Trash2 size={14} strokeWidth={1.8} />
              </button>
            ) : (
              <button onClick={() => fileRefs.current[idx]?.click()} style={{
                background: C.yellow, border: 'none',
                color: C.bg, padding: '8px 14px', cursor: 'pointer',
                fontFamily: F.display, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                clipPath: smallAngleClip,
              }}>
                capture
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center' }}>
        photos stored locally · never uploaded
      </div>
    </div>
  );
}

function CheckboxInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ confirm_action</SectionLabel>
      <button
        onClick={() => setData({ checked: !data.checked })}
        style={{
          width: '100%',
          background: data.checked ? C.yellowSoft : C.bgCard,
          border: `1px solid ${data.checked ? C.yellow : C.border}`,
          clipPath: smallAngleClip,
          padding: '32px 18px',
          cursor: 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s',
          boxShadow: data.checked ? `0 0 20px ${C.yellowGlow}` : 'none',
        }}
      >
        <div style={{
          width: 56, height: 56,
          margin: '0 auto 14px',
          border: `2px solid ${data.checked ? C.yellow : C.border}`,
          background: data.checked ? C.yellow : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          clipPath: smallAngleClip,
          transition: 'all 0.3s',
        }}>
          {data.checked && <Check size={32} strokeWidth={3} color={C.bg} />}
        </div>
        <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {data.checked ? 'confirmed' : 'tap to confirm'}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', marginTop: 8, textTransform: 'uppercase' }}>
          honor system · self-reported
        </div>
      </button>
    </div>
  );
}

function TextInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ reflection</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        {mission.prompt && (
          <div style={{
            fontFamily: F.body, fontSize: 13, color: C.cyan,
            fontStyle: 'italic',
            paddingBottom: 14, marginBottom: 14,
            borderBottom: `1px solid ${C.border}`,
            lineHeight: 1.6,
          }}>
            "{mission.prompt}"
          </div>
        )}
        <textarea
          value={data.text}
          onChange={e => setData({ text: e.target.value })}
          placeholder="write your answer..."
          rows={6}
          style={{
            width: '100%',
            background: 'transparent',
            border: `1px solid ${C.border}`,
            color: C.text,
            fontFamily: F.body,
            fontSize: 14,
            lineHeight: 1.6,
            padding: '12px',
            outline: 'none',
            resize: 'vertical',
            clipPath: smallAngleClip,
          }}
        />
        <div style={{ marginTop: 8, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right' }}>
          {data.text.length} chars · min 5
        </div>
      </div>
    </div>
  );
}

// ============== INPUT PRIMITIVES ==============

function CompactInput({ value, onChange, type = 'text', placeholder, step }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      step={step}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        color: C.text,
        fontFamily: F.mono,
        fontSize: 14,
        fontWeight: 500,
        padding: '8px 10px',
        outline: 'none',
        width: '100%',
        textAlign: 'center',
        minWidth: 0,
      }}
      onFocus={e => e.target.style.borderColor = C.yellow}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function FormField({ label, unit, optional, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span style={{ color: C.textDim }}>
          {label}{optional && <span style={{ color: C.textFaint }}> · optional</span>}
        </span>
        {unit && <span style={{ color: C.textFaint }}>{unit}</span>}
      </div>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>
      {children}
    </div>
  );
}

// ============== ONBOARDING FLOW ==============

function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '', classCode: 'HYP',
    age: '', gender: '', height: '', weight: '',
    experienceLevel: null, ovrTarget: null,
  });

  const updateProfile = (patch) => setProfile(p => ({ ...p, ...patch }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => Math.max(0, s - 1));

  const startingStats = useMemo(() => {
    if (!profile.age || !profile.height || !profile.weight || profile.experienceLevel === null) return null;
    return calibrateStartingStats({
      age: Number(profile.age),
      height: Number(profile.height),
      weight: Number(profile.weight),
      experienceLevel: profile.experienceLevel,
    });
  }, [profile.age, profile.height, profile.weight, profile.experienceLevel]);

  const startingOVR = startingStats ? calcOVR(startingStats) : 0;

  const handleComplete = () => {
    const goals = calibrateGoals(startingStats, profile.ovrTarget);
    const fullState = {
      startDate: new Date().toISOString(),
      stats: startingStats,
      goals,
      profile: {
        name: profile.name, classCode: profile.classCode,
        age: Number(profile.age), gender: profile.gender,
        height: Number(profile.height), weight: Number(profile.weight),
        experienceLevel: profile.experienceLevel,
        ovrTarget: profile.ovrTarget, startingOVR,
      },
      daysData: {}, totalXP: 0,
    };
    saveState(fullState);
    onComplete(fullState);
  };

  return (
    <div style={{
      minHeight: '100vh', background: C.bg,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      color: C.text, fontFamily: F.body,
      display: 'flex', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div key={step} style={{
        position: 'absolute', left: 0, right: 0,
        height: 2, background: `linear-gradient(to bottom, transparent, ${C.yellow}, transparent)`,
        animation: 'scan 1.4s ease-out 1', opacity: 0.6,
        pointerEvents: 'none', zIndex: 100,
      }} />
      <div style={{
        width: '100%', maxWidth: 440, minHeight: '100vh',
        background: C.bgPanel,
        display: 'flex', flexDirection: 'column', position: 'relative',
      }}>
        <div style={{
          padding: '14px 18px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success, animation: 'blink 2s infinite' }} />
            <span style={{ color: C.success }}>system online</span>
          </div>
          <div style={{ color: C.textFaint }}>onboarding</div>
          <div style={{ color: C.yellow }}>{String(step + 1).padStart(2, '0')} / 06</div>
        </div>

        <div style={{ padding: '0 18px', display: 'flex', gap: 4, marginBottom: 8 }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              flex: 1, height: 2,
              background: i <= step ? C.yellow : C.surface,
              boxShadow: i === step ? `0 0 6px ${C.yellowGlow}` : 'none',
              transition: 'all 0.4s',
            }} />
          ))}
        </div>

        <div key={step} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {step === 0 && <StepHero onNext={next} />}
          {step === 1 && <StepClass profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} />}
          {step === 2 && <StepBio profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} />}
          {step === 3 && <StepExperience profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} startingOVR={startingOVR} />}
          {step === 4 && <StepGoal profile={profile} updateProfile={updateProfile} onNext={next} onBack={back} startingOVR={startingOVR} startingStats={startingStats} />}
          {step === 5 && <StepLetter profile={profile} startingOVR={startingOVR} onComplete={handleComplete} onBack={back} />}
        </div>
      </div>
    </div>
  );
}

function OnbHeader({ subtitle, title, accent = C.yellow }) {
  return (
    <div style={{ padding: '32px 22px 0' }}>
      <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase' }}>─── {subtitle}</div>
      <h1 style={{ fontFamily: F.display, fontSize: 36, fontWeight: 700, letterSpacing: '0.04em', marginTop: 10, lineHeight: 1, color: accent, textTransform: 'uppercase', textShadow: accent === C.yellow ? `0 0 20px ${C.yellowGlow}` : 'none' }}>
        {title}
      </h1>
    </div>
  );
}

function OnbFooter({ onNext, onBack, nextLabel = '▸ continue', nextDisabled = false }) {
  return (
    <div style={{ padding: '20px 18px 32px', borderTop: `1px solid ${C.border}`, background: C.bg, display: 'flex', gap: 8 }}>
      {onBack && (
        <button onClick={onBack} style={{
          background: 'transparent', border: `1px solid ${C.border}`,
          color: C.textDim, padding: '14px 18px',
          fontFamily: F.display, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          cursor: 'pointer', clipPath: smallAngleClip,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowLeft size={14} strokeWidth={2} />
        </button>
      )}
      <button onClick={onNext} disabled={nextDisabled} style={{
        flex: 1,
        background: nextDisabled ? C.surface : C.yellow,
        color: nextDisabled ? C.textFaint : C.bg,
        border: 'none', padding: '14px',
        fontFamily: F.display, fontSize: 12, fontWeight: 700,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        cursor: nextDisabled ? 'not-allowed' : 'pointer',
        clipPath: smallAngleClip,
        boxShadow: nextDisabled ? 'none' : `0 0 16px ${C.yellowGlow}`,
        transition: 'all 0.3s',
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
        opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease',
        marginBottom: 24,
      }}>welcome to</div>
      <h1 style={{
        fontFamily: F.display, fontSize: 48, fontWeight: 700,
        color: C.yellow, letterSpacing: '0.06em',
        textShadow: `0 0 28px ${C.yellowGlow}`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        margin: 0, lineHeight: 1,
      }}>HYP_PROTOCOL</h1>
      <div style={{
        fontFamily: F.mono, fontSize: 10, color: C.cyan,
        letterSpacing: '0.4em', textTransform: 'uppercase',
        marginTop: 14,
        opacity: revealed ? 1 : 0,
        transition: 'opacity 0.8s ease 0.5s',
      }}>v1 :: hypertrophy edition</div>
      <div style={{
        marginTop: 56,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(8px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
        maxWidth: 320,
      }}>
        <div style={{ fontFamily: F.display, fontSize: 22, color: C.text, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.3, marginBottom: 18 }}>
          Your life.<br/>
          <span style={{ color: C.yellow, textShadow: `0 0 14px ${C.yellowGlow}` }}>Played.</span>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.7 }}>
          84 дня. Один класс. Один путь от Bronze до Gold.<br/>
          Это не трекер. Это кампания.
        </p>
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onNext} style={{
        background: C.yellow, color: C.bg, border: 'none',
        padding: '16px 40px', cursor: 'pointer',
        fontFamily: F.display, fontSize: 13, fontWeight: 700,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        clipPath: smallAngleClip,
        boxShadow: `0 0 28px ${C.yellowGlow}`,
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s',
      }}>▸ initialize</button>
    </div>
  );
}

function StepClass({ profile, updateProfile, onNext, onBack }) {
  const classes = [
    { code: 'HYP', name: 'Hypertrophy', desc: 'mass + strength + form', locked: false, color: C.yellow },
    { code: 'CDE', name: 'Code', desc: 'engineering · 84 days to ship', locked: true, color: C.cyan },
    { code: 'MUS', name: 'Music', desc: 'instrument mastery', locked: true, color: C.magenta },
    { code: 'LNG', name: 'Language', desc: 'fluency in 84 days', locked: true, color: C.success },
  ];

  return (
    <>
      <OnbHeader subtitle="step 01 · class" title="Choose Your Path" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        Каждый класс — отдельная 84-дневная кампания. Сейчас доступен только HYP.
      </p>
      <div style={{ padding: '28px 18px 0', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {classes.map(c => {
          const selected = profile.classCode === c.code;
          return (
            <button key={c.code} onClick={() => !c.locked && updateProfile({ classCode: c.code })} disabled={c.locked} style={{
              background: selected ? `${c.color}15` : C.bgCard,
              border: `1px solid ${selected ? c.color : C.border}`,
              clipPath: smallAngleClip, padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: c.locked ? 'not-allowed' : 'pointer',
              opacity: c.locked ? 0.45 : 1,
              transition: 'all 0.3s',
              boxShadow: selected ? `0 0 14px ${c.color}55` : 'none',
              color: 'inherit',
            }}>
              <div style={{
                width: 52, height: 52,
                background: selected ? `${c.color}22` : C.surface,
                border: `1px solid ${selected ? c.color : C.border}`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 18, fontWeight: 700,
                color: c.locked ? C.textFaint : c.color, flexShrink: 0,
              }}>{c.locked ? <Lock size={18} strokeWidth={1.6} /> : c.code}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.name}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.15em', marginTop: 4, textTransform: 'uppercase' }}>{c.desc}</div>
              </div>
              {selected && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={12} strokeWidth={3} color={C.bg} />
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

function BioField({ label, hint, unit, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        <span style={{ color: C.textDim }}>{label}{hint && <span style={{ color: C.textFaint }}> · {hint}</span>}</span>
        {unit && <span style={{ color: C.textFaint }}>{unit}</span>}
      </div>
      {children}
    </div>
  );
}

function OnbInput({ value, onChange, type = 'text', placeholder, step, maxLength }) {
  return (
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} step={step} maxLength={maxLength}
      style={{
        background: C.surface, border: `1px solid ${C.border}`,
        color: C.text, fontFamily: F.mono, fontSize: 14, fontWeight: 500,
        padding: '10px 12px', outline: 'none', width: '100%', textAlign: 'center',
      }}
      onFocus={e => e.target.style.borderColor = C.yellow}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function StepBio({ profile, updateProfile, onNext, onBack }) {
  const valid = profile.name.trim() && profile.age && profile.height && profile.weight && profile.gender;
  return (
    <>
      <OnbHeader subtitle="step 02 · bio" title="Agent Data" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        Эти данные используются только локально. Они калибруют твои стартовые статы и нутри-цели.
      </p>
      <div style={{ padding: '28px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <BioField label="codename" hint="как тебя звать в игре">
          <OnbInput value={profile.name} onChange={v => updateProfile({ name: v })} type="text" placeholder="напр. КИРИЛЛ" maxLength={16} />
        </BioField>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <BioField label="age" unit="yrs">
            <OnbInput value={profile.age} onChange={v => updateProfile({ age: v })} type="number" placeholder="—" />
          </BioField>
          <BioField label="gender">
            <div style={{ display: 'flex', gap: 4 }}>
              {['M', 'F', 'X'].map(g => (
                <button key={g} onClick={() => updateProfile({ gender: g })} style={{
                  flex: 1,
                  background: profile.gender === g ? C.yellow : C.surface,
                  border: `1px solid ${profile.gender === g ? C.yellow : C.border}`,
                  color: profile.gender === g ? C.bg : C.text,
                  fontFamily: F.display, fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.18em', padding: '8px 0',
                  cursor: 'pointer', clipPath: smallAngleClip, transition: 'all 0.3s',
                }}>{g}</button>
              ))}
            </div>
          </BioField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <BioField label="height" unit="cm">
            <OnbInput value={profile.height} onChange={v => updateProfile({ height: v })} type="number" placeholder="—" />
          </BioField>
          <BioField label="weight" unit="kg">
            <OnbInput value={profile.weight} onChange={v => updateProfile({ weight: v })} type="number" placeholder="—" step="0.1" />
          </BioField>
        </div>
        <div style={{
          marginTop: 8, background: C.bgCard, border: `1px solid ${C.border}`,
          clipPath: smallAngleClip, padding: '12px 14px',
          fontFamily: F.mono, fontSize: 9, color: C.textFaint,
          letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.6,
        }}>▸ data stays on device. nothing sent to servers.</div>
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextDisabled={!valid} />
    </>
  );
}

function StepExperience({ profile, updateProfile, onNext, onBack, startingOVR }) {
  return (
    <>
      <OnbHeader subtitle="step 03 · calibration" title="Training History" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        От этого зависят твои стартовые статы. Будь честен — иначе игра не будет иметь смысла.
      </p>
      <div style={{ padding: '24px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {EXPERIENCE_LEVELS.map((lvl, i) => {
          const selected = profile.experienceLevel === i;
          return (
            <button key={i} onClick={() => updateProfile({ experienceLevel: i })} style={{
              background: selected ? C.yellowSoft : C.bgCard,
              border: `1px solid ${selected ? C.yellow : C.border}`,
              clipPath: smallAngleClip, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 14,
              cursor: 'pointer', transition: 'all 0.3s',
              boxShadow: selected ? `0 0 12px ${C.yellowGlow}` : 'none',
              color: 'inherit', textAlign: 'left',
            }}>
              <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: selected ? C.yellow : C.textDim, letterSpacing: '0.1em', minWidth: 110 }}>{lvl.code}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.text, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{lvl.label}</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, marginTop: 2, letterSpacing: '0.05em' }}>{lvl.desc}</div>
              </div>
              {selected && (
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: C.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} strokeWidth={3} color={C.bg} />
                </div>
              )}
            </button>
          );
        })}
        {startingOVR > 0 && (
          <div style={{
            marginTop: 16, background: C.bgCard, border: `1px solid ${C.cyanBorder}`,
            clipPath: smallAngleClip, padding: '14px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.cyan, letterSpacing: '0.2em', textTransform: 'uppercase' }}>▸ projected ovr</div>
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.textDim, marginTop: 4 }}>your starting tier</div>
            </div>
            <div style={{ fontFamily: F.display, fontSize: 32, fontWeight: 700, color: C.cyan, textShadow: `0 0 14px ${C.cyan}80` }}>{startingOVR}</div>
          </div>
        )}
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextDisabled={profile.experienceLevel === null} />
    </>
  );
}

function StepGoal({ profile, updateProfile, onNext, onBack, startingOVR, startingStats }) {
  const minTarget = startingOVR + 8;
  const maxTarget = Math.min(90, startingOVR + 30);
  const defaultTarget = startingOVR + 15;

  useEffect(() => {
    if (profile.ovrTarget === null) updateProfile({ ovrTarget: defaultTarget });
    // eslint-disable-next-line
  }, []);

  const target = profile.ovrTarget || defaultTarget;
  const delta = target - startingOVR;
  const goals = startingStats ? calibrateGoals(startingStats, target) : null;

  const difficulty = delta <= 12 ? { label: 'realistic', color: C.success, desc: 'достижимо при дисциплине' }
    : delta <= 20 ? { label: 'ambitious', color: C.yellow, desc: 'требует фокуса и постоянства' }
    : { label: 'extreme', color: C.magenta, desc: 'для тех кто реально готов выложиться' };

  return (
    <>
      <OnbHeader subtitle="step 04 · commitment" title="Set Your Goal" />
      <p style={{ padding: '0 22px', marginTop: 14, fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6 }}>
        Каким OVR ты хочешь стать через 84 дня. Это не просто число — это контракт с собой.
      </p>
      <div style={{ padding: '24px 18px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '20px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>now</div>
              <div style={{ fontFamily: F.display, fontSize: 44, fontWeight: 700, color: C.textDim, marginTop: 6, lineHeight: 1 }}>{startingOVR}</div>
              <div style={{ fontFamily: F.display, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', marginTop: 4 }}>{calcTier(startingOVR).name.toUpperCase()}</div>
            </div>
            <ArrowRight size={24} color={C.textFaint} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <div style={{ textAlign: 'center', flex: 1 }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: difficulty.color, letterSpacing: '0.18em', textTransform: 'uppercase' }}>day 084</div>
              <div style={{ fontFamily: F.display, fontSize: 44, fontWeight: 700, color: difficulty.color, marginTop: 6, lineHeight: 1, textShadow: `0 0 18px ${difficulty.color}80` }}>{target}</div>
              <div style={{ fontFamily: F.display, fontSize: 9, color: C.textFaint, letterSpacing: '0.25em', marginTop: 4 }}>{calcTier(target).name.toUpperCase()}</div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <input type="range" min={minTarget} max={maxTarget} value={target} onChange={e => updateProfile({ ovrTarget: Number(e.target.value) })} style={{ width: '100%', accentColor: difficulty.color, height: 4 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              <span>+{minTarget - startingOVR}</span>
              <span>+{maxTarget - startingOVR}</span>
            </div>
          </div>
        </div>
        <div style={{
          background: `${difficulty.color}11`, border: `1px solid ${difficulty.color}55`,
          clipPath: smallAngleClip, padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            fontFamily: F.display, fontSize: 11, fontWeight: 700,
            color: difficulty.color, letterSpacing: '0.22em', textTransform: 'uppercase',
            padding: '4px 10px', border: `1px solid ${difficulty.color}`, clipPath: smallAngleClip,
          }}>{difficulty.label}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.textDim, flex: 1 }}>{difficulty.desc}</div>
        </div>
        {goals && (
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '14px 16px' }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>▸ stat goals</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px 14px' }}>
              {STAT_CODES.map(code => (
                <div key={code} style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontFamily: F.display, fontSize: 10, fontWeight: 700, color: C.textDim, letterSpacing: '0.15em', minWidth: 26 }}>{code}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textFaint }}>{startingStats[code]}</span>
                  <span style={{ color: C.textFaint, fontSize: 10 }}>→</span>
                  <span style={{ fontFamily: F.mono, fontSize: 11, color: C.cyan, fontWeight: 700 }}>{goals[code]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <OnbFooter onNext={onNext} onBack={onBack} nextLabel="▸ commit" />
    </>
  );
}

function StepLetter({ profile, startingOVR, onComplete, onBack }) {
  const [revealed, setRevealed] = useState(false);
  const [typedLines, setTypedLines] = useState(0);

  const projectedWeight = useMemo(() => {
    const w = Number(profile.weight);
    const ovrDelta = profile.ovrTarget - startingOVR;
    const weightGain = ovrDelta <= 12 ? 3 : ovrDelta <= 20 ? 5 : 7;
    return Math.round((w + weightGain) * 10) / 10;
  }, [profile.weight, profile.ovrTarget, startingOVR]);

  const lines = useMemo(() => [
    `Прошло 84 дня. Я смотрю на тебя из будущего.`,
    ``,
    `Я на ${projectedWeight} кг. Я был на ${profile.weight} кг.`,
    `Я ${calcTier(profile.ovrTarget).name.toUpperCase()} ${profile.ovrTarget}. Я был ${calcTier(startingOVR).name.toUpperCase()} ${startingOVR}.`,
    ``,
    `Я не сорвался, потому что ты не сорвался.`,
    `Я не сдался, потому что ты не сдался.`,
    ``,
    `${profile.name || 'Агент'}, начни.`,
  ], [profile.name, profile.weight, projectedWeight, profile.ovrTarget, startingOVR]);

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
      <OnbHeader subtitle="step 06 · cutscene" title="A Letter from You" accent={C.cyan} />
      <div style={{ padding: '32px 22px 0', flex: 1 }}>
        <div style={{
          background: '#000', border: `1px solid ${C.cyanBorder}`,
          clipPath: angleClip, padding: '28px 24px', minHeight: 320,
          boxShadow: `0 0 28px rgba(0, 229, 255, 0.15)`,
        }}>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: C.cyan, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 18, opacity: revealed ? 1 : 0, transition: 'opacity 0.5s' }}>
            ▸ incoming :: future_self · 84d
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{
              fontFamily: F.body, fontSize: 14, color: C.text, lineHeight: 1.8,
              opacity: i < typedLines ? 1 : 0,
              transform: i < typedLines ? 'translateY(0)' : 'translateY(4px)',
              transition: 'all 0.5s ease',
              minHeight: line === '' ? 8 : 'auto',
              fontStyle: line === '' ? 'normal' : 'italic',
              letterSpacing: '0.02em',
            }}>{line || '\u00A0'}</div>
          ))}
          {!allTyped && (
            <div style={{
              display: 'inline-block', width: 8, height: 16,
              background: C.cyan, marginTop: 4,
              animation: 'blink 0.8s infinite',
            }} />
          )}
        </div>
        <div style={{
          marginTop: 16, fontFamily: F.mono, fontSize: 9, color: C.textFaint,
          letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center',
          opacity: allTyped ? 1 : 0, transition: 'opacity 0.6s ease',
        }}>▸ message persists in your archive</div>
      </div>
      <div style={{ padding: '20px 18px 32px', borderTop: `1px solid ${C.border}`, background: C.bg, display: 'flex', gap: 8 }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: `1px solid ${C.border}`,
          color: C.textDim, padding: '14px 18px',
          fontFamily: F.display, fontSize: 11, fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          cursor: 'pointer', clipPath: smallAngleClip,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowLeft size={14} strokeWidth={2} />
        </button>
        <button onClick={onComplete} disabled={!allTyped} style={{
          flex: 1,
          background: allTyped ? C.yellow : C.surface,
          color: allTyped ? C.bg : C.textFaint,
          border: 'none', padding: '14px',
          fontFamily: F.display, fontSize: 12, fontWeight: 700,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          cursor: allTyped ? 'pointer' : 'not-allowed',
          clipPath: smallAngleClip,
          boxShadow: allTyped ? `0 0 16px ${C.yellowGlow}` : 'none',
          transition: 'all 0.3s',
        }}>{allTyped ? '▸ begin campaign' : '◌ reading...'}</button>
      </div>
    </>
  );
}

// ============== TODAY SCREEN ==============
function TodayScreen({ state, currentDay, missions, onMissionClick }) {
  const [revealed, setRevealed] = useState(false);
  const [animXP, setAnimXP] = useState(0);

  const totalXP = missions.filter(m => m.done).reduce((s, m) => s + m.xp, 0);
  const totalPossible = missions.reduce((s, m) => s + m.xp, 0);
  const xpToNext = 200;
  const pct = Math.min(100, (totalXP / xpToNext) * 100);
  const completedCount = missions.filter(m => m.done).length;
  const chapter = getChapterByDay(currentDay);
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
    if (currentDay === 1) return 'Старт кампании. Сегодня замеряем стартовые точки — без них прогресс не виден. Тренировки начнутся со 2-го дня.';
    if (isBossDay) return `Конец главы ${chapter.romanNum}. Boss day — переснимаем фото, перемеряем вес, тестируем рекорды. Сравниваем с прошлым замером.`;
    const dow = (currentDay - 1) % 7;
    if (dow === 0) return 'Понедельник. Старт недельного цикла. Сегодня основная тренировка — выложись по максимуму.';
    if (dow === 6) return 'Воскресенье. Лёгкое кардио и восстановление.';
    return `День ${currentDay}. Глава ${chapter.romanNum} — ${chapter.display}. Прогрессивная перегрузка работает только с дисциплиной.`;
  }, [currentDay, chapter, isBossDay]);

  const heroTitle = useMemo(() => {
    if (currentDay === 1) return 'The Beginning';
    if (isBossDay) return `Boss · Ch. ${chapter.romanNum}`;
    const dow = (currentDay - 1) % 7;
    return ['Reset Day', 'Push Day', 'Pull Day', 'Cardio', 'Leg Day', 'Volume', 'Recovery'][dow];
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
            <div style={{ position: 'absolute', top: 8, left: 14, fontFamily: F.mono, fontSize: 8, letterSpacing: '0.25em', color: tier.color, textTransform: 'uppercase' }}>▸ player_card</div>
            <div style={{ position: 'absolute', top: 8, right: 14, fontFamily: F.mono, fontSize: 8, letterSpacing: '0.25em', color: C.textFaint, textTransform: 'uppercase' }}>{tier.name}_tier ◂</div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 14, marginBottom: 18 }}>
              <div>
                <div style={{ fontFamily: F.display, fontSize: 64, fontWeight: 700, color: tier.color, lineHeight: 0.9, letterSpacing: '-0.04em', textShadow: `0 0 18px ${tier.glow}`, transition: 'all 0.4s' }}>{ovr}</div>
                <div style={{ fontFamily: F.display, fontSize: 11, fontWeight: 500, color: tier.color, letterSpacing: '0.3em', marginTop: 2 }}>OVR</div>
                <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 700, color: C.text, letterSpacing: '0.18em', marginTop: 14 }}>HYP</div>
                <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textDim, letterSpacing: '0.15em', marginTop: 2, textTransform: 'uppercase' }}>{(state.profile?.name || 'agent').toLowerCase().slice(0, 14)}</div>
              </div>
              <div style={{
                width: 78, height: 78,
                background: `radial-gradient(circle at 30% 30%, ${C.yellowSoft}, transparent 70%), ${C.surface}`,
                border: `1px solid ${tier.color}55`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 38, fontWeight: 700,
                color: tier.color, textShadow: `0 0 14px ${tier.glow}`,
              }}>{(state.profile?.name || "М").charAt(0).toUpperCase()}</div>
            </div>

            <div style={{ height: 1, background: `linear-gradient(to right, transparent, ${tier.color}55, transparent)`, marginBottom: 16 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px 22px' }}>
              {STAT_CODES.map(code => {
                const value = state.stats[code];
                return (
                  <div key={code} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontFamily: F.display, fontSize: 11, fontWeight: 700, color: C.textDim, letterSpacing: '0.18em', minWidth: 28 }}>{code}</span>
                    <span style={{ fontFamily: F.mono, fontSize: 18, fontWeight: 700, color: C.text }}>{Math.round(value)}</span>
                    <div style={{ flex: 1, height: 2, background: C.surface, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${value}%`, background: value >= 60 ? C.yellow : (value >= 40 ? C.cyan : C.textFaint), transition: 'width 0.6s' }} />
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
            <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 700, color: m.done ? C.success : (m.special ? C.yellow : C.textDim), letterSpacing: '0.1em', width: 24, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.done ? <Check size={16} strokeWidth={3} /> : `[${m.num}]`}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: F.display, fontSize: 13, fontWeight: 600, color: m.done ? C.textFaint : C.text, letterSpacing: '0.06em', textDecoration: m.done ? 'line-through' : 'none' }}>{m.code}</div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.12em', marginTop: 3, textTransform: 'uppercase' }}>{m.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 700, color: m.done ? C.success : C.yellow }}>+{m.xp}</span>
              <span style={{ fontFamily: F.display, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', fontWeight: 600 }}>→{m.stat}</span>
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

// ============== AGENT SCREEN ==============
function AgentScreen({ state, currentDay, onReset }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { setTimeout(() => setRevealed(true), 50); }, []);

  const ovr = calcOVR(state.stats);
  const tier = calcTier(ovr);
  const goals = state.goals || Object.fromEntries(STAT_CODES.map(c => [c, state.stats[c] + 20]));
  const radarData = STAT_CODES.map(code => ({ stat: code, current: state.stats[code], goal: goals[code] }));

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
            <div style={{ position: 'absolute', top: 8, left: 14, fontFamily: F.mono, fontSize: 8, letterSpacing: '0.25em', color: tier.color, textTransform: 'uppercase' }}>▸ agent_file :: active</div>
            <div style={{ position: 'absolute', top: 8, right: 14, fontFamily: F.mono, fontSize: 8, letterSpacing: '0.25em', color: C.textFaint, textTransform: 'uppercase' }}>id_0001 ◂</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16, marginBottom: 8 }}>
              <div style={{
                width: 92, height: 92,
                background: `radial-gradient(circle at 30% 30%, ${tier.color}22, transparent 70%), ${C.surface}`,
                border: `1px solid ${tier.color}55`,
                clipPath: smallAngleClip,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: F.display, fontSize: 46, fontWeight: 700,
                color: tier.color, textShadow: `0 0 16px ${tier.glow}`,
                flexShrink: 0,
              }}>{(state.profile?.name || "М").charAt(0).toUpperCase()}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: F.display, fontSize: 56, fontWeight: 700, color: tier.color, lineHeight: 0.9, letterSpacing: '-0.04em', textShadow: `0 0 16px ${tier.glow}` }}>{ovr}</div>
                  <div style={{ fontFamily: F.display, fontSize: 11, fontWeight: 500, color: tier.color, letterSpacing: '0.3em' }}>OVR</div>
                </div>
                <div style={{ fontFamily: F.display, fontSize: 14, fontWeight: 700, color: C.text, letterSpacing: '0.12em', marginTop: 6 }}>{(state.profile?.name || 'AGENT').toUpperCase()}</div>
                <div style={{ display: 'inline-block', marginTop: 8, fontFamily: F.mono, fontSize: 9, color: tier.color, letterSpacing: '0.18em', textTransform: 'uppercase', border: `1px solid ${tier.color}55`, padding: '3px 8px' }}>tier · {tier.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SectionHeader sub="lifetime">▸ career_data</SectionHeader>
      <div style={{ padding: '0 18px', opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 0.25s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { label: 'TOTAL_XP', value: state.totalXP.toString().padStart(6, '0'), color: C.yellow },
            { label: 'DAY_OF_84', value: String(currentDay).padStart(3, '0'), color: C.cyan },
            { label: 'DAYS_DONE', value: String(completedDays).padStart(3, '0'), color: C.success },
            { label: 'ACHIEVEMENTS', value: `${unlockedCount}/8`, color: C.text },
          ].map(s => (
            <div key={s.label} style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '12px 14px' }}>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{s.label}</div>
              <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: s.color, marginTop: 4 }}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <SectionHeader sub="6 attrs · current vs goal">▸ attribute_matrix</SectionHeader>
      </div>
      <div style={{ margin: '0 18px', background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '4px 4px 16px', opacity: revealed ? 1 : 0, transition: 'opacity 0.7s ease 0.4s' }}>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 20, right: 35, bottom: 10, left: 35 }}>
              <PolarGrid stroke={C.border} strokeWidth={0.5} gridType="polygon" />
              <PolarAngleAxis dataKey="stat" tick={{ fill: C.yellow, fontFamily: F.display, fontSize: 12, fontWeight: 700, letterSpacing: 2 }} />
              <Radar name="goal" dataKey="goal" stroke={C.cyan} fill={C.cyan} fillOpacity={0.04} strokeWidth={1} strokeDasharray="3 3" />
              <Radar name="current" dataKey="current" stroke={C.yellow} fill={C.yellow} fillOpacity={0.22} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 2, background: C.yellow, boxShadow: `0 0 4px ${C.yellowGlow}` }} />
            <span style={{ color: C.yellow }}>current</span>
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
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.textFaint, letterSpacing: '0.18em', marginTop: 4, textTransform: 'uppercase' }}>chapter {getChapterByDay(currentDay).romanNum.toLowerCase()} :: {getChapterByDay(currentDay).name}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: F.mono, fontSize: 9, color: C.success, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success }} />
            in_progress
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          {['I', 'II', 'III', 'IV'].map((ch, i) => {
            const isCurrent = getChapterByDay(currentDay).idx === i;
            const isPast = getChapterByDay(currentDay).idx > i;
            return (
              <React.Fragment key={ch}>
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
              </React.Fragment>
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

// ============== STORY SCREEN ==============
function StoryScreen({ state, currentDay }) {
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
            const ch = getChapterByDay(d);
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
            { color: C.success, label: 'completed' },
            { color: C.yellow, label: 'current' },
            { color: C.borderBright, label: 'partial' },
            { color: C.magenta, label: '★ boss day' },
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
          const isCurrent = getChapterByDay(currentDay).idx === i;
          const isPast = getChapterByDay(currentDay).idx > i;
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

// ============== APP ROOT ==============
function App() {
  const [view, setView] = useState('today');
  const [state, setState] = useState(getInitialState);
  const [currentDay, setCurrentDay] = useState(() => {
    const s = getInitialState();
    return s ? computeCurrentDay(s.startDate) : 1;
  });
  const [openMissionId, setOpenMissionId] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleOnboardingComplete = (newState) => {
    setState(newState);
    setCurrentDay(computeCurrentDay(newState.startDate));
  };

  const dayKey = String(currentDay);
  const dayData = state?.daysData?.[dayKey];
  const missions = dayData?.missions || [];
  const openMission = openMissionId ? missions.find(m => m.id === openMissionId) : null;

  useEffect(() => {
    if (!state) return;
    if (!state.daysData[dayKey]) {
      const newMissions = generateMissionsForDay(currentDay);
      setState(s => {
        const newState = {
          ...s,
          daysData: { ...s.daysData, [dayKey]: { missions: newMissions, xpEarned: 0, completed: false } },
        };
        saveState(newState);
        return newState;
      });
    }
    // eslint-disable-next-line
  }, [currentDay, state]);

  useEffect(() => {
    if (!state) return;
    const interval = setInterval(() => {
      const newDay = computeCurrentDay(state.startDate);
      if (newDay !== currentDay) setCurrentDay(newDay);
    }, 60000);
    return () => clearInterval(interval);
  }, [state, currentDay]);

  // ===== Render onboarding if no state =====
  if (!state) {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Geist:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
          * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
          @keyframes scan { 0% { transform: translateY(-20px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
          @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
          input::placeholder, textarea::placeholder { color: ${C.textFaint}; }
          input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
          input[type=number] { -moz-appearance: textfield; }
        `}</style>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </>
    );
  }

  const handleMissionClick = (missionId) => {
    setOpenMissionId(missionId);
  };

  const handleMissionComplete = (data) => {
    setState(s => {
      const day = s.daysData[dayKey];
      if (!day) return s;

      const mission = day.missions.find(m => m.id === openMissionId);
      if (!mission || mission.done) return s;

      const updatedMissions = day.missions.map(m =>
        m.id === openMissionId ? { ...m, done: true, data, completedAt: new Date().toISOString() } : m
      );
      const xpDelta = mission.xp;
      const statDelta = mission.xp * XP_TO_STAT_RATIO;
      const allDone = updatedMissions.every(m => m.done);

      const newState = {
        ...s,
        daysData: {
          ...s.daysData,
          [dayKey]: { ...day, missions: updatedMissions, xpEarned: day.xpEarned + xpDelta, completed: allDone },
        },
        stats: { ...s.stats, [mission.stat]: Math.max(0, Math.min(99, s.stats[mission.stat] + statDelta)) },
        totalXP: s.totalXP + xpDelta,
      };
      saveState(newState);
      return newState;
    });
    setOpenMissionId(null);
  };

  const handleMissionAbort = () => {
    setOpenMissionId(null);
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.clear();  // belt-and-suspenders
    } catch (e) {}
    // Force full page reload — guarantees clean state, bypasses React state issues
    window.location.reload();
  };

  const navItems = [
    { id: 'today', Icon: Home, label: 'TODAY' },
    { id: 'story', Icon: MapIcon, label: 'STORY' },
    { id: 'agent', Icon: User, label: 'AGENT' },
    { id: 'cfg', Icon: Settings, label: 'CFG' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Geist:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
        @keyframes scan {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
        button:focus-visible { outline: 1px solid ${C.yellow}; outline-offset: 2px; }
        input::placeholder, textarea::placeholder { color: ${C.textFaint}; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: C.bg,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        color: C.text, fontFamily: F.body,
        display: 'flex', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div key={view} style={{
          position: 'absolute', left: 0, right: 0,
          height: 2, background: `linear-gradient(to bottom, transparent, ${C.yellow}, transparent)`,
          animation: 'scan 1.4s ease-out 1', opacity: 0.6,
          pointerEvents: 'none', zIndex: 100,
        }} />

        <div style={{
          width: '100%', maxWidth: 440, minHeight: '100vh',
          background: C.bgPanel, display: 'flex', flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{
            padding: '14px 18px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: F.mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success, animation: 'blink 2s infinite' }} />
              <span style={{ color: C.success }}>system online</span>
            </div>
            <div style={{ color: C.textFaint }}>hyp_protocol_v1</div>
            <div style={{ color: C.yellow }}>cycle {String(currentDay).padStart(3, '0')}/084</div>
          </div>

          <div key={view} style={{ display: 'flex', flexDirection: 'column' }}>
            {view === 'today' && <TodayScreen state={state} currentDay={currentDay} missions={missions} onMissionClick={handleMissionClick} />}
            {view === 'agent' && <AgentScreen state={state} currentDay={currentDay} onReset={handleReset} />}
            {view === 'story' && <StoryScreen state={state} currentDay={currentDay} />}
            {view === 'cfg' && (
              <div style={{ padding: '60px 22px', textAlign: 'center' }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 10 }}>module_offline</div>
                <div style={{ fontFamily: F.display, fontSize: 22, color: C.text, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Configuration</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, marginTop: 12, lineHeight: 1.6 }}>В очереди.</div>
              </div>
            )}
          </div>

          <div style={{ flex: 1, minHeight: 32 }} />

          <nav style={{
            borderTop: `1px solid ${C.border}`, background: C.bg,
            display: 'flex', justifyContent: 'space-around',
            padding: '14px 0 24px', position: 'relative',
          }}>
            {navItems.map(({ id, Icon, label }) => {
              const active = view === id;
              return (
                <button key={id} onClick={() => setView(id)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '4px 14px',
                  color: active ? C.yellow : C.textFaint,
                  fontFamily: F.display, position: 'relative',
                  transition: 'color 0.3s',
                }}>
                  {active && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 32, height: 2, background: C.yellow,
                      boxShadow: `0 0 8px ${C.yellowGlow}`,
                    }} />
                  )}
                  <Icon size={18} strokeWidth={1.8} />
                  <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em' }}>{label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {openMission && (
        <MissionDetail
          mission={openMission}
          onComplete={handleMissionComplete}
          onAbort={handleMissionAbort}
        />
      )}

      {showResetConfirm && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 300,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
        }}>
          <div style={{
            width: '100%', maxWidth: 380,
            background: C.bgCard,
            border: `1px solid ${C.danger}`,
            clipPath: angleClip,
            padding: '24px',
            boxShadow: `0 0 32px rgba(255, 77, 77, 0.4)`,
          }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, color: C.danger, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>
              ⚠ ▸ critical action
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
              Reset Campaign
            </h2>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 24 }}>
              Все данные, фото, метрики, прогресс — будут стёрты. Это действие необратимо.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowResetConfirm(false)} style={{
                flex: 1, background: C.surface,
                border: `1px solid ${C.border}`, color: C.text,
                padding: '14px', fontFamily: F.display, fontSize: 12, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                cursor: 'pointer', clipPath: smallAngleClip,
              }}>cancel</button>
              <button onClick={confirmReset} style={{
                flex: 1, background: C.danger, border: 'none', color: '#fff',
                padding: '14px', fontFamily: F.display, fontSize: 12, fontWeight: 700,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                cursor: 'pointer', clipPath: smallAngleClip,
                boxShadow: `0 0 16px rgba(255, 77, 77, 0.5)`,
              }}>▸ confirm reset</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============== MOUNT ==============
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
