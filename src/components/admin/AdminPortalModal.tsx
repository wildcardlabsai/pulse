import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Database, 
  Server, 
  Sliders, 
  Wifi, 
  WifiOff,
  Key,
  Check,
  AlertCircle
} from 'lucide-react';
import { PROVIDER_HEALTH_STATUS } from '../../data/verifiedBoxingData';
import { useLiveFight } from '../../context/LiveFightContext';
import { providerManager } from '../../lib/providers/boxingDataProvider';
import { ingestionEngine } from '../../lib/ingestion/IngestionEngine';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const { 
    isLiveUpdating, 
    toggleLiveUpdates, 
    isProviderUnavailable, 
    simulateProviderDrop, 
    secondsSinceLastUpdate,
    environmentMode,
    setEnvironmentMode,
    isFixtureMode,
    qualityIssues,
    runQualityAudit,
    runSyncTrigger
  } = useLiveFight();

  const [activeTab, setActiveTab] = useState<'health' | 'sync' | 'resolution' | 'audit' | 'quality'>('health');
  const [syncing, setSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState(ingestionEngine.getSyncLogs());

  if (!isOpen) return null;

  const providerReport = providerManager.getProviderStatusReport();

  const handleTriggerSync = async () => {
    setSyncing(true);
    await runSyncTrigger();
    setSyncLogs(ingestionEngine.getSyncLogs());
    setTimeout(() => {
      setSyncing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0E1217] border border-[#232B38] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C232E] bg-[#12161E]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="font-heading text-xl font-black text-white uppercase tracking-wider">
                Fight Pulse Admin & Telemetry Centre
              </h2>
              <p className="text-xs text-slate-400">
                Data Provider Health · Ingestion Pipelines · Entity Resolution (Section 12)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 border-b border-[#1C232E] bg-[#0A0D12] text-xs overflow-x-auto">
          {[
            { id: 'health', label: 'Provider Health & Feeds' },
            { id: 'sync', label: 'Data Ingestion & Freshness' },
            { id: 'quality', label: `Data Quality & Integrity (${qualityIssues.length})` },
            { id: 'resolution', label: 'Entity Resolution' },
            { id: 'audit', label: 'Audit & Telemetry Logs' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase transition-colors whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* TAB 1: PROVIDER HEALTH & ENVIRONMENT MODE */}
          {activeTab === 'health' && (
            <div className="space-y-5">
              
              {/* Environment Mode Switcher (Section 5) */}
              <div className="p-4 bg-[#141A23] border border-[#232B38] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-bold text-white uppercase text-xs flex items-center gap-2">
                      <Database size={15} className="text-red-500" />
                      Active System Environment (Section 5)
                    </span>
                    <p className="text-[11px] text-slate-400">
                      Explicit isolation between development fixtures and verified live provider ingestion pipelines.
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs border ${
                    isFixtureMode 
                      ? 'bg-cyan-950/80 text-cyan-400 border-cyan-800' 
                      : 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                  }`}>
                    {environmentMode}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => setEnvironmentMode('DEVELOPMENT_FIXTURE')}
                    className={`py-2 px-3 rounded-lg border font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      isFixtureMode 
                        ? 'bg-cyan-600 text-white border-cyan-500 shadow-md' 
                        : 'bg-[#18202C] text-slate-400 border-[#232B38] hover:text-white'
                    }`}
                  >
                    <Check size={14} className={isFixtureMode ? 'opacity-100' : 'opacity-0'} />
                    <span>DEVELOPMENT_FIXTURE</span>
                  </button>

                  <button
                    onClick={() => setEnvironmentMode('LIVE_PROVIDER')}
                    className={`py-2 px-3 rounded-lg border font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      !isFixtureMode 
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                        : 'bg-[#18202C] text-slate-400 border-[#232B38] hover:text-white'
                    }`}
                  >
                    <Check size={14} className={!isFixtureMode ? 'opacity-100' : 'opacity-0'} />
                    <span>LIVE_PROVIDER (External Feeds)</span>
                  </button>
                </div>

                {/* Adapter Configuration Checklist */}
                <div className="p-3 bg-[#0A0D12] rounded-lg border border-[#1C232E] space-y-2 mt-2">
                  <div className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                    External Provider Credential Matrix (Section 9 & 10)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="flex items-center justify-between p-2 bg-[#12161E] rounded border border-slate-800">
                      <div>
                        <div className="text-white font-bold">Sportradar Boxing API</div>
                        <div className="text-[10px] text-slate-400">VITE_SPORTRADAR_API_KEY</div>
                      </div>
                      <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        AWAITING KEY
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 bg-[#12161E] rounded border border-slate-800">
                      <div>
                        <div className="text-white font-bold">The Odds API</div>
                        <div className="text-[10px] text-slate-400">THE_ODDS_API_KEY (server) + VITE_ENABLE_LIVE_DATA</div>
                      </div>
                      <span className="text-[10px] text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                        AWAITING KEY
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 italic">
                    Note: In accordance with core directives, the application operates in explicit fixture mode until valid external API keys are configured.
                  </p>
                </div>
              </div>
              
              {/* Telemetry Simulator Control Panel */}
              <div className="p-4 bg-[#141A23] border border-[#232B38] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white uppercase text-xs flex items-center gap-2">
                    <Sliders size={15} className="text-red-500" />
                    Live Data Provider Simulation Controls
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    Last updated {secondsSinceLastUpdate}s ago
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={toggleLiveUpdates}
                    className={`py-2 px-3 rounded-lg border font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      isLiveUpdating 
                        ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' 
                        : 'bg-amber-950/80 text-amber-400 border-amber-800'
                    }`}
                  >
                    <Activity size={14} />
                    <span>{isLiveUpdating ? 'Telemetry Active (Streaming)' : 'Telemetry Paused (Simulates Delay)'}</span>
                  </button>

                  <button
                    onClick={simulateProviderDrop}
                    className={`py-2 px-3 rounded-lg border font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      isProviderUnavailable 
                        ? 'bg-red-950/80 text-red-400 border-red-800' 
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    {isProviderUnavailable ? <WifiOff size={14} /> : <Wifi size={14} />}
                    <span>{isProviderUnavailable ? 'Provider Offline (Triggered)' : 'Simulate Provider Drop'}</span>
                  </button>
                </div>
              </div>

              {/* Provider List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-base font-bold text-white uppercase">
                    Connected Real-Time Data Providers
                  </h4>
                  <button
                    onClick={handleTriggerSync}
                    disabled={syncing}
                    className="flex items-center gap-1.5 px-3 py-1 bg-[#1A222E] hover:bg-[#242F40] text-slate-300 rounded-lg text-xs font-mono font-bold"
                  >
                    <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                    <span>{syncing ? 'Syncing...' : 'Sync Providers'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROVIDER_HEALTH_STATUS.map((prov) => (
                    <div key={prov.provider} className="p-3.5 bg-[#141A23] border border-[#232B38] rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">{prov.provider}</span>
                        <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                          isProviderUnavailable 
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          {isProviderUnavailable ? 'UNAVAILABLE' : prov.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-[#1C232E]">
                        <div>Latency: <span className="text-white font-bold">{prov.latencyMs}ms</span></div>
                        <div>Freshness: <span className="text-white font-bold">{prov.lastUpdated}</span></div>
                        <div>Records: <span className="text-white font-bold">{prov.recordsSynced}</span></div>
                        <div>Feed: <span className="text-blue-400 font-bold">{prov.service}</span></div>
                      </div>

                      <div className="text-[10px] text-slate-500 font-mono">
                        Coverage: {prov.coverage}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: INGESTION */}
          {activeTab === 'sync' && (
            <div className="space-y-4">
              <h4 className="font-heading text-base font-bold text-white uppercase">
                Active Ingestion Runs
              </h4>
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1C232E] text-slate-400 text-[10px] uppercase">
                    <th className="text-left pb-2">Sync ID</th>
                    <th className="text-left pb-2">Target</th>
                    <th className="text-center pb-2">Status</th>
                    <th className="text-right pb-2">Records</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: 'sync-9901', target: 'Compubox Live Telemetry (Stevenson)', status: 'ACTIVE', recs: 247 },
                    { id: 'sync-9900', target: 'Betfair & Bookmaker Odds Engine', status: 'COMPLETED', recs: 1420 },
                    { id: 'sync-9899', target: 'BBBofC / NYSAC Sanctioned Records', status: 'COMPLETED', recs: 3842 },
                    { id: 'sync-9898', target: 'Historical Round Punch Archives', status: 'COMPLETED', recs: 12487 }
                  ].map((row) => (
                    <tr key={row.id} className="border-b border-[#1A222E]">
                      <td className="py-2.5 text-slate-400">{row.id}</td>
                      <td className="py-2.5 text-white font-bold">{row.target}</td>
                      <td className="py-2.5 text-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px]">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-bold text-slate-300">{row.recs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: DATA QUALITY & INTEGRITY (Section 16) */}
          {activeTab === 'quality' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-base font-bold text-white uppercase">
                    Data Quality Engine & Conflict Auditor
                  </h4>
                  <p className="text-slate-400 text-[11px]">
                    Enforces Section 16 rules: flags duplicate entities, conflicting records, invalid odds, and missing participants.
                  </p>
                </div>
                <button
                  onClick={runQualityAudit}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F2633] hover:bg-[#283244] text-slate-200 rounded-lg text-xs font-mono font-bold"
                >
                  <RefreshCw size={12} />
                  <span>Re-audit Database</span>
                </button>
              </div>

              {/* Data Quality Rules Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[11px]">
                <div className="p-2.5 bg-[#141A23] rounded-lg border border-[#232B38]">
                  <div className="text-slate-400 text-[9px] uppercase font-bold">Duplicate Fighters</div>
                  <div className="text-white font-bold mt-0.5">FLAGGED & LOGGED</div>
                </div>
                <div className="p-2.5 bg-[#141A23] rounded-lg border border-[#232B38]">
                  <div className="text-slate-400 text-[9px] uppercase font-bold">Conflicting Records</div>
                  <div className="text-amber-400 font-bold mt-0.5">MANUAL REVIEW</div>
                </div>
                <div className="p-2.5 bg-[#141A23] rounded-lg border border-[#232B38]">
                  <div className="text-slate-400 text-[9px] uppercase font-bold">Invalid Odds (&lt; 1.0)</div>
                  <div className="text-red-400 font-bold mt-0.5">STRICT REJECT</div>
                </div>
                <div className="p-2.5 bg-[#141A23] rounded-lg border border-[#232B38]">
                  <div className="text-slate-400 text-[9px] uppercase font-bold">Missing Participants</div>
                  <div className="text-red-400 font-bold mt-0.5">BLOCK WRITE</div>
                </div>
              </div>

              {/* Issues Log */}
              <div className="space-y-2">
                <div className="font-bold text-slate-300 uppercase text-[10px] tracking-wider">
                  Audit Findings ({qualityIssues.length} Active Records Inspected)
                </div>
                {qualityIssues.length === 0 ? (
                  <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-center space-y-1">
                    <CheckCircle2 size={24} className="text-emerald-400 mx-auto" />
                    <div className="font-bold text-white">Database Integrity Verified</div>
                    <div className="text-[11px] text-slate-400">All fighters, participants, and records comply with Fight Pulse v2.4 quality parameters.</div>
                  </div>
                ) : (
                  qualityIssues.map((issue) => (
                    <div key={issue.id} className="p-3 bg-[#151A22] border border-[#232B38] rounded-xl flex items-start justify-between gap-3 font-mono">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            issue.severity === 'CRITICAL'
                              ? 'bg-red-950 text-red-400 border border-red-800'
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {issue.severity}
                          </span>
                          <span className="font-bold text-white text-xs">{issue.ruleCode}</span>
                          <span className="text-[10px] text-slate-500">[{issue.entityType} ID: {issue.entityId}]</span>
                        </div>
                        <p className="text-slate-300 text-xs font-sans">{issue.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">Just now</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ENTITY RESOLUTION */}
          {activeTab === 'resolution' && (
            <div className="space-y-4">
              <h4 className="font-heading text-base font-bold text-white uppercase">
                Entity Resolution & Disambiguation Rules
              </h4>
              <p className="text-slate-400">
                Rule: "Never automatically merge ambiguous records. Ambiguous records should be flagged for review."
              </p>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Anthony Joshua (boxrec-659461)</span>
                  <span className="text-emerald-400 font-bold font-mono">RESOLVED (100% Match)</span>
                </div>
                <div className="text-slate-400 text-[11px] font-mono">
                  Matched via: DOB (15 Oct 1989), BBBofC license, Aliases ("AJ"), Opponents list
                </div>
              </div>

              <div className="p-3 bg-[#151A22] rounded-xl border border-[#232B38] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Shakur Stevenson (boxrec-791784)</span>
                  <span className="text-emerald-400 font-bold font-mono">RESOLVED (100% Match)</span>
                </div>
                <div className="text-slate-400 text-[11px] font-mono">
                  Matched via: WBC Lightweight champion record, Compubox telemetry channel ID
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-3 font-mono text-xs">
              <h4 className="font-heading text-base font-bold text-white uppercase font-sans">
                Real-Time Data Audit Log
              </h4>
              <div className="space-y-2 text-slate-300">
                <div className="p-2 bg-[#141A23] rounded border border-[#232B38]">
                  [2026-10-05 12:30:12] COMPUBOX: Stevenson lands right hand to head (Round 6 1:48) · Verified
                </div>
                <div className="p-2 bg-[#141A23] rounded border border-[#232B38]">
                  [2026-10-05 12:28:45] ODDS_ENGINE: Garcia vs Haney line shortened across 4 bookmakers · Verified
                </div>
                <div className="p-2 bg-[#141A23] rounded border border-[#232B38]">
                  [2026-10-05 12:24:10] MOMENTUM: Stevenson momentum score updated to 68 based on punch output delta
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1C232E] bg-[#12161E] flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono">Fight Pulse System v2.4 Commercial Core</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#1F2633] hover:bg-[#283244] text-white rounded-lg font-bold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
