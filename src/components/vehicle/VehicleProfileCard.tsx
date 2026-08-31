import React from 'react';
import { 
  Clock, 
  Camera, 
  Gauge, 
  Activity, 
  AlertOctagon, 
  CheckCircle2, 
  Calendar,
  ShieldAlert
} from 'lucide-react';
import { VehicleProfile } from '../../types/vehicle';
import { formatDateTime } from '../../utils/formatters';

interface VehicleProfileCardProps {
  profile: VehicleProfile | null;
}

export const VehicleProfileCard: React.FC<VehicleProfileCardProps> = ({ profile }) => {
  if (!profile) return null;

  const isHighRisk = profile.status === 'STOLEN' || profile.status === 'WARRANT';

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-xl animate-in fade-in duration-200">
      {/* Header with Plate & Status */}
      <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/60 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {/* Prominent IND Plate */}
          <div className="px-3.5 py-1.5 rounded-md bg-slate-950 border-2 border-slate-700 shadow-inner flex items-center gap-2">
            <span className="text-[10px] font-bold bg-blue-600 text-white px-1 py-0.5 rounded font-mono">IND</span>
            <span className="font-mono font-black text-xl tracking-widest text-cyan-300">
              {profile.plateNumber || profile.plate}
            </span>
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-200">
              {profile.vehicleMake || 'Unknown'} {profile.vehicleModel || ''}
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <span>{profile.vehicleColor || 'Standard'}</span>
              <span>•</span>
              <span>{profile.vehicleType || 'Vehicle'}</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {isHighRisk ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-950/80 border border-rose-600/70 text-rose-300 text-xs font-mono font-bold animate-pulse">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>STATUS: {profile.status}</span>
            </div>
          ) : profile.status === 'SUSPECT' ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-950/80 border border-amber-600/70 text-amber-300 text-xs font-mono font-bold">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span>STATUS: SUSPECT</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-950/80 border border-emerald-600/70 text-emerald-300 text-xs font-mono font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>STATUS: CLEAR</span>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Metric: First Seen */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            First Sighted
          </div>
          <div className="text-xs font-semibold text-slate-200">
            {formatDateTime(profile.firstSeen)}
          </div>
        </div>

        {/* Metric: Last Seen */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Latest Sighted
          </div>
          <div className="text-xs font-semibold text-slate-200">
            {formatDateTime(profile.lastSeen)}
          </div>
        </div>

        {/* Metric: Total Detections */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            Total Sighted
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {profile.totalDetections} <span className="text-xs text-slate-400 font-normal">hits</span>
          </div>
        </div>

        {/* Metric: Cameras Visited */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            Unique Nodes
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {profile.camerasVisited} <span className="text-xs text-slate-400 font-normal">cameras</span>
          </div>
        </div>

        {/* Metric: Average Speed */}
        <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2 md:col-span-1">
          <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-1 mb-1">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            Average Speed
          </div>
          <div className="text-lg font-bold font-mono text-slate-100">
            {profile.averageSpeedKmh || profile.averageSpeed} <span className="text-xs text-slate-400 font-normal">km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
