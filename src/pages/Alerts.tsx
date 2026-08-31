import React, { useState, useMemo } from 'react';
import { ShieldAlert, SearchX } from 'lucide-react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertFilterToolbar } from '../components/alerts/AlertFilterToolbar';
import { AlertSimulatorWidget } from '../components/alerts/AlertSimulatorWidget';
import { useAlertStore } from '../stores/alertStore';
import { useFilterStore } from '../stores/filterStore';

export const Alerts: React.FC = () => {
  const { alerts, unreadCount, markAsRead, markAllAsRead } = useAlertStore();
  const { selectedCamera, selectedZone } = useFilterStore();

  const [activeType, setActiveType] = useState<string>('ALL');
  const [activeSeverity, setActiveSeverity] = useState<string>('ALL');
  const [activeReadStatus, setActiveReadStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleClearFilters = () => {
    setActiveType('ALL');
    setActiveSeverity('ALL');
    setActiveReadStatus('ALL');
    setSearchQuery('');
  };

  const isFiltered = useMemo(() => {
    return (
      activeType !== 'ALL' ||
      activeSeverity !== 'ALL' ||
      activeReadStatus !== 'ALL' ||
      searchQuery.trim().length > 0
    );
  }, [activeType, activeSeverity, activeReadStatus, searchQuery]);

  // Filter alerts based on active filters & search query
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Category filter
      if (activeType !== 'ALL' && alert.alertType !== activeType) {
        return false;
      }

      // Severity filter
      if (activeSeverity !== 'ALL' && alert.severity !== activeSeverity) {
        return false;
      }

      // Read/Unread filter
      if (activeReadStatus === 'UNREAD' && alert.isRead) {
        return false;
      }
      if (activeReadStatus === 'READ' && !alert.isRead) {
        return false;
      }

      // Zone global filter from top bar if set
      if (selectedZone !== 'all' && alert.zoneId && alert.zoneId !== selectedZone) {
        return false;
      }

      // Camera global filter from top bar if set
      if (selectedCamera !== 'all' && alert.cameraId !== selectedCamera) {
        return false;
      }

      // Search query match (plate, camera ID, or location)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const plate = (alert.vehiclePlate || alert.plate || '').toLowerCase();
        const matchPlate = plate.includes(q);
        const matchCamera = alert.cameraId.toLowerCase().includes(q);
        const matchLoc = (alert.location || alert.locationName || '').toLowerCase();
        const matchType = (alert.alertType || '').toLowerCase();
        return matchPlate || matchCamera || matchLoc || matchType;
      }

      return true;
    });
  }, [alerts, activeType, activeSeverity, activeReadStatus, selectedZone, selectedCamera, searchQuery]);

  return (
    <div className="space-y-5">
      {/* Top Banner / Summary Header */}
      <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              Alerts & Tactical Anomalies Intelligence
            </h2>
            <p className="text-xs text-slate-400">
              Live ANPR incident monitoring: Blacklist hits, route deviations, and loitering pattern triggers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>Unacknowledged: <strong className="text-rose-400 font-bold">{unreadCount}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
            <span>Active Incidents: <strong className="text-slate-100 font-bold">{alerts.length}</strong></span>
          </div>
        </div>
      </div>

      {/* Demo Alert Simulator Widget */}
      <AlertSimulatorWidget />

      {/* Filter & Search Toolbar */}
      <AlertFilterToolbar
        activeType={activeType}
        onTypeChange={setActiveType}
        activeSeverity={activeSeverity}
        onSeverityChange={setActiveSeverity}
        activeReadStatus={activeReadStatus}
        onReadStatusChange={setActiveReadStatus}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onMarkAllAsRead={markAllAsRead}
        onClearFilters={handleClearFilters}
        unreadCount={unreadCount}
        isFiltered={isFiltered}
      />

      {/* Alert Feed List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onMarkAsRead={markAsRead}
            />
          ))
        ) : (
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <SearchX className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-200">No Alerts Match Criteria</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Try clearing filters or injecting a simulated test alert.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
