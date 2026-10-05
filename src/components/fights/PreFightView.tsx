import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Bell, 
  Share2, 
  ChevronRight, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Tv, 
  Award,
  Zap,
  Activity,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { UPCOMING_FIGHT_GARCIA_HANEY } from '../../data/verifiedBoxingData';
import { useLiveFight } from '../../context/LiveFightContext';

interface PreFightViewProps {
  onOpenFighter: (fighterId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const PreFightView: React.FC<PreFightViewProps> = ({ onOpenFighter, onNavigateTab }) => {
  const { formatOdds, createAlert } = useLiveFight();
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'tape' | 'odds' | 'form' | 'analysis'>('overview');
  const [alertSet, setAlertSet] = useState(false);

  const fight = UPCOMING_FIGHT_GARCIA_HANEY;

  const handleSetAlert = () => {
    createAlert({
      title: 'Fight Reminder Set',
      description: 'You will receive ringside telemetry alerts for Garcia vs Haney 24h & 1h prior to ring walks.',
      category: 'Fight'
    });
    setAlertSet(true);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium border-b border-[#1C232E] pb-3">
        <button onClick={() => onNavigateTab('upcoming')} className="hover:text-white">Upcoming</button>
        <span>/</span>
        <span className="text-white font-bold">{fight.fighterA.name} vs {fight.fighterB.name}</span>
      </div>

      {/* HERO BANNER & COUNTDOWN (Screenshot 8) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1015] border border-[#1F2734] shadow-2xl">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&auto=format&fit=crop&q=80')`
          }}
        />

        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#1F2734] pb-6">
            
            {/* Left & Center: Matchup Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#161C24] border border-[#232B38] text-xs font-mono font-bold uppercase text-white">
                  {fight.weightClass} · {fight.scheduledRounds} Rounds
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {fight.date} · {fight.timeBst}
                </span>
              </div>

              <div className="flex items-center gap-6">
                {/* Garcia */}
                <div 
                  onClick={() => onOpenFighter(fight.fighterA.id)}
                  className="cursor-pointer group"
                >
                  <div className="font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-red-500 transition-colors uppercase leading-none">
                    {fight.fighterA.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    {fight.fighterA.bio.flag} {fight.fighterA.record.wins}-{fight.fighterA.record.losses}-{fight.fighterA.record.draws} ({fight.fighterA.record.kos} KOs)
                  </div>
                </div>

                <span className="font-heading text-2xl font-black text-slate-600 italic">VS</span>

                {/* Haney */}
                <div 
                  onClick={() => onOpenFighter(fight.fighterB.id)}
                  className="cursor-pointer group"
                >
                  <div className="font-heading text-3xl sm:text-4xl font-black text-white group-hover:text-blue-500 transition-colors uppercase leading-none">
                    {fight.fighterB.name}
                  </div>
                  <div className="text-xs font-mono text-slate-400 pt-1">
                    {fight.fighterB.bio.flag} {fight.fighterB.record.wins}-{fight.fighterB.record.losses}-{fight.fighterB.record.draws} ({fight.fighterB.record.kos} KOs)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-red-500" />
                  {fight.venue}, {fight.location}
                </span>
                <span>·</span>
                <span className="font-mono text-slate-300 font-semibold">{fight.broadcast}</span>
              </div>
            </div>

            {/* Right: Countdown Timer & Set Alert (Screenshot 8) */}
            <div className="bg-[#12161E]/90 border border-[#202734] p-4 rounded-2xl text-center space-y-3 shrink-0">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                Fight Starts In
              </span>

              <div className="grid grid-cols-4 gap-2 font-mono">
                <div className="p-2 bg-[#0A0D12] rounded-lg border border-[#1C232E]">
                  <div className="text-xl font-black text-white">12</div>
                  <div className="text-[9px] text-slate-500 font-sans uppercase font-bold">Days</div>
                </div>
                <div className="p-2 bg-[#0A0D12] rounded-lg border border-[#1C232E]">
                  <div className="text-xl font-black text-white">06</div>
                  <div className="text-[9px] text-slate-500 font-sans uppercase font-bold">Hours</div>
                </div>
                <div className="p-2 bg-[#0A0D12] rounded-lg border border-[#1C232E]">
                  <div className="text-xl font-black text-white">24</div>
                  <div className="text-[9px] text-slate-500 font-sans uppercase font-bold">Mins</div>
                </div>
                <div className="p-2 bg-[#0A0D12] rounded-lg border border-[#1C232E]">
                  <div className="text-xl font-black text-red-500">18</div>
                  <div className="text-[9px] text-slate-500 font-sans uppercase font-bold">Secs</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleSetAlert}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    alertSet
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-500 text-white shadow-md glow-red'
                  }`}
                >
                  <Bell size={14} />
                  <span>{alertSet ? 'Alert Active' : 'Set Fight Alerts'}</span>
                </button>

                <button className="p-2.5 bg-[#171C25] hover:bg-[#202734] border border-[#2B3545] rounded-xl text-slate-400 hover:text-white">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {['Overview', 'Tale of the Tape', 'Odds', 'Form', 'Analysis', 'Previous Fights', 'News'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab.toLowerCase() as any)}
                className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors ${
                  activeSubTab === tab.toLowerCase()
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white bg-[#11141A] border border-[#1E2532]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* MAIN INTELLIGENCE GRID (Screenshot 8) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Tale of Tape + AI Prediction + Recent Form + Key Stats Comparison */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. TALE OF THE TAPE */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Tale of the Tape
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <tbody>
                  {[
                    { label: 'Age', a: fight.fighterA.physical.age, b: fight.fighterB.physical.age },
                    { label: 'Height', a: fight.fighterA.physical.height, b: fight.fighterB.physical.height },
                    { label: 'Reach', a: fight.fighterA.physical.reach, b: fight.fighterB.physical.reach },
                    { label: 'Stance', a: fight.fighterA.bio.stance, b: fight.fighterB.bio.stance },
                    { label: 'Division', a: fight.fighterA.physical.division, b: fight.fighterB.physical.division },
                    { label: 'Scheduled Rounds', a: 12, b: 12 }
                  ].map((row) => (
                    <tr key={row.label} className="border-b border-[#171E28]">
                      <td className="py-2.5 font-bold text-red-400">{row.a}</td>
                      <td className="py-2.5 text-center text-slate-400 font-sans uppercase font-bold text-[10px]">{row.label}</td>
                      <td className="py-2.5 text-right font-bold text-blue-400">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. FIGHT PULSE PREDICTION (AI / Analytical Model - Screenshot 8) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                  Fight Pulse Analytical Model
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-mono text-[10px] font-bold">
                  AI
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Based on historical data</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
              
              {/* Dual Win Probability Circles */}
              <div className="sm:col-span-2 flex items-center justify-around py-2">
                <div className="text-center space-y-2">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#1E2634" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="46, 100" strokeLinecap="round" />
                    </svg>
                    <span className="absolute font-mono font-black text-2xl text-white">46%</span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white uppercase">Garcia</div>
                    <div className="text-[10px] text-slate-400 font-mono">Win Probability</div>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#1E2634" strokeWidth="4" />
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#00B4D8" strokeWidth="4" strokeDasharray="54, 100" strokeLinecap="round" />
                    </svg>
                    <span className="absolute font-mono font-black text-2xl text-white">54%</span>
                  </div>
                  <div>
                    <div className="font-bold text-xs text-white uppercase">Haney</div>
                    <div className="text-[10px] text-slate-400 font-mono">Win Probability</div>
                  </div>
                </div>
              </div>

              {/* Key Factors List */}
              <div className="space-y-2 text-xs border-l border-[#1C232E] pl-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Key Factors</div>
                <ul className="space-y-1.5 text-slate-300 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-blue-400">✓</span> Haney more consistent in last 5 fights
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-red-400">✓</span> Garcia higher KO rate (80%)
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span> Haney stronger defence metrics
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* 3. RECENT FORM (Side-by-side last 5 fights) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Recent Form (Last 5 Fights)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Garcia's Last 5 */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-red-400 uppercase">Ryan Garcia</div>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    { opp: 'Oscar Duarte', res: 'W', meth: 'KO R8', date: 'Dec 2023' },
                    { opp: 'Javier Fortuna', res: 'W', meth: 'KO R6', date: 'Jul 2023' },
                    { opp: 'Gervonta Davis', res: 'L', meth: 'KO R7', date: 'Apr 2023' },
                    { opp: 'Emmanuel Tagoe', res: 'W', meth: 'UD R12', date: 'Apr 2022' },
                    { opp: 'Luke Campbell', res: 'W', meth: 'KO R7', date: 'Jan 2021' }
                  ].map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#151A22] rounded-lg border border-[#232B38]">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                          f.res === 'W' ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'
                        }`}>
                          {f.res}
                        </span>
                        <span className="font-sans font-bold text-white">{f.opp}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{f.meth}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Haney's Last 5 */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-blue-400 uppercase">Devin Haney</div>
                <div className="space-y-1.5 font-mono text-xs">
                  {[
                    { opp: 'Regis Prograis', res: 'W', meth: 'UD R12', date: 'Dec 2023' },
                    { opp: 'Vasiliy Lomachenko', res: 'W', meth: 'UD R12', date: 'May 2023' },
                    { opp: 'George Kambosos Jr.', res: 'W', meth: 'UD R12', date: 'Oct 2022' },
                    { opp: 'George Kambosos Jr.', res: 'W', meth: 'UD R12', date: 'Jun 2022' },
                    { opp: 'Joseph Diaz Jr.', res: 'W', meth: 'UD R12', date: 'Dec 2021' }
                  ].map((f, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-[#151A22] rounded-lg border border-[#232B38]">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] bg-emerald-950 text-emerald-400">
                          {f.res}
                        </span>
                        <span className="font-sans font-bold text-white">{f.opp}</span>
                      </div>
                      <span className="text-slate-400 text-[11px]">{f.meth}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Odds Comparison + Expert Analysis + Event Context */}
        <div className="space-y-6">
          
          {/* 1. Odds Comparison */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Odds Comparison
            </h3>

            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1C232E] text-slate-400 font-sans uppercase text-[10px]">
                  <th className="text-left pb-2">Bookmaker</th>
                  <th className="text-center pb-2 text-red-400">Garcia</th>
                  <th className="text-right pb-2 text-blue-400">Haney</th>
                </tr>
              </thead>
              <tbody>
                {fight.liveOdds.bookmakers.map((b) => (
                  <tr key={b.bookmaker} className="border-b border-[#171E28]">
                    <td className="py-2.5 font-bold text-white font-sans">{b.bookmaker}</td>
                    <td className="py-2.5 text-center font-bold text-red-400">{formatOdds(b.homeOdds)}</td>
                    <td className="py-2.5 text-right font-bold text-blue-400">{formatOdds(b.awayOdds)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Expert Analysis Quote (Screenshot 8) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-3">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Expert Analysis
            </h3>

            <div className="p-4 bg-[#151A22] border border-[#232B38] rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden font-bold flex items-center justify-center text-xs text-white">
                  LC
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Luke Campbell</div>
                  <div className="text-[10px] text-slate-400 font-mono">Former Olympic Champion</div>
                </div>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "This is a fascinating stylistic matchup. Garcia has the one-punch power, but Haney's consistency and ring IQ make him a very difficult opponent to beat."
              </p>
            </div>
          </div>

          {/* 3. Event Context */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-3">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Event Context
            </h3>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-[#1C232E]">
                <span className="text-slate-400 font-sans">Venue</span>
                <span className="font-bold text-white">Barclays Center</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1C232E]">
                <span className="text-slate-400 font-sans">Capacity</span>
                <span className="font-bold text-white">19,000</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#1C232E]">
                <span className="text-slate-400 font-sans">Broadcast</span>
                <span className="font-bold text-white">DAZN Worldwide</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-400 font-sans">Undercard</span>
                <span className="font-bold text-white">5 Championship Bouts</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
