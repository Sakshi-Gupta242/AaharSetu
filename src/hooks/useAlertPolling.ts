import { useEffect, useRef } from 'react';
import { useAlertStore } from '../stores/alertStore';
import { fetchAlertsApi } from '../mocks/alertData';

export function useAlertPolling(pollingIntervalMs = 3000) {
  const addAlertsBatch = useAlertStore((state) => state.addAlertsBatch);
  const isPollingRef = useRef(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    const executePoll = async () => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        const latestAlerts = await fetchAlertsApi();
        if (latestAlerts && latestAlerts.length > 0) {
          addAlertsBatch(latestAlerts);
        }
      } catch (err) {
        console.warn('Alert polling check encountered transient error:', err);
      } finally {
        isPollingRef.current = false;
      }
    };

    timerId = setInterval(executePoll, pollingIntervalMs);

    return () => {
      clearInterval(timerId);
    };
  }, [addAlertsBatch, pollingIntervalMs]);
}
