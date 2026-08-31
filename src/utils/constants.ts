export const APP_NAME = 'ANPR Intelligence';
export const APP_VERSION = 'v1.0.0-PROD';

export const ALERT_TYPE_LABELS = {
  BLACKLISTED: 'Blacklisted Vehicle',
  ROUTE_ANOMALY: 'Route Anomaly',
  UNUSUAL_LOITERING: 'Unusual Loitering',
} as const;

export const ALERT_SEVERITY_COLORS = {
  CRITICAL: {
    badge: 'bg-rose-950/70 text-rose-300 border-rose-600/60 shadow-sm shadow-rose-950',
    indicator: 'bg-rose-500 ring-rose-500/30',
    text: 'text-rose-400',
  },
  HIGH: {
    badge: 'bg-amber-950/70 text-amber-300 border-amber-600/60 shadow-sm shadow-amber-950',
    indicator: 'bg-amber-500 ring-amber-500/30',
    text: 'text-amber-400',
  },
  MEDIUM: {
    badge: 'bg-cyan-950/70 text-cyan-300 border-cyan-600/60 shadow-sm shadow-cyan-950',
    indicator: 'bg-cyan-500 ring-cyan-500/30',
    text: 'text-cyan-400',
  },
  LOW: {
    badge: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    indicator: 'bg-slate-400 ring-slate-400/30',
    text: 'text-slate-400',
  },
} as const;
