import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { normalizePlateNumber } from '../../mocks/vehicleData';

interface PlateSearchHeaderProps {
  onSearch: (plate: string) => void;
  currentPlate: string;
  isLoading?: boolean;
}

export const PlateSearchHeader: React.FC<PlateSearchHeaderProps> = ({
  onSearch,
  currentPlate,
  isLoading = false,
}) => {
  const [inputVal, setInputVal] = useState(currentPlate);

  useEffect(() => {
    setInputVal(currentPlate);
  }, [currentPlate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = normalizePlateNumber(inputVal);
    if (normalized) {
      onSearch(normalized);
    }
  };

  const handleQuickSelect = (plate: string) => {
    const normalized = normalizePlateNumber(plate);
    setInputVal(normalized);
    onSearch(normalized);
  };

  return (
    <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 lg:p-5 shadow-xl space-y-3">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Vehicle ANPR Target Search & Surveillance
          </h2>
          <p className="text-xs text-slate-400">
            Query city-wide camera networks for multi-point trajectory history and license recognition.
          </p>
        </div>

        {/* Quick plate presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Targets:
          </span>
          {['DL01AB1234', 'KA05MH9988', 'MH12PQ4567'].map((samplePlate) => {
            const isMatch = normalizePlateNumber(currentPlate) === samplePlate;
            return (
              <button
                key={samplePlate}
                type="button"
                onClick={() => handleQuickSelect(samplePlate)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition border cursor-pointer ${
                  isMatch
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-950'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white'
                }`}
              >
                {samplePlate}
              </button>
            );
          })}
        </div>
      </div>

      {/* Large Search Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-cyan-400" />
          </div>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value.toUpperCase())}
            placeholder="Enter license plate (e.g. DL01AB1234, DL 01 AB 1234)"
            className="w-full bg-[#090d16] border border-slate-700/80 rounded-lg pl-11 pr-4 py-3 text-slate-100 font-mono text-base tracking-widest uppercase placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 disabled:opacity-70 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider rounded-lg shadow-lg shadow-cyan-950 transition flex items-center gap-2 shrink-0 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Investigate</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
