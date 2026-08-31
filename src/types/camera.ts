export interface CameraItem {
  id: string;
  name: string;
  code: string;
  zoneId: string;
  zoneName: string;
  coordinates: [number, number]; // [lng, lat]
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  installedDate: string;
  laneCount: number;
  totalDetectionsToday: number;
  lastDetectionTimestamp: string;
}

export interface ZoneItem {
  id: string;
  name: string;
  code: string;
  description: string;
  cameraCount: number;
}
