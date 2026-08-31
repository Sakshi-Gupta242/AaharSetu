import { 
  HourlyTrafficRecord, 
  DailyTrafficRecord, 
  CongestionHotspot, 
  ODRoute 
} from '../types/analytics';

// 24-Hour Traffic Profile with realistic morning and evening peaks
export const MOCK_HOURLY_TRAFFIC: HourlyTrafficRecord[] = [
  { hour: 0, hourLabel: '00:00', vehicleCount: 4200, averageSpeedKmh: 68.5, congestionScore: 12, congestionLevel: 'LOW' },
  { hour: 1, hourLabel: '01:00', vehicleCount: 2800, averageSpeedKmh: 72.0, congestionScore: 8, congestionLevel: 'LOW' },
  { hour: 2, hourLabel: '02:00', vehicleCount: 2100, averageSpeedKmh: 74.2, congestionScore: 5, congestionLevel: 'LOW' },
  { hour: 3, hourLabel: '03:00', vehicleCount: 2600, averageSpeedKmh: 73.0, congestionScore: 7, congestionLevel: 'LOW' },
  { hour: 4, hourLabel: '04:00', vehicleCount: 4100, averageSpeedKmh: 70.4, congestionScore: 14, congestionLevel: 'LOW' },
  { hour: 5, hourLabel: '05:00', vehicleCount: 7800, averageSpeedKmh: 65.8, congestionScore: 24, congestionLevel: 'LOW' },
  { hour: 6, hourLabel: '06:00', vehicleCount: 13400, averageSpeedKmh: 58.2, congestionScore: 42, congestionLevel: 'MODERATE' },
  { hour: 7, hourLabel: '07:00', vehicleCount: 19800, averageSpeedKmh: 46.5, congestionScore: 68, congestionLevel: 'HEAVY' },
  { hour: 8, hourLabel: '08:00', vehicleCount: 26400, averageSpeedKmh: 34.2, congestionScore: 88, congestionLevel: 'SEVERE' },
  { hour: 9, hourLabel: '09:00', vehicleCount: 28900, averageSpeedKmh: 29.5, congestionScore: 94, congestionLevel: 'SEVERE' },
  { hour: 10, hourLabel: '10:00', vehicleCount: 24200, averageSpeedKmh: 38.0, congestionScore: 82, congestionLevel: 'HEAVY' },
  { hour: 11, hourLabel: '11:00', vehicleCount: 18100, averageSpeedKmh: 48.6, congestionScore: 58, congestionLevel: 'MODERATE' },
  { hour: 12, hourLabel: '12:00', vehicleCount: 16500, averageSpeedKmh: 52.0, congestionScore: 52, congestionLevel: 'MODERATE' },
  { hour: 13, hourLabel: '13:00', vehicleCount: 15800, averageSpeedKmh: 53.4, congestionScore: 49, congestionLevel: 'MODERATE' },
  { hour: 14, hourLabel: '14:00', vehicleCount: 16200, averageSpeedKmh: 51.8, congestionScore: 51, congestionLevel: 'MODERATE' },
  { hour: 15, hourLabel: '15:00', vehicleCount: 18900, averageSpeedKmh: 47.2, congestionScore: 62, congestionLevel: 'MODERATE' },
  { hour: 16, hourLabel: '16:00', vehicleCount: 22400, averageSpeedKmh: 40.5, congestionScore: 76, congestionLevel: 'HEAVY' },
  { hour: 17, hourLabel: '17:00', vehicleCount: 27800, averageSpeedKmh: 32.0, congestionScore: 91, congestionLevel: 'SEVERE' },
  { hour: 18, hourLabel: '18:00', vehicleCount: 29800, averageSpeedKmh: 27.4, congestionScore: 96, congestionLevel: 'SEVERE' },
  { hour: 19, hourLabel: '19:00', vehicleCount: 26500, averageSpeedKmh: 35.8, congestionScore: 85, congestionLevel: 'HEAVY' },
  { hour: 20, hourLabel: '20:00', vehicleCount: 21200, averageSpeedKmh: 45.0, congestionScore: 69, congestionLevel: 'HEAVY' },
  { hour: 21, hourLabel: '21:00', vehicleCount: 16400, averageSpeedKmh: 54.2, congestionScore: 48, congestionLevel: 'MODERATE' },
  { hour: 22, hourLabel: '22:00', vehicleCount: 11200, averageSpeedKmh: 61.0, congestionScore: 32, congestionLevel: 'LOW' },
  { hour: 23, hourLabel: '23:00', vehicleCount: 7100, averageSpeedKmh: 66.4, congestionScore: 20, congestionLevel: 'LOW' },
];

// 7-Day & 30-Day Daily Traffic Records
export const MOCK_DAILY_TRAFFIC: DailyTrafficRecord[] = [
  { date: '2026-08-24', dayLabel: 'Mon 24 Aug', vehicleCount: 384500, averageSpeedKmh: 48.2, peakVolume: 29100, peakHourLabel: '18:00' },
  { date: '2026-08-25', dayLabel: 'Tue 25 Aug', vehicleCount: 396200, averageSpeedKmh: 47.8, peakVolume: 29800, peakHourLabel: '18:00' },
  { date: '2026-08-26', dayLabel: 'Wed 26 Aug', vehicleCount: 402100, averageSpeedKmh: 46.9, peakVolume: 30400, peakHourLabel: '09:00' },
  { date: '2026-08-27', dayLabel: 'Thu 27 Aug', vehicleCount: 398700, averageSpeedKmh: 47.5, peakVolume: 29900, peakHourLabel: '18:00' },
  { date: '2026-08-28', dayLabel: 'Fri 28 Aug', vehicleCount: 421000, averageSpeedKmh: 44.1, peakVolume: 32100, peakHourLabel: '18:30' },
  { date: '2026-08-29', dayLabel: 'Sat 29 Aug', vehicleCount: 342800, averageSpeedKmh: 54.6, peakVolume: 24200, peakHourLabel: '13:00' },
  { date: '2026-08-30', dayLabel: 'Sun 30 Aug', vehicleCount: 298400, averageSpeedKmh: 58.2, peakVolume: 21800, peakHourLabel: '17:00' },
];

// Top Ranked Congestion Hotspots in Delhi NCR
export const MOCK_CONGESTION_HOTSPOTS: CongestionHotspot[] = [
  {
    id: 'HOT-01',
    locationName: 'Connaught Circus Inner Radial Lane 2',
    latitude: 28.6315,
    longitude: 77.2195,
    zone: 'Downtown Central',
    zoneId: 'zone-downtown',
    congestionScore: 96,
    averageSpeedKmh: 18.4,
    vehicleVolume: 29800,
    status: 'SEVERE',
  },
  {
    id: 'HOT-02',
    locationName: 'Cyber City Expressway Plaza Toll 4',
    latitude: 28.4950,
    longitude: 77.0880,
    zone: 'South Tech Corridor',
    zoneId: 'zone-tech-park',
    congestionScore: 92,
    averageSpeedKmh: 22.0,
    vehicleVolume: 28400,
    status: 'SEVERE',
  },
  {
    id: 'HOT-03',
    locationName: 'Mukarba Chowk Flyover Interchanger',
    latitude: 28.7350,
    longitude: 77.1550,
    zone: 'North Highway Corridor',
    zoneId: 'zone-north-corridor',
    congestionScore: 88,
    averageSpeedKmh: 24.5,
    vehicleVolume: 24900,
    status: 'HIGH',
  },
  {
    id: 'HOT-04',
    locationName: 'Anand Vihar ISBT Terminal Cross',
    latitude: 28.6500,
    longitude: 77.3150,
    zone: 'East Logistics Corridor',
    zoneId: 'zone-east-port',
    congestionScore: 85,
    averageSpeedKmh: 26.2,
    vehicleVolume: 23100,
    status: 'HIGH',
  },
  {
    id: 'HOT-05',
    locationName: 'Dhaula Kuan Arterial Underpass',
    latitude: 28.5920,
    longitude: 77.1650,
    zone: 'Downtown Central',
    zoneId: 'zone-downtown',
    congestionScore: 82,
    averageSpeedKmh: 28.0,
    vehicleVolume: 21800,
    status: 'HIGH',
  },
  {
    id: 'HOT-06',
    locationName: 'Terminal 3 Departure Access Ramp',
    latitude: 28.5560,
    longitude: 77.0850,
    zone: 'Airport Express Zone',
    zoneId: 'zone-airport',
    congestionScore: 78,
    averageSpeedKmh: 31.4,
    vehicleVolume: 19800,
    status: 'MODERATE',
  },
  {
    id: 'HOT-07',
    locationName: 'Golf Course Road Toll Gantry 1',
    latitude: 28.4720,
    longitude: 77.0995,
    zone: 'South Tech Corridor',
    zoneId: 'zone-tech-park',
    congestionScore: 74,
    averageSpeedKmh: 34.0,
    vehicleVolume: 18200,
    status: 'MODERATE',
  },
  {
    id: 'HOT-08',
    locationName: 'NH44 Singhu Border Entry Gantry',
    latitude: 28.7420,
    longitude: 77.1680,
    zone: 'North Highway Corridor',
    zoneId: 'zone-north-corridor',
    congestionScore: 71,
    averageSpeedKmh: 36.8,
    vehicleVolume: 17500,
    status: 'MODERATE',
  },
];

// Aggregated Origin-Destination (OD) Flow Corridors
export const MOCK_OD_ROUTES: ODRoute[] = [
  {
    routeId: 'OD-101',
    originName: 'North Highway Toll (NH44)',
    originCoordinates: [77.1680, 28.7420],
    destinationName: 'Connaught Place Central',
    destinationCoordinates: [77.2195, 28.6315],
    vehicleVolume: 34200,
    averageTravelTimeMinutes: 38,
    averageSpeedKmh: 42.5,
    zoneId: 'zone-north-corridor',
  },
  {
    routeId: 'OD-102',
    originName: 'Cyber City Tech Park',
    originCoordinates: [77.0880, 28.4950],
    destinationName: 'IGI Terminal 3 Airport',
    destinationCoordinates: [77.0850, 28.5560],
    vehicleVolume: 31800,
    averageTravelTimeMinutes: 19,
    averageSpeedKmh: 56.0,
    zoneId: 'zone-tech-park',
  },
  {
    routeId: 'OD-103',
    originName: 'East Ring Freight Depot',
    originCoordinates: [77.3100, 28.6180],
    destinationName: 'Connaught Place Central',
    destinationCoordinates: [77.2195, 28.6315],
    vehicleVolume: 28900,
    averageTravelTimeMinutes: 28,
    averageSpeedKmh: 38.2,
    zoneId: 'zone-east-port',
  },
  {
    routeId: 'OD-104',
    originName: 'Connaught Place Central',
    originCoordinates: [77.2195, 28.6315],
    destinationName: 'Cyber City Tech Park',
    destinationCoordinates: [77.0880, 28.4950],
    vehicleVolume: 27400,
    averageTravelTimeMinutes: 44,
    averageSpeedKmh: 39.8,
    zoneId: 'zone-downtown',
  },
  {
    routeId: 'OD-105',
    originName: 'Mukarba Chowk North',
    originCoordinates: [77.1550, 28.7350],
    destinationName: 'East Ring Freight Depot',
    destinationCoordinates: [77.3100, 28.6180],
    vehicleVolume: 25600,
    averageTravelTimeMinutes: 35,
    averageSpeedKmh: 49.0,
    zoneId: 'zone-north-corridor',
  },
  {
    routeId: 'OD-106',
    originName: 'IGI Terminal 3 Airport',
    originCoordinates: [77.0850, 28.5560],
    destinationName: 'Dhaula Kuan Junction',
    destinationCoordinates: [77.1650, 28.5920],
    vehicleVolume: 24100,
    averageTravelTimeMinutes: 22,
    averageSpeedKmh: 51.5,
    zoneId: 'zone-airport',
  },
  {
    routeId: 'OD-107',
    originName: 'Anand Vihar ISBT',
    originCoordinates: [77.3150, 28.6500],
    destinationName: 'Mukarba Chowk North',
    destinationCoordinates: [77.1550, 28.7350],
    vehicleVolume: 22800,
    averageTravelTimeMinutes: 32,
    averageSpeedKmh: 53.0,
    zoneId: 'zone-east-port',
  },
  {
    routeId: 'OD-108',
    originName: 'Golf Course Road Hub',
    originCoordinates: [77.0995, 28.4720],
    destinationName: 'Connaught Place Central',
    destinationCoordinates: [77.2195, 28.6315],
    vehicleVolume: 21500,
    averageTravelTimeMinutes: 49,
    averageSpeedKmh: 36.4,
    zoneId: 'zone-tech-park',
  },
  {
    routeId: 'OD-109',
    originName: 'Dhaula Kuan Junction',
    originCoordinates: [77.1650, 28.5920],
    destinationName: 'Connaught Place Central',
    destinationCoordinates: [77.2195, 28.6315],
    vehicleVolume: 20400,
    averageTravelTimeMinutes: 18,
    averageSpeedKmh: 44.0,
    zoneId: 'zone-downtown',
  },
  {
    routeId: 'OD-110',
    originName: 'Noida Link Bridge',
    originCoordinates: [77.2850, 28.5850],
    destinationName: 'Dhaula Kuan Junction',
    destinationCoordinates: [77.1650, 28.5920],
    vehicleVolume: 19800,
    averageTravelTimeMinutes: 26,
    averageSpeedKmh: 46.2,
    zoneId: 'zone-east-port',
  },
  {
    routeId: 'OD-111',
    originName: 'Burari Ring Bypass',
    originCoordinates: [77.1950, 28.7180],
    destinationName: 'Connaught Place Central',
    destinationCoordinates: [77.2195, 28.6315],
    vehicleVolume: 17200,
    averageTravelTimeMinutes: 34,
    averageSpeedKmh: 41.0,
    zoneId: 'zone-north-corridor',
  },
  {
    routeId: 'OD-112',
    originName: 'Dwarka Expressway Link',
    originCoordinates: [77.0580, 28.5720],
    destinationName: 'Cyber City Tech Park',
    destinationCoordinates: [77.0880, 28.4950],
    vehicleVolume: 15900,
    averageTravelTimeMinutes: 21,
    averageSpeedKmh: 58.0,
    zoneId: 'zone-airport',
  },
  {
    routeId: 'OD-113',
    originName: 'Anand Vihar ISBT',
    originCoordinates: [77.3150, 28.6500],
    destinationName: 'IGI Terminal 3 Airport',
    destinationCoordinates: [77.0850, 28.5560],
    vehicleVolume: 14600,
    averageTravelTimeMinutes: 52,
    averageSpeedKmh: 43.5,
    zoneId: 'zone-east-port',
  },
  {
    routeId: 'OD-114',
    originName: 'Sohna Road Expressway',
    originCoordinates: [77.0450, 28.4350],
    destinationName: 'Cyber City Tech Park',
    destinationCoordinates: [77.0880, 28.4950],
    vehicleVolume: 13800,
    averageTravelTimeMinutes: 17,
    averageSpeedKmh: 62.0,
    zoneId: 'zone-tech-park',
  },
];

// Helper to retrieve Top 10 routes sorted strictly by vehicle volume
export function getTop10ODRoutes(routes: ODRoute[] = MOCK_OD_ROUTES): ODRoute[] {
  return [...routes]
    .sort((a, b) => b.vehicleVolume - a.vehicleVolume)
    .slice(0, 10);
}

// Filter reactive data helpers
export function getFilteredHourlyData(zoneId: string, timeOfDay: string): HourlyTrafficRecord[] {
  let multiplier = 1.0;
  if (zoneId === 'zone-downtown') multiplier = 1.15;
  else if (zoneId === 'zone-tech-park') multiplier = 1.25;
  else if (zoneId === 'zone-north-corridor') multiplier = 0.95;
  else if (zoneId === 'zone-airport') multiplier = 0.85;

  return MOCK_HOURLY_TRAFFIC.map((item) => {
    let speedMod = 1.0;
    if (timeOfDay === 'morning_peak' && (item.hour >= 8 && item.hour <= 11)) speedMod = 0.85;
    if (timeOfDay === 'evening_peak' && (item.hour >= 17 && item.hour <= 20)) speedMod = 0.82;
    if (timeOfDay === 'night' && (item.hour >= 22 || item.hour <= 5)) speedMod = 1.18;

    return {
      ...item,
      vehicleCount: Math.floor(item.vehicleCount * multiplier),
      averageSpeedKmh: Number((item.averageSpeedKmh * speedMod).toFixed(1)),
    };
  });
}

export function getFilteredDailyData(zoneId: string, dateRange: string): DailyTrafficRecord[] {
  let multiplier = 1.0;
  if (zoneId === 'zone-tech-park') multiplier = 1.2;
  else if (zoneId === 'zone-downtown') multiplier = 1.1;

  let records = MOCK_DAILY_TRAFFIC.map((d) => ({
    ...d,
    vehicleCount: Math.floor(d.vehicleCount * multiplier),
  }));

  if (dateRange === 'yesterday') {
    records = records.slice(records.length - 2, records.length - 1);
  } else if (dateRange === 'today') {
    records = records.slice(records.length - 1);
  }

  return records;
}

export function getFilteredHotspots(zoneId: string): CongestionHotspot[] {
  if (zoneId === 'all') {
    return MOCK_CONGESTION_HOTSPOTS;
  }
  return MOCK_CONGESTION_HOTSPOTS.filter((h) => h.zoneId === zoneId);
}

export function getFilteredODRoutes(zoneId: string): ODRoute[] {
  let routes = MOCK_OD_ROUTES;
  if (zoneId !== 'all') {
    const zoneFiltered = routes.filter((r) => r.zoneId === zoneId);
    routes = zoneFiltered.length > 0 ? zoneFiltered : routes;
  }
  return getTop10ODRoutes(routes);
}
