import React from 'react';
import {
  LayoutDashboard,
  Radio,
  Calendar,
  CheckSquare,
  Users,
  CalendarDays,
  Percent,
  Sparkles,
  Bell,
  Search,
  Star,
  Settings,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowLeft
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenProModal: () => void;
  onOpenAdminModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenProModal,
  onOpenAdminModal
}) => {
  const { unreadAlertCount } = useLiveFight();

  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live', label: 'Live', icon: Radio, hasLiveDot: true },
    { id: 'upcoming', label: 'Upcoming', icon: Calendar },
    { id: 'results', label: 'Results', icon: CheckSquare },
    { id: 'fighters', label: 'Fighters', icon: Users },
    { id: 'events', label: 'Events', icon: CalendarDays },
    { id: 'odds', label: 'Odds Centre', icon: Percent },
    { id: 'intelligence', label: 'Intelligence', icon: Sparkles },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertCount },
    { id: 'search', label: 'Search', icon: Search }
  ];

  const secondaryNav = [
    { id: 'landing', label: 'Public Website', icon: ArrowLeft },
    { id: 'followed', label: 'Followed Fighters', icon: Star },
    { id: 'alerts', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'admin', label: 'Provider Telemetry', icon: ShieldCheck, isAction: true }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#0A0C0F] border-r border-[#1C232E] shrink-0 min-h-[calc(100vh-61px)] p-4 justify-between">
      <div className="space-y-6">
        
        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-red-600/10 text-red-500 border border-red-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#12161D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Icon size={18} className={isActive ? 'text-red-500' : 'text-slate-400'} />
                    {item.hasLiveDot && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    )}
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-red-600 text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* My Fight Pulse Section */}
        <div>
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            My Fight Pulse
          </div>
          <div className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = !item.isAction && currentTab === item.id;
              return (
                <button
                  key={item.id + item.label}
                  onClick={() => {
                    if (item.isAction) {
                      onOpenAdminModal();
                    } else if (item.id === 'followed') {
                      setCurrentTab('fighters');
                    } else {
                      setCurrentTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#161B23] text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#12161D]'
                  }`}
                >
                  <Icon size={17} className="text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Pro Membership Banner */}
      <div className="relative overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-b from-[#191316] to-[#12161D] p-4 text-center mt-6">
        {/* Boxer Silhouette Background overlay */}
        <div 
          className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=400&auto=format&fit=crop&q=80')`
          }}
        />

        <div className="relative z-10 space-y-2">
          <div className="font-heading text-lg font-black tracking-wide text-white leading-tight uppercase">
            Real Fights.<br />
            Real Data.<br />
            <span className="text-red-500">Real-Time Intelligence.</span>
          </div>

          <button
            onClick={onOpenProModal}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-lg shadow-md glow-red transition-all cursor-pointer tracking-wider uppercase"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </aside>
  );
};
