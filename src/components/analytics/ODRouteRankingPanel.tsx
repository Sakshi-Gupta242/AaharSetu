import React from 'react';
import { ArrowRight, Clock, Gauge } from 'lucide-react';
import { ODRoute } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';

interface ODRouteRankingPanelProps {
  routes: ODRoute[];
  selectedRouteId: string | null;
  onSelectRoute: (route: ODRoute) => void;
}

export const ODRouteRankingPanel: React.FC<ODRouteRankingPanelProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
}) => {
  return (
    <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
      {routes.map((route, idx) => {
        const isSelected = route.routeId === selectedRouteId;

        return (
          <div
            key={route.routeId}
            onClick={() => onSelectRoute(route)}
            className={`p-3 rounded-lg border transition cursor-pointer space-y-2 ${
              isSelected
                ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/60'
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
            }`}
          >
            {/* Header: Rank + Volume */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                  idx === 0
                    ? 'bg-rose-500 text-slate-950 font-black'
                    : idx === 1 || idx === 2
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  #{idx + 1}
                </span>

                <span className="text-[10px] font-mono text-slate-400">
                  {route.routeId}
                </span>
              </div>

              <span className="text-xs font-mono font-bold text-cyan-300">
                {formatNumber(route.vehicleVolume)} <span className="text-[10px] text-slate-400 font-normal">vpd</span>
              </span>
            </div>

            {/* Origin to Destination Vector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-slate-200 truncate max-w-[120px]">
                {route.originName}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-semibold text-slate-200 truncate max-w-[120px]">
                {route.destinationName}
              </span>
            </div>

            {/* Telemetry Metrics */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/70">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                Transit: <strong className="text-slate-200">{route.averageTravelTimeMinutes} min</strong>
              </span>
              <span className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-emerald-400" />
                Velocity: <strong className="text-slate-200">{route.averageSpeedKmh} km/h</strong>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
