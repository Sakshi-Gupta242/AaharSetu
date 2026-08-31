import { create } from 'zustand';
import { AlertItem } from '../types/alerts';
import { MOCK_ALERTS } from '../mocks/alertData';

export interface AlertState {
  alerts: AlertItem[];
  unreadCount: number;
  activeToastAlert: AlertItem | null;
  setAlerts: (alerts: AlertItem[]) => void;
  addAlert: (alert: AlertItem, showToast?: boolean) => void;
  addAlertsBatch: (newAlerts: AlertItem[]) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissToast: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: MOCK_ALERTS,
  unreadCount: MOCK_ALERTS.filter((a) => !a.isRead).length,
  activeToastAlert: null,
  setAlerts: (alerts) =>
    set({
      alerts,
      unreadCount: alerts.filter((a) => !a.isRead).length,
    }),
  addAlert: (alert, showToast = true) =>
    set((state) => {
      // Deduplicate using ID
      if (state.alerts.some((a) => a.id === alert.id)) {
        return state;
      }
      const newAlerts = [alert, ...state.alerts];
      return {
        alerts: newAlerts,
        unreadCount: newAlerts.filter((a) => !a.isRead).length,
        activeToastAlert: showToast ? alert : state.activeToastAlert,
      };
    }),
  addAlertsBatch: (newAlerts) =>
    set((state) => {
      const existingIds = new Set(state.alerts.map((a) => a.id));
      const genuinelyNew = newAlerts.filter((a) => !existingIds.has(a.id));
      if (genuinelyNew.length === 0) return state;

      const merged = [...genuinelyNew, ...state.alerts];
      return {
        alerts: merged,
        unreadCount: merged.filter((a) => !a.isRead).length,
        activeToastAlert: genuinelyNew[0] || state.activeToastAlert,
      };
    }),
  markAsRead: (id) =>
    set((state) => {
      const newAlerts = state.alerts.map((a) =>
        a.id === id ? { ...a, isRead: true } : a
      );
      return {
        alerts: newAlerts,
        unreadCount: newAlerts.filter((a) => !a.isRead).length,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, isRead: true })),
      unreadCount: 0,
    })),
  dismissToast: () => set({ activeToastAlert: null }),
}));
