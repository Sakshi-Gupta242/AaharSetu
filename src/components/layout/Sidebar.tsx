import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldCheck, 
  LayoutDashboard, 
  ScanSearch, 
  BarChart3, 
  AlertTriangle,
  Cpu,
  Radio
} from 'lucide-react';
import { useAlertStore } from '../../stores/alertStore';
import { APP_NAME, APP_VERSION } from '../../utils/constants';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeCount?: number;
}

export const Sidebar: React.FC = () => {
  const unreadCount = useAlertStore((state) => state.unreadCount);

  const navItems: NavItem[] = [
    {
      name: 'City Overview',
      path: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Vehicle Investigation',
      path: '/investigation',
      icon: ScanSearch,
    },
    {
      name: 'Traffic Analytics',
      path: '/analytics',
      icon: BarChart3,
    },
    {
      name: 'Alerts & Anomalies',
      path: '/alerts',
      icon: AlertTriangle,
      badgeCount: unreadCount,
    },
  ];

  return (
    <aside className="w-64 bg-[#0c121e] border-r border-slate-800/80 flex flex-col shrink-0 select-none z-30">
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center gap-3 border-b border-slate-800/80 bg-[#090d16]/70">
        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-500/20">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm tracking-wide text-slate-100 uppercase">
              {APP_NAME}
            </span>
          </div>
          <span className="text-[10px] tracking-wider text-cyan-400/80 font-mono font-medium">
            COMMAND SYSTEM
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
          Operations
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-medium transition-all duration-150 relative ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive
                          ? 'text-cyan-400'
                          : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="tracking-wide">{item.name}</span>
                  </div>

                  {item.badgeCount !== undefined && item.badgeCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40">
                      {item.badgeCount}
                    </span>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r shadow-sm shadow-cyan-400" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#090d16]/50 space-y-2">
        <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-800/90 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              FEED: ONLINE
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-1.5 py-0.2 rounded">
              99.98%
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-slate-400" />
              ENGINE
            </span>
            <span className="text-slate-300">{APP_VERSION}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
