import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea
} from 'recharts';
import { TrendingUp, Clock, ArrowDownRight } from 'lucide-react';
import { HourlyTrafficRecord } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';

interface HourlyVolumeChartProps {
  data: HourlyTrafficRecord[];
}

export const HourlyVolumeChart: React.FC<HourlyVolumeChartProps> = ({ data }) => {
  // Compute peak hour and lowest traffic period dynamically
  const metrics = useMemo(() => {
    if (!data.length) return null;

    let peak = data[0];
    let lowest = data[0];
    let total = 0;

    data.forEach((d) => {
      total += d.vehicleCount;
      if (d.vehicleCount > peak.vehicleCount) peak = d;
      if (d.vehicleCount < lowest.vehicleCount) lowest = d;
    });

    return {
      peakHour: peak.hourLabel,
      peakVolume: peak.vehicleCount,
      lowestHour: lowest.hourLabel,
      lowestVolume: lowest.vehicleCount,
      totalVolume: total,
    };
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Top Metric Summary Cards */}
      {metrics && (
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-400" />
              Peak Volume
            </span>
            <div className="text-base font-bold font-mono text-cyan-300 mt-0.5">
              {formatNumber(metrics.peakVolume)} <span className="text-[11px] text-slate-400 font-normal">vph</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              at <strong className="text-slate-200">{metrics.peakHour}</strong> (Evening)
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3 text-emerald-400" />
              Lowest Window
            </span>
            <div className="text-base font-bold font-mono text-emerald-300 mt-0.5">
              {formatNumber(metrics.lowestVolume)} <span className="text-[11px] text-slate-400 font-normal">vph</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              at <strong className="text-slate-200">{metrics.lowestHour}</strong> (Night)
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              Peak Windows
            </span>
            <div className="text-xs font-bold font-mono text-amber-300 mt-1">
              08:00 - 10:00
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">
              & <strong className="text-amber-300">17:00 - 20:00</strong>
            </div>
          </div>
        </div>
      )}

      {/* Recharts Area Chart */}
      <div className="w-full h-64 rounded-lg bg-slate-950/70 border border-slate-800/80 p-3 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

            {/* Peak Hour Highlights */}
            <ReferenceArea x1="08:00" x2="10:00" strokeOpacity={0.2} fill="rgba(245, 158, 11, 0.08)" />
            <ReferenceArea x1="17:00" x2="20:00" strokeOpacity={0.2} fill="rgba(244, 63, 94, 0.08)" />

            <XAxis
              dataKey="hourLabel"
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              interval={2}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="vehicleCount"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#volumeGradient)"
              activeDot={{ r: 5, fill: '#22d3ee', stroke: '#090d16', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HourlyTrafficRecord;
    return (
      <div className="bg-slate-900 border border-cyan-500/50 p-2.5 rounded-lg shadow-2xl text-xs font-mono space-y-1">
        <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
          Time: {label}
        </div>
        <div className="text-slate-100 font-semibold flex items-center justify-between gap-4">
          <span>Vehicles Sighted:</span>
          <span className="text-cyan-300 font-bold">{formatNumber(data.vehicleCount)}</span>
        </div>
        <div className="text-slate-400 flex items-center justify-between gap-4 text-[11px]">
          <span>Avg Corridor Velocity:</span>
          <span className="text-amber-300 font-bold">{data.averageSpeedKmh} km/h</span>
        </div>
        <div className="text-slate-400 flex items-center justify-between gap-4 text-[11px]">
          <span>Congestion Index:</span>
          <span className={`font-bold ${
            data.congestionScore > 80 ? 'text-rose-400' : data.congestionScore > 50 ? 'text-amber-400' : 'text-emerald-400'
          }`}>
            {data.congestionScore}% ({data.congestionLevel})
          </span>
        </div>
      </div>
    );
  }
  return null;
};
