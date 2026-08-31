import React from 'react';
import { Zap, TrendingUp } from 'lucide-react';

interface ChartPlaceholderProps {
  type: 'bar' | 'line' | 'area' | 'matrix' | 'hotspots';
  aspectRatio?: string;
  metricSummary?: {
    value: string;
    label: string;
    change?: string;
    isPositive?: boolean;
  };
  placeholderLabel?: string;
}

export const AnalyticsChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  type,
  aspectRatio = 'h-64',
  metricSummary,
}) => {
  return (
    <div className="space-y-4">
      {/* Metric summary top stats */}
      {metricSummary && (
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-2xl font-black font-mono text-slate-100">
              {metricSummary.value}
            </span>
            <span className="ml-2 text-xs text-slate-400 font-medium">
              {metricSummary.label}
            </span>
          </div>
          {metricSummary.change && (
            <span
              className={`text-xs font-mono font-bold flex items-center gap-1 ${
                metricSummary.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {metricSummary.change}
            </span>
          )}
        </div>
      )}

      {/* Visual Chart Placeholder Canvas (ready for Recharts) */}
      <div
        className={`w-full ${aspectRatio} rounded-lg border border-slate-800/80 bg-slate-950/70 p-4 relative overflow-hidden flex flex-col justify-end group`}
      >
        {/* Background Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 p-4">
          <div className="border-b border-cyan-500/20 w-full" />
          <div className="border-b border-cyan-500/20 w-full" />
          <div className="border-b border-cyan-500/20 w-full" />
          <div className="border-b border-cyan-500/20 w-full" />
        </div>

        {/* Mock Chart Graphic Elements depending on type */}
        {type === 'bar' && (
          <div className="h-full flex items-end justify-between gap-2 pt-8 z-0">
            {[45, 60, 85, 95, 78, 52, 90, 110, 140, 125, 80, 65].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div
                  style={{ height: `${(height / 150) * 100}%` }}
                  className="w-full bg-gradient-to-t from-cyan-600/50 to-cyan-400/80 rounded-t-sm group-hover:from-cyan-500 group-hover:to-cyan-300 transition-all"
                />
                <span className="text-[9px] font-mono text-slate-400">
                  {`${(i * 2).toString().padStart(2, '0')}h`}
                </span>
              </div>
            ))}
          </div>
        )}

        {type === 'line' && (
          <div className="h-full flex items-center justify-center relative z-0">
            <svg className="w-full h-40 stroke-cyan-400 fill-cyan-500/10" viewBox="0 0 500 150">
              <path
                d="M0,110 Q70,40 140,80 T280,30 T420,70 T500,20 L500,150 L0,150 Z"
              />
              <path
                d="M0,110 Q70,40 140,80 T280,30 T420,70 T500,20"
                fill="none"
                strokeWidth="2.5"
                className="stroke-cyan-400"
              />
            </svg>
          </div>
        )}

        {type === 'hotspots' && (
          <div className="h-full flex flex-col justify-around z-0 space-y-2 py-2">
            {[
              { name: 'Connaught Circus Inner', volume: '18,450 vph', index: '94% Cap', color: 'bg-rose-500' },
              { name: 'Cyber City Expressway', volume: '14,200 vph', index: '88% Cap', color: 'bg-amber-500' },
              { name: 'Mukarba Chowk Flyover', volume: '11,900 vph', index: '79% Cap', color: 'bg-amber-500' },
              { name: 'Airport Express Plaza', volume: '9,800 vph', index: '62% Cap', color: 'bg-cyan-500' },
            ].map((spot, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-mono p-2 bg-slate-900/80 rounded border border-slate-800">
                <span className="text-slate-200 font-semibold">{spot.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{spot.volume}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] text-slate-950 font-bold ${spot.color}`}>
                    {spot.index}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {type === 'matrix' && (
          <div className="h-full grid grid-cols-5 gap-1.5 p-1 z-0">
            {Array.from({ length: 25 }).map((_, i) => {
              const intensity = (i * 17) % 100;
              const bg =
                intensity > 75
                  ? 'bg-rose-600/70'
                  : intensity > 45
                  ? 'bg-amber-600/60'
                  : intensity > 20
                  ? 'bg-cyan-600/50'
                  : 'bg-slate-800/40';
              return (
                <div
                  key={i}
                  className={`${bg} rounded-sm flex items-center justify-center text-[10px] font-mono text-white/80 transition-all hover:scale-105`}
                >
                  {intensity}%
                </div>
              );
            })}
          </div>
        )}

        {/* Center overlay badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-xs">
          <div className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-400 shadow-xl flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Ready for Recharts Data Binding</span>
          </div>
        </div>
      </div>
    </div>
  );
};
