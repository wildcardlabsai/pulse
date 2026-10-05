import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Users, 
  Building, 
  Globe, 
  Search, 
  Filter, 
  Calendar, 
  Play, 
  ChevronRight, 
  CheckCircle2, 
  BarChart2, 
  TrendingUp, 
  Award,
  ShieldCheck 
} from 'lucide-react';
import { HISTORICAL_FIGHT_GARCIA_HANEY } from '../../data/verifiedBoxingData';
import { boxingService } from '../../lib/providers/boxingDataProvider';
import { EmptyState, SkeletonCard, VerificationBadge } from '../common/DataStates';

interface ResultsViewProps {
  onOpenFighter: (fighterId: string) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ onOpenFighter }) => {
  const [selectedFightIndex, setSelectedFightIndex] = useState<number>(4);
  const [filterWeight, setFilterWeight] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSubTab, setSelectedSubTab] = useState<'overview' | 'rounds' | 'stats' | 'odds' | 'pulse' | 'video'>('overview');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    boxingService.getHistoricalResults({
      weightClass: filterWeight,
      method: filterMethod,
      query: searchQuery
    }).then((data) => {
      if (isMounted) {
        setResults(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [filterWeight, filterMethod, searchQuery]);

  const selectedFight = HISTORICAL_FIGHT_GARCIA_HANEY;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Header with Metric Counters (Screenshot 4) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C232E] pb-5">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide uppercase">
            Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Complete fight history. Real results. Detailed analysis.
          </p>
        </div>

        {/* 4 Metric Badges from Screenshot 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Trophy size={16} className="text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Total Fights</div>
              <div className="text-lg font-bold text-white">12,487</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Users size={16} className="text-blue-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Fighters</div>
              <div className="text-lg font-bold text-white">3,842</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Building size={16} className="text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Events</div>
              <div className="text-lg font-bold text-white">186</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Globe size={16} className="text-cyan-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Promotions</div>
              <div className="text-lg font-bold text-white">42</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#1C232E] pb-3">
        {[
          'All Results',
          'Recent Results',
          'Results by Event',
          'Results by Fighter',
          'KO/TKO',
          'Decisions',
          'By Weight Class',
          'By Promotion'
        ].map((tab, idx) => (
          <button
            key={tab}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
              idx === 0 
                ? 'bg-red-600 text-white shadow-sm glow-red' 
                : 'bg-[#11141A] text-slate-400 hover:text-white border border-[#1E2532]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter Toolbar (Screenshot 4) */}
      <div className="flex flex-wrap items-center gap-3 bg-[#11141A] border border-[#1F2734] p-3.5 rounded-xl text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161C24] border border-[#232B38] rounded-lg text-slate-300">
          <Calendar size={14} className="text-red-500" />
          <span>1 Jan 2020 - Present</span>
        </div>

        <select className="px-3 py-1.5 bg-[#161C24] border border-[#232B38] rounded-lg text-slate-300 focus:outline-none">
          <option>All Promotions</option>
          <option>Matchroom Boxing</option>
          <option>Queensberry</option>
          <option>Top Rank</option>
        </select>

        <select 
          value={filterWeight} 
          onChange={(e) => setFilterWeight(e.target.value)}
          className="px-3 py-1.5 bg-[#161C24] border border-[#232B38] rounded-lg text-slate-300 focus:outline-none"
        >
          <option value="all">All Weight Classes</option>
          <option value="heavyweight">Heavyweight</option>
          <option value="super lightweight">Super Lightweight</option>
          <option value="lightweight">Lightweight</option>
          <option value="cruiserweight">Cruiserweight</option>
        </select>

        <select 
          value={filterMethod} 
          onChange={(e) => setFilterMethod(e.target.value)}
          className="px-3 py-1.5 bg-[#161C24] border border-[#232B38] rounded-lg text-slate-300 focus:outline-none"
        >
          <option value="all">All Result Types</option>
          <option value="KO">Knockout (KO/TKO)</option>
          <option value="UD">Unanimous Decision (UD)</option>
          <option value="MD">Majority Decision (MD)</option>
          <option value="SD">Split Decision (SD)</option>
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search fighters, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-[#161C24] border border-[#232B38] rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none"
          />
        </div>

        <button 
          onClick={() => { setFilterWeight('all'); setFilterMethod('all'); setSearchQuery(''); }}
          className="px-3 py-1.5 text-slate-400 hover:text-white"
        >
          Clear Filters
        </button>
      </div>

      {/* Main Grid: Latest Results Table (Left) + Detailed Fight Result Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Latest Results Table (7 cols) */}
        <div className="lg:col-span-7 bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
              Latest Results
            </h3>
            <span className="text-xs font-mono text-slate-400">{results.length} Bouts Verified</span>
          </div>

          {loading ? (
            <SkeletonCard heightClass="h-64" />
          ) : results.length === 0 ? (
            <EmptyState
              title="NO RESULTS FOUND"
              description="No historical fight results matched your query. Try clearing filters or changing weight classes."
              icon="search"
              actionLabel="Clear Filters"
              onAction={() => { setFilterWeight('all'); setFilterMethod('all'); setSearchQuery(''); }}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono whitespace-nowrap">
                <thead>
                  <tr className="border-b border-[#1C232E] text-slate-400 font-sans uppercase text-[10px]">
                    <th className="text-left pb-3 font-bold">Date</th>
                    <th className="text-left pb-3 font-bold">Fight</th>
                    <th className="text-left pb-3 font-bold">Weight Class</th>
                    <th className="text-center pb-3 font-bold">Result</th>
                    <th className="text-center pb-3 font-bold">Method</th>
                    <th className="text-center pb-3 font-bold">Round</th>
                    <th className="text-right pb-3 font-bold">Fight Pulse</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => {
                    const isSelected = idx === selectedFightIndex;
                    return (
                      <tr
                        key={row.fight + idx}
                        onClick={() => setSelectedFightIndex(idx)}
                        className={`border-b border-[#171E28] cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-red-950/30 border-l-2 border-l-red-500' 
                            : 'hover:bg-[#151A22]'
                        }`}
                      >
                        <td className="py-3 px-2 text-slate-400">{row.date}</td>
                        <td className="py-3 px-2 font-bold text-white font-sans">{row.fight}</td>
                        <td className="py-3 px-2 text-slate-400">{row.weightClass}</td>
                        <td className="py-3 px-2 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-800/60">
                            {row.result}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center text-slate-300 font-bold">{row.method}</td>
                        <td className="py-3 px-2 text-center text-slate-400">{row.round}</td>
                        <td className="py-3 px-2 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Pulse Sparkline bar */}
                            <div className="w-10 h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                              <div className="bg-emerald-400" style={{ width: `${row.pulseScore}%` }} />
                            </div>
                            <span className="font-bold text-white">{row.pulseScore}</span>
                            <ChevronRight size={14} className="text-slate-500" />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Detailed Fight Result Card (5 cols) (Screenshot 4) */}
        <div className="lg:col-span-5 bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-5">
          
          {/* Header with Promotion Logo */}
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
              <Trophy size={14} /> Fight Result
            </span>
            <span className="font-heading font-black text-sm text-slate-300 tracking-wider">
              MATCHROOM.
            </span>
          </div>

          {/* Fighter Matchup Card */}
          <div className="relative overflow-hidden rounded-xl bg-[#151A22] border border-[#232B38] p-4 text-center space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              {selectedFight.weightClass}
            </span>

            <div className="flex items-center justify-between gap-3">
              <div 
                onClick={() => onOpenFighter(selectedFight.fighterA.id)}
                className="cursor-pointer group flex-1 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden border border-slate-700 group-hover:border-red-500 mb-1.5 shadow-md">
                  <img src={selectedFight.fighterA.image} alt={selectedFight.fighterA.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-heading text-lg font-bold text-white group-hover:text-red-400 truncate">
                  {selectedFight.fighterA.name}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {selectedFight.fighterA.record.wins}-{selectedFight.fighterA.record.losses}-{selectedFight.fighterA.record.draws}
                </div>
              </div>

              <div className="font-heading text-xl font-black text-slate-500 italic">VS</div>

              <div 
                onClick={() => onOpenFighter(selectedFight.fighterB.id)}
                className="cursor-pointer group flex-1 text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-xl overflow-hidden border border-slate-700 group-hover:border-blue-500 mb-1.5 shadow-md">
                  <img src={selectedFight.fighterB.image} alt={selectedFight.fighterB.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-heading text-lg font-bold text-white group-hover:text-blue-400 truncate">
                  {selectedFight.fighterB.name}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  {selectedFight.fighterB.record.wins}-{selectedFight.fighterB.record.losses}-{selectedFight.fighterB.record.draws}
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 border-t border-[#1F2734] pt-2">
              {selectedFight.date} · {selectedFight.venue}, {selectedFight.location}
            </div>

            {/* Winner Banner */}
            <div className="p-2.5 rounded-lg bg-emerald-950/70 border border-emerald-800 text-center space-y-0.5">
              <div className="text-xs font-bold text-emerald-400 font-sans uppercase">
                {selectedFight.fighterA.name} wins by Majority Decision
              </div>
              <div className="text-[11px] font-mono text-slate-300">
                Scores: {selectedFight.result?.officialScores}
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {['Overview', 'Round by Round', 'Stats', 'Odds Movement', 'Fight Pulse', 'Highlights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedSubTab(tab.toLowerCase() as any)}
                className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                  selectedSubTab === tab.toLowerCase()
                    ? 'bg-red-600 text-white'
                    : 'text-slate-400 hover:text-white bg-[#151A22]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Fight Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Fight Summary
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#151A22] p-3 rounded-xl border border-[#232B38]">
              {selectedFight.result?.summary}
            </p>
          </div>

          {/* Key Stats Compubox Comparison Bars */}
          {selectedFight.liveStats && (
            <div className="space-y-3 bg-[#151A22] p-3.5 rounded-xl border border-[#232B38]">
              <div className="flex items-center justify-between text-xs border-b border-[#202734] pb-2">
                <span className="font-bold text-white uppercase">Key Stats</span>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-red-400 font-bold">Garcia</span>
                  <span className="text-blue-400 font-bold">Haney</span>
                </div>
              </div>

              {[
                { label: 'Total Punches Landed', a: selectedFight.liveStats.fighterA.totalPunchesLanded, b: selectedFight.liveStats.fighterB.totalPunchesLanded },
                { label: 'Total Punches Thrown', a: selectedFight.liveStats.fighterA.totalPunchesThrown, b: selectedFight.liveStats.fighterB.totalPunchesThrown },
                { label: 'Accuracy', a: `${selectedFight.liveStats.fighterA.accuracy}%`, b: `${selectedFight.liveStats.fighterB.accuracy}%` },
                { label: 'Power Punches Landed', a: selectedFight.liveStats.fighterA.powerLanded, b: selectedFight.liveStats.fighterB.powerLanded },
                { label: 'Jabs Landed', a: selectedFight.liveStats.fighterA.jabsLanded, b: selectedFight.liveStats.fighterB.jabsLanded },
                { label: 'Knockdowns', a: selectedFight.liveStats.fighterA.knockdowns, b: selectedFight.liveStats.fighterB.knockdowns }
              ].map((row) => (
                <div key={row.label} className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-red-400 font-bold">{row.a}</span>
                    <span className="text-slate-400 font-sans uppercase text-[10px] font-bold">{row.label}</span>
                    <span className="text-blue-400 font-bold">{row.b}</span>
                  </div>
                  <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden flex">
                    <div className="bg-red-500" style={{ width: '55%' }} />
                    <div className="bg-blue-500" style={{ width: '45%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Fight Pulse Analysis Gauges (Screenshot 4) */}
          <div className="bg-[#151A22] p-4 rounded-xl border border-[#232B38] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Fight Pulse Analysis
            </h4>

            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-red-500 flex items-center justify-center font-mono font-black text-lg text-white">
                  81
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Garcia</div>
                  <div className="text-[10px] text-slate-400 font-mono">Fight Pulse Score</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 border-blue-500 flex items-center justify-center font-mono font-black text-lg text-white">
                  74
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Haney</div>
                  <div className="text-[10px] text-slate-400 font-mono">Fight Pulse Score</div>
                </div>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {selectedFight.momentum.explanationPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
