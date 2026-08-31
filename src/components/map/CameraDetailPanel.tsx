import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Video, 
  X, 
  MapPin, 
  Activity, 
  Clock, 
  Layers, 
  ScanSearch, 
  Radio
} from 'lucide-react';
import { CameraItem } from '../../types/camera';
import { formatNumber } from '../../utils/formatters';

interface CameraDetailPanelProps {
  camera: CameraItem | null;
  onClose: () => void;
}

export const CameraDetailPanel: React.FC<CameraDetailPanelProps> = ({ camera, onClose }) => {
  const navigate = useNavigate();

  if (!camera) return null;

  const isOnline = camera.status === 'ONLINE';
  const isDegraded = camera.status === 'DEGRADED';

  return (
    <div className="absolute top-4 left-4 z-20 w-80 max-w-[calc(100%-2rem)] bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header with Camera ID & Status */}
      <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Video className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-sm text-cyan-300">
                {camera.id}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {camera.code}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
              isOnline
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : isDegraded
                ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                : 'bg-rose-950/80 text-rose-300 border-rose-700'
            }`}
          >
            {camera.status}
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 space-y-3 text-xs">
        {/* Location Name */}
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400">Gantry Location</span>
          <div className="font-semibold text-slate-200 flex items-start gap-1.5 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
            <span>{camera.name}</span>
          </div>
        </div>

        {/* Zone & Coordinates */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Layers className="w-3 h-3 text-cyan-400" />
              Zone
            </span>
            <div className="font-mono text-slate-200 mt-0.5 truncate font-medium">
              {camera.zoneName}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-cyan-400" />
              Coordinates
            </span>
            <div className="font-mono text-slate-300 mt-0.5 text-[11px]">
              {camera.coordinates[1].toFixed(4)}°N, {camera.coordinates[0].toFixed(4)}°E
            </div>
          </div>
        </div>

        {/* Telemetry Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-emerald-400" />
              Detections Today
            </span>
            <div className="text-base font-bold font-mono text-slate-100 mt-0.5">
              {formatNumber(camera.totalDetectionsToday)}
            </div>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              Last Seen
            </span>
            <div className="font-mono text-slate-200 mt-1 text-xs">
              {camera.lastDetectionTimestamp}
            </div>
          </div>
        </div>

        {/* Lane Config */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/80">
          <span>Monitored Lanes: <strong className="text-slate-200">{camera.laneCount} Lanes</strong></span>
          <span>Optical ANPR: <strong className="text-emerald-400">99.4%</strong></span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/investigation`)}
          className="w-full py-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-950"
        >
          <ScanSearch className="w-3.5 h-3.5" />
          <span>Surveillance Sighting Feed</span>
        </button>
      </div>
    </div>
  );
};
