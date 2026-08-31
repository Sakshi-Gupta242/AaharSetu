export type AlertType = 'BLACKLISTED' | 'ROUTE_ANOMALY' | 'UNUSUAL_LOITERING';

export type AlertSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface AlertItem {
  id: string;
  type?: AlertType;
  alertType: AlertType;
  severity: AlertSeverity;
  plate?: string;
  vehiclePlate: string;
  timestamp: string;
  cameraId: string;
  cameraName: string;
  location: string;
  locationName?: string;
  latitude?: number;
  longitude?: number;
  coordinates: [number, number]; // [lng, lat]
  zone?: string;
  zoneId?: string;
  message?: string;
  notes?: string;
  isRead: boolean;
  relatedEventId?: string;
  confidenceScore: number;
}

export interface InvestigationContext {
  plate: string;
  alertId?: string;
  relatedEventId?: string;
  cameraId?: string;
  coordinates?: [number, number];
}
