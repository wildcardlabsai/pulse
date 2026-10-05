import React, { useState } from 'react';
import { 
  Radio, 
  Clock, 
  Bell, 
  ChevronLeft, 
  MoreVertical, 
  Play, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity, 
  BarChart2, 
  Percent, 
  FileText, 
  Sparkles,
  Info
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';
import { FIGHTERS } from '../../data/verifiedBoxingData';

interface MobileLiveViewProps {
  onBackToDesktop?: () => void;
}

export const MobileLiveView: React.FC<MobileLiveViewProps> = ({ onBackToDesktop }) => {
  const { formatOdds, roundTimer } = useLiveFight();
  const [mobileTab, setMobileTab] = useState<'live' | 'stats' | 'odds' | 'rounds' | 'insights'>('live');
  const [statsViewMode, setStatsViewMode] = useState<'total' | 'round'>('total');

  const joshua = FIGHTERS.find(f => f.id === 'anthony-joshua')!;
  const wilder = FIGHTERS.find(f => f.id === 'deontay-wilder')!;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#0A0C0F] text-slate-100 flex flex-col justify-between border-x border-[#1C232E] shadow-2xl relative pb-20">
      
      {/* Top Mobile Bar (Screenshot 1) */}
      <div className="sticky top-0 z-30 bg-[#0D1015]/95 backdrop-blur-md px-4 py-3 border-b border-[#1C232E] flex items-center justify-between">
        <button 
          onClick={onBackToDesktop} 
          className="text-slate-400 hover:text-white p-1"
          title="Back to Desktop Dashboard"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex items-center gap-1.5 font-heading text-xl font-black text-white tracking-wider">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 animate-pulse">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          <span>FIGHT <span className="text-red-500">PULSE</span></span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Bell size={18} className="text-slate-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-600" />
          </div>
          <MoreVertical size={18} className="text-slate-400" />
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-y-auto">
        
        {/* Live Round Header & Matchup Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#11141A] border border-[#1F2734] p-4 text-center space-y-3">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-600 text-white font-bold uppercase text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              LIVE
            </span>
            <span className="font-bold text-white">Round 7 of 12</span>
            <span className="text-red-400 font-bold bg-red-950/80 px-2 py-0.5 rounded border border-red-800/80">
              1:24
            </span>
          </div>

          {/* Fighters Faceoff */}
          <div className="grid grid-cols-2 gap-4 items-center pt-2">
            <div className="text-left space-y-1">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-red-500/60 shadow-lg">
                <img src={joshua.image} alt={joshua.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-heading text-lg font-black text-white leading-tight uppercase">
                Anthony<br />Joshua
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                🇬🇧 28-3-0
              </div>
            </div>

            <div className="text-right space-y-1 flex flex-col items-end">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-500/60 shadow-lg">
                <img src={wilder.image} alt={wilder.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-heading text-lg font-black text-white leading-tight uppercase">
                Deontay<br />Wilder
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                🇺🇸 43-2-1
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 font-mono border-t border-[#1C232E] pt-2">
            Heavyweight · Kingdom Arena, Riyadh
          </div>
        </div>

        {/* In-App Tab Switcher (Live, Stats, Odds, Round by Round, Insights) */}
        <div className="grid grid-cols-5 gap-1 bg-[#141820] p-1 rounded-xl border border-[#232B38] text-[11px] font-bold">
          {(['live', 'stats', 'odds', 'rounds', 'insights'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`py-1.5 rounded-lg capitalize transition-all ${
                mobileTab === tab
                  ? 'bg-red-600 text-white shadow-sm font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'rounds' ? 'Rounds' : tab}
            </button>
          ))}
        </div>

        {/* TAB 1: LIVE MOMENTUM & ODDS (Screenshot 1 Left) */}
        {mobileTab === 'live' && (
          <div className="space-y-4">
            
            {/* FIGHT PULSE MOMENTUM CARD */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Activity size={15} className="text-red-500" />
                  <span className="font-heading text-base font-bold text-white uppercase tracking-wide">
                    Fight Pulse Momentum
                  </span>
                </div>
                <Info size={14} className="text-slate-500" />
              </div>

              {/* Dual Circular Gauges & Sparkline */}
              <div className="flex items-center justify-between gap-3 py-2">
                
                {/* Joshua Gauge (62) */}
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center font-mono font-black text-2xl text-white shadow-md glow-red">
                    62
                  </div>
                  <div className="text-xs font-bold text-white">Joshua</div>
                  <div className="text-[9px] text-slate-400 font-mono">Momentum</div>
                </div>

                {/* Line Graph R1-R7 */}
                <div className="flex-1 h-14 relative px-1">
                  <svg viewBox="0 0 100 40" className="w-full h-full">
                    <path
                      d="M 5,28 Q 20,25 40,20 T 70,12 T 95,8"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 5,12 Q 20,15 40,20 T 70,28 T 95,32"
                      fill="none"
                      stroke="#00B4D8"
                      strokeWidth="2.5"
                    />
                    <circle cx="95" cy="8" r="3" fill="#EF4444" />
                    <circle cx="95" cy="32" r="3" fill="#00B4D8" />
                  </svg>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500 pt-0.5">
                    <span>R1</span>
                    <span>R2</span>
                    <span>R3</span>
                    <span>R4</span>
                    <span>R5</span>
                    <span>R6</span>
                    <span className="text-red-500 font-bold">R7</span>
                  </div>
                </div>

                {/* Wilder Gauge (38) */}
                <div className="text-center space-y-1">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center font-mono font-black text-2xl text-white shadow-md glow-blue">
                    38
                  </div>
                  <div className="text-xs font-bold text-white">Wilder</div>
                  <div className="text-[9px] text-slate-400 font-mono">Momentum</div>
                </div>

              </div>

              {/* Momentum Explanation Card */}
              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] text-xs text-slate-300 leading-relaxed">
                Joshua controlling the centre, higher output and landing the cleaner shots in rounds 5–7.
              </div>
            </div>

            {/* LIVE ODDS TABLE (Screenshot 1) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-bold text-white uppercase tracking-wide">
                  Live Odds
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Best Price →</span>
              </div>

              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1C232E] text-slate-400 uppercase text-[10px]">
                    <th className="text-left pb-2">Bookmaker</th>
                    <th className="text-center pb-2 text-red-400">Joshua</th>
                    <th className="text-center pb-2">Draw</th>
                    <th className="text-right pb-2 text-blue-400">Wilder</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Sky Bet', josh: 1.36, draw: '21.00', wild: 3.50, best: true },
                    { name: 'Betfred', josh: 1.40, draw: '19.00', wild: 3.25 },
                    { name: 'Bet365', josh: 1.38, draw: '21.00', wild: 3.40 },
                    { name: 'Unibet', josh: 1.37, draw: '20.00', wild: 3.30 },
                    { name: 'William Hill', josh: 1.40, draw: '19.00', wild: 3.25 }
                  ].map((row) => (
                    <tr key={row.name} className="border-b border-[#171E28]">
                      <td className="py-2 font-bold text-slate-200">{row.name}</td>
                      <td className="py-2 text-center">
                        <span className={`px-1.5 py-0.5 rounded font-bold ${row.best ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'text-slate-200'}`}>
                          {formatOdds(row.josh)}
                        </span>
                      </td>
                      <td className="py-2 text-center text-slate-400">{row.draw}</td>
                      <td className="py-2 text-right font-bold text-slate-200">{formatOdds(row.wild)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 2: LIVE FIGHT STATS & PUNCH MAP (Screenshot 1 Center) */}
        {mobileTab === 'stats' && (
          <div className="space-y-4">
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-bold text-white uppercase tracking-wide">
                  Live Fight Stats
                </span>
                <div className="flex items-center gap-1 bg-[#151A22] p-0.5 rounded-lg border border-[#232B38] text-[10px] font-mono">
                  <button 
                    onClick={() => setStatsViewMode('total')} 
                    className={`px-2 py-0.5 rounded ${statsViewMode === 'total' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Total
                  </button>
                  <button 
                    onClick={() => setStatsViewMode('round')} 
                    className={`px-2 py-0.5 rounded ${statsViewMode === 'round' ? 'bg-red-600 text-white font-bold' : 'text-slate-400'}`}
                  >
                    Round 7
                  </button>
                </div>
              </div>

              {/* Compubox Horizontal Comparison Bars */}
              <div className="space-y-3 font-mono text-xs">
                {[
                  { label: 'Total Punches Thrown', a: 156, b: 98 },
                  { label: 'Total Punches Landed', a: 68, b: 32 },
                  { label: 'Accuracy', a: '44%', b: '33%' },
                  { label: 'Jabs Thrown', a: 42, b: 16 },
                  { label: 'Jabs Landed', a: 18, b: 7 },
                  { label: 'Power Punches Thrown', a: 114, b: 82 },
                  { label: 'Power Punches Landed', a: 50, b: 25 },
                  { label: 'Knockdowns', a: 0, b: 0 }
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-red-500 font-bold">{stat.a}</span>
                      <span className="text-slate-400 font-sans uppercase font-bold text-[9px]">{stat.label}</span>
                      <span className="text-blue-400 font-bold">{stat.b}</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
                      <div className="bg-red-500" style={{ width: '60%' }} />
                      <div className="bg-blue-500" style={{ width: '40%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PUNCH MAP (LANDED SHOTS) - Screenshot 1 Center */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3">
              <span className="font-heading text-base font-bold text-white uppercase tracking-wide block">
                Punch Map (Landed Shots)
              </span>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="bg-[#0A0D12] p-3 rounded-xl border border-[#1C232E] text-center">
                  <span className="font-heading text-xs font-bold text-red-400 uppercase block mb-1">
                    Joshua
                  </span>
                  <div className="relative w-24 h-32 mx-auto">
                    <svg viewBox="0 0 100 140" className="w-full h-full text-slate-800 fill-current">
                      <circle cx="50" cy="22" r="14" />
                      <path d="M 28,45 C 32,38 68,38 72,45 C 80,55 86,72 84,95 C 78,92 68,85 50,85 C 32,85 22,92 16,95 C 14,72 20,55 28,45 Z" />
                    </svg>
                    {/* Glowing Impact points on head and chest */}
                    <div className="absolute top-[20%] left-[48%] w-3 h-3 rounded-full bg-red-500 glow-red" />
                    <div className="absolute top-[35%] left-[42%] w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="absolute top-[50%] left-[52%] w-3 h-3 rounded-full bg-red-500 glow-red" />
                  </div>
                </div>

                <div className="bg-[#0A0D12] p-3 rounded-xl border border-[#1C232E] text-center">
                  <span className="font-heading text-xs font-bold text-blue-400 uppercase block mb-1">
                    Wilder
                  </span>
                  <div className="relative w-24 h-32 mx-auto">
                    <svg viewBox="0 0 100 140" className="w-full h-full text-slate-800 fill-current">
                      <circle cx="50" cy="22" r="14" />
                      <path d="M 28,45 C 32,38 68,38 72,45 C 80,55 86,72 84,95 C 78,92 68,85 50,85 C 32,85 22,92 16,95 C 14,72 20,55 28,45 Z" />
                    </svg>
                    <div className="absolute top-[22%] left-[48%] w-3 h-3 rounded-full bg-blue-400 glow-blue" />
                    <div className="absolute top-[45%] left-[50%] w-2.5 h-2.5 rounded-full bg-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ROUND BY ROUND & JUDGES SCORECARDS (Screenshot 1 Right) */}
        {mobileTab === 'rounds' && (
          <div className="space-y-4">
            
            {/* Round By Round Table */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3">
              <span className="font-heading text-base font-bold text-white uppercase tracking-wide block">
                Round by Round
              </span>

              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1C232E] text-slate-400 uppercase text-[10px]">
                    <th className="text-left pb-2">R</th>
                    <th className="text-center pb-2 text-red-400">Joshua</th>
                    <th className="text-center pb-2 text-blue-400">Wilder</th>
                    <th className="text-right pb-2">Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, a: 10, b: 9, win: 'Joshua', c: 'text-red-400' },
                    { r: 2, a: 10, b: 9, win: 'Joshua', c: 'text-red-400' },
                    { r: 3, a: 9, b: 10, win: 'Wilder', c: 'text-blue-400' },
                    { r: 4, a: 10, b: 9, win: 'Joshua', c: 'text-red-400' },
                    { r: 5, a: 10, b: 9, win: 'Joshua', c: 'text-red-400' },
                    { r: 6, a: 10, b: 9, win: 'Joshua', c: 'text-red-400' },
                    { r: 7, a: '-', b: '-', win: 'Live', c: 'text-emerald-400' }
                  ].map((row) => (
                    <tr key={row.r} className="border-b border-[#171E28]">
                      <td className="py-2 font-bold text-slate-400">{row.r}</td>
                      <td className="py-2 text-center font-bold text-red-400">{row.a}</td>
                      <td className="py-2 text-center font-bold text-blue-400">{row.b}</td>
                      <td className={`py-2 text-right font-bold ${row.c}`}>{row.win}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Round 6 Analysis with Video Card */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3">
              <span className="font-heading text-base font-bold text-white uppercase tracking-wide block">
                Round 6 Analysis
              </span>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-2">
                <div className="flex items-center gap-2 text-red-500 font-mono text-xs">
                  <Play size={13} fill="currentColor" />
                  <span>0:45 Replay Clip</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Joshua landed the cleaner shots in round 6, controlling distance with the jab and finding success with right hands to the head. Wilder showed moments but was largely on the back foot.
                </p>
              </div>
            </div>

            {/* Judges Scorecards (Unofficial) */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-heading text-base font-bold text-white uppercase tracking-wide">
                  Judges' Scorecards (Unofficial)
                </span>
                <span className="text-[9px] font-mono text-red-500 bg-red-950/80 px-2 py-0.5 rounded font-bold">
                  Fight Pulse
                </span>
              </div>

              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1C232E] text-slate-400 text-[10px]">
                    <th className="text-left pb-1">Round</th>
                    <th className="text-center pb-1">J1</th>
                    <th className="text-center pb-1">J2</th>
                    <th className="text-center pb-1">J3</th>
                    <th className="text-right pb-1 text-red-400 font-bold">FP</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { r: 1, j1: '10-9', j2: '10-9', j3: '10-9', fp: '10-9' },
                    { r: 2, j1: '20-18', j2: '20-18', j3: '20-18', fp: '20-18' },
                    { r: 3, j1: '29-28', j2: '29-28', j3: '29-28', fp: '28-29' }
                  ].map((s) => (
                    <tr key={s.r} className="border-b border-[#171E28]">
                      <td className="py-1.5 text-slate-400 font-bold">R{s.r}</td>
                      <td className="py-1.5 text-center">{s.j1}</td>
                      <td className="py-1.5 text-center">{s.j2}</td>
                      <td className="py-1.5 text-center">{s.j3}</td>
                      <td className="py-1.5 text-right font-bold text-red-400">{s.fp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 4: ODDS OR INSIGHTS */}
        {(mobileTab === 'odds' || mobileTab === 'insights') && (
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-4 space-y-3 text-xs">
            <span className="font-heading text-base font-bold text-white uppercase tracking-wide block">
              Ring Telemetry & Insights
            </span>
            <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-1">
              <div className="font-bold text-white">Jab Accuracy Disparity</div>
              <p className="text-slate-400">Joshua is landing 43% of his jabs compared to Wilder's 18%.</p>
            </div>
            <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-1">
              <div className="font-bold text-white">Ring Centre Occupancy</div>
              <p className="text-slate-400">Joshua has spent 74% of round 6 in the center ring.</p>
            </div>
          </div>
        )}

      </div>

      {/* STICKY BOTTOM MOBILE NAVIGATION (Screenshot 1) */}
      <div className="fixed bottom-0 inset-x-0 max-w-md mx-auto z-40 bg-[#0D1015]/95 backdrop-blur-md border-t border-[#1C232E] px-3 py-2 flex items-center justify-around">
        <button
          onClick={() => setMobileTab('live')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            mobileTab === 'live' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <Activity size={18} />
          <span>Live</span>
        </button>

        <button
          onClick={() => setMobileTab('stats')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            mobileTab === 'stats' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <BarChart2 size={18} />
          <span>Stats</span>
        </button>

        <button
          onClick={() => setMobileTab('odds')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            mobileTab === 'odds' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <Percent size={18} />
          <span>Odds</span>
        </button>

        <button
          onClick={() => setMobileTab('rounds')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            mobileTab === 'rounds' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <FileText size={18} />
          <span>Rounds</span>
        </button>

        <button
          onClick={() => setMobileTab('insights')}
          className={`flex flex-col items-center gap-1 text-[10px] font-bold ${
            mobileTab === 'insights' ? 'text-red-500' : 'text-slate-400'
          }`}
        >
          <Sparkles size={18} />
          <span>Insights</span>
        </button>
      </div>

    </div>
  );
};
