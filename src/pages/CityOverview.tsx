import React from 'react';
import { 
  Video, 
  CheckCircle2, 
  Activity, 
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { CityOverviewMap } from '../components/map/CityOverviewMap';
import { useFilterStore } from '../stores/filterStore';
import { useAlertStore } from '../stores/alertStore';
import { MOCK_CAMERAS } from '../mocks/cameraData';
import { formatNumber } from '../utils/formatters';

export const CityOverview: React.FC = () => {
  const { selectedZone, dateRange } = useFilterStore();
  const alerts = useAlertStore((state) => state.alerts);
  const unreadAlertsCount = useAlertStore((state) => state.unreadCount);

  // Compute live overview metrics based on selected zone
  const activeCamerasList = selectedZone === 'all'
    ? MOCK_CAMERAS
    : MOCK_CAMERAS.filter((c) => c.zoneId === selectedZone);

  const totalCameras = activeCamerasList.length;
  const onlineCameras = activeCamerasList.filter((c) => c.status === 'ONLINE').length;
  const baseDetections = activeCamerasList.reduce((acc, c) => acc + c.totalDetectionsToday, 0);

  // Date range multiplier effect on detection count
  const detectionMultiplier = dateRange === 'yesterday' ? 0.95 : dateRange === '7d' ? 6.8 : dateRange === '30d' ? 28.5 : 1.0;
  const totalDetections = Math.floor(baseDetections * detectionMultiplier);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Metric Overlay Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 shrink-0">
        {/* Card 1: Total Cameras */}
        <div className="bg-[#0f172a] border border-slate-800/90 rounded-xl p-4 shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Total Cameras
            </span>
            <div className="text-2xl font-black font-mono text-slate-100">
              {totalCameras}
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {selectedZone === 'all' ? 'Across 5 Metro Sectors' : `Filtered Zone Nodes`}
            </span>
          </div>
          <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Video className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500/40" />
        </div>

        {/* Card 2: Active Cameras */}
        <div className="bg-[#0f172a] border border-slate-800/90 rounded-xl p-4 shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Active Cameras
            </span>
            <div className="text-2xl font-black font-mono text-emerald-400">
              {onlineCameras} <span className="text-xs text-slate-400 font-normal">/ {totalCameras}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {((onlineCameras / (totalCameras || 1)) * 100).toFixed(1)}% Operational
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500/40" />
        </div>

        {/* Card 3: Total Detections Today */}
        <div className="bg-[#0f172a] border border-slate-800/90 rounded-xl p-4 shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Recognized Detections
            </span>
            <div className="text-2xl font-black font-mono text-slate-100">
              {formatNumber(totalDetections)}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400">
              <TrendingUp className="w-3 h-3" />
              +14.2% ANPR throughput
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500/40" />
        </div>

        {/* Card 4: Active Alerts */}
        <div className="bg-[#0f172a] border border-slate-800/90 rounded-xl p-4 shadow-xl flex items-center justify-between relative overflow-hidden group">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Active Alerts
            </span>
            <div className="text-2xl font-black font-mono text-rose-400">
              {unreadAlertsCount}
            </div>
            <div className="text-[10px] font-mono text-rose-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              {alerts.length} Total incidents logged
            </div>
          </div>
          <div className="w-11 h-11 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500/40" />
        </div>
      </div>

      {/* Main Dominant Interactive MapLibre WebGL GIS Map */}
      <div className="flex-1 min-h-[460px] flex flex-col">
        <CityOverviewMap />
      </div>
    </div>
  );
};
