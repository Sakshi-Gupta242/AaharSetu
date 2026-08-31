import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as maplibregl from 'maplibre-gl';
import { 
  Plus, 
  Minus, 
  Maximize2, 
  Share2, 
  Clock, 
  Gauge, 
  Activity, 
  X
} from 'lucide-react';
import { ODRoute } from '../../types/analytics';
import { formatNumber } from '../../utils/formatters';

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

function calculateODBounds(routes: ODRoute[]): [number, number, number, number] {
  if (!routes.length) {
    return [77.05, 28.45, 77.35, 28.75];
  }
  let minLng = routes[0].originCoordinates[0];
  let maxLng = routes[0].originCoordinates[0];
  let minLat = routes[0].originCoordinates[1];
  let maxLat = routes[0].originCoordinates[1];

  routes.forEach((r) => {
    [r.originCoordinates, r.destinationCoordinates].forEach((coord) => {
      if (coord[0] < minLng) minLng = coord[0];
      if (coord[0] > maxLng) maxLng = coord[0];
      if (coord[1] < minLat) minLat = coord[1];
      if (coord[1] > maxLat) maxLat = coord[1];
    });
  });

  return [minLng, minLat, maxLng, maxLat];
}

// Generate subtle curved arc coordinates between 2 points to avoid overlap
function generateCurvedPath(
  start: [number, number],
  end: [number, number],
  offsetFraction = 0.08
): [number, number][] {
  const points: [number, number][] = [];
  const numSegments = 16;
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const midX = (start[0] + end[0]) / 2;
  const midY = (start[1] + end[1]) / 2;

  // Normal vector to the line
  const normX = -dy * offsetFraction;
  const normY = dx * offsetFraction;

  const ctrlX = midX + normX;
  const ctrlY = midY + normY;

  for (let i = 0; i <= numSegments; i++) {
    const t = i / numSegments;
    const x = (1 - t) * (1 - t) * start[0] + 2 * (1 - t) * t * ctrlX + t * t * end[0];
    const y = (1 - t) * (1 - t) * start[1] + 2 * (1 - t) * t * ctrlY + t * t * end[1];
    points.push([Number(x.toFixed(5)), Number(y.toFixed(5))]);
  }

  return points;
}

interface ODFlowMapProps {
  routes: ODRoute[];
  selectedRouteId: string | null;
  onSelectRoute: (route: ODRoute | null) => void;
  className?: string;
}

export const ODFlowMap: React.FC<ODFlowMapProps> = ({
  routes,
  selectedRouteId,
  onSelectRoute,
  className = '',
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Top 10 Routes strictly to avoid spaghetti map
  const top10Routes = useMemo(() => {
    return [...routes].sort((a, b) => b.vehicleVolume - a.vehicleVolume).slice(0, 10);
  }, [routes]);

  const selectedRoute = useMemo(() => {
    if (!selectedRouteId) return null;
    return top10Routes.find((r) => r.routeId === selectedRouteId) || null;
  }, [selectedRouteId, top10Routes]);

  // GeoJSON LineStrings for OD Corridors
  const odLinesGeoJSON = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: top10Routes.map((route, idx) => {
        // Curve offset slightly alternates
        const offset = (idx % 2 === 0 ? 1 : -1) * (0.05 + (idx % 3) * 0.03);
        const curvedCoords = generateCurvedPath(route.originCoordinates, route.destinationCoordinates, offset);

        const isSelected = selectedRouteId === route.routeId;
        const isDimmed = Boolean(selectedRouteId && !isSelected);

        return {
          type: 'Feature' as const,
          properties: {
            routeId: route.routeId,
            originName: route.originName,
            destinationName: route.destinationName,
            vehicleVolume: route.vehicleVolume,
            averageTravelTimeMinutes: route.averageTravelTimeMinutes,
            averageSpeedKmh: route.averageSpeedKmh,
            isSelected,
            isDimmed,
            rank: idx + 1,
          },
          geometry: {
            type: 'LineString' as const,
            coordinates: curvedCoords,
          },
        };
      }),
    };
  }, [top10Routes, selectedRouteId]);

  // GeoJSON Points for Origin & Destination Nodes
  const odNodesGeoJSON = useMemo(() => {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = [];
    top10Routes.forEach((route, idx) => {
      features.push({
        type: 'Feature',
        properties: {
          nodeType: 'origin',
          name: route.originName,
          routeId: route.routeId,
          rank: idx + 1,
        },
        geometry: {
          type: 'Point',
          coordinates: route.originCoordinates,
        },
      });
      features.push({
        type: 'Feature',
        properties: {
          nodeType: 'destination',
          name: route.destinationName,
          routeId: route.routeId,
          rank: idx + 1,
        },
        geometry: {
          type: 'Point',
          coordinates: route.destinationCoordinates,
        },
      });
    });
    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, [top10Routes]);

  // 1. Initialize MapLibre GL Map strictly ONCE
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map: maplibregl.Map;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: DARK_TACTICAL_STYLE,
        center: [77.2090, 28.6139],
        zoom: 11.2,
        attributionControl: false,
      });

      mapRef.current = map;

      map.on('load', () => {
        setMapLoaded(true);

        // Add OD Lines Source
        map.addSource('od-lines-source', {
          type: 'geojson',
          data: odLinesGeoJSON as unknown as GeoJSON.GeoJSON,
        });

        // Layer: OD Background Casing Glow (for active/high-volume routes)
        map.addLayer({
          id: 'od-lines-casing',
          type: 'line',
          source: 'od-lines-source',
          paint: {
            'line-color': [
              'case',
              ['get', 'isSelected'], 'rgba(34, 211, 238, 0.4)',
              'rgba(6, 182, 212, 0.15)'
            ],
            'line-width': [
              'interpolate',
              ['linear'],
              ['get', 'vehicleVolume'],
              14000, 5,
              35000, 12,
            ],
            'line-opacity': [
              'case',
              ['get', 'isDimmed'], 0.1,
              0.85
            ],
          },
        });

        // Layer: Primary OD Flow Corridors
        map.addLayer({
          id: 'od-lines-primary',
          type: 'line',
          source: 'od-lines-source',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': [
              'case',
              ['get', 'isSelected'], '#22d3ee',
              ['==', ['get', 'rank'], 1], '#f43f5e', // Highest route in rose
              ['<=', ['get', 'rank'], 3], '#f59e0b', // Top 2-3 in amber
              '#06b6d4' // Other top routes in cyan
            ],
            'line-width': [
              'interpolate',
              ['linear'],
              ['get', 'vehicleVolume'],
              14000, 2.5,
              35000, 6.5,
            ],
            'line-opacity': [
              'case',
              ['get', 'isDimmed'], 0.2,
              0.95
            ],
          },
        });

        // Add OD Nodes Source
        map.addSource('od-nodes-source', {
          type: 'geojson',
          data: odNodesGeoJSON as unknown as GeoJSON.GeoJSON,
        });

        // Layer: Origin & Destination Node Pins
        map.addLayer({
          id: 'od-nodes-layer',
          type: 'circle',
          source: 'od-nodes-source',
          paint: {
            'circle-color': [
              'match',
              ['get', 'nodeType'],
              'origin', '#10b981',      // Emerald for Origins
              'destination', '#f43f5e', // Rose for Destinations
              '#06b6d4'
            ],
            'circle-radius': 6,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#090d16',
            'circle-opacity': 0.95,
          },
        });

        // Interaction: Click route on map
        map.on('click', 'od-lines-primary', (e) => {
          const feature = e.features?.[0];
          if (feature) {
            const rId = feature.properties?.routeId;
            const routeObj = top10Routes.find((r) => r.routeId === rId);
            if (routeObj) {
              onSelectRoute(routeObj);
            }
          }
        });

        map.on('mouseenter', 'od-lines-primary', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'od-lines-primary', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    } catch (e) {
      console.error('Failed to initialize OD Flow Map:', e);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Reactively update GeoJSON when routes or selection change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const linesSource = map.getSource('od-lines-source') as maplibregl.GeoJSONSource;
    if (linesSource) {
      linesSource.setData(odLinesGeoJSON as unknown as GeoJSON.GeoJSON);
    }

    const nodesSource = map.getSource('od-nodes-source') as maplibregl.GeoJSONSource;
    if (nodesSource) {
      nodesSource.setData(odNodesGeoJSON as unknown as GeoJSON.GeoJSON);
    }
  }, [odLinesGeoJSON, odNodesGeoJSON, mapLoaded]);

  // 3. Reactively focus map when route selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded || !selectedRoute) return;

    const minLng = Math.min(selectedRoute.originCoordinates[0], selectedRoute.destinationCoordinates[0]);
    const maxLng = Math.max(selectedRoute.originCoordinates[0], selectedRoute.destinationCoordinates[0]);
    const minLat = Math.min(selectedRoute.originCoordinates[1], selectedRoute.destinationCoordinates[1]);
    const maxLat = Math.max(selectedRoute.originCoordinates[1], selectedRoute.destinationCoordinates[1]);

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: { top: 80, bottom: 80, left: 80, right: 80 },
        duration: 700,
        maxZoom: 13.5,
      }
    );
  }, [selectedRouteId, selectedRoute, mapLoaded]);

  // Controls
  const handleZoomIn = () => mapRef.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => mapRef.current?.zoomOut({ duration: 300 });

  const handleResetBounds = () => {
    const map = mapRef.current;
    if (!map || !top10Routes.length) return;
    onSelectRoute(null);
    const bounds = calculateODBounds(top10Routes);
    map.fitBounds(
      [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]],
      ],
      {
        padding: 50,
        duration: 800,
        maxZoom: 12.5,
      }
    );
  };

  return (
    <div className={`relative w-full h-full min-h-[460px] rounded-xl overflow-hidden border border-slate-800/90 bg-[#090d16] shadow-2xl flex flex-col ${className}`}>
      {/* Map Mount Container */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 relative z-0" />

      {/* Top Left HUD */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-mono">
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-200 font-semibold">OD FLOW MESH</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-300 font-bold">Top 10 Arterial Corridors</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-semibold">Anti-Spaghetti Filtered</span>
        </div>
      </div>

      {/* Top Right Legend */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2 rounded-lg shadow-lg flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-slate-900" />
            <span>Origin Hub</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-slate-900" />
            <span>Destination</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-300">
            <div className="w-6 h-1 rounded bg-cyan-400" />
            <span>Flow Density</span>
          </div>
        </div>
      </div>

      {/* Selected Route Telemetry Panel */}
      {selectedRoute && (
        <div className="absolute bottom-4 left-4 z-20 w-84 max-w-[calc(100%-2rem)] bg-slate-900/95 backdrop-blur-md border border-cyan-500/60 rounded-xl p-4 shadow-2xl space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700 px-1.5 py-0.5 rounded">
                CORRIDOR
              </span>
              <span className="text-xs font-mono font-bold text-slate-100">
                {selectedRoute.routeId}
              </span>
            </div>
            <button
              onClick={() => onSelectRoute(null)}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="text-xs font-bold text-cyan-300">
              {selectedRoute.originName}
            </div>
            <div className="text-[10px] font-mono text-slate-400 py-0.5">↓ Flow Vector To</div>
            <div className="text-xs font-bold text-rose-300">
              {selectedRoute.destinationName}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-800/80">
            <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Activity className="w-2.5 h-2.5 text-cyan-400" />
                Volume
              </span>
              <div className="text-xs font-bold font-mono text-slate-100 mt-0.5">
                {formatNumber(selectedRoute.vehicleVolume)}
              </div>
            </div>

            <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-amber-400" />
                Transit
              </span>
              <div className="text-xs font-bold font-mono text-amber-300 mt-0.5">
                {selectedRoute.averageTravelTimeMinutes}m
              </div>
            </div>

            <div className="bg-slate-950/80 p-2 rounded border border-slate-800">
              <span className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1">
                <Gauge className="w-2.5 h-2.5 text-emerald-400" />
                Speed
              </span>
              <div className="text-xs font-bold font-mono text-emerald-300 mt-0.5">
                {selectedRoute.averageSpeedKmh}k
              </div>
            </div>
          </div>
        </div>
      )}

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
            title="Fit All OD Routes"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
