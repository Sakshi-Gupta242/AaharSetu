import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badgeText?: string;
  badgeVariant?: 'cyan' | 'amber' | 'emerald' | 'slate';
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  badgeText,
  badgeVariant = 'cyan',
  headerAction,
  children,
  className = '',
}) => {
  const badgeClasses = {
    cyan: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-800/60',
    emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
  }[badgeVariant];

  return (
    <div className={`bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col ${className}`}>
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-1.5 rounded-md bg-slate-800 text-cyan-400 border border-slate-700">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-100">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {badgeText && (
            <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${badgeClasses}`}>
              {badgeText}
            </span>
          )}
          {headerAction}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
