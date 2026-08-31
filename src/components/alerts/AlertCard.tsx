import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertOctagon, 
  Clock, 
  MapPin, 
  Video, 
  Check, 
  ScanSearch, 
  ShieldAlert, 
  Navigation,
  Hourglass
} from 'lucide-react';
import { AlertItem } from '../../types/alerts';
import { formatDateTime } from '../../utils/formatters';
import { ALERT_TYPE_LABELS, ALERT_SEVERITY_COLORS } from '../../utils/constants';
import { useMapStore } from '../../stores/mapStore';

interface AlertCardProps {
  alert: AlertItem;
  onMarkAsRead: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onMarkAsRead }) => {
  const navigate = useNavigate();
  const setInvestigationContext = useMapStore((state) => state.setInvestigationContext);

  const handleInvestigate = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!alert.isRead) {
      onMarkAsRead(alert.id);
    }
    const targetPlate = alert.vehiclePlate || alert.plate || '';
    setInvestigationContext({
      plate: targetPlate,
      alertId: alert.id,
      relatedEventId: alert.relatedEventId,
      cameraId: alert.cameraId,
      coordinates: alert.coordinates,
    });
    const eventParam = alert.relatedEventId ? `&eventId=${alert.relatedEventId}` : '';
    navigate(`/investigation?plate=${targetPlate}${eventParam}`);
  };

  const getAlertIcon = () => {
    switch (alert.alertType) {
      case 'BLACKLISTED':
        return ShieldAlert;
      case 'ROUTE_ANOMALY':
        return Navigation;
      case 'UNUSUAL_LOITERING':
        return Hourglass;
      default:
        return AlertOctagon;
    }
  };

  const AlertIcon = getAlertIcon();
  const severityStyle = ALERT_SEVERITY_COLORS[alert.severity] || ALERT_SEVERITY_COLORS.HIGH;

  return (
    <div
      onClick={() => handleInvestigate()}
      className={`rounded-xl border transition-all duration-200 overflow-hidden shadow-lg cursor-pointer ${
        alert.isRead
          ? 'bg-[#0f172a]/70 border-slate-800/80 opacity-85 hover:opacity-100 hover:border-slate-700'
          : 'bg-[#121b2f] border-slate-700 hover:border-cyan-500/50 ring-1 ring-cyan-500/20'
      }`}
    >
      {/* Top Strip */}
      <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          {/* Unread indicator */}
          {!alert.isRead && (
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
          )}

          {/* Severity Badge */}
          <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${severityStyle.badge}`}>
            {alert.severity}
          </span>

          {/* Alert Type Badge */}
          <div className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-200">
            <AlertIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{ALERT_TYPE_LABELS[alert.alertType] || alert.alertType}</span>
          </div>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDateTime(alert.timestamp)}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          {/* Plate & Camera Info */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 shadow-inner flex items-center gap-1.5">
              <span className="text-[9px] font-bold bg-blue-600 text-white px-1 rounded font-mono">IND</span>
              <span className="font-mono font-bold text-sm tracking-wider text-cyan-300">
                {alert.vehiclePlate || alert.plate}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs font-mono text-slate-300">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>[{alert.cameraId}] {alert.cameraName}</span>
            </div>

            {alert.zone && (
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                {alert.zone}
              </span>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{alert.location || alert.locationName}</span>
          </div>

          {/* Incident notes / message */}
          {(alert.message || alert.notes) && (
            <p className="text-xs text-slate-400 bg-slate-950/60 p-2 rounded border border-slate-800/80 font-sans">
              {alert.message || alert.notes}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 self-end md:self-center shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => handleInvestigate(e)}
            className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950 transition cursor-pointer"
          >
            <ScanSearch className="w-4 h-4" />
            <span>INVESTIGATE</span>
          </button>

          {!alert.isRead ? (
            <button
              onClick={() => onMarkAsRead(alert.id)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5 border border-slate-700 transition cursor-pointer"
              title="Mark as Read"
            >
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>ACKNOWLEDGE</span>
            </button>
          ) : (
            <span className="px-2.5 py-1 text-[11px] font-mono text-slate-400 flex items-center gap-1">
              <Check className="w-3 h-3 text-slate-400" />
              ACKNOWLEDGED
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
