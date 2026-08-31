import React, { useRef, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  Gauge, 
  Compass, 
  AlertTriangle,
  Layers
} from 'lucide-react';
import { VehicleDetection } from '../../types/vehicle';
import { formatDateTime } from '../../utils/formatters';

interface VehicleTimelineProps {
  detections: VehicleDetection[];
  selectedDetectionId: string | null;
  onSelectDetection: (detection: VehicleDetection) => void;
}

export const VehicleTimeline: React.FC<VehicleTimelineProps> = ({
  detections,
  selectedDetectionId,
  onSelectDetection,
}) => {
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Auto-scroll selected timeline item into view
  useEffect(() => {
    if (selectedDetectionId && itemRefs.current[selectedDetectionId]) {
      itemRefs.current[selectedDetectionId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedDetectionId]);

  if (!detections || detections.length === 0) {
    return (
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-6 text-center text-slate-400 text-xs font-mono">
        No sightings recorded for this target vehicle.
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Chronological Trajectory Logs ({detections.length})
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/80 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
          CHRONOLOGICAL (START → LATEST)
        </span>
      </div>

      {/* Timeline Stream */}
      <div className="p-4 overflow-y-auto space-y-3 flex-1 max-h-[540px]">
        {detections.map((detection, index) => {
          const isSelected = detection.id === selectedDetectionId;
          const isSpeeding = detection.speedKmh > detection.speedLimitKmh;
          const isStart = index === 0;
          const isLatest = index === detections.length - 1;

          return (
            <div
              key={detection.id}
              ref={(el) => { itemRefs.current[detection.id] = el; }}
              onClick={() => onSelectDetection(detection)}
              className="relative pl-6 pb-1 group cursor-pointer transition"
            >
              {/* Vertical Connector Line */}
              {index !== detections.length - 1 && (
                <div className={`absolute left-[9px] top-6 bottom-0 w-[2px] transition-colors ${
                  isSelected ? 'bg-cyan-400' : 'bg-slate-800 group-hover:bg-cyan-500/40'
                }`} />
              )}

              {/* Waypoint Number Circle */}
              <div
                className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-cyan-400 border-white text-slate-950 font-bold scale-110 shadow-md shadow-cyan-500/50 z-10'
                    : isStart
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-400 font-bold'
                    : isLatest
                    ? 'bg-rose-950 border-rose-500 text-rose-400 font-bold'
                    : 'bg-slate-900 border-cyan-500/60 text-cyan-400 group-hover:border-cyan-400'
                }`}
              >
                <span className="text-[9px] font-mono font-bold">{index + 1}</span>
              </div>

              {/* Timeline Card */}
              <div
                className={`rounded-lg p-3 space-y-2 transition-all border ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/60'
                    : 'bg-slate-900/80 border-slate-800/90 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {formatDateTime(detection.timestamp)}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                      {detection.cameraId}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isStart && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                        START
                      </span>
                    )}
                    {isLatest && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-rose-950 text-rose-300 border border-rose-700 animate-pulse">
                        LATEST
                      </span>
                    )}
                    {detection.isFlagged && (
                      <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-rose-950 text-rose-300 border border-rose-600 flex items-center gap-0.5">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        FLAGGED
                      </span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="font-medium">{detection.locationName || detection.location}</span>
                </div>

                {/* Zone & Direction info */}
                {detection.zone && (
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>{detection.zone}</span>
                  </div>
                )}

                {/* Telemetry info row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/70 flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-slate-500" />
                    <span>Speed:</span>
                    <strong
                      className={
                        isSpeeding
                          ? 'text-rose-400 font-bold'
                          : 'text-slate-200'
                      }
                    >
                      {detection.speedKmh} km/h
                    </strong>
                    <span className="text-slate-500">({detection.speedLimitKmh} limit)</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-slate-500" />
                    <span>{detection.direction}</span>
                    <span className="text-slate-500">• L{detection.lane}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
