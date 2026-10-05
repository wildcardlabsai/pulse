import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Fight, ShotMapPunch, FightSignal, Fighter, AlertNotification } from '../types/boxing';
import { LIVE_FIGHT_STEVENSON_HARUTYUNYAN, NOTIFICATIONS, FIGHTERS } from '../data/verifiedBoxingData';
import { providerManager, EnvironmentMode } from '../lib/providers/boxingDataProvider';
import { FightPulseMomentumEngine } from '../lib/momentum/momentumEngine';
import { DataQualityValidator, QualityIssue } from '../lib/validation/dataQuality';
import { ingestionEngine } from '../lib/ingestion/IngestionEngine';

interface LiveFightContextType {
  activeLiveFight: Fight;
  isLiveUpdating: boolean;
  secondsSinceLastUpdate: number;
  isProviderDelayed: boolean;
  isProviderUnavailable: boolean;
  toggleLiveUpdates: () => void;
  triggerManualPunch: (fighter: 'A' | 'B', type: 'jab' | 'power', target: 'head' | 'body') => void;
  activeRound: number;
  roundTimer: string;
  followedFighters: string[];
  toggleFollowFighter: (fighterId: string) => void;
  alerts: AlertNotification[];
  toggleAlertActive: (id: string) => void;
  markAlertRead: (id: string) => void;
  createAlert: (newAlert: Partial<AlertNotification>) => void;
  unreadAlertCount: number;
  oddsFormat: 'decimal' | 'fractional';
  setOddsFormat: (format: 'decimal' | 'fractional') => void;
  formatOdds: (decimalOdds: number) => string;
  simulateProviderDrop: () => void;
  // Section 5 & 15 Environment & Telemetry extensions
  environmentMode: EnvironmentMode;
  setEnvironmentMode: (mode: EnvironmentMode) => void;
  isFixtureMode: boolean;
  qualityIssues: QualityIssue[];
  runQualityAudit: () => QualityIssue[];
  runSyncTrigger: () => Promise<any>;
}

const LiveFightContext = createContext<LiveFightContextType | undefined>(undefined);

export const LiveFightProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeLiveFight, setActiveLiveFight] = useState<Fight>(LIVE_FIGHT_STEVENSON_HARUTYUNYAN);
  const [isLiveUpdating, setIsLiveUpdating] = useState<boolean>(true);
  const [secondsSinceLastUpdate, setSecondsSinceLastUpdate] = useState<number>(3);
  const [isProviderUnavailable, setIsProviderUnavailable] = useState<boolean>(false);
  const [environmentMode, setEnvironmentModeState] = useState<EnvironmentMode>(providerManager.getEnvironmentMode());
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([]);
  const [followedFighters, setFollowedFighters] = useState<string[]>([
    'anthony-joshua',
    'tyson-fury',
    'katie-taylor',
    'ryan-garcia',
    'naoya-inoue'
  ]);
  const [alerts, setAlerts] = useState<AlertNotification[]>(NOTIFICATIONS);
  const [oddsFormat, setOddsFormat] = useState<'decimal' | 'fractional'>('decimal');

  const setEnvironmentMode = (mode: EnvironmentMode) => {
    providerManager.setEnvironmentMode(mode);
    setEnvironmentModeState(mode);
  };

  const runQualityAudit = useCallback((): QualityIssue[] => {
    const issues = DataQualityValidator.validateFighters(FIGHTERS);
    setQualityIssues(issues);
    return issues;
  }, []);

  const runSyncTrigger = useCallback(async () => {
    return ingestionEngine.performIncrementalSync('Official Sanctioning Feeds', FIGHTERS);
  }, []);

  useEffect(() => {
    runQualityAudit();
  }, [runQualityAudit]);

  // Convert decimal odds to fractional representation
  const formatOdds = useCallback((decimal: number) => {
    if (oddsFormat === 'decimal') {
      return decimal.toFixed(2);
    }
    // Simple decimal to fraction approximation
    const frac = decimal - 1;
    if (Math.abs(frac - 0.22) < 0.05) return '2/9';
    if (Math.abs(frac - 0.36) < 0.05) return '4/11';
    if (Math.abs(frac - 0.44) < 0.05) return '4/9';
    if (Math.abs(frac - 0.62) < 0.05) return '8/13';
    if (Math.abs(frac - 1.0) < 0.05) return '1/1';
    if (Math.abs(frac - 1.10) < 0.05) return '11/10';
    if (Math.abs(frac - 1.30) < 0.05) return '13/10';
    if (Math.abs(frac - 2.0) < 0.05) return '2/1';
    if (Math.abs(frac - 3.20) < 0.1) return '16/5';
    if (Math.abs(frac - 4.20) < 0.1) return '21/5';
    return `${Math.round(frac * 10)}/10`;
  }, [oddsFormat]);

  // Data delay tracker
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSinceLastUpdate(prev => {
        if (!isLiveUpdating) {
          return prev + 1;
        }
        // When live updating, reset every 3-5 seconds with fresh telemetry
        return prev >= 4 ? 1 : prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isLiveUpdating]);

  // Real-time round clock and punch event simulation
  useEffect(() => {
    if (!isLiveUpdating || isProviderUnavailable) return;

    const clockInterval = setInterval(() => {
      setActiveLiveFight(prev => {
        const [mins, secs] = prev.roundTimer.split(':').map(Number);
        let totalSeconds = mins * 60 + secs - 1;
        if (totalSeconds < 0) totalSeconds = 180; // 3 min rounds
        const newMins = Math.floor(totalSeconds / 60);
        const newSecs = totalSeconds % 60;
        const newTimer = `${newMins}:${newSecs < 10 ? '0' : ''}${newSecs}`;

        return {
          ...prev,
          roundTimer: newTimer
        };
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [isLiveUpdating, isProviderUnavailable]);

  // Periodic punch & momentum calculation
  useEffect(() => {
    if (!isLiveUpdating || isProviderUnavailable) return;

    const eventInterval = setInterval(() => {
      setActiveLiveFight(prev => {
        if (!prev.liveStats) return prev;

        const isFighterA = Math.random() > 0.38; // Stevenson dominant (approx 62%)
        const isLanded = Math.random() > 0.55;
        const isJab = Math.random() > 0.45;

        const currentA = { ...prev.liveStats.fighterA };
        const currentB = { ...prev.liveStats.fighterB };
        const roundA = { ...prev.liveStats.currentRoundFighterA };
        const roundB = { ...prev.liveStats.currentRoundFighterB };

        if (isFighterA) {
          currentA.totalPunchesThrown += 1;
          roundA.totalPunchesThrown += 1;
          if (isJab) {
            currentA.jabsThrown += 1;
            roundA.jabsThrown += 1;
          } else {
            currentA.powerThrown += 1;
            roundA.powerThrown += 1;
          }
          if (isLanded) {
            currentA.totalPunchesLanded += 1;
            roundA.totalPunchesLanded += 1;
            if (isJab) {
              currentA.jabsLanded += 1;
              roundA.jabsLanded += 1;
            } else {
              currentA.powerLanded += 1;
              roundA.powerLanded += 1;
            }
          }
          currentA.accuracy = Math.round((currentA.totalPunchesLanded / currentA.totalPunchesThrown) * 100);
          roundA.accuracy = Math.round((roundA.totalPunchesLanded / roundA.totalPunchesThrown) * 100);
        } else {
          currentB.totalPunchesThrown += 1;
          roundB.totalPunchesThrown += 1;
          if (isJab) {
            currentB.jabsThrown += 1;
            roundB.jabsThrown += 1;
          } else {
            currentB.powerThrown += 1;
            roundB.powerThrown += 1;
          }
          if (isLanded) {
            currentB.totalPunchesLanded += 1;
            roundB.totalPunchesLanded += 1;
            if (isJab) {
              currentB.jabsLanded += 1;
              roundB.jabsLanded += 1;
            } else {
              currentB.powerLanded += 1;
              roundB.powerLanded += 1;
            }
          }
          currentB.accuracy = Math.round((currentB.totalPunchesLanded / currentB.totalPunchesThrown) * 100);
          roundB.accuracy = Math.round((roundB.totalPunchesLanded / roundB.totalPunchesThrown) * 100);
        }

        // Fight Pulse proprietary momentum formula (Section 13)
        const momentumCalc = FightPulseMomentumEngine.calculateRoundMomentum({
          round: prev.currentRound,
          statsA: currentA,
          statsB: currentB,
          previousMomentumA: prev.momentum.fighterAScore
        });

        return {
          ...prev,
          liveStats: {
            fighterA: currentA,
            fighterB: currentB,
            currentRoundFighterA: roundA,
            currentRoundFighterB: roundB
          },
          momentum: {
            ...prev.momentum,
            fighterAScore: momentumCalc.fighterAScore,
            fighterBScore: momentumCalc.fighterBScore,
            explanationTitle: momentumCalc.explanationTitle,
            explanationPoints: momentumCalc.explanationPoints
          }
        };
      });
    }, 4500);

    return () => clearInterval(eventInterval);
  }, [isLiveUpdating, isProviderUnavailable]);

  const toggleLiveUpdates = () => {
    setIsLiveUpdating(prev => !prev);
  };

  const simulateProviderDrop = () => {
    setIsProviderUnavailable(prev => !prev);
  };

  const triggerManualPunch = (fighter: 'A' | 'B', type: 'jab' | 'power', target: 'head' | 'body') => {
    setActiveLiveFight(prev => {
      if (!prev.liveStats) return prev;
      const isFighterA = fighter === 'A';
      const currentStats = isFighterA ? { ...prev.liveStats.fighterA } : { ...prev.liveStats.fighterB };
      const roundStats = isFighterA ? { ...prev.liveStats.currentRoundFighterA } : { ...prev.liveStats.currentRoundFighterB };

      currentStats.totalPunchesThrown += 1;
      currentStats.totalPunchesLanded += 1;
      roundStats.totalPunchesThrown += 1;
      roundStats.totalPunchesLanded += 1;

      if (type === 'jab') {
        currentStats.jabsThrown += 1;
        currentStats.jabsLanded += 1;
        roundStats.jabsThrown += 1;
        roundStats.jabsLanded += 1;
      } else {
        currentStats.powerThrown += 1;
        currentStats.powerLanded += 1;
        roundStats.powerThrown += 1;
        roundStats.powerLanded += 1;
      }

      currentStats.accuracy = Math.round((currentStats.totalPunchesLanded / currentStats.totalPunchesThrown) * 100);
      roundStats.accuracy = Math.round((roundStats.totalPunchesLanded / roundStats.totalPunchesThrown) * 100);

      const newShot: ShotMapPunch = {
        id: `punch-${Date.now()}`,
        fighterId: isFighterA ? prev.fighterA.id : prev.fighterB.id,
        round: prev.currentRound,
        type,
        target,
        landed: true,
        x: target === 'head' ? (isFighterA ? 52 : 48) : (isFighterA ? 50 : 50),
        y: target === 'head' ? 24 : 56
      };

      const updatedLiveStats = {
        ...prev.liveStats,
        [isFighterA ? 'fighterA' : 'fighterB']: currentStats,
        [isFighterA ? 'currentRoundFighterA' : 'currentRoundFighterB']: roundStats
      };

      const momentumCalc = FightPulseMomentumEngine.calculateRoundMomentum({
        round: prev.currentRound,
        statsA: updatedLiveStats.fighterA,
        statsB: updatedLiveStats.fighterB,
        previousMomentumA: prev.momentum.fighterAScore
      });

      return {
        ...prev,
        shotMap: [newShot, ...prev.shotMap],
        liveStats: updatedLiveStats,
        momentum: {
          ...prev.momentum,
          fighterAScore: momentumCalc.fighterAScore,
          fighterBScore: momentumCalc.fighterBScore,
          explanationTitle: momentumCalc.explanationTitle,
          explanationPoints: momentumCalc.explanationPoints
        }
      };
    });
  };

  const toggleFollowFighter = (fighterId: string) => {
    setFollowedFighters(prev => 
      prev.includes(fighterId) ? prev.filter(id => id !== fighterId) : [...prev, fighterId]
    );
  };

  const toggleAlertActive = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const createAlert = (newAlert: Partial<AlertNotification>) => {
    const alert: AlertNotification = {
      id: `alert-${Date.now()}`,
      title: newAlert.title || 'New Alert',
      category: newAlert.category || 'Fight',
      timestamp: new Date().toISOString(),
      timeAgo: 'Just now',
      description: newAlert.description || '',
      isRead: false,
      active: true,
      typeIcon: 'Bell'
    };
    setAlerts(prev => [alert, ...prev]);
  };

  const unreadAlertCount = alerts.filter(a => !a.isRead).length;

  return (
    <LiveFightContext.Provider
      value={{
        activeLiveFight,
        isLiveUpdating,
        secondsSinceLastUpdate,
        isProviderDelayed: secondsSinceLastUpdate > 12,
        isProviderUnavailable,
        toggleLiveUpdates,
        triggerManualPunch,
        activeRound: activeLiveFight.currentRound,
        roundTimer: activeLiveFight.roundTimer,
        followedFighters,
        toggleFollowFighter,
        alerts,
        toggleAlertActive,
        markAlertRead,
        createAlert,
        unreadAlertCount,
        oddsFormat,
        setOddsFormat,
        formatOdds,
        simulateProviderDrop,
        environmentMode,
        setEnvironmentMode,
        isFixtureMode: environmentMode === 'DEVELOPMENT_FIXTURE',
        qualityIssues,
        runQualityAudit,
        runSyncTrigger
      }}
    >
      {children}
    </LiveFightContext.Provider>
  );
};

export const useLiveFight = () => {
  const context = useContext(LiveFightContext);
  if (!context) {
    throw new Error('useLiveFight must be used within a LiveFightProvider');
  }
  return context;
};
