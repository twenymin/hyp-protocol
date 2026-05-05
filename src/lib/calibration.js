import { C } from './tokens.js';

export const STAT_CODES = ['СИЛ', 'ВЫН', 'МАС', 'ПИТ', 'ВОС', 'ФОР'];
export const STAT_LABELS = {
  'СИЛ': 'сила',
  'ВЫН': 'выносливость',
  'МАС': 'масса',
  'ПИТ': 'питание',
  'ВОС': 'восстановление',
  'ФОР': 'форма',
};

export const calcOVR = (stats) => {
  if (!stats) return null;
  const values = STAT_CODES.map(c => stats[c]).filter(v => typeof v === 'number');
  if (values.length === 0) return null;
  return Math.round(values.reduce((s, v) => s + v, 0) / values.length);
};

export const calcTier = (ovr) => {
  if (ovr === null || ovr === undefined) return { name: 'unranked', display: 'НЕТ ОЦЕНКИ', color: C.textDim, glow: 'rgba(168, 159, 181, 0.35)' };
  if (ovr >= 80) return { name: 'icon', display: 'ИКОНА', color: C.pink, glow: C.pinkGlow };
  if (ovr >= 65) return { name: 'gold', display: 'ЗОЛОТО', color: C.gold, glow: C.goldGlow };
  if (ovr >= 50) return { name: 'silver', display: 'СЕРЕБРО', color: C.silver, glow: C.silverGlow };
  return { name: 'bronze', display: 'БРОНЗА', color: C.bronze, glow: C.bronzeGlow };
};

export const XP_TO_STAT_RATIO = 0.005;

// ============== ONBOARDING CALIBRATION ==============
// New philosophy: NO OVR until Day 1 measurement is complete.
// Onboarding only collects basic bio. OVR is calculated from real Day 1 data.

// Body fat self-assessment levels with separate scales for male/female
// Visual silhouettes shown to user; they pick the closest match
export const BODY_FAT_LEVELS = {
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
export const MODE_THRESHOLDS = { male: 18, female: 25, nb: 22 };

// Calculate OVR + 6 stats from Day 1 measurement data
export const calibrateFromDay1 = (profile, day1Data) => {
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
export const determineCampaignMode = (gender, bodyFat) => {
  const threshold = MODE_THRESHOLDS[gender] || 22;
  return bodyFat < threshold ? 'mass' : 'recomp';
};

// Calculate stat goals after Day 1 — auto, not user-chosen
export const calibrateGoals = (startingStats, mode) => {
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
