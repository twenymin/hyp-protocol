// ============== GLOBAL DEPENDENCIES (loaded via CDN in index.html) ==============
const { useState, useEffect, useMemo, useRef } = React;
const { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } = Recharts;

// ============== INLINE SVG ICONS (replaces lucide-react) ==============
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
// GTA Vice City + Miami neon + FC 26 tier metallics
const C = {
  bg: '#0F0B1A',
  bgPanel: '#15101F',
  bgCard: '#1B1428',
  surface: '#251B36',
  surfaceLight: '#2F2342',
  border: '#3A2D52',
  borderBright: '#4F3D6E',

  pink: '#FF2E63', pinkGlow: 'rgba(255, 46, 99, 0.55)',
  pinkSoft: 'rgba(255, 46, 99, 0.10)', pinkBorder: 'rgba(255, 46, 99, 0.40)',
  teal: '#00D9C0', tealGlow: 'rgba(0, 217, 192, 0.45)',
  tealSoft: 'rgba(0, 217, 192, 0.10)', tealBorder: 'rgba(0, 217, 192, 0.40)',

  bronze: '#C77D4A', bronzeGlow: 'rgba(199, 125, 74, 0.55)',
  silver: '#D8DCE3', silverGlow: 'rgba(216, 220, 227, 0.55)',
  gold: '#F2C94C', goldGlow: 'rgba(242, 201, 76, 0.65)',

  text: '#F2EBD9', textDim: '#A89FB5', textFaint: '#6F6580',
  success: '#00D9A0', danger: '#FF4757',

  // Legacy aliases — point to new palette so existing code keeps working
  yellow: '#FF2E63', yellowGlow: 'rgba(255, 46, 99, 0.55)',
  yellowSoft: 'rgba(255, 46, 99, 0.10)', yellowBorder: 'rgba(255, 46, 99, 0.40)',
  cyan: '#00D9C0', cyanSoft: 'rgba(0, 217, 192, 0.10)', cyanBorder: 'rgba(0, 217, 192, 0.40)',
  magenta: '#FF2E63', magentaSoft: 'rgba(255, 46, 99, 0.10)',
};
const F = {
  display: '"Bebas Neue", "Anton", "Arial Narrow", sans-serif',
  body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"IBM Plex Mono", "JetBrains Mono", "SF Mono", monospace',
};
const angleClip = 'polygon(0 14px, 14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px))';
const smallAngleClip = 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))';

// ============== GAME LOGIC ==============
const STAT_CODES = ['СИЛ', 'ВЫН', 'МАС', 'ПИТ', 'ВОС', 'ФОР'];
const STAT_LABELS = {
  'СИЛ': 'сила',
  'ВЫН': 'выносливость',
  'МАС': 'масса',
  'ПИТ': 'питание',
  'ВОС': 'восстановление',
  'ФОР': 'форма',
};

const calcOVR = (stats) => {
  if (!stats) return null;
  const values = STAT_CODES.map(c => stats[c]).filter(v => typeof v === 'number');
  if (values.length === 0) return null;
  return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
};

const calcTier = (ovr) => {
  if (ovr === null || ovr === undefined) return { name: 'unranked', display: 'НЕТ ОЦЕНКИ', color: C.textDim, glow: 'rgba(168, 159, 181, 0.35)' };
  if (ovr >= 80) return { name: 'icon', display: 'ИКОНА', color: C.pink, glow: C.pinkGlow };
  if (ovr >= 65) return { name: 'gold', display: 'ЗОЛОТО', color: C.gold, glow: C.goldGlow };
  if (ovr >= 50) return { name: 'silver', display: 'СЕРЕБРО', color: C.silver, glow: C.silverGlow };
  return { name: 'bronze', display: 'БРОНЗА', color: C.bronze, glow: C.bronzeGlow };
};

const XP_TO_STAT_RATIO = 0.005;

// ============== ONBOARDING CALIBRATION ==============
// New philosophy: NO OVR until Day 1 measurement is complete.
// Onboarding only collects basic bio. OVR is calculated from real Day 1 data.

// Body fat self-assessment levels with separate scales for male/female
// Visual silhouettes shown to user; they pick the closest match
const BODY_FAT_LEVELS = {
  male: [
    { id: 'shredded', label: 'Сухой', range: '7-10%', value: 8, desc: 'Видны вены, очень рельефный пресс' },
    { id: 'athletic', label: 'Атлетичный', range: '11-14%', value: 12, desc: 'Чёткий пресс, хорошая прорисовка мышц' },
    { id: 'fit', label: 'Фит', range: '15-18%', value: 16, desc: 'Виден пресс, формы заметны' },
    { id: 'average', label: 'Средний', range: '19-23%', value: 21, desc: 'Пресс не виден, форма мягче' },
    { id: 'soft', label: 'Мягкий', range: '24-28%', value: 26, desc: 'Заметный живот, рыхлые формы' },
    { id: 'overweight', label: 'Полный', range: '29-35%+', value: 32, desc: 'Выраженный лишний вес' },
  ],
  female: [
    { id: 'shredded', label: 'Сухая', range: '14-17%', value: 15, desc: 'Очень рельефная, спортсменка' },
    { id: 'athletic', label: 'Атлетичная', range: '18-21%', value: 19, desc: 'Чёткий пресс, тренированная' },
    { id: 'fit', label: 'Фит', range: '22-25%', value: 23, desc: 'Виден пресс, подтянутая' },
    { id: 'average', label: 'Средняя', range: '26-30%', value: 28, desc: 'Здоровая женская форма' },
    { id: 'soft', label: 'Мягкая', range: '31-35%', value: 33, desc: 'Мягкие формы, плавные линии' },
    { id: 'overweight', label: 'Полная', range: '36-42%+', value: 38, desc: 'Выраженный лишний вес' },
  ],
  nb: [
    { id: 'shredded', label: 'Сухой', range: '10-13%', value: 11, desc: 'Очень рельефный, минимум жира' },
    { id: 'athletic', label: 'Атлетичный', range: '14-17%', value: 15, desc: 'Тренированный, виден пресс' },
    { id: 'fit', label: 'Фит', range: '18-21%', value: 19, desc: 'Подтянутый, хорошая форма' },
    { id: 'average', label: 'Средний', range: '22-26%', value: 24, desc: 'Здоровая средняя форма' },
    { id: 'soft', label: 'Мягкий', range: '27-31%', value: 29, desc: 'Мягкие формы' },
    { id: 'overweight', label: 'Полный', range: '32-38%+', value: 35, desc: 'Выраженный лишний вес' },
  ],
};

// Threshold for switching between MASS and RECOMP modes (% body fat)
const MODE_THRESHOLDS = { male: 18, female: 25, nb: 22 };

// Calculate OVR + 6 stats from Day 1 measurement data
const calibrateFromDay1 = (profile, day1Data) => {
  // day1Data contains: weight, bodyFat (%), measurements, maxPushups, plankSec
  const { age, gender, height, weight: onboardWeight } = profile;
  const { weight = onboardWeight, bodyFat = 20, maxPushups = 0, plankSec = 0 } = day1Data;

  // Lean body mass (kg)
  const lbm = weight * (1 - bodyFat / 100);

  // STR: pushups, normalized by bodyweight ratio
  // 0 pushups → 15, 50+ → 75
  const strBase = Math.min(75, 15 + maxPushups * 1.2);
  const ageMod = age <= 22 ? -2 : age <= 35 ? 0 : age <= 45 ? -3 : -8;

  // END: plank time + base
  // 0 sec → 25, 180+ sec → 70
  const endBase = Math.min(70, 25 + plankSec / 4);

  // MAS: from LBM relative to height (FFMI-inspired)
  const heightM = height / 100;
  const ffmi = lbm / (heightM * heightM);
  // FFMI 17 (untrained) → 30, FFMI 20 (good) → 55, FFMI 23 (advanced) → 75, 25+ (elite) → 85
  const masBase = Math.max(20, Math.min(85, (ffmi - 15) * 8 + 25));

  // FRM: blend of body fat (lower = better up to ~12%) and LBM ratio
  const idealBF = gender === 'female' ? 22 : gender === 'male' ? 14 : 18;
  const bfDelta = Math.abs(bodyFat - idealBF);
  const frmBase = Math.max(20, 75 - bfDelta * 1.5);

  // PIT (nutrition): always low at start — it's a learned skill
  const pitBase = 25;

  // VOS (recovery): age-dependent base
  const vosBase = age <= 25 ? 55 : age <= 35 ? 50 : age <= 45 ? 42 : 35;

  return {
    'СИЛ': Math.max(15, Math.min(85, Math.round(strBase + ageMod))),
    'ВЫН': Math.max(15, Math.min(85, Math.round(endBase + ageMod))),
    'МАС': Math.max(20, Math.min(85, Math.round(masBase + ageMod))),
    'ПИТ': pitBase,
    'ВОС': vosBase,
    'ФОР': Math.max(20, Math.min(85, Math.round(frmBase + ageMod))),
  };
};

// Determine campaign mode (MASS or RECOMP) from gender + bodyFat
const determineCampaignMode = (gender, bodyFat) => {
  const threshold = MODE_THRESHOLDS[gender] || 22;
  return bodyFat < threshold ? 'mass' : 'recomp';
};

// Calculate stat goals after Day 1 — auto, not user-chosen
const calibrateGoals = (startingStats, mode) => {
  // Mass mode: focus on STR, MAS, ВОС
  // Recomp mode: focus on ФОР, ПИТ, ВЫН
  const ambitionPerStat = {
    mass: { 'СИЛ': 18, 'ВЫН': 10, 'МАС': 22, 'ПИТ': 25, 'ВОС': 18, 'ФОР': 12 },
    recomp: { 'СИЛ': 14, 'ВЫН': 18, 'МАС': 12, 'ПИТ': 30, 'ВОС': 18, 'ФОР': 22 },
  };
  const ambitions = ambitionPerStat[mode];
  return Object.fromEntries(
    STAT_CODES.map(code => [
      code,
      Math.min(90, startingStats[code] + ambitions[code]),
    ])
  );
};

// ============== MISSION TEMPLATES ==============
// inputType determines which detail UI is shown
// exercises is for workout-type missions

const DAY_1_MISSIONS = [
  {
    code: 'BUY_TAPE_MEASURE',
    title: 'Купить сантиметровую ленту',
    desc: 'Швейная лента на 150 см. Продаётся в любой галантерее или на маркетплейсах за 100-300₽. Это первая экипировка героя — без неё дальше не сможешь.',
    xp: 50, stat: 'ФОР', special: true,
    inputType: 'checkbox',
    confirmLabel: 'Лента у меня в руках',
  },
  {
    code: 'BASELINE_WEIGHT',
    title: 'Замер веса',
    desc: 'Утром, натощак, после туалета. Фиксируем точку отсчёта.',
    xp: 50, stat: 'МАС',
    inputType: 'metric', metric: 'вес', unit: 'кг',
    range: { min: 30, max: 250 },
  },
  {
    code: 'BODY_METRICS',
    title: 'Замер обхватов',
    desc: '5 точек тела. Лента плотно, но не давит. Делать утром перед едой.',
    xp: 200, stat: 'МАС',
    inputType: 'metrics',
    metrics: [
      { key: 'chest', label: 'грудь', unit: 'см', hint: 'на уровне сосков, на выдохе', range: { min: 60, max: 180 } },
      { key: 'arm', label: 'бицепс', unit: 'см', hint: 'правая рука, согнутая, в напряжении', range: { min: 20, max: 60 } },
      { key: 'waist', label: 'талия', unit: 'см', hint: 'на уровне пупка, не втягивая живот', range: { min: 50, max: 180 } },
      { key: 'thigh', label: 'бедро', unit: 'см', hint: 'середина бедра, расслабленное', range: { min: 35, max: 100 } },
      { key: 'shoulders', label: 'плечи', unit: 'см', hint: 'самая широкая часть, через дельты', range: { min: 80, max: 180 } },
    ],
  },
  {
    code: 'BODY_FAT_ESTIMATE',
    title: 'Оценка процента жира',
    desc: 'Без точного устройства невозможно измерить. Выбери силуэт, который больше всего похож на тебя в зеркале. Точность ±3% — нормально для старта.',
    xp: 100, stat: 'ФОР',
    inputType: 'bodyfat',
  },
  {
    code: 'PHOTO_SCAN_3X',
    title: 'Фото в трёх ракурсах',
    desc: 'Фронт, бок, спина. Стоя ровно, расслабленно, при дневном свете. Фото хранятся только на твоём телефоне.',
    xp: 150, stat: 'ФОР',
    inputType: 'photo', photoCount: 3,
    angles: ['фронт', 'бок', 'спина'],
  },
  {
    code: 'PUSHUP_TEST',
    title: 'Тест отжиманий',
    desc: 'Максимум отжиманий за один подход. Без читинга — корпус прямой, грудь опускается до пола. Если можешь только с колен — считай с колен.',
    xp: 200, stat: 'СИЛ',
    inputType: 'metric', metric: 'отжимания макс', unit: 'раз',
    range: { min: 0, max: 200 },
  },
  {
    code: 'PLANK_TEST',
    title: 'Тест планки',
    desc: 'Максимум секунд в планке на локтях. Корпус прямой, ягодицы не задраны. Останавливайся когда форма ломается.',
    xp: 150, stat: 'ВЫН',
    inputType: 'timer', metric: 'планка', unit: 'сек',
    range: { min: 0, max: 600 },
  },
  {
    code: 'CALIBRATION_COMPLETE',
    title: 'Завершить калибровку',
    desc: 'Подтверди готовность. После этого игра рассчитает твой стартовый OVR и определит план: набор массы или рекомпозиция.',
    xp: 100, stat: 'ФОР', special: true,
    inputType: 'checkbox',
    confirmLabel: 'Я готов начать игру',
    requiresAllOthersDone: true,
  },
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
      { code: 'PUSH_DAY_A', desc: 'тренировка · грудь+плечи+трицепс', xp: 200, stat: 'СИЛ', inputType: 'workout' },
      { code: 'PULL_DAY_A', desc: 'тренировка · спина+бицепс', xp: 200, stat: 'СИЛ', inputType: 'workout' },
      { code: 'LEG_DAY_A', desc: 'тренировка · ноги+ягодицы+икры', xp: 220, stat: 'МАС', inputType: 'workout' },
      { code: 'FORM_DRILL', desc: 'техника · видеоразбор', xp: 120, stat: 'ФОР', inputType: 'checkbox' },
    ],
    nutrition: [
      { code: 'PROTEIN_TRACK', desc: 'лог · 1.6г/кг белка', xp: 100, stat: 'ПИТ', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PHOTO', desc: 'лог · фото завтрака', xp: 60, stat: 'ПИТ', inputType: 'photo', photoCount: 1, angles: ['meal'] },
      { code: 'CAL_SURPLUS', desc: 'лог · +300 ккал', xp: 80, stat: 'ПИТ', inputType: 'metric', metric: 'calories', unit: 'kcal' },
    ],
    recovery: [
      { code: 'SLEEP_7H+', desc: 'восстановление · сон 7+ часов', xp: 100, stat: 'ВОС', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'STRETCH_15:00', desc: 'восстановление · растяжка', xp: 60, stat: 'ВОС', inputType: 'cardio', target: { duration: 15, unit: 'мин' } },
    ],
    cardio: [
      { code: 'WALK_45:00', desc: 'кардио · зона 1-2', xp: 100, stat: 'ВЫН', inputType: 'cardio', target: { duration: 45, unit: 'мин' } },
    ],
  },
  volume: {
    workouts: [
      { code: 'PUSH_DAY_B', desc: 'тренировка · жим, объём', xp: 240, stat: 'СИЛ', inputType: 'workout' },
      { code: 'PULL_DAY_B', desc: 'тренировка · тяга, объём', xp: 240, stat: 'СИЛ', inputType: 'workout' },
      { code: 'LEG_DAY_B', desc: 'тренировка · ноги, объём', xp: 260, stat: 'МАС', inputType: 'workout' },
      { code: 'ARMS_FOCUS', desc: 'тренировка · руки', xp: 180, stat: 'МАС', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_TRACK', desc: 'лог · 1.8г/кг белка', xp: 110, stat: 'ПИТ', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PHOTO_3X', desc: 'лог · все приёмы пищи', xp: 120, stat: 'ПИТ', inputType: 'photo', photoCount: 3, angles: ['breakfast', 'lunch', 'dinner'] },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'восстановление · сон 8+ часов', xp: 120, stat: 'ВОС', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'COLD_SHOWER', desc: 'восстановление · холод', xp: 80, stat: 'ВОС', inputType: 'cardio', target: { duration: 3, unit: 'мин' } },
    ],
    cardio: [
      { code: 'INCLINE_WALK', desc: 'кардио · зона 2', xp: 120, stat: 'ВЫН', inputType: 'cardio', target: { duration: 30, unit: 'мин' } },
    ],
  },
  intensity: {
    workouts: [
      { code: 'PUSH_HEAVY', desc: 'тренировка · тяжёлый жим 5x5', xp: 280, stat: 'СИЛ', inputType: 'workout' },
      { code: 'PULL_HEAVY', desc: 'тренировка · тяжёлая тяга 5x5', xp: 280, stat: 'СИЛ', inputType: 'workout' },
      { code: 'LEG_HEAVY', desc: 'тренировка · присед+тяга, тяжёлые', xp: 300, stat: 'МАС', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_2G', desc: 'лог · 2.0г/кг белка', xp: 130, stat: 'ПИТ', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'CARB_TIMING', desc: 'лог · до/после тренировки', xp: 100, stat: 'ПИТ', inputType: 'checkbox' },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'восстановление · сон 8+ часов', xp: 130, stat: 'ВОС', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'DELOAD_DAY', desc: 'восстановление · активный отдых', xp: 100, stat: 'ВОС', inputType: 'cardio', target: { duration: 20, unit: 'мин' } },
    ],
    cardio: [
      { code: 'HIIT_15:00', desc: 'кардио · зона 4', xp: 150, stat: 'ВЫН', inputType: 'cardio', target: { duration: 15, unit: 'мин' } },
    ],
  },
  consolidation: {
    workouts: [
      { code: 'PUSH_PEAK', desc: 'тренировка · пиковый жим', xp: 300, stat: 'СИЛ', inputType: 'workout' },
      { code: 'PULL_PEAK', desc: 'тренировка · пиковая тяга', xp: 300, stat: 'СИЛ', inputType: 'workout' },
      { code: 'LEG_PEAK', desc: 'тренировка · пиковые ноги', xp: 320, stat: 'МАС', inputType: 'workout' },
    ],
    nutrition: [
      { code: 'PROTEIN_2G', desc: 'лог · 2.0г/кг белка', xp: 130, stat: 'ПИТ', inputType: 'metric', metric: 'protein', unit: 'g' },
      { code: 'MEAL_PREP', desc: 'лог · заготовка на неделю', xp: 150, stat: 'ПИТ', inputType: 'checkbox' },
    ],
    recovery: [
      { code: 'SLEEP_8H+', desc: 'восстановление · сон 8+ часов', xp: 140, stat: 'ВОС', inputType: 'metric', metric: 'sleep', unit: 'h' },
      { code: 'MOBILITY_30', desc: 'восстановление · 30 мин мобилити', xp: 110, stat: 'ВОС', inputType: 'cardio', target: { duration: 30, unit: 'мин' } },
    ],
    cardio: [
      { code: 'STEADY_30', desc: 'кардио · зона 2', xp: 130, stat: 'ВЫН', inputType: 'cardio', target: { duration: 30, unit: 'мин' } },
    ],
  },
};

const BOSS_DAYS = [21, 42, 63, 84];

const getChapterByDay = (day, mode = 'mass') => {
  const chapters = {
    mass: [
      { idx: 0, name: 'foundation', romanNum: 'I', display: 'ФУНДАМЕНТ' },
      { idx: 1, name: 'volume', romanNum: 'II', display: 'ОБЪЁМ' },
      { idx: 2, name: 'intensity', romanNum: 'III', display: 'ИНТЕНСИВНОСТЬ' },
      { idx: 3, name: 'consolidation', romanNum: 'IV', display: 'ЗАКРЕПЛЕНИЕ' },
    ],
    recomp: [
      { idx: 0, name: 'cleanse', romanNum: 'I', display: 'ОЧИЩЕНИЕ' },
      { idx: 1, name: 'forge', romanNum: 'II', display: 'ЗАКАЛКА' },
      { idx: 2, name: 'breakthrough', romanNum: 'III', display: 'ПРОРЫВ' },
      { idx: 3, name: 'transformation', romanNum: 'IV', display: 'ПРЕОБРАЖЕНИЕ' },
    ],
  };
  const set = chapters[mode] || chapters.mass;
  if (day <= 21) return set[0];
  if (day <= 42) return set[1];
  if (day <= 63) return set[2];
  return set[3];
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

const generateMissionsForDay = (day, mode = 'mass') => {
  if (day === 1) {
    return DAY_1_MISSIONS.map((m, i) => ({ ...m, num: String(i + 1).padStart(2, '0'), id: `d1_${i}`, done: false, data: null }));
  }
  if (BOSS_DAYS.includes(day)) {
    const ch = getChapterByDay(day, mode);
    return [
      { code: 'BOSS_PHOTO_SCAN', title: 'Босс · Фото сравнение', desc: 'Переснимаем фото в трёх ракурсах. Сравниваем с прошлым замером.', xp: 300, stat: 'ФОР', num: '01', id: `d${day}_boss1`, done: false, special: true, inputType: 'photo', photoCount: 3, angles: ['фронт', 'бок', 'спина'], data: null },
      { code: 'BOSS_WEIGH_IN', title: 'Босс · Контрольный вес', desc: 'Утром, натощак. Сравниваем дельту с прошлым замером.', xp: 200, stat: 'МАС', num: '02', id: `d${day}_boss2`, done: false, special: true, inputType: 'metric', metric: 'вес', unit: 'кг', range: { min: 30, max: 250 }, data: null },
      { code: 'BOSS_STRENGTH_TEST', title: 'Босс · Тест силы', desc: 'Записываем рабочие веса в базовых упражнениях.', xp: 400, stat: 'СИЛ', num: '03', id: `d${day}_boss3`, done: false, special: true, inputType: 'workout', data: null },
      { code: `CHAPTER_${ch.romanNum}_FINALE`, title: 'Босс · Итоги главы', desc: 'Запиши размышления. Это твоя глава, твой опыт.', xp: 500, stat: 'ФОР', num: '04', id: `d${day}_boss4`, done: false, special: true, inputType: 'text', prompt: 'Что ты узнал о себе за эти 21 день? Что будешь делать иначе?', data: null },
    ];
  }

  const ch = getChapterByDay(day, mode);
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
const BACKUP_KEY = 'hyp_protocol_v1_backup';
const SAVE_LOG_KEY = 'hyp_protocol_v1_log';

// Diagnostic log — last 20 events. Helps debug "data disappeared" reports.
const logSaveEvent = (kind, detail = '') => {
  try {
    const log = JSON.parse(localStorage.getItem(SAVE_LOG_KEY) || '[]');
    log.push({ t: Date.now(), kind, detail });
    while (log.length > 20) log.shift();
    localStorage.setItem(SAVE_LOG_KEY, JSON.stringify(log));
  } catch (e) {}
};

// Validate that a parsed state object is structurally usable.
// CRITICAL: stats CAN be null (during Day 1 calibration). Don't reject on that.
const isValidState = (s) => {
  if (!s || typeof s !== 'object') return false;
  if (!s.startDate) return false;
  if (!s.profile || typeof s.profile !== 'object') return false;
  if (!s.profile.name) return false;
  if (typeof s.daysData !== 'object') return false;
  // stats may legitimately be null during Day 1 calibration phase
  return true;
};

const getInitialState = () => {
  // Try main key first
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (isValidState(parsed)) {
        logSaveEvent('load_main_ok');
        return parsed;
      }
      logSaveEvent('load_main_invalid', JSON.stringify(parsed).slice(0, 100));
    }
  } catch (e) {
    logSaveEvent('load_main_err', String(e).slice(0, 100));
  }
  // Fallback to backup
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      const parsed = JSON.parse(backup);
      if (isValidState(parsed)) {
        logSaveEvent('load_backup_ok');
        return parsed;
      }
    }
  } catch (e) {
    logSaveEvent('load_backup_err', String(e).slice(0, 100));
  }
  logSaveEvent('load_none');
  return null;
};

// Module-level subscribers for save events. UI can subscribe to show toasts.
const saveListeners = new Set();
const subscribeSaveEvents = (fn) => {
  saveListeners.add(fn);
  return () => saveListeners.delete(fn);
};
const emitSaveEvent = (event) => {
  saveListeners.forEach(fn => { try { fn(event); } catch (e) {} });
};

const saveState = (state) => {
  if (!state) return false;
  const stateWithMeta = { ...state, _savedAt: Date.now() };
  let serialized;
  try {
    serialized = JSON.stringify(stateWithMeta);
  } catch (e) {
    logSaveEvent('serialize_err', String(e).slice(0, 100));
    emitSaveEvent({ ok: false, reason: 'serialize', error: e });
    return false;
  }

  // Estimate size in MB
  const sizeMB = (serialized.length / 1024 / 1024).toFixed(2);

  // Backup write — keep a second copy as safety net
  try {
    const previous = localStorage.getItem(STORAGE_KEY);
    if (previous) localStorage.setItem(BACKUP_KEY, previous);
  } catch (e) {
    // backup is best-effort
  }

  // Main write
  try {
    localStorage.setItem(STORAGE_KEY, serialized);
    logSaveEvent('save_ok', `${sizeMB}MB`);
    emitSaveEvent({ ok: true, size: serialized.length, savedAt: stateWithMeta._savedAt });
    return true;
  } catch (e) {
    // Quota exceeded is the most common cause — try cleanup
    const isQuota = e.name === 'QuotaExceededError' ||
                    String(e).includes('quota') || String(e).includes('Quota');
    logSaveEvent('save_err', `${isQuota ? 'QUOTA' : 'OTHER'}: ${String(e).slice(0, 80)}`);
    emitSaveEvent({ ok: false, reason: isQuota ? 'quota' : 'unknown', error: e, size: serialized.length });
    return false;
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

// Format save timestamp for toast: "14:23"
const formatSaveTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
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
        minHeight: '100dvh',
      }}>
        {/* Header */}
        <div style={{
          padding: 'calc(14px + env(safe-area-inset-top)) 18px 14px 18px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <button onClick={onAbort} style={{
            background: 'transparent', border: `1px solid ${C.border}`,
            color: C.textDim, padding: '12px',
            cursor: 'pointer', clipPath: smallAngleClip,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minWidth: 48, minHeight: 48,
          }}>
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase' }}>МИССИЯ [{mission.num}]</div>
            <div style={{ fontFamily: F.display, fontSize: 18, fontWeight: 400, color: C.text, letterSpacing: '0.04em', marginTop: 2, textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{mission.title || mission.code}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.pink }}>+{mission.xp}</span>
            <span style={{ fontFamily: F.display, fontSize: 11, color: C.textFaint, letterSpacing: '0.18em' }}>→{mission.stat}</span>
          </div>
        </div>

        {/* Description */}
        <div style={{ padding: '20px 22px 24px', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>▸ ОПИСАНИЕ</div>
          <div style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, letterSpacing: '0.01em', lineHeight: 1.6 }}>{mission.desc}</div>
        </div>

        {/* Input area */}
        <div style={{ flex: 1, padding: '24px 18px' }}>
          {mission.inputType === 'workout' && <WorkoutInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'cardio' && <CardioInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'metric' && <MetricInput mission={mission} data={data} setData={setData} profile={state?.profile} />}
          {mission.inputType === 'metrics' && <MetricsInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'photo' && <PhotoInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'checkbox' && <CheckboxInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'text' && <TextInput mission={mission} data={data} setData={setData} />}
          {mission.inputType === 'bodyfat' && <BodyFatInput mission={mission} data={data} setData={setData} profile={state?.profile} />}
          {mission.inputType === 'timer' && <TimerInput mission={mission} data={data} setData={setData} />}
        </div>

        {/* Bottom action */}
        <div style={{ padding: '16px 18px calc(16px + env(safe-area-inset-bottom))', borderTop: `1px solid ${C.border}`, background: C.bg }}>
          <button onClick={handleComplete} disabled={!canComplete} style={{
            width: '100%',
            background: canComplete ? C.pink : C.surface,
            color: canComplete ? C.bg : C.textFaint,
            border: 'none',
            padding: '18px',
            fontFamily: F.display,
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: canComplete ? 'pointer' : 'not-allowed',
            clipPath: smallAngleClip,
            boxShadow: canComplete ? `0 0 20px ${C.pinkGlow}` : 'none',
            transition: 'all 0.3s',
            minHeight: 52,
          }}>
            {canComplete ? '▸ Миссия Завершена' : '◌ Заполни Все Поля'}
          </button>
        </div>
      </div>
    </div>
  );
}

const getDefaultData = (mission) => {
  switch (mission.inputType) {
    case 'workout':
      const exercises = WORKOUT_TEMPLATES[mission.code]?.exercises || ['Упражнение 1', 'Упражнение 2', 'Упражнение 3'];
      return {
        exercises: exercises.map(name => ({
          name,
          sets: [{ weight: '', reps: '' }, { weight: '', reps: '' }, { weight: '', reps: '' }],
        })),
      };
    case 'cardio':
      return { duration: '', distance: '', notes: '' };
    case 'metric':
    case 'timer':
      return { value: '' };
    case 'metrics':
      return { values: Object.fromEntries(mission.metrics.map(m => [m.key, ''])) };
    case 'photo':
      return { photos: Array(mission.photoCount).fill(null) };
    case 'checkbox':
      return { checked: false };
    case 'text':
      return { text: '' };
    case 'bodyfat':
      return { level: null, value: null };
    default:
      return {};
  }
};

const inRange = (val, range) => {
  if (!range) return true;
  const n = Number(val);
  if (!Number.isFinite(n)) return false;
  if (range.min !== undefined && n < range.min) return false;
  if (range.max !== undefined && n > range.max) return false;
  return true;
};

const validateData = (mission, data) => {
  switch (mission.inputType) {
    case 'workout':
      return data.exercises?.some(ex => ex.sets.some(s => s.weight && s.reps && Number(s.weight) > 0 && Number(s.reps) > 0));
    case 'cardio':
      return !!data.duration && Number(data.duration) > 0;
    case 'metric': {
      if (!data.value) return false;
      const n = Number(data.value);
      if (!Number.isFinite(n) || n < 0) return false;
      return inRange(n, mission.range);
    }
    case 'timer': {
      if (!data.value) return false;
      const n = Number(data.value);
      if (!Number.isFinite(n) || n < 0) return false;
      return inRange(n, mission.range);
    }
    case 'metrics':
      return mission.metrics.every(m => {
        const v = data.values[m.key];
        if (!v || Number(v) <= 0) return false;
        return inRange(v, m.range);
      });
    case 'photo':
      return data.photos.every(p => p !== null);
    case 'checkbox':
      return data.checked;
    case 'text':
      return data.text && data.text.trim().length >= 5;
    case 'bodyfat':
      return !!data.level && !!data.value;
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
      <SectionLabel>▸ ЖУРНАЛ ТРЕНИРОВКИ</SectionLabel>
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
              <span>подх</span>
              <span>кг</span>
              <span>повт</span>
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
              <Plus size={10} strokeWidth={1.8} /> добавить подход
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
      <SectionLabel>▸ ЖУРНАЛ КАРДИО</SectionLabel>
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
          <FormField label="длительность" unit="мин">
            <CompactInput value={data.duration} onChange={v => setData({ ...data, duration: v })} type="number" placeholder="0" />
          </FormField>
          <FormField label="дистанция" unit="км" optional>
            <CompactInput value={data.distance} onChange={v => setData({ ...data, distance: v })} type="number" placeholder="—" step="0.1" />
          </FormField>
          <FormField label="заметки" optional>
            <CompactInput value={data.notes} onChange={v => setData({ ...data, notes: v })} type="text" placeholder="—" />
          </FormField>
        </div>
      </div>
    </div>
  );
}

function MetricInput({ mission, data, setData, profile }) {
  const n = Number(data.value);
  const isNumber = data.value !== '' && Number.isFinite(n);
  const range = mission.range;
  let error = null;
  if (data.value && !isNumber) error = 'нужно число';
  else if (isNumber && range) {
    if (range.min !== undefined && n < range.min) error = `минимум ${range.min}`;
    else if (range.max !== undefined && n > range.max) error = `максимум ${range.max}`;
  }
  const ok = isNumber && !error;

  return (
    <div>
      <SectionLabel>▸ ВВОД ПОКАЗАТЕЛЯ</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${error ? C.danger : C.border}`, clipPath: smallAngleClip, padding: '24px 18px', transition: 'border-color 0.3s' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{mission.metric}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10 }}>
          <input
            type="number"
            inputMode="decimal"
            value={data.value}
            onChange={e => setData({ value: e.target.value })}
            placeholder="0"
            style={{
              fontFamily: F.display,
              fontSize: 64,
              fontWeight: 400,
              color: error ? C.danger : (ok ? C.pink : C.text),
              background: 'transparent',
              border: 'none',
              outline: 'none',
              textAlign: 'center',
              width: 180,
              padding: 0,
              textShadow: ok ? `0 0 18px ${C.pinkGlow}` : 'none',
            }}
          />
          <span style={{ fontFamily: F.display, fontSize: 22, color: C.textDim, letterSpacing: '0.16em' }}>{mission.unit}</span>
        </div>
        {range && (
          <div style={{ marginTop: 14, textAlign: 'center', fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            диапазон: {range.min} — {range.max} {mission.unit}
          </div>
        )}
        {error && (
          <div style={{ marginTop: 8, textAlign: 'center', fontFamily: F.mono, fontSize: 11, color: C.danger, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ! {error}
          </div>
        )}
      </div>
    </div>
  );
}

function MetricsInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ ОБХВАТЫ ТЕЛА</SectionLabel>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, clipPath: smallAngleClip, padding: '16px 18px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mission.metrics.map(m => {
            const val = data.values[m.key];
            const n = Number(val);
            let fieldError = null;
            if (val && !Number.isFinite(n)) fieldError = 'число';
            else if (val && m.range) {
              if (m.range.min !== undefined && n < m.range.min) fieldError = `мин ${m.range.min}`;
              else if (m.range.max !== undefined && n > m.range.max) fieldError = `макс ${m.range.max}`;
            }
            return (
              <div key={m.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  <span style={{ color: C.textDim }}>{m.label}</span>
                  <span style={{ color: C.textFaint }}>{m.unit}</span>
                </div>
                {m.hint && (
                  <div style={{ fontFamily: F.body, fontSize: 11, color: C.textFaint, marginBottom: 6, lineHeight: 1.4 }}>
                    {m.hint}
                  </div>
                )}
                <CompactInput
                  value={val}
                  onChange={v => setData({ ...data, values: { ...data.values, [m.key]: v } })}
                  type="number"
                  placeholder="0"
                  step="0.5"
                  error={!!fieldError}
                />
                {fieldError && (
                  <div style={{ marginTop: 4, fontFamily: F.mono, fontSize: 10, color: C.danger, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    ! {fieldError}
                  </div>
                )}
              </div>
            );
          })}
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
      <SectionLabel>▸ ФОТО</SectionLabel>
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
                {mission.angles?.[idx] || `фото ${idx + 1}`}
              </div>
              <div style={{ fontFamily: F.mono, fontSize: 9, color: photo ? C.success : C.textFaint, letterSpacing: '0.18em', marginTop: 4, textTransform: 'uppercase' }}>
                {photo ? '✓ снято' : 'ожидает съёмки'}
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
        фото хранятся только на твоём телефоне
      </div>
    </div>
  );
}

function CheckboxInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ ПОДТВЕРДИ ДЕЙСТВИЕ</SectionLabel>
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
          {data.checked ? 'подтверждено' : 'нажми чтобы подтвердить'}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', marginTop: 8, textTransform: 'uppercase' }}>
          система чести · сам себе судья
        </div>
      </button>
    </div>
  );
}

function TextInput({ mission, data, setData }) {
  return (
    <div>
      <SectionLabel>▸ РАЗМЫШЛЕНИЕ</SectionLabel>
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
          placeholder="напиши свой ответ..."
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
        <div style={{ marginTop: 8, fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right' }}>
          {data.text.length} символов · мин. 5
        </div>
      </div>
    </div>
  );
}

// ============== BODY FAT VISUAL SELECTOR ==============
// Renders 6 silhouettes with body fat estimates. User picks closest match.
function BodyFatInput({ mission, data, setData, profile }) {
  const gender = profile?.gender || 'male';
  const levels = BODY_FAT_LEVELS[gender] || BODY_FAT_LEVELS.male;

  return (
    <div>
      <SectionLabel>▸ ОЦЕНКА ПРОЦЕНТА ЖИРА</SectionLabel>
      <div style={{
        background: C.bgCard, border: `1px solid ${C.border}`,
        clipPath: smallAngleClip, padding: '14px',
        marginBottom: 12,
        fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.5,
      }}>
        Посмотри в зеркало без одежды или в обтягивающей одежде. Выбери силуэт, который больше всего похож на твою текущую форму.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {levels.map(lvl => {
          const selected = data.level === lvl.id;
          return (
            <button
              key={lvl.id}
              onClick={() => setData({ level: lvl.id, value: lvl.value })}
              style={{
                background: selected ? `${C.pink}15` : C.bgCard,
                border: `1px solid ${selected ? C.pink : C.border}`,
                clipPath: smallAngleClip, padding: '12px 10px 14px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: selected ? `0 0 14px ${C.pinkSoft}` : 'none',
                color: 'inherit', textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                minHeight: 180,
              }}
            >
              <BodyFatSilhouette level={lvl.id} gender={gender} selected={selected} />
              <div>
                <div style={{ fontFamily: F.display, fontSize: 16, fontWeight: 400, color: selected ? C.pink : C.text, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {lvl.label}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 11, color: selected ? C.pink : C.textFaint, marginTop: 4, letterSpacing: '0.1em' }}>
                  {lvl.range}
                </div>
                <div style={{ fontFamily: F.body, fontSize: 11, color: C.textFaint, marginTop: 6, lineHeight: 1.4 }}>
                  {lvl.desc}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Silhouette SVG: stylised body shape that gets wider as body fat increases
function BodyFatSilhouette({ level, gender, selected }) {
  // bodyWidth grows with fat percentage
  const widths = {
    shredded: 0.55, athletic: 0.62, fit: 0.7,
    average: 0.78, soft: 0.88, overweight: 1.0,
  };
  const w = widths[level] || 0.7;
  const color = selected ? C.pink : C.textDim;

  // Different proportions for genders
  const isFemale = gender === 'female';
  const waistFactor = isFemale ? 0.78 : 0.85;
  const hipFactor = isFemale ? 1.05 : 0.95;

  const baseWidth = 22 * w;
  const waistW = baseWidth * waistFactor;
  const hipW = baseWidth * hipFactor;
  const shoulderW = baseWidth;

  return (
    <svg width="60" height="84" viewBox="0 0 60 84" fill="none">
      {/* head */}
      <circle cx="30" cy="10" r="6" stroke={color} strokeWidth="1.5" fill="none" />
      {/* body */}
      <path
        d={`
          M ${30 - shoulderW * 0.5},20
          L ${30 - shoulderW * 0.6},32
          L ${30 - waistW * 0.5},48
          L ${30 - hipW * 0.55},62
          L ${30 - hipW * 0.4},78
          L ${30 - hipW * 0.18},78
          L ${30 - hipW * 0.1},64
          L ${30 + hipW * 0.1},64
          L ${30 + hipW * 0.18},78
          L ${30 + hipW * 0.4},78
          L ${30 + hipW * 0.55},62
          L ${30 + waistW * 0.5},48
          L ${30 + shoulderW * 0.6},32
          L ${30 + shoulderW * 0.5},20
          Z
        `}
        stroke={color}
        strokeWidth="1.5"
        fill={selected ? `${color}22` : 'none'}
      />
    </svg>
  );
}

// ============== TIMER INPUT (for plank, etc.) ==============
function TimerInput({ mission, data, setData }) {
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

// ============== INPUT PRIMITIVES ==============

function CompactInput({ value, onChange, type = 'text', placeholder, step, error }) {
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

function FormField({ label, unit, optional, children }) {
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

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textFaint, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>
      {children}
    </div>
  );
}

// ============== ONBOARDING FLOW ==============
// Compact 5-step onboarding. NO experience self-assessment, NO ovr target slider.
// Just basic bio + class + letter. OVR is calculated after Day 1 calibration trial.

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

function OnboardingFlow({ onComplete }) {
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
            }}>{line || '\u00A0'}</div>
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

// ============== TODAY SCREEN ==============
function TodayScreen({ state, currentDay, missions, onMissionClick }) {
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

// ============== AGENT SCREEN ==============
function AgentScreen({ state, currentDay, onReset }) {
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

// ============== APP ROOT ==============
// ============== SAVE TOAST ==============
// Subscribes to global save events and shows non-intrusive bottom toast.
function SaveToast() {
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
      const newMissions = generateMissionsForDay(currentDay, state.mode || 'mass');
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
    const checkDay = () => {
      const newDay = computeCurrentDay(state.startDate);
      if (newDay !== currentDay) {
        setCurrentDay(newDay);
        logSaveEvent('day_rollover', `${currentDay}->${newDay}`);
      }
    };
    // Periodic check (covers case when app stays open across midnight)
    const interval = setInterval(checkDay, 60000);
    // Visibility check (covers PWA reopen after hours/days)
    const onVisibility = () => {
      if (document.visibilityState === 'visible') checkDay();
    };
    document.addEventListener('visibilitychange', onVisibility);
    // Focus check (some iOS scenarios fire focus, not visibilitychange)
    window.addEventListener('focus', checkDay);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('focus', checkDay);
    };
  }, [state, currentDay]);

  // ===== Render onboarding if no state =====
  if (!state) {
    return (
      <>
        <style>{`
          * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; margin: 0; padding: 0; }
          @keyframes scan { 0% { transform: translateY(-20px); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
          @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
          input::placeholder, textarea::placeholder { color: ${C.textFaint}; }
          input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
          input[type=number] { -moz-appearance: textfield; }
        `}</style>
        <OnboardingFlow onComplete={handleOnboardingComplete} />
        <SaveToast />
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
      const allDone = updatedMissions.every(m => m.done);

      let newStats = s.stats;
      let newGoals = s.goals;
      let newMode = s.mode;

      // Special: CALIBRATION_COMPLETE triggers stats + mode calculation from Day 1 data
      if (mission.code === 'CALIBRATION_COMPLETE') {
        // Collect calibration data from Day 1 missions
        const findData = (code) => updatedMissions.find(m => m.code === code)?.data;
        const weight = Number(findData('BASELINE_WEIGHT')?.value || s.profile.weight);
        const bodyFatLevel = findData('BODY_FAT_ESTIMATE')?.level;
        const gender = s.profile.gender || 'male';
        const bfLevels = BODY_FAT_LEVELS[gender] || BODY_FAT_LEVELS.male;
        const bodyFat = bfLevels.find(l => l.id === bodyFatLevel)?.value || 20;
        const maxPushups = Number(findData('PUSHUP_TEST')?.value || 0);
        const plankSec = Number(findData('PLANK_TEST')?.value || 0);

        newStats = calibrateFromDay1(s.profile, { weight, bodyFat, maxPushups, plankSec });
        newMode = determineCampaignMode(gender, bodyFat);
        newGoals = calibrateGoals(newStats, newMode);
      } else if (s.stats !== null) {
        // Normal stat update only if calibration is done
        const statDelta = mission.xp * XP_TO_STAT_RATIO;
        const statKey = mission.stat;
        if (s.stats[statKey] !== undefined) {
          newStats = { ...s.stats, [statKey]: Math.max(0, Math.min(99, s.stats[statKey] + statDelta)) };
        }
      }
      // else: stats still null (mid-calibration, before CALIBRATION_COMPLETE) — don't touch

      const newState = {
        ...s,
        daysData: {
          ...s.daysData,
          [dayKey]: { ...day, missions: updatedMissions, xpEarned: day.xpEarned + xpDelta, completed: allDone },
        },
        stats: newStats,
        goals: newGoals,
        mode: newMode,
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
    { id: 'today', Icon: Home, label: 'СЕГОДНЯ' },
    { id: 'story', Icon: MapIcon, label: 'ПУТЬ' },
    { id: 'agent', Icon: User, label: 'ГЕРОЙ' },
    { id: 'cfg', Icon: Settings, label: 'НАСТР' },
  ];

  return (
    <>
      <style>{`
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
        minHeight: '100vh', minHeight: '100dvh', background: C.bg,
        backgroundImage: `linear-gradient(rgba(255,46,99,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,46,99,0.025) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        color: C.text, fontFamily: F.body,
        display: 'flex', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div key={view} style={{
          position: 'absolute', left: 0, right: 0,
          height: 2, background: `linear-gradient(to bottom, transparent, ${C.pink}, transparent)`,
          animation: 'scan 1.4s ease-out 1', opacity: 0.6,
          pointerEvents: 'none', zIndex: 100,
        }} />

        <div style={{
          width: '100%', maxWidth: 440, minHeight: '100vh', minHeight: '100dvh',
          background: C.bgPanel, display: 'flex', flexDirection: 'column',
          position: 'relative',
          paddingTop: 'env(safe-area-inset-top)',
        }}>
          <div style={{
            padding: '14px 18px 0',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: F.mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.success, animation: 'blink 2s infinite' }} />
              <span style={{ color: C.success }}>на связи</span>
            </div>
            <div style={{ color: C.textFaint }}>гипер.протокол</div>
            <div style={{ color: C.pink }}>день {String(currentDay).padStart(3, '0')}/084</div>
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
            padding: '14px 0 calc(14px + env(safe-area-inset-bottom))',
            position: 'relative',
          }}>
            {navItems.map(({ id, Icon, label }) => {
              const active = view === id;
              return (
                <button key={id} onClick={() => setView(id)} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  padding: '6px 14px',
                  color: active ? C.pink : C.textFaint,
                  fontFamily: F.display, position: 'relative',
                  transition: 'color 0.3s',
                  minHeight: 56, minWidth: 64,
                }}>
                  {active && (
                    <div style={{
                      position: 'absolute', top: -14, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 32, height: 2, background: C.pink,
                      boxShadow: `0 0 8px ${C.pinkGlow}`,
                    }} />
                  )}
                  <Icon size={20} strokeWidth={1.8} />
                  <span style={{ fontSize: 11, fontWeight: 400, letterSpacing: '0.16em' }}>{label}</span>
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

      <SaveToast />

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
              ⚠ ▸ ВНИМАНИЕ
            </div>
            <h2 style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: C.text, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 12 }}>
              Сбросить кампанию?
            </h2>
            <p style={{ fontFamily: F.body, fontSize: 13, color: C.textDim, lineHeight: 1.6, marginBottom: 24 }}>
              Все данные, фото, метрики, прогресс — будут стёрты. Это действие необратимо.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowResetConfirm(false)} style={{
                flex: 1, background: C.surface,
                border: `1px solid ${C.border}`, color: C.text,
                padding: '16px', fontFamily: F.display, fontSize: 15, fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: 'pointer', clipPath: smallAngleClip,
                minHeight: 52,
              }}>отмена</button>
              <button onClick={confirmReset} style={{
                flex: 1, background: C.danger, border: 'none', color: '#fff',
                padding: '16px', fontFamily: F.display, fontSize: 15, fontWeight: 400,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                cursor: 'pointer', clipPath: smallAngleClip,
                boxShadow: `0 0 16px rgba(255, 71, 87, 0.5)`,
                minHeight: 52,
              }}>▸ сбросить</button>
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
