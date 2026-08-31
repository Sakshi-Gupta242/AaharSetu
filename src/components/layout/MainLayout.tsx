import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { HeaderFilterBar } from './HeaderFilterBar';
import { AlertToastNotification } from '../alerts/AlertToastNotification';
import { useAlertPolling } from '../../hooks/useAlertPolling';

export const MainLayout: React.FC = () => {
  // Initialize 3000ms polling for live alerts
  useAlertPolling(3000);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-200 relative">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Execution Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Global Filter Bar */}
        <HeaderFilterBar />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto min-h-0 bg-[#090d16] p-4 lg:p-6 relative">
          <Outlet />
        </main>
      </div>

      {/* Non-Blocking Toast Notification for incoming alerts */}
      <AlertToastNotification />
    </div>
  );
};
