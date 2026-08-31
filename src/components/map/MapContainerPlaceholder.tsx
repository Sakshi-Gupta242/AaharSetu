import React from 'react';
import { 
  Crosshair, 
  Layers, 
  Plus, 
  Minus, 
  Compass, 
  MapPin, 
  Activity, 
  Maximize2,
  Video
} from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';
import { MOCK_CAMERAS } from '../../mocks/cameraData';

interface MapContainerPlaceholderProps {
  className?: string;
}

export const MapContainerPlaceholder: React.FC<MapContainerPlaceholderProps> = ({ className = '' }) => {
  const { center, zoom, selectedCameraId, setSelectedCamera } = useMapStore();

  return (
    <div className={`relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-slate-800/90 bg-[#0a0f1d] bg-grid-pattern shadow-2xl flex flex-col ${className}`}>
      {/* Top Map HUD Bar */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-semibold">GIS MESH: ACTIVE</span>
          <span className="text-slate-400">|</span>
          <span className="text-cyan-400">
            {center[1].toFixed(4)}°N, {center[0].toFixed(4)}°E
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-400">ZOOM {zoom.toFixed(1)}x</span>
        </div>
      </div>

      {/* Top Right Controls & Layer Selector Placeholder */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 p-1.5 rounded-lg shadow-lg flex items-center gap-1">
          <button className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tactical Dark</span>
          </button>
          <button className="px-2.5 py-1 text-xs font-mono rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition">
            Satellite
          </button>
          <button className="px-2.5 py-1 text-xs font-mono rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition">
            Traffic Heat
          </button>
        </div>
      </div>

      {/* Main Visual GIS Center Placeholder (Prepares for MapLibre) */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Tactical Crosshair / Radar Center Effect */}
        <div className="absolute w-80 h-80 rounded-full border border-cyan-500/10 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full border border-cyan-500/20 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-cyan-500/30 border-dashed animate-spin" style={{ animationDuration: '40s' }} />
          </div>
        </div>

        {/* Center Crosshair icon */}
        <div className="absolute text-cyan-500/40 pointer-events-none">
          <Crosshair className="w-16 h-16" />
        </div>

        {/* Simulated Camera Nodes on the Grid */}
        {MOCK_CAMERAS.map((cam, idx) => {
          // Calculate arbitrary pseudo-positions across the container for visual fidelity
          const xPos = 20 + ((idx * 27) % 65);
          const yPos = 25 + ((idx * 31) % 55);
          const isSelected = selectedCameraId === cam.id;

          return (
            <button
              key={cam.id}
              onClick={() => setSelectedCamera(isSelected ? null : cam.id)}
              style={{ left: `${xPos}%`, top: `${yPos}%` }}
              className={`absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10`}
            >
              <div className="relative flex flex-col items-center">
                {/* Ping animation for active camera */}
                {cam.status === 'ONLINE' && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </span>
                )}

                <div
                  className={`p-1.5 rounded-md border flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-300 ring-4 ring-cyan-500/30 scale-110 shadow-lg shadow-cyan-500/40'
                      : cam.status === 'ONLINE'
                      ? 'bg-slate-900/90 text-cyan-400 border-cyan-500/50 hover:bg-cyan-950/80 hover:border-cyan-400'
                      : cam.status === 'DEGRADED'
                      ? 'bg-amber-950/90 text-amber-400 border-amber-500/60'
                      : 'bg-slate-900/90 text-slate-400 border-slate-700'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                </div>

                {/* Pin Tooltip label */}
                <div className={`mt-1 px-1.5 py-0.5 rounded text-[10px] font-mono whitespace-nowrap border transition-all ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-200 border-cyan-500'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 group-hover:border-slate-600'
                }`}>
                  {cam.id}
                </div>
              </div>
            </button>
          );
        })}

        {/* Informational Readiness Badge */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-lg inline-flex items-center gap-2 shadow-xl">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 font-medium">
              GIS Map Viewport Ready
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Phase 2 MapLibre Engine
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Navigation Controls */}
      <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-1.5">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition" title="Zoom in">
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-slate-800 w-full" />
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition" title="Zoom out">
            <Minus className="w-4 h-4" />
          </button>
        </div>
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition" title="Reset Orientation">
            <Compass className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition" title="Fit Bounds">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Coordinates & Camera detail inspector footer */}
      {selectedCameraId && (
        <div className="absolute bottom-3 left-3 z-10 max-w-sm bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-lg p-3 shadow-xl">
          {(() => {
            const cam = MOCK_CAMERAS.find((c) => c.id === selectedCameraId);
            if (!cam) return null;
            return (
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <span className="font-mono font-bold text-cyan-400">{cam.id}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    cam.status === 'ONLINE' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' : 'bg-amber-950/80 text-amber-300 border-amber-700'
                  }`}>
                    {cam.status}
                  </span>
                </div>
                <div className="font-semibold text-slate-200">{cam.name}</div>
                <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {cam.zoneName} ({cam.coordinates[1]}°N, {cam.coordinates[0]}°E)
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono pt-1 text-slate-400 border-t border-slate-800/80">
                  <span>Detections Today: <strong className="text-slate-200">{cam.totalDetectionsToday.toLocaleString()}</strong></span>
                  <span>Lanes: <strong className="text-slate-200">{cam.laneCount}</strong></span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
