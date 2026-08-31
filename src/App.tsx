import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { CityOverview } from './pages/CityOverview';
import { VehicleInvestigation } from './pages/VehicleInvestigation';
import { TrafficAnalytics } from './pages/TrafficAnalytics';
import { Alerts } from './pages/Alerts';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<CityOverview />} />
          <Route path="investigation" element={<VehicleInvestigation />} />
          <Route path="analytics" element={<TrafficAnalytics />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
