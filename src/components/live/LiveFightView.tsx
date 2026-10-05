import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity, 
  Play, 
  Pause, 
  Plus, 
  Eye, 
  BarChart2, 
  Tv, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

interface LiveFightViewProps {
  onOpenFighter: (fighterId: string) => void;
  onOpenEvent: (eventId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const LiveFightView: React.FC<LiveFightViewProps> = ({
  onOpenFighter,
  onOpenEvent,
  onNavigateTab
}) => {
  const { 
    activeLiveFight, 
    isLiveUpdating, 
    toggleLiveUpdates, 
    secondsSinceLastUpdate,
    isProviderDelayed,
    isProviderUnavailable,
    triggerManualPunch,
    formatOdds,
    simulateProviderDrop
  } = useLiveFight();

  const [activeSubTab, setActiveSubTab] = useState<'stats' | 'rounds' | 'odds' | 'analysis' | 'tape' | 'feed'>('stats');
  const [shotMapFilter, setShotMapFilter] = useState<'all' | 'jabs' | 'power'>('all');

  const statsA = activeLiveFight.liveStats?.fighterA;
  const statsB = activeLiveFight.liveStats?.fighterB;
  const roundStatsA = activeLiveFight.liveStats?.currentRoundFighterA;
  const roundStatsB = activeLiveFight.liveStats?.currentRoundFighterB;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Live Delay Warning Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-[#1C232E] pb-3">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <button onClick={() => onNavigateTab('dashboard')} className="hover:text-white">Dashboard</button>
          <span>/</span>
          <button onClick={() => onNavigateTab('live')} className="hover:text-white">Live</button>
          <span>/</span>
          <span className="text-white font-bold">{activeLiveFight.fighterA.name} vs {activeLiveFight.fighterB.name}</span>
        </div>

        {/* Live Freshness & Simulation Controls */}
        <div className="flex items-center gap-2">
          {isProviderUnavailable ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border border-red-800 text-red-400 rounded-md font-mono text-xs font-bold animate-pulse">
              <AlertTriangle size={14} />
              <span>LIVE DATA TEMPORARILY UNAVAILABLE</span>
            </div>
          ) : isProviderDelayed ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-950/80 border border-amber-800 text-amber-400 rounded-md font-mono text-xs font-bold">
              <Clock size={14} />
              <span>LIVE DATA DELAYED · Last updated {secondsSinceLastUpdate}s ago</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 rounded-md font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE FEED · Ring Telemetry Active</span>
            </div>
          )}

          {/* Toggle Live Feed Simulation */}
          <button
            onClick={toggleLiveUpdates}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#171C25] hover:bg-[#202734] border border-[#2B3545] rounded-md text-xs font-medium text-slate-300"
            title="Pause/Resume live ring telemetry simulation"
          >
            {isLiveUpdating ? <Pause size={13} className="text-amber-400" /> : <Play size={13} className="text-emerald-400" />}
            <span className="hidden md:inline">{isLiveUpdating ? 'Pause Feed' : 'Resume Feed'}</span>
          </button>
        </div>
      </div>

      {/* MAIN COMMAND HEADER: Fighter Banner + Momentum + Live Odds */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1015] border border-[#1F2734] shadow-2xl">
        
        {/* Subtle Ring Canvas Glow */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500" />
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('${activeLiveFight.fighterA.bannerImage || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80'}')`
          }}
        />

        <div className="relative z-10 p-5 sm:p-7 space-y-6">
          
          {/* Top Title Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1A222E] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-md uppercase tracking-wider glow-red">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                LIVE
              </span>
              <span className="font-heading text-lg font-bold tracking-wider text-white uppercase">
                {activeLiveFight.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {activeLiveFight.venue}, {activeLiveFight.location}
              </span>
              <div className="flex items-center gap-2 font-mono">
                <span className="text-white font-bold bg-[#141A23] border border-[#232B38] px-3 py-1 rounded text-xs">
                  ROUND {activeLiveFight.currentRound} OF {activeLiveFight.scheduledRounds}
                </span>
                <span className="text-red-400 font-bold bg-red-950/70 border border-red-800/80 px-2.5 py-1 rounded text-xs animate-pulse">
                  {activeLiveFight.roundTimer}
                </span>
              </div>
            </div>
          </div>

          {/* Fighter Comparison Lineup */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
            
            {/* Fighter A (Blue Corner / Favourite) */}
            <div 
              onClick={() => onOpenFighter(activeLiveFight.fighterA.id)}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500/60 group-hover:border-blue-400 shadow-xl shrink-0">
                <img 
                  src={activeLiveFight.fighterA.image} 
                  alt={activeLiveFight.fighterA.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="space-y-1">
                <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-blue-400 transition-colors uppercase leading-none">
                  {activeLiveFight.fighterA.name}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span>{activeLiveFight.fighterA.bio.flag}</span>
                  <span>{activeLiveFight.fighterA.record.wins}-{activeLiveFight.fighterA.record.losses}-{activeLiveFight.fighterA.record.draws}</span>
                  <span className="text-slate-500">({activeLiveFight.fighterA.record.kos} KOs)</span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">
                  {activeLiveFight.fighterA.physical.division} · {activeLiveFight.fighterA.bio.stance}
                </div>
              </div>
            </div>

            {/* Middle: Fight Pulse Momentum Indicator (Screenshot 9) */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-2 bg-[#12161E]/80 border border-[#1F2736] p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity size={13} className="text-red-500" />
                <span>Fight Pulse Momentum</span>
              </div>

              {/* Momentum Percentage Numbers & Dual Bar */}
              <div className="w-full space-y-1.5">
                <div className="flex items-center justify-between font-mono font-black text-xl sm:text-2xl px-1">
                  <span className="text-blue-400">{activeLiveFight.momentum.fighterAScore}%</span>
                  <span className="font-heading text-slate-600 text-sm font-bold tracking-widest uppercase">VS</span>
                  <span className="text-red-400">{activeLiveFight.momentum.fighterBScore}%</span>
                </div>

                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-slate-700/50">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-700" 
                    style={{ width: `${activeLiveFight.momentum.fighterAScore}%` }} 
                  />
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 transition-all duration-700" 
                    style={{ width: `${activeLiveFight.momentum.fighterBScore}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-0.5">
                  <span>STEVENSON DOMINANCE</span>
                  <span>HARUTYUNYAN DEFENCE</span>
                </div>
              </div>
            </div>

            {/* Fighter B (Red Corner / Underdog) */}
            <div 
              onClick={() => onOpenFighter(activeLiveFight.fighterB.id)}
              className="flex items-center justify-end gap-4 cursor-pointer group text-right"
            >
              <div className="space-y-1 order-2 sm:order-1">
                <div className="font-heading text-2xl sm:text-3xl font-black text-white group-hover:text-red-400 transition-colors uppercase leading-none">
                  {activeLiveFight.fighterB.name}
                </div>
                <div className="flex items-center justify-end gap-2 text-xs font-mono text-slate-300">
                  <span className="text-slate-500">({activeLiveFight.fighterB.record.kos} KOs)</span>
                  <span>{activeLiveFight.fighterB.record.wins}-{activeLiveFight.fighterB.record.losses}-{activeLiveFight.fighterB.record.draws}</span>
                  <span>{activeLiveFight.fighterB.bio.flag}</span>
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                  {activeLiveFight.fighterB.physical.division} · {activeLiveFight.fighterB.bio.stance}
                </div>
              </div>
              <div className="order-1 sm:order-2 w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-red-500/60 group-hover:border-red-400 shadow-xl shrink-0">
                <img 
                  src={activeLiveFight.fighterB.image} 
                  alt={activeLiveFight.fighterB.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            </div>

          </div>

          {/* Real-time Odds Bar with Movement Sparkline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0A0D12] p-4 rounded-xl border border-[#1A222E]">
            
            {/* Fighter A Odds */}
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Favourite</div>
                <div className="font-heading text-2xl font-black text-white">
                  {formatOdds(activeLiveFight.liveOdds.fighterAOdds)}
                </div>
              </div>
              <span className="flex items-center text-xs font-mono font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2.5 py-1 rounded">
                <TrendingDown size={14} className="mr-1" />
                {activeLiveFight.liveOdds.fighterAChange}
              </span>
            </div>

            {/* Sparkline Movement */}
            <div className="flex flex-col items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Live Odds Movement (Fight Start → R6)
              </span>
              <div className="h-7 w-40 flex items-center justify-center">
                <svg viewBox="0 0 120 30" className="w-full h-full">
                  <path
                    d="M 0,25 Q 30,22 60,18 T 90,14 T 120,8"
                    fill="none"
                    stroke="#00B4D8"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 0,10 Q 30,14 60,18 T 90,24 T 120,28"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Fighter B Odds */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="flex items-center text-xs font-mono font-bold text-red-400 bg-red-950/70 border border-red-800/60 px-2.5 py-1 rounded">
                <TrendingUp size={14} className="mr-1" />
                +{activeLiveFight.liveOdds.fighterBChange}
              </span>
              <div className="text-right">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Underdog</div>
                <div className="font-heading text-2xl font-black text-white">
                  {formatOdds(activeLiveFight.liveOdds.fighterBOdds)}
                </div>
              </div>
            </div>

          </div>

          {/* Quick interactive test buttons for punching simulation */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#1A222E] text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <Target size={13} className="text-red-500" />
              <span>Simulate Ringside Punch:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => triggerManualPunch('A', 'jab', 'head')}
                className="px-2.5 py-1 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-700/50 text-blue-300 rounded font-mono text-[11px] transition-colors"
              >
                + Stevenson Jab (Head)
              </button>
              <button
                onClick={() => triggerManualPunch('A', 'power', 'body')}
                className="px-2.5 py-1 bg-blue-900/30 hover:bg-blue-800/50 border border-blue-700/50 text-blue-300 rounded font-mono text-[11px] transition-colors"
              >
                + Stevenson Power (Body)
              </button>
              <button
                onClick={() => triggerManualPunch('B', 'power', 'head')}
                className="px-2.5 py-1 bg-red-900/30 hover:bg-red-800/50 border border-red-700/50 text-red-300 rounded font-mono text-[11px] transition-colors"
              >
                + Harutyunyan Power (Head)
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* NAVIGATION TABS BELOW BANNER (Screenshot 9) */}
      <div className="flex items-center gap-2 border-b border-[#1C232E] pb-2 overflow-x-auto">
        {[
          { id: 'stats', label: 'Live Stats' },
          { id: 'rounds', label: 'Round by Round' },
          { id: 'odds', label: 'Odds' },
          { id: 'analysis', label: 'Analysis' },
          { id: 'tape', label: 'Tale of the Tape' },
          { id: 'feed', label: 'Live Feed' }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-md glow-red'
                  : 'text-slate-400 hover:text-white bg-[#11141A] border border-[#1E2532]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: 1. Live Stats (Screenshot 9) */}
      {activeSubTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLS: Compubox Live Stats + Round 6 Stats + Shot Map */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. LIVE FIGHT STATISTICS (COMPUBOX) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-red-500" />
                  <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                    Live Fight Statistics
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                  COMPUBOX VERIFIED
                </span>
              </div>

              {statsA && statsB && (
                <div className="space-y-3.5">
                  
                  {/* Total Punches Thrown */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-blue-400">{statsA.totalPunchesThrown}</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[11px]">Total Punches Thrown</span>
                      <span className="font-bold text-red-400">{statsB.totalPunchesThrown}</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 transition-all duration-300" style={{ width: `${(statsA.totalPunchesThrown / (statsA.totalPunchesThrown + statsB.totalPunchesThrown)) * 100}%` }} />
                      <div className="bg-red-500 transition-all duration-300" style={{ width: `${(statsB.totalPunchesThrown / (statsA.totalPunchesThrown + statsB.totalPunchesThrown)) * 100}%` }} />
                    </div>
                  </div>

                  {/* Total Punches Landed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-blue-400">{statsA.totalPunchesLanded}</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[11px]">Total Punches Landed</span>
                      <span className="font-bold text-red-400">{statsB.totalPunchesLanded}</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 transition-all duration-300" style={{ width: `${(statsA.totalPunchesLanded / (statsA.totalPunchesLanded + statsB.totalPunchesLanded)) * 100}%` }} />
                      <div className="bg-red-500 transition-all duration-300" style={{ width: `${(statsB.totalPunchesLanded / (statsA.totalPunchesLanded + statsB.totalPunchesLanded)) * 100}%` }} />
                    </div>
                  </div>

                  {/* Accuracy */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-blue-400">{statsA.accuracy}%</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[11px]">Accuracy</span>
                      <span className="font-bold text-red-400">{statsB.accuracy}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 transition-all duration-300" style={{ width: `${(statsA.accuracy / (statsA.accuracy + statsB.accuracy)) * 100}%` }} />
                      <div className="bg-red-500 transition-all duration-300" style={{ width: `${(statsB.accuracy / (statsA.accuracy + statsB.accuracy)) * 100}%` }} />
                    </div>
                  </div>

                  {/* Jabs Landed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-blue-400">{statsA.jabsLanded}</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[11px]">Jabs Landed</span>
                      <span className="font-bold text-red-400">{statsB.jabsLanded}</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 transition-all duration-300" style={{ width: `${(statsA.jabsLanded / (statsA.jabsLanded + statsB.jabsLanded)) * 100}%` }} />
                      <div className="bg-red-500 transition-all duration-300" style={{ width: `${(statsB.jabsLanded / (statsA.jabsLanded + statsB.jabsLanded)) * 100}%` }} />
                    </div>
                  </div>

                  {/* Power Punches Landed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="font-bold text-blue-400">{statsA.powerLanded}</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[11px]">Power Landed</span>
                      <span className="font-bold text-red-400">{statsB.powerLanded}</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-blue-500 transition-all duration-300" style={{ width: `${(statsA.powerLanded / (statsA.powerLanded + statsB.powerLanded)) * 100}%` }} />
                      <div className="bg-red-500 transition-all duration-300" style={{ width: `${(statsB.powerLanded / (statsA.powerLanded + statsB.powerLanded)) * 100}%` }} />
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* 2. ROUND 6 STATISTICS BREAKDOWN */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                  Round 6 Statistics
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-blue-400 font-bold">Stevenson</span>
                  <span className="text-slate-500">vs</span>
                  <span className="text-red-400 font-bold">Harutyunyan</span>
                </div>
              </div>

              {roundStatsA && roundStatsB && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <tbody>
                      <tr className="border-b border-[#1A222E]">
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.totalPunchesThrown}</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Total Punches</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.totalPunchesThrown}</td>
                      </tr>
                      <tr className="border-b border-[#1A222E]">
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.totalPunchesLanded}</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Punches Landed</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.totalPunchesLanded}</td>
                      </tr>
                      <tr className="border-b border-[#1A222E]">
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.accuracy}%</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Accuracy</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.accuracy}%</td>
                      </tr>
                      <tr className="border-b border-[#1A222E]">
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.jabsThrown}</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Jabs Thrown</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.jabsThrown}</td>
                      </tr>
                      <tr className="border-b border-[#1A222E]">
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.jabsLanded}</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Jabs Landed</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.jabsLanded}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold text-blue-400">{roundStatsA.powerLanded}</td>
                        <td className="py-2.5 text-center text-slate-400 font-sans uppercase">Power Landed</td>
                        <td className="py-2.5 text-right font-bold text-red-400">{roundStatsB.powerLanded}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 3. SHOT MAP - ROUND 6 (Screenshot 9) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <div className="flex items-center gap-2">
                  <Target size={18} className="text-red-500" />
                  <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                    Shot Map — Round 6
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm" /> Landed
                  </span>
                  <span className="flex items-center gap-1.5 text-red-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" /> Power
                  </span>
                </div>
              </div>

              {/* Interactive Boxer Silhouettes with Punch Impact Points */}
              <div className="grid grid-cols-2 gap-4 py-4">
                
                {/* Stevenson Silhouette */}
                <div className="relative bg-[#0A0D12] border border-[#1C232E] rounded-xl p-4 flex flex-col items-center">
                  <span className="font-heading text-base font-bold text-blue-400 mb-2 uppercase">
                    Shakur Stevenson
                  </span>
                  
                  {/* Silhouette SVG */}
                  <div className="relative w-36 h-48 flex items-center justify-center">
                    <svg viewBox="0 0 100 140" className="w-full h-full text-slate-800 fill-current stroke-slate-700 stroke-1">
                      {/* Boxer Body Shape */}
                      <circle cx="50" cy="22" r="14" />
                      <path d="M 28,45 C 32,38 68,38 72,45 C 80,55 86,72 84,95 C 78,92 68,85 50,85 C 32,85 22,92 16,95 C 14,72 20,55 28,45 Z" />
                      <path d="M 20,55 L 10,75 L 18,85 L 28,70 Z" />
                      <path d="M 80,55 L 90,75 L 82,85 L 72,70 Z" />
                      <path d="M 32,95 L 34,135 L 46,135 L 46,100 Z" />
                      <path d="M 68,95 L 66,135 L 54,135 L 54,100 Z" />
                    </svg>

                    {/* Impact Dots on Stevenson */}
                    <div className="absolute top-[20%] left-[50%] w-3 h-3 rounded-full bg-cyan-400 animate-ping opacity-75" />
                    <div className="absolute top-[20%] left-[50%] w-3 h-3 rounded-full bg-cyan-400 shadow-lg glow-blue" />
                    <div className="absolute top-[26%] left-[44%] w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <div className="absolute top-[52%] left-[48%] w-3 h-3 rounded-full bg-cyan-400" />
                    <div className="absolute top-[56%] left-[54%] w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 mt-2">11 Landed Shots</span>
                </div>

                {/* Harutyunyan Silhouette */}
                <div className="relative bg-[#0A0D12] border border-[#1C232E] rounded-xl p-4 flex flex-col items-center">
                  <span className="font-heading text-base font-bold text-red-400 mb-2 uppercase">
                    Artem Harutyunyan
                  </span>

                  {/* Silhouette SVG */}
                  <div className="relative w-36 h-48 flex items-center justify-center">
                    <svg viewBox="0 0 100 140" className="w-full h-full text-slate-800 fill-current stroke-slate-700 stroke-1">
                      <circle cx="50" cy="22" r="14" />
                      <path d="M 28,45 C 32,38 68,38 72,45 C 80,55 86,72 84,95 C 78,92 68,85 50,85 C 32,85 22,92 16,95 C 14,72 20,55 28,45 Z" />
                      <path d="M 20,55 L 10,75 L 18,85 L 28,70 Z" />
                      <path d="M 80,55 L 90,75 L 82,85 L 72,70 Z" />
                      <path d="M 32,95 L 34,135 L 46,135 L 46,100 Z" />
                      <path d="M 68,95 L 66,135 L 54,135 L 54,100 Z" />
                    </svg>

                    {/* Impact Dots on Harutyunyan */}
                    <div className="absolute top-[24%] left-[48%] w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
                    <div className="absolute top-[24%] left-[48%] w-3 h-3 rounded-full bg-red-500 shadow-lg glow-red" />
                    <div className="absolute top-[55%] left-[50%] w-2.5 h-2.5 rounded-full bg-red-500" />
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 mt-2">4 Landed Shots</span>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Live Feed + Betting Odds + Judges Scorecard + Signals */}
          <div className="space-y-6">
            
            {/* 1. LIVE FEED (Play-by-play) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <div className="flex items-center gap-2">
                  <Radio size={16} className="text-red-500 animate-pulse" />
                  <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                    Live Feed
                  </h3>
                </div>
                <span className="text-xs font-mono text-slate-400">R6 Current</span>
              </div>

              <div className="space-y-3">
                {activeLiveFight.liveFeed.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 text-xs">
                    <span className="font-mono font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded shrink-0 border border-red-900/50">
                      {item.time}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. BETTING ODDS (LIVE) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                  Betting Odds (Live)
                </h3>
                <button 
                  onClick={() => onNavigateTab('odds')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  View All Odds <ChevronRight size={14} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#1C232E] text-slate-400 font-sans uppercase text-[10px]">
                      <th className="text-left pb-2">Bookmaker</th>
                      <th className="text-center pb-2 text-blue-400">Stevenson</th>
                      <th className="text-right pb-2 text-red-400">Harutyunyan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLiveFight.liveOdds.bookmakers.map((bm) => (
                      <tr key={bm.bookmaker} className="border-b border-[#171E28]">
                        <td className="py-2 font-sans font-bold text-slate-200">{bm.bookmaker}</td>
                        <td className="py-2 text-center font-bold text-blue-400">{formatOdds(bm.homeOdds)}</td>
                        <td className="py-2 text-right font-bold text-red-400">{formatOdds(bm.awayOdds)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. JUDGES SCORECARD (UNOFFICIAL) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                  Judges' Scorecards (Unofficial)
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Fight Pulse Model
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#1C232E] text-slate-400 uppercase text-[10px]">
                      <th className="text-left pb-2">Round</th>
                      <th className="text-center pb-2">Judge 1</th>
                      <th className="text-center pb-2">Judge 2</th>
                      <th className="text-center pb-2">Judge 3</th>
                      <th className="text-right pb-2 text-red-400 font-bold">Fight Pulse</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeLiveFight.judgesScores.map((score) => (
                      <tr key={score.round} className="border-b border-[#171E28]">
                        <td className="py-2 font-bold text-slate-300">R{score.round}</td>
                        <td className="py-2 text-center text-slate-300">{score.judge1}</td>
                        <td className="py-2 text-center text-slate-300">{score.judge2}</td>
                        <td className="py-2 text-center text-slate-300">{score.judge3}</td>
                        <td className="py-2 text-right font-bold text-red-400">{score.fightPulseScore}</td>
                      </tr>
                    ))}
                    <tr className="font-bold text-white bg-[#141A23]">
                      <td className="py-2 px-1">TOTAL</td>
                      <td className="py-2 text-center text-blue-400">49 - 46</td>
                      <td className="py-2 text-center text-blue-400">49 - 46</td>
                      <td className="py-2 text-center text-blue-400">49 - 46</td>
                      <td className="py-2 text-right text-red-400 px-1">49 - 46</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. FIGHT PULSE ANALYSIS (Signals) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <h3 className="font-heading text-xl font-black text-white uppercase tracking-wide">
                  Fight Pulse Analysis
                </h3>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Derived
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Stevenson in control</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded font-bold">
                      High Conf
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Higher accuracy and cleaner shots in the last two rounds.</p>
                </div>

                <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Output increasing</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded font-bold">
                      High Conf
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Stevenson punch volume up 18% since Round 4.</p>
                </div>

                <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Harutyunyan struggling to land</span>
                    <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded font-bold">
                      Med Conf
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Landed just 4 punches in Round 6.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB CONTENT: 2. Round by Round Table */}
      {activeSubTab === 'rounds' && (
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-2xl font-black text-white uppercase tracking-wide">
              Official Round-by-Round Breakdown
            </h3>
            <span className="text-xs font-mono text-slate-400">Sanctioned Scores</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1C232E] text-slate-400 uppercase text-xs">
                  <th className="text-left pb-3">Round</th>
                  <th className="text-center pb-3 text-blue-400 font-bold">Shakur Stevenson</th>
                  <th className="text-center pb-3 text-red-400 font-bold">Artem Harutyunyan</th>
                  <th className="text-right pb-3">Round Winner</th>
                </tr>
              </thead>
              <tbody>
                {activeLiveFight.roundResults.map((r) => (
                  <tr key={r.round} className="border-b border-[#171E28]">
                    <td className="py-3 font-bold text-white">Round {r.round}</td>
                    <td className="py-3 text-center font-bold text-blue-400">{r.fighterAScore}</td>
                    <td className="py-3 text-center font-bold text-red-400">{r.fighterBScore}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2.5 py-1 rounded font-bold ${
                        r.winner === 'Stevenson' 
                          ? 'bg-blue-950/80 text-blue-400 border border-blue-800' 
                          : r.winner === 'Harutyunyan' 
                            ? 'bg-red-950/80 text-red-400 border border-red-800'
                            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800 animate-pulse'
                      }`}>
                        {r.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: 3. Odds Sub-Tab */}
      {activeSubTab === 'odds' && (
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-2xl font-black text-white uppercase tracking-wide">
              Live Ring Odds Comparison
            </h3>
            <span className="text-xs font-mono text-emerald-400">12 Bookmakers Active</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeLiveFight.liveOdds.bookmakers.map((b) => (
              <div key={b.bookmaker} className="p-4 bg-[#151A22] border border-[#232B38] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{b.bookmaker}</span>
                  {b.isBestPrice && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-mono font-bold">
                      Best Price
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#1F2734] font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Stevenson</span>
                    <span className="font-bold text-blue-400 text-base">{formatOdds(b.homeOdds)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block">Harutyunyan</span>
                    <span className="font-bold text-red-400 text-base">{formatOdds(b.awayOdds)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: 4. Analysis & Tale of the Tape */}
      {activeSubTab === 'tape' && (
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-6 space-y-6">
          <h3 className="font-heading text-2xl font-black text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
            Tale of the Tape
          </h3>

          <div className="max-w-2xl mx-auto overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <tbody>
                {[
                  { label: 'Age', valA: activeLiveFight.fighterA.physical.age, valB: activeLiveFight.fighterB.physical.age },
                  { label: 'Height', valA: activeLiveFight.fighterA.physical.height, valB: activeLiveFight.fighterB.physical.height },
                  { label: 'Reach', valA: activeLiveFight.fighterA.physical.reach, valB: activeLiveFight.fighterB.physical.reach },
                  { label: 'Stance', valA: activeLiveFight.fighterA.bio.stance, valB: activeLiveFight.fighterB.bio.stance },
                  { label: 'Division', valA: activeLiveFight.fighterA.physical.division, valB: activeLiveFight.fighterB.physical.division },
                  { label: 'KO %', valA: `${activeLiveFight.fighterA.record.koPercentage}%`, valB: `${activeLiveFight.fighterB.record.koPercentage}%` }
                ].map((row) => (
                  <tr key={row.label} className="border-b border-[#1A222E]">
                    <td className="py-3 font-bold text-blue-400">{row.valA}</td>
                    <td className="py-3 text-center text-slate-400 font-sans uppercase font-bold text-xs">{row.label}</td>
                    <td className="py-3 text-right font-bold text-red-400">{row.valB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
