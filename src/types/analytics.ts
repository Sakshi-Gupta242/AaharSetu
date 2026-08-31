export interface HourlyTrafficRecord {
  hour: number;
  hourLabel: string;
  vehicleCount: number;
  averageSpeedKmh: number;
  congestionScore: number;
  congestionLevel: 'LOW' | 'MODERATE' | 'HEAVY' | 'SEVERE';
}

export interface DailyTrafficRecord {
  date: string;
  dayLabel: string;
  vehicleCount: number;
  averageSpeedKmh: number;
  peakVolume: number;
  peakHourLabel: string;
}

export interface CongestionHotspot {
  id: string;
  locationName: string;
  latitude: number;
  longitude: number;
  zone: string;
  zoneId: string;
  congestionScore: number; // 0 to 100
  averageSpeedKmh: number;
  vehicleVolume: number;
  status: 'SEVERE' | 'HIGH' | 'MODERATE';
}

export interface ODRoute {
  routeId: string;
  originName: string;
  originCoordinates: [number, number]; // [lng, lat]
  destinationName: string;
  destinationCoordinates: [number, number]; // [lng, lat]
  vehicleVolume: number;
  averageTravelTimeMinutes: number;
  averageSpeedKmh: number;
  zoneId?: string;
}
