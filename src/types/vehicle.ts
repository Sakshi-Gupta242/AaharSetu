export interface VehicleDetection {
  id: string;
  eventId?: string;
  plate?: string;
  timestamp: string;
  cameraId: string;
  cameraName?: string;
  location: string;
  locationName?: string;
  zone?: string;
  zoneId?: string;
  speedKmh: number;
  speedLimitKmh: number;
  confidence: number;
  lane: number;
  direction: string;
  coordinates: [number, number]; // [lng, lat]
  latitude?: number;
  longitude?: number;
  imageSnapshotUrl?: string;
  isFlagged?: boolean;
}

export interface VehicleProfile {
  plateNumber: string;
  plate?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleColor?: string;
  vehicleType?: 'SEDAN' | 'SUV' | 'COMMERCIAL_TRUCK' | 'MOTORCYCLE' | 'BUS';
  status: 'CLEAN' | 'WARRANT' | 'STOLEN' | 'SUSPECT';
  firstSeen: string;
  lastSeen: string;
  totalDetections: number;
  camerasVisited: number;
  averageSpeedKmh: number;
  averageSpeed?: number;
  detections: VehicleDetection[];
}
