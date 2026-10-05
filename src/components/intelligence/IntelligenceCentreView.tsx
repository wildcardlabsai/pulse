import React, { useState } from 'react';
import { 
  Radio, 
  Activity, 
  Sparkles, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Target, 
  ChevronRight, 
  Clock, 
  Zap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

export const IntelligenceCentreView: React.FC = () => {
  const { activeLiveFight, formatOdds } = useLiveFight();
  const [selectedRound, setSelectedRound] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<string>('overview');

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Title Header with Intelligence Pill Badges (Screenshot 5) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C232E] pb-5">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide uppercase">
            Intelligence Centre
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real data. Deeper insights. Smarter decisions. Powered by verified telemetry and proprietary models.
          </p>
        </div>

        {/* 3 Value Pillars from Screenshot 5 */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <Activity size={16} className="text-red-500" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">Fight Pulse Momentum</div>
              <div className="text-[10px] text-slate-400">Live & historical analysis</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <Sparkles size={16} className="text-blue-400" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">Data-Driven Insights</div>
              <div className="text-[10px] text-slate-400">Key trends & performance</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <FileText size={16} className="text-emerald-400" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">Explained Analysis</div>
              <div className="text-[10px] text-slate-400">Why momentum shifts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#1C232E] pb-3">
        {[
          'Overview',
          'Fight Pulse Signals',
          'Momentum Analysis',
          'Statistical Trends',
          'Odds Intelligence',
          'Fighter Insights',
          'Event Intelligence'
        ].map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
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

      {/* TOP ROW: Live Momentum + Momentum Breakdown + Key Signals (Screenshot 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. LIVE MOMENTUM CARD */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold uppercase">
                LIVE
              </span>
              <h3 className="font-heading text-lg font-bold text-white uppercase">
                Live Momentum
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">R6 2:15</span>
          </div>

          <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-blue-500 shrink-0">
                <img src={activeLiveFight.fighterA.image} alt={activeLiveFight.fighterA.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-bold text-white uppercase">{activeLiveFight.fighterA.name}</div>
                <div className="font-mono text-2xl font-black text-blue-400">{activeLiveFight.momentum.fighterAScore}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Momentum Score</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 text-right">
              <div>
                <div className="text-xs font-bold text-white uppercase">{activeLiveFight.fighterB.name}</div>
                <div className="font-mono text-2xl font-black text-red-400">{activeLiveFight.momentum.fighterBScore}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Momentum Score</div>
              </div>
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-red-500 shrink-0">
                <img src={activeLiveFight.fighterB.image} alt={activeLiveFight.fighterB.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Interactive R1-R12 Momentum Sparkline Curve */}
          <div className="h-28 relative pt-2">
            <svg viewBox="0 0 300 80" className="w-full h-full">
              <path
                d="M 10,60 Q 40,55 80,45 T 150,30 T 220,20 T 290,15"
                fill="none"
                stroke="#00B4D8"
                strokeWidth="2.5"
              />
              <path
                d="M 10,20 Q 40,25 80,35 T 150,50 T 220,60 T 290,65"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
              />
              <circle cx="290" cy="15" r="4" fill="#00B4D8" />
              <circle cx="290" cy="65" r="4" fill="#EF4444" />
            </svg>
            <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-[#1C232E]">
              <span>R1</span>
              <span>R2</span>
              <span>R3</span>
              <span>R4</span>
              <span>R5</span>
              <span className="text-red-400 font-bold">R6</span>
              <span>R7</span>
              <span>R8</span>
              <span>R9</span>
              <span>R10</span>
              <span>R11</span>
              <span>R12</span>
            </div>
          </div>
        </div>

        {/* 2. MOMENTUM BREAKDOWN */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Momentum Breakdown
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-blue-400 font-bold">Stevenson</span>
              <span className="text-red-400 font-bold">Harutyunyan</span>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {[
              { label: 'Punch Output', valA: 78, valB: 42 },
              { label: 'Accuracy', valA: 72, valB: 38 },
              { label: 'Power Punches', valA: 65, valB: 28 },
              { label: 'Defence', valA: 80, valB: 35 },
              { label: 'Ring Control', valA: 70, valB: 30 },
              { label: 'Recent Rounds', valA: 68, valB: 32 }
            ].map((metric) => (
              <div key={metric.label} className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-blue-400 font-bold">{metric.valA}</span>
                  <span className="text-slate-400 font-sans uppercase font-bold text-[10px]">{metric.label}</span>
                  <span className="text-red-400 font-bold">{metric.valB}</span>
                </div>
                <div className="h-2 bg-slate-900 rounded-full overflow-hidden flex">
                  <div className="bg-blue-500" style={{ width: `${(metric.valA / (metric.valA + metric.valB)) * 100}%` }} />
                  <div className="bg-red-500" style={{ width: `${(metric.valB / (metric.valA + metric.valB)) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. KEY SIGNALS (Live Feed from Screenshot 5) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Key Signals
            </h3>
            <span className="flex items-center gap-1 text-[10px] font-mono text-red-500 bg-red-950/80 px-2 py-0.5 rounded font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" /> Live
            </span>
          </div>

          <div className="space-y-2.5">
            {activeLiveFight.signals.map((sig) => (
              <div key={sig.id} className="p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl flex items-start gap-2.5 text-xs">
                <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded shrink-0">
                  {sig.timestamp}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span className="truncate">{sig.title}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 px-1 rounded">
                      {sig.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{sig.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* MIDDLE ROW: Round-by-Round Momentum Graph + Round Statistics + Momentum Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Round by Round Momentum Dual Curves */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Round by Round Momentum
            </h3>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-blue-400">— Stevenson</span>
              <span className="text-red-400">— Harutyunyan</span>
            </div>
          </div>

          <div className="h-44 relative">
            <svg viewBox="0 0 300 120" className="w-full h-full">
              <line x1="0" y1="30" x2="300" y2="30" stroke="#1A222E" strokeDasharray="2 2" />
              <line x1="0" y1="60" x2="300" y2="60" stroke="#1A222E" strokeDasharray="2 2" />
              <line x1="0" y1="90" x2="300" y2="90" stroke="#1A222E" strokeDasharray="2 2" />
              
              <path
                d="M 10,80 Q 50,70 100,55 T 180,45 T 250,35"
                fill="none"
                stroke="#00B4D8"
                strokeWidth="3"
              />
              <path
                d="M 10,40 Q 50,50 100,65 T 180,75 T 250,85"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
              />
            </svg>
            <div className="flex justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-[#1C232E]">
              <span>R1</span>
              <span>R2</span>
              <span>R3</span>
              <span>R4</span>
              <span>R5</span>
              <span>R6</span>
              <span>R7</span>
              <span>R8</span>
              <span>R9</span>
              <span>R10</span>
              <span>R11</span>
              <span>R12</span>
            </div>
          </div>
        </div>

        {/* Round Statistics (Round 6) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Round Statistics
            </h3>
            <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
              Round 6
            </span>
          </div>

          <table className="w-full text-xs font-mono">
            <tbody>
              <tr className="border-b border-[#1A222E]">
                <td className="py-2 text-blue-400 font-bold">24</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Total Punches</td>
                <td className="py-2 text-right text-red-400 font-bold">12</td>
              </tr>
              <tr className="border-b border-[#1A222E]">
                <td className="py-2 text-blue-400 font-bold">11</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Punches Landed</td>
                <td className="py-2 text-right text-red-400 font-bold">4</td>
              </tr>
              <tr className="border-b border-[#1A222E]">
                <td className="py-2 text-blue-400 font-bold">46%</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Accuracy</td>
                <td className="py-2 text-right text-red-400 font-bold">33%</td>
              </tr>
              <tr className="border-b border-[#1A222E]">
                <td className="py-2 text-blue-400 font-bold">14</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Jabs Thrown</td>
                <td className="py-2 text-right text-red-400 font-bold">8</td>
              </tr>
              <tr className="border-b border-[#1A222E]">
                <td className="py-2 text-blue-400 font-bold">7</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Jabs Landed</td>
                <td className="py-2 text-right text-red-400 font-bold">3</td>
              </tr>
              <tr>
                <td className="py-2 text-blue-400 font-bold">4</td>
                <td className="py-2 text-center text-slate-400 font-sans uppercase text-[10px]">Power Landed</td>
                <td className="py-2 text-right text-red-400 font-bold">1</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Momentum Explanation (Screenshot 5) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Momentum Explanation
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Why did momentum change?</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Stevenson Up */}
            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span className="flex items-center gap-1">
                  <TrendingUp size={14} /> Stevenson's momentum increased (+8)
                </span>
                <span className="font-mono text-[10px] text-slate-500">2:15</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>Higher jab accuracy (80%)</li>
                <li>Increased power punch output</li>
                <li>Controlling centre of ring</li>
                <li>Harutyunyan's output decreased</li>
              </ul>
            </div>

            {/* Harutyunyan Down */}
            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-2">
              <div className="flex items-center justify-between font-bold text-red-400">
                <span className="flex items-center gap-1">
                  <TrendingDown size={14} /> Harutyunyan's momentum decreased (-6)
                </span>
                <span className="font-mono text-[10px] text-slate-500">1:32</span>
              </div>
              <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                <li>Lower punch volume (down 42%)</li>
                <li>Back foot for extended period</li>
                <li>Defensive posture</li>
                <li>Landed only 1 power punch in last 60 seconds</li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM ROW: Fight Pulse Signals Matrix + Comparative Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Signals Matrix */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Fight Pulse Signals Matrix
            </h3>
            <span className="text-xs font-mono text-emerald-400">High Confidence Feed</span>
          </div>

          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-[#1C232E] text-slate-400 font-sans uppercase text-[10px]">
                <th className="text-left pb-2">Signal</th>
                <th className="text-center pb-2">Status</th>
                <th className="text-center pb-2">Confidence</th>
                <th className="text-right pb-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sig: 'Momentum Leader', status: 'Stevenson', conf: 'High', time: '2:15' },
                { sig: 'Output Trend', status: 'Increasing', conf: 'High', time: '2:15' },
                { sig: 'Power Punch Impact', status: 'Strong', conf: 'Medium', time: '1:58' },
                { sig: 'Defence Effectiveness', status: 'High', conf: 'High', time: '2:15' },
                { sig: 'Ring Control', status: 'Stevenson', conf: 'High', time: '2:15' },
                { sig: 'Fatigue Indicators', status: 'Harutyunyan', conf: 'Medium', time: '1:32' }
              ].map((row) => (
                <tr key={row.sig} className="border-b border-[#171E28]">
                  <td className="py-2.5 font-bold text-white font-sans">{row.sig}</td>
                  <td className="py-2.5 text-center text-slate-300">{row.status}</td>
                  <td className="py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      row.conf === 'High' ? 'text-emerald-400 bg-emerald-950/70' : 'text-amber-400 bg-amber-950/70'
                    }`}>
                      {row.conf}
                    </span>
                  </td>
                  <td className="py-2.5 text-right text-slate-400">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Comparative Insights (Screenshot 5) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Comparative Insights
            </h3>
            <div className="flex items-center gap-1.5 text-[11px] font-bold">
              <span className="text-red-500">Key Insights</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Target size={14} className="text-blue-400" />
                Stevenson's jab is 42% more effective than opponent's
              </div>
              <p className="text-slate-400 text-[11px]">Landed 48% vs 34% jab accuracy through 6 rounds.</p>
            </div>

            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <TrendingDown size={14} className="text-red-400" />
                Harutyunyan's output is 36% lower than his career average
              </div>
              <p className="text-slate-400 text-[11px]">Typically throws 28 punches per round, currently averaging 18.</p>
            </div>

            <div className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Stevenson's defensive metrics are elite
              </div>
              <p className="text-slate-400 text-[11px]">Absorbing 2.1 punches per round (division average 6.8).</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
