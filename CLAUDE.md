# ГИПЕР_ПРОТОКОЛ

84-дневная RPG-кампания по гипертрофии. PWA — ставится на телефон,
работает офлайн, без бэкенда, всё состояние в localStorage.

Игровой цикл: онбординг → День 1 (8 миссий калибровки: замеры, фото,
тест отжиманий/планки) → автоматический расчёт OVR и режима кампании
(масса / рекомпозиция) → 84 дня по 4 главы (Foundation / Volume /
Intensity / Consolidation) с boss-днями на 21/42/63/84. 6 статов:
СИЛ, ВЫН, МАС, ПИТ, ВОС, ФОР.

## Стек

- **Vite 7.3 + React 18.3** (даунгрейд с Vite 8 — `vite-plugin-pwa`
  ещё не поддерживает 8)
- **vite-plugin-pwa** для service worker и manifest
- **Recharts** для radar chart статов
- **Никаких** redux/router/css-in-js — inline styles + localStorage
- **Vercel** деплой, prod на `hyp-protocol.vercel.app`

## Структура src/

```
src/
├── App.jsx              # root: state init из localStorage, day rollover, навигация
├── main.jsx             # createRoot + StrictMode
├── index.css            # глобальные keyframes (scan, blink), form resets
├── lib/                 # чистая логика, без React
│   ├── tokens.js        # палитра C, F, clipPaths
│   ├── calibration.js   # STAT_CODES, calcOVR, calcTier, calibrateFromDay1, calibrateGoals
│   ├── missions.js      # DAY_1_MISSIONS, MISSION_POOL, generateMissionsForDay
│   └── persistence.js   # saveState, getInitialState, subscribe/emitSaveEvent
├── components/
│   ├── icons.jsx        # 22 inline SVG (Check, Home, Trophy, ...)
│   ├── SectionHeader.jsx, SaveToast.jsx, ResetModal.jsx
│   ├── MissionDetail.jsx       # overlay при тапе по миссии
│   ├── BodyFatSilhouette.jsx
│   └── inputs/          # 9 типов ввода + примитивы (CompactInput, FormField, SectionLabel)
└── screens/
    ├── OnboardingFlow.jsx   # 5 шагов
    ├── TodayScreen.jsx, AgentScreen.jsx, StoryScreen.jsx, SettingsScreen.jsx
```

`MissionDetail` принимает `profile` явным prop'ом — закрытый сценарий
из миграции (был closure из App). См. историю в TODO.md.

## Правила работы

- **Не использовать** `sed` / `awk` / Python-heredoc / regex-замены
  для массовых правок кода — backtick'и и template literals в этом
  проекте часто ломаются. Только Edit с точным контекстом.
- **Коммит после каждой логической задачи**, не накапливать. Каждый
  коммит должен быть откатываемым.
- **Перед коммитом** прогон `npm run dev`, убедиться что встаёт без
  ошибок. Для UI-изменений — открыть в браузере, у меня (Claude) такой
  возможности нет, поэтому прошу пользователя проверять.
- **Pre-existing баги** не чинить попутно с другой задачей — фиксировать
  в TODO.md, чинить отдельным коммитом.

## Текущее состояние (на момент создания файла)

- Миграция с in-browser-Babel (`game.js` ~3500 строк) на Vite-сборку
  завершена. История в `git log` ветки `migration/vite` (16 коммитов
  + cherry-pick `6222c43`).
- Prod на `main`, задеплоен, работает.
- Открытые задачи — в `TODO.md`:
  - проверить repro «зависание на замере веса» на реальном устройстве
  - вынести `saveState` из `setState`-updater'а в `useEffect` (сейчас
    маскируется `queueMicrotask` в `emitSaveEvent`)

## Что НЕ делать

- **Не пушить в `main` без визуального подтверждения** от пользователя
  что фикс/фича работает в браузере. Push в main = production deploy.
- **Никогда `--force` push в main**, даже если ветки разошлись.
  Cherry-pick / revert — нормальные пути. Перепись истории main
  ломает merge-коммиты от PR и работает PR-flow.
- **Не запускать `localStorage.clear()` или `git reset --hard`** в
  «починке на лету» без явного запроса.
- **Не апгрейдить Vite до 8** пока `vite-plugin-pwa` не выпустит
  совместимую версию.
