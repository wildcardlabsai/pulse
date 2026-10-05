import React, { useState } from 'react';
import { 
  Radio, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Percent, 
  ShieldCheck, 
  Activity, 
  Target, 
  MapPin, 
  Tv, 
  Menu, 
  X,
  CheckCircle2,
  Trophy,
  Flame,
  BarChart3,
  ExternalLink,
  AlertCircle,
  Database,
  Layers,
  Terminal
} from 'lucide-react';
import { 
  FIGHTERS, 
  PROMOTIONS 
} from '../../data/verifiedBoxingData';
import { boxingService } from '../../lib/providers/boxingDataProvider';
import { useLiveFight } from '../../context/LiveFightContext';

interface LandingPageViewProps {
  onEnterApp: (targetTab?: string, contextId?: string) => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onEnterApp }) => {
  const { formatOdds } = useLiveFight();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'live' | 'odds' | 'fighters' | 'results'>('live');

  // Verify provider connection status from canonical architecture
  const providerReport = boxingService.getProviderStatusReport();
  const isRealDataConnected = providerReport.isRealDataConnected;
  const isFixtureMode = boxingService.isFixtureMode();

  const joshua = FIGHTERS.find(f => f.id === 'anthony-joshua') || FIGHTERS[0];

  return (
    <div className="min-h-screen bg-[#07090C] text-[#E5E7EB] selection:bg-red-600 selection:text-white flex flex-col font-sans">
      
      {/* 1. PUBLIC TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#090C10]/95 backdrop-blur-md border-b border-[#1A222E] px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => onEnterApp('dashboard')}
            className="flex items-center gap-2.5 text-left cursor-pointer group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-red-600/15 border border-red-500/40 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-bold tracking-wider text-white leading-none">
                FIGHT <span className="text-red-500">PULSE</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#7D8792] uppercase leading-tight mt-0.5">
                Boxing Intelligence
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#B8C0C8]">
            <button 
              onClick={() => onEnterApp('live')}
              className="hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Radio size={14} className="text-red-500" />
              <span>Live Action</span>
            </button>
            <button onClick={() => onEnterApp('upcoming')} className="hover:text-white transition-colors cursor-pointer">
              Upcoming Schedule
            </button>
            <button onClick={() => onEnterApp('results')} className="hover:text-white transition-colors cursor-pointer">
              Fight Results
            </button>
            <button onClick={() => onEnterApp('fighters')} className="hover:text-white transition-colors cursor-pointer">
              Fighter Database
            </button>
            <button onClick={() => onEnterApp('odds')} className="hover:text-white transition-colors cursor-pointer">
              Odds Centre
            </button>
            <button onClick={() => onEnterApp('intelligence')} className="hover:text-white transition-colors cursor-pointer">
              Intelligence
            </button>
          </nav>

          {/* Action Button & Environment Status */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-heading text-sm sm:text-base font-bold uppercase tracking-wider shadow-md hover:shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Enter Fight Pulse</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#B8C0C8] hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#1A222E] grid grid-cols-2 gap-2 text-sm font-medium animate-in slide-in-from-top-2 duration-200">
            {[
              { id: 'live', label: 'Live Action' },
              { id: 'upcoming', label: 'Upcoming Schedule' },
              { id: 'results', label: 'Fight Results' },
              { id: 'fighters', label: 'Fighter Database' },
              { id: 'odds', label: 'Odds Centre' },
              { id: 'intelligence', label: 'Intelligence' },
              { id: 'dashboard', label: 'App Dashboard' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnterApp(item.id);
                }}
                className="px-3.5 py-2.5 bg-[#12161E] rounded-lg text-[#E5E7EB] text-left hover:text-white transition-colors font-sans"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 2. HONEST FEED STATUS BAR (Respecting Current Date: 5 October 2026) */}
      <div className="bg-[#0B0E14] border-b border-[#1A222E] px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[#B8C0C8]">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 text-[#E5E7EB] font-mono text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              FEED STANDBY · 5 OCT 2026
            </span>
            <span className="text-[#E5E7EB] font-sans font-medium">
              No championship fights currently live in the ring.
            </span>
            <span className="hidden sm:inline font-mono text-[#7D8792]">
              Live telemetry activates automatically during sanctioned ring walks.
            </span>
          </div>

          <button 
            onClick={() => onEnterApp('dashboard')}
            className="flex items-center gap-1 text-[#E5E7EB] hover:text-red-400 font-medium cursor-pointer transition-colors"
          >
            <span>Open App Sandbox & Archives</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* 3. HERO SECTION (Lighter, Athletic 600-700 Typography & Clean Left/Right Composition) */}
      <section className="relative overflow-hidden pt-8 pb-12 md:pt-14 md:pb-16 border-b border-[#1A222E]">
        
        {/* Subtle Arena Ambience Backdrop */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090C] via-[#07090C]/85 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT COLUMN: Clear Typography & Direct CTAs */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 text-red-300 rounded-md text-xs font-mono font-medium tracking-wide">
                <Database size={13} className="text-red-400" />
                <span>BOXING INTELLIGENCE PLATFORM · 5 OCT 2026</span>
              </div>

              {/* Lighter Display Weight (600-700) instead of 900 poster weight */}
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-[1.05]">
                Real Fights.<br />
                Real Data.<br />
                <span className="text-red-500 font-bold">Real-Time Intelligence.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#E5E7EB] font-sans leading-relaxed max-w-xl">
                The modern platform engineered for championship boxing. Built to aggregate ringside punch telemetry, track multi-bookmaker odds movements, and verify official fighter histories.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onEnterApp('dashboard')}
                  className="px-6 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-heading text-base font-bold uppercase tracking-wider shadow-lg hover:shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2.5"
                >
                  <span>Enter Fight Pulse</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => onEnterApp('results')}
                  className="px-6 py-3.5 bg-[#12161E] hover:bg-[#1A222E] text-[#E5E7EB] hover:text-white border border-[#232B38] rounded-lg font-heading text-base font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                >
                  <BarChart3 size={16} className="text-red-500" />
                  <span>Explore Results Archive</span>
                </button>
              </div>

              {/* Architectural Capabilities (Honest Architecture - No False Active Claims) */}
              <div className="pt-3 flex flex-wrap items-center gap-5 text-xs text-[#B8C0C8] font-sans border-t border-[#1C232E]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Engineered for CompuBox punch telemetry</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Multi-bookmaker odds normalization</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  <span>Verified career fight records</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Explicit Product Interface Simulation Preview (Option B) */}
            <div className="lg:col-span-6">
              <div 
                onClick={() => onEnterApp('live')}
                className="bg-[#0D1016] border border-[#222A38] hover:border-red-500/50 rounded-xl p-5 sm:p-6 shadow-2xl space-y-4 transition-all cursor-pointer group"
              >
                
                {/* Interface Preview Badge */}
                <div className="flex items-center justify-between border-b border-[#1A222E] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-heading text-sm font-bold text-white uppercase tracking-wider">
                      Live Command Centre · Interface Preview
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-[#B8C0C8] font-mono text-[10px] font-semibold border border-slate-700">
                    SIMULATED BOUT
                  </span>
                </div>

                {/* Matchup Header */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                      <img src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=300&auto=format&fit=crop&q=80" alt="Fighter Red" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-heading text-lg font-bold text-white uppercase leading-none">
                        Fighter Red
                      </div>
                      <div className="text-xs font-mono text-[#B8C0C8] mt-1">
                        Championship Corner · 24-0-0
                      </div>
                    </div>
                  </div>

                  <div className="font-heading text-base font-bold text-[#7D8792] italic px-2">VS</div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <div className="font-heading text-lg font-bold text-white uppercase leading-none">
                        Fighter Blue
                      </div>
                      <div className="text-xs font-mono text-[#B8C0C8] mt-1">
                        Challenger Corner · 21-1-0
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-800">
                      <img src="https://images.unsplash.com/photo-1517438322307-e67111335449?w=300&auto=format&fit=crop&q=80" alt="Fighter Blue" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Live Momentum Bar Simulation */}
                <div className="space-y-1.5 bg-[#121620] p-3 rounded-lg border border-[#1E2634]">
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="text-blue-400">Corner A: 68%</span>
                    <span className="text-[#B8C0C8] uppercase text-[10px] tracking-wider font-sans font-semibold">Fight Momentum Algorithm</span>
                    <span className="text-red-400">32% Corner B</span>
                  </div>
                  <div className="h-2 w-full bg-[#1A222E] rounded-full overflow-hidden flex">
                    <div className="bg-blue-500 h-full" style={{ width: '68%' }} />
                    <div className="bg-red-500 h-full" style={{ width: '32%' }} />
                  </div>
                </div>

                {/* CompuBox Punch Statistics Architecture */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#121620] rounded-lg border border-[#1E2634]">
                    <div className="text-[#B8C0C8] text-xs font-medium">Jabs Landed / Thrown</div>
                    <div className="text-base font-bold font-mono text-white mt-0.5">38 / 112 (34%)</div>
                    <div className="text-xs text-blue-400 font-semibold mt-0.5">Corner A Lead</div>
                  </div>

                  <div className="p-3 bg-[#121620] rounded-lg border border-[#1E2634]">
                    <div className="text-[#B8C0C8] text-xs font-medium">Power Punches Landed</div>
                    <div className="text-base font-bold font-mono text-white mt-0.5">46 / 98 (47%)</div>
                    <div className="text-xs text-red-400 font-semibold mt-0.5">Corner B Response</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-[#1C232E] text-xs">
                  <div className="text-[#B8C0C8] font-sans">
                    Round Clock: <span className="font-mono text-white font-bold">Round 6 of 12 · 01:42</span>
                  </div>
                  <span className="font-heading font-bold uppercase text-red-500 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Open Live Command Centre in App →
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CURRENT SCHEDULE & ACTIVE FIGHTS (Production-Ready Empty/Standby State for 5 October 2026) */}
      <section className="py-12 bg-[#0A0D12] border-b border-[#1A222E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold mb-1">
                Calendar & Fixtures · 5 October 2026
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                Current Fight Schedule
              </h2>
              <p className="text-[#B8C0C8] text-sm sm:text-base mt-1 font-sans">
                Real fights, confirmed cards, and sanctioned ring walks.
              </p>
            </div>

            <button 
              onClick={() => onEnterApp('results')}
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#E5E7EB] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Search Historical Results</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Honest Current Data State (No Fake Bouts Presented as Today's Boxing) */}
          <div className="bg-[#10141D] border border-[#202837] rounded-xl p-8 text-center max-w-4xl mx-auto space-y-5">
            <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-[#B8C0C8] mx-auto">
              <Calendar size={24} className="text-red-500" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-slate-800 text-[#B8C0C8] text-xs font-mono">
                <span>SCHEDULE STATUS: STANDBY</span>
                <span>·</span>
                <span className="text-white font-bold">5 OCTOBER 2026</span>
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase">
                No Sanctioned Championship Bouts Active Today
              </h3>
              <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                Fight Pulse only presents verified fight schedules. Because no live external boxing data provider is currently connected to broadcast today's schedule, historical bouts from previous years are not presented as today's action.
              </p>
            </div>

            {/* Provider Integration Blueprint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-3 max-w-2xl mx-auto text-xs font-sans">
              <div className="p-3.5 bg-[#0A0D12] rounded-lg border border-[#1A222E] space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Radio size={14} className="text-emerald-400" />
                  <span>Real Data Ingestion Engine</span>
                </div>
                <p className="text-[#B8C0C8] text-[11px] leading-relaxed">
                  When a verified provider (Sportradar / The Odds API) is connected, real-time cards, ringwalks, and odds will populate here automatically.
                </p>
              </div>

              <div className="p-3.5 bg-[#0A0D12] rounded-lg border border-[#1A222E] space-y-1">
                <div className="font-bold text-white flex items-center gap-2">
                  <Database size={14} className="text-blue-400" />
                  <span>Developer Sandbox Available</span>
                </div>
                <p className="text-[#B8C0C8] text-[11px] leading-relaxed">
                  Historical simulation fixtures remain accessible within the authenticated dashboard for UI and integration testing.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onEnterApp('dashboard')}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-heading text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Open Dashboard & Simulator</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => onEnterApp('results')}
                className="px-6 py-2.5 bg-[#141A23] hover:bg-[#1E2634] text-[#E5E7EB] border border-[#232B38] rounded-lg font-heading text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Browse Verified Results Database
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. WHY FIGHT PULSE (Boxing Moves Fast - Lighter Headings & High-Contrast Body Copy) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
            The Fight Pulse Standard
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight">
            Boxing Moves Fast. Don't Rely On Guesswork.
          </h2>
          <p className="text-base sm:text-lg text-[#E5E7EB] font-sans leading-relaxed">
            Fight announcements, sudden line shifts, ring walks, and round-by-round drama. Fight Pulse is built to unify verified data into a disciplined command center.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-[#10141D] border border-[#202837] rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-red-600/15 text-red-500 flex items-center justify-center font-bold">
              <Radio size={20} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase">
              Live Fight Speed
            </h3>
            <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
              Real-time round clocks, punch connection rates, official judges' scorecards, and live momentum tracking as rounds unfold in the ring.
            </p>
          </div>

          <div className="bg-[#10141D] border border-[#202837] rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/15 text-blue-400 flex items-center justify-center font-bold">
              <Percent size={20} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase">
              Market Intelligence
            </h3>
            <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
              Understand the numbers. Compare bookmaker odds across major books, monitor line movements, and analyze implied win probabilities.
            </p>
          </div>

          <div className="bg-[#10141D] border border-[#202837] rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600/15 text-emerald-400 flex items-center justify-center font-bold">
              <Trophy size={20} />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white uppercase">
              Championship History
            </h3>
            <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
              Verified career records without missing bouts. Official methods of victory (KO, TKO, UD, SD, MD), sanctioning belts, and searchable archives.
            </p>
          </div>

        </div>

      </section>

      {/* 6. ONE PLACE FOR THE WHOLE FIGHT (Platform Capabilities Demonstration) */}
      <section className="py-12 bg-[#090C11] border-y border-[#1A222E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
                Platform Architecture
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                One Place For The Whole Fight.
              </h2>
              <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                Explore the core modules of the Fight Pulse platform.
              </p>
            </div>

            {/* Feature Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'live', label: 'Live Command' },
                { id: 'odds', label: 'Odds Centre' },
                { id: 'fighters', label: 'Fighter Profiles' },
                { id: 'results', label: 'Results Database' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePreviewTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activePreviewTab === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'bg-[#12161E] text-[#B8C0C8] hover:text-white border border-[#232B38]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Feature Preview Panel */}
          <div className="bg-[#0E1218] border border-[#232B38] rounded-xl p-6 lg:p-8 shadow-2xl">
            {activePreviewTab === 'live' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono text-red-400 font-semibold uppercase">
                    Module 01 · Live Ringside Telemetry
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase leading-snug">
                    Live Fight Command
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                    Round information, punch statistics, live odds movement, and deterministic fight momentum — unified into a single real-time console.
                  </p>
                  <div className="space-y-2 text-sm text-[#E5E7EB] font-sans pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span>Second-by-second round countdown clocks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span>Jabs vs power punches landed & thrown accuracy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                      <span>Hit map telemetry distinguishing head from body shots</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => onEnterApp('live')}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      Open Live Dashboard →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#141A23] p-5 rounded-xl border border-[#232B38] space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-white uppercase">Round 6 Telemetry Architecture</span>
                    <span className="font-mono text-red-400 font-bold">01:42 Remaining</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-[#0A0D12] rounded-lg border border-[#1A222E]">
                      <div className="text-base font-bold font-mono text-blue-400">84 Landed / 40%</div>
                      <div className="text-xs text-[#B8C0C8] font-sans uppercase font-semibold mt-0.5">Lead Corner</div>
                    </div>
                    <div className="p-3 bg-[#0A0D12] rounded-lg border border-[#1A222E]">
                      <div className="text-base font-bold font-mono text-red-400">29 Landed / 16%</div>
                      <div className="text-xs text-[#B8C0C8] font-sans uppercase font-semibold mt-0.5">Trailing Corner</div>
                    </div>
                  </div>
                  <div className="p-3.5 bg-[#0A0D12] rounded-lg border border-[#1A222E] text-sm text-[#B8C0C8] font-sans leading-relaxed">
                    <span className="text-white font-semibold">Momentum Engine: </span>
                    14 power shots landed at 48% accuracy during the last completed round, shifting perimeter control and ring occupancy to the lead corner.
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'odds' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono text-blue-400 font-semibold uppercase">
                    Module 02 · Market Intelligence
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase leading-snug">
                    Watch The Odds Move
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                    Compare bookmaker prices across major licensed sportsbooks. Track line changes and sharp volume shifts before opening bells.
                  </p>
                  <div className="space-y-2 text-sm text-[#E5E7EB] font-sans pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span>Multi-bookmaker spread comparison</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span>Line shifts and opening-to-closing movement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                      <span>Calculated implied win probabilities</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => onEnterApp('odds')}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      Open Odds Centre →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#141A23] p-5 rounded-xl border border-[#232B38] space-y-3 font-mono text-xs">
                  <div className="flex justify-between font-bold text-[#B8C0C8] border-b border-[#232B38] pb-2 font-sans">
                    <span>MARKET SPREAD PREVIEW</span>
                    <span>LINE RATIO</span>
                    <span>STATUS</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#1A222E]/60">
                    <span className="text-white font-sans font-bold text-sm">Championship Pick'em</span>
                    <span className="text-[#E5E7EB] font-semibold">{formatOdds(1.90)} / {formatOdds(1.92)}</span>
                    <span className="text-emerald-400 font-bold">Even Spread</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#1A222E]/60">
                    <span className="text-white font-sans font-bold text-sm">Heavyweight Contender</span>
                    <span className="text-[#E5E7EB] font-semibold">{formatOdds(1.36)} / {formatOdds(3.60)}</span>
                    <span className="text-amber-400 font-bold">Favorite</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-white font-sans font-bold text-sm">Challenger Collision</span>
                    <span className="text-[#E5E7EB] font-semibold">{formatOdds(1.52)} / {formatOdds(2.45)}</span>
                    <span className="text-blue-400 font-bold">Sharp Line</span>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'fighters' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono text-amber-400 font-semibold uppercase">
                    Module 03 · Fighter Profiles
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase leading-snug">
                    Know The Fighters
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                    Verified records, physical dimensions, knockout tendencies, and career histories before the opening bell.
                  </p>
                  <div className="space-y-2 text-sm text-[#E5E7EB] font-sans pt-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <span>Verified professional records and knockout rates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                      <span>Tale of the tape physical stats and reach comparisons</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => onEnterApp('fighters', 'anthony-joshua')}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      Explore Fighter Database →
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 bg-[#141A23] p-5 rounded-xl border border-[#232B38] space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={joshua.image} alt={joshua.name} className="w-14 h-14 rounded-lg object-cover border border-slate-700" />
                    <div>
                      <div className="font-heading text-xl font-bold text-white uppercase leading-none">{joshua.name}</div>
                      <div className="text-xs font-mono text-[#E5E7EB] font-semibold mt-1">
                        {joshua.record.wins}-{joshua.record.losses}-{joshua.record.draws} ({joshua.record.kos} KOs) · {joshua.physical.division}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2.5 bg-[#0A0D12] rounded-lg border border-slate-800">
                      <div className="text-white font-bold font-mono text-sm">{joshua.physical.height}</div>
                      <div className="text-xs text-[#7D8792] font-sans">Height</div>
                    </div>
                    <div className="p-2.5 bg-[#0A0D12] rounded-lg border border-slate-800">
                      <div className="text-white font-bold font-mono text-sm">{joshua.physical.reach}</div>
                      <div className="text-xs text-[#7D8792] font-sans">Reach</div>
                    </div>
                    <div className="p-2.5 bg-[#0A0D12] rounded-lg border border-slate-800">
                      <div className="text-white font-bold font-mono text-sm">{joshua.record.koPercentage}%</div>
                      <div className="text-xs text-[#7D8792] font-sans">KO Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activePreviewTab === 'results' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                    Module 04 · Historical Archive
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase leading-snug">
                    Historical Fight Results
                  </h3>
                  <p className="text-sm sm:text-base text-[#B8C0C8] font-sans leading-relaxed">
                    Search decades of verified championship boxing history with multi-criteria filtering by weight class, decision type, and sanctioning body.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => onEnterApp('results')}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                    >
                      Search Complete Results Archive →
                    </button>
                  </div>
                </div>

                {/* Accurately Presented Historical Results (True Dates Clearly Stated) */}
                <div className="lg:col-span-7 bg-[#141A23] p-5 rounded-xl border border-[#232B38] space-y-2.5 text-xs">
                  <div className="text-[11px] font-mono text-[#7D8792] uppercase border-b border-[#232B38] pb-1.5 flex justify-between">
                    <span>HISTORICAL CHAMPIONSHIP ARCHIVE</span>
                    <span>OFFICIAL VERDICT</span>
                  </div>
                  {[
                    { fight: 'Ryan Garcia vs Devin Haney', res: 'WIN MD (12)', date: '20 Apr 2024', event: 'Barclays Center, NY' },
                    { fight: 'Anthony Joshua vs Francis Ngannou', res: 'WIN KO R2 (10)', date: '8 Mar 2024', event: 'Kingdom Arena, Riyadh' },
                    { fight: 'Tyson Fury vs Francis Ngannou', res: 'WIN SD R10 (10)', date: '28 Oct 2023', event: 'Riyadh Season' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-[#0A0D12] rounded-lg border border-[#1A222E]">
                      <div>
                        <div className="font-bold text-white font-sans text-sm">{item.fight}</div>
                        <div className="text-xs text-[#7D8792] font-mono mt-0.5">{item.date} · {item.event}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-mono font-bold text-xs border border-emerald-800">
                        {item.res}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 7. INTELLIGENCE (Data That Moves With The Fight) */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
              Fight Telemetry Architecture
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
              Data That Moves With The Fight.
            </h2>
            <p className="text-base text-[#E5E7EB] font-sans leading-relaxed">
              Fight Pulse converts raw ringside feeds into live signals that illustrate exactly how tactical dynamics change round by round.
            </p>

            <div className="space-y-3 text-sm text-[#B8C0C8] font-sans pt-1">
              <div className="p-3.5 bg-[#10141D] rounded-xl border border-[#202837]">
                <div className="font-bold text-white font-heading text-base uppercase mb-1">Momentum Shifts</div>
                Deterministic calculation tracking who is dictating range and landing power punches.
              </div>
              <div className="p-3.5 bg-[#10141D] rounded-xl border border-[#202837]">
                <div className="font-bold text-white font-heading text-base uppercase mb-1">Statistical Changes</div>
                Monitor connection drops, output fatigue, and tactical adjustments in real time.
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onEnterApp('intelligence')}
                className="px-6 py-3 bg-[#12161E] hover:bg-[#1A222E] text-white border border-[#232B38] rounded-lg font-heading text-sm sm:text-base font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Intelligence Centre</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0E1218] border border-[#232B38] rounded-xl p-6 shadow-2xl space-y-3 text-xs">
            <div className="text-[#B8C0C8] uppercase text-xs font-sans font-bold border-b border-[#1C232E] pb-2 flex items-center justify-between">
              <span>Fight Signal Engine · Telemetry Demonstration</span>
              <span className="font-mono text-emerald-400 font-bold">● Architecture Active</span>
            </div>
            
            <div className="p-3.5 bg-[#141A23] rounded-lg border border-[#202837] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold font-mono text-emerald-400 text-xs">POWER SURGE SIGNAL SPECIFICATION</span>
                <span className="text-[#7D8792] font-mono text-xs">Trigger: &gt;45% Landed</span>
              </div>
              <p className="text-[#E5E7EB] font-sans text-sm leading-relaxed">
                When a fighter's power punch connection rate spikes beyond benchmark baselines, Fight Pulse automatically emits a power surge telemetry event.
              </p>
            </div>

            <div className="p-3.5 bg-[#141A23] rounded-lg border border-[#202837] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold font-mono text-blue-400 text-xs">DEFENSIVE EFFICIENCY ALGORITHM</span>
                <span className="text-[#7D8792] font-mono text-xs">3-Round Rolling Window</span>
              </div>
              <p className="text-[#E5E7EB] font-sans text-sm leading-relaxed">
                Opponent accuracy suppression tracking measures slipped punches and defensive movement over consecutive rounds.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 8. DATA TRUST PHILOSOPHY (Real Data. No Guesswork.) */}
      <section className="py-12 bg-[#090C11] border-y border-[#1A222E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
                Integrity Standard
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight leading-snug">
                Real Data.<br />
                No Guesswork.
              </h2>
            </div>

            <div className="md:col-span-7 space-y-3 text-[#E5E7EB] text-base font-sans leading-relaxed">
              <p>
                If we have verified data, we show it. If we don't, we tell you. Fight Pulse never turns missing information into made-up numbers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-3.5 bg-[#12161E] rounded-lg border border-[#202837]">
                  <span className="text-white font-bold block mb-1 font-sans text-sm">Unknown ≠ Zero</span>
                  <span className="text-[#B8C0C8] font-sans text-xs leading-relaxed">
                    If a live ringside feed does not supply punch statistics, we display <span className="text-amber-400 font-mono font-bold">STATISTICS UNAVAILABLE</span> instead of guessing zero.
                  </span>
                </div>
                <div className="p-3.5 bg-[#12161E] rounded-lg border border-[#202837]">
                  <span className="text-white font-bold block mb-1 font-sans text-sm">Traceable Inputs</span>
                  <span className="text-[#B8C0C8] font-sans text-xs leading-relaxed">
                    Every momentum swing is directly derived from landed punches, power ratios, and knockdowns — traceable to exact round inputs.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. COVERAGE SCOPE (Major Boxing Organizations & Promoters) */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <div className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">
            Sanctioning & Promoters
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Built For The Fight Game.
          </h2>
          <p className="text-sm sm:text-base text-[#B8C0C8] font-sans">
            Built to integrate world championship boxing across all major sanctioning bodies and promoters.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 py-2">
          {PROMOTIONS.map(promo => (
            <div key={promo.id} className="px-5 py-2.5 bg-[#10141D] border border-[#202837] rounded-lg shadow-sm hover:border-slate-500 transition-colors">
              <span className="font-heading text-base font-bold text-[#E5E7EB] uppercase tracking-wider">
                {promo.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className="py-14 relative overflow-hidden bg-gradient-to-b from-[#0D1016] to-[#07090C] border-t border-[#1A222E]">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-snug">
            When The Fight Matters, Open Fight Pulse.
          </h2>
          <p className="text-base sm:text-lg text-[#E5E7EB] max-w-xl mx-auto font-sans leading-relaxed">
            Live fights. Real-time stats. Verified records. Odds intelligence. Enter the platform now.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => onEnterApp('dashboard')}
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-heading text-lg font-bold uppercase tracking-wider shadow-xl hover:shadow-red-600/30 transition-all cursor-pointer flex items-center gap-2.5"
            >
              <span>Enter Fight Pulse</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 11. PUBLIC FOOTER */}
      <footer className="bg-[#05070A] border-t border-[#171D27] py-10 px-4 sm:px-8 text-xs text-[#B8C0C8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
          
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-wider">
                FIGHT <span className="text-red-500">PULSE</span>
              </span>
            </div>
            <p className="text-xs text-[#B8C0C8] font-sans leading-relaxed">
              Real fights. Real data. Real-time intelligence. The modern platform for boxing fans and industry professionals.
            </p>
            <div className="text-[11px] text-[#7D8792] font-mono">
              © 2026 Fight Pulse. All rights reserved.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-sans">
            <div className="space-y-2">
              <span className="text-white font-bold uppercase text-xs block font-heading tracking-wider">Platform</span>
              <div className="space-y-1.5 text-xs text-[#B8C0C8]">
                <div><button onClick={() => onEnterApp('live')} className="hover:text-white cursor-pointer">Live Action</button></div>
                <div><button onClick={() => onEnterApp('upcoming')} className="hover:text-white cursor-pointer">Upcoming Schedule</button></div>
                <div><button onClick={() => onEnterApp('results')} className="hover:text-white cursor-pointer">Fight Results</button></div>
                <div><button onClick={() => onEnterApp('fighters')} className="hover:text-white cursor-pointer">Fighter Database</button></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold uppercase text-xs block font-heading tracking-wider">Intelligence</span>
              <div className="space-y-1.5 text-xs text-[#B8C0C8]">
                <div><button onClick={() => onEnterApp('odds')} className="hover:text-white cursor-pointer">Odds Centre</button></div>
                <div><button onClick={() => onEnterApp('intelligence')} className="hover:text-white cursor-pointer">Fight Signals</button></div>
                <div><button onClick={() => onEnterApp('alerts')} className="hover:text-white cursor-pointer">Fight Alerts</button></div>
                <div><button onClick={() => onEnterApp('dashboard')} className="hover:text-white cursor-pointer">App Dashboard</button></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-white font-bold uppercase text-xs block font-heading tracking-wider">Legal</span>
              <div className="space-y-1.5 text-xs text-[#B8C0C8]">
                <div><span className="hover:text-white cursor-pointer">Privacy Policy</span></div>
                <div><span className="hover:text-white cursor-pointer">Terms of Service</span></div>
                <div><span className="hover:text-white cursor-pointer">Data Integrity Statement</span></div>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
