import { useState, useEffect } from 'react';
import { C, F } from './lib/tokens.js';
import { STORAGE_KEY, getInitialState, computeCurrentDay, saveState, logSaveEvent } from './lib/persistence.js';
import { BODY_FAT_LEVELS, XP_TO_STAT_RATIO, calibrateFromDay1, determineCampaignMode, calibrateGoals } from './lib/calibration.js';
import { generateMissionsForDay } from './lib/missions.js';
import { Home, MapIcon, User, Settings } from './components/icons.jsx';
import MissionDetail from './components/MissionDetail.jsx';
import SaveToast from './components/SaveToast.jsx';
import ResetModal from './components/ResetModal.jsx';
import OnboardingFlow from './screens/OnboardingFlow.jsx';
import TodayScreen from './screens/TodayScreen.jsx';
import AgentScreen from './screens/AgentScreen.jsx';
import StoryScreen from './screens/StoryScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';

export default function App() {
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
      <div style={{
        minHeight: '100dvh', background: C.bg,
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
          width: '100%', maxWidth: 440, minHeight: '100dvh',
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
            {view === 'cfg' && <SettingsScreen />}
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
          profile={state.profile}
          onComplete={handleMissionComplete}
          onAbort={handleMissionAbort}
        />
      )}

      <SaveToast />

      {showResetConfirm && (
        <ResetModal
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={confirmReset}
        />
      )}
    </>
  );
}
