import React from 'react';
import { X, Check, Zap, Shield, Sparkles, Activity, Bell } from 'lucide-react';

interface ProModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProModal: React.FC<ProModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0E1217] border border-red-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-red-600 text-white font-mono font-black text-xs rounded-md tracking-wider">
              PRO
            </span>
            <span className="font-heading text-2xl font-black text-white uppercase tracking-wider">
              FIGHT PULSE PRO
            </span>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-3xl font-black text-white uppercase leading-none">
            Unlock Ringside Telemetry & Proprietary Momentum
          </h3>
          <p className="text-xs text-slate-400">
            For serious boxing fans, syndicates, and analysts who need sub-second ringside intelligence.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {[
            'Ultra Low Latency Compubox punch telemetry (sub-second sync)',
            'Fight Pulse proprietary momentum shift indicators',
            'Full historical odds movements across 12 licensed UK & USA bookmakers',
            'Custom knockdown & momentum volatility push alerts',
            'Granular round punch accuracy & landed target hit-maps'
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
                <Check size={12} strokeWidth={3} />
              </div>
              <span className="text-slate-200 font-sans">{feature}</span>
            </div>
          ))}
        </div>

        <div className="p-4 bg-[#141A23] rounded-2xl border border-[#232B38] flex items-center justify-between font-mono">
          <div>
            <div className="text-2xl font-black text-white">£9.99<span className="text-xs font-normal text-slate-400">/month</span></div>
            <div className="text-[10px] text-slate-400 font-sans">Billed monthly · Cancel anytime</div>
          </div>
          <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded">
            7-DAY FREE TRIAL
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-heading text-lg font-black uppercase tracking-wider shadow-lg glow-red transition-all cursor-pointer"
        >
          Start 7-Day Free Trial
        </button>

        <p className="text-center text-[10px] text-slate-500">
          No commitment. Instant access to live championship bouts.
        </p>

      </div>
    </div>
  );
};
