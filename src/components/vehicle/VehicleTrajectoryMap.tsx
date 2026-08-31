import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import { 
  Plus, 
  Minus, 
  Maximize2, 
  Route
} from 'lucide-react';
import { VehicleProfile, VehicleDetection } from '../../types/vehicle';
import { formatDateTime } from '../../utils/formatters';

const DARK_TACTICAL_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'carto-dark-basemap': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap, © CARTO',
    },
  },
  layers: [
    {
      id: 'carto-dark-basemap-layer',
      type: 'raster',
      source: 'carto-dark-basemap',
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

// Calculate geographic bounds for trajectory [minLng, minLat, maxLng, maxLat]
function calculateTrajectoryBounds(detections: VehicleDetection[]): [number, number, number, number] {
  if (!detections.length) {
    return [77.05, 28.45, 77.35, 28.75];
  }
  let minLng = detections[0].coordinates[0];
  let maxLng = detections[0].coordinates[0];
  let minLat = detections[0].coordinates[1];
  let maxLat = detections[0].coordinates[1];

  detections.forEach((d) => {
    if (d.coordinates[0] < minLng) minLng = d.coordinates[0];
    if (d.coordinates[0] > maxLng) maxLng = d.coordinates[0];
    if (d.coordinates[1] < minLat) minLat = d.coordinates[1];
    if (d.coordinates[1] > maxLat) maxLat = d.coordinates[1];
  });

  return [minLng, minLat, maxLng, maxLat];
}

interface VehicleTrajectoryMapProps {
  profile: VehicleProfile | null;
  selectedDetectionId: string | null;
  onSelectDetection: (detection: VehicleDetection) => void;
  className?: string;
}

export const VehicleTrajectoryMap: React.FC<VehicleTrajectoryMapProps> = ({
  profile,
  selectedDetectionId,
  onSelectDetection,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const hoverPopupRef = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  const detections = useMemo(() => profile?.detections || [], [profile]);

  // Find index of the currently selected detection
  const selectedIndex = useMemo(() => {
    if (!selectedDetectionId || !detections.length) return -1;
    return detections.findIndex((d) => d.id === selectedDetectionId);
  }, [selectedDetectionId, detections]);

  // Prepare GeoJSON LineString representations (Full / Past / Active / Future)
  const trajectoryLinesGeoJSON = useMemo(() => {
    if (detections.length < 2) {
      return {
        type: 'FeatureCollection' as const,
        features: [],
      };
    }

    const allCoords = detections.map((d) => d.coordinates);

    // If no point is selected, render full line as active
    if (selectedIndex === -1) {
      return {
        type: 'FeatureCollection' as const,
        features: [
          {
            type: 'Feature' as const,
            properties: { lineType: 'active' },
            geometry: {
              type: 'LineString' as const,
              coordinates: allCoords,
            },
          },
        ],
      };
    }

    const features: GeoJSON.Feature<GeoJSON.LineString>[] = [];

    // 1. Past trail (from start to selectedIndex)
    if (selectedIndex > 0) {
      const pastCoords = allCoords.slice(0, selectedIndex + 1);
      if (pastCoords.length >= 2) {
        features.push({
          type: 'Feature',
          properties: { lineType: 'past' },
          geometry: {
            type: 'LineString',
            coordinates: pastCoords,
          },
        });
      }
    }

    // 2. Active emphasized context segment (around selectedIndex)
    const activeStart = Math.max(0, selectedIndex - 1);
    const activeEnd = Math.min(allCoords.length, selectedIndex + 2);
    const activeCoords = allCoords.slice(activeStart, activeEnd);
    if (activeCoords.length >= 2) {
      features.push({
        type: 'Feature',
        properties: { lineType: 'active' },
        geometry: {
          type: 'LineString',
          coordinates: activeCoords,
        },
      });
    }

    // 3. Future trail (from selectedIndex to end)
    if (selectedIndex < allCoords.length - 1) {
      const futureCoords = allCoords.slice(selectedIndex);
      if (futureCoords.length >= 2) {
        features.push({
          type: 'Feature',
          properties: { lineType: 'future' },
          geometry: {
            type: 'LineString',
            coordinates: futureCoords,
          },
        });
      }
    }

    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [detections, selectedIndex]);

  // Prepare GeoJSON Points for all waypoints
  const trajectoryPointsGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: detections.map((d, idx) => {
        let pointRole: 'start' | 'latest' | 'regular' = 'regular';
        if (idx === 0) pointRole = 'start';
        else if (idx === detections.length - 1) pointRole = 'latest';

        return {
          type: 'Feature' as const,
          properties: {
            id: d.id,
            sequenceNumber: idx + 1,
            pointRole,
            cameraId: d.cameraId,
            cameraName: d.cameraName || d.cameraId,
            location: d.location,
            timestamp: d.timestamp,
            speedKmh: d.speedKmh,
            speedLimitKmh: d.speedLimitKmh,
            isFlagged: d.isFlagged || false,
          },
          geometry: {
            type: 'Point' as const,
            coordinates: d.coordinates,
          },
        };
      }),
    };
  }, [detections]);

  // Prepare GeoJSON for selected point
  const selectedPointGeoJSON = useMemo(() => {
    if (selectedIndex === -1 || !detections[selectedIndex]) {
      return {
        type: 'FeatureCollection' as const,
        features: [],
      };
    }
    const sel = detections[selectedIndex];
    return {
      type: 'FeatureCollection' as const,
      features: [
        {
          type: 'Feature' as const,
          properties: {
            id: sel.id,
            sequenceNumber: selectedIndex + 1,
          },
          geometry: {
            type: 'Point' as const,
            coordinates: sel.coordinates,
          },
        },
      ],
    };
  }, [detections, selectedIndex]);

  // 1. Initialize MapLibre GL Map strictly ONCE
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map: maplibregl.Map;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: DARK_TACTICAL_STYLE,
        center: [77.2090, 28.6139],
        zoom: 11.5,
        attributionControl: false,
      });

      mapRef.current = map;

      hoverPopupRef.current = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'tactical-map-popup',
        offset: 12,
      });

      map.on('load', () => {
        setMapLoaded(true);

        // Add Trajectory Lines Source
        map.addSource('trajectory-lines-source', {
          type: 'geojson',
          data: trajectoryLinesGeoJSON as unknown as GeoJSON.GeoJSON,
        });

        // Layer: Past Trail (Faded Cyan/Slate)
        map.addLayer({
          id: 'trajectory-past-line',
          type: 'line',
          source: 'trajectory-lines-source',
          filter: ['==', ['get', 'lineType'], 'past'],
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#0891b2',
            'line-width': 3,
            'line-opacity': 0.45,
          },
        });

        // Layer: Future Trail (Subtle Dashed)
        map.addLayer({
          id: 'trajectory-future-line',
          type: 'line',
          source: 'trajectory-lines-source',
          filter: ['==', ['get', 'lineType'], 'future'],
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#64748b',
            'line-width': 2.5,
            'line-opacity': 0.4,
            'line-dasharray': [2, 2],
          },
        });

        // Layer: Active Emphasized Segment (Cyan with Casing Glow)
        map.addLayer({
          id: 'trajectory-active-casing',
          type: 'line',
          source: 'trajectory-lines-source',
          filter: ['==', ['get', 'lineType'], 'active'],
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': 'rgba(6, 182, 212, 0.3)',
            'line-width': 9,
          },
        });

        map.addLayer({
          id: 'trajectory-active-line',
          type: 'line',
          source: 'trajectory-lines-source',
          filter: ['==', ['get', 'lineType'], 'active'],
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#22d3ee',
            'line-width': 4.5,
            'line-opacity': 0.95,
          },
        });

        // Add Trajectory Points Source
        map.addSource('trajectory-points-source', {
          type: 'geojson',
          data: trajectoryPointsGeoJSON as unknown as GeoJSON.GeoJSON,
        });

        // Layer: Waypoint Circles (Base Layer)
        map.addLayer({
          id: 'trajectory-points-base',
          type: 'circle',
          source: 'trajectory-points-source',
          paint: {
            'circle-color': [
              'match',
              ['get', 'pointRole'],
              'start', '#10b981',   // Emerald for Start
              'latest', '#f43f5e',  // Rose for Latest
              '#06b6d4'             // Cyan for Waypoint
            ],
            'circle-radius': [
              'match',
              ['get', 'pointRole'],
              'start', 8,
              'latest', 8,
              6.5
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#090d16',
            'circle-opacity': 0.95,
          },
        });

        // Layer: Waypoint Sequence Numbers Label
        map.addLayer({
          id: 'trajectory-points-labels',
          type: 'symbol',
          source: 'trajectory-points-source',
          layout: {
            'text-field': '{sequenceNumber}',
            'text-size': 10,
            'text-offset': [0, -1.4],
            'text-font': ['Open Sans Bold'],
            'text-allow-overlap': true,
          },
          paint: {
            'text-color': '#e2e8f0',
            'text-halo-color': '#090d16',
            'text-halo-width': 1.5,
          },
        });

        // Add Selected Point Highlight Source & Layer
        map.addSource('selected-point-source', {
          type: 'geojson',
          data: selectedPointGeoJSON as unknown as GeoJSON.GeoJSON,
        });

        map.addLayer({
          id: 'selected-point-halo',
          type: 'circle',
          source: 'selected-point-source',
          paint: {
            'circle-radius': 18,
            'circle-color': 'rgba(34, 211, 238, 0.25)',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#38bdf8',
          },
        });

        // Click Event: Waypoint click on map selects detection
        map.on('click', 'trajectory-points-base', (e) => {
          const feature = e.features?.[0];
          if (feature) {
            const detId = feature.properties?.id;
            const det = detections.find((d) => d.id === detId);
            if (det) {
              onSelectDetection(det);
              const geom = feature.geometry as GeoJSON.Point;
              map.easeTo({
                center: [geom.coordinates[0], geom.coordinates[1]],
                duration: 500,
              });
            }
          }
        });

        // Hover Tooltip: Show Waypoint Metadata
        map.on('mouseenter', 'trajectory-points-base', (e) => {
          map.getCanvas().style.cursor = 'pointer';
          const feature = e.features?.[0];
          if (feature && hoverPopupRef.current) {
            const geom = feature.geometry as GeoJSON.Point;
            const props = feature.properties;
            const roleLabel =
              props?.pointRole === 'start'
                ? '<span class="text-emerald-400 font-bold">START NODE</span>'
                : props?.pointRole === 'latest'
                ? '<span class="text-rose-400 font-bold">LATEST NODE</span>'
                : `<span class="text-cyan-400 font-bold">WAYPOINT #${props?.sequenceNumber}</span>`;

            const popupHtml = `
              <div class="p-2 bg-slate-900 text-slate-200 border border-slate-700 rounded-md text-xs font-mono shadow-xl space-y-1">
                <div class="flex items-center justify-between gap-2 border-b border-slate-800 pb-1">
                  ${roleLabel}
                  <span class="text-slate-400">${props?.cameraId}</span>
                </div>
                <div class="font-semibold text-slate-100">${props?.location || ''}</div>
                <div class="text-[10px] text-slate-400">${formatDateTime(props?.timestamp || '')}</div>
                <div class="text-[10px] text-cyan-300">Speed: <strong>${props?.speedKmh} km/h</strong> (${props?.speedLimitKmh} limit)</div>
              </div>
            `;

            hoverPopupRef.current
              .setLngLat([geom.coordinates[0], geom.coordinates[1]])
              .setHTML(popupHtml)
              .addTo(map);
          }
        });

        map.on('mouseleave', 'trajectory-points-base', () => {
          map.getCanvas().style.cursor = '';
          hoverPopupRef.current?.remove();
        });
      });
    } catch (e) {
      console.error('Failed to initialize Vehicle Trajectory Map:', e);
    }

    return () => {
      hoverPopupRef.current?.remove();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Reactively update GeoJSON data when lines or points change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const linesSource = map.getSource('trajectory-lines-source') as maplibregl.GeoJSONSource;
    if (linesSource) {
      linesSource.setData(trajectoryLinesGeoJSON as unknown as GeoJSON.GeoJSON);
    }

    const pointsSource = map.getSource('trajectory-points-source') as maplibregl.GeoJSONSource;
    if (pointsSource) {
      pointsSource.setData(trajectoryPointsGeoJSON as unknown as GeoJSON.GeoJSON);
    }

    const selectedSource = map.getSource('selected-point-source') as maplibregl.GeoJSONSource;
    if (selectedSource) {
      selectedSource.setData(selectedPointGeoJSON as unknown as GeoJSON.GeoJSON);
    }
  }, [trajectoryLinesGeoJSON, trajectoryPointsGeoJSON, selectedPointGeoJSON, mapLoaded]);

  // 3. Reactively fit bounds when profile/vehicle changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !detections.length) return;

    const bounds = calculateTrajectoryBounds(detections);
    map.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        duration: 800,
        maxZoom: 14,
      }
    );
  }, [profile?.plateNumber, mapLoaded]);

  // 4. Reactively ease to selected waypoint when selectedDetectionId changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || selectedIndex === -1) return;

    const selectedDet = detections[selectedIndex];
    if (selectedDet) {
      map.easeTo({
        center: selectedDet.coordinates,
        duration: 600,
      });
    }
  }, [selectedDetectionId, selectedIndex, mapLoaded]);

  // Controls
  const handleZoomIn = () => {
    mapRef.current?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut({ duration: 300 });
  };

  const handleResetBounds = () => {
    const map = mapRef.current;
    if (!map || !detections.length) return;

    const bounds = calculateTrajectoryBounds(detections);
    map.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding: 60,
        duration: 800,
        maxZoom: 14,
      }
    );
  };

  return (
    <div className={`relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800/90 bg-[#090d16] shadow-xl flex flex-col ${className}`}>
      {/* Map Mount Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 relative z-0" />

      {/* Top Left HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-mono">
          <Route className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-200 font-semibold">SURVEILLANCE TRACE</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-bold">
            {profile ? profile.plateNumber : 'NO TARGET'}
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">
            {detections.length} Waypoints
          </span>
          {selectedIndex !== -1 && (
            <>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400 font-bold">Node #{selectedIndex + 1} Selected</span>
            </>
          )}
        </div>
      </div>

      {/* Top Right Legend */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2 rounded-lg shadow-lg flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
            <span>Start</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-white" />
            <span>Latest</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-slate-900" />
            <span>Node</span>
          </div>
        </div>
      </div>

      {/* Bottom Right Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-1.5">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-slate-800 w-full" />
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-slate-800 w-full" />
          <button
            onClick={handleResetBounds}
            className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Fit Full Route Bounds"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
