import React from 'react';
import { Gauge, Activity } from 'lucide-react';
import { CongestionHotspot } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';

interface CongestionHotspotsPanelProps {
  hotspots: CongestionHotspot[];
  onSelectHotspot?: (hotspot: CongestionHotspot) => void;
}

export const CongestionHotspotsPanel: React.FC<CongestionHotspotsPanelProps> = ({
  hotspots,
  onSelectHotspot,
}) => {
  return (
    <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
      {hotspots.map((spot, idx) => {
        const isCritical = spot.congestionScore >= 90;
        const isHigh = spot.congestionScore >= 80 && spot.congestionScore < 90;

        return (
          <div
            key={spot.id}
            onClick={() => onSelectHotspot?.(spot)}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer space-y-2 group"
          >
            {/* Header: Rank + Location + Severity */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                  idx === 0
                    ? 'bg-rose-500 text-slate-950 font-black ring-2 ring-rose-500/30'
                    : idx === 1 || idx === 2
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  #{idx + 1}
                </span>

                <div>
                  <div className="text-xs font-semibold text-slate-100 group-hover:text-amber-300 transition">
                    {spot.locationName}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {spot.zone}
                  </div>
                </div>
              </div>

              {/* Congestion Badge */}
              <div className="text-right shrink-0">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                  isCritical
                    ? 'bg-rose-950/90 text-rose-300 border-rose-600 animate-pulse'
                    : isHigh
                    ? 'bg-amber-950/90 text-amber-300 border-amber-600'
                    : 'bg-cyan-950/90 text-cyan-300 border-cyan-600'
                }`}>
                  {spot.congestionScore}% Index
                </span>
              </div>
            </div>

            {/* Saturation Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
              <div
                style={{ width: `${spot.congestionScore}%` }}
                className={`h-full rounded-full transition-all duration-500 ${
                  isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-cyan-400'
                }`}
              />
            </div>

            {/* Metrics Footer */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
              <span className="flex items-center gap-1">
                <Gauge className="w-3 h-3 text-slate-500" />
                Velocity: <strong className={isCritical ? 'text-rose-400' : 'text-slate-200'}>{spot.averageSpeedKmh} km/h</strong>
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-slate-500" />
                Load: <strong className="text-slate-200">{formatNumber(spot.vehicleVolume)} vph</strong>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
