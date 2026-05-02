# TODO

Список известных багов и технического долга, найденных к началу миграции на Vite.
**Не чинить во время миграции** — только после её завершения, отдельными коммитами.

## Баги, замеченные пользователем

- [ ] **Зависание при null `state.profile`.** Пользователь сообщил, что `MetricInput` зависает,
  когда `state.profile === null`. По коду `MetricInput` (`game.js:891`) проп `profile` принимает,
  но не использует — вероятный реальный источник в `BodyFatInput` (`game.js:1174`), который
  читает `profile?.gender` и передаёт в `BodyFatSilhouette`. Нужно проверить, при каких условиях
  миссия с `inputType: 'bodyFat'` может открыться до завершения онбординга.

## Технический долг, найденный при разборе game.js

- [ ] **`MetricInput` принимает мёртвый проп `profile`.** Удалить из сигнатуры и из мест вызова
  после миграции (`game.js:891`).

- [ ] **`ResetModal` инлайн в `App`.** Модалка ресета встроена прямо в `App`
  (`game.js:2575+`). При миграции вынесу в отдельный компонент `components/ResetModal.jsx`,
  но без рефакторинга логики.

- [ ] **Два заголовка `// ============== APP ROOT ==============`** в `game.js`
  (строки 2499 и 2574) — между ними `SaveToast`. Косметика, в новой структуре исчезнет.

## Технический долг, замеченный при сборке (не чинить до конца миграции)

- [ ] **Дубликат ключа `minHeight` в inline-стилях.** В оригинале паттерн
  `minHeight: '100vh', minHeight: '100dvh'` — задумывался как fallback для
  старых браузеров. В CSS такой каскад работает, в JS-объекте второй ключ
  просто перезатирает первый, поэтому фактически на всех браузерах применяется
  только `100dvh` — на старых (без поддержки dvh) элемент будет схлопнут до 0.
  esbuild при сборке корректно сигнализирует warning'ом. Места:
  - `vite-app/src/App.jsx:178, 193`
  - `vite-app/src/screens/OnboardingFlow.jsx:75, 91`
  - `vite-app/src/components/MissionDetail.jsx:52-53`

  Фикс — заменить на CSS-классы с настоящим каскадом, либо использовать
  `min-height: 100vh; min-height: 100dvh;` через CSS modules.

## Появилось во время миграции

- [x] **`MissionDetail` обращался к `state?.profile` через closure.** В оригинальном
  `game.js` (строки 678, 683) `MetricInput` и `BodyFatInput` получали профиль
  из переменной `state` родительского `App` через лексический scope в
  in-browser Babel-сборке. В ES-модулях этого scope нет — был бы ReferenceError.
  При переносе на этапе 3.4 `MissionDetail` теперь принимает `profile` как
  явный prop, а `App` (этап 3.7) будет передавать `state.profile` сюда. Это
  не «фикс бага», а минимально необходимое изменение для миграции на модули.

- [x] **`emitSaveEvent` вызывался синхронно из updater-функции `setState`.**
  Скрытый баг в оригинале: `App.handleMissionComplete` и `App.useEffect`
  для генерации миссий вызывают `saveState(newState)` внутри callback'а
  `setState(s => { ... saveState; return newState })`. `saveState` синхронно
  эмитит событие → `SaveToast` синхронно делает `setState`. Это nested
  setState, который React 18 + StrictMode флагает как «Cannot update a
  component (SaveToast) while rendering a different component (App)».
  В оригинале StrictMode не использовался, поэтому warning не показывался.
  Минимальный фикс на этапе миграции: `emitSaveEvent` теперь оборачивает
  forEach в `queueMicrotask`. Поведение не меняется — тост всё равно
  появляется через миллисекунды после save. После миграции стоит
  отдельным коммитом перенести `saveState` из updater-callback'а наружу
  (вызывать в `useEffect` после `setState`), но это уже архитектурное
  изменение, не требующееся для модульной сборки.
