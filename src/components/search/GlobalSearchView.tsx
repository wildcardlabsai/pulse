import React, { useState, useEffect } from 'react';
import { 
  Search as SearchIcon, 
  X, 
  ChevronRight, 
  Bell, 
  Calendar, 
  Trophy, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { boxingService } from '../../lib/providers/boxingDataProvider';
import { useLiveFight } from '../../context/LiveFightContext';
import { EmptyState, SkeletonCard } from '../common/DataStates';

interface GlobalSearchViewProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenFighter: (fighterId: string) => void;
  onOpenFight: (fightId: string) => void;
  onOpenEvent: (eventId: string) => void;
}

export const GlobalSearchView: React.FC<GlobalSearchViewProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenFighter,
  onOpenFight,
  onOpenEvent
}) => {
  const { followedFighters, toggleFollowFighter } = useLiveFight();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPreviewFighter, setSelectedPreviewFighter] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<{
    fighters: any[];
    fights: any[];
    events: any[];
    promotions: any[];
  }>({ fighters: [], fights: [], events: [], promotions: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    boxingService.searchAll(searchQuery).then(res => {
      if (isMounted) {
        setSearchResults(res);
        if (res.fighters.length > 0 && !selectedPreviewFighter) {
          setSelectedPreviewFighter(res.fighters[0]);
        }
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [searchQuery]);

  const matchedFighters = searchResults.fighters;
  const previewFighter = selectedPreviewFighter || matchedFighters[0];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Search Header Banner (Screenshot 2) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1015] border border-[#1F2734] p-6 sm:p-8">
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1000&auto=format&fit=crop&q=80')`
          }}
        />

        <div className="relative z-10 space-y-4 max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Search
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Find fighters, events, promotions, championship bouts, and telemetry intelligence.
          </p>

          {/* Search Input Bar */}
          <div className="flex items-center gap-2 pt-1">
            <div className="relative flex-1">
              <SearchIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search fighters, events, promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#151A22] border border-[#263142] text-white text-sm pl-11 pr-10 py-3 rounded-xl focus:outline-none focus:border-red-500 shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-heading text-base font-bold uppercase tracking-wider shadow-md glow-red transition-all cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs with Counts (Screenshot 2) */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#1C232E] pb-3 text-xs">
        {[
          { id: 'all', label: `All Results (${matchedFighters.length + searchResults.fights.length + searchResults.events.length})` },
          { id: 'fighters', label: `Fighters (${matchedFighters.length})` },
          { id: 'fights', label: `Fights (${searchResults.fights.length})` },
          { id: 'events', label: `Events (${searchResults.events.length})` },
          { id: 'promotions', label: `Promotions (${searchResults.promotions.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors ${
              activeCategory === tab.id
                ? 'bg-red-600 text-white shadow-sm glow-red'
                : 'bg-[#11141A] text-slate-400 hover:text-white border border-[#1E2532]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <SkeletonCard heightClass="h-64" />
      ) : matchedFighters.length === 0 && searchResults.fights.length === 0 ? (
        <EmptyState
          title="NO RESULTS FOUND"
          description={`No entities matched "${searchQuery}". Please check spelling or search by fighter name, division, or event location.`}
          icon="search"
          actionLabel="Clear Search"
          onAction={() => setSearchQuery('')}
        />
      ) : (
        /* Main 2-Column Grid (Screenshot 2) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Results Feed (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. FIGHTERS SECTION */}
            <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                  Fighters ({matchedFighters.length})
                </h3>
                <button 
                  onClick={() => onOpenFighter(matchedFighters[0]?.id || 'anthony-joshua')}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  View All Fighters <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {matchedFighters.slice(0, 6).map((f) => {
                  const isSelected = previewFighter?.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedPreviewFighter(f)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-[#18202C] border-red-500 shadow-md' 
                          : 'bg-[#151A22] border-[#232B38] hover:border-slate-600'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-slate-700 mx-auto mb-2">
                        <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-xs text-white truncate">{f.name}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          {f.bio.flag} {f.record.wins}-{f.record.losses}-{f.record.draws}
                        </div>
                        <div className="text-[9px] uppercase font-bold text-slate-500 truncate mt-0.5">
                          {f.physical.division}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          {/* 2. FIGHTS SECTION */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Fights (56)
              </h3>
              <span className="text-xs text-slate-400">View All Fights →</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { fight: 'Anthony Joshua vs Francis Ngannou', date: '8 Mar 2024 · Kingdom Arena, Riyadh', div: 'Heavyweight', res: 'WIN', meth: 'KO R2', score: 78 },
                { fight: 'Anthony Joshua vs Otto Wallin', date: '23 Dec 2023 · Kingdom Arena, Riyadh', div: 'Heavyweight', res: 'WIN', meth: 'UD R12', score: 82 },
                { fight: 'Anthony Joshua vs Robert Helenius', date: '12 Aug 2023 · The O2, London', div: 'Heavyweight', res: 'WIN', meth: 'TKO R7', score: 77 },
                { fight: 'Anthony Joshua vs Jermaine Franklin', date: '1 Apr 2023 · The O2, London', div: 'Heavyweight', res: 'WIN', meth: 'UD R12', score: 74 }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl flex items-center justify-between gap-3 hover:bg-[#19212C] transition-colors cursor-pointer">
                  <div>
                    <span className="font-sans font-bold text-white text-sm block">{item.fight}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 font-bold border border-emerald-800 text-[11px]">
                      {item.res} {item.meth}
                    </span>
                    <span className="font-bold text-white">{item.score}</span>
                    <ChevronRight size={14} className="text-slate-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. EVENTS SECTION */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Events (18)
              </h3>
              <span className="text-xs text-slate-400">View All Events →</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(searchResults.events || []).slice(0, 3).map((e: any) => (
                <div key={e.id} onClick={() => onOpenEvent(e.id)} className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-2 cursor-pointer hover:border-slate-500 transition-colors">
                  <div className="text-xs font-bold text-white">{e.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{e.date}</div>
                  <div className="text-[11px] text-red-400 font-bold flex items-center gap-1">
                    View Event <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Selected Fighter Quick Snapshot (5 cols) (Screenshot 2) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-6 space-y-5">
            
            {/* Fighter Info Header */}
            <div className="flex items-center gap-4 border-b border-[#1C232E] pb-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-slate-700 shrink-0">
                <img src={selectedPreviewFighter.image} alt={selectedPreviewFighter.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  {selectedPreviewFighter.bio.flag} {selectedPreviewFighter.name}
                </div>
                <h3 className="font-heading text-3xl font-black text-white uppercase">
                  {selectedPreviewFighter.name}
                </h3>
                <div className="text-xs text-slate-400 uppercase font-semibold">
                  "{selectedPreviewFighter.nickname || 'Champion'}" · {selectedPreviewFighter.physical.division}
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="p-2.5 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="font-bold text-white text-base">
                  {selectedPreviewFighter.record.wins}-{selectedPreviewFighter.record.losses}-{selectedPreviewFighter.record.draws}
                </div>
                <div className="text-[9px] text-slate-400 font-sans uppercase">Record</div>
              </div>

              <div className="p-2.5 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="font-bold text-red-500 text-base">{selectedPreviewFighter.record.kos}</div>
                <div className="text-[9px] text-slate-400 font-sans uppercase">KOs</div>
              </div>

              <div className="p-2.5 bg-[#151A22] rounded-xl border border-[#232B38]">
                <div className="font-bold text-white text-base">{selectedPreviewFighter.record.koPercentage}%</div>
                <div className="text-[9px] text-slate-400 font-sans uppercase">KO %</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenFighter(selectedPreviewFighter.id)}
                className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center shadow-md glow-red transition-all cursor-pointer"
              >
                View Fighter Profile →
              </button>

              <button
                onClick={() => toggleFollowFighter(selectedPreviewFighter.id)}
                className="py-2.5 px-4 bg-[#151A22] hover:bg-[#1E2532] text-slate-300 border border-[#232B38] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                <Bell size={14} />
                <span>Follow</span>
              </button>
            </div>

            {/* Latest & Upcoming Fights */}
            <div className="space-y-3 pt-2 border-t border-[#1C232E] text-xs">
              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Latest Fight</span>
                <div className="font-bold text-white">Joshua vs Ngannou</div>
                <div className="text-[11px] font-mono text-emerald-400">WIN KO R2 · 8 Mar 2024 Riyadh</div>
              </div>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Upcoming Fight</span>
                <div className="font-bold text-white">Joshua vs Wilder</div>
                <div className="text-[11px] font-mono text-slate-400">21 Dec 2024 · Kingdom Arena, Riyadh</div>
              </div>
            </div>

            {/* Related Searches Pills */}
            <div className="space-y-2 pt-2 border-t border-[#1C232E]">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Related Searches
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Devin Haney', 'Tyson Fury', 'Wilder', 'Ngannou', 
                  'Heavyweight', 'Joshua next fight', 'Joshua vs Wilder', 'Matchroom'
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSearchQuery(s)}
                    className="px-2.5 py-1 bg-[#151A22] hover:bg-[#1E2532] border border-[#232B38] rounded-md text-[11px] text-slate-300 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    )}

  </div>
);
};
