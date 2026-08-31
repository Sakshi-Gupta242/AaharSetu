import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ScanSearch, 
  SearchX, 
  Loader2
} from 'lucide-react';
import { PlateSearchHeader } from '../components/vehicle/PlateSearchHeader';
import { VehicleProfileCard } from '../components/vehicle/VehicleProfileCard';
import { VehicleTimeline } from '../components/vehicle/VehicleTimeline';
import { VehicleTrajectoryMap } from '../components/vehicle/VehicleTrajectoryMap';
import { getVehicleProfile, normalizePlateNumber } from '../mocks/vehicleData';
import { VehicleProfile, VehicleDetection } from '../types/vehicle';
import { useMapStore } from '../stores/mapStore';

export const VehicleInvestigation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedVehicleFromStore = useMapStore((state) => state.selectedVehiclePlate);
  const investigationContext = useMapStore((state) => state.investigationContext);
  const setSelectedVehicleInStore = useMapStore((state) => state.setSelectedVehicle);

  const [inputPlate, setInputPlate] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchedPlate, setSearchedPlate] = useState<string>('');
  const [currentProfile, setCurrentProfile] = useState<VehicleProfile | null>(null);
  const [selectedDetectionId, setSelectedDetectionId] = useState<string | null>(null);

  // Target event ID to focus on when loaded from an alert
  const targetEventIdRef = useRef<string | null>(null);

  // Perform search with simulated loading delay
  const executeSearch = useCallback((rawPlate: string, targetEventId?: string | null) => {
    const normalized = normalizePlateNumber(rawPlate);
    if (!normalized) return;

    if (targetEventId) {
      targetEventIdRef.current = targetEventId;
    }

    setInputPlate(normalized);
    setSearchedPlate(normalized);
    setIsSearching(true);
    setHasSearched(true);
    
    // Update URL params
    const nextParams: Record<string, string> = { plate: normalized };
    if (targetEventIdRef.current) {
      nextParams.eventId = targetEventIdRef.current;
    }
    setSearchParams(nextParams);
    setSelectedVehicleInStore(normalized);

    // Simulate subtle tactical network lookup
    setTimeout(() => {
      const profile = getVehicleProfile(normalized);
      setCurrentProfile(profile);

      if (profile && profile.detections.length > 0) {
        let matchedDet: VehicleDetection | undefined;

        // 1. Try matching target eventId
        if (targetEventIdRef.current) {
          matchedDet = profile.detections.find(
            (d) => d.id === targetEventIdRef.current || d.eventId === targetEventIdRef.current
          );
        }

        // 2. Try matching camera from investigation context if no event match
        if (!matchedDet && investigationContext?.cameraId) {
          matchedDet = profile.detections.find(
            (d) => d.cameraId === investigationContext.cameraId
          );
        }

        // 3. Fallback to latest detection
        if (!matchedDet) {
          matchedDet = profile.detections[profile.detections.length - 1];
        }

        setSelectedDetectionId(matchedDet.id);
      } else {
        setSelectedDetectionId(null);
      }
      setIsSearching(false);
    }, 250);
  }, [setSearchParams, setSelectedVehicleInStore, investigationContext]);

  // Initial mount: Check URL query param, investigation context, or store value
  useEffect(() => {
    const urlPlate = searchParams.get('plate');
    const urlEventId = searchParams.get('eventId');
    const targetPlate = urlPlate || investigationContext?.plate || selectedVehicleFromStore;
    const targetEvent = urlEventId || investigationContext?.relatedEventId;

    if (targetPlate) {
      executeSearch(targetPlate, targetEvent);
    }
  }, []);

  const handleSelectDetection = (detection: VehicleDetection) => {
    setSelectedDetectionId(detection.id);
    // Keep URL in sync with selected event
    if (searchedPlate) {
      setSearchParams({ plate: searchedPlate, eventId: detection.id });
    }
  };

  const handleManualSearch = (plate: string) => {
    targetEventIdRef.current = null; // Clear alert event constraint for manual searches
    executeSearch(plate, null);
  };

  return (
    <div className="space-y-5 flex flex-col h-full">
      {/* 1. Search Header Area */}
      <PlateSearchHeader
        currentPlate={inputPlate}
        onSearch={handleManualSearch}
        isLoading={isSearching}
      />

      {/* Loading State */}
      {isSearching && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Querying City-Wide Camera Mesh...</h3>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Reconstructing spatial trajectory records for <strong className="text-cyan-300">{searchedPlate}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Initial State (Before searching) */}
      {!hasSearched && !isSearching && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center space-y-4 shadow-xl flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shadow-inner">
            <ScanSearch className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="max-w-md">
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              Surveillance Investigation Ready
            </h3>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Enter a vehicle registration number above to begin an ANPR spatial trajectory investigation.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Quick query:</span>
            {['DL01AB1234', 'KA05MH9988', 'MH12PQ4567'].map((demo) => (
              <button
                key={demo}
                onClick={() => handleManualSearch(demo)}
                className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-500 transition cursor-pointer"
              >
                {demo}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Not Found State */}
      {hasSearched && !isSearching && !currentProfile && (
        <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-12 text-center space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400">
            <SearchX className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">No Vehicle Detections Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              No historical ANPR sightings recorded matching registration number <code className="font-mono text-cyan-400 font-bold">{searchedPlate}</code>.
            </p>
          </div>
        </div>
      )}

      {/* Found State: Profile + Map & Timeline Split View */}
      {hasSearched && !isSearching && currentProfile && (
        <>
          {/* 2. Target Profile Metadata Card */}
          <VehicleProfileCard profile={currentProfile} />

          {/* 3. Bottom Split View: Trajectory Map & Chronological Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-[520px]">
            {/* Left Column: MapLibre Trajectory Map (7 cols) */}
            <div className="lg:col-span-7 flex flex-col min-h-[460px]">
              <VehicleTrajectoryMap
                profile={currentProfile}
                selectedDetectionId={selectedDetectionId}
                onSelectDetection={handleSelectDetection}
              />
            </div>

            {/* Right Column: Interactive Surveillance Timeline (5 cols) */}
            <div className="lg:col-span-5 flex flex-col min-h-[460px]">
              <VehicleTimeline
                detections={currentProfile.detections}
                selectedDetectionId={selectedDetectionId}
                onSelectDetection={handleSelectDetection}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
