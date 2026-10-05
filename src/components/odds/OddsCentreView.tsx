import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Radio, 
  Calendar, 
  Layers, 
  Zap, 
  ChevronRight, 
  Search, 
  AlertCircle,
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

interface OddsCentreViewProps {
  onOpenFight: (fightId: string) => void;
}

export const OddsCentreView: React.FC<OddsCentreViewProps> = ({ onOpenFight }) => {
  const { oddsFormat, setOddsFormat, formatOdds } = useLiveFight();
  const [activeFilter, setActiveFilter] = useState<'all' | 'live' | 'upcoming'>('all');
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [selectedFightForMovement, setSelectedFightForMovement] = useState<string>('garcia-vs-haney');

  const upcomingOddsRows = [
    {
      id: 'catterall-vs-prograis',
      date: 'Sat 20 Apr 22:00',
      fight: 'Catterall vs Prograis',
      weightClass: 'Super Lightweight',
      b365: 1.90,
      wh: 1.95,
      pp: 1.88,
      uni: 1.92,
      sky: 1.91,
      bf: 1.87,
      bs: 1.93,
      bestHome: 1.95,
      bestAway: 2.40,
      movement: '+26%',
      direction: 'up'
    },
    {
      id: 'dubois-vs-hrgovic',
      date: 'Sat 20 Apr 20:30',
      fight: 'Dubois vs Hrgović',
      weightClass: 'Heavyweight',
      b365: 1.36,
      wh: 1.33,
      pp: 1.38,
      uni: 1.34,
      sky: 1.32,
      bf: 1.35,
      bs: 1.37,
      bestHome: 1.38,
      bestAway: 3.60,
      movement: '-24%',
      direction: 'down'
    },
    {
      id: 'stevenson-vs-zepeda',
      date: 'Sat 20 Apr 19:45',
      fight: 'Stevenson vs Zepeda',
      weightClass: 'Lightweight',
      b365: 1.75,
      wh: 1.72,
      pp: 1.78,
      uni: 1.74,
      sky: 1.70,
      bf: 1.76,
      bs: 1.71,
      bestHome: 1.78,
      bestAway: 2.15,
      movement: '+22%',
      direction: 'up'
    },
    {
      id: 'opetaia-vs-zorro',
      date: 'Sat 20 Apr 18:55',
      fight: 'Opetaia vs Zorro',
      weightClass: 'Cruiserweight',
      b365: 1.22,
      wh: 1.25,
      pp: 1.20,
      uni: 1.24,
      sky: 1.23,
      bf: 1.21,
      bs: 1.26,
      bestHome: 1.26,
      bestAway: 4.20,
      movement: '+18%',
      direction: 'up'
    },
    {
      id: 'garcia-vs-haney',
      date: 'Sun 21 Apr 01:00',
      fight: 'Garcia vs Haney',
      weightClass: 'Super Lightweight',
      b365: 2.10,
      wh: 2.05,
      pp: 2.15,
      uni: 2.12,
      sky: 2.08,
      bf: 2.00,
      bs: 2.18,
      bestHome: 2.18,
      bestAway: 1.72,
      movement: '-10%',
      direction: 'down'
    }
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Title Header with Metric Cards (Screenshot 6) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C232E] pb-5">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide uppercase">
            Odds Centre
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Live and historical boxing odds from leading bookmakers. Track movements. Find value. Stay ahead.
          </p>
        </div>

        {/* 4 Metric Counters from Screenshot 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Live Fights</div>
              <div className="text-lg font-bold text-white">2</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Calendar size={16} className="text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Upcoming Fights</div>
              <div className="text-lg font-bold text-white">18</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Layers size={16} className="text-blue-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Tracked Bookmakers</div>
              <div className="text-lg font-bold text-white">12</div>
            </div>
          </div>

          <div className="bg-[#12161D] border border-[#1E2634] p-2.5 rounded-xl flex items-center gap-2.5">
            <Zap size={16} className="text-emerald-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Odds Updates</div>
              <div className="text-lg font-bold text-emerald-400">2.4s Live</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1C232E] pb-3">
        <div className="flex flex-wrap gap-1.5">
          {['Overview', 'Live Odds', 'Upcoming', 'Biggest Movers', 'Bookmakers', 'Market Trends', 'Value Bets'].map((tab, idx) => (
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

        {/* Decimal / Fractional Toggle */}
        <div className="flex items-center gap-1 bg-[#141820] p-1 rounded-lg border border-[#232B38]">
          <button
            onClick={() => setOddsFormat('decimal')}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              oddsFormat === 'decimal' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Decimal
          </button>
          <button
            onClick={() => setOddsFormat('fractional')}
            className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
              oddsFormat === 'fractional' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fractional
          </button>
        </div>
      </div>

      {/* TOP 3 CARDS: Biggest Odds Movers | Value Opportunities | Odds Alerts (Screenshot 6) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Biggest Odds Movers */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-red-500" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Biggest Odds Movers (24h)
              </h3>
            </div>
            <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { match: 'Zepeda vs Farmer', div: 'Lightweight', change: '+42%', odds: '1.62 → 2.30', positive: true },
              { match: 'Joshua vs Wilder', div: 'Heavyweight', change: '-28%', odds: '1.45 → 1.04', positive: false },
              { match: 'Catterall vs Prograis', div: 'Super Lightweight', change: '+26%', odds: '1.90 → 2.40', positive: true },
              { match: 'Dubois vs Hrgović', div: 'Heavyweight', change: '-24%', odds: '1.36 → 1.03', positive: false },
              { match: 'Stevenson vs Zepeda', div: 'Lightweight', change: '+22%', odds: '1.75 → 2.15', positive: true }
            ].map((item, idx) => (
              <div key={item.match + idx} className="flex items-center justify-between p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl text-xs">
                <div>
                  <div className="font-bold text-white">{item.match}</div>
                  <div className="text-[10px] text-slate-400">{item.div}</div>
                </div>
                <div className="text-right font-mono">
                  <div className={`font-bold ${item.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                    {item.change}
                  </div>
                  <div className="text-[10px] text-slate-400">{item.odds}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Value Opportunities */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-emerald-400" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Value Opportunities
              </h3>
            </div>
            <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { match: 'Liam Smith vs Eubank Jr.', div: 'Middleweight', edge: '12.4%', odds: '2.10', bookie: 'Sky Bet' },
              { match: 'Catterall vs Prograis', div: 'Super Lightweight', edge: '8.7%', odds: '2.40', bookie: 'Bet365' },
              { match: 'Dubois vs Hrgović', div: 'Heavyweight', edge: '7.9%', odds: '3.60', bookie: 'William Hill' },
              { match: 'Zepeda vs Farmer', div: 'Lightweight', edge: '6.8%', odds: '2.30', bookie: 'Unibet' },
              { match: 'Opetaia vs Zorro', div: 'Cruiserweight', edge: '5.6%', odds: '1.80', bookie: 'Paddy Power' }
            ].map((item, idx) => (
              <div key={item.match + idx} className="flex items-center justify-between p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl text-xs">
                <div>
                  <div className="font-bold text-white">{item.match}</div>
                  <div className="text-[10px] text-slate-400">{item.div} · {item.bookie}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-emerald-400">Value {item.edge}</div>
                  <div className="text-[11px] text-white font-bold">{formatOdds(parseFloat(item.odds))}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Odds Alerts */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-400" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Odds Alerts
              </h3>
            </div>
            <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {[
              { time: '2m', match: 'Zepeda vs Farmer', desc: 'Odds moved +18% (1.95 → 2.30)', icon: ArrowUpRight, color: 'text-emerald-400' },
              { time: '8m', match: 'Joshua vs Wilder', desc: 'Odds moved -12% (1.18 → 1.04)', icon: ArrowDownRight, color: 'text-red-400' },
              { time: '12m', match: 'Catterall vs Prograis', desc: 'Odds moved +15% (2.10 → 2.40)', icon: ArrowUpRight, color: 'text-emerald-400' },
              { time: '28m', match: 'Dubois vs Hrgović', desc: 'Odds moved -20% (1.70 → 1.36)', icon: ArrowDownRight, color: 'text-red-400' },
              { time: '41m', match: 'Taylor vs Cameron', desc: 'Odds moved +14% (2.45 → 2.80)', icon: ArrowUpRight, color: 'text-emerald-400' }
            ].map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div key={alert.match + idx} className="flex items-start gap-2.5 p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl text-xs">
                  <span className="font-mono text-[10px] text-slate-500 mt-0.5">{alert.time}</span>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white flex items-center gap-1">
                      <Icon size={13} className={alert.color} />
                      {alert.match}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{alert.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* UPCOMING FIGHTS FULL BOOKMAKER MATRIX TABLE (Screenshot 6) */}
      <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C232E] pb-3">
          <h2 className="font-heading text-2xl font-black text-white uppercase tracking-wide">
            Upcoming Fights & Bookmaker Comparison
          </h2>
          <span className="text-xs font-mono text-slate-400">12 Certified Bookmakers Tracked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#1C232E] text-slate-400 font-sans uppercase text-[10px]">
                <th className="text-left pb-3 font-bold">Date</th>
                <th className="text-left pb-3 font-bold">Fight</th>
                <th className="text-left pb-3 font-bold">Weight Class</th>
                <th className="text-center pb-3 font-bold text-emerald-400">Bet365</th>
                <th className="text-center pb-3 font-bold text-amber-400">William Hill</th>
                <th className="text-center pb-3 font-bold text-emerald-500">Paddy Power</th>
                <th className="text-center pb-3 font-bold text-green-400">Unibet</th>
                <th className="text-center pb-3 font-bold text-sky-400">Sky Bet</th>
                <th className="text-center pb-3 font-bold text-red-400">Betfred</th>
                <th className="text-center pb-3 font-bold text-blue-400">BoyleSports</th>
                <th className="text-center pb-3 font-bold text-white">Best Home</th>
                <th className="text-center pb-3 font-bold text-white">Best Away</th>
                <th className="text-right pb-3 font-bold">Movement</th>
              </tr>
            </thead>
            <tbody>
              {upcomingOddsRows.map((row) => (
                <tr 
                  key={row.id}
                  onClick={() => onOpenFight(row.id)}
                  className="border-b border-[#171E28] hover:bg-[#151A22] cursor-pointer transition-colors"
                >
                  <td className="py-3 text-slate-400">{row.date}</td>
                  <td className="py-3 font-bold text-white font-sans">{row.fight}</td>
                  <td className="py-3 text-slate-400">{row.weightClass}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.b365)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.wh)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.pp)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.uni)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.sky)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.bf)}</td>
                  <td className="py-3 text-center text-slate-200">{formatOdds(row.bs)}</td>
                  <td className="py-3 text-center font-bold text-emerald-400 bg-emerald-950/40">
                    {formatOdds(row.bestHome)}
                  </td>
                  <td className="py-3 text-center font-bold text-blue-400 bg-blue-950/40">
                    {formatOdds(row.bestAway)}
                  </td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      row.direction === 'up' ? 'text-emerald-400 bg-emerald-950/70' : 'text-red-400 bg-red-950/70'
                    }`}>
                      {row.movement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM SECTION: Odds Movement Timeline + Implied Probability Gauges (Screenshot 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Odds Movement Chart (2 cols) */}
        <div className="lg:col-span-2 bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1C232E] pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-red-500" />
              <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
                Historical Odds Movement
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedFightForMovement}
                onChange={(e) => setSelectedFightForMovement(e.target.value)}
                className="bg-[#151A22] border border-[#232B38] text-xs font-mono text-white rounded px-2.5 py-1 focus:outline-none"
              >
                <option value="garcia-vs-haney">Garcia vs Haney</option>
                <option value="catterall-vs-prograis">Catterall vs Prograis</option>
                <option value="joshua-vs-wilder">Joshua vs Wilder</option>
              </select>
            </div>
          </div>

          {/* SVG Movement Curves */}
          <div className="h-44 w-full relative">
            <svg viewBox="0 0 600 150" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="600" y2="30" stroke="#1A222E" strokeDasharray="3 3" />
              <line x1="0" y1="75" x2="600" y2="75" stroke="#1A222E" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="600" y2="120" stroke="#1A222E" strokeDasharray="3 3" />

              {/* Haney line (blue) */}
              <path
                d="M 50,110 Q 150,105 250,95 T 400,85 T 550,75"
                fill="none"
                stroke="#00B4D8"
                strokeWidth="3"
              />
              {/* Garcia line (red) */}
              <path
                d="M 50,45 Q 150,55 250,65 T 400,75 T 550,85"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
              />

              {/* Data points */}
              <circle cx="50" cy="110" r="4" fill="#00B4D8" />
              <circle cx="250" cy="95" r="4" fill="#00B4D8" />
              <circle cx="550" cy="75" r="4" fill="#00B4D8" />

              <circle cx="50" cy="45" r="4" fill="#EF4444" />
              <circle cx="250" cy="65" r="4" fill="#EF4444" />
              <circle cx="550" cy="85" r="4" fill="#EF4444" />
            </svg>

            {/* Timeline X-Labels */}
            <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-[#1C232E]">
              <span>10 Apr</span>
              <span>12 Apr</span>
              <span>14 Apr</span>
              <span>16 Apr</span>
              <span>18 Apr</span>
              <span>20 Apr</span>
            </div>
          </div>
        </div>

        {/* Implied Probability Circular Gauges (Screenshot 6) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
              Implied Probability
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Calculated from Market Consensus</span>
          </div>

          <div className="grid grid-cols-2 gap-4 py-2">
            
            {/* Ryan Garcia (32%) */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-red-500 transition-all duration-1000"
                    strokeDasharray="32, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono font-black text-xl text-white">32%</span>
              </div>
              <div>
                <div className="font-bold text-xs text-white">Ryan Garcia</div>
                <div className="text-[10px] text-slate-400 font-mono">Implied Probability</div>
              </div>
            </div>

            {/* Devin Haney (58%) */}
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-500 transition-all duration-1000"
                    strokeDasharray="58, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute font-mono font-black text-xl text-white">58%</span>
              </div>
              <div>
                <div className="font-bold text-xs text-white">Devin Haney</div>
                <div className="text-[10px] text-slate-400 font-mono">Implied Probability</div>
              </div>
            </div>

          </div>

          {/* Bookmaker Margin Bar */}
          <div className="pt-2 border-t border-[#1C232E] space-y-1.5 font-mono text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Bookmaker Combined Margin:</span>
              <span className="text-amber-400 font-bold">10%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-400" style={{ width: '10%' }} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
