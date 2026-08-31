import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Calendar, Activity, Gauge } from 'lucide-react';
import { DailyTrafficRecord } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';

interface DailyTrendsChartProps {
  data: DailyTrafficRecord[];
}

export const DailyTrendsChart: React.FC<DailyTrendsChartProps> = ({ data }) => {
  const metrics = useMemo(() => {
    if (!data.length) return null;

    let totalVehicles = 0;
    let totalSpeed = 0;

    data.forEach((d) => {
      totalVehicles += d.vehicleCount;
      totalSpeed += d.averageSpeedKmh;
    });

    const avgDaily = Math.floor(totalVehicles / data.length);
    const avgSpeed = Number((totalSpeed / data.length).toFixed(1));

    return {
      totalVehicles,
      avgDaily,
      avgSpeed,
    };
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Top Metric Summary Cards */}
      {metrics && (
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              Total Period Volume
            </span>
            <div className="text-base font-bold font-mono text-slate-100 mt-0.5">
              {formatNumber(metrics.totalVehicles)}
            </div>
            <div className="text-[10px] font-mono text-cyan-400 mt-0.5">
              Across {data.length} Observation Days
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-emerald-400" />
              Daily Avg Volume
            </span>
            <div className="text-base font-bold font-mono text-emerald-300 mt-0.5">
              {formatNumber(metrics.avgDaily)} <span className="text-[11px] text-slate-400 font-normal">vpd</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Weekday baseline
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-amber-400" />
              Mean Velocity
            </span>
            <div className="text-base font-bold font-mono text-amber-300 mt-0.5">
              {metrics.avgSpeed} <span className="text-[11px] text-slate-400 font-normal">km/h</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              Arterials & Expressways
            </div>
          </div>
        </div>
      )}

      {/* Recharts Dual-Axis Chart */}
      <div className="w-full h-64 rounded-lg bg-slate-950/70 border border-slate-800/80 p-3 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="dayLabel"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}
            />
            {/* Left Axis: Volume */}
            <YAxis
              yAxisId="left"
              stroke="#06b6d4"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#0891b2' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#06b6d4' }}
            />
            {/* Right Axis: Speed */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#f59e0b"
              domain={[30, 80]}
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#d97706' }}
              tickFormatter={(v) => `${v}k`}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#f59e0b' }}
            />
            <Tooltip content={<CustomDailyTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono', paddingTop: '6px' }}
            />
            <Bar
              yAxisId="left"
              dataKey="vehicleCount"
              name="Vehicle Crossings"
              fill="#0891b2"
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="averageSpeedKmh"
              name="Avg Speed (km/h)"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f59e0b', stroke: '#090d16', strokeWidth: 1.5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomDailyTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DailyTrafficRecord;
    return (
      <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-lg shadow-2xl text-xs font-mono space-y-1.5">
        <div className="text-slate-100 font-bold border-b border-slate-800 pb-1">
          {data.dayLabel} ({data.date})
        </div>
        <div className="flex items-center justify-between gap-4 text-cyan-300">
          <span>Total Vehicles:</span>
          <strong>{formatNumber(data.vehicleCount)}</strong>
        </div>
        <div className="flex items-center justify-between gap-4 text-amber-300 text-[11px]">
          <span>Average Velocity:</span>
          <strong>{data.averageSpeedKmh} km/h</strong>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-400 text-[10px]">
          <span>Peak Hour:</span>
          <span className="text-slate-200">{data.peakHourLabel} ({formatNumber(data.peakVolume)} vph)</span>
        </div>
      </div>
    );
  }
  return null;
};
