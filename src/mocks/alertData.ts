import { AlertItem, AlertType, AlertSeverity } from '../types/alerts';

export const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'ALT-8841',
    type: 'BLACKLISTED',
    alertType: 'BLACKLISTED',
    severity: 'CRITICAL',
    plate: 'DL01AB1234',
    vehiclePlate: 'DL01AB1234',
    timestamp: '2026-08-30 01:24:18',
    cameraId: 'CAM-101',
    cameraName: 'Connaught Circus Inner Junction',
    location: 'Downtown Central - Inner Circle Lane 2',
    locationName: 'Connaught Circus Inner Junction',
    latitude: 28.6315,
    longitude: 77.2195,
    coordinates: [77.2195, 28.6315],
    zone: 'Downtown Central',
    zoneId: 'zone-downtown',
    isRead: false,
    confidenceScore: 0.98,
    relatedEventId: 'DET-1014',
    message: 'Stolen Vehicle / Interpol Watchlist hit at Connaught Circus inner cordon.',
    notes: 'Plate matched Central Law Enforcement Flagged Registry (Stolen Vehicle / Interpol Watchlist).',
  },
  {
    id: 'ALT-8840',
    type: 'ROUTE_ANOMALY',
    alertType: 'ROUTE_ANOMALY',
    severity: 'HIGH',
    plate: 'KA05MH9988',
    vehiclePlate: 'KA05MH9988',
    timestamp: '2026-08-30 01:12:45',
    cameraId: 'CAM-401',
    cameraName: 'Terminal 3 Departure Access',
    location: 'Airport Express Zone - Terminal Radial',
    locationName: 'Terminal 3 Departure Access',
    latitude: 28.5560,
    longitude: 77.0850,
    coordinates: [77.0850, 28.5560],
    zone: 'Airport Express Zone',
    zoneId: 'zone-airport',
    isRead: false,
    confidenceScore: 0.93,
    relatedEventId: 'DET-2010',
    message: 'Rapid counter-flow route deviation across airport perimeter gantries.',
    notes: 'Vehicle crossed 3 perimeter checkpoints in erratic reversed sequence within 14 minutes.',
  },
  {
    id: 'ALT-8839',
    type: 'UNUSUAL_LOITERING',
    alertType: 'UNUSUAL_LOITERING',
    severity: 'MEDIUM',
    plate: 'MH12PQ4567',
    vehiclePlate: 'MH12PQ4567',
    timestamp: '2026-08-30 00:48:10',
    cameraId: 'CAM-103',
    cameraName: 'India Gate Radial Road North',
    location: 'Downtown Central - High Security Perimeter',
    locationName: 'India Gate Radial Road North',
    latitude: 28.6129,
    longitude: 77.2295,
    coordinates: [77.2295, 28.6129],
    zone: 'Downtown Central',
    zoneId: 'zone-downtown',
    isRead: false,
    confidenceScore: 0.89,
    relatedEventId: 'DET-3010',
    message: 'Repeated circular trajectory inside high-security perimeter.',
    notes: 'Detected 7 times circling within 500m high-security radius over past 45 minutes.',
  },
  {
    id: 'ALT-8838',
    type: 'BLACKLISTED',
    alertType: 'BLACKLISTED',
    severity: 'CRITICAL',
    plate: 'DL01AB1234',
    vehiclePlate: 'DL01AB1234',
    timestamp: '2026-08-29 21:05:44',
    cameraId: 'CAM-501',
    cameraName: 'East Ring Freight Interchange',
    location: 'East Logistics Corridor - Freight Gantry',
    locationName: 'East Ring Freight Interchange',
    latitude: 28.6180,
    longitude: 77.3100,
    coordinates: [77.3100, 28.6180],
    zone: 'East Logistics Corridor',
    zoneId: 'zone-east-port',
    isRead: true,
    confidenceScore: 0.99,
    relatedEventId: 'DET-1005',
    message: 'Flagged vehicle detected at East Freight terminal.',
    notes: 'Wanted in relation to Interstate Smuggling Investigation #NCR-9912.',
  },
  {
    id: 'ALT-8837',
    type: 'ROUTE_ANOMALY',
    alertType: 'ROUTE_ANOMALY',
    severity: 'MEDIUM',
    plate: 'KA05MH9988',
    vehiclePlate: 'KA05MH9988',
    timestamp: '2026-08-30 00:48:30',
    cameraId: 'CAM-406',
    cameraName: 'Cargo Terminal Access Gate 2',
    location: 'Airport Express Zone - Freight Gate',
    locationName: 'Cargo Terminal Access Gate 2',
    latitude: 28.5580,
    longitude: 77.0720,
    coordinates: [77.0720, 28.5580],
    zone: 'Airport Express Zone',
    zoneId: 'zone-airport',
    isRead: true,
    confidenceScore: 0.93,
    relatedEventId: 'DET-2008',
    message: 'Restricted Airside gate breach attempt by unverified vehicle.',
    notes: 'Speed anomaly (142 km/h in 80 km/h zone) preceding sudden off-ramp lane deviation.',
  },
  {
    id: 'ALT-8836',
    type: 'UNUSUAL_LOITERING',
    alertType: 'UNUSUAL_LOITERING',
    severity: 'LOW',
    plate: 'MH12PQ4567',
    vehiclePlate: 'MH12PQ4567',
    timestamp: '2026-08-29 23:45:02',
    cameraId: 'CAM-112',
    cameraName: 'Rajpath West Axis',
    location: 'Downtown Central - Government Central Axis',
    locationName: 'Rajpath West Axis',
    latitude: 28.6140,
    longitude: 77.2110,
    coordinates: [77.2110, 28.6140],
    zone: 'Downtown Central',
    zoneId: 'zone-downtown',
    isRead: true,
    confidenceScore: 0.94,
    relatedEventId: 'DET-3007',
    message: 'Stationary vehicle detected in secure lane beyond allowed dwell limit.',
    notes: 'Heavy commercial vehicle parked near restricted freight loading zone beyond permitted window.',
  }
];

// Mock API layer abstraction (ready for backend replacement)
export async function fetchAlertsApi(): Promise<AlertItem[]> {
  // Simulate lightweight network roundtrip
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...MOCK_ALERTS]);
    }, 150);
  });
}

// Generate valid simulated alert for demo/evaluator testing
export function generateSimulatedAlert(
  type: AlertType = 'BLACKLISTED',
  targetPlate: string = 'DL01AB1234'
): AlertItem {
  const alertId = `ALT-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

  let severity: AlertSeverity = 'CRITICAL';
  let cameraId = 'CAM-101';
  let cameraName = 'Connaught Circus Inner Junction';
  let location = 'Downtown Central - Inner Circle Lane 2';
  let coordinates: [number, number] = [77.2195, 28.6315];
  let zone = 'Downtown Central';
  let relatedEventId = 'DET-1014';
  let message = 'Automated Blacklist match on City Core Surveillance Mesh.';

  if (targetPlate === 'KA05MH9988') {
    cameraId = 'CAM-401';
    cameraName = 'Terminal 3 Departure Access';
    location = 'Airport Express Zone - Terminal Radial';
    coordinates = [77.0850, 28.5560];
    zone = 'Airport Express Zone';
    relatedEventId = 'DET-2010';
    severity = 'HIGH';
    message = 'Sudden counter-directional route jump detected at Airport entry.';
  } else if (targetPlate === 'MH12PQ4567') {
    cameraId = 'CAM-103';
    cameraName = 'India Gate Radial Road North';
    location = 'Downtown Central - High Security Perimeter';
    coordinates = [77.2295, 28.6129];
    zone = 'Downtown Central';
    relatedEventId = 'DET-3010';
    severity = 'MEDIUM';
    message = 'Vehicle exceeded permissible circling threshold in security zone.';
  }

  if (type === 'ROUTE_ANOMALY') {
    severity = 'HIGH';
    message = `Rapid velocity variance and route deviation detected for ${targetPlate}.`;
  } else if (type === 'UNUSUAL_LOITERING') {
    severity = 'MEDIUM';
    message = `Multi-pass surveillance alert: ${targetPlate} observed hovering at ${cameraName}.`;
  }

  return {
    id: alertId,
    type,
    alertType: type,
    severity,
    plate: targetPlate,
    vehiclePlate: targetPlate,
    timestamp,
    cameraId,
    cameraName,
    location,
    locationName: cameraName,
    latitude: coordinates[1],
    longitude: coordinates[0],
    coordinates,
    zone,
    zoneId: 'zone-downtown',
    isRead: false,
    confidenceScore: Number((0.92 + Math.random() * 0.07).toFixed(2)),
    relatedEventId,
    message,
    notes: `Triggered live by ANPR Surveillance Engine at ${timestamp}.`,
  };
}
