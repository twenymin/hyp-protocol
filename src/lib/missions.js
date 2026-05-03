// Mission templates and per-day mission generation.
// inputType determines which detail UI is shown.
// exercises is for workout-type missions.

export const DAY_1_MISSIONS = [
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
export const WORKOUT_TEMPLATES = {
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

export const MISSION_POOL = {
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

export const BOSS_DAYS = [21, 42, 63, 84];

export const getChapterByDay = (day, mode = 'mass') => {
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

export const seededShuffle = (arr, seed) => {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const generateMissionsForDay = (day, mode = 'mass') => {
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
