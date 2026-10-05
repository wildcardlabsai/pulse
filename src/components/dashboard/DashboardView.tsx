import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Clock, 
  Calendar, 
  Trophy, 
  Play, 
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';
import { boxingService } from '../../lib/providers/boxingDataProvider';
import { VerificationBadge, SkeletonCard } from '../common/DataStates';
import { Fighter, BoxingEvent, Promotion } from '../../types/boxing';

interface DashboardViewProps {
  onNavigateTab: (tab: string, contextId?: string) => void;
  onOpenFight: (fightId: string) => void;
  onOpenFighter: (fighterId: string) => void;
  onOpenEvent: (eventId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onOpenFight,
  onOpenFighter,
  onOpenEvent
}) => {
  const { 
    activeLiveFight, 
    followedFighters, 
    toggleFollowFighter, 
    formatOdds 
  } = useLiveFight();

  const [allFighters, setAllFighters] = useState<Fighter[]>([]);
  const [events, setEvents] = useState<BoxingEvent[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [recentResults, setRecentResults] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      boxingService.getAllFighters(),
      boxingService.getEvents(),
      boxingService.getPromotions(),
      boxingService.getHistoricalResults()
    ]).then(([fList, eList, pList, rList]) => {
      if (isMounted) {
        setAllFighters(fList);
        setEvents(eList);
        setPromotions(pList);
        setRecentResults(rList);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const followedFighterList = allFighters.filter(f => followedFighters.includes(f.id));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Welcome & Date Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C232E] pb-4">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide uppercase">
            Good evening, Matt
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Here's what's happening in boxing today. Real-time telemetry active.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141820] border border-[#232B38] rounded-lg text-xs font-mono text-slate-300">
            <Calendar size={14} className="text-red-500" />
            <span>SAT 5 APR 2026</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Hero Live Now (2 cols on lg) + Live Fights Column (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* HERO LIVE NOW CARD (Spans 2 columns on desktop) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-[#11141A] border border-[#202734] shadow-xl">
          
          {/* Subtle Boxer Background Watermark */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80')`
            }}
          />

          <div className="relative z-10 p-5 sm:p-6 space-y-5">
            
            {/* Live Header Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1F2734] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold rounded-md uppercase tracking-wider glow-red">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  LIVE NOW
                </span>
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-slate-300 uppercase">
                  {activeLiveFight.title}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
                <span className="text-white font-bold bg-[#1A202C] px-2.5 py-1 rounded border border-slate-700">
                  ROUND {activeLiveFight.currentRound} OF {activeLiveFight.scheduledRounds}
                </span>
                <span className="text-red-400 font-bold px-2 py-1 bg-red-950/60 border border-red-800/60 rounded animate-pulse">
                  {activeLiveFight.roundTimer}
                </span>
              </div>
            </div>

            {/* Fighter Matchup & Photos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 py-2">
              
              {/* Fighter A */}
              <div 
                onClick={() => onOpenFighter(activeLiveFight.fighterA.id)}
                className="flex items-center sm:flex-col sm:items-start gap-3 cursor-pointer group"
              >
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-400 shadow-lg shrink-0">
                  <img 
                    src={activeLiveFight.fighterA.image} 
                    alt={activeLiveFight.fighterA.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="font-heading text-xl sm:text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {activeLiveFight.fighterA.name}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <span>{activeLiveFight.fighterA.bio.flag}</span>
                    <span>{activeLiveFight.fighterA.record.wins}-{activeLiveFight.fighterA.record.losses}-{activeLiveFight.fighterA.record.draws}</span>
                  </div>
                </div>
              </div>

              {/* VS & Momentum Preview */}
              <div className="flex flex-col items-center justify-center text-center space-y-2 py-2">
                <span className="font-heading text-2xl font-black text-slate-500 italic">VS</span>
                <div className="w-full space-y-1">
                  <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="text-blue-400">{activeLiveFight.momentum.fighterAScore}%</span>
                    <span className="text-slate-400">FIGHT PULSE MOMENTUM</span>
                    <span className="text-red-400">{activeLiveFight.momentum.fighterBScore}%</span>
                  </div>
                  {/* Split Momentum Bar */}
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-500 transition-all duration-500" 
                      style={{ width: `${activeLiveFight.momentum.fighterAScore}%` }} 
                    />
                    <div 
                      className="bg-red-500 transition-all duration-500" 
                      style={{ width: `${activeLiveFight.momentum.fighterBScore}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Fighter B */}
              <div 
                onClick={() => onOpenFighter(activeLiveFight.fighterB.id)}
                className="flex items-center sm:flex-col sm:items-end gap-3 cursor-pointer group text-right"
              >
                <div className="order-2 sm:order-1">
                  <div className="font-heading text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                    {activeLiveFight.fighterB.name}
                  </div>
                  <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 font-mono">
                    <span>{activeLiveFight.fighterB.record.wins}-{activeLiveFight.fighterB.record.losses}-{activeLiveFight.fighterB.record.draws}</span>
                    <span>{activeLiveFight.fighterB.bio.flag}</span>
                  </div>
                </div>
                <div className="order-1 sm:order-2 w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-red-500/50 group-hover:border-red-400 shadow-lg shrink-0">
                  <img 
                    src={activeLiveFight.fighterB.image} 
                    alt={activeLiveFight.fighterB.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              </div>

            </div>

            {/* Live Odds & Movement Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#0A0C0F]/80 p-3.5 rounded-xl border border-[#1E2532]">
              
              {/* Favourite Odds */}
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <div className="text-left">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Favourite</div>
                  <div className="text-xl font-heading font-black text-white">
                    {formatOdds(activeLiveFight.liveOdds.fighterAOdds)}
                  </div>
                </div>
                <span className="flex items-center text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                  <TrendingDown size={13} className="mr-1" />
                  {activeLiveFight.liveOdds.fighterAChange}
                </span>
              </div>

              {/* Sparkline Movement Preview */}
              <div className="flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Live Odds Movement
                </span>
                <div className="h-6 w-32 flex items-center justify-center">
                  <svg viewBox="0 0 100 25" className="w-full h-full stroke-current">
                    <path
                      d="M0,20 Q20,16 40,14 T80,10 T100,6"
                      fill="none"
                      stroke="#00B4D8"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M0,10 Q25,12 50,15 T80,18 T100,22"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Underdog Odds */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="flex items-center text-xs font-mono text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                  <TrendingUp size={13} className="mr-1" />
                  +{activeLiveFight.liveOdds.fighterBChange}
                </span>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Underdog</div>
                  <div className="text-xl font-heading font-black text-white">
                    {formatOdds(activeLiveFight.liveOdds.fighterBOdds)}
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions & Deep Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Overview', tab: 'live' },
                  { label: 'Live Stats', tab: 'live' },
                  { label: 'Round by Round', tab: 'live' },
                  { label: 'Odds', tab: 'odds' },
                  { label: 'Analysis', tab: 'intelligence' },
                  { label: 'Live Feed', tab: 'live' }
                ].map((btn, idx) => (
                  <button
                    key={btn.label + idx}
                    onClick={() => onNavigateTab(btn.tab, activeLiveFight.id)}
                    className="px-3 py-1.5 bg-[#171C25] hover:bg-[#202734] border border-[#263142] text-xs font-medium text-slate-300 hover:text-white rounded-lg transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => onOpenFight(activeLiveFight.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md glow-red transition-all cursor-pointer uppercase tracking-wider"
              >
                <Play size={13} fill="currentColor" />
                <span>Watch Live Centre</span>
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Today's Live Fights & Upcoming Today */}
        <div className="space-y-4">
          
          {/* Today's Live Fights Card */}
          <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide">
                  Today's Live Fights
                </h3>
                <span className="text-xs font-mono font-bold text-red-500 bg-red-950/60 px-1.5 py-0.5 rounded">
                  2 LIVE
                </span>
              </div>
              <button 
                onClick={() => onNavigateTab('live')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                View All <ChevronRight size={14} />
              </button>
            </div>

            {/* Live Fight Item 1 */}
            <div 
              onClick={() => onOpenFight('stevenson-vs-harutyunyan')}
              className="p-3 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-900/50">
                  R6 2:15
                </span>
                <span className="text-slate-400 font-medium">WBC Lightweight</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold text-white truncate">
                  Shakur Stevenson <span className="text-slate-500 font-normal">vs</span> Artem Harutyunyan
                </div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
                  <span className="text-blue-400">{formatOdds(1.22)}</span>
                  <span className="text-red-400">{formatOdds(4.20)}</span>
                </div>
              </div>
            </div>

            {/* Live Fight Item 2 */}
            <div 
              onClick={() => onOpenFight('pacheco-vs-sulecki')}
              className="p-3 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-900/50">
                  R3 1:08
                </span>
                <span className="text-slate-400 font-medium">Super Middleweight</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold text-white truncate">
                  Diego Pacheco <span className="text-slate-500 font-normal">vs</span> Maciej Sulecki
                </div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
                  <span className="text-blue-400">{formatOdds(1.36)}</span>
                  <span className="text-red-400">{formatOdds(3.10)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Next Today Card */}
          <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-2.5">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-400" />
                <h3 className="font-heading text-lg font-bold text-white uppercase tracking-wide">
                  Upcoming Next
                </h3>
                <span className="text-xs text-slate-400">3 Fights Today</span>
              </div>
              <button 
                onClick={() => onNavigateTab('upcoming')}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
              >
                View All <ChevronRight size={14} />
              </button>
            </div>

            {/* Upcoming Fight 1 */}
            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono font-semibold">In 42m</span>
                <span className="text-slate-400">Lightweight</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Zepeda vs Farmer</span>
                <span className="font-mono text-xs text-slate-300 font-semibold">{formatOdds(1.75)} / {formatOdds(2.05)}</span>
              </div>
            </div>

            {/* Upcoming Fight 2 */}
            <div 
              onClick={() => onOpenFight('catterall-vs-prograis')}
              className="p-3 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-mono font-semibold">In 2h 15m</span>
                <span className="text-slate-400">Super Lightweight</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">Catterall vs Prograis</span>
                <span className="font-mono text-xs text-slate-300 font-semibold">{formatOdds(1.62)} / {formatOdds(2.30)}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* UPCOMING MAJOR EVENTS BANNER (Screenshot 10) */}
      <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar size={18} className="text-red-500" />
            <h2 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Upcoming Major Events
            </h2>
          </div>
          <button 
            onClick={() => onNavigateTab('events')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            View All Events <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.slice(0, 3).map((event) => (
            <div
              key={event.id}
              onClick={() => onOpenEvent(event.id)}
              className="group relative overflow-hidden rounded-xl bg-[#151A22] border border-[#242D3C] hover:border-red-500/50 p-4 transition-all cursor-pointer space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-1 rounded text-center">
                    <div className="text-[10px] font-bold uppercase">{event.date.split(' ')[1]}</div>
                    <div className="font-mono font-black text-sm">{event.date.split(' ')[2]}</div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                      {event.promotion.name}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {event.name}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center justify-between pt-1 border-t border-[#202734]">
                <span>{event.venue}, {event.location}</span>
                <span className="font-mono text-slate-300 font-semibold">{event.broadcast.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THREE COLUMN ROW: Biggest Odds Movers | Latest Results | Followed Fighters */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* BIGGEST ODDS MOVERS */}
        <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Biggest Odds Movers
              </h3>
            </div>
            <button 
              onClick={() => onNavigateTab('odds')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Conor Benn', match: 'vs Peter Dobson', change: '+42%', odds: '1.62 → 2.30', positive: true },
              { name: 'Anthony Joshua', match: 'vs Deontay Wilder', change: '-28%', odds: '2.10 → 1.52', positive: false },
              { name: 'Katie Taylor', match: 'vs Chantelle Cameron', change: '+35%', odds: '1.80 → 2.43', positive: true }
            ].map((mover, idx) => (
              <div 
                key={mover.name + idx}
                className="flex items-center justify-between p-3 bg-[#151A22] border border-[#232B38] rounded-xl hover:bg-[#1A212B] transition-colors"
              >
                <div>
                  <div className="text-sm font-bold text-white">{mover.name}</div>
                  <div className="text-xs text-slate-400">{mover.match}</div>
                </div>

                <div className="text-right">
                  <div className={`text-xs font-mono font-bold ${mover.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {mover.change}
                  </div>
                  <div className="text-xs font-mono text-slate-400">{mover.odds}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST RESULTS */}
        <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-400" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Latest Results
              </h3>
            </div>
            <button 
              onClick={() => onNavigateTab('results')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-2.5">
            {recentResults.slice(0, 4).map((res: any, idx: number) => (
              <div 
                key={res.fight + idx}
                onClick={() => onNavigateTab('results', res.fight)}
                className="flex items-center justify-between p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl hover:bg-[#1A212B] cursor-pointer transition-colors text-xs"
              >
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block">{res.date}</span>
                  <span className="font-bold text-slate-200">{res.fight}</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50 font-bold">
                    {res.result} {res.method}
                  </span>
                  <span className="text-slate-400">{res.round}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOLLOWED FIGHTERS */}
        <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-4 md:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <Flame size={18} className="text-red-500" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Followed Fighters
              </h3>
            </div>
            <button 
              onClick={() => onNavigateTab('fighters')}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              Manage <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-2 gap-2.5">
            {followedFighterList.slice(0, 4).map((fighter) => (
              <div 
                key={fighter.id}
                onClick={() => onOpenFighter(fighter.id)}
                className="p-2.5 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl flex items-center gap-2.5 cursor-pointer transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                  <img src={fighter.image} alt={fighter.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate group-hover:text-red-400 transition-colors">
                    {fighter.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FIGHT PULSE INTELLIGENCE SECTION (Screenshot 10) */}
      <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-red-600/20 text-red-500 flex items-center justify-center">
              <Radio size={14} className="animate-pulse" />
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-white uppercase tracking-wide">
              Fight Pulse Intelligence
            </h2>
          </div>
          <button 
            onClick={() => onNavigateTab('intelligence')}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
          >
            View All Intelligence <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Intel Card 1 */}
          <div 
            onClick={() => onNavigateTab('intelligence')}
            className="p-4 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 font-bold uppercase tracking-wider text-[10px]">
                Live Analysis
              </span>
              <span className="text-slate-500 font-mono">10m ago</span>
            </div>
            <h4 className="font-heading text-lg font-bold text-white group-hover:text-red-400 transition-colors">
              Why Stevenson is in control through 5 rounds
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              Deep punch tracking confirms an 80% jab accuracy rate and 78% ring center occupancy against Harutyunyan.
            </p>
          </div>

          {/* Intel Card 2 */}
          <div 
            onClick={() => onOpenFight('joshua-vs-wilder')}
            className="p-4 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-600/20 text-blue-400 font-bold uppercase tracking-wider text-[10px]">
                Pre-Fight Intelligence
              </span>
              <span className="text-slate-500 font-mono">1h ago</span>
            </div>
            <h4 className="font-heading text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              Joshua vs Wilder: Key stats and comparison
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              Career averages breakdown: Joshua lands 58 punches/round vs Wilder's explosive 97% knockout conversion.
            </p>
          </div>

          {/* Intel Card 3 */}
          <div 
            onClick={() => onNavigateTab('odds')}
            className="p-4 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-2 group"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-600/20 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
                Odds Insight
              </span>
              <span className="text-slate-500 font-mono">3h ago</span>
            </div>
            <h4 className="font-heading text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
              Best value bets for this weekend's fights
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              Bookmaker margin disparities across Catterall vs Prograis and Benn vs Dobson identified by market telemetry.
            </p>
          </div>

        </div>
      </div>

      {/* PROMOTIONS FOOTER LOGOS (Screenshot 10 & 12) */}
      <div className="bg-[#11141A] border border-[#202734] rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Covering All Major UK & USA Promotions
          </span>
          <span className="text-xs font-mono text-slate-500">Official Data Feeds</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 py-2 opacity-80 hover:opacity-100 transition-opacity">
          {promotions.map((promo: Promotion) => (
            <div key={promo.id} className="flex items-center gap-2 group cursor-pointer">
              <span className="font-heading text-base font-black text-slate-400 group-hover:text-white transition-colors tracking-wider">
                {promo.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
