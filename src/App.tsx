/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LiveFightProvider } from './context/LiveFightContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LiveFightView } from './components/live/LiveFightView';
import { OddsCentreView } from './components/odds/OddsCentreView';
import { IntelligenceCentreView } from './components/intelligence/IntelligenceCentreView';
import { ResultsView } from './components/results/ResultsView';
import { FighterProfileView } from './components/fighters/FighterProfileView';
import { PreFightView } from './components/fights/PreFightView';
import { EventDetailView } from './components/events/EventDetailView';
import { AlertsCentreView } from './components/alerts/AlertsCentreView';
import { GlobalSearchView } from './components/search/GlobalSearchView';
import { MobileLiveView } from './components/mobile/MobileLiveView';
import { AdminPortalModal } from './components/admin/AdminPortalModal';
import { ProModal } from './components/common/ProModal';
import { LandingPageView } from './components/landing/LandingPageView';

export default function App() {
  const getInitialTab = (): string => {
    if (typeof window === 'undefined') return 'landing';
    const path = window.location.pathname.replace(/^\/+/, '');
    if (!path || path === '') return 'landing';
    if (path === 'app' || path === 'dashboard') return 'dashboard';
    if (['live', 'upcoming', 'results', 'fighters', 'events', 'odds', 'intelligence', 'alerts', 'search'].includes(path)) {
      return path;
    }
    return 'landing';
  };

  const [currentTab, setCurrentTab] = useState<string>(getInitialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFighterId, setActiveFighterId] = useState<string>('anthony-joshua');
  const [activeEventId, setActiveEventId] = useState<string>('catterall-prograis-manchester');
  const [mobileViewMode, setMobileViewMode] = useState<boolean>(false);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const tab = getInitialTab();
      setCurrentTab(tab);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenFight = (fightId: string) => {
    if (fightId.includes('catterall') || fightId.includes('prograis')) {
      setActiveEventId('catterall-prograis-manchester');
      handleNavigateTab('events');
    } else if (fightId.includes('garcia') || fightId.includes('haney')) {
      handleNavigateTab('upcoming');
    } else if (fightId.includes('joshua') || fightId.includes('wilder')) {
      setActiveFighterId('anthony-joshua');
      handleNavigateTab('fighters');
    } else {
      handleNavigateTab('live');
    }
  };

  const handleOpenFighter = (fighterId: string) => {
    setActiveFighterId(fighterId);
    handleNavigateTab('fighters');
  };

  const handleOpenEvent = (eventId: string) => {
    setActiveEventId(eventId);
    handleNavigateTab('events');
  };

  const handleNavigateTab = (tab: string, contextId?: string) => {
    if (contextId) {
      if (tab === 'fighters') setActiveFighterId(contextId);
      if (tab === 'events') setActiveEventId(contextId);
    }
    setCurrentTab(tab);

    if (typeof window !== 'undefined') {
      const targetPath = tab === 'landing' ? '/' : tab === 'dashboard' ? '/app' : `/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab, contextId }, '', targetPath);
      }
    }
  };

  return (
    <LiveFightProvider>
      <div className="min-h-screen bg-[#0A0C0F] text-slate-100 flex flex-col selection:bg-red-600 selection:text-white">
        
        {/* PUBLIC LANDING PAGE (Route: /) */}
        {currentTab === 'landing' ? (
          <LandingPageView
            onEnterApp={(targetTab = 'dashboard', contextId) => handleNavigateTab(targetTab, contextId)}
          />
        ) : mobileViewMode ? (
          <div className="min-h-screen bg-[#06080B] py-4 px-2 flex flex-col items-center justify-center">
            <div className="w-full max-w-md">
              <div className="flex items-center justify-between mb-3 px-2 text-xs">
                <span className="text-slate-400 font-mono">Mobile View Simulation (Screenshot 1)</span>
                <button
                  onClick={() => setMobileViewMode(false)}
                  className="px-3 py-1 bg-[#151A22] border border-[#232B38] text-white rounded-lg font-bold"
                >
                  Return to Desktop
                </button>
              </div>
              <MobileLiveView onBackToDesktop={() => setMobileViewMode(false)} />
            </div>
          </div>
        ) : (
          <>
            {/* Top Navigation Bar */}
            <Header
              currentTab={currentTab}
              setCurrentTab={handleNavigateTab}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              mobileViewMode={mobileViewMode}
              setMobileViewMode={setMobileViewMode}
              onOpenProModal={() => setIsProModalOpen(true)}
              onOpenAdminModal={() => setIsAdminModalOpen(true)}
              onNavigateToLanding={() => handleNavigateTab('landing')}
            />

            {/* Main Layout Container: Desktop Sidebar + View Area */}
            <div className="flex-1 flex max-w-[1920px] w-full mx-auto">
              
              <Sidebar
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                onOpenProModal={() => setIsProModalOpen(true)}
                onOpenAdminModal={() => setIsAdminModalOpen(true)}
              />

              {/* Dynamic Screen View Router */}
              <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full min-w-0">
                {currentTab === 'dashboard' && (
                  <DashboardView
                    onNavigateTab={handleNavigateTab}
                    onOpenFight={handleOpenFight}
                    onOpenFighter={handleOpenFighter}
                    onOpenEvent={handleOpenEvent}
                  />
                )}

                {currentTab === 'live' && (
                  <LiveFightView
                    onOpenFighter={handleOpenFighter}
                    onOpenEvent={handleOpenEvent}
                    onNavigateTab={handleNavigateTab}
                  />
                )}

                {currentTab === 'upcoming' && (
                  <PreFightView
                    onOpenFighter={handleOpenFighter}
                    onNavigateTab={handleNavigateTab}
                  />
                )}

                {currentTab === 'results' && (
                  <ResultsView
                    onOpenFighter={handleOpenFighter}
                  />
                )}

                {currentTab === 'fighters' && (
                  <FighterProfileView
                    fighterId={activeFighterId}
                    onOpenFight={handleOpenFight}
                    onOpenCompare={(id) => {
                      setActiveFighterId(id);
                      setCurrentTab('fighters');
                    }}
                    onNavigateTab={handleNavigateTab}
                  />
                )}

                {currentTab === 'events' && (
                  <EventDetailView
                    eventId={activeEventId}
                    onOpenFight={handleOpenFight}
                    onOpenFighter={handleOpenFighter}
                    onNavigateTab={handleNavigateTab}
                  />
                )}

                {currentTab === 'odds' && (
                  <OddsCentreView
                    onOpenFight={handleOpenFight}
                  />
                )}

                {currentTab === 'intelligence' && (
                  <IntelligenceCentreView />
                )}

                {currentTab === 'alerts' && (
                  <AlertsCentreView />
                )}

                {currentTab === 'search' && (
                  <GlobalSearchView
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onOpenFighter={handleOpenFighter}
                    onOpenFight={handleOpenFight}
                    onOpenEvent={handleOpenEvent}
                  />
                )}
              </main>

            </div>
          </>
        )}

        {/* Global Modals */}
        <ProModal
          isOpen={isProModalOpen}
          onClose={() => setIsProModalOpen(false)}
        />

        <AdminPortalModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />

      </div>
    </LiveFightProvider>
  );
}
