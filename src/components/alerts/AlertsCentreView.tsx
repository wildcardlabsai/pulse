import React, { useState } from 'react';
import { 
  Bell, 
  Activity, 
  TrendingDown, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Settings, 
  Plus, 
  Check, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

export const AlertsCentreView: React.FC = () => {
  const { 
    alerts, 
    toggleAlertActive, 
    markAlertRead, 
    createAlert 
  } = useLiveFight();

  const [activeCategory, setActiveCategory] = useState<'Fight' | 'Odds' | 'Fighter' | 'Signal' | 'News'>('Fight');
  const [selectedFighters, setSelectedFighters] = useState<string[]>(['Ryan Garcia', 'Devin Haney']);
  const [alertTypeOptions, setAlertTypeOptions] = useState({
    upcoming: true,
    reminders: true,
    liveUpdates: true,
    results: false
  });
  const [notificationMethods, setNotificationMethods] = useState({
    inApp: true,
    email: true,
    push: true
  });
  const [createdSuccess, setCreatedSuccess] = useState(false);

  const handleCreateNewAlert = (e: React.FormEvent) => {
    e.preventDefault();
    createAlert({
      title: `${activeCategory} Alert Configured`,
      description: `Ringside telemetry active for ${selectedFighters.join(' & ')} across specified channels.`,
      category: activeCategory
    });
    setCreatedSuccess(true);
    setTimeout(() => setCreatedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* Title Header with Value Pillars (Screenshot 3) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#1C232E] pb-5">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-wide uppercase">
            Alerts Centre
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Stay ahead. Never miss what matters. Get real-time alerts for fights, odds, news, and key Fight Pulse signals.
          </p>
        </div>

        {/* 3 Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <Bell size={16} className="text-red-500" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">Real-Time Alerts</div>
              <div className="text-[10px] text-slate-400">Be first to know</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <Sliders size={16} className="text-blue-400" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">Personalised To You</div>
              <div className="text-[10px] text-slate-400">Follow fighters & events</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#12161D] border border-[#1E2634] rounded-xl text-xs">
            <Sparkles size={16} className="text-amber-400" />
            <div>
              <div className="font-bold text-white uppercase text-[10px]">More Than Odds</div>
              <div className="text-[10px] text-slate-400">Momentum & key moments</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Metric Summary Cards (Screenshot 3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 font-mono">
        <div className="bg-[#11141A] border border-[#1F2734] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-600/10 text-red-500 flex items-center justify-center font-bold">
            <Bell size={16} />
          </div>
          <div>
            <div className="text-lg font-black text-white">12</div>
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Active Alerts</div>
          </div>
        </div>

        <div className="bg-[#11141A] border border-[#1F2734] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
            <Calendar size={16} />
          </div>
          <div>
            <div className="text-lg font-black text-white">4</div>
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Upcoming Fights</div>
          </div>
        </div>

        <div className="bg-[#11141A] border border-[#1F2734] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-400 flex items-center justify-center font-bold">
            <TrendingUp size={16} />
          </div>
          <div>
            <div className="text-lg font-black text-white">3</div>
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Odds Movement</div>
          </div>
        </div>

        <div className="bg-[#11141A] border border-[#1F2734] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-400 flex items-center justify-center font-bold">
            <FileText size={16} />
          </div>
          <div>
            <div className="text-lg font-black text-white">2</div>
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">News Alerts</div>
          </div>
        </div>

        <div className="bg-[#11141A] border border-[#1F2734] p-3 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-600/10 text-amber-400 flex items-center justify-center font-bold">
            <Activity size={16} />
          </div>
          <div>
            <div className="text-lg font-black text-white">3</div>
            <div className="text-[10px] text-slate-400 font-sans uppercase font-bold">Pulse Signals</div>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 border-b border-[#1C232E] pb-3 text-xs">
        {['Overview', 'My Alerts', 'Create Alert', 'Alert History', 'Notification Settings'].map((tab, idx) => (
          <button
            key={tab}
            className={`px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors ${
              idx === 0 
                ? 'bg-red-600 text-white shadow-sm glow-red' 
                : 'bg-[#11141A] text-slate-400 hover:text-white border border-[#1E2532]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TOP SECTION: Create a New Alert Form (Screenshot 3) */}
      <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
          <div className="flex items-center gap-2">
            <Plus size={18} className="text-red-500" />
            <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wide">
              Create a New Alert
            </h3>
          </div>
          <button className="text-xs font-mono text-slate-400 hover:text-white">
            ⚡ Quick Presets
          </button>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 text-xs">
          {(['Fight', 'Odds', 'Fighter', 'Signal', 'News'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md glow-red'
                  : 'bg-[#151A22] text-slate-400 hover:text-white border border-[#232B38]'
              }`}
            >
              {cat} Alerts
            </button>
          ))}
        </div>

        <form onSubmit={handleCreateNewAlert} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* 1. Alert Triggers */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Choose what to be alerted about:
            </span>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertTypeOptions.upcoming}
                  onChange={(e) => setAlertTypeOptions({ ...alertTypeOptions, upcoming: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Upcoming fights</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertTypeOptions.reminders}
                  onChange={(e) => setAlertTypeOptions({ ...alertTypeOptions, reminders: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Fight start reminders</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertTypeOptions.liveUpdates}
                  onChange={(e) => setAlertTypeOptions({ ...alertTypeOptions, liveUpdates: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Live fight updates</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={alertTypeOptions.results}
                  onChange={(e) => setAlertTypeOptions({ ...alertTypeOptions, results: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Fight results & scorecards</span>
              </label>
            </div>
          </div>

          {/* 2. Select Fighters */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Select Fighters (Optional):
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {selectedFighters.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A212B] border border-red-500/40 text-white rounded-lg text-xs">
                    <span>{f}</span>
                    <button
                      type="button"
                      onClick={() => setSelectedFighters(selectedFighters.filter(x => x !== f))}
                      className="text-slate-400 hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Search to add fighter..."
                className="w-full bg-[#151A22] border border-[#232B38] text-xs text-white p-2 rounded-lg placeholder-slate-500"
              />
            </div>
          </div>

          {/* 3. Notification Method & Submit */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Notification Method:
            </span>
            <div className="space-y-2 text-xs text-slate-300 font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationMethods.inApp}
                  onChange={(e) => setNotificationMethods({ ...notificationMethods, inApp: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>In-app notification</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationMethods.email}
                  onChange={(e) => setNotificationMethods({ ...notificationMethods, email: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Email</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationMethods.push}
                  onChange={(e) => setNotificationMethods({ ...notificationMethods, push: e.target.checked })}
                  className="rounded border-slate-700 text-red-600 focus:ring-0"
                />
                <span>Push notification</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md glow-red transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Bell size={14} />
              <span>{createdSuccess ? 'Alert Saved!' : 'Create Alert'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* LOWER GRID: My Active Alerts + Upcoming Alerts + Recent Alerts + Alert Settings (Screenshot 3) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* 1. MY ACTIVE ALERTS */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              My Active Alerts
            </h3>
            <span className="text-xs text-slate-400">View All</span>
          </div>

          <div className="space-y-3">
            {[
              { id: '1', title: 'Ryan Garcia', subtitle: 'Fight start reminder · 20 Apr 22:00', active: true },
              { id: '2', title: 'Devin Haney', subtitle: 'Odds movement (±10%)', active: true },
              { id: '3', title: 'Shakur Stevenson', subtitle: 'News alerts & telemetry', active: true },
              { id: '4', title: 'Super Lightweight', subtitle: 'All upcoming fights', active: true },
              { id: '5', title: 'Matchroom Boxing', subtitle: 'All fight announcements', active: false }
            ].map((item) => (
              <div key={item.id} className="p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white truncate">{item.title}</div>
                  <div className="text-[10px] text-slate-400 truncate">{item.subtitle}</div>
                </div>

                {/* Toggle switch */}
                <button
                  type="button"
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    item.active ? 'bg-red-600 justify-end' : 'bg-slate-700 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. UPCOMING ALERTS (Schedule) */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Upcoming Alerts
            </h3>
            <span className="text-xs text-slate-400">Schedule</span>
          </div>

          <div className="space-y-3">
            {[
              { date: '20 APR', match: 'Ryan Garcia vs Devin Haney', detail: 'Fight start reminder · 22:00' },
              { date: '21 APR', match: 'Catterall vs Prograis', detail: 'Odds movement alert (15%)' },
              { date: '27 APR', match: 'Dubois vs Hrgović', detail: 'Fight start reminder · 21:00' },
              { date: '04 MAY', match: 'Taylor vs Cameron', detail: 'News & weigh-in alert' },
              { date: '18 MAY', match: 'Joshua vs Ngannou', detail: 'Fight reminder 24h prior' }
            ].map((sched, idx) => (
              <div key={sched.match + idx} className="p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl flex items-center gap-3 text-xs">
                <div className="bg-red-950/80 text-red-400 border border-red-800 font-mono font-bold text-[10px] text-center px-2 py-1 rounded shrink-0">
                  {sched.date}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white truncate">{sched.match}</div>
                  <div className="text-[10px] text-slate-400 truncate">{sched.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. RECENT ALERTS FEED */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Recent Alerts
            </h3>
            <span className="text-xs text-slate-400">Live Feed</span>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 5).map((a) => (
              <div key={a.id} className="p-2.5 bg-[#151A22] border border-[#232B38] rounded-xl flex items-start gap-2.5 text-xs">
                <span className="font-mono text-[10px] text-slate-500 shrink-0 mt-0.5">{a.timeAgo}</span>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white truncate">{a.title}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2">{a.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ALERT SETTINGS */}
        <div className="bg-[#11141A] border border-[#1F2734] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1C232E] pb-3">
            <h3 className="font-heading text-lg font-bold text-white uppercase">
              Alert Settings
            </h3>
            <Settings size={15} className="text-slate-400" />
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="space-y-1">
              <span className="text-slate-400 font-sans uppercase font-bold text-[10px] block">Fight Start Reminder</span>
              <select className="w-full bg-[#151A22] border border-[#232B38] text-white p-1.5 rounded-lg text-xs">
                <option>24 hours before</option>
                <option>1 hour before</option>
                <option>15 mins before</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-sans uppercase font-bold text-[10px] block">Odds Movement Threshold</span>
              <select className="w-full bg-[#151A22] border border-[#232B38] text-white p-1.5 rounded-lg text-xs">
                <option>±10% movement</option>
                <option>±5% movement</option>
                <option>±15% movement</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-slate-400 font-sans uppercase font-bold text-[10px] block">Quiet Hours</span>
              <div className="p-2 bg-[#151A22] border border-[#232B38] rounded-lg text-slate-300">
                22:00 — 08:00 BST
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
