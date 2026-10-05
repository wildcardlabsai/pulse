import React from 'react';
import { AlertTriangle, Clock, RefreshCw, Search, ShieldCheck, Activity } from 'lucide-react';
import { DataClassification } from '../../types/boxing';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: 'search' | 'fight' | 'momentum' | 'odds' | 'alert';
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = 'fight',
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#11141A] border border-[#1E2532] rounded-2xl space-y-3 my-4">
      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
        {icon === 'search' && <Search size={22} />}
        {icon === 'fight' && <Activity size={22} />}
        {icon === 'momentum' && <Activity size={22} className="text-red-500" />}
        {icon === 'odds' && <AlertTriangle size={22} className="text-amber-500" />}
        {icon === 'alert' && <Clock size={22} />}
      </div>

      <div className="space-y-1 max-w-sm">
        <h4 className="font-heading text-lg font-bold text-white uppercase tracking-wide">
          {title}
        </h4>
        {description && (
          <p className="text-xs text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'LIVE DATA TEMPORARILY UNAVAILABLE',
  message = 'Provider connection dropped or ringside telemetry is synchronising. Stale data is suppressed per Data Integrity guidelines.',
  onRetry
}) => {
  return (
    <div className="p-5 bg-red-950/40 border border-red-800/60 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs my-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
          <AlertTriangle size={20} className="animate-pulse" />
        </div>
        <div>
          <h4 className="font-heading text-base font-bold text-white uppercase tracking-wide">
            {title}
          </h4>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#1A222E] hover:bg-[#253142] text-white border border-[#2B384B] rounded-lg font-mono font-bold flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <RefreshCw size={13} />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};

export const SkeletonCard: React.FC<{ heightClass?: string }> = ({ heightClass = 'h-32' }) => {
  return (
    <div className={`w-full ${heightClass} bg-[#12161E] border border-[#1E2532] rounded-2xl animate-pulse relative overflow-hidden`}>
      <div className="p-4 space-y-3">
        <div className="w-1/3 h-4 bg-slate-800 rounded" />
        <div className="w-2/3 h-3 bg-slate-800/60 rounded" />
        <div className="w-full h-8 bg-slate-800/40 rounded mt-4" />
      </div>
    </div>
  );
};

export const VerificationBadge: React.FC<{
  status?: DataClassification;
  provider?: string;
}> = ({ status = 'VERIFIED', provider }) => {
  if (status === 'VERIFIED') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] font-mono font-bold">
        <ShieldCheck size={11} className="text-emerald-400" />
        <span>{provider || 'VERIFIED DATA'}</span>
      </span>
    );
  }

  if (status === 'CALCULATED') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800/60 text-[10px] font-mono font-bold">
        <Activity size={11} className="text-blue-400" />
        <span>CALCULATED METRIC</span>
      </span>
    );
  }

  if (status === 'PENDING') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60 text-[10px] font-mono font-bold">
        <Clock size={11} className="text-amber-400" />
        <span>AWAITING VERIFICATION</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/60 text-[10px] font-mono font-bold">
      <AlertTriangle size={11} className="text-red-400" />
      <span>DATA UNAVAILABLE</span>
    </span>
  );
};
