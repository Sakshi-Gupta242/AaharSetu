import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Flame, 
  Share2, 
  Clock, 
  Calendar, 
  Gauge
} from 'lucide-react';
import { AnalyticsCard } from '../components/analytics/AnalyticsCard';
import { HourlyVolumeChart } from '../components/analytics/HourlyVolumeChart';
import { DailyTrendsChart } from '../components/analytics/DailyTrendsChart';
import { SpeedTrendsChart } from '../components/analytics/SpeedTrendsChart';
import { CongestionHotspotsPanel } from '../components/analytics/CongestionHotspotsPanel';
import { ODFlowMap } from '../components/analytics/ODFlowMap';
import { ODRouteRankingPanel } from '../components/analytics/ODRouteRankingPanel';
import { useFilterStore } from '../stores/filterStore';
import { 
  getFilteredHourlyData, 
  getFilteredDailyData, 
  getFilteredHotspots, 
  getFilteredODRoutes 
} from '../mocks/analyticsData';
import { ODRoute } from '../types/analytics';

export const TrafficAnalytics: React.FC = () => {
  const { dateRange, timeOfDay, selectedZone } = useFilterStore();

  const [selectedRoute, setSelectedRoute] = useState<ODRoute | null>(null);

  // Compute reactive data based on global filter store
  const hourlyData = useMemo(() => {
    return getFilteredHourlyData(selectedZone, timeOfDay);
  }, [selectedZone, timeOfDay]);

  const dailyData = useMemo(() => {
    return getFilteredDailyData(selectedZone, dateRange);
  }, [selectedZone, dateRange]);

  const hotspots = useMemo(() => {
    return getFilteredHotspots(selectedZone);
  }, [selectedZone]);

  const odRoutes = useMemo(() => {
    return getFilteredODRoutes(selectedZone);
  }, [selectedZone]);

  const handleSelectRoute = (route: ODRoute | null) => {
    setSelectedRoute(route);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Scope summary */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              City-Wide Traffic Analytics & OD Flow Intelligence
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated flow telemetry, speed variance index, and Top 10 arterial corridor matrices.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Sector: <strong className="text-cyan-400 uppercase">{selectedZone}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Window: <strong className="text-cyan-400 uppercase">{dateRange}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            Time: <strong className="text-cyan-400 uppercase">{timeOfDay}</strong>
          </span>
        </div>
      </div>

      {/* Row 1: 2 Columns for Volume & Daily Macro Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 1. Hourly Traffic Volume */}
        <AnalyticsCard
          title="Hourly Traffic Volume Distribution"
          subtitle="24-hour recognized vehicle throughput with morning & evening peak markers"
          icon={Clock}
          badgeText="24h Profile"
          badgeVariant="cyan"
        >
          <HourlyVolumeChart data={hourlyData} />
        </AnalyticsCard>

        {/* 2. Daily Traffic Volume & Velocity Trends */}
        <AnalyticsCard
          title="Daily Volume & Speed Trends"
          subtitle="Macro volume crossings vs mean arterial velocity (dual-axis)"
          icon={Calendar}
          badgeText="Multi-Day Trend"
          badgeVariant="emerald"
        >
          <DailyTrendsChart data={dailyData} />
        </AnalyticsCard>
      </div>

      {/* Row 2: 2 Columns for Speed Trends & Ranked Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 3. Average Speed Trends */}
        <AnalyticsCard
          title="Speed Corridor Trends & Congestion Threshold"
          subtitle="Hourly velocity distribution relative to 40 km/h congestion threshold"
          icon={Gauge}
          badgeText="Velocity Radar"
          badgeVariant="amber"
        >
          <SpeedTrendsChart data={hourlyData} />
        </AnalyticsCard>

        {/* 4. Congestion Hotspots */}
        <AnalyticsCard
          title="Ranked Congestion Bottlenecks"
          subtitle="Top saturation corridors prioritized by critical index"
          icon={Flame}
          badgeText={`${hotspots.length} Priority Hotspots`}
          badgeVariant="amber"
        >
          <CongestionHotspotsPanel hotspots={hotspots} />
        </AnalyticsCard>
      </div>

      {/* Row 3: Origin-Destination (OD) Flow Intelligence Map & Top 10 Ranking */}
      <AnalyticsCard
        title="Origin-Destination (OD) Flow Corridors"
        subtitle="Top 10 highest-density inter-hub transit routes with volume-weighted vector paths"
        icon={Share2}
        badgeText="Top 10 Filtered"
        badgeVariant="cyan"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1">
          {/* Left: MapLibre OD Flow Map (8 cols) */}
          <div className="lg:col-span-8 min-h-[460px] flex flex-col">
            <ODFlowMap
              routes={odRoutes}
              selectedRouteId={selectedRoute?.routeId || null}
              onSelectRoute={handleSelectRoute}
            />
          </div>

          {/* Right: Ranked Top 10 Route List (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-300">Top 10 Corridors (Volume)</span>
              <span className="text-cyan-400">Click to focus</span>
            </div>
            <ODRouteRankingPanel
              routes={odRoutes}
              selectedRouteId={selectedRoute?.routeId || null}
              onSelectRoute={handleSelectRoute}
            />
          </div>
        </div>
      </AnalyticsCard>
    </div>
  );
};
