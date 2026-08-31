import React from 'react';
import { CheckCheck, Filter, ShieldAlert, Navigation, Hourglass, Search, RotateCcw } from 'lucide-react';

interface AlertFilterToolbarProps {
  activeType: string;
  onTypeChange: (type: string) => void;
  activeSeverity: string;
  onSeverityChange: (severity: string) => void;
  activeReadStatus: string;
  onReadStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onMarkAllAsRead: () => void;
  onClearFilters: () => void;
  unreadCount: number;
  isFiltered: boolean;
}

export const AlertFilterToolbar: React.FC<AlertFilterToolbarProps> = ({
  activeType,
  onTypeChange,
  activeSeverity,
  onSeverityChange,
  activeReadStatus,
  onReadStatusChange,
  searchQuery,
  onSearchChange,
  onMarkAllAsRead,
  onClearFilters,
  unreadCount,
  isFiltered,
}) => {
  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-xl space-y-3">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Type Category Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'ALL', label: 'All Anomalies', icon: Filter },
            { id: 'BLACKLISTED', label: 'Blacklisted', icon: ShieldAlert },
            { id: 'ROUTE_ANOMALY', label: 'Route Deviations', icon: Navigation },
            { id: 'UNUSUAL_LOITERING', label: 'Loitering', icon: Hourglass },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeType === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTypeChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition border cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-950 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isFiltered && (
            <button
              onClick={onClearFilters}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 text-xs font-mono flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}

          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acknowledge All ({unreadCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row: Severity + Read State + Plate Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-2.5 border-t border-slate-800/80">
        <div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
          {/* Severity Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Severity:</span>
            <div className="flex items-center gap-1">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => onSeverityChange(sev)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition border cursor-pointer ${
                    activeSeverity === sev
                      ? 'bg-slate-800 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Read / Unread Status */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Status:</span>
            <div className="flex items-center gap-1">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'UNREAD', label: 'Unread' },
                { id: 'READ', label: 'Read' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => onReadStatusChange(st.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition border cursor-pointer ${
                    activeReadStatus === st.id
                      ? 'bg-slate-800 text-cyan-300 border-cyan-500 font-bold'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-300'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search within alerts */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-500">
            <Search className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search plate, camera, zone..."
            className="w-full bg-[#090d16] border border-slate-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>
    </div>
  );
};
