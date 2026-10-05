import React, { useState } from 'react';
import { 
  Bell, 
  Users, 
  Share2, 
  ChevronRight, 
  Award, 
  Zap, 
  Shield, 
  Target, 
  Activity, 
  Check, 
  Play, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { FIGHTERS } from '../../data/verifiedBoxingData';
import { useLiveFight } from '../../context/LiveFightContext';

interface FighterProfileViewProps {
  fighterId?: string;
  onOpenFight: (fightId: string) => void;
  onOpenCompare: (fighterId: string) => void;
  onNavigateTab: (tab: string, contextId?: string) => void;
}

export const FighterProfileView: React.FC<FighterProfileViewProps> = ({
  fighterId = 'anthony-joshua',
  onOpenFight,
  onOpenCompare,
  onNavigateTab
}) => {
  const { followedFighters, toggleFollowFighter, formatOdds } = useLiveFight();
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'history' | 'stats' | 'analysis' | 'news' | 'media'>('overview');

  const fighter = FIGHTERS.find(f => f.id === fighterId) || FIGHTERS[0];
  const isFollowed = followedFighters.includes(fighter.id);

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Fighter Selector */}
      <div className="space-y-3 border-b border-[#1C232E] pb-3">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigateTab('dashboard')} className="hover:text-white">Dashboard</button>
            <span>/</span>
            <button onClick={() => onNavigateTab('fighters')} className="hover:text-white">Fighters</button>
            <span>/</span>
            <span className="text-white font-bold">{fighter.name}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Boxer ID: {fighter.source.providerId}</span>
        </div>

        {/* Quick Fighter Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">Switch:</span>
          {FIGHTERS.map((f) => {
            const isSelected = f.id === fighter.id;
            return (
              <button
                key={f.id}
                onClick={() => onNavigateTab('fighters', f.id)}
                className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm glow-red'
                    : 'bg-[#12161D] text-slate-400 hover:text-white border border-[#1E2634]'
                }`}
              >
                <span>{f.bio.flag}</span>
                <span>{f.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HERO BANNER (Screenshot 7) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1015] border border-[#1F2734] shadow-2xl">
        
        {/* Cinematic Backdrop */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('${fighter.bannerImage || fighter.image}')`
          }}
        />

        <div className="relative z-10 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Fighter Info & Photo */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl shrink-0">
                <img src={fighter.image} alt={fighter.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400">
                  <span>{fighter.bio.flag}</span>
                  <span className="uppercase">{fighter.bio.nationality}</span>
                  {fighter.nickname && <span className="text-red-500 font-sans">"{fighter.nickname}"</span>}
                </div>

                <h1 className="font-heading text-4xl sm:text-5xl font-black text-white uppercase tracking-tight leading-none">
                  {fighter.name}
                </h1>

                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {fighter.physical.division} · {fighter.bio.stance}
                </div>

                {/* Verification Source Tag */}
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {fighter.source.provider}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
              <button
                onClick={() => toggleFollowFighter(fighter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isFollowed
                    ? 'bg-red-600 text-white shadow-md glow-red'
                    : 'bg-[#151A22] text-slate-300 hover:text-white border border-[#232B38]'
                }`}
              >
                {isFollowed ? <Check size={14} /> : <Bell size={14} />}
                <span>{isFollowed ? 'Following' : 'Follow Fighter'}</span>
              </button>

              <button
                onClick={() => onOpenCompare(fighter.id)}
                className="flex items-center gap-2 px-4 py-2 bg-[#151A22] hover:bg-[#1E2532] text-slate-300 hover:text-white border border-[#232B38] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Users size={14} />
                <span>Compare</span>
              </button>
            </div>

          </div>

          {/* Tale of the Tape Stat Boxes (Screenshot 7) */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2 font-mono">
            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">
                {fighter.record.wins}-{fighter.record.losses}-{fighter.record.draws}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Record</div>
            </div>

            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-red-500">
                {fighter.record.kos}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">KOs</div>
            </div>

            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">
                {fighter.record.koPercentage}%
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">KO %</div>
            </div>

            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">
                {fighter.physical.height}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">{fighter.physical.heightCm} cm</div>
            </div>

            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">
                {fighter.physical.weight}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">{fighter.physical.weightKg} kg</div>
            </div>

            <div className="bg-[#12161E]/80 border border-[#1E2634] p-3 rounded-xl text-center">
              <div className="font-heading text-xl sm:text-2xl font-black text-white">
                {fighter.physical.age}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">Age</div>
            </div>
          </div>

        </div>

      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#1C232E] pb-3 overflow-x-auto text-xs">
        {['Overview', 'Fight History', 'Stats', 'Analysis', 'News', 'Media'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedSubTab(tab.toLowerCase() as any)}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider transition-colors ${
              selectedSubTab === tab.toLowerCase()
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white bg-[#11141A] border border-[#1E2532]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN PROFILE GRID (Screenshot 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Next Fight + Career Record + Recent Fights + Performance Trends */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. NEXT FIGHT CARD */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <Clock size={14} /> Next Fight
              </span>
              <span className="text-xs font-mono text-slate-400">Kingdom Arena, Riyadh</span>
            </div>

            <div className="p-4 bg-[#151A22] border border-[#232B38] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                  <img src={fighter.image} alt={fighter.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading text-xl font-bold text-white uppercase">
                    Joshua vs Wilder
                  </h4>
                  <div className="text-xs text-slate-400">Heavyweight · Sat 21 Dec 2024</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center font-mono">
                  <div className="text-base font-bold text-emerald-400">{formatOdds(1.44)}</div>
                  <div className="text-[10px] text-slate-400 uppercase">Favourite</div>
                </div>

                <button
                  onClick={() => onOpenFight('joshua-vs-wilder')}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  View Fight
                </button>
              </div>
            </div>
          </div>

          {/* 2. CAREER RECORD DONUT & BREAKDOWN */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Career Record Breakdown
              </h3>
              <span className="text-xs font-mono text-slate-400">31 Total Fights</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
              
              {/* Circular Graphic */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#1E2634" strokeWidth="4" />
                    {/* Wins in Green */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.9155" 
                      fill="none" 
                      stroke="#10B981" 
                      strokeWidth="4" 
                      strokeDasharray="90, 100" 
                      strokeLinecap="round" 
                    />
                    {/* Losses in Red */}
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15.9155" 
                      fill="none" 
                      stroke="#EF4444" 
                      strokeWidth="4" 
                      strokeDasharray="10, 100" 
                      strokeDashoffset="-90" 
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="font-mono text-2xl font-black text-white">31</div>
                    <div className="text-[9px] text-slate-400 font-sans uppercase font-bold">Fights</div>
                  </div>
                </div>
              </div>

              {/* Stat Bars */}
              <div className="sm:col-span-2 space-y-3 font-mono text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-bold">28 Wins (90%)</span>
                    <span className="text-emerald-400 font-bold">25 KO / TKO (81%)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '90%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-bold">3 Decisions (10%)</span>
                    <span className="text-blue-400 font-bold">3 / 28</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '10%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300 font-bold">3 Losses</span>
                    <span className="text-red-400 font-bold">Usyk (2), Ruiz (1)</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: '10%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* 3. RECENT FIGHTS LIST (Screenshot 7) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Recent Fights
              </h3>
              <span className="text-xs font-mono text-slate-400">Last 5 Bouts</span>
            </div>

            <div className="space-y-2.5">
              {[
                { date: '8 Mar 2024', opp: 'Francis Ngannou', res: 'W', meth: 'KO R2', venue: 'Riyadh' },
                { date: '23 Dec 2023', opp: 'Otto Wallin', res: 'W', meth: 'RTD R5', venue: 'Riyadh' },
                { date: '12 Aug 2023', opp: 'Robert Helenius', res: 'W', meth: 'KO R7', venue: 'London' },
                { date: '1 Apr 2023', opp: 'Jermaine Franklin', res: 'W', meth: 'UD R12', venue: 'London' },
                { date: '20 Aug 2022', opp: 'Oleksandr Usyk', res: 'L', meth: 'SD R12', venue: 'Jeddah' }
              ].map((fight, idx) => (
                <div key={fight.opp + idx} className="flex items-center justify-between p-3 bg-[#151A22] border border-[#232B38] rounded-xl text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-mono block">{fight.date} · {fight.venue}</span>
                    <span className="font-bold text-white text-sm">vs {fight.opp}</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      fight.res === 'W' 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800' 
                        : 'bg-red-950/80 text-red-400 border border-red-800'
                    }`}>
                      {fight.res} {fight.meth}
                    </span>
                    <button className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]">
                      <Play size={12} fill="currentColor" /> Highlights
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. PERFORMANCE TRENDS (Punches Landed vs Thrown Chart) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Performance Trends (Last 8 Fights)
              </h3>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-red-400 font-bold">— Landed</span>
                <span className="text-blue-400 font-bold">— Thrown</span>
              </div>
            </div>

            <div className="h-40 relative">
              <svg viewBox="0 0 400 120" className="w-full h-full">
                <line x1="0" y1="30" x2="400" y2="30" stroke="#1A222E" strokeDasharray="2 2" />
                <line x1="0" y1="70" x2="400" y2="70" stroke="#1A222E" strokeDasharray="2 2" />
                
                {/* Thrown curve (blue) */}
                <path
                  d="M 20,70 Q 70,80 130,65 T 250,50 T 380,35"
                  fill="none"
                  stroke="#00B4D8"
                  strokeWidth="2.5"
                />
                {/* Landed curve (red) */}
                <path
                  d="M 20,95 Q 70,100 130,90 T 250,80 T 380,68"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                />
              </svg>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-[#1C232E]">
                <span>Pulev</span>
                <span>Usyk 1</span>
                <span>Usyk 2</span>
                <span>Franklin</span>
                <span>Helenius</span>
                <span>Wallin</span>
                <span>Ngannou</span>
                <span>Dubois</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Fighter Bio + Style Tags + Key Achievements + Physical Stats */}
        <div className="space-y-6">
          
          {/* Fighter Bio Card */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Fighter Bio
            </h3>

            <table className="w-full text-xs font-mono">
              <tbody>
                {[
                  { label: 'Nationality', val: fighter.bio.nationality },
                  { label: 'Born', val: fighter.bio.born },
                  { label: 'Hometown', val: fighter.bio.hometown },
                  { label: 'Stance', val: fighter.bio.stance },
                  { label: 'Turned Pro', val: fighter.bio.turnedPro },
                  { label: 'Trainer', val: fighter.bio.trainer },
                  { label: 'Manager', val: fighter.bio.manager },
                  { label: 'Promoter', val: fighter.bio.promoter }
                ].map((row) => (
                  <tr key={row.label} className="border-b border-[#171E28]">
                    <td className="py-2 text-slate-400 font-sans uppercase font-bold text-[10px]">{row.label}</td>
                    <td className="py-2 text-right font-bold text-white">{row.val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Fight Style Tags */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Fight Style
            </h3>

            <div className="grid grid-cols-2 gap-3">
              {fighter.styleTags.map((style) => (
                <div key={style.label} className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
                  <div className="font-bold text-xs text-white">{style.label}</div>
                  <p className="text-[10px] text-slate-400 leading-tight">{style.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Key Achievements
            </h3>

            <div className="space-y-2.5">
              {fighter.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs">
                  <Award size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">{ach.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{ach.organization} · {ach.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Stats (Career Averages) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Career Averages
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center font-mono">
              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="text-xl font-black text-white">{fighter.stats.punchesLandedPerRound}</div>
                <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Landed / Round</div>
              </div>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="text-xl font-black text-white">{fighter.stats.punchesThrownPerRound}</div>
                <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Thrown / Round</div>
              </div>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="text-xl font-black text-white">{fighter.stats.accuracy}%</div>
                <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Accuracy</div>
              </div>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="text-xl font-black text-white">{fighter.stats.powerLandedPerRound}</div>
                <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Power / Round</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
