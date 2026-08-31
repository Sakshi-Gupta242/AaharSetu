import { CameraItem, ZoneItem } from '../types/camera';

export interface CameraGeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    cameraId: string;
    code: string;
    name: string;
    status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
    totalDetectionsToday: number;
    lastDetectionTime: string;
    zone: string;
    zoneId: string;
    locationName: string;
    laneCount: number;
  };
}

export interface CameraGeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: CameraGeoJSONFeature[];
}

export interface HeatmapPointFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    detectionCount: number;
    density: number;
  };
}

export interface HeatmapGeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: HeatmapPointFeature[];
}

export const MOCK_ZONES: ZoneItem[] = [
  { id: 'zone-downtown', name: 'Downtown Central', code: 'ZN-DT', description: 'Commercial core and high-density financial district', cameraCount: 52 },
  { id: 'zone-north-corridor', name: 'North Highway Corridor', code: 'ZN-NH', description: 'National Highway 44 approach and outer ring road', cameraCount: 44 },
  { id: 'zone-tech-park', name: 'South Tech Corridor', code: 'ZN-ST', description: 'IT clusters, innovation hubs and arterial flyovers', cameraCount: 48 },
  { id: 'zone-airport', name: 'Airport Express Zone', code: 'ZN-AX', description: 'International terminal transit route and toll plazas', cameraCount: 32 },
  { id: 'zone-east-port', name: 'East Logistics Corridor', code: 'ZN-EL', description: 'Freight terminals, industrial warehouses and ring connector', cameraCount: 36 },
];

// Helper to generate realistic camera clusters around geographic anchors in the city
function generateRealisticCameras(): CameraItem[] {
  const anchors = [
    {
      zoneId: 'zone-downtown',
      zoneName: 'Downtown Central',
      prefix: 'CAM-1',
      center: [77.2195, 28.6315] as [number, number],
      spreadLng: 0.045,
      spreadLat: 0.035,
      count: 52,
      names: [
        'Connaught Circus Radial', 'Janpath Intersection', 'Barakhamba Crossing', 'Kasturba Gandhi Marg',
        'Mandi House Circle', 'Panchkuian Road Junction', 'Baba Kharak Singh Marg', 'Ashoka Road Gantry',
        'Parliament Street Access', 'Tolstoy Road East', 'India Gate North Radial', 'Rajpath West Axis',
        'Tilak Marg Gantry', 'Pragati Maidan Gate 4', 'ITO Flyover Approach', 'Vikas Marg Crossing',
        'Delhi Gate Roundabout', 'Asaf Ali Road North', 'Minto Bridge Underpass', 'DDU Marg Junction'
      ],
    },
    {
      zoneId: 'zone-north-corridor',
      zoneName: 'North Highway Corridor',
      prefix: 'CAM-2',
      center: [77.1580, 28.7250] as [number, number],
      spreadLng: 0.075,
      spreadLat: 0.065,
      count: 44,
      names: [
        'NH44 Outbound Toll Entry', 'Mukarba Chowk Flyover High Level', 'Singhu Border Checkpoint', 'GT Karnal Road Junction',
        'Azadpur Mandi Commercial Gate', 'Jahangirpuri Metro Pier', 'Model Town Radial Crossing', 'Wazirpur Industrial Entry',
        'Shalimar Bagh Outer Ring', 'Burari Bypass Interchange', 'Alipur Freight Weighbridge', 'Narela Industrial Connector',
        'Bawana Arterial Crossing', 'Badli Industrial Terminal'
      ],
    },
    {
      zoneId: 'zone-tech-park',
      zoneName: 'South Tech Corridor',
      prefix: 'CAM-3',
      center: [77.0850, 28.4850] as [number, number],
      spreadLng: 0.065,
      spreadLat: 0.055,
      count: 48,
      names: [
        'Cyber City Expressway Gantry', 'Golf Course Road Underpass', 'DLF Phase 2 Cyberhub Exit', 'MG Road Metro Pier 42',
        'Sohna Road Elevated Expressway', 'Udyog Vihar Phase 4 Gateway', 'Golf Course Extension Crossing', 'Ambience Island Gantry',
        'Shankar Chowk Cloverleaf', 'IFFCO Chowk Radial Flyover', 'Rajiv Chowk Underpass South', 'Subhash Chowk Arterial'
      ],
    },
    {
      zoneId: 'zone-airport',
      zoneName: 'Airport Express Zone',
      prefix: 'CAM-4',
      center: [77.0850, 28.5650] as [number, number],
      spreadLng: 0.055,
      spreadLat: 0.045,
      count: 32,
      names: [
        'Terminal 3 Departure Ramp', 'Terminal 3 Arrivals Outer Loop', 'Terminal 1 Domestic Plaza', 'Aerocity Hospitality District',
        'Mahipalpur Expressway Underpass', 'Cargo Terminal Access Gate 2', 'Northern Perimeter Road Gantry', 'Dwarka Expressway Link 1',
        'Tunnel Road Airside Perimeter', 'Dhaula Kuan Arterial Flyover', 'RTR Marg Airport Approach', 'IGI VIP Terminal Gateway'
      ],
    },
    {
      zoneId: 'zone-east-port',
      zoneName: 'East Logistics Corridor',
      prefix: 'CAM-5',
      center: [77.3150, 28.6250] as [number, number],
      spreadLng: 0.065,
      spreadLat: 0.060,
      count: 36,
      names: [
        'East Ring Freight Gantry', 'Anand Vihar ISBT Interchange', 'Ghazipur Border Truck Toll', 'Patparganj Industrial Area',
        'Noida Link Road Flyover', 'Mayur Vihar Phase 1 Crossing', 'Akshardham Radial Highway', 'Kalyanpuri Commercial Gantry',
        'Trilokpuri Sector Ring', 'Preet Vihar Metro Crossing', 'Karkardooma Court Circle', 'Geeta Colony Bridge East'
      ],
    },
  ];

  const cameras: CameraItem[] = [];
  let globalIdCounter = 100;

  anchors.forEach((zoneAnchor) => {
    for (let i = 0; i < zoneAnchor.count; i++) {
      globalIdCounter++;
      const idNum = (i + 1).toString().padStart(2, '0');
      const camId = `${zoneAnchor.prefix}${idNum}`;
      const nameTemplate = zoneAnchor.names[i % zoneAnchor.names.length];
      const name = `${nameTemplate} #${Math.floor(i / zoneAnchor.names.length) + 1}`;

      // Pseudo-random deterministic offsets based on index
      const angle = (i / zoneAnchor.count) * 2 * Math.PI + (i % 3) * 0.5;
      const radiusFraction = 0.2 + ((i * 17) % 80) / 100;
      const lng = zoneAnchor.center[0] + Math.cos(angle) * zoneAnchor.spreadLng * radiusFraction;
      const lat = zoneAnchor.center[1] + Math.sin(angle) * zoneAnchor.spreadLat * radiusFraction;

      // Status distribution: ~88% ONLINE/ACTIVE, ~8% DEGRADED, ~4% OFFLINE
      let status: 'ONLINE' | 'OFFLINE' | 'DEGRADED' = 'ONLINE';
      if (i % 23 === 0) {
        status = 'OFFLINE';
      } else if (i % 11 === 0) {
        status = 'DEGRADED';
      }

      // Realistic detection volume (4,000 - 45,000 vpd)
      const baseDetections = 8000 + ((i * 739) % 32000);
      const laneCount = 2 + (i % 4) * 2; // 2, 4, 6, 8

      cameras.push({
        id: camId,
        code: `${camId}-${zoneAnchor.zoneId.split('-')[1]?.toUpperCase() || 'ZN'}`,
        name,
        zoneId: zoneAnchor.zoneId,
        zoneName: zoneAnchor.zoneName,
        coordinates: [Number(lng.toFixed(5)), Number(lat.toFixed(5))],
        status,
        installedDate: `202${2 + (i % 3)}-0${1 + (i % 9)}-${10 + (i % 18)}`,
        laneCount,
        totalDetectionsToday: status === 'OFFLINE' ? Math.floor(baseDetections * 0.05) : baseDetections,
        lastDetectionTimestamp: status === 'OFFLINE' ? '4h ago' : status === 'DEGRADED' ? '45s ago' : 'Just now',
      });
    }
  });

  return cameras;
}

export const ALL_MOCK_CAMERAS: CameraItem[] = generateRealisticCameras();

// Convert camera items to GeoJSON FeatureCollection
export function getCamerasGeoJSON(cameras: CameraItem[] = ALL_MOCK_CAMERAS): CameraGeoJSONFeatureCollection {
  return {
    type: 'FeatureCollection',
    features: cameras.map((c) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: c.coordinates,
      },
      properties: {
        cameraId: c.id,
        code: c.code,
        name: c.name,
        status: c.status,
        totalDetectionsToday: c.totalDetectionsToday,
        lastDetectionTime: new Date(Date.now() - (c.status === 'OFFLINE' ? 14400000 : 30000)).toISOString(),
        zone: c.zoneName,
        zoneId: c.zoneId,
        locationName: c.name,
        laneCount: c.laneCount,
      },
    })),
  };
}

// Generate realistic WebGL Heatmap Points along major arterials
export function getTrafficHeatmapGeoJSON(cameras: CameraItem[] = ALL_MOCK_CAMERAS): HeatmapGeoJSONFeatureCollection {
  const features: HeatmapPointFeature[] = [];

  cameras.forEach((cam) => {
    // Add primary point at camera location with full weight
    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: cam.coordinates,
      },
      properties: {
        detectionCount: cam.totalDetectionsToday,
        density: Math.min(1.0, cam.totalDetectionsToday / 35000),
      },
    });

    // Add 2-3 satellite heat diffusion points along the road corridors
    if (cam.status !== 'OFFLINE') {
      for (let s = 1; s <= 2; s++) {
        const offsetLng = ((cam.coordinates[0] * 1000 + s * 7) % 10 - 5) * 0.0015;
        const offsetLat = ((cam.coordinates[1] * 1000 + s * 13) % 10 - 5) * 0.0015;
        features.push({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              Number((cam.coordinates[0] + offsetLng).toFixed(5)),
              Number((cam.coordinates[1] + offsetLat).toFixed(5)),
            ],
          },
          properties: {
            detectionCount: Math.floor(cam.totalDetectionsToday * (0.4 + s * 0.2)),
            density: Math.min(1.0, (cam.totalDetectionsToday * 0.6) / 35000),
          },
        });
      }
    }
  });

  return {
    type: 'FeatureCollection',
    features,
  };
}
