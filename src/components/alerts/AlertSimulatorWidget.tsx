import React, { useState } from 'react';
import { Sparkles, Plus, Check } from 'lucide-react';
import { useAlertStore } from '../../stores/alertStore';
import { generateSimulatedAlert } from '../../mocks/alertData';
import { AlertType } from '../../types/alerts';

export const AlertSimulatorWidget: React.FC = () => {
  const addAlert = useAlertStore((state) => state.addAlert);

  const [selectedType, setSelectedType] = useState<AlertType>('BLACKLISTED');
  const [selectedPlate, setSelectedPlate] = useState<string>('DL01AB1234');
  const [isSimulated, setIsSimulated] = useState<boolean>(false);

  const handleSimulate = () => {
    const alert = generateSimulatedAlert(selectedType, selectedPlate);
    addAlert(alert, true);
    setIsSimulated(true);
    setTimeout(() => setIsSimulated(false), 1500);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <span>Demo Alert Simulator</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              TEST HARNESS
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Inject real-time surveillance anomalies to evaluate Click-to-Investigate workflow.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap self-end md:self-center">
        {/* Type Select */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as AlertType)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
        >
          <option value="BLACKLISTED">Blacklisted Hit</option>
          <option value="ROUTE_ANOMALY">Route Deviation</option>
          <option value="UNUSUAL_LOITERING">Loitering Pattern</option>
        </select>

        {/* Plate Select */}
        <select
          value={selectedPlate}
          onChange={(e) => setSelectedPlate(e.target.value)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-300 font-bold focus:outline-none focus:border-cyan-500 transition cursor-pointer"
        >
          <option value="DL01AB1234">DL01AB1234 (Toyota)</option>
          <option value="KA05MH9988">KA05MH9988 (Creta)</option>
          <option value="MH12PQ4567">MH12PQ4567 (City)</option>
        </select>

        {/* Trigger Button */}
        <button
          type="button"
          onClick={handleSimulate}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer shadow-lg ${
            isSimulated
              ? 'bg-emerald-600 text-white shadow-emerald-950'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 shadow-amber-950'
          }`}
        >
          {isSimulated ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Injected!</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Inject Incident</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
