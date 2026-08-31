import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanSearch, X, Video } from 'lucide-react';
import { useAlertStore } from '../../stores/alertStore';
import { useMapStore } from '../../stores/mapStore';
import { ALERT_SEVERITY_COLORS, ALERT_TYPE_LABELS } from '../../utils/constants';

export const AlertToastNotification: React.FC = () => {
  const navigate = useNavigate();
  const activeAlert = useAlertStore((state) => state.activeToastAlert);
  const dismissToast = useAlertStore((state) => state.dismissToast);
  const markAsRead = useAlertStore((state) => state.markAsRead);
  const setInvestigationContext = useMapStore((state) => state.setInvestigationContext);

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (!activeAlert) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 8000);

    return () => clearTimeout(timer);
  }, [activeAlert, dismissToast]);

  if (!activeAlert) return null;

  const handleInvestigate = () => {
    markAsRead(activeAlert.id);
    setInvestigationContext({
      plate: activeAlert.vehiclePlate || activeAlert.plate || '',
      alertId: activeAlert.id,
      relatedEventId: activeAlert.relatedEventId,
      cameraId: activeAlert.cameraId,
      coordinates: activeAlert.coordinates,
    });
    dismissToast();
    const plate = activeAlert.vehiclePlate || activeAlert.plate || '';
    const eventIdParam = activeAlert.relatedEventId ? `&eventId=${activeAlert.relatedEventId}` : '';
    navigate(`/investigation?plate=${plate}${eventIdParam}`);
  };

  const severityStyle = ALERT_SEVERITY_COLORS[activeAlert.severity] || ALERT_SEVERITY_COLORS.HIGH;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-auto shadow-2xl">
      <div className="bg-slate-900/95 backdrop-blur-md border border-cyan-500/60 rounded-xl overflow-hidden shadow-cyan-950/80 shadow-2xl">
        {/* Top Accent Header */}
        <div className="px-3.5 py-2 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className={`px-2 py-0.2 text-[9px] font-mono font-bold uppercase rounded border ${severityStyle.badge}`}>
              {activeAlert.severity} ALERT
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-200">
              {ALERT_TYPE_LABELS[activeAlert.alertType] || activeAlert.alertType}
            </span>
          </div>

          <button
            onClick={dismissToast}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            {/* License plate */}
            <div className="px-2 py-0.5 rounded bg-slate-950 border border-slate-700 font-mono font-bold text-xs text-cyan-300 tracking-wider">
              {activeAlert.vehiclePlate || activeAlert.plate}
            </div>

            <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <Video className="w-3 h-3 text-cyan-400" />
              <span>{activeAlert.cameraId}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-sans leading-snug">
            {activeAlert.message || activeAlert.notes || 'Target vehicle incident detected by surveillance mesh.'}
          </p>

          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/80">
            <span className="text-[10px] font-mono text-slate-400 truncate max-w-[170px]">
              {activeAlert.location}
            </span>

            <button
              onClick={handleInvestigate}
              className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold font-mono text-[11px] uppercase rounded-md shadow-md shadow-cyan-950 flex items-center gap-1 transition cursor-pointer shrink-0"
            >
              <ScanSearch className="w-3 h-3" />
              <span>Investigate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
