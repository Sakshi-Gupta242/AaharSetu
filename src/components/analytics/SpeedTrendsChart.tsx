import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { Gauge, AlertTriangle, ShieldCheck } from 'lucide-react';
import { HourlyTrafficRecord } from '../../types/analytics';

interface SpeedTrendsChartProps {
  data: HourlyTrafficRecord[];
}

export const SpeedTrendsChart: React.FC<SpeedTrendsChartProps> = ({ data }) => {
  const metrics = useMemo(() => {
    if (!data.length) return null;

    let fastest = data[0];
    let slowest = data[0];
    let total = 0;

    data.forEach((d) => {
      total += d.averageSpeedKmh;
      if (d.averageSpeedKmh > fastest.averageSpeedKmh) fastest = d;
      if (d.averageSpeedKmh < slowest.averageSpeedKmh) slowest = d;
    });

    const avgSpeed = Number((total / data.length).toFixed(1));

    return {
      avgSpeed,
      fastestHour: fastest.hourLabel,
      fastestSpeed: fastest.averageSpeedKmh,
      slowestHour: slowest.hourLabel,
      slowestSpeed: slowest.averageSpeedKmh,
    };
  }, [data]);

  return (
    <div className="space-y-4">
      {/* Top Metric Summary Cards */}
      {metrics && (
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-cyan-400" />
              Mean Velocity
            </span>
            <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">
              {metrics.avgSpeed} <span className="text-[10px] text-slate-400 font-normal">km/h</span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Fastest Window
            </span>
            <div className="text-sm font-bold font-mono text-emerald-300 mt-0.5">
              {metrics.fastestSpeed} <span className="text-[10px] text-slate-400 font-normal">km/h</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              at {metrics.fastestHour}
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-rose-400" />
              Slowest Window
            </span>
            <div className="text-sm font-bold font-mono text-rose-300 mt-0.5">
              {metrics.slowestSpeed} <span className="text-[10px] text-slate-400 font-normal">km/h</span>
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              at {metrics.slowestHour}
            </div>
          </div>
        </div>
      )}

      {/* Recharts Area Chart */}
      <div className="w-full h-52 rounded-lg bg-slate-950/70 border border-slate-800/80 p-2.5 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            {/* Congestion Threshold Line at 40 km/h */}
            <ReferenceLine y={40} stroke="#f43f5e" strokeDasharray="4 4" label={{ value: 'Congestion Threshold', fill: '#f43f5e', fontSize: 9, position: 'insideTopRight' }} />
            <XAxis
              dataKey="hourLabel"
              stroke="#64748b"
              fontSize={9}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              interval={3}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={9}
              domain={[20, 80]}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              tickFormatter={(v) => `${v}k`}
              tick={{ fontFamily: 'JetBrains Mono', fill: '#94a3b8' }}
            />
            <Tooltip content={<CustomSpeedTooltip />} />
            <Area
              type="monotone"
              dataKey="averageSpeedKmh"
              stroke="#f59e0b"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#speedGradient)"
              activeDot={{ r: 4, fill: '#fbbf24', stroke: '#090d16', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CustomSpeedTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HourlyTrafficRecord;
    const isSlow = data.averageSpeedKmh < 40;
    return (
      <div className="bg-slate-900 border border-slate-700 p-2 rounded-lg shadow-2xl text-xs font-mono space-y-1">
        <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
          Time: {label}
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-100">
          <span>Mean Speed:</span>
          <strong className={isSlow ? 'text-rose-400' : 'text-emerald-400'}>
            {data.averageSpeedKmh} km/h
          </strong>
        </div>
        <div className="text-[10px] text-slate-400">
          Status: <strong className={isSlow ? 'text-rose-400' : 'text-emerald-400'}>{data.congestionLevel}</strong>
        </div>
      </div>
    );
  }
  return null;
};
