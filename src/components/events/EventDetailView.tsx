import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Tv, 
  Clock, 
  Ticket, 
  Share2, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { EVENTS } from '../../data/verifiedBoxingData';
import { useLiveFight } from '../../context/LiveFightContext';

interface EventDetailViewProps {
  eventId?: string;
  onOpenFight: (fightId: string) => void;
  onOpenFighter: (fighterId: string) => void;
  onNavigateTab: (tab: string, contextId?: string) => void;
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({
  eventId = 'catterall-prograis-manchester',
  onOpenFight,
  onOpenFighter,
  onNavigateTab
}) => {
  const { formatOdds } = useLiveFight();
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [activeSubTab, setActiveSubTab] = useState<'card' | 'info' | 'news' | 'tickets'>('card');

  const event = EVENTS.find(e => e.id === eventId) || EVENTS[0];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Event Switcher */}
      <div className="space-y-3 border-b border-[#1C232E] pb-3">
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigateTab('dashboard')} className="hover:text-white">Dashboard</button>
            <span>/</span>
            <button onClick={() => onNavigateTab('events')} className="hover:text-white">Events</button>
            <span>/</span>
            <span className="text-white font-bold">{event.name}</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Venue: {event.venue}, {event.location}</span>
        </div>

        {/* Quick Event Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 mr-1">Switch Event:</span>
          {EVENTS.map((e) => {
            const isSelected = e.id === event.id;
            return (
              <button
                key={e.id}
                onClick={() => onNavigateTab('events', e.id)}
                className={`px-3 py-1 rounded-lg font-bold text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm glow-red'
                    : 'bg-[#12161D] text-slate-400 hover:text-white border border-[#1E2634]'
                }`}
              >
                <span>{e.name}</span>
                <span className="text-[10px] font-mono opacity-70">({e.date.split(' ').slice(0, 2).join(' ')})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* HERO BANNER (Screenshot 9) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#0D1015] border border-[#1F2734] shadow-2xl">
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('${event.artwork}')`
          }}
        />

        <div className="relative z-10 p-6 sm:p-8 space-y-6 text-center">
          
          <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-mono">
            <span>{event.promotion.name}</span>
            <span>{event.broadcast}</span>
          </div>

          <div className="space-y-2 py-4">
            <span className="text-xs font-bold uppercase tracking-widest text-red-500 block">
              {event.subtitle}
            </span>

            <h1 className="font-heading text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
              {event.name}
            </h1>

            <div className="text-xs font-mono text-slate-300">
              {event.date} · {event.venue}, {event.location}
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto text-xs pt-2 border-t border-[#1C232E]">
            {['Fight Card', 'Event Info', 'News', 'Weigh-in', 'Videos', 'Tickets'].map((tab) => (
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

      {/* MAIN CONTENT GRID (Screenshot 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT 2 COLS: Fight Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                  Fight Card
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] font-bold">
                  6 Verified Bouts
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#141820] p-1 rounded-lg border border-[#232B38] text-xs">
                <button
                  onClick={() => setViewMode('card')}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    viewMode === 'card' ? 'bg-red-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Card View
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded font-bold transition-all ${
                    viewMode === 'table' ? 'bg-red-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Table View
                </button>
              </div>
            </div>

            {/* MAIN EVENT CARD (Screenshot 9) */}
            <div 
              onClick={() => onOpenFight('catterall-vs-prograis')}
              className="p-4 bg-[#151A22] hover:bg-[#1A212B] border border-red-500/40 rounded-xl cursor-pointer transition-colors space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bold uppercase text-[10px]">
                  Main Event
                </span>
                <span className="text-slate-400 font-mono">WBO Super Lightweight Title · 12 Rounds</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                {/* Catterall */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=200&auto=format&fit=crop&q=80" alt="Catterall" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Jack Catterall</div>
                    <div className="text-[10px] font-mono text-slate-400">🇬🇧 29-1-0</div>
                  </div>
                </div>

                {/* Odds & Sparkline */}
                <div className="flex flex-col items-center justify-center text-center font-mono">
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold">{formatOdds(1.62)}</span>
                    <span className="text-[10px] text-slate-500 uppercase">vs</span>
                    <span className="text-red-400 font-bold">{formatOdds(2.30)}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">Sat 20 Apr 22:00 BST</span>
                </div>

                {/* Prograis */}
                <div className="flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="text-sm font-bold text-white">Regis Prograis</div>
                    <div className="text-[10px] font-mono text-slate-400">🇺🇸 29-2-0</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=200&auto=format&fit=crop&q=80" alt="Prograis" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* CO-MAIN EVENT CARD */}
            <div 
              onClick={() => onOpenFight('dubois-vs-hrgovic')}
              className="p-4 bg-[#151A22] hover:bg-[#1A212B] border border-[#232B38] rounded-xl cursor-pointer transition-colors space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 rounded bg-blue-600/30 text-blue-400 font-bold uppercase text-[10px]">
                  Co-Main Event
                </span>
                <span className="text-slate-400 font-mono">WBA Interim Heavyweight Title · 12 Rounds</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&auto=format&fit=crop&q=80" alt="Dubois" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Daniel Dubois</div>
                    <div className="text-[10px] font-mono text-slate-400">🇬🇧 20-2-0</div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center font-mono">
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold">{formatOdds(1.44)}</span>
                    <span className="text-[10px] text-slate-500 uppercase">vs</span>
                    <span className="text-red-400 font-bold">{formatOdds(2.75)}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">Sat 20 Apr 20:30 BST</span>
                </div>

                <div className="flex items-center justify-end gap-3 text-right">
                  <div>
                    <div className="text-sm font-bold text-white">Filip Hrgović</div>
                    <div className="text-[10px] font-mono text-slate-400">🇭🇷 17-0-0</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                    <img src="https://images.unsplash.com/photo-1517438322307-e67111335449?w=200&auto=format&fit=crop&q=80" alt="Hrgovic" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* UNDERCARD FIGHTS (Screenshot 9) */}
            <div className="space-y-2 font-mono text-xs">
              {[
                { bout: 3, title: 'WBA World Welterweight Title · 12 Rounds', a: 'Ekow Essuman (19-1-0)', oddsA: 1.28, b: 'Kevin Lele Sadjo (24-0-0)', oddsB: 3.60, time: '19:45 BST' },
                { bout: 4, title: 'British Super Featherweight Title · 10 Rounds', a: 'Joe Cordina (17-1-0)', oddsA: 1.75, b: 'Anthony Cacace (22-1-0)', oddsB: 2.05, time: '18:55 BST' },
                { bout: 5, title: 'Super Bantamweight · 10 Rounds', a: 'Ellis Zorro (17-0-0)', oddsA: 1.36, b: 'Rohan Murdock (27-3-0)', oddsB: 3.10, time: '18:10 BST' }
              ].map((undercard) => (
                <div key={undercard.bout} className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 font-bold text-[10px] flex items-center justify-center">
                      {undercard.bout}
                    </span>
                    <span className="font-sans font-bold text-white">{undercard.a} vs {undercard.b}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400">{formatOdds(undercard.oddsA)}</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-blue-400">{formatOdds(undercard.oddsB)}</span>
                    <span className="text-slate-400 text-[10px] font-sans">{undercard.time}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Event Details + Countdown + News */}
        <div className="space-y-6">
          
          {/* 1. Event Details Sidebar (Screenshot 9) */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Event Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 text-white font-mono font-bold text-center px-2.5 py-1.5 rounded-lg shrink-0">
                  <div className="text-[10px]">APR</div>
                  <div className="text-lg leading-none">20</div>
                  <div className="text-[10px]">2024</div>
                </div>
                <div>
                  <div className="font-bold text-white">{event.name}</div>
                  <div className="text-slate-400">{event.subtitle}</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#1C232E] font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin size={14} className="text-red-500 shrink-0" />
                  <span>Co-op Live, Manchester UK</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Tv size={14} className="text-blue-500 shrink-0" />
                  <span>Live on DAZN Worldwide</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock size={14} className="text-emerald-500 shrink-0" />
                  <span>Main Card: 22:00 BST · Doors: 17:00 BST</span>
                </div>
              </div>

              <button className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md glow-red transition-all cursor-pointer">
                <Ticket size={15} />
                <span>Get Tickets</span>
              </button>
            </div>
          </div>

          {/* 2. Event Countdown */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">
              Event Countdown
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
          </div>

          {/* 3. Event News */}
          <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-3">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide border-b border-[#1C232E] pb-3">
              Event News
            </h3>

            <div className="space-y-2.5 text-xs">
              {event.news.map((n) => (
                <div key={n.id} className="p-2.5 bg-[#151A22] rounded-xl border border-[#232B38] space-y-1">
                  <div className="font-bold text-white hover:text-red-400 cursor-pointer transition-colors">
                    {n.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">{n.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
