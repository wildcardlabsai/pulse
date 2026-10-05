import React, { useState } from 'react';
import { 
  Bell, 
  Search as SearchIcon, 
  Menu, 
  X, 
  Radio, 
  Smartphone, 
  Monitor, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { useLiveFight } from '../../context/LiveFightContext';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  mobileViewMode: boolean;
  setMobileViewMode: (val: boolean) => void;
  onOpenProModal: () => void;
  onOpenAdminModal: () => void;
  onNavigateToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  mobileViewMode,
  setMobileViewMode,
  onOpenProModal,
  onOpenAdminModal,
  onNavigateToLanding
}) => {
  const { 
    unreadAlertCount, 
    isProviderDelayed, 
    isProviderUnavailable, 
    secondsSinceLastUpdate,
    isFixtureMode,
    environmentMode
  } = useLiveFight();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertsDropdownOpen, setAlertsDropdownOpen] = useState(false);

  const topNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'live', label: 'Live' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'results', label: 'Results' },
    { id: 'fighters', label: 'Fighters' },
    { id: 'events', label: 'Events' },
    { id: 'odds', label: 'Odds' },
    { id: 'intelligence', label: 'Intelligence' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1015]/95 backdrop-blur-md border-b border-[#1C232E] px-4 lg:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4 max-w-[1920px] mx-auto">
        
        {/* Brand Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-400 hover:text-white lg:hidden rounded-lg hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 group text-left"
          >
            {/* Red Pulse Icon */}
            <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm group-hover:scale-105 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 animate-pulse">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-black tracking-wider text-white leading-none flex items-center gap-1.5">
                FIGHT <span className="text-red-500">PULSE</span>
              </span>
            </div>
          </button>
        </div>

        {/* Top Horizontal Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1">
          {topNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative px-3.5 py-1.5 text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-white' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-500 rounded-full animate-in fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          
          {/* Telemetry & Environment Mode Indicator (Section 5) */}
          <button
            onClick={onOpenAdminModal}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer"
            title="Click to view Provider Health, Ingestion & Telemetry"
          >
            {isProviderUnavailable ? (
              <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                <AlertTriangle size={13} className="text-amber-400 animate-pulse" />
                <span>DATA UNAVAILABLE</span>
              </span>
            ) : isProviderDelayed ? (
              <span className="flex items-center gap-1.5 text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                <Clock size={13} />
                <span>DELAYED ({secondsSinceLastUpdate}s)</span>
              </span>
            ) : isFixtureMode ? (
              <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 px-2 py-0.5 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>FIXTURE MODE (DEV)</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE FEED</span>
              </span>
            )}
          </button>

          {/* Global Search Bar */}
          <div className="relative w-44 md:w-64 lg:w-72">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search fighters, events..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0 && currentTab !== 'search') {
                  setCurrentTab('search');
                }
              }}
              onFocus={() => {
                if (currentTab !== 'search' && searchQuery.trim().length > 0) {
                  setCurrentTab('search');
                }
              }}
              className="w-full bg-[#141820] border border-[#232B38] text-xs md:text-sm text-slate-200 placeholder-slate-500 pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
            />
          </div>

          {/* Mobile View Toggle Button (Inspect Dedicated Mobile Experience from Screenshot 1) */}
          <button
            onClick={() => setMobileViewMode(!mobileViewMode)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              mobileViewMode
                ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-sm'
                : 'bg-[#141820] text-slate-400 border-[#232B38] hover:text-white'
            }`}
            title="Toggle between Desktop and Mobile Live Command Centre"
          >
            {mobileViewMode ? <Smartphone size={15} /> : <Monitor size={15} />}
            <span className="hidden lg:inline">{mobileViewMode ? 'Mobile View' : 'Desktop View'}</span>
          </button>

          {/* Public Landing Page Link */}
          {onNavigateToLanding && (
            <button
              onClick={onNavigateToLanding}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium bg-[#141820] text-slate-400 border-[#232B38] hover:text-white transition-colors"
              title="Return to Public Landing Page"
            >
              <span>Public Site</span>
            </button>
          )}

          {/* Admin Health Modal Trigger */}
          <button
            onClick={onOpenAdminModal}
            className="p-2 text-slate-400 hover:text-white bg-[#141820] border border-[#232B38] rounded-lg transition-colors"
            title="Admin & Data Provider Health"
          >
            <ShieldAlert size={16} />
          </button>

          {/* Notification Alerts Icon with Badge */}
          <div className="relative">
            <button
              onClick={() => setCurrentTab('alerts')}
              className="relative p-2 text-slate-400 hover:text-white bg-[#141820] border border-[#232B38] rounded-lg transition-colors"
              title="Alerts Centre"
            >
              <Bell size={16} />
              {unreadAlertCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0D1015]">
                  {unreadAlertCount}
                </span>
              )}
            </button>
          </div>

          {/* Pro Upgrade Button */}
          <button
            onClick={onOpenProModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold rounded-lg shadow-sm glow-red transition-all cursor-pointer"
          >
            <span>PRO</span>
          </button>

          {/* User Profile Avatar (Matt Taylor - "MT") */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center text-xs font-bold text-white shadow-inner">
            MT
          </div>
        </div>

      </div>

      {/* Mobile Drawer Navigation (When hamburger open) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#1C232E] grid grid-cols-2 gap-1.5 animate-in slide-in-from-top duration-200">
          {topNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`px-3 py-2 text-left text-sm rounded-lg font-medium transition-colors ${
                currentTab === item.id 
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                  : 'text-slate-300 hover:bg-[#141820]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              setCurrentTab('alerts');
              setMobileMenuOpen(false);
            }}
            className="px-3 py-2 text-left text-sm rounded-lg font-medium text-slate-300 hover:bg-[#141820]"
          >
            Alerts ({unreadAlertCount})
          </button>
          <button
            onClick={() => {
              setMobileViewMode(!mobileViewMode);
              setMobileMenuOpen(false);
            }}
            className="px-3 py-2 text-left text-sm rounded-lg font-medium text-slate-300 hover:bg-[#141820]"
          >
            {mobileViewMode ? 'Switch to Desktop UI' : 'Switch to Mobile UI'}
          </button>
          {onNavigateToLanding && (
            <button
              onClick={() => {
                onNavigateToLanding();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 text-left text-sm rounded-lg font-bold text-red-400 bg-red-950/40 border border-red-800/50"
            >
              Public Landing Page
            </button>
          )}
        </div>
      )}
    </header>
  );
};
