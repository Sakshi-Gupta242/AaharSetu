import React from 'react';
import { 
  Calendar, 
  Clock, 
  Video, 
  RotateCcw, 
  Filter,
  Layers
} from 'lucide-react';
import { useFilterStore } from '../../stores/filterStore';
import { MOCK_ZONES, MOCK_CAMERAS } from '../../mocks/cameraData';
import { DateRangeOption, TimeOfDayOption } from '../../types/filter';

export const HeaderFilterBar: React.FC = () => {
  const {
    dateRange,
    timeOfDay,
    selectedZone,
    selectedCamera,
    setDateRange,
    setTimeOfDay,
    setSelectedZone,
    setSelectedCamera,
    resetFilters,
  } = useFilterStore();

  const isFiltered =
    dateRange !== 'today' ||
    timeOfDay !== 'all' ||
    selectedZone !== 'all' ||
    selectedCamera !== 'all';

  // Filter cameras matching selected zone if a specific zone is chosen
  const filteredCameras = selectedZone === 'all'
    ? MOCK_CAMERAS
    : MOCK_CAMERAS.filter((c) => c.zoneId === selectedZone);

  return (
    <header className="h-16 bg-[#0c121e] border-b border-slate-800/80 px-4 flex items-center justify-between gap-4 shrink-0 z-20">
      {/* Title / Filter summary tag */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          <Filter className="w-3.5 h-3.5" />
          <span className="font-semibold tracking-wider text-[11px]">GLOBAL FILTERS</span>
        </div>
        {isFiltered && (
          <span className="hidden xl:inline text-[11px] text-amber-400/90 font-medium">
            (Active Scope Filtered)
          </span>
        )}
      </div>

      {/* Control Selectors */}
      <div className="flex items-center gap-2.5 flex-wrap justify-end flex-1">
        {/* Date Range Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs">
          <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[11px] text-slate-400 uppercase font-mono mr-1">Date:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRangeOption)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="today" className="bg-slate-900 text-slate-200">Today (Live 24h)</option>
            <option value="yesterday" className="bg-slate-900 text-slate-200">Yesterday</option>
            <option value="7d" className="bg-slate-900 text-slate-200">Last 7 Days</option>
            <option value="30d" className="bg-slate-900 text-slate-200">Last 30 Days</option>
          </select>
        </div>

        {/* Time of Day Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[11px] text-slate-400 uppercase font-mono mr-1">Time:</span>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDayOption)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer pr-1"
          >
            <option value="all" className="bg-slate-900 text-slate-200">All Hours (00:00 - 23:59)</option>
            <option value="morning_peak" className="bg-slate-900 text-slate-200">Morning Peak (08:00 - 11:00)</option>
            <option value="evening_peak" className="bg-slate-900 text-slate-200">Evening Peak (17:00 - 20:00)</option>
            <option value="night" className="bg-slate-900 text-slate-200">Night Watch (22:00 - 05:00)</option>
          </select>
        </div>

        {/* Zone Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs">
          <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[11px] text-slate-400 uppercase font-mono mr-1">Zone:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[150px] truncate"
          >
            <option value="all" className="bg-slate-900 text-slate-200">All City Zones</option>
            {MOCK_ZONES.map((zone) => (
              <option key={zone.id} value={zone.id} className="bg-slate-900 text-slate-200">
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Camera Selector */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-md px-2.5 py-1.5 text-xs">
          <Video className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[11px] text-slate-400 uppercase font-mono mr-1">Camera:</span>
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer max-w-[170px] truncate"
          >
            <option value="all" className="bg-slate-900 text-slate-200">
              All Cameras ({filteredCameras.length})
            </option>
            {filteredCameras.map((cam) => (
              <option key={cam.id} value={cam.id} className="bg-slate-900 text-slate-200">
                [{cam.id}] {cam.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={resetFilters}
          disabled={!isFiltered}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
            isFiltered
              ? 'bg-rose-500/15 border border-rose-500/40 text-rose-300 hover:bg-rose-500/25 cursor-pointer shadow-sm shadow-rose-950'
              : 'bg-slate-900/60 border border-slate-800 text-slate-400 cursor-not-allowed opacity-50'
          }`}
          title="Reset all filters to default"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>
    </header>
  );
};
