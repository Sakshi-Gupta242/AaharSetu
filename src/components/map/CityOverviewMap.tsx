import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import { 
  Plus, 
  Minus, 
  Maximize2, 
  Flame, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useMapStore } from '../../stores/mapStore';
import { useFilterStore } from '../../stores/filterStore';
import { ALL_MOCK_CAMERAS, getCamerasGeoJSON, getTrafficHeatmapGeoJSON } from '../../mocks/geoCameraData';
import { CameraDetailPanel } from './CameraDetailPanel';
import { CameraItem } from '../../types/camera';

// Dark Command Center Base Style using Carto Dark Matter raster tiles (reliable, no API key required)
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

// Calculate geographic bounding box [minLng, minLat, maxLng, maxLat] from cameras list
function calculateBounds(cameras: CameraItem[]): [number, number, number, number] {
  if (!cameras.length) {
    return [77.05, 28.45, 77.35, 28.75];
  }
  let minLng = cameras[0].coordinates[0];
  let maxLng = cameras[0].coordinates[0];
  let minLat = cameras[0].coordinates[1];
  let maxLat = cameras[0].coordinates[1];

  cameras.forEach((c) => {
    if (c.coordinates[0] < minLng) minLng = c.coordinates[0];
    if (c.coordinates[0] > maxLng) maxLng = c.coordinates[0];
    if (c.coordinates[1] < minLat) minLat = c.coordinates[1];
    if (c.coordinates[1] > maxLat) maxLat = c.coordinates[1];
  });

  return [minLng, minLat, maxLng, maxLat];
}

interface CityOverviewMapProps {
  className?: string;
}

export const CityOverviewMap: React.FC<CityOverviewMapProps> = ({ className = '' }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [currentZoom, setCurrentZoom] = useState(12);
  const [currentCenter, setCurrentCenter] = useState<[number, number]>([77.2090, 28.6139]);

  // Zustand state subscriptions
  const selectedCameraId = useMapStore((state) => state.selectedCameraId);
  const setSelectedCamera = useMapStore((state) => state.setSelectedCamera);
  const setViewport = useMapStore((state) => state.setViewport);

  const selectedZone = useFilterStore((state) => state.selectedZone);
  const selectedCameraFilter = useFilterStore((state) => state.selectedCamera);
  const dateRange = useFilterStore((state) => state.dateRange);
  const timeOfDay = useFilterStore((state) => state.timeOfDay);

  // Compute active camera dataset based on zone filter
  const activeCameras = useMemo(() => {
    if (selectedZone === 'all') {
      return ALL_MOCK_CAMERAS;
    }
    return ALL_MOCK_CAMERAS.filter((c) => c.zoneId === selectedZone);
  }, [selectedZone]);

  // Find currently selected camera object
  const selectedCameraObject = useMemo(() => {
    if (!selectedCameraId) return null;
    return ALL_MOCK_CAMERAS.find((c) => c.id === selectedCameraId) || null;
  }, [selectedCameraId]);

  // 1. Initialize MapLibre GL instance strictly ONCE
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

      map.on('load', () => {
        setMapLoaded(true);

        // Add Traffic Heatmap GeoJSON Source
        map.addSource('traffic-heatmap-source', {
          type: 'geojson',
          data: getTrafficHeatmapGeoJSON(ALL_MOCK_CAMERAS) as unknown as GeoJSON.GeoJSON,
        });

        // Add Traffic Heatmap WebGL Layer
        map.addLayer({
          id: 'traffic-heatmap',
          type: 'heatmap',
          source: 'traffic-heatmap-source',
          maxzoom: 16,
          layout: {
            visibility: showHeatmap ? 'visible' : 'none',
          },
          paint: {
            // Increase the heatmap weight based on detectionCount
            'heatmap-weight': [
              'interpolate',
              ['linear'],
              ['get', 'detectionCount'],
              1000, 0.1,
              45000, 1.0,
            ],
            // Increase the heatmap color weight by zoom-level
            'heatmap-intensity': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10, 0.8,
              15, 2.5,
            ],
            // Color ramp for heatmap: transparent -> cyan -> emerald -> amber -> rose
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0, 'rgba(0, 0, 0, 0)',
              0.15, 'rgba(6, 182, 212, 0.3)',
              0.4, 'rgba(16, 185, 129, 0.55)',
              0.7, 'rgba(245, 158, 11, 0.75)',
              1.0, 'rgba(244, 63, 94, 0.95)',
            ],
            // Transition from heatmap to circle layer by zoom-level
            'heatmap-radius': [
              'interpolate',
              ['linear'],
              ['zoom'],
              10, 18,
              15, 38,
            ],
            'heatmap-opacity': 0.75,
          },
        });

        // Add Camera Point GeoJSON Source with Native Clustering
        map.addSource('cameras-source', {
          type: 'geojson',
          data: getCamerasGeoJSON(ALL_MOCK_CAMERAS) as unknown as GeoJSON.GeoJSON,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });

        // Layer: Cluster Circles (Colored & sized by point count)
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'cameras-source',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#0891b2', // cyan for < 10
              10,
              '#0284c7', // blue for 10-25
              25,
              '#059669', // emerald for 25-50
              50,
              '#d97706', // amber for 50+
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              18,
              10,
              22,
              25,
              26,
              50,
              32,
            ],
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#090d16',
            'circle-opacity': 0.92,
          },
        });

        // Layer: Cluster Count Number Label
        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'cameras-source',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-size': 12,
            'text-font': ['Open Sans Bold'],
          },
          paint: {
            'text-color': '#ffffff',
          },
        });

        // Layer: Individual Unclustered Camera Points
        map.addLayer({
          id: 'unclustered-cameras',
          type: 'circle',
          source: 'cameras-source',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': [
              'match',
              ['get', 'status'],
              'ONLINE', '#06b6d4',
              'DEGRADED', '#f59e0b',
              'OFFLINE', '#f43f5e',
              '#64748b'
            ],
            'circle-radius': 7,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#090d16',
            'circle-opacity': 0.95,
          },
        });

        // Layer: Selected Camera Highlight Pulse Ring
        map.addLayer({
          id: 'camera-selected-ring',
          type: 'circle',
          source: 'cameras-source',
          filter: ['all', ['!', ['has', 'point_count']], ['==', ['get', 'cameraId'], '']],
          paint: {
            'circle-radius': 16,
            'circle-color': 'rgba(6, 182, 212, 0.25)',
            'circle-stroke-width': 2.5,
            'circle-stroke-color': '#22d3ee',
          },
        });

        // Event: Cluster click smooth expansion zoom
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
          const clusterId = features[0]?.properties?.cluster_id;
          const source = map.getSource('cameras-source') as maplibregl.GeoJSONSource;

          if (source && clusterId !== undefined) {
            source.getClusterExpansionZoom(clusterId).then((expansionZoom: number) => {
              const geometry = features[0].geometry as GeoJSON.Point;
              map.easeTo({
                center: [geometry.coordinates[0], geometry.coordinates[1]],
                zoom: expansionZoom + 0.5,
                duration: 600,
              });
            });
          }
        });

        // Event: Individual camera click interaction
        map.on('click', 'unclustered-cameras', (e) => {
          const feature = e.features?.[0];
          if (feature) {
            const camId = feature.properties?.cameraId;
            if (camId) {
              setSelectedCamera(camId);
              const geom = feature.geometry as GeoJSON.Point;
              map.easeTo({
                center: [geom.coordinates[0], geom.coordinates[1]],
                duration: 500,
              });
            }
          }
        });

        // Pointer cursor interactions
        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'unclustered-cameras', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'unclustered-cameras', () => {
          map.getCanvas().style.cursor = '';
        });

        // Viewport tracking (synchronizing serializable state only)
        map.on('moveend', () => {
          const center = map.getCenter();
          const zoom = map.getZoom();
          setCurrentCenter([center.lng, center.lat]);
          setCurrentZoom(zoom);
          setViewport([center.lng, center.lat], zoom);
        });
      });

      map.on('error', (err) => {
        console.error('MapLibre WebGL error:', err);
      });
    } catch (e: any) {
      console.error('Failed to initialize MapLibre GL:', e);
      setMapError(e?.message || 'WebGL map initialization failed.');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Reactively update GeoJSON source data when activeCameras or filters change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const cameraSource = map.getSource('cameras-source') as maplibregl.GeoJSONSource;
    if (cameraSource) {
      cameraSource.setData(getCamerasGeoJSON(activeCameras) as unknown as GeoJSON.GeoJSON);
    }

    const heatmapSource = map.getSource('traffic-heatmap-source') as maplibregl.GeoJSONSource;
    if (heatmapSource) {
      heatmapSource.setData(getTrafficHeatmapGeoJSON(activeCameras) as unknown as GeoJSON.GeoJSON);
    }
  }, [activeCameras, mapLoaded, dateRange, timeOfDay]);

  // 3. Reactively update selected camera highlight ring
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (map.getLayer('camera-selected-ring')) {
      if (selectedCameraId) {
        map.setFilter('camera-selected-ring', [
          'all',
          ['!', ['has', 'point_count']],
          ['==', ['get', 'cameraId'], selectedCameraId],
        ]);
      } else {
        map.setFilter('camera-selected-ring', [
          'all',
          ['!', ['has', 'point_count']],
          ['==', ['get', 'cameraId'], ''],
        ]);
      }
    }
  }, [selectedCameraId, mapLoaded]);

  // 4. Reactively handle Zone selection from global filter (smooth fitBounds)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const bounds = calculateBounds(activeCameras);
    map.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        duration: 900,
        maxZoom: 13.5,
      }
    );
  }, [selectedZone, mapLoaded, activeCameras]);

  // 5. Reactively handle Camera selection from global filter dropdown
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (selectedCameraFilter && selectedCameraFilter !== 'all') {
      const cam = ALL_MOCK_CAMERAS.find((c) => c.id === selectedCameraFilter);
      if (cam) {
        setSelectedCamera(cam.id);
        map.easeTo({
          center: cam.coordinates,
          zoom: 15,
          duration: 900,
        });
      }
    }
  }, [selectedCameraFilter, mapLoaded, setSelectedCamera]);

  // 6. Toggle Heatmap Layer visibility
  const handleToggleHeatmap = () => {
    const nextState = !showHeatmap;
    setShowHeatmap(nextState);
    const map = mapRef.current;
    if (map && mapLoaded && map.getLayer('traffic-heatmap')) {
      map.setLayoutProperty('traffic-heatmap', 'visibility', nextState ? 'visible' : 'none');
    }
  };

  // 7. Manual Map Controls
  const handleZoomIn = () => {
    mapRef.current?.zoomIn({ duration: 300 });
  };

  const handleZoomOut = () => {
    mapRef.current?.zoomOut({ duration: 300 });
  };

  const handleResetBounds = () => {
    const map = mapRef.current;
    if (!map) return;
    setSelectedCamera(null);
    const bounds = calculateBounds(ALL_MOCK_CAMERAS);
    map.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding: 50,
        duration: 900,
        maxZoom: 12.5,
      }
    );
  };

  return (
    <div className={`relative w-full h-full min-h-[500px] rounded-xl overflow-hidden border border-slate-800/90 bg-[#090d16] shadow-2xl flex flex-col ${className}`}>
      {/* Map WebGL Canvas Mount Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 relative z-0" />

      {/* Top Left GIS HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-mono">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-semibold">GIS COMMAND MESH</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-medium">
            {currentCenter[1].toFixed(4)}°N, {currentCenter[0].toFixed(4)}°E
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">ZOOM {currentZoom.toFixed(1)}x</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-bold">{activeCameras.length} Nodes</span>
        </div>
      </div>

      {/* Top Right Controls: Heatmap & Layer Selector */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {/* Heatmap Toggle & Mini Legend */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-1.5 rounded-lg shadow-lg flex items-center gap-2">
          <button
            onClick={handleToggleHeatmap}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1.5 transition cursor-pointer border ${
              showHeatmap
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm shadow-rose-950 font-bold'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Toggle Traffic Density Heatmap"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap {showHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          {showHeatmap && (
            <div className="hidden sm:flex items-center gap-1.5 pl-1.5 border-l border-slate-700/80 text-[10px] font-mono text-slate-400">
              <span>Density:</span>
              <div className="w-16 h-2 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-amber-400 to-rose-500" />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Right Tactical Map Controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Zoom in"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-[1px] bg-slate-800 w-full" />
          <button
            onClick={handleZoomOut}
            className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Zoom out"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-lg p-1 flex flex-col gap-1 shadow-lg">
          <button
            onClick={handleResetBounds}
            className="p-2 rounded hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition cursor-pointer"
            title="Fit All Cameras / Reset Bounds"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Selected Camera Inspector Panel */}
      <CameraDetailPanel
        camera={selectedCameraObject}
        onClose={() => setSelectedCamera(null)}
      />

      {/* Map Initializing Loading Overlay */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 z-30 bg-[#090d16]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          <div className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider">
            Initializing MapLibre WebGL GIS Engine...
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Mounting spatial GeoJSON meshes & telemetry layers
          </span>
        </div>
      )}

      {/* Graceful Error State */}
      {mapError && (
        <div className="absolute inset-0 z-30 bg-[#090d16]/95 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-rose-300">WebGL GIS Initialization Issue</h3>
            <p className="text-xs text-slate-400 max-w-md mt-1">{mapError}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-lg border border-slate-700 flex items-center gap-2 cursor-pointer transition"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reload GIS Subsystem</span>
          </button>
        </div>
      )}
    </div>
  );
};
