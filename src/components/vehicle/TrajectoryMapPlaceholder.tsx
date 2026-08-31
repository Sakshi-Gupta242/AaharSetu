import React from 'react';
import { Route, Navigation2, Layers, Plus, Minus, Maximize2 } from 'lucide-react';
import { VehicleProfile } from '../../types/vehicle';

interface TrajectoryMapPlaceholderProps {
  profile: VehicleProfile | null;
}

export const TrajectoryMapPlaceholder: React.FC<TrajectoryMapPlaceholderProps> = ({ profile }) => {
  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800/90 bg-[#0a0f1d] bg-grid-pattern shadow-xl flex flex-col">
      {/* Top HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-mono">
          <Route className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-semibold">TRAJECTORY TRACE</span>
          <span className="text-slate-400">|</span>
          <span className="text-cyan-300">
            {profile ? profile.plateNumber : 'NO TARGET'}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">
            {profile ? `${profile.detections.length} Waypoints` : '0 Waypoints'}
          </span>
        </div>
      </div>

      {/* Top Right Map Layers */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 p-1.5 rounded-lg shadow-lg flex items-center gap-1">
          <button className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Path Vector</span>
          </button>
          <button className="px-2.5 py-1 text-xs font-mono rounded text-slate-400 hover:text-slate-200 transition">
            Heat Corridor
          </button>
        </div>
      </div>

      {/* Visual Canvas Representation */}
      <div className="flex-1 relative flex items-center justify-center">
        {/* Simulated Waypoint Vector Lines */}
        {profile && profile.detections.length > 0 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-400/40">
            <polyline
              points="160,280 280,210 400,240 540,160 680,120"
              fill="none"
              strokeWidth="2"
              strokeDasharray="6,4"
            />
          </svg>
        )}

        {/* Waypoint nodes */}
        {profile && profile.detections.slice(0, 5).map((det, idx) => {
          const coords = [
            { x: '25%', y: '65%' },
            { x: '42%', y: '50%' },
            { x: '58%', y: '55%' },
            { x: '72%', y: '38%' },
            { x: '85%', y: '28%' },
          ][idx] || { x: '50%', y: '50%' };

          const isLatest = idx === 0;

          return (
            <div
              key={det.id}
              style={{ left: coords.x, top: coords.y }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
            >
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-lg transition-all ${
                  isLatest
                    ? 'bg-rose-600 border-white text-white ring-4 ring-rose-500/30 scale-125'
                    : 'bg-slate-900 border-cyan-400 text-cyan-300'
                }`}
              >
                <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
              </div>
              <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[9px] font-mono text-slate-300 whitespace-nowrap">
                {det.cameraId} • {det.speedKmh} km/h
              </div>
            </div>
          );
        })}

        {/* Informative placeholder center prompt */}
        <div className="text-center pointer-events-none z-0">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 mb-2">
            <Navigation2 className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-slate-300">
            Spatial Path Reconstruction Container
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-0.5">
            Geographic waypoint vector mapping powered by MapLibre in Phase 2
          </div>
        </div>
      </div>

      {/* Floating Controls */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition">
            <Plus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition">
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
