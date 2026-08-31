import { create } from 'zustand';
import { InvestigationContext } from '../types/alerts';

export interface MapState {
  center: [number, number]; // [lng, lat]
  zoom: number;
  bounds: [number, number, number, number] | null; // [minLng, minLat, maxLng, maxLat]
  selectedCameraId: string | null;
  selectedVehiclePlate: string | null;
  investigationContext: InvestigationContext | null;
  setViewport: (center: [number, number], zoom: number, bounds?: [number, number, number, number] | null) => void;
  setSelectedCamera: (cameraId: string | null) => void;
  setSelectedVehicle: (plate: string | null) => void;
  setInvestigationContext: (context: InvestigationContext | null) => void;
  clearSelection: () => void;
}

export const useMapStore = create<MapState>((set) => ({
  center: [77.2090, 28.6139], // Default city center (e.g. New Delhi metropolis)
  zoom: 12,
  bounds: null,
  selectedCameraId: null,
  selectedVehiclePlate: null,
  investigationContext: null,
  setViewport: (center, zoom, bounds = null) => set({ center, zoom, bounds }),
  setSelectedCamera: (cameraId) => set({ selectedCameraId: cameraId }),
  setSelectedVehicle: (plate) => set({ selectedVehiclePlate: plate }),
  setInvestigationContext: (context) => set({ 
    investigationContext: context,
    selectedVehiclePlate: context?.plate || null,
    selectedCameraId: context?.cameraId || null
  }),
  clearSelection: () => set({ 
    selectedCameraId: null, 
    selectedVehiclePlate: null,
    investigationContext: null 
  }),
}));
